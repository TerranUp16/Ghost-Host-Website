// Validate the text input elements contain data longer than one character.
function nonEmptyText($element) {
  return $element.val().trim().length > 1;
}

// Validate all form elements have data entered or selected
function nonNullSelect($element) {
  let kids = $element.children();

  return kids.filter(":selected").length > 0;
}

// Retrieve items which have checked attribute
function getChecked($elements) {
  return $elements.filter(":checked");
}

// Validate the zip code is numeric and is five digits long
function validZip($element) {
  let re = /^[\d]{5}$/;
  return re.test($element.val().trim());
}

// Validate the phone number is numeric and is 10 digits long
function validPhone($element) {
  let re = /^[\d]{10}$/;
  return re.test($element.val().trim());
}

/* 
  Validate the email address
    a.  contains an ‘@’ followed by at least one character
    b.  contains a ‘.’ followed by at least one character
*/
function validEmail($element) {
  let re = /^.*@[\S]+\.[\S]+$/;

  return re.test($element.val().trim());
}

// Remove valid class if exists and add invalid class
function invalidate($element) {
  $element.removeClass("is-valid").addClass("is-invalid");
}

// Remove invalid class if exists and add valid class
function validate($element) {
  $element.removeClass("is-invalid").addClass("is-valid");
}

// Handle form submission validation
function registrationSubmission(event) {
  let valid = true;

  let $firstName = $("#first-name");

  if (nonEmptyText($firstName)) {
    validate($firstName);
  } else {
    valid = false;
    invalidate($firstName);
  }

  let $lastName = $("#last-name");

  if (nonEmptyText($lastName)) {
    validate($lastName);
  } else {
    valid = false;
    invalidate($lastName);
  }

  let $address = $("#address");

  if (nonEmptyText($address)) {
    validate($address);
  } else {
    valid = false;
    invalidate($address);
  }

  let $city = $("#city");

  if (nonEmptyText($city)) {
    validate($city);
  } else {
    valid = false;
    invalidate($city);
  }

  let $state = $("#state");

  if (nonNullSelect($state))
  {
    validate($state);
  } else {
    valid = false;
    invalidate($state);
  }

  let $zip = $("#zip");

  if (validZip($zip)) {
    validate($zip);
  } else {
    valid = false;
    invalidate($zip);
  }

  let $phone = $("#phone");

  if (validPhone($phone)) {
    validate($phone);
  } else {
    valid = false;
    invalidate($phone);
  }

  let $phoneTypes = $(".form-check-input[name='phone-type']");

  let $phoneType = getChecked($phoneTypes);

  if ($phoneType.checked) {
    valid = false;
    invalidate($phoneType);
  } else {
    validate($phoneType);
  }

  let $email = $("#email");

  if (validEmail($email)) {
    validate($email);
  } else {
    valid = false;
    invalidate($email);
  }

  if (!valid) {
    event.preventDefault();
    invalidate($("#registration"));
  } else {
    event.preventDefault();
  }
}

// Setup handlers
$(function() {
  // Intercept form submission
  $("#registration").submit(registrationSubmission);
  $("#submit").click(registrationSubmission);
});