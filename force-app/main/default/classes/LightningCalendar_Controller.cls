public with sharing class LightningCalendar_Controller {
    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> getEventSummary(String fromDate, String toDate){
        Date today = Date.today();
        Date fDate = today.addMonths(-6);
        Date tDate = today.addMonths(6);

        if (fromDate != null && fromDate.length() > 0) {
            fDate = Date.parse(fromDate);
        }
        if (toDate != null && toDate.length() > 0) {
            tDate = Date.parse(toDate);
        }
        System.debug('fdate: ' + fDate.format());
        System.debug('tdate: ' + tDate.format());

        AggregateResult[] results = [SELECT COUNT(Id) theCount, ActivityDate
                                       FROM Event 
                                      WHERE ActivityDate >=:fdate
                                        AND ActivityDate <=:tDate
                                   GROUP BY ActivityDate
                                   ORDER BY ActivityDate];

        Map<String, Integer> theMap = new Map<String, Integer>();
        Integer count = 0;
        Integer totalCount = 0;
        String theDate = '';
        Date activityDate;
        for(AggregateResult ar : results) {
            activityDate = Date.valueOf(ar.get('ActivityDate'));
            count = Integer.valueOf(ar.get('theCount'));
            theDate = activityDate.year() + '-' + activityDate.month() + '-' + activityDate.day();
            totalCount = 0;
            if (theMap.containsKey(theDate)) {
                totalCount = (Integer)theMap.get(theDate);
            }

            totalCount += count;
            theMap.put(theDate, totalCount);
        }

        return theMap;
    }

    @AuraEnabled
    public static Map<String, List<Event>> getEvents(String fromDate, String toDate) {
        Date today = Date.today();
        Date fDate = today.addMonths(-6);
        Date tDate = today.addMonths(6);

        if (fromDate != null && fromDate.length() > 0) {
            fDate = Date.parse(fromDate);
        }
        if (toDate != null && toDate.length() > 0) {
            tDate = Date.parse(toDate);
        }

        List<Event> theEvents = [SELECT Id, ActivityDate, WhatId, ActivityDateTime, StartDateTime, EndDateTime
                                   FROM Event
                                  WHERE ActivityDate >=:fDate 
                                    AND ActivityDate <=:tDate
                                ORDER BY ActivityDateTime];

        Map<String, List<Event>> theMap = new Map<String, List<Event>>();
        Date activityDate;
        String theDate = '';
        List<Event> theList;
        for(Event theEvent : theEvents) {
            activityDate = theEvent.ActivityDate;
            theDate = activityDate.year() + '-' + activityDate.month() + '-' + activityDate.day();
            if (theMap.containsKey(theDate)) {
                theList = (List<Event>)theMap.get(theDate);
            } else {
                theList = new List<Event>();
            }

            theList.add(theEvent);
            theMap.put(theDate, theList);
        }

        return theMap;
    }
}
