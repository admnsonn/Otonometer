import Profile from "./Profile"
import Footer from "../../components/Footer"
import Navbar from "../../components/Header/Navbar"

const Profilepage = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Profile />
      <Footer />
    </div>
  )
}

export default Profilepage