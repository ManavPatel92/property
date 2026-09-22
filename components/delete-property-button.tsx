"use client";

export function DeletePropertyButton() {
  return <button className="admin-delete" type="submit" onClick={event => { if (!window.confirm("Remove this property permanently?")) event.preventDefault(); }}>Remove</button>;
}
