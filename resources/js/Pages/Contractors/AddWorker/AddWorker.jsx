import React from "react";

import Layout from "@/Layouts/Layout";
import ContractorsLayout from "@/Pages/Contractors/Layout/ContractorsLayout";

import Input from "@/Components/Input/Input";
import Label from "@/Components/Input/Label";
import InputError from "@/Components/Input/InputError";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, usePage } from "@inertiajs/inertia-react";

import translate from "@/resources/translations/translate";

const AddWorker = () => {
  const { contractor, type, contractors, userData } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    worker_name: '',
    worker_type: type,
    worker_phone: '',
    started_at: '',
    ended_at: '',
    contractor: contractor ? contractor.con_id : '',
    cost: ''
  })

  const handleAdd = () => {
    post(route('contractors.workers.add'))
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1><FontAwesomeIcon icon='fa-solid fa-plus' /> { data.worker_type == 0 ? translate('newWorker', userData.language) : translate('newTechnician', userData.language)}</h1>
      </div>
      <div className="form-container add-store">

        <div className="form-group">
          <Label value={translate('worker', userData.language)} />
          <Input handleChange={(e) => setData('worker_name', e.target.value)} />
          <InputError message={errors.worker_name} />
        </div>

        <div className="form-group">
          <Label value={translate('type', userData.language)} />
          <select onChange={(e) => setData('worker_type', e.target.value)} className="form-select">
            <option value='0' selected={type === 0}>Worker</option>
            <option value='1' selected={type === 1}>Techinican</option>
          </select>
          <InputError message={errors.worker_type} />
        </div>

        <div className="form-group">
          <Label value={translate('contractor', userData.language)} />
          <select onChange={(e) => setData('contractor', e.target.value)} className="form-select">
            <option value="">--------</option>
            {contractors.map((c,i) => (
              <option value={c.con_id} selected={c.con_id === contractor.con_id}>{c.con_name}#{c.con_id}</option>
            ))}
          </select>
          <InputError message={errors.contractor} />
        </div>

        <div className="form-group">
          <Label value={translate('phone', userData.language)} />
          <Input handleChange={(e) => setData('worker_phone', e.target.value)} />
          <InputError message={errors.worker_phone} />
        </div>

        <div className="form-group">
          <Label value={translate('from', userData.language)} />
          <Input handleChange={(e) => setData('started_at', e.target.value)} type='datetime-local' />
          <InputError message={errors.started_at} />
        </div>

        <div className="form-group">
          <Label value={translate('to', userData.language)} />
          <Input handleChange={(e) => setData('ended_at', e.target.value)} type='datetime-local' />
          <InputError message={errors.ended_at} />
        </div>

        <div className="form-group">
          <Label value={translate('cost', userData.language)} />
          <Input handleChange={(e) => setData('cost', e.target.value)} />
          <InputError message={errors.cost} />
        </div>

        <div className="form-group">
          <button onClick={handleAdd} className="btn btn-primary"><FontAwesomeIcon icon='fa-solid fa-plus'/> {translate('create', userData.language)}</button>
        </div>
      </div>
    </Layout>
  )
}

export default AddWorker
