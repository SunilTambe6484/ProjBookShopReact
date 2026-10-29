import { useEffect, useState } from "react";
import { claim } from "./authentication.model";
import AuthenticationContext from "./AuthenticationContext";
import { getClaims, getToken } from "./handleJWT";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [claims, setClaims] = useState<claim[]>([]);

    const updateClaims = (newClaims: claim[]) => setClaims(newClaims);

    useEffect(() => {
        const token = getToken();
        if (token) {
            updateClaims(getClaims());
           
        }
    }, []);

    return (
        <AuthenticationContext.Provider value={{ claims, update: updateClaims }}>
            {children}
        </AuthenticationContext.Provider>
    );
}