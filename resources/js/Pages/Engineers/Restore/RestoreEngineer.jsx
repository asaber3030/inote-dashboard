import React from 'react'

import Layout from "@/Layouts/Layout"
import EngineersLayout from "@/Pages/Engineers/Layout/EngineerLayout";

import { useForm, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EngineersColumns } from "@/resources/columns/engineers";
import translate from "@/resources/translations/translate";

const RestoreEngineer = () => {

  const { engineers, engineer, userData } = usePage().props
  const { post } = useForm()

  const handleRestore = () => {
    post(route('engineers.restore', engineer.id))
  }

  return (
    <Layout>
      <EngineersLayout cols={EngineersColumns} engineers={engineers}>
        <div className="set-status-container">
          <h1 className='title'><FontAwesomeIcon icon='fa-solid fa-trash-restore' /> {translate('restore', userData.language)} {translate('engineer', userData.language)}: <strong>{engineer.name}</strong></h1>
          <p>{translate('restoreEngineerParagraph', userData.language)} <b>@{engineer.username}</b></p>
          <button onClick={handleRestore} className="btn btn-primary"><FontAwesomeIcon icon='fa-solid fa-trash-restore' /> {translate('restore', userData.language)}</button>
        </div>
      </EngineersLayout>
    </Layout>
  )
}

export default RestoreEngineer
