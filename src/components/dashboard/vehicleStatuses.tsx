import { SubHeader } from "../subHeader.tsx";
import { useContext, useEffect, useState } from "react";
import { LoadingAnimation } from "../loadingAnimation.tsx";
import { ThemeContextV2 } from "../../context/themeContext.tsx";
import { StatusError } from "../errorComponent.tsx";
import { calculateMileageAndCostToDate, getFirstOfCurrentMonth, getTodayAsISODate, getTodaysDate } from "../../utils/utils.tsx";
import { Vehicle } from "../../models/models.tsx";

export function VehicleStatuses() {
    const { isDarkTheme } = useContext(ThemeContextV2);
    const [vehiclesTwo, setVehiclesTwo] = useState<Vehicle[] | []>([]);
    const [loading, setLoading] = useState(true);
    const today = getTodaysDate();

    useEffect(() => {
        const currentDate = getTodayAsISODate();
        const firstOfCurrentMonth = getFirstOfCurrentMonth(today);

        const fetch1 = fetch(`/api/timestamps?date=${currentDate}`).then(res => res.json());
        const fetch2 = fetch(`/api/timestamps?date=${firstOfCurrentMonth}`).then(res => res.json());

        Promise.all([fetch1, fetch2])
            .then(([result1, result2]) => {
                const currentMonthlyMiles = calculateMileageAndCostToDate(
                    result1,
                    result2
                );

                setVehiclesTwo(currentMonthlyMiles);
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [!vehiclesTwo.length]);

    // useEffect(() => {
    //     fetch(`/api/timestamps?date=2021-02-28`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setVehiclesTwo(data[0].vehiclesTwo);
    //             setTimeout(() => {
    //                 setLoading(false);
    //             }, 1500);
    //
    //         })
    //         .catch(() => {
    //             setLoading(false);
    //         });
    // }, [!vehiclesTwo.length]);

    return (
        <div className="standardCard">
            <SubHeader
                value={'Vehicle Statuses'}
                showInfo={true}
                tooltipPlacement={'top'}
                tooltipContent={`Quick view summary of fleet vehicles. Newly added vehicles will only appear once tracking starts (this may take a few days).`}
            />

            {(!vehiclesTwo.length && !loading) && <StatusError message={'No vehicle statuses available currently'} />}

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

                {!loading && vehiclesTwo.length > 0 && vehiclesTwo.map((vehicle: Vehicle, index: number) => {
                    return (
                        <div className="summaryBlock" key={index}>
                            <div className="bodyMedEmp">{vehicle.licensePlate}</div>
                            <div className="bodySmall">
                                {vehicle.state?.milesThisCalendarMonth ? vehicle.state.milesThisCalendarMonth + ' miles' : 'miles to be determined'}
                            </div>
                            <div className="bodySmall">
                                {vehicle.state?.costThisCalendarMonth ? '£' + vehicle.state.costThisCalendarMonth.toFixed(2) : '-'}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

