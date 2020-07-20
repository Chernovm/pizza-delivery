import UIkit from 'uikit';

export default function errorHandler(error) {
    if (error.response) {
        // TODO: dispay alert here
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        console.log(error.request);

        if (!(!!document.querySelector('.uk-modal') && !!document.querySelector('.uk-modal').offsetParent)) {
            UIkit.modal.alert("Can't load menu, please reload the page").then(function () {
            });
        }
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
}
