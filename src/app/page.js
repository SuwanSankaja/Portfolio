import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Resume } from '@/components/Resume';
import { Certifications } from '@/components/Certifications';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { MouseGlow } from '@/components/MouseGlow';

export default function Home() {
  return (
    <>
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <hr className="section-divider" />
        <About />
        <Skills />
        <hr className="section-divider" />
        <Projects />
        <Resume />
        <hr className="section-divider" />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
