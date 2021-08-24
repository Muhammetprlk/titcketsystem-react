import React,{useState,Fragment} from 'react';
import {Container,Row,Col,Form,FormGroup,Input,Label,Button,Card,CardBody} from 'reactstrap'
import {Password,SignIn, EmailAddress,Phone ,CCopmanySuccessMessage,CreateAccount,CCompanyName, YourName, PrivacyPolicy,Username ,CCompanyCreate,RegisterPersonalDetails,FirstName,LastName,CCopmanyAdminName,CCopmanyAdminUsername,CCopmanyAdminEmail,CCopmanyPhone,CCopmanyWebsite,CCopmanyEmail,CCopmanyAdminLastname} from '../../../constant';
import { Twitter, Facebook,GitHub } from 'react-feather';
import axios from 'axios';
import { toast } from 'react-toastify';
import Breadcrumb from '../../../layout/breadcrumb'
import { useForm } from 'react-hook-form'
import * as API from '../../../api/apiurls';

const CreateCompany = (props) => {
  const { register, handleSubmit, errors } = useForm();   
    const [togglePassword,setTogglePassword] = useState(false)
    // const [companyName,setCompanyName] = useState("")
    // const [companyPhone,setCompanyPhone] = useState("")
    // const [companyWebsite,setCompanyWebsite] = useState("")
    // const [companyEmail,setCompanyEmail] = useState("")
    // const [name,setName] = useState("")
    // const [surname,setSurname] = useState("")
    // const [username,setUsername] = useState("")
    // const [email,setEmail] = useState("")
    // const [password,setPassword] = useState("")

    const HideShowPassword  = (tPassword) => {
      setTogglePassword(!tPassword)
    }

    const CreateComp=(companyname,user_name,user_surname,user_username,user_email,user_phone,user_password)=>{
        let  company={
            company_name:companyname,
            first_name: user_name,
            last_name: user_surname,
            username: user_username,
            phone:user_phone,
            email: user_email,
            password: user_password,
        }
        axios.post("/api",company).then(response=>{
            console.log(response);
            return response.data.token
          }).catch((error)=>{
              console.log(error.response);
            // toast.error();
          })
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
        <Breadcrumb parent={CCompanyCreate} /> 
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
      // <Container fluid={true} className="p-0">
      // <Row>
      //   <Col xs="12">     
      //     <div className="login-card">
      //       <div>
      //         <div className="login-main"> 
      //           <Form className="theme-form">
      //             <h4>{CCompanyCreate}</h4>
      //             <FormGroup>
      //               <Label className="col-form-label">{CCompanyName}</Label>
      //               <Input className="form-control" type="text" maxLength="30" required="" onChange={e => setCompanyName(e.target.value)} />
      //             </FormGroup>
      //             <FormGroup>
      //               <Label className="col-form-label">{CCopmanyEmail}</Label>
      //               <Input className="form-control" type="text" maxLength="10" required="" placeholder="" onChange={e => setCompanyEmail(e.target.value)} defaultValue={companyEmail}/>
      //             </FormGroup>
      //             <FormGroup>
      //               <Label className="col-form-label">{CCopmanyPhone}</Label>
      //               <Input className="form-control" type="text" maxLength="10" required="" placeholder="" onChange={e => setCompanyPhone(e.target.value)} defaultValue={companyPhone}/>
      //             </FormGroup>
      //             <FormGroup>
      //               <Label className="col-form-label">{CCopmanyWebsite}</Label>
      //               <Input className="form-control" type="text" maxLength="" required="" placeholder="www.example.com" onChange={e => setCompanyWebsite(e.target.value)} defaultValue={companyWebsite}/>
      //             </FormGroup>
      //             <hr></hr>
      //             <FormGroup>
      //               <Label className="col-form-label pt-0">{CCopmanyAdminName}</Label>
      //               <div className="form-row">
      //                 <Col xs="6">
      //                   <Input className="form-control" type="text" required="" placeholder={FirstName} onChange={e => setName(e.target.value)} defaultValue={name}/>
      //                 </Col>
      //                 <Col xs="6">
      //                   <Input className="form-control" type="text" required="" placeholder={LastName} onChange={e => setSurname(e.target.value)} defaultValue={surname} />
      //                 </Col>
      //               </div>
      //             </FormGroup>
      //             <FormGroup>
      //               <Label className="col-form-label">{CCopmanyAdminUsername}</Label>
      //               <Input className="form-control" type="text" required="" placeholder={Username} onChange={e => setUsername(e.target.value)} defaultValue={username}/>
      //             </FormGroup>
      //             <FormGroup>
      //               <Label className="col-form-label">{CCopmanyAdminEmail}</Label>
      //               <Input className="form-control" type="email" required="" placeholder="Test@gmail.com" onChange={e => setEmail(e.target.value)} defaultValue={email} />
      //             </FormGroup>
      //             <FormGroup>
      //               <Label className="col-form-label">{Password}</Label>
      //               <Input className="form-control" type={togglePassword ?  "text" : "password" } name="login[password]" onChange={e => setPassword(e.target.value)} defaultValue={password} required="" placeholder="*********"/>
      //               <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
      //             </FormGroup>
      //             <div className="form-group mb-0">
      //                 <br></br>
      //               <Button color="primary" className="btn-block" onClick={()=>CreateComp(companyName,companyEmail,companyPhone,companyWebsite,name,surname,username,email,password)} >{CCompanyCreate}</Button>
      //             </div>
      //           </Form>
      //         </div>
      //       </div>
      //     </div>
      //   </Col>
      // </Row>
      // </Container>
    );
}

export default CreateCompany;