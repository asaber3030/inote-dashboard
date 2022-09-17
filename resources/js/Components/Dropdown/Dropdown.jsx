import './dropdown.scss'

import React from "react"

const Dropdown = ({ openBy,  }) => {

  const [state, setState] = useState(false);

  return (
    <div className="dropdown-menu" openBy={openBy}>

    </div>
  )
}
