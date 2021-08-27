import React, { Fragment, useState, useEffect } from 'react';
import man from '../../assets/images/dashboard/profile.jpg'
import { LogIn,  User, Minimize } from 'react-feather';
import { useHistory } from 'react-router-dom'
import { firebase_app } from '../../data/config'
import {useAuth0} from '@auth0/auth0-react'
import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  setLanguage,
  translate,
} from 'react-switch-lang';

import {English,Turkish,Account,LogOut} from '../../constant'

import en from '../../assets/i18n/en.json';
// import es from '../../assets/i18n/es.json';
// import pt from '../../assets/i18n/pt.json';
// import fr from '../../assets/i18n/fr.json';
// import du from '../../assets/i18n/du.json';
// import cn from '../../assets/i18n/cn.json';
// import ae from '../../assets/i18n/ae.json';
import tr from '../../assets/i18n/tr.json';

setTranslations({ en, tr });
setDefaultLanguage('tr');
setLanguageCookie();

const Rightbar = (props) => {    

  
  const history = useHistory();
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('')
  const [langdropdown, setLangdropdown] = useState(false)
  const [moonlight, setMoonlight] = useState(false)
  const [selected, setSelected] = useState("tr")
  
  // auth0 profile
  const {logout} = useAuth0()
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));
  const auth0_profile = JSON.parse(localStorage.getItem("auth0_profile"));
  const { username,company } = JSON.parse(localStorage.getItem('authenticatedUser'));


  const handleSetLanguage = (key) => {
    setLanguage(key);
    setSelected(key)
  };

  useEffect(() => {
    setProfile(localStorage.getItem('profileURL') || man);
    setName(localStorage.getItem('Name'))
    if(localStorage.getItem("layout_version") === "dark-only"){
      setMoonlight(true)
    }
  }, []);

  const Logout_From_Firebase = () => {
    localStorage.removeItem('profileURL')
    localStorage.removeItem('token');
    firebase_app.auth().signOut()
    history.push(`${process.env.PUBLIC_URL}/login`)
  }

  const  Logout_From_Auth0 = () =>  {
    localStorage.removeItem("auth0_profile")
    localStorage.setItem("authenticated",false)
    history.push(`${process.env.PUBLIC_URL}/login`)
    logout()
  }


  const UserMenuRedirect = (redirect) => {
    history.push(redirect)
  }

  //full screen function
  function goFull() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const LanguageSelection = (language) => {
    if (language) {
      setLangdropdown(!language)
    } else {
      setLangdropdown(!language)
    }
  }

  const MoonlightToggle = (light) => {
    if (light) {
      setMoonlight(!light)
      document.body.className = "light"
      localStorage.setItem('layout_version', 'light');
    } else {
      setMoonlight(!light)
      document.body.className = "dark-only"
      localStorage.setItem('layout_version', 'dark-only');
    }
  }

  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          <li className="language-nav">
            <div className={`translate_wrapper ${langdropdown ? 'active' : ''}`}>
              <div className="current_lang">
                <div className="lang" onClick={() => LanguageSelection(langdropdown)}>
                  <i className={`flag-icon flag-icon-${selected === "en" ? "us" : selected === "du" ? "de" : selected}`}></i>
                  <span className="lang-txt">{selected}</span>
                </div>
              </div>
              <div className={`more_lang ${langdropdown ? 'active' : ''}`}>
                <div className="lang" onClick={() => handleSetLanguage('en')}><i className="flag-icon flag-icon-us"></i><span className="lang-txt">{English}<span> {"(US)"}</span></span></div>
                <div className="lang" onClick={() => handleSetLanguage('tr')}><i className="flag-icon flag-icon-tr"></i><span className="lang-txt">{Turkish}</span></div>
                {/* <div className="lang" onClick={() => handleSetLanguage('du')}><i className="flag-icon flag-icon-de"></i><span className="lang-txt">{Deutsch}</span></div>
                <div className="lang" onClick={() => handleSetLanguage('es')}><i className="flag-icon flag-icon-es"></i><span className="lang-txt">{Español}</span></div>
                <div className="lang" onClick={() => handleSetLanguage('fr')}><i className="flag-icon flag-icon-fr"></i><span className="lang-txt">{Français}</span></div>
                <div className="lang" onClick={() => handleSetLanguage('pt')}><i className="flag-icon flag-icon-pt"></i><span className="lang-txt">{Português}<span> {"(BR)"}</span></span></div>
                <div className="lang" onClick={() => handleSetLanguage('cn')}><i className="flag-icon flag-icon-cn"></i><span className="lang-txt">{简体中文}</span></div>
                <div className="lang" onClick={() => handleSetLanguage('ae')}><i className="flag-icon flag-icon-ae"></i><span className="lang-txt">{"لعربية"}<span> {"(ae)"}</span></span></div> */}
              </div>
            </div>
          </li>
          <li>
            <div className="mode" onClick={() => MoonlightToggle(moonlight)}><i className={`fa ${moonlight ? 'fa-lightbulb-o' : 'fa-moon-o'}`}></i></div>
          </li>
          <li className="maximize"><a className="text-dark"  href="#javascript" onClick={goFull}><Minimize /></a></li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img className="b-r-10" src={authenticated ? auth0_profile.picture : profile} alt="" />
              <div className="media-body"><span>{authenticated ? auth0_profile.name :  name}</span>
                <p className="mb-0 font-roboto">{(company===undefined?"Super User":company)+" / "+username} <i className="middle fa fa-angle-down"></i></p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li onClick={() => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/user/userprofile`)}><User /><span>{props.t(Account)} </span></li>
              <li onClick={authenticated ? Logout_From_Auth0 : Logout_From_Firebase}><LogIn /><span>{props.t(LogOut)}</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>

  );
}
export default translate(Rightbar);