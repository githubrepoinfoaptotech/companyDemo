import React from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
} from "@material-ui/core";
// components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CloseIcon from "@material-ui/icons/Close";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import DoneIcon from "@material-ui/icons/Done";
import moment from "moment";
import useStyles from "../../themes/style.js";

function ProjectView({
  anchor,
  toggleDrawer,
  mobileQuery,
  recruiterEditFields,
  viewProjOpen,
  clientsName,
  clientEdit,
  levelOfHireEditFields,
  handleViewProjClick,
}) {
  
    const classes = useStyles(); 
  return (
    <div>
      <Box sx={{ width: "100%" }} role="presentation">
        <List>
          <Card className={classes.root}>
            <CardHeader>
              <Grid
                container
                direction="row"
                spacing={1}
                className={classes.drawerViewHeader}
              >
                <Grid item xs={10} md={6}>
                  <Typography variant="subtitle1">
                    View Project - {clientEdit.clientName}
                  </Typography>
                </Grid>

                <Grid item xs={2} lg={6} className={classes.drawerViewClose}>
                  <CloseIcon
                    className={classes.closeBtn}
                    size="14px"
                    onClick={toggleDrawer(anchor, false)}
                  />
                </Grid>
              </Grid>
            </CardHeader>

            <CardContent className={classes.drawerViewContent}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Project Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {clientEdit.clientName}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Project Division:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {clientEdit.clientIndustry}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Hiring Manager:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {clientEdit.handler?.firstName+" "+clientEdit.handler?.lastName}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    HR Business Unit Code:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {clientEdit.hrbpCode}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Project Region:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {clientEdit.projectRegion}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Project Location:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {clientEdit.projectLocation}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Reason for Hiring:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {clientEdit.reasonForHiring}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Is Billed:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {clientEdit.billable === true ? (
                    <DoneIcon style={{ color: "#4caf50" }} />
                  ) : (
                    <CloseIcon style={{ color: "#b71c1c" }} />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Hiring Start Date:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {clientEdit.aggStartDate}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Hiring End Date:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {clientEdit.aggEndDate}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>Status:</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {clientEdit.status ? (
                    clientEdit.status.statusName === "ACTIVE" ? (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.green + " " + classes.noPointer}
                        >
                          ACTIVE
                        </Button>
                      </>
                    ) : clientEdit.status.statusName === "INACTIVE" ? (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.red + " " + classes.noPointer}
                        >
                          INACTIVE
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.blue}
                        >
                          NEW
                        </Button>
                      </>
                    )
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Posted Date:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {moment(clientEdit.createdAt).format("DD-MM-YYYY")}
                </Grid>
                <Grid item xs={12}>
                  <ListItem
                    button
                    onClick={() => handleViewProjClick("hireLevelList")}
                  >
                    <ListItemIcon>
                      <SignalCellularAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Number to be hired" />
                    {viewProjOpen.hireLevelList ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={viewProjOpen.hireLevelList}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} lg={12}>
                        <MUIDataTable
                          options={{
                            pagination: false,
                            sort: false,
                            selectableRows: "none",
                            search: false,
                            filter: false,
                            download: false,
                            print: false,
                            viewColumns: false,
                            responsive:
                              mobileQuery === true ? "vertical" : "standard",
                            textLabels: {
                              body: {
                                noMatch:
                                  "Oops! Matching record could not be found",
                              },
                            },
                          }}
                          columns={[
                            {
                              name: "S.No",
                            },
                            {
                              name: "Level Name",
                            },
                            {
                              name: "Number of Hirings",
                            },
                          ]}
                          data={levelOfHireEditFields.map((item, index) => {
                            return [index + 1, item.name, item.noOfHires];
                          })}
                        />
                      </Grid>
                    </Grid>
                  </Collapse>
                </Grid>
                <Grid item xs={12}>
                  <ListItem
                    button
                    onClick={() => handleViewProjClick("orgRecList")}
                  >
                    <ListItemIcon>
                      <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Org Recruiter Lists" />
                    {viewProjOpen.orgRecList ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={viewProjOpen.orgRecList}>
                    <List component="div" disablePadding>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Typography className={classes.boldtext}>
                            Recruiter Point of Contact(POC):
                          </Typography>
                          <br />
                          <MUIDataTable
                            options={{
                              pagination: false,
                              sort: false,
                              selectableRows: "none",
                              search: false,
                              filter: false,
                              download: false,
                              print: false,
                              viewColumns: false,
                              responsive:
                                mobileQuery === true ? "vertical" : "standard",
                              textLabels: {
                                body: {
                                  noMatch:
                                    "Oops! Matching record could not be found",
                                },
                              },
                            }}
                            columns={[
                              {
                                name: "S.No",
                              },
                              {
                                name: "Name",
                              },
                              {
                                name: "Email",
                              },

                              {
                                name: "Mobile No",
                              },
                            ]}
                            data={recruiterEditFields.map((item, index) => {
                              return [
                                index + 1,
                                item.name,
                                item.email,
                                item.mobile,
                              ];
                            })}
                          />
                        </Grid>
                      </Grid>
                    </List>
                  </Collapse>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid
                container
                direction="row"
                spacing={2}
                className={classes.clientDrawerFooter}
              >
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={toggleDrawer(anchor, false)}
                >
                  Close
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </List>
      </Box>
    </div>
  );
}

export default ProjectView;
