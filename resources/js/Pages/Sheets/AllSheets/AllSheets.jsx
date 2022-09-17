import './all-sheets.scss'

import Layout from "@/Layouts/Layout";

import EngSheetImage from '../../../assets/images/engineering.png'
import MaterialSheetImage from '../../../assets/images/membrane.png'
import StoreSheetImage from '../../../assets/images/stock.png'
import ContractorSheetImage from '../../../assets/images/helmet.png'
import EquipmentSheetImage from '../../../assets/images/tractor.png'
import {Inertia} from "@inertiajs/inertia";
import translate from "@/resources/translations/translate";
import {usePage} from "@inertiajs/inertia-react";

const AllSheets = () => {

  const { userData } = usePage().props

  return (
    <Layout>
      <div className="layout-header">
        <h1>All-Sheets</h1>
      </div>

      <div className="all-sheets-container">
        <div className="sheets">

          <div className="sheet completed" onClick={() => Inertia.get(route('contractor.sheets.list'))}>
            <img src={ContractorSheetImage} alt='Sheet Image' />
            <h1>{translate('contractorSheets', userData.language)}</h1>
          </div>

          <div className="sheet completed" onClick={() => Inertia.get(route('material.sheets.list'))}>
            <img src={MaterialSheetImage} alt='Sheet Image' />
            <h1>{translate('materialSheets', userData.language)}</h1>
          </div>

          <div className="sheet completed" onClick={() => Inertia.get(route('equipment.sheets.list'))}>
            <img src={EquipmentSheetImage} alt='Sheet Image' />
            <h1>{translate('equipmentSheets', userData.language)}</h1>
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default AllSheets
