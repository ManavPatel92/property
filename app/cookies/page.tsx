import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = { title: "Cookie Notice" };

const sections: LegalSection[] = [
  { title: "What this notice covers", paragraphs: ["This notice explains how Executive Lets Ltd uses cookies, local storage, pixels and scripts on this website."] },
  { title: "Strictly necessary storage", paragraphs: ["We use essential storage for [SECURITY AND FRAUD PREVENTION], [COOKIE CHOICES] and saved properties. These technologies are needed for the website to work."] },
  { title: "Analytics and marketing", paragraphs: ["Analytics: [CHOOSE: WE DO NOT USE ANALYTICS / TOOL NAME AND PURPOSE]. Marketing and advertising: [WE DO NOT USE ADVERTISING TRACKING / DESCRIBE THE TOOLS AND CONSENT]."] },
  { title: "Cookies and storage list", items: ["[NAME OR STORAGE KEY] — set by [PARTY] — purpose: [PURPOSE] — type: [COOKIE / LOCAL STORAGE] — lasts: [DURATION]."] },
  { title: "Third-party content", paragraphs: ["The Contact page may load OpenStreetMap and property photographs may be delivered by [HOSTING OR STORAGE PROVIDER]. Confirm the providers, cookies and international transfers before publishing."] },
  { title: "Your choices", paragraphs: ["You can block or delete cookies in your browser settings. [ADD COOKIE BANNER AND COOKIE SETTINGS INSTRUCTIONS IF NON-ESSENTIAL COOKIES ARE USED.] Questions: [PRIVACY EMAIL ADDRESS]."] },
];

export default function CookiesPage() {
  return <LegalPage eyebrow="Legal" title="Cookie and Storage Notice" sections={sections} />;
}
