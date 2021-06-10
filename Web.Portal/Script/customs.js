{
    //========================
    $(['requiredif', 'regularexpressionif', 'rangeif']).each(function (index, validationName) {
        $.validator.addMethod(validationName,
            function (value, element, parameters) {
                // Get the name prefix for the target control, depending on the validated control name
                ;
                var prefix = "";
                var lastDot = element.name.lastIndexOf('.');
                if (lastDot != -1) {
                    prefix = element.name.substring(0, lastDot + 1).replace('.', '_');
                }
                var id = '#' + prefix + parameters['dependentproperty'];
                // get the target value
                var targetvalue = parameters['targetvalue'];
                targetvalue = (targetvalue == null ? '' : targetvalue).toString();
                // get the actual value of the target control
                var control = $(id);
                var actualvalue = control.val();
                //if (control.length == 0 && prefix.length > 0) {
                //    // Target control not found, try without the prefix
                //    control = $('#' + parameters['dependentproperty']);
                //}
                //if (control.length > 0) {
                //var controltype = control.attr('type');
                //var actualvalue = "";
                //switch (controltype) {
                //    case 'checkbox':
                //        actualvalue = control.attr('checked').toString(); break;
                //    case 'select':
                //        actualvalue = $('option:selected', control).text(); break;
                //    default:
                //        actualvalue = control.val(); break;
                //}
                // if the condition is true, reuse the existing validator functionality
                if (actualvalue != undefined && actualvalue != null && actualvalue != "") {
                    if (targetvalue.toLowerCase() === actualvalue.toLowerCase()) {
                        var rule = parameters['rule'];
                        var ruleparam = parameters['ruleparam'];
                        return $.validator.methods[rule].call(this, value, element, ruleparam);
                    }
                }

                //}
                return true;
            }
        );
        //$.validator.sapo_addMethod(validationName,
        //       function (value, element, parameters) {
        //           // Get the name prefix for the target control, depending on the validated control name
        //           ;
        //           var prefix = "";
        //           var lastDot = element.name.lastIndexOf('.');
        //           if (lastDot != -1) {
        //               prefix = element.name.substring(0, lastDot + 1).replace('.', '_');
        //           }
        //           var id = '#' + prefix + parameters['dependentproperty'];
        //           // get the target value
        //           var targetvalue = parameters['targetvalue'];
        //           targetvalue = (targetvalue == null ? '' : targetvalue).toString();
        //           // get the actual value of the target control
        //           var control = $(id);
        //           var actualvalue = control.val();
        //           //if (control.length == 0 && prefix.length > 0) {
        //           //    // Target control not found, try without the prefix
        //           //    control = $('#' + parameters['dependentproperty']);
        //           //}
        //           //if (control.length > 0) {
        //           //var controltype = control.attr('type');
        //           //var actualvalue = "";
        //           //switch (controltype) {
        //           //    case 'checkbox':
        //           //        actualvalue = control.attr('checked').toString(); break;
        //           //    case 'select':
        //           //        actualvalue = $('option:selected', control).text(); break;
        //           //    default:
        //           //        actualvalue = control.val(); break;
        //           //}
        //           // if the condition is true, reuse the existing validator functionality
        //           if (actualvalue != undefined && actualvalue != null && actualvalue != "") {
        //               if (targetvalue.toLowerCase() === actualvalue.toLowerCase()) {
        //                   var rule = parameters['rule'];
        //                   var ruleparam = parameters['ruleparam'];
        //                   return $.validator.methods[rule].call(this, value, element, ruleparam);
        //               }
        //           }

        //           //}
        //           return true;
        //       }
        //   );
        //$.validator.unobtrusive.adapters.add(validationName, ['dependentproperty', 'targetvalue', 'rule', 'ruleparam'], function (options) {
        //    var rp = options.params['ruleparam'];
        //    options.rules[validationName] = {
        //        dependentproperty: options.params['dependentproperty'],
        //        targetvalue: options.params['targetvalue'],
        //        rule: options.params['rule']
        //    };
        //    if (rp) {
        //        options.rules[validationName].ruleparam = rp.charAt(0) == '[' ? eval(rp) : rp;
        //    }
        //    options.messages[validationName] = options.message;
        //});
    });
    //========================
    // =======================================
    // Global Functions
    // =======================================   
    //Hàm format string như C# sử dụng "Test format {0}".format("abc")

    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                ;
            });
        };
    }
    function formatStringNumber() {

        //$(".number").keydown(function (event) {
        //    if (event.keyCode == 189 || event.keyCode == 69)
        //        event.preventDefault();
        //});
    }

    function validateForm() {
        var $form = $(".modal-dialog").find("form");
        if ($form.length != 0) {
            $form.data("validator", null);

            $.validator.unobtrusive.parse(document);
            if ($form.data("unobtrusiveValidation")) {
                $form.validate($form.data("unobtrusiveValidation").options);
            }
        }
    }
    function SearchSelectLocation(selector) {
        if ($(selector).length > 0) {
            $(selector).select2({
                width: 'resolve',
            });
            var styledropdown = $(selector).attr("styledropdown");
            var styleinput = $(selector).attr("styleinput");
            var style = $(selector).attr("style");
            $(selector).parent().find(".select2-container--default .select2-selection--single").attr("style", styleinput)
            $(selector).on('select2:open', function () {
                $(".select2-results").attr("style", styledropdown)
            });
        }
    }
    function SelectLocation(that) {
        if ($(".DropdownLocation").length > 0) {

            $.ajax({
                url: "/admin/Ajax/GetLocationPermissions",
                type: "POST",
                data: {},
                dataType: "json",
                success: function (result) {
                    $(".DropdownLocation").empty();
                    for (var j = 0; j < $(".DropdownLocation").length; j++) {
                        item = $(".DropdownLocation").get(j);
                        var html = '';
                        if ($(item).attr("totallocation") == "total") {
                            if ($(item).attr("select-value") != null && $(item).attr("select-value") == "0") {
                                html += '<option selected fillter="Tất cả" value="0">Tất cả</option>';
                            }
                            else
                                html += '<option fillter="Tất cả" value="0">Tất cả</option>';
                        }
                        for (var i = 0; i < result.length; i++) {
                            if ($(item).attr("select-value") != null && $(item).attr("select-value") == result[i].id) {
                                html += '<option selected fillter="' + result[i].label + ' ' + result[i].code + '" value="' + result[i].id + '">' + result[i].label + '</option>';
                            }
                            else
                                html += '<option fillter="' + result[i].label + ' ' + result[i].code + '" value="' + result[i].id + '">' + result[i].label + '</option>';
                        }

                        var classinput = "";
                        if ($(item).attr("classlocation") != undefined) {
                            classinput = $(item).attr("classlocation")
                        }
                        var styleinput = "";
                        if ($(item).attr("stylelocation") != undefined) {
                            styleinput = $(item).attr("stylelocation");
                        }
                        var classdropdown = "";
                        if ($(item).attr("classdropdownlocation") != undefined) {
                            classdropdown = $(item).attr("classdropdownlocation");
                        }
                        var styledropdown = "";
                        if ($(item).attr("styledropdownlocation") != undefined) {
                            styledropdown = $(item).attr("styledropdownlocation");
                        }
                        var placeholderdropdown = "";
                        if ($(item).attr("placeholderdropdownlocation") != undefined) {
                            placeholderdropdown = $(item).attr("placeholderdropdownlocation");
                        }
                        var selectvalue = "";
                        if ($(".DropdownLocation").length == 1) {
                            $(item).append('<select datatype="dropdown" searchdropdown="search" bind="location_id" name="LocationId" id="location_id" placeholder="' + placeholderdropdown + '">' +
                                html +
                                '</select>');
                            if ($(item).attr("bindlocation") != undefined) {
                                $("#location_id").attr("bind", $(item).attr("bindlocation"));
                            }
                            if ($(item).attr("namelocation") != undefined) {
                                $("#location_id").attr("name", $(item).attr("namelocation"));
                            }
                            if ($(item).attr("bind_event_changelocation") != undefined) {
                                $("#location_id").attr("bind-event-change", $(item).attr("bind_event_changelocation"));
                            }
                            $("#location_id").addClass(classinput);
                            $("#location_id").attr("style", styleinput);
                            $("#location_id").attr("classdropdown", classdropdown);
                            $("#location_id").attr("styledropdown", styledropdown);
                            datadropdownItemN($("#location_id"));
                        }
                        else {
                            $(item).append('<select datatype="dropdown" searchdropdown="search" bind="location_id" name="LocationId" id="location_id' + j + '" placeholder="' + placeholderdropdown + '">' +
                                html +
                                '</select>');
                            if ($(item).attr("bindlocation") != undefined) {
                                $("#location_id" + j).attr("bind", $(item).attr("bindlocation"));
                            }
                            if ($(item).attr("namelocation") != undefined) {
                                $("#location_id" + j).attr("name", $(item).attr("namelocation"));
                            }
                            if ($(item).attr("bind_event_changelocation") != undefined) {
                                $("#location_id" + j).attr("bind-event-change", $(item).attr("bind_event_changelocation"));
                            }
                            $("#location_id" + j).addClass(classinput);
                            $("#location_id" + j).attr("style", styleinput);
                            $("#location_id" + j).attr("classdropdown", classdropdown);
                            $("#location_id" + j).attr("styledropdown", styledropdown);
                            datadropdownItemN($("#location_id" + j));
                        }

                        Bindings.bind(item);

                    }

                },
                error: function (data) {
                    if (data.status == 403) {
                        NProgress.done();

                        Sapo.Utility.handleForbiddenRequest(false); return;
                    }
                    NProgress.done();
                    var your_object = JSON.parse(data.responseText);
                    Sapo.Flash.error(your_object.error.replace(/\n/g, '; ').replace(/; $/, ''));

                }
            });
        }

        if ($(".DropdownLocationAll").length > 0) {

            $.ajax({
                url: "/admin/Ajax/GetLocationAll",
                type: "POST",
                data: {},
                dataType: "json",
                success: function (result) {
                    $(".DropdownLocationAll").empty();
                    for (var j = 0; j < $(".DropdownLocationAll").length; j++) {
                        item = $(".DropdownLocationAll").get(j);
                        var html = '';
                        if ($(item).attr("totallocation") == "total") {
                            if ($(item).attr("select-value") != null && $(item).attr("select-value") == "0") {
                                html += '<option selected fillter="Tất cả" value="0">Tất cả</option>';
                            }
                            else
                                html += '<option fillter="Tất cả" value="0">Tất cả</option>';
                        }
                        for (var i = 0; i < result.length; i++) {
                            if ($(item).attr("select-value") != null && $(item).attr("select-value") == result[i].id) {
                                html += '<option selected fillter="' + result[i].label + ' ' + result[i].code + '" value="' + result[i].id + '">' + result[i].label + '</option>';
                            }
                            else
                                html += '<option fillter="' + result[i].label + ' ' + result[i].code + '" value="' + result[i].id + '">' + result[i].label + '</option>';
                        }

                        var classinput = "";
                        if ($(item).attr("classlocation") != undefined) {
                            classinput = $(item).attr("classlocation")
                        }
                        var styleinput = "";
                        if ($(item).attr("stylelocation") != undefined) {
                            styleinput = $(item).attr("stylelocation");
                        }
                        var classdropdown = "";
                        if ($(item).attr("classdropdownlocation") != undefined) {
                            classdropdown = $(item).attr("classdropdownlocation");
                        }
                        var styledropdown = "";
                        if ($(item).attr("styledropdownlocation") != undefined) {
                            styledropdown = $(item).attr("styledropdownlocation");
                        }
                        var placeholderdropdown = "";
                        if ($(item).attr("placeholderdropdownlocation") != undefined) {
                            placeholderdropdown = $(item).attr("placeholderdropdownlocation");
                        }
                        var selectvalue = "";
                        if ($(".DropdownLocationAll").length == 1) {
                            $(item).append('<select datatype="dropdown" searchdropdown="search" bind="location_id" name="LocationId" id="location_all" placeholder="' + placeholderdropdown + '">' +
                                html +
                                '</select>');
                            if ($(item).attr("bindlocation") != undefined) {
                                $("#location_all").attr("bind", $(item).attr("bindlocation"));
                            }
                            if ($(item).attr("namelocation") != undefined) {
                                $("#location_all").attr("name", $(item).attr("namelocation"));
                            }
                            if ($(item).attr("bind_event_changelocation") != undefined) {
                                $("#location_all").attr("bind-event-change", $(item).attr("bind_event_changelocation"));
                            }
                            $("#location_all").addClass(classinput);
                            $("#location_all").attr("style", styleinput);
                            $("#location_all").attr("classdropdown", classdropdown);
                            $("#location_all").attr("styledropdown", styledropdown);
                            datadropdownItemN($("#location_all"));
                        }
                        else {
                            $(item).append('<select datatype="dropdown" searchdropdown="search" bind="location_id" name="LocationId" id="location_all' + j + '" placeholder="' + placeholderdropdown + '">' +
                                html +
                                '</select>');
                            if ($(item).attr("bindlocation") != undefined) {
                                $("#location_all" + j).attr("bind", $(item).attr("bindlocation"));
                            }
                            if ($(item).attr("namelocation") != undefined) {
                                $("#location_all" + j).attr("name", $(item).attr("namelocation"));
                            }
                            if ($(item).attr("bind_event_changelocation") != undefined) {
                                $("#location_all" + j).attr("bind-event-change", $(item).attr("bind_event_changelocation"));
                            }
                            $("#location_all" + j).addClass(classinput);
                            $("#location_all" + j).attr("style", styleinput);
                            $("#location_all" + j).attr("classdropdown", classdropdown);
                            $("#location_all" + j).attr("styledropdown", styledropdown);
                            datadropdownItemN($("#location_all" + j));
                        }

                        Bindings.bind(item);

                    }

                },
                error: function (data) {
                    if (data.status == 403) {
                        NProgress.done();

                        Sapo.Utility.handleForbiddenRequest(false); return;
                    }
                    NProgress.done();
                    var your_object = JSON.parse(data.responseText);
                    Sapo.Flash.error(your_object.error.replace(/\n/g, '; ').replace(/; $/, ''));

                }
            });
        }

    }
    function ChangeTextFilter(text) {
        text = text.toLowerCase();
        text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        text = text.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        text = text.replace(/đ/g, "d");
        return text;
    }
    function NotifyExport(messages) {
        var navDrawer = Twine.context($('body').get(0)).navDrawer;
        navDrawer.showEmptyPopup.show();
        var messagesemail = messages.split("emai: ")
        $("#ui-dialog-title-empty").html("Thông báo");
        var html = '<div style="text-align:left;">' +
            '<div style="font-weight: 500;">Thông tin:</div>' +
            '<div style="padding: 10px 0px;">- ' + messagesemail[0] + 'email: ' + '<span style="color: #0088FF;">' + messagesemail[1] + '</span>' + '</div>' +
            '<div style="font-style: italic;"><i class="fa fa-exclamation-triangle" aria-hidden="true" style="color: red;"></i> Chú ý: Link download dữ liệu trong email chỉ có hiệu lực trong 7 ngày kể từ ngày xuất file.</div>' +
            '</div>';
        $("#modal-body-empty").html(html);
    }
    function StandardOption(opt1, opt2, opt3) {
        var defaultValue = ["Mặc định", "Kích thước"];
        for (var i = 0; i < defaultValue.length; i++) {
            if (defaultValue[i] == opt1)
                if (opt2 == null || opt2 == "")
                    if (opt3 == null || opt3 == "")
                        opt1 = "";

        }
        return opt1;
    }
    function loadPageLimit(urlLoad, thiz) {
        $("input[name='limit']").val($(thiz).val())
        var url = urlLoad + '?' + $("#frmFilter").serialize();
        console.log(url)
        Sapo.Utility.loadAjax(url, "#load-view-right-content", function () {
        });
    }
    //Dropdown
    dropdown()
    function dropdown() {
        $("ul.dropdown-menu[data-type='dropdown']").each(function (index, item) {
            var val = $(item).attr("select-value");
            var name = "";
            $(item).find("a").each(function (indexa, a) {
                var selectname = $(a).attr("select-name")
                var selectvalue = $(a).attr("select-value")
                if (selectvalue == val) {
                    name = selectname
                    $(item).parent().find("span[select-type='name']").html(name)
                    $(item).parent().find("span[select-type='name']").attr("title", name)
                    $(item).parent().find("span[select-type='name']").append('<svg class="next-icon"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select-chevron"></use> </svg>')
                    $(a).addClass("selected")
                }
                $(a).on("click", function () {
                    var inputname = $(item).parent().find("span[select-type='name']")
                    var inputvalue = $(item).parent().find("input[select-type='value']")
                    $(inputname).html(selectname)
                    $(inputname).attr("title", selectname)
                    $(inputname).append('<svg class="next-icon"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select-chevron"></use> </svg>')
                    $(inputvalue).val(selectvalue)
                    $(inputvalue).change();
                    $(item).find("a").each(function (indexi, i) {
                        $(i).removeClass("selected");
                    })
                    $(a).addClass("selected");
                })
            })
        });
    }
    function evenDropdown(item) {
        var val = $(item).attr("select-value")
        var name = "";
        $(item).find("a").each(function (indexa, a) {
            var selectname = $(a).attr("select-name")
            var selectvalue = $(a).attr("select-value")
            if (selectvalue === val) {
                name = selectname
                $(item).parent().find("span[select-type='name']").html(name)
                $(item).parent().find("span[select-type='name']").attr("title", name)
                $(item).parent().find("span[select-type='name']").append('<svg class="next-icon"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select-chevron"></use> </svg>')
                $(a).addClass("selected")
            }
            $(a).on("click", function () {
                var inputname = $(item).parent().find("span[select-type='name']")
                var inputvalue = $(item).parent().find("input[select-type='value']")
                $(inputname).html(selectname)
                $(inputname).attr("title", selectname)
                $(inputname).append('<svg class="next-icon"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select-chevron"></use> </svg>')
                $(inputvalue).val(selectvalue)
                $(inputvalue).change();
                $(item).find("a").each(function (indexi, i) {
                    $(i).removeClass("selected");
                })
                $(a).addClass("selected");
            })
        })

    }

    //datadropdown()
    function datadropdown() {
        $("select[datatype='dropdown']").each(function (index, item) {
            datadropdownItemN(item)
        })
    }
    function datadropdownItem(item) {
        datadropdownItemN(item)
    }
    function datadropdownN(selector) {
        if (selector != undefined) {
            $(selector).find("select[datatype='dropdown']").each(function (index, item) {
                datadropdownItemN(item)
            })
        }
        else {
            $("select[datatype='dropdown']").each(function (index, item) {
                datadropdownItemN(item)
            })
        }
    }
    function datadropdownItemN(item) {
        $(item).show();
        var classinput = "";
        if ($(item).attr("class") != undefined) {
            classinput = $(item).attr("class")
        }
        var styleinput = "";
        if ($(item).attr("style") != undefined) {
            styleinput = $(item).attr("style");
        }
        var classdropdown = "";
        if ($(item).attr("classdropdown") != undefined) {
            classdropdown = $(item).attr("classdropdown");
        }
        var styledropdown = "";
        if ($(item).attr("styledropdown") != undefined) {
            styledropdown = $(item).attr("styledropdown");
        }
        var placeholderdropdown = "";
        if ($(item).attr("placeholderdropdown") != undefined) {
            placeholderdropdown = $(item).attr("placeholderdropdown");
        }

        var valdropdown = $(item).val();
        if ($(item).attr("select-value") != null) {
            $(item).val($(item).attr("select-value"));
        }

        if ($(item).parent().find('span[select-type="name"]').length > 0) {
            $(item).parent().find('span[select-type="name"]').remove()
            if ($(item).attr("searchdropdown") != undefined) {
                $(item).parent().append("<input class='form-control input-dropdown' select-type='name' data-toggle='dropdown' placeholder='" + placeholderdropdown + "' >")
            }
            else {
                $(item).parent().append("<span class='form-control input-dropdown' select-type='name' data-toggle='dropdown' placeholder='" + placeholderdropdown + "' readonly>" +
                    "<svg class='next-icon'> <use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#select-chevron'></use></svg></span >")
            }

        }
        else {
            if ($(item).attr("searchdropdown") != undefined) {
                $(item).parent().append("<input class='form-control input-dropdown' select-type='name' data-toggle='dropdown' placeholder='" + placeholderdropdown + "' >")
            }
            else {
                $(item).parent().append("<span class='form-control input-dropdown' select-type='name' data-toggle='dropdown' placeholder='" + placeholderdropdown + "' readonly>" +
                    "<svg class='next-icon'> <use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#select-chevron'></use></svg></span >")
            }

        }
        if ($(item).parent().find('ul[data-type="dropdown"]').length > 0) {
            $(item).parent().find('ul[data-type="dropdown"]').remove()
            $(item).parent().append("<ul class='dropdown-menu' select-value='" + valdropdown + "' data-type='dropdown'></ul>")
        }
        else {
            $(item).parent().append("<ul class='dropdown-menu' select-value='" + valdropdown + "' data-type='dropdown'></ul>")
        }

        var input = $(item).parent().find("span.input-dropdown")
        var ul = $(item).parent().find("ul.dropdown-menu[data-type='dropdown']")
        $(input).addClass(classinput);
        $(input).attr("style", styleinput);
        $(input).removeClass('hide');
        $(ul).addClass(classdropdown);
        $(ul).attr("style", styledropdown);
        $(item).find("option").each(function (indexOp, option) {
            var value = $(option).attr("value");
            var name = $(option).html();
            var fillter = $(option).attr("fillter");
            $(ul).append(
                '<li>' +
                '<a select-fillter="' + fillter + '" select-value="' + value + '" select-name="' + name + '">' +
                '<span>' + name + '</span>' +
                '</a>' +
                '</li>'
            )
        })
        evenDropdownN(ul, item)
        if ($(item).attr("searchdropdown") == "search") {
            $(item).parent().find("input.input-dropdown").on("blur", function () {
                setTimeout(function () {
                    var inputname = $(ul).parent().find("input[select-type='name']")
                    $(inputname).val($(ul).find("a.selected").attr("select-name"))
                    $(ul).find("a").each(function (indexa, a) {
                        $(a).parent().removeClass("hidden");
                    });
                }, 200)
            });
            $(item).parent().find("input.input-dropdown").on("keyup", function () {
                $(ul).find("a").each(function (indexa, a) {
                    if ($(item).attr("searchdropdown") == undefined || ($(a).attr("select-name") != null ? ChangeTextFilter($(a).attr("select-name")).indexOf(ChangeTextFilter($(item).parent().find("input.input-dropdown").val())) : 0) >= 0 || ($(a).attr("select-fillter") != null ? ChangeTextFilter($(a).attr("select-fillter")).indexOf(ChangeTextFilter($(item).parent().find("input.input-dropdown").val())) : 0) >= 0) {
                        $(a).parent().removeClass("hidden");
                    }
                    else {
                        $(a).parent().addClass("hidden");
                    }
                });
            });

        }
        $(item).hide();
    }
    function evenDropdownN(ul, item) {
        var name = "";
        val = $(item).val()
        if ($(item).is('[select-value]')) {
            val = $(item).attr("select-value");
        }

        $(ul).find("a").each(function (indexa, a) {

            var selectname = $(a).attr("select-name")
            var selectvalue = $(a).attr("select-value")
            if (selectvalue === val) {
                name = selectname
                $(ul).parent().find("span[select-type='name']").html(name)
                $(ul).parent().find("span[select-type='name']").attr("title", name)
                $(ul).parent().find("span[select-type='name']").append('<svg class="next-icon"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select-chevron"></use> </svg>')
                $(a).addClass("selected")
            }
            $(a).on("click", function () {
                var inputname = $(ul).parent().find("span[select-type='name']")
                if (selectvalue != "cancerdropdown") {
                    $(inputname).html(selectname)
                    $(inputname).attr("title", selectname)
                    $(inputname).append('<svg class="next-icon"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select-chevron"></use> </svg>')
                    $(item).val(selectvalue)

                    $(ul).find("a").each(function (indexi, i) {
                        $(i).removeClass("selected");
                    })
                    $(a).addClass("selected");
                }
                $(item).change();
            })
        })

    }
    function refreshDropdown(item) {
        var name = "";
        var val = $(item).val()
        var ul = $(item).parent().find("ul.dropdown-menu[data-type='dropdown']")
        var a = $(ul).find("a[select-value='" + val + "']")
        var selectname = $(a).attr("select-name")
        var selectvalue = $(a).attr("select-value")
        $(a).addClass("selected")
        var inputname = $(ul).parent().find("span[select-type='name']")
        $(inputname).html(selectname)
        $(inputname).attr("title", selectname)
        $(inputname).append('<svg class="next-icon"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select-chevron"></use> </svg>')
        $(item).val(selectvalue)
        $(ul).find("a").each(function (indexi, i) {
            $(i).removeClass("selected");
        })
        $(a).addClass("selected");
        $(item).change();
    }
    function tooltip(object) {
        object.hover(function (event) {
            $(this).tooltip("show");
        }, function () {
            $(this).tooltip('destroy')
        });
    }

    function hideModalPopUp(url) {
        $(document).mouseup(function (e) {
            var container = $('#sapo-modal').find('div.modal-content');
            var autocomplete = $('.ui-autocomplete');
            var datepicker = $('.datepicker');
            var datetimepicker = $('.xdsoft_datetimepicker');
            var popover = $('.popover');
            var colAction = $('.colAction');

            url = container.attr("url");
            if ((!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) && (!autocomplete.is(e.target) // if the target of the click isn't the container...
                    && autocomplete.has(e.target).length === 0) && (!popover.is(e.target) // if the target of the click isn't the container...
                        && popover.has(e.target).length === 0) && (!datepicker.is(e.target) // if the target of the click isn't the container...
                            && datepicker.has(e.target).length === 0) && (!colAction.is(e.target) // if the target of the click isn't the container...
                                && colAction.has(e.target).length === 0) && (!datetimepicker.is(e.target) // if the target of the click isn't the container...
                                    && datetimepicker.has(e.target).length === 0)) // ... nor a descendant of the container
            {

                Sapo.Modal.hide();
                if (url != null && url != "")
                    Sapo.Utility.changeUrl(url);
            }
        });
    }
    function surrogateCtor() { }

    function extend(base, sub, methods) {
        surrogateCtor.prototype = base.prototype;
        sub.prototype = new surrogateCtor();
        sub.prototype.constructor = sub;
        // Add a reference to the parent's prototype
        sub.base = base.prototype;

        // Copy the methods passed in to the prototype
        for (var name in methods) {
            sub.prototype[name] = methods[name];
        }
        // so we can define the constructor inline
        return sub;
    }

    function autoCompleteAccount(cb) {
        var that = this;

        if ($(".search-account").length > 0) {
            var count = 0;
            var page = 2;
            var total = 0;
            var checkLoad = false;
            $(".search-account").autocomplete({
                appendTo: "#search-result-holder-account",
                delay: 500,
                source: function (request, response) {
                    count = 0;
                    page = 2;
                    total = 0;
                    $.ajax({
                        url: Sapo.routes.orders + "/SearchAccount",
                        data: { query: $(".search-account").val() },
                        dataType: "json",
                        type: "GET",
                        success: function (data) {
                            if (data.metadata != null && data.metadata.total != null) {
                                total = data.metadata.total
                                //$("#Note").html('' + total + '')
                            }
                            if (data.accounts != null) {
                                count = data.accounts.length
                            }
                            var array = [];
                            if (data.accounts == null || data.accounts.length == 0 || data.error) {
                                array.push({
                                    label: "",
                                    value: "Không tìm thấy nhân viên.",
                                    account: null
                                });
                            }
                            else {
                                for (var i = 0; i < data.accounts.length; i++) {
                                    var m = data.accounts[i];
                                    array.push({
                                        value: m.full_name == null ? " --- " : m.full_name,
                                        label: m.email == null ? " --- " : m.email,
                                        account: m
                                    });
                                }
                            }
                            response(array);
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                NProgress.done();

                                Sapo.Utility.handleForbiddenRequest(false);
                                return;
                            }
                        },
                        complete: function (data) {
                            checkLoad = true
                        }
                    });
                    $("#search-result-holder-account .ui-autocomplete").scroll(function () {
                        if (count < total) {
                            var heightItem = $("#search-result-holder-account .ui-menu-item").height()
                            var heightdocument = count * heightItem + count;
                            var heightwindown = $("#search-result-holder-account .ui-autocomplete").height();
                            var scroll = $("#search-result-holder-account .ui-autocomplete ").scrollTop();


                            if ((heightdocument - heightwindown - scroll) < 30 && checkLoad) {
                                checkLoad = false
                                var query = $(".search-account").val()
                                requestAjaxProduct = $.ajax({
                                    url: Sapo.routes.orders + "/SearchAccount",
                                    data: { query: query, page: page },
                                    dataType: "json",
                                    type: "GET",
                                    success: function (data) {
                                        page++;
                                        var array = [];
                                        if (data.accounts == null || data.accounts.length == 0 || data.error) {
                                            array.push({
                                                label: "",
                                                value: "Không tìm thấy nhân viên.",
                                                account: null
                                            });
                                        }
                                        else {
                                            for (var i = 0; i < data.accounts.length; i++) {
                                                var m = data.accounts[i];
                                                array.push({
                                                    value: m.full_name == null ? " --- " : m.full_name,
                                                    label: m.email == null ? " --- " : m.email,
                                                    account: m
                                                });
                                            }
                                        }
                                        for (var i = 0; i < array.length; i++) {
                                            count++
                                            item = array[i];
                                            $("#search-result-holder-account .ui-autocomplete").append("<li id='itemAccount" + count + "' style='float:left;width:100%;list-style: none;font-size: 13px;border-bottom: 1px #dcdee2 solid;'  class='ui-menu-item' role='menuitem'></li>")

                                            $("#itemAccount" + count + "").data("item.autocomplete", item).html(
                                                '<a href="javascript:void(0)" tabindex="-1" class="">' +
                                                '<div class="fl w100 text-overflow-hiden search-customer-div">' + item.value + '</div>' +
                                                '<div class="fl w100 text-overflow-hiden search-customer-div" style="padding-bottom:4px">' + item.label + '</div>' +
                                                '</a>')
                                            $("#itemAccount" + count + "").click(function (event, ui) {
                                                var itemAccount = this;

                                                that.setAccount($(itemAccount).data("item.autocomplete").account)
                                                $('.search-account').autocomplete('close');
                                                //Bindings.refreshImmediately();
                                            })
                                        }
                                    },
                                    error: function (data) {
                                        if (data.status == 403) {
                                            NProgress.done();

                                            Sapo.Utility.handleForbiddenRequest(false);
                                            return;
                                        }
                                    },
                                    complete: function (data) {
                                        checkLoad = true
                                    }
                                });

                            }
                        }

                    });
                },
                minLength: 0,
                open: function () {
                    $("#search-result-holder-account .ui-autocomplete").css({ "max-width": "350px", "max-height": "345px", "margin-top": "2px !important", "z-index": "10" });
                },
                close: function () {

                },
                focus: function (event, ui) {
                },
                create: function (event, ui) {
                },
                select: function (event, ui) {
                    cb(ui.item.account);
                }
            }).focus(function (event, ui) {
                event.preventDefault();
                $(this).autocomplete("search");
            }).data('autocomplete')._renderItem = function (ul, item) {
                if (item.create != undefined) {
                    return $("<li style='float:left;width:100%;list-style: none;    border-bottom: 1px #dcdee2 solid;font-size: 13px;'></li>")
                        .data("item.autocomplete", item)
                        .appendTo(ul);
                }
                else {
                    var a = $("<li style='float:left;width:100%;list-style: none;    font-size: 13px;    border-bottom: 1px #dcdee2 solid;'></li>")
                        .data("item.autocomplete", item);
                    return $("<li style='float:left;width:100%;list-style: none;     font-size: 13px;   border-bottom: 1px #dcdee2 solid;'></li>")
                        .data("item.autocomplete", item)
                        .append(
                            '<a href="javascript:void(0)" tabindex="-1" class="">' +
                            '<div class="fl w100 text-overflow-hiden search-customer-div">' + item.value + '</div>' +
                            '<div class="fl w100 text-overflow-hiden search-customer-div" style="padding-bottom:4px">' + item.label + '</div>' +
                            '</a>'
                        )
                        .appendTo(ul);
                }
            };
        }

        // END - AUTOCOMPLETE
    }
    function setAccount(account) {
        var that = this;
        that.assignee_id = account.id;
        that.assignee_name = account.full_name;
        $(".search-account").val(that.assignee_name)
        Bindings.refreshImmediately();
    }
    function loadAssigneeName() {
        var that = this;
        $(".search-account").val(that.assignee_name);
    }

    // =======================================
    // Sapo JS API v0.0.1
    // =======================================
    (function () {
        // ---------------------------------------------------------------------------------
        // Sapo Js Api - Global Resources
        //
        // This is place for all Sapo js api global resources like: functions, variables, configs,...
        // ---------------------------------------------------------------------------------

        window.Sapo || (window.Sapo = {});
        Sapo.DEFAULT_OPTION_NAME = "Title";
        Sapo.DEFAULT_OPTION_VALUE = "Default Title";
        Sapo.DEFAULT_OPTION_NAMES = ["Kích thước", "Màu sắc", "Chất liệu", "Kiểu dáng", "Title"];
        Sapo.LOADING = "<i class='fa fa-lg fa-spinner fa-pulse'></i>";
        Sapo.config = {
            theme_extension: "bwt"
        };

        Sapo.image = {
            head: "https://sapo.dktcdn.net",
            headThumb: "https://sapo.dktcdn.net/thumb",
            pico: "pico",
            //= 16x16
            icon: "/icon/",
            //= 32x32
            thumb: "/thumb/",
            //= 50x50
            small: "/small/",
            //= 100x100
            compact: "/compact/",
            //= 160x160
            medium: "/medium/",
            //= 240x240
            large: "/large/",
            //= 480x480
            grande: "/grande/",
            //= 600x600
            bigSize: "/1024x1024/",
            //= 1024x1024
            fullSize: "/2048x2048/",
            //= 2048x2048
        }
        Sapo.routes = {
            root: "/admin",
            dashboard: "/admin",
            orders: "/admin/orders",
            purchase_orders: "/admin/purchase_orders",
            products: "/admin/products",
            tenants: "admin/tenants",
            currencies: "/admin/settings/currencies",
            accounts: "/admin/settings/accounts",
            stock_transfers: "/admin/stock_transfers",
            stock_adjustments: "/admin/stock_adjustments",
            payment_terms: "/admin/settings/payment_terms",
            return_orders: "/admin/orders/returns",
            purchase_order_orders: "/admin/purchase_orders/returns",
            tenant_roles: "/admin/settings/tenant_roles",
            payment_methods: "/admin/settings/payment_methods",
            tax_types: "/admin/settings/tax_types",
            price_adjustments: "/admin/price_adjustments",
            price_lists: "/admin/settings/price_lists",
            loyalty_cards: "/admin/advanced/loyalty_cards",
            loyalty_customers: "/admin/advanced/loyalty_customers",
            loyalty_adjustments: "/admin/advanced/loyalty_adjustments",
            loyalty_settings: "/admin/advanced/loyalties/settings",
            shipments: "/admin/shipments",
            shippers: "/admin/shippers",
            order_sources: "/admin/settings/order_sources",
            profiles: "/admin/settings/profiles",
            locations: "/admin/settings/locations",
            receipt_vouchers: "/admin/receipt_vouchers",
            payment_vouchers: "/admin/payment_vouchers",
            setting: {
                checkout: "/admin/settings/checkout",
                shipping: "/admin/settings/shipping",
                notifications: "/admin/settings/notifications",
            },
            apps: "/admin/apps",
            collections: "/admin/collections",
            channels: "/admin/channels",
            customers: "/admin/customers",
            suppliers: "/admin/suppliers",
            comments: "/admin/comments",
            blogs: "/admin/blogs",
            notifications: "/admin/notifications",
            sale_offs: "/admin/advanced/sale_offs",
            statuses: "/admin/settings/order_process_statuses",
            file_missions: "/admin/settings/file_missions"
        };

        _urlMappings = {
            "collection": "/admin/collections/SingleDropdown",
            "product": "/admin/products/SingleDropdown",
            "page": "/admin/pages/SingleDropdown",
            "blog": "/admin/blogs/SingleDropdown",
            "customer": "/admin/customers/singledropdown"
        };

        _urlSuggestMappings = {
            "collection": "/admin/collections/SingleSuggest",
            "product": "/admin/products/SingleSuggest",
            "page": "/admin/pages/SingleSuggest",
            "blog": "/admin/blogs/SingleSuggest",
            "customer": "/admin/customers/singlesuggest"
        };

        _urlMultipleMappings = {
            "collection": "/admin/collections/Dropdown?type=custom&",
            "product": "/admin/products/Dropdown?"
        };

        _urlMultipleSuggestMappings = {
            "collection": "/admin/collections/Suggest?type=custom&",
            "product": "/admin/products/Suggest?"
        };
        Sapo.popover = function (object) {
            var time;
            object.mouseenter(function () {
                $(this).popover('show');
                if ($(".popover").length > 0) {
                    Bindings.unbind($(".popover").get(0));
                    Bindings.bind($(".popover").get(0));
                    Bindings.refreshImmediately();
                }

                //money();
            });
            object.click(function () {
                $(this).popover('show');
            });
            $(document).on('mousedown', '.fa-arrow-circle-right', function () {
                object.popover('destroy');
            });
            $(document).on('mouseleave', '.popover', function () {
                object.popover('destroy');
            });
            object.mouseout(function () {
                time = setTimeout(function () { object.popover('destroy') }, 500);
            });
            $(document).on('mouseenter', '.popover', function () {
                clearTimeout(time);
            });
        };
        Sapo.popoverOnClick = function (object) {

            var that = this;
            object.popover('show');
            Bindings.unbind($(".popover").get(0), this);
            Bindings.bind($(".popover").get(0), this);

            $(document).mouseup(function (e) {
                var container = $('.popover');
                var datepicker = $('.datepicker');
                var datetimepicker = $('.xdsoft_datetimepicker');
                var sapoModalContainer = $("#sapo-modal-container")
                if ((!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0)
                    && (!datepicker.is(e.target) // if the target of the click isn't the container...
                        && datepicker.has(e.target).length === 0) && (!datetimepicker.is(e.target) // if the target of the click isn't the container...
                            && datetimepicker.has(e.target).length === 0)
                    && sapoModalContainer.length > 0
                    && sapoModalContainer.html().trim() == "") // ... nor a descendant of the container
                {


                    $("div.popover-on-click-add").popover('destroy');
                    $("div.popover-on-click-add").remove();
                    var editOrder = Bindings.context(document.body).editOrder;
                    if (editOrder) {

                        editOrder.editOrder.payment = null;
                        editOrder.editOrder.refund = null;
                        Bindings.refreshImmediately();
                        Bindings.unbind($("#load-view-right-content").get(0), editOrder);
                        Bindings.bind($("#load-view-right-content").get(0), editOrder);


                        //editOrder.initializeSortable();
                        $("div.payment-content-one").css({ "display": "block" });
                    }
                    //Bindings.unbind($(".order-menu-screen__right-scoll_payment-content").get(0), this);
                    //Bindings.bind($(".order-menu-screen__right-scoll_payment-content").get(0), this);
                }
            })
        };
        Sapo.hideModalPopUp = function (url) {
            $(document).mouseup(function (e) {

                var container = $('#sapo-modal').find('div.modal-content');
                var autocomplete = $('.ui-autocomplete');
                var popover = $('.popover');
                url = container.attr("url");
                if ((!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) && (!autocomplete.is(e.target) // if the target of the click isn't the container...
                        && autocomplete.has(e.target).length === 0) && (!popover.is(e.target) // if the target of the click isn't the container...
                            && popover.has(e.target).length === 0)) // ... nor a descendant of the container
                {
                    Sapo.Modal.hide();
                    $("#sapo-modal").modal('hide');
                    $("#sapo-modal").empty();


                    if (url != null && url != "")
                        Sapo.Utility.changeUrl(url);
                }
            });
        }
        Sapo.loadTableAndScrollBar = function () {

            $('.boder-table').css({ "padding-top": $(".header-common-right").height() - 1 });
            $('#parent-variant').fixedHeaderTable({

                create: function () {
                    $('#parent-variant').css({ "width": "100%" });
                    var colLeftWidth = 0;
                    if ($(".colLeft").css("display") == "none") {
                        colLeftWidth = 0;
                    }
                    else {
                        colLeftWidth = $('#left-nav').width() + 20;
                    }
                    $('.fht-thead').css({
                        "border-top": "0px #ddd solid", "position": "fixed",
                        "z-index": "1000", "width": "calc(100% - " + colLeftWidth + "px)"
                    });
                    $(".fht-table-wrapper").height($(window).height() - $(".header-common-right").height() - $(".t-grid-pager-boder").height());

                    $(".fht-tbody").height($("table#defaul-table").height());
                    if ($(".fht-tbody").height() < 320) {
                        $(".fht-tbody").height(320);
                    }
                    tooltip($("table.defaul-table thead th"));
                    tooltip($("table.defaul-table tbody td span"));
                    $('.fht-tbody').css({
                        "margin-top": "38px"
                    });
                }
            });
            var scroll = document.querySelector.bind(document);

            Ps.initialize(scroll('.fht-table-wrapper'), {
                theme: 'big-and-ugly'
            });
            var that = this;

        }
        Sapo.setDatePicker = function () {

            $('[data-rel=datepicker]').datepicker({
                format: 'dd/mm/yyyy',
                autoclose: true,
                todayHighlight: true
            });
            $('i.glyphicon-calendar').on('click', function () {
                $(this).closest(".datepicker-input").find("input").focus();
            });
        }
        Sapo.forMatDatePicker = function (data) {

            var date = new Date(data);
            var month = 0;
            var day = 1;
            if (date.getMonth() < 9) {

                month = "0" + (date.getMonth() + 1);
            }
            else {
                month = (date.getMonth() + 1);

            }
            if (date.getDate() <= 9) {

                day = "0" + date.getDate();
            }
            else {
                day = date.getDate();

            }
            var hour = (date.getHours() < 10 ? '0' + (date.getHours()) : (date.getHours()));
            var minutes = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : (date.getMinutes()));
            var seconds = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : (date.getSeconds()));
            return (day + '/' + month + '/' + date.getFullYear()) + ' ' + hour + ":" + minutes + ":" + seconds;
        }
        Sapo.forMatStringToDate = function (selector) {
            var from = $(selector).val().split("-");
            return new Date(from[2], from[1] - 1, from[0]);
        }
        Date.prototype.addHours = function (h) {
            this.setHours(this.getHours() + h);
            return this;
        }
        Sapo.formatStrToStringDate = function (data) {
            var str1 = data.substr(0, 10);
            var array = str1.split("/");
            var str2 = data.substr(data.length - 8, 8);
            var str = array[2] + "-" + array[1] + "-" + array[0] + "T" + str2 + "Z";
            var stringDate = new Date(str).addHours(-7);
            var isoDate = new Date(stringDate).toISOString();
            return isoDate
        }
        Sapo.formatStrDDMMYYY = function (data) {
            var array = data.split("/");
            var str = array[2] + "-" + array[1] + "-" + array[0];
            var isoDate = new Date(str).toISOString();
            return isoDate
        }
        Sapo.formatDateISOToString = function (data) {
            var date = new Date(data);
            var month = 0;
            var day = 1;
            if (date.getMonth() < 9) {

                month = "0" + (date.getMonth() + 1);
            }
            else {
                month = (date.getMonth() + 1);

            }
            if (date.getDate() <= 9) {

                day = "0" + date.getDate();
            }
            else {
                day = date.getDate();

            }
            return (day + '/' + month + '/' + date.getFullYear());

        }
    }).call(this),
        (function () {
            var xhrQueue = [];

            $(document).ajaxSend(function (event, jqxhr, settings) {
                xhrQueue.push(jqxhr); //alert(settings.url);
            });

            $(document).ajaxComplete(function (event, jqxhr, settings) {
                var i;
                if ((i = $.inArray(jqxhr, xhrQueue)) > -1) {
                    xhrQueue.splice(i, 1); //alert("C:"+settings.url);
                }
            });

            Sapo.XhrManager = {
                abortAll: function () {
                    var i = 0;
                    while (xhrQueue.length) {
                        xhrQueue[i++].abort(); //alert(i+":"+xhrQueue[i++]);
                    }
                }
            }
        }).call(this),
    //function () {
    //    // ---------------------------------------------------------------------------------
    //    // Js Libs - Sapo Twine
    //    // ---------------------------------------------------------------------------------
    //    (function e(t, n, r) {
    //        function s(o, u) {
    //            if (!n[o]) {
    //                if (!t[o]) {
    //                    var a = typeof require == "function" && require;
    //                    if (!u && a) return a(o, !0);
    //                    if (i) return i(o, !0);
    //                    var f = new Error("Cannot find module '" + o + "'");
    //                    throw f.code = "MODULE_NOT_FOUND", f
    //                }
    //                var l = n[o] = { exports: {} };
    //                t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r)
    //            } return n[o].exports
    //        } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++) s(r[o]);
    //        return s
    //    })({
    //        1: [function (require, module, exports) {
    //            var attribute, bind, currentBindingCallbacks, elements, eventName, fireCustomChangeEvent, getContext, getValue, isKeypath, j, k, keypathForKey, keypathRegex, len, len1, nodeCount, preventDefaultForEvent, ref, ref1, refreshElement, refreshQueued, rootContext, rootNode, setValue, setupAttributeBinding, setupEventBinding, stringifyNodeAttributes, valueAttributeForNode, wrapFunctionString, slice = [].slice; window.Twine = {}; Twine.shouldDiscardEvent = {}; elements = {}; nodeCount = 0; rootContext = null; keypathRegex = /^[a-z]\w*(\.[a-z]\w*|\[\d+\])*$/i; refreshQueued = false; rootNode = null; currentBindingCallbacks = null; Twine.reset = function (newContext, node) { var bindings, j, key, len, obj, ref; if (node == null) { node = document.documentElement } for (key in elements) { if (bindings = (ref = elements[key]) != null ? ref.bindings : void 0) { for (j = 0, len = bindings.length; j < len; j++) { obj = bindings[j]; if (obj.teardown) { obj.teardown() } } } } elements = {}; rootContext = newContext; rootNode = node; rootNode.bindingId = nodeCount = 1; return this }; Twine.bind = function (node, context) { if (node == null) { node = rootNode } if (context == null) { context = Twine.context(node) } return bind(context, node, true) }; Twine.afterBound = function (callback) { if (currentBindingCallbacks) { return currentBindingCallbacks.push(callback) } else { return callback() } }; bind = function (context, node, forceSaveContext) { var binding, callback, callbacks, childNode, definition, element, fn, j, k, keypath, len, len1, newContextKey, ref, ref1, ref2, type; currentBindingCallbacks = []; if (node.bindingId) { Twine.unbind(node) } ref = Twine.bindingTypes; for (type in ref) { binding = ref[type]; if (!(definition = node.getAttribute(type))) { continue } if (!element) { element = { bindings: [] } } fn = binding(node, context, definition, element); if (fn) { element.bindings.push(fn) } } if (newContextKey = node.getAttribute("context")) { keypath = keypathForKey(newContextKey); if (keypath[0] === "$root") { context = rootContext; keypath = keypath.slice(1) } context = getValue(context, keypath) || setValue(context, keypath, {}) } if (element || newContextKey || forceSaveContext) { (element != null ? element : element = {}).childContext = context; elements[node.bindingId != null ? node.bindingId : node.bindingId = ++nodeCount] = element } callbacks = currentBindingCallbacks; ref1 = node.children || []; for (j = 0, len = ref1.length; j < len; j++) { childNode = ref1[j]; bind(context, childNode) } Twine.count = nodeCount; ref2 = callbacks || []; for (k = 0, len1 = ref2.length; k < len1; k++) { callback = ref2[k]; callback() } currentBindingCallbacks = null; return Twine }; Twine.refresh = function () { if (refreshQueued) { return } refreshQueued = true; return setTimeout(Twine.refreshImmediately, 0) }; refreshElement = function (element) { var j, len, obj, ref; if (element.bindings) { ref = element.bindings; for (j = 0, len = ref.length; j < len; j++) { obj = ref[j]; if (obj.refresh != null) { obj.refresh() } } } };
    //            Twine.refreshImmediately = function () { var element, key; refreshQueued = false; for (key in elements) { element = elements[key]; refreshElement(element) } }; Twine.change = function (node, bubble) { var event; if (bubble == null) { bubble = false } event = document.createEvent("HTMLEvents"); event.initEvent("change", bubble, true); return node.dispatchEvent(event) }; Twine.unbind = function (node) { var bindings, childNode, id, j, k, len, len1, obj, ref, ref1; if (id = node.bindingId) { if (bindings = (ref = elements[id]) != null ? ref.bindings : void 0) { for (j = 0, len = bindings.length; j < len; j++) { obj = bindings[j]; if (obj.teardown) { obj.teardown() } } } delete elements[id]; delete node.bindingId } ref1 = node.children || []; for (k = 0, len1 = ref1.length; k < len1; k++) { childNode = ref1[k]; Twine.unbind(childNode) } return this }; Twine.context = function (node) { return getContext(node, false) }; Twine.childContext = function (node) { return getContext(node, true) }; getContext = function (node, child) { var context, id, ref; while (node) { if (node === rootNode) { return rootContext } if (!child) { node = node.parentNode } if ((id = node.bindingId) && (context = (ref = elements[id]) != null ? ref.childContext : void 0)) { return context } if (child) { node = node.parentNode } } }; Twine.contextKey = function (node, lastContext) { var addKey, context, id, keys, ref; keys = []; addKey = function (context) { var key, val; for (key in context) { val = context[key]; if (!(lastContext === val)) { continue } keys.unshift(key); break } return lastContext = context }; while (node && node !== rootNode && (node = node.parentNode)) { if ((id = node.bindingId) && (context = (ref = elements[id]) != null ? ref.childContext : void 0)) { addKey(context) } } if (node === rootNode) { addKey(rootContext) } return keys.join(".") }; valueAttributeForNode = function (node) { var name, ref; name = node.nodeName.toLowerCase(); if (name === "input" || name === "textarea" || name === "select") { if ((ref = node.getAttribute("type")) === "checkbox" || ref === "radio") { return "checked" } else { return "value" } } else { return "textContent" } }; keypathForKey = function (key) { var end, j, keypath, len, ref, start; keypath = []; ref = key.split("."); for (j = 0, len = ref.length; j < len; j++) { key = ref[j]; if ((start = key.indexOf("[")) !== -1) { keypath.push(key.substr(0, start)); key = key.substr(start); while ((end = key.indexOf("]")) !== -1) { keypath.push(parseInt(key.substr(1, end), 10)); key = key.substr(end + 1) } } else { keypath.push(key) } } return keypath }; getValue = function (object, keypath) { var j, key, len; for (j = 0, len = keypath.length; j < len; j++) { key = keypath[j]; if (object != null) { object = object[key] } } return object }; setValue = function (object, keypath, value) { var j, k, key, lastKey, len, ref; ref = keypath, keypath = 2 <= ref.length ? slice.call(ref, 0, j = ref.length - 1) : (j = 0, []), lastKey = ref[j++]; for (k = 0, len = keypath.length; k < len; k++) { key = keypath[k]; object = object[key] != null ? object[key] : object[key] = {} } return object[lastKey] = value }; stringifyNodeAttributes = function (node) { var attr, i, nAttributes, result; nAttributes = node.attributes.length; i = 0; result = ""; while (i < nAttributes) { attr = node.attributes.item(i); result += attr.nodeName + "='" + attr.textContent + "'"; i += 1 } return result }; wrapFunctionString = function (code, args, node) { var e, keypath; if (isKeypath(code) && (keypath = keypathForKey(code))) { if (keypath[0] === "$root") { return function ($context, $root) { return getValue($root, keypath) } } else { return function ($context, $root) { return getValue($context, keypath) } } } else { try { return new Function(args, "with($context) { return " + code + " }") } catch (_error) { e = _error; throw "Twine error: Unable to create function on " + node.nodeName + " node with attributes " + stringifyNodeAttributes(node) } } }; isKeypath = function (value) { return value !== "true" && value !== "false" && value !== "null" && value !== "undefined" && keypathRegex.test(value) }; fireCustomChangeEvent = function (node) { var event; event = document.createEvent("CustomEvent"); event.initCustomEvent("bindings:change", true, false, {}); return node.dispatchEvent(event) }; Twine.bindingTypes = { bind: function (node, context, definition) { var changeHandler, checkedValueType, fn, keypath, lastValue, oldValue, refresh, refreshContext, teardown, twoWayBinding, value, valueAttribute; valueAttribute = valueAttributeForNode(node); value = node[valueAttribute]; lastValue = void 0; teardown = void 0; checkedValueType = node.getAttribute("type") === "radio"; fn = wrapFunctionString(definition, "$context,$root", node); refresh = function () { var newValue; newValue = fn.call(node, context, rootContext); if (newValue === lastValue) { return } lastValue = newValue; if (newValue === node[valueAttribute]) { return } node[valueAttribute] = checkedValueType ? newValue === node.value : newValue; return fireCustomChangeEvent(node) }; if (!isKeypath(definition)) { return { refresh: refresh } } refreshContext = function () { if (checkedValueType) { if (!node.checked) { return } return setValue(context, keypath, node.value) } else { return setValue(context, keypath, node[valueAttribute]) } }; keypath = keypathForKey(definition); twoWayBinding = valueAttribute !== "textContent" && node.type !== "hidden"; if (keypath[0] === "$root") { context = rootContext; keypath = keypath.slice(1) } if (value != null && (twoWayBinding || value !== "") && (oldValue = getValue(context, keypath)) == null) { refreshContext() } if (twoWayBinding) { changeHandler = function () { if (getValue(context, keypath) === this[valueAttribute]) { return } refreshContext(); return Twine.refreshImmediately() }; $(node).on("input keyup change", changeHandler); teardown = function () { return $(node).off("input keyup change", changeHandler) } } return { refresh: refresh, teardown: teardown } }, "bind-show": function (node, context, definition) { var fn, lastValue; fn = wrapFunctionString(definition, "$context,$root", node); lastValue = void 0; return { refresh: function () { var newValue; newValue = !fn.call(node, context, rootContext); if (newValue === lastValue) { return } return $(node).toggleClass("hide", lastValue = newValue) } } }, "bind-class": function (node, context, definition) { var fn, lastValue; fn = wrapFunctionString(definition, "$context,$root", node); lastValue = {}; return { refresh: function () { var key, newValue, value; newValue = fn.call(node, context, rootContext); for (key in newValue) { value = newValue[key]; if (!lastValue[key] !== !value) { $(node).toggleClass(key, !!value) } } return lastValue = newValue } } }, "bind-attribute": function (node, context, definition) { var fn, lastValue; fn = wrapFunctionString(definition, "$context,$root", node); lastValue = {}; return { refresh: function () { var key, newValue, value; newValue = fn.call(node, context, rootContext); for (key in newValue) { value = newValue[key]; if (lastValue[key] !== value) { $(node).attr(key, value || null) } } return lastValue = newValue } } }, define: function (node, context, definition) { var fn, key, object, value; fn = wrapFunctionString(definition, "$context,$root", node); object = fn.call(node, context, rootContext); for (key in object) { value = object[key]; context[key] = value } }, eval: function (node, context, definition) { var fn; fn = wrapFunctionString(definition, "$context,$root", node); fn.call(node, context, rootContext) } }; setupAttributeBinding = function (attributeName, bindingName) { var booleanAttribute; booleanAttribute = attributeName === "checked" || attributeName === "disabled" || attributeName === "readOnly"; return Twine.bindingTypes["bind-" + bindingName] = function (node, context, definition) { var fn, lastValue; fn = wrapFunctionString(definition, "$context,$root", node); lastValue = void 0; return { refresh: function () { var newValue; newValue = fn.call(node, context, rootContext); if (booleanAttribute) { newValue = !!newValue } if (newValue === lastValue) { return } node[attributeName] = lastValue = newValue; if (attributeName === "checked") { return fireCustomChangeEvent(node) } } } } }; ref = ["placeholder", "checked", "disabled", "href", "title", "readOnly", "src"]; for (j = 0, len = ref.length; j < len; j++) { attribute = ref[j]; setupAttributeBinding(attribute, attribute) } setupAttributeBinding("innerHTML", "unsafe-html"); preventDefaultForEvent = function (event) { return (event.type === "submit" || event.currentTarget.nodeName.toLowerCase() === "a") && event.currentTarget.getAttribute("allow-default") !== "1" }; setupEventBinding = function (eventName) { return Twine.bindingTypes["bind-event-" + eventName] = function (node, context, definition) { var onEventHandler; onEventHandler = function (event, data) { var base, discardEvent; discardEvent = typeof (base = Twine.shouldDiscardEvent)[eventName] === "function" ? base[eventName](event) : void 0; if (discardEvent || preventDefaultForEvent(event)) { event.preventDefault() } if (discardEvent) { return } wrapFunctionString(definition, "$context,$root,event,data", node).call(node, context, rootContext, event, data); return Twine.refreshImmediately() }; $(node).on(eventName, onEventHandler); return { teardown: function () { return $(node).off(eventName, onEventHandler) } } } }; ref1 = ["click", "dblclick", "mouseenter", "mouseleave", "mouseover", "mouseout", "mousedown", "mouseup", "submit", "dragenter", "dragleave", "dragover", "drop", "drag", "change", "keypress", "keydown", "keyup", "input", "error", "done", "success", "fail", "blur", "focus", "load"]; for (k = 0, len1 = ref1.length; k < len1; k++) { eventName = ref1[k]; setupEventBinding(eventName) }
    //        }, {}]
    //    }, {}, [1]);
    //}.call(this),
        function () {
            // ---------------------------------------------------------------------------------
            // Sapo Js API - URI.js v1.15.1 http://medialize.github.io/URI.js/
            //
            // build contains: IPv6.js, punycode.js, SecondLevelDomains.js, URI.js, URITemplate.js
            // ---------------------------------------------------------------------------------
            (function (f, n) { "object" === typeof exports ? module.exports = n() : "function" === typeof define && define.amd ? define(n) : f.IPv6 = n(f) })(this, function (f) {
                var n = f && f.IPv6; return {
                    best: function (g) {
                        g = g.toLowerCase().split(":"); var l = g.length, b = 8; "" === g[0] && "" === g[1] && "" === g[2] ? (g.shift(), g.shift()) : "" === g[0] && "" === g[1] ? g.shift() : "" === g[l - 1] && "" === g[l - 2] && g.pop(); l = g.length; -1 !== g[l - 1].indexOf(".") && (b = 7); var k; for (k = 0; k < l && "" !== g[k]; k++); if (k < b) for (g.splice(k, 1, "0000") ; g.length < b;) g.splice(k, 0, "0000"); for (k = 0; k < b; k++) {
                            for (var l =
                                g[k].split(""), f = 0; 3 > f; f++) if ("0" === l[0] && 1 < l.length) l.splice(0, 1); else break; g[k] = l.join("")
                        } var l = -1, n = f = 0, h = -1, u = !1; for (k = 0; k < b; k++) u ? "0" === g[k] ? n += 1 : (u = !1, n > f && (l = h, f = n)) : "0" === g[k] && (u = !0, h = k, n = 1); n > f && (l = h, f = n); 1 < f && g.splice(l, f, ""); l = g.length; b = ""; "" === g[0] && (b = ":"); for (k = 0; k < l; k++) { b += g[k]; if (k === l - 1) break; b += ":" } "" === g[l - 1] && (b += ":"); return b
                    }, noConflict: function () { f.IPv6 === this && (f.IPv6 = n); return this }
                }
            });
            (function (f) {
                function n(b) { throw RangeError(v[b]); } function g(b, e) { for (var h = b.length; h--;) b[h] = e(b[h]); return b } function l(b, h) { return g(b.split(e), h).join(".") } function b(b) { for (var e = [], h = 0, g = b.length, a, c; h < g;) a = b.charCodeAt(h++), 55296 <= a && 56319 >= a && h < g ? (c = b.charCodeAt(h++), 56320 == (c & 64512) ? e.push(((a & 1023) << 10) + (c & 1023) + 65536) : (e.push(a), h--)) : e.push(a); return e } function k(b) { return g(b, function (b) { var e = ""; 65535 < b && (b -= 65536, e += x(b >>> 10 & 1023 | 55296), b = 56320 | b & 1023); return e += x(b) }).join("") } function A(b,
                    e) { return b + 22 + 75 * (26 > b) - ((0 != e) << 5) } function w(b, e, h) { var g = 0; b = h ? q(b / 700) : b >> 1; for (b += q(b / e) ; 455 < b; g += 36) b = q(b / 35); return q(g + 36 * b / (b + 38)) } function h(b) {
                        var e = [], h = b.length, g, a = 0, c = 128, d = 72, m, z, y, f, l; m = b.lastIndexOf("-"); 0 > m && (m = 0); for (z = 0; z < m; ++z) 128 <= b.charCodeAt(z) && n("not-basic"), e.push(b.charCodeAt(z)); for (m = 0 < m ? m + 1 : 0; m < h;) {
                            z = a; g = 1; for (y = 36; ; y += 36) {
                                m >= h && n("invalid-input"); f = b.charCodeAt(m++); f = 10 > f - 48 ? f - 22 : 26 > f - 65 ? f - 65 : 26 > f - 97 ? f - 97 : 36; (36 <= f || f > q((2147483647 - a) / g)) && n("overflow"); a += f * g; l =
                                    y <= d ? 1 : y >= d + 26 ? 26 : y - d; if (f < l) break; f = 36 - l; g > q(2147483647 / f) && n("overflow"); g *= f
                            } g = e.length + 1; d = w(a - z, g, 0 == z); q(a / g) > 2147483647 - c && n("overflow"); c += q(a / g); a %= g; e.splice(a++, 0, c)
                        } return k(e)
                    } function u(e) {
                        var g, h, f, a, c, d, m, z, y, l = [], u, k, p; e = b(e); u = e.length; g = 128; h = 0; c = 72; for (d = 0; d < u; ++d) y = e[d], 128 > y && l.push(x(y)); for ((f = a = l.length) && l.push("-") ; f < u;) {
                            m = 2147483647; for (d = 0; d < u; ++d) y = e[d], y >= g && y < m && (m = y); k = f + 1; m - g > q((2147483647 - h) / k) && n("overflow"); h += (m - g) * k; g = m; for (d = 0; d < u; ++d) if (y = e[d], y < g && 2147483647 <
                                ++h && n("overflow"), y == g) { z = h; for (m = 36; ; m += 36) { y = m <= c ? 1 : m >= c + 26 ? 26 : m - c; if (z < y) break; p = z - y; z = 36 - y; l.push(x(A(y + p % z, 0))); z = q(p / z) } l.push(x(A(z, 0))); c = w(h, k, f == a); h = 0; ++f } ++h; ++g
                        } return l.join("")
                    } var D = "object" == typeof exports && exports, E = "object" == typeof module && module && module.exports == D && module, B = "object" == typeof global && global; if (B.global === B || B.window === B) f = B; var t, r = /^xn--/, p = /[^ -~]/, e = /\x2E|\u3002|\uFF0E|\uFF61/g, v = {
                        overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                        "invalid-input": "Invalid input"
                    }, q = Math.floor, x = String.fromCharCode, C; t = { version: "1.2.3", ucs2: { decode: b, encode: k }, decode: h, encode: u, toASCII: function (b) { return l(b, function (b) { return p.test(b) ? "xn--" + u(b) : b }) }, toUnicode: function (b) { return l(b, function (b) { return r.test(b) ? h(b.slice(4).toLowerCase()) : b }) } }; if ("function" == typeof define && "object" == typeof define.amd && define.amd) define(function () { return t }); else if (D && !D.nodeType) if (E) E.exports = t; else for (C in t) t.hasOwnProperty(C) && (D[C] = t[C]); else f.punycode =
                        t
            })(this);
            (function (f, n) { "object" === typeof exports ? module.exports = n() : "function" === typeof define && define.amd ? define(n) : f.SecondLevelDomains = n(f) })(this, function (f) {
                var n = f && f.SecondLevelDomains, g = {
                    list: {
                        ac: " com gov mil net org ", ae: " ac co gov mil name net org pro sch ", af: " com edu gov net org ", al: " com edu gov mil net org ", ao: " co ed gv it og pb ", ar: " com edu gob gov int mil net org tur ", at: " ac co gv or ", au: " asn com csiro edu gov id net org ", ba: " co com edu gov mil net org rs unbi unmo unsa untz unze ", bb: " biz co com edu gov info net org store tv ",
                        bh: " biz cc com edu gov info net org ", bn: " com edu gov net org ", bo: " com edu gob gov int mil net org tv ", br: " adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ", bs: " com edu gov net org ", bz: " du et om ov rg ", ca: " ab bc mb nb nf nl ns nt nu on pe qc sk yk ", ck: " biz co edu gen gov info net org ",
                        cn: " ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ", co: " com edu gov mil net nom org ", cr: " ac c co ed fi go or sa ", cy: " ac biz com ekloges gov ltd name net org parliament press pro tm ", "do": " art com edu gob gov mil net org sld web ", dz: " art asso com edu gov net org pol ", ec: " com edu fin gov info med mil net org pro ", eg: " com edu eun gov mil name net org sci ", er: " com edu gov ind mil net org rochest w ", es: " com edu gob nom org ",
                        et: " biz com edu gov info name net org ", fj: " ac biz com info mil name net org pro ", fk: " ac co gov net nom org ", fr: " asso com f gouv nom prd presse tm ", gg: " co net org ", gh: " com edu gov mil org ", gn: " ac com gov net org ", gr: " com edu gov mil net org ", gt: " com edu gob ind mil net org ", gu: " com edu gov net org ", hk: " com edu gov idv net org ", hu: " 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ",
                        id: " ac co go mil net or sch web ", il: " ac co gov idf k12 muni net org ", "in": " ac co edu ernet firm gen gov i ind mil net nic org res ", iq: " com edu gov i mil net org ", ir: " ac co dnssec gov i id net org sch ", it: " edu gov ", je: " co net org ", jo: " com edu gov mil name net org sch ", jp: " ac ad co ed go gr lg ne or ", ke: " ac co go info me mobi ne or sc ", kh: " com edu gov mil net org per ", ki: " biz com de edu gov info mob net org tel ", km: " asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ",
                        kn: " edu gov net org ", kr: " ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ", kw: " com edu gov net org ", ky: " com edu gov net org ", kz: " com edu gov mil net org ", lb: " com edu gov net org ", lk: " assn com edu gov grp hotel int ltd net ngo org sch soc web ", lr: " com edu gov net org ", lv: " asn com conf edu gov id mil net org ", ly: " com edu gov id med net org plc sch ", ma: " ac co gov m net org press ",
                        mc: " asso tm ", me: " ac co edu gov its net org priv ", mg: " com edu gov mil nom org prd tm ", mk: " com edu gov inf name net org pro ", ml: " com edu gov net org presse ", mn: " edu gov org ", mo: " com edu gov net org ", mt: " com edu gov net org ", mv: " aero biz com coop edu gov info int mil museum name net org pro ", mw: " ac co com coop edu gov int museum net org ", mx: " com edu gob net org ", my: " com edu gov mil name net org sch ", nf: " arts com firm info net other per rec store web ", ng: " biz com edu gov mil mobi name net org sch ",
                        ni: " ac co com edu gob mil net nom org ", np: " com edu gov mil net org ", nr: " biz com edu gov info net org ", om: " ac biz co com edu gov med mil museum net org pro sch ", pe: " com edu gob mil net nom org sld ", ph: " com edu gov i mil net ngo org ", pk: " biz com edu fam gob gok gon gop gos gov net org web ", pl: " art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ", pr: " ac biz com edu est gov info isla name net org pro prof ",
                        ps: " com edu gov net org plo sec ", pw: " belau co ed go ne or ", ro: " arts com firm info nom nt org rec store tm www ", rs: " ac co edu gov in org ", sb: " com edu gov net org ", sc: " com edu gov net org ", sh: " co com edu gov net nom org ", sl: " com edu gov net org ", st: " co com consulado edu embaixada gov mil net org principe saotome store ", sv: " com edu gob org red ", sz: " ac co org ", tr: " av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ", tt: " aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ",
                        tw: " club com ebiz edu game gov idv mil net org ", mu: " ac co com gov net or org ", mz: " ac co edu gov org ", na: " co com ", nz: " ac co cri geek gen govt health iwi maori mil net org parliament school ", pa: " abo ac com edu gob ing med net nom org sld ", pt: " com edu gov int net nome org publ ", py: " com edu gov mil net org ", qa: " com edu gov mil net org ", re: " asso com nom ", ru: " ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ",
                        rw: " ac co com edu gouv gov int mil net ", sa: " com edu gov med net org pub sch ", sd: " com edu gov info med net org tv ", se: " a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ", sg: " com edu gov idn net org per ", sn: " art com edu gouv org perso univ ", sy: " com edu gov mil net news org ", th: " ac co go in mi net or ", tj: " ac biz co com edu go gov info int mil name net nic org test web ", tn: " agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ",
                        tz: " ac co go ne or ", ua: " biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ", ug: " ac co go ne or org sc ", uk: " ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ",
                        us: " dni fed isa kids nsn ", uy: " com edu gub mil net org ", ve: " co com edu gob info mil net org web ", vi: " co com k12 net org ", vn: " ac biz com edu gov health info int name net org pro ", ye: " co com gov ltd me net org plc ", yu: " ac co edu gov org ", za: " ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ", zm: " ac co com edu gov net org sch "
                    }, has: function (f) {
                        var b = f.lastIndexOf("."); if (0 >= b || b >= f.length - 1) return !1;
                        var k = f.lastIndexOf(".", b - 1); if (0 >= k || k >= b - 1) return !1; var n = g.list[f.slice(b + 1)]; return n ? 0 <= n.indexOf(" " + f.slice(k + 1, b) + " ") : !1
                    }, is: function (f) { var b = f.lastIndexOf("."); if (0 >= b || b >= f.length - 1 || 0 <= f.lastIndexOf(".", b - 1)) return !1; var k = g.list[f.slice(b + 1)]; return k ? 0 <= k.indexOf(" " + f.slice(0, b) + " ") : !1 }, get: function (f) {
                        var b = f.lastIndexOf("."); if (0 >= b || b >= f.length - 1) return null; var k = f.lastIndexOf(".", b - 1); if (0 >= k || k >= b - 1) return null; var n = g.list[f.slice(b + 1)]; return !n || 0 > n.indexOf(" " + f.slice(k +
                            1, b) + " ") ? null : f.slice(k + 1)
                    }, noConflict: function () { f.SecondLevelDomains === this && (f.SecondLevelDomains = n); return this }
                }; return g
            });
            (function (f, n) { "object" === typeof exports ? module.exports = n(require("./punycode"), require("./IPv6"), require("./SecondLevelDomains")) : "function" === typeof define && define.amd ? define(["./punycode", "./IPv6", "./SecondLevelDomains"], n) : f.URI = n(f.punycode, f.IPv6, f.SecondLevelDomains, f) })(this, function (f, n, g, l) {
                function b(a, c) {
                    var d = 1 <= arguments.length, m = 2 <= arguments.length; if (!(this instanceof b)) return d ? m ? new b(a, c) : new b(a) : new b; if (void 0 === a) {
                        if (d) throw new TypeError("undefined is not a valid argument for URI");
                        a = "undefined" !== typeof location ? location.href + "" : ""
                    } this.href(a); return void 0 !== c ? this.absoluteTo(c) : this
                } function k(a) { return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") } function A(a) { return void 0 === a ? "Undefined" : String(Object.prototype.toString.call(a)).slice(8, -1) } function w(a) { return "Array" === A(a) } function h(a, c) {
                    var d = {}, b, e; if ("RegExp" === A(c)) d = null; else if (w(c)) for (b = 0, e = c.length; b < e; b++) d[c[b]] = !0; else d[c] = !0; b = 0; for (e = a.length; b < e; b++) if (d && void 0 !== d[a[b]] || !d && c.test(a[b])) a.splice(b,
                        1), e--, b--; return a
                } function u(a, c) { var d, b; if (w(c)) { d = 0; for (b = c.length; d < b; d++) if (!u(a, c[d])) return !1; return !0 } var e = A(c); d = 0; for (b = a.length; d < b; d++) if ("RegExp" === e) { if ("string" === typeof a[d] && a[d].match(c)) return !0 } else if (a[d] === c) return !0; return !1 } function D(a, c) { if (!w(a) || !w(c) || a.length !== c.length) return !1; a.sort(); c.sort(); for (var d = 0, b = a.length; d < b; d++) if (a[d] !== c[d]) return !1; return !0 } function E(a) { return escape(a) } function B(a) {
                    return encodeURIComponent(a).replace(/[!'()*]/g, E).replace(/\*/g,
                        "%2A")
                } function t(a) { return function (c, d) { if (void 0 === c) return this._parts[a] || ""; this._parts[a] = c || null; this.build(!d); return this } } function r(a, c) { return function (d, b) { if (void 0 === d) return this._parts[a] || ""; null !== d && (d += "", d.charAt(0) === c && (d = d.substring(1))); this._parts[a] = d; this.build(!b); return this } } var p = l && l.URI; b.version = "1.15.1"; var e = b.prototype, v = Object.prototype.hasOwnProperty; b._parts = function () {
                    return {
                        protocol: null, username: null, password: null, hostname: null, urn: null, port: null, path: null,
                        query: null, fragment: null, duplicateQueryParameters: b.duplicateQueryParameters, escapeQuerySpace: b.escapeQuerySpace
                    }
                }; b.duplicateQueryParameters = !1; b.escapeQuerySpace = !0; b.protocol_expression = /^[a-z][a-z0-9.+-]*$/i; b.idn_expression = /[^a-z0-9\.-]/i; b.punycode_expression = /(xn--)/i; b.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; b.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
                b.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig; b.findUri = { start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi, end: /[\s\r\n]|$/, trim: /[`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u201e\u2018\u2019]+$/ }; b.defaultPorts = { http: "80", https: "443", ftp: "21", gopher: "70", ws: "80", wss: "443" }; b.invalid_hostname_characters =
                    /[^a-zA-Z0-9\.-]/; b.domAttributes = { a: "href", blockquote: "cite", link: "href", base: "href", script: "src", form: "action", img: "src", area: "href", iframe: "src", embed: "src", source: "src", track: "src", input: "src", audio: "src", video: "src" }; b.getDomAttribute = function (a) { if (a && a.nodeName) { var c = a.nodeName.toLowerCase(); return "input" === c && "image" !== a.type ? void 0 : b.domAttributes[c] } }; b.encode = B; b.decode = decodeURIComponent; b.iso8859 = function () { b.encode = escape; b.decode = unescape }; b.unicode = function () {
                        b.encode = B; b.decode =
                            decodeURIComponent
                    }; b.characters = {
                        pathname: { encode: { expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig, map: { "%24": "$", "%26": "&", "%2B": "+", "%2C": ",", "%3B": ";", "%3D": "=", "%3A": ":", "%40": "@" } }, decode: { expression: /[\/\?#]/g, map: { "/": "%2F", "?": "%3F", "#": "%23" } } }, reserved: {
                            encode: {
                                expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig, map: {
                                    "%3A": ":", "%2F": "/", "%3F": "?", "%23": "#", "%5B": "[", "%5D": "]", "%40": "@", "%21": "!", "%24": "$", "%26": "&", "%27": "'", "%28": "(", "%29": ")", "%2A": "*", "%2B": "+", "%2C": ",",
                                    "%3B": ";", "%3D": "="
                                }
                            }
                        }, urnpath: { encode: { expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig, map: { "%21": "!", "%24": "$", "%27": "'", "%28": "(", "%29": ")", "%2A": "*", "%2B": "+", "%2C": ",", "%3B": ";", "%3D": "=", "%40": "@" } }, decode: { expression: /[\/\?#:]/g, map: { "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" } } }
                    }; b.encodeQuery = function (a, c) { var d = b.encode(a + ""); void 0 === c && (c = b.escapeQuerySpace); return c ? d.replace(/%20/g, "+") : d }; b.decodeQuery = function (a, c) {
                        a += ""; void 0 === c && (c = b.escapeQuerySpace); try {
                            return b.decode(c ? a.replace(/\+/g,
                                "%20") : a)
                        } catch (d) { return a }
                    }; var q = { encode: "encode", decode: "decode" }, x, C = function (a, c) { return function (d) { try { return b[c](d + "").replace(b.characters[a][c].expression, function (d) { return b.characters[a][c].map[d] }) } catch (m) { return d } } }; for (x in q) b[x + "PathSegment"] = C("pathname", q[x]), b[x + "UrnPathSegment"] = C("urnpath", q[x]); q = function (a, c, d) { return function (m) { var e; e = d ? function (a) { return b[c](b[d](a)) } : b[c]; m = (m + "").split(a); for (var f = 0, h = m.length; f < h; f++) m[f] = e(m[f]); return m.join(a) } }; b.decodePath =
                        q("/", "decodePathSegment"); b.decodeUrnPath = q(":", "decodeUrnPathSegment"); b.recodePath = q("/", "encodePathSegment", "decode"); b.recodeUrnPath = q(":", "encodeUrnPathSegment", "decode"); b.encodeReserved = C("reserved", "encode"); b.parse = function (a, c) {
                            var d; c || (c = {}); d = a.indexOf("#"); -1 < d && (c.fragment = a.substring(d + 1) || null, a = a.substring(0, d)); d = a.indexOf("?"); -1 < d && (c.query = a.substring(d + 1) || null, a = a.substring(0, d)); "//" === a.substring(0, 2) ? (c.protocol = null, a = a.substring(2), a = b.parseAuthority(a, c)) : (d = a.indexOf(":"),
                                -1 < d && (c.protocol = a.substring(0, d) || null, c.protocol && !c.protocol.match(b.protocol_expression) ? c.protocol = void 0 : "//" === a.substring(d + 1, d + 3) ? (a = a.substring(d + 3), a = b.parseAuthority(a, c)) : (a = a.substring(d + 1), c.urn = !0))); c.path = a; return c
                        }; b.parseHost = function (a, c) {
                            var d = a.indexOf("/"), b; -1 === d && (d = a.length); if ("[" === a.charAt(0)) b = a.indexOf("]"), c.hostname = a.substring(1, b) || null, c.port = a.substring(b + 2, d) || null, "/" === c.port && (c.port = null); else {
                                var e = a.indexOf(":"); b = a.indexOf("/"); e = a.indexOf(":", e + 1);
                                -1 !== e && (-1 === b || e < b) ? (c.hostname = a.substring(0, d) || null, c.port = null) : (b = a.substring(0, d).split(":"), c.hostname = b[0] || null, c.port = b[1] || null)
                            } c.hostname && "/" !== a.substring(d).charAt(0) && (d++, a = "/" + a); return a.substring(d) || "/"
                        }; b.parseAuthority = function (a, c) { a = b.parseUserinfo(a, c); return b.parseHost(a, c) }; b.parseUserinfo = function (a, c) {
                            var d = a.indexOf("/"), m = a.lastIndexOf("@", -1 < d ? d : a.length - 1); -1 < m && (-1 === d || m < d) ? (d = a.substring(0, m).split(":"), c.username = d[0] ? b.decode(d[0]) : null, d.shift(), c.password =
                                d[0] ? b.decode(d.join(":")) : null, a = a.substring(m + 1)) : (c.username = null, c.password = null); return a
                        }; b.parseQuery = function (a, c) { if (!a) return {}; a = a.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, ""); if (!a) return {}; for (var d = {}, m = a.split("&"), e = m.length, f, h, g = 0; g < e; g++) f = m[g].split("="), h = b.decodeQuery(f.shift(), c), f = f.length ? b.decodeQuery(f.join("="), c) : null, v.call(d, h) ? ("string" === typeof d[h] && (d[h] = [d[h]]), d[h].push(f)) : d[h] = f; return d }; b.build = function (a) {
                            var c = ""; a.protocol && (c += a.protocol + ":"); a.urn || !c &&
                                !a.hostname || (c += "//"); c += b.buildAuthority(a) || ""; "string" === typeof a.path && ("/" !== a.path.charAt(0) && "string" === typeof a.hostname && (c += "/"), c += a.path); "string" === typeof a.query && a.query && (c += "?" + a.query); "string" === typeof a.fragment && a.fragment && (c += "#" + a.fragment); return c
                        }; b.buildHost = function (a) { var c = ""; if (a.hostname) c = b.ip6_expression.test(a.hostname) ? c + ("[" + a.hostname + "]") : c + a.hostname; else return ""; a.port && (c += ":" + a.port); return c }; b.buildAuthority = function (a) { return b.buildUserinfo(a) + b.buildHost(a) };
                b.buildUserinfo = function (a) { var c = ""; a.username && (c += b.encode(a.username), a.password && (c += ":" + b.encode(a.password)), c += "@"); return c }; b.buildQuery = function (a, c, d) { var m = "", e, f, h, g; for (f in a) if (v.call(a, f) && f) if (w(a[f])) for (e = {}, h = 0, g = a[f].length; h < g; h++) void 0 !== a[f][h] && void 0 === e[a[f][h] + ""] && (m += "&" + b.buildQueryParameter(f, a[f][h], d), !0 !== c && (e[a[f][h] + ""] = !0)); else void 0 !== a[f] && (m += "&" + b.buildQueryParameter(f, a[f], d)); return m.substring(1) }; b.buildQueryParameter = function (a, c, d) {
                    return b.encodeQuery(a,
                        d) + (null !== c ? "=" + b.encodeQuery(c, d) : "")
                }; b.addQuery = function (a, c, d) { if ("object" === typeof c) for (var m in c) v.call(c, m) && b.addQuery(a, m, c[m]); else if ("string" === typeof c) void 0 === a[c] ? a[c] = d : ("string" === typeof a[c] && (a[c] = [a[c]]), w(d) || (d = [d]), a[c] = (a[c] || []).concat(d)); else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter"); }; b.removeQuery = function (a, c, d) {
                    var m; if (w(c)) for (d = 0, m = c.length; d < m; d++) a[c[d]] = void 0; else if ("RegExp" === A(c)) for (m in a) c.test(m) && (a[m] = void 0);
                    else if ("object" === typeof c) for (m in c) v.call(c, m) && b.removeQuery(a, m, c[m]); else if ("string" === typeof c) void 0 !== d ? "RegExp" === A(d) ? !w(a[c]) && d.test(a[c]) ? a[c] = void 0 : a[c] = h(a[c], d) : a[c] === d ? a[c] = void 0 : w(a[c]) && (a[c] = h(a[c], d)) : a[c] = void 0; else throw new TypeError("URI.removeQuery() accepts an object, string, RegExp as the first parameter");
                }; b.hasQuery = function (a, c, d, m) {
                    if ("object" === typeof c) { for (var e in c) if (v.call(c, e) && !b.hasQuery(a, e, c[e])) return !1; return !0 } if ("string" !== typeof c) throw new TypeError("URI.hasQuery() accepts an object, string as the name parameter");
                    switch (A(d)) { case "Undefined": return c in a; case "Boolean": return a = Boolean(w(a[c]) ? a[c].length : a[c]), d === a; case "Function": return !!d(a[c], c, a); case "Array": return w(a[c]) ? (m ? u : D)(a[c], d) : !1; case "RegExp": return w(a[c]) ? m ? u(a[c], d) : !1 : Boolean(a[c] && a[c].match(d)); case "Number": d = String(d); case "String": return w(a[c]) ? m ? u(a[c], d) : !1 : a[c] === d; default: throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter"); }
                }; b.commonPath = function (a, c) {
                    var d =
                        Math.min(a.length, c.length), b; for (b = 0; b < d; b++) if (a.charAt(b) !== c.charAt(b)) { b--; break } if (1 > b) return a.charAt(0) === c.charAt(0) && "/" === a.charAt(0) ? "/" : ""; if ("/" !== a.charAt(b) || "/" !== c.charAt(b)) b = a.substring(0, b).lastIndexOf("/"); return a.substring(0, b + 1)
                }; b.withinString = function (a, c, d) {
                    d || (d = {}); var m = d.start || b.findUri.start, e = d.end || b.findUri.end, f = d.trim || b.findUri.trim, h = /[a-z0-9-]=["']?$/i; for (m.lastIndex = 0; ;) {
                        var g = m.exec(a); if (!g) break; g = g.index; if (d.ignoreHtml) {
                            var u = a.slice(Math.max(g - 3, 0),
                                g); if (u && h.test(u)) continue
                        } var u = g + a.slice(g).search(e), k = a.slice(g, u).replace(f, ""); d.ignore && d.ignore.test(k) || (u = g + k.length, k = c(k, g, u, a), a = a.slice(0, g) + k + a.slice(u), m.lastIndex = g + k.length)
                    } m.lastIndex = 0; return a
                }; b.ensureValidHostname = function (a) {
                    if (a.match(b.invalid_hostname_characters)) {
                        if (!f) throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available'); if (f.toASCII(a).match(b.invalid_hostname_characters)) throw new TypeError('Hostname "' +
                            a + '" contains characters other than [A-Z0-9.-]');
                    }
                }; b.noConflict = function (a) { if (a) return a = { URI: this.noConflict() }, l.URITemplate && "function" === typeof l.URITemplate.noConflict && (a.URITemplate = l.URITemplate.noConflict()), l.IPv6 && "function" === typeof l.IPv6.noConflict && (a.IPv6 = l.IPv6.noConflict()), l.SecondLevelDomains && "function" === typeof l.SecondLevelDomains.noConflict && (a.SecondLevelDomains = l.SecondLevelDomains.noConflict()), a; l.URI === this && (l.URI = p); return this }; e.build = function (a) {
                    if (!0 === a) this._deferred_build =
                        !0; else if (void 0 === a || this._deferred_build) this._string = b.build(this._parts), this._deferred_build = !1; return this
                }; e.clone = function () { return new b(this) }; e.valueOf = e.toString = function () { return this.build(!1)._string }; e.protocol = t("protocol"); e.username = t("username"); e.password = t("password"); e.hostname = t("hostname"); e.port = t("port"); e.query = r("query", "?"); e.fragment = r("fragment", "#"); e.search = function (a, c) { var b = this.query(a, c); return "string" === typeof b && b.length ? "?" + b : b }; e.hash = function (a, c) {
                    var b =
                        this.fragment(a, c); return "string" === typeof b && b.length ? "#" + b : b
                }; e.pathname = function (a, c) { if (void 0 === a || !0 === a) { var d = this._parts.path || (this._parts.hostname ? "/" : ""); return a ? (this._parts.urn ? b.decodeUrnPath : b.decodePath)(d) : d } this._parts.path = this._parts.urn ? a ? b.recodeUrnPath(a) : "" : a ? b.recodePath(a) : "/"; this.build(!c); return this }; e.path = e.pathname; e.href = function (a, c) {
                    var d; if (void 0 === a) return this.toString(); this._string = ""; this._parts = b._parts(); var e = a instanceof b, f = "object" === typeof a && (a.hostname ||
                        a.path || a.pathname); a.nodeName && (f = b.getDomAttribute(a), a = a[f] || "", f = !1); !e && f && void 0 !== a.pathname && (a = a.toString()); if ("string" === typeof a || a instanceof String) this._parts = b.parse(String(a), this._parts); else if (e || f) for (d in e = e ? a._parts : a, e) v.call(this._parts, d) && (this._parts[d] = e[d]); else throw new TypeError("invalid input"); this.build(!c); return this
                }; e.is = function (a) {
                    var c = !1, d = !1, e = !1, f = !1, h = !1, u = !1, k = !1, l = !this._parts.urn; this._parts.hostname && (l = !1, d = b.ip4_expression.test(this._parts.hostname),
                        e = b.ip6_expression.test(this._parts.hostname), c = d || e, h = (f = !c) && g && g.has(this._parts.hostname), u = f && b.idn_expression.test(this._parts.hostname), k = f && b.punycode_expression.test(this._parts.hostname)); switch (a.toLowerCase()) {
                            case "relative": return l; case "absolute": return !l; case "domain": case "name": return f; case "sld": return h; case "ip": return c; case "ip4": case "ipv4": case "inet4": return d; case "ip6": case "ipv6": case "inet6": return e; case "idn": return u; case "url": return !this._parts.urn; case "urn": return !!this._parts.urn;
                            case "punycode": return k
                        } return null
                }; var F = e.protocol, G = e.port, H = e.hostname; e.protocol = function (a, c) { if (void 0 !== a && a && (a = a.replace(/:(\/\/)?$/, ""), !a.match(b.protocol_expression))) throw new TypeError('Protocol "' + a + "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]"); return F.call(this, a, c) }; e.scheme = e.protocol; e.port = function (a, c) {
                    if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 !== a && (0 === a && (a = null), a && (a += "", ":" === a.charAt(0) && (a = a.substring(1)), a.match(/[^0-9]/)))) throw new TypeError('Port "' +
                        a + '" contains characters other than [0-9]'); return G.call(this, a, c)
                }; e.hostname = function (a, c) { if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 !== a) { var d = {}; b.parseHost(a, d); a = d.hostname } return H.call(this, a, c) }; e.host = function (a, c) { if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a) return this._parts.hostname ? b.buildHost(this._parts) : ""; b.parseHost(a, this._parts); this.build(!c); return this }; e.authority = function (a, c) {
                    if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a) return this._parts.hostname ?
                        b.buildAuthority(this._parts) : ""; b.parseAuthority(a, this._parts); this.build(!c); return this
                }; e.userinfo = function (a, c) { if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a) { if (!this._parts.username) return ""; var d = b.buildUserinfo(this._parts); return d.substring(0, d.length - 1) } "@" !== a[a.length - 1] && (a += "@"); b.parseUserinfo(a, this._parts); this.build(!c); return this }; e.resource = function (a, c) {
                    var d; if (void 0 === a) return this.path() + this.search() + this.hash(); d = b.parse(a); this._parts.path = d.path; this._parts.query =
                        d.query; this._parts.fragment = d.fragment; this.build(!c); return this
                }; e.subdomain = function (a, c) {
                    if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a) { if (!this._parts.hostname || this.is("IP")) return ""; var d = this._parts.hostname.length - this.domain().length - 1; return this._parts.hostname.substring(0, d) || "" } d = this._parts.hostname.length - this.domain().length; d = this._parts.hostname.substring(0, d); d = new RegExp("^" + k(d)); a && "." !== a.charAt(a.length - 1) && (a += "."); a && b.ensureValidHostname(a); this._parts.hostname =
                        this._parts.hostname.replace(d, a); this.build(!c); return this
                }; e.domain = function (a, c) {
                    if (this._parts.urn) return void 0 === a ? "" : this; "boolean" === typeof a && (c = a, a = void 0); if (void 0 === a) { if (!this._parts.hostname || this.is("IP")) return ""; var d = this._parts.hostname.match(/\./g); if (d && 2 > d.length) return this._parts.hostname; d = this._parts.hostname.length - this.tld(c).length - 1; d = this._parts.hostname.lastIndexOf(".", d - 1) + 1; return this._parts.hostname.substring(d) || "" } if (!a) throw new TypeError("cannot set domain empty");
                    b.ensureValidHostname(a); !this._parts.hostname || this.is("IP") ? this._parts.hostname = a : (d = new RegExp(k(this.domain()) + "$"), this._parts.hostname = this._parts.hostname.replace(d, a)); this.build(!c); return this
                }; e.tld = function (a, c) {
                    if (this._parts.urn) return void 0 === a ? "" : this; "boolean" === typeof a && (c = a, a = void 0); if (void 0 === a) {
                        if (!this._parts.hostname || this.is("IP")) return ""; var b = this._parts.hostname.lastIndexOf("."), b = this._parts.hostname.substring(b + 1); return !0 !== c && g && g.list[b.toLowerCase()] ? g.get(this._parts.hostname) ||
                            b : b
                    } if (a) if (a.match(/[^a-zA-Z0-9-]/)) if (g && g.is(a)) b = new RegExp(k(this.tld()) + "$"), this._parts.hostname = this._parts.hostname.replace(b, a); else throw new TypeError('TLD "' + a + '" contains characters other than [A-Z0-9]'); else { if (!this._parts.hostname || this.is("IP")) throw new ReferenceError("cannot set TLD on non-domain host"); b = new RegExp(k(this.tld()) + "$"); this._parts.hostname = this._parts.hostname.replace(b, a) } else throw new TypeError("cannot set TLD empty"); this.build(!c); return this
                }; e.directory =
                    function (a, c) {
                        if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a || !0 === a) { if (!this._parts.path && !this._parts.hostname) return ""; if ("/" === this._parts.path) return "/"; var d = this._parts.path.length - this.filename().length - 1, d = this._parts.path.substring(0, d) || (this._parts.hostname ? "/" : ""); return a ? b.decodePath(d) : d } d = this._parts.path.length - this.filename().length; d = this._parts.path.substring(0, d); d = new RegExp("^" + k(d)); this.is("relative") || (a || (a = "/"), "/" !== a.charAt(0) && (a = "/" + a)); a && "/" !== a.charAt(a.length -
                            1) && (a += "/"); a = b.recodePath(a); this._parts.path = this._parts.path.replace(d, a); this.build(!c); return this
                    }; e.filename = function (a, c) {
                        if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a || !0 === a) { if (!this._parts.path || "/" === this._parts.path) return ""; var d = this._parts.path.lastIndexOf("/"), d = this._parts.path.substring(d + 1); return a ? b.decodePathSegment(d) : d } d = !1; "/" === a.charAt(0) && (a = a.substring(1)); a.match(/\.?\//) && (d = !0); var e = new RegExp(k(this.filename()) + "$"); a = b.recodePath(a); this._parts.path =
                            this._parts.path.replace(e, a); d ? this.normalizePath(c) : this.build(!c); return this
                    }; e.suffix = function (a, c) {
                        if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a || !0 === a) { if (!this._parts.path || "/" === this._parts.path) return ""; var d = this.filename(), e = d.lastIndexOf("."); if (-1 === e) return ""; d = d.substring(e + 1); d = /^[a-z0-9%]+$/i.test(d) ? d : ""; return a ? b.decodePathSegment(d) : d } "." === a.charAt(0) && (a = a.substring(1)); if (d = this.suffix()) e = a ? new RegExp(k(d) + "$") : new RegExp(k("." + d) + "$"); else {
                            if (!a) return this;
                            this._parts.path += "." + b.recodePath(a)
                        } e && (a = b.recodePath(a), this._parts.path = this._parts.path.replace(e, a)); this.build(!c); return this
                    }; e.segment = function (a, c, b) {
                        var e = this._parts.urn ? ":" : "/", f = this.path(), h = "/" === f.substring(0, 1), f = f.split(e); void 0 !== a && "number" !== typeof a && (b = c, c = a, a = void 0); if (void 0 !== a && "number" !== typeof a) throw Error('Bad segment "' + a + '", must be 0-based integer'); h && f.shift(); 0 > a && (a = Math.max(f.length + a, 0)); if (void 0 === c) return void 0 === a ? f : f[a]; if (null === a || void 0 === f[a]) if (w(c)) {
                            f =
                                []; a = 0; for (var g = c.length; a < g; a++) if (c[a].length || f.length && f[f.length - 1].length) f.length && !f[f.length - 1].length && f.pop(), f.push(c[a])
                        } else { if (c || "string" === typeof c) "" === f[f.length - 1] ? f[f.length - 1] = c : f.push(c) } else c ? f[a] = c : f.splice(a, 1); h && f.unshift(""); return this.path(f.join(e), b)
                    }; e.segmentCoded = function (a, c, d) {
                        var e, f; "number" !== typeof a && (d = c, c = a, a = void 0); if (void 0 === c) { a = this.segment(a, c, d); if (w(a)) for (e = 0, f = a.length; e < f; e++) a[e] = b.decode(a[e]); else a = void 0 !== a ? b.decode(a) : void 0; return a } if (w(c)) for (e =
                            0, f = c.length; e < f; e++) c[e] = b.decode(c[e]); else c = "string" === typeof c || c instanceof String ? b.encode(c) : c; return this.segment(a, c, d)
                    }; var I = e.query; e.query = function (a, c) {
                        if (!0 === a) return b.parseQuery(this._parts.query, this._parts.escapeQuerySpace); if ("function" === typeof a) { var d = b.parseQuery(this._parts.query, this._parts.escapeQuerySpace), e = a.call(this, d); this._parts.query = b.buildQuery(e || d, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace); this.build(!c); return this } return void 0 !==
                            a && "string" !== typeof a ? (this._parts.query = b.buildQuery(a, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), this.build(!c), this) : I.call(this, a, c)
                    }; e.setQuery = function (a, c, d) {
                        var e = b.parseQuery(this._parts.query, this._parts.escapeQuerySpace); if ("string" === typeof a || a instanceof String) e[a] = void 0 !== c ? c : null; else if ("object" === typeof a) for (var f in a) v.call(a, f) && (e[f] = a[f]); else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter"); this._parts.query =
                            b.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace); "string" !== typeof a && (d = c); this.build(!d); return this
                    }; e.addQuery = function (a, c, d) { var e = b.parseQuery(this._parts.query, this._parts.escapeQuerySpace); b.addQuery(e, a, void 0 === c ? null : c); this._parts.query = b.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace); "string" !== typeof a && (d = c); this.build(!d); return this }; e.removeQuery = function (a, c, d) {
                        var e = b.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
                        b.removeQuery(e, a, c); this._parts.query = b.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace); "string" !== typeof a && (d = c); this.build(!d); return this
                    }; e.hasQuery = function (a, c, d) { var e = b.parseQuery(this._parts.query, this._parts.escapeQuerySpace); return b.hasQuery(e, a, c, d) }; e.setSearch = e.setQuery; e.addSearch = e.addQuery; e.removeSearch = e.removeQuery; e.hasSearch = e.hasQuery; e.normalize = function () {
                        return this._parts.urn ? this.normalizeProtocol(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build() :
                            this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()
                    }; e.normalizeProtocol = function (a) { "string" === typeof this._parts.protocol && (this._parts.protocol = this._parts.protocol.toLowerCase(), this.build(!a)); return this }; e.normalizeHostname = function (a) {
                        this._parts.hostname && (this.is("IDN") && f ? this._parts.hostname = f.toASCII(this._parts.hostname) : this.is("IPv6") && n && (this._parts.hostname = n.best(this._parts.hostname)), this._parts.hostname =
                            this._parts.hostname.toLowerCase(), this.build(!a)); return this
                    }; e.normalizePort = function (a) { "string" === typeof this._parts.protocol && this._parts.port === b.defaultPorts[this._parts.protocol] && (this._parts.port = null, this.build(!a)); return this }; e.normalizePath = function (a) {
                        var c = this._parts.path; if (!c) return this; if (this._parts.urn) return this._parts.path = b.recodeUrnPath(this._parts.path), this.build(!a), this; if ("/" === this._parts.path) return this; var d, e = "", f, h; "/" !== c.charAt(0) && (d = !0, c = "/" + c); c = c.replace(/(\/(\.\/)+)|(\/\.$)/g,
                            "/").replace(/\/{2,}/g, "/"); d && (e = c.substring(1).match(/^(\.\.\/)+/) || "") && (e = e[0]); for (; ;) { f = c.indexOf("/.."); if (-1 === f) break; else if (0 === f) { c = c.substring(3); continue } h = c.substring(0, f).lastIndexOf("/"); -1 === h && (h = f); c = c.substring(0, h) + c.substring(f + 3) } d && this.is("relative") && (c = e + c.substring(1)); c = b.recodePath(c); this._parts.path = c; this.build(!a); return this
                    }; e.normalizePathname = e.normalizePath; e.normalizeQuery = function (a) {
                        "string" === typeof this._parts.query && (this._parts.query.length ? this.query(b.parseQuery(this._parts.query,
                            this._parts.escapeQuerySpace)) : this._parts.query = null, this.build(!a)); return this
                    }; e.normalizeFragment = function (a) { this._parts.fragment || (this._parts.fragment = null, this.build(!a)); return this }; e.normalizeSearch = e.normalizeQuery; e.normalizeHash = e.normalizeFragment; e.iso8859 = function () { var a = b.encode, c = b.decode; b.encode = escape; b.decode = decodeURIComponent; try { this.normalize() } finally { b.encode = a, b.decode = c } return this }; e.unicode = function () {
                        var a = b.encode, c = b.decode; b.encode = B; b.decode = unescape; try { this.normalize() } finally {
                            b.encode =
                                a, b.decode = c
                        } return this
                    }; e.readable = function () {
                        var a = this.clone(); a.username("").password("").normalize(); var c = ""; a._parts.protocol && (c += a._parts.protocol + "://"); a._parts.hostname && (a.is("punycode") && f ? (c += f.toUnicode(a._parts.hostname), a._parts.port && (c += ":" + a._parts.port)) : c += a.host()); a._parts.hostname && a._parts.path && "/" !== a._parts.path.charAt(0) && (c += "/"); c += a.path(!0); if (a._parts.query) {
                            for (var d = "", e = 0, h = a._parts.query.split("&"), g = h.length; e < g; e++) {
                                var u = (h[e] || "").split("="), d = d + ("&" + b.decodeQuery(u[0],
                                    this._parts.escapeQuerySpace).replace(/&/g, "%26")); void 0 !== u[1] && (d += "=" + b.decodeQuery(u[1], this._parts.escapeQuerySpace).replace(/&/g, "%26"))
                            } c += "?" + d.substring(1)
                        } return c += b.decodeQuery(a.hash(), !0)
                    }; e.absoluteTo = function (a) {
                        var c = this.clone(), d = ["protocol", "username", "password", "hostname", "port"], e, f; if (this._parts.urn) throw Error("URNs do not have any generally defined hierarchical components"); a instanceof b || (a = new b(a)); c._parts.protocol || (c._parts.protocol = a._parts.protocol); if (this._parts.hostname) return c;
                        for (e = 0; f = d[e]; e++) c._parts[f] = a._parts[f]; c._parts.path ? ".." === c._parts.path.substring(-2) && (c._parts.path += "/") : (c._parts.path = a._parts.path, c._parts.query || (c._parts.query = a._parts.query)); "/" !== c.path().charAt(0) && (d = (d = a.directory()) ? d : 0 === a.path().indexOf("/") ? "/" : "", c._parts.path = (d ? d + "/" : "") + c._parts.path, c.normalizePath()); c.build(); return c
                    }; e.relativeTo = function (a) {
                        var c = this.clone().normalize(), d, e, f, h; if (c._parts.urn) throw Error("URNs do not have any generally defined hierarchical components");
                        a = (new b(a)).normalize(); d = c._parts; e = a._parts; f = c.path(); h = a.path(); if ("/" !== f.charAt(0)) throw Error("URI is already relative"); if ("/" !== h.charAt(0)) throw Error("Cannot calculate a URI relative to another relative URI"); d.protocol === e.protocol && (d.protocol = null); if (d.username === e.username && d.password === e.password && null === d.protocol && null === d.username && null === d.password && d.hostname === e.hostname && d.port === e.port) d.hostname = null, d.port = null; else return c.build(); if (f === h) return d.path = "", c.build();
                        a = b.commonPath(c.path(), a.path()); if (!a) return c.build(); e = e.path.substring(a.length).replace(/[^\/]*$/, "").replace(/.*?\//g, "../"); d.path = e + d.path.substring(a.length); return c.build()
                    }; e.equals = function (a) {
                        var c = this.clone(); a = new b(a); var d = {}, e = {}, f = {}, h; c.normalize(); a.normalize(); if (c.toString() === a.toString()) return !0; d = c.query(); e = a.query(); c.query(""); a.query(""); if (c.toString() !== a.toString() || d.length !== e.length) return !1; d = b.parseQuery(d, this._parts.escapeQuerySpace); e = b.parseQuery(e, this._parts.escapeQuerySpace);
                        for (h in d) if (v.call(d, h)) { if (!w(d[h])) { if (d[h] !== e[h]) return !1 } else if (!D(d[h], e[h])) return !1; f[h] = !0 } for (h in e) if (v.call(e, h) && !f[h]) return !1; return !0
                    }; e.duplicateQueryParameters = function (a) { this._parts.duplicateQueryParameters = !!a; return this }; e.escapeQuerySpace = function (a) { this._parts.escapeQuerySpace = !!a; return this }; return b
            });
            (function (f, n) { "object" === typeof exports ? module.exports = n(require("./URI")) : "function" === typeof define && define.amd ? define(["./URI"], n) : f.URITemplate = n(f.URI, f) })(this, function (f, n) {
                function g(b) { if (g._cache[b]) return g._cache[b]; if (!(this instanceof g)) return new g(b); this.expression = b; g._cache[b] = this; return this } function l(b) { this.data = b; this.cache = {} } var b = n && n.URITemplate, k = Object.prototype.hasOwnProperty, A = g.prototype, w = {
                    "": { prefix: "", separator: ",", named: !1, empty_name_separator: !1, encode: "encode" },
                    "+": { prefix: "", separator: ",", named: !1, empty_name_separator: !1, encode: "encodeReserved" }, "#": { prefix: "#", separator: ",", named: !1, empty_name_separator: !1, encode: "encodeReserved" }, ".": { prefix: ".", separator: ".", named: !1, empty_name_separator: !1, encode: "encode" }, "/": { prefix: "/", separator: "/", named: !1, empty_name_separator: !1, encode: "encode" }, ";": { prefix: ";", separator: ";", named: !0, empty_name_separator: !1, encode: "encode" }, "?": { prefix: "?", separator: "&", named: !0, empty_name_separator: !0, encode: "encode" }, "&": {
                        prefix: "&",
                        separator: "&", named: !0, empty_name_separator: !0, encode: "encode"
                    }
                }; g._cache = {}; g.EXPRESSION_PATTERN = /\{([^a-zA-Z0-9%_]?)([^\}]+)(\}|$)/g; g.VARIABLE_PATTERN = /^([^*:]+)((\*)|:(\d+))?$/; g.VARIABLE_NAME_PATTERN = /[^a-zA-Z0-9%_]/; g.expand = function (b, f) {
                    var k = w[b.operator], l = k.named ? "Named" : "Unnamed", n = b.variables, t = [], r, p, e; for (e = 0; p = n[e]; e++) r = f.get(p.name), r.val.length ? t.push(g["expand" + l](r, k, p.explode, p.explode && k.separator || ",", p.maxlength, p.name)) : r.type && t.push(""); return t.length ? k.prefix + t.join(k.separator) :
                        ""
                }; g.expandNamed = function (b, g, k, l, n, t) { var r = "", p = g.encode; g = g.empty_name_separator; var e = !b[p].length, v = 2 === b.type ? "" : f[p](t), q, x, w; x = 0; for (w = b.val.length; x < w; x++) n ? (q = f[p](b.val[x][1].substring(0, n)), 2 === b.type && (v = f[p](b.val[x][0].substring(0, n)))) : e ? (q = f[p](b.val[x][1]), 2 === b.type ? (v = f[p](b.val[x][0]), b[p].push([v, q])) : b[p].push([void 0, q])) : (q = b[p][x][1], 2 === b.type && (v = b[p][x][0])), r && (r += l), k ? r += v + (g || q ? "=" : "") + q : (x || (r += f[p](t) + (g || q ? "=" : "")), 2 === b.type && (r += v + ","), r += q); return r }; g.expandUnnamed =
                    function (b, g, k, l, n) { var t = "", r = g.encode; g = g.empty_name_separator; var p = !b[r].length, e, v, q, w; q = 0; for (w = b.val.length; q < w; q++) n ? v = f[r](b.val[q][1].substring(0, n)) : p ? (v = f[r](b.val[q][1]), b[r].push([2 === b.type ? f[r](b.val[q][0]) : void 0, v])) : v = b[r][q][1], t && (t += l), 2 === b.type && (e = n ? f[r](b.val[q][0].substring(0, n)) : b[r][q][0], t += e, t = k ? t + (g || v ? "=" : "") : t + ","), t += v; return t }; g.noConflict = function () { n.URITemplate === g && (n.URITemplate = b); return g }; A.expand = function (b) {
                        var f = ""; this.parts && this.parts.length || this.parse();
                        b instanceof l || (b = new l(b)); for (var k = 0, n = this.parts.length; k < n; k++) f += "string" === typeof this.parts[k] ? this.parts[k] : g.expand(this.parts[k], b); return f
                    }; A.parse = function () {
                        var b = this.expression, f = g.EXPRESSION_PATTERN, k = g.VARIABLE_PATTERN, n = g.VARIABLE_NAME_PATTERN, l = [], t = 0, r, p, e; for (f.lastIndex = 0; ;) {
                            p = f.exec(b); if (null === p) { l.push(b.substring(t)); break } else l.push(b.substring(t, p.index)), t = p.index + p[0].length; if (!w[p[1]]) throw Error('Unknown Operator "' + p[1] + '" in "' + p[0] + '"'); if (!p[3]) throw Error('Unclosed Expression "' +
                                p[0] + '"'); r = p[2].split(","); for (var v = 0, q = r.length; v < q; v++) { e = r[v].match(k); if (null === e) throw Error('Invalid Variable "' + r[v] + '" in "' + p[0] + '"'); if (e[1].match(n)) throw Error('Invalid Variable Name "' + e[1] + '" in "' + p[0] + '"'); r[v] = { name: e[1], explode: !!e[3], maxlength: e[4] && parseInt(e[4], 10) } } if (!r.length) throw Error('Expression Missing Variable(s) "' + p[0] + '"'); l.push({ expression: p[0], operator: p[1], variables: r })
                        } l.length || l.push(b); this.parts = l; return this
                    }; l.prototype.get = function (b) {
                        var f = this.data,
                            g = { type: 0, val: [], encode: [], encodeReserved: [] }, l; if (void 0 !== this.cache[b]) return this.cache[b]; this.cache[b] = g; f = "[object Function]" === String(Object.prototype.toString.call(f)) ? f(b) : "[object Function]" === String(Object.prototype.toString.call(f[b])) ? f[b](b) : f[b]; if (void 0 !== f && null !== f) if ("[object Array]" === String(Object.prototype.toString.call(f))) { l = 0; for (b = f.length; l < b; l++) void 0 !== f[l] && null !== f[l] && g.val.push([void 0, String(f[l])]); g.val.length && (g.type = 3) } else if ("[object Object]" === String(Object.prototype.toString.call(f))) {
                                for (l in f) k.call(f,
                                    l) && void 0 !== f[l] && null !== f[l] && g.val.push([l, String(f[l])]); g.val.length && (g.type = 2)
                            } else g.type = 1, g.val.push([void 0, String(f)]); return g
                    }; f.expand = function (b, k) { var l = (new g(b)).expand(k); return new f(l) }; return g
            });
        }.call(this),
        function () {
            // ---------------------------------------------------------------------------------
            // Sapo Js API - Bindings (Using Sapo Twine)
            //
            // Js binding for Html document(ex: bind, binding event, bind-shown, bind-class,...)
            // ---------------------------------------------------------------------------------
            window.Bindings = window.Twine;
        }.call(this),
        function () {
            window.ComponentUrl = function () {
                function t(e) {
                    return this.original = null != e ? e : document.location.href, this.original.constructor === t ? this.original : void this._parse()
                }
                return t.name = "ComponentUrl", t.prototype.withoutHash = function () {
                    return this.href.replace(this.hash, "")
                }, t.prototype.withoutHashForIE10compatibility = function () {
                    return this.withoutHash()
                }, t.prototype.hasNoHash = function () {
                    return 0 === this.hash.length
                }, t.prototype._parse = function () {
                    var t, e;
                    return (null != (t = this.link) ? t : this.link = document.createElement("a")).href = this.original, e = this.link, this.href = e.href, this.protocol = e.protocol, this.host = e.host, this.hostname = e.hostname, this.port = e.port, this.pathname = e.pathname, this.search = e.search, this.hash = e.hash, this.origin = [this.protocol, "//", this.hostname].join(""), 0 !== this.port.length && (this.origin += ":" + this.port), this.relative = [this.pathname, this.search, this.hash].join(""), this.absolute = this.href
                }, t
            }()
        }.call(this),
        function () {
            // ---------------------------------------------------------------------------------
            // Sapo Js API - Common
            //
            // Contains all common functions.
            // ---------------------------------------------------------------------------------
            window.Common = {
                include: function (array, obj) {
                    if (!array)
                        return false;

                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == obj)
                            return true;
                    }

                    return false;
                },
                difference: function (array, obj) {
                    var differents = [];

                    for (var i = 0; i < array.length; i++) {
                        if (array[i] != obj)
                            differents.push(array[i]);
                    }

                    return differents;
                }
            };
        }.call(this),
        function () {
            var t = {}.hasOwnProperty,
                e = function (e, n) {
                    function o() {
                        this.constructor = e
                    }
                    for (var i in n) t.call(n, i) && (e[i] = n[i]);
                    return o.prototype = n.prototype, e.prototype = new o, e.__super__ = n.prototype, e
                },
                n = [].slice;
            window.Link = function (t) {
                function o(t) {
                    return this.link = t, this.link.constructor === o ? this.link : (this.original = this.link.href, void o.__super__.constructor.apply(this, arguments))
                }
                return e(o, t), o.name = "Link", o.HTML_EXTENSIONS = ["html"], o.allowExtensions = function () {
                    var t, e, i, r;
                    for (e = 1 <= arguments.length ? n.call(arguments, 0) : [], i = 0, r = e.length; r > i; i++) t = e[i], o.HTML_EXTENSIONS.push(t);
                    return o.HTML_EXTENSIONS
                }, o.prototype.shouldIgnore = function () {
                    return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target()
                }, o.prototype._crossOrigin = function () {
                    return this.origin !== (new ComponentUrl).origin
                }, o.prototype._anchored = function () {
                    var t;
                    return (this.hash && this.withoutHash()) === (t = new ComponentUrl).withoutHash() || this.href === t.href + "#"
                }, o.prototype._nonHtml = function () {
                    return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + o.HTML_EXTENSIONS.join("|") + ")?$", "g"))
                }, o.prototype._optOut = function () {
                    var t, e;
                    for (e = this.link; !t && e !== document && null !== e;) t = null != e.getAttribute("data-no-turbolink"), e = e.parentNode;
                    return t
                }, o.prototype._target = function () {
                    return 0 !== this.link.target.length
                }, o
            }(ComponentUrl)
        }.call(this),
        function () {
            window.CSRFToken = function () {
                function t() { }
                return t.name = "CSRFToken", t.get = function (t) {
                    var e;
                    return null == t && (t = document), {
                        node: e = t.querySelector('meta[name="csrf-token"]'),
                        token: null != e && "function" == typeof e.getAttribute ? e.getAttribute("content") : void 0
                    }
                }, t.update = function (t) {
                    var e;
                    return e = this.get(), null != e.token && null != t && e.token !== t ? e.node.setAttribute("content", t) : void 0
                }, t
            }()
        }.call(this),
        function () {
            var t, e, n, o, i, r, a, s, u, l, c, p, h = [].slice,
                d = [].indexOf || function (t) {
                    for (var e = 0, n = this.length; n > e; e++)
                        if (e in this && this[e] === t) return e;
                    return -1
                };
            c = null, i = function () {
                return document.addEventListener("DOMContentLoaded", function () {
                    return triggerEvent("page:change"), triggerEvent("page:update")
                }, !0)
            }, r = function () {
                return "undefined" != typeof jQuery ? jQuery(document).on("ajaxSuccess", function (t, e) {
                    return jQuery.trim(e.responseText) ? triggerEvent("page:update") : void 0
                }) : void 0
            }, o = void 0 !== window.history.state || navigator.userAgent.match(/Firefox\/2[6|7]/), e = window.history && window.history.pushState && window.history.replaceState && o, window.triggerEvent = function (t, e) {
                var n;
                return n = document.createEvent("Events"), e && (n.data = e), n.initEvent(t, !0, !0), document.dispatchEvent(n)
            }, window.triggerEventFor = function (t, e, n) {
                var o;
                return o = document.createEvent("Events"), n && (o.data = n), o.initEvent(t, !0, !0), e.dispatchEvent(o)
            }, a = function (t) {
                var e, n;
                return e = (null != (n = document.cookie.match(new RegExp(t + "=(\\w+)"))) ? n[1].toUpperCase() : void 0) || "", document.cookie = t + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/", e
            }, l = "GET" === (p = a("request_method")) || "" === p, n = e && l, t = document.addEventListener && document.createEvent, t && (i(), r()), u = function (t, e) {
                var n;
                return n = e.parentNode.replaceChild(t, e), triggerEvent("page:after-node-removed", n)
            }, s = function (t) {
                var e;
                return e = t.parentNode.removeChild(t), triggerEvent("page:after-node-removed", e)
            }, window.Turbolinks = function () {
                function t() { }
                var e, o, i, r, a, l, p, m, f, y, _, g, v, b, S, x, T, C, w, A, E, R, D, P, I, k, L, O, $;
                return t.name = "Turbolinks", r = null, a = null, x = null, E = null, y = function (t, e) {
                    return null == e && (e = {}), T(t) ? void 0 : (t = new ComponentUrl(t), k(), null == e.partialReplace && (e.partialReplace = !1), null == e.onlyKeys && (e.onlyKeys = []), e.onLoadFunction = function () {
                        return e.onlyKeys.length || O(), "function" == typeof e.callback ? e.callback() : void 0
                    }, _(t, e))
                }, t.pushState = function (t, e, n) {
                    return window.history.pushState(t, e, n)
                }, t.replaceState = function (t, e, n) {
                    return window.history.replaceState(t, e, n)
                }, _ = function (e, n) {
                    triggerEvent("page:fetch", {
                        url: e.absolute
                    }), null != c && c.abort(), c = new XMLHttpRequest, c.open("GET", e.withoutHashForIE10compatibility(), !0), c.setRequestHeader("Accept", "text/html, application/xhtml+xml, application/xml"), c.setRequestHeader("X-XHR-Referer", E), c.onload = function () {
                        return c.status >= 500 ? document.location.href = e.absolute : t.loadPage(e, c, n)
                    }, c.onloadend = function () {
                        return c = null
                    }, c.onerror = function () {
                        return document.location.href = e.absolute
                    }, c.send()
                }, t.loadPage = function (t, e, n) {
                    var o, r;
                    null == n && (n = {}), triggerEvent("page:receive"), null == n.updatePushState && (n.updatePushState = !0), (o = w(e, n.partialReplace)) ? (n.updatePushState && R(t), r = i.apply(null, h.call(f(o)).concat([n])), n.updatePushState && D(e), triggerEvent("page:load", r), "function" == typeof n.onLoadFunction && n.onLoadFunction()) : document.location.href = t.absolute
                }, i = function (t, n, o, i, r) {
                    var s, c;
                    return null == r && (r = {}), t && (document.title = t), null == r.onlyKeys && (r.onlyKeys = []), null == r.exceptKeys && (r.exceptKeys = []), r.onlyKeys.length ? (c = [].concat(v(), g(r.onlyKeys)), s = I(c, n), e(s) && $(), s) : (I(v(), n), C(n), r.exceptKeys.length ? P(r.exceptKeys, n) : l(n), triggerEvent("page:before-replace"), u(n, document.body), null != o && CSRFToken.update(o), $(), i && m(), a = window.history.state, triggerEvent("page:change"), triggerEvent("page:update"), void 0)
                }, g = function (t) {
                    var e, n, o, i, r, a, s, u;
                    for (n = [], i = 0, a = t.length; a > i; i++)
                        for (e = t[i], u = document.querySelectorAll("[refresh=" + e + "]"), r = 0, s = u.length; s > r; r++) o = u[r], n.push(o);
                    return n
                }, v = function () {
                    var t, e, n, o, i;
                    for (t = [], i = document.querySelectorAll("[refresh-always]"), n = 0, o = i.length; o > n; n++) e = i[n], t.push(e);
                    return t
                }, e = function (t) {
                    var e, n, o;
                    for (n = 0, o = t.length; o > n; n++)
                        if (e = t[n], e.querySelectorAll("input[autofocus], textarea[autofocus]").length > 0) return !0;
                    return !1
                }, $ = function () {
                    var t, e;
                    return t = (e = document.querySelectorAll("input[autofocus], textarea[autofocus]"))[e.length - 1], t && document.activeElement !== t ? t.focus() : void 0
                }, l = function (t) {
                    var e, n, o, i;
                    for (i = t.querySelectorAll("[refresh-never]"), n = 0, o = i.length; o > n; n++) e = i[n], s(e)
                }, I = function (t, e) {
                    var n, o, i, r, a, l, c;
                    for (triggerEvent("page:before-partial-replace", t), r = function (e) {
                        var n, o, i;
                        for (o = 0, i = t.length; i > o; o++)
                            if (n = t[o], e !== n && n.contains(e)) return !0;
                        return !1
                    }, a = [], l = 0, c = t.length; c > l; l++)
                        if (n = t[l], !r(n)) {
                            if (!(i = n.getAttribute("id"))) throw new Error("Turbolinks refresh: Refresh key elements must have an id.");
                            (o = e.querySelector("#" + i)) ? (o = o.cloneNode(!0), u(o, n), "SCRIPT" === o.nodeName && "false" !== o.getAttribute("data-turbolinks-eval") ? p(o) : a.push(o)) : null === n.getAttribute("refresh-always") && s(n)
                        }
                    return a
                }, S = function (t, e) {
                    var n, o, i, r, a, s;
                    for (s = [], r = 0, a = e.length; a > r; r++) {
                        if (n = e[r], !(o = n.getAttribute("id"))) throw new Error("TurboGraft refresh: Kept nodes must have an id.");
                        s.push((i = t.querySelector("#" + o)) ? u(n, i) : void 0)
                    }
                    return s
                }, C = function (t) {
                    var e, n, o, i, r;
                    for (e = [], o = document.querySelectorAll("[tg-static]"), i = 0, r = o.length; r > i; i++) n = o[i], e.push(n);
                    S(t, e)
                }, P = function (t, e) {
                    var n, o, i, r, a, s, u, l;
                    for (n = [], r = 0, s = t.length; s > r; r++)
                        for (o = t[r], l = document.querySelectorAll("[refresh=" + o + "]"), a = 0, u = l.length; u > a; a++) i = l[a], n.push(i);
                    S(e, n)
                }, m = function () {
                    var t, e, n, o, i;
                    for (e = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')), n = 0, o = e.length; o > n; n++) t = e[n], ("" === (i = t.type) || "text/javascript" === i) && p(t)
                }, p = function (t) {
                    var e, n, o, i, r, a, s;
                    for (n = document.createElement("script"), s = t.attributes, r = 0, a = s.length; a > r; r++) e = s[r], n.setAttribute(e.name, e.value);
                    n.appendChild(document.createTextNode(t.innerHTML)), i = t.parentNode, o = t.nextSibling, i.removeChild(t), i.insertBefore(n, o)
                }, L = function (t) {
                    return t.innerHTML = t.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/gi, ""), t
                }, R = function (e) {
                    (e = new ComponentUrl(e)).absolute !== E && t.pushState({
                        turbolinks: !0,
                        url: e.absolute
                    }, "", e.absolute)
                }, D = function (e) {
                    var n, o;
                    (n = e.getResponseHeader("X-XHR-Redirected-To")) && (n = new ComponentUrl(n), o = n.hasNoHash() ? document.location.hash : "", t.replaceState(a, "", n.href + o))
                }, k = function () {
                    return E = document.location.href
                }, t.rememberCurrentUrl = function () {
                    return t.replaceState({
                        turbolinks: !0,
                        url: document.location.href
                    }, "", document.location.href)
                }, t.rememberCurrentState = function () {
                    return a = window.history.state
                }, A = function (t) {
                    return window.scrollTo(t.positionX, t.positionY)
                }, O = function () {
                    return document.location.hash ? document.location.href = document.location.href : window.scrollTo(0, 0)
                }, T = function (t) {
                    return !triggerEvent("page:before-change", t)
                }, w = function (t, e) {
                    var n, o, i, a, s, u, l;
                    return null == e && (e = !1), i = function () {
                        var e;
                        return 422 === t.status ? !1 : 400 <= (e = t.status) && 600 > e
                    }, l = function () {
                        return t.getResponseHeader("Content-Type").match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)
                    }, s = function (t) {
                        var e, n, o, i, r;
                        for (i = t.querySelector("head").childNodes, r = [], n = 0, o = i.length; o > n; n++) e = i[n], null != ("function" == typeof e.getAttribute ? e.getAttribute("data-turbolinks-track") : void 0) && r.push(e.getAttribute("src") || e.getAttribute("href"));
                        return r
                    }, n = function (t) {
                        var e;
                        return x || (x = s(document)), e = s(t), e.length !== x.length || u(e, x).length !== x.length
                    }, u = function (t, e) {
                        var n, o, i, r, a;
                        for (t.length > e.length && (r = [e, t], t = r[0], e = r[1]), a = [], o = 0, i = t.length; i > o; o++) n = t[o], d.call(e, n) >= 0 && a.push(n);
                        return a
                    }, i() || !l() || (a = r(t.responseText), o = n(a), !a || o && !e) ? void 0 : a
                }, f = function (t) {
                    var e;
                    return e = t.querySelector("title"), [null != e ? e.textContent : void 0, L(t.querySelector("body")), CSRFToken.get(t).token, "runScripts"]
                }, b = function (e) {
                    var n;
                    return (null != (n = e.state) ? n.turbolinks : void 0) ? t.visit(e.target.location.href) : void 0
                }, o = function (t) {
                    return setTimeout(t, 500)
                }, r = function (t) {
                    var e;
                    return /<(html|body)/i.test(t) ? (e = document.documentElement.cloneNode(), e.innerHTML = t) : (e = document.documentElement.cloneNode(!0), e.querySelector("body").innerHTML = t), e.head = e.querySelector("head"), e.body = e.querySelector("body"), e
                }, n ? (t.visit = y, t.rememberCurrentUrl(), t.rememberCurrentState(), /*document.addEventListener("click", Click.installHandlerLast, !0), */ o(function () {
                    return window.addEventListener("popstate", b, !1)
                })) : t.visit = function (t) {
                    return document.location.href = t
                }, t
            }()
        }.call(this),
        function () {
            // ---------------------------------------------------------------------------------
            // Sapo Js API - Page
            //
            // Working with Page, "Context" and Binding when page load.
            // ---------------------------------------------------------------------------------

            var currentHref = location.href
            var regiteredContexts = {};
            var bindContextFunc = null;
            var pageFuncs = [];
            var initializePage = function (data) {
                var bindingContext;

                if (location.href !== currentHref)
                    regiteredContexts = {};

                if (bindContextFunc != null) {
                    bindingContext = bindContextFunc();
                    Bindings.reset(bindingContext);
                    Bindings.bind();
                    bindContextFunc = null;
                }
                else {
                    if (data != null) {
                        for (var i = 0; i < data.length; i++) {
                            Bindings.bind(data[i]);
                        }
                    }
                }

                for (var i = 0; i < pageFuncs.length; i++) {
                    var func = pageFuncs[i];
                    var funcArgs = func[0];
                    var funcName = func[1];
                    funcName(funcArgs);
                }

                pageFuncs.length = 0;
                //Bindings.refreshImmediately();
                if (bindingContext != null && typeof bindingContext.pageLoaded == "function")
                    bindingContext.pageLoaded();
            };
            var manualInit = false;
            window.Page = function (func, _manualInit) {
                manualInit = _manualInit;
                bindContextFunc = func;
                if (bindContextFunc == null)
                    bindContextFunc = function () { return {} };
            };

            // BEGIN: Page - Initialization
            document.addEventListener("DOMContentLoaded", function () {
                if (!manualInit)
                    initializePage();
            });
            document.addEventListener("page:load", function (e) {
                initializePage(e.data);
                currentHref = location.href;
            });
            $(document).ajaxComplete(function () {
                //Bindings.refresh();
            })
            // END: Page - Initialization

            // BEGIN: Page - Public Static Functions
            Page.onRefresh = function (context, node, func) {
                if (func == null)
                    func = node;

                if (node != null) {
                    Bindings.register(function () {
                        var contextKey = Bindings.contextKey(node, context);
                        var arguments = regiteredContexts[contextKey];
                        if (arguments != null)
                            pageFuncs.push([arguments, func]);

                        regiteredContexts[contextKey] = context;
                    })
                }
            };
            Page.setLocation = function (url) {
                window.location.href = url;
            };
            Page.pushState = function (url) {
                return window.history.pushState({
                    turbolinks: true,
                    url: url
                }, null, url)
            };
            Page.replaceState = function (url) {
                return window.history.replaceState({
                    turbolinks: true,
                    url: url
                }, null, url)
            };
            Page.visit = function (url) {
                window.location = url;
            }
            Page.refresh = function (t, e) {
                var n, o, i;
                return null == t && (t = {}), n = t.url ? t.url : t.queryParams ? (o = $.param(t.queryParams), o ? o = "?" + o : void 0, location.pathname + o) : location.href, t.response ? (t.partialReplace = !0, t.onLoadFunction = e, i = t.response, delete t.response, Turbolinks.loadPage(null, i, t)) : (t.partialReplace = !0, e && (t.callback = e), Turbolinks.visit(n, t))
            }
            Page.open = function () {
                return window.open.apply(window, arguments)
            }

            Page.init = function () {
                initializePage();
            }

            // END: Page - Public Static Functions
        }.call(this),
        function () {
            // ---------------------------------------------------------------------------------
            // Sapo Js API - Sapo.Utility
            //
            // All Utility of Sapo API.
            // ---------------------------------------------------------------------------------

            Sapo.Utility = {
                loadAjax: function (url, ele, callback, options) {
                    NProgress.start();

                    if (options == null) {
                        //options = { hide: true };
                        options = {};
                    }
                    return $.ajax({
                        url: url,
                        success: function (data) {
                            if (options.beforeBind) {
                                options.beforeBind();
                            }

                            if (options.hide) {
                                Sapo.Modal.hide();
                                $(".modal-backdrop.fade.in").remove();
                            }
                            Bindings.unbind($(ele).get(0));
                            var html = "";
                            var $data = $(data);
                            var $ele = $data.find(ele);
                            var title = null;

                            var match = data.match("<title>(.*?)</title>");
                            if (match != null && match.length > 0) {
                                title = match[1];
                            }
                            if ($ele.length > 0) {
                                var html = $ele.html();
                            }
                            else {
                                html = data;
                            }
                            $(ele).html(html);
                            if (title != null && title != "") {
                                $("head title").html(title);
                            }
                            var javascript = $(data).find(".section-footer").html();
                            $(".section-footer").html(javascript);

                            Bindings.bind($(ele).get(0));
                            if (callback) {
                                callback();
                            }

                        },
                        statusCode: {
                            403: function () {
                                Sapo.Utility.handleForbiddenRequest();
                            },
                            451: function () {
                                window.location.href = '/admin/authorization/login';
                            }
                        },
                        complete: function () {
                            options.complete ? options.complete() : "";
                        }
                    });
                },
                getThumb: function (srcFile, type) {
                    //if (srcFile == "") {
                    //    return "";
                    //}
                    //if (srcFile.startsWith("//")) {
                    //    srcFile = "http:" + srcFile;
                    //}
                    //if (type.toLowerCase() == "original") {
                    //    srcFile = srcFile.replace("http://", "//").replace("https://", "//");
                    //    return srcFile;
                    //}
                    //var url = new URL(srcFile);
                    //var pathname = url.pathname + url.search;
                    //return Sapo.routes.domain.thumb + type.toLowerCase() + pathname;
                    return srcFile;
                },
                postLink: function (url, paramters) {
                    var $form = $("<form>");
                    $form.attr("method", "post");
                    $form.attr("action", url);

                    if (paramters == null)
                        paramters = [];

                    for (param in paramters) {
                        if (param != null & pram.length > 1)
                            $form.append("<input type='hidden' name='" + param[0] + "' value='" + param[1] + "'");
                    }

                    $(document.body).append($form);
                    $form.submit();
                },
                isNumeric: function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                },
                getParameter: function (name) {
                    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                        results = regex.exec(location.search);
                    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                },
                isMobile: function () {
                    return $(window).width() < 855;
                },
                toggleSidebar: function () {
                    var navDrawer = Bindings.context(document.body).navDrawer;
                    if (Sapo.Utility.isMobile()) {
                        if (navDrawer) {
                            if (navDrawer.isOpen) {
                                navDrawer.close();
                            }
                            else {
                                navDrawer.open();
                            }
                        }
                    }
                    else {
                        $(".page-wrapper").toggleClass("page-minimize");
                        if (navDrawer && navDrawer.isOpen) {
                            navDrawer.close();
                        }
                    }
                },
                hideSidebar: function () {
                    var navDrawer = Bindings.context(document.body).navDrawer;
                    if (Sapo.Utility.isMobile()) {
                        if (navDrawer && navDrawer.isOpen) {
                            navDrawer.close();
                        }
                    }
                    else {
                        $(".page-wrapper").addClass("page-minimize had-minimize");
                        if (navDrawer && navDrawer.isOpen) {
                            navDrawer.close();
                        }
                    }
                },
                showSidebar: function () {
                    var navDrawer = Bindings.context(document.body).navDrawer;
                    if (Sapo.Utility.isMobile()) {
                        if (navDrawer && !navDrawer.isOpen) {
                            navDrawer.open();
                        }
                    }
                    else {
                        $(".page-wrapper").removeClass("page-minimize");
                    }
                },
                toggleMenu: function () {
                    $(".page-wrapper").toggleClass("page-hide-menu");
                },
                showMenu: function () {
                    $(".page-wrapper").removeClass("page-hide-menu");
                },
                hideMenu: function () {
                    $(".page-wrapper").addClass("page-hide-menu");
                },
                getCookie: function (cname) {
                    var name = cname + "=";
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') c = c.substring(1);
                        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                    }
                    return "";
                },
                decodeHtml: function (text) {
                    return $('<textarea />').html(text).text();
                },
                changeUrl: function (url) {
                    window.history.pushState(null, null, url);
                },
                checkReadyState: function (url, time) {
                    var chkReadyState = setInterval(function () {
                        Sapo.Utility.changeUrl(url);
                        if (document.readyState == "complete") {
                            Sapo.Utility.changeUrl(url);
                            clearInterval(chkReadyState)
                        }
                    }, 1);
                },
                checkRefreshBrowser: function (url, time) {
                    var a, b = false;

                    window.onbeforeunload = function (e) {
                        if (b) return;
                        a = setTimeout(function () {
                            b = true;
                            window.location.href = url;
                        }, time);
                        //return "Do you really want to leave now?";
                    }
                    window.onunload = function () {
                        clearTimeout(a);
                    }
                },
                pagingUpdateLink: function (controller, actionPaging) {
                    var numerCurrent = -1;
                    $('.pagination a').each(function () {

                        numerCurrent++;
                        var page;
                        var query = this.href.substring(1);
                        var paramers = query.split("?");
                        if (typeof paramers[1] != 'undefined') {
                            //var txt = this.text();
                            var query_string = {};
                            var vars = paramers[1].split("&")
                            for (var i = 0; i < vars.length; i++) {
                                var pair = vars[i].split("=");
                                // If first entry with this name
                                if (typeof query_string[pair[0]] === "undefined") {
                                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                                    // If second entry with this name
                                } else if (typeof query_string[pair[0]] === "string") {
                                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                                    query_string[pair[0]] = arr;
                                    // If third or later entry with this name
                                } else {
                                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                                }
                            }
                            var page = query_string.page;
                            if (typeof page == 'undefined')
                                page = numerCurrent;
                            if (controller == "shippers")
                                this.href = "/admin/" + controller + "/" + query_string.id + "/" + actionPaging + "&page=" + page;
                            else
                                if (query_string.IssuedOnMax != null)
                                    this.href = "/admin/" + controller + "/" + query_string.id + "/" + actionPaging + "?page=" + page + "&IssuedOnMax=" + query_string.IssuedOnMax + "&IssuedOnMin=" + query_string.IssuedOnMin + "";
                                else
                                    this.href = "/admin/" + controller + "/" + query_string.id + "/" + actionPaging + "?page=" + page + "";
                        }



                    })
                },
                validateFormInPage: function () {
                    var $form = $(".colRight").find("form");
                    if ($form.length != 0) {
                        $form.data("validator", null);
                        $.validator.unobtrusive.parse(document);
                        if ($form.data("unobtrusiveValidation")) {
                            $form.validate($form.data("unobtrusiveValidation").options);
                        }
                    }
                },
                handleForbiddenRequest: function (redirect, massage) {
                    redirect = typeof redirect !== 'undefined' ? redirect : true;
                    if (massage != undefined && massage != null) {
                        Sapo.Flash.error(massage);
                    }
                    else {
                        if (redirect) {
                            window.location.href = "/admin/authorization/accessdenied";
                        } else {
                            Sapo.Flash.error("Bạn không có quyền thực hiện chức năng này !");
                        }
                    }

                }, changeNumber: function () {
                    jQuery(function ($) {
                        if ($('.floatConvert').length) {

                            $('.floatConvert').number(true, 1);
                        }
                        if ($('.intConvert').length) {

                            $('.intConvert').number(true, 0);
                        }
                        if ($('.floatConvert2').length) {

                            $('.floatConvert2').number(true, 2);
                        }
                    });
                },
                generateGUID: (typeof (window.crypto) != 'undefined' &&
                    typeof (window.crypto.getRandomValues) != 'undefined') ?
                    function () {
                        // If we have a cryptographically secure PRNG, use that
                        // https://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
                        var buf = new Uint16Array(8);
                        window.crypto.getRandomValues(buf);
                        var S4 = function (num) {
                            var ret = num.toString(16);
                            while (ret.length < 4) {
                                ret = "0" + ret;
                            }
                            return ret;
                        };
                        return (S4(buf[0]) + S4(buf[1]) + "-" + S4(buf[2]) + "-" + S4(buf[3]) + "-" + S4(buf[4]) + "-" + S4(buf[5]) + S4(buf[6]) + S4(buf[7]));
                    }
                    :
                    function () {
                        // Otherwise, just use Math.random
                        // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
                        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                            return v.toString(16);
                        });
                    }
            }
        }.call(this),
        function () {
            Sapo.Loading = {
                start: function () {
                    NProgress.start();
                },
                stop: function () {
                    NProgress.done();
                }
            }
        }.call(this),
        function () {
            // ---------------------------------------------------------------------------------
            // Sapo Js API - Sapo.Modal
            //
            // Working with Modal.
            // ---------------------------------------------------------------------------------

            var modalContainer = "sapo-modal";
            var applyObjectToEvent = function (event, object) {
                return function () {
                    return event.apply(object, arguments)
                }
            }
            Sapo.Modal = function () {

                function Modal(e, options) {
                    this.show = applyObjectToEvent(this.show, this);

                    this.modalContainer = $("#" + modalContainer);
                    this.node = e;
                    this.options = {};
                    if (options != null)
                        this.options = options;
                };

                // BEGIN: Modal - Public Static Functions
                Modal.container = function () {
                    return document.getElementById(modalContainer);
                }
                Modal.hide = function () {
                    var currentContainer = Sapo.Modal.container();
                    if (currentContainer != null)
                        if (currentContainer.currentModal != null)
                            currentContainer.currentModal.hide();
                        else {
                            if (currentContainer.style.display == "block") {
                                currentContainer.style.display = "none";
                            }
                        }

                };
                // END: Modal - Public Static Functions

                // BEGIN: Modal - Public Functions
                Modal.prototype.onClickHide = function (e) {
                    e.preventDefault();
                    Sapo.Modal.hide();
                };
                Modal.prototype.bindingsContext = function () {
                    return Bindings.childContext(this.node)
                }
                Modal.prototype.show = function (modalData) {

                    if (modalData == null)
                        modalData = {};

                    if (modalData.context == null)
                        modalData.context = this.bindingsContext();

                    if (this.modalContainer.length > 0) {
                        if (this.modalContainer[0].currentModal)
                            this.modalContainer[0].currentModal.hide();

                        this.modalContainer[0].currentModal = this;
                    }

                    if (modalData.content == null) {
                        var modalSrc = this.node.href;
                        if (modalSrc != null) {
                            this.fetchHTML(modalSrc, modalData);
                            return;
                        }
                    }

                    if (modalData.content != null)
                        this.modalContainer.html(modalData.content);
                    else
                        this.modalContainer.html(this.node.innerHTML);

                    Bindings.bind(this.modalContainer[0], modalData.context).refreshImmediately();

                    this.modalContainer.on("click", ".close-modal", this.onClickHide);

                    if (typeof modalData.onRender == "function")
                        modalData.onRender();

                    this._rebindValidation();

                    this.modalContainer.modal({ backdrop: "static", keyboard: false });
                    this.modalContainer.modal("show");

                    this.isShown = true;
                    this._focusFirstInput(this.modalContainer);

                };
                Modal.prototype._rebindValidation = function () {
                    var $form = this.modalContainer.find("form");
                    if ($form.length != 0) {
                        $form.data("validator", null);
                        $.validator.unobtrusive.parse(document);
                        if ($form.data("unobtrusiveValidation")) {
                            $form.validate($form.data("unobtrusiveValidation").options);
                        }
                    }
                }
                Modal.prototype.hide = function (modalData) {
                    if (modalData == null)
                        modalData = {};

                    if (this.isShown) {
                        this.modalContainer.modal("hide");

                        if (this.options.move)
                            $(this.node).append(this.modalContainer.children());
                        else
                            Bindings.unbind(this.modalContainer[0]);

                        this.modalContainer.empty();
                        this.modalContainer[0].currentModal = null;
                        this.isShown = false;
                    }
                }
                Modal.prototype.fetchHTML = function (url, modalData) {
                    var currentModel = this;

                    if (modalData == null)
                        modalData = {};

                    $.ajax({
                        url: url,
                        dataType: "html",
                        data: modalData.data,
                        success: function (content) {
                            return currentModel.show({
                                context: modalData.context,
                                content: content,
                                onRender: modalData.onRender
                            });
                        }
                    });
                }
                Modal.prototype._focusFirstInput = function ($container) {
                    return $container.find("input:visible:enabled").first().focus()
                }
                // END: Modal - Public Functions

                Modal.name = "Modal";
                return Modal;
            }();
        }.call(this),
        function () {
            // ---------------------------------------------------------------------------------
            // Sapo Js API - Sapo.Flash
            //
            // Working with Global Notifications.
            // ---------------------------------------------------------------------------------

            $(document).on("ready page:load", function () {
                var $container = $(".ajax-notification-message");
                var hasError = $container.hasClass("error");

                var message = $container.text();
                if (message !== null && message != "")
                    Sapo.Flash.display(message, hasError);
            });

            Sapo.Flash = {
                error: function (message, timeout, parent) {
                    if (timeout == null)
                        timeout = 5e3;
                    if (parent == null)
                        Sapo.Flash.display(message, true, timeout);
                    else
                        Sapo.Flash.displayparent(message, true, timeout);

                },
                notice: function (message, timeout, parent) {
                    if (timeout == null)
                        timeout = 3e3;
                    if (parent == null)
                        Sapo.Flash.display(message, false, timeout);
                    else
                        Sapo.Flash.displayparent(message, false, timeout);
                },
                display: function (message, hasError, timeout) {
                    var $container = $(".ajax-notification");
                    if (timeout == null)
                        timeout = 3e3;

                    clearTimeout(timeout);
                    $(".ajax-notification-message").text(message);
                    if (hasError != null) {
                        $container.toggleClass("has-errors", hasError);
                        if (hasError) {
                            $container.find(".ajax-notification-message").prepend('<i class="fa fa-times-circle" aria-hidden="true" style="padding-right: 4px;"></i>');
                        } else {
                            $container.find(".ajax-notification-message").prepend('<i class="fa fa-check-square" aria-hidden="true" style="padding-right: 4px;"></i>');
                        }
                    }
                    $container.addClass("is-visible");
                    setTimeout(Sapo.Flash.hide.bind(this), timeout);
                },
                displayparent: function (message, hasError, timeout) {
                    var $container = $(".ajax-notification");

                    if (hasError != null)
                        $container.toggleClass("has-errors", hasError);
                    if (timeout == null)
                        timeout = 3e3;

                    clearTimeout(timeout);
                    $(".ajax-notification-message").text(message);
                    $(".close-notification").attr("onlick", "Sapo.Flash.hideparent()");
                    $container.addClass("is-visible");

                    setTimeout(Sapo.Flash.hideparent.bind(this), timeout);
                },
                hide: function () {

                    $(".ajax-notification").removeClass("is-visible");
                    $(".ajax-notification-message").text("");
                },
                hideparent: function () {

                    $(".ajax-notification").removeClass("is-visible");
                    $(".ajax-notification-message").text("");
                },
                popup: function (url, width, height, top) {
                    $(".popup-box").dialog("destroy");
                    $(".popup-box").show();
                    $(".popup-box").dialog({
                        width: width,
                        height: height,
                        top: top,
                        closeText: "",
                        title: 'Pop up hệ thống',
                        modal: true,
                        padding: 0,
                        resizable: false,
                        draggable: false,
                        show: { effect: "toggle", fold: 1000 },
                        hide: { effect: "toggle", fold: 1000 },
                        //buttons: [
                        //            {
                        //                text: "Lưu", class: "btn btn-success button-dialoge ", id: "btn-add-2-Prd", tabindex: "17", name: "savePrd", click: function () { document.getElementById("popup").contentWindow.$(".form-add-Prd #btn-add-2-Prd").click(); }
                        //            },
                        //            {
                        //                text: "Lưu & Thêm mới", class: "btn btn-success button-dialoge", tabindex: "18", name: "savePrd", id: "btn-add-1-Prd", click: function () { document.getElementById("popup").contentWindow.$(".form-add-Prd #btn-add-1-Prd").click(); }
                        //            }],
                        left: 60,
                        position: "fixed",
                        open: function (ev, ui) {
                            $('.ui-dialog-buttonpane')
                                .find('button:nth-child(1)')
                                .prepend(' <span class=" glyphicon glyphicon-floppy-save"></span>');

                            $('#popup').attr('src', url);

                        },
                        close: function (ev, ui) {
                            $(".popup-box").dialog("destroy");
                        }
                    });
                    $(".ui-widget-overlay").bind("click", function () {
                        $('.popup-box').dialog().dialog("close");

                    });
                }
            };
        }.call(this)
}