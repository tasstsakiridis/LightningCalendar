
export default class Day {
    constructor(key, theDay, events) {
        this.id = key || 0;
        this.date = theDay;
        this.events = events || [];
        this.count = this.events.length;
    }    

    get day() {
        return this.date == undefined ? 0 : this.date.getDate();
    }

    get month() {
        return this.date == undefined ? 0 : this.date.getMonth();
    }

    get year() {
        return this.date == undefined ? 0 : this.date.getFullYear();
    }

    get dayOfWeek() {
        return this.date == undefined ? 0 : this.date.getDay();
    }

    get isWeekend() {
        //console.log('isWeekend', this.date.getDay());
        if (this.date == undefined) {
            return false;
        } else {
            //return (this.date.getDay() == 0 || this.date.getDay() == 6);
            return true;
        }
    }
    get isToday() {
        return this.isSameDay(new Date());
    }

    get dayCellClass() {
        var s = 'cell slds-align_absolute-center';
        let today = new Date();
        if (this.month == today.getMonth()) {
            s += ' day_this-month';
        } else {
            s += ' day_other-month';
        }
    
        return s;
    }
    get dayCellContentClass() {
        var s = '';
        if (this.isToday) {
            s = 'cell-today slds-align_absolute-center';
        }

        return s;
    }
    get backgroundColor() {
        var s = '';
        let numberOfEvents = this.count;
        console.log('[Day] numberOfEvents', this.count);
        if (numberOfEvents > 0) {
            if (numberOfEvents < 3) {
                s = 'background-color: gray';
            } else if (numberOfEvents < 6) {
                s = 'background-color: orange';
            } else if (numberOfEvents >= 6) {
                s = 'background-color: blue';
            }
        } else {
            s = 'background-color: white;';
        }    
        return s;
    }

    isSame = (c_date) => {
        if (c_date == undefined) { return false; }
        return c_date.getTime() == this.date.getTime()
    }

    isSameDay = (c_date) => {
        if (c_date == undefined) { c_date = new Date(); }
        return (c_date.getFullYear() == this.year && c_date.getMonth() == this.month && c_date.getDate() == this.day);
    }

    isThisMonth = () => {
        let today = new Date();
        return (this.month == today.getMonth());
       
    }
    toDateString = () => {
        return this.year + '-' + (this.month + 1) + '-' + this.day;
    }
}