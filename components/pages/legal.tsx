import { SecondaryHeader } from "@/components/secondary-header";
import { LegalEn } from "@/components/pages/legal-en";
import { REGISTRO_MERCANTIL } from "@/lib/company";
import { href, type Lang } from "@/lib/i18n";

export function LegalPage({ lang }: { lang: Lang }) {
  return (
    <main className="legal-page">
      <SecondaryHeader lang={lang} page="legal" />
      {lang === "en" ? <LegalEn /> : <LegalEs />}
    </main>
  );
}

function LegalEs() {
  return (
    <>

      <article className="legal-body">
        <h1>Aviso legal</h1>
        <p className="legal-updated">Última actualización: septiembre de 2026</p>

        <h2>Titular del sitio web</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la
          Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de{" "}
          <a href="https://thelotolab.es">thelotolab.es</a>:
        </p>
        <dl>
          <dt>Denominación social</dt>
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
          <dt>Datos registrales</dt>
          <dd>Inscrita en el Registro Mercantil de Madrid, {REGISTRO_MERCANTIL}</dd>
        </dl>

        <h2>Profesión regulada</h2>
        <p>
          Los servicios de arquitectura de The Loto Lab S.L. se prestan por arquitectos colegiados en
          el Colegio Oficial de Arquitectos de Madrid (COAM,{" "}
          <a href="https://www.coam.org" target="_blank" rel="noopener noreferrer">www.coam.org</a>):
        </p>
        <ul>
          <li>Andrea Torres Íñiguez, arquitecta, colegiada n.º 24.359.</li>
          <li>Jesús López de los Mozos, arquitecto, colegiado n.º 23.899.</li>
        </ul>
        <p>
          Título académico: Arquitecto/a, expedido en España. El ejercicio profesional se rige por la
          Ley 2/1974, de Colegios Profesionales, la Ley 38/1999, de Ordenación de la Edificación, los
          Estatutos del COAM y el Código Deontológico de los arquitectos aprobado por el Consejo
          Superior de los Colegios de Arquitectos de España (
          <a href="https://www.cscae.com" target="_blank" rel="noopener noreferrer">www.cscae.com</a>),
          donde pueden consultarse.
        </p>

        <h2>Condiciones de uso</h2>
        <p>
          El acceso a este sitio web es gratuito y atribuye la condición de usuario, lo que implica la
          aceptación de este aviso legal. El usuario se compromete a hacer un uso adecuado del sitio y
          de sus contenidos, conforme a la ley, la buena fe y el orden público, y a no emplearlos para
          fines ilícitos o que puedan dañar a The Loto Lab S.L. o a terceros.
        </p>

        <h2>Propiedad intelectual e industrial</h2>
        <p>
          Los contenidos de este sitio web (textos, fotografías, planos, vídeos, diseños, logotipos y
          código) son titularidad de The Loto Lab S.L. o de terceros que han autorizado su uso, y están
          protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su
          reproducción, distribución, comunicación pública o transformación sin autorización expresa y
          por escrito.
        </p>
        <p>
          Los nombres y logotipos de clientes y marcas de terceros que aparecen en el sitio pertenecen
          a sus respectivos titulares y se muestran únicamente con fines informativos sobre los
          proyectos realizados.
        </p>

        <h2>Responsabilidad</h2>
        <p>
          The Loto Lab S.L. procura que la información publicada sea correcta y esté actualizada, pero
          no garantiza la ausencia de errores ni la disponibilidad ininterrumpida del sitio. Los
          contenidos tienen carácter informativo y no constituyen una propuesta profesional
          vinculante.
        </p>

        <h2>Enlaces a terceros</h2>
        <p>
          Este sitio incluye enlaces a sitios y perfiles externos, como redes sociales. The Loto Lab
          S.L. no controla ni se responsabiliza de sus contenidos ni de sus políticas de privacidad,
          que recomendamos consultar.
        </p>

        <h2>Protección de datos</h2>
        <p>
          El tratamiento de los datos personales que nos facilitas se describe en nuestra{" "}
          <a href={href("privacy", "es")}>política de privacidad</a>.
        </p>

        <h2>Legislación aplicable y jurisdicción</h2>
        <p>
          Este aviso legal se rige por la legislación española. Para cualquier controversia, las
          partes se someterán a los juzgados y tribunales que correspondan conforme a la normativa
          aplicable; cuando el usuario tenga la condición de consumidor, serán competentes los de su
          domicilio.
        </p>
      </article>
    </>
  );
}
