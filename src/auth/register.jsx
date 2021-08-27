import React,{useState} from 'react';
import {Container,Row,Col,Form,FormGroup,Input,Label,Button} from 'reactstrap'
import {Password,SignIn, EmailAddress,Phone ,CreateAccount, YourName, PrivacyPolicy,Username ,RegisterCreateYourAccount,RegisterPersonalDetails,FirstName,LastName} from '../constant';
import axios from 'axios';
import { createAccountApi } from '../api/apiurls';


const Register = (props) => {

    const [togglePassword,setTogglePassword] = useState(false)
    const [name,setName] = useState("Muhammet")
    const [surname,setSurname] = useState("Parlak")
    const [username,setUsername] = useState("muha")
    const [email,setEmail] = useState("muh@gmail.com")
    const [phone,setPhone] = useState("5555555555")
    const [password,setPassword] = useState("123123")

    const HideShowPassword  = (tPassword) => {
      setTogglePassword(!tPassword)
    }

    const register=(user_name,user_surname,user_username,user_email,user_phone,user_password)=>{
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
              <div><a className="logo" href="#javascript"  ><img className="img-fluid for-light" src={require("../assets/images/logo/login.png")} alt="looginpage"/><img className="img-fluid for-dark" src={require("../assets/images/logo/logo_dark.png")} alt="looginpage"/></a></div>
              <div className="login-main"> 
                <Form className="theme-form">
                  <h4>{RegisterCreateYourAccount}</h4>
                  <p>{RegisterPersonalDetails}</p>
                  <FormGroup>
                    <Label className="col-form-label pt-0">{YourName}</Label>
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
                    <Label className="col-form-label">{Username}</Label>
                    <Input className="form-control" type="text" required="" placeholder="Username" onChange={e => setUsername(e.target.value)} defaultValue={username}/>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input className="form-control" type="email" required="" placeholder="Test@gmail.com" onChange={e => setEmail(e.target.value)} defaultValue={email} />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Phone}</Label>
                    <Input className="form-control" type="text" maxLength="10" required="" placeholder="5XXXXXXXXX" onChange={e => setPhone(e.target.value)} defaultValue={phone}/>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <Input className="form-control" type={togglePassword ?  "text" : "password" } name="login[password]" onChange={e => setPassword(e.target.value)} defaultValue={password} required="" placeholder="*********"/>
                    <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                  </FormGroup>
                  <div className="form-group mb-0">
                    <div className="checkbox ml-3">
                      <Input id="checkbox1" type="checkbox"/>
                      <Label className="text-muted" for="checkbox1">{"Agree with"}<a className="ml-2" href="#javascript" >{PrivacyPolicy}</a></Label>
                    </div>
                    <Button color="primary" className="btn-block" onClick={()=>register(name,surname,username,email,phone,password)} >{CreateAccount}</Button>
                  </div>
                  <p className="mt-4 mb-0">{"Already have an account?"}<a className="ml-2" href="#javascript" >{SignIn}</a></p>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      </Container>
    );
}

export default Register;