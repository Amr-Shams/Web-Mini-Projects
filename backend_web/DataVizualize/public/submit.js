// a js file for submitting the file and connect`ing to the backend

const form = document.querySelector('form');
const fileInput = document.querySelector('input[type="file"]');
const progressArea = document.querySelector('.progress-area');
const uploadedArea = document.querySelector('.uploaded-area');
const progressbar = document.querySelector('.progress-bar');
const percentDiv = document.querySelector('#percent');

form.addEventListener('click', (e) => {
    e.preventDefault();
    fileInput.click();
    }
);

