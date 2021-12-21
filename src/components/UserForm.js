import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { GET_USERS } from "./UsersList";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, cssTransition } from "react-toastify";

const CREATE_USER = gql`
    mutation Mutation(
        $correo: String!,
        $identificacion: String!,
        $nombre: String!,
        $apellido: String!,
        $password: String!,
        $rol: String!,
        $estado: String!
        ) {        
    createUser(
        input: {correo: $correo,
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

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut"
});

function animateCss() {
    toast.success("¡Usuario registrado!", {
        transition: bounce
    });
}

const UserForm = () => {

    const [correo, setCorreo] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('')
    

    const [Mutation] = useMutation(CREATE_USER, {    
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
                                    correo,
                                    password,
                                    identificacion,
                                    nombre,
                                    apellido,
                                    rol,
                                    estado: "PENDIENTE"
                                }
                            }); 
                            animateCss()
                                                       
                        
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
                        
                            <select  onChange={e => setRol(e.target.value)} className="form-select" id="inputGroupSelect02">
                                <option value='¿Cuál es tu rol?'>¿Cuál es tu rol?</option>
                                <option value="ADMINISTRADOR">Admin</option>
                                <option value="LIDER">Lider</option>
                                <option value="ESTUDIANTE">Estudiante</option>
                            </select>
                            
                        </div>                     

                                               

                        <br />

                        <button className='btn btn-primary btn-block'>
                            Inscribirme
                        </button>

                    </form>
                </div>
            </div>
            <ToastContainer transition={bounce} />
        </div>
    )
}

export default UserForm
