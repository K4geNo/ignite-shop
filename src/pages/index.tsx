import "keen-slider/keen-slider.min.css"

import { HomeContainer, Product } from "@/styles/pages/home"
import { MouseEvent, useEffect, useState } from "react"

import { CartButton } from "@/components/CartButton"
import { GetStaticProps } from "next"
import Head from "next/head"
import { IProduct } from "@/contexts/CartContext"
import Image from "next/image"
import Link from "next/link"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { useCart } from "@/hooks/useCart"
import { useKeenSlider } from "keen-slider/react"

interface HomeProps {
    products: IProduct[]
}

export default function Home({ products }: HomeProps) {
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 2,
            spacing: 48,
        },
    })

    const [isLoading, setIsLoading] = useState(true)

    const { addToCart, checkIfProductExistsInCart } = useCart()

    function handleAddToCart(
        e: MouseEvent<HTMLButtonElement>,
        product: IProduct
    ) {
        e.preventDefault()

        addToCart(product)
    }

    return (
        <>
            <Head>
                <title>Home | Ignite Shop</title>
            </Head>

            <HomeContainer ref={sliderRef} className="keen-slider">
                {products.map((product) => (
                    <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                        legacyBehavior
                        prefetch={false}
                    >
                        <Product className="keen-slider__slide">
                            <Image
                                src={product.imageUrl}
                                width={520}
                                height={480}
                                alt=""
                            />

                            <footer>
                                <div>
                                    <strong>{product.name}</strong>
                                    <span>{product.price}</span>
                                </div>

                                <CartButton
                                    color="green"
                                    size="large"
                                    onClick={(e) => handleAddToCart(e, product)}
                                    disabled={checkIfProductExistsInCart(
                                        product.id
                                    )}
                                />
                            </footer>
                        </Product>
                    </Link>
                ))}
            </HomeContainer>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ["data.default_price"],
    })

    const products = response.data.map((product) => {
        const price = product.default_price as Stripe.Price

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(price.unit_amount! / 100),
            numberPrice: price.unit_amount! / 100,
            defaultPriceId: price.id,
        }
    })

    return {
        props: {
            products,
        },
        revalidate: 60 * 60 * 2, // 2 hours
    }
}
