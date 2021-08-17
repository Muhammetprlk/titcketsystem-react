import React, { Fragment, useState, useMemo ,useEffect} from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import blogSingle from "../../../assets/images/blog/blog-single.jpg";
import comment from "../../../assets/images/blog/comment.jpg";
import nine from "../../../assets/images/blog/9.jpg";
import four from "../../../assets/images/blog/4.jpg";
import twelve from "../../../assets/images/blog/12.png";
import fourteen from "../../../assets/images/blog/14.png";
import { Container, Row, Col, Media, Button ,FormGroup} from "reactstrap";
import { Comments, JolioMark } from "../../../constant";
import SimpleMDE from "react-simplemde-editor";
import DOMPurify from 'dompurify'
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';
import * as API from '../../../api/apiurls';


const fakeIssue = {
    issue_id:1,
    Username: "Muhammetprlk",
    Name: "Muhammet",
    Surname: "Parlak",
    IssueCreatedDate: "11/11/2021",
    IssueProject: "Google Chrome",
    IssueTitle: "Google Chrome refusing to open pages in Windows 10",
    IssueContent: "I'm running Google Chrome on Windows 10, latest editions. Chrome refuses to open any pages, returning \"Aw snap\" error messages. To resolve this I've:\n\n 1. Removed all extensions. \n 2. Uninstalled and reinstalled Chrome.\n 3. Tried Chrome on a different user.\n 4. Ran Chrome Cleanup Tool.\n 5. Deleted my Google folder in Appdata.\n 6. Incognito pages don't work either.\n\nNone of these worked. Firefox at all times is working perfectly so its not an internet problem.\n\nAnyone have any ideas on how to fix this?",
    Comments:
        [
            {
                Username: "Theo",
                Name: "Theodor",
                Surname: "Herzl",
                CommentCreatedDate: "11/11/2021",
                CommentContent: "<p>It is likely that malware is trying (and failing) to modify the page that is loading. I&#39;ve also seen this as a symptom of machines that had nasty redirect malware removed, as the redirects that the malware creates no longer have anywhere to resolve.</p><p>I highly recommend a fresh Windows 10 install, only way to be sure you&#39;re fully free of whatever may have infected your current Windows installation.</p>"
            },
            {
                Username: "Bibin Gangadharan",
                Name: "Bibin",
                Surname: "Gangadharan",
                CommentCreatedDate: "11/11/2021",
                CommentContent: "<p>Please follow below steps, to resolve &quot;Aw snap&quot; error messages with Chrome browser.</p><p><strong>Steps To Resolve:</strong></p><ul><li>Go to Chrome shortcut in the Desktop (If not exists create one)</li><li>Right click -&gt; Properties</li><li>In the target field, At the end add a space followed by the below&nbsp;<strong>-no-sandbox</strong></li><li>Apply-Ok</li><li>Launch chrome using the shortcut</li></ul>"
            },
            {
                Username: "lightcoder",
                Name: "light",
                Surname: "coder",
                CommentCreatedDate: "11/11/2021",
                CommentContent: "<p>Follow the below steps</p><ol><li>Go to windows task manager</li><li>go to details tab</li><li>kill all the chrome process</li><li>run the chrome it will open</li></ol>"
            }
        ]
};

const Issue = () => {
    const [text, setText] = useState('')
    const [issueDetail,setIssueDetail]=useState({});
    const handleChange = (text) => {
        setText(text);
    }
    const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')));
    
    const {issueid}=useParams();

    useEffect(() => {
        axios.post(API.getIssueDetail,{id:issueid}).then(response=>{
          setIssueDetail(response.data)
        });
      },[]);

    const postAnswer=()=>{
        const answer={
            user_id:authenticatedUser.user_id,
            issue_id:fakeIssue.issue_id,
            comment_content:text
        }
        console.log(answer);
    }


    return (
        <Fragment>
            {/* <Breadcrumb parent="Blog" title="Issue"/> */}
            <Container fluid={false}>
                <Row>

                    <Col sm="12">
                        <div className="blog-single">
                            <div className="blog-box blog-details">
                                <div className="blog-details">
                                    <ul className="blog-social">
                                        <li className="digits">{issueDetail.IssueCreatedDate}</li>
                                        <li><i className="icofont icofont-user"></i>{issueDetail.user_firstname+" "+issueDetail.user_lastname} <span>{"( "+issueDetail.user_username+" )"} </span></li>
                                        <li><i className="icofont icofont-cube"></i>{issueDetail.project_name}</li>
                                    </ul>
                                    <h4>
                                        {issueDetail.title}
                                    </h4>
                                    <div className="single-blog-content-top">
                                        <ReactMarkdown children={issueDetail.content} remarkPlugins={[remarkGfm]} />
                                    </div>
                                </div>
                            </div>
                            <section className="comment-box">
                                <h4>{Comments}</h4>
                                <hr />
                                <ul>
                                    {issueDetail.commnets?.map(com =>
                                        <li>
                                            <Media className="align-self-center">
                                                <Col sm="0">
                                                    <Media className="align-self-center" src={comment} alt="" />
                                                </Col>
                                                <Col sm="12" >
                                                    <Media body>
                                                        <Row>
                                                            <h6 className="mt-0">{com.firstname+" "+com.lastname}<span> {"( "+com.username+" )"}</span></h6>
                                                        </Row>
                                                        <Row>
                                                            <ReactMarkdown children={com.content} remarkPlugins={[remarkGfm]} />
                                                        </Row>
                                                    </Media>
                                                </Col>
                                            </Media>
                                            <hr></hr>
                                        </li>)}
                                </ul>
                            </section>
                            <h4>{"Your Answer"}</h4>
                            <div className="add-comment" >
                                <SimpleMDE
                                    id="editor_container"
                                    onChange={handleChange}
                                    value={text}
                                    options={{
                                        previewRender(text) { return ReactDOMServer.renderToString(<ReactMarkdown className="add-comment" children={text} remarkPlugins={[remarkGfm]} />) },
                                        spellChecker: false
                                    }}
                                />
                            </div>
                            <Button onClick={postAnswer} color="primary" className="mr-3 mt-3">{"Post Your Answer"}</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Issue;