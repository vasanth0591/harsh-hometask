export type CustomerData = {
    firstName: string;
    lastName: string;
    dob: string;
    street: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    password: string;
};

export class DummyDataGenerator {

    // ---------- VALID DATA ----------
    static validData(): CustomerData {
        return {
            firstName: this.randomString(6),
            lastName: this.randomString(6),
            dob: this.randomDOB(),
            street: `Street ${this.randomNumber(100)}`,
            postalCode: this.randomNumber(6).toString(),
            city: "Delhi",
            state: "Delhi",
            country: "India",
            phone: this.randomPhone(),
            email: this.randomEmail(),
            password: this.validPassword()
        };
    }

    // ---------- INVALID DATA ----------
    static invalidData(): Partial<CustomerData> {
        return {
            firstName: "", // empty
            lastName: "1234", // numbers not allowed
            dob: "2025-99-99", // invalid date
            street: "",
            postalCode: "abc", // invalid
            city: "",
            state: "",
            country: "",
            phone: "123", // too short
            email: "invalidemail@", // invalid format
            password: "abc" // weak password
        };
    }

    // ---------- EDGE CASES ----------
    static edgeCaseData(): CustomerData {
        return {
            firstName: "A".repeat(50),
            lastName: "B".repeat(50),
            dob: "1900-01-01",
            street: "X".repeat(100),
            postalCode: "999999",
            city: "Z".repeat(30),
            state: "Y".repeat(30),
            country: "India",
            phone: "9".repeat(15),
            email: `test${Date.now()}@example.com`,
            password: "Aa1@aaaa"
        };
    }

    // ---------- HELPERS ----------
    private static randomString(length: number): string {
        const chars = "abcdefghijklmnopqrstuvwxyz";
        return Array.from({ length }, () =>
            chars[Math.floor(Math.random() * chars.length)]
        ).join("");
    }

    private static randomNumber(length: number): number {
        return Math.floor(Math.random() * Math.pow(10, length));
    }

    private static randomEmail(): string {
        return `user${Date.now()}@test.com`;
    }

    private static randomPhone(): string {
        return "9" + this.randomNumber(9).toString().padStart(9, "0");
    }

    private static randomDOB(): string {
        const year = 1990 + Math.floor(Math.random() * 10);
        const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
        const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    private static validPassword(): string {
        return "Aa1@" + this.randomString(4);
    }
}