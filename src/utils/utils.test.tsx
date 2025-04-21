import {
    getFirstOfCurrentMonth,
    getTodayAsISODate,
    getTodaysDate,
    getUserClientId,
    getInitials,
    calculateMileageAndCostToDate
} from './utils.tsx';
import Cookies from "js-cookie";
import { vehicleListOneTimestamp, vehicleListTwoTimestamp } from "../mockData/mockTestData.tsx";

jest.mock('js-cookie', () => ({
    get: jest.fn(),
}));

describe('getUserClientId', () => {
    beforeEach(() => {
        (Cookies.get as jest.Mock).mockReset();
    });

    it('should return JSON parsed cookie value if userIdentity cookie exists', () => {
        const mockUser = { id: 1, firstname: "Test", surname: "Tester", email: "tTester@mockmail.com", clientId: "d35b0c9f-1cc2-48ef-a2dc-e669baac8804" };
        (Cookies.get as jest.Mock).mockReturnValue(JSON.stringify(mockUser));

        const result = getUserClientId();
        expect(result).toEqual(mockUser);
    });

    it('should return null if userIdentity cookie does not exist', () => {
        (Cookies.get as jest.Mock).mockReturnValue(undefined);

        const result = getUserClientId();
        expect(result).toBeNull();
    });
});

describe('getTodaysDate', () => {
    it('should return todays date as an ISO formatted string', () => {
        const result = getTodaysDate();

        expect(result).toBe('2021-02-28T23:59:00.000Z');
    });
});

describe('getTodaysDate', () => {
    it('should return todays date as an ISO date in format YYYY-MM-DD ', () => {
        const result = getTodayAsISODate();

        expect(result).toBe('2021-02-28');
    });
});

describe('getFirstOfCurrentMonth', () => {
    it('should return the first day of the month for a given date formatted as YYYY-MM-DD', () => {
        const inputDate = '2021-02-28T23:59:00.000Z';
        const result = getFirstOfCurrentMonth(inputDate);

        expect(result).toBe('2021-02-01');
    });
});

describe('getInitials', () => {
    it('should return the first letter of a name with no surname', () => {
        expect(getInitials('John')).toBe('J');
    });

    it('should return initials from first and last name', () => {
        expect(getInitials('John Smith')).toBe('JS');
    });

    it('should ONLY return initials for firstname / surname from a user with a middle name', () => {
        expect(getInitials('John Bob Smith')).toBe('JS');
    });

    it('should handle ALL lowercase names and return uppercase initials', () => {
        expect(getInitials('john smith')).toBe('JS');
    });
});

describe('calculateMileageAndCostToDate', () => {
    beforeEach(() => {
        (Cookies.get as jest.Mock).mockReset();

        const mockUser = { id: 1, firstname: "Test", surname: "Tester", email: "tTester@mockmail.com", clientId: "d35b0c9f-1cc2-48ef-a2dc-e669baac8804" };
        (Cookies.get as jest.Mock).mockReturnValue(JSON.stringify(mockUser));
    });

    it('should determine the correct number of vehicles to return based on mockUser', () => {
        const result: any = calculateMileageAndCostToDate(vehicleListOneTimestamp, vehicleListTwoTimestamp);

        expect(result).toHaveLength(2);
        // expect(result[0].state.milesThisCalendarMonth).toBe(2000); // (321868 - 160934) / 1609.34 ≈ 100
        // expect(result[0].state.costThisCalendarMonth).toBe(414);
    });

    it('should correctly calculate the total miles travelled from vehicles odometer', () => {
        const result: any = calculateMileageAndCostToDate(vehicleListOneTimestamp, vehicleListTwoTimestamp);

        // expect(result).toHaveLength(2);
        expect(result[0].state.milesThisCalendarMonth).toBe(2000); // (321868 - 160934) / 1609.34 ≈ 100
        // expect(result[0].state.costThisCalendarMonth).toBe(414);

    })

    it('should correctly calculate the total cost based on total miles travelled from vehicles odometer', () => {
        const result: any = calculateMileageAndCostToDate(vehicleListOneTimestamp, vehicleListTwoTimestamp);

        // expect(result).toHaveLength(2);
        // expect(result[0].state.milesThisCalendarMonth).toBe(2000); // (321868 - 160934) / 1609.34 ≈ 100
        expect(result[0].state.costThisCalendarMonth).toBe(414);
    })
});
