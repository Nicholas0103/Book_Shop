document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    let isValid = true;

    clearErrors();

    if (name.value.trim() === "") {
      showError(name, "Name is required.");
      isValid = false;
    }

    if (email.value.trim() === "") {
      showError(email, "Email is required.");
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      isValid = false;
    }

    if (subject.value.trim() === "") {
      showError(subject, "Subject is required.");
      isValid = false;
    }

    if (message.value.trim() === "") {
      showError(message, "Message is required.");
      isValid = false;
    }

    if (isValid) {
      status.textContent = "Your message has been sent successfully!";
      status.className = "form-status success";
      form.reset();
    } else {
      status.textContent = "Please fix the errors above.";
      status.className = "form-status error";
    }
  });

  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");

    input.classList.add("input-error");
    errorMessage.textContent = message;
  }

  function clearErrors() {
    const inputs = form.querySelectorAll("input, textarea");
    const errorMessages = form.querySelectorAll(".error-message");

    inputs.forEach(function (input) {
      input.classList.remove("input-error");
    });

    errorMessages.forEach(function (error) {
      error.textContent = "";
    });

    status.textContent = "";
    status.className = "form-status";
  }

  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
});

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const q = item.querySelector('.faq-question');
    q.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});
