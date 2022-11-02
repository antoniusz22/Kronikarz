class Person {
    constructor(name, surname, dateOfBirth, dateOfDeath, sex, occupation, additionalInfo) {
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.dateOfDeath = dateOfDeath;
        this.age = Math.floor((Date.parse(dateOfDeath) - Date.parse(dateOfBirth)) / 31536000000, 0);
        this.sex = sex;
        this.occupation = occupation;
        this.additionalInfo = additionalInfo;
    }
    
}

const persons = [
    new Person("Antoni", "Zuber", new Date("September 17, 2001"), new Date(Date.now()), "M", "None", "Kocham Ruch"),
    new Person("Rafał", "Ochorok", new Date("June 5, 2000"), new Date(Date.now()), "M", "COiG", ""),
    new Person("Tomasz", "Barnaś", new Date("July 31, 1999"), new Date(Date.now()), "M", "TVP", "Tiktok: Tomasz_Barnas"),
    new Person("Michał", "Rojczyk", new Date("February 6, 2001"), new Date(Date.now()), "M", "Student", "Kozak Valo")
];
console.log(persons);