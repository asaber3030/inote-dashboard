import './materials.scss'

import React, {useState} from 'react'

import Layout from "@/Layouts/Layout"
import {Link, usePage} from "@inertiajs/inertia-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SomePicture from '../../../assets/images/box.png';
import formatDate from "@/resources/helpers/format-date";
import {convertToCSV} from "@/resources/helpers/convertToCSV";
import {DataGrid} from "@mui/x-data-grid";
import {MaterialsColumns} from "@/resources/columns/materials";
import translate from "@/resources/translations/translate";
const StoredMaterials = () => {

  const { store, data, userData, appURL } = usePage().props

  const [tableView, setTableView] = useState(false)

  const csvArr = [
    ["Material ID", "Material Name", "Material Tag", "Material Amount", "Store ID", "Store Name", "Store Capacity", "Store Type", "Store Tag"],
    ...data.materials.map(item => [
      item.material_id,
      item.material_name,
      item.material_tag,
      item.material_amount,
      item.store,
      store.store_name,
      store.store_capacity,
      store.store_type,
      store.store_tag,
    ])
  ]

  const exportMaterials = () => {
    convertToCSV('s', csvArr)
  }

  return (
    <Layout>
      <div className="layout-header">
        <h1><FontAwesomeIcon icon='fa-solid fa-layer-group' /> {translate('storedMaterials', userData.language)} - {translate('store', userData.language)} - <b>{store.store_name}</b></h1>
        <div className="data-actions">
          <Link className="btn btn-primary" href={route('stores.materials.add', store.store_id)}><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('addMaterial', userData.language)}</Link>
          {data.materials.length > 0 && (
            <>
              <button className="btn btn-success" onClick={exportMaterials}><FontAwesomeIcon icon='fa-solid fa-file-export' /> {translate('export', userData.language)}</button>
              <button className="btn btn-warning" onClick={() => setTableView(!tableView)}>
                {tableView === false ? (
                  <span><FontAwesomeIcon icon='fa-solid fa-table' /> {translate('tableView', userData.language)}</span>
                ) : (
                  <span><FontAwesomeIcon icon='fa-solid fa-grip' /> {translate('gridView', userData.language)}</span>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {tableView === false ? (
        <>
          {data.materials.length > 0 ? (
            <div className="materials">
              {data.materials.map((material, index) => (
                <div className="material" key={index}>
                  <img src={appURL + material.material_icon} alt="Pic"/>
                  <h2>{material.material_name}</h2>
                  <p>{material.material_specifications}</p>
                  <ul>
                    <li><span>{translate('amount', userData.language)}</span> <span style={{ direction: 'ltr' }}>{material.material_amount} m<sup>3</sup>  </span></li>
                    <li><span>{translate('tag', userData.language)}</span> <span>{material.material_tag}</span></li>
                    <li><span>{translate('joinedIn', userData.language)}</span> <span>{formatDate(material.updated_at)}</span></li>
                    <li><span>{translate('lastUpdate', userData.language)}</span> <span>{formatDate(material.created_at)}</span></li>
                  </ul>
                  <div className="material-actions">
                    {material.deleted_at === null ? (
                      <>
                        <Link href={route('stores.materials.update', material.material_id)}>{translate('update', userData.language)}</Link>
                        <Link href={route('stores.materials.delete', material.material_id)}>{translate('delete', userData.language)}</Link>
                      </>
                    ) : (
                      <Link href={route('stores.materials.restore', material.material_id)}>{translate('restore', userData.language)}</Link>
                    )}

                  </div>
                </div>
              ))}

            </div>
          ) : (
            <div className="alert alert-warning" style={{ marginTop: '20px' }}>{translate('noMaterials', userData.language)}</div>
          )}
        </>

      ) : (
        <div style={{ width: '100%', height: '600px', marginTop: '10px', paddingTop: '0' }}>
          <DataGrid
            columns={MaterialsColumns}
            rows={data.materials}
            checkboxSelection={false}
            getRowId={(row) => row.material_id}
          />
        </div>
      )}

    </Layout>
  )
}

export default StoredMaterials
