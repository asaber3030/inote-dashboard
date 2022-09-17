import Layout from "@/Layouts/Layout";
import Input from "@/Components/Input/Input";

import '../../style.scss'

import React, { useEffect, useState } from "react";
import {usePage, Link, useForm} from "@inertiajs/inertia-react";
import {CONTRACTOR_SHEETS_TYPES_ARR, MONTHS_NAMES} from "@/resources/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import translate from "@/resources/translations/translate";
import formatDate from "@/resources/helpers/format-date";

import EmptyBox from "@/assets/images/box.png";
import Label from "@/Components/Input/Label";
import {appendZero} from "@/resources/helpers/appendZero";
import {DataGrid} from "@mui/x-data-grid";
import {MaterialWorkingHrsColumns} from "@/resources/columns/material-working-hrs";
import generateArray from "@/resources/helpers/generate-array";
import {Inertia} from "@inertiajs/inertia";

const AddSheet = () => {
  const { userData, material_working_hrs, sheet_code, material } = usePage().props

  const [filterType, setFilterType] = useState('today')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')

  const [openData, setOpenData] = useState(false)

  const [apiData, setAPIData] = useState([])

  const [tabs, setActiveTab] = useState({
    today: true,
    month: false,
    day: false,
    both: false
  })

  const [includeSummary, setSummary] = useState(0)

  useEffect(() => {
    if (filterType == 'today') {
      axios.get(route('material.sheet.today', material.material_id)).then(res => setAPIData(res.data.data))
    }

    if (filterType == 'month') {
      axios.get(route('material.sheet.month', [material.material_id, month])).then(res => setAPIData(res.data.data))
    }

    if (filterType == 'day') {
      axios.get(route('material.sheet.day', [material.material_id, day])).then(res => setAPIData(res.data.data))
    }

    if (filterType == 'both') {
      axios.get(route('material.sheet.both', [material.material_id, month, day])).then(res => setAPIData(res.data.data))
    }

  }, [filterType, month, day]);

  const createSheet = () => {
    Inertia.post(route('material.sheets.add', material.material_id), {
      filterType: filterType,
      month: month,
      day: day,
      includeSummary: includeSummary
    })
  }

  return (
    <Layout>

      <div className="layout-header">
        <h1>{translate('createSheet', userData.language)} {translate('forMaterial', userData.language)} <b>{material.material_name}</b></h1>
      </div>

      {material_working_hrs.length > 0 ? (

        <div className="add-custom-sheet">

          <div className="left-filter">
            <ul>
              <li className={tabs.today ? 'active' : ''} onClick={() => {
                setFilterType('today')
                setActiveTab({ today: true, day: false, month: false, both: false })
              }} >{translate('todaySheet', userData.language)}</li>

              <li className={tabs.month ? 'active' : ''} onClick={() => {
                setFilterType('month')
                setActiveTab({ today: false, day: false, month: true, both: false })
              }}>{translate('monthSheet', userData.language)}</li>

              <li className={tabs.day ? 'active' : ''} onClick={() => {
                setFilterType('day')
                setActiveTab({ today: false, day: true, month: false, both: false })
              }}>{translate('daySheet', userData.language)}</li>

              <li className={tabs.both ? 'active' : ''} onClick={() => {
                setFilterType('both')
                setActiveTab({ today: false, day: false, month: false, both: true })
              }}>{translate('bothSheet', userData.language)}</li>
            </ul>
          </div>

          <div className="display-data">

            <h1>{translate('createSheet', userData.language)} - {translate('materials', userData.language)}</h1>

            <div className="form-container">
              <div className="form-group">
                <Label value={translate('material', userData.language)} />
                <Input value={material.material_name + ' #' + material.material_id} disabled={true} />
              </div>

              <div className="form-group">
                <Label value={translate('tag', userData.language)} />
                <Input value={sheet_code} disabled={true} />
              </div>

              <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Label value={translate('summary', userData.language)} />
                <label className="switch">
                  <input type="checkbox" onChange={ e => setSummary(e.target.checked) } />
                  <span className="slider round"></span>
                </label>
              </div>

            </div>

            <div className="tabs-content">

              {/* Today Data */}
              {tabs.today && (
                <div className="tab-content">
                  <h1>{translate('todaySheet', userData.language)} - {material.material_name}</h1>
                  <p>{translate('generatedMtSheetParagraphToday', userData.language)}</p>
                </div>
              )}

              {tabs.month && (
                <div className="tab-content">
                  <h1>{translate('monthSheet', userData.language)} - {material.material_name}</h1>
                  <p>{translate('generatedMtSheetParagraphMonth', userData.language)}</p>
                  <div className="form-group">
                    <Label value={translate('month', userData.language)} />
                    <select name="" id="" className='form-select' onChange={(e) => setMonth(e.target.value)}>
                      <option value=''>Choose Month to Filter</option>
                      {MONTHS_NAMES.map((i, idx) => (
                        <option selected={month == idx + 1 ? true : false} value={appendZero(idx + 1)} key={idx}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {tabs.day && (
                <div className="tab-content">
                  <h1>{translate('daySheet', userData.language)} - {material.material_name}</h1>
                  <p>{translate('generatedMtSheetParagraphDay', userData.language)}</p>
                  <div className="form-group">
                    <Label value={translate('day', userData.language)} />
                    <select className='form-select' onChange={(e) => setDay(e.target.value)}>
                      {generateArray(31).map((n, index) => (
                        <option value={n} key={index}>Day: {n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {tabs.both && (
                <div className="tab-content">
                  <h1>{translate('bothSheet', userData.language)} - {material.material_name}</h1>
                  <p>{translate('generatedMtSheetParagraphBoth', userData.language)}</p>
                  <div className="form-group">
                    <Label value={translate('month', userData.language)} />
                    <select name="" id="" className='form-select' onChange={(e) => setMonth(e.target.value)}>
                      <option value=''>Choose Month to Filter</option>
                      {MONTHS_NAMES.map((i, idx) => (
                        <option selected={month == idx + 1 ? true : false} value={appendZero(idx + 1)} key={idx}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <Label value={translate('day', userData.language)} />
                    <select className='form-select' onChange={(e) => setDay(e.target.value)}>
                      {generateArray(31).map((n, index) => (
                        <option value={n} key={index}>Day: {n}</option>
                      ))}
                    </select>
                  </div>

                </div>
              )}

              <div className="open-data">
                <button onClick={ () => setOpenData(!openData)} className='show-data btn btn-secondary'>{translate('showDataBtn', userData.language)}</button>
              </div>

              {openData && (
                <div className="table-container" style={{ width: '100%', height: '500px' }}>
                  <DataGrid columns={MaterialWorkingHrsColumns} rows={apiData} getRowId={ row => row.material_wr_hr_id } />
                </div>
              )}

              {apiData.length > 0 ? (
                <div className="create-sheet-btn-container">
                  <button onClick={createSheet} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-file-add' /> {translate('create', userData.language)}</button>
                </div>
              ) : (
                <div className="alert alert-warning">{translate('noData', userData.language)}</div>
              )}

            </div>

          </div>

        </div>
      ): (
        <div className="no-data-all alert alert-warning" style={{ marginTop: '10px' }}>
          {translate('noData', userData.language)}
        </div>
      )}


    </Layout>
  )

}

export default AddSheet
