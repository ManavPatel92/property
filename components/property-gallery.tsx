"use client";

import { useEffect, useState } from "react";

export function PropertyGallery({ title, images, floorplans, location }: { title: string; images: string[]; floorplans: string[]; location: string }) {
  const [current, setCurrent] = useState(0);
  const [tab, setTab] = useState<"photos" | "floorplan" | "location">("photos");
  const [isExpanded, setIsExpanded] = useState(false);
  const activeImages = tab === "floorplan" ? floorplans : images;
  const image = activeImages[current];

  const changeTab = (nextTab: "photos" | "floorplan" | "location") => {
    setIsExpanded(false);
    setTab(nextTab);
    setCurrent(0);
  };

  useEffect(() => {
    if (!isExpanded) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsExpanded(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  return (
    <div className="property-gallery" id="photos">
      {tab === "location" ? (
        <div className="gallery-map">
          <iframe
            title={`Map showing ${title}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
            loading="lazy"
          />
          <span className="map-label">{location}</span>
        </div>
      ) : image ? (
        <div className="gallery-main">
          <img src={image} alt={`${title} ${tab === "floorplan" ? "floor plan" : `photo ${current + 1}`}`} referrerPolicy="no-referrer" style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0, maxWidth: "100%", maxHeight: "100%", display: "block", objectFit: "contain", background: "#f5f5f2" }} />
          <button className="gallery-expand" type="button" onClick={() => setIsExpanded(true)} aria-label={`View ${tab === "floorplan" ? "floor plan" : "photo"} full size`} style={{ position: "absolute", right: "1rem", top: "1rem", zIndex: 2, padding: ".65rem .9rem", border: "1px solid #ffffff99", borderRadius: "2px", background: "#0c2630dc", color: "#fff", fontSize: ".8rem", fontWeight: 700, cursor: "pointer" }}>
            View larger
          </button>
          {activeImages.length > 1 && (
            <>
              <button className="gallery-arrow gallery-arrow-left" type="button" aria-label="Previous image" onClick={() => setCurrent((current - 1 + activeImages.length) % activeImages.length)}>‹</button>
              <button className="gallery-arrow gallery-arrow-right" type="button" aria-label="Next image" onClick={() => setCurrent((current + 1) % activeImages.length)}>›</button>
              <div className="gallery-dots" aria-label={`${tab} navigation`}>
                {activeImages.map((thumbnail, index) => (
                  <button className={index === current ? "gallery-dot active" : "gallery-dot"} type="button" key={`dot-${thumbnail}`} onClick={() => setCurrent(index)} aria-label={`View ${tab} ${index + 1}`} aria-current={index === current ? "true" : undefined} />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="detail-photo"><span>{tab === "floorplan" ? "Floor plans are not available" : "Executive Lets Ltd"}</span></div>
      )}

      <nav className="detail-tabs" aria-label="Property information">
        <button className={tab === "photos" ? "active" : ""} type="button" onClick={() => changeTab("photos")}>Photos</button>
        <button className={tab === "floorplan" ? "active" : ""} type="button" onClick={() => changeTab("floorplan")}>Floorplan</button>
        <button className={tab === "location" ? "active" : ""} type="button" onClick={() => changeTab("location")}>Location</button>
      </nav>

      {isExpanded && image && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${title} image viewer`} onClick={() => setIsExpanded(false)} style={{ position: "fixed", inset: 0, zIndex: 1000, display: "grid", placeItems: "center", padding: "4rem clamp(1rem,4vw,4rem)", background: "#07171eef" }}>
          <button className="lightbox-close" type="button" onClick={() => setIsExpanded(false)} aria-label="Close full-size image" style={{ position: "fixed", right: "1.25rem", top: "1.25rem", zIndex: 2, padding: ".7rem 1rem", border: "1px solid #ffffff80", background: "#fff", color: "#0c2630", fontWeight: 800, cursor: "pointer" }}>Close ×</button>
          <img src={image} alt={`${title} ${tab === "floorplan" ? "floor plan" : `photo ${current + 1}`} full size`} referrerPolicy="no-referrer" onClick={(event) => event.stopPropagation()} style={{ display: "block", width: "auto", height: "auto", maxWidth: "100%", maxHeight: "calc(100vh - 8rem)", objectFit: "contain", boxShadow: "0 18px 60px #0009" }} />
          {activeImages.length > 1 && (
            <>
              <button className="lightbox-arrow lightbox-arrow-left" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setCurrent((current - 1 + activeImages.length) % activeImages.length); }} style={{ position: "fixed", left: "1rem", top: "50%", zIndex: 2, width: "3.2rem", height: "4.5rem", transform: "translateY(-50%)", border: 0, background: "#ffffffdf", color: "#0c2630", fontSize: "2.5rem", cursor: "pointer" }}>‹</button>
              <button className="lightbox-arrow lightbox-arrow-right" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setCurrent((current + 1) % activeImages.length); }} style={{ position: "fixed", right: "1rem", top: "50%", zIndex: 2, width: "3.2rem", height: "4.5rem", transform: "translateY(-50%)", border: 0, background: "#ffffffdf", color: "#0c2630", fontSize: "2.5rem", cursor: "pointer" }}>›</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
