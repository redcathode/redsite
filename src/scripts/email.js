function decodeEmail(emailElement, outerElement) {
    let decodedEmail = '';
    let encodedEmail = emailElement.innerHTML;
    for (let i = 0; i < encodedEmail.length; i++) {
        let charCode = encodedEmail.charCodeAt(i);
        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
            let offset = (charCode >= 97) ? 97 : 65;
            decodedEmail += String.fromCharCode((charCode - offset + 13) % 26 + offset);
        } else {
            decodedEmail += encodedEmail[i];
        }
    }
    outerElement.outerHTML = `<li><strong>email:</strong> <a href="mailto:${decodedEmail}">${decodedEmail}</a></li>`
}

let email = document.getElementById('email1');
let button = document.getElementById('decodebutton1');
let outer = document.getElementById('emailtext');
button.addEventListener('click', () => {
    decodeEmail(email, outer);
    email.innerHTML = 'email: ';
});