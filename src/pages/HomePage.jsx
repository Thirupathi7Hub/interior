import HeroSlider from '../components/home/HeroSlider';
import FeaturedProjects from '../components/home/FeaturedProjects';
import PhilosophySection from '../components/home/PhilosophySection';
import ServicesSection from '../components/home/ServicesSection';
import ProcessSection from '../components/home/ProcessSection';
import AboutSection from '../components/home/AboutSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedProjects />
      <PhilosophySection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
