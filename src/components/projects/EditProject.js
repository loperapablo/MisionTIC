import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { GET_PROJECTS } from "./ProjectsList";
import "react-toastify/dist/ReactToastify.css";



const UPDATE_PROJECT = gql`
mutation Mutation(
        $_id: String!,
        $nombre: String!,
        $presupuesto: Float!,
        $estado: String!,
        $fase: String!
        ) { 
  editarProyecto(_id: $_id, 
  campos:{
    nombre: $nombre,
    presupuesto: $presupuesto,
    estado: $estado,
    fase: $fase
  }){
    nombre
  }
}
`

const EditProject = () => {
    const location = useLocation();     
   


    const [Mutation, {error, loading}] = useMutation(UPDATE_PROJECT, {    
        refetchQueries: [{ query: GET_PROJECTS }],
    });

    const [nombre, setNombre] = useState(location.state.Proyecto.nombre)
    const [presupuesto, setPresupuesto] = useState(location.state.Proyecto.presupuesto)
    const [lider, setLider] = useState(location.state.Proyecto.presupuesto.lider)
    const [estado, setEstado] = useState(location.state.Proyecto.estado)
    const [fase, setFase] = useState('INICIADO')


    const navigate = useNavigate();

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
                            await Mutation({
                                variables: { 
                                    _id: location.state.Proyecto._id,
                                    nombre,
                                    presupuesto, 
                                    lider,
                                    estado,
                                    fase
                                }
                            });                             
                                                       
                        
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
                        {/* 'INICIADO', 'DESARROLLO', 'TERMINADO', 'NULO' */}
                            <select value={fase}  onChange={e => setFase(e.target.value)} className="form-select" id="inputGroupSelect02">
                                <option value='¿Cuál es la fase del proyecto?'>¿Cuál es la fase del proyecto?</option>
                                <option value="INICIADO">INICIADO</option>
                                <option value="DESARROLLO">DESARROLLO</option>
                                <option value="TERMINADO">TERMINADO</option>
                            </select>
                            
                        </div> 
                                           

                                               

                        <br />

                        <div className="form-group">
                            <select value={estado}  onChange={e => setEstado(e.target.value)} className="form-select" id="inputGroupSelect02">
                                <option value='¿Cuál es el estado del proyecto?'>¿Cuál es el estado del proyecto?</option>
                                <option value="ACTIVO">ACTIVO</option>
                                <option value="INACTIVO">INACTIVO</option>                                
                            </select>
                            
                        </div> 
                                           

                                               

                        <br />

                        <button className='btn btn-primary btn-block'>
                            Actualizar proyecto
                        </button>

                    </form>
                </div>
            </div>         
        </div>
    )
}

export default EditProject
