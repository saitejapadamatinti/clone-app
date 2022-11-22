import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class MyProfile extends Component {
  state = {
    userProfieData: [],
    userPostData: [],
    userStoriesData: [],
  }

  componentDidMount() {
    this.getUserprofileData()
  }

  getUserprofileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedUserProfieData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }

      const UpdatedUserPostData = data.profile.posts.map(each => ({
        postId: each.id,
        postImage: each.image,
      }))

      const UpdatedStoriesData = data.profile.stories.map(each => ({
        storiesId: each.id,
        storiesImage: each.image,
      }))

      this.setState({
        userProfieData: updatedUserProfieData,
        userPostData: UpdatedUserPostData,
        userStoriesData: UpdatedStoriesData,
      })
    }
  }

  render() {
    const {userProfieData, userPostData, userStoriesData} = this.state
    return (
      <>
        <Header />
        <div className="main-div">
          <div className="main-div-container">
            {/* 
            Laptop user profile details start 
            */}
            <div className="user-details-div">
              <div className="user-profile-pic-div">
                <img
                  className="user-profile-pic"
                  alt={userProfieData.id}
                  src={userProfieData.profilePic}
                />
              </div>
              <div>
                <h1 className="margin-bottom-div user-name-heading">
                  {userProfieData.userName}
                </h1>
                <div className="margin-bottom-div post-following-followers-div">
                  <p className="post-count">
                    {userProfieData.postsCount}
                    <span className="post"> posts</span>
                  </p>
                  <p className="post-count">
                    {userProfieData.followersCount}
                    <span className="post"> followers</span>
                  </p>
                  <p className="post-count">
                    {userProfieData.followingCount}
                    <span className="post"> following</span>
                  </p>
                </div>
                <p className="margin-bottom-div user-insta-id">
                  {userProfieData.userId}
                </p>
                <p className="margin-bottom-div user-bio-data">
                  {userProfieData.userBio}
                </p>
              </div>
            </div>
            {/* 
            Laptop user profile details End 
            ------------------------------------------------------------------------------------------------------
            Mobile user profile details start 
            */}

            <div className="user-details-div-mobile">
              <h1 className="margin-bottom-div user-name-heading-mobile">
                {userProfieData.userName}
              </h1>
              <div className="user-profile-pic-div-mobile">
                <img
                  className="user-profile-pic-mobile"
                  alt={userProfieData.id}
                  src={userProfieData.profilePic}
                />
                <div className="margin-bottom-div-mobile post-following-followers-div-mobile">
                  <p className="post-count-mobile post-count">
                    {userProfieData.postsCount}
                    <span className="post"> posts</span>
                  </p>
                  <p className="post-count-mobile post-count">
                    {userProfieData.followersCount}
                    <span className="post"> followers</span>
                  </p>
                  <p className="post-count-mobile post-count">
                    {userProfieData.followingCount}
                    <span className="post"> following</span>
                  </p>
                </div>
              </div>
              <div>
                <p className="margin-bottom-div user-insta-id">
                  {userProfieData.userId}
                </p>
                <p className="margin-bottom-div user-bio-data">
                  {userProfieData.userBio}
                </p>
              </div>
            </div>
            {/* 
            Mobile user profile details End 
            */}
            <div className="stories-main-div">
              {userStoriesData.map(each => (
                <div className="story-img-div">
                  <img
                    className="story-image"
                    alt={each.storiesId}
                    src={each.storiesImage}
                  />
                </div>
              ))}
            </div>
            <hr className="horizantal-line" />
            <div className="post-div">
              <BsGrid3X3 className="grid-icon" />
              <h3 className="post-head">Posts</h3>
            </div>
            <ul className="ul-item">
              {userPostData.map(each => (
                <li className="poste-image">
                  <img
                    className="post-image"
                    alt={each.postId}
                    src={each.postImage}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}
export default MyProfile
