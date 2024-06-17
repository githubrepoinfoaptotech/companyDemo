import React from "react";
import {jwtDecode} from "jwt-decode";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true};
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
   var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
   });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, authUser, signOut};

// ###########################################################
 

function signOut(dispatch, history) {
   localStorage.removeItem("token"); 
    
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

 

function authUser(authToken, dispatch, history){ 

 
    localStorage.setItem('token', authToken);

    const decode = jwtDecode(authToken); 
    localStorage.setItem('firstName', decode.firstName);
    localStorage.setItem('email', decode.email);
    localStorage.setItem('mobile', decode.mobile);  
    localStorage.setItem('companyName', decode.companyName);    
   
    dispatch({ type: 'LOGIN_SUCCESS' })
   
  
    history.push('/app/dashboard'); 
     
}


 

 
