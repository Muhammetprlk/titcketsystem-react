import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, FormGroup, Progress, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { Target, Info, CheckCircle, PlusCircle ,Circle} from 'react-feather';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Issues, Resolved, Comment, Done, All, Doing, CreateNewProject, ProjectList, ToDo } from '../../../constant'
import { DefaultLayout } from '../../../layout/theme-customizer';
import * as API from '../../../api/apiurls';
import axios from 'axios'
import { SwitchTransition } from 'react-transition-group';
  

const AllIssues = (props) => {
    const id = window.location.pathname.split('/').pop()
    const defaultLayout = Object.keys(DefaultLayout);
    const layout = id ? id : defaultLayout
    const [activeTab, setActiveTab] = useState("1")
    const [issues, setIssues] = useState();
    const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')));



    useEffect(() => {
        console.log(API.getHeader());
        axios.get(API.getIssues,API.getHeader()).then(response => {
            setIssues(response.data.Issues)
        });
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


    return (
        <Fragment>
            <Breadcrumb parent="Project" title={ProjectList} />
            <Container fluid={true}>
                <Row>
                    <Col md="12" className="project-list">
                        <Card>
                            <Row>
                                <Col sm="6">
                                    <Nav tabs className="border-tab">
                                        <NavItem><NavLink className={activeTab === "1" ? "active" : ''} onClick={() => setActiveTab("1")}><Target />{All}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "3" ? "active" : ''} onClick={() => setActiveTab("2")}><CheckCircle />{Done}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "2" ? "active" : ''} onClick={() => setActiveTab("3")}><Info />{Doing}</NavLink></NavItem>
                                        <NavItem><NavLink className={activeTab === "3" ? "active" : ''} onClick={() => setActiveTab("4")}><Circle />{ToDo}</NavLink></NavItem>
                                    </Nav>
                                </Col>
                                <Col sm="6">
                                    <div className="text-right">
                                        <FormGroup className="mb-0 mr-0"></FormGroup>
                                        <Link className="btn btn-primary" style={{ color: 'white' }} to={`${process.env.PUBLIC_URL}/app/project/new-project`}> <PlusCircle />{CreateNewProject}</Link>
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
                                                        <Link to={`${process.env.PUBLIC_URL}/app/issue/issue/${item.id+"/"}`}>  <h6>{item.title}</h6> </Link>
                                                        <p>{item.user_firstname + " " + item.user_lastname + " ( " + item.user_username + " )"}</p>
                                                        <p>{item.project_name}</p>
                                                        {/* <Row className="details">
                              <Col xs="6"><Link to={`${process.env.PUBLIC_URL}/app/kanban-board/${layout}`}> <span>{Issues}</span></Link></Col>
                              <Col xs="6" className={item.badge === "Done" ? 'text-success' : 'text-primary'}>{item.issue}</Col>
                              <Col xs="6"> <span>{Resolved}</span></Col>
                              <Col xs="6" className={item.badge === "Done" ? 'text-success' : 'text-primary'}>{item.resolved}</Col>
                              <Col xs="6"> <span>{Comment}</span></Col>
                              <Col xs="6" className={item.badge === "Done" ? 'text-success' : 'text-primary'}>{item.comment}</Col>
                            </Row> */}
                                                        {/* <div className="customers">
                              <ul>
                                <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../assets/images/${item.customers_img1}`)} alt="" /></li>
                                <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../assets/images/${item.customers_img2}`)} alt="" /></li>
                                <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../assets/images/${item.customers_img3}`)} alt="" /></li>
                                <li className="d-inline-block ml-2">
                                  <p className="f-12">{`+${item.like} More`}</p>
                                </li>
                              </ul>
                            </div> */}
                                                        {/* <div className="project-status mt-4">
                              <div className="media mb-0">
                                <p>{item.progress}% </p>
                                <div className="media-body text-right"><span>{Done}</span></div>
                              </div>
                              {item.progress === "100" ?
                                <Progress className="sm-progress-bar" color="success" value={item.progress} style={{ height: "5px" }} />
                                :
                                <Progress className="sm-progress-bar" striped color="primary" value={item.progress} style={{ height: "5px" }} />
                              }

                            </div> */}
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
                                                        <h6>{item.title}</h6>
                                                        <p>{item.user_firstname + " " + item.user_lastname + " ( " + item.user_username + " )"}</p>
                                                        <p>{item.project_name}</p>
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
                                                        <h6>{item.title}</h6>
                                                        <p>{item.user_firstname + " " + item.user_lastname + " ( " + item.user_username + " )"}</p>
                                                        <p>{item.project_name}</p>
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
                                                        <h6>{item.title}</h6>
                                                        <p>{item.user_firstname + " " + item.user_lastname + " ( " + item.user_username + " )"}</p>
                                                        <p>{item.project_name}</p>
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
            </Container>
        </Fragment>
    );
}

export default AllIssues;