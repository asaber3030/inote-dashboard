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
import {THEMES} from "@/resources/constants";
import TopUser from "@/Pages/Profile/TopUser/TopUser";
import translate from "@/resources/translations/translate";

const ChangeTheme = () => {
  const { userData, appURL } = usePage().props

  const user = userData

  const { data, setData, errors, post } = useForm({
    theme: user.theme,
  })

  const submitData = () => {
    post(route('profile.theme'))
  }


  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('changeTheme', user.language)}</h1>
      </div>

      <div className="profile-content">

        <ProfileSidebar />

        <div className="profile-container">

          <div className="default-profile-content">

            <div className="left-items">

              <TopUser user={user} appURL={appURL} />

              <div className="profile-content-whole change-theme">

                <h1 className='heading-h1'>{translate('changeTheme', user.language)}</h1>

                <div className="form-container">

                  <div className="form-group">
                    <Label value={translate('theme', user.language)} />
                    <select className='form-select' onChange={ e => setData('theme', e.target.value) }>
                      {THEMES.map((theme, idx) => (
                        <option selected={theme.themeCode == user.theme} value={theme.themeCode} key={idx}>{theme.themeName}</option>
                      ))}
                    </select>
                    <InputError message={errors.theme} />
                  </div>

                  {data.theme == 'light' ? (
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

export default ChangeTheme
