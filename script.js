// #VARIABLES
// SUBMISSION ALERT
const successAlert = document.querySelector(".submission-success-alert");
//FORM
mainContContactForm = document.querySelector(".contact-form__main-container");
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
      ? /^[\W\w\d]+[@]+[a-z]+\.[a-z]{2,3}$/
      : /^([\u0410-\u042FҐЄЇІ]|[A-Z])([a-z]|[\u0400-\u04FFґєїі']+)*(?:\s[A-Z][a-z]*)*$/;

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
  let isConditionsFulfilled = true;
  //NAME1&NAME2
  inputText.forEach((input) => {
    if (!input.classList.contains("success-border")) {
      showNextElementError(input);
      isConditionsFulfilled = false;
    }
    input.classList.remove("success-border--hover");
  });
  //EMAIL
  if (!inputEmail.classList.contains("success-border")) {
    showNextElementError(inputEmail);
    isConditionsFulfilled = false;
  }
  inputEmail.classList.remove("success-border--hover");
  //RADIO
  let isRadioConditionFulfilled = true;
  for (const radio of inputRadio) {
    if (radio.checked) {
      hideLastPossibleError(".contact-form__query-type");
      isRadioConditionFulfilled = true;
      break;
    } else if (!radio.checked) {
      showLastPossibleError(".contact-form__query-type");
      isRadioConditionFulfilled = false;
    }
  }
  //MESSAGE
  if (regexEmpty.test(inputMessage.value)) {
    inputMessage.classList.add("error-border");
    showLastPossibleError(".contact-form__message");
    isConditionsFulfilled = false;
  }
  //CONSENT
  let isConsentConditionFulfilled = true;
  if (!checkboxConsent.checked) {
    showLastPossibleError(".contact-form__consent");
    isConsentConditionFulfilled = false;
  } else {
    hideLastPossibleError(".contact-form__consent");
  }
  //IF THE CONDITIONS ARE NOT FULFILLED
  if (
    !isConditionsFulfilled ||
    !isRadioConditionFulfilled ||
    !isConsentConditionFulfilled
  ) {
    //HIDE SUCCESS ALERT AND SCROLL TO THE FURTHEST ERROR
    successAlert.classList.add("hidden");
    const ErrorElements = document.querySelectorAll(".error-text");
    for (let element of ErrorElements) {
      if (!element.classList.contains("hidden")) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      }
    }
    //IF THE CONDITIONS ARE FULFILLELD
  } else {
    //SHOW SUCCESS ALERT, RESET ALL FIELDS, DELETE MARGIN-TOP
    successAlert.classList.remove("hidden");
    reset();
    //SCROLL TO THE TOP OF THE PAGE
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    //ANIMATION
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function runSuccessAnimation() {
      await delay(400);
      successAlert.classList.add("show-success-alert");

      await delay(1400);
      successAlert.classList.add("move-success-alert");

      await delay(300);
      successAlert.classList.add("fade-success-alert");

      await delay(400);
      successAlert.classList.add("hidden");
      successAlert.classList.remove("show-success-alert");
      successAlert.classList.remove("move-success-alert");
      successAlert.classList.remove("fade-success-alert");
    }

    // RUN THE ANIMATION
    runSuccessAnimation().catch((error) => {
      console.error("Error:", error);
    });
  }
};

//CALL SUBMIT
submitBtn.addEventListener("click", (e) => {
  submit(e), e.preventDefault();
});

submitBtn.addEventListener("click", () => {});

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
/* const media664px = window.matchMedia("(min-width:664px)");
const media801px = window.matchMedia("(max-height:801px)");

const resizeVerticalMargin = (e) => {
  if (e.matches) {
    if (!successAlert.classList.contains("hidden")) {
      mainContContactForm.style.paddingTop = "2.2";
    } else {
      mainContContactForm.style.paddingTop = "0";
    }
  }
};
media801vh.addEventListener("change", resizeVerticalMargin);
media664vw.addEventListener("change", resizeVerticalMargin); */

//CHANGE BODY'S MARGIN IF CONTAINER GETS BIGGER
/* const body = document.querySelector("body");

const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    if (entry.contentRect.height > 854 && entry.contentRect.width > 695) {
      body.style.margin = "5rem 0";
    } else if (
      entry.contentRect.height > 826 &&
      entry.contentRect.width > 695
    ) {
      body.style.margin = "4rem 0";
    } else if (
      entry.contentRect.height > 769 &&
      entry.contentRect.width > 695
    ) {
      body.style.margin = "2rem 0";
    } else {
      body.style.margin = "0";
    }
  }
});

resizeObserver.observe(contactForm); */
