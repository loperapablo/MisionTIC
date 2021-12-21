import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast, cssTransition } from "react-toastify";

export const GET_AVANCES = gql`
{
  Avances
  {    
    descripcion 
    proyecto{
      _id
    }
          
  }
}
`


const CREATE_AVANCE = gql`
    mutation Mutation(
        $descripcion: String!,
        $proyecto: String!,
        $creadoPor: String!,
        
        ) {        
    crearAvance(
    descripcion: $descripcion,
  	proyecto: $proyecto,
    creadoPor: $creadoPor,
      
  ) {
    descripcion
  }
}
`

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut"
});

function animateCss() {
    toast.success("¡Avance agregado!", {
        transition: bounce
    });
}


const Avances = () => {
    const [descripcion, setdescripcion] = useState('')
    var { id } = useParams();

   

    const { data: AVANCES } = useQuery(GET_AVANCES)
    const [Mutation] = useMutation(CREATE_AVANCE, {    
    refetchQueries: [{ query: GET_AVANCES }],
    });

    return (
        <div>
            {
                AVANCES && AVANCES.Avances.map((av) => {
                    if (av.proyecto._id === id)
                    {
                    return <div key={av._id}>
                        <h5>{av.descripcion}</h5>                                                    
                    </div>
                    }
                    return null
                })
            }
                                
            <form onSubmit={async (e) => {
                e.preventDefault()
                            
                await Mutation({
                    variables: {
                        descripcion,
                        proyecto: id,
                        creadoPor: '61bd58040ffd7f1f913528eb'
                        
                    }
                });
                setdescripcion('')
                animateCss()
            }}>
                        <div className="input-group mb-3">
                            <input type="text" placeholder="Añadir avance"
                                className='form-control'
                                value={descripcion}
                            onChange={e => setdescripcion(e.target.value)}
                                   
                    />
                    <div className="input-group-append">
                        <button className='btn btn-primary btn-block'>
                            Agregar
                        </button>
                    </div>  
                        </div>
                        <br />  
            </form>
            <ToastContainer transition={bounce} />

        </div>
    )
}

export default Avances
