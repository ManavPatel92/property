export const nav = [
  ["Home", "/"],
  ["Lettings", "/lettings"],
  ["Sales", "/sales"],
  ["Properties", "/properties"],
  ["Property Management", "/property-management"],
  ["International", "/international"],
  ["Partners", "/partners"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export const phoneDisplay = "07535 317777";
export const phoneHref = "tel:+447535317777";

export const partners = [
  { short: "PRS", name: "Property Redress Scheme", logo: "/partner-prs.png" },
  { short: "ICO", name: "Information Commissioner's Office", logo: "/partner-ico.png" },
  { short: "HomeLet", name: "HomeLet", logo: "/partner-homelet.png" },
  { short: "DPS", name: "Deposit Protection Service", logo: "/partner-dps.png" },
  { short: "NRLA", name: "National Residential Landlords Association", logo: "/partner-nrla.png" },
] as const;
