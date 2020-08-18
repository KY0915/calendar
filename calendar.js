today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById('year');
selectMonth = document.getElementById('month');

months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
decodeURIComponent;
monthAndYear = document.getElementById('monthAndYear');
showCalendar(currentMonth, currentYear);

hours = document.getElementById('hours-container');
hoursSlider = document.getElementById('hours-slider');
console.log(hoursSlider);

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function onDayClick(cell) {
  cell.addEventListener('click', function () {
    resetCalendarHighlight();

    if (this.classList.contains('selected-date')) {
      this.classList.remove('selected-date', 'today-date');
    } else {
      this.classList.add('selected-date');
      document.getElementsByClassName('timepicker')[0].click();
      document.getElementById('display-day').innerHTML =
        currentMonth + ' ' + this.innerHTML + '  ' + currentYear;
      document
        .getElementsByClassName('mdtp__button ok')[0]
        .addEventListener('click', function () {
          hourValue = document.getElementsByClassName('timepicker')[0].value;
          document.getElementById('display-hour').innerHTML = hourValue;
        });
      //   yearValue = selectYear.value;
      //   monthValue = selectMonth.value;
    }
  });
}
function resetCalendarHighlight() {
  days = document.getElementsByClassName('dates');
  for (let i = 0; i < days.length; i++) {
    days[i].classList.remove('selected-date', 'today-date');
  }
}

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();

  calendarbody = document.getElementById('calendar-body'); // body of the calendar

  // clearing all previous cells
  calendarbody.innerHTML = '';

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + ' ' + year;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement('div');
    row.className = 'date-row';
    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement('div');
        cellText = document.createTextNode('');
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement('div');
        cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add('today-date');
        } // color today's date

        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
      cell.classList.add('dates');
      //   input = document.createElement('input');
      //   input.setAttribute('type', 'text');
      //   input.setAttribute('class', 'form-control timepicker');
      //   input.style.opacity = 0;

      //   cell.appendChild(input);
      cell.style.width = (100 / 7).toString() + '%';
      cell.style.border = 'none';
      cell.style.textAlign = 'center';
      onDayClick(cell);
    }

    calendarbody.appendChild(row); // appending each row into calendar body.
  }
  console.log(calendarbody);
}

// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
