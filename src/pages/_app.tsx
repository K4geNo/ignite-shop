import type { AppProps } from "next/app"
import { CartContextProvider } from "@/contexts/CartContext"
import { Container } from "@/styles/pages/app"
import { Header } from "@/components/Header"
import { globalStyles } from "@/styles/global"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CartContextProvider>
            <Container>
                <Header />
                <Component {...pageProps} />
            </Container>
        </CartContextProvider>
    )
}
