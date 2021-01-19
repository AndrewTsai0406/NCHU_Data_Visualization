// D3 Collapsible Tree with ability to dynamically add content.
// Copyright (C) 2017  Floyd Hightower

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

var DYNAMICTREE = DYNAMICTREE || {};
function render_other()
{
    var margin = {top: 20, right: 20, bottom: 30, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .tickSize(0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var color = d3.scale.ordinal()
        .range(["#ca0020","#f4a582","#d5d5d5","#92c5de",'#6ff542']);

    globalThis.other_graph= svg1.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("https://raw.githubusercontent.com/AndrewTsai0406/test_for_DV_final/main/other.json", function(error, data) {

    var yearNames = data.map(function(d) { return d.year; });
    var categoryNames = data[0].values.map(function(d) { return d.category; });

    x0.domain(yearNames);
    x1.domain(categoryNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(year) { return d3.max(year.values, function(d) { return d.value; }); })]);

    other_graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    other_graph.append("g")
        .attr("class", "y axis")
        .style('opacity','0')
        .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Value");

    other_graph.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    var slice = other_graph.selectAll(".slice")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + x0(d.year) + ",0)"; });

    slice.selectAll("rect")
        .data(function(d) { return d.values; })
    .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.category); })
        .style("fill", function(d) { return color(d.category) })
        .style("opacity",1)
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); })
        .on("mouseover", function(d) {
            d3.select(this).style("fill", d3.rgb(color(d.category)).darker(2));
        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", color(d.category));
        });

    slice.selectAll("rect")
        .transition()
        .delay(function (d) {return Math.random()*1000;})
        .duration(1000)
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

    //Legend
    var legend = other_graph.selectAll(".legend")
        .data(data[0].values.map(function(d) { return d.category; }).reverse())
    .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i) { return "translate(-600," + i * 20 + ")"; })
        .style("opacity","0");

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) { return color(d); });

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d; });

    legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

    });
}

//------------------------------------------------------------------------------------
function render_violence()
{
    var margin = {top: 20, right: 20, bottom: 30, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .tickSize(0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var color = d3.scale.ordinal()
        .range(["#ca0020","#f4a582","#d5d5d5","#92c5de",'#6ff542','#942b84','#175678']);

    globalThis.violence_graph= svg1.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("https://raw.githubusercontent.com/AndrewTsai0406/test_for_DV_final/main/violence.json", function(error, data) {

    var yearNames = data.map(function(d) { return d.year; });
    var categoryNames = data[0].values.map(function(d) { return d.category; });

    x0.domain(yearNames);
    x1.domain(categoryNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(year) { return d3.max(year.values, function(d) { return d.value; }); })]);

    violence_graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    violence_graph.append("g")
        .attr("class", "y axis")
        .style('opacity','0')
        .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Value");

    violence_graph.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    var slice = violence_graph.selectAll(".slice")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + x0(d.year) + ",0)"; });

    slice.selectAll("rect")
        .data(function(d) { return d.values; })
    .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.category); })
        .style("fill", function(d) { return color(d.category) })
        .style("opacity",1)
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); })
        .on("mouseover", function(d) {
            d3.select(this).style("fill", d3.rgb(color(d.category)).darker(2));
        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", color(d.category));
        });

    slice.selectAll("rect")
        .transition()
        .delay(function (d) {return Math.random()*1000;})
        .duration(1000)
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

    //Legend
    var legend = violence_graph.selectAll(".legend")
        .data(data[0].values.map(function(d) { return d.category; }).reverse())
    .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
        .style("opacity","0");

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) { return color(d); });

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d; });

    legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

    });
}

//------------------------------------------------------------------------------------
function render_overall()
{
    var margin = {top: 20, right: 20, bottom: 30, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .tickSize(0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var color = d3.scale.ordinal()
        .range(["#29669e","#f4a582"]);

    globalThis.overall_graph=svg1.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("https://raw.githubusercontent.com/AndrewTsai0406/test_for_DV_final/main/overall.json", function(error, data) {

    var yearNames = data.map(function(d) { return d.year; });
    var categoryNames = data[0].values.map(function(d) { return d.category; });

    x0.domain(yearNames);
    x1.domain(categoryNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(year) { return d3.max(year.values, function(d) { return d.value; }); })]);

    overall_graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    overall_graph.append("g")
        .attr("class", "y axis")
        .style('opacity','0')
        .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Value");

    overall_graph.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    var slice = overall_graph.selectAll(".slice")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + x0(d.year) + ",0)"; });

    slice.selectAll("rect")
        .data(function(d) { return d.values; })
    .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.category); })
        .style("fill", function(d) { return color(d.category) })
        .style("opacity",1)
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); })
        .on("mouseover", function(d) {
            d3.select(this).style("fill", d3.rgb(color(d.category)).darker(2));
        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", color(d.category));
        });

    slice.selectAll("rect")
        .transition()
        .delay(function (d) {return Math.random()*1000;})
        .duration(1000)
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

    //Legend
    var legend = overall_graph.selectAll(".legend")
        .data(data[0].values.map(function(d) { return d.category; }).reverse())
    .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
        .style("opacity","0");

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) { return color(d); });

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d; });

    legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

    });



    var color1 = d3.scale.ordinal()
        .range(["#29669e","#f4a582"]);

        overall_graph.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("https://raw.githubusercontent.com/AndrewTsai0406/test_for_DV_final/main/overall2.json", function(error, data) {

    console.log(data);
    var yearNames = data.map(function(d) { return d.year; });
    var categoryNames = data[0].values.map(function(d) { return d.category; });

    x0.domain(yearNames);
    x1.domain(categoryNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(year) { return d3.max(year.values, function(d) { return d.value; }); })]);

    globalThis.overall_graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    overall_graph.append("g")
        .attr("class", "y axis")
        .style('opacity','0')
        .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Value");

    overall_graph.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    var slice = overall_graph.selectAll(".slice")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + x0(d.year) + ",0)"; });

    slice.selectAll("rect")
        .data(function(d) { return d.values; })
    .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.category); })
        .style("fill", function(d) { return color1(d.category) })
        .style("opacity",0.6)
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); })
        .on("mouseover", function(d) {
            d3.select(this).style("fill", d3.rgb(color1(d.category)).darker(2));
        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", color1(d.category));
        });

    slice.selectAll("rect")
        .transition()
        .delay(function (d) {return Math.random()*1000;})
        .duration(1000)
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

    //Legend
    var legend = overall_graph.selectAll(".legend")
        .data(data[0].values.map(function(d) { return d.category; }).reverse())
    .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
        .style("opacity","0");

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) { return color1(d); });

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d; });

    legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

        });
}

//------------------------------------------------------------------------------------
function render_theft()
{
    var margin = {top: 20, right: 20, bottom: 30, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .tickSize(0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var color = d3.scale.ordinal()
        .range(["#ca0020","#f4a582","#d5d5d5","#92c5de"]);

    globalThis.theft_graph= svg1.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("https://raw.githubusercontent.com/AndrewTsai0406/test_for_DV_final/main/theft.json", function(error, data) {

    var yearNames = data.map(function(d) { return d.year; });
    var categoryNames = data[0].values.map(function(d) { return d.category; });

    x0.domain(yearNames);
    x1.domain(categoryNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(year) { return d3.max(year.values, function(d) { return d.value; }); })]);

    theft_graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    theft_graph.append("g")
        .attr("class", "y axis")
        .style('opacity','0')
        .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Value");

    theft_graph.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    var slice = theft_graph.selectAll(".slice")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + x0(d.year) + ",0)"; });

    slice.selectAll("rect")
        .data(function(d) { return d.values; })
    .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.category); })
        .style("fill", function(d) { return color(d.category) })
        .style("opacity",1)
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); })
        .on("mouseover", function(d) {
            d3.select(this).style("fill", d3.rgb(color(d.category)).darker(2));
        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", color(d.category));
        });

    slice.selectAll("rect")
        .transition()
        .delay(function (d) {return Math.random()*1000;})
        .duration(1000)
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

    //Legend
    var legend = theft_graph.selectAll(".legend")
        .data(data[0].values.map(function(d) { return d.category; }).reverse())
    .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
        .style("opacity","0");

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) { return color(d); });

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d; });

    legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

    });



    var color1 = d3.scale.ordinal()
        .range(["#ca0020","#f4a582","#d5d5d5","#92c5de"]);

        svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("https://raw.githubusercontent.com/AndrewTsai0406/test_for_DV_final/main/theft2.json", function(error, data) {

    console.log(data);
    var yearNames = data.map(function(d) { return d.year; });
    var categoryNames = data[0].values.map(function(d) { return d.category; });

    x0.domain(yearNames);
    x1.domain(categoryNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(year) { return d3.max(year.values, function(d) { return d.value; }); })]);

    theft_graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    theft_graph.append("g")
        .attr("class", "y axis")
        .style('opacity','0')
        .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Value");

    theft_graph.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    var slice = theft_graph.selectAll(".slice")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + x0(d.year) + ",0)"; });

    slice.selectAll("rect")
        .data(function(d) { return d.values; })
    .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.category); })
        .style("fill", function(d) { return color1(d.category) })
        .style("opacity",0.6)
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); })
        .on("mouseover", function(d) {
            d3.select(this).style("fill", d3.rgb(color1(d.category)).darker(2));
        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", color1(d.category));
        });

    slice.selectAll("rect")
        .transition()
        .delay(function (d) {return Math.random()*1000;})
        .duration(1000)
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

    //Legend
    var legend = theft_graph.selectAll(".legend")
        .data(data[0].values.map(function(d) { return d.category; }).reverse())
    .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
        .style("opacity","0");

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) { return color1(d); });

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d; });

    legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

    });
}

//------------------------------------------------------------------------------------
function render_countries()
{
    // Setup svg using Bostock's margin convention

    var margin = { top: 50, right: 0, bottom: 0, left: 50 };

    var width = 850 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    globalThis.country_graph = svg1.append("g")
        .attr("width", 1400)
        .attr("height", 580)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /* Data in strings like it would be if imported from a csv */
    d3.csv('https://raw.githubusercontent.com/AndrewTsai0406/test_for_DV_final/main/by_countries.csv', function(data) {
        console.log("data in csv:", data)

        var parse = d3.time.format("%Y").parse;

        // Transpose the data into layers
        // var titles = ["redDelicious", "mcintosh", "oranges", "pears"]
        var titles = ["United States of America", "United Kingdom", "France", "Germany", "Japan", "Netherlands", "Spain", "Portugal", "Denmark", "Switzerland", "Sweden", "Republic of Korea", "Malaysia", "Indonesia", "Philippines", "Thailand", "Singapore", "India", "Canada", "Belgium", "Italy", "Austria", "Australia", "Vietnam", "Norway", "Finland", "Unknown", "Others"];
        var dataset = d3.layout.stack()(titles.map(function(fruit) {
            return data.map(function(d) {
                return { x: parse(d.years), y: +d[fruit] };
            });
        }));
        var largest = new Map();
        for (var d of data) {
            var temp = 0;
            for (var elem in d) {
                if (elem != "years" && elem != "Grand Total" && +d[elem] > temp) {
                    temp = +d[elem];
                }
            }
            largest.set(d.years, temp);
        }

        console.log("dataset", dataset);

        // Set x, y and colors
        var x = d3.scale.ordinal()
            .domain(dataset[0].map(function(d) { return d.x; }))
            .rangeRoundBands([10, width - 10], 0.02);

        var y = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d3.max(d, function(d) { return d.y0 + d.y; }); })])
            .range([height, 0]);

        var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574",
            "#2D2D2C",
            "#dddad6",
            "#000000",
            "#665C54",
            "#679ACC",
            "#8BA59B",
            "#95C085",
            "#8F4673",
            "#F2767A",
            "#FDF4C1",
            "#FFCC67",
            "#8BA59B",
            "#95C085",
            "#8F4673",
            "#F2767A",
            "#FFFFFF",
            "#FFCC67",
            "#6389CC",
            "#6723CC",
            "#676ACC",
            "#123ACC",
            "#679Ad1",
            "#69e0d1",
            "#6e1Ad1",
        ];

        
        // Define and draw axes
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5)
            .tickSize(-5, 0, 0)
            .tickFormat(function(d) { return d });

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.time.format("%Y"));

        country_graph.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Accumulated Value");

        country_graph.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);


        // Create groups for each series, rects for each segment 
        var groups = country_graph.selectAll("g.cost")
            .data(dataset)
            .enter().append("g")
            .attr("class", "cost")
            .style("fill", function(d, i) { return colors[i]; });

        var rect = groups.selectAll("rect")
            .data(function(d) { return d; })
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y0 + d.y); })
            .attr("height", function(d) { return 0; })
            .attr("width", x.rangeBand())
            .attr("opacity", d => {
                var year = d.x.toString().split(" ")[3];
                if (d.y === largest.get(year))
                    return 1;
                else
                    return 0.2;
            })
            .on("mouseover", function() { tooltip.style("display", null); })
            .on("mouseout", function() { tooltip.style("display", "none"); })
            .on("mousemove", function(d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.y);
            });

    //-------------------------------------------------
        groups.selectAll("rect").transition()
        .delay(function (d) {return Math.random()*1000;})
        .duration(1000)
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });
    //-------------------------------------------------


        // Draw legend title
        var Title = country_graph.append("g")
            .attr("class", "Title")
            .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });

        Title.append("text")
            .attr("x", width - 18)
            .attr("dy", "1em")
            .text("By Countries")
            .style("text-anchor", "start")
            .attr("font-size", "15px")
            .attr("font-weight", "bold");
            
        


        // Draw legend
        var legend = country_graph.selectAll(".legend")
            .data(colors)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(30," + (i + 2) * 19 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) { return colors.slice().reverse()[i]; });

        legend.append("text")
            .attr("x", width + 5)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function(d, i) {
                switch (i + 1) {
                    case 28:
                        return "United States of America"
                    case 27:
                        return "United Kingdom"
                    case 26:
                        return "France"
                    case 25:
                        return "Germany"
                    case 24:
                        return "Japan"
                    case 23:
                        return "Netherlands"
                    case 22:
                        return "Spain"
                    case 21:
                        return "Portugal"
                    case 20:
                        return "Denmark"
                    case 19:
                        return "Switzerland"
                    case 18:
                        return "Sweden"
                    case 17:
                        return "Republic of Korea"
                    case 16:
                        return "Malaysia"
                    case 15:
                        return "Indonesia"
                    case 14:
                        return "Philippines"
                    case 13:
                        return "Thailand"
                    case 12:
                        return "Singapore"
                    case 11:
                        return "India"
                    case 10:
                        return "Canada"
                    case 9:
                        return "Belgium"
                    case 8:
                        return "Italy"
                    case 7:
                        return "Austria"
                    case 6:
                        return "Australia"
                    case 5:
                        return "Vietnam"
                    case 4:
                        return "Norway"
                    case 3:
                        return "Finland"
                    case 2:
                        return "Unknown"
                    case 1:
                        return "Others"
                }
            });

        legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");


        // Prep the tooltip bits, initial display is hidden
        var tooltip = country_graph.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "8px")
            .attr("font-weight", "bold");



        })


        

}

//------------------------------------------------------------------------------------
function render_education()
{
    
    // Setup svg using Bostock's margin convention

    var margin = { top: 50, right: 0, bottom: 0, left: 50 };

    var width = 850 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    globalThis.education_graph = svg1.append("g")
        .attr("width", 1400)
        .attr("height", 580)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    /* Data in strings like it would be if imported from a csv */
    d3.csv('https://raw.githubusercontent.com/AndrewTsai0406/test_for_DV_final/main/by_educational_attainment.csv', function(data) {
        // console.log("data:", data)
        var reverseData = {};
        const reverseMapping = o => Object.keys(o).reduce((r, k) =>
            Object.assign(r, {
                [o[k]]: k
            }), {})
        for (var d of data)
            reverseData[d.years] = reverseMapping(d);

        var parse = d3.time.format("%Y").parse;

        // Transpose the data into layers
        // var titles = ["redDelicious", "mcintosh", "oranges", "pears"]
        var titles = ["Illiterate", "Self-Educated", "Elementary School", "Junior High School", "Senior & Vocational High School", "University & Junior College", "Graduate School", "Others (Include Unknown)"];
        var dataset = d3.layout.stack()(titles.map(function(fruit) {
            return data.map(function(d) {
                return { x: parse(d.years), y: +d[fruit] };
            });
        }));
        var largest = new Map();
        for (var d of data) {
            var temp = 0;
            for (var elem in d) {
                if (elem != "years" && elem != "Grand Total" && +d[elem] > temp) {
                    temp = +d[elem];
                }
            }
            largest.set(d.years, temp);
        }

        // console.log("dataset", dataset);

        // Set x, y and colors
        var x = d3.scale.ordinal()
            .domain(dataset[0].map(function(d) { return d.x; }))
            .rangeRoundBands([10, width - 10], 0.05, 0);

        var y = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d3.max(d, function(d) { return d.y0 + d.y; }); })])
            .range([height, 0]);

        var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574", "#2D2D2C", "#dddad6", "#F2767A", "#665C54"];

        // Define and draw axes
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5)
            .tickSize(-5, 0, 0)
            .tickFormat(function(d) { return d });

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.time.format("%Y"));

            education_graph.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Accumulated Value");

            education_graph.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);


        // Create groups for each series, rects for each segment 
        var groups = education_graph.selectAll("g.cost")
            .data(dataset)
            .enter().append("g")
            .attr("class", "cost")
            .style("fill", function(d, i) { return colors[i]; });

        var rect = groups.selectAll("rect")
            .data(function(d) { return d; })
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y0 + d.y); })
            .attr("height", function(d) { return 0; })
            .attr("width", x.rangeBand())
            .attr("opacity", d => {
                var year = d.x.toString().split(" ")[3];
                if (d.y === largest.get(year))
                    return 1;
                else
                    return 0.5;
            })
            .on("mouseover", function() { tooltip.style("display", null); })
            .on("mouseout", function() { tooltip.style("display", "none"); })
            .on("mousemove", function(d) {
                var year = d.x.toString().split(" ")[3];
                var t = reverseData[year][d.y] + "\n" + d.y;
                // console.log(d, year, t);
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.y);
                // .attr("opacity", () => {
                //     console.log(d);
                //     var year = d.x.toString().split(" ")[3];
                //     if (d.y === largest.get(year))
                //         return 1;
                //     else
                //         return 0.5;
                // })
            });

                
        //-------------------------------------------------
            groups.selectAll("rect").transition()
            .delay(function (d) {return Math.random()*1000;})
            .duration(1000)
            .attr("y", function(d) { return y(d.y0 + d.y); })
            .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });
        //-------------------------------------------------
        // Draw legend title
        var Title = education_graph.append("g")
            .attr("class", "Title")
            .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });

        Title.append("text")
            .attr("x", width - 18)
            .attr("dy", "1em")
            .text("By Edu. Attainment")
            .style("text-anchor", "start")
            .attr("font-size", "20px")
            .attr("font-weight", "bold");

        // Draw legend
        var legend = education_graph.selectAll(".legend")
            .data(colors)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(30," + (i + 2) * 19 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) { return colors.slice().reverse()[i]; });

        legend.append("text")
            .attr("x", width + 5)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function(d, i) {
                switch (i) {
                    case 7:
                        return "Illiterate"
                    case 6:
                        return "Self-Educated"
                    case 5:
                        return "Elementary School"
                    case 4:
                        return "Junior High School"
                    case 3:
                        return "Senior & Vocational High School"
                    case 2:
                        return "University & Junior College"
                    case 1:
                        return "Graduate School"
                    case 0:
                        return "Others (Include Unknown)"
                }
            });


        // Prep the tooltip bits, initial display is hidden
        var tooltip = education_graph.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 50)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 25)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");
        })
}

//------------------------------------------------------------------------------------
function render_occupations()
{
    // Setup svg using Bostock's margin convention

    var margin = { top: 50, right: 0, bottom: 0, left: 50 };

    var width = 850 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    globalThis.occupations_graph = svg1.append("g")
        .attr("width", 1400)
        .attr("height", 580)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    /* Data in strings like it would be if imported from a csv */
    d3.csv('https://raw.githubusercontent.com/AndrewTsai0406/test_for_DV_final/main/by_occupations.csv', function(data) {
        console.log("data in csv:", data)

        var parse = d3.time.format("%Y").parse;

        // Transpose the data into layers
        // var titles = ["redDelicious", "mcintosh", "oranges", "pears"]
        var titles = [
            "Legislators & Government Administrators & Business Executives & Managers",
            "Professionals",
            "Technicians & Associate Professionals",
            "Clerks",
            "Service Workers (Exclude Security Service Personnel)",
            "Sales Workers",
            "Agricultural & Forestry & Fishing & Animal Husbandry Workers",
            "Security Service Workers",
            "Skilled & Related Workers",
            "Transportation Workers (drivers & sailors & etc.)",
            "Machine Operation & Assemble Workers (Except Transportation Workers)",
            "Untechnical & Physical workers",
            "Students",
            "Unemployed Persons",
            "Others (Include Unknown)"
        ]
        var dataset = d3.layout.stack()(titles.map(function(fruit) {
            return data.map(function(d) {
                return { x: parse(d.years), y: +d[fruit] };
            });
        }));
        var largest = new Map();
        for (var d of data) {
            var temp = 0;
            for (var elem in d) {
                if (elem != "years" && elem != "Grand Total" && +d[elem] > temp) {
                    temp = +d[elem];
                }
            }
            // console.log(d.years, temp);
            largest.set(d.years, temp);
        }

        console.log("largest", largest);
        console.log("dataset", dataset);

        // Set x, y and colors
        var x = d3.scale.ordinal()
            .domain(dataset[0].map(function(d) { return d.x; }))
            .rangeRoundBands([10, width - 10], 0.02);

        var y = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d3.max(d, function(d) { return d.y0 + d.y; }); })])
            .range([height, 0]);

        var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574", "#2D2D2C", "#dddad6", "#000000", "#FDF4C1", "#665C54", "#679ACC", "#8BA59B", "#95C085", "#8F4673", "#F2767A", "#FFCC67"];

        // Define and draw axes
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5)
            .tickSize(-5, 0, 0)
            .tickFormat(function(d) { return d });

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.time.format("%Y"));

        occupations_graph.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Accumulated Value");

        occupations_graph.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);


        // Create groups for each series, rects for each segment 
        var groups = occupations_graph.selectAll("g.cost")
            .data(dataset)
            .enter().append("g")
            .attr("class", "cost")
            .style("fill", function(d, i) { return colors[i]; });

        var rect = groups.selectAll("rect")
            .data(function(d) { return d; })
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y0 + d.y); })
            .attr("height", function(d) { return 0; })
            .attr("width", x.rangeBand())
            .attr("opacity", d => {
                var year = d.x.toString().split(" ")[3];
                if (d.y === largest.get(year))
                    return 1;
                else
                    return 0.4;
            })
            .on("mouseover", function() { tooltip.style("display", null); })
            .on("mouseout", function() { tooltip.style("display", "none"); })
            .on("mousemove", function(d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.y);
            });

            
        //-------------------------------------------------
            groups.selectAll("rect").transition()
            .delay(function (d) {return Math.random()*1000;})
            .duration(1000)
            .attr("y", function(d) { return y(d.y0 + d.y); })
            .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });
        //-------------------------------------------------


        // Draw legend title
        var Title = occupations_graph.append("g")
            .attr("class", "Title")
            .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });


        Title.append("text")
            .attr("x", width - 18)
            .attr("dy", "1em")
            .text("By Occupations")
            .style("text-anchor", "start")
            .attr("font-size", "20px")
            .attr("font-weight", "bold");

        // Draw legend
        var legend = occupations_graph.selectAll(".legend")
            .data(colors)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(30," + (i + 2) * 19 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) { return colors.slice().reverse()[i]; });

        legend.append("text")
            .attr("x", width + 5)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function(d, i) {
                switch (i + 1) {
                    case 15:
                        return "Legislators & Government Administrators & Business Executives & Managers"
                    case 14:
                        return "Professionals"
                    case 13:
                        return "Technicians & Associate Professionals"
                    case 12:
                        return "Clerks"
                    case 11:
                        return "Service Workers (Exclude Security Service Personnel)"
                    case 10:
                        return "Sales Workers"
                    case 9:
                        return "Agricultural & Forestry & Fishing & Animal Husbandry Workers"
                    case 8:
                        return "Security Service Workers"
                    case 7:
                        return "Skilled & Related Workers"
                    case 6:
                        return "Transportation Workers (drivers & sailors & etc.)"
                    case 5:
                        return "Machine Operation & Assemble Workers (Except Transportation Workers)"
                    case 4:
                        return "Untechnical & Physical workers"
                    case 3:
                        return "Students"
                    case 2:
                        return "Unemployed Persons"
                    case 1:
                        return "Others (Include Unknown)"
                }
            });

        
        // Prep the tooltip bits, initial display is hidden
        var tooltip = occupations_graph.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");
        })
}


function make_a_rec(node)
{
  var all_pictures={
    年度:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/犯罪總覽/年度/",
    歷年:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/犯罪總覽/歷年/發生率與破獲.png",
    年齡:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/族群分析/年齡/108.png",
    各縣市全般刑案:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/各縣市全般刑案/",
    民生:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/竊盜案件/民生/歷年.png",
    住宅:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/竊盜案件/住宅/歷年.png",
    殺人:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/暴力犯罪/殺人/歷年.png",
    強盜:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/暴力犯罪/強盜/歷年.png",
    搶奪:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/暴力犯罪/搶奪/歷年.png",
    擄人勒贖:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/暴力犯罪/擄人勒贖/歷年.png",
    強制性交:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/暴力犯罪/強制性交/歷年.png",
    毒品:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/其他刑案/毒品/歷年.png",
    妨害風化及性自主:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/其他刑案/妨害風化及性自主/歷年.png",
    傷害:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/其他刑案/傷害/歷年.png",
    詐欺:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/其他刑案/詐欺/歷年.png",
    恐嚇取財:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/其他刑案/恐嚇取財/歷年.png",
    網路犯罪:"file://C:/Users/USER/Desktop/the_project/犯罪圖片/各類細項/其他刑案/網路犯罪/歷年.png"
    };

    discovery=[
    {text:'●公共危險罪件數以酒後駕車與肇事逃逸為主',x:0,y:110,link:"https://www.cprc.moj.gov.tw/media/7527/5324104651371.pdf?mediaDL=true"},
    {text:'●普通刑事犯罪率和失業率、人口密度差異、經濟階級差異與警察可見度間無存在顯著的關係。',x:0,y:140,link:"http://nhuir.nhu.edu.tw/retrieve/7946/3042030104.pdf"},
    {text:'●詐欺罪案件數早期穩定下降、近期增減更迭',x:0,y:170,link:"https://www.cprc.moj.gov.tw/media/7527/5324104651371.pdf?mediaDL=true"},
    {text:'●非本國籍者的外國籍分布方面，總體以越南籍比率最高，占 34.07%,其次為中國籍，占 20.70%',x:0,y:200,link:"https://www.cprc.moj.gov.tw/media/7527/5324104651371.pdf?mediaDL=true"},
    {text:'●中國籍犯罪者以國家安全法；越南籍犯罪者以妨害風化罪為主軸。',x:0,y:230,link:"https://www.cprc.moj.gov.tw/media/7527/5324104651371.pdf?mediaDL=true"},
    {text:'●少年兒童主要犯罪類型為竊盜罪與傷害罪，次為詐欺罪、毒品犯罪、妨害性自主罪及公共危險罪。',x:0,y:260,link:"https://www.cprc.moj.gov.tw/media/7527/5324104651371.pdf?mediaDL=true"},
    {text:'●所得分配不均程度, 對於普通竊盜、 故意殺人、 強制性交犯罪率有顯著正向影響。',x:0,y:290,link:"http://tea.wfsh.tp.edu.tw/business/BS3/%E6%89%80%E5%BE%97%E5%88%86%E9%85%8D%E4%B8%8D%E5%9D%87%E8%88%87%E7%8A%AF%E7%BD%AA%20%E5%8F%B0%E7%81%A3%E7%B8%A3%E5%B8%82%E5%8B%95%E6%85%8B%E8%BF%BD%E8%B9%A4%E8%B3%87%E6%96%99%E5%88%86%E6%9E%90.PDF"},
    {text:'●所得分配不均顯現出對於刑案犯罪率與暴力犯罪率都有顯著正向影響。',x:0,y:320,link:"http://tea.wfsh.tp.edu.tw/business/BS3/%E6%89%80%E5%BE%97%E5%88%86%E9%85%8D%E4%B8%8D%E5%9D%87%E8%88%87%E7%8A%AF%E7%BD%AA%20%E5%8F%B0%E7%81%A3%E7%B8%A3%E5%B8%82%E5%8B%95%E6%85%8B%E8%BF%BD%E8%B9%A4%E8%B3%87%E6%96%99%E5%88%86%E6%9E%90.PDF"},
    {text:'●犯罪少年的人口特性在不同犯罪地區、不同犯罪類型及不同犯罪原因間有其差異',x:0,y:350,link:"https://www.rde.ntpc.gov.tw/userfiles/ntpc/files/2.pdf"},
    {text:'●執政黨效應、平均每人警政支出及失業率對三種類型犯罪發生率均具有正的顯著影響。',x:0,y:380,link:"https://www.airitilibrary.com/Publication/alDetailedMesh?docid=U0005-2907200815140000"},
    {text:'●毒品犯罪件數與嫌疑人數均自 104 年逐年上升',x:0,y:410,link:"https://www.cprc.moj.gov.tw/media/7527/5324104651371.pdf?mediaDL=true"},
    {text:'●失業率與所得分配不均都對犯罪率呈現顯著正相關，而每人平均所得呈現顯著負相關。',x:0,y:440,link:"http://dspace.lib.fcu.edu.tw/bitstream/2377/30582/1/D966105599101.pdf"},
    {text:'●近 10 年竊盜犯罪發生件數逐年下降；犯罪嫌疑人數以扒竊所占比率最高。',x:0,y:470,link:"https://www.cprc.moj.gov.tw/media/7527/5324104651371.pdf?mediaDL=true"}]

//remove
    if (whosprevious=='國籍')
    {
        country_graph.remove();
    }
    if (whosprevious=='其他刑案')
    {
        other_graph.remove();
    }
    if (whosprevious=='職業')
    {
        occupations_graph.remove();
    }
    if (whosprevious=='教育')
    {
        education_graph.remove();
    }
    if(whosprevious=='犯罪總覽')
    {
        overall_graph.remove();
    }
    if(whosprevious=='竊盜案件')
    {
        theft_graph.remove();
    }
    if(whosprevious=='暴力犯罪')
    {
        violence_graph.remove();
    }
    if (whosprevious=='發現')
    {
        discovery=[];
        svg1.selectAll('text').data(discovery).exit().remove();
    }
//render



    if(node.name=='犯罪總覽')
    {
        render_overall();
        whosprevious='犯罪總覽';
    }
    if(node.name=='暴力犯罪')
    {
        render_violence();
        whosprevious='暴力犯罪';
    }
    if(node.name=='其他刑案')
    {
        render_other();
        whosprevious='其他刑案';
    }
    if(node.name=='竊盜案件')
    {
        render_theft();
        whosprevious='竊盜案件';
    }
    if(node.name=='國籍')
    {
        render_countries();
        whosprevious='國籍';
    }

    if(node.name=='職業')
    {
        render_occupations();
        whosprevious='職業';
    }

    if(node.name=='教育')
    {
        render_education();
        whosprevious='教育';
    }
    if(node.name=='發現'){
        
        svg1.selectAll('text')
        .data(discovery)
        .enter()
        .append('text')
        .attr('class','myMOUSE')
        .attr("x", function (d) { return d.x})
        .attr("y", function (d) { return d.y})
        .text(function (d) { return d.text})
        .attr("font-family", "Arial")
        .attr("font-size", "18px")
        .on("click", function(d) {window.open(d.link)});
        whosprevious='發現';
    }   




    


    if (data.length !=0)
    {
        //console.log('pop item:')
        console.log(data.pop())
    }
    svg1.selectAll('image').data(data).exit().remove();

    for ( thing in all_pictures )
    {
        if (node.name==thing){
            data.push(all_pictures[thing]);
            break;
        }
    } 
    
    svg1.selectAll('image').data(data).enter().append("image")
    .attr("xlink:href", function(d){return d})
    .attr("width", 530)
    .attr("height", 530)
    .attr("transform", "translate(0,0)");
}


var initialJson = {
    "name": " ",
    "children": [{
        "name": "犯罪總覽",
    },
    {
        "name": "族群分析",
    },
    {
        "name": "各類細項",
    },
    {
        "name": "發現",
    }],
    "type": "Incident"
};

// initialize the json for the tree
DYNAMICTREE.treeJson = initialJson;

DYNAMICTREE.getNewData = function(node) {
    /* Return a list of things that will be added as children to the json. */

    if(node.name =='族群分析'){        
        return [{name: '年齡'
        },{
            name: "教育",
        }, {
            name: "職業",
        },{
            name: '國籍'
        }];}
    if(node.name =='各類細項'){        
        return [{
            name: "竊盜案件",
        },{
            name: '暴力犯罪'
        },{
            name: '其他刑案'
        }];}
    if(node.name =='竊盜案件'){        
        return [{
            name: "民生",
        }, {
            name: "住宅",
        }];}
    if(node.name =='暴力犯罪'){        
    return [{
        name: "殺人",
    }, {
        name: "強盜",
    }, {
        name: "搶奪",
    }, {
        name: "擄人勒贖",
    }, {
        name: "強制性交",
    }];}
     if(node.name =='其他刑案'){        
        return [{
            name: "毒品",
        }, {
            name: "妨害風化及性自主",
        }, {
            name: "傷害",
        }, {
            name: "詐欺",
        }, {
            name: "恐嚇取財",
        }, {
            name: "網路犯罪",
        }];}   
    
};

DYNAMICTREE.updateJson = function(node) {
    /* Update the JSON to show new children nodes. */
    //console.log("node id", node.id);

    // Here is handy guide to how d3 works and how this code operates:
    // `._children`: this represents the *invisible* children of a node
    // `.children`: this represents the *visible* children of a node

    // if the child has children that are not currently visible, add children to each of the currently invisible nodes
    if (node._children) {
        node._children.forEach(function(childNode) {
            var associatedItems = DYNAMICTREE.getNewData(childNode);
            childNode._children = associatedItems;
        });
    }

    // if the node has visible children, make them invisible 
    if (node.children) {
        node._children = node.children;
        node.children = null;
    }
    // if the node has invisible children, make them visible
    else {
        node.children = node._children;
        node._children = null;
    }


    if (node.name){
        //console.log(node.name)
        make_a_rec(node)
    }



    // update the view to reflect the new changes
    D3UTILITY.update(node);
};
