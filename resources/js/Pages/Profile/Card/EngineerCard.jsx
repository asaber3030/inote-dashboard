import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import formatDate from "@/resources/helpers/format-date";
import {Tooltip} from "@mui/material";
import {Link} from "@inertiajs/inertia-react";
import translate from "@/resources/translations/translate";

const EngineerCard = ({ user }) => {
  return (
    <div className="right-items">
      <ul>
        <li><span><FontAwesomeIcon icon='fa-solid fa-at' /> {translate('email', user.language)}</span> <span>{user.email}</span></li>
        <li><span><FontAwesomeIcon icon='fa-solid fa-id-card' /> {translate('username', user.language)}</span> <span>@{user.username}</span></li>
        <li><span><FontAwesomeIcon icon='fa-solid fa-phone' /> {translate('phone', user.language)}</span> <span>+20 {user.phone}</span></li>
        <li><span><FontAwesomeIcon icon='fa-solid fa-id-card' /> {translate('jobTitle', user.language)}</span> <span>{user.title}</span></li>
        <li><span><FontAwesomeIcon icon='fa-solid fa-hashtag' /> {translate('id', user.language)}</span> <span>{user.id}</span></li>
        <li><span><FontAwesomeIcon icon='fa-solid fa-user-shield' /> {translate('adminRole', user.language)}</span> <span className='text-success'>{user.is_admin == 1 ? 'Admin' : 'Super Admin'}</span></li>
        <li><span><FontAwesomeIcon icon='fa-solid fa-clock' /> {translate('joinedIn', user.language)}</span> <span>{formatDate(user.created_at)}</span></li>
        <li><span><FontAwesomeIcon icon='fa-solid fa-clock' /> {translate('lastUpdate', user.language)}</span> <span>{formatDate(user.updated_at)}</span></li>
      </ul>
      <div className="links">
        <Tooltip title={translate('timeline', user.language)}><Link href={route('profile.timeline')}><FontAwesomeIcon icon='fa-fw fa-solid fa-timeline' /></Link></Tooltip>
        <Tooltip title={translate('export', user.language)}><Link href={route('profile.export-data')}><FontAwesomeIcon icon='fa-fw fa-solid fa-globe' /></Link></Tooltip>
        <Tooltip title={translate('password', user.language)}><Link href={route('profile.password')}><FontAwesomeIcon icon='fa-fw fa-solid fa-user-lock' /></Link></Tooltip>
        <Tooltip title={translate('theme', user.language)}><Link href={route('profile.theme')}><FontAwesomeIcon icon='fa-fw fa-solid fa-palette' /></Link></Tooltip>
        <Tooltip title={translate('language', user.language)}><Link href={route('profile.language')}><FontAwesomeIcon icon='fa-fw fa-solid fa-globe-africa' /></Link></Tooltip>
      </div>
    </div>

  )
}

export default EngineerCard
