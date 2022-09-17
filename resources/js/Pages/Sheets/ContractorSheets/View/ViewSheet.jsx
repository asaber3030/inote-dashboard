import './view-sheet.scss'

import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

import Layout from "@/Layouts/Layout"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DataGrid } from "@mui/x-data-grid";
import { Link, usePage } from "@inertiajs/inertia-react"

import formatDate from "@/resources/helpers/format-date";

import { exportToCsv } from "@/resources/helpers/convertToCSV";
import { ContractorWorkersColumns } from "@/resources/columns/contractor-workers";
import { CONTRACTOR_SHEETS_TYPES, CONTRACTOR_TYPE, CONTRACTOR_WORKER_TYPE } from "@/resources/constants";
import { EquipmentsWorkingHoursColumns } from "@/resources/columns/equipments-working-hours";
import { ContractorMetersColumns } from "@/resources/columns/contractor-meters";
import translate from "@/resources/translations/translate";
import dateLanguage from "@/resources/helpers/dateLanguage";

const ViewSheet = () => {

  const { sheet, totalMoneyWrs, totalHoursWrs, userData, totalMoneyMts, totalMeters } = usePage().props
  const mainData = JSON.parse(sheet.sheet_data)

  const [summaryStatusState, setSummary] = useState(sheet.include_summary)

  const changeSummaryStatus = (e) => {
    setSummary(e.target.checked)
  }
  const submitChangeStatus = () => {
    Inertia.post(route('contractor.sheets.change', sheet.sheet_id), {
      sheetID: sheet.sheet_id,
      summaryStatus: summaryStatusState
    })
  }

  const exportWorkersOrTechicians = () => {
    const csvWorkers = [
      [
        "Worker ID", "Worker Name", "Worker Phone", "Worker Type",
        "Started From", "Ended At", "Total Hours", "Total Cost"
      ],
      ...mainData.map(item => [
        item.con_wr_id, item.con_wr_name, item.con_wr_phone, CONTRACTOR_WORKER_TYPE[item.con_wr_type],
        item.started_at, item.ended_at, item.compute_hrs, item.cost
      ]),
    ]
    if (sheet.include_summary === 1) {
      csvWorkers.push(
        ["", ""],
        ["", ""],
        ["Summary Sheet", sheet.sheet_code],
        ["Contractor Name", sheet.contractor.con_name],
        ["Contractor ID", sheet.contractor.con_id],
        ["Contractor Phone", sheet.contractor.con_phone],
        ["Contractor Type", CONTRACTOR_TYPE[sheet.contractor.con_type]],
        ["Rows For this sheet", mainData.length],
        ["Total Spent Money", totalMoneyWrs + ' EGP'],
        ["Total Working Hours", totalHoursWrs + ' hrs'],
      )
    }
    exportToCsv(sheet.sheet_code + '.csv', csvWorkers)
  }
  const exportMeters = () => {
    const metersCSVArray = [
      ["Meter ID", "Total Meters", "Length", "Width", "Height", "Total Area", "Cost", "Date"],
      ...mainData.map((item) => [
        item.con_mt_id, item.meters + 'm', item.length + 'm', item.width + 'm', item.height + 'm', item.area + 'm', item.cost + ' EGP', item.started_at
      ])
    ]
    if (sheet.include_summary) {
      metersCSVArray.push(
        ["", ""],
        ["", ""],
        ["Summary Sheet", sheet.sheet_code],
        ["Contractor Name", sheet.contractor.con_name],
        ["Contractor ID", sheet.contractor.con_id],
        ["Contractor Phone", sheet.contractor.con_phone],
        ["Contractor Type", CONTRACTOR_TYPE[sheet.contractor.con_type]],
        ["Rows For this sheet", mainData.length],
        ["Total Spent Money", totalMoneyMts + ' EGP'],
        ["Total Meters", totalMeters + 'm2'],
      )
    }
    exportToCsv(sheet.sheet_code + '_' + sheet.sheet_type.replace(/\s+/g, '').toLowerCase() + '_' + sheet.contractor.con_name + '.csv', metersCSVArray)
  }
  const exportEquipments = () => {
    const equipmentsCSVArr = [
      ["Hour ID", "Working Location", "Notes", "Cost", "Additional Hours", "Total Hours",
       "Started", "Finished"],
      ...mainData.map((item) => [
        item.eq_hr_id, item.working_location, item.note, item.cost, item.additional_hrs, item.compute_hrs,
        item.started_at, item.ended_at
      ])
    ]
    if (sheet.inlude_summary == 1) {
      equipmentsCSVArr.push(
        ["", ""],
        ["", ""],
        ["Summary Sheet", sheet.sheet_code],
        ["Contractor Name", sheet.contractor.con_name],
        ["Contractor ID", sheet.contractor.con_id],
        ["Contractor Phone", sheet.contractor.con_phone],
        ["Contractor Type", CONTRACTOR_TYPE[sheet.contractor.con_type]],
        ["Rows For this sheet", mainData.length],
      );
    }
    exportToCsv(sheet.sheet_code + '_' + sheet.sheet_type.replace(/\s+/g, '').toLowerCase() + '_' + sheet.contractor.con_name + '.csv', equipmentsCSVArr)
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1><FontAwesomeIcon icon='fa-solid fa-file' /> {translate('sheet', userData.language)} - <b> {sheet.sheet_code}</b></h1>
        <div className="data-actions">
          {sheet.sheet_type == CONTRACTOR_SHEETS_TYPES.workers && (
            <button onClick={exportWorkersOrTechicians} className='btn btn-success'><FontAwesomeIcon icon='fa-solid fa-download' /> {translate('download', userData.language)}</button>
          )}
          {sheet.sheet_type == CONTRACTOR_SHEETS_TYPES.techs && (
            <button onClick={exportWorkersOrTechicians} className='btn btn-success'><FontAwesomeIcon icon='fa-solid fa-download' /> {translate('download', userData.language)}</button>
          )}
          {sheet.sheet_type == CONTRACTOR_SHEETS_TYPES.meters && (
            <button onClick={exportMeters} className='btn btn-success'><FontAwesomeIcon icon='fa-solid fa-download' /> {translate('download', userData.language)}</button>
          )}
          {sheet.sheet_type == CONTRACTOR_SHEETS_TYPES.equipments && (
            <button onClick={exportEquipments} className='btn btn-success'><FontAwesomeIcon icon='fa-solid fa-download' /> {translate('download', userData.language)}</button>
          )}
        </div>
      </div>

      <div className="sheets-container">
        <div className="sheet-info-float">
          <ul>
            <li><span>{translate('rows', userData.language)}</span> <span>{mainData.length} {translate('rows', userData.language)}</span></li>
            <li><span>{translate('type', userData.language)}</span> <span>{sheet.sheet_type}</span></li>
            <li><span>{translate('joinedIn', userData.language)}</span> <span>{dateLanguage(sheet.created_at)}</span></li>
            <li><span>{translate('tag', userData.language)}</span> <span>{sheet.sheet_code}</span></li>
            <li><span>{translate('contractor', userData.language)}</span> <span><Link href={route('contractors.view', sheet.contractor.con_id)}>{sheet.contractor.con_name}</Link></span></li>
            <li>
              <span>{translate('summary', userData.language)}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <label className="switch">
                  <input type="checkbox" checked={summaryStatusState == 1 ? true : false} onChange={changeSummaryStatus} />
                  <span className="slider round"></span>
                </label>
                <button onClick={submitChangeStatus} className='btn btn-sm btn-primary'>{translate('submit', userData.language)}</button>
              </span>
            </li>
          </ul>
        </div>
        <div className="view-sheets">
          <div style={{ width: '100%', height: '600px' }}>
            {CONTRACTOR_SHEETS_TYPES.workers == sheet.sheet_type && (
              <DataGrid
                columns={ContractorWorkersColumns}
                rows={mainData}
                getRowId={row => row.con_wr_id}
              />
            )}
            {CONTRACTOR_SHEETS_TYPES.techs == sheet.sheet_type && (
              <DataGrid
                columns={ContractorWorkersColumns}
                rows={mainData}
                getRowId={row => row.con_wr_id}
              />
            )}
            {CONTRACTOR_SHEETS_TYPES.equipments == sheet.sheet_type && (
              <DataGrid
                columns={EquipmentsWorkingHoursColumns}
                rows={mainData}
                getRowId={row => row.eq_hr_id}
              />
            )}
            {CONTRACTOR_SHEETS_TYPES.meters == sheet.sheet_type && (
              <DataGrid
                columns={ContractorMetersColumns}
                rows={mainData}
                getRowId={row => row.con_mt_id}
              />
            )}
          </div>
          <div className="export-actions">
            <Link href={route('contractor.sheets.add')} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-file-circle-plus' /> {translate('createSheet', userData.language)}</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ViewSheet
