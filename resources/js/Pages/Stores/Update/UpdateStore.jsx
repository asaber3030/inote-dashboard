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

const UpdateStore = () => {
  const { stores, lastStoreID, store, userData } = usePage().props;

  const { data, setData, put, errors, processing } = useForm({
    store_name: store.store_name,
    store_type: store.store_type,
    store_capacity: store.store_capacity
  })

  const handleUpdate = () => {
    put(route('stores.update', store.store_id))
  }

  return (
    <Layout>
      <StoresLayout cols={StoresColumns} stores={stores}>
        <div className="layout-header">
          <h1>{translate('update', userData.language)} {translate('store', userData.language)} - <strong>{store.store_name}</strong></h1>
        </div>
        <div className="form-container add-store">

          <div className="form-group">
            <Label value={translate('name', userData.language)} />
            <Input
              value={data.store_name}
              handleChange={ (e) => setData('store_name', e.target.value) }
            />
            <InputError message={errors.store_name} />
          </div>
          <div className="form-group">
            <Label value={translate('type', userData.language)} />
            <Input
              value={data.store_type}
              handleChange={ (e) => setData('store_type', e.target.value) }
            />
            <InputError message={errors.store_type} />
          </div>
          <div className="form-group">
            <Label value={translate('capacity', userData.language)} />
            <Input
              value={data.store_capacity}
              handleChange={ (e) => setData('store_capacity', e.target.value) }
            />
            <InputError message={errors.store_capacity} />
          </div>

          <div className="form-group">
            <button onClick={handleUpdate} className="btn btn-primary"><FontAwesomeIcon icon='fa-solid fa-edit' /> {translate('update', userData.language)}</button>
          </div>
        </div>
      </StoresLayout>
    </Layout>
  )
}

export default UpdateStore
