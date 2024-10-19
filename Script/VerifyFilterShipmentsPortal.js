function checkElementCount() {
 
    var elementText = Aliases.browser.pageMagayaDigitalFreightPortalHu2.sectionQwyk.panel125Of29770.textContent;

    var matches = elementText.match(/of\s(\d+)/);
    var totalCount = matches ? parseInt(matches[1]) : 0;

    var elements = [
        { name: "panelAylinTestCount", xpath: "//div[contains(text(), 'Aylin_test')]" },
        { name: "cellCount", xpath: "//td[div[contains(text(), 'Ocean')] and div/span[contains(text(), 'FCL')]]" },
        { name: "textnodeBooked2Count", xpath: "//span[@class='overflow-wrap ng-star-inserted']//div//span[contains(text(), 'Booked')]" }
    ];

    for (var i = 0; i < elements.length; i++) {
        var count = Aliases.browser.pageMagayaDigitalFreightPortalHu2.EvaluateXPath(elements[i].xpath).length;
        Log.Message("Count for " + elements[i].name + ": " + count);

        if (count === totalCount) {
            Log.Message(elements[i].name + " count matches totalCount.");
        } else {
            Log.Error(elements[i].name + " count does NOT match totalCount.");
        }
    }

    Log.Message("Extracted total number: " + totalCount);
}
