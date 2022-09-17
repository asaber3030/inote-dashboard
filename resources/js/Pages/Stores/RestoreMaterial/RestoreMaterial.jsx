import React from 'react'

import Layout from "@/Layouts/Layout"
import { StoresColumns } from "@/resources/columns/stores"
import {useForm, usePage} from "@inertiajs/inertia-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MaterialsLayout from "@/Pages/Stores/Layout/MaterialsLayout";
import {MaterialsColumns} from "@/resources/columns/materials";
import translate from "@/resources/translations/translate";

const RestoreMaterial = () => {

  const { materials, material, userData } = usePage().props
  const { post } = useForm()

  const handleRestore = () => {
    post(route('stores.materials.restore', material.material_id))
  }

  return (
    <Layout>
      <MaterialsLayout cols={MaterialsColumns} materials={materials}>

        <div className="set-status-container">
          <h1 className='title'><FontAwesomeIcon icon='fa-solid fa-trash-restore' /> {translate('restore', userData.language)} - {translate('material', userData.language)}: <strong>{material.material_name}</strong></h1>
          <p>
            {translate('restorePara', userData.language)}
          </p>
          <button onClick={handleRestore} className="btn btn-success"><FontAwesomeIcon icon='fa-solid fa-trash-restore' /> {translate('restore', userData.language)}</button>
        </div>

      </MaterialsLayout>
    </Layout>
  )
}

export default RestoreMaterial
