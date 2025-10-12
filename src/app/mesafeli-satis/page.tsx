export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-sm leading-relaxed text-neutral-800">
      <h1 className="text-2xl font-semibold mb-6">Mesafeli Satış Sözleşmesi</h1>

      <h2 className="text-xl font-semibold mt-6 mb-3">1. Taraflar</h2>
      <p>
        İşbu sözleşme; bir tarafta [Şirket Ünvanı] (“Satıcı”) ile diğer tarafta internet sitesine
        üye olan veya üye olmaksızın alışveriş yapan (“Alıcı”) arasında elektronik ortamda
        düzenlenmiştir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">2. Konu</h2>
      <p>
        İşbu sözleşmenin konusu, alıcının www.ornek.com adresli internet sitesinden elektronik
        ortamda siparişini verdiği ürünün satışı ve teslimine ilişkin usul ve esasların belirlenmesidir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">3. Ürün Bilgileri</h2>
      <p>
        Ürün türü: Kişiye özel baskılı alüminyum plaka.  
        Boyut seçenekleri: A1, A2, A3, A4.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">4. Teslimat</h2>
      <p>
        Ürün, sipariş onayından itibaren 5–7 iş günü içinde kargoya verilir. Teslimat süresi
        kargo şirketine bağlı olarak değişebilir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">5. Cayma Hakkı</h2>
      <p>
        6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca, kişiye özel üretilen ürünlerde
        cayma hakkı bulunmamaktadır. Ancak üretim hatası olması halinde alıcı ürünü iade edebilir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">6. Uyuşmazlık</h2>
      <p>
        İşbu sözleşmeden doğabilecek uyuşmazlıklarda, Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri
        yetkilidir.
      </p>
    </main>
  );
}
