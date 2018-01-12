//http://api.openweathermap.org

//In this example we use an array of locations, and when the program runs, it will
//select one location randomly. Based on the weather conditions the background color will change
let locationArray = ["Plymouth", "London", "Paris", "Berlin", "Athens", "Shanghai", "Cape Town", "Sydney", "Reykjavik", "Anchorage", "Miami", "New York", "Beijing", "Moscow", "Madrid", "Mexico City", "Buenos Aires"];
let randomLocation;
let apiKey = "6b4a465ac9894c63172283b3f271c20c";
let weather;
var c;

function setup() {
  var canvas = createCanvas(1280, 720);
  canvas.parent('canvasContainer');
  textAlign(CENTER);
  textSize(24);
  noLoop();
  preloadX();
}

function preloadX() {
  //randomLocation stores just one city that is returned from the locationArray
  //Within the square brackets of locationArray[] a round random number is called (integer / not float)
  //This random number will be between 0 and the location.Array.lengh-1 (that is from 0 to 5)
  //Based on the random number selected, the city that is saved in that array position will return to randomLocation
  randomLocation = locationArray[round(random(locationArray.length-1))];
  //function draw() {
  //if (keyIsPressed === locationArray.length-1) {
  loadJSON("http://api.openweathermap.org/data/2.5/weather?q="+randomLocation+"&units=metric&appid="+apiKey, getData);
}

function getData(data){
  weather = data;
  console.log("Location: " + randomLocation)
  console.log("Temperature: " + weather.main.temp + "°C");
  console.log("Temperature (min): " + weather.main.temp_min + "°C");
  console.log("Temperature (max): " + weather.main.temp_max + "°C");
  console.log("Humidity: " + weather.main.humidity);
  console.log("Pressure: " + weather.main.pressure);
  drawX();
}

function drawX() {
  let mapColor;
  //According to the data returned from the JSON object, we use the current temperature of the city
  //to control the background color. The following conditional statements will evaluate only one option (thus, one color)
  if (weather.main.temp<-5) mapColor = color(0, 0, 255);
  if (weather.main.temp>-5 && weather.main.temp<5) mapColor = color(0, 140, 255);
  if (weather.main.temp>5 && weather.main.temp<10) mapColor = color(238, 191, 43);
  if (weather.main.temp>10 && weather.main.temp<20) mapColor = color(234, 143, 0);
  if (weather.main.temp>20) mapColor = color(255, 73, 0);

  var c = color(255, 204, 0); // Define color 'c'
  fill(c); // Use color variable 'c' as fill color
  noStroke(); // Don't draw a stroke around shapes
  ellipse(30, 20, 0, 5); // Draw rectangle

  background(mapColor);
  fill(0);
  text(randomLocation, width/2, height/2-30);
  text("Temperature: " + weather.main.temp + "°C", width/2, height/2-0);
  text("Humidity: " + weather.main.humidity + "%", width/2, height/2+30);
}

function mousePressed(){
  preloadX();
}
