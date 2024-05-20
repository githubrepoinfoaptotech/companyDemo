const jwt = require("jsonwebtoken");
const recruiter = require("../models/recruiter");
const user=require("../models/user")
require("dotenv").config();


module.exports = async (req,res,next) => {
    
   try { 
        
        if (!req.headers['token']){
            return res.status(403).send({ 
                auth: false, message: 'No token provided.' 
            });
        }
        req.body.clientId =  req.headers['token'];
        next();
    }   
    catch(err){
        res.status(401).json({msg:"Invalid token or token expires"});
    }
};