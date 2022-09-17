import React from "react";

import Layout from "@/Layouts/Layout";
import ContractorsLayout from "@/Pages/Contractors/Layout/ContractorsLayout";

import Input from "@/Components/Input/Input";
import Label from "@/Components/Input/Label";
import InputError from "@/Components/Input/InputError";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, usePage } from "@inertiajs/inertia-react";

import translate from "@/resources/translations/translate";

const AddMeter = () => {
  const { contractor, userData } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    meters: '',
    area: '',
    cost: '',
    width: '',
    length: '',
    height: '',
    started_at: ''
  })

  const handleAdd = () => {
    post(route('contractors.meters.add', contractor.con_id))
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('newMeterWorkingHr', userData.language)}</h1>
      </div>

      <div className="form-container add-store">

        <div className="form-group">
          <Label value={translate('contractor', userData.language)}/>
          <Input value={contractor.con_name + "#" + contractor.con_id} disabled={true} />
        </div>

        <div className="form-group">
          <Label value={translate('meters', userData.language)}/>
          <Input handleChange={(e) => setData('meters', e.target.value)} />
          <InputError message={errors.meters} />
        </div>

        <div className="form-group">
          <Label value={translate('width', userData.language)}/>
          <Input handleChange={(e) => setData('width', e.target.value)} />
          <InputError message={errors.width} />
        </div>

        <div className="form-group">
          <Label value={translate('length', userData.language)}/>
          <Input handleChange={(e) => setData('length', e.target.value)} />
          <InputError message={errors.length} />
        </div>

        <div className="form-group">
          <Label value={translate('height', userData.language)}/>
          <Input handleChange={(e) => setData('height', e.target.value)} />
          <InputError message={errors.height} />
        </div>

        <div className="form-group">
          <Label value={translate('area', userData.language)}/>
          <Input handleChange={(e) => setData('area', e.target.value)} type='text' />
          <InputError message={errors.area} />
        </div>

        <div className="form-group">
          <Label value={translate('date', userData.language)}/>
          <Input handleChange={(e) => setData('started_at', e.target.value)} type='datetime-local' />
          <InputError message={errors.started_at} />
        </div>

        <div className="form-group">
          <Label value={translate('cost', userData.language)}/>
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

export default AddMeter
