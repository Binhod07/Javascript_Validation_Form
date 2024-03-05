const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const conf_password = document.getElementById("conf_password");

//* Error Message Function
function errorMessage(input, message) {
  // accessing the parent
  const form_control = input.parentElement;
  form_control.className = "form-control error";
  // using the form control(parent) to access span(child)
  const span = form_control.querySelector("span");
  // add error message
  span.innerText = message;
}
//* Success Message Function
function successMessage(input) {
  // accessing the parent
  const form_control = input.parentElement;
  form_control.className = "form-control success";
}

//* Email Function
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    successMessage(input);
  } else {
    errorMessage(input, "Invalid Email Address!");
  }
}

// Function to validate all fields
function validateAllField(inputArray) {
  inputArray.forEach(function (input) {
    //console.log(input);
    // error message for all input fields
    if (input.value.trim() === "") {
      errorMessage(input, `${upperCaseLetter(input)} is required`);
    } else {
      successMessage(input);
    }
  });
}

// display error message for first letter is uppercase
function upperCaseLetter(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    errorMessage(
      input,
      `${upperCaseLetter(input)} Must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    errorMessage(
      input,
      `${upperCaseLetter(input)} Must be at less than ${max} characters`
    );
  } else {
    successMessage(input);
  }
}

// password match
function passwordMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    errorMessage(confirmPassword, "Password do not match");
  }
}

// Event listener
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Function to validate all fields
  validateAllField([username, email, password, conf_password]);
  checkLength(username, 4, 20);
  checkLength(password, 8, 20);
  checkEmail(email);
  passwordMatch(password, conf_password);
});
