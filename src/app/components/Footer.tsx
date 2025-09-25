export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-500">
        © {new Date().getFullYear()} MarkaAdı. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
