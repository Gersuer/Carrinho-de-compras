import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { useContext } from 'react'
import { CartContext } from '../../context/contextApi';

const Header = () => {
  const { amount } = useContext(CartContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.nav_home} to='/'>
          devShop
        </Link>
        <Link className={styles.nav_cart} to='/cart'>
          <FiShoppingCart size={26} color='#121212' />
          {amount > 0 &&
            <span>
              {amount}
            </span>}
        </Link>
      </nav>
    </header>
  )
}

export default Header