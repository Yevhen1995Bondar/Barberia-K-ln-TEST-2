export interface ServiceItem {
  title: string;
  description: string;
  price: string;
}

export interface SiteContent {
  brandName: string;
  nav: {
    servicesLabel: string;
    contactLabel: string;
    ctaLabel: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    ctaLabel: string;
    heroImage: string;
    heroImageAlt: string;
  };
  services: {
    heading: string;
    subheading: string;
    priceLabel: string;
    items: ServiceItem[];
  };
  contact: {
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successMessage: string;
    resetLabel: string;
    errorMessage: string;
    validationNameError: string;
    validationContactError: string;
    validationMessageError: string;
  };
  footer: {
    brandName: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    phone: string;
    hoursLabel: string;
    hours: string;
    copyright: string;
  };
}
