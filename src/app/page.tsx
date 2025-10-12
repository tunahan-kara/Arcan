import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import HowItWorks from "./components/HowItWorks";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";

export default function Page() {
  return (
    <>
      <Header />

      <main className="pt-16">
        {/* HERO (arka planda fade’li slider) */}
        <Hero />

        {/* NASIL ÇALIŞIR */}
        <HowItWorks />

        {/* ÖRNEK BASKILAR */}
        <Gallery />

        {/* SSS */}
        <Section className="bg-neutral-50">
          <div id="faq" className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">Sık Sorulan Sorular</h2>
            <ul className="space-y-4 text-sm">
              <li><strong>Hangi formatları destekliyorsunuz?</strong> JPG ve PNG dosyaları yükleyebilirsiniz.</li>
              <li><strong>Teslim süresi nedir?</strong> Sipariş onayından itibaren ortalama 5–7 iş gününde kargoya verilir.</li>
              <li><strong>Kargo ücreti dahil mi?</strong> 500 TL üzeri siparişlerde ücretsizdir, altında standart kargo ücreti uygulanır.</li>
              <li><strong>İade mümkün mü?</strong> Kişiye özel baskı ürünlerinde üretim hatası dışında iade yapılamaz.</li>
              <li><strong>Fotoğrafım yeterince kaliteli mi?</strong> Sistem düşük çözünürlükte uyarı verir. Net olmayan fotoğraflar baskıda bulanık görünebilir.</li>
              <li><strong>Ödemeyi nasıl yapabilirim?</strong> Kredi kartı veya havale/EFT ile ödeme yapabilirsiniz. (Ödeme entegrasyonu Gün 8’de eklenecek)</li>
            </ul>
          </div>
        </Section>

        {/* İLETİŞİM */}
        <Section className="bg-white">
          <div id="contact" className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">İletişim</h2>
            <div className="flex flex-col md:flex-row gap-6 text-sm">
              <a
                className="px-4 py-2 rounded-lg border inline-flex w-fit items-center gap-2 hover:bg-neutral-50 transition"
                href="https://wa.me/90XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp’tan Yaz
              </a>
              <a
                className="px-4 py-2 rounded-lg border inline-flex w-fit items-center gap-2 hover:bg-neutral-50 transition"
                href="mailto:info@ornek.com"
              >
                📧 info@ornek.com
              </a>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
