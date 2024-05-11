import React from 'react';
import Layout from '../../../components/Others/Layout';

function Offered() {
  const CandidatesDataUrl = `${process.env.REACT_APP_SERVER}recruiter/getOfferedData`; 
  const UpdateDataUrl = `${process.env.REACT_APP_SERVER}recruiter/getAllCandidateStatus`;
  const UpdateCandidates=`${process.env.REACT_APP_SERVER}recruiter/candidate`;
  const AddNotesUrl =`${process.env.REACT_APP_SERVER}recruiter/addCandidateNotes`;
  const SourceUrl =`${process.env.REACT_APP_SERVER}source/viewSourcesList`;
  const StcStatusUrl = `${process.env.REACT_APP_SERVER}recruiter/updateStcStatus`;
  const DropStatusUrl = `${process.env.REACT_APP_SERVER}recruiter/DropCandidate`;
  const OfferDeclineStatusUrl = `${process.env.REACT_APP_SERVER}recruiter/updateOfferDeclineStatus`; 
  const EditUrl =  `${process.env.REACT_APP_SERVER}recruiter/editCandidate`
  const UpdateResumeUrl = `${process.env.REACT_APP_SERVER}recruiter/updateCandidateResume`;
  const JoinedStatusUrl = `${process.env.REACT_APP_SERVER}recruiter/updateJoinedStatus`
  const MyWalletUrl =  `${process.env.REACT_APP_SERVER}auth/getMyWallet`; 
  const SendMessageUrl = `${process.env.REACT_APP_SERVER}chat/sendTemplateMessage`;
  const CandidatesUseUrl = `${process.env.REACT_APP_SERVER}recruiter/checkCandidateDetailExist`;
  // const ReverseConfirmationUrl =`${process.env.REACT_APP_SERVER}admin/resetStatus`;
  const JoiningDitchedStatusUrl = `${process.env.REACT_APP_SERVER}recruiter/updateJoiningDitchedStatus`;
  const CandidatesNoteUrl =  `${process.env.REACT_APP_SERVER}recruiter/viewCandidateNotes`; 
  const YesCadidateStatusUrl = `${process.env.REACT_APP_SERVER}recruiter/changeYesCadidateStatus`;
  const CheckAlreadyExitUrl=`${process.env.REACT_APP_SERVER}recruiter/candidateExist`;
  const addFreeUrl=`${process.env.REACT_APP_SERVER}recruiter/addFreeCandidate`;
  const addListUrl=`${process.env.REACT_APP_SERVER}recruiter/addCandidate`;
  const addCandidateUrl= `${process.env.REACT_APP_SERVER}CC/getRequirement`;
  const requirementListUrl= `${process.env.REACT_APP_SERVER}recruiter/requirementList`;
  return (
    <div>
      <Layout
        title="Ongoing - Offered"
        CandidatesDataUrl={CandidatesDataUrl}
        UpdateDataUrl={UpdateDataUrl}
        UpdateCandidates={UpdateCandidates}
        AddNotesUrl={AddNotesUrl}
        SourceUrl={SourceUrl}
        StcStatusUrl={StcStatusUrl}
        DropStatusUrl={DropStatusUrl}
        OfferDeclineStatusUrl={OfferDeclineStatusUrl}
        EditUrl={EditUrl}
        UpdateResumeUrl={UpdateResumeUrl}
        SendMessageUrl={SendMessageUrl}
        MyWalletUrl={MyWalletUrl}
        CandidatesNoteUrl={CandidatesNoteUrl}
        JoiningDitchedStatusUrl={JoiningDitchedStatusUrl}
        JoinedStatusUrl={JoinedStatusUrl}
        YesCadidateStatusUrl={YesCadidateStatusUrl}
        CandidatesUseUrl={CandidatesUseUrl}
        CheckAlreadyExitUrl={CheckAlreadyExitUrl}
        addFreeUrl={addFreeUrl}
        addListUrl={addListUrl}
        addCandidateUrl={addCandidateUrl}
        requirementListUrl={requirementListUrl}
      />
    </div>
  )
}

export default Offered
