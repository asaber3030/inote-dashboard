import React from "react";

import { useRef } from "react";

import translate from "@/resources/translations/translate";

import Layout from "@/Layouts/Layout";
import EngineerLayout from "@/Pages/Engineers/Layout/EngineerLayout";

import Input from "@/Components/Input/Input";
import Label from "@/Components/Input/Label";
import InputError from "@/Components/Input/InputError";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, usePage } from "@inertiajs/inertia-react";

import { EngineersColumns } from "@/resources/columns/engineers";

const AddEngineer = () => {
  const { engineers, userData } = usePage().props;

  const fileRef = useRef();

  const { data, setData, post, errors, processing } = useForm({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    image: '',
    title: '',
    admin_role: 0,
    theme: 'light',
    language: 'english',
    allow_two_factor: 0,
  })

  const handleAdd = () => {
    console.log(data)
    post(route('engineers.add'))
  }

  return (
    <Layout>

      <EngineerLayout cols={EngineersColumns} engineers={engineers}>

        <div className="layout-header">
          <h1>{translate('newEngineer', localStorage.getItem('lang'))}</h1>
        </div>

        <div className="form-container add-store">

          <div className="form-group">
            <Label value={translate('name', userData.language)} />
            <Input
              handleChange={ e => setData('name', e.target.value) }
            />
            <InputError message={errors.name} />
          </div>

          <div className="form-group">
            <Label value={translate('username', userData.language)} />
            <Input
              handleChange={ (e) => setData('username', e.target.value) }
            />
            <InputError message={errors.username} />
          </div>

          <div className="form-group">
            <Label value={translate('email', userData.language)}/>
            <Input
              handleChange={ (e) => setData('email', e.target.value) }
            />
            <InputError message={errors.email} />
          </div>

          <div className="form-group">
            <Label value={translate('password', userData.language)}/>
            <Input
              handleChange={ (e) => setData('password', e.target.value) }
              type='password'
            />
            <InputError message={errors.password} />
          </div>

          <div className="form-group">
            <Label value={translate('jobTitle', userData.language)}/>
            <Input
              handleChange={ (e) => setData('title', e.target.value) }
            />
            <InputError message={errors.title} />
          </div>

          <div className="form-group">
            <Label value={translate('phone', userData.language)}/>
            <Input
              handleChange={ (e) => setData('phone', e.target.value) }
            />
            <InputError message={errors.phone} />
          </div>

          <div className="form-group">
            <Label value={translate('adminRole', userData.language)}/>
            <select className='form-select' onChange={(e) => setData('admin_role', e.target.value)}>
              <option value='0'>Default</option>
              <option value='1'>Admin</option>
              <option value='2'>Super Admin</option>
            </select>
            <InputError message={errors.theme} />
          </div>

          <div className="form-group">
            <Label value={translate('theme', userData.language)}/>
            <select className='form-select' onChange={(e) => setData('theme', e.target.value)}>
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
            </select>
            <InputError message={errors.theme} />
          </div>

          <div className="form-group">
            <Label value={translate('language', userData.language)} />
            <select className='form-select' onChange={(e) => setData('language', e.target.value)}>
              <option value='english'>English</option>
              <option value='arabic'>Arabic</option>
            </select>
            <InputError message={errors.language} />
          </div>

          <div className="form-group form-file-group" onClick={()=> fileRef.current.click()}>
            <FontAwesomeIcon icon='fa-solid fa-file' />
            <Label value={translate('icon', userData.language)} />
            <input ref={fileRef} className='form-control' type='file' onChange={(e) => setData('image', e.target.files[0])}  />
            <InputError message={errors.image} />
          </div>

          <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Label value={translate('allowTwoFactor', userData.language)}/>
            <label className="switch">
              <input checked={data.allow_two_factor== 1 ? true : false} onChange={ e => setData('allow_two_factor', e.target.checked) } type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="form-group">
            <button onClick={handleAdd} className="btn btn-primary"><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('create', userData.language)}</button>
          </div>
        </div>
      </EngineerLayout>
    </Layout>
  )
}

export default AddEngineer
