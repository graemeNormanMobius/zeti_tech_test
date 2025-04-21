import { DateTime } from "luxon";
import { isUndefined } from "lodash";
import Cookies from "js-cookie";
import { FleetTimestamp, Vehicle } from "../models/models.tsx";

export const metersInAMile = 1609.34;

export const costPerMile = 0.207;

export function getUserClientId() {
    const userCookie = Cookies.get('userIdentity');

    return !isUndefined(userCookie) ? JSON.parse(userCookie) : null;
}

export function getTodaysDate() {
    return new Date('2021-02-28T23:59:00Z').toISOString();
}

export function getTodayAsISODate() {
    return DateTime.fromISO('2021-02-28T23:59:00Z').toISODate();
}

export function getFirstOfCurrentMonth(currentDate: any) {
    const originalDate = DateTime.fromISO(currentDate, { zone: 'GMT' });

    return originalDate.startOf('month').toISODate();
}

export function calculateMileageAndCostToDate(vehicleListOne: FleetTimestamp[], vehicleListTwo: FleetTimestamp[]) {
    const currentUsersClientId = getUserClientId();

    return vehicleListOne.flatMap((entry: any) => entry.vehicles.filter((vehicle: any) => vehicle.clientId === currentUsersClientId.clientId)).map((vehicle: Vehicle, index: number) => {
        const startOdometer = vehicleListTwo.flatMap((entry: any) => entry.vehicles.filter((vehicle: any) => vehicle.clientId === currentUsersClientId.clientId))[index]?.state?.odometerInMeters ?? 0;
        const endOdometer = vehicle?.state?.odometerInMeters ?? 0;
        const milesThisCalendarMonth = Math.round((endOdometer - startOdometer) / metersInAMile);
        const costThisCalendarMonth = (Math.round((endOdometer - startOdometer) / metersInAMile) * costPerMile);

        return {
            ...vehicle,
            state: {
                ...vehicle.state,
                milesThisCalendarMonth: milesThisCalendarMonth,
                costThisCalendarMonth: costThisCalendarMonth,
            }
        };
    }) || [];
}

export function getInitials(name: string) {
    const splitName = name.split(' ');

    if (splitName.length === 1) return splitName[0][0];
    return (splitName[0][0] + splitName[splitName.length - 1][0]).toUpperCase();
}
