import '../style.scss'

import Layout from "@/Layouts/Layout";
import Input from "@/Components/Input/Input";

import { Inertia } from "@inertiajs/inertia";

import { useEffect, useState } from "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import { CONTRACTOR_SHEETS_TYPES_ARR} from "@/resources/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import translate from "@/resources/translations/translate";
import formatDate from "@/resources/helpers/format-date";

import EmptyBox from "@/assets/images/box.png";
import Label from "@/Components/Input/Label";
import dateLanguage from "@/resources/helpers/dateLanguage";

const MaterialsSheets = () => {
  const { userData, sheets } = usePage().props

  console.log(sheets)

  const [data, setData] = useState([])
  const [filterMaterial, setMaterial] = useState('')
  const [searchFilter, setSearch] = useState('')

  const [createSheetMaterial, setCreateSheetMaterial] = useState(1)

  const goToCreateURL = () => {
    Inertia.get(route('material.sheets.add', createSheetMaterial))
  }

  // Search By Code
  useEffect(() => {
    if (searchFilter != '') {
      setData(sheets.filter((obj) =>
        obj.sheet_code.toLowerCase().includes(searchFilter.toLowerCase())
      ))
    }
    if (searchFilter == '') {
      setData(sheets)
    }
  }, [searchFilter]);

  // Filter By Contractor ID
  useEffect(() => {
    if (filterMaterial != '') {
      setData(sheets.filter((obj) =>
        obj.material.material_id == parseInt(filterMaterial)
      ))
    }
    if (filterMaterial == '') {
      setData(sheets)
    }

  }, [filterMaterial]);

  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('materialSheets', userData.language)}</h1>
      </div>

      <div className="filtering-data">

        <div className="form-group">
          <label>{translate('search', userData.language)}</label>
          <Input className='form-control' handleChange={ (e) => setSearch(e.target.value) } />
        </div>

        <div className="form-group">
          <label>{translate('material', userData.language)}</label>
          <Input value={filterMaterial} handleChange={ (e) => setMaterial(e.target.value) } />
        </div>

      </div>

      <div className="sheets-container">
        <div className="view-sheets">

          {data.length > 0 ? (
            <table>
              <tr>
                <th colSpan='row'>{translate('id', userData.language)}</th>
                <th colSpan='row'>{translate('tag', userData.language)}</th>
                <th colSpan='row'>{translate('material', userData.language)}</th>
                <th colSpan='row'>{translate('joinedIn', userData.language)}</th>
                <th colSpan='row'>{translate('handle', userData.language)}</th>
              </tr>
              {data.map((sheet, idx) => (
                <tr className='row-tr' key={idx}>
                  <td>{sheet.sheet_id}</td>
                  <td>{sheet.sheet_code}</td>
                  <td>{sheet.material.material_name}</td>
                  <td>{dateLanguage(sheet.created_at)}</td>
                  <td><Link href={route('material.sheets.view', sheet.sheet_id)} className='btn btn-sm btn-secondary'><FontAwesomeIcon style={{ margin: '0' }} icon='fa-solid fa-eye' /></Link></td>
                </tr>
              ))}
            </table>
          ) : (
            <div className="no-data">
              <img src={EmptyBox} alt="Empty Box" />
              <h1>{translate('noData', userData.language)}</h1>
            </div>
          )}

          <div className="export-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

            <div className="form-group" style={{ display: 'block', width: '300px' }}>

              <div className="form-group">
                <Input style={{ width: '100%', margin: '0' }} value={createSheetMaterial} handleChange={ (e) => setCreateSheetMaterial(e.target.value) } />
              </div>
            </div>
            <button onClick={goToCreateURL} className='btn btn-primary'>{translate('createSheet', userData.language)}</button>
          </div>
        </div>
      </div>
    </Layout>
  )

}

export default MaterialsSheets
