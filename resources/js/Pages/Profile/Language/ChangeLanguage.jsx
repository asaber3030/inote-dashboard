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
import {LANUGAGES, THEMES} from "@/resources/constants";
import TopUser from "@/Pages/Profile/TopUser/TopUser";
import translate from "@/resources/translations/translate";

const ChangeLanguage = () => {
  const { userData, appURL } = usePage().props

  const user = userData

  const { data, setData, errors, post } = useForm({
    language: user.language,
  })

  const submitData = () => {
    post(route('profile.language'))
    window.location.reload()
  }


  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('language', user.language)}</h1>
      </div>

      <div className="profile-content">

        <ProfileSidebar />

        <div className="profile-container">

          <div className="default-profile-content">

            <div className="left-items">

              <TopUser user={user} appURL={appURL} />

              <div className="profile-content-whole change-language">

                <h1 className='heading-h1'>{translate('chooseLanguage', user.language)}</h1>

                <div className="form-container">

                  <div className="form-group">
                    <Label value={translate('language', user.language)} />
                    <select className='form-select' onChange={ e => setData('language', e.target.value) }>
                      {LANUGAGES.map((language, idx) => (
                        <option selected={language.langCode == user.language} value={language.langCode} key={idx}>{language.langName}</option>
                      ))}
                    </select>
                    <InputError message={errors.language} />
                  </div>

                  {data.language == 'light' ? (
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam ipsam modi suscipit? Beatae cum dolore eaque fugit harum illum neque nihil, nisi nobis, reiciendis repellat sit tempora tenetur. Voluptas!</p>
                  ) : (
                    <p>Another ...... . Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam ipsam modi suscipit? Beatae cum dolore eaque fugit harum illum neque nihil, nisi nobis, reiciendis repellat sit tempora tenetur. Voluptas!</p>
                  )}


                  <button onClick={submitData} className="btn btn-primary submit-btn"><FontAwesomeIcon icon='fa-solid fa-save' /> {translate('submit', user.language)}</button>

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

export default ChangeLanguage
