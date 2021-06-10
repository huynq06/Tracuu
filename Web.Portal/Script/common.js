{
    (
        function () {
            const ajaxUrls = {
                searchAccount: '/admin/orders/pos/SearchAccount',
                variantDropdown: '/admin/orders/pos/VariantsDropdown',
                getUnitByProduct: '/admin/orders/pos/GetUnitsByProduct',
                getOrderClone: '/admin/orders/pos/GetOrderClone',
                searchCustomer: '/admin/orders/pos/SearchCustomer',
                searchAddressCustomer: '/admin/orders/pos/SearchAddressCustomer',
                changePrice: '/admin/orders/pos/ChangePrice',
                getVariantByUnit: '/admin/orders/pos/GetVariantByUnit',
                editPos: '/admin/orders/pos/EditPos',
                createPos: '/admin/orders/pos/CreatePos',
                cancelOrder: '/admin/orders/pos/Cancel',
                zaloPayGetQrCode: '/admin/orders/pos/ZaloPayGetQrCode',
                cancelPrePayment: '/admin/orders/pos/CancelPrePayment',
                createPayment: '/admin/orders/pos/Payment',
                updateFulFill: '/admin/orders/pos/UpdateFulfill',
                printQrCode: '/admin/pos/PrintQrCode',
                categories: '/admin/orders/pos/categories',
                getAllVariant: '/admin/orders/pos/GetAllVariant',
                indexReturns: '/admin/orders/pos/indexreturns',
                getPromotions: '/admin/orders/pos/GetPromotions',
                getAllVariantForSuggestion: '/admin/orders/pos/GetAllVariantForSuggestion',
                getManualListVariantFromSavedSearch: '/admin/orders/pos/GetManualListVariantFromSavedSearch',
                storeSavedSearchForManualListVariant: '/admin/orders/pos/StoreSavedSearchForManualListVariant',
                getVariantByFilter: '/admin/orders/pos/GetVariantByFilter',
                checkConditionLoyalty: '/admin/orders/pos/CheckConditionLoyalty',
                updateguidestatus: '/admin/orders/pos/updateguidestatus',
                listVariantExchange: '/admin/orders/pos/ListVariantExchange',
                posUriPrefix: '/admin/pos/',
                vnPayGetQrCode: '/admin/orders/pos/VnPayGetQrCode',
                variantSerial: '/admin/orders/pos/SearchVariantBySerial',
                variantInCategory: '/admin/orders/pos/GetVariantByCategory'
            }
            var applyObjectToEvent = function (event, object) {
                return function () {
                    return event.apply(object, arguments)
                }
            }

            Sapo.unitheight = 40;
            Sapo.PosOrder = function () {
                var performance = window.performance;
                var t0 = performance.now();
                function PosOrder(element, options) {
                    if (options) {
                        var property;
                        for (property in options) this[property] = options[property];
                    }
                    var that = this;
                    console.log(that);
                    that.loadCategoryBrand();
                    this.countin = 0;
                    that.order.seperate_product = false;
                    that.order.print_order = true;
                    var order = that.initTabActive();
                    //that.scaner = "normal";
                    //order.seperate_product = false;
                    //order.print_order = true;
                    //if (order.order_line_items != null) {
                    //    for (var i = 0; i < order.order_line_items.length; i++) {
                    //        Sapo.popover($("span#sapo-popover" + i));
                    //        Sapo.popover($("i#sapo-popover" + i));
                    //        order.order_line_items[i].rank = i;
                    //    }
                    //}

                    //tooltip($("div"));
                    //tooltip($("i"));
                    //tooltip($("span"));
                    //tooltip($("a"));
                    //$("[data-toggle=popover]").popover({ html: true });
                    //that.scanerBarCode();
                    ////if (order.type_action == "createold") {
                    ////    $(".order-menu-screen__left").css({ "min-height": $(window).height() - 63 - $(".order-menu-screen__left-payment").height() });
                    ////}

                    //$(window).resize(function () {
                    //    that.updateScollBar();
                    //    that.showButtonTabListArrow();
                    //    that.creatScrollTabPromotion();
                    //});
                    //$("#search-input").focus(function () {
                    //    $(".search-layout-common i").css({ "color": "#0088FF" });
                    //});
                    //$("#search-input-customer").focus(function () {
                    //    $(".order-menu-screen__right_detailorder-price i").css({ "color": "#0088FF" });
                    //});
                    //that.checkRefreshBrowser();
                    //order.customer_default = { id: 0, shipping_address: null, billing_address: null }
                    //order.customer = order.customer_default;

                    //order.isShippingCustom = applyObjectToEvent(this.isShippingCustom, this);
                    //if (order.type_action != "createold") {
                    //    that.initSelect();
                    //}
                    ////Account
                    //that.autoCompleteAccount();
                    //that.autoComplete();
                    //that.autoCompleteCustomer();
                    //var imageUrl = '/images/image-default.png';
                    //var html = "<img style='display: none' src='" + imageUrl + "'>";
                    //$("#popup").attr('name', 'popup');
                    //$("#popup").css('font-size', '16px');
                    //$('#popup').contents().find('body').append(html);
                    //var iframe = document.getElementById("popup").contentWindow;
                    //iframe.focus();

                    //if (order.is_normal_discount_percent) {
                    //    $("#floatdiscount").show();
                    //    $("#intdiscount").hide();
                    //    $("#floatdiscount").number(true, 2);
                    //}
                    //else {
                    //    $("#floatdiscount").hide();
                    //    $("#intdiscount").show();
                    //    $("#intdiscount").number(true, 0);
                    //}
                    //that.loadPagePaginationAddedOfflineModify();
                    //that.setLinkPaper();
                    //Sapo.setDatePicker();
                    //$(window).resize(function () {
                    //    that.updateScollBar();
                    //});
                    that.initAllTab();
                    //that.createScollBar();
                    //that.createHorizontal();
                    //that.creatScrollTabPromotion();
                    //that.changeSeperateProduct();
                    //that.keyCodePay();
                    //$(document).mouseup(function (e) {
                    //    var container = $('.autocomplete-items').find("div");
                    //    if (!container.is(e.target)) {
                    //        var x = document.getElementsByClassName("autocomplete-items");
                    //        for (var i = 0; i < x.length; i++) {
                    //            x[i].parentNode.removeChild(x[i]);
                    //        }
                    //    }
                    //});
                    //var accountId = $("#AssigneeId option:selected").val();
                    //var currentdate = new Date();
                    //var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
                    //var url = "/admin/reports/sales/by_end_day?AccountIds=" + accountId + "&LocationIds=" + that.order.location_id + "&Date=" + date;
                    //$(".report-endday").attr("href", url); datadropdownN();

                    //if (that.order.copy_of_order_id != 0) {
                    //    Sapo.Utility.changeUrl(ajaxUrls.posUriPrefix + $("#LocationId").val());
                    //    that.loadTabActiveOrderClone(that.order.copy_of_order_id);
                    //}
                    //Sapo.Utility.changeNumber()


                    //window.focus();
                    ////if (order.account.guide_status != null && order.account.guide_status != undefined && order.account.guide_status != "" && order.account.guide_status.indexOf("pos") >= 0) {

                    ////} else {
                    ////    that.startIntro();
                    ////};


                    //$(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
                    //    var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
                    //    var event = state ? 'FullscreenOn' : 'FullscreenOff';

                    //    that.createHorizontal();
                    //    that.updateScollBar();
                    //});
                    ////if (that.order.tenant_setting.allow_offline_sale != null && that.order.tenant_setting.allow_offline_sale == true) {
                    ////    let accountId = that.order.account.id
                    ////    let cookieVariantFilterJson = getCookie("variant_filter_" + accountId);
                    ////    let variantFilterFromCookie = {};
                    ////    if (cookieVariantFilterJson == undefined || cookieVariantFilterJson == null || cookieVariantFilterJson.trim() == '') {
                    ////        variantFilterFromCookie.usedFilter = 'auto';
                    ////        variantFilterFromCookie.autoFilter = {};
                    ////        variantFilterFromCookie.autoFilter.checkTop = false;
                    ////        variantFilterFromCookie.autoFilter.topsaleCriteria = "quantity";
                    ////        variantFilterFromCookie.autoFilter.categoryIds = [];
                    ////        variantFilterFromCookie.autoFilter.brandIds = [];
                    ////    }
                    ////    else {
                    ////        try {
                    ////            variantFilterFromCookie = JSON.parse(cookieVariantFilterJson);
                    ////            if (!variantFilterFromCookie.usedFilter) {
                    ////                variantFilterFromCookie.usedFilter = 'auto';
                    ////            }
                    ////        }
                    ////        catch (err) {
                    ////            variantFilterFromCookie.usedFilter = 'auto';
                    ////            variantFilterFromCookie.autoFilter = {};
                    ////            variantFilterFromCookie.autoFilter.checkTop = false;
                    ////            variantFilterFromCookie.autoFilter.topsaleCriteria = "quantity";
                    ////            variantFilterFromCookie.autoFilter.categoryIds = [];
                    ////            variantFilterFromCookie.autoFilter.brandIds = [];
                    ////        }
                    ////    }
                    ////    //if (variantFilterFromCookie.usedFilter == 'auto')
                    ////    //    variantFilterFromCookie.autoFilter.checkTop = false;
                    ////    that.variantFilter = variantFilterFromCookie;
                    ////    that.variantFilter.page = 1;
                    ////}
                    //if (!offline && that.order !== undefined) {
                    //    if ((that.order.zalo_pay_payment_method_id !== undefined && that.order.zalo_pay_payment_method_id > 0)
                    //        || (that.order.vnpay_payment_method_id !== undefined && that.order.vnpay_payment_method_id > 0)) {
                    //        that.connectSocketZaloPay()
                    //    }
                    //}
                    //that.checkCreate = false;
                }

                var sessions = [];
                var countConnectError = 0;
                PosOrder.prototype.loadCategoryBrand = function () {
                    var that = this;
                    var order = that.initTabActive();

                    $.ajax({
                        url: "/admin/brands.json",
                        dataType: "json",
                        type: "GET",
                        success: function (data) {
                            if (data != null && data != undefined &&
                                data.brands != null && data.brands != undefined) {
                                order.brands = data.brands;
                                if (that.order != null && that.order != undefined)
                                    that.order.brands = data.brands;

                            }
                        },
                        complete: function () {
                        }
                    })
                    $.ajax({
                        url: "/admin/categories.json",
                        dataType: "json",
                        type: "GET",
                        success: function (data) {
                            if (data != null && data != undefined &&
                                data.categories != null && data.categories != undefined) {
                                order.categories = data.categories;
                                if (that.order != null && that.order != undefined)
                                    that.order.categories = data.categories;
                            }
                        },
                        complete: function () {
                        }
                    })
                }
                PosOrder.prototype.connectSocketZaloPay = function () {
                    var session = {};
                    var that = this;
                    let socket = new SockJS('/admin/notifications/ws');
                    let client = webstomp.over(socket);
                    client.connect({}, function (frame) {
                        session.client = client;
                        session.sessionId = /\/([^\/]+)\/websocket/.exec(socket._transport.url)[1];;
                        session.subscriptions = [];

                        let s1 = client.subscribe('/user/topic/qrpay', function (message) {
                            that.showMessageZaloPay(JSON.parse(message.body), session);
                        }, {});
                        session.subscriptions.push(that.genSubscription(s1, '/user/topic/qrpay'));
                        sessions.push(session);
                        countConnectError = 0;
                    }, function (error) {
                        countConnectError++;
                        disconnectAll();
                        if (!offline && countConnectError <= 10) {
                            that.connectSocketZaloPay()
                        }
                    });

                    client.reconnect_delay = 5000;
                }
                function disconnectAtIndex(index) {
                    if (sessions.length > index) {
                        sessions[index].client.disconnect();
                        let sessionId = sessions[index].sessionId;
                        sessions.splice(index, 1);
                    }
                }

                function disconnectAll() {
                    for (var i = sessions.length - 1; i >= 0; i--) {
                        disconnectAtIndex(i);
                    }
                }

                PosOrder.prototype.genSubscription = function (sub, dest) {
                    var subscription = {};
                    subscription.sub = sub;
                    subscription.dest = dest;
                    return subscription;
                }


                PosOrder.prototype.autoCompleteAccount = function () {
                    var that = this;
                    if ($(".search-account").length > 0 && $("#search-result-holder-account").length > 0) {
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
                                    url: ajaxUrls.searchAccount,
                                    data: { query: $(".search-account").val() },
                                    dataType: "json",
                                    type: "GET",
                                    success: function (data) {
                                        if (data.metadata != null && data.metadata.total != null) {
                                            total = data.metadata.total
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
                                                url: ajaxUrls.searchAccount,
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
                                $("#search-result-holder-account .ui-autocomplete").css({ "width": "250px", "max-height": "345px", "margin-top": "2px !important", "z-index": "10" });
                            },
                            close: function () {

                            },
                            focus: function (event, ui) {
                            },
                            create: function (event, ui) {
                            },
                            select: function (event, ui) {
                                that.setAccount(ui.item.account);
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
                PosOrder.prototype.setAccount = function (account) {
                    var that = this;
                    var order = this.initTabActive();
                    order.assignee_id = account.id;
                    order.assignee_name = account.full_name;
                    that.assignee_id = account.id;
                    that.assignee_name = account.full_name;
                    $(".search-account").val(that.assignee_name)
                    Bindings.refreshImmediately();
                }

                PosOrder.prototype.updateGuideStatus = function (status) {
                    $.ajax({
                        url: ajaxUrls.updateguidestatus,
                        type: "POST",
                        data: { guideStatus: status },
                        success: function (result) {
                            NProgress.done();
                            if (result > 0) {
                            }
                            else {
                                Sapo.Flash.error("error");
                            }
                        },
                        error: function (data) {
                            NProgress.done();
                            if (data.status == 403) {
                                NProgress.done();

                                Sapo.Utility.handleForbiddenRequest(false); return;
                            }
                            var your_object = JSON.parse(data.responseText);
                            Sapo.Flash.error(your_object.error.replace(/\n/g, '; ').replace(/; $/, ''));
                        }
                    });
                }

                PosOrder.prototype.startIntro = function () {
                    var intro = introJs();
                    var that = this
                    intro.oncomplete(function () {
                        that.updateGuideStatus("pos");
                    });
                    intro.onexit(function () {
                        that.updateGuideStatus("pos");
                    });
                    intro.setOptions({
                        nextLabel: '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>',
                        prevLabel: '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
                        showStepNumbers: false,
                        showBullets: false,
                        steps: [
                            {
                                element: document.querySelector('.step1'),
                                intro: "Bạn chỉ cần gõ tên sản phẩm vào ô tìm kiếm hoặc dùng máy quét mã vạch để thêm 1 sản phẩm vào đơn hàng.",
                                position: 'right'
                            },
                            {
                                element: '.step2',
                                intro: "Nhập số tiền khách hàng đưa để thanh toán cho đơn hàng.",
                                position: 'left'
                            },
                            {
                                element: '.step3',
                                intro: "Ấn vào icon để tắt bật in hóa đơn tự động sau khi thanh toán.<br/>(Icon màu xanh thể hiện chế độ in đang được bật)",
                                position: 'left'
                            },
                            {
                                element: '.step4',
                                intro: 'Ấn vào đây để hoàn tất việc bán hàng. Xem thêm video hướng dẫn sử dụng <a style="color:0088ff" href="https://support.sapo.vn/tao-don-ban-tai-cua-hang-pos" target="_blank">tại đây</a> ',
                                position: 'left'
                            }
                        ]
                    });

                    intro.start();
                }
                PosOrder.prototype.searchinput = function () {
                    $(".search-layout-common i").css({ "color": "" });
                }
                PosOrder.prototype.searchinputcustomer = function () {
                    $(".order-menu-screen__right_detailorder-price i").css({ "color": "" });
                }
                PosOrder.prototype.getLocationId = function () {

                    var that = this;
                    var a = database;
                    database.getLocation(function (location) {

                        if (location == undefined) {
                            database.insertLocation({ id: 69, locationid: that.order.location_id });
                            return false
                        }
                        var order = that.initTabActive();
                        if (that.order.location_id == location.locationid) {
                            return false;
                        }
                        that.order.location_id = location.locationid;
                        order.location_id = location.locationid;
                        window.location.href = ajaxUrls.posUriPrefix + that.order.location_id;
                    });

                }
                PosOrder.prototype.loadPos = function () {//chuyển kho load lại dữ liệu
                    var that = this;
                    window.location.href = ajaxUrls.posUriPrefix + $("#select-location option:selected").val();
                }
                PosOrder.prototype.updateOrderDataBase = function () {
                    var that = this;
                    window.location.href = ajaxUrls.posUriPrefix + that.order.location_id;
                }
                PosOrder.prototype.checkRefreshBrowser = function () {
                    var that = this;
                    var a, b = false;
                }
                var isModalPaymentOrderShow = false;
                PosOrder.prototype.keyCodePay = function () {//lấy lại dữ liệu cũ
                    NProgress.done();
                    Sapo.NewModal.hide();
                    var that = this;

                    $(document).bind("keydown", function (event) {
                        var barcode = "";
                        var order = that.initTabActive();


                        //F1 : Thanh toán
                        if (event.which == 112) {
                            event.preventDefault();
                            event.keyCode = 0;
                            if (!that.checkCreate) {
                                if (offline) {
                                    that.createPosOrderOffline('fulfilled');
                                } else {
                                    that.isPaid();
                                    return;
                                }
                            }

                        }
                        //F2 :
                        if (event.which == 113) {
                            event.preventDefault();
                            event.keyCode = 0;
                            $("#money_return").focus().select();
                            return;

                        }
                        //F3 : Đặt hàng
                        if (event.which == 114) {
                            event.preventDefault();
                            event.keyCode = 0;
                            $(".search-input").focus().select();
                            return;
                        }
                        //F4 :Tìm kiếm khách hàng
                        if (event.which == 115) {
                            event.preventDefault();
                            event.keyCode = 0;
                            that.closeCustomer();

                            if (order.edit_order == true) {
                                return;
                            }
                            Bindings.refreshImmediately();
                            $(".search-customer").focus().select();
                            return;
                        }
                        //F6: Chiet khau
                        if (event.which == 117) {
                            event.preventDefault();
                            event.keyCode = 0;
                            if (that.isTotalOrderDiscountDisable()) {
                                that.showDiscountOrder($(".discount-order"));
                                Bindings.refreshImmediately();
                            } else {

                                $(".order-discount-value").focus().select();
                            }
                            return;
                        }
                        //F7: Nhap tien khach dua
                        if (event.which == 118) {
                            event.preventDefault();
                            event.keyCode = 0;
                            that.showPaymentOrder();
                            return;
                        }


                        else if (event.which == 120) {
                            event.preventDefault();
                            event.keyCode = 0;
                            that.addLineDifItem();
                            return;
                        }
                            //Left - Right arrow
                        else if (event.which == 37 || event.which == 39) {
                            //$rootScope.$broadcast('move-arrow', event.which);
                            return;
                        }
                        else if ((event.which || event.keyCode) == 116) {
                            event.preventDefault();
                            event.keyCode = 0;
                            that.updateOrderDataBase();
                        }
                        if (event.which == 27) {

                            if ($(".modal-zalo-success").length > 0 || $(".alert-modal").length > 0 || $(".modal-zalo-waiting").length > 0) {
                                event.preventDefault();
                                event.keyCode = 0;
                                that.deleteActiveOrder();
                                that.setIndexOrders();
                                that.setTabOrderActive();
                                return;
                            }

                        }
                            //F10: Quét mã vạch
                        else if (event.which == 121) {
                            event.preventDefault();
                            event.keyCode = 0;
                            if (that.scaner == "normal") {
                                if (order.tenant_setting.allow_product_serial) {
                                    that.setScaner('serial');
                                }
                                else if (order.tenant_setting.integrated_scales) {
                                    that.setScaner('scale');
                                }
                            }
                            else if (that.scaner == "serial") {
                                if (order.tenant_setting.integrated_scales) {
                                    that.setScaner('scale');
                                }
                                else
                                    that.setScaner('normal');
                            }
                            else if (that.scaner == "scale") {
                                that.setScaner('normal');
                            }
                            return;
                        }
                    });
                }
                PosOrder.prototype.setScaner = function (type) {
                    var that = this;
                    //var order = that.initTabActive();
                    that.scaner = type;
                    $(`#scaner-normal`).hide();
                    $(`#scaner-serial`).hide();
                    $(`#scaner-scale`).hide();
                    $(`#scaner-${type}`).show();
                    if (type == "normal")
                        Sapo.Flash.notice("Chuyển sang chế độ quét mã barcode");
                    else if (type == "serial")
                        Sapo.Flash.notice("Chuyển sang chế độ quét sản phẩm serial");
                    else if (type == "scale")
                        Sapo.Flash.notice("Chuyển sang chế độ quét cân điện tử");
                }
                PosOrder.prototype.fullScreen = function () {
                    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                        if (document.documentElement.requestFullScreen) {
                            document.documentElement.requestFullScreen();
                        } else if (document.documentElement.mozRequestFullScreen) {
                            document.documentElement.mozRequestFullScreen();
                        } else if (document.documentElement.webkitRequestFullScreen) {
                            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                        }

                    } else {
                        if (document.cancelFullScreen) {
                            document.cancelFullScreen();
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        } else if (document.webkitCancelFullScreen) {
                            document.webkitCancelFullScreen();
                        }
                    }
                }

                PosOrder.prototype.scanerBarCode = function () {
                    var that = this;
                    var checkPost = true;
                    $(document).pos();
                    $(document).on('scan.pos.barcode', function (event) {
                        t0 = performance.now();
                        var order = that.initTabActive();
                        var barcode = event.code;
                        if (that.scaner === "normal" || that.scaner === "scale") {
                            if ((barcode.length == 13) && (that.scaner === "scale" && barcode.substr(0, 2) == order.tenant_setting.prefix_scales)) {
                                var code = barcode.substr(2, 5);
                                if (offline) {
                                    Variant.dao.getByBarcode({ term: code }, function (data) {
                                        if (data.length > 0) {
                                            data[0].quantity = parseFloat(barcode.substr(7, 5)) / 1000;
                                            that.getUnitsAndAddLineItemWithQuantity(data[0]);
                                            $(document.activeElement).blur();
                                        }
                                        else {
                                            Sapo.Flash.error("Không tồn tại sản phẩm với mã này.");
                                        }
                                    },
                                        function (error) {
                                        })
                                } else {
                                    if (checkPost == true) {
                                        checkPost = false;
                                        $.ajax({
                                            url: ajaxUrls.variantDropdown,
                                            data: { barcode: code },
                                            dataType: "json",
                                            type: "GET",
                                            success: function (data) {
                                                if (data.variants.length > 0) {
                                                    data.variants[0].quantity = parseFloat(barcode.substr(7, 5)) / 1000;
                                                    that.getUnitsAndAddLineItemWithQuantity(data.variants[0]);
                                                }
                                                else {
                                                    Sapo.Flash.error("Không tồn tại sản phẩm với mã này.");
                                                }
                                            },
                                            complete: function () {
                                                checkPost = true
                                            }
                                        });
                                    }

                                }

                            }
                            else {
                                if (offline) {
                                    Variant.dao.getByFilter({ term: barcode }, function (data) {
                                        if (data.length > 0) {
                                            that.addLineItem(data[0]);
                                            $(document.activeElement).blur();
                                            $("#line_item_rows > tr:first-child #Quantity").blur();
                                        }
                                        else {
                                            Sapo.Flash.error("Không tồn tại sản phẩm với mã này.");
                                        }
                                    },
                                        function (error) {
                                        })
                                } else {
                                    var searchedVariant = null;
                                    if (checkPost == true) {
                                        checkPost = false;
                                        $.ajax({
                                            url: ajaxUrls.variantDropdown,
                                            data: { barcode: barcode },
                                            dataType: "json",
                                            type: "GET",
                                            success: function (data) {
                                                if (data.variants.length > 0) {

                                                    that.getUnitsAndAddLineItem(data.variants[0]);
                                                }
                                                else {
                                                    Sapo.Flash.error("Không tồn tại sản phẩm với mã này.");
                                                }
                                            },
                                            complete: function () {
                                                checkPost = true;
                                            }
                                        });
                                    }

                                }

                            }
                        }
                        else {
                            if (offline) {
                                Serial.dao.getBySerial({ serial: barcode, location_id: order.location_id }, function (data) {
                                    if (data.length > 0) {
                                        //that.addLineItem(data.variants[0], barcode);
                                        if (data.length == 1) {
                                            Variant.dao.getById(data[0].variant_id, function (variant) {
                                                that.addLineItem(variant, barcode);
                                            });
                                        } else {
                                            var variantIds = [];
                                            for (var i = 0; i < data.length; i++) {
                                                variantIds.push(data[i].variant_id);
                                            }
                                            Variant.dao.getByIds(variantIds, function (listVariant) {
                                                order.variantSerials = listVariant;
                                                var result = {};
                                                result.variants = listVariant;
                                                var template = $('#variant-serial-filter').html();
                                                var html = Mustache.render(template, result);
                                                that.listVarriantSerrials.show();
                                                $("#name-serial").text(barcode);
                                                $("#table-variant-serial").empty();
                                                $("#table-variant-serial").append(html);
                                                Bindings.bind($("#table-variant-serial").get(0), that);
                                            });

                                        }
                                    }
                                    else {
                                        Sapo.Flash.error("Không tồn tại sản phẩm với mã serial này.");
                                    }
                                },
                                    function (error) {
                                    })
                            }
                            else {
                                order.variantSerials = [];
                                order.serialScan = null;
                                $.ajax({
                                    url: ajaxUrls.variantSerial,
                                    data: { serial: barcode, locationId: order.location_id },
                                    dataType: "json",
                                    type: "GET",
                                    success: function (data) {
                                        data.serial = barcode;
                                        if (data.variants.length > 0) {
                                            if (data.variants.length == 1) {
                                                that.addLineItem(data.variants[0], barcode);
                                            } else {
                                                order.variantSerials = data.variants;
                                                var template = $('#variant-serial-filter').html();
                                                var html = Mustache.render(template, data);
                                                that.listVarriantSerrials.show();
                                                $("#name-serial").text(barcode);
                                                $("#table-variant-serial").empty();
                                                $("#table-variant-serial").append(html);
                                                Bindings.bind($("#table-variant-serial").get(0), that);
                                            }
                                        }
                                        else {
                                            Sapo.Flash.error("Không tồn tại sản phẩm với serial này");
                                        }
                                    },
                                    complete: function () {

                                    }
                                });

                            }
                        }

                    });
                }
                PosOrder.prototype.addVariantSerial = function (id) {
                    var that = this;
                    var order = that.initTabActive();
                    var serial = $("#name-serial").text();
                    if (order.variantSerials != null && order.variantSerials != undefined) {
                        for (var i = 0; i < order.variantSerials.length; i++) {
                            if (order.variantSerials[i].id == id) {
                                that.addLineItem(order.variantSerials[i], serial);
                                break;
                            }
                        }
                    }
                    Sapo.NewModal.hide();
                }
                PosOrder.prototype.getUnitsAndAddLineItem = function (searchedVariant) {
                    var that = this;
                    t0 = performance.now();


                    var variantId = searchedVariant.id;
                    if (searchedVariant != null) {
                        that.addLineItem(searchedVariant);
                        var t1 = performance.now();
                        $(document.activeElement).blur();
                        that.resetPromotion();
                        var itemIndex = searchedVariant.item_index;
                        var orderIndex = searchedVariant.index;
                        //if (!offline) {
                        //    $.ajax({
                        //        url: ajaxUrls.getUnitByProduct,
                        //        data: { variantId: variantId },
                        //        dataType: "json",
                        //        type: "GET",
                        //        success: function (data) {
                        //            if (data != null && data.units != null && data.units.length > 0) {
                        //                searchedVariant.units = data.units;
                        //                var html = "";
                        //                for (var i = 0; i < data.units.length; i++) {
                        //                    var unit = data.units[i];
                        //                    html = html +
                        //                        " <li>"
                        //                        + "<a bind-event-click='updateVariantByUnit(" + orderIndex + "," + itemIndex + "," + unit.variant_id + " )' unit-id='" + unit.variant_id + "' style='font-size: 12px; padding: 6px' class='elementUnit-" + orderIndex + "-" + itemIndex + "'>"
                        //                        + unit.name
                        //                        + "</a>" +
                        //                        "</li> ";
                        //                }
                        //                $("tr#variant-" + itemIndex + "").find(".td-units ul").append(html);
                        //                Bindings.unbind($("table#table-order tbody").get(0));
                        //                Bindings.bind($("table#table-order tbody").get(0));
                        //            }
                        //        },
                        //        complete: function () {
                        //            that.checkDisplayUnit(orderIndex, itemIndex, variantId);
                        //        }
                        //    });
                        //} else {
                        //    that.getUnitOffline(searchedVariant, variantId);
                        //}
                    }
                }
                PosOrder.prototype.getUnitOffline = function (searchedVariant, variantId) {
                    var that = this;
                    if (!searchedVariant.packsize) {
                        Variant.dao.getByPacksizeRootId(variantId,
                            function (data) {
                                var html = "";
                                if (data != null && data != undefined && data.length > 0) {
                                    var html = "";
                                    for (var i = 0; i < data.length; i++) {
                                        var variant = data[i];
                                        html = html +
                                            " <li>"
                                            + "<a bind-event-click='updateVariantByUnit(" + searchedVariant.index + "," + searchedVariant.item_index + "," + variant.id + " )' unit-id='" + variant.id + "' style='font-size: 12px; padding: 6px' class='elementUnit-" + searchedVariant.index + "-" + searchedVariant.item_index + "'>"
                                            + variant.unit
                                            + "</a>" +
                                            "</li> ";
                                    }
                                    html += " <li>"
                                        + "<a bind-event-click='updateVariantByUnit(" + searchedVariant.index + "," + searchedVariant.item_index + "," + variantId + " )' unit-id='" + variantId + "' style='font-size: 12px; padding: 6px' class='elementUnit-" + searchedVariant.index + "-" + searchedVariant.item_index + "'>"
                                        + searchedVariant.unit
                                        + "</a>" +
                                        "</li> ";
                                    $("tr#variant-" + searchedVariant.item_index + "").find(".td-units ul").append(html);
                                    Bindings.unbind($("table#table-order tbody").get(0));
                                    Bindings.bind($("table#table-order tbody").get(0));
                                }
                                that.checkDisplayUnit(searchedVariant.index, searchedVariant.item_index, variantId);
                            },
                            function (error) {
                            }
                        );
                    } else {
                        if (searchedVariant.packsize_root_id != null) {
                            var root_name = "";
                            Variant.dao.getById(searchedVariant.packsize_root_id,
                                function (root) {
                                    if (root != null && root != undefined) {
                                        root_name = root.unit;
                                    }
                                },
                                function (error) {
                                }
                            );
                            Variant.dao.getByPacksizeRootId(searchedVariant.packsize_root_id,
                                function (data) {
                                    var html = "";
                                    if (data != null && data != undefined && data.length > 0) {
                                        var html = "";
                                        for (var i = 0; i < data.length; i++) {
                                            var variant = data[i];
                                            html = html +
                                                " <li>"
                                                + "<a bind-event-click='updateVariantByUnit(" + searchedVariant.index + "," + searchedVariant.item_index + "," + variant.id + " )' unit-id='" + variant.id + "' style='font-size: 12px; padding: 6px' class='elementUnit-" + searchedVariant.index + "-" + searchedVariant.item_index + "'>"
                                                + variant.unit
                                                + "</a>" +
                                                "</li> ";
                                        }
                                        html += " <li>"
                                            + "<a bind-event-click='updateVariantByUnit(" + searchedVariant.index + "," + searchedVariant.item_index + "," + searchedVariant.packsize_root_id + " )' unit-id='" + searchedVariant.packsize_root_id + "' style='font-size: 12px; padding: 6px' class='elementUnit-" + searchedVariant.index + "-" + searchedVariant.item_index + "'>"
                                            + root_name
                                            + "</a>" +
                                            "</li> ";
                                        $("tr#variant-" + searchedVariant.item_index + "").find(".td-units ul").append(html);
                                        Bindings.unbind($("table#table-order tbody").get(0));
                                        Bindings.bind($("table#table-order tbody").get(0));
                                    }
                                    that.checkDisplayUnit(searchedVariant.index, searchedVariant.item_index, variantId);
                                },
                                function (error) {
                                }
                            );
                        }
                    }
                }
                PosOrder.prototype.getUnitsAndAddLineItemGift = function (searchedVariant) {
                    var that = this;

                    var variantId = searchedVariant.id;
                    if (searchedVariant != null) {
                        that.addLineItemGift(searchedVariant);
                        $(document.activeElement).blur();
                        that.resetPromotion();
                        var itemIndex = searchedVariant.item_index;
                        var orderIndex = searchedVariant.index;
                        $.ajax({
                            url: ajaxUrls.getUnitByProduct,
                            data: { variantId: variantId },
                            dataType: "json",
                            type: "GET",
                            success: function (data) {
                                if (data != null && data.units != null && data.units.length > 0) {
                                    searchedVariant.units = data.units;
                                    var html = "";
                                    for (var i = 0; i < data.units.length; i++) {
                                        var unit = data.units[i];
                                        html = html +
                                            " <li>"
                                            + "<a bind-event-click='updateVariantByUnit(" + orderIndex + "," + itemIndex + "," + unit.variant_id + " )' unit-id='" + unit.variant_id + "' style='font-size: 12px; padding: 6px' class='elementUnit-" + orderIndex + "-" + itemIndex + "'>"
                                            + unit.name
                                            + "</a>" +
                                            "</li> ";
                                    }
                                    $("tr#variant-" + itemIndex + "").find(".td-units ul").append(html);
                                    Bindings.unbind($("table#table-order tbody").get(0));
                                    Bindings.bind($("table#table-order tbody").get(0));
                                }
                            },
                            complete: function () {
                                that.checkDisplayUnit(orderIndex, itemIndex, variantId);
                            }
                        });
                    }
                }

                PosOrder.prototype.setLinkPaper = function () {
                    var that = this;
                    $('.t-grid-pager-boder .pagination a.t-link').each(function () {
                        if ($(this).data("initAjaxClick"))
                            return;
                        $(this).data("initAjaxClick", true);
                    })
                }

                PosOrder.prototype.GoToPage = function (page) {
                    var that = this;
                    if (!offline) {
                        var link = window.location.href + '?page=' + page;
                        that.loadPagePaginationAdded(link);

                    } else {
                        var $frmQuery = $("#frmQuery");
                        var categoryIds = $frmQuery.find("[name='CategoryIds']").val();
                        var checktop = $frmQuery.find("[name='CheckTop']").val();
                        that.loadPagePaginationAddedOffline(categoryIds, checktop, page);
                    }
                    $("#pageCategory").val(page);
                }

                PosOrder.prototype.PreviousPage = function (currentPage) {
                    var page = currentPage - 1;
                    var that = this;
                    if (!offline) {
                        var link = window.location.href + '?page=' + page;
                        that.loadPagePaginationAdded(link);
                    } else {
                        var $frmQuery = $("#frmQuery");
                        var categoryIds = $frmQuery.find("[name='CategoryIds']").val();
                        var checktop = $frmQuery.find("[name='CheckTop']").val();
                        that.loadPagePaginationAddedOffline(categoryIds, checktop, page);
                    }
                    $("#pageCategory").val(page);
                }

                PosOrder.prototype.NextPage = function (currentPage) {
                    var page = currentPage + 1;
                    var that = this;
                    if (!offline) {
                        var link = window.location.href + '?page=' + page;
                        that.loadPagePaginationAdded(link);
                    } else {
                        var $frmQuery = $("#frmQuery");
                        var categoryIds = $frmQuery.find("[name='CategoryIds']").val();
                        var checktop = $frmQuery.find("[name='CheckTop']").val();
                        that.loadPagePaginationAddedOffline(categoryIds, checktop, page);
                    }
                    $("#pageCategory").val(page);
                }

                PosOrder.prototype.loadPagePaginationAddedOffline = function (categoryIds, checktop, page) {
                    var filter = {};
                    filter.categoryIds = categoryIds;
                    filter.checktop = checktop;
                    filter.page = page;
                    filter.limit = 7;
                    var that = this;
                    Variant.dao.getByCategoryIdsTopSale(filter,
                        function (data) {
                            var html = "";
                            if (data != null && data.variants != undefined && data.variants != null && data.variants.length > 0) {
                                for (var i = 0; i < data.variants.length; i++) {
                                    var element = data.variants[i];
                                    if (element.image_path == null || element.image_path == "") {
                                        var url2 = "/images/image-default.png";
                                    } else {
                                        var url2 = Sapo.image.headThumb + Sapo.image.compact + element.image_path;
                                    }
                                    var price = money(that.getPriceById(element, that.order.tenant_setting.sale_price_list_id), that.order.currency.delimiter, that.order.currency.separator, that.order.currency.precision, that.order.currency.symbol);
                                    html += '<div class="tab-variant_block fl" bind-event-click="getUnitsAndAddLineItem(' + JSON.stringify(element).replace(/"/g, "&quot;") + ')">' +
                                        '<div class="tab-variant_block-image fl w100">' +
                                        '<img width="100" height="100" src="' + url2 + '" class="set-img" alt="">' +
                                        '</div>' +
                                        '<div class="tab-variant_block-name fl w100" data-toggle="tooltip" data-placement="top" title="' + element.product_name + " - " + element.name + '" style="cursor:pointer;">' +
                                        that.formatStringLength((element.product_name + " - " + element.name), 12) +
                                        '</div>' +
                                        '<div class="tab-variant_block-sku fl w100" data-toggle="tooltip" data-placement="top" title="' + element.sku + '" style="cursor:pointer;" data-original-title="">' +
                                        that.formatStringLength((element.sku), 15) +
                                        '</div>' +
                                        '<div class="tab-variant_block-price fl w100" data-toggle="tooltip" data-placement="top" title="' + price + " / SL: " + $.formatNumber(that.getAvailableVariant(element), { format: "#,##0.###", locale: "en" }) + '" style="cursor:pointer;">' +
                                        that.formatStringLength(price + " / SL: " + $.formatNumber(that.getAvailableVariant(element), { format: "#,##0.###", locale: "en" }), 15) +
                                        '</div>' +
                                        '</div>'
                                }
                            }

                            var pager = that.initPagerBoderCategory(data.count, filter);
                            $("#listVariantBottomPage").html("");
                            $("#listVariantBottomPage").html(html);
                            $("#PaginationCategoty").html("");
                            $("#PaginationCategoty").html(pager);
                            Bindings.unbind($(".order-menu-screen__left-tab_variant").get(0), that);
                            Bindings.bind($(".order-menu-screen__left-tab_variant").get(0), that);
                            tooltip($("div"));
                            tooltip($("i"));
                            tooltip($("span"));
                            tooltip($("a"));
                            //Bindings.refreshImmediately();
                        },
                        function (error) {
                        }
                    );
                }
                PosOrder.prototype.loadPagePaginationAddedOfflineModify = function () {
                    //console.log('da chay den day');
                    $.ajax({
                        url: '/admin/sale/GetProductAddLineItem',
                        type: 'GET',
                        dataType: 'json',
                        success: function (response) {
                            var data = response.data;
                            var html = "";
                            if (data != null && data.length > 0) {
                                for (var i = 0; i < data.length; i++) {
                                    var element = data[i];
                                    if (element.image_path == null || element.image_path == "") {
                                        var url2 = "/images/image-default.png";
                                    } else {
                                        var url2 = Sapo.image.headThumb + Sapo.image.compact + element.image_path;
                                    }
                                    //var price = money(that.getPriceById(element, that.order.tenant_setting.sale_price_list_id), that.order.currency.delimiter, that.order.currency.separator, that.order.currency.precision, that.order.currency.symbol);
                                    html += '<div class="tab-variant_block fl" bind-event-click="getUnitsAndAddLineItem(' + JSON.stringify(element).replace(/"/g, "&quot;") + ')">' +
                                        '<div class="tab-variant_block-image fl w100">' +
                                        '<img width="100" height="100" src="' + url2 + '" class="set-img" alt="">' +
                                        '</div>' +
                                        '<div class="tab-variant_block-name fl w100" data-toggle="tooltip" data-placement="top" title="' + element.product_name + " - " + element.name + '" style="cursor:pointer;">' +
                                       element.product_name + " - " + element.name +
                                        '</div>' +
                                        '<div class="tab-variant_block-sku fl w100" data-toggle="tooltip" data-placement="top" title="' + element.sku + '" style="cursor:pointer;" data-original-title="">' +
                                          element.sku +
                                        '</div>' +
                                        '</div>'
                                }
                            }

                            $("#listVariantBottomPage").html("");
                            $("#listVariantBottomPage").html(html);
                            Bindings.unbind($(".order-menu-screen__left-tab_variant").get(0), that);
                            Bindings.bind($(".order-menu-screen__left-tab_variant").get(0), that);
                            tooltip($("div"));
                            tooltip($("i"));
                            tooltip($("span"));
                            tooltip($("a"));
                        }
                    });
                    //var html = "";
                    //var element = {
                    //    "name": "Dưa hấu",
                    //    "barcode": "TPS029",
                    //    "product_id": 16019331,
                    //    "category_id": 541494,
                    //    "created_on": "2019-11-09T09:44:06Z",
                    //    "modified_on": "2019-12-11T15:25:16Z",
                    //    "category": "Củ, quả",
                    //    "product_name": "Dưa hấu",
                    //    "sku": "PVN05",
                    //    "sellable": true,
                    //    "taxable": false,
                    //    "unit": "kg",
                    //    "status": "active",
                    //    "variant_prices": [
                    //      {

                    //          "value": 22000,
                    //          "name": "Giá bán buôn",
                    //          "price_list": {
                    //              "id": 607633,
                    //              "code": "BANBUON",
                    //              "name": "Giá bán buôn",
                    //              "init": true
                    //          }
                    //      },
                    //      {
                    //          "value": 25000,
                    //          "name": "Giá bán lẻ",
                    //          "price_list": {
                    //              "id": 607635,
                    //              "code": "BANLE",
                    //              "name": "Giá bán lẻ",
                    //              "init": true
                    //          }
                    //      },
                    //      {
                    //          "value": 18000,
                    //          "name": "Giá nhập",
                    //          "price_list": {
                    //              "id": 607634,
                    //              "code": "GIANHAP",
                    //              "name": "Giá nhập",
                    //              "init": true
                    //          }
                    //      }
                    //    ],
                    //    "inventories": [
                    //      {
                    //          "location_id": 205389,
                    //      }
                    //    ],
                    //    "image_id": 8235459,
                    //    "online": false,
                    //    "is_delete": false,
                    //    "product_type": "normal",

                    //}
                    //console.log(element.product_name);


                }

                PosOrder.prototype.getAvaiable = function (variant) {
                    var avaiable = "0";
                    try {
                        var inventory = variant.Inventories.Where(o => o.LocationId == Model.LocationId.Value).FirstOrDefault();
                        avaiable = Util.FormatNumberToNumberVN(inventory.Available.Value);
                    }
                    catch (Exception) {

                        avaiable = "0";
                    }

                    return avaiable;
                }
                PosOrder.prototype.initPagerBoderCategory = function (total, filter) {
                    var totalPage = (total - total % filter.limit) / filter.limit;
                    filter.totalPage = totalPage;
                    if (total % filter.limit != 0) {
                        totalPage += 1;
                    }

                    var subhtml = "";
                    var page = "";

                    var formValue = 0;
                    var toValue = totalPage;

                    if (filter.page >= 3) formValue = filter.page - 3;
                    if (filter.page + 2 <= totalPage) toValue = parseInt(filter.page) + 2;
                    for (var i = formValue; i < toValue; i++) {
                        if (filter.page == (i + 1)) {
                            page += '<li class="active">' +
                                '<span class="t-state-active" data-original-title="" title="">' + (i + 1) + '</span>' +
                                '</li>';
                        } else {
                            page += '<li><a class="t-link" data-page-number="' + (i + 1) + '" bind-event-click="GoToPage(' + (i + 1) + ')" data-original-title="" title="">' + (i + 1) + '</a></li>';
                        }

                    }
                    var statePrev = (filter.page != 1) ? 'class="t-link"' : 'class="disabled"';
                    var stateNext = (filter.page != totalPage) ? 'class="t-link"' : 'class="disabled"';

                    if (totalPage > 1) {
                        subhtml = '<div class="dataTables_paginate paging_bootstrap" data-original-title="" title="">' +
                            '<ul class="pagination">' +
                            '<li ' + statePrev + '>' +
                            '<a class="t-link" bind-event-click="PreviousPage(' + filter.page + ')" href="javascript:">' +
                            '<span class="t-icon t-arrow-prev">&lt;</span>' +
                            '</a>' +
                            '</li>' +
                            page +
                            '<li ' + stateNext + '>' +
                            '<a class="t-link" bind-event-click="NextPage(' + filter.page + ')">' +
                            '<span class="t-icon t-arrow-next">&gt;</span>' +
                            '</a>' +
                            '</li>' +
                            '</ul>' +
                            '</div>';
                    }

                    var html = '<div class="t-pager t-reset" data-original-title="" title="">' +

                        '<div class="col-xs-12" data-original-title="" title="">' +
                        subhtml +
                        '</div>' +
                        '</div>';
                    return html;
                }


                PosOrder.prototype.loadPagePaginationAdded = function (url) {
                    var that = this;
                    if (that.ajaxRequest)
                        that.ajaxRequest.abort();
                    that.ajaxRequest = Sapo.Utility.loadAjax(url, ".order-menu-screen__left-tab_variant", function () {
                        tooltip($("div"));
                        tooltip($("i"));
                        tooltip($("span"));
                        tooltip($("a"));

                        $('.t-grid-pager-boder .pagination a.t-link').each(function () {
                            if ($(this).data("initAjaxClick"))
                                return;
                            $(this).data("initAjaxClick", true);
                        })
                    });
                }
                PosOrder.prototype.initTabActive = function () {
                    var that = this;
                    for (var i = 0; i < that.orders.length; i++) {
                        if (that.orders[i].tab_active == true) {
                            for (var j = 0; j < that.orders[i].payment_methods.length; j++) {
                                if (that.orders[i].payment_methods[j].type == "point") {
                                    if (that.orders[i].payment_methods[j].show == undefined) {
                                        that.orders[i].payment_methods[j].show = false;
                                    }
                                } else {
                                    that.orders[i].payment_methods[j].show = true;
                                }
                            }
                            if (that.orders[i].assignee_id == undefined || that.orders[i].assignee_id == 0) {
                                that.orders[i].assignee_id = that.order.account_id;
                                that.orders[i].assignee_name = that.order.account_name;
                            } else {
                                if (that.orders[i].assignee_name == undefined || that.orders[i].assignee_name == null) {
                                    for (var count = 0; count < that.order.accounts.length; count++) {
                                        if (that.orders[i].assignee_id == that.order.accounts[count].id) {
                                            that.orders[i].assignee_name = that.order.accounts[count].full_name
                                        }
                                    }
                                }
                            }
                            return that.orders[i];
                        }

                    }
                    //return $.grep(that.orders, function (order) { return order.tab_active == true; })[0];
                }
                PosOrder.prototype.setValueOrderActive = function (order) {

                    var that = this;
                    for (var i = 0; i < that.orders.length; i++) {
                        if (that.orders[i].tab_active == true)
                            that.orders[i] = order;
                    }
                }

                PosOrder.prototype.addLineItemSacle = function (order) {

                    var that = this;
                    for (var i = 0; i < that.orders.length; i++) {
                        if (that.orders[i].tab_active == true)
                            that.orders[i] = order;
                    }
                }

                PosOrder.prototype.setBootstrapSwitch = function (order) {
                    $("[name='my-checkbox']").bootstrapSwitch('state', order.print_order);
                    $("[name='my-SeperateProduct']").bootstrapSwitch('state', order.seperate_product);
                    //$("[name='my-ApplyDiscountLoyalty']").bootstrapSwitch('state', order.is_apply_loyalty_discount);
                    //$("[name='my-ApplyDiscountPromotion']").bootstrapSwitch('state', order.is_apply_loyalty_discount);
                }
                PosOrder.prototype.changeSeperateProduct = function () {
                    $("[name='my-checkbox']").bootstrapSwitch();
                    $("[name='my-SeperateProduct']").bootstrapSwitch();
                    //$("[name='my-ApplyDiscountLoyalty']").bootstrapSwitch();
                    var that = this;
                    //that.scanerBarCode();
                    $('input[name="my-SeperateProduct"]').on('switchChange.bootstrapSwitch', function (event, state) {

                        that.eventChangeSeperateProduct(that, state);
                    });
                    $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function (event, state) {

                        that.eventChangePrint(that, state);
                    });
                    //$('input[name="my-ApplyDiscountLoyalty"]').on('switchChange.bootstrapSwitch', function (event, state) {

                    //    that.eventApplyDiscountLoyalty(that, state);
                    //});
                }
                PosOrder.prototype.initCheckboxApplyOrderDiscountNormal = function () {
                    var order = this.initTabActive();
                    $("[name='my-ApplyDiscountNormal']").bootstrapSwitch('destroy', true);
                    $("[name='my-ApplyDiscountNormal']").bootstrapSwitch({ 'state': order.is_apply_normal_discount_tmp });
                    var that = this;
                    $('input[name="my-ApplyDiscountNormal"]').on('switchChange.bootstrapSwitch', function (event, state) {

                        that.eventApplyOrderDiscountNormal(that, state);
                    });
                }
                PosOrder.prototype.initCheckboxApplyOrderDiscountLoyalty = function () {
                    var order = this.initTabActive();
                    $("[name='my-ApplyDiscountLoyalty']").bootstrapSwitch('destroy', true);
                    $("[name='my-ApplyDiscountLoyalty']").bootstrapSwitch({ 'state': order.is_apply_loyalty_discount_tmp });
                    var that = this;
                    $('input[name="my-ApplyDiscountLoyalty"]').on('switchChange.bootstrapSwitch', function (event, state) {

                        that.eventApplyOrderDiscountLoyalty(that, state);
                    });
                }
                PosOrder.prototype.initCheckboxApplyOrderDiscountPromotion = function () {
                    var order = this.initTabActive();
                    $("[name='my-ApplyDiscountPromotion']").bootstrapSwitch('destroy', true);
                    $("[name='my-ApplyDiscountPromotion']").bootstrapSwitch({ 'state': order.is_apply_promotion_discount_tmp });
                    var that = this;
                    $('input[name="my-ApplyDiscountPromotion"]').on('switchChange.bootstrapSwitch', function (event, state) {

                        that.eventApplyOrderDiscountPromotion(that, state);
                    });
                }

                PosOrder.prototype.initCheckboxApplyDiscountPromotionLineItem = function (index) {
                    var order = this.initTabActive();
                    $("[name='my-ApplyDiscountPromotionLineItem']").bootstrapSwitch('destroy', true);
                    $("[name='my-ApplyDiscountPromotionLineItem']").bootstrapSwitch({ 'state': order.order_line_items[index].is_apply_promotion_discount_tmp });
                    var that = this;
                    $('input[name="my-ApplyDiscountPromotionLineItem"]').on('switchChange.bootstrapSwitch', function (event, state) {

                        that.eventApplyDiscountPromotionLineItem(that, state, index);
                    });
                }

                PosOrder.prototype.initCheckboxApplyDiscountLoyaltyLineItem = function (index) {
                    var order = this.initTabActive();
                    $("[name='my-ApplyDiscountLoyaltyLineItem']").bootstrapSwitch('destroy', true);
                    $("[name='my-ApplyDiscountLoyaltyLineItem']").bootstrapSwitch({ 'state': order.order_line_items[index].is_apply_loyalty_discount_tmp });
                    var that = this;
                    $('input[name="my-ApplyDiscountLoyaltyLineItem"]').on('switchChange.bootstrapSwitch', function (event, state) {

                        that.eventApplyDiscountLoyaltyLineItem(that, state, index);
                    });
                }

                PosOrder.prototype.initCheckboxApplyDiscountCustomerLineItem = function (index) {
                    var order = this.initTabActive();
                    $("[name='my-ApplyDiscountCustomerLineItem']").bootstrapSwitch('destroy', true);
                    $("[name='my-ApplyDiscountCustomerLineItem']").bootstrapSwitch({ 'state': order.order_line_items[index].is_apply_customer_discount_tmp });
                    var that = this;
                    $('input[name="my-ApplyDiscountCustomerLineItem"]').on('switchChange.bootstrapSwitch', function (event, state) {

                        that.eventApplyDiscountCustomerLineItem(that, state, index);
                    });
                }

                PosOrder.prototype.initCheckboxApplyDiscountNormalLineItem = function (index) {
                    var order = this.initTabActive();
                    $("[name='my-ApplyDiscountNormalLineItem']").bootstrapSwitch('destroy', true);
                    $("[name='my-ApplyDiscountNormalLineItem']").bootstrapSwitch({ 'state': order.order_line_items[index].is_apply_normal_discount_tmp });
                    var that = this;
                    $('input[name="my-ApplyDiscountNormalLineItem"]').on('switchChange.bootstrapSwitch', function (event, state) {

                        that.eventApplyDiscountNormalLineItem(that, state, index);
                    });
                }




                PosOrder.prototype.eventChangeSeperateProduct = function (that, state) {
                    that = this;
                    var order = this.initTabActive();
                    order.seperate_product = state;
                    that.order.seperate_product = state;

                }
                PosOrder.prototype.eventChangePrint = function (that, state) {
                    that = this;
                    var order = this.initTabActive();
                    order.print_order = state;
                    that.order.print_order = order.print_order;

                }
                PosOrder.prototype.eventApplyOrderDiscountNormal = function (that, state) {
                    that = this;
                    var order = this.initTabActive();
                    order.is_apply_normal_discount_tmp = state;
                    Bindings.refreshImmediately();
                    //this.resetPromotion();
                }

                PosOrder.prototype.eventApplyOrderDiscountLoyalty = function (that, state) {
                    that = this;
                    var order = this.initTabActive();
                    order.is_apply_loyalty_discount_tmp = state;
                    if (state == true && order.order_loyalty_discount_value == 0) {
                        if (order.current_loyalty_customer != undefined && order.current_loyalty_customer != null) {
                            order.order_loyalty_discount_value = order.current_loyalty_customer.loyalty_card.discount_value;
                            if (order.current_loyalty_customer.loyalty_card.discount_type == "percent")
                                order.is_loyalty_discount_percent = true;
                            else order.is_loyalty_discount_percent = false;
                        }
                    }
                    Bindings.refreshImmediately();
                    //this.resetPromotion();
                }

                PosOrder.prototype.eventApplyOrderDiscountPromotion = function (that, state) {
                    that = this;
                    var order = this.initTabActive();
                    order.is_apply_promotion_discount_tmp = state;
                    Bindings.refreshImmediately();
                    //this.resetPromotion();
                }

                PosOrder.prototype.eventApplyDiscountNormalLineItem = function (that, state, index) {
                    that = this;
                    var order = this.initTabActive();
                    order.order_line_items[index].is_apply_normal_discount_tmp = state;
                    this.isValidDiscountLineItem(index);
                    Bindings.refreshImmediately();
                    //this.resetPromotion();
                }
                PosOrder.prototype.eventApplyDiscountCustomerLineItem = function (that, state, index) {
                    that = this;
                    var order = this.initTabActive();
                    order.order_line_items[index].is_apply_customer_discount_tmp = state;
                    Bindings.refreshImmediately();
                    //this.resetPromotion();
                }
                PosOrder.prototype.eventApplyDiscountLoyaltyLineItem = function (that, state, index) {
                    that = this;
                    var order = this.initTabActive();
                    order.order_line_items[index].is_apply_loyalty_discount_tmp = state;
                    Bindings.refreshImmediately();
                    //this.resetPromotion();
                }
                PosOrder.prototype.eventApplyDiscountPromotionLineItem = function (that, state, index) {
                    that = this;
                    var order = this.initTabActive();
                    order.order_line_items[index].is_apply_promotion_discount_tmp = state;
                    Bindings.refreshImmediately();
                    //this.resetPromotion();
                }

                PosOrder.prototype.getPhoneCustomer = function () {
                    var that = this;
                    var order = this.initTabActive();
                    return (order.customer == null || order.customer.phone_number == null || order.customer.phone_number == undefined) ? "---" : order.customer.phone_number
                }
                PosOrder.prototype.getAddressCustomer = function () {

                    var that = this;

                    var order = this.initTabActive();

                    return (order.customer == null || order.customer.addresses == null || order.customer.addresses == undefined || order.customer.addresses.length == 0) ? "---" : order.customer.addresses[0].address1;
                }
                PosOrder.prototype.getDebtCustomer = function () {

                    var that = this;
                    var order = this.initTabActive();

                    return (order.customer == null || order.customer.debt == null || order.customer.debt == undefined && order.customer.debt.length == 0) ? "---" : money(parseFloat(order.customer.debt), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                }
                PosOrder.prototype.bindColRight = function () {
                    //
                    Bindings.unbind($(".order-menu-screen").get(0), this);
                    Bindings.bind($(".order-menu-screen").get(0), this);
                    Bindings.refreshImmediately();
                }
                PosOrder.prototype.closeTab = function (index) {
                    var that = this;
                    var index = parseFloat($('.form-delete-items input[name="index"]').val());
                    that.orders.splice(index, 1);
                    //that.deleteActiveOrder();
                    that.setIndexOrders();
                    //Sapo.WaitingSubmit();
                    that.setTabOrderActive();
                    //Sapo.Submit();
                    Sapo.NewModal.hide();
                    Sapo.Flash.notice("Đóng đơn hàng thành công.");
                    //var menu_tab = document.getElementById('filter-tab-list');

                    //menu_tab.scrollLeft = $("#filter-tab-list").prop("scrollWidth");
                    //Ps.update(menu_tab, { useBothWheelAxes: true });
                }


                PosOrder.prototype.setTabOrderActive = function () {
                    var that = this;
                    if (that.orders.length <= 0 || that.orders == null) {
                        var order = that.initOrderAdd(that.order);
                        that.orders.push(order);
                    }
                    else {
                        var rank = that.orders.length - 1;
                        that.orders[rank].tab_active = true;
                    }

                    $("ul.filter-tab-list").empty();
                    this.initAllTab();
                    this.initTableActive();
                    var order = this.initTabActive();
                    //$(".order-discount-value").val(order.normal_discount_line_item);
                    if (order.is_discount_percent_tmp == true) {
                        $("#disablepercent").removeClass('active');
                        this.isDiscountPercentOrder(true);
                    }
                    else {
                        $("#activepercent").removeClass('active');
                        this.isDiscountPercentOrder(false);

                    }

                    this.isDiscountPercent();
                    this.bindColRight();
                    this.bindColRight();
                }

                PosOrder.prototype.addTabOrder = function () {
                    var that = this;
                    //that.initOrderAdd(
                    var order = that.initOrderAdd(that.order);
                    for (var i = 0; i < that.orders.length; i++) {
                        if (that.orders[i].tab_active == true)
                            that.orders[i].tab_active = false;
                        if (i == that.orders.length - 1) {
                            if (that.orders[i].is_scaner_scale == true) {
                                order.is_scaner_scale = true
                            }
                            else {
                                order.is_scaner_scale = false
                            }
                        }
                    }
                    that.orders.push(order);
                    $("ul.filter-tab-list").empty();
                    this.initAllTab();
                    this.initTableActive();

                    $("#input-order-discount-group").removeClass('disabled');
                    if (order.is_discount_percent_tmp == true) {
                        $("#disablepercent").removeClass('active');
                        this.isDiscountPercentOrder(true);
                    }
                    else {
                        $("#activepercent").removeClass('active');
                        this.isDiscountPercentOrder(false);

                    }
                    this.bindColRight();

                    var orderSeper = that.initTabActive();

                    this.setBootstrapSwitch(orderSeper);
                    //var menu_tab = document.getElementById('filter-tab-list');

                    //menu_tab.scrollLeft = $("#filter-tab-list").prop("scrollWidth");
                    //Ps.update(menu_tab, { useBothWheelAxes: true });
                    checkResetPositionTab = true;
                    $("#payment-waiting").hide();
                    $(".search-input-pos").removeAttr("disabled")
                }
                PosOrder.prototype.initTableActive = function () {
                    var order = this.initTabActive();
                    var that = this;
                    $("tbody#line_item_rows").empty();
                    Bindings.unbind($("tbody#line_item_rows").get(0), this);
                    for (var i = 0; i < order.order_line_items.length; i++) {
                        if (order.order_line_items[i] != null) {

                            if (order.order_line_items[i].is_freeform) {
                                that.addLineDifItemInTabActive(order.order_line_items[i], i);
                            }
                            else {
                                that.addLineItemInTabActive(order.order_line_items[i], i);
                                that.checkDisplayUnit(order.order_line_items[i].index, order.order_line_items[i].item_index, order.order_line_items[i].variant_id);
                                $(document.activeElement).blur();
                            }

                        }
                    }
                    if (order.order_line_item_gifts != null && order.order_line_item_gifts.length > 0) {
                        for (var i = 0; i < order.order_line_item_gifts.length; i++) {
                            subLine = order.order_line_item_gifts[i]
                            if (subLine != null) {

                                var template = $('#line-item-gift-template').html();
                                var html = Mustache.render(template, { "line_item_gift": subLine });
                                $("#line_item_rows").append(html);
                                Bindings.bind($("#variant-gift-" + subLine.item_index).get(0), order);

                                $(document.activeElement).blur();

                            }
                        }
                    }
                    Bindings.bind($("tbody#line_item_rows").get(0), this);

                }

                PosOrder.prototype.getUnitsAndAddLineItemInTabActive = function (searchedVariant, i) {
                    var that = this;
                    var variantId = searchedVariant.id;
                    if (searchedVariant != null) {
                        that.addLineItemInTabActive(searchedVariant, i);
                        $(document.activeElement).blur();
                        that.resetPromotion();
                        var itemIndex = searchedVariant.item_index;
                        var orderIndex = searchedVariant.index;
                        $.ajax({
                            url: ajaxUrls.getUnitByProduct,
                            data: { variantId: variantId },
                            dataType: "json",
                            type: "GET",
                            success: function (data) {
                                if (data != null && data.units != null && data.units.length > 0) {
                                    searchedVariant.units = data.units;
                                    var html = "";
                                    for (var i = 0; i < data.units.length; i++) {
                                        var unit = data.units[i];
                                        html = html +
                                            " <li>"
                                            + "<a bind-event-click='updateVariantByUnit(" + orderIndex + "," + itemIndex + "," + unit.variant_id + " )' unit-id='" + unit.variant_id + "' style='font-size: 12px; padding: 6px' class='elementUnit-" + orderIndex + "-" + itemIndex + "'>"
                                            + unit.name
                                            + "</a>" +
                                            "</li> ";
                                    }
                                    $("tr#variant-" + itemIndex + "").find(".td-units ul").append(html);
                                    Bindings.unbind($("table#table-order tbody").get(0));
                                    Bindings.bind($("table#table-order tbody").get(0));
                                }
                            },
                            complete: function () {
                                that.checkDisplayUnit(orderIndex, itemIndex, variantId);
                            }
                        });
                    }
                }


                PosOrder.prototype.addLineDifItemInTabActive = function (variant, index) {
                    var order = this.initTabActive();

                    variant.currency = order.currency;
                    variant.item_index = index;
                    variant.index = order.index;
                    var template = $('#line-item-dif-template').html();
                    var html = Mustache.render(template, { "line_item": variant });
                    $("#line_item_rows").html();
                    $("#line_item_rows").append(html);
                    Bindings.bind($("#variant-" + index).get(0), this);
                    $("#variant-" + index).find(".line_item_quantity").focus().select();
                    //Sapo.popover($("i#sapo-popover" + index));
                    // get dữ liệu tax lên giao diện
                    //tooltip($("span"));
                    //this.changTaxRateItem();
                    this.updateScollBar();
                    //$(document).click();

                    //this.getShippingMethods();
                }
                PosOrder.prototype.addLineItemInTabActive = function (variant, index) {
                    var that = this;
                    var order = this.initTabActive();
                    variant.quantity = this.getRoundQuantity(variant.quantity);
                    //ham tinh gia se tinh o day phai viet mot ham de dung chung
                    if (typeof (variant.price) == "string") {
                        variant.price = parseFloat(variant.price);
                    }
                    variant.price = variant.price;
                    variant.variant_id = variant.variant_id;
                    if (order.edit_order == true)
                        variant.id = variant.id;
                    else
                        variant.id = 0;
                    variant.currency = order.currency;
                    variant.whole_sale_price_currency = money(that.getPriceByCode(variant, "BANBUON"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    variant.buy_price_currency = money(that.getPriceByCode(variant, "GIANHAP"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    variant.retail_price_currency = money(that.getPriceByCode(variant, "BANLE"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    variant.item_index = index;
                    variant.discount_rate = variant.discount_rate;
                    variant.index = order.index;

                    variant.allOption = (variant.opt1 == null ? "" : variant.opt1) + (variant.opt2 == null ? "" : " - " + variant.opt2)
                        + (variant.opt3 == null ? "" : " - " + variant.opt3);

                    variant.formatedName = that.formatStringLength(variant.name, 70);
                    variant.formatedUnit = that.formatStringLength(variant.unit, 9);

                    variant.total_available = 0;
                    variant.total_stock_on_hand = 0;
                    variant.total_incoming_stock = 0;
                    variant.total_stock_onway = 0;

                    $.each(variant.inventories, function (i, inventory) {
                        if (inventory.location_id == order.location_id) {
                            variant.available = inventory.available;
                            variant.stock_on_hand = inventory.on_hand;
                            variant.incoming_stock = inventory.incoming;
                            variant.stock_onway = inventory.onway;
                        }
                        variant.total_available += inventory.available;
                        variant.total_stock_on_hand += inventory.on_hand;
                        variant.total_incoming_stock += inventory.incoming;
                        variant.total_stock_onway += inventory.onway;
                    })
                    var template;
                    var html;
                    if (variant.product_type != "serial") {
                        template = $('#line-item-template').html();
                        html = Mustache.render(template, { "line_item": variant });
                        $("#line_item_rows").prepend(html);
                    }
                    else {
                        template = $('#line-item-serial-template').html();
                        html = Mustache.render(template, { "line_item": variant });
                        $("#line_item_rows").prepend(html);
                        Bindings.bind($(`#variant-serial-${index}`).get(0), this);
                        that.initSerial(variant.item_index, variant.product_id, variant.variant_id);
                        if (variant.serials != null && variant.serials.length > 0) {
                            for (var i = 0; i < variant.serials.length; i++) {
                                $(`#input-serial-${index}`).tagsManager('pushTag', variant.serials[i]);
                            }
                        }
                    }
                    Bindings.bind($("#variant-" + index).get(0), this);
                    $("#variant-" + index).find(".line_item_quantity").focus().select();
                    Sapo.popover($("i#sapo-popover" + index));
                    tooltip($("span"));
                    Sapo.Utility.validateFormInPage();
                    Sapo.Utility.changeNumber();
                    // get dữ liệu tax lên giao diện
                    //this.changTaxRateItem();
                    this.updateScollBar();
                    //$(document).click();
                    this.OnKeyDown();
                    //this.getShippingMethods();
                }
                PosOrder.prototype.getCodeTabActive = function (code) {
                    var subCode = code.substring(2, code.length);
                    this.order.code = "SO" + (parseInt(subCode) + 1);
                    if (subCode.substring(0, 1) == "0") {
                        this.order.code = "SO0" + (parseInt(subCode) + 1);
                    }
                    return this.order.code;
                }

                PosOrder.prototype.getNumberTabActive = function (number) {
                    var numb = number + 1;
                    this.order.number = numb;
                    return numb;
                }

                PosOrder.prototype.initOrderAdd = function (order) {
                    var that = this;
                    var order = $.extend(true, {}, that.order);
                    order.customer = {
                        id: 0
                    };
                    order.edit_order = false;
                    //order.code = this.getCodeTabActive(order.code);
                    order.index = that.orders.length;
                    order.number = this.getNumberTabActive(order.number);


                    return order;
                }
                PosOrder.prototype.initAllTab = function () {
                    var that = this;
                    for (var i = 0; i < that.orders.length; i++) {
                        if (that.orders[i].tab_active)
                            $("ul.filter-tab-list").append(that.addHtmlTabActive(that.orders[i], i));
                        else
                            $("ul.filter-tab-list").append(that.addHtmlTab(that.orders[i], i));
                    }
                    //var menu_tab = document.getElementById('filter-tab-list');

                    //Ps.update(menu_tab, { useBothWheelAxes: true });
                }
                PosOrder.prototype.addHtmlTabActive = function (order, i) {
                    styleLoading = "";
                    classId = "";
                    if (order.id != undefined && order.id > 0)
                        classId = order.id;
                    if (order.zalo_pay_status == "waiting" || order.vnpay_status == "waiting")
                        styleLoading = "display:block"
                    if (order.name_order_clone != undefined) {
                        return '<li class="filter-tab-item filter-tab-active ' + classId + '">' +
                            '<a href="javascript:void(0)"  class="filter-tab filter-tab-active">' + order.name_order_clone + '</a>' +
                            '<i class="fa fa-times" bind-event-click="showCloseTab(' + i + ');" aria-hidden="true"></i>' +
                            '<div class="img-loading" style="' + styleLoading + '"></div>' +
                            '</li>';
                    }
                    return '<li class="filter-tab-item filter-tab-active ' + classId + '">' +
                        '<a href="javascript:void(0)"  class="filter-tab filter-tab-active">Đơn ' + order.number + '</a>' +
                        '<i class="fa fa-times" bind-event-click="showCloseTab(' + i + ');" aria-hidden="true"></i>' +
                        '<div class="img-loading" style="' + styleLoading + '"></div>' +
                        '</li>';
                }
                PosOrder.prototype.addHtmlTab = function (order, i) {
                    styleLoading = "";
                    classId = "";
                    if (order.id != undefined && order.id > 0)
                        classId = order.id;
                    if (order.zalo_pay_status == "waiting" || order.vnpay_status == "waiting")
                        styleLoading = "display:block"
                    if (order.name_order_clone != undefined) {
                        return '<li class="filter-tab-item ' + classId + '">' +
                            '<a href="javascript:void(0)" bind-event-click="loadTabActive(' + i + ');" class="filter-tab">' + order.name_order_clone + '</a>' +
                            '<div class="img-loading" style="' + styleLoading + '"></div>' +
                            '</li>';
                    }
                    return '<li class="filter-tab-item ' + classId + '">' +
                        '<a href="javascript:void(0)" bind-event-click="loadTabActive(' + i + ');" class="filter-tab">Đơn ' + order.number + '</a>' +
                        '<div class="img-loading" style="' + styleLoading + '"></div>' +
                        '</li>';
                }

                PosOrder.prototype.showCloseTab = function (index) {
                    var that = this;
                    this.showCloseTabOrder.show();
                    $('.form-delete-items input[name="index"]').val(index);
                    $("#ui-dialog-title-1").text("Đóng đơn hàng " + that.orders[index].number);
                }
                PosOrder.prototype.changeCodeOrderActive = function (node) {

                    var order = this.initTabActive();
                    order.code = $(node).val();
                }
                PosOrder.prototype.setCodeCodeOrderActive = function (code) {

                    var that = this;
                    var order = that.initTabActive();
                    var checkOrders = $.grep(that.orders, function (value) { return value.code == order.code && value.tab_active != true; })
                    if (order.code == "") {
                        $("#add-filter-common").find("div.form-group").addClass("has-error");
                        Sapo.Flash.error("Vui lòng nhập mã đơn hàng!");
                        return;
                    }
                    if (checkOrders.length > 0) {
                        $("#add-filter-common").find("div.form-group").addClass("has-error");
                        Sapo.Flash.error("Mã đơn hàng đã bị trùng!");
                        return;
                    }
                    $.each(that.orders, function (index, item) {
                        if (item.tab_active) {
                            var html = '<a href="javascript:void(0)"  class="filter-tab filter-tab-active">' + item.codeName + '</a>' +
                                '<i class="fa fa-times" bind-event-click="showCloseTab(' + index + ');" aria-hidden="true"></i>';
                            $("li.filter-tab-active").empty();
                            $("li.filter-tab-active").append(html);
                            Bindings.refreshImmediately();
                            Bindings.unbind($("li.filter-tab-active")[0]);
                            Bindings.bind($("li.filter-tab-active")[0]);
                            if (order.code != code)
                                Sapo.Flash.notice("Cập nhật mã đơn hàng thành công!");
                            return;
                        }

                    });

                }
                PosOrder.prototype.editNameSearched = function () {
                    var order = this.initTabActive();
                    var that = this;
                    this.gethtml_search_active = $("li.filter-tab-active").html();
                    $("li.filter-tab-active").empty();
                    $("li.filter-tab-active").append('<div class="form-group" style="float:left;">' +
                        '<div class="controls">' +
                        '<input bind-event-blur="setCodeCodeOrderActive(\'' + order.code + '\')" bind-event-keyup="changeCodeOrderActive(this)" class="sapo-textbox input-validation-error form-control form-control-input-popup" data-val="true" placeholder="Sửa mã đơn hàng" id="add-filter-common-filtername" style="width:100%" type="text" value="' + order.codeName + '">' +
                        '</div>' +
                        '</div>');
                    $("li.filter-tab-active").attr("id", "add-filter-common");
                    Bindings.refreshImmediately();
                    Bindings.unbind($("li.filter-tab-active")[0]);
                    Bindings.bind($("li.filter-tab-active")[0]);
                }


                var requestOrder;
                PosOrder.prototype.loadTabActiveOrderClone = function (id) {
                    if (requestOrder && requestOrder.readyState != 4) {
                        requestOrder.abort();
                    }
                    var that = this;
                    requestOrder = $.ajax({
                        url: ajaxUrls.getOrderClone,
                        data: { id: id },
                        dataType: "json",
                        type: "GET",
                        success: function (data) {
                            console.log(data)
                            var orderClone = that.orders[0];
                            if (orderClone.edit_order == true) {
                                that.edit_order = data.order;
                                orderClone.name_order_clone = data.order.code;
                                orderClone.code = data.order.code;
                                orderClone.id = data.order.id;
                                orderClone.issued_on = Sapo.forMatDatePicker(data.order.issued_on);
                                orderClone.customer = data.customer;
                                orderClone.payments = [];
                                for (var i = 0; i < data.order.prepayments.length; i++) {
                                    if (data.order.prepayments[i].status == "active") {
                                        data.order.prepayments[i].id = data.order.prepayments[i].payment_method_id;
                                        orderClone.payments.push(data.order.prepayments[i])
                                    }
                                }
                                data.order.prepayments;
                                orderClone.phone_number = data.customer.phone_number;
                                orderClone.customer_id = orderClone.customer.id;
                                orderClone.customer_name = orderClone.customer == null ? "" : orderClone.customer.name;
                                if (orderClone.customer.addresses != undefined && orderClone.customer.addresses != null && orderClone.customer.addresses.length != 0) {
                                    orderClone.billing_address = orderClone.customer.addresses[0];
                                    orderClone.shipping_address = orderClone.customer.addresses[0];
                                }
                                var discountCustomerDefault = 0;
                                if (orderClone.customer.default_discount_rate != null) {
                                    discountCustomerDefault = orderClone.customer.default_discount_rate;
                                }

                                orderClone.order_line_items = data.order.order_line_items;
                                for (var i = 0; i < orderClone.order_line_items.length; i++) {

                                    if (orderClone.order_line_items[i].variant_name != null) {
                                        orderClone.order_line_items[i].variant_name = orderClone.order_line_items[i].variant_name.replace(/'/g, "&#39;").replace(/(?:\r\n|\r|\n)/g, ' ');
                                    }
                                    orderClone.order_line_items[i].name = orderClone.order_line_items[i].variant_name;
                                    orderClone.order_line_items[i].note = data.order.order_line_items[i].note;
                                    orderClone.order_line_items[i].id = data.order.order_line_items[i].id;
                                    orderClone.order_line_items[i].is_apply_normal_discount = true;
                                    orderClone.order_line_items[i].is_apply_promotion_discount = false;
                                    orderClone.order_line_items[i].is_apply_customer_discount = false;
                                    orderClone.order_line_items[i].normal_discount_line_item = 0;
                                    orderClone.order_line_items[i].is_normal_discount_percent = false;
                                    orderClone.order_line_items[i].customer_discount_line_item_rate = discountCustomerDefault;
                                    orderClone.order_line_items[i].serials = [];

                                    if (data.order.order_line_items[i].discount_items != null && data.order.order_line_items[i].discount_items.length > 0) {
                                        for (var j = 0; j < data.order.order_line_items[i].discount_items.length; j++) {
                                            var discountItem = data.order.order_line_items[i].discount_items[j];
                                            if (discountItem.rate > 0 || discountItem.value > 0) {
                                                if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.MANUAL) == 0) {
                                                    orderClone.order_line_items[i].is_apply_normal_discount = true;
                                                    orderClone.order_line_items[i].is_normal_discount_percent = discountItem.rate > 0 ? true : false;
                                                    orderClone.order_line_items[i].normal_discount_line_item = discountItem.rate > 0 ? discountItem.rate : discountItem.value;

                                                }
                                                    //else if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.PROMOTION_PROGRAM) == 0) {
                                                    //    if (data.order.order_line_items[i].promotion_items != null && data.order.order_line_items[i].promotion_items.length > 0) {
                                                    //        for (var k = 0; k < data.order.order_line_items[i].promotion_items.length; k++) {
                                                    //            orderClone.PromotionIdInOrderClone = data.order.order_line_items[i].promotion_items[k].promotion_id;
                                                    //        }
                                                    //        orderClone.order_line_items[i].is_apply_promotion_discount = true;
                                                    //    }

                                                    //}
                                                else if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.CUSTOMER_DEFAULT) == 0) {
                                                    orderClone.order_line_items[i].is_apply_customer_discount = true;
                                                }
                                                else if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.CUSTOMER_LOYALTY) == 0) {
                                                    orderClone.order_line_items[i].is_apply_normal_discount = true;
                                                    orderClone.order_line_items[i].is_normal_discount_percent = true;
                                                    orderClone.order_line_items[i].normal_discount_line_item = 100;
                                                }

                                            }

                                        }
                                    }
                                    for (var j = 0; j < data.variants.length; j++) {
                                        if (orderClone.order_line_items[i].variant_id == data.variants[j].id) {
                                            orderClone.order_line_items[i].sku = data.variants[j].sku;
                                            orderClone.order_line_items[i].opt1 = data.variants[j].opt1;
                                            orderClone.order_line_items[i].opt2 = data.variants[j].opt2;
                                            orderClone.order_line_items[i].opt3 = data.variants[j].opt3;
                                            orderClone.order_line_items[i].variant_prices = data.variants[j].variant_prices;
                                            orderClone.order_line_items[i].inventories = data.variants[j].inventories;
                                            orderClone.order_line_items[i].unit = data.variants[j].unit;
                                            orderClone.order_line_items[i].taxable = data.variants[j].taxable;
                                            orderClone.order_line_items[i].product_type = data.variants[j].product_type;
                                        }
                                    }
                                }


                                orderClone.is_apply_normal_discount = true;
                                orderClone.order_normal_discount_value = 0;
                                orderClone.is_normal_discount_percent = false;
                                orderClone.is_apply_loyalty_discount = false;
                                orderClone.is_apply_promotion_discount = false;

                                //$(".order-discount-value").removeAttr('disabled');
                                if (data.order.discount_items != null && data.order.discount_items.length > 0) {
                                    for (var i = 0; i < data.order.discount_items.length; i++) {
                                        var discountItem = data.order.discount_items[i];
                                        if (discountItem.rate > 0 || discountItem.value > 0) {
                                            if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.MANUAL) == 0) {
                                                orderClone.is_apply_normal_discount = true;
                                                orderClone.is_normal_discount_percent = discountItem.rate > 0 ? true : false;
                                                orderClone.order_normal_discount_value = discountItem.rate > 0 ? discountItem.rate : discountItem.value;

                                            }
                                                //else if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.PROMOTION_PROGRAM) == 0) {
                                                //    if (data.order.promotion_items != null && data.order.promotion_items.length > 0) {
                                                //        for (var j = 0; j < data.order.promotion_items.length; j++) {
                                                //            orderClone.PromotionIdInOrderClone = data.order.promotion_items[j].promotion_id;
                                                //        }

                                                //    }
                                                //    orderClone.is_apply_promotion_discount = true;

                                                //}
                                            else if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.CUSTOMER_LOYALTY)) {

                                            }
                                        }

                                    }
                                }



                                if (data.order.tax_treatment == "exclusive") {
                                    orderClone.tax_check = 0
                                }
                                else if (data.order.tax_treatment == "inclusive") {
                                    orderClone.tax_check = 1;
                                }
                                orderClone.tax_treatment = data.order.tax_treatment;

                                orderClone.price_list_id = data.order.price_list_id;
                                for (var i = 0; i < orderClone.price_lists.length; i++) {
                                    if (orderClone.price_list_id == orderClone.price_lists[i].id) {
                                        orderClone.price_list_name = orderClone.price_lists[i].name;
                                    }

                                }

                                orderClone.note = data.order.note;
                                orderClone.assignee_id = data.order.assignee_id;
                                for (var i = 0; i < orderClone.accounts.length; i++) {
                                    if (orderClone.assignee_id == orderClone.accounts[i].id) {
                                        orderClone.assignee_name = orderClone.accounts[i].full_name;
                                    }
                                }



                                // check tích điểm
                                that.CheckConditionLoyaltyOrderClone(orderClone, data.loyalty_customer);
                                //if (orderClone.discount_value > 0) {
                                //    orderClone.order_type = "orderCloneNotApplyLoyalty";
                                //    orderClone.order_clone_apply_loyalty = false;
                                //}


                                if (orderClone.is_apply_loyalty_discount == undefined) {
                                    orderClone.is_apply_loyalty_discount = false;
                                }
                                if (orderClone.is_apply_loyalty_discount) {
                                    orderClone.order_loyalty_discount_value = orderClone.current_loyalty_customer.loyalty_card.discount_value;

                                    //orderClone.discount_reason_tmp = "Tích điểm";
                                    if (orderClone.current_loyalty_customer.loyalty_card.discount_type == "percent")
                                        orderClone.is_loyalty_discount_percent = true;
                                    else orderClone.is_loyalty_discount_percent = false;
                                    //$(".order-discount-value").attr({
                                    //    'disabled': 'disabled'
                                    //});
                                }
                                else
                                    //$(".order-discount-value").removeAttr('disabled');
                                    $('#PointToAmount').removeAttr('disabled');
                                // end check tích điểm


                                //$(".order-discount-value").val(orderClone.order_loyalty_discount_value);
                                //if (orderClone.is_loyalty_discount_percent == true) {
                                //    $("#disablepercent").removeClass('active');
                                //    that.isDiscountPercentOrder(true);
                                //}
                                //else {
                                //    $("#activepercent").removeClass('active');
                                //    that.isDiscountPercentOrder(false);
                                //}

                                //orderClone.order_discount_rate = data.order.order_discount_rate;
                                //orderClone.order_discount_value = data.order.order_discount_value;
                                //orderClone.is_discount_percent = false;
                                //orderClone.is_discount_percent_tmp = false;

                                //orderClone.discount_value = that.getDiscountValue();

                                orderClone.tab_active = true;
                                that.orders[0] = orderClone;



                                $("ul.filter-tab-list").empty();
                                that.initAllTab();
                                that.initTableActive();
                                that.isDiscountPercent();
                                that.setBootstrapSwitch(that.orders[0]);
                                // Bindings.refreshImmediately();
                                //that.isDiscountPercent();
                                that.bindColRight();
                                if (orderClone.PromotionIdInOrderClone > 0) {
                                    that.getPromotionOrderClone(orderClone.PromotionIdInOrderClone);

                                }
                            }
                            else {
                                orderClone.name_order_clone = "Copy of " + data.order.code;
                                //orderClone.code = data.order_code;

                                orderClone.customer = data.customer;
                                orderClone.phone_number = data.customer.phone_number;
                                orderClone.customer_id = orderClone.customer.id;
                                orderClone.customer_name = orderClone.customer == null ? "" : orderClone.customer.name;
                                if (orderClone.customer.addresses != undefined && orderClone.customer.addresses != null && orderClone.customer.addresses.length != 0) {
                                    orderClone.billing_address = orderClone.customer.addresses[0];
                                    orderClone.shipping_address = orderClone.customer.addresses[0];
                                }

                                var discountCustomerDefault = 0;
                                if (orderClone.customer.apply_incentives == 'group') {
                                    orderClone.customer.default_discount_rate = orderClone.customer.customer_group.default_discount_rate;
                                    orderClone.customer.default_payment_method_id = orderClone.customer.customer_group.default_payment_method_id;
                                    orderClone.customer.default_price_list_id = orderClone.customer.customer_group.default_price_list_id;
                                    orderClone.customer.default_tax_type_id = orderClone.customer.customer_group.default_tax_type_id;
                                }
                                if (orderClone.customer.default_discount_rate != null) {
                                    discountCustomerDefault = orderClone.customer.default_discount_rate;
                                }

                                orderClone.order_line_items = data.order.order_line_items;
                                for (var i = 0; i < orderClone.order_line_items.length; i++) {

                                    if (orderClone.order_line_items[i].variant_name != null) {
                                        orderClone.order_line_items[i].variant_name = orderClone.order_line_items[i].variant_name.replace(/'/g, "&#39;").replace(/(?:\r\n|\r|\n)/g, ' ');
                                    }
                                    orderClone.order_line_items[i].name = orderClone.order_line_items[i].variant_name;
                                    orderClone.order_line_items[i].note = data.order.order_line_items[i].note;

                                    orderClone.order_line_items[i].is_apply_normal_discount = true;
                                    orderClone.order_line_items[i].is_apply_promotion_discount = false;
                                    orderClone.order_line_items[i].is_apply_customer_discount = false;
                                    orderClone.order_line_items[i].normal_discount_line_item = 0;
                                    orderClone.order_line_items[i].is_normal_discount_percent = false;
                                    orderClone.order_line_items[i].customer_discount_line_item_rate = discountCustomerDefault;
                                    orderClone.order_line_items[i].serials = [];

                                    if (data.order.order_line_items[i].discount_items != null && data.order.order_line_items[i].discount_items.length > 0) {
                                        for (var j = 0; j < data.order.order_line_items[i].discount_items.length; j++) {
                                            var discountItem = data.order.order_line_items[i].discount_items[j];
                                            if (discountItem.rate > 0 || discountItem.value > 0) {
                                                if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.MANUAL) == 0) {
                                                    orderClone.order_line_items[i].is_apply_normal_discount = true;
                                                    orderClone.order_line_items[i].is_normal_discount_percent = discountItem.rate > 0 ? true : false;
                                                    orderClone.order_line_items[i].normal_discount_line_item = discountItem.rate > 0 ? discountItem.rate : discountItem.value;

                                                }
                                                    //else if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.PROMOTION_PROGRAM) == 0) {
                                                    //    if (data.order.order_line_items[i].promotion_items != null && data.order.order_line_items[i].promotion_items.length > 0) {
                                                    //        for (var k = 0; k < data.order.order_line_items[i].promotion_items.length; k++) {
                                                    //            orderClone.PromotionIdInOrderClone = data.order.order_line_items[i].promotion_items[k].promotion_id;
                                                    //        }

                                                    //    }

                                                    //}
                                                else if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.CUSTOMER_DEFAULT) == 0) {
                                                    orderClone.order_line_items[i].is_apply_customer_discount = true;
                                                }
                                                else if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.CUSTOMER_LOYALTY) == 0) {
                                                    orderClone.order_line_items[i].is_apply_normal_discount = true;
                                                    orderClone.order_line_items[i].is_normal_discount_percent = true;
                                                    orderClone.order_line_items[i].normal_discount_line_item = 100;
                                                }

                                            }

                                        }
                                    }


                                    for (var j = 0; j < data.variants.length; j++) {
                                        if (orderClone.order_line_items[i].variant_id == data.variants[j].id) {
                                            orderClone.order_line_items[i].sku = data.variants[j].sku;
                                            orderClone.order_line_items[i].opt1 = data.variants[j].opt1;
                                            orderClone.order_line_items[i].opt2 = data.variants[j].opt2;
                                            orderClone.order_line_items[i].opt3 = data.variants[j].opt3;
                                            orderClone.order_line_items[i].variant_prices = data.variants[j].variant_prices;
                                            orderClone.order_line_items[i].inventories = data.variants[j].inventories;
                                            orderClone.order_line_items[i].unit = data.variants[j].unit;
                                            orderClone.order_line_items[i].taxable = data.variants[j].taxable;
                                            orderClone.order_line_items[i].product_type = data.variants[j].product_type;
                                            orderClone.order_line_items[i].status = data.variants[j].status;
                                        }
                                    }
                                }
                                var listItem = [];
                                for (var i = 0; i < orderClone.order_line_items.length; i++) {
                                    if (orderClone.order_line_items[i].status != "deleted")
                                        listItem.push(orderClone.order_line_items[i]);
                                }
                                orderClone.order_line_items = listItem;
                                orderClone.is_apply_normal_discount = true;
                                orderClone.order_normal_discount_value = 0;
                                orderClone.is_normal_discount_percent = false;
                                orderClone.is_apply_loyalty_discount = false;
                                orderClone.is_apply_promotion_discount = false;

                                //$(".order-discount-value").removeAttr('disabled');
                                if (data.order.discount_items != null && data.order.discount_items.length > 0) {
                                    for (var i = 0; i < data.order.discount_items.length; i++) {
                                        var discountItem = data.order.discount_items[i];
                                        if (discountItem.rate > 0 || discountItem.value > 0) {
                                            if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.MANUAL) == 0) {
                                                orderClone.is_apply_normal_discount = true;
                                                orderClone.is_normal_discount_percent = discountItem.rate > 0 ? true : false;
                                                orderClone.order_normal_discount_value = discountItem.rate > 0 ? discountItem.rate : discountItem.value;

                                            }
                                                //else if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.PROMOTION_PROGRAM) == 0) {
                                                //    if (data.order.promotion_items != null && data.order.promotion_items.length > 0) {
                                                //        for (var j = 0; j < data.order.promotion_items.length; j++) {
                                                //            orderClone.PromotionIdInOrderClone = data.order.promotion_items[j].promotion_id;
                                                //        }

                                                //    }

                                                //}
                                            else if (discountItem.source.localeCompare(Sapo.Const.DiscountSource.CUSTOMER_LOYALTY)) {

                                            }
                                        }

                                    }
                                }



                                if (data.order.tax_treatment == "exclusive") {
                                    orderClone.tax_check = 0
                                }
                                else if (data.order.tax_treatment == "inclusive") {
                                    orderClone.tax_check = 1;
                                }
                                orderClone.tax_treatment = data.order.tax_treatment;

                                orderClone.price_list_id = data.order.price_list_id;
                                for (var i = 0; i < orderClone.price_lists.length; i++) {
                                    if (orderClone.price_list_id == orderClone.price_lists[i].id) {
                                        orderClone.price_list_name = orderClone.price_lists[i].name;
                                    }

                                }

                                orderClone.note = data.order.note;
                                orderClone.assignee_id = data.order.assignee_id;
                                for (var i = 0; i < orderClone.accounts.length; i++) {
                                    if (orderClone.assignee_id == orderClone.accounts[i].id) {
                                        orderClone.assignee_name = orderClone.accounts[i].full_name;
                                    }
                                }



                                // check tích điểm
                                that.CheckConditionLoyaltyOrderClone(orderClone, data.loyalty_customer);
                                //if (orderClone.discount_value > 0) {
                                //    orderClone.order_type = "orderCloneNotApplyLoyalty";
                                //    orderClone.order_clone_apply_loyalty = false;
                                //}


                                if (orderClone.is_apply_loyalty_discount == undefined) {
                                    orderClone.is_apply_loyalty_discount = false;
                                }
                                if (orderClone.is_apply_loyalty_discount) {
                                    orderClone.order_loyalty_discount_value = orderClone.current_loyalty_customer.loyalty_card.discount_value;

                                    //orderClone.discount_reason_tmp = "Tích điểm";
                                    if (orderClone.current_loyalty_customer.loyalty_card.discount_type == "percent")
                                        orderClone.is_loyalty_discount_percent = true;
                                    else orderClone.is_loyalty_discount_percent = false;
                                    //$(".order-discount-value").attr({
                                    //    'disabled': 'disabled'
                                    //});
                                }
                                else
                                    //$(".order-discount-value").removeAttr('disabled');
                                    $('#PointToAmount').removeAttr('disabled');
                                // end check tích điểm


                                //$(".order-discount-value").val(orderClone.order_loyalty_discount_value);
                                //if (orderClone.is_loyalty_discount_percent == true) {
                                //    $("#disablepercent").removeClass('active');
                                //    that.isDiscountPercentOrder(true);
                                //}
                                //else {
                                //    $("#activepercent").removeClass('active');
                                //    that.isDiscountPercentOrder(false);
                                //}

                                //orderClone.order_discount_rate = data.order.order_discount_rate;
                                //orderClone.order_discount_value = data.order.order_discount_value;
                                //orderClone.is_discount_percent = false;
                                //orderClone.is_discount_percent_tmp = false;

                                //orderClone.discount_value = that.getDiscountValue();

                                orderClone.tab_active = true;
                                that.orders[0] = orderClone;



                                $("ul.filter-tab-list").empty();
                                that.initAllTab();
                                that.initTableActive();
                                that.isDiscountPercent();
                                that.setBootstrapSwitch(that.orders[0]);
                                // Bindings.refreshImmediately();
                                //that.isDiscountPercent();
                                that.bindColRight();
                                if (orderClone.PromotionIdInOrderClone > 0) {
                                    that.getPromotionOrderClone(orderClone.PromotionIdInOrderClone);

                                }
                                orderClone.order_line_items.forEach(function (lineItem, lineIndex) {
                                    that.getUnitsOnline(lineItem)
                                })

                            }


                        },
                        error: function (data) {
                            if (data.status == 403) {
                                NProgress.done();
                                Sapo.Utility.handleForbiddenRequest(false); return;
                            }
                        }
                    });
                }
                PosOrder.prototype.getUnitsOnline = function (searchedVariant) {
                    var that = this;
                    var orderIndex = searchedVariant.index;
                    var itemIndex = searchedVariant.item_index;
                    var variantId = searchedVariant.variant_id
                    $.ajax({
                        url: ajaxUrls.getUnitByProduct,
                        data: { variantId: variantId },
                        dataType: "json",
                        type: "GET",
                        success: function (data) {
                            if (data != null && data.units != null && data.units.length > 0) {
                                searchedVariant.units = data.units;
                                var html = "";
                                for (var i = 0; i < data.units.length; i++) {
                                    var unit = data.units[i];
                                    html = html +
                                        " <li>"
                                        + "<a bind-event-click='updateVariantByUnit(" + orderIndex + "," + itemIndex + "," + unit.variant_id + " )' unit-id='" + unit.variant_id + "' style='font-size: 12px; padding: 6px' class='elementUnit-" + orderIndex + "-" + itemIndex + "'>"
                                        + unit.name
                                        + "</a>" +
                                        "</li> ";
                                }
                                $("tr#variant-" + itemIndex + "").find(".td-units ul").append(html);
                                Bindings.unbind($("table#table-order tbody").get(0));
                                Bindings.bind($("table#table-order tbody").get(0));
                            }
                        },
                        complete: function () {
                            that.checkDisplayUnit(orderIndex, itemIndex, variantId);
                        }
                    });
                }
                PosOrder.prototype.CheckConditionLoyaltyOrderClone = function (order, result) {
                    order.customer.is_loyalty = false;
                    order.current_loyalty_customer = null;
                    for (var j = 0; j < order.payment_methods.length; j++) {
                        if (order.payment_methods[j].type == "point") {
                            order.payment_methods[j].show = false;
                        }
                    }
                    if (result != null) {
                        order.current_loyalty_customer = result;
                        if (order.current_loyalty_customer.loyalty_setting.status == "active" && order.current_loyalty_customer.status == "active") {
                            order.customer.is_loyalty = true;
                            var currentdate = new Date().toISOString();
                            order.customer.is_show_discount = false;
                            order.is_apply_loyalty_discount = false;
                            if (order.current_loyalty_customer.loyalty_card_id > 0
                                && order.current_loyalty_customer.loyalty_card.status == "active"
                                && order.current_loyalty_customer.started_on != null
                                && order.current_loyalty_customer.ended_on != null
                                && Date.parse(order.current_loyalty_customer.started_on) < Date.parse(currentdate)
                                && Date.parse(currentdate) < Date.parse(order.current_loyalty_customer.ended_on)
                            ) {
                                var total = 0;
                                if (order.order_line_items != null) {
                                    if (order.order_line_items.length != 0) {
                                        for (var i = 0; i < order.order_line_items.length; i++) {
                                            if (order.order_line_items[i] != null) {
                                                if (order.order_line_items[i].is_discount_percent)
                                                    total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * (order.order_line_items[i].discount_value / 100)));
                                                else
                                                    total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value));
                                            }
                                        }
                                    }
                                }
                                if (order.current_loyalty_customer.loyalty_card.amount_condition <= total) {
                                    order.customer.is_show_discount = true;
                                    order.is_apply_loyalty_discount = true;
                                }
                            }
                            //if (result.result.point > 0) {
                            order.customer.is_zero_point = false;
                            //} else order.customer.is_zero_point = true;

                            if (order.current_loyalty_customer.loyalty_setting.allowed_point_payment) {
                                for (var j = 0; j < order.payment_methods.length; j++) {
                                    if (order.payment_methods[j].type == "point") {
                                        order.payment_methods[j].show = true;
                                    }
                                }
                            }
                        }
                        else {
                            order.current_loyalty_customer = null;
                        }
                    }
                }

                PosOrder.prototype.loadTabActive = function (index) {
                    var that = this;
                    for (var i = 0; i < that.orders.length; i++) {
                        if (that.orders[i].tab_active == true)
                            that.orders[i].tab_active = false;
                    }

                    that.orders[index].tab_active = true;
                    $("ul.filter-tab-list").empty();
                    this.initAllTab();
                    this.initTableActive();
                    if (offline) {
                        var order = this.initTabActive();
                        if (order.customer != null) {
                            order.customer.is_loyalty = false;
                            order.is_apply_loyalty_discount = false;
                        }
                    }

                    this.setBootstrapSwitch(that.orders[index]);
                    var order = this.initTabActive();
                    // $(".order-discount-value").val(order.discount_value_tmp);
                    $("#input-order-discount-group").removeClass('disabled');
                    if (order.is_discount_percent_tmp == true) {
                        $("#disablepercent").removeClass('active');
                        this.isDiscountPercentOrder(true);
                    }
                    else {
                        $("#activepercent").removeClass('active');
                        this.isDiscountPercentOrder(false);

                    }

                    this.inactivePromotionTab();
                    this.isDiscountPercent();
                    this.bindColRight();
                    if (order.zalo_pay_status == "waiting" || order.vnpay_status == "waiting") {
                        $("#payment-waiting > p").html("Chờ xác nhận thanh toán qua " + order.prepayment_provider);
                        $("#payment-waiting").show();
                        $(".search-input-pos").attr("disabled", "disabled")
                    } else if (order.zalo_pay_status == "success") {
                        $("#payment-waiting").hide();
                        $(".search-input-pos").removeAttr("disabled")
                        this.paymentZaloSuccess.show();
                        $("#zalo-orderId").val(order.id);
                        $(".modal-zalo-success .modal-body").append(order.zalo_pay_html);
                    } else if (order.vnpay_status == "success") {
                        $("#payment-waiting").hide();
                        $(".search-input-pos").removeAttr("disabled");
                        this.paymentZaloSuccess.show();
                        $("#zalo-orderId").val(order.id);
                        $(".modal-zalo-success .modal-body").append(order.zalo_pay_html);
                    } else {
                        $("#payment-waiting").hide();
                        $(".search-input-pos").removeAttr("disabled")
                    }
                }

                PosOrder.prototype.updateScollBar = function () {
                    if (this.variantFilter != null) {

                        this.variantFilter.displayAreaHeight = $(".order-menu-screen__left-detail").height();
                        this.variantFilter.displayFilterHeight = $(window).height() - $(".order-menu-screen__left-detail").height() - 20;
                        $(".create-layout").css({ "position": "fixed", "top": $(".order-menu-screen__left-detail").height() - 35 });
                        $(".create-layout").css({ "width": $(".order-menu-screen__left-variant").css("width") });

                        this.setVariantFilterCookie(this.variantFilter);

                    } else {
                        $(".create-layout").css({ "position": "fixed", "top": $(".order-menu-screen__left-detail").height() - 35 });
                        $(".create-layout").css({ "width": $(".order-menu-screen__left-variant").css("width") });
                    }
                    var scroll = document.querySelector.bind(document);
                    var container_left = scroll('.order-menu-screen__left-variant');
                    Ps.update(container_left);

                }

                PosOrder.prototype.resizableZero = function () {
                    var that = this;

                    //$(".order-menu-screen__left-tab_variant").height(190);
                    //$("#order-menu-screen__right").height($(window).height() -18);
                    $(".order-menu-screen__left-detail").css({ "height": $(window).height() - 28 });
                    $(".order-menu-screen__left-detail").css({ "min-height": $(window).height() - 170 * 2 - 14 - 8 });
                    $(".order-menu-screen__left-detail").css({ "max-height": $(window).height() - 28 });
                    //$(".order-menu-screen__left").css({ "max-height": $(window).height() - 8 });
                    that.updateScollBar();
                    $(".order-menu-screen__left-detail").jelta({
                        handleSelector: ".order-menu-screen__left-horizontal",
                        resizeWidth: false,
                        onDrag: function (e, $el, newWidth, newHeight, opt) {
                            that.updateScollBar();
                        }
                    });
                }

                PosOrder.prototype.createHorizontal = function () {
                    var that = this;
                    let variantFilter = this.getVariantFilterCookie();
                    var displayFilterHeight = 170;
                    if (variantFilter != null) {
                        displayFilterHeight = variantFilter.displayFilterHeight;
                    }

                    $(".order-menu-screen__left-detail").css({ "height": $(window).height() - displayFilterHeight - 28 });
                    $(".order-menu-screen__left-detail").css({ "min-height": $(window).height() - 170 * 2 - 28 });
                    $(".create-layout").css({ "position": "fixed", "top": $(".order-menu-screen__left-detail").height() - 35 });
                    $(".create-layout").css({ "width": $(".order-menu-screen__left-variant").css("width") });
                    //$(".order-menu-screen__left-detail").css({ "max-height": $(window).height() - 8 - 8 });
                    //$(".order-menu-screen__left").css({ "max-height": $(window).height() - 8 });
                    $(".order-menu-screen__left-detail").jelta({
                        handleSelector: ".order-menu-screen__left-horizontal",
                        resizeWidth: false,
                        onDrag: function (e, $el, newWidth, newHeight, opt) {
                            that.updateScollBar();
                        }
                    });
                }

                PosOrder.prototype.createScollBar = function () {
                    this.variantFilter = this.getVariantFilterCookie();
                    if (this.variantFilter != null) {

                        this.variantFilter.displayAreaHeight = $(".order-menu-screen__left-detail").height();
                        this.variantFilter.displayFilterHeight = $(window).height() - $(".order-menu-screen__left-detail").height() - 20;
                        $(".create-layout").css({ "position": "fixed", "top": $(".order-menu-screen__left-detail").height() - 35 });
                        $(".create-layout").css({ "width": $(".order-menu-screen__left-variant").css("width") });

                    } else {
                        $(".create-layout").css({ "position": "fixed", "top": $(".order-menu-screen__left-detail").height() - 35 });
                        $(".create-layout").css({ "width": $(".order-menu-screen__left-variant").css("width") });
                    }
                    var scroll = document.querySelector.bind(document);
                    var container_left = scroll('.order-menu-screen__left-variant');
                    Ps.initialize(container_left);
                }

                PosOrder.prototype.creatScrollTabPromotion = function () {
                    $("#block-promotion-tab").height($(".pos-right-block-amount").height() - 40);
                    $("#block-promotion-tab").css({ "position": "relative" });
                    var scroll = document.querySelector.bind(document);
                    var containt = scroll('#block-promotion-tab');
                    Ps.initialize(containt);
                }

                PosOrder.prototype.showButtonTabListArrow = function () {
                    var maxWidth = $(window).width() - $(".order-menu-screen__right").width() - $(".search-layout-common").width() - 0.068 * $(window).width() - $(".order-menu-screen__left-location").width() - 35;
                    //var currentWidth = $("#filter-tab-list").width();
                    var currentWidth = $("#filter-tab-list")[0].childElementCount * $(".filter-tab-item").width() + 40;

                    if (parseFloat(maxWidth) <= parseFloat(currentWidth)) {
                        $(".order-menu-screen__left-tab").width(maxWidth);
                        $(".order-menu-screen__left-tab").css({ "overflow": "hidden" });
                        if (checkResetPositionTab) {
                            $("#filter-tab-list").css({ "position": "absolute" });
                            $("#filter-tab-list").css({ left: maxWidth - currentWidth });
                        }
                        $(".search-layout-common").css("padding", "0")
                        return true;
                    }
                    $(".search-layout-common").css("padding-right", "20px")
                    $(".order-menu-screen__left-tab").width("auto");
                    $("#filter-tab-list").css({ "position": "initial" });
                    return false;
                }

                var checkResetPositionTab = true;
                var stepLength = 100;

                PosOrder.prototype.clickButtonClickTabArrowNext = function () {
                    var currentPossition = $("#filter-tab-list").position();
                    var currentWidth = $("#filter-tab-list")[0].childElementCount * $(".filter-tab-item").width() + 40;
                    var maxWidth = $(window).width() - $(".order-menu-screen__right").width() - $(".search-layout-common").width() - 0.068 * $(window).width() - $(".order-menu-screen__left-location").width() - 35;
                    var minleft = maxWidth - currentWidth;
                    var nextStep = currentPossition.left - stepLength;
                    if (nextStep < minleft) {
                        $("#filter-tab-list").css({ left: minleft });
                    } else {
                        $("#filter-tab-list").css({ left: nextStep });
                    }
                    checkResetPositionTab = false
                }
                PosOrder.prototype.clickButtonClickTabArrowPrevious = function () {
                    var currentPossition = $("#filter-tab-list").position();
                    var currentWidth = $("#filter-tab-list")[0].childElementCount * $(".filter-tab-item").width() + 40;
                    var maxWidth = $(window).width() - $(".order-menu-screen__right").width() - $(".search-layout-common").width() - 0.068 * $(window).width() - $(".order-menu-screen__left-location").width() - 35;
                    var previousStep = currentPossition.left + stepLength;
                    if (previousStep > 0) {
                        $("#filter-tab-list").css({ left: 0 });
                    } else {
                        $("#filter-tab-list").css({ left: previousStep });
                    }
                    checkResetPositionTab = false
                }

                var requestAjaxProduct;
                PosOrder.prototype.autoComplete = function () {
                    var that = this;
                    var order = that.initTabActive();
                    var count = 0;
                    var page = 2;
                    var total = 0;
                    var checkLoad = false;
                    $(".search-input").autocomplete({
                        appendTo: "#search-result-holder-prd",
                        delay: 500,
                        source: function (request, response) {
                            if (request.term != undefined && request.term != null && request.term != "")
                                if (offline) {
                                    Variant.dao.getByFilter(request, function (data) {
                                        var length = data.length > 50 ? 50 : data.length;
                                        data = data.slice(0, length)
                                        var array = [];

                                        if (data == null || data.length == 0 || data.error) {
                                            array.push({
                                                label: "",
                                                value: "Không tìm sản phẩm.",
                                                urlimage: null,
                                                variant: null
                                            });
                                        } else {
                                            array = data.error ? [] : $.map(data, function (m) {
                                                var image = (m.images != null && m.images.length > 0) ? m.images[0] : null;
                                                return {
                                                    label: m.name == null ? "  " : m.name,
                                                    value: "",
                                                    urlimage: image != null ? Sapo.image.headThumb + Sapo.image.small + image.path : "",
                                                    variant: m
                                                };
                                            });
                                        }
                                        response(array);
                                    },
                                        function (error) {
                                        })
                                }
                                else {
                                    count = 0;
                                    page = 2;
                                    total = 0;
                                    if (requestAjaxProduct && requestAjaxProduct.readyState != 4) {
                                        requestAjaxProduct.abort();
                                    }
                                    requestAjaxProduct = $.ajax({
                                        url: ajaxUrls.variantDropdown,
                                        data: { query: request.term },
                                        dataType: "json",
                                        type: "GET",
                                        success: function (data) {
                                            $("#search-result-holder-prd .ui-autocomplete").scrollTop(0)
                                            var array = [];

                                            if (data.total != null) {
                                                total = data.total
                                                //$("#Note").html('' + total + '')
                                            }
                                            if (data == null || data.variants == null || data.variants.length == 0 || data.error) {
                                                array.push({
                                                    label: "",
                                                    value: "Không tìm sản phẩm.",
                                                    urlimage: null,
                                                    variant: null
                                                });
                                            } else {
                                                if (data != null && data.variants != null) {
                                                    count = data.variants.length
                                                }
                                                console.log(data.variants)
                                                array = $.map(data.variants, function (m) {
                                                    var image = (m.images != null && m.images.length > 0) ? m.images[0] : null;
                                                    return {
                                                        label: m.name == null ? "  " : m.name,
                                                        value: "",
                                                        urlimage: image != null ? Sapo.image.headThumb + Sapo.image.small + image.path : "",
                                                        variant: m
                                                    };
                                                });
                                            }

                                            response(array);
                                            checkLoad = true;
                                        },
                                        error: function (data) {
                                            if (data.status == 403) {
                                                NProgress.done();
                                                Sapo.Utility.handleForbiddenRequest(false); return;
                                            }
                                        }
                                    });

                                }
                            $("#search-result-holder-prd .ui-autocomplete").scroll(function () {
                                if (count < total) {
                                    var heightItem = $("#search-result-holder-prd .ui-menu-item").height()
                                    var heightdocument = count * heightItem + count;
                                    var heightwindown = $("#search-result-holder-prd .ui-autocomplete").height();
                                    var scroll = $("#search-result-holder-prd .ui-autocomplete ").scrollTop();


                                    if ((heightdocument - heightwindown - scroll) < 30 && checkLoad) {
                                        checkLoad = false
                                        var query = $("#search-input").val()
                                        requestAjaxProduct = $.ajax({
                                            url: ajaxUrls.variantDropdown,
                                            data: { query: query, page: page },
                                            dataType: "json",
                                            type: "GET",
                                            success: function (data) {
                                                page++;
                                                var array = data.error ? [] : $.map(data.variants, function (m) {
                                                    var image = (m.images != null && m.images.length > 0) ? m.images[0] : null;
                                                    return {
                                                        label: m.name == null ? "  " : m.name,
                                                        value: "",
                                                        urlimage: image != null ? Sapo.image.headThumb + Sapo.image.small + image.path : "",
                                                        variant: m
                                                    };
                                                });
                                                for (var i = 0; i < array.length; i++) {
                                                    count++
                                                    item = array[i];
                                                    $("#search-result-holder-prd .ui-autocomplete").append("<li id='itemprd" + count + "' style='float:left;width:100%;list-style: none;border-bottom: 1px #dcdee2 solid;'  class='ui-menu-item' role='menuitem'></li>")

                                                    $("#itemprd" + count + "").data("item.autocomplete", item).append(
                                                        '<a href="javascript:void(0)" tabindex="-1" class="" style="height:50px">' +
                                                        //'<div style="" class="">' +
                                                        '<div style=" padding: 8.5px; float:left;width:11%;    border-right: 1px #dcdee2 solid;">' +
                                                        ((item.variant.images != null && item.variant.images.length > 0) ? '<div class="thumb">' + '<img alt="' + item.variant.name + '" class="block s-none thumb-30" height="40" width="40" src="' + item.urlimage + '" title="' + item.variant.name + '">' + '</div>' : '<div>' +
                                                            '<img width="40" height="40" src="/images/image-default.png" class="set-img" alt="">' +
                                                            '</div>') +
                                                        '</div>' +
                                                        '<div class="search-product-content" style=" padding: 6px; float:left;width:63%">' +
                                                        '<div class="search-product-content-name">' +
                                                        '<span>' + item.variant.name + '</span>' +
                                                        //item.variant.product_name + " - " +
                                                        '</div>' +

                                                        '<div class="search-product-content-sku">'
                                                        + (item.variant.category == null ? "" : item.variant.category) + "   " + (item.variant.sku == null ? "" : item.variant.sku) + "   " + ((item.variant.opt1 == null || item.variant.opt1 == "") ? "" : StandardOption(item.variant.opt1, item.variant.opt2, item.variant.opt3)) + ((item.variant.opt2 == null || item.variant.opt2 == "") ? "" : (" / " + item.variant.opt2)) + ((item.variant.opt3 == null || item.variant.opt3 == "") ? "" : (" / " + item.variant.opt3)) +
                                                        '</div>' +

                                                        '</div>' +

                                                        '<div class="search-product-content" style="width: 26%;float:left; text-align: right; padding-right: 2%;padding: 6px;">' +
                                                        '<div class="search-product-content-name">' +
                                                        money(that.getPriceById(item.variant, order.tenant_setting.sale_price_list_id), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol) +
                                                        '</div>' +

                                                        '<div class="search-product-content-sku" style="text-transform: none; ">' +
                                                        'Có thể bán: <span style="font-weight:bold;">' + $.formatNumber(that.getAvailableVariant(item.variant), { format: "#,##0.###", locale: "en" }) + '</span> ' +
                                                        '</div>' +
                                                        '</div>' +

                                                        //'</div>'+
                                                        '</a>')
                                                    $("#itemprd" + count + "").click(function (event, ui) {
                                                        var itemPrd = this
                                                        var searchedVariant = $(itemPrd).data("item.autocomplete").variant;
                                                        t0 = performance.now();
                                                        that.getUnitsAndAddLineItem(searchedVariant);
                                                        $('.search-input').autocomplete('close');
                                                    })
                                                }

                                                checkLoad = true
                                            },
                                            error: function (data) {
                                                if (data.status == 403) {
                                                    NProgress.done();

                                                    Sapo.Utility.handleForbiddenRequest(false);
                                                    return;
                                                }


                                            }
                                        });

                                    }
                                }

                            });
                        },
                        //position: { my: "left bottom", at: "left-50 bottom-25%", of: "#productcomplete" },
                        minLength: 0,
                        open: function () {
                            $(".ui-autocomplete").css({ "width": "50%", });
                            $(".ui-autocomplete").css({ "z-index": "10000000000", });
                        },
                        close: function (event, ui) {

                        },
                        focus: function (event, ui) {

                        },
                        create: function (event, ui) {

                            //$(".ui-autocomplete").css({ "width": "72.8%", "left": 0 });
                        },
                        select: function (event, ui) {

                            var searchedVariant = ui.item.variant;

                            that.getUnitsAndAddLineItem(searchedVariant);
                        }
                    })
                        .focus(function (event, ui) {
                            event.preventDefault();
                            $(this).autocomplete("search");
                        })
                        .data('autocomplete')._renderItem = function (ul, item) {
                            if (item.variant == null) {
                                return $("<li style='float:left;width:100%;list-style: none;    border-bottom: 1px #dcdee2 solid;'></li>")
                                    .data("item.autocomplete", item)
                                    .append(
                                        '<a href="javascript:void(0)" tabindex="-1" class="">' +

                                        '<div class="fl w100 text-overflow-hiden search-product-content" style="height:50px; padding-top: 12px;">' +
                                        '<span>Không tìm thấy sản phẩm</span>' +
                                        '</div>' +
                                        '</a>'

                                    )
                                    .appendTo(ul);
                            } else {
                                return $("<li style='float:left;width:100%;list-style: none;    border-bottom: 1px #dcdee2 solid;'></li>")
                                    .data("item.autocomplete", item)
                                    .append(
                                        '<a href="javascript:void(0)" tabindex="-1" class="" style="height:50px">' +
                                        //'<div style="" class="">' +
                                        '<div style=" padding: 8.5px; float:left;width:11%;    border-right: 1px #dcdee2 solid;">' +
                                        ((item.variant.images != null && item.variant.images.length > 0) ? '<div class="thumb">' + '<img alt="' + item.variant.name + '" class="block s-none thumb-30" height="40" width="40" src="' + item.urlimage + '" title="' + item.variant.name + '">' +
                                            '</div>' : '<div>' +
                                            '<img width="40" height="40" src="/images/image-default.png" class="set-img" alt="">' +
                                            '</div>') +
                                        '</div>' +
                                        '<div class="search-product-content" style=" padding: 6px; float:left;width:63%">' +
                                        '<div class="search-product-content-name">' +
                                        '<span>' + item.variant.name + '</span>' +
                                        //item.variant.product_name + " - " +
                                        '</div>' +

                                        '<div class="search-product-content-sku">'
                                        + (item.variant.category == null ? "" : item.variant.category) + "   " + (item.variant.sku == null ? "" : item.variant.sku) + "   " + ((item.variant.opt1 == null || item.variant.opt1 == "") ? "" : StandardOption(item.variant.opt1, item.variant.opt2, item.variant.opt3)) + ((item.variant.opt2 == null || item.variant.opt2 == "") ? "" : (" / " + item.variant.opt2)) + ((item.variant.opt3 == null || item.variant.opt3 == "") ? "" : (" / " + item.variant.opt3)) +
                                        '</div>' +

                                        '</div>' +

                                        '<div class="search-product-content" style="width: 26%;float:left; text-align: right; padding-right: 2%;padding: 6px;">' +
                                        '<div class="search-product-content-name">' +
                                        money(that.getPriceById(item.variant, order.tenant_setting.sale_price_list_id), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol) +
                                        '</div>' +

                                        '<div class="search-product-content-sku" style="text-transform: none; ">' +
                                        'Có thể bán: <span style="font-weight:bold;">' + $.formatNumber(that.getAvailableVariant(item.variant), { format: "#,##0.###", locale: "en" }) + '</span> ' +
                                        '</div>' +
                                        '</div>' +

                                        //'</div>'+
                                        '</a>'

                                    )
                                    .appendTo(ul);
                            }
                        };

                    // END - AUTOCOMPLETE
                }

                var requestAjaxCustomer;
                PosOrder.prototype.autoCompleteCustomer = function (av) {
                    var that = this;
                    var count = 0;
                    var page = 2;
                    var total = 0;
                    var checkLoad = false;

                    $(".search-customer").autocomplete({
                        appendTo: "#search-result-holder-cus",
                        delay: 500,
                        source: function (request, response) {
                            if (request.term == undefined || request.term == null || request.term == "") {
                                var array = [];
                                array.push({
                                    label: "Thêm mới khách hàng.",
                                    value: "",
                                    create: true,
                                    customer: null
                                });
                                response(array);
                            }
                            else {
                                if (offline) {
                                    var rq = Customer.dao.getByFilter(request,
                                        function (data) {
                                            var array = [];
                                            if (data == null || data.length == 0) {
                                                array.push({
                                                    label: "Thêm mới khách hàng.",
                                                    value: "",
                                                    create: true,
                                                    customer: null
                                                });
                                                array.push({
                                                    label: "",
                                                    value: "Không tìm thấy khách hàng.",
                                                    customer: null
                                                });
                                            }
                                            else {
                                                array.push({
                                                    label: "Thêm mới khách hàng.",
                                                    value: "",
                                                    create: true
                                                });
                                                var length = data.length <= 50 ? data.length : 50;
                                                for (var i = 0; i < length; i++) {
                                                    var m = data[i];
                                                    array.push({
                                                        value: m.name == null ? " --- " : m.name,
                                                        label: m.phone_number == null ? " --- " : m.phone_number,
                                                        customer: m
                                                    });
                                                }
                                            }
                                            response(array);
                                        })
                                }
                                else {
                                    count = 0;
                                    page = 2;
                                    total = 0;
                                    if (requestAjaxCustomer && requestAjaxCustomer.readyState != 4) {
                                        requestAjaxCustomer.abort();
                                    }
                                    requestAjaxCustomer = $.ajax({
                                        url: ajaxUrls.searchCustomer,
                                        data: { query: $(".search-customer").val(), locationId: that.order.location_id },
                                        dataType: "json",
                                        type: "GET",
                                        success: function (data) {
                                            $("#search-result-holder-cus .ui-autocomplete").scrollTop(0)
                                            if (data.total_record != null) {
                                                total = data.total_record
                                                //$("#Note").html('' + total + '')
                                            }
                                            if (data != null && data.customers != null) {
                                                count = data.customers.length
                                            }
                                            //alert((data[0].FullName === null || data[0].FullName === '') ? data[0].Name : data[0].FullName);
                                            var array = [];
                                            if (data.customers == null || data.customers.length == 0 || data.error) {
                                                array.push({
                                                    label: "Thêm mới khách hàng.",
                                                    value: "",
                                                    create: true,
                                                    customer: null
                                                });
                                                array.push({
                                                    label: "",
                                                    value: "Không tìm thấy khách hàng.",
                                                    customer: null
                                                });
                                            }
                                            else {
                                                array.push({
                                                    label: "Thêm mới khách hàng.",
                                                    value: "",
                                                    create: true
                                                });
                                                for (var i = 0; i < data.customers.length; i++) {
                                                    var m = data.customers[i];
                                                    array.push({
                                                        value: m.name == null ? " --- " : m.name,
                                                        label: m.phone_number == null ? " --- " : m.phone_number,
                                                        customer: m
                                                    });
                                                }
                                                //array = data.error ? [] : $.map(data.customers, function (m) {
                                                //    return {
                                                //        value: m.name == null ? " --- " : m.name,
                                                //        label: m.phone_number == null ? " --- " : m.phone_number,
                                                //        customer: m
                                                //    };
                                                //});
                                            }

                                            response(array);
                                            checkLoad = true;
                                        },
                                        error: function (data) {
                                            if (data.status == 403) {
                                                NProgress.done();

                                                Sapo.Utility.handleForbiddenRequest(false); return;
                                            }


                                        }

                                    });
                                }
                            }

                            $("#search-result-holder-cus .ui-autocomplete").scroll(function () {
                                if (count < total) {
                                    var heightItem = $("#search-result-holder-cus .ui-menu-item").height()
                                    var heightdocument = count * heightItem + count;
                                    var heightwindown = $("#search-result-holder-cus .ui-autocomplete").height();
                                    var scroll = $("#search-result-holder-cus .ui-autocomplete ").scrollTop();


                                    if ((heightdocument - heightwindown - scroll) < 30 && checkLoad) {
                                        checkLoad = false
                                        var query = $("#search-input-customer").val()
                                        requestAjaxProduct = $.ajax({
                                            url: ajaxUrls.searchCustomer,
                                            data: { query: query, locationId: that.order.location_id, page: page },
                                            dataType: "json",
                                            type: "GET",
                                            success: function (data) {
                                                page++;
                                                var array = data.error ? [] : $.map(data.customers, function (m) {
                                                    return {
                                                        value: m.name == null ? " --- " : m.name,
                                                        label: m.phone_number == null ? " --- " : m.phone_number,
                                                        customer: m
                                                    };
                                                });
                                                for (var i = 0; i < array.length; i++) {
                                                    count++
                                                    item = array[i];
                                                    $("#search-result-holder-cus .ui-autocomplete").append("<li id='itemcus" + count + "' style='float:left;width:100%;list-style: none;border-bottom: 1px #dcdee2 solid;'  class='ui-menu-item' role='menuitem'></li>")

                                                    $("#itemcus" + count + "").data("item.autocomplete", item).append(
                                                        '<a href="javascript:void(0)" tabindex="-1" class="">' +
                                                        '<div class="fl w100 text-overflow-hiden search-customer-div">' + item.value + '</div>' +
                                                        '<div class="fl w100 text-overflow-hiden search-customer-div" style="padding-bottom:4px">' + item.label + '</div>' +

                                                        '</a>')
                                                    $("#itemcus" + count + "").click(function (event, ui) {
                                                        var itemCus = this;
                                                        that.setCustomer($(itemCus).data("item.autocomplete").customer);
                                                        //that.addLineItem($(itemPrd).data("item.autocomplete").variant)
                                                        $('.search-customer').autocomplete('close');
                                                    })
                                                }

                                                checkLoad = true
                                            },
                                            error: function (data) {
                                                if (data.status == 403) {
                                                    NProgress.done();

                                                    Sapo.Utility.handleForbiddenRequest(false);
                                                    return;
                                                }


                                            }
                                        });

                                    }
                                }

                            });
                        },
                        //position: { my: "left bottom", at: "left-50 bottom-25%", of: "#productcomplete" },
                        minLength: 0,
                        open: function () {
                            $(".ui-autocomplete").css({ "width": "320px" });
                            $(".ui-autocomplete").css({ "font-size": "13px" });
                            $(".ui-autocomplete").css({ "z-index": "10000000000" });
                        },
                        close: function () {
                            if (that.type_action == "createold") {
                                $(".search-customer").val("");
                            }
                            that.check_auto = true;
                            //Bindings.bind($("table#table-order tbody").get(0));
                            //Bindings.refreshImmediately();
                        },
                        select: function (event, ui) {
                            that.check_auto = true;
                            if (ui.item.customer != null)
                                that.setCustomer(ui.item.customer);
                            else {
                                var inputCustomer = $(".search-customer").val();
                                that.addCustomer(inputCustomer);
                            }
                        }
                    }).focus(function (event, ui) {
                        event.preventDefault();
                        $(this).autocomplete("search");
                    }).data('autocomplete')._renderItem = function (ul, item) {
                        if (item.create != undefined) {
                            return $("<li style='float:left;width:100%;list-style: none;    border-bottom: 1px #dcdee2 solid;'></li>")
                                .data("item.autocomplete", item)
                                .append(
                                    '<a href="javascript:void(0)" tabindex="-1" class="">' +

                                    '<div class="fl w100 text-overflow-hiden search-customer-div" style="padding: 1px 0px 0px 8px;">' +
                                    '<i class="fa fa-user-plus" aria-hidden="true"></i>' +
                                    '<span>Thêm mới khách hàng</span>' +
                                    '</div>' +
                                    '</a>'

                                )
                                .appendTo(ul);
                        }
                        else {
                            var a = $("<li style='float:left;width:100%;list-style: none;    border-bottom: 1px #dcdee2 solid;'></li>")
                                .data("item.autocomplete", item);
                            return $("<li style='float:left;width:100%;list-style: none;    border-bottom: 1px #dcdee2 solid;'></li>")
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

                    // END - AUTOCOMPLETE
                }
                PosOrder.prototype.isCheckCustomer = function (index) {
                    var order = this.initTabActive();
                    if (order.customer != null) {
                        if (order.customer.id != 0) {
                            return true;
                        }
                        else
                            return false;
                    }
                    else {
                        return false;
                    }
                }

                PosOrder.prototype.showCustomerName = function () {
                    var order = this.initTabActive();
                    if (offline) {
                        if (order.local_customer_id > 0 && (order.customer_default == undefined || order.local_customer_id != order.customer_default.id)) return true;
                        return false;
                    } else {
                        if (order.customer_id > 0 && (order.customer_default == undefined || order.customer_id != order.customer_default.id)) return true;
                        return false;
                    }
                }

                PosOrder.prototype.getCustomerName = function () {
                    var order = this.initTabActive();
                    if (order.customer_name != null) {
                        if (order.customer_name.length > 30) {
                            order.customer_name = order.customer_name.substr(0, 24) + '...';
                            return order.customer_name;
                        }
                        return order.customer_name;

                    } else {
                        return "";
                    }
                }

                PosOrder.prototype.openPopupEditCustomer = function () {
                    var order = this.initTabActive();
                    if (order.customer_id != 0) {
                        var url = "/admin/customers/PopupEditFromPOS?id=" + order.customer_id;
                        this.createNewCustomer.fetchHTML(url, {
                            onRender: function () {

                            }
                        });
                    }
                }

                PosOrder.prototype.closeCustomer = function () {
                    var order = this.initTabActive();
                    if (order.edit_order == true) {
                        Sapo.Flash.error("Không được đổi khách hàng khi sửa đơn hàng!");
                        return;
                    }
                    order.email = null;
                    order.phone_number = null;
                    order.customer = order.customer_default;
                    order.customer_id = order.customer_default.id;
                    order.customer.phone_number = null;
                    order.customer_name = null;
                    order.customer.default_tax_type_id = order.customer.default_tax_type_id;
                    order.local_customer_id = order.customer.local_id;
                    order.billing_address = null;
                    order.shipping_address = null;
                    order.current_loyalty_customer = undefined;
                    this.setPriceIdCustomerDefault();
                    this.resetDiscount();

                    order.is_apply_loyalty_discount = false;
                }

                PosOrder.prototype.totalQuantityItem = function () {

                    var total = 0;
                    var order = this.initTabActive();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    //if (order.order_line_items[i].is_freeform != true) {
                                    total += parseFloat(order.order_line_items[i].quantity);
                                    //}
                                }
                            }
                            //return money(total, order.currency.delimiter, order.currency.separator, order.currency.precision, "");
                            return $.formatNumber(total, { format: "#,##0.###", locale: "en" })
                        } else {
                            return 0;

                        }
                    }
                    return 0;
                }
                PosOrder.prototype.totalMoneyItem = function () {
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    var discountItem = 0;
                                    order.order_line_items[i].discount_items = that.getDiscountItemsLineItem(i);
                                    for (var j = 0; j < order.order_line_items[i].discount_items.length; j++) {
                                        var item = order.order_line_items[i].discount_items[j];
                                        if (item != null) {
                                            if (parseFloat(item.rate) > 0) {
                                                discountItem += (parseInt((order.order_line_items[i].price)) * item.rate) / 100;
                                            }
                                            else
                                                discountItem += item.value;
                                        }

                                    }
                                    total += parseFloat((order.order_line_items[i].quantity * (order.order_line_items[i].price - discountItem)).toFixed(11));
                                }
                            }
                            return total;
                        } else {
                            return 0;
                        }
                    }
                    else {
                        return 0;
                    }
                    //if (order.order_line_items != null) {
                    //    if (order.order_line_items.length != 0) {
                    //        for (var i = 0; i < order.order_line_items.length; i++) {
                    //            if (order.order_line_items[i] != null) {
                    //                //if (order.order_line_items[i].is_discount_percent)
                    //                //    total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * (order.order_line_items[i].discount_value / 100)));
                    //                //else
                    //                total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - this.totalDiscountLineItemNotRound(i)));
                    //            }
                    //        }
                    //    }
                    //}
                    return total;
                }
                PosOrder.prototype.totalMoneyReturnAmount = function () {
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    if (order.order_line_items[i].is_discount_percent) {
                                        if (order.tax_check == 0) {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100)) * (1 + this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100));
                                        } else {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100)));
                                        }
                                    }
                                    else {
                                        if (order.tax_check == 0) {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value) * (1 + this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100));
                                        } else {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value));
                                        }
                                    }
                                }
                            }
                            total = total - order.return_amount;
                            return money((-total < 0 ? 0 : -total), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        } else {
                            return money(0 - parseFloat(order.return_amount), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        }
                    }
                    else {
                        return money(0 - parseFloat(order.return_amount), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    }
                }
                PosOrder.prototype.totalMoneyOrderDetail = function (i) {

                    var total = 0;
                    var order = this.initTabActive();
                    var totalDiscountItem = this.totalDiscountLineItemNotRound(i);

                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            if (order.order_line_items[i] != null) {
                                //if (order.order_line_items[i].is_discount_percent) {
                                //    total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * (order.order_line_items[i].discount_value / 100)));
                                //}
                                //else {
                                total += parseFloat((order.order_line_items[i].quantity * (order.order_line_items[i].price - totalDiscountItem)).toFixed(11));
                                //}
                                return money(total, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            }
                            else {
                                return 0;
                            }
                        } else {
                            return 0;
                        }
                    }
                    else {
                        return 0;
                    }
                }
                PosOrder.prototype.totalMoneyOrderDetailFloat = function (i) {

                    var total = 0;
                    var order = this.initTabActive();

                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            if (order.order_line_items[i] != null) {
                                if (order.order_line_items[i].is_discount_percent) {
                                    total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * (order.order_line_items[i].discount_value / 100)));
                                }
                                else {
                                    total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value));
                                }
                                return total;
                            }
                            else {
                                return 0;
                            }
                        } else {
                            return 0;
                        }
                    }
                    else {
                        return 0;
                    }
                }
                PosOrder.prototype.totalMoneyItemAndTax = function () {

                    var total = 0;
                    var order = this.initTabActive();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    if (order.order_line_items[i].is_discount_percent) {
                                        if (order.tax_check == 0) {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100)) * (1 + this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100));
                                        } else {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100)));
                                        }
                                    }
                                    else {
                                        if (order.tax_check == 0) {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value) * (1 + this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100));
                                        } else {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value));
                                        }
                                    }
                                }
                            }

                            return money(total, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        }
                    }
                    return money(0, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                }
                PosOrder.prototype.totalMoneyReturnAmout = function () {
                    var that = this;
                    var total = that.totalMoneyItem();
                    var order = this.initTabActive();
                    //var vat = 0;
                    var shippingCostFee = order.fee;
                    if (shippingCostFee == undefined) {
                        shippingCostFee = 0;
                    }
                    //if (order.tax_check == 0) {
                    //    vat = that.totalVat();
                    //}
                    if (order.tax_check == 0) {
                        total = 0;
                        if (order.order_line_items != null) {
                            if (order.order_line_items.length != 0) {
                                for (var i = 0; i < order.order_line_items.length; i++) {
                                    if (order.order_line_items[i] != null) {
                                        total += order.order_line_items[i].lineAmount;// line amount da bao gom thue va chiet khau lineitem
                                    }
                                }
                            }
                        }
                    }
                    var totalMoneyReturnAmout = total - that.totalDisCountOrder(false) + parseFloat(shippingCostFee);
                    return Math.round(totalMoneyReturnAmout);
                }

                PosOrder.prototype.totalCustomerPayment = function () {
                    var that = this;
                    var total = that.totalMoneyItem();
                    var order = this.initTabActive();
                    var vat = 0;
                    if (order.tax_check == 0) {
                        vat = that.totalVat();
                    }
                    var totalMoneyReturnAmout = total + vat - that.totalDisCountOrder(false);
                    var hadPayment = 0;
                    if (order.paymentsTmp != undefined && order.paymentsTmp != null && order.paymentsTmp.length != 0)
                        for (var i = 0; i < order.paymentsTmp.length; i++) {
                            hadPayment += parseFloat(order.paymentsTmp[i].amount);
                        }
                    return hadPayment;
                }

                PosOrder.prototype.totalMissingMoney = function () {
                    var that = this;
                    var total = that.totalMoneyItem();
                    var order = this.initTabActive();
                    var vat = 0;
                    if (order.tax_check == 0) {
                        vat = that.totalVat();
                    }
                    var totalMoneyReturnAmout = total + vat - that.totalDisCountOrder(false);
                    var hadPayment = that.totalCustomerPayment();

                    return totalMoneyReturnAmout < hadPayment ? 0 : totalMoneyReturnAmout - hadPayment;
                }
                PosOrder.prototype.totalParseFloatMoneyItemAndTax = function () {
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    if (order.order_line_items[i].is_discount_percent) {
                                        if (order.tax_check == 0) {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100)) * (1 + this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100));
                                        } else {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100)));
                                        }
                                    }
                                    else {
                                        if (order.tax_check == 0) {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value) * (1 + this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100));
                                        } else {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value));
                                        }
                                    }
                                }
                            }
                            //
                            var discount_order = 0;
                            if (order.discount_value_tmp > 0) {
                                discount_order = order.discount_value_tmp;
                                if (order.is_discount_percent_tmp) discount_order = (order.discount_value_tmp * total) / 100;
                            }
                            //
                            return Math.round(total - discount_order);
                        } else {
                            return 0;
                        }
                    }
                    else {
                        return 0;
                    }
                }
                PosOrder.prototype.totalParseFloatMoneyLineItemAndTax = function () {
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    if (order.order_line_items[i].is_discount_percent) {
                                        if (order.tax_check == 0) {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100)) * (1 + this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100));
                                        } else {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100)));
                                        }
                                    }
                                    else {
                                        if (order.tax_check == 0) {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value) * (1 + this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100));
                                        } else {
                                            total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value));
                                        }
                                    }
                                }
                            }
                            return total
                        } else {
                            return 0;
                        }
                    }
                    else {
                        return 0;
                    }
                }
                PosOrder.prototype.totalExcessMoney = function (check) {
                    var that = this;
                    var order = this.initTabActive();
                    var shippingCostFee = that.fee;
                    if (shippingCostFee == undefined) {
                        shippingCostFee = 0;
                    }
                    var total = this.loadMoneyReturn() - this.totalMoneyReturnAmout();
                    if (total < 0)
                        total = 0;
                    if (check == true)
                        return total;
                    return money(total, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                }
                PosOrder.prototype.loadDetailPos = function () {
                    window.location.href = "/admin/orders";
                }
                PosOrder.prototype.parseFloatTax = function (tax) {
                    if (tax == "")
                        tax = 0;
                    return parseFloat(tax);
                }
                PosOrder.prototype.totalTaxtRate = function (value) {
                    var total = 0;
                    var order = this.initTabActive();

                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    if (order.order_line_items[i].tax_rate_override == value) {
                                        if (order.order_line_items[i].is_discount_percent) {
                                            if (order.tax_check == 0) {
                                                total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100)) * this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100);
                                            }
                                            else {
                                                total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100)) * (this.parseFloatTax(order.order_line_items[i].tax_rate_override) / (100 + this.parseFloatTax(order.order_line_items[i].tax_rate_override))));

                                            }
                                        }
                                        else {
                                            if (order.tax_check == 0) {
                                                total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value) * this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100);
                                            }
                                            else {
                                                total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value) * (this.parseFloatTax(order.order_line_items[i].tax_rate_override) / (100 + this.parseFloatTax(order.order_line_items[i].tax_rate_override))));

                                            }
                                        }
                                    }
                                }
                            }
                            return money(total, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        }
                    }

                }
                PosOrder.prototype.totalAmountItem = function () {
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    if (order.order_line_items[i].is_discount_percent) {
                                        total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100)));
                                    }
                                    else {
                                        total += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].discount_value));
                                    }
                                }
                            }

                        }
                    }
                    return total == 0 ? 1 : total;
                }
                PosOrder.prototype.totalVat = function () {

                    //var order = this.initTabActive();
                    //var that = this;
                    //var totalAmountBeforeApplyTax = parseFloat(this.totalMoneyItem().toFixed(3));
                    //var totalDiscountOrder = parseFloat(this.orderTotalDiscount().toFixed(3));
                    //if (order.order_line_items != null) {

                    //    if (order.order_line_items.length != 0) {
                    //        if (order.tax_check == 0) {
                    //            for (var i = 0; i < order.order_line_items.length; i++) {

                    //                if (order.order_line_items[i] != null) {
                    //                    var persentTax = this.parseFloatTax(order.order_line_items[i].tax_rate_override);
                    //                    var totalDiscountItem = parseFloat(this.totalDiscountLineItemNotRound(i).toFixed(3));

                    //                    var discount_item = parseFloat((order.order_line_items[i].price - totalDiscountItem).toFixed(3));
                    //                    var totalMoneyAfterDiscountLineItem = parseFloat((order.order_line_items[i].quantity * discount_item).toFixed(3));
                    //                    var discountOrderInLineItem = parseFloat((totalDiscountOrder * totalMoneyAfterDiscountLineItem / totalAmountBeforeApplyTax).toFixed(3));

                    //                    var taxLineItem = (totalMoneyAfterDiscountLineItem - discountOrderInLineItem) * persentTax / 100;

                    //                    total += Math.round(taxLineItem);
                    //                }
                    //            }
                    //        }
                    //        else {

                    //            this.totalAmountBeforeApplyTaxInclueTax();
                    //            for (var i = 0; i < order.order_line_items.length; i++) {
                    //                if (order.order_line_items[i] != null) {
                    //                    var persentTax = this.parseFloatTax(order.order_line_items[i].tax_rate_override);

                    //                    var totalDiscountOrderPercent =  this.getOrderDiscountPersent();

                    //                    var totalDiscountOrderValue = this.getOrderDiscountNotPersent();

                    //                    var discountOrderInLineItemPercent = parseFloat((totalDiscountOrderValue * order.order_line_items[i].totalMoneyAfterDiscountLineItem / order.totalAmountBeforeApplyTaxInclueTax).toFixed(3));

                    //                    var discountOrderInLineItemNotPercent =   parseFloat((order.order_line_items[i].totalMoneyAfterDiscountLineItem * totalDiscountOrderPercent / 100).toFixed(3))

                    //                    var taxLineItem = parseFloat(((order.order_isPaidline_items[i].totalMoneyAfterDiscountLineItem - discountOrderInLineItemPercent - discountOrderInLineItemNotPercent) * persentTax / 100).toFixed(3));
                    //                    total += Math.round(taxLineItem);
                    //                }
                    //            }
                    //        }
                    //    }
                    //}
                    //return total;
                    var total = 0;
                    var that = this;
                    var order = this.initTabActive();
                    var beginAmount; //tiền hàng ban đầu = giá * số lượng
                    var discountRate; //phần trăm chiết khấu = discountRate trong orderLineItem
                    var discountValueByRate; //Chiết khấu % quy ra tiền
                    var discountValueByValue; //Chiết khấu tiền= discountValue * số lượng
                    var discountAmount; //Tổng chiết khấu bán hàng của line item

                    order.discount_rate = 0;
                    order.discount_value = 0;
                    order.discount_items = this.getDiscountItemsOrder();
                    if (order.discount_items != null && order.discount_items.length > 0) {
                        order.discount_items.forEach(function (orderDiscount, orderDiscountIndex) {
                            if (orderDiscount != null) {
                                if (parseFloat(orderDiscount.rate) > 0) {
                                    order.discount_rate += parseFloat(orderDiscount.rate)
                                }
                                else {
                                    order.discount_value += parseFloat(orderDiscount.value);
                                }
                            }
                        })
                    }
                    //if (order.type_action == "create_fullment") {
                    //    var totalAmount = order.totalLineAmountAfterLineDiscount;
                    //    order.discount_value = order.discount_value * order.totalMoneyItem() / totalAmount;
                    //}
                    if (order.order_line_items != null && order.order_line_items.length > 0) {
                        order.order_line_items.forEach(function (lineItem, index) {
                            if (lineItem != null) {
                                lineItem.discount_rate = 0;
                                lineItem.discount_value = 0;
                                lineItem.taxAmount = 0;
                                lineItem.beginAmount = parseFloat((lineItem.quantity * lineItem.price).toFixed(11));
                                lineItem.discount_items = that.getDiscountItemsLineItem(index);
                                if (lineItem.discount_items != null && lineItem.discount_items.length > 0) {
                                    lineItem.discount_items.forEach(function (discountItem, indexDiscount) {
                                        if (discountItem != null) {
                                            if (parseFloat(discountItem.rate) > 0) {
                                                lineItem.discount_rate += parseFloat(discountItem.rate);
                                            }
                                            else {
                                                lineItem.discount_value += parseFloat(discountItem.value);
                                            }
                                        }
                                    })
                                }
                                lineItem.discountValueByRate = lineItem.beginAmount * lineItem.discount_rate / 100;
                                lineItem.discountValueByValue = lineItem.discount_value * lineItem.quantity;
                                lineItem.discountAmount = lineItem.discountValueByRate + lineItem.discountValueByValue;
                                lineItem.lineAmountAfterLineDiscount = lineItem.beginAmount - lineItem.discountAmount;

                                lineItem.distributedDiscountValue = order.discount_value * (lineItem.lineAmountAfterLineDiscount / that.totalMoneyItem());
                                lineItem.distributedDiscountRate = order.discount_rate;
                                if (order.tax_check == 1) {
                                    lineItem.originalAmount = parseFloat((lineItem.beginAmount * 100 / (parseFloat(lineItem.tax_rate_override) + 100)).toFixed(10)); //Làm tròn theo (1)

                                    lineItem.discountValueByRate = parseFloat((lineItem.originalAmount * lineItem.discount_rate / 100).toFixed(10)); //Làm tròn theo (1)
                                    lineItem.discountValueByValue = parseFloat((lineItem.discountValueByValue * (100) / (parseFloat(lineItem.tax_rate_override) + 100)).toFixed(10));
                                    lineItem.discountAmount = parseFloat((lineItem.discountValueByRate + lineItem.discountValueByValue).toFixed(10));

                                    lineItem.distributedDiscountValueByRate = parseFloat(((lineItem.originalAmount - lineItem.discountAmount) * lineItem.distributedDiscountRate / 100).toFixed(10)); //Làm tròn theo (1)
                                    lineItem.distributedDiscountValueByValue = parseFloat((lineItem.distributedDiscountValue * (100 / (lineItem.tax_rate_override + 100))).toFixed(10)); //Làm tròn theo (1)
                                    lineItem.distributedDiscountAmount = parseFloat((lineItem.distributedDiscountValueByRate + lineItem.distributedDiscountValueByValue).toFixed(10));//Làm tròn theo (1)
                                } else {
                                    lineItem.originalAmount = lineItem.beginAmount;

                                    lineItem.discountValueByRate = parseFloat((lineItem.originalAmount * lineItem.discount_rate / 100).toFixed(10)); //Làm tròn theo (1)
                                    lineItem.discountValueByValue = parseFloat((lineItem.discountValueByValue).toFixed(10));
                                    lineItem.discountAmount = parseFloat((lineItem.discountValueByRate + lineItem.discountValueByValue).toFixed(10));

                                    lineItem.distributedDiscountValueByRate = parseFloat(((lineItem.originalAmount - lineItem.discountAmount) * lineItem.distributedDiscountRate / 100).toFixed(10)); //Làm tròn theo (1)
                                    lineItem.distributedDiscountValueByValue = parseFloat((lineItem.distributedDiscountValue).toFixed(10));
                                    lineItem.distributedDiscountAmount = parseFloat((lineItem.distributedDiscountValueByRate + lineItem.distributedDiscountValueByValue).toFixed(10));
                                }
                                lineItem.taxAmount = parseFloat(((lineItem.originalAmount - lineItem.discountAmount - lineItem.distributedDiscountAmount) * parseFloat(lineItem.tax_rate_override) / 100).toFixed(10)); //Làm tròn theo (2)
                                if (order.tax_check == 0) {
                                    lineItem.lineAmount = parseFloat((lineItem.lineAmountAfterLineDiscount + lineItem.taxAmount).toFixed(0));
                                }
                                else {
                                    lineItem.lineAmount = parseFloat((lineItem.lineAmountAfterLineDiscount).toFixed(0));
                                }
                                total += lineItem.taxAmount;
                            }
                        })
                    }
                    return total;
                }

                PosOrder.prototype.totalAmountBeforeApplyTaxInclueTax = function () {
                    var order = this.initTabActive();
                    var that = this;
                    var total = 0;
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    var persentTax = this.parseFloatTax(order.order_line_items[i].tax_rate_override);
                                    if (order.tax_check == 1) {
                                        var VariantMoney = parseFloat(((order.order_line_items[i].quantity * order.order_line_items[i].price) / ((100 + persentTax) / 100)).toFixed(3));

                                        order.order_line_items[i].discount_item = parseFloat(this.getTotalDiscountLineItemInclueTax(VariantMoney, i).toFixed(3));

                                        order.order_line_items[i].totalMoneyAfterDiscountLineItem = parseFloat((VariantMoney - order.order_line_items[i].discount_item).toFixed(3));

                                        total += order.order_line_items[i].totalMoneyAfterDiscountLineItem;
                                    }
                                }
                            }
                        }
                    }
                    order.totalAmountBeforeApplyTaxInclueTax = total;
                }


                PosOrder.prototype.getTotalDiscountLineItemInclueTax = function (realPrice, index) {
                    var order = this.initTabActive();
                    var total = 0;

                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null) {
                        var orderItem = order.order_line_items[index];
                        var totalMoney = realPrice;


                        if (orderItem.is_apply_loyalty_discount != undefined && orderItem.is_apply_loyalty_discount) {
                            total += totalMoney;
                        }
                        if (orderItem.is_apply_customer_discount != undefined && orderItem.is_apply_customer_discount && orderItem.customer_discount_line_item_rate > 0) {
                            total += (parseFloat(orderItem.customer_discount_line_item_rate) * totalMoney) / 100;
                        }
                        if (orderItem.is_apply_promotion_discount != undefined && orderItem.is_apply_promotion_discount
                            && orderItem.order_promotion_discount_value != undefined && parseFloat(orderItem.order_promotion_discount_value) > 0) {
                            if (orderItem.is_promotion_discount_percent) total += parseFloat(orderItem.order_promotion_discount_value) * totalMoney / 100;

                            else total += parseFloat(orderItem.order_promotion_discount_value * orderItem.quantity)
                        }

                        if (orderItem.is_apply_normal_discount != undefined && orderItem.is_apply_normal_discount
                            && orderItem.normal_discount_line_item != undefined && parseFloat(orderItem.normal_discount_line_item) > 0) {
                            if (orderItem.is_normal_discount_percent) total += (parseFloat(orderItem.normal_discount_line_item) * totalMoney) / 100;
                            else total += parseFloat(orderItem.normal_discount_line_item * orderItem.quantity);
                        }



                        return total;
                    }
                    return 0;
                }

                PosOrder.prototype.lineitemVat = function () {
                    var total = 0;
                    var order = this.initTabActive();
                    var that = this;
                    //// kiểm tra áp dụng chiết khấu tích điểm
                    //if (order.is_apply_loyalty_discount == undefined) {
                    //    order.is_apply_loyalty_discount = false;
                    //}
                    //if (order.is_apply_loyalty_discount) {
                    //    order.order_discount_value = order.current_loyalty_customer.loyalty_card.discount_value;
                    //    if (order.current_loyalty_customer.loyalty_card.discount_type == "percent")
                    //        order.is_discount_percent = true;
                    //    else order.is_discount_percent = false;
                    //    order.is_apply_loyalty_discount = true;

                    //} else {
                    //    if (order.is_apply_loyalty_discount == undefined) {
                    //        order.is_apply_loyalty_discount = false;
                    //    }
                    //    if (order.is_apply_loyalty_discount) {
                    //        order.order_discount_value = 0;
                    //        order.is_discount_percent = false;
                    //        order.is_apply_loyalty_discount = false;
                    //    }
                    //}
                    ////end


                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    if (order.order_line_items[i].is_discount_percent) {
                                        if (order.tax_check == 0) {
                                            var discount_item = (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_value) / 100));
                                            if (order.is_discount_percent) {
                                                order.order_line_items[i].vatamount = Math.round(order.order_line_items[i].quantity * (discount_item - discount_item * order.order_discount_value / 100) * this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100);
                                            }
                                            else {
                                                order.order_line_items[i].vatamount = Math.round(order.order_line_items[i].quantity * (discount_item - discount_item * order.order_discount_value / that.totalAmountItem()) * this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100);
                                            }
                                        }
                                        else {
                                            var amount_vat = (1 / (1 + this.parseFloatTax(order.order_line_items[i].tax_rate_override / 100))) * parseFloat(order.order_line_items[i].price);
                                            if (order.is_discount_percent) {
                                                order.order_line_items[i].vatamount = Math.round(order.order_line_items[i].quantity * amount_vat * (1 - order.order_line_items[i].discount_value / 100) * (1 - order.order_discount_value / 100) * this.parseFloatTax(order.order_line_items[i].tax_rate_override / 100));
                                            }
                                            else {
                                                order.order_line_items[i].vatamount = Math.round((order.order_line_items[i].quantity * amount_vat * (1 - order.order_line_items[i].discount_value / 100) - (that.totalMoneyOrderDetailFloat(i) * order.order_discount_value / that.totalAmountItem())) * this.parseFloatTax(order.order_line_items[i].tax_rate_override / 100));
                                            }
                                        }
                                    }
                                    else {
                                        if (order.tax_check == 0) {
                                            var discount_item = (order.order_line_items[i].price - order.order_line_items[i].discount_value);
                                            if (order.is_discount_percent) {
                                                order.order_line_items[i].vatamount = Math.round(order.order_line_items[i].quantity * (discount_item - discount_item * order.order_discount_value / 100) * this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100);
                                            }
                                            else {
                                                order.order_line_items[i].vatamount = Math.round(order.order_line_items[i].quantity * (discount_item - discount_item * order.order_discount_value / that.totalAmountItem()) * this.parseFloatTax(order.order_line_items[i].tax_rate_override) / 100);
                                            }
                                        }
                                        else {
                                            var amount_vat = (1 / (1 + this.parseFloatTax(order.order_line_items[i].tax_rate_override / 100))) * parseFloat(order.order_line_items[i].price);
                                            if (order.is_discount_percent) {
                                                order.order_line_items[i].vatamount = Math.round(order.order_line_items[i].quantity * (amount_vat - order.order_line_items[i].discount_value) * (1 - order.order_discount_value / 100) * this.parseFloatTax(order.order_line_items[i].tax_rate_override / 100));
                                            }
                                            else {
                                                order.order_line_items[i].vatamount = Math.round((order.order_line_items[i].quantity * (amount_vat - order.order_line_items[i].discount_value) - (that.totalMoneyOrderDetailFloat(i) * order.order_discount_value / that.totalAmountItem())) * this.parseFloatTax(order.order_line_items[i].tax_rate_override / 100));
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }

                }
                PosOrder.prototype.bindPriceItem = function () {
                    //mac dinh gio xet ve = buyprice
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    order.order_line_items[i].price = order.order_line_items[i].buy_price;
                                }
                            }
                        }
                    }
                    $(".order-menu-screen__right_detailorder-resetprice").css({ "display": "none" });
                    Bindings.bind($(".order-menu-screen").get(0));
                    Bindings.refreshImmediately();

                }
                PosOrder.prototype.noneBindPriceItem = function () {
                    $(".order-menu-screen__right_detailorder-resetprice").css({ "display": "none" });
                }
                PosOrder.prototype.setParamSelect = function (node, event, param, defaultVal) {

                    var value = $(node).val();
                    if (value == defaultVal)
                        value = 0;
                    for (var option in this) {
                        if (option == param) {

                            this[option] = parseFloat(value);
                        }
                    }
                }
                PosOrder.prototype.initSelect = function () {
                    var that = this.initTabActive();
                    //billingto
                    var $select = $('.order-menu-screen__right_detailcustomer-adress__billto-drop .billto-select').selectize({
                        valueField: 'id',
                        labelField: 'label',
                        searchField: 'label',
                        options: [],
                        create: false,
                        render: {
                            option: function (item, escape) {
                                return '<div>' + item.label + '</div>';
                            },
                            item: function (item, escape) {
                                var name = item.label;
                                if (item.label.length > 20) {
                                    name = item.label.substring(0, 20) + "...";
                                }
                                return '<div>' + name + '</div>';
                            }
                        },
                        load: function (query, callback) {
                            if (!query.length) return callback();
                            $.ajax({
                                url: ajaxUrls.searchAddressCustomer,
                                type: 'GET',
                                dataType: 'json',
                                data: {
                                    customerId: that.customer.id,
                                },
                                error: function () {
                                    callback();
                                },
                                success: function (res) {
                                    callback(res.list_addresses);
                                }
                            });
                        }
                    });
                    //ship
                    $('.order-menu-screen__right_detailcustomer-adress__shipto-drop .shipto-select').selectize({
                        valueField: 'id',
                        labelField: 'label',
                        searchField: 'label',
                        options: [],
                        create: false,
                        render: {
                            option: function (item, escape) {
                                return '<div>' + item.label + '</div>';
                            },
                            item: function (item, escape) {
                                var name = item.label;
                                if (item.label.length > 20) {
                                    name = item.label.substring(0, 20) + "...";
                                }
                                return '<div>' + name + '</div>';
                            }
                        },
                        load: function (query, callback) {
                            if (!query.length) return callback();
                            $.ajax({
                                url: ajaxUrls.searchAddressCustomer,
                                type: 'GET',
                                dataType: 'json',
                                data: {
                                    customerId: that.customer.id,
                                },
                                error: function () {
                                    callback();
                                },
                                success: function (res) {
                                    callback(res.list_addresses);
                                }
                            });
                        }
                    });
                    //contact
                    $('.order-menu-screen__right_detailcustomer-adress__contact-drop .contact-select').selectize({
                        valueField: 'id',
                        labelField: 'name',
                        searchField: 'name',
                        options: [],
                        create: false,
                        render: {
                            option: function (item, escape) {
                                return '<div>' + item.name + '</div>';
                            },
                            item: function (item, escape) {
                                var name = item.name;
                                if (item.name.length > 20) {
                                    name = item.name.substring(0, 20) + "...";
                                }
                                return '<div>' + name + '</div>';
                            }
                        },
                        load: function (query, callback) {
                            if (!query.length) return callback();
                            $.ajax({
                                url: ajaxUrls.searchAddressCustomer,
                                type: 'GET',
                                dataType: 'json',
                                data: {
                                    customerId: that.customer.id,
                                },
                                error: function () {
                                    callback();
                                },
                                success: function (res) {
                                    callback(res.list_contacts);
                                }
                            });
                        }
                    });
                }
                PosOrder.prototype.setCustomer = function (customer) {
                    var that = this;
                    var order = this.initTabActive();
                    order.email = customer.email;
                    order.phone_number = customer.phone_number == null ? "" : customer.phone_number;
                    order.customer.phone_number = customer.phone_number == null ? "---" : customer.phone_number;
                    order.customer = customer;
                    order.customer_id = order.customer.id;
                    order.customer_name = order.customer == null ? "" : order.customer.name;
                    order.customer.phone_number = customer.phone_number == null ? "---" : customer.phone_number;
                    order.customer.default_tax_type_id = customer.default_tax_type_id;
                    order.local_customer_id = customer.local_id;
                    if (!offline) {
                        //$.ajax({
                        //    url: ajaxUrls.searchAddressCustomer,
                        //    type: 'GET',
                        //    dataType: 'json',
                        //    data: {
                        //        customerId: customer.id,
                        //    },
                        //    success: function (res) {
                        //        if (res.list_addresses.length > 0) {
                        //            order.billing_address = res.list_addresses[0];
                        //            order.shipping_address = res.list_addresses[0];
                        //            order.customer.addresses = res.list_addresses;
                        //        }
                        //        else {
                        //            order.billing_address = null;
                        //            order.shipping_address = null;
                        //        }
                        //    }
                        //});
                        if (customer.addresses != undefined && customer.addresses != null && customer.addresses.length > 0) {
                            customer.addresses = customer.addresses.filter(function (element) { return element != undefined && element != null && element.status == "active"; }).sort(function (a, b) {
                                return a.id < b.id;
                            });
                            order.billing_address = customer.addresses[0];
                            order.shipping_address = customer.addresses[0];
                            order.customer.addresses = customer.addresses
                        } else {
                            order.billing_address = null;
                            order.shipping_address = null;
                            order.customer.addresses = null;
                        }
                    } else {
                        if (customer.addresses != undefined && customer.addresses != null && customer.addresses.length > 0) {
                            customer.addresses = customer.addresses.filter(function (element) { return element != undefined && element != null && element.status == "active"; }).sort(function (a, b) {
                                return a.id < b.id;
                            });
                            order.billing_address = customer.addresses[0];
                            order.shipping_address = customer.addresses[0];
                            order.customer.addresses = customer.addresses
                        } else {
                            order.billing_address = null;
                            order.shipping_address = null;
                            order.customer.addresses = null;
                        }

                    }

                    //$(".order-menu-screen__right_detailcustomer").css({ "display": "block" });
                    //that.updateScollBar();
                    if (!offline) {
                        that.CheckConditionLoyalty();
                    }
                    that.resetTaxByCustomer();
                    that.resetDiscount();
                    Bindings.bind($(".order-menu-screen").get(0));
                    Bindings.refreshImmediately();

                    var HasItem = false;
                    if (order.order_line_items != undefined && order.order_line_items != null && order.order_line_items.length > 0) {
                        for (var i = 0; i < order.order_line_items.length; i++) {
                            if (order.order_line_items[i] != undefined && order.order_line_items[i] != null) {
                                HasItem = true;
                            }
                        }
                    }
                    if (order.customer.default_price_list_id > 0) {
                        if (order.customer.default_price_list_id != order.price_list_id) {
                            if (HasItem) {
                                that.changePriceIdForCustomerModal.show();
                            } else {
                                that.setPriceIdCustomer();
                            }
                        }

                    }
                    else if (order.tenant_setting.sale_price_list_id != order.price_list_id) {
                        if (HasItem) {
                            that.changePriceIdForCustomerModal.show();
                        } else {
                            that.setPriceIdCustomerDefault();
                        }
                    }

                    this.resetPromotion();
                    //setTimeout(function () { that.isBindingDataDone = true;}, 500)
                }

                PosOrder.prototype.resetDiscount = function () {
                    var that = this;
                    var order = this.initTabActive();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != undefined && order.order_line_items[i] != null) {
                                    if (order.customer.default_discount_rate != null) {
                                        order.order_line_items[i].customer_discount_line_item_rate = order.customer.default_discount_rate;
                                        order.order_line_items[i].is_apply_customer_discount = true;
                                        if (order.order_line_items[i].metafields != undefined) {
                                            order.order_line_items[i].metafields = null;
                                            order.order_line_items[i].is_apply_loyalty_discount = false;
                                            order.order_line_items[index].isForLoyalty = false;
                                        }
                                    }
                                    else {
                                        order.order_line_items[i].customer_discount_line_item_rate = 0;
                                        order.order_line_items[i].is_apply_customer_discount = false;
                                    }
                                }
                            }
                        }
                    }
                    this.resetPromotion();
                }


                PosOrder.prototype.setTaxTypeItem = function (TaxTypeId, EffectiveRate, i) {
                    var order = this.initTabActive();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            order.order_line_items[i].tax_type_id = TaxTypeId;
                            order.order_line_items[i].tax_rate_override = parseFloat(EffectiveRate.replace(/"."/g, ""));
                            order.order_line_items[i].isChangeTax = true;
                            //this.changTaxRateItem();
                            Bindings.refreshImmediately();
                        }
                    }

                }
                PosOrder.prototype.changeCurrency = function () {
                    var that = this;
                    var order = this.initTabActive();
                    NProgress.start();
                    $.ajax({
                        url: ajaxUrls.changePrice,
                        type: "GET",
                        global: false,
                        data: { currencyId: order.currency_id },
                        success: function (data) {

                            $("select#PriceListId").empty();
                            var checkselect = false;
                            var checkselect0 = false;
                            var html = "";


                            if (data != null) {
                                for (var i = 0; i < data.length; i++) {

                                    if (that.customer != null) {
                                        if (that.customer.id != 0) {
                                            if (that.customer.default_price_list_id == data[i].id) {
                                                checkselect = true;
                                                checkselect0 = true;
                                            }
                                        }
                                    }
                                    if (checkselect) {
                                        html += '<option selected="selected" value="' + data[i].id + '">' + data[i].name + '</option>';
                                        that.price_list_id = data[i].id;
                                        checkselect = false;
                                    }
                                    else {
                                        html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                                    }
                                }

                            }
                            if (!checkselect0) {
                                that.price_list_id = 0;
                                //html0 = '<option selected="selected" value="0">Chọn giá mặc định</option>';
                            }

                            else
                                //html0 = '<option value="0">Chọn giá mặc định</option>';
                                $("select#PriceListId").append(html);
                            Bindings.bind($("select#PriceListId").get(0));
                            NProgress.done();
                        },
                        error: function (data) {
                            Sapo.Flash.error(data.responseJSON.error.replace(/\n/g, '; ').replace(/;|$|{|}|"/g, ''));
                        }
                    });
                    $(".order-menu-screen__right_detailorder-resetprice").css({ "display": "block" });
                }
                PosOrder.prototype.changePrice = function () {
                    $(".order-menu-screen__right_detailorder-resetprice").css({ "display": "block" });
                }

                var a = false;

                PosOrder.prototype.changePriceId = function (priceName, priceId) {
                    var that = this;
                    var order = this.initTabActive();
                    if (this.price_list_id != priceId) {
                        if (order.order_line_items.length > 0 && $('#table-order tbody tr').length > 0) {
                            that.changePriceIdModal.show();
                            $("#idprice_list_name").val(priceName);
                            $("#idprice_list_id").val(priceId);
                        } else {
                            order.price_list_id = priceId;
                            order.price_list_name = priceName;
                            $(".dropdown-menu-price li a").removeClass("selected");
                            $(".dropdown-menu-price li a").each(function (indexa, a) {
                                if (order.price_list_name == $(a).find("span").html()) {
                                    $(a).addClass("selected");
                                }
                            })
                        }
                    }
                }


                PosOrder.prototype.setPriceId = function () {
                    var order = this.initTabActive();

                    order.price_list_id = $("#idprice_list_id").val();
                    order.price_list_name = $("#idprice_list_name").val();

                    $(".input-dropdown span[bind='setPriceActice()']").parent().parent().find("a").each(function (indexa, a) {
                        $(a).removeClass("selected");
                    })
                    $(".input-dropdown span[bind='setPriceActice()']").parent().parent().find("a").each(function (indexa, a) {
                        if (order.price_list_name == $(a).find("span").html()) {
                            $(a).addClass("selected");
                        }
                    })
                    this.resetPriceInIitems(order.price_list_id);
                    this.setValueOrderActive(order);
                    this.resetPromotion();
                    Sapo.NewModal.hide();
                }

                PosOrder.prototype.setPriceIdCustomerDefault = function () {
                    var order = this.initTabActive();
                    var that = this;
                    order.price_list_id = order.tenant_setting.sale_price_list_id;
                    for (var p = 0; p < order.price_lists.length; p++) {
                        if (order.price_lists[p].id == order.price_list_id) {
                            order.price_list_name = order.price_lists[p].name;
                        }
                    }
                    $(".dropdown-menu-price li a").removeClass("selected");
                    $(".dropdown-menu-price li a").each(function (indexa, a) {
                        if (order.price_list_name == $(a).find("span").html()) {
                            $(a).addClass("selected");
                        }
                    })

                    that.resetPriceInIitems(order.price_list_id);
                    Bindings.bind($(".order-menu-screen").get(0));
                    Bindings.refreshImmediately();
                    Sapo.NewModal.hide();
                }



                PosOrder.prototype.setPriceIdCustomer = function () {
                    var order = this.initTabActive();
                    var that = this;
                    order.price_list_id = (order.customer.default_price_list_id == 0 || order.customer.default_price_list_id == undefined) ? order.price_list_id : order.customer.default_price_list_id;
                    for (var p = 0; p < order.price_lists.length; p++) {
                        if (order.price_lists[p].id == order.price_list_id) {
                            order.price_list_name = order.price_lists[p].name;
                        }
                    }
                    $(".dropdown-menu-price li a").removeClass("selected");
                    $(".dropdown-menu-price li a").each(function (indexa, a) {
                        if (order.price_list_name == $(a).find("span").html()) {
                            $(a).addClass("selected");
                        }
                    })
                    //$(".input-dropdown[bind='setPriceActice()']").parent().find("a").each(function (indexa, a) {
                    //    $(a).removeClass("selected");
                    //})
                    //$(".input-dropdown[bind='setPriceActice()']").parent().find("a").each(function (indexa, a) {
                    //    if (order.price_list_name == $(a).find("span").html()) {
                    //        $(a).addClass("selected");
                    //    }
                    //})

                    that.resetPriceInIitems(order.price_list_id);
                    Bindings.bind($(".order-menu-screen").get(0));
                    Bindings.refreshImmediately();
                    Sapo.NewModal.hide();
                }

                PosOrder.prototype.setPriceActice = function (event) {
                    var order = this.initTabActive();
                    return order.price_list_name;
                }

                PosOrder.prototype.changeLocation = function (node, event) {

                    var order = this.initTabActive();
                    var value = $(node).val();
                    order.location_id = parseFloat(value);
                    this.setValueOrderActive(order)
                }

                PosOrder.prototype.setLocation = function (event) {
                    var order = this.initTabActive();
                    return order.location_id;
                }
                PosOrder.prototype.getNameCustomer = function (event) {
                    var order = this.initTabActive();
                    return (order.customer == null || order.customer.name == undefined || order.customer.name == null) ? "" : order.customer.name;
                }

                PosOrder.prototype.changeAssigneeId = function (accountName, accountId) {
                    var that = this;
                    var order = this.initTabActive();
                    order.assignee_id = accountId;
                    order.assignee_name = accountName;
                    $(".input-dropdown[bind='setAssigneeName()']").parent().find("a").each(function (indexa, a) {
                        $(a).removeClass("selected");
                    })
                    $(".input-dropdown[bind='setAssigneeName()']").parent().find("a").each(function (indexa, a) {
                        if (order.assignee_name == $(a).find("span").html()) {
                            $(a).addClass("selected");
                        }
                    })
                    var currentdate = new Date();
                    var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
                    var url = "/admin/reports/sales/by_end_day?AccountIds=" + order.assignee_id + "&LocationIds=" + order.location_id + "&Date=" + date;
                    $(".report-endday").attr("href", url);
                }

                PosOrder.prototype.setAssigneeId = function (event) {
                    var order = this.initTabActive();
                    return order.assignee_id;
                }

                PosOrder.prototype.setAssigneeName = function (event) {
                    var order = this.initTabActive();

                    return order.assignee_name;
                }

                PosOrder.prototype.setNoteOrder = function (event) {
                    var order = this.initTabActive();
                    return order.note;
                }

                PosOrder.prototype.changeNoteOrder = function (node, event) {

                    var order = this.initTabActive();
                    var value = $(node).val();
                    order.note = value;
                    this.setValueOrderActive(order);
                }

                PosOrder.prototype.setIssuedOn = function (event) {
                    var order = this.initTabActive();
                    var value = moment(order.issued_on, "YYYY-MM-DD HH:mm:ss")
                    if (value.isValid())
                        return value.format("DD/MM/YYYY HH:mm:ss");
                    return "";
                }

                PosOrder.prototype.changeIssuedOn = function (node, event) {
                    var order = this.initTabActive();
                    var rawValue = $(node).val();
                    var value = moment(rawValue, "DD/MM/YYYY HH:mm:ss")
                    order.issued_on = value.format("YYYY-MM-DD HH:mm:ss");
                    this.setValueOrderActive(order);
                }

                PosOrder.prototype.changeTaxCheck = function (node, event) {
                    var order = this.initTabActive();
                    var that = this;
                    var value = $(node).val();
                    that.order.tax_check = parseFloat(value);
                    order.tax_check = that.order.tax_check;
                    //this.resetTaxRateByTaxOrder(value);
                    this.setValueOrderActive(order);
                }

                PosOrder.prototype.setTaxCheck = function (event) {
                    var that = this;
                    var order = that.initTabActive();
                    var string = "";
                    if (order.tax_check == 0) {
                        string = "Giá chưa bao gồm thuế";
                    } else {
                        string = "Giá đã bao gồm thuế";
                    }
                    $(".tax-check-input").parent().find("a").each(function (indexa, a) {
                        $(a).removeClass("selected");
                    })
                    $(".tax-check-input").parent().find("a").each(function (indexa, a) {
                        if (string == $(a).find("span").html()) {
                            $(a).addClass("selected");
                            $(".tax-check-input").val(string);
                        }
                    })

                    return order.tax_check;
                }
                PosOrder.prototype.deleteCustomer = function (customer) {
                    var order = this.initTabActive();
                    order.customer = customer;
                    order.contact_id = null;
                    order.billing_address = null;
                    order.shipping_address = null;
                    this.updateScollBar();
                    Bindings.bind($(".order-menu-screen__right_detailcustomer").get(0));
                    Bindings.refreshImmediately();
                }
                PosOrder.prototype.editItemNote = function (i) {
                    if ($(".order-item-note-" + i).css("display") == "none") {
                        $(".order-item-note-" + i).css({ "display": "block" });
                        $(".order-item-note-" + i).find("input").focus();
                    }
                    else {
                        $(".order-item-note-" + i).css({ "display": "none" });
                    }

                }
                PosOrder.prototype.upDateItemNote = function (i) {
                    if ($(".order-item-note-" + i).css("display") == "none") {
                        $(".order-item-note-" + i).css({ "display": "block" });
                    }
                    else {
                        $(".order-item-note-" + i).css({ "display": "none" });
                    }
                    //Bindings.unbind($("#table-order")[0]);
                    //Bindings.bind($("#table-order")[0]);
                    //Bindings.refreshImmediately();
                }

                PosOrder.prototype.resetShipping = function () {
                    var order = this.initTabActive();
                    order.shipping_name = "";
                    order.shipping_fee = 0;
                    order.isShippingInVietnam = false;
                }

                PosOrder.prototype.resetCustomer = function () {
                    var order = this.initTabActive();
                    order.shipping_address_name = null;
                    order.shipping_address_province = null;
                    order.shipping_address_phone = null;
                    order.shipping_address_country = null;
                    order.shipping_address_country_code = null;
                    order.shipping_address_address1 = null;
                    order.shipping_address_provinceId = null;
                    order.shipping_address_districtId = null;

                    order.billing_address_name = null;
                    order.billing_address_province = null;
                    order.billing_address_phone = null;
                    order.billing_address_country = null;
                    order.billing_address_country_code = null;
                    order.billing_address_address1 = null;

                    order.shipping_address_name_tmp = null;
                    order.shipping_address_province_tmp = null;
                    order.shipping_address_phone_tmp = null;
                    order.shipping_address_country_tmp = null;
                    order.shipping_address_address1_tmp = null;
                    order.shipping_address_provinceId_tmp = 0;

                    order.billing_address_name_tmp = null;
                    order.billing_address_province_tmp = null;
                    order.billing_address_phone_tmp = null;
                    order.billing_address_country_tmp = null;
                    order.billing_address_address1_tmp = null;

                    order.no_shipping_address = true;
                    order.no_billing_address = true;
                }

                PosOrder.prototype.resetApplyDiscount = function () {
                    var order = this.initTabActive();
                    order.discount_tmp = order.discount;
                    order.reason_discount_tmp = order.reason_discount;
                    order.isDiscountPercentTmp = order.is_discount_percent;
                }
                PosOrder.prototype.getAvailableVariant = function (variant) {//chưa có variant nào trong đơn hàng

                    var order = this.initTabActive();
                    var available = 0;
                    if (variant == undefined || variant == null) {
                        return 0;
                    }
                    $.each(variant.inventories, function (index, inventory) {
                        if (inventory.location_id == order.location_id) {
                            available = inventory.available;
                        }
                    })
                    return available;
                }
                PosOrder.prototype.getAvailableLineItem = function (index) {//chưa có variant nào trong đơn hàng
                    var order = this.initTabActive();
                    var available = 0;
                    if (order.order_line_items[index] == undefined || order.order_line_items[index] == null) { return 0; }
                    $.each(order.order_line_items[index].inventories, function (index, inventory) {
                        if (inventory.location_id == order.location_id) {
                            available = inventory.available;
                        }
                    })
                    return available;
                }
                PosOrder.prototype.getStockOnHandLineItem = function (index) {//chưa có variant nào trong đơn hàng
                    //
                    var order = this.initTabActive();
                    var available = 0;
                    if (order.order_line_items[index] == undefined || order.order_line_items[index] == null) {
                        return 0;
                    }
                    $.each(order.order_line_items[index].inventories, function (index, inventory) {
                        //if (inventory.location_id == order.location_id) {
                        available += inventory.on_hand;
                        //}
                    })
                    return $.formatNumber(available, { format: "#,##0.###", locale: "en" });
                }
                PosOrder.prototype.getIncomingStockLineItem = function (index) {//chưa có variant nào trong đơn hàng
                    //
                    var order = this.initTabActive();
                    var available = 0;
                    if (order.order_line_items[index] == undefined || order.order_line_items[index] == null) {
                        return 0;
                    }
                    $.each(order.order_line_items[index].inventories, function (index, inventory) {
                        //if (inventory.location_id == order.location_id) {
                        available += inventory.incoming;
                        //}
                    })
                    return $.formatNumber(available, { format: "#,##0.###", locale: "en" });
                }
                PosOrder.prototype.getStockOnWayLineItem = function (index) {//chưa có variant nào trong đơn hàng
                    //
                    var order = this.initTabActive();
                    var available = 0;
                    if (order.order_line_items[index] == undefined || order.order_line_items[index] == null) {
                        return 0;
                    }
                    $.each(order.order_line_items[index].inventories, function (index, inventory) {
                        //if (inventory.location_id == order.location_id) {
                        available += inventory.onway;
                        //}
                    })
                    return $.formatNumber(available, { format: "#,##0.###", locale: "en" });
                }
                PosOrder.prototype.getAvailableCurrentLocation = function (index) {//chưa có variant nào trong đơn hàng
                    var order = this.initTabActive();
                    var available = 0;
                    if (order.order_line_items[index] == undefined || order.order_line_items[index] == null) { return 0; }
                    $.each(order.order_line_items[index].inventories, function (index, inventory) {
                        if (inventory.location_id == order.location_id) {
                            available = inventory.available;
                        }
                    })
                    return $.formatNumber(available, { format: "#,##0.###", locale: "en" });;
                }
                PosOrder.prototype.getStockOnHandCurrentLocation = function (index) {//chưa có variant nào trong đơn hàng
                    //
                    var order = this.initTabActive();
                    var available = 0;
                    if (order.order_line_items[index] == undefined || order.order_line_items[index] == null) {
                        return 0;
                    }
                    $.each(order.order_line_items[index].inventories, function (index, inventory) {
                        if (inventory.location_id == order.location_id) {
                            available = inventory.on_hand;
                        }
                    })
                    return $.formatNumber(available, { format: "#,##0.###", locale: "en" });;
                }
                PosOrder.prototype.getIncomingStockCurrentLocation = function (index) {//chưa có variant nào trong đơn hàng
                    //
                    var order = this.initTabActive();
                    var available = 0;
                    if (order.order_line_items[index] == undefined || order.order_line_items[index] == null) {
                        return 0;
                    }
                    $.each(order.order_line_items[index].inventories, function (index, inventory) {
                        if (inventory.location_id == order.location_id) {
                            available = inventory.incoming;
                        }
                    })
                    return $.formatNumber(available, { format: "#,##0.###", locale: "en" });;
                }





                PosOrder.prototype.checkVariantOrderActive = function (variant) {//chưa có variant nào trong đơn hàng

                    var order = this.initTabActive();
                    var check = true;
                    $.each(order.order_line_items, function (index, line_item) {
                        if (line_item != null && line_item.variant_id == variant.id && !line_item.isForLoyalty) {
                            check = false;
                        }
                    });
                    return check;
                }

                PosOrder.prototype.getPriceById = function (variant, id) {
                    var price = 0;
                    if (variant.variant_prices != undefined && variant.variant_prices != null && variant.variant_prices.length >= 0)
                        $.each(variant.variant_prices, function (index, variant_price) {
                            if (variant_price.price_list != null && variant_price.price_list.id == id) {
                                price = parseFloat(variant_price.value);
                                return false;
                            }

                        });
                    return price;
                }

                PosOrder.prototype.getPriceByCode = function (variant, code) {
                    var price = 0;
                    if (variant.variant_prices != undefined && variant.variant_prices != null && variant.variant_prices.length >= 0)
                        $.each(variant.variant_prices, function (index, variant_price) {
                            if (variant_price.price_list != null && variant_price.price_list.code == code) {
                                price = parseFloat(variant_price.value);
                                return false;
                            }

                        });
                    return price;
                }

                PosOrder.prototype.getUnitsAndAddLineItemWithQuantity = function (searchedVariant) {

                    var that = this;
                    var variantId = searchedVariant.id;
                    if (searchedVariant != null) {
                        that.addLineItemWithQuantity(searchedVariant);
                        $(document.activeElement).blur();
                        that.resetPromotion();
                        var itemIndex = searchedVariant.item_index;
                        var orderIndex = searchedVariant.index;

                        if (!offline) {
                            $.ajax({
                                url: ajaxUrls.getUnitByProduct,
                                data: { variantId: variantId },
                                dataType: "json",
                                type: "GET",
                                success: function (data) {
                                    if (data != null && data.units != null && data.units.length > 0) {
                                        searchedVariant.units = data.units;
                                        var html = "";
                                        for (var i = 0; i < data.units.length; i++) {
                                            var unit = data.units[i];
                                            html = html +
                                                " <li>"
                                                + "<a bind-event-click='updateVariantByUnit(" + orderIndex + "," + itemIndex + "," + unit.variant_id + " )' unit-id='" + unit.variant_id + "' style='font-size: 12px; padding: 6px' class='elementUnit-" + orderIndex + "-" + itemIndex + "'>"
                                                + unit.name
                                                + "</a>" +
                                                "</li> ";
                                        }
                                        $("tr#variant-" + itemIndex + "").find(".td-units ul").append(html);
                                        Bindings.unbind($("table#table-order tbody").get(0));
                                        Bindings.bind($("table#table-order tbody").get(0));
                                    }
                                },
                                complete: function () {
                                    that.checkDisplayUnit(orderIndex, itemIndex, variantId);
                                }
                            });
                        } else {
                            that.getUnitOffline(searchedVariant, variantId);
                        }
                    }
                }


                PosOrder.prototype.addLineItemWithQuantity = function (variant) {
                    var that = this;
                    var order = this.initTabActive();

                    if (order.seperate_product || that.checkVariantOrderActive(variant)) {//seperate_product = true là tách dòng
                        //variant.quantity = this.getRoundQuantity(variant.quantity);
                        //ham tinh gia se tinh o day phai viet mot ham de dung chung
                        if (typeof (variant.price) == "string") {
                            variant.price = parseFloat(variant.price);
                        }
                        variant.price = that.getPriceByCode(variant, that.getCodePriceById(order.price_list_id));
                        var index = order.order_line_items.length;
                        variant.variant_id = variant.id;
                        variant.id = 0;
                        variant.currency = order.currency;
                        variant.whole_sale_price_currency = money(that.getPriceByCode(variant, "BANBUON"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        variant.buy_price_currency = money(that.getPriceByCode(variant, "GIANHAP"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        variant.retail_price_currency = money(that.getPriceByCode(variant, "BANLE"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        variant.item_index = index;
                        variant.discount_rate = (order.customer == null || order.customer.default_discount_rate == undefined) ? 0 : order.customer.default_discount_rate;
                        variant.index = order.index;
                        //chiết khấu

                        variant.discount_value = 0;
                        variant.is_discount_percent = false;
                        variant.discount_reason = "";
                        variant.isdiscount = false;
                        variant.is_apply_normal_discount = true;
                        variant.normal_discount_line_item = 0;
                        variant.is_normal_discount_percent = false;

                        if (order.customer !== undefined
                            && order.customer !== null
                            && order.customer.default_discount_rate > 0) {
                            variant.customer_discount_line_item_rate = order.customer.default_discount_rate;
                            variant.is_apply_customer_discount = true;
                            variant.isdiscount = true;
                        }
                        //end chiết khấu

                        //thuế

                        variant.tax_rate_override = that.setTaxRateOverride(variant);

                        //end thuế
                        order.order_line_items.push(variant);

                        //option
                        variant.opt1 = StandardOption(variant.opt1, variant.opt2, variant.opt3);
                        variant.allOption = (variant.opt1 == null ? "" : variant.opt1) + (variant.opt2 == null ? "" : " - " + variant.opt2)
                            + (variant.opt3 == null ? "" : " - " + variant.opt3);

                        variant.formatedName = that.formatStringLength(variant.name, 70);
                        variant.formatedUnit = that.formatStringLength(variant.unit, 9);

                        var template = $('#line-item-template').html();
                        var html = Mustache.render(template, { "line_item": variant });
                        $("#line_item_rows").prepend(html);
                        Bindings.bind($("#variant-" + index).get(0), this);
                        $("#variant-" + index).find(".line_item_quantity").focus().select();
                        Sapo.popover($("i#sapo-popover" + index));
                        tooltip($("span"));
                        // get dữ liệu tax lên giao diện
                        //this.changTaxRateItem();
                        this.setValueOrderActive(order);
                        this.updateScollBar();
                        this.OnKeyDown();
                        //this.getShippingMethods();
                    }
                    else {
                        $.each(order.order_line_items.reverse(), function (index, line_item) {
                            if (line_item.variant_id == variant.id && !line_item.isForLoyalty) {
                                line_item.quantity = (parseFloat(line_item.quantity) + parseFloat(variant.quantity)).toFixed(3);
                                $("#variant-" + (order.order_line_items.length - 1 - index)).find(".line_item_quantity").focus().select();
                                order.order_line_items.reverse();
                                return false;
                            }
                        });
                    }
                    Sapo.Utility.validateFormInPage(); Sapo.Utility.changeNumber();
                    Bindings.bind($("table#table-order tbody").get(0));
                    Bindings.refreshImmediately();
                }
                PosOrder.prototype.getCodePriceById = function (id) {
                    var code = "BANLE";
                    var order = this.initTabActive();
                    var price_lists = order.price_lists;
                    $.each(price_lists, function (index, price_list) {
                        if (price_list.id == id && id != 0) {
                            code = price_list.code;
                        }
                    });

                    return code;
                }
                PosOrder.prototype.resetPriceInIitems = function (id) {
                    var that = this;
                    var order = this.initTabActive();
                    //var code = "BANLE";
                    //var price_lists = order.price_lists;
                    //$.each(price_lists, function (index, price_list) {
                    //    if (price_list.id == id && id != 0) {
                    //        code = price_list.code;
                    //    }
                    //});

                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            $.each(order.order_line_items, function (index, order_line_item) {
                                if (order_line_item != null) {
                                    order_line_item.price = that.getPriceById(order_line_item, id);
                                }
                            });
                        }
                    }
                }

                PosOrder.prototype.IsAllowChangeTime = function () {
                    var that = this;
                    return that.order.tenant_setting.allowed_change_time;
                }

                PosOrder.prototype.addLineItem = function (variant, serialScan) {
                    var x = new Date();
                    var e = x.getTime();
                    var that = this;
                    var order = this.initTabActive();
                    if (!that.order.tenant_setting.allowed_negotived_sell) {
                        if (that.getAvailableVariant(variant) <= 0) {
                            Sapo.Flash.error("Sản phẩm này hiện tại hết hàng.");
                            return false;
                        }
                        if (that.getAvailableVariant(variant) <= 1) {
                            variant.quantity = parseFloat(that.getAvailableVariant(variant));
                        }
                        else {
                            variant.quantity = 1;
                        }
                    }
                    else {
                        variant.quantity = 1;
                    }
                    if (order.seperate_product || that.checkVariantOrderActive(variant)) {//seperate_product = true là tách dòng

                        //ham tinh gia se tinh o day phai viet mot ham de dung chung
                        if (typeof (variant.price) == "string") {
                            variant.price = parseFloat(variant.price);
                        }
                        variant.price = that.getPriceById(variant, order.price_list_id);
                        variant.price_text = $.formatNumber(variant.price, { format: "#,##0.###", locale: "en" });
                        var index = order.order_line_items.length;
                        variant.name = variant.name.replace(/'/g, "&#39;").replace(/(?:\r\n|\r|\n)/g, ' ');

                        variant.variant_id = variant.id;
                        variant.id = 0;
                        variant.currency = order.currency;
                        variant.whole_sale_price_currency = money(that.getPriceByCode(variant, "BANBUON"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        variant.buy_price_currency = money(that.getPriceByCode(variant, "GIANHAP"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        variant.retail_price_currency = money(that.getPriceByCode(variant, "BANLE"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        variant.item_index = index;
                        variant.discount_rate = (order.customer == null || order.customer.default_discount_rate == undefined) ? 0 : order.customer.default_discount_rate;
                        variant.index = order.index;
                        //chiết khấu
                        variant.discount_value = 0;
                        variant.is_discount_percent = false;
                        variant.discount_reason = "";
                        variant.isdiscount = false;
                        variant.is_apply_normal_discount = true;
                        variant.normal_discount_line_item = 0;
                        variant.is_normal_discount_percent = false;
                        variant.category = "";
                        variant.brand = "";
                        if (order.categories != null && order.categories != undefined) {
                            for (var j = 0; j < order.categories.length; j++) {
                                if (order.categories[j].id == variant.category_id) {
                                    variant.category = order.categories[j].name;
                                    break;
                                }
                            }
                        }
                        if (order.brands != null && order.brands != undefined) {
                            for (var j = 0; j < order.brands.length; j++) {
                                if (order.brands[j].id == variant.brand_id) {
                                    variant.brand = order.brands[j].name;
                                    break;
                                }
                            }
                        }

                        if (order.customer !== undefined
                            && order.customer !== null
                            && order.customer.default_discount_rate > 0) {
                            variant.customer_discount_line_item_rate = order.customer.default_discount_rate;
                            variant.is_apply_customer_discount = true;
                            variant.isdiscount = true;
                        }


                        //thuế

                        variant.tax_rate_override = that.setTaxRateOverride(variant);

                        //end thuế

                        //option
                        variant.opt1 = StandardOption(variant.opt1, variant.opt2, variant.opt3);
                        variant.allOption = (variant.opt1 == null ? "" : variant.opt1) + (variant.opt2 == null ? "" : " - " + variant.opt2)
                            + (variant.opt3 == null ? "" : " - " + variant.opt3);

                        variant.formatedName = that.formatStringLength(variant.name, 70);
                        variant.formatedUnit = that.formatStringLength(variant.unit, 9);

                        variant.total_available = 0;
                        variant.total_stock_on_hand = 0;
                        variant.total_incoming_stock = 0;
                        variant.total_stock_onway = 0;
                        $.each(variant.inventories, function (index, inventory) {
                            if (inventory.location_id == order.location_id) {
                                variant.available = inventory.available;
                                variant.stock_on_hand = inventory.on_hand;
                                variant.incoming_stock = inventory.incoming;
                                variant.stock_onway = inventory.onway;
                            }
                            variant.total_available += inventory.available;
                            variant.total_stock_on_hand += inventory.on_hand;
                            variant.total_incoming_stock += inventory.incoming;
                            variant.total_stock_onway += inventory.onway;
                        });
                        var template, html;
                        if (variant.product_type != "serial") {
                            order.order_line_items.push(variant);
                            template = $('#line-item-template').html();
                            html = Mustache.render(template, { "line_item": variant });
                            $("#line_item_rows").prepend(html);
                        }
                        else {
                            //variant.quantity = 0;
                            variant.serials = [];
                            order.order_line_items.push(variant);
                            template = $('#line-item-serial-template').html();
                            html = Mustache.render(template, { "line_item": variant });
                            $("#line_item_rows").prepend(html);
                            Bindings.bind($(`#variant-serial-${index}`).get(0), this);
                            that.initSerial(variant.item_index, variant.product_id, variant.variant_id);
                            if (serialScan != null && serialScan != undefined) {
                                $(`#input-serial-${index}`).tagsManager('pushTag', serialScan);
                                order.order_line_items[index].serials.push(serialScan);
                            }
                        }
                        Bindings.bind($("#variant-" + index).get(0), this);
                        if (serialScan == null || serialScan == undefined) {
                            $("#variant-" + index).find(".line_item_quantity").focus().select();
                        }
                        Sapo.popover($("i#sapo-popover" + index));
                        tooltip($("span"));
                        tooltip($("input"));
                        // get dữ liệu tax lên giao diện
                        //this.changTaxRateItem();
                        this.setValueOrderActive(order);
                        this.updateScollBar();
                    }
                    else {
                        $.each(order.order_line_items.reverse(), function (index, line_item) {
                            if (line_item != null && line_item.variant_id == variant.id && !line_item.isForLoyalty) {
                                if (serialScan != null && serialScan != undefined) {
                                    var indexItem = line_item.item_index;
                                    $(`#input-serial-${indexItem}`).tagsManager('pushTag', serialScan);
                                    if (line_item.serials !== undefined && line_item.serials !== null) {
                                        var serialFilter = line_item.serials.indexOf(serialScan); // check serial đã tồn tại
                                        if (serialFilter == -1) {
                                            //order.order_line_items[lineItemIndex].quantity += 1;
                                            var inputHidden = $(`#input-serial-${indexItem}`).parent().find('input[name=Tags]').get(0);
                                            var listSerial = $(inputHidden).val();
                                            line_item.serials = (listSerial !== undefined) ? listSerial.split(",") : [];
                                            if (line_item.serials.length > line_item.quantity) {
                                                line_item.quantity = parseFloat(line_item.quantity) + 1;
                                                that.setQuantityItem(indexItem);
                                            }
                                        }
                                    }
                                }
                                else {
                                    line_item.quantity = parseFloat(line_item.quantity) + 1;
                                    that.setQuantityItem(index, that.getAvailableLineItem(index), line_item.quantity);
                                    $("#variant-" + (order.order_line_items.length - 1 - index)).find(".line_item_quantity").focus().select();
                                }
                                order.order_line_items.reverse();
                                return false;
                            }
                        });
                    }
                    Sapo.Utility.validateFormInPage();
                    Sapo.Utility.changeNumber();
                    Bindings.unbind($("table#table-order tbody").get(0));
                    Bindings.bind($("table#table-order tbody").get(0));
                    Bindings.refreshImmediately();
                    var p = new Date();
                    var m = p.getTime();
                    this.OnKeyDown()
                    this.resetPromotion();
                }
                PosOrder.prototype.showAllSerial = function (index) {
                    let divSerial = $(`#variant-serial-${index}`).find(".div-serial-item").get(0);
                    let widthtDivSerial = $(divSerial).width();
                    let widthAllSerial = 0;
                    $(divSerial).find(".tm-serial").each(function (count, item) {
                        widthAllSerial += $(item).outerWidth();
                    });
                    if (widthtDivSerial > (widthAllSerial + 200))
                        return false;
                    else
                        return true;
                }
                PosOrder.prototype.listSerialLineItem = function (i) {
                    var that = this;
                    var order = this.initTabActive();
                    var template = $("#templatePopupSerial").html();
                    var dataTemplate = {};
                    dataTemplate.nameVariant = order.order_line_items[i].name == undefined ? "" : order.order_line_items[i].name;
                    dataTemplate.listSerial = [];
                    if (order.order_line_items[i].serials != null && order.order_line_items[i].serials.length > 0) {
                        for (var j = 0; j < order.order_line_items[i].serials.length; j++) {
                            var serial = {};
                            serial.name = order.order_line_items[i].serials[j];
                            dataTemplate.listSerial.push(serial);
                        }
                    }
                    dataTemplate.index = i;
                    html = Mustache.render(template, dataTemplate);
                    this.showPopupSelectSerial.show();
                    $("#showListSerial").append(html);
                    Bindings.bind($("#showListSerial").get(0), that);
                }
                PosOrder.prototype.removeSerialItem = function (_this, index) {
                    var order = this.initTabActive();
                    let serial = $(_this).closest('.sapo-serial-item').data("value");
                    let element = $(_this).closest('.serial-item-popup').get(0);
                    $(element).remove();
                    if (order.order_line_items[index] != null) {
                        if (order.order_line_items[index].quantity <= order.order_line_items[index].serials.length) {
                            order.order_line_items[index].quantity = order.order_line_items[index].quantity - 1;
                        }
                        order.order_line_items[index].serials.splice($.inArray(serial.toString(), order.order_line_items[index].serials), 1);
                        $("#input-serial-" + index).tagsManager('empty');
                        this.pushTag(document.getElementById("input-serial-" + index), order.order_line_items[index].serials);
                        Bindings.refreshImmediately();
                    }
                }
                PosOrder.prototype.pushTag = function (inp, arrTag) {
                    for (var i = 0; i < arrTag.length; i++) {
                        $(inp).tagsManager('pushTag', arrTag[i]);
                    }
                }
                PosOrder.prototype.initSerial = function (index, productId, variantId) {
                    var order = this.initTabActive();
                    let that = this;
                    let context = "draftOrder";
                    let divTagContainer = $(`#input-serial-${index}`).parent().find(".div-serial-item").get(0);
                    $(`#input-serial-${index}`).tagsManager({
                        prefilled: null,
                        CapitalizeFirstLetter: false,
                        preventSubmitOnEnter: false,
                        delimeters: [],
                        backspace: [8],
                        blinkBGColor_1: '#FFFF9C',
                        blinkBGColor_2: '#F4F6F8',
                        hiddenTagListName: 'Tags',
                        deleteTagsOnBackspace: false,
                        tagClass: 'tm-tag-small tm-serial',
                        tagsContainer: divTagContainer
                    });
                    var param = { page: 1, limit: 15, location_id: order.location_id, product_id: productId, variant_id: variantId };
                    this.initAutoCompleteSerial(document.getElementById(`input-serial-${index}`), `/admin/orders/pos/SearchSerial?productId=${productId}&variantId=${variantId}&locationId=${order.location_id}`, index, context, param);
                    //$("[id^=input-serial-]").each(function (index, item) {// xóa 1 serial
                    //    let indexItem = $(this).data("line-item");

                    //});
                    $(`#input-serial-${index}`).on('tm:splicing', function (e, serial) {
                        if (order.order_line_items[index] != null) {
                            if (order.order_line_items[index].quantity <= order.order_line_items[index].serials.length) {
                                order.order_line_items[index].quantity = order.order_line_items[index].quantity - 1;
                            }
                            order.order_line_items[index].serials.splice($.inArray(serial.toString(), order.order_line_items[index].serials), 1);
                            Bindings.refreshImmediately();
                        }
                    });
                }
                PosOrder.prototype.initAutoCompleteSerial = function (inp, url, indexItem, context, param) {
                    var order = this.initTabActive();
                    //this.inp = inp;
                    //this.url = url;
                    //this.context = context;
                    //this.index = index;
                    let search = "";
                    var count = 0;
                    var page = 2;
                    var total = 0;
                    var checkLoad = false;
                    var that = this;
                    if (!offline) {
                        $(inp).devbridgeAutocomplete({
                            noCache: true,
                            serviceUrl: `${url}`,
                            deferRequestBy: 250,
                            minChars: 0,
                            width: "100%",
                            showNoSuggestionNotice: true,
                            preserveInput: false,
                            triggerSelectOnValidInput: false,
                            noSuggestionNotice: `<div class="autocomplete-suggestion suggestion-serial" style="width:100%;padding: 13px 10px;">Sản phẩm chưa có serial</div>`,
                            transformResult: function (response, query) {
                                search = query;
                                let jsonResponse = JSON.parse(response);
                                count = 0;
                                page = 2;
                                total = 0;
                                var suggestions = [];
                                if (jsonResponse.total !== null) {
                                    total = jsonResponse.total;
                                }
                                if (jsonResponse.serials !== null && jsonResponse.serials.length > 0) {
                                    count = jsonResponse.serials.length;
                                    for (var i = 0; i < jsonResponse.serials.length > 0; i++) {
                                        var serial = {};
                                        serial.value = jsonResponse.serials[i].label;
                                        serial.data = jsonResponse.serials[i];
                                        suggestions.push(serial);
                                    }
                                }
                                //var a = _.map(jsonResponse.serials, v => _.assign({}, { value: v.label, data: v }));
                                return {
                                    suggestions: suggestions
                                };


                            },
                            onSelect: function (suggestion) {
                                $(inp).val("");
                                that.selectSerial(inp, indexItem, context, suggestion.data.label);
                            },
                            appendTo: $("#autocomplete-product-holder-" + indexItem),
                            onSearchComplete: function () {
                                checkLoad = true;
                            },
                            beforeRender: function ($container, suggestions) {
                                if (suggestions !== null && suggestions.length > 0) {
                                    let htmlView = "";
                                    suggestions.forEach(function (item, index) {
                                        if (item.data !== null && item.data !== undefined) {
                                            let html = `<div class="autocomplete-suggestion suggestion-serial" data-index="${index}">
                                            <div class="w-100">
                                                <div class="search-serial-label">
                                                    <span>${item.data.label}</span>
                                                </div>
                                            </div>
                                         </div>`;
                                            htmlView += html;
                                        }
                                    })
                                    $container.html(htmlView);
                                    //$container.addClass("newscroll");
                                    $container.css({ "width": "100%", "top": "-15px" });
                                    var scroll = document.querySelector.bind(document);

                                    Ps.initialize(scroll('.autocomplete-suggestions'), {
                                        theme: 'big-and-ugly'
                                    });
                                    $(`#autocomplete-product-holder-${indexItem} .autocomplete-suggestions`).scroll(function () {
                                        if (count < total) {
                                            let heightItem = $(`#autocomplete-product-holder-${indexItem} .autocomplete-suggestion`).height();
                                            let heightdocument = count * heightItem;
                                            let heightwindow = $(`#autocomplete-product-holder-${indexItem} .autocomplete-suggestions`).height();
                                            let scroll = $(`#autocomplete-product-holder-${indexItem} .autocomplete-suggestions`).scrollTop();
                                            if ((heightdocument - heightwindow - scroll) < 10 && checkLoad) {
                                                checkLoad = false;
                                                let queryxx = $(inp).val();
                                                $.ajax({
                                                    url: `${url}`,
                                                    data: { query: queryxx, page: page },
                                                    dataType: "json",
                                                    type: "GET",
                                                    success: function (data) {
                                                        page++;
                                                        let array = [];
                                                        //let array = _.map(data.serials, v => _.assign({}, { value: v.label, data: v }));
                                                        for (var i = 0; i < data.serials.length > 0; i++) {
                                                            var serial = {};
                                                            serial.value = data.serials[i].label;
                                                            serial.data = data.serials[i];
                                                            array.push(serial);
                                                        }
                                                        let htmlViewArr = "";
                                                        array.forEach(function (itemArr) {
                                                            if (itemArr !== null && itemArr.data !== null && itemArr.data !== undefined) {
                                                                let indexArr = suggestions.length;
                                                                $(`#autocomplete-product-holder-${indexItem} .autocomplete-suggestions`).append(`<div class="autocomplete-suggestion suggestion-serial" id="itemprd-${count}"></div>`);
                                                                let htmlArr = ` <div class="w-100">
                                                            <div class="search-serial-label">
                                                                <span>${itemArr.data.label}</span>
                                                            </div>
                                                        </div>`;
                                                                $(`#itemprd-${count}`).data("item.autocomplete", itemArr.data).html(htmlArr);
                                                                $(`#itemprd-${count}`).click(function (event, ui) {
                                                                    //that.addLineItem($(this).data("item.autocomplete"))
                                                                    let suggestion = $(this).data("item.autocomplete");
                                                                    that.selectSerial(inp, indexItem, context, suggestion.label);
                                                                    $(input).devbridgeAutocomplete("hide");
                                                                    $(input).devbridgeAutocomplete("clear");
                                                                });
                                                            }
                                                            count++;
                                                        });

                                                    },
                                                    error: function (data) {
                                                    },
                                                    complete: function (data) {
                                                        checkLoad = true;
                                                    }
                                                });

                                            }
                                        }

                                    });
                                }

                            }
                        });
                    }
                    else {
                        var filter = param;
                        filter.query = $(inp).val();
                        Serial.dao.getByFilter(filter,
                            function (data) {
                                var suggestions = [];
                                if (data !== null && data.length > 0) {
                                    for (var i = 0; i < data.length > 0; i++) {
                                        //var serial = {};
                                        //serial.value = data.serials[i].label;
                                        //serial.data = data.serials[i];
                                        suggestions.push(data[i].label);
                                    }
                                }

                                $(inp).devbridgeAutocomplete({
                                    noCache: true,
                                    lookup: suggestions,
                                    minChars: 0,
                                    width: "100%",
                                    showNoSuggestionNotice: true,
                                    preserveInput: false,
                                    triggerSelectOnValidInput: false,
                                    noSuggestionNotice: `<div class="autocomplete-suggestion suggestion-serial" style="width:100%;padding: 13px 10px;">Sản phẩm chưa có serial</div>`,
                                    onSelect: function (suggestion) {
                                        $(inp).val("");
                                        that.selectSerial(inp, indexItem, context, suggestion.value);
                                    },
                                    appendTo: $("#autocomplete-product-holder-" + indexItem),
                                    onSearchComplete: function () {
                                        checkLoad = true;
                                    },
                                    beforeRender: function ($container, suggestions) {
                                        if (suggestions !== null && suggestions.length > 0) {
                                            let htmlView = "";
                                            suggestions.forEach(function (item, index) {
                                                if (item !== null && item !== undefined) {
                                                    let html = `<div class="autocomplete-suggestion suggestion-serial" data-index="${index}">
                                            <div class="w-100">
                                                <div class="search-serial-label">
                                                    <span>${item.value}</span>
                                                </div>
                                            </div>
                                         </div>`;
                                                    htmlView += html;
                                                }
                                            })
                                            $container.html(htmlView);
                                            $container.addClass("newscroll");
                                            $container.css({ "width": "100%", "top": "-15px" });
                                        }

                                    }
                                });

                            },
                            function (err) { });
                    }
                }
                PosOrder.prototype.selectSerial = function (inp, indexItem, context, serial) {
                    let that = this;
                    $(inp).tagsManager('pushTag', serial);
                    if (context !== undefined && context !== null) { // gán vào context
                        let twine = Twine.context($('body').get(0))[context];
                        let lineItemIndex = indexItem;
                        if (twine !== null && twine !== undefined) {

                            var order = twine.initTabActive();
                            if (order.order_line_items[lineItemIndex].serials !== undefined && order.order_line_items[lineItemIndex].serials !== null) {
                                var serialFilter = order.order_line_items[lineItemIndex].serials.indexOf(serial); // check serial đã tồn tại
                                if (serialFilter == -1) {
                                    //order.order_line_items[lineItemIndex].quantity += 1;
                                    let inputHidden = $(inp).parent().find('input[name=Tags]').get(0);
                                    let listSerial = $(inputHidden).val();
                                    order.order_line_items[lineItemIndex].serials = (listSerial !== undefined) ? listSerial.split(",") : [];
                                    if (order.order_line_items[lineItemIndex].serials.length > order.order_line_items[lineItemIndex].quantity) {
                                        order.order_line_items[lineItemIndex].quantity += 1;
                                        Bindings.refreshImmediately();
                                    }
                                }
                            }
                        }
                    }
                }

                PosOrder.prototype.getSTT = function (index) {
                    var order = this.initTabActive();
                    var stt = 1;
                    if (order.order_line_items != undefined && order.order_line_items != null && order.order_line_items.length > 0
                        && order.order_line_items[index] != undefined && order.order_line_items[index] != null) {
                        for (var i = 0; i < index; i++) {
                            if (order.order_line_items[i] != undefined && order.order_line_items[i] != null)
                                stt++;
                        }
                    }
                    return stt;
                }

                PosOrder.prototype.showToolTipItem = function (element, index) {

                    //Sapo.popoverOnClick($(element));
                    var that = this;
                    if ($('.popover').length <= 0) {
                        $(element).addClass('active');
                        $(element).popover('show');
                    }
                    Bindings.refreshImmediately();
                    Bindings.unbind($(".popover").get(0), this);
                    Bindings.bind($(".popover").get(0), this);
                    $(document).mouseup(function (e) {
                        var container = $('.popover');
                        if ((!container.is(e.target) // if the target of the click isn't the container...
                            && container.has(e.target).length === 0)) // ... nor a descendant of the container
                        {
                            $("i.line-item-tooltip-" + index).popover('destroy');
                            $("i.line-item-tooltip-" + index).removeClass('active');
                        }
                    })
                }

                PosOrder.prototype.showToolTipSupport = function (element) {
                    var that = this;
                    if ($('.popover').length <= 0) {
                        $(element).addClass('active');
                        $(element).popover('show');

                    }
                    $(".popover").css({ left: '30px' });
                    $(".popover .arrow").css({ top: '-11px' });
                    $(".popover .arrow").css({ left: '85%' });
                    Bindings.refreshImmediately();
                    Bindings.unbind($(".popover").get(0), this);
                    Bindings.bind($(".popover").get(0), this);
                    $(document).mouseup(function (e) {
                        var container = $('.popover');
                        if ((!container.is(e.target) // if the target of the click isn't the container...
                            && container.has(e.target).length === 0)) // ... nor a descendant of the container
                        {
                            $("span.item-support").popover('destroy');
                            $("span.item-support").removeClass('active');

                        }
                    })
                }

                PosOrder.prototype.updateVariantByUnit = function (index, lineIndex, variantId) {
                    var that = this;
                    var lineItem = that.orders[index].order_line_items[lineIndex];
                    if (!offline) {
                        $.ajax({
                            url: ajaxUrls.getVariantByUnit,
                            data: { unitId: variantId, productId: lineItem.product_id },
                            dataType: "json",
                            type: "GET",
                            success: function (data) {
                                var oldVariantId = lineItem.variant_id;
                                that.changeVariant(data, lineItem.quantity);
                                that.orders[index].order_line_items[lineIndex] = data;

                                Sapo.Utility.validateFormInPage();
                                Sapo.Utility.changeNumber();
                                Bindings.refreshImmediately();

                                var newContent = $('#click-sapo-popover' + lineIndex).attr('data-content').replace(oldVariantId, data.variant_id);
                                $('#click-sapo-popover' + lineIndex).attr('data-content', newContent);

                                $('#tooltip-' + lineIndex).attr('title', data.allOption);

                                that.checkDisplayUnit(index, lineIndex, that.orders[index].order_line_items[lineIndex].variant_id);
                            },
                            complete: function () {
                                that.resetPromotion();
                            }
                        });
                    }
                    else {
                        Variant.dao.getById(variantId,
                            function (data) {
                                if (data != null && data != undefined) {
                                    var oldVariantId = lineItem.variant_id;
                                    that.changeVariant(data, lineItem.quantity);
                                    that.orders[index].order_line_items[lineIndex] = data;
                                    Sapo.Utility.validateFormInPage();
                                    Sapo.Utility.changeNumber();
                                    Bindings.refreshImmediately();
                                    var newContent = $('#click-sapo-popover' + lineIndex).attr('data-content').replace(oldVariantId, data.variant_id);
                                    $('#click-sapo-popover' + lineIndex).attr('data-content', newContent);
                                    $('#tooltip-' + lineIndex).attr('title', data.allOption);
                                    that.checkDisplayUnit(index, lineIndex, that.orders[index].order_line_items[lineIndex].variant_id);
                                }
                            },
                            function (error) {
                            }
                        );
                    }

                }

                PosOrder.prototype.changeVariant = function (variant, oldQuantity) {
                    var that = this;
                    var order = this.initTabActive();
                    if (!that.order.tenant_setting.allowed_negotived_sell) {
                        var availableQuantity = that.getAvailableVariant(variant);
                        if (availableQuantity <= 0) {
                            Sapo.Flash.error("Sản phẩm này hiện tại hết hàng.");
                            return false;
                        } else {
                            variant.quantity = availableQuantity > oldQuantity ? oldQuantity : availableQuantity;
                        }
                    } else {
                        variant.quantity = oldQuantity;
                    }


                    if (typeof (variant.price) == "string") {
                        variant.price = parseFloat(variant.price);
                    }
                    variant.price = that.getPriceByCode(variant, that.getCodePriceById(order.price_list_id));
                    variant.price_text = $.formatNumber(variant.price, { format: "#,##0.###", locale: "en" });
                    var index = order.order_line_items.length;
                    variant.name = variant.name.replace(/'/g, "&#39;").replace(/(?:\r\n|\r|\n)/g, ' ');
                    variant.variant_id = variant.id;
                    variant.id = 0;
                    variant.note = null;
                    variant.currency = order.currency;
                    variant.whole_sale_price_currency = money(that.getPriceByCode(variant, "BANBUON"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    variant.buy_price_currency = money(that.getPriceByCode(variant, "GIANHAP"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    variant.retail_price_currency = money(that.getPriceByCode(variant, "BANLE"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    variant.item_index = index;
                    variant.discount_rate = (order.customer == null || order.customer.default_discount_rate == undefined) ? 0 : order.customer.default_discount_rate;
                    variant.index = order.index;
                    //chiết khấu
                    variant.discount_value = 0;
                    variant.is_discount_percent = false;
                    variant.discount_reason = "";
                    variant.isdiscount = false;
                    variant.is_apply_normal_discount = true;
                    variant.normal_discount_line_item = 0;
                    variant.is_normal_discount_percent = false;

                    if (order.customer !== undefined
                        && order.customer !== null
                        && order.customer.default_discount_rate > 0) {
                        variant.customer_discount_line_item_rate = order.customer.default_discount_rate;
                        variant.is_apply_customer_discount = true;
                        variant.isdiscount = true;
                    }


                    variant.tax_rate_override = that.setTaxRateOverride(variant);

                    variant.opt1 = StandardOption(variant.opt1, variant.opt2, variant.opt3);
                    variant.allOption = (variant.opt1 == null ? "" : variant.opt1) + (variant.opt2 == null ? "" : " - " + variant.opt2)
                        + (variant.opt3 == null ? "" : " - " + variant.opt3);

                    variant.formatedName = that.formatStringLength(variant.name, 70);
                    variant.formatedUnit = that.formatStringLength(variant.unit, 9);

                    variant.total_available = 0;
                    variant.total_stock_on_hand = 0;
                    variant.total_incoming_stock = 0;
                    variant.total_stock_onway = 0;
                    $.each(variant.inventories, function (index, inventory) {
                        if (inventory.location_id == order.location_id) {
                            variant.available = inventory.available;
                            variant.stock_on_hand = inventory.on_hand;
                            variant.incoming_stock = inventory.incoming;
                            variant.stock_onway = inventory.onway;
                        }
                        variant.total_available += inventory.available;
                        variant.total_stock_on_hand += inventory.on_hand;
                        variant.total_incoming_stock += inventory.incoming;
                        variant.total_stock_onway += inventory.onway;
                    })

                }




                PosOrder.prototype.setTaxRateOverride = function (variant) {
                    var that = this;
                    var order = this.initTabActive();
                    //tax_line_item = order.order_line_items[index].tax_rate_override;
                    //if (order.order_line_items[index].isFreeform || order.order_line_items[index].isChangeTax) {
                    var tax_line_item = that.GetTaxValue();
                    if (variant != undefined && variant.taxable != undefined) {
                        if (!variant.taxable) {
                            tax_line_item = 0;
                        }
                    }
                    //}
                    //order.order_line_items[index].tax_rate_override = tax_line_item;
                    return tax_line_item;
                }

                PosOrder.prototype.getTaxRateOverride = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items == undefined || order.order_line_items.length == 0 || order.order_line_items[index] == null) return 0;
                    return $.formatNumber(order.order_line_items[index].tax_rate_override, { format: "#,##0.###", locale: "en" });
                }


                PosOrder.prototype.GetTaxValue = function () {
                    var order = this.initTabActive();
                    var tax_line_item_id = 0;
                    var tax_line_item = 0;
                    if (order.customer == undefined
                        || order.customer == null
                        || order.customer.default_tax_type_id == undefined
                        || order.customer.default_tax_type_id == null
                        || order.customer.default_tax_type_id <= 0) {
                        tax_line_item_id = order.tenant_setting.default_sales_tax;
                    } else {
                        tax_line_item_id = order.customer.default_tax_type_id;
                    }
                    if (tax_line_item_id != 0) {
                        if (order.tax_types != undefined && order.tax_types != null && order.tax_types.length != 0) {
                            for (var i = 0; i < order.tax_types.length; i++) {
                                if (order.tax_types[i].id == tax_line_item_id) tax_line_item = order.tax_types[i].effective_rate;
                            }
                        }
                    }
                    return tax_line_item;
                }

                PosOrder.prototype.resetTaxRateByTaxOrder = function (taxOrder) {
                    var that = this;
                    var order = this.initTabActive();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            $.each(order.order_line_items, function (index, order_line_item) {
                                if (order_line_item != null) {
                                    order_line_item.tax_rate_override = that.GetTaxValue();
                                    if (!order_line_item.taxable) order_line_item.tax_rate_override = 0;
                                }
                            });
                        }
                    }

                }

                PosOrder.prototype.resetTaxByCustomer = function () {
                    var that = this;
                    var order = this.initTabActive();
                    var tax_line_item = that.GetTaxValue();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != undefined && order.order_line_items[i] != null) {
                                    order.order_line_items[i].tax_rate_override = tax_line_item;
                                    if (!order.order_line_items[i].is_freeform && !order.order_line_items[i].taxable) order.order_line_items[i].tax_rate_override = 0;
                                }
                            }
                        }
                    }
                }

                PosOrder.prototype.getPriceText = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items == undefined || order.order_line_items.length == 0 || order.order_line_items[index] == null) return 0;
                    return $.formatNumber(order.order_line_items[index].price, { format: "#,##0.###", locale: "en" });
                }


                PosOrder.prototype.setPriceText = function (node, index) {
                    var order = this.initTabActive();
                    var oldPrice = order.order_line_items[index].price;
                    var newPrice = Math.round(parseFloat($(node).val().replace(/[,]+/g, '') === '' ? '0' : $(node).val().replace(/[,]+/g, '')));
                    order.order_line_items[index].price = newPrice;
                    this.resetPromotion();

                }

                //chiết khấu

                //chiết khấu line item
                PosOrder.prototype.showCustomerDiscountLineItem = function () {
                    var order = this.initTabActive();
                    if (order.customer_id > 0 && order.customer != null && order.customer.default_discount_rate > 0)
                        return true;
                    return false;
                }

                PosOrder.prototype.showLoyaltyDiscountLineItem = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items.length > 0 && order.order_line_items[index] != null
                        && order.order_line_items[index].isForLoyalty)
                        return true;
                    return false;
                }

                PosOrder.prototype.showPromotionDiscountLineItem = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items.length > 0 && order.order_line_items[index] != null
                        && order.order_line_items[index].order_promotion_discount_value > 0)
                        return true;
                    return false;
                }

                PosOrder.prototype.totalDiscountLineItem = function (index) {
                    var order = this.initTabActive();
                    var total = 0;

                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null) {
                        var orderItem = order.order_line_items[index];
                        var totalMoney = orderItem.price;
                        if (orderItem.is_apply_loyalty_discount != undefined && orderItem.is_apply_loyalty_discount) {
                            total += orderItem.price;
                        }
                        if (orderItem.is_apply_customer_discount != undefined && orderItem.is_apply_customer_discount && orderItem.customer_discount_line_item_rate > 0) {
                            total += Math.round((parseFloat(orderItem.customer_discount_line_item_rate) * totalMoney) / 100);
                        }
                        if (orderItem.is_apply_promotion_discount != undefined && orderItem.is_apply_promotion_discount
                            && orderItem.order_promotion_discount_value != undefined && parseFloat(orderItem.order_promotion_discount_value) > 0) {
                            if (orderItem.is_promotion_discount_percent) total += Math.round((parseFloat(orderItem.order_promotion_discount_value) * totalMoney) / 100);
                            else total += parseFloat(orderItem.order_promotion_discount_value)
                        }
                        if (orderItem.is_apply_normal_discount != undefined && orderItem.is_apply_normal_discount
                            && orderItem.normal_discount_line_item != undefined && parseFloat(orderItem.normal_discount_line_item) > 0) {
                            if (orderItem.is_normal_discount_percent) total += Math.round((parseFloat(orderItem.normal_discount_line_item) * totalMoney) / 100);
                            else total += parseFloat(orderItem.normal_discount_line_item);
                        }



                        return total;
                    }
                    return 0;
                }

                PosOrder.prototype.totalDiscountLineItemNotRound = function (index) {
                    var order = this.initTabActive();
                    var total = 0;

                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null) {
                        var orderItem = order.order_line_items[index];
                        var totalMoney = orderItem.price;
                        if (orderItem.is_apply_loyalty_discount != undefined && orderItem.is_apply_loyalty_discount) {
                            total += orderItem.price;
                        }
                        if (orderItem.is_apply_customer_discount != undefined && orderItem.is_apply_customer_discount && orderItem.customer_discount_line_item_rate > 0) {
                            total += (parseFloat(orderItem.customer_discount_line_item_rate) * totalMoney) / 100;
                        }
                        if (orderItem.is_apply_promotion_discount != undefined && orderItem.is_apply_promotion_discount
                            && orderItem.order_promotion_discount_value != undefined && parseFloat(orderItem.order_promotion_discount_value) > 0) {
                            if (orderItem.is_promotion_discount_percent) total += Math.round((parseFloat(orderItem.order_promotion_discount_value) * totalMoney) / 100);
                            else total += parseFloat(orderItem.order_promotion_discount_value)
                        }
                        if (orderItem.is_apply_normal_discount != undefined && orderItem.is_apply_normal_discount
                            && orderItem.normal_discount_line_item != undefined && parseFloat(orderItem.normal_discount_line_item) > 0) {
                            if (orderItem.is_normal_discount_percent) total += (parseFloat(orderItem.normal_discount_line_item) * totalMoney) / 100;
                            else total += parseFloat(orderItem.normal_discount_line_item);
                        }



                        return total;
                    }
                    return 0;
                }


                PosOrder.prototype.getDiscountValue = function (index) {
                    var order = this.initTabActive();
                    var total = 0;
                    var checkOnlyNormalDiscount = true;
                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null) {
                        var orderItem = order.order_line_items[index];
                        var totalMoney = orderItem.price;
                        if (orderItem.is_apply_loyalty_discount != undefined && orderItem.is_apply_loyalty_discount) {
                            total += orderItem.price;
                            checkOnlyNormalDiscount = false;
                        }
                        if (orderItem.is_apply_customer_discount != undefined && orderItem.is_apply_customer_discount && orderItem.customer_discount_line_item_rate) {
                            total += Math.round((parseFloat(orderItem.customer_discount_line_item_rate) * totalMoney) / 100);
                            checkOnlyNormalDiscount = false;
                        }
                        if (orderItem.is_apply_promotion_discount != undefined && orderItem.is_apply_promotion_discount
                            && orderItem.order_promotion_discount_value != undefined && parseFloat(orderItem.order_promotion_discount_value) > 0) {
                            if (orderItem.is_promotion_discount_percent) total += Math.round((parseFloat(orderItem.order_promotion_discount_value) * totalMoney) / 100);
                            else total += parseFloat(orderItem.order_promotion_discount_value)
                            checkOnlyNormalDiscount = false;
                        }
                        if (orderItem.is_apply_normal_discount != undefined && orderItem.is_apply_normal_discount
                            && orderItem.normal_discount_line_item != undefined && parseFloat(orderItem.normal_discount_line_item) > 0) {
                            if (orderItem.is_normal_discount_percent) total += Math.round((parseFloat(orderItem.normal_discount_line_item) * totalMoney) / 100);
                            else total += parseFloat(orderItem.normal_discount_line_item);

                        }

                        if (checkOnlyNormalDiscount) {
                            orderItem.is_discount_percent = orderItem.is_normal_discount_percent;
                            return orderItem.normal_discount_line_item;
                        } else {
                            orderItem.is_discount_percent = false;
                        }
                        return total;
                    }
                    return 0;
                }

                PosOrder.prototype.totalDiscountLineItemPopup = function (index) {
                    var order = this.initTabActive();
                    var total = 0;

                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null) {
                        var orderItem = order.order_line_items[index];
                        var totalMoney = orderItem.price;
                        if (orderItem.is_apply_loyalty_discount_tmp != undefined && orderItem.is_apply_loyalty_discount_tmp) {
                            total += orderItem.price;
                        }
                        if (orderItem.is_apply_customer_discount_tmp != undefined && orderItem.is_apply_customer_discount_tmp) {
                            total += Math.round((parseFloat(orderItem.customer_discount_line_item_rate) * totalMoney) / 100);
                        }
                        if (orderItem.is_apply_promotion_discount_tmp != undefined && orderItem.is_apply_promotion_discount_tmp
                            && orderItem.order_promotion_discount_value != undefined && parseFloat(orderItem.order_promotion_discount_value) > 0) {
                            if (orderItem.is_promotion_discount_percent) total += Math.round((parseFloat(orderItem.order_promotion_discount_value) * totalMoney) / 100);
                            else total += parseFloat(orderItem.order_promotion_discount_value)
                        }
                        if (orderItem.is_apply_normal_discount_tmp != undefined && orderItem.is_apply_normal_discount_tmp
                            && orderItem.normal_discount_line_item_tmp != undefined && parseFloat(orderItem.normal_discount_line_item_tmp) > 0) {
                            if (orderItem.is_normal_discount_percent_tmp) total += Math.round((parseFloat(orderItem.normal_discount_line_item_tmp) * totalMoney) / 100);
                            else total += parseFloat(orderItem.normal_discount_line_item_tmp);
                        }

                        return total;
                    }
                    return 0;
                }

                PosOrder.prototype.discountRerateItemNotRound = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null) {
                        var totalDiscount = this.totalDiscountLineItem(index);
                        return totalDiscount;
                    }
                    return 0;
                }

                PosOrder.prototype.discountRerateItem = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null) {
                        var totalDiscount = this.totalDiscountLineItem(index);
                        return $.formatNumber(Math.round(totalDiscount), { format: "#,##0.###", locale: "en" });
                    }
                    return 0;
                }
                // chiết khấu khách hàng lineitem _ start

                PosOrder.prototype.customerOrderDiscountLineItem = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items != undefined && order.order_line_items != null
                        && order.order_line_items.length > 0 && order.order_line_items[index] != null) {
                        if (order.customer_id > 0 && order.customer != null && order.customer.default_discount_rate > 0) {
                            order.order_line_items[index].customer_discount_line_item_rate = order.customer.default_discount_rate;
                        } else {
                            order.order_line_items[index].customer_discount_line_item_rate = 0;
                        }
                        return order.order_line_items[index].customer_discount_line_item_rate;
                    }
                    return 0
                }

                // chiết khấu khách hàng lineitem _ end
                //-----------------------------------------------
                // Chiết khấu thường lineitem _ start

                PosOrder.prototype.IsDisableNormalDiscountLineItem = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null && order.order_line_items[index].is_apply_normal_discount_tmp != undefined)
                        return order.order_line_items[index].is_apply_normal_discount_tmp;
                    return true;
                }



                PosOrder.prototype.changeNormalOrderDiscountLineItem = function (index, element) {
                    var order = this.initTabActive();
                    var value_tmp = 0;
                    var value = $(element).val();
                    if ($(element).val() == '') {
                        value = '';
                    }
                    else {
                        value_tmp = parseFloat($(element).val().replace(/[,]+/g, '') === '' ? '0' : $(element).val().replace(/[,]+/g, ''));
                        var value1 = value_tmp;
                        if (value1 > 0) {
                            if (order.order_line_items[index].is_normal_discount_percent_tmp) {
                                if (value1 > 100)
                                    value1 = 0;
                            } else {
                                if (value1 > order.order_line_items[index].price)
                                    value1 = 0;
                            }
                        } else {
                            value1 = 0;
                        }
                        value1 = $.formatNumber(value1, { format: "#,##0.##", locale: "en" });
                        if (parseFloat(value) != value1)
                            value = value1;
                    }
                    order.order_line_items[index].normal_discount_line_item_tmp = order.order_line_items[index].is_normal_discount_percent_tmp == true ? value : value_tmp;

                }

                PosOrder.prototype.isNormalDiscountPercentLineItem = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items[index] == undefined)
                        return false;
                    else
                        return order.order_line_items[index].is_normal_discount_percent_tmp;
                }
                PosOrder.prototype.changeDiscountPercentItem = function (index, value) {
                    var order = this.initTabActive();

                    if (order.order_line_items[index] == undefined)
                        return false
                    else {
                        if (order.order_line_items[index].is_normal_discount_percent_tmp != value) {
                            order.order_line_items[index].is_normal_discount_percent_tmp = value;
                            //if(order.order_line_items[index].is_normal_discount_percent_tmp && order.order_line_items[index].normal_discount_line_item_tmp > 100)
                            //    order.order_line_items[index].normal_discount_line_item_tmp = 0;
                            //this.resetPromotion();
                            order.order_line_items[index].normal_discount_line_item_tmp = 0;
                        }

                    }
                }
                PosOrder.prototype.getDiscountItem = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items[index] == undefined)
                        return false
                    else {
                        return order.order_line_items[index].isdiscount;
                    }

                }

                // Chiết khấu thường lineitem _ end
                // -------------------------------------------

                // Chiết khấu khuyến mại lineitem _ start

                PosOrder.prototype.promotionOrderDiscountLineItem = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null)
                        return order.order_line_items[index].order_promotion_discount_value;
                }

                PosOrder.prototype.isPromotionDiscountPercentLineItem = function (index) {
                    var order = this.initTabActive();
                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null)
                        return order.order_line_items[index].is_promotion_discount_percent;
                }

                // Chiết khấu khuyến mại lineitem _ end

                PosOrder.prototype.isValidDiscountLineItem = function (index) {
                    var order = this.initTabActive();
                    var price = 0
                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null) price = order.order_line_items[index].price;
                    var discount = this.totalDiscountLineItemPopup(index);
                    var number = discount * 100;
                    if (Sapo.Utility.isNumeric(discount)) {
                        if (Sapo.Utility.isNumeric(discount)) {
                            if (parseInt(discount) >= 0) {
                                if (parseInt(discount) > parseInt(price))
                                    return false;
                            }
                        }
                    }
                    return true;
                }




                PosOrder.prototype.removeDiscountLineItem = function (index) {
                    var order = this.initTabActive();
                    //order.order_line_items[index].discount_value = 0;
                    //order.order_line_items[index].is_discount_percent = false;
                    //order.order_line_items[index].discount_reason = "";
                    //order.order_line_items[index].isdiscount = false;

                    order.order_line_items[index].is_apply_normal_discount = true;
                    order.order_line_items[index].is_apply_promotion_discount = false;
                    order.order_line_items[index].is_apply_customer_discount = false;
                    order.order_line_items[index].normal_discount_line_item = 0;
                    order.order_line_items[index].is_normal_discount_percent = false;

                    this.hideDiscountItem();
                }
                PosOrder.prototype.applyDiscountLineItem = function (index) {
                    var order = this.initTabActive();
                    //order.order_line_items[index].discount_value = parseFloat($(".line-item-discount-value-" + index).val());
                    //order.order_line_items[index].discount_reason = $(".line-item-discount-reason-" + index).val();
                    //order.order_line_items[index].is_discount_percent = order.order_line_items[index].is_discount_percent_tmp;
                    if (order.order_line_items[index].discount_value > 0)
                        order.order_line_items[index].isdiscount = true;

                    if (order.order_line_items[index].is_apply_loyalty_discount != order.order_line_items[index].is_apply_loyalty_discount_tmp ||
                        order.order_line_items[index].is_apply_customer_discount != order.order_line_items[index].is_apply_customer_discount_tmp ||
                        order.order_line_items[index].is_apply_promotion_discount != order.order_line_items[index].is_apply_promotion_discount_tmp ||
                        order.order_line_items[index].is_apply_normal_discount != order.order_line_items[index].is_apply_normal_discount_tmp ||
                        order.order_line_items[index].normal_discount_line_item != order.order_line_items[index].normal_discount_line_item_tmp ||
                        order.order_line_items[index].is_normal_discount_percent != order.order_line_items[index].is_normal_discount_percent_tmp)
                        this.resetPromotion();


                    order.order_line_items[index].is_apply_loyalty_discount = order.order_line_items[index].is_apply_loyalty_discount_tmp;
                    order.order_line_items[index].is_apply_customer_discount = order.order_line_items[index].is_apply_customer_discount_tmp;
                    order.order_line_items[index].is_apply_promotion_discount = order.order_line_items[index].is_apply_promotion_discount_tmp;
                    order.order_line_items[index].is_apply_normal_discount = order.order_line_items[index].is_apply_normal_discount_tmp;

                    // chiết khấu thường
                    order.order_line_items[index].normal_discount_line_item = order.order_line_items[index].normal_discount_line_item_tmp == '' ? 0 : parseFloat(order.order_line_items[index].normal_discount_line_item_tmp);
                    order.order_line_items[index].is_normal_discount_percent = order.order_line_items[index].is_normal_discount_percent_tmp;
                    order.order_line_items[index].discount_reason = order.order_line_items[index].discount_reason_tmp;


                    order.order_line_items[index].discount_value = this.getDiscountValue(index);

                    this.hideDiscountItem();
                    this.OnlyCheckDisplayLoyalty();

                    Bindings.bind($(".order-menu-screen").get(0));
                    Bindings.refreshImmediately();
                }



                PosOrder.prototype.resetApplyDiscountLineItem = function (index) {
                    var order = this.initTabActive();

                    order.order_line_items[index].normal_discount_line_item = order.order_line_items[index].discount_value;
                    order.order_line_items[index].discount_reason_tmp = order.order_line_items[index].discount_reason;
                    order.order_line_items[index].is_discount_percent_tmp = order.order_line_items[index].is_discount_percent;
                }


                PosOrder.prototype.showDiscountItem = function (element, index) {
                    //Sapo.popoverOnClick($(element));
                    var order = this.initTabActive();
                    if ($('.popover').length <= 0) {

                        var that = this;
                        //this.resetApplyDiscountLineItem(index);


                        order.order_line_items[index].is_apply_loyalty_discount_tmp = order.order_line_items[index].is_apply_loyalty_discount;
                        order.order_line_items[index].is_apply_customer_discount_tmp = order.order_line_items[index].is_apply_customer_discount;
                        order.order_line_items[index].is_apply_promotion_discount_tmp = order.order_line_items[index].is_apply_promotion_discount;
                        order.order_line_items[index].is_apply_normal_discount_tmp = order.order_line_items[index].is_apply_normal_discount;

                        order.order_line_items[index].normal_discount_line_item_tmp = order.order_line_items[index].normal_discount_line_item;
                        order.order_line_items[index].is_normal_discount_percent_tmp = order.order_line_items[index].is_normal_discount_percent;
                        order.order_line_items[index].discount_reason_tmp = order.order_line_items[index].discount_reason;

                        $(element).addClass('active');
                        $(element).popover('show');
                        Bindings.unbind($(".popover").get(0), this);
                        Bindings.bind($(".popover").get(0), this);

                        this.initCheckboxApplyDiscountCustomerLineItem(index);
                        this.initCheckboxApplyDiscountLoyaltyLineItem(index);
                        this.initCheckboxApplyDiscountNormalLineItem(index);
                        this.initCheckboxApplyDiscountPromotionLineItem(index);



                        $(document).mouseup(function (e) {

                            var container = $('.popover');
                            if ((!container.is(e.target) // if the target of the click isn't the container...
                                && container.has(e.target).length === 0)) // ... nor a descendant of the container
                            {
                                $("input.popover-on-click").popover('destroy');
                                $("input.popover-on-click").removeClass('active');
                            }
                        })
                    }
                    else {
                        $(element).removeClass('active');
                    }
                    Sapo.Utility.changeNumber()
                }
                PosOrder.prototype.hideDiscountItem = function () {
                    $("input.popover-on-click").popover('destroy');
                }
                //order
                PosOrder.prototype.totalDisCountOrder = function (getround) {
                    var that = this;
                    var order = this.initTabActive();


                    //tính lại chiết khấu nếu chọn thanh toán bằng điểm
                    //if (order.is_apply_loyalty_discount == undefined) {
                    //    order.is_apply_loyalty_discount = false;
                    //}
                    //if (order.is_apply_loyalty_discount) {
                    //    order.order_discount_value = order.current_loyalty_customer.loyalty_card.discount_value;
                    //    if (order.current_loyalty_customer.loyalty_card.discount_type == "percent")
                    //        order.is_discount_percent = true;
                    //    else order.is_discount_percent = false;
                    //    order.is_apply_loyalty_discount = true;

                    //} else {
                    //    if (order.is_apply_loyalty_discount == undefined) {
                    //        order.is_apply_loyalty_discount = false;
                    //    }
                    //    if (order.is_apply_loyalty_discount) {
                    //        order.order_discount_value = 0;
                    //        order.is_discount_percent = false;
                    //        order.is_apply_loyalty_discount = false;
                    //    }
                    //}



                    var valueDiscount = order.order_discount_value;
                    if (order.is_discount_percent) {
                        valueDiscount = that.totalMoneyItem() * (valueDiscount / 100);
                    }
                    if (getround == false)
                        return valueDiscount;
                    return Math.round(valueDiscount);
                }
                PosOrder.prototype.getCurrency = function () {
                    var that = this;
                    var order = this.initTabActive();

                    return order.currency;
                }
                PosOrder.prototype.resetApplyDiscountOrder = function () { // khi kg cấn áp dụng thì lại trở về chiết khấu trước khi sửa trong popup áp dụng chiết khấu
                    var order = this.initTabActive();
                    order.order_normal_discount_value_tmp = order.order_normal_discount_value;
                    order.is_discount_percent_tmp = order.is_discount_percent;

                    order.discount_reason_tmp = order.discount_reason;


                }

                // chiet khau don hang <cong don>- start
                PosOrder.prototype.totalDiscountOrderInOrderPopup = function () {
                    var that = this;
                    var order = this.initTabActive();
                    var totalMoney = this.totalMoneyItem();
                    var total = 0;
                    if (order.is_apply_loyalty_discount_tmp != undefined && order.is_apply_loyalty_discount_tmp
                        && order.order_loyalty_discount_value != undefined && parseFloat(order.order_loyalty_discount_value) > 0) {
                        if (order.is_loyalty_discount_percent) total += Math.round((parseFloat(order.order_loyalty_discount_value) * totalMoney) / 100);
                        else total += parseFloat(order.order_loyalty_discount_value);
                    }
                    if (order.is_apply_promotion_discount_tmp != undefined && order.is_apply_promotion_discount_tmp
                        && order.order_promotion_discount_value != undefined && parseFloat(order.order_promotion_discount_value) > 0) {
                        if (order.is_promotion_discount_percent) total += Math.round((order.order_promotion_discount_value * totalMoney) / 100);
                        else total += parseFloat(order.order_promotion_discount_value)
                    }
                    if (order.is_apply_normal_discount_tmp != undefined && order.is_apply_normal_discount_tmp
                        && order.order_normal_discount_value_tmp != undefined && parseFloat(order.order_normal_discount_value_tmp) > 0) {
                        if (order.is_normal_discount_percent_tmp) total += Math.round((parseFloat(order.order_normal_discount_value_tmp) * totalMoney) / 100);
                        else total += parseFloat(order.order_normal_discount_value_tmp);
                    }
                    if (order.promotion_id > 0 && order.is_apply_promotion_discount_tmp) return total;
                    if (order.order_loyalty_discount_value > 0 && order.is_apply_loyalty_discount_tmp) return total;

                    return order.order_normal_discount_value_tmp == undefined ? 0 : parseFloat(order.order_normal_discount_value_tmp);
                }

                PosOrder.prototype.totalDiscountOrderInOrder = function () {
                    var that = this;
                    var order = this.initTabActive();
                    var totalMoney = this.totalMoneyItem();
                    var total = 0;

                    if (order.is_apply_loyalty_discount != undefined && order.is_apply_loyalty_discount
                        && order.order_loyalty_discount_value != undefined && parseFloat(order.order_loyalty_discount_value) > 0) {
                        if (order.is_loyalty_discount_percent) total += Math.round((parseFloat(order.order_loyalty_discount_value) * totalMoney) / 100);
                        else total += parseFloat(order.order_loyalty_discount_value);
                    }
                    if (order.is_apply_promotion_discount != undefined && order.is_apply_promotion_discount
                        && order.order_promotion_discount_value != undefined && parseFloat(order.order_promotion_discount_value) > 0) {
                        if (order.is_promotion_discount_percent) total += Math.round((parseFloat(order.order_promotion_discount_value) * totalMoney) / 100);
                        else total += parseFloat(order.order_promotion_discount_value)
                    }
                    if (order.is_apply_normal_discount != undefined && order.is_apply_normal_discount
                        && order.order_normal_discount_value != undefined && parseFloat(order.order_normal_discount_value) > 0) {
                        if (order.is_normal_discount_percent) total += Math.round((parseFloat(order.order_normal_discount_value) * totalMoney) / 100);
                        else total += parseFloat(order.order_normal_discount_value);
                    }

                    return total;
                    //if (order.promotion_id > 0 && order.is_apply_promotion_discount) return total;
                    //if (order.order_loyalty_discount_value > 0 && order.is_apply_loyalty_discount) return total;

                    //if (order.is_apply_normal_discount != undefined && order.is_apply_normal_discount
                    //   && order.order_normal_discount_value != undefined && parseFloat(order.order_normal_discount_value) > 0)
                    //    return parseFloat(order.order_normal_discount_value);
                    //return 0
                }

                PosOrder.prototype.getOrderDiscountValue = function () {
                    var that = this;
                    var order = this.initTabActive();
                    var totalMoney = this.totalMoneyItem();
                    var total = 0;
                    var checkmultiDiscount = false;
                    if (order.is_apply_loyalty_discount != undefined && order.is_apply_loyalty_discount
                        && order.order_loyalty_discount_value != undefined && parseFloat(order.order_loyalty_discount_value) > 0) {
                        if (order.is_loyalty_discount_percent) total += Math.round((parseFloat(order.order_loyalty_discount_value) * totalMoney) / 100);
                        else total += parseFloat(order.order_loyalty_discount_value);
                        checkmultiDiscount = true;
                    }
                    if (order.is_apply_promotion_discount != undefined && order.is_apply_promotion_discount
                        && order.order_promotion_discount_value != undefined && parseFloat(order.order_promotion_discount_value) > 0) {
                        if (order.is_promotion_discount_percent) total += Math.round((parseFloat(order.order_promotion_discount_value) * totalMoney) / 100);
                        else total += parseFloat(order.order_promotion_discount_value)
                        checkmultiDiscount = true;
                    }
                    if (order.is_apply_normal_discount != undefined && order.is_apply_normal_discount
                        && order.order_normal_discount_value != undefined && parseFloat(order.order_normal_discount_value) > 0) {
                        if (order.is_normal_discount_percent) total += Math.round((parseFloat(order.order_normal_discount_value) * totalMoney) / 100);
                        else total += parseFloat(order.order_normal_discount_value);
                    }
                    if (checkmultiDiscount) return total
                    else if (order.is_apply_normal_discount != undefined && order.is_apply_normal_discount && order.order_normal_discount_value != undefined && parseFloat(order.order_normal_discount_value) > 0) return order.order_normal_discount_value
                    return 0;
                }

                PosOrder.prototype.getOrderDiscountPersent = function () {
                    var that = this;
                    var order = this.initTabActive();
                    var total = 0;
                    if (order.is_apply_loyalty_discount != undefined && order.is_apply_loyalty_discount
                        && order.order_loyalty_discount_value != undefined && parseFloat(order.order_loyalty_discount_value) > 0) {
                        if (order.is_loyalty_discount_percent) total += parseFloat(order.order_loyalty_discount_value);

                    }
                    if (order.is_apply_promotion_discount != undefined && order.is_apply_promotion_discount
                        && order.order_promotion_discount_value != undefined && parseFloat(order.order_promotion_discount_value) > 0) {
                        if (order.is_promotion_discount_percent) total += parseFloat(order.order_promotion_discount_value);

                    }
                    if (order.is_apply_normal_discount != undefined && order.is_apply_normal_discount
                        && order.order_normal_discount_value != undefined && parseFloat(order.order_normal_discount_value) > 0) {
                        if (order.is_normal_discount_percent) total += parseFloat(order.order_normal_discount_value);

                    }
                    return total;
                }

                PosOrder.prototype.getOrderDiscountNotPersent = function () {
                    var that = this;
                    var order = this.initTabActive();

                    var total = 0;

                    if (order.is_apply_loyalty_discount != undefined && order.is_apply_loyalty_discount
                        && order.order_loyalty_discount_value != undefined && parseFloat(order.order_loyalty_discount_value) > 0) {
                        if (!order.is_loyalty_discount_percent) total += parseFloat(order.order_loyalty_discount_value);

                    }
                    if (order.is_apply_promotion_discount != undefined && order.is_apply_promotion_discount
                        && order.order_promotion_discount_value != undefined && parseFloat(order.order_promotion_discount_value) > 0) {
                        if (!order.is_promotion_discount_percent) total += parseFloat(order.order_promotion_discount_value)

                    }
                    if (order.is_apply_normal_discount != undefined && order.is_apply_normal_discount
                        && order.order_normal_discount_value != undefined && parseFloat(order.order_normal_discount_value) > 0) {
                        if (!order.is_normal_discount_percent) total += parseFloat(order.order_normal_discount_value);
                    }

                    return total;
                }


                PosOrder.prototype.totalDiscountOrderInLineItem = function (index) {
                    var that = this;
                    var order = this.initTabActive();
                    var totalMoney = this.totalMoneyOrderDetail(index);
                    var total = 0;
                    var orderItem = order.order_line_items[index];
                    if (orderItem.is_apply_loyalty_discount != undefined && orderItem.is_apply_loyalty_discount
                        && orderItem.order_loyalty_discount_value != undefined && parseFloat(orderItem.order_loyalty_discount_value) > 0) {
                        if (orderItem.is_loyalty_discount_percent) total += Math.round((parseFloat(orderItem.order_loyalty_discount_value) * totalMoney) / 100);
                        else total += parseFloat(orderItem.order_loyalty_discount_value);
                    }
                    if (orderItem.is_apply_promotion_discount != undefined && orderItem.is_apply_promotion_discount
                        && orderItem.order_promotion_discount_value != undefined && parseFloat(orderItem.order_promotion_discount_value) > 0) {
                        if (orderItem.is_promotion_discount_percent) total += Math.round((parseFloat(orderItem.order_promotion_discount_value) * totalMoney) / 100);
                        else total += parseFloat(orderItem.order_promotion_discount_value)
                    }
                    if (orderItem.is_apply_normal_discount != undefined && orderItem.is_apply_normal_discount
                        && orderItem.order_normal_discount_value != undefined && parseFloat(orderItem.order_normal_discount_value) > 0) {
                        if (orderItem.is_normal_discount_percent) total += Math.round((parseFloat(orderItem.order_normal_discount_value) * totalMoney) / 100);
                        else total += parseFloat(orderItem.order_normal_discount_value);
                    }

                    if (orderItem.promotion_id > 0 && orderItem.is_apply_promotion_discount) return total;
                    if (orderItem.order_loyalty_discount_value > 0 && orderItem.is_apply_loyalty_discount) return total;

                    return orderItem.order_normal_discount_value == undefined ? 0 : parseFloat(orderItem.order_normal_discount_value);
                }


                PosOrder.prototype.orderTotalDiscount = function (element) { // tính tổng chiết khấu đơn hàng theo các loại chiết khấu
                    var that = this;
                    var order = this.initTabActive();
                    this.ApplyDiscountLoyalty();

                    order.order_discount_value = this.getOrderDiscountValue();
                    return order.order_discount_value;
                }

                PosOrder.prototype.isTotalOrderDiscountDisable = function () {
                    var order = this.initTabActive();
                    if ((order.is_apply_loyalty_discount == undefined || !order.is_apply_loyalty_discount)
                        && (order.is_apply_promotion_discount == undefined || !order.is_apply_promotion_discount))
                        return false;
                    return true;
                }

                PosOrder.prototype.changeOrderTotalDiscount = function (element) {
                    var order = this.initTabActive();
                    if (order.is_discount_percent == undefined) order.is_discount_percent = false;
                    if (element != undefined) {

                        var value = parseFloat($(element).val().replace(/[,]+/g, '') === '' ? '0' : $(element).val().replace(/[,]+/g, ''));
                        if (value < 0) value = 0;
                        if (order.is_discount_percent && value > 100) value = 0
                        if (!order.is_discount_percent && value > this.totalMoneyItem()) value = 0;
                        order.is_apply_normal_discount = true;
                        order.order_discount_value = value;
                        order.order_normal_discount_value = value;
                        if ($(".order-discount-value").val() != value)
                            $(".order-discount-value").val(value);
                        if (value > 0) order.isdiscount = true;
                    }
                    if (!this.isValidDiscountOrder()) {
                        order.order_discount_value = 0;
                        order.order_normal_discount_value = 0;
                        if ($(".order-discount-value").val() != 0)
                            $(".order-discount-value").val("0");
                    }
                }

                PosOrder.prototype.isDiscountPercentOrder = function (value) {
                    var order = this.initTabActive();
                    if (order.is_normal_discount_percent != undefined && order.is_normal_discount_percent != value) {
                        this.resetPromotion();
                    }

                    order.is_discount_percent = value;
                    order.is_normal_discount_percent = value;
                    if (value == false) {
                        $("#floatdiscount").hide();
                        $("#intdiscount").show();
                    }
                    else {
                        $("#floatdiscount").show();
                        $("#floatdiscount").number(true, 2);
                        $("#intdiscount").hide();
                    }
                    //if(order.is_normal_discount_percent && order.order_normal_discount_value > 100) order.order_normal_discount_value = 0;
                    //if (!order.is_normal_discount_percent && order.order_normal_discount_value > this.totalAmountItem) order.order_normal_discount_value = 0;
                    order.order_normal_discount_value = 0;
                }

                PosOrder.prototype.isDiscountPercent = function () {
                    var that = this;
                    var order = this.initTabActive();
                    that.ApplyDiscountLoyalty();
                    order.is_discount_percent = order.is_normal_discount_percent;
                    if (order.promotion_id > 0 && order.is_apply_promotion_discount) order.is_discount_percent = false;
                    if (order.order_loyalty_discount_value > 0 && order.is_apply_loyalty_discount) order.is_discount_percent = false;
                    if (order.is_discount_percent == true)
                        $("#disablepercent").removeClass('active');
                    else
                        $("#activepercent").removeClass('active');
                    return order.is_discount_percent;
                }

                // chiet khau don hang <cong don>- end
                //-------------------
                // chiet khau thuong_start

                PosOrder.prototype.IsDisableNormalDiscountOrder = function () {
                    var order = this.initTabActive();
                    if (order.is_apply_normal_discount_tmp == undefined) order.is_apply_normal_discount_tmp = true;
                    return order.is_apply_normal_discount_tmp;

                }
                //PosOrder.prototype.orderNormalOrderDiscount = function () {
                //    var order = this.initTabActive();

                //    if (order.order_normal_discount_value_tmp == undefined) return 0;

                //    return order.format_order_normal_discount_value;
                //}
                PosOrder.prototype.changeNormalOrderDiscount = function (element) {
                    var order = this.initTabActive();
                    var value_tmp = 0;
                    var value = $(element).val();
                    if ($(element).val() == '') {
                        value = 0;
                    }
                    else {
                        value_tmp = parseFloat($(element).val().replace(/[,]+/g, '') === '' ? '0' : $(element).val().replace(/[,]+/g, ''));
                        var value1 = value_tmp;
                        if (value1 > 0) {
                            if (order.is_normal_discount_percent_tmp) {
                                if (value1 > 100)
                                    value1 = 0;
                            } else {
                                if (value1 > this.totalMoneyItem())
                                    value1 = 0;
                            }
                        } else {
                            value1 = 0;
                        }
                        value1 = $.formatNumber(value1, { format: "#,##0.##", locale: "en" });
                        if (parseFloat(value) != value1)
                            value = value1;
                    }
                    order.order_normal_discount_value_tmp = order.is_normal_discount_percent_tmp != true ? value_tmp : value
                    this.order.format_order_normal_discount_value = order.is_normal_discount_percent_tmp != true ? value.replace(".", "") : value;
                    Bindings.refreshImmediately();
                    //return order.format_order_normal_discount_value;

                }
                PosOrder.prototype.changeNormalDiscountPercentOrder = function (value) {
                    var order = this.initTabActive();
                    if (order.is_normal_discount_percent_tmp != value) {
                        order.is_normal_discount_percent_tmp = value;
                        //if(order.is_normal_discount_percent_tmp && order.order_normal_discount_value_tmp > 100)
                        //    order.order_normal_discount_value_tmp = 0;
                        //this.resetPromotion();
                        this.order.format_order_normal_discount_value = 0;
                        order.order_normal_discount_value_tmp = 0;
                    }
                }
                PosOrder.prototype.isNormalDiscountPercentOrder = function () {
                    var order = this.initTabActive();
                    return order.is_normal_discount_percent_tmp;
                }
                // chiet khau thuong_end
                //---------------------------------
                // chiet khau tich diem_start

                PosOrder.prototype.orderLoyaltyOrderDiscount = function () {
                    var that = this;
                    var order = this.initTabActive();
                    that.ApplyDiscountLoyalty();
                    if (order.order_loyalty_discount_value == undefined) return 0;

                    return $.formatNumber(order.order_loyalty_discount_value, { format: "#,##0.###", locale: "en" });
                }
                PosOrder.prototype.changeLoyaltyOrderDiscount = function (element) {
                    // kg xu ly vi kg cho thay doi chiet khau tich diem
                }
                PosOrder.prototype.changeLoyaltyDiscountPercentOrder = function (value) {
                    // khong xu ly
                }
                PosOrder.prototype.isLoyaltyDiscountPercentOrder = function () {
                    var order = this.initTabActive();
                    that.ApplyDiscountLoyalty();
                    if (order.is_loyalty_discount_percent == undefined) return false;
                    return order.is_loyalty_discount_percent;
                }

                // chiet khau tich diem_end
                //---------------------------------
                // chiet khau khuyen mai_start

                PosOrder.prototype.orderPromotionOrderDiscount = function () {
                    var that = this;
                    var order = this.initTabActive();

                    if (order.order_promotion_discount_value == undefined) return 0;

                    return $.formatNumber(order.order_promotion_discount_value, { format: "#,##0.###", locale: "en" });
                }
                PosOrder.prototype.changePromotionOrderDiscount = function (element) {
                    //khong xu ly
                }
                PosOrder.prototype.changePromotionDiscountPercentOrder = function (value) {
                    // khong xu ly
                }
                PosOrder.prototype.isPromotionDiscountPercentOrder = function () {
                    var order = this.initTabActive();
                    if (order.is_promotion_discount_percent == undefined) return false;
                    return order.is_promotion_discount_percent;
                }

                // chiết khấu khuyến mại _ start

                PosOrder.prototype.getSymbol = function () {
                    var order = this.initTabActive();
                    return order.currency.symbol;
                }


                PosOrder.prototype.discountReasonOrder = function (element) {
                    that = this;
                    var order = this.initTabActive();
                    order.discount_reason_tmp = order.discount_reason;
                    that.ApplyDiscountLoyalty();
                    return order.discount_reason_tmp;
                }
                PosOrder.prototype.isdiscountOrder = function () {
                    var order = this.initTabActive();
                    if (order.isdiscount == undefined)
                        order.isdiscount = false;
                    return order.isdiscount;
                }
                PosOrder.prototype.removeDiscountOrder = function () {
                    var order = this.initTabActive();
                    //order.order_discount_value = 0;
                    //order.is_discount_percent = false;
                    //order.discount_reason = "";
                    //order.isdiscount = false;
                    order.is_apply_normal_discount = true;
                    order.order_normal_discount_value = 0;
                    order.is_normal_discount_percent = false;
                    order.is_apply_loyalty_discount = false;
                    order.order_loyalty_discount_value = 0;
                    order.is_loyalty_discount_percent = false;
                    this.resetPromotion();
                    this.hideDiscountOrder();
                }
                PosOrder.prototype.showDiscountOrder = function (element) {
                    if ($('.popover').length <= 1) {
                        var that = this;
                        var order = that.initTabActive();

                        if ($('.popover').length <= 0) {
                            var that = this;
                            this.resetApplyDiscountOrder();
                            $(element).addClass('active');
                            $(element).popover('show');
                        }
                        Bindings.refreshImmediately();
                        Bindings.unbind($(".popover").get(0), this);
                        Bindings.bind($(".popover").get(0), this);


                        order.is_apply_normal_discount_tmp = order.is_apply_normal_discount == undefined ? true : order.is_apply_normal_discount;
                        order.order_normal_discount_value_tmp = order.order_normal_discount_value;
                        this.order.format_order_normal_discount_value = order.order_normal_discount_value;
                        order.is_normal_discount_percent_tmp = order.is_normal_discount_percent;
                        this.initCheckboxApplyOrderDiscountNormal();

                        if (order.customer != null && order.is_apply_loyalty_discount != undefined) {
                            order.is_apply_loyalty_discount_tmp = order.is_apply_loyalty_discount == undefined ? true : order.is_apply_loyalty_discount;
                            this.initCheckboxApplyOrderDiscountLoyalty();
                        }

                        if (order.promotion_id > 0) {
                            order.is_apply_promotion_discount_tmp = order.is_apply_promotion_discount == undefined ? true : order.is_apply_promotion_discount;
                            this.initCheckboxApplyOrderDiscountPromotion();
                        }

                        $(document).mouseup(function (e) {
                            var container = $('.popover');
                            if ((!container.is(e.target) // if the target of the click isn't the container...
                                && container.has(e.target).length === 0)) // ... nor a descendant of the container
                            {
                                $("span.discount-order").popover('destroy');
                                $("span.discount-order").removeClass('active');
                            }
                        })
                        $(document).keyup(function (e) {
                            if (e.keyCode == 27) {
                                $("span.discount-order").popover('destroy');
                                $("span.discount-order").removeClass('active');
                            }
                        });
                    } else {
                        $("span.discount-order").popover('destroy');
                        $("span.discount-order").removeClass('active');
                    }
                }


                PosOrder.prototype.hideDiscountOrder = function () {
                    $("span.discount-order").popover('destroy');
                }
                PosOrder.prototype.hidePaymentOrder = function () {
                    $("span.customer-payment").popover('destroy');
                }
                PosOrder.prototype.isValidDiscountOrderPopup = function () {
                    var that = this;
                    var order = this.initTabActive();
                    var discount = this.totalDiscountOrderInOrderPopup();
                    if (Sapo.Utility.isNumeric(discount)) {
                        if (parseInt(discount) >= 0) {
                            var a = that.totalParseFloatMoneyLineItemAndTax();
                            if (parseInt(discount) > parseInt(that.totalParseFloatMoneyLineItemAndTax()))
                                return false;
                        }
                    }
                    return true;
                }

                PosOrder.prototype.isValidDiscountOrder = function () {
                    var that = this;
                    var order = this.initTabActive();
                    var discount = this.totalDiscountOrderInOrder();
                    if (Sapo.Utility.isNumeric(discount)) {
                        if (parseInt(discount) >= 0) {
                            var a = that.totalParseFloatMoneyLineItemAndTax();
                            if (parseInt(discount) > parseInt(that.totalParseFloatMoneyLineItemAndTax()))
                                return false;
                        }
                    }
                    return true;
                }

                PosOrder.prototype.applyDiscountOrder = function () {
                    var order = this.initTabActive();
                    if (order.is_apply_normal_discount != order.is_apply_normal_discount_tmp
                        || order.order_normal_discount_value != order.order_normal_discount_value_tmp
                        || order.is_normal_discount_percent != order.is_normal_discount_percent_tmp
                        || order.is_apply_loyalty_discount != order.is_apply_loyalty_discount_tmp)
                        this.resetPromotion();

                    order.is_apply_normal_discount = order.is_apply_normal_discount_tmp
                    order.order_normal_discount_value = parseFloat(order.order_normal_discount_value_tmp);
                    order.is_normal_discount_percent = order.is_normal_discount_percent_tmp
                    order.is_apply_loyalty_discount = order.is_apply_loyalty_discount_tmp
                    order.is_apply_promotion_discount = order.is_apply_promotion_discount_tmp

                    order.order_discount_value = this.getOrderDiscountValue();

                    order.discount_reason = $(".order-discount-reason").val();
                    order.is_discount_percent = false;
                    if (order.order_discount_value > 0)
                        order.isdiscount = true;

                    this.hideDiscountOrder();
                    this.OnlyCheckDisplayLoyalty();
                    //Bindings.unbind($(".order-menu-screen").get(0));
                    //Bindings.bind($(".order-menu-screen").get(0));
                    Bindings.refreshImmediately();
                }


                //end chiết khấu
                PosOrder.prototype.addLineDifItem = function () {

                    var that = this;
                    var order = this.initTabActive();
                    var variant = {};
                    variant.quantity = 1;
                    //ham tinh gia se tinh o day phai viet mot ham de dung chung
                    variant.price = 0;

                    var index = order.order_line_items.length;
                    variant.currency = order.currency;
                    variant.item_index = index;
                    variant.note = "";
                    variant.discount_rate = (order.customer == null || order.customer.default_discount_rate == undefined) ? 0 : order.customer.default_discount_rate;
                    variant.tax_rate_override = 0;
                    variant.is_freeform = true;
                    variant.index = order.index;
                    //chiết khấu
                    variant.discount_value = 0;
                    variant.is_discount_percent = false;
                    variant.discount_reason = "";
                    variant.isdiscount = false;
                    variant.is_apply_normal_discount = true;
                    variant.normal_discount_line_item = 0;
                    variant.is_normal_discount_percent = false;

                    if (order.customer !== undefined
                        && order.customer !== null
                        && order.customer.default_discount_rate > 0) {
                        variant.customer_discount_line_item_rate = order.customer.default_discount_rate;
                        variant.is_apply_customer_discount = true;
                        variant.isdiscount = true;
                    }
                    //end chiết khấu

                    //thuế
                    variant.tax_rate_override = that.setTaxRateOverride(variant);
                    //end

                    order.order_line_items.push(variant);
                    var template = $('#line-item-dif-template').html();
                    var html = Mustache.render(template, { "line_item": variant });
                    $("#line_item_rows").append(html);
                    Bindings.bind($("#variant-" + index).get(0), this);
                    $("#variant-" + index).find(".line_item_note").focus().select();
                    Sapo.popover($("i#sapo-popover" + index));
                    // get dữ liệu tax lên giao diện
                    tooltip($("span"));
                    //this.changTaxRateItem();
                    this.updateScollBar();
                    Sapo.Utility.changeNumber();
                    Bindings.unbind($("table#table-order tbody").get(0));
                    Bindings.bind($("table#table-order tbody").get(0));
                    Bindings.refreshImmediately();
                    //$(document).click();
                    this.OnKeyDown();
                    //this.getShippingMethods();
                }
                PosOrder.prototype.setQuantityItem = function (index, value) {

                    var that = this;
                    index = parseInt(index);
                    var order = this.initTabActive();
                    var oldQuantity;
                    if (order.order_line_items != null) {
                        if (order.order_line_items[index] != null) {
                            oldQuantity = order.order_line_items[index].quantity;
                            if (parseFloat(order.order_line_items[index].quantity) < 0) {
                                order.order_line_items[index].quantity = 1;
                            }
                        }
                    }
                    this.resetPromotion();
                }

                PosOrder.prototype.setQuantityItemDif = function (index, avaiable, value) {

                    var that = this;
                    var order = this.initTabActive();
                    index = parseInt(index);
                    var oldQuantity;
                    if (order.order_line_items != null) {
                        if (order.order_line_items[index] != null) {
                            oldQuantity = order.order_line_items[index].quantity;
                            if (parseFloat(order.order_line_items[index].quantity) <= 0) {
                                order.order_line_items[index].quantity = 1;
                            }
                            if (!that.order.tenant_setting.allowed_negotived_sell) {
                                if (parseFloat(value) > parseFloat(avaiable)) {
                                    order.order_line_items[index].quantity = parseFloat(avaiable);
                                    Sapo.Flash.error("Sản phẩm này còn lại " + parseFloat(avaiable) + " sản phẩm, không được phép bán vượt quá số lượng này.");
                                }
                            }

                        }
                    }
                    this.resetPromotion();

                }

                PosOrder.prototype.changTaxRateItemKeyUp = function (node, index) {
                    var order = this.initTabActive();
                    if (order.order_line_items == null || order.order_line_items.length <= 0) return;
                    order.order_line_items[index].tax_rate_override = $(node).val();
                }

                PosOrder.prototype.changTaxRateItem = function () {
                    var order = this.initTabActive();
                    order.list_tax = [];
                    //for (var i = 0; i < order.order_line_items.length; i++) {
                    //    if (order.order_line_items[i] != null) {
                    //        if (order.order_line_items[i].tax_rate_override != 0) {
                    //            if (order.list_tax.length != 0) {
                    //                var check = false;
                    //                for (var j = 0; j < order.list_tax.length; j++) {
                    //                    if (order.list_tax[j].tax_rate_override == order.order_line_items[i].tax_rate_override) {
                    //                        check = true;
                    //                        break;
                    //                    }
                    //                }
                    //                if (!check) {
                    //                    order.list_tax.push({
                    //                        tax_rate_override: order.order_line_items[i].tax_rate_override
                    //                    });
                    //                }
                    //            }
                    //            else {
                    //                order.list_tax.push({
                    //                    tax_rate_override: order.order_line_items[i].tax_rate_override
                    //                });
                    //            }

                    //        }
                    //    }
                    //}
                }

                PosOrder.prototype.validateLineItemQuantity = function (index) {
                    var order = this.initTabActive();
                    var roundQuantity = this.getRoundQuantity(order.order_line_items[index].quantity);
                    if (parseInt(roundQuantity) < 1) {
                        roundQuantity = 1;
                    }
                    order.order_line_items[index].quantity = roundQuantity;
                    this.getShippingMethods();
                }

                PosOrder.prototype.getRoundQuantity = function (quantity) {
                    var order = this.initTabActive();
                    var roundQuantity = Math.abs(quantity);
                    //if (parseInt(roundQuantity) < 1) {
                    //    return 1;
                    //}
                    return roundQuantity;
                }

                PosOrder.prototype.removeLineItem = function (index) {
                    var order = this.initTabActive();
                    var lineItem = order.order_line_items[index];
                    if (!(lineItem && lineItem.isForLoyalty))
                        this.resetPromotion();
                    if (lineItem.product_type == "serial") {
                        $(`#variant-serial-${index}`).remove();
                    }
                    order.order_line_items[index] = null;

                    $("#variant-" + index).remove();


                    Bindings.unbind($("#line_item_rows").get(0), this);
                    Bindings.bind($("#line_item_rows").get(0), this);
                    //this.changTaxRateItem();
                    this.updateScollBar();
                    Bindings.refreshImmediately();

                    //this.getShippingMethods();
                }
                PosOrder.prototype.getCountLineItems = function () {
                    var length = 0;
                    var order = this.initTabActive();
                    for (var i = 0; i < order.order_line_items.length; i++) {
                        if (order.order_line_items[i] != null && order.order_line_items[i].item_index != null && order.order_line_items[i].item_index != undefined)
                            length++;
                    }
                    return length;
                }


                PosOrder.prototype.isPaid = function () {
                    //if (!that.checkCreate) {
                    //    var order = this.initTabActive();
                    //    if (order.edit_order != true) {
                    //        order.status = "draft";
                    //    }

                    //    $(".btn-default pull-right.btn-save").addClass("disabled");
                    //    $(".btn-paid").addClass("disabled").html(Sapo.LOADING);
                    //    this.createDraftOrder("paid");
                    //}
                    console.log('Da chay vao day,...')
                };


                PosOrder.prototype.isPending = function (status) {
                    var order = this.initTabActive();
                    order.status = status;
                    this.createDraftOrder("pending");
                }

                PosOrder.prototype.getDiscountItemsOrder = function (index) {
                    var discountItems = [];
                    var order = this.initTabActive();

                    if (order.is_apply_normal_discount && order.order_normal_discount_value > 0) {
                        var discountItemNormal = {};
                        discountItemNormal.source = Sapo.Const.DiscountSource.MANUAL;
                        discountItemNormal.position = 0;
                        discountItemNormal.rate = order.is_normal_discount_percent ? order.order_normal_discount_value : 0;
                        discountItemNormal.value = !order.is_normal_discount_percent ? order.order_normal_discount_value : 0
                        discountItemNormal.reason = order.discount_reason_tmp;
                        discountItems.push(discountItemNormal);
                    }

                    if (order.is_apply_loyalty_discount && order.order_loyalty_discount_value > 0) {
                        var discountItemLoyalty = {};
                        discountItemLoyalty.source = Sapo.Const.DiscountSource.CUSTOMER_LOYALTY;
                        discountItemLoyalty.position = 1;
                        discountItemLoyalty.rate = order.is_loyalty_discount_percent ? order.order_loyalty_discount_value : 0;
                        discountItemLoyalty.value = !order.is_loyalty_discount_percent ? order.order_loyalty_discount_value : 0
                        discountItemLoyalty.reason = null;
                        discountItems.push(discountItemLoyalty);
                    }

                    if (order.is_apply_promotion_discount && order.order_promotion_discount_value > 0) {
                        var discountItemPromotion = {};
                        discountItemPromotion.source = Sapo.Const.DiscountSource.PROMOTION_PROGRAM;
                        discountItemPromotion.position = order.promotion_id;
                        discountItemPromotion.rate = order.is_promotion_discount_percent ? order.order_promotion_discount_value : 0;
                        discountItemPromotion.value = !order.is_promotion_discount_percent ? order.order_promotion_discount_value : 0
                        discountItemPromotion.reason = null;
                        discountItems.push(discountItemPromotion);
                    }
                    return discountItems;
                }

                PosOrder.prototype.getDiscountItemsLineItem = function (index) {
                    var discountItems = [];
                    var order = this.initTabActive();

                    if (order.order_line_items[index] != undefined && order.order_line_items[index] != null
                        && order.order_line_items[index].item_index != null && order.order_line_items[index].item_index != undefined) {
                        var orderItem = order.order_line_items[index];

                        if (orderItem.is_apply_loyalty_discount) {
                            var discountItemLoyalty = {};
                            discountItemLoyalty.source = Sapo.Const.DiscountSource.CUSTOMER_LOYALTY;
                            discountItemLoyalty.position = 1;
                            discountItemLoyalty.rate = 100;
                            discountItemLoyalty.value = 0;
                            discountItemLoyalty.reason = null;
                            discountItems.push(discountItemLoyalty);
                        }

                        if (orderItem.is_apply_normal_discount && orderItem.normal_discount_line_item > 0) {
                            var discountItemNormal = {};
                            discountItemNormal.source = Sapo.Const.DiscountSource.MANUAL;
                            discountItemNormal.position = 0;
                            discountItemNormal.rate = orderItem.is_normal_discount_percent ? orderItem.normal_discount_line_item : 0;
                            discountItemNormal.value = !orderItem.is_normal_discount_percent ? orderItem.normal_discount_line_item : 0
                            discountItemNormal.reason = orderItem.discount_reason;
                            discountItems.push(discountItemNormal);
                        }

                        if (orderItem.is_apply_customer_discount) {
                            var discountItemCustomer = {};
                            discountItemCustomer.source = Sapo.Const.DiscountSource.CUSTOMER_DEFAULT;
                            discountItemCustomer.position = 1;
                            discountItemCustomer.rate = orderItem.customer_discount_line_item_rate;
                            discountItemCustomer.value = 0;
                            discountItemCustomer.reason = null;
                            discountItems.push(discountItemCustomer);
                        }

                        if (orderItem.is_apply_promotion_discount && orderItem.order_promotion_discount_value > 0) {
                            var discountItemPromotion = {};
                            discountItemPromotion.source = Sapo.Const.DiscountSource.PROMOTION_PROGRAM;
                            discountItemPromotion.position = orderItem.promotion_id;
                            discountItemPromotion.rate = orderItem.is_promotion_discount_percent ? orderItem.order_promotion_discount_value : 0;
                            discountItemPromotion.value = !orderItem.is_promotion_discount_percent ? orderItem.order_promotion_discount_value : 0
                            discountItemPromotion.reason = null;
                            discountItems.push(discountItemPromotion);
                        }

                    }

                    return discountItems;

                }


                PosOrder.prototype.buildDraftOrder = function (financialStatus, isDisableAction) {
                    if (!$("#formPos").valid()) {
                        $("#disabled-action").css("z-index", "0");
                        $("#disabled-action").hide();
                        return;
                    }

                    if (isDisableAction == undefined || isDisableAction == true) {
                        $("#disabled-action").css("z-index", "999999");
                        $("#disabled-action").show();

                    }

                    var that = this;
                    var checkPaymentPoint = true;
                    var pointPayment = 0;
                    var order = this.initTabActive();
                    if (order.code == "") {
                        Sapo.Flash.error("Vui lòng điền mã hóa đơn vào đơn hàng!");
                        $("#disabled-action").css("z-index", "0");
                        $("#disabled-action").hide()
                        return
                    }

                    var draftOrder = {};

                    if (order.tax_check == 0) {
                        draftOrder.taxTreatment = "exclusive";
                    }
                    else {
                        draftOrder.taxTreatment = "inclusive";
                    }
                    if (order.tagso == "" || order.tagso == null) {
                        draftOrder.tags = [];
                    }
                    else
                        draftOrder.tags = order.tagso.split(",");
                    draftOrder.assigneeId = order.assignee_id;
                    draftOrder.customerId = order.customer_id;
                    draftOrder.contactId = order.contact_id;
                    draftOrder.billingAddress = order.billing_address;
                    draftOrder.shippingAddress = order.shipping_address;
                    draftOrder.email = order.email;
                    draftOrder.phoneNumber = order.phone_number;
                    draftOrder.referenceNumber = order.reference_number;
                    draftOrder.currencyId = order.currency_id;
                    draftOrder.priceListId = order.price_list_id;
                    draftOrder.shipOn = order.ship_on;
                    draftOrder.locationId = order.location_id;
                    draftOrder.sourceId = order.source_id;
                    if (order.issued_on != null && !moment(order.issued_on, "YYYY-MM-DD HH:mm:ss").isValid()) {
                        Sapo.Flash.error("Ngày mua chưa định dạng đúng!");
                        $("#disabled-action").css("z-index", "0");
                        $("#disabled-action").hide()
                        return
                    }
                    draftOrder.issuedOn = order.issued_on;
                    draftOrder.code = order.code;
                    draftOrder.note = order.note;
                    draftOrder.status = order.status;

                    that.ApplyDiscountLoyalty();
                    if (order.is_apply_loyalty_discount) {
                        draftOrder.metafields = [
                            {
                                metaKey: "apply_discount_order",
                                value: "active",
                                namespace: "loyalty_customer"
                            }
                        ]
                    }

                    draftOrder.orderDiscountRate = order.is_discount_percent ? order.order_discount_value : 0;
                    draftOrder.orderDiscountValue = order.is_discount_percent ? 0 : order.order_discount_value;
                    draftOrder.discountReason = order.discount_reason;

                    draftOrder.discountItems = this.getDiscountItemsOrder();
                    draftOrder.promotionItems = order.promotionItems;
                    draftOrder.orderLineItems = [];
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null && order.order_line_items[i].item_index != null && order.order_line_items[i].item_index != undefined) {
                                    var line_item = order.order_line_items[i];
                                    var lineItem = {};
                                    order.order_line_items[i].line_amount = that.totalMoneyOrderDetail(i);
                                    if (parseFloat(order.order_line_items[i].line_amount) < 0) {
                                        Sapo.Flash.error("Tiền hàng không được âm!");
                                        $("#disabled-action").css("z-index", "0");
                                        $("#disabled-action").hide()
                                        return
                                    }
                                    order.order_line_items[i].total_discount = that.discountRerateItem(i);
                                    lineItem.quantity = parseFloat(line_item.quantity);
                                    if (lineItem.quantity <= 0) {
                                        Sapo.Flash.error("Số lượng hàng hóa không được phép nhỏ hơn hoặc bằng 0!");
                                        $("#disabled-action").css("z-index", "0");
                                        $("#disabled-action").hide()
                                        return
                                    }
                                    lineItem.variantId = line_item.variant_id;
                                    lineItem.productId = line_item.product_id;
                                    lineItem.id = line_item.id;
                                    lineItem.taxTypeId = line_item.tax_type_id;
                                    lineItem.taxRateOverride = line_item.tax_rate_override == undefined ? 0 : line_item.tax_rate_override;
                                    lineItem.discountRate = line_item.is_discount_percent ? this.getDiscountValue(i) : 0;
                                    lineItem.discountValue = line_item.is_discount_percent ? 0 : this.getDiscountValue(i);
                                    lineItem.discountReason = line_item.discount_reason;

                                    lineItem.discountItems = this.getDiscountItemsLineItem(i);

                                    lineItem.promotionItems = line_item.promotionItems;
                                    lineItem.composite = line_item.composite;
                                    if (line_item.product_type == "serial") {
                                        let quantitySerial = 0;
                                        if (line_item.serials != undefined)
                                            quantitySerial = line_item.serials.length;
                                        if (quantitySerial > lineItem.quantity) {
                                            Sapo.Flash.error("Số lượng serial đang lớn hơn số lượng sản phẩm!");
                                            $("#disabled-action").css("z-index", "0");
                                            $("#disabled-action").hide();
                                            return
                                        }
                                        if (quantitySerial < lineItem.quantity) {
                                            Sapo.Flash.error("Số lượng sản phẩm " + line_item.name + " đang lớn hơn số lượng serial!");
                                            $("#disabled-action").css("z-index", "0");
                                            $("#disabled-action").hide();
                                            $("#input-serial-" + line_item.item_index).focus();
                                            return
                                        }
                                        lineItem.serials = line_item.serials;
                                    }

                                    lineItem.note = line_item.note;
                                    lineItem.price = line_item.price;
                                    lineItem.isFreeform = (line_item.is_freeform == undefined || line_item.is_freeform == false) ? false : true;
                                    lineItem.isForLoyalty = line_item.isForLoyalty;
                                    lineItem.metafields = line_item.metafields;
                                    lineItem.categoryId = line_item.category_id;
                                    lineItem.brandId = line_item.brand_id;
                                    //
                                    order.order_line_items[i].discount_items = lineItem.discountItems;

                                    draftOrder.orderLineItems.push(lineItem);
                                }
                            }
                        }
                        else {
                            Sapo.Flash.error("Vui lòng chọn sản phẩm vào đơn hàng!");
                            $("#disabled-action").css("z-index", "0");
                            $("#disabled-action").hide();
                            return
                        }
                    }
                    else {
                        Sapo.Flash.error("Vui lòng chọn sản phẩm vào đơn hàng!");
                        $("#disabled-action").css("z-index", "0");
                        $("#disabled-action").hide();
                        return
                    }
                    if (order.payments != null && order.payments != undefined) {
                        var checkType = false;
                        var checkCreate = true;
                        order.payments.forEach(function (pay) {
                            if (pay.type != "cash") {
                                checkType = true;
                                return;
                            }
                        })
                        draftOrder.payments = [];
                        var totalMoney = 0;
                        var totalMoneyReturnAmout = Math.round(that.totalMoneyReturnAmout());
                        for (var p = 0; p < order.payments.length; p++) {
                            var payment = {};

                            if (p != order.payments.length - 1) {
                                if ((totalMoney + order.payments[p].amount) >= totalMoneyReturnAmout) {
                                    payment.amount = totalMoneyReturnAmout - totalMoney;
                                    payment.paidAmount = order.payments[p].amount;
                                    payment.returnedAmount = payment.paidAmount - payment.amount;
                                } else {
                                    payment.amount = order.payments[p].amount;
                                    payment.paidAmount = order.payments[p].amount;
                                    payment.returnedAmount = 0;
                                }
                            }
                            else {
                                if (that.loadMoneyReturn() - totalMoneyReturnAmout > 0) {
                                    payment.returnedAmount = that.loadMoneyReturn() - totalMoneyReturnAmout;
                                    payment.amount = order.payments[p].amount - payment.returnedAmount;
                                    payment.paidAmount = order.payments[p].amount;
                                }
                                else {
                                    payment.amount = order.payments[p].amount;
                                    payment.paidAmount = order.payments[p].amount;
                                    payment.returnedAmount = 0;
                                }
                            }
                            payment.paymentMethodId = order.payments[p].id;
                            payment.taxTypeId = order.tax_type_id;
                            payment.currencyId = order.currency_id;
                            payment.paidOn = null;
                            if (order.payments[p].type == "point") {
                                pointPayment += order.payments[p].amount;
                            }

                            if (payment.amount > 0) {
                                draftOrder.payments.push(payment);
                            }
                            totalMoney += payment.amount;

                            if (checkType && payment.returnedAmount > 0) {
                                checkCreate = false;
                            }
                        }
                        if (!checkCreate) {
                            Sapo.Flash.error("Thanh toán vượt quá số tiền cần phải trả!");
                            $("#disabled-action").css("z-index", "0");
                            $("#disabled-action").hide();
                            return
                        }
                    }

                    this.lineitemVat();

                    draftOrder.pointPayment = pointPayment;

                    order.offlineMoneyReturn = that.totalExcessMoney(true);
                    order.payment_customer = that.loadMoneyReturn();
                    order.total_amount = that.totalMoneyReturnAmout();
                    order.total = that.totalMoneyItem();
                    order.totalVat = that.totalVat();
                    order.discount_items = draftOrder.discountItems;
                    draftOrder.prepayments = draftOrder.payments;
                    return draftOrder;
                }

                PosOrder.prototype.createDraftOrder = function (financialStatus) {
                    var that = this;
                    var order = this.initTabActive();
                    console.log(order);
                    //var draftOrder = this.buildDraftOrder(financialStatus);
                    //if (draftOrder == undefined || draftOrder == null) return
                    //that.checkCreate = true;

                    //if (order.promotion_id != null && order.promotion_id != undefined && order.promotion_id > 0) {
                    //    var redemption = {};
                    //    if (financialStatus == "paid") {
                    //        redemption.status = "active";
                    //    } else {
                    //        redemption.status = "draft";
                    //    }
                    //    redemption.autoRollback = true;
                    //    redemption.confirmTimeoutInsecond = 500;
                    //    redemption.beginAmount = 0;
                    //    redemption.promotionId = order.promotion_id;
                    //    redemption.items = [];
                    //    if (order.condition_items != null && order.condition_items != undefined && order.condition_items.length > 0) {
                    //        order.condition_items.forEach(function (condition_item, indexCondition) {
                    //            if (condition_item != null) {
                    //                var itemRedem = {};
                    //                itemRedem.promotionConditionItemId = condition_item.id
                    //                itemRedem.quantity = condition_item.quantity;
                    //                var beginAmountCondition = 0;
                    //                condition_item.sub_line_item_selects.forEach(function (subLine, indexSubLine) {
                    //                    if (subLine != null && subLine != undefined) {
                    //                        beginAmountCondition += subLine.price * subLine.quantityAdd
                    //                    }
                    //                })
                    //                itemRedem.beginAmount = beginAmountCondition;
                    //                itemRedem.discountAmount = beginAmountCondition;
                    //                redemption.beginAmount += itemRedem.beginAmount;
                    //                redemption.items.push(itemRedem);
                    //            }
                    //        })
                    //    }
                    //    if (order.promotion_discounts != null && order.promotion_discounts != undefined) {
                    //        order.promotion_discounts.forEach(function (promotion_discount, indexDiscount) {
                    //            var itemRedem = {};
                    //            itemRedem.promotionConditionItemId = promotion_discount.condition_id;
                    //            itemRedem.quantity = promotion_discount.quantity;
                    //            itemRedem.beginAmount = parseFloat(promotion_discount.beginAmount.toFixed(0));
                    //            itemRedem.discountAmount = parseFloat(promotion_discount.discountAmount.toFixed(0));
                    //            redemption.beginAmount = redemption.beginAmount + itemRedem.beginAmount;

                    //            redemption.items.push(itemRedem);
                    //        })
                    //    }
                    //    $.ajax({
                    //        type: 'POST',
                    //        url: "/admin/orders/CreateRedemption",
                    //        contentType: "application/json; charset=utf-8",
                    //        data: JSON.stringify(redemption),
                    //        dataType: "json",
                    //        processData: false,
                    //        global: false,
                    //        success: function (result) {
                    //            draftOrder.promotionRedemptionId = result.id;
                    //            draftOrder.promotionName = order.promotion_name;
                    //            draftOrder.tags.push(order.promotion_code)
                    //            if (order.order_line_item_gifts != null && order.order_line_item_gifts != undefined) {
                    //                order.order_line_item_gifts.forEach(function (gift, indexGift) {
                    //                    if (gift != null) {
                    //                        var lineItem = {};
                    //                        lineItem.quantity = parseFloat(gift.quantityAdd);
                    //                        lineItem.variantId = gift.object_id;
                    //                        lineItem.productId = gift.product_id;
                    //                        lineItem.price = gift.price;
                    //                        lineItem.isFreeform = false;
                    //                        lineItem.composite = false;
                    //                        var disCountGift = {}
                    //                        disCountGift.source = Sapo.Const.DiscountSource.PROMOTION_PROGRAM
                    //                        disCountGift.rate = 100;
                    //                        disCountGift.value = 0;
                    //                        lineItem.discountItems = [];
                    //                        lineItem.discountItems.push(disCountGift);
                    //                        draftOrder.orderLineItems.push(lineItem);
                    //                    }
                    //                })
                    //            }
                    //            that.PostOrder(draftOrder, order, that);
                    //        },
                    //        error: function (data) {
                    //            if (data.status == 403) {
                    //                var your_object = JSON.parse(data.responseText);
                    //                var massage = null;
                    //                if (your_object.error != undefined && your_object.error != null)
                    //                    massage = your_object.error.replace(/\n/g, '; ').replace(/; $/, '');
                    //                NProgress.done();
                    //                Sapo.Utility.handleForbiddenRequest(false, massage);
                    //                $(".button-cancel").removeClass("disabled").html("Hủy");
                    //                $(".button_finalize").removeClass("disabled").html("Đặt hàng và duyệt (F2)");
                    //                $(".button_draft").removeClass("disabled").html("Đặt hàng (F1)");
                    //                order.saving = false;
                    //                return;
                    //            }
                    //            Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|\|"|"/g, ''));
                    //            $(".button-cancel").removeClass("disabled").html("Hủy");
                    //            $(".button_finalize").removeClass("disabled").html("Đặt hàng và duyệt (F2)");
                    //            $(".button_draft").removeClass("disabled").html("Đặt hàng (F1)");
                    //            order.saving = false;
                    //            that.checkCreate = false;
                    //        }
                    //    });
                    //}
                    //else {
                    //    that.PostOrder(draftOrder, order, that)
                    //}
                }
                PosOrder.prototype.PostOrder = function (draftOrder, order, that) {
                    if (order.current_loyalty_customer == undefined ||
                        order.current_loyalty_customer == null ||
                        order.current_loyalty_customer.ratio_point_loyalty == undefined ||
                        order.current_loyalty_customer.ratio_point_loyalty == null ||
                        draftOrder.pointPayment == 0 ||
                        order.current_loyalty_customer.ratio_point_loyalty * that.SetPoint() >= draftOrder.pointPayment) {
                        Sapo.WaitingSubmit();
                        if (order.edit_order == true) {
                            draftOrder.id = order.id;
                            draftOrder.locationIdOld = order.location_id;
                            $.ajax({
                                type: 'POST',
                                url: ajaxUrls.editPos,
                                contentType: "application/json; charset=utf-8",
                                data: JSON.stringify(draftOrder),
                                dataType: "json",
                                processData: false,
                                global: false,
                                success: function (result) {

                                    if (result.error != null) {
                                        Sapo.Flash.error(result.error);
                                        return;
                                    }
                                    var orderId = result.id;
                                    if (!order.print_order) {
                                        Sapo.Flash.notice("Sửa đơn hàng thành công");

                                    }

                                    that.deleteActiveOrder(result, order, that);
                                    that.setIndexOrders();
                                    that.setTabOrderActive();
                                    Sapo.Submit();
                                    if (order.account.guide_status != null && order.account.guide_status != undefined && order.account.guide_status != "" && order.account.guide_status.indexOf("pos") >= 0) {

                                    } else {
                                        var intro = introJs();
                                        intro.exit();
                                        that.updateGuideStatus("pos");
                                        that.ShowSuccess();

                                    }
                                    order.code = result.code;
                                    if (order.print_order) {
                                        that.openPrintForm(order, orderId, result.created_on, result.modified_on, result.issued_on, result.ship_on);

                                    }
                                    window.focus();
                                    $(document.activeElement).blur();
                                    $("#disabled-action").css("z-index", "0");
                                    $("#disabled-action").hide();
                                },
                                error: function (data) {
                                    if (data.status == 403) {
                                        NProgress.done();
                                        Sapo.Utility.handleForbiddenRequest(false);
                                        $("#disabled-action").css("z-index", "0");
                                        $("#disabled-action").hide();
                                        return;
                                    }
                                    if (data.status == 422) {
                                        Sapo.Flash.error(jQuery.parseJSON("").error);
                                        NProgress.done();
                                    }
                                    Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|\|"|"/g, ''));
                                    Sapo.Submit();
                                    $("#disabled-action").css("z-index", "0");
                                    $("#disabled-action").hide();
                                },
                                complete: function () {
                                    that.inactivePromotionTab();
                                }
                            });
                        }
                        else {
                            $.ajax({
                                type: 'POST',
                                url: ajaxUrls.createPos,
                                contentType: "application/json; charset=utf-8",
                                data: JSON.stringify(draftOrder),
                                dataType: "json",
                                processData: false,
                                global: false,
                                success: function (result) {
                                    if (result.error != null) {
                                        Sapo.Flash.error(result.error);
                                        that.checkCreate = false;
                                        return;
                                    }
                                    order.code = result.code;
                                    order.created_on = result.created_on;
                                    order.modified_on = result.modified_on;
                                    order.issued_on = result.issued_on;
                                    order.ship_on = result.ship_on;

                                    var tabActive = that.initTabActive();
                                    tabActive.id = result.id;

                                    var prepaymentZaloPayId = 0;
                                    var amountZaloPay = 0;
                                    var prepaymentVnPayId = 0;
                                    var amountVnPay = 0;

                                    if (result.prepayments != null && result.prepayments != undefined && result.prepayments.length > 0) {
                                        $.each(result.prepayments, function (i, prepayment) {
                                            if (order.zalo_pay_payment_method_id > 0 && prepayment.payment_method_id == order.zalo_pay_payment_method_id) {
                                                prepaymentZaloPayId = prepayment.id;
                                                amountZaloPay = prepayment.amount;
                                                order.prepayment_provider = "ZaloPay";
                                            } else if (order.vnpay_payment_method_id > 0 && prepayment.payment_method_id == order.vnpay_payment_method_id) {
                                                prepaymentVnPayId = prepayment.id;
                                                amountVnPay = prepayment.amount;
                                                order.prepayment_provider = "VNpay";
                                            }
                                        });
                                    }

                                    if (prepaymentZaloPayId > 0) {
                                        Sapo.Submit();
                                        $("#disabled-action").css("z-index", "0");
                                        $("#disabled-action").hide();
                                        tabActive.order_result = order
                                        $(".filter-tab-active").addClass("" + result.id + "")
                                        //$("#payment-waiting").show();
                                        //$(".filter-tab-active .img-loading").show()
                                        $("#disabled-action").css("z-index", "0");
                                        $("#disabled-action").hide();
                                        tabActive.zalo_pay_status = "waiting";
                                        that.paymentZaloWaiting.show();
                                        var htmlTitle = 'Chờ thanh toán qua Zalopay cho đơn hàng <a target="_blank" href="/admin/orders/' + result.id + '">' + result.code + '</a>';
                                        $(".modal-zalo-waiting .body-waiting .body-header div").html(htmlTitle);
                                        $(".modal-zalo-waiting input[name='OrderId']").val(result.id);
                                        $(".modal-zalo-waiting input[name='PrepaymentId']").val(prepaymentZaloPayId);
                                        $(".modal-zalo-waiting input[name='OrderCode']").val(result.code);
                                        $(".modal-zalo-waiting input[name='OrderAmount']").val(amountZaloPay);
                                        $(".modal-zalo-waiting input[name='OrderAmountTxt']").val(money(parseFloat(amountZaloPay), ",", ".", 0, ""));
                                        datadropdownItemN($(".select-payment-methods"));
                                        that.getQrCodeZaloPay();
                                        that.checkCreate = false;

                                    }
                                    else if (prepaymentVnPayId > 0) {
                                        Sapo.Submit();
                                        $("#disabled-action").css("z-index", "0");
                                        $("#disabled-action").hide();
                                        tabActive.order_result = order;
                                        $(".filter-tab-active").addClass("" + result.id + "");
                                        $("#disabled-action").css("z-index", "0");
                                        $("#disabled-action").hide();
                                        tabActive.vnpay_status = "waiting";
                                        that.paymentVnPayWaiting.show();
                                        var htmlTitle = 'Chờ thanh toán qua VnPay cho đơn hàng <a target="_blank" href="/admin/orders/' + result.id + '">' + result.code + '</a>';
                                        $(".modal-vnpay-waiting .body-waiting .body-header div").html(htmlTitle);
                                        $(".modal-vnpay-waiting input[name='OrderId']").val(result.id);
                                        $(".modal-vnpay-waiting input[name='PrepaymentId']").val(prepaymentVnPayId);
                                        $(".modal-vnpay-waiting input[name='OrderCode']").val(result.code);
                                        $(".modal-vnpay-waiting input[name='OrderAmount']").val(amountVnPay);
                                        $(".modal-vnpay-waiting input[name='OrderAmountTxt']").val(money(parseFloat(amountVnPay), ",", ".", 0, ""));
                                        datadropdownItemN($(".select-payment-methods"));
                                        that.getQrCodeVnPay();
                                        that.checkCreate = false;

                                    }
                                    else {
                                        that.completeCreateOrder(order, that)
                                    }
                                },
                                error: function (data) {

                                    if (data.status == 403) {
                                        NProgress.done();
                                        Sapo.Utility.handleForbiddenRequest(false);
                                        return;
                                    }
                                    if (data.status == 422) {
                                        Sapo.Flash.error(jQuery.parseJSON(data.responseText).error);
                                        NProgress.done();
                                    }
                                    Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|\|"|"/g, ''));
                                    Sapo.Submit();
                                    that.checkCreate = false;

                                },
                                complete: function () {
                                    that.inactivePromotionTab();

                                }
                            });
                        }

                    }
                    else {
                        Sapo.Flash.error("Số điểm thanh toán đã vượt quá số điểm hiện tại");
                        $("#disabled-action").css("z-index", "0");
                        $("#disabled-action").hide();
                        that.checkCreate = false;
                    }
                }

                PosOrder.prototype.completeCreateOrder = function (order, that) {
                    var orderId = order.id;
                    if (!order.print_order) {
                        Sapo.Flash.notice("Tạo đơn hàng thành công");
                    }
                    that.deleteActiveOrder();
                    that.setIndexOrders();
                    that.setTabOrderActive();
                    Sapo.Submit();
                    if (order.account.guide_status != null && order.account.guide_status != undefined && order.account.guide_status != "" && order.account.guide_status.indexOf("pos") >= 0) {

                    } else {
                        var intro = introJs();
                        intro.exit();
                        that.updateGuideStatus("pos");
                        that.ShowSuccess();
                    }

                    if (order.print_order) {
                        if (order.order_line_item_gifts != null && order.order_line_item_gifts != undefined) {
                            order.order_line_item_gifts.forEach(function (gift, indexGift) {
                                if (gift != null) {
                                    //gift de in don
                                    var lineGift = {};
                                    lineGift.variant_id = gift.object_id;
                                    lineGift.product_id = gift.product_id;
                                    lineGift.sku = gift.variant_sku;
                                    lineGift.price = gift.price;
                                    lineGift.product_name = gift.object_name;
                                    lineGift.variant_name = gift.object_name;
                                    lineGift.tax_type_id = null;
                                    lineGift.tax_included = false;
                                    lineGift.tax_rate_override = null;
                                    lineGift.tax_rate = 0.;
                                    lineGift.tax_amount = 0;

                                    lineGift.discount_rate = 100;
                                    lineGift.discount_value = 0;
                                    lineGift.discount_reason = null;
                                    lineGift.discount_amount = gift.price;
                                    lineGift.quantity = gift.quantityAdd;

                                    lineGift.is_freeform = false;
                                    lineGift.is_composite = false;
                                    lineGift.line_amount = "0";
                                    var disCountGift = {}
                                    disCountGift.source = Sapo.Const.DiscountSource.PROMOTION_PROGRAM
                                    disCountGift.rate = 100;
                                    disCountGift.value = 0;
                                    lineGift.discount_items = [];
                                    lineGift.discount_items.push(disCountGift);
                                    order.order_line_items.push(lineGift);
                                }
                            })
                        }
                        that.checkCreate = false;

                        that.openPrintForm(order, orderId, order.created_on, order.modified_on, order.issued_on, order.ship_on);

                    }
                    that.checkCreate = false;

                    window.focus();
                    $(document.activeElement).blur();
                    $("#disabled-action").css("z-index", "0");
                    $("#disabled-action").hide();
                }

                PosOrder.prototype.getQrCodeZaloPay = function () {
                    $(".img-qrcode").hide();
                    $(".img-loading").show();
                    $(".btn-change-payment").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-cancel-order").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-re-print").addClass("disabled").html(Sapo.LOADING);
                    var that = this;
                    var orderId = $(".modal-zalo-waiting input[name='OrderId']").val()
                    var prepaymentId = $(".modal-zalo-waiting input[name='PrepaymentId']").val()
                    var orderCode = $(".modal-zalo-waiting input[name='OrderCode']").val()
                    var amount = $(".modal-zalo-waiting input[name='OrderAmount']").val()
                    $.ajax({
                        type: 'POST',
                        url: ajaxUrls.zaloPayGetQrCode,
                        data: { orderId: orderId, prepaymentId: prepaymentId },
                        dataType: "json",
                        success: function (result) {
                            if (result != null && result != undefined &&
                                result.base64_data != null && result.base64_data != undefined &&
                                result.base64_data != "") {
                                amount = money(parseFloat(amount), ",", ".", 0, "");
                                //append img vao popup cho thanh toan
                                //var htmlImg = "<img class='img-qrcode' src='" + result.base64_data + "'/>";
                                $(".modal-zalo-waiting .modal-body .img-qrcode").attr("src", result.base64_data);
                                $(".img-qrcode").show();
                                $(".img-loading").hide();
                                if (that.initTabActive().print_order == true) {
                                    that.printQrCode(result.base64_data, orderCode, amount, "ZaloPay");
                                }
                            }
                            //$("#payment-waiting").show();
                            //$(".search-input-pos").attr("disabled", "disabled")
                            //Sapo.Submit();
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                NProgress.done();
                                Sapo.Utility.handleForbiddenRequest(false);
                                $("#disabled-action").css("z-index", "0");
                                $("#disabled-action").hide();
                                return;
                            }
                            if (data.status == 422) {
                                Sapo.Flash.error(jQuery.parseJSON(data.responseText).error);
                                NProgress.done();
                            }
                            Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|\|"|"/g, ''));

                        },
                        complete: function () {
                            $(".btn-change-payment").removeClass("disabled").html("Thanh toán bằng hình thức khác");
                            $(".btn-cancel-order").removeClass("disabled").html("Hủy đơn hàng");
                            $(".btn-re-print").removeClass("disabled").html("In lại mã");
                        }
                    });
                }

                PosOrder.prototype.changePaymentZaloPay = function () {
                    var that = this;
                    $(".btn-change-payment").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-cancel-order").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-re-print").addClass("disabled").html(Sapo.LOADING);
                    var orderId = $(".modal-zalo-waiting input[name='OrderId']").val();
                    var prepaymentId = $(".modal-zalo-waiting input[name='PrepaymentId']").val();
                    var orderCode = $(".modal-zalo-waiting input[name='OrderCode']").val();

                    var htmlTitle = 'Thanh toán cho đơn hàng <a target="_blank" href="/admin/orders/' + orderId + '">' + orderCode + '</a>'
                    $(".modal-zalo-waiting .body-change-payment .body-header div").html(htmlTitle);
                    $.ajax({
                        type: 'POST',
                        url: ajaxUrls.cancelPrePayment,
                        data: { orderId: orderId, prepaymentId: prepaymentId },
                        dataType: "json",
                        success: function (result) {
                            $(".modal-zalo-waiting .body-change-payment").show();
                            $(".modal-zalo-waiting .body-waiting").hide();
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                NProgress.done();
                                Sapo.Utility.handleForbiddenRequest(false);
                                return;
                            }
                            if (data.status == 422) {
                                Sapo.Flash.error(jQuery.parseJSON(data.responseText).error);
                                NProgress.done();
                            }
                            Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|\|"|"/g, ''));

                        },
                        complete: function () {
                            $(".btn-change-payment").removeClass("disabled").html("Thanh toán bằng hình thức khác");
                            $(".btn-cancel-order").removeClass("disabled").html("Hủy đơn hàng");
                            $(".btn-re-print").removeClass("disabled").html("In lại mã");
                        }
                    });
                }

                PosOrder.prototype.createPayment = function () {
                    $(".btn-cancel-order--other").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-create-payment").addClass("disabled").html(Sapo.LOADING);
                    var that = this;
                    var orderId = $(".modal-zalo-waiting input[name='OrderId']").val()
                    var prepaymentId = $(".modal-zalo-waiting input[name='PrepaymentId']").val();
                    var amount = $(".modal-zalo-waiting input[name='OrderAmount']").val();
                    var payment = {};
                    var order = this.initTabActive();
                    payment.orderId = orderId;
                    payment.amount = amount;
                    payment.paidAmount = amount;
                    payment.ReturnedAmount = 0;
                    payment.paymentMethodId = that.change_payment_id;
                    payment.locationId = order.location_id;
                    $.ajax({
                        type: 'POST',
                        url: ajaxUrls.createPayment,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(payment),
                        dataType: "json",
                        success: function (result) {
                            that.ShipOrderZaloPay(orderId);
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                NProgress.done();
                                Sapo.Utility.handleForbiddenRequest(false);
                                return;
                            }
                            if (data.status == 422) {
                                Sapo.Flash.error(jQuery.parseJSON(data.responseText).error);
                                NProgress.done();
                            }
                            Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|\|"|"/g, ''));
                        }, complete: function () {
                            $(".btn-cancel-order--other").removeClass("disabled").html("Hủy đơn hàng");
                            $(".btn-create-payment").removeClass("disabled").html("Thanh toán và xuất kho");
                        }
                    });
                }

                PosOrder.prototype.showCancelOrderZalo = function () {
                    var orderId = $(".modal-zalo-waiting input[name='OrderId']").val();
                    var orderCode = $(".modal-zalo-waiting input[name='OrderCode']").val();

                    var htmlTitle = 'Hủy đơn hàng <a target="_blank" href="/admin/orders/' + orderId + '">' + orderCode + '</a>'
                    $(".modal-zalo-waiting .body-cancel-order .body-header div").html(htmlTitle);

                    $(".modal-zalo-waiting .body-change-payment").hide();
                    $(".modal-zalo-waiting .body-waiting").hide();
                    $(".modal-zalo-waiting .body-cancel-order").show();
                    datadropdownItemN($("#reasonOrder"));
                }

                PosOrder.prototype.cancelOrderZalo = function () {

                    var that = this;
                    var orderId = $(".modal-zalo-waiting input[name='OrderId']").val();
                    var reasonId = $("#reasonOrder").val() == undefined ? null : $("#reasonOrder").val();
                    if (reasonId != null && reasonId == 0) {
                        Sapo.Flash.error("Lý do không được để trống !");
                        return
                    }
                    $(".btn-cancel-order").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-exit-order").addClass("disabled").html(Sapo.LOADING);
                    NProgress.start();
                    $.ajax({
                        type: "POST",
                        url: ajaxUrls.cancelOrder,
                        data: {
                            orderId: orderId,
                            reasonId: reasonId
                        },
                        dataType: "json",
                        success: function (response) {
                            Sapo.Flash.notice("Hủy đơn hàng thành công!");
                            NProgress.done();
                            Sapo.NewModal.hide();
                            that.deleteActiveOrder();
                            that.setIndexOrders();
                            that.setTabOrderActive();
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                Sapo.Utility.handleForbiddenRequest(false);
                                return;
                            }
                            Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|"/g, ''));
                            NProgress.done();
                        },
                        complete: function () {
                            $(".btn-cancel-order").removeClass("disabled").html("Hủy đơn hàng");
                            $(".btn-exit-order").removeClass("disabled").html("Thoát");
                        }
                    });
                }

                PosOrder.prototype.getQrCodeVnPay = function () {
                    $(".img-qrcode").hide();
                    $(".img-loading").show();
                    $(".btn-change-payment").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-cancel-order").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-re-print").addClass("disabled").html(Sapo.LOADING);
                    var that = this;
                    var orderId = $(".modal-vnpay-waiting input[name='OrderId']").val()
                    var prepaymentId = $(".modal-vnpay-waiting input[name='PrepaymentId']").val()
                    var orderCode = $(".modal-vnpay-waiting input[name='OrderCode']").val()
                    var amount = $(".modal-vnpay-waiting input[name='OrderAmount']").val()
                    $.ajax({
                        type: 'POST',
                        url: ajaxUrls.vnPayGetQrCode,
                        data: { orderId: orderId, prepaymentId: prepaymentId },
                        dataType: "json",
                        success: function (result) {
                            if (result != null && result != undefined &&
                                result.base64_data != null && result.base64_data != undefined &&
                                result.base64_data != "") {
                                amount = money(parseFloat(amount), ",", ".", 0, "");
                                $(".modal-vnpay-waiting .modal-body .img-qrcode").attr("src", result.base64_data);
                                $(".img-qrcode").show();
                                $(".img-loading").hide();
                                if (that.initTabActive().print_order == true) {
                                    that.printQrCode(result.base64_data, orderCode, amount, "VNpay");
                                }
                            }
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                NProgress.done();
                                Sapo.Utility.handleForbiddenRequest(false);
                                $("#disabled-action").css("z-index", "0");
                                $("#disabled-action").hide();
                                return;
                            }
                            if (data.status == 422) {
                                Sapo.Flash.error(jQuery.parseJSON(data.responseText).error);
                                NProgress.done();
                            }
                            Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|\|"|"/g, ''));

                        },
                        complete: function () {
                            $(".btn-change-payment").removeClass("disabled").html("Thanh toán bằng hình thức khác");
                            $(".btn-cancel-order").removeClass("disabled").html("Hủy đơn hàng");
                            $(".btn-re-print").removeClass("disabled").html("In lại mã");
                        }
                    });
                }

                PosOrder.prototype.changePaymentVnPay = function () {
                    var that = this;
                    $(".btn-change-payment").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-cancel-order").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-re-print").addClass("disabled").html(Sapo.LOADING);
                    var orderId = $(".modal-vnpay-waiting input[name='OrderId']").val();
                    var prepaymentId = $(".modal-vnpay-waiting input[name='PrepaymentId']").val();
                    var orderCode = $(".modal-vnpay-waiting input[name='OrderCode']").val();

                    var htmlTitle = 'Thanh toán cho đơn hàng <a target="_blank" href="/admin/orders/' + orderId + '">' + orderCode + '</a>'
                    $(".modal-vnpay-waiting .body-change-payment .body-header div").html(htmlTitle);
                    $.ajax({
                        type: 'POST',
                        url: ajaxUrls.cancelPrePayment,
                        data: { orderId: orderId, prepaymentId: prepaymentId },
                        dataType: "json",
                        success: function (result) {
                            $(".modal-vnpay-waiting .body-change-payment").show();
                            $(".modal-vnpay-waiting .body-waiting").hide();
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                NProgress.done();
                                Sapo.Utility.handleForbiddenRequest(false);
                                return;
                            }
                            if (data.status == 422) {
                                Sapo.Flash.error(jQuery.parseJSON(data.responseText).error);
                                NProgress.done();
                            }
                            Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|\|"|"/g, ''));

                        },
                        complete: function () {
                            $(".btn-change-payment").removeClass("disabled").html("Thanh toán bằng hình thức khác");
                            $(".btn-cancel-order").removeClass("disabled").html("Hủy đơn hàng");
                            $(".btn-re-print").removeClass("disabled").html("In lại mã");
                        }
                    });
                }

                PosOrder.prototype.createPaymentVnPay = function () {
                    $(".btn-cancel-order--other").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-create-payment").addClass("disabled").html(Sapo.LOADING);
                    var that = this;
                    var orderId = $(".modal-vnpay-waiting input[name='OrderId']").val()
                    var prepaymentId = $(".modal-vnpay-waiting input[name='PrepaymentId']").val();
                    var amount = $(".modal-vnpay-waiting input[name='OrderAmount']").val();
                    var payment = {};
                    var order = this.initTabActive();
                    payment.orderId = orderId;
                    payment.amount = amount;
                    payment.paidAmount = amount;
                    payment.ReturnedAmount = 0;
                    payment.paymentMethodId = that.change_payment_id;
                    payment.locationId = order.location_id;
                    $.ajax({
                        type: 'POST',
                        url: ajaxUrls.createPayment,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(payment),
                        dataType: "json",
                        success: function (result) {
                            that.ShipOrderZaloPay(orderId);
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                NProgress.done();
                                Sapo.Utility.handleForbiddenRequest(false);
                                return;
                            }
                            if (data.status == 422) {
                                Sapo.Flash.error(jQuery.parseJSON(data.responseText).error);
                                NProgress.done();
                            }
                            Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|\|"|"/g, ''));
                        }, complete: function () {
                            $(".btn-cancel-order--other").removeClass("disabled").html("Hủy đơn hàng");
                            $(".btn-create-payment").removeClass("disabled").html("Thanh toán và xuất kho");
                        }
                    });
                }

                PosOrder.prototype.showCancelOrderVnPay = function () {
                    var orderId = $(".modal-vnpay-waiting input[name='OrderId']").val();
                    var orderCode = $(".modal-vnpay-waiting input[name='OrderCode']").val();

                    var htmlTitle = 'Hủy đơn hàng <a target="_blank" href="/admin/orders/' + orderId + '">' + orderCode + '</a>'
                    $(".modal-vnpay-waiting .body-cancel-order .body-header div").html(htmlTitle);

                    $(".modal-vnpay-waiting .body-change-payment").hide();
                    $(".modal-vnpay-waiting .body-waiting").hide();
                    $(".modal-vnpay-waiting .body-cancel-order").show();
                    datadropdownItemN($("#reasonOrder"));
                }

                PosOrder.prototype.cancelOrderVnPay = function () {
                    var that = this;
                    var orderId = $(".modal-vnpay-waiting input[name='OrderId']").val();
                    var reasonId = $("#reasonOrder").val() == undefined ? null : $("#reasonOrder").val();
                    if (reasonId != null && reasonId == 0) {
                        Sapo.Flash.error("Lý do không được để trống !");
                        return
                    }
                    $(".btn-cancel-order").addClass("disabled").html(Sapo.LOADING);
                    $(".btn-exit-order").addClass("disabled").html(Sapo.LOADING);
                    NProgress.start();
                    $.ajax({
                        type: "POST",
                        url: ajaxUrls.cancelOrder,
                        data: {
                            orderId: orderId,
                            reasonId: reasonId
                        },
                        dataType: "json",
                        success: function (response) {
                            Sapo.Flash.notice("Hủy đơn hàng thành công!");
                            NProgress.done();
                            Sapo.NewModal.hide();
                            that.deleteActiveOrder();
                            that.setIndexOrders();
                            that.setTabOrderActive();
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                Sapo.Utility.handleForbiddenRequest(false);
                                return;
                            }
                            Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|"/g, ''));
                            NProgress.done();
                        },
                        complete: function () {
                            $(".btn-cancel-order").removeClass("disabled").html("Hủy đơn hàng");
                            $(".btn-exit-order").removeClass("disabled").html("Thoát");
                        }
                    });
                }

                PosOrder.prototype.exitOrder = function () {
                    this.deleteActiveOrder();
                    this.setIndexOrders();
                    this.setTabOrderActive();
                    Sapo.NewModal.hide();
                }

                function formatAMPM(date) { // This is to display 12 hour format like you asked
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    var strTime = hours + ':' + minutes + ' ' + ampm;
                    return strTime;
                }

                PosOrder.prototype.printQrCode = function (base64_data, orderCode, amount, provider) {
                    var myDate = new Date();
                    var month = parseFloat(myDate.getMonth()) + 1;
                    var year = myDate.getFullYear();
                    var today = formatAMPM(myDate) + ' ' + myDate.getDate() + '/' + month + '/' + year;
                    var img = "<img style='width: 100%;max-width:150px' src='" + base64_data + "'/>"
                    var html =
                        '<div style="width: 100 %;font-family: tahoma;text-align: center;font-size: 11px;max-width:300px">' + img +
                        '<p style="margin: 0;">Số tiền cần thanh toán</p>' +
                        '<p style="border-bottom: 1px #cccccc dashed;font-size: 21px;font-weight: 500; margin: 0 0 12px;padding: 5px 0 8px;">' + amount + '</p>' +
                        '<div style="width: 100%;float: left;margin-bottom: 5px;">' +
                        '<div style="float: left;">Thanh toán</div > ' +
                        '<div style="float: right;">' + provider + '</div > ' +
                        '</div > ' +
                        '<div style="width: 100%;float: left;margin-bottom: 5px;">' +
                        '<div style="float: left;">Đơn hàng</div > ' +
                        '<div style="float: right;">' + orderCode + '</div > ' +
                        '</div > ' +
                        '<div style="width: 100%;float: left;margin-bottom: 7px;">' +
                        '<div style="float: left;">Giờ in</div > ' +
                        '<div style="float: right;">' + today + '</div > ' +
                        '</div > ' +
                        '<i style="font-size: 10px;">Bạn có <b>5:00</b> phút để thanh toán!</i>'
                    '</div>'
                    html = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                        '<html xmlns="http://www.w3.org/1999/xhtml">' +
                        '<head><meta charset="utf-8" /></head><body>' + html + '</body></html>';
                    var frame = $('#popup');
                    $("#popup").attr('name', 'popup');
                    $('#popup').contents().find('body').html(html);
                    var iframe = document.getElementById("popup").contentWindow;
                    iframe.focus();
                    setTimeout(function () { iframe.print(); }, 500);
                }

                //PosOrder.prototype.getQrCodeZaloPay = function (orderId, prepaymentId, orderCode, amount) {
                //    amount = money(parseFloat(amount), ",", ".", 0, "");
                //    var link = ajaxUrls.printQrCode + '?orderId=' + orderId + '&prepaymentId=' + prepaymentId + '&orderCode=' + orderCode + '&amount=' + amount;
                //    window.open(link, '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=1,status=0');
                //}

                PosOrder.prototype.showMessageZaloPay = function (message, session) {
                    let event = message.event;
                    let amount = message.data.prepayment.amount
                    let orderId = message.data.order_id
                    let orderCode = message.data.order_code
                    let prepaymentId = message.data.prepayment.id
                    let paidOn = message.data.prepayment.paid_on
                    let provider = "";

                    var htmlPrefix = "<div style='font-size: 15px;line-height: 1.8;'> Đơn hàng <b>" + orderCode + "</b> đã được thanh toán qua ";
                    var htmlSuffix = " </br>Số tiền thanh toán <span style='font-size:20px;font-weight:500'>" + money(parseFloat(amount), ",", ".", 0, "") + " VND</span></div>";

                    for (var i = 0; i < that.orders.length; i++) {
                        var order = that.orders[i];
                        if (order != null && order != undefined && order.id == orderId) {
                            if (order.prepayment_provider === "VNpay") {
                                order.vnpay_status = "success";
                            } else if (order.prepayment_provider === "ZaloPay") {
                                order.zalo_pay_status = "success";
                            }
                            order.zalo_pay_html = htmlPrefix + (!!order.prepayment_provider ? order.prepayment_provider : "") + htmlSuffix;
                            $(".filter-tab-item." + orderId + " .img-loading").hide();
                            if (order.tab_active == true) {
                                $("#payment-waiting").hide();
                                $(".search-input-pos").removeAttr("disabled")
                                this.paymentZaloSuccess.show();
                                $("#zalo-orderId").val(orderId);
                                $(".modal-zalo-success .modal-body").append(order.zalo_pay_html);
                            }
                        }
                    }
                }

                PosOrder.prototype.ShipOrderZaloPay = function (orderId) {
                    var that = this;
                    var tabActive = that.initTabActive();
                    if (orderId == undefined) {
                        orderId = $('.modal-zalo-success input#zalo-orderId').val();
                    }
                    $(".btn-ship-zalopay").addClass("disabled").html(Sapo.LOADING);
                    $.ajax({
                        url: ajaxUrls.updateFulFill,
                        type: "POST",
                        data: { orderId: orderId },
                        success: function (data) {
                            if (data.id > 0) {
                                Sapo.Flash.notice("Thanh toán và xuất kho thành công!");
                                Sapo.NewModal.hide();
                            }
                            else {
                                Sapo.NewModal.hide();
                                that.alertModal.show();
                                $(".alert-modal .modal-body").html("Có lỗi xảy ra")
                            }

                        },
                        error: function (data) {
                            if (data.status == 403) {
                                NProgress.done();
                                Sapo.Utility.handleForbiddenRequest(false); return;
                            }
                            Sapo.NewModal.hide();
                            that.alertModal.show();
                            $(".alert-modal .modal-body").html(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|"/g, '').replace("/\/", " "))
                            NProgress.done();
                        },
                        complete: function () {
                            that.deleteActiveOrder();
                            that.setIndexOrders();
                            that.setTabOrderActive();
                            if (tabActive.print_order) {
                                that.PrintAfterShip(tabActive.order_result)
                            }
                            $(".btn-ship-zalopay").removeClass("disabled").html("Xuất hàng");
                        }
                    });
                }

                PosOrder.prototype.PrintAfterShip = function (order) {
                    if (order.order_line_item_gifts != null && order.order_line_item_gifts != undefined) {
                        order.order_line_item_gifts.forEach(function (gift, indexGift) {
                            if (gift != null) {
                                //gift de in don
                                var lineGift = {};
                                lineGift.variant_id = gift.object_id;
                                lineGift.product_id = gift.product_id;
                                lineGift.sku = gift.variant_sku;
                                lineGift.price = gift.price;
                                lineGift.product_name = gift.object_name;
                                lineGift.variant_name = gift.object_name;
                                lineGift.tax_type_id = null;
                                lineGift.tax_included = false;
                                lineGift.tax_rate_override = null;
                                lineGift.tax_rate = 0.;
                                lineGift.tax_amount = 0;

                                lineGift.discount_rate = 100;
                                lineGift.discount_value = 0;
                                lineGift.discount_reason = null;
                                lineGift.discount_amount = gift.price;
                                lineGift.quantity = gift.quantityAdd;

                                lineGift.is_freeform = false;
                                lineGift.is_composite = false;
                                lineGift.line_amount = "0";
                                var disCountGift = {}
                                disCountGift.source = Sapo.Const.DiscountSource.PROMOTION_PROGRAM
                                disCountGift.rate = 100;
                                disCountGift.value = 0;
                                lineGift.discount_items = [];
                                lineGift.discount_items.push(disCountGift);
                                order.order_line_items.push(lineGift);
                            }
                        })
                    }

                    that.openPrintForm(order, order.id, order.created_on, order.modified_on, order.issued_on, order.ship_on);
                    window.focus();
                    $(document.activeElement).blur();
                    $("#disabled-action").css("z-index", "0");
                    $("#disabled-action").hide();
                }
                PosOrder.prototype.ShowSuccess = function (urlLoad) {

                    var that = this;
                    that.successOrderPopup.show();
                    $('.success-order').parent().on('hide.bs.modal', function () {
                        window.location.href = window.location.href;
                    })
                }
                PosOrder.prototype.ReturnPaymentRequireFilling = function (payments) {
                    if (this.totalMoneyReturnAmout() > 0) {
                        if (this.order.tenant_setting.payment_require_filling) {
                            if (payments == undefined || payments == null ||
                                payments.length == 0) {
                                return true;
                            } else {
                                var totalPaymentCheck = 0;
                                for (var i = 0; i < payments.length; i++) {
                                    totalPaymentCheck += payments[i].amount;
                                }
                                if (totalPaymentCheck == 0) {
                                    return true
                                }
                            }
                        }
                    }
                    return false;
                }


                PosOrder.prototype.splitStringToDDMMYYY = function (str) {
                    var splitted = str.split("/");
                    splittedN = splitted[2].split(" ");
                    return splitted[0] + "-" + splitted[1] + "-" + splittedN[0];
                }
                PosOrder.prototype.splitStringToHHmmss = function (str) {
                    var splitted = str.split(":");
                    splittedN = splitted[0].split(" ");
                    return splittedN[1] + ":" + splitted[1] + ":" + splitted[2];
                }

                PosOrder.prototype.allowChangePrice = function () {
                    var order = this.initTabActive();
                    if (order.tenant_setting != null) {
                        if (order.tenant_setting.allowed_change_price == "online" || order.tenant_setting.allowed_change_price == "online_discount" || order.tenant_setting.allowed_change_price == "all_discount" || order.tenant_setting.allowed_change_price == "none_all" || order.tenant_setting.allowed_change_price == "pos_discount") {
                            return true;
                        }
                    }
                    return false
                }
                PosOrder.prototype.allowChangeDiscount = function () {
                    var order = this.initTabActive();
                    if (order.tenant_setting != null) {
                        if (order.tenant_setting.allowed_change_price == "online" || order.tenant_setting.allowed_change_price == "online_discount" || order.tenant_setting.allowed_change_price == "none_pos" || order.tenant_setting.allowed_change_price == "none_all") {
                            return true;
                        }
                    }
                    return false
                }
                PosOrder.prototype.GetTime = function (value) {
                    var date = new Date(value);
                    var hour = (date.getHours() < 10 ? '0' + (date.getHours()) : (date.getHours()));
                    var minutes = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : (date.getMinutes()));
                    var seconds = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : (date.getSeconds()));
                    var times = hour + ":" + minutes + ":" + seconds;
                    return times;
                }
                PosOrder.prototype.openPrintForm = function (order, orderId, created_on, modified_on, issued_on, ship_on) {
                    var that = this;
                    var print_form = "";
                    var size = "";
                    var new_order = {};
                    //store
                    $('#popup').contents().find('body').empty();
                    order.currency.symbol = "";
                    if (order.print_form != null) {
                        print_form = order.print_form.content;
                        size = order.print_form.size;
                    }

                    var new_print_form = print_form.split('<style type="text/css">');
                    print_form = new_print_form[0];
                    if (new_print_form[1] != undefined) {
                        new_print_form = new_print_form[1];
                        new_print_form = new_print_form.split('</style>');
                        new_print_form = new_print_form[0];
                    }
                    else {
                        new_print_form = '';
                    }

                    print_form = print_form.replace("{store_logo}", "<img src='{store_logo}'style='max-width:100%;'/>");
                    print_form = print_form.replace("{line_image}", "<img src='{line_image}'style='max-width:100%;'/>");

                    if (order.store != null) {
                        new_order.store_logo = order.store.image_url;
                        new_order.store_name = order.store.name;
                        new_order.store_address = order.store.address1;
                        new_order.store_phone_number = order.store.phone_no;
                        new_order.store_email = order.store.email;
                        new_order.store_province = order.store.city;
                        new_order.store_country = order.store.country;
                        new_order.store_fax = order.store.fax;
                        //new_order.order = order.store.code;
                    }
                    if (order.location != null) {
                        new_order.location_name = order.location.label;
                        new_order.location_address = order.location.address1;
                        new_order.location_province = order.location.city;
                        new_order.location_country = order.location.country;
                    }
                    new_order.expected_payment_method = "";
                    new_order.expected_delivery_type = "";
                    new_order.channel = "POS";
                    JsBarcode('#order-bar-code', order.code, { width: 1, height: 40, displayValue: false });
                    var imgBarCode = $('#bar-code').html();
                    print_form = print_form.replace("{bar_code(code)}", imgBarCode);
                    JsBarcode('#reference-img', order.reference_number, { width: 1, height: 40, displayValue: false });
                    var imgBarCode1 = $('#barcode-reference').html();
                    print_form = print_form.replace("{bar_code(reference_number)}", imgBarCode1);
                    print_form = print_form.replace("{source}", "POS");
                    jQuery(function () {
                        if (size == "k57" || size == "k80") {
                            $('#order-qr-code').qrcode({
                                width: 100,
                                height: 100,
                                text: order.code
                            });
                        } else {
                            $('#order-qr-code').qrcode({
                                width: 150,
                                height: 150,
                                text: order.code
                            });
                        }
                        var canvas = $('#order-qr-code canvas');
                        var imgQrCode = canvas.get(0).toDataURL("image/png");
                        print_form = print_form.replace("{order_qr_code}", '<img src="' + imgQrCode + '" style="max-width:100%; max-height: 100%"/>');
                    });


                    //order
                    new_order.order_code = order.code;
                    new_order.created_on = that.splitStringToDDMMYYY(Sapo.forMatDatePicker(new Date(created_on)));
                    new_order.modified_on = that.splitStringToDDMMYYY(Sapo.forMatDatePicker(new Date(modified_on)));
                    new_order.issued_on = that.splitStringToDDMMYYY(Sapo.forMatDatePicker(new Date(issued_on)));
                    new_order.ship_on = that.splitStringToDDMMYYY(Sapo.forMatDatePicker(new Date(ship_on)));

                    new_order.created_on_time = this.GetTime(created_on);
                    new_order.modified_on_time = this.GetTime(modified_on);
                    new_order.issued_on_time = this.GetTime(issued_on);
                    new_order.ship_on_time = this.GetTime(ship_on);
                    new_order.account_name = order.account.full_name;

                    //for (var i = 0; i < order.accounts.length; i++) {
                    //    if (order.accounts[i].id == order.assignee_id)
                    //        new_order.assignee_name = order.accounts[i].full_name;
                    //}
                    new_order.assignee_name = order.assignee_name;
                    // KM
                    new_order.promotion_name = order.promotion_name != undefined ? order.promotion_name : "";
                    new_order.promotion_type = order.promotion_type != undefined ? order.promotion_type : "";
                    //var promotionDiscount = "";
                    //var check = false;
                    //if (order.discount_items != undefined && order.discount_items.length > 0) {
                    //    for (var i = 0; i < order.discount_items.length; i++) {
                    //        if (order.discount_items[i] != null && order.discount_items[i].source != undefined && order.discount_items[i].source == "promotion_program") {
                    //            promotionDiscount = order.discount_items[i].rate != 0 ? (order.discount_items[i].rate + "%") : order.discount_items[i].value;
                    //            break;
                    //        }
                    //    }
                    //}
                    //else {
                    //    for (var i = 0; i < order.order_line_items.length; i++) {
                    //        if (order.order_line_items[i] != null && order.order_line_items[i].discount_items != undefined && order.order_line_items[i].discount_items.length > 0) {
                    //            for (var j = 0; j < order.order_line_items[i].discount_items.length; j++) {
                    //                if (order.order_line_items[i].discount_items[j].source != undefined && order.order_line_items[i].discount_items[j].source == "promotion_program") {
                    //                    promotionDiscount = order.order_line_items[i].discount_items[j].rate != 0 ? (order.order_line_items[i].discount_items[j].rate + "%") : order.order_line_items[i].discount_items[i].value;
                    //                    check = true;
                    //                    break;
                    //                }
                    //            }
                    //            if (check) {
                    //                break;
                    //            }
                    //        }
                    //    }
                    //}
                    //new_order.promotion_discount = promotionDiscount;
                    if (order.customer.id != 0) {
                        var debtCurrent = parseFloat(order.total_amount - order.payment_customer);
                        if (debtCurrent <= 0) {
                            debtCurrent = 0;
                        }
                        new_order.customer_name = order.customer.name;
                        new_order.customer_code = (order.customer.code == null || order.customer.code == undefined) ? "" : order.customer.code;
                        new_order.customer_debt_prev = (order.customer.debt == null || order.customer.debt == undefined) ? 0 : money(order.customer.debt, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        if (order.customer.debt == null || order.customer.debt == undefined) {
                            if (order.customer.debt >= 0) {
                                new_order.customer_debt_prev_text = that.moneyToText(money(order.customer.debt, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol));
                            }
                            else {
                                var debtPrevAbs = Math.abs(order.customer.debt);
                                new_order.customer_debt_prev_text = "Âm" + that.moneyToText(money(debtAbs, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol));
                            }
                        }
                        else {
                            new_order.customer_debt_prev_text = "";
                        }
                        var customer_debt = (order.customer.debt == null || order.customer.debt == undefined) ? debtCurrent : (order.customer.debt + debtCurrent);
                        new_order.customer_debt = money(customer_debt, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                        if (customer_debt >= 0) {
                            new_order.customer_debt_text = that.moneyToText(new_order.customer_debt);
                        }
                        else {
                            var debtAbs = Math.abs(customer_debt);
                            new_order.customer_debt_text = "Âm" + that.moneyToText(money(debtAbs, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol));
                        }
                        new_order.customer_contact = (order.customer.contact == null || order.customer.contact == undefined) ? "" : order.customer.contact;
                        new_order.customer_email = (order.customer.email == null || order.customer.email == undefined) ? "" : order.customer.email;
                        new_order.customer_phone_number = (order.customer.phone_number == null || order.customer.phone_number == undefined) ? "" : order.customer.phone_number;
                        if (order.customer.addresses != null) {
                            if (order.customer.addresses.length != 0) {
                                new_order.billing_address = order.customer.addresses[0].address1;
                                new_order.shipping_address = order.customer.addresses[0].address1;
                                if (order.customer.addresses[0].district != null && order.customer.addresses[0].district != undefined)
                                    new_order.shipping_address += " " + order.customer.addresses[0].district;
                                if (order.customer.addresses[0].city != null && order.customer.addresses[0].city != undefined)
                                    new_order.shipping_address += " " + order.customer.addresses[0].city;
                            }
                        }
                        var currentdate = new Date().toISOString();
                        new_order.customer_card = "";
                        new_order.customer_point = "";
                        if (order.current_loyalty_customer != null && order.current_loyalty_customer != undefined) {
                            if (order.current_loyalty_customer.loyalty_card_id > 0
                                && order.current_loyalty_customer.loyalty_card.status == "active"
                                && order.current_loyalty_customer.started_on != null
                                && order.current_loyalty_customer.ended_on != null
                                && Date.parse(order.current_loyalty_customer.started_on) < Date.parse(currentdate)
                                && Date.parse(currentdate) < Date.parse(order.current_loyalty_customer.ended_on)
                            ) {
                                new_order.customer_card = order.current_loyalty_customer.loyalty_card.name;
                            }
                            new_order.customer_point = order.current_loyalty_customer.point;
                        }
                    }
                    else {
                        new_order.customer_name = "Khách lẻ";
                    }
                    new_order.reference = order.reference_number;

                    if (order.currency != null)
                        new_order.currency_name = order.currency.name;
                    new_order.price_list_name = order.price_list_name;
                    if (order.tax_check == 0)
                        new_order.tax_treatment = "Giá chưa bao gồm thuế";
                    else
                        new_order.tax_treatment = "Giá đã bao gồm thuế";

                    new_order.total_discount = money(order.totalDiscount, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    var discountOrder = 0;
                    for (var i = 0; i < order.discount_items.length; i++) {
                        if (order.discount_items[i] != null) {
                            discountOrder += parseFloat((order.discount_items[i].rate * order.total) / 100 + order.discount_items[i].value);
                        }
                    }
                    new_order.order_discount = money(discountOrder, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    if (order.payments != null) {
                        for (var i = 0; i < order.payments.length; i++) {
                            if (order.payments[i] != null) {
                                if (i === 0) {
                                    new_order.payment_name = order.payments[i].name;
                                }
                                else
                                    new_order.payment_name += ", " + order.payments[i].name;
                            }
                        }
                    }
                    new_order.payment_status = "";
                    //lineitem
                    new_order.line_items = [];
                    var totalQuatity = 0;
                    var totaldiscountlineitem = 0;
                    var checkindex = 0;
                    var totalNoneDiscount = 0;
                    for (var i = 0; i < order.order_line_items.length; i++) {
                        if (order.order_line_items[i] != null) {
                            var lineItem = {};
                            var item = order.order_line_items[i];
                            lineItem.line_stt = i + 1 - checkindex;
                            if (item.is_freeform == true) {
                                lineItem.line_product_name = item.note;
                                lineItem.line_variant = item.note;
                                lineItem.line_note = "";
                            } else {
                                lineItem.line_product_name = item.product_name;
                                lineItem.line_variant = (item.name != undefined && item.name != null) ? item.name : item.variant_name;
                                lineItem.line_note = item.note;
                            }
                            lineItem.line_variant_code = item.sku;

                            lineItem.line_unit = item.unit;
                            lineItem.line_tax = item.line_tax;
                            lineItem.line_tax_rate = item.tax_rate_override;
                            lineItem.line_tax_amount = money(item.vatamount, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            lineItem.line_variant_options = item.opt1;
                            if (item.opt2 != null) {
                                if (item.opt3 != null)
                                    lineItem.line_variant_options += "-" + item.opt2 + "-" + item.opt3;
                                else
                                    lineItem.line_variant_options += "-" + item.opt2;
                            }
                            if (item.images != null && item.images.length > 0) {
                                lineItem.line_image = item.images[0].full_path;
                            }
                            lineItem.line_category = "";
                            lineItem.line_brand = "";
                            if (order.categories != null && order.categories != undefined && order.categories.length > 0) {
                                for (var j = 0; j < order.categories.length; j++) {
                                    if (order.categories[j].id == item.category_id) {
                                        lineItem.line_category = order.categories[j].name;
                                        break;
                                    }
                                }
                            }
                            if (order.brands != null && order.brands != undefined && order.brands.length > 0) {
                                for (var j = 0; j < order.brands.length; j++) {
                                    if (order.brands[j].id == item.brand_id) {
                                        lineItem.line_brand = order.brands[j].name;
                                        break;
                                    }
                                }
                            }
                            lineItem.line_price = money(item.price, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            lineItem.line_quantity = item.quantity;
                            lineItem.total_line_item_discount = money(item.discountAmount, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            lineItem.serials = (item.serials != null && item.serials != undefined) ? item.serials.join(', ') : "";
                            totalQuatity += parseFloat(item.quantity);

                            lineItem.line_discount_rate = 0;
                            lineItem.line_discount_value = 0;
                            lineItem.line_discount_amount = 0;
                            if (item.discount_items != undefined && item.discount_items != null && item.discount_items.length > 0) {
                                for (var indexDiscountItem = 0; indexDiscountItem < item.discount_items.length; indexDiscountItem++) {
                                    var discountItem = item.discount_items[indexDiscountItem];
                                    if (discountItem != null) {
                                        lineItem.line_discount_rate += discountItem.rate;
                                        lineItem.line_discount_value += discountItem.value;
                                        lineItem.line_discount_amount += (discountItem.rate * item.price) / 100 + discountItem.value;

                                    }
                                }
                            }

                            var lineDiscountValue = Math.round(lineItem.line_discount_value);
                            lineItem.line_discount_value = money(lineDiscountValue, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);

                            var lineDiscountAmount = Math.round((lineItem.line_discount_rate * item.price) / 100 + lineDiscountValue);
                            lineItem.line_discount_amount = money(lineDiscountAmount, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);

                            totaldiscountlineitem += lineDiscountAmount * lineItem.line_quantity;

                            //if (item.is_discount_percent == true) {
                            //    lineItem.line_discount_rate = item.discount_value;
                            //    lineItem.line_discount_amount = money(((item.discount_value * item.price) / 100), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);;
                            //    totaldiscountlineitem += (item.discount_value * item.price) / 100;
                            //}
                            //else {
                            //    lineItem.line_discount_amount = money(item.discount_value, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            //    totaldiscountlineitem += item.discount_value;
                            //    lineItem.line_discount_rate = 0;
                            //}

                            var line_amount_none_discount = item.price * item.quantity;
                            lineItem.line_price_after_discount = money((item.price - lineDiscountAmount), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            lineItem.line_amount = item.line_amount.replace(order.currency.symbol, "");
                            lineItem.line_promotion_or_loyalty = "";
                            if (item.discount_items != null) {
                                for (var j = 0; j < item.discount_items.length; j++) {
                                    if (item.discount_items[j].source == Sapo.Const.DiscountSource.CUSTOMER_LOYALTY) {
                                        lineItem.line_promotion_or_loyalty = "Hàng tích điểm";
                                        break;
                                    }
                                    else if (item.discount_items[j].source == Sapo.Const.DiscountSource.PROMOTION_PROGRAM) {
                                        lineItem.line_promotion_or_loyalty = "Hàng khuyến mại";
                                        break;
                                    }
                                }
                            }
                            totalNoneDiscount += line_amount_none_discount;
                            lineItem.line_amount_none_discount = money(line_amount_none_discount, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            var price = item.price;
                            if (order.tax_check == 0) {
                                price = item.price * (100 + parseFloat(item.tax_rate_override)) / 100;
                            }
                            lineItem.line_tax_included = money(price, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            new_order.line_items.push(lineItem);
                        }
                        else {
                            checkindex += 1;
                        }
                    }
                    //total

                    new_order.total_quantity = totalQuatity;
                    new_order.total_amount = money(order.total_amount, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    new_order.payment_customer = money(order.payment_customer, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    new_order.money_return = money(order.offlineMoneyReturn, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    new_order.total = money(order.total, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    new_order.total_text = that.moneyToText(new_order.total_amount);
                    new_order.delivery_fee = "0";
                    new_order.order_note = order.note;
                    new_order.total_tax = money(order.totalVat, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    new_order.total_none_discount = money(totalNoneDiscount, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    new_order.order_discount_rate = 0;
                    new_order.order_discount_value = 0;
                    new_order.promotion_code = (order.promotion_code != undefined && order.promotion_code != null) ? order.promotion_code : "";
                    if (order.discount_items != undefined && order.discount_items != null && order.discount_items.length > 0) {
                        for (var indexDiscountItemOrder = 0; indexDiscountItemOrder < order.discount_items.length; indexDiscountItemOrder++) {
                            var discountItem = order.discount_items[indexDiscountItemOrder];
                            if (discountItem != null) {
                                new_order.order_discount_rate += discountItem.rate;
                                new_order.order_discount_value += discountItem.value;
                                totaldiscountlineitem += parseFloat((discountItem.rate * order.total) / 100) + parseFloat(discountItem.value);
                            }
                        }
                    }
                    var orderDiscountValue = Math.round(new_order.order_discount_value);
                    new_order.order_discount_value = money(orderDiscountValue, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);

                    //if (order.is_discount_percent != true) {
                    //    totaldiscountlineitem += order.order_discount_value;
                    //    new_order.order_discount_rate = 0;
                    //    new_order.order_discount_value = money(order.order_discount_value, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    //}
                    //else {
                    //    new_order.order_discount_rate = order.order_discount_value;
                    //    new_order.order_discount_value = 0;
                    //    totaldiscountlineitem += (order.order_discount_value * order.total) / 100;
                    //}
                    totaldiscountlineitem = Math.round(totaldiscountlineitem);
                    new_order.total_discount = money(totaldiscountlineitem, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);

                    if (order.total_amount <= order.payment_customer) {
                        new_order.payment_status = "Thanh toán toàn bộ";
                        new_order.order_status = "Hoàn thành";
                        new_order.fulfillment_status = "Xuất kho toàn bộ";
                        new_order.packed_status = "Đóng gói toàn bộ";
                        new_order.return_status = "Chưa trả hàng";
                    } else if (order.total_amount > order.payment_customer && order.payment_customer != 0) {
                        new_order.payment_status = "Thanh toán một phần";
                        new_order.order_status = "Đang giao dịch";
                        new_order.fulfillment_status = "Xuất kho toàn bộ";
                        new_order.packed_status = "Đóng gói toàn bộ";
                        new_order.return_status = "Chưa trả hàng";
                    }
                    else {
                        new_order.order_status = "Đang giao dịch";
                        new_order.fulfillment_status = "Xuất kho toàn bộ";
                        new_order.packed_status = "Đóng gói toàn bộ";
                        new_order.return_status = "Chưa trả hàng";
                        new_order.payment_status = "Chưa thanh toán";
                    }
                    if (order.payment_customer > order.total_amount)
                        new_order.total_remain = 0;
                    else
                        new_order.total_remain = money((order.total_amount - order.payment_customer), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    print_form = print_form.replace("<!--<#assign lines = model.orderLineItems>--><!--<#list lines as line>-->", "{#line_items}");
                    print_form = print_form.replace("<!--</#list>-->", "{/line_items}");
                    print_form = print_form.replace(/{/g, "{{");
                    print_form = print_form.replace(/}/g, "}}");
                    print_form = '{{#new_order}}' + print_form + '{{/new_order}}';
                    print_form = print_form.replace(/amp;/g, "")
                    //print_form = print_form + new_print_form;
                    print_form = print_form + '<style>' + new_print_form + '</style> ' + '<style type="text/css" media="print">' +

                        'html,body{' +
                        'height:98%' +
                        ' }' +
                        ' </style>';
                    var html = "";
                    var htmlResult = Mustache.render(print_form, { "new_order": new_order });
                    var multiplePrint = order.tenant_setting.multiple_print;
                    if (multiplePrint != undefined && multiplePrint != 0) {
                        for (var i = 0; i < multiplePrint; i++) {
                            html += htmlResult;
                        }
                    }
                    else
                        html = htmlResult;
                    html = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                        '<html xmlns="http://www.w3.org/1999/xhtml">' +
                        '<head><meta charset="utf-8" /></head><body>' + html + '</body></html>';
                    //var myWindow = window.open('/admin/orders/print_forms/?id=' + orderId + '&locationId=' + new_order.location_id, 'name', 'height=500,width=550');
                    //             window.open("about:blank", "newwin")

                    //             //,'', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=1,status=0'
                    //    myWindow.document.write(html);

                    //    $(myWindow).ready(function () {
                    //        setTimeout(function () { myWindow.print(); myWindow.close(); }, 500);
                    //    myWindow.focus();
                    //});

                    var frame = $('#popup');
                    frame.load(function () {
                        frame.contents().find('body').css('font-family', 'My Custom Font');
                    });
                    $("#popup").attr('name', 'popup');
                    $("#popup").css('font-size', '16px');
                    $("#popup").css('font-family', 'My Custom Font');
                    $('#popup').contents().find('body').append(html);
                    var iframe = document.getElementById("popup").contentWindow;
                    iframe.focus();
                    setTimeout(function () { iframe.print(); }, 500);
                    //$('#popup').contents().find('body').empty();
                    //$("#popup").show();
                    //$"("#printform").append(html);
                    //$("#printform1").printPage();
                    //$("#printform").jqprint();
                    //Sapo.NewModal.hide();




                }
                PosOrder.prototype.moneyToText = function (money) {
                    var that = this;
                    var strResult = "";
                    if (money == null) {
                        return strResult;
                    }
                    else {
                        var number = money.toString("{0:N0}");
                        var number1 = number.substring(number.length - 3, number.length);
                        var arrNumber;
                        if (number1 == ".00" || number1 == ",00") {
                            number = number.substring(0, number.length - 3);
                        }
                        if (number.length > 3) {
                            var symbol = number.substring(number.length - 4, number.length - 3);
                            if (symbol == ",")
                                arrNumber = number.split(',');
                            else arrNumber = number.split('.');
                        }
                        else {
                            arrNumber = number.split(',');
                        }
                        switch (arrNumber.length) {
                            case 1:
                                strResult += that.ChangeNumberToText(arrNumber[0]);
                                break;
                            case 2:
                                strResult += that.ChangeNumberToText(arrNumber[0]) + " nghìn, ";
                                if (arrNumber[1] != "000") {
                                    strResult += that.ChangeNumberToText(arrNumber[1]);
                                }
                                break;
                            case 3:
                                strResult += that.ChangeNumberToText(arrNumber[0]) + " triệu, ";
                                if (arrNumber[1] != "000") {
                                    strResult += that.ChangeNumberToText(arrNumber[1]) + " nghìn, ";
                                }
                                if (arrNumber[2] != "000") {
                                    strResult += that.ChangeNumberToText(arrNumber[2]);
                                }
                                break;
                            case 4:
                                strResult += that.ChangeNumberToText(arrNumber[0]) + " tỷ, ";
                                if (arrNumber[1] != "000") {
                                    strResult += that.ChangeNumberToText(arrNumber[1]) + " triệu, ";
                                }
                                if (arrNumber[2] != "000") {
                                    strResult += that.ChangeNumberToText(arrNumber[2]) + " nghìn, ";
                                }
                                if (arrNumber[3] != "000") {
                                    strResult += that.ChangeNumberToText(arrNumber[3]);
                                }
                                break;

                        }
                        if (strResult[strResult.length - 2] == ",") {
                            strResult = strResult.substring(0, strResult.length - 2);
                        }
                        var firstChar = strResult.substring(0, 1);
                        firstChar = firstChar.toUpperCase();
                        var tail = strResult.substring(1);
                        strResult = firstChar + tail;
                        return strResult;

                    }
                }
                PosOrder.prototype.ChangeNumberToText = function (number) {
                    var arrNumber = number.split('');
                    var that = this;
                    switch (arrNumber.length) {
                        case 3:
                            return that.ThreeNumberToText(parseInt(arrNumber[0].toString()), parseInt(arrNumber[1].toString()), parseInt(arrNumber[2].toString()));
                        case 2:
                            return that.TwoNumberToText(parseInt(arrNumber[0].toString()), parseInt(arrNumber[1].toString()));
                        case 1:
                            return that.OneNumberToText(parseInt(arrNumber[0].toString()));
                        default:
                            return null;
                    }
                }
                PosOrder.prototype.OneNumberToText = function (number) {
                    switch (number) {
                        case 0:
                            return "không";
                        case 1:
                            return "một";
                        case 2:
                            return "hai";
                        case 3:
                            return "ba";
                        case 4:
                            return "bốn";
                        case 5:
                            return "năm";
                        case 6:
                            return "sáu";
                        case 7:
                            return "bảy";
                        case 8:
                            return "tám";
                        case 9:
                            return "chín";
                        default:
                            return null;
                    }
                }
                PosOrder.prototype.TwoNumberToText = function (number1, number2) {

                    if (number1 == 0) {
                        return this.OneNumberToText(number2);
                    }

                    if (number1 == 1) {
                        if (number2 == 0) {
                            return "mười";
                        }
                        else if (number2 == 5) {
                            return "mười lăm";
                        }
                        else {
                            return "mười " + this.OneNumberToText(number2);
                        }
                    }
                    else {
                        if (number2 == 0) {
                            return this.OneNumberToText(number1) + " mươi";
                        }
                        else if (number2 == 1) {
                            return this.OneNumberToText(number1) + " mươi mốt";
                        }
                        else if (number2 == 4) {
                            return this.OneNumberToText(number1) + " mươi tư";
                        }
                        else if (number2 == 5) {
                            return this.OneNumberToText(number1) + " mươi lăm";
                        }
                        else {
                            return this.OneNumberToText(number1) + " mươi " + this.OneNumberToText(number2);
                        }
                    }
                }
                PosOrder.prototype.ThreeNumberToText = function (number1, number2, number3) {
                    if (number1 == 0) {
                        return this.TwoNumberToText(number2, number3);
                    }

                    if (number2 == 0) {
                        if (number3 == 0) {
                            return this.OneNumberToText(number1) + " trăm";
                        }
                        else {
                            return this.OneNumberToText(number1) + " trăm linh " + this.OneNumberToText(number3);
                        }
                    }
                    else {
                        return this.OneNumberToText(number1) + " trăm " + this.TwoNumberToText(number2, number3);
                    }
                }
                PosOrder.prototype.openPrintFormoffline = function (order) {
                    var that = this;
                    var print_form = "";
                    //this.showprintform.show();
                    var rq = PrintForm.dao.getAll(
                        function (data) {
                            for (var i = 0; i < data.length; i++)
                                if (data[i].type == "order" && data[i].is_default == true && order.locationId == data[i].location_id)
                                    print_form = data[i].content;
                            var new_print_form = print_form.split('<style type="text/css">');
                            print_form = new_print_form[0];
                            if (new_print_form[1] != undefined) {
                                new_print_form = new_print_form[1];
                                new_print_form = new_print_form.split('</style>');
                                new_print_form = new_print_form[0];
                            }
                            var new_order = {};
                            //store
                            $('#popup').contents().find('body').empty();
                            order.currency.symbol = "";
                            print_form = print_form.replace("{store_logo}", "<img src='{store_logo}'style='max-width:100%;'/>");
                            print_form = print_form.replace("{source}", "POS");
                            new_order.store_logo = order.store.image_url;
                            new_order.store_name = order.store.name;
                            new_order.store_address = order.store.address1;
                            new_order.store_phone_number = order.store.phone_no;
                            new_order.store_email = order.store.email;
                            new_order.store_province = order.store.city;
                            new_order.store_country = order.store.country;
                            new_order.location_name = order.location.label;
                            new_order.location_address = order.location.address1;
                            new_order.location_province = order.location.city;
                            new_order.location_country = order.location.country;
                            //order
                            new_order.order_code = order.code;

                            new_order.created_on = that.splitStringToDDMMYYY(Sapo.forMatDatePicker(new Date()));

                            new_order.modified_on = that.splitStringToDDMMYYY(Sapo.forMatDatePicker(new Date()));


                            new_order.issued_on = that.splitStringToDDMMYYY(Sapo.forMatDatePicker(new Date()));
                            new_order.ship_on = that.splitStringToDDMMYYY(Sapo.forMatDatePicker(order.shipOn));
                            new_order.account_name = order.account_name;
                            new_order.assignee_name = order.assigneeName;
                            //new_order.customer_code = order.customer_code;
                            new_order.customer_code = "";//an ma khach hang offline
                            new_order.customer_name = order.customerName;
                            new_order.customer_debt = order.customer_debt;
                            new_order.customer_contact = order.contact;
                            new_order.customer_email = order.email;
                            new_order.customer_phone_number = order.phoneNumber;
                            new_order.customer_name = order.customerName;
                            if (order.customer != null) {
                                new_order.customer_code = "";//an ma khach hang offline
                                //new_order.customer_code = (order.customer.customer_code == null || order.customer.customer_code == undefined) ? "" : order.customer.customer_code;
                                new_order.customer_debt = (order.customer.customer_debt == null || order.customer.customer_debt == undefined) ? "" : order.customer.customer_debt;
                                new_order.customer_contact = (order.customer.customer_contact == null || order.customer.customer_contact == undefined) ? "" : order.customer.customer_contact;
                                new_order.customer_email = (order.customer.customer_email == null || order.customer.customer_email == undefined) ? "" : order.customer.customer_email;
                                new_order.customer_phone_number = (order.customer.customer_phone_number == null || order.customer.customer_phone_number == undefined) ? "" : order.customer.customer_phone_number;
                            }
                            new_order.expected_payment_method = "";
                            new_order.expected_delivery_type = "";
                            new_order.channel = "POS";
                            new_order.reference = order.referenceNumber;
                            if (order.billingAddress != null && order.billingAddress != undefined)
                                new_order.billing_address = order.billingAddress.address1;
                            else
                                new_order.billing_address = "";

                            if (order.shippingAddress != null && order.shippingAddress != undefined)
                                new_order.shipping_address = order.shippingAddress.address1;
                            else
                                new_order.shipping_address = "";
                            if (order.currency != null)
                                new_order.currency_name = order.currency.name;
                            new_order.price_list_name = order.priceListName;
                            if (order.taxTreatment == "exclusive")
                                new_order.tax_treatment = "Giá chưa bao gồm thuế";
                            else
                                new_order.tax_treatment = "Giá đã bao gồm thuế";

                            new_order.total_discount = order.totalDiscount;
                            //trạng thái này cần hỏi lại là đơn hàng thanh toán xong ở Pos các trạng thái là gì
                            if (order.status == "fulfilled") {
                                new_order.order_status = "Hoàn thành";
                                new_order.fulfillment_status = "Xuất kho toàn bộ";
                                new_order.packed_status = "Đóng gói toàn bộ";
                                new_order.return_status = "Chưa trả hàng";
                            }
                            else
                                if (order.status == "draft") {
                                    new_order.order_status = "Đơn nháp";
                                    new_order.fulfillment_status = "Chưa xuất kho";
                                    new_order.packed_status = "Chưa đóng gói";
                                    new_order.return_status = "Chưa trả hàng";
                                }
                                else {
                                    new_order.order_status = "Đang giao dịch";
                                    new_order.fulfillment_status = "Xuất kho toàn bộ";
                                    new_order.packed_status = "Đóng gói toàn bộ";
                                    new_order.return_status = "Chưa trả hàng";
                                }
                            new_order.payment_status = "";
                            //lineitem
                            new_order.line_items = [];
                            var totalQuatity = 0;
                            var totaldiscount = 0;
                            for (var i = 0; i < order.orderLineItems.length; i++) {
                                var lineItem = {};
                                var item = order.orderLineItems[i];
                                lineItem.line_stt = i + 1;
                                if (item.isFreeform) {
                                    lineItem.line_product_name = item.note;
                                    lineItem.line_variant = item.note;
                                    lineItem.line_note = "";
                                } else {
                                    lineItem.line_product_name = item.productName;
                                    lineItem.line_variant = item.name;
                                    lineItem.line_note = item.note;
                                }
                                lineItem.line_category = item.category != null ? item.category : "";
                                lineItem.line_brand = item.brand != null ? item.brand : "";
                                lineItem.line_image = "";


                                lineItem.line_variant_options = item.allOption;

                                lineItem.line_variant_code = item.sku;
                                lineItem.line_unit = item.unit;
                                lineItem.line_tax = item.taxRateOverride;
                                lineItem.line_tax_rate = item.taxRateOverride;
                                lineItem.line_tax_amount = money(item.vatamount, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                                if (item.discountRate != 0) {
                                    lineItem.line_discount_rate = item.discountRate;
                                    lineItem.line_discount_amount = money(((item.discountRate * item.price) / 100), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                                }
                                else {
                                    lineItem.line_discount_amount = money(item.discountValue, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                                    lineItem.line_discount_rate = item.discountRate;
                                }

                                lineItem.line_price = money(item.price, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                                lineItem.line_quantity = item.quantity;
                                lineItem.total_line_item_discount = money(item.discountAmount, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                                totalQuatity += parseFloat(item.quantity);
                                lineItem.serials = (item.serials != null && item.serials != undefined) ? item.serials.join(', ') : "";

                                if (item.discountRate != 0)
                                    totaldiscount += item.discountRate * item.price;
                                else
                                    totaldiscount += item.discountValue;
                                lineItem.line_amount = item.line_amount;
                                var price = item.price;
                                if (order.tax_check == 0) {
                                    price = item.price * (100 + parseFloat(item.tax_rate_override)) / 100;
                                }
                                lineItem.line_tax_included = money(price, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);

                                new_order.line_items.push(lineItem);
                            }
                            //total
                            if (order.orderDiscountRate != 0)
                                totaldiscount += order.orderDiscountRate * order.offlineTotal / 100;
                            else
                                totaldiscount += order.orderDiscountValue;
                            new_order.total_discount = money(totaldiscount, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            new_order.total_quantity = totalQuatity;
                            new_order.total_amount = money(order.offlineTotalAmount, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            new_order.payment_customer = money(order.offlinePaymentCustomer, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            new_order.money_return = money(order.offlineMoneyReturn, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            new_order.total = money(order.offlineTotal, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                            new_order.total_text = that.moneyToText(new_order.total_amount);
                            new_order.delivery_fee = "0";
                            new_order.order_note = order.note;
                            new_order.total_tax = order.offlineTotalTax;
                            new_order.order_discount_rate = order.orderDiscountRate;
                            new_order.order_discount_value = order.orderDiscountValue;
                            if (order.offlineTotalAmount <= order.offlinePaymentCustomer)
                                new_order.payment_status = "Thanh toán toàn bộ";
                            else
                                new_order.payment_status = "Thanh toán một phần";
                            if (order.offlinePaymentCustomer > order.offlineTotalAmount)
                                new_order.total_remain = 0;
                            else
                                new_order.total_remain = money((order.offlineTotalAmount - order.offlinePaymentCustomer), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);;
                            print_form = print_form.replace("<!--<#assign lines = model.orderLineItems>--><!--<#list lines as line>-->", "{#line_items}");
                            print_form = print_form.replace("<!--</#list>-->", "{/line_items}");
                            print_form = print_form.replace(/{/g, "{{");
                            print_form = print_form.replace(/}/g, "}}");
                            print_form = '{{#new_order}}' + print_form + '{{/new_order}}';
                            print_form = print_form + '<style>' + new_print_form + '</style> ' + '<style type="text/css" media="print">' +

                                'html,body{' +
                                'height:98%' +
                                ' }' +
                                ' </style>';
                            var html = "";
                            var htmlResult = Mustache.render(print_form, { "new_order": new_order });
                            var multiplePrint = that.order.tenant_setting.multiple_print;
                            if (multiplePrint != undefined && multiplePrint != 0) {
                                for (var i = 0; i < multiplePrint; i++) {
                                    html += htmlResult;
                                }
                            }
                            else {
                                html = htmlResult;
                            }
                            var frame = $('#popup');
                            frame.load(function () {
                                frame.contents().find('body').css('font-family', 'My Custom Font');
                            });
                            $("#popup").attr('name', 'popup');
                            $("#popup").css('font-size', '16px');
                            $("#popup").css('font-family', 'My Custom Font');
                            $('#popup').contents().find('body').append(html);
                            var iframe = document.getElementById("popup").contentWindow;
                            iframe.focus();
                            if (that.countin == 0 && new_print_form != "") {
                                setTimeout(function () { iframe.print(); }, 500);
                                that.countin = 1;
                            }


                            else
                                iframe.print();
                            //$("#popup").append(html);
                            //$("#popup").attr('name', 'popup');
                            //$("#popup").css('font-size', '16px');
                            //$('#popup').contents().find('body').append(html);
                            //var iframe = document.getElementById("popup").contentWindow;
                            //iframe.focus();
                            //iframe.print();
                            //$('#popup').contents().find('body').empty();
                            //$("#popup").show();
                            //$"("#printform").append(html);
                            //$("#printform1").printPage();
                            //$("#printform").jqprint();
                            //Sapo.NewModal.hide();
                        });



                }
                PosOrder.prototype.deleteActiveOrder = function () {
                    var that = this;
                    for (var i = 0; i < that.orders.length; i++) {
                        if (that.orders[i].tab_active) {
                            that.orders.splice(i, 1);
                            break;
                        }

                    }
                    checkResetPositionTab = true;
                }
                PosOrder.prototype.setIndexOrders = function () {
                    var that = this;
                    for (var i = 0; i < that.orders.length; i++) {
                        that.orders[i].index = i;
                    }
                }
                PosOrder.prototype.editOrder = function () {
                    var order = this.initTabActive();
                    if (order.totalParseFloatMoneyItemAndTax() == 0) {
                        Sapo.Flash.error("Giá trị đơn hàng không thể bằng 0!");
                        return
                    }
                    var draftOrder = {};
                    draftOrder.status = order.status;
                    if (order.tax_check == 0) {
                        draftOrder.taxTreatment = "exclusive";
                    }
                    else {
                        draftOrder.taxTreatment = "inclusive";
                    }
                    if (order.tagso == "") {
                        draftOrder.tags = [];
                    }
                    else
                        draftOrder.tags = order.tagso.split(",");
                    draftOrder.assigneeId = order.assignee_id;
                    draftOrder.id = order.id;
                    draftOrder.customerId = order.customer_id;
                    draftOrder.contactId = order.contact_id;
                    draftOrder.billingAddress = order.billing_address;
                    draftOrder.shippingAddress = order.shipping_address;
                    draftOrder.email = order.email;
                    draftOrder.phoneNumber = order.phone_number;
                    draftOrder.referenceNumber = order.reference_number;
                    draftOrder.currencyId = order.currency_id;
                    draftOrder.priceListId = order.price_list_id;
                    draftOrder.priceListName = order.price_list_name;
                    draftOrder.shipOn = order.ship_on;
                    draftOrder.IssuedOn = order.issued_on;
                    draftOrder.orderLineItems = [];
                    draftOrder.totalTax = 0;
                    draftOrder.totalDiscount = 0;
                    draftOrder.total = 0;
                    draftOrder.code = order.code;
                    draftOrder.note = order.note;

                    draftOrder.orderDiscountRate = order.is_discount_percent ? order.order_discount_value : 0;
                    draftOrder.orderDiscountValue = order.is_discount_percent ? 0 : order.order_discount_value;
                    draftOrder.discountReason = order.discount_reason;

                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null) {
                                    var line_item = order.order_line_items[i];
                                    var lineItem = {};

                                    lineItem.quantity = parseFloat(line_item.quantity);
                                    lineItem.variantId = line_item.variant_id;
                                    lineItem.id = line_item.id;
                                    lineItem.productId = line_item.product_id;
                                    lineItem.taxRateOverride = typeof line_item.tax_rate_override == 'string' ? line_item.tax_rate_override : undefined;
                                    lineItem.discountRate = line_item.is_discount_percent ? line_item.discount_value : 0;
                                    lineItem.discountValue = line_item.is_discount_percent ? 0 : line_item.discount_value;
                                    lineItem.discountReason = line_item.discount_reason;
                                    lineItem.taxTypeId = line_item.tax_type_id;
                                    lineItem.discountRate = line_item.discount_rate;
                                    lineItem.note = line_item.note;
                                    lineItem.price = line_item.price;
                                    lineItem.isFreeform = (line_item.is_freeform == undefined || line_item.is_freeform == false) ? false : true;
                                    draftOrder.orderLineItems.push(lineItem);
                                }
                            }
                        }
                        else {
                            Sapo.Flash.error("Vui lòng chọn sản phẩm vào đơn hàng!");
                            return
                        }
                    }
                    else {
                        Sapo.Flash.error("Vui lòng chọn sản phẩm vào đơn hàng!");
                        return
                    }
                    if (order.code == "") {
                        Sapo.Flash.error("Vui lòng điền mã hóa đơn vào đơn hàng!");
                        return
                    }
                    //if (financialStatus == "paid") {
                    //    draftOrder.invoices = [];
                    //    var invoice = {};
                    //    var payments = [];
                    //    var payment = {};
                    //    payment.paymentMethodId = order.payment_method_id;
                    //    payment.paidAmount = order.return_amount;
                    //    payment.amount = order.return_amount;
                    //    payment.currencyId = order.currency_id;
                    //    var returnedAmount = 0
                    //    if (order.order_line_items != null) {
                    //        if (order.order_line_items.length != 0) {
                    //            for (var i = 0; i < order.order_line_items.length; i++) {
                    //                if (order.order_line_items[i] != null) {
                    //                    if (order.tax_check == 0) {
                    //                        returnedAmount += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_rate) / 100)) * (1 + order.order_line_items[i].tax_rate_override / 100));
                    //                    } else {
                    //                        returnedAmount += parseFloat(order.order_line_items[i].quantity * (order.order_line_items[i].price - order.order_line_items[i].price * ((order.order_line_items[i].discount_rate) / 100)));
                    //                    }
                    //                }
                    //            }
                    //            returnedAmount = returnedAmount - order.return_amount;

                    //        } else {

                    //        }
                    //    }
                    //    else {

                    //    }
                    //    payment.returnedAmount = -returnedAmount;
                    //    if (payment.amount != 0) {
                    //        payments.push(payment);

                    //    }
                    //    invoice.payments = payments;
                    //    draftOrder.invoices.push(invoice);
                    //}

                    Sapo.WaitingSubmit();
                    $.ajax({
                        type: 'POST',
                        url: "/admin/orders/edit",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(draftOrder),
                        dataType: "json",
                        processData: false,
                        global: false,
                        success: function (result) {
                            window.location.href = "/admin/orders/" + result.id;
                            if (result.error != null) {
                                Sapo.Flash.error(result.error);
                                return;
                            }
                            var orderId = result.id;
                            Sapo.Flash.notice("Sửa đơn hàng thành công");
                            Sapo.Submit();
                        },
                        error: function (data) {

                            if (data.status == 403) {
                                NProgress.done();

                                Sapo.Utility.handleForbiddenRequest(false); return;
                            }



                            Sapo.Flash.error(data.responseText.replace(/\n/g, '; ').replace(/;|$|{|}|\|"|"/g, ''));
                            Sapo.Submit();
                        }
                    });
                }
                PosOrder.prototype.removeCustomer = function () {
                    var order = this.initTabActive();
                    order.customer = order.customer_default;

                    order.shipping_address_name = null;
                    order.shipping_address_province = null;
                    order.shipping_address_phone = null;
                    order.shipping_address_country = null;
                    order.shipping_address_address1 = null;
                    order.shipping_address_provinceId = 0;

                    order.billing_address_name = null;
                    order.billing_address_province = null;
                    order.billing_address_phone = null;
                    order.billing_address_country = null;
                    order.billing_address_address1 = null;

                    order.shipping_address_name_tmp = null;
                    order.shipping_address_province_tmp = null;
                    order.shipping_address_phone_tmp = null;
                    order.shipping_address_country_tmp = null;
                    order.shipping_address_address1_tmp = null;
                    order.shipping_address_provinceId_tmp = 0;

                    order.billing_address_name_tmp = null;
                    order.billing_address_province_tmp = null;
                    order.billing_address_phone_tmp = null;
                    order.billing_address_country_tmp = null;
                    order.billing_address_address1_tmp = null;

                    order.no_shipping_address = true;
                    order.no_billing_address = true;

                    order.isShippingInVietnam = false;
                    order.isShippingInVietnam_tmp = false;
                    order.hasShipping = false;
                    order.shipping_name = "";
                    order.shipping_fee = 0;
                    this.getShippingMethods();
                }

                PosOrder.prototype.caculateTotalLineItemPrice = function () {
                    var order = this.initTabActive();
                    var totalPrice = 0;
                    for (var i = 0; i < order.order_line_items.length; i++) {
                        if (order.order_line_items[i] != null && order.order_line_items[i].item_index != null && order.order_line_items[i].item_index != undefined) {
                            totalPrice += (order.order_line_items[i].price - order.order_line_items[i].total_discount) * order.order_line_items[i].quantity;
                        }
                    }
                    return totalPrice;
                }

                PosOrder.prototype.isValidDiscount = function () {
                    var order = this.initTabActive();
                    if (order.getCountLineItems() > 0) {
                        var discount = order.discount_tmp;
                        var discountType = order.isDiscountPercentTmp;
                        if (Sapo.Utility.isNumeric(discount)) {
                            if (parseInt(discount) >= 0) {
                                if (discountType) {
                                    if (parseInt(discount) <= 100)
                                        return true;
                                } else {
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                }

                PosOrder.prototype.caculateDiscount = function () {
                    var discount = 0;
                    var order = this.initTabActive();
                    var totalLineItemPrice = this.caculateTotalLineItemPrice();
                    if (order.is_discount_percent) {
                        discount = totalLineItemPrice * order.discount / 100;
                    }
                    else {
                        discount = parseFloat(order.discount);
                    }
                    return discount;
                }

                PosOrder.prototype.caculateTotalPrice = function () {
                    var totalLineItemPrice = this.caculateTotalLineItemPrice();
                    return totalLineItemPrice - Math.min(this.caculateDiscount(), totalLineItemPrice) + this.shipping_fee;
                }
                PosOrder.prototype.totalAmountPaymentedInOrder = function () {//Tính tổng các payment đã thanh toán
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.invoices != null && order.invoices.length > 0) {
                        for (var i = 0; i < order.invoices.length; i++) {
                            if (order.invoices[i] != null) {
                                if (order.invoices[i].payments != null && order.invoices[i].payments.length > 0) {
                                    for (var j = 0; j < order.invoices[i].payments.length; j++) {
                                        if (order.invoices[i].payments[j] != null) {
                                            total += parseFloat(order.invoices[i].payments[j].amount);
                                        }
                                    }
                                }
                            }

                        }
                    }

                    return total;
                }
                PosOrder.prototype.totalAmountPaymentedInInvoice = function (id) {//Tính tổng các payment đã thanh toán cho invoice
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.invoices != null && order.invoices.length > 0) {
                        for (var i = 0; i < order.invoices.length; i++) {
                            if (order.invoices[i] != null && order.invoices[i].id == id) {
                                if (order.invoices[i].payments != null && order.invoices[i].payments.length > 0) {
                                    for (var j = 0; j < order.invoices[i].payments.length; j++) {
                                        if (order.invoices[i].payments[j] != null) {
                                            total += parseFloat(order.invoices[i].payments[j].amount);
                                        }
                                    }
                                }
                            }

                        }
                    }

                    return total;
                }
                PosOrder.prototype.totalAmountPaymentingInOrder = function () {//Tính tổng các payment đang thanh toán
                    var total = 0;
                    var order = this.initTabActive();
                    //if (order.invoices != null && order.invoices.length > 0) {
                    //    for (var i = 0; i < order.invoices.length; i++) {
                    //        if (order.invoices[i] != null) {
                    //            if (order.invoices[i].payment != null) {
                    //                total += parseFloat(order.invoices[i].payment.amount);

                    //            }
                    //        }

                    //    }
                    //}

                    if (order.payment != null) {
                        total += parseFloat(order.payment.amount);
                    }
                    return total;
                }

                PosOrder.prototype.hiddenDivHeaderPayment = function () {

                    var order = this.initTabActive();
                    if (order.payment != null) {

                        return false;
                    }
                    alert("3");
                    return true;
                }
                PosOrder.prototype.totalNewPayment = function (total) {
                    var order = this.initTabActive();
                    if (order.payment != null) {

                        return money(parseFloat(order.payment.amount), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    }
                    else {
                        return money(0, order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    }
                }
                PosOrder.prototype.openPaymentbyInvoice = function (invoiceId) {
                    var order = this.initTabActive();
                    if (order.invoices != null && order.invoices.length > 0) {
                        for (var i = 0; i < order.invoices.length; i++) {
                            if (order.invoices[i].id == invoiceId) {

                                var template = $('#line-item-invoice-template').html();

                                order.invoices[i].total_payment = order.invoices[i].total - this.totalAmountPaymentedInInvoice(invoiceId);
                                var html = Mustache.render(template, { "line_item": order.invoices[i] });
                                //order.payment = {};
                                //order.payment.
                                $(".order-menu-screen__right-scoll_payment-content").append(html);

                                Bindings.bind($("div.popover-on-click-add").get(0), this);
                                //$("div.order-menu-screen__right-scoll_payment-content-paymentitem").popover('show');
                                $("div.payment-content-one").css({ "display": "none" });
                                Sapo.popoverOnClick($("div.popover-on-click-add"));

                                Sapo.setDatePicker();
                                Bindings.unbind($("#load-view-right-content").get(0), this);
                                Bindings.bind($("#load-view-right-content").get(0), this);
                            }
                        }
                    }


                }

                PosOrder.prototype.showDetailPayment = function (element) {
                    //Sapo.popoverOnClick($(element));
                    $(element).popover('show');
                    $(element).css({ "color": "#0088FF" });
                    $(element).find("i").addClass("fa-chevron-left");
                    $(document).mouseup(function (e) {
                        var container = $('.popover');

                        if ((!container.is(e.target) // if the target of the click isn't the container...
                            && container.has(e.target).length === 0)) // ... nor a descendant of the container
                        {

                            $(element).css({ "color": "#777" });
                            $(element).find("i").removeClass("fa-chevron-left");
                            $("div.popover-on-click").popover('destroy');
                        }
                    })
                }

                PosOrder.prototype.checkAmountPayment = function (element) {
                    var order = this.initTabActive();
                    if (parseFloat($(element).val()) > order.payment.total_payment) {
                        order.payment.amount = order.payment.total_payment;
                    }


                }

                PosOrder.prototype.totalAmountInvoiceInOrder = function () {//Tính tổng các invoice đã gửi

                    var total = 0;
                    if (this.invoices != null && this.invoices.length > 0) {
                        for (var i = 0; i < this.invoices.length; i++) {
                            if (this.invoices[i].status != "cancelled") {
                                total += parseFloat(this.invoices[i].total);
                            }
                        }
                    }
                    return total;
                }
                PosOrder.prototype.hiddenButtonInvoice = function () {//an buton ddang hien thi

                    var total = this.totalAmountInvoiceInOrder();
                    var background = "";
                    //total += this.totalParseFloatMoneyItemAndTax();
                    width = (total / parseFloat(this.total)) * 100;
                    if (width == 100) {
                        return false;
                    }
                    else
                        return true;

                }

                PosOrder.prototype.hiddenButtonFulfillment = function () {//an buton ddang hien thi


                    var total = this.totalQuantityfulfillmentedCreateInOrder();
                    if ((parseFloat(this.total_quantity_item) - total) == 0) {
                        return false;
                    }
                    else
                        return true;
                }
                PosOrder.prototype.headerDisplayInvoiceBar = function () {//load thanh status bar với tỷ lệ các invoice đang có

                    var total = this.totalAmountInvoiceInOrder();
                    var background = "";
                    //total += this.totalParseFloatMoneyItemAndTax();
                    width = (total / parseFloat(this.total)) * 100;
                    if (width >= 50 && width < 100) {
                        background = "rgb(191, 233, 32)";
                    }
                    else if (width < 50) {
                        background = "rgb(252,148,52)";
                    }
                    else {
                        width = 100;
                        background = "#0088FF";
                    }
                    $(".order-menu-screen__right-scoll_invoice-bar").css({ "width": width + "%", "background-color": background });
                    $(".order-menu-screen__right-scoll_invoice-header-right").css({ "color": background });

                }

                PosOrder.prototype.headerDisplayfulfillmentBar = function () {//load thanh status bar với tỷ lệ các fulfillment đang có

                    var total = this.totalQuantityfulfillmentedInOrder();
                    var background = "";
                    //total += this.totalParseFloatMoneyItemAndTax();
                    width = (total / parseFloat(this.total_quantity_item)) * 100;
                    if (width >= 50 && width < 100) {
                        background = "rgb(191, 233, 32)";
                    }
                    else if (width < 50) {
                        background = "rgb(252,148,52)";
                    }
                    else {
                        width = 100;
                        background = "#0088FF";
                    }
                    $(".order-menu-screen__right-scoll_fulfill-bar").css({ "width": width + "%", "background-color": background });
                    $(".order-menu-screen__right-scoll_fulfill-header-right").css({ "color": background });

                }
                PosOrder.prototype.lostFulfilmentInOrder = function () {//Tổng số sp còn lại cho các fulfill khác

                    var total = this.totalQuantityfulfillmentedInOrder();
                    return parseFloat(this.total_quantity_item) - total;
                }
                PosOrder.prototype.totalQuantityfulfillmentedInOrder = function () {//Tính tổng các full đã ship đã gửi
                    var total = 0;
                    if (this.fulfillments != null && this.fulfillments.length > 0) {
                        for (var i = 0; i < this.fulfillments.length; i++) {
                            if (this.fulfillments[i].fulfillment_line_items != null && this.fulfillments[i].fulfillment_line_items.length > 0 && this.fulfillments[i].status == "fulfilled") {
                                for (var j = 0; j < this.fulfillments[i].fulfillment_line_items.length; j++) {
                                    total += parseFloat(this.fulfillments[i].fulfillment_line_items[j].quantity);
                                }
                            }
                        }

                    }
                    return total;
                }
                PosOrder.prototype.totalQuantityfulfillmentedCreateInOrder = function () {//Tính tổng các invoice đã gửi
                    var total = 0;
                    if (this.fulfillments != null && this.fulfillments.length > 0) {
                        for (var i = 0; i < this.fulfillments.length; i++) {
                            if (this.fulfillments[i].fulfillment_line_items != null && this.fulfillments[i].fulfillment_line_items.length > 0) {
                                for (var j = 0; j < this.fulfillments[i].fulfillment_line_items.length; j++) {
                                    total += parseFloat(this.fulfillments[i].fulfillment_line_items[j].quantity);
                                }
                            }
                        }

                    }
                    return total;
                }
                PosOrder.prototype.lostInvoiceInOrder = function () {//Tổng số tiền còn lại cho các invoice khác

                    var total = this.totalAmountInvoiceInOrder();
                    //if (this.invoices != null && this.invoices.length > 0) {
                    //    for (var i = 0; i < this.invoices.length; i++) {
                    //        total += parseFloat(this.invoices[i].total);
                    //    }
                    //}
                    //total += this.totalParseFloatMoneyItemAndTax();
                    total = parseFloat(this.total) - total;
                    return money(total, this.currency.delimiter, this.currency.separator, this.currency.precision, this.currency.symbol);
                }
                PosOrder.prototype.lostPaymentInOrder = function () {//Tổng số tiền còn lại cần thanh toán cho payment

                    var total = this.totalAmountPaymentingInOrder();
                    total += this.totalAmountPaymentedInOrder();
                    //total += this.totalParseFloatMoneyItemAndTax();
                    total = parseFloat(this.total) - total;
                    return money(total, this.currency.delimiter, this.currency.separator, this.currency.precision, this.currency.symbol);
                }
                PosOrder.prototype.hiddenButtonPayment = function () {//load thanh button với tỷ lệ các invoice đang có
                    if (this.invoices == null || this.invoices.length == 0) {
                        return false;
                    }
                    var total = this.totalAmountPaymentingInOrder();
                    total += this.totalAmountPaymentedInOrder();
                    var background = "";
                    //total += this.totalParseFloatMoneyItemAndTax();
                    width = (total / parseFloat(this.total)) * 100;
                    if (width == 100) {
                        return false;
                    }
                    else
                        return true;

                }

                PosOrder.prototype.headerDisplayPaymentBar = function () {//load thanh status bar với tỷ lệ các invoice đang có

                    var total = this.totalAmountPaymentingInOrder();
                    total += this.totalAmountPaymentedInOrder();
                    var background = "";
                    //total += this.totalParseFloatMoneyItemAndTax();
                    width = (total / parseFloat(this.total)) * 100;
                    if (width >= 50 && width < 100) {
                        background = "rgb(191, 233, 32)";
                    }
                    else if (width < 50) {
                        background = "rgb(252,148,52)";
                    }
                    else if (width >= 10) {
                        width = 100;
                        background = "#0088FF";
                    }
                    else {
                        background = "rgb(252,148,52)";
                    }
                    $(".order-menu-screen__right-scoll_payment-bar").css({ "width": width + "%", "background-color": background });
                    $(".order-menu-screen__right-scoll_payment-header-right").css({ "color": background });

                }

                PosOrder.prototype.hiddenPaymentInvoice = function (invoiceId) {
                    var total = this.totalAmountPaymentedInInvoice(invoiceId);

                    if (this.invoices != null && this.invoices.length > 0) {
                        for (var i = 0; i < this.invoices.length; i++) {
                            if (this.invoices[i] != null && this.invoices[i].id == invoiceId) {
                                if (this.invoices[i].total == total) {
                                    return false;

                                }

                            }

                        }
                        return true;
                    }

                }
                PosOrder.prototype.hiddenShipFulfill = function (fulfillId) {
                    if (this.fulfillments != null && this.fulfillments.length > 0) {
                        for (var i = 0; i < this.fulfillments.length; i++) {
                            if (this.fulfillments[i] != null && this.fulfillments[i].id == fulfillId && this.fulfillments[i].status == "fulfilled") {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                PosOrder.prototype.showCancelInvoice = function (invoiceId, orderId) {
                    this.cancelItemsModal.show();
                    $('.form-delete-items input[name="invoiceId"]').val(invoiceId);
                    $('.form-delete-items input[name="orderId"]').val(orderId);
                }
                PosOrder.prototype.showCancelPaymentInvoice = function (paymentId, invoiceId, orderId) {
                    this.cancelItemsPaymentModal.show();
                    $('.form-delete-items input[name="paymentId"]').val(paymentId);
                    $('.form-delete-items input[name="orderId"]').val(orderId);
                    $('.form-delete-items input[name="invoiceId"]').val(invoiceId);
                }
                PosOrder.prototype.showCancelOrder = function (orderId) {
                    this.cancelOrderModal.show();

                    $('.form-delete-items input[name="orderId"]').val(orderId);
                }

                PosOrder.prototype.changePayment = function (node, idOld) {
                    var order = this.initTabActive();
                    //add them mot thanh toan
                    var pay = {};
                    pay.id = parseFloat($(node).val());
                    pay.name = $(node).find("option:selected").text();
                    pay.type = $(node).find("option:selected").attr("name");
                    if (order.paymentsTmp != undefined && order.paymentsTmp != null) {
                        for (var i = 0; i < order.paymentsTmp.length; i++) {
                            if (order.paymentsTmp[i].id == idOld) {
                                order.paymentsTmp[i].id = parseFloat($(node).val());
                                order.paymentsTmp[i].name = $(node).find("option:selected").text();
                                order.paymentsTmp[i].type = $(node).find("option:selected").attr("name");

                                break;
                            }
                        }
                    }
                    this.setValueOrderActive(order);
                    var height = order.paymentsTmp.length * Sapo.unitheight;
                    $(".product-option-edit").empty();
                    this.addItemPayment(height);

                    this.bindPaymentCustomer();
                }

                PosOrder.prototype.removePaymentItem = function (index) {
                    var order = this.initTabActive();
                    var height = order.paymentsTmp.length * Sapo.unitheight;
                    order.paymentsTmp.splice(index, 1);
                    $(".product-option-edit").empty();
                    if (order.paymentsTmp != undefined && order.paymentsTmp != null) {
                        this.addItemPayment(height);
                    }
                    //if (order.paymentsTmp[order.paymentsTmp.length - 1] != undefined) {
                    //    var amount = this.totalMoneyReturnAmout() - this.totalCustomerPayment();
                    //    order.paymentsTmp[order.paymentsTmp.length - 1].amount += amount > 0 ? amount : 0;
                    //}

                    this.bindPaymentCustomer();

                }
                PosOrder.prototype.loadMoneyReturn = function () {
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.payments != undefined && order.payments != null) {
                        $.each(order.payments, function (index, payment) {
                            total += payment.amount;
                        });
                    }
                    return total;
                }
                PosOrder.prototype.loadMoneyReturnTmp = function () {
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.paymentsTmp != undefined && order.paymentsTmp != null) {
                        $.each(order.paymentsTmp, function (index, payment) {
                            total += payment.amount;
                        });
                    }
                    return total;
                }
                PosOrder.prototype.loadMoneyReturnFormatNumber = function () {
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.fixPayment == undefined) {
                        order.fixPayment = false;
                    }
                    if (this.order.tenant_setting.payment_require_filling && !order.fixPayment && order.edit_order != true) {
                        this.ResetPaymentsBeforeFix();
                    }
                    if (order.payments != undefined && order.payments != null) {
                        $.each(order.payments, function (index, payment) {
                            total += payment.amount;
                        });
                    }
                    if ((order.payments != null && order.payments.length > 1) || total > 0) return $.formatNumber(Math.round(total), { format: "#,##0.###", locale: "en" });
                    else return null;
                }


                PosOrder.prototype.ResetPaymentsBeforeFix = function () {
                    var order = this.initTabActive();
                    var totalMonney = this.totalMoneyReturnAmout();
                    if (order.payments == null || order.payments == undefined || order.payments.length == 0) {
                        order.payments = [];
                        var payment = {};
                        for (var i = 0; i < order.payment_methods.length; i++) {
                            if (order.payment_methods[i].status == 'default') {
                                payment.id = order.payment_methods[i].id;
                                payment.name = order.payment_methods[i].name;
                                payment.type = order.payment_methods[i].type;
                                payment.amount = parseFloat(totalMonney);
                                order.payments.push(payment);

                            }
                        }
                    }
                    else {
                        order.payments[0].amount = parseFloat(totalMonney);
                    }
                }

                PosOrder.prototype.checkMoneyReturn = function () {
                    var check = false;
                    var order = this.initTabActive();
                    if (order.payments != undefined && order.payments != null) {
                        if (order.payments.length >= 2) {
                            check = true;
                        }
                    }
                    return check;
                }
                PosOrder.prototype.setValuePaymentItem = function (node, index) {
                    var order = this.initTabActive();
                    order.fixPayment = true;
                    var that = this;
                    order.payments[index].amount = parseFloat($(node).val().replace(/[,]+/g, '') === '' ? '0' : $(node).val().replace(/[,]+/g, ''));
                    var totalPayment = that.loadMoneyReturn();
                    if ((this.loadMoneyReturnTmp() > this.totalParseFloatMoneyItemAndTax()) && index == 0) {
                        //if (index > 0) {
                        //    order.payments[index].amount -= (totalPayment - that.totalParseFloatMoneyItemAndTax());
                        //    if (order.payments[index].amount < 0)
                        //        order.payments[index].amount = 0;
                        //    $(node).val(order.payments[index].amount);
                        //    Sapo.Flash.error("Phương thức thanh này không được vượt quá tổng tiền!");
                        //}
                        //else {

                        if (order.payments != undefined && order.payments != null) {
                            $.each(order.payments, function (index, payment) {
                                if (index != 0)
                                    payment.amount = 0;
                            });
                        }
                        Bindings.refreshImmediately();
                    }


                }

                PosOrder.prototype.OnKeyDown = function () {
                    $(".number-text").keydown(function (event) {
                        // Allow: backspace, delete, tab and escape
                        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
                            // Allow: Ctrl+A
                            (event.keyCode == 65 && event.ctrlKey === true) ||
                            // Allow: home, end, left, right
                            (event.keyCode >= 35 && event.keyCode <= 39)) {
                            // let it happen, don't do anything
                            return true;
                        }
                        else {
                            // Ensure that it is a number and stop the keypress
                            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                                event.preventDefault();
                            };
                        };
                    });
                }

                PosOrder.prototype.bindValuePaymentItem = function (node, index) {
                    var that = this;
                    var order = this.initTabActive();
                    if (order.payments != null && index <= order.payments.length - 1) {
                        if (order.payments[index].type == "point" && order.current_loyalty_customer != undefined && order.current_loyalty_customer != null) {
                            var maxValue = that.SetValuePaymentPointItem();
                            if (node.value > maxValue) return maxValue;
                            if (order.payments[index].amount <= 0 || order.payments[index].amount == undefined)
                                order.payments[index].amount = maxValue;
                            else
                                order.payments[index].amount = order.payments[index].amount > maxValue ? maxValue : order.payments[index].amount;
                            return $.formatNumber(order.payments[index].amount, { format: "#,##0.###", locale: "en" });
                        }
                    }
                    var valuePayment = 0;
                    if (order.payments != null && (order.payments[index] != null || order.payments[index] != undefined))
                        valuePayment = order.payments[index].amount;
                    return $.formatNumber(valuePayment, { format: "#,##0.###", locale: "en" });
                }

                PosOrder.prototype.cancelPaymentItem = function () {
                    var order = this.initTabActive();
                    order.payments = null;
                    this.setValueOrderActive(order);
                    Sapo.Flash.notice("Hủy thành công!");
                }

                PosOrder.prototype.submitPaymentItem = function () {
                    var order = this.initTabActive();

                    if (order.paymentsTmp[order.paymentsTmp.length - 1].id == 0 && order.paymentsTmp[order.paymentsTmp.length - 1].amount != 0) {
                        Sapo.Flash.error("Chọn phương thức thanh toán");
                        return;
                    }
                    else {
                        order.fixPayment = true;
                        order.payments = order.paymentsTmp;
                        Sapo.Flash.notice("Lưu thành công!");
                        Sapo.NewModal.hide();
                    }
                }


                PosOrder.prototype.addNewPayment = function () {
                    var order = this.initTabActive();
                    var that = this;
                    //var totalPayment = that.loadMoneyReturn();
                    if (order.paymentsTmp != undefined && order.paymentsTmp[order.paymentsTmp.length - 1].id > 0 && order.paymentsTmp[order.paymentsTmp.length - 1].amount > 0) {
                        if ((that.loadMoneyReturnTmp() > that.totalParseFloatMoneyItemAndTax())) {
                            Sapo.Flash.error("Số tiền thanh toán đã vượt quá tổng tiền hàng, bạn không thể chọn phương thức mới!");
                            return 0;
                        }
                        if ((that.loadMoneyReturnTmp() == that.totalParseFloatMoneyItemAndTax())) {
                            Sapo.Flash.error("Số tiền thanh toán đã đủ với tổng tiền hàng!");
                            return 0;
                        }

                        var payment = {};
                        var amount = this.totalMoneyReturnAmout() - this.totalCustomerPayment();
                        payment.id = 0;
                        payment.name = "Chọn PTTT";
                        payment.type = "";
                        payment.amount = amount > 0 ? amount : 0;
                        order.paymentsTmp.push(payment);
                        var height = order.paymentsTmp.length * Sapo.unitheight;

                        this.addItemPayment(height);

                    }
                    else {
                        if (order.paymentsTmp[order.paymentsTmp.length - 1].id == 0) {
                            Sapo.Flash.error("Chọn phương thức thanh toán!");
                            return 0;
                        }
                        else {
                            Sapo.Flash.error("Chọn số tiền thanh toán!");
                            return 0;
                        }

                    }
                }


                PosOrder.prototype.getNewPayment = function () {
                    var order = this.initTabActive();
                    if (order.currentPayment == undefined) return 0;
                    return order.currentPayment.amount;
                }

                PosOrder.prototype.changeValueNewPayment = function (node, index) {
                    var order = this.initTabActive();

                    var value = $(node).val().replace(/[,]+/g, '') === '' ? '0' : $(node).val().replace(/[,]+/g, '');
                    if (value.length > 16) value = 0;

                    order.paymentsTmp[index].amount = parseFloat(value);

                    var test = this.totalCustomerPayment();
                }


                PosOrder.prototype.choiseNewPayment = function (node, index) {
                    var order = this.initTabActive();
                    order.paymentsTmp[index].id = parseFloat($(node).val());
                    order.paymentsTmp[index].name = $(node).find("option:selected").text();
                    order.paymentsTmp[index].type = $(node).find("option:selected").attr("name");
                }

                PosOrder.prototype.addItemPayment = function (height) {
                    var that = this;
                    var order = this.initTabActive();
                    var countPaymentMethod = 0;


                    $("#quick-finter-conditions").empty();
                    var htmlfoot = "";
                    for (var j = (order.paymentsTmp.length - 1) ; j >= 0; j--) {
                        var opi = ''; var pttt = "selected";
                        for (var i = 0; i < order.payment_methods.length; i++) {
                            var selected = "";
                            if (order.payment_methods[i].id == order.paymentsTmp[j].id) {
                                selected = "selected";
                                pttt = '';
                            }
                            opi += '<option name="' + order.payment_methods[i].type + '" ' + selected + ' value="' + order.payment_methods[i].id + '">' + order.payment_methods[i].name + '</option>';
                        }
                        var display = '<i style="color: #0088FF;"   class="fa fa-plus fl" bind-event-click="addNewPayment()" id="payment-i" aria-hidden="true"></i>';
                        if (j != (order.paymentsTmp.length - 1)) {
                            display = '<i style="color: #0088FF;"   class="fa fa-trash-o fl" bind-event-click="removePaymentItem(' + j + ')" id="payment-i" aria-hidden="true"></i>';
                        }
                        htmlfoot += '<div class="order-item-left-text fl">' +
                            '<div style="position: relative;">' +
                            '<select datatype = "dropdown" styledropdown = "width: 100%;" class="form-control filter-conditions" id="filter-conditions' + j + '"  bind-event-change="choiseNewPayment(this,' + j + ')" style="height: 30px;">' +
                            '<option value="0" ' + pttt + '>Chọn PTTT</option>' +
                            opi +
                            '</select>' +
                            '</div>' +
                            '</div>' +
                            '<div class="order-item-right-text fl" style="padding-top:8px;">' +
                            '<input  type-number="number" bind-event-keyup="changeValueNewPayment(this,' + j + ')" value="' + order.paymentsTmp[j].amount + '"  id="input-i" class="sapo-textbox form-control fl intConvert" bind-event-keydown="changeValueNewPayment(this,' + j + ')"/>' +
                            display +
                            '</div>';
                    }
                    $("#quick-finter-conditions").append(htmlfoot);

                    if (height == 0) {
                        $(".popover").css("top", parseFloat($(".popover").css("top")) - order.paymentsTmp.length * Sapo.unitheight - Sapo.unitheight);
                    } else {
                        $(".popover").css("top", parseFloat($(".popover").css("top")) + height - order.paymentsTmp.length * Sapo.unitheight);
                    }
                    for (var i = 0; i < order.paymentsTmp.length; i++) {
                        datadropdownItemN($("#filter-conditions" + i));
                    }

                    datadropdownItemN($("#changePayment"));
                    Bindings.unbind($("#quick-finter-conditions").get(0), this);
                    Bindings.bind($("#quick-finter-conditions").get(0), this);
                    Bindings.unbind($(".product-option-edit").get(0), this);
                    Bindings.bind($(".product-option-edit").get(0), this);
                    Sapo.Utility.changeNumber();
                    Bindings.refreshImmediately();
                    that.OnKeyDown();
                }
                PosOrder.prototype.setPaymentCustomer = function (node) {
                    var order = this.initTabActive();
                    order.fixPayment = true;
                    //phuowng thuc thanh toan mac dinh
                    if ($(node).val() == "" || parseFloat($(node).val()) == 0) {
                        order.payments.splice(0, 1);
                        return;
                    }
                    if (order.payments == null || order.payments == undefined || order.payments.length == 0) {
                        order.payments = [];
                        var payment = {};
                        for (var i = 0; i < order.payment_methods.length; i++) {
                            if (order.payment_methods[i].status == 'default') {
                                payment.id = order.payment_methods[i].id;
                                payment.name = order.payment_methods[i].name;
                                payment.type = order.payment_methods[i].type;
                                payment.amount = parseFloat($(node).val().replace(/[,]+/g, '') === '' ? '0' : $(node).val().replace(/[,]+/g, ''));
                                order.payments.push(payment);

                            }
                        }
                    }
                    else {
                        order.payments[0].amount = parseFloat($(node).val().replace(/[,]+/g, '') === '' ? '0' : $(node).val().replace(/[,]+/g, ''));
                    }

                }

                PosOrder.prototype.initPaymentNew = function () {
                    var that = this;
                    var order = this.initTabActive();
                    //phương thuc thanh toan mac dinh
                    order.paymentsTmp = [];
                    order.currentPayment = {};
                    for (var i = 0; i < order.payment_methods.length; i++) {
                        if (order.payment_methods[i].status == "default") {
                            order.currentPayment.id = order.payment_methods[i].id;
                            order.currentPayment.name = order.payment_methods[i].name;
                            order.currentPayment.type = order.payment_methods[i].type;
                            var amount = this.totalMoneyReturnAmout() - this.totalCustomerPayment();
                            order.currentPayment.amount = amount;
                        }
                    }
                    order.paymentsTmp.push(order.currentPayment);
                    $(".popover").css("top", parseFloat($(".popover").css("top")) - 2 * Sapo.unitheight);

                    that.OnKeyDown();
                    return order;
                }

                PosOrder.prototype.showPaymentOrder = function () {
                    var order = this.initTabActive();
                    order.paymentsTmp = [];
                    this.showPaymentOrderPopup.show();
                    if (order.payments != undefined && order.payments != null && order.payments.length != 0) {
                        order.paymentsTmp = JSON.parse(JSON.stringify(order.payments));
                    }
                    else {
                        this.initPaymentNew();
                    }
                    $("#quick-finter-conditions").empty();
                    var htmlfoot = "";
                    for (var j = (order.paymentsTmp.length - 1) ; j >= 0; j--) {
                        var opi = ''; var pttt = "selected";
                        for (var i = 0; i < order.payment_methods.length; i++) {
                            var selected = "";
                            if (order.payment_methods[i].id == order.paymentsTmp[j].id) {
                                selected = "selected";
                                pttt = '';
                            }
                            opi += '<option name="' + order.payment_methods[i].type + '" ' + selected + ' value="' + order.payment_methods[i].id + '">' + order.payment_methods[i].name + '</option>';
                        }
                        var display = '<i style="color: #0088FF;"   class="fa fa-plus fl" bind-event-click="addNewPayment()" id="payment-i" aria-hidden="true"></i>';
                        if (j != (order.paymentsTmp.length - 1)) {
                            display = '<i style="color: #0088FF;"   class="fa fa-trash-o fl" bind-event-click="removePaymentItem(' + j + ')" id="payment-i" aria-hidden="true"></i>';
                        }
                        htmlfoot += '<div class="order-item-left-text fl">' +
                            '<div style="position: relative;">' +
                            '<select datatype = "dropdown" styledropdown = "width: 100%;" class="form-control filter-conditions" id="filter-conditions' + j + '"  bind-event-change="choiseNewPayment(this,' + j + ')" style="height: 30px;">' +
                            '<option value="0" ' + pttt + '>Chọn PTTT</option>' +
                            opi +
                            '</select>' +
                            '</div>' +
                            '</div>' +
                            '<div class="order-item-right-text fl" style="padding-top:8px;">' +
                            '<input type-number="number" bind-event-keydown="changeValueNewPayment(this,' + j + ')" bind-event-keyup="changeValueNewPayment(this,' + j + ')" value="' + order.paymentsTmp[j].amount + '"  id="input-i" class="sapo-textbox intConvert form-control fl" />' +
                            display +
                            '</div>';
                    }
                    $("#quick-finter-conditions").append(htmlfoot);

                    for (var i = 0; i < order.paymentsTmp.length; i++) {
                        datadropdownItemN($("#filter-conditions" + i));
                    }
                    datadropdownItemN($("#changePayment"));
                    Bindings.unbind($("#quick-finter-conditions").get(0), this);
                    Bindings.bind($("#quick-finter-conditions").get(0), this);
                    Bindings.unbind($("#newpaymenttmp").get(0), this);
                    Bindings.bind($("#newpaymenttmp").get(0), this);
                    this.setValueOrderActive(order);
                    this.bindPaymentCustomer();
                    Sapo.Utility.changeNumber();
                    Bindings.refreshImmediately();
                    that.OnKeyDown();
                }
                PosOrder.prototype.showLocation = function () {
                    if (offline) {
                        function setDropdownPosOption(locations) {
                            if (locations.length == 0)
                                return;
                            let selectPosNode = document.getElementById('select-location');

                            locations.forEach(function (locationElement) {
                                let option = document.createElement('option');

                                option.textContent = locationElement.label;
                                option.setAttribute('value', locationElement.id)
                                selectPosNode.appendChild(option);
                            })
                        }
                        function resetDropdownPosOption() {
                            $('#select-location option').each(function () {
                                $(this).remove();
                            });
                        }
                        navigator.serviceWorker.addEventListener('message', event => {
                            let allowedLocations = [];
                            if (event.data.title == 'get-accessed-location-response') {
                                let locationIds = [];
                                let urls = event.data.urls;
                                urls.forEach(function (url) {
                                    let paths = url.split('/');
                                    let locationId = paths[paths.length - 1];
                                    locationIds.push(locationId);
                                })
                                let allLocations = null;
                                let allLocationJson = localStorage.getItem(KEY_MY_MODEL);
                                if (allLocationJson)
                                    allLocations = JSON.parse(allLocationJson).order.locations;

                                allLocations.forEach((locationElement) => {
                                    let id = locationElement.id.toString();
                                    if (locationIds.includes(id))
                                        allowedLocations.push(locationElement);
                                })
                                this.showLocationPopup.show();
                                resetDropdownPosOption();

                                setDropdownPosOption(allowedLocations);
                                SearchSelectLocation("#select-location");
                            }
                        });
                        serviceWorker.postMessage({ title: 'get-accessed-location' });
                    }
                    else {
                        this.showLocationPopup.show();
                        SearchSelectLocation("#select-location");
                    }
                }
                PosOrder.prototype.bindPaymentCustomer = function () {
                    Bindings.unbind($("#sapo-modal").get(0), this);
                    Bindings.bind($("#sapo-modal").get(0), this);
                    Bindings.refreshImmediately();
                }

                PosOrder.prototype.displayCheckboxItem = function (orderLineItemId) {
                    if (this.order_line_items != null) {
                        if (this.order_line_items.length != 0) {
                            for (var i = 0; i < this.order_line_items.length; i++) {
                                if (this.order_line_items[i] != null) {
                                    if (this.order_line_items[i].id == orderLineItemId) {
                                        if (this.order_line_items[i].quantity == 0) {
                                            return false;
                                        }
                                        else {
                                            return true;
                                        }
                                    }
                                }
                            }

                        }
                    }
                }

                PosOrder.prototype.setBalanceScale = function () {
                    var order = this.initTabActive();
                    if (order.is_scaner_scale == true) {
                        $(".fa-balance-scale").addClass("active")

                    } else {
                        $(".fa-balance-scale").removeClass("active")
                        order.is_scaner_scale = false;
                    }

                    return order.is_scaner_scale;
                }

                PosOrder.prototype.showBalanceScale = function () {

                    return this.balance_scale;
                }

                PosOrder.prototype.setScanerScale = function () {
                    var that = this;
                    var order = this.initTabActive();
                    if (order.is_scaner_scale == undefined || !order.is_scaner_scale) {
                        order.is_scaner_scale = true;
                        that.order.is_scaner_scale = true;
                    }
                    else {
                        order.is_scaner_scale = false;
                        that.order.is_scaner_scale = false;
                    }
                    return true;
                }

                PosOrder.prototype.checkMaxQuantityItem = function (i, element) {
                    if (this.order_line_items[i].quantity_max < parseFloat($(element).val())) {
                        this.order_line_items[i].quantity = this.order_line_items[i].quantity_max;
                        Bindings.unbind($("#variant-" + i).get(0));
                        Bindings.bind($("#variant-" + i).get(0));
                        Bindings.refreshImmediately();
                    }
                }
                PosOrder.prototype.addOrRemoveBulkActionItem = function (orderLineItemId, eleCheckBox) {

                    var checked = eleCheckBox.checked;
                    if (this.order_line_items != null) {
                        if (this.order_line_items.length != 0) {
                            for (var i = 0; i < this.order_line_items.length; i++) {
                                if (this.order_line_items[i] != null) {
                                    if (this.order_line_items[i].id == orderLineItemId) {
                                        if (checked) {

                                            this.order_line_items[i].quantity = this.order_line_items[i].quantity_max;
                                        }
                                        else {
                                            this.order_line_items[i].quantity = 0;
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
                PosOrder.prototype.stringTitle = function (dataString, lengthData) {
                    var a = (dataString != null ? (dataString.length > lengthData ? dataString : "") : "");
                    return (dataString != null ? (dataString.length > lengthData ? dataString : "") : "");
                }


                PosOrder.prototype.formatStringLength = function (dataString, lengthData) {
                    return (dataString != null ? (dataString.length > lengthData ? $('<div/>').html(dataString.substring(0, lengthData)).text() + "..." : $('<div/>').html(dataString).text()) : "---");
                }


                PosOrder.prototype.checkDisplayUnit = function (orderIndex, lineIndex, selectedId) {
                    $('.elementUnit-' + orderIndex + '-' + lineIndex).each(function (i, element) {
                        $(element).parent().show();
                        var unitId = $(element).attr("unit-id");
                        if (unitId == selectedId) {
                            $(element).parent().hide();
                        }
                    });
                }
                PosOrder.prototype.showPopUpCategory = function () {
                    var that = this;
                    var url = ajaxUrls.categories;
                    this.showDisplayPopUp.fetchHTML(url, {
                        onRender: function () {
                            that.initPopupCategory();
                        }
                    });
                }
                PosOrder.prototype.initPopupCategory = function () {
                    tooltip($("span"));

                    $(".product-option-edit").height($(window).height() - 47 * 2);
                    $(".product-option-edit").css({ "position": "relative" });
                    var scroll = document.querySelector.bind(document);
                    var container_left = scroll('.product-option-edit');
                    Ps.initialize(container_left);
                }
                PosOrder.prototype.showItemCategory = function () {
                    if ($("#display_item").css("display") == "block") {
                        $("#display_item").css({ "display": "none" });
                        return false;
                    }

                    else {
                        $("#display_item").css({ "display": "block" });
                        return true;
                    }

                }
                PosOrder.prototype.showItemI = function () {
                    if ($("#display_item").css("display") == "block") {

                        return false;
                    }

                    else {

                        return true;
                    }

                }
                PosOrder.prototype.setCategoryItem = function (node, id) {
                    var that = this;


                    if (this.categories == undefined) {
                        this.categories = [];
                    }
                    var check = false;
                    $.each(that.categories, function (item, category) {
                        if (category.id == id) {
                            check = true;
                            category.value = $(node).is(":checked");

                            return false
                        }
                    })
                    if (!check) {
                        this.categories.push({
                            id: id,
                            value: $(node).is(":checked")
                        })
                    }
                    if (that.getAllCategoryActive()) {
                        $(".category-all_check").prop('checked', true);
                    }
                    else
                        $(".category-all_check").prop('checked', false);
                }
                PosOrder.prototype.setTopForItems = function (node) {
                    var that = this;
                    $("#frmQuery input[name='CheckTop']").val($(node).is(":checked"));
                }
                PosOrder.prototype.getCheckTop = function (node) {

                    return $('#CheckTop').val() == "false" ? false : true;
                }

                PosOrder.prototype.setActiveForItems = function (node) {
                    var that = this;
                    if ($(node).is(":checked")) {
                        $("div.category-item").each(function () {
                            var input = $(this).find("input");
                            if (!input.is(":checked")) {
                                input.prop('checked', true);
                                that.setCategoryItem(input, input.attr("categoryId"));
                            }
                        });
                    }
                    else {
                        $("div.category-item").each(function () {
                            var input = $(this).find("input");
                            if (input.is(":checked")) {
                                input.prop('checked', false);
                                that.setCategoryItem(input, input.attr("categoryId"));
                            }
                        });
                    }


                }
                PosOrder.prototype.getAllCategoryActive = function () {
                    var that = this;
                    var check = [];
                    if (this.categories == undefined) {
                        this.categories = [];
                    }
                    $.each(that.categories, function (item, category) {
                        if (category.value) {
                            check.push(1);
                        }
                    })

                    if (check.length == parseFloat($("#total_quantity").val())) {
                        return true;
                    }
                    else
                        return false;
                }

                PosOrder.prototype.getCategoryItem = function (node, id) {
                    var that = this;
                    if (this.categories == undefined) {
                        this.categories = [];
                    }
                    var check = false;
                    $.each(that.categories, function (item, category) {
                        if (category.id == id) {
                            check = category.value;
                            return false
                        }
                    })
                    return check;
                }
                PosOrder.prototype.setProductByCategory = function () {
                    var that = this;
                    var arrayPr = [];
                    $.each(that.categories, function (item, category) {
                        if (category.value) {
                            arrayPr.push(category.id)
                        }
                    })
                    $("#frmQuery input[name='CategoryIds']").val(arrayPr.join());
                    var url = ajaxUrls.getAllVariant + '?' + $("#frmQuery").serialize();
                    Sapo.Utility.loadAjax(url, ".order-menu-screen__left-tab_variant", function () {

                        $('.t-grid-pager-boder .pagination a.t-link').each(function () {

                            if ($(this).data("initAjaxClick"))
                                return;
                            $(this).data("initAjaxClick", true);

                            $(this).click(function () {

                                var link = $(this).attr('href');
                                that.loadPagePaginationAdded(link);
                                return false;
                            });
                        })

                    });
                    Sapo.NewModal.hide();
                }

                PosOrder.prototype.createpaymentvouchers = function () {
                    var order = this.initTabActive();
                    $("#disabled-action").css("z-index", "999999");
                    $("#disabled-action").show();

                    var url = "/admin/payment_vouchers/createpaymentvoucher?locationId=" + order.location_id;
                    this.showDisplayPopUp.fetchHTML(url, {
                        onRender: function () {
                            $("#disabled-action").css("z-index", "0");
                            $("#disabled-action").hide();
                        }
                    })
                }

                PosOrder.prototype.indexreturns = function (daynow) {
                    var that = this;
                    $(".display-popUp").attr("href", ajaxUrls.indexReturns + '?' + "CreatedOnMax=" + daynow + "&CreatedOnMin=" + daynow + "");
                    this.showDisplayPopUp.show();
                    //Sapo.Utility.loadAjax(ajaxUrls.indexReturns + '?' + "CreatedOnMax=" + daynow + "&CreatedOnMin=" + daynow + "", "#indexReturns", function () {
                    //}, { hide: false });
                }
                PosOrder.prototype.reportEndday = function () {
                    var order = this.initTabActive();

                    var that = this;

                    var url = "/admin/reports/reports_accounts_sales?LocationId=" + order.location_id;
                    this.reportssale.fetchHTML(url, {
                        onRender: function () {
                            validateForm();
                        }
                    });
                    $("#source").multiselect({
                        includeSelectAllOption: true,
                        nonSelectedText: 'Chọn nguồn', //None selected
                        nSelectedText: 'nguồn được chọn', //selected
                        allSelectedText: 'Tất cả', //All selected
                        selectAllText: 'Chọn tất cả',
                        buttonWidth: '100%',
                        onChange: function (element, checked) {

                            that.setData('source', 'source_ids', that);
                            $("#sourceIds").val(that.source_ids);
                        },
                        onSelectAll: function (checked) {
                            that.setData('source', 'source_ids', that);
                            $("#sourceIds").val(that.source_ids);
                        },
                        onDeselectAll: function (checked) {
                            that.setData('source', 'source_ids', that);
                            $("#sourceIds").val(that.source_ids);
                        },
                        optionClass: function () {
                            return "multiselect--sapo-checkbox";
                        },
                        onInitialized: function (select, container) {
                            $(container).find('li').each(function () {
                                var id = 'multiselect-' + Sapo.Utility.generateGUID(),
                                    $this = $(this),
                                    $input = $(this).find('input');
                                if ($this.hasClass('multiselect-filter'))
                                    return;
                                $this.addClass('multiselect--sapo-checkbox');
                                $this.find('a').addClass('multiselect-a--sapo-checkbox').removeClass('checkbox');
                                $this.find('label').attr('for', id).addClass('multiselect-label--sapo-checkbox');

                                var $sapoCheckBox = $('<span/>', {
                                    "class": 'sapo-checkbox',
                                });

                                $input.attr('id', id);
                                $input.addClass('sapo-checkbox__input');
                                $input.detach();
                                $input.appendTo($sapoCheckBox);

                                $sapoCheckMark = $('<span/>', {
                                    "class": 'sapo-checkbox__checkmark',
                                });
                                $sapoCheckMark.appendTo($sapoCheckBox);

                                $sapoCheckBox.prependTo($this.find('a'))
                                //$(this).click(function (e) {
                                //    e.stopPropagation();
                                //});
                            })
                        }
                    })
                }
                PosOrder.prototype.createreceiptvouchers = function () {
                    var order = this.initTabActive();
                    var url = "/admin/receipt_vouchers/createreceiptvoucher?locationId=" + order.location_id;
                    this.showDisplayPopUp.fetchHTML(url, {
                        onRender: function () {

                        }
                    })
                }
                PosOrder.prototype.addCustomer = function (input) {
                    var order = this.initTabActive();
                    if (offline) {
                        var groupCustomerHtml;
                        var rq = CustomerGroup.dao.getAll(
                            function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    var item = data[i];
                                    groupCustomerHtml += '<li>' +
                                        '<a bind-event-click="selectSuggestion(1)" bind="customer_group_id" class="next-list__item" item-value="' + item.name_translate + '">' +
                                        '<div class="next-grid next-grid--no-outside-padding next-grid--compact">' +
                                        '<div class="next-grid__cell next-grid__cell--no-flex">' +
                                        '<i class="gi pull-left gi-ok next-icon next-icon--12"></i>' +
                                        '</div>' +
                                        '<div class="next-grid__cell">' +
                                        item.name_translate +
                                        '</div>' +
                                        '</div>' +
                                        '</a>' +
                                        '</li>';

                                }

                                var html = '<label class="control-label">Nhóm khách hàng</label>' +
                                    '<div class="controls next-popover__container next-popover__container--full-width" define="{\'productTypeAutocomplete\': new Sapo.SingleSelectRemoteSourceAutocomplete(this,{\'type\': \'product_type\',\'length\':255})}" context="productTypeAutocomplete">' +
                                    '<div>' +
                                    '<div class="next-field__connected-wrapper btn-group btn-group-filter" style=" width:202px;">' +
                                    '<input bind="customer_group" maxlength="250" name="GroupName" id="GroupName" type="text" placeholder="Chọn nhóm khách hàng" class="form-control next-input next-field--connected input-product_type valid" bind-event-keyup="inputChanged(event)" bind-event-keypress="selectInputValue(event)" autocomplete="off" aria-invalid="false">' +
                                    '<a class="pull-right down-list" style="border: none; background: none; position: absolute; left: 160px; padding: 8px ; padding-left:10px; box-shadow: none; " bind-event-click="togglePopover()" id="btn-toggle-popover-product_type">' +
                                    '<i class="fa fa-down" id="fa-toggle-product_type"></i>' +
                                    '</a>' +

                                    '</div>' +
                                    '</div>' +
                                    '<div class="next-popover next-popover--full-width next-popover--do-not-show-on-focus next-popover-product_type" style="width: 200px; left:100px;">' +
                                    '<div class="next-popover__content-wrapper">' +
                                    '<div class="next-popover__content">' +
                                    '<div class="next-popover__pane">' +
                                    '<ul class="js-autocomplete-suggestions next-list next-list--compact next-list--toggles" id="groupCustomerId">' +
                                    groupCustomerHtml +
                                    '</ul>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                                var $customerOfflinePopupTemplateHolder = $("#customerOfflinePopupTemplateHolder");
                                var scriptdata = $customerOfflinePopupTemplateHolder.html();
                                var $tmpData = $("<div/>");
                                $tmpData.html(scriptdata);
                                $tmpData.find("#formAddGroupCustomer").html("");
                                $tmpData.find("#formAddGroupCustomer").append(html);
                                $customerOfflinePopupTemplateHolder.html($tmpData.html());
                                this.showAddCustomerOfflinePopup = new Sapo.NewModal($customerOfflinePopupTemplateHolder.get(0));
                                this.showAddCustomerOfflinePopup.show();
                                Sapo.setDatePicker();
                                datadropdownN($("select[bind='sex']"));

                                $("#sapo-modal-container #Name").val("");
                                $("#sapo-modal-container #PhoneNumber").val("");
                                $("#sapo-modal-container #CustomerEmail").val("");
                                $("#sapo-modal-container #birth_transdate").val("");
                                $("#sapo-modal-container #GroupName").val("");
                                if (order.customer_name == null)
                                    $(".search-customer").val("");

                                else
                                    $(".search-customer").val(order.customer_name);
                            });
                    }
                    else {
                        var url = "/admin/customers/PopupCreateFromPOS?inputCustomer=" + input;
                        this.createNewCustomer.fetchHTML(url, {
                            onRender: function () {
                                if (order.customer_name == null)
                                    $(".search-customer").val("");

                                else
                                    $(".search-customer").val(order.customer_name);
                                $('.modal').on('shown.bs.modal', function () {
                                    $(this).find('[autofocus]').focus();
                                });
                            }
                        });
                    }
                }
                PosOrder.prototype.checkDisplayLoyalty = function () {
                    var that = this;
                    var order = this.initTabActive();

                    that.OnlyCheckDisplayLoyalty();
                    //if (order.customer.is_loyalty == undefined) {
                    //    order.customer.is_loyalty = false;
                    //}
                    //if (order.customer.is_show_discount == undefined) {
                    //    order.customer.is_show_discount = false;
                    //}

                    //return order.customer.is_loyalty;
                    return false;
                }

                PosOrder.prototype.OnlyCheckDisplayLoyalty = function () {
                    var total = this.totalMoneyItem();
                    var order = this.initTabActive();

                    if (order.current_loyalty_customer != undefined) {
                        var currentdate = new Date().toISOString();
                        if (order.current_loyalty_customer.loyalty_card_id > 0
                            && order.current_loyalty_customer.loyalty_card.status == "active"
                            && order.current_loyalty_customer.started_on != null
                            && order.current_loyalty_customer.ended_on != null
                            && Date.parse(order.current_loyalty_customer.started_on) < Date.parse(currentdate)
                            && Date.parse(currentdate) < Date.parse(order.current_loyalty_customer.ended_on)
                        ) {
                            if (order.current_loyalty_customer.loyalty_card.amount_condition <= total) {
                                order.customer.is_show_discount = true;
                                if (order.order_type != "orderCloneNotApplyLoyalty" && (order.first_time_apply == undefined || !order.first_time_apply)) {
                                    order.is_apply_loyalty_discount = true;
                                    order.first_time_apply = true
                                }
                                else if (order.order_type == "orderCloneNotApplyLoyalty") {
                                    order.is_apply_loyalty_discount = false;
                                    order.first_time_apply = true;
                                    order.order_type = "orderClone";
                                }
                            } else {
                                order.customer.is_show_discount = false;
                                order.is_apply_loyalty_discount = false;
                                order.first_time_apply = false;
                            }
                        } else {
                            order.customer.is_show_discount = false;
                            order.is_apply_loyalty_discount = false;
                        }
                    }
                }

                PosOrder.prototype.checkDisplayDiscountCard = function () {
                    var that = this;
                    var order = that.initTabActive();
                    that.OnlyCheckDisplayLoyalty();
                    if (order.customer.is_show_discount == undefined) {
                        order.customer.is_show_discount = false;
                    }

                    if (order.customer.previous_is_show_discount == undefined) {
                        order.customer.previous_is_show_discount = false;
                    }
                    if (!order.customer.previous_is_show_discount && order.customer.is_show_discount) {
                        if (order.order_clone_apply_loyalty == undefined || order.order_clone_apply_loyalty) {
                            that.initCheckboxApplyOrderDiscountLoyalty();
                        }
                        else {
                            $("[name='my-ApplyDiscountLoyalty']").bootstrapSwitch('destroy', true);
                            $("[name='my-ApplyDiscountLoyalty']").bootstrapSwitch({ 'state': false });
                            var that = this;
                            $('input[name="my-ApplyDiscountLoyalty"]').on('switchChange.bootstrapSwitch', function (event, state) {

                                that.eventApplyDiscountLoyalty(that, state);
                            });

                        }

                    }


                    order.customer.previous_is_show_discount = order.customer.is_show_discount;

                    return order.customer.is_show_discount;
                }

                PosOrder.prototype.DisplayZeroPoint = function () {
                    var that = this;
                    var order = this.initTabActive();
                    //if (order.customer.is_zero_point == undefined) {
                    //    order.customer.is_zero_point = false;
                    //}
                    //if (order.customer.is_loyalty == undefined) {
                    //    order.customer.is_loyalty = false;
                    //}
                    //return order.customer.is_zero_point;
                    return false;
                }



                PosOrder.prototype.DisplayNonZeroPoint = function () {
                    var that = this;
                    var order = this.initTabActive();

                    //if (order.customer.is_zero_point == undefined) {
                    //    order.customer.is_zero_point = false;
                    //}
                    return true;

                }
                PosOrder.prototype.ApplyDiscountLoyalty = function () {
                    var that = this;
                    var order = this.initTabActive();
                    if (order.is_apply_loyalty_discount == undefined) {
                        order.is_apply_loyalty_discount = false;
                    }
                    if (order.is_apply_loyalty_discount && order.current_loyalty_customer != undefined && order.current_loyalty_customer != null) {
                        order.order_loyalty_discount_value = order.current_loyalty_customer.loyalty_card.discount_value;


                        if (order.current_loyalty_customer.loyalty_card.discount_type == "percent")
                            order.is_loyalty_discount_percent = true;
                        else order.is_loyalty_discount_percent = false;
                    }
                }

                PosOrder.prototype.addLineItemGift = function (variant) {
                    var that = this;
                    var order = this.initTabActive();
                    if (!that.order.tenant_setting.allowed_negotived_sell) {
                        if (that.getAvailableVariant(variant) <= 0) {
                            Sapo.Flash.error("Sản phẩm này hiện tại hết hàng.");
                            return false;
                        }
                        else if (that.getAvailableVariant(variant) <= 1) {
                            variant.quantity = parseFloat(that.getAvailableVariant(variant));
                        }
                        else {
                            variant.quantity = 1;
                        }
                    }
                    else {
                        variant.quantity = 1;
                    }
                    if (typeof (variant.price) == "string") {
                        variant.price = parseFloat(variant.price);
                    }
                    variant.price = that.getPriceByCode(variant, that.getCodePriceById(order.price_list_id));
                    var index = order.order_line_items.length;
                    variant.variant_id = variant.id;
                    variant.id = 0;
                    variant.currency = order.currency;
                    variant.whole_sale_price_currency = money(that.getPriceByCode(variant, "BANBUON"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    variant.buy_price_currency = money(that.getPriceByCode(variant, "GIANHAP"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    variant.retail_price_currency = money(that.getPriceByCode(variant, "BANLE"), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    variant.item_index = index;

                    variant.index = order.index;


                    variant.point = (variant.price - variant.price % order.current_loyalty_customer.ratio_point_loyalty) / order.current_loyalty_customer.ratio_point_loyalty;
                    if (variant.price % order.current_loyalty_customer.ratio_point_loyalty != 0)
                        variant.point = variant.point + 1;
                    variant.metafields = [
                        {
                            metaKey: "order_line_item_type",
                            value: "reward",
                            namespace: "loyalty_customer"
                        }
                    ];
                    variant.isForLoyalty = true;

                    variant.discount_value = variant.price;
                    variant.is_discount_percent = false;
                    variant.is_apply_loyalty_discount = true;
                    variant.is_apply_customer_discount = false;
                    variant.is_apply_promotion_discount = false;
                    variant.is_apply_normal_discount = false;
                    //end chiết khấu

                    //thuế
                    variant.tax_rate_override = that.setTaxRateOverride(variant);
                    order.order_line_items.push(variant);
                    variant.available = that.getAvailableLineItem(index);

                    //option
                    variant.opt1 = StandardOption(variant.opt1, variant.opt2, variant.opt3);
                    variant.allOption = (variant.opt1 == null ? "" : variant.opt1) + (variant.opt2 == null ? "" : " - " + variant.opt2)
                        + (variant.opt3 == null ? "" : " - " + variant.opt3);

                    variant.formatedName = that.formatStringLength(variant.name, 70);
                    variant.formatedUnit = that.formatStringLength(variant.unit, 9);

                    variant.total_available = 0;
                    variant.total_stock_on_hand = 0;
                    variant.total_incoming_stock = 0;
                    variant.total_stock_onway = 0;
                    $.each(variant.inventories, function (index, inventory) {
                        if (inventory.location_id == order.location_id) {
                            variant.available = inventory.available;
                            variant.stock_on_hand = inventory.on_hand;
                            variant.incoming_stock = inventory.incoming;
                            variant.stock_onway = inventory.onway;
                        }
                        variant.total_available += inventory.available;
                        variant.total_stock_on_hand += inventory.on_hand;
                        variant.total_incoming_stock += inventory.incoming;
                        variant.total_stock_onway += inventory.onway;
                    })
                    var gift = '';
                    var template = $('#line-item-template').html();
                    var html = Mustache.render(template, { "line_item": variant });
                    $("#line_item_rows").prepend(html);
                    Bindings.bind($("#variant-" + index).get(0), this);
                    $("#variant-" + index).find(".line_item_quantity").focus().select();
                    Sapo.popover($("i#sapo-popover" + index));
                    gift += '<i class="fa fa-gift" style="font-size:1.5em;color: #0088FF;"></i>';
                    $("#icon-gift").prepend(gift);
                    tooltip($("span"));
                    tooltip($("input"));
                    this.setValueOrderActive(order);
                    this.updateScollBar();
                    Sapo.Utility.validateFormInPage();
                    Sapo.Utility.changeNumber();
                    Bindings.unbind($("table#table-order tbody").get(0));
                    Bindings.bind($("table#table-order tbody").get(0));
                    Bindings.refreshImmediately();
                    this.OnKeyDown();
                }

                PosOrder.prototype.SetPoint = function () {
                    var total = 0;
                    var order = this.initTabActive();
                    if (order.current_loyalty_customer != undefined && order.current_loyalty_customer.point != undefined) {
                        var customerPoint = order.current_loyalty_customer.point;
                        if (order.order_line_items != null) {
                            if (order.order_line_items.length != 0) {
                                for (var i = 0; i < order.order_line_items.length; i++) {
                                    var point = 0;
                                    if (order.order_line_items[i] != null && order.order_line_items[i].isForLoyalty) {
                                        if (order.order_line_items[i].quantity > 1) {
                                            point = (order.order_line_items[i].price) / (order.loyalty_setting.point_to_amount);
                                        } else {
                                            point = Math.ceil((order.order_line_items[i].price) / (order.loyalty_setting.point_to_amount));
                                        }
                                        total += Math.ceil(point * order.order_line_items[i].quantity);
                                    }
                                }
                                return customerPoint - total;
                            } else {
                                return customerPoint;
                            }
                        }
                        else {
                            return customerPoint;
                        }
                    }
                    else return 0;
                }

                PosOrder.prototype.SetUnit = function () {
                    var order = this.initTabActive();
                    var unit = "Điểm"
                    if (order.current_loyalty_customer != undefined && order.current_loyalty_customer.loyalty_setting != undefined) {
                        unit = order.current_loyalty_customer.loyalty_setting.unit;
                    } else {
                        return unit;
                    }
                    return unit;
                }

                PosOrder.prototype.checkConditionDiscount = function () {
                    var that = this;
                    var order = this.initTabActive();
                    if (order.current_loyalty_customer == undefined) {
                        return false;
                    }
                    if (order.current_loyalty_customer.loyalty_card_id == 0) return false;
                    return true;
                }
                PosOrder.prototype.CheckConditionLoyalty = function () {
                    var that = this;
                    var order = this.initTabActive();
                    $.ajax({
                        url: ajaxUrls.checkConditionLoyalty,
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            customerId: order.customer_id,
                        },
                        success: function (result) {
                            order.customer.is_loyalty = false;
                            order.current_loyalty_customer = null;
                            for (var j = 0; j < order.payment_methods.length; j++) {
                                if (order.payment_methods[j].type == "point") {
                                    order.payment_methods[j].show = false;
                                }
                            }
                            if (result != null) {
                                order.current_loyalty_customer = result.result;
                                if (order.current_loyalty_customer.loyalty_setting.status == "active" && order.current_loyalty_customer.status == "active") {
                                    order.customer.is_loyalty = true;
                                    var currentdate = new Date().toISOString();
                                    order.customer.is_show_discount = false;
                                    order.is_apply_loyalty_discount = false;
                                    if (order.current_loyalty_customer.loyalty_card_id > 0
                                        && order.current_loyalty_customer.loyalty_card.status == "active"
                                        && order.current_loyalty_customer.started_on != null
                                        && order.current_loyalty_customer.ended_on != null
                                        && Date.parse(order.current_loyalty_customer.started_on) < Date.parse(currentdate)
                                        && Date.parse(currentdate) < Date.parse(order.current_loyalty_customer.ended_on)
                                    ) {
                                        var total = that.totalMoneyItem();

                                        if (order.current_loyalty_customer.loyalty_card.amount_condition <= total) {
                                            order.customer.is_show_discount = true;
                                            order.is_apply_loyalty_discount = true;
                                        }
                                    }
                                    order.customer.is_zero_point = false;

                                    if (order.current_loyalty_customer.loyalty_setting.allowed_point_payment) {
                                        for (var j = 0; j < order.payment_methods.length; j++) {
                                            if (order.payment_methods[j].type == "point") {
                                                order.payment_methods[j].show = true;
                                            }
                                        }
                                    }
                                }
                                else {
                                    order.current_loyalty_customer = null;
                                }

                            }
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                NProgress.done();

                                Sapo.Utility.handleForbiddenRequest(false); return;
                            }

                        }
                    });
                }
                PosOrder.prototype.getPointsCustomer = function () {
                    var that = this;
                    var order = this.initTabActive();
                    return (order.current_loyalty_customer == null || order.current_loyalty_customer.point == null || order.current_loyalty_customer.point == undefined) ? "---" : that.SetPoint();
                }

                PosOrder.prototype.getPointsToMoneyCustomer = function () {
                    var that = this;
                    var order = this.initTabActive();
                    return (order.current_loyalty_customer == null ||
                        order.current_loyalty_customer.ratio_point_loyalty == null ||
                        order.current_loyalty_customer.ratio_point_loyalty == undefined ||
                        order.current_loyalty_customer.point == null ||
                        order.current_loyalty_customer.point == undefined) ?
                        "---" :
                        money(parseFloat(order.current_loyalty_customer.ratio_point_loyalty * that.SetPoint()), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                }

                PosOrder.prototype.disabledDiscountLoyalty = function () {
                    $('[name="customer-apply-discount-loyalty"]').css("display", "none");
                }

                PosOrder.prototype.enabledDiscountLoyalty = function (loyalty_card) {
                    $('[name="customer-apply-discount-loyalty"]').css("display", "block");
                }

                PosOrder.prototype.openLoyaltyDetail = function (event) {
                    var order = this.initTabActive();
                    $(".display-popUp").attr("href", "/admin/advanced/loyalties/" + order.customer_id + "/loyalty_detail");
                    this.showDisplayPopUp.show();
                }

                PosOrder.prototype.openTapGift = function (event) {
                    var that = this;
                    var order = this.initTabActive();
                    $(".display-popUp").attr("href", ajaxUrls.listVariantExchange + "?price=" + order.current_loyalty_customer.ratio_point_loyalty * that.SetPoint() + "&posLocationId=" + order.location_id);
                    this.showDisplayPopUp.show();
                    Sapo.Utility.loadAjax(ajaxUrls.listVariantExchange + "?price=" + order.current_loyalty_customer.ratio_point_loyalty * that.SetPoint() + "&posLocationId=" + order.location_id, "#listVariantExchange", function () {
                        var instance = window.Bindings.context(document.body).draftOrder.listVariantExchange;
                        instance.initTable();
                    }, { hide: false });
                }

                PosOrder.prototype.SetValuePaymentPointItem = function () {
                    var that = this;
                    var order = this.initTabActive();
                    var currentPoint = that.SetPoint();
                    var currentTotalMoneyCurrent = that.totalMoneyReturnAmout();
                    if (order.current_loyalty_customer == undefined || order.current_loyalty_customer == null || order.current_loyalty_customer.ratio_point_loyalty == null || order.current_loyalty_customer.ratio_point_loyalty == undefined) return 0;
                    else if (order.current_loyalty_customer.ratio_point_loyalty * currentPoint < currentTotalMoneyCurrent) return order.current_loyalty_customer.ratio_point_loyalty * currentPoint;
                    return currentTotalMoneyCurrent;
                }



                PosOrder.prototype.setPrint = function () {
                    var order = this.initTabActive();
                    return order.print_order;
                }

                PosOrder.prototype.setPrintClick = function () {
                    var that = this;
                    var order = this.initTabActive();
                    if (order.print_order) order.print_order = false;
                    else order.print_order = true;
                    that.order.print_order = order.print_order;
                }

                //offline

                PosOrder.prototype.AllowSaleOffline = function () {
                    var that = this;
                    try {
                        Variant.dao.getById(1, function () { }, function () { });
                    } catch (Ex) {

                    }
                    Bindings.refreshImmediately();
                    Sapo.NewModal.hide();
                }

                PosOrder.prototype.IsAllowOffline = function () {
                    this.initTabActive();
                    that = this;
                    if (that.order.tenant_setting.allow_offline_sale) return true;
                    return false;
                }
                PosOrder.prototype.ConfirmOffline = function (browserIsChrome) {
                    that = this;
                    if (that.order.tenant_setting.allow_offline_sale) {
                        if (browserIsChrome) this.confirmGoOffline.show();
                        else this.confirmFireFox.show();
                        offline = true;
                    } else {
                        offline = false;
                    }
                }
                PosOrder.prototype.confirmOnline = function () {
                    that = this;
                    if (that.order.tenant_setting.allow_offline_sale) {
                        this.confirmOnlineModal.show();
                    }
                }
                PosOrder.prototype.showSyncDataOfflineModal = function () {
                    this.syncDataOfflineModal.show();
                    var listDb = ["Variants", "Products", "Countries", "Cities", "Districts", "Tenants"
                        , "TenantSettings", "Customers", "CustomerGroups", "PaymentMethods", "PriceLists", "TaxTypes", "Accounts", "PrintForms", "Locations"
                        , "Categories", "Brands", "Serials"];
                    listDb.forEach(function (item, index) {
                        var per = $("#perSync-" + item).val()
                        $("#progress-sync-" + item + "__progress-bar").removeClass("progress-bar-transition")
                        $("#progress-sync-" + item + "__progress-bar").css("width", per)
                        $("#progress-sync-" + item + "__progress-percentage").html(per)
                    })
                }
                //PosOrder.prototype.checkCompleteSync = function () {
                //    var check = true;
                //    $(".checkCompleteSync").each(function (index, item) {
                //        if ($(item).val() != "100%") {
                //            check = false;
                //        }
                //    })
                //    if (check) {
                //        $(".header-pos-btn .fa-refresh").removeClass("fa-spin")
                //    } else {
                //        $(".header-pos-btn .fa-refresh").addClass("fa-spin")
                //    }
                //}
                PosOrder.prototype.setRefreshClick = function () {
                    var html = "";
                    var that = this;
                    var filter = {};
                    filter.page = 1;
                    filter.limit = 10;
                    filter.created_on_min = null;
                    filter.created_on_max = null;
                    filter.query = null;
                    this.showListOrderOfflinePopup = new Sapo.NewModal($("#listOrderOfflinePopupTemplateHolder").get(0));
                    this.showListOrderOfflinePopup.show();


                    var listOrderStyle = Twine.context($('body').get(0)).draftOrder.listOrderOffline;
                    listOrderStyle.getListOrderOfflineByFilter();
                    datadropdownItemN($("select#status-sync-order"))
                    //Order.dao.getByFilter(filter,
                    //    function (data) {

                    //        for (var i = 0; i < data.orders.length; i++) {
                    //            var itemOrder = data.orders[i];
                    //            var status = "";
                    //            var refreshButton = "";
                    //            if (itemOrder.error != undefined && itemOrder.error != null && itemOrder.error.length > 500) {
                    //                itemOrder.error = "Hệ thống đang nâng cấp"
                    //            }
                    //            if (itemOrder.error != undefined && itemOrder.error != null && itemOrder.error.length > 250) {
                    //                itemOrder.error.substring(0, 250)
                    //            }
                    //            '<a class="btn btn-default" style="border:1px solid #cccccc; background-color: white;color: #151313">Đồng bộ lại</a>'
                    //            if (itemOrder.synch_status == "waiting") {
                    //                status = 'Chưa đồng bộ';
                    //            }
                    //            else if (itemOrder.synch_status == "failed") {
                    //                status = '<a data-original-title="' + itemOrder.error + '" data-toggle="tooltip" data-placement="left"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Xem lỗi cc</a>';
                    //                refreshButton = '<a class="btn btn-default sapo-submit btn-reloadOrderOffline" style="" bind-event-click="ReloadOrderOffline(' + JSON.stringify(filter).replace(/"/g, "&quot;") + ',' + JSON.stringify(itemOrder).replace(/"/g, "&quot;") + ',this)">Đồng bộ lại</a>';
                    //            }
                    //            else if (itemOrder.synch_status == "completed") status = "Đã đồng bộ"
                    //            var customerName = (itemOrder.customerName == null || itemOrder.customerName == undefined) ? "" : itemOrder.customerName;
                    //            if ((itemOrder.customerName == null || itemOrder.customerName == undefined) &&
                    //                (itemOrder.customerId == null || itemOrder.customerId == undefined || itemOrder.customerId == "")) {
                    //                customerName = "Khách lẻ"
                    //            }
                    //            var test = '<tr>' +
                    //                '<td>' + '<i class="fa icon-angle fa-angle-double-right"  bind-event-click="openDrilldown(' + itemOrder.id+')"></i>'+'</td>'
                    //                '<td>' + itemOrder.code + '</td>' +
                    //                '<td>' + that.FormatISODateStringToHMSDMY(itemOrder.local_created_on) + '</td>' +
                    //                '<td>' + itemOrder.assigneeName + '</td>' +
                    //                '<td>' + customerName + '</td>' +
                    //                '<td>' + $.formatNumber(itemOrder.offlineTotalAmount, { format: "#,##0.###", locale: "en" }) + '</td>' +
                    //                '<td>' + status + '</td>' +
                    //                '<td>' + refreshButton + '</td>' +
                    //                '</tr>';

                    //            html += test;
                    //        }
                    //        var $listOrderOfflinePopupTemplateHolder = $("#listOrderOfflinePopupTemplateHolder");
                    //        var scriptdata = $listOrderOfflinePopupTemplateHolder.html();
                    //        var $tmpData = $("<div/>");
                    //        $tmpData.html(scriptdata);
                    //        $tmpData.find("#line_item_order_offline_popup").html("");
                    //        $tmpData.find("#line_item_order_offline_popup").append(html);

                    //        var pagerHtml = that.initPagerBoder(data.count, filter);
                    //        $tmpData.find("#pager-boder-order-offline").html("");
                    //        $tmpData.find("#pager-boder-order-offline").append(pagerHtml);

                    //        $listOrderOfflinePopupTemplateHolder.text = $tmpData.html();
                    //        $listOrderOfflinePopupTemplateHolder.type = 'text/javascript';
                    //        tooltip($("a"));
                    //    },
                    //    function (error) { }
                    //);
                }


                PosOrder.prototype.FormatISODateStringToHMSDMY = function (date) {
                    var str = date.split("T");
                    var days = str[0];
                    var year = days.split("-")[0];
                    var month = days.split("-")[1];
                    var day = days.split("-")[2];

                    var hour = ((str[1].split("Z"))[0].split("."))[0];

                    return day + "/" + month + "/" + year + ' ' + hour;
                }


                PosOrder.prototype.initPagerBoder = function (total, filter) {
                    var fromValue = (filter.page - 1) * filter.limit + 1;
                    var toValue = filter.page * filter.limit > total ? total : filter.page * filter.limit;
                    var totalPage = (total - total % filter.limit) / filter.limit;
                    filter.totalPage = totalPage;
                    if (total % filter.limit != 0) {
                        totalPage += 1;
                    }

                    var subhtml = "";
                    var page = "";
                    var formValuePage = 0;
                    var toValuePage = totalPage;

                    if (filter.page >= 3) formValuePage = filter.page - 3;
                    if (filter.page + 2 <= totalPage) toValuePage = filter.page + 2;
                    for (var i = formValuePage; i < toValuePage; i++) {
                        if (filter.page == (i + 1)) {
                            page += '<li class="active">' +
                                '<span class="t-state-active" data-original-title="" title="">' + (i + 1) + '</span>' +
                                '</li>';
                        } else {
                            page += '<li><a class="t-link" data-page-number="' + (i + 1) + '" bind-event-click="GoToPageOrderOffline(' + JSON.stringify(filter).replace(/"/g, "&quot;") + ',' + (i + 1) + ')" data-original-title="" title="">' + (i + 1) + '</a></li>';
                        }

                    }

                    var statePrev = (filter.page != 1) ? 'class="t-link"' : 'class="disabled"';
                    var stateNext = (filter.page != totalPage) ? 'class="t-link"' : 'class="disabled"';
                    if (totalPage > 1) {
                        subhtml = '<div class="dataTables_paginate paging_bootstrap" data-original-title="" title="">' +
                            '<ul class="pagination">' +
                            '<li ' + statePrev + '>' +
                            '<a class="t-link" bind-event-click="PreviousPageOrderOffline(' + JSON.stringify(filter).replace(/"/g, "&quot;") + ')" href="javascript:">' +
                            '<span class="t-icon t-arrow-prev">&lt;</span>' +
                            '</a>' +
                            '</li>' +
                            page +
                            '<li ' + stateNext + '>' +
                            '<a class="t-link" bind-event-click="NextPageOrderOffline(' + JSON.stringify(filter).replace(/"/g, "&quot;") + ')">' +
                            '<span class="t-icon t-arrow-next">&gt;</span>' +
                            '</a>' +
                            '</li>' +
                            '</ul>' +
                            '</div>';
                    }

                    var showcount = ""
                    if (total == 0) showcount = "Hiển thị 0 kết quả";
                    else showcount = 'Hiển thị kết quả từ ' + fromValue + ' - ' + toValue + ' trên tổng ' + total;
                    var html = '<div class="t-pager t-reset" data-original-title="" title="">' +
                        '<div class="col-xs-4">' +
                        '<div class="t-status-text dataTables_info">' + showcount + ' </div>' +
                        '</div>' +
                        '<div class="col-xs-8" data-original-title="" title="">' +
                        subhtml +
                        '</div>' +
                        '</div>';
                    return html;
                }




                PosOrder.prototype.InitOffline = function () {
                    this.payments = this.offlineGetPayments();
                }

                PosOrder.prototype.IsOnlineView = function () {
                    return !offline;
                }

                PosOrder.prototype.IsOfflineView = function () {
                    if (this.order.tenant_setting.allow_offline_sale) return offline;
                    else return false;
                    return false;
                }

                PosOrder.prototype.createPosOrderOffline = function (status) {
                    if (!$("#formPos").valid()) {
                        return;
                    }
                    $("#disabled-action").css("z-index", "999999");
                    $("#disabled-action").show();
                    var that = this;
                    var checkPaymentPoint = true;
                    var pointPayment = 0;
                    var checkLoyalty = false;
                    var order = this.initTabActive();
                    if (order.code == "") {
                        Sapo.Flash.error("Vui lòng điền mã hóa đơn vào đơn hàng!");
                        $("#disabled-action").css("z-index", "0");
                        $("#disabled-action").hide();
                        return
                    }


                    if (that.ReturnPaymentRequireFilling(order.payments)) {
                        Sapo.Flash.error("Chưa nhập tiền thanh toán!");
                        $("#disabled-action").css("z-index", "0");
                        $("#disabled-action").hide();
                        return
                    }

                    var draftOrder = {};
                    draftOrder.store = order.tenant_info;
                    if (order.tax_check == 0) {
                        draftOrder.taxTreatment = "exclusive";
                    }
                    else {
                        draftOrder.taxTreatment = "inclusive";
                    }
                    if (order.tagso == "" || order.tagso == null) {
                        draftOrder.tags = [];
                    }
                    else
                        draftOrder.tags = order.tagso.split(",");
                    draftOrder.assigneeId = order.assignee_id;
                    draftOrder.assigneeName = $("#search-account-name").val();
                    if (order.customer == undefined || order.customer == null || (order.customer.id == 0 && order.customer.local_id == undefined)) {
                        order.customer = order.customer_default;
                    }
                    if (order.customer.is_apply_loyalty_discount) {
                        Sapo.Flash.error("Đơn hàng đang áp dụng chiết khấu tích điểm không xử lý offline!");
                        $("#disabled-action").css("z-index", "0");
                        $("#disabled-action").hide();

                        return
                    }
                    draftOrder.customerId = order.customer.id;
                    draftOrder.local_customer_id = order.local_customer_id;
                    if (order.customer.id > 0)
                        draftOrder.customerName = order.customer.name;
                    else
                        draftOrder.customerName = "Khách lẻ";

                    draftOrder.phone = order.phone_number;
                    draftOrder.contactId = order.contact_id;
                    draftOrder.contact = order.contact;
                    draftOrder.billingAddress = order.billing_address;
                    draftOrder.shippingAddress = order.shipping_address;
                    draftOrder.email = order.email;
                    draftOrder.phoneNumber = order.phone_number;
                    draftOrder.referenceNumber = order.reference_number;
                    draftOrder.currencyId = order.currency_id;
                    draftOrder.priceListId = order.price_list_id;
                    //draftOrder.shipOn = order.ship_on;
                    draftOrder.locationId = order.location_id;
                    draftOrder.locationName = order.location_name;
                    if (order.issued_on != null || order.issued_on != "") {
                        order.issued_on == null
                    } else {
                        //if (order.issued_on != null && order.issued_on != "" && !IsValidLongDateTime(order.issued_on)) {
                        //    Sapo.Flash.error("Ngày mua chưa định dạng đúng!");
                        //    $("#disabled-action").css("z-index", "0");
                        //    $("#disabled-action").hide();
                        //    return
                        //}
                    }

                    //draftOrder.issuedOn = order.issued_on;
                    draftOrder.code = order.code;
                    draftOrder.note = order.note;
                    if (order.customer.code != undefined) {
                        draftOrder.customer_code = order.customer.code;
                        draftOrder.customer_debt = order.customer.debt;

                    }

                    draftOrder.location = {};
                    draftOrder.location = order.location;
                    draftOrder.status = status;
                    draftOrder.priceListName = order.price_list_name;
                    draftOrder.totalDiscount = order.total_discount;
                    draftOrder.orderDiscountRate = order.is_discount_percent ? order.order_discount_value : 0;
                    draftOrder.orderDiscountValue = order.is_discount_percent ? 0 : order.order_discount_value;
                    draftOrder.discountReason = order.discount_reason;
                    draftOrder.discountItems = this.getDiscountItemsOrder();
                    draftOrder.orderLineItems = [];
                    this.lineitemVat();
                    if (order.order_line_items != null) {
                        if (order.order_line_items.length != 0) {
                            for (var i = 0; i < order.order_line_items.length; i++) {
                                if (order.order_line_items[i] != null && order.order_line_items[i].item_index != null && order.order_line_items[i].item_index != undefined) {
                                    var line_item = order.order_line_items[i];
                                    var lineItem = {};
                                    lineItem.isFreeform = (line_item.is_freeform == undefined || line_item.is_freeform == false) ? false : true;
                                    if (lineItem.isFreeform && (line_item.note == null || line_item.note == "")) {
                                        Sapo.Flash.error("Không được để trống tên dịch vụ!");
                                        $("#disabled-action").css("z-index", "0");
                                        $("#disabled-action").hide();
                                        return
                                    }
                                    lineItem.vatamount = line_item.vatamount;
                                    lineItem.quantity = parseFloat(line_item.quantity);
                                    lineItem.variantId = line_item.variant_id;
                                    lineItem.name = line_item.name;
                                    lineItem.productName = line_item.product_name;
                                    lineItem.sku = line_item.sku;
                                    lineItem.productId = line_item.product_id;
                                    lineItem.taxTypeId = line_item.tax_type_id;
                                    lineItem.taxRateOverride = line_item.tax_rate_override == undefined ? 0 : line_item.tax_rate_override;
                                    lineItem.discountRate = line_item.is_discount_percent ? line_item.discount_rate : 0;
                                    lineItem.discountValue = line_item.is_discount_percent ? 0 : line_item.discount_value;
                                    lineItem.discountReason = line_item.discount_reason;
                                    lineItem.discountItems = this.getDiscountItemsLineItem(i);
                                    lineItem.note = line_item.note;
                                    lineItem.price = line_item.price;
                                    lineItem.line_amount = this.totalMoneyOrderDetail(i).replace(order.currency.symbol, "");
                                    lineItem.discountAmount = line_item.discountAmount;
                                    //lineItem.discountRate = line_item.discountRate;
                                    if (line_item.metafields != null && line_item.metafields != undefined) {
                                        Sapo.Flash.error("Đơn hàng đang áp dụng đổi quà tích điểm không xử lý offline!");
                                        $("#disabled-action").css("z-index", "0");
                                        $("#disabled-action").hide();
                                        return
                                    };
                                    lineItem.allOption = line_item.allOption;
                                    lineItem.category = line_item.category
                                    lineItem.brand = line_item.brand;
                                    if (line_item.product_type == "serial") {
                                        var quantitySerial = 0;
                                        if (line_item.serials != undefined)
                                            quantitySerial = line_item.serials.length;
                                        if (quantitySerial > lineItem.quantity) {
                                            Sapo.Flash.error("Số lượng serial đang lớn hơn số lượng sản phẩm!");
                                            $("#disabled-action").css("z-index", "0");
                                            $("#disabled-action").hide();
                                            return
                                        }
                                        lineItem.serials = line_item.serials;
                                    }

                                    draftOrder.orderLineItems.push(lineItem);
                                }
                            }
                        }
                        else {
                            Sapo.Flash.error("Vui lòng chọn sản phẩm vào đơn hàng!");
                            $("#disabled-action").css("z-index", "0");
                            $("#disabled-action").hide();
                            return
                        }
                    }
                    else {
                        Sapo.Flash.error("Vui lòng chọn sản phẩm vào đơn hàng!");
                        $("#disabled-action").css("z-index", "0");
                        $("#disabled-action").hide();
                        return
                    }

                    draftOrder.sourceId = that.order.web_source_id;
                    //draftOrder.account_name = that.order.accounts[that.order.account_id].full_name;
                    draftOrder.account_name = "";
                    draftOrder.offlineTotalAmount = Math.round(that.totalMoneyReturnAmout());
                    draftOrder.offlineTotal = that.totalMoneyItem();
                    draftOrder.offlinePaymentCustomer = 0;
                    draftOrder.offlineMoneyReturn = 0;
                    draftOrder.currency = order.currency;

                    draftOrder.offlineTotalTax = money(that.totalVat(), order.currency.delimiter, order.currency.separator, order.currency.precision, order.currency.symbol);
                    console.log(order.payments)
                    if (order.payments != null && order.payments != undefined) {

                        draftOrder.payments = [];
                        var totalMoney = 0;
                        for (var p = 0; p < order.payments.length; p++) {
                            var payment = {};
                            payment.name = order.payments[p].name;
                            if (order.payments[p].type == "point" && order.payments[p].amount > 0) {
                                Sapo.Flash.error("Đơn hàng đang thanh toán bằng điểm không xử lý offline!");
                                $("#disabled-action").css("z-index", "0");
                                $("#disabled-action").hide();
                                return
                            }
                            if (order.payments[p].type == "online" && order.payments[p].amount > 0) {
                                Sapo.Flash.error("Đơn hàng đang thanh toán online không xử lý offline!");
                                $("#disabled-action").css("z-index", "0");
                                $("#disabled-action").hide();
                                return
                            }
                            if (p != order.payments.length - 1) {
                                if ((totalMoney + order.payments[p].amount) >= draftOrder.offlineTotalAmount) {
                                    payment.amount = draftOrder.offlineTotalAmount - totalMoney;
                                    payment.paidAmount = order.payments[p].amount;
                                    payment.returnedAmount = payment.paidAmount - payment.amount;
                                } else {
                                    payment.amount = order.payments[p].amount;
                                    payment.paidAmount = order.payments[p].amount;
                                    payment.returnedAmount = 0;
                                }
                            }
                            else {
                                if (that.loadMoneyReturn() - draftOrder.offlineTotalAmount > 0) {
                                    payment.returnedAmount = that.loadMoneyReturn() - draftOrder.offlineTotalAmount;
                                    payment.amount = order.payments[p].amount - payment.returnedAmount;
                                    payment.paidAmount = order.payments[p].amount;
                                }
                                else {
                                    payment.amount = order.payments[p].amount;
                                    payment.paidAmount = order.payments[p].amount;
                                    payment.returnedAmount = 0;
                                }
                            }
                            payment.paymentMethodId = order.payments[p].id;
                            payment.taxTypeId = order.tax_type_id;
                            payment.currencyId = order.currency_id;
                            //payment.paidOn = Sapo.forMatDatePicker(new Date());
                            payment.paidOn = null
                            if (payment.amount > 0) {
                                draftOrder.payments.push(payment);
                            }
                            totalMoney += payment.amount;
                            draftOrder.offlinePaymentCustomer += payment.paidAmount;
                            draftOrder.offlineMoneyReturn += payment.returnedAmount;
                        }
                    }
                    draftOrder.discount_items = draftOrder.discountItems;
                    draftOrder.prePayments = draftOrder.payments;
                    Sapo.WaitingSubmit();
                    draftOrder.id = 0;
                    var rq = Order.repository.store(draftOrder,
                        function (result, modelorder) {
                            if (order.print_order) {
                                console.log(modelorder)
                                that.openPrintFormoffline(modelorder);
                            } else {
                                Sapo.Flash.notice("Tạo đơn hàng thành công");
                            }
                            that.deleteActiveOrder();
                            that.setIndexOrders();
                            that.setTabOrderActive();

                            Sapo.Submit();

                            window.focus();
                            $("#disabled-action").css("z-index", "0");
                            $("#disabled-action").hide();
                        },
                        function (error) {
                            Sapo.Flash.error("Tạo đơn hàng thất bại");
                            $("#disabled-action").css("z-index", "0");
                            $("#disabled-action").hide();

                        }
                    )
                }

                PosOrder.prototype.addCustomerOffline = function () {
                    $(".addCustomerOffline").addClass("disabled").html(Sapo.LOADING);
                    var newCustomer = {};
                    var that = this;
                    if (!$("#sapo-modal-container #form-submit-value").valid()) {
                        $(".addCustomerOffline").removeClass("disabled").html("Thêm");
                        return;
                    }
                    newCustomer.id = 0;
                    newCustomer.name = $("#sapo-modal-container #Name").val();
                    newCustomer.name_translate = $("#sapo-modal-container #Name").val();
                    newCustomer.phone_number = $("#sapo-modal-container #PhoneNumber").val();
                    newCustomer.email = $("#sapo-modal-container #CustomerEmail").val();
                    newCustomer.sex = $("#sapo-modal-container #sex option:selected").val();
                    newCustomer.dob = $("#sapo-modal-container #birth_transdate").val();
                    newCustomer.customer_group_id = null
                    newCustomer.group_name = $("#sapo-modal-container #GroupName").val();
                    newCustomer.default_discount_rate = 0;

                    var rq = Customer.repository.store(newCustomer,
                        function (data) {
                            Sapo.Flash.notice("Thêm mới khách hàng thành công");
                            newCustomer.local_customer_id = data;
                            newCustomer.local_id = data;
                            that.setCustomer(newCustomer);
                            Sapo.NewModal.hide();
                            $(".addCustomerOffline").removeClass("disabled").html("Thêm");
                        },
                        function (error) {
                            Sapo.Flash.error(error);
                            $(".addCustomerOffline").removeClass("disabled").html("Thêm");
                        }

                    )

                }

                PosOrder.prototype.offlineGetPayments = function () {
                    var rq = PaymentMethod.dao.getAll(function (data) { });
                    return rq;
                }
                PosOrder.prototype.offlineGetorder = function (orderid) {

                    var rq = Order.dao.getById(request, "id", orderid,
                        function (data) {
                            response(array);
                        },
                        function (error) {
                        })
                    return rq;
                }
                PosOrder.prototype.offlineGetTenantSetting = function () {
                    var rq = TenantSetting.dao.getByTenantId(request, "tenant_id", this.order.tenantId,
                        function (data) {
                            response(array);
                        },
                        function (error) {
                        })
                    return rq;
                }

                PosOrder.prototype.offlineGetPriceLists = function () {
                    var rq = PriceList.dao.get(request,
                        function (data) {
                            response(array);
                        })
                }



                /// Khuyến mại

                PosOrder.prototype.getPromotion = function (onsuccess) {
                    var order = this.initTabActive();
                    $("#promotion-satisfy-order-details").html("");
                    $("#block-no-promotion").css({ "display": "none" });
                    $("#block-loading").css({ "display": "block" });
                    var customer = Object.assign({}, order.customer);
                    order = this.buildDraftOrder("draft", false);
                    if (order != null && order != undefined) {
                        var orderRequestForPromotion = generateOrderRequestForPromotion(order, customer);
                        $.ajax({
                            type: 'POST',
                            url: ajaxUrls.getPromotions,
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(orderRequestForPromotion),
                            dataType: "json",
                            processData: false,
                            global: false,
                            success: function (data) {
                                $("#block-loading").css({ "display": "none" });
                                if (data == null || data.length == 0) $("#block-no-promotion").css({ "display": "block" });
                                else $("#block-no-promotion").css({ "display": "none" });
                                onsuccess(data);
                            },
                            error: function (error) {
                                $("#block-loading").css({ "display": "none" });
                                alert("Có lỗi xảy ra");
                            }
                        });
                    } else {
                        $("#block-loading").hide();
                        $("#block-no-promotion").show()
                    }

                }

                function generateOrderRequestForPromotion(order, customer) {

                    if (order == undefined || order == null) return;
                    var requestForPromotion = {};
                    if (customer != undefined && customer != null && customer.id > 0) {
                        requestForPromotion.CustomerSex = customer.sex;
                        requestForPromotion.CustomerDob = customer.dob
                        requestForPromotion.CustomerGroupId = customer.customer_group_id;
                        requestForPromotion.CustomerAssigneeId = customer.assignee_id;
                        if (customer.tags != null && customer.tags != undefined && customer.tags.length > 0)
                            requestForPromotion.customerTags = customer.tags.join();
                    }
                    requestForPromotion.locationId = order.locationId;
                    requestForPromotion.customerId = order.customerId;
                    requestForPromotion.sourceId = order.sourceId;
                    requestForPromotion.orderLineItems = [];
                    for (i = 0; i < order.orderLineItems.length; i++) {
                        var lineItem = order.orderLineItems[i];
                        if (lineItem == null || lineItem == undefined)
                            continue;
                        var lineItemRequest = {};
                        lineItemRequest.productId = lineItem.productId;
                        lineItemRequest.variantId = lineItem.variantId;
                        lineItemRequest.quantity = lineItem.quantity;
                        var value = lineItem.discountRate > 0 ? ((lineItem.discountRate * lineItem.price) / 100) : lineItem.discountValue
                        lineItemRequest.price = lineItem.price - parseInt(value);
                        lineItemRequest.categoryId = lineItem.categoryId;
                        lineItemRequest.brandId = lineItem.brandId;
                        var isForLoyalty = lineItem.isForLoyalty;
                        if ((isForLoyalty == undefined || isForLoyalty == null || isForLoyalty == false)/* && !lineItem.composite*/)
                            lineItemRequest.ignoredCheck = false;
                        else
                            lineItemRequest.ignoredCheck = true;
                        requestForPromotion.orderLineItems.push(lineItemRequest);
                    }
                    return requestForPromotion;
                }

                PosOrder.prototype.activePromotionTab = function () {
                    var that = this;
                    $('#tab-content').addClass('flex-tab-content');
                    this.getPromotion(function (data) {
                        var order = that.initTabActive();
                        $("#promotion-satisfy-order-details").html("");
                        if (data != null && data.promotion_for_order_models != undefined && data.promotion_for_order_models.length > 0) {
                            if (data.promotion_for_order_models.filter(function (element) {
                                return element.status == "active" && (element.type == "category_and_quantity" ||
                                    element.type == "category_and_quantity_range")
                            }).length > 0) {
                                if (data.order_line_items != undefined && data.order_line_items.length > 0) {
                                    data.order_line_items.forEach(function (line, indexLine) {
                                        order.order_line_items.forEach(function (lineOrder, indexLineOrder) {
                                            if (lineOrder != null && line.variant_id == lineOrder.variant_id) {
                                                lineOrder.category_id = line.category_id;
                                                lineOrder.brand_id = line.brand_id;
                                            }
                                        })
                                    })
                                }
                            }
                            that.filterPromotionByOrder(data.promotion_for_order_models, data.order_line_items, order, that)
                        } else {
                            $("#block-no-promotion").show()
                            return;
                        }
                        if (data == null || data.length == 0)
                            return;

                    });
                }
                PosOrder.prototype.filterPromotionByOrder = function (data, order_line_items, order, thiz) {
                    var promotionCategory = _.filter(data, function (o) { return o.list_category != null && o.list_category.length > 0 });
                    if (promotionCategory.length > 0) {
                        order.list_category = promotionCategory[0].list_category;
                    }
                    var listPromotion = data.filter(function (element) {
                        return element.status == "active" && (element.type == "order_amount_ranges"
                            || element.type == "gift_group_by_amount" || element.type == "gift_right_by_amount" || element.type == "gift_group_category_by_amount")
                    });
                    if (listPromotion == null || listPromotion == undefined) {
                        listPromotion = [];
                    }
                    if (data != null && data.length > 0) {
                        data.forEach(function (item, index) {

                            if (item.type == "variant_and_quantity" || item.type == "category_and_quantity" || item.type == "brand_and_quantity") {
                                // check sản phẩm, nhom,nhan hieu trong đơn
                                var object_quantity_line_items = [];
                                if (item.object_quantity_line_items != null && item.object_quantity_line_items.length > 0) {
                                    item.object_quantity_line_items.forEach(function (lineItem, indexLine) {
                                        if (lineItem.object_id != null) {
                                            var checkAdd = true;
                                            order_line_items.forEach(function (orderLine, indexOrderLine) {
                                                if (item.type == "variant_and_quantity") {
                                                    if (checkAdd && orderLine != null && orderLine.variant_id == lineItem.object_id && orderLine.quantity >= lineItem.quantity_min) {
                                                        if (lineItem.quantity_limit == null || (orderLine.quantity + lineItem.consumed_quantity <= lineItem.quantity_limit)) {
                                                            object_quantity_line_items.push(lineItem);
                                                            checkAdd = false;
                                                        }

                                                    }
                                                }
                                                else if (item.type == "category_and_quantity") {
                                                    if (checkAdd && orderLine != null && orderLine.category_id == lineItem.object_id && orderLine.quantity >= lineItem.quantity_min) {
                                                        if (lineItem.quantity_limit == null || (orderLine.quantity + lineItem.consumed_quantity <= lineItem.quantity_limit)) {
                                                            object_quantity_line_items.push(lineItem);
                                                            checkAdd = false;
                                                        }

                                                    }
                                                } else if (item.type == "brand_and_quantity") {
                                                    if (checkAdd && orderLine != null && orderLine.brand_id == lineItem.object_id && orderLine.quantity >= lineItem.quantity_min) {
                                                        if (lineItem.quantity_limit == null || (orderLine.quantity + lineItem.consumed_quantity <= lineItem.quantity_limit)) {
                                                            object_quantity_line_items.push(lineItem);
                                                            checkAdd = false;
                                                        }
                                                    }
                                                }
                                            })
                                        }
                                        else {
                                            var checkAdd = false;
                                            order_line_items.forEach(function (orderLine, indexOrderLine) {
                                                if (orderLine != null && orderLine.variant_id != null && orderLine.quantity >= lineItem.quantity_min && (lineItem.quantity_limit == null || (orderLine.quantity + lineItem.consumed_quantity <= lineItem.quantity_limit))) {
                                                    checkAdd = true;
                                                }
                                            })
                                            if (checkAdd) {
                                                object_quantity_line_items.push(lineItem);
                                            }
                                        }
                                    })
                                }
                                if (object_quantity_line_items.length > 0) {
                                    item.object_quantity_line_items = object_quantity_line_items;
                                    listPromotion.push(item)
                                }
                            }
                            else if (item.type == "variant_and_quantity_range" || item.type == "category_and_quantity_range" || item.type == "brand_and_quantity_range") {
                                // check sản phẩm, nhom,nhan hieu trong đơn theo range
                                var object_quantity_range_line_items = []
                                if (item.object_quantity_range_line_items != null && item.object_quantity_range_line_items.length > 0) {
                                    item.object_quantity_range_line_items.forEach(function (lineItem, indexLine) {
                                        if (lineItem.sub_line_items != null && lineItem.sub_line_items != undefined && lineItem.sub_line_items.length > 0) {
                                            var sub = [];
                                            if (lineItem.object_id != null) {
                                                order_line_items.forEach(function (orderLine, indexOrderLine) {
                                                    if (item.type == "variant_and_quantity_range") {
                                                        if (orderLine != null && orderLine.variant_id == lineItem.object_id) {
                                                            lineItem.sub_line_items.forEach(function (subLine, indexSub) {
                                                                if (orderLine.quantity >= subLine.quantity_min && (orderLine.quantity <= subLine.quantity_limit || subLine.quantity_limit == null)) {
                                                                    sub.push(subLine)
                                                                }
                                                            })
                                                        }
                                                    }
                                                    else if (item.type == "category_and_quantity_range") {
                                                        if (orderLine != null && orderLine.category_id == lineItem.object_id) {
                                                            lineItem.sub_line_items.forEach(function (subLine, indexSub) {
                                                                if (orderLine.quantity >= subLine.quantity_min && (orderLine.quantity <= subLine.quantity_limit || subLine.quantity_limit == null)) {
                                                                    sub.push(subLine)
                                                                }
                                                            })
                                                        }
                                                    } else if (item.type == "brand_and_quantity_range") {
                                                        if (orderLine != null && orderLine.brand_id == lineItem.object_id) {
                                                            lineItem.sub_line_items.forEach(function (subLine, indexSub) {
                                                                if (orderLine.quantity >= subLine.quantity_min && (orderLine.quantity <= subLine.quantity_limit || subLine.quantity_limit == null)) {
                                                                    sub.push(subLine)
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                            else {
                                                order_line_items.forEach(function (orderLine, indexOrderLine) {
                                                    if (orderLine != null && orderLine.variant_id != null) {
                                                        lineItem.sub_line_items.forEach(function (subLine, indexSub) {
                                                            if (orderLine.quantity >= subLine.quantity_min && (orderLine.quantity <= subLine.quantity_limit || subLine.quantity_limit == null)) {
                                                                sub.push(subLine)
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            if (sub.length > 0) {
                                                lineItem.sub_line_items = sub;
                                                object_quantity_range_line_items.push(lineItem)
                                            }
                                        }
                                    })
                                }
                                if (object_quantity_range_line_items.length > 0) {
                                    item.object_quantity_range_line_items = object_quantity_range_line_items;
                                    listPromotion.push(item)
                                }
                            }
                            else if (item.type == 'buy_right_gift_right' || item.type == 'buy_right_gift_group' || item.type == 'buy_right_gift_category') {
                                var object_condition_line_items = []
                                if (item.object_condition_line_items != null && item.object_condition_line_items.length > 0) {
                                    item.object_condition_line_items.forEach(function (lineItem, indexLine) {
                                        if (lineItem != null && lineItem.sub_line_items_x != null && lineItem.sub_line_items_x.length > 0) {
                                            var checkAdd = false;
                                            for (var i = 0; i < lineItem.sub_line_items_x.length; i++) {
                                                var lineX = lineItem.sub_line_items_x[i];
                                                var checkExist = false;
                                                order_line_items.forEach(function (orderLine, indexOrderLine) {
                                                    if (!checkExist) {
                                                        if (orderLine != null && orderLine.variant_id == lineX.object_id && orderLine.quantity >= lineX.quantity) {
                                                            lineX.order_quantity = orderLine.quantity;
                                                            checkExist = true;
                                                        } else {
                                                            checkExist = false;
                                                        }
                                                    }
                                                })
                                                if (checkExist) {
                                                    if (i == lineItem.sub_line_items_x.length - 1) {
                                                        checkAdd = true;
                                                        break;
                                                    }
                                                    continue;
                                                } else {
                                                    break
                                                }
                                            }
                                            if (checkAdd) {
                                                object_condition_line_items.push(lineItem)
                                            }
                                        }
                                    })
                                }
                                if (object_condition_line_items.length > 0) {
                                    item.object_condition_line_items = object_condition_line_items;
                                    listPromotion.push(item)
                                }
                            }
                            else if (item.type == 'buy_group_gift_group' || item.type == 'buy_group_gift_right' || item.type == 'buy_category_gift_right' || item.type == 'buy_group_category_gift_group' || item.type == 'buy_group_gift_group_category' || item.type == 'buy_group_category_gift_group_category') {
                                var object_condition_line_items = []
                                if (item.object_condition_line_items != null && item.object_condition_line_items.length > 0) {
                                    item.object_condition_line_items.forEach(function (lineItem, indexLine) {
                                        if (lineItem != null && lineItem.sub_line_items_x != null && lineItem.sub_line_items_x.length > 0) {
                                            var checkAdd = false;
                                            for (var i = 0; i < lineItem.sub_line_items_x.length; i++) {
                                                var lineX = lineItem.sub_line_items_x[i];
                                                var checkExist = false;
                                                if (item.type != 'buy_category_gift_right' && item.type != 'buy_group_category_gift_group' && item.type != 'buy_group_category_gift_group_category') {
                                                    order_line_items.forEach(function (orderLine, indexOrderLine) {
                                                        if (!checkExist) {
                                                            if (orderLine != null && orderLine.variant_id == lineX.object_id && orderLine.quantity >= lineX.quantity) {
                                                                lineX.order_quantity = orderLine.quantity;
                                                                checkExist = true;
                                                            } else {
                                                                checkExist = false;
                                                            }
                                                        } else {
                                                            if (orderLine != null && orderLine.variant_id == lineX.object_id && orderLine.quantity >= lineX.quantity) {
                                                                lineX.order_quantity = orderLine.quantity;
                                                                checkExist = true;
                                                            }
                                                        }
                                                    })
                                                }
                                                else {
                                                    order_line_items.forEach(function (orderLine, indexOrderLine) {
                                                        if (!checkExist) {
                                                            if (orderLine != null && orderLine.category_id == lineX.object_id && orderLine.quantity >= lineX.quantity) {
                                                                lineX.order_quantity = orderLine.quantity;
                                                                checkExist = true;
                                                            } else {
                                                                checkExist = false;
                                                            }
                                                        } else {
                                                            if (orderLine != null && orderLine.category_id == lineX.object_id && orderLine.quantity >= lineX.quantity) {
                                                                lineX.order_quantity = orderLine.quantity;
                                                                checkExist = true;
                                                            }
                                                        }
                                                    })
                                                }

                                                if (checkExist) {
                                                    checkAdd = true;
                                                    //break;
                                                }
                                            }
                                            if (checkAdd) {
                                                lineItem.sub_line_items_x = lineItem.sub_line_items_x.filter(function (element) {
                                                    return element.order_quantity != null && element.order_quantity != undefined && element.order_quantity > 0
                                                })
                                                object_condition_line_items.push(lineItem)
                                            }
                                        }
                                    })
                                }
                                if (object_condition_line_items.length > 0) {
                                    item.object_condition_line_items = object_condition_line_items;
                                    listPromotion.push(item)
                                }
                            }

                        })
                    }
                    data = listPromotion;
                    //that.list_promotions = data;
                    if (data != null && data.length > 0) {
                        order.list_promotions = data;
                        var html = "";
                        for (var i = 0; i < data.length; i++) {
                            var promotion = data[i];
                            html += thiz.showPromotionObjectGift(promotion);
                        }
                        $("#promotion-satisfy-order-details").html(html);
                        var order = that.initTabActive();
                        Bindings.unbind($("#promotion-satisfy-order-details")[0]);
                        Bindings.bind($("#promotion-satisfy-order-details")[0]);

                        if (order.promotion_id != null) {
                            $("#" + order.promotion_id).attr("checked", "checked");
                        }
                    } else {
                        $("#block-no-promotion").show()
                    }
                }
                PosOrder.prototype.showPromotionObjectGift = function (promotion) {
                    if (promotion.type == 'buy_right_gift_right')
                        promotion.type_vn = "Mua đích danh sản phẩm tặng đích danh sản phẩm";
                    else if (promotion.type == 'buy_right_gift_group')
                        promotion.type_vn = "Mua đích danh sản phẩm tặng bất kỳ sản phẩm";
                    else if (promotion.type == 'buy_group_gift_right')
                        promotion.type_vn = "Mua bất kỳ sản phẩm tặng đích danh sản phẩm";
                    else if (promotion.type == 'buy_group_gift_group')
                        promotion.type_vn = "Mua bất kỳ sản phẩm tặng bất kỳ sản phẩm";
                    else if (promotion.type == 'gift_right_by_amount')
                        promotion.type_vn = "Mua tổng tiền tặng đích danh sản phẩm";
                    else if (promotion.type == 'gift_group_by_amount')
                        promotion.type_vn = "Mua tổng tiền tặng bất kỳ sản phẩm";

                    else if (promotion.type == "order_amount_ranges")
                        promotion.type_vn = "Khuyến mại theo tổng đơn";

                    else if (promotion.type == "variant_and_quantity")
                        promotion.type_vn = "Khuyến mại theo sản phẩm";
                    else if (promotion.type == "category_and_quantity")
                        promotion.type_vn = "Khuyến mại theo danh mục";
                    else if (promotion.type == "brand_and_quantity")
                        promotion.type_vn = "Khuyến mại theo nhãn hiệu";

                    else if (promotion.type == "variant_and_quantity_range")
                        promotion.type_vn = "Khuyến mại theo số lượng sản phẩm";
                    else if (promotion.type == "category_and_quantity_range")
                        promotion.type_vn = "Khuyến mại theo số lượng danh mục";
                    else if (promotion.type == "brand_and_quantity_range")
                        promotion.type_vn = "Khuyến mại theo số lượng nhãn hiệu";

                    else if (promotion.type == 'buy_right_gift_category')
                        promotion.type_vn = "Mua đích danh sản phẩm tặng bất kỳ loại sản phẩm";
                    else if (promotion.type == 'buy_category_gift_right')
                        promotion.type_vn = "Mua bất kỳ loại sản phẩm tặng đích danh sản phẩm";
                    else if (promotion.type == 'buy_group_gift_group_category')
                        promotion.type_vn = "Mua bất kỳ sản phẩm tặng bất kỳ loại sản phẩm";
                    else if (promotion.type == 'buy_group_category_gift_group')
                        promotion.type_vn = "Mua bất kỳ loại sản phẩm tặng bất kỳ sản phẩm";
                    else if (promotion.type == 'buy_group_category_gift_group_category')
                        promotion.type_vn = "Mua bất kỳ loại sản phẩm tặng bất kỳ loại sản phẩm";
                    else if (promotion.type == 'gift_group_category_by_amount')
                        promotion.type_vn = "Mua tổng tiền tặng bất kỳ loại sản phẩm";

                    var html = '<div class="promotion-element">' +
                        '<div style="margin-top: -10px; width: 10%;">' +
                        '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                        '<input class="promotion-radio-present sapo-radiobox__input" type="radio" selected-id=' + promotion.id + ' name="promotionId" value-name = "' + promotion.name + '" value-type= "' + promotion.type_vn + '"  id=' + promotion.id + ' bind-event-click="choosePromotion(this)">' +
                        '<span class="sapo-radiobox__icon"></span>' +
                        '</span>' +
                        '</div>' +
                        '<div style="flex-grow:1;">' +
                        '<p style="font-size: 14px; font-weight: 500; color: #333">' + promotion.name + '</p>' +
                        '<p style="font-size: 12.5px;">' + promotion.type_vn + '</p>' +
                        '</div>' +
                        '</div>';
                    return html;
                }
                PosOrder.prototype.getPromotionOrderClone = function (id) {
                    var that = this;
                    this.getPromotion(function (data) {
                        if (data == null || data.length == 0)
                            return;
                        var order = that.initTabActive();
                        $("#promotion-satisfy-order-details").html("");
                        for (i = 0; i < data.length; i++) {
                            var promotion = data[i];
                            var html =
                                '<div class="promotion-element">' +
                                '<div style="margin-top: -10px; width: 10%;">' +
                                '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                '<input class="promotion-radio-present" type="radio" name="promotionId" value-name = "' + promotion.promotion_name + '" value-type= "' + promotion.translated_type + '" id=' + promotion.promotion_id + ' bind-event-click="choosePromotion(this)">' +
                                '<span class="sapo-radiobox__icon"></span>' +
                                '</span>' +
                                '</div>' +
                                '<div style="flex-grow:1;">' +
                                '<p style="font-size: 14px; font-weight: 500; color: #333">' + promotion.promotion_name + '</p>' +
                                '<p style="font-size: 12.5px;">' + promotion.translated_type + '</p>' +
                                '</div>' +
                                '</div>';
                            $("#promotion-satisfy-order-details").append(html);
                        }
                        Bindings.unbind($("#promotion-satisfy-order-details")[0]);
                        Bindings.bind($("#promotion-satisfy-order-details")[0]);

                        if (order.selected_promotion_id != null) {
                            $("#" + order.selected_promotion_id).attr("checked", "checked");
                        }
                        that.choosePromotionByIdPromotion(id);
                        Bindings.refreshImmediately();
                    });
                }


                PosOrder.prototype.inactivePromotionTab = function () {
                    $("#promotion-satisfy-order-presentation").removeClass("active");
                    $("#promotion-satisfy-order").removeClass("active");
                    $("#li-promotion-satisfy-order").removeClass("active");
                    $("#payment-order-presentation").addClass("active");
                    $("#payment-order").addClass("active");
                    $("#li-payment-order").addClass("active");
                    $('#tab-content').removeClass('flex-tab-content');
                    $("#promotion-satisfy-order-details").html("");
                }
                PosOrder.prototype.activePaymentTab = function () {
                    $('#tab-content').removeClass('flex-tab-content');
                }

                PosOrder.prototype.choosePromotion = function (radio) {
                    var order = this.initTabActive();
                    var elemment = $(radio);
                    var promotionId = elemment.attr("selected-id");
                    var promotion = {};
                    if (order.list_promotions.length > 0) {
                        for (var i = 0; i < order.list_promotions.length; i++) {
                            if (promotionId == order.list_promotions[i].id) {
                                promotion = order.list_promotions[i];
                                promotion.condition_item_selects = [];
                                break;
                            }
                        }
                    }
                    order.promotion_select = promotion;

                    this.selectPromotion(promotionId);
                }
                PosOrder.prototype.selectPromotion = function (radioId) {

                    var that = this;
                    var order = this.initTabActive();
                    if (order.promotion_select == undefined) {
                        var promotionId = $('input[name=PromotionId]:checked', '#tbody-table-list-condition').attr("selected-id");
                        if (order.list_promotions.length > 0) {
                            for (var i = 0; i < order.list_promotions.length; i++) {
                                if (promotionId == order.list_promotions[i].id) {
                                    order.promotion_select = order.list_promotions[i];
                                    break;
                                }
                            }
                        }
                    }
                    var promotion = order.promotion_select;
                    var listPromotionForOrder;
                    if (promotion.type == 'buy_right_gift_category'
                        || promotion.type == 'buy_group_gift_group_category'
                        || promotion.type == 'buy_group_category_gift_group_category'
                        || promotion.type == 'gift_group_category_by_amount') {
                        $.ajax({
                            url: ajaxUrls.variantInCategory,
                            type: "GET",
                            data: { listCategory: order.list_category.toString() },
                            dataType: "json",
                            success: function (data) {
                                let listVariantInCategory = data;
                                if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                                    for (let i = 0; i < promotion.object_condition_line_items.length; i++) {
                                        let lineItem = promotion.object_condition_line_items[i];
                                        lineItem.list_variant_x = [];
                                        lineItem.list_variant_y = [];
                                        if (lineItem.sub_line_items_x != null && lineItem.sub_line_items_x.length > 0) {
                                            for (let j = 0; j < lineItem.sub_line_items_x.length; j++) {
                                                let lineX = lineItem.sub_line_items_x[j];
                                                if (lineX.type == "category") {
                                                    lineX.variants = _.filter(listVariantInCategory, function (o) { return o.category_id == lineX.object_id });
                                                    lineItem.list_variant_x = $.merge(lineItem.list_variant_x, lineX.variants);
                                                }
                                            }
                                        }
                                        if (lineItem.sub_line_items_y != null && lineItem.sub_line_items_y.length > 0) {
                                            for (let j = 0; j < lineItem.sub_line_items_y.length; j++) {
                                                let lineY = lineItem.sub_line_items_y[j];
                                                if (lineY.type == "category") {
                                                    lineY.variants = _.filter(listVariantInCategory, function (o) { return o.category_id == lineY.object_id });
                                                    lineItem.list_variant_y = $.merge(lineItem.list_variant_y, lineY.variants);
                                                }
                                            }
                                        }
                                        if (promotion.type == 'gift_group_category_by_amount') {
                                            if (lineItem.sub_line_items != null && lineItem.sub_line_items.length > 0) {
                                                for (let j = 0; j < lineItem.sub_line_items.length; j++) {
                                                    let line = lineItem.sub_line_items[j];
                                                    if (line.type == "category") {
                                                        line.variants = _.filter(listVariantInCategory, function (o) { return o.category_id == line.object_id });
                                                        lineItem.list_variant_y = $.merge(lineItem.list_variant_y, line.variants);
                                                    }
                                                }
                                            }
                                        }
                                    }

                                }
                                that.showPopUpPromotion.show();
                                that.setHtmlDetailPromotion(promotion);
                                listPromotionForOrder = Twine.context($('body').get(0)).draftOrder.showPromotionForOrder;
                                listPromotionForOrder.promotion_select = order.promotion_select;
                                listPromotionForOrder.list_promotions = order.list_promotions;
                            },
                            error: function (data) {
                                if (data.status == 403) {

                                    Utility.handleForbiddenRequest(false); return;
                                }
                                Flash.error(data.responseJSON.error.replace(/\n/g, '; ').replace(/;|$|{|}|"/g, ''));
                            }
                        });


                    }
                    else if (promotion.type == 'buy_right_gift_right' || promotion.type == 'buy_right_gift_group' || promotion.type == 'buy_group_gift_right'
                        || promotion.type == 'buy_group_gift_group' || promotion.type == 'gift_right_by_amount' || promotion.type == 'gift_group_by_amount'
                        || promotion.type == 'buy_category_gift_right' || promotion.type == 'buy_group_category_gift_group') {
                        this.showPopUpPromotion.show();
                        this.setHtmlDetailPromotion(promotion);
                        listPromotionForOrder = Twine.context($('body').get(0)).draftOrder.showPromotionForOrder;
                        listPromotionForOrder.promotion_select = order.promotion_select;
                        listPromotionForOrder.list_promotions = order.list_promotions;
                    }
                    else {
                        var orderLineItem = order.order_line_items;
                        if (promotion.type == Sapo.Const.TypePromotion.ORDER_AMOUNT_RANGES) {
                            // Xóa hết các KM đang sử dụng
                            that.resetPromotion();

                            //add vào order

                            var discountItem = {};
                            discountItem.discount_value = promotion.total_amount_line_items[0].discount_value_tmp;
                            discountItem.discount_value_tmp = promotion.total_amount_line_items[0].discount_value_tmp;
                            discountItem.is_discount_percent_tmp = promotion.total_amount_line_items[0].is_discount_percent_tmp;
                            discountItem.is_discount_percent = promotion.total_amount_line_items[0].is_discount_percent_tmp;
                            discountItem.position = order.discount_items.length;
                            discountItem.source = Sapo.Const.DiscountSource.PROMOTION_PROGRAM;
                            discountItem.allow_discount = true;
                            discountItem.condition_id = promotion.total_amount_line_items[0].condition_id
                            that.addDiscountPromotionItemIntoOrder(discountItem, promotion);

                        }
                        else if (promotion.type == "variant_and_quantity" || promotion.type == "category_and_quantity" || promotion.type == "brand_and_quantity") {
                            // Xóa hết các KM đang sử dụng
                            that.resetPromotion();
                            // add mới
                            orderLineItem.forEach(function (orderLine, indexLine) {
                                if (orderLine != null) {
                                    orderLine.quantity = parseFloat(orderLine.quantity)
                                    for (var i = 0; i < promotion.object_quantity_line_items.length; i++) {
                                        lineItem = promotion.object_quantity_line_items[i];
                                        if (lineItem.object_id != null) {
                                            if (promotion.type == "variant_and_quantity") {
                                                if (orderLine.variant_id == lineItem.object_id && orderLine.quantity >= lineItem.quantity_min
                                                    && (lineItem.quantity_limit == null || (orderLine.quantity + lineItem.consumed_quantity <= lineItem.quantity_limit))) {
                                                    that.setDiscountPromotion(orderLine, lineItem, promotion.id)
                                                    break;
                                                }
                                            }
                                            else if (promotion.type == "category_and_quantity") {
                                                if (orderLine.category_id == lineItem.object_id && orderLine.quantity >= lineItem.quantity_min
                                                    && (lineItem.quantity_limit == null || (orderLine.quantity + lineItem.consumed_quantity <= lineItem.quantity_limit))) {
                                                    that.setDiscountPromotion(orderLine, lineItem, promotion.id)
                                                    break;
                                                }
                                            }
                                            else if (promotion.type == "brand_and_quantity") {
                                                if (orderLine.brand_id == lineItem.object_id && orderLine.quantity >= lineItem.quantity_min
                                                    && (lineItem.quantity_limit == null || (orderLine.quantity + lineItem.consumed_quantity <= lineItem.quantity_limit))) {
                                                    that.setDiscountPromotion(orderLine, lineItem, promotion.id)
                                                    break;
                                                }
                                            }
                                        }
                                        else {
                                            if (orderLine.variant_id != null && orderLine.quantity >= lineItem.quantity_min
                                                && (lineItem.quantity_limit == null || (orderLine.quantity + lineItem.consumed_quantity <= lineItem.quantity_limit))) {
                                                that.setDiscountPromotion(orderLine, lineItem, promotion.id)
                                                break;
                                            }
                                        }
                                    }
                                }
                            })

                        }
                        else if (promotion.type == "variant_and_quantity_range" || promotion.type == "category_and_quantity_range" || promotion.type == "brand_and_quantity_range") {
                            // Xóa hết các KM đang sử dụng
                            that.resetPromotion();
                            // add mới
                            orderLineItem.forEach(function (orderLine, indexLine) {
                                if (orderLine != null) {
                                    orderLine.quantity = parseFloat(orderLine.quantity)
                                    var object_quantity_range_line_items = []
                                    if (promotion.object_quantity_range_line_items != null && promotion.object_quantity_range_line_items.length > 0) {
                                        var checkContinue = true;
                                        for (var i = 0; i < promotion.object_quantity_range_line_items.length; i++) {
                                            if (!checkContinue) {
                                                break;
                                            }
                                            lineItem = promotion.object_quantity_range_line_items[i];
                                            if (lineItem.sub_line_items != null && lineItem.sub_line_items != undefined && lineItem.sub_line_items.length > 0) {
                                                if (lineItem.object_id != null) {
                                                    if (promotion.type == "variant_and_quantity_range") {
                                                        if (orderLine != null && orderLine.variant_id == lineItem.object_id) {

                                                            for (var j = 0; j < lineItem.sub_line_items.length; j++) {
                                                                subLine = lineItem.sub_line_items[j];
                                                                if (orderLine.quantity >= subLine.quantity_min && (orderLine.quantity <= subLine.quantity_limit || subLine.quantity_limit == null)) {
                                                                    that.setDiscountPromotion(orderLine, subLine, promotion.id)
                                                                    checkContinue = false;
                                                                    break
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else if (promotion.type == "category_and_quantity_range") {
                                                        if (orderLine != null && orderLine.category_id == lineItem.object_id) {

                                                            for (var j = 0; j < lineItem.sub_line_items.length; j++) {
                                                                subLine = lineItem.sub_line_items[j];
                                                                if (orderLine.quantity >= subLine.quantity_min && (orderLine.quantity <= subLine.quantity_limit || subLine.quantity_limit == null)) {
                                                                    that.setDiscountPromotion(orderLine, subLine, promotion.id)
                                                                    checkContinue = false;
                                                                    break
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else if (promotion.type == "brand_and_quantity_range") {
                                                        if (orderLine != null && orderLine.brand_id == lineItem.object_id) {
                                                            for (var j = 0; j < lineItem.sub_line_items.length; j++) {
                                                                subLine = lineItem.sub_line_items[j];
                                                                if (orderLine.quantity >= subLine.quantity_min && (orderLine.quantity <= subLine.quantity_limit || subLine.quantity_limit == null)) {
                                                                    that.setDiscountPromotion(orderLine, subLine, promotion.id)
                                                                    checkContinue = false;
                                                                    break
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (orderLine != null && orderLine.variant_id != null) {

                                                        for (var j = 0; j < lineItem.sub_line_items.length; j++) {
                                                            subLine = lineItem.sub_line_items[j];
                                                            if (orderLine.quantity >= subLine.quantity_min && (orderLine.quantity <= subLine.quantity_limit || subLine.quantity_limit == null)) {
                                                                that.setDiscountPromotion(orderLine, subLine, promotion.id)
                                                                checkContinue = false;
                                                                break
                                                            }
                                                        }
                                                    }
                                                }

                                            }
                                        }
                                    }
                                }
                            })
                        }
                        order.promotion_id = promotion.id;
                        order.promotion_type = promotion.type;
                        order.promotion_name = promotion.name;
                        order.promotion_code = promotion.code;
                    }

                }
                PosOrder.prototype.addDiscountPromotionItemIntoOrder = function (discountItem, promotionItem) {
                    var order = this.initTabActive();
                    this.setOrderDiscount(discountItem.discount_value, discountItem.is_discount_percent, promotionItem.id);
                    order.is_apply_promotion_discount = true;
                    //add thong tin condition de tao redemption

                    var promotion_discount = Object.assign({}, discountItem);
                    var valueDiscount = 0;
                    promotion_discount.beginAmount = this.totalMoneyItem();
                    if (discountItem.is_discount_percent) {
                        valueDiscount = parseFloat(discountItem.discount_value * (promotion_discount.beginAmount / 100));
                    } else {
                        valueDiscount = parseFloat(discountItem.discount_value);
                    }
                    promotion_discount.discountAmount = valueDiscount;
                    promotion_discount.quantity = 1;
                    promotion_discount.condition_id = discountItem.condition_id;
                    order.promotion_discounts.push(promotion_discount);


                }
                PosOrder.prototype.setDiscountPromotion = function (orderLine, linePromotion, promotionId) {
                    var order = this.initTabActive();
                    var discountItem = {};
                    discountItem.is_discount_percent_tmp = linePromotion.is_discount_percent_tmp;
                    discountItem.is_discount_percent = linePromotion.is_discount_percent_tmp;
                    if (discountItem.is_discount_percent) {
                        discountItem.discount_item_value_tmp = linePromotion.discount_value_tmp;
                        discountItem.discount_value = linePromotion.discount_value_tmp;
                    }
                    else {
                        discountItem.discount_item_value_tmp = parseFloat(linePromotion.discount_value_tmp)/* / orderLine.quantity*/;
                        discountItem.discount_value = parseFloat(linePromotion.discount_value_tmp)/* / orderLine.quantity*/;
                        discountItem.discount_value = Math.round(discountItem.discount_value);
                    }
                    discountItem.position = orderLine.discount_items.length;
                    discountItem.source = Sapo.Const.DiscountSource.PROMOTION_PROGRAM;
                    discountItem.allow_discount = true;

                    discountItem.condition_id = linePromotion.condition_id
                    orderLine.sub_index_saleoff = orderLine.discount_items.length;
                    that.addDiscountPromotionItemIntoLineItem(discountItem, promotionId, orderLine);
                }
                PosOrder.prototype.addDiscountPromotionItemIntoLineItem = function (discountItem, promotionId, lineItem) {
                    if (lineItem == undefined || lineItem == null)
                        return;
                    var order = this.initTabActive();
                    this.setOrderLineItemDiscount(lineItem, discountItem.discount_value, discountItem.is_discount_percent, promotionId);
                    lineItem.is_apply_promotion_discount = true;
                    //add thong tin condition de tao redemption

                    var promotion_discount = Object.assign({}, discountItem);
                    promotion_discount.condition_id = discountItem.condition_id;
                    var valueDiscount = 0;
                    promotion_discount.beginAmount = lineItem.price * lineItem.quantity;
                    if (discountItem.is_discount_percent) {
                        valueDiscount = parseFloat(discountItem.discount_value * (promotion_discount.beginAmount / 100));
                    } else {
                        valueDiscount = parseFloat(discountItem.discount_value) * lineItem.quantity;
                    }

                    promotion_discount.discountAmount = valueDiscount;
                    promotion_discount.quantity = lineItem.quantity;
                    order.promotion_discounts.push(promotion_discount);
                }
                PosOrder.prototype.setHtmlDetailPromotion = function (promotion) {
                    var that = this;
                    $(".fht-table-wrapper").remove()
                    $(".modal-header .ui-dialog-title").html("Danh sách hàng tặng");
                    $(".modal-footer").html("")
                    $(".modal-content .applyPromotion").show()
                    $(".modal-content #table-height").html('<div class="thead-scroll"></div>');
                    $(".modal-content #table-height").append('<div  class="tbody-scroll"></div>');
                    if (promotion.type == 'gift_right_by_amount') {
                        that.setHtmlDetailGiftRightByAmount(promotion)
                    }
                    else if (promotion.type == 'gift_group_by_amount') {
                        that.setHtmlDetailGiftGroupByAmount(promotion)
                    }
                    else if (promotion.type == 'buy_right_gift_right') {
                        that.setHtmlDetailBuyRightGiftRight(promotion)
                    }
                    else if (promotion.type == 'buy_right_gift_group') {
                        that.setHtmlDetailBuyRightGiftGroup(promotion)
                    }
                    else if (promotion.type == 'buy_group_gift_right') {
                        that.setHtmlDetailBuyGroupGiftRight(promotion)
                    }
                    else if (promotion.type == 'buy_group_gift_group') {
                        that.setHtmlDetailBuyGroupGiftGroup(promotion)
                    }
                    else if (promotion.type == 'buy_category_gift_right') {
                        that.setHtmlDetailBuyCategoryGiftRight(promotion)
                    }
                    else if (promotion.type == 'buy_right_gift_category') {
                        that.setHtmlDetailBuyRightGiftCategory(promotion)
                    }
                    else if (promotion.type == 'buy_right_gift_category') {
                        buy_group_gift_group_category
                        that.setHtmlDetailBuyRightGiftCategory(promotion)
                    }
                    else if (promotion.type == 'buy_group_gift_group_category') {
                        that.setHtmlDetailBuyGroupGiftGroupCategory(promotion)
                    }
                    else if (promotion.type == 'buy_group_category_gift_group') {
                        that.setHtmlDetailBuyGroupCategoryGiftGroup(promotion)
                    }
                    else if (promotion.type == 'buy_group_category_gift_group_category') {
                        that.setHtmlDetailBuyGroupCategoryGiftGroupCategory(promotion)
                    }
                    else if (promotion.type == 'gift_group_category_by_amount') {
                        that.setHtmlDetailGiftGroupCategoryByAmount(promotion)
                    }
                    Bindings.bind($("#modal-content .tbody-scroll").get(0));
                }
                PosOrder.prototype.setHtmlDetailBuyGroupGiftGroup = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('<div class="tr" >' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style="width: 15%" class="th">Mã SKU</div>' +
                        '<div style="width: calc(25% - 24px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right;border-right: 1px solid #dcdee2" class="th">' +
                        'SL mua' +
                        '</div > ' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style= "width: 15%" class="th" >Mã SKU</div>' +
                        '<div style= "width: calc(25% - 24px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right" class="th">' +
                        'SL tặng' +
                        '</div > ' +

                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            var htmlCondition = "";
                            var valueTo = "∞";
                            if (condition.value_to != null && condition.value_to != undefined) {
                                valueTo = money(condition.value_to, ".", ",", "0")
                            }
                            if (condition != null && condition.sub_line_items_x != null && condition.sub_line_items_x.length > 0
                                && condition.sub_line_items_y != null && condition.sub_line_items_y.length > 0) {
                                if (condition.sub_line_items_x.length >= condition.sub_line_items_y.length) {
                                    for (var i = 0; i < condition.sub_line_items_x.length; i++) {
                                        var htmlCheck = "";
                                        if (i == 0) {
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheck =
                                                    '<span class="sapo-checkbox" style="z-index: 8;">' +
                                                    '<input type="checkbox" class="sapo-checkbox__input" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-checkbox__checkmark"></span>' +
                                                    '</span>';

                                            } else {
                                                htmlCheck =
                                                    '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                    '<input type="radio" class="sapo-radiobox__input" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span>';

                                            }
                                        }

                                        htmlCondition +=
                                            '<div style="display: inline-flex;width: 100%" class="tr">' +
                                            '<div style="width:24px;padding:7px 4px" class="td">' +
                                            htmlCheck +
                                            '</div>' +
                                            '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                            '<div class="td" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        if (i < condition.sub_line_items_y.length && condition.sub_line_items_y[i] != undefined && condition.sub_line_items_y[i] != null) {
                                            var htmlCheckItem = "";
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheckItem =
                                                    '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                    '<input type="radio" class="sapo-radiobox__input" name="conditionItemSubId' + condition.id + '"  condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span>';

                                            } else {
                                                htmlCheckItem =
                                                    '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                    '<input type="radio" class="sapo-radiobox__input" name="conditionItemSubId"  condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span>';
                                            }
                                            htmlCondition +=
                                                '<div style="width:24px;padding:7px 4px" class="td">' +
                                                htmlCheckItem +
                                                '</div>' +
                                                '<div class="td" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                                '<div class="td" style="width: calc(25% - 24px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                                '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>';
                                        } else {
                                            htmlCondition += '<div class="td" style="width:50%"></div>'
                                        }
                                        htmlCondition += '</div>';
                                        if (i < condition.sub_line_items_x.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }

                                } else {
                                    for (var i = 0; i < condition.sub_line_items_y.length; i++) {

                                        htmlCondition += '<div style="display: inline-flex;width: 100%" class="tr">';

                                        if (i < condition.sub_line_items_x.length && condition.sub_line_items_x[i] != undefined && condition.sub_line_items_x[i] != null) {
                                            var htmlCheck = "";
                                            if (i == 0) {
                                                if (promotion.allow_multicondition_per_order == true) {
                                                    htmlCheck =
                                                        '<span class="sapo-checkbox" style="z-index: 8;">' +
                                                        '<input type="checkbox" class="sapo-checkbox__input" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                        '<span class="sapo-checkbox__checkmark"></span>' +
                                                        '</span>'

                                                } else {
                                                    htmlCheck =
                                                        '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                        '<input type="radio" class="sapo-radiobox__input" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                        '<span class="sapo-radiobox__icon"></span>' +
                                                        '</span>';

                                                }
                                            }

                                            htmlCondition +=
                                                '<div style="width:24px;padding:7px 4px" class="td">' +
                                                htmlCheck +
                                                '</div>' +
                                                '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                                '<div class="td" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';

                                        } else {
                                            htmlCondition += '<div class="td" style="width:50%;border-right: 1px solid #dcdee2"></div>'
                                        }
                                        var htmlCheckItem = "";
                                        if (promotion.allow_multicondition_per_order == true) {
                                            htmlCheckItem =
                                                '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                '<input type="radio" class="sapo-radiobox__input" name="conditionItemSubId' + condition.id + '"  condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span>';

                                        } else {
                                            htmlCheckItem =
                                                '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                '<input type="radio" class="sapo-radiobox__input" name="conditionItemSubId"  condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span>';

                                        }
                                        htmlCondition +=
                                            '<div style="width:24px;padding:7px 4px" class="td">' +
                                            htmlCheckItem +
                                            '</div>' +
                                            '<div class="td" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                            '<div class="td" style="width: calc(25% - 24px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>' +
                                            '</div > ';
                                        if (i < condition.sub_line_items_y.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }
                                }
                                htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'

                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition)
                        })
                    }
                }
                PosOrder.prototype.setHtmlDetailBuyGroupGiftRight = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('<div class="tr" >' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style="width: 15%" class="th">Mã SKU</div>' +
                        '<div style="width: calc(25% - 12px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right;border-right: 1px solid #dcdee2" class="th">' +
                        'SL mua' +
                        '</div > ' +
                        '<div style= "width: 15%" class="th" >Mã SKU</div>' +
                        '<div style= "width: calc(25% - 12px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right" class="th">' +
                        'SL tặng' +
                        '</div > ' +
                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            var htmlCondition = "";
                            var valueTo = "∞";
                            if (condition.value_to != null && condition.value_to != undefined) {
                                valueTo = money(condition.value_to, ".", ",", "0")
                            }
                            if (condition != null && condition.sub_line_items_x != null && condition.sub_line_items_x.length > 0
                                && condition.sub_line_items_y != null && condition.sub_line_items_y.length > 0) {
                                if (condition.sub_line_items_x.length >= condition.sub_line_items_y.length) {
                                    for (var i = 0; i < condition.sub_line_items_x.length; i++) {
                                        var htmlCheck = "";
                                        if (i == 0) {
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheck =
                                                    '<span class="sapo-checkbox" style="z-index: 8;">' +
                                                    '<input type="checkbox" class="sapo-checkbox__input" name="conditionItemId"  condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-checkbox__checkmark"></span>' +
                                                    '</span>';

                                            } else {
                                                htmlCheck =
                                                    '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                    '<input type="radio" class="sapo-radiobox__input" name="conditionItemId"  condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span>';

                                            }
                                        }

                                        htmlCondition +=
                                            '<div style="display: inline-flex;width: 100%" class="tr">' +
                                            '<div style="width:24px;padding:7px 4px" class="td">' +
                                            htmlCheck +
                                            '</div>' +
                                            '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                            '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        if (i < condition.sub_line_items_y.length && condition.sub_line_items_y[i] != undefined && condition.sub_line_items_y[i] != null) {
                                            htmlCondition += '<div class="td" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                                '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                                '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>';
                                        } else {
                                            htmlCondition += '<div class="td" style="width:calc(50% - 12px)"></div>'
                                        }
                                        htmlCondition += '</div>';
                                        if (i < condition.sub_line_items_x.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }

                                } else {
                                    for (var i = 0; i < condition.sub_line_items_y.length; i++) {
                                        var htmlCheck = "";
                                        if (promotion.allow_multicondition_per_order == true) {
                                            htmlCheck =
                                                '<span class="sapo-checkbox" style="z-index: 8;">' +
                                                '<input type="checkbox" class="sapo-checkbox__input" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                '<span class="sapo-checkbox__checkmark"></span>' +
                                                '</span>';

                                        } else {
                                            htmlCheck =
                                                '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                '<input type="radio" class="sapo-radiobox__input" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span>';

                                        }
                                        htmlCondition += '<div style="display: inline-flex;width: 100%" class="tr">';

                                        if (i < condition.sub_line_items_x.length && condition.sub_line_items_x[i] != undefined && condition.sub_line_items_x[i] != null) {
                                            htmlCondition +=
                                                '<div style="width:24px;padding:7px 4px" class="td">' +
                                                htmlCheck +
                                                '</div>' +
                                                '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                                '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';

                                        } else {
                                            htmlCondition += '<div class="td" style="width:calc(50% + 12px);border-right: 1px solid #dcdee2"></div>'
                                        }
                                        htmlCondition += '<div class="td" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                            '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>' +
                                            '</div > ';
                                        if (i < condition.sub_line_items_y.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }
                                }
                                htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'

                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition)
                        })
                    }
                }
                PosOrder.prototype.setHtmlDetailBuyRightGiftGroup = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('<div class="tr" >' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style="width: 15%" class="th">Mã SKU</div>' +
                        '<div style="width: calc(25% - 24px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right;border-right: 1px solid #dcdee2" class="th">' +
                        'SL mua' +
                        '</div > ' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style= "width: 15%" class="th" >Mã SKU</div>' +
                        '<div style= "width: calc(25% - 24px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right" class="th">' +
                        'SL tặng' +
                        '</div > ' +

                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            var htmlCondition = "";
                            var valueTo = "∞";
                            if (condition.value_to != null && condition.value_to != undefined) {
                                valueTo = money(condition.value_to, ".", ",", "0")
                            }
                            if (condition != null && condition.sub_line_items_x != null && condition.sub_line_items_x.length > 0
                                && condition.sub_line_items_y != null && condition.sub_line_items_y.length > 0) {
                                if (condition.sub_line_items_x.length >= condition.sub_line_items_y.length) {
                                    for (var i = 0; i < condition.sub_line_items_x.length; i++) {
                                        var htmlCheck = "";
                                        if (i == 0) {
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheck =
                                                    '<span class="sapo-checkbox" style="z-index: 8;">' +
                                                    '<input type="checkbox" class="sapo-checkbox__input" name="conditionItemId" condition-id="' + condition.id + '" bind-event-click="clearChooseConditionItem(this)">' +
                                                    '<span class="sapo-checkbox__checkmark"></span>' +
                                                    '</span>';

                                            } else {
                                                htmlCheck =
                                                    '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                    '<input type="radio" class="sapo-radiobox__input" name="conditionItemId" condition-id="' + condition.id + '" bind-event-click="clearChooseConditionItem(this)">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span>';

                                            }
                                        }

                                        htmlCondition +=
                                            '<div style="display: inline-flex;width: 100%" class="tr">' +
                                            '<div style="width:24px;padding:7px 4px" class="td">' +
                                            htmlCheck +
                                            '</div>' +
                                            '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                            '<div class="td" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        if (i < condition.sub_line_items_y.length && condition.sub_line_items_y[i] != undefined && condition.sub_line_items_y[i] != null) {
                                            var htmlCheckItem = "";
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheckItem =
                                                    '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                    '<input type="radio" class="sapo-radiobox__input" name="conditionItemSubId' + condition.id + '"  condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span>';

                                            } else {
                                                htmlCheckItem =
                                                    '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                    '<input type="radio" class="sapo-radiobox__input" name="conditionItemSubId"  condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span>';

                                            }
                                            htmlCondition +=
                                                '<div style="width:24px;padding:7px 4px" class="td">' +
                                                htmlCheckItem +
                                                '</div>' +
                                                '<div class="td" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                                '<div class="td" style="width: calc(25% - 24px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                                '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>';
                                        } else {
                                            htmlCondition += '<div class="td" style="width:50%"></div>'
                                        }
                                        htmlCondition += '</div>';
                                        if (i < condition.sub_line_items_x.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }

                                } else {
                                    for (var i = 0; i < condition.sub_line_items_y.length; i++) {
                                        var htmlCheck = "";
                                        if (i == 0) {
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheck =
                                                    '<span class="sapo-checkbox" style="z-index: 8;">' +
                                                    '<input type="checkbox" class="sapo-checkbox__input" name="conditionItemId" condition-id="' + condition.id + '" bind-event-click="clearChooseConditionItem(this)">' +
                                                    '<span class="sapo-checkbox__checkmark"></span>' +
                                                    '</span>';

                                            } else {
                                                htmlCheck =
                                                    '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                    '<input type="radio" class="sapo-radiobox__input" name="conditionItemId" condition-id="' + condition.id + '" bind-event-click="clearChooseConditionItem(this)">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span>';

                                            }
                                        }

                                        htmlCondition += '<div style="display: inline-flex;width: 100%" class="tr">';

                                        if (i < condition.sub_line_items_x.length && condition.sub_line_items_x[i] != undefined && condition.sub_line_items_x[i] != null) {
                                            htmlCondition +=
                                                '<div style="width:24px;padding:7px 4px" class="td">' +
                                                htmlCheck +
                                                '</div>' +
                                                '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                                '<div class="td" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';

                                        } else {
                                            htmlCondition += '<div class="td" style="width:50%;border-right: 1px solid #dcdee2"></div>'
                                        }
                                        var htmlCheckItem = "";
                                        if (promotion.allow_multicondition_per_order == true) {
                                            htmlCheckItem =
                                                '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                '<input type="radio" class="sapo-radiobox__input" name="conditionItemSubId' + condition.id + '" condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span>';

                                        } else {
                                            htmlCheckItem =
                                                '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                '<input type="radio" class="sapo-radiobox__input" name="conditionItemSubId" condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span>';

                                        }
                                        htmlCondition +=
                                            '<div style="width:24px;padding:7px 4px" class="td">' +
                                            htmlCheckItem +
                                            '</div>' +
                                            '<div class="td" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                            '<div class="td" style="width: calc(25% - 24px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>' +
                                            '</div > ';
                                        if (i < condition.sub_line_items_y.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }
                                }
                                htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'

                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition)
                        })
                    }
                }
                PosOrder.prototype.setHtmlDetailBuyRightGiftRight = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('<div class="tr" >' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style="width: 15%" class="th">Mã SKU</div>' +
                        '<div style="width: calc(25% - 12px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right;border-right: 1px solid #dcdee2" class="th">' +
                        'SL mua' +
                        '</div > ' +
                        '<div style= "width: 15%" class="th" >Mã SKU</div>' +
                        '<div style= "width: calc(25% - 12px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right" class="th">' +
                        'SL tặng' +
                        '</div > ' +
                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            var htmlCondition = "";
                            var valueTo = "∞";
                            if (condition.value_to != null && condition.value_to != undefined) {
                                valueTo = money(condition.value_to, ".", ",", "0")
                            }
                            if (condition != null && condition.sub_line_items_x != null && condition.sub_line_items_x.length > 0
                                && condition.sub_line_items_y != null && condition.sub_line_items_y.length > 0) {
                                if (condition.sub_line_items_x.length >= condition.sub_line_items_y.length) {
                                    for (var i = 0; i < condition.sub_line_items_x.length; i++) {
                                        var htmlCheck = "";
                                        if (i == 0) {
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheck =
                                                    '<span class="sapo-checkbox" style="z-index: 8;">' +
                                                    '<input type="checkbox" class="sapo-checkbox__input" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-checkbox__checkmark"></span>' +
                                                    '</span>';

                                            } else {
                                                htmlCheck =
                                                    '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                    '<input type="radio" class="sapo-radiobox__input" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span>';

                                            }
                                        }

                                        htmlCondition +=
                                            '<div style="display: inline-flex;width: 100%" class="tr">' +
                                            '<div style="width:24px;padding:7px 4px" class="td">' +
                                            htmlCheck +
                                            '</div>' +
                                            '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                            '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        if (i < condition.sub_line_items_y.length && condition.sub_line_items_y[i] != undefined && condition.sub_line_items_y[i] != null) {
                                            htmlCondition += '<div class="td" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                                '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                                '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>';
                                        } else {
                                            htmlCondition += '<div class="td" style="width:calc(50% - 12px)"></div>'
                                        }
                                        htmlCondition += '</div>';
                                        if (i < condition.sub_line_items_x.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }

                                } else {
                                    for (var i = 0; i < condition.sub_line_items_y.length; i++) {
                                        var htmlCheck = "";
                                        if (promotion.allow_multicondition_per_order == true) {
                                            htmlCheck =
                                                '<span class="sapo-checkbox" style="z-index: 8;">' +
                                                '<input type="checkbox" class="sapo-checkbox__input" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                '<span class="sapo-checkbox__checkmark"></span>' +
                                                '</span>';

                                        } else {
                                            htmlCheck =
                                                '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                '<input type="radio" class="sapo-radiobox__input" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span>';

                                        }
                                        htmlCondition += '<div style="display: inline-flex;width: 100%" class="tr">';

                                        if (i < condition.sub_line_items_x.length && condition.sub_line_items_x[i] != undefined && condition.sub_line_items_x[i] != null) {
                                            htmlCondition +=
                                                '<div style="width:24px;padding:7px 4px" class="td">' +
                                                htmlCheck +
                                                '</div>' +
                                                '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                                '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';

                                        } else {
                                            htmlCondition += '<div class="td" style="width:calc(50% + 12px);border-right: 1px solid #dcdee2"></div>'
                                        }
                                        htmlCondition += '<div class="td" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                            '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>' +
                                            '</div > ';
                                        if (i < condition.sub_line_items_y.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }
                                }
                                htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'

                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition)
                        })
                    }
                }
                PosOrder.prototype.setHtmlDetailGiftRightByAmount = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('' +
                        '<div class="tr" >' +
                        '<div style="width: 12.5%;text-align:right" class="th">Giá từ</div>' +
                        '<div style= "width: 12.5%;text-align:right" class="th" > Đến</div> ' +

                        '<div style="width: 20%" class="th ">' +
                        'Mã SKU' +
                        '</div>' +
                        '<div style="width: 45%;" class="th">' +
                        'Tên sản phẩm' +
                        '</div>' +
                        '<div style="width: 10%;text-align:right" class="th">' +
                        ' SL tặng' +
                        '</div>' +
                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            var htmlCondition = "";
                            if (condition != null && condition.sub_line_items != null && condition.sub_line_items.length > 0) {
                                var valueTo = "∞";
                                if (condition.value_to != null && condition.value_to != undefined) {
                                    valueTo = money(condition.value_to, ".", ",", "0")
                                }
                                htmlCondition += '<div class="tr">' +

                                    '<div style="width: 12.5%;text-align:right" class="td">' +
                                    money(condition.value_from, ".", ",", "0") +
                                    '</div>' +
                                    '<div style="width: 12.5%;text-align:right" class="td">' +
                                    valueTo +
                                    '</div>' +

                                    '<div class="td" style="width: 20%">' + condition.sub_line_items[0].variant_sku + '</div>' +
                                    '<div class="td" style="width: 45%">' + condition.sub_line_items[0].object_name + '</div>' +
                                    '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items[0].quantity + '</div>' +
                                    '</div>';
                                if (condition.sub_line_items.length > 1) {
                                    for (var i = 1; i < condition.sub_line_items.length; i++) {
                                        if (condition.sub_line_items[i] != null) {
                                            htmlCondition += '<div style= "width:75%;border-bottom: 1px dashed #ccc;float:right" ></div>' +
                                                '<div style="display: inline-flex;width: 100%" class="tr">' +
                                                '<div style="width:25%" class="td">' +
                                                '</div>' +
                                                '<div class="td" style="width: 20%">' + condition.sub_line_items[i].variant_sku + '</div>' +
                                                '<div class="td" style="width: 45%">' + condition.sub_line_items[i].object_name + '</div>' +
                                                '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items[i].quantity + '</div>' +
                                                '</div>';
                                        }
                                    }

                                }
                                htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'

                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition)
                        })
                    }
                }
                PosOrder.prototype.setHtmlDetailGiftGroupByAmount = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('' +
                        '<div class="tr" >' +
                        '<div style="width: 12.5%;text-align:right" class="th">Giá từ</div>' +
                        '<div style= "width: 12.5%;text-align:right" class="th" > Đến</div> ' +
                        '<div style="width:25px"></div>' +
                        '<div style="width: 20%" class="th ">' +
                        'Mã SKU' +
                        '</div>' +
                        '<div style="width: calc(45% - 25px);" class="th">' +
                        'Tên sản phẩm' +
                        '</div>' +
                        '<div style="width: 10%;text-align:right" class="th">' +
                        ' SL tặng' +
                        '</div>' +
                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            var htmlCondition = "";

                            if (condition != null && condition.sub_line_items != null && condition.sub_line_items.length > 0) {
                                var valueTo = "∞";
                                if (condition.value_to != null && condition.value_to != undefined) {
                                    valueTo = money(condition.value_to, ".", ",", "0")
                                }
                                htmlCondition += '<div class="tr">' +
                                    '<div style="width: 12.5%;text-align:right" class="td">' +
                                    money(condition.value_from, ".", ",", "0") +
                                    '</div>' +
                                    '<div style="width: 12.5%;text-align:right" class="td">' +
                                    valueTo +
                                    '</div>' +
                                    '<div style="width: 25px;text-align: center;padding: 8px 0px 0;">' +
                                    '<span class="sapo-radiobox" style="margin: 0;" data-original-title="" title="">' +
                                    '<input type="radio" class="sapo-radiobox__input" name="conditionItemId"  selected-id="' + condition.sub_line_items[0].id + '">' +
                                    '<span class="sapo-radiobox__icon"></span>' +
                                    '</span>' +
                                    '</div > ' +
                                    '<div class="td" style="width: 20%">' + condition.sub_line_items[0].variant_sku + '</div>' +
                                    '<div class="td" style="width: calc(45% - 25px)">' + condition.sub_line_items[0].object_name + '</div>' +
                                    '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items[0].quantity + '</div>' +
                                    '</div>';
                                if (condition.sub_line_items.length > 1) {
                                    for (var i = 1; i < condition.sub_line_items.length; i++) {
                                        if (condition.sub_line_items[i] != null) {
                                            htmlCondition += '<div style= "width:75%;border-bottom: 1px dashed #ccc;float:right" ></div>' +
                                                '<div style= "display: inline-flex;width: 100%" class="tr" > ' +
                                                '<div style="width: 25%" class="td">' +
                                                '</div>' +
                                                '<div style="width: 25px;text-align: center;padding: 8px 0px 0;">' +
                                                '<span class="sapo-radiobox" style="margin:0;" data-original-title="" title="">' +
                                                '<input type="radio" class="sapo-radiobox__input" name="conditionItemId" selected-id="' + condition.sub_line_items[i].id + '">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span>' +
                                                '</div > ' +
                                                '<div class="td" style="width: 20%">' + condition.sub_line_items[i].variant_sku + '</div>' +
                                                '<div class="td" style="width: calc(45% - 25px)">' + condition.sub_line_items[i].object_name + '</div>' +
                                                '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items[i].quantity + '</div>' +
                                                '</div>';
                                        }
                                    }

                                }
                                htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'
                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition)
                        })
                    }
                }

                PosOrder.prototype.setHtmlDetailBuyCategoryGiftRight = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('<div class="tr" >' +
                        '<div style= "width:24px;">' +
                        '</div> ' +
                        '<div style="width: 15%" class="th">Mã loại</div>' +
                        '<div style="width: calc(25% - 12px)" class="th">Tên loại sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right;border-right: 1px solid #dcdee2" class="th">' +
                        'SL mua' +
                        '</div > ' +
                        '<div style= "width: 15%" class="th" >Mã SKU</div>' +
                        '<div style= "width: calc(25% - 12px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right" class="th">' +
                        'SL tặng' +
                        '</div > ' +
                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            var htmlCondition = "";
                            if (condition != null && condition.sub_line_items_x != null && condition.sub_line_items_x.length > 0
                                && condition.sub_line_items_y != null && condition.sub_line_items_y.length > 0) {
                                if (condition.sub_line_items_x.length >= condition.sub_line_items_y.length) {
                                    for (var i = 0; i < condition.sub_line_items_x.length; i++) {
                                        var htmlCheck = "";
                                        if (i == 0) {
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheck = '<span class="sapo-checkbox" style="margin-right: 8px;">' +
                                                    '<input id=' + condition.id + ' class="sapo-checkbox__input" type="checkbox" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-checkbox__checkmark"></span>' +
                                                    '</span> '
                                            } else {
                                                htmlCheck = '<span class="sapo-radiobox"  style="margin:0;" data-original-title="" title="">' +
                                                    '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemId"  condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span>';
                                            }
                                        }

                                        htmlCondition +=
                                            '<div style="display: inline-flex;width: 100%" class="tr">' +
                                            '<div style="width:24px;padding: 7px 4px;" class="td">' +
                                            htmlCheck +
                                            '</div>' +
                                        '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].code_category + '</div>' +
                                        '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                        '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        if (i < condition.sub_line_items_y.length && condition.sub_line_items_y[i] != undefined && condition.sub_line_items_y[i] != null) {
                                            htmlCondition += '<div class="td" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                                '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                                '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>';
                                        } else {
                                            htmlCondition += '<div class="td" style="width:calc(50% - 12px)"></div>'
                                        }
                                        htmlCondition += '</div>';
                                        if (i < condition.sub_line_items_x.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }

                                } else {
                                    for (var i = 0; i < condition.sub_line_items_y.length; i++) {
                                        var htmlCheck = "";
                                        if (promotion.allow_multicondition_per_order == true) {
                                            htmlCheck = '<span class="sapo-checkbox" style="margin-right: 8px;">' +
                                                '<input id=' + condition.id + ' class="sapo-checkbox__input" type="checkbox" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                '<span class="sapo-checkbox__checkmark"></span>' +
                                                '</span> '
                                        } else {
                                            htmlCheck = '<span class="sapo-radiobox"  style="margin:0;" data-original-title="" title="">' +
                                                '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemId"  condition-id="' + condition.id + '">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span>';
                                        }
                                        htmlCondition += '<div style="display: inline-flex;width: 100%" class="tr">';

                                        if (i < condition.sub_line_items_x.length && condition.sub_line_items_x[i] != undefined && condition.sub_line_items_x[i] != null) {
                                            htmlCondition +=
                                                '<div style="width:24px;padding: 7px 4px;" class="td">' +
                                                htmlCheck +
                                                '</div>' +
                                            '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].code_category + '</div>' +
                                            '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';

                                        } else {
                                            htmlCondition += '<div class="td" style="width:calc(50% + 11px);border-right: 1px solid #dcdee2"></div>'
                                        }
                                        htmlCondition += '<div class="td" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                            '<div class="td" style="width: calc(25% - 12px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>' +
                                            '</div > ';
                                        if (i < condition.sub_line_items_y.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }
                                }
                                htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'

                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition);
                        })
                    }
                }
                PosOrder.prototype.setHtmlDetailBuyRightGiftCategory = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('<div class="tr" >' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style="width: 15%" class="th">Mã SKU</div>' +
                        '<div style="width: calc(25% - 24px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right;border-right: 1px solid #dcdee2" class="th">' +
                        'SL mua' +
                        '</div > ' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style= "width: 15%" class="th" >Mã SKU</div>' +
                        '<div style= "width: calc(25% - 24px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right" class="th">' +
                        'SL tặng' +
                        '</div > ' +
                        //'<div style= "width: 9%;text-align:right" class="th">' +
                        //    'Có thể tặng' +
                        //'</div > ' +
                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            let htmlCondition = "";
                            if (condition != null && condition.sub_line_items_x != null && condition.sub_line_items_x.length > 0
                                && condition.sub_line_items_y != null && condition.sub_line_items_y.length > 0) {
                                var count = condition.list_variant_y.length;
                                if (condition.sub_line_items_x.length >= count) {
                                    for (let i = 0; i < condition.sub_line_items_x.length; i++) {
                                        let htmlCheck = "";

                                        if (i == 0) {
                                            if (promotion.allow_multicondition_per_order) {
                                                htmlCheck = '<span class="sapo-checkbox" style="margin-right: 7px;">' +
                                                    '<input id=' + condition.id + ' class="sapo-checkbox__input" type="checkbox" name="conditionItemId" condition-id="' + condition.id + '" bind-event-click="clearChooseConditionItem(this)">' +
                                                    '<span class="sapo-checkbox__checkmark"></span>' +
                                                    '</span> '
                                            } else {
                                                htmlCheck = '<label class="flex"><span class="sapo-radiobox">' +
                                                    '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemId" condition-id="' + condition.id + '" bind-event-click="clearChooseConditionItem(this)">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span></label>';
                                            }
                                        }

                                        htmlCondition +=
                                            '<div style="display: inline-flex;width: 100%" class="tr">' +
                                            '<div style="width:24px;padding: 7px 4px;" class="td  td-condition-' + i + '">' +
                                            htmlCheck +
                                            '</div>';
                                        if (promotion.allow_multicondition_per_order) {
                                            htmlCondition += '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                                '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        }
                                        else {
                                            htmlCondition += '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                                '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        }
                                        if (count == 0) {
                                            htmlCondition += '<div class="td" style="width:50%">Loại sản phẩm khuyến mại hiện không chứa sản phẩm nào</div>'
                                        }
                                        else {
                                            if (i < count && condition.list_variant_y[i] != undefined && condition.list_variant_y[i] != null) {
                                                let htmlCheckItem = "";
                                                let subLineItems = _.filter(condition.sub_line_items_y, function (o) { return o.object_id == condition.list_variant_y[i].category_id });
                                                let subLineItemsY = {};
                                                if (subLineItems.length > 0)
                                                    subLineItemsY = subLineItems[0];
                                                if (promotion.allowMulticonditionPerOrder) {
                                                    htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                        '<input id=' + subLineItemsY.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemSubId' + condition.id + '"  condition-id="' + condition.id + '"  selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                        '<span class="sapo-radiobox__icon"></span>' +
                                                        '</span></label>';
                                                } else {
                                                    htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                        '<input id=' + subLineItemsY.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemSubId"  condition-id="' + condition.id + '"  selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                        '<span class="sapo-radiobox__icon"></span>' +
                                                        '</span></label>';
                                                }
                                                htmlCondition +=
                                                    '<div style="width:24px;padding: 7px 4px;" class="td td-item-' + i + '">' +
                                                    htmlCheckItem +
                                                    '</div>' +
                                                `<div class="td" bind-event-click="selectRadioButtonItem(this, ${i})" style="width: 15%">${condition.list_variant_y[i].sku}</div>` +
                                                `<div class="td" bind-event-click="selectRadioButtonItem(this, ${i})" style="width: calc(25% - 24px)">${condition.list_variant_y[i].name}</div>` +
                                                    `<div class="td" bind-event-click="selectRadioButtonItem(this, ${i})" style="width: 10%;text-align:right">${subLineItemsY.quantity}</div>`;
                                                //'<div class="td" style="width: 9%;text-align:right">' + condition.subLineItemsY[i].quantity + '</div>';
                                            } else {
                                                htmlCondition += '<div class="td" style="width:50%"></div>'
                                            }
                                        }

                                        htmlCondition += '</div>';
                                        if (i < condition.sub_line_items_x.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }

                                } else {

                                    for (let i = 0; i < condition.list_variant_y.length; i++) {
                                        let htmlCheck = "";
                                        let subLineItems = _.filter(condition.sub_line_items_y, function (o) { return o.object_id == condition.list_variant_y[i].category_id });
                                        let subLineItemsY = {};
                                        if (subLineItems.length > 0)
                                            subLineItemsY = subLineItems[0];
                                        if (i == 0) {
                                            if (promotion.allow_multicondition_per_order) {
                                                htmlCheck = '<span class="sapo-checkbox" style="margin-right: 7px;">' +
                                                    '<input id=' + condition.id + ' class="sapo-checkbox__input" type="checkbox" name="conditionItemId" condition-id="' + condition.id + '" bind-event-click="clearChooseConditionItem(this)">' +
                                                    '<span class="sapo-checkbox__checkmark"></span>' +
                                                    '</span> '
                                            } else {
                                                htmlCheck = '<label class="flex"><span class="sapo-radiobox">' +
                                                    '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemId" condition-id="' + condition.id + '" bind-event-click="clearChooseConditionItem(this)">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span></label>';
                                            }
                                        }

                                        htmlCondition += '<div style="display: inline-flex;width: 100%" class="tr">';

                                        if (i < condition.sub_line_items_x.length && condition.sub_line_items_x[i] != undefined && condition.sub_line_items_x[i] != null) {
                                            htmlCondition +=
                                                '<div style="width:24px;padding: 7px 4px;" class="td td-condition-' + i + '">' +
                                                htmlCheck +
                                                '</div>';
                                            if (promotion.allow_multicondition_per_order) {
                                                htmlCondition += '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                                    '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                    '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                            }
                                            else {
                                                htmlCondition += '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                                    '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                    '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                            }
                                        } else {
                                            htmlCondition += '<div class="td" style="width:50%;border-right: 1px solid #dcdee2"></div>'
                                        }
                                        let htmlCheckItem = "";
                                        if (promotion.allow_multicondition_per_order) {
                                            htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                '<input id=' + subLineItemsY.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemSubId' + condition.id + '" condition-id="' + condition.id + '"  selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span></label>';
                                        } else {
                                            htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                '<input id=' + subLineItemsY.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemSubId" condition-id="' + condition.id + '"  selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span></label>';
                                        }
                                        htmlCondition +=
                                            '<div style="width:24px;padding: 7px 4px;" class="td td-item-' + i + '">' +
                                            htmlCheckItem +
                                            '</div>' +
                                        `<div class="td" bind-event-click="selectRadioButtonItem(this, ${i})" style="width: 15%">${condition.list_variant_y[i].sku}</div>` +
                                        `<div class="td" bind-event-click="selectRadioButtonItem(this,  ${i})" style="width: calc(25% - 24px)">${condition.list_variant_y[i].name}</div>` +
                                            `<div class="td" bind-event-click="selectRadioButtonItem(this, ${i})" style="width: 10%;text-align:right">${subLineItemsY.quantity}</div>` +
                                            //'<div class="td" style="width: 9%;text-align:right">' + condition.subLineItemsY[i].quantity + '</div>' +
                                            '</div > ';
                                        if (i < condition.list_variant_y.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }
                                }
                                htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'
                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition)
                        })
                    }
                }
                PosOrder.prototype.setHtmlDetailBuyGroupGiftGroupCategory = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('<div class="tr" >' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style="width: 15%" class="th">Mã SKU</div>' +
                        '<div style="width: calc(25% - 24px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right;border-right: 1px solid #dcdee2" class="th">' +
                        'SL mua' +
                        '</div > ' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style= "width: 15%" class="th" >Mã SKU</div>' +
                        '<div style= "width: calc(25% - 24px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right" class="th">' +
                        'SL tặng' +
                        '</div > ' +
                        //'<div style= "width: 9%;text-align:right" class="th">' +
                        //'Có thể tặng' +
                        //'</div > ' +
                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            let htmlCondition = "";
                            var count = condition.list_variant_y.length;
                            if (condition != null && condition.sub_line_items_x != null && condition.sub_line_items_x.length > 0
                                && condition.sub_line_items_y != null && condition.sub_line_items_y.length > 0) {
                                if (condition.sub_line_items_x.length >= count) {
                                    for (let i = 0; i < condition.sub_line_items_x.length; i++) {
                                        let htmlCheck = "";
                                        if (i == 0) {
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheck = '<span class="sapo-checkbox" style="margin-right: 7px;">' +
                                                    '<input class="sapo-checkbox__input" type="checkbox" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-checkbox__checkmark"></span>' +
                                                    '</span> '
                                            } else {
                                                htmlCheck = '<label class="flex"><span class="sapo-radiobox">' +
                                                    '<input class="sapo-radiobox__input" type="radio" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span></label>';
                                            }
                                        }

                                        htmlCondition +=
                                            '<div style="display: inline-flex;width: 100%" class="tr">' +
                                            '<div style="width:24px;padding: 7px 4px;" class="td">' +
                                            htmlCheck +
                                            '</div>' +
                                        '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                        '<div class="td" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                        '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        if (count == 0) {
                                            htmlCondition += '<div class="td" style="width:50%">Loại sản phẩm khuyến mại hiện không chứa sản phẩm nào</div>'
                                        }
                                        else {
                                            if (i < count && condition.list_variant_y[i] != undefined && condition.list_variant_y[i] != null) {
                                                let htmlCheckItem = "";
                                                let subLineItems = _.filter(condition.sub_line_items_y, function (o) { return o.object_id == condition.list_variant_y[i].category_id });
                                                let subLineItemsY = {};
                                                if (subLineItems.length > 0)
                                                    subLineItemsY = subLineItems[0];

                                                if (promotion.allow_multicondition_per_order == true) {
                                                    htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                        '<input class="sapo-radiobox__input" type="radio" id=' + condition.id + ' name="conditionItemSubId' + condition.id + '"  condition-id="' + condition.id + '"   selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                        '<span class="sapo-radiobox__icon"></span>' +
                                                        '</span></label>';
                                                } else {
                                                    htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                        '<input class="sapo-radiobox__input" type="radio" id=' + condition.id + ' name="conditionItemSubId"  condition-id="' + condition.id + '"   selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                        '<span class="sapo-radiobox__icon"></span>' +
                                                        '</span></label>';
                                                }
                                                htmlCondition +=
                                                    '<div style="width:24px;padding: 7px 4px;" class="td">' +
                                                    htmlCheckItem +
                                                    '</div>' +
                                                '<div class="td" style="width: 15%">' + condition.list_variant_y[i].sku + '</div>' +
                                                '<div class="td" style="width: calc(25% - 24px)">' + condition.list_variant_y[i].name + '</div>' +
                                                    '<div class="td" style="width: 10%;text-align:right">' + subLineItemsY.quantity + '</div>';
                                                //'<div class="td" style="width: 9%;text-align:right">' + condition.subLineItemsY[i].quantity + '</div>';
                                            } else {
                                                htmlCondition += '<div class="td" style="width:50%"></div>'
                                            }
                                        }

                                        htmlCondition += '</div>';
                                        if (i < condition.sub_line_items_x.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }

                                } else {
                                    for (let i = 0; i < condition.list_variant_y.length; i++) {
                                        let subLineItems = _.filter(condition.sub_line_items_y, function (o) { return o.object_id == condition.list_variant_y[i].category_id });
                                        let subLineItemsY = {};
                                        if (subLineItems.length > 0)
                                            subLineItemsY = subLineItems[0];
                                        htmlCondition += '<div style="display: inline-flex;width: 100%" class="tr">';

                                        if (i < condition.sub_line_items_x.length && condition.sub_line_items_x[i] != undefined && condition.sub_line_items_x[i] != null) {
                                            let htmlCheck = "";
                                            if (i == 0) {
                                                if (promotion.allow_multicondition_per_order == true) {
                                                    htmlCheck = '<span class="sapo-checkbox" style="margin-right: 7px;">' +
                                                        '<input id=' + condition.id + ' class="sapo-checkbox__input" type="checkbox" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                        '<span class="sapo-checkbox__checkmark"></span>' +
                                                        '</span> '
                                                } else {
                                                    htmlCheck = '<label class="flex"><span class="sapo-radiobox">' +
                                                        '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                        '<span class="sapo-radiobox__icon"></span>' +
                                                        '</span></label>';
                                                }
                                            }

                                            htmlCondition +=
                                                '<div style="width:24px;padding: 7px 4px;" class="td">' +
                                                htmlCheck +
                                                '</div>' +
                                            '<div class="td" style="width: 15%">' + condition.sub_line_items_x[i].variant_sku + '</div>' +
                                            '<div class="td" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';

                                        } else {
                                            htmlCondition += '<div class="td" style="width:50%;border-right: 1px solid #dcdee2"></div>'
                                        }
                                        let htmlCheckItem = "";
                                        if (promotion.allow_multicondition_per_order == true) {
                                            htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemSubId' + condition.id + '"  condition-id="' + condition.id + '" selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span></label>';
                                        } else {
                                            htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemSubId"  condition-id="' + condition.id + '"  selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span></label>';
                                        }
                                        htmlCondition +=
                                            '<div style="width:24px;padding: 7px 4px;" class="td">' +
                                            htmlCheckItem +
                                            '</div>' +
                                        '<div class="td" style="width: 15%">' + condition.list_variant_y[i].sku + '</div>' +
                                        '<div class="td" style="width: calc(25% - 24px)">' + condition.list_variant_y[i].name + '</div>' +
                                            '<div class="td" style="width: 10%;text-align:right">' + subLineItemsY.quantity + '</div>' +
                                            //'<div class="td" style="width: 9%;text-align:right">' + condition.subLineItemsY[i].quantity + '</div>' +
                                            '</div > ';
                                        if (i < condition.list_variant_y.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }
                                }
                                htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'

                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition)
                        })
                    }
                }

                PosOrder.prototype.setHtmlDetailBuyGroupCategoryGiftGroup = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('<div class="tr" >' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style="width: 15%" class="th">Mã loại sản phẩm</div>' +
                        '<div style="width: calc(25% - 24px)" class="th">Tên loại sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right;border-right: 1px solid #dcdee2" class="th">' +
                        'SL mua' +
                        '</div > ' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style= "width: 15%" class="th" >Mã SKU</div>' +
                        '<div style= "width: calc(25% - 24px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right" class="th">' +
                        'SL tặng' +
                        '</div > ' +
                        //'<div style= "width: 9%;text-align:right" class="th">' +
                        //'Có thể tặng' +
                        //'</div > ' +
                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            let htmlCondition = "";
                            if (condition != null && condition.sub_line_items_x != null && condition.sub_line_items_x.length > 0
                                && condition.sub_line_items_y != null && condition.sub_line_items_y.length > 0) {
                                if (condition.sub_line_items_x.length >= condition.sub_line_items_y.length) {
                                    for (let i = 0; i < condition.sub_line_items_x.length; i++) {
                                        let htmlCheck = "";
                                        if (i == 0) {
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheck = '<span class="sapo-checkbox" style="margin-right: 7px;">' +
                                                    '<input class="sapo-checkbox__input" type="checkbox" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-checkbox__checkmark"></span>' +
                                                    '</span> '
                                            } else {
                                                htmlCheck = '<label class="flex"><span class="sapo-radiobox">' +
                                                    '<input class="sapo-radiobox__input" type="radio" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span></label>';
                                            }
                                        }

                                        htmlCondition +=
                                            '<div style="display: inline-flex;width: 100%" class="tr">' +
                                            '<div style="width:24px;padding: 7px 4px;" class="td td-condition-' + i + '">' +
                                            htmlCheck +
                                            '</div>';
                                        if (promotion.allow_multicondition_per_order) {
                                            htmlCondition += '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].code_category + '</div>' +
                                                '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        }
                                        else {
                                            htmlCondition += '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].code_category + '</div>' +
                                                '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        }

                                        if (i < condition.sub_line_items_y.length && condition.sub_line_items_y[i] != undefined && condition.sub_line_items_y[i] != null) {
                                            let htmlCheckItem = "";
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                    '<input class="sapo-radiobox__input" type="radio" id=' + condition.id + ' name="conditionItemSubId' + condition.id + '"  condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span></label>';
                                            } else {
                                                htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                    '<input class="sapo-radiobox__input" type="radio" id=' + condition.id + ' name="conditionItemSubId"  condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span></label>';
                                            }
                                            htmlCondition +=
                                                '<div style="width:24px;padding: 7px 4px;" class="td td-item-' + i + '">' +
                                                htmlCheckItem +
                                                '</div>' +
                                            '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                            '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                            '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>';
                                            //'<div class="td" style="width: 9%;text-align:right">' + condition.subLineItemsY[i].quantity + '</div>';
                                        } else {
                                            htmlCondition += '<div class="td" style="width:50%"></div>'
                                        }
                                        htmlCondition += '</div>';
                                        if (i < condition.sub_line_items_x.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }

                                } else {
                                    for (let i = 0; i < condition.sub_line_items_y.length; i++) {

                                        htmlCondition += '<div style="display: inline-flex;width: 100%" class="tr">';

                                        if (i < condition.sub_line_items_x.length && condition.sub_line_items_x[i] != undefined && condition.sub_line_items_x[i] != null) {
                                            let htmlCheck = "";
                                            if (i == 0) {
                                                if (promotion.allow_multicondition_per_order == true) {
                                                    htmlCheck = '<span class="sapo-checkbox" style="margin-right: 7px;">' +
                                                        '<input id=' + condition.id + ' class="sapo-checkbox__input" type="checkbox" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                        '<span class="sapo-checkbox__checkmark"></span>' +
                                                        '</span> '
                                                } else {
                                                    htmlCheck = '<label class="flex"><span class="sapo-radiobox">' +
                                                        '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                        '<span class="sapo-radiobox__icon"></span>' +
                                                        '</span></label>';
                                                }
                                            }

                                            htmlCondition +=
                                                '<div style="width:24px;padding: 7px 4px;" class="td td-condition-' + i + '">' +
                                                htmlCheck +
                                                '</div>';
                                            if (promotion.allow_multicondition_per_order) {
                                                htmlCondition += '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].code_category + '</div>' +
                                                    '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                    '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                            }
                                            else {
                                                htmlCondition += '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].code_category + '</div>' +
                                                    '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                    '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                            }


                                        } else {
                                            htmlCondition += '<div class="td" style="width:50%;border-right: 1px solid #dcdee2"></div>'
                                        }
                                        let htmlCheckItem = "";
                                        if (promotion.allow_multicondition_per_order == true) {
                                            htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemSubId' + condition.id + '"  condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span></label>';
                                        } else {
                                            htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemSubId"  condition-id="' + condition.id + '"  selected-id="' + condition.sub_line_items_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span></label>';
                                        }
                                        htmlCondition +=
                                            '<div style="width:24px;padding: 7px 4px;" class="td td-item-' + i + '">' +
                                            htmlCheckItem +
                                            '</div>' +
                                        '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_y[i].variant_sku + '</div>' +
                                        '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_y[i].object_name + '</div>' +
                                        '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: 10%;text-align:right">' + condition.sub_line_items_y[i].quantity + '</div>' +
                                            //'<div class="td" style="width: 9%;text-align:right">' + condition.subLineItemsY[i].quantity + '</div>' +
                                            '</div > ';
                                        if (i < condition.sub_line_items_y.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }
                                }
                                htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'

                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition)
                        })
                    }
                }

                PosOrder.prototype.setHtmlDetailBuyGroupCategoryGiftGroupCategory = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('<div class="tr" >' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style="width: 15%" class="th">Mã loại sản phẩm</div>' +
                        '<div style="width: calc(25% - 24px)" class="th">Tên loại sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right;border-right: 1px solid #dcdee2" class="th">' +
                        'SL mua' +
                        '</div > ' +
                        '<div style= "width:24px">' +
                        '</div> ' +
                        '<div style= "width: 15%" class="th" >Mã SKU</div>' +
                        '<div style= "width: calc(25% - 24px)" class="th">Tên sản phẩm</div>' +
                        '<div style= "width: 10%;text-align:right" class="th">' +
                        'SL tặng' +
                        '</div > ' +
                        //'<div style= "width: 9%;text-align:right" class="th">' +
                        //'Có thể tặng' +
                        //'</div > ' +
                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            let htmlCondition = "";
                            if (condition != null && condition.sub_line_items_x != null && condition.sub_line_items_x.length > 0
                                && condition.sub_line_items_y != null && condition.sub_line_items_y.length > 0) {
                                let count = condition.list_variant_y.length;
                                if (condition.sub_line_items_x.length >= count) {
                                    for (let i = 0; i < condition.sub_line_items_x.length; i++) {
                                        let htmlCheck = "";
                                        if (i == 0) {
                                            if (promotion.allow_multicondition_per_order == true) {
                                                htmlCheck = '<span class="sapo-checkbox" style="margin-right: 7px;">' +
                                                    '<input class="sapo-checkbox__input" type="checkbox" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-checkbox__checkmark"></span>' +
                                                    '</span> '
                                            } else {
                                                htmlCheck = '<label class="flex"><span class="sapo-radiobox">' +
                                                    '<input class="sapo-radiobox__input" type="radio" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span></label>';
                                            }
                                        }

                                        htmlCondition +=
                                            '<div style="display: inline-flex;width: 100%" class="tr">' +
                                            '<div style="width:24px;padding: 7px 4px;" class="td td-condition-' + i + '">' +
                                            htmlCheck +
                                            '</div>';
                                        if (promotion.allow_multicondition_per_order) {
                                            htmlCondition += '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].code_category + '</div>' +
                                                '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        }
                                        else {
                                            htmlCondition += '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].code_category + '</div>' +
                                                '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                        }
                                        if (count == 0) {
                                            htmlCondition += '<div class="td" style="width:50%">Loại sản phẩm khuyến mại hiện không chứa sản phẩm nào</div>'
                                        }
                                        else {
                                            if (i < count && condition.list_variant_y[i] != undefined && condition.list_variant_y[i] != null) {
                                                let htmlCheckItem = "";
                                                let subLineItems = _.filter(condition.sub_line_items_y, function (o) { return o.object_id == condition.list_variant_y[i].category_id });
                                                let subLineItemsY = {};
                                                if (subLineItems.length > 0)
                                                    subLineItemsY = subLineItems[0];
                                                if (promotion.allow_multicondition_per_order == true) {
                                                    htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                        '<input class="sapo-radiobox__input" type="radio" id=' + condition.id + ' name="conditionItemSubId' + condition.id + '"  condition-id="' + condition.id + '"  selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                        '<span class="sapo-radiobox__icon"></span>' +
                                                        '</span></label>';
                                                } else {
                                                    htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                        '<input class="sapo-radiobox__input" type="radio" id=' + condition.id + ' name="conditionItemSubId"  condition-id="' + condition.id + '"  selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '" bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                        '<span class="sapo-radiobox__icon"></span>' +
                                                        '</span></label>';
                                                }
                                                htmlCondition +=
                                                    '<div style="width:24px;padding: 7px 4px;" class="td td-item-' + i + '">' +
                                                    htmlCheckItem +
                                                    '</div>' +
                                                '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: 15%">' + condition.list_variant_y[i].sku + '</div>' +
                                                '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.list_variant_y[i].name + '</div>' +
                                                    '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: 10%;text-align:right">' + subLineItemsY.quantity + '</div>';
                                            } else {
                                                htmlCondition += '<div class="td" style="width:50%"></div>'
                                            }
                                        }

                                        htmlCondition += '</div>';
                                        if (i < condition.sub_line_items_x.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }

                                } else {
                                    for (let i = 0; i < condition.list_variant_y.length; i++) {
                                        let subLineItems = _.filter(condition.sub_line_items_y, function (o) { return o.object_id == condition.list_variant_y[i].category_id });
                                        let subLineItemsY = {};
                                        if (subLineItems.length > 0)
                                            subLineItemsY = subLineItems[0];
                                        htmlCondition += '<div style="display: inline-flex;width: 100%" class="tr">';

                                        if (i < condition.sub_line_items_x.length && condition.sub_line_items_x[i] != undefined && condition.sub_line_items_x[i] != null) {
                                            let htmlCheck = "";
                                            if (i == 0) {
                                                if (promotion.allow_multicondition_per_order == true) {
                                                    htmlCheck = '<span class="sapo-checkbox" style="margin-right: 7px;">' +
                                                        '<input id=' + condition.id + ' class="sapo-checkbox__input" type="checkbox" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                        '<span class="sapo-checkbox__checkmark"></span>' +
                                                        '</span> '
                                                } else {
                                                    htmlCheck = '<label class="flex"><span class="sapo-radiobox">' +
                                                        '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemId" condition-id="' + condition.id + '">' +
                                                        '<span class="sapo-radiobox__icon"></span>' +
                                                        '</span></label>';
                                                }
                                            }

                                            htmlCondition +=
                                                '<div style="width:24px;padding: 7px 4px;" class="td td-condition-' + i + '">' +
                                                htmlCheck +
                                                '</div>';
                                            if (promotion.allow_multicondition_per_order) {
                                                htmlCondition += '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].code_category + '</div>' +
                                                    '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                    '<div class="td" bind-event-click="selectCheckBoxCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                            }
                                            else {
                                                htmlCondition += '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 15%">' + condition.sub_line_items_x[i].code_category + '</div>' +
                                                    '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.sub_line_items_x[i].object_name + '</div>' +
                                                    '<div class="td" bind-event-click="selectRadioCondition(this, ' + i + ')" style="width: 10%;text-align:right;border-right: 1px solid #dcdee2">' + condition.sub_line_items_x[i].quantity + '</div>';
                                            }


                                        } else {
                                            htmlCondition += '<div class="td" style="width:50%;border-right: 1px solid #dcdee2"></div>'
                                        }
                                        let htmlCheckItem = "";
                                        if (promotion.allow_multicondition_per_order == true) {
                                            htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemSubId' + condition.id + '"  condition-id="' + condition.id + '"  selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '"  bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span></label>';
                                        } else {
                                            htmlCheckItem = '<label class="flex"><span class="sapo-radiobox">' +
                                                '<input id=' + condition.id + ' class="sapo-radiobox__input" type="radio" name="conditionItemSubId"  condition-id="' + condition.id + '"  selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '"  bind-event-click="clearChooseConditionItemSub(this)"">' +
                                                '<span class="sapo-radiobox__icon"></span>' +
                                                '</span></label>';
                                        }
                                        htmlCondition +=
                                            '<div style="width:24px;padding: 7px 4px;" class="td td-item-' + i + '">' +
                                            htmlCheckItem +
                                            '</div>' +
                                        '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: 15%">' + condition.list_variant_y[i].sku + '</div>' +
                                        '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: calc(25% - 24px)">' + condition.list_variant_y[i].name + '</div>' +
                                            '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: 10%;text-align:right">' + subLineItemsY.quantity + '</div>' +
                                            '</div > ';
                                        if (i < condition.list_variant_y.length - 1) {
                                            htmlCondition += '<div style= "width:calc(100% - 31px);border-bottom: 1px dashed #ccc;float:right" ></div>';
                                        }
                                    }
                                }
                                htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'

                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition)
                        })
                    }
                }
                PosOrder.prototype.setHtmlDetailGiftGroupCategoryByAmount = function (promotion) {
                    $(".modal-content #table-height .thead-scroll").html('' +
                        '<div class="tr" >' +
                        '<div style="width: 12.5%;text-align:right" class="th">Giá từ</div>' +
                        '<div style= "width: 12.5%;text-align:right" class="th" > Đến</div> ' +
                        '<div style="width:25px"></div>' +
                        '<div style="width: 20%" class="th ">' +
                        'Mã SKU' +
                        '</div>' +
                        '<div style="width: calc(45% - 25px);" class="th">' +
                        'Tên sản phẩm' +
                        '</div>' +
                        '<div style="width: 10%;text-align:right" class="th">' +
                        ' SL tặng' +
                        '</div>' +
                        '</div>');
                    if (promotion.object_condition_line_items != null && promotion.object_condition_line_items.length > 0) {
                        promotion.object_condition_line_items.forEach(function (condition, indexCondition) {
                            let htmlCondition = "";

                            if (condition != null && condition.sub_line_items != null && condition.sub_line_items.length > 0) {
                                let valueTo = "∞";
                                if (condition.value_to != null && condition.value_to != undefined) {
                                    valueTo = money(condition.value_to, ".", ",", "0")
                                }
                                if (condition.list_variant_y == null || condition.list_variant_y.length == 0) {
                                    htmlCondition += '<div style= "width:100%;text-align:center;padding:6px" >Loại sản phẩm khuyến mại hiện không chứa sản phẩm nào</div>'
                                }
                                else {
                                    let subLineItem0s = _.filter(condition.sub_line_items, function (o) { return o.object_id == condition.list_variant_y[0].category_id });
                                    let subLineItem0 = {};
                                    if (subLineItem0s.length > 0)
                                        subLineItem0 = subLineItem0s[0];
                                    htmlCondition += '<div class="tr">' +
                                        '<div style="width: 12.5%;text-align:right" class="td">' +
                                        money(condition.value_from, ".", ",", "0") +
                                        '</div>' +
                                        '<div style="width: 12.5%;text-align:right" class="td">' +
                                        valueTo +
                                        '</div>' +
                                        '<div  class="td-item-0" style="width: 25px;text-align: center;padding: 8px 0px 0;">' +
                                        '<label class="flex"><span class="sapo-radiobox">' +
                                        '<input class="sapo-radiobox__input" type="radio" name="conditionItemId"  selected-id="' + subLineItem0.id + '" variant-id="' + condition.list_variant_y[0].id + '">' +
                                        '<span class="sapo-radiobox__icon"></span>' +
                                        '</span></label>' +
                                        '</div > ' +
                                        '<div class="td" bind-event-click="selectRadioButtonItem(this, 0)" style="width: 20%">' + condition.list_variant_y[0].sku + '</div>' +
                                        '<div class="td" bind-event-click="selectRadioButtonItem(this, 0)" style="width: calc(45% - 25px)">' + condition.list_variant_y[0].name + '</div>' +
                                        '<div class="td" bind-event-click="selectRadioButtonItem(this, 0)" style="width: 10%;text-align:right">' + subLineItem0.quantity + '</div>' +
                                        '</div>';
                                    if (condition.list_variant_y.length > 1) {
                                        for (let i = 1; i < condition.list_variant_y.length; i++) {
                                            let subLineItems = _.filter(condition.sub_line_items, function (o) { return o.object_id == condition.list_variant_y[i].category_id });
                                            let subLineItemsY = {};
                                            if (subLineItems.length > 0)
                                                subLineItemsY = subLineItems[0];
                                            if (condition.list_variant_y[i] != null) {
                                                htmlCondition += '<div style= "width:75%;border-bottom: 1px dashed #ccc;float:right" ></div>' +
                                                    '<div style= "display: inline-flex;width: 100%" class="tr" > ' +
                                                    '<div style="width: 25%" class="td">' +
                                                    '</div>' +
                                                    '<div  class="td-item-' + i + '" style="width: 25px;text-align: center;padding: 8px 0px 0;">' +
                                                    '<label class="flex"><span class="sapo-radiobox" style="margin-right: 7px;">' +
                                                    '<input class="sapo-radiobox__input" type="radio" name="conditionItemId" selected-id="' + subLineItemsY.id + '" variant-id="' + condition.list_variant_y[i].id + '">' +
                                                    '<span class="sapo-radiobox__icon"></span>' +
                                                    '</span></label>' +
                                                    '</div > ' +
                                                    '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: 20%">' + condition.list_variant_y[i].sku + '</div>' +
                                                    '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: calc(45% - 25px)">' + condition.list_variant_y[i].name + '</div>' +
                                                    '<div class="td" bind-event-click="selectRadioButtonItem(this, ' + i + ')" style="width: 10%;text-align:right">' + subLineItemsY.quantity + '</div>' +
                                                    '</div>';
                                            }
                                        }

                                    }
                                    htmlCondition += '<div style= "width:100%;border-bottom: 1px solid #ccc;float:right" ></div>'
                                }

                            }
                            $(".modal-content #table-height .tbody-scroll").append(htmlCondition)
                        })
                    }
                }


                PosOrder.prototype.choosePromotionByIdPromotion = function (radioId) {
                    var order = this.initTabActive();
                    if (order.selected_promotion_id != undefined) {
                        var last_selected_promotion_id = Number(order.selected_promotion_id);
                        this.resetPromotionItem();
                        if (radioId == last_selected_promotion_id) {
                            $("#" + radioId).removeAttr("checked");
                            return;
                        }
                    }

                    if (order.satisfyPromotions == undefined || order.satisfyPromotions.length == 0)
                        return;

                    var selectedPromotion;
                    for (var i = 0; i < order.satisfyPromotions.length; i++) {
                        var promotion = order.satisfyPromotions[i];
                        if (promotion.promotion_id == parseInt(radioId)) {
                            selectedPromotion = promotion;
                            break;
                        }
                    }

                    if (selectedPromotion == undefined || selectedPromotion == null)
                        return;

                    for (var i = 0; i < selectedPromotion.conditions.length; i++) {
                        var condition = selectedPromotion.conditions[i];
                        for (j = 0; j < condition.satisfy_entity_directions.length; j++) {
                            var direction = condition.satisfy_entity_directions[j];
                            if (direction == "order.this") {

                                condition.items.forEach(item => {
                                    if (item.type == "order_discount")
                                        this.addDiscountPromotionItemIntoOrder(item, condition.satisfy_entity_directions);
                                });

                            }
                            else if (direction.startsWith("orderLineItems")) {
                                var lineItemIndex = direction.replace("orderLineItems", "").replace("[", "").replace("]", "").trim();
                                var readIndex = this.getRealPositionLineItem(parseInt(lineItemIndex));
                                var lineItem = order.order_line_items[readIndex];
                                condition.items.forEach(item => {
                                    if (item.type == "self_saleoff") {
                                        this.addDiscountPromotionItemIntoLineItem(lineItem, item, condition.satisfy_entity_directions);
                                    }
                                });
                            }
                        }
                    }
                    order.selected_promotion_id = radioId;
                }


                PosOrder.prototype.getRealPositionLineItem = function (i) {
                    var order = this.initTabActive();
                    var index = -1;
                    if (order.order_line_items != null && order.order_line_items.length > i) {
                        while (i >= 0 && order.order_line_items.length > index) {
                            index++;
                            if (order.order_line_items[index] != null)
                                i--;

                        }
                    }
                    return index;
                }

                PosOrder.prototype.checkDisplayDiscountPromotion = function () {
                    var order = this.initTabActive();
                    if (order.promotion_id > 0) return true;
                    return false;
                }

                PosOrder.prototype.setOrderDiscount = function (discountValue, isDiscountPercent, idPromotion) {
                    var order = this.initTabActive();
                    order.order_promotion_discount_value = discountValue;
                    order.is_promotion_discount_percent = isDiscountPercent;
                    order.promotion_id = idPromotion;
                    order.order_discount_value = this.getOrderDiscountValue();
                    order.is_discount_percent = this.isDiscountPercent();
                }
                PosOrder.prototype.setOrderLineItemDiscount = function (lineItem, discountValue, isDiscountPercent, idPromotion) {
                    if (isDiscountPercent) {
                        lineItem.order_promotion_discount_value = discountValue;
                        lineItem.is_promotion_discount_percent = isDiscountPercent;
                        lineItem.promotion_id = idPromotion;
                    } else {
                        lineItem.order_promotion_discount_value = discountValue;
                        lineItem.is_promotion_discount_percent = isDiscountPercent;
                        lineItem.promotion_id = idPromotion;
                    }

                }




                PosOrder.prototype.showtooltiplineitemGift = function (element, index) {
                    var that = this;
                    if ($('.popover').length <= 0) {
                        $(element).addClass('active');
                        $(element).popover('show');
                        $(".popover").css({
                            "background": "#000",
                            "color": "#fff",
                            "border-radius": "2px"
                        })
                        $(".popover").addClass("black")
                        $(".popover .popover-content").css({ "padding": "6px 10px", "width": "250px" })
                    }
                    Bindings.refreshImmediately();
                    Bindings.unbind($(".popover").get(0), this);
                    Bindings.bind($(".popover").get(0), this);
                    $(document).mouseup(function (e) {
                        var container = $('.popover');
                        if ((!container.is(e.target) // if the target of the click isn't the container...
                            && container.has(e.target).length === 0)) // ... nor a descendant of the container
                        {
                            $("i.line-item-gift-tooltip-" + index).popover('destroy');
                            $("i.line-item-gift-tooltip-" + index).removeClass('active');
                        }
                    })
                }
                PosOrder.prototype.resetPromotion = function () {

                    $("[id^=variant-gift-]").remove();
                    this.inactivePromotionTab();
                    var order = this.initTabActive();
                    order.order_line_item_gifts = [];
                    order.promotion_discounts = [];
                    order.condition_items = [];
                    order.selected_promotion_id = undefined;
                    order.satisfyPromotions = null;
                    order.is_apply_promotion_discount = false;
                    this.resetPromotionItem();

                }

                PosOrder.prototype.resetPromotionItem = function () {
                    var order = this.initTabActive();
                    order.promotion_id = null;
                    this.removePromotionItemFromOrder();


                    for (i = 0; i < order.order_line_items.length; i++) {
                        var lineItem = order.order_line_items[i];
                        if (lineItem != null) {
                            this.removePromotionItemFromLineItem(lineItem);

                            lineItem.is_apply_promotion_discount = false;
                        }

                    }
                }

                PosOrder.prototype.removePromotionItemFromOrder = function () {
                    var order = this.initTabActive();
                    order.promotionItems = [];

                    this.setOrderDiscount(0, false, 0);
                    order.is_apply_promotion_discount = false;
                }

                PosOrder.prototype.removePromotionItemFromLineItem = function (lineItem) {
                    lineItem.promotionItems = [];
                    var isForLoyalty = lineItem.isForLoyalty;
                    if (isForLoyalty == undefined || isForLoyalty == false)
                        this.setOrderLineItemDiscount(lineItem, 0, false)

                }

                //Các hàm cho bộ lọc variant, Hồi viết từ spr28
                //Các hàm làm việc với cookies
                function setCookie(name, value, days) {
                    var expires;
                    if (days) {
                        var date = new Date();
                        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                        expires = "; expires=" + date.toGMTString();
                    }
                    else {
                        expires = "";
                    }
                    document.cookie = name + "=" + value + expires + "; path=/";
                }
                function getCookie(cname) {
                    var name = cname + "=";
                    var decodedCookie = decodeURIComponent(document.cookie);
                    var ca = decodedCookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') {
                            c = c.substring(1);
                        }
                        if (c.indexOf(name) == 0) {
                            return c.substring(name.length, c.length);
                        }
                    }
                    return "";
                }
                PosOrder.prototype.setVariantFilterCookie = function () {
                    setCookie("variant_filter_" + this.order.account.id, JSON.stringify(this.variantFilter), 9999);
                }
                PosOrder.prototype.getVariantFilterCookie = function () {
                    //let json = getCookie("variant_filter_" + this.order.account.id);
                    let json = ''
                    if (json == null || json.trim() == '')
                        return null;
                    else {
                        try {
                            return JSON.parse(json);
                        }
                        catch (err) {
                            return null;
                        }
                    }

                }
                //end
                //Hàm làm việc với giao diện tùy chọn bộ lọc
                PosOrder.prototype.toggleVariantFilterOptions = function () {
                    this.isShowVariantFilterOptions = !this.isShowVariantFilterOptions;
                }
                //end
                //Danh sách variant lọc theo các tiêu chí có sẵn
                PosOrder.prototype.toggleVariantAutoFilterPopup = function () {
                    //this.isShowVariantAutoFilter = !this.isShowVariantAutoFilter;
                    var that = this;
                    this.showPosAutoListVariant.show();
                    var itemCheckCate = $('#category-items .criteria-item');
                    var checkAllCategory = true;
                    if (itemCheckCate != undefined && itemCheckCate.length != 0) {
                        for (var i = 0; i < itemCheckCate.length; i++) {
                            if ($($(itemCheckCate[i]).children('input')[0]).attr('checked') != "checked") { checkAllCategory = false }
                        }
                    }
                    this.variantFilter.autoFilter.allCategoryChecked = checkAllCategory;

                    var itemCheckBrand = $('#brand-items .criteria-item');
                    var checkAllBrand = true;
                    if (itemCheckBrand != undefined && itemCheckBrand.length != 0) {
                        for (var i = 0; i < itemCheckBrand.length; i++) {
                            if ($($(itemCheckBrand[i]).children('input')[0]).attr('checked') != "checked") { checkAllBrand = false }
                        }
                    }
                    this.variantFilter.autoFilter.allBrandChecked = checkAllBrand;

                    $(".ui.checkbox.filter-criteria-name").each(function (index, item) {
                        $(item).on("click", function () {
                            var value = true;
                            if ($(item).find("input").is(':checked')) {
                                value = false;
                            }

                            $(item).find("input").attr("checked", value);

                            var idItem = $(item).find("input").attr("id");
                            if (idItem == "category-all_check") {
                                that.variantFilter.autoFilter.allCategoryChecked = value;
                                if (that.variantFilter.autoFilter.allCategoryChecked) {
                                    $('#category-items .criteria-item').each(function (index, node) {
                                        let checkbox = $(node).children('input')[0];
                                        $(checkbox).attr('checked', 'checked');
                                    });
                                } else {
                                    $('#category-items .criteria-item').each(function (index, node) {
                                        let checkbox = $(node).children('input')[0];
                                        $(checkbox).removeAttr('checked');
                                    });
                                }
                                $('#suggest-variant-autofilter-tab-content').trigger('filter-change');
                            } else if (idItem == "brand-all_check") {
                                that.variantFilter.autoFilter.allBrandChecked = value;
                                if (that.variantFilter.autoFilter.allBrandChecked) {
                                    $('#brand-items .criteria-item').each(function (index, node) {
                                        let checkbox = $(node).children('input')[0];
                                        $(checkbox).attr('checked', 'checked');
                                    });
                                }
                                else {
                                    $('#brand-items .criteria-item').each(function (index, node) {
                                        let checkbox = $(node).children('input')[0];
                                        $(checkbox).removeAttr('checked');
                                    });
                                }
                                $('#suggest-variant-autofilter-tab-content').trigger('filter-change');
                            }
                        });
                    });

                    $("#category-items .ui.checkbox").each(function (index, item) {

                        $(item).on("click", function () {
                            var value = true;
                            if ($(item).find("input").is(':checked')) {
                                value = false;
                            }

                            $(item).find("input").attr("checked", value);

                            var idItem = $(item).find("input").attr("id");

                            that.toggleCategoryForFilter($(item).find("input"));
                            if (!value) {
                                that.variantFilter.autoFilter.allCategoryChecked = false;
                                $("#category-all_check").removeAttr('checked');
                            } else {
                                var itemCheckCate = $('#category-items .criteria-item');
                                var checkAllCategory = true;
                                if (itemCheckCate != undefined && itemCheckCate.length != 0) {
                                    for (var i = 0; i < itemCheckCate.length; i++) {
                                        if ($($(itemCheckCate[i]).children('input')[0]).attr('checked') != "checked") { checkAllCategory = false }
                                    }
                                }
                                that.variantFilter.autoFilter.allCategoryChecked = checkAllCategory;
                                if (checkAllCategory) { $("#category-all_check").attr('checked', 'checked'); }
                            }
                            $('#suggest-variant-autofilter-tab-content').trigger('filter-change');
                        });
                    });

                    $("#brand-items .ui.checkbox").each(function (index, item) {

                        $(item).on("click", function () {

                            var value = true;
                            if ($(item).find("input").is(':checked')) {
                                value = false;
                            }

                            $(item).find("input").attr("checked", value);

                            var idItem = $(item).find("input").attr("id");


                            that.toggleBrandForFilter($(item).find("input"));
                            if (!value) {
                                that.variantFilter.autoFilter.allCategoryChecked = false;
                            } else {
                                var itemCheckBrand = $('#brand-items .criteria-item');
                                var checkAllBrand = true;
                                if (itemCheckBrand != undefined && itemCheckBrand.length != 0) {
                                    for (var i = 0; i < itemCheckBrand.length; i++) {
                                        if ($($(itemCheckBrand[i]).children('input')[0]).attr('checked') != "checked") { checkAllBrand = false }
                                    }
                                }
                                that.variantFilter.autoFilter.allBrandChecked = checkAllBrand;
                            }
                            $('#suggest-variant-autofilter-tab-content').trigger('filter-change');
                        });


                    });

                    $(".ui.radio.checkbox").each(function (index, item) {
                        $(item).on("click", function () {

                            var value = true;
                            if ($(item).find("input").is(':checked')) {
                                value = false;
                            }

                            $(item).find("input").attr("checked", value);
                            if ($(item).parent("id") == "category-items")
                                that.toggleCategoryForFilter($(item).find("input"));
                            else if ($(item).parent("id") == "brand-items")
                                that.toggleBrandForFilter($(item).find("input"));
                            else
                                that.setTopsaleVariantCriteriaForFilter($(item).find("input"));

                        });
                    });
                    if (this.variantFilter == undefined) {
                        this.variantFilter = { autoFilter: { brandIds: [], categoryIds: [] }, manualListVariant: { variantIds: [] }, usedFilter: 'auto' };
                    }

                    this.existCategoryIds = [];
                    this.existBrandIds = [];

                    $('#category-items .criteria-item').each(function (index, node) {
                        let checkbox = $(node).children('input')[0];
                        let categoryId = $(checkbox).attr('categoryId');
                        that.existCategoryIds.push(categoryId);
                    });


                    $('#brand-items .criteria-item').each(function (index, node) {
                        let checkbox = $(node).children('input')[0];
                        let brandId = $(checkbox).attr('brandId');
                        that.existBrandIds.push(brandId);
                    });



                    $('#suggest-variant-autofilter-tab-content').on('filter-change', function () {
                        let autoFilter = {};
                        autoFilter.categoryIds = [];
                        autoFilter.brandIds = [];
                        autoFilter.topsaleCriteria = null;

                        let brandElements = $('#brand-items').children();

                        brandElements.each(function (index, brandElement) {
                            let checkbox = $(brandElement).children('input')[0];
                            if ($(checkbox).attr('checked') == 'checked')
                                autoFilter.brandIds.push($(checkbox).attr('brandId'));
                        });

                        let categoryElements = $('#category-items').children();

                        categoryElements.each(function (index, categoryElement) {
                            let checkbox = $(categoryElement).children('input')[0];
                            if ($(checkbox).attr('checked') == 'checked')
                                autoFilter.categoryIds.push($(checkbox).attr('categoryId'));
                        });

                        //let topsaleCriteriaElements = $('#topsale-criteria-container').children();
                        //topsaleCriteriaElements.each(function (index, element) {
                        //    let radio = $(element).children('input')[0];
                        //    if ($(radio).attr('checked') == 'checked')
                        //        autoFilter.topsaleCriteria = $(radio).attr('value');
                        //});
                        let topsaleCriteriaElements = $('#topsale-criteria-container input[name="topsale-criteria"]');
                        topsaleCriteriaElements.each(function (index, radio) {
                            if ($(radio).attr('checked') == 'checked')
                                autoFilter.topsaleCriteria = $(radio).attr('value');
                        });
                        that.variantFilter.autoFilter = autoFilter;

                        setCookie('variant_filter_' + that.order.account.id, JSON.stringify(that.variantFilter), 9999);
                    });
                    if (that.variantFilter != null && that.variantFilter != undefined
                        && that.variantFilter.autoFilter != null && that.variantFilter.autoFilter != undefined
                        && that.variantFilter.autoFilter.checkTop == true) {
                        $("#tab-title-top-sale").addClass("active");
                        $("#tab-title-criteria").removeClass("active");
                        $("#suggest-variant-autofilter-top-sale").addClass("active");
                        $("#suggest-variant-autofilter-criteria").removeClass("active");
                    }
                }
                PosOrder.prototype.toggleBrandForFilter = function (checkbox) {
                    triggerVariantCriteriaFilterChanged(checkbox);
                }
                PosOrder.prototype.toggleCategoryForFilter = function (checkbox) {
                    triggerVariantCriteriaFilterChanged(checkbox);
                }
                PosOrder.prototype.setTopsaleVariantCriteriaForFilter = function (radio) {
                    let currentTopsaleCriteria = this.variantFilter.autoFilter.topsaleCriteria;
                    if (currentTopsaleCriteria != undefined && currentTopsaleCriteria != null) {
                        if (currentTopsaleCriteria == $(radio).attr('value')) {
                            $(radio).removeAttr('checked');
                        }
                    }
                    triggerVariantCriteriaFilterChanged();
                }
                PosOrder.prototype.setUsedVariantFilter = function (div) {
                    var that = this;
                    let radio = $(div).find('input')[0];
                    that.variantFilter.usedFilter = $(radio).attr("value");
                    that.variantFilter.page = 1;
                    if (that.variantFilter.usedFilter == 'auto')
                        that.variantFilter.autoFilter.checkTop = true;
                    setCookie('variant_filter_' + that.order.account.id, JSON.stringify(that.variantFilter), 9999);
                    this.getVariantForSuggestion();
                }
                function triggerVariantCriteriaFilterChanged() {
                    $('#suggest-variant-autofilter-tab-content').trigger('filter-change');
                }
                PosOrder.prototype.filterByVariantCriteria = function (criteriaType) {
                    this.variantFilter.usedFilter = 'auto';
                    if (criteriaType == 'variantAttribute') {
                        this.variantFilter.autoFilter.checkTop = false;
                    }
                    else if (criteriaType == 'topsaleCriteria') {
                        this.variantFilter.autoFilter.checkTop = true;
                    }
                    this.variantFilter.page = 1;
                    this.setVariantFilterCookie();
                    this.getVariantForSuggestion();
                }

                PosOrder.prototype.suggestVariantPage = function (jump) {
                    this.variantFilter.page = this.variantFilter.page + jump;
                    if (this.variantFilter.page < 1)
                        this.variantFilter.page = 1;
                    this.getVariantForSuggestion();
                }

                PosOrder.prototype.getVariantForSuggestion = function (accountId, isFirst) {
                    if (isFirst) {
                        let cookieVariantFilterJson = getCookie("variant_filter_" + accountId);
                        let variantFilterFromCookie = {};
                        if (cookieVariantFilterJson == undefined || cookieVariantFilterJson == null || cookieVariantFilterJson.trim() == '') {
                            variantFilterFromCookie.usedFilter = 'auto';
                            variantFilterFromCookie.autoFilter = {};
                            variantFilterFromCookie.autoFilter.checkTop = false;
                            variantFilterFromCookie.autoFilter.topsaleCriteria = "quantity";
                            variantFilterFromCookie.autoFilter.categoryIds = [];
                            variantFilterFromCookie.autoFilter.brandIds = [];
                        }
                        else {
                            try {
                                variantFilterFromCookie = JSON.parse(cookieVariantFilterJson);
                                if (!variantFilterFromCookie.usedFilter) {
                                    variantFilterFromCookie.usedFilter = 'auto';
                                }
                            }
                            catch (err) {
                                variantFilterFromCookie.usedFilter = 'auto';
                                variantFilterFromCookie.autoFilter = {};
                                variantFilterFromCookie.autoFilter.checkTop = false;
                                variantFilterFromCookie.autoFilter.topsaleCriteria = "quantity";
                                variantFilterFromCookie.autoFilter.categoryIds = [];
                                variantFilterFromCookie.autoFilter.brandIds = [];
                            }
                        }
                        //if (variantFilterFromCookie.usedFilter == 'auto')
                        //    variantFilterFromCookie.autoFilter.checkTop = false;
                        this.variantFilter = variantFilterFromCookie;
                        setCookie("variant_filter_" + accountId, JSON.stringify(this.variantFilter), 9999);
                        this.variantFilter.page = 1;
                    }
                    var that = this;

                    bindVariantFilterToFrameFilter(this.variantFilter);
                    var url = ajaxUrls.getAllVariantForSuggestion + '?' + $("#frmQuery").serialize();

                    if (!offline) {
                        Sapo.Utility.loadAjax(url, ".order-menu-screen__left-tab_variant", function (data) {
                        });
                    } else {
                        Sapo.Utility.loadAjax(url, ".order-menu-screen__left-tab_variant", function (data) {
                        });
                    }
                    Sapo.NewModal.hide();

                    function bindVariantFilterToFrameFilter(variantFilter) {
                        $("#frmQuery input[name='UsedFilter']").val(variantFilter.usedFilter);
                        $("#frmQuery input[name='CheckTop']").val(variantFilter.autoFilter.checkTop);
                        $("#frmQuery input[name='TopSaleCriteria']").val(variantFilter.autoFilter.topsaleCriteria);
                        $("#frmQuery input[name='CategoryIds']").val(variantFilter.autoFilter.categoryIds.join(','));
                        $("#frmQuery input[name='BrandIds']").val(variantFilter.autoFilter.brandIds.join(','));
                        $("#frmQuery input[name='Page']").val(variantFilter.page);
                    }
                }
                PosOrder.prototype.isCheckedBrand = function (brandId) {
                    if (this.variantFilter.autoFilter.brandIds.includes(brandId.toString())) {
                        return true;
                    }
                    else
                        return false;
                }
                PosOrder.prototype.isCheckedCategory = function (categoryId) {
                    if (this.variantFilter.autoFilter.categoryIds.includes(categoryId.toString())) {
                        return true;
                    }
                    else
                        return false;
                }
                PosOrder.prototype.toggleAllCategories = function () {

                }
                PosOrder.prototype.isAllCategoryChecked = function () {
                    let categoryIds = [];
                    $('#category-items .criteria-item').each(function (index, node) {
                        let checkbox = $(node).children('input')[0];
                        let categoryId = $(checkbox).attr('categoryId');
                        categoryIds.push(categoryId);
                    });
                    return false;
                }

                //end

                //Danh sách variant thủ công
                PosOrder.prototype.toggleVariantFilterOptions = function () {
                    this.isShowVariantFilterOptions = !this.isShowVariantFilterOptions;
                }

                PosOrder.prototype.toggleVariantManualListPopup = function () {
                    var that = this;
                    this.showPosManualListVariant.show();

                    that.tempManualListVariant = [];
                    that.tempManualListVariantId = [];
                    $('#list-variant').on('dom-change', function () {
                        Bindings.unbind($("#list-variant")[0]);
                        Bindings.bind($("#list-variant")[0]);
                        if (that.tempManualListVariant == undefined)
                            that.tempManualListVariant = [];
                        if (that.tempManualListVariantId == undefined)
                            that.tempManualListVariantId = [];
                        var variantNodes = $('#list-variant').children();

                        let tempVariants = [];
                        let tempVariantIds = [];
                        let i = variantNodes.length;
                        for (i; i > 0; i--) {
                            var variantNode = variantNodes[variantNodes.length - i];
                            $(variantNode).find('.variant-index div').html(i);
                            let variantId = Number($(variantNode).attr('variant-id'));

                            let variants = []
                            if (that.variantFilterResponse != undefined)
                                that.variantFilterResponse.forEach(function (variantItem) {
                                    if (variantItem.variant.id == variantId)
                                        variants.push(variantItem.variant);
                                });

                            if (variants.length == 0)
                                that.tempManualListVariant.forEach(function (variantItem) {
                                    if (variantItem.id == variantId)
                                        variants.push(variantItem);
                                });
                            if (variants.length == 0)
                                that.manualListVariant.forEach(function (variantItem) {
                                    if (variantItem.id == variantId)
                                        variants.push(variantItem);
                                });
                            let variant = variants[0];
                            if (variant != undefined) {
                                tempVariants.push(variant);
                                tempVariantIds.push(variantId);
                            }

                            $(variantNode).css('border-bottom', 'solid 1px rgba(0,0,0,0.1)');
                        }
                        that.tempManualListVariant = tempVariants.slice();
                        that.tempManualListVariantId = tempVariantIds.slice();
                    });
                    $("#list-variant").sortable({
                        revert: true,
                        stop: function () {
                            $('#list-variant').trigger('dom-change');
                        }
                    });
                    if (that.manualListVariantId == undefined || that.manualListVariantId == null) {
                        $.ajax({
                            url: ajaxUrls.getManualListVariantFromSavedSearch,
                            data: {},
                            dataType: "json",
                            type: "GET",
                            success: function (variants) {
                                if (variants == null || variants.length == 0) {
                                    that.manualListVariant = [];
                                    that.manualListVariantId = [];
                                }
                                else {
                                    that.manualListVariant = variants;
                                    that.manualListVariantId = variants.map(function (variant) {
                                        return variant.id;
                                    });
                                }
                                that.bindManualListVariantToDOM();
                            },
                            error: function (error) {
                                //that.toggleVariantManualListPopup();
                                Sapo.Flash.error("Có lỗi xảy ra");
                            }
                        });
                    }
                    else {
                        that.bindManualListVariantToDOM();
                    }

                }

                PosOrder.prototype.bindManualListVariantToDOM = function () {
                    let i = this.manualListVariant.length - 1;
                    for (i; i >= 0; i--) {
                        var variant = this.manualListVariant[i];
                        that.addVariantIntoManualListDOM(variant);
                    }
                }

                PosOrder.prototype.addVariantIntoManualListDOM = function (variant) {
                    if (variant == undefined)
                        return;
                    var node = renderVariantForManualListDisplay(variant);

                    if (this.tempManualListVariantId == undefined) {
                        this.tempManualListVariantId = [];
                        this.tempManualListVariant = [];
                    }

                    if (this.tempManualListVariantId.includes(variant.id)) {
                        this.toggleManualListVariantErrorMessage("sản phẩm vừa chọn đã tồn tại trong danh sách");
                        return;
                    }
                    if (this.tempManualListVariantId.length >= 30) {
                        this.toggleManualListVariantErrorMessage("Danh sách sản phẩm đã đạt số lượng tối đa");
                        return;
                    }

                    $("#list-variant").prepend(node);
                    triggerManualListVariantDomChanged();

                    function renderVariantForManualListDisplay(variant) {
                        function generateItemVariantForManualListDisplay(variant) {
                            var image = (variant.images != null && variant.images.length > 0) ? variant.images[0] : null;
                            return {
                                label: variant.name == null ? "  " : variant.name,
                                value: "",
                                urlimage: image != null ? Sapo.image.headThumb + Sapo.image.small + image.path : "",
                                variant: variant
                            };
                        }

                        let item = generateItemVariantForManualListDisplay(variant);
                        let indexDiv = $('<div>')
                            .css('width', '10%')
                            .addClass('central-div variant-index')
                            .css('border-right', 'solid 1px rgba(0,0,0,0.1)')
                            .html(
                                $('<div>')
                                    .css('width', '25px')
                                    .css('height', '25px')
                                    .css('border-radius', '50%')
                                    .css('background-color', '#0088FF')
                                    .css('text-align', 'center')
                                    .css('color', 'white')
                                    .addClass('central-div')
                                    .html('')
                            );
                        let imgDiv = (item.variant.images != null && item.variant.images.length > 0)
                            ? $('<div class="thumb" >')
                                .css('width', '10%')
                                .addClass('central-div')
                                .html($('<img>')
                                    .attr('alt', item.variant.name)
                                    .addClass('block s-none thumb-30')
                                    .attr('height', '40')
                                    .attr('width', '40')
                                    .attr('src', item.urlimage)
                                    .attr('title', item.variant.name)
                                )
                            : $('<div>')
                                .css('width', '10%')
                                .addClass('central-div')
                                .html($('<img>')
                                    .attr('alt', '')
                                    .addClass('"set-img')
                                    .attr('height', '40')
                                    .attr('width', '40')
                                    .attr('src', '/images/image-default.png')
                                    .attr('title', item.variant.name)
                                );

                        let nameDiv = $('<div>')
                            .css('width', '60%')
                            .css('display', 'flex')
                            .css('flex-flow', 'column')
                            .css('align-items', 'begin')
                            .css('justify-content', 'center')
                            .append($('<p>').text(item.variant.sku)).append($('<p>').text(item.variant.name));

                        let priceDiv = $('<div>')
                            .css('width', '10%')
                            .addClass('central-div')
                            .html(money(that.getPriceById(item.variant, that.order.tenant_setting.sale_price_list_id), that.order.currency.delimiter, that.order.currency.separator, that.order.currency.precision, that.order.currency.symbol));

                        let trashDiv = $('<div>')
                            .css('width', '10%')
                            .addClass('central-div')
                            .attr('bind-event-click', 'removeVariantFromManualListDOM(this)')
                            .html($('<i>').addClass('fa fa-trash-o'));

                        let result = $('<div style="display: flex; flex-flow: row;">')
                            .css('cursor', 'move')
                            .css('height', '67px')
                            .css('border', 'solid 1px rgba(0,0,0,0.1)')
                            .css('border-top', 'unset')
                            .css('border-left', 'unset')
                            //.attr('define', JSON.stringify(variant))
                            .attr('id', item.variant.id)
                            .attr('variant-id', item.variant.id)
                            .append(indexDiv)
                            .append(imgDiv)
                            .append(nameDiv)
                            .append(priceDiv)
                            .append(trashDiv);

                        return result;
                    }
                }


                PosOrder.prototype.saveManualListVariant = function () {
                    var that = this;
                    if (!this.tempManualListVariantId)
                        this.tempManualListVariantId = [];
                    $.ajax({
                        url: ajaxUrls.storeSavedSearchForManualListVariant,
                        data: { variantIds: that.tempManualListVariantId.join(',') },
                        dataType: "json",
                        type: "POST",
                        success: function () {
                            that.manualListVariant = that.tempManualListVariant.slice();
                            that.manualListVariantId = that.tempManualListVariantId.slice();
                            Sapo.Flash.notice("Cập nhật thành công");
                            if (that.variantFilter.usedFilter == 'manual')
                                that.getVariantForSuggestion();
                        },
                        error: function (error) {
                            Sapo.Flash.error("Có lỗi xảy ra");
                        },
                        complete: function () {
                            that.toggleVariantManualListPopup();
                            that.getVariantForSuggestion();
                        }
                    });
                }

                PosOrder.prototype.isShowAddVariant = function () {
                    if (typeof this.variantFilter != 'undefined' && this.variantFilter != null) {
                        if (this.variantFilter.usedFilter === 'manual') {
                            return false;
                        }
                    }
                    return true;
                }

                PosOrder.prototype.autoCompleteVariantOnManualListForm = function () {
                    var that = this;
                    var order = that.initTabActive();
                    var count = 0;
                    var page = 1;
                    var total = 0;
                    var ajaxLoading = false;
                    var lastKey = '';

                    $("#manual-list-variant-search-input")
                        .autocomplete({
                            appendTo: "#manual-list-variant-filter-result-container",
                            minLength: 1,
                            delay: 500,
                            source: function (request, response) {
                                page = 1;
                                let array = [];

                                getVariantItems(request.term, function (data) {
                                    $("#manual-list-variant-filter-result-container").trigger('list-variant-change', { data: data });
                                });
                                $("#manual-list-variant-filter-result-container .ui-autocomplete").scroll(function () {
                                    if (count >= total)
                                        return;
                                    if (ajaxLoading)
                                        return;
                                    var heightItem = $("#manual-list-variant-filter-result-container .ui-menu-item").height();
                                    var itemBorderBottomWidth = Number($("#manual-list-variant-filter-result-container .ui-menu-item").css("border-bottom-width").replace('px', ''))
                                        + Number($("#manual-list-variant-filter-result-container .ui-menu-item").css("border-top-width").replace('px', ''));
                                    var heightdocument = count * (heightItem + itemBorderBottomWidth);
                                    var heightwindown = $("#manual-list-variant-filter-result-container .ui-autocomplete").height();
                                    var scroll = $("#manual-list-variant-filter-result-container .ui-autocomplete ").scrollTop();
                                    if ((heightdocument - heightwindown - scroll) > heightItem)
                                        return;
                                    getVariantItems($('#manual-list-variant-search-input').val(), function (items) {
                                        $("#manual-list-variant-filter-result-container").trigger('list-variant-change', { data: items });
                                    });
                                });
                                $("#manual-list-variant-filter-result-container").on('list-variant-change', function () {
                                    if (arguments[1].data == null || arguments[1].data.length == 0) {
                                        array.push({
                                            label: "",
                                            value: "Không tìm thấy sản phẩm.",
                                            urlimage: null,
                                            variant: null
                                        });
                                    } else {
                                        var items = arguments[1].data;
                                        for (i = 0; i < items.length; i++) {
                                            if (!that.tempManualListVariantId)
                                                that.tempManualListVariantId = [];
                                            if (!(that.tempManualListVariantId.includes(items[i].variant.id))) {
                                                array.push(items[i]);
                                                count++;
                                            }

                                        }
                                        that.variantFilterResponse = array;
                                    }

                                    response(array);

                                    $("#manual-list-variant-filter-result-container li").click(function (event, ui) {
                                        var item = this;
                                        var variant = $(item).data("item.autocomplete").variant;
                                        that.addVariantIntoManualListDOM(variant);
                                        $('#manual-list-variant-search-input').autocomplete('close');
                                        $('#manual-list-variant-search-input').val('');
                                    });
                                });
                            },
                            search: function (event, ui) {
                                return true;
                            }
                        })
                        .data('autocomplete')._renderItem = function (ul, item) {
                            if (item.variant == null) {
                                return $("<li style='float:left;width:100%;list-style: none;    border-bottom: 1px #dcdee2 solid;'></li>")
                                    .data("item.autocomplete", item)
                                    .append(
                                        '<a href="javascript:void(0)" tabindex="-1" class="">' +

                                        '<div class="fl w100 text-overflow-hiden search-product-content" style="height:50px; padding-top: 12px; width: 100%">' +
                                        '<span>Không tìm thấy sản phẩm</span>' +
                                        '</div>' +
                                        '</a>'

                                    )
                                    .appendTo(ul);
                            } else {
                                var renderResult = renderItem(item);
                                return $("<li>")
                                    .data("item.autocomplete", item)
                                    .addClass("ui-menu-item")
                                    .append(renderResult)
                                    .appendTo(ul);
                            }

                        };
                    $("#manual-list-variant-search-input").autocomplete('search', $("#manual-list-variant-search-input").val());

                    function getVariantItems(query, onsuccess) {
                        ajaxLoading = true;
                        that.getVariantByFilter({ query: query, page: page, limit: 20 },
                            function (data) {
                                ajaxLoading = false;
                                if (data.metadata != null) {
                                    total = data.metadata.total
                                }
                                var array = data.error ? [] : $.map(data.variants, function (m) {
                                    var image = (m.images != null && m.images.length > 0) ? m.images[0] : null;
                                    return {
                                        label: m.name == null ? "  " : m.name,
                                        value: "",
                                        urlimage: image != null ? Sapo.image.headThumb + Sapo.image.small + image.path : "",
                                        variant: m
                                    };
                                });
                                if (onsuccess != undefined) {
                                    page++;
                                    onsuccess(array);

                                }
                            },
                            function (error) {
                                if (error.status == 403) {
                                    NProgress.done();
                                    Sapo.Utility.handleForbiddenRequest(false); return;
                                }
                            },
                            function () {
                                ajaxLoading = false;
                            }
                        );
                    }

                    function renderItem(item) {
                        var imgDiv = (item.variant.images != null && item.variant.images.length > 0)
                            ? $('<div class="thumb" >')
                                .addClass('central-div')
                                .css('width', '20%')
                                .html($('<img>')
                                    .attr('alt', item.variant.name)
                                    .addClass('block s-none thumb-30')
                                    .attr('height', '40')
                                    .attr('width', '40')
                                    .attr('src', item.urlimage)
                                    .attr('title', item.variant.name)
                                )
                            : $('<div>')
                                .addClass('central-div')
                                .css('width', '20%')
                                .html($('<img>')
                                    .attr('alt', '')
                                    .addClass('"set-img')
                                    .attr('height', '40')
                                    .attr('width', '40')
                                    .attr('src', '/images/image-default.png')
                                    .attr('title', item.variant.name)
                                );

                        var nameDiv = $("<div>")
                            .css('width', '80%')
                            .css('display', 'flex')
                            .css('flex-flow', 'column')
                            .css('justify-content', 'center')
                            .append($('<p>').text(item.variant.sku))
                            .append($('<p>').text(item.variant.name));
                        var result = $('<div style="display: flex; flex-flow: row;">')
                            .addClass("ui-menu-item-wrapper")
                            .attr("tabindex", -1)
                            .append(imgDiv)
                            .append(nameDiv);

                        var resultx = '<a href="javascript:void(0)" tabindex="-1" class="" style="height:50px">' +
                            '<div style=" padding: 8.5px; float:left;width:17%;    border-right: 1px #dcdee2 solid;">' +
                            ((item.variant.images != null && item.variant.images.length > 0) ? '<div class="thumb">' + '<img alt="' + item.variant.name + '" class="block s-none thumb-30" height="40" width="40" src="' + item.urlimage + '" title="' + item.variant.name + '">' +
                                '</div>' : '<div>' +
                                '<img width="40" height="40" src="/images/image-default.png" class="set-img" alt="">' +
                                '</div>') +
                            '</div>' +
                            '<div class="search-product-content" style=" padding: 6px; float:left;width:80%">' +
                            '<div class="search-product-content-name">' +
                            '<span>' + item.variant.name + '</span>' +
                            '</div>' +
                            '<div class="search-product-content-sku">'
                            + (item.variant.category == null ? "" : item.variant.category) + "   " + (item.variant.sku == null ? "" : item.variant.sku) + "   " + ((item.variant.opt1 == null || item.variant.opt1 == "") ? "" : StandardOption(item.variant.opt1, item.variant.opt2, item.variant.opt3)) + ((item.variant.opt2 == null || item.variant.opt2 == "") ? "" : (" / " + item.variant.opt2)) + ((item.variant.opt3 == null || item.variant.opt3 == "") ? "" : (" / " + item.variant.opt3)) +
                            '</div>' +
                            '</div>' +
                            '</a>'

                        return resultx;
                    }
                }

                PosOrder.prototype.showFirstScreenManualListVariant = function () {
                    var list = this.tempManualListVariantId;

                    var listVariantFilter = $("#list-variant").html().trim();
                    if (listVariantFilter != undefined && listVariantFilter != null && listVariantFilter != "")
                        return false
                    return true;
                }

                PosOrder.prototype.toggleManualListVariantErrorMessage = function (message) {
                    $("#manualListVariantErrorMessage p")
                        .css('margin-left', '10%')
                        .text(message).fadeOut(2000, function () {
                            $(this).css('display', 'block').text('');
                        });
                }

                PosOrder.prototype.clearManualListVariantDOM = function () {
                    $("#list-variant").html("");
                    triggerManualListVariantDomChanged();
                }

                PosOrder.prototype.removeVariantFromManualListDOM = function (recycleBinNode) {
                    $(recycleBinNode).parent().remove();
                    triggerManualListVariantDomChanged();
                }

                PosOrder.prototype.getVariantByFilter = function (filter, onsuccess, onerror, oncomplete) {
                    $.ajax({
                        url: ajaxUrls.getVariantByFilter,
                        data: filter,
                        dataType: "json",
                        type: "GET",
                        success: function (variantFilterResponse) {
                            if (onsuccess != undefined)
                                onsuccess(variantFilterResponse)
                        },
                        error: function (error) {
                            if (onerror != undefined)
                                onerror(error);
                        },
                        complete: function () {
                            if (oncomplete != undefined)
                                oncomplete();
                        }
                    });
                }

                function triggerManualListVariantDomChanged() {
                    $('#list-variant').trigger('dom-change');
                    Bindings.refreshImmediately();
                }
                //end

                //Kết thúc phần bộ lọc variant

                return PosOrder;
            }();
        }
    ).call(this);
}