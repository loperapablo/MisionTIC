import React from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">AdminPROY</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">  
                        
              <li className="nav-item">
                <Link className="nav-link" to="/">Lista de Usuarios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/new-user">Nuevo usuario</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/projects">Lista de proyectos</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/new-project">Nuevo proyecto</Link>
              </li>
                        
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Navbar
