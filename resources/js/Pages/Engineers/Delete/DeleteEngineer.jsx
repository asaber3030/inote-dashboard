import React from 'react'

import Layout from "@/Layouts/Layout"
import EngineersLayout from "@/Pages/Engineers/Layout/EngineerLayout";

import { useForm, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EngineersColumns } from "@/resources/columns/engineers";
import translate from "@/resources/translations/translate";

const DeleteEngineer = () => {

  const { engineers, engineer, userData } = usePage().props
  const { post } = useForm()

  const handleDelete = () => {
    post(route('engineers.delete', engineer.id))
  }

  return (
    <Layout>
      <EngineersLayout cols={EngineersColumns} engineers={engineers}>
        <div className="set-status-container">
          <h1 className='title'><FontAwesomeIcon icon='fa-solid fa-trash' /> {translate('delete', userData.language)} - {translate('engineer', userData.language)}: <strong>{userData.name}</strong></h1>
          <p>
            {translate('deleteEngineerParagraph', userData.language)}
          </p>
          <button onClick={handleDelete} className="btn btn-danger"><FontAwesomeIcon icon='fa-solid fa-trash' /> {translate('delete', userData.language)}</button>
        </div>
      </EngineersLayout>
    </Layout>
  )
}

export default DeleteEngineer
