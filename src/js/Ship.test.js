const Ship = require('./Ship');

test("Gets ships length", () => {
    const ship = Ship(3);

    expect(ship.getLength()).toBe(3);
});

test("Registers hits on ship", () => {
    const ship = Ship(3);
    ship.hit(0);
    expect(ship.hits[0].hit).toBe(true);
});

test("Registers ship sinking w/ all areas hit", () => {
    const ship = Ship(3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.sunk).toBe(true);
});

test("Registers when sunk status is changed", () => {
    const ship = Ship(3);
    const ship2 = Ship(3);

    ship.hit(0);
    ship.hit(1);
    ship.hit(2);

    ship2.setSunkStatus(true);

    expect(ship.sunk).toBe(true);
    expect(ship2.sunk).toBe(true);
});