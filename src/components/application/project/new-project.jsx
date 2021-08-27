import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, Form, Media, FormGroup, Label, Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router-dom'
import { ProjectTitle, CreateProjectSuccesMessage, menuitemProject, CreateProjectSelectEmployeeMessage, CreateProjectConfimationMessage, Yes, Cancel, ProjectStatus, Open, Closed, EnterSomeDetails, Add, CreateProject, CreateProjectSearchCollaborators } from '../../../constant'
import * as API from '../../../api/apiurls';
import axios from 'axios'
import { toast } from 'react-toastify';
import three from "../../../assets/images/user/3.jpg";
import ScrollArea from 'react-scrollbar';
import { translate } from 'react-switch-lang';


const Newproject = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [searchbar, setSearchbar] = useState("");
  const [users, setUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [removeUserIsOpen, setRemoveUserIsOpen] = useState(false)
  const [removeUserUser, setRemoveUserUser] = useState({})

  useEffect(() => {
    axios.get(API.getCompany, API.getHeader()).then(response => {
      console.log(response.data);
      const employees = [];
      response.data.employee.map(e => {
        employees.push({ ...e, isSelect: false });
        return '';
      });
      console.log(employees);
      setUsers(employees);
      setFoundUsers(employees);
    });
  }, []);

  const ToggleRemoveUser = () => {
    if (removeUserIsOpen) {
      setRemoveUserUser({});
    }
    setRemoveUserIsOpen(!removeUserIsOpen);
  }


  const handleAddUser = (user) => {
    if (user.isSelect) {
      setRemoveUserUser(user);
      ToggleRemoveUser();
    }
    else {
      user.isSelect = !user.isSelect;
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
      return ''
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

  const ClearForm = () => {
    setProjectStatus(props.t(Open));
    setProjectTitle("");
    setProjectDescription("");

    const list = [];
    users.map(u => {
      u.isSelect = false;
      list.push(u);
      return ''
    })

    setUsers(list);
    setFoundUsers(list);
  }

  const AddProject = data => {
    if (data !== '') {
      const collaborators = [];
      users.map((u) => {
        if (u.isSelect) {
          collaborators.push(u.id);
        }
        return ''
      });

      if (collaborators.length > 0) {
        const project = {
          employees: collaborators,
          title: data.project_title,
          content: data.project_description,
          status: data.project_status !== props.t(Closed) ? 1 : 2,
        }

        console.log(project);
        axios.post(API.createProject, project, API.getHeader()).then(response => {
          toast.success(props.t(CreateProjectSuccesMessage));
          ClearForm();
        }).catch(error => {
          toast.error(error.response.data.error);
        });
      }
      else {
        toast.warning(props.t(CreateProjectSelectEmployeeMessage));
      }



    } else {
      errors.showMessages();
    }
  };

  const ConfirmationConfirm = (user) => {
    user.isSelect = !user.isSelect;
    changeSpesificUser(user);
    setRemoveUserUser({});
    ToggleRemoveUser();
  }

  return (
    <Fragment>
      <Breadcrumb parent={props.t(menuitemProject)} title={props.t(CreateProject)} />
      <Container fluid={true}>
        <Row>
          <Col sm="7">
            <Card>
              <CardBody>
                <Form className="theme-form" onSubmit={handleSubmit(AddProject)}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>{props.t(ProjectTitle)}</Label>
                        <Input className="form-control" type="text" name="project_title" innerRef={register({ required: true })} onChange={e => setProjectTitle(e.target.value)} value={projectTitle} />
                        <span style={{ color: "red" }}>{errors.title && 'Title is required'}</span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>{props.t(EnterSomeDetails)}</Label>
                        <Input type="textarea" className="form-control" name="project_description" rows="3" innerRef={register({ required: true })} onChange={e => setProjectDescription(e.target.value)} value={projectDescription} />
                        <span style={{ color: "red" }}>{errors.description && 'Some Details is required'}</span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col >
                      <FormGroup>
                        <Label>{props.t(ProjectStatus)}</Label>
                        <Input type="select" name="project_status" className="form-control digits" innerRef={register({ required: true })} onChange={e => setProjectStatus(e.target.value)} value={projectStatus} >
                          <option value={props.t(Open)}>{props.t(Open)}</option>
                          <option value={props.t(Closed)}>{props.t(Closed)}</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                        <Button color="primary" className="mr-3">{props.t(Add)}</Button>
                        <Button color="light" onClick={() => { ClearForm() }} >{props.t(Cancel)}</Button>
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
                      <Input className="form-control-social" value={searchbar} onChange={filter} type="search" placeholder={props.t(CreateProjectSearchCollaborators)} />
                    </FormGroup>
                  </Form>
                  {foundUsers?.map((user) => {
                    return <Media key={user.id}>
                      <img className="img-50 rounded-circle m-r-15" src={three} alt="fourteenImg" />
                      <Media body>
                        <span className="f-w-600 d-block">{user.first_name + " " + user.last_name}</span><span className="d-block">{user.email}</span>
                      </Media>
                      <div className="mr-5 my-auto">
                        <div className="product-icon">
                          <ul className="product-social">
                            <li className="d-inline-block" >
                              {/* eslint-disable-next-line */}
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
        <Modal isOpen={removeUserIsOpen} toggle={ToggleRemoveUser} size="sm" centered>
          <ModalBody>
            <h6>{props.t(CreateProjectConfimationMessage)}</h6>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={ToggleRemoveUser}>{props.t(Cancel)}</Button>
            <Button color="primary" onClick={() => ConfirmationConfirm(removeUserUser)}>{props.t(Yes)}</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </Fragment>
  );
}

export default withRouter(translate(Newproject));