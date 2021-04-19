package com.pai.covidafterparty.Security.Response;

import java.util.List;

public class JwtResponse {
    private String token;
    private String type="Bearer";
    private Long responseID;
    private String email;
    private String lastname;
    private List<String> roles;

    public JwtResponse(String token, Long responseID, String email, String lastname, List<String> roles) {
        this.token = token;
        this.responseID = responseID;
        this.email = email;
        this.lastname = lastname;
        this.roles = roles;
    }
    public String getAccessToken(){
        return token;
    }
    public void setAccessToken(String accessToken){
        this.token=token;
    }
    public String getTokenType(){
        return type;
    }
    public void setTokenType(String tokenType){
        this.type=type;
    }
    public Long getResponseID(){
        return responseID;
    }

    public void setResponseID(Long responseID) {
        this.responseID = responseID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public List<String> getRoles() {
        return roles;
    }
}
