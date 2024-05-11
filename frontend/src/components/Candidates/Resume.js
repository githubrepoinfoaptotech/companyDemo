import React from "react";
import { Grid, Tooltip } from "@material-ui/core";
import arrowIcon from "../../images/arrow-right-solid.svg";
import "../../resume-style.css";
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

const Resume = ({ candidateData }) => {
  const classes = useStyles();
//   const resumeData = candidateData?.data;
  const resumeData = candidateData;

  return (
    <div className="body">
      <div className="container">
        <div className="downloadFab">
          <Tooltip
            title="Download Resume"
            placement="bottom"
            aria-label="view"
          >
          <a href={process.env.REACT_APP_URL+''} style={{textDecoration:'none'}} target="_blank" rel="noreferrer">
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
            <span className="first-name">{resumeData?.name}</span>
            {/* <span className="last-name">Doe</span> */}
          </div>
          <div className="contact-info-container">
            <div className="contact-info">
              <span className="email">Email: </span>
              {resumeData.mail !== null ? (
                <span className="email-val">{resumeData.mail}</span>
              ) : (
                <span className="email-val"></span>
              )}
              <span className="separator"></span>
              <span className="phone">Phone: </span>
              {resumeData.mobile !== null ? (
                <span className="phone-val">{resumeData.mobile}</span>
              ) : (
                <span className="phone-val"></span>
              )}
            </div>
            <div className="contact-info address-info">
              <span className="phone address" style={{ width: "150px" }}>
                Date of Birth:
              </span>
              {resumeData.date_of_birth !== null ? (
                <span className="address-val">
                  {resumeData.date_of_birth}
                </span>
              ) : (
                <span className="address-val"></span>
              )}
            </div>
            <div className="contact-info address-info">
              <span className="phone address" style={{ width: "150px" }}>
                Address:
              </span>
              <span className="address-val">{resumeData?.address}</span>
            </div>
            <div className="contact-info address-info">
              <span className="phone address" style={{ width: "150px" }}>
                Current Location:
              </span>
              {resumeData.current_location !== null ? (
                <span className="address-val">
                  {resumeData.current_location}
                </span>
              ) : (
                <span className="address-val"></span>
              )}
            </div>
            <div className="contact-info address-info">
              <span className="phone address" style={{ width: "150px" }}>
                LinkedIn Profile link:
              </span>
              {resumeData.linkedIn_profile_link !== null ? (
                <span className="address-val">
                  {resumeData.linkedIn_profile_link}
                </span>
              ) : (
                <span className="address-val"></span>
              )}
            </div>
          </div>
          <div className="about">
            <span className="position">Career Objective </span>
            {resumeData.career_objective_profile_summary !== null &&
            resumeData.career_objective_profile_summary !== undefined ? (
              <span className="desc">
                {resumeData.career_objective_profile_summary}
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
              {resumeData.education_qualification !== null && resumeData.education_qualification !==  ""  ? (
                <Grid container spacing={2} justifyContent="flex-start">
                  {resumeData.education_qualification.map((item, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                      {/* <div className="left" key={index}> */}

                      <div className="name">{item?.Degree}</div>
                      <div className="addr">{item?.Major}</div>
                      <div className="addr">{item?.University}</div>
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
              {resumeData.work_experience !== null && resumeData.work_experience !==  "" ? (
                <Grid container spacing={2} justifyContent="flex-start">
                  {resumeData.work_experience.map((item, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                      {/* <div className="left" key={index}> */}

                      <div className="name">{item?.Company}</div>
                      <div className="addr">{item?.Position}</div>
                      <div className="duration">
                        {item?.Duration}
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
              {resumeData.projects !== null && resumeData.projects !==  "" ? (
                <Grid container spacing={2} justifyContent="flex-start">
                  {resumeData.projects.map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <div className="text" style={{fontWeight: '600',fontSize:'13px',lineHeight: '20px'}}>{item?.Name}</div>
                      <div className="text" style={{marginLeft: '20px'}}>{item?.Description}</div>
                      <div className="text" style={{marginLeft: '20px'}}>{item?.Duration}</div>
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
              {resumeData.skills !== null && resumeData.skills !==  "" ? (
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-start"
                  style={{ marginLeft: "20px" }}
                >
                  {resumeData.skills.map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <img src={arrowIcon} alt="arrow-ico" />
                        <div className="addr">{item || ""}</div>
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
              {resumeData.achievements !== null && resumeData.achievements !==  ""  ? (
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-start"
                  style={{ marginLeft: "20px" }}
                >
                  {resumeData.achievements.map((item, index) => (
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
              {resumeData.certifications !== null && resumeData.certifications !==  "" ?  (
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-start"
                  style={{ marginLeft: "20px" }}
                >
                  {resumeData.certifications.map((item, index) => (
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
                  {resumeData.languages_known !== null && resumeData.languages_known !==  "" ? (
                    <div className="language-list">
                      {resumeData.languages_known.map((item, index) => (
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
