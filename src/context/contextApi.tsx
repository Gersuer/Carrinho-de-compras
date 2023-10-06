import { useState, ReactNode, createContext, useEffect } from 'react'
import { ProductProps } from '../pages/home/Home'

interface ContextDataProps {
    cart: cartProps[]
    amount: number
    addItem: (newItem: ProductProps) => void
    removeCartItem: (item: cartProps) => void
    payment: number
    total: number
}

interface cartProps {
    cover: string
    description: string
    id: number
    price: number
    title: string
    amount: number
    total: number
}

interface childreProps {
    children: ReactNode
}

export const CartContext = createContext({} as ContextDataProps);

function CartContextProvider({ children }: childreProps) {
    const [cart, setCart] = useState<cartProps[]>([]);
    const [payment, setPayment] = useState<number>(0);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let total = 0
        cart.map(item => {
            total = total + item.total
        })
        setPayment(total)
    }, [cart])
    function addItem(newItem: ProductProps) {
        //Caso o item já tenha sido adicionado ao carrinho não queremos que apareça duas vezes, sendo assim é preciso verificar se o item já foi adicionado.
        const indexItem = cart.findIndex(prod => prod.id === newItem.id) //Se o retorno for -1 é por que não existe nenhum item igual.
        if (indexItem !== -1) {
            //Caso seja diferente de -1 significa que já existe um item igual dentro do carrinho.
            const cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].price * cartList[indexItem].amount
            setCart(cartList);
            totalValue(cartList)
            return
        }
        //Caso seja -1 significa que o item está sendo adicionado pela primeira vez.
        const data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }
        setCart(product => [...product, data]);
        totalValue([...cart, data]);
    }

    function removeCartItem(item: cartProps) {
        //indexItem será um array composto somente pelos elementos que tem o id diferente do item recebido.
        const indexItem = cart.findIndex(prod => prod.id === item.id);

        //Caso no carrinho exista mais de uma unidade do item enviado, precisamos remover uma unidade.
        if (cart[indexItem].amount > 1) {
            //Diminuir a quantidade
            const cartList = cart; //pegando os itens do carrinho.
            cartList[indexItem].amount = cartList[indexItem].amount - 1;//removendo uma unidade do item selecionado
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;//alterando o valor total desse item.
            setCart(cartList);//atualizando o carrinho
            totalValue(cartList);//atualizando o valor a ser pago no final
            return
        }
        //Caso tenha apenas uma unidade devemos remover o item
        const removeItem = cart.filter(prod => prod.id != item.id);

        setCart(removeItem);//Altera o array de itens dentro do carrinho.
        totalValue(removeItem);//Calcula o valor total do carrinho depois das alterações.
    }

    //Função que irá controlar o valor total do carrinho;
    function totalValue(items: cartProps[]) {
        const myCart = items;
        //Percorre todo o carrinho e soma todos os valores dos itens
        const result = myCart.reduce((acc, obj) => { return acc + obj.total }, 0);
        //Formata o valor para o tipo monetário.
        result.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        })

        //Atualiza o valor total do carrinho.
        setTotal(result);
    }
    return (
        <CartContext.Provider value={
            {
                cart,
                amount: cart.length,
                addItem,
                payment,
                removeCartItem,
                total
            }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider