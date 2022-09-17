import './workers.scss'

import Layout from "@/Layouts/Layout"

import formatMoney from "@/resources/helpers/format-money";
import formatDate from "@/resources/helpers/format-date";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CONTRACTOR_TYPE, CONTRACTOR_WORKER_TYPE } from "@/resources/constants"
import { ContractorWorkersColumns } from "@/resources/columns/contractor-workers";

import { Link, usePage } from "@inertiajs/inertia-react"
import { DataGrid } from "@mui/x-data-grid";
import {convertToCSV, exportToCsv} from "@/resources/helpers/convertToCSV";
import {useState} from "react";
import {randomNumber} from "@/resources/helpers/randomize";
import ContractorModal from "@/Components/Modal/Modal";
import translate from "@/resources/translations/translate";

const Technicians = () => {

  const {
    contractor, totalSpentMoney, avgSpentMoneyOnDay, avgSpentMoneyOnMonth, countMonths,
    countWorkers, countTechs, avgWorkingHours, unid,
    userData
  } = usePage().props

  const findWorkers = (value) => value.con_wr_type === 0
  const findTechs = (value) => value.con_wr_type === 1

  const contractorWorkersOnly = contractor.workers.filter(findWorkers)
  const contractorTechsOnly = contractor.workers.filter(findTechs)


  const [csvDataResource, setCSVData] = useState(contractorWorkersOnly)
  const [selectedData, setSelectedData] = useState({
    workers: false,
    techs: true
  })
  const [assignModal, setModalStatus] = useState(false)

  const handleDataChange = () => {
    setSelectedData({ workers: !selectedData.workers, techs: !selectedData.techs })
    setCSVData(selectedData.workers == false ? contractorWorkersOnly : contractorTechsOnly)

  }

  const handleExportAll = () => {
    const csvData = [
      [
        "Contractor ID", "Contractor Name", "Contractor Type", "Contractor Phone",
        "Worker ID", "Worker Name", "Worker Phone", "Worker Type",
        "Started From", "Ended At", "Total Hours", "Total Cost"
      ],
      ...csvDataResource.map(item => [
        contractor.con_id, contractor.con_name, CONTRACTOR_TYPE[contractor.con_type], contractor.con_phone,
        item.con_wr_id, item.con_wr_name, item.con_wr_phone, CONTRACTOR_WORKER_TYPE[item.con_wr_type],
        item.started_at, item.ended_at, item.compute_hrs, item.cost
      ]),
    ]
    exportToCsv(!selectedData.workers ? unid + '_workers_ID' + contractor.con_id + '_' + contractor.con_name + Math.floor(Math.random() * 1000000) + '_techs-summary.csv' : unid + 'techs_ID' + contractor.con_id + '_' + contractor.con_name + Math.floor(Math.random() * 1000000) + '_techs-summary.csv' , csvData)
  }

  const handleExportAllData = () => {
    const csvData = [
      [
        "Contractor ID", "Contractor Name", "Contractor Type", "Contractor Phone",
        "Worker ID", "Worker Name", "Worker Phone", "Worker Type",
        "Started From", "Ended At", "Total Hours", "Total Cost"
      ],
      ...contractor.workers.map(item => [
        contractor.con_id, contractor.con_name, CONTRACTOR_TYPE[contractor.con_type], contractor.con_phone,
        item.con_wr_id, item.con_wr_name, item.con_wr_phone, CONTRACTOR_WORKER_TYPE[item.con_wr_type],
        item.started_at, item.ended_at, item.compute_hrs, item.cost
      ]),
    ]
    exportToCsv(unid + '_contractor_id_' + contractor.con_id + '_' + randomNumber() + 'all-data.csv', csvData)
  }

  const handlePrintSummary = () => {
    const csvSummaryData = [
      ['Name', contractor.con_name],
      ['Identifier', '#' + contractor.con_id],
      ['Phone Number', contractor.con_phone],
      ['Type', CONTRACTOR_TYPE[contractor.con_type]],
      ['Created At', contractor.created_at],
      ['Last Updated At', contractor.updated_at],
      ['Total Workers', countWorkers + ' Worker'],
      ['Total Techinicans', countTechs + ' Techinicans'],
      ['Total Spent Money', totalSpentMoney + ' EGP'],
      ['Average Working Hours', avgWorkingHours + ' hrs'],
    ];
    exportToCsv(unid + '_contractor_' + contractor.con_name + '_id_' + contractor.con_id + '_working_summary.csv', csvSummaryData)
  }

  return (
    <Layout>

      <div className='layout-header'>
        <h1><FontAwesomeIcon icon="fa-solid fa-helmet-safety" /> {selectedData.workers ? translate('workers', userData.language) : translate('technicians', userData.language)} / {translate('contractor', userData.language)} <b>#{contractor.con_id} - {contractor.con_name}</b></h1>
        <div className="data-actions">
          <button className='btn btn-primary' onClick={() => setModalStatus(!assignModal)}>{translate('assign', userData.language)}</button>
        </div>
      </div>

      <div className="contractor-information">

        <div className="list-all-data">
          <h1>
            <span>
              <FontAwesomeIcon icon="fa-solid fa-person-digging" style={{ margin: '0 10px' }} />
              {selectedData.workers ? translate('workers', userData.language) : translate('technicians', userData.language)}
            </span>
            <button onClick={handleDataChange} className='btn btn-primary'><FontAwesomeIcon icon="fa-solid fa-sync" /> {translate('select', userData.language)} {selectedData.workers ? translate('technicians', userData.language) : translate('workers', userData.language)}</button>
          </h1>

          <div className="table-container" style={{ width: '100%', height: '600px' }}>
            <DataGrid
              rows={selectedData.techs ? contractorTechsOnly : contractorWorkersOnly}
              columns={ContractorWorkersColumns}
              checkboxSelection={false}
              getRowId={(row) => row.con_wr_id}
            />
          </div>

          {contractorWorkersOnly.length > 0 || contractorTechsOnly.length > 0 ? (
            <div className="actions-datagrid">
              <button onClick={handleExportAll} className='btn btn-secondary'><FontAwesomeIcon icon='fa-solid fa-file-export' /> {translate('export', userData.language)}</button>
              <button onClick={handlePrintSummary} className='btn btn-info'><FontAwesomeIcon icon='fa-solid fa-print' /> {translate('summary', userData.language)}</button>
            </div>
          ) : ''}
        </div>

      </div>

      <ContractorModal contractor={contractor} exportFunction={handleExportAllData} changeOpen={setModalStatus} openBy={assignModal} />

    </Layout>
  );
}

export default Technicians
