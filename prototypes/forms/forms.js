var forms = (function _forms () {
  function init () {
    $('input, select, textarea').on('change blur', function(evt) {
      var $this = $(this),
          $container = $this.closest('.columns');
      if (this.validity) {
        if (this.validity.valid === true && this.willValidate === true) {
          console.log('is valid AND will validate: ', this);
          $container.removeClass('error');
        }
        else if (this.validity.valid === true) {
          console.log('is valid: ', this);
          $container.removeClass('error');
        }
        else {
          console.log('NOT valid: ', this);
          $container.addClass('error');
        }
      }
      else if (this.willValidate === true) {
        console.log('valid: ', this);
        $container.removeClass('error');
      }
      else if (this.willValidate === false) {
        console.log('NOT valid: ', this);
        $container.addClass('error');
      }
    });
  }

  return {
    init: init
  };
}());

$(document).ready(forms.init);
