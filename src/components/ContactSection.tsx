import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { SiteContent } from '../types/content';

interface ContactSectionProps {
  contact: SiteContent['contact'];
}

interface FormState {
  name: string;
  contact: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  contact: '',
  message: '',
};

function isValidContact(value: string): boolean {
  const trimmed = value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  const digitsOnly = trimmed.replace(/\D/g, '');
  const isPhone = digitsOnly.length >= 6 && /^[+\d\s()/-]+$/.test(trimmed);
  return isEmail || isPhone;
}

export function ContactSection({ contact }: ContactSectionProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    if (formData.name.trim().length < 2) {
      setValidationError('Bitte geben Sie Ihren Namen ein.');
      return;
    }

    if (!isValidContact(formData.contact)) {
      setValidationError('Bitte geben Sie eine gültige Telefonnummer oder E-Mail-Adresse ein.');
      return;
    }

    if (formData.message.trim().length < 3) {
      setValidationError('Bitte schreiben Sie eine kurze Nachricht zu Ihrem Terminwunsch.');
      return;
    }

    setSubmitState('submitting');

    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        message: formData.message.trim(),
      }).toString();

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      const isPreviewEnv =
        import.meta.env.DEV ||
        window.location.hostname === 'localhost' ||
        window.location.hostname.endsWith('.run.app');

      if (!response.ok && !(isPreviewEnv && response.status === 404)) {
        throw new Error(`HTTP ${response.status}`);
      }

      setSubmitState('success');
      setFormData(INITIAL_FORM);
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <section id="kontakt" className="border-t border-[#E6E3DD] bg-[#FAF9F7]">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#18181B]">
              {contact.heading}
            </h2>
            <p className="mt-4 text-base text-[#52525B] leading-relaxed max-w-md">
              {contact.subheading}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E6E3DD] rounded-xl p-6 sm:p-8">
              {submitState === 'success' ? (
                <div className="py-6" role="status" aria-live="polite">
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2
                      className="w-6 h-6 text-[#15803D] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#18181B]">
                        {contact.successTitle}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-[#52525B] leading-relaxed">
                        {contact.successMessage}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitState('idle')}
                        className="mt-6 px-4 py-2 text-sm font-medium text-[#18181B] bg-[#F3F1ED] rounded-lg hover:bg-[#E6E3DD] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A5B25]"
                      >
                        {contact.resetLabel}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-[#18181B] mb-1.5"
                    >
                      {contact.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder={contact.namePlaceholder}
                      className="w-full px-4 py-2.5 text-sm sm:text-base text-[#18181B] bg-[#FAF9F7] border border-[#D4CFC5] rounded-lg placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#9A5B25] focus:ring-2 focus:ring-[#9A5B25]/20 transition-colors duration-150"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-channel"
                      className="block text-sm font-medium text-[#18181B] mb-1.5"
                    >
                      {contact.contactLabel}
                    </label>
                    <input
                      id="contact-channel"
                      name="contact"
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
                      placeholder={contact.contactPlaceholder}
                      className="w-full px-4 py-2.5 text-sm sm:text-base text-[#18181B] bg-[#FAF9F7] border border-[#D4CFC5] rounded-lg placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#9A5B25] focus:ring-2 focus:ring-[#9A5B25]/20 transition-colors duration-150"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-[#18181B] mb-1.5"
                    >
                      {contact.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder={contact.messagePlaceholder}
                      className="w-full px-4 py-2.5 text-sm sm:text-base text-[#18181B] bg-[#FAF9F7] border border-[#D4CFC5] rounded-lg placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#9A5B25] focus:ring-2 focus:ring-[#9A5B25]/20 transition-colors duration-150 resize-y"
                    />
                  </div>

                  {(validationError || submitState === 'error') && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 p-3.5 text-sm text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] rounded-lg"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{validationError ?? contact.errorMessage}</span>
                    </div>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitState === 'submitting'}
                      className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-[#18181B] rounded-lg hover:bg-[#27272A] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9A5B25]"
                    >
                      {submitState === 'submitting' ? contact.submittingLabel : contact.submitLabel}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
