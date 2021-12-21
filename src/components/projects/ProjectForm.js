import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { GET_PROJECTS } from "./ProjectsList";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, cssTransition } from "react-toastify";

const CREATE_PROJECT = gql`
    mutation Mutation(
            $nombre: String!,
            $presupuesto: Float!,
            $lider: ID!,
            # $fechaInicio: Date,
            # $fechaFin: Date
        ) {        
    crearProyecto(
  	nombre: $nombre,
    presupuesto: $presupuesto,
    lider: $lider,
    # fechaInicio: $fechaInicio,
    # fechaFin: $fechaFin
  ){
    nombre
    presupuesto
  }
    
}
`

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

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut"
});

function animateCss() {
    toast.success("¡Proyecto creado!", {
        transition: bounce
    });
}

const ProjectForm = () => {
    
    const [nombre, setNombre] = useState('')
    const [presupuesto, setPresupuesto] = useState()
    const [lider, setLider] = useState('')
    // const [fechaInicio, setFechaInicio] = useState()
    // const [fechaFin, setFechaFin] = useState()
    

    const [Mutation] = useMutation(CREATE_PROJECT, {    
    refetchQueries: [{ query: GET_PROJECTS }],
    });



    const navigate = useNavigate();   


    const { loading, error, data } = useQuery(GET_USERS)
    if (loading) return <p>Cargando usuarios</p>
    if (error) {
        return <p>Error</p>
    }   

    
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card-body">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            console.log(nombre,
                                    presupuesto,                                    
                                    // fechaInicio,
                                    // fechaFin
                            )
                            await Mutation({
                                variables: {                           
                                    nombre,
                                    presupuesto,
                                    lider: "61bfffc4dfa9b1033c334544", 
                                    // fechaInicio,
                                    // fechaFin                                    
                                }
                            }); 
                            animateCss()
                                                       
                        
                        navigate("/projects");
                        }}
                    >
                        
                        

                        <div className="form-group">
                            <input type="text" placeholder="Nombre"
                                className='form-control'
                                value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            />    
                        </div>
                        <br />

                        <div className="form-group">
                            <input type="number" placeholder="Presupuesto"
                                className='form-control'
                                value={presupuesto}
                            onChange={e => setPresupuesto(e.target.value)}
                            />    
                        </div>
                        <br />

                        {/* <div className="form-group">
                            <input type="text" placeholder="Lider"
                                className='form-control'
                                value={lider}
                            onChange={e => setLider(e.target.value)}
                            />    
                        </div> */}
                        <div className="form-group">                            
                        
                            <select onChange={e => setLider(e.target.value)} className="form-select" id="inputGroupSelect02">
                            {/* <select  className="form-select" id="inputGroupSelect02">                                 */}
                                <option value='¿Cuál es tu rol?'>¿Quién es el lider?</option>
                                {data.Users.map((lider) => {
                                    return lider.rol == "LIDER" && <option key={lider._id} value={lider._id}>{ lider.nombre }</option>
                                })}                               
                                
                            </select>
            
                        </div> 
                        <br />

                        {/* <div className="form-group">
                            <label>Fecha inicio</label>
                            <input type="date" placeholder="Fecha inicio"
                                className='form-control'
                                value={fechaInicio}
                            onChange={e => setFechaInicio(e.target.value)}
                            />    
                        </div>
                        <br />

                        <div className="form-group">
                            <label>Fecha fin</label>
                            <input type="date" placeholder="Fecha fin"
                                className='form-control'
                                value={fechaFin}
                            onChange={e => setFechaFin(e.target.value)}
                            />    
                        </div>
                        <br /> */}

                                           

                                               

                        <br />

                        <button className='btn btn-primary btn-block'>
                            Crear Proyecto
                        </button>

                    </form>
                </div>
            </div>
            <ToastContainer transition={bounce} />
        </div>
    )
}

export default ProjectForm
