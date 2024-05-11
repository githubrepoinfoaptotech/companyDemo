import React from "react";
import { Grid, Tooltip } from "@material-ui/core";
import arrowIcon from "../../images/arrow-right-solid.svg";
import "./resume-style.css";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import GetAppIcon from "@material-ui/icons/GetApp";

// import {resumeData} from './mock'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Resume = ({ candidateData, downloadResume }) => {
  const classes = useStyles();
  const resumeData = candidateData?.result;

  console.log(resumeData)
  return (
    <div className="body">
      <div className="container">
        <div className="downloadFab">
          <Tooltip
            title="Download Resume"
            placement="bottom"
            aria-label="view"
          >
          <a href={process.env.REACT_APP_URL+downloadResume} style={{textDecoration:'none'}} target="_blank" rel="noreferrer">
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              className={classes.margin}
            >
              <GetAppIcon />
            </Fab>
          </a>
          </Tooltip>
        </div>
        <div className="header">
          <div className="full-name">
            <span className="first-name">{resumeData?.Name}</span>
            {/* <span className="last-name">Doe</span> */}
          </div>
          <div className="contact-info-container">
            <div className="contact-info">
              <span className="email">Email: </span>
              {resumeData.Mail_ID !== null ? (
                <span className="email-val">{resumeData.Mail_ID}</span>
              ) : (
                <span className="email-val"></span>
              )}
              <span className="separator"></span>
              <span className="phone">Phone: </span>
              {resumeData.Phone_Number !== null ? (
                <span className="phone-val">{resumeData.Phone_Number}</span>
              ) : (
                <span className="phone-val"></span>
              )}
            </div>
            <div className="contact-info address-info">
              <span className="phone address" style={{ width: "150px" }}>
                Date of Birth:
              </span>
              {resumeData.Date_of_Birth !== null ? (
                <span className="address-val">
                  {resumeData.Date_of_Birth}
                </span>
              ) : (
                <span className="address-val"></span>
              )}
            </div>
            <div className="contact-info address-info">
              <span className="phone address" style={{ width: "150px" }}>
                Address:
              </span>
              <span className="address-val">{resumeData?.Address}</span>
            </div>
            <div className="contact-info address-info">
              <span className="phone address" style={{ width: "150px" }}>
                Current Location:
              </span>
              {resumeData.Current_Location !== null ? (
                <span className="address-val">
                  {resumeData.Current_Location}
                </span>
              ) : (
                <span className="address-val"></span>
              )}
            </div>
            <div className="contact-info address-info">
              <span className="phone address" style={{ width: "150px" }}>
                LinkedIn Profile link:
              </span>
              {resumeData.LinkedIn_Profile_link !== null ? (
                <span className="address-val">
                  {resumeData.LinkedIn_Profile_link}
                </span>
              ) : (
                <span className="address-val"></span>
              )}
            </div>
          </div>
          <div className="about">
            <span className="position">Career Objective </span>
            {resumeData.Career_Objective_Profile_Summary !== null &&
            resumeData.Career_Objective_Profile_Summary !== undefined ? (
              <span className="desc">
                {resumeData.Career_Objective_Profile_Summary}
              </span>
            ) : (
              <span className="desc"></span>
            )}
          </div>
        </div>

        <div className="details">
          <div className="section">
            <div className="section__title">Education</div>
            <div className="section__list">
              {resumeData.Education_Qualification !== null && resumeData.Education_Qualification !==  ""  ? (
                <Grid container spacing={2} justifyContent="flex-start">
                  {resumeData.Education_Qualification.map((item, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                      {/* <div className="left" key={index}> */}

                      <div className="name">{item?.degree}</div>
                      <div className="addr">{item?.major}</div>
                      <div className="addr">{item?.university}</div>
                      <div className="duration">
                        {item.year || ""}
                      </div>
                      {/* </div> */}
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <div>No education qualifications provided</div>
              )}
            </div>
          </div>
          <div className="section">
            <div className="section__title">Experience</div>
            <div className="section__list">
              {resumeData.Work_Experience !== null && resumeData.Work_Experience !==  "" ? (
                <Grid container spacing={2} justifyContent="flex-start">
                  {resumeData.Work_Experience.map((item, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                      {/* <div className="left" key={index}> */}

                      <div className="name">{item?.company}</div>
                      <div className="addr">{item?.position}</div>
                      <div className="duration">
                        {item?.duration}
                      </div>
                      {/* </div> */}
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="section">
            <div className="section__title">Projects</div>
            <div className="section__list">
              {resumeData.Projects !== null && resumeData.Projects !==  "" ? (
                <Grid container spacing={2} justifyContent="flex-start">
                  {resumeData.Projects.map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <div className="text" style={{fontWeight: '600',fontSize:'13px',lineHeight: '20px'}}>{item?.name}</div>
                      <div className="text" style={{marginLeft: '20px'}}>{item?.description}</div>
                      <div className="text" style={{marginLeft: '20px'}}>{item?.duration}</div>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="section">
            <div className="section__title">Skills</div>
            <div className="section__list">
              {resumeData.Skills !== null && resumeData.Skills !==  "" ? (
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-start"
                  style={{ marginLeft: "20px" }}
                >
                  {resumeData.Skills.map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <img src={arrowIcon} alt="arrow-ico" />
                        <div className="addr">{item && item}</div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="section">
            <div className="section__title">Achievements</div>
            <div className="section__list">
              {resumeData.Achievements !== null && resumeData.Achievements !==  ""  ? (
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-start"
                  style={{ marginLeft: "20px" }}
                >
                  {resumeData.Achievements.map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div className="addr">{item || ''}</div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="section">
            <div className="section__title">Certifications</div>
            <div className="section__list">
              {resumeData.Certifications !== null && resumeData.Certifications !==  "" ?  (
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-start"
                  style={{ marginLeft: "20px" }}
                >
                  {resumeData.Certifications.map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div className="addr">{item || ''}</div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="section">
            <div className="section__title">Personal Info</div>
            <div className="section__list">
              <div className="contact-info-container">
                <div className="personal-info address-info">
                  <span className="phone address" style={{ width: "170px" }}>
                    Languages Known:
                  </span>
                  {resumeData.Languages_Known !== null && resumeData.Languages_Known !==  "" ? (
                    <div className="language-list">
                      {resumeData.Languages_Known.map((item, index) => (
                        <>
                          <span key={index}>{item || ""},</span>
                        </>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {/* <div className="personal-info address-info">
                  <span className="phone address" style={{ width: "170px" }}>
                    Mother's Name:
                  </span>
                  {resumeData["Mother's Name"] !== null ? (
                    <span className="address-val">
                      {resumeData["Mother's Name"]}
                    </span>
                  ) : (
                    <span className="address-val"></span>
                  )}
                </div> */}
                {/* <div className="personal-info address-info">
                  <span className="phone address" style={{ width: "170px" }}>
                    Gender & Marital Status:
                  </span>
                  {resumeData["Gender & Marital Status"] !== null ? (
                    <span className="address-val">
                      {resumeData["Gender & Marital Status"]}
                    </span>
                  ) : (
                    <span className="address-val"></span>
                  )}
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className="section">
            <div className="section__title">Declaration</div>
            <div className="section__list">
              <div className="addr">{resumeData?.Declaration}</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Resume;
