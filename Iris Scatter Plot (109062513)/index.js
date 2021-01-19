import {select,tsv,scaleLinear,extent,axisLeft,axisBottom} from 'd3';

const render = data => {
  
  const svg = select('svg');
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  const title = 'Iris scatter plot';
  const xValue = d => d['petal length'];
  const xAxisLabel = 'petal length';
  const yValue = d => d['petal width'];
  const circleRadius = 10;
  const yAxisLabel = 'petal width'; 
  const margin = { top: 60, right: 40, bottom: 88, left: 150 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const color = d3.scaleOrdinal()
    .domain(["Iris-virginica", "Iris-versicolor", "Iris-setosa" ])
    .range([ "#b1c8f2", "#bd37c4", "#7acdfa"]);
  const name_map = d3.scaleOrdinal()
  	.domain(['0','1','2'])
  	.range(["Iris-setosa","Iris-versicolor","Iris-virginica"]);
  
  const xScale = scaleLinear()
    .domain(extent(data, xValue))//This is somewhat quivalent to '[min(data, xValue),max(data, xValue)]'
    .range([0, innerWidth])
    .nice();
  
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  g.append('text').text('---109062513---')
    .attr('transform','translate(-50,430)')
    .attr('font-size','1.3em');


  //Y axis
  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);
  const yAxisG = g.append('g').call(yAxis);
  yAxisG.selectAll('.domain').remove();
  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -93)
    .attr('x', -innerHeight / 2)
    .attr('fill', 'black')
    .attr('transform', `rotate(-90)`)
    .attr('text-anchor', 'middle')
    .text(yAxisLabel);
  //X axis
  const xAxis = axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(15);
  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);
  xAxisG.select('.domain').remove();
  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', 75)
    .attr('x', innerWidth / 2)
    .attr('fill', 'black')
    .text(xAxisLabel);

	//spilit data into three groups with respect to their classes
 	const arr1=[];const arr2=[];const arr3=[];const theArr=[arr1,arr2,arr3];
  data.forEach(d=>{if (d.class=='Iris-setosa') arr1.push(d); else if (d.class=='Iris-versicolor') arr2.push(d); else arr3.push(d);})
  const draw_circles = g.selectAll('circle');
  //Draw three groups of points one after one
  theArr.forEach(arr=>{
    setTimeout(()=>{  
      draw_circles
        .data(arr)
        .enter().append('circle')
	      .transition().duration(600)
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))   
        .attr('r', circleRadius)
        .attr("fill", d=>{ return color(d.class) })
        .attr("stroke", d=>{ return color(d.class)});
      //!!!!!!!!!!!!!!help It won't work!!!!!!!!!!!!!!
    	//draw_circles.on('mouseover',()=>{console.log('hovered through')});
   
    //average of array
    const avg =arr=>{
    	let total=0;
      arr.forEach(d=>{total+=d});
      return total/arr.length
    	};
    let x_mean=[];
    let y_mean=[];
   	arr.forEach(d=>{x_mean.push(xValue(d));y_mean.push(yValue(d))});
    //append text everytime new group of circles comes out
    const g_text = g.append('text')
    g_text.text(name_map(theArr.indexOf(arr).toString()))
      .attr('y', d => yScale(avg(y_mean)))
      .attr('x', d => xScale(avg(x_mean)))
      .attr('text-anchor','middle')
      .attr('font-size','2em')
      .on('click',()=>{g_text.transition().duration(1500).attr('font-size','5em')
                      .transition().duration(500).attr('font-size','2em')});
      },(theArr.indexOf(arr)+1)*800)
  	});
  g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .text(title);
   g.append('text')
      .attr('y', 425)
  		.attr('x', 100)
      .text('(click on classes)');
};

tsv('iris.tsv')
  .then(data => {
    data.forEach(d => {
      d['sepal length'] = +d['sepal length'];
      d['sepal width'] = +d['sepal width'];
      d['petal length'] = +d['petal length'];
      d['petal width'] = +d['petal width'];
    });
    render(data);
  });

