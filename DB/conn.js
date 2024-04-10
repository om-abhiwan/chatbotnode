const mongoose  = require("mongoose")


const dbConnection = async()=>{
    await mongoose.connect(process.env.DB_URL).then(()=>{console.log("DB Running kr rha h yrr")}).catch(()=>{console.log("Kuch error h yrrrr")})
}

dbConnection()