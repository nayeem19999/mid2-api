const express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port  = 3000;
const cors = require('cors')


app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://mern-batch-n242-2-mid-2:nayeem12@cluster0.guep9xh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const housesCollection = client.db("MERN-N242-2-MID-2").collection('allHouses')

    app.get('/allhouses', async (req,res)=>{
        const query = {};
        const cursor =await housesCollection.find(query).toArray();
        res.send(cursor)
    })

    app.get('/allhouses/:id',async(req, res)=>{
        const id = req.params.id;
        const query = {id:id}
        // console.log(id)
        const cursor = await housesCollection.find(query).toArray()
        res.send(cursor)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })