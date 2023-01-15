export class Person {
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

export const persons = [
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

// const canvas = d3.select(".person");

// const x = 200;
// const y = 200;

// let div = document.querySelector(".person");

// canvas
//   .append("img")
//   .attr("src", "test.jpg")
//   .attr("width", "150px")
//   .attr("height", "180px");

// div.innerHTML += `${persons[0].name} ${persons[0].surname}`;
// let innerDiv = document.createElement("div");
// innerDiv.innerHTML += `Wiek: ${persons[0].age} <br />`;
// innerDiv.innerHTML += `Data urodzenia: ${persons[0].dateOfBirth.getDate()}/${
//   persons[0].dateOfBirth.getMonth() + 1 < 10
//     ? "0" + (persons[0].dateOfBirth.getMonth() + 1)
//     : persons[0].dateOfBirth.getMonth() + 1
// }/${persons[0].dateOfBirth.getFullYear()} <br />`;
// innerDiv.innerHTML +=
//   persons[0].dateOfDeath.setHours(0, 0, 0, 0) ===
//   new Date().setHours(0, 0, 0, 0)
//     ? `Data śmierci: żyje <br />`
//     : `Data śmierci: ${persons[0].dateOfDeath.getDate()}/${
//         persons[0].dateOfDeath.getMonth() + 1 < 10
//           ? "0" + (persons[0].dateOfDeath.getMonth() + 1)
//           : persons[0].dateOfDeath.getMonth() + 1
//       }/${persons[0].dateOfDeath.getFullYear()} <br />`;
// innerDiv.innerHTML += `Miejsce urodzenia: ${persons[0].placeOfBirth} <br />`;
// innerDiv.innerHTML += `Kraj urodzenia: ${persons[0].countryOfBirth} <br />`;
// innerDiv.innerHTML += `Płeć: ${persons[0].sex} <br />`;
// innerDiv.innerHTML += `Zawód: ${persons[0].occupation} <br />`;
// innerDiv.innerHTML += `${persons[0].additionalInfo}`;
// div.appendChild(innerDiv);




// canvas
//   .html(`${persons[0].name} ${persons[0].surname}`)
//   .append("div")
//   .text(`Wiek: ${persons[0].age} <br />`)
//   .text(
//     `Data urodzenia: ${persons[0].dateOfBirth.getDate()}/${
//       persons[0].dateOfBirth.getMonth() + 1 < 10
//         ? "0" + (persons[0].dateOfBirth.getMonth() + 1)
//         : persons[0].dateOfBirth.getMonth() + 1
//     }/${persons[0].dateOfBirth.getFullYear()} <br />`
//   )
//   .html(
//     persons[0].dateOfDeath.setHours(0, 0, 0, 0) ===
//       new Date().setHours(0, 0, 0, 0)
//       ? `Data śmierci: żyje`
//       : `Data śmierci: ${persons[0].dateOfDeath.getDate()}/${
//           persons[0].dateOfDeath.getMonth() + 1 < 10
//             ? "0" + (persons[0].dateOfDeath.getMonth() + 1)
//             : persons[0].dateOfDeath.getMonth() + 1
//         }/${persons[0].dateOfDeath.getFullYear()}`
//   )
//   .html(`Miejsce urodzenia: ${persons[0].placeOfBirth} <br />`)
//   .html(`Kraj urodzenia: ${persons[0].countryOfBirth} <br />`)
//   .html(`Płeć: ${persons[0].sex} <br />`)
//   .html(`Zawód: ${persons[0].occupation} <br />`)
//   .html(`${persons[0].additionalInfo}`);

// canvas.html(`${persons[0].name} ${persons[0].surname}`).append("div")
//   .html(`Wiek: ${persons[0].age} <br />
// Data urodzenia: ${persons[0].dateOfBirth.getDate()}/${
//   persons[0].dateOfBirth.getMonth() + 1 < 10
//     ? "0" + (persons[0].dateOfBirth.getMonth() + 1)
//     : persons[0].dateOfBirth.getMonth() + 1
// }/${persons[0].dateOfBirth.getFullYear()} <br />
// Data śmierci: ${person.dateOfDeath.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
//   ? `Data śmierci: żyje`
//   : `Data śmierci: ${person.dateOfDeath.getDate()}/${
//     person.dateOfDeath.getMonth() + 1 < 10
//       ? "0" + (person.dateOfDeath.getMonth() + 1)
//       : person.dateOfDeath.getMonth() + 1
//   }/${person.dateOfDeath.getFullYear()}} <br />
// Miejsce urodzenia: ${persons[0].placeOfBirth} <br />
// Kraj urodzenia: ${persons[0].countryOfBirth} <br />
// Płeć: ${persons[0].sex} <br />
// Zawód: ${persons[0].occupation} <br />
// ${persons[0].additionalInfo}`);

// for (const person of persons) {
//   // console.log(person);
//   const svg = canvas
//     .append("svg")
//     .attr("width", x)
//     .attr("height", y)
//     .attr("id", `${person.name}_${person.surname}`)
//     .attr("class", "expand_on_hover")
//     .attr("onclick", "this.style.height = '400px';");
//   // .attr("style", "position: absolute;");

//   const rect = svg
//     .append("rect")
//     .attr("stroke", "yellow")
//     .attr("fill", "white")
//     .attr("width", x)
//     .attr("height", y)
//     .attr("x", 0)
//     .attr("y", 0);

//   const photo = svg
//     .append("image")
//     .attr("href", "test.jpg")
//     .attr("width", 180)
//     .attr("height", 150)
//     .attr("style", "margin-left: 10px");

//   const name_surname = svg
//     .append("text")
//     .text(`${person.name} ${person.surname}`)
//     .attr("y", 160)
//     .attr("class", "name_surname");

//   const name = svg
//     .append("text")
//     .text(`Imię: ${person.name}`)
//     .attr("x", 0)
//     .attr("y", `${210 + (190 / Object.keys(person).length) * 0}`)
//     .attr("dominant-baseline", "hanging")
//     .attr("text-anchor", "top-left")
//     .attr("class", "show_on_hover");

//   const surname = svg
//     .append("text")
//     .text(`Nazwisko: ${person.surname}`)
//     .attr("x", 0)
//     .attr("y", `${210 + (190 / Object.keys(person).length) * 1}`)
//     .attr("dominant-baseline", "hanging")
//     .attr("text-anchor", "top-left")
//     .attr("class", "show_on_hover");

//   const age = svg
//     .append("text")
//     .text(`Wiek: ${person.age}`)
//     .attr("x", 0)
//     .attr("y", `${210 + (190 / Object.keys(person).length) * 2}`)
//     .attr("dominant-baseline", "hanging")
//     .attr("text-anchor", "top-left")
//     .attr("class", "show_on_hover");

//   const dateOfBirth = svg
//     .append("text")
//     .text(
//       `Data urodzenia: ${person.dateOfBirth.getDate()}/${
//         person.dateOfBirth.getMonth() + 1 < 10
//           ? "0" + (person.dateOfBirth.getMonth() + 1)
//           : person.dateOfBirth.getMonth() + 1
//       }/${person.dateOfBirth.getFullYear()}`
//     )
//     .attr("x", 0)
//     .attr("y", `${210 + (190 / Object.keys(person).length) * 3}`)
//     .attr("dominant-baseline", "hanging")
//     .attr("text-anchor", "top-left")
//     .attr("class", "show_on_hover");

// const dateOfDeath = svg
//   .append("text")
//   .text(
//     person.dateOfDeath.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
//       ? `Data śmierci: żyje`
//       : `Data śmierci: ${person.dateOfDeath.getDate()}/${
//           person.dateOfDeath.getMonth() + 1 < 10
//             ? "0" + (person.dateOfDeath.getMonth() + 1)
//             : person.dateOfDeath.getMonth() + 1
//         }/${person.dateOfDeath.getFullYear()}`
//   )
//   .attr("x", 0)
//   .attr("y", `${210 + (190 / Object.keys(person).length) * 4}`)
//   .attr("dominant-baseline", "hanging")
//   .attr("text-anchor", "top-left")
//   .attr("class", "show_on_hover");

//   const placeOfBirth = svg
//     .append("text")
//     .text(`Miejsce urodzenia: ${person.placeOfBirth}`)
//     .attr("x", 0)
//     .attr("y", `${210 + (190 / Object.keys(person).length) * 5}`)
//     .attr("dominant-baseline", "hanging")
//     .attr("text-anchor", "top-left")
//     .attr("class", "show_on_hover");

//   const countryOfBirth = svg
//     .append("text")
//     .text(`Kraj urodzenia: ${person.countryOfBirth}`)
//     .attr("x", 0)
//     .attr("y", `${210 + (190 / Object.keys(person).length) * 6}`)
//     .attr("dominant-baseline", "hanging")
//     .attr("text-anchor", "top-left")
//     .attr("class", "show_on_hover");

//   const sex = svg
//     .append("text")
//     .text(`Płeć: ${person.sex}`)
//     .attr("x", 0)
//     .attr("y", `${210 + (190 / Object.keys(person).length) * 7}`)
//     .attr("dominant-baseline", "hanging")
//     .attr("text-anchor", "top-left")
//     .attr("class", "show_on_hover");

//   const occupation = svg
//     .append("text")
//     .text(`Zawód: ${person.occupation}`)
//     .attr("x", 0)
//     .attr("y", `${210 + (190 / Object.keys(person).length) * 8}`)
//     .attr("dominant-baseline", "hanging")
//     .attr("text-anchor", "top-left")
//     .attr("class", "show_on_hover");

//   const additionalInfo = svg
//     .append("text")
//     .text(`Dodatkowe informacje: ${person.additionalInfo}`)
//     .attr("x", 0)
//     .attr("y", `${210 + (190 / Object.keys(person).length) * 9}`)
//     .attr("dominant-baseline", "hanging")
//     .attr("text-anchor", "top-left")
//     .attr("class", "show_on_hover");
// }

// console.log(
//   document.querySelector("#Antoni_Zuber").getBoundingClientRect().x +
//     document.querySelector("#Antoni_Zuber").getBoundingClientRect().width / 2
// );
