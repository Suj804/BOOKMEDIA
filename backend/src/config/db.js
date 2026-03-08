import  mongoose from "mongoose";
export const connectDB = async () =>{
    try {
       await mongoose.connect(process.env.MONGODB_URI);
       console.log("MONGODB CONNECTED SUSCESSFULLY") ;
    } catch (error) {
        console.log("Error connecting to MONGODB",error);
        process.exit(1);
        
    }
};
export default connectDB;