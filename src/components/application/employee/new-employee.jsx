import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button ,Card,CardBody} from 'reactstrap'
import { Password, EmailAddress, Phone, menuitemEmployees,CreateEmployeeSuccessMessage,menuitemEmployeesNew, Username, FirstName, LastName, CreateEmployeeCreate } from '../../../constant';
import Breadcrumb from '../../../layout/breadcrumb'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Fragment } from 'react';
import * as API from '../../../api/apiurls'
import { useForm } from 'react-hook-form'
import { translate } from 'react-switch-lang';


const NewEmployee = (props) => {

  const { register, handleSubmit } = useForm();   
  const [togglePassword, setTogglePassword] = useState(false)
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

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
      toast.success(props.t(CreateEmployeeSuccessMessage));
      ClearForm();
      return response.data.token
    }).catch((error) => {
      toast.error(error.response.data.error);
    })
  }

  return (
    <Fragment>
    <Breadcrumb parent={props.t(menuitemEmployees)} title={props.t(menuitemEmployeesNew)}  /> 
    <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form className="theme-form" onSubmit={handleSubmit(addnewemployee)}>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{props.t(FirstName)}</Label>
                        <Input className="form-control" type="text" name="first_name" placeholder="" innerRef={register({ required: true })} onChange={e => setName(e.target.value)} value={name} />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{props.t(LastName)}</Label>
                        <Input className="form-control" type="text" name="last_name" placeholder="" innerRef={register({ required: true })} onChange={e => setSurname(e.target.value)} value={surname} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{props.t(EmailAddress)}</Label>
                        <Input className="form-control" type="text" name="email" placeholder="" innerRef={register({ required: true })} onChange={e => setEmail(e.target.value)} value={email} />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{props.t(Phone)}</Label>
                        <Input className="form-control" type="text" name="phone" placeholder="" innerRef={register({ required: true })} onChange={e => setPhone(e.target.value)} value={phone} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{props.t(Username)}</Label>
                        <Input className="form-control" type="text" name="username" placeholder="" innerRef={register({ required: true })} onChange={e => setUsername(e.target.value)} value={username} />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>{props.t(Password)}</Label>
                        <Input className="form-control" type={togglePassword ? "text" : "password"} name="password" innerRef={register({ required: true })} required="" placeholder="*********" onChange={e => setPassword(e.target.value)} value={password} />
                        <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                          <Button color="primary" className="mr-3">{props.t(CreateEmployeeCreate)}</Button>
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

export default translate(NewEmployee);