import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  const pathMap: Record<string, string> = {
    Signin: "/Kambaz/Account/Signin",
    Signup: "/Kambaz/Account/Signup",
    Profile: "/Kambaz/Account/Profile",
  };

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          to={pathMap[link]}
          className="list-group-item border-0 text-danger"
          id={`wd-Account-${link}-link`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function AccountNavigation() {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);

//   return (
//     <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
//       {!currentUser && (
//         <>
//           <Link
//             to="/Kambaz/Account/Signin"
//             id="wd-Account-Signin-link"
//             className="list-group-item border-0 text-danger"
//           >
//             Signin
//           </Link>
//           <Link
//             to="/Kambaz/Account/Signup"
//             id="wd-Account-Signup-link"
//             className="list-group-item border-0 text-danger"
//           >
//             Signup
//           </Link>
//         </>
//       )}

//       {currentUser && (
//         <Link
//           to="/Kambaz/Account/Profile"
//           id="wd-Account-Profile-link"
//           className="list-group-item border-0 text-danger"
//         >
//           Profile
//         </Link>
//       )}
//     </div>
//   );
// }

