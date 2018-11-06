
// calander----------------------------------------------------------------------------


var timeObj = new Date();
var year = timeObj.getYear()+1900;
var date = timeObj.getDate();
var day = timeObj.getDay();
console.log('day: ', day);
var month = timeObj.getMonth();
var timeArr = Date().split(" ");
var justBeforeClicked = [];
var dayCharactorized = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dateDutySaver = {};
var clickedMonth = month+1;
var clickedDate = date;
var clickedYear = year;

var idGenerator = function () {
  return `${clickedYear}_${clickedMonth}_${clickedDate}`
}

var dateClickEventer = function (e){
  if(document.querySelector('.dutiesWrapper')){
    dataSaver();
  }
  e.target.setAttribute('id', 'clickedDate');
  document.querySelector('.clickedDate').innerHTML = e.target.innerHTML;
  document.querySelector('.clickedDay').innerHTML = dayCharactorized[dateToDayCalculater(e.target.innerHTML, navigatedMonth, navigatedYear)];
  if(justBeforeClicked[0]){
    justBeforeClicked[0].removeAttribute('id');
    justBeforeClicked[0].setAttribute('id', `d${clickedDate}m${month}y${year}`);
    justBeforeClicked.length = 0;
  }
  justBeforeClicked.push(e.target);
  clickedDate = e.target.innerText;
  console.log("dateDutySaver: ", dateDutySaver);
  if ( !dateDutySaver[idGenerator()] ){
    dailyToDoGenerator();
    dataDownLoader(e)
  } else {
    var toDoList = document.querySelector('.toDoList');
    toDoList.appendChild(dateDutySaver[idGenerator()]);
  }
}

var dataDownLoader = function (e) {
  var newDutiesWrapper = document.querySelector('.dutiesWrapper');
  var toDoList = document.querySelector('.toDoList');
  toDoList.appendChild(newDutiesWrapper);
  if(dateDutySaver[idGenerator()]){
    newDutiesWrapper.appendChild(dateDutySaver[idGenerator()]);
  }
}

var dataSaver = function () {
  var thisDutiesWrapper = document.querySelector('.dutiesWrapper');
  dateDutySaver[idGenerator()] = thisDutiesWrapper;
  thisDutiesWrapper.remove();
  if(thisDutiesWrapper.childNodes[0].childNodes[0]){
    var haveDutyIcon = document.querySelector('#clickedDate');
    console.log("haveDutyIcon: ", haveDutyIcon);
    haveDutyIcon.setAttribute('style', 'border-bottom: solid 2px red');
  } else {
    var haveDutyIcon = document.querySelector('#clickedDate');
    haveDutyIcon.removeAttribute('style', 'border-bottom: none');
  }
}

var datesGenerator = function (month, year) {
  var d = 1;
  var w = 1;
  for( var i = 0; i<dateToDayCalculater(d,month,year); i++ ){
    var firstWeek = document.querySelector(`#week1`);
    firstWeek.childNodes[i].innerHTML = "";
    firstWeek.childNodes[i].style = "";
    firstWeek.childNodes[i].removeEventListener('click', dateClickEventer);
  }

  do {
    var monthChecker = new Date(`${d} ${monthCharactorize(month)} ${year}`).getMonth();
    if ( monthCharactorize(month) !== monthCharactorize(monthChecker) ) {
      break;
    }
    var nthWeek = document.querySelector(`#week${w}`);
    var dayWrapper = nthWeek.childNodes[dateToDayCalculater(d, month, year)];
    if(dateDutySaver[`${year}_${month}_${d}`]){
      dayWrapper.style = "border-bottom: solid 2px yellow;"
    }
    if( dateToDayCalculater(d, month, year) !== 6 ) {
      dayWrapper.innerHTML = d;
      dayWrapper.setAttribute('id', `d${d}m${month}y${year}`);
      dayWrapper.addEventListener('click', dateClickEventer);
        } else {
      dayWrapper.innerHTML = d;
      dayWrapper.setAttribute('id', `d${d}m${month}y${year}`);
      dayWrapper.addEventListener('click', dateClickEventer);
      w += 1;
    }
    d += 1;
    var isRightDate = isNaN(new Date(`${d} ${monthCharactorize(month)} ${year}`).valueOf());
  }
  while ( !isRightDate );

  var dayOfLastDate = dateToDayCalculater(d-1, month, year);
  if ( dayOfLastDate !== 6 ) {
    for( var i = dayOfLastDate+1; i<7; i++ ){
      nthWeek = document.querySelector(`#week${w}`);
      nthWeek.childNodes[i].innerHTML = "";
      nthWeek.childNodes[i].removeEventListener('click', dateClickEventer)
      var nextOfLastWeek = document.querySelector(`#week${w+1}`);
      if( nextOfLastWeek !== null ) {
        for( var j = 0; j < 7; j++ ){
          nextOfLastWeek.childNodes[j].innerHTML = "";
          nextOfLastWeek.childNodes[j].style = "";
          nextOfLastWeek.childNodes[j].removeEventListener('click', dateClickEventer);
        }
      }
    }
  }
}

var dateToDayCalculater = function (n, month, year) {
  return new Date(`${n} ${monthCharactorize(month)} ${year}`).getDay();
}

var monthSetter = function () {
  var leftButt = document.querySelector(".leftButt");
  var rightButt = document.querySelector(".rightButt");

  leftButt.addEventListener('click', function () {
    if(month === 0) {
      month = 11;
      year -= 1;
      navigatedMonth = month;
      navigatedYear = year;
      datesGenerator(month,year);
      navigationPrinter(month, year);
      clickedMonth = month;
      clickedYear = year;
    } else {
    // timeAr = Date(`${date} ${monthCharactorize(month)} ${year}`).split(" ");
      month -= 1
      navigatedMonth = month;
      datesGenerator(month, year);
      navigationPrinter(month, year);
      clickedMonth = month;
    }
  });
  rightButt.addEventListener('click', function () {
    if(month === 11) {
      month = 0;
      year += 1;
      navigatedMonth = month;
      navigatedYear = year;
      datesGenerator(month,year);
      navigationPrinter(month, year);
      clickedMonth = month;
      clickedYear = year;
    } else {
      // timeAr = Date(`${date} ${monthCharactorize(month)} ${year}`).split(" ");
      month += 1
      navigatedMonth = month;
      datesGenerator(month, year);
      navigationPrinter(month, year);
      clickedMonth = month;
    }
  })
}

var monthCharactorize = function (monthData) {
  var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var result = month[monthData];
  return result;
}

var navigatedMonth = month;
var navigatedYear = year;

var navigationGenerator = function (month, year) {
  var monthYearWrapper = document.querySelector(".chosenDateYear");
  var monthYear = document.createElement('div');
  monthYear.setAttribute('class', 'navigationMonthYear')
  monthYear.innerHTML = `${monthCharactorize(month)} ${year}`;
  monthYearWrapper.appendChild(monthYear);
}

var navigationPrinter = function (month, year) {
  var monthYear = document.querySelector('.navigationMonthYear');
  monthYear.innerHTML = `${monthCharactorize(month)} ${year}`
}

var dateDivGenerator = function () {
  for ( var i = 0; i < 6; i++ ){
    var nthWeek = document.querySelector(`#week${i+1}`);
    for ( var j = 0; j < 7; j++ ){
      var date = document.createElement('div');
      date.setAttribute('class', `date date${0}`);
      nthWeek.appendChild(date);
    }
  }
}

var todayInit = function () {
  var today = document.querySelector(`#d${date}m${month}y${year}`);
  today.removeAttribute('id');
  today.setAttribute('id', 'clickedDate');
  justBeforeClicked.push(today);
  document.querySelector('.clickedDate').innerHTML = today.innerHTML;
  document.querySelector('.clickedDay').innerHTML = dayCharactorized[dateToDayCalculater(today.innerHTML, navigatedMonth, navigatedYear)];
}

navigationGenerator(month, year);
dateDivGenerator();
datesGenerator(month, year);
monthSetter();
todayInit();

//todolist----------------------------------------------------------------------------

var onModifying = [];
var input = document.querySelector('.input');
var inputButt = document.querySelector('.inputButt');

var initInput = function () {
  input.addEventListener('keyup', function (e){
    if(event.keyCode === 13){
      inputButt.click();
    }
  })
  inputButt.addEventListener('click',dutyGenerater);
};

var dailyToDoGenerator = function () {
  var toDoList = document.querySelector('.toDoList');
  var dutiesWrapper = document.createElement('div');
  var todoWrapper = document.createElement('div');
  var doneWrapper = document.createElement('div');
  dutiesWrapper.setAttribute('class', 'dutiesWrapper');
  todoWrapper.setAttribute('class', 'todoWrapper');
  doneWrapper.setAttribute('class', 'doneWrapper');
  dutiesWrapper.appendChild(todoWrapper);
  dutiesWrapper.appendChild(doneWrapper);
  toDoList.appendChild(dutiesWrapper);
};

var dutyGenerater = function(){
  if(input.value.length !== 0){
    var dutyWrapper = document.createElement('div');
    var dutyCheckBox = document.createElement('input');
    var dutyText = document.createElement('div');
    var dutyDeleter = document.createElement('button');
    dutyWrapper.setAttribute('class', 'dutyWrapper');
    dutyCheckBox.setAttribute('class', 'dutyFinisher');
    dutyCheckBox.setAttribute('type', 'checkbox');
    dutyText.setAttribute('class', 'dutyText');
    dutyDeleter.setAttribute('class', 'dutyDeleter');
    dutyDeleter.innerText = 'del';
    var todoWrapper = document.querySelector('.todoWrapper');
    var doneWrapper = document.querySelector('.doneWrapper');
    todoWrapper.appendChild(dutyWrapper);
    dutyWrapper.appendChild(dutyCheckBox);
    dutyWrapper.appendChild(dutyText);
    dutyWrapper.appendChild(dutyDeleter);
    dutyText.innerHTML = input.value;
    input.value = '';
    finishSetter(dutyCheckBox);
    deleteSetter(dutyDeleter);
    dutyModifier(dutyText);
  }
}

var finishSetter = function (finishButt) {
  finishButt.addEventListener('click', function (e) {
    var finishedDuty = e.target.parentNode;
    if( finishButt.checked === true ){
      finishedDuty.removeAttribute('class', 'DutyWrapper');
      finishedDuty.childNodes[1].removeAttribute('class', 'dutyText');
      finishedDuty.childNodes[2].removeAttribute('class', 'dutyDeleter');
      finishedDuty.setAttribute('class', 'finishedDutyWrapper');
      finishedDuty.childNodes[1].setAttribute('class', 'finishedText');
      finishedDuty.childNodes[2].setAttribute('class', 'finishedDutyDeleter');
      finishedDuty.remove();
      document.querySelector('.doneWrapper').appendChild(finishedDuty);
    } else {
      finishedDuty.removeAttribute('class', 'finishedDutyWrapper');
      finishedDuty.childNodes[1].removeAttribute('class', 'finishedText');
      finishedDuty.childNodes[2].removeAttribute('class', 'finishedDutyDeleter');
      finishedDuty.setAttribute('class', 'dutyWrapper');
      finishedDuty.childNodes[1].setAttribute('class', 'dutyText');
      finishedDuty.childNodes[2].setAttribute('class', 'dutyDeleter');
      finishedDuty.remove();
      document.querySelector('.todoWrapper').appendChild(finishedDuty);

    }
  })
}

var deleteSetter = function (deleteButt) {
  deleteButt.addEventListener('click', function (e) {
    e.target.parentNode.remove();
  })
}

var dutyModifier = function (dutyText) {
  dutyText.addEventListener('dblclick', function(e) {
    if(onModifying.length >= 1){
      var text = onModifying[0].childNodes[0].value;
      onModifying[0].childNodes[0].remove();
      onModifying[0].innerText = text;
      onModifying.length = 0;
    }
    if(e.target.innerText !== ""){
      var fixedWrapper = e.target;
      var modifiableWrapper = document.createElement('input');
      modifiableWrapper.value = fixedWrapper.innerText;
      modifiableWrapper.setAttribute('autofocus', true);
      modifiableWrapper.addEventListener('keypress', function(e){
        if (e.code == 'Enter') {
          e.target.parentNode.innerText = e.target.value;
          e.target.remove();
        }
      })
      fixedWrapper.innerHTML = "";
      fixedWrapper.appendChild(modifiableWrapper);
      onModifying.push(fixedWrapper);
    }
  })
}

initInput();
dailyToDoGenerator();
