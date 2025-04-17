import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { FormControl, Button, Alert } from "react-bootstrap";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      setError(""); // Clear any previous errors
      if (!credentials.username || !credentials.password) {
        setError("Please enter both username and password");
        return;
      }
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Unable to sign in. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      signin();
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <FormControl 
        defaultValue={credentials.username} 
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} 
        onKeyPress={handleKeyPress}
        id="wd-username"
        placeholder="username"
        className="mb-1"
      />
      <FormControl 
        defaultValue={credentials.password} 
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
        onKeyPress={handleKeyPress}
        id="wd-password"
        placeholder="password" 
        type="password"
        className="mb-2"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">Sign in</Button>
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">Sign up</Link>
    </div>
  );
}