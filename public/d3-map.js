/*
  d3-map.js contains the showMap function. Based on the page information passed in ('senti' or 'poly'),
  the data will be processed in a way specific to the page and then displayed on the appropriate map.

  For 'senti', the color changes based on whether the sentiment is positive or negative, and
  the opacity changes based on the strength of the sentiment (somwhere on the spectrum of extremely
  negative, neutral, extremely positive).

  For 'poly', the color is dependent on the political party (Libertarian, Conservative, Liberal, Green)
  with the highest likelihood score, and the opacity corresponds with the strength of that score.
*/

/* A way I've commonly seen this kind of thing done: you can wrap your map
   in an Angular element directive, something like this (skip to the "Anatomy of a Directive" section)
   http://www.delimited.io/blog/2014/7/16/d3-directives-in-angularjs
 */
function showMap(page, divName, data){
  var width = 950,
    height = 550;

  // set projection
  var projection = d3.geo.mercator();

  // create path variable
  var path = d3.geo.path()
      .projection(projection);

  // set scales for color and opacities
  var sentimentColor = d3.scale.linear()
      .domain([0, 1])
      .range(['#e74c3c', '#2ecc71']);
  var sentimentOpacity = d3.scale.linear()
      .domain([0, .5, 1])
      .range([1, 0 , 1]);
  var politicalOpacity = d3.scale.linear()
      .domain([.25, 1])
      .range([0 , 1]);

  d3.json("us.json", function(error, topo) {
    console.log(topo);
  	states = topojson.feature(topo, topo.objects.states).features

  	// set projection parameters
	projection
    .scale(850)
    .center([-98, 37.5])

  var svg = d3.select(divName).insert("svg")
    .attr("width", width)
    .attr("height", height);

  // add states from topojson
  svg.selectAll("path")
      .data(states).enter()
      .append("path")
      .attr("class", "feature")
      .style("fill", "#ecf0f1")
      .attr("d", path);

    // create svg variable
  if(page == 'senti'){

    // add circles to svg
    svg.selectAll("circle")
      .data(data).enter()
      .append("circle")
      .attr("cx", function (d) { return projection([d.location.longitude, d.location.latitude])[0]; })
      .attr("cy", function (d) { return projection([d.location.longitude, d.location.latitude])[1]; })
      .attr("r", "8px")
      .attr("opacity", function(d) { return sentimentOpacity(d.sentiment); })
      .attr("fill", function(d) { return sentimentColor(d.sentiment); })
      .on("mouseover", function(d){
        div.transition()
          .duration(200)
          .style("opacity", 0.9)
        div.html(d.text)
          .style("left", (d3.event.pageX) + 10 + "px")
          .style("top", (d3.event.pageY - 30) + "px")
      })
      .on("mouseout", function(d) {
        div.transition()
          .duration(500)
          .style("opacity", 0.0);
      })

  }

  else if(page == 'poly'){

    // add circles to svg
    //var category = ['Conservative', 'Libertarian', 'Green', 'Liberal'];
    var category = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db'];
    svg.selectAll("circle")
      .data(data).enter()
      .append("circle")
      .attr("cx", function (d) { return projection([d.location.longitude, d.location.latitude])[0]; })
      .attr("cy", function (d) { return projection([d.location.longitude, d.location.latitude])[1]; })
      .attr("r", "8px")
      .attr("opacity", function(d) {
        var poly = [d.polysentiment.Conservative, d.polysentiment.Libertarian, d.polysentiment.Green, d.polysentiment.Liberal];
        var max = Math.max.apply(null, poly);
        return politicalOpacity(max);
      })
      .attr("fill", function(d) {
        var poly = [d.polysentiment.Conservative, d.polysentiment.Libertarian, d.polysentiment.Green, d.polysentiment.Liberal];
        var max = Math.max.apply(null, poly);
        var index = poly.indexOf(max);
        return category[index];
     })
      .on("mouseover", function(d){
        div.transition()
          .duration(200)
          .style("opacity", 0.9)
        div.html(d.text)
          .style("left", (d3.event.pageX) + 10 + "px")
          .style("top", (d3.event.pageY - 30) + "px")
      })
      .on("mouseout", function(d) {
        div.transition()
          .duration(500)
          .style("opacity", 0.0);
      })
  }

  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
});
};
