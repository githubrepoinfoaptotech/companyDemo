const candidateNotes=require("../models/candidateNotes");
const candaidate=require("../models/candidate");
const recruiter=require("../models/recruiter");

exports.viewCandidateNotes=async(req,res)=>{
    try{
        const can_notes=await candidateNotes.findAll({where:{candidateId:req.body.candidateId},include:[candaidate,recruiter],order:[['createdAt','ASC']]});
        res.status(200).json({status:true,data:can_notes});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false,message:"ERROR"});
    }
};
exports.addCandidateNotes=async(req,res)=>{
    await candidateNotes.create({
        candidateId:req.body.candidateId,
        recruiterId:req.recruiterId,
        mainId:req.mainId,
        message:req.body.message
    }).then(()=>{
        res.status(200).json({status:true,message:"Note Created"});
    }).catch(e=>{
        console.log(e);
        res.status(500).json({status:false,message:"ERROR"});
    });
};

exports.approveNotes=async(req,res)=>{
    await candidateNotes.findOne({where:{id:req.body.id,recruiterId:req.recruiterId}}).then(async data=>{
        if(data){
            data.update({
                approve:req.body.approve,
                approvedBy:req.recruiterId
            });
            res.status(200).json({status:true,message:"Note Approved"});
        }
        else{
            res.status(200).json({status:false,message:"Invalid Action"});
        }
    }).catch(e=>{
        console.log(e);
        res.status(500).json({status:false,message:"ERROR"});
    });
};

exports.deleteCandidateNotes=async(req,res)=>{
    candidateNotes.findOne({where:{id:req.body.id,recruiterId:req.recruiterId}}).then(async data=>{
        if(data){
            data.destroy();
            res.status(200).json({status:true,message:"Note Deleted"});
        }
        else{
            res.status(200).json({status:false,message:"Invalid Action"});
        }
    }).catch(e=>{
        console.log(e);
        res.status(500).json({status:false,message:"ERROR"});
    });
};