import { useContext, useState } from "react";
import { FormularContext } from "../../../../context/FormularContext/FormularContext";

const Form = ({ onAddGasto }) => {
  const { datosFormulario } = useContext(FormularContext);
  // console.log(datosFormulario);
  const Initial_state = {
    nombre: "",
    gasto: 0,
    nota: "",
  };
  const [state, setState] = useState(Initial_state);

  const handleInput = (ev) => {
    const { id, value } = ev.target;
    console.log({ ...state, [id]: value });
    setState({ ...state, [id]: value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    onAddGasto(state); // Pasamos el nuevo gasto al componente padre
    setState(Initial_state); // Limpiamos el formulario
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="nombre">Nombre:</label>
      <select name="nombre" id="nombre" onChange={handleInput}>
        <option value="selecciona  " selected="selected">
          Selecciona un participante
        </option>
        {datosFormulario.participantes.map((participante, index) => (
          <option key={index} value={participante}>
            {participante}
          </option>
        ))}
      </select>
      {/* <input
        type="text"
        id="nombre"
        value={state.nombre}
        onChange={handleInput}
      /> */}
      <label htmlFor="gasto">Gasto:</label>
      <input
        type="text"
        id="gasto"
        value={state.gasto}
        onChange={handleInput}
      />
      <label htmlFor="nota">Nota:</label>
      <input type="text" id="nota" value={state.nota} onChange={handleInput} />
      <button type="submit">Añadir</button>
    </form>
  );
};

export default Form;
