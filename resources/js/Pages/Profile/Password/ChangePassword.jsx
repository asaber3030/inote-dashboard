import '../style.scss'

import Layout from "@/Layouts/Layout"

import ProfileSidebar from "@/Pages/Profile/Sidebar/ProfileSidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage, useForm } from "@inertiajs/inertia-react";

import formatDate from "@/resources/helpers/format-date";
import {Tooltip} from "@mui/material";
import Label from "@/Components/Input/Label";
import Input from "@/Components/Input/Input";
import InputError from "@/Components/Input/InputError";
import EngineerCard from "@/Pages/Profile/Card/EngineerCard";
import TopUser from "@/Pages/Profile/TopUser/TopUser";
import translate from "@/resources/translations/translate";

const ChangePassword = () => {
  const { userData, appURL } = usePage().props

  const user = userData

  const { data, setData, errors, post } = useForm({
    new_password: '',
    old_password: ''
  })

  const submitData = () => {
    post(route('profile.password'))
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('changePassword', user.language)}</h1>
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
                    <Label value={translate('oldPassword', user.language)} />
                    <Input type='password' handleChange={ e => setData('old_password', e.target.value) } />
                    <InputError message={errors.old_password} />
                  </div>

                  <div className="form-group">
                    <Label value={translate('newPassword', user.language)} />
                    <Input type='password' handleChange={ e => setData('new_password', e.target.value) } />
                    <InputError message={errors.new_password} />
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

export default ChangePassword
