import React, {useState} from "react";
import Layout from "@/Layouts/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, usePage} from "@inertiajs/inertia-react";
import {DataGrid} from "@mui/x-data-grid";
import {MaterialWorkingHrsColumns} from "@/resources/columns/material-working-hrs";
import Input from "@/Components/Input/Input";

import { Inertia } from "@inertiajs/inertia";
import {MONTHS_NAMES} from "@/resources/constants";

import './searching.scss'
import formatDate from "@/resources/helpers/format-date";
import {convertToCSV, exportToCsv} from "@/resources/helpers/convertToCSV";
import translate from "@/resources/translations/translate";

const SearchableHours = () => {

  let { material, month, day, data, filter, userData } = usePage().props
  month = parseInt(month.replace(/^0+/, '')) - 1

  const exportData = () => {
    const csvArray = [
      ["Hour ID", "Material", "Date", "Lenght", "Width", "Height", "Taken Amount", "Material Amount", "Notes", "Cost"],
      ...data.map(item => [
        item.material_wr_hr_id,
        material.material_name,
        item.compute_hrs,
        item.length,
        item.width,
        item.height,
        item.taken_amount,
        material.material_amount,
        item.taken_notes,
        item.cost
      ])
    ];
    exportToCsv('material_working_data_' + material.material_name + '.csv', csvArray)
  }
  return (
    <Layout>
      <div className="layout-header">
        {filter == 'multi' ? (
          <h1 style={{ fontSize: '20px' }}><FontAwesomeIcon icon='fa-solid fa-clock' /> {translate('workingHours', userData.language)} <b>{material.material_name}</b> - at <b>Day, {day} {month != 0 && ' - Month: ' + MONTHS_NAMES[month]}</b></h1>
        ) : (
          <h1 style={{ fontSize: '20px' }}><FontAwesomeIcon icon='fa-solid fa-clock' /> {translate('workingHours', userData.language)} <b>{material.material_name}</b> <b>{month != 0 && ' - Month: ' + MONTHS_NAMES[month]}</b></h1>
        )}
        <div className="data-actions">
          <Link href={route('materials.hours.add', material.material_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('addWorkingHr', userData.language)}</Link>
        </div>
      </div>

      <div className="listing">
        {data.length > 0 ? (
          <div className="table-container" style={{ width: '100%', height: '600px' }}>
            <DataGrid
              columns={MaterialWorkingHrsColumns}
              rows={data}
              checkboxSelection={false}
              getRowId={(row) => row.material_wr_hr_id}
            />
            <button style={{ marginTop: '10px', float: 'right' }} onClick={exportData} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-file-export' /> {translate('export', userData.language)}</button>
          </div>
        ) : (
          <>
            <div className="no-data">
              No Data Available
            </div>
            <div className="info">
              <span>Month: {MONTHS_NAMES[month]}</span>
              {day != 0 && <span>Day: {day}</span>}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default SearchableHours
