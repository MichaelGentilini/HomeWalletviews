var axios = require("axios");
var parseString = require("xml2js").parseString;

function convertToJSON2(details) {
  parseString(details, function(err, result) {
    // console.log(JSON.stringify(result, null, 2));
    const homeData =
      result["UpdatedPropertyDetails:updatedPropertyDetails"].response[0];
    console.log("\n====================================");
    console.log("\t In Depth Search");
    console.log("\n====================================");
    console.log("\t Image Links");
    console.log("====================================\n");

    for (
      let index = 0;
      index < homeData.images[0].image[0].url.length;
      index++
    ) {
      console.log(homeData.images[0].image[0].url[index]);
    }
    console.log("\n====================================");
    console.log("\t Other Home Facts");
    console.log("====================================\n");
    console.log(homeData.editedFacts[0]);
  });
}

function convertToJSON(xml) {
  parseString(xml, function(err, result) {
    // console.log(JSON.stringify(result, null, 2));
    const propData =
      result["SearchResults:searchresults"].response[0].results[0].result;
    console.log("\n====================================");
    console.log("\t Basic Search Results");
    console.log("====================================\n");
    console.log("Year Built:", propData[0].yearBuilt[0]);
    console.log("Lot Size:", propData[0].lotSizeSqFt[0]);
    console.log("Square Footage:", propData[0].finishedSqFt[0]);
    console.log("Bedrooms:", propData[0].bedrooms[0]);
    console.log("Bathrooms:", propData[0].bathrooms[0]);
    console.log("Tax Assessment: $" + propData[0].taxAssessment[0]);
    console.log("Year:", propData[0].taxAssessmentYear[0]);
    console.log("Zestimate: $" + propData[0].zestimate[0].amount[0]._);
    console.log(
      "Zestimate Low:",
      propData[0].zestimate[0].valuationRange[0].low[0]._
    );
    console.log(
      "Zestimate High:",
      propData[0].zestimate[0].valuationRange[0].high[0]._
    );
    console.log("Links:", propData[0].links[0].homedetails[0]);
    console.log("\n\n");
  });
}

function convertToJSON2(details) {
  parseString(details, function(err, result) {
    // console.log(JSON.stringify(result, null, 2));
    const homeData =
      result["UpdatedPropertyDetails:updatedPropertyDetails"].response[0];
    console.log("\n====================================");
    console.log("\t In Depth Search");
    console.log("====================================\n");
    console.log(homeData.editedFacts[0]);
    console.log("\n");
    console.log("\t\t Image Links\n");

    for (
      let index = 0;
      index < homeData.images[0].image[0].url.length;
      index++
    ) {
      console.log(homeData.images[0].image[0].url[index]);
    }
  });
}

const key = "X1-ZWz17qsn6y1wjv_ac8os";
const address = "3113%20Jamestown%20Drive";
const zip = 75150;
const zpid = 27126333;

var search = axios
  .get(
    `https://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${key}&address=${address}&citystatezip=${zip}`
  )
  .then(function(response) {
    // console.log(response);
    convertToJSON(response.data);
  })
  .then(function() {
    secondSearch();
  })
  .catch(function(error) {
    console.log(error);
  });

const url2 = `http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=${key}&zpid=${zpid}`;

secondSearch = () => {
  var search2 = axios
    .get(url2)
    .then(function(response) {
      convertToJSON2(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};
