import { MongoClient } from 'mongodb';

// Declare a custom type for the _mongoClientPromise property on the global object
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

const uri = process.env.MONGODB_URI as string;

// Check if the MongoDB URI is provided
if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let clientPromise: Promise<MongoClient>;

// In development mode, reuse the client connection if it exists
if (process.env.NODE_ENV === 'development') {
  // Check if the global _mongoClientPromise is already defined
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    // Connect to the MongoDB server and assign the promise to the global variable
    global._mongoClientPromise = client.connect();
  }
  // Assign the global promise to the local variable
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client connection and assign the promise
  clientPromise = new MongoClient(uri).connect();
}

export default clientPromise;
