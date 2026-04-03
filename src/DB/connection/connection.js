import mongoose from "mongoose";

const DBConnection = async()=>{
    await mongoose.connect('mongodb://localhost:27017/NTI-Day3').then(res=>{
        console.log('db is connected');

    }).catch(err=>{
        console.log('error while connecting on Database' , err);
        
    })
}

export default DBConnection

