import React, { Fragment, useState, useEffect } from 'react';
import comment from "../../../assets/images/blog/comment.jpg";
import { Container, Row, Col, Media, Button } from "reactstrap";
import { Comments } from "../../../constant";
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as API from '../../../api/apiurls';
import { toast } from 'react-toastify';

const Issue = () => {
    const [text, setText] = useState('')
    const [issueDetail, setIssueDetail] = useState({});
    const [issueComments, setIssueComments] = useState([]);

    const handleChange = (text) => {
        setText(text);
    }
    const { issueid } = useParams();

    useEffect(() => {
        axios.post(API.getIssueDetail, { id: issueid }, API.getHeader()).then(response => {
            setIssueDetail({ ...response.data, comments: null })
            setIssueComments(response.data.comments);
        }).catch(error => {
            toast.error(error.response.data.error);
        })
    }, []);

    const postAnswer = () => {
        const answer = {
            comment_content: text,
            issue_id: issueDetail.id,
        }
        axios.post(API.postAnswerForIssue, answer, API.getHeader()).then(response => {
            const newComment = { ...response.data, content: text }
            setIssueComments([...issueComments, newComment]);
            setText("");
        }).catch(error => {
            toast.error(error.response.data.error);
        })

    }


    return (
        <Fragment>
            <Container fluid={false}>
                <Row>

                    <Col sm="12">
                        <div className="blog-single">
                            <div className="blog-box blog-details">
                                <div className="blog-details">
                                    <ul className="blog-social">
                                        <li className="digits">{new Date(issueDetail.ıssues_created_date).toLocaleDateString() + " " + new Date(issueDetail.ıssues_created_date).toLocaleTimeString()}</li>
                                        <li><i className="icofont icofont-user"></i>{issueDetail.user_firstname + " " + issueDetail.user_lastname} <span>{"( " + issueDetail.user_username + " )"} </span></li>
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
                                    {issueComments?.map((com, key) =>
                                        <li key={key}>
                                            <Media className="align-self-center">
                                                <Col sm="0">
                                                    <Media className="align-self-center" src={comment} alt="" />
                                                </Col>
                                                <Col sm="12" >
                                                    <Media body>
                                                        <Row>
                                                            <h6 className="mt-0">{com.firstname + " " + com.lastname}<span> {"( " + com.username + " )"}</span></h6>
                                                        </Row>
                                                        <Row style={{ display: "inline-block" }} >
                                                            <ReactMarkdown children={com.content} remarkPlugins={[remarkGfm]} />
                                                        </Row>
                                                    </Media>
                                                </Col>
                                            </Media>
                                            <hr></hr>
                                        </li>)}
                                </ul>
                            </section>
                            {issueDetail.status === 2 ? <div>
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
                            </div> : ''}
                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Issue;