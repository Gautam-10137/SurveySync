const User=require('../models/User');
const bycrypt=require('bcryptjs');
const config=require('../config');
const jwt=require('jsonwebtoken');

// Register a new user
exports.register=(req,res)=>{
    const {username,email,password}=req.body;
    const newUser=new User({username,email,password});
    
    // Hashing Password before saving it to database
    bycrypt.genSalt(10,(err,salt)=>{
        bycrypt.hash(newUser.password,salt,(err,hash)=>{
            newUser.password=hash;
            newUser
               .save()
               .then(user=>res.json(user))
               .catch(err=>console.log(err))
        })
    })
    return res.json(newUser);
}

// Login
exports.login=(req,res)=>{
  const {username,email,password}=req.body;

  User.findOne({username}).then(user=>{
    if(!user) return res.status(400).json({message:'User Not Found'});

    bycrypt.compare(password,user.password,(err,isMatch)=>{
        if(isMatch){
            const payload={id:user.id,username:username};
            const token= jwt.sign(payload,config.secret,{expiresIn:'1h'});
            res.json({success:true,token:'Bearer '+token});
        }
        else{
            return res.status(400).json({message:'Password Incorrect'});
        }
    });
  });
};

exports.logout=(req,res)=>{
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.sendStatus(401);
    }    
  
    jwt.verify(token, config.secret, (err, user) => {
      if (err) return res.sendStatus(403);  
    });
    res.status(200).json({message:'Logout Successful'});

}