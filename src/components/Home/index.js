import {Component} from 'react'
import Header from '../Header'
import MultipleItems from '../Slick'
import ItemBanner from '../ItemBanners'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-div">
        <Header />
        <MultipleItems />
        <ItemBanner />
      </div>
    )
  }
}
export default Home
