import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
}

const DashboardCard = ({ title, subtitle, body }: DashboardCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    )
}

export default DashboardCard