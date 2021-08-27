import React, { useState, Fragment, useEffect } from 'react'
import Breadcrumb from '../../layout/breadcrumb'
import { DashboardCanceledIssueCount, DashboardDoingIssueCount, DashboardDoneIssueCount, DashboardToDoIssueCount, menuitemDashboard, Projects, TotalComment, TotalCreatedIssues } from '../../constant'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import {Activity, MessageCircle, Box,CheckCircle,Info,Circle,XCircle} from 'react-feather';
import * as API from '../../api/apiurls'
import axios from 'axios';
import CountUp from 'react-countup';
import { translate } from 'react-switch-lang';

const UserDashboard=(props)=> {

    const [generalData, setGeneralData] = useState(null);

    useEffect(() => {
        axios.get(API.getUserDashboard,API.getHeader()).then(res => setGeneralData(res.data))
    }, [])


    return (
        <Fragment>
            <Breadcrumb parent={props.t(menuitemDashboard)} />
            {generalData!==null?
                <Container fluid={true}>
                    <Row>
                        <Col sm="6" xl="4" lg="6">
                            <Card className="o-hidden">
                                <CardBody className="bg-primary b-r-4 card-body">
                                    <div className="media static-top-widget">
                                        <div className="align-self-center text-center"><Box /></div>
                                        <div className="media-body"><span className="m-0">{props.t(Projects)}</span>
                                            <h4 className="mb-0 counter"><CountUp end={generalData.total_project} /></h4><Box className="icon-bg" />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="6" xl="4" lg="6">
                            <Card className="o-hidden">
                                <div className="bg-primary b-r-4 card-body">
                                    <div className="media static-top-widget">
                                        <div className="align-self-center text-center"><Activity /></div>
                                        <div className="media-body"><span className="m-0">{props.t(TotalCreatedIssues)}</span>
                                            <h4 className="mb-0 counter"><CountUp end={generalData.total_issues} /></h4><Activity className="icon-bg" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="6" xl="4" lg="6">
                            <Card className="o-hidden">
                                <CardBody className="bg-primary b-r-4">
                                    <div className="media static-top-widget">
                                        <div className="align-self-center text-center"><MessageCircle /></div>
                                        <div className="media-body"><span className="m-0">{props.t(TotalComment)}</span>
                                            <h4 className="mb-0 counter"><CountUp end={generalData.total_comment} /></h4><MessageCircle className="icon-bg" />
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
                                            <div className="media-body details pl-3"><span className="mb-1">{props.t(DashboardDoneIssueCount)}</span>
                                                <h4 className="mb-0 counter digits"><CountUp end={generalData.total_Done_issue} /></h4>
                                            </div>
                                            <div className="media-body align-self-center"><CheckCircle className="font-primary float-left ml-2" /></div>
                                        </div>
                                    </Col>
                                    <Col sm="3" className="pl-0">
                                        <div className="media">
                                            <div className="media-body details pl-3"><span className="mb-1">{props.t(DashboardDoingIssueCount)}</span>
                                                <h4 className="mb-0 counter digits"><CountUp end={generalData.total_Doing_issue} /></h4>
                                            </div>
                                            <div className="media-body align-self-center"><Info className="font-primary float-left ml-3" /></div>
                                        </div>
                                    </Col>
                                    <Col sm="3" className="pl-0">
                                        <div className="media border-after-xs">
                                            <div className="media-body details pl-3 pt-0"><span className="mb-1">{props.t(DashboardToDoIssueCount)}</span>
                                                <h4 className="mb-0 counter digits"><CountUp end={generalData.total_Todo_issue} /></h4>
                                            </div>
                                            <div className="media-body align-self-center"><Circle className="font-primary float-left ml-2" /></div>
                                        </div>
                                    </Col>
                                    <Col sm="3" className="pl-0">
                                        <div className="media">
                                            <div className="media-body details pl-3 pt-0"><span className="mb-1">{props.t(DashboardCanceledIssueCount)}</span>
                                                <h4 className="mb-0 counter digits"><CountUp end={generalData.total_Canceled_issue} /></h4>
                                            </div>
                                            <div className="media-body align-self-center"><XCircle className="font-primary float-left ml-2" /></div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>:''}
        </Fragment>
    )
}
export default translate(UserDashboard)