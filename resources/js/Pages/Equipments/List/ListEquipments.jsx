import Layout from "@/Layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid } from "@mui/x-data-grid";
import { Link, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { EquipmentsColumns } from "@/resources/columns/equipments";
import { convertToCSV } from "@/resources/helpers/convertToCSV";

import formatDate from "@/resources/helpers/format-date";
import csvDate from "@/resources/helpers/csvDate";
import translate from "@/resources/translations/translate";

const ListEquipments = () => {

  const { equipments, userData } = usePage().props

  const [selected, setSelected] = useState([])
  const handleRestoreSelected = () => {
    Inertia.post(route('equipments.restore.selected'), {
      selected: selected
    })
  }

  const handleDeleteSelected = () => {
    Inertia.post(route('equipments.delete.selected'), {
      selected: selected
    })
  }

  const handleExportation = () => {
    const csvData = [
      ["Equipment ID", "Equipment Code", "Equipment Name", "Type", "Productivity", "Created At", "Last Update", 'Status'],
      ...equipments.map(item => [
        item.eq_id,
        item.eq_tag,
        item.eq_name,
        item.eq_type,
        item.productivity,
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
        <h1><FontAwesomeIcon icon="fa-solid fa-truck-monster" /> {translate('equipments', userData.language)}</h1>
        <div className="data-actions">
          <Link className='btn btn-primary' href={route('equipments.add')}>{translate('create', userData.language)}</Link>
          <button className='btn btn-success' onClick={handleRestoreSelected}>{translate('restore', userData.language)}</button>
          <button className='btn btn-danger' onClick={handleDeleteSelected}>{translate('delete', userData.language)}</button>
        </div>
      </div>

      <div className="table-container" style={{ width: '100%', height: '600px' }}>
        <DataGrid
          columns={EquipmentsColumns}
          rows={equipments}
          checkboxSelection={true}
          onSelectionModelChange={(selected) => setSelected(selected)}
          getRowId={(row) => row.eq_id}
        />
        <button onClick={handleExportation} className={'btn btn-primary export-button'}><FontAwesomeIcon icon="fa-solid fa-file-export" /> {translate('export', userData.language)}</button>
      </div>
    </Layout>
  );
}

export default ListEquipments
