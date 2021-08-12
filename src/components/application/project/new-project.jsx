import React, { Fragment, useState ,useEffect} from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import Dropzone from 'react-dropzone-uploader'
import { Container, Row, Col, Card, CardBody, Form, Modal, ModalHeader, ModalBody, ModalFooter, Media, FormGroup, Label, Input, Button } from 'reactstrap'
import DatePicker from "react-datepicker";
import { useForm } from 'react-hook-form'
import { addNewProject } from '../../../redux/project-app/action'
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { ProjectTitle, CreateProjectSuccesMessage,CreateProjectConfirmationHeader, CreateProjectConfimationMessage,Yes,Cancel, ProjectStatus, Open, Closed, EnterSomeDetails, Add, CreateProject,CreateProjectSearchCollaborators } from '../../../constant'
import * as API from '../../../api/apiurls';
import axios from 'axios'
import { toast } from 'react-toastify';
import one from "../../../assets/images/user/1.jpg";
import three from "../../../assets/images/user/3.jpg";
import ScrollArea from 'react-scrollbar';


const Newproject = (props) => {

  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm();
  const {searchbar,setSearchbar}=useState("");
  const [confirmation, setConfitmation] = useState({ toggle: false, item: {} });
  const [users, setUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')));

  useEffect(() => {
    axios.post(API.getCompany,{admin:authenticatedUser.user_id}).then(response=>{
      console.log(response.data);
      const employees=[];
      response.data.employee.map(e=>{
        employees.push({...e,isSelect:false});
      });
      console.log(employees);
      setUsers(employees);
      setFoundUsers(employees);
    });
  },[]);


  const handleAddUser = (user) => {
    if (confirmation.toggle) toggleConfirmation();
    user.isSelect = !user.isSelect;
    const list = [];
    users.map(u => {
      if (u.id === user.id) {
        list.push(user);
      }
      else {
        list.push(u);
      }
    })
    setUsers(list);
  }

  const filter=(event)=>{
    const keyword = event.target.value;
    if (keyword !== '') {
      const results = users.filter((user) => {
        return (user.first_name+" "+user.last_name).toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(users);
    }
    setSearchbar(keyword);
  }


  const AddProject = data => {
    if (data !== '') {

      const collaborators=[];
      users.map((u)=>{
        if(u.isSelect){
          collaborators.push(u.id);
        }
      });

      const project = {
        collaborators:collaborators,
        title: data.project_title,
        content: data.project_description,
        status: data.project_status === Closed ? 1 : 2,
        user: authenticatedUser.user_id,
      }

      console.log(project);
      // axios.post(API.createProject, project).then(response => {
      //   console.log(response.data);
      //   toast.success(CreateProjectSuccesMessage);
      // }).catch(error => {
      //   console.log(error.response);
      // });


    } else {
      errors.showMessages();
    }
  };

  const toggleConfirmation = () => {
    setConfitmation({ toggle: false, item: {} });
  }

  return (
    <Fragment>
      <Breadcrumb parent="Project" title={CreateProject} />
      <Container fluid={true}>
        <Row>
          <Col sm="8">
            <Card>
              <CardBody>
                <Form className="theme-form" onSubmit={handleSubmit(AddProject)}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>{ProjectTitle}</Label>
                        <Input className="form-control" type="text" name="project_title" innerRef={register({ required: true })} />
                        <span style={{ color: "red" }}>{errors.title && 'Title is required'}</span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <FormGroup>
                        <Label>{ProjectStatus}</Label>
                        <Input type="select" name="project_status" className="form-control digits" innerRef={register({ required: true })}>
                          <option value={Open}>{Open}</option>
                          <option value={Closed}>{Closed}</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>{EnterSomeDetails}</Label>
                        <Input type="textarea" className="form-control" name="project_description" rows="3" innerRef={register({ required: true })} />
                        <span style={{ color: "red" }}>{errors.description && 'Some Details is required'}</span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                        <Button color="success" className="mr-3">{Add}</Button>
                        <Link to={`${process.env.PUBLIC_URL}/app/project/project-list`}>
                          <Button color="danger">{Cancel}</Button>
                        </Link>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <CardBody className="social-status filter-cards-view">
                <ScrollArea horizontal={false} vertical={true} >
                  <Form>
                    <FormGroup className="m-0">
                      <Input className="form-control-social" value={searchbar} onChange={filter} type="search" placeholder={CreateProjectSearchCollaborators} />
                    </FormGroup>
                  </Form>
                  {foundUsers?.map((user) => {
                    return <Media>
                      <img className="img-50 rounded-circle m-r-15" src={three} alt="fourteenImg" />
                      <div className="social-status social-online"></div>
                      <Media body>
                        <span className="f-w-600 d-block">{user.first_name+" "+user.last_name}</span><span className="d-block">{user.email}</span>
                      </Media>
                      <div className="mr-5 my-auto">
                        <div className="product-icon">
                          <ul className="product-social">
                            <li className="d-inline-block" >
                              {user.isSelect ? <a onClick={() => { setConfitmation({ toggle: true, item: user }) }} > <i style={{ color: "#dc3545" }} className="fa fa-minus"></i> </a> : <a onClick={() => { handleAddUser(user) }} ><i style={{ color: "#51bb25" }} className="fa fa-plus"></i></a>}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Media>
                  })}
                </ScrollArea>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={confirmation.toggle} size="xs" toggle={toggleConfirmation} centered >
        <ModalHeader toggle={toggleConfirmation}>{CreateProjectConfirmationHeader}</ModalHeader>
        <ModalBody>
          {CreateProjectConfimationMessage}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleConfirmation}>{Cancel}</Button>
          <Button color="success" onClick={() => { handleAddUser(confirmation.item) }}>{Yes}</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}

export default withRouter(Newproject);