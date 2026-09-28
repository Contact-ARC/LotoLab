import type { Metadata } from "next";
import { SecondaryHeader } from "@/components/secondary-header";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo trata The Loto Lab S.L. los datos personales que nos facilitas a través de thelotolab.es.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <main className="legal-page">
      <SecondaryHeader />

      <article className="legal-body">
        <h1>Política de privacidad</h1>
        <p className="legal-updated">Última actualización: septiembre de 2026</p>

        <p>
          En The Loto Lab S.L. respetamos tu privacidad. Esta política explica qué datos personales
          recogemos a través de <a href="https://thelotolab.es">thelotolab.es</a>, para qué los usamos y
          qué derechos tienes, conforme al Reglamento (UE) 2016/679 General de Protección de Datos
          (RGPD) y a la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los
          derechos digitales (LOPDGDD).
        </p>

        <h2>Responsable del tratamiento</h2>
        <dl>
          <dt>Titular</dt>
          <dd>The Loto Lab S.L.</dd>
          <dt>CIF</dt>
          <dd>B70622832</dd>
          <dt>Domicilio</dt>
          <dd>Av. de Leonardo da Vinci 2A, 28906 Getafe (Madrid), España</dd>
          <dt>Correo electrónico</dt>
          <dd><a href="mailto:estudio@thelotolab.es">estudio@thelotolab.es</a></dd>
          <dt>Teléfonos</dt>
          <dd>
            <a href="tel:+34637718591">+34 637 718 591</a> ·{" "}
            <a href="tel:+34650922945">+34 650 922 945</a>
          </dd>
        </dl>

        <h2>Qué datos tratamos</h2>
        <p>Cuando utilizas el formulario de contacto, tratamos los datos que nos facilitas voluntariamente:</p>
        <ul>
          <li>Nombre.</li>
          <li>Dirección de correo electrónico.</li>
          <li>Tipo de conversación que nos propones (proyecto, colaboración o idea).</li>
          <li>El contenido de tu mensaje.</li>
        </ul>
        <p>
          Si nos escribes directamente por correo electrónico o nos llamas, trataremos igualmente los
          datos que nos proporciones en esa comunicación.
        </p>
        <p>
          Te pedimos que no incluyas en tu mensaje datos especialmente protegidos (por ejemplo, de
          salud) ni datos de terceros sin su consentimiento.
        </p>

        <h2>Para qué los utilizamos</h2>
        <p>Utilizamos tus datos exclusivamente para:</p>
        <ul>
          <li>Responder a tu consulta o solicitud.</li>
          <li>
            Mantener la comunicación contigo en relación con ella y, si decides encargarnos un
            proyecto, con la preparación de la propuesta y su desarrollo.
          </li>
        </ul>
        <p>
          No enviamos comunicaciones comerciales ni boletines, no elaboramos perfiles y no tomamos
          decisiones automatizadas a partir de tus datos.
        </p>

        <h2>Base legal</h2>
        <ul>
          <li>
            <strong>Tu consentimiento</strong> (art. 6.1.a RGPD), que prestas al enviar el formulario
            tras aceptar esta política. Puedes retirarlo en cualquier momento, sin que ello afecte a
            la licitud del tratamiento previo.
          </li>
          <li>
            <strong>La aplicación de medidas precontractuales</strong> a petición tuya (art. 6.1.b
            RGPD), cuando nos solicitas información o una propuesta sobre un proyecto.
          </li>
        </ul>

        <h2>Cuánto tiempo los conservamos</h2>
        <p>
          Conservamos tus datos durante el tiempo necesario para atender tu consulta. Si la
          comunicación no da lugar a una relación profesional, los suprimiremos en un plazo máximo de
          doce meses desde el último contacto.
        </p>
        <p>
          Si llegamos a colaborar, los datos se conservarán mientras dure la relación y, después,
          durante los plazos exigidos por la normativa aplicable (mercantil, fiscal y de
          responsabilidad profesional), debidamente bloqueados.
        </p>

        <h2>Con quién los compartimos</h2>
        <p>No cedemos tus datos a terceros, salvo obligación legal.</p>
        <p>
          Para prestar el servicio contamos con los siguientes proveedores, que actúan como encargados
          del tratamiento con las garantías exigidas por el RGPD:
        </p>
        <ul>
          <li>
            <strong>IONOS SE</strong> (Elgendorfer Str. 57, 56410 Montabaur, Alemania): alojamiento
            del sitio web y del formulario de contacto.
          </li>
          <li>
            <strong>Google Ireland Limited</strong> (Gordon House, Barrow Street, Dublín 4, Irlanda),
            mediante Google Workspace: servicio de correo electrónico con el que recibimos y
            respondemos tus mensajes.
          </li>
        </ul>

        <h2>Transferencias internacionales</h2>
        <p>
          Google puede tratar datos en servidores situados fuera del Espacio Económico Europeo,
          incluidos los Estados Unidos. Estas transferencias se amparan en la certificación de Google
          LLC en el Marco de Privacidad de Datos UE-EE. UU. (Data Privacy Framework), objeto de la
          decisión de adecuación de la Comisión Europea de 10 de julio de 2023, y en las cláusulas
          contractuales tipo aprobadas por la Comisión. Puedes solicitar más información escribiendo a{" "}
          <a href="mailto:estudio@thelotolab.es">estudio@thelotolab.es</a>.
        </p>

        <h2>Registros del servidor y seguridad del formulario</h2>
        <p>
          Como cualquier sitio web, el servidor que aloja esta página registra de forma automática
          datos técnicos de las visitas (dirección IP, fecha y hora, página solicitada y navegador).
          Además, para proteger el formulario frente a envíos abusivos, guardamos un identificador
          seudonimizado de la dirección IP (un resumen cifrado que no permite recuperarla) junto a la
          hora de cada envío. Estos datos se utilizan únicamente para garantizar la seguridad y el
          correcto funcionamiento del sitio, sobre la base de nuestro interés legítimo (art. 6.1.f
          RGPD), y se eliminan periódicamente; los registros del formulario se conservan como máximo
          seis meses.
        </p>

        <h2>Cookies</h2>
        <p>Este sitio web no utiliza cookies ni tecnologías similares de análisis, publicidad o seguimiento.</p>

        <h2>Tus derechos</h2>
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión,
          oposición, limitación del tratamiento y portabilidad, así como retirar tu consentimiento,
          escribiendo a <a href="mailto:estudio@thelotolab.es">estudio@thelotolab.es</a> o por correo
          postal a la dirección indicada arriba. Indica qué derecho deseas ejercer; si fuera necesario
          para verificar tu identidad, podremos pedirte información adicional.
        </p>
        <p>
          Responderemos en el plazo de un mes. Si consideras que no hemos atendido correctamente tu
          solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos
          (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
        </p>

        <h2>Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos, entre ellas la
          transmisión cifrada mediante HTTPS y el acceso restringido a la información recibida.
        </p>

        <h2>Menores de edad</h2>
        <p>
          Este sitio no está dirigido a menores de 14 años. Si eres menor de esa edad, no nos envíes
          datos personales sin el consentimiento de tus padres o tutores.
        </p>

        <h2>Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política para adaptarla a cambios legales o en nuestro
          funcionamiento. Publicaremos cualquier modificación en esta página, indicando la fecha de la
          última actualización.
        </p>

        <p className="legal-crosslink">
          Consulta también nuestro <a href="/aviso-legal">aviso legal</a>.
        </p>
      </article>
    </main>
  );
}
