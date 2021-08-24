import React, { Fragment, useState, useEffect, useRef } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, Form, Button } from 'reactstrap'
import SweetAlert from 'sweetalert2'
import { Username, EmailAddress, EmployeeListTitle, menuitemEmployees, General } from '../../../constant'
import axios from 'axios';
import * as API from '../../../api/apiurls';
import { toast } from 'react-toastify';
import ScrollArea from 'react-scrollbar';


const EmployeeList = (props) => {
    const [orgactiveTab, setorgActiveTab] = useState();
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get(API.getCompany, API.getHeader()).then(response => {
            console.log(response.data);
            if (response.data.employee.length > 0) {
                setorgActiveTab(response.data.employee[0].id);
            }
            setUsers(response.data.employee);
        }).catch(error => {
            toast.error(error.response.data.error);
        });

    }, []);

    const deleteUser = (userId) => {

        SweetAlert.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                // deletedUser(userId);
                SweetAlert.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
            else {
                SweetAlert.fire(
                    'Your imaginary file is safe!'
                )
            }
        })
    }

    return (
        <Fragment>
            <Breadcrumb parent={menuitemEmployees} title={EmployeeListTitle} />
            <Container fluid={true}>
                <div className="email-wrap bookmark-wrap">
                    <Row>
                        <Col xl="12" md="12" className="box-col-12">
                            <div className="email-right-aside bookmark-tabcontent contacts-tabs">
                                <div className="email-body radius-left">
                                    <div className="pl-0">
                                        <Card className="mb-0">
                                            <CardHeader className="d-flex">
                                                <h5>{"Employees"}</h5><span className="f-14 pull-right mt-0"></span>
                                            </CardHeader>
                                            <CardBody className="p-0">
                                                <Row className="list-persons" >
                                                    <Col xl="4 xl-50" md="5" >
                                                        <ScrollArea horizontal={false} style={{height:'600px',maxHeight:'600px'}} vertical={true} >
                                                            <Nav className="flex-column nav-pills" id="v-pills-tab1" role="tablist" aria-orientation="vertical">
                                                                {users?.map(user =>
                                                                    <NavItem id="myTab" role="tablist">
                                                                        <NavLink href="#javaScript" className={orgactiveTab === user.id ? 'active' : ''} onClick={() => setorgActiveTab(user.id)}>
                                                                            <div className="media">
                                                                                <img className="img-50 img-fluid m-r-20 rounded-circle" src={require("../../../assets/images/user/user.png")} alt="" />
                                                                                <div className="media-body">
                                                                                    <h6>{user.first_name + " " + user.last_name}</h6>
                                                                                    <p>{user.email}</p>
                                                                                </div>
                                                                            </div>
                                                                        </NavLink>
                                                                    </NavItem>
                                                                )}
                                                            </Nav>  
                                                        </ScrollArea>
                                                    </Col>
                                                    <Col xl="8 xl-50" md="7">
                                                        <TabContent activeTab={orgactiveTab}>
                                                            {users?.map(user =>
                                                                <TabPane tabId={user.id}>
                                                                    <div className="profile-mail">
                                                                        <div className="media"><img className="img-100 img-fluid m-r-20 rounded-circle update_img_5" src={require("../../../assets/images/user/user.png")} alt="" />
                                                                            <div className="media-body my-auto">
                                                                                <h5><span className="first_name_5">{user.first_name} </span><span className="last_name_5">{user.last_name}</span></h5>
                                                                                <p className="email_add_5">{user.email}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="email-general">
                                                                            <h6>{General}</h6>
                                                                            <p>{Username}: <span className="font-primary">{user.username}</span></p>
                                                                            <p>{EmailAddress}: <span className="font-primary email_add_5">{user.email}</span></p>
                                                                        </div>
                                                                    </div>
                                                                </TabPane>
                                                            )}
                                                        </TabContent>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>

                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Fragment>
    );
}
export default EmployeeList;