import {
    getFirstOfCurrentMonth,
    getTodayAsISODate,
    getTodaysDate,
    getUserClientId,
    getInitials
} from './utils.tsx';
import Cookies from "js-cookie";

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
