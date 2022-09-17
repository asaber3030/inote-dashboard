import '../style.scss'

import Layout from "@/Layouts/Layout"

import ProfileSidebar from "@/Pages/Profile/Sidebar/ProfileSidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage, useForm } from "@inertiajs/inertia-react";

import formatDate from "@/resources/helpers/format-date";
import Label from "@/Components/Input/Label";
import Input from "@/Components/Input/Input";
import InputError from "@/Components/Input/InputError";
import EngineerCard from "@/Pages/Profile/Card/EngineerCard";
import TopUser from "@/Pages/Profile/TopUser/TopUser";
import translate from "@/resources/translations/translate";

const Security = () => {
  const { userData, appURL } = usePage().props

  const user = userData

  const { data, setData, errors, post } = useForm({
    isActive: user.allow_two_factor == 1 ? true : false,
    password: ''
  })

  console.log(data)

  const submitData = () => {
    if (data.isActive == true) {
      setData('isActive', 0)
    } else {
      setData('isActive', 1)
    }
    post(route('profile.security'))
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('allowTwoFactor', user.language)}</h1>
      </div>

      <div className="profile-content">

        <ProfileSidebar />

        <div className="profile-container">

          <div className="default-profile-content">

            <div className="left-items">
              <TopUser user={user} appURL={appURL} />

              <div className="profile-content-whole">
                <div className="change-security">
                  <div className="top-sec">
                    <h1>{translate('allowTwoFactor', user.language)}</h1>
                    <label className="switch">
                      <input checked={data.isActive== 1 ? true : false} onChange={ e => setData('isActive', e.target.checked) } type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <p>{translate('securityCodePara', user.language)}</p>

                  <div className="form-container">
                    <div className="form-group">
                      <Label value={translate('securityCode', user.language)} />
                      <Input value={user.security_code} disabled={true} />
                      <p>{translate('allowTwoFactorPara', user.language)}</p>
                    </div>

                    <div className="form-group">
                      <Label value={translate('password', user.language)} />
                      <Input type='password' handleChange={ e => setData('password', e.target.value) } />
                      <InputError message={errors.password} />
                    </div>

                    {user.allow_two_factor == 0 && (
                      <button onClick={submitData} className="btn btn-primary submit-btn"><FontAwesomeIcon icon='fa-solid fa-check' /> {translate('activate', user.language)}</button>
                    )}

                    {user.allow_two_factor == 1 && (
                      <button onClick={submitData} className="btn btn-warning submit-btn"><FontAwesomeIcon icon='fa-solid fa-times' /> {translate('disable', user.language)}</button>
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

export default Security
