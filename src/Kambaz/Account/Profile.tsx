import { Link } from "react-router-dom";
import { Form, FormGroup, FormControl, Button, Row, Col } from "react-bootstrap";
export default function Profile() {
  return (
    <div className="container py-3" id="wd-profile-screen">
      <h3>Profile</h3>
      <FormGroup className="mb-3" controlId="wd-name">
        <FormControl type="username" defaultValue="alice" />
        <FormControl type="password" defaultValue="123" />
        <FormControl type="text" defaultValue="Alice" />
        <FormControl type="text" defaultValue="Wonderland" />
        <FormControl type="date" defaultValue="2000-01-01" />
        <FormControl type="email" placeholder="name@example.com" defaultValue={"alice@wonderland"}/>
        <Form.Select>
          <option selected>Faculty</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </Form.Select>
      </FormGroup>
      <Button variant="danger">Sign Out</Button>
      {/* <h3>Profile</h3>
      <input defaultValue="alice" placeholder="username" className="wd-username"/><br/>
      <input defaultValue="123"   placeholder="password" type="password"
             className="wd-password" /><br/>
      <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" /><br/>
      <input defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" /><br/>
      <input defaultValue="2000-01-01" type="date" id="wd-dob" /><br/>
      <input defaultValue="alice@wonderland" type="email" id="wd-email" /><br/>
      <select defaultValue="FACULTY" id="wd-role">
        <option value="USER">User</option>       <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
      </select><br/>
      <Link to="/Kambaz/Account/Signin" >Sign out</Link> */}
    </div>
);}

