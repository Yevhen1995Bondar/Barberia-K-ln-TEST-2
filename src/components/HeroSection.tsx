import { useState } from 'react';
import { ArrowDownRight, Scissors } from 'lucide-react';
import type { SiteContent } from '../types/content';

interface HeroSectionProps {
  brandName: string;
  nav: SiteContent['nav'];
  hero: SiteContent['hero'];
  onBookClick: () => void;
}

export function HeroSection({ brandName, nav, hero, onBookClick }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-[#FAF9F7]">
      <header className="border-b border-[#E6E3DD]">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-display text-xl font-semibold tracking-tight text-[#18181B] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A5B25] rounded-sm"
          >
            {brandName}
          </a>

          <nav
            aria-label="Hauptnavigation"
            className="hidden sm:flex items-center gap-7 text-sm font-medium text-[#52525B]"
          >
            <a
              href="#leistungen"
              className="hover:text-[#18181B] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A5B25] rounded-sm"
            >
              {nav.servicesLabel}
            </a>
            <a
              href="#kontakt"
              className="hover:text-[#18181B] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A5B25] rounded-sm"
            >
              {nav.contactLabel}
            </a>
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onBookClick}
              className="px-4 py-2 text-sm font-medium text-white bg-[#18181B] rounded-lg hover:bg-[#27272A] active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9A5B25]"
            >
              {nav.ctaLabel}
            </button>
          </div>
        </div>
      </header>

      <section id="top" className="max-w-6xl mx-auto px-6 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            {hero.kicker && (
              <p className="text-sm font-medium text-[#9A5B25] mb-4">
                {hero.kicker}
              </p>
            )}
            <h1 className="font-display font-semibold tracking-tight text-[#18181B] leading-[1.12] [text-wrap:balance] text-[clamp(2.25rem,4vw,3.5rem)]">
              {hero.headline}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl">
              {hero.subheadline}
            </p>
            <div className="mt-8 flex items-center">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white bg-[#18181B] rounded-lg hover:bg-[#27272A] active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9A5B25]"
              >
                <span>{hero.ctaLabel}</span>
                <ArrowDownRight className="w-4 h-4 text-[#E7D8C9]" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] sm:min-h-[380px] rounded-xl overflow-hidden border border-[#E6E3DD] bg-[#F2F0EC]">
              {!imageError && hero.heroImage ? (
                <img
                  src={hero.heroImage}
                  alt={hero.heroImageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#F2F0EC] to-[#E6E3DD]">
                  <Scissors className="w-10 h-10 text-[#9A5B25] mb-3" aria-hidden="true" />
                  <p className="font-display text-lg font-semibold text-[#18181B]">{brandName}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
