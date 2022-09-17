import React from 'react'

import Layout from "@/Layouts/Layout"
import StoresLayout from "@/Pages/Stores/Layout/StoresLayout"
import { StoresColumns } from "@/resources/columns/stores"
import {useForm, usePage} from "@inertiajs/inertia-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import translate from "@/resources/translations/translate";

const DeleteStore = () => {

  const { stores, userData, store } = usePage().props
  const { post } = useForm()

  const handleDelete = () => {
    post(route('stores.delete', store.store_id))
  }

  return (
    <Layout>
      <StoresLayout cols={StoresColumns} stores={stores}>

        <div className="set-status-container">
          <h1 className='title'><FontAwesomeIcon icon='fa-solid fa-trash' /> {translate('delete', userData.language)} <strong>{store.store_name}</strong></h1>
          <p>
            {translate('deletePara', userData.language)}
          </p>
          <button onClick={handleDelete} className="btn btn-danger"><FontAwesomeIcon icon='fa-solid fa-trash' /> {translate('delete', userData.language)}</button>
        </div>

      </StoresLayout>
    </Layout>
  )
}

export default DeleteStore
