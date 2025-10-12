export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600 gap-3">
        <p>© {new Date().getFullYear()} Alüminyum Baskı. Tüm hakları saklıdır.</p>
        <div className="flex gap-4">
          <a href="/kvkk" className="hover:underline">KVKK Aydınlatma</a>
          <a href="/telif" className="hover:underline">Telif Hakları</a>
          <a href="/mesafeli-satis" className="hover:underline">Mesafeli Satış Sözleşmesi</a>
        </div>
      </div>
    </footer>
  );
}
