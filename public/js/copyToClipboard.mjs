const copyEmailButton = document.querySelector(
  "[data-copy-email-button]"
);
const copyEmailDescription = document.querySelector(
  "[data-copy-email-description]"
);

function forceVisible(element) {
  element.style.opacity = "1";
}

function allowToFade(element) {
  element.style.removeProperty("opacity");
}

function setText(element, text) {
  element.replaceChildren(document.createTextNode(text));
}

async function copyEmailToClipboard() {
  const emailAddress = document.querySelector('[data-xor-decoded="true"]');
  await navigator.clipboard.writeText(emailAddress.textContent);

  forceVisible(copyEmailDescription);
  setText(copyEmailDescription, "Copied");

  setTimeout(() => {
    allowToFade(copyEmailDescription);

    if (copyEmailButton.matches(":hover")) {
      copyEmailButton.addEventListener("mouseout", () => {
        setTimeout(() => {
          setText(copyEmailDescription, "Copy");
        }, 300);
      });
    } else {
      setTimeout(() => {
        setText(copyEmailDescription, "Copy");
      }, 300);
    }
  }, 1000);
}

copyEmailButton.addEventListener("click", copyEmailToClipboard);
