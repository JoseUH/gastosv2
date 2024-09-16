const ParticipanteItem = ({ participante, index, visible, eliminarParticipante, editarParticipante }) => {
    return (
      <div>
        <p>{participante}</p>
        {!visible && (
          <>
            <button type="button" onClick={() => editarParticipante(index)}>
              Editar
            </button>
            <button type="button" onClick={() => eliminarParticipante(index)}>
              Eliminar
            </button>
          </>
        )}
      </div>
    );
  };
  
  export default ParticipanteItem;
  