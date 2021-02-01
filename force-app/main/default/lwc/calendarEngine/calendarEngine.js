import Day from 'c/day';

/* Locale */
import FIRSTDAYOFWEEK from '@salesforce/i18n/firstDayOfWeek';

/* Custom Labels */
import label_january from '@salesforce/label/c.january';
import label_febuary from '@salesforce/label/c.february';
import label_march from '@salesforce/label/c.march';
import label_april from '@salesforce/label/c.april';
import label_may from '@salesforce/label/c.may';
import label_june from '@salesforce/label/c.june';
import label_july from '@salesforce/label/c.july';
import label_august from '@salesforce/label/c.august';
import label_september from '@salesforce/label/c.september';
import label_october from '@salesforce/label/c.october';
import label_november from '@salesforce/label/c.november';
import label_december from '@salesforce/label/c.december';

import label_monday from '@salesforce/label/c.monday';
import label_tuesday from '@salesforce/label/c.tuesday';
import label_wednesday from '@salesforce/label/c.wednesday';
import label_thursday from '@salesforce/label/c.thursday';
import label_friday from '@salesforce/label/c.friday';
import label_saturday from '@salesforce/label/c.saturday';
import label_sunday from '@salesforce/label/c.sunday';

const getCalendarInfo = () => {
    var isLeapYear = false;
    let today = new Date();
    let year = today.getFullYear();
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
        isLeapYear = true;
    }

    var calendar = {
        isLeapYear: isLeapYear,
        weekdays: [
            { name: 'sunday', label: label_sunday, abbreviation: 'S', day: 0 },
            { name: 'monday', label: label_monday, abbreviation: 'M', day: 1 },
            { name: 'tuesday', label: label_tuesday, abbreviation: 'T', day: 2 },
            { name: 'wednesday', label: label_wednesday, abbreviation: 'W', day: 3 },
            { name: 'thursday', label: label_thursday, abbreviation: 'T', day: 4 },
            { name: 'friday', label: label_friday, abbreviation: 'F', day: 5 },
            { name: 'saturday', label: label_saturday, abbreviation: 'S', day: 6 },        
        ],
        months: [
            { month: 0, monthName: label_january, daysInMonth: 31 },
            { month: 1, monthName: label_febuary, daysInMonth: (isLeapYear ? 29 : 28) },
            { month: 2, monthName: label_march, daysInMonth: 31 },
            { month: 3, monthName: label_april, daysInMonth: 30 },
            { month: 4, monthName: label_may, daysInMonth: 31 },
            { month: 5, monthName: label_june, daysInMonth: 30 },
            { month: 6, monthName: label_july, daysInMonth: 31 },
            { month: 7, monthName: label_august, daysInMonth: 30 },
            { month: 8, monthName: label_september, daysInMonth: 31 },
            { month: 9, monthName: label_october, daysInMonth: 31 },
            { month: 10, monthName: label_november, daysInMonth: 30 },
            { month: 11, monthName: label_december, daysInMonth: 31 }
        ]    
    };

    var day;
    if (FIRSTDAYOFWEEK == 7) {
        day = calendar.weekdays.pop();
        calendar.weekdays.unshift(day);
    } else if (FIRSTDAYOFWEEK == 2) {
        day = calendar.weekdays.shift();
        calendar.weekdays.push(day);
    }

    return calendar;
};

const buildCalendarForMonth = (theDate, ci, showWeekends) => {
    if (theDate == undefined) { theDate = new Date(); }

    var obj = {
        days: [],
        week1: [],
        week2: [],
        week3: [],
        week4: [],
        week5: [],
        week6: []
    };

    var day = 1;
    var thisMonth = theDate.getMonth();
    var year = theDate.getFullYear();

    let daysInMonth = ci.months[thisMonth].daysInMonth;

    let lastDayOfWeek = ci.weekdays[ci.weekdays.length - 1];
    let firstDayOfWeek = ci.weekdays[0];

    let startOfMonth = new Date(theDate.getFullYear(), theDate.getMonth(), 1);
    let endOfMonth = new Date(theDate.getFullYear(), theDate.getMonth(), daysInMonth);

    var prevMonth = thisMonth - 1;
    if (prevMonth < 0) { prevMonth = 11; year--; }
    var daysInPrevMonth = ci.months[prevMonth].daysInMonth;

    var ctr = 0;
    var dayIndex = 0;
    let startOfMonthDay = startOfMonth.getDay();
    if (startOfMonthDay != firstDayOfWeek.day) {
        for(var i = 0; i < ci.weekdays.length; i++) {
            if (ci.weekdays[i].day == startOfMonthDay) {
                dayIndex = i; break;
            }
        }
        
        day = daysInPrevMonth;
        for(var i = 0; i < dayIndex; i++) {            
            obj.days.unshift(new Day(ctr, new Date(year, prevMonth, day)));
            day--;
            ctr++;
        }
    }
    day = 1; year = theDate.getFullYear();
    for(var i = 0; i < daysInMonth; i++) {
        obj.days.push(new Day(ctr, new Date(year, thisMonth, day)));
        day++;
        ctr++;
    }

    var nextMonth = thisMonth + 1;
    if (nextMonth > 11) { nextMonth = 0; year++; }

    let endOfMonthDay = endOfMonth.getDay();

    if (endOfMonthDay != lastDayOfWeek) {
        for(var i = 0; i < ci.weekdays.length; i++) {
            if (endOfMonthDay == ci.weekdays[i].day) { 
                dayIndex = i; break;
            }
        }
        day = 1;
        for(var i = dayIndex+1; i < ci.weekdays.length; i++) {
            obj.days.push(new Day(ctr, new Date(year, nextMonth, day)));
            day++; ctr++;
        }
    } 
    
    ctr = 0;
    for(var i = 0; i < 7; i++) {
        if (obj.days[i].isWeekend) {
            if (showWeekends) {
                obj.week1[ctr] = obj.days[i];
                ctr++;
            }
        } else {
            obj.week1[ctr] = obj.days[i];
            ctr++;
        }        
    }

    ctr = 0;
    for(var i = 7; i < 14; i++) {
        if (obj.days[i].isWeekend) {
            if (showWeekends) {
                obj.week2[ctr] = obj.days[i];
                ctr++;
            }
        } else {
            obj.week2[ctr] = obj.days[i];
            ctr++;
        }
    }

    ctr = 0;
    for(var i = 14; i < 21; i++) {
        if (obj.days[i].isWeekend) {
            if (showWeekends) {
                obj.week3[ctr] = obj.days[i];
                ctr++;
            }
        } else {
            obj.week3[ctr] = obj.days[i];
            ctr++;
        }
    }

    ctr = 0;
    for(var i = 21; i < 28; i++) {
        if (obj.days[i].isWeekend) {
            if (showWeekends) {
                obj.week4[ctr] = obj.days[i];
                ctr++;
            }
        } else {
            obj.week4[ctr] = obj.days[i];
            ctr++;
        }
    }

    ctr = 0;
    for(var i = 28; i < 35; i++) {
        if (obj.days[i].isWeekend) {
            if (showWeekends) {
                obj.week5[ctr] = obj.days[i];
                ctr++;
            }
        } else {
            obj.week5[ctr] = obj.days[i];
            ctr++;
        }
    }

    ctr = 0;
    if (obj.days.length > 35) {
        for(var i = 35; i < 42; i++) {
            if (obj.days[i].isWeekend) {
                if (showWeekends) {
                    obj.week6[ctr] = obj.days[i];
                    ctr++;
                }
            } else {
                obj.week6[ctr] = obj.days[i];
                ctr++;
            }
        }
    }

    return obj;
};

export { getCalendarInfo, buildCalendarForMonth };