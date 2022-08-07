
import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
  });

export default connectMongo;
