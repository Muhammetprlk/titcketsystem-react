import React, { Fragment } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row,  Card,  CardBody } from 'reactstrap'
import { General, Username, EmailAddress, Company, Role, User, UserProfileTitle } from '../../constant'
import { translate } from 'react-switch-lang';

const UserProfile = (props) => {
  const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));

  const getRole = (role) => {
    var rol = "";
    switch (role) {
      case "superuser":
        rol = "Super User"
        break;
      case "companyadmin":
        rol = "Company Admin"
        break;
      case "user":
        rol = "User"
        break;
      default:
        break;
    }
    return rol;
  }

  return (
    <Fragment>
      <Breadcrumb parent={props.t(User)} title={props.t(UserProfileTitle)} />
      <Container fluid={true}>
        <Card>
          <CardBody>
            <Row className="list-persons" >
              <div className="profile-mail">
                <div className="media"><img className="img-100 img-fluid m-r-20 rounded-circle update_img_5" src={require("../../assets/images/user/user.png")} alt="" />
                  <div className="media-body my-auto">
                    <h5><span className="first_name_5">{authenticatedUser.user_firstname} </span><span className="last_name_5">{authenticatedUser.user_lastname}</span></h5>
                    <p className="email_add_5">{authenticatedUser.user_email}</p>
                  </div>
                </div>
                <div className="email-general">
                  <h6>{props.t(General)}</h6>
                  <p>{props.t(Role)}: <span className="font-primary">{props.t(getRole(authenticatedUser.user_role))}</span></p>
                  {authenticatedUser.company !== undefined ? <p>{props.t(Company)}: <span className="font-primary">{(authenticatedUser.company)}</span></p> : ''}
                  <p>{props.t(Username)}: <span className="font-primary">{authenticatedUser.username}</span></p>
                  <p>{props.t(EmailAddress)}: <span className="font-primary email_add_5">{authenticatedUser.user_email}</span></p>
                </div>
              </div>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
}

export default translate(UserProfile);