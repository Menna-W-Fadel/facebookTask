var modal = document.getElementById('signupForm');
modal.style.display ="none";


function loginValidation(){
    //login form data
    var login=document.getElementById("logInSubmission");
    var username = document.getElementById("username").value;
    var user_pass = document.getElementById("Upassword").value;
    var popUpEmail = document.getElementById("emailError");
    var popUpPass = document.getElementById("passwordError");

    if(username==''){
        popUpEmail.innerHTML="The email address or mobile number you entered isn't connected to an account.";
        return false;
    }
    else if(isNaN(username)&&username.indexOf("@")==-1)
    {
        popUpEmail.innerHTML="You entered invalid email. \"@\" is missing!";
        return false;
    }
    else if(user_pass=='')
    {
        popUpPass.innerHTML="The password that you've entered is incorrect.";
        return false;
    }
    else{
        login.submit();
        return true;
    }

}

//////////////////////////////////////////////


//signup form data

var SignUpform=document.getElementById("sumbissionForm");

var firstName = document.getElementById("fname");
var sureName = document.getElementById("lname");
var email=document.getElementById("em");
var pass=document.getElementById("ps");
var birthDay =document.getElementById("day");
var birthMonth=document.getElementById("month");
var birthYear=document.getElementById("year");
var gender=document.getElementsByName("gender") 

var fnamePopUp = document.getElementById("firstNameError");
var lnamePopUp = document.getElementById("sureNameError");
var newEmail =document.getElementById("signEmailError");
var newPassword = document.getElementById("newPassErorr");
var birthPopUp=document.getElementById("dateError");
var genderPopUp=document.getElementById("genderError");

var currenDate=new Date();

const user_data = [firstName,sureName,email,pass,birthDay,birthMonth,birthYear];
const errorMessages=[fnamePopUp,lnamePopUp,newEmail,newPassword,birthPopUp,birthPopUp,birthPopUp,genderPopUp];

///functions
function showErrorMessage(index) {
    errorMessages[index].classList.remove('hidden');
}

function hideErrorMessage(index) {
    errorMessages[index].classList.add('hidden');
}


function validateBirthYear(){
    if(birthYear.value==currenDate.getFullYear())
    {
        return false;
    }
    else if(birthDay.value==''||birthMonth.value==''||birthYear.value=='')
    {
        return false;
    }
    else if(birthDay.value ==currenDate.getDate() && birthMonth.value==currenDate.getMonth()+1 && birthYear.value==currenDate.getFullYear())
    {
        return false;
    }

    return true;
}

function validateGender(){
    for(var i=0;i<gender.length;i++)
    {
        if(gender[i].checked)
        {
            return true;
        }
    }
    return false;
}


function signUpValidation(event){
    event.preventDefault();
    var flag=true;

    user_data.forEach((data, index) => {
        if (data.value == '')
        {
            showErrorMessage(index);
            flag = false;
        } 
        else 
        {
        hideErrorMessage(index);
        }
    });

    if((pass.value.length < 6 )|| (pass.value.indexOf("@")==false && pass.value.indexOf("$")==-1 && pass.value.indexOf("*")==-1 && pass.value.indexOf("!")==-1 && pass.value.indexOf("&")==-1 && pass.value.indexOf("#")==-1 && pass.value.indexOf("%")==-1))
    {
        showErrorMessage(3);
        flag = false;
    }

    if(!validateBirthYear())
    {
        showErrorMessage(4);
        flag = false;
    }

    if(!validateGender())
    {
        genderPopUp.classList.remove("hidden");
        flag=false;
    }
    if (flag) {
        SignUpform.submit();
    }
}

SignUpform.addEventListener('submit', signUpValidation);

user_data.forEach((data, index) => {
    data.addEventListener('focus', () => hideErrorMessage(index));
    data.addEventListener('blur', () => {
      if (data.value == '') {
        showErrorMessage(index);
      }
    });
});

gender.forEach((data)=> {
    data.addEventListener('focus',()=>{genderPopUp.classList.add("hidden")});
    data.addEventListener("blur",()=> {
        if(!validateGender())
        {
            genderPopUp.classList.remove("hidden");
        }});
});