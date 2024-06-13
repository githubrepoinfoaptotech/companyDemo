import React, { useEffect, useRef, useState } from 'react';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import useStyles from "./styles"
import {
  Grid, Box, Button, Avatar, List, ListItem, SwipeableDrawer, Paper,
  FormControl, InputBase, IconButton, Typography, Backdrop, Popover, CircularProgress, Drawer, ListItemAvatar, ListItemIcon, Divider, Tabs, Tab, Modal,
  TextField
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import GetAppIcon from '@material-ui/icons/GetApp';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Highlighter from "react-highlight-words";
import io from "socket.io-client";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DescriptionIcon from '@material-ui/icons/Description';
import axios from 'axios';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import CloseIcon from '@material-ui/icons/Close';
import {jwtDecode} from "jwt-decode";
import red from '@material-ui/core/colors/red';


function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


 
function a11yProps(index) {

  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


const getMuiTheme = () => createTheme({

  overrides: {
    MuiBox: {
      root: {
        padding: '0px !important'
      }
    },
    MuiTab: {
      root: {
        maxWidth: '100% !important'
      }
    },
    MuiInputBase: {
      input: {
        padding: '10px !important'
      },
      root: {
        width: '100%'
      }
    },
    MuiFormControl: {
      root: {
        width: '100% !important'
      }
    },
    MuiTypography: {
      subtitle1: {
        fontWeight: "500",
        fontFamily: '"Satoshi"',
      },
      body1: {
        color: "#121224",
        fontFamily: '"Satoshi"',
        fontSize: "14px",
      },
      body2: {
        color: "#121224",
        fontFamily: '"Satoshi"',
        fontSize: "13px",
      }
    },

    MuiPaper: {
      rounded: {
        borderRadius: "30px"
      }
    },
    MuiDrawer: {
      paperAnchorBottom: {
        width: "50%",
        left: "30%"
      }
    },
    MuiButton: { 

      root:{ 
          fontFamily: '"Satoshi !important"',
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3) !important",
          "@media (max-width:959.95px)": {
            fontSize: "10px !important",
          }, 
      },
      label: {
       fontFamily: '"Satoshi" !important',
        fontSize: "14px",
        "@media (max-width:959.95px)": {
          fontSize: "10px !important",
        },
      },
      containedPrimary:{ 
        backgroundColor: "#064be2 !important",   
        textTransform:  "initial !important", 
        '&:active':{
          backgroundColor: "#064be2 !important",
          color:"#fff !important",
        },
        '&:hover':{
          backgroundColor: "#064be2 !important",
          color:"#fff !important",
        },
        '&:disabled':{
          backgroundColor: "#064be2c7 !important",
          color:"#fff !important",
        }
    },
    containedSizeSmall:{
      textTransform:  "initial !important", 
      padding:  "4px 10px !important",
      fontWeight: "300 !important",
    },
    containedSecondary:{ 
      backgroundColor: red[500] +"!important",
      '&:active':{
        backgroundColor: red[500] +"!important",
        color:"#fff !important",
      },
      '&:hover':{
        backgroundColor: red[500] +"!important",
        color:"#fff !important",
      }
    },
    },
  },

});


const Singlechat = (props) => {

  const [loader, setLoader] = useState(false);


  const user_search = props.location.search;

  const params_id = new URLSearchParams(user_search).get('user_id');

  const token = localStorage.getItem("token");

  const decode = jwtDecode(token);



  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);


  const [view, setView] = useState("");
  const history = useHistory();


  const [text, setText] = useState("");
  const [messageText, setMessageText] = useState("");

  const messageRef = useRef(null)
  const fileRef = useRef(null);
  const [Id, setId] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const searchDrawerOpen = () => {
    setSearchOpen(true);
  };

  const searchDrawerClose = () => {
    setSearchOpen(false);
  };

  const handleImageClick = () => {
    hiddenImageInput.current.click();
  };

  const handleDocumentClick = () => {
    hiddenFileInput.current.click();
  };

  const list = (anchor, Id) => (
   
    <Box sx={{ width: '100%' }} role="presentation"  >
    
          <div className={classes.drawerHeader}>
            <CloseIcon size="14px" onClick={toggleDrawer(anchor, false)} />
    
          </div>
    
    
          <List className={classes.messagearea}    >
    
            <div className={classes.messageRight} >
              <PersonPinIcon className={classes.messageRightAvatar} />
    
    
              <div className={ imageValue !== null ? classes.messageRightImage : classes.messageRightFile }  >
    
                {imageValue !== null ?
                  <img src={URL.createObjectURL(imageValue)} className={classes.fullWidth} alt="chat_image" />
    
    
                  :
    
    
                  <List >
    
                    <ListItem>
                      <ListItemAvatar>
    
                        <DescriptionIcon className={classes.descriptionIcon} />
    
                      </ListItemAvatar>
                      <div className={classes.lgButton}> 
                      <ListItemText
                        primary={fileValue?.name}   />
                       </div>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <GetAppIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
    
                  </List>
                }
              </div>
    
    
    
            </div>
    
          </List>
    
    
          <form ref={fileRef} onSubmit={(e) => {
            e.preventDefault();
            sendFile(Id)
          }} className={classes.chatListBackGround} >
    
    
            <Paper className={classes.paper} >
    
    
            </Paper>
     
    
            <Button variant="contained"  type='submit' size="small"  
            className={classes.sendIconBtn} > Send</Button>
    
          </form>
    
          </Box>
      );
    

  const [fileValue, setFileValue] = React.useState(null);
  const [imageValue, setimageValue] = React.useState(null);

  const [state, setState] = useState({
    top: false,
    bottom: false,

  });

  const hiddenFileInput = useRef(null);
  const hiddenImageInput = useRef(null);

  const handleImageChange = e => {
    setimageValue(e.target.files[0]);

    setFileValue(null);
    setAnchorEl(null);

    setState({ ...state, "bottom": true });

  };

  const handleFileChange = e => {
    setimageValue(null);
    setFileValue(e.target.files[0]);
    setAnchorEl(null);
    setState({ ...state, "bottom": true });

  };



  const [imageUrl, setImageUrl] = React.useState(undefined);
  const [imageOpen, setImageOpen] = React.useState(false);


  const handleImageClose = () => {
    setImageOpen(false);
    setImageUrl(undefined);
  };

  const handleImageOpen = (url) => {
    setImageOpen(true);
    setImageUrl(url);
  };

  const toggleDrawer = (anchor, open) => (event) => {


    setState({ ...state, [anchor]: open });
  };


  const [profileList, setProfileList] = React.useState([]);


  const [foundUsers, setFoundUsers] = useState(profileList);
  const [messageUsers, setMessageUsers] = useState([]);


  const [conversations, setConversations] = React.useState([]);




  function getChatUsers() {

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER}chat/getChatUsers`,
      data: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },

    })
      .then(function (response) {

        if (response.data.status === true) {

          setProfileList(response.data.chatdata)
          setFoundUsers(response.data.chatdata);

        }

      })
  }



  function scroll() {

    const timeout = setTimeout(() => {
      const element = document.getElementById('section' + localStorage.getItem("user_id"));

      element.scrollIntoView({ behavior: 'smooth' });
    }, 500)

    return () => clearTimeout(timeout)


  }


  useEffect(() => {


    if (params_id !== null || params_id !== undefined) {


      axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER}chat/getOneChatUser`,
        data: { chatUserId: params_id },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },

      })
        .then(function (response) {

          if (response.data.status === true) {
            setProfileList(response.data.chatdata)
            setFoundUsers(response.data.chatdata);

          }

        })


      axios({
        method: 'get',
        url: `${process.env.REACT_APP_SERVER}chat/getChatUserMessages?user_id=` + params_id,
        data: {},
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },

      })
        .then(function (response) {

          setId(params_id);
          localStorage.setItem("user_id", params_id)

          if (response.data.status === true) {
            getmessageIni(params_id);


            setConversations(response.data.data);
            scroll();
          } else {
            setConversations([]);
          }

        })

    } else {


      axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER}chat/getChatUsers`,
        data: {},
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },

      })
        .then(function (response) {

          if (response.data.status === true) {

            setProfileList(response.data.chatdata)
            setFoundUsers(response.data.chatdata);

          }

        })
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])


  function getmessage(user_id) {


    axios({
      method: 'get',
      url: `${process.env.REACT_APP_SERVER}chat/getChatUserMessages?user_id=` + user_id,
      data: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },

    })
      .then(function (response) {

        setId(user_id);
        localStorage.setItem("user_id", user_id)

        if (response.data.status === true) {

          getmessageIni(user_id);

          setConversations(response.data.data);
          scroll();
        } else {
          setConversations([]);
        }

      })
    }




  function getmessageIni(user_id) {


    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER}chat/getIniChat`,
      data: {
        "chatUserId": user_id
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },

    })
      .then(function (response) {
        if (response.data.status === true) {
          if (response.data.data !== null) {
            setView("Message");

          }

        }

      })



  }


  function chatmessage(data) {

    if (data.from === localStorage.getItem("user_id")) {
      getmessage(localStorage.getItem("user_id"));
      getChatUsers();

    }

  }

  useEffect(() => {

    const socket = io.connect(`${process.env.REACT_APP_URL}`);

    socket.on('connnection', () => {
     // console.log('connected to server');
    })


    socket.on('message-recevied', (newOrders) => {

      chatmessage(newOrders);

    })


    socket.on("disconnect", () => {
   //   console.log("User Disconnected", socket.id);
    });
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const search = (e) => {
    const keyword = e.target.value;
    setMessageText(e.target.value);

    if (keyword !== '') {
      const results = conversations.filter((msg) => {
        return msg.caption?.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;

      });


      setMessageUsers(results);
    } else {
      setMessageUsers([]);

    }
  }




  function scrollDelay(id) {

    const timeout = setTimeout(() => {
      const element = document.getElementById('section' + id);

      element.scrollIntoView({ behavior: 'smooth' });
    }, 1000)

    return () => clearTimeout(timeout)


  }




  function sendFile(Id) {
    setLoader(true);

    var FormData = require('form-data');
    var data = new FormData();
    data.append('chatUserId', Id);
    data.append('file', imageValue !== null ? imageValue : fileValue);

    var url = "";

    if (imageValue !== null) {
      url = `${process.env.REACT_APP_SERVER}chat/sendImage`;
    } else {
      url = `${process.env.REACT_APP_SERVER}chat/sendDocument`;
    }

    var config = {
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      },
      data: data
    };

    axios(config)
      .then(function (result) {
        setLoader(false);

        scrollDelay(Id);
        getmessage(Id);
        setState({ ...state, "bottom": false });

      })

      .catch(function (error) {
        console.log(error);
      });
  }


  function sendMessage(Id) {
    setLoader(true);


    const form = messageRef.current
    var data = JSON.stringify({
      "chatUserId": Id,
      "message": `${form['text'].value}`
    });

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_SERVER}chat/sendMessage`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: data
    };

    axios(config)
      .then(function (result) {
        setLoader(false);

        scrollDelay(Id);
        getmessage(Id);
        form.reset();


      })


  }





  function TabList(props) {
    const { value, index, } = props;

    return (<>


      <Tab className={classes.fullWidth} label={
        <>
          <Grid className={classes.chatList}>

            <Avatar alt="Image" className={classes.chatListAvatar} />

            <Grid container direction="row" spacing={1} >
              <div  className={classes.space}  > 
              <Typography className={classes.userName} > {value.name}  </Typography> 
               <span className={classes.time} >  {value.chatUserMessages[0] !== undefined ? <><Typography variant="body2" className={classes.text} >{moment(value.chatUserMessages[0].createdAt).format('DD-MM-YYYY H:mm')} </Typography> </> : " "}    </span>
             </div>
 
             <div  className={classes.space}  > 

                {value.chatUserMessages[0] !== undefined ? <>  <Typography variant="body2" className={classes.userCaption}     > {value.chatUserMessages[0].caption !== null ? value.chatUserMessages[0].caption.substring(0, 10) : ""}... </Typography></>
                  : " "}
              
              <span className={classes.time} >   {value.chatUserMessages[0]?.from ?  value.chatUserMessages[0]?.isRead !== null ? <> 
                <Typography variant="body2" className={classes.chatListMessage}>1</Typography>  </> : "" : ""}
              </span>

            </div>
          </Grid>
          </Grid>
        </>}
        {...a11yProps(index)} key={index}
        onClick={(e) => { getmessage(value.id);
          setOpen({
            ...open, search:false, profile:false})
          }}


      />


    </>
    );
  }


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const opens = Boolean(anchorEl);
  const ids = open ? 'simple-popover' : undefined;

  const handleClick = () => {
    decode.role === "ADMIN"? 
    history.push("/app/admin_candidates") 
  :  decode.role === "RECRUITER"?
    history.push("/app/recruiter_candidates")
    : decode.role === "CLIENTCOORDINATOR"?
    history.push("/app/cc_candidates")
    :
    history.push("/app/others_candidates") 
  }

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <div className={classes.mainContent}>
          <Button variant="contained" size="small" onClick={ handleClick } className={classes.blue}><ArrowBackIosIcon size="small" className={classes.blueIcon} /> Back  </Button> 
        <div className={classes.main} >
          <Grid container className={classes.fullWidth}>
          <Grid item xs={12} md={3} lg={3} >
          <div className={classes.lgButton}> 

 

                <Divider />
                <Grid item xs={12} className={classes.paperContainer}>
                  <Paper sx={{ p: '2px 4px' }} className={classes.paper}>

                    <FormControl mt={4}>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        inputProps={{ 'aria-label': 'search' }}
                        variant="filled"
                        disabled
                      />

                    </FormControl>


                  </Paper>


                </Grid>
                <Divider />

                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical"
                  className={classes.leftSide}
                  TabIndicatorProps={{ style: { background: "none" } }}
                >


                  {foundUsers.map((row, index, arr) => {

                    return (
                      <div key={index}>
                        <TabList value={row} index={index} />

                        <Divider />
                      </div>
                    )
                  })
                  }
                </Tabs>
                        
 
          </div>

            </Grid>
            <Grid item xs={12} md={9} lg={9} className={classes.contentShift}>
              {foundUsers.filter(item => item.id === Id).map((row, index, arr) => {


                return (
                  <>
                    <TabPanel value={value} index={index} >

                      <List className={classes.list}>
                        <ListItem key={index + 1} >
                          <ListItemIcon className={classes.listItemIcon} onClick={handleDrawerOpen}>
                            <Avatar alt="Image" src="" sx={{ bgcolor: "white" }} /><Typography className={classes.avatarTitle} >{row.name}  </Typography>
                          </ListItemIcon>
                        </ListItem>
                        <ListItem key={"TabKey"+index + 1} className={classes.listItem} >

                          <IconButton aria-label="menu" className={classes.searchOutLine} onClick={searchDrawerOpen}>
                            <SearchOutlined />
                          </IconButton>

                        </ListItem>
                      </List>


                      <List className={classes.messagearea}    >

                        {conversations.map((row, index, arr) => {
                          return (
                            <>
                              {row.to === null && row.type !== "location" ? <>

                                <div className={classes.message}>
                                  <PersonPinIcon className={classes.messageAvatar} />
                                  <div className={row.caption?.length < 100 ? classes.messagebubble : classes.messagebubble1} >

                                    {row.type === "text" ?

                                      <Highlighter
                                        highlightClassName="YourHighlightClass"
                                        searchWords={[messageText]}
                                        autoEscape={true}
                                        textToHighlight={row.caption}
                                      />


                                      : row.type === "image" ?

                                        <>
                                          <img src={ row.chatMedium?.path} className={classes.fullWidth} onClick={() => handleImageOpen(row.chatMedium?.path)} alt="chat_image" />

                                        </>
                                        : row.type === "audio" ?

                                          <audio src={ row.chatMedium?.path} controls className={classes.fullWidth} />

                                          : row.type === "document" ?
                                            <>
                                              <a  href={  row.chatMedium?.path} target="_blank" rel="noreferrer" download>
                                                <iframe src={`https://docs.google.com/a/umd.edu/viewer?url=${row.chatMedium?.path}&embedded=true`} title="File" width="100%" height="500" > </iframe>
                                                <br />

                                                <List >

                                                  <ListItem>
                                                    <ListItemAvatar>

                                                      <DescriptionIcon className={classes.descriptionIcon} />

                                                    </ListItemAvatar>
                                                    <ListItemText
                                                      primary={row.chatMedium?.originalFileName}

                                                    />
                                                    <ListItemSecondaryAction>
                                                      <IconButton edge="end" aria-label="delete">
                                                        <GetAppIcon />
                                                      </IconButton>
                                                    </ListItemSecondaryAction>
                                                  </ListItem>

                                                </List></a>

                                            </>
                                            : row.type === "contacts" ?
                                              <>

                                                <Grid className={classes.chatList}>


                                                  <Grid container direction="row" spacing={1} >
                                                    <Grid item xs={12} className={classes.contactName} > <Typography className={classes.contactNumber}> {row.contactName}  </Typography>  </Grid>


                                                    <Grid item xs={12} className={classes.contactName}  >

                                                      <Typography variant="body2" className={classes.contactNumber}>  {row.contactNumber}  </Typography>

                                                    </Grid>


                                                  </Grid>
                                                </Grid>


                                              </> : row.type === "video" ?
                                                <>
                                                  <video controls width={"100%"}>
                                                    <source src={ row.chatMedium?.path} type="video/mp4" />

                                                  </video>
                                                </> : row.type === "sticker" ?

                                                  <>
                                                    <img src={  row.chatMedium?.path} className={classes.fullWidth} alt="chat_image" />

                                                  </>


                                                  : ""}

                                    <Grid container direction="row" spacing={2} className={classes.messageStatus}>
                                      <Grid item xs={6} className={classes.bubbleSpan} >   {moment(row.createdAt).format('DD-MM-YYYY H:mm')}</Grid >
                                      <Grid item xs={6} className={classes.blueTick} >   {row.status === "delivered" ? <DoneAllIcon color="disabled" /> : row.status === "read" ? <DoneAllIcon color="primary" /> : ""}</Grid >

                                    </Grid>
                                  </div>
                                </div>
                              </>
                                : row.from === null && row.type !== "location" ? <>
                                  <div className={classes.messageRight} >
                                    <PersonPinIcon className={classes.messageRightAvatar} />


                                    <div className={row.caption?.length < 100 ? classes.messageRightBubble : classes.messageRightBubble1} >

                                      {row.type === "text" ? <Highlighter
                                        highlightClassName="YourHighlightClass"
                                        searchWords={[messageText]}
                                        autoEscape={true}
                                        textToHighlight={row.caption}
                                      /> : row.type === "image" ?

                                        <>
                                          <img src={  row.chatMedium?.path} className={classes.fullWidth} onClick={() => handleImageOpen(row.chatMedium?.path)} alt="chat_image" />


                                        </>
                                        : row.type === "audio" ?

                                          <audio src={ row.chatMedium?.path} controls className={classes.fullWidth}/>
                                          : row.type === "document" ?
                                            <>
                                              <a href={  row.chatMedium?.path} target="_blank" rel="noreferrer" download>
                                                <iframe src={`https://docs.google.com/a/umd.edu/viewer?url=${row.chatMedium?.path}&embedded=true`} title="File" width="100%" height="200" > </iframe>
                                                <br />

                                                <List >

                                                  <ListItem>
                                                    <ListItemAvatar>

                                                      <DescriptionIcon className={classes.descriptionIcon} />

                                                    </ListItemAvatar>
                                                    <ListItemText
                                                      primary={row.chatMedium?.originalFileName}

                                                    />
                                                    <ListItemSecondaryAction>
                                                      <IconButton edge="end" aria-label="delete">
                                                        <GetAppIcon />
                                                      </IconButton>
                                                    </ListItemSecondaryAction>
                                                  </ListItem>

                                                </List></a>
                                            </>
                                            : row.type === "contacts" ?
                                              <>

                                                <Grid className={classes.chatList}>


                                                  <Grid container direction="row" spacing={1} >
                                                    <Grid item xs={12} className={classes.contactName}> <Typography className={classes.contactNumber}> {row.contactName}  </Typography>  </Grid>


                                                    <Grid item xs={12} className={classes.contactName}  >

                                                      <Typography variant="body2" className={classes.contactNumber}>  {row.contactNumber}  </Typography>

                                                    </Grid>


                                                  </Grid>
                                                </Grid>


                                              </> : row.type === "video" ?
                                                <>
                                                  <video controls>
                                                    <source src={ row.chatMedium?.path} type="video/mp4" />

                                                  </video>
                                                </>

                                                : row.type === "sticker" ?

                                                  <>
                                                    <img src={ row.chatMedium?.path} className={classes.fullWidth} alt="chat_image" />

                                                  </>


                                                  : ""}


                                      <Grid container direction="row" spacing={2} className={classes.messageStatus}>
                                        <Grid item xs={6} className={classes.bubbleSpan}  >   {moment(row.createdAt).format('DD-MM-YYYY H:mm')}</Grid >
                                        <Grid item xs={6} className={classes.blueTick} >   {row.status === "delivered" ? <DoneAllIcon color="disabled" /> : row.status === "read" ? <DoneAllIcon color="primary" /> : ""}</Grid >

                                      </Grid>

                                    </div>



                                  </div>
                                </>


                                  : ""}


                            </>
                          )
                        })}

                        <Drawer
                          className={classes.drawer}
                          variant="persistent"
                          anchor="right"
                          open={open}
                          classes={{
                            paper: classes.drawerPaper,
                          }}
                        >
                          <div className={classes.drawerHeader}>
                            <IconButton onClick={handleDrawerClose}>
                              <ChevronLeftIcon />
                            </IconButton>
                            <Typography variant="inherit" color="textSecondary">Contact Info</Typography>
                          </div>
                          <Divider />
                          <List className={classes.contactprofile}>
                            <Avatar alt="Image" src="" className={classes.contactprofileImg} />
                          </List>
                          <List className={classes.contactDetails}>
                            <Typography variant="h6" color="textSecondary" className={classes.title} >{row.name}</Typography>
                            <Typography variant="body1" color="textSecondary" >{row.phoneNumber}</Typography>
                          </List>

                        </Drawer>


                        <Drawer
                          className={classes.drawer}
                          variant="persistent"
                          anchor="right"
                          open={searchOpen}
                          classes={{
                            paper: classes.searchdrawerPaper,
                          }}
                        >
                          <div className={classes.drawerHeader}>
                            <IconButton onClick={searchDrawerClose}>
                              <ChevronLeftIcon />
                            </IconButton>
                            <Typography variant="inherit" color="textSecondary">Search</Typography>
                          </div>
                          <Divider />

                          <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            inputProps={{ 'aria-label': 'search' }}
                            placeholder="Enter Search"
                            onChange={search}
                            defaultValue={messageText}
                            variant="filled"
                          />

                          <Grid className={classes.messageAreaSingle}  >

                            {messageUsers.filter(item => item.type === "text").map((row, index, arr) => {

                              return (
                                <>    {row.to === null ? <>

                                  <div className={classes.message}>
                                    <PersonPinIcon className={classes.messageAvatar} />
                                    <div className={classes.messagebubble} >


                                      <Highlighter
                                        highlightClassName="YourHighlightClass"
                                        searchWords={[messageText]}
                                        autoEscape={true}
                                        textToHighlight={row.caption}
                                      />


                                      <Grid container direction="row" spacing={2} className={classes.messageStatus}>
                                        <Grid item xs={6} className={classes.bubbleSpan}  >   {moment(row.createdAt).format('DD-MM-YYYY H:mm')}</Grid >
                                        <Grid item xs={6} className={classes.blueTick} >   {row.status === "delivered" ? <DoneAllIcon color="disabled" /> : row.status === "read" ? <DoneAllIcon color="primary" /> : ""}</Grid >

                                      </Grid>
                                    </div>
                                  </div>
                                </>
                                  : row.from === null ? <>
                                    <div className={classes.messageRight}>
                                      <PersonPinIcon className={classes.messageRightAvatar} />


                                      <div className={classes.messageRightBubble1} >

                                        <Highlighter
                                          highlightClassName="YourHighlightClass"
                                          searchWords={[messageText]}
                                          autoEscape={true}
                                          textToHighlight={row.caption}
                                        />
                                        <Grid container direction="row" spacing={2} className={classes.messageStatus}>
                                          <Grid item xs={6} className={classes.bubbleSpan}  >   {moment(row.createdAt).format('DD-MM-YYYY H:mm')}</Grid >
                                          <Grid item xs={6} className={classes.blueTick} >   {row.status === "delivered" ? <DoneAllIcon color="disabled" /> : row.status === "read" ? <DoneAllIcon color="primary" /> : ""}</Grid >

                                        </Grid>

                                      </div>



                                    </div>
                                  </>
                                    : ""}</>
                              );
                            })}

                          </Grid>
                        </Drawer>


                        <div id={"section" + localStorage.getItem("user_id")}  > </div>

                      </List>

                      <Grid container className={classes.foot} >
                        <form ref={messageRef}   className={classes.fullWidth} onSubmit={(e) => {
                          e.preventDefault();
                          sendMessage(Id)
                        }} >

                          {view === "Message" ?
                            <> 
                            
                            <Grid container direction="row" spacing={2}  className={classes.space}>
                            <Grid item  xs={12} lg={10}>   <Paper className={classes.paper} >

                              <InputBase required={true} inputProps={{ 'aria-label': 'search' }} placeholder="Enter Message Here"
                                defaultValue={text} onChange={e => setText(e.target.value)} name='text' />

                            </Paper>
                            </Grid>

<Grid item xs={12} lg={2}  className={classes.drawerClose} > 
                              <Button aria-describedby={ids} variant="filled" color="primary"  className={classes.button}  onClick={handlePopoverClick}>
                                <AttachFileIcon color="primary" />
                              </Button>

                             
                              <Button type='submit' color="primary"  className={classes.button}  ><SendIcon /></Button>
                              </Grid>
                              </Grid>
                              <Popover
                                id={ids}
                                open={opens}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                                transformOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                                }}
                              >


                                <Grid container direction="row" className={classes.fullWidth + " " + classes.center}>
                                  <Grid item xs={6} className={classes.photoLibrary} onClick={(e) => { handleImageClick() }}  >
                                    <PhotoLibraryIcon className={classes.descriptionIcon} /> <br />
                                    <input
                                      type="file"
                                      ref={hiddenImageInput}
                                      onChange={handleImageChange}
                                      className={classes.nothing}

                                      accept="image/*"
                                    /> Picture</Grid>

                                  <Grid item xs={6} className={classes.photoLibrary} onClick={(e) => { handleDocumentClick() }}  >
                                    <DescriptionIcon className={classes.descriptionIcon} />
                                    <input
                                      type="file"
                                      ref={hiddenFileInput}
                                      onChange={handleFileChange}
                                      className={classes.nothing}

                                      accept=".doc,.docx,.pdf,application/msword"
                                    /> Document</Grid>

                                </Grid>


                              </Popover>

                            </>
                            :

                            <>
                              <Grid container direction="row" spacing={2}>
                              <Grid item  xs={12} lg={10}>
                            <TextField  multiline maxRows={5} minRows={1} disabled={true}  inputProps={{ 'aria-label': 'search',  }} 
                            value={"This is your first message for this contact today use general_message to start chat"} name='text' />

                            </Grid>
                                <Grid item xs={12} lg={2}  className={classes.center} > 
                                  <Button color="primary" onClick={ handleClick } variant="contained" size="small" > Send Here</Button>
                                </Grid>
                              </Grid>
                            </>}


                        </form>
                      </Grid>

                      <SwipeableDrawer

                        anchor="bottom"
                        open={state["bottom"]}
                        onClose={toggleDrawer("bottom", false)}
                        onOpen={toggleDrawer("bottom", true)}

                      >
                        {list("bottom", Id)}
                      </SwipeableDrawer>



                    </TabPanel>
                  </>

                );
              })}



              <Modal
                onClose={handleImageClose}
                open={imageOpen}
              >
                <div className={classes.modalSize}>
                  <img src={`${process.env.REACT_APP_URL}` + imageUrl} className={classes.modalImage} alt="chat_image" />
                </div>
              </Modal>


            </Grid>
          </Grid>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={loader}  >
        <CircularProgress color="inherit" />
      </Backdrop>

    </MuiThemeProvider>




  );
}

export default Singlechat;