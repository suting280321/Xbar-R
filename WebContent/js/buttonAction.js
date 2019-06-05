var projectId = 0;//项目Id
var projectName;//项目名
var appResult = null;//word报告
var appNameChinese = 'Xbar-R图';//app中文名（必填）
var USER_NAME = '';//当前登录用户名
//添加项目后，自定义操作
function addSelfDefine(result) {
    //上一层函数查看basicAction.js中addProject()函数
	$("#myBootstrapTtable").bootstrapTable('removeAll'); //添加项目后，删除原table
	$("#sampleAnalysisTable").bootstrapTable('removeAll'); //添加项目后，删除原table
    console.log("add project successful");
}
// Excel数据保存至数据库
function saveExcelData(result) {
	var groupNum=$('#myBootstrapTtable').bootstrapTable('getData').length;
	if(projectId == 0){
		alert("尚未选择与之对应的项目，请另存为一个新项目！");
		$('#saveAsNewProjectModal').modal();		
	}
	else{
		var datas1 = $('#myBootstrapTtable').bootstrapTable('getData');
		var datas2 = $('#sampleAnalysisTable').bootstrapTable('getData');
		$.ajax({
		    url:"/projectManager/api/v1/project",
		    type:"put",
		    data:{
		        id:projectId,
		        projectName:projectName,
		        memo:'',
		        appResult:'',
		        tempProjectID:"",
		        appContent:JSON.stringify(datas1),
		        appContent2:JSON.stringify(datas2)
		    },
		    success:function(result){
		          if(result.state){	
		        	  alert("Excel信息保存数据库成功！");  //请求成功
		           }
		          else{
		        	  alert("Excel信息保存数据库出现错误！");  //请求错误
		          }
		    }
		})
	}
	occorPicture();
}
//另存为之前首先检查是否选中了一个项目，然后再执行另存为
function checkAndShowModal(){
	if(projectId == 0){   //未选择项目的情况下不能另存为
		alert("请先选择一个项目，然后另存为！");
	}
	else{
		$('#saveAsNewProjectModal').modal();		
	}
}
//另存为一个新项目
function saveAsNewProject(){
	// 获取输入框中的内容
    var projectName = $('#newProjectName')[0].value;//获取项目名
    var createTime = new Date().toLocaleDateString() + ',' + new Date().getHours() + ':' + new Date().getMinutes();//获取项目创建时间
    var memo = $('#newProjectRemark')[0].value;//获取备注
    var datas1 = $('#myBootstrapTtable').bootstrapTable('getData');
    var datas2 = $('#sampleAnalysisTable').bootstrapTable('getData');
    var data = {
        "id": 0,
        "createTime": createTime,
        "editTime": createTime,
        "projectName": projectName,
        "memo": memo,
        "appContent":JSON.stringify(datas1),
        "appContent2":JSON.stringify(datas2),
        "appResult": appResult
    };
    //获取数据库所有项目名
    $.ajax({
        url: "/projectManager/api/v1/project",
        type: "get",
        async: false,
        dataType: "json",
        success: function (result) {
            projectNameArr.length = 0;//数组清零
            result.content.forEach(function (element, index, array) {
                projectNameArr.push(element.projectName);
            })
        }
    });
    //表格添加数据
    if (projectName === ''||projectName.match(/^\s*$/)) {
        alert("请输入项目名！！！");
    } else if (projectName.length > 25) {
        alert("项目名长度不能超过25个汉字，请重新输入");
    } else if (projectNameArr.indexOf(projectName) !== -1) {
        alert("项目已经存在，请重新输入项目名！！！");
    } else {
        // 添加数据库
        $.ajax({
            type: "post",
            url: "/projectManager/api/v1/project",
            data: data,
            success: function (result) {
            	alert("另存为新项目成功！");
                if (result.state) {
                    $('.selectList').prepend('<li class="">\n' +
                        '\t\t\t\t\t<a >\n' +
                        '\t\t\t\t\t\t<div>\n' +
                        '\t\t\t\t\t\t\t<div class="sideProjectLi" onmouseover="this.title = this.innerHTML;" onclick="sideCheck(' + result.content.id + ',this)">\n' +
                        '\t\t\t\t\t\t\t\t' + result.content.projectName + '\n' +
                        '\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t\t<div style="position:absolute;bottom:6px;right:5px;">\n' + 
                        '\t\t\t\t\t\t\t\t<i class="ace-icon fa fa-pencil align-top bigger-125 purple" id="checkSideLi" onclick="modifyBasicInfo(' + result.content.id + ',this)" data-toggle="modal" data-target="#basicInfo"></i>\n' +
                        '\t\t\t\t\t\t\t\t<i class="ace-icon fa fa-trash-o bigger-120 red" id="deleteSideLi" onclick="removeProject(' + result.content.id + ')"></i>\n' +
                        '\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t</a>\n' +
                        '\t\t\t\t</li>');
                    //侧边栏高度适应
                    var height = $(window).get(0).innerHeight;//获取屏幕高度
                    if ($('#cityList').children('li').length * 36 < height - 310) {
                        $('.selectList').css('height', $('#cityList').children('li').length * 36);
                    } else {
                        $('.selectList').css('height', height - 310);
                    }
                  
                    $('#dynamic-table').DataTable().row.add(data).draw(false);
                    //addSelfDefine(result);
                   // checkSelfDefine(node, result);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {//打印错误信息
                console.log("XMLHttpRequest请求状态码：" + XMLHttpRequest.status);
                console.log("XMLHttpRequest状态码：" + XMLHttpRequest.readyState);
                console.log("textStatus是：" + textStatus);
                console.log("errorThrown是：" + errorThrown);
            }
        });
        $('#saveAsNewProjectModal').modal('hide');//隐藏模态框
        // 在前台添加表格
    }
}
// 查看项目后，自定义操作
function checkSelfDefine(node, result) {
    // 上一层函数查看basicAction.js中checkProject()函数
	var averageNum=new Array(groupNum),rangeNum=new Array(groupNum);
	$("#myBootstrapTtable").bootstrapTable('removeAll'); //查看时，删除原table
	$("#sampleAnalysisTable").bootstrapTable('removeAll'); //查看时，删除原table
	//读取数据库数据并生成table
	var json1 = eval(result.content.appContent);  
	if(json1!=null){
		var datanum = json1.length;
		
		var json2 = eval(result.content.appContent2);   
		for(var i=0;i<datanum;i++){
			var rowdata1= {
					procedureIdForDelete:datanum+1,
					x1:json1[i].x1,
					x2:json1[i].x2,
					x3:json1[i].x3,
					x4:json1[i].x4,
					x5:json1[i].x5,
					totalNum:json1[i].totalNum,
					averageNum:json1[i].averageNum,
					rangeNum:json1[i].rangeNum,
			    };
			averageNum[i]=json1[i].averageNum;
			rangeNum[i]=json1[i].rangeNum;
		$('#myBootstrapTtable').bootstrapTable('append', rowdata1);
		
		}
		var rowdata2= {
				procedureIdForDelete:1,//datanum+1
				selectedA2:json2[0].selectedA2,
				selectedD3:json2[0].selectedD3,
				selectedD4:json2[0].selectedD4,
				AverageNum:json2[0].AverageNum,
				RangeNum:json2[0].RangeNum,
				UCLx:json2[0].UCLx,
				LCLx:json2[0].LCLx,
				UCLr:json2[0].UCLr,
				LCLr:json2[0].LCLr,
		    };
		$('#sampleAnalysisTable').bootstrapTable('append', rowdata2);
		groupNum=$('#myBootstrapTtable').bootstrapTable('getData').length;
		var AverageNumArr=new Array(groupNum),UCLxArr=new Array(groupNum),LCLxArr=new Array(groupNum),
		RangeNumArr=new Array(groupNum),UCLrArr=new Array(groupNum),LCLrArr=new Array(groupNum);
		
			var i;
			for(i=0;i<groupNum;i++){
				AverageNumArr[i]=json2[0].AverageNum;
			}
			for(i=0;i<groupNum;i++){
				UCLxArr[i]=json2[0].UCLx;
			}
			for(i=0;i<groupNum;i++){
				LCLxArr[i]=json2[0].LCLx;
			}
			for(i=0;i<groupNum;i++){
				RangeNumArr[i]=json2[0].RangeNum;
			}
			for(i=0;i<groupNum;i++){
				UCLrArr[i]=json2[0].UCLr;
			}
			for(i=0;i<groupNum;i++){
				LCLrArr[i]=json2[0].LCLr;
			}
			drawXbar(AverageNumArr,UCLxArr,LCLxArr,averageNum);
			drawR(RangeNumArr,UCLrArr,LCLrArr,rangeNum)
		document.getElementById("Xbar").style.display = "block";
		document.getElementById("R").style.display = "block";
	}else if(json1==null){
			document.getElementById("Xbar").style.display = "none";
			document.getElementById("R").style.display = "none";
		}
    console.log("check project successful");
}

//删除项目后，自定义操作
function removeSelfDefine(result) {
    // 上一层函数查看basicAction.js中removeProject()函数
	$("#sampleAnalysisTable").bootstrapTable('removeAll'); //每次计算时，删除原table
    console.log("remove project successful");
}
//导出excel表格
function downloadexcel(){		
	window.location.href="files/temp_index.xls";
}
//添加时 弹出上传提示
function openwin() {
	 var opts = {
				lines : 12, // 花瓣数目
				length : 10, // 花瓣长度
				width : 5, // 花瓣宽度
				radius : 10, // 花瓣距中心半径
				corners : 1, // 花瓣圆滑度 (0-1)
				rotate : 0, // 花瓣旋转角度
				direction : 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
				color : '#6fb3e0', // 花瓣颜色
				speed : 1, // 花瓣旋转速度
				trail : 60, // 花瓣旋转时的拖影(百分比)
				shadow : false, // 花瓣是否显示阴影
				hwaccel : false, // spinner 是否启用硬件加速及高速旋转
				className : 'spinner', // spinner css 样式名称
				zIndex : 2e9, // spinner的z轴 (默认是2000000000)
				top : 'auto', // spinner 相对父容器Top定位 单位 px
				left : 'auto', // spinner 相对父容器Left定位 单位 px
				position : 'relative', // element position
				progress : true, // show progress tracker
				progressTop : 0, // offset top for progress tracker
				progressLeft : 0
			    // offset left for progress tracker
			    };
			    spinner = new Spinner(opts);
    if ($("#data-excel").val() != "") {
		   var target = $("#spindiv").get(0);
		   spinner.spin(target);
		   timers = setInterval("excelfource()", 2000);
		   //$("#addselectfilemodal").hide();
    } else {
	   alert("请选择文件！");
    }
}
//校验选择文件是否符合上传规范
function checkfile(){
	var filesuffix = $("#data-excel").val();
	filesuffix = filesuffix.substring(filesuffix.lastIndexOf("."));	
	if(filesuffix == ".xls"||filesuffix == ".XLS"){
		return true;
	}else{
		alert("文件格式暂不支持，\n\n请将文件转为“Excel 97-2003 工作簿（*.xls或||*.XLS）”，再上传！");
		return false;
	}
}
//定制初始化内容
function setCustomContext() {
	canvg();  //将SVG格式的图片转化成canvas格式
	var canv0=document.getElementsByTagName("canvas")[0],canv1=document.getElementsByTagName("canvas")[1];
	var image=new Image(),image1=new Image();
    if (canv0 != null) {
		image.src = canv0.toDataURL("image/png");
	}
    if (canv1 != null) {
		image1.src = canv1.toDataURL("image/png");
	}
    var customText = {//word编辑区自定义文本内容
        'title': "<h2>1 Xbar-R App分析结果 </h2>",
        //'chap1': "<h3>1.1 *******</h3>",
        'img1': image,image1,
       // 'chap2': "<h3>1.2 *******</h3>",
        //'chap3': "<h3>1.3 结论****</h3>"
    };
    for (var variable in customText) {//遍历自定义文本对象
        $("#WYeditor").append(customText[variable]);//插入元素
    }
}