class Person {
  constructor(
    name,
    surname,
    dateOfBirth,
    dateOfDeath,
    placeOfBirth,
    countryOfBirth,
    sex,
    occupation,
    additionalInfo
  ) {
    this.name = name;
    this.surname = surname;
    this.dateOfBirth = dateOfBirth;
    this.dateOfDeath = dateOfDeath;
    this.placeOfBirth = placeOfBirth;
    this.countryOfBirth = countryOfBirth;
    this.age = Math.floor(
      (Date.parse(dateOfDeath) - Date.parse(dateOfBirth)) / 31536000000,
      0
    ); // Amount of miliseconds in year
    this.sex = sex;
    this.occupation = occupation;
    this.additionalInfo = additionalInfo;
  }
}

const persons = [
  new Person(
    "Antoni",
    "Zuber",
    new Date("September 17, 2001"),
    new Date(Date.now()),
    "Bielsko-Biała",
    "Polska",
    "M",
    "Student",
    "Kocham Ruch"
  ),
  new Person(
    "Rafał",
    "Ochorok",
    new Date("June 5, 2000"),
    new Date(Date.now()),
    "Katowice",
    "Polska",
    "M",
    "COiG",
    ""
  ),
  new Person(
    "Tomasz",
    "Barnaś",
    new Date("July 31, 1999"),
    new Date(Date.now()),
    "Siemianowice Śląskie",
    "Polska",
    "M",
    "TVP",
    "Tiktok: Tomasz_Barnas"
  ),
  new Person(
    "Michał",
    "Rojczyk",
    new Date("February 6, 2001"),
    new Date(Date.now()),
    "Bielsko-Biała",
    "Polska",
    "M",
    "Student",
    "Kozak Valo"
  ),
];

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const canvas = d3.select("body");

const x = 200;
const y = 200;

for (const person of persons) {
  // console.log(person);
  const svg = canvas
    .append("svg")
    .attr("width", x)
    .attr("height", y)
    .attr("id", `${person.name}_${person.surname}`)
    .attr("class", "expand_on_hover")
    .attr("onclick", "this.style.height = '400px';");
  // .attr("style", "position: absolute;");

  const rect = svg
    .append("rect")
    .attr("stroke", "yellow")
    .attr("fill", "white")
    .attr("width", x)
    .attr("height", y)
    .attr("x", 0)
    .attr("y", 0);

  const photo = svg
    .append("image")
    .attr("href", "test.jpg")
    .attr("width", 180)
    .attr("height", 150)
    .attr("style", "margin-left: 10px");

  const name_surname = svg
    .append("text")
    .text(`${person.name} ${person.surname}`)
    .attr("y", 160)
    .attr("class", "name_surname");

  const name = svg
    .append("text")
    .text(`Imię: ${person.name}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 0}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left")
    .attr("class", "show_on_hover");

  const surname = svg
    .append("text")
    .text(`Nazwisko: ${person.surname}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 1}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left")
    .attr("class", "show_on_hover");

  const age = svg
    .append("text")
    .text(`Wiek: ${person.age}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 2}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left")
    .attr("class", "show_on_hover");

  const dateOfBirth = svg
    .append("text")
    .text(
      `Data urodzenia: ${person.dateOfBirth.getDate()}/${
        person.dateOfBirth.getMonth() + 1 < 10
          ? "0" + (person.dateOfBirth.getMonth() + 1)
          : person.dateOfBirth.getMonth() + 1
      }/${person.dateOfBirth.getFullYear()}`
    )
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 3}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left")
    .attr("class", "show_on_hover");

  const dateOfDeath = svg
    .append("text")
    .text(
      person.dateOfDeath.setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
        ? `Data śmierci: żyje`
        : `Data śmierci: ${person.dateOfDeath.getDate()}/${
            person.dateOfDeath.getMonth() + 1 < 10
              ? "0" + (person.dateOfDeath.getMonth() + 1)
              : person.dateOfDeath.getMonth() + 1
          }/${person.dateOfDeath.getFullYear()}`
    )
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 4}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left")
    .attr("class", "show_on_hover");

  const placeOfBirth = svg
    .append("text")
    .text(`Miejsce urodzenia: ${person.placeOfBirth}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 5}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left")
    .attr("class", "show_on_hover");

  const countryOfBirth = svg
    .append("text")
    .text(`Kraj urodzenia: ${person.countryOfBirth}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 6}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left")
    .attr("class", "show_on_hover");

  const sex = svg
    .append("text")
    .text(`Płeć: ${person.sex}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 7}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left")
    .attr("class", "show_on_hover");

  const occupation = svg
    .append("text")
    .text(`Zawód: ${person.occupation}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 8}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left")
    .attr("class", "show_on_hover");

  const additionalInfo = svg
    .append("text")
    .text(`Dodatkowe informacje: ${person.additionalInfo}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 9}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left")
    .attr("class", "show_on_hover");
}

// console.log(
//   document.querySelector("#Antoni_Zuber").getBoundingClientRect().x +
//     document.querySelector("#Antoni_Zuber").getBoundingClientRect().width / 2
// );

const line = canvas
  .append("svg")
  .attr("style", "position: absolute;")
  .append("line")
  .attr(
    "x1",
    document.querySelector("#Antoni_Zuber").getBoundingClientRect().x +
      document.querySelector("#Antoni_Zuber").getBoundingClientRect().width / 2
  )
  .attr(
    "y1",
    document.querySelector("#Antoni_Zuber").getBoundingClientRect().y +
      document.querySelector("#Antoni_Zuber").getBoundingClientRect().height
  )
  .attr(
    "x2",
    document.querySelector("#Rafał_Ochorok").getBoundingClientRect().x +
      document.querySelector("#Rafał_Ochorok").getBoundingClientRect().width / 2
  )
  .attr(
    "y2",
    document.querySelector("#Rafał_Ochorok").getBoundingClientRect().y
  )
  .attr("style", "stroke: rgb(255,0,0); stroke-width: 2; position: absolute");

dragElement(document.getElementById("Michał_Rojczyk"));
