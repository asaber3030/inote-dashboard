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

const UpdateContractor = () => {
  const { contractors, contractor, userData } = usePage().props;

  const { data, setData, post, errors, processing } = useForm({
    contractor_name: contractor.con_name,
    contractor_type: contractor.con_type,
    contractor_phone: contractor.con_phone
  })

  console.log(contractor)

  const handleUpdate = () => {
    post(route('contractors.update', contractor.con_id))
  }

  return (
    <Layout>
      <ContractorsLayout cols={ContractorsColumns} contractors={contractors}>
        <div className="layout-header">
          <h1>{translate('update', userData.language)} {translate('contractor', userData.language)} - <strong>{contractor.con_name}</strong></h1>
        </div>
        <div className="form-container add-store">

          <div className="form-group">
            <Label value={translate('name', userData.language)} />
            <Input
              value={data.contractor_name}
              handleChange={ (e) => setData('contractor_name', e.target.value) }
            />
            <InputError message={errors.contractor_name} />
          </div>
          <div className="form-group">
            <Label value={translate('phone', userData.language)} />
            <Input
              value={data.contractor_phone}
              handleChange={ (e) => setData('contractor_phone', e.target.value) }
            />
            <InputError message={errors.contractor_phone} />
          </div>
          <div className="form-group">
            <Label value={translate('type', userData.language)} />
            <select className='form-select' onChange={(e) => setData('contractor_type', e.target.value)}>
              <option value={0} selected={data.contractor_type == 0}>Daily</option>
              <option value={1} selected={data.contractor_type == 1}>Meter</option>
              <option value={2} selected={data.contractor_type == 2}>Equipment</option>
            </select>
            <InputError message={errors.contractor_type} />
          </div>

          <div className="form-group">
            <button onClick={handleUpdate} className="btn btn-primary"><FontAwesomeIcon icon='fa-solid fa-edit' style={{ margin: '0 5px' }} /> {translate('update', userData.language)}</button>
          </div>
        </div>
      </ContractorsLayout>
    </Layout>
  )
}

export default UpdateContractor
