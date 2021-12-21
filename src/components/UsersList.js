import React from 'react'
import { gql, useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';

export const GET_USERS = gql`
{
    Users{
        _id
        nombre
        rol
        estado
        password
        identificacion
        apellido
        correo
    }
}
`

const UserList = () => {
    const { loading, error, data } = useQuery(GET_USERS)
    if (loading) return <p>Cargando usuarios</p>
    if (error) {
        return <p>Error</p>
    }    

    return (
        <div className="row">
            <div className="col-md-8 offset-md-1">
                {
                    data.Users.map(({_id, nombre, rol, estado, password, identificacion, apellido, correo}) => {
                    return <div key={_id} className='card m-2'> 
                                <div className="card-body">
                            <h4>{nombre} {apellido }</h4>   
                            <h6>{ rol }</h6>
                            <p>Estado: {estado}</p> 
                            
                            <Link className='btn btn-warning '
                                
                                to={{                              
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
                                }}                                
                            >
                                
                          Actualizar información
                        </Link>   
                                </div>
                            </div>
                    })
                }
            </div>
        </div>
    )

}

export default UserList
