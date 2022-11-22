import React, {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import './index.css'

export default class MultipleItems extends Component {
  state = {
    storyData: [],
  }

  componentDidMount() {
    this.getPostes()
  }

  getPostes = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedStoryData = data.users_stories.map(each => ({
        storyUrl: each.story_url,
        storyId: each.user_id,
        userName: each.user_name,
      }))
      this.setState({
        storyData: updatedStoryData,
      })
    }
  }

  render() {
    const {storyData} = this.state

    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            arrows: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
            infinite: true,
            arrows: false,
            swipe: true,
          },
        },
      ],
    }

    return (
      <div className="slick-cont">
        <div className="slick-main-div">
          <div className="slick-div">
            <Slider class="slick-item" {...settings}>
              {storyData.map(each => (
                <div className="slick-item">
                  <img
                    className="story-image"
                    alt={each.storyId}
                    src={each.storyUrl}
                  />
                  <p className="story-para">{each.userName}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    )
  }
}
