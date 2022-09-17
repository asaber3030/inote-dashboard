import './add-sheet.scss'
import Layout from "@/Layouts/Layout"
import Label from "@/Components/Input/Label"
import {Link, useForm, usePage} from "@inertiajs/inertia-react"
import { ContractorWorkersColumns } from "@/resources/columns/contractor-workers"
import { DataGrid } from "@mui/x-data-grid"
import { Inertia } from "@inertiajs/inertia"
import {useEffect, useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  CONTRACTOR_SHEETS_TYPES_ARR,
  CONTRACTOR_SHEETS_TYPES,
  MONTHS_NAMES,
  CONTRACTOR_TYPE
} from "@/resources/constants";

import { EquipmentsWorkingHoursColumns } from "@/resources/columns/equipments-working-hours";
import { ContractorMetersColumns } from "@/resources/columns/contractor-meters";
import Input from "@/Components/Input/Input";
import formatDate from "@/resources/helpers/format-date";
import { currentDate } from "@/resources/helpers/currentDate";
import { appendZero } from "@/resources/helpers/appendZero";
import generateArray from "@/resources/helpers/generate-array";

import axios from "axios";
import b from "../../../../../../public/build/assets/Dashboard.c2bdf138";
import translate from "@/resources/translations/translate";
import dateLanguage from "@/resources/helpers/dateLanguage";

const AddSheet = () => {

  const { workers, technicians, userData, sheets, sheetCode, contractors, meters, equipments } = usePage().props

  const [activeStep, setActiveStep] = useState({
    's1': true,
    's2': false,
    's3': false,
    's4': false,
  })

  const [filterTabs, setTabStatus] = useState({
    today: true,
    month: false,
    day: false,
    both: false,
    selection: false
  })

  const [activateData, setDataActivation] = useState(false)

  const [filterType, setFilterType] = useState('today')

  const [filterMonthInput, setFilterMonth] = useState('')
  const [filterDayInput, setFilterDay] = useState('')

  const [includeSummary, setIncludeSummary] = useState(false)

  const [isStep3Done, setStep3Status] = useState(false)
  const [isStep4Done, setStep4Status] = useState(false)

  const [sheetType, setSheetType] = useState(CONTRACTOR_SHEETS_TYPES_ARR[0])

  const [conID, setConID] = useState('')
  const [selectedContractor, setContractor] = useState([])

  const [selectedContractorWorkers, setContractorWorkers] = useState([])
  const [selectedContractorTechnicians, setContractorTechnicians] = useState([])
  const [selectedContractorMeters, setContractorMeters] = useState([])
  const [selectedContractorEquipments, setContractorEquipments] = useState([])

  const [todayData, setTodayData] = useState([])

  const [monthData, setMonthData] = useState([])

  const [dayData, setDayData] = useState([])

  const [bothData, setBothData] = useState([])

  // Select Data Depending on filter selection
  const getTodaysData = () => {
    let selectWhat = '';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.workers) selectWhat = 'worker';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.techs) selectWhat = 'tech';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.meters) selectWhat = 'meter';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.equipments) selectWhat = 'equipment';
    axios.get(
      route('con.sheet.today', [selectedContractor.con_id, selectWhat])
    ).then(res => {
      setTodayData(res.data.data)
      console.log(todayData)
    })
    setDataActivation(!activateData)
  }

  const getMonthData = () => {
    let selectWhat = '';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.workers) selectWhat = 'worker';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.techs) selectWhat = 'tech';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.meters) selectWhat = 'meter';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.equipments) selectWhat = 'equipment';
    axios.get(
      route('con.sheet.month', [selectedContractor.con_id, selectWhat, filterMonthInput])
    ).then(res => {
      setMonthData(res.data.data)
      console.log(monthData)
    })
    setDataActivation(!activateData)
  }

  const getDayData = () => {
    let selectWhat = '';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.workers) selectWhat = 'worker';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.techs) selectWhat = 'tech';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.meters) selectWhat = 'meter';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.equipments) selectWhat = 'equipment';
    axios.get(
      route('con.sheet.day', [selectedContractor.con_id, selectWhat, filterDayInput])
    ).then(res => {
      setDayData(res.data.data)
      console.log(dayData)
    })
    setDataActivation(!activateData)
  }

  const getBothData = () => {
    let selectWhat = '';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.workers) selectWhat = 'worker';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.techs) selectWhat = 'tech';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.meters) selectWhat = 'meter';
    if (sheetType == CONTRACTOR_SHEETS_TYPES.equipments) selectWhat = 'equipment';
    axios.get(
      route('con.sheet.both', [selectedContractor.con_id, selectWhat, filterDayInput, filterMonthInput])
    ).then(res => {
      setBothData(res.data.data)
      console.log(bothData)
    })
    setDataActivation(!activateData)
  }

  const [activeSheetType, setActiveSheet] = useState({
    workers: true,
    techs: false,
    equipments: false,
    meters: false
  })

  const handleMonthFilter = (e) => {
    setFilterMonth(e.target.value)
  }

  const submit = (data) => {
    Inertia.post(route('contractor.sheets.add'), data)
  }

  const nextStep1 = () => {
    setActiveStep({ s1: false, s2: true, s3: false, s4: false })
  }

  const nextStep2 = () => {
    if (conID != '') {
      setActiveStep({ s1: false, s2: false, s3: true, s4: false })
      setContractor(contractors.find((item) => item.con_id == conID))
      setStep3Status(true)

      setContractorWorkers(workers.filter(wr => wr.belongs_to_con == selectedContractor.con_id))
      setContractorTechnicians(technicians.filter(tech => tech.belongs_to_con == selectedContractor.con_id))
      setContractorMeters(meters.filter(meter => meter.belongs_to_con == selectedContractor.con_id))
      setContractorEquipments(equipments.filter(eq => eq.contractor == selectedContractor.con_id))
    }
  }

  const nextStep3 = () => {
    setActiveStep({ s1: false, s2: false, s3: false, s4: true })
    setStep4Status(true)
  }

  console.log(filterMonthInput)

  const finalStepSubmit = () => {

    submit({
      sheetType: sheetType,
      filterType: filterType,
      contractor: selectedContractor.con_id,
      filterDay: filterDayInput,
      filterMonth: filterMonthInput,
      includeSummary: includeSummary
    })

  }

  return (
    <Layout>

      <div className="layout-header">
        <h1>{translate('createSheet', userData.language)}</h1>
      </div>

      <div className="create-sheet">

        <div className="left-steps">
          <ul>
            <li className={activeStep.s1 && 'active'} onClick={() => setActiveStep({
              s1: true,
              s2: false,
              s3: false,
              s4: false
            })}>
              <FontAwesomeIcon icon='fa-solid fa-home' />
              <span>{translate('createSheetStep1', userData.language)}</span>
            </li>

            <li className={activeStep.s2 && 'active'} onClick={() => setActiveStep({
              s1: false,
              s2: true,
              s3: false,
              s4: false
            })}>
              <FontAwesomeIcon icon='fa-solid fa-file' />
              <span>{translate('createSheetStep2', userData.language)}</span>
            </li>

            <li className={activeStep.s3 && isStep3Done && 'active'} onClick={() => setActiveStep({
              s1: false,
              s2: isStep3Done == false ? true : false,
              s3: isStep3Done ? true && selectedContractor : false,
              s4: false
            })}>
              <FontAwesomeIcon icon='fa-solid fa-cog' />
              <span>{translate('createSheetStep3', userData.language)}</span>
            </li>

            <li className={activeStep.s4 && isStep4Done && isStep3Done && 'active'} onClick={() => setActiveStep({
              s1: false,
              s2: isStep4Done === false ? true : false,
              s3: isStep4Done && isStep3Done && activeStep.s2 ? false : true,
              s4: true
            })}>
              <FontAwesomeIcon icon='fa-solid fa-plus' />
              <span>{translate('createSheetStep4', userData.language)}</span>
            </li>
          </ul>
        </div>

        <div className="right-steps">

          <div className="step-1 choose-sheet-type" style={{ display: activeStep.s1 ? 'block' : 'none' }}>

            <h1 className='heading'>{translate('chooseSheetType', userData.language)}</h1>

            <div className="form-container">

              <div className="form-group">
                <Label value={translate('type', userData.language)} />
                <div className="sheets-type">
                  <div
                    className={activeSheetType.workers ? 'sheet-type active' : 'sheet-type'}
                    onClick={
                      () => {
                        setSheetType(CONTRACTOR_SHEETS_TYPES.workers)
                        setActiveSheet({techs: false, equipments: false, meters: false, workers: true})
                      }
                    }
                  >
                    <FontAwesomeIcon icon='fa-solid fa-helmet-safety' />
                    <span>{translate('workersSheets', userData.language)}</span>
                  </div>

                  <div
                    className={activeSheetType.techs ? 'sheet-type active' : 'sheet-type'}
                    onClick={
                      () => {
                        setSheetType(CONTRACTOR_SHEETS_TYPES.techs)
                        setActiveSheet({workers: false, equipments: false, meters: false, techs: true})
                      }
                    }
                  >
                    <FontAwesomeIcon icon='fa-solid fa-edit' />
                    <span>{translate('techniciansSheets', userData.language)}</span>
                  </div>

                  <div
                    className={activeSheetType.equipments ? 'sheet-type active' : 'sheet-type'}
                    onClick={
                      () => {
                        setSheetType(CONTRACTOR_SHEETS_TYPES.equipments)
                        setActiveSheet({techs: false, meters: false, workers: false, equipments: true})
                      }
                    }
                  >
                    <FontAwesomeIcon icon='fa-solid fa-truck-monster' />
                    <span>{translate('equipmentSheets', userData.language)}</span>
                  </div>

                  <div
                    className={activeSheetType.meters ? 'sheet-type active' : 'sheet-type'}
                    onClick={
                      () => {
                        setSheetType(CONTRACTOR_SHEETS_TYPES.meters)
                        setActiveSheet({techs: false, equipments: false, workers: false, meters: true})
                      }
                    }
                  >
                    <FontAwesomeIcon icon='fa-solid fa-ruler' />
                    <span>{translate('metersSheets', userData.language)}</span>
                  </div>
                </div>
              </div>

              <div className="display-desc">
                <h1>{translate('chooseSheetType', userData.language)}</h1>
                <p>{translate('chooseSheetTypeEffectParagraph', userData.language)}</p>
                <ul>
                  <li><b>{translate('meters', userData.language)}: </b> {translate('changeDataToMetersPara', userData.language)}</li>
                  <li><b>{translate('equipments', userData.language)}: </b> {translate('changeDataToEquipmentsPara', userData.language)}</li>
                  <li><b>{translate('workers', userData.language)}: </b> {translate('changeDataToWorkersPara', userData.language)}</li>
                  <li><b>{translate('technicians', userData.language)}: </b> {translate('changeDataToTechniciansPara', userData.language)}</li>
                </ul>
              </div>

              <div className="next-step-btn-container">
                <button onClick={nextStep1} className="btn btn-primary next-stepbtn">
                  {userData.language == 'english' && (
                    <FontAwesomeIcon style={{ margin: '0 5px' }} icon='fa-solid fa-arrow-right' />
                  )}
                  {translate('nextStep', userData.language)}
                  {userData.language == 'arabic' && (
                    <FontAwesomeIcon style={{ margin: '0 5px' }} icon='fa-solid fa-arrow-left' />
                  )}
                </button>
              </div>

            </div>

          </div>

          <div className="step-2" style={{ display: activeStep.s2 ? 'block' : 'none' }}>
            <h2 className='heading'>{translate('filter', userData.language)}</h2>
            <div className="form-container">
              <div className="form-group">
                <Label value={translate('type', userData.language)} />
                <Input
                  value={sheetType}
                  disabled={true}
                  style={{ fontWeight: 'bold' }}
                />
              </div>

              <div className="form-group">
                <Label value={translate('tag', userData.language)} />
                <Input
                  value={sheetCode}
                  disabled={true}
                  style={{ fontWeight: 'bold' }}
                />
              </div>

              <div className="form-group">
                <Label value={translate('contractor', userData.language)} />
                <select className="form-select" onChange={(e) => {
                  setContractor(contractors.find(item => item.con_id == e.target.value))
                  setConID(e.target.value)
                }}>
                  <option value="">---------</option>
                  {contractors.map((con) => (
                    <option value={con.con_id} key={con.con_id}>{con.con_name} #{con.con_id}</option>
                  ))}
                </select>
              </div>

              <div className="next-btn-container">
                <button
                  onClick={nextStep2}
                  className={conID == '' ? "next-stepbtn btn btn btn-primary disabled" : 'next-stepbtn btn btn-primary'}
                >
                  {userData.language == 'english' && (
                    <FontAwesomeIcon style={{ margin: '0 5px !important' }} icon='fa-solid fa-arrow-right' />
                  )}
                  {translate('nextStep', userData.language)}
                  {userData.language == 'arabic' && (
                    <FontAwesomeIcon style={{ margin: '0 5px !important' }} icon='fa-solid fa-arrow-left' />
                  )}
                </button>
              </div>

            </div>
          </div>

          <div className="step-3" style={{ display: isStep3Done && activeStep.s3 ? 'block' : 'none' }}>

            <h2 className='heading'>{translate('contractor', userData.language)} - <b>{selectedContractor.con_name} #{selectedContractor.con_id}</b></h2>

            <ul className='contractor-data-show'>
              <li><span>{translate('workers', userData.language)} </span> <span>{selectedContractorWorkers.length} {translate('worker', userData.language)}</span></li>
              <li><span>{translate('technicians', userData.language)} </span> <span>{selectedContractorTechnicians.length} {translate('technician', userData.language)}</span></li>

              {/* Define Type */}
              {selectedContractor.con_type == 1 && (
                <li><span>{translate('meters', userData.language)} </span> <span>{selectedContractorMeters.length} {translate('rows', userData.language)}</span></li>
              )}
              {selectedContractor.con_type == 2 && (
                <li><span>{translate('equipments', userData.language)} </span> <span>{selectedContractorEquipments.length} {translate('rows', userData.language)}</span></li>
              )}

              <hr/>

              <li><span>{translate('joinedIn', userData.language)} </span> <span>{dateLanguage(selectedContractor.updated_at, userData.language)}</span></li>
              <li><span>{translate('lastUpdate', userData.language)} </span> <span>{dateLanguage(selectedContractor.created_at, userData.language)}</span></li>
            </ul>

            {
              (sheetType == CONTRACTOR_SHEETS_TYPES.workers && selectedContractorWorkers.length > 0) ||
              (sheetType == CONTRACTOR_SHEETS_TYPES.techs && selectedContractorTechnicians.length > 0) ||
              (sheetType == CONTRACTOR_SHEETS_TYPES.equipments && selectedContractorEquipments.length > 0) ||
              (sheetType == CONTRACTOR_SHEETS_TYPES.meters && selectedContractorMeters.length > 0)  ? (
              <>
                <ul className='tabs-list-ul'>
                  {/* Today Sheet */}
                  <li
                    onClick={() => {
                      setTabStatus({ today: true, month: false, day: false, both: false, selection: false })
                      setFilterType('today')
                    }}
                    className={filterTabs.today ? 'active' : 'tb-li'}>
                    <span>{filterTabs.today && <FontAwesomeIcon icon={'fa-solid fa-check'} />} {translate('todaySheet', userData.language)}</span>
                  </li>

                  {/* Filter By Month */}
                  <li
                    onClick={() => {
                      setTabStatus({ today: false, month: true, day: false, both: false, selection: false })
                      setFilterType('month')
                    }}
                    className={filterTabs.month ? 'active' : 'tb-li'}>
                    <span>{filterTabs.month && <FontAwesomeIcon icon={'fa-solid fa-check'} />} {translate('monthSheet', userData.language)}</span>
                  </li>

                  {/* Filter By Day */}
                  <li
                    onClick={() => {
                      setTabStatus({ today: false, month: false, day: true, both: false, selection: false })
                      setFilterType('day')
                    }}
                    className={filterTabs.day ? 'active' : 'tb-li'}>
                    <span>{filterTabs.day && <FontAwesomeIcon icon={'fa-solid fa-check'} />} {translate('daySheet', userData.language)}</span>
                  </li>

                  {/* Filter By Day & Month */}
                  <li
                    onClick={() => {
                      setTabStatus({ today: false, month: false, day: false, both: true, selection: false })
                      setFilterType('both')
                    }}
                    className={filterTabs.both ? 'active' : 'tb-li'}>
                    <span>{filterTabs.both && <FontAwesomeIcon icon={'fa-solid fa-check'} />} {translate('bothSheet', userData.language)}</span>
                  </li>
                </ul>

                <div className="tabs-content">

                  {/* Today Sheet */}
                  <div className="tab-content filter-date-tab today-tab" style={{ display: filterTabs.today ? 'block' : 'none' }}>

                    <h1 className="heading-tab">{translate('todaySheet', userData.language)}</h1>

                    <div className="today-tab-content">

                      <div className="header">
                        <h3>{translate('showDataParagraph', userData.language)}</h3>
                        <button className='btn btn-secondary' onClick={getTodaysData}>{translate('showDataBtn', userData.language)}</button>
                      </div>

                      {activateData && (
                        <>
                          {/* Display Today's Workers Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.workers && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorWorkersColumns} rows={todayData} getRowId={(row) => row.con_wr_id}/>
                            </div>
                          )}

                          {/* Display Today's Techs Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.techs && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorWorkersColumns} rows={todayData} getRowId={(row) => row.con_wr_id}/>
                            </div>
                          )}

                          {/* Display Today's Meters Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.meters && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorMetersColumns} rows={todayData} getRowId={(row) => row.con_mt_id}/>
                            </div>
                          )}

                          {/* Display Today's Equipments Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.equipments && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={EquipmentsWorkingHoursColumns} rows={todayData} getRowId={(row) => row.eq_hr_id}/>
                            </div>
                          )}
                        </>
                      )}

                    </div>

                  </div>

                  {/* Month Sheet */}
                  <div className="tab-content filter-date-tab" style={{ display: filterTabs.month ? 'block' : 'none' }}>

                    <h1 className="heading-tab">{translate('monthSheet', userData.language)}</h1>

                    <div className="form-container">

                      <div className="form-group">
                        <Label value={translate('month', userData.language)} />
                        <select className="form-select" onChange={(e) => {
                          setFilterMonth(e.target.value)
                          console.log(e.target.value)
                        }}>
                          {MONTHS_NAMES.map((month, idx) => (
                            <option value={idx + 1}>{month}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <Label value={translate('type', userData.language)} />
                        <Input value={sheetType} disabled={true} />
                      </div>

                    </div>

                    <div className="today-tab-content">
                      <div className="header">
                        <h3>{translate('showDataParagraph', userData.language)}</h3>
                        <button className='btn btn-secondary' onClick={getMonthData}>{translate('showDataBtn', userData.language)}</button>
                      </div>

                      {activateData && (
                        <>
                          {/* Display Today's Workers Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.workers && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorWorkersColumns} rows={monthData} getRowId={(row) => row.con_wr_id}/>
                            </div>
                          )}

                          {/* Display Today's Techs Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.techs && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorWorkersColumns} rows={monthData} getRowId={(row) => row.con_wr_id}/>
                            </div>
                          )}

                          {/* Display Today's Meters Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.meters && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorMetersColumns} rows={monthData} getRowId={(row) => row.con_mt_id}/>
                            </div>
                          )}

                          {/* Display Today's Equipments Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.equipments && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={EquipmentsWorkingHoursColumns} rows={monthData} getRowId={(row) => row.eq_hr_id}/>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                  </div>

                  {/* Day Sheet */}
                  <div className="tab-content filter-date-tab" style={{ display: filterTabs.day ? 'block' : 'none' }}>

                    <h1 className="heading-tab">{translate('daySheet', userData.language)}</h1>

                    <div className="form-container">

                      <div className="form-group">
                        <Label value={translate('day', userData.language)} />
                        <select className="form-select" onChange={(e) => setFilterDay(e.target.value)}>
                          {generateArray(31).map((day, idx) => (
                            <option value={day}>{day}</option>
                          ))}
                        </select>
                      </div>

                    </div>

                    <div className="today-tab-content">
                      <div className="header">
                        <h3>{translate('showDataParagraph', userData.language)}</h3>
                        <button className='btn btn-secondary' onClick={getDayData}>{translate('showDataBtn', userData.language)}</button>
                      </div>

                      {activateData && (
                        <>
                          {/* Display Today's Workers Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.workers && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorWorkersColumns} rows={dayData} getRowId={(row) => row.con_wr_id}/>
                            </div>
                          )}

                          {/* Display Today's Techs Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.techs && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorWorkersColumns} rows={dayData} getRowId={(row) => row.con_wr_id}/>
                            </div>
                          )}

                          {/* Display Today's Meters Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.meters && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorMetersColumns} rows={dayData} getRowId={(row) => row.con_mt_id}/>
                            </div>
                          )}

                          {/* Display Today's Equipments Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.equipments && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={EquipmentsWorkingHoursColumns} rows={dayData} getRowId={(row) => row.eq_hr_id}/>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                  </div>

                  {/* Day & Month Sheet */}
                  <div className="tab-content filter-date-tab" style={{ display: filterTabs.both ? 'block' : 'none' }}>

                    <h1 className="heading-tab">{translate('bothSheet', userData.language)}</h1>

                    <div className="form-container">

                      <div className="form-group">
                        <Label value={translate('month', userData.language)} />
                        <select className="form-select" onChange={(e) => setFilterMonth(e.target.value)}>
                          {MONTHS_NAMES.map((month, idx) => (
                            <option value={idx + 1}>{month}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <Label value={translate('day', userData.language)} />
                        <select className="form-select" onChange={(e) => setFilterDay(e.target.value)}>
                          {generateArray(31).map((day, idx) => (
                            <option value={day}>{day}</option>
                          ))}
                        </select>
                      </div>

                    </div>

                    <div className="today-tab-content">
                      <div className="header">
                        <h3>{translate('showDataParagraph', userData.language)}</h3>
                        <button className='btn btn-secondary' onClick={getBothData}>{translate('showDataBtn', userData.language)}</button>
                      </div>

                      {activateData && (
                        <>
                          {/* Display Today's Workers Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.workers && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorWorkersColumns} rows={bothData} getRowId={(row) => row.con_wr_id}/>
                            </div>
                          )}

                          {/* Display Today's Techs Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.techs && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorWorkersColumns} rows={bothData} getRowId={(row) => row.con_wr_id}/>
                            </div>
                          )}

                          {/* Display Today's Meters Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.meters && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={ContractorMetersColumns} rows={bothData} getRowId={(row) => row.con_mt_id}/>
                            </div>
                          )}

                          {/* Display Today's Equipments Data */}
                          {sheetType == CONTRACTOR_SHEETS_TYPES.equipments && (
                            <div className="table-container" style={{ width: '100%', height: '400px' }}>
                              <DataGrid columns={EquipmentsWorkingHoursColumns} rows={bothData} getRowId={(row) => row.eq_hr_id}/>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                  </div>

                  <div style={{ marginTop: '-10px', padding: '0' }}>
                    <button onClick={nextStep3} className="btn btn-primary next-stepbtn">
                      {userData.language == 'english' && (
                        <FontAwesomeIcon style={{ margin: '0 5px' }} icon='fa-solid fa-arrow-right' />
                      )}
                      {translate('nextStep', userData.language)}
                      {userData.language == 'arabic' && (
                        <FontAwesomeIcon style={{ margin: '0 5px' }} icon='fa-solid fa-arrow-left' />
                      )}
                    </button>
                  </div>

                </div>
              </>
              ) : (
              <div className="no-data-to-make-sheet alert alert-warning alert-sm">
                {translate('cannotCreateSheet', userData.language)}
              </div>
              )
            }
          </div>

          <div className="step-4" style={{ display: isStep4Done && activeStep.s4 && isStep3Done ? 'block' : 'none' }}>
            <h2 className='heading'>{translate('createSheet', userData.language)}</h2>

            <ul>
              <li><span>{translate('type', userData.language)}</span> <span>{sheetType}</span></li>
              <li><span>{translate('tag', userData.language)}</span> <span>{sheetCode}</span></li>
              <li><span>{translate('filter', userData.language)}</span> <span>{filterType.toUpperCase()}</span></li>
              <li><span>{translate('contractor', userData.language)}</span> <span><Link href={route('contractors.view', selectedContractor.con_id ?? 1)}>{selectedContractor.con_name}</Link> </span></li>

              {filterType == 'today' && (
                <li><span>{translate('rows', userData.language)}</span> <span>{todayData.length} {translate('rows', userData.language)}</span></li>
              )}
              {filterType == 'month' && (
                <li><span>{translate('rows', userData.language)}</span> <span>{monthData.length} {translate('rows', userData.language)}</span></li>
              )}
              {filterType == 'day' && (
                <li><span>{translate('rows', userData.language)}</span> <span>{dayData.length} {translate('rows', userData.language)}</span></li>
              )}
              {filterType == 'both' && (
                <li><span>{translate('rows', userData.language)}</span> <span>{bothData.length} {translate('rows', userData.language)}</span></li>
              )}

              <li>
                <span>{translate('summary', userData.language)}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <label className="switch">
                    <input type="checkbox" checked={includeSummary == 1 ? true : false} onChange={(e) => setIncludeSummary(e.target.checked)} />
                    <span className="slider round"></span>
                  </label>
                </span>
              </li>
            </ul>

            {
              (filterType == 'today' && todayData.length > 0) ||
              (filterType == 'month' && monthData.length > 0) ||
              (filterType == 'day' && dayData.length > 0) ||
              (filterType == 'both' && bothData.length > 0) ? (
                <button onClick={finalStepSubmit} className='btn btn-primary next-stepbtn'><FontAwesomeIcon icon='fa-solid fa-plus' /> Create <b>{sheetCode}</b></button>
              ) : (
                <div className="alert alert-info" style={{ margin: '20px 5px 10px', padding: '15px 25px' }}>
                  {translate('cannotCreateSheet', userData.language)}
                </div>
              )
            }

          </div>

        </div>

      </div>

    </Layout>
  )
}

export default AddSheet
