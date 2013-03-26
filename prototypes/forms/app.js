$(document).ready(function () {

  // Check form field validity and mark errors
  // Based on browser validation
  $('input, select, textarea').on('blur', function(evt) {
    var $container = $(this).closest('.columns'),
        classNames = 'error show';

    if (this.validity) {
      if (this.validity.valid === true) {
        $container.removeClass(classNames);
      }
      else {
        $container.addClass(classNames);
      }
    }
    else if (this.willValidate === true) {
      $container.removeClass(classNames);
    }
    else if (this.willValidate === false) {
      $container.addClass(classNames);
    }
  });
});
