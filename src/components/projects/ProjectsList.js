import React from 'react'
import { gql, useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';

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

const ProjectsList = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS)
    if (loading) return <p>Cargando proyectos</p>
    if (error) {
        return <p>Error</p>
    }    
    return (
        <div className="row">
            <div className="col-md-8 offset-md-1">
                {
                    data.Proyectos.map(({_id, nombre, rol, estado}) => {
                    return <div key={_id} className='card m-2'> 
                                <div className="card-body">
                                    <h4>{nombre}</h4>
                            <h6>{rol}</h6>
                            <p>Estado: {estado}</p>
                          
                        <Link className='btn btn-warning '
                          to={{
                            pathname: `/project/${_id}`,
                            idProyecto: {_id}
                          }}
                        >
                          Ir al detalle
                        </Link>                            
                        
                                </div>
                            </div>
                    })
                }
            </div>
        </div>
    )
}

export default ProjectsList
