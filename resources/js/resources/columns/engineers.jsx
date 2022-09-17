import { Link } from '@inertiajs/inertia-react'

import createColumn from "@/resources/helpers/create-column";
import translate from "@/resources/translations/translate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ADMIN_ROLES, APP_URL } from "@/resources/constants";

const LANG = localStorage.getItem('lang')

export const EngineersColumns = [
  createColumn('id', translate('id', LANG)),
  createColumn('name', translate('name', LANG)),
  createColumn('email', translate('email', LANG)),
  createColumn('title', translate('jobTitle', LANG)),
  createColumn('image', translate('image', LANG), params => <img src={APP_URL + params.row.image} />),
  createColumn('is_admin', translate('adminRole', LANG), params => ADMIN_ROLES[params.row.is_admin]),
  createColumn('handle', translate('handle', LANG), params => (
    <div className="actions">
      {params.row.deleted_at == null ? (
        <>
          <Link href={route('engineers.update', params.row.id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-edit' /></Link>
          <Link href={route('engineers.delete', params.row.id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-trash' /></Link>
        </>
      ) : (
        <Link href={route('engineers.restore', params.row.id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-trash-restore' /></Link>
      )}
    </div>
  ))
]
