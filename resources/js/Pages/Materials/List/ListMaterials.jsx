import Layout from "@/Layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid } from "@mui/x-data-grid";
import { Link, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { MaterialsColumnsMain } from "@/resources/columns/materials";
import translate from "@/resources/translations/translate";
import formatDate from "@/resources/helpers/format-date";
import {exportToCsv} from "@/resources/helpers/convertToCSV";

const ListMaterials = () => {

  const { materials, userData } = usePage().props

  console.log(materials[0])

  const [selected, setSelected] = useState([])
  const handleRestoreSelected = () => {
    Inertia.post(route('stores.restore.selected'), {
      selected: selected
    })
  }

  const handleDeleteSelected = () => {
    Inertia.post(route('stores.delete.selected'), {
      selected: selected
    })
  }


  const handleExportation = () => {
    const csvArr = [
      [
        "Material ID",
        "Material Name",
        "Material Tag",
        "Material Amount",
        "Store ID",
        "Store Name",
        "Store Capacity",
        "Store Type",
        "Store Tag",
        "Created At",
        "Last Update",
      ],
      ...materials.map(item => [
        item.material_id,
        item.material_name,
        item.material_tag,
        item.material_amount,
        item.store.store_id,
        item.store.store_name,
        item.store.store_capacity,
        item.store.store_type,
        item.store.store_tag,
        item.created_at,
        item.updated_at,
      ])
    ]

    exportToCsv('materials.csv', csvArr)
  }

  return (
    <Layout>
      <div className='layout-header'>
        <h1><FontAwesomeIcon icon="fa-solid fa-layer-group" /> {translate('materials', userData.language)}</h1>
        <div className="data-actions">
          <Link className='btn btn-primary' href={route('materials.add')}>{translate('create', userData.language)}</Link>
          <button className='btn btn-success' onClick={handleRestoreSelected}>{translate('restore', userData.language)}</button>
          <button className='btn btn-danger' onClick={handleDeleteSelected}>{translate('delete', userData.language)}</button>
        </div>
      </div>

      <div className="table-container" style={{ width: '100%', height: '600px' }}>
        <DataGrid
          columns={MaterialsColumnsMain}
          rows={materials}
          checkboxSelection={true}
          onSelectionModelChange={(selected) => setSelected(selected)}
          getRowId={(row) => row.material_id}
        />
        <button onClick={handleExportation} className={'btn btn-primary export-button'}><FontAwesomeIcon icon="fa-solid fa-file-export" /> {translate('export', userData.language)}</button>
      </div>
    </Layout>
  );
}

export default ListMaterials
