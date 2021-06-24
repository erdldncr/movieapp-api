const mongoose=require('mongoose')

const URI='mongodb+srv://erdldncr:Erdldncr.1903@project-2.rvztl.mongodb.net/project-2?retryWrites=true&w=majority'

module.exports.db=()=>{
    mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log('connected to db')
    })
}

