import createColumn from "@/resources/helpers/create-column";
import formatDate from "@/resources/helpers/format-date";
import {Link} from "@inertiajs/inertia-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip} from "@mui/material";
import translate from "@/resources/translations/translate";
import dateLanguage from "@/resources/helpers/dateLanguage";

const LANG = localStorage.getItem('lang')

export const StoresColumns = [
  createColumn('store_id', translate('id', LANG)),
  createColumn('store_name', translate('name', LANG)),
  createColumn('store_tag', translate('tag', LANG)),
  createColumn('store_capacity', translate('capacity', LANG)),
  createColumn('store_type', translate('type', LANG)),
  createColumn('created_at', translate('joinedIn', LANG), (params) => dateLanguage(params.row.created_at, LANG)),
  createColumn('updated_at', translate('lastUpdate', LANG), (params) => dateLanguage(params.row.created_at, LANG)),
  createColumn('actions', translate('handle', LANG), (params) => {
    return (
      <div className="actions">
        {params.row.deleted_at != null ? (
          <Tooltip  title={translate('restore', LANG)}>
            <Link href={route('stores.restore', params.row.store_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-trash-restore' /></Link>
          </Tooltip>
        ) : (
          <>
            <Tooltip title={translate('storedMaterials', LANG)}>
              <Link href={route('stores.materials', params.row.store_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-layer-group' /></Link>
            </Tooltip>
            <Tooltip title={translate('addMaterial', LANG)}>
              <Link href={route('stores.materials.add', params.row.store_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-plus' /></Link>
            </Tooltip>
            <Tooltip title={translate('update', LANG)}>
              <Link href={route('stores.update', params.row.store_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-edit' /></Link>
            </Tooltip>
            <Tooltip title={translate('delete', LANG)}>
              <Link href={route('stores.delete', params.row.store_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-trash' /></Link>
            </Tooltip>
          </>
        )}
      </div>
    )
  }, 1.5)
];
