export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-sm leading-relaxed text-neutral-800">
      <h1 className="text-2xl font-semibold mb-6">Kişisel Verilerin Korunması Aydınlatma Metni</h1>
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, veri sorumlusu sıfatıyla
        işlediğimiz kişisel verileriniz hakkında sizleri bilgilendirmek isteriz.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">1. Veri Sorumlusu</h2>
      <p>Bu internet sitesi üzerinden toplanan kişisel veriler, [Şirket Ünvanı] tarafından işlenmektedir.</p>

      <h2 className="text-xl font-semibold mt-6 mb-3">2. İşlenen Kişisel Veriler</h2>
      <p>
        İsim, soyisim, iletişim bilgileri (telefon, e-posta), adres, ödeme bilgileri, IP adresi,
        sipariş bilgileri.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">3. İşleme Amaçları</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Siparişlerin alınması, işlenmesi ve teslimatının sağlanması</li>
        <li>Müşteri ilişkileri yönetimi ve destek hizmetleri</li>
        <li>Faturalama ve muhasebe süreçleri</li>
        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">4. Aktarım</h2>
      <p>Kişisel verileriniz, yasal yükümlülükler çerçevesinde yetkili kurumlarla paylaşılabilir.</p>

      <h2 className="text-xl font-semibold mt-6 mb-3">5. Haklarınız</h2>
      <p>
        KVKK m.11 uyarınca; kişisel verilerinize erişme, düzeltilmesini talep etme, silinmesini
        isteme haklarına sahipsiniz. Başvurular için info@ornek.com adresinden bize ulaşabilirsiniz.
      </p>
    </main>
  );
}
