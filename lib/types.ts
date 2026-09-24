export type Status = "draft" | "available" | "under_offer" | "let_agreed" | "sold" | "off_market";

export const statuses: Status[] = ["draft", "available", "under_offer", "let_agreed", "sold", "off_market"];

export const statusNames: Record<Status, string> = {
  draft: "Draft",
  available: "Available",
  under_offer: "Under offer",
  let_agreed: "Let agreed",
  sold: "Sold",
  off_market: "Off market",
};

export type PropertyDetails = {
  title: string;
  location: string;
  address: string;
  kind: "sale" | "letting";
  price: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  imageUrl: string;
  features: string[];
  ownerNotes: string;
};

export type Property = PropertyDetails & {
  id: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
};
