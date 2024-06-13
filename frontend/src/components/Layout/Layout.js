import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";
// styles
import useStyles from "./styles";
import { useTheme } from "@material-ui/styles";

// component
import Header from "../Header";
import Sidebar from "../Sidebar";
import ParsedResume from "../Candidates/ParsedResume";
// pages
import Dashboard from "../../pages/dashboard";
import Clients from "../../pages/clients";
import Projects from "../../pages/projects";
import AdminCandidates from "../../pages/admin/Candidates";
import AssignedCandidates from "../../pages/admin/AssignedCandidates";
import Share from "../../pages/admin/Share";

import CCCandidates from "../../pages/cc/Candidates";
import RecruiterCandidates from "../../pages/recruiter/Candidates";
import Search from "../../pages/recruiter/Search";
import Admin from "../../pages/adminUser";
import Users from "../../pages/users";
import Source from "../../pages/source";
import Ticket from "../../pages/ticket";

import Activity from "../../pages/activity/Activity";
import FreeMessageActivity from "../../pages/activity/FreeMsgActivity";
import CandidateActivity from "../../pages/activity/CandidateActivity";

import AssignRequirements from "../../pages/requirements/AssignRequirements";

import PDF from "../../pages/transaction/components/Pdf"
import Requirements from "../../pages/requirements/Requirements";
import Chat from "../../pages/chat";
import Singlechat from "../../pages/chat/Singlechat";
import Invoice from "../../pages/invoice";
import ResumeSearch from "../../pages/resumeSearch/ResumeSearch"
import Price from "../../pages/price";
import Transaction from "../../pages/transaction";
import Plans from "../../pages/plans";
import Company from "../../pages/company";
import Contact from "../../pages/contact";

import New from "../../pages/admin/dashboard/New";
import STC from "../../pages/admin/dashboard/Stc";
import DocumentColleted from "../../pages/admin/dashboard/DocumentColleted";
import FinalInterviewCompleted from "../../pages/admin/dashboard/FinalInterviewCompleted";
import FinalInterviewScheduled from "../../pages/admin/dashboard/FinalInterviewScheduled";
import InterviewScheduled from "../../pages/admin/dashboard/InterviewScheduled";
import ScheduleInterview from "../../pages/admin/dashboard/ScheduleInterview";
import Joined from "../../pages/admin/dashboard/Joined";
import Offered from "../../pages/admin/dashboard/Offered";
import SalaryBreakup from "../../pages/admin/dashboard/SalaryBreakup";
import YetToJoin from "../../pages/admin/dashboard/YetToJoin";

import CCNew from "../../pages/cc/dashboard/New";
import CCSTC from "../../pages/cc/dashboard/Stc";
import CCDocumentColleted from "../../pages/cc/dashboard/DocumentColleted";
import CCFinalInterviewCompleted from "../../pages/cc/dashboard/FinalInterviewCompleted";
import CCFinalInterviewScheduled from "../../pages/cc/dashboard/FinalInterviewScheduled";
import CCInterviewScheduled from "../../pages/cc/dashboard/InterviewScheduled";
import CCScheduleInterview from "../../pages/cc/dashboard/ScheduleInterview";
import CCJoined from "../../pages/cc/dashboard/Joined";
import CCOffered from "../../pages/cc/dashboard/Offered";
import CCOfferedDeclined from "../../pages/cc/dashboard/OfferedDeclined";
import CCSalaryBreakup from "../../pages/cc/dashboard/SalaryBreakup";
import CCYetToJoin from "../../pages/cc/dashboard/YetToJoin";

import RECNew from "../../pages/recruiter/dashboard/New";
import RECSTC from "../../pages/recruiter/dashboard/Stc";
import RECDocumentColleted from "../../pages/recruiter/dashboard/DocumentColleted";
import RECFinalInterviewScheduled from "../../pages/recruiter/dashboard/FinalInterviewScheduled"
import RECFinalInterviewCompleted from "../../pages/recruiter/dashboard/FinalInterviewCompleted";
import RECScheduleInterview from "../../pages/recruiter/dashboard/ScheduleInterview";
import RECInterviewScheduled from "../../pages/recruiter/dashboard/InterviewScheduled";
import RECJoined from "../../pages/recruiter/dashboard/Joined";
import RECOffered from "../../pages/recruiter/dashboard/Offered";
import RECOfferedDeclined from "../../pages/recruiter/dashboard/OfferedDeclined";
import RECSalaryBreakup from "../../pages/recruiter/dashboard/SalaryBreakup";
import RECYetToJoin from "../../pages/recruiter/dashboard/YetToJoin";

import AllSTC from "../../pages/admin/reports/Stc";
import AllScheduleInterview from "../../pages/admin/reports/ScheduleInterview";
import AllDocumentColleted from "../../pages/admin/reports/DocumentColleted";
import AllFinalInterviewCompleted from "../../pages/admin/reports/FinalInterviewCompleted";
import AllJoined from "../../pages/admin/reports/Joined";
import AllOffered from "../../pages/admin/reports/Offered";
import AllOfferedDeclined from "../../pages/admin/reports/OfferedDeclined";
import AllSalaryBreakup from "../../pages/admin/reports/SalaryBreakup";
import AllInvoiced from "../../pages/admin/reports/Invoiced";
import AllDitched from "../../pages/admin/reports/Ditched";
import AllCreditNotes from "../../pages/admin/reports/CreditNotes";
import AllDrop from "../../pages/admin/reports/Drop";


import othersCandidates from "../../pages/others/Candidates";
import othersRequirements from "../../pages/others/Requirements";
import othersNew from "../../pages/others/dashboard/New";
import othersSTC from "../../pages/others/dashboard/Stc";
import othersDocumentColleted from "../../pages/others/dashboard/DocumentColleted";
import othersFinalInterviewScheduled from "../../pages/others/dashboard/FinalInterviewScheduled";
import othersFinalInterviewCompleted from "../../pages/others/dashboard/FinalInterviewCompleted";
import othersInterviewScheduled from "../../pages/others/dashboard/InterviewScheduled";
import othersScheduleInterview from "../../pages/others/dashboard/ScheduleInterview";
import othersJoined from "../../pages/others/dashboard/Joined";
import othersOffered from "../../pages/others/dashboard/Offered";
import othersOfferedDeclined from "../../pages/others/dashboard/OfferedDeclined";
import othersSalaryBreakup from "../../pages/others/dashboard/SalaryBreakup";
import othersYetToJoin from "../../pages/others/dashboard/YetToJoin";
import { useLayoutState } from "../../context/LayoutContext";

import { jwtDecode } from "jwt-decode";
import red from '@material-ui/core/colors/red';
import CloseIcon from "@material-ui/icons/Close";
import { ToastContainer } from "react-toastify";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
// context

function Layout(props) {
  var classes = useStyles();
  var theme = useTheme();

  var layoutState = useLayoutState();

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const role = decoded.role;
  const companyType = decoded.companyType || "";

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MuiAvatar: {
          root: {
            fontFamily: '"Satoshi"'
          }
        },
        MuiMenuItem: {
          root: {
            fontFamily: '"Satoshi"'
          }
        },
        MUIDataTableToolbar: {
          actions: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          },
          icon: {
            color: "#064be2",
            "& svg": {
              color: "white",
              width: "25px",
              cursor: "pointer",
              height: "25px",
              padding: "5px",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)",
              borderRadius: "100%",
              backgroundColor: "#064be2"
            }
          },

          iconActive: {
            color: "#064be2",
            "& svg": {
              color: "white",
              width: "25px",
              cursor: "pointer",
              height: "25px",
              padding: "5px",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)",
              borderRadius: "100%",
              backgroundColor: "#064be2"
            }
          }
        },
        MUIDataTableBody: {

          emptyTitle: {
            "@media (max-width: 425px)": {
              display: "flex", justifyContent: "flex-end", alignItems: "center"
            },
            "@media (max-width: 959.95px)": {
              marginLeft: "-100px",
            }
          }
        },

        MUIDataTableBodyCell: {

          stackedCommon: {

            "@media (max-width:959.95px)": {
              fontSize: "13px !important",
              "&:nth-last-child(2)": { fontWeight: 700 }, "&:last-child": { lineBreak: "anywhere" }
            },


          },
          responsiveStackedSmallParent: {
            "@media (max-width:425px)": {
              width: "93%"
            },
          }
        },
        MuiTable: {
          root: {
            "& caption": {
              fontFamily: '"Satoshi" !important',
            }
          }
        },
        MuiTab: {
          root: {
            minWidth: "20% !important",
          },
          wrapper: {
            textTransform: "initial !important",
          }
        },
        MuiTabs: {
          scroller: {
            overflowX: "auto !important",
          }
        },
        MuiBadge: {
          badge: {
            height: "30px!important",
            fontFamily: '"Satoshi" !important',
          },
          colorSecondary: {
            backgroundColor: red[500] + "!important",
          },
          anchorOriginTopLeftCircular: {
            top: "14%",
            left: "-21px",
            inlineSize: "max-content"
          }

        },
        MuiTableCell: {
          head: {
            color: "#121224",
            backgroundColor: "#f0f5f9 !important",
            fontSize: "15px !important",
            fontWeight: "bold",
            letterSpacing: "0.02em"
          },
          body: {
            color: "#121224",
            fontFamily: '"Satoshi" !important',
            fontSize: "13.5px !important",
            "&:last-child": {
              whiteSpace: "nowrap",
            },

          },

          root: {
            padding: "14px",
            fontFamily: '"Satoshi" !important',

          },
          paddingCheckbox: {
            "@media (max-width:959.95px)": {
              width: "10px",
            },
          }
        },
        MuiList: {
          padding: {
            paddingBottom: "0px !important"
          }

        },
        MuiListItem: {
          secondaryAction: {
            paddingRight: "45px !important"
          }
        },
        MuiSelect: {
          select: {
            "&:focus": {
              backgroundColor: "none !important"
            }
          }
        },

        MuiTableRow: {

          root: {
            '&:nth-of-type(odd)': {
              backgroundColor: "white",
            },
            '&:nth-of-type(even)': {
              backgroundColor: "#f0f5f9",
            },
          }

        },

        MuiIconButton: {
          root: {
            padding: "9px"
          }
        },

        MuiTypography: {
          subtitle1: {
            fontSize: "1rem",
            fontWeight: "500",
            fontFamily: '"Satoshi" !important',
            "@media (max-width:959.95px)": {
              fontSize: "0.9rem !important",
            },
          },
          subtitle2: {
            fontWeight: "500",
            fontFamily: '"Satoshi" !important',
            textAlign: "center",
            padding: "10px",
            fontSize: "21px",
            "@media (max-width:959.95px)": {
              fontSize: "calc(1.1rem) !important",
            },
          },
          body1: {
            fontFamily: '"Satoshi" !important',
            fontSize: "14px",
            "@media (max-width:959.95px)": {
              fontSize: "13px !important",
            },
          },
          body2: {
            color: "#121224",
            fontFamily: '"Satoshi" !important',
            fontSize: "14px",
            "@media (max-width:959.95px)": {
              fontSize: "13px !important",
            },
          },
          h5: {
            color: "#121224",
            fontFamily: '"Satoshi" !important',
            fontSize: "14px",
            "@media (max-width:959.95px)": {
              fontSize: "calc(1.1rem) !important",
            },
          },
          h6: {
            color: "#121224",
            fontFamily: '"Satoshi" !important',
            fontSize: "14px",
            "@media (max-width:959.95px)": {
              fontSize: "calc(1.1rem) !important",
            },
          },
        },
        MuiPaper: {
          elevation4: {
            boxShadow: "none",
          },
        },

        MuiDialog: {
          paper: {
            margin: "15px !important",
            border: "1px solid #000 !important",
          },
        },


        MuiFab: {
          root: {
            "&:hover": {

              backgroundColor: "064be2 !important"
            }
          }
        },
        MuiButton: {

          root: {
            fontFamily: '"Satoshi !important"', fontSize: "14px", fontWeight: 500, boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3) !important", "@media (max-width:959.95px)": { fontSize: "10px !important", },
            "& $Mui-disabled": {
              color: "rgba(0, 0, 0, 0.26) !important",
              backgroundColor: "rgba(0, 0, 0, 0.26) !important",
            }

          },
          label: {
            fontFamily: '"Satoshi" !important',
            fontSize: "14px",
            "@media (max-width:959.95px)": {
              fontSize: "10px !important",
            },
          },
          containedPrimary: {
            backgroundColor: "#064be2",
            textTransform: "initial !important",
            '&:active': {
              backgroundColor: "#064be2 !important", color: "#fff !important",
            },
            '&:hover': {
              backgroundColor: "#064be2 !important", color: "#fff !important",
            },
            '&:disabled': {
              backgroundColor: "#064be2c7 !important", color: "#fff !important",
            }
          },
          containedSizeSmall: {
            textTransform: "initial !important",
            padding: "4px 10px !important",
            fontWeight: "300 !important",
            height: "fit-content !important",
          },
          containedSecondary: {
            backgroundColor: red[500] + "!important",
            '&:active': {
              backgroundColor: red[500] + "!important",
              color: "#fff !important",
            },
            '&:hover': {
              backgroundColor: red[500] + "!important",
              color: "#fff !important",
            }
          },
        },
        MuiFormLabel: {
          root: {
            fontFamily: '"Satoshi" !important',
            fontSize: "20px",
            "@media (max-width:959.95px)": {
              fontSize: "15px !important",
            },
            color: "rgba(0, 0, 0, 0.87)",
          },
        },
        MuiCheckbox: {
          root: {
            color: "#bcbdbf",
          },
        },
        MuiFormControl: {
          root: {
            width: "100%",
          },
        },
        MuiTooltip: {
          tooltip: {
            fontFamily: '"Satoshi" !important',
          },
          // popper:{
          //   top: "-34px !important",
          //   left: '-45px !important'
          // }
        },
        MuiInputBase: {
          root: {

            width: "100%",
          },
          input: {
            width: "100%",
            border: "none",
            fontSize: "13px",
            display: "block",
            padding: "10px 12px !important",

            borderRadius: "4px",
          },
        },

        MuiAutocomplete: {
          input: {
            width: "100% !important",
          },
        },

        MuiFilledInput: {
          root: {
            width: "100%",
            display: "block",
            padding: "0px 25px 0px 0px !important",
            position: "relative",
            fontSize: "13px",
            marginTop: "24px",

            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "unset !important",
            },
            "&.Mui-focused": {
              backgroundColor: "unset !important",
            },
          },

          underline: {
            "&&&:before": {
              borderBottom: "none",
            },
            "&&:after": {
              borderBottom: "none",
            },
          },
          inputAdornedEnd: {
            border: "1px solid #ced4da",
          },
        },

        MuiOutlined: {
          MuiChip: {
            avatar: {
              margin: "0px",
            },
          },
        },

        MuiCardContent: {
          root: {
            "&:last-child": {
              paddingBottom: "10px !important",
            }

          }
        },
        MuiCardActions: {
          root: {
            marginBottom: "1px !important"
            // padding: "0px",
            // marginBottom: "20px", 
            // "@media (max-width:959.95px)": { 
            //   marginBottom: "1px !important",
            // },
          }
        },



        MuiDrawer: {
          paperAnchorBottom: {
            width: "50%",
            left: "30%",
            bottom: "10%",
          },
          paper: {
            overflowY: "auto",
            overflowX: "hidden",
          }
        },
        MuiDialogTitle: {
          root: {
            padding: "0px 10px !important"
          }
        },

        // MuiChip: {
        //   avatar: {
        //     width: "50px !important",
        //     height: "50px !important",
        //     fontSize: "1.5rem !important",
        //     margin: "0px",
        //   },
        // },
        MuiInputLabel: {
          shrink: {
            width: "max-content",
          },
        },
      },

      MuiFormGroup: {
        row: {
          marginTop: "10px !important",
        },
      },


    });

  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    // var breakpointWidth = theme.breakpoints.values.md
    var breakpointWidth = theme.breakpoints.values.sm
    var isSmallScreen = windowWidth < breakpointWidth
    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }

  return (
    <div className={classes.root}>
      <>
        <MuiThemeProvider theme={getMuiTheme()}>
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: isPermanent && !layoutState.isSidebarOpened,
              [classes.contentShift1]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar}> <Header history={props.history} />
            </div>

            <Switch>

              <AuthRoute path="/app/dashboard" role={role} roles={["SUPERADMIN", "ADMIN", "RECRUITER", "CLIENTCOORDINATOR", "FREELANCER", "SUBVENDOR"]} component={Dashboard} />
              <AuthRoute path="/app/admin" role={role} roles={["SUPERADMIN"]} component={Admin} />
              <AuthRoute path="/app/transaction" role={role} roles={["SUPERADMIN", "ADMIN"]} component={Transaction} /> 
              <AuthRoute path="/app/price" role={role} roles={["SUPERADMIN"]} component={Price} />
              <AuthRoute path="/app/search" role={role} roles={["ADMIN", "RECRUITER", "CLIENTCOORDINATOR", "FREELANCER", "SUBVENDOR"]} component={Search} />
              <AuthRoute path="/app/pdf_view" role={role} roles={["SUPERADMIN"]} component={PDF} />
              <AuthRoute path="/app/company" role={role} roles={["SUPERADMIN"]} component={Company} />
              <AuthRoute path="/app/contact" role={role} roles={["SUPERADMIN"]} component={Contact} />
              <AuthRoute path="/app/ticket" role={role} roles={["SUPERADMIN", "ADMIN"]} component={Ticket} />
              <AuthRoute path="/app/singlechat" role={role} roles={["SUPERADMIN", "ADMIN", "RECRUITER", "CLIENTCOORDINATOR",]} component={Singlechat} />
              <AuthRoute path="/app/assign_requirements" role={role} roles={["ADMIN"]} component={AssignRequirements} />
              <AuthRoute path="/app/assigned_candidates" role={role} roles={["ADMIN"]} component={AssignedCandidates} />
              <AuthRoute path="/app/requirements_Candidate" role={role} roles={["ADMIN"]} component={Share} />
              <AuthRoute path="/app/reports/all_candidates_stc" role={role} roles={["ADMIN"]} component={AllSTC} />
              <AuthRoute path="/app/reports/all_candidates_schedule_interview" role={role} roles={["ADMIN"]} component={AllScheduleInterview} />
              <AuthRoute path="/app/reports/all_candidates_fic" role={role} roles={["ADMIN"]} component={AllFinalInterviewCompleted} />
              <AuthRoute path="/app/reports/all_candidates_document_collected" role={role} roles={["ADMIN"]} component={AllDocumentColleted} />
              <AuthRoute path="/app/reports/all_candidates_salary_breakup_shared" role={role} roles={["ADMIN"]} component={AllSalaryBreakup} />
              <AuthRoute path="/app/reports/all_candidates_offered" role={role} roles={["ADMIN"]} component={AllOffered} />
              <AuthRoute path="/app/reports/all_candidates_joined" role={role} roles={["ADMIN"]} component={AllJoined} />
              <AuthRoute path="/app/reports/all_candidates_ditched" role={role} roles={["ADMIN"]} component={AllDitched} />
              <AuthRoute path="/app/reports/all_candidates_credit_note" role={role} roles={["ADMIN"]} component={AllCreditNotes} />
              <AuthRoute path="/app/reports/all_candidates_Offered_declined" role={role} roles={["ADMIN"]} component={AllOfferedDeclined} />
              <AuthRoute path="/app/reports/all_candidates_drop" role={role} roles={["ADMIN"]} component={AllDrop} />

              <AuthRoute path="/app/users" role={role} roles={["ADMIN"]} component={Users} />
              {/* <AuthRoute path="/app/invoice" role={role} roles={["ADMIN"]} component={Invoice} />  */}
              <AuthRoute path="/app/chat" role={role} roles={["ADMIN"]} component={Chat} />
              <AuthRoute path="/app/settings/source" role={role} roles={["ADMIN", "CLIENTCOORDINATOR"]} component={Source} />
              <AuthRoute path="/app/activity" role={role} roles={["ADMIN"]} component={Activity} />
              <AuthRoute path="/app/settings/free_message_activity" role={role} roles={["ADMIN"]} component={FreeMessageActivity} />
              <AuthRoute path="/app/candidate_activity" role={role} roles={["ADMIN"]} component={CandidateActivity} />
              <AuthRoute path="/app/requirements" role={role} roles={["ADMIN", "CLIENTCOORDINATOR"]} component={Requirements} />
              <AuthRoute path="/app/admin_candidates" role={role} roles={["ADMIN"]} component={AdminCandidates} />
              <AuthRoute path="/app/parsed_resume" role={role} roles={["ADMIN", "RECRUITER", "CLIENTCOORDINATOR", "FREELANCER", "SUBVENDOR"]} component={ParsedResume} />
              <AuthRoute path="/app/plans" role={role} roles={["ADMIN"]} component={Plans} />
              <AuthRoute path="/app/cc_candidates" role={role} roles={["CLIENTCOORDINATOR"]} component={CCCandidates} />
              <AuthRoute path="/app/recruiter_candidates" role={role} roles={["RECRUITER"]} component={RecruiterCandidates} />

              <AuthRoute path="/app/admin_candidates_new" role={role} roles={["ADMIN"]} component={New} />
              <AuthRoute path="/app/admin_candidates_stc" role={role} roles={["ADMIN"]} component={STC} />
              <AuthRoute path="/app/admin_candidates_schedule_interview" role={role} roles={["ADMIN"]} component={ScheduleInterview} />
              <AuthRoute path="/app/admin_candidates_interview_scheduled" role={role} roles={["ADMIN"]} component={InterviewScheduled} />
              <AuthRoute path="/app/admin_candidates_final_interview_scheduled" role={role} roles={["ADMIN"]} component={FinalInterviewScheduled} />
              <AuthRoute path="/app/admin_candidates_fic" role={role} roles={["ADMIN"]} component={FinalInterviewCompleted} />
              <AuthRoute path="/app/admin_candidates_document_collected" role={role} roles={["ADMIN"]} component={DocumentColleted} />
              <AuthRoute path="/app/admin_candidates_salary_breakup_shared" role={role} roles={["ADMIN"]} component={SalaryBreakup} />
              <AuthRoute path="/app/admin_candidates_offered" role={role} roles={["ADMIN"]} component={Offered} />
              <AuthRoute path="/app/admin_candidates_joined" role={role} roles={["ADMIN"]} component={Joined} />
              <AuthRoute path="/app/admin_candidates_yet_to_join" role={role} roles={["ADMIN"]} component={YetToJoin} />

              <AuthRoute path="/app/cc_candidates_new" role={role} roles={["CLIENTCOORDINATOR"]} component={CCNew} />
              <AuthRoute path="/app/cc_candidates_stc" role={role} roles={["CLIENTCOORDINATOR"]} component={CCSTC} />
              <AuthRoute path="/app/cc_candidates_interview_scheduled" role={role} roles={["CLIENTCOORDINATOR"]} component={CCInterviewScheduled} />
              <AuthRoute path="/app/cc_candidates_schedule_interview" role={role} roles={["CLIENTCOORDINATOR"]} component={CCScheduleInterview} />
              <AuthRoute path="/app/cc_candidates_fis" role={role} roles={["CLIENTCOORDINATOR"]} component={CCFinalInterviewScheduled} />
              <AuthRoute path="/app/cc_candidates_fic" role={role} roles={["CLIENTCOORDINATOR"]} component={CCFinalInterviewCompleted} />
              <AuthRoute path="/app/cc_candidates_document_collected" role={role} roles={["CLIENTCOORDINATOR"]} component={CCDocumentColleted} />
              <AuthRoute path="/app/cc_candidates_salary_breakup_shared" role={role} roles={["CLIENTCOORDINATOR"]} component={CCSalaryBreakup} />
              <AuthRoute path="/app/cc_candidates_offered" role={role} roles={["CLIENTCOORDINATOR"]} component={CCOffered} />
              <AuthRoute path="/app/cc_candidates_joined" role={role} roles={["CLIENTCOORDINATOR"]} component={CCJoined} />
              <AuthRoute path="/app/cc_candidates_offer_declined" role={role} roles={["CLIENTCOORDINATOR"]} component={CCOfferedDeclined} />
              <AuthRoute path="/app/cc_candidates_yet_to_join" role={role} roles={["CLIENTCOORDINATOR"]} component={CCYetToJoin} />

              <AuthRoute path="/app/recruiter_candidates_new" role={role} roles={["RECRUITER"]} component={RECNew} />
              <AuthRoute path="/app/recruiter_candidates_stc" role={role} roles={["RECRUITER"]} component={RECSTC} />
              <AuthRoute path="/app/recruiter_candidates_schedule_interview" role={role} roles={["RECRUITER"]} component={RECScheduleInterview} />
              <AuthRoute path="/app/recruiter_candidates_interview_scheduled" role={role} roles={["RECRUITER"]} component={RECInterviewScheduled} />
              <AuthRoute path="/app/recruiter_candidates_fis" role={role} roles={["RECRUITER"]} component={RECFinalInterviewScheduled} />
              <AuthRoute path="/app/recruiter_candidates_fic" role={role} roles={["RECRUITER"]} component={RECFinalInterviewCompleted} />
              <AuthRoute path="/app/recruiter_candidates_document_collected" role={role} roles={["RECRUITER"]} component={RECDocumentColleted} />
              <AuthRoute path="/app/recruiter_candidates_salary_breakup_shared" role={role} roles={["RECRUITER"]} component={RECSalaryBreakup} />
              <AuthRoute path="/app/recruiter_candidates_offered" role={role} roles={["RECRUITER"]} component={RECOffered} />
              <AuthRoute path="/app/recruiter_candidates_joined" role={role} roles={["RECRUITER"]} component={RECJoined} />
              <AuthRoute path="/app/recruiter_candidates_offer_declined" role={role} roles={["RECRUITER"]} component={RECOfferedDeclined} />
              <AuthRoute path="/app/recruiter_candidates_yet_to_join" role={role} roles={["RECRUITER"]} component={RECYetToJoin} />

              <AuthRoute path="/app/others_candidates" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersCandidates} />
              <AuthRoute path="/app/others_requirements" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersRequirements} />
              <AuthRoute path="/app/others_candidates_new" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersNew} />
              <AuthRoute path="/app/others_candidates_stc" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersSTC} />
              <AuthRoute path="/app/others_candidates_schedule_interview" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersScheduleInterview} />
              <AuthRoute path="/app/others_candidates_interview_scheduled" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersInterviewScheduled} />
              <AuthRoute path="/app/others_candidates_fis" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersFinalInterviewScheduled} />
              <AuthRoute path="/app/others_candidates_fic" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersFinalInterviewCompleted} />
              <AuthRoute path="/app/others_candidates_document_collected" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersDocumentColleted} />
              <AuthRoute path="/app/others_candidates_salary_breakup_shared" role={role} roles={["others"]} component={othersSalaryBreakup} />
              <AuthRoute path="/app/others_candidates_offered" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersOffered} />
              <AuthRoute path="/app/others_candidates_joined" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersJoined} />
              <AuthRoute path="/app/others_candidates_offer_declined" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersOfferedDeclined} />
              <AuthRoute path="/app/others_candidates_yet_to_join" role={role} roles={["FREELANCER", "SUBVENDOR"]} component={othersYetToJoin} />
              {renderRoutesBasedOnCompanyType(companyType, role)}
            </Switch>
          </div>
          <ToastContainer
            closeButton={
              <CloseButton className={classes.notificationCloseButton} />
            }
            closeOnClick={false}
            hideProgressBar={true}
          />
        </MuiThemeProvider>
      </>
    </div>
  );
}

export default withRouter(Layout);

function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}
function AuthRoute({ component, role, roles = [], ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) =>
        roles.includes(role) ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: "/login", state: { from: props.location, },
            }}
          />
        )
      }
    />
  );
}

function renderRoutesBasedOnCompanyType(companyType, role) {
  if (companyType === "COMPANY") {
    return (
      <>
        <AuthRoute path="/app/projects" role={role} roles={["ADMIN", "CLIENTCOORDINATOR"]} component={Projects} />
        <AuthRoute path="/app/reports/vendor_onboarded_candidates" role={role} roles={["ADMIN"]} component={AllInvoiced} />
      </>
    );
  }
  else {
    return (
      <>
        <AuthRoute path="/app/clients" role={role} roles={["ADMIN"]} component={Clients} />
        <AuthRoute path="/app/resume_search" role={role} roles={["ADMIN"]} component={ResumeSearch} />
        {/* Reports */}
        <AuthRoute path="/app/reports/all_candidates_invoiced" role={role} roles={["ADMIN"]} component={AllInvoiced} />
      </>
    )
  }
}
