import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formData = {};

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  //console.log('name:', event.target.name);
  //console.log('value:', event.target.value);
  formData[event.target.name] = event.target.value;
  //console.log('formData:', formData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

onSavedFormInput();

function onSavedFormInput() {
  const savedObj = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedObj) {
    Object.entries(savedObj).forEach(([name, value]) => {
      formRef.elements[name].value = value;
      //console.log(formRef.elements[name].value);
    });
  }
}
