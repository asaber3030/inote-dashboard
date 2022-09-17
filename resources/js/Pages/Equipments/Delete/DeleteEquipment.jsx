import React from 'react'

import Layout from "@/Layouts/Layout"
import StoresLayout from "@/Pages/Stores/Layout/StoresLayout"
import { EquipmentsColumns } from "@/resources/columns/equipments"
import { useForm, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EquipmentsLayout from "@/Pages/Equipments/Layout/EquipmentsLayout";
import translate from "@/resources/translations/translate";

const DeleteEquipment = () => {

  const { equipments, equipment, userData } = usePage().props
  const { post } = useForm()

  const handleDelete = () => {
    post(route('equipments.delete', equipment.eq_id))
  }

  return (
    <Layout>
      <EquipmentsLayout cols={EquipmentsColumns} equipments={equipments}>

        <div className="set-status-container">
          <h1 className='title'><FontAwesomeIcon icon='fa-solid fa-trash' /> {translate('delete', userData.language)} {translate('equipment', userData.language)}: <strong>{equipment.eq_name}</strong></h1>
          <p>
            {translate('deleteEquipmentParagraph', userData.language)}
          </p>
          <button onClick={handleDelete} className="btn btn-danger"><FontAwesomeIcon icon='fa-solid fa-trash' /> {translate('delete', userData.language)}</button>
        </div>

      </EquipmentsLayout>
    </Layout>
  )
}

export default DeleteEquipment
