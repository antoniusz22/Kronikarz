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

const canvas = d3.select("#test");

const x = 200;
const y = 400;

const svg = canvas.append("svg").attr("width", x).attr("height", y);

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
  .attr("height", 200)
  .attr("style", "margin-left: 10px");

const name = svg
  .append("text")
  .text(`Imię: ${persons[0].name}`)
  .attr("x", 0)
  .attr("y", `${210 + (190 / Object.keys(persons[0]).length) * 0}`)
  .attr("dominant-baseline", "hanging")
  .attr("text-anchor", "top-left");

const surname = svg
  .append("text")
  .text(`Nazwisko: ${persons[0].surname}`)
  .attr("x", 0)
  .attr("y", `${210 + (190 / Object.keys(persons[0]).length) * 1}`)
  .attr("dominant-baseline", "hanging")
  .attr("text-anchor", "top-left");

const age = svg
  .append("text")
  .text(`Wiek: ${persons[0].age}`)
  .attr("x", 0)
  .attr("y", `${210 + (190 / Object.keys(persons[0]).length) * 2}`)
  .attr("dominant-baseline", "hanging")
  .attr("text-anchor", "top-left");

const dateOfBirth = svg
  .append("text")
  .text(
    `Data urodzenia: ${persons[0].dateOfBirth.getDate()}/${
      persons[0].dateOfBirth.getMonth() + 1 < 10
        ? "0" + (persons[0].dateOfBirth.getMonth() + 1)
        : persons[0].dateOfBirth.getMonth() + 1
    }/${persons[0].dateOfBirth.getFullYear()}`
  )
  .attr("x", 0)
  .attr("y", `${210 + (190 / Object.keys(persons[0]).length) * 3}`)
  .attr("dominant-baseline", "hanging")
  .attr("text-anchor", "top-left");

const dateOfDeath = svg
  .append("text")
  .text(
    `Data śmierci: ${persons[0].dateOfDeath.getDate()}/${
      persons[0].dateOfDeath.getMonth() + 1 < 10
        ? "0" + (persons[0].dateOfDeath.getMonth() + 1)
        : persons[0].dateOfDeath.getMonth() + 1
    }/${persons[0].dateOfDeath.getFullYear()}`
  )
  .attr("x", 0)
  .attr("y", `${210 + (190 / Object.keys(persons[0]).length) * 4}`)
  .attr("dominant-baseline", "hanging")
  .attr("text-anchor", "top-left");

const placeOfBirth = svg
  .append("text")
  .text(`Miejsce urodzenia: ${persons[0].placeOfBirth}`)
  .attr("x", 0)
  .attr("y", `${210 + (190 / Object.keys(persons[0]).length) * 5}`)
  .attr("dominant-baseline", "hanging")
  .attr("text-anchor", "top-left");

const countryOfBirth = svg
  .append("text")
  .text(`Kraj urodzenia: ${persons[0].countryOfBirth}`)
  .attr("x", 0)
  .attr("y", `${210 + (190 / Object.keys(persons[0]).length) * 6}`)
  .attr("dominant-baseline", "hanging")
  .attr("text-anchor", "top-left");

const sex = svg
  .append("text")
  .text(`Płeć: ${persons[0].sex}`)
  .attr("x", 0)
  .attr("y", `${210 + (190 / Object.keys(persons[0]).length) * 7}`)
  .attr("dominant-baseline", "hanging")
  .attr("text-anchor", "top-left");

const occupation = svg
  .append("text")
  .text(`Zawód: ${persons[0].occupation}`)
  .attr("x", 0)
  .attr("y", `${210 + (190 / Object.keys(persons[0]).length) * 8}`)
  .attr("dominant-baseline", "hanging")
  .attr("text-anchor", "top-left");

const additionalInfo = svg
  .append("text")
  .text(`Dodatkowe informacje: ${persons[0].additionalInfo}`)
  .attr("x", 0)
  .attr("y", `${210 + (190 / Object.keys(persons[0]).length) * 9}`)
  .attr("dominant-baseline", "hanging")
  .attr("text-anchor", "top-left");
