import React, { useState, useEffect, useReducer } from 'react';
import MUIDataTable from "mui-datatables";
import { Grid, Button, List, Box, SwipeableDrawer, FormControl, TextField, InputLabel, Typography, TablePagination, Backdrop, CircularProgress } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { toast } from 'react-toastify';
import ViewIcon from '@material-ui/icons/Visibility'
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip'
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import Notification from "../../components/Notification";
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import useStyles from '../../themes/style.js';
import { signOut, useUserDispatch } from "../../context/UserContext";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const positions = [
    toast.POSITION.TOP_RIGHT,
];

export default function Tables(props) {
    const classes = useStyles();
    var userDispatch = useUserDispatch(); 
    const mobileQuery = useMediaQuery('(max-width:600px)'); 
    const token = localStorage.getItem('token');
    const [priceData, setPriceData] = useState([]);
    const [priceEdit, setPriceEdit] = useState({
        "id": "",
        "title": "",
        "numberOfMessages": "",
        "amount": "",
        "description": "",
    });

    const [page, setPage] = useState(0);
    const [currerntPage, setCurrerntPage] = useState(1);
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [dataList, setDataList] = useState("ADD");
    const [count, setCount] = useState(0);
    const [loader, setLoader] = useState(false);
    var [notificationsPosition] = useState(2);
    var [errorToastId, setErrorToastId] = useState(null);

    const HeaderElements = () => (
        <>
            Total : {count}
        </>
    );


    const handleChangePage = (event, newPage) => {
        setLoader(true);
        setCurrerntPage(newPage + 1);

        setPage(newPage);

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER}pricing/viewAllPricing`,
            data: {
                page: newPage + 1
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },

        })
            .then(function (response) {

                if (response.data.status === true) {
                    setPriceData(response.data.data);
                    setCount(response.data.count);
                }
                setLoader(false);

            });

    };


    function sendNotification(componentProps, options) {
        return toast(
            <Notification
                {...componentProps}
                className={classes.notificationComponent}
            />,
            options,
        );
    }
    function handleNotificationCall(notificationType, message) {
        var componentProps;

        if (errorToastId && notificationType === "error") return;

        switch (notificationType) {
            case "info":
                componentProps = {
                    type: "feedback",
                    message: message,
                    variant: "contained",
                    color: "primary",

                };
                break;
            case "error":
                componentProps = {
                    type: "message",
                    message: message,
                    variant: "contained",
                    color: "secondary",

                };
                break;
            default:
                componentProps = {
                    type: "shipped",
                    message: message,
                    variant: "contained",
                    color: "success",
                };
        }

        var toastId = sendNotification(componentProps, {
            type: notificationType,
            position: positions[notificationsPosition],
            progressClassName: classes.progress,
            onClose: notificationType === "error" && (() => setErrorToastId(null)),
            className: classes.notification,
        });

        if (notificationType === "error") setErrorToastId(toastId);
    }


    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Pricing Plan is required'),
        numberOfMessages: Yup.string().required('Number of Message is required'),
        amount: Yup.string().required('Amount is required'),
        description: Yup.string().max(255).required('Description is required'),
    });

    const {
        register: editPrices,
        formState: { errors: editErrors, isSubmitting: editIsSubmitting },
        handleSubmit: editSubmit,
        reset: editreset,
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
 

    useEffect(() => {

        setLoader(true);

        const fetchData = async () => {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_SERVER}pricing/viewAllPricing`,
                data: { "page": 1 },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },

            })
                .then(function (response) {
                    if (response.data.status === true) {
                        setPriceData(response.data.data);
                        setCount(response.data.count);
                        setLoader(false)
                    }
                })
                .catch(function (error) {
                    console.log(error); 
                      if (error?.response?.status === 401 || error?.response?.status === 403) {
                        signOut(userDispatch, props.history)
                      }
                   
            
                  });

        }
        fetchData()

    }, [reducerValue, token, userDispatch, props])




    function handleAdd(values) {

        return new Promise((resolve) => {
            setLoader(true);


            axios({
                method: 'post',
                url: `${process.env.REACT_APP_SERVER}pricing/addprice`,
                data: {
                    "title": values.title,
                    "amount": values.amount,
                    "description": values.description,
                    "numberOfMessages": values.numberOfMessages,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },

            })
                .then(function (response) {

                    if (response.data.status === true) {
                        handleNotificationCall("success", response.data.message);
                        forceUpdate();
                        setState({ ...state, "right": false });
                    } else {
                        handleNotificationCall("error", response.data.message);
                    }
                    setLoader(false);

                });

        })
    }

    function handleEdit(values) {
        return new Promise((resolve) => {
            setLoader(true);

            axios({
                method: 'post',
                url: `${process.env.REACT_APP_SERVER}pricing/editprice`,
                data: {
                    "id": priceEdit.id,
                    "title": values.title,
                    "amount": values.amount,
                    "description": values.description,
                    "numberOfMessages": values.numberOfMessages,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },

            })
                .then(function (response) {

                    if (response.data.status === true) {

                        handleNotificationCall("success", response.data.message);

                        forceUpdate()

                        setState({ ...state, "right": false });


                    } else {
                        handleNotificationCall("success", response.data.message);
                    }
                    setLoader(false);

                })
                .catch(function (error) {
                    console.log(error);
                });

        })

    }



    const [state, setState] = useState({
        left: false,
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };



    const list = (anchor) => (


        dataList === "EDIT" ?
            <>
                <Box sx={{ width: '100%' }} role="presentation"  >

                    <List>

                        <Card className={classes.root} >

                            <CardHeader >


                            <Grid container direction="row" spacing={1} className={classes.drawerHeader }>

<Typography variant="subtitle1">  Edit Plan  </Typography> 

<Grid  className={classes.drawerClose}>
    
    <CloseIcon className={classes.closeBtn} size="14px" onClick={toggleDrawer(anchor, false)} /> 

  </Grid>


</Grid>  
                            </CardHeader >

                            <form onSubmit={editSubmit(handleEdit)} >
                                <CardContent>
                                    <Grid container direction="row" spacing={2}>


                                        <Grid item lg={4} sm={4}  md={4} xs={12} >

                                            <InputLabel shrink htmlFor="title"> Pricing Plan</InputLabel>
                                            <FormControl className={classes.margin}>

                                                <TextField InputProps={{ disableUnderline: true }} classes={{ root: classes.customTextField }} size="small" placeholder='Enter Pricing Plan' id="plan"
                                                    defaultValue={priceEdit.title}
                                                    {...editPrices('title')} error={editErrors.title ? true : false} />

                                                <Typography variant="inherit" color="error">
                                                    {editErrors.title?.message}
                                                </Typography>
                                            </FormControl>

                                        </Grid>

                                        <Grid item lg={4} sm={4} md={4} xs={12}>

                                            <InputLabel shrink htmlFor="amount"> Amount   </InputLabel>
                                            <FormControl className={classes.margin}>



                                                <TextField InputProps={{ disableUnderline: true }} size="small" type="number" classes={{ root: classes.customTextField }} placeholder='Enter Amount' id="amount" defaultValue={priceEdit.amount}
                                                    {...editPrices('amount')} error={editErrors.amount ? true : false}
                                                />

                                                <Typography variant="inherit" color="error">
                                                    {editErrors.amount?.message}
                                                </Typography>
                                            </FormControl>

                                        </Grid>

                                        <Grid item lg={4} sm={4} md={4}  xs={12}>

                                            <InputLabel shrink htmlFor="numberOfMessages"> Number of messages </InputLabel>
                                            <FormControl className={classes.margin}>

                                                <TextField InputProps={{ disableUnderline: true }} type="number" classes={{ root: classes.customTextField }} size="small" placeholder='Enter Number of messages' id="numberOfMessages"
                                                    defaultValue={priceEdit.numberOfMessages}
                                                    {...editPrices('numberOfMessages')} error={editErrors.numberOfMessages ? true : false} />

                                                <Typography variant="inherit" color="error">
                                                    {editErrors.numberOfMessages?.message}
                                                </Typography>
                                            </FormControl>

                                        </Grid>
                                  
                                        <Grid item xs={12}>


                                            <InputLabel shrink htmlFor="description">
                                                Description
                                            </InputLabel>
                                            <FormControl className={classes.margin}>


                                                <TextField InputProps={{ disableUnderline: true }} multiline rows={4}
                                                    classes={{ root: classes.customTextField }} size="small" placeholder='Enter Description' id="description"
                                                    defaultValue={priceEdit.description}
                                                    {...editPrices('description')} error={editErrors.description ? true : false} />



                                                <Typography variant="inherit" color="error">
                                                    {editErrors.description?.message.substring(0, 70)}
                                                </Typography>
                                            </FormControl>

                                        </Grid>



                                    </Grid>



                                </CardContent>
                                <CardActions>


                                    <Grid container direction="row" spacing={2} className={classes.drawerFooter}>

                                         <Button
                                            variant="contained"
                                            color="primary" 
                                            size="small"
                                             type='submit'
                                             disabled={editIsSubmitting}
                                        >
                                            Update
                                        </Button>

                                        <Button variant="contained" size="small"   color="secondary" onClick={toggleDrawer(anchor, false)}>  Close  </Button>

                                   
                                    </Grid>

                                </CardActions>
                            </form>
                        </Card>


                    </List>

                </Box>
            </>

            : dataList === "ADD" ? <>
                <Box sx={{ width: '100%' }} role="presentation"  >
                    <List>

                        <Card className={classes.root} >

                            <CardHeader >

                            <Grid container direction="row" spacing={1} className={classes.drawerHeader }>

<Typography variant="subtitle1">   Add New Plan  </Typography> 

<Grid  className={classes.drawerClose}>
    
    <CloseIcon className={classes.closeBtn} size="14px" onClick={toggleDrawer(anchor, false)} /> 

  </Grid>


</Grid>  
 
                            </CardHeader >
                            <CardContent>

                                <Grid container direction="row" spacing={2}>


                                    <Grid item lg={4} sm={4} md={4} xs={12}>

                                        <InputLabel shrink htmlFor="title"> Pricing Plan</InputLabel>
                                        <FormControl className={classes.margin}>

                                            <TextField InputProps={{ disableUnderline: true }} classes={{ root: classes.customTextField }} size="small" placeholder='Enter Pricing Plan' id="plan"
                                                {...register('title')} error={errors.title ? true : false} />

                                            <Typography variant="inherit" color="error">
                                                {errors.title?.message}
                                            </Typography>
                                        </FormControl>

                                    </Grid>

                                    <Grid item lg={4} sm={4} md={4} xs={12}>

                                        <InputLabel shrink htmlFor="amount"> Amount </InputLabel>
                                        <FormControl className={classes.margin}>

                                            <TextField InputProps={{ disableUnderline: true }} type="number" classes={{ root: classes.customTextField }} size="small" placeholder='Enter Price' id="amount"
                                                {...register('amount')} error={errors.amount ? true : false} />

                                            <Typography variant="inherit" color="error">
                                                {errors.amount?.message}
                                            </Typography>
                                        </FormControl>

                                    </Grid>

                                    <Grid item lg={4} sm={4} md={4} xs={12}>

                                        <InputLabel shrink htmlFor="numberOfMessages"> Number Of Messages </InputLabel>
                                        <FormControl className={classes.margin}>

                                            <TextField InputProps={{ disableUnderline: true }} type="number" classes={{ root: classes.customTextField }} size="small" placeholder='Enter Number of Meassages' id="numberOfMessages"
                                                {...register('numberOfMessages')} error={errors.numberOfMessages ? true : false} />

                                            <Typography variant="inherit" color="error">
                                                {errors.numberOfMessages?.message}
                                            </Typography>
                                        </FormControl>

                                    </Grid>
                                
                                    <Grid item xs={12}>

                                        <InputLabel shrink htmlFor="description">
                                            Description
                                        </InputLabel>
                                        <FormControl className={classes.margin}>

                                            <TextField InputProps={{ disableUnderline: true }} multiline rows={4} classes={{ root: classes.customTextField }} size="small" placeholder='Enter Description' id="description"
                                                {...register('description')} error={errors.description ? true : false} />


                                            <Typography variant="inherit" color="error">
                                                {errors.description?.message.substring(0, 70)}
                                            </Typography>
                                        </FormControl>

                                    </Grid>

                                </Grid>



                            </CardContent>
                            <CardActions>


                                <Grid container direction="row" spacing={2} className={classes.drawerFooter}>

                                  
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={handleSubmit(handleAdd)}
                                    >
                                        ADD
                                    </Button>
                                    <Button variant="contained" size="small"   color="secondary" onClick={toggleDrawer(anchor, false)}>  Close  </Button>

                                </Grid>
                            </CardActions>
                        </Card>



                    </List>

                </Box> </>

                : dataList === "VIEW" ?

                    <>

                        <Box sx={{ width: '100%' }} role="presentation"  >
                            <List>



                                <Card className={classes.root} >
                                    <CardHeader >


                                    <Grid container direction="row" spacing={1} className={classes.drawerViewHeader }>

<Typography variant="subtitle1">  View Plan  </Typography> 

<Grid  className={classes.drawerViewClose}>
    
    <CloseIcon className={classes.closeBtn} size="14px" onClick={toggleDrawer(anchor, false)} /> 

  </Grid>


</Grid>  

                                     
                                    </CardHeader >

                                    <CardContent className={classes.drawerViewContent}>
                                             <Grid container direction="row" spacing={2}>
                                             <Grid item xs={12} sm={6} md={6} lg={6}  >  <Typography className={classes.boldtext}>  Prining Plan </Typography>  </Grid>
                                             <Grid item xs={12} sm={6} md={6} lg={6}  >   {priceEdit.title}
                                                </Grid>
                                            
                                                <Grid item xs={12} sm={6} md={6} lg={6}  >  <Typography className={classes.boldtext}> Amount </Typography>   </Grid>
                                                <Grid item xs={12} sm={6} md={6} lg={6}  >    {priceEdit.amount}
                                                </Grid>
                                           
                                                <Grid item xs={12} sm={6} md={6} lg={6}  >  <Typography className={classes.boldtext}> Number of Messages </Typography>  </Grid>
                                                <Grid item xs={12} sm={6} md={6} lg={6}  > {priceEdit.numberOfMessages}
                                                </Grid>
                                            
                                                <Grid item xs={12} sm={6} md={6} lg={6}  > <Typography className={classes.boldtext}>  Descriptions</Typography>  </Grid>
                                                <Grid item xs={12} sm={6} md={6} lg={6}  > {priceEdit.description}                                                   </Grid>
                                            
                                                <Grid item xs={12} sm={6} md={6} lg={6}  > <Typography className={classes.boldtext}> Posted Date</Typography>   </Grid>
                                                <Grid item xs={12} sm={6} md={6} lg={6}  >  {moment(priceEdit.createdAt).format('DD-MM-YYYY')}
                                                </Grid>
                                            </Grid>

                                        
                                    </CardContent>
                                    <CardActions>
                                        <Grid container direction="row" spacing={2} className={classes.drawerFooter} >

                                            <Button variant="contained" size="small"   color="secondary" onClick={toggleDrawer(anchor, false)}>  Close  </Button>

                                        </Grid>
                                    </CardActions>
                                </Card>
                            </List>

                        </Box>
                    </>

                    :
                    ""


    );


    return (
        <>
                <Grid container direction="row" spacing={2} className={classes.heading}>

                <Grid item xs={6}    >    <PageTitle title="Plans" />  </Grid>

                <Grid item xs={6}   className={classes.drawerClose} >

                    <Button variant="contained" size="small" color="primary" onClick={(e) => { 
                         setDataList("ADD");
                        reset(); 
                        setState({ ...state, "right": true});  
                    }}>Add New Plan</Button>


                    <SwipeableDrawer
                        anchor="right"
                        open={state["right"]}
                        onClose={toggleDrawer("right", false)}
                        onOpen={toggleDrawer("right", true)}
                        classes={{ paper: classes.drawer }}
                    >
                        {list("right")}

                    </SwipeableDrawer>


                </Grid>
            </Grid>



            <Grid container spacing={2} >

                <Grid item xs={12}>

                    <MUIDataTable

                        options={{
                            pagination: false,
                            sort: false,
                            selectableRows: "none",
                            search: false,
                            filter: false,
                            print: false,
                            download: false,
                            customToolbar: () => <HeaderElements />,
                            responsive: mobileQuery===true? 'vertical' : 'standard',
                            textLabels: {
                                body: {
                                  noMatch: 'Oops! Matching record could not be found',
                                }
                              },
                        }}
                        columns={[

                            {
                                name: "S.No",

                            },
                            {
                                name: "Pricing Plan",

                            },
                            {
                                name: "Number of Messages",

                            },

                            {
                                name: "Amount",

                            },

                            {
                                name: "Description",

                            },
                         
                            {
                                name: "Actions",

                            },
                            {
                                name: "Posted Date",

                            },

                        ]}

                        data={priceData.map((item, index) => {
                            return [
                                <>{currerntPage !== 0 ? 10 * currerntPage - 10 + index + 1 : index + 1} </>,
                                item.title,
                                item.numberOfMessages,
                                item.amount,
                                item.description?.length > 30 ? item.description.substring(0, 70) + "...." : item.description,
                             

                                <>
                                    <Grid container className={classes.space} >
                                        <Grid item xs className={classes.toolAlign}>
                                            <Tooltip title="Edit Price" placement="bottom" aria-label="edit">
                                                <EditIcon  className={classes.toolIcon}
                                                    onClick={(e) => {
                                                        editreset();
                                                        setDataList("EDIT");
                                                        setPriceEdit({
                                                            ...priceEdit,
                                                            "id": item.id,
                                                            "title": item.title,
                                                            "numberOfMessages": item.numberOfMessages,
                                                            "amount": item.amount,
                                                            "description": item.description,
                                                        })
                                                        setState({ ...state, "right": true}); 
                                                    }} />
                                            </Tooltip>

                                            <Tooltip title="View Price" placement="bottom" aria-label="view">
                                                <ViewIcon  className={classes.toolIcon}
                                                    onClick={(e) => {
                                                        editreset();
                                                        setDataList("VIEW");
                                                        setPriceEdit({
                                                            ...priceEdit,
                                                            "id": item.id,
                                                            "title": item.title,
                                                            "numberOfMessages": item.numberOfMessages,
                                                            "amount": item.amount,
                                                            "description": item.description,
                                                        })
                                                        setState({ ...state, "right": true}); 
                                                }} />
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </>,
                                   moment(item.createdAt).format('DD-MM-YYYY'),
                            ]
                        })}
                    />


                    <Grid container spacing={2} className={classes.pagination}>

                        <TablePagination
                            rowsPerPageOptions={[50]}
                            component="div"
                            count={count}
                            rowsPerPage={10}
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
 