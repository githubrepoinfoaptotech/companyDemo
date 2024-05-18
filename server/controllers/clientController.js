const client = require("../models/client");
const orgRecruiter = require("../models/orgRecruiter");
const recruiter = require("../models/recruiter");
const statusCode=require("../models/statusList");
const levelOfHiring=require("../models/levelOfHiring");
const mailFunction=require("../functions/sendReplyMail");
const moment=require('moment');
// client control---------------------------------------------------------------------------------------------------------
//
const {Op}=require("sequelize");
//
exports.addClient = async (req, res) => {
  try {
    client
      .findOne({ where: { clientName: req.body.clientName,mainId:req.mainId } })
      .then(async (data) => {
        if (data) {
          if(req.companyType=="COMPANY")
            {
          res
            .status(200)
            .json({ status: false, message: "Project Already Exist!!" });
            }
            else
            {
              res
            .status(200)
            .json({ status: false, message: "Client Already Exist!!" });
            }
        } else {
          var message;
          if(req.companyType=="COMPANY")
            {
              var message="Project Added Successfully!";
              var myclient = {
                clientName: req.body.clientName,
                recruiterId: req.recruiterId,
                statusCode: 101,
                mainId: req.mainId,
                reasonForHiring:req.body.reasonForHiring,
                projectRegion:req.body.projectRegion,
                projectLocation:req.body.projectLocation,
                hrbpCode:req.body.hrbpCode,
                billable:req.body.billable,
                clientIndustry:req.body.clientIndustry,
                clientWebsite:req.body.clientWebsite,
                aggStartDate:req.body.aggStartDate,
                aggEndDate:req.body.aggEndDate,
                handlerId:req.body.handlerId
              };
            }
            else
            {
              var message="Client Added Successfully!";
              var myclient = {
                clientName: req.body.clientName,
                recruiterId: req.recruiterId,
                statusCode: 101,
                mainId: req.mainId,
                clientIndustry:req.body.clientIndustry,
                clientWebsite:req.body.clientWebsite,
                aggStartDate:req.body.aggStartDate,
                aggEndDate:req.body.aggEndDate
              };
            }
          
          const cliunidata = await client.findOne({
            where: { mainId: req.mainId },
            order: [["clientInt", "DESC"]],
          });
          if (cliunidata) {
            myclient.clientInt = Number(cliunidata.clientInt) + 1;
            myclient.clientText = "CLI";
          } else {
            myclient.clientInt = 1001;
            myclient.clientText = "CLI";
          }
          myclient.uniqueId = `${myclient.clientText}${myclient.clientInt}`;
          await client.create(myclient).then(async (client_data) => {
            if(req.body.levelOfHiring.length>0)
              {
                var levelOfHirings=req.body.levelOfHiring;
                for(i=0;i<levelOfHirings.length;i++)
                  {
                    const newdata = await levelOfHiring.findOne({ where: { name: levelOfHirings[i].name ,clientId:client_data.id} });
                    if(!newdata){
                      if(levelOfHirings[i].name!=''&& levelOfHirings[i].noOfHires!=''){
                      await levelOfHiring
                        .create({
                          name:  levelOfHirings[i].name,
                          noOfHires:  levelOfHirings[i].noOfHires,
                          mainId: req.mainId,
                          clientId:  client_data.id,
                        });  
                      }
                    }
                }
              }
            if(req.body.orgRec.length>0){
              var orgRec=req.body.orgRec;
              for(i=0;i<orgRec.length;i++){
              const newdata = await orgRecruiter.findOne({ where: { email: orgRec[i].email ,clientId:client_data.id} });
                
              if(!newdata){
                if(orgRec[i].name!=''&& orgRec[i].email!=''&&orgRec[i].mobile!=''){
                await orgRecruiter
                  .create({
                    name:  orgRec[i].name,
                    email:  orgRec[i].email,
                    mobile:  orgRec[i].mobile,
                    mainId: req.mainId,
                    clientId:  client_data.id,
                  });  
                }
              }
              }
            }
            res
              .status(200)
              .json({ status: true, message: message });
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Error" });
  }
};

exports.sendApprovalMail=async(req,res)=>{
  try
  {
    var c_data=client.findOne({where:{id:req.body.id}});
    await c_data.update({
      token:c_data.id
    });
    var data={name:req.body.name,email:req.body.email,content:req.body.content,token:req.body.id};
    mailFunction.sendProjectApproval(data);
    res.status(200).json({status:true,message:"Mail Has been sent for Approval"});
  }
  catch(e)
  {
    res.status(500).json({status:false,message:"Error"});
  }
};

exports.approveClient=async(req,res)=>{
  try
  {
    await client.update({approved:req.body.approved,token:""},{where:{id:req.body.clientId}});
    res.status(200).json({status:true,message:"Successfully Updated"});
  }
  catch(e)
  {
    res.status(500).json({status:false,message:"Error"});
  }
};
exports.checkApprovalValidity=async(req,res)=>{
  try
  {
    c_data=await client.findOne({ where: { id: req.body.clientId } });
    if((c_data&&c_data.token!=""))
      {
        var ordrec_data= await orgRecruiter.findAll({ where: {clientId:req.body.clientId},order:[['createdAt','DESC']]});
        var levelOfHiring_data= await levelOfHiring.findAll({ where: {clientId:req.body.clientId},order:[['createdAt','DESC']]});
        res.status(200).json({status:true,c_data:c_data,ordrec_data:ordrec_data,levelOfHiring_data:levelOfHiring_data});
      }
      else
      {
        var ordrec_data= await orgRecruiter.findAll({ where: {clientId:req.body.clientId},order:[['createdAt','DESC']]});
        var levelOfHiring_data= await levelOfHiring.findAll({ where: {clientId:req.body.clientId},order:[['createdAt','DESC']]});
        res.status(200).json({status:false,c_data:c_data,ordrec_data:ordrec_data,levelOfHiring_data:levelOfHiring_data});
      }
    
  }
  catch(e)
  {
    res.status(500).json({status:false,message:"Error"});
  }
};

exports.editClient = async (req, res) => {

  client
    .findOne({ where: { id: req.body.id } })
    .then(async (data) => {
      if(req.companyType="COMPANY")
        {
      await data.update({
        clientName: req.body.clientName,
        clientIndustry:req.body.clientIndustry,
        clientWebsite:req.body.clientWebsite,
        aggStartDate:req.body.aggStartDate,
        aggEndDate:req.body.aggEndDate,
        updatedBy:req.userId,
        reasonForHiring:req.body.reasonForHiring,
        projectRegion:req.body.projectRegion,
        projectLocation:req.body.projectLocation,
        hrbpCode:req.body.hrbpCode,
        billable:req.body.billable,
        handlerId:req.body.handlerId
      });
    }
    else
    {
      await data.update({
        clientName: req.body.clientName,
        clientIndustry:req.body.clientIndustry,
        clientWebsite:req.body.clientWebsite,
        aggStartDate:req.body.aggStartDate,
        aggEndDate:req.body.aggEndDate,
        updatedBy:req.userId
      });
    }
      
      if(req.companyType="COMPANY")
        {
          res
          .status(200)
          .json({ status: true, message: "Project Edited Successfully" });
        }
      else
      {
        res
        .status(200)
        .json({ status: true, message: "Client Edited Successfully" });
      }
    })
    .catch((e) => {
      res.status(500).json({ status: false, message: "Error" });
    });
};
exports.viewAllClients = async (req, res) => {

  var page = req.body.page;
  var limit = 50;
  const attributes=["id","mainId","statusCode","uniqueId","clientName","clientWebsite","clientIndustry","aggStartDate","aggEndDate","createdAt"]
  var mywhere={ mainId: req.mainId };
  if(req.body.clientId){
    mywhere.id=req.body.clientId;
  }
  if(req.body.fromDate&&req.body.toDate){
    const fromDate = moment(req.body.fromDate).startOf('day').toISOString();
    const toDate = moment(req.body.toDate).endOf('day').toISOString();
    mywhere.createdAt= {
      [Op.between]: [fromDate, toDate]
    }
  }
  if(req.body.fileDownload){
    client
    .findAll({
      distinct: true,
      where: mywhere,
      attributes:attributes,
      include:[{model:statusCode,attributes:['statusName']}],
      order:[['createdAt','DESC']]
    })
    .then(async (datas) => {
      const xldata=await datas.map((data,index)=>{
        return {
          s_no:index+1,
          clientName:data.clientName+"("+data.uniqueId+")",
          clientIndustry:data.clientIndustry,
          clientwebsite:data.clientWebsite,
          AgreementStartDate:moment(data.aggStartDate).format('DD-MM-YYYY'),
          AgreementEndDate:moment(data.aggEndDate).format('DD-MM-YYYY'),
          Status:data.statusList.statusName,
          created:moment(data.createdAt).format('DD-MM-YYYY')
        }
      })
      res.status(200).json({data:xldata,status:true});
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ status: false, message: "Error" });
    });
  }else{
    client
    .findAndCountAll({
      distinct: true,
      where: mywhere,
      attributes:attributes,
      include:[{model:statusCode,attributes:['statusName']}],
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
  }
 
};
exports.viewClient = async (req, res) => {
  client
    .findOne({ where: { id: req.body.id,mainId:req.mainId },include:[{
      model:statusCode,
      attributes:['statusName','id']
     }]})
    .then(async (data) => {
      if (data) {
       var ordrec_data= await orgRecruiter.findAll({ where: {clientId:req.body.id},order:[['createdAt','DESC']]});
       var levelOfHiring_data= await levelOfHiring.findAll({ where: {clientId:req.body.id},order:[['createdAt','DESC']]});
        res.status(200).json({ status: true, data: data,orgRecruiter:ordrec_data,levelOfHiring:levelOfHiring_data});
      } else {
        res.status(200).json({ status: false ,message:"Not found"});
      }
    }) 
    .catch((e) => {
      console.log(e);
      res.status(500).json({ status: false, message: "Error" });
    });
};


exports.addHiringLevel = async(req,res)=>{
  try {
    const { name,noOfHires,clientId } = req.body;
    const newdata = await levelOfHiring.findOne({ where: { name: name ,clientId:clientId} });
    if (newdata) {
      res
        .status(200)
        .json({ message: "Level Already Exits", status: false });
    } else {
      await levelOfHiring
        .create({
          name:name,
          clientId:clientId,
          noOfHires:noOfHires
        });  
        res.status(200).json({ message: "Successfully Created A Hiring Level",status:true});
     }   
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", status: false });
  }
};

exports.editHiringLevel=async(req,res)=>{

  const { name,noOfHires,clientId } = req.body;
  await orgRecruiter.findOne({ where: { id: req.body.id,mainId: req.mainId } }).then(async (data) => {
    data.name=name;
    data.noOfHires=noOfHires;
    await data.update();
  }).catch(e=>{
    console.log(e);
    res.status(500).json({ status: false, message: "Error" });
  });
};

exports.addOrgRecruiter = async (req, res) => {
  try {
    const { name,email,mobile,clientId } = req.body;
      const newdata = await orgRecruiter.findOne({where:{email:email,clientId:clientId}});
    if (newdata) {
      res
        .status(200)
        .json({ message: "Recruiter Already Exits", status: false });
    } else {
      await orgRecruiter
        .create({
          name:name,
          email:email,
          mobile:mobile,
          mainId:req.mainId,
          clientId:clientId,
        });  
        res.status(200).json({ message: "Successfully Created A Organization Recruiter",status:true});
     }   
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", status: false });
  }
};

exports.changeOrgRecruiterStatus = async (req, res) => {
  try {
    await orgRecruiter.findOne({ where: { id: req.body.id } }).then((data) => {
      if (data.isActive == true) {
        orgRecruiter.update({ isActive: false }, { where: { id: data.id } });
        res
          .status(200)
          .json({ message: "Successfully Changed To Inactive", status: true });
      } else {
        orgRecruiter.update({ isActive: true }, { where: { id: data.id } });
        res
          .status(200)
          .json({ message: "Successfully Changed To Active", status: true });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", status: false });
  }
};
exports.editOrgRecruiter=async(req,res)=>{

  const { name, email, mobile} = req.body;
  await orgRecruiter.findOne({ where: { id: req.body.id,mainId: req.mainId } }).then(async (data) => {
    if(data.email==email){
      await data.update({
        name: name,
        mobile: mobile, 
      });
      if(req.companyType=="COMPANY")
        {
          res.status(200).json({status:true,message:"Organization POC Details Edited Successfully"});
        }
        else
        {
          res.status(200).json({status:true,message:"Organization Recruiter Details Edited Successfully"});
        }
    }
    else{
      var orgRec_data=await orgRecruiter.findOne({where:{email:email,mainId:req.mainId,clientId:data.clientId}});
      if(!orgRec_data){
        await data.update({
          name: name,
          email: email,
          mobile: mobile,
        });
        if(req.companyType=="COMPANY")
          {
            res.status(200).json({status:true,message:"Organization POC Details Edited Successfully"});
          }
          else
          {
            res.status(200).json({status:true,message:"Organization Recruiter Details Edited Successfully"});
          }
        
      }
      else{
        res.status(200).json({status:false,message:"Email Already Exist Please Try Another One!!"});
      }
    }
  }).catch(e=>{
    console.log(e);
    res.status(500).json({ status: false, message: "Error" });
  });
};

exports.getClientList=async(req,res)=>{
  client.findAll({where:{mainId:req.mainId,statusCode:101},attributes:['id','clientName','uniqueId']}).then(data=>{
    res.status(200).json({status:true,data:data});
  }).catch(e=>{
    res.status(500).json({ status: false, message: "Error" });
  });
};
exports.getEditClientList=async(req,res)=>{
  client.findAll({where:{mainId:req.mainId},attributes:['id','clientName','uniqueId']}).then(data=>{
    res.status(200).json({status:true,data:data});
  }).catch(e=>{
    res.status(500).json({ status: false, message: "Error" });
  });
};
exports.getAllClientList=async(req,res)=>{
  client.findAll({where:{mainId:req.mainId},attributes:['id','clientName','uniqueId']}).then(data=>{
    res.status(200).json({status:true,data:data});
  }).catch(e=>{
    res.status(500).json({ status: false, message: "Error" });
  });
};
exports.getOrganisationReciruterList=async(req,res)=>{
  await orgRecruiter.findAll({where:{clientId:req.body.id,mainId:req.mainId,isActive:true},attributes:['id','name']}).then(async data=>{
    lvlHrData=await levelOfHiring.findAll({where:{clientId:req.body.id,mainId:req.mainId},attributes:['id','name']});
    res.status(200).json({status:true,data:data,lvlHrData:lvlHrData});
  }).catch(e=>{
    res.status(500).json({ status: false, message: "Error" });
  });
};
exports.getEditOrganisationReciruterList=async(req,res)=>{
  orgRecruiter.findAll({where:{clientId:req.body.id,mainId:req.mainId},attributes:['id','name']}).then(data=>{
    res.status(200).json({status:true,data:data});
  }).catch(e=>{
    res.status(500).json({ status: false, message: "Error" });
  });
};
exports.clientStatusCodeList=async(req,res)=>{
  statusCode.findAll({where:{statusType:"CLIENT"},attributes:['statusCode','id','statusname']}).then(data=>{
    res.status(200).json({status:true,data:data});
  }).catch(e=>{
    console.log(e);
    res.status(500).json({ status: false, message: "Error" });
  });
};
exports.changeClientStatus=async(req,res)=>{
  await client.findOne({where:{id:req.body.clientId}}).then(async data=>{
    if(data.statusCode==101){
      await data.update({
        statusCode:102,
        updatedBy:req.userId
      });
      if(req.companyType=="COMPANY")
        {
          res.status(200).json({status:true,message:"Project Is Now Inactive"});
        }
        else
        {
          res.status(200).json({status:true,message:"Client Is Now Inactive"});
        }
      
    }
    else{
      await data.update({
        statusCode:101,
        updatedBy:req.userId
      }); 
      if(req.companyType=="COMPANY")
        {
          res.status(200).json({status:true,message:"Project Is Now Active"});
        }
        else
        {
          res.status(200).json({status:true,message:"Client Is Now Active"});
        }
    }
  }).catch(e=>{
    console.log(e);
    res.status(500).json({ status: false, message: "Error" });
  })
}