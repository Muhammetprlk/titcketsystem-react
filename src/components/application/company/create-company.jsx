import React,{useState,Fragment} from 'react';
import {Container,Row,Col,Form,FormGroup,Input,Label,Button,Card,CardBody} from 'reactstrap'
import {Password,CCopmanySuccessMessage,menuitemCreateCompany,menuitemCompany,CCompanyName, CCompanyCreate,CCopmanyAdminName,CCopmanyAdminUsername,CCopmanyAdminEmail,CCopmanyPhone,CCopmanyWebsite,CCopmanyEmail,CCopmanyAdminLastname} from '../../../constant';
import axios from 'axios';
import { toast } from 'react-toastify';
import Breadcrumb from '../../../layout/breadcrumb'
import { useForm } from 'react-hook-form'
import * as API from '../../../api/apiurls';

const CreateCompany = (props) => {
  const { register, handleSubmit, errors } = useForm();   
    const [togglePassword,setTogglePassword] = useState(false)
    const HideShowPassword  = (tPassword) => {
      setTogglePassword(!tPassword)
    }

    const create=(company)=>{
      axios.post(API.createCompany,company,API.getHeader()).then(response=>{
        toast.success(CCopmanySuccessMessage);
      }).catch(error=>{
        toast.error(error.response.data.error);
      });
    }

    return (
      <Fragment>
        <Breadcrumb parent={menuitemCompany} title={menuitemCreateCompany} /> 
        <Container fluid={true}>
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <Form className="theme-form" onSubmit={handleSubmit(create)}>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>{CCompanyName}</Label>
                            <Input className="form-control" type="text"  name="company_name" placeholder="" innerRef={register({ required: true })} />
                            <span style={{ color: "red" }}>{errors.title && 'Title is required'}</span>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4">
                          <FormGroup>
                            <Label>{CCopmanyEmail}</Label>
                            <Input className="form-control" type="text" name="company_email" placeholder="" innerRef={register({ required: true })}/>
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label>{CCopmanyPhone}</Label>
                            <Input className="form-control" type="text" name="company_phone" placeholder="" innerRef={register({ required: true })}/>
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label>{CCopmanyWebsite}</Label>
                            <Input className="form-control" type="text" name="company_website" placeholder="www.example.com" innerRef={register({ required: true })}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4">
                          <FormGroup>
                            <Label>{CCopmanyAdminName}</Label>
                            <Input className="form-control" type="text" name="admin_firstname" placeholder="" innerRef={register({ required: true })}/>
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label>{CCopmanyAdminLastname}</Label>
                            <Input className="form-control" type="text" name="admin_lastname" placeholder="" innerRef={register({ required: true })}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4">
                          <FormGroup>
                            <Label>{CCopmanyAdminUsername}</Label>
                            <Input className="form-control" type="text" name="admin_username" placeholder="" innerRef={register({ required: true })}/>
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label>{CCopmanyAdminEmail}</Label>
                            <Input className="form-control" type="text" name="admin_email" placeholder="" innerRef={register({ required: true })}/>
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label>{Password}</Label>
                            <Input className="form-control" type={togglePassword ?  "text" : "password" } name="admin_password" innerRef={register({ required: true })} placeholder="*********"/>
                            <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup className="mb-0">
                              <Button color="primary" className="mr-3">{CCompanyCreate}</Button>
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

export default CreateCompany;