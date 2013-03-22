/* Scripts for the tables test page
   Author: Maggie Wachs, www.filamentgroup.com
   Date: November 2011
   Dependencies: jQuery, jQuery UI widget factory
   http://filamentgroup.com/lab/responsive_design_approach_for_complex_multicolumn_data_tables/
   https://github.com/filamentgroup/RWD-Table-Patterns
*/


jQuery.fn.reverse = [].reverse;

var toggleTable = (function _toggleTable() {

  function init (table) {

  }

  function _setMinWidths (table) {

  }

  /**
   * Events
   */

  // function _evt_

  return {
    init: init
  };
}());


(function( $ ) {
  $.widget( "filament.toggleTable", { // need to come up with a better namespace var...

    options: {
    },

    // Set up the widget
    _create: function() {
      var self = this,
          $table = self.element,
          $thead = $table.find('thead'),
          $tbody = $table.find('tbody'),
          $hdrCols = $thead.find('th'),
          $hdrColsReversed = $thead.find('th').reverse(),
          $bodyRows = $tbody.find('tr'),
          $container = $('#' + $table.attr('id') + '-check-container'),
          dropdownid = 'drop-' + $table.attr('id'),
          totalMinWidth = 0;

      // Test if element is currently displaying
      function isDisplaying ($elem) {
        // These properties come from CSS
        return (/inline|table\-cell/).test($elem.css('display'));
      }

      function getTotalMinWidth () {
        var total = 0;

        $hdrCols.each(function() {
          var $th = $(this);

          if (isDisplaying($th)) {
            total += $th.data('min-width');
          }
        });

        return total;
      }

      // Add up min-widths of all columns. If no data-min-width, assign to current size (rounded down)
      // If total is too wide for the parent, hide the right-most .priority2 column
      // Continue hiding .priority2 columns until the table fits
      // If all .priority2 columns are gone and the table still doesn't fit, then repeat for .priority1
      function hideCols () {
        var selectors = ['.priority2', '.priority1'];

        $.each(selectors, function(j, selector) {

          if ($table.width() >= totalMinWidth) {
            // Don't need to hide any more
            return false;
          }

          // Hide the right-most `selector` column
          $hdrColsReversed.each(function() {
            var $this = $(this),
                $input = $('input[value="' + $this.attr('id') + '"]');

            if (!$input.data('user-changed') && isDisplaying($this) && $this.is(selector)) {
              // Hide cell
              $('#' + $this.attr('id') + ', [headers="' + $this.attr('id') + '"]').hide();

              // Uncheck the toggle
              $input.prop('checked', false);

              // Update and re-check widths
              totalMinWidth = getTotalMinWidth();
              if ($table.width() >= totalMinWidth) {
                // Don't need to hide any more
                return false;
              }
            }
          });
        });
      } // end hideCols()

      function showCols () {
        var selectors = ['.priority1', '.priority2'],
            allowedWidth = $table.parent().width();

        $.each(selectors, function(j, selector) {

          if ($table.width() <= totalMinWidth) {
            // No room to show any more
            return false;
          }

          // Hide the right-most `selector` column
          $hdrColsReversed.each(function() {
            var $this = $(this),
                $input = $('input[value="' + $this.attr('id') + '"]');

            if (!$input.data('user-changed') && !isDisplaying($this) && $this.is(selector)) {
              // Determine if this min width would exceed the allowed space
              if (totalMinWidth + $this.data('min-width') <= allowedWidth) {
                // Show cell
                $('#' + $this.attr('id') + ', [headers="' + $this.attr('id') + '"]').show();

                // Check the toggle
                $input.prop('checked', true);
              }

              // Check new width
              totalMinWidth = getTotalMinWidth();
              if ($table.width() <= totalMinWidth) {
                // No room to show any more
                return false;
              }
            }
          });
        });

        // Check if columns need to be hidden
        hideCols();
      } // end showCols()

      // Add missing optional classes and attributes to table
      $hdrCols.each(function(i) {
        var $th = $(this);

        if (!$th.attr('data-min-width')) {
          // Assign current width
          $th.data('min-width', $th.width());
        }

        if (!$th.is('.persist, .priority1, .priority2')) {
          $th.addClass('priority2');
        }
      });

      $container.append('<ul id="' + dropdownid + '" class="f-dropdown toggle-table-dropdown"></ul>');

      $hdrCols.each(function(i) {
        var th = $(this),
            id = th.attr('id'),
            classes = th.attr('class');

        // assign an id to each header, if none is in the markup
        if (!id) {
          id = 'col-' + i;
          th.attr('id', id);
        }

        // assign matching "headers" attributes to the associated cells
        // TEMP - needs to be edited to accommodate colspans
        $bodyRows.each(function(){
          var cell = $(this).find('th, td').eq(i);
          cell.attr('headers', id);
          if (classes) { cell.addClass(classes); }
        });

        // create the hide/show toggles
        if ( !th.is('.persist') ) {
          var $toggle = $('<li><input type="checkbox" name="toggle-cols" id="toggle-col-'+i+'" value="'+id+'"><label for="toggle-col-'+i+'">'+th.text()+'</label></li>');

          $container.find('ul').append($toggle);

          $toggle
            .find('input')
              .prop('checked', true) // Check all by default
              .on('change', function(){
                var $input = $(this),
                    val = $input.val(),
                    cols = $('#' + val + ', [headers="' + val + '"]');

                // Track user's manual changes so they're not overridden
                $input.data('user-changed', true);

                if ($input.is(':checked')) {
                  cols.show();
                }
                else {
                  cols.hide();
                }
              });
        }
      }); // end $hdrCols loop

      totalMinWidth = getTotalMinWidth();

      // update the inputs' checked status
      $(window).on('orientationchange resize', function() {
        showCols();
      });

      // Update the view now
      showCols();

      $container.prepend('<a href="#" data-dropdown="' + dropdownid + '" class="small button dropdown">Display</a>');
    } // end _create

  });
}( jQuery ) );

