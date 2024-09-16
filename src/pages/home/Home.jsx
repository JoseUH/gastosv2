import { useContext, useEffect, useState } from "react";
import { FormularContext } from "../../context/FormularContext/FormularContext";
import Nav from "./components/nav/Nav";
import axios from "axios";
import Form from "../create/components/formular/Form";

const Home = () => {
  const { datosFormulario } = useContext(FormularContext);
  const [gastos, setGastos] = useState([]);
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const getGastos = async () => {
      try {
        const response = await axios.get(
          "https://66c77517732bf1b79fa69a0c.mockapi.io/api/gastos/gastos"
        );
       
        setGastos(response.data);
        recalcularPagos(response.data);
      } catch (error) {
        console.error("Error al cargar los gastos:", error);
      }
    };
    getGastos();
  }, []);


  useEffect(() => {
    recalcularPagos(gastos);
  }, [gastos]);
  const recalcularPagos = (gastosActualizados) => {
    // console.log("linea1",gastosActualizados);
    
    const totalPorPersona = gastosActualizados.reduce((acc, item) => {
      const gastoNumero = Number(item.gasto); 
      if (isNaN(gastoNumero)) {
        console.error(`Gasto no es un número para el ítem ${item.id}: ${item.gasto}`);
        return acc;
      }
      if (!acc[item.nombre]) {
        acc[item.nombre] = 0;
      }
      acc[item.nombre] += gastoNumero;
      return acc;
    }, {});
  
    // console.log("Total por persona:", totalPorPersona); /
    const totalGastos = Object.values(totalPorPersona).reduce(
      (acc, gasto) => acc + gasto,
      0
    );
    const personas = Object.keys(totalPorPersona).length;
    const gastoPromedio = personas > 0 ? totalGastos / personas : 0;
  
    // console.log("Total gastos:", totalGastos); // Depuración
    // console.log("Gasto promedio:", gastoPromedio); // Depuración
  
    const diferencias = Object.entries(totalPorPersona).map(
      ([nombre, total]) => ({
        nombre,
        diferencia: total - gastoPromedio,
      })
    );
  
    // console.log("Diferencias:", diferencias); 
 
    let deudores = diferencias
      .filter((d) => d.diferencia < 0)
      .map((d) => ({ ...d, diferencia: Math.abs(d.diferencia) }));
  
    let acreedores = diferencias.filter((d) => d.diferencia > 0);
  
    // console.log("Deudores:", deudores); 
    // console.log("Acreedores:", acreedores); 
  
   
    const pagos = [];
    while (deudores.length > 0 && acreedores.length > 0) {
      const deudor = deudores[0];
      const acreedor = acreedores[0];
  
      const cantidad = Math.min(deudor.diferencia, acreedor.diferencia);
      pagos.push({
        deudor: deudor.nombre,
        acreedor: acreedor.nombre,
        cantidad: cantidad.toFixed(2),
      });
  
      deudor.diferencia -= cantidad;
      acreedor.diferencia -= cantidad;
  
      if (deudor.diferencia === 0) {
        deudores.shift();
      }
      if (acreedor.diferencia === 0) {
        acreedores.shift();
      }
    }
  
    // console.log("Pagos calculados:", pagos); 
  
    setPagos(pagos);
  };

  const agregarGasto = async (nuevoGasto) => {
    try {
      const response = await axios.post(
        "https://66c77517732bf1b79fa69a0c.mockapi.io/api/gastos/gastos",
        nuevoGasto
      );
      const gastosActualizados = [...gastos, response.data];
      setGastos(gastosActualizados);
    } catch (error) {
      console.error("Error al agregar el gasto:", error);
    }
  };

  const eliminar = (id) => {
    axios
      .delete(
        "https://66c77517732bf1b79fa69a0c.mockapi.io/api/gastos/gastos/" + id
      )
      .then(() => {
        const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
        setGastos(gastosActualizados);
      });
  };

  return (
    <div>
   <Nav/>
      <h2>Resumen de Pagos</h2>
      {pagos.length > 0 ? (
        pagos.map((pago, index) => (
          <div key={index}>
            <h3>
              {pago.deudor} le debe a {pago.acreedor} {pago.cantidad}€
            </h3>
          </div>
        ))
      ) : (
        <p>No hay pagos pendientes.</p>
      )}
  
  <Form onAddGasto={agregarGasto} />
      <section>
        {gastos.length ? (
          <>
            {gastos.map((character) => (
              <div className="tabla" key={character.id}>
                <p>{character.nombre}</p>
                <p>{character.nota}</p>
                <p>{character.gasto}</p>
                <button onClick={() => eliminar(character.id)}>Eliminar</button>
              </div>
            ))}
          </>
        ) : (
          <p>Sin pagos registrados</p>
        )}
      </section>
    </div>
  );
};

export default Home;
