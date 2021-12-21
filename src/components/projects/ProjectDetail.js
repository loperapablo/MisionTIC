import { gql, useQuery } from "@apollo/client";
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import QuienEs from "../QuienEs";
import Avances from "./Avances";
import Inscripciones from "./Inscripciones";

export const GET_PROJECTS = gql`
{
  Proyectos {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider{
      _id
    }
    objetivos{
      descripcion
      tipo
    }  
  }
}
`




const ProjectDetail = () => {
    var { id } = useParams();

    const { data } = useQuery(GET_PROJECTS)

    

    

    var datos = data.Proyectos.filter(o => o._id === id)
    var Proyecto = datos[0]
    
    
    return (
        <div>
             <h1>{Proyecto.nombre}</h1>        
            <h4>Estado: {Proyecto.estado}</h4>
            <h4>Fase del proyecto: {Proyecto.fase}</h4>
        <h4>Presupuesto: ${Proyecto.presupuesto}</h4> 
        <Link className='btn btn-primary '
          to={{
            pathname: `/project/edit/${Proyecto._id}`
          }}
          state={{
            Proyecto
          }}
                        >
          EDITAR PROYECTO
          

           {/* to={{                              
                                    pathname: `/user/${_id}`,                                                                  
                                }}
                                state={{
                                    idUsuarioo: _id ,
                                    nombreUsuario: nombre ,
                                    apellidoUsuario: apellido ,
                                    rolUsuario:  rol ,
                                    estadoUsuario:  estado ,
                                    passwordUsuario:  password ,
                                    identUsuario:  identificacion ,
                                    correoUsuario: correo
                                }} */}


          </Link> 

            <hr />
            <h3>Avances</h3>
            <Avances/>
            
            <hr />
        <h3>Inscripciones</h3>
        <p>Ir a la página de inscripciones</p>
        <Link className='btn btn-warning '
                          to={{
                            pathname: `/project/inscripciones/${Proyecto._id}`,
                            idProyecto: `${Proyecto._id}`
                          }}
                        >
                          Inscripciones
          </Link> 
            {/* <Inscripciones /> */}
        </div>
    )
}

export default ProjectDetail
