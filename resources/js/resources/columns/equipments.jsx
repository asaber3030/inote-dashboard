import createColumn from "@/resources/helpers/create-column";

import { Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import translate from "@/resources/translations/translate";

const LANG = localStorage.getItem('lang')

export const EquipmentsColumns = [
  createColumn('eq_id', translate('id', LANG)),
  createColumn('eq_name', translate('name', LANG)),
  createColumn('eq_tag', translate('tag', LANG)),
  createColumn('eq_type', translate('type', LANG)),
  createColumn('productivity', translate('productivity', LANG)),
  createColumn('actions', translate('handle', LANG), (params) => {
    return (
      <div className="actions">
        {params.row.deleted_at == null ? (
          <>
            <Link href={route('equipments.update', params.row.eq_id)} className="btn btn-primary"><FontAwesomeIcon  icon='fa-solid fa-edit' /></Link>
            <Link href={route('equipments.delete', params.row.eq_id)} className="btn btn-primary"><FontAwesomeIcon  icon='fa-solid fa-trash' /></Link>
            <Link href={route('equipments.hours.add', params.row.eq_id)} className="btn btn-primary"><FontAwesomeIcon  icon='fa-solid fa-calendar-plus' /></Link>
            <Link href={route('equipments.hours', params.row.eq_id)} className="btn btn-primary"><FontAwesomeIcon  icon='fa-solid fa-calendar' /></Link>
          </>
        ) : (
          <Link href={route('equipments.restore', params.row.eq_id)} className="btn btn-primary"><FontAwesomeIcon  icon='fa-solid fa-trash-restore' /></Link>
        )}
      </div>
    )
  })
]
