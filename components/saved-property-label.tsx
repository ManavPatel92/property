"use client";

import { useEffect, useState } from "react";

const SAVED_PROPERTIES_KEY = "executive-lets-saved-properties";

export function SavedPropertyLabel({ propertyId }: { propertyId: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const savedProperties = JSON.parse(localStorage.getItem(SAVED_PROPERTIES_KEY) || "[]");
      setSaved(Array.isArray(savedProperties) && savedProperties.includes(propertyId));
    } catch {
      setSaved(false);
    }
  }, [propertyId]);

  if (!saved) return null;
  return <span className="saved-property-label">♥ Saved</span>;
}
