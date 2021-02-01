import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

/** Pub-sub mechanism for sibling component communication */
import { fireEvent } from 'c/pubsub';

/** The delay used when debouncing event handlers before firing the event. */
const DELAY = 350;

export default class LightningMiniCalendarDay extends LightningElement {
    @api index;
    @api day;
    @api calendar;    
    
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        //console.log('[miniCalendarDay] day', this.day);        
        /*
        this.cellClass = 'cell slds-align_absolute-center';
        this.cellContentClass = '';
        if (this.day != undefined) {   
            this.theDateString = this.day.year + '-' + (this.day.month+1) + '-' + this.day.day;
            this.theDate = this.day.date;
            //this.day = this.calendar[this.index];
            console.log('day.index', this.day.id);
            console.log('day.date', this.day.date);
                let numberOfEvents = this.day.count;
            if (numberOfEvents > 0) {
                if (numberOfEvents < 3) {
                    this.cellClass += ' few-events';
                } else if (numberOfEvents < 6) {
                    this.cellClass += ' some-events';
                } else if (numberOfEvents >= 6) {
                    this.cellClass += ' many-events';
                }
            } else {
                this.cellClass += ' no-events';
            }    
        }

        let today = new Date();
        if (this.day.isSameDay(today)) {
            console.log('this is today. day: ' + this.day.day + ', month: ' + this.day.month);
            this.cellContentClass = 'cell-today slds-align_absolute-center ';
        } else {
            this.cellContentClass = '';
        }
        if (this.day.month == today.getMonth()) {
            this.cellClass += ' day_this-month ';
        } else {
            this.cellClass += ' day_other-month ';
        }
        */
    }    

    get hasEventData() {
        return this.day != null;
    }
    get cellClass() {
        return this.day.dayCellClass;
    }
    get cellContentClass() {
        return this.day.dayCellContentClass;
    }
    get theDate() {
        return this.day.date;
    }
    get theDateString() {
        return this.day.toDateString();
    }
    get backgroundColor() {
        return this.day.backgroundColor;
    }

    handleDayClick(event) {
        this.delayedFireClickEvent();
    }

    delayedFireClickEvent() {
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            fireEvent(this.pageRef, 'date_selected', this.date);
        }, DELAY);
    }
}