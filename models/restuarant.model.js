const mongoose=require("mongoose");

const RestaurantSchema=mongoose.Schema({
    
        _id: ObjectId,
        name: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        },
        menu: [{
          _id: ObjectId,
          name: String,
          description: String,
          price: Number,
          image: String
        }]
      
})

const RestaurantModel=mongoose.model("restaurant",RestaurantSchema);

module.exports={
    RestaurantModel
}