import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ano, setAno] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "userData",
      JSON.stringify({ name: name, email: email, ano: ano, password: password })
    );
    navigate("/map");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Aadhar Number:
          <input
            type="text"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignUp;
