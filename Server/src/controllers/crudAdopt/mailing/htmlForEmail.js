const fs = require('fs');
const mustache = require('mustache');
const path = require('path');

function htmlForEmail({ name,lastName, nameUser, publicadorName, publicadorlastName, publicadorNumber,numberPhone, birthdate, addressAdoption,
    formattedDateAdoption , comment, age, gender, location, size, description,
}) {

const filePath = path.join(__dirname, 'htmlContent.html');
// console.log('File path:', filePath);
const emailTemplate = fs.readFileSync(filePath, 'utf-8');
const renderedTemplate = mustache.render(emailTemplate, {
    name, lastName, nameUser, publicadorName, publicadorlastName, publicadorNumber, numberPhone, birthdate, addressAdoption,
    formattedDateAdoption , comment, age, gender, location, size, description
});

return renderedTemplate;
}

module.exports = htmlForEmail;
