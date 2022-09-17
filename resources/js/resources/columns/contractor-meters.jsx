import createColumn from "@/resources/helpers/create-column";

import formatMoney from "@/resources/helpers/format-money";
import formatDate from "@/resources/helpers/format-date";
import translate from "@/resources/translations/translate";
import dateLanguage from "@/resources/helpers/dateLanguage";

const LANG = localStorage.getItem('lang')


export const ContractorMetersColumns = [
  createColumn('con_mt_id', translate('id', LANG)),
  createColumn('meters', translate('meters', LANG), (params) => (<span>{params.row.meters} {translate('unitVolume', LANG)}</span>)),
  createColumn('width', translate('width', LANG), (params) => (<span>{params.row.width}m</span>)),
  createColumn('length', translate('length', LANG), (params) => (<span>{params.row.length}m</span>)),
  createColumn('height', translate('height', LANG), (params) => (<span>{params.row.height}m</span>)),
  createColumn('area', translate('area', LANG), (params) => (<span>{params.row.area} <b>m<sup>2</sup></b></span>)),
  createColumn('cost', translate('cost', LANG), (params) => <span className="text-success">{formatMoney(params.row.cost)}</span>),
  createColumn('date', translate('date', LANG), (params) => <span>{dateLanguage(params.row.started_at, LANG)}</span>),
]
