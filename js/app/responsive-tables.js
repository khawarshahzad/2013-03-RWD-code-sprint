jQuery.fn.reverse = [].reverse;

/* Toggle Table
   Author: Craig Patik, NYS ITS, https://github.com/nys-its/RWD-Demo
   Date: March 2013
   Dependencies: jQuery, jQuery UI widget factory
   Based on https://github.com/filamentgroup/RWD-Table-Patterns
*/

(function( $ ) {
  $.widget('nysits.toggleTable', {
    options: {},

    // Set up the widget
    _create: function() {
      var $table = $(this.element),
          $thead = $table.find('thead'),
          $tbody = $table.find('tbody'),
          $hdrCols = $thead.find('th'),
          $hdrColsReversed = $thead.find('th').reverse(),
          $bodyRows = $tbody.find('tr'),
          tableId = $table.attr('id'),
          totalMinWidth = 0,
          $dropdown;

      /**
       * Private Methods
       */

      // Test if element is currently displaying
      function isDisplaying ($elem) {
        return (/inline|table\-cell/).test($elem.css('display'));
      }

      // Get total minimum allowed width of all visible columns
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

      function setTableId () {
        var id = 'table' + (new Date().getTime()).toString().substr(9,4);
        $table.attr('id', id);
        return id;
      }

      // Add up min-widths of all columns. If no data-min-width, assign to current size (rounded down)
      // If total is too wide for the parent, hide the right-most .tt-p2 column
      // Continue hiding .tt-p2 columns until the table fits
      // If all .tt-p2 columns are gone and the table still doesn't fit, then repeat for .tt-p1
      function hideCols () {
        var selectors = ['.tt-p2', '.tt-p1'];

        $.each(selectors, function(j, selector) {

          if ($table.width() >= totalMinWidth) {
            // Don't need to hide any more
            return false;
          }

          // Hide the right-most `selector` column
          $hdrColsReversed.each(function() {
            var $this = $(this),
                $input = $('input[value="' + $this.attr('id') + '"]');

            if ($input && $input.data('user-changed')) {
              // Respect the user's choice to explicitly hide/show this column
              return true;
            }

            if (!$input.data('user-changed') && isDisplaying($this) && $this.is(selector)) {
              // Hide cell
              $('#' + $this.attr('id') + ', [data-headers="' + $this.attr('id') + '"]').hide();

              // Uncheck the toggle
              if ($input) {
                $input.prop('checked', false);
              }

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
        var selectors = ['.tt-p1', '.tt-p2'],
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

            if ($input && $input.data('user-changed')) {
              // Respect the user's choice to explicitly hide/show this column
              return true;
            }

            if (!isDisplaying($this) && $this.is(selector)) {
              // Determine if this min width would exceed the allowed space
              if (totalMinWidth + $this.data('min-width') <= allowedWidth) {
                // Show cell
                $('#' + $this.attr('id') + ', [data-headers="' + $this.attr('id') + '"]').show();

                // Check the toggle
                if ($input) {
                  $input.prop('checked', true);
                }
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

      // Create container for check box list
      function createDropDown () {
        if ($table.is('.tt-no-dropdown')) {
          return false; // Page design explicitly denies a dropdown
        }
        $dropdown = $('#' + tableId + '-check-container');
        if (!$dropdown.length) {
          $dropdown = $('<div class="tt-table-menu" id="' + tableId + '-check-container"></div>');
          $dropdown.insertBefore($table);
        }
        $dropdown.prepend('<a href="#" data-dropdown="drop-' + tableId + '" class="small button dropdown radius">Columns</a>');
        $dropdown.append('<ul id="drop-' + tableId + '" class="f-dropdown tt-table-dropdown"></ul>');
      }

      /**
       * Setup
       */

      // Ignore tables that request not to be responsive
      if ($table.is('.not-responsive')) { return false; }

      $table.addClass('tt-table');

      // Set up dropdown menu
      if (!tableId) {
        tableId = setTableId($table);
      }
      createDropDown();

      // Prep each column header
      $hdrCols.each(function(i) {
        var $th = $(this),
            id = $th.attr('id'),
            classes;

        // assign an id to each header, if none is in the markup
        if (!id) {
          id = tableId + '-col-' + i;
          $th.attr('id', id);
        }

        // Add missing optional attributes
        if (!$th.attr('data-min-width')) {
          // Assign current width
          $th.data('min-width', $th.width());
        }

        // Add missing optional classes
        if (!$th.is('.tt-persist, .tt-p1, .tt-p2')) {
          if (i === 0) {
            $th.addClass('tt-p1');
          }
          else {
            $th.addClass('tt-p2');
          }
        }

        // Assign matching `data-headers` attributes to the associated cells
        classes = $th.attr('class');
        $bodyRows.each(function(){
          var cell = $(this).find('th, td').eq(i);
          cell.attr('data-headers', id);
          if (classes) { cell.addClass(classes); }
        });

        // Create the hide/show toggles
        if ($dropdown && !$th.is('.tt-persist') ) {
          var $toggle = $('<li><input type="checkbox" name="toggle-cols" id="toggle-col-' + i +
                          '" value="' + id + '"><label for="toggle-col-' + i +
                          '">' + $th.text() + '</label></li>');

          $dropdown.find('ul').append($toggle);

          $toggle
            .find('input')
              .prop('checked', true) // Check all by default
              .on('change', function(){
                var $input = $(this),
                    val = $input.val(),
                    cols = $('#' + val + ', [data-headers="' + val + '"]');

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

      // Update the view now on each resize
      $(window).on('orientationchange resize', function() {
        showCols();
      });

      // Update the view now
      showCols();
    } // end _create
  });
}(jQuery));

$(function(){
  $('table').toggleTable();
});
