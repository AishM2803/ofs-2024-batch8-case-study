import express from "express";
import cors from "cors";

let app = express();
app.use(cors());
app.use(express.json());

app.get('/employees',(request,response) => {
    response.status(200).json({"message":"Hello Guest"});
});

app.get('/employees/:id',(request,response) => {
    let id = request.params.id;
    response.status(200).json({"message":"Hello Guest" +id});
});

app.listen(8888, () => console.log("Service is running in 8888"));