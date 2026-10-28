"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="contenedor">
      <h1 className="titulo">Prueba Técnica Full Stack</h1>
      <p className="aviso">Sistema de Gestión de Contactos</p>
      <p className="aviso">Hecho por Erick Padilla</p>

      <button className="boton boton-primario" onClick={() => router.push("/login")}>
        Ingresar
      </button>
    </div>
  );
}
