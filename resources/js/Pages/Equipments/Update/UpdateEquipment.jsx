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

const UpdateEquipment = () => {
  const { equipments, equipment, lastEquipmentID, userData } = usePage().props
  const { data, setData, post, errors } = useForm({
    equipment_name: equipment.eq_name,
    equipment_type: equipment.eq_type,
    productivity: equipment.productivity,
  })

  const handleUpdate = () => {
    post(route('equipments.update', equipment.eq_id))
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1>Update Equipment - <b>{equipment.eq_name}</b></h1>
      </div>
      <EquipmentsLayout equipments={equipments} cols={EquipmentsColumns}>
        <div className="form-container">
          <div className="form-group">
            <Label value={translate('tag', userData.language)} />
            <Input disabled={true} value={equipment.eq_tag} />
          </div>

          <div className="form-group">
            <Label value={translate('type', userData.language)} />
            <Input
              value={data.equipment_name}
              handleChange={(e) => setData('equipment_name', e.target.value)}
            />
            <InputError message={errors.equipment_name} />
          </div>

          <div className="form-group">
            <Label value={translate('type', userData.language)} />
            <Input
              value={data.equipment_type}
              handleChange={(e) => setData('equipment_type', e.target.value)}
            />
            <InputError message={errors.equipment_type} />
          </div>

          <div className="form-group">
            <Label value={translate('productivity', userData.language)} />
            <Input
              name='productivity'
              value={data.productivity}
              handleChange={(e) => setData('productivity', e.target.value)}
            />
            <InputError message={errors.productivity} />
          </div>

          <div className="form-group">
            <button onClick={handleUpdate} className='btn btn-success'><FontAwesomeIcon icon='fa-solid fa-edit' /> {translate('update', userData.language)} {equipment.eq_name}</button>
          </div>
        </div>

      </EquipmentsLayout>
    </Layout>
  );
}

export default UpdateEquipment
