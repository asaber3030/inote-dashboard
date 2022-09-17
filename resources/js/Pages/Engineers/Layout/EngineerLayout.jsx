import { DataGrid } from "@mui/x-data-grid";

const EngineersLayout = ({ children, cols, engineers }) => {

  return (
    <main className='engineers-layout-main'>
      <div className="children-content">
        {children}
      </div>
      <div className="engineers-list">
        <div style={{ width: '100%', height: '400px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #e5e5e5' }}>
          <DataGrid
            columns={cols}
            rows={engineers}
            checkboxSelection={false}
            pageSize={10}
          />
        </div>
      </div>
    </main>
  );
}

export default EngineersLayout
