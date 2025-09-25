import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b bg-white/70 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a href="#top" className="inline-flex items-center gap-2">
          <Image src="/logo.png" alt="Marka Logosu" width={140} height={40} priority />
        </a>
        <div className="flex gap-6 text-sm">
          <a href="#how">Nasıl Çalışır</a>
          <a href="#gallery">Örnekler</a>
          <a href="#product">Ürün</a>
          <a href="#faq">SSS</a>
          <a href="#contact">İletişim</a>
        </div>
      </nav>
    </header>
  );
}
