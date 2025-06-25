import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUserType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("http://localhost:5180/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Błąd logowania");
      }
      const data = await response.json();
      localStorage.setItem("token", data.Token);
      localStorage.setItem("role", data.role);
      setSuccess("Zalogowano pomyślnie!");
      console.log("Received role:", data.role);
      const role = (data.role || "").trim().toLowerCase();
      if (role === "client") {
        setUserType("klient");
        navigate("/klient");
      } else if (role === "employee" || role === "admin") {
        setUserType("warsztat");
        navigate("/warsztat");
      } else {
        setError("Nieznana rola użytkownika: " + data.role);
      }
    } catch (err) {
      setError(err.message || "Błąd logowania");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10vh",
      }}
    >
      <h2>Zaloguj się</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 300 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: 10, padding: "10px", width: "100%" }}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: 10, padding: "10px", width: "100%" }}
          required
        />
        <button type="submit" style={{ margin: 10, padding: "10px 30px", width: "100%" }} disabled={loading}>
          {loading ? "Logowanie..." : "Zaloguj się"}
        </button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: 10 }}>{success}</div>}
      </form>
    </div>
  );
}
