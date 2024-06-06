import React from 'react';
import Layout from "../../components/Candidates/SearchLayout"; 
import {jwtDecode} from "jwt-decode"; 

function Search() {
  const decode = jwtDecode(localStorage.getItem("token")); 
  const CandidateDetailExistUrl=`${process.env.REACT_APP_SERVER}recruiter/reuseCandidate`;  
  const SourcesListUrl= `${process.env.REACT_APP_SERVER}source/viewSourcesList`;  
  const RequirementUrl = `${process.env.REACT_APP_SERVER}CC/getRequirement`;
  const CandidateExistUrl =`${process.env.REACT_APP_SERVER}recruiter/candidateExist`;
  const FreeCandidateUrl =`${process.env.REACT_APP_SERVER}recruiter/addFreeCandidate`;
  const CandidateUrl =`${process.env.REACT_APP_SERVER}recruiter/addCandidate`;
  const CandidateResumeUrl = `${process.env.REACT_APP_SERVER}recruiter/updateCandidateResume`;
  const YesCadidateStatusUrl = `${process.env.REACT_APP_SERVER}recruiter/changeYesCadidateStatus`;
  const TemplateMessageUrl = `${process.env.REACT_APP_SERVER}chat/sendTemplateMessage`;
  const MyWalletUrl = `${process.env.REACT_APP_SERVER}auth/getMyWallet`; 
  const AllCandidateStatus = `${process.env.REACT_APP_SERVER}recruiter/getAllCandidateStatus`;

  var CandidateSearchUrl ="";
  var CandidateViewUrl = "";
  var RequirementListUrl="";

  if(decode.role === "ADMIN"){
    CandidateViewUrl = `${process.env.REACT_APP_SERVER}admin/viewCandidate`; 
    CandidateSearchUrl = `${process.env.REACT_APP_SERVER}admin/singleCandidateSearch`;  
  } else{
    CandidateViewUrl = `${process.env.REACT_APP_SERVER}recruiter/candidate`;  
    CandidateSearchUrl = `${process.env.REACT_APP_SERVER}recruiter/singleMyCandidateSearch`; 
  }

  
  if(decode.role === "FREELANCER" || decode.role === "SUBVENDOR" ){
    RequirementListUrl = `${process.env.REACT_APP_SERVER}recruiter/getAssignedRequierments`;
  } else{
    RequirementListUrl = `${process.env.REACT_APP_SERVER}recruiter/requirementList`;
  } 
 
  return (
    <div>
      <Layout 
        CandidateDetailExistUrl={CandidateDetailExistUrl}
        RequirementListUrl={RequirementListUrl}
        SourcesListUrl={SourcesListUrl}
        CandidateSearchUrl={CandidateSearchUrl}
        RequirementUrl={RequirementUrl}
        CandidateExistUrl={CandidateExistUrl}
        FreeCandidateUrl={FreeCandidateUrl}
        CandidateUrl={CandidateUrl}
        CandidateResumeUrl={CandidateResumeUrl}
        YesCadidateStatusUrl={YesCadidateStatusUrl}
        TemplateMessageUrl={TemplateMessageUrl}
        MyWalletUrl={MyWalletUrl} 
        CandidateViewUrl={CandidateViewUrl}
        AllCandidateStatus={AllCandidateStatus}
      />

    </div>
  )
}

export default Search;