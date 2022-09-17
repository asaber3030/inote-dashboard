import './sidebar.scss'

import { Link, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import SidebarItem from "@/Components/Sidebar/SidebarItem";

import translate from "@/resources/translations/translate";

const Sidebar = () => {

  const { userData, appURL } = usePage().props

  const [slideDownList, setSlideDown] = useState({
    dashboard: false,
    contractors: false,
    workers: false,
    materials: false,
    stores: false,
    engineers: false,
    equipments: false,
    company: false,
    company_workers: false,
    sheets: false
  })

  return (
    <div id='sidebar' className='left'>

      <div className="sidebar-top">
        <div className="image">
          <img src={appURL + userData.image} className={userData.image == 'images/defaults/user.svg' ? 'invert-image' : 'default'} />
        </div>
        <div className="text">
          <h6>{userData.name}</h6>
          <span>{userData.title}</span>
        </div>
      </div>

      <div className="sidebar-content">

        {/* Dashboard Links */}
        <SidebarItem
          mainURL='dashboard'
          mainText={translate('dashboard', localStorage.getItem('lang'))}
          mainIcon='fa-dashboard'
          subLinks={[
            { text: translate('statistics', localStorage.getItem('lang')), url: 'dashboard' },
            { text: translate('charts', localStorage.getItem('lang')), url: 'dashboard' },
            { text: translate('websiteSettings', localStorage.getItem('lang')), url: 'dashboard' },
          ]}
        />

        {/* Sheets Links */}
        <SidebarItem
          mainURL='sheets'
          mainText={translate('sheets', localStorage.getItem('lang'))}
          mainIcon='fa-file-pdf'
          subLinks={[
            { text: translate('contractorSheets', localStorage.getItem('lang')), url: 'contractor.sheets.list' },
            { text: translate('equipmentSheets', localStorage.getItem('lang')), url: 'equipment.sheets.list' },
            { text: translate('materialSheets', localStorage.getItem('lang')), url: 'material.sheets.list' },
          ]}
        />

        {/* Contractors Links */}
        <SidebarItem
          mainURL='engineers.list'
          mainText={translate('engineers', localStorage.getItem('lang'))}
          mainIcon='fa-helmet-safety'
          subLinks={[
            { text: translate('engineers', localStorage.getItem('lang')), url: 'engineers.list' },
            { text: translate('newEngineer', localStorage.getItem('lang')), url: 'engineers.add' },
          ]}
        />

        {/* Contractors Links */}
        <SidebarItem
          mainURL='contractors.list'
          mainText={translate('contractors', localStorage.getItem('lang'))}
          mainIcon='fa-helmet-safety'
          subLinks={[
            { text: translate('contractors', localStorage.getItem('lang')), url: 'contractors.list' },
            { text: translate('newContractor', localStorage.getItem('lang')), url: 'contractors.add' },
            { text: translate('contractorSheets', localStorage.getItem('lang')), url: 'contractor.sheets.list' },
          ]}
        />

        {/* Stores Links */}
        <SidebarItem
          mainURL='stores.list'
          mainText={translate('stores', localStorage.getItem('lang'))}
          mainIcon='fa-store'
          subLinks={[
            { text: translate('stores', localStorage.getItem('lang')), url: 'stores.list' },
            { text: translate('newStore', localStorage.getItem('lang')), url: 'stores.add' },
          ]}
        />

        {/* Materials Links */}
        <SidebarItem
          mainURL='materials.list'
          mainText={translate('materials', localStorage.getItem('lang'))}
          mainIcon='fa-layer-group'
          subLinks={[
            { text: translate('materials', localStorage.getItem('lang')), url: 'materials.list' },
            { text: translate('newMaterial', localStorage.getItem('lang')), url: 'materials.add' },
            { text: translate('materialSheets', localStorage.getItem('lang')), url: 'material.sheets.list' },
          ]}
        />

        {/* Materials Links */}
        <SidebarItem
          mainURL='equipments.list'
          mainText={translate('equipments', localStorage.getItem('lang'))}
          mainIcon='fa-truck-monster'
          subLinks={[
            { text: translate('equipments', localStorage.getItem('lang')), url: 'equipments.list' },
            { text: translate('newEquipment', localStorage.getItem('lang')), url: 'equipments.add' },
            { text: translate('equipmentSheets', localStorage.getItem('lang')), url: 'equipment.sheets.list' },
          ]}
        />

      </div>

    </div>
  )
}

export default Sidebar
