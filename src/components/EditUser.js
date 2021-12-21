import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { GET_USERS } from "./UsersList";
import "react-toastify/dist/ReactToastify.css";


const UPDATE_USER = gql`
    mutation Mutation(
        $_id: ID,
        $correo: String!,
        $identificacion: String!,
        $nombre: String!,
        $apellido: String!,
        $password: String!,
        $rol: String!,
        $estado: String!
        ) {        
    updateUser(
        _id: $_id,
        input: 
            {correo: $correo,
            identificacion: $identificacion,
            nombre: $nombre,
            apellido: $apellido,
            password: $password,
            rol: $rol,
            estado: $estado}
    ){    
    correo    
    identificacion
    nombre
    apellido
    rol
    estado
  }
    
}
`



const EditUser = () => {
    const location = useLocation();    
        

    
        const [correo, setCorreo] = useState(location.state.correoUsuario)
        const [identificacion, setIdentificacion] = useState(location.state.identUsuario)
        const [nombre, setNombre] = useState(location.state.nombreUsuario)
        const [apellido, setApellido] = useState(location.state.apellidoUsuario)
        const [password, setPassword] = useState(location.state.passwordUsuario)
    const [rol, setRol] = useState(location.state.rolUsuario)
    const [estado, setEstado] = useState(location.state.estadoUsuario)
        
    

    const [Mutation] = useMutation(UPDATE_USER, {    
    refetchQueries: [{ query: GET_USERS }],
  });
    const navigate = useNavigate();  

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card-body">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();                          
                            
                            await Mutation({
                                variables: {
                                    _id: location.state.idUsuarioo,
                                    correo,
                                    password,
                                    identificacion,
                                    nombre,
                                    apellido,
                                    rol,
                                    estado
                                }
                            });                        
                        
                        navigate("/");
                        }}
                    >
                        
                        <div className="form-group">
                            <input type="text" placeholder="Correo"
                                className='form-control'
                                value={correo}
                            onChange={e => setCorreo(e.target.value)}
                            /> 
                            
                        </div>
                        <br />
                        <div className="form-group">
                              <input type="text"    placeholder="Identificacion"
                                className='form-control'
                                value={identificacion}
                            onChange={e => setIdentificacion(e.target.value)}
                            />  
                        </div>
                        <br />

                        <div className="form-group">
                            <input type="text" placeholder="Nombre"
                                className='form-control'
                                value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            />    
                        </div>
                        <br />

                        <div className="form-group">
                            <input type="text" placeholder="Apellido"
                                className='form-control'
                                value={apellido}
                            onChange={e => setApellido(e.target.value)}
                            />    
                        </div>
                        <br />

                        <div className="form-group">
                            <input type="text" placeholder="Contraseña"
                                className='form-control'
                                value={password}
                            onChange={e => setPassword(e.target.value)}
                            />    
                        </div>
                        <br />

                        <div className="form-group">                            
                        
                            <select value={rol}  onChange={e => setRol(e.target.value)} className="form-select" id="inputGroupSelect02">
                                <option value='¿Cuál es tu rol?'>¿Cuál es tu rol?</option>
                                <option value="ADMINISTRADOR">Admin</option>
                                <option value="LIDER">Lider</option>
                                <option value="ESTUDIANTE">Estudiante</option>
                            </select>
                            
                        </div>                     
 <br />
                        <div className="form-group">                            
                        
                            <select value={estado}  onChange={e => setEstado(e.target.value)} className="form-select" id="inputGroupSelect03">
                                <option value='¿Cuál es tu rol?'>¿Cuál es tu estado?</option>
                                <option value="PENDIENTE">PENDIENTE</option>
                                <option value="AUTORIZADO">AUTORIZADO</option>
                                <option value="NO AUTORIZADO">NO AUTORIZADO</option>
                            </select>
                            
                        </div>                         

                        <br />

                        <button className='btn btn-primary btn-block'>
                            ACTUALIZAR DATOS
                        </button>

                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default EditUser
