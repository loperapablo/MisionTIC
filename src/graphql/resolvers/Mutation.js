import User from "../../models/User";
import {ModeloAvance} from "../../models/avance";
import {InscriptionModel} from "../../models/inscripcion";
import {ProjectModel} from "../../models/proyecto";

const Mutation = {
    createUser: async (_,{input}) => {
            const newUser = new User(input)
        await newUser.save()
        return newUser
             
  },  
  crearProyecto: async (_, args) => {
    try {
              const proyectoCreado = await ProjectModel.create({
                nombre: args.nombre,
                // fechaInicio: args.fechaInicio,
                // fechaFin: args.fechaFin,
                presupuesto: args.presupuesto,
                lider: args.lider
            });
            return proyectoCreado;
             
      } catch (error) {
             console.log(error)
      }
        },
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
        async deleteUser(_, { _id }) {
           return await User.findByIdAndDelete(_id)
        },
        async updateUser(_, { _id, input }) {
            return await User.findByIdAndUpdate(_id, input, {new: true})
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


export default Mutation