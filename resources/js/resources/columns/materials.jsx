import createColumn from "@/resources/helpers/create-column";
import formatDate from "@/resources/helpers/format-date";
import {Link} from "@inertiajs/inertia-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip} from "@mui/material";
import {APP_URL} from "@/resources/constants";
import translate from "@/resources/translations/translate";
import dateLanguage from "@/resources/helpers/dateLanguage";

const LANG = localStorage.getItem('lang')

export const MaterialsColumns = [
  createColumn('material_id', translate('id', LANG)),
  createColumn('material_name', translate('name', LANG)),
  createColumn('material_tag', translate('tag', LANG)),
  createColumn('material_amount', translate('amount', LANG)),
  createColumn('material_icon', translate('icon', LANG), (params) => <img style={{ width: '50px', height: '50px' }} src={APP_URL + params.row.material_icon} alt=""/>),
  createColumn('created_at', translate('joinedIn', LANG), (params) => dateLanguage(params.row.created_at)),
  createColumn('updated_at', translate('lastUpdate', LANG), (params) => dateLanguage(params.row.created_at)),
  createColumn('actions', translate('handle', LANG), (params) => {
    return (
      <div className="actions">
        {params.row.deleted_at != null ? (
          <Tooltip title={translate('restore', LANG)}>
            <Link href={route('stores.materials.restore', params.row.material_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-trash-restore' /></Link>
          </Tooltip>
        ) : (
          <>
            <Tooltip title={translate('update', LANG)}>
              <Link href={route('stores.materials.update', params.row.material_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-edit' /></Link>
            </Tooltip>
            <Tooltip title={translate('delete', LANG)}>
              <Link href={route('stores.materials.delete', params.row.material_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-trash' /></Link>
            </Tooltip>
          </>
        )}
      </div>
    )
  }, 1.5)
];


export const MaterialsColumnsMain = [
  createColumn('material_id', translate('id', LANG)),
  createColumn('material_name', translate('name', LANG)),
  createColumn('store', translate('belongsToStore', LANG), (params) => <Link href={route('stores.materials', params.row.store.store_id)}>{params.row.store.store_name}</Link>),
  createColumn('material_tag', translate('tag', LANG)),
  createColumn('material_amount', translate('amount', LANG)),
  createColumn('material_icon', translate('icon', LANG), (params) => <img style={{ width: '50px', height: '50px' }} src={APP_URL + params.row.material_icon} alt=""/>),
  createColumn('created_at', translate('joinedIn', LANG), (params) => dateLanguage(params.row.created_at)),
  createColumn('updated_at', translate('lastUpdate', LANG), (params) => dateLanguage(params.row.created_at)),
  createColumn('actions', translate('handle', LANG), (params) => {
    return (
      <div className="actions">
        {params.row.deleted_at != null ? (
          <Tooltip  title={translate('restore', LANG)}>
            <Link href={route('stores.materials.restore', params.row.material_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-trash-restore' /></Link>
          </Tooltip>
        ) : (
          <>
            <Tooltip title={translate('update', LANG)}>
              <Link href={route('stores.materials.update', params.row.material_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-edit' /></Link>
            </Tooltip>
            <Tooltip title={translate('delete', LANG)}>
              <Link href={route('stores.materials.delete', params.row.material_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-trash' /></Link>
            </Tooltip>
            <Tooltip title={translate('workingHours', LANG)}>
              <Link href={route('materials.hours', params.row.material_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-clock' /></Link>
            </Tooltip>
            <Tooltip title='Add Hours'>
              <Link href={route('materials.hours.add', params.row.material_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-calendar-plus' /></Link>
            </Tooltip>
          </>
        )}
      </div>
    )
  }, 1.5),
];
