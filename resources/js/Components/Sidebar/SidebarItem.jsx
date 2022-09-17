import { useState } from "react";

import { Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarItem = ({ mainURL, mainText, mainIcon, subLinks, name }) => {

  const [toggle, setToggle] = useState(false);

  return (
    <div className="sidebar-links-container">
      <div className={'sidebar-link'}>
        <Link href={route(mainURL)}><FontAwesomeIcon icon={"fa-solid " + mainIcon} /> {mainText}</Link>
        {localStorage.getItem('lang') == 'arabic' && (
          <FontAwesomeIcon
            onClick={() => setToggle(!toggle)}
            icon={toggle === true ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-left"}
          />
        )}
        {localStorage.getItem('lang') == 'english' && (
          <FontAwesomeIcon
            onClick={() => setToggle(!toggle)}
            icon={toggle === true ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-right"}
          />
        )}
      </div>
      <div className="sidebar-sublinks" style={{ display: toggle === true ? 'block' : 'none'  }}>
        {subLinks.map((link, i) => (
          <Link key={i} className='sub-link' href={route(link.url)}>{link.text}</Link>
        ))}
      </div>
    </div>
  )
}

export default SidebarItem
