import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
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
    </div>
);}

