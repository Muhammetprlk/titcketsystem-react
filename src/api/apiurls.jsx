const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));

export const getHeader=()=>{
    return {headers: {Authorization: "Bearer " + authenticatedUser.token}}
}

const url='http://192.168.1.40:8000';
export const getToken=url+"/api/token/";
export const verifyToken=url+"/api/token-verify/";
export const createAccountApi=url+"/api/user/register/";
export const createProject=url+"/api/project/create/";
export const getProjects=url+"/api/project/";
export const getCompany=url+"/api/company/";
export const getIssues=url+"/api/project/issues/";
export const getIssueDetail=url+"/api/project/issues/detail/";
