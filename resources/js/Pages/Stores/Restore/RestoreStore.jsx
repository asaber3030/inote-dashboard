import React from 'react'

import Layout from "@/Layouts/Layout"
import StoresLayout from "@/Pages/Stores/Layout/StoresLayout"
import { StoresColumns } from "@/resources/columns/stores"
import { useForm, usePage } from "@inertiajs/inertia-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import translate from "@/resources/translations/translate";

const RestoreStore = () => {

  const { stores, store, userData } = usePage().props
  const { post } = useForm()

  const handleRestore = () => {
    post(route('stores.restore', store.store_id))
  }

  return (
    <Layout>
      <StoresLayout cols={StoresColumns} stores={stores}>

        <div className="set-status-container">
          <h1 className='title'><FontAwesomeIcon icon='fa-solid fa-trash-restore' /> {translate('restore', userData.language)} - {translate('store', userData.language)}: <strong>{store.store_name}</strong></h1>
          <p>
            {translate('restorePara', userData.language)}
          </p>
          <button onClick={handleRestore} className="btn btn-primary"><FontAwesomeIcon icon='fa-solid fa-trash-restore' /> {translate('restore', userData.language)}</button>
        </div>

      </StoresLayout>
    </Layout>
  )
}

export default RestoreStore
