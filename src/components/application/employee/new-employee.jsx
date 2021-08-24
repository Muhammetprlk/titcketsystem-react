import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button ,Card,CardBody} from 'reactstrap'
import { Password, EmailAddress, Phone, menuitemEmployees,CreateEmployeeSuccessMessage,menuitemEmployeesNew, Username, FirstName, LastName, CreateEmployeeCreate } from '../../../constant';
import Breadcrumb from '../../../layout/breadcrumb'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Fragment } from 'react';
import * as API from '../../../api/apiurls'
import { useForm } from 'react-hook-form'


const NewEmployee = (props) => {

  const { register, handleSubmit, errors } = useForm();   
  const [togglePassword, setTogglePassword] = useState(false)
  const [name, setName] = useState("Muhammet")
  const [surname, setSurname] = useState("Parlak")
  const [username, setUsername] = useState("muha")
  const [email, setEmail] = useState("muh@gmail.com")
  const [phone, setPhone] = useState("5555555555")
  const [password, setPassword] = useState("123123")

  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword)
  }
  
  
  const ClearForm=()=>{
    setName("")
    setEmail("")
    setSurname("")
    setPhone("")
    setPassword("")
    setUsername("")
  }

  const addnewemployee = (data) => {
    console.log(data);
    axios.post(API.employeeCreate, data,API.getHeader()).then(response => {
      toast.success(CreateEmployeeSuccessMessage);
      ClearForm();
      return response.data.token
    }).catch((error) => {
      toast.error(error.response.data.error);
    })
  }

  return (
    <Fragment>
    <Breadcrumb parent={menuitemEmployees} title={menuitemEmployeesNew}  /> 
    <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form className="theme-form" onSubmit={handleSubmit(addnewemployee)}>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{FirstName}</Label>
                        <Input className="form-control" type="text" name="first_name" placeholder="" innerRef={register({ required: true })} onChange={e => setName(e.target.value)} value={name} />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{LastName}</Label>
                        <Input className="form-control" type="text" name="last_name" placeholder="" innerRef={register({ required: true })} onChange={e => setSurname(e.target.value)} value={surname} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{EmailAddress}</Label>
                        <Input className="form-control" type="text" name="email" placeholder="" innerRef={register({ required: true })} onChange={e => setEmail(e.target.value)} value={email} />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{Phone}</Label>
                        <Input className="form-control" type="text" name="phone" placeholder="" innerRef={register({ required: true })} onChange={e => setPhone(e.target.value)} value={phone} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{Username}</Label>
                        <Input className="form-control" type="text" name="username" placeholder="" innerRef={register({ required: true })} onChange={e => setUsername(e.target.value)} value={username} />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{Password}</Label>
                        <Input className="form-control" type={togglePassword ? "text" : "password"} name="password" onChange={e => setPassword(e.target.value)} innerRef={register({ required: true })} required="" placeholder="*********" onChange={e => setPassword(e.target.value)} value={password} />
                        <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                          <Button color="primary" className="mr-3">{CreateEmployeeCreate}</Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default NewEmployee;