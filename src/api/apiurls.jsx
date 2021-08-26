const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));

export const getHeader=()=>{
    return {headers: {Authorization: "Bearer " + authenticatedUser.token}}
}

const url='http://192.168.1.40:8000';
// const url='http://169.254.211.58:8000';
export const getToken=url+"/api/token/";
export const getUserDetail=url+"/api/user/detail/";
export const verifyToken=url+"/api/token-verify/";
export const createAccountApi=url+"/api/user/register/";
export const createProject=url+"/api/project/create/";
export const updateProjectApi=url+"/api/project/update/";
export const getProjects=url+"/api/project/";
export const getProjectDetail=url+"/api/project/detail/";
export const getCompany=url+"/api/company/";
export const createCompany=url+"/api/company/create/";
export const getIssues=url+"/api/project/issues/";
export const createIssue=url+"/api/project/issues/create/";
export const updateIssue=url+"/api/project/issues/update/";
export const getIssueDetail=url+"/api/project/issues/detail/";
export const employeeCreate=url+"/api/company/employee/create/";
export const employeeUpdate=url+"/api/company/employee/update/";
export const postAnswerForIssue=url+"/api/project/issues/comment/create/"; 
export const dashboard=url+"/api/company/admin/";
export const dashboardSuperUser=url+"/api/admin/";
export const getCompanyProjects=url+"/api/admin/company/";
export const getUserDashboard=url+"/api/company/employee/detail/";
