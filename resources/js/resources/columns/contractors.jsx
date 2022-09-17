import createColumn from "@/resources/helpers/create-column";
import formatDate from "@/resources/helpers/format-date";
import { CONTRACTOR_TYPE } from "@/resources/constants";
import { Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import translate from "@/resources/translations/translate";
import dateLanguage from "@/resources/helpers/dateLanguage";

const LANG = localStorage.getItem('lang')

export const ContractorsColumns = [
  createColumn('con_id', translate('id', LANG)),
  createColumn('con_name', translate('name', LANG)),
  createColumn('con_phone', translate('phone', LANG), (params) => { return '+20' + params.row.con_phone }),
  createColumn('con_type', translate('type', LANG), (params) => {
    if (params.row.con_type == 2) {
      return translate('contractorEquipment', LANG);
    } else if (params.row.con_type == 1) {
      return translate('contractorMeter', LANG);
    } else if (params.row.con_type == 0) {
      return translate('contractorDaily', LANG);
    }
  }),
  createColumn('created_at', translate('joinedIn', LANG), params => dateLanguage(params.row.created_at, LANG)),
  createColumn('updated_at', translate('lastUpdate', LANG), params => dateLanguage(params.row.updated_at, LANG)),
  createColumn('actions', translate('handle', LANG), (params) => {
    return (
      <div className="actions">
        {params.row.deleted_at == null ? (
          <>
            <Link href={route('contractors.view', params.row.con_id)} className="btn btn-primary"><FontAwesomeIcon  icon='fa-solid fa-eye' /></Link>
            <Link href={route('contractors.update', params.row.con_id)} className="btn btn-primary"><FontAwesomeIcon  icon='fa-solid fa-edit' /></Link>
            <Link href={route('contractors.delete', params.row.con_id)} className="btn btn-primary"><FontAwesomeIcon  icon='fa-solid fa-trash' /></Link>
          </>
        ) : (
          <Link href={route('contractors.restore', params.row.con_id)} className="btn btn-primary"><FontAwesomeIcon  icon='fa-solid fa-trash-restore' /></Link>
        )}
      </div>
    )
  }, 1.5)
];
