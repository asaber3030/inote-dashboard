import createColumn from "@/resources/helpers/create-column";
import formatDate from "@/resources/helpers/format-date";
import dateLanguage from "@/resources/helpers/dateLanguage";
import translate from "@/resources/translations/translate";

const LANG = localStorage.getItem('lang')

export const EquipmentsWorkingHoursColumns = [
  createColumn('eq_hr_id', translate('id', LANG)),
  createColumn('equipment', translate('equipment', LANG), (params) => params.row.equipment.eq_name),
  createColumn('contractor', translate('contractor', LANG), (params) => params.row.contractor.con_name),
  createColumn('working_location', translate('workingLocation', LANG)),
  createColumn('started_at', translate('from', LANG), (params) => dateLanguage(params.row.started_at, LANG)),
  createColumn('ended_at', translate('to', LANG), (params) => dateLanguage(params.row.ended_at, LANG)),
  createColumn('additional_hrs', translate('additionalHrs', LANG), params => params.row.additional_hrs > 0 ? params.row.additional_hrs + ' hrs' : 'N/A'),
  createColumn('compute_hrs', translate('computeHrs', LANG), (params) => dateLanguage(params.row.compute_hrs, LANG)),
  createColumn('cost', translate('cost', LANG), params => <span className="text-success">{params.row.cost + ' EGP'}</span>),
];
