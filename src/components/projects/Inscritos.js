import { gql, useQuery, useMutation } from "@apollo/client";
import React from 'react'

export const GET_INSCRIPCIONES = gql`
{
  Inscripciones{
    _id
    estado
    estudiante{
      _id
      nombre
      apellido
    }
    proyecto{
      _id
    }    
  }
}
`
const UPDATE_INSC = gql`
mutation AprobarInscripcion(
        $_id: String!        
        ) {
  aprobarInscripcion(id: $_id){
    estado
  }
}
`
const Inscritos = ({ id }) => {

  const { data, error, loading } = useQuery(GET_INSCRIPCIONES)  
  const [AprobarInscripcion] = useMutation(UPDATE_INSC, {    
        refetchQueries: [{ query: GET_INSCRIPCIONES }],
  })

    if (loading) return <p>Cargando</p>
    if (error) {
        return <p>Error</p>
    } 
    
    return (
        <div>
            {data.Inscripciones.map((el) => {
              if (id === el.proyecto._id)
              {
                return <div className="card" key={el._id}>
                          
                          <div className="card-body">
                            <blockquote className="blockquote mb-0">
                              <p>{el.estudiante.nombre} {el.estudiante.apellido}</p>
                      <footer className="blockquote-footer"><cite title="Source Title">{el.estado}</cite></footer>
                      {el.estado == 'PENDIENTE' && 
                        <button
                        onClick={async (e) => {
                          e.preventDefault();
                          await AprobarInscripcion({
                            variables: {
                              _id: el._id,                              
                            }
                          })
                        }}
                        className='btn btn-success btn-block'>Aprobar Inscripción</button>
                      }
                            </blockquote>
                          </div>
                      </div>}
                   
            })} 
       
        </div>
    )
}

export default Inscritos
