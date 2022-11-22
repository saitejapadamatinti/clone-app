import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'
import UserPostDetails from '../UserPostDetails'
// import PostIem from '../PostIem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class ItemBanner extends Component {
  state = {
    storyList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPostes()
  }

  getPostes = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedDetails = data.posts.map(eachPost => ({
        commentsDetails: eachPost.comments,
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postDetails: {
          caption: eachPost.post_details.caption,
          imageUrl: eachPost.post_details.image_url,
        },
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        postUserId: eachPost.user_id,
        postUserName: eachPost.user_name,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        storyList: updatedDetails,
      })
    }
  }

  render() {
    const {storyList} = this.state
    return (
      <>
        <div className="home-main-full-div">
          <div className="home-main-div">
            {/* <PostIem storyList={storyList} /> */}
            <ul className="home-ul-item">
              {storyList.map(each => (
                <UserPostDetails storyList={each} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}
export default ItemBanner
