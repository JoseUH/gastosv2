const NavButtons = ({ pasoActual, pasoAnterior, siguientePaso }) => {
    return (
      <nav>
        <button type="button" onClick={pasoAnterior}>
          Atrás
        </button>
        <button type="button" onClick={siguientePaso}>
          {pasoActual === 2 ? "Finalizar" : "Siguiente"}
        </button>
      </nav>
    );
  };
  
  export default NavButtons;
  