import styles from './Home.module.css'
import { BsCartPlus } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useContext } from 'react'
import { CartContext } from '../../context/contextApi';
export interface ProductProps {
    cover: string
    description: string
    id: number
    price: number
    title: string
}
const Home = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const { addItem } = useContext(CartContext);
    useEffect(() => {
        async function getProducts() {
            const response = await api.get('/products');
            setProducts(response.data)
        }
        getProducts();
    },
        [])
    function handleItem(prod: ProductProps) {
        addItem(prod)
    }
    return (
        <div>
            <main className={styles.main_content}>
                <h2>Produtos</h2>
                <div className={styles.products_grid}>
                    {products && products.map((prod) => (
                        <section key={prod.id} className={styles.product_content}>
                            <img src={prod.cover} alt="fone" />
                            <p>{prod.title}</p>
                            <div className={styles.buy_container}>
                                <strong>{prod.price.toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: "BRL"
                                })}</strong>
                                <button
                                    className={styles.buy_btn}
                                    onClick={() => handleItem(prod)}
                                >
                                    <BsCartPlus size={22} color='white' />
                                </button>
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Home