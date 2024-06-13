import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import useStyles from "./styles";

import { useHistory } from "react-router-dom";
import { Button, InputBase, Paper, TextField, Backdrop, CircularProgress } from '@material-ui/core/';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
 
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import DescriptionIcon from '@material-ui/icons/Description';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import GetAppIcon from '@material-ui/icons/GetApp';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import axios from 'axios';
import Highlighter from "react-highlight-words";
import io from "socket.io-client";
import red from '@material-ui/core/colors/red';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {jwtDecode} from "jwt-decode";


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
       fontFamily: '"Satoshi" !important',
      },
      body1: {
        color: "#121224",
       fontFamily: '"Satoshi" !important',
        fontSize: "14px",
      },
      body2: {
        color: "#121224",
       fontFamily: '"Satoshi" !important',
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





const Home = (props) => {

  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);


  const [state, setState] = useState({
    top: false,
    bottom: false,

  });
  const toggleDrawer = (anchor, open) => (event) => {


    setState({ ...state, [anchor]: open });
  };


  const handleImageClick = () => {
    hiddenImageInput.current.click();
  };

  const handleDocumentClick = () => {
    hiddenFileInput.current.click();
  };



  const [value, setValue] = useState(0);
  const [open, setOpen] = useState({
    profile: false,
    search: false,
  });

  const [view, setView] = useState("File");
  const history = useHistory();

  const [tabOpen, setTabOpen] = useState(false); 

 
  const [text, setText] = useState("");
  const [messageText, setMessageText] = useState("");

  const [searchValue, setSearchValue] = useState("");

  const messageRef = useRef(null);
  const fileRef = useRef(null);

  const searchRef = useRef(null);

  const hiddenFileInput = useRef(null);
  const hiddenImageInput = useRef(null);

  const [Id, setId] = useState("");



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 


  const [fileValue, setFileValue] = useState(null);
  const [imageValue, setimageValue] = useState(null);



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
  const [imageUrl, setImageUrl] = useState(undefined);
  const [imageOpen, setImageOpen] = useState(false);


  const handleImageClose = () => {
    setImageOpen(false);
    setImageUrl(undefined);
  };

  const handleImageOpen = (url) => {
    setImageOpen(true);
    setImageUrl(url);
  };


  const [profileList, setProfileList] = useState([]);


  const [foundUsers, setFoundUsers] = useState([]);
  const [messageUsers, setMessageUsers] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const opens = Boolean(anchorEl);
  const ids = open ? 'simple-popover' : undefined;

  const [conversations, setConversations] = useState([]);

  useEffect(() => {

    setLoader(true);
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
          setLoader(false);

          setProfileList(response.data.chatdata)
          setFoundUsers(response.data.chatdata);

        }

      })


  }, [token])






  function getChatUsers() {
    setLoader(true);

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
          setLoader(false);

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


  function getmessage(user_id) {

    setLoader(true);
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
        setLoader(false);
     
        setMessageText("");
        setMessageUsers([]);
       // searchRef.current.reset();
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
          if (response.data.data === null) {
            setView("undefined");
          } else {
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
      //console.log('connected to server');
    })


    socket.on('message-recevied', (newOrders) => {

      chatmessage(newOrders);

    }) 
    socket.on("disconnect", () => {
     // console.log("User Disconnected", socket.id);
    });

 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filter = () => {
    const keyword = searchValue;

    if (keyword !== '') {

      setLoader(true);
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER}chat/searchChat`,
        data: { "search": searchValue },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },

      })
        .then(function (response) {

          if (response.data.status === true) {


            setFoundUsers(response.data.data);

          } else {

            setConversations([]);
          }
          setLoader(false);

        })



    } else {
      setFoundUsers(profileList);
    }
  }


  const search = (e) => {
    const keyword = e.target.value;
    setMessageText(e.target.value);

    if (keyword !== '') {
      setLoader(true);

      const results = conversations.filter((msg) => {
        return msg.caption?.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;

      });

      setLoader(false);

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





  function TabList(props) {
    const { value, index } = props;

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

onClick={(e) => { 
  getmessage(value.id); 
  setTabOpen(true);
  setOpen({
    ...open, search:false, profile:false})
   
 }}

        {...a11yProps(index)} key={index}
      
 
      />


    </>
    );
  }



  return (
    <MuiThemeProvider theme={getMuiTheme()}>

      <div className={classes.mainContent}>
        <div className={classes.main} >
      
          <Grid container className={classes.fullWidth}>
          <Grid item xs={12} sm={5} lg={3} >
          { tabOpen === false?
<> 
              
         
                <div className={classes.smButton}> 

                <Divider />
                <Grid item xs={12} className={classes.paperContainer}>
                  <Paper sx={{ p: '2px 4px' }} className={classes.paper}>

                    <FormControl mt={4}>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        inputProps={{ 'aria-label': 'search' }}

                        onChange={(e) => { setSearchValue(e.target.value); }}
                        variant="filled"
                      />

                    </FormControl>

                    <IconButton aria-label="menu" className={classes.searchOutLine} onClick={(e) => filter()}>
                      <SearchOutlined />
                    </IconButton>

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
                        <TabList value={row} index={index }  />

                        <Divider />
                      </div>
                    )
                  })
                  }
                </Tabs>
                
</div>
             
</>
            : ""}

<div className={classes.lgButton}> 
                <Divider />
                <Grid item xs={12} className={classes.paperContainer}>
                  <Paper sx={{ p: '2px 4px' }} className={classes.paper}>

                    <FormControl mt={4}>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        inputProps={{ 'aria-label': 'search' }}

                        onChange={(e) => { setSearchValue(e.target.value) }}
                        variant="filled"
                      />

                    </FormControl>

                    <IconButton aria-label="menu" className={classes.searchOutLine} onClick={(e) => filter()}>
                      <SearchOutlined />
                    </IconButton>

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
                        <TabList value={row} index={index}   />

                        <Divider />
                      </div>
                    )
                  })
                  }
                </Tabs>
                </div>
            </Grid> 
          
            { tabOpen === true?
            <> 
            <Grid item xs={12} sm={7} lg={9}  className={classes.contentShift}>

 
              {foundUsers.filter(item => item.id === Id).map((row, index, arr) => {

                return (
                  <>
                    <TabPanel value={value} index={index} >

                      <List className={classes.list}>
                        <ListItem key={index + 1} >
                        <ArrowBackIosIcon  className={classes.blueIcon + " " + classes.a} onClick={(e)=>{  setTabOpen(false);  }} />

                          <ListItemIcon className={classes.listItemIcon}  onClick={() =>  setOpen({ ...open, profile:true})} >
                            <Avatar alt="Image" src="" sx={{ bgcolor: "white" }} /><Typography className={classes.avatarTitle}>{row.name}  </Typography>
                          </ListItemIcon>
                        </ListItem>
                        <ListItem key={"TabKey"+index + 1} className={classes.listItem} >

                          <IconButton aria-label="menu" className={classes.searchOutLine} onClick={() =>  setOpen({
                            ...open, search:true})}>
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
                                          <img src={row.chatMedium?.path} className={classes.fullWidth}
                                            onClick={() => handleImageOpen(row.chatMedium?.path)} alt="chat_image" />

                                        </>
                                        : row.type === "audio" ?

                                          <audio src={row.chatMedium?.path} controls className={classes.fullWidth} />

                                          : row.type === "document" ?
                                            <>



                                              <a href={ row.chatMedium?.path} target="_blank" rel="noreferrer" download>
                                                <iframe src={`https://docs.google.com/a/umd.edu/viewer?url=${row.chatMedium?.path}&embedded=true`} title="File" width="100%" height="200" > </iframe>
                                                <br />

                                                <List >

                                                  <ListItem>
                                                    <ListItemAvatar>

                                                      <DescriptionIcon className={classes.descriptionIcon} />

                                                    </ListItemAvatar>
                                                    <div className={classes.lgButton}> 
                                                    <ListItemText
                                                      primary={row.chatMedium?.originalFileName}

                                                    />
                                                    </div>
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
                                                    <Grid item xs={12} className={classes.contactName}  > <Typography className={classes.contactNumber}> {row.contactName}  </Typography>  </Grid>


                                                    <Grid item xs={12} className={classes.contactName}  >

                                                      <Typography variant="body2" className={classes.contactNumber}    >  {row.contactNumber}  </Typography>

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
                                                    <img src={ row.chatMedium?.path} className={classes.fullWidth} alt="chat_image" />

                                                  </>


                                                  : ""}

                                    <Grid container direction="row" spacing={2} className={classes.space + " " + classes.paperContainer}>
                                      <div  className={classes.bubbleSpan}  >   {moment(row.createdAt).format('DD-MM-YYYY H:mm')}</div>
                                      <div className={classes.blueTick} >   {row.status === "delivered" ? <DoneAllIcon color="disabled" /> : row.status === "read" ? <DoneAllIcon color="primary" /> : ""} </div>

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
                                          <img src={ row.chatMedium?.path} className={classes.fullWidth} onClick={() => handleImageOpen(row.chatMedium?.path)} alt="chat_image" />


                                        </>
                                        : row.type === "audio" ?

                                          <audio src={ row.chatMedium?.path} controls className={classes.fullWidth} />
                                          : row.type === "document" ?
                                            <>
                                              <a  href={  row.chatMedium?.path} target="_blank" rel="noreferrer" download>
                                                <iframe src={`https://docs.google.com/a/umd.edu/viewer?url=${row.chatMedium?.path}&embedded=true`} title="File" width="100%" height="200" > </iframe>
                                                <br />

                                                <List >

                                                  <ListItem>
                                                    <ListItemAvatar>

                                                      <DescriptionIcon className={classes.descriptionIcon} />

                                                    </ListItemAvatar>
                                                    <div className={classes.lgButton}> 
                                                    <ListItemText
                                                      primary={row.chatMedium?.originalFileName}

                                                    />
                                                    </div>
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
                                                    <Grid item xs={12} className={classes.contactName} > <Typography className={classes.contactNumber} > {row.contactName}  </Typography>  </Grid>


                                                    <Grid item xs={12} className={classes.contactName} >

                                                      <Typography variant="body2" className={classes.contactNumber} >  {row.contactNumber}  </Typography>

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
 

                                      <Grid container direction="row" spacing={2} className={classes.space + " " + classes.paperContainer}>
                                        <div   className={classes.bubbleSpan}  >   {moment(row.createdAt).format('DD-MM-YYYY H:mm')}</div>
                                        <div   className={classes.blueTick} >   {row.status === "delivered" ? <DoneAllIcon color="disabled" /> : row.status === "read" ? <DoneAllIcon color="primary" /> : ""}</div>

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
                          
                          anchor="right"
                          open={open.profile}
                          classes={{
                            paper: classes.drawerPaper,
                          }}
                          
                          onClose={() =>  setOpen({
                            ...open, profle:false})}
                        >
                          <div className={classes.drawerHeader}>
                            <IconButton onClick={(e) =>  setOpen({
                            ...open, profile:false})}>
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
                          
                          anchor="right"
                          open={open.search}
                          classes={{
                            paper: classes.searchdrawerPaper,
                          }}
                          
                          onClose={() =>  setOpen({
                            ...open, search:false})}

                        >
                          <div className={classes.drawerHeader}>
                            <IconButton  onClick={() =>  setOpen({
                            ...open, search:false})}>
                              <ChevronLeftIcon />
                            </IconButton>
                            <Typography variant="inherit" color="textSecondary">Search</Typography>
                          </div>
                          <Divider />
                          <form ref={searchRef}>

                            <InputBase
                              sx={{ ml: 1, flex: 1 }}
                              inputProps={{ 'aria-label': 'search' }}
                              placeholder="Enter Search"
                              onChange={search}
                              variant="filled"
                            />


                          </form>

                          <Grid className={classes.messageAreaSingle} >

                            {messageUsers.filter(item => item.type === "text").map((row, index, arr) => {

                              return (
                                <>    {row.to === null ? <>

                                  <div className={classes.message}>
                                    <PersonPinIcon className={classes.messageAvatar} />
                                    <div className={classes.messagebubble1} >


                                      <Highlighter
                                        highlightClassName="YourHighlightClass"
                                        searchWords={[messageText]}
                                        autoEscape={true}
                                        textToHighlight={row.caption}
                                      />

 


                                      <Grid container direction="row" spacing={2} className={classes.space + " " + classes.paperContainer}>
                                        <div className={classes.bubbleSpan}  >   {moment(row.createdAt).format('DD-MM-YYYY H:mm')}</div>
                                        <div  className={classes.blueTick} >   {row.status === "delivered" ? <DoneAllIcon color="disabled" /> : row.status === "read" ? <DoneAllIcon color="primary" /> : ""}</div>

                                      </Grid>
                                    </div>
                                  </div>
                                </>
                                  : row.from === null ? <>
                                    <div className={classes.messageRight} >
                                      <PersonPinIcon className={classes.messageRightAvatar} />


                                      <div className={classes.messageRightBubble1} >

                                        <Highlighter
                                          highlightClassName="YourHighlightClass"
                                          searchWords={[messageText]}
                                          autoEscape={true}
                                          textToHighlight={row.caption}
                                        />

 

                                        <Grid container direction="row" spacing={2} className={classes.space + " " + classes.paperContainer}>
                                          <div className={classes.bubbleSpan}  >   {moment(row.createdAt).format('DD-MM-YYYY H:mm')} </div>
                                          <div className={classes.blueTick} >   {row.status === "delivered" ? <DoneAllIcon color="disabled" /> : row.status === "read" ? <DoneAllIcon color="primary" /> : ""} </div>

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
                       
                          {view === "Message" ?
                           <form ref={messageRef}  className={classes.fullWidth} onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage(Id)
                          }}  >
  
                            <>  
                            <Grid container direction="row" spacing={2}  className={classes.space}>
                            <Grid item  xs={12} lg={10}>
                             <Paper className={classes.paper} >

                              <InputBase required={true}  inputProps={{ 'aria-label': 'search' }} placeholder="Enter Message Here"
                                defaultValue={text} onChange={e => setText(e.target.value)} name='text' />

                            </Paper>
                            </Grid>

                            <Grid item xs={12} lg={2}  className={classes.drawerClose} > 
                              <Button aria-describedby={ids} variant="filled" color="primary" className={classes.button} onClick={handlePopoverClick}>
                                <AttachFileIcon color="primary" />
                              </Button> 
                              

                              <Button type='submit' color="primary"  className={classes.button} ><SendIcon /></Button>
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

</form>
                            :
                            <>
                              <Grid container direction="row" spacing={2}  className={classes.space}>
                                
                                
                            <Grid item  xs={12} lg={10}>
                            <TextField  multiline maxRows={5} minRows={1} disabled={true}   inputProps={{ 'aria-label': 'search',  }} 
                            value={"This is your first message for this contact today use general_message to start chat"} name='text' />

                            </Grid>
                                 

                                    <Grid item xs={12} lg={2}  className={classes.center} > 
                                  <Button onClick={handleClick } variant="contained" color="primary" size="small"  >Send Here</Button>
                                  </Grid>


                              </Grid>



                            </>}


                       
                      </Grid>



                      <SwipeableDrawer

                        anchor="bottom"
                        open={state["bottom"]}
                        onClose={toggleDrawer("bottom", false)}
                        onOpen={toggleDrawer("bottom", true)}
                        classes={{ paper: classes.drawer }}
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
            </> :""
      }
          </Grid>
        </div>
      </div>

      <Backdrop className={classes.backdrop} open={loader}  >
        <CircularProgress color="inherit" />
      </Backdrop>
    </MuiThemeProvider>




  );
}

export default Home;