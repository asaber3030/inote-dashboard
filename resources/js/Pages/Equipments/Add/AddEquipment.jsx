import Layout from "@/Layouts/Layout";

import { EquipmentsColumns } from "@/resources/columns/equipments";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRef } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";

import Input from "@/Components/Input/Input";
import Label from "@/Components/Input/Label";
import InputError from "@/Components/Input/InputError";

import EquipmentsLayout from "@/Pages/Equipments/Layout/EquipmentsLayout";
import translate from "@/resources/translations/translate";

const AddEquipment = () => {
  const { equipments, lastEquipmentID, userData } = usePage().props
  const { data, setData, post, errors } = useForm({
    equipment_name: '',
    equipment_type: '',
    productivity: '',
  })

  const handleAdd = () => {
    post(route('equipments.add'))
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('addEquipment', userData.language)} </h1>
      </div>
      <EquipmentsLayout equipments={equipments} cols={EquipmentsColumns}>
        <div className="form-container">
          <div className="form-group">
            <Label value={translate('tag', userData.language)} />
            <Input disabled={true} value={'EQU' + (lastEquipmentID + 1)} />
          </div>

          <div className="form-group">
            <Label value={translate('name', userData.language)} />
            <Input
              name='equipment_name'
              handleChange={(e) => setData('equipment_name', e.target.value)}
            />
            <InputError message={errors.equipment_name} />
          </div>

          <div className="form-group">
            <Label value={translate('type', userData.language)} />
            <Input
              name='equipment_type'
              handleChange={(e) => setData('equipment_type', e.target.value)}
            />
            <InputError message={errors.equipment_type} />
          </div>

          <div className="form-group">
            <Label value={translate('productivity', userData.language)} />
            <Input
              name='productivity'
              handleChange={(e) => setData('productivity', e.target.value)}
            />
            <InputError message={errors.productivity} />
          </div>

          <div className="form-group">
            <button onClick={handleAdd} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('addEquipment', userData.language)}</button>
          </div>
        </div>

      </EquipmentsLayout>
    </Layout>
  );
}

export default AddEquipment
