import './view-contractor.scss'

import Layout from "@/Layouts/Layout"

import formatMoney from "@/resources/helpers/format-money";
import formatDate from "@/resources/helpers/format-date";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {CONTRACTOR_TYPE, CONTRACTOR_WORKER_TYPE} from "@/resources/constants"
import { ContractorWorkersColumns } from "@/resources/columns/contractor-workers";

import { Link, usePage } from "@inertiajs/inertia-react"
import { DataGrid } from "@mui/x-data-grid";
import csvDate from "@/resources/helpers/csvDate";
import {convertToCSV} from "@/resources/helpers/convertToCSV";
import {useState} from "react";
import ContractorModal from "@/Components/Modal/Modal";
import translate from "@/resources/translations/translate";
import dateLanguage from "@/resources/helpers/dateLanguage";

const ViewContractor = () => {
  const [assignModal, setModalStatus] = useState(false)

  const {
    contractor, totalSpentMoney, avgSpentMoneyOnDay, avgSpentMoneyOnMonth, countMonths,
    countWorkers, countTechs, avgWorkingHours, userData
  } = usePage().props

  const handleExportAll = () => {
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
      ])
    ]
    convertToCSV('', csvData)
  }

  return (
    <Layout>
      <ContractorModal contractor={contractor} exportFunction={handleExportAll} changeOpen={setModalStatus} openBy={assignModal} />
      <div className='layout-header'>
        <h1><FontAwesomeIcon icon="fa-solid fa-helmet-safety" /> {translate('contractor', userData.language)} <b>#{contractor.con_id} - {contractor.con_name}</b></h1>
        <div className="data-actions">
          <button className='btn btn-primary' onClick={() => setModalStatus(!assignModal)}>{translate('assign', userData.language)}</button>
          {contractor.con_type == 1 && (
            <Link className='btn btn-secondary' href={route('contractors.meters', contractor.con_id)}>{translate('meters', userData.language)}</Link>
          )}
          {contractor.con_type == 2 && (
            <Link className='btn btn-secondary' href={route('contractors.equipments', contractor.con_id)}>{translate('equipments', userData.language)}</Link>
          )}
        </div>
      </div>

      <div className="contractor-information">

        <div className="top-data">
          <div className="left-items items-information">
            <h1 className='info-heading'><FontAwesomeIcon style={{ margin: '0 5px' }} icon='fa-solid fa-id-card' /> {translate('contractorInformation', userData.language)}</h1>
            <ul className='list-ul'>
              <li><span>{translate('id', userData.language)}</span> <span>#{contractor.con_id}</span></li>
              <li><span>{translate('name', userData.language)}</span> <span>{contractor.con_name}</span></li>
              <li><span>{translate('phone', userData.language)}</span> <span>{contractor.con_phone}</span></li>
              <li><span>{translate('type', userData.language)}</span> <span>{CONTRACTOR_TYPE[contractor.con_type]}</span></li>
              <li><span>{translate('lastUpdate', userData.language)}</span> <span>{dateLanguage(contractor.updated_at, userData.language)}</span></li>
              <li><span>{translate('joinedIn', userData.language)}</span> <span>{dateLanguage(contractor.created_at, userData.language)}</span></li>
            </ul>
          </div>
          <div className="center-items items-information">
            <h1 className='info-heading'><FontAwesomeIcon style={{ margin: '0 5px' }} icon='fa-solid fa-dollar-sign' /> {translate('takenMoney', userData.language)}</h1>
            <ul className='list-ul'>
              <li><span>{translate('takenMoney', userData.language)}</span> <span className='text-success'>{formatMoney(totalSpentMoney)}</span></li>
              <li><span>{translate('avgMoneyInMonth', userData.language)}</span> <span className='text-success'>{formatMoney(Math.round(avgSpentMoneyOnDay / 31))}</span></li>
              <li><span>{translate('avgMoneyInDay', userData.language)}</span> <span className='text-success'>{avgSpentMoneyOnMonth > 0 ? formatMoney(Math.round(avgSpentMoneyOnMonth / countMonths)) : 'EGP 0.00' }</span></li>
            </ul>
          </div>
          <div className="right-items items-information">
            <h1 className='info-heading'><FontAwesomeIcon style={{ margin: '0 5px' }} icon='fa-solid fa-id-card' /> {translate('contractorWorkersInfo', userData.language)}</h1>
            <ul className='list-ul'>
              <li><span>{translate('workers', userData.language)}</span> <span className='text-secondary'>{countWorkers} {translate('from', userData.language)} {translate('workers', userData.language)}</span></li>
              <li><span>{translate('technicians', userData.language)}</span> <span className='text-secondary'>{countTechs} {translate('from', userData.language)} {translate('technicians', userData.language)}</span></li>
              <li><span>{translate('avgWorkingHrs', userData.language)} / {translate('workers', userData.language)}</span> <span className='text-secondary'>{`${(avgWorkingHours / (countWorkers + countTechs)).toFixed(2)}`} {translate('hour', userData.language)}</span></li>
            </ul>
          </div>
        </div>

        <div className="list-all-data">
          <h1>
            <span>
              <FontAwesomeIcon icon="fa-solid fa-person-digging" style={{ margin: '0 5px' }} /> {translate('allWorkersTitle', userData.language)}
            </span>
            <Link href={route('contractors.filter', contractor.con_id)} className='btn btn-primary'><FontAwesomeIcon icon="fa-solid fa-filter" /> {translate('filter', userData.language)}</Link>

          </h1>
          <div className="table-container" style={{ width: '100%', height: '450px' }}>
            <DataGrid
              rows={contractor.workers}
              columns={ContractorWorkersColumns}
              checkboxSelection={false}
              getRowId={(row) => row.con_wr_id}
            />
          </div>

          <div className="actions-datagrid">
            <button onClick={handleExportAll} className='btn btn-secondary'><FontAwesomeIcon icon='fa-solid fa-file-export' style={{ margin: '0 5px' }} /> {translate('export', userData.language)}</button>
            <Link href={route('contractors.workers', contractor.con_id)} className='btn btn-secondary'><FontAwesomeIcon style={{ margin: '0 5px' }} icon='fa-solid fa-truck' /> {translate('workers', userData.language)}</Link>
            <Link href={route('contractors.workers', contractor.con_id)} className='btn btn-secondary'><FontAwesomeIcon style={{ margin: '0 5px' }} icon='fa-solid fa-helmet-safety' /> {translate('technicians', userData.language)}</Link>
          </div>
        </div>

      </div>

    </Layout>
  );
}

export default ViewContractor
