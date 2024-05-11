const client = require("../models/client");
const orgRecruiter = require("../models/orgRecruiter");
const recruiter = require("../models/recruiter");
const statusCode=require("../models/statusList");
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
          res
            .status(200)
            .json({ status: false, message: "Client Already Exist!!" });
        } else {
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
              .json({ status: true, message: "Client Added Successfully!" });
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Error" });
  }
};
exports.editClient = async (req, res) => {

  client
    .findOne({ where: { id: req.body.id } })
    .then(async (data) => {
      await data.update({
        clientName: req.body.clientName,
        clientIndustry:req.body.clientIndustry,
        clientWebsite:req.body.clientWebsite,
        aggStartDate:req.body.aggStartDate,
        aggEndDate:req.body.aggEndDate,
        updatedBy:req.userId
      });
      res
        .status(200)
        .json({ status: true, message: "Client Edited Successfully" });
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
        res.status(200).json({ status: true, data: data,orgRecruiter:ordrec_data});
      } else {
        res.status(200).json({ status: false ,message:"Not found"});
      }
    }) 
    .catch((e) => {
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
      res.status(200).json({status:true,message:"Organization POC Details Edited Successfully"});
    }
    else{
      var orgRec_data=await orgRecruiter.findOne({where:{email:email,mainId:req.mainId,clientId:data.clientId}});
      if(!orgRec_data){
        await data.update({
          name: name,
          email: email,
          mobile: mobile,
        });
        res.status(200).json({status:true,message:"Organization POC Details Edited Successfully"});
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
  orgRecruiter.findAll({where:{clientId:req.body.id,mainId:req.mainId,isActive:true},attributes:['id','name']}).then(data=>{
    res.status(200).json({status:true,data:data});
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
      res.status(200).json({status:true,message:"Client Is Now Inactive"});
    }
    else{
      await data.update({
        statusCode:101,
        updatedBy:req.userId
      }); 
      res.status(200).json({status:true,message:"Client Is Now Active"});
    }
  }).catch(e=>{
    console.log(e);
    res.status(500).json({ status: false, message: "Error" });
  })
}