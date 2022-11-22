import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import {BsHeart, BsChat} from 'react-icons/bs'
import {ImShare2} from 'react-icons/im'
import {FcLike} from 'react-icons/fc'

class UserPostDetails extends Component {
  state = {likesCount: 10, isLiked: false}

  likeButton = () => {
    const {isLiked} = this.state
    if (isLiked === false) {
      this.setState(prevState => ({likesCount: prevState.likesCount + 1}))
    } else {
      this.setState(prevState => ({likesCount: prevState.likesCount - 1}))
    }
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
    }))
    console.log('dfg')
  }

  render() {
    const {likesCount} = this.state
    const {storyList} = this.props
    const {
      commentsDetails,
      createdAt,
      postDetails,
      postId,
      postUserId,
      postUserName,
      profilePic,
    } = storyList

    const {isLiked} = this.state

    return (
      <li className="li-item">
        <div>
          <div className="post-user-details">
            <div className="post-user-border">
              <img
                className="post-user-image"
                alt={postDetails.postId}
                src={profilePic}
              />
            </div>
            <Link className="link-name" to={`/insta-share/users/${postUserId}`}>
              <p className="poste-user-name">{postUserName}</p>
            </Link>
          </div>
          <div>
            <img className="post-image" alt="d" src={postDetails.imageUrl} />
          </div>
          <div className="bottom-content">
            <div className="icons content-marigin">
              <button
                onClick={this.likeButton}
                className="like-btn"
                type="button"
              >
                {isLiked ? (
                  <FcLike className="red-like-icon" />
                ) : (
                  <BsHeart className="like-icon" />
                )}
              </button>

              <BsChat />
              <ImShare2 />
            </div>
            <p className="likes-count content-marigin">{likesCount} likes</p>
            <p className="content-marigin caption">{postDetails.caption}</p>
            <div>
              {commentsDetails.map(each => (
                <div className="content-marigin comments-div">
                  <p className="comment-user">{each.user_name}</p>
                  <p className="user-comment">{each.comment}</p>
                </div>
              ))}
            </div>
            <p className="created-at">{createdAt}</p>
          </div>
        </div>
      </li>
    )
  }
}

export default UserPostDetails
