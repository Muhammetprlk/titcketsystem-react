import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, FormGroup, Nav, NavItem, NavLink, TabContent, TabPane, Media, Form, Input } from 'reactstrap'
import { Target, Info, CheckCircle, PlusCircle, Circle } from 'react-feather';
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Done, All, Doing, CreateNewProject, menuitemIssue, ToDo, Comments, IssueList, ProjectDetailTitle, ProjectDetailParent, CreateProjectSearchCollaborators, CreateNewIssue } from '../../../constant'
import { DefaultLayout } from '../../../layout/theme-customizer';
import * as API from '../../../api/apiurls';
import axios from 'axios'
import { SwitchTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import ScrollArea from 'react-scrollbar';
import three from "../../../assets/images/user/3.jpg";


const ProjectDetail = (props) => {
    const id = window.location.pathname.split('/').pop()
    const defaultLayout = Object.keys(DefaultLayout);
    const layout = id ? id : defaultLayout
    const [activeTab, setActiveTab] = useState("1")
    const [issues, setIssues] = useState();
    const [searchbar, setSearchbar] = useState("");
    const [users, setUsers] = useState([]);
    const [foundUsers, setFoundUsers] = useState([]);
    const [projectInfo,setProjectInfo]=useState({});
    const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')));
    const { projectid } = useParams();

    useEffect(() => {
        axios.post(API.getProjectDetail, { id: projectid }, API.getHeader()).then(response => {
            console.log(response.data);
            setProjectInfo({...response.data,issues:null,employees:null})
            setIssues(response.data.issues)
            setUsers(response.data.employees);
            setFoundUsers(response.data.employees);
        }).catch(error => {
            toast.error(error.response.data.error);
        })
    }, []);

    const getBadgeColor = (status) => {
        switch (status) {
            case 1:
                return "badge-success";
            case 2:
                return "badge-warning"
            case 3:
                return "badge-danger"
            default:
                break;
        }
    }
    const getStatus = (status) => {
        switch (status) {
            case 1:
                return Done;
            case 2:
                return Doing;
            case 3:
                return ToDo;
            default:
                break;
        }
    }

    const filter = (event) => {
        const keyword = event.target.value;
        if (keyword !== '') {
            const results = users.filter((user) => {
                return (user.firstname + " " + user.lastname).toLowerCase().includes(keyword.toLowerCase());
            });
            setFoundUsers(results);
        } else {
            setFoundUsers(users);
        }
        setSearchbar(keyword);
    }

    return (
        <Fragment>
            <Breadcrumb parent={ProjectDetailParent} title={ProjectDetailTitle+" / "+projectInfo.project_title} />
            <Container fluid={true}>
                <Row>
                    <Col md="8" className="project-list">
                        <Card>
                            <Row>
                                <Col sm="6">
                                    <Nav tabs className="border-tab">
                                        <NavItem><NavLink className={activeTab === "1" ? "active" : ''} onClick={() => setActiveTab("1")}><Target />{All}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "2" ? "active" : ''} onClick={() => setActiveTab("2")}><CheckCircle />{Done}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "3" ? "active" : ''} onClick={() => setActiveTab("3")}><Info />{Doing}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "4" ? "active" : ''} onClick={() => setActiveTab("4")}><Circle />{ToDo}</NavLink></NavItem>
                                    </Nav>
                                </Col>
                                <Col sm="6">
                                    <div className="text-right">
                                        <FormGroup className="mb-0 mr-0"></FormGroup>
                                        {/* <Link className="btn btn-primary" style={{ color: 'white' }} to={`${process.env.PUBLIC_URL}/app/issue/new-issue`}> <PlusCircle />{CreateNewIssue}</Link> */}
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col sm="8">
                        <Card>
                            <CardBody>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            {issues?.map((item, i) =>
                                                <Col sm="6" className="mt-4" key={i}>
                                                    <div className="project-box">
                                                        <span className={`badge ${getBadgeColor(item.status)}`}>{getStatus(item.status)}</span>
                                                        <Link to={`${process.env.PUBLIC_URL}/app/issue/issue/${item.id + "/"}`}>  <h6>{item.title}</h6> </Link>
                                                        <p>{new Date(item.created_date).toLocaleDateString() + " " + new Date(item.created_date).toLocaleTimeString()}</p>
                                                        <Row className="details">
                                                            <Col xs="6"> <span>{Comments}</span></Col>
                                                            <Col xs="6" className='text-primary'>{item.comments}</Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            {issues?.map((item, i) => item.status === 1 ?
                                                <Col sm="6" className="mt-4" key={i}>
                                                    <div className="project-box">
                                                        <span className={`badge ${getBadgeColor(item.status)}`}>{getStatus(item.status)}</span>
                                                        <Link to={`${process.env.PUBLIC_URL}/app/issue/issue/${item.id + "/"}`}>  <h6>{item.title}</h6> </Link>
                                                        <p>{new Date(item.created_date).toLocaleDateString() + " " + new Date(item.created_date).toLocaleTimeString()}</p>
                                                        <Row className="details">
                                                            <Col xs="6"> <span>{Comments}</span></Col>
                                                            <Col xs="6" className='text-primary'>{item.comments}</Col>
                                                        </Row>
                                                    </div>
                                                </Col> : null
                                            )}
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Row>
                                            {issues?.map((item, i) => item.status === 2 ?
                                                <Col sm="6" className="mt-4" key={i}>
                                                    <div className="project-box">
                                                        <span className={`badge ${getBadgeColor(item.status)}`}>{getStatus(item.status)}</span>
                                                        <Link to={`${process.env.PUBLIC_URL}/app/issue/issue/${item.id + "/"}`}>  <h6>{item.title}</h6> </Link>
                                                        <p>{new Date(item.created_date).toLocaleDateString() + " " + new Date(item.created_date).toLocaleTimeString()}</p>
                                                        <Row className="details">
                                                            <Col xs="6"> <span>{Comments}</span></Col>
                                                            <Col xs="6" className='text-primary'>{item.comments}</Col>
                                                        </Row>
                                                    </div>
                                                </Col> : null
                                            )}
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="4">
                                        <Row>
                                            {issues?.map((item, i) => item.status === 3 ?
                                                <Col sm="6" className="mt-4" key={i}>
                                                    <div className="project-box">
                                                        <span className={`badge ${getBadgeColor(item.status)}`}>{getStatus(item.status)}</span>
                                                        <Link to={`${process.env.PUBLIC_URL}/app/issue/issue/${item.id + "/"}`}>  <h6>{item.title}</h6> </Link>
                                                        <p>{new Date(item.created_date).toLocaleDateString() + " " + new Date(item.created_date).toLocaleTimeString()}</p>
                                                        <Row className="details">
                                                            <Col xs="6"> <span>{Comments}</span></Col>
                                                            <Col xs="6" className='text-primary'>{item.comments}</Col>
                                                        </Row>
                                                    </div>
                                                </Col> : null
                                            )}
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card>
                            <CardBody className="social-status filter-cards-view">
                                <ScrollArea horizontal={false} vertical={true} >
                                    <Form>
                                        <FormGroup className="m-0">
                                            <Input className="form-control-social" value={searchbar} onChange={filter} type="search" placeholder={CreateProjectSearchCollaborators} />
                                        </FormGroup>
                                    </Form>
                                    {foundUsers?.map((user,key) => {
                                        return <Media key={key}>
                                            <img className="img-50 rounded-circle m-r-15" src={three} alt="fourteenImg" />
                                            <Media body>
                                                <span className="f-w-600 d-block">{user.firstname + " " + user.lastname}</span><span className="d-block">{user.email}</span>
                                            </Media>
                                        </Media>
                                    })}
                                </ScrollArea>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default ProjectDetail;