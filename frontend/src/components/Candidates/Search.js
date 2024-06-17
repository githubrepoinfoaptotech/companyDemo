import React, { useState, useRef, useEffect} from "react";
import { IconButton, InputBase,ClickAwayListener } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import useStyles from "../../themes/style.js";
import { useHistory } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";

export default function SearchBar(props) {


 
  const [expanded, setExpanded] = useState(false);
  const positions = [toast.POSITION.TOP_RIGHT];

  const token = localStorage.getItem("token");
  var decode = jwtDecode(token);

  const handleSearchClick = () => {
    setExpanded(!expanded);
  };
  
   
  const [search, setSearch] = useState(new URLSearchParams(props.search).get('search'));
 
  useEffect(() => {

   if(props.search !==""){
    setSearch(new URLSearchParams(props.search).get('search'));
 
   } else{
    setSearch("");
 
   } 
     

  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);


  var [errorToastId, setErrorToastId] = useState(null);

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
      position: positions[2],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }



  const handleSearch = () => {

    if (searchRef.current.value !== "") { 

        decode.role === "ADMIN"? 
         history.push("/app/admin_candidates?search=" + searchRef.current.value)
        :  decode.role === "RECRUITER"?
        history.push("/app/recruiter_candidates?search=" + searchRef.current.value)
        : decode.role === "CLIENTCOORDINATOR"?
        history.push("/app/cc_candidates?search=" + searchRef.current.value)
        :
        history.push("/app/others_candidates?search=" + searchRef.current.value)
      
        setSearch("");
      
    } else {
      handleNotificationCall("error", "Search keyword is required");
    }
  };

  const searchRef = useRef(null);

  var classes = useStyles();
  const history = useHistory();

  return (
    <>
      <div className={classes.SlgButton}>
        <ClickAwayListener onClickAway={()=>setExpanded(false)}>
          <div className={expanded ? classes.searchBar : props.WalletValue<999? classes.searchBar1 : classes.searchBar2} 
          style={{ padding: decode.role === "SUBVENDOR" || decode.role === "FREELANCER" ? "0px" : ""}}
          >
            {expanded && (
              <>
                <InputBase   placeholder="Enter Candidate Unique ID/Name/Email/Mobile (eg: 91XXXXXXXXXX)" onChange={(e)=>{setSearch(e.target.value)}}  value={search!==null?search:""}    inputRef={searchRef}  />
                <IconButton onClick={()=>{ if(search!=="") { handleSearch(); handleSearchClick(!expanded) } else{handleSearch();  }}}>
                <SearchIcon   className={classes.closeBtn + " " + classes.mail_blue} /> </IconButton>
              </>
            )}
          
            {!expanded && (
              <IconButton onClick={()=>{handleSearchClick(); setSearch("")}}>
                <SearchIcon color="primary" className={classes.searchIcon} />
              </IconButton>
            )}
          </div>
        </ClickAwayListener>
      </div>

      <div className={classes.SsmButton}>
        <InputBase  placeholder="Enter Candidate Unique ID/Name/Email/Mobile (eg: 91XXXXXXXXXX)" onChange={(e)=>{setSearch(e.target.value)}} value={search!==null?search:"" }     inputRef={searchRef}     />
         <IconButton onClick={()=>{ if(search!=="") { handleSearch();handleSearchClick(!expanded);setSearch("")} else{ handleSearch();  }}}>
              <SearchIcon className={classes.closeBtn + " " + classes.mail_blue}  />
            </IconButton>
       
      </div>
    </>
  );
}
