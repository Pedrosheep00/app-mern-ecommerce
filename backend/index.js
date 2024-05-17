import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
const mongoDBUri = process.env.MONGO_DB_URI; // Updated to match the convention
const DBNAME = process.env.DBNAME;
import mongoose from 'mongoose';
import cors from 'cors'
import productRoutes from "./Routes/products.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);

async function connectToMongoDB() {
  try {
      console.log('Connecting to MongoDB with URI:', mongoDBUri); // Log the URI
      await mongoose.connect(mongoDBUri, { 
          useNewUrlParser: true, 
          useUnifiedTopology: true,
          dbName: DBNAME
      });
      console.log('Express app connected to MongoDB');
      app.listen(PORT, () => {
          console.log(`Express app listening on port ${PORT}`);
      });            
  } catch (error) {
      console.error('Could not connect to MongoDB', error);
  }
}    

connectToMongoDB();
