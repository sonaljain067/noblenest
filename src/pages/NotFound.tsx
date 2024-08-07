import { MdError } from "react-icons/md"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="container not-found">
        <MdError/>
        <Link to="/"><h1>Page Not Found</h1></Link>
    </div>
  )
}

export default NotFound