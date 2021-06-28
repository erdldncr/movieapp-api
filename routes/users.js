var express = require('express');
var router = express.Router();
const  bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

//Models
const UserModel=require('../models/User')

/* GET users listing. */
router.get("/", function (req, res, next) {
  UserModel.find((err, data) => {
    if (err) res.json(err);
    res.json(data);
  })
});

router.post('/authenticate', (req, res) => {
  const {username,password} = req.body;
  UserModel.findOne({username})
  .then((data)=>{
    if(!data){
    return  res.send('User couldn\'t be found')
    }else{
      bcrypt.compare(password,data.password)
      .then(loginResult=>{
        if(!loginResult){
          return res.send("Authentication Failed")
        }else{
          const payload={username}
          const token=jwt.sign(payload,req.app.get('api_secret_key'),{expiresIn:720})///60*12 saat =720
          return res.status(200).json(token)
        }
      })
    }
    
  })
  .catch((err)=>{
   return res.json(err)
  })
  
});


router.post('/register', (req, res) => {
  const {username,password} = req.body;

  bcrypt.hash(password, 10, function(err, hash) {
   
    const newUser = new UserModel({username,password:hash});
    newUser.save()
             .then((data)=>{res.json(data)})
             .catch((err)=>{res.json(err)})
    
    });

});



module.exports = router;