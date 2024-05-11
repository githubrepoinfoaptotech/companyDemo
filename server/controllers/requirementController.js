//models
const requirements = require("../models/requirement");
const client = require("../models/client");
const orgRecruiter=require("../models/orgRecruiter");
const user = require("../models/user");
const moment=require("moment");
const statusList=require("../models/statusList");
const recruiter = require("../models/recruiter");
const assignedRequirements=require("../models/assignedRequirement");
const candidateDetails=require("../models/candidateDetail");
const Source=require("../models/source");
const candidateStatus=require("../models/myCandidateStatus");

const { Op, col } = require("sequelize");
const Sequelize = require("../db/db");
const fn = Sequelize.fn;
const candidate=require("../models/candidate");
//

exports.addRequirement = async (req, res) => {
  try{
  var client_data=await client.findOne({where:{id:req.body.clientId,mainId:req.mainId}});
  if(client_data){
    const myreq = {
      clientId: req.body.clientId,
      requirementName: req.body.requirementName,
      skills: req.body.skills,
      statusCode: 201,
      mainId: req.mainId,
      recruiterId: req.recruiterId,
      orgRecruiterId: req.body.orgRecruiterId,
      experience:req.body.experience,
      jobLocation:req.body.jobLocation,
      hideFromInternal:req.body.hideFromInternal,
      gist:req.body.gist,
      modeOfWork:req.body.modeOfWork,
      specialHiring:req.body.specialHiring,
      createdBy:req.userId
    };
    const requnidata = await requirements.findOne({
      where: { mainId: req.mainId },
      order: [["requirementInt", "DESC"]],
    });
    if (requnidata) {
      myreq.requirementInt = requnidata.requirementInt + 1;
      myreq.requirementText = "REQ";
    } else {
      myreq.requirementInt = 10001;
      myreq.requirementText = "REQ";
    }
    myreq.uniqueId = `${myreq.requirementText}${myreq.requirementInt}`;
    await requirements.create(myreq).then((data) => {
      res
        .status(200)
        .json({ status: true, message: "Requirement Added Successfully",requirementId:data.dataValues.id });
    });
  }
  else{
    res
        .status(200)
        .json({ status: false, message: "Unable To Find Client" });
  }
  
}
catch(e){
  console.log(e);
  res.status(500).json({message:"Error",status:false});
}

};
exports.viewAllRequirements = async (req, res) => {
  var page = req.body.page;
  var limit = 10;
  //attributes=[]
 var mywhere={mainId:req.mainId};
 if(req.body.recruiterId){
    mywhere.recruiterId=req.body.recruiterId
 }
  if(req.body.requirementId){
    mywhere.id=req.body.requirementId;
}


    if (req.body.fromDate && req.body.toDate) {

      const fromDate = moment(req.body.fromDate).startOf('day').toISOString();
      const toDate = moment(req.body.toDate).endOf('day').toISOString();
      mywhere.createdAt = {
        [Op.between]: [fromDate, toDate]
      }
    }
    if(req.body.fileDownload){
      requirements
    .findAll({
      distinct: true,
      where: mywhere,
      include:[
        {
          model:client,
          attributes:['clientName','uniqueId']
        },
        {
          model:orgRecruiter,
          attributes:['name']
        },
        {
          model:recruiter,
          attributes:['firstName','lastName']
        },
        {
          model:statusList,
          attributes:["statusName"]
        }
      ],
   //   attributes:[''],
      order:[['createdAt','DESC']]
    })
    .then(async (data) => {
      const xldata=await data.map((data,index)=>{
        return {
            S_no:index+1,
            RequirementName:data.requirementName+"("+data.uniqueId+")",
            CCName:data.recruiter.firstName+" "+data.recruiter.lastName,
            clientName:data.client.clientName+"("+data.client.uniqueId+")",
            orgRecruiterName:data.orgRecruiter.name,
            experience:data.experience,
            skills:data.skills,
            location:data.jobLocation,
            gist:data.gist,
            statusName:data.statusList.statusName,
            created:moment(data.createdAt).format('DD-MM-YYYY')
        }
    })
      res
        .status(200)
        .json({ status: true, data: xldata });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ status: false, message: "Error" });
    });
    }
  else{
    requirements
    .findAndCountAll({
      distinct: true,
      where: mywhere,
      include:[
        {
          model:client,
          attributes:['id','clientName','uniqueId']
        },
        {
          model:orgRecruiter,
          attributes:['id','name']
        },
        {
          model:recruiter,
          attributes:['id','firstName','lastName']
        },
        {
          model:statusList,
          attributes:['id',"statusName","statusType","statusDescription"]
        }
      ],
      limit: limit,
      offset: page * limit - limit,
   //   attributes:[''],
      order:[['createdAt','DESC']]
    })
    .then(async (data) => {

      res
        .status(200)
        .json({ status: true, data: data.rows, count: data.count });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ status: false, message: "Error" });
    });
  }
};
exports.myRequirements = async (req, res) => {
  var page = req.body.page;
  var limit = 10;
  var mywhere={mainId:req.mainId};
  mywhere.recruiterId=req.recruiterId
 
  if(req.body.requirementId){ 
    mywhere.id=req.body.requirementId;
}
  if(req.body.fromDate&&req.body.toDate){
    if (req.body.fromDate && req.body.toDate) {

      const fromDate = moment(req.body.fromDate).startOf('day').toISOString();
      const toDate = moment(req.body.toDate).endOf('day').toISOString();
      mywhere.createdAt = {
        [Op.between]: [fromDate, toDate]
      }
    }
  }
  requirements
    .findAndCountAll({
      distinct: true,
      where: mywhere,
      include:[
        {
          model:client,
          attributes:['id','clientName','uniqueId']
        },
        {
          model:orgRecruiter,
          attributes:['id','name']
        },
        {
          model:recruiter,
          attributes:['id','firstName','lastName']
        },
        {
          model:statusList,
          attributes:['id',"statusName","statusType","statusDescription"]
        }
      ],
      limit: limit,
      offset: page * limit - limit,
      order:[['createdAt','DESC']]
    })
    .then(async (data) => {
      res
        .status(200)
        .json({ status: true, data: data.rows, count: data.count });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ status: false, message: "Error" });
    });
};
exports.viewRequirement = async (req, res) => {
  console.log(req.body);
  requirements
    .findOne({ where: { id: req.body.id },include:[
      {
        model:client,
        attributes:['clientName','uniqueId']
      },
      {
        model:orgRecruiter,
        attributes:['name']
      },
      {
        model:recruiter,
        attributes:['firstName','lastName']
      },
      {
        model:statusList,
        attributes:["statusName"]
      }
      
    ],attributes:[
      'requirementName',
      'skills',
      'experience',
      'jobLocation',
      'hideFromInternal',
      'gist',
      'clientId',
      'orgRecruiterId',
      'uniqueId',
      'id',
      'requirementJd',
      'modeOfWork',
      'specialHiring',
      [
        fn(
          "concat",
          process.env.liveUrl,
          col("requirementJd")
        ),
        "requirementJd",
      ],
    ]})
    .then(async (data) => {
      console.log(data);
      if (data) {
        var candidate_count=await candidate.count({where:{requirementId:req.body.id,mainId:req.mainId}});
        res.status(200).json({ status: true, data:data,candidateCount:candidate_count});
      } else {
        res.status(200).json({ status: false });  
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ status: false, message: "Error" });
    });
};


// exports.clientRequirements=async(req,res)=>{
//     requirements.findOne({where:{clientId:req.body.id}}).then(async data=>{
//         res.status(200).json({status:true,data:data});
//     }).catch(e=>{
//         res.status(500).json({status:false,message:"Error"});
//     }); 
// };

exports.editRequirement = async (req, res) => {
  console.log(req.body);
  const myreq = {
    clientId: req.body.clientId,
    requirementName: req.body.requirementName, 
    skills: req.body.skills,
    orgRecruiterId: req.body.orgRecruiterId,
    experience:req.body.experience,
    gist:req.body.gist,
    jobLocation:req.body.jobLocation,          
    updatedBy:req.userId,
    hideFromInternal:req.body.hideFromInternal,
    specialHiring:req.body.specialHiring,
    modeOfWork:req.body.modeOfWork
  };
  requirements
    .findOne({where:{id:req.body.id}})
    .then((data) => { 
      data.update(myreq); 
      res
        .status(200)
        .json({ status: true, message: "Requirement Edited successfully" });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ status: false, message: "Error" });
    });
};

exports.requirementList=async(req,res)=>{
  if(req.roleName=="RECRUITER"){
    await requirements.findAll({where: { mainId: req.mainId ,statusCode:201,hideFromInternal:false},attributes:['id','requirementName','uniqueId']}).then(data=>{
      res.status(200).json({ status: true, data: data });
    }).catch(e=>{
      console.log(e);
      res.status(500).json({ status: false, message: "Error" });
    });
  }
  else{
    await requirements.findAll({where: { mainId: req.mainId ,statusCode:201},attributes:['id','requirementName','uniqueId']}).then(data=>{
      res.status(200).json({ status: true, data: data });
    }).catch(e=>{
      console.log(e);
      res.status(500).json({ status: false, message: "Error" });
    });
  }

};

exports.getAllRequirementList=async(req,res)=>{

  await requirements.findAll({where:{mainId:req.mainId},attributes:['id','requirementName','uniqueId']}).then(data=>{
    res.status(200).json({ status: true, data: data });
  }).catch(e=>{
    console.log(e);
    res.status(500).json({ status: false, message: "Error" });
  });
}
exports.getCCRequirementList=async(req,res)=>{

  await requirements.findAll({where:{mainId:req.mainId,recruiterId:req.recruiterId},attributes:['id','requirementName','uniqueId']}).then(data=>{
    res.status(200).json({ status: true, data: data });
  }).catch(e=>{
    console.log(e);
    res.status(500).json({ status: false, message: "Error" });
  });
}
exports.requirementStatusCodeList=async(req,res)=>{ 
  statusCode.findAll({where:{statusType:"REQUIREMENT"},attributes:['statusCode','id','statusName']}).then(data=>{
    res.status(200).json({status:true,data:data});
  }).catch(e=>{
    console.log(e);
    res.status(500).json({ status: false, message: "Error" });
  });
}; 

exports.changeRequirementStatus=async (req,res)=>{
  console.log(req.body);
  await requirements.findOne({where:{id:req.body.requirementId}}).then(async data=>{
    if(data.statusCode==201){
      await data.update({  
        statusCode:202,
        updatedBy:req.userId
      });
      res.status(200).json({status:true,message:"Requirement Is Now Inactive"});
    } 
    else{ 
      await data.update({
        statusCode:201,
        updatedBy:req.userId
      }); 
      res.status(200).json({status:true,message:"Requirement Is Now Active"});
    }
  }).catch(e=>{
    console.log(e);
    res.status(500).json({ status: false, message: "Error" });
  })
};


exports.getAllCCList=async (req,res)=>{
  try {
    recruiter.findAll({where:{mainId:req.mainId},
      attributes:["id","firstName","lastName","employeeId"],
      include:[{
      model:user,
      attributes:["id","roleName"],
      where:{roleName:{[Op.or]:["CLIENTCOORDINATOR","ADMIN"]}},
      required:true
    }]}).then(data=>{
      res.status(200).json({data:data,status:true})
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Error",status:false});
  }
};
//External Use


exports.assignRequirements=async(req,res)=>{
  console.log(req.body);
  var isAssigned=await assignedRequirements.findOne({where:{recruiterId:req.body.recruiterId,requirementId:req.body.requirementId,mainId:req.mainId}});
  if(!isAssigned){
  await assignedRequirements.create({
    recruiterId:req.body.recruiterId,//towho(req.body.)
    assignedBy:req.recruiterId,//bywho(req.)
    mainId:req.mainId,
    requirementId:req.body.requirementId
  }).then(data=>{
    res.status(200).json({status:true,message:"Requirement Assigend"});
  }).catch(e=>{
    console.log(e);
    res.status(500).json({status:false,message:"ERROR"});
  });
 }
 else{
  res.status(200).json({status:false,message:"Requirement already assigned to user!"});
 }
};
 
exports.getAssignedRequierments=async(req,res)=>{
  if(req.roleName=="ADMIN"){
    var mywhere={recruiterId:req.recruiterId,isActive:true};
  }
  else{
    var mywhere={mainId:req.mainId,recruiterId:req.recruiterId,isActive:true};
  }
  await assignedRequirements.findAll({where:mywhere,include:[{model:requirements,attributes:['requirementName','uniqueId'],include:[recruiter]},{model:recruiter}]}).then(data=>{
    res.status(200).json({status:true,data:data});
  }).catch(e=>{
    res.status(500).json({status:false,message:"ERROR"});
  });
};


exports.changeAssignedRequirementStatus=async(req,res)=>{
  await assignedRequirements.findOne({where:{id:req.body.id,mainId:req.mainId}}).then(async data=>{
    if(data.isActive==true){
      await data.update({
        isActive:false
      });
      res.status(200).json({status:true,message:"Assigned requirement changed to Inactive"});
    }
    else{
      data.isActive=true;
      await data.update({
        isActive:true
      });
      res.status(200).json({status:true,message:"Assigned requirement changed to Active"});
    }
  }).catch(e=>{
    res.status(500).json({status:false,message:"ERROR"});
  }); 
};
exports.getAssignedCompanies=async(req,res)=>{
  await assignedRequirements.findAndCountAll({where:{requirementId:req.body.requirementId},include:[{model:recruiter,include:[user]},{model:requirements,include:[recruiter]}]}).then(data=>{
    res.status(200).json({status:true,data:data.rows,count:data.count});
  }).catch(e=>{
    console.log(e);
    res.status(500).json({status:false,message:"ERROR"});
  });
 }
exports.myAssignedRequirements=async(req,res)=>{
  var limit=50;
  var page=req.body.page;
  console.log(req.recruiterId);
  if(req.roleName=="ADMIN"){
    var mywhere={recruiterId:req.recruiterId,isActive:true};
  }
  else{
    var mywhere={mainId:req.mainId,recruiterId:req.recruiterId,isActive:true};
  }
  if(req.body.fromDate&&req.body.toDate){
    if (req.body.fromDate && req.body.toDate) {

      const fromDate = moment(req.body.fromDate).startOf('day').toISOString();
      const toDate = moment(req.body.toDate).endOf('day').toISOString();
      mywhere.createdAt = {
        [Op.between]: [fromDate, toDate]
      }
    }
  }
  if(req.body.requirementId){
    mywhere.requirementId=req.body.requirementId;
  }
  await assignedRequirements.findAndCountAll({where:mywhere,include:[{model:requirements,include:[orgRecruiter,client,statusList,recruiter]},{model:recruiter,attributes:['firstName','lastName']}], limit: limit,
  offset: page * limit - limit,
  order:[['createdAt','DESC']]}).then(data=>{
    console.log(data);
    res.status(200).json({status:true,data:data.rows,count:data.count});
  }).catch(e=>{
    console.log(e);
    res.status(500).json({status:false,message:"ERROR"});
  });
}

exports.viewAllAssigendRequirements=async(req,res)=>{
  var limit=50;
  var page=req.body.page;
  var mywhere={mainId:req.mainId,recruiterId:req.body.recruiterId};
  if(req.body.fromDate&&req.body.toDate){
    if (req.body.fromDate && req.body.toDate) {

      const fromDate = moment(req.body.fromDate).startOf('day').toISOString();
      const toDate = moment(req.body.toDate).endOf('day').toISOString();
      mywhere.createdAt = {
        [Op.between]: [fromDate, toDate]
      }
    }
  }
  if(req.body.requirementId){
    mywhere.requirementId=req.body.requirementId;
  }
  
  await assignedRequirements.findAndCountAll({where:mywhere,include:[{model:requirements,attributes:['requirementName','uniqueId']},{model:recruiter,attributes:['firstName','lastName']}], limit: limit,
  offset: page * limit - limit,
  order:[['createdAt','DESC']]}).then(data=>{
    res.status(200).json({status:true,data:data.rows,count:data.count});
  }).catch(e=>{
    res.status(500).json({status:false,message:"ERROR"});
  });
}

exports.viewRequirementCandidates=async(req,res)=>{
  var page = req.body.page;
    var limit = 50;
    var mywhere = {requirementId:req.body.requirementId};

    if (req.body.fromDate && req.body.toDate) {
      const fromDate = moment(req.body.fromDate).startOf("day").toISOString();
      const toDate = moment(req.body.toDate).endOf("day").toISOString();
      mywhere.createdAt = {
        [Op.between]: [fromDate, toDate],
      };
    }
    if (req.body.search && req.body.search != "") {
      mywhere[Op.or] = [
        { uniqueId: req.body.search },
        {
          "$candidateDetail.firstName$": { [Op.iLike]: `%${req.body.search}%` },
        },
        {
          "$candidateDetail.lastName$": { [Op.iLike]: `%${req.body.search}%` },
        },
        { "$candidateDetail.mobile$": { [Op.iLike]: `%${req.body.search}%` } },
        { "$candidateDetail.email$": { [Op.iLike]: `%${req.body.search}%` } },
      ];
    } else if (req.body.year) {
      mywhere.createdAt = Sequelize.literal(
        `extract(year from "candidate"."createdAt") = ${req.body.year}`
      );
    }
    candidate.findAndCountAll({
      distinct: true,
      attributes:{exclude:['candidateInt','candidateText']},
      include: [
        {
          model: candidateDetails,
          required: true,
          attributes: [
            "firstName",
            "lastName",
            "email",
            "mobile",
            "skills",
            "currentLocation",
            "preferredLocation",
            "nativeLocation",
            "experience",
            "relevantExperience",
            "alternateMobile",
            "gender",
            "educationalQualification",
            "differentlyAbled",
            "currentCtc",
            "expectedCtc",
            "dob",
            "noticePeriod",
            "reasonForJobChange",
            "candidateProcessed",
            "reason",
            "isExternal",
            [
              fn(
                "concat",
                process.env.liveUrl,
                col("candidateDetail.resume")
              ),
              "resume",
            ],
          ],
        },
        {model:Source,attributes:['name','status']},
        {
          model: candidateStatus,
          attributes:['statusCode'],
          include: [{ model: statusList, attributes: ["statusName","statusCode"] }],
        },

        {
          model: requirements,
          attributes: ["requirementName", "uniqueId"],
          include: [
            {
              model: statusList,
              attributes: ["statusName","statusCode"],
            },
            {
              model: client,
              attributes: ["clientName"],
              include: [{ model: statusList, attributes: ["statusName"] }],
            },
            {
              model: recruiter,
              attributes: ["firstName", "lastName", "mobile"],
            },
          ],
        },
        {
          model: statusList,
          attributes: ["statusName","statusCode"],
        },
        {
          model: recruiter,
          attributes: ["firstName", "lastName", "mobile"],
        },
      ],
      where: mywhere,
      limit: limit,
      offset: page * limit - limit,
      order: [["createdAt", "DESC"]],
    }).then(data=>{
      if (data) {
        res
          .status(200)
          .json({ data: data.rows, count: data.count, status: true });
      } else {
        res.status(200).json({ data: [], count: 0, status: false });
      }
    }).catch((e) => {
      console.log(e);
      res.status(500).json({ status: false, mesage: "Error" });
    });
};
exports.updateRequirementJd= async (req, res) => {
  console.log(req.file);
  requirements
    .findOne({ where: { id: req.body.id } })
    .then(async (data) => {
      console.log(data);
      if (req.file) {
        await data.update({
          requirementJd: "requirement" + "/" + req.file.key,
        });
        res.status(200).json({ status: true, message: "Requirement Jd Added" });
      } else {
        res.status(200).json({ status: true, message: "No Requirement Submitted" });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ status: false, mesage: "Error" });
    });
};

