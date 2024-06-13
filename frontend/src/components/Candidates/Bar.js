import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import LanguageIcon from "@material-ui/icons/Language";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useStyles from "../../themes/style.js";

export default function Bar(props) {
  var classes = useStyles();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const [New, setNew] = React.useState(null);
  const [STC, setSTC] = React.useState(null);
  const [Scheduled, setScheduled] = React.useState(null);
  const [FIC, setFIC] = React.useState(null);
  const [Document, setDocument] = React.useState(null);
  const [Salary, setSalary] = React.useState(null);
  const [Offered, setOffered] = React.useState(null);
  const [Joined, setJoined] = React.useState(null);
  const [Invoice, setInvoice] = React.useState(null);
  const [Credit, setCredit] = React.useState(null);
  const [source, setSource] = React.useState(null);
  const [ditch, setDitch] = React.useState(null);
  const [declined, setDeclined] = React.useState(null);

  const handleNewOpen = (event) => {
    setNew(event.currentTarget);
  };

  const handleNewClose = () => {
    setNew(null);
  };

  const handleSTCOpen = (event) => {
    setSTC(event.currentTarget);
  };

  const handleSTCClose = () => {
    setSTC(null);
  };

  const handleScheduledOpen = (event) => {
    setScheduled(event.currentTarget);
  };

  const handleScheduledClose = () => {
    setScheduled(null);
  };

  const handleFICOpen = (event) => {
    setFIC(event.currentTarget);
  };

  const handleFICClose = () => {
    setFIC(null);
  };

  const handleDocumentOpen = (event) => {
    setDocument(event.currentTarget);
  };

  const handleDocumentClose = () => {
    setDocument(null);
  };

  const handleSalaryOpen = (event) => {
    setSalary(event.currentTarget);
  };

  const handleSalaryClose = () => {
    setSalary(null);
  };

  const handleOfferedOpen = (event) => {
    setOffered(event.currentTarget);
  };

  const handleOfferedClose = () => {
    setOffered(null);
  };

  const handleJoinedOpen = (event) => {
    setJoined(event.currentTarget);
  };

  const handleJoinedClose = () => {
    setJoined(null);
  };

  const handleInvoiceOpen = (event) => {
    setInvoice(event.currentTarget);
  };

  const handleInvoiceClose = () => {
    setInvoice(null);
  };

  const handleCreditOpen = (event) => {
    setCredit(event.currentTarget);
  };

  const handleCreditClose = () => {
    setCredit(null);
  };

  const handleSourceOpen = (event) => {
    setSource(event.currentTarget);
  };

  const handleSourceClose = () => {
    setSource(null);
  };

  const handleDitchOpen = (event) => {
    setDitch(event.currentTarget);
  };

  const handleDitchClose = () => {
    setDitch(null);
  };

  const handleDeclinedOpen = (event) => {
    setDeclined(event.currentTarget);
  };

  const handleDeclinedClose = () => {
    setDeclined(null);
  };

  const newopen = Boolean(New);
  const stcopen = Boolean(STC);
  const scheduledopen = Boolean(Scheduled);
  const ficopen = Boolean(FIC);
  const documentopen = Boolean(Document);
  const salaryopen = Boolean(Salary);
  const offeredopen = Boolean(Offered);
  const joinedopen = Boolean(Joined);
  const invoicedopen = Boolean(Invoice);
  const creditopen = Boolean(Credit);
  const sourceopen = Boolean(source);
  const declinedopen = Boolean(declined);
  const ditchopen = Boolean(ditch);

  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table style={{ minWidth: "100%" }} aria-label="Progress-Bar">
            <TableHead>
              <TableRow className={classes.wrapperHeader}>
                <TableCell>
                  {props.list.candidateDetail?.firstName +
                    " " +
                    props.list.candidateDetail?.lastName}
                  - Progress Bar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.wrapperHeader}>
              <TableCell>
                <div className={classes.outerCover}>
                  <div className={classes.barWrapper}>
                    <div className={classes.barItem + " " + classes.completed}>
                      <div
                        className={classes.barCounter + " " + classes.source}
                      >
                        <LanguageIcon
                          onMouseEnter={(e) =>
                            props.list.statusCode ? handleSourceOpen(e) : ""
                          }
                          onMouseLeave={(e) =>
                            props.list.statusCode ? handleSourceClose(e) : ""
                          }
                        />
                      </div>
                      <div className={classes.barName}>
                        {props.list.source?.name}
                        <Popover
                          className={classes.BarPointer}
                          open={sourceopen}
                          anchorEl={source}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          onClose={handleSourceClose}
                        >
                          <Typography sx={{ p: 1 }} className={classes.BarGap}>
                            Source
                          </Typography>
                        </Popover>
                      </div>
                    </div>

                    <div
                      className={
                        props.list.statusCode
                          ? classes.barItem + " " + classes.completed
                          : classes.barItem
                      }
                      aria-owns={newopen ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      onMouseEnter={(e) =>
                        props.list.statusCode ? handleNewOpen(e) : ""
                      }
                      onMouseLeave={(e) =>
                        props.list.statusCode ? handleNewClose(e) : ""
                      }
                    >
                      <div className={classes.barCounter}>
                        {props.list.statusCode ? (
                          <CheckIcon className={classes.BarColor} />
                        ) : (
                          1
                        )}
                      </div>
                      <div className={classes.barName}>
                        Pending <br /> Validation
                        <Popover
                          className={classes.BarPointer}
                          open={newopen}
                          anchorEl={New}
                          onClose={handleNewClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                        >
                          <Typography sx={{ p: 1 }} className={classes.BarGap}>
                            {moment(props.list?.createdAt).format("DD-MM-YYYY")}
                          </Typography>
                        </Popover>
                      </div>
                    </div>
                    <div
                      className={
                        props.list.myCandidateStatuses?.length
                          ? props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 303,
                          )[0]?.statusCode === 303
                            ? classes.barItem + " " + classes.completed
                            : props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 302,
                            )[0]?.statusCode === 302
                              ? classes.barItem + " " + classes.cancel
                              : classes.barItem
                          : classes.barItem
                      }
                    >
                      <div
                        className={classes.barCounter}
                        aria-owns={stcopen ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 303,
                            )[0]?.statusCode === 303
                              ? handleSTCOpen(e)
                              : ""
                            : ""
                        }
                        onMouseLeave={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 303,
                            )[0]?.statusCode === 303
                              ? handleSTCClose(e)
                              : ""
                            : ""
                        }
                      >
                        {props.list.myCandidateStatuses?.length ? (
                          props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 303,
                          )[0]?.statusCode === 303 ? (
                            <CheckIcon className={classes.BarColor} />
                          ) : props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 302,
                          )[0]?.statusCode === 302 ? (
                            <CloseIcon className={classes.BarColor} />
                          ) : (
                            "2"
                          )
                        ) : (
                          "2"
                        )}
                      </div>
                      <div className={classes.barName}>
                        Submitted to <br /> {decode.companyType === "COMPANY" ? "Hiring Manager" : "Client"}
                        <Popover
                          className={classes.BarPointer}
                          open={stcopen}
                          anchorEl={STC}
                          onClose={handleNewClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                        >
                          <Typography sx={{ p: 1 }} className={classes.BarGap}>
                            {props.list.myCandidateStatuses?.length
                              ? props.list.myCandidateStatuses
                                .filter((item) => item.statusCode === 303)
                                .map((value) =>
                                  moment(value.createdAt).format(
                                    "DD-MM-YYYY",
                                  ),
                                )
                              : ""}
                          </Typography>
                        </Popover>
                      </div>
                    </div>
                    <div
                      className={
                        props.list.myCandidateStatuses?.length
                          ? props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 304,
                          )[0]?.statusCode === 304
                            ? classes.barItem + " " + classes.completed
                            : props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 302,
                            )[0]?.statusCode === 302
                              ? classes.barItem + " " + classes.cancel
                              : classes.barItem
                          : classes.barItem
                      }
                    >
                      <div
                        className={classes.barCounter}
                        aria-owns={
                          scheduledopen ? "mouse-over-popover" : undefined
                        }
                        aria-haspopup="true"
                        onMouseEnter={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 304,
                            )[0]?.statusCode === 304
                              ? handleScheduledOpen(e)
                              : ""
                            : ""
                        }
                        onMouseLeave={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 304,
                            )[0]?.statusCode === 304
                              ? handleScheduledClose(e)
                              : ""
                            : ""
                        }
                      >
                        {props.list.myCandidateStatuses?.length ? (
                          props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 304,
                          )[0]?.statusCode === 304 ? (
                            <CheckIcon className={classes.BarColor} />
                          ) : props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 302,
                          )[0]?.statusCode === 302 ? (
                            <CloseIcon className={classes.BarColor} />
                          ) : (
                            "3"
                          )
                        ) : (
                          "3"
                        )}
                      </div>
                      <div className={classes.barName}>
                        Interview <br /> Scheduled
                        <Popover
                          className={classes.BarPointer}
                          open={scheduledopen}
                          anchorEl={Scheduled}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          onClose={handleScheduledClose}
                        >
                          <Typography sx={{ p: 1 }} className={classes.BarGap}>
                            {props.list.myCandidateStatuses?.length
                              ? props.list.myCandidateStatuses
                                .filter((item) => item.statusCode === 304)
                                .map((value) =>
                                  moment(value.createdAt).format(
                                    "DD-MM-YYYY",
                                  ),
                                )
                              : ""}
                          </Typography>
                        </Popover>
                      </div>
                    </div>
                    <div
                      className={
                        props.list.myCandidateStatuses?.length
                          ? props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 305,
                          )[0]?.statusCode === 305
                            ? classes.barItem + " " + classes.completed
                            : props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 302,
                            )[0]?.statusCode === 302
                              ? classes.barItem + " " + classes.cancel
                              : classes.barItem
                          : classes.barItem
                      }
                    >
                      <div
                        className={classes.barCounter}
                        aria-owns={ficopen ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 305,
                            )[0]?.statusCode === 305
                              ? handleFICOpen(e)
                              : ""
                            : ""
                        }
                        onMouseLeave={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 305,
                            )[0]?.statusCode === 305
                              ? handleFICClose(e)
                              : ""
                            : ""
                        }
                      >
                        {props.list.myCandidateStatuses?.length ? (
                          props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 305,
                          )[0]?.statusCode === 305 ? (
                            <CheckIcon className={classes.BarColor} />
                          ) : props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 302,
                          )[0]?.statusCode === 302 ? (
                            <CloseIcon className={classes.BarColor} />
                          ) : (
                            "4"
                          )
                        ) : (
                          "4"
                        )}
                      </div>
                      <div className={classes.barName}>
                        Final <br />
                        Interview <br />
                        Completed
                        <Popover
                          className={classes.BarPointer}
                          open={ficopen}
                          anchorEl={FIC}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          onClose={handleFICClose}
                        >
                          <Typography sx={{ p: 1 }} className={classes.BarGap}>
                            {props.list.myCandidateStatuses?.length
                              ? props.list.myCandidateStatuses
                                .filter((item) => item.statusCode === 305)
                                .map((value) =>
                                  moment(value.createdAt).format(
                                    "DD-MM-YYYY",
                                  ),
                                )
                              : ""}
                          </Typography>
                        </Popover>
                      </div>
                    </div>

                    <div
                      className={
                        props.list.myCandidateStatuses?.length
                          ? props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 306,
                          )[0]?.statusCode === 306
                            ? classes.barItem + " " + classes.completed
                            : props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 302,
                            )[0]?.statusCode === 302
                              ? classes.barItem + " " + classes.cancel
                              : classes.barItem
                          : classes.barItem
                      }
                    >
                      <div
                        className={classes.barCounter}
                        aria-owns={
                          documentopen ? "mouse-over-popover" : undefined
                        }
                        aria-haspopup="true"
                        onMouseEnter={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 306,
                            )[0]?.statusCode === 306
                              ? handleDocumentOpen(e)
                              : ""
                            : ""
                        }
                        onMouseLeave={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 306,
                            )[0]?.statusCode === 306
                              ? handleDocumentClose(e)
                              : ""
                            : ""
                        }
                      >
                        {props.list.myCandidateStatuses?.length ? (
                          props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 306,
                          )[0]?.statusCode === 306 ? (
                            <CheckIcon className={classes.BarColor} />
                          ) : props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 302,
                          )[0]?.statusCode === 302 ? (
                            <CloseIcon className={classes.BarColor} />
                          ) : (
                            "5"
                          )
                        ) : (
                          "5"
                        )}
                      </div>
                      <div className={classes.barName}>
                        Document <br />
                        Collected
                        <Popover
                          className={classes.BarPointer}
                          open={documentopen}
                          anchorEl={Document}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          onClose={handleDocumentClose}
                        >
                          <Typography sx={{ p: 1 }} className={classes.BarGap}>
                            {props.list.myCandidateStatuses?.length
                              ? props.list.myCandidateStatuses
                                .filter((item) => item.statusCode === 306)
                                .map((value) =>
                                  moment(value.createdAt).format(
                                    "DD-MM-YYYY",
                                  ),
                                )
                              : ""}
                          </Typography>
                        </Popover>
                      </div>
                    </div>

                    <div
                      className={
                        props.list.myCandidateStatuses?.length
                          ? props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 307,
                          )[0]?.statusCode === 307
                            ? classes.barItem + " " + classes.completed
                            : props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 302,
                            )[0]?.statusCode === 302
                              ? classes.barItem + " " + classes.cancel
                              : classes.barItem
                          : classes.barItem
                      }
                    >
                      <div
                        className={classes.barCounter}
                        aria-owns={
                          salaryopen ? "mouse-over-popover" : undefined
                        }
                        aria-haspopup="true"
                        onMouseEnter={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 307,
                            )[0]?.statusCode === 307
                              ? handleSalaryOpen(e)
                              : ""
                            : ""
                        }
                        onMouseLeave={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 307,
                            )[0]?.statusCode === 307
                              ? handleSalaryClose(e)
                              : ""
                            : ""
                        }
                      >
                        {props.list.myCandidateStatuses?.length ? (
                          props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 307,
                          )[0]?.statusCode === 307 ? (
                            <CheckIcon className={classes.BarColor} />
                          ) : props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 302,
                          )[0]?.statusCode === 302 ? (
                            <CloseIcon className={classes.BarColor} />
                          ) : (
                            "6"
                          )
                        ) : (
                          "6"
                        )}
                      </div>
                      <div className={classes.barName}>
                        Salary <br />
                        Breakup <br />
                        Shared
                        <Popover
                          className={classes.BarPointer}
                          open={salaryopen}
                          anchorEl={Salary}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          onClose={handleSalaryClose}
                        >
                          <Typography sx={{ p: 1 }} className={classes.BarGap}>
                            {props.list.myCandidateStatuses?.length
                              ? props.list.myCandidateStatuses
                                .filter((item) => item.statusCode === 307)
                                .map((value) =>
                                  moment(value.createdAt).format(
                                    "DD-MM-YYYY",
                                  ),
                                )
                              : ""}
                          </Typography>
                        </Popover>
                      </div>
                    </div>

                    <div
                      className={
                        props.list.myCandidateStatuses?.length
                          ? props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 308,
                          )[0]?.statusCode === 308
                            ? classes.barItem + " " + classes.completed
                            : props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 302,
                            )[0]?.statusCode === 302
                              ? classes.barItem + " " + classes.cancel
                              : classes.barItem
                          : classes.barItem
                      }
                    >
                      <div
                        className={classes.barCounter}
                        aria-owns={
                          offeredopen ? "mouse-over-popover" : undefined
                        }
                        aria-haspopup="true"
                        onMouseEnter={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 308,
                            )[0]?.statusCode === 308
                              ? handleOfferedOpen(e)
                              : ""
                            : ""
                        }
                        onMouseLeave={(e) =>
                          props.list.myCandidateStatuses?.length
                            ? props.list.myCandidateStatuses.filter(
                              (item) => item.statusCode === 308,
                            )[0]?.statusCode === 308
                              ? handleOfferedClose(e)
                              : ""
                            : ""
                        }
                      >
                        {props.list.myCandidateStatuses?.length ? (
                          props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 308,
                          )[0]?.statusCode === 308 ? (
                            <CheckIcon className={classes.BarColor} />
                          ) : props.list.myCandidateStatuses.filter(
                            (item) => item.statusCode === 302,
                          )[0]?.statusCode === 302 ? (
                            <CloseIcon className={classes.BarColor} />
                          ) : (
                            "7"
                          )
                        ) : (
                          "7"
                        )}
                      </div>
                      <div className={classes.barName}>
                        Offered
                        <Popover
                          className={classes.BarPointer}
                          open={offeredopen}
                          anchorEl={Offered}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          onClose={handleOfferedClose}
                        >
                          <Typography sx={{ p: 1 }} className={classes.BarGap}>
                            {props.list.myCandidateStatuses?.length
                              ? props.list.myCandidateStatuses
                                .filter((item) => item.statusCode === 308)
                                .map((value) =>
                                  moment(value.createdAt).format(
                                    "DD-MM-YYYY",
                                  ),
                                )
                              : ""}
                          </Typography>
                        </Popover>
                      </div>
                    </div>

                    {props.list.statusCode === 310 ? (
                      <>
                        <div className={classes.barItem + " " + classes.cancel}>
                          <div
                            className={classes.barCounter}
                            onMouseEnter={(e) =>
                              props.list?.offerDeclinedReason !== ""
                                ? handleDeclinedOpen(e)
                                : ""
                            }
                            onMouseLeave={(e) =>
                              props.list?.offerDeclinedReason !== ""
                                ? handleDeclinedClose(e)
                                : ""
                            }
                          >
                            <CloseIcon className={classes.BarColor} />
                          </div>
                          <div className={classes.barName}>
                            Offer <br />
                            Declined
                            <Popover
                              className={classes.BarPointer}
                              open={declinedopen}
                              anchorEl={declined}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                              }}
                              transformOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                              }}
                              onClose={handleDeclinedClose}
                            >
                              <Typography
                                sx={{ p: 1 }}
                                className={classes.BarGap}
                              >
                                {props.list?.offerDeclinedReason}
                              </Typography>
                            </Popover>
                          </div>
                        </div>

                        <div className={classes.barItem}>
                          <div className={classes.barCounter}>8</div>
                          <div className={classes.barName}> {decode?.companyType === "COMPANY" ? "Hired" : "Joined"}</div>
                        </div>
                        {decode?.companyType !== "COMPANY" &&
                          <div className={classes.barItem}>
                            <div className={classes.barCounter}>9</div>
                            <div className={classes.barName}> Invoiced</div>
                          </div>
                        }
                      </>
                    ) : (
                      <></>
                    )}

                    {props.list.statusCode === 311 ? (
                      <>
                        <div className={classes.barItem + " " + classes.cancel}>
                          <div
                            className={classes.barCounter}
                            onMouseEnter={(e) =>
                              props.list?.ditchReason !== ""
                                ? handleDitchOpen(e)
                                : ""
                            }
                            onMouseLeave={(e) =>
                              props.list?.ditchReason !== ""
                                ? handleDitchClose(e)
                                : ""
                            }
                          >
                            <CloseIcon className={classes.BarColor} />
                          </div>
                          <div className={classes.barName}>
                            {decode?.companyType === "COMPANY" ? "Not Hired" : "Not Joined"}
                            <Popover
                              className={classes.BarPointer}
                              open={ditchopen}
                              anchorEl={ditch}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                              }}
                              transformOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                              }}
                              onClose={handleDitchClose}
                            >
                              <Typography
                                sx={{ p: 1 }}
                                className={classes.BarGap}
                              >
                                {props.list?.ditchReason}
                              </Typography>
                            </Popover>
                          </div>
                        </div>
                        {decode?.companyType !== "COMPANY" &&
                          <div className={classes.barItem}>
                            <div className={classes.barCounter}>9</div>
                            <div className={classes.barName}> Invoiced</div>
                          </div>
                        }
                      </>
                    ) : (
                      ""
                    )}

                    {props.list.statusCode !== 310 &&
                      props.list.statusCode !== 311 ? (
                      <>
                        <div
                          className={
                            props.list.myCandidateStatuses?.length
                              ? props.list.myCandidateStatuses.filter(
                                (item) => item.statusCode === 309,
                              )[0]?.statusCode === 309
                                ? classes.barItem + " " + classes.completed
                                : props.list.myCandidateStatuses.filter(
                                  (item) => item.statusCode === 302,
                                )[0]?.statusCode === 302
                                  ? classes.barItem + " " + classes.cancel
                                  : classes.barItem
                              : classes.barItem
                          }
                        >
                          <div
                            className={classes.barCounter}
                            aria-owns={
                              joinedopen ? "mouse-over-popover" : undefined
                            }
                            aria-haspopup="true"
                            onMouseEnter={(e) =>
                              props.list.myCandidateStatuses?.length
                                ? props.list.myCandidateStatuses.filter(
                                  (item) => item.statusCode === 309,
                                )[0]?.statusCode === 309
                                  ? handleJoinedOpen(e)
                                  : ""
                                : ""
                            }
                            onMouseLeave={(e) =>
                              props.list.myCandidateStatuses?.length
                                ? props.list.myCandidateStatuses.filter(
                                  (item) => item.statusCode === 309,
                                )[0]?.statusCode === 309
                                  ? handleJoinedClose(e)
                                  : ""
                                : ""
                            }
                          >
                            {props.list.myCandidateStatuses?.length ? (
                              props.list.myCandidateStatuses.filter(
                                (item) => item.statusCode === 309,
                              )[0]?.statusCode === 309 ? (
                                <CheckIcon className={classes.BarColor} />
                              ) : props.list.myCandidateStatuses.filter(
                                (item) => item.statusCode === 302,
                              )[0]?.statusCode === 302 ? (
                                <CloseIcon className={classes.BarColor} />
                              ) : (
                                "8"
                              )
                            ) : (
                              "8"
                            )}
                          </div>
                          <div className={classes.barName}>
                            {decode?.companyType === "COMPANY" ? "Hired" : "Joined"}
                            <Popover
                              className={classes.BarPointer}
                              open={joinedopen}
                              anchorEl={Joined}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                              }}
                              transformOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                              }}
                              onClose={handleJoinedClose}
                            >
                              <Typography
                                sx={{ p: 1 }}
                                className={classes.BarGap}
                              >
                                {props.list.myCandidateStatuses?.length
                                  ? props.list.joinedDate !== null
                                    ? props.list.myCandidateStatuses
                                      .filter(
                                        (item) => item.statusCode === 309,
                                      )
                                      .map((value) =>
                                        moment(props.list.joinedDate).format(
                                          "DD-MM-YYYY",
                                        ),
                                      )
                                    : ""
                                  : ""}
                              </Typography>
                            </Popover>
                          </div>
                        </div>

                        {decode.role === "SUBVENDOR" &&
                          <div className={props.list.myCandidateStatuses?.length ? props.list.myCandidateStatuses.filter(item => item.statusCode === 312)[0]?.statusCode === 312 ? classes.barItem + " " + classes.completed : props.list.myCandidateStatuses.filter(item => item.statusCode === 302)[0]?.statusCode === 302 ? classes.barItem + " " + classes.cancel : classes.barItem : classes.barItem} >
                            <div className={classes.barCounter} aria-owns={invoicedopen ? 'mouse-over-popover' : undefined}
                              aria-haspopup="true"
                              onMouseEnter={(e) => props.list.myCandidateStatuses?.length ? props.list.myCandidateStatuses.filter(item => item.statusCode === 312)[0]?.statusCode === 312 ? handleInvoiceOpen(e) : "" : ""}
                              onMouseLeave={(e) => props.list.myCandidateStatuses?.length ? props.list.myCandidateStatuses.filter(item => item.statusCode === 312)[0]?.statusCode === 312 ? handleInvoiceClose(e) : "" : ""}>{props.list.myCandidateStatuses?.length ? props.list.myCandidateStatuses.filter(item => item.statusCode === 312)[0]?.statusCode === 312 ? <CheckIcon className={classes.BarColor} /> : props.list.myCandidateStatuses.filter(item => item.statusCode === 302)[0]?.statusCode === 302 ? <CloseIcon className={classes.BarColor} /> : "9" : "9"}</div>
                            <div className={classes.barName} > Invoiced <br />{
                              decode?.role === "ADMIN" ? props.list.myCandidateStatuses?.length ? props.list.myCandidateStatuses.filter(item => item.statusCode === 312)[0]?.statusCode === 312 ? props.list.invoiceValue : "" : "" : ""}

                              <Popover
                                className={classes.BarPointer}
                                open={invoicedopen}
                                anchorEl={Invoice}
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                                }}
                                transformOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'center',
                                }}
                                onClose={handleInvoiceClose}
                              >
                                <Typography sx={{ p: 1 }} className={classes.BarGap}> {props.list.myCandidateStatuses?.length ? props.list.invoicedDate !== null ? props.list.myCandidateStatuses.filter(item => item.statusCode === 312).map((value) => (moment(props.list.invoicedDate).format('DD-MM-YYYY'))) : "" : ""} </Typography>

                              </Popover>
                            </div>
                          </div>
                        }

                        {props.list.statusCode === 313 ? (
                          <div
                            className={
                              props.list.myCandidateStatuses?.length
                                ? props.list.myCandidateStatuses.filter(
                                  (item) => item.statusCode === 313,
                                )[0]?.statusCode === 313
                                  ? classes.barItem + " " + classes.cancel
                                  : props.list.myCandidateStatuses.filter(
                                    (item) => item.statusCode === 302,
                                  )[0]?.statusCode === 302
                                    ? classes.barItem + " " + classes.cancel
                                    : classes.barItem
                                : classes.barItem
                            }
                          >
                            <div
                              className={classes.barCounter}
                              aria-owns={
                                creditopen ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={(e) =>
                                props.list?.creditNoteReason !== ""
                                  ? handleCreditOpen(e)
                                  : ""
                              }
                              onMouseLeave={(e) =>
                                props.list?.creditNoteReason !== ""
                                  ? handleCreditClose(e)
                                  : ""
                              }
                            >
                              {props.list.myCandidateStatuses?.length ? (
                                props.list.myCandidateStatuses.filter(
                                  (item) => item.statusCode === 312,
                                )[0]?.statusCode === 312 ? (
                                  <CheckIcon className={classes.BarColor} />
                                ) : props.list.myCandidateStatuses.filter(
                                  (item) => item.statusCode === 302,
                                )[0]?.statusCode === 302 ? (
                                  <CloseIcon className={classes.BarColor} />
                                ) : (
                                  "10"
                                )
                              ) : (
                                "10"
                              )}
                            </div>
                            <div className={classes.barName}>
                              Credit Note <br />
                              <Popover
                                className={classes.BarPointer}
                                open={creditopen}
                                anchorEl={Credit}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                                transformOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                onClose={handleCreditClose}
                              >
                                <Typography
                                  sx={{ p: 1 }}
                                  className={classes.BarGap}
                                >
                                  {props.list?.creditNoteReason}
                                </Typography>
                              </Popover>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
