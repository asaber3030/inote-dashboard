import Layout from "@/Layouts/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DataGrid} from "@mui/x-data-grid";
import {Link, usePage} from "@inertiajs/inertia-react";
import { StoresColumns } from "@/resources/columns/stores";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";

const TrashedStores = () => {

  const { stores } = usePage().props

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
        <h1><FontAwesomeIcon icon="fa-solid fa-trash" /> Trashed Stores</h1>
        <div className="data-actions">
          <Link className='btn btn-primary' href={route('stores.add')}>Create</Link>
          <button className='btn btn-success' onClick={handleRestoreSelected}>Restore</button>
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
        <button onClick={handleExportation} className={'btn btn-primary export-button'}><FontAwesomeIcon icon="fa-solid fa-file-export" /> Export</button>
      </div>
    </Layout>
  );
}

export default TrashedStores
