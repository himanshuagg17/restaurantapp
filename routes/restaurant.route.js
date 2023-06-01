const {RestaurantModel}=require("../models/restuarant.model");
const express=require("express");

const RestaurantRouter=express.Router();


// add a restaurant
RestaurantRouter.post("/create",async(req,res)=>{
    let payload= req.body;

    let restaurant=new RestaurantModel(payload);
    await restaurant.save();
    res.send("new restaurant added");
})

// read a restaurant details
RestaurantRouter.get("/restaurants",async(req,res)=>{
    let restaurants=await RestaurantModel.find();
    res.send(restaurants);
})


// get by id
RestaurantRouter.get("/restaurants/:id",async(req,res)=>{
    let id=req.params.id;

    try{
        const restaurant=await RestaurantModel.find({_id:id});
        res.send(restaurant);
    }
    catch(err){
        res.send(err.message);
    }
})

// adding menu

RestaurantRouter.post("/:id/menu",async(req,res)=>{
    let id=req.params.id;

    try{

        let restaurant=await RestaurantModel.find({_id:id});

        restaurant.menu.push(req.body);

        await restaurant.save();

        res.send("item added to res menu");

    }
    catch(err){
        res.send(err.message);
    }
})


RestaurantRouter.delete("/:id/menu/:menuid",async(req,res)=>{
    let id=req.params.id;

    let itemId=req.params.menuid;

    try{
        let restaurant=await RestaurantModel.findById(id);

        let menu=restaurant.menu;

        let updatedmenu= menu.filter((el)=>{
            el._id!==`new ObjectId("${itemId}")`
        })

        restaurant.menu=updatedmenu;

        await restaurant.save();

        res.save("the item was deleted from the restaurant");

    }
    catch(err){
        res.send(err.message);
    }
})



module.exports={
    RestaurantRouter
}