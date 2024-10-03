const formEl = document.forms.feedback;
const hobbiesEl = formEl.elements.hobbies;

const handleSumbit = (event) => {
  event.preventDefault();
  const formData = new FormData(formEl);
  alert(`Thankyou for your Feedback Mr.${formEl.fullName.value}`);
};

formEl.addEventListener("submit", handleSumbit);
