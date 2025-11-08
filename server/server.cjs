const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
if (!uri) {
  console.error('URI Is empty');
  process.exit(1);
}

mongoose.set('strictQuery', true);
mongoose.connect(uri)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Mongo connection error:', err.message);
    process.exit(1);
  });

const clothesSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
});
const Weather = mongoose.model('Weather', clothesSchema);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/api/allClothes', async (req, res) => {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const allClothes = await client.db("weatherApp").collection("allClothes");
    const documents = await allClothes.find({}).toArray();
    res.json(documents)
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  } finally {
    await client.close();
  }
});

app.get('/api/getClothesByTemp', async (req, res) => {
  try {
    const temp = parseInt(req.query.temp, 10)
    console.log(temp)
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const allClothes = await client.db("weatherApp").collection("allClothes");
    const documents = await allClothes.find({ minTemp: { $lte: temp }, maxTemp: { $gte: temp } }).toArray();
    res.json(documents)
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  } finally {
    await client.close();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));