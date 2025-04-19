import { SubHeader } from "../subHeader.tsx";

export function WelcomeSummary() {

    return (
        <div className="standardCard">
            <div className="bodyLargeEmp">Bob's Taxis Dashboard</div>
            <p className="bodyMed">Welcome back to your fleets dashboard.</p>

            <div className="summaryBlockContainer dirrRow">
                <div className="summaryBlock">
                    <SubHeader
                        value={'Fleet Metrics'}
                        showInfo={true}
                        tooltipPlacement={'top'}
                        tooltipContent={`A summary of the total number of vehicles in your fleet and the cost charged per mile`}
                    />
                    <div className="bodySmall">Fleet: {'XXXX'} vehicles</div>
                    <div className="bodySmall">Rate: &pound;0.207 per mile</div>
                </div>
                <div className="summaryBlock highlight">
                    <SubHeader
                        value={'Current Month Billing'}
                        showInfo={true}
                        tooltipPlacement={'top'}
                        tooltipContent={`A summary of the current month's billing amount and total miles accumulated (can be up to 24hrs behind)`}
                    />
                    <div className="bodySmall">
                        Current Month Billing <br />
                        <div className="bodyLargeEmp">&pound;231.98</div>
                    </div>
                    <span className="bodyXSmall monthlyMilesTotal">across XXXX miles</span>
                </div>
            </div>
        </div>
    )
}
