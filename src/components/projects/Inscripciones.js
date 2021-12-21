import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from 'react'
import { ToastContainer, toast, cssTransition } from "react-toastify";
import { useParams } from 'react-router-dom';
import Inscritos, { GET_INSCRIPCIONES } from "./Inscritos";

export const GET_USERS = gql`
{
    Users{
        _id
        nombre
        rol
        estado
    }
}
`

const CREATE_INSCRIPCION = gql`
    mutation Mutation(
        $estudiante: String!,
        $proyecto: String!
        ) {        
  crearInscripcion(
    proyecto: $proyecto,
    estudiante: $estudiante
  ){
    estado
  }
}
`

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut"
});

function animateCss() {
    toast.success("¡Inscripción creada!", {
        transition: bounce
    });
}

// var inscritos = {}


const Inscripciones = () => {

    
    var { id } = useParams();
    const [estudiante, setEstudiante] = useState('')

    const { loading, error, data } = useQuery(GET_USERS)
        const [Mutation] = useMutation(CREATE_INSCRIPCION, {    
                 refetchQueries: [{ query: GET_INSCRIPCIONES }],
        });
    if (loading) return <p>Cargando</p>
    if (error) {
        return <p>Error</p>
    }  

    return (
        <div>            
            
            <Inscritos id={id} />
            <br />
            <form onSubmit={async (e) => {
                e.preventDefault()
                
                await Mutation({
                    variables: {
                        estudiante,
                        proyecto: id
                        
                    }
                });
                
                
                animateCss()
            }}
            
            className="form-group">                            
                <h4>Estudiante a inscribir</h4>
                <div className="input-group mb-3"> 
                <select onChange={e => setEstudiante(e.target.value)} className="form-select md-2" id="inputGroupSelect02" aria-describedby="button-addon2" >

                    
                                <option value='¿Cuál estudiante?'>¿Cuál estudiante?</option>
                                {data.Users.map((est) => {
                                    return est.rol == "ESTUDIANTE" && <option key={est._id} value={est._id}>{ est.nombre }</option>
                                })}                       
                </select>                 
                                   
                    <button className='btn btn-primary btn-block' id="button-addon2">                        
                        Inscribir                        
                    </button>                    
                </div>                
            </form>  
            
            <ToastContainer transition={bounce} />
        </div>
    )
}

export default Inscripciones



        //   
                            
        //         await Mutation({
        //             variables: {
        //                 estudiante,
        //                 proyecto: id
                        
        //             }
        //         });
        //         setEstudiante('')
                
        //     }} 