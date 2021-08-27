import React, { Fragment, useState,useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, FormGroup, Progress, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { Target, Info, CheckCircle, PlusCircle } from 'react-feather';
import {Link,useParams} from 'react-router-dom'
import {Issues,Resolved,menuitemProject,Done,All,Doing,CreateNewProject,ProjectList,Open,Closed} from '../../../constant'
import * as API from '../../../api/apiurls';
import axios from 'axios'
import { translate } from 'react-switch-lang';


const ProjectListForSuperuser = (props) => {
  const [activeTab,setActiveTab] = useState("1")
  const { companyid } = useParams();
  const [projects,setProjects] = useState()
  const { user_role } = JSON.parse(localStorage.getItem('authenticatedUser'));
  useEffect(() => {
    axios.post(API.getCompanyProjects,{id:companyid},API.getHeader()).then(response=>{
      setProjects(response.data.Projects)
    });
  },[companyid]);


  const getProgress =(issues,solved)=>{
    if(issues===0){
      return 100;
    }
    else{
      return Number(((solved/issues)*100).toFixed(2));
    }
  }

  return (
    <Fragment>
      <Breadcrumb parent={props.t(menuitemProject)} title={props.t(ProjectList)} />
      <Container fluid={true}>
        <Row>
          <Col md="12" className="project-list">
            <Card>
              <Row>
                <Col sm="6">
                  <Nav tabs className="border-tab">
                    <NavItem><NavLink className={activeTab === "1" ? "active" : ''} onClick={() => setActiveTab("1")}><Target />{props.t(All)}</NavLink></NavItem>
                    <NavItem><NavLink className={activeTab === "2" ? "active" : ''} onClick={() => setActiveTab("2")}><Info />{props.t(Open)}</NavLink></NavItem>
                    <NavItem><NavLink className={activeTab === "3" ? "active" : ''} onClick={() => setActiveTab("3")}><CheckCircle />{props.t(Closed)}</NavLink></NavItem>
                  </Nav>
                </Col>
                {user_role==="companyadmin"?<Col sm="6">
                  <div className="text-right">
                    <FormGroup className="mb-0 mr-0"></FormGroup>
                    <Link className="btn btn-primary" style={{ color: 'white' }} to={`${process.env.PUBLIC_URL}/app/project/new-project`}> <PlusCircle />{props.t(CreateNewProject)}</Link>
                  </div>
                </Col>:''}
              </Row>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      {projects?.map((item, i) =>
                        <Col sm="4" className="mt-4" key={i}>
                          <div className="project-box">
                            <span className={`badge ${item.status === 1 ? 'badge-success' : 'badge-primary'}`}>{item.status===1?props.t(Open):props.t(Closed)}</span>
                            <Link to={`${process.env.PUBLIC_URL}/app/project/detail/${item.id + "/"}`}>  <h6>{item.title}</h6> </Link>
                            <p>{new Date(item.created_date).toLocaleDateString()+" "+new Date(item.created_date).toLocaleTimeString()}</p>
                            <p>{item.content}</p>
                            <Row className="details">
                              <Col xs="6"><span>{props.t(Issues)}</span></Col>
                              <Col xs="6" className={item.badge === "Done" ? 'text-success' : 'text-primary'}>{item.issues_count}</Col>
                              <Col xs="6"> <span>{props.t(Resolved)}</span></Col>
                              <Col xs="6" className={item.badge === "Done" ? 'text-success' : 'text-primary'}>{item.issues_resolved}</Col>
                            </Row>
                            <div className="project-status mt-4">
                              <div className="media mb-0">
                                <p>{getProgress(item.issues_count,item.issues_resolved)}% </p>
                                <div className="media-body text-right"><span>{getProgress(item.issues_count,item.issues_resolved)===100?props.t(Done):props.t(Doing)}</span></div>
                              </div>
                              {getProgress(item.issues_count,item.issues_resolved) === 100 ?
                                <Progress className="sm-progress-bar" color="success" animated value={getProgress(item.issues_count,item.issues_resolved)} style={{ height: "5px" }} />
                                :
                                <Progress className="sm-progress-bar" striped color="primary" animated value={getProgress(item.issues_count,item.issues_resolved)} style={{ height: "5px" }} />
                              }
                            </div>
                            {user_role==="companyadmin"?<div className="update" ><div className="icon-wrapper"><Link to={{pathname:`${process.env.PUBLIC_URL}/app/project/update-project/`,query:item}} ><i className="icofont icofont-pencil-alt-5"></i></Link></div></div>:''}
                          </div>
                        </Col>
                      )}
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                    {projects?.map((item, i) => item.status===1?
                        <Col sm="4" className="mt-4" key={i}>
                          <div className="project-box">
                            <span className={`badge ${item.status === 1 ? 'badge-success' : 'badge-primary'}`}>{item.status===1?props.t(Open):props.t(Closed)}</span>
                            <h6>{item.title}</h6>
                            <p>{new Date(item.created_date).toLocaleDateString()+" "+new Date(item.created_date).toLocaleTimeString()}</p>
                            <p>{item.content}</p>
                            <div className="project-status mt-4">
                              <div className="media mb-0">
                                <p>{getProgress(item.issues_count,item.issues_resolved)}% </p>
                                <div className="media-body text-right"><span>{getProgress(item.issues_count,item.issues_resolved)===100?props.t(Done):props.t(Doing)}</span></div>
                              </div>
                              {getProgress(item.issues_count,item.issues_resolved) === 100 ?
                                <Progress className="sm-progress-bar" color="success" animated value={getProgress(item.issues_count,item.issues_resolved)} style={{ height: "5px" }} />
                                :
                                <Progress className="sm-progress-bar" striped color="primary" animated value={getProgress(item.issues_count,item.issues_resolved)} style={{ height: "5px" }} />
                              }
                            </div>
                            {user_role==="companyadmin"?<div className="update" ><div className="icon-wrapper"><Link to={{pathname:`${process.env.PUBLIC_URL}/app/project/update-project/`,query:item}} ><i className="icofont icofont-pencil-alt-5"></i></Link></div></div>:''}                          </div>
                        </Col>:null
                      )}
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                    {projects?.map((item, i) => item.status!==1?
                        <Col sm="4" className="mt-4" key={i}>
                          <div className="project-box">
                            <span className={`badge ${item.status === 1 ? 'badge-success' : 'badge-primary'}`}>{item.status===1?props.t(Open):props.t(Closed)}</span>
                            <h6>{item.title}</h6>
                            <p>{new Date(item.created_date).toLocaleDateString()+" "+new Date(item.created_date).toLocaleTimeString()}</p>
                            <p>{item.content}</p>
                            <div className="project-status mt-4">
                              <div className="media mb-0">
                                <p>{getProgress(item.issues_count,item.issues_resolved)}% </p>
                                <div className="media-body text-right"><span>{getProgress(item.issues_count,item.issues_resolved)===100?props.t(Done):props.t(Doing)}</span></div>
                              </div>
                              {getProgress(item.issues_count,item.issues_resolved) === 100 ?
                                <Progress className="sm-progress-bar" color="success" animated value={getProgress(item.issues_count,item.issues_resolved)} style={{ height: "5px" }} />
                                :
                                <Progress className="sm-progress-bar" striped color="primary" animated value={getProgress(item.issues_count,item.issues_resolved)} style={{ height: "5px" }} />
                              }
                            </div>
                            {user_role==="companyadmin"?<div className="update" ><div className="icon-wrapper"><Link to={{pathname:`${process.env.PUBLIC_URL}/app/project/update-project/`,query:item}} ><i className="icofont icofont-pencil-alt-5"></i></Link></div></div>:''}                          </div>
                        </Col>:null
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

export default translate(ProjectListForSuperuser);