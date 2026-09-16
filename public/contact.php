<?php
declare(strict_types=1);

/**
 * contact.php — secure contact-form handler for The Loto Lab
 *   Web root: /homepages/27/d984221293/htdocs/lotolab/
 *   Private : /homepages/27/d984221293/htdocs/private/  (../private, outside web root)
 */

error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

header('Content-Type: application/json; charset=utf-8');

const APEX_HOST = 'thelotolab.es';

function respond(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function log_event(array $config, string $msg): void {
    $path = (string)($config['log_path'] ?? (__DIR__ . '/../private/contact.log'));
    @file_put_contents($path, '[' . gmdate('Y-m-d H:i:s') . " UTC] $msg\n", FILE_APPEND | LOCK_EX);
}

/* 1) POST only */
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond(405, ['success' => false, 'message' => 'Método no permitido.']);
}

/* 2) Reject oversized requests (~64 KB) */
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 64 * 1024) {
    respond(413, ['success' => false, 'message' => 'La solicitud es demasiado grande.']);
}

/* 3) Origin / Referer gating */
$validHost = static fn(string $h): bool =>
    strcasecmp($h, APEX_HOST) === 0 || strcasecmp($h, 'www.' . APEX_HOST) === 0;

$origin  = $_SERVER['HTTP_ORIGIN']  ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$okOrigin = false;
if ($origin !== '') {
    $h = parse_url($origin, PHP_URL_HOST) ?? '';
    $okOrigin = $h !== '' && $validHost($h);
} elseif ($referer !== '') {
    $h = parse_url($referer, PHP_URL_HOST) ?? '';
    $okOrigin = $h !== '' && $validHost($h);
}
if (!$okOrigin) {
    respond(403, ['success' => false, 'message' => 'Origen no permitido.']);
}

/* 4) Honeypot */
if (!empty($_POST['botcheck'])) {
    respond(200, ['success' => true, 'message' => 'Gracias.']);
}

/* 5) Load config from OUTSIDE the web root */
$configPath = __DIR__ . '/../private/contact-config.php';
if (!is_file($configPath)) {
    error_log('contact.php: missing config at ' . $configPath);
    respond(500, ['success' => false, 'message' => 'Configuración del servidor no disponible.']);
}
$config = require $configPath;

$ip     = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$ipHash = hash('sha256', (string)($config['ip_salt'] ?? '') . $ip);

/* 6) Rate limiting — dual window, single-lock read-modify-write */
$rlDir = rtrim((string)($config['rate_dir'] ?? (__DIR__ . '/../private/rl')), '/');
if (!is_dir($rlDir)) { @mkdir($rlDir, 0700, true); }

$now      = time();
$shortWin = 300;  $shortMax = 5;
$longWin  = 3600; $longMax  = 20;

if (random_int(1, 100) === 1) {
    foreach (glob($rlDir . '/*.json') ?: [] as $g) {
        if (($mt = @filemtime($g)) !== false && ($now - $mt) > $longWin) { @unlink($g); }
    }
}

$rlFile = $rlDir . '/' . $ipHash . '.json';
$fh = @fopen($rlFile, 'c+');
if ($fh !== false) {
    flock($fh, LOCK_EX);
    $raw = stream_get_contents($fh);
    $ts  = $raw !== '' ? (json_decode($raw, true) ?: []) : [];
    $ts  = array_values(array_filter($ts, static fn($t) => ($now - (int)$t) < $longWin));

    $inShort = 0;
    foreach ($ts as $t) { if (($now - (int)$t) < $shortWin) { $inShort++; } }

    if ($inShort >= $shortMax || count($ts) >= $longMax) {
        flock($fh, LOCK_UN); fclose($fh);
        log_event($config, 'rate-limited ip=' . substr($ipHash, 0, 12) . " short=$inShort long=" . count($ts));
        respond(429, ['success' => false, 'message' => 'Demasiados envíos. Inténtalo de nuevo en unos minutos.']);
    }

    $ts[] = $now;
    rewind($fh); ftruncate($fh, 0); fwrite($fh, json_encode($ts)); fflush($fh);
    flock($fh, LOCK_UN); fclose($fh);
} else {
    error_log('contact.php: cannot open rate file ' . $rlFile);
}

/* 7) Turnstile — dormant unless enabled in config */
$turnstile = $config['turnstile'] ?? [];
if (!empty($turnstile['enabled'])) {
    $token = (string)($_POST['cf-turnstile-response'] ?? '');
    $ok = false;
    if ($token !== '' && function_exists('curl_init')) {
        $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 8,
            CURLOPT_POSTFIELDS => http_build_query([
                'secret'   => (string)($turnstile['secret'] ?? ''),
                'response' => $token,
                'remoteip' => $ip,
            ]),
        ]);
        $res = curl_exec($ch);
        curl_close($ch);
        $ok = $res !== false && (json_decode((string)$res, true)['success'] ?? false) === true;
    }
    if (!$ok) {
        log_event($config, 'turnstile-failed ip=' . substr($ipHash, 0, 12));
        respond(403, ['success' => false, 'message' => 'No se pudo verificar que no eres un robot.']);
    }
}

/* 8) Validate & sanitize */
$clean = static fn(string $v, int $max): string => mb_substr(trim($v), 0, $max);
$nombre  = $clean((string)($_POST['nombre']  ?? ''), 100);
$email   = $clean((string)($_POST['email']   ?? ''), 150);
$mensaje = $clean((string)($_POST['mensaje'] ?? ''), 5000);
$tipo    = $clean((string)($_POST['tipo']    ?? ''), 40);

$errors = [];
if ($nombre === '' || mb_strlen($nombre) < 2 || preg_match('/[\r\n]/', $nombre)) $errors[] = 'nombre';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email)) $errors[] = 'email';
if ($mensaje === '' || mb_strlen($mensaje) < 5) $errors[] = 'mensaje';
if (!in_array($tipo, ['Proyecto', 'Colaboración', 'Una idea'], true)) $tipo = 'Proyecto';
if ($errors) {
    respond(400, ['success' => false, 'message' => 'Revisa los campos del formulario.', 'fields' => $errors]);
}

/* 9) Send via authenticated IONOS SMTP */
require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = (string)$config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = (string)$config['smtp_user'];
    $mail->Password   = (string)$config['smtp_pass'];
    $mail->Port       = (int)$config['smtp_port'];
    $mail->SMTPSecure = (string)$config['smtp_secure'];
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom((string)$config['from_email'], (string)($config['from_name'] ?? 'Web'));
    $mail->addAddress((string)$config['to_email'], (string)($config['to_name'] ?? ''));
    $mail->addReplyTo($email, $nombre);

    $mail->Subject = 'Nuevo mensaje (' . $tipo . ') — thelotolab.es';

    $n = htmlspecialchars($nombre,  ENT_QUOTES, 'UTF-8');
    $e = htmlspecialchars($email,   ENT_QUOTES, 'UTF-8');
    $t = htmlspecialchars($tipo,    ENT_QUOTES, 'UTF-8');
    $m = nl2br(htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8'));

    $mail->isHTML(true);
    $mail->Body =
        '<h2 style="font-family:sans-serif">Nuevo mensaje desde la web</h2>' .
        "<p><strong>Nombre:</strong> {$n}</p>" .
        "<p><strong>Email:</strong> {$e}</p>" .
        "<p><strong>Tipo:</strong> {$t}</p>" .
        "<p><strong>Mensaje:</strong><br>{$m}</p>";
    $mail->AltBody =
        "Nuevo mensaje desde la web\n\nNombre: {$nombre}\nEmail: {$email}\nTipo: {$tipo}\n\nMensaje:\n{$mensaje}\n";

    $mail->send();
    respond(200, ['success' => true, 'message' => '¡Gracias! Hemos recibido tu mensaje.']);
} catch (MailException $ex) {
    log_event($config, 'mail-error ip=' . substr($ipHash, 0, 12) . ' info=' . $mail->ErrorInfo);
    respond(500, ['success' => false, 'message' => 'No se pudo enviar el mensaje. Inténtalo más tarde.']);
}
