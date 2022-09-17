import React from 'react'

import Layout from "@/Layouts/Layout"
import { StoresColumns } from "@/resources/columns/stores"
import {useForm, usePage} from "@inertiajs/inertia-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MaterialsLayout from "@/Pages/Stores/Layout/MaterialsLayout";
import {MaterialsColumns} from "@/resources/columns/materials";
import translate from "@/resources/translations/translate";

const DeleteMaterial = () => {

  const { materials, userData, material } = usePage().props
  const { post } = useForm()

  const handleDelete = () => {
    post(route('stores.materials.delete', material.material_id))
  }

  return (
    <Layout>
      <MaterialsLayout cols={MaterialsColumns} materials={materials}>

        <div className="set-status-container">
          <h1 className='title'><FontAwesomeIcon icon='fa-solid fa-trash' /> {translate('delete', userData.language)} - {translate('material', userData.language)}: <strong>{material.material_name}</strong></h1>
          <p>
            {translate('deletePara', userData.language)}
          </p>
          <button onClick={handleDelete} className="btn btn-danger"><FontAwesomeIcon icon='fa-solid fa-trash' /> {translate('delete', userData.language)}</button>
        </div>

      </MaterialsLayout>
    </Layout>
  )
}

export default DeleteMaterial
