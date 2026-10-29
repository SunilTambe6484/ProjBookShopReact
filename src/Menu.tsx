import { Link, NavLink } from "react-router-dom";
import Authorized from "./auth/Authorized";
import Button from "./utilities/Button";
import { logout } from "./auth/handleJWT";
import { useContext } from "react";
import AuthenticationContext from "./auth/AuthenticationContext";

export default function Menu()
{
  const {update, claims} = useContext(AuthenticationContext);

  function getUserEmail(): string {
      return claims.filter(x => x.name === "email")[0]?.value;
  }

    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">BookShop</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/" >Home</Link>
        </li>
        <Authorized
                            role="Admin"
                            authorized={<>
        <li className="nav-item">
          <Link className="nav-link" to="/categories" >Categories</Link>

        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/authors" >Authors</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/bookshops" >Book Shop</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/book" >Book</Link>
        </li>
        </>
                            }
                            />

       
      </ul>
      <div className="d-flex">
                            <Authorized 
                                authorized={<>
                                    <span className="nav-link">Hello, {getUserEmail()}</span>
                                    <Button disabled={false}  type="button"
                                    onClick={() => {
                                        logout();
                                        update([]);
                                    }}
                                    className="nav-link btn btn-link"
                                    >Log out</Button>
                                </>}
                                notAuthorized={<>
                                    <Link to="/register" 
                                    className="nav-link btn btn-link me-1">Register</Link>
                                    <Link to="/login" 
                                    className="nav-link btn btn-link">Login</Link>
                                </>}
                            />
                        </div>
      
    </div>
  </div>
</nav>
        </>
    )
}