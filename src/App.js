import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UsersList from "./components/UsersList";
import UserForm from "./components/UserForm";
import Navbar from "./components/Navbar";

import "bootswatch/dist/lux/bootstrap.min.css"
import ProjectsList from "./components/projects/ProjectsList";
import ProjectForm from "./components/projects/ProjectForm";
import ProjectDetail from "./components/projects/ProjectDetail";
import Inscripciones from "./components/projects/Inscripciones";
import EditUser from "./components/EditUser";
import EditProject from "./components/projects/EditProject";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container p-4">
      <Routes>
        <Route exact path="/" element={<UsersList />} />
          <Route exact path="/new-user" element={<UserForm />} />
          <Route exact path="/user/:id" element={<EditUser />} />
          <Route exact path="/projects" element={<ProjectsList />} />
          <Route exact path="/new-project" element={<ProjectForm />} />
          <Route exact path="/project/:id" element={<ProjectDetail />} />
          <Route exact path="/project/edit/:id" element={<EditProject />} />

          <Route exact path="/project/inscripciones/:id" element={<Inscripciones />} />



      </Routes>
      </div>
    </Router>
  );
}

export default App;
