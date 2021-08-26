import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalFooter, ModalHeader, ModalBody, Label, Input, FormGroup,  Button } from 'reactstrap'
import SweetAlert from 'sweetalert2'
import { Username, EmailAddress, EmployeeListTitle, EmployeeListPasswordOptional,menuitemEmployees, General, Cancel, SaveChanges, EmployeeName, FirstName, LastName } from '../../../constant'
import axios from 'axios';
import * as API from '../../../api/apiurls';
import { toast } from 'react-toastify';
import ScrollArea from 'react-scrollbar';


const EmployeeList = (props) => {
    const [orgactiveTab, setorgActiveTab] = useState();
    const [users, setUsers] = useState([]);

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


    const HideShowPassword = (tPassword) => {
        setTogglePassword(!tPassword)
    }

    const UpdateEmployee = () => {
        const updatedUser={id:employee.id,firstname:name,lastname:surname,email:email,password:password,username:username}
        axios.post(API.employeeUpdate,updatedUser,API.getHeader()).then(response=>{
            const u=response.data;
            const newEmployeeList=[]
            users.forEach(user => {
                if(u.id===user.id){newEmployeeList.push(u)}
                else{newEmployeeList.push(user)}
            });
            setUsers(newEmployeeList);
        }).catch(error=>{
            toast.error(error.response.data.error);
        })
        updateEmployeeToggle();
    }

    const ClearForm=()=>{
        setName("");
        setSurname("");
        setUsername("");
        setEmail("");
        setPassword("");
    }

    const FillForm=(user)=>{
        setEmployee(user);
        setName(user.first_name);
        setSurname(user.last_name);
        setUsername(user.username);
        setEmail(user.email);
        updateEmployeeToggle();
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
                                                        <ScrollArea horizontal={false} style={{ height: '600px', maxHeight: '600px' }} vertical={true} >
                                                            <Nav className="flex-column nav-pills" id="v-pills-tab1" role="tablist" aria-orientation="vertical">
                                                                {users?.map(user =>
                                                                    <NavItem key={user.id} id="myTab" role="tablist">
                                                                        <NavLink   className={orgactiveTab === user.id ? 'active' : ''} onClick={() => setorgActiveTab(user.id)}>
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
                                                                <TabPane key={user.id} tabId={user.id}>
                                                                    <div className="profile-mail">
                                                                        <div className="media"><img className="img-100 img-fluid m-r-20 rounded-circle update_img_5" src={require("../../../assets/images/user/user.png")} alt="" />
                                                                            <div className="media-body my-auto">
                                                                                <h5><span className="first_name_5">{user.first_name} </span><span className="last_name_5">{user.last_name}</span></h5>
                                                                                <p className="email_add_5">{user.email}</p>
                                                                            </div>
                                                                            <div className="update-profile" onClick={() => { FillForm(user)}} ><div className="icon-wrapper"><i className="font-primary icofont icofont-pencil-alt-5"></i></div></div>
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
                <Modal isOpen={updateEmployeeModal} toggle={updateEmployeeToggle} centered>
                    <ModalHeader toggle={updateEmployeeToggle}>
                        {employee.first_name+" "+employee.last_name}
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
                            <Label className="col-form-label">{EmailAddress}</Label>
                            <Input className="form-control" type="email" required="" placeholder="Test@gmail.com" onChange={e => setEmail(e.target.value)} defaultValue={email} />
                        </FormGroup>
                        <FormGroup>
                            <Label className="col-form-label">{EmployeeListPasswordOptional}</Label>
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
export default EmployeeList;