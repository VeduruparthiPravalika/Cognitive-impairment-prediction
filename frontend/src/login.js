import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signupMode, setSignupMode] = useState(false);

  const handleSubmit = async () => {

    try {

      const url = signupMode
        ? "http://localhost:3001/auth/signup"
        : "http://localhost:3001/auth/login";

      const res = await axios.post(url, { name, password });

      if (signupMode) {
        alert("Signup successful! Please login.");
        setSignupMode(false);
      } else {

        localStorage.setItem("userId", res.data.userId);
        alert(res.data.message);

        window.location.reload();
      }

    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div style={{ textAlign:"center", marginTop:"100px" }}>

      <h2>{signupMode ? "Signup" : "Login"}</h2>

      <input
        placeholder="Username"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleSubmit}>
        {signupMode ? "Signup" : "Login"}
      </button>

      <br/><br/>

      <button onClick={()=>setSignupMode(!signupMode)}>
        {signupMode ? "Already have account? Login" : "Create Account"}
      </button>

    </div>
  );
}

export default Login;