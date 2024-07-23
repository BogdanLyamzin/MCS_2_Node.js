import express from "express";

const app = express(); // app - web-server

app.get("/", (request, response)=> {
    response.send("<h1>Home page</h1>");
})

app.get("/users", (request, response)=> {
    console.log(request.url);
    console.log(request.method);
    response.send("<h1>Users list page</h1>");
})

app.listen(3000, ()=> console.log("Server running successfully on 3000 PORT"))