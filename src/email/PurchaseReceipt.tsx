import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Tailwind,
} from "@react-email/components"
import OrderInformation from "./_components/OrderInformation"

type Props = {
    product: {
        name: string
        imagePath: string
        description: string
    }
    order: { id: string; createdAt: Date; pricePaidInCents: number }
    downloadVerificationId: string
}

const PurchaseReceipt = ({ order, product, downloadVerificationId }: Props) => {
    return (
        <Html>
            <Preview>Download {product.name} and view receipt</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Purchase Receipt</Heading>
                        <OrderInformation
                            order={order}
                            product={product}
                            downloadVerificationId={downloadVerificationId}
                        />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

PurchaseReceipt.PreviewProps = {
    product: {
        name: "Product name",
        description: "Some description",
        imagePath:
            "/products/5aba7442-e4a5-4d2e-bfa7-5bd358cdad64-02 - What Is Next.js.jpg",
    },
    order: {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaidInCents: 10000,
    },
    downloadVerificationId: crypto.randomUUID(),
} satisfies Props

export default PurchaseReceipt