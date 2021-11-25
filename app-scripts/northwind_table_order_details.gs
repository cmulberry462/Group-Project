/*
Comsc230 - Group Project : Migrate Northwind Traders SQL Database to Google Cloud Firestore

Preliminary:

1. Clone the repo from: https://github.com/rhodyapps/Comsc230-SQL
2. Set up XAMPP and import the 'northwind' database from the 'nothwind_database.sql' file in the repo
3. Export CSV files for each of the tables in the database
4. Create a Google Sheet and import each of the CSV files 
*Note: Once you have the first sheet, use 'Insert Into' to import the other sheets into the SpreadSheet.
5. Create a Firestore Project 'NorthwindTraders' and enable anonymous login
7. In Firestore > Project Settings > Service Accounts generate a service account and store it in a secure file on your laptop
.  ** Do not include your service account file or data in a Github project **
8. Copy and past the email, key , and projectId into the appropriate fields in the App Script functions (below)
9. Add the FirestoreApp library:
      - In Google Sheet select Tools>Script Editor
     select Resources >the "Add a library" 
     enter the following id in the input box

     1VUSl4b1r1eoNcRWotZM3e87ygkxvXltOgyDZhixqncz9lQ3MjfT1iKFw

     click "Add." and choose the most recent version number.

10. Learn more about working with Google Sheets at:

 Google Developer Documentation : Spreadsheet Service
 https://developers.google.com/apps-script/reference/spreadsheet

*/ 

// Activate sheet by Name
function activateSheetByName(sheetName) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  sheet.activate();
  return sheet;
}


// Test Firestore Connection & Authentication

function testFirestore() {
  var email = "**Email Here**";
  var key = "**Key Here**";
  var projectId = "**Project ID Here**";
var firestore = FirestoreApp.getFirestore(email, key, projectId);
const data = {
"name": "test!"
}
firestore.createDocument("TestCollection/FirstDocument", data)
Logger.log(data);
}




// ------------------ Write Orders Details Data to Firestore -----------

function writeOrderDetailsDataToFirebase() {
  var email = "**Email Here**";
  var key = "**Key Here**";
  var projectId = "**Project ID Here**";
  var firestore = FirestoreApp.getFirestore(email, key, projectId);
  // var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  
  // Order Details
  // ID	OrderID	ProductID	UnitPrice	Quantity	Discount		
  
  var sheetName = 'northwind_table_order_details';
  var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  var ss = SpreadsheetApp.openByUrl(url);
  var sheet = activateSheetByName(sheetName);
Logger.log(sheetName);
  
  var data = sheet.getDataRange().getValues();
  var dataToImport = {};
  
// Logger.log(data.length); // the number of rows in the sheet
  
  // Use this loop code if you want all rows in the sheet: 
  //   for(var i = 1; i < data.length; i++) {
  
for(var i = 1; i < 10; i++) { 
 var ID = data[i][0];
 var ProductID = data[i][1];
Logger.log(ID + '-' + ProductID);
 dataToImport[ID + '-' + ProductID] = {

   ID:data[i][0],
   OrderID:data[i][1],
   ProductID:data[i][2],
   UnitPrice:data[i][3],
   Quantity:data[i][4],
   Discount:data[i][5],
   
  
};

firestore.createDocument("OrderDetails/", dataToImport[ID + '-' + ProductID]);
// Logger.log(dataToImport);
}
}