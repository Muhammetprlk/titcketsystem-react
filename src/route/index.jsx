// dashbaord
import Default from '../components/dashboard/default'
import Ecommerce from '../components/dashboard/ecommerce'
import UserProfile from "../components/users/userProfile"
import CreateCompany from "../components/application/company/create-company"
import CompanyList from "../components/application/company/company-list"

import ProjectList from '../components/application/project/project'
import ProjectListForSuperuser from '../components/application/project/project-list-for-superuser'
import NewProject from '../components/application/project/new-project'
import UpdateProject from '../components/application/project/update-project'
import NewIssue from '../components/application/issue/new-issue'
import AllIssues from '../components/application/issue/all-issues'
import Issue from '../components/application/issue/issue'
import NewEmployee from '../components/application/employee/new-employee'
import EmployeeList from '../components/application/employee/employee-list'
import ProjectDetail from '../components/application/project/project-detail'
import CompanyAdminDashboard from '../components/dashboard/companyadmin-dashboard'
import UserDashboard from '../components/dashboard/user-dashboard'



export const routes = [
        // { path:"/dashboard/default/", Component:Default,userRole:["superuser"]},
        { path:"/dashboard/", Component:CompanyAdminDashboard,userRole:["companyadmin"]},
        { path:"/dashboard/", Component:CompanyList,userRole:["superuser"]},
        { path:"/dashboard/", Component:UserDashboard,userRole:["user"]},
        { path:"/app/user/userprofile/" , Component:UserProfile,userRole:["companyadmin","user","superuser"]},
        { path:"/app/project/project-list/", Component:ProjectList,userRole:["companyadmin","user"]},
        { path:"/app/project/project-list/:companyid", Component:ProjectListForSuperuser,userRole:["superuser"]},
        { path:"/app/project/detail/:projectid/", Component:ProjectDetail,userRole:["superuser","companyadmin","user"]},
        { path:"/app/project/new-project/", Component:NewProject,userRole:["companyadmin"]},
        { path:"/app/project/update-project/", Component:UpdateProject,userRole:["companyadmin"]},
        { path:"/app/issue/new-issue/", Component:NewIssue,userRole:["companyadmin","user"]},
        { path:"/app/issue/issue/:issueid/", Component:Issue,userRole:["companyadmin","user","superuser"]},
        { path:"/app/issue/all-issues/", Component:AllIssues,userRole:["companyadmin","user"]},
        { path:"/app/employee/create-employee/", Component:NewEmployee,userRole:["companyadmin"]},
        { path:"/app/employee/employee-list/", Component:EmployeeList,userRole:["companyadmin"]},
        { path:"/app/create-company/", Component:CreateCompany,userRole:["superuser"]},
        { path:"/app/company-list/", Component:CompanyList,userRole:["superuser"]},
]