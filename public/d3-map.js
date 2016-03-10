function showMap(page, data){
  var width = 950,
    height = 550;
  // set projection
  var projection = d3.geo.mercator();
  // create path variable
  var path = d3.geo.path()
      .projection(projection);
  var sentimentColor = d3.scale.linear()
      .domain([0, 1])
      .range(['#ec576b', '#49e20e']);
  var sentimentOpacity = d3.scale.linear()
      .domain([0, .5, 1])
      .range([1, 0 , 1]);
  // var politicalColor = d3.scale.linear()
  //     .domain([0, 1])
  //     .range(['#ec576b', '#49e20e']);
  var politicalOpacity = d3.scale.linear()
      .domain([.4, 1])
      .range([0 , 1]);

  d3.json("us.json", function(error, topo) { console.log(topo);
	states = topojson.feature(topo, topo.objects.states).features
	// set projection parameters
	projection
    .scale(850)
    .center([-98, 37.5])

  // create svg variable

    if(page == 'senti'){
      var svg = d3.select("#sentimentMap").insert("svg")
          .attr("width", width)
          .attr("height", height);

      // add states from topojson
      svg.selectAll("path")
          .data(states).enter()
          .append("path")
          .attr("class", "feature")
          .style("fill", "#cccccc")
          .attr("d", path);
          
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
      var svg = d3.select("#politicalMap").append("svg")
              .attr("width", width)
              .attr("height", height)

      // add states from topojson
      svg.selectAll("path")
          .data(states).enter()
          .append("path")
          .attr("class", "feature")
          .style("fill", "#cccccc")
          .attr("d", path);
          
      // add circles to svg
      //var category = ['Conservative', 'Libertarian', 'Green', 'Liberal'];
      var category = ['#ff0000', '#ffff00', '#00ff00', '#0000ff'];
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