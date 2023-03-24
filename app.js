const express= require("express");
const mongoose=require("mongoose");

const cors = require("cors");
var axios = require('axios');
const moment= require('moment');


// var express = require('express');
// const app = express();
// app.post()
const app=express();

app.use(express.json());
// app.use(cors({ exposedHeaders: "token" }));


// app.use(require("./middlewares/auth"));

mongoose.connect("mongodb+srv://admin:admin@cluster0.zsmc2fh.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true});


app.get("/trending",(req,res)=>{


const options = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/locations/search',
  params: {
    query: 'Agra,Bali,Jammu Kashmir,Goa',
    limit: '4',
    offset: '0',
    units: 'km',
    location_id: '1',
    currency: 'INR',
    sort: 'relevance',
    lang: 'en_US'
  },
  headers: {
    'X-RapidAPI-Key': '919ad1b4efmsh5c64063fdf57b2ap1ecd82jsn8b07ec302f85',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	// console.log(response.data.data);
    response.data.data.forEach(ele=>{
        // console.log(ele.result_type==='geos')
        if(ele.result_type==='geos'){

            let res={
                "place":ele.result_object.name,
                "img":ele.result_object.photo.images.large.url,
                
            }
            console.log(res);
            
        }
    })
    // res.json(response.data);
  
}).catch(function (error) {
	console.error(error);
});
})




let port=process.env.PORT;


if(port==null || port==""){
    port=5000;
}
app.listen(port,()=>{
    console.log("Server started");
});
