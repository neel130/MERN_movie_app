const Movie = require("../model/movieSchema");

// CREATING NEW MOVIE 
exports.createMovie = async(req,res) =>{
    const {title,desc,img,video,year,limit} = req.body ;
    try {
        if(!title || !desc || !img || !video || !year || !limit){
            return res.status(404).json({error:"require all fields"});
        }
        const newMovie = await Movie.create({
            title,
            desc,
            img,
            video,
            year,
            limit
        })
        if(newMovie){
            return res.status(201).json({success:'movie created successful',movie:newMovie})
        }  
    } catch (error) {
        console.log('error'+error)
    }
}


//GET ALL MOVIES
exports.getAllMovies = async (req,res) =>{
    try {
       const movies = await Movie.find()
       .sort("-createdAt")
       return res.status(200).json({success:"finding successful",movies})
    } catch (error) {
        console.log("error"+error)
    }
}


//GET SINGLE MOVIE
exports.singleMovie = async (req,res) =>{
    const id = req.params.id ;
    try {
        if(!id){
            return res.status(403).json({error:"id is required"})
        }

        const movie = await Movie.findById(id);
        if(movie){
            return res.status(200).json({success:"finding successful",movie})
        }

    } catch (error) {
        console.log("error"+error)
    }
}


//UPDATE MOVIE
exports.updateMovie = async(req,res) =>{
    const id = req.params.id;
    const {title,desc,img,video,year,limit} = req.body ;
    try {
        if( !id){
            return res.status(404).json({error:"require id"});
        }

        const updatedMovie = await Movie.findByIdAndUpdate(id,{
            $set:{
                title,
                desc,
                img,
                video,
                year,
                limit
            }
        },{
            new:true
        });
        if(updatedMovie){
            return res.status(200).json({success:"update successful",updatedMovie});
        }
        
    } catch (error) {
        console.log("error"+error)
    }
}