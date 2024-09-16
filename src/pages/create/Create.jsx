import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormularContext } from "../../context/formularContext/FormularContext";
import NavButtons from "./components/navButton/NavButtons";
import Paso1 from "./components/paso1/Paso1";
import Paso2 from "./components/paso2/Paso2";

const Create = () => {
  const { datosFormulario, setDatosFormulario } = useContext(FormularContext);
  const [pasoActual, setPasoActual] = useState(1);
  const navigate = useNavigate();

  const siguientePaso = () => {
    if (pasoActual === 2) {
      navigate("/home");
    } else {
      setPasoActual(pasoActual + 1);
    }
  };

  const pasoAnterior = () => {
    if (pasoActual > 1) setPasoActual(pasoActual - 1);
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <NavButtons
          pasoActual={pasoActual}
          pasoAnterior={pasoAnterior}
          siguientePaso={siguientePaso}
        />

        {pasoActual === 1 && <Paso1 datosFormulario={datosFormulario} setDatosFormulario={setDatosFormulario} />}
        {pasoActual === 2 && <Paso2 datosFormulario={datosFormulario} setDatosFormulario={setDatosFormulario} />}
      </form>
    </>
  );
};

export default Create;
