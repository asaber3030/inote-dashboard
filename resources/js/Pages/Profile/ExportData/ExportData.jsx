import '../style.scss'

import Layout from "@/Layouts/Layout"

import ProfileSidebar from "@/Pages/Profile/Sidebar/ProfileSidebar"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, usePage, useForm } from "@inertiajs/inertia-react"

import EngineerCard from "@/Pages/Profile/Card/EngineerCard"

import { exportToCsv } from "@/resources/helpers/convertToCSV"
import TopUser from "@/Pages/Profile/TopUser/TopUser";
import translate from "@/resources/translations/translate";


const ExportData = () => {

  const { userData, appURL, timeline } = usePage().props
  const user = userData

  const accountDataCSV = [
    ["ID", user.id],
    ["username", "@" + user.username],
    ["Full-name", user.name],
    ["E-mail", user.email],
    ["Job Title", user.title],
    ["Phone Number", user.phone],
    ["Role", user.is_admin === 1 ? 'Admin' : 'Super Admin'],
    ["Current Theme", user.theme.charAt(0).toUpperCase() + user.theme.slice(1)],
    ["Default Language", user.language.charAt(0).toUpperCase() + user.language.slice(1)],
    ["Two-factor Authentication", user.allow_two_factor == 1 ? 'Allowed' : 'Disable'],
    ["Security Code", user.security_code]
  ]
  const timelineDataCSV = [
    ["Title", "Description", "URL", "Occurred In"],
    ...timeline.map(item => [
      item.title,
      item.description,
      item.url,
      item.created_at
    ])
  ]

  const downloadAccount = () => {
    exportToCsv('account_data_' + user.username + '.csv', accountDataCSV)
  }

  const downloadTimelineData = () => {
    exportToCsv('account_timeline_' + user.username + '.csv', timelineDataCSV)
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('accountData', user.language)}</h1>
      </div>

      <div className="profile-content">

        <ProfileSidebar />

        <div className="profile-container">

          <div className="default-profile-content">

            <div className="left-items">
              <TopUser user={user} appURL={appURL} />

              <div className="profile-content-whole">
                <div className="export-data">

                  <div className="data-section">
                    <h1>{translate('accountData', user.language)}</h1>
                    <p>{translate('exportDataParagraph', user.language)}</p>
                    <button className='btn btn-success' onClick={downloadAccount}><FontAwesomeIcon icon='fa-solid fa-download' /> {translate('download', user.language)}</button>
                  </div>

                  <div className="data-section">
                    <h1>{translate('timelineData', user.language)}</h1>
                    <p>{translate('exportDataParagraph', user.language)}</p>
                    {timeline.length > 0 ? (
                      <button className='btn btn-success' onClick={downloadTimelineData}><FontAwesomeIcon icon='fa-solid fa-download' /> {translate('download', user.language)}</button>
                    ) : (
                      <div className="alert alert-warning" style={{ direction: 'ltr' }}>You haven't commited any actions to download the <b>timeline data</b> related to your account timeline!</div>
                    )}
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

export default ExportData
