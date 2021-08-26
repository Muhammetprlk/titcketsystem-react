import React, { Fragment, useState, useEffect, useRef } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalFooter, ModalHeader, Table, ModalBody, Label, Input, FormGroup, Form, Button } from 'reactstrap'
import SweetAlert from 'sweetalert2'
import { Username, EmailAddress, EmployeeListTitle, menuitemEmployees, menuitemCompany, menuitemListCompany, General, Cancel, SaveChanges, EmployeeName, FirstName, LastName, SetClassicTheme, Website, Email, Phone, Admin, FullName, CListEmployeeCount, CListEmployees, ProjectList } from '../../../constant'
import axios from 'axios';
import * as API from '../../../api/apiurls';
import { toast } from 'react-toastify';
import ScrollArea from 'react-scrollbar';
import { Link } from 'react-router-dom';


const CompanyList = (props) => {
    const [orgactiveTab, setorgActiveTab] = useState();
    const [companys, setCompanys] = useState([]);

    const [togglePassword, setTogglePassword] = useState(false)
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [updateEmployeeModal, setUpdateEmployeeModal] = useState(false);
    const [employee, setEmployee] = useState({})
    const updateEmployeeToggle = () => {
        if (updateEmployeeModal) {
            ClearForm();
            setEmployee({});
        }
        setUpdateEmployeeModal(!updateEmployeeModal);
    }

    useEffect(() => {
        axios.get(API.dashboardSuperUser, API.getHeader()).then(response => {
            console.log(response.data);
            if (response.data.Companys.length > 0) {
                setorgActiveTab(response.data.Companys[0].id);
            }
            setCompanys(response.data.Companys);
        }).catch(error => {
            toast.error(error.response.data.error);
        });

    }, []);


    const HideShowPassword = (tPassword) => {
        setTogglePassword(!tPassword)
    }

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

    const UpdateEmployee = () => {
        const updatedUser = { id: employee.id, firstname: name, lastname: surname, email: email, password: password, username: username }
        axios.post(API.employeeUpdate, updatedUser, API.getHeader()).then(response => {
            console.log(response);
        }).catch(error => {
            toast.error(error.response.data.error);
        })
        updateEmployeeToggle();
    }

    const ClearForm = () => {
        setName("");
        setSurname("");
        setUsername("");
        setEmail("");
        setPassword("");
    }

    const FillForm = (user) => {
        setEmployee(user);
        setName(user.first_name);
        setSurname(user.last_name);
        setUsername(user.username);
        setEmail(user.email);
        updateEmployeeToggle();
    }

    return (
        <Fragment>
            <Breadcrumb parent={menuitemListCompany} />
            <Container fluid={true}>
                <div className="email-wrap bookmark-wrap">
                    <Row>
                        <Col xl="12" md="12" className="box-col-12">
                            <div className="email-right-aside bookmark-tabcontent contacts-tabs">
                                <div className="email-body radius-left">
                                    <div className="pl-0">
                                        <Card className="mb-0">
                                            <CardHeader className="d-flex">
                                                <h5>{"Companys"}</h5><span className="f-14 pull-right mt-0"></span>
                                            </CardHeader>
                                            <CardBody className="p-0">
                                                <Row className="list-persons" >
                                                    <Col xl="4 xl-50" md="5" >
                                                        <ScrollArea horizontal={false} style={{ height: '600px', maxHeight: '600px' }} vertical={true} >
                                                            <Nav className="flex-column nav-pills" id="v-pills-tab1" role="tablist" aria-orientation="vertical">
                                                                {companys?.map(c =>
                                                                    <NavItem key={c.id} id="myTab" role="tablist">
                                                                        <NavLink   className={orgactiveTab === c.id ? 'active' : ''} onClick={() => setorgActiveTab(c.id)}>
                                                                            <div className="media">
                                                                                {/* <img className="img-50 img-fluid m-r-20 rounded-circle" src={require("../../../assets/images/user/user.png")} alt="" /> */}
                                                                                <div className="media-body">
                                                                                    <h6>{c.name}</h6>
                                                                                    <p>{c.website}</p>
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
                                                            {companys?.map(c =>
                                                                <TabPane key={c.id} tabId={c.id}>
                                                                    <div className="profile-mail">
                                                                        <div className="media">
                                                                            {/* <img className="img-100 img-fluid m-r-20 rounded-circle update_img_5" src={require("../../../assets/images/user/user.png")} alt="" /> */}
                                                                            <div className="media-body my-auto">
                                                                                <h5><span className="first_name_5">{c.name} </span></h5>
                                                                                <p className="email_add_5">{Website}:  <span className="font-primary">{c.website}</span></p>
                                                                                <p className="email_add_5">{Email}:  <span className="font-primary">{c.email}</span></p>
                                                                                <p className="email_add_5">{Phone}:  <span className="font-primary">{c.phone}</span></p>
                                                                                <p className="email_add_5">{CListEmployeeCount}:  <span className="font-primary">{c.employees.length}</span></p>
                                                                                <Link to={`${process.env.PUBLIC_URL}/app/project/project-list/${c.id + "/"}`}>  <strong className="font-primary email_add_5" >{ProjectList}</strong> </Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="email-general">
                                                                            <h6>{Admin}</h6>
                                                                            <p>{FullName}: <span className="font-primary">{c.admin_first_name + " " + c.admin_last_name}</span></p>
                                                                            <p>{Username}: <span className="font-primary">{c.admin_username}</span></p>
                                                                            <p>{Email}: <span className="font-primary">{c.admin_email}</span></p>
                                                                            {/* <p>{EmailAddress}: <span className="font-primary email_add_5">{user.email}</span></p> */}
                                                                        </div>
                                                                        <div className="table-responsive">
                                                                            <div className="email-general">
                                                                                <h6>{CListEmployees}</h6>
                                                                                <ScrollArea horizontal={false} vertical={true} >
                                                                                    <Table>
                                                                                        <thead className="thead-light">
                                                                                            <tr>
                                                                                                <th scope="col">{"#"}</th>
                                                                                                <th scope="col">{FullName}</th>
                                                                                                <th scope="col">{Username}</th>
                                                                                                <th scope="col">{Email}</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {c.employees?.map((emp, key) =>
                                                                                                <tr>
                                                                                                    <th scope="row" key={key} >{key + 1}</th>
                                                                                                    <td>{emp.first_name + " " + emp.last_name}</td>
                                                                                                    <td>{emp.username}</td>
                                                                                                    <td>{emp.email}</td>
                                                                                                </tr>
                                                                                            )}
                                                                                        </tbody>
                                                                                    </Table>
                                                                                </ScrollArea>
                                                                            </div>
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
                <Modal isOpen={updateEmployeeModal} toggle={updateEmployeeToggle} centered>
                    <ModalHeader toggle={updateEmployeeToggle}>
                        {employee.first_name + " " + employee.last_name}
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label className="col-form-label pt-0">{EmployeeName}</Label>
                            <div className="form-row">
                                <Col xs="6">
                                    <Input className="form-control" type="text" required="" placeholder={FirstName} onChange={e => setName(e.target.value)} defaultValue={name} />
                                </Col>
                                <Col xs="6">
                                    <Input className="form-control" type="text" required="" placeholder={LastName} onChange={e => setSurname(e.target.value)} defaultValue={surname} />
                                </Col>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label className="col-form-label">{Username}</Label>
                            <Input className="form-control" type="text" required="" placeholder={Username} onChange={e => setUsername(e.target.value)} defaultValue={username} />
                        </FormGroup>
                        <FormGroup>
                            <Label className="col-form-label">{"EmailAddress"}</Label>
                            <Input className="form-control" type="email" required="" placeholder="Test@gmail.com" onChange={e => setEmail(e.target.value)} defaultValue={email} />
                        </FormGroup>
                        <FormGroup>
                            <Label className="col-form-label">{"Password"}</Label>
                            <Input className="form-control" type={togglePassword ? "text" : "password"} name="login[password]" onChange={e => setPassword(e.target.value)} defaultValue={password} required="" placeholder="*********" />
                            <div className="show-hide2" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={updateEmployeeToggle}>{Cancel}</Button>
                        <Button color="primary" onClick={UpdateEmployee}>{SaveChanges}</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </Fragment>
    );
}
export default CompanyList;