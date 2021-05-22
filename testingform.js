var firebaseConfig = {
    apiKey: "AIzaSyBRRlpmkOLK2PPmI0IpcbH-8a86b1XtPsw",
    authDomain: "form-f587b.firebaseapp.com",
    databaseURL: "https://form-f587b-default-rtdb.firebaseio.com",
    projectId: "form-f587b",
    storageBucket: "form-f587b.appspot.com",
    messagingSenderId: "133936728270",
    appId: "1:133936728270:web:01f8ae39945f11f1f1689f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var UserInputsRef=firebase.database().ref('UserInputs')
  document.getElementById('testForm').addEventListener('submit',submitForm);
  function submitForm(e){
    e.preventDefault();
    var fname =getInputVal('firstname');
    var lname =getInputVal('lastname');
    var mobile =getInputVal('mobile');
    var state =getInputVal('state');
    state=state.toLowerCase();
    readState(state);
    var email =getInputVal('email');
    var emailstatus=validateEmail();
    var profession =getInputVal('profession');
    var dateofbirth =getInputVal('dateofbirth');
    var symptomsList =getSelectedCheckboxValues('symptoms');
    var selectedOption = document.querySelector('input[name = option]:checked').value;
    if(emailstatus)
    saveMessages(lname+ " " +fname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList);
}
function readState(state){
  var centers;
  var ref = firebase.database().ref(state);
  ref.on('value', (data) => {
   centers = data.val();
   document.getElementById("result").innerHTML ="<br>"+centers.toUpperCase();
})

}
function getInputVal(id){
  return document.getElementById(id).value;
}

function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList){
  var newuserInputsRef = UserInputsRef.push();
  newuserInputsRef.set({
      name:name,
      mobile:mobile,
      email:email,
      profession:profession,
      dateofbirth:dateofbirth,
      selectedOption:selectedOption,
      state:state, 
      symptomsList:symptomsList
  })
  alert("Thank you, find the list of centers nearby!  ");
}
function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
  });
  return values;
}

function validateEmail() 
{
if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
{
  return (true)
}
  alert("You have entered an invalid email address!")
  return (false)
}