import { SubHeader } from "../subHeader.tsx";
import {Fragment, useContext, useEffect, useState} from "react";
import { costPerMile, fleetCurrentMonthRollingInvoiceCost, fleetTotalMileage, getUserClientId } from "../../utils/utils.tsx";
import { LoadingAnimation } from "../loadingAnimation.tsx";
import { ThemeContextV2 } from "../../context/themeContext.tsx";
import { StatusError } from "../errorComponent.tsx";
import { useVehicles } from "../../context/vehicleContext.tsx";

export function WelcomeSummary() {
    const { isDarkTheme } = useContext(ThemeContextV2);
    const { vehicles, fleetMileage, fleetMonthlyCost, updateFleetMileage, updateFleetMonthlyCost } = useVehicles();
    const [loading, setLoading] = useState(true);
    const currentUsersClientId = getUserClientId();

    let totalFleetMileage: number = 0;
    let totalMonthlyFleetCost: number = 0;

    useEffect(() => {
        if (vehicles.length > 0) {
            totalFleetMileage = fleetTotalMileage(vehicles);
            totalMonthlyFleetCost = fleetCurrentMonthRollingInvoiceCost(vehicles);
            updateFleetMileage(totalFleetMileage);
            updateFleetMonthlyCost(totalMonthlyFleetCost);


            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    }, [vehicles]);

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
                    {currentUsersClientId === null && (
                        <StatusError message={'Unable to find clientId'} />
                    )}
                    {loading ? (
                        <LoadingAnimation
                            isDarkMode={isDarkTheme}
                            skeletonType={'thinTextComponent'}
                            fixedWidth={100}
                        />
                    ) : (
                        <div className="bodySmall">Fleet: {vehicles ? vehicles.length + ' vehicles' : '-'} </div>
                    )}
                    {loading ? (
                        <LoadingAnimation
                            isDarkMode={isDarkTheme}
                            skeletonType={'thinTextComponent'}
                            fixedWidth={100}
                        />
                    ) : (
                        <div className="bodySmall">Rate: &pound;{costPerMile} per mile</div>
                    )}
                </div>
                <div className="summaryBlock highlight">
                    <SubHeader
                        value={'Current Month Billing'}
                        showInfo={true}
                        tooltipPlacement={'top'}
                        tooltipContent={`A summary of the current month's billing amount and total miles accumulated (can be up to 24hrs behind)`}
                    />
                    <div className="bodySmall">
                        {loading ? (
                            <LoadingAnimation
                                alwaysDarkMode={true}
                                isDarkMode={isDarkTheme}
                                skeletonType={'thickTextComponent'}
                                fixedWidth={100}
                            />
                        ) : (
                            <div className="totalFleetMileage">
                                <Fragment>
                                    <span className="bodyLargeEmp monthlyMilesTotal">&pound;{fleetMonthlyCost.toFixed(2)}</span>
                                    <span className="bodyXSmall">across {fleetMileage} miles</span>
                                </Fragment>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
