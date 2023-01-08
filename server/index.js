const express = require("express");
const cors = require("cors");
const app = express();
const controller = require("./controller");
app.use(express.json());
app.use(cors());

app.get("/api/houses", controller.getHouses); //get the entire list of houses in the database
app.post("/api/houses", controller.createHouse); //create a new house
app.put("/api/houses/:id", controller.updateHouse); //update the price of an existing house
app.delete("/api/houses/:id", controller.deleteHouse); //delete a house

app.listen(4004, () => console.log("Server running on port 4004"));
