
      var url= '<%= process.env.URL %>';

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("/forms/wizard", ["jquery", "Site"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("jquery"), require("Site"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.formsWizard = mod.exports;
  }
})(this, function (_jquery, _Site) {
  "use strict";

  _jquery = babelHelpers.interopRequireDefault(_jquery);
  (0, _jquery.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  }); // Example Wizard Form
  // -------------------

  (function () {
    // set up formvalidation
    (0, _jquery.default)('#exampleAccountForm').formValidation({
      framework: 'bootstrap',
      fields: {
        username: {
          validators: {
            notEmpty: {
              message: 'The username is required'
            },
            stringLength: {
              min: 6,
              max: 30,
              message: 'The username must be more than 6 and less than 30 characters long'
            },
            regexp: {
              regexp: /^[a-zA-Z0-9_\.]+$/,
              message: 'The username can only consist of alphabetical, number, dot and underscore'
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: 'The password is required'
            },
            different: {
              field: 'username',
              message: 'The password cannot be the same as username'
            }
          }
        }
      },
      err: {
        clazz: 'invalid-feedback'
      },
      control: {
        // The CSS class for valid control
        valid: 'is-valid',
        // The CSS class for invalid control
        invalid: 'is-invalid'
      },
      row: {
        invalid: 'has-danger'
      }
    });
    (0, _jquery.default)("#exampleBillingForm").formValidation({
      framework: 'bootstrap',
      fields: {
        number: {
          validators: {
            notEmpty: {
              message: 'The credit card number is required' // creditCard: {
              //   message: 'The credit card number is not valid'
              // }

            }
          }
        },
        cvv: {
          validators: {
            notEmpty: {
              message: 'The CVV number is required' // cvv: {
              //   creditCardField: 'number',
              //   message: 'The CVV number is not valid'
              // }

            }
          }
        }
      },
      err: {
        clazz: 'invalid-feedback'
      },
      control: {
        // The CSS class for valid control
        valid: 'is-valid',
        // The CSS class for invalid control
        invalid: 'is-invalid'
      },
      row: {
        invalid: 'has-danger'
      }
    }); // init the wizard

    var defaults = Plugin.getDefaults("wizard");

    var options = _jquery.default.extend(true, {}, defaults, {
      buttonsAppendTo: '.panel-body'
    });

    var wizard = (0, _jquery.default)("#exampleWizardForm").wizard(options).data('wizard'); // setup validator
    // http://formvalidation.io/api/#is-valid

    wizard.get("#exampleAccount").setValidator(function () {
      var fv = (0, _jquery.default)("#exampleAccountForm").data('formValidation');
      fv.validate();

      if (!fv.isValid()) {
        return false;
      }

      return true;
    });
    wizard.get("#exampleBilling").setValidator(function () {
      var fv = (0, _jquery.default)("#exampleBillingForm").data('formValidation');
      fv.validate();

      if (!fv.isValid()) {
        return false;
      }

      return true;
    });
  })(); // Example Wizard Form Container
  // -----------------------------
  // http://formvalidation.io/api/#is-valid-container


  (function () {
    var defaults = Plugin.getDefaults("wizard");

    var options = _jquery.default.extend(true, {}, defaults, {
      onInit: function onInit() {
        (0, _jquery.default)('#exampleFormContainer').formValidation({
          framework: 'bootstrap',
          fields: {
            username: {
              validators: {
                notEmpty: {
                  message: 'The username is required'
                }
              }
            },
            password: {
              validators: {
                notEmpty: {
                  message: 'The password is required'
                }
              }
            },
            number: {
              validators: {
                notEmpty: {
                  message: 'The credit card number is not valid'
                }
              }
            },
            cvv: {
              validators: {
                notEmpty: {
                  message: 'The CVV number is required'
                }
              }
            }
          },
          err: {
            clazz: 'invalid-feedback'
          },
          control: {
            // The CSS class for valid control
            valid: 'is-valid',
            // The CSS class for invalid control
            invalid: 'is-invalid'
          },
          row: {
            invalid: 'has-danger'
          }
        });
      },
      validator: function validator() {
        var fv = (0, _jquery.default)('#exampleFormContainer').data('formValidation');
        var $this = (0, _jquery.default)(this); // Validate the container

        fv.validateContainer($this);
        var isValidStep = fv.isValidContainer($this);

        if (isValidStep === false || isValidStep === null) {
          return false;
        }

        return true;
      },
      onFinish: function onFinish() {// $('#exampleFormContainer').submit();
      sessionStorage.getItem("redirect") == "dashboard";
      window.scrollTo(0,0);
      $("a#btn_newid")[1].className = "btn btn-success disabled btn-outline float-right";
      
      // console.log("CP: 0");
      // axios.get( url+`/getJobProfile/` + `${user_id}`)
      // .then(res => {
      //     console.log(res);
      //     if (res.data.a.length !== 0) {
      //         document.getElementById("currentCompany").value = res.data.a[0].current_company;
      //         document.getElementById("lastDegree").value = res.data.a[0].last_degree;
      //         document.getElementById("yearOfExp").value = res.data.a[0].years_of_experience;
      //         document.getElementById("majorInCollege").value = res.data.a[0].major_in_college;
      //         document.getElementById("currentJobTitle").value = res.data.a[0].current_job_title;
      //         document.getElementById("location").value = res.data.a[0].location;
      //         document.getElementById("skype").value = res.data.a[0].skype;
      //         sessionStorage.setItem("request", "put");
      //     }
      // }).catch(err => {console.log(err),alert("Something went wrong, please try again")})

      console.log("CP: 1");
        let nameValue = document.getElementById("name").value;
        let genderValue = document.getElementById("gender").value;
        let organizationValue = "none";
        let universityValue = document.getElementById("university").value;
        let graduationYearValue = document.getElementById("graduationYear").value;
        let linkedInProfileValue = document.getElementById("linkedinProfile").value;
        let t_shirt_sizeValue = document.getElementById("teeShirt").value;
        let addressValue = document.getElementById("address").value;
        let github_handleValue = document.getElementById("github").value;
        let photoValue;
        if (genderValue == "Male"){
            photoValue = "../../../global/photos/boy_image.png";
        } else {
            photoValue = "../../../global/photos/girl_image.png";
        }
        let current_companyValue = document.getElementById("currentCompany").value;
        let last_degreeValue = document.getElementById("lastDegree").value;
        let years_of_experienceValue = document.getElementById("yearOfExp").value;
        let major_in_collegeValue = document.getElementById("majorInCollege").value;
        let current_job_titleValue = document.getElementById("currentJobTitle").value;
        let locationValue = document.getElementById("location").value;
        let skypeValue = document.getElementById("skype").value;

        let codeforcesValue = document.getElementById("codeforces").value;
        let spojValue = document.getElementById("spoj").value;
        let topcoderValue = document.getElementById("topcoder").value;
        let codechefValue = document.getElementById("codechef").value;
        let hackerrankValue = document.getElementById("hackerrank").value;

        if(last_degreeValue==""){
          document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="Degree is required";
          return false;
        }
        
        if(major_in_collegeValue==""){
          document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="Major name is required";
          return false;
        }
        
        if(locationValue==""){
          document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="Location is required";
          return false;
        }

        if(nameValue==""){
          document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="Name is required";
          return false;
        }

         if(genderValue==""){
          document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="Gender is required";
          return false;
        }
        
         if(universityValue==""){
           document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="University name is required";
          return false;
        }

         if(graduationYearValue==""){
          document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="Graduation year is required";
          return false;
        }

         if(linkedInProfileValue==""){
           document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="LinkedIn profile is required";
          return false;
        }
        
         if(t_shirt_sizeValue==""){
          document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="T-shirt is required";
          return false;
        }

         if(addressValue==""){
           document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="Address is required";
          return false;
        }
         if(github_handleValue==""){
          document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="Github handle is required";
          return false;
        }
        console.log("CP: 2");
        console.log("sessionstorage : " + sessionStorage.getItem("request"));
      if(sessionStorage.getItem("request") == "post"){
        // All post

        document.getElementById('processing-div').style.display="block";
        document.getElementById('message-processing').innerHTML="Processing...";

          axios.post( url+'/doUserData', {
            bootcamp_id: 1234,
            course_id: 12345,
            user_id: sessionStorage.getItem("user_id"),
            name: nameValue,
            gender: genderValue,
            is_otp_verified: true,
            is_email_verified: true,
            photo: photoValue,
            organization: organizationValue,
            university: universityValue,
            graduation_year: graduationYearValue,
            linkedIn_profile: linkedInProfileValue,
            t_shirt_size: t_shirt_sizeValue,
            address: addressValue,
            public_sharing: "1",
            github_handle: github_handleValue,
            track_name: "NONE"
        })
        .then(function(response) {
          console.log("CP: 3");
            // alert("Profile details submitted successfully")
            console.log(response);
            axios.post( url+'/doJobProfile', {
              user_id: sessionStorage.getItem("user_id"),
              current_company: current_companyValue,
              last_degree: last_degreeValue,
              years_of_experience: years_of_experienceValue,
              major_in_college: major_in_collegeValue,
              current_job_title: current_job_titleValue,
              location: locationValue,
              skype: skypeValue
          })
          .then(function(response) {
            console.log("CP: 4");
              // alert("Working background details submitted successfully")
              console.log(response);

              axios.post( url+'/doProgrammingProfile', {
                        user_id: sessionStorage.getItem("user_id"),
                        codeforces: codeforcesValue,
                        spoj: spojValue,
                        topcoder: topcoderValue,
                        codechef: codechefValue,
                        hackerrank: hackerrankValue
                    })
                    .then(async function(response) {
                      document.getElementById('processing-div').style.display="none";
                     document.getElementById('info-message-div').style.display="block";
                      document.getElementById('message-div-info').innerHTML="Profile submitted successfully!";
                      console.log("CP: 5");
                      sessionStorage.setItem("redirect","dashboard")
                      setTimeout(()=>{
                        window.location.href = './dashboard';
                      },2000);
                     
                      console.log(response);
                  })
                  .catch(function(error) {
                      document.getElementById('processing-div').style.display="none";
                      document.getElementById('alert-message-div').style.display="block";
                      document.getElementById('message-div').innerHTML="Something went wrong, Please try again!";
                      console.log(error);
                  });
          })
          .catch(function(error) {
            document.getElementById('processing-div').style.display="none";
            document.getElementById('alert-message-div').style.display="block";
            document.getElementById('message-div').innerHTML="Something went wrong, Please try again!";
            console.log(error);
        });
        })
        .catch(function(error) {
          document.getElementById('processing-div').style.display="none";
          document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="Something went wrong, Please try again!";
          console.log(error);
      });

      } else {
        console.log("CP: 6");
        
        // All put
        let nameValue = document.getElementById("name").value;
        let genderValue = document.getElementById("gender").value;
        let organizationValue = "none";
        let universityValue = document.getElementById("university").value;
        let graduationYearValue = document.getElementById("graduationYear").value;
        let linkedInProfileValue = document.getElementById("linkedinProfile").value;
        let t_shirt_sizeValue = document.getElementById("teeShirt").value;
        let addressValue = document.getElementById("address").value;
        let github_handleValue = document.getElementById("github").value;
        let photoValue;
        if (genderValue == "Male"){
            photoValue = "../../../global/photos/boy_image.png";
        } else if(genderValue == "Female"){
            photoValue = "../../../global/photos/girl_image.png";
        } else {
          photoValue = "../../../global/photos/transgender.png";
        }
        let current_companyValue = document.getElementById("currentCompany").value;
        let last_degreeValue = document.getElementById("lastDegree").value;
        let years_of_experienceValue = document.getElementById("yearOfExp").value;
        let major_in_collegeValue = document.getElementById("majorInCollege").value;
        let current_job_titleValue = document.getElementById("currentJobTitle").value;
        let locationValue = document.getElementById("location").value;
        let skypeValue = document.getElementById("skype").value;

        let codeforcesValue = document.getElementById("codeforces").value;
        let spojValue = document.getElementById("spoj").value;
        let topcoderValue = document.getElementById("topcoder").value;
        let codechefValue = document.getElementById("codechef").value;
        let hackerrankValue = document.getElementById("hackerrank").value;


        let user_id = sessionStorage.getItem("user_id");
        let course_id;
        if(sessionStorage.getItem("redirect") == "dashboard"){
          course_id = 12345;
        } else {
          course_id = parseInt(sessionStorage.getItem("course_id"));
        }

        document.getElementById('processing-div').style.display="block";
        document.getElementById('message-processing').innerHTML="Processing...";

          axios.put( `${url}`+'/updateUserData/' + `${user_id}`, {
            bootcamp_id: 1234,
            user_id: user_id,
            course_id: course_id,
            name: nameValue,
            gender: genderValue,
            is_otp_verified: true,
            is_email_verified: true,
            photo: photoValue,
            organization: organizationValue,
            university: universityValue,
            graduation_year: graduationYearValue,
            linkedIn_profile: linkedInProfileValue,
            t_shirt_size: t_shirt_sizeValue,
            address: addressValue,
            public_sharing: "1",
            github_handle: github_handleValue,
            track_name: sessionStorage.getItem("track_name")
        })
        .then(function(response) {
            // alert("Profile details updated successfully")
            console.log("CP: 7");
            console.log(response);
            let user_id = sessionStorage.getItem("user_id");
            axios.put( `${url}`+'/updateJobProfile/' + `${user_id}`, {
                  user_id: user_id,
                  current_company: current_companyValue,
                  last_degree: last_degreeValue,
                  years_of_experience: years_of_experienceValue,
                  major_in_college: major_in_collegeValue,
                  current_job_title: current_job_titleValue,
                  location: locationValue,
                  skype: skypeValue
              })
              .then(function(response) {
                console.log("CP: 8");
                  // alert("Working background details updated successfully")
                  let user_id = sessionStorage.getItem("user_id");
                  console.log(response);
                  axios.put( `${url}`+'/updateProgrammingProfile/' + `${user_id}`, {
                        user_id: user_id,
                        codeforces: codeforcesValue,
                        spoj: spojValue,
                        topcoder: topcoderValue,
                        codechef: codechefValue,
                        hackerrank: hackerrankValue
                    })
                    .then(function(response) {
                      document.getElementById('processing-div').style.display="none";
                     document.getElementById('info-message-div').style.display="block";
                      document.getElementById('message-div-info').innerHTML="Profile updated successfully!";
                      
                      console.log("CP: 9");
                      // alert("Programming profile details updated successfully")
                      setTimeout(()=>{
                        window.location.href = sessionStorage.getItem("redirect");
                      },2000);
                       
                      console.log(response);
                  })
                  .catch(function(error) {
                      document.getElementById('processing-div').style.display="none";
                      document.getElementById('alert-message-div').style.display="block";
                      document.getElementById('message-div').innerHTML="Something went wrong, Please try again!";
                      console.log(error);
                  });
                    
              })
              .catch(function(error) {
                document.getElementById('processing-div').style.display="none";
                document.getElementById('alert-message-div').style.display="block";
                document.getElementById('message-div').innerHTML="Something went wrong, Please try again!";
                console.log(error);
            });
        })
        .catch(function(error) {
          document.getElementById('processing-div').style.display="none";
          document.getElementById('alert-message-div').style.display="block";
          document.getElementById('message-div').innerHTML="Something went wrong, Please try again!";
          console.log(error);
      });
      }

      },
      buttonsAppendTo: '.panel-body'
    });

    (0, _jquery.default)("#exampleWizardFormContainer").wizard(options);
  })(); // Example Wizard Pager
  // --------------------------


  (function () {
    var defaults = Plugin.getDefaults("wizard");

    var options = _jquery.default.extend(true, {}, defaults, {
      step: '.wizard-pane',
      templates: {
        buttons: function buttons() {
          var options = this.options;
          var html = '<div class="btn-group btn-group-sm">' + '<a class="btn btn-default btn-outline" href="#' + this.id + '" data-wizard="back" role="button">' + options.buttonLabels.back + '</a>' + '<a class="btn btn-success btn-outline float-right" href="#' + this.id + '" data-wizard="finish" role="button">' + options.buttonLabels.finish + '</a>' + '<a class="btn btn-default btn-outline float-right" href="#' + this.id + '" data-wizard="next" role="button">' + options.buttonLabels.next + '</a>' + '</div>';
          return html;
        }
      },
      buttonLabels: {
        next: '<i class="icon wb-chevron-right" aria-hidden="true"></i>',
        back: '<i class="icon wb-chevron-left" aria-hidden="true"></i>',
        finish: '<i class="icon wb-check" aria-hidden="true"></i>'
      },
      buttonsAppendTo: '.panel-actions'
    });

    (0, _jquery.default)("#exampleWizardPager").wizard(options);
  })(); // Example Wizard Progressbar
  // --------------------------


  (function () {
    var defaults = Plugin.getDefaults("wizard");

    var options = _jquery.default.extend(true, {}, defaults, {
      step: '.wizard-pane',
      onInit: function onInit() {
        this.$progressbar = this.$element.find('.progress-bar').addClass('progress-bar-striped');
      },
      onBeforeShow: function onBeforeShow(step) {
        step.$element.tab('show');
      },
      onFinish: function onFinish() {
        this.$progressbar.removeClass('progress-bar-striped').addClass('progress-bar-success');
      },
      onAfterChange: function onAfterChange(prev, step) {
        var total = this.length();
        var current = step.index + 1;
        var percent = current / total * 100;
        this.$progressbar.css({
          width: percent + '%'
        }).find('.sr-only').text(current + '/' + total);
      },
      buttonsAppendTo: '.panel-body'
    });

    (0, _jquery.default)("#exampleWizardProgressbar").wizard(options);
  })(); // Example Wizard Tabs
  // -------------------


  (function () {
    var defaults = Plugin.getDefaults("wizard");

    var options = _jquery.default.extend(true, {}, defaults, {
      step: '> .nav > li > a',
      onBeforeShow: function onBeforeShow(step) {
        step.$element.tab('show');
      },
      classes: {
        step: {
          //done: 'color-done',
          error: 'color-error'
        }
      },
      onFinish: function onFinish() {
        alert('finish');
      },
      buttonsAppendTo: '.tab-content'
    });

    (0, _jquery.default)("#exampleWizardTabs").wizard(options);
  })(); // Example Wizard Accordion
  // ------------------------


  (function () {
    var defaults = Plugin.getDefaults("wizard");

    var options = _jquery.default.extend(true, {}, defaults, {
      step: '.panel-title[data-toggle="collapse"]',
      classes: {
        step: {
          //done: 'color-done',
          error: 'color-error'
        }
      },
      templates: {
        buttons: function buttons() {
          return '<div class="panel-footer">' + defaults.templates.buttons.call(this) + '</div>';
        }
      },
      onBeforeShow: function onBeforeShow(step) {
        step.$pane.collapse('show');
      },
      onBeforeHide: function onBeforeHide(step) {
        step.$pane.collapse('hide');
      },
      onFinish: function onFinish() {
        alert('finish');
      },
      buttonsAppendTo: '.panel-collapse'
    });

    (0, _jquery.default)("#exampleWizardAccordion").wizard(options);
  })();
});