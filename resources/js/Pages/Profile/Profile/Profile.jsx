import '../style.scss'

import Layout from "@/Layouts/Layout"
import ProfileSidebar from "@/Pages/Profile/Sidebar/ProfileSidebar";
import Label from "@/Components/Input/Label";
import Input from "@/Components/Input/Input";
import InputError from "@/Components/Input/InputError";
import EngineerCard from "@/Pages/Profile/Card/EngineerCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage, useForm } from "@inertiajs/inertia-react";

import { Tooltip } from "@mui/material";

import formatDate from "@/resources/helpers/format-date";
import TopUser from "@/Pages/Profile/TopUser/TopUser";
import translate from "@/resources/translations/translate";

const Profile = () => {
  const { userData, appURL } = usePage().props

  const user = userData

  const { data, setData, errors, post } = useForm({
    name: user.name,
    username: user.username,
    title: user.title
  })

  const submitData = () => {
    post(route('profile.main'))
  }


  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('profile', user.language)}</h1>
      </div>

      <div className="profile-content">

        <ProfileSidebar />

        <div className="profile-container">

          <div className="default-profile-content">

            <div className="left-items">
              <TopUser user={user} appURL={appURL} />

              <div className="profile-content-whole">

                <div className="form-container">

                  <div className="form-group">
                    <Label value={translate('name', user.language)} />
                    <Input value={data.name} handleChange={ e => setData('name', e.target.value) } />
                    <InputError message={errors.name} />
                  </div>

                  <div className="form-group">
                    <Label value={translate('username', user.language)} />
                    <Input value={data.username} handleChange={ e => setData('username', e.target.value) } />
                    <InputError message={errors.username} />
                  </div>

                  <div className="form-group">
                    <Label value={translate('jobTitle', user.language)} />
                    <Input value={data.title} handleChange={ e => setData('title', e.target.value) } />
                    <InputError message={errors.title} />
                  </div>

                  <button onClick={submitData} className="btn btn-primary submit-btn"><FontAwesomeIcon icon='fa-solid fa-edit' /> {translate('submit', user.language)}</button>

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

export default Profile
