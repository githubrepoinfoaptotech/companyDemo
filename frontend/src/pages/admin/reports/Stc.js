import React from 'react';
import Layout from "../../../components/Admin/ReportLayout"; 

function Stc() {
  const candidateReportUrl=`${process.env.REACT_APP_SERVER}admin/stcReport`;
  const userListUrl=`${process.env.REACT_APP_SERVER}admin/userList`;
  const getReportCountUrl=`${process.env.REACT_APP_SERVER}admin/getReportCount`;
  const CandidateViewUrl = `${process.env.REACT_APP_SERVER}admin/viewCandidate`;
  const UpdateDataUrl = `${process.env.REACT_APP_SERVER}recruiter/getAllCandidateStatus`;
  const statusCode = 303;

  return (
    <div>
      <Layout
        title="Submitted to Client Report"
        candidateReportUrl={candidateReportUrl}
        userListUrl={userListUrl}
        getReportCountUrl={getReportCountUrl}
        CandidateViewUrl={CandidateViewUrl}
        UpdateDataUrl={UpdateDataUrl}
        statusCode={ statusCode }
      />

    </div>
  )
}

export default Stc
