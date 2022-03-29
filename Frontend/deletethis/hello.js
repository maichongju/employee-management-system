const fetch = require("node-fetch");

fetch("http://localhost:3000/employee").then(res=>{
    console.log(res.json())

}).catch(err=>console.log(err))