import type { SiteContent } from '../types/content';

interface FooterProps {
  footer: SiteContent['footer'];
}

export function Footer({ footer }: FooterProps) {
  const telHref = `tel:${footer.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="border-t border-[#E6E3DD] bg-[#F3F1ED]/70">
      <div className="max-w-6xl mx-auto px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          <div>
            <p className="font-display text-lg font-semibold text-[#18181B]">
              {footer.brandName}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#71717A] mb-1.5">{footer.addressLabel}</p>
            <p className="text-sm text-[#18181B]">{footer.address}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#71717A] mb-1.5">{footer.phoneLabel}</p>
            <a
              href={telHref}
              className="text-sm text-[#18181B] hover:text-[#9A5B25] transition-colors duration-150 tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A5B25] rounded-sm"
            >
              {footer.phone}
            </a>
          </div>

          <div>
            <p className="text-xs font-medium text-[#71717A] mb-1.5">{footer.hoursLabel}</p>
            <p className="text-sm text-[#52525B] tabular-nums">{footer.hours}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E6E3DD]">
          <p className="text-xs text-[#71717A]">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
