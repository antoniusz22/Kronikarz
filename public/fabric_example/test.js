export class Person {
  constructor(
    name,
    surname,
    dateOfBirth,
    dateOfDeath,
    dateOfMarriage,
    placeOfBirth,
    countryOfBirth,
    sex,
    occupation,
    additionalInfo,
    spouse,
    childs
  ) {
    this.name = name;
    this.surname = surname;
    this.dateOfBirth = dateOfBirth;
    this.dateOfDeath = dateOfDeath;
    this.dateOfMarriage = dateOfMarriage;
    this.placeOfBirth = placeOfBirth;
    this.countryOfBirth = countryOfBirth;
    this.age = Math.floor(
      (Date.parse(dateOfDeath) - Date.parse(dateOfBirth)) / 31536000000,
      0
    ); // Amount of miliseconds in year
    this.sex = sex;
    this.occupation = occupation;
    this.additionalInfo = additionalInfo;
    this.spouse = spouse;
    this.childs = childs;
  }
}

export const persons = [
  new Person(
    "Antoni",
    "Zuber",
    new Date("September 17, 2001"),
    new Date(Date.now()),
    new Date("June 1, 2022"),
    "Bielsko-Biała",
    "Polska",
    "M",
    "Student",
    "Kocham Ruch",
    "Natalia_Staniek",
    ["Cristiano_Zuber", "Wilhelm_Zuber"]
  ),
  new Person(
    "Rafał",
    "Ochorok",
    new Date("June 5, 2000"),
    new Date(Date.now()),
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
    new Date("February 6, 2010"),
    new Date(Date.now()),
    "Bielsko-Biała",
    "Polska",
    "M",
    "Student",
    "Kozak Valo"
  ),
  new Person(
    "Natalia",
    "Staniek",
    new Date("December 17, 2002"),
    new Date(Date.now()),
    new Date("June 1, 2022"),
    "Bielsko-Biała",
    "Polska",
    "K",
    "Student",
    "Kocham Antka",
    "Antoni_Zuber",
    ["Cristiano_Zuber"]
  ),
  new Person(
    "Cristiano",
    "Zuber",
    new Date("January 17, 2023"),
    new Date(Date.now()),
    new Date(Date.now()),
    "Bielsko-Biała",
    "Polska",
    "M",
    "Student",
    "Kocham Ruch",
    "",
    []
  ),
  new Person(
    "Wilhelm",
    "Zuber",
    new Date("January 17, 2023"),
    new Date(Date.now()),
    new Date(Date.now()),
    "Bielsko-Biała",
    "Polska",
    "M",
    "Student",
    "Kocham Ruch",
    "Natalia_Staniek",
    ["Cristiano_Zuber", "Wilhelm_Zuber"]
  ),
];
