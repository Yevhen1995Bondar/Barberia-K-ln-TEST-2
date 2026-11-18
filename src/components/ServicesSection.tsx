import type { SiteContent } from '../types/content';

interface ServicesSectionProps {
  services: SiteContent['services'];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="leistungen" className="border-t border-[#E6E3DD] bg-[#F3F1ED]/50">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#18181B]">
            {services.heading}
          </h2>
          {services.subheading && (
            <p className="mt-3 text-base text-[#52525B] leading-relaxed">
              {services.subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="bg-white border border-[#E6E3DD] rounded-xl p-7 flex flex-col justify-between transition-colors duration-150 hover:border-[#D4CFC5]"
            >
              <div>
                <p className="text-xs font-medium tabular-nums text-[#9A5B25] mb-3">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-xl font-semibold text-[#18181B] tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#52525B] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-7 pt-5 border-t border-[#EFECE6] flex items-baseline justify-between gap-4">
                <span className="text-xs font-medium text-[#71717A]">Preis</span>
                <span className="font-display text-2xl font-semibold tabular-nums text-[#18181B]">
                  {item.price}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
