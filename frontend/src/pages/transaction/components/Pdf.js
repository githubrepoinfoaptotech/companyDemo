import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import React from "react";
import useStyles from "../../../themes/style.js";
import moment from "moment";
import Pdf from "react-to-pdf";
import convertor from "rupees-to-words";

 

 const ref = React.createRef();
 const options = {
  orientation: "p",
  unit: "mm",
  format: [190, 350],
};

const ViewPDF = (props) => {
  const classes = useStyles();


  function ViewTable() {
   
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl.No</TableCell>
              <TableCell>Particulars</TableCell>
              <TableCell>HSN/SAC</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell rowSpan={3}>1</TableCell>
              <TableCell style={{ verticalAlign: "top" }}>
                {props.list.pricing?.title}
                
              </TableCell>

              <TableCell align="center" style={{ verticalAlign: "top" }}>
                {props.list.hsn_sac}
              </TableCell>
              <TableCell style={{ verticalAlign: "top" }}>
                {props.list.basicAmount}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">L0300220- Output Tax CGST 9% </TableCell>
              <TableCell></TableCell>
              <TableCell style={{ verticalAlign: "top" }}>
                {props.list.cgst}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">
                
                L0300220- Output Tax SGST 9%
              </TableCell>
              <TableCell></TableCell>
              <TableCell style={{ verticalAlign: "top" }}>
                {props.list.sgst}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
              <TableCell style={{ verticalAlign: "top" }}>
                {props.list.totalAmount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function FixedTable() {
    
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead rowSpan={2}>
            <TableRow>
              <TableCell rowSpan={2}> <span style={{bottom:"10px"}}> HSN/SAC </span></TableCell>
              <TableCell rowSpan={2}><span style={{bottom:"10px"}}> Taxable Value </span></TableCell>
              <TableCell colSpan={2}>Central Tax</TableCell>
              <TableCell colSpan={2}>State Tax</TableCell>
              <TableCell rowSpan={2} > <span style={{bottom:"10px"}}> Total Tax Amount </span></TableCell>
            </TableRow>
            <TableRow >
              <TableCell>Rate</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{props.list.hsn_sac}</TableCell>
              <TableCell>{props.list.basicAmount}</TableCell>
              <TableCell>{props.list.totalTaxPerc / 2}%</TableCell>
              <TableCell>{props.list.cgst}</TableCell>
              <TableCell>{props.list.totalTaxPerc / 2}%</TableCell>
              <TableCell>{props.list.sgst}</TableCell>
              <TableCell>{props.list.gst}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{props.list.basicAmount}</TableCell>
              <TableCell></TableCell>
              <TableCell>{props.list.cgst}</TableCell>
              <TableCell></TableCell>
              <TableCell>{props.list.sgst}</TableCell>
              <TableCell>{props.list.gst}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
   return (
    <>
      <Pdf
        targetRef={ref}
        filename={
          (props.companyName).replaceAll(".", "_") +
          moment(new Date()).format("DD_MM_YYYY_HH_mm")
        }
        options={options}
        x={1}
        y={1}
        scale={1}
      >
        {({ toPdf }) => (
          <button ref={props.downloadRef} onClick={toPdf}>
            Generate Pdf
          </button>
        )}
      </Pdf>

      <div
        id="testId"
        ref={ref}
        style={{ padding: "20px 20px", width: "700px", height: "1500px" }}
      >
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography style={{ textAlign: "center" }} variant="h5">
                REFO.APP
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div style={{ textAlign: "center" }}>
                <Typography variant="h5">Tax Invoice</Typography>
              </div>
              <div style={{ textAlign: "end" }}>
                <Typography variant="h5">(Original for Recipient)</Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Invoice No :</Typography>
                </Grid>
                <Grid item xs={6}>
                  {props.list.referenceNo}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Party :</Typography>
                </Grid>
                <Grid item xs={6}>
                  {props.list.companyName}
                  <br />
                  <div>
                    {props.list.companyAddress === null
                      ? " "
                      : props.list.companyAddress}
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">State : </Typography>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">GSTIN : </Typography>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">PAN NO : </Typography>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} style={{ display: "block", textAlign: "end" }}>
              <Typography>
                Date : {moment(props.list.updatedAt).format("DD-MM-YYYY")}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <ViewTable />
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>Amount Chargeable (in words)</div>
              <div>E & OE</div>
            </Grid>
            <Grid item xs={12}>
              <Typography>INR {props.total === 0 ? " - " : convertor(props.total)} Only</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <FixedTable />
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={12}> Tax Amount (in words) : INR {props.gst === 0 ? " - " : convertor(props.gst)} Only</Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">
                    Company's GSTIN/UIN No :
                  </Typography>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Company's PAN : </Typography>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Company's CIN : </Typography>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">A/C Holdeer's Name : </Typography>
                </Grid>
                <Grid item xs={6}>
                REFO.APP
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Bank Name : </Typography>
                </Grid>
                <Grid item xs={6}>
                  Punjab National Bank
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Branch : </Typography>
                </Grid>
                <Grid item xs={6}>
                  Annanagar
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">A/C No : </Typography>
                </Grid>
                <Grid item xs={6}>
                  10614025000499
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">IFSC Code : </Typography>
                </Grid>
                <Grid item xs={6}>
                  PUNB0106110
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} style={{ textAlign: "center",marginLeft:"50px" }}>
                  for REFO.APP
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Typography variant="h6">Remarks : </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography> Prepared by </Typography>
              
            </Grid>
            <Grid item xs={3}>
              <Typography> Verified by </Typography>
              
            </Grid>
            <Grid item xs={6} style={{textAlign:"end"}}>
              <Typography> Authendicated Signature </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            style={{ display: "flex", textAlign: "center", marginTop: "20px" }}
          >
            <Grid item xs={12}>
              <Typography variant="body1">
                
                This is Computer Generated Invoice With Digital Sign
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"> REFO.APP </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"> 26, Kattabomman Street, Radha Nagar, Chromepet, Chennai-44 Tel: 044 4006227 
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    
    </>
  );
};

export default ViewPDF;
