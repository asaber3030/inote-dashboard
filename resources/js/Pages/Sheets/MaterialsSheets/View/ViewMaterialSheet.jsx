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
import {CONTRACTOR_TYPE} from "@/resources/constants";

const ViewSheet = () => {

  const { sheet, totalMoneyWrs, totalHoursWrs, userData, totalMoneyMts, totalMeters } = usePage().props
  const mainData = JSON.parse(sheet.sheet_data)

  const [summaryStatusState, setSummary] = useState(sheet.include_summary)

  const changeSummaryStatus = (e) => {
    setSummary(e.target.checked)
  }
  const submitChangeStatus = () => {
    Inertia.post(route('material.sheets.change', sheet.sheet_id), {
      sheetID: sheet.sheet_id,
      summaryStatus: summaryStatusState
    })
  }

  const downloadData = () => {
    const csvArr = [
      ["Hour ID", "Material", "Date", "Lenght", "Width", "Height", "Taken Amount", "Material Amount", "Notes", "Cost"],
      ...mainData.map(item => [
        item.material_wr_hr_id,
        sheet.material.material_name,
        item.compute_hrs,
        item.length + 'm',
        item.width + 'm',
        item.height + 'm',
        item.taken_amount + ' Unit Volume',
        sheet.material.material_amount + ' Unit Volume',
        item.taken_notes ? item.taken_notes : 'N/A',
        item.cost + ' EGP'
      ])
    ]

    if (summaryStatusState) {
      csvArr.push(["", ""],
        ["", ""],
        ["Summary Code", sheet.sheet_code],
        ["Material ID", sheet.material.material_id],
        ["Material", sheet.material.material_name],
        ["Material Tag", sheet.material.material_tag],
        ["Material Amount", sheet.material.material_amount + ' Unit Volume'],
        ["Created In", sheet.material.created_at],
        ["Stored In", sheet.material.store.store_name],
        ["Store ID", sheet.material.store.store_id],
        ["Store URL", route('stores.materials', sheet.material.store.store_id)],
        ["Material URL", route('materials.hours', sheet.material.material_id)],
        ["Sheet Rows", mainData.length + ' rows'],
        ["Total Spent Money", totalMoneyWrs + ' EGP'],
        ["Total Working Hours", totalHoursWrs + ' hrs'])
    }

    exportToCsv(sheet.sheet_code, csvArr)
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
            <li><span>{translate('rows', userData.language)}</span> <span>{mainData.length} {translate('rows', userData.language)}</span></li>
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
              columns={MaterialWorkingHrsColumns}
              rows={mainData}
              getRowId={row => row.material_wr_hr_id}
            />
          </div>
          <div className="export-actions">
            <Link href={route('material.sheets.add', sheet.material.material_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-file-circle-plus' /> {translate('createSheet', userData.language)}</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ViewSheet
