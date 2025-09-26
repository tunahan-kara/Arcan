import Header from "../components/Header";
import Footer from "../components/Footer";
import Product from "../components/Product";

export default function OrderPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Product />
      </main>
      <Footer />
    </>
  );
}
