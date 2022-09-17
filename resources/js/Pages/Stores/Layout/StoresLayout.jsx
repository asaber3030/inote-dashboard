import ListStores from "@/Pages/Stores/List/ListStores";
import { DataGrid } from "@mui/x-data-grid";
import { usePage } from "@inertiajs/inertia-react";

const StoresLayout = ({ children, cols, stores }) => {

  return (
    <main className='stores-layout-main'>
      <div className="children-content">
        {children}
      </div>
      <div className="stores-list">
        <div style={{ width: '100%', height: '400px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #e5e5e5' }}>
          <DataGrid
            columns={cols}
            rows={stores}
            checkboxSelection={false}

            getRowId={(row) => row.store_id}
          />
        </div>

      </div>
    </main>
  );
}

export default StoresLayout
