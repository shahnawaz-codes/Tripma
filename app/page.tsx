import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import DemoVideo from "./_components/DemoVideo";
import PopularDestinations from "./_components/PopularDestinations";
import Footer from "./_components/Footer";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <DemoVideo />
        <PopularDestinations />
      </main>
      <Footer />
    </div>
  );
}