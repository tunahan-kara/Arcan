import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import HowItWorks from "./components/HowItWorks";
import Gallery from "./components/Gallery";

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* HERO */}
        <section id="top" className="h-[80vh] grid place-items-center bg-neutral-100">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900">
              Fotoğrafını Alüminyumda Ölümsüzleştir
            </h1>
            <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
              Görselini yükle, boyutunu seç, biz üretelim ve kapına gelsin.
            </p>
            <a
              href="#product"
              className="inline-flex mt-8 px-6 py-3 rounded-xl bg-black text-white font-medium shadow hover:bg-neutral-800 transition focus:outline-none focus:ring-2 focus:ring-black/30"
            >
              Görselini Yükle
            </a>
          </div>
        </section>

        {/* NASIL ÇALIŞIR */}
        <HowItWorks />

        {/* ÖRNEK BASKILAR */}
        <Gallery />

        {/* ÜRÜN */}
        <Section className="bg-white">
          <div id="product" className="mx-auto max-w-6xl px-4 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">Alüminyum Baskı</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-video rounded-lg bg-neutral-100 flex items-center justify-center">
                <span className="text-neutral-500 text-sm">[ Görsel Yükleme Alanı (gelecek) ]</span>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-neutral-600">Tek ürün, 4 boyut seçeneği.</p>
                <div className="flex gap-2">
                  {["A4", "A3", "A2", "A1"].map((s) => (
                    <button key={s} className="px-3 py-2 border rounded-lg text-sm">
                      {s}
                    </button>
                  ))}
                </div>
                <div className="text-2xl font-semibold">₺400</div>
                <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-black text-white">
                  Satın Al
                </button>
                <div className="text-xs text-neutral-500">
                  * Satın almadan önce KVKK &amp; telif onayı alınacaktır.
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* SSS */}
        <Section className="bg-neutral-50">
          <div id="faq" className="mx-auto max-w-6xl px-4 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">Sık Sorulan Sorular</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <strong>Format?</strong> png/PNG (PDF opsiyonel)
              </li>
              <li>
                <strong>Teslim?</strong> X–Y iş günü
              </li>
              <li>
                <strong>İade?</strong> Kişiye özel ürünlerde üretim hatası dışında iade yoktur.
              </li>
            </ul>
          </div>
        </Section>

        {/* İLETİŞİM */}
        <Section className="bg-white">
          <div id="contact" className="mx-auto max-w-6xl px-4 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">İletişim</h2>
            <div className="flex flex-col md:flex-row gap-6 text-sm">
              <a
                className="px-4 py-2 rounded-lg border inline-flex w-fit"
                href="https://wa.me/90XXXXXXXXXX"
                target="_blank"
              >
                WhatsApp’tan Yaz
              </a>
              <a className="px-4 py-2 rounded-lg border inline-flex w-fit" href="mailto:info@ornek.com">
                info@ornek.com
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
