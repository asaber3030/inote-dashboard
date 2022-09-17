import './view-sheet.scss'
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

import { MaterialWorkingHrsColumns } from "@/resources/columns/material-working-hrs";

import Layout from "@/Layouts/Layout"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DataGrid } from "@mui/x-data-grid";
import { Link, usePage } from "@inertiajs/inertia-react"

import formatDate from "@/resources/helpers/format-date";

import {convertToCSV, exportToCsv} from "@/resources/helpers/convertToCSV";
import translate from "@/resources/translations/translate";
import dateLanguage from "@/resources/helpers/dateLanguage";
import {EquipmentsWorkingHoursColumns} from "@/resources/columns/equipments-working-hours";

const ViewEquipmentSheet = () => {

  const { sheet, userData } = usePage().props
  const mainData = JSON.parse(sheet.sheet_data)

  const [summaryStatusState, setSummary] = useState(sheet.include_summary)

  const changeSummaryStatus = (e) => {
    setSummary(e.target.checked)
  }
  const submitChangeStatus = () => {
    Inertia.post(route('equipment.sheets.change', sheet.sheet_id), {
      sheetID: sheet.sheet_id,
      summaryStatus: summaryStatusState
    })
  }

  const downloadData = () => {
    const csvArr = [
      ["Hour ID",
        "Equipment",
        "Started",
        "Ended",
        "Additional Hours",
        "Total Hours",
        "Cost",
        "Notes" ],
      ...mainData.map(item => [
        item.eq_hr_id,
        sheet.equipment.eq_id,
        item.started_at,
        item.ended_at,
        item.additional_hrs + ' hrs',
        item.compute_hrs + ' hrs',
        item.cost + ' EGP',
        item.note
      ])
    ]
    if (summaryStatusState) {
      csvArr.push(
        ["", ""],
        ["", ""],
        ["Sheet Code", sheet.sheet_code],
        ["Sheet Rows", mainData.length + ' rows'],
        ["Equipment", sheet.equipment.eq_name],
        ["Equipment ID", sheet.equipment.eq_id],
        ["Equipment Tag", sheet.equipment.eq_tag],
        ["Equipment Type", sheet.equipment.eq_type],
        ["Productivity", sheet.equipment.productivity],
        ["Created At", sheet.equipment.created_at],
      )
    }

    exportToCsv(sheet.sheet_code + '.csv', csvArr)
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1><FontAwesomeIcon icon='fa-solid fa-file' /> {translate('sheet', userData.language)} - <b>#{sheet.sheet_code}</b></h1>
        <div className="data-actions">
          <button onClick={downloadData} className='btn btn-success'><FontAwesomeIcon icon='fa-solid fa-download' /> {translate('download', userData.language)}</button>
        </div>
      </div>

      <div className="sheets-container">
        <div className="sheet-info-float">
          <ul>
            <li><span>{translate('row', userData.language)}</span> <span>{mainData.length} {translate('row', userData.language)}</span></li>
            <li><span>{translate('joinedIn', userData.language)}</span> <span>{dateLanguage(sheet.created_at, userData.language)}</span></li>
            <li><span>{translate('tag', userData.language)}</span> <span>{sheet.sheet_code}</span></li>
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
            <DataGrid
              columns={EquipmentsWorkingHoursColumns}
              rows={mainData}
              getRowId={row => row.eq_hr_id}
            />
          </div>
          <div className="export-actions">
            <Link href={route('equipment.sheets.add', sheet.equipment.eq_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-file-circle-plus' /> {translate('createSheet', userData.language)}</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ViewEquipmentSheet
