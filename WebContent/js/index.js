//获取组数
var groupNum=$('#myBootstrapTtable').bootstrapTable('getData').length;	
var datas = $('#myBootstrapTtable').bootstrapTable('getData');
var JsonDatas = JSON.stringify(datas);
var observationNum=0;
$("#myBootstrapTtable").bootstrapTable({
	height : 40, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	columns:[{
			title : "状态",
			field : "state",
			align : "center",
			valign : "middle",
			width:65
		},
		{
			title : "序号",
			field : "procedureIdForDelete",
			align : "center",
			valign : "middle",
			width:85
		},
		{
			title : "x1",
			field : "x1",
			align : "center",
			valign : "middle",
			width:115
		},
		{
			title : "x2",
			field : "x2",
			align : "center",
			valign : "middle",
			width:115
		},
		{
			title : "x3",
			field : "x3",
			align : "center",
			valign : "middle",
			width:115
		},
		{
			title : "x4",
			field : "x4",
			align : "center",
			valign : "middle",
			width:115
		},
		{
			title : "x5",
			field : "x5",
			align : "center",
			valign : "middle",
			width:115
		},
		{
			title : "子组样本总和",
			field : "totalNum",
			align : "center",
			valign : "middle",
			width:158
		},
		{
			title : "子组样本平均数",
			field : "averageNum",
			align : "center",
			valign : "middle",
			width:180
		},
		{
			title : "子组样本极差",
			field : "rangeNum",
			align : "center",
			valign : "middle",
			width:155
		},
		{
			title : "编辑",
			field : "action",
			align : "center",
			valign : "middle",
			width:135
		}
	]// 1358,11列
})
// 获取组内观测点数
	function getObservationNum(){
		groupNum=$('#myBootstrapTtable').bootstrapTable('getData').length;
		datas = $('#myBootstrapTtable').bootstrapTable('getData');
		JsonDatas = eval(JSON.stringify(datas));
		observationNum=0;
		if(groupNum == 0){
			alert("请输入数据！");
		}
		else{	// 开始计算
			var arr=new Array();
			 arr[0]=JsonDatas[0].x1;
			 arr[1]=JsonDatas[0].x2;
			 arr[2]=JsonDatas[0].x3;
			 arr[3]=JsonDatas[0].x4;
			 arr[4]=JsonDatas[0].x5;
			 for(var i=0;i<arr.length;i++){
				 if(arr[i]!=0){
					 observationNum++;
				 }
			 }
		}
	}
// 添加样本
	function addSample(){
		var rowdata={
		        procedureIdForDelete:groupNum+1,
		        x1:$('#x1').val(),
				x2:$('#x2').val(),
				x3:$('#x3').val(),
				x4:$('#x4').val(),
				x5:$('#x5').val(),
			}
		$('#myBootstrapTtable').bootstrapTable('append', rowdata);
	}
// 生成序号自加+1
	function generateId(value,row,index) {
		return index+1;
	}
	
	var updateindex = 1;
	window.actionEvents = {
			'click .edit': function (e, value, row, index) {
	    	$('#updatedatainfo').modal('show');
	    	$("#x1_u").val(row.x1);
	    	$("#x2_u").val(row.x2);
	    	$("#x3_u").val(row.x3);
	    	$("#x4_u").val(row.x4);
	    	$("#x5_u").val(row.x5);
	    	$("#procedureId_u").val(row.procedureId); // 不可见，不能改
	    	updateindex = index;
	        // console.log(row);
	     }
	}
// 编辑菜单
	function actionFormatter(value, row, index) {
	    return [
	        '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
	        '<i class="glyphicon glyphicon-edit"></i> 编辑',
	        '</a>'
	    ].join('');
	}
// 删除函数
	function deleterow() {
		// 遍历数组中的每个元素，并按照return中的计算方式 形成一个新的元素，放入返回的数组中
		var ids = $.map($('#myBootstrapTtable').bootstrapTable('getSelections'), function (row) {
	        return row.procedureIdForDelete;
	    });
		$('#myBootstrapTtable').bootstrapTable('remove', {field: 'procedureIdForDelete', values: ids});
		$("#sampleAnalysisTable").bootstrapTable('removeAll'); // 每次计算时，删除原table
	}
// 更改样本数据
	function editItem() {
		$('#updatedatainfo').modal('hide');
		// //更改表格数据
		var rowdata= {
				x1:$('#x1_u').val(),
				x2:$('#x2_u').val(),
				x3:$('#x3_u').val(),
				x4:$('#x4_u').val(),
				x5:$('#x5_u').val(),
	    };
		$('#myBootstrapTtable').bootstrapTable('updateRow',{index: updateindex, row: rowdata});
	}
// A2选择
function A2Selected(){
	if(observationNum<2||observationNum>25){
		alert("子组数越界，请调整子组数")
	}else {
		if(observationNum==2){
			return A2=1.880;
		}else if (observationNum==3) {
			return A2=1.023;
		}else if (observationNum==4) {
			return A2=0.729;
		}else if (observationNum==5) {
			return A2=0.577;
		}else if (observationNum==6) {
			return A2=0.483;
		}else if (observationNum==7) {
			return A2=0.373;
		}else if (observationNum==8) {
			return A2=0.337;
		}else if (observationNum==9) {
			return A2=0.308;
		}else if (observationNum==10) {
			return A2=0.285;
		}else if (observationNum==11) {
			return A2=0.373;
		}else if (observationNum==12) {
			return A2=0.266;
		}else if (observationNum==13) {
			return A2=0.249;
		}else if (observationNum==14) {
			return A2=0.235;
		}else if (observationNum==15) {
			return A2=0.223;
		}else if (observationNum==16) {
			return A2=0.212;
		}else if (observationNum==17) {
			return A2=0.203;
		}else if (observationNum==18) {
			return A2=0.194;
		}else if (observationNum==19) {
			return A2=0.187;
		}else if (observationNum==20) {
			return A2=0.180;
		}else if (observationNum==21) {
			return A2=0.173;
		}else if (observationNum==22) {
			return A2=0.167;
		}else if (observationNum==23) {
			return A2=0.162;
		}else if (observationNum==24) {
			return A2=0.157;
		}else if (observationNum==25) {
			return A2=0.153;
		}
	}
}
// D3选择
function D3Selected(){
	if(observationNum<2||observationNum>25){
		alert("子组数越界，请调整子组数")
	}else {
		if(observationNum>=2&&observationNum<=6){
			return D3=0;
		}else if (observationNum==7) {
			return D3=0.076;
		}else if (observationNum==8) {
			return D3=0.136;
		}else if (observationNum==9) {
			return D3=0.184;
		}else if (observationNum==10) {
			return D3=0.223;
		}else if (observationNum==11) {
			return D3=0.256;
		}else if (observationNum==12) {
			return D3=0.283;
		}else if (observationNum==13) {
			return D3=0.307;
		}else if (observationNum==14) {
			return D3=0.328;
		}else if (observationNum==15) {
			return D3=0.347;
		}else if (observationNum==16) {
			return D3=0.363;
		}else if (observationNum==17) {
			return D3=0.378;
		}else if (observationNum==18) {
			return D3=0.391;
		}else if (observationNum==19) {
			return D3=0.403;
		}else if (observationNum==20) {
			return D3=0.415;
		}else if (observationNum==21) {
			return D3=0.425;
		}else if (observationNum==22) {
			return D3=0.434;
		}else if (observationNum==23) {
			return D3=0.443;
		}else if (observationNum==24) {
			return D3=0.451;
		}else if (observationNum==25) {
			return D3=0.459;
		}
	}
}
// D4选择
function D4Selected(){
	if(observationNum<2||observationNum>25){
		alert("子组数越界，请调整子组数")
	}else {
		if(observationNum==2){
			return D4=3.267;
		}else if (observationNum==3) {
			return D4=2.574;
		}else if (observationNum==4) {
			return D4=2.282;
		}else if (observationNum==5) {
			return D4=2.114;
		}else if (observationNum==6) {
			return D4=2.004;
		}else if (observationNum==7) {
			return D4=1.924;
		}else if (observationNum==8) {
			return D4=1.864;
		}else if (observationNum==9) {
			return D4=1.816;
		}else if (observationNum==10) {
			return D4=1.777;
		}else if (observationNum==11) {
			return D4=1.744;
		}else if (observationNum==12) {
			return D4=1.717;
		}else if (observationNum==13) {
			return D4=1.693;
		}else if (observationNum==14) {
			return D4=1.672;
		}else if (observationNum==15) {
			return D4=1.653;
		}else if (observationNum==16) {
			return D4=1.637;
		}else if (observationNum==17) {
			return D4=1.622;
		}else if (observationNum==18) {
			return D4=1.608;
		}else if (observationNum==19) {
			return D4=1.597;
		}else if (observationNum==20) {
			return D4=1.585;
		}else if (observationNum==21) {
			return D4=1.575;
		}else if (observationNum==22) {
			return D4=1.566;
		}else if (observationNum==23) {
			return D4=1.557;
		}else if (observationNum==24) {
			return D4=1.548;
		}else if (observationNum==25) {
			return D4=1.541;
		}
	}
}
// 保留n位小数
function roundFun(value, n) {
  return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
} 
// 计算子样本的样本总和、均值、极差
function caculate(){
	getObservationNum();
	var averageNum=new Array(groupNum),rangeNum=new Array(groupNum),AverageNumArr=new Array(groupNum),UCLxArr=new Array(groupNum),LCLxArr=new Array(groupNum),
	RangeNumArr=new Array(groupNum),UCLrArr=new Array(groupNum),LCLrArr=new Array(groupNum),totalNum;
	// 获取每一行的值相加
	for(var i=0;i<groupNum;i++){
		totalNum=0;
		var arr=new Array();
		arr[0]=JsonDatas[i].x1;
		arr[1]=JsonDatas[i].x2;
		arr[2]=JsonDatas[i].x3;
		arr[3]=JsonDatas[i].x4;
		arr[4]=JsonDatas[i].x5;
		for(var j=0;j<observationNum;j++){
			totalNum+=Number(arr[j]);
		}
		averageNum[i]=totalNum/observationNum;
		arr.sort(function (a, b) {
			  return a-b;
			}); 
		rangeNum[i]=arr[arr.length-1]-arr[arr.length-observationNum];
		var rowdata= {
				totalNum:totalNum,
				averageNum:averageNum[i],
				rangeNum:rangeNum[i],
		
		};
		$('#myBootstrapTtable').bootstrapTable('updateRow',{index: i, row: rowdata});
	}
	$("#sampleAnalysisTable").bootstrapTable('removeAll'); // 每次计算时，删除原table
	var x,averageNumSum=0,AverageNum,rangeNumSum=0,RangeNum,A2,D4,D3,UCLx,LCLx,UCLr,LCLr;
	// 将averageNum1数组相加得到averageNumSum,rangeNum1数组相加得到rangeNumSum
	for(x in averageNum){
		averageNumSum+=averageNum[x];
	}
	for(x in rangeNum){
		rangeNumSum+=rangeNum[x];
	}
	// 计算总样本平均数，AverageNum=averageNumSum/groupNum
	AverageNum=roundFun(averageNumSum/groupNum,3);
	// 计算总极差平均数，RangeNum=rangeNumSum/groupNum
	RangeNum=roundFun(rangeNumSum/groupNum,3);
	// 计算X的上控制线,UCLx=AverageNum+A2*RangeNum
	A2=A2Selected();
	D4=D4Selected();
	D3=D3Selected();
	UCLx=roundFun(AverageNum+A2*RangeNum,3);
	// 计算X的下控制线,LCLx=AverageNum-A2*RangeNum
	LCLx=roundFun(AverageNum-A2*RangeNum,3);
	// 计算R的上控制线,UCLr=D4*RangeNum
	UCLr=roundFun(D4*RangeNum,3);
	// 计算R的下控制线,LCLr=D3*RangeNum
	LCLr=roundFun(D3*RangeNum,3);
	var analysisTableData={
			procedureIdForDelete:1,// datanum+1
			selectedA2:A2,
			selectedD3:D3,
			selectedD4:D4,
			AverageNum:AverageNum,
			RangeNum:RangeNum,
			UCLx:UCLx,
			LCLx:LCLx,
			UCLr:UCLr,
			LCLr:LCLr,
	}
	$('#sampleAnalysisTable').bootstrapTable('append', analysisTableData);
	var i;
	for(i=0;i<groupNum;i++){
		AverageNumArr[i]=AverageNum;
	}
	for(i=0;i<groupNum;i++){
		UCLxArr[i]=UCLx;
	}
	for(i=0;i<groupNum;i++){
		LCLxArr[i]=LCLx;
	}
	for(i=0;i<groupNum;i++){
		RangeNumArr[i]=RangeNum;
	}
	for(i=0;i<groupNum;i++){
		UCLrArr[i]=UCLr;
	}
	for(i=0;i<groupNum;i++){
		LCLrArr[i]=LCLr;
	}
	drawXbar(AverageNumArr,UCLxArr,LCLxArr,averageNum);
	drawR(RangeNumArr,UCLrArr,LCLrArr,rangeNum);
	document.getElementById("Xbar").style.display = "block";
	document.getElementById("R").style.display = "block";
}

function drawXbar(data1,data2,data3,data4){
	var chart = Highcharts.chart('Xbar', {
		title: {
			text: '平均值控制图',
			style:{
				 color:"#000",
		    }
		},
		style:{
			borderWidth:'2px'
		},
		tooltip: {           // 数据提示框
			backgroundColor:'#fff',
			animation: true  ,
			borderWidth: 2,
			borderColor: '#AAA',
			shadow: true, 
			shared:true
		},
		xAxis:{
			title:{
				text:"子样本个数"
			},
			tickInterval:1,  // x轴间隔设为1
			gridLineWidth:1,
			gridLineColor: '#C0C0C0',
			gridLineDashStyle:'Solid',
			allowDecimals:false
		},
		yAxis: {
			title: {
				text: ""
			},
			gridLineWidth:1,
			gridLineColor: '#C0C0C0',
			gridLineDashStyle:'Solid',
			// min:-0.005 //y轴最低点
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				pointStart: 1  // 从1开始
			}
		},
		function (chart) { 
			renderMinMaxLabel(chart);
			},
		series: [{
			name: '总样本平均数',
			data: data1,
			color:'#16bcb4',
			dashStyle: 'Solid'
		}, {
			name: '总样本平均数的上控制线UCLx',
			data: data2,
			color:'#f16522',
			dashStyle: 'Solid'
		}, {
			name: '总样本平均数的下控制线LCLx',
			data: data3,
			dashStyle: 'Solid',
			color:'#a763a9'
		}, {
			name: '子组样本平均数',
			data: data4,
			lineWidth:2,
			color:'#00aeef'
		},
		],
		responsive: {
			rules: [{
				condition: {
					minWidth: 1
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		}
	});
}
function drawR(data1,data2,data3,data4){
	var chart = Highcharts.chart('R', {
		title: {
			text: '极差控制图',
			style:{
				 color:"#000",
		    }
		},
		style:{
			borderWidth:'2px'
		},
		tooltip: {           // 数据提示框
			backgroundColor:'#fff',
			animation: true  ,
			borderWidth: 2,
			borderColor: '#AAA',
			shadow: true, 
			shared:true
		},
		xAxis:{
			title:{
				text:"子样本个数"
			},
			tickInterval:1,  // x轴间隔设为1
			gridLineWidth:1,
			gridLineColor: '#C0C0C0',
			gridLineDashStyle:'Solid',
			allowDecimals:false
		},
		yAxis: {
			title: {
				text: ""
			},
			gridLineWidth:1,
			gridLineColor: '#C0C0C0',
			gridLineDashStyle:'Solid',
			// min:-0.005 //y轴最低点
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				pointStart: 1  // 从1开始
			}
		},
		function (chart) { 
			renderMinMaxLabel(chart);
			},
		series: [{
			name: '总极差平均数',
			data: data1,
			color:'#16bcb4',
			dashStyle: 'Solid'
		}, {
			name: '总极差平均数的上控制线UCLx',
			data: data2,
			color:'#f16522',
			dashStyle: 'Solid'
		}, {
			name: '总极差平均数的下控制线LCLx',
			data: data3,
			dashStyle: 'Solid',
			color:'#a763a9'
		}, {
			name: '子组样本极差',
			data: data4,
			lineWidth:2,
			color:'#00aeef'
		},
		],
		responsive: {
			rules: [{
				condition: {
					minWidth: 1
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		}
	});
}
function excelfource() {
    var re =$("#iframeInfo").contents().find("pre").html();
// console.log(re);
    if(re!=""){
		$("#iframeInfo").contents().find("pre").html("");
		spinner.spin();// 关闭spinner
		clearInterval(timers);
		$('#addselectfilemodal').modal('hide');
		// window.location.reload();
		addExcelData(re);
    }
}
// 将Excel数据添加至表格
function addExcelData(data){
	var json = eval(data);
	for (var i=0;i<json.length;i++) {
		var datanum = $('#myBootstrapTtable').bootstrapTable('getData').length;
		var rowdata= {
				procedureIdForDelete : datanum + 1,			
				x1: json[i].x1,
				x2: json[i].x2,
				x3: json[i].x3,
				x4: json[i].x4,
				x5: json[i].x5,
		    };
// console.log(datanum + 1);
		$('#myBootstrapTtable').bootstrapTable('append', rowdata);
	}
}