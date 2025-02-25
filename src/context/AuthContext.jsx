import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient.js";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user && window.location.pathname === "/login") {
        navigate("/search");
      } else if (
        !session?.user &&
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register" &&
        window.location.pathname !== "/" &&
        window.location.pathname !== "/search" &&
        window.location.pathname !== "/onboarding" &&
        window.location.pathname !== "/confirmation"
      ) {
        navigate("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  async function login(email, password) {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return error;
      }

      setUser(data.user);

      navigate("/search");
      return { data };
    } catch (err) {
      console.log("Unexpected login error:", err);
      setError("An unexpected error occurred during login");
      return { error: err };
    } finally {
      setLoading(false);
    }
  }

  async function signUp(username, email, password) {
    console.log("Signing up with username:", username);
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      console.log("Data from supabase:", data);

      if (error) {
        console.error("Sign-up error:", error.message);
        setError(error.message);
        return error;
      }

      console.log("Sign-up successful:", data);
      return { data };
    } catch (err) {
      console.error("Unexpected error during sign-up:", err);
      setError("An unexpected error occurred during sign-up");
      return { error: err };
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log("logOut failed", err);
      setError("An unexpected error occurred during logout");
    } finally {
      setLoading(false);
    }
  }

  const AuthData = {
    user,
    login,
    signUp,
    logout,
    error,
    setError,
    loading,
  };

  return (
    <AuthContext.Provider value={AuthData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
