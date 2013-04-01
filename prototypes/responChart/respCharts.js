(function( $ ){
  	
  	$.respCharts = function(chartObj) {
        
        var chartObj = chartObj;

        // Function for building the default charts
        function chartBuilder(canvasElm, chartType, chartData) {

          // Select the canvas element in that is being used
          var graph = $(canvasElm),
              graphWidth = parseInt(graph.parent().width()),
              graphHeight = Math.floor(graphWidth / 1.6667);

          //graph.css({'height':graphHeight,'width':graphWidth});
          graph.attr('height', graphHeight);
          graph.attr('width', graphWidth);

          //Get context with jQuery - using jQuery's .get() method.
          var ctx = graph.get(0).getContext("2d");
          //This will get the first returned node in the jQuery collection.
          var myNewChart = new Chart(ctx);

          // Draw the Chart based on the chartType variable passed
          switch (chartType) {
            case "line":
              myNewChart.Line(chartData,{});
              break;
            case "bar":
              myNewChart.Bar(chartData,{});
              break;
            case "radar":
              myNewChart.Radar(chartData,{});
              break;
            case "polarArea":
              myNewChart.PolarArea(chartData,{});
              break;
            case "pie":
               myNewChart.Pie(chartData,{});
              break;
            case "doughnut":
              myNewChart.Doughnut(chartData,{});
              break;
          }

        }

        // Loop through all of the applied chart objects
        function loopChartArray() {

          for (var i=0, len = chartObj.length; i < len; i++) {
             
             // For each chart object found call the build function
             var chart = chartBuilder(chartObj[i].cId, chartObj[i].cType, chartObj[i].cData);

          }
        }

        // Preform first run
        loopChartArray();

        // Setup the window resize event
        $(window).resize(loopChartArray);

  	};

})( jQuery );