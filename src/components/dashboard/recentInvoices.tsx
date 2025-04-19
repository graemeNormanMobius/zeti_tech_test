import { SubHeader } from "../subHeader.tsx";

export function RecentInvoices() {

    return (
        <div className="standardCard">
            <SubHeader
                value={'Recent Invoices'}
                showInfo={true}
                tooltipPlacement={'top'}
                tooltipContent={`A view of recent invoices historically on a month basis`}
            />
        </div>
    )
}
