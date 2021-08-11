import React,{useState} from 'react';
import {Container,Row,Col,Form,FormGroup,Input,Label,Button} from 'reactstrap'
import {Password,SignIn, EmailAddress,Phone ,CreateAccount,CCompanyName, YourName, PrivacyPolicy,Username ,CCompanyCreate,RegisterPersonalDetails,FirstName,LastName,CCopmanyAdminName,CCopmanyAdminUsername,CCopmanyAdminEmail,CCopmanyAdminPhone} from '../../constant';
import { Twitter, Facebook,GitHub } from 'react-feather';
import axios from 'axios';
import { toast } from 'react-toastify';
import { createAccountApi } from '../../api/apiurls';


const CreateCompany = (props) => {

    const [togglePassword,setTogglePassword] = useState(false)
    const [name,setName] = useState("")
    const [companyName,setCompanyName] = useState("")
    const [surname,setSurname] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [password,setPassword] = useState("")

    const HideShowPassword  = (tPassword) => {
      setTogglePassword(!tPassword)
    }

    const CreateComp=(user_name,user_surname,user_username,user_email,user_phone,user_password)=>{
        let user={
            first_name: user_name,
            last_name: user_surname,
            username: user_username,
            phone:user_phone,
            email: user_email,
            password: user_password,
        }
        axios.post(createAccountApi,user).then(response=>{
            console.log(response);
            return response.data.token
          }).catch((error)=>{
              console.log(error.response);
            // toast.error();
          })
    }

    return (
      <Container fluid={true} className="p-0">
      <Row>
        <Col xs="12">     
          <div className="login-card">
            <div>
              <div className="login-main"> 
                <Form className="theme-form">
                  <h4>{CCompanyCreate}</h4>
                  <FormGroup>
                    <Label className="col-form-label">{CCompanyName}</Label>
                    <Input className="form-control" type="text" required="" onChange={e => setCompanyName(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label pt-0">{CCopmanyAdminName}</Label>
                    <div className="form-row">
                      <Col xs="6">
                        <Input className="form-control" type="text" required="" placeholder={FirstName} onChange={e => setName(e.target.value)} defaultValue={name}/>
                      </Col>
                      <Col xs="6">
                        <Input className="form-control" type="text" required="" placeholder={LastName} onChange={e => setSurname(e.target.value)} defaultValue={surname} />
                      </Col>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{CCopmanyAdminUsername}</Label>
                    <Input className="form-control" type="text" required="" placeholder={Username} onChange={e => setUsername(e.target.value)} defaultValue={username}/>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{CCopmanyAdminEmail}</Label>
                    <Input className="form-control" type="email" required="" placeholder="Test@gmail.com" onChange={e => setEmail(e.target.value)} defaultValue={email} />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{CCopmanyAdminPhone}</Label>
                    <Input className="form-control" type="text" maxLength="10" required="" placeholder="5XXXXXXXXX" onChange={e => setPhone(e.target.value)} defaultValue={phone}/>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <Input className="form-control" type={togglePassword ?  "text" : "password" } name="login[password]" onChange={e => setPassword(e.target.value)} defaultValue={password} required="" placeholder="*********"/>
                    <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                  </FormGroup>
                  <div className="form-group mb-0">
                      <br></br>
                    <Button color="primary" className="btn-block" onClick={()=>CreateComp(name,surname,username,email,phone,password)} >{CCompanyCreate}</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      </Container>
    );
}

export default CreateCompany;