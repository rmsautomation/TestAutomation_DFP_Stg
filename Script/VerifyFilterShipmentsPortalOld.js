﻿function checkElementCount() {
    // Get the text content from the specified section of the webpage
    var elementText = Aliases.browser.pageMagayaDigitalFreightPortalHu2.sectionQwyk.panel125Of29770.textContent;

    // Use a regular expression to extract the total count from the text
    var matches = elementText.match(/of\s(\d+)/);
    // Parse the extracted count as an integer, or set to 0 if no match is found
    var totalCount = matches ? parseInt(matches[1]) : 0;

    // Define an array of elements with their corresponding names and XPath expressions
    var elements = [
        { name: "panelAylinTestCount", xpath: "//div[contains(text(), 'Aylin_test')]" },
        { name: "cellCount", xpath: "//td[div[contains(text(), 'Ocean')] and div/span[contains(text(), 'FCL')]]" },
        { name: "textnodeBooked2Count", xpath: "//span[@class='overflow-wrap ng-star-inserted']//div//span[contains(text(), 'Booked') or contains(text(), 'Arrived')]" }
    ];

    // Iterate over each element in the array
    for (var i = 0; i < elements.length; i++) {
        // Evaluate the XPath and get the count of matching elements
        var count = Aliases.browser.pageMagayaDigitalFreightPortalHu2.EvaluateXPath(elements[i].xpath).length;
        // Log the count for the current element
        Log.Message("Count for " + elements[i].name + ": " + count);

        // Check if totalCount is greater than or equal to 25
        if (totalCount >= 25) {
            // Ensure the element count is exactly 25
            if (count === 25) {
                Log.Message(elements[i].name + " count is 25, and the test passes.");
            } else {
                Log.Error(elements[i].name + " count is NOT 25, test fails.");
            }
        } else {
            // If totalCount is less than 25, proceed with the usual comparison
            if (count === totalCount) {
                Log.Message(elements[i].name + " count matches totalCount.");
            } else {
                Log.Error(elements[i].name + " count does NOT match totalCount.");
            }
        }
    }

    // Log the extracted total number for reference
    Log.Message("Extracted total number: " + totalCount);
}
