import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  
  const pathMap: Record<string, string> = {
    Signin: "/Kambaz/Account/Signin",
    Signup: "/Kambaz/Account/Signup",
    Profile: "/Kambaz/Account/Profile",
  };

  const { pathname } = useLocation();
  // const active = (path: string) => (pathname.includes(path) ? "active" : "");
  const active = (path: string) => pathname === pathMap[path] ? "active" : "";

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          to={pathMap[link]}
          className="list-group-item border-0 text-danger"
          id={`wd-Account-${link}-link`}>
          {link}
        </Link>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kambaz/Account/Users`} className={`list-group-item border-0 text-danger${active("Users")}`}> Users </Link> )}
    </div>
  );
}

