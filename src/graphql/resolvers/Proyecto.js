export const Proyecto = {
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
    }