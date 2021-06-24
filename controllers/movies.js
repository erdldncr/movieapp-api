const movieModel=require('../models/Movie')

module.exports.getAllMovies = async (req, res) => {
    
  try {
    const response = await movieModel.find();
    // console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports.postSingleMovie = async (req, res) => {
  try {
    const movie = await new movieModel(req.body);
    const reponse = await movie.save();
    return res.status(200).json({ movie });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports.getSingleMovie=async(req,res)=>{
    const {movies_id}=req.params
       
    try {
        const movie= await movieModel.findById(movies_id)

        return res.status(200).json(movie)

    } catch (error) {
        return res.status(404).json(error)
    }
}
module.exports.updateSingleMovie=async(req,res)=>{
    const {movies_id}=req.params
    try {
        const movie= await movieModel.findByIdAndUpdate(movies_id,req.body)
        return res.status(200).json(movie)
    } catch (error) {
        return res.status(404).json(error)
    }

}

module.exports.deleteSingleMovie=async(req,res)=>{
    const {movies_id}=req.params
    try {
        const movie= await movieModel.findByIdAndDelete(movies_id)
        return res.status(200).json(movie)
    } catch (error) {
        return res.status(404).json(error)
    }

}
module.exports.getLimitedMovies=async(req,res)=>{
    const{limit}=req.params
    // console.log(limit)
    try {
        const movies= await movieModel.find().limit(10).sort({imdb_score:-1})
        
        return res.status(200).json(movies)
    } catch (error) {
        return res.status(404).json(error)
    }

}
module.exports.getBetweenDates=async(req,res)=>{
  let {start_year,end_year}=req.params
 
  try {
    const data= await movieModel.find({year:{'$gte':+start_year,"$lte":+end_year}})
  
      return res.status(201).json(data)
    
  } catch (error) {
     
    return res.status(404).json(error)
  }
}
module.exports.lookUpMovies= (req, res, next)=> {
  console.log('lookup')
  const result = movieModel.aggregate([
    {
      $lookup:{
              from:'directors',
              localField:'director_id',
              foreignField:'_id',
              as:'directors'
      }
    },
    {
      $project:{
              _id:0,
              title:1,
              category:true,
              'directors.name':1,
              'directors.surname':1
      }
    },
    {
      $unwind:{
        path:'$directors',        
        preserveNullAndEmptyArrays:false
      }
    }
  ])

  result
        .then((data)=>{res.json(data);})
        .catch((err)=>{res.json(err);})

}