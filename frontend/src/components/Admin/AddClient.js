import React from "react";
import {
  Grid,
  Button,
  List,
  Box,
  TextField, 
  FormControl,
  InputLabel,
  Typography,  
} from "@material-ui/core";
 import useStyles from "../../themes/style.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import classNames from "classnames";
import {jwtDecode} from "jwt-decode";


export default function AddClient(props) {
    const classes = useStyles();
    const token = localStorage.getItem("token")
    const decode = jwtDecode(token)
    const gridSize = decode.companyType === "COMPANY" ? 6 : 4;
   return (
    <>
<Box sx={{ width: "100%" }} role="presentation">
<List>
  <Card className={classes.root}>
    <CardHeader>
      <Grid
        container
        direction="row"
        spacing={1}
        className={classes.drawerHeader}
      >
        <Grid item xs={10} md={6}>
          <Typography variant="subtitle1">{decode.companyType ==="COMPANY"? "Add New Project" : "Add New Client"} </Typography>
        </Grid>

        <Grid item xs={2} lg={6} className={classes.drawerClose}>
          <CloseIcon
            className={classes.closeBtn}
            size="14px"
            onClick={props.toggleDrawer("right", false)}
          />
        </Grid>
      </Grid>
    </CardHeader>
    <CardContent className={classes.scrollCard}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} sm={gridSize} md={gridSize} lg={gridSize}>
          <InputLabel shrink htmlFor="clientName">
          {decode.companyType ==="COMPANY"? "Project Name" : "Client Name"} 
          
          </InputLabel>
          <FormControl className={classes.margin}>
            <TextField
              InputProps={{ disableUnderline: true }}
              classes={{ root: classes.customTextField }}
              size="small"
              placeholder={decode.companyType ==="COMPANY"?  "Enter Project Name":"Enter Client Name"}
              id="clientName"
              {...props.register("clientName")}
              error={props.errors.clientName ? true : false}
            />

            <Typography variant="inherit" color="error">
              {props.errors.clientName?.message}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={gridSize} md={gridSize} lg={gridSize}>
          <InputLabel shrink htmlFor="clientIndustry">
           {decode.companyType ==="COMPANY"?  "Project Division":"Client Industry"}
          </InputLabel>
          <FormControl className={classes.margin}>
            <TextField
              InputProps={{ disableUnderline: true }}
              classes={{ root: classes.customTextField }}
              size="small"
              placeholder={decode.companyType ==="COMPANY"?  "Enter Project Division":"Enter Clients Industry"}
              id="clientIndustry"
              {...props.register("clientIndustry")}
              error={props.errors.clientIndustry ? true : false}
            />

            <Typography variant="inherit" color="error">
              {props.errors.clientIndustry?.message}
            </Typography>
          </FormControl>
        </Grid>
        {decode.companyType ==="COMPANY" ?<></>
        :
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <InputLabel shrink htmlFor="clientWebsite">
            Clients Website
            </InputLabel>
            <FormControl className={classes.margin}>
              <TextField
                InputProps={{ disableUnderline: true }}
                classes={{ root: classes.customTextField }}
                size="small"
                placeholder="Enter Clients Website"
                id="clientWebsite"
                {...props.register("clientWebsite")}
                error={props.errors.clientWebsite ? true : false}
              />

              <Typography variant="inherit" color="error">
                {props.errors.clientWebsite?.message}
              </Typography>
            </FormControl>
          </Grid>

        }

        <Grid item xs={12} sm={gridSize} md={6} lg={6}>
          <InputLabel shrink htmlFor="aggStartDate">
             {decode.companyType ==="COMPANY"?  "Project Start Date":"Agreement Start Date"}
          </InputLabel>
          <FormControl className={classes.margin}>
            <TextField
              InputProps={{ disableUnderline: true }}
              classes={{ root: classes.customTextField }}
              size="small"
              type="date"
              placeholder={decode.companyType ==="COMPANY"?  "Select Project Start Date":"Enter Agreement Start Date"}
              id="aggStartDate"
              {...props.register("aggStartDate")}
              error={props.errors.aggStartDate ? true : false}
            />

            <Typography variant="inherit" color="error">
              {props.errors.aggStartDate?.message}
            </Typography>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <InputLabel shrink htmlFor="aggEndDate">
          {decode.companyType ==="COMPANY"?  "Project End Date" :"Agreement End Date"}
          </InputLabel>
          <FormControl className={classes.margin}>
            <TextField
              InputProps={{ disableUnderline: true }}
              classes={{ root: classes.customTextField }}
              size="small"
              type="date"
              placeholder={decode.companyType ==="COMPANY"?  "Select Project End Date":"Select Agreement End Date"}
              id="aggEndDate"
              {...props.register("aggEndDate")}
              error={props.errors.aggEndDate ? true : false}
            />

            <Typography variant="inherit" color="error">
              {props.errors.aggEndDate?.message}
            </Typography>
          </FormControl>
        </Grid>

        <Grid item xs lg={3}></Grid>

        {props.recruiterFields.map((user, index) => (
          <div key={index} className={classNames(classes.fields)}>
            <Grid
              item
              xs={12}
              sm={4}
              lg={3}
              className={classNames(classes.fieldsInput)}
            >
              <InputLabel shrink>
                Org Point of Contact(POC) Name
              </InputLabel>

              <FormControl className={classes.margin}>
                <TextField
                  InputProps={{ disableUnderline: true }}
                  classes={{ root: classes.customTextField }}
                  size="small"
                  placeholder="Org Point of Contact(POC) Name"
                  id="name"
                  value={user.name}
                  name="name"
                  onChange={(event) => props.recruiterChange(event, index)}
                />
              </FormControl>
            </Grid>

        
            <Grid
              item
              xs={12}
              sm={4}
              lg={3}
              className={classNames(classes.fieldsInput)}
            >
              <InputLabel shrink>
                Org Point of Contact(POC) Email
              </InputLabel>

              <FormControl className={classes.margin}>
                <TextField
                  InputProps={{ disableUnderline: true }}
                  classes={{ root: classes.customTextField }}
                  size="small"
                  placeholder="Org Point of Contact(POC) Email"
                  id="email"
                  value={user.email}
                  name="email"
                  onChange={(event) => props.recruiterChange(event, index)}
                />
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              lg={4}
              className={classNames(classes.fieldsInput)}
            >
              <InputLabel shrink>
                Org Point of Contact(POC) Mobile No
              </InputLabel>

              <FormControl className={classes.margin}>
                <TextField
                  InputProps={{ disableUnderline: true }}
                  classes={{ root: classes.customTextField }}
                  size="small"
                  placeholder="Org Point of Contact(POC) Mobile No"
                  id="mobile"
                  value={user.mobile}
                  name="mobile"
                  onChange={(event) => props.recruiterChange(event, index)}
                />
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              lg={2}
             
              className={classNames([classes.fieldsInput])}
            >
              <AddCircleIcon
                color="primary"
                size="small"
                onClick={props.recruiterAdd}
                className={classes.closeAddBtn}
              />
              {index + 1 !== 1 ? (
                <RemoveCircle
                  color="secondary"
                  size="small"
                  onClick={props.recruiterRemove}
                  className={classes.closeMinBtn}
                />
              ) : (
                ""
              )}
            </Grid>
          </div>
        ))}

        <div id="section"> </div>
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
          color="primary" 
          size="small"
          onClick={props.handleSubmit(props.handleAdd)}
          disabled={props.isSubmitting}
        >
          Save
        </Button>

        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={props.toggleDrawer("right", false)}
        >
          Close
        </Button>

      </Grid>
    </CardActions>
  </Card>
</List>
</Box>
</>
  );
}
