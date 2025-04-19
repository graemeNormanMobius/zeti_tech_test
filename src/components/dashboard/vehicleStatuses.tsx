import { SubHeader } from "../subHeader.tsx";
import { useContext, useEffect, useState } from "react";
import { LoadingAnimation } from "../loadingAnimation.tsx";
import { ThemeContextV2 } from "../../context/themeContext.tsx";
import { VehicleStatusError } from "../errorComponent.tsx";

type Vehicle = {
    vin: string;
    licensePlate: string;
    make: string;
    model: string;
    state: {
        odometerInMeters: number;
        speedInMph: number;
        asAt: Date;
    }
};

export function VehicleStatuses() {
    const { isDarkTheme } = useContext(ThemeContextV2);
    const [vehicles, setVehicles] = useState<Vehicle[] | []>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/timestamps?date=2021-02-28`)
            .then((res) => res.json())
            .then((data) => {
                setVehicles(data[0].vehicles);
                setTimeout(() => {
                    setLoading(false);
                }, 1500);

            })
            .catch(() => {
                setLoading(false);
            });
    }, [!vehicles.length]);

    return (
        <div className="standardCard">
            <SubHeader
                value={'Vehicle Statuses'}
                showInfo={true}
                tooltipPlacement={'top'}
                tooltipContent={`Quick view summary of individual vehicles`}
            />

            {!vehicles.length && <VehicleStatusError />}

            <div className="summaryBlockContainer dirrCol">
                {loading && (
                    <>
                        <div className="summaryBlock">
                            <div className="skeletonContainer">
                                <LoadingAnimation
                                    isDarkMode={isDarkTheme}
                                    skeletonType={'thickTextComponent'}
                                    fixedWidth={100}
                                />
                                <LoadingAnimation
                                    isDarkMode={isDarkTheme}
                                    skeletonType={'thickTextComponent'}
                                    fixedWidth={100}
                                />
                            </div>
                        </div>
                        <div className="summaryBlock">
                            <div className="skeletonContainer">
                                <LoadingAnimation
                                    isDarkMode={isDarkTheme}
                                    skeletonType={'thickTextComponent'}
                                    fixedWidth={100}
                                />
                                <LoadingAnimation
                                    isDarkMode={isDarkTheme}
                                    skeletonType={'thickTextComponent'}
                                    fixedWidth={100}
                                />
                            </div>
                        </div>
                    </>
                )}

                {!loading && vehicles.length > 0 && vehicles.map((vehicle: Vehicle, index: number) => {
                    return (
                        <div className="summaryBlock" key={index}>
                            <div className="bodyMedEmp">{vehicle.licensePlate}</div>
                            <div className="bodySmall">{'12345'} miles</div>
                            <div className="bodySmall"> &pound;102.15 </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

