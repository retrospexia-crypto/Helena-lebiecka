import { useState } from "react";
import { Lock } from "lucide-react";
import { COLORS } from "../constants/colors";

export function AdminLogin({ onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const ok = onLogin(login, password);
    setError(ok ? "" : "Nieprawidłowy login lub hasło.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 font-body" style={{ background: COLORS.forest }}>
      <div className="w-full max-w-sm p-8 rounded-sm" style={{ background: COLORS.linen }}>
        <div className="flex flex-col items-center mb-6">
          <Lock size={26} color={COLORS.wood} />
          <h1 className="mt-3 text-2xl font-display" style={{ color: COLORS.forest, fontWeight: 600 }}>
            Panel administratora
          </h1>
          <p className="text-xs mt-1" style={{ color: COLORS.charcoalSoft }}>
            Helena Lebiecka — zarządzanie galerią
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wide" style={{ color: COLORS.moss }}>
              Login
            </label>
            <input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm outline-none"
              style={{ border: `1px solid ${COLORS.sageLight}`, background: "#fff" }}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide" style={{ color: COLORS.moss }}>
              Hasło
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm outline-none"
              style={{ border: `1px solid ${COLORS.sageLight}`, background: "#fff" }}
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-xs" style={{ color: "#a33" }}>{error}</p>}
          <button
            type="submit"
            className="w-full py-2.5 text-sm tracking-wide mt-2"
            style={{ background: COLORS.forest, color: COLORS.cream }}
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
}
