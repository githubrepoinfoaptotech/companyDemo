import React from 'react';
import Layout from "../../../components/Admin/ReportLayout"; 

function Invoiced() {
  const candidateReportUrl=`${process.env.REACT_APP_SERVER}admin/InvoicedReport`;
  const userListUrl=`${process.env.REACT_APP_SERVER}admin/userList`;
  const getReportCountUrl=`${process.env.REACT_APP_SERVER}admin/getReportCount`;
  const CandidateViewUrl = `${process.env.REACT_APP_SERVER}admin/viewCandidate`;
  const UpdateDataUrl = `${process.env.REACT_APP_SERVER}recruiter/getAllCandidateStatus`;
  const statusCode = 312;

  return (
    <div>
      <Layout
        title="Invoiced Report"
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

export default Invoiced