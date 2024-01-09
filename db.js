import mongoose from "mongoose";

export const DBConnect =async()=>{
    try {
               const url = process.env.MONGO_URI || 'mongodb+srv://subhampatradev:nalcocare@nalcocare-1.erfjkxx.mongodb.net/?retryWrites=true&w=majority' 
       const connect =  await mongoose.connect(url);
        if (connect) {
            console.log("DB Connected Successfully",connect.connection.host);
            
        }
    } catch (error) {
        console.log("DB connect ",error.massage);
    }
    
}
