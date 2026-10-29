import React, { useContext } from "react";
import { claim } from "./authentication.model";

const AuthenticationContext = React.createContext<{claims:claim[]; update(claims:claim[]):void}>
({claims:[],update:()=>{}});
export const useAuth = () => useContext(AuthenticationContext);
export default AuthenticationContext;