"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0E1A",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: 320,
          padding: 32,
          borderRadius: 20,
          background: "#10152B",
          border: "1px solid rgba(255,255,255,.12)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-archivo-black)",
            fontSize: 20,
            color: "#fff",
            textTransform: "uppercase",
          }}
        >
          Admin Login
        </div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.16)",
            color: "#fff",
            fontSize: 14,
            outline: "none",
          }}
        />
        {error && <div style={{ color: "#ff3f8e", fontSize: 13 }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 16px",
            borderRadius: 999,
            background: "#22d3ee",
            color: "#0A0E1A",
            fontWeight: 700,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
