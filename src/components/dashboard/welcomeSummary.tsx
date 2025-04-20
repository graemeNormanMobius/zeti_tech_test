import { SubHeader } from "../subHeader.tsx";
import { useContext, useEffect, useState } from "react";
import { Vehicle } from "../../models/models.tsx";
import { costPerMile, getUserClientId } from "../../utils/utils.tsx";
import { LoadingAnimation } from "../loadingAnimation.tsx";
import { ThemeContextV2 } from "../../context/themeContext.tsx";
import { StatusError } from "../errorComponent.tsx";

export function WelcomeSummary() {
    const { isDarkTheme } = useContext(ThemeContextV2);
    const [vehicles, setVehicles] = useState<Vehicle[] | []>([]);
    const [loading, setLoading] = useState(true);

    const currentUsersClientId = getUserClientId();

    useEffect(() => {
        // fetch(`/api/timestamps`)
        fetch(`/api/vehicles?clientId=${currentUsersClientId.clientId}`)
            .then((res) => res.json())
            .then((data) => {
                setVehicles(data);
                // setVehicles(data[0].vehicles);
                setTimeout(() => {
                    setLoading(false);
                }, 1500);

            })
            .catch(() => {
                setLoading(false);
            });
    }, [!vehicles.length]); // !vehicles.length

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
                        Current Month Billing <br />
                        <div className="bodyLargeEmp">&pound;231.98</div>
                    </div>
                    <span className="bodyXSmall monthlyMilesTotal">across XXXX miles</span>
                </div>
            </div>
        </div>
    )
}
