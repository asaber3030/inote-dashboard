import React from 'react'

import Layout from "@/Layouts/Layout"
import StoresLayout from "@/Pages/Stores/Layout/StoresLayout"
import { EquipmentsColumns } from "@/resources/columns/equipments"
import { useForm, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EquipmentsLayout from "@/Pages/Equipments/Layout/EquipmentsLayout";
import translate from "@/resources/translations/translate";

const RestoreEquipment = () => {

  const { equipments, equipment, userData } = usePage().props
  const { post } = useForm()

  const handleRestore = () => {
    post(route('equipments.restore', equipment.eq_id))
  }

  return (
    <Layout>
      <EquipmentsLayout cols={EquipmentsColumns} equipments={equipments}>

        <div className="set-status-container">
          <h1 className='title'><FontAwesomeIcon icon='fa-solid fa-trash-restore' /> {translate('restore', userData.language)} {translate('equipment', userData.language)} <strong>{equipment.eq_name}</strong></h1>
          <p>
            {translate('restoreEquipmentParagraph', userData.language)} <b>{equipment.eq_name}</b> again?
          </p>
          <button onClick={handleRestore} className="btn btn-primary"><FontAwesomeIcon icon='fa-solid fa-trash-restore' /> {translate('restore', userData.language)}</button>
        </div>

      </EquipmentsLayout>
    </Layout>
  )
}

export default RestoreEquipment
