import Layout from "@/Layouts/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DataGrid} from "@mui/x-data-grid";
import {Link, usePage} from "@inertiajs/inertia-react";
import { StoresColumns } from "@/resources/columns/stores";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import translate from "@/resources/translations/translate";

const ListStores = () => {

  const { stores, userData } = usePage().props

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
    Inertia.post(route('stores.export'));
  }

  return (
    <Layout>
      <div className='layout-header'>
        <h1><FontAwesomeIcon icon="fa-solid fa-store" /> {translate('stores', userData.language)}</h1>
        <div className="data-actions">
          <Link className='btn btn-primary' href={route('stores.add')}>{translate('create', userData.language)}</Link>
          <button className='btn btn-success' onClick={handleRestoreSelected}>{translate('restore', userData.language)}</button>
          <button className='btn btn-danger' onClick={handleDeleteSelected}>{translate('delete', userData.language)}</button>
        </div>
      </div>

      <div className="table-container" style={{ width: '100%', height: '600px' }}>
        <DataGrid
          columns={StoresColumns}
          rows={stores}
          checkboxSelection={true}
          onSelectionModelChange={(selected) => setSelected(selected)}
          getRowId={(row) => row.store_id}
        />
        <button onClick={handleExportation} className={'btn btn-primary export-button'}><FontAwesomeIcon icon="fa-solid fa-file-export" /> {translate('export', userData.language)}</button>
      </div>
    </Layout>
  );
}

export default ListStores
