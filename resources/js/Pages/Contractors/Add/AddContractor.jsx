import React from "react";

import Layout from "@/Layouts/Layout";
import ContractorsLayout from "@/Pages/Contractors/Layout/ContractorsLayout";

import Input from "@/Components/Input/Input";
import Label from "@/Components/Input/Label";
import InputError from "@/Components/Input/InputError";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContractorsColumns } from "@/resources/columns/contractors";
import { useForm, usePage } from "@inertiajs/inertia-react";

import translate from "@/resources/translations/translate";

const AddContractor = () => {
  const { contractors, userData } = usePage().props;

  const { data, setData, post, errors, processing } = useForm({
    contractor_name: '',
    contractor_type: 0,
    contractor_phone: ''
  })

  const handleAdd = () => {
    post(route('contractors.add'))
  }

  return (
    <Layout>
      <ContractorsLayout cols={ContractorsColumns} contractors={contractors}>
        <div className="layout-header">
          <h1>{translate('newContractor', userData.language)}</h1>
        </div>
        <div className="form-container add-store">

          <div className="form-group">
            <Label value={translate('name', userData.language)}/>
            <Input
              handleChange={ (e) => setData('contractor_name', e.target.value) }
            />
            <InputError message={errors.contractor_name} />
          </div>
          <div className="form-group">
            <Label value={translate('phone', userData.language)}/>
            <Input
              handleChange={ (e) => setData('contractor_phone', e.target.value) }
            />
            <InputError message={errors.contractor_phone} />
          </div>
          <div className="form-group">
            <Label value={translate('type', userData.language)} />
            <select className='form-select' onChange={(e) => setData('contractor_type', e.target.value)}>
              <option value={0} selected={true}>{translate('contractorDaily', userData.language)}</option>
              <option value={1}>{translate('contractorMeter', userData.language)}</option>
              <option value={2}>{translate('contractorEquipment', userData.language)}</option>
            </select>
            <InputError message={errors.contractor_type} />
          </div>

          <div className="form-group">
            <button onClick={handleAdd} className="btn btn-primary"><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('create', userData.language)}</button>
          </div>
        </div>
      </ContractorsLayout>
    </Layout>
  )
}

export default AddContractor
