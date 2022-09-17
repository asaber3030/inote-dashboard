import './filter.scss'

import { useState } from "react"

import Layout from "@/Layouts/Layout"

import EmptyBox from '../../../assets/images/box.png'

import generateArray from "@/resources/helpers/generate-array";
import formatMoney from "@/resources/helpers/format-money"
import formatDate from "@/resources/helpers/format-date"

import { convertToCSV, exportToCsv } from "@/resources/helpers/convertToCSV"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {CONTRACTOR_TYPE, CONTRACTOR_WORKER_TYPE, MONTHS_NAMES, MONTHS_NAMES_IN_ARABIC} from "@/resources/constants"
import { ContractorMetersColumns } from "@/resources/columns/contractor-meters";
import { Link, usePage } from "@inertiajs/inertia-react"
import { Inertia } from "@inertiajs/inertia";

import { DataGrid } from "@mui/x-data-grid"

import { randomNumber } from "@/resources/helpers/randomize"
import { appendZero } from "@/resources/helpers/appendZero";
import ContractorModal from "@/Components/Modal/Modal";
import translate from "@/resources/translations/translate";

const ContractorMeters = () => {

  const { contractor, month, sts, day, data, userData } = usePage().props

  const [filterMonth, setMonth] = useState(month ?? null)
  const [filterDay, setDay] = useState(day ?? null)
  const [metersData, setMetersData] = useState(data)

  const [assignModal, setModalStatus] = useState(false)

  const handleExportAllData = () => {
    return 'j'
  }

  const submitFilter = () => {
    Inertia.get(route('contractors.meters', [contractor.con_id, filterMonth, filterDay]))
  }

  const handleMetersDataExportation = () => {
    const metersCSVArray = [
      ["Contractor", "Meter ID", "Total Meters", "Total Area", "Cost", "Date"],
      ...metersData.map((item) => [
        contractor.con_name + '#' + contractor.con_id,
        item.con_mt_id, item.meters, item.area, item.cost, item.started_at
      ])
    ]
    exportToCsv('meters_data_contractor_' + contractor.con_name + '_id-' + contractor.con_id + '_rndMET' + randomNumber() + '.csv', metersCSVArray)
  }

  return (
    <Layout>
      <ContractorModal contractor={contractor} exportFunction={handleMetersDataExportation} changeOpen={setModalStatus} openBy={assignModal} />

      <div className='layout-header'>
        <h1><FontAwesomeIcon icon="fa-solid fa-helmet-safety" /> {translate('meters', userData.language)} - <b>{contractor.con_name}#{contractor.con_id}</b></h1>
        <div className="data-actions">
          <button className='btn btn-primary' onClick={() => setModalStatus(!assignModal)}>{translate('assign', userData.language)}</button>
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

            <button onClick={submitFilter} className='btn btn-primary'>{translate('select', userData.language)}</button>

          </div>

        </div>

        <div className="choose-month">

          {userData.language == 'english' ? (
            <>
              {MONTHS_NAMES.map((i, idx) => (
                <Link
                  href={route('contractors.meters', [contractor.con_id, appendZero(idx + 1)])} value={idx + 1} key={idx}
                  className={filterMonth == appendZero(idx + 1) ? 'active month' : 'month'}
                >
                  {filterMonth == appendZero(idx + 1) && (<FontAwesomeIcon icon='fa-solid fa-check' />)}
                  {i}
                </Link>
              ))}
            </>
          ) : (
            <>
              {MONTHS_NAMES_IN_ARABIC.map((i, idx) => (
                <Link
                  href={route('contractors.meters', [contractor.con_id, appendZero(idx + 1)])} value={idx + 1} key={idx}
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

          <div className="table-container" style={{ width: '100%', height: '400px' }}>
            <DataGrid
              columns={ContractorMetersColumns}
              rows={metersData}
              getRowId={(row) => row.con_mt_id}
            />
            {metersData.length > 0 && (
              <div className="export-actions">
                <Link href={route('contractors.meters', contractor.con_id)} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-home' /> {translate('mainMetersData', userData.language)}</Link>
                <button onClick={handleMetersDataExportation} className='btn btn-secondary'><FontAwesomeIcon icon='fa-solid fa-file-export' /> {translate('export', userData.language)}</button>
              </div>
            )}
          </div>

        </div>

      </div>

    </Layout>
  )
}

export default ContractorMeters
