
export type Vehicle = {
    vin: string;
    licensePlate: string;
    make: string;
    model: string;
    type: 'electric' | 'petrol' | 'diesel';
    state: {
        odometerInMeters: number;
        milesThisCalendarMonth?: number;
        costThisCalendarMonth?: number;
        speedInMph: number;
        asAt: Date;
    },
    clientId: string;
};

export type FleetTimestamp = {
    date: string;
    id: string;
    vehicles: Vehicle[];
}

export type BasicInvoice = {
    id: number;
    period: string;
    amount: number;
    status: 'paid' | 'upcoming' | 'pending' | 'outstanding';
    totalVehicles: number;
    totalMiles: number;
    clientId: string;
}

export type LocationData = {
    base: boolean;
    city: string;
    locationName: string;
    latitude: number;
    longitude: number
};
