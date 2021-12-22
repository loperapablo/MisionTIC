import mongoose from "mongoose"
require('dotenv').config({ path: './.env' })

mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
 }).then(db => console.log('>>> DB está conectada.'))
.catch(err => console.log(err))
        
   
