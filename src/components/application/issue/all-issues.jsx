import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody,Button,Input, FormGroup,Modal,ModalBody,ModalFooter,ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { Target, Info, CheckCircle, PlusCircle, Circle,XCircle } from 'react-feather';
import { Link } from 'react-router-dom'
import { Done, All, Doing,Canceled, ProjectDetailUpdateSuccessMessage,menuitemIssue,Cancel,SaveChanges, ToDo, Comments, IssueList, CreateNewIssue } from '../../../constant'
import * as API from '../../../api/apiurls';
import axios from 'axios'
import { toast } from 'react-toastify';
import { translate } from 'react-switch-lang';


const AllIssues = (props) => {
    const [activeTab, setActiveTab] = useState("1")
    const [issues, setIssues] = useState([]);
    const { user_role } = JSON.parse(localStorage.getItem('authenticatedUser')!==null?localStorage.getItem('authenticatedUser'):"{}");

    const [changeStatus, setChangeStatus] = useState(false);
    const [issueStatus, setIssueStatus] = useState({})
    const changestatusmodaltoggle = () => {
        if(changeStatus){
            setIssueStatus({});
        }
        setChangeStatus(!changeStatus);
    }
    const ChangeIssueStatus = (issue) => {
        const s={id:issue.id,title:issue.title,status:issue.status}
        console.log(s)
        setIssueStatus(issue);
        changestatusmodaltoggle();
    }
    const UpdateIssueStatus=()=>{
        const updatedIssue={id:issueStatus.id,status:issueStatus.status}
        axios.post(API.updateIssue,updatedIssue,API.getHeader()).then(response=>{
            toast.success(props.t(ProjectDetailUpdateSuccessMessage));

            const newIssueList=[];
            issues.forEach(i => {
                if(i.id===updatedIssue.id){
                    newIssueList.push({...i,status:updatedIssue.status});
                }
                else{
                    newIssueList.push(i);
                }
            });
            setIssues(newIssueList);
            
        }).catch(error=>{
            toast.error(error.response.data.error);
        })
        changestatusmodaltoggle();
    }


    useEffect(() => {
        axios.get(API.getIssues, API.getHeader()).then(response => {
            setIssues(response.data.Issues)
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
                return props.t(Done);
            case 2:
                return props.t(Doing);
            case 3:
                return props.t(ToDo);
            case 4:
                return props.t(Canceled);
            default:
                break;
        }
    }


    return (
        <Fragment>
            <Breadcrumb parent={props.t(menuitemIssue)} title={props.t(IssueList)} />
            <Container fluid={true}>
                <Row>
                    <Col md="12" className="project-list">
                        <Card>
                            <Row>
                                <Col sm="6">
                                    <Nav tabs className="border-tab">
                                        <NavItem><NavLink className={activeTab === "1" ? "active" : ''} onClick={() => setActiveTab("1")}><Target />{props.t(All)}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "2" ? "active" : ''} onClick={() => setActiveTab("2")}><CheckCircle />{props.t(Done)}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "3" ? "active" : ''} onClick={() => setActiveTab("3")}><Info />{props.t(Doing)}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "4" ? "active" : ''} onClick={() => setActiveTab("4")}><Circle />{props.t(ToDo)}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "5" ? "active" : ''} onClick={() => setActiveTab("5")}><XCircle />{props.t(Canceled)}</NavLink></NavItem>
                                    </Nav>
                                </Col>
                                <Col sm="6">
                                    <div className="text-right">
                                        <FormGroup className="mb-0 mr-0"></FormGroup>
                                        <Link className="btn btn-primary" style={{ color: 'white' }} to={`${process.env.PUBLIC_URL}/app/issue/new-issue`}> <PlusCircle />{props.t(CreateNewIssue)}</Link>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            {issues?.map((item, i) =>
                                                <Col sm="4" className="mt-4" key={i}>
                                                    <div className="project-box">
                                                        <span className={`badge ${getBadgeColor(item.status)}`}>{getStatus(item.status)}</span>
                                                        <Link to={`${process.env.PUBLIC_URL}/app/issue/issue/${item.id + "/"}`}>  <h6>{item.title}</h6> </Link>
                                                        <p>{new Date(item.created_date).toLocaleDateString() + " " + new Date(item.created_date).toLocaleTimeString()}</p>
                                                        <p>{item.project_name}</p>
                                                        <Row className="details">
                                                            <Col xs="6"> <span>{props.t(Comments)}</span></Col>
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
                                                <Col sm="4" className="mt-4" key={i}>
                                                    <div className="project-box">
                                                        <span className={`badge ${getBadgeColor(item.status)}`}>{getStatus(item.status)}</span>
                                                        <Link to={`${process.env.PUBLIC_URL}/app/issue/issue/${item.id + "/"}`}>  <h6>{item.title}</h6> </Link>
                                                        <p>{new Date(item.created_date).toLocaleDateString() + " " + new Date(item.created_date).toLocaleTimeString()}</p>
                                                        <p>{item.project_name}</p>
                                                        <Row className="details">
                                                            <Col xs="6"> <span>{props.t(Comments)}</span></Col>
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
                                                <Col sm="4" className="mt-4" key={i}>
                                                    <div className="project-box">
                                                        <span className={`badge ${getBadgeColor(item.status)}`}>{getStatus(item.status)}</span>
                                                        <Link to={`${process.env.PUBLIC_URL}/app/issue/issue/${item.id + "/"}`}>  <h6>{item.title}</h6> </Link>
                                                        <p>{new Date(item.created_date).toLocaleDateString() + " " + new Date(item.created_date).toLocaleTimeString()}</p>
                                                        <p>{item.project_name}</p>
                                                        <Row className="details">
                                                            <Col xs="6"> <span>{props.t(Comments)}</span></Col>
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
                                                <Col sm="4" className="mt-4" key={i}>
                                                    <div className="project-box">
                                                        <span className={`badge ${getBadgeColor(item.status)}`}>{getStatus(item.status)}</span>
                                                        <Link to={`${process.env.PUBLIC_URL}/app/issue/issue/${item.id + "/"}`}>  <h6>{item.title}</h6> </Link>
                                                        <p>{new Date(item.created_date).toLocaleDateString() + " " + new Date(item.created_date).toLocaleTimeString()}</p>
                                                        <p>{item.project_name}</p>
                                                        <Row className="details">
                                                            <Col xs="6"> <span>{props.t(Comments)}</span></Col>
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
                                                <Col sm="4" className="mt-4" key={i}>
                                                    <div className="project-box">
                                                        <span className={`badge ${getBadgeColor(item.status)}`}>{getStatus(item.status)}</span>
                                                        <Link to={`${process.env.PUBLIC_URL}/app/issue/issue/${item.id + "/"}`}>  <h6>{item.title}</h6> </Link>
                                                        <p>{new Date(item.created_date).toLocaleDateString() + " " + new Date(item.created_date).toLocaleTimeString()}</p>
                                                        <p>{item.project_name}</p>
                                                        <Row className="details">
                                                            <Col xs="6"> <span>{props.t(Comments)}</span></Col>
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
                </Row>
                <Modal isOpen={changeStatus} toggle={changestatusmodaltoggle} size="sm" centered>
                    <ModalHeader toggle={changestatusmodaltoggle}>
                        {issueStatus.title}
                    </ModalHeader>
                    <ModalBody>
                        <Input type="select" onChange={e => setIssueStatus({...issueStatus,status:Number(e.target.value)})} value={issueStatus.status} >
                            <option value={1}>{props.t(Done)}</option>
                            <option value={2}>{props.t(Doing)}</option>
                            <option value={3}>{props.t(ToDo)}</option>
                            <option value={4}>{props.t(Canceled)}</option>
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={changestatusmodaltoggle}>{props.t(Cancel)}</Button>
                        <Button color="primary" onClick={UpdateIssueStatus}>{props.t(SaveChanges)}</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </Fragment>
    );
}

export default translate(AllIssues);