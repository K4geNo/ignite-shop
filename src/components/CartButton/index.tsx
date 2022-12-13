import { CartButtonContainer } from "./styles"
import { ComponentProps } from "react"
import { Handbag } from "phosphor-react"

type CartButtonProps = ComponentProps<typeof CartButtonContainer>

export function CartButton({ ...rest }: CartButtonProps) {
    return (
        <CartButtonContainer {...rest}>
            <Handbag weight="bold" />
        </CartButtonContainer>
    )
}
