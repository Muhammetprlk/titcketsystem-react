import React,{useState,useEffect} from 'react';
import man from '../assets/images/dashboard/profile.jpg';
import {Container,Row,Col,Form,FormGroup,Input,Label,Button,NavItem, NavLink, Nav,TabContent,TabPane} from 'reactstrap'
import { handleResponse } from '../services/fack.backend'
import { useAuth0 } from '@auth0/auth0-react'
import {withRouter} from 'react-router-dom'
import {Password, EmailAddress,RememberPassword,ForgotPassword ,CreateAccount,AUTH0,JWT,LoginWithJWT,SignInHeader,SignInSubHeader,SignInDontHave,SignInErrorMessage } from '../constant';
import { getToken } from '../api/apiurls';
import axios from 'axios';
import { toast } from 'react-toastify';


const Logins = (props) => {
  
    const {loginWithRedirect} = useAuth0()
    const [email, setEmail] = useState("admin");
    const [password, setPassword] = useState("123");
    const [togglePassword,setTogglePassword] = useState(false)

    const [value, setValue] = useState(
        localStorage.getItem('profileURL' || man)
    );
    const [name, setName] = useState(
        localStorage.getItem('Name')
    );

    useEffect(() => {
      
    localStorage.setItem('profileURL', value);
    localStorage.setItem('Name', name);
    }, [value,name]);


    const loginWithJwt = (username,password) => {
      axios.post(getToken,{username,password}).then(response=>{
        console.log(response.data.token);
        setValue(man);
        setName(response.data.user_firstname+" "+response.data.user_lastname);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isSuperUser', response.data.user_superuser);
        localStorage.setItem('authenticatedUser', JSON.stringify(response.data));
        window.location.href = `${process.env.PUBLIC_URL}/`
        return response.data.token
      }).catch(()=>{
        toast.error(SignInErrorMessage);
      })
    }

    return (
        <Container fluid={true} className="p-0">
        <Row>
        <Col xs="12">     
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="index.html">
                  <img className="img-fluid for-light" src={require("../assets/images/logo/login.png")} alt=""/>
                  <img className="img-fluid for-dark" src={require("../assets/images/logo/logo_dark.png")} alt=""/>
                </a>
              </div>
              <div className="login-main login-tab"> 
                <Nav className="border-tab flex-column" tabs>
                  <NavItem>
                    <NavLink className='active'>
                    <img src={require("../assets/images/jwt.svg")} alt="" />
                    <span>{JWT}</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab="jwt" className="content-login">
                  <TabPane  className="fade show" tabId="jwt">
                    <Form className="theme-form">
                      <h4>{SignInHeader}</h4>
                      <p>{SignInSubHeader}</p>
                      <FormGroup>
                        <Label className="col-form-label">{EmailAddress}</Label>
                        <Input className="form-control" type="email" required="" onChange={e => setEmail(e.target.value)} defaultValue={email} />
                      </FormGroup>
                      <FormGroup>
                        <Label className="col-form-label">{Password}</Label>
                        <Input className="form-control" type={togglePassword ?  "text" : "password"} onChange={e => setPassword(e.target.value)} defaultValue={password} required=""/>
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                      </FormGroup>
                      <div className="form-group mb-0">
                        <div className="checkbox ml-3">
                          <Input id="checkbox1" type="checkbox"/>
                          <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                        </div><a className="link" href="#javascript">{ForgotPassword}</a>
                        <Button color="primary" className="btn-block" onClick={() => loginWithJwt(email,password)}>{LoginWithJWT}</Button>
                      </div>
                      <p className="mt-4 mb-0">{SignInDontHave}<a className="ml-2" href={process.env.PUBLIC_URL+'/register'}>{CreateAccount}</a></p>
                    </Form>
                  </TabPane>
                  <TabPane  className="fade show" tabId="auth0">
                    <div className="auth-content">
                        <img src={require("../assets/images/auth-img.svg")} alt="" />
                        <h4>{"Welcome to login with Auth0"}</h4>
                        <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}</p>
                        <Button color="info" onClick={loginWithRedirect}>{AUTH0}</Button> 
                    </div>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </Col>
        </Row>
        </Container>
    );
}

export default withRouter(Logins);