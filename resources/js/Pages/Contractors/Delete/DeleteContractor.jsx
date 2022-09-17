import React from 'react'

import Layout from "@/Layouts/Layout"
import { ContractorsColumns } from "@/resources/columns/contractors";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContractorsLayout from "@/Pages/Contractors/Layout/ContractorsLayout";
import translate from "@/resources/translations/translate";

const DeleteContractor = () => {

  const { contractors, contractor, userData } = usePage().props
  const { post } = useForm()

  const handleDelete = () => {
    post(route('contractors.delete', contractor.con_id))
  }

  return (
    <Layout>
      <ContractorsLayout cols={ContractorsColumns} contractors={contractors}>
        <div className="set-status-container">
          <h1 className='title'><FontAwesomeIcon icon='fa-solid fa-trash' /> {translate('delete', userData.language)} {translate('contractor', userData.language)} : <strong>{contractor.con_name}</strong></h1>
          <p>{translate('deleteContractorParagraph', userData.language)}</p>
          <button onClick={handleDelete} className="btn btn-danger"><FontAwesomeIcon icon='fa-solid fa-trash' /> {translate('delete', userData.language)}</button>
        </div>
      </ContractorsLayout>
    </Layout>
  )
}

export default DeleteContractor
