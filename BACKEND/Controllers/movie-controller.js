import Movie from "../Models/Movie";
import jwt  from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../Models/Admin";
dotenv.config();
export const addMovie = async (req,res,next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];

    if(!extractedToken && extractedToken.trim() === ""){
        return res.status(404).json({ message : "Token Not Found "});
    }

    let adminId;

    jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted) => {
        if(err){
            return res.status(400).json({message :`${err.message}`});
        }else{
            adminId = decrypted.id;
            return;
        }
    });

    const {title,description,releaseDate,posterUrl, featured, actors} = req.body;
    if( !title && title.trim()==="" &&
        !description && description.trim() === "" &&
        !releaseDate && releaseDate.trim() === "" &&
        !posterUrl && posterUrl.trim() === "" 
        // !featured && featured.trim() === "" 
    ){
        return res.status(422).json({ message : "Invalid Inputs "});
    }

    let movie;
    try {
        movie = new Movie({
            title, 
            description, 
            actors,
            releaseDate : new Date(`${releaseDate}`), 
            posterUrl,
            featured,
            admin: adminId,
    });

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({session});
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
        
    } catch (error) {
        return console.log(error);
        
    }

    if(!movie) {
        return res.status(500).json({message : "Request Failed"});
    }
    return res.status(201).json({ movie });

    
};

export const getAllMovies = async (req,res,next) => {
    let movies;

    try {
        movies = await Movie.find();
    } catch (error) {
        return console.log(error);
    }

    if(!movies) {
        return res.status(500).json({message : "Request Failed"});
    }
    return res.status(200).json({ movies });

};

export const getMovieById = async (req, res, next) => {
    const id = req.params.id;

    let movie;

    try {
        movie = await Movie.findById(id);
    } catch (error) {
        return console.log(error);
    }

    if(!movie) {
        return res.status(404).json({ message : "Invalid Movie ID"});
    }
        return res.status(200).json({ movie });
};

export const deleteMovie = async (req,res,next) => {
    const id = req.params.id;
    let movie;
    try{
        movie = await Movie.findByIdAndRemove(id);
    }
    catch(err){
        return console.log(err);
    }
    if(!movie){
        return res.status(500).json({message: "Something went wrong "});
    }
    return res.status(200).json({ message : "Deleted Successfully "});

};