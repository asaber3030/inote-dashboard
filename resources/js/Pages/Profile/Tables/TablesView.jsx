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


const TablesView= () => {
  const {
    userData, appURL,
    dbName, countTabeles, dbTables
  } = usePage().props
  const user = userData

  const tables = dbTables.map(item => item.Tables_in_inote_final)

  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('DBTables', user.language)}</h1>
      </div>

      <div className="profile-content">

        <ProfileSidebar />

        <div className="profile-container">

          <div className="default-profile-content">

            <div className="left-items">

              <div className="profile-content-whole">

                <div className="app-database app-tables">

                  <h1 className='heading-h1'><span>{translate('database', user.language)} <b>{dbName}</b></span> <span><b>{countTabeles}</b> {translate('from', user.language)} {translate('DBTables', user.language)}</span></h1>

                  <table style={{ direction: 'ltr' }} className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">{translate('tableName', user.language)}</th>
                        <th scope="col">{translate('view', user.language)}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {tables.map(tbl => (
                        <tr>
                          <td>{tbl}</td>
                          <td><Link className='btn btn-secondary btn-sm' href={route('profile.tables.view', tbl)}><b>{tbl}</b></Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="alert alert-warning">
                    <b><FontAwesomeIcon icon='fa-solid fa-exclamation-triangle' /> {translate('caution', user.language)}: </b> {translate('dbCaution', user.language)}
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

export default TablesView
