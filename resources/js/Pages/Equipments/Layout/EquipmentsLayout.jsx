import { DataGrid } from "@mui/x-data-grid";

const EquipmentsLayout = ({ children, cols, equipments }) => {

  return (
    <main className='listing-layout-container'>
      <div className="children-content">
        {children}
      </div>
      <div className="listing-layout">
        <div style={{ width: '100%', height: '400px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #e5e5e5' }}>
          <DataGrid
            columns={cols}
            rows={equipments}
            checkboxSelection={false}
            getRowId={(row) => row.eq_id}
          />
        </div>

      </div>
    </main>
  );
}

export default EquipmentsLayout
