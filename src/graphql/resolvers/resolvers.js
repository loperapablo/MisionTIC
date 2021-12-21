import User from "../../models/User";
import { ProjectModel } from "../../models/proyecto";
import { ModeloAvance } from "../../models/avance";
import { InscriptionModel } from "../../models/inscripcion";
import { GraphQLScalarType } from 'graphql';

export const resolvers = {
    Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime(); 
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); 
      }
      return null;
    },
    }),

    Proyecto: {
        lider: async (parent, args, context) => {
        const usr = await User.findOne({
            _id: parent.lider.toString(),
        });
        return usr;
        },
        inscripciones: async (parent, args, context) => {
        const inscripciones = await InscriptionModel.find({
            proyecto: parent._id,
        });
        return inscripciones;
        },
    },
  Query: {  
          Inscripciones: async (parent, args) => {
          const inscripciones = await InscriptionModel.find();
          return inscripciones;
        },
           
        async Users() {
            const users = await User.find()
            return users
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
          console.log(args)
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


    filtrarProyectosEstudiante: async (parent, args, context) => {
        // console.log(args._id)
      const inscripciones = await InscriptionModel.find().populate('proyecto')
      // if (args._id == inscripciones.estudiante._id) {
      // }
      var estudiantesInscritos = []
      const inscritos = inscripciones.map((inscrito) => {
        args._id == inscrito.estudiante.toString() && estudiantesInscritos.push(inscrito);        
      })      
      let hash = {};
      estudiantesInscritos = estudiantesInscritos.filter(o => hash[o.proyecto._id] ? false : hash[o.proyecto._id] = true);
      
      return estudiantesInscritos
      // console.log(inscripciones)        
        // return inscripciones;
    },


    
    filtrarProyectosLider: async (parent, args, context) => {
        // console.log(args._id)
      const inscripciones = await InscriptionModel.find().populate('proyecto')
      // if (args._id == inscripciones.estudiante._id) {
      // }
      var lideresInscritos = []
      const inscritos = inscripciones.map((inscrito) => {
        args._id == inscrito.proyecto.lider.toString() && lideresInscritos.push(inscrito);        
      })   
      let hash = {};
      lideresInscritos = lideresInscritos.filter(o => hash[o.proyecto._id] ? false : hash[o.proyecto._id] = true);
      
      return lideresInscritos
      // console.log(inscripciones)        
        // return inscripciones;
    },
    filtrarInscripcionesProyecto: async (parent, args, context) => {
        
      const inscripciones = await InscriptionModel.find().populate('proyecto')
      // if (args._id == inscripciones.estudiante._id) {
      // }
      var estudiantesInscritos = []
      const inscritos = inscripciones.map((inscrito) => {
        args._id == inscrito.proyecto._id.toString() && estudiantesInscritos.push(inscrito);        
      })      
      // let hash = {};
      // estudiantesInscritos = estudiantesInscritos.filter(o => hash[o.proyecto._id] ? false : hash[o.proyecto._id] = true);
      
      return estudiantesInscritos
      // console.log(inscripciones)        
        // return inscripciones;
    },


  },









  Mutation: {  

    agregarObservacionAvance: async (parent, args) => {
      var desc = args.input.descripcion
      console.log(desc)
      const AvanceConObservacion = await ModeloAvance.findByIdAndUpdate(
        args._id,
        {
          $addToSet: {
            observaciones: [desc]        
               
          },
        },
        { new: true }
      );
      console.log(AvanceConObservacion)
      return AvanceConObservacion;
    },
      crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await InscriptionModel.create({
        estado: args.estado,
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return inscripcionCreada;
    },
    aprobarInscripcion: async (parent, args) => {
      const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(
        args.id,
        {
          estado: 'ACEPTADO',
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return inscripcionAprobada;
    },
        async createUser(_, { input }) {
            const newUser = new User(input)
            await newUser.save()
            return newUser
        },
        async deleteUser(_, { _id }) {
           return await User.findByIdAndDelete(_id)
        },
        async updateUser(_, { _id, input }) {
            return await User.findByIdAndUpdate(_id, input, {new: true})
        },

         crearProyecto: async (parent, args, context) => {
            const proyectoCreado = await ProjectModel.create({
                nombre: args.nombre,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                presupuesto: args.presupuesto,
                lider: args.lider,
                objetivos: args.objetivos,
            });
            return proyectoCreado;
    },
    editarProyecto: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      );

      return proyectoEditado;
    },
    crearObjetivo: async (parent, args) => {
      const proyectoConObjetivo = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $addToSet: {
            objetivos: { ...args.campos },
          },
        },
        { new: true }
      );

      return proyectoConObjetivo;
    },
    editarObjetivo: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.descripcion`]: args.campos.descripcion,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
          },
        },
        { new: true }
      );
      return proyectoEditado;
    },
    eliminarObjetivo: async (parent, args) => {
      const proyectoObjetivo = await ProjectModel.findByIdAndUpdate(
        { _id: args.idProyecto },
        {
          $pull: {
            objetivos: {
              _id: args.idObjetivo,
            },
          },
        },
        { new: true }
      );
      return proyectoObjetivo;
        },
    crearAvance: async (parents, args) => {
      const avanceCreado = await ModeloAvance.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });

      const avances = await ModeloAvance.find({ proyecto: avanceCreado.proyecto });

      if (avances.length === 1) {
        const proyectoModificado = await ProjectModel.findOneAndUpdate(
          { _id: avanceCreado.proyecto },
          {
            fase: 'DESARROLLO',
          }
        );
        console.log('proy modificado', proyectoModificado);
      }

      return avanceCreado;
    },


    }
}

// mutation{
//   createUser(input:{
    
//     firstname: "Pablo"
//     lastname: "Lopera"
//     age: 27
  
//   }) {
//     _id
//     firstname
//     lastname
//   }
// }


// mutation{
//   deleteUser(_id: "61bd4dd9789cda02045a450e") {
//     _id
//   }
// }


// mutation{
//   updateUser(
//     _id: "61bd5262aaaf07d65c7d19b8",
//   	input: {
//       firstname: "Ryan"
//       lastname: "Ray"
//       age: 27
//     }
//   ) {
//     _id
//     firstname
//     lastname
//     age
//   }
// }


// {
// 	filtrarProyectosEstudiante(_id: "61be15705feb54ef8967adfc"){
//     nombre
//     _id
//   }
// }