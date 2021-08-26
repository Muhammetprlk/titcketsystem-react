import React, { useState, Fragment, useEffect } from 'react'
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, CardHeader, Table} from 'reactstrap'
import {Box,Users ,CheckCircle,Info,Circle,XCircle} from 'react-feather';
import CountUp from 'react-countup';
import {  Done, Doing, ToDo, Canceled, DashboardIssueCount, DashboardCommentCount, menuitemDashboard } from '../../constant'
import { Employee_Status, Name } from "../../constant";
import axios from 'axios'
import * as API from '../../api/apiurls'

const CompanyAdminDashboard = () => {
    const [generalData, setGeneralData] = useState(null);

    useEffect(() => {
        axios.get(API.dashboard,API.getHeader()).then(res => setGeneralData(res.data))
    }, [])


    return (
        <Fragment>
            <Breadcrumb parent={menuitemDashboard} />
            {generalData!==null?
                <Container fluid={true}>
                    <Row>
                        <Col sm="6" xl="4" lg="6">
                            <Card className="o-hidden">
                                <CardBody className="bg-primary b-r-4 card-body">
                                    <div className="media static-top-widget">
                                        <div className="align-self-center text-center"><Box /></div>
                                        <div className="media-body"><span className="m-0">{"Total Open Project"}</span>
                                            <h4 className="mb-0 counter"><CountUp end={generalData.total_open_project} /></h4><Box className="icon-bg" />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="6" xl="4" lg="6">
                            <Card className="o-hidden">
                                <div className="bg-primary b-r-4 card-body">
                                    <div className="media static-top-widget">
                                        <div className="align-self-center text-center"><Box /></div>
                                        <div className="media-body"><span className="m-0">{"Total Closed Project"}</span>
                                            <h4 className="mb-0 counter"><CountUp end={generalData.total_closed_project} /></h4><Box className="icon-bg" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="6" xl="4" lg="6">
                            <Card className="o-hidden">
                                <CardBody className="bg-primary b-r-4">
                                    <div className="media static-top-widget">
                                        <div className="align-self-center text-center"><Users /></div>
                                        <div className="media-body"><span className="m-0">{"Total Project Employee"}</span>
                                            <h4 className="mb-0 counter"><CountUp end={generalData.total_project_employees} /></h4><Users className="icon-bg" />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="12" className="xl-100 box-col-12">
                            <Card className="widget-joins">
                                <Row>
                                    <Col sm="3" className="pl-0">
                                        <div className="media border-after-xs">
                                            <div className="media-body details pl-3"><span className="mb-1">{Done} {DashboardIssueCount}</span>
                                                <h4 className="mb-0 counter digits"><CountUp end={generalData.total_Done_issue} /></h4>
                                            </div>
                                            <div className="media-body align-self-center"><CheckCircle className="font-primary float-left ml-2" /></div>
                                        </div>
                                    </Col>
                                    <Col sm="3" className="pl-0">
                                        <div className="media">
                                            <div className="media-body details pl-3"><span className="mb-1">{Doing} {DashboardIssueCount}</span>
                                                <h4 className="mb-0 counter digits"><CountUp end={generalData.total_Doing_issue} /></h4>
                                            </div>
                                            <div className="media-body align-self-center"><Info className="font-primary float-left ml-3" /></div>
                                        </div>
                                    </Col>
                                    <Col sm="3" className="pl-0">
                                        <div className="media border-after-xs">
                                            <div className="media-body details pl-3 pt-0"><span className="mb-1">{ToDo} {DashboardIssueCount}</span>
                                                <h4 className="mb-0 counter digits"><CountUp end={generalData.total_Todo_issue} /></h4>
                                            </div>
                                            <div className="media-body align-self-center"><Circle className="font-primary float-left ml-2" /></div>
                                        </div>
                                    </Col>
                                    <Col sm="3" className="pl-0">
                                        <div className="media">
                                            <div className="media-body details pl-3 pt-0"><span className="mb-1">{Canceled} {DashboardIssueCount}</span>
                                                <h4 className="mb-0 counter digits"><CountUp end={generalData.total_Canceled_issue} /></h4>
                                            </div>
                                            <div className="media-body align-self-center"><XCircle className="font-primary float-left ml-2" /></div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xl="12" className="xl-100 box-col-12">
                            <Card>
                                <CardHeader>
                                    <h5>{Employee_Status}</h5>
                                </CardHeader>
                                <CardBody>
                                    <div className="user-status table-responsive">
                                        <Table borderless>
                                            <thead>
                                                <tr>
                                                    <th scope="col">{Name}</th>
                                                    <th scope="col">{DashboardCommentCount}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {generalData.employees?.map(data => (
                                                    <tr key={data.user}>
                                                        <td className="bd-t-none u-s-tb">
                                                            <div className="align-middle image-sm-size">
                                                                {/* <img className="img-radius align-top m-r-15 rounded-circle" src={require(`../../assets/images/`)} alt="" /> */}
                                                                <div className="d-inline-block">
                                                                    <h6>{data.first_name+" "+data.last_name}</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {/* <td>{data.position}</td>
                                                        <td>
                                                            <div className="progress-showcase">
                                                                <div className="progress" style={{ height: "8px" }}>
                                                                    <div className={`progress-bar bg-${data.classname}`} role="progressbar" style={{ 'width': data.skill }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </td> */}
                                                        <td className="digits"> <h6>{data.total_comment}</h6></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>:''}
        </Fragment>
    )
}

export default CompanyAdminDashboard;
