"use client";

import { useEffect, useState } from "react";

const SAVED_PROPERTIES_KEY = "executive-lets-saved-properties";

export function SavePropertyButton({ propertyId }: { propertyId: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const savedProperties = JSON.parse(localStorage.getItem(SAVED_PROPERTIES_KEY) || "[]");
      setSaved(Array.isArray(savedProperties) && savedProperties.includes(propertyId));
    } catch {
      setSaved(false);
    }
  }, [propertyId]);

  const toggleSaved = () => {
    try {
      const savedProperties = JSON.parse(localStorage.getItem(SAVED_PROPERTIES_KEY) || "[]");
      const current = Array.isArray(savedProperties) ? savedProperties.filter(value => typeof value === "string") : [];
      const next = saved
        ? current.filter(id => id !== propertyId)
        : Array.from(new Set([...current, propertyId]));
      localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(next));
      setSaved(!saved);
    } catch {
      setSaved(false);
    }
  };

  return (
    <button className={saved ? "button button-navy save-property saved" : "button button-navy save-property"} type="button" onClick={toggleSaved} aria-pressed={saved}>
      <span aria-hidden="true">{saved ? "♥" : "♡"}</span>
      <span>{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
