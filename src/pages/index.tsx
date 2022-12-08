import { styled } from "@/styles"

const Button = styled("button", {
    backgroundColor: "#ffeadb",
    cursor: "pointer",
    borderRadius: 4,
    border: "none",
    padding: "4px 8px",

    span: {
        color: "#ff0000",
    },

    "&:hover": {
        backgroundColor: "#ffeadb",
        filter: "brightness(0.9)",
    },
})

export default function Home() {
    return (
        <Button>
            <span>Click me</span>
        </Button>
    )
}
