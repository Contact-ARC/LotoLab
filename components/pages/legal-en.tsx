import { REGISTRO_MERCANTIL } from "@/lib/company";
import { href } from "@/lib/i18n";

export function LegalEn() {
  return (
    <article className="legal-body">
      <h1>Legal notice</h1>
      <p className="legal-updated">Last updated: September 2026</p>

      <p>
        This English version is provided for convenience. In the event of any discrepancy, the{" "}
        <a href={href("legal", "es")} hrefLang="es">Spanish version</a> shall prevail.
      </p>

      <h2>Website owner</h2>
      <p>
        In accordance with Article 10 of Spanish Law 34/2002 on Information Society Services and
        Electronic Commerce (LSSI-CE), the following details are provided about the owner of{" "}
        <a href="https://thelotolab.es">thelotolab.es</a>:
      </p>
      <dl>
        <dt>Company name</dt>
        <dd>The Loto Lab S.L.</dd>
        <dt>Tax ID (CIF)</dt>
        <dd>B70622832</dd>
        <dt>Registered address</dt>
        <dd>Av. de Leonardo da Vinci 2A, 28906 Getafe (Madrid), Spain</dd>
        <dt>Email</dt>
        <dd><a href="mailto:estudio@thelotolab.es">estudio@thelotolab.es</a></dd>
        <dt>Telephone</dt>
        <dd>
          <a href="tel:+34637718591">+34 637 718 591</a> ·{" "}
          <a href="tel:+34650922945">+34 650 922 945</a>
        </dd>
        <dt>Registration</dt>
        <dd>Registered in the Madrid Commercial Registry (Registro Mercantil de Madrid), {REGISTRO_MERCANTIL}</dd>
      </dl>

      <h2>Regulated profession</h2>
      <p>
        The architectural services of The Loto Lab S.L. are provided by architects registered with the
        Official Association of Architects of Madrid (COAM,{" "}
        <a href="https://www.coam.org" target="_blank" rel="noopener noreferrer">www.coam.org</a>):
      </p>
      <ul>
        <li>Andrea Torres Íñiguez, architect, registration no. 24.359.</li>
        <li>Jesús López de los Mozos, architect, registration no. 23.899.</li>
      </ul>
      <p>
        Professional qualification: Architect, awarded in Spain. Professional practice is governed by
        Law 2/1974 on Professional Associations, Law 38/1999 on Building Regulation (LOE), the Statutes
        of the COAM and the Code of Professional Conduct for architects approved by the Higher Council of
        Spanish Architects&apos; Associations (
        <a href="https://www.cscae.com" target="_blank" rel="noopener noreferrer">www.cscae.com</a>),
        where they can be consulted.
      </p>

      <h2>Terms of use</h2>
      <p>
        Access to this website is free of charge and makes you a user, which implies acceptance of this
        legal notice. Users undertake to make proper use of the website and its content, in accordance
        with the law, good faith and public order, and not to use them for unlawful purposes or in ways
        that could harm The Loto Lab S.L. or third parties.
      </p>

      <h2>Intellectual and industrial property</h2>
      <p>
        The content of this website (texts, photographs, drawings, videos, designs, logos and code) is
        owned by The Loto Lab S.L. or by third parties who have authorised its use, and is protected by
        intellectual and industrial property law. Its reproduction, distribution, public communication
        or transformation without express written authorisation is prohibited.
      </p>
      <p>
        The names and logos of clients and third-party brands shown on the website belong to their
        respective owners and are displayed solely to provide information about completed projects.
      </p>

      <h2>Liability</h2>
      <p>
        The Loto Lab S.L. endeavours to ensure that the information published is accurate and up to
        date, but does not guarantee that it is free of errors or that the website will be available
        without interruption. The content is for information purposes only and does not constitute a
        binding professional proposal.
      </p>

      <h2>Third-party links</h2>
      <p>
        This website includes links to external sites and profiles, such as social media. The Loto Lab
        S.L. does not control and is not responsible for their content or their privacy policies, which
        we recommend you read.
      </p>

      <h2>Data protection</h2>
      <p>
        The processing of the personal data you provide is described in our{" "}
        <a href={href("privacy", "en")}>privacy policy</a>.
      </p>

      <h2>Applicable law and jurisdiction</h2>
      <p>
        This legal notice is governed by Spanish law. Any dispute shall be submitted to the courts and
        tribunals that have jurisdiction under the applicable rules; where the user is a consumer, the
        courts of the user&apos;s place of residence shall have jurisdiction.
      </p>
    </article>
  );
}
