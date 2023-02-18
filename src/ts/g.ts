import { GProduct } from "./models/GProduct";
import { Student } from "./models/Student";
import { highestDailyTemp } from "./models/highestDailyTemp";
import { User } from "./models/User";

/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder. ✔️
  */

function getLength(jumpings: number[]): number {
    return jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

const SEBASTIAN_ALWAYS_PASS: string = 'Sebastian';

function getStudentStatus(student: Student): string {
  if ((student.name == SEBASTIAN_ALWAYS_PASS) && (student.handedInOnTime))
    return 'VG'
  else 
    return 'IG';
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  ✔️
  */

  const DAYS_IN_WEEK: number = 7;
  const WEEK_IN_MS: number = 604800000;

function averageWeeklyTempInCity(tempHeights: highestDailyTemp[], city: string) {
  const startingValue: number = 0;

  let tempSum = tempHeights.reduce((tempSum: number, tempInfo: highestDailyTemp) => {
    if (tempInfo.city === city && (isWithinAWeek(tempInfo.timeMeasured))) {
      return tempSum + tempInfo.celsius;
    }
    else return tempSum;
  }, startingValue);

  return tempSum / DAYS_IN_WEEK;
}

function isWithinAWeek(timeMeasured: Date): boolean {
  if (timeMeasured.getTime() > Date.now() - WEEK_IN_MS) {
    return true;
  }
  else return false;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

function showProduct(product: GProduct) {
  let container = document.createElement("div") as HTMLDivElement;
  let title = document.createElement("h4") as HTMLHeadingElement;
  let price = document.createElement("strong") as HTMLElement;
  let imageTag = document.createElement("img") as HTMLImageElement;

  title.innerHTML = product.name;
  price.innerHTML = product.price.toString();
  imageTag.src = product.image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(price);
  product.parent.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  ✔️
  */

function presentStudents(students: Student[]) {
  for (const student of students) {
    let container = document.createElement("div") as HTMLDivElement;
    let checkbox = document.createElement("input") as HTMLInputElement;
    checkbox.type = "checkbox";
    checkbox.checked = true;
    let listOfStudents = document.querySelector("ul#failedstudents") as HTMLUListElement;
   
    if (student.handedInOnTime) {
      listOfStudents = document.querySelector("ul#passedstudents") as HTMLUListElement;
      checkbox.checked = false;
    }

      container.appendChild(checkbox);
      listOfStudents?.appendChild(container);
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  ✔️
  */ 

  let stringsToConcat: string[] = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
  function concatenateStrings(strings: string[]) {
    return strings.join(', ');
  }

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

function validateAge(birthday: Date): boolean {
  let ageDiff = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  if ((userAge > 20)) {
    return true;
  }
  return false;
}

function createUser(user: User) {
  if (validateAge(user.birthday)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
