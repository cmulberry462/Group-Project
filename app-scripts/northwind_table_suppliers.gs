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

// Write Data to Firestore

// Notes: You will need to add the Firestore APP Library and set the version level
//    click Resources > Add a Library > paste in this string: 
// 1VUSl4b1r1eoNcRWotZM3e87ygkxvXltOgyDZhixqncz9lQ3MjfT1iKFw 
//.                   select the latest version from the dropdown


//. GCP Firestore billing is based on the Usage (reads and writes) You are allowed 
//. visit https://firebase.google.com/docs/firestore/quotas to learn more about free-tier usage

// To stay within the free-tier limits,  export a limited numdber of documents while you are working out the data field names and values
// You can do this by changing the loop counter (in the example below I use 10)
// You can get the whole set of documents by using the data.length object as the loop counter limit
//  once you have the data migrating from the Google Sheet to Firestore. Below is the code for a loop using the data.length object

// for(var i = 1; i < data.length; i++) {


// --------------- Write Suppliers Data to Firestore ---------------------------------

function writeSuppliersDataToFirebase() {
  var email = "**Email Here**";
  var key = "**Key Here**";
  var projectId = "**Project ID Here**";
  var firestore = FirestoreApp.getFirestore(email, key, projectId);
  // var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  
  // Suppliers
  // SupplierID	CompanyName	ContactName	ContactTitle	Address	City	Region	PostalCode	Country	Phone	Fax	HomePage
  
  var sheetName = 'northwind_table_suppliers';
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
 var SupplierID = data[i][0];
 var CompanyName = data[i][1];
Logger.log(SupplierID + '-' + CompanyName);
 dataToImport[SupplierID + '-' + CompanyName] = {

   SupplierID:data[i][0],
   CompanyName:data[i][1],
   ContactName:data[i][2],
   ContactTitle:data[i][3],
   Address:data[i][4],
   City:data[i][5],
   Region:data[i][6],
   PostalCode:data[i][7],
   Country:data[i][8],
   Phone:data[i][9],
   Fax:data[i][10],
   HomePage:data[i][11]
   
};

firestore.createDocument("Suppliers/", dataToImport[SupplierID + '-' + CompanyName]);
// Logger.log(dataToImport);
}
}


