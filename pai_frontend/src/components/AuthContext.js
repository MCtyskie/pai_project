import React from "react";

const AuthContext = React.createContext({
    getToken: ()=>{},
    isAuthorized:() =>{},
});

export default AuthContext