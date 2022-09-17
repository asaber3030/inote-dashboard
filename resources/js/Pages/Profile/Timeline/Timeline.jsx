import '../style.scss'

import Layout from "@/Layouts/Layout"

import ProfileSidebar from "@/Pages/Profile/Sidebar/ProfileSidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage, useForm } from "@inertiajs/inertia-react";

import Label from "@/Components/Input/Label";
import InputError from "@/Components/Input/InputError";
import EngineerCard from "@/Pages/Profile/Card/EngineerCard";
import { LANUGAGES, THEMES } from "@/resources/constants";
import formatDate from "@/resources/helpers/format-date";
import {exportToCsv} from "@/resources/helpers/convertToCSV";
import translate from "@/resources/translations/translate";

const Timeline = () => {
  const { userData, appURL, timeline } = usePage().props

  const user = userData

  const { data, setData, errors, post } = useForm({
    language: user.language,
  })

  const timelineDataCSV = [
    ["Title", "Description", "URL", "Occurred In"],
    ...timeline.map(item => [
      item.title,
      item.description,
      item.url,
      item.created_at
    ])
  ]

  const downloadTimelineData = () => {
    exportToCsv('account_timeline_' + user.username + '.csv', timelineDataCSV)
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1>Change Language</h1>
      </div>

      <div className="profile-content">

        <ProfileSidebar />

        <div className="profile-container">

          <div className="default-profile-content">

            <div className="left-items">

              <div className="profile-content-whole timeline-view">

                <div className="timeline-data">

                  <div className="timeline-header">
                    <h1>{translate('timeline', user.language)}</h1>
                    <button onClick={downloadTimelineData} className='btn btn-sm btn-success'><FontAwesomeIcon icon='fa-solid fa-download' /> {translate('download', user.language)}</button>
                  </div>

                  {timeline.map((item) => (
                    <div className="timeline-one" style={{ direction: 'ltr' }} key={item.id}>
                      <div className="left-time">{formatDate(item.created_at, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      <div className="center-time">
                        <Link href={item.url}><FontAwesomeIcon icon={'fa-solid fa-' + item.icon} /></Link>
                      </div>
                      <div className="right-time">
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}


                </div>

              </div>

            </div>


          </div>

        </div>

      </div>

    </Layout>
  )
}

export default Timeline
