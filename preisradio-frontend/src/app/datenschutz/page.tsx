import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Datenschutzerklärung
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Informationen gemäß DSGVO
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-zinc-900">
            {/* Intro */}
            <section>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen.
                  Datenschutz hat einen besonders hohen Stellenwert für die
                  Geschäftsleitung der PrixRadio GmbH.
                </p>
                <p>
                  Eine Nutzung der Internetseiten von PrixRadio ist grundsätzlich ohne
                  jede Angabe personenbezogener Daten möglich. Sofern eine betroffene
                  Person besondere Services unseres Unternehmens über unsere
                  Internetseite in Anspruch nehmen möchte, könnte jedoch eine
                  Verarbeitung personenbezogener Daten erforderlich werden.
                </p>
              </div>
            </section>

            {/* Responsible Party */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                1. Verantwortliche Stelle
              </h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="font-semibold">PrixRadio GmbH</p>
                <p>Musterstraße 123</p>
                <p>10115 Berlin</p>
                <p>Deutschland</p>
                <p className="mt-4">
                  <span className="font-semibold">E-Mail:</span>{' '}
                  <a
                    href="mailto:datenschutz@preisradio.de"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    datenschutz@preisradio.de
                  </a>
                </p>
              </div>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                2. Erfassung allgemeiner Daten und Informationen
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Die Internetseite von PrixRadio erfasst mit jedem Aufruf der
                  Internetseite durch eine betroffene Person oder ein automatisiertes
                  System eine Reihe von allgemeinen Daten und Informationen. Diese
                  allgemeinen Daten und Informationen werden in den Logfiles des Servers
                  gespeichert.
                </p>
                <p>Erfasst werden können die:</p>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>verwendeten Browsertypen und Versionen</li>
                  <li>das vom zugreifenden System verwendete Betriebssystem</li>
                  <li>die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt</li>
                  <li>die Unterwebseiten, welche über ein zugreifendes System auf unserer Internetseite angesteuert werden</li>
                  <li>das Datum und die Uhrzeit eines Zugriffs auf die Internetseite</li>
                  <li>eine Internet-Protokoll-Adresse (IP-Adresse)</li>
                  <li>der Internet-Service-Provider des zugreifenden Systems</li>
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                3. Cookies
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Die Internetseiten von PrixRadio verwenden Cookies. Cookies sind
                  Textdateien, welche über einen Internetbrowser auf einem
                  Computersystem abgelegt und gespeichert werden.
                </p>
                <p>
                  Viele Internetseiten und Server verwenden Cookies. Viele Cookies
                  enthalten eine sogenannte Cookie-ID. Eine Cookie-ID ist eine eindeutige
                  Kennung des Cookies. Sie besteht aus einer Zeichenfolge, durch welche
                  Internetseiten und Server dem konkreten Internetbrowser zugeordnet
                  werden können, in dem das Cookie gespeichert wurde.
                </p>
                <p>
                  Die betroffene Person kann die Setzung von Cookies durch unsere
                  Internetseite jederzeit mittels einer entsprechenden Einstellung des
                  genutzten Internetbrowsers verhindern und damit der Setzung von Cookies
                  dauerhaft widersprechen.
                </p>
              </div>
            </section>

            {/* Contact Form */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                4. Kontaktmöglichkeit über die Internetseite
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Die Internetseite von PrixRadio enthält aufgrund von gesetzlichen
                  Vorschriften Angaben, die eine schnelle elektronische Kontaktaufnahme
                  zu unserem Unternehmen sowie eine unmittelbare Kommunikation mit uns
                  ermöglichen, was ebenfalls eine allgemeine Adresse der sogenannten
                  elektronischen Post (E-Mail-Adresse) umfasst.
                </p>
                <p>
                  Sofern eine betroffene Person per E-Mail oder über ein Kontaktformular
                  den Kontakt mit dem für die Verarbeitung Verantwortlichen aufnimmt,
                  werden die von der betroffenen Person übermittelten personenbezogenen
                  Daten automatisch gespeichert.
                </p>
              </div>
            </section>

            {/* External Links */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                5. Externe Links zu Händlern
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Unsere Website enthält Links zu externen Händler-Websites. Wir haben
                  keinen Einfluss auf die Datenschutzpraktiken dieser externen Seiten.
                  Bitte informieren Sie sich über die Datenschutzerklärungen der
                  jeweiligen Händler, wenn Sie auf deren Websites gelangen.
                </p>
              </div>
            </section>

            {/* Rights */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                6. Rechte der betroffenen Person
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Sie haben das Recht:</p>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>
                    <span className="font-semibold">Auskunftsrecht:</span> Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen
                  </li>
                  <li>
                    <span className="font-semibold">Berichtigungsrecht:</span> Unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen
                  </li>
                  <li>
                    <span className="font-semibold">Löschungsrecht:</span> Die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen
                  </li>
                  <li>
                    <span className="font-semibold">Einschränkung der Verarbeitung:</span> Die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen
                  </li>
                  <li>
                    <span className="font-semibold">Datenübertragbarkeit:</span> Ihre personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten
                  </li>
                  <li>
                    <span className="font-semibold">Widerspruchsrecht:</span> Aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                7. Datensicherheit
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Wir verwenden innerhalb des Website-Besuchs das verbreitete
                  SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils
                  höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird.
                </p>
                <p>
                  Wir bedienen uns im Übrigen geeigneter technischer und
                  organisatorischer Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige
                  oder vorsätzliche Manipulationen, teilweisen oder vollständigen
                  Verlust, Zerstörung oder gegen den unbefugten Zugriff Dritter zu
                  schützen.
                </p>
              </div>
            </section>

            {/* Changes */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                8. Aktualität und Änderung dieser Datenschutzerklärung
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Januar
                  2025.
                </p>
                <p>
                  Durch die Weiterentwicklung unserer Website und Angebote darüber oder
                  aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben
                  kann es notwendig werden, diese Datenschutzerklärung zu ändern.
                </p>
              </div>
            </section>

            {/* Last Updated */}
            <section className="mt-12 border-t border-gray-200 pt-8 dark:border-zinc-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Stand:</span> Januar 2025
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
