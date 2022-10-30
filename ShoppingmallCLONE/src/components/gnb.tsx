import { Link } from 'react-router-dom'

const Gnb = () => (
  <nav className="gnb">
    <ul>
      <li className = "head"><pre>헤더(임시)</pre></li>
      <li className ="header-home">
        <Link to="/">홈</Link>
      </li>
      <li className = 'header-tag'>
        <Link to="/products">상품목록</Link>
      </li>
      <li className ='header-cart'>
        <Link to="/cart">장바구니</Link>
      </li>
    </ul>
  </nav>
)

export default Gnb

/*this.template=``
this.render=this.template */