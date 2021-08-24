import React, { Fragment, useState,useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import Ckeditor from 'react-ckeditor-component'
import { Typeahead } from 'react-bootstrap-typeahead';
import Dropzone from 'react-dropzone-uploader'
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap"
import { PostEdit, Title, Type, Category,NewIssueSuccessMessage,NewIssueTitle,menuitemIssue, Content,NewIssueContent, Post, Discard,NewIssueProject, Text, Audio,NewIssueHeader, Video, Image, Add, Cancel } from "../../../constant";
import { useForm } from 'react-hook-form'
import axios from 'axios'
import * as API from '../../../api/apiurls'
import ReactMarkdown from "react-markdown";
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import remarkGfm from 'remark-gfm';
import { toast } from 'react-toastify';


const NewIssue = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [issueTitle, setIssueTitle] = useState("")
  const [issueContent, setIssueContent] = useState("")
  const [issueProjectId, setIssueProjectId] = useState(-1)
  const [projects, setProjects] = useState()
  const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')));


  const data = [{ name: 'Lifestyle' }, { name: 'Travel' }]

  useEffect(() => {
    axios.get(API.getProjects,API.getHeader()).then(response=>{
      setProjects(response.data.projects)
    }).catch(error=>{
      toast.error(error.response.data.error);
    })
  },[]);

  const onChange = (content) => {
    setIssueContent(content)
  }

  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  const handleChangeStatus = ({ meta, file }, status) => { }

  const CreateIssue = data => {
    if (data !== '' && issueContent !== '') {
      const issue = {
        issue_title: data.issue_title,
        issue_content: issueContent,
        issue_projectid: data.issue_projectid,
        user_id:authenticatedUser.user_id
      }
      axios.post(API.createIssue,issue,API.getHeader()).then(response=>{
        toast.success(NewIssueSuccessMessage);
      }).then(error=>{
        toast.error(error.response.data.error);
      })
    } else {
      errors.showMessages();
    }

  }

  return (
    <Fragment>
      <Breadcrumb parent={menuitemIssue} title={NewIssueHeader} />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody className="add-post">
                <Form className="theme-form" onSubmit={handleSubmit(CreateIssue)}>
                  <Row>
                    <Col >
                      <FormGroup>
                        <Label>{NewIssueProject}</Label>
                        <Input type="select" name="issue_projectid" className="form-control digits" innerRef={register({ required: true })} onChange={e => setIssueProjectId(e.target.value)} value={issueProjectId} >
                          {projects?.map(project=>
                            project.status===1?  <option value={project.id} >{project.title}</option>:null
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>{NewIssueTitle}</Label>
                        <Input className="form-control" type="text" name="issue_title" innerRef={register({ required: true })} onChange={e => setIssueTitle(e.target.value)} value={issueTitle} />
                        <span style={{ color: "red" }}>{errors.title && 'Title is required'}</span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>{NewIssueContent}</Label>
                        <div className="add-comment" >
                                <SimpleMDE
                                    id="editor_container"
                                    onChange={onChange}
                                    value={issueContent}
                                    options={{
                                        previewRender(text) { return ReactDOMServer.renderToString(<ReactMarkdown className="add-comment" children={text} remarkPlugins={[remarkGfm]} />) },
                                        spellChecker: false
                                    }}
                                />
                            </div>
                        <span style={{ color: "red" }}>{errors.description && 'Some Details is required'}</span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="m-b-20" >
                        <div className="m-0 dz-message needsclick">
                          <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            maxFiles={1}
                            multiple={false}
                            canCancel={false}
                            inputContent="Drop files here or click to upload."
                            styles={{
                              dropzone: { width: '100%', height: 50 },
                              dropzoneActive: { borderColor: 'green' },
                            }}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                        <Button color="primary" className="mr-3">{Add}</Button>
                        <Button color="light">{Cancel}</Button>
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

export default NewIssue;