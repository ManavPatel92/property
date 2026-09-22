import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/site";
import { isAdmin } from "@/lib/admin-auth";
import { isConfigured } from "@/lib/secure";
import { loginAction } from "../actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Management sign in", robots: { index: false, follow: false } };

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (isConfigured() && await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  return <PageShell><section className="admin-wrap admin-login"><div className="admin-heading"><p className="eyebrow">Executive Lets Ltd</p><h1>Property management sign in</h1><p>Authorised team members only.</p></div>
    {!isConfigured() ? <div className="admin-notice">Account setup is pending. The site owner must configure the database and create the first login.</div> :
      <form action={loginAction} className="admin-panel admin-form"><label>Username<input name="username" autoComplete="username" required maxLength={150} /></label><label>Password<input type="password" name="password" autoComplete="current-password" required /></label>{error && <p className="form-error" role="alert">Unable to sign in. Check the details or try again later.</p>}<button className="button button-navy" type="submit">Sign in</button></form>}
  </section></PageShell>;
}
