import { useState } from "react";
import ParticipanteItem from "./components/ParticipanteItem";


const Paso2 = ({ datosFormulario, setDatosFormulario }) => {
  const [nuevoParticipante, setNuevoParticipante] = useState("");
  const [editando, setEditando] = useState(null);
  const [visible, setVisible] = useState(true);

  const handleInput = (ev) => {
    setNuevoParticipante(ev.target.value);
  };

  const agregarParticipante = () => {
    if (nuevoParticipante.trim() !== "") {
      if (editando !== null) {
        const participantesActualizados = datosFormulario.participantes.map(
          (participante, index) =>
            index === editando ? nuevoParticipante : participante
        );
        setDatosFormulario({
          ...datosFormulario,
          participantes: participantesActualizados,
        });
        setEditando(null);
      } else {
        setDatosFormulario({
          ...datosFormulario,
          participantes: [...datosFormulario.participantes, nuevoParticipante],
        });
      }
      setNuevoParticipante("");
    }
  };

  const eliminarParticipante = (index) => {
    const participantesFiltrados = datosFormulario.participantes.filter(
      (_, i) => i !== index
    );
    setDatosFormulario({
      ...datosFormulario,
      participantes: participantesFiltrados,
    });
  };

  const editarParticipante = (index) => {
    setNuevoParticipante(datosFormulario.participantes[index]);
    setEditando(index);
  };

  const cambiarVisible = () => setVisible(!visible);

  return (
    <>
      <button onClick={cambiarVisible}>
        {visible ? "🫣" : "👁️"}
      </button>

      <label htmlFor="participantes">
        {editando !== null ? "Edita el participante" : "Añadir participante"}
      </label>
      <input
        type="text"
        id="participantes"
        value={nuevoParticipante}
        onChange={handleInput}
      />
      {nuevoParticipante.trim() !== "" && (
        <button type="button" onClick={agregarParticipante}>
          {editando !== null ? "Guardar" : "Añadir"}
        </button>
      )}

      <br />

      {datosFormulario.participantes.length > 0 &&
        datosFormulario.participantes.map((participante, index) => (
          <ParticipanteItem
            key={index}
            participante={participante}
            index={index}
            visible={visible}
            eliminarParticipante={eliminarParticipante}
            editarParticipante={editarParticipante}
          />
        ))}
    </>
  );
};

export default Paso2;
