import React, { useState, useEffect, useReducer, useRef } from 'react';
import MUIDataTable from "mui-datatables";
import { Grid, Button, TablePagination, Backdrop, CircularProgress, TextField } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useStyles from '../../themes/style.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Tables() {
  const classes = useStyles();
  const mobileQuery = useMediaQuery('(max-width:600px)');

  const [loader, setLoader] = useState(false);
  const token = localStorage.getItem('token');
  const [messageActivity, setMessageActivity] = useState([]);
  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
  const [count, setCount] = useState(0);
  const HeaderElements = () => (
    <>
      Total : {count}
    </>
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLoader(true);
    setCurrerntPage(newPage + 1);

    const form = filterRef.current;
    var data = JSON.stringify({
      "page": newPage + 1,
      "phoneNumber": `${form['mobile'].value}`,
      "fromDate": `${form['fromDate'].value}`,
      "toDate": `${form['toDate'].value}`,
    });


    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER}admin/MyMessageActivity`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },

    })
      .then(function (response) {
        if (response.data.status === true) {
          setMessageActivity(response.data.data);
          setCount(response.data.count);
        }

        setLoader(false);

      });

  };



  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER}admin/MyMessageActivity`,
        data: {
          page: 1
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },

      })
        .then(function (response) {
          if (response.data.status === true) {
            setLoader(false);
            setMessageActivity(response.data.data);
            setCount(response.data.count);
          }
        });

    }
    fetchData()

  }, [reducerValue, token])

  const [mobile, setMobile] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const filterRef = useRef(null);

  const handleMobileChange = (event) => {
    setMobile(filterRef.current.mobile.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(filterRef.current.fromDate.value);
  };

  const handleToDateChange = (event) => {
    setToDate(filterRef.current.toDate.value);
  };

  const resetForm = (e) => {
    filterRef.current.reset();
    forceUpdate();
  }


  function getFilterData() {
    setLoader(true);
    setCurrerntPage(1);
    setPage(0);
    const form = filterRef.current;
    var data = JSON.stringify({
      "page": 1,
      "phoneNumber": `${form['mobile'].value}`,
      "fromDate": `${form['fromDate'].value}`,
      "toDate": `${form['toDate'].value}`,
    });


    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER}admin/MyMessageActivity`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },

    })
      .then(function (response) {
        if (response.data.status === true) {

          setLoader(false);
          setMessageActivity(response.data.data);
          setCount(response.data.count);
        }

      })

      .catch(function (error) {
        console.log(error);


      });

  }




  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>

        <Grid item xs={9} sm={7} md={8} lg={6}  > <PageTitle title="Message Activity" />  </Grid>

        <Grid item xs={3} sm={5} md={4} lg={6} className={classes.drawerClose} >

        </Grid>
      </Grid>


      <form ref={filterRef} onSubmit={(e) => {
        e.preventDefault();
        getFilterData();
      }} >


        <Grid container spacing={2} className={classes.filterGap}>

          <TextField
            className={classes.filterWidth}

            name="mobile"
            label="Mobile Number"
            size="small"
            type="text"
            variant="standard"
            InputLabelProps={{ shrink: true }}

            defaultValue={mobile} onChange={handleMobileChange}
          />

          <TextField
            className={classes.filterWidth}

            name="fromDate"
            label="From"
            size="small"
            type="date"
            variant="standard"
            InputLabelProps={{ shrink: true }}

            defaultValue={fromDate} onChange={handleFromDateChange}
          />

          <TextField
            className={classes.filterWidth}

            name="toDate"
            label="To"
            size="small"
            type="date"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            defaultValue={toDate} onChange={handleToDateChange}
          />


          <div className={classes.buttons}>
            <Button variant="contained" size="small" color="primary" type="submit" >Search</Button>
            <Button variant="contained" size="small" color="secondary" onClick={() => resetForm()} >Reset</Button>
          </div>
        </Grid >

      </form>



      <Grid container spacing={2}>

        <Grid item xs={12}>

          <MUIDataTable
            title=""
            options={{
              sort: false,
              selectableRows: "none",
              search: false,
              filter: false,
              print: false,
              download: false,
              pagination: false,
              customToolbar: () => <HeaderElements />,
              responsive: mobileQuery === true ? 'vertical' : 'standard',
              textLabels: {
                body: {
                  noMatch: 'Oops! Matching record could not be found',
                }
              }
            }}
            columns={[

              {
                name: "S.No",

              },

              {
                name: "Initiated By Candidates",

              },
              {
                name: "Initiated By Company",

              },
              {
                name: "Posted Date",

              },

            ]}

            data={messageActivity.map((item, index) => {
              return [
                <>{currerntPage !== 0 ? 10 * currerntPage - 10 + index + 1 : index + 1} </>,

                <>{item ? <> {item.from === null ? "-" : item.from} </> : ""} </>,
                <>{item ? <> {item.to === null ? "-" : item.to} </> : ""} </>,
                moment(item.createdAt).format('DD-MM-YYYY'),
              ]
            })}
          />

          <Grid container spacing={2} className={classes.pagination}>

            <TablePagination
              rowsPerPageOptions={[50]}
              component="div"
              count={count}
              rowsPerPage={50}
              page={page}
              onPageChange={handleChangePage}

            />

          </Grid>

        </Grid>
      </Grid>


      <Backdrop className={classes.backdrop} open={loader}  >
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  );
}



