import React, { Fragment,useState } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import Dropzone from 'react-dropzone-uploader'
import {Container,Row,Col,Card,CardBody,Form,FormGroup,Label,Input,Button} from 'reactstrap'
import DatePicker from "react-datepicker";
import {useForm} from 'react-hook-form'
import {addNewProject} from '../../../redux/project-app/action'
import { useDispatch } from 'react-redux';
import {withRouter,Link} from 'react-router-dom'
import {ProjectTitle,ClientName,ProjectRate,ProjectStatus,ProgressLevel,ProjectSize,Small,Medium,Big,StartingDate,EndingDate,EnterSomeDetails,UploadProjectFile,Add,Cancel,Done,Doing,CreateProject} from '../../../constant'
import * as API from '../../../api/apiurls';
import axios from 'axios'
const Newproject = (props) => {

    const dispatch = useDispatch()
    const { register, handleSubmit, errors } = useForm();
    const [startDate, setstartDate] = useState(new Date())
    const [endDate, setendDate] = useState(new Date())
    const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')));

    const handleStartDate = date => {
      setstartDate(date);
    };

    const handleEndDate = date => {
      setendDate(date);
    };
    
    const getUploadParams = ({ meta }) => { 
        return { 
          url: 'https://httpbin.org/post' 
        }
    }
    

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { }
    
    const AddProject = data => {
      if (data !== '') {
        let project={
          title:data.project_title,
          content:data.project_description,
          status:data.project_status===Done?1:2,
          user:authenticatedUser.user_id,
        }
        console.log(project);

        axios.post(API.createProject,project).then(response=>{
          console.log(response.data);
        }).catch(error=>{
          console.log(error.response);
        });


      } else {
        errors.showMessages();
      }
    };

    return (
        <Fragment>
        <Breadcrumb parent="Project" title={CreateProject} /> 
        <Container fluid={true}>
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <Form className="theme-form" onSubmit={handleSubmit(AddProject)}>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>{ProjectTitle}</Label>
                            <Input className="form-control" type="text"  name="project_title" innerRef={register({ required: true })} />
                            <span style={{ color: "red" }}>{errors.title && 'Title is required'}</span>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4">
                        <FormGroup>
                            <Label>{ProjectStatus}</Label>
                            <Input type="select" name="project_status" className="form-control digits" innerRef={register({ required: true })}>
                              <option value="Done">{Done}</option>
                              <option value="Doing">{Doing}</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        {/* <Col sm="4">
                          <FormGroup>
                            <Label>{StartingDate}</Label>
                            <DatePicker className="datepicker-here form-control"  selected={startDate} onChange={handleStartDate} />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label>{EndingDate}</Label>
                            <DatePicker className="datepicker-here form-control"  selected={endDate} endDate={endDate} onChange={handleEndDate} />
                          </FormGroup>
                        </Col> */}
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>{EnterSomeDetails}</Label>
                            <Input  type="textarea" className="form-control" name="project_description" rows="3" innerRef={register({ required: true })}/>
                            <span style={{ color: "red" }}>{errors.description && 'Some Details is required'}</span>
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row>
                        <Col>
                          <FormGroup>
                            <Label>{UploadProjectFile}</Label>
                                <Dropzone
                                    getUploadParams={getUploadParams}
                                    onChangeStatus={handleChangeStatus}
                                    maxFiles={1}
                                    multiple={false}
                                    canCancel={false}
                                    inputContent="Drop A File"
                                    styles={{
                                        dropzone: { width: '100%', height: 50 },
                                        dropzoneActive: { borderColor: 'green' },
                                    }}
                                />
                          </FormGroup>
                        </Col>
                      </Row> */}
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
            </Row>
          </Container>
        </Fragment>
    );
}

export default withRouter(Newproject);