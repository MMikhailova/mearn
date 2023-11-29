import mongoose from 'mongoose';
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
     
    } catch (err) {
        console.error(err);
    }
};


export default connectToDB;
