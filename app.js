import express from "express"

import mongoose from "mongoose"


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/movi").then(() => {
    console.log("MongoDB Connected")
}).catch(()=>{
    console.log("DB Error")

});


const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    director: String
});


const movie = mongoose.model("movies", movieSchema);


// 1.Add Movies

app.post("/addmovie", async (req, res) => {
    const movieData = await movie.create(req.body);

    res.json({
        msg: "Movie added successfully!",
        data: movieData
    })
})


// 2. Get All Movies

app.get("/getmovies", async (req, res) => {
    const movieData = await movie.find();

    res.json({
        msj: "All movies",
        data: movieData
    })
});


// 3. Get Specific Movies

app.get("/getmovie",async(req,res)=>{
    const movieData = await movie.findOne(req.body);

    if(!movieData){
        res.json({
            msg:"Movie not Found"
        })
    }
    res.json({
        msg:"movies",
        data:movieData
    })
});


// 4. update  Movies

app.put("/updatemovie",async(req,res)=>{
    const updatemovie = await movie.findByIdAndUpdate(req.body.id,req.body.newData);

    if(!updatemovie){
        res.json({
            msg:"Movie not Found"
        })
    }
    res.json({
        msg:"movie updated successfully",
        data:updatemovie
    })
});


// 5. Delete movie

app.delete("/deletemovie",async(req,res)=>{
    const deleteMovie = await movie.findByIdAndDelete(req.body.id);

    if(!deleteMovie){
        res.json({
            msg:"Movie not Found"
        })
    }
    res.json({
        msg:"Movie Deleted Successfully!",
        data:deleteMovie
    })
});
app.listen(3000);





 

