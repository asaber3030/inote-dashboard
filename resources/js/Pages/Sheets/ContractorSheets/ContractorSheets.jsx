import '../style.scss'

import { useState, useEffect } from "react";

import Layout from "@/Layouts/Layout"

import formatDate from "@/resources/helpers/format-date";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, usePage } from "@inertiajs/inertia-react"
import { CONTRACTOR_SHEETS_TYPES_ARR } from "@/resources/constants";

import EmptyBox from '../../../assets/images/box.png'
import Input from "@/Components/Input/Input";
import translate from "@/resources/translations/translate";
import dateLanguage from "@/resources/helpers/dateLanguage";

const ContractorSheets = () => {

  const { sheets, contractors, userData } = usePage().props

  const [data, setData] = useState([])
  const [sheetType, setSheetType] = useState('')
  const [filterContractor, setContractor] = useState('')
  const [searchFilter, setSearch] = useState('')

  // Search By Code
  useEffect(() => {
    if (searchFilter != '') {
      setData(data.filter((obj) =>
        obj.sheet_code.toLowerCase().includes(searchFilter.toLowerCase())
      ))
    }
    if (searchFilter == '') {
      setData(sheets)
    }
  }, [searchFilter]);

  // Filter By Contractor ID
  useEffect(() => {
    if (filterContractor != '') {
      setData(sheets.filter((obj) =>
        obj.contractor.con_id == parseInt(filterContractor)
      ))
    }
    if (filterContractor == '') {
      setData(sheets)
    }

  }, [filterContractor]);

  // Filter By Sheet Type
  useEffect(() => {
    if (sheetType != '') {
      setData(sheets.filter((obj) =>
        obj.sheet_type == sheetType
      ))
    }
    if (sheetType == '') {
      setData(sheets)
    }

  }, [sheetType]);

  return (
    <Layout>
      <div className="layout-header">
        <h1><FontAwesomeIcon icon='fa-solid fa-file' /> {translate('contractorSheets', userData.language)}</h1>
      </div>

      <div className="filtering-data">

        <div className="form-group">
          <label>{translate('search', userData.language)}</label>
          <Input className='form-control' handleChange={ (e) => setSearch(e.target.value) } />
        </div>

        <div className="form-group">
          <label>{translate('type', userData.language)}</label>
          <select onChange={ (e) => setSheetType(e.target.value) }>
            {CONTRACTOR_SHEETS_TYPES_ARR.map((item, idx) => (
              <option value={item} key={idx}>{item}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{translate('contractor', userData.language)}</label>
          <select onChange={ (e) => setContractor(e.target.value) }>
            <option value="">-------</option>
            {contractors.map((item, idx) => (
              <option value={item.con_id} key={idx}>{item.con_name} #{item.con_id}</option>
            ))}
          </select>
        </div>

      </div>

      <div className="sheets-container">
        <div className="view-sheets">

          {data.length > 0 ? (
            <table>
              <tr>
                <th colSpan='row'>{translate('id', userData.language)}</th>
                <th colSpan='row'>{translate('tag', userData.language)}</th>
                <th colSpan='row'>{translate('type', userData.language)}</th>
                <th colSpan='row'>{translate('contractor', userData.language)}</th>
                <th colSpan='row'>{translate('joinedIn', userData.language)}</th>
                <th colSpan='row'>{translate('handle', userData.language)}</th>
              </tr>
              {data.map((sheet, idx) => (
                <tr className='row-tr' key={idx}>
                  <td>{sheet.sheet_id}</td>
                  <td>{sheet.sheet_code}</td>
                  <td>{sheet.sheet_type}</td>
                  <td><Link className='default-link' href={route('contractors.view', sheet.contractor.con_id)}>{sheet.contractor.con_name}</Link></td>
                  <td>{dateLanguage(sheet.created_at, userData.language)}</td>
                  <td>
                    <Link href={route('contractor.sheets.view', sheet.sheet_id)} className='btn btn-sm btn-secondary'><FontAwesomeIcon style={{ margin: 0 }} icon='fa-solid fa-eye' /></Link>
                  </td>
                </tr>
              ))}
            </table>
          ) : (
            <div className="no-data">
              <img src={EmptyBox} alt="Empty Box" />
              <h1>{translate('noDataForFilters', userData.language)}</h1>
            </div>
          )}

          <div className="export-actions">
            <Link href={route('contractor.sheets.add')} className='btn btn-primary'><FontAwesomeIcon icon='fa-solid fa-file-circle-plus' /> {translate('createSheet', userData.language)}</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContractorSheets
