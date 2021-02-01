<aura:application extends="force:slds">

    <lightning:layout multipleRows="true">
        <lightning:layoutItem size="12">
            <!-- Banner -->
            Banner
        </lightning:layoutItem>
        <lightning:layoutItem size="12">
            <lightning:layout>
                <aura:if isTrue="{!not($Browser.isPhone)}">
                    <lightning:layoutItem size="4">
                        <!-- Left sidebar -->
                        Left sidebar
                    </lightning:layoutItem>                    
                </aura:if>
                <lightning:layoutItem size="{!$Browser.isPhone ? 10 : 6}">
                    <!-- Calendar -->
                    Calendar
                </lightning:layoutItem>
                <lightning:layoutItem size="2">
                    <!-- Right sidebar -->
                    Right Sidebar
                </lightning:layoutItem>
            </lightning:layout>
        </lightning:layoutItem>
    </lightning:layout>
</aura:application>	
