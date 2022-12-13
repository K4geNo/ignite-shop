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

export function Cart() {
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
                        {/* <p>Seu carrinho está vazio</p> */}

                        <CartProduct>
                            <CardProductImage>
                                <Image
                                    src="https://s3-alpha-sig.figma.com/img/387d/13ce/de131bd1ccf9bbe6b2331e88d3df20cd?Expires=1672012800&Signature=AHopghausC0rJfV3jgbRMMX9Ec87ND3quYJZxPKI6jA~--Jff1ASeE~LfWDsPpFXI18mFxNC5aEgfDFPC35W3-q8XqD53lMik9Z8jtnHT3eRhDxRQeKOXJURw8JMPW3elOYGizZjFNFzGdi-PCEoTeg5ER5CdupLCFK50qDMwCI28vxEStOgzq9d-w6cR1HKdg1eZ14N5dWHhmcfEw0OKCXqe1Hpc9PGqJDLEjdNhgjC6Ir24-2E9iOnzo~4qIDnC2fAehB1z8GMRaPwedJQTFOI5J8N6bLo1KuPQNhJNUu64fvGHRsezFe5ACpVIGkob9dR6D6s9h0vDK68e7TzSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                    width={100}
                                    height={93}
                                    alt=""
                                />
                            </CardProductImage>

                            <CartProductDetails>
                                <p>Produto X</p>

                                <strong>R$ 50,99</strong>

                                <button>Remover</button>
                            </CartProductDetails>
                        </CartProduct>
                    </section>

                    <CartFooter>
                        <CartFooterDetails>
                            <div>
                                <span>Quantidade</span>
                                <p>2 itens</p>
                            </div>
                            <div>
                                <span>Valor total</span>
                                <p>R$ 100,00</p>
                            </div>
                        </CartFooterDetails>
                        <button>Finalizar Compra</button>
                    </CartFooter>
                </CartContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
