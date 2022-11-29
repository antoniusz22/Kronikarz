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

document.addEventListener("DOMContentLoaded", () => {
  d3.select("h1").style("color", "red");
});

const persons = [
  new Person(
    "Antoni",
    "Zuber",
    new Date("September 17, 2001"),
    new Date(Date.now()),
    "M",
    "None",
    "Kocham Ruch"
  ),
  new Person(
    "Rafał",
    "Ochorok",
    new Date("June 5, 2000"),
    new Date(Date.now()),
    "M",
    "COiG",
    ""
  ),
  new Person(
    "Tomasz",
    "Barnaś",
    new Date("July 31, 1999"),
    new Date(Date.now()),
    "M",
    "TVP",
    "Tiktok: Tomasz_Barnas"
  ),
  new Person(
    "Michał",
    "Rojczyk",
    new Date("February 6, 2001"),
    new Date(Date.now()),
    "M",
    "Student",
    "Kozak Valo"
  ),
];
console.log(persons);
