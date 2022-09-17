import './dashboard.scss'

import Layout from "@/Layouts/Layout";

import ApplicationLogo from "@/Components/Logo/ApplicationLogo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import translate from "@/resources/translations/translate";
import {usePage} from "@inertiajs/inertia-react";

const Dashboard = () => {

  const { userData } = usePage().props

  return (
    <Layout>
      <div className="layout-header">
        <h1><FontAwesomeIcon icon='fa-solid fa-home' /> {translate('dashboard', userData.language)}</h1>
        <div className="logo">
          <ApplicationLogo />
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
