import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
    <div className="not-found-div">
      <img
        className="not-found-image"
        alt="not-found"
        src="https://res.cloudinary.com/dj2ghn49v/image/upload/v1669006031/Layer_2_yr6skh.png"
      />
      <h1 className="not-heading">Page Not Found</h1>
      <p className="not-para not-para-1">
        we are sorry, the page you requested could not be found.
      </p>
      <p className="not-para not-para-2">Please go back to the homepage.</p>
      <Link to="/">
        <button className="not-button" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </>
)
export default NotFound
