import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "./AuthenticationContext";
import { authenticationModel, loginResponse } from "./authentication.model";
import { loginEndPoint } from "../endpoints";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJWT";

export default function Login()
{
   
    const {update} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    async function login(model: authenticationModel){
        try {
           
            const response = await axios
            .post<loginResponse>(`${loginEndPoint}`, model);
           
            saveToken(response.data);           
            update(getClaims());
            navigate('/');
        }
        catch (error){
            console.log("Error");
        }
    }

    return (
        <>
            <h3>Login</h3>
            
            <AuthForm buttonTitle="Login" model={{email: '', password: ''}}
             onSubmit={async values => await login(values)}
            />
        </>
    )
}