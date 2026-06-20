import { useAdminAuth } from "../hooks/useAdminAuth";
import { AdminLogin } from "../admin/AdminLogin";
import { AdminPanel } from "../admin/AdminPanel";
import { COLORS } from "../constants/colors";

export function AdminPage({ gallery, persist, scheduleSave, saveError }) {
  const { authed, loading, login, logout } = useAdminAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-body"
        style={{ background: COLORS.forest, color: COLORS.cream }}
      >
        <p className="text-sm tracking-wide">Łączenie z Firebase…</p>
      </div>
    );
  }

  if (!authed) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <AdminPanel
      gallery={gallery}
      persist={persist}
      scheduleSave={scheduleSave}
      saveError={saveError}
      onLogout={logout}
    />
  );
}
