import './filter.scss'

import { useState } from "react"

import Layout from "@/Layouts/Layout"

import EmptyBox from '../../../assets/images/box.png'

import generateArray from "@/resources/helpers/generate-array";
import formatMoney from "@/resources/helpers/format-money"
import formatDate from "@/resources/helpers/format-date"

import { convertToCSV, exportToCsv } from "@/resources/helpers/convertToCSV"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { CONTRACTOR_TYPE, CONTRACTOR_WORKER_TYPE, MONTHS_NAMES, MONTHS_NAMES_IN_ARABIC } from "@/resources/constants"
import { ContractorWorkersColumns, ContractorWorkersColumnsFilters } from "@/resources/columns/contractor-workers"
import { Link, usePage } from "@inertiajs/inertia-react"
import { Inertia } from "@inertiajs/inertia";

import { DataGrid } from "@mui/x-data-grid"

import { randomNumber } from "@/resources/helpers/randomize"
import { appendZero } from "@/resources/helpers/appendZero";
import translate from "@/resources/translations/translate";

const FilterData = () => {

  const { contractor, month, sts, day, data, userData } = usePage().props

  const [filterMonth, setMonth] = useState(month ?? null)
  const [filterDay, setDay] = useState(day ?? null)
  const [workersData, setWorkersData] = useState(data)

  const submitFilter = () => {
    Inertia.get(route('contractors.filter', [contractor.con_id, filterMonth, filterDay]))
  }

  const handleExportAll = () => {
    const csvData = [
      [
        "Contractor ID", "Contractor Name", "Contractor Type", "Contractor Phone",
        "Worker ID", "Worker Name", "Worker Phone", "Worker Type",
        "Started From", "Ended At", "Total Hours", "Total Cost"
      ],
      ...workersData.map(item => [
        contractor.con_id, contractor.con_name, CONTRACTOR_TYPE[contractor.con_type], contractor.con_phone,
        item.con_wr_id, item.con_wr_name, item.con_wr_phone, CONTRACTOR_WORKER_TYPE[item.con_wr_type],
        item.started_at, item.ended_at, item.compute_hrs, item.cost
      ]),
    ]
    exportToCsv( 'workers_data_contractor_' + contractor.con_name.toLowerCase() + '.csv', csvData)
  }

  return (
    <Layout>

      <div className='layout-header'>
        <h1><FontAwesomeIcon icon="fa-solid fa-helmet-safety" /> {translate('contractor', userData.language)} - {contractor.con_name}</h1>
        <div className="data-actions">
          <Link href={route('contractors.workers.add', contractor.con_id)} className='btn btn-primary'>{translate('assign', userData.language)}</Link>
        </div>
      </div>

      <div className="contractor-data-filter">
        <div className="filter-select-container" style={{ marginTop: '10px' }}>
          <div className="filter">
            <div className="selectbox">
              <select name="" id="" className='form-select' onChange={(e) => setMonth(e.target.value)}>
                <option value=''>{translate('chooseMonth', userData.language)}</option>
                {MONTHS_NAMES.map((i, idx) => (
                  <option selected={month == idx + 1 ? true : false} value={appendZero(idx + 1)} key={idx}>{i}</option>
                ))}
              </select>
            </div>
            <div className="days">
              <select className='form-select' onChange={(e) => setDay(e.target.value)}>
                <option value=''>{translate('chooseDay', userData.language)}</option>
                {generateArray(31).map((i, idx) => (
                  <option selected={day == i ? true : false} value={appendZero(idx + 1)} key={idx}>{i}</option>
                ))}
              </select>
            </div>
            <div className="worker_type">
              <select onChange={(e) => setWorkersData(data.filter(item => item.con_wr_type == e.target.value))} className='form-select'>
                <option value=''>----------</option>
                <option value='0'>{translate('worker', userData.language)}</option>
                <option value='1'>{translate('technician', userData.language)}</option>
              </select>
            </div>
            <button onClick={submitFilter} className='btn btn-primary'>{translate('select', userData.language)}</button>
          </div>
        </div>
        <div className="choose-month">

          {userData.language == 'arabic' ? (
            <>
              {MONTHS_NAMES_IN_ARABIC.map((i, idx) => (
                <Link
                  href={route('contractors.filter', [contractor.con_id, appendZero(idx + 1)])} value={idx + 1} key={idx}
                  className={filterMonth == appendZero(idx + 1) ? 'active month' : 'month'}
                >
                  {filterMonth == appendZero(idx + 1) && (<FontAwesomeIcon icon='fa-solid fa-check' />)}
                  {i}
                </Link>
              ))}
            </>
          ) : (
            <>
              {MONTHS_NAMES.map((i, idx) => (
                <Link
                  href={route('contractors.filter', [contractor.con_id, appendZero(idx + 1)])} value={idx + 1} key={idx}
                  className={filterMonth == appendZero(idx + 1) ? 'active month' : 'month'}
                >
                  {filterMonth == appendZero(idx + 1) && (<FontAwesomeIcon icon='fa-solid fa-check' />)}
                  {i}
                </Link>
              ))}
            </>
          )}
        </div>

        <div className="display-data">
          <div className="table-container" style={{ width: '100%', height: '500px' }}>
            {workersData.length > 0 ? (
              <>
                <DataGrid
                  columns={ContractorWorkersColumns}
                  rows={workersData}
                  getRowId={(row) => row.con_wr_id}
                />
                <div className="export-actions">
                  <button onClick={handleExportAll} className='btn btn-secondary' style={{ marginLeft: '5px' }}><FontAwesomeIcon icon='fa-solid fa-file-export' /> {translate('export', userData.language)}</button>
                </div>
              </>
            ) : (
              <div className="no-data-grid">
                <img src={EmptyBox} alt="Empty Data" />
                <h1>No Rows</h1>
              </div>
            )}
          </div>
        </div>

      </div>

    </Layout>
  )
}

export default FilterData
