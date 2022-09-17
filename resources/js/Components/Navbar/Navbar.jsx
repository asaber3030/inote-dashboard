import './navbar.scss'

import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserImage from '../../assets/images/user.svg';
import translate from "@/resources/translations/translate";
import {Inertia} from "@inertiajs/inertia";

const Navbar = () => {

  const { appURL, userData } = usePage().props

  const [currentTheme, setCurrentTheme] = useState(userData.theme)
  const [currentLanguage, setLanguage] = useState(userData.theme)

  const changeTheme = () => {
    Inertia.get(route('change.theme'))
  }
  const changeLanguage = () => {
    Inertia.get(route('change.language'))
  }

  return (
    <nav id='navbar'>
      <div className="left-links-container">
        <ul className="default-links-ul left-links">
          <li className='disable-sidebar'><FontAwesomeIcon icon="fa-solid fa-bars" /></li>

          <li>
            <Link className='nav-link' href=''>{ translate('roles', userData.language) }</Link>
            <div className="dropdown-menu">
              <Link href=''>{translate('addRole', userData.language)}</Link>
              <Link href=''>{translate('assignRole', userData.language)}</Link>
              <Link href=''>{translate('availableRoles', userData.language)}</Link>
            </div>
          </li>
          <li>
            <Link className='nav-link' href=''>
              {translate('handle', userData.language)}
            </Link>
            <div className="dropdown-menu">
              <Link href={route('engineers.list')}>{translate('engineers', userData.language)}</Link>
              <Link href={route('contractors.list')}>{translate('contractors', userData.language)}</Link>
              <Link href={route('materials.list')}>{translate('materials', userData.language)}</Link>
              <Link href={route('stores.list')}>{translate('stores', userData.language)}</Link>
              <Link href={route('equipments.list')}>{translate('equipments', userData.language)}</Link>
            </div>
          </li>
          <li><Link className='nav-link' href={route('sheets')}>{translate('sheets', userData.language)}</Link></li>
        </ul>
      </div>

      <div className="right-links-container">

        <ul className='default-links-ul right-links'>
          <li>
            <Link href="" className='nav-link'><FontAwesomeIcon icon="fa-solid fa-sun" /> </Link>
            <div className="dropdown-menu dropdown-theme">
              <a href={route('change.theme', ['dark', userData.id])}><FontAwesomeIcon icon="fa-solid fa-circle-half-stroke" /> {translate('darkMode', userData.language)}</a>
              <a href={route('change.theme', ['light', userData.id])}><FontAwesomeIcon icon="fa-solid fa-moon" /> {translate('lightMode', userData.language)}</a>
            </div>
          </li>

          <li>
            <Link href="" className='nav-link'><FontAwesomeIcon icon="fa-solid fa-globe" /> </Link>
            <div className="dropdown-menu dropdown-lang">
              <a href={route('change.language', ['english', userData.id])}><FontAwesomeIcon icon="fa-solid fa-earth-europe" /> {translate('englishLang', userData.language)}</a>
              <a href={route('change.language', ['arabic', userData.id])}><FontAwesomeIcon icon="fa-solid fa-earth-africa" /> {translate('arabicLang', userData.language)}</a>
            </div>
          </li>

          <li>
            <Link href="" className='nav-link'><FontAwesomeIcon icon="fa-solid fa-user" /> </Link>
            <div className="dropdown-menu dropdown-user">
              <div className="top-part">
                <div className="image">
                  <img src={appURL + userData.image} alt="User Picture"/>
                </div>
                <div className="text">
                  <h6>{userData.name}</h6>
                  <Link href={route('profile.main')}>@{userData.username}</Link>
                </div>
              </div>
              <div className="links">
                <Link href={route('profile.main')}><FontAwesomeIcon icon="fa-solid fa-fw fa-user" /> {translate('profile', userData.language)}</Link>
                <Link href={route('profile.language')}><FontAwesomeIcon icon="fa-solid fa-fw fa-globe-africa" /> {translate('chooseLanguage', userData.language)}</Link>
                <Link href={route('profile.export-data')}><FontAwesomeIcon icon="fa-solid fa-fw fa-download" /> {translate('downloadData', userData.language)}</Link>
                <div className="divider"></div>
                <Link href={route('profile.theme')}><FontAwesomeIcon icon="fa-solid fa-fw fa-palette" /> {translate('theme', userData.language)}</Link>
                <Link href={route('profile.password')}><FontAwesomeIcon icon="fa-solid fa-fw fa-user-lock" /> {translate('changePassword', userData.language)}</Link>
                <Link href={route('profile.security')}><FontAwesomeIcon icon="fa-solid fa-fw fa-shield" /> {translate('security', userData.language)}</Link>
                <Link href="" className='red-link'><FontAwesomeIcon icon="fa-solid fa-fw fa-download" /> {translate('logout', userData.language)}</Link>
              </div>
            </div>
          </li>

        </ul>

      </div>

    </nav>
  )
}

export default Navbar
