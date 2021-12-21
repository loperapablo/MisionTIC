import mongoose from "mongoose"
require('dotenv').config({ path: '../.env' })

mongoose.connect('mongodb+srv://root:root@cluster0.vm7l1.mongodb.net/proyectosAdmin', {
            useNewUrlParser: true,
            useUnifiedTopology: true
 }).then(db => console.log('>>> DB está conectada.'))
.catch(err => console.log(err))
        
   
