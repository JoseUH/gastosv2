import { createContext, useState } from "react";

export const FormularContext = createContext();

export const FormularProvider = ({ children }) => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombreGrupo: "",
    participantes: [],
  });

  return (
    <FormularContext.Provider value={{ datosFormulario, setDatosFormulario }}>
      {children}
    </FormularContext.Provider>
  );
};
