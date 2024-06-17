import React, { useState, useEffect } from "react";
import { Grid, Backdrop, CircularProgress, Fab   } from "@material-ui/core";
  import useStyles from "./styles";
 import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
 import { useHistory } from "react-router-dom";
import {  signOut, useUserDispatch } from "../../context/UserContext";
 import EmailIcon from '@material-ui/icons/Email';
import Companies from '../../images/icon/Companies.png';
import New from '../../images/icon/New.png';
import FinalInterview from '../../images/icon/FinalInterview.png'; 
import DocumentCollected from '../../images/icon/DocumentCollected.png'; 
import FinalInterviewComplete from '../../images/icon/FinalInterviewComplete.png';
import InterviewScheduled from '../../images/icon/InterviewScheduled.png';
 import Joined from '../../images/icon/Joined.png';
 import Offered from '../../images/icon/Offered.png';
import SalaryBreakup from '../../images/icon/SalaryBreakup.png';
import ScheduleInterview from '../../images/icon/ScheduleInterview.png';
import YetToJoin from '../../images/icon/YetToJoin.png';
import WorkFlow from '../../images/RefoWorkFlow.png'
import WorkFlowRC from '../../images/RefoWorkFlowRc.jpg'
 

export default function Dashboard(props) {
 
  var classes = useStyles(); 
  const history = useHistory();
  var userDispatch = useUserDispatch();
 
  const [loader, setLoader] = useState(false); 
   var [count, setCount] = useState([]);
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token); 


  useEffect(() => {
    setLoader(true);
    var decode = jwtDecode(token); 

    var url = ""; 
    if (decode.role === "SUPERADMIN") {
      url = `${process.env.REACT_APP_SERVER}superAdmin/superAdminDashboard`
    } else if (decode.role === "ADMIN") {
      url = `${process.env.REACT_APP_SERVER}admin/adminDashboard`
    } else if (decode.role === "CLIENTCOORDINATOR") {
      url = `${process.env.REACT_APP_SERVER}CC/ccDashboard`
    } else {
      url = `${process.env.REACT_APP_SERVER}recruiter/recuriterDashboard`
    }
 
    axios({
      method: 'post',
      url: url,
      data: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },

    })
      .then(function (response) {
         if (response.data.status === true) {
       
          setCount(response.data.data);
          setLoader(false);

        }
      })
      .catch(function (error) {
        console.log(error);  
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          signOut(userDispatch, props.history)
         }
      });
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userDispatch])
 


  return (
    <>
       
       {decode.role === "ADMIN" ?
       <Grid container direction="row" spacing={2} >
        <Grid item xs={12} className={classes.flexCenter}> 
          <img src={decode.companyType==="COMPANY" ? WorkFlow: WorkFlowRC} alt="workflow" width="82%"/>
        </Grid>  
        {/* <Grid item xs={12}  className={classes.flexCenter}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            >
            Create a Vendor / Freelancer account & manage hiring - view Statewise Consultancy / Freelancer List
          </Button>
        </Grid> */}
        </Grid>

        
        :""}
        <Grid container direction="row" spacing={2}>

          <Grid item xs={6}>   <PageTitle title={decode.role === "SUPERADMIN" ?"Dashboard":"Live Status"} />  </Grid>

          <Grid item xs={6}   > </Grid>

        </Grid>

        <Grid container spacing={2} columns={16}  >

          {decode.role === "SUPERADMIN" ?
            <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/admin") }}>
           
              <div className={ classes.blue}>
              
                <p className={classes.grid_title}>Companies</p>
                <div className={classes.visitsNumberContainer}>
                  <Grid container item  >
                    <Grid item xs={7} className={classes.M10}>
                      <Typography size="xl" weight="medium" noWrap className={classes.count}>
                        {count.admin_count}
                      </Typography>
                    </Grid>
                     <Grid item xs={5} className={classes.M10}    >
                    
                     <Fab className={classes.blueIcon} aria-label="dashboard">
                     <img className={classes.w25} src={Companies}  alt="Companies" /> 
                   </Fab>

                     </Grid>    

                  </Grid>
                </div>



              </div>
            </Grid>

            : decode.role === "ADMIN" ? 
            <>
             
              <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/admin_candidates_new") }} >
                <div className={ classes.blue} >
                  
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                     
                      <Grid item xs={12}>
                      <p className={classes.grid_title}>New Candidates</p>
                      </Grid>
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status301_count ? count.newcounts.status301_count : 0}
                        </Typography>
                      </Grid>

                       <Grid item xs={5} className={classes.M10}    >
                     
                      <Fab className={classes.blueIcon} aria-label="dashboard">
                       <img className={classes.w25} src={New} alt="New Candidates" />
                      </Fab>

                      </Grid>    


                    </Grid>
                  </div>

                </div>
              </Grid>

              <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/admin_candidates_stc") }} >
                <div className={classes.purple}>
                  <p className={classes.grid_title}>{ decode.companyType === "COMPANY" ? "Submitted to Hiring Manager" : "Submitted to Client"  }</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status303_count ? count.newcounts.status303_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.purpleIcon} aria-label="dashboard">
                     <EmailIcon className={classes.w26}  />  
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>

              <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/admin_candidates_schedule_interview") }} >
                <div className={ classes.red2} >
                  <p className={classes.grid_title}>Schedule Interview</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status3031_count ? count.newcounts?.status3031_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.red2Icon} aria-label="dashboard">
                     <img  className={classes.w25} src={ScheduleInterview} alt="Schedule Interview" />
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>


              <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/admin_candidates_interview_scheduled") }} >
                <div className={classes.orange}>
                  <p className={classes.grid_title}>Interview Scheduled</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status304_count ? count.newcounts.status304_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.orangeIcon} aria-label="dashboard">
                    
                     <img className={classes.w25} src={InterviewScheduled} alt="Interview Scheduled" />
                     
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>

              <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/admin_candidates_final_interview_scheduled") }} >
                <div className={ classes.teal} >
                  <p className={classes.grid_title}>Final Interview Scheduled</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status3041_count ? count.newcounts?.status3041_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.tealIcon} aria-label="dashboard">
                     <img  className={classes.w25}src={FinalInterview} alt="Final Interview Scheduled" />
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>


           
              <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/admin_candidates_fic") }} >
                <div className={classes.blueGrey}>
                  <p className={classes.grid_title}>Final Interview Completed</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status305_count ? count.newcounts?.status305_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.blueGreyIcon} aria-label="dashboard">
                     <img  className={classes.w25} src={FinalInterviewComplete} alt="Final Interview Completed" />
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>

              <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/admin_candidates_document_collected") }} >
                <div className={classes.indigo}>
                  <p className={classes.grid_title}>Document Collected</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status306_count ? count.newcounts?.status306_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.indigoIcon} aria-label="dashboard"> 
                     <img  className={classes.w25} src={DocumentCollected} alt="Document Collected" />
                     
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>

              <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/admin_candidates_salary_breakup_shared") }} >
                <div className={classes.pink}>
                  <p className={classes.grid_title}>Salary Breakup Shared</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status307_count ? count.newcounts?.status307_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.pinkIcon} aria-label="dashboard">
                     <img className={classes.w25} src={SalaryBreakup} alt="Salary Breakup Shared" />
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>
 

              <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/admin_candidates_offered") }} >
                <div className={classes.deepOrange}>
                  <p className={classes.grid_title}>Offered</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status308_count ? count.newcounts?.status308_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.deepOrangeIcon} aria-label="dashboard">
                     <img  className={classes.w25} src={Offered}  alt="Offered" />
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>

              <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/admin_candidates_yet_to_join") }} >
                <div className={classes.brown}>
                  <p className={classes.grid_title}>Yet to Join</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status3081_count ? count.newcounts?.status3081_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}   >
                     <Fab className={classes.brownIcon} aria-label="dashboard">
                     <img className={classes.w25} src={YetToJoin} alt="Yet to Join"  />
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>
              
              <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/admin_candidates_joined") }} >
                <div className={classes.green}>
                  <p className={classes.grid_title}>Joined</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status309_count ? count.newcounts?.status309_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.greenIcon} aria-label="dashboard">
                     <img className={classes.w25} src={Joined} alt="Joined" />
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>
 
            </>

            : decode.role === "CLIENTCOORDINATOR" ?

              <>
               

                <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/cc_candidates_new") }} >
                  <div className={ classes.blue} >
                    <p className={classes.grid_title}>New Candidates</p>

                    <div className={classes.visitsNumberContainer}>
                      <Grid container item  >
                        <Grid item xs={7} className={classes.M10}>
                          <Typography size="xl" weight="medium" noWrap className={classes.count}>
                            {count.newcounts?.status301_count ? count.newcounts.status301_count : 0}
                          </Typography>
                        </Grid>
                         <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.blueIcon} aria-label="dashboard">
                     <img className={classes.w25} src={New} alt="New Candidates"  />
                   </Fab>

                     </Grid>    

                      </Grid>
                    </div>

                  </div>
                </Grid>

                <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/cc_candidates_stc") }} >
                  <div className={classes.purple}>
                    <p className={classes.grid_title}>{ decode.companyType === "COMPANY" ? "Submitted to Hiring Manager" : "Submitted to Client"}</p>
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item  >
                        <Grid item xs={7} className={classes.M10}>
                          <Typography size="xl" weight="medium" noWrap className={classes.count}>
                            {count.newcounts?.status303_count ? count.newcounts.status303_count : 0}
                          </Typography>
                        </Grid>
                         <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.purpleIcon} aria-label="dashboard">
                     <EmailIcon className={classes.w26}  />  
                   </Fab>

                     </Grid>    

                      </Grid>
                    </div>

                  </div>
                </Grid>

          

                <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/cc_candidates_schedule_interview") }} >
                <div className={ classes.red2} >
                  <p className={classes.grid_title}>Schedule Interview</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status3031_count ? count.newcounts?.status3031_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.red2Icon} aria-label="dashboard">
                     <img  className={classes.w25} src={ScheduleInterview}  alt="Schedule Interview" />
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>

              <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/cc_candidates_interview_scheduled") }} >
                  <div className={classes.orange}>
                    <p className={classes.grid_title}>Interview Scheduled</p>

                    <div className={classes.visitsNumberContainer}>
                      <Grid container item  >
                        <Grid item xs={7} className={classes.M10}>
                          <Typography size="xl" weight="medium" noWrap className={classes.count}>
                            {count.newcounts?.status304_count ? count.newcounts.status304_count : 0}
                          </Typography>
                        </Grid>
                         <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.orangeIcon} aria-label="dashboard">
                     <img className={classes.w25} src={InterviewScheduled} alt="Interview Scheduled" />
                   </Fab>

                     </Grid>    

                      </Grid>
                    </div>

                  </div>
                </Grid>


                <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/cc_candidates_fis") }} >
                  <div className={ classes.teal} >
                    <p className={classes.grid_title}>Final Interview Scheduled</p>

                    <div className={classes.visitsNumberContainer}>
                      <Grid container item  >
                        <Grid item xs={7} className={classes.M10}>
                          <Typography size="xl" weight="medium" noWrap className={classes.count}>
                            {count.newcounts?.status3041_count ? count.newcounts?.status3041_count : 0}
                          </Typography>
                        </Grid>
                         <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.tealIcon} aria-label="dashboard">
                     <img  className={classes.w25}src={FinalInterview} alt="Final Interview Scheduled" />
                   </Fab>

                     </Grid>    

                      </Grid>
                    </div>

                  </div>
                </Grid>

                <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/cc_candidates_fic") }} >
                  <div className={classes.blueGrey}>
                    <p className={classes.grid_title}>Final Interview Completed</p>
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item  >
                        <Grid item xs={7} className={classes.M10}>
                          <Typography size="xl" weight="medium" noWrap className={classes.count}>
                            {count.newcounts?.status305_count ? count.newcounts?.status305_count : 0}
                          </Typography>
                        </Grid>
                         <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.blueGreyIcon} aria-label="dashboard">
                     <img  className={classes.w25} src={FinalInterviewComplete} alt="Final Interview Completed" /> 
                   </Fab>

                     </Grid>    

                      </Grid>
                    </div>

                  </div>
                </Grid>

                <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/cc_candidates_document_collected") }} >
                  <div className={classes.indigo}>
                    <p className={classes.grid_title}>Document Collected</p>
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item  >
                        <Grid item xs={7} className={classes.M10}>
                          <Typography size="xl" weight="medium" noWrap className={classes.count}>
                            {count.newcounts?.status306_count ? count.newcounts?.status306_count : 0}
                          </Typography>
                        </Grid>
                         <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.indigoIcon} aria-label="dashboard">
                     <img  className={classes.w25} src={DocumentCollected} alt="Document Collected" />
                   </Fab>

                     </Grid>    

                      </Grid>
                    </div>

                  </div>
                </Grid>

                <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/cc_candidates_salary_breakup_shared") }} >
                  <div className={classes.pink}>
                    <p className={classes.grid_title}>Salary Breakup Shared</p>

                    <div className={classes.visitsNumberContainer}>
                      <Grid container item  >
                        <Grid item xs={7} className={classes.M10}>
                          <Typography size="xl" weight="medium" noWrap className={classes.count}>
                            {count.newcounts?.status307_count ? count.newcounts?.status307_count : 0}
                          </Typography>
                        </Grid>
                         <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.pinkIcon} aria-label="dashboard">
                     <img className={classes.w25} src={SalaryBreakup}  alt="Salary Breakup Shared" />
                   </Fab>

                     </Grid>    

                      </Grid>
                    </div>

                  </div>
                </Grid>

                <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/cc_candidates_offered") }} >
                  <div className={classes.deepOrange}>
                    <p className={classes.grid_title}>Offered</p>

                    <div className={classes.visitsNumberContainer}>
                      <Grid container item  >
                        <Grid item xs={7} className={classes.M10}>
                          <Typography size="xl" weight="medium" noWrap className={classes.count}>
                            {count.newcounts?.status308_count ? count.newcounts?.status308_count : 0}
                          </Typography>
                        </Grid>
                         <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.deepOrangeIcon} aria-label="dashboard">
                     <img  className={classes.w25} src={Offered} alt="Offered"  />
                   </Fab>

                     </Grid>    

                      </Grid>
                    </div>

                  </div>
                </Grid>

                <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/cc_candidates_yet_to_join") }} >
                <div className={classes.brown}>
                  <p className={classes.grid_title}>Yet to Join</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status3081_count ? count.newcounts?.status3081_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}      > 
                     <Fab className={classes.brownIcon} aria-label="dashboard">
                     <img className={classes.w25} src={YetToJoin} alt="Yet to Join" /> 
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>


                <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/cc_candidates_joined") }} >
                  <div className={classes.green}>
                    <p className={classes.grid_title}>Joined</p>

                    <div className={classes.visitsNumberContainer}>
                      <Grid container item  >
                        <Grid item xs={7} className={classes.M10}>
                          <Typography size="xl" weight="medium" noWrap className={classes.count}>
                            {count.newcounts?.status308_count ? count.newcounts?.status308_count : 0}
                          </Typography>
                        </Grid>
                         <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.greenIcon} aria-label="dashboard">
                     <img className={classes.w25} src={Joined} alt="Joined" />
                   </Fab>

                     </Grid>    

                      </Grid>
                    </div>

                  </div>
                </Grid>

              </>

              : decode.role === "RECRUITER" ?

                <>
                  <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/recruiter_candidates_new") }} >
                    <div className={ classes.blue} >
                      <p className={classes.grid_title}> New Candidates</p>

                      <div className={classes.visitsNumberContainer}>
                        <Grid container item  >
                          <Grid item xs={7} className={classes.M10}>
                            <Typography size="xl" weight="medium" noWrap className={classes.count}>
                              {count.newcounts?.status301_count ? count.newcounts.status301_count : 0}
                            </Typography>
                          </Grid>
                           <Grid item xs={5} className={classes.M10}    >
                     
                      <Fab className={classes.blueIcon} aria-label="dashboard">
                      <img className={classes.w25} src={New} alt="New Candidates"  />
                    </Fab>

                      </Grid>    

                        </Grid>
                      </div>

                    </div>
                  </Grid>

                  <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/recruiter_candidates_stc") }} >
                    <div className={classes.purple}>
                      <p className={classes.grid_title}>{ decode.companyType === "COMPANY" ? "Submitted to Hiring Manager" : "Submitted to Client"  }</p>
                      <div className={classes.visitsNumberContainer}>
                        <Grid container item  >
                          <Grid item xs={7} className={classes.M10}>
                            <Typography size="xl" weight="medium" noWrap className={classes.count}>
                              {count.newcounts?.status303_count ? count.newcounts.status303_count : 0}
                            </Typography>
                          </Grid>
                           <Grid item xs={5} className={classes.M10}    >
                     
                      <Fab className={classes.purpleIcon} aria-label="dashboard">
                      <EmailIcon className={classes.w26}  />  
                    </Fab>

                      </Grid>    

                        </Grid>
                      </div>
                    </div>
                  </Grid>

                  <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/recruiter_candidates_schedule_interview") }} >
                <div className={ classes.red2} >
                  <p className={classes.grid_title}>Schedule Interview</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status3031_count ? count.newcounts?.status3031_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.red2Icon} aria-label="dashboard">
                     <img  className={classes.w25} src={ScheduleInterview} alt="Schedule Interview" />
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>

                  <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/recruiter_candidates_interview_scheduled") }} >
                    <div className={classes.orange}>
                      <p className={classes.grid_title}>Interview Scheduled</p>

                      <div className={classes.visitsNumberContainer}>
                        <Grid container item  >
                          <Grid item xs={7} className={classes.M10}>
                            <Typography size="xl" weight="medium" noWrap className={classes.count}>
                              {count.newcounts?.status304_count ? count.newcounts.status304_count : 0}
                            </Typography>
                          </Grid>
                           <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.orangeIcon} aria-label="dashboard">
                     <img className={classes.w25} src={InterviewScheduled} alt="Interview Scheduled" />
                   </Fab>

                     </Grid>    

                        </Grid>
                      </div>

                    </div>
                  </Grid>

                  

                  <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/recruiter_candidates_fis") }} >
                  <div className={ classes.teal} >
                    <p className={classes.grid_title}>Final Interview Scheduled</p>

                    <div className={classes.visitsNumberContainer}>
                      <Grid container item  >
                        <Grid item xs={7} className={classes.M10}>
                          <Typography size="xl" weight="medium" noWrap className={classes.count}>
                            {count.newcounts?.status3041_count ? count.newcounts?.status3041_count : 0}
                          </Typography>
                        </Grid>
                         <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.tealIcon} aria-label="dashboard">
                     <img  className={classes.w25}src={FinalInterview} alt="Final Interview Scheduled" />
                   </Fab>

                     </Grid>    

                      </Grid>
                    </div>

                  </div>
                </Grid>

                  <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/recruiter_candidates_fic") }} >
                    <div className={classes.blueGrey}>
                      <p className={classes.grid_title}>Final Interview Completed</p>
                      <div className={classes.visitsNumberContainer}>
                        <Grid container item  >
                          <Grid item xs={7} className={classes.M10}>
                            <Typography size="xl" weight="medium" noWrap className={classes.count}>
                              {count.newcounts?.status305_count ? count.newcounts?.status305_count : 0}
                            </Typography>
                          </Grid>
                           <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.blueGreyIcon} aria-label="dashboard">
                     <img  className={classes.w25} src={FinalInterviewComplete} alt="Final Interview Completed" />
                   </Fab>

                     </Grid>    

                        </Grid>
                      </div>

                    </div>
                  </Grid>

                  <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/recruiter_candidates_document_collected") }} >
                    <div className={classes.indigo}>
                      <p className={classes.grid_title}>Document Collected</p>

                      <div className={classes.visitsNumberContainer}>
                        <Grid container item  >
                          <Grid item xs={7} className={classes.M10}>
                            <Typography size="xl" weight="medium" noWrap className={classes.count}>
                              {count.newcounts?.status306_count ? count.newcounts?.status306_count : 0}
                            </Typography>
                          </Grid>
                           <Grid item xs={5} className={classes.M10}    >
                     
                      <Fab className={classes.indigoIcon} aria-label="dashboard">
                      <img  className={classes.w25} src={DocumentCollected} alt="Document Collected" />
                    </Fab>

                      </Grid>    

                        </Grid>
                      </div>

                    </div>
                  </Grid>

                  <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/recruiter_candidates_salary_breakup_shared") }} >
                    <div className={classes.pink}>
                      <p className={classes.grid_title}>Salary Breakup Shared</p>

                      <div className={classes.visitsNumberContainer}>
                        <Grid container item  >
                          <Grid item xs={7} className={classes.M10}>
                            <Typography size="xl" weight="medium" noWrap className={classes.count}>
                              {count.newcounts?.status307_count ? count.newcounts?.status307_count : 0}
                            </Typography>
                          </Grid>
                           <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.pinkIcon} aria-label="dashboard">
                     <img className={classes.w25} src={SalaryBreakup}  alt="Salary Breakup Shared" />
                   </Fab>

                     </Grid>    

                        </Grid>
                      </div>

                    </div>
                  </Grid>

                  <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/recruiter_candidates_offered") }} >
                    <div className={classes.pink}>
                      <p className={classes.grid_title}>Offered</p>

                      <div className={classes.visitsNumberContainer}>
                        <Grid container item  >
                          <Grid item xs={7} className={classes.M10}>
                            <Typography size="xl" weight="medium" noWrap className={classes.count}>
                              {count.newcounts?.status308_count ? count.newcounts?.status308_count : 0}
                            </Typography>
                          </Grid>
                           <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.pinkIcon} aria-label="dashboard">
                     <img  className={classes.w25} src={Offered} alt="Offered"  />
                   </Fab>

                     </Grid>    

                        </Grid>
                      </div>

                    </div>
                  </Grid>

                  <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/recruiter_candidates_yet_to_join") }} >
                <div className={classes.brown}>
                  <p className={classes.grid_title}>Yet to Join</p>
                  <div className={classes.visitsNumberContainer}>
                    <Grid container item  >
                      <Grid item xs={7} className={classes.M10}>
                        <Typography size="xl" weight="medium" noWrap className={classes.count}>
                          {count.newcounts?.status3081_count ? count.newcounts?.status3081_count : 0}
                        </Typography>
                      </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                     
                     <Fab className={classes.brownIcon} aria-label="dashboard">
                     <img className={classes.w25} src={YetToJoin} alt="Yet to Join" />
                   </Fab>

                     </Grid>    

                    </Grid>
                  </div>
                </div>
              </Grid>

                  <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/recruiter_candidates_joined") }} >
                    <div className={classes.green}>
                      <p className={classes.grid_title}>Joined</p>

                      <div className={classes.visitsNumberContainer}>
                        <Grid container item  >
                          <Grid item xs={7} className={classes.M10}>
                            <Typography size="xl" weight="medium" noWrap className={classes.count}>
                              {count.newcounts?.status309_count ? count.newcounts?.status309_count : 0}
                            </Typography>
                          </Grid>
                           <Grid item xs={5} className={classes.M10}    >
                     
                      <Fab className={classes.greenIcon} aria-label="dashboard">
                      <img className={classes.w25} src={Joined} alt="Joined" />
                    </Fab>

                      </Grid>    

                        </Grid>
                      </div>

                    </div>
                  </Grid>

                </>
                  
           :    

           <>
             <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/others_candidates_new") }} >
               <div className={ classes.blue} >
                 <p className={classes.grid_title}> New Candidates</p>

                 <div className={classes.visitsNumberContainer}>
                   <Grid container item  >
                     <Grid item xs={7} className={classes.M10}>
                       <Typography size="xl" weight="medium" noWrap className={classes.count}>
                         {count.newcounts?.status301_count ? count.newcounts.status301_count : 0}
                       </Typography>
                     </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                 
                 <Fab className={classes.blueIcon} aria-label="dashboard">
                 <img className={classes.w25} src={New} alt="New Candidates"  />
               </Fab>

                 </Grid>    

                   </Grid>
                 </div>

               </div>
             </Grid>

             <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/others_candidates_stc") }} >
               <div className={classes.purple}>
                 <p className={classes.grid_title}>{ decode.companyType === "COMPANY" ? "Submitted to Hiring Manager" : "Submitted to Client"  }</p>
                 <div className={classes.visitsNumberContainer}>
                   <Grid container item  >
                     <Grid item xs={7} className={classes.M10}>
                       <Typography size="xl" weight="medium" noWrap className={classes.count}>
                         {count.newcounts?.status303_count ? count.newcounts.status303_count : 0}
                       </Typography>
                     </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                 
                 <Fab className={classes.purpleIcon} aria-label="dashboard">
                 <EmailIcon className={classes.w26}  />  
               </Fab>

                 </Grid>    

                   </Grid>
                 </div>
               </div>
             </Grid>

             <Grid item lg={2} xl={2} md={3} sm={4} xs={12}  onClick={() => { history.push("/app/others_candidates_schedule_interview") }} >
           <div className={ classes.red2} >
             <p className={classes.grid_title}>Schedule Interview</p>
             <div className={classes.visitsNumberContainer}>
               <Grid container item  >
                 <Grid item xs={7} className={classes.M10}>
                   <Typography size="xl" weight="medium" noWrap className={classes.count}>
                     {count.newcounts?.status3031_count ? count.newcounts?.status3031_count : 0}
                   </Typography>
                 </Grid>
                   <Grid item xs={5} className={classes.M10}    >
                 
                 <Fab className={classes.red2Icon} aria-label="dashboard">
                 <img  className={classes.w25} src={ScheduleInterview} alt="Schedule Interview" />
               </Fab>

                 </Grid>    

               </Grid>
             </div>
           </div>
           </Grid>

             <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/others_candidates_interview_scheduled") }} >
               <div className={classes.orange}>
                 <p className={classes.grid_title}>Interview Scheduled</p>

                 <div className={classes.visitsNumberContainer}>
                   <Grid container item  >
                     <Grid item xs={7} className={classes.M10}>
                       <Typography size="xl" weight="medium" noWrap className={classes.count}>
                         {count.newcounts?.status304_count ? count.newcounts.status304_count : 0}
                       </Typography>
                     </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                 
                 <Fab className={classes.orangeIcon} aria-label="dashboard">
                 <img className={classes.w25} src={InterviewScheduled} alt="Interview Scheduled" />
               </Fab>

                 </Grid>    

                   </Grid>
                 </div>

               </div>
             </Grid>

             

             <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/others_candidates_fis") }} >
             <div className={ classes.teal} >
               <p className={classes.grid_title}>Final Interview Scheduled</p>

               <div className={classes.visitsNumberContainer}>
                 <Grid container item  >
                   <Grid item xs={7} className={classes.M10}>
                     <Typography size="xl" weight="medium" noWrap className={classes.count}>
                       {count.newcounts?.status3041_count ? count.newcounts?.status3041_count : 0}
                     </Typography>
                   </Grid>
                     <Grid item xs={5} className={classes.M10}    >
                 
                 <Fab className={classes.tealIcon} aria-label="dashboard">
                 <img  className={classes.w25}src={FinalInterview} alt="Final Interview Scheduled" />
               </Fab>

                 </Grid>    

                 </Grid>
               </div>

             </div>
           </Grid>

             <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/others_candidates_fic") }} >
               <div className={classes.blueGrey}>
                 <p className={classes.grid_title}>Final Interview Completed</p>
                 <div className={classes.visitsNumberContainer}>
                   <Grid container item  >
                     <Grid item xs={7} className={classes.M10}>
                       <Typography size="xl" weight="medium" noWrap className={classes.count}>
                         {count.newcounts?.status305_count ? count.newcounts?.status305_count : 0}
                       </Typography>
                     </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                 
                 <Fab className={classes.blueGreyIcon} aria-label="dashboard">
                 <img  className={classes.w25} src={FinalInterviewComplete} alt="Final Interview Completed" />
               </Fab>

                 </Grid>    

                   </Grid>
                 </div>

               </div>
             </Grid>

             <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/others_candidates_document_collected") }} >
               <div className={classes.indigo}>
                 <p className={classes.grid_title}>Document Collected</p>

                 <div className={classes.visitsNumberContainer}>
                   <Grid container item  >
                     <Grid item xs={7} className={classes.M10}>
                       <Typography size="xl" weight="medium" noWrap className={classes.count}>
                         {count.newcounts?.status306_count ? count.newcounts?.status306_count : 0}
                       </Typography>
                     </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                 
                 <Fab className={classes.indigoIcon} aria-label="dashboard">
                 <img  className={classes.w25} src={DocumentCollected} alt="Document Collected" />
               </Fab>

                 </Grid>    

                   </Grid>
                 </div>

               </div>
             </Grid>

             <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/others_candidates_salary_breakup_shared") }} >
               <div className={classes.pink}>
                 <p className={classes.grid_title}>Salary Breakup Shared</p>

                 <div className={classes.visitsNumberContainer}>
                   <Grid container item  >
                     <Grid item xs={7} className={classes.M10}>
                       <Typography size="xl" weight="medium" noWrap className={classes.count}>
                         {count.newcounts?.status307_count ? count.newcounts?.status307_count : 0}
                       </Typography>
                     </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                 
                 <Fab className={classes.pinkIcon} aria-label="dashboard">
                 <img className={classes.w25} src={SalaryBreakup}  alt="Salary Breakup Shared" />
               </Fab>

                 </Grid>    

                   </Grid>
                 </div>

               </div>
             </Grid>

             <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/others_candidates_offered") }} >
               <div className={classes.pink}>
                 <p className={classes.grid_title}>Offered</p>

                 <div className={classes.visitsNumberContainer}>
                   <Grid container item  >
                     <Grid item xs={7} className={classes.M10}>
                       <Typography size="xl" weight="medium" noWrap className={classes.count}>
                         {count.newcounts?.status308_count ? count.newcounts?.status308_count : 0}
                       </Typography>
                     </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                 
                 <Fab className={classes.pinkIcon} aria-label="dashboard">
                 <img  className={classes.w25} src={Offered} alt="Offered"  />
               </Fab>

                 </Grid>    

                   </Grid>
                 </div>

               </div>
             </Grid>

             <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/others_candidates_yet_to_join") }} >
           <div className={classes.brown}>
             <p className={classes.grid_title}>Yet to Join</p>
             <div className={classes.visitsNumberContainer}>
               <Grid container item  >
                 <Grid item xs={7} className={classes.M10}>
                   <Typography size="xl" weight="medium" noWrap className={classes.count}>
                     {count.newcounts?.status3081_count ? count.newcounts?.status3081_count : 0}
                   </Typography>
                 </Grid>
                   <Grid item xs={5} className={classes.M10}    >
                 
                 <Fab className={classes.brownIcon} aria-label="dashboard">
                 <img className={classes.w25} src={YetToJoin} alt="Yet to Join" />
               </Fab>

                 </Grid>    

               </Grid>
             </div>
           </div>
           </Grid>

             <Grid item lg={2} xl={2} md={3} sm={4} xs={12} onClick={() => { history.push("/app/others_candidates_joined") }} >
               <div className={classes.green}>
                 <p className={classes.grid_title}>Joined</p>

                 <div className={classes.visitsNumberContainer}>
                   <Grid container item  >
                     <Grid item xs={7} className={classes.M10}>
                       <Typography size="xl" weight="medium" noWrap className={classes.count}>
                         {count.newcounts?.status309_count ? count.newcounts?.status309_count : 0}
                       </Typography>
                     </Grid>
                       <Grid item xs={5} className={classes.M10}    >
                 
                 <Fab className={classes.greenIcon} aria-label="dashboard">
                 <img className={classes.w25} src={Joined} alt="Joined" />
               </Fab>

                 </Grid>    

                   </Grid>
                 </div>

               </div>
             </Grid>

           </>
          }

        </Grid>
 

       

    
      <Backdrop className={classes.backdrop} open={loader}  >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
 