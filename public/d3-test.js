var ratData = [ 600, 100, 50 ];


var svg = d3.select( "body" ) // returns body selection and takes name of element, not actual markup or content
            .append( "svg" ) // returns SVG selection
              .attr( "width", 500 ) // returns SVG selection
              .attr( "height", 150 ); // returns SVG selection

function drawChart( dataArray ){
    // create a selection and bind data
    var selection = svg.selectAll( "rect" )
                       .data( dataArray ); // soul of d3 - an array of data bound to page elements

    // create new elements wherever needed                   
    selection.enter()
      .append( "rect" )
      .attr( "x", function(d,i){
        return i*25;
      })
      .attr( "width", 15 )
      .attr( "fill", "#d1c9b8" );

    // set bar heights based on data
    selection
      .attr( "height", function(d){
        return d/10 * 1.5;
      })
      .attr( "y", function(d){ // set the rectangle's y attribute to align to the bottom of the SVG
        return 150 - d/10 * 1.5;
      });
    
    // remove any unused bars
    selection.exit()
      .remove();
}

drawChart( ratData );

// Now try opening up the console and calling drawChart() with different data arrays.
// The chart will update with the correct number and size of bars.
// drawChart( [200, 300, 400, 500, 600, 700] )
// drawChart( [800, 700, 600] )
// and so on
					