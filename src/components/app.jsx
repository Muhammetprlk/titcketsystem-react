import React, { Fragment } from 'react';
import Taptop from "../layout/tap-top";
import Header from '../layout/header'
import Sidebar from '../layout/sidebar'
import Footer from '../layout/footer'
import {ToastContainer} from 'react-toastify'
import {withRouter} from 'react-router-dom'

const App = ({children}) => {
  return (
    <Fragment>
      <Taptop/>
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
        <Header/>
        <div className="page-body-wrapper">
          <Sidebar/>
          <div className="page-body">
            {children}
          </div>
          <Footer/>
        </div>
      </div>
      <ToastContainer/>
    </Fragment>
  );
}
export default withRouter(App);