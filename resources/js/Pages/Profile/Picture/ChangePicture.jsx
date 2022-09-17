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
import {useRef} from "react";
import TopUser from "@/Pages/Profile/TopUser/TopUser";
import translate from "@/resources/translations/translate";

const ChangePicture = () => {
  const { userData, appURL } = usePage().props
  let fileRef = useRef();

  console.log(usePage())

  const user = userData

  const { data, setData, errors, post } = useForm({
    image: '',
  })

  const submitData = () => {
    post(route('profile.picture'))
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('changePicture', user.language)}</h1>
      </div>

      <div className="profile-content">

        <ProfileSidebar />

        <div className="profile-container">

          <div className="default-profile-content">

            <div className="left-items">
              <TopUser user={user} appURL={appURL} />

              <div className="profile-content-whole">

                <div className="form-container">

                  <div className="form-group form-file-group" onClick={()=> fileRef.current.click()}>
                    <FontAwesomeIcon icon='fa-solid fa-file' />
                    <Label value={translate('uploadImage', user.language)} />
                    <input ref={fileRef} className='form-control' type='file' onChange={(e) => setData('image', e.target.files[0])}  />
                    <InputError message={errors.image} />
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

export default ChangePicture
