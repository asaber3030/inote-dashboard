import '../style.scss'

import Layout from "@/Layouts/Layout"

import ProfileSidebar from "@/Pages/Profile/Sidebar/ProfileSidebar"

import { Tooltip } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, usePage, useForm } from "@inertiajs/inertia-react"
import formatDate from "@/resources/helpers/format-date"

import Label from "@/Components/Input/Label"
import EngineerCard from "@/Pages/Profile/Card/EngineerCard"
import translate from "@/resources/translations/translate";


const AppDatabase= () => {
  const {
    userData, appURL,
    dbName, dbHost, dbUsername, dbPort, dbConnection, countTabeles, dbCharset, dbTables
  } = usePage().props
  const user = userData

  const tables = dbTables.map(item => item.Tables_in_inote_final).join(', ')

  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('database', user.language)}</h1>
      </div>

      <div className="profile-content">

        <ProfileSidebar />

        <div className="profile-container">

          <div className="default-profile-content">

            <div className="left-items">

              <div className="profile-content-whole">

                <div className="app-database">

                  <h1 className='heading-h1'><span>{translate('database', user.language)} <b>{dbName}</b></span> <span><b>{countTabeles}</b> {translate('from', user.language)} {translate('DBTables', user.language)}</span></h1>

                  <ul>
                    <li>
                      <span><FontAwesomeIcon icon="fa-solid fa-hard-drive" /> {translate('driver', user.language)}</span>
                      <span>{dbConnection}</span>
                    </li>
                    <li>
                      <span><FontAwesomeIcon icon="fa-solid fa-globe" /> {translate('host', user.language)}</span>
                      <span>{dbHost}</span>
                    </li>
                    <li>
                      <span><FontAwesomeIcon icon="fa-solid fa-user" /> {translate('port', user.language)}</span>
                      <span>{dbUsername}</span>
                    </li>
                    <li>
                      <span><FontAwesomeIcon icon="fa-solid fa-link" /> {translate('port', user.language)}</span>
                      <span>{dbPort}</span>
                    </li>
                    <li>
                      <span><FontAwesomeIcon icon="fa-solid fa-language" /> {translate('charSet', user.language)}</span>
                      <span>{dbCharset}</span>
                    </li>

                    <li className='rm-flex'>
                      <span><FontAwesomeIcon icon="fa-solid fa-table" /> {translate('DBTables', user.language)} - <b>{countTabeles} {translate('DBTables', user.language)}</b></span>
                      <span style={{ fontWeight: '300', marginTop: '10px' }}>{tables}</span>
                    </li>
                  </ul>

                  <div className="alert alert-warning">
                    <b><FontAwesomeIcon icon='fa-solid fa-exclamation-triangle' style={{ margin: '0 8px' }} /> {translate('caution', user.language)}: </b> {translate('dbCaution', user.language)}
                  </div>

                </div>

              </div>

            </div>

            <EngineerCard user={user} />

          </div>

        </div>

      </div>

    </Layout>
  )
}

export default AppDatabase
