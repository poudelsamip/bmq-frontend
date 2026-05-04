import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

export default function LandingPage() {
    return (
        <div className="bg-white text-slate-900 font-[Manrope] min-h-screen flex flex-col">
            <NavBar />
            <HeroSection />
            <Footer />
        </div>
    );
}
