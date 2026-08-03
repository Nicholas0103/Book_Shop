
/* ========================================
1. CONTACT FORM
======================================== */

document.addEventListener("DOMContentLoaded", function () {
  const RegistrationForm = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (RegistrationForm) {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const name_error = document.getElementById("name-error");
    const email_error = document.getElementById("email-error");
    const subject_error = document.getElementById("subject-error");
    const message_error = document.getElementById("message-error");

    RegistrationForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let error = false;

      name.classList.remove("error-input");
      email.classList.remove("error-input");
      subject.classList.remove("error-input");
      message.classList.remove("error-input");
      name_error.textContent = "";
      email_error.textContent = "";
      subject_error.textContent = "";
      message_error.textContent = "";

      const name_value = name.value.trim();
      const email_value = email.value.trim();
      const message_value = message.value.trim();
      const email_rule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name_value === "") {
        name.classList.add("error-input");
        name_error.textContent = "Please enter your name.";
        error = true;
      }

      if (email_value === "") {
        email.classList.add("error-input");
        email_error.textContent = "Please enter your email address.";
        error = true;
      } else if (!email_rule.test(email_value)) {
        email.classList.add("error-input");
        email_error.textContent = "Please enter a valid email address.";
        error = true;
      }

      if (subject.value.trim() === "") {
        subject.classList.add("error-input");
        subject_error.textContent = "Please select a subject.";
        error = true;
      }

      if (message_value === "") {
        message.classList.add("error-input");
        message_error.textContent = "Please enter your description.";
        error = true;
      }

      if (error) {
        status.textContent = "Please complete the form above.";
        status.className = "form-status error";
        return;
      }

      status.textContent = "Your message has been sent successfully!";
      status.className = "form-status success";
      RegistrationForm.reset();
    });
  }
});

/* ========================================
2. FAQ
======================================== */

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(function (item) {
  const q = item.querySelector(".faq-question");
  q.addEventListener("click", function () {
    item.classList.toggle("active");
  });
});
