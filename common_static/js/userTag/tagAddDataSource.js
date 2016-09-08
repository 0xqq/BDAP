/**
 * Created by user on 16/6/20.
 */
require(['jquery','jquery.bootstrap','jquery.datetimepicker','quickSearch','app'],function($,d3){
    var tagDataSourceList = {

        pageNo:1,

        pageSize:10,

        totalPage:0,

        totalRecords:0,

        id:"",

        initFlag:true,

        mainkuId:"",

        init:function(){
            var dbname;
            this.initEvent();
            this.getDB();
            // this.getTable();
            this.getTableElm();
            // this.id = $.getQueryString("id");
            // if(this.id != null){
            //     this.getInfo();
            // }
        },

        initEvent:function() {
            var _this = this;
            $("#addDataSource").click(function(){
                $("#chooseTypeModal").modal("toggle");
            });

            $("#sureAddDB").click(function(){
                var selectRadio = $("input[name='dbtype']:checked").val();
                if(selectRadio == 1){
                    location.href = 'tagAddDataSource.html';
                }else{
                    location.href = 'tagAddUserDataSource.html';
                }

            });

            $("#tagType").change(function(){
                var value = $(this).val();
                if(value == 3){
                    $(".dongtaizhibiao").show();
                    $(".selectColumdiv").hide();
                }else{
                    $(".dongtaizhibiao").hide();
                    $(".selectColumdiv").show();
                }
            });

            $("#add").click(function(){
                _this.saveTag();
            });

            $("#yulanColums").click(function(){
                _this.yulanColums();
            });
        },

        yulanColums:function(){
            var _this = this;
            var verifyFlag = verifyEmpty(
                [
                    {name:"dbname",label:"DB简称"},
                    {name:"tableName",label:"表名"}
                ]
            );
            if(verifyFlag){
                if($("#tagType").val() == 3){
                    if($.trim($("#rule").val()) == ""){
                        showTip("聚合规则不能为空");
                        return;
                    }
                }else{
                    if($.trim($("#selectColum").val()) == ""){
                        showTip("标签映射字段不能为空");
                        return;
                    }
                }

                var ColumnLabel = {};

                ColumnLabel.dbId = _this.mainkuId;
                ColumnLabel.tableName = $("#tableName").val();
                ColumnLabel.columnName = $("#selectColum").val();
                ColumnLabel.type = $("#tagType").val();
                if(ColumnLabel.type == 3){
                    ColumnLabel.aggregateRule = $("#rule").val();
                }

                showloading(true);
                $.ajax({
                    type: "post",
                    url: "/sentosa/usergroup/label/preview",
                    dataType: "json",
                    contentType: 'application/json',
                    data: JSON.stringify(ColumnLabel),
                    success: function (result) {
                        showloading(false);
                        if (result && result.success) {
                            if(ColumnLabel.type == 2){
                                var minMax = result.pairs.dat.minMax;
                                if(!minMax){
                                    $.showModal({content: "获取最大值最小值失败."});
                                    return;
                                }
                                var str = '<tr><td>最小值:'+minMax[0]+'</td><td>最大值:'+minMax[1]+'</td></tr>';
                                $("#meijuvalues").html(str);
                                $(".tableMesTit").html("静态指标");
                                $(".meinudiv").show();
                            }else if(ColumnLabel.type == 3){
                                var enums = result.pairs.dat.enums;
                                var str = '<tr><td>'+enums[0]+'</td></tr>';
                                $("#meijuvalues").html(str);
                                $(".tableMesTit").html("动态指标");
                                $(".meinudiv").show();
                            }else{
                                var enums = result.pairs.dat.enums;
                                var str = "<tr>";
                                for(var ii=0;ii<enums.length;ii++){
                                    str = str + '<td>'+enums[ii]+'</td>';
                                    if((ii+1)%10 == 0){
                                        str = str + '</tr>';
                                    }
                                }
                                $("#meijuvalues").html(str);
                                $(".tableMesTit").html("枚举值");
                                $(".meinudiv").show();
                            }

                        } else {
                            $.showModal({content: "保存失败:"+result.message});
                        }
                    },
                    error: function (a, b, c) {
                        showloading(false);
                        alert(a.responseText);
                    }
                });
            }
        },


        saveTag:function(){
            var _this = this;
            // var verifyFlag = verifyEmpty(
            //     [
            //         {name:"tagname",label:"标签名称"},
            //         {name:"dbname",label:"DB简称"},
            //         {name:"tableName",label:"表名"}
            //     ]
            // );
            if(true){
               // if($("#tagType").val() == 3){
               //      if($.trim($("#rule").val()) == ""){
               //          showTip("聚合规则不能为空");
               //          return;
               //      }
               //     if($.trim($("#juheDate").val()) == ""){
               //         showTip("聚合时间字段映射不能为空");
               //         return;
               //     }
               // }else{
               //     if($.trim($("#selectColum").val()) == ""){
               //         showTip("映射字段映射不能为空");
               //         return;
               //     }
               // }

                var ColumnLabel = {};
                console.log($("#tagname").val());
                console.log($("#dbname").val());
                console.log($("#tagname").val());
                console.log($("#tagClass").val());
                // ColumnLabel.name = $("#tagname").val();
                // ColumnLabel.groupName = $("#dbname").val();
                // ColumnLabel.groupId = $("#dbname").attr("data-value");
                // ColumnLabel.dbId = _this.mainkuId;
                // ColumnLabel.tableName = $("#tableName").val();
                // ColumnLabel.columnName = $("#selectColum").val();
                // ColumnLabel.type = $("#tagType").val();
                // if(ColumnLabel.type == 3){
                //     ColumnLabel.aggregateRule = $("#rule").val();
                //     ColumnLabel.aggregateExpress = $("#juheDate").val();
                // }
                // ColumnLabel.classification = $("#tagClass").val();
                // ColumnLabel.joinColumnName = $("#userColum").val();
                // ColumnLabel.note = $("#desc").val();

                ColumnLabel.name = "pengshuang"
                var url = "/usertag/createtag";
                // if(this.id != null){
                //     url = "/sentosa/usergroup/label/modify";
                //     ColumnLabel.id = this.id;
                // }
                // showloading(true);
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    contentType: 'application/json',
                    data: JSON.stringify(ColumnLabel),
                    success: function (result) {
                    //     showloading(false);
                        // if (result && result.success) {
                        //     location.href = "tagList.html";
                        // } else {
                        //     $.showModal({content: "保存失败:"+result.message});
                        // }
                    // },
                    // error: function (a, b, c) {
                    //     showloading(false);
                        // alert(a.responseText);
                    }
                });
            }
        },

        getInfo:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/sentosa/usergroup/label/get",
                data: {
                    id:_this.id
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.dat;
                        $("#tagname").val(dat.name);
                        $("#dbname").val(dat.groupName);
                        $("#dbname").attr("data-value",dat.groupId);
                        _this.mainkuId = dat.dbID;
                        $("#tableName").val(dat.tableName);
                        $("#selectColum").val(dat.columnName);
                        $("#tagType").val(dat.type);
                        if(dat.type == 3){
                            $("#rule").val(dat.aggregateRule);
                            $("#juheDate").val(dat.aggregateExpress);
                            $(".dongtaizhibiao").show();
                            $(".selectColumdiv").hide();
                        }


                        $("#tagClass").val(dat.classification);
                        $("#userColum").val(dat.joinColumnName);
                        $("#desc").val(dat.note);

                        _this.getKu(dat.groupId);
                    } else {
                        $.showModal({content: "查询失败"});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },


        getDB: function () {
            var _this = this;
            $.ajax({
                type: "get",
                url: "/usertag/showall",
                data: {
                    //groupId:$("#leftKu").find("i.text-light-blue").parent().attr("data-id")
                },
                success: function (result) {
                    if (result && result.success) {
                        size = result.data.length;
                        var dbs = result.data;
                        var name = [];
                        for (var i=0;i<dbs.length;i++){
                            name.push(dbs[i].name)
                        }
                        $("#dbname").quickSearch({
                            data: name,
                            text: "name",
                            value: "id",
                            width: "400px"
                        });

                        $("#dbname").changeValue(function () {
                            name = $("#dbname").val();
                            var id;
                            for (var i=0;i<dbs.length;i++){
                            if (dbs[i].name == name) {
                                id = dbs[i].id
                            }
                        }
                            console.log(id);
                            $("#tableName").val("");
                            _this.getTable(id);
                        });

                    } else {
                        $.showModal({content: "查询失败"});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },


        // getKu: function (id) {
        //     var _this = this;
        //     if(this.id == null || this.initFlag == false){
        //        $("#tableName").val("");
        //        $("#selectColum").val("");
        //     }
        //     $(".meinudiv").hide();
        //     showloading(true);
            // $.ajax({
            //     type: "get",
            //     url: "/usertag/tsalist",
            //     data: {
            //         groupId: id
            //     },
            //     success: function (result) {
            //         showloading(false);
                    // if (result && result.success) {
                    //     var dat = result.data;
                    //     _this.objKu = dat[0];
                    //     var mainkuId = dat[0].id;
                    //     _this.mainkuId = mainkuId;
                    //     _this.jdbcUrl = dat[0].jdbcUrl;
                    //     _this.driverType = dat[0].driverType;
                    //     _this.selectUserName = dat[0].selectUserName;
                    //     _this.getTable(mainkuId, $("#tableName"));
                    // } else {
                    //     $.showModal({content: "查询失败"});
                    // }
                // },
                // error: function (a, b, c) {
                //     showloading(false);
                //     alert(a.responseText);
                // }
            // });
        // },
        getTable: function (dbname) {
            var _this = this;
            // showloading(true);
            // name = $("#tableName").val("");
            $.ajax({
                type: "get",
                url: "/usertag/tablelist",
                data: {
                    dbname: dbname
                },
                success: function (result) {
                    // showloading(false);
                    if (result && result.success) {
                        var data = result.data;
                        // var dat = result.data;
                        // var _dat = [];
                        // for (var i = 0; i < dat.length; i++) {
                        //     var d = {};
                        //     d.name = dat[i];
                        //     _dat.push(d);
                        // }
                        $("#tableName").quickSearch({
                            data: data,
                            text: "name",
                            value: "name",
                            width: "400px"
                        });
                        $("#tableName").changeValue(function () {
                            $("#selectColum").val("");
                            tablename = $("#tablenamee").val();
                            _this.getTableElm(dbname, tablename);
                        });
                    } else {
                        $.showModal({content: "查询失败"});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        getTableElm: function (dbname, tableName) {
            var _this = this;
            // showloading(true);
            $.ajax({
                type: "get",
                url: "/usertag/columnlist",
                data: {
                    tableName: tableName,
                    dbname: dbname
                },
                success: function (result) {
                    // showloading(false);
                    if (result && result.success) {
                        var dat = result.data;
                        _this.setTableElm(dat);
                    } else {
                        $.showModal({content: "查询失败"});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        setTableElm: function (dat) {
            if(this.id == null){
                $("#selectColum").val("");
            }
            $(".meinudiv").hide();
            $("#selectColum").quickSearch({
                data: dat,
                text: "name",
                value: "name",
                width: "400px"
            });
            $("#selectColum").changeValue(function () {
                $(".meinudiv").hide();
            });
        }

    };
    tagDataSourceList.init();
});
