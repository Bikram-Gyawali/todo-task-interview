import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI as string;
        const mongoConn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${mongoConn.connection.host}`);
    } catch (err) {
        console.log("Error connecting to database: ", err);
        process.exit(1);
    }
};

export default connectDB;