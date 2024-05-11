import { makeStyles } from "@material-ui/styles";

import chat_image from './img/modal.jpg';
const drawerWidth = 600;

export default makeStyles(theme => ({
    listItem: {
        // border: "1px solid blue",
        display: "flex",
        justifyContent: 'end',
        // "&:hover ~ $listItemSecondaryAction": {
        //     "&:hover $listItemSecondaryAction": {
        //         border: "1px solid green",
        //         visibility: "inherit"
        //     }
        // }
    },
    table: {
        minWidth: 650,
    },
   
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    hide: {
        display: 'none',
    },
    drawer: { 
         
        [theme.breakpoints.down("sm")]: {
            left: "5%",
            right: "5%", 
            width: "90%",
        }
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.down("sm")]: {
          
            width: '75%',
        }
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        minHeight: "40px",
        justifyContent: 'flex-start',
        background: '#f0f2f5',
    },
    drawerClose: {
        display: 'flex',
        justifyContent: 'end',
        gap: "10px"
      },
    profiledrawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    searchdrawerPaper: {
        width: '50%',
        [theme.breakpoints.down("md")]: {
            width: '75%',
        },
    },

    profiledrawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
        background: '#f0f2f5',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
        background: '#f0f2f5',
        border: '1px solid #e0e0e0',
    },

    input: {
        display: 'none',
    },

 
    download: {
        padding: "3px",
        stroke: "#949696",
        strokeWidth: "1px",
        color: "#949696",
        border: "2px solid #949696",
        borderRadius: "50px",
        fontWeight: "bold"
    },

    userName: {
        // textAlign: "left",
        textTransform: "capitalize",

    },

    contactName: {
        textAlign: "left"
    },

    contactNumber: {
        textTransform: "capitalize",
        fontWeight: "bold"
    },

    time: {
        textAlign: "end",
        whiteSpace: "nowrap"
    },

  
    descriptionIcon: {
        color: "blue"
    },

    chatListBackGround: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        backgroundImage: 'url(' + chat_image + ')',
    },

    sendIcon: {
        fontSize: "18px",
        margin: "5px"
    },
    tertiary:{
        backgroundColor:"#064be2",
        color:"white",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#053db7",
      },
    },
    sendIconBtn: {
        margin: "30px 15px",
        color:"white",
        backgroundColor:"#064be2"
    },

    userCaption: {
        textTransform: "capitalize"
    },

    userCaptionContainer: {
        textAlign: "left"
    },

    paperContainer: {
        padding: '10px'
    },
    searchOutLine: {
        padding: '7px'
    },
    listItemIcon: {
        alignItems: 'center',
        cursor: "pointer"
    },
    avatarTitle: {
        paddingLeft: '10px',
        color: "black",
        textTransform: "capitalize"
    },

   
    center: {
        textAlign: "center"
    },

    blueTick: {
        textAlign: "end",
        color: "#aab8c2",
        fontSize: "11px"
    },

    // messageStatus: {
    //     alignItems: "center"
    // },

    messageAreaSingle: {
        height: "100vh",
        overflowY: "scroll",
        backgroundImage: 'url(' + chat_image + ')',
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down("md")]: {
            overflowX: "hidden"
        },
    },
    chatListMessage: {
        display: 'flex ',
        alignItems: 'center ',
        padding: '15px',
        color: ' white',
        background: '#00800085',
        borderRadius: '50px',
        height: '10px',
    },
    mainContent: {
        background: '#00a884',
        height: '15%',
    },
    leftSide: {
        height: '65vh',
        border: '1px solid #d2d4d8',
    },
    list: {
        backgroundColor: 'white',
        display: 'flex ',
        padding: '0px ',
    },
    foot: {
        background: '#fff',
        padding: "10px",
    },
    modalSize: {
        width: '50%',
        height: '50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    },
    messageRight: {
        padding: "0 58px 50px 0",
        [theme.breakpoints.down("sm")]: {
            padding: "0 40px 50px 0",

        }
    },
    messageRightBubble: {
        background: '#d9fdd3',
        fontSize: '14px',
        fontWeight: '600',
        padding: '12px 13px',
        borderRadius: '15px 0px 15px 15px',
        color: 'black',
        position: 'relative',
        float: 'right',
        width: '30%',
        lineBreak: "anywhere",
        [theme.breakpoints.down("md")]: {
            padding: "12px 13px",
            float: "right",
            borderRadius: "15px 0px 15px 15px",
            background: "#d9fdd3",
            width: "85%"
        },
    },
    messageRightBubble1: {
        padding: '12px 13px',
        float: 'right',
        borderRadius: '15px 0px 15px 15px',
        background: '#d9fdd3',
        color: 'black',
        width: '50%',
        lineBreak: "anywhere",
        [theme.breakpoints.down("md")]: {
            padding: "12px 13px",
            float: "right",
            borderRadius: "15px 0px 15px 15px",
            background: "#d9fdd3",
            width: "90% "
        }
    },
    messageRightImage :{
        background: '#d9fdd3',
        fontSize: '14px',
        fontWeight: '600',
        padding: '12px 13px',
        borderRadius: '15px 0px 15px 15px',
        color: 'black',
        position: 'relative',
        float: 'right',
        width: "53%",
        [theme.breakpoints.down("md")]: {
            padding: "12px 13px",
            float: "right",
            borderRadius: "15px 0px 15px 15px",
            background: "#d9fdd3",
            width: "100%",
        },
 
        }, 
        messageRightFile  :{
            background: '#d9fdd3',
            fontSize: '14px',
            fontWeight: '600',
            padding: '12px 13px',
            borderRadius: '15px 0px 15px 15px',
            color: 'black',
            position: 'relative',
            float: 'right', 
            width: "60%",
            [theme.breakpoints.down("md")]: {
                padding: "12px 13px",
                float: "right",
                borderRadius: "15px 0px 15px 15px",
                background: "#d9fdd3",
                width: "100%",
            }, 
        }, 
    photoLibrary: {
        cursor: "pointer",
        padding: "10px"
    },

    nothing: {
        display: 'none'
    },
    backdrop: {
        zIndex: 1500,
        color: '#fff',
    },
    top: {
        background: "#f0f2f5",
        padding: "7px",
        borderRight: "1px solid #e0e0e0"
    },
    topSvg: {
        color: "#54656f"
    },
    chatList: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        padding: "5px 0px"
    },
    ChatListName: {
        justifyContent: "space-between",
        display: "flex",
        width: "100% ",
        // textAlign: "left"
    },
   
    ChatListContent: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "13px",
        color: "#969b9f",
        textTransform: "initial"
    }, 
    fullWidth: {
        width: "100%"
    },
  
    a: {
        textDecoration: "none",
        cursor: "pointer"
    },
    tablist: {
        padding: "10px",
        display: "flex"
    },
    main: {
        top: "40px",
        width: "calc(100% - 38px)",
        maxWidth: "1600px",
        position: "relative",
        margin: "0 auto",
        boxShadow: "0 6px 18px rgba(var(--shadow-rgb), 05)",
        background: "white",
        "&:after": {
            background: "#00a884",
        },
        [theme.breakpoints.down("md")]: {
        top: "20px !important",
        width: "calc(100%) !important",
        }
    },
    messagearea: {
        height: "57vh",
        overflowY: "scroll",
        backgroundImage: 'url(' + chat_image + ')',
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down("md")]: {
            overflowX: "hidden"
        },
    },
    title: {
        color: "black",
        textTransform: "capitalize "
    },
    modalImage: {
        width: "100%",
        marginTop: "5%"
    },
    paper: {
        display: "flex ",
        width: "100%",
        background: "#f0f2f5 ",
        boxShadow: "none ",
        borderRadius: "8px",
        // border: "2px solid #f0f2f5"
    },
    message: {
        width: "50%",
        padding: "0 0 50px 58px",
        clear: "both",
        marginBottom: "45px",
        "&:after": {
            background: "#00a884",
        },
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
    },
    chatListAvatar: {
        marginRight: "10px",
        width: "30px !important",
        height: "30px !important"
    },

     
    messageAvatar: {
        float: "left",
        marginLeft: "-38px",
        borderRadius: "50%",
        width: "30px",
        marginTop: "0px",
        height: "30px",
        color: "#d9fdd3"
    },
    messageRightAvatar: {
        float: "right",
        marginLeft: "0",
        marginRight: "-38px",
        height: "30px",
        color: "white"
    },
    messageRightSend: {
        float: "right",
        marginTop: "200px",
        height: "30px",
        color: "white"
    },
    messagebubble: {
        background: "white",
        fontSize: "13px",
        fontWeight: 600,
        padding: "12px 13px",
        borderRadius: "0px 15px 15px 15px",
        color: "black",
        position: "relative",
        float: "left",
        width: "53%",
        lineBreak: "anywhere",
        [theme.breakpoints.down("md")]: {
            background: "white",
            fontSize: "13px",
            fontWeight: 600,
            padding: "12px 13px",
            borderRadius: "0px 15px 15px 15px",
            color: "black",
            position: "relative",
            float: "left",
            width: "100% "
        },
    },
    messageBubble1: {
        background: "white",
        fontSize: "13px",
        fontWeight: 600,
        padding: "12px 13px",
        borderRadius: "0px 15px 15px 15px",
        color: "black",
        position: "relative",
        float: "left",
        width: "75%",
        lineBreak: "anywhere",
    },

    bubbleSpan: { color: "#aab8c2", fontSize: "12px" },
    "::-webkit-scrollbar": { width: "6px" },
    "::-webkit-scrollbar-thumb": { backgroundColor: "#bab4b4" },
    contactprofile: {
        display: "flex",
        justifyContent: "center"
    },
    contactprofileImg: {
        height: "200px",
        width: "200px",
        cursor: "pointer",
        borderRadius: "200px"
    },
    contactDetails: {
        display: "contents",
        textAlign: "center",
        paddingBottom: "10px"
    },
    editProfile: {
        display: "flex",
        justifyContent: "center"
    },
    editProfileImg: {
        height: "200px",
        width: "200px",
        cursor: "pointer",
        borderRadius: "200px"
    },
    Editdetails: {
        marginBottom: "25px ",
        backgroundColor: "white",
        color: "black",
        fontWeight: 400,
        fontSize: "21px",
        paddingLeft: "20px "
    },
    body: { background: "#f0f2f5" },
   
    login: {
        padding: "10% ",
        textAlign: "-webkit-center",
        placeSelf: "center"
    },
    sendHere: {
        [theme.breakpoints.down("md")]: {
            fontSize: "21px", padding: "4px"
        }
    },
    space: {
        display: "flex",
        whiteSpace: "nowrap",
        // gap: "10px",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between", 
    },
        button:{

            minWidth: "10px !important",
        },
    borderNone: {
        border: "none",
    },
    blue: {
        margin: "4px 0px 0px 4px",
        backgroundColor: "white",
        color: "#00a884",
        fontSize: "13px",

    },
    blueIcon: {
        // backgroundColor: "white",
        color: "#00a884",
        fontSize: "13px",
        // "&:hover": {
        //   backgroundColor: "#00a884",
        //   color: "white",
        // }
    },
    lgButton:{
        display: "none !important",
        [theme.breakpoints.up("sm")]: {
          display: "block !important",
        },
       
      },
      smButton:{ 
        display: "block !important",
        [theme.breakpoints.up("sm")]: {
          display: "none !important",
        }, 
        
      },
      customTextField: {
        "& input:placeholder": {
          fontSize: "13px"
        },
        marginTop: "5px !important",
        border: "1px solid #ced4da",
      },
}))
