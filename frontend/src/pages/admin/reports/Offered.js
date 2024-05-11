import React from 'react';
import Layout from "../../../components/Admin/ReportLayout"; 

function Offered() {
  const candidateReportUrl=`${process.env.REACT_APP_SERVER}admin/OfferedReport`;
  const userListUrl=`${process.env.REACT_APP_SERVER}admin/userList`;
  const getReportCountUrl=`${process.env.REACT_APP_SERVER}admin/getReportCount`;
  const CandidateViewUrl = `${process.env.REACT_APP_SERVER}admin/viewCandidate`;
  const UpdateDataUrl = `${process.env.REACT_APP_SERVER}recruiter/getAllCandidateStatus`;
  const statusCode = 308;

  return (
    <div>
      <Layout
        title="Offered Report"
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

export default Offered