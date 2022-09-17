import './index.scss'

import { useState } from "react";

import Sidebar from "@/Components/Sidebar/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";
import { usePage } from "@inertiajs/inertia-react";
import { Alert, AlertTitle } from "@mui/material";

import { Snackbar } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const bodyID = document.querySelector('body')

const Layout = ({ children }) => {

  const { flash, userData } = usePage().props
  localStorage.setItem('lang', userData.language)

  const [openFlash, setFlash] = useState(true)

  const closeFlashMessages = () => {
    setFlash(false)
  }
  bodyID.classList.add('app-body-' + userData.theme)
  bodyID.classList.add('app-body-' + userData.language)

  return (
    <div className={"website-layout app-" + userData.theme + " website-layout-" + userData.language}>

      <Sidebar />

      <div className="right">
        <Navbar />

        <div className="page-content">
          <div className="flash-messages">
            {flash.msg != null && (
              <Snackbar open={openFlash} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} onClose={closeFlashMessages}>
                <Alert severity={flash.msg_type ?? 'success'} onClose={closeFlashMessages}>
                  {flash.msg}
                </Alert>
              </Snackbar>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
