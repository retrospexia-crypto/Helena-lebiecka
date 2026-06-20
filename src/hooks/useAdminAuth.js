import { useCallback, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

/**
 * Firebase Authentication hook for admin panel.
 * Replaces the previous client-side credential check.
 * Login: admin@helena-lebiecka.pl  (configured in Firebase Console)
 * or any Firebase Auth user with access to this project.
 */
export function useAdminAuth() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthed(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /**
   * @param {string} loginInput  – email address of the admin
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  const login = useCallback(async (loginInput, password) => {
    try {
      // Accept bare "admin" as a shorthand for the admin e-mail
      const email = loginInput.includes("@")
        ? loginInput
        : `${loginInput}@helena-lebiecka.pl`;
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return { authed, loading, login, logout };
}
