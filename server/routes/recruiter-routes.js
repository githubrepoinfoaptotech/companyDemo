const authController=require('../controllers/authController');
const candidateController=require('../controllers/candidateController');
const userController=require('../controllers/userController');
const requirementController=require("../controllers/requirementController");
const dashboardController=require('../controllers/dashboardController');
const chatController=require('../controllers/chatController');
const candidateNotes=require('../controllers/candidateNotesController');
const candidateYes=require('../controllers/freeWhatsappCandidateController');
const candidateMail=require("../controllers/candidateSendMailController");
const validation=require("../middlewares/validation");
const express = require('express');
const route = express.Router();
const message=require("../functions/messageValidation"); 
const check_auth=require('../middlewares/check_auth');
const fileUploader=require("../middlewares/fileUploadMulter");      
const extracttext=require("../middlewares/extractText");     
const AWS = require("aws-sdk");
require("dotenv").config(); 



route.post('/addcandidateRequirement',check_auth,candidateController.addcandidateRequirement);
route.post('/updateCandidateResume',check_auth,fileUploader.resumeUpload,candidateController.updateCandidateResume);
route.post('/updateCandidateDocument',check_auth,fileUploader.documentUpload,candidateController.updateCandidateDocument);
route.post('/updateCandidatePhoto',check_auth,fileUploader.photoUpload,candidateController.updateCandidatePhoto);
route.post('/editCandidate',check_auth,candidateController.editCandidate);
route.post('/addCandidate',check_auth,validation.addCandidateValidation,message.checkCredsAvailable,candidateController.addCandidate);
// route.post('/allCanditates',check_auth,candidateController.viewAllCanditates);
route.post('/candidate',check_auth,candidateController.viewCandidate);
route.post('/myCandidates',check_auth,candidateController.myCandidates);
route.post('/userEdit',check_auth,userController.userEdit);
route.post('/requirementList',check_auth,requirementController.requirementList);
route.post('/candidateStatusCodeList',check_auth,candidateController.candidateStatusCodeList);
route.post('/recuriterDashboard',check_auth,dashboardController.recuriterDashboard);
route.post('/updateOfferDeclineStatus',check_auth,candidateController.updateOfferDeclineStatus);
route.post('/updateJoiningDitchedStatus',check_auth,candidateController.updateJoiningDitchedStatus);
route.post('/updateInvoicedStatus',check_auth,candidateController.updateInvoicedStatus);
route.post('/updateJoinedStatus',check_auth,candidateController.updateJoinedStatus);
route.post('/candidateProgress',check_auth,candidateController.candidateProgress);
route.post('/candidateJoinedDate',check_auth,candidateController.candidateJoinedDate);
route.post('/candidateInvoiceDate',check_auth,candidateController.candidateInvoiceDate);
route.post('/getNewData',check_auth,candidateController.getNewData);
route.post('/getScheduleInterviewData',check_auth,candidateController.getScheduleInterviewData);
route.post('/getStcData',check_auth,candidateController.getStcData);
route.post('/getInterviewScheduleData',check_auth,candidateController.getInterviewScheduleData);
route.post('/getFISData',check_auth,candidateController.getFISData);
route.post('/getFICData',check_auth,candidateController.getFICData);
route.post('/getDCData',check_auth,candidateController.getDCData);
route.post('/getSBSData',check_auth,candidateController.getSBSData);
route.post('/getOfferedData',check_auth,candidateController.getOfferedData);
route.post('/getYTJData',check_auth,candidateController.getYTJData);
route.post('/getJoinedData',check_auth,candidateController.getJoinedData);
route.post("/dropCandidate",check_auth,candidateController.dropCandidate);
route.post("/addCandidateNotes",check_auth,candidateNotes.addCandidateNotes);
route.post("/deleteCandidateNotes",check_auth,candidateNotes.deleteCandidateNotes);
route.post("/viewCandidateNotes",check_auth,candidateNotes.viewCandidateNotes);
route.post("/changeYesCadidateStatus",check_auth,candidateYes.changeYesCadidateStatus);
route.post("/addFreeCandidate",check_auth,message.checkCredsAvailable,candidateYes.addFreeCandidate);
route.post("/addSendByMailCandidate",check_auth,candidateMail.addSendByMailCandidate);
route.post("/sendCandidateTemplateMail",check_auth,candidateMail.sendCandidateTemplateMail);
route.post('/singleMyCandidateSearch',check_auth,candidateController.singleMyCandidateSearch);
route.post('/viewUsers',check_auth,userController.viewUser);
route.post("/checkCandidateDetailExist",check_auth,candidateController.checkCandidateDetailExist);
route.post("/getAllCandidateStatus",check_auth,candidateController.getAllCandidateStatus);
route.post("/updateStcStatus",check_auth,candidateController.updateStcStatus);
route.post("/candidateExist",check_auth,candidateController.candidateExist);
route.post("/getAssignedRequierments",check_auth,requirementController.getAssignedRequierments);
route.post("/myAssignedRequirements",check_auth,requirementController.myAssignedRequirements);
route.post("/myassignedRequirementsList",check_auth,requirementController.myassignedRequirementsList);
route.post('/getRequirement',check_auth,requirementController.viewRequirement);
route.post('/reuseCandidate',check_auth,candidateController.reuseCandidate);
route.post('/checkEmailExist',check_auth,candidateController.checkEmailExist);
route.post('/checkMobileExist',check_auth,candidateController.checkMobileExist);
route.post('/externalUserList',check_auth,userController.externalUserList);
route.post('/inviteMsme',check_auth,authController.inviteMsme);
route.post('/sendCPVLink',check_auth,candidateController.sendCPVLink);
route.post('/candidateCpvForm',candidateController.candidateCpvForm);
route.post('/viewCpv',candidateController.viewCpv);
route.post('/candiateCpvLink',check_auth,candidateController.candiateCpvLink);
route.post('/updateCandidateMindSetAssessment',check_auth,fileUploader.candidateMindsetAssessmentUpload,candidateController.updateCandidateMindSetAssessment);
route.post('/extractInfo',check_auth,extracttext.textExtract);
route.post('/sendRequestToVendor',candidateController.sendRequestToVendor);
module.exports=route; 