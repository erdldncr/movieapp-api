const directorModel=require('../models/Director')

module.exports.getAllDirectors = async (req, res) => {
  console.log('all')
  try {
    const response = await directorModel.find();
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports.postSingleDirector = async (req, res) => {
  console.log('req.body')
  try {
    const director = await new directorModel(req.body);
    const response = await director.save();
    return res.status(200).json({ response });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports.getSingleDirector=async(req,res)=>{
  console.log('single')
       
    try {
        const director= await directorModel.findById(req.params.directorId)

        return res.status(200).json(director)

    } catch (error) {
        return res.status(404).json(error)
    }
}
module.exports.updateSingleDirector=async(req,res)=>{
  console.log('update')
    try {
        const director= await directorModel.findByIdAndUpdate(req.params.directorId,req.body,{new:true})
        return res.status(200).json(director)
    } catch (error) {
        return res.status(404).json(error)
    }

}

module.exports.deleteSingleDirector=async(req,res)=>{
  console.log('delete')
    try {
        const director= await directorModel.findByIdAndDelete(req.params.directorId)
        return res.status(200).json(director)
    } catch (error) {
        return res.status(404).json(error)
    }

}
module.exports.lookUpDirector= (req, res, next)=> {
  console.log('lookup')
  const result = directorModel.aggregate([
    {
      $lookup:{
              from:'movies',
              localField:'_id',
              foreignField:'director_id',
              as:'movies'
      }
    },
    {
      $project:{
              _id:0,
              name:1,
              surname:true,
              'movies.title':1,
              'movies.imdb_score':1
      }
    },
    {
      $unwind:{
        path:'$movies',        
        preserveNullAndEmptyArrays:false
      }
    }
  ])

  result
        .then((data)=>{res.json(data);})
        .catch((err)=>{res.json(err);})

}