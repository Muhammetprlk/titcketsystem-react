import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, Form, Media, FormGroup, Label, Input, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { withRouter,useLocation} from 'react-router-dom'
import { ProjectTitle, UpdateProjectSuccesMessage,menuitemProject,  Update,UpdateProjectConfimationMessage, Yes, Cancel, ProjectStatus, Open, Closed, EnterSomeDetails, UpdateProjectTitle, UpdateProjectSearchCollaborators } from '../../../constant'
import * as API from '../../../api/apiurls';
import axios from 'axios'
import { toast } from 'react-toastify';
import three from "../../../assets/images/user/3.jpg";
import ScrollArea from 'react-scrollbar';
import SweetAlert from 'sweetalert2'


const UpdateProject = (props) => {
    const {query} =useLocation();
    if(query===undefined){
        window.location.replace(`${process.env.PUBLIC_URL}/app/project/project-list/`);
    }
    console.log(query);
  const { register, handleSubmit, errors } = useForm();
  const [ projectTitle, setProjectTitle ] = useState(query.title);
  const project_id = query.id;
  const [ projectDescription, setProjectDescription ] = useState(query.content);
  const [ projectStatus, setProjectStatus ] = useState(query.status===1?Open:Closed);
  const [ searchbar, setSearchbar ] = useState("");
  const [users, setUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    axios.get(API.getCompany,API.getHeader()).then(response => {
      console.log(response.data);
      const employees = [];
      response.data.employee.map(e => {
        employees.push({ ...e, isSelect: query.employees.includes(e.id)?true:false });
      });
      console.log(employees);
      setUsers(employees);
      setFoundUsers(employees);
    });
  }, []);


  const handleAddUser = (user) => {
    user.isSelect = !user.isSelect;
    if (!user.isSelect) {
      SweetAlert.fire({
        title: UpdateProjectConfimationMessage,
        cancelButtonText: Cancel,
        confirmButtonText: Yes,
        reverseButtons: true,
        showCancelButton: true,
      }).then(result => {
        if (result.value) {
          changeSpesificUser(user);
        }
      })
    }
    else {
      changeSpesificUser(user);
    }
  }

  const changeSpesificUser = (user) => {
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

  const filter = (event) => {
    const keyword = event.target.value;
    if (keyword !== '') {
      const results = users.filter((user) => {
        return (user.first_name + " " + user.last_name).toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(users);
    }
    setSearchbar(keyword);
  }

  const ClearForm=()=>{
    setProjectStatus(Open);
    setProjectTitle("");
    setProjectDescription("");

    const list = [];
    users.map(u => {
      u.isSelect=false;
      list.push(u);
    })

    setUsers(list);
    setFoundUsers(list);
  }

  const cancel=()=>{
    window.location.replace(`${process.env.PUBLIC_URL}/app/project/project-list/`);
  }

  const UpdateProjectF = data => {
    if (data !== '') {
      const collaborators = [];
      users.map((u) => {
        if (u.isSelect) {
          collaborators.push(u.id);
        }
      });

      const project = {
        id:project_id,
        employees: collaborators,
        title: data.project_title,
        content: data.project_description,
        status: data.project_status !== Closed ? 1 : 2,
      }

      console.log(project);
      axios.post(API.updateProjectApi, project,API.getHeader()).then(response => {
        toast.success(UpdateProjectSuccesMessage);
        ClearForm();
        window.location.replace(`${process.env.PUBLIC_URL}/app/project/project-list/`);
      }).catch(error => {
        toast.error(error.response.data.error);
      });


    } else {
      errors.showMessages();
    }
  };

  return (
    <Fragment>
      <Breadcrumb parent={menuitemProject} title={UpdateProjectTitle} />
      <Container fluid={true}>
        <Row>
          <Col sm="7">
            <Card>
              <CardBody>
                <Form className="theme-form" onSubmit={handleSubmit(UpdateProjectF)}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>{ProjectTitle}</Label>
                        <Input className="form-control" type="text" name="project_title" innerRef={register({ required: true })}  onChange={e => setProjectTitle(e.target.value)} value={projectTitle} />
                        <span style={{ color: "red" }}>{errors.title && 'Title is required'}</span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>{EnterSomeDetails}</Label>
                        <Input type="textarea" className="form-control" name="project_description" rows="3" innerRef={register({ required: true })}  onChange={e => setProjectDescription(e.target.value)} value={projectDescription} />
                        <span style={{ color: "red" }}>{errors.description && 'Some Details is required'}</span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col >
                      <FormGroup>
                        <Label>{ProjectStatus}</Label>
                        <Input type="select" name="project_status" className="form-control digits" innerRef={register({ required: true })}  onChange={e => setProjectStatus(e.target.value)} value={projectStatus} >
                          <option value={Open}>{Open}</option>
                          <option value={Closed}>{Closed}</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                        <Button color="primary" className="mr-3">{Update}</Button>
                          <Button color="light" onClick={()=>{cancel()}} >{Cancel}</Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col sm="5">
            <Card>
              <CardBody className="social-status filter-cards-view">
                <ScrollArea horizontal={false} vertical={true} >
                  <Form>
                    <FormGroup className="m-0">
                      <Input className="form-control-social" value={searchbar} onChange={filter} type="search" placeholder={UpdateProjectSearchCollaborators} />
                    </FormGroup>
                  </Form>
                  {foundUsers?.map((user) => {
                    return <Media key={user.id}>
                      <img className="img-50 rounded-circle m-r-15" src={three} alt="fourteenImg" />
                      <div className="social-status social-online"></div>
                      <Media body>
                        <span className="f-w-600 d-block">{user.first_name + " " + user.last_name}</span><span className="d-block">{user.email}</span>
                      </Media>
                      <div className="mr-5 my-auto">
                        <div className="product-icon">
                          <ul className="product-social">
                            <li className="d-inline-block" >
                              <a onClick={() => { handleAddUser(user) }} >{user.isSelect ? <i style={{ color: "#dc3545" }} className="fa fa-minus"></i> : <i style={{ color: "#51bb25" }} className="fa fa-plus"></i>}</a>
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
    </Fragment>
  );
}

export default withRouter(UpdateProject);