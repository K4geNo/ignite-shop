import { GetStaticPaths, GetStaticProps } from "next"
import {
    ImageContainer,
    ProductContainer,
    ProductDetails,
} from "@/styles/pages/product"

import Head from "next/head"
import { IProduct } from "@/contexts/CartContext"
import Image from "next/image"
import Stripe from "stripe"
import axios from "axios"
import { stripe } from "@/lib/stripe"
import { useCart } from "@/hooks/useCart"
import { useState } from "react"

interface ProductProps {
    product: IProduct
}

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
        useState(false)

    const { checkIfProductExistsInCart, addToCart } = useCart()

    const itemAlreadyExistsInCart = checkIfProductExistsInCart(product.id)

    return (
        <>
            <Head>
                <title>Product | Ignite Shop</title>
            </Head>

            <ProductContainer>
                <ImageContainer>
                    <Image
                        src={product.imageUrl}
                        width={520}
                        height={480}
                        alt=""
                    />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>

                    <button
                        onClick={() => addToCart(product)}
                        disabled={itemAlreadyExistsInCart}
                    >
                        {itemAlreadyExistsInCart
                            ? "Produto já está no carrinho"
                            : "Adicionar ao carrinho"}
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
    params,
}) => {
    if (!params) return { notFound: true }

    const productId = params.id

    const product = await stripe.products.retrieve(productId, {
        expand: ["default_price"],
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(price.unit_amount! / 100),
                description: product.description,
                defaultPriceId: price.id,
                numberPrice: price.unit_amount! / 100,
            },
        },
        revalidate: 60 * 60 * 1, // 1 hours
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await stripe.products.list()

    const paths = products.data.map((product) => ({
        params: { id: product.id },
    }))

    return {
        paths,
        fallback: "blocking",
    }
}
