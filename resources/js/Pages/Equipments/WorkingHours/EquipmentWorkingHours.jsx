import './working.scss'

import React, { useState } from "react";
import Layout from "@/Layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage } from "@inertiajs/inertia-react";
import {DataGrid} from "@mui/x-data-grid";
import Input from "@/Components/Input/Input";

import translate from "@/resources/translations/translate";

import {Inertia} from "@inertiajs/inertia";

import InputError from "@/Components/Input/InputError";
import generateArray from "@/resources/helpers/generate-array";

import { EquipmentsWorkingHoursColumns } from "@/resources/columns/equipments-working-hours";

const EquipmentWorkingHours = () => {

  const { equipment, data, userData } = usePage().props

  const [month, setMonth] = useState('')
  const [onlyMonth, setMonthOnly] = useState('')
  const [day, setDay] = useState(1)

  console.log(data)

  const handleMultiSearch = () => {
    let explodeMonth = month.split('-')[1]
    Inertia.visit(route('equipments.hours.search', [equipment.eq_id, 'multi', day, explodeMonth]))
  }
  const handleOnlyMonth = () => {
    let explodeMonth = onlyMonth.split('-')[1]
    Inertia.visit(route('equipments.hours.search', [equipment.eq_id, 'only', 0, explodeMonth]))
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1><FontAwesomeIcon icon='fa-solid fa-clock' /> {translate('workingHours', userData.language)} {translate('forEquipment', userData.language)} <b>{equipment.eq_name}</b></h1>
        <div className="data-actions">
          <Link href={route('equipments.hours.add', equipment.eq_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('addWorkingHr', userData.language)}</Link>
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
                {generateArray(31).map((n, index) => (
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
            columns={EquipmentsWorkingHoursColumns}
            rows={data.working_hrs}
            checkboxSelection={false}
            getRowId={(row) => row.eq_hr_id}
          />
        </div>
      </div>
    </Layout>
  )
}

export default EquipmentWorkingHours
