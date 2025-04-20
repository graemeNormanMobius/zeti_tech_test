import { Fragment, useContext, useEffect, useState } from "react";
import { getUserClientId } from "../utils/utils.tsx";
import { ElectricPlugIcon, FuelTypeDieselIcon, FuelTypeElectricIcon, FuelTypePetrolIcon, VehicleIconCar } from "../components/icons.tsx";
import { Button } from "../components/button.tsx";
import { LoadingAnimation } from "../components/loadingAnimation.tsx";
import { ThemeContextV2 } from "../context/themeContext.tsx";
import { useVehicles } from "../context/vehicleContext.tsx";
import { YourFleetQuickActions } from "../components/yourFleet/yourFleetQuickActions.tsx";
import { SubHeader } from "../components/subHeader.tsx";

export function YourFleet() {
    const { isDarkTheme } = useContext(ThemeContextV2);
    const [loading, setLoading] = useState(false);
    const { vehicles, loadVehicles } = useVehicles();
    const currentUsersClientId = getUserClientId();

    useEffect(() => {
        if (vehicles.length === 0) {
            setLoading(true)
            fetch(`/api/vehicles?clientId=${currentUsersClientId.clientId}`)
                .then((res) => res.json())
                .then((data) => {
                    loadVehicles(data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1500);

                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [vehicles.length]);

    return (
        <div className="gridContainer fleetList">
            {/*<div className='mcCard backgroundFadedBoxShadow spacing-md fleetFilterContainer'>*/}
                {/*<div className="standardCard">*/}
                {/*    <div className="bodyMedEmp">Filter(s):</div>*/}
                {/*</div>*/}
            {/*</div>*/}

            <div className='mcCard backgroundFadedBoxShadow spacing-md yourFleetQuickActions'>
                <div className="standardCard">
                    <SubHeader
                        value={'Quick Actions'}
                        showInfo={false}
                        tooltipPlacement={'top'}
                        tooltipContent={``}
                    />
                    <div className="quickLinkOptions">
                        <YourFleetQuickActions />
                        <Button
                            hasIcon="noIcon"
                            size="md"
                            state="disabled"
                            type="secondary"
                            value="Update mileage"
                            isSubmit={false}
                        />
                    </div>
                </div>
            </div>
            {vehicles.length > 0 && vehicles.map((vehicle: any, index: number) => {
                return (
                    <div className='mcCard backgroundFadedBoxShadow spacing-md yourFleetVehicle' key={index}>
                        <div className="standardCard">

                            {loading ? (
                                <LoadingAnimation
                                    isDarkMode={isDarkTheme}
                                    skeletonType={'thickTextComponent'}
                                    fixedWidth={100}
                                />
                            ) : (
                                <Fragment>
                                    <VehicleIconCar className="cardIcon" />
                                    {vehicle.type === 'electric' && <ElectricPlugIcon className="cardSubIcon"/>}
                                </Fragment>
                            )}

                            <div className="vehicleDetails">
                                <div className="detail bodySmall">
                                    {loading ? (
                                        <LoadingAnimation
                                            isDarkMode={isDarkTheme}
                                            skeletonType={'thinTextComponent'}
                                            fixedWidth={100}
                                        />
                                    ) : ( <Fragment>Registration: <span className="bodySmallEmp">{vehicle.licensePlate}</span></Fragment> )}
                                </div>
                                <div className="detail bodySmall">
                                    {loading ? (
                                        <LoadingAnimation
                                            isDarkMode={isDarkTheme}
                                            skeletonType={'thinTextComponent'}
                                            fixedWidth={100}
                                        />
                                    ) : ( <Fragment>Registration: <span className="bodySmallEmp">{vehicle.make}</span></Fragment> )}
                                </div>
                                <div className="detail bodySmall">
                                    {loading ? (
                                        <LoadingAnimation
                                            isDarkMode={isDarkTheme}
                                            skeletonType={'thinTextComponent'}
                                            fixedWidth={100}
                                        />
                                    ) : ( <Fragment>Registration: <span className="bodySmallEmp">{vehicle.model}</span></Fragment> )}
                                </div>
                                <div className="detail bodySmall">
                                    {loading ? (
                                        <LoadingAnimation
                                            isDarkMode={isDarkTheme}
                                            skeletonType={'thinTextComponent'}
                                            fixedWidth={100}
                                        />
                                    ) : (
                                        <Fragment>
                                            Fuel type:
                                            <span className="bodySmallEmp value">
                                                {vehicle.type}
                                                <span className="fuelType">{ vehicle.type === 'petrol' && <FuelTypePetrolIcon/>}</span>
                                                <span className="fuelType">{ vehicle.type === 'diesel' && <FuelTypeDieselIcon/>}</span>
                                                <span className="fuelType">{ vehicle.type === 'electric' && <FuelTypeElectricIcon/>}</span>
                                            </span>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
