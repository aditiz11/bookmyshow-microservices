export function getSeatPrice(seat) {

    const row = seat[0];

    if (["A", "B", "C"].includes(row)) {
        return 350;
    }

    if (["D", "E", "F", "G"].includes(row)) {
        return 250;
    }

    return 180;
}