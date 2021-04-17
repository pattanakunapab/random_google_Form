const ss = SpreadsheetApp.getActiveSpreadsheet();
const SHEET_RECORDS = "Records";
const SHEET_BD_FORMS = "Forms_DB";

const doGet = () => {
  
  var html = HtmlService.createTemplateFromFile('Page')
  .evaluate()
  .setTitle('Exam');
  
  return html;
}

/*
 * This function generates a random exam between 1 or the number of forms and select the form with that number
 * @ returns the url form to the cliet.
 */
function lookForm(){
  
  var urlForm = '';
  var user = Session.getActiveUser().getEmail();
  var time = new Date();
  var numberOfForms = getNumberOfForms();
  var formNumber = Math.floor(Math.random() * (numberOfForms - 1 + 1) ) + 1;
  
  var sheetForm = ss.getSheetByName( SHEET_BD_FORMS );
  var sheetRecords = ss.getSheetByName( SHEET_RECORDS );
  var data = sheetForm.getDataRange().getValues();
  
  data.map(function( rowData){
    if( rowData[0] === formNumber ){
      sheetRecords.appendRow([ time, user, formNumber ]);
      urlForm = rowData[1];
    }
  });
  
  return urlForm;
}

/*
 * Function that counts how many exams are in the Forms_DB sheet
 * @returns the number of forms
 */
function getNumberOfForms(){
  
  var numberOfForms = 0;
  
  var data = ss.getSheetByName( SHEET_BD_FORMS ).getDataRange().getValues();
  data.shift();
  data.map( function(row){
    if(row[0])
      numberOfForms++;
  });
  return numberOfForms;
}
