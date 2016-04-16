// How does this file relate to d3-map.js? I can't tell what it's used for.

var width = 950,
    height = 550;

// set projection
var projection = d3.geo.mercator();

// create path variable
var path = d3.geo.path()
    .projection(projection);


d3.json("us.json", function(error, topo) { console.log(topo);

  	states = topojson.feature(topo, topo.objects.states).features
  	// set projection parameters
  	projection
      .scale(800)
      .center([-98, 37.5])

    // create svg variable
    var svg = d3.select("#politicalMap").append("svg")
    				.attr("width", width)
    				.attr("height", height);

    // points
    aa = {coordinates:[-82.490402, 43.786453], sent: 5, tweetName: "lol"};
    bb = {coordinates:[-122.389809, 37.72728], sent: 2.8, tweetName: "yeees"};

	// bb = [-122.389809, 37.72728];

	console.log(projection(aa),projection(bb));

	// add states from topojson
	svg.selectAll("path")
      .data(states).enter()
      .append("path")
      .attr("class", "feature")
      .style("fill", "steelblue")
      .attr("d", path);

      console.log(topojson.mesh(topo, topo.objects.states))
    // put boarder around states
  	//svg.append("path")
    //  .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { return a !== b; }))
    //  .attr("class", "mesh")
    //  .attr("d", path);

//     // add circles to svg
    svg.selectAll("circle")
		.data([aa,bb]).enter()
		.append("circle")
		.attr("cx", function (d) {  return projection(d.coordinates)[0]; })
		.attr("cy", function (d) { return projection(d.coordinates)[1]; })
    .attr("r", function (d) { return d.sent})
		// .attr("r", "8px")
		.attr("fill", "red")
    .on("mouseover", function(d){
      div.transition()
        .duration(200)
        .style("opacity", 0.9)
      div.html(d.tweetName)
        .style("left", (d3.event.pageX) + 10 + "px")
        .style("top", (d3.event.pageY - 30) + "px")
    })
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0.0);
    })

    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
});
