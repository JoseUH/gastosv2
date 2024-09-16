import { Link } from "react-router-dom";
import "./Landing.scss";

const Landing = () => {
  return (
    <>
      <header>
        <h1>¡Bienvenido!</h1>
        ¿quieres crear un grupo nuevo, o unirte a uno existente?
      </header>
        <div>
        <Link to="/create">
              <button >Crear grupo</button> 
        </Link>
       
          <button>Unirse a un grupo</button>
        </div>
    </>
  );
};

export default Landing;
