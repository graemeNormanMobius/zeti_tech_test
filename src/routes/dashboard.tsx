import { WelcomeSummary } from "../components/dashboard/welcomeSummary.tsx";
import { MileageTrends } from "../components/dashboard/mileageTrends.tsx";
import { VehicleStatuses } from "../components/dashboard/vehicleStatuses.tsx";
import { RecentInvoices } from "../components/dashboard/recentInvoices.tsx";
import { QuickActions } from "../components/dashboard/quickActions.tsx";

export function Dashboard() {

    return (
        <div className="gridContainer">
            <div className='mcCard backgroundFadedBoxShadow spacing-md dashboardSummary'>
                <WelcomeSummary />
            </div>

            <div className='mcCard backgroundFadedBoxShadow spacing-md dashboardMileageTrends'>
                <MileageTrends />
            </div>

            <div className='mcCard backgroundFadedBoxShadow spacing-md dashboardVehicleStatuses'>
                <VehicleStatuses />
            </div>

            <div className='mcCard backgroundFadedBoxShadow spacing-md dashboardRecentInvoices'>
                <RecentInvoices />
            </div>

            <div className='mcCard backgroundFadedBoxShadow spacing-md dashboardQuickActions'>
                <QuickActions />
            </div>
        </div>
    )
}
