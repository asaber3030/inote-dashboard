import { DataGrid } from "@mui/x-data-grid";

const ContractorsLayout = ({ children, cols, contractors }) => {

  return (
    <main className='contractors-layout-main'>
      <div className="children-content">
        {children}
      </div>
      <div className="contractors-list">
        <div style={{ width: '100%', height: '400px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #e5e5e5' }}>
          <DataGrid
            columns={cols}
            rows={contractors}
            checkboxSelection={false}
            getRowId={(row) => row.con_id}
          />
        </div>
      </div>
    </main>
  );
}

export default ContractorsLayout
