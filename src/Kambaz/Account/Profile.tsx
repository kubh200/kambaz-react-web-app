// import { Form, FormGroup, FormControl} from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setCurrentUser } from "./reducer";
// export default function Profile() {
//   const [profile, setProfile] = useState<any>({});
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const fetchProfile = () => {
//     if (!currentUser) return navigate("/Kambaz/Account/Signin");
//     setProfile(currentUser);
//   };
//   const signout = () => {
//     dispatch(setCurrentUser(null));
//     navigate("/Kambaz/Account/Signin");
//   };
//   useEffect(() => { fetchProfile(); }, []);
//   return (
//     <div className="container py-3" id="wd-profile-screen">
//       <h3>Profile</h3>
//       <FormGroup className="mb-3" controlId="wd-name">
//         <FormControl type="username" defaultValue="alice" />
//         <FormControl type="password" defaultValue="123" />
//         <FormControl type="text" defaultValue="Alice" />
//         <FormControl type="text" defaultValue="Wonderland" />
//         <FormControl type="date" defaultValue="2000-01-01" />
//         <FormControl type="email" placeholder="name@example.com" defaultValue={"alice@wonderland"}/>
//         <Form.Select>
//           <option selected>Faculty</option>
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//           <option value="student">Student</option>
//         </Form.Select>
//       </FormGroup>
//       <Link id="wd-signout-btn"to="/Kambaz/Account/Signin" className="btn btn-danger w-40 mb-2"> Sign Out </Link><br />
//     </div>
// );}
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { FormControl, Button } from "react-bootstrap";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, []);
  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl defaultValue={profile.username} id="wd-username" className="mb-2"
                       onChange={(e) => setProfile({ ...profile, username:  e.target.value })}/>
          <FormControl defaultValue={profile.password} id="wd-password" className="mb-2"
                       onChange={(e) => setProfile({ ...profile, password:  e.target.value })}/>
          <FormControl defaultValue={profile.firstName} id="wd-firstname" className="mb-2"
                       onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/>
          <FormControl defaultValue={profile.lastName} id="wd-lastname" className="mb-2"
                       onChange={(e) => setProfile({ ...profile, lastName:  e.target.value })}/>
          <FormControl defaultValue={profile.dob} id="wd-dob" className="mb-2"
                       onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date"/>
          <FormControl defaultValue={profile.email} id="wd-email" className="mb-2"
                       onChange={ (e) => setProfile({ ...profile, email: e.target.value })}/>
          <select onChange={(e) => setProfile({ ...profile, role:  e.target.value })}
                 className="form-control mb-2" id="wd-role">
            <option value="USER">User</option>            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>      <option value="STUDENT">Student</option>
          </select>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
</div>);}
