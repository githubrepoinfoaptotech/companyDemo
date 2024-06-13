import { Drawer, IconButton, List } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import dashboard from "../../images/dashboard.png";
import users from "../../images/user.png";
import clients from "../../images/Clients.png";
import candidates from "../../images/graduated.png";
import invoice from "../../images/invoice.png";
import resumeSearch from '../../images/Resume_search.png'
import hiringSupport from "../../images/HiringSupport.png";
import regCompanies from "../../images/regCompanies.png";
import report from "../../images/Report.png";
import setting from "../../images/setting.png";
import price from "../../images/pricing.png";
import requirement from "../../images/requirement.png";
import whatsapp from "../../images/whatsapp.png";
import companies from "../../images/companies.png";
import priceList from "../../images/pricelist.png";
import search from "../../images/search.png";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import AssignReq from "../../images/AssignReq.png";

import useStyles from "./styles";
import SidebarLink from "./components/SidebarLink/SidebarLink";

import {
  toggleSidebar,
  useLayoutDispatch,
  useLayoutState,
} from "../../context/LayoutContext";

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const companyType = decode.companyType
  const role = decode.role;

  const superAdmin = [
    {
      id: 0,
      label: "Dashboard",
      link: "/app/dashboard",
      view: true,
      icon: (
        <Tooltip title="Dashboard" placement="right">
          <IconButton>
            <img
              src={dashboard}
              alt="dashboard"
              className={classNames(classes.Icon1)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 1,
      label: "Registered Companies",
      link: "/app/company",
      view: true,
      icon: (
        <Tooltip title="Registered Companies" placement="right">
          <IconButton>
            <img
              src={regCompanies}
              alt="transaction"
              className={classNames(classes.Icon3)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 2,
      label: "Companies",
      link: "/app/admin",
      view: true,
      icon: (
        <Tooltip title="Companies" placement="right">
          <IconButton>
            <img
              src={companies}
              alt="companies"
              className={classNames(classes.Icon2)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 3,
      label: "Plans",
      link: "/app/price",
      view: true,
      icon: (
        <Tooltip title="Plans" placement="right">
          <IconButton>
            <img
              src={priceList}
              alt="price"
              className={classNames(classes.Icon3)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 4,
      label: "Transaction History",
      link: "/app/transaction",
      view: true,
      icon: (
        <Tooltip title="Transaction History" placement="right">
          <IconButton>
            <img
              src={invoice}
              alt="invoice"
              className={classNames(classes.Icon4)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 5,
      label: "Contact Sales",
      link: "/app/contact",
      view: true,
      icon: (
        <Tooltip title="Contact Sales" placement="right">
          <IconButton>
            <img
              src={hiringSupport}
              alt="transaction"
              className={classNames(classes.Icon5)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  var admin = [
    {
      id: 0,
      label: "Live Status",
      link: "/app/dashboard",
      view: true,
      icon: (
        <Tooltip title="Live Status" placement="right">
          <IconButton>
            <img
              src={dashboard}
              alt="dashboard"
              className={classNames(classes.Icon1)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 1,
      label: "Users",
      link: "/app/users",
      view: true,
      icon: (
        <Tooltip title="Users" placement="right">
          <IconButton>
            <img
              src={candidates}
              alt="users"
              className={classNames(classes.Icon1)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 2,
      label: companyType === "COMPANY"? "Projects" :"Clients",
      link: companyType === "COMPANY"? "/app/projects" :"/app/clients",
      view: true,
      icon: (
        <Tooltip title={companyType === "COMPANY"? "Projects" :"Clients"} placement="right">
          <IconButton>
            <img
              src={clients}
              alt={companyType === "COMPANY"? "Projects" :"Clients"}
              className={classNames(classes.Icon1)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 3,
      label: "Requirements",
      link: "/app/requirements",
      view: true,
      icon: (
        <Tooltip title="Requirements" placement="right">
          <IconButton>
            <img
              src={requirement}
              alt="requirement"
              className={classNames(classes.Icon2)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 4,
      label: "Assign Requirements Candidates",
      link: "/app/assign_requirements",
      view: true,
      icon: (
        <Tooltip title="Assigned Requirements" placement="right">
          <IconButton>
            <img
              src={AssignReq}
              alt="requirement"
              className={classNames(classes.Icon2)}
            />
          </IconButton>
        </Tooltip>
      ),
    },

    {
      id: 5,
      label: "Candidates",
      link: "/app/admin_candidates",
      view: true,
      icon: (
        <Tooltip title="Candidates" placement="right">
          <IconButton>
            <img
              src={users}
              alt="candidates"
              className={classNames(classes.Icon3)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 6,
      label: "Search Candidates",
      link: "/app/search",
      view: true,
      icon: (
        <Tooltip title="Search Candidates" placement="right">
          <IconButton>
            <img
              src={search}
              alt="search candidates"
              className={classNames(classes.Icon4)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    // {
    //   id: 7,
    //   label: "Invoiced Candidates",
    //   link: "/app/invoice",
    //   view: true,
    //   icon: (
    //     <Tooltip title="Invoiced Candidates" placement="right">
    //       <IconButton>
    //         <img
    //           src={invoice}
    //           alt="invoice"
    //           className={classNames(classes.Icon1)}
    //         />
    //       </IconButton>
    //     </Tooltip>
    //   ),
    // },
    // {
    //   id: 7,
    //   label: "Resume Parsing",
    //   link: "/app/resume_search",
    //   view: true,
    //   icon: (
    //     <Tooltip title="Resume Parsing" placement="right">
    //       <IconButton>
    //         <img
    //           src={resumeSearch}
    //           alt="resume_search"
    //           className={classNames(classes.Icon1)}
    //         />
    //       </IconButton>
    //     </Tooltip>
    //   ),
    // },
    {
      id: 8,
      label: "Chat",
      link: "/app/chat",
      view: decode.isEnablePaid === true ? true : false,
      icon: (
        <Tooltip title="Chat" placement="right">
          <IconButton>
            <img
              src={whatsapp}
              alt="whatsapp"
              className={classNames(classes.Icon4)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 9,
      label: "Reports",
      type: "reports",
      link: "/app/reports",
      view: true,
      icon: (
        <Tooltip title="Reports" placement="right">
          <IconButton>
            <img
              src={report}
              alt="report"
              className={classNames(classes.Icon1)}
            />
          </IconButton>
        </Tooltip>
      ),
      subMenu: [
        {
          id: 0,
          label: companyType === "COMPANY" ? "Submitted to Hiring Manager" : "Submitted to Client",
          link: "/app/reports/all_candidates_stc",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
        {
          id: 1,
          label: "Final Interview Completed",
          link: "/app/reports/all_candidates_fic",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
        {
          id: 2,
          label: "Document Collected",
          link: "/app/reports/all_candidates_document_collected",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
        {
          id: 3,
          label: "Salary Breakup Shared",
          link: "/app/reports/all_candidates_salary_breakup_shared",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
        {
          id: 4,
          label: "Offered",
          link: "/app/reports/all_candidates_offered",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
        {
          id: 5,
          label: "Offer Declined",
          link: "/app/reports/all_candidates_Offered_declined",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
        {
          id: 6,
          label: "Joined",
          link: "/app/reports/all_candidates_joined",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
        {
          id: 7,
          label: "Not Joined",
          link: "/app/reports/all_candidates_ditched",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
        {
          id: 8,
          label: companyType === "COMPANY" ? "Vendor On-boarded Candidates" :"Invoiced Candidates",
          link: companyType === "COMPANY" ? "/app/reports/vendor_onboarded_candidates" : "/app/reports/all_candidates_invoiced" ,
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
        {
          id: 9,
          label: "Credit Note",
          link: "/app/reports/all_candidates_credit_note",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
        {
          id: 10,
          label: "Dropped",
          link: "/app/reports/all_candidates_drop",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
      ],
    },
    {
      id: 10,
      label: "Sources",
      type: "settings",
      link: "/app/settings",
      view: true,
      icon: (
        <Tooltip title="Settings" placement="right">
          <IconButton>
            <img
              src={setting}
              alt="setting"
              className={classNames(classes.Icon1)}
            />
          </IconButton>
        </Tooltip>
      ),
      subMenu: [
        {
          id: 0,
          label: "Source of Profile",
          link: "/app/settings/source",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
        {
          id: 0,
          label: "Free Message Activity",
          link: "/app/settings/free_message_activity",
          icon: (
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
          ),
        },
      ],
    },
    {
      id: 11,
      label: "Refo Billing",
      link: "/app/plans",
      view: true,
      icon: (
        <Tooltip title="Billing" placement="right">
          <IconButton>
            <img
              src={price}
              alt="price"
              className={classNames(classes.Icon1)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const cc = [
    {
      id: 0,
      label: "Live Status",
      link: "/app/dashboard",
      view: true,
      icon: (
        <Tooltip title="Live Status" placement="right">
          <IconButton>
            <img
              src={dashboard}
              alt="dashboard"
              className={classNames(classes.Icon1)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 2,
      label: companyType === "COMPANY"&&"Projects",
      link: companyType === "COMPANY"&& "/app/projects",
      view: true,
      icon: (
        <Tooltip title={companyType === "COMPANY"&& "Projects"} placement="right">
          <IconButton>
            <img
              src={clients}
              alt={companyType === "COMPANY"&& "Projects"}
              className={classNames(classes.Icon1)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 1,
      label: "Requirements",
      link: "/app/requirements",
      view: true,
      icon: (
        <Tooltip title="Requirements" placement="right">
          <IconButton>
            <img
              src={requirement}
              alt="requirement"
              className={classNames(classes.Icon2)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 2,
      label: "Candidates",
      link: "/app/cc_candidates",
      view: true,
      icon: (
        <Tooltip title="Candidates" placement="right">
          <IconButton>
            <img
              src={users}
              alt="candidates"
              className={classNames(classes.Icon3)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 3,
      label: "Search Candidates",
      link: "/app/search",
      view: true,
      icon: (
        <Tooltip title="Search Candidates" placement="right">
          <IconButton>
            <img
              src={search}
              alt="candidates"
              className={classNames(classes.Icon4)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const recruiter = [
    {
      id: 0,
      label: "Live Status",
      link: "/app/dashboard",
      view: true,
      icon: (
        <Tooltip title="Live Status" placement="right">
          <IconButton>
            <img
              src={dashboard}
              alt="dashboard"
              className={classNames(classes.Icon1)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 1,
      label: "Candidates",
      link: "/app/recruiter_candidates",
      view: true,
      icon: (
        <Tooltip title="Candidates" placement="right">
          <IconButton>
            <img
              src={users}
              alt="candidates"
              className={classNames(classes.Icon3)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 2,
      label: "Search Candidates",
      link: "/app/search",
      view: true,
      icon: (
        <Tooltip title="Search Candidates" placement="right">
          <IconButton>
            <img
              src={search}
              alt="candidates"
              className={classNames(classes.Icon4)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const others = [
    {
      id: 0,
      label: "Live Status",
      link: "/app/dashboard",
      view: true,
      icon: (
        <Tooltip title="Live Status" placement="right">
          <IconButton>
            <img
              src={dashboard}
              alt="dashboard"
              className={classNames(classes.Icon1)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 1,
      label: "Requirements",
      link: "/app/others_requirements",
      view: true,
      icon: (
        <Tooltip title="Requirements" placement="right">
          <IconButton>
            <img
              src={requirement}
              alt="requirement"
              className={classNames(classes.Icon2)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 2,
      label: "Candidates",
      link: "/app/others_candidates",
      view: true,
      icon: (
        <Tooltip title="Candidates" placement="right">
          <IconButton>
            <img
              src={users}
              alt="candidates"
              className={classNames(classes.Icon3)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: 3,
      label: "Search Candidates",
      link: "/app/search",
      view: true,
      icon: (
        <Tooltip title="Search Candidates" placement="right">
          <IconButton>
            <img
              src={search}
              alt="candidates"
              className={classNames(classes.Icon4)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const chat = [
    {
      id: 0,
      label: "Chat",
      link: "/app/singlechat",
      view: true,
      icon: (
        <Tooltip title="Chat" placement="right">
          <IconButton>
            <img
              src={whatsapp}
              alt="whatsapp"
              className={classNames(classes.Icon4)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const share = [
    {
      id: 0,
      label: "Candidates",
      type: "title",
      link: "#",
      view: true,
      icon: (
        <Tooltip title="Candidates" placement="right">
          <IconButton>
            <img
              src={candidates}
              alt="candidates"
              className={classNames(classes.Icon3)}
            />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
      onClose={() => toggleSidebar(layoutDispatch)}
    >
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        <>
          {location.pathname !== "/app/singlechat" &&
          location.pathname !== "/shortList" ? (
            <>
              {role === "SUPERADMIN"
                ? superAdmin.map((link) => (
                    <SidebarLink
                      key={link.id}
                      location={location}
                      isSidebarOpened={isSidebarOpened}
                      {...link}
                    />
                  ))
                : role === "ADMIN"
                ? admin
                  .filter((link) => companyType !== "COMPANY" || link.label !== "Refo Billing" && link.label !== "Assign Requirements Candidates")
                  .map((link) => (
                    <SidebarLink
                      key={link.id}
                      location={location}
                      isSidebarOpened={isSidebarOpened}
                      {...link}
                    />
                  ))

                : role === "RECRUITER"
                ? recruiter.map((link) => (
                    <SidebarLink
                      key={link.id}
                      location={location}
                      isSidebarOpened={isSidebarOpened}
                      {...link}
                    />
                  ))
                : role === "CLIENTCOORDINATOR"
                ? cc.map((link) => (
                    <SidebarLink
                      key={link.id}
                      location={location}
                      isSidebarOpened={isSidebarOpened}
                      {...link}
                    />
                  ))
                : others.map((link) => (
                    <SidebarLink
                      key={link.id}
                      location={location}
                      isSidebarOpened={isSidebarOpened}
                      {...link}
                    />
                  ))}
            </>
          ) : location.pathname === "/shortList" ? (
            share.map((link) => (
              <SidebarLink
                key={link.id}
                location={location}
                isSidebarOpened={isSidebarOpened}
                {...link}
              />
            ))
          ) : (
            chat.map((link) => (
              <SidebarLink
                key={link.id}
                location={location}
                isSidebarOpened={isSidebarOpened}
                {...link}
              />
            ))
          )}
        </>
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    // var breakpointWidth = theme.breakpoints.values.md
    var breakpointWidth = theme.breakpoints.values.sm;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
