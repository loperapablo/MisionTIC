import User from "../../models/User";
import { ProjectModel } from "../../models/proyecto";
import { ModeloAvance } from "../../models/avance";
import { InscriptionModel } from "../../models/inscripcion";


const Query = {
    
    async Users() {
        return await User.find()
    }, 
    Usuario: async (_, args) => {            
        const usuario = await User.find({ _id: args._id })
        return usuario
            
        },
    Inscripciones: async (parent, args) => {
        let filter = {};
            if (args.project) {
                filter = { ...args };
            }
        const inscripciones = await InscriptionModel
            .find(filter).populate('proyecto').populate('estudiante');                  
            return inscripciones;
    },
        
        Avances: async (parent, args) => {
            let filter = {};
            if (args.project) {
                filter = { ...args };
            }
            const avances = await ModeloAvance.find(filter).populate('proyecto').populate('creadoPor');
            return avances;
        },
        filtrarAvance: async (parents, args) => {
            const avanceFiltrado = await ModeloAvance.find({ proyecto: args._id })
                .populate('proyecto')
                .populate('creadoPor');
            return avanceFiltrado;
        },
        
        Proyectos: async (parent, args, context) => {
            
            if (context.userData) {
                if (context.userData.rol === 'LIDER') {
                    const proyectos = await ProjectModel.find({ lider: context.userData._id });
                    return proyectos;
                } else if (context.userData.rol === 'LIDER') {
                    // const proyectos = await ProjectModel.find({ lider: context.userData._id });
                    // return proyectos;
                }
            }
            const proyectos = await ProjectModel.find();
            return proyectos;
    },
        
        Proyecto: async (_, args) => {            
             const proyecto = await ProjectModel.find({ _id: args._id })
            return proyecto;
        },


        filtrarProyectosEstudiante: async (parent, args, context) => {
            
            const inscripciones = await InscriptionModel.find().populate('proyecto')
            
            var estudiantesInscritos = []
            const inscritos = inscripciones.map((inscrito) => {
                args._id == inscrito.estudiante.toString() && estudiantesInscritos.push(inscrito);
            })
            let hash = {};
            estudiantesInscritos = estudiantesInscritos.filter(o => hash[o.proyecto._id] ? false : hash[o.proyecto._id] = true);
      
            return estudiantesInscritos
            
    },
        
    
        filtrarProyectosLider: async (parent, args, context) => {
            
            const inscripciones = await InscriptionModel.find().populate('proyecto')
            
            var lideresInscritos = []
            const inscritos = inscripciones.map((inscrito) => {
                args._id == inscrito.proyecto.lider.toString() && lideresInscritos.push(inscrito);
            })
            let hash = {};
            lideresInscritos = lideresInscritos.filter(o => hash[o.proyecto._id] ? false : hash[o.proyecto._id] = true);
      
            return lideresInscritos
            
    },
        
        filtrarInscripcionesProyecto: async (parent, args, context) => {
        
            const inscripciones = await InscriptionModel.find().populate('proyecto')
            
            var estudiantesInscritos = []
            const inscritos = inscripciones.map((inscrito) => {
                args._id == inscrito.proyecto._id.toString() && estudiantesInscritos.push(inscrito);
            })
            
            return estudiantesInscritos
            
            
    },
        


}


export default Query
