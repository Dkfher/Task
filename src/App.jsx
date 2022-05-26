import React, { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento Vacio");
      setError("El campo esta vacio,escriba algo por favor");
      return;
    }
    console.log(tarea);

    setTareas([...tareas, { id: nanoid(), nombreTarea: tarea }]);

    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };

  const editarTarea = (item) => {
    console.log(item);
    setEditar(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };

  const editTask = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento Vacio");
      setError("El campo esta vacio,escriba algo por favor");
      return;
    }
    const arrayEdit = tareas.map((item) =>
      item.id === id ? { id, nombreTarea: tarea } : item
    );

    setTareas(arrayEdit);

    setEditar(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">CRUD Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center blockquote">Lista de Tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <div className="alert alert-info" role="alert">
                Actualmente no existen tareas!
              </div>
            ) : (
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-end"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-end mx-2"
                    onClick={() => editarTarea(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center blockquote">
            {editar ? "Editar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={editar ? editTask : agregarTarea}>
          

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {editar ? (
              <button className="btn btn-warning btn-block">Editar</button>
            ) : (
              <button className="btn btn-primary btn-block">Agregar</button>
            )}
          
              {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
