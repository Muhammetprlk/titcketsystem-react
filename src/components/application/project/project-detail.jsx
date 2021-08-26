import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, FormGroup, Nav, NavItem, NavLink, TabContent, TabPane, Media, Form, Input, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import { Target, Info, CheckCircle, PlusCircle, Circle ,XCircle} from 'react-feather';
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Done, All, Doing, Canceled, CreateNewProject, ProjectDetailUpdateSuccessMessage, menuitemIssue, ToDo, Comments, SaveChanges, Cancel, IssueList, ProjectDetailTitle, ProjectDetailParent, ProjectDetailSearchCollaborators, CreateNewIssue } from '../../../constant'
import { DefaultLayout } from '../../../layout/theme-customizer';
import * as API from '../../../api/apiurls';
import axios from 'axios'
import { SwitchTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import ScrollArea from 'react-scrollbar';
import three from "../../../assets/images/user/3.jpg";
import SweetAlert from 'sweetalert2'


const ProjectDetail = (props) => {
    const id = window.location.pathname.split('/').pop()
    const defaultLayout = Object.keys(DefaultLayout);
    const layout = id ? id : defaultLayout
    const [activeTab, setActiveTab] = useState("1")
    const [issues, setIssues] = useState([]);
    const [searchbar, setSearchbar] = useState("");
    const [users, setUsers] = useState([]);
    const [foundUsers, setFoundUsers] = useState([]);
    const [projectInfo, setProjectInfo] = useState({});
    // const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')));
    const { user_role } = JSON.parse(localStorage.getItem('authenticatedUser'));
    const { projectid } = useParams();
    const [issueStatus, setIssueStatus] = useState({})
    const [changeStatus, setChangeStatus] = useState(false);
    const changestatusmodaltoggle = () => {
        if (changeStatus) {
            setIssueStatus({});
        }
        setChangeStatus(!changeStatus);
    }

    useEffect(() => {
        axios.post(API.getProjectDetail, { id: projectid }, API.getHeader()).then(response => {
            console.log(response.data);
            setProjectInfo({ ...response.data, issues: null, employees: null })
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
                return "badge-info"
            case 4:
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
            case 4:
                return Canceled;
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

    const ChangeIssueStatus = (issue) => {
        const s = { id: issue.id, title: issue.title, status: issue.status }
        console.log(s)
        setIssueStatus(issue);
        changestatusmodaltoggle();
    }

    const UpdateIssueStatus = () => {
        const updatedIssue = { id: issueStatus.id, status: issueStatus.status }
        axios.post(API.updateIssue, updatedIssue, API.getHeader()).then(response => {
            toast.success(ProjectDetailUpdateSuccessMessage);

            const newIssueList = [];
            issues.forEach(i => {
                if (i.id === updatedIssue.id) {
                    newIssueList.push({ ...i, status: updatedIssue.status });
                }
                else {
                    newIssueList.push(i);
                }
            });
            setIssues(newIssueList);

        }).catch(error => {
            toast.error(error.response.data.error);
        })
        changestatusmodaltoggle();
    }

    return (
        <Fragment>
            <Breadcrumb parent={ProjectDetailParent} title={ProjectDetailTitle + " / " + projectInfo.project_title} />
            <Container fluid={true}>
                <Row>
                    <Col md="8" className="project-list">
                        <Card>
                            <Row>
                                <Col sm="12">
                                    <Nav tabs className="border-tab">
                                        <NavItem><NavLink className={activeTab === "1" ? "active" : ''} onClick={() => setActiveTab("1")}><Target />{All}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "2" ? "active" : ''} onClick={() => setActiveTab("2")}><CheckCircle />{Done}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "3" ? "active" : ''} onClick={() => setActiveTab("3")}><Info />{Doing}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "4" ? "active" : ''} onClick={() => setActiveTab("4")}><Circle />{ToDo}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "5" ? "active" : ''} onClick={() => setActiveTab("5")}><XCircle />{Canceled}</NavLink></NavItem>
                                    </Nav>
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
                                                        {user_role === "companyadmin" ? <div className="update" onClick={() => { ChangeIssueStatus(item) }} ><div className="icon-wrapper"><i className="font-primary icofont icofont-pencil-alt-5"></i></div></div> : ''}
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
                                                        {user_role === "companyadmin" ? <div className="update" onClick={() => { ChangeIssueStatus(item) }} ><div className="icon-wrapper"><i className="font-primary icofont icofont-pencil-alt-5"></i></div></div> : ''}
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
                                                        {user_role === "companyadmin" ? <div className="update" onClick={() => { ChangeIssueStatus(item) }} ><div className="icon-wrapper"><i className="font-primary icofont icofont-pencil-alt-5"></i></div></div> : ''}
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
                                                        {user_role === "companyadmin" ? <div className="update" onClick={() => { ChangeIssueStatus(item) }} ><div className="icon-wrapper"><i className="font-primary icofont icofont-pencil-alt-5"></i></div></div> : ''}
                                                    </div>
                                                </Col> : null
                                            )}
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="5">
                                        <Row>
                                            {issues?.map((item, i) => item.status === 4 ?
                                                <Col sm="6" className="mt-4" key={i}>
                                                    <div className="project-box">
                                                        <span className={`badge ${getBadgeColor(item.status)}`}>{getStatus(item.status)}</span>
                                                        <Link to={`${process.env.PUBLIC_URL}/app/issue/issue/${item.id + "/"}`}>  <h6>{item.title}</h6> </Link>
                                                        <p>{new Date(item.created_date).toLocaleDateString() + " " + new Date(item.created_date).toLocaleTimeString()}</p>
                                                        <Row className="details">
                                                            <Col xs="6"> <span>{Comments}</span></Col>
                                                            <Col xs="6" className='text-primary'>{item.comments}</Col>
                                                        </Row>
                                                        {user_role === "companyadmin" ? <div className="update" onClick={() => { ChangeIssueStatus(item) }} ><div className="icon-wrapper"><i className="font-primary icofont icofont-pencil-alt-5"></i></div></div> : ''}
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
                                            <Input className="form-control-social" value={searchbar} onChange={filter} type="search" placeholder={ProjectDetailSearchCollaborators} />
                                        </FormGroup>
                                    </Form>
                                    {foundUsers?.map((user, key) => {
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

                <Modal isOpen={changeStatus} toggle={changestatusmodaltoggle} size="sm" centered>
                    <ModalHeader toggle={changestatusmodaltoggle}>
                        {issueStatus.title}
                    </ModalHeader>
                    <ModalBody>
                        <Input type="select" onChange={e => setIssueStatus({ ...issueStatus, status: Number(e.target.value) })} value={issueStatus.status} >
                            <option value={1}>{Done}</option>
                            <option value={2}>{Doing}</option>
                            <option value={3}>{ToDo}</option>
                            <option value={4}>{Canceled}</option>
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={changestatusmodaltoggle}>{Cancel}</Button>
                        <Button color="primary" onClick={UpdateIssueStatus}>{SaveChanges}</Button>
                    </ModalFooter>
                </Modal>

            </Container>
        </Fragment >
    );
}

export default ProjectDetail;