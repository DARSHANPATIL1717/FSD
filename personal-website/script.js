(function () {
  emailjs.init("pA9WIVgTOiEXREk8g"); // your public key
})();

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(this);

  const templateParams = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  emailjs
    .send("service_na4euu9", "template_hkionml", templateParams)
    .then(
      function () {
        alert("Your message has been sent successfully!");
        document.getElementById("contact-form").reset();
      },
      function (error) {
        alert("Failed to send message: " + error.text);
        console.log("EmailJS error:", error);
      }
    );
});
