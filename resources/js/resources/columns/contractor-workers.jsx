import createColumn from "@/resources/helpers/create-column";
import {CONTRACTOR_WORKER_TYPE} from "@/resources/constants";
import formatDate from "@/resources/helpers/format-date";
import formatMoney from "@/resources/helpers/format-money";
import translate from "@/resources/translations/translate";
import dateLanguage from "@/resources/helpers/dateLanguage";

const LANG = localStorage.getItem('lang')

export const ContractorWorkersColumns = [
  createColumn('con_wr_id', translate('id', LANG)),
  createColumn('con_wr_name', translate('name', LANG)),
  createColumn('con_wr_phone', translate('phone', LANG)),
  createColumn('con_wr_type', translate('type', LANG), (params) => {
    if (params.row.con_wr_type == 0) {
      return translate('workers', LANG)
    } else if (params.row.con_wr_type == 1) {
      return translate('technicians', LANG)
    }
  }),
  createColumn('started_at', translate('from', LANG), (params) => dateLanguage(params.row.started_at, LANG)),
  createColumn('ended_at', translate('to', LANG), (params) => dateLanguage(params.row.ended_at, LANG)),
  createColumn('cost', translate('cost', LANG), (params) => <span className="text-success">{formatMoney(params.row.cost)}</span>),
]

export const ContractorWorkersColumnsFilters = [
  createColumn('con_wr_id', translate('id', LANG)),
  createColumn('con_wr_name', translate('name', LANG)),
  createColumn('con_wr_phone', translate('phone', LANG)),
  createColumn('con_wr_type', translate('type', LANG), (params) => {
    if (params.row.con_wr_type == 0) {
      return translate('workers', LANG)
    } else if (params.row.con_wr_type == 1) {
      return translate('technicians', LANG)
    }
  }),
  createColumn('started_at', translate('from', LANG), (params) => formatDate(params.row.started_at)),
  createColumn('ended_at', translate('to', LANG), (params) => formatDate(params.row.ended_at)),
  createColumn('cost', translate('cost', LANG), (params) => <span className="text-success">{formatMoney(params.row.cost)}</span>),
]
