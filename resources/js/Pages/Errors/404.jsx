import './all-sheets.scss'

import Layout from "@/Layouts/Layout";

import EngSheetImage from '../../../assets/images/engineering.png'
import MaterialSheetImage from '../../../assets/images/membrane.png'
import StoreSheetImage from '../../../assets/images/stock.png'
import ContractorSheetImage from '../../../assets/images/helmet.png'
import EquipmentSheetImage from '../../../assets/images/tractor.png'
import {Inertia} from "@inertiajs/inertia";

const Error404 = () => {
  return (
    <Layout>
      <div className="layout-header">
        <h1>404 ERROR</h1>
      </div>

    </Layout>

  )
}

export default Error404
