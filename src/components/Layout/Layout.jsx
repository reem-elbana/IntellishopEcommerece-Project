import { Outlet } from "react-router-dom"
import Navbar from './../Navbar/Navbar'
import Footer from "../Footer/Footer"
import {useState} from "react"

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className=" pt-20">
        <Outlet />

        <Footer />
      </div>
    </>
  )
}

export default Layout
