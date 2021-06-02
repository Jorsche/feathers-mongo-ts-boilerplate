// Adds a signup row to the table
const addSignup = signup => {
  $('#signups > tbody:last-child').append(
    `<tr>
      <td>${signup.firstName}</td>
      <td>${signup.lastName}</td>
      <td>${signup.email}</td>
      <td>${signup.country}</td>
      <td>${signup.province}</td>
      <td>${signup.postalCode}</td>
    </tr>`
  );
};

// Shows the signups
const showSignups = async signupService => {
  // Find the latest 25 signups. They will come with the newest first
  const signups = await signupService.find({
    query: {
      $sort: { createdAt: -1 },
      $limit: 25
    }
  });

  // We want to show the newest signup last
  signups.data.reverse().forEach(addSignup);
};
(function () {
  'use strict'

  window.addEventListener('load', function () {

    // Set up FeathersJS app
    var app = feathers();

    // Set up REST client
    var restClient = feathers.rest();

    // Configure an AJAX library with that client
    app.configure(restClient.fetch(window.fetch));

    // Connect to the `signups` service
    const aaa = app.service('aaa');
    showSignups(aaa);

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity()) {
          aaa.create({
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            country: $('#country').val(),
            province: $('#province').val(),
            postalCode: $('#postalCode').val()
          });
          form.classList.remove('was-validated');
          form.reset();
          console.log("aaa",aaa);
        } else {
          form.classList.add('was-validated');
        }
        event.preventDefault();
        event.stopPropagation();
      }, false);
    })
  }, false)
}())
