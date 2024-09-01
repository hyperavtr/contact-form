// #VARIABLES
// SUBMISSION ALERT
const successAlert = document.querySelector(".submission-success-alert");
//FORM
contactForm = document.querySelector(".contact-form");
// INPUTS
const inputText = document.querySelectorAll("input[type=text]");
const inputEmail = document.querySelector("input[type=email]");
const inputMessage = document.querySelector("#message");
//REGULAR EXPRESSION FOR EMPTY SPACE
const regexEmpty = /^\s*$/;
//TEXT INPUTS ARRAY
const textInputs = [inputText, inputEmail, inputMessage];
//RADIO CONTAINERS
const containersRadio = document.querySelectorAll(
  ".contact-form__radio-option",
);
// INPUTS RADIO
const inputRadio = document.querySelectorAll("input[type=radio]");
//CHECKBOX CONSENT
const checkboxConsent = document.querySelector("input[type=checkbox]");
//SUBMIT
const submitBtn = document.querySelector(".contact-form__submit");

// #FUNCTIONS
//COMMON VISUAL EFFECTS
//REQUIRED (EVENT)
function showRequiredError(e) {
  e.target.classList.add("error-border");
  e.target.nextElementSibling.classList.remove("hidden");
}
function hideRequiredError(e) {
  e.target.classList.remove("error-border");
  e.target.nextElementSibling.classList.add("hidden");
}
//ALLOWED SYMBOLS (EVENT)
function showAllowedSymbolsError(e) {
  e.target.classList.add("error-border");
  e.target.nextElementSibling.nextElementSibling.classList.remove("hidden");
}
function hideAllowedSymbolsError(e) {
  e.target.classList.remove("error-border");
  e.target.nextElementSibling.nextElementSibling.classList.add("hidden");
}
// SUCCESS(EVENT)
function showSuccessRadioEffects(e) {
  e.target.classList.add("success-border");
  e.target.classList.add("success-background");
}
function hideSuccessRadioEffects(e) {
  e.target.classList.remove("success-border");
  e.target.classList.remove("success-background");
}
// NONE EVENT
function hideSuccessRadioEffectsPON(prevOrNext) {
  prevOrNext.classList.remove("success-border");
  prevOrNext.classList.remove("success-background");
}
function showNextElementError(contactField) {
  contactField.nextElementSibling.classList.remove("hidden");
  contactField.classList.add("error-border");
}
function hideNextElementError(contactField) {
  contactField.nextElementSibling.classList.add("hidden");
  contactField.classList.remove("error-border");
}
function showLastPossibleError(ErrorContainer) {
  const showErrorInThere = document.querySelector(ErrorContainer);
  showErrorInThere.lastElementChild.classList.remove("hidden");
}
function hideLastPossibleError(ErrorContainer) {
  const hideErrorInThere = document.querySelector(ErrorContainer);
  hideErrorInThere.lastElementChild.classList.add("hidden");
}

//MOUSE OVER INPUTS
let ifItWasChanged = false;
const mouseOverInputs = (e) => {
  if (e.target.type == "text") {
    if (
      !e.target.classList.contains("error-border") &&
      !e.target.classList.contains("success-border") &&
      !ifItWasChanged
    ) {
      e.target.classList.add("success-border--hover");
      ifItWasChanged = true;
    }
  } else {
    if (
      !e.target.classList.contains("error-border") &&
      !e.target.classList.contains("success-border") &&
      !ifItWasChanged &&
      e.target.nextElementSibling.classList.contains("hidden")
    ) {
      e.target.classList.add("success-border--hover");
      ifItWasChanged = true;
    }
  }
};

//MOUSE OUT OF INPUTS
const mouseOutInputs = (e) => {
  if (!e.target.classList.contains("error-border") && ifItWasChanged) {
    e.target.classList.remove("success-border--hover");
    ifItWasChanged = false;
  }
};

//CALL MOUSE OVER INPUTS AND OUT OF THEM
textInputs.forEach((input) => {
  if (input instanceof NodeList) {
    input.forEach((inInput) => {
      inInput.addEventListener("mouseover", (e) => {
        mouseOverInputs(e);
      });
      inInput.addEventListener("mouseout", (e) => {
        mouseOutInputs(e);
      });
    });
  } else {
    input.addEventListener("mouseover", (e) => {
      mouseOverInputs(e);
    });
    input.addEventListener("mouseout", (e) => {
      mouseOutInputs(e);
    });
  }
});

// UNFOCUS NAMES AND EMAIL INPUTS
const unfocus = (e) => {
  if (regexEmpty.test(e.target.value)) {
    hideAllowedSymbolsError(e);
    e.target.classList.remove("success-border");
    e.target.classList.remove("success-border--hover");
    return showRequiredError(e);
  }

  const regexAllowed =
    e.target.id === "email"
      ? /^[\w\d]+[@]+[a-z]+\.+[a-z]{2,3}$/
      : /^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/;

  if (regexAllowed.test(e.target.value)) {
    hideRequiredError(e);
    hideAllowedSymbolsError(e);
    e.target.classList.add("success-border");
  } else if (!regexAllowed.test(e.target.value)) {
    hideRequiredError(e);
    e.target.classList.remove("success-border");
    e.target.classList.remove("success-border--hover");
    showAllowedSymbolsError(e);
  }
};

// CALL UNFOCUS NAME1 AND NAME2
inputText.forEach((input) => {
  input.addEventListener("focusout", (e) => {
    unfocus(e);
  });
});
// CALL UNFOCUS EMAIL
inputEmail.addEventListener("focusout", (e) => {
  unfocus(e);
});

// UNFOCUS TEXTAREA/MESSAGE
inputMessage.addEventListener("focusout", (e) => {
  regexEmpty.test(e.target.value) ? showRequiredError(e) : hideRequiredError(e);
});

// CLICK ON CONTAINERS TO CHOOSE IT'S CHILD ELEMENT RADIO AND SUCCESS EFFECTS ON
const toChooseRadioViaItsContainer = (e) => {
  const targetRO = e.target.classList.contains("contact-form__radio-option");
  const targetS = e.target.classList.contains("success-background");
  if (targetRO && !targetS) {
    const prevOrNextElement =
      e.target.previousElementSibling || e.target.nextElementSibling;
    hideSuccessRadioEffectsPON(prevOrNextElement);
    e.target.firstChild.nextSibling.checked = true;
    showSuccessRadioEffects(e);
  }
  hideLastPossibleError(".contact-form__query-type");
};

//CALL CLICK ON RADIO CONTAINER TO ADD SUCCESS EFFECT
containersRadio.forEach((container) => {
  container.addEventListener("click", (e) => {
    toChooseRadioViaItsContainer(e);
  });
});

// CLICK ON RADIO OR LABEL DIRECTLY TO CHOOSE AND SUCCESS EFFECTS ON
const ifChooseRadioDirectly = (e) => {
  const prevOrNextElement =
    e.target.parentElement.nextElementSibling ||
    e.target.parentElement.previousElementSibling;
  hideSuccessRadioEffectsPON(prevOrNextElement);
  e.target.parentElement.classList.add("success-background");
  e.target.parentElement.classList.add("success-border");
  hideLastPossibleError(".contact-form__query-type");
};

// CALL CHANGE RADIO //WHEN RADIO CHANGES ADD SUCCESS EFFECT
inputRadio.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    ifChooseRadioDirectly(e);
  });
});

//SUBMIT
const submit = () => {
  let isConditionsFullfiled = true;
  inputText.forEach((input) => {
    if (!input.classList.contains("success-border")) {
      showNextElementError(input);
      isConditionsFullfiled = false;
    }
    input.classList.remove("success-border--hover");
  });
  if (!inputEmail.classList.contains("success-border")) {
    showNextElementError(inputEmail);
    isConditionsFullfiled = false;
  }
  inputEmail.classList.remove("success-border--hover");
  let isRadioConditionFullfiled = true;
  for (const radio of inputRadio) {
    if (radio.checked) {
      hideLastPossibleError(".contact-form__query-type");
      break;
    } else if (!radio.checked) {
      showLastPossibleError(".contact-form__query-type");
      isRadioConditionFullfiled = false;
    }
  }

  if (regexEmpty.test(inputMessage.value)) {
    showLastPossibleError(".contact-form__message");
    isConditionsFullfiled = false;
  }

  let isConsentConditionFullfiled = true;
  if (!checkboxConsent.checked) {
    showLastPossibleError(".contact-form__consent");
    isConsentConditionFullfiled = false;
  } else {
    hideLastPossibleError(".contact-form__consent");
  }

  if (
    !isConditionsFullfiled ||
    !isRadioConditionFullfiled ||
    !isConsentConditionFullfiled
  ) {
    successAlert.classList.add("hidden");
    contactForm.style.marginTop = "2.2rem";
  } else {
    if (successAlert.classList.contains("show-success-alert")) {
      successAlert.classList.remove("show-success-alert");
    }
    successAlert.classList.remove("hidden");
    contactForm.style.marginTop = "0";
    reset();
    setTimeout(() => {
      successAlert.classList.add("show-success-alert");
    }, 500);
  }
};

//CALL SUBMIT
submitBtn.addEventListener("click", (e) => {
  submit(e), e.preventDefault();
});

submitBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//RESET
const reset = () => {
  //NAME1&2
  inputText.forEach((input) => {
    input.classList.remove("success-border");
    input.value = "";
  });
  //EMAIL
  inputEmail.classList.remove("success-border");
  inputEmail.value = "";
  //RADIO
  inputRadio.forEach((radio) => {
    if (radio.checked) {
      radio.checked = false;
    }
  });
  radioOptions = document.querySelectorAll(".contact-form__radio-option");
  radioOptions.forEach((option) => {
    option.classList.remove("success-background");
    option.classList.remove("success-border");
  });
  //MESSAGE
  inputMessage.value = "";
  //CHECKBOX
  checkboxConsent.checked = false;
};
//CALL RESET
reset();

//RESIZE VIA MEDIA
const media664vw = window.matchMedia("(min-width:664px)");
const media801vh = window.matchMedia("(max-height:801px)");

function resizeVerticalMargin(e) {
  if (e.matches) {
    if (!successAlert.classList.contains("hidden")) {
      contactForm.style.marginTop = "0";
      contactForm.style.marginBottom = "2.2rem";
    }
  } else if (!e.matches) {
    if (!successAlert.classList.contains("hidden")) {
      contactForm.style.marginBottom = "0";
    }
  }
}
media801vh.addEventListener("change", resizeVerticalMargin);
media664vw.addEventListener("change", resizeVerticalMargin);
