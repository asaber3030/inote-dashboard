import React from "react";
import Layout from "@/Layouts/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import Input from "@/Components/Input/Input";
import Label from "@/Components/Input/Label";
import InputError from "@/Components/Input/InputError";
import translate from "@/resources/translations/translate";
const AddWorkingHour = () => {

  const { material, userData } = usePage().props
  const { data, setData, post, errors } = useForm({
    'compute_hrs': '',
    'additional_hrs': '',
    'taken_amount': '',
    'length': '',
    'width': '',
    'height': '',
    'taken_notes': '',
    'cost': ''
  })

  const handleAdd = () => {
    post(route('materials.hours.add', material.material_id))
    console.log(errors)
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1><FontAwesomeIcon icon='fa-solid fa-calendar-plus' /> {translate('addWorkingHr', userData.language)}: <b>{material.material_name}</b></h1>
      </div>

      <div className="form-container">
        <div className="form-group">
          <Label value={translate('date', userData.language)} />
          <Input type='datetime-local' name='compute_hrs' handleChange={(e) => setData('compute_hrs', e.target.value)} />
          <InputError message={errors.compute_hrs} />
        </div>

        <div className="form-group">
          <Label value={translate('amount', userData.language)} />
          <Input name='taken_amount' handleChange={(e) => setData('taken_amount', e.target.value)} />
          <InputError message={errors.taken_amount} />
        </div>

        <div className="form-group">
          <Label value={translate('length', userData.language)} />
          <Input name='length' handleChange={(e) => setData('length', e.target.value)} />
          <InputError message={errors.length} />
        </div>
        <div className="form-group">
          <Label value={translate('width', userData.language)} />
          <Input name='width' handleChange={(e) => setData('width', e.target.value)} />
          <InputError message={errors.width} />
        </div>
        <div className="form-group">
          <Label value={translate('height', userData.language)} />
          <Input name='height' handleChange={(e) => setData('height', e.target.value)} />
          <InputError message={errors.height} />
        </div>

        <div className="form-group">
          <Label value={translate('notes', userData.language)} />
          <Input name='taken_notes' handleChange={(e) => setData('taken_notes', e.target.value)} />
          <InputError message={errors.taken_notes} />
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
