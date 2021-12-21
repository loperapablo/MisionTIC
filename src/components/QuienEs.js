import React from 'react'
import { gql, useQuery } from "@apollo/client";

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

const QuienEs = ({id}) => {
    const { data } = useQuery(GET_USERS)

    if (data) {
        var datos = data.Users.filter(o => o._id === id)
        var Usuario = datos[0]
    }
    
    var Nombre = ''
    if (Usuario.nombre.length > 1) {
       Nombre = Usuario.nombre 
    } 
    

    return (
        <>
            {Nombre}
        </>
    )
}

export default QuienEs
