import { Link, usePage, InertiaLink } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import translate from "@/resources/translations/translate";

const ProfileSidebar = () => {

  const { userData, appURL, path } = usePage().props

  const user = userData

  return (
    <div className="profile-sidebar">

      <ul className='sidebar-ul'>
        <li><Link className={route('profile.main') == path ? 'active' : ''} href={route('profile.main')}><span><FontAwesomeIcon icon="fa-solid fa-fw fa-address-card" /></span> {translate('username', user.language)}</Link></li>
        <li><Link className={route('profile.contact') == path ? 'active' : ''} href={route('profile.contact')}><span><FontAwesomeIcon icon="fa-solid fa-phone-flip" /></span> {translate('contactInfo', user.language)}</Link></li>
        <li><Link className={route('profile.picture') == path ? 'active' : ''} href={route('profile.picture')}><span><FontAwesomeIcon icon="fa-solid fa-fw fa-image" /></span> {translate('profilePicture', user.language)}</Link></li>
        <hr/>
        <li><Link className={route('profile.password') == path ? 'active' : ''} href={route('profile.password')}><FontAwesomeIcon icon="fa-solid fa-lock" /> {translate('password', user.language)}</Link></li>
        <li><Link className={route('profile.security') == path ? 'active' : ''} href={route('profile.security')}><FontAwesomeIcon icon="fa-solid fa-shield-halved" /> {translate('security', user.language)}</Link></li>
        <hr/>
        <li><Link className={route('profile.theme') == path ? 'active' : ''} href={route('profile.theme')}><FontAwesomeIcon icon="fa-solid fa-palette" /> {translate('theme', user.language)}</Link></li>
        <li><Link className={route('profile.language') == path ? 'active' : ''} href={route('profile.language')}><FontAwesomeIcon icon="fa-solid fa-earth-africa" /> {translate('language', user.language)}</Link></li>
        <hr/>
        <li><Link className={route('profile.export-data') == path ? 'active' : ''} href={route('profile.export-data')}><FontAwesomeIcon icon="fa-solid fa-file-export" /> {translate('exportMyData', user.language)}</Link></li>
        <li><Link className={route('profile.timeline') == path ? 'active' : ''} href={route('profile.timeline')}><FontAwesomeIcon icon="fa-solid fa-timeline" /> {translate('timeline', user.language)}</Link></li>
        <hr/>
        <li><Link className={route('profile.database') == path ? 'active' : ''} href={route('profile.database')}><FontAwesomeIcon icon="fa-solid fa-database" /> {translate('database', user.language)}</Link></li>
        <li><Link className={route('profile.tables') == path ? 'active' : ''} href={route('profile.tables')}><FontAwesomeIcon icon="fa-solid fa-table" /> {translate('DBTables', user.language)}</Link></li>
      </ul>
    </div>
  );
}

export default ProfileSidebar
