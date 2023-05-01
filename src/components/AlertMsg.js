import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AlertMsg = () => {
  return (
    <ToastContainer
      position='top-right'
      hideProgressBar={false}
      newestOnTop
      pauseOnHover
    />
  )
}
export default AlertMsg
