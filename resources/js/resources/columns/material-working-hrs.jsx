import createColumn from "@/resources/helpers/create-column";
import {APP_URL} from "@/resources/constants";
import formatDate from "@/resources/helpers/format-date";
import {Tooltip} from "@mui/material";
import {Link} from "@inertiajs/inertia-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dateLanguage from "@/resources/helpers/dateLanguage";
import translate from "@/resources/translations/translate";

const LANG = localStorage.getItem('lang')

export const MaterialWorkingHrsColumns = [
  createColumn('material_wr_hr_id', translate('id', LANG)),
  createColumn('length', translate('length', LANG), params => params.row.length + 'm'),
  createColumn('width', translate('width', LANG), params => params.row.width + 'm'),
  createColumn('height', translate('height', LANG), params => params.row.height + 'm'),
  createColumn('taken_amount', translate('amount', LANG), params => params.row.taken_amount + translate('unitVolume', LANG)),
  createColumn('compute_hrs', translate('date', LANG), (params) => dateLanguage(params.row.compute_hrs, LANG)),
  createColumn('cost', translate('cost', LANG)),
];
