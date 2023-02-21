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

function averageWeeklyTempInCity(tempHeights: highestDailyTemp[], city: string) {
  let tempSum = summarizeCityTemps(tempHeights, city)

  return calcAverageWeekly(tempSum);
}

function summarizeCityTemps(tempHeights: highestDailyTemp[], city: string):number {
  const startingValue: number = 0;

  return tempHeights.reduce((tempSum: number, tempInfo: highestDailyTemp) => {
    if (tempInfo.city === city && (isWithinAWeek(tempInfo.timeMeasured))) {
      return tempSum + tempInfo.celsius;
    }
    else return tempSum;
  }, startingValue);
}

function isWithinAWeek(timeMeasured: Date): boolean {
  const weekInMs: number = 604800000;

  if (timeMeasured.getTime() > Date.now() - weekInMs) {
    return true;
  }
  return false;
}

const DAYS_IN_WEEK: number = 7;

function calcAverageWeekly(sum: number):number {
  return sum / DAYS_IN_WEEK;
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
  product.parent?.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  ✔️
  */

function presentStudents(students: Student[]) {
  for (const student of students) {
    let container = createStudentLiElement();
    let nameElement = createNameElement(student.name);
    let checkbox = createCheckboxElement(student.handedInOnTime);
    let listOfStudents = createStudentUlElement(student.handedInOnTime);

    container.appendChild(nameElement)
    container.appendChild(checkbox);
    listOfStudents?.appendChild(container);
  }
}

function createStudentLiElement() {
  let liContainer = document.createElement("li") as HTMLLIElement;
  liContainer.classList.add('flex-direction-column');
  return liContainer;
}

function createNameElement(studentName: string) {
  let nameEl = document.createElement('h3') as HTMLHeadingElement;
  nameEl.innerText = studentName;
  return nameEl;
}

function createCheckboxElement(onTime: boolean): HTMLInputElement {
  let checkbox = document.createElement("input") as HTMLInputElement;
  checkbox.type = "checkbox";
  checkbox.checked = false;
  if (onTime) {
    checkbox.checked = true;
  }
  return checkbox;
}

function createStudentUlElement(onTime: boolean): HTMLUListElement {
  let ulElement = document.createElement('ul') as HTMLUListElement;
  if (onTime) {
    ulElement.classList.add("passedstudents");
  }
  else {
    ulElement.classList.add("failedstudents");
  }

  return ulElement;
}


/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  ✔️
  */ 

  let wordsToConcat: string[] = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
  function concatenateStrings(words: string[]) {
    return words.join(', ');
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
