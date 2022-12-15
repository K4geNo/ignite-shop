import * as Dialog from "@radix-ui/react-dialog"

import {
    CardProductImage,
    CartClose,
    CartContent,
    CartFooter,
    CartFooterDetails,
    CartProduct,
    CartProductDetails,
} from "./styles"

import { CartButton } from "../CartButton"
import Image from "next/image"
import { X } from "phosphor-react"
import axios from "axios"
import { useCart } from "@/hooks/useCart"
import { useState } from "react"

export function Cart() {
    const { cartItems, removeProductFromCart, cartTotal } = useCart()

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
        useState(false)

    const cartQuantity = cartItems.length

    const cartTotalFormatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(cartTotal)

    async function handleCheckout() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post("/api/checkout", {
                products: cartItems,
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (error) {
            alert("Erro ao realizar checkout. Tente novamente.")
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <CartButton />
            </Dialog.Trigger>

            <Dialog.Portal>
                <CartContent>
                    <CartClose>
                        <X size={24} weight="bold" />
                    </CartClose>

                    <h2>Sacola de compras</h2>

                    <section>
                        {cartQuantity <= 0 && <p>Seu carrinho está vazio.</p>}

                        {cartItems.map((product) => (
                            <CartProduct key={product.id}>
                                <CardProductImage>
                                    <Image
                                        src={product.imageUrl}
                                        width={100}
                                        height={93}
                                        alt=""
                                    />
                                </CardProductImage>

                                <CartProductDetails>
                                    <p>{product.name}</p>

                                    <strong>{product.price}</strong>

                                    <button
                                        onClick={() =>
                                            removeProductFromCart(product.id)
                                        }
                                    >
                                        Remover
                                    </button>
                                </CartProductDetails>
                            </CartProduct>
                        ))}
                    </section>

                    <CartFooter>
                        <CartFooterDetails>
                            <div>
                                <span>Quantidade</span>
                                <p>
                                    {cartQuantity}{" "}
                                    {cartQuantity === 1 ? "item" : "itens"}
                                </p>
                            </div>
                            <div>
                                <span>Valor total</span>
                                <p>{cartTotalFormatted}</p>
                            </div>
                        </CartFooterDetails>
                        <button
                            onClick={handleCheckout}
                            disabled={
                                isCreatingCheckoutSession || cartQuantity <= 0
                            }
                        >
                            Finalizar Compra
                        </button>
                    </CartFooter>
                </CartContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
