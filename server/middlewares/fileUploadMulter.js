const multer=require('multer');
var path=require('path');
const AWS = require("aws-sdk");
const multerS3 = require('multer-s3')
var maxSize = 25 * 1024 * 1024; // 25MB;
const s3 = new AWS.S3({
    accessKeyId: process.env.liveS3Id,
    secretAccessKey: process.env.liveS3Key,
  });
exports.ImageUpload = async function(req, res, next) {
    var upload = multer({
        limits: {
            fileSize: maxSize,
          },
        storage: multerS3({
            s3: s3,
            bucket: "liverefo"+"/"+"profilePicture",
            key: function (req, file, cb) {
                if (path.extname(file.originalname).toLowerCase() === '.jpg'||path.extname(file.originalname).toLowerCase() === '.png'  ||path.extname(file.originalname).toLowerCase() === '.jpeg') {
                    cb(null, req.mainId+"/"+req.mainId+"_"+file.originalname);
                  }
                  else{
                    return cb(new Error('Only mages are allowed'));
                  }
              
            }
          })
    }).single('image',1);

     upload(req,res, async function(err){
        if(err){
            res.status(200).json({status:false,message: 'Unable to upload image check the image size and type!!'});

        } else {
            next();
        }
    });
};

exports.resumeUpload = async function(req, res, next) {
  console.log(req.firstName);
    var upload = multer({
        limits: { 
            fileSize: maxSize,
          },
          storage: multerS3({
            s3: s3,
            bucket: "liverefo"+"/"+"resumes",
            key: function (req, file, cb) {
                    console.log(file)
                if (path.extname(file.originalname).toLowerCase() === '.pdf'||path.extname(file.originalname).toLowerCase() === '.docx'  ||path.extname(file.originalname).toLowerCase() === '.doc') {
                    cb(null, req.mainId+"/"+"refo_"+req.mainId+"_"+Date.now()+path.extname(file.originalname).toLowerCase());
                  }
                  else{
                    return cb(new Error('Only Documents are allowed'));
                  }
            }
          })
    }).single('resume',1);
    upload(req,res, function(err){
        if(err){
          console.log(err);
            res.status(200).json({status:false,message: 'Unable to upload resume check the resume size and type!!!!'});
        } else {
            next();
        }
    });
};

exports.documentUpload = async function(req, res, next) {
  //console.log(req.firstName);
    var upload = multer({
        limits: { 
            fileSize: maxSize,
          },
          storage: multerS3({
            s3: s3,
            bucket: "liverefo"+"/"+"documents",
            key: function (req, file, cb) {
                    console.log(file)
                if (path.extname(file.originalname).toLowerCase() === '.pdf'||path.extname(file.originalname).toLowerCase() === '.docx'  ||path.extname(file.originalname).toLowerCase() === '.doc') {
                    cb(null, req.mainId+"/"+"refo_"+req.mainId+"_"+Date.now()+path.extname(file.originalname).toLowerCase());
                  }
                  else{
                    return cb(new Error('Only Documents are allowed'));
                  }
            }
          })
    }).single('document',1);
    upload(req,res, function(err){
        if(err){
          console.log(err);
            res.status(200).json({status:false,message: 'Unable to upload document check the document size and type!!!!'});
        } else {
            next();
        }
    });
};

exports.photoUpload=async(req,res,next)=>{
  var upload = multer({
    limits: {
        fileSize: maxSize,
      },
    storage: multerS3({
        s3: s3,
        bucket: "liverefo"+"/"+"photos",
        key: function (req, file, cb) {
            if (path.extname(file.originalname).toLowerCase() === '.jpg'||path.extname(file.originalname).toLowerCase() === '.png'  ||path.extname(file.originalname).toLowerCase() === '.jpeg') {
                cb(null, req.mainId+"/"+req.mainId+"_"+file.originalname);
              }
              else{
                return cb(new Error('Only images are allowed'));
              }
          
        }
      })
}).single('image',1);

 upload(req,res, async function(err){
    if(err){
        res.status(200).json({status:false,message: 'Unable to upload image check the image size and type!!'});

    } else {
        next();
    }
});
};

exports.jdUpload = async function(req, res, next) {
  var maxSize = 10 * 1000 * 1000;
    var upload = multer({
        limits: { 
            fileSize:maxSize,
          },
          storage: multerS3({
            s3: s3,
            bucket: "liverefo"+"/"+"requirement",
            key: function (req, file, cb) {
                if (path.extname(file.originalname).toLowerCase() === '.pdf'||path.extname(file.originalname).toLowerCase() === '.docx'  ||path.extname(file.originalname).toLowerCase() === '.doc') {
                    cb(null, req.mainId+"/"+"refo_"+req.mainId+"_"+Date.now()+path.extname(file.originalname).toLowerCase());
                  }
                  else{
                    return cb(new Error('Only Documents are allowed'));
                  }
            }
          })
    }).single('file',1);
    upload(req,res, function(err){
        if(err){
          console.log(err);
            res.status(200).json({status:false,message: 'Unable to upload JD check the JD size and type!!'});
        } else {
            next();
        }
    });
};
exports.backupFile=async (req,res,next)=>{
  const fileStorage = multer.diskStorage({
    // Destination to store image      
    destination: 'restoreBackup', 
      filename: async(req, file, cb) => {
          cb(null, file.originalname)
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const fileUpload = multer({
    storage: fileStorage,
    limits: {
      fileSize: 25000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(zip)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a another file'))
       }
     cb(undefined, true) 
  }
}).single('backup',1)
fileUpload(req,res, function(err){
    if(err){
        res.status(200).json({status:false,message: 'Unable to upload Check file type or if  the file is curropted!!'});
    } else {
        next();
    }
});
};

exports.existingCandidateUpload=async(req,res,next)=>{
  const fileStorage = multer.diskStorage({
    // Destination to store image      
    destination: "./"+req.mainId+"/"+"exitingCandidates"+"/", 
      filename: async(req, file, cb) => {
          cb(null, file.originalname)
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const fileUpload = multer({
    storage: fileStorage,
    // limits: {
    //   fileSize: 25000000 // 1000000 Bytes = 1 MB
    // },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(xlsx)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a another file'))
       }
     cb(undefined, true) 
  }
}).single('backup',1);
fileUpload(req,res, function(err){
    if(err){
      console.log(err);
        res.status(200).json({status:false,message: 'Unable to upload Check file type or if  the file is curropted!!'});
    } else {
        next();
    }
});
};

exports.screenShotUploader=async(req,res,next)=>{
  var upload = multer({
    limits: {
        fileSize: maxSize,
      },
    storage: multerS3({
        s3: s3,
        bucket: "liverefo"+"/"+"screenShots",
        key: function (req, file, cb) {
            if (path.extname(file.originalname).toLowerCase() === '.jpg'||path.extname(file.originalname).toLowerCase() === '.png'  ||path.extname(file.originalname).toLowerCase() === '.jpeg') {
                cb(null, req.mainId+"/"+req.mainId+"_"+file.originalname);
              }
              else{
                return cb(new Error('Only mages are allowed'));
              }
          
        }
      })
}).single('image',1);

 upload(req,res, async function(err){
    if(err){
        res.status(200).json({status:false,message: 'Unable to upload image check the image size and type!!'});

    } else {
        next();
    }
});
};

exports.candidateMindsetAssessmentUpload=async(req,res,next)=>{
  var upload1 = multer({
    limits: {
        fileSize: maxSize,
      },
    storage: multerS3({
        s3: s3,
        bucket: "liverefo"+"/"+"candidateAssessment",
        key: function (req, file, cb) {
            console.log(req.file);
            if (path.extname(file.originalname).toLowerCase() === '.jpg'||path.extname(file.originalname).toLowerCase() === '.png'  ||path.extname(file.originalname).toLowerCase() === '.jpeg') {
                cb(null, req.mainId+"/"+req.mainId+"_"+file.originalname);
              }
              else{
                return cb(new Error('Only mages are allowed'));
              }
          
        }
      })
}).single('file',1);

 upload1(req,res, async function(err){
    if(err){
      console.log(err);
        res.status(200).json({status:false,message: 'Unable to upload image check the image size and type!!'});

    } else {
        next();
    }
});
};



