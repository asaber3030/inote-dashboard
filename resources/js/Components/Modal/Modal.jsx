import { Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import translate from "@/resources/translations/translate";

const ContractorModal = ({ contractor, openBy, changeOpen, exportFunction }) => {

  const LANG = localStorage.getItem('lang')

  return (
    <div className="assigning-contractors" style={{ display: openBy ? 'block' : 'none' }}>
      <div className="content">
        <div className="actions-assigning">
          <h1>{translate('contractorModalTitle', LANG)} - <b>{contractor.con_name}#{contractor.con_id}</b></h1>
          <div>
            <Link href={route('contractors.update', contractor.con_id)} className='btn btn-sm btn-primary'>{translate('update', LANG)}</Link>
            <Link href={route('contractors.delete', contractor.con_id)} className='btn btn-sm btn-danger'>{translate('delete', LANG)}</Link>
            <button onClick={exportFunction} className='btn btn-sm btn-success'>{translate('export', LANG)}</button>
          </div>
        </div>
        <ul>
          <li><Link href={route('contractors.workers.add', [contractor.con_id, 0])}><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('addWorker', LANG)}</Link></li>
          <li><Link href={route('contractors.workers.add', [contractor.con_id, 1])}><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('addTechnician', LANG)}</Link></li>
          <li><Link href={route('contractors.filter', contractor.con_id)}><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('filter', LANG)}</Link></li>
          <hr/>
          <li><Link href={route('contractors.equipments.add', contractor.con_id)} className={contractor.con_type == 2 ? '' : 'disabled'}><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('equipments', LANG)}</Link></li>
          <li><Link href={route('contractors.meters.add', contractor.con_id)} className={contractor.con_type == 1 ? '' : 'disabled'}><FontAwesomeIcon icon='fa-solid fa-plus' /> {translate('meters', LANG)}</Link></li>
        </ul>
      </div>
      <div className="background-layer" onClick={() => changeOpen(!openBy)}></div>
    </div>
  )
}

export default ContractorModal
