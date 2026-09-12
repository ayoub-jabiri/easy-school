import LandingHeader from "../../components/landing-page/LandingHeader";
import HeroSection from "../../components/landing-page/HeroSection";
import AboutSection from "../../components/landing-page/AboutSection";
import AcademicDepartmentsSection from "../../components/landing-page/AcademicDepartmentsSection";
import FacultyMentorshipSection from "../../components/landing-page/FacultyMentorshipSection";
import TestimonialSection from "../../components/landing-page/TestimonialSection";
import FAQSection from "../../components/landing-page/FAQSection";
import CTASection from "../../components/landing-page/CTASection";
import LandingFooter from "../../components/landing-page/LandingFooter";
import ScrollToTop from "../../components/global/ScrollToTop";

export default function LandingPage() {
    return (
        <>
            <LandingHeader />
            <HeroSection />
            <AboutSection />
            <AcademicDepartmentsSection />
            <FacultyMentorshipSection />
            <TestimonialSection />
            <FAQSection />
            <CTASection />
            <LandingFooter />
            <ScrollToTop />
        </>
    );
}
