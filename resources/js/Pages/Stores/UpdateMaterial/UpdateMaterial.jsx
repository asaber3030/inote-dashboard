import Layout from "@/Layouts/Layout";

import {useRef} from "react";

import {useForm, usePage} from "@inertiajs/inertia-react";
import Input from "@/Components/Input/Input";
import Label from "@/Components/Input/Label";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import InputError from "@/Components/Input/InputError";
import MaterialsLayout from "@/Pages/Stores/Layout/MaterialsLayout";
import {MaterialsColumns} from "@/resources/columns/materials";
import translate from "@/resources/translations/translate";

const UpdateMaterial = () => {
  const { material, materials, userData, lastMaterialID } = usePage().props
  let fileRef = useRef();
  const { data, setData, post, errors } = useForm({
    material_name: material.material_name,
    material_amount: material.material_amount,
    material_specifications: material.material_specifications
  })

  const handleUpdate = () => {
    post(route('stores.materials.update', material.material_id))
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('update', userData.language)} {translate('material', userData.language)} <b>{material.material_name}</b></h1>
      </div>
      <MaterialsLayout materials={materials} cols={MaterialsColumns}>
        <div className="form-container">

          <div className="form-group">
            <Label value={translate('name', userData.language)} />
            <Input
              name='material_name'
              value={data.material_name}
              handleChange={(e) => setData('material_name', e.target.value)}
            />
            <InputError message={errors.material_name} />
          </div>

          <div className="form-group">
            <Label value={translate('amount', userData.language)} />
            <Input
              name='material_amount'
              value={data.material_amount}
              handleChange={(e) => setData('material_amount', e.target.value)}
            />
            <InputError message={errors.material_amount} />
          </div>

          <div className="form-group">
            <Label value={translate('specification', userData.language)} />
            <Input
              name='material_specifications'
              value={data.material_specifications}
              handleChange={(e) => setData('material_specifications', e.target.value)}
            />
            <InputError message={errors.material_specifications} />
          </div>

          <div className="form-group">
            <button onClick={handleUpdate} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-edit' /> {translate('update', userData.language)}</button>
          </div>
        </div>
      </MaterialsLayout>
    </Layout>
  );
}

export default UpdateMaterial
