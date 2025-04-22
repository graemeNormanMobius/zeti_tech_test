import { RecentInvoices } from "../components/dashboard/recentInvoices.tsx";

export function Billing() {

    return (
        <div className='mcCard backgroundFadedBoxShadow spacing-md mobBenchmark'>
            <div className="standardCard">
                <RecentInvoices />
            </div>
        </div>
    )
}
