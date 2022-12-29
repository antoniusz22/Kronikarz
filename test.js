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

for (const person of persons) {
  console.log(person);
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
    .text(`Imię: ${person.name}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 0}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left");

  const surname = svg
    .append("text")
    .text(`Nazwisko: ${person.surname}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 1}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left");

  const age = svg
    .append("text")
    .text(`Wiek: ${person.age}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 2}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left");

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
    .attr("text-anchor", "top-left");

  const dateOfDeath = svg
    .append("text")
    .text(
      person.dateOfDeath.setHours(0,0,0,0) === new Date().setHours(0,0,0,0)
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
    .attr("text-anchor", "top-left");

  const placeOfBirth = svg
    .append("text")
    .text(`Miejsce urodzenia: ${person.placeOfBirth}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 5}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left");

  const countryOfBirth = svg
    .append("text")
    .text(`Kraj urodzenia: ${person.countryOfBirth}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 6}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left");

  const sex = svg
    .append("text")
    .text(`Płeć: ${person.sex}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 7}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left");

  const occupation = svg
    .append("text")
    .text(`Zawód: ${person.occupation}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 8}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left");

  const additionalInfo = svg
    .append("text")
    .text(`Dodatkowe informacje: ${person.additionalInfo}`)
    .attr("x", 0)
    .attr("y", `${210 + (190 / Object.keys(person).length) * 9}`)
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "top-left");
}
