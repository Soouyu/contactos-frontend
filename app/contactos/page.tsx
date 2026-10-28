"use client";// componente que corre en el navegador

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// etiquetas que ya se quedan por defecto
const ETIQUETAS = ["Familia", "Amigos", "Trabajo", "Cliente", "Proveedor"];

// la forma que tienen un contacto que viene del backend
type Contacto = {
  id: number;
  nombres: string;
  apellidos: string;
  telefono: string;
  correo: string;
  direccion: string;
  notas: string;
  empresa: string;
  cargo: string;
  etiquetas: string[];
};

export default function PageContactos() {
  // lista de contactos que se muestran
  const [contactos, setContactos] = useState<Contacto[]>([]);
  // texto del buscador
  const [busqueda, setBusqueda] = useState("");
  // un estado para cada campo del formulario
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [notas, setNotas] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [etiquetas, setEtiquetas] = useState<string[]>([]);

  // guarda el id del contacto que estoy editando (null = formulario para uno nuevo)
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const router = useRouter();

  // trae los contactos del backend enviando el token en la cabecera
  function cargar() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/contactos", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((respuesta) => respuesta.json())
      .then((datos) => setContactos(datos.content));
  }

  //filtra la lista por nombre segun lo que escriba en el buscador
  const contactosFiltrados = contactos.filter((c) =>
    c.nombres.toLowerCase().includes(busqueda.toLowerCase()));

  // al abrir la pantalla si no hay token regresa al login, si hay tokej carga los datos
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    cargar();
  }, []);

  // prende o apaga una etiqueta 
  function alternarEtiqueta(etiqueta: string) {
    if (etiquetas.includes(etiqueta)) {
      setEtiquetas(etiquetas.filter((e) => e !== etiqueta));
    } else {
      setEtiquetas([...etiquetas, etiqueta]);
    }
  }

  // deja el formulario vacio
  function limpiar() {
    setNombres("");
    setApellidos("");
    setTelefono("");
    setCorreo("");
    setDireccion("");
    setNotas("");
    setEmpresa("");
    setCargo("");
    setEtiquetas([]);
    setEditandoId(null);
  }

  // cierra sesion y borra el token  manda el login 
  function cerrarSesion() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  // guarda si hay editandoId USA PUT para editar si no post para crear
  async function guardar() {
    const token = localStorage.getItem("token");

    const url = editandoId
      ? "http://localhost:8080/api/contactos/" + editandoId
      : "http://localhost:8080/api/contactos";

    const metodo = editandoId ? "PUT" : "POST";

    await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        nombres,
        apellidos,
        telefono,
        correo,
        direccion,
        notas,
        empresa,
        cargo,
        etiquetas,
      }),
    });

    limpiar();
    cargar();
  }

  // llena el formulario con los datos del contacto para poder editarlo
  function editar(c: Contacto) {
    setEditandoId(c.id);
    setNombres(c.nombres ?? "");
    setApellidos(c.apellidos ?? "");
    setTelefono(c.telefono ?? "");
    setCorreo(c.correo ?? "");
    setDireccion(c.direccion ?? "");
    setNotas(c.notas ?? "");
    setEmpresa(c.empresa ?? "");
    setCargo(c.cargo ?? "");
    setEtiquetas(c.etiquetas ?? []);
  }

  // borra un contacto por su id y recarga  la lista
  async function eliminar(id: number) {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:8080/api/contactos/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    cargar();
  }

  return (
    <div className="contenedor">
      <div className="encabezado">
        <h1 className="titulo">Contactos</h1>
        <button className="boton boton-cerrarSesion" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      <p className="aviso">
        Hay algunos campos que son obligatorios , porfavor llenarlos
      </p>

      <form
        className="formulario"
        onSubmit={(e) => {
          e.preventDefault();
          guardar();
        }}
      >
        <input
          className="campo"
          placeholder="Nombres *"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
          required
          maxLength={50}
        />
        <input
          className="campo"
          placeholder="Apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          maxLength={50}
        />
        <input
          className="campo"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value.replace(/[^0-9]/g, ""))}
          maxLength={15}
        />
        <input
          className="campo"
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          maxLength={100}
        />
        <input
          className="campo"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          maxLength={100}
        />
        <input
          className="campo"
          placeholder="Notas"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          maxLength={200}
        />
        <input
          className="campo"
          placeholder="Empresa"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          maxLength={50}
        />
        <input
          className="campo"
          placeholder="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          maxLength={50}
        />

        <div className="etiquetas">
          {ETIQUETAS.map((etiqueta) => (
            <button
              key={etiqueta}
              type="button"
              onClick={() => alternarEtiqueta(etiqueta)}
              className={
                etiquetas.includes(etiqueta) ? "boton etiqueta-activa" : "boton etiqueta"
              }
            >
              {etiqueta}
            </button>
          ))}
        </div>

        <div className="acciones">
          <button className="boton boton-primario" type="submit">
            {editandoId ? "Guardar cambios" : "Agregar"}
          </button>

          {editandoId && (
            <button className="boton boton-secundario" type="button" onClick={limpiar}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="buscador">
        <input
          className="campo"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <ul className="lista">
        {contactosFiltrados.map((c) => (
          <li key={c.id} className="item">
            <span className="info">
              {c.nombres} {c.apellidos} — {c.correo}
              {c.etiquetas && c.etiquetas.length > 0 && (
                <span className="tags"> [{c.etiquetas.join(", ")}]</span>
              )}
            </span>
            <button className="boton boton-editar" onClick={() => editar(c)}>
              Editar
            </button>
            <button className="boton boton-borrar" onClick={() => eliminar(c.id)}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
