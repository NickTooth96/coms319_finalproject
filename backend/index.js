const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Product = require("./dataSchema.js");

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://127.0.0.1:27017/finalproject",
    {
        dbName: "finalproject",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
const port = process.env.PORT || 4000;
const host = "localhost";

app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});

app.get("/", async (req, resp) => {
    const query = {};
    const allProducts = await Product.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/info", async (req, resp) => {

});

app.post("/insert", async (req, res) => {
    console.log("!!! SEE THIS !!!",req.body);
    const p_id = req.body._id;
    const pname = req.body.name;
    const page = req.body.age;
    const pdescription = req.body.description;
    const pbreed = req.body.breed;
    const pimage = req.body.image;

    const formData = new Product({
        _id: p_id,
        name: pname,
        age: page,
        description: pdescription,
        breed: pbreed,
        image: pimage,
    });
    console.log("!!! SEE THIS !!!",formData);
    try {
        
        await Product.create(formData);
        const messageResponse = { message: `Product ${p_id} added correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});


app.get("/:breed", async (req, resp) => {
    console.log("input: ",req.params);
    console.log("Input Breed: ",req.params.breed);
    const query = { breed: req.params.breed };
    console.log("query: ",query);
    const oneProduct = await Product.findOne(query);
    resp.send(oneProduct);
});

app.delete("/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { _id: req.body._id };
        await Product.deleteOne(query);
        const messageResponse = {
            message: `Product ${req.body._id} deleted correctly`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + p_id + " " + err);
    }
});

app.post("/update", async (req, res) => {
    console.log(req.body._id);
    console.log(req.body.description);
 try {
        const query = { _id: req.body._id };
        await Product.updateOne({_id: query},{$set: {description: req.body.description}});
        const messageResponse = { message: `Product updated correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});
