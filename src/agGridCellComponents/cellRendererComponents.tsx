import { Badge } from "../components/badge.tsx";

export const monetaryValueFormatter = (params: any) => {
    return (
        <>
            {params.data.amount
                ? `£${new Intl.NumberFormat().format(params.data.amount)}`
                : '-'
            }
        </>
    );
};

export const cellRendererPaymentIndicator = (params: any) => {
    const statusSentiment = (() => {
        switch (params.data.status) {
            case 'paid':
                return 'positive';
            case 'upcoming':
                return 'highlight';
            case 'pending':
                return 'warning';
            case 'outstanding':
                return 'negative';
            default:
                return 'default';
        }
    })() as 'default' | 'highlight' | 'positive' | 'negative' | 'warning';

    return (
        <div className="paymentStatus">
            <Badge
                sentiment={statusSentiment}
                type="default"
                value={params.data.status}
            />
        </div>
    );
};
