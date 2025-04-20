
export type User = {
    id: 1,
    firstname: "Graeme",
    surname: "Norman",
    email: "gnorman85@googlemail.com",
    password: "password123",
    clientId: "d35b0c9f-1cc2-48ef-a2dc-e669baac8804"
}

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
