"use client";

import { useRef, useState } from "react";
import { savePropertyAction } from "@/app/admin/actions";
import { statuses, statusNames, type Property } from "@/lib/types";

export function AdminPropertyForm({ property }: { property?: Property }) {
  const [preview, setPreview] = useState<string | null>(property?.imageUrl || null);
  const [currentUrl, setCurrentUrl] = useState<string>(property?.imageUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFileError("File is larger than 10MB. Please choose an image under 10MB.");
        e.target.value = "";
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"].includes(file.type)) {
        setFileError("Please choose a JPG, PNG, WEBP, AVIF, or GIF image.");
        e.target.value = "";
        return;
      }
      setCurrentUrl("");
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setCurrentUrl(property?.imageUrl || "");
      setPreview(property?.imageUrl || null);
    }
  };

  return (
    <form
      action={savePropertyAction}
      onSubmit={() => setIsSubmitting(true)}
      className="admin-panel admin-form property-form"
    >
      {property && <input type="hidden" name="id" value={property.id} />}
      <div className="form-grid">
        <label>
          Listing title *
          <input name="title" required maxLength={150} defaultValue={property?.title} placeholder="e.g. Modern two bedroom apartment" />
        </label>
        <label>
          Area or town *
          <input name="location" required maxLength={150} defaultValue={property?.location} placeholder="e.g. Wembley, London" />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Property address (private until added to a public description)
          <input name="address" maxLength={250} defaultValue={property?.address} />
        </label>
        <label>
          Advertised price *
          <input name="price" required maxLength={80} defaultValue={property?.price} placeholder="e.g. £1,650 pcm or £425,000" />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Listing type
          <select name="kind" defaultValue={property?.kind || "letting"}>
            <option value="letting">To let</option>
            <option value="sale">For sale</option>
          </select>
        </label>
        <label>
          Status
          <select name="status" defaultValue={property?.status || "draft"}>
            {statuses.map(status => (
              <option key={status} value={status}>{statusNames[status]}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-grid">
        <label>
          Bedrooms
          <input name="bedrooms" type="number" min="0" max="50" defaultValue={property?.bedrooms ?? 1} required />
        </label>
        <label>
          Bathrooms
          <input name="bathrooms" type="number" min="0" max="50" defaultValue={property?.bathrooms ?? 1} required />
        </label>
      </div>

      <label>
        Description *
        <textarea name="description" rows={6} maxLength={5000} required defaultValue={property?.description} placeholder="Describe the home and its highlights." />
      </label>

      <label>
        Features, one per line
        <textarea name="features" rows={4} maxLength={1200} defaultValue={property?.features.join("\n")} placeholder="Parking&#10;Garden&#10;Close to station" />
      </label>

      <div style={{ border: "1px dashed var(--line)", padding: "1.25rem", background: "#fbfaf7", borderRadius: "2px", display: "grid", gap: "0.5rem" }}>
        <label style={{ display: "grid", gap: "0.45rem", fontWeight: 700, color: "var(--navy)" }}>
          Property cover photo
          <input
            type="file"
            name="imageFile"
            ref={fileInputRef}
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            onChange={handleFileChange}
          />
        </label>
        <p style={{ margin: "0", fontSize: "0.82rem", color: "var(--muted)" }}>
          Upload an image directly from your computer or phone (JPG, PNG, WEBP, up to 10MB).
        </p>

        {fileError && (
          <p style={{ margin: "0", fontSize: "0.85rem", color: "#9b2e22", fontWeight: 600 }}>
            {fileError}
          </p>
        )}

        {preview && (
          <div style={{ marginTop: "0.6rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <img
              src={preview}
              alt="Listing preview"
              style={{ width: "160px", height: "120px", aspectRatio: "4/3", objectFit: "cover", borderRadius: "2px", border: "1px solid var(--line)" }}
            />
            <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
              {property?.imageUrl && preview === property.imageUrl ? "Current photo will be preserved unless a new file is chosen." : "Ready to upload upon saving."}
            </span>
          </div>
        )}

        {/* Retains current image URL if no new file is uploaded */}
        <input type="hidden" name="imageUrl" value={currentUrl} />

        <details style={{ marginTop: "0.6rem", fontSize: "0.82rem", color: "var(--muted)" }}>
          <summary style={{ cursor: "pointer" }}>Or paste an image web link</summary>
          <input
            type="url"
            placeholder="https://..."
            defaultValue={property?.imageUrl}
            onChange={(e) => {
              if (e.target.value) fileInputRef.current!.value = "";
              setCurrentUrl(e.target.value);
              setPreview(e.target.value || null);
            }}
            style={{ marginTop: "0.4rem" }}
          />
        </details>
      </div>

      <label>
        Private owner or staff notes / comments
        <textarea name="ownerNotes" rows={4} maxLength={2000} defaultValue={property?.ownerNotes} placeholder="Only visible in the management area (e.g. key codes, landlord instructions, staff comments)" />
      </label>

      <div className="admin-actions">
        <button className="button button-navy" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving & Uploading..." : property ? "Save changes" : "Add property"}
        </button>
        <a href="/admin">Cancel</a>
      </div>
    </form>
  );
}
