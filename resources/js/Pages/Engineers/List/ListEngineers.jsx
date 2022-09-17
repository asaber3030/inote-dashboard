import Layout from "@/Layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid } from "@mui/x-data-grid";
import { Link, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { convertToCSV } from "@/resources/helpers/convertToCSV";
import { EngineersColumns } from "@/resources/columns/engineers";

import translate from "@/resources/translations/translate";
import formatDate from "@/resources/helpers/format-date";
import csvDate from "@/resources/helpers/csvDate";

import { CONTRACTOR_TYPE } from "@/resources/constants";

const ListEngineers = () => {

  const { engineers, userData } = usePage().props

  const [selected, setSelected] = useState([])

  const handleRestoreSelected = () => {
    Inertia.post(route('engineers.restore.selected'), {
      selected: selected
    })
  }

  const handleDeleteSelected = () => {
    Inertia.post(route('engineers.delete.selected'), {
      selected: selected
    })
  }

  const handleExportation = () => {
    const csvData = [
      ["Contractor ID", "Phone", "Type", "Created At", "Last Update", 'Status'],
      ...engineers.map(item => [
        item.con_id,
        item.con_phone,
        CONTRACTOR_TYPE[item.con_type],
        csvDate(item.created_at),
        csvDate(item.updated_at),
        item.deleted_at ? 'Deleted' : 'Available'
      ])
    ]
    convertToCSV('', csvData)
  }

  return (
    <Layout>
      <div className='layout-header'>
        <h1><FontAwesomeIcon icon="fa-solid fa-helmet-safety" /> {translate('engineers', userData.language)}</h1>
        <div className="data-actions">
          <Link className='btn btn-primary' href={route('engineers.add')}>{translate('create', userData.language)}</Link>
          <button className='btn btn-success' onClick={handleRestoreSelected}>{translate('restore', userData.language)}</button>
          <button className='btn btn-danger' onClick={handleDeleteSelected}>{translate('delete', userData.language)}</button>
        </div>
      </div>

      <div className="table-container" style={{ width: '100%', height: '600px' }}>
        <DataGrid
          columns={EngineersColumns}
          rows={engineers}
          checkboxSelection={true}
          onSelectionModelChange={(selected) => setSelected(selected)}
          pageSize={10}
        />
        <button className={'btn btn-primary export-button'}><FontAwesomeIcon icon="fa-solid fa-file-export" /> {translate('export', userData.language)}</button>
      </div>
    </Layout>
  );
}

export default ListEngineers
