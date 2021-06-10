var pgs = $('<div style="width:100%;position:absolute;vertical-align:middle;z-index:999999;top:0;left:0;float:left;text-align:center;">' +
                '<div style="position:fixed;left:45%;top:50%;width:240px;height:50px;margin:auto;z-index:9999999">' +
                '<img  src="/Style/images/hourglass.gif" /></div>' +
                '</div>'
                );
$.overlay = {

    hide: function () {
        pgs.fadeOut('slow', function () {
            $(this).remove();
            $('body').css('overflow-y', 'auto'); // show scrollbars!
            $(window).resize();
        });
    },
    show: function () {

        pgs.css({
            display: 'block',
            opacity: 0.5,
            height: $(document).height(),
            //'line-height': $(window).height()-150 + 'px',
            background: 'black'// url('+(img||this.img)+') no-repeat scroll center center'
        }).appendTo('body')
            .animate({ opacity: 0.5 }, 'slow');
    }
};




var egovutil = {
    loadUrlMain:function(url)
    {
        App.blockUI({
            target: '#egov-body-main',
            boxed: true,           
            message:'Đang tải dữ liệu...'
        });
        $.post(encodeURI(url), function (data) {
           
            App.unblockUI('#egov-body-main');
            $(".egov-page-content").html(data);
        });

    },

    getContent:function(id,url)
    {
        App.blockUI({
            target: id,
            boxed: true,
            message:'Đang tải danh sách...'
            
        });
        $.post(encodeURI(url), function (data) {
            App.unblockUI(id);

            $(id).html(data);
            $('[data-toggle="tooltip"]').tooltip();
        });
    },
    getContentCallBack:function(id,url,callBack)
    {
        App.blockUI({
            target: id,
            boxed: true,
            message: 'Đang tải danh sách...'

        });
        $.post(encodeURI(url), function (data) {
            App.unblockUI(id);
            $(id).html(data);
            $('[data-toggle="tooltip"]').tooltip();
            if(callBack!="")
                setTimeout(callBack, 1);
            
        });
    }
    
    ,createPaging:function(id,tp,cur,step)
    {
        return  $(id).bootpag({
            total: tp,
            page: cur,
            maxVisible: step,
            leaps: true,
            firstLastUse: true,
            first: '<span aria-hidden="true">Đầu</span>',
            last: '<span aria-hidden="true">Cuối</span>',
            wrapClass: ' pull-right pagination',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'
        })
    },loadPaging:function(pagingId,url,body)
    {
      
        pagingId.on("page", function (event, num) {
            //$(body).load(encodeURI(url + "&page=" + num));

            egovutil.getContent(body, url + "&page=" + num);
        }).find('.pagination');
    },
    dialog:function(title_dialog,width,url,cb)
    {
        var dialog = bootbox.dialog({
            title: title_dialog,
            size: width,
            message: '<p><i class="fa fa-spin fa-spinner"></i> Đang tải dữ liệu...</p>',           
            buttons: {
                cancel: {
                    label: '<i class="ace-icon fa fa-times red2"></i>Thoát',
                    className: 'btn-white btn-danger  btn-round',
                    callback: function () {
                        window.setTimeout(cb, 1);
                        //location.reload();
                    }
                }
            },
            onEscape: function () {
                window.setTimeout(cb, 1);
            }

        });
        dialog.find(".modal-header").attr("class", "modal-header btn-primary");
      
        
        dialog.init(function () {

           
            $.post(encodeURI(url), function (data) {
                dialog.find('.bootbox-body').html("<div class='col-xs-12' id='ctalert'></div>"+data);
            });
            
        });
    },
    submit:function(formId,rule,message,url)
    {
        var form_action= $(formId);
        var st_error = $('.alert-danger', form_action);
        var st_success = $('.alert-success', form_action);

        form_action.validate({
            errorElement: 'span', 
            errorClass: 'help-block help-block-error', 
            focusInvalid: false, 
            ignore: "", 
            messages: message              
            ,
            rules: rule,

            invalidHandler: function (event, validator) { //display error alert on form submit              
                st_success.hide();
                st_error.show();
                App.scrollTo(st_error, -200);
            },

            errorPlacement: function (error, element) {
                if (element.is(':checkbox')) {
                    error.insertAfter(element.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline"));
                } else if (element.is(':radio')) {
                    error.insertAfter(element.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline"));
                } else {
                    error.insertAfter(element); 
                }
            },

            highlight: function (element) {
                $(element)
                    .closest('.form-group').addClass('has-error'); 
            },

            unhighlight: function (element) { 
                $(element)
                    .closest('.form-group').removeClass('has-error'); 
            },

            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); 
            },

            submitHandler: function (form) {

                st_success.show();
                st_error.hide();
                App.blockUI({
                    target: formId,
                    boxed: true,
                    message: 'Đang xử lý dữ liệu...'

                });

                $.post(url,
         		   $(formId).find("input,textarea,select,hidden").not("#_VIEWSTATE,#_EVENTVALIDATION").serialize(),
                      function (data) {
                          App.unblockUI(formId);
                          egovutil.MessageToast(data.Type, data.Title, data.Message);
                         });
            }
        });
    },
    MessageToast:function(ty,ti,mes)
    {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        toastr[ty](mes, ti);
    }
    
    ,submitCallBack:function(formId,rule,message,url,cb)
    {

        var form_action = $(formId);
        var st_error = $('.alert-danger', form_action);
        var st_success = $('.alert-success', form_action);

        form_action.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            messages: message
            ,
            rules: rule,

            invalidHandler: function (event, validator) { //display error alert on form submit              
                st_success.hide();
                st_error.show();
                App.scrollTo(st_error, -200);
            },

            errorPlacement: function (error, element) {
                if (element.is(':checkbox')) {
                    error.insertAfter(element.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline"));
                } else if (element.is(':radio')) {
                    error.insertAfter(element.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline"));
                } else {
                    error.insertAfter(element);
                }
            },

            highlight: function (element) {
                $(element)
                    .closest('.form-group').addClass('has-error');
            },

            unhighlight: function (element) {
                $(element)
                    .closest('.form-group').removeClass('has-error');
            },

            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error');
            },

            submitHandler: function (form) {

                st_success.show();
                st_error.hide();
                App.blockUI({
                    target: formId,
                    boxed: true,
                    message: 'Vui lòng chờ đợi. Đang xử lý dữ liệu...'

                });

                $.post(url,
         		   $(formId).find("input,textarea,select,hidden").not("#_VIEWSTATE,#_EVENTVALIDATION").serialize(),
                      function (data) {
                          App.unblockUI(formId);
                          if (data.Error == true)
                          {
                              setTimeout(data.Func, 1);
                          } else
                          {
                              egovutil.MessageToast(data.Type, data.Title, data.Message);
                              setTimeout(cb, 1);
                          }
                          
                      });
            }
        });
    },
    ajaxCallUrl:function(url,callback)
    {
        $.overlay.show();
        $.post(encodeURI(url), function (data) {
            $.overlay.hide();
            if (callback != "")
                setTimeout(callback, 1);
           
            return data;
        });

    }
    ,
    dlgConfirmAction:function(title,message,url,cb)
    {
        
       var dlg= bootbox.confirm({
            size:"small",
            title: title,
            message: message,
            animate: false,
            buttons: {
                    confirm: {
                        label: '<i class="ace-icon fa fa-trash-o bigger-120 orange"></i> Có',
                        className: 'btn btn-white btn-warning btn-bold'
                       
                    },
                    cancel: {
                        label: '<i class="ace-icon fa fa-times red2"></i> Không',
                        className: 'btn btn-white btn-default btn-round'
                }
            }
           , callback: function (result) {
               if (result) {

                   App.blockUI({
                       target: "#egov-body-main",
                       boxed: true,
                       message: 'Đang xử lý dữ liệu...'

                   });

                   $.post(encodeURI(url), function (data) {
                       App.unblockUI("#egov-body-main");
                       setTimeout(cb, 1);
                       egovutil.MessageToast(data.Type, data.Title, data.Message);
                   });
                  
               }
           }
           
             
       });
       
       //dlg.find(".modal-dialog").attr("style", "width:400px");
       dlg.find(".modal-header").attr("class", "modal-header btn-warning");
        //dialog.find(".modal-dialog").attr("style", "width:" + width + "px");
       
    },dlgMessage:function(title,message,cb)
    {
        var dlgAlert = bootbox.alert({
            title:title,
            message: message,

            animate: false,
            buttons: {
                ok: {
                    label: '<i class="ace-icon fa fa-check"></i> Đóng',
                    className: 'btn btn-white btn-default btn-round'
                }
            },
            callback: function (result) {
                window.setTimeout(cb, 1);
            },
            onEscape: function () {
                window.setTimeout(cb, 1);
            }
                
            
        });
       
        dlgAlert.find(".modal-header").attr("class", "modal-header btn-success");
    },
    dlgProcess:function(title,url,cb)
    {
        var dlgPro = bootbox.dialog({
            title: title,
            message: '<p><i class="fa fa-spin fa-spinner"></i> Đang xử lý dữ liệu...</p>',
            animate: false,
            buttons: {
                cancel: {
                    label: '<i class="ace-icon fa fa-check"></i>Đóng',
                    className: 'btn-white btn-default btn-round',
                    callback: function () {
                        window.setTimeout(cb, 1);
                    }
                }
            },
            onEscape: function () {
                window.setTimeout(cb, 1);
            }

        });
        dlgPro.find(".modal-header").attr("class", "modal-header btn-success");
       // dlgPro.find(".modal-dialog").attr("style", "width:400px");
        dlgPro.find(".modal-header").attr("style", "display:none");
        dlgPro.find(".modal-footer").attr("style", "display:none");

        dlgPro.init(function () {


            $.post(encodeURI(url), function (data) {
                dlgPro.find('.bootbox-body').html(data.Message);
                dlgPro.find(".modal-header").attr("style", "");
                dlgPro.find(".modal-footer").attr("style", "");
            });

        });
    },
    createUploadFile: function (idFile, urlInit,fcDefile) {
        $("#"+idFile).html("<input id='" + idFile + "_file' class='file' name='fileUpload[]' type='file' "
                                     + $("#" + idFile).attr("type-file")
                                     + " class='file-loading'/>"
                                     + " <input type='hidden' name='" + idFile + "attach' id='" + idFile + "attach'/>");
        $("#" + idFile + "_file").fileinput({
            showCaption:false,
            browseIcon: '<i class="fa fa-paperclip"></i>&nbsp;',
            browseClass: "btn btn-lg btn-flat",
            uploadClass: "btn btn-lg btn-success",
            uploadUrl: "/uploadfile/sendfile/1", // server upload action
            browseLabel: $("#" + idFile).attr("caption-browse"),
            uploadAsync: false,

            allowedFileExtensions: ["jpg", "jpeg", "gif", "bmp", "png", "tif", "flv", "mp3", "mp4", "avi", "wmv", "asx", "wma",
                                    "flac", "zip", "rar", "7z", "doc", "docx", "xls", "xlsx", "xml", "pdf", "psd", "ppt", "pptx", "txt"
            ],
            minFileCount: 1,
            maxFileCount: 20,
            showRemove: false,
            showUpload: false,
            browseOnZoneClick: true,
            previewFileIcon: '<i class="fa fa-file"></i>',
            allowedPreviewTypes: null,
            deleteUrl: "/uploadfile/deletefile",
            overwriteInitial: false,
            //maxFileSize: 100,
            initialCaption: "Chọn file đính kèm",
            initialPreviewAsData: true,
            //initialPreviewFileType: "html",
            layoutTemplates: { actionDrag: '', actionZoom: '' },
            preferIconicPreview: true, // this will force thumbnails to display icons for following file extensions
            previewFileIconSettings: { // configure your icon file extensions
                'doc': '<i class="fa fa-file-word-o text-primary"></i>',
                'xls': '<i class="fa fa-file-excel-o text-success"></i>',
                'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
                'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
                'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
                'htm': '<i class="fa fa-file-code-o text-info"></i>',
                'txt': '<i class="fa fa-file-text-o text-info"></i>',
                'mov': '<i class="fa fa-file-movie-o text-warning"></i>',
                'mp3': '<i class="fa fa-file-audio-o text-warning"></i>',
                // note for these file types below no extension determination logic 
                // has been configured (the keys itself will be used as extensions)
                'jpg': '<i class="fa fa-file-photo-o text-danger"></i>',
                'gif': '<i class="fa fa-file-photo-o text-muted"></i>',
                'png': '<i class="fa fa-file-photo-o text-primary"></i>'
            },
            previewFileExtSettings: { // configure the logic for determining icon file extensions
                'doc': function (ext) {
                    return ext.match(/(doc|docx)$/i);
                },
                'xls': function (ext) {
                    return ext.match(/(xls|xlsx)$/i);
                },
                'ppt': function (ext) {
                    return ext.match(/(ppt|pptx)$/i);
                },
                'zip': function (ext) {
                    return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
                },
                'htm': function (ext) {
                    return ext.match(/(htm|html)$/i);
                },
                'txt': function (ext) {
                    return ext.match(/(txt|ini|csv|java|php|js|css)$/i);
                },
                'mov': function (ext) {
                    return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
                },
                'mp3': function (ext) {
                    return ext.match(/(mp3|wav)$/i);
                },
            }





        }).on('filepredelete', function (event, data) {
            var abort = true;
            event.preventDefault();
            if (confirm("Bạn muốn xóa tập tin này?"))
                abort = false;
            return abort;

        }).on('filebatchuploadsuccess', function (event, data) {

            var fileExtra = $("#" + idFile + "attach").val() == "" ? [] : $.parseJSON($("#" + idFile + "attach").val());
            fileExtra.push(data.response.initialPreviewConfig);
            $("#" + idFile + "attach").val(JSON.stringify(fileExtra).replace("[[", "[").replace("]]", "]").replace("},[{", "},{"));

           
           

        }).on('filedeleted', function (event, key) {

            if ($("#" + idFile + "attach").val() != "") {
                var fileExtra = $.parseJSON($("#" + idFile + "attach").val());
                $.each(fileExtra, function (ide, extra) {
                    if (extra.key == key);
                    {
                        fileExtra.splice(0, 1);
                        return false;
                    }

                });
                $("#" + idFile + "attach").val(JSON.stringify(fileExtra).replace("[]", ""));
            }
            if(fcDefile!="")
            setTimeout(fcDefile+"('"+key+"')",1);
            
            






        }).on('filebatchselected', function (event, files) {
            $("#" + idFile + "_file").fileinput('upload');
        });
        $.post(encodeURI(urlInit), function (data) {
            $("#" + idFile + "_file").fileinput("refresh", {
                overwriteInitial: false,
                initialPreview: data.initialPreview,
                initialPreviewAsData: true,
                //initialPreviewFileType: 'image',
                //preferIconicPreview: true,
                initialPreviewConfig: data.initialPreviewConfig

            });
        });
    }
    ,
    chartDisplay: function (idChart, containerChart, typeChart, wChart, hChart, caption, subCaption, nameX, nameY, prefix, urlJson, idPdf, idPng, fc) {
        $.post(encodeURI(urlJson), function (data) {


            FusionCharts.ready(function () {
                idChart = new FusionCharts({
                    type: typeChart,
                    renderAt: containerChart,
                    width: "100%",
                    height: "300",
                    dataFormat: 'json',
                    dataSource: {
                        chart: {
                            caption: caption,
                            captionFontSize: 20,
                            captionFontColor: '#e4a025',
                            xAxisNameFontSize: 16,
                            xAxisNameFontColor: '#e4a025',
                            yAxisNameFontSize: 16,
                            yAxisNameFontColor: '#e4a025',
                            subCaption: subCaption,
                            xAxisName: nameX,
                            yAxisName: nameY,
                            numberPrefix: prefix,
                            formatNumberScale: 0,
                            startingAngle: 310,
                            showLegend: 1,
                            showLabels: 1,
                            paletteColors: '#2ab4c0,#ff0000,#dd4b39,#F3E813,#F3AC13',
                            // Enable export
                            exportEnabled: 1,
                            // Hide export menu item
                            exportShowMenuItem: 0,
                            theme: "fint"
                        },
                        data: data

                    },
                    events: {
                        dataPlotClick: function (eventObj, dataObj) {
                            setTimeout(fc + "(" + dataObj['index'] + ")", 1);


                        },
                        renderComplete: function (e, a) {
                            // Cross-browser event listening
                            var addListener = function (elem, evt, fn) {
                                if (elem && elem.addEventListener) {
                                    elem.addEventListener(evt, fn);
                                } else if (elem && elem.attachEvent) {
                                    elem.attachEvent("on" + evt, fn);
                                } else { elem["on" + evt] = fn; }
                            };


                            // Export chart method
                            var exportFC = function () {
                                var types = { idPdf: pdf, idPng: png };
                                if (e && e.sender && e.sender.exportChart) {
                                    e.sender.exportChart({
                                        exportFileName: "alsc_export",
                                        exportFormat: types[this.id]
                                    });
                                }
                            };


                            // Attach events
                            addListener(document.getElementById(idPdf), "click", exportFC);
                            addListener(document.getElementById(idPng), "click", exportFC);
                        }
                    }
                }); idChart.render();
            });
        });
    }
    ,
    chartMulti: function (idChart, containerChart, typeChart, wChart, hChart, caption, subCaption, nameX, nameY, prefix, urlJson, idPdf, idPng, fc) {
        //App.blockUI({
        //    target: idChart,
        //    boxed: true,
        //    message: 'Đang tải danh sách...'

        //});
        $.post(encodeURI(urlJson), function (data) {

            FusionCharts.ready(function () {
                idChart = new FusionCharts({
                    type: 'stackedColumn3DLine',
                    renderAt: containerChart,
                    width: "100%",
                    height: "700",
                    dataFormat: 'json',
                    dataSource: {
                        chart: {
                            caption: caption,
                            captionFontSize: 20,
                            captionFontColor: '#e4a025',
                            xAxisNameFontSize: 20,
                            xAxisNameFontColor: '#e4a025',
                            yAxisNameFontSize: 16,
                            yAxisNameFontColor: '#e4a025',
                            subCaption: subCaption,
                            xAxisName: nameX,
                            yAxisName: nameY,
                            numberPrefix: prefix,
                            formatNumberScale: 0,
                            startingAngle: 310,
                            showLegend: 1,
                            showLabels: 1,
                            paletteColors: '#00c0ef,#00a65a,#dd4b39,#F3E813,#F3AC13,#66ffff',
                            // Enable export
                            exportEnabled: 1,
                            // Hide export menu item
                            exportShowMenuItem: 0,
                            theme: "fint"
                        },

                        "categories": [
                            {
                                "category": data.category
                            }
                        ],
                        "dataset": data.dataset

                    },
                    events: {
                        dataPlotClick: function (eventObj, dataObj) {
                            setTimeout(fc + "(" + dataObj['index'] + ")", 1);


                        },
                        renderComplete: function (e, a) {
                            // Cross-browser event listening
                            var addListener = function (elem, evt, fn) {
                                if (elem && elem.addEventListener) {
                                    elem.addEventListener(evt, fn);
                                } else if (elem && elem.attachEvent) {
                                    elem.attachEvent("on" + evt, fn);
                                } else { elem["on" + evt] = fn; }
                            };


                            // Export chart method
                            var exportFC = function () {
                                var types = { idPdf: pdf, idPng: png };
                                if (e && e.sender && e.sender.exportChart) {
                                    e.sender.exportChart({
                                        exportFileName: "alsc_export",
                                        exportFormat: types[this.id]
                                    });
                                }
                            };


                            // Attach events
                            addListener(document.getElementById(idPdf), "click", exportFC);
                            addListener(document.getElementById(idPng), "click", exportFC);
                        }
                    }
                }); idChart.render();
                App.unblockUI(idChart);
            });
          
        });
        //App.unblockUI(idChart);
    }
    ,
    createAvatar:function(idFile,fileAvatar)
    {
        var pathImage = fileAvatar == "" ? "/files/avatar/user.png" : fileAvatar;
        $("#"+idFile).html("<input id='" + idFile + "_file' class='file' name='"+idFile+"_file[]' type='file' "
                                    
                                    + " class='file-loading'/>"
                                    + " <input type='hidden' name='" + idFile + "attach' id='" + idFile + "attach'/>");

        $("#" + idFile + "_file").fileinput({
            overwriteInitial: true,
            maxFileSize: 1500,
            showClose: false,
            showCaption: false,
            showBrowse: false,
            browseOnZoneClick: true,
            uploadUrl: "/uploadfile/avatarfile/2", // server upload action
            minFileCount: 1,
            maxFileCount: 1,
            uploadAsyn: true,
            removeLabel: '',
            deleteUrl: "/uploadfile/deletefile",
            allowedFileExtensions: ["jpg", "jpeg", "gif", "bmp", "png", "tif", "pdf"],
            showRemove: false,
            showUpload: false,
            removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
            removeTitle: 'Cancel or reset changes',
            elErrorContainer: '#kv-avatar-errors-2',
            msgErrorClass: 'alert alert-block alert-danger',
            initialPreviewAsData: true,
            initialPreviewFileType: 'image',
            fileActionSettings: { showUpload: false },
            defaultPreviewContent: '<img src="' + pathImage + '" alt="Your Avatar" style="width:100%"><h6 class="font-blue">Click chọn ảnh</h6>',
            layoutTemplates: { actionDrag: '', actionZoom: '' },
            allowedFileExtensions: ["jpg", "png", "gif"]
        }).on('filebatchselected', function (event, files) {
            $("#" + idFile + "_file").fileinput('upload');
        })
           .on('fileuploaded', function (event, data) {

               var fileExtra = $("#" + idFile + "attach").val() == "" ? [] : $.parseJSON($("#" + idFile + "attach").val());
               fileExtra.push(data.response.initialPreviewConfig);
               $("#" + idFile + "attach").val(JSON.stringify(fileExtra).replace("[[", "[").replace("]]", "]").replace("},[{", "},{"));




           });
    },CreateCalendar:function(id,url,urlAdd,currentDate,func,fdrop,fresize,fset,fcus,fadd,sel,edit)
    {
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: currentDate, lang: 'en', buttonIcons: true, weekNumbers: true, editable: true, eventLimit: true, timeFormat: 'H(:mm)',
            buttonText: {
                today: 'Hôm nay',
                month: 'Tháng',
                week: 'Tuần',
                day: 'Ngày',
                prev: 'Lùi',
                next: 'Tiếp'
            },
            monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
            monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư','Thứ năm', 'Thứ sáu', 'Thứ bảy'],
            dayNamesShort: ['CN', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
            viewRender: function (view, element) {
                if (url != "") {                    
                    $.overlay.show();
                    $.post(encodeURI(url + "&c_date=" + $(id).fullCalendar('getDate').format('DD/MM/YYYY')), function (data) {

                        $.overlay.hide();
                        if(fset!="")
                        setTimeout(fset + "(" + $(id).fullCalendar('getDate').format('MM') + ","+ $(id).fullCalendar('getDate').format('YYYY') +")",1);
                        $(id).fullCalendar('removeEvents');
                        $(id).fullCalendar('addEventSource', data);
                    });
                }
            }, 
            eventRender: function (event, element) {
               
                element.find(".fc-content").attr("data-id",event.id);
            },
            eventResizeStart: function (event, jsEvent, ui, view) {

                //alert(event.end);
            },
            eventResizeStop: function (event, jsEvent, ui, view) {
              
            },
            eventResize: function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
                // console.log('RESIZE!! ' + event.title);
                if (fresize != "")
                    setTimeout(fresize + "(" + event.id + ",'" + event.end.format('DD/MM/YYYY') + "')");
               

            },
            eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                if (fdrop != "")
                    setTimeout(fdrop + "(" + event.id + ",'" + event.start.format('DD/MM/YYYY') + "')");
                //alert(event.start.format('L') +' - '+event.end+' - '+allDay);
                
            }, selectable: sel,
            selectHelper: true,
            select: function (start, end) {

                if (fadd != "")
                    setTimeout(fadd + "('" + start.format('DD/MM/YYYY') + "','" + end.format('DD/MM/YYYY') + "')", 1);
            },
            editable: edit,
            droppable: true, 
            drop: function (date, allDay) { 
                var originalEventObject = $(this).data('eventObject');             
                var copiedEventObject = $.extend({}, originalEventObject);               
                copiedEventObject.start = date;                
                copiedEventObject.allDay = allDay;
                copiedEventObject.backgroundColor = $(this).css("background-color");
                copiedEventObject.borderColor = $(this).css("border-color");
                $.overlay.show();
                $.post(encodeURI(urlAdd + $(this).attr("data-id") + "?stdate=" + date.format('DD/MM/YYYY') + "&endate=" + date.format('DD/MM/YYYY')), function (data) {
                    $.overlay.hide();
                    if (data.Error)
                    {
                        copiedEventObject.id = data.Id;
                        if(fcus!="")
                        copiedEventObject.url = fcus+"("+id+")";
                        if (func != "")
                            setTimeout(func + "(" + $(this).attr("data-id") + ")", 1);
                        $(id).fullCalendar('renderEvent', copiedEventObject, true);
                    }
                    
                    
                });

               
               
              
                

            }
        });
    },
    CreateTableSort:function(id,odf,chide,sf)
    {
        $(id).dataTable({
            "oLanguage": {
                "sSearch": "Tìm kiếm: ",
                'sZeroRecords': 'Không tìm thấy bản ghi nào!'
            },
            "order": odf,
            "bPaginate": false,
            "bFilter": sf,
            "bInfo": false,
            "columnDefs": chide

        });
    }
}