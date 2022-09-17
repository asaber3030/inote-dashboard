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


const ViewTableData = () => {
  const { userData, appURL,  tableData, tableName, dbName, countTables, tableInnerDataCount } = usePage().props
  const user = userData

  return (
    <Layout>
      <div style={{ direction: 'ltr' }}  className="layout-header">
        <h1><b>{tableName}</b></h1>
      </div>

      <div className="profile-content">

        <ProfileSidebar />

        <div className="profile-container">

          <div className="default-profile-content">

            <div className="left-items">

              <div className="profile-content-whole">

                <div className="app-database app-tables">

                  <h1 className='heading-h1'><span>{translate('table', user.language)} <b>{tableName}</b></span> <span>has <b>{tableData.length}</b> columns, <b>{tableInnerDataCount}</b> rows</span></h1>

                  <table className="table table-bordered" style={{ direction: 'ltr' }} >
                    <thead>
                      <tr>
                        <th scope="col">Count</th>
                        <th scope="col">Field</th>
                        <th scope="col">Key</th>
                        <th scope="col">Null</th>
                        <th scope="col">Type</th>
                        <th scope="col">Extra</th>
                        <th scope="col">Default</th>
                      </tr>
                    </thead>

                    <tbody>
                    {tableData.map((tbl, idx) => (
                      <tr>
                        <td className='code-family'>{idx +1}</td>
                        <td className='code-family'>{tbl.Field}</td>
                        <td className='code-family'>{tbl.Key ? tbl.Key : 'NO'}</td>
                        <td className='code-family'>{tbl.Null}</td>
                        <td className='code-family'>{tbl.Type}</td>
                        <td className='code-family'>{tbl.Extra ? tbl.Extra : 'NO'}</td>
                        <td className='code-family'>{tbl.Default ? tbl.Default : 'NO'}</td>
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


          </div>

        </div>

      </div>

    </Layout>
  )
}

export default ViewTableData
