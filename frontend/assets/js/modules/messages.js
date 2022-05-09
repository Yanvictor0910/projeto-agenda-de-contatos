exports.messageError = (message, form) => {
    const divError = form.querySelector('.message-error');
    divError.classList.add('d-block');
    divError.innerHTML += `${message}<br/>`;
};

exports.clearMessages = (form) => {
    const divError = form.querySelector('.message-error');
    divError.classList.remove('d-block');
    divError.innerText = '';
};