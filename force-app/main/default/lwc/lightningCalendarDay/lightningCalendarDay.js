import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

/** Pub-sub mechanism for sibling component communication */
import { fireEvent } from 'c/pubsub';

/** The delay used when debouncing event handlers before firing the event. */
const DELAY = 350;

export default class LightningCalendarDay extends LightningElement {
    @api index;
    @api day;
    @api calendar;    
    
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
    }    

    get hasEventData() {
        return this.day != null;
    }
    get cellClass() {
        var s = 'cell';
        if (this.day.isThisMonth()) {
            s += ' day_this-month';
        } else {
            s += ' day_other-month';
        }
        return s;
    }
    get cellContentClass() {
        return '';
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