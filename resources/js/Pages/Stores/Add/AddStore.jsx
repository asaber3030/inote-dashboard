import React from "react";
import Layout from "@/Layouts/Layout";
import StoresLayout from "@/Pages/Stores/Layout/StoresLayout";
import {StoresColumns} from "@/resources/columns/stores";
import {useForm, usePage} from "@inertiajs/inertia-react";
import Input from "@/Components/Input/Input";
import Label from "@/Components/Input/Label";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import InputError from "@/Components/Input/InputError";
import translate from "@/resources/translations/translate";

const AddStore = () => {
  const { stores, userData, lastStoreID } = usePage().props;

  const { data, setData, post, errors, processing } = useForm({
    store_tag: 'STR' + (lastStoreID + 1),
    store_name: '',
    store_type: '',
    store_capacity: ''
  })

  console.log(lastStoreID)

  const handleAdd = () => {
    post(route('stores.add'))
    console.log('post')
  }

  return (
    <Layout>
      <StoresLayout cols={StoresColumns} stores={stores}>
        <div className="layout-header">
          <h1>{translate('createStore', userData.language)}</h1>
        </div>
        <div className="form-container add-store">

          <div className="form-group">
            <Label value={translate('tag', userData.language)}/>
            <Input disabled={true} value={"STR" + (lastStoreID + 1)} />
          </div>
          <div className="form-group">
            <Label value={translate('name', userData.language)}/>
            <Input
              handleChange={ (e) => setData('store_name', e.target.value) }
            />
            <InputError message={errors.store_name} />
          </div>
          <div className="form-group">
            <Label value={translate('type', userData.language)}/>
            <Input
              handleChange={ (e) => setData('store_type', e.target.value) }
            />
            <InputError message={errors.store_type} />
          </div>
          <div className="form-group">
            <Label value={translate('capacity', userData.language)} />
            <Input
              handleChange={ (e) => setData('store_capacity', e.target.value) }
            />
            <InputError message={errors.store_capacity} />
          </div>

          <div className="form-group">
            <button onClick={handleAdd} className="btn btn-primary"><FontAwesomeIcon  icon='fa-solid fa-plus' /> {translate('create', userData.language)}</button>
          </div>
        </div>
      </StoresLayout>
    </Layout>
  )
}

export default AddStore
