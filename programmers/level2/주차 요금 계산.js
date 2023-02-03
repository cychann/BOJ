function solution(fees, records) {
  let cars = {};

  records.forEach((record) => {
    let [time, car, type] = record.split(" ");
    const [hour, minute] = time.split(":");
    time = hour * 60 + Number(minute);

    if (!cars[car]) {
      cars[car] = { time: 0, car };
    }

    cars[car].type = type;

    if (type == "OUT") {
      cars[car].time += time - cars[car].lastInTime;
      return;
    } else cars[car].lastInTime = time;
  });

  console.log(cars);
  return Object.values(cars)
    .sort((a, b) => a.car - b.car)
    .map((v) => {
      if (v.type == "IN") {
        v.time += 1439 - v.lastInTime;
      }

      if (fees[0] > v.time) {
        return fees[1];
      }

      return fees[1] + Math.ceil((v.time - fees[0]) / fees[2]) * fees[3];
    });
}
