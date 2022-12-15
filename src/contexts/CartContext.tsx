import { createContext, useState } from "react"

export interface IProduct {
    id: string
    name: string
    imageUrl: string
    price: string
    numberPrice: number
    description: string
    defaultPriceId: string
}

interface CartContextData {
    cartItems: IProduct[]
    addToCart: (product: IProduct) => void
    checkIfProductExistsInCart: (productId: string) => boolean
    removeProductFromCart: (productId: string) => void
    cartTotal: number
}

interface CartContextProviderProps {
    children: React.ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CartContextProviderProps) {
    const [cartItems, setCartItems] = useState<IProduct[]>([])

    const cartTotal = cartItems.reduce((acc, product) => {
        return acc + product.numberPrice
    }, 0)

    function addToCart(product: IProduct) {
        setCartItems((state) => [...state, product])
    }

    function checkIfProductExistsInCart(productId: string) {
        return cartItems.some((product) => product.id === productId)
    }

    function removeProductFromCart(productId: string) {
        setCartItems((state) =>
            state.filter((product) => product.id !== productId)
        )
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                checkIfProductExistsInCart,
                removeProductFromCart,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
