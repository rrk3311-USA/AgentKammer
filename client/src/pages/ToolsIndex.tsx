import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { AdminLoginForm } from "@/admin/AdminShell";
import "@/admin/admin-theme.css";

const AUTH_KEY = "ak_admin_basic";

export default function ToolsIndex() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(AUTH_KEY));
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Tools | Agent Kammer";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow, noarchive");
  }, []);

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const next = `Basic ${btoa(`${user.trim()}:${pass}`)}`;
      const session = await fetch("/api/admin/session", { headers: { Authorization: next } });
      if (!session.ok) {
        const body = await session.json().catch(() => ({}));
        throw new Error(body.error || "Invalid credentials");
      }
      sessionStorage.setItem(AUTH_KEY, next);
      setToken(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <AdminLoginForm
        title="Tools"
        subtitle="Unlisted operator desks. Not in the public site or the advisory sidebar."
        onSubmit={signIn}
        error={error}
        loading={loading}
        user={user}
        pass={pass}
        setUser={setUser}
        setPass={setPass}
      />
    );
  }

  return (
    <div className="ak-admin min-h-screen bg-[#F4F1EB] px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ak-brass)]">
          Unlisted
        </p>
        <h1 className="ak-admin-display mt-2 text-[36px] text-[var(--ak-ink)]">Tools</h1>
        <p className="mt-2 text-[14px] text-[var(--ak-secondary)]">
          Operator surfaces that stay off the primary nav. Same credentials as /admin.
        </p>
        <Link
          href="/tools/curation"
          className="ak-admin-card mt-8 block px-5 py-5 no-underline transition hover:bg-white"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ak-brass)]">
            Curation IQ
          </p>
          <p className="mt-1 text-[18px] text-[var(--ak-ink)]">Suggested → Selected report queue</p>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--ak-secondary)]">
            Twice-monthly shortlist, Kammer Report queue, secret replacement mark, sell / unsell.
          </p>
        </Link>
        <button
          type="button"
          className="mt-6 text-[12px] text-[var(--ak-muted)]"
          onClick={() => {
            sessionStorage.removeItem(AUTH_KEY);
            setToken(null);
            setLocation("/admin/tools");
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
