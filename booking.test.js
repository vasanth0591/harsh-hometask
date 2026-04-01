const { generateRandomBooking } = require("./generateRandomBooking");

const baseURL = "https://restful-booker.herokuapp.com/";

const environment = {
  token: "",
  bookingID: "",
  bookingDetail: {},
};

const authData = {
  username: "admin",
  password: "password123",
};

afterAll(async () => {

    environment.token = "";
    environment.bookingID = "";
    environment.bookingDetail = {};
    
});

describe("Tests which does not require authentication", () => {
  test("Get all Booking IDs", async () => {
    const response = await fetch(`${baseURL}booking`);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
  });

  test("Create new Booking", async () => {
    environment.bookingDetail = generateRandomBooking();

    const response = await fetch(`${baseURL}booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(environment.bookingDetail),
    });

    const responseData = await response.json();
    environment.bookingID = responseData.bookingid;

    expect(response.status).toBe(200);
    expect(responseData.booking).toEqual(environment.bookingDetail);
  });

  test("Checking the Health", async () => {
    const response = await fetch(`${baseURL}ping`);
    expect(response.status).toBe(201);
  });
});

describe("Tests which require authentication", () => {
  test("Authenticating and generating the token", async () => {
    const response = await fetch(`${baseURL}auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    const responseData = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");

    environment.token = responseData.token;
  });

  test("Updating the existing booking", async () => {
    environment.bookingDetail = generateRandomBooking();

    const response = await fetch(`${baseURL}booking/${environment.bookingID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${environment.token}`,
      },
      body: JSON.stringify(environment.bookingDetail),
    });

    const responseData = await response.json();

    expect(response.status).toBe(200);
    expect(responseData).toEqual(environment.bookingDetail);
  });

  test("Update partial Data using PATCH", async () => {
    const newPrice = Math.floor(Math.random() * 1000) + 100;
    environment.bookingDetail.totalprice = newPrice;

    const response = await fetch(`${baseURL}booking/${environment.bookingID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${environment.token}`,
      },
      body: JSON.stringify({
        totalprice: newPrice,
      }),
    });

    const responseData = await response.json();

    expect(response.status).toBe(200);
    expect(responseData).toEqual(environment.bookingDetail);
  });

  test("Deleting the booking", async () => {
    const response = await fetch(`${baseURL}booking/${environment.bookingID}`, {
      method: "DELETE",
      headers: {
        Cookie: `token=${environment.token}`,
      },
    });

    expect(response.status).toBe(201);
  });
});
