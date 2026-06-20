import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";
import { useGallery } from "./hooks/useGallery";

export default function App() {
  const { gallery, persist, scheduleSave, saveError } = useGallery();

  return (
    <Routes>
      <Route path="/" element={<HomePage gallery={gallery} />} />
      <Route
        path="/admin"
        element={
          <AdminPage
            gallery={gallery}
            persist={persist}
            scheduleSave={scheduleSave}
            saveError={saveError}
          />
        }
      />
    </Routes>
  );
}
