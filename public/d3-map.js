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
  var politicalOpacity = d3.scale.log()
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

      // legend of sentimap https://github.com/zeroviscosity/d3-js-step-by-step/blob/master/step-3-adding-a-legend.html
      // http://eyeseast.github.io/visible-data/2013/08/27/responsive-legends-with-d3/
      var legend = svg.selectAll('.legend')
        .data(sentimentColor.domain())
        .enter()
        .append('g')
        .attr("class", "legendLinear")
        .attr("transform", "translate(20,20)");

      var legendRectSize = 20, legendSpacing = 5;
      var color = sentimentColor.range();

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize + legendSpacing)
        .text(function(d) {return d; })
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