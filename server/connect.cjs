const {MongoClient} = require('mongodb');
require('dotenv').config({path: "./config.env"});

async function main() {
    const uri = process.env.ATLAS_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
    console.log("Connected to MongoDB Atlas");

    const collections = await client.db("weatherApp").collections();
    collections.forEach(collection => {
        console.log(`Collection: ${collection.collectionName}`);
    });
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    } finally {
        await client.close();
    }
}

main().catch(console.error);