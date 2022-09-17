import React from 'react'

import Layout from "@/Layouts/Layout"

import { useForm, usePage } from "@inertiajs/inertia-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { ContractorsColumns } from "@/resources/columns/contractors"

import ContractorsLayout from "@/Pages/Contractors/Layout/ContractorsLayout"
import translate from "@/resources/translations/translate";

const RestoreContractor = () => {

  const { contractors, contractor, userData } = usePage().props
  const { post } = useForm()

  const handleRestore = () => {
    post(route('contractors.restore', contractor.con_id))
  }

  return (
    <Layout>
      <ContractorsLayout cols={ContractorsColumns} contractors={contractors}>
        <div className="set-status-container">
          <h1 className='title'><FontAwesomeIcon icon='fa-solid fa-trash-restore' /> {translate('restore', userData.language)} - <strong>{contractor.con_name}</strong></h1>
          <p>{translate('restoreContractorParagraph', userData.language)}</p>
          <button onClick={handleRestore} className="btn btn-primary"><FontAwesomeIcon icon='fa-solid fa-trash-restore' /> {translate('restore', userData.language)}</button>
        </div>
      </ContractorsLayout>
    </Layout>
  )
}

export default RestoreContractor
