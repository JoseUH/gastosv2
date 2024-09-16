const Paso1 = ({ datosFormulario, setDatosFormulario }) => {
    const handleInput = (ev) => {
      const { id, value } = ev.target;
      setDatosFormulario({ ...datosFormulario, [id]: value });
    };
  
    return (
      <>
        <label htmlFor="nombreGrupo">Escribe aquí el nombre del grupo</label>
        <input
          type="text"
          id="nombreGrupo"
          value={datosFormulario.nombreGrupo}
          onChange={handleInput}
        />
      </>
    );
  };
  
  export default Paso1;
  