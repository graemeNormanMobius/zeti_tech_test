
export type Vehicle = {
    vin: string;
    licensePlate: string;
    make: string;
    model: string;
    state: {
        odometerInMeters: number;
        milesThisCalendarMonth?: number;
        costThisCalendarMonth?: number;
        speedInMph: number;
        asAt: Date;
    }
};

export type FleetTimestamp = {
    date: string;
    id: string;
    vehicles: Vehicle[];
}
