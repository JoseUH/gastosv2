import { useContext } from "react";
import { FormularContext } from "../../../../context/FormularContext/FormularContext";

const Nav = () => {
  const { datosFormulario } = useContext(FormularContext);

  return (
    <nav>
    <h1>{datosFormulario.nombreGrupo}</h1>

    <select name="language" id="language">
      <option value="gastoTotal" >
        gastoTotal
      </option>
      <option value="cambiarNombre">cambiarNombre</option>
      <option value="Salir del grupo">Salir del grupo</option>
      <option value="inicio" selected>
        icono de hamburguesa
      </option>
    </select>
  </nav>
  )
}

export default Nav
