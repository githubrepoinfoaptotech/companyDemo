import React from 'react';
import Layout from "../../../components/Admin/Layout"; 

function Offered() {
  const candidateData=`${process.env.REACT_APP_SERVER}recruiter/getOfferedData`;
  const userList=`${process.env.REACT_APP_SERVER}admin/userList`;
  const updateData = `${process.env.REACT_APP_SERVER}recruiter/getAllCandidateStatus`;
  const viewCandidate = `${process.env.REACT_APP_SERVER}admin/viewCandidate`;
  const addCandidateNotes= `${process.env.REACT_APP_SERVER}recruiter/addCandidateNotes`;
  const viewSourcesList= `${process.env.REACT_APP_SERVER}source/viewSourcesList`;
  const updateInvoicedStatus= `${process.env.REACT_APP_SERVER}recruiter/updateInvoicedStatus`;
  const updateStcStatus= `${process.env.REACT_APP_SERVER}recruiter/updateStcStatus`;
  const DropCandidate=`${process.env.REACT_APP_SERVER}recruiter/DropCandidate`;
  const updateOfferDeclineStatus= `${process.env.REACT_APP_SERVER}recruiter/updateOfferDeclineStatus`;
  const adminEditCandidate=`${process.env.REACT_APP_SERVER}admin/adminEditCandidate`;
  const updateCandidateResume=`${process.env.REACT_APP_SERVER}recruiter/updateCandidateResume`;
  const sendTemplateMessage = `${process.env.REACT_APP_SERVER}chat/sendTemplateMessage`; 
  const changeYesCadidateStatus = `${process.env.REACT_APP_SERVER}recruiter/changeYesCadidateStatus`;
  const getMyWallet =`${process.env.REACT_APP_SERVER}auth/getMyWallet`;
  const updateJoinedStatus =  `${process.env.REACT_APP_SERVER}recruiter/updateJoinedStatus`;
  const updateCrediNoteStatus = `${process.env.REACT_APP_SERVER}recruiter/updateCrediNoteStatus`;
  const updateJoiningDitchedStatus = `${process.env.REACT_APP_SERVER}recruiter/updateJoiningDitchedStatus`;
 const viewCandidateNotes = `${process.env.REACT_APP_SERVER}recruiter/viewCandidateNotes`;
  const resetStatus =`${process.env.REACT_APP_SERVER}admin/resetStatus`

  return (
    <div>
      <Layout
        title="Ongoing - Offered"
        candidateData={candidateData}
        userList={userList}
        updateData={updateData}
        viewCandidate={viewCandidate}
        addCandidateNotes={addCandidateNotes}
        viewSourcesList={viewSourcesList}
        updateInvoicedStatus={updateInvoicedStatus}
        updateStcStatus={updateStcStatus}
        DropCandidate={DropCandidate}
        updateOfferDeclineStatus={updateOfferDeclineStatus}
        adminEditCandidate={adminEditCandidate}
        updateCandidateResume={updateCandidateResume}
        sendTemplateMessage={sendTemplateMessage}
        changeYesCadidateStatus={changeYesCadidateStatus}
        getMyWallet={getMyWallet}
        updateJoinedStatus={updateJoinedStatus}
        updateCrediNoteStatus={updateCrediNoteStatus}
        updateJoiningDitchedStatus={updateJoiningDitchedStatus}
        viewCandidateNotes={viewCandidateNotes} 
        resetStatus={resetStatus}
      />

    </div>
  )
}

export default Offered

 