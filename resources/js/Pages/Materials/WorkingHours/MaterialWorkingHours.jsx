import React, {useState} from "react";
import Layout from "@/Layouts/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, usePage} from "@inertiajs/inertia-react";
import {DataGrid} from "@mui/x-data-grid";
import {MaterialWorkingHrsColumns} from "@/resources/columns/material-working-hrs";
import Input from "@/Components/Input/Input";

import './working.scss'
import {Inertia} from "@inertiajs/inertia";
import InputError from "@/Components/Input/InputError";
import translate from "@/resources/translations/translate";
import {exportToCsv} from "@/resources/helpers/convertToCSV";

const MaterialWorkingHours = () => {

  const { material, data, userData } = usePage().props
  console.log(data)
  const [month, setMonth] = useState('')
  const [onlyMonth, setMonthOnly] = useState('')
  const [day, setDay] = useState(1)
  const handleMultiSearch = () => {
    let explodeMonth = month.split('-')[1]
    Inertia.visit(route('materials.hours.search', [material.material_id, 'multi', day, explodeMonth]))
  }
  const handleOnlyMonth = () => {
    let explodeMonth = onlyMonth.split('-')[1]
    Inertia.visit(route('materials.hours.search', [material.material_id, 'only', 0, explodeMonth]))
  }

  const exportData = () => {
    const csvArray = [
      ["Hour ID", "Material", "Date", "Lenght", "Width", "Height", "Taken Amount", "Material Amount", "Notes", "Cost"],
      ...data.working_hrs.map(item => [
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
        <h1><FontAwesomeIcon icon='fa-solid fa-clock' /> {translate('workingHours', userData.language)} <b>{material.material_name}</b></h1>
        <div className="data-actions">
          <Link href={route('materials.hours.add', material.material_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('addWorkingHr', userData.language)}</Link>
        </div>
      </div>
      <div className="filter-months">
        <h1>{translate('workingHours', userData.language)}</h1>
        <div className="filters">
          <div className="with-month-day">
            <div className='col-filter'>
              <Input type='month' handleChange={(e) => setMonth(e.target.value)} />
            </div>
            <div className='col-filter'>
              <select className='form-select' onChange={(e) => setDay(e.target.value)}>
                {Array.from({length: 31}, (_, i) => i + 1).map((n, index) => (
                  <option value={n} key={index}>Day: {n}</option>
                ))}
              </select>
            </div>
            <div className='has-btn'>
              <button disabled={!month ? true : false} className='btn btn-primary' onClick={handleMultiSearch}>{translate('search', userData.language)}</button>
            </div>
          </div>
          <div className="with-only-month">
            <div className='col-filter'>
              <Input type='month' handleChange={(e) => setMonthOnly(e.target.value)} />
            </div>

            <button disabled={!onlyMonth ? true : false} className='btn btn-primary' onClick={handleOnlyMonth}>{translate('search', userData.language)}</button>
          </div>
        </div>
      </div>
      <div className="listing">
        <div className="table-container" style={{ width: '100%', height: '600px' }}>
          <DataGrid
            columns={MaterialWorkingHrsColumns}
            rows={data.working_hrs}
            checkboxSelection={false}
            getRowId={(row) => row.material_wr_hr_id}
          />
        </div>
        <button className='btn btn-secondary' onClick={exportData}><FontAwesomeIcon icon='fa-solid fa-file-export' /> {translate('export', userData.language)}</button>
      </div>
    </Layout>
  )
}

export default MaterialWorkingHours
