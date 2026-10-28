"use client"; // componente que corre en el navegador

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function PageLogin() {
  // estados que guardan lo que el usuario escribe y el mensaje de error
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // manda el usuario y la clave al backend para iniciar sesion
  async function entrar() {
    const respuesta = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, clave }),
    });
    // si la respuesta falla se muestra un error y no sigue
    if (!respuesta.ok) {
      setError("Usuario o clave incorrectos");
      return;
    }
    // si todo sale bien se guarda el token y se manda al usuario a contactos
    const datos = await respuesta.json();
    localStorage.setItem("token", datos.token);
    router.push("/contactos");
  }

  return (
    <div className="contenedor-login">
      <form
        className="formulario"
        onSubmit={(e) => {
          e.preventDefault();
          entrar();
        }}
      >
        <h1 className="titulo">Iniciar sesión</h1>

        <input
          className="campo"
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          className="campo"
          type="password"
          placeholder="Clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />

        <button className="boton boton-primario" type="submit">
          Entrar
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
