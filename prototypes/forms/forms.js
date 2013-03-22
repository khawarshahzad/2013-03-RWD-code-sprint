$(document).ready(function () {

  // Check form field validity and mark errors
  // Based on browser validation
  $('input, select, textarea').on('blur', function(evt) {
    var $container = $(this).closest('.columns');

    if (this.validity) {
      if (this.validity.valid === true) {
        $container.removeClass('error');
      }
      else {
        $container.addClass('error');
      }
    }
    else if (this.willValidate === true) {
      $container.removeClass('error');
    }
    else if (this.willValidate === false) {
      $container.addClass('error');
    }
  });
});
