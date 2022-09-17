import Layout from "@/Layouts/Layout";

import {useRef} from "react";

import {useForm, usePage} from "@inertiajs/inertia-react";
import Input from "@/Components/Input/Input";
import Label from "@/Components/Input/Label";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import InputError from "@/Components/Input/InputError";
import MaterialsLayout from "@/Pages/Stores/Layout/MaterialsLayout";
import { MaterialsColumns} from "@/resources/columns/materials";
import translate from "@/resources/translations/translate";

const AddMaterial = () => {
  const { stores, materials, lastMaterialID, userData } = usePage().props
  let fileRef = useRef();
  const { data, setData, post, errors } = useForm({
    material_name: '',
    material_amount: '',
    material_icon: '',
    material_specifications: '',
    store: 1
  })

  const handleAdd = () => {
    post(route('materials.add'))
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('addMaterial', userData.language)}</h1>
      </div>
      <MaterialsLayout materials={materials} cols={MaterialsColumns}>
        <div className="form-container">
          <div className="form-group">
            <Label value={translate('tag', userData.language)} />
            <Input disabled={true} value={'MTR' + (lastMaterialID + 1)} />
          </div>

          <div className="form-group">
            <Label value={translate('store', userData.language)} />
            <select name='store' className='form-select' onChange={(e) => setData('store', e.target.value)}>
              {stores.map((store, index) => (
                <option value={store.store_id} key={index}>{store.store_name}</option>
              ))}
            </select>
            <InputError message={errors.store} />
          </div>

          <div className="form-group">
            <Label value={translate('name', userData.language)} />
            <Input
              name='material_name'
              handleChange={(e) => setData('material_name', e.target.value)}
            />
            <InputError message={errors.material_name} />
          </div>

          <div className="form-group">
            <Label value={translate('amount', userData.language)} />
            <Input
              name='material_amount'
              handleChange={(e) => setData('material_amount', e.target.value)}
            />
            <InputError message={errors.material_amount} />
          </div>

          <div className="form-group">
            <Label value={translate('specification', userData.language)} />
            <Input
              name='material_specifications'
              handleChange={(e) => setData('material_specifications', e.target.value)}
            />
            <InputError message={errors.material_specifications} />
          </div>

          <div className="form-group form-file-group" onClick={()=> fileRef.current.click()}>
            <FontAwesomeIcon icon='fa-solid fa-file' />
            <Label value={translate('icon', userData.language)} />
            <input name='material_icon' ref={fileRef} className='form-control' type='file' onChange={(e) => setData('material_icon', e.target.files[0])}  />
            <InputError message={errors.material_icon} />
          </div>

          <div className="form-group">
            <button onClick={handleAdd} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('create', userData.language)}</button>
          </div>
        </div>
      </MaterialsLayout>
    </Layout>
  );
}

export default AddMaterial
