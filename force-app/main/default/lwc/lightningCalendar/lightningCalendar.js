import { LightningElement, track, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import { getCalendarInfo, buildCalendarForMonth } from 'c/calendarEngine';

export default class LightningCalendar extends LightningElement {
    @track calendar = {};
    @track calendarHasSixWeeks = false;

    @api showHeader = false;
    @api showWeekends = false;

    @wire (CurrentPageReference) pageRef;

    currentMonth;
    monthName = '';
    currentYear = '';

    events = [];
    weekdays = [];
    calendarInfo;
    setupComplete = false;


    get showFirstAndLastCells() {
        return true;
    }
    get calendarHasData() {
        //console.log('calendar has data', this.calendar.days.length);
        return this.calendar != null && this.calendar.days != undefined && this.calendar.days.length > 0;
    }
    renderedCallback() {
        if (this.setupComplete) {
            return;
        }
        this.setupComplete = true;

        let today = new Date();
        this.calendarInfo = getCalendarInfo();
        console.log('calendarInfo', this.calendarInfo);
        this.weekdays = this.calendarInfo.weekdays;        
        this.calendar = buildCalendarForMonth(today, this.calendarInfo, this.showWeekends);
        console.log('week1', this.calendar.week1.length);
        console.log('week2', this.calendar.week2.length);
        console.log('week3', this.calendar.week3.length);
        console.log('week4', this.calendar.week4.length);
        console.log('week5', this.calendar.week5.length);
        console.log('week6', this.calendar.week6.length);
        this.currentMonth = today.getMonth();
        console.log('month', this.currentMonth);
        console.log('months', this.calendarInfo.months);
        console.log('months', this.calendarInfo.months[this.currentMonth]);
        
        this.monthName = this.calendarInfo.months[this.currentMonth].monthName;
        this.currentYear = today.getFullYear();
        console.log('week6', this.calendar.week6);
        this.calendarHasSixWeeks = this.calendar.week6.length > 0;  
    }
    moveToNextMonth(event) {
        try {
            this.currentMonth++;
            if (this.currentMonth > 11) { 
                this.currentMonth = 0;
                this.currentYear++;
            }
            console.log('[moveToNextMonth] currentMonth', this.currentMonth);
            
            this.monthName = this.calendarInfo.months[this.currentMonth].monthName;
            this.calendar = buildCalendarForMonth(new Date(this.currentYear, this.currentMonth, 1), this.calendarInfo, this.showWeekends);
            this.calendarHasSixWeeks = this.calendar.week6.length > 0;    
            console.log('[moveToNextMonth] calendar', this.calendar);    
        }catch(ex) {
            console.log('[miniCalendar.moveToNextMonth] exception', ex);
        }
    }
    moveToPrevMonth(event) {
        try {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            console.log('[prevMonth] currentMonth', this.currentMonth);
            this.monthName = this.calendarInfo.months[this.currentMonth].monthName;
            this.calendar = buildCalendarForMonth(new Date(this.currentYear, this.currentMonth, 1), this.calendarInfo, this.showWeekends);
            this.calendarHasSixWeeks = this.calendar.week6.length > 0;        
            console.log('[prevMonth] calendar', this.calendar);
        }catch(ex) {
            console.log('[miniCalendar.moveToPrevMonth] exception', ex);
        }

    }

}