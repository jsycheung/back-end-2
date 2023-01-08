let houses = require("./db.json");
let nextAvailableID = houses.length + 1;
module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(houses); //send the entire list of houses in the database to the front end
  },
  deleteHouse: (req, res) => {
    const id = parseInt(req.params.id, 10); //get the id param
    let houseIndex = houses.findIndex((house) => {
      //find the index of the house that matches the id param
      return house.id === id;
    });
    if (houseIndex === -1) {
      //if no index matches the id param, send an error message
      return res.status(400).send("Invalid request");
    }
    houses.splice(houseIndex, 1); //delete the object in the database using the index of the house
    res.status(200).send(houses); //send the list of houses to the front end
  },
  createHouse: (req, res) => {
    const { address, price, imageURL } = req.body; //get the address, price and imageURL from the user input in the front end
    if (!address || !price || !imageURL) {
      //send error message if one of the variables is missing
      return res.status(400).send("Invalid request");
    }
    const newHouse = {
      //create new house object
      id: nextAvailableID,
      address,
      price,
      imageURL,
    };
    houses.push(newHouse); //push new house object to the list of houses
    nextAvailableID += 1; //keep track of next available id for new house object
    res.status(200).send(houses); //send the list of houses to the front end
  },
  updateHouse: (req, res) => {
    const id = parseInt(req.params.id, 10); //get id from param
    const { type } = req.body; //get type from request body
    const hasHouseID = houses.map((house) => house.id).includes(id); //check if there is a corresponding house in the database that matches the id param
    if (!hasHouseID) {
      return res.status(400).send("House ID does not exist."); //send error message if there is no corresponding house object
    }
    houses = houses.map((house) => {
      if (house.id === id) {
        //make changes for the corresponding house object
        if (type === "plus") {
          //if the type is plus, add 10000 to original price
          const newPrice = house.price + 10000;
          house.price = newPrice;
        } else if (type === "minus") {
          //if the type is minus, subtract 10000 from original price, the final price must be larger than zero
          const newPrice = house.price - 10000;
          if (newPrice > 0) {
            house.price = newPrice;
          }
        }
      }
      return house;
    });
    res.status(200).send(houses);
  },
};
