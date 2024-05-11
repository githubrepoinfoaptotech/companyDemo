const { Router } = require("express");
const requirementController=require('../controllers/requirementController');
const ClientController=require('../controllers/clientController');
const candidateController=require('../controllers/candidateController');
const check_auth_CC=require('../middlewares/check_auth_clientCoordinater');
const check_auth=require('../middlewares/check_auth');
const dashboardController=require('../controllers/dashboardController');
const validation=require("../middlewares/validation");
const filefunctions=require("../middlewares/fileUploadMulter");
const route=Router();

route.post('/addRequirement',check_auth_CC,validation.addRequirementValidation,requirementController.addRequirement);
route.post('/changeRequirementStatus',check_auth_CC,requirementController.changeRequirementStatus);
route.post('/editRequirement',check_auth_CC,requirementController.editRequirement);
route.post('/myRequirements',check_auth_CC,requirementController.myRequirements);
route.post('/getRequirement',check_auth,requirementController.viewRequirement);
route.post('/getClientList',check_auth_CC,ClientController.getClientList);
route.post('/getOrganisationReciruterList',check_auth_CC,ClientController.getOrganisationReciruterList);
route.post('/requirementStatusCodeList',check_auth_CC,requirementController.requirementStatusCodeList);
route.post('/candidateStatusCodeList',check_auth_CC,candidateController.candidateStatusCodeList);
route.post('/ccDashboard',check_auth_CC,dashboardController.ccDashboard);
route.post("/getAllRequirementList",check_auth_CC,requirementController.getAllRequirementList);
route.post("/getCCRequirementList",check_auth_CC,requirementController.getCCRequirementList);
route.post("/getEditClientList",check_auth_CC,ClientController.getEditClientList);
route.post("/getEditOrganisationReciruterList",check_auth_CC,ClientController.getEditOrganisationReciruterList);
route.post("/resetStatus",check_auth_CC,candidateController.resetStatus);
route.post("/updateRequirementJd",check_auth_CC,filefunctions.jdUpload,requirementController.updateRequirementJd);
module.exports=route;