import React from "react";

import Layout from "@/Layouts/Layout";
import Input from "@/Components/Input/Input";
import Label from "@/Components/Input/Label";
import InputError from "@/Components/Input/InputError";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import translate from "@/resources/translations/translate";

const AddWorkingHour = () => {

  const { equipment, contractors, userData } = usePage().props
  const { data, setData, post, errors } = useForm({
    started_at: '',
    ended_at: '',
    additional_hrs: '',
    working_location: '',
    note: '',
    cost: '',
    contractor: contractors[0].con_id
  })

  const handleAdd = () => {
    post(route('equipments.hours.add', equipment.eq_id))
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1><FontAwesomeIcon icon='fa-solid fa-calendar-plus' /> {translate('addWorkingHr', userData.language)}: <b>{equipment.eq_name}</b></h1>
      </div>

      <div className="form-container">

        <div className="form-group">
          <Label value={translate('tag', userData.language)} />
          <Input disabled={true} value={equipment.eq_tag} />
        </div>

        <div className="form-group">
          <Label value={translate('from', userData.language)} />
          <Input type='datetime-local' name='started_at' handleChange={(e) => setData('started_at', e.target.value)} />
          <InputError message={errors.started_at} />
        </div>

        <div className="form-group">
          <Label value={translate('to', userData.language)} />
          <Input type='datetime-local' name='ended_at' handleChange={(e) => setData('ended_at', e.target.value)} />
          <InputError message={errors.ended_at} />
        </div>

        <div className="form-group">
          <Label value={translate('additionalHrs', userData.language)} />
          <Input name='additional_hrs' handleChange={(e) => setData('additional_hrs', e.target.value)} />
          <InputError message={errors.additional_hrs} />
        </div>

        <div className="form-group">
          <Label value={translate('workingLocation', userData.language)} />
          <Input name='working_location' handleChange={(e) => setData('working_location', e.target.value)} />
          <InputError message={errors.working_location} />
        </div>

        <div className="form-group">
          <Label value={translate('contractor', userData.language)} />
          <select name='contractor' className="form-select" onChange={(e) => setData('contractor', e.target.value)}>
            {contractors.map((c, i) => (
              <option key={i} value={c.con_id}>{c.con_name}</option>
            ))}
          </select>
          <InputError message={errors.contractor} />
        </div>

        <div className="form-group">
          <Label value={translate('notes', userData.language)} />
          <Input name='note' handleChange={(e) => setData('note', e.target.value)} />
          <InputError message={errors.note} />
        </div>

        <div className="form-group">
          <Label value={translate('cost', userData.language)} />
          <Input name='cost' handleChange={(e) => setData('cost', e.target.value)} />
          <InputError message={errors.cost} />
        </div>

        <div className="form-group">
          <button onClick={handleAdd} className="btn btn-primary"><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('addWorkingHr', userData.language)}</button>
        </div>

      </div>

    </Layout>
  )
}

export default AddWorkingHour
