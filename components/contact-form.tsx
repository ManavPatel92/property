"use client";

import { useActionState } from "react";
import { sendContactEmail, type ContactFormState } from "@/app/contact/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactEmail, initialState);

  return <form className="contact-form" action={formAction}>
    <h2>Send us a message</h2>
    <label>Name<input name="name" required maxLength={120} autoComplete="name" /></label>
    <label>Email<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
    <label>Message<textarea name="message" required maxLength={3000} rows={5} /></label>
    <button className="button button-copper" type="submit" disabled={pending}>{pending ? "Sending..." : "Send message"}</button>
    {state.message && <p className={state.status === "success" ? "form-success" : "form-error"} aria-live="polite">{state.message}</p>}
  </form>;
}