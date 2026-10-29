import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthenticationContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { claims } = useAuth();

    // Check if the user has admin role
    const isAdmin = claims.some(claim => claim.name === "role" && claim.value === "Admin");

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}