import styles from './Cart.module.css'
import { useContext } from 'react'
import { CartContext } from '../../context/contextApi'
import { ProductProps } from '../home/Home'
const Cart = () => {
  const { cart, payment, addItem, total, removeCartItem } = useContext(CartContext);

  function handleItem(newItem: ProductProps) {
    addItem(newItem)
  }

  return (
    <div className={styles.cart_container}>
      <h2>Meu carrinho</h2>
      {cart.length > 0 ? (
        cart.map(item => (
          <section key={item.id} className={styles.cart_item}>
            <img src={item.cover} alt={item.title} />
            <span>{item.title}</span>
            <div className={styles.btns}>
              <button
                onClick={() => removeCartItem(item)}
                className={styles.btn}>
                -
              </button>
              {item.amount}
              <button
                onClick={() => handleItem(item)}
                className={styles.btn}>
                +
              </button>
            </div>
            <span>Subtotal: {item.total.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL'
            })}</span>
          </section>
        ))
      ) : ('')}
      <div className={styles.total_container}>
        {payment !== 0 &&
          <span>Valor Total: {total.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })}</span>
        }
      </div>
    </div>
  )
}

export default Cart