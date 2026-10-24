import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import API from "../services/api";

function ProtectedRoute() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      try {
        await API.get("/auth/me");

        if (isMounted) {
          setAuthenticated(true);
        }
      } catch (error) {
        if (isMounted) {
          setAuthenticated(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } finally {
        if (isMounted) {
          setChecking(false);
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (checking) {
    return <div>Verifying your session...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;