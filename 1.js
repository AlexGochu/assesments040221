class Provider {
  /**
   * Gets the weather for a given city
   */
  static getWeather(city) {
    return Promise.resolve(`The weather of ${city} is Cloudy`);
  }
  /**
   * Gets the weather for a given city
   */
  static getLocalCurrency(city) {
    return Promise.resolve(`The local currency of ${city} is GBP`);
  }
  /**
   * Given Longtitude and latitude, this function returns a city
   */
  static findCity(long, lat) {
    return Promise.resolve(`London`);
  }
}

// node 1.js in terminal knowing that you on the same folder with the scripts

Provider.findCity(51.5074, 0.1278).then((c) => console.log(c));
Provider.findCity(51.5074, 0.1278).then((c) =>
  Provider.getWeather(c).then((w) => console.log(w))
);

Provider.findCity(51.5074, 0.1278).then((c) => {
  Promise.all([Provider.getWeather(c), Provider.getLocalCurrency(c)]).then(
    (data) => console.log(`${data[0]}. ${data[1]}`)
  );
});
