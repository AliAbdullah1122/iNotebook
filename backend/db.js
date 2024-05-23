const { default: mongoose } = require("mongoose")
const monngoose = require("mongoose")
const mongoURI ='mongodb://localhost:27017/inotebook'


// const connectTooMongo = ()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log('Connected to Mongo Successfully')
//     })
// }
// module.exports=connectTooMongo()

async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
  
  module.exports = connectToMongo;