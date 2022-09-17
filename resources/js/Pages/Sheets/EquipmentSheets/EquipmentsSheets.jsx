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

const EquipmentsSheets = () => {
  const { userData, sheets, equipments } = usePage().props

  console.log(sheets)

  const [data, setData] = useState([])
  const [filterEquipment, setEquipment] = useState('')
  const [searchFilter, setSearch] = useState('')

  const [createSheetMaterial, setCreateSheetMaterial] = useState([equipments[0].eq_id])

  const goToCreateURL = () => {
    Inertia.get(route('equipment.sheets.add', createSheetMaterial))
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
    if (filterEquipment != '') {
      setData(sheets.filter((obj) =>
        obj.equipment.eq_id == parseInt(filterEquipment)
      ))
    }
    if (filterEquipment == '') {
      setData(sheets)
    }

  }, [filterEquipment]);

  return (
    <Layout>
      <div className="layout-header">
        <h1>{translate('equipmentSheets', userData.language)}</h1>
      </div>

      <div className="filtering-data">

        <div className="form-group">
          <label>{translate('search', userData.language)}</label>
          <Input className='form-control' handleChange={ (e) => setSearch(e.target.value) } />
        </div>

        <div className="form-group">
          <label>{translate('equipment', userData.language)}</label>
          <select onChange={ (e) => setEquipment(e.target.value) }>
            <option value="">-------</option>
            {equipments.map((item, idx) => (
              <option value={item.eq_id} key={idx}>{item.eq_name}</option>
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
                <th colSpan='row'>{translate('equipment', userData.language)}</th>
                <th colSpan='row'>{translate('joinedIn', userData.language)}</th>
                <th colSpan='row'>{translate('handle', userData.language)}</th>
              </tr>
              {data.map((sheet, idx) => (
                <tr className='row-tr' key={idx}>
                  <td>{sheet.sheet_id}</td>
                  <td>{sheet.sheet_code}</td>
                  <td>{sheet.equipment.eq_name}</td>
                  <td>{dateLanguage(sheet.created_at, userData.language)}</td>
                  <td><Link href={route('equipment.sheets.view', sheet.sheet_id)} className='btn btn-sm btn-secondary'><FontAwesomeIcon style={{ margin: '0' }} icon='fa-solid fa-eye' /></Link></td>
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

              <select onChange={ (e) => setCreateSheetMaterial(e.target.value) } style={{ width: '100%' }}>
                {equipments.map((item, idx) => (
                  <option value={item.eq_id} key={idx}>{item.eq_name}</option>
                ))}
              </select>
            </div>
            <button onClick={goToCreateURL} className='btn btn-primary'>{translate('createSheet', userData.language)}</button>
          </div>
        </div>
      </div>
    </Layout>
  )

}

export default EquipmentsSheets
