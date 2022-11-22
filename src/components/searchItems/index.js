import {Component} from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {FiSearch} from 'react-icons/fi'

class SearchItems extends Component {
  state = {searchInput: ''}

  logOutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  submitinForm = async event => {
    const {searchInput} = this.state
    event.preventDefault()
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // <Redirect to=`/insta-share/posts?search=${searchInput}` />
    console.log(data)
  }

  inputElement = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    return (
      <>
        <div className="containe-din-main">
          <nav className="nav-main-div">
            <div className="nav-container">
              <Link to="/">
                <img
                  className="logo"
                  alt="website logo"
                  src="https://res.cloudinary.com/dj2ghn49v/image/upload/v1668843404/Group_1_oosqzu.png"
                />
              </Link>
              <h1 className="main-heading">Insta Share</h1>
            </div>
            <div className="nav-content-div">
              <form onSubmit={this.submitinForm} className="search-bar">
                <input
                  onChange={this.inputElement}
                  placeholder="Search Caption"
                  className="search-input"
                  type="search"
                />
                <button className="search-icon" type="submit">
                  <FiSearch />
                </button>
              </form>
              <Link to="/">
                <p className="nav-text">Home</p>
              </Link>
              <Link to="/insta-share/my-profile">
                {/* <p className="nav-text">Profile</p> */}Profile
              </Link>
              <button
                onClick={this.logOutBtn}
                className="logout-btn"
                type="submit"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </>
    )
  }
}
export default withRouter(SearchItems)
