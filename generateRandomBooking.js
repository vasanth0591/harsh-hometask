
const randomFromArray = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

const randomBoolean = () => Math.random() < 0.5;

const randomPrice = () => Math.floor(Math.random() * 1000) + 100;

// Generate random date between two dates
const randomDate = (start, end) => {
    const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
};

// Main generator
const generateRandomBooking = () => {
    const firstNames = ["Pratham", "Harsh", "Amit", "Ravi", "Kiran"];
    const lastNames = ["Sahu", "Sharma", "Verma", "Reddy", "Kumar"];
    const needs = ["Breakfast", "Lunch", "Dinner", "None"];

    const checkinDate = randomDate(new Date(2020, 0, 1), new Date());
    const checkoutDate = randomDate(new Date(checkinDate), new Date(2027, 0, 1));

    return {
        firstname: randomFromArray(firstNames),
        lastname: randomFromArray(lastNames),
        totalprice: randomPrice(),
        depositpaid: randomBoolean(),
        bookingdates: {
            checkin: checkinDate,
            checkout: checkoutDate,
        },
        additionalneeds: randomFromArray(needs),
    };
};



module.exports = { generateRandomBooking };