import { useEffect, useState } from 'react';
import rawContent from '../content.json';
import type { SiteContent } from './types/content';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const initialContent = rawContent as SiteContent;

export default function App() {
  const [content, setContent] = useState<SiteContent>(initialContent);

  useEffect(() => {
    document.title = content.brandName;
  }, [content.brandName]);

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    let cancelled = false;
    fetch(`/content.json?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((freshContent: SiteContent | null) => {
        if (!cancelled && freshContent) {
          setContent(freshContent);
        }
      })
      .catch(() => {
        // Fallback to statically imported content.json
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToContact = () => {
    const contactEl = document.getElementById('kontakt');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#18181B]">
      <main className="flex-1">
        <HeroSection
          brandName={content.brandName}
          nav={content.nav}
          hero={content.hero}
          onBookClick={scrollToContact}
        />
        <ServicesSection services={content.services} />
        <ContactSection contact={content.contact} />
      </main>
      <Footer footer={content.footer} />
    </div>
  );
}
