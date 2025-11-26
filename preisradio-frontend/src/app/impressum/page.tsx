import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Impressum
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Angaben gemäß § 5 TMG
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-zinc-900">
            {/* Company Info */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Betreiber der Website
              </h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="font-semibold">PrixRadio GmbH</p>
                <p>Musterstraße 123</p>
                <p>10115 Berlin</p>
                <p>Deutschland</p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Kontakt
              </h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold">Telefon:</span> +49 (0) 123 456789
                </p>
                <p>
                  <span className="font-semibold">E-Mail:</span>{' '}
                  <a
                    href="mailto:kontakt@preisradio.de"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    kontakt@preisradio.de
                  </a>
                </p>
              </div>
            </section>

            {/* Registration */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Registereintrag
              </h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold">Registergericht:</span> Amtsgericht Berlin
                </p>
                <p>
                  <span className="font-semibold">Registernummer:</span> HRB 123456 B
                </p>
              </div>
            </section>

            {/* VAT */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Umsatzsteuer-ID
              </h2>
              <div className="text-gray-700 dark:text-gray-300">
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                </p>
                <p className="mt-2 font-semibold">DE123456789</p>
              </div>
            </section>

            {/* Management */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Vertretungsberechtigte Geschäftsführer
              </h2>
              <div className="text-gray-700 dark:text-gray-300">
                <p>Max Mustermann</p>
                <p>Erika Musterfrau</p>
              </div>
            </section>

            {/* Responsible for Content */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>Max Mustermann</p>
                <p>Musterstraße 123</p>
                <p>10115 Berlin</p>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                EU-Streitschlichtung
              </h2>
              <div className="text-gray-700 dark:text-gray-300">
                <p>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:
                </p>
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-blue-600 hover:underline dark:text-blue-400"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <p className="mt-4">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
                  vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </section>

            {/* Liability for Content */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Haftung für Inhalte
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
                  auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§
                  8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
                  übermittelte oder gespeicherte fremde Informationen zu überwachen oder
                  nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                  Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
                  Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
                  von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
                  entfernen.
                </p>
              </div>
            </section>

            {/* Liability for Links */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Haftung für Links
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren
                  Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
                  Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                  Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
                  verantwortlich.
                </p>
                <p>
                  Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
                  Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                  Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der
                  verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
                  Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                  Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>
            </section>

            {/* Copyright */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Urheberrecht
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
                  Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
                  Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                  Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
                  jeweiligen Autors bzw. Erstellers.
                </p>
                <p>
                  Downloads und Kopien dieser Seite sind nur für den privaten, nicht
                  kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite
                  nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
                  beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                  Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
                  bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
                  Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>
            </section>

            {/* Last Updated */}
            <section className="mt-12 border-t border-gray-200 pt-8 dark:border-zinc-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Stand:</span> Januar 2025
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Quelle: erstellt mit dem{' '}
                <a
                  href="https://www.e-recht24.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Impressum-Generator von eRecht24
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
