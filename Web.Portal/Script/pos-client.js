/*! jQuery v1.7.1 jquery.co
/// <reference path="jquery.js" />
/*
jquery-resizable author hainq
Version 0.17 - 7/21/2016
© 2015 Hải Nguyễn Quốc
Licensed under MIT License
*/


if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); +function (a) { "use strict"; function b() { var a = document.createElement("bootstrap"), b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" }; for (var c in b) if (void 0 !== a.style[c]) return { end: b[c] }; return !1 } a.fn.emulateTransitionEnd = function (b) { var c = !1, d = this; a(this).one("bsTransitionEnd", function () { c = !0 }); var e = function () { c || a(d).trigger(a.support.transition.end) }; return setTimeout(e, b), this }, a(function () { a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = { bindType: a.support.transition.end, delegateType: a.support.transition.end, handle: function (b) { return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0 } }) }) }(jQuery), +function (a) { "use strict"; function b(b) { return this.each(function () { var c = a(this), e = c.data("bs.alert"); e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c) }) } var c = '[data-dismiss="alert"]', d = function (b) { a(b).on("click", c, this.close) }; d.VERSION = "3.2.0", d.prototype.close = function (b) { function c() { f.detach().trigger("closed.bs.alert").remove() } var d = a(this), e = d.attr("data-target"); e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, "")); var f = a(e); b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", c).emulateTransitionEnd(150) : c()) }; var e = a.fn.alert; a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () { return a.fn.alert = e, this }, a(document).on("click.bs.alert.data-api", c, d.prototype.close) }(jQuery), +function (a) { "use strict"; function b(b) { return this.each(function () { var d = a(this), e = d.data("bs.button"), f = "object" == typeof b && b; e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b) }) } var c = function (b, d) { this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1 }; c.VERSION = "3.2.0", c.DEFAULTS = { loadingText: "loading..." }, c.prototype.setState = function (b) { var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data(); b += "Text", null == f.resetText && d.data("resetText", d[e]()), d[e](null == f[b] ? this.options[b] : f[b]), setTimeout(a.proxy(function () { "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c)) }, this), 0) }, c.prototype.toggle = function () { var a = !0, b = this.$element.closest('[data-toggle="buttons"]'); if (b.length) { var c = this.$element.find("input"); "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change") } a && this.$element.toggleClass("active") }; var d = a.fn.button; a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () { return a.fn.button = d, this }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) { var d = a(c.target); d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault() }) }(jQuery), +function (a) { "use strict"; function b(b) { return this.each(function () { var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b), g = "string" == typeof b ? b : f.slide; e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle() }) } var c = function (b, c) { this.$element = a(b).on("keydown.bs.carousel", a.proxy(this.keydown, this)), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this)) }; c.VERSION = "3.2.0", c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0 }, c.prototype.keydown = function (a) { switch (a.which) { case 37: this.prev(); break; case 39: this.next(); break; default: return } a.preventDefault() }, c.prototype.cycle = function (b) { return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this }, c.prototype.getItemIndex = function (a) { return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active) }, c.prototype.to = function (b) { var c = this, d = this.getItemIndex(this.$active = this.$element.find(".item.active")); return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () { c.to(b) }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b])) }, c.prototype.pause = function (b) { return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this }, c.prototype.next = function () { return this.sliding ? void 0 : this.slide("next") }, c.prototype.prev = function () { return this.sliding ? void 0 : this.slide("prev") }, c.prototype.slide = function (b, c) { var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval, g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this; if (!e.length) { if (!this.options.wrap) return; e = this.$element.find(".item")[h]() } if (e.hasClass("active")) return this.sliding = !1; var j = e[0], k = a.Event("slide.bs.carousel", { relatedTarget: j, direction: g }); if (this.$element.trigger(k), !k.isDefaultPrevented()) { if (this.sliding = !0, f && this.pause(), this.$indicators.length) { this.$indicators.find(".active").removeClass("active"); var l = a(this.$indicators.children()[this.getItemIndex(e)]); l && l.addClass("active") } var m = a.Event("slid.bs.carousel", { relatedTarget: j, direction: g }); return a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one("bsTransitionEnd", function () { e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () { i.$element.trigger(m) }, 0) }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger(m)), f && this.cycle(), this } }; var d = a.fn.carousel; a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () { return a.fn.carousel = d, this }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (c) { var d, e = a(this), f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "")); if (f.hasClass("carousel")) { var g = a.extend({}, f.data(), e.data()), h = e.attr("data-slide-to"); h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault() } }), a(window).on("load", function () { a('[data-ride="carousel"]').each(function () { var c = a(this); b.call(c, c.data()) }) }) }(jQuery), +function (a) { "use strict"; function b(b) { return this.each(function () { var d = a(this), e = d.data("bs.collapse"), f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b); !e && f.toggle && "show" == b && (b = !b), e || d.data("bs.collapse", e = new c(this, f)), "string" == typeof b && e[b]() }) } var c = function (b, d) { this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle() }; c.VERSION = "3.2.0", c.DEFAULTS = { toggle: !0 }, c.prototype.dimension = function () { var a = this.$element.hasClass("width"); return a ? "width" : "height" }, c.prototype.show = function () { if (!this.transitioning && !this.$element.hasClass("in")) { var c = a.Event("show.bs.collapse"); if (this.$element.trigger(c), !c.isDefaultPrevented()) { var d = this.$parent && this.$parent.find("> .panel > .in"); if (d && d.length) { var e = d.data("bs.collapse"); if (e && e.transitioning) return; b.call(d, "hide"), e || d.data("bs.collapse", null) } var f = this.dimension(); this.$element.removeClass("collapse").addClass("collapsing")[f](0), this.transitioning = 1; var g = function () { this.$element.removeClass("collapsing").addClass("collapse in")[f](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse") }; if (!a.support.transition) return g.call(this); var h = a.camelCase(["scroll", f].join("-")); this.$element.one("bsTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(350)[f](this.$element[0][h]) } } }, c.prototype.hide = function () { if (!this.transitioning && this.$element.hasClass("in")) { var b = a.Event("hide.bs.collapse"); if (this.$element.trigger(b), !b.isDefaultPrevented()) { var c = this.dimension(); this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1; var d = function () { this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse") }; return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this) } } }, c.prototype.toggle = function () { this[this.$element.hasClass("in") ? "hide" : "show"]() }; var d = a.fn.collapse; a.fn.collapse = b, a.fn.collapse.Constructor = c, a.fn.collapse.noConflict = function () { return a.fn.collapse = d, this }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (c) { var d, e = a(this), f = e.attr("data-target") || c.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""), g = a(f), h = g.data("bs.collapse"), i = h ? "toggle" : e.data(), j = e.attr("data-parent"), k = j && a(j); h && h.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + j + '"]').not(e).addClass("collapsed"), e[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), b.call(g, i) }) }(jQuery), +function (a) { "use strict"; function b(b) { b && 3 === b.which || (a(e).remove(), a(f).each(function () { var d = c(a(this)), e = { relatedTarget: this }; d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e)) })) } function c(b) { var c = b.attr("data-target"); c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")); var d = c && a(c); return d && d.length ? d : b.parent() } function d(b) { return this.each(function () { var c = a(this), d = c.data("bs.dropdown"); d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c) }) } var e = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', g = function (b) { a(b).on("click.bs.dropdown", this.toggle) }; g.VERSION = "3.2.0", g.prototype.toggle = function (d) { var e = a(this); if (!e.is(".disabled, :disabled")) { var f = c(e), g = f.hasClass("open"); if (b(), !g) { "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b); var h = { relatedTarget: this }; if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return; e.trigger("focus"), f.toggleClass("open").trigger("shown.bs.dropdown", h) } return !1 } }, g.prototype.keydown = function (b) { if (/(38|40|27)/.test(b.keyCode)) { var d = a(this); if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) { var e = c(d), g = e.hasClass("open"); if (!g || g && 27 == b.keyCode) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click"); var h = " li:not(.divider):visible a", i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h); if (i.length) { var j = i.index(i.filter(":focus")); 38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus") } } } }; var h = a.fn.dropdown; a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () { return a.fn.dropdown = h, this }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) { a.stopPropagation() }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ', [role="menu"], [role="listbox"]', g.prototype.keydown) }(jQuery), +function (a) { "use strict"; function b(b, d) { return this.each(function () { var e = a(this), f = e.data("bs.modal"), g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b); f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d) }) } var c = function (b, c) { this.options = c, this.$body = a(document.body), this.$element = a(b), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () { this.$element.trigger("loaded.bs.modal") }, this)) }; c.VERSION = "3.2.0", c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, c.prototype.toggle = function (a) { return this.isShown ? this.hide() : this.show(a) }, c.prototype.show = function (b) { var c = this, d = a.Event("show.bs.modal", { relatedTarget: b }); this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () { var d = a.support.transition && c.$element.hasClass("fade"); c.$element.parent().length || c.$element.appendTo(c.$body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus(); var e = a.Event("shown.bs.modal", { relatedTarget: b }); d ? c.$element.find(".modal-dialog").one("bsTransitionEnd", function () { c.$element.trigger("focus").trigger(e) }).emulateTransitionEnd(300) : c.$element.trigger("focus").trigger(e) })) }, c.prototype.hide = function (b) { b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal()) }, c.prototype.enforceFocus = function () { a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) { this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus") }, this)) }, c.prototype.escape = function () { this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) { 27 == a.which && this.hide() }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal") }, c.prototype.hideModal = function () { var a = this; this.$element.hide(), this.backdrop(function () { a.$element.trigger("hidden.bs.modal") }) }, c.prototype.removeBackdrop = function () { this.$backdrop && this.$backdrop.remove(), this.$backdrop = null }, c.prototype.backdrop = function (b) { var c = this, d = this.$element.hasClass("fade") ? "fade" : ""; if (this.isShown && this.options.backdrop) { var e = a.support.transition && d; if (this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) { a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)) }, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return; e ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b() } else if (!this.isShown && this.$backdrop) { this.$backdrop.removeClass("in"); var f = function () { c.removeBackdrop(), b && b() }; a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", f).emulateTransitionEnd(150) : f() } else b && b() }, c.prototype.checkScrollbar = function () { document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()) }, c.prototype.setScrollbar = function () { var a = parseInt(this.$body.css("padding-right") || 0, 10); this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth) }, c.prototype.resetScrollbar = function () { this.$body.css("padding-right", "") }, c.prototype.measureScrollbar = function () { var a = document.createElement("div"); a.className = "modal-scrollbar-measure", this.$body.append(a); var b = a.offsetWidth - a.clientWidth; return this.$body[0].removeChild(a), b }; var d = a.fn.modal; a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () { return a.fn.modal = d, this }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) { var d = a(this), e = d.attr("href"), f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")), g = f.data("bs.modal") ? "toggle" : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data()); d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) { a.isDefaultPrevented() || f.one("hidden.bs.modal", function () { d.is(":visible") && d.trigger("focus") }) }), b.call(f, g, this) }) }(jQuery), +function (a) { "use strict"; function b(b) { return this.each(function () { var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof b && b; (e || "destroy" != b) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]()) }) } var c = function (a, b) { this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b) }; c.VERSION = "3.2.0", c.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 } }, c.prototype.init = function (b, c, d) { this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport); for (var e = this.options.trigger.split(" "), f = e.length; f--;) { var g = e[f]; if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) { var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout"; this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this)) } } this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle() }, c.prototype.getDefaults = function () { return c.DEFAULTS }, c.prototype.getOptions = function (b) { return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b }, c.prototype.getDelegateOptions = function () { var b = {}, c = this.getDefaults(); return this._options && a.each(this._options, function (a, d) { c[a] != d && (b[a] = d) }), b }, c.prototype.enter = function (b) { var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type); return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () { "in" == c.hoverState && c.show() }, c.options.delay.show)) : c.show() }, c.prototype.leave = function (b) { var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type); return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () { "out" == c.hoverState && c.hide() }, c.options.delay.hide)) : c.hide() }, c.prototype.show = function () { var b = a.Event("show.bs." + this.type); if (this.hasContent() && this.enabled) { this.$element.trigger(b); var c = a.contains(document.documentElement, this.$element[0]); if (b.isDefaultPrevented() || !c) return; var d = this, e = this.tip(), f = this.getUID(this.type); this.setContent(), e.attr("id", f), this.$element.attr("aria-describedby", f), this.options.animation && e.addClass("fade"); var g = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, h = /\s?auto?\s?/i, i = h.test(g); i && (g = g.replace(h, "") || "top"), e.detach().css({ top: 0, left: 0, display: "block" }).addClass(g).data("bs." + this.type, this), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element); var j = this.getPosition(), k = e[0].offsetWidth, l = e[0].offsetHeight; if (i) { var m = g, n = this.$element.parent(), o = this.getPosition(n); g = "bottom" == g && j.top + j.height + l - o.scroll > o.height ? "top" : "top" == g && j.top - o.scroll - l < 0 ? "bottom" : "right" == g && j.right + k > o.width ? "left" : "left" == g && j.left - k < o.left ? "right" : g, e.removeClass(m).addClass(g) } var p = this.getCalculatedOffset(g, j, k, l); this.applyPlacement(p, g); var q = function () { d.$element.trigger("shown.bs." + d.type), d.hoverState = null }; a.support.transition && this.$tip.hasClass("fade") ? e.one("bsTransitionEnd", q).emulateTransitionEnd(150) : q() } }, c.prototype.applyPlacement = function (b, c) { var d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10); isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({ using: function (a) { d.css({ top: Math.round(a.top), left: Math.round(a.left) }) } }, b), 0), d.addClass("in"); var i = d[0].offsetWidth, j = d[0].offsetHeight; "top" == c && j != f && (b.top = b.top + f - j); var k = this.getViewportAdjustedDelta(c, b, i, j); k.left ? b.left += k.left : b.top += k.top; var l = k.left ? 2 * k.left - e + i : 2 * k.top - f + j, m = k.left ? "left" : "top", n = k.left ? "offsetWidth" : "offsetHeight"; d.offset(b), this.replaceArrow(l, d[0][n], m) }, c.prototype.replaceArrow = function (a, b, c) { this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "") }, c.prototype.setContent = function () { var a = this.tip(), b = this.getTitle(); a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right") }, c.prototype.hide = function () { function b() { "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type) } var c = this, d = this.tip(), e = a.Event("hide.bs." + this.type); return this.$element.removeAttr("aria-describedby"), this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b(), this.hoverState = null, this) }, c.prototype.fixTitle = function () { var a = this.$element; (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "") }, c.prototype.hasContent = function () { return this.getTitle() }, c.prototype.getPosition = function (b) { b = b || this.$element; var c = b[0], d = "BODY" == c.tagName; return a.extend({}, "function" == typeof c.getBoundingClientRect ? c.getBoundingClientRect() : null, { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop(), width: d ? a(window).width() : b.outerWidth(), height: d ? a(window).height() : b.outerHeight() }, d ? { top: 0, left: 0 } : b.offset()) }, c.prototype.getCalculatedOffset = function (a, b, c, d) { return "bottom" == a ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 } : "top" == a ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 } : "left" == a ? { top: b.top + b.height / 2 - d / 2, left: b.left - c } : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width } }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) { var e = { top: 0, left: 0 }; if (!this.$viewport) return e; var f = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport); if (/right|left/.test(a)) { var h = b.top - f - g.scroll, i = b.top + f - g.scroll + d; h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i) } else { var j = b.left - f, k = b.left + f + c; j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k) } return e }, c.prototype.getTitle = function () { var a, b = this.$element, c = this.options; return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title) }, c.prototype.getUID = function (a) { do a += ~~(1e6 * Math.random()); while (document.getElementById(a)); return a }, c.prototype.tip = function () { return this.$tip = this.$tip || a(this.options.template) }, c.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow") }, c.prototype.validate = function () { this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null) }, c.prototype.enable = function () { this.enabled = !0 }, c.prototype.disable = function () { this.enabled = !1 }, c.prototype.toggleEnabled = function () { this.enabled = !this.enabled }, c.prototype.toggle = function (b) { var c = this; b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c) }, c.prototype.destroy = function () { clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type) }; var d = a.fn.tooltip; a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () { return a.fn.tooltip = d, this } }(jQuery), +function (a) { "use strict"; function b(b) { return this.each(function () { var d = a(this), e = d.data("bs.popover"), f = "object" == typeof b && b; (e || "destroy" != b) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]()) }) } var c = function (a, b) { this.init("popover", a, b) }; if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js"); c.VERSION = "3.2.0", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () { return c.DEFAULTS }, c.prototype.setContent = function () { var a = this.tip(), b = this.getTitle(), c = this.getContent(); a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").empty()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide() }, c.prototype.hasContent = function () { return this.getTitle() || this.getContent() }, c.prototype.getContent = function () { var a = this.$element, b = this.options; return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content) }, c.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find(".arrow") }, c.prototype.tip = function () { return this.$tip || (this.$tip = a(this.options.template)), this.$tip }; var d = a.fn.popover; a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () { return a.fn.popover = d, this } }(jQuery), +function (a) { "use strict"; function b(c, d) { var e = a.proxy(this.process, this); this.$body = a("body"), this.$scrollElement = a(a(c).is("body") ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e), this.refresh(), this.process() } function c(c) { return this.each(function () { var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c; e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]() }) } b.VERSION = "3.2.0", b.DEFAULTS = { offset: 10 }, b.prototype.getScrollHeight = function () { return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight) }, b.prototype.refresh = function () { var b = "offset", c = 0; a.isWindow(this.$scrollElement[0]) || (b = "position", c = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(); var d = this; this.$body.find(this.selector).map(function () { var d = a(this), e = d.data("target") || d.attr("href"), f = /^#./.test(e) && a(e); return f && f.length && f.is(":visible") && [[f[b]().top + c, e]] || null }).sort(function (a, b) { return a[0] - b[0] }).each(function () { d.offsets.push(this[0]), d.targets.push(this[1]) }) }, b.prototype.process = function () { var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(), d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget; if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a); if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a); for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a]) }, b.prototype.activate = function (b) { this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active"); var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active"); d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy") }; var d = a.fn.scrollspy; a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () { return a.fn.scrollspy = d, this }, a(window).on("load.bs.scrollspy.data-api", function () { a('[data-spy="scroll"]').each(function () { var b = a(this); c.call(b, b.data()) }) }) }(jQuery), +function (a) { "use strict"; function b(b) { return this.each(function () { var d = a(this), e = d.data("bs.tab"); e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]() }) } var c = function (b) { this.element = a(b) }; c.VERSION = "3.2.0", c.prototype.show = function () { var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target"); if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) { var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", { relatedTarget: e }); if (b.trigger(f), !f.isDefaultPrevented()) { var g = a(d); this.activate(b.closest("li"), c), this.activate(g, g.parent(), function () { b.trigger({ type: "shown.bs.tab", relatedTarget: e }) }) } } }, c.prototype.activate = function (b, c, d) { function e() { f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d() } var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade"); g ? f.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), f.removeClass("in") }; var d = a.fn.tab; a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () { return a.fn.tab = d, this }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (c) { c.preventDefault(), b.call(a(this), "show") }) }(jQuery), +function (a) { "use strict"; function b(b) { return this.each(function () { var d = a(this), e = d.data("bs.affix"), f = "object" == typeof b && b; e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]() }) } var c = function (b, d) { this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition() }; c.VERSION = "3.2.0", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = { offset: 0, target: window }, c.prototype.getPinnedOffset = function () { if (this.pinnedOffset) return this.pinnedOffset; this.$element.removeClass(c.RESET).addClass("affix"); var a = this.$target.scrollTop(), b = this.$element.offset(); return this.pinnedOffset = b.top - a }, c.prototype.checkPositionWithEventLoop = function () { setTimeout(a.proxy(this.checkPosition, this), 1) }, c.prototype.checkPosition = function () { if (this.$element.is(":visible")) { var b = a(document).height(), d = this.$target.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.top, h = f.bottom; "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), "function" == typeof h && (h = f.bottom(this.$element)); var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= b - h ? "bottom" : null != g && g >= d ? "top" : !1; if (this.affixed !== i) { null != this.unpin && this.$element.css("top", ""); var j = "affix" + (i ? "-" + i : ""), k = a.Event(j + ".bs.affix"); this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({ top: b - this.$element.height() - h })) } } }; var d = a.fn.affix; a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () { return a.fn.affix = d, this }, a(window).on("load", function () { a('[data-spy="affix"]').each(function () { var c = a(this), d = c.data(); d.offset = d.offset || {}, d.offsetBottom && (d.offset.bottom = d.offsetBottom), d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d) }) }) }(jQuery);
(function e(t, n, r) { function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++) s(r[o]); return s })({
    1: [function (require, module, exports) {
        var attribute, bind, currentBindingCallbacks, elements, eventName, fireCustomChangeEvent, getContext, getValue, isKeypath, j, k, keypathForKey, keypathRegex, len, len1, nodeCount, preventDefaultForEvent, ref, ref1, refreshElement, refreshQueued, rootContext, rootNode, setValue, setupAttributeBinding, setupEventBinding, stringifyNodeAttributes, valueAttributeForNode, wrapFunctionString,
          slice = [].slice;

        window.Twine = {};

        Twine.shouldDiscardEvent = {};

        elements = {};

        nodeCount = 0;

        rootContext = null;

        keypathRegex = /^[a-z]\w*(\.[a-z]\w*|\[\d+\])*$/i;

        refreshQueued = false;

        rootNode = null;

        currentBindingCallbacks = null;

        Twine.getAttribute = function (node, attr) {
            return node.getAttribute("data-" + attr) || node.getAttribute(attr);
        };

        Twine.reset = function (newContext, node) {
            var bindings, j, key, len, obj, ref;
            if (node == null) {
                node = document.documentElement;
            }
            for (key in elements) {
                if (bindings = (ref = elements[key]) != null ? ref.bindings : void 0) {
                    for (j = 0, len = bindings.length; j < len; j++) {
                        obj = bindings[j];
                        if (obj.teardown) {
                            obj.teardown();
                        }
                    }
                }
            }
            elements = {};
            rootContext = newContext;
            rootNode = node;
            rootNode.bindingId = nodeCount = 1;
            return this;
        };

        Twine.bind = function (node, context) {
            if (node == null) {
                node = rootNode;
            }
            if (context == null) {
                context = Twine.context(node);
            }
            return bind(context, node, true);
        };

        Twine.afterBound = function (callback) {
            if (currentBindingCallbacks) {
                return currentBindingCallbacks.push(callback);
            } else {
                return callback();
            }
        };

        bind = function (context, node, forceSaveContext) {
            var binding, callback, callbacks, childNode, definition, element, fn, j, k, keypath, len, len1, newContextKey, ref, ref1, ref2, type;
            currentBindingCallbacks = [];
            if (node.bindingId) {
                Twine.unbind(node);
            }
            ref = Twine.bindingTypes;
            for (type in ref) {
                binding = ref[type];
                if (!(definition = Twine.getAttribute(node, type))) {
                    continue;
                }
                if (!element) {
                    element = {
                        bindings: []
                    };
                }
                fn = binding(node, context, definition, element);
                if (fn) {
                    element.bindings.push(fn);
                }
            }
            if (newContextKey = Twine.getAttribute(node, 'context')) {
                keypath = keypathForKey(newContextKey);
                if (keypath[0] === '$root') {
                    context = rootContext;
                    keypath = keypath.slice(1);
                }
                context = getValue(context, keypath) || setValue(context, keypath, {});
            }
            if (element || newContextKey || forceSaveContext) {
                (element != null ? element : element = {}).childContext = context;
                elements[node.bindingId != null ? node.bindingId : node.bindingId = ++nodeCount] = element;
            }
            callbacks = currentBindingCallbacks;
            ref1 = node.children || [];
            for (j = 0, len = ref1.length; j < len; j++) {
                childNode = ref1[j];
                bind(context, childNode);
            }
            Twine.count = nodeCount;
            ref2 = callbacks || [];
            for (k = 0, len1 = ref2.length; k < len1; k++) {
                callback = ref2[k];
                callback();
            }
            currentBindingCallbacks = null;
            return Twine;
        };

        Twine.refresh = function () {
            if (refreshQueued) {
                return;
            }
            refreshQueued = true;
            return setTimeout(Twine.refreshImmediately, 0);
        };

        refreshElement = function (element) {
            var j, len, obj, ref;
            if (element.bindings) {
                ref = element.bindings;
                for (j = 0, len = ref.length; j < len; j++) {
                    obj = ref[j];
                    if (obj.refresh != null) {
                        obj.refresh();
                    }
                }
            }
        };

        Twine.refreshImmediately = function () {
            var element, key;
            refreshQueued = false;
            for (key in elements) {
                element = elements[key];
                refreshElement(element);
            }
        };

        Twine.change = function (node, bubble) {
            var event;
            if (bubble == null) {
                bubble = false;
            }
            event = document.createEvent("HTMLEvents");
            event.initEvent('change', bubble, true);
            return node.dispatchEvent(event);
        };

        Twine.unbind = function (node) {
            var bindings, childNode, id, j, k, len, len1, obj, ref, ref1;
            if (id = node.bindingId) {
                if (bindings = (ref = elements[id]) != null ? ref.bindings : void 0) {
                    for (j = 0, len = bindings.length; j < len; j++) {
                        obj = bindings[j];
                        if (obj.teardown) {
                            obj.teardown();
                        }
                    }
                }
                delete elements[id];
                delete node.bindingId;
            }
            ref1 = node.children || [];
            for (k = 0, len1 = ref1.length; k < len1; k++) {
                childNode = ref1[k];
                Twine.unbind(childNode);
            }
            return this;
        };

        Twine.context = function (node) {
            return getContext(node, false);
        };

        Twine.childContext = function (node) {
            return getContext(node, true);
        };

        getContext = function (node, child) {
            var context, id, ref;
            while (node) {
                if (node === rootNode) {
                    return rootContext;
                }
                if (!child) {
                    node = node.parentNode;
                }
                if (!node) {
                    console.warn("Unable to find context; please check that the node is attached to the DOM that Twine has bound, or that bindings have been initiated on this node's DOM");
                    return null;
                }
                if ((id = node.bindingId) && (context = (ref = elements[id]) != null ? ref.childContext : void 0)) {
                    return context;
                }
                if (child) {
                    node = node.parentNode;
                }
            }
        };

        Twine.contextKey = function (node, lastContext) {
            var addKey, context, id, keys, ref;
            keys = [];
            addKey = function (context) {
                var key, val;
                for (key in context) {
                    val = context[key];
                    if (!(lastContext === val)) {
                        continue;
                    }
                    keys.unshift(key);
                    break;
                }
                return lastContext = context;
            };
            while (node && node !== rootNode && (node = node.parentNode)) {
                if ((id = node.bindingId) && (context = (ref = elements[id]) != null ? ref.childContext : void 0)) {
                    addKey(context);
                }
            }
            if (node === rootNode) {
                addKey(rootContext);
            }
            return keys.join('.');
        };

        valueAttributeForNode = function (node) {
            var name, ref;
            name = node.nodeName.toLowerCase();
            if (name === 'input' || name === 'textarea' || name === 'select') {
                if ((ref = node.getAttribute('type')) === 'checkbox' || ref === 'radio') {
                    return 'checked';
                } else {
                    return 'value';
                }
            } else {
                return 'textContent';
            }
        };

        keypathForKey = function (key) {
            var end, j, keypath, len, ref, start;
            keypath = [];
            ref = key.split('.');
            for (j = 0, len = ref.length; j < len; j++) {
                key = ref[j];
                if ((start = key.indexOf('[')) !== -1) {
                    keypath.push(key.substr(0, start));
                    key = key.substr(start);
                    while ((end = key.indexOf(']')) !== -1) {
                        keypath.push(parseInt(key.substr(1, end), 10));
                        key = key.substr(end + 1);
                    }
                } else {
                    keypath.push(key);
                }
            }
            return keypath;
        };

        getValue = function (object, keypath) {
            var j, key, len;
            for (j = 0, len = keypath.length; j < len; j++) {
                key = keypath[j];
                if (object != null) {
                    object = object[key];
                }
            }
            return object;
        };

        setValue = function (object, keypath, value) {
            var j, k, key, lastKey, len, ref;
            ref = keypath, keypath = 2 <= ref.length ? slice.call(ref, 0, j = ref.length - 1) : (j = 0, []), lastKey = ref[j++];
            for (k = 0, len = keypath.length; k < len; k++) {
                key = keypath[k];
                object = object[key] != null ? object[key] : object[key] = {};
            }
            return object[lastKey] = value;
        };

        stringifyNodeAttributes = function (node) {
            var attr, i, nAttributes, result;
            nAttributes = node.attributes.length;
            i = 0;
            result = "";
            while (i < nAttributes) {
                attr = node.attributes.item(i);
                result += attr.nodeName + "='" + attr.textContent + "'";
                i += 1;
            }
            return result;
        };

        wrapFunctionString = function (code, args, node) {
            var e, error, keypath;
            if (isKeypath(code) && (keypath = keypathForKey(code))) {
                if (keypath[0] === '$root') {
                    return function ($context, $root) {
                        return getValue($root, keypath);
                    };
                } else {
                    return function ($context, $root) {
                        return getValue($context, keypath);
                    };
                }
            } else {
                try {
                    return new Function(args, "with($context) { return " + code + " }");
                } catch (error) {
                    e = error;
                    throw "Twine error: Unable to create function on " + node.nodeName + " node with attributes " + (stringifyNodeAttributes(node));
                }
            }
        };

        isKeypath = function (value) {
            return (value !== 'true' && value !== 'false' && value !== 'null' && value !== 'undefined') && keypathRegex.test(value);
        };

        fireCustomChangeEvent = function (node) {
            var event;
            event = document.createEvent('CustomEvent');
            event.initCustomEvent('bindings:change', true, false, {});
            return node.dispatchEvent(event);
        };

        Twine.bindingTypes = {
            bind: function (node, context, definition) {
                var changeHandler, checkedValueType, checkedValueTypeNumber, fn, keypath, lastValue, oldValue, refresh, refreshContext, teardown, twoWayBinding, value, valueAttribute;
                valueAttribute = valueAttributeForNode(node);
                value = node[valueAttribute];
                lastValue = void 0;
                teardown = void 0;
                checkedValueType = node.getAttribute('type') === 'radio';
                //Check neu value truyen vao la so duoc  dinh dang co dau ","
                checkedValueTypeNumber = node.getAttribute('type-number') === 'number';
                fn = wrapFunctionString(definition, '$context,$root', node);
                refresh = function () {
                    var newValue;
                    newValue = fn.call(node, context, rootContext);
                    if (newValue === lastValue) {
                        return;
                    }
                    lastValue = newValue;
                    if (newValue === node[valueAttribute]) {
                        return;
                    }
                    node[valueAttribute] = checkedValueType ? newValue === node.value : newValue;
                    if (checkedValueTypeNumber) {
                        node.value = node.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                    }
                    return fireCustomChangeEvent(node);
                };
                if (!isKeypath(definition)) {
                    return {
                        refresh: refresh
                    };
                }
                refreshContext = function () {
                    if (checkedValueType) {
                        if (!node.checked) {
                            return;
                        }
                        return setValue(context, keypath, node.value);
                    } else {
                        if (checkedValueTypeNumber) {
                            return setValue(context, keypath, node.value.split(",").join(""));
                        } else {
                            return setValue(context, keypath, node[valueAttribute]);
                        }
                        
                    }
                };
                keypath = keypathForKey(definition);
                twoWayBinding = valueAttribute !== 'textContent' && node.type !== 'hidden';
                if (keypath[0] === '$root') {
                    context = rootContext;
                    keypath = keypath.slice(1);
                }
                if ((value != null) && (twoWayBinding || value !== '') && ((oldValue = getValue(context, keypath)) == null)) {
                    refreshContext();
                }
                if (twoWayBinding) {
                    changeHandler = function () {
                        if (getValue(context, keypath) === this[valueAttribute]) {
                            return;
                        }
                        refreshContext();
                        return Twine.refreshImmediately();
                    };
                    $(node).on('input keyup change', changeHandler);
                    teardown = function () {
                        return $(node).off('input keyup change', changeHandler);
                    };
                }
                return {
                    refresh: refresh,
                    teardown: teardown
                };
            },
            'bind-show': function (node, context, definition) {
                var fn, lastValue;
                fn = wrapFunctionString(definition, '$context,$root', node);
                lastValue = void 0;
                return {
                    refresh: function () {
                        var newValue;
                        newValue = !fn.call(node, context, rootContext);
                        if (newValue === lastValue) {
                            return;
                        }
                        return $(node).toggleClass('hide', lastValue = newValue);
                    }
                };
            },
            'bind-class': function (node, context, definition) {
                var fn, lastValue;
                fn = wrapFunctionString(definition, '$context,$root', node);
                lastValue = {};
                return {
                    refresh: function () {
                        var key, newValue, value;
                        newValue = fn.call(node, context, rootContext);
                        for (key in newValue) {
                            value = newValue[key];
                            if (!lastValue[key] !== !value) {
                                $(node).toggleClass(key, !!value);
                            }
                        }
                        return lastValue = newValue;
                    }
                };
            },
            'bind-attribute': function (node, context, definition) {
                var fn, lastValue;
                fn = wrapFunctionString(definition, '$context,$root', node);
                lastValue = {};
                return {
                    refresh: function () {
                        var key, newValue, value;
                        newValue = fn.call(node, context, rootContext);
                        for (key in newValue) {
                            value = newValue[key];
                            if (lastValue[key] !== value) {
                                $(node).attr(key, value || null);
                            }
                        }
                        return lastValue = newValue;
                    }
                };
            },
            define: function (node, context, definition) {
                var fn, key, object, value;
                fn = wrapFunctionString(definition, '$context,$root', node);
                object = fn.call(node, context, rootContext);
                for (key in object) {
                    value = object[key];
                    context[key] = value;
                }
            },
            "eval": function (node, context, definition) {
                var fn;
                fn = wrapFunctionString(definition, '$context,$root', node);
                fn.call(node, context, rootContext);
            }
        };

        setupAttributeBinding = function (attributeName, bindingName) {
            var booleanAttribute;
            booleanAttribute = attributeName === 'checked' || attributeName === 'indeterminate' || attributeName === 'disabled' || attributeName === 'readOnly';
            return Twine.bindingTypes["bind-" + bindingName] = function (node, context, definition) {
                var fn, lastValue;
                fn = wrapFunctionString(definition, '$context,$root', node);
                lastValue = void 0;
                return {
                    refresh: function () {
                        var newValue;
                        newValue = fn.call(node, context, rootContext);
                        if (booleanAttribute) {
                            newValue = !!newValue;
                        }
                        if (newValue === lastValue) {
                            return;
                        }
                        node[attributeName] = lastValue = newValue;
                        if (attributeName === 'checked') {
                            return fireCustomChangeEvent(node);
                        }
                    }
                };
            };
        };

        ref = ['placeholder', 'checked', 'indeterminate', 'disabled', 'href', 'title', 'readOnly', 'src'];
        for (j = 0, len = ref.length; j < len; j++) {
            attribute = ref[j];
            setupAttributeBinding(attribute, attribute);
        }

        setupAttributeBinding('innerHTML', 'unsafe-html');

        preventDefaultForEvent = function (event) {
            return (event.type === 'submit' || event.currentTarget.nodeName.toLowerCase() === 'a') && Twine.getAttribute(event.currentTarget, 'allow-default') !== '1';
        };

        setupEventBinding = function (eventName) {
            return Twine.bindingTypes["bind-event-" + eventName] = function (node, context, definition) {
                var onEventHandler;
                onEventHandler = function (event, data) {
                    var base, discardEvent;
                    discardEvent = typeof (base = Twine.shouldDiscardEvent)[eventName] === "function" ? base[eventName](event) : void 0;
                    if (discardEvent || preventDefaultForEvent(event)) {
                        event.preventDefault();
                    }
                    if (discardEvent) {
                        return;
                    }
                    wrapFunctionString(definition, '$context,$root,event,data', node).call(node, context, rootContext, event, data);
                    return Twine.refreshImmediately();
                };
                $(node).on(eventName, onEventHandler);
                return {
                    teardown: function () {
                        return $(node).off(eventName, onEventHandler);
                    }
                };
            };
        };

        ref1 = ['click', 'dblclick', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'submit', 'dragenter', 'dragleave', 'dragover', 'drop', 'drag', 'change', 'keypress', 'keydown', 'keyup', 'input', 'error', 'done', 'success', 'fail', 'blur', 'focus', 'load', 'paste'];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
            eventName = ref1[k];
            setupEventBinding(eventName);
        }



    }, {}]
}, {}, [1]);

$(function () {
    jQuery.validator.addMethod("validemail", function (value, element) {        
        var emailPattern = /^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(value);
    });
    jQuery.validator.unobtrusive.adapters.addBool("validemail");
});

$.datepicker.regional['vi'] = {
    clearText: 'Xóa', clearStatus: '',
    closeText: 'Đóng', closeStatus: '',
    prevText: '', prevStatus: '',
    prevBigText: '&#x3c;&#x3c;', prevBigStatus: '',
    nextText: '', nextStatus: '',
    nextBigText: '&#x3e;&#x3e;', nextBigStatus: '',
    currentText: 'Hôm nay', currentStatus: '',
    monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    monthNamesShort: ['1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11', '12'],
    monthStatus: '', yearStatus: '',
    weekHeader: 'ĐT', weekStatus: '',
    dayNames: ['Chủ Nhật', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Thứ Hai'],
    dayNamesShort: ['Chủ Nhật', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Thứ Hai'],
    dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    dayStatus: 'Chọn DD là ngày đầu tuần', dateStatus: 'D, Ngà\\u0079 d Tháng M',
    dateFormat: 'mm/dd/yy', firstDay: 1,
    initStatus: 'Chọn một ngày', isRTL: false
};
$.datepicker.setDefaults($.datepicker.regional['vi']);

function subString(text) {
    var wordsToCut = 5;
    var wordsArray = text.split(" ");
    if (wordsArray.length > wordsToCut) {
        var strShort = "";
        for (i = 0; i < wordsToCut; i++) {
            strShort += wordsArray[i] + " ";
        }
        return strShort + "...";
    } else {
        return text;
    }
};
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
/*
 *
 * Copyright (c) 2010 C. F., Wong (<a href="http://cloudgen.w0ng.hk">Cloudgen Examplet Store</a>)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
﻿(function(k,e,i,j){k.fn.caret=function(b,l){var a,c,f=this[0],d=k.browser.msie;if(typeof b==="object"&&typeof b.start==="number"&&typeof b.end==="number"){a=b.start;c=b.end}else if(typeof b==="number"&&typeof l==="number"){a=b;c=l}else if(typeof b==="string")if((a=f.value.indexOf(b))>-1)c=a+b[e];else a=null;else if(Object.prototype.toString.call(b)==="[object RegExp]"){b=b.exec(f.value);if(b!=null){a=b.index;c=a+b[0][e]}}if(typeof a!="undefined"){if(d){d=this[0].createTextRange();d.collapse(true);
d.moveStart("character",a);d.moveEnd("character",c-a);d.select()}else{this[0].selectionStart=a;this[0].selectionEnd=c}this[0].focus();return this}else{if(d){c=document.selection;if(this[0].tagName.toLowerCase()!="textarea"){d=this.val();a=c[i]()[j]();a.moveEnd("character",d[e]);var g=a.text==""?d[e]:d.lastIndexOf(a.text);a=c[i]()[j]();a.moveStart("character",-d[e]);var h=a.text[e]}else{a=c[i]();c=a[j]();c.moveToElementText(this[0]);c.setEndPoint("EndToEnd",a);g=c.text[e]-a.text[e];h=g+a.text[e]}}else{g=
f.selectionStart;h=f.selectionEnd}a=f.value.substring(g,h);return{start:g,end:h,text:a,replace:function(m){return f.value.substring(0,g)+m+f.value.substring(h,f.value[e])}}}}})(jQuery,"length","createRange","duplicate");
(function($){$.fn.jCarouselLite=function(o){o=$.extend({btnPrev:null,btnNext:null,btnGo:null,mouseWheel:false,auto:null,speed:200,easing:null,vertical:false,circular:true,visible:3,start:0,scroll:1,beforeStart:null,afterEnd:null},o||{});return this.each(function(){var b=false,animCss=o.vertical?"top":"left",sizeCss=o.vertical?"height":"width";var c=$(this),ul=$("ul",c),tLi=$("li",ul),tl=tLi.size(),v=o.visible;if(o.circular){ul.prepend(tLi.slice(tl-v-1+1).clone()).append(tLi.slice(0,v).clone());o.start+=v}var f=$("li",ul),itemLength=f.size(),curr=o.start;c.css("visibility","visible");f.css({overflow:"hidden",float:o.vertical?"none":"left"});ul.css({margin:"0",padding:"0",position:"relative","list-style-type":"none","z-index":"1"});c.css({overflow:"hidden",position:"relative","z-index":"2",left:"0px"});var g=o.vertical?height(f):width(f);var h=g*itemLength;var j=g*v;f.css({width:f.width(),height:f.height()});ul.css(sizeCss,h+"px").css(animCss,-(curr*g));c.css(sizeCss,j+"px");if(o.btnPrev)$(o.btnPrev).click(function(){return go(curr-o.scroll)});if(o.btnNext)$(o.btnNext).click(function(){return go(curr+o.scroll)});if(o.btnGo)$.each(o.btnGo,function(i,a){$(a).click(function(){return go(o.circular?o.visible+i:i)})});if(o.mouseWheel&&c.mousewheel)c.mousewheel(function(e,d){return d>0?go(curr-o.scroll):go(curr+o.scroll)});if(o.auto)setInterval(function(){go(curr+o.scroll)},o.auto+o.speed);function vis(){return f.slice(curr).slice(0,v)};function go(a){if(!b){if(o.beforeStart)o.beforeStart.call(this,vis());if(o.circular){if(a<=o.start-v-1){ul.css(animCss,-((itemLength-(v*2))*g)+"px");curr=a==o.start-v-1?itemLength-(v*2)-1:itemLength-(v*2)-o.scroll}else if(a>=itemLength-v+1){ul.css(animCss,-((v)*g)+"px");curr=a==itemLength-v+1?v+1:v+o.scroll}else curr=a}else{if(a<0||a>itemLength-v)return;else curr=a}b=true;ul.animate(animCss=="left"?{left:-(curr*g)}:{top:-(curr*g)},o.speed,o.easing,function(){if(o.afterEnd)o.afterEnd.call(this,vis());b=false});if(!o.circular){$(o.btnPrev+","+o.btnNext).removeClass("disabled");$((curr-o.scroll<0&&o.btnPrev)||(curr+o.scroll>itemLength-v&&o.btnNext)||[]).addClass("disabled")}}return false}})};function css(a,b){return parseInt($.css(a[0],b))||0};function width(a){return a[0].offsetWidth+css(a,'marginLeft')+css(a,'marginRight')};function height(a){return a[0].offsetHeight+css(a,'marginTop')+css(a,'marginBottom')}})(jQuery);
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function (a) { function d(b) { var c = b || window.event, d = [].slice.call(arguments, 1), e = 0, f = !0, g = 0, h = 0; return b = a.event.fix(c), b.type = "mousewheel", c.wheelDelta && (e = c.wheelDelta / 120), c.detail && (e = -c.detail / 3), h = e, c.axis !== undefined && c.axis === c.HORIZONTAL_AXIS && (h = 0, g = -1 * e), c.wheelDeltaY !== undefined && (h = c.wheelDeltaY / 120), c.wheelDeltaX !== undefined && (g = -1 * c.wheelDeltaX / 120), d.unshift(b, e, g, h), (a.event.dispatch || a.event.handle).apply(this, d) } var b = ["DOMMouseScroll", "mousewheel"]; if (a.event.fixHooks) for (var c = b.length; c;) a.event.fixHooks[b[--c]] = a.event.mouseHooks; a.event.special.mousewheel = { setup: function () { if (this.addEventListener) for (var a = b.length; a;) this.addEventListener(b[--a], d, !1); else this.onmousewheel = d }, teardown: function () { if (this.removeEventListener) for (var a = b.length; a;) this.removeEventListener(b[--a], d, !1); else this.onmousewheel = null } }, a.fn.extend({ mousewheel: function (a) { return a ? this.bind("mousewheel", a) : this.trigger("mousewheel") }, unmousewheel: function (a) { return this.unbind("mousewheel", a) } }) })(jQuery);

/**
 * jQuery Validation Plugin 1.9.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */



/*
** Unobtrusive validation support library for jQuery and jQuery Validate
** Copyright (C) Microsoft Corporation. All rights reserved.
*/
(function(a){var d=a.validator,b,f="unobtrusiveValidation";function c(a,b,c){a.rules[b]=c;if(a.message)a.messages[b]=a.message}function i(a){return a.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/g)}function g(a){return a.substr(0,a.lastIndexOf(".")+1)}function e(a,b){if(a.indexOf("*.")===0)a=a.replace("*.",b);return a}function l(c,d){var b=a(this).find("[data-valmsg-for='"+d[0].name+"']"),e=a.parseJSON(b.attr("data-valmsg-replace"))!==false;b.removeClass("field-validation-valid").addClass("field-validation-error");c.data("unobtrusiveContainer",b);if(e){b.empty();c.removeClass("input-validation-error").appendTo(b)}else c.hide()}function k(e,d){var c=a(this).find("[data-valmsg-summary=true]"),b=c.find("ul");if(b&&b.length&&d.errorList.length){b.empty();c.addClass("validation-summary-errors").removeClass("validation-summary-valid");a.each(d.errorList,function(){a("<li />").html(this.message).appendTo(b)})}}function j(c){var b=c.data("unobtrusiveContainer"),d=a.parseJSON(b.attr("data-valmsg-replace"));if(b){b.addClass("field-validation-valid").removeClass("field-validation-error");c.removeData("unobtrusiveContainer");d&&b.empty()}}function h(d){var b=a(d),c=b.data(f);if(!c){c={options:{errorClass:"input-validation-error",errorElement:"span",errorPlacement:a.proxy(l,d),invalidHandler:a.proxy(k,d),messages:{},rules:{},success:a.proxy(j,d)},attachValidation:function(){b.validate(this.options)},validate:function(){b.validate();return b.valid()}};b.data(f,c)}return c}d.unobtrusive={adapters:[],parseElement:function(b,i){var d=a(b),f=d.parents("form")[0],c,e,g;if(!f)return;c=h(f);c.options.rules[b.name]=e={};c.options.messages[b.name]=g={};a.each(this.adapters,function(){var c="data-val-"+this.name,i=d.attr(c),h={};if(i!==undefined){c+="-";a.each(this.params,function(){h[this]=d.attr(c+this)});this.adapt({element:b,form:f,message:i,params:h,rules:e,messages:g})}});jQuery.extend(e,{__dummy__:true});!i&&c.attachValidation()},parse:function(b){a(b).find(":input[data-val=true]").each(function(){d.unobtrusive.parseElement(this,true)});a("form").each(function(){var a=h(this);a&&a.attachValidation()})}};b=d.unobtrusive.adapters;b.add=function(c,a,b){if(!b){b=a;a=[]}this.push({name:c,params:a,adapt:b});return this};b.addBool=function(a,b){return this.add(a,function(d){c(d,b||a,true)})};b.addMinMax=function(e,g,f,a,d,b){return this.add(e,[d||"min",b||"max"],function(b){var e=b.params.min,d=b.params.max;if(e&&d)c(b,a,[e,d]);else if(e)c(b,g,e);else d&&c(b,f,d)})};b.addSingleVal=function(a,b,d){return this.add(a,[b||"val"],function(e){c(e,d||a,e.params[b])})};d.addMethod("__dummy__",function(){return true});d.addMethod("regex",function(b,c,d){var a;if(this.optional(c))return true;a=(new RegExp(d)).exec(b);return a&&a.index===0&&a[0].length===b.length});b.addSingleVal("accept","exts").addSingleVal("regex","pattern");b.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");b.addMinMax("length","minlength","maxlength","rangelength").addMinMax("range","min","max","range");b.add("equalto",["other"],function(b){var h=g(b.element.name),i=b.params.other,d=e(i,h),f=a(b.form).find(":input[name="+d+"]")[0];c(b,"equalTo",f)});b.add("required",function(a){(a.element.tagName.toUpperCase()!=="INPUT"||a.element.type.toUpperCase()!=="CHECKBOX")&&c(a,"required",true)});b.add("remote",["url","type","additionalfields"],function(b){var d={url:b.params.url,type:b.params.type||"GET",data:{}},f=g(b.element.name);a.each(i(b.params.additionalfields||b.element.name),function(h,g){var c=e(g,f);d.data[c]=function(){return a(b.form).find(":input[name='"+c+"']").val()}});c(b,"remote",d)});a(function(){d.unobtrusive.parse(document)})})(jQuery);
// @preserve jQuery.floatThead 1.2.8 - http://mkoryak.github.io/floatThead/ - Copyright (c) 2012 - 2014 Misha Koryak
// @license MIT



jQuery.validator.setDefaults({
    highlight: function (element, errorClass, validClass) {
        if (element.type === 'radio') {
            this.findByName(element.name).addClass(errorClass).removeClass(validClass);
        } else {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element).closest('.form-group').addClass('has-error');
        }
    },
    unhighlight: function (element, errorClass, validClass) {
        if (element.type === 'radio') {
            this.findByName(element.name).removeClass(errorClass).addClass(validClass);
        } else {
            $(element).removeClass(errorClass).addClass(validClass);
            $(element).closest('.form-group').removeClass('has-error');
        }
    }
});

$(function () {
    $("span.field-validation-valid, span.field-validation-error").addClass('help-block');
    $("div.form-group").has("span.field-validation-error").addClass('has-error');
    $("div.validation-summary-errors").has("li:visible").addClass("alert alert-block alert-danger");
});
/* =========================================================
 * bootstrap-datepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!function( $ ) {

	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
	}

	// Picker object

	var Datepicker = function(element, options) {
		var that = this;

		this.element = $(element);
		this.language = options.language||this.element.data('date-language')||"en";
		this.language = this.language in dates ? this.language : this.language.split('-')[0]; //Check if "de-DE" style date is available, if not language should fallback to 2 letter code eg "de"
		this.language = this.language in dates ? this.language : "en";
		this.isRTL = dates[this.language].rtl||false;
		this.format = DPGlobal.parseFormat(options.format||this.element.data('date-format')||dates[this.language].format||'mm/dd/yyyy');
		this.isInline = false;
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on, .btn') : false;
		this.hasInput = this.component && this.element.find('input').length;
		if(this.component && this.component.length === 0)
			this.component = false;

		this.forceParse = true;
		if ('forceParse' in options) {
			this.forceParse = options.forceParse;
		} else if ('dateForceParse' in this.element.data()) {
			this.forceParse = this.element.data('date-force-parse');
		}

		this.picker = $(DPGlobal.template);
		this._buildEvents();
		this._attachEvents();

		if(this.isInline) {
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		} else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}
		if (this.isRTL){
			this.picker.addClass('datepicker-rtl');
			this.picker.find('.prev i, .next i')
						.toggleClass('icon-arrow-left icon-arrow-right');
		}

		this.autoclose = false;
		if ('autoclose' in options) {
			this.autoclose = options.autoclose;
		} else if ('dateAutoclose' in this.element.data()) {
			this.autoclose = this.element.data('date-autoclose');
		}

		this.keyboardNavigation = true;
		if ('keyboardNavigation' in options) {
			this.keyboardNavigation = options.keyboardNavigation;
		} else if ('dateKeyboardNavigation' in this.element.data()) {
			this.keyboardNavigation = this.element.data('date-keyboard-navigation');
		}

		this.viewMode = this.startViewMode = 0;
		switch(options.startView || this.element.data('date-start-view')){
			case 2:
			case 'decade':
				this.viewMode = this.startViewMode = 2;
				break;
			case 1:
			case 'year':
				this.viewMode = this.startViewMode = 1;
				break;
		}

		this.minViewMode = options.minViewMode||this.element.data('date-min-view-mode')||0;
		if (typeof this.minViewMode === 'string') {
			switch (this.minViewMode) {
				case 'months':
					this.minViewMode = 1;
					break;
				case 'years':
					this.minViewMode = 2;
					break;
				default:
					this.minViewMode = 0;
					break;
			}
		}

		this.viewMode = this.startViewMode = Math.max(this.startViewMode, this.minViewMode);

		this.todayBtn = (options.todayBtn||this.element.data('date-today-btn')||false);
		this.todayHighlight = (options.todayHighlight||this.element.data('date-today-highlight')||false);

		this.calendarWeeks = false;
		if ('calendarWeeks' in options) {
			this.calendarWeeks = options.calendarWeeks;
		} else if ('dateCalendarWeeks' in this.element.data()) {
			this.calendarWeeks = this.element.data('date-calendar-weeks');
		}
		if (this.calendarWeeks)
			this.picker.find('tfoot th.today')
						.attr('colspan', function(i, val){
							return parseInt(val) + 1;
						});

		this._allow_update = false;

		this.weekStart = ((options.weekStart||this.element.data('date-weekstart')||dates[this.language].weekStart||0) % 7);
		this.weekEnd = ((this.weekStart + 6) % 7);
		this.startDate = -Infinity;
		this.endDate = Infinity;
		this.daysOfWeekDisabled = [];
		this.setStartDate(options.startDate||this.element.data('date-startdate'));
		this.setEndDate(options.endDate||this.element.data('date-enddate'));
		this.setDaysOfWeekDisabled(options.daysOfWeekDisabled||this.element.data('date-days-of-week-disabled'));
		this.fillDow();
		this.fillMonths();

		this._allow_update = true;

		this.update();
		this.showMode();

		if(this.isInline) {
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs){
			for (var i=0, el, ev; i<evs.length; i++){
				el = evs[i][0];
				ev = evs[i][1];
				el.on(ev);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev; i<evs.length; i++){
				el = evs[i][0];
				ev = evs[i][1];
				el.off(ev);
			}
		},
		_buildEvents: function(){
			if (this.isInput) { // single input
				this._events = [
					[this.element, {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(this.update, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			else if (this.component && this.hasInput){ // component: input + button
				this._events = [
					// For components that are not readonly, allow keyboard nav
					[this.element.find('input'), {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(this.update, this),
						keydown: $.proxy(this.keydown, this)
					}],
					[this.component, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			else if (this.element.is('div')) {  // inline datepicker
				this.isInline = true;
			}
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this)
					}]
				];
			}

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					mousedown: $.proxy(function (e) {
						// Clicked outside the datepicker, hide it
						if ($(e.target).closest('.datepicker.datepicker-inline, .datepicker.datepicker-dropdown').length === 0) {
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},

		show: function (e) {
		    
			if (!this.isInline)
				this.picker.appendTo('body');
			this.picker.show();
			this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
			this.place();
			this._attachSecondaryEvents();
			if (e) {
				e.preventDefault();
			}
			this.element.trigger({
				type: 'show',
				date: this.date
			});
		},

		hide: function(e){
			if(this.isInline) return;
			if (!this.picker.is(':visible')) return;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.viewMode = this.startViewMode;
			this.showMode();

			if (
				this.forceParse &&
				(
					this.isInput && this.element.val() ||
					this.hasInput && this.element.find('input').val()
				)
			)
				this.setValue();
			this.element.trigger({
				type: 'hide',
				date: this.date
			});
		},

		remove: function() {
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput) {
				delete this.element.data().date;
			}
		},

		getDate: function() {
			var d = this.getUTCDate();
			return new Date(d.getTime() + (d.getTimezoneOffset()*60000));
		},

		getUTCDate: function() {
			return this.date;
		},

		setDate: function(d) {
			this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset()*60000)));
		},

		setUTCDate: function(d) {
			this.date = d;
			this.setValue();
		},

		setValue: function() {
			var formatted = this.getFormattedDate();
			if (!this.isInput) {
				if (this.component){
					this.element.find('input').val(formatted);
				}
				this.element.data('date', formatted);
			} else {
				this.element.val(formatted);
			}
		},

		getFormattedDate: function(format) {
			if (format === undefined)
				format = this.format;
			return DPGlobal.formatDate(this.date, format, this.language);
		},

		setStartDate: function(startDate){
			this.startDate = startDate||-Infinity;
			if (this.startDate !== -Infinity) {
				this.startDate = DPGlobal.parseDate(this.startDate, this.format, this.language);
			}
			this.update();
			this.updateNavArrows();
		},

		setEndDate: function(endDate){
			this.endDate = endDate||Infinity;
			if (this.endDate !== Infinity) {
				this.endDate = DPGlobal.parseDate(this.endDate, this.format, this.language);
			}
			this.update();
			this.updateNavArrows();
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this.daysOfWeekDisabled = daysOfWeekDisabled||[];
			if (!$.isArray(this.daysOfWeekDisabled)) {
				this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/);
			}
			this.daysOfWeekDisabled = $.map(this.daysOfWeekDisabled, function (d) {
				return parseInt(d, 10);
			});
			this.update();
			this.updateNavArrows();
		},

		place: function () {
		    
						if(this.isInline) return;
			var zIndex = parseInt(this.element.parents().filter(function() {
							return $(this).css('z-index') != 'auto';
						}).first().css('z-index'))+10;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(true);
			this.picker.css({
				top: offset.top + height,
				left: offset.left,
				zIndex: zIndex
			});
		},

		_allow_update: true,
		update: function(){
			if (!this._allow_update) return;

			var date, fromArgs = false;
			if(arguments && arguments.length && (typeof arguments[0] === 'string' || arguments[0] instanceof Date)) {
				date = arguments[0];
				fromArgs = true;
			} else {
				date = this.isInput ? this.element.val() : this.element.data('date') || this.element.find('input').val();
			}

			this.date = DPGlobal.parseDate(date, this.format, this.language);

			if(fromArgs) this.setValue();

			if (this.date < this.startDate) {
				this.viewDate = new Date(this.startDate);
			} else if (this.date > this.endDate) {
				this.viewDate = new Date(this.endDate);
			} else {
				this.viewDate = new Date(this.date);
			}
			this.fill();
		},

		fillDow: function(){
			var dowCnt = this.weekStart,
			html = '<tr>';
			if(this.calendarWeeks){
				var cell = '<th class="cw">&nbsp;</th>';
				html += cell;
				this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
			}
			while (dowCnt < this.weekStart + 7) {
				html += '<th class="dow">'+dates[this.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function(){
			var html = '',
			i = 0;
			while (i < 12) {
				html += '<span class="month">'+dates[this.language].monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		fill: function() {
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.startDate !== -Infinity ? this.startDate.getUTCMonth() : -Infinity,
				endYear = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
				endMonth = this.endDate !== Infinity ? this.endDate.getUTCMonth() : Infinity,
				currentDate = this.date && this.date.valueOf(),
				today = new Date();
			this.picker.find('.datepicker-days thead th.switch')
						.text(dates[this.language].months[month]+' '+year);
			this.picker.find('tfoot th.today')
						.text(dates[this.language].today)
						.toggle(this.todayBtn !== false);
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month-1, 28,0,0,0,0),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while(prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getUTCDay() == this.weekStart) {
					html.push('<tr>');
					if(this.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(+ws + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(+(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek =  (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');

					}
				}
				clsName = '';
				if (prevMonth.getUTCFullYear() < year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month)) {
					clsName += ' old';
				} else if (prevMonth.getUTCFullYear() > year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month)) {
					clsName += ' new';
				}
				// Compare internal UTC date with local today, not UTC today
				if (this.todayHighlight &&
					prevMonth.getUTCFullYear() == today.getFullYear() &&
					prevMonth.getUTCMonth() == today.getMonth() &&
					prevMonth.getUTCDate() == today.getDate()) {
					clsName += ' today';
				}
				if (currentDate && prevMonth.valueOf() == currentDate) {
					clsName += ' active';
				}
				if (prevMonth.valueOf() < this.startDate || prevMonth.valueOf() > this.endDate ||
					$.inArray(prevMonth.getUTCDay(), this.daysOfWeekDisabled) !== -1) {
					clsName += ' disabled';
				}
				html.push('<td class="day'+clsName+'">'+prevMonth.getUTCDate() + '</td>');
				if (prevMonth.getUTCDay() == this.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
			var currentYear = this.date && this.date.getUTCFullYear();

			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');
			if (currentYear && currentYear == year) {
				months.eq(this.date.getUTCMonth()).addClass('active');
			}
			if (year < startYear || year > endYear) {
				months.addClass('disabled');
			}
			if (year == startYear) {
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year == endYear) {
				months.slice(endMonth+1).addClass('disabled');
			}

			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year'+(i == -1 || i == 10 ? ' old' : '')+(currentYear == year ? ' active' : '')+(year < startYear || year > endYear ? ' disabled' : '')+'">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		},

		updateNavArrows: function() {
			if (!this._allow_update) return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth();
			switch (this.viewMode) {
				case 0:
					if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
				case 2:
					if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		click: function(e) {
			e.preventDefault();
			var target = $(e.target).closest('span, td, th');
			if (target.length == 1) {
				switch(target[0].nodeName.toLowerCase()) {
					case 'th':
						switch(target[0].className) {
							case 'switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1);
								switch(this.viewMode){
									case 0:
										this.viewDate = this.moveMonth(this.viewDate, dir);
										break;
									case 1:
									case 2:
										this.viewDate = this.moveYear(this.viewDate, dir);
										break;
								}
								this.fill();
								break;
							case 'today':
								var date = new Date();
								date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

								this.showMode(-2);
								var which = this.todayBtn == 'linked' ? null : 'view';
								this._setDate(date, which);
								break;
						}
						break;
					case 'span':
						if (!target.is('.disabled')) {
							this.viewDate.setUTCDate(1);
							if (target.is('.month')) {
								var day = 1;
								var month = target.parent().find('span').index(target);
								var year = this.viewDate.getUTCFullYear();
								this.viewDate.setUTCMonth(month);
								this.element.trigger({
									type: 'changeMonth',
									date: this.viewDate
								});
								if ( this.minViewMode == 1 ) {
									this._setDate(UTCDate(year, month, day,0,0,0,0));
								}
							} else {
								var year = parseInt(target.text(), 10)||0;
								var day = 1;
								var month = 0;
								this.viewDate.setUTCFullYear(year);
								this.element.trigger({
									type: 'changeYear',
									date: this.viewDate
								});
								if ( this.minViewMode == 2 ) {
									this._setDate(UTCDate(year, month, day,0,0,0,0));
								}
							}
							this.showMode(-1);
							this.fill();
						}
						break;
					case 'td':
						if (target.is('.day') && !target.is('.disabled')){
							var day = parseInt(target.text(), 10)||1;
							var year = this.viewDate.getUTCFullYear(),
								month = this.viewDate.getUTCMonth();
							if (target.is('.old')) {
								if (month === 0) {
									month = 11;
									year -= 1;
								} else {
									month -= 1;
								}
							} else if (target.is('.new')) {
								if (month == 11) {
									month = 0;
									year += 1;
								} else {
									month += 1;
								}
							}
							this._setDate(UTCDate(year, month, day,0,0,0,0));
						}
						break;
				}
			}
		},

		_setDate: function(date, which){
			if (!which || which == 'date')
				this.date = date;
			if (!which || which  == 'view')
				this.viewDate = date;
			this.fill();
			this.setValue();
			this.element.trigger({
				type: 'changeDate',
				date: this.date
			});
			var element;
			if (this.isInput) {
				element = this.element;
			} else if (this.component){
				element = this.element.find('input');
			}
			if (element) {
				element.change();
				if (this.autoclose && (!which || which == 'date')) {
					this.hide();
				}
			}
		},

		moveMonth: function(date, dir){
			if (!dir) return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag == 1){
				test = dir == -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){ return new_date.getUTCMonth() == month; }
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){ return new_date.getUTCMonth() != new_month; };
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			} else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i<mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){ return new_month != new_date.getUTCMonth(); };
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},

		dateWithinRange: function(date){
			return date >= this.startDate && date <= this.endDate;
		},

		keydown: function(e){
			if (this.picker.is(':not(:visible)')){
				if (e.keyCode == 27) // allow escape to hide and re-show picker
					this.show();
				return;
			}
			var dateChanged = false,
				dir, day, month,
				newDate, newViewDate;
			switch(e.keyCode){
				case 27: // escape
					this.hide();
					e.preventDefault();
					break;
				case 37: // left
				case 39: // right
					if (!this.keyboardNavigation) break;
					dir = e.keyCode == 37 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.date, dir);
						newViewDate = this.moveYear(this.viewDate, dir);
					} else if (e.shiftKey){
						newDate = this.moveMonth(this.date, dir);
						newViewDate = this.moveMonth(this.viewDate, dir);
					} else {
						newDate = new Date(this.date);
						newDate.setUTCDate(this.date.getUTCDate() + dir);
						newViewDate = new Date(this.viewDate);
						newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir);
					}
					if (this.dateWithinRange(newDate)){
						this.date = newDate;
						this.viewDate = newViewDate;
						this.setValue();
						this.update();
						e.preventDefault();
						dateChanged = true;
					}
					break;
				case 38: // up
				case 40: // down
					if (!this.keyboardNavigation) break;
					dir = e.keyCode == 38 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.date, dir);
						newViewDate = this.moveYear(this.viewDate, dir);
					} else if (e.shiftKey){
						newDate = this.moveMonth(this.date, dir);
						newViewDate = this.moveMonth(this.viewDate, dir);
					} else {
						newDate = new Date(this.date);
						newDate.setUTCDate(this.date.getUTCDate() + dir * 7);
						newViewDate = new Date(this.viewDate);
						newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir * 7);
					}
					if (this.dateWithinRange(newDate)){
						this.date = newDate;
						this.viewDate = newViewDate;
						this.setValue();
						this.update();
						e.preventDefault();
						dateChanged = true;
					}
					break;
				case 13: // enter
					this.hide();
					e.preventDefault();
					break;
				case 9: // tab
					this.hide();
					break;
			}
			if (dateChanged){
				this.element.trigger({
					type: 'changeDate',
					date: this.date
				});
				var element;
				if (this.isInput) {
					element = this.element;
				} else if (this.component){
					element = this.element.find('input');
				}
				if (element) {
					element.change();
				}
			}
		},

		showMode: function(dir) {
			if (dir) {
				this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
			}
			/*
				vitalets: fixing bug of very special conditions:
				jquery 1.7.1 + webkit + show inline datepicker in bootstrap popover.
				Method show() does not set display css correctly and datepicker is not shown.
				Changed to .css('display', 'block') solve the problem.
				See https://github.com/vitalets/x-editable/issues/37

				In jquery 1.7.2+ everything works fine.
			*/
			//this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
			this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).css('display', 'block');
			this.updateNavArrows();
		}
	};

	$.fn.datepicker = function (option) {
		var args = Array.apply(null, arguments);
		args.shift();
		return this.each(function () {
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option == 'object' && option;
			if (!data) {
				$this.data('datepicker', (data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults,options))));
			}
			if (typeof option == 'string' && typeof data[option] == 'function') {
				data[option].apply(data, args);
			}
		});
	};

	$.fn.datepicker.defaults = {
	};
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today"
		}
	};

	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
		}],
		isLeapYear: function (year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
		},
		getDaysInMonth: function (year, month) {
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			// IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language) {
			if (date instanceof Date) return date;
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
				var part_re = /([\-+]\d+)([dmwy])/,
					parts = date.match(/([\-+]\d+)([dmwy])/g),
					part, dir;
				date = new Date();
				for (var i=0; i<parts.length; i++) {
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					switch(part[2]){
						case 'd':
							date.setUTCDate(date.getUTCDate() + dir);
							break;
						case 'm':
							date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
							break;
						case 'w':
							date.setUTCDate(date.getUTCDate() + dir * 7);
							break;
						case 'y':
							date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
							break;
					}
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
			}
			var parts = date && date.match(this.nonpunctuation) || [],
				date = new Date(),
				parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){ return d.setUTCFullYear(v); },
					yy: function(d,v){ return d.setUTCFullYear(2000+v); },
					m: function(d,v){
						v -= 1;
						while (v<0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() != v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){ return d.setUTCDate(v); }
				},
				val, filtered, part;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length != fparts.length) {
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			if (parts.length == fparts.length) {
				for (var i=0, cnt = fparts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)) {
						switch(part) {
							case 'MM':
								filtered = $(dates[language].months).filter(function(){
									var m = this.slice(0, parts[i].length),
										p = parts[i].slice(0, m.length);
									return m == p;
								});
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(function(){
									var m = this.slice(0, parts[i].length),
										p = parts[i].slice(0, m.length);
									return m == p;
								});
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				for (var i=0, s; i<setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s]))
						setters_map[s](date, parsed[s]);
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			var date = [],
				seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i < cnt; i++) {
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
							'<tr>'+
								'<th class="prev"><i class="icon-arrow-left"/></th>'+
								'<th colspan="5" class="switch"></th>'+
								'<th class="next"><i class="icon-arrow-right"/></th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class=" table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;

}( window.jQuery );

/* ========================================================================
 * bootstrap-switch - v3.0.2
 * http://www.bootstrap-switch.org
 * ========================================================================
 * Copyright 2012-2013 Mattia Larentis
 *
 * ========================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 */

(function(){var t=[].slice;!function(e,s){"use strict";var o;return o=function(){function t(t,s){null==s&&(s={}),this.$element=e(t),this.options=e.extend({},e.fn.bootstrapSwitch.defaults,{state:this.$element.is(":checked"),size:this.$element.data("size"),animate:this.$element.data("animate"),disabled:this.$element.is(":disabled"),readonly:this.$element.is("[readonly]"),indeterminate:this.$element.data("indeterminate"),onColor:this.$element.data("on-color"),offColor:this.$element.data("off-color"),onText:this.$element.data("on-text"),offText:this.$element.data("off-text"),labelText:this.$element.data("label-text"),baseClass:this.$element.data("base-class"),wrapperClass:this.$element.data("wrapper-class"),radioAllOff:this.$element.data("radio-all-off")},s),this.$wrapper=e("<div>",{"class":function(t){return function(){var e;return e=[""+t.options.baseClass].concat(t._getClasses(t.options.wrapperClass)),e.push(t.options.state?""+t.options.baseClass+"-on":""+t.options.baseClass+"-off"),null!=t.options.size&&e.push(""+t.options.baseClass+"-"+t.options.size),t.options.animate&&e.push(""+t.options.baseClass+"-animate"),t.options.disabled&&e.push(""+t.options.baseClass+"-disabled"),t.options.readonly&&e.push(""+t.options.baseClass+"-readonly"),t.options.indeterminate&&e.push(""+t.options.baseClass+"-indeterminate"),t.$element.attr("id")&&e.push(""+t.options.baseClass+"-id-"+t.$element.attr("id")),e.join(" ")}}(this)()}),this.$container=e("<div>",{"class":""+this.options.baseClass+"-container"}),this.$on=e("<span>",{html:this.options.onText,"class":""+this.options.baseClass+"-handle-on "+this.options.baseClass+"-"+this.options.onColor}),this.$off=e("<span>",{html:this.options.offText,"class":""+this.options.baseClass+"-handle-off "+this.options.baseClass+"-"+this.options.offColor}),this.$label=e("<label>",{html:this.options.labelText,"class":""+this.options.baseClass+"-label"}),this.options.indeterminate&&this.$element.prop("indeterminate",!0),this.$element.on("init.bootstrapSwitch",function(e){return function(){return e.options.onInit.apply(t,arguments)}}(this)),this.$element.on("switchChange.bootstrapSwitch",function(e){return function(){return e.options.onSwitchChange.apply(t,arguments)}}(this)),this.$container=this.$element.wrap(this.$container).parent(),this.$wrapper=this.$container.wrap(this.$wrapper).parent(),this.$element.before(this.$on).before(this.$label).before(this.$off).trigger("init.bootstrapSwitch"),this._elementHandlers(),this._handleHandlers(),this._labelHandlers(),this._formHandler()}return t.prototype._constructor=t,t.prototype.state=function(t,e){return"undefined"==typeof t?this.options.state:this.options.disabled||this.options.readonly||this.options.indeterminate?this.$element:this.options.state&&!this.options.radioAllOff&&this.$element.is(":radio")?this.$element:(t=!!t,this.$element.prop("checked",t).trigger("change.bootstrapSwitch",e),this.$element)},t.prototype.toggleState=function(t){return this.options.disabled||this.options.readonly||this.options.indeterminate?this.$element:this.$element.prop("checked",!this.options.state).trigger("change.bootstrapSwitch",t)},t.prototype.size=function(t){return"undefined"==typeof t?this.options.size:(null!=this.options.size&&this.$wrapper.removeClass(""+this.options.baseClass+"-"+this.options.size),t&&this.$wrapper.addClass(""+this.options.baseClass+"-"+t),this.options.size=t,this.$element)},t.prototype.animate=function(t){return"undefined"==typeof t?this.options.animate:(t=!!t,this.$wrapper[t?"addClass":"removeClass"](""+this.options.baseClass+"-animate"),this.options.animate=t,this.$element)},t.prototype.disabled=function(t){return"undefined"==typeof t?this.options.disabled:(t=!!t,this.$wrapper[t?"addClass":"removeClass"](""+this.options.baseClass+"-disabled"),this.$element.prop("disabled",t),this.options.disabled=t,this.$element)},t.prototype.toggleDisabled=function(){return this.$element.prop("disabled",!this.options.disabled),this.$wrapper.toggleClass(""+this.options.baseClass+"-disabled"),this.options.disabled=!this.options.disabled,this.$element},t.prototype.readonly=function(t){return"undefined"==typeof t?this.options.readonly:(t=!!t,this.$wrapper[t?"addClass":"removeClass"](""+this.options.baseClass+"-readonly"),this.$element.prop("readonly",t),this.options.readonly=t,this.$element)},t.prototype.toggleReadonly=function(){return this.$element.prop("readonly",!this.options.readonly),this.$wrapper.toggleClass(""+this.options.baseClass+"-readonly"),this.options.readonly=!this.options.readonly,this.$element},t.prototype.indeterminate=function(t){return"undefined"==typeof t?this.options.indeterminate:(t=!!t,this.$wrapper[t?"addClass":"removeClass"](""+this.options.baseClass+"-indeterminate"),this.$element.prop("indeterminate",t),this.options.indeterminate=t,this.$element)},t.prototype.toggleIndeterminate=function(){return this.$element.prop("indeterminate",!this.options.indeterminate),this.$wrapper.toggleClass(""+this.options.baseClass+"-indeterminate"),this.options.indeterminate=!this.options.indeterminate,this.$element},t.prototype.onColor=function(t){var e;return e=this.options.onColor,"undefined"==typeof t?e:(null!=e&&this.$on.removeClass(""+this.options.baseClass+"-"+e),this.$on.addClass(""+this.options.baseClass+"-"+t),this.options.onColor=t,this.$element)},t.prototype.offColor=function(t){var e;return e=this.options.offColor,"undefined"==typeof t?e:(null!=e&&this.$off.removeClass(""+this.options.baseClass+"-"+e),this.$off.addClass(""+this.options.baseClass+"-"+t),this.options.offColor=t,this.$element)},t.prototype.onText=function(t){return"undefined"==typeof t?this.options.onText:(this.$on.html(t),this.options.onText=t,this.$element)},t.prototype.offText=function(t){return"undefined"==typeof t?this.options.offText:(this.$off.html(t),this.options.offText=t,this.$element)},t.prototype.labelText=function(t){return"undefined"==typeof t?this.options.labelText:(this.$label.html(t),this.options.labelText=t,this.$element)},t.prototype.baseClass=function(){return this.options.baseClass},t.prototype.wrapperClass=function(t){return"undefined"==typeof t?this.options.wrapperClass:(t||(t=e.fn.bootstrapSwitch.defaults.wrapperClass),this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" ")),this.$wrapper.addClass(this._getClasses(t).join(" ")),this.options.wrapperClass=t,this.$element)},t.prototype.radioAllOff=function(t){return"undefined"==typeof t?this.options.radioAllOff:(this.options.radioAllOff=t,this.$element)},t.prototype.onInit=function(t){return"undefined"==typeof t?this.options.onInit:(t||(t=e.fn.bootstrapSwitch.defaults.onInit),this.options.onInit=t,this.$element)},t.prototype.onSwitchChange=function(t){return"undefined"==typeof t?this.options.onSwitchChange:(t||(t=e.fn.bootstrapSwitch.defaults.onSwitchChange),this.options.onSwitchChange=t,this.$element)},t.prototype.destroy=function(){var t;return t=this.$element.closest("form"),t.length&&t.off("reset.bootstrapSwitch").removeData("bootstrap-switch"),this.$container.children().not(this.$element).remove(),this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch"),this.$element},t.prototype._elementHandlers=function(){return this.$element.on({"change.bootstrapSwitch":function(t){return function(s,o){var n;return s.preventDefault(),s.stopImmediatePropagation(),n=t.$element.is(":checked"),n!==t.options.state?(t.options.state=n,t.$wrapper.removeClass(n?""+t.options.baseClass+"-off":""+t.options.baseClass+"-on").addClass(n?""+t.options.baseClass+"-on":""+t.options.baseClass+"-off"),o?void 0:(t.$element.is(":radio")&&e("[name='"+t.$element.attr("name")+"']").not(t.$element).prop("checked",!1).trigger("change.bootstrapSwitch",!0),t.$element.trigger("switchChange.bootstrapSwitch",[n]))):void 0}}(this),"focus.bootstrapSwitch":function(t){return function(e){return e.preventDefault(),t.$wrapper.addClass(""+t.options.baseClass+"-focused")}}(this),"blur.bootstrapSwitch":function(t){return function(e){return e.preventDefault(),t.$wrapper.removeClass(""+t.options.baseClass+"-focused")}}(this),"keydown.bootstrapSwitch":function(t){return function(e){if(e.which&&!t.options.disabled&&!t.options.readonly&&!t.options.indeterminate)switch(e.which){case 37:return e.preventDefault(),e.stopImmediatePropagation(),t.state(!1);case 39:return e.preventDefault(),e.stopImmediatePropagation(),t.state(!0)}}}(this)})},t.prototype._handleHandlers=function(){return this.$on.on("click.bootstrapSwitch",function(t){return function(){return t.state(!1),t.$element.trigger("focus.bootstrapSwitch")}}(this)),this.$off.on("click.bootstrapSwitch",function(t){return function(){return t.state(!0),t.$element.trigger("focus.bootstrapSwitch")}}(this))},t.prototype._labelHandlers=function(){return this.$label.on({"mousemove.bootstrapSwitch touchmove.bootstrapSwitch":function(t){return function(e){var s,o,n,i;if(t.isLabelDragging)return e.preventDefault(),t.isLabelDragged=!0,o=e.pageX||e.originalEvent.touches[0].pageX,n=(o-t.$wrapper.offset().left)/t.$wrapper.width()*100,s=25,i=75,t.options.animate&&t.$wrapper.removeClass(""+t.options.baseClass+"-animate"),s>n?n=s:n>i&&(n=i),t.$container.css("margin-left",""+(n-i)+"%"),t.$element.trigger("focus.bootstrapSwitch")}}(this),"mousedown.bootstrapSwitch touchstart.bootstrapSwitch":function(t){return function(e){return t.isLabelDragging||t.options.disabled||t.options.readonly||t.options.indeterminate?void 0:(e.preventDefault(),t.isLabelDragging=!0,t.$element.trigger("focus.bootstrapSwitch"))}}(this),"mouseup.bootstrapSwitch touchend.bootstrapSwitch":function(t){return function(e){return t.isLabelDragging?(e.preventDefault(),t.isLabelDragged?(t.isLabelDragged=!1,t.state(parseInt(t.$container.css("margin-left"),10)>-(t.$container.width()/6)),t.options.animate&&t.$wrapper.addClass(""+t.options.baseClass+"-animate"),t.$container.css("margin-left","")):t.state(!t.options.state),t.isLabelDragging=!1):void 0}}(this),"mouseleave.bootstrapSwitch":function(t){return function(){return t.$label.trigger("mouseup.bootstrapSwitch")}}(this)})},t.prototype._formHandler=function(){var t;return t=this.$element.closest("form"),t.data("bootstrap-switch")?void 0:t.on("reset.bootstrapSwitch",function(){return s.setTimeout(function(){return t.find("input").filter(function(){return e(this).data("bootstrap-switch")}).each(function(){return e(this).bootstrapSwitch("state",this.checked)})},1)}).data("bootstrap-switch",!0)},t.prototype._getClasses=function(t){var s,o,n,i;if(!e.isArray(t))return[""+this.options.baseClass+"-"+t];for(o=[],n=0,i=t.length;i>n;n++)s=t[n],o.push(""+this.options.baseClass+"-"+s);return o},t}(),e.fn.bootstrapSwitch=function(){var s,n,i;return n=arguments[0],s=2<=arguments.length?t.call(arguments,1):[],i=this,this.each(function(){var t,a;return t=e(this),a=t.data("bootstrap-switch"),a||t.data("bootstrap-switch",a=new o(this,n)),"string"==typeof n?i=a[n].apply(a,s):void 0}),i},e.fn.bootstrapSwitch.Constructor=o,e.fn.bootstrapSwitch.defaults={state:!0,size:null,animate:!0,disabled:!1,readonly:!1,indeterminate:!1,onColor:"primary",offColor:"default",onText:"Bật",offText:"Tắt",labelText:"&nbsp;",baseClass:"bootstrap-switch",wrapperClass:"wrapper",radioAllOff:!1,onInit:function(){},onSwitchChange:function(){}}}(window.jQuery,window)}).call(this);
/*! bootstrap-timepicker v0.2.5 
* http://jdewit.github.com/bootstrap-timepicker 
* Copyright (c) 2013 Joris de Wit 
* MIT License 
*/!function(a,b,c){"use strict";var d=function(b,c){this.widget="",this.$element=a(b),this.defaultTime=c.defaultTime,this.disableFocus=c.disableFocus,this.disableMousewheel=c.disableMousewheel,this.isOpen=c.isOpen,this.minuteStep=c.minuteStep,this.modalBackdrop=c.modalBackdrop,this.orientation=c.orientation,this.secondStep=c.secondStep,this.showInputs=c.showInputs,this.showMeridian=c.showMeridian,this.showSeconds=c.showSeconds,this.template=c.template,this.appendWidgetTo=c.appendWidgetTo,this.showWidgetOnAddonClick=c.showWidgetOnAddonClick,this._init()};d.prototype={constructor:d,_init:function(){var b=this;this.showWidgetOnAddonClick&&(this.$element.parent().hasClass("input-append")||this.$element.parent().hasClass("input-prepend"))?(this.$element.parent(".input-append, .input-prepend").find(".add-on").on({"click.timepicker":a.proxy(this.showWidget,this)}),this.$element.on({"focus.timepicker":a.proxy(this.highlightUnit,this),"click.timepicker":a.proxy(this.highlightUnit,this),"keydown.timepicker":a.proxy(this.elementKeydown,this),"blur.timepicker":a.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":a.proxy(this.mousewheel,this)})):this.template?this.$element.on({"focus.timepicker":a.proxy(this.showWidget,this),"click.timepicker":a.proxy(this.showWidget,this),"blur.timepicker":a.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":a.proxy(this.mousewheel,this)}):this.$element.on({"focus.timepicker":a.proxy(this.highlightUnit,this),"click.timepicker":a.proxy(this.highlightUnit,this),"keydown.timepicker":a.proxy(this.elementKeydown,this),"blur.timepicker":a.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":a.proxy(this.mousewheel,this)}),this.$widget=this.template!==!1?a(this.getTemplate()).on("click",a.proxy(this.widgetClick,this)):!1,this.showInputs&&this.$widget!==!1&&this.$widget.find("input").each(function(){a(this).on({"click.timepicker":function(){a(this).select()},"keydown.timepicker":a.proxy(b.widgetKeydown,b),"keyup.timepicker":a.proxy(b.widgetKeyup,b)})}),this.setDefaultTime(this.defaultTime)},blurElement:function(){this.highlightedUnit=null,this.updateFromElementVal()},clear:function(){this.hour="",this.minute="",this.second="",this.meridian="",this.$element.val("")},decrementHour:function(){if(this.showMeridian)if(1===this.hour)this.hour=12;else{if(12===this.hour)return this.hour--,this.toggleMeridian();if(0===this.hour)return this.hour=11,this.toggleMeridian();this.hour--}else this.hour<=0?this.hour=23:this.hour--},decrementMinute:function(a){var b;b=a?this.minute-a:this.minute-this.minuteStep,0>b?(this.decrementHour(),this.minute=b+60):this.minute=b},decrementSecond:function(){var a=this.second-this.secondStep;0>a?(this.decrementMinute(!0),this.second=a+60):this.second=a},elementKeydown:function(a){switch(a.keyCode){case 9:case 27:this.updateFromElementVal();break;case 37:a.preventDefault(),this.highlightPrevUnit();break;case 38:switch(a.preventDefault(),this.highlightedUnit){case"hour":this.incrementHour(),this.highlightHour();break;case"minute":this.incrementMinute(),this.highlightMinute();break;case"second":this.incrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian()}this.update();break;case 39:a.preventDefault(),this.highlightNextUnit();break;case 40:switch(a.preventDefault(),this.highlightedUnit){case"hour":this.decrementHour(),this.highlightHour();break;case"minute":this.decrementMinute(),this.highlightMinute();break;case"second":this.decrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian()}this.update()}},getCursorPosition:function(){var a=this.$element.get(0);if("selectionStart"in a)return a.selectionStart;if(c.selection){a.focus();var b=c.selection.createRange(),d=c.selection.createRange().text.length;return b.moveStart("character",-a.value.length),b.text.length-d}},getTemplate:function(){var a,b,c,d,e,f;switch(this.showInputs?(b='<input type="text" class="bootstrap-timepicker-hour" maxlength="2"/>',c='<input type="text" class="bootstrap-timepicker-minute" maxlength="2"/>',d='<input type="text" class="bootstrap-timepicker-second" maxlength="2"/>',e='<input type="text" class="bootstrap-timepicker-meridian" maxlength="2"/>'):(b='<span class="bootstrap-timepicker-hour"></span>',c='<span class="bootstrap-timepicker-minute"></span>',d='<span class="bootstrap-timepicker-second"></span>',e='<span class="bootstrap-timepicker-meridian"></span>'),f='<table><tr><td><a href="#" data-action="incrementHour"><i class="icon-chevron-up"></i></a></td><td class="separator">&nbsp;</td><td><a href="#" data-action="incrementMinute"><i class="icon-chevron-up"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><i class="icon-chevron-up"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="icon-chevron-up"></i></a></td>':"")+"</tr>"+"<tr>"+"<td>"+b+"</td> "+'<td class="separator">:</td>'+"<td>"+c+"</td> "+(this.showSeconds?'<td class="separator">:</td><td>'+d+"</td>":"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td>'+e+"</td>":"")+"</tr>"+"<tr>"+'<td><a href="#" data-action="decrementHour"><i class="icon-chevron-down"></i></a></td>'+'<td class="separator"></td>'+'<td><a href="#" data-action="decrementMinute"><i class="icon-chevron-down"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><i class="icon-chevron-down"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><i class="icon-chevron-down"></i></a></td>':"")+"</tr>"+"</table>",this.template){case"modal":a='<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="'+(this.modalBackdrop?"true":"false")+'">'+'<div class="modal-header">'+'<a href="#" class="close" data-dismiss="modal">×</a>'+"<h3>Pick a Time</h3>"+"</div>"+'<div class="modal-content">'+f+"</div>"+'<div class="modal-footer">'+'<a href="#" class="btn btn-primary" data-dismiss="modal">OK</a>'+"</div>"+"</div>";break;case"dropdown":a='<div class="bootstrap-timepicker-widget dropdown-menu">'+f+"</div>"}return a},getTime:function(){return this.hour||this.minute||this.second?this.hour+":"+(1===this.minute.toString().length?"0"+this.minute:this.minute)+(this.showSeconds?":"+(1===this.second.toString().length?"0"+this.second:this.second):"")+(this.showMeridian?" "+this.meridian:""):""},hideWidget:function(){this.isOpen!==!1&&(this.$element.trigger({type:"hide.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}}),"modal"===this.template&&this.$widget.modal?this.$widget.modal("hide"):this.$widget.removeClass("open"),a(c).off("mousedown.timepicker, touchend.timepicker"),this.isOpen=!1,this.$widget.detach())},highlightUnit:function(){this.position=this.getCursorPosition(),this.position>=0&&this.position<=2?this.highlightHour():this.position>=3&&this.position<=5?this.highlightMinute():this.position>=6&&this.position<=8?this.showSeconds?this.highlightSecond():this.highlightMeridian():this.position>=9&&this.position<=11&&this.highlightMeridian()},highlightNextUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMinute();break;case"minute":this.showSeconds?this.highlightSecond():this.showMeridian?this.highlightMeridian():this.highlightHour();break;case"second":this.showMeridian?this.highlightMeridian():this.highlightHour();break;case"meridian":this.highlightHour()}},highlightPrevUnit:function(){switch(this.highlightedUnit){case"hour":this.showMeridian?this.highlightMeridian():this.showSeconds?this.highlightSecond():this.highlightMinute();break;case"minute":this.highlightHour();break;case"second":this.highlightMinute();break;case"meridian":this.showSeconds?this.highlightSecond():this.highlightMinute()}},highlightHour:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="hour",a.setSelectionRange&&setTimeout(function(){b.hour<10?a.setSelectionRange(0,1):a.setSelectionRange(0,2)},0)},highlightMinute:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="minute",a.setSelectionRange&&setTimeout(function(){b.hour<10?a.setSelectionRange(2,4):a.setSelectionRange(3,5)},0)},highlightSecond:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="second",a.setSelectionRange&&setTimeout(function(){b.hour<10?a.setSelectionRange(5,7):a.setSelectionRange(6,8)},0)},highlightMeridian:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="meridian",a.setSelectionRange&&(this.showSeconds?setTimeout(function(){b.hour<10?a.setSelectionRange(8,10):a.setSelectionRange(9,11)},0):setTimeout(function(){b.hour<10?a.setSelectionRange(5,7):a.setSelectionRange(6,8)},0))},incrementHour:function(){if(this.showMeridian){if(11===this.hour)return this.hour++,this.toggleMeridian();12===this.hour&&(this.hour=0)}return 23===this.hour?(this.hour=0,void 0):(this.hour++,void 0)},incrementMinute:function(a){var b;b=a?this.minute+a:this.minute+this.minuteStep-this.minute%this.minuteStep,b>59?(this.incrementHour(),this.minute=b-60):this.minute=b},incrementSecond:function(){var a=this.second+this.secondStep-this.second%this.secondStep;a>59?(this.incrementMinute(!0),this.second=a-60):this.second=a},mousewheel:function(b){if(!this.disableMousewheel){b.preventDefault(),b.stopPropagation();var c=b.originalEvent.wheelDelta||-b.originalEvent.detail,d=null;switch("mousewheel"===b.type?d=-1*b.originalEvent.wheelDelta:"DOMMouseScroll"===b.type&&(d=40*b.originalEvent.detail),d&&(b.preventDefault(),a(this).scrollTop(d+a(this).scrollTop())),this.highlightedUnit){case"minute":c>0?this.incrementMinute():this.decrementMinute(),this.highlightMinute();break;case"second":c>0?this.incrementSecond():this.decrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian();break;default:c>0?this.incrementHour():this.decrementHour(),this.highlightHour()}return!1}},place:function(){if(!this.isInline){var c=this.$widget.outerWidth(),d=this.$widget.outerHeight(),e=10,f=a(b).width(),g=a(b).height(),h=a(b).scrollTop(),i=parseInt(this.$element.parents().filter(function(){}).first().css("z-index"),10)+10,j=this.component?this.component.parent().offset():this.$element.offset(),k=this.component?this.component.outerHeight(!0):this.$element.outerHeight(!1),l=this.component?this.component.outerWidth(!0):this.$element.outerWidth(!1),m=j.left,n=j.top;this.$widget.removeClass("timepicker-orient-top timepicker-orient-bottom timepicker-orient-right timepicker-orient-left"),"auto"!==this.orientation.x?(this.picker.addClass("datepicker-orient-"+this.orientation.x),"right"===this.orientation.x&&(m-=c-l)):(this.$widget.addClass("timepicker-orient-left"),j.left<0?m-=j.left-e:j.left+c>f&&(m=f-c-e));var o,p,q=this.orientation.y;"auto"===q&&(o=-h+j.top-d,p=h+g-(j.top+k+d),q=Math.max(o,p)===p?"top":"bottom"),this.$widget.addClass("timepicker-orient-"+q),"top"===q?n+=k:n-=d+parseInt(this.$widget.css("padding-top"),10),this.$widget.css({top:n,left:m,zIndex:i})}},remove:function(){a("document").off(".timepicker"),this.$widget&&this.$widget.remove(),delete this.$element.data().timepicker},setDefaultTime:function(a){if(this.$element.val())this.updateFromElementVal();else if("current"===a){var b=new Date,c=b.getHours(),d=b.getMinutes(),e=b.getSeconds(),f="AM";0!==e&&(e=Math.ceil(b.getSeconds()/this.secondStep)*this.secondStep,60===e&&(d+=1,e=0)),0!==d&&(d=Math.ceil(b.getMinutes()/this.minuteStep)*this.minuteStep,60===d&&(c+=1,d=0)),this.showMeridian&&(0===c?c=12:c>=12?(c>12&&(c-=12),f="PM"):f="AM"),this.hour=c,this.minute=d,this.second=e,this.meridian=f,this.update()}else a===!1?(this.hour=0,this.minute=0,this.second=0,this.meridian="AM"):this.setTime(a)},setTime:function(a,b){if(!a)return this.clear(),void 0;var c,d,e,f,g;"object"==typeof a&&a.getMonth?(d=a.getHours(),e=a.getMinutes(),f=a.getSeconds(),this.showMeridian&&(g="AM",d>12&&(g="PM",d%=12),12===d&&(g="PM"))):(g=null!==a.match(/p/i)?"PM":"AM",a=a.replace(/[^0-9\:]/g,""),c=a.split(":"),d=c[0]?c[0].toString():c.toString(),e=c[1]?c[1].toString():"",f=c[2]?c[2].toString():"",d.length>4&&(f=d.substr(4,2)),d.length>2&&(e=d.substr(2,2),d=d.substr(0,2)),e.length>2&&(f=e.substr(2,2),e=e.substr(0,2)),f.length>2&&(f=f.substr(2,2)),d=parseInt(d,10),e=parseInt(e,10),f=parseInt(f,10),isNaN(d)&&(d=0),isNaN(e)&&(e=0),isNaN(f)&&(f=0),this.showMeridian?1>d?d=1:d>12&&(d=12):(d>=24?d=23:0>d&&(d=0),13>d&&"PM"===g&&(d+=12)),0>e?e=0:e>=60&&(e=59),this.showSeconds&&(isNaN(f)?f=0:0>f?f=0:f>=60&&(f=59))),this.hour=d,this.minute=e,this.second=f,this.meridian=g,this.update(b)},showWidget:function(){if(!this.isOpen&&!this.$element.is(":disabled")){this.$widget.appendTo(this.appendWidgetTo);var b=this;a(c).on("mousedown.timepicker, touchend.timepicker",function(a){b.$element.parent().find(a.target).length||b.$widget.is(a.target)||b.$widget.find(a.target).length||b.hideWidget()}),this.$element.trigger({type:"show.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}}),this.place(),this.disableFocus&&this.$element.blur(),this.hour||(this.defaultTime?this.setDefaultTime(this.defaultTime):this.setTime("0:0:0")),"modal"===this.template&&this.$widget.modal?this.$widget.modal("show").on("hidden",a.proxy(this.hideWidget,this)):this.isOpen===!1&&this.$widget.addClass("open"),this.isOpen=!0}},toggleMeridian:function(){this.meridian="AM"===this.meridian?"PM":"AM"},update:function(a){this.updateElement(),a||this.updateWidget(),this.$element.trigger({type:"changeTime.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}})},updateElement:function(){this.$element.val(this.getTime()).change()},updateFromElementVal:function(){this.setTime(this.$element.val())},updateWidget:function(){if(this.$widget!==!1){var a=this.hour,b=1===this.minute.toString().length?"0"+this.minute:this.minute,c=1===this.second.toString().length?"0"+this.second:this.second;this.showInputs?(this.$widget.find("input.bootstrap-timepicker-hour").val(a),this.$widget.find("input.bootstrap-timepicker-minute").val(b),this.showSeconds&&this.$widget.find("input.bootstrap-timepicker-second").val(c),this.showMeridian&&this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)):(this.$widget.find("span.bootstrap-timepicker-hour").text(a),this.$widget.find("span.bootstrap-timepicker-minute").text(b),this.showSeconds&&this.$widget.find("span.bootstrap-timepicker-second").text(c),this.showMeridian&&this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))}},updateFromWidgetInputs:function(){if(this.$widget!==!1){var a=this.$widget.find("input.bootstrap-timepicker-hour").val()+":"+this.$widget.find("input.bootstrap-timepicker-minute").val()+(this.showSeconds?":"+this.$widget.find("input.bootstrap-timepicker-second").val():"")+(this.showMeridian?this.$widget.find("input.bootstrap-timepicker-meridian").val():"");this.setTime(a,!0)}},widgetClick:function(b){b.stopPropagation(),b.preventDefault();var c=a(b.target),d=c.closest("a").data("action");d&&this[d](),this.update(),c.is("input")&&c.get(0).setSelectionRange(0,2)},widgetKeydown:function(b){var c=a(b.target),d=c.attr("class").replace("bootstrap-timepicker-","");switch(b.keyCode){case 9:if(this.showMeridian&&"meridian"===d||this.showSeconds&&"second"===d||!this.showMeridian&&!this.showSeconds&&"minute"===d)return this.hideWidget();break;case 27:this.hideWidget();break;case 38:switch(b.preventDefault(),d){case"hour":this.incrementHour();break;case"minute":this.incrementMinute();break;case"second":this.incrementSecond();break;case"meridian":this.toggleMeridian()}this.setTime(this.getTime()),c.get(0).setSelectionRange(0,2);break;case 40:switch(b.preventDefault(),d){case"hour":this.decrementHour();break;case"minute":this.decrementMinute();break;case"second":this.decrementSecond();break;case"meridian":this.toggleMeridian()}this.setTime(this.getTime()),c.get(0).setSelectionRange(0,2)}},widgetKeyup:function(a){(65===a.keyCode||77===a.keyCode||80===a.keyCode||46===a.keyCode||8===a.keyCode||a.keyCode>=46&&a.keyCode<=57)&&this.updateFromWidgetInputs()}},a.fn.timepicker=function(b){var c=Array.apply(null,arguments);return c.shift(),this.each(function(){var e=a(this),f=e.data("timepicker"),g="object"==typeof b&&b;f||e.data("timepicker",f=new d(this,a.extend({},a.fn.timepicker.defaults,g,a(this).data()))),"string"==typeof b&&f[b].apply(f,c)})},a.fn.timepicker.defaults={defaultTime:"current",disableFocus:!1,disableMousewheel:!1,isOpen:!1,minuteStep:15,modalBackdrop:!1,orientation:{x:"auto",y:"auto"},secondStep:15,showSeconds:!1,showInputs:!0,showMeridian:!0,template:"dropdown",appendWidgetTo:"body",showWidgetOnAddonClick:!0},a.fn.timepicker.Constructor=d}(jQuery,window,document);
/*
 *  jQuery OwlCarousel v1.3.3
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */

/*JS Lint helpers: */
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */

if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function ($, window, document) {

    var Carousel = {
        init : function (options, el) {
            var base = this;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);

            base.userOptions = options;
            base.loadContent();
        },

        loadContent : function () {
            var base = this, url;

            function getData(data) {
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") {
                    base.options.jsonSuccess.apply(this, [data]);
                } else {
                    for (i in data.owl) {
                        if (data.owl.hasOwnProperty(i)) {
                            content += data.owl[i].item;
                        }
                    }
                    base.$elem.html(content);
                }
                base.logIn();
            }

            if (typeof base.options.beforeInit === "function") {
                base.options.beforeInit.apply(this, [base.$elem]);
            }

            if (typeof base.options.jsonPath === "string") {
                url = base.options.jsonPath;
                $.getJSON(url, getData);
            } else {
                base.logIn();
            }
        },

        logIn : function () {
            var base = this;

            base.$elem.data({
                "owl-originalStyles": base.$elem.attr("style"),
                "owl-originalClasses": base.$elem.attr("class")
            });

            base.$elem.css({opacity: 0});
            base.orignalItems = base.options.items;
            base.checkBrowser();
            base.wrapperWidth = 0;
            base.checkVisible = null;
            base.setVars();
        },

        setVars : function () {
            var base = this;
            if (base.$elem.children().length === 0) {return false; }
            base.baseClass();
            base.eventTypes();
            base.$userItems = base.$elem.children();
            base.itemsAmount = base.$userItems.length;
            base.wrapItems();
            base.$owlItems = base.$elem.find(".owl-item");
            base.$owlWrapper = base.$elem.find(".owl-wrapper");
            base.playDirection = "next";
            base.prevItem = 0;
            base.prevArr = [0];
            base.currentItem = 0;
            base.customEvents();
            base.onStartup();
        },

        onStartup : function () {
            var base = this;
            base.updateItems();
            base.calculateAll();
            base.buildControls();
            base.updateControls();
            base.response();
            base.moveEvents();
            base.stopOnHover();
            base.owlStatus();

            if (base.options.transitionStyle !== false) {
                base.transitionTypes(base.options.transitionStyle);
            }
            if (base.options.autoPlay === true) {
                base.options.autoPlay = 5000;
            }
            base.play();

            base.$elem.find(".owl-wrapper").css("display", "block");

            if (!base.$elem.is(":visible")) {
                base.watchVisibility();
            } else {
                base.$elem.css("opacity", 1);
            }
            base.onstartup = false;
            base.eachMoveUpdate();
            if (typeof base.options.afterInit === "function") {
                base.options.afterInit.apply(this, [base.$elem]);
            }
        },

        eachMoveUpdate : function () {
            var base = this;

            if (base.options.lazyLoad === true) {
                base.lazyLoad();
            }
            if (base.options.autoHeight === true) {
                base.autoHeight();
            }
            base.onVisibleItems();

            if (typeof base.options.afterAction === "function") {
                base.options.afterAction.apply(this, [base.$elem]);
            }
        },

        updateVars : function () {
            var base = this;
            if (typeof base.options.beforeUpdate === "function") {
                base.options.beforeUpdate.apply(this, [base.$elem]);
            }
            base.watchVisibility();
            base.updateItems();
            base.calculateAll();
            base.updatePosition();
            base.updateControls();
            base.eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") {
                base.options.afterUpdate.apply(this, [base.$elem]);
            }
        },

        reload : function () {
            var base = this;
            window.setTimeout(function () {
                base.updateVars();
            }, 0);
        },

        watchVisibility : function () {
            var base = this;

            if (base.$elem.is(":visible") === false) {
                base.$elem.css({opacity: 0});
                window.clearInterval(base.autoPlayInterval);
                window.clearInterval(base.checkVisible);
            } else {
                return false;
            }
            base.checkVisible = window.setInterval(function () {
                if (base.$elem.is(":visible")) {
                    base.reload();
                    base.$elem.animate({opacity: 1}, 200);
                    window.clearInterval(base.checkVisible);
                }
            }, 500);
        },

        wrapItems : function () {
            var base = this;
            base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
            base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
            base.$elem.css("display", "block");
        },

        baseClass : function () {
            var base = this,
                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);

            if (!hasBaseClass) {
                base.$elem.addClass(base.options.baseClass);
            }

            if (!hasThemeClass) {
                base.$elem.addClass(base.options.theme);
            }
        },

        updateItems : function () {
            var base = this, width, i;

            if (base.options.responsive === false) {
                return false;
            }
            if (base.options.singleItem === true) {
                base.options.items = base.orignalItems = 1;
                base.options.itemsCustom = false;
                base.options.itemsDesktop = false;
                base.options.itemsDesktopSmall = false;
                base.options.itemsTablet = false;
                base.options.itemsTabletSmall = false;
                base.options.itemsMobile = false;
                return false;
            }

            width = $(base.options.responsiveBaseWidth).width();

            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;
            }
            if (base.options.itemsCustom !== false) {
                //Reorder array by screen size
                base.options.itemsCustom.sort(function (a, b) {return a[0] - b[0]; });

                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {
                        base.options.items = base.options.itemsCustom[i][1];
                    }
                }

            } else {

                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }

                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }

                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];
                }

                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }

                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];
                }
            }

            //if number of items is less than declared
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;
            }
        },

        response : function () {
            var base = this,
                smallDelay,
                lastWindowWidth;

            if (base.options.responsive !== true) {
                return false;
            }
            lastWindowWidth = $(window).width();

            base.resizer = function () {
                if ($(window).width() !== lastWindowWidth) {
                    if (base.options.autoPlay !== false) {
                        window.clearInterval(base.autoPlayInterval);
                    }
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function () {
                        lastWindowWidth = $(window).width();
                        base.updateVars();
                    }, base.options.responsiveRefreshRate);
                }
            };
            $(window).resize(base.resizer);
        },

        updatePosition : function () {
            var base = this;
            base.jumpTo(base.currentItem);
            if (base.options.autoPlay !== false) {
                base.checkAp();
            }
        },

        appendItemsSizes : function () {
            var base = this,
                roundPages = 0,
                lastItem = base.itemsAmount - base.options.items;

            base.$owlItems.each(function (index) {
                var $this = $(this);
                $this
                    .css({"width": base.itemWidth})
                    .data("owl-item", Number(index));

                if (index % base.options.items === 0 || index === lastItem) {
                    if (!(index > lastItem)) {
                        roundPages += 1;
                    }
                }
                $this.data("owl-roundPages", roundPages);
            });
        },

        appendWrapperSizes : function () {
            var base = this,
                width = base.$owlItems.length * base.itemWidth;

            base.$owlWrapper.css({
                "width": width * 2,
                "left": 0
            });
            base.appendItemsSizes();
        },

        calculateAll : function () {
            var base = this;
            base.calculateWidth();
            base.appendWrapperSizes();
            base.loops();
            base.max();
        },

        calculateWidth : function () {
            var base = this;
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
        },

        max : function () {
            var base = this,
                maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {
                base.maximumItem = 0;
                maximum = 0;
                base.maximumPixels = 0;
            } else {
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;
            }
            return maximum;
        },

        min : function () {
            return 0;
        },

        loops : function () {
            var base = this,
                prev = 0,
                elWidth = 0,
                i,
                item,
                roundPageNum;

            base.positionsInArray = [0];
            base.pagesInArray = [];

            for (i = 0; i < base.itemsAmount; i += 1) {
                elWidth += base.itemWidth;
                base.positionsInArray.push(-elWidth);

                if (base.options.scrollPerPage === true) {
                    item = $(base.$owlItems[i]);
                    roundPageNum = item.data("owl-roundPages");
                    if (roundPageNum !== prev) {
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                    }
                }
            }
        },

        buildControls : function () {
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) {
                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
            }
            if (base.options.pagination === true) {
                base.buildPagination();
            }
            if (base.options.navigation === true) {
                base.buildButtons();
            }
        },

        buildButtons : function () {
            var base = this,
                buttonsWrapper = $("<div class=\"owl-buttons\"/>");
            base.owlControls.append(buttonsWrapper);

            base.buttonPrev = $("<div/>", {
                "class" : "owl-prev",
                "html" : base.options.navigationText[0] || ""
            });

            base.buttonNext = $("<div/>", {
                "class" : "owl-next",
                "html" : base.options.navigationText[1] || ""
            });

            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);

            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
            });

            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
                if ($(this).hasClass("owl-next")) {
                    base.next();
                } else {
                    base.prev();
                }
            });
        },

        buildPagination : function () {
            var base = this;

            base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);

            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (event) {
                event.preventDefault();
                if (Number($(this).data("owl-page")) !== base.currentItem) {
                    base.goTo(Number($(this).data("owl-page")), true);
                }
            });
        },

        updatePagination : function () {
            var base = this,
                counter,
                lastPage,
                lastItem,
                i,
                paginationButton,
                paginationButtonInner;

            if (base.options.pagination === false) {
                return false;
            }

            base.paginationWrapper.html("");

            counter = 0;
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

            for (i = 0; i < base.itemsAmount; i += 1) {
                if (i % base.options.items === 0) {
                    counter += 1;
                    if (lastPage === i) {
                        lastItem = base.itemsAmount - base.options.items;
                    }
                    paginationButton = $("<div/>", {
                        "class" : "owl-page"
                    });
                    paginationButtonInner = $("<span></span>", {
                        "text": base.options.paginationNumbers === true ? counter : "",
                        "class": base.options.paginationNumbers === true ? "owl-numbers" : ""
                    });
                    paginationButton.append(paginationButtonInner);

                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.data("owl-roundPages", counter);

                    base.paginationWrapper.append(paginationButton);
                }
            }
            base.checkPagination();
        },
        checkPagination : function () {
            var base = this;
            if (base.options.pagination === false) {
                return false;
            }
            base.paginationWrapper.find(".owl-page").each(function () {
                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
                    base.paginationWrapper
                        .find(".owl-page")
                        .removeClass("active");
                    $(this).addClass("active");
                }
            });
        },

        checkNavigation : function () {
            var base = this;

            if (base.options.navigation === false) {
                return false;
            }
            if (base.options.rewindNav === false) {
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
                } else if (base.currentItem === base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
                }
            }
        },

        updateControls : function () {
            var base = this;
            base.updatePagination();
            base.checkNavigation();
            if (base.owlControls) {
                if (base.options.items >= base.itemsAmount) {
                    base.owlControls.hide();
                } else {
                    base.owlControls.show();
                }
            }
        },

        destroyControls : function () {
            var base = this;
            if (base.owlControls) {
                base.owlControls.remove();
            }
        },

        next : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) {
                if (base.options.rewindNav === true) {
                    base.currentItem = 0;
                    speed = "rewind";
                } else {
                    base.currentItem = base.maximumItem;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        prev : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                base.currentItem = 0;
            } else {
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
            }
            if (base.currentItem < 0) {
                if (base.options.rewindNav === true) {
                    base.currentItem = base.maximumItem;
                    speed = "rewind";
                } else {
                    base.currentItem = 0;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        goTo : function (position, speed, drag) {
            var base = this,
                goToPixel;

            if (base.isTransition) {
                return false;
            }
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }

            base.currentItem = base.owl.currentItem = position;
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                base.swapSpeed(0);
                if (base.browser.support3d === true) {
                    base.transition3d(base.positionsInArray[position]);
                } else {
                    base.css2slide(base.positionsInArray[position], 1);
                }
                base.afterGo();
                base.singleItemTransition();
                return false;
            }
            goToPixel = base.positionsInArray[position];

            if (base.browser.support3d === true) {
                base.isCss3Finish = false;

                if (speed === true) {
                    base.swapSpeed("paginationSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.paginationSpeed);

                } else if (speed === "rewind") {
                    base.swapSpeed(base.options.rewindSpeed);
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.rewindSpeed);

                } else {
                    base.swapSpeed("slideSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.slideSpeed);
                }
                base.transition3d(goToPixel);
            } else {
                if (speed === true) {
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }
            }
            base.afterGo();
        },

        jumpTo : function (position) {
            var base = this;
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem || position === -1) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }
            base.swapSpeed(0);
            if (base.browser.support3d === true) {
                base.transition3d(base.positionsInArray[position]);
            } else {
                base.css2slide(base.positionsInArray[position], 1);
            }
            base.currentItem = base.owl.currentItem = position;
            base.afterGo();
        },

        afterGo : function () {
            var base = this;

            base.prevArr.push(base.currentItem);
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);

            if (base.prevItem !== base.currentItem) {
                base.checkPagination();
                base.checkNavigation();
                base.eachMoveUpdate();

                if (base.options.autoPlay !== false) {
                    base.checkAp();
                }
            }
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.$elem]);
            }
        },

        stop : function () {
            var base = this;
            base.apStatus = "stop";
            window.clearInterval(base.autoPlayInterval);
        },

        checkAp : function () {
            var base = this;
            if (base.apStatus !== "stop") {
                base.play();
            }
        },

        play : function () {
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function () {
                base.next(true);
            }, base.options.autoPlay);
        },

        swapSpeed : function (action) {
            var base = this;
            if (action === "slideSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {
                base.$owlWrapper.css(base.addCssSpeed(action));
            }
        },

        addCssSpeed : function (speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        },

        removeTransition : function () {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
            };
        },

        doTranslate : function (pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
            };
        },

        transition3d : function (value) {
            var base = this;
            base.$owlWrapper.css(base.doTranslate(value));
        },

        css2move : function (value) {
            var base = this;
            base.$owlWrapper.css({"left" : value});
        },

        css2slide : function (value, speed) {
            var base = this;

            base.isCssFinish = false;
            base.$owlWrapper.stop(true, true).animate({
                "left" : value
            }, {
                duration : speed || base.options.slideSpeed,
                complete : function () {
                    base.isCssFinish = true;
                }
            });
        },

        checkBrowser : function () {
            var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                                  "; -ms-transform:"     + translate3D +
                                  "; -o-transform:"      + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:"         + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length === 1);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

            base.browser = {
                "support3d" : support3d,
                "isTouch" : isTouch
            };
        },

        moveEvents : function () {
            var base = this;
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();
                base.disabledEvents();
            }
        },

        eventTypes : function () {
            var base = this,
                types = ["s", "e", "x"];

            base.ev_types = {};

            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl mousedown.owl",
                    "touchmove.owl mousemove.owl",
                    "touchend.owl touchcancel.owl mouseup.owl"
                ];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl",
                    "touchmove.owl",
                    "touchend.owl touchcancel.owl"
                ];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = [
                    "mousedown.owl",
                    "mousemove.owl",
                    "mouseup.owl"
                ];
            }

            base.ev_types.start = types[0];
            base.ev_types.move = types[1];
            base.ev_types.end = types[2];
        },

        disabledEvents :  function () {
            var base = this;
            base.$elem.on("dragstart.owl", function (event) { event.preventDefault(); });
            base.$elem.on("mousedown.disableTextSelect", function (e) {
                return $(e.target).is('input, textarea, select, option');
            });
        },

        gestures : function () {
            /*jslint unparam: true*/
            var base = this,
                locals = {
                    offsetX : 0,
                    offsetY : 0,
                    baseElWidth : 0,
                    relativePos : 0,
                    position: null,
                    minSwipe : null,
                    maxSwipe: null,
                    sliding : null,
                    dargging: null,
                    targetElement : null
                };

            base.isCssFinish = true;

            function getTouches(event) {
                if (event.touches !== undefined) {
                    return {
                        x : event.touches[0].pageX,
                        y : event.touches[0].pageY
                    };
                }

                if (event.touches === undefined) {
                    if (event.pageX !== undefined) {
                        return {
                            x : event.pageX,
                            y : event.pageY
                        };
                    }
                    if (event.pageX === undefined) {
                        return {
                            x : event.clientX,
                            y : event.clientY
                        };
                    }
                }
            }

            function swapEvents(type) {
                if (type === "on") {
                    $(document).on(base.ev_types.move, dragMove);
                    $(document).on(base.ev_types.end, dragEnd);
                } else if (type === "off") {
                    $(document).off(base.ev_types.move);
                    $(document).off(base.ev_types.end);
                }
            }

            function dragStart(event) {
                var ev = event.originalEvent || event || window.event,
                    position;

                if (ev.which === 3) {
                    return false;
                }
                if (base.itemsAmount <= base.options.items) {
                    return;
                }
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }

                if (base.options.autoPlay !== false) {
                    window.clearInterval(base.autoPlayInterval);
                }

                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
                    base.$owlWrapper.addClass("grabbing");
                }

                base.newPosX = 0;
                base.newRelativeX = 0;

                $(this).css(base.removeTransition());

                position = $(this).position();
                locals.relativePos = position.left;

                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;

                swapEvents("on");

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
            }

            function dragMove(event) {
                var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;

                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;

                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
                    base.options.startDragging.apply(base, [base.$elem]);
                }

                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                    if (ev.preventDefault !== undefined) {
                        ev.preventDefault();
                    } else {
                        ev.returnValue = false;
                    }
                    locals.sliding = true;
                }

                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $(document).off("touchmove.owl");
                }

                minSwipe = function () {
                    return base.newRelativeX / 5;
                };

                maxSwipe = function () {
                    return base.maximumPixels + base.newRelativeX / 5;
                };

                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {
                    base.transition3d(base.newPosX);
                } else {
                    base.css2move(base.newPosX);
                }
            }

            function dragEnd(event) {
                var ev = event.originalEvent || event || window.event,
                    newPosition,
                    handlers,
                    owlStopEvent;

                ev.target = ev.target || ev.srcElement;

                locals.dragging = false;

                if (base.browser.isTouch !== true) {
                    base.$owlWrapper.removeClass("grabbing");
                }

                if (base.newRelativeX < 0) {
                    base.dragDirection = base.owl.dragDirection = "left";
                } else {
                    base.dragDirection = base.owl.dragDirection = "right";
                }

                if (base.newRelativeX !== 0) {
                    newPosition = base.getNewPosition();
                    base.goTo(newPosition, false, "drag");
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                        $(ev.target).on("click.disable", function (ev) {
                            ev.stopImmediatePropagation();
                            ev.stopPropagation();
                            ev.preventDefault();
                            $(ev.target).off("click.disable");
                        });
                        handlers = $._data(ev.target, "events").click;
                        owlStopEvent = handlers.pop();
                        handlers.splice(0, 0, owlStopEvent);
                    }
                }
                swapEvents("off");
            }
            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
        },

        getNewPosition : function () {
            var base = this,
                newPosition = base.closestItem();

            if (newPosition > base.maximumItem) {
                base.currentItem = base.maximumItem;
                newPosition  = base.maximumItem;
            } else if (base.newPosX >= 0) {
                newPosition = 0;
                base.currentItem = 0;
            }
            return newPosition;
        },
        closestItem : function () {
            var base = this,
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,
                closest = null;

            $.each(array, function (i, v) {
                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") {
                    closest = v;
                    if (base.options.scrollPerPage === true) {
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        base.currentItem = i;
                    }
                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        closest = array[i + 1];
                        base.currentItem = i + 1;
                    }
                }
            });
            return base.currentItem;
        },

        moveDirection : function () {
            var base = this,
                direction;
            if (base.newRelativeX < 0) {
                direction = "right";
                base.playDirection = "next";
            } else {
                direction = "left";
                base.playDirection = "prev";
            }
            return direction;
        },

        customEvents : function () {
            /*jslint unparam: true*/
            var base = this;
            base.$elem.on("owl.next", function () {
                base.next();
            });
            base.$elem.on("owl.prev", function () {
                base.prev();
            });
            base.$elem.on("owl.play", function (event, speed) {
                base.options.autoPlay = speed;
                base.play();
                base.hoverStatus = "play";
            });
            base.$elem.on("owl.stop", function () {
                base.stop();
                base.hoverStatus = "stop";
            });
            base.$elem.on("owl.goTo", function (event, item) {
                base.goTo(item);
            });
            base.$elem.on("owl.jumpTo", function (event, item) {
                base.jumpTo(item);
            });
        },

        stopOnHover : function () {
            var base = this;
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.$elem.on("mouseover", function () {
                    base.stop();
                });
                base.$elem.on("mouseout", function () {
                    if (base.hoverStatus !== "stop") {
                        base.play();
                    }
                });
            }
        },

        lazyLoad : function () {
            var base = this,
                i,
                $item,
                itemNumber,
                $lazyImg,
                follow;

            if (base.options.lazyLoad === false) {
                return false;
            }
            for (i = 0; i < base.itemsAmount; i += 1) {
                $item = $(base.$owlItems[i]);

                if ($item.data("owl-loaded") === "loaded") {
                    continue;
                }

                itemNumber = $item.data("owl-item");
                $lazyImg = $item.find(".lazyOwl");

                if (typeof $lazyImg.data("src") !== "string") {
                    $item.data("owl-loaded", "loaded");
                    continue;
                }
                if ($item.data("owl-loaded") === undefined) {
                    $lazyImg.hide();
                    $item.addClass("loading").data("owl-loaded", "checked");
                }
                if (base.options.lazyFollow === true) {
                    follow = itemNumber >= base.currentItem;
                } else {
                    follow = true;
                }
                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
                    $lazyImg.each(function() {
                        base.lazyPreload($item, $(this));
                    });
                }
            }
        },

        lazyPreload : function ($item, $lazyImg) {
            var base = this,
                iterations = 0,
                isBackgroundImg;

            if ($lazyImg.prop("tagName") === "DIV") {
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;
            } else {
                $lazyImg[0].src = $lazyImg.data("src");
            }

            function showImage() {
                $item.data("owl-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");
                if (base.options.lazyEffect === "fade") {
                    $lazyImg.fadeIn(400);
                } else {
                    $lazyImg.show();
                }
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
                }
            }

            function checkLazyImage() {
                iterations += 1;
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                    showImage();
                } else if (iterations <= 100) {//if image loads in less than 10 seconds 
                    window.setTimeout(checkLazyImage, 100);
                } else {
                    showImage();
                }
            }

            checkLazyImage();
        },

        autoHeight : function () {
            var base = this,
                $currentimg = $(base.$owlItems[base.currentItem]).find("img"),
                iterations;

            function addHeight() {
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px");
                if (!base.wrapperOuter.hasClass("autoHeight")) {
                    window.setTimeout(function () {
                        base.wrapperOuter.addClass("autoHeight");
                    }, 0);
                }
            }

            function checkImage() {
                iterations += 1;
                if (base.completeImg($currentimg.get(0))) {
                    addHeight();
                } else if (iterations <= 100) { //if image loads in less than 10 seconds 
                    window.setTimeout(checkImage, 100);
                } else {
                    base.wrapperOuter.css("height", ""); //Else remove height attribute
                }
            }

            if ($currentimg.get(0) !== undefined) {
                iterations = 0;
                checkImage();
            } else {
                addHeight();
            }
        },

        completeImg : function (img) {
            var naturalWidthType;

            if (!img.complete) {
                return false;
            }
            naturalWidthType = typeof img.naturalWidth;
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            return true;
        },

        onVisibleItems : function () {
            var base = this,
                i;

            if (base.options.addClassActive === true) {
                base.$owlItems.removeClass("active");
            }
            base.visibleItems = [];
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);

                if (base.options.addClassActive === true) {
                    $(base.$owlItems[i]).addClass("active");
                }
            }
            base.owl.visibleItems = base.visibleItems;
        },

        transitionTypes : function (className) {
            var base = this;
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "owl-" + className + "-out";
            base.inClass = "owl-" + className + "-in";
        },

        singleItemTransition : function () {
            var base = this,
                outClass = base.outClass,
                inClass = base.inClass,
                $currentItem = base.$owlItems.eq(base.currentItem),
                $prevItem = base.$owlItems.eq(base.prevItem),
                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

            base.isTransition = true;

            base.$owlWrapper
                .addClass('owl-origin')
                .css({
                    "-webkit-transform-origin" : origin + "px",
                    "-moz-perspective-origin" : origin + "px",
                    "perspective-origin" : origin + "px"
                });
            function transStyles(prevPos) {
                return {
                    "position" : "relative",
                    "left" : prevPos + "px"
                };
            }

            $prevItem
                .css(transStyles(prevPos, 10))
                .addClass(outClass)
                .on(animEnd, function () {
                    base.endPrev = true;
                    $prevItem.off(animEnd);
                    base.clearTransStyle($prevItem, outClass);
                });

            $currentItem
                .addClass(inClass)
                .on(animEnd, function () {
                    base.endCurrent = true;
                    $currentItem.off(animEnd);
                    base.clearTransStyle($currentItem, inClass);
                });
        },

        clearTransStyle : function (item, classToRemove) {
            var base = this;
            item.css({
                "position" : "",
                "left" : ""
            }).removeClass(classToRemove);

            if (base.endPrev && base.endCurrent) {
                base.$owlWrapper.removeClass('owl-origin');
                base.endPrev = false;
                base.endCurrent = false;
                base.isTransition = false;
            }
        },

        owlStatus : function () {
            var base = this;
            base.owl = {
                "userOptions"   : base.userOptions,
                "baseElement"   : base.$elem,
                "userItems"     : base.$userItems,
                "owlItems"      : base.$owlItems,
                "currentItem"   : base.currentItem,
                "prevItem"      : base.prevItem,
                "visibleItems"  : base.visibleItems,
                "isTouch"       : base.browser.isTouch,
                "browser"       : base.browser,
                "dragDirection" : base.dragDirection
            };
        },

        clearEvents : function () {
            var base = this;
            base.$elem.off(".owl owl mousedown.disableTextSelect");
            $(document).off(".owl owl");
            $(window).off("resize", base.resizer);
        },

        unWrap : function () {
            var base = this;
            if (base.$elem.children().length !== 0) {
                base.$owlWrapper.unwrap();
                base.$userItems.unwrap().unwrap();
                if (base.owlControls) {
                    base.owlControls.remove();
                }
            }
            base.clearEvents();
            base.$elem.attr({
                style: base.$elem.data("owl-originalStyles") || "",
                class: base.$elem.data("owl-originalClasses")
            });
        },

        destroy : function () {
            var base = this;
            base.stop();
            window.clearInterval(base.checkVisible);
            base.unWrap();
            base.$elem.removeData();
        },

        reinit : function (newOptions) {
            var base = this,
                options = $.extend({}, base.userOptions, newOptions);
            base.unWrap();
            base.init(options, base.$elem);
        },

        addItem : function (htmlString, targetPosition) {
            var base = this,
                position;

            if (!htmlString) {return false; }

            if (base.$elem.children().length === 0) {
                base.$elem.append(htmlString);
                base.setVars();
                return false;
            }
            base.unWrap();
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }
            if (position >= base.$userItems.length || position === -1) {
                base.$userItems.eq(-1).after(htmlString);
            } else {
                base.$userItems.eq(position).before(htmlString);
            }

            base.setVars();
        },

        removeItem : function (targetPosition) {
            var base = this,
                position;

            if (base.$elem.children().length === 0) {
                return false;
            }
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }

            base.unWrap();
            base.$userItems.eq(position).remove();
            base.setVars();
        }

    };

    $.fn.owlCarousel = function (options) {
        return this.each(function () {
            if ($(this).data("owl-init") === true) {
                return false;
            }
            $(this).data("owl-init", true);
            var carousel = Object.create(Carousel);
            carousel.init(options, this);
            $.data(this, "owlCarousel", carousel);
        });
    };

    $.fn.owlCarousel.options = {

        items : 5,
        itemsCustom : false,
        itemsDesktop : [1199, 4],
        itemsDesktopSmall : [979, 3],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 1],
        singleItem : false,
        itemsScaleUp : false,

        slideSpeed : 200,
        paginationSpeed : 800,
        rewindSpeed : 1000,

        autoPlay : false,
        stopOnHover : false,

        navigation : false,
        navigationText : ["prev", "next"],
        rewindNav : true,
        scrollPerPage : false,

        pagination : true,
        paginationNumbers : false,

        responsive : true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth : window,

        baseClass : "owl-carousel",
        theme : "owl-theme",

        lazyLoad : false,
        lazyFollow : true,
        lazyEffect : "fade",

        autoHeight : false,

        jsonPath : false,
        jsonSuccess : false,

        dragBeforeAnimFinish : true,
        mouseDrag : true,
        touchDrag : true,

        addClassActive : false,
        transitionStyle : false,

        beforeUpdate : false,
        afterUpdate : false,
        beforeInit : false,
        afterInit : false,
        beforeMove : false,
        afterMove : false,
        afterAction : false,
        startDragging : false,
        afterLazyLoad: false
    };
}(jQuery, window, document));

/*!
 * jquery.fixedHeaderTable. The jQuery fixedHeaderTable plugin
 *
 * Copyright (c) 2013 Mark Malek
 * http://fixedheadertable.com
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * http://docs.jquery.com/Plugins/Authoring
 * jQuery authoring guidelines
 *
 * Launch  : October 2009
 * Version : 1.3
 * Released: May 9th, 2011
 *
 *
 * all CSS sizing (width,height) is done in pixels (px)
 */(function(c){c.fn.fixedHeaderTable=function(m){var u={width:"100%",height:"100%",themeClass:"fht-default",borderCollapse:!0,fixedColumns:0,fixedColumn:!1,sortable:!1,autoShow:!0,footer:!1,cloneHeadToFoot:!1,autoResize:!1,create:null},b={},n={init:function(a){b=c.extend({},u,a);return this.each(function(){var a=c(this);h._isTable(a)?(n.setup.apply(this,Array.prototype.slice.call(arguments,1)),c.isFunction(b.create)&&b.create.call(this)):c.error("Invalid table mark-up")})},setup:function(){var a=c(this), d=a.find("thead"),e=a.find("tfoot"),g=0,f,k,p;b.originalTable=c(this).clone();b.includePadding=h._isPaddingIncludedWithWidth();b.scrollbarOffset=h._getScrollbarWidth();b.themeClassName=b.themeClass;f=-1<b.width.search("%")?a.parent().width()-b.scrollbarOffset:b.width-b.scrollbarOffset;a.css({width:f});a.closest(".fht-table-wrapper").length||(a.addClass("fht-table"),a.wrap('<div class="fht-table-wrapper"></div>'));f=a.closest(".fht-table-wrapper");!0==b.fixedColumn&&0>=b.fixedColumns&&(b.fixedColumns= 1);0<b.fixedColumns&&0==f.find(".fht-fixed-column").length&&(a.wrap('<div class="fht-fixed-body"></div>'),c('<div class="fht-fixed-column"></div>').prependTo(f),k=f.find(".fht-fixed-body"));f.css({width:b.width,height:b.height}).addClass(b.themeClassName);a.hasClass("fht-table-init")||a.wrap('<div class="fht-tbody"></div>');p=a.closest(".fht-tbody");var l=h._getTableProps(a);h._setupClone(p,l.tbody);a.hasClass("fht-table-init")?k=f.find("div.fht-thead"):(k=0<b.fixedColumns?c('<div class="fht-thead"><table class="fht-table"></table></div>').prependTo(k): c('<div class="fht-thead"><table class="fht-table"></table></div>').prependTo(f),k.find("table.fht-table").addClass(b.originalTable.attr("class")).attr("style",b.originalTable.attr("style")),d.clone().appendTo(k.find("table")));h._setupClone(k,l.thead);a.css({"margin-top":-k.outerHeight(!0)});!0==b.footer&&(h._setupTableFooter(a,this,l),e.length||(e=f.find("div.fht-tfoot table")),g=e.outerHeight(!0));d=f.height()-d.outerHeight(!0)-g-l.border;p.css({height:d});a.addClass("fht-table-init");"undefined"!== typeof b.altClass&&n.altRows.apply(this);0<b.fixedColumns&&h._setupFixedColumn(a,this,l);b.autoShow||f.hide();h._bindScroll(p,l);return this},resize:function(){return this},altRows:function(a){var d=c(this);a="undefined"!==typeof a?a:b.altClass;d.closest(".fht-table-wrapper").find("tbody tr:odd:not(:hidden)").addClass(a)},show:function(a,d,b){var g=c(this),f=g.closest(".fht-table-wrapper");if("undefined"!==typeof a&&"number"===typeof a)return f.show(a,function(){c.isFunction(d)&&d.call(this)}),this; if("undefined"!==typeof a&&"string"===typeof a&&"undefined"!==typeof d&&"number"===typeof d)return f.show(a,d,function(){c.isFunction(b)&&b.call(this)}),this;g.closest(".fht-table-wrapper").show();c.isFunction(a)&&a.call(this);return this},hide:function(a,d,b){var g=c(this),f=g.closest(".fht-table-wrapper");if("undefined"!==typeof a&&"number"===typeof a)return f.hide(a,function(){c.isFunction(b)&&b.call(this)}),this;if("undefined"!==typeof a&&"string"===typeof a&&"undefined"!==typeof d&&"number"=== typeof d)return f.hide(a,d,function(){c.isFunction(b)&&b.call(this)}),this;g.closest(".fht-table-wrapper").hide();c.isFunction(b)&&b.call(this);return this},destroy:function(){var a=c(this),d=a.closest(".fht-table-wrapper");a.insertBefore(d).removeAttr("style").append(d.find("tfoot")).removeClass("fht-table fht-table-init").find(".fht-cell").remove();d.remove();return this}},h={_isTable:function(a){var d=a.is("table"),b=0<a.find("thead").length;a=0<a.find("tbody").length;return d&&b&&a?!0:!1},_bindScroll:function(a){var d= a.closest(".fht-table-wrapper"),c=a.siblings(".fht-thead"),g=a.siblings(".fht-tfoot");a.bind("scroll",function(){0<b.fixedColumns&&d.find(".fht-fixed-column").find(".fht-tbody table").css({"margin-top":-a.scrollTop()});c.find("table").css({"margin-left":-this.scrollLeft});(b.footer||b.cloneHeadToFoot)&&g.find("table").css({"margin-left":-this.scrollLeft})})},_fixHeightWithCss:function(a,d){b.includePadding?a.css({height:a.height()+d.border}):a.css({height:a.parent().height()+d.border})},_fixWidthWithCss:function(a, d,e){b.includePadding?a.each(function(){c(this).css({width:void 0==e?c(this).width():e})}):a.each(function(){c(this).css({width:void 0==e?c(this).parent().width():e})})},_setupFixedColumn:function(a,d,e){var g=a.closest(".fht-table-wrapper"),f=g.find(".fht-fixed-body");d=g.find(".fht-fixed-column");var k=c('<div class="fht-thead"><table class="fht-table"><thead><tr></tr></thead></table></div>'),p=c('<div class="fht-tbody"><table class="fht-table"><tbody></tbody></table></div>');a=c('<div class="fht-tfoot"><table class="fht-table"><tfoot><tr></tr></tfoot></table></div>'); var g=g.width(),l=f.find(".fht-tbody").height()-b.scrollbarOffset,q,t,r,s;k.find("table.fht-table").addClass(b.originalTable.attr("class"));p.find("table.fht-table").addClass(b.originalTable.attr("class"));a.find("table.fht-table").addClass(b.originalTable.attr("class"));q=f.find(".fht-thead thead tr > *:lt("+b.fixedColumns+")");r=b.fixedColumns*e.border;q.each(function(){r+=c(this).outerWidth(!0)});h._fixHeightWithCss(q,e);h._fixWidthWithCss(q,e);var m=[];q.each(function(){m.push(c(this).width())}); t=f.find("tbody tr > *:not(:nth-child(n+"+(b.fixedColumns+1)+"))").each(function(a){h._fixHeightWithCss(c(this),e);h._fixWidthWithCss(c(this),e,m[a%b.fixedColumns])});k.appendTo(d).find("tr").append(q.clone());p.appendTo(d).css({"margin-top":-1,height:l+e.border});t.each(function(a){0==a%b.fixedColumns&&(s=c("<tr></tr>").appendTo(p.find("tbody")),b.altClass&&c(this).parent().hasClass(b.altClass)&&s.addClass(b.altClass));c(this).clone().appendTo(s)});d.css({height:0,width:r});var n=d.find(".fht-tbody .fht-table").height()- d.find(".fht-tbody").height();d.find(".fht-tbody .fht-table").bind("mousewheel",function(a,d,b,e){if(0!=e)return a=parseInt(c(this).css("marginTop"),10)+(0<e?120:-120),0<a&&(a=0),a<-n&&(a=-n),c(this).css("marginTop",a),f.find(".fht-tbody").scrollTop(-a).scroll(),!1});f.css({width:g});if(!0==b.footer||!0==b.cloneHeadToFoot)k=f.find(".fht-tfoot tr > *:lt("+b.fixedColumns+")"),h._fixHeightWithCss(k,e),a.appendTo(d).find("tr").append(k.clone()),d=a.find("table").innerWidth(),a.css({top:b.scrollbarOffset, width:d})},_setupTableFooter:function(a,d,e){d=a.closest(".fht-table-wrapper");var g=a.find("tfoot");a=d.find("div.fht-tfoot");a.length||(a=0<b.fixedColumns?c('<div class="fht-tfoot"><table class="fht-table"></table></div>').appendTo(d.find(".fht-fixed-body")):c('<div class="fht-tfoot"><table class="fht-table"></table></div>').appendTo(d));a.find("table.fht-table").addClass(b.originalTable.attr("class"));switch(!0){case !g.length&&!0==b.cloneHeadToFoot&&!0==b.footer:e=d.find("div.fht-thead");a.empty(); e.find("table").clone().appendTo(a);break;case g.length&&!1==b.cloneHeadToFoot&&!0==b.footer:a.find("table").append(g).css({"margin-top":-e.border}),h._setupClone(a,e.tfoot)}},_getTableProps:function(a){var d={thead:{},tbody:{},tfoot:{},border:0},c=1;!0==b.borderCollapse&&(c=2);d.border=(a.find("th:first-child").outerWidth()-a.find("th:first-child").innerWidth())/c;d.thead=h._getColumnsWidth(a.find("thead tr"));d.tfoot=h._getColumnsWidth(a.find("tfoot tr"));d.tbody=h._getColumnsWidth(a.find("tbody tr")); return d},_getColumnsWidth:function(a){var d={},b={},g=0,f,k;f=h._getColumnsCount(a);for(k=0;k<f;k++)b[k]={rowspan:1,colspan:1};a.each(function(a){var l=0,k=0;c(this).children().each(function(a){for(var f=parseInt(c(this).attr("colspan"))||1,h=parseInt(c(this).attr("rowspan"))||1;1<b[a+k].rowspan;)b[a+k].rowspan--,k+=b[a].colspan;a+=l+k;l+=f-1;1<h&&(b[a]={rowspan:h,colspan:f});if("undefined"===typeof d[a]||1!=d[a].colspan)d[a]={width:c(this).width()+parseInt(c(this).css("border-left-width"))+parseInt(c(this).css("border-right-width")), colspan:f},1==f&&g++});if(g==f)return!1});return d},_getColumnsCount:function(a){var b=0;a.each(function(a){var g;c(this).children().each(function(a){a=parseInt(c(this).attr("colspan"))||1;g=parseInt(c(this).attr("rowspan"))||1;b+=a});if(1<b||1==g)return!1});return b},_setupClone:function(a,d){var e=a.find("thead").length?"thead tr":a.find("tfoot").length?"tfoot tr":"tbody tr",g={},e=a.find(e);columnsCount=h._getColumnsCount(e);for(i=0;i<columnsCount;i++)g[i]={rowspan:1,colspan:1};e.each(function(a){var e= 0,h=0;c(this).children().each(function(a){for(var f=parseInt(c(this).attr("colspan"))||1,m=parseInt(c(this).attr("rowspan"))||1;1<g[a+h].rowspan;)g[a+h].rowspan--,h+=g[a].colspan;a+=e+h;e+=f-1;1<m&&(g[a]={rowspan:m,colspan:f});"undefined"!==typeof d[a]&&d[a].colspan==f&&((c(this).find("div.fht-cell").length?c(this).find("div.fht-cell"):c('<div class="fht-cell"></div>').appendTo(c(this))).css({width:parseInt(d[a].width,10)}),c(this).closest(".fht-tbody").length||!c(this).is(":last-child")||c(this).closest(".fht-fixed-column").length|| (a=Math.max((c(this).innerWidth()-c(this).width())/2,b.scrollbarOffset),c(this).css({"padding-right":parseInt(c(this).css("padding-right"))+a+"px"})))})})},_isPaddingIncludedWithWidth:function(){var a=c('<table class="fht-table"><tr><td style="padding: 10px; font-size: 10px;">test</td></tr></table>'),d,e;a.addClass(b.originalTable.attr("class"));a.appendTo("body");d=a.find("td").height();a.find("td").css("height",a.find("tr").height());e=a.find("td").height();a.remove();return d!=e?!0:!1},_getScrollbarWidth:function(){var a= 0;if(!a)if(/msie/.test(navigator.userAgent.toLowerCase())){var b=c('<textarea cols="10" rows="2"></textarea>').css({position:"absolute",top:-1E3,left:-1E3}).appendTo("body"),e=c('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({position:"absolute",top:-1E3,left:-1E3}).appendTo("body"),a=b.width()-e.width()+2;b.add(e).remove()}else b=c("<div />").css({width:100,height:100,overflow:"auto",position:"absolute",top:-1E3,left:-1E3}).prependTo("body").append("<div />").find("div").css({width:"100%", height:200}),a=100-b.width(),b.parent().remove();return a}};if(n[m])return n[m].apply(this,Array.prototype.slice.call(arguments,1));if("object"!==typeof m&&m)c.error('Method "'+m+'" does not exist in fixedHeaderTable plugin!');else return n.init.apply(this,arguments)}})(jQuery);


/* perfect-scrollbar v0.7.1 */

/*!
 * hoverIntent v1.8.0 // 2014.06.29 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */
 
/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */
(function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 6,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( Math.sqrt( (pX-cX)*(pX-cX) + (pY-cY)*(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.hoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = true;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = false;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = $.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // if e.type === "mouseenter"
            if (e.type === "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.hoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (!ob.hoverIntent_s) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);

/*! iCheck v1.0.2 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
(function(f){function A(a,b,d){var c=a[0],g=/er/.test(d)?_indeterminate:/bl/.test(d)?n:k,e=d==_update?{checked:c[k],disabled:c[n],indeterminate:"true"==a.attr(_indeterminate)||"false"==a.attr(_determinate)}:c[g];if(/^(ch|di|in)/.test(d)&&!e)x(a,g);else if(/^(un|en|de)/.test(d)&&e)q(a,g);else if(d==_update)for(var f in e)e[f]?x(a,f,!0):q(a,f,!0);else if(!b||"toggle"==d){if(!b)a[_callback]("ifClicked");e?c[_type]!==r&&q(a,g):x(a,g)}}function x(a,b,d){var c=a[0],g=a.parent(),e=b==k,u=b==_indeterminate,
v=b==n,s=u?_determinate:e?y:"enabled",F=l(a,s+t(c[_type])),B=l(a,b+t(c[_type]));if(!0!==c[b]){if(!d&&b==k&&c[_type]==r&&c.name){var w=a.closest("form"),p='input[name="'+c.name+'"]',p=w.length?w.find(p):f(p);p.each(function(){this!==c&&f(this).data(m)&&q(f(this),b)})}u?(c[b]=!0,c[k]&&q(a,k,"force")):(d||(c[b]=!0),e&&c[_indeterminate]&&q(a,_indeterminate,!1));D(a,e,b,d)}c[n]&&l(a,_cursor,!0)&&g.find("."+C).css(_cursor,"default");g[_add](B||l(a,b)||"");g.attr("role")&&!u&&g.attr("aria-"+(v?n:k),"true");
g[_remove](F||l(a,s)||"")}function q(a,b,d){var c=a[0],g=a.parent(),e=b==k,f=b==_indeterminate,m=b==n,s=f?_determinate:e?y:"enabled",q=l(a,s+t(c[_type])),r=l(a,b+t(c[_type]));if(!1!==c[b]){if(f||!d||"force"==d)c[b]=!1;D(a,e,s,d)}!c[n]&&l(a,_cursor,!0)&&g.find("."+C).css(_cursor,"pointer");g[_remove](r||l(a,b)||"");g.attr("role")&&!f&&g.attr("aria-"+(m?n:k),"false");g[_add](q||l(a,s)||"")}function E(a,b){if(a.data(m)){a.parent().html(a.attr("style",a.data(m).s||""));if(b)a[_callback](b);a.off(".i").unwrap();
f(_label+'[for="'+a[0].id+'"]').add(a.closest(_label)).off(".i")}}function l(a,b,f){if(a.data(m))return a.data(m).o[b+(f?"":"Class")]}function t(a){return a.charAt(0).toUpperCase()+a.slice(1)}function D(a,b,f,c){if(!c){if(b)a[_callback]("ifToggled");a[_callback]("ifChanged")[_callback]("if"+t(f))}}var m="iCheck",C=m+"-helper",r="radio",k="checked",y="un"+k,n="disabled";_determinate="determinate";_indeterminate="in"+_determinate;_update="update";_type="type";_click="click";_touch="touchbegin.i touchend.i";
_add="addClass";_remove="removeClass";_callback="trigger";_label="label";_cursor="cursor";_mobile=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);f.fn[m]=function(a,b){var d='input[type="checkbox"], input[type="'+r+'"]',c=f(),g=function(a){a.each(function(){var a=f(this);c=a.is(d)?c.add(a):c.add(a.find(d))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a))return a=a.toLowerCase(),g(this),c.each(function(){var c=
f(this);"destroy"==a?E(c,"ifDestroyed"):A(c,!0,a);f.isFunction(b)&&b()});if("object"!=typeof a&&a)return this;var e=f.extend({checkedClass:k,disabledClass:n,indeterminateClass:_indeterminate,labelHover:!0},a),l=e.handle,v=e.hoverClass||"hover",s=e.focusClass||"focus",t=e.activeClass||"active",B=!!e.labelHover,w=e.labelHoverClass||"hover",p=(""+e.increaseArea).replace("%","")|0;if("checkbox"==l||l==r)d='input[type="'+l+'"]';-50>p&&(p=-50);g(this);return c.each(function(){var a=f(this);E(a);var c=this,
b=c.id,g=-p+"%",d=100+2*p+"%",d={position:"absolute",top:g,left:g,display:"block",width:d,height:d,margin:0,padding:0,background:"#fff",border:0,opacity:0},g=_mobile?{position:"absolute",visibility:"hidden"}:p?d:{position:"absolute",opacity:0},l="checkbox"==c[_type]?e.checkboxClass||"icheckbox":e.radioClass||"i"+r,z=f(_label+'[for="'+b+'"]').add(a.closest(_label)),u=!!e.aria,y=m+"-"+Math.random().toString(36).substr(2,6),h='<div class="'+l+'" '+(u?'role="'+c[_type]+'" ':"");u&&z.each(function(){h+=
'aria-labelledby="';this.id?h+=this.id:(this.id=y,h+=y);h+='"'});h=a.wrap(h+"/>")[_callback]("ifCreated").parent().append(e.insert);d=f('<ins class="'+C+'"/>').css(d).appendTo(h);a.data(m,{o:e,s:a.attr("style")}).css(g);e.inheritClass&&h[_add](c.className||"");e.inheritID&&b&&h.attr("id",m+"-"+b);"static"==h.css("position")&&h.css("position","relative");A(a,!0,_update);if(z.length)z.on(_click+".i mouseover.i mouseout.i "+_touch,function(b){var d=b[_type],e=f(this);if(!c[n]){if(d==_click){if(f(b.target).is("a"))return;
A(a,!1,!0)}else B&&(/ut|nd/.test(d)?(h[_remove](v),e[_remove](w)):(h[_add](v),e[_add](w)));if(_mobile)b.stopPropagation();else return!1}});a.on(_click+".i focus.i blur.i keyup.i keydown.i keypress.i",function(b){var d=b[_type];b=b.keyCode;if(d==_click)return!1;if("keydown"==d&&32==b)return c[_type]==r&&c[k]||(c[k]?q(a,k):x(a,k)),!1;if("keyup"==d&&c[_type]==r)!c[k]&&x(a,k);else if(/us|ur/.test(d))h["blur"==d?_remove:_add](s)});d.on(_click+" mousedown mouseup mouseover mouseout "+_touch,function(b){var d=
b[_type],e=/wn|up/.test(d)?t:v;if(!c[n]){if(d==_click)A(a,!1,!0);else{if(/wn|er|in/.test(d))h[_add](e);else h[_remove](e+" "+t);if(z.length&&B&&e==v)z[/ut|nd/.test(d)?_remove:_add](w)}if(_mobile)b.stopPropagation();else return!1}})})}})(window.jQuery||window.Zepto);

(function($) {
  "use strict";

  $.fn.treeMultiselect = function(opts) {
    var options = mergeDefaultOptions(opts);
    this.each(function() {
      var $originalSelect = $(this);
      $originalSelect.attr('multiple', '').css('display', 'none');

      var uiBuilder = new UiBuilder();
      uiBuilder.build($originalSelect, options.hideSidePanel);

      var $selectionContainer = $(uiBuilder.selections);

      generateSelections($originalSelect, $selectionContainer, options);

      addDescriptionHover($selectionContainer, options);
      addCheckboxes($selectionContainer, options);
      checkPreselectedSelections($originalSelect, $selectionContainer, options);

      if (options.allowBatchSelection) {
        armTitleCheckboxes($selectionContainer, options);
        uncheckParentsOnUnselect($selectionContainer, options);
        checkParentsOnAllChildrenSelected($selectionContainer, options);
        showSemifilledParents($selectionContainer, options);
      }

      if (options.collapsible) {
        addCollapsibility($selectionContainer, options);
      }

      if (options.enableSelectAll) {
        createSelectAllButtons($selectionContainer, options);
      }

      var $selectedContainer = $(uiBuilder.selected);
      updateSelectedAndOnChange($selectionContainer, $selectedContainer, $originalSelect, options);

      armRemoveSelectedOnClick($selectionContainer, $selectedContainer, options);
    });
    return this;
  };

  function mergeDefaultOptions(options) {
    var defaults = {
      allowBatchSelection: true,
      collapsible: true,
      enableSelectAll: false,
      selectAllText: 'Select All',
      unselectAllText: 'Unselect All',
      freeze: false,
      hideSidePanel: false,
      onChange: null,
      onlyBatchSelection: false,
      sectionDelimiter: '/',
      showSectionOnSelected: true,
      sortable: false,
      startCollapsed: false
    };
    return $.extend({}, defaults, options);
  }

  function generateSelections($originalSelect, $selectionContainer, options) {
    // nested objects and arrays
    var data = {};

    function insertOption(path, option) {
      var currentPos = data;
      for (var i = 0; i < path.length; ++i) {
        var pathPart = path[i];

        if (!currentPos[pathPart]) {
          currentPos[pathPart] = [];
        }
        currentPos = currentPos[pathPart];

        if (i == path.length - 1) {
          currentPos.push(option);
          break;
        }

        pathPart = path[i + 1];
        var existingObj = null;
        for (var j = 0; j < currentPos.length; ++j) {
          var arrayItem = currentPos[j];
          if ((arrayItem.constructor != Option) &&
              $.isPlainObject(arrayItem) &&
              arrayItem[pathPart] &&
              (typeof arrayItem[pathPart] !== 'undefined')) {
            existingObj = arrayItem;
            break;
          }
        }

        if (existingObj) {
          currentPos = existingObj;
        } else {
          var newLength = currentPos.push({});
          currentPos = currentPos[newLength - 1];
        }
      }
    }

    $originalSelect.find("> option").each(function() {
      var $option = $(this);
      var path = $option.attr('data-section').split(options.sectionDelimiter);

      var optionValue = $option.val();
      var optionName = $option.text();
      var optionDescription = $option.attr('data-description');
      var optionIndex = $option.attr('data-index');
      var option = new Option(optionValue, optionName, optionDescription, optionIndex);
      insertOption(path, option);
    });

    fillSelections($selectionContainer, data);
  }

  function fillSelections($selectionContainer, data) {
    function createSection($sectionContainer, title) {
      var section = document.createElement('div');
      section.className = "section";

      var sectionTitle = document.createElement('div');
      sectionTitle.className = "title";
      sectionTitle.innerHTML = title;

      $(section).append(sectionTitle);
      $sectionContainer.append(section);
      return section;
    }

    function createSelection($itemContainer, option) {
      var text = option.text;
      var value = option.value;
      var description = option.description;
      var index = option.index;

      var selection = document.createElement('div');
      selection.className = "item";
      $(selection).text(text || value).attr({
        'data-value': value,
        'data-description': description,
        'data-index': index
      });
      $itemContainer.append(selection);
      return selection;
    }

    if (data.constructor == Option) {
      createSelection($selectionContainer, data);
    } else if ($.isArray(data)) {
      for (var i = 0; i < data.length; ++i) {
        fillSelections($selectionContainer, data[i]);
      }
    } else {
      for (var key in data) {
        if (!data.hasOwnProperty(key)) continue;
        var $section = $(createSection($selectionContainer, key));
        fillSelections($section, data[key]);
      }
    }
  }

  function addDescriptionHover($selectionContainer) {
    var $description = $("<span class='description'>?</span>");
    var targets = $selectionContainer.find("div.item[data-description!=''][data-description]");
    $description.prependTo(targets);

    $("div.item > span.description").unbind().mouseenter(function() {
      var $item = $(this).parent();
      var description = $item.attr('data-description');

      var descriptionDiv = document.createElement('div');
      descriptionDiv.className = "temp-description-popup";
      descriptionDiv.innerHTML = description;

      descriptionDiv.style.position = 'absolute';

      $item.append(descriptionDiv);
    }).mouseleave(function() {
      var $item = $(this).parent();
      $item.find("div.temp-description-popup").remove();
    });
  }

  function addCheckboxes($selectionContainer, options) {
    var $checkbox = $('<input />', { type: 'checkbox' });
    if (options.freeze) {
      $checkbox.attr('disabled', 'disabled');
    }

    var $targets = null;
    if (options.onlyBatchSelection) {
      $targets = $selectionContainer.find("div.title");
    } else if (options.allowBatchSelection) {
      $targets = $selectionContainer.find("div.title, div.item");
    } else {
      $targets = $selectionContainer.find("div.item");
    }

    $checkbox.prependTo($targets);
    $selectionContainer.find('input[type=checkbox]').click(function(e) {
      e.stopPropagation();
    });
  }

  function checkPreselectedSelections($originalSelect, $selectionContainer) {
    var selectedOptions = $originalSelect.val();
    if (!selectedOptions) return;

    var $selectedOptionDivs = $selectionContainer.find("div.item").filter(function() {
      var item = $(this);
      return selectedOptions.indexOf(item.attr('data-value')) !== -1;
    });
    $selectedOptionDivs.find("> input[type=checkbox]").prop('checked', true);
  }

  function armTitleCheckboxes($selectionContainer) {
    var $titleCheckboxes = $selectionContainer.find("div.title > input[type=checkbox]");
    $titleCheckboxes.change(function() {
      var $titleCheckbox = $(this);
      var $section = $titleCheckbox.closest("div.section");
      var $checkboxesToBeChanged = $section.find("input[type=checkbox]");
      var checked = $titleCheckbox.is(':checked');
      $checkboxesToBeChanged.prop('checked', checked);
    });
  }

  function uncheckParentsOnUnselect($selectionContainer) {
    var $checkboxes = $selectionContainer.find("input[type=checkbox]");
    $checkboxes.change(function() {
      var $checkbox = $(this);
      if ($checkbox.is(":checked")) return;
      var $sectionParents = $checkbox.parentsUntil($selectionContainer, "div.section");
      $sectionParents.find("> div.title > input[type=checkbox]").prop('checked', false);
    });
  }

  function checkParentsOnAllChildrenSelected($selectionContainer) {
    function check() {
      var sections = $selectionContainer.find("div.section");
      sections.each(function() {
        var $section = $(this);
        var $sectionItems = $section.find("div.item");
        var $unselectedItems = $sectionItems.filter(function() {
          var $checkbox = $(this).find("> input[type=checkbox]");
          return !($checkbox.is(":checked"));
        });
        if ($unselectedItems.length === 0) {
          var sectionCheckbox = $(this).find("> div.title > input[type=checkbox]");
          sectionCheckbox.prop('checked', true);
        }
      });
    }

    onCheckboxChange($selectionContainer, check);
  }

  function showSemifilledParents($selectionContainer) {
    function check() {
      var sections = $selectionContainer.find("div.section");
      sections.each(function() {
        var $section = $(this);
        var $items = $section.find("div.item");
        var numSelected = $items.filter(function() {
          var item = $(this);
          return item.find("> input[type=checkbox]").prop('checked');
        }).length;

        var $sectionCheckbox = $section.find("> div.title > input[type=checkbox]");
        var isIndeterminate = (numSelected !== 0 && numSelected !== $items.length);
        $sectionCheckbox.prop('indeterminate', isIndeterminate);
      });
    }

    onCheckboxChange($selectionContainer, check);
  }

  function addCollapsibility($selectionContainer, options) {
    var hideIndicator = "-";
    var expandIndicator = "+";

    var $titleDivs = $selectionContainer.find("div.title");

    var collapseDiv = document.createElement('span');
    collapseDiv.className = "collapse-section";
    if (options.startCollapsed) {
      $(collapseDiv).text(expandIndicator);
      $titleDivs.siblings().toggle();
    } else {
      $(collapseDiv).text(hideIndicator);
    }
    $titleDivs.prepend(collapseDiv);

    $("span.collapse-section").unbind().click(function(e) {
      e.stopPropagation();
      var $collapseSection = $(this);
      var indicator = $collapseSection.text();
      $collapseSection.text(indicator ==  hideIndicator ? expandIndicator : hideIndicator);
      var $title = $collapseSection.parent();
      $title.siblings().toggle();
    });

    $titleDivs.click(function() {
      $(this).find("> span.collapse-section").trigger('click');
    });
  }

  function createSelectAllButtons($selectionContainer, options) {
    var $selectAll = $("<span class='select-all'></span>");
    $selectAll.text(options.selectAllText);
    var $unselectAll = $("<span class='unselect-all'></span>");
    $unselectAll.text(options.unselectAllText);

    var $selectAllContainer = $("<div class='select-all-container'></div>");

    $selectAllContainer.prepend($unselectAll);
    $selectAllContainer.prepend($selectAll);

    $selectionContainer.prepend($selectAllContainer);

    var $checkboxes = $selectionContainer.find("div.item").find("> input[type=checkbox]");

    $selectAll.unbind().click(function(e) {
      $checkboxes.prop('checked', true).change();
    });

    $unselectAll.unbind().click(function(e) {
      $checkboxes.prop('checked', false).change();
    });
  }

  function updateSelectedAndOnChange($selectionContainer, $selectedContainer, $originalSelect, options) {
    function createSelectedDiv(selection) {
      var text = selection.text;
      var value = selection.value;
      var sectionName = selection.sectionName;

      var item = document.createElement('div');
      item.className = "item";
      item.innerHTML = text;

      if (options.showSectionOnSelected) {
        var $sectionSpan = $("<span class='section-name'></span>");
        $sectionSpan.text(sectionName);
        $(item).append($sectionSpan);
      }

      if (!options.freeze) {
        $(item).prepend("<span class='remove-selected'>×</span>");
      }

      $(item).attr('data-value', value)
        .appendTo($selectedContainer);
    }

    function addNewFromSelected(selections) {
      var currentSelections = [];
      $selectedContainer.find("div.item").each(function() {
        currentSelections.push($(this).attr('data-value'));
      });

      var selectionsNotYetAdded = selections.filter(function(selection) {
        return currentSelections.indexOf(selection.value) == -1;
      });

      selectionsNotYetAdded.forEach(function(selection) {
        createSelectedDiv(selection);
      });

      armRemoveSelectedOnClick($selectionContainer, $selectedContainer);

      return selectionsNotYetAdded;
    }

    function removeOldFromSelected(selections) {
      var selectionTexts = [];
      selections.forEach(function(selection) {
        selectionTexts.push(selection.value);
      });

      var removedValues = [];

      $selectedContainer.find("div.item").each(function(index, el) {
        var $item = $(el);
        var value = $item.attr('data-value');
        if (selectionTexts.indexOf(value) == -1) {
          removedValues.push(value);
          $item.remove();
        }
      });

      var unselectedSelections = [];
      var allSelections = $selectionContainer.find("div.item");
      allSelections.each(function() {
        var $this = $(this);
        if (removedValues.indexOf($this.attr('data-value')) !== -1) {
          unselectedSelections.push(elToSelectionObject($this));
        }
      });
      return unselectedSelections;
    }

    function updateOriginalSelect() {
      var selected = [];
      $selectedContainer.find("div.item").each(function() {
        selected.push($(this).attr('data-value'));
      });

      $originalSelect.val(selected).change();

      $originalSelect.html($originalSelect.find("option").sort(function(a, b) {
        var aValue = selected.indexOf($(a).attr('value'));
        var bValue = selected.indexOf($(b).attr('value'));

        if (aValue > bValue) return 1;
        if (aValue < bValue) return -1;
        return 0;
      }));
    }

    function elToSelectionObject($el) {
      var text = textOf($el);
      var value = $el.attr('data-value');
      var initialIndex = $el.attr('data-index');
      $el.attr('data-index', undefined);

      var sectionName = $.map($el.parentsUntil($selectionContainer, "div.section").get().reverse(), function(parentSection) {
        return textOf($(parentSection).find("> div.title"));
      }).join(options.sectionDelimiter);

      return {
        text: text,
        value: value,
        initialIndex: initialIndex,
        sectionName: sectionName
      };
    }

    var initialRun = true;
    function update() {
      var $selectedBoxes = $selectionContainer.find("div.item").has("> input[type=checkbox]:checked");
      var selections = [];

      $selectedBoxes.each(function() {
        var $el = $(this);
        selections.push(elToSelectionObject($el));
      });

      selections.sort(function(a, b) {
        var aIndex = parseInt(a.initialIndex);
        var bIndex = parseInt(b.initialIndex);
        if (aIndex > bIndex) return 1;
        if (aIndex < bIndex) return -1;
        return 0;
      });

      var newlyAddedSelections = addNewFromSelected(selections);
      var newlyRemovedSelections = removeOldFromSelected(selections);
      updateOriginalSelect();

      if (initialRun) {
        initialRun = false;
      } else if (options.onChange) {
        options.onChange(selections, newlyAddedSelections, newlyRemovedSelections);
      }

      if (options.sortable && !options.freeze) {
        $selectedContainer.sortable({
          update: function(event, ui) {
            updateOriginalSelect();
          }
        });
      }
    }

    onCheckboxChange($selectionContainer, update);
  }

  function armRemoveSelectedOnClick($selectionContainer, $selectedContainer) {
    $selectedContainer.find("span.remove-selected").unbind().click(function() {
      var value = $(this).parent().attr('data-value');
      var $matchingSelection = $selectionContainer.find("div.item[data-value='" + value + "']");
      var $matchingCheckbox = $matchingSelection.find("> input[type=checkbox]");
      $matchingCheckbox.prop('checked', false);
      $matchingCheckbox.change();
    });
  }

  // Helpers
  var UiBuilder = function() {};
  UiBuilder.prototype.build = function(el, hideSidePanel) {
    var tree = document.createElement('div');
    tree.className = "tree-multiselect";
    $(el).after(tree);

    var selections = document.createElement('div');
    selections.className = "selections";
    if (hideSidePanel) {
      selections.className += " no-border";
    }
    $(tree).append(selections);

    var selected = document.createElement('div');
    selected.className = "selected";
    if (!hideSidePanel) {
      $(tree).append(selected);
    }

    this.tree = tree;
    this.selections = selections;
    this.selected = selected;
  };

  var Option = function(value, text, description, index) {
    this.value = value;
    this.text = text;
    this.description = description;
    this.index = index;
  };

  function onCheckboxChange($selectionContainer, callback) {
    var checkboxes = $selectionContainer.find("input[type=checkbox]");
    checkboxes.change(function() {
      callback();
    });
    callback();
  }

  function textOf(el) {
    return $(el).clone().children().remove().end().text();
  }
})(jQuery);

jQuery(function ($) {
    'use strict';
    function iCheckLine() {
        var self = $(this),
            label = self.parent().text();

        self.parent().empty().append(self);

        self.iCheck({
            checkboxClass: 'icheckbox_' + cl,
            radioClass: 'iradio_' + cl,
            insert: '<div class="icheck_line-icon"></div>' + label
        });
    }

    var styles = {
        'flat': [
            null,
            'aero',
            'blue',
            'green',
            'grey',
            'orange',
            'pink',
            'purple',
            'red',
            'yellow'
        ],
        'futurico': [null],
        'line': [
            null,
            'aero',
            'blue',
            'green',
            'grey',
            'orange',
            'pink',
            'purple',
            'red',
            'yellow'
        ],
        'minimal': [
            null,
            'aero',
            'blue',
            'green',
            'grey',
            'orange',
            'pink',
            'purple',
            'red',
            'yellow'
        ],
        'polaris': [null],
        'square': [
            null,
            'aero',
            'blue',
            'green',
            'grey',
            'orange',
            'pink',
            'purple',
            'red',
            'yellow'
        ]
    };
    var j, name, cl, style;
    var $ichecks = $('input.icheck');
    for (name in styles) {
        style = styles[name];
        for (j = 0; j < style.length; j++) {
            cl = name;
            if (style[j]) cl += '-' + style[j];

            if (name == 'line') {
                $ichecks.filter('.' + cl).each(iCheckLine);
            } else {
                $ichecks.filter('.' + cl).iCheck({
                    checkboxClass: 'icheckbox_' + cl,
                    radioClass: 'iradio_' + cl
                });
            }
        }
    }
    $ichecks.on('ifChanged', function (event) {
        //ThaoDTP
        if ($(this).attr('type') == 'checkbox') {
            var attr = $(this).attr('checked');
            if (typeof attr !== typeof undefined && attr !== false) {
                $(this).removeAttr('checked');
            } else {
                $(this).attr('checked', true);
            }
            $(this).trigger("change");
        }
    });

    $ichecks.on('ifChecked', function (event) {
        //ThaoDTP
        if ($(this).attr('type') == 'radio') {
            var attr = $(this).attr('checked');
            if (typeof attr !== typeof undefined && attr !== false) {
            } else {
                $(this).attr('checked', true);
            }
            $(this).trigger("change");
        }
    });
});

(function defineMustache(global,factory){if(typeof exports==="object"&&exports&&typeof exports.nodeName!=="string"){factory(exports)}else if(typeof define==="function"&&define.amd){define(["exports"],factory)}else{global.Mustache={};factory(Mustache)}})(this,function mustacheFactory(mustache){var objectToString=Object.prototype.toString;var isArray=Array.isArray||function isArrayPolyfill(object){return objectToString.call(object)==="[object Array]"};function isFunction(object){return typeof object==="function"}function typeStr(obj){return isArray(obj)?"array":typeof obj}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function hasProperty(obj,propName){return obj!=null&&typeof obj==="object"&&propName in obj}var regExpTest=RegExp.prototype.test;function testRegExp(re,string){return regExpTest.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};function escapeHtml(string){return String(string).replace(/[&<>"'\/]/g,function fromEntityMap(s){return entityMap[s]})}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tagsToCompile){if(typeof tagsToCompile==="string")tagsToCompile=tagsToCompile.split(spaceRe,2);if(!isArray(tagsToCompile)||tagsToCompile.length!==2)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*");closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1]));closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length)}else{nonSpace=true}tokens.push(["text",chr,start,start+1]);start+=1;if(chr==="\n")stripSpace()}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||"name";scanner.scan(whiteRe);if(type==="="){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==="{"){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type="&"}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);token=[type,value,start,scanner.pos];tokens.push(token);if(type==="#"||type==="^"){sections.push(token)}else if(type==="/"){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else if(type==="name"||type==="{"||type==="&"){nonSpace=true}else if(type==="="){compileTags(value)}}openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==="text"&&lastToken&&lastToken[0]==="text"){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case"#":case"^":collector.push(token);sections.push(token);collector=token[4]=[];break;case"/":section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function eos(){return this.tail===""};Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||match.index!==0)return"";var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function scanUntil(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view;this.cache={".":this.view};this.parent=parentContext}Context.prototype.push=function push(view){return new Context(view,this)};Context.prototype.lookup=function lookup(name){var cache=this.cache;var value;if(cache.hasOwnProperty(name)){value=cache[name]}else{var context=this,names,index,lookupHit=false;while(context){if(name.indexOf(".")>0){value=context.view;names=name.split(".");index=0;while(value!=null&&index<names.length){if(index===names.length-1)lookupHit=hasProperty(value,names[index]);value=value[names[index++]]}}else{value=context.view[name];lookupHit=hasProperty(context.view,name)}if(lookupHit)break;context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.cache={}}Writer.prototype.clearCache=function clearCache(){this.cache={}};Writer.prototype.parse=function parse(template,tags){var cache=this.cache;var tokens=cache[template];if(tokens==null)tokens=cache[template]=parseTemplate(template,tags);return tokens};Writer.prototype.render=function render(template,view,partials){var tokens=this.parse(template);var context=view instanceof Context?view:new Context(view);return this.renderTokens(tokens,context,partials,template)};Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate){var buffer="";var token,symbol,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){value=undefined;token=tokens[i];symbol=token[0];if(symbol==="#")value=this.renderSection(token,context,partials,originalTemplate);else if(symbol==="^")value=this.renderInverted(token,context,partials,originalTemplate);else if(symbol===">")value=this.renderPartial(token,context,partials,originalTemplate);else if(symbol==="&")value=this.unescapedValue(token,context);else if(symbol==="name")value=this.escapedValue(token,context);else if(symbol==="text")value=this.rawValue(token);if(value!==undefined)buffer+=value}return buffer};Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate){var self=this;var buffer="";var value=context.lookup(token[1]);function subRender(template){return self.render(template,context,partials)}if(!value)return;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate)}}else if(typeof value==="object"||typeof value==="string"||typeof value==="number"){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate)}else if(isFunction(value)){if(typeof originalTemplate!=="string")throw new Error("Cannot use higher-order sections without the original template");value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate)}return buffer};Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate){var value=context.lookup(token[1]);if(!value||isArray(value)&&value.length===0)return this.renderTokens(token[4],context,partials,originalTemplate)};Writer.prototype.renderPartial=function renderPartial(token,context,partials){if(!partials)return;var value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null)return this.renderTokens(this.parse(value),context,partials,value)};Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return value};Writer.prototype.escapedValue=function escapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return mustache.escape(value)};Writer.prototype.rawValue=function rawValue(token){return token[1]};mustache.name="mustache.js";mustache.version="2.1.3";mustache.tags=["{{","}}"];var defaultWriter=new Writer;mustache.clearCache=function clearCache(){return defaultWriter.clearCache()};mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function render(template,view,partials){if(typeof template!=="string"){throw new TypeError('Invalid template! Template should be a "string" '+'but "'+typeStr(template)+'" was given as the first '+"argument for mustache#render(template, view, partials)")}return defaultWriter.render(template,view,partials)};mustache.to_html=function to_html(template,view,partials,send){var result=mustache.render(template,view,partials);if(isFunction(send)){send(result)}else{return result}};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer});

$.validator.addMethod('requiredif',
function (value, element, parameters) {
    // get the target value (as a string, 
    // as that's what actual value will be)
    var targetvalue = parameters['targetvalue'];
    targetvalue = (targetvalue == null ? '' : targetvalue).toString();

    var targetvaluearray = targetvalue.split('|');

    for (var i = 0; i < targetvaluearray.length; i++) {

        // get the actual value of the target control
        // note - this probably needs to cater for more 
        // control types, e.g. radios
        var control = $("[name='" + parameters['dependentproperty'] + "']");
        var controltype = control.attr('type');
        var actualvalue;
        var valueTarget = targetvaluearray[i].toLowerCase();

        if (controltype === 'radio') {
            control = control.filter(":checked");
            actualvalue = control.val().toLowerCase();
        }
        else if (controltype === 'checkbox') {
            actualvalue = control.is(":checked");
            valueTarget = targetvaluearray[i] == "true";
        }
        else {
            actualvalue = control.val().toLowerCase();
        }

        // if the condition is true, reuse the existing 
        // required field validator functionality
        if (valueTarget == actualvalue) {
            return $.validator.methods.required.call(this, value, element, parameters);
        }
    }

    return true;
}
);
$.validator.unobtrusive.adapters.add(
    'requiredif',
    ['dependentproperty', 'targetvalue'],
    function (options) {
        options.rules['requiredif'] = {
            dependentproperty: options.params['dependentproperty'],
            targetvalue: options.params['targetvalue']
        };
        options.messages['requiredif'] = options.message;
    });
var AMOUNT_NO_DECIMALS_WITH_COMMA_SEPARATOR = "{{amount_no_decimals_with_comma_separator}}";
var AMOUNT = "{{amount}}";
var AMOUNT_NO_DECIMAL = "{{amount_no_decimals}}";

function money(money, delimiter, separator, decimalDigits, sym) {
    
    if (money == null) {
        money = 0;       
    }
    var moneyFormatString = "{0}";
    var moneyText = parseFloat(money).formatMoney(decimalDigits, separator, delimiter, sym);
   return moneyFormatString.format(moneyText);
}
function formatMoney(price, currency) {
    return money(price, currency.delimiter, currency.separator, currency.precision, currency.symbol);
}
function convertDecimalToMoneyString(money, separator, delimiter, decimalDigits, sym) {
    return money.formatMoney(decimalDigits, separator, delimiter, sym);
}

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

if (!Number.prototype.formatMoney) {
    
    Number.prototype.formatMoney = function (c, d, t,sym) {
        var n = this,
            sym = sym == undefined ? "" : sym,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        
        var u1 = (j ? i.substr(0, j) + t : "");
        var u2 = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t);
        var u3 = (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") + sym;
    };
}
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }

})(this, function() {
  var NProgress = {};

  NProgress.version = '0.1.6';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
        bar      = progress.querySelector(Settings.barSelector),
        speed    = Settings.speed,
        ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, { 
          transition: 'none', 
          opacity: 1 
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, { 
            transition: 'all ' + speed + 'ms linear', 
            opacity: 0 
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   * 
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;
    
    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() == "resolved") {
        return this;
      }
      
      if (current == 0) {
        NProgress.start();
      }
      
      initial++;
      current++;
      
      $promise.always(function() {
        current--;
        if (current == 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });
      
      return this;
    };
    
  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');
    
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent   = document.querySelector(Settings.parent),
        spinner;
    
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent')
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];
    
    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
        cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
          prop, 
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return; 

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});


$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxComplete(function () {
    NProgress.done();
});

$(document).ready(function () {
    window.onpopstate = function (event) {
        //Sapo.Utility.loadAjax(location.href, ".colRight", function () { }, { hide: false })
        //if (event && !event.state) {
        //location.reload();
        //window.location.href = location.href;
        //}
    }
    //BEGIN: Scroll Detail
    $(window).resize(function () {
        $(".fht-table-wrapper").height($(window).height() - $(".header-common-right").outerHeight() - $(".t-grid-pager-boder").outerHeight());

        $(".fht-tbody").height($("table#defaul-table").height());
        if ($(".fht-tbody").height() < 320) {
            $(".fht-tbody").height(320);
        }
    });
    //END: Scroll Detail
    initReady();

    //if (shouldRenderContactBar()) {
    //    renderContactBar();

    //    if (getCookie(SUPPORT_MINIMIZED_COOKIE_NAME) === 'true') {
    //        toggleContactBar();
    //    }
    //}
});
//BEGIN: initReady
function initReady() {
    $('input.boot-switch').bootstrapSwitch();

    //var checkPos = window.location.pathname;
    //if ((typeof (Storage) !== "undefined") && checkPos.indexOf("orders/pos") < 0) {
    //    var reload = sessionStorage.getItem('displayCol');
    //    if (reload == null || reload == '') {
    //        blockMenuLeft();
    //    }
    //    else {
    //        noneMenuLeft();
    //    }
    //}
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
            if ($.active <= 0) {
                Sapo.Modal.hide();
                if (url != null && url != "")
                    Sapo.Utility.changeUrl(url);
            }

        }
    });
  
  
    $(".number-text").keydown(function (event) {
        // Allow: backspace, delete, tab and escape
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 190 || event.keyCode == 27 ||
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
  

    //actionCrollMenu();
    //if (checkPos.indexOf("orders/pos") < 0)
    //    scrollFilterTab();
    //else {
    //    scrollTabPos();
    //}
    selectAllInPut();
}
//BEGIN: SELECT ALL INPUT
function selectAllInPut() {
    //$('.jelta-inputs').live("keydown", function (e) {
    //    if (e.which === 13) {
    //        var index = $('.jelta-inputs').index(this) + 1;
    //        $('.jelta-inputs').eq(index).focus();
    //        $('.jelta-inputs').eq(index).select();
    //        //add atribute allowing normal selecting post focus
    //        $('.jelta-inputs').eq(index).attr("data-selected-all", true);
    //    }
    //});

  
}
function getDateFormData(dt) {
    var month = (dt.getMonth() < 9 ? '0' + (dt.getMonth() + 1) : (dt.getMonth() + 1));
    var day = (dt.getDate() < 10 ? '0' + (dt.getDate()) : (dt.getDate()));
    var hour = (dt.getHours() < 10 ? '0' + (dt.getHours()) : (dt.getHours()));
    var minutes = (dt.getMinutes() < 10 ? '0' + (dt.getMinutes()) : (dt.getMinutes()));
    var seconds = (dt.getSeconds() < 10 ? '0' + (dt.getSeconds()) : (dt.getSeconds()));
    var currentDate = day + '/' + month + '/' + (dt.getFullYear());
    return currentDate;
}
// END: GETDATE
// BEGIN: Date & Time
function initializeDatetimePicker() {
  

    $('[data-rel=datepicker]').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true
    });
    $('i.glyphicon-calendar').on('click', function () {
        $(this).closest(".datepicker-input").find("input").focus();
    });
    //$('[data-rel=datepicker-now]').datepicker({
    //    format: 'dd/mm/yyyy',
    //    autoclose: true,
    //    todayHighlight: true,
    //    startDate: currentDate
    //});

    $('[data-rel=timepicker]').timepicker();
    $('[data-rel=datepicker]').datepicker().on('show', function (ev) {
        //Component này quá tù - custom display popup datepicker

        if ($(document.body)[0].scrollWidth >= $(window).width()) {
            $(".datepicker").css({ "left": $(this).offset().left - ($(document.body)[0].scrollWidth - $(window).width()) - 18 });
        }

    });

    $('[data-rel=datepicker]').datepicker().on('changeDate', function (ev) {
        if ($('#Date').length > 0) {
            var date = $('#Date').data('datepicker').date;
            var hour = $('#Time').data('timepicker').meridian == "AM" ? $('#Time').data('timepicker').hour : 24 - $('#Time').data('timepicker').hour;
            var minute = $('#Time').data('timepicker').minute;
            var cloneDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0);

            if (cloneDate <= currentDate) {
                $("input:radio[name='active'][value='true']").prop("checked", true);
            }
            else {
                $("input:radio[name='active'][value='false']").prop("checked", true);
            }
        }
    });

    $("#Time").change(function () {
        var date = $('#Date').data('datepicker').date;
        var hour = $('#Time').data('timepicker').meridian == "AM" ? $('#Time').data('timepicker').hour : 24 - $('#Time').data('timepicker').hour;
        var minute = $('#Time').data('timepicker').minute;
        var cloneDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0);

        if (cloneDate <= currentDate) {
            $("input:radio[name='active'][value='true']").prop("checked", true);
        }
        else {
            $("input:radio[name='active'][value='false']").prop("checked", true);
        }
    });
}



function initializeMultipleDateTimePicker() {
//    jQuery('#multiple_date').live("click", function () {
//        $(this).datepick({
//            multiSelect: 999, monthsToShow: 1,
//            showTrigger: '#calImg'
//        });
//        //YUI({ lang: 'vi' }).use(
//        //  'aui-datepicker',
//        //  function (Y) {
//        //      var today = new Date();
//        //      new Y.DatePicker(
//        //        {
//        //            trigger: '#multiple_date',
//        //            mask: '%d/%m/%y',
//        //            //calendar: {
//        //            //    selectionMode: 'multiple'
//        //            //},
//        //            calendar: {
//        //                maximumDate : new Date(today.getFullYear()+1,today.getMonth(),today.getDate()),
//        //                selectionMode: 'multiple'
//        //            },
//        //            popover: {
//        //                zIndex: 1,
//        //                boundingBox: '#bb',
//        //                contentBox: '#cb'
//        //            }
//        //        }
//        //      );
//        //  }
//        //);
//    });
}



//d/m/Y H:i:s
function IsValidLongDateTime(value) {
    var date = value.split(" ")[0];
    var time = value.split(" ")[1]
    var d = date.split("/")[0];
    var m = date.split("/")[1];
    var y = date.split("/")[2];
    var h = time.split(":")[0];
    var i = time.split(":")[1];
    var s = time.split(":")[2];
    if (parseInt(d) == 0 || parseInt(d) > 31 || parseInt(m) == 0 || parseInt(m) > 12) return false;
    return true;
}

//d/m/Y
function IsValidShortDateTime(value) {
    var d = value.split("/")[0];
    var m = value.split("/")[1];
    var y = value.split("/")[2];
    if (parseInt(d) == 0 || parseInt(d) > 31 || parseInt(m) == 0 || parseInt(m) > 12) return false;
    return true
}

function setPublishDate() {
    var date = $("#Date").val();
    if (date == "") {
        setPublishDateNow();
    }
    $(".show-publish-time").hide();
    $(".publish-date").show();
}

function setPublishDateNow() {
    var date = currentDate;
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var day = day < 10 ? "0" + day : day;
    var month = month < 10 ? "0" + month : month;
    $("#Date").val(day + "/" + month + "/" + year);

    var time = "" + (date.getHours > 12 ? 24 - date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + " " + (date.getHours > 12 ? 24 - "PM" : "AM")
    $('#Time').val(time);
}

function hidePublishDate() {
    $(".show-publish-time").show();
    $(".publish-date").hide();
    $('#Date').val('').datepicker('update');
}
// END: Date & Time

// BEGIN: Contact Support Bar
var SUPPORT_MINIMIZED_COOKIE_NAME = "__support_minimized__";

function toggleContactBar() {
    $('.contact-support-bar .normal').toggleClass("hide");
    $('.contact-support-bar .minimize').toggleClass("hide");

    if (!$('.contact-support-bar .minimize').hasClass("hide")) {
        setCookie(SUPPORT_MINIMIZED_COOKIE_NAME, "true", 365);
    }
    else {
        setCookie(SUPPORT_MINIMIZED_COOKIE_NAME, "", 365);
    }
}

function renderContactBar() {
    var contactSupportTemplate = '<div class="contact-support-bar"><div class="normal"><a href="http://support.Sapo.vn/open.php" target="_blank" rel="nofollow"><img src="/themes/portal/admin/images/livechat_bar.png" /></a><a class="contact-support-minimize" href="javascript:;" onclick="toggleContactBar();"><img src="/themes/portal/admin/images/icon_minimize.png" /></a></div><div class="minimize hide"><a href="javascript:;" onclick="toggleContactBar();"><img src="/themes/portal/admin/images/livechat_bar_minimize.png" /></a></div></div>';
    $('.colRight').append(contactSupportTemplate);
}

function shouldRenderContactBar() {
    if (/\/admin\/apps\/\S*/.test(window.location.pathname))
        return false;

    var ww = $(window).width();
    if (ww <= 650)
        return false;

    return true;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
// END: Contact Support Bar

function openChooseImageDialog() {
    $.ajax({
        url: '/admin/settings/files/showMediaFiles',
        success: function (data) {
            $(".cke-all-images").html(data);
        }
    });
    $.ajax({
        url: '/admin/products/images',
        success: function (data) {
            $(".cke-product-images").html(data);
        }
    });
}

function chooseImage(obj) {
    $(".image-to-choose .item").removeClass("chosen-image");
    $(".selected-media-file").find("input").val($(obj).children("img").attr("src"));
    $(obj).addClass("chosen-image");
}

function chooseProductImage(obj) {
    $(".image-to-choose .item").removeClass("chosen-image");
    $(".selected-product-image").find("input").val($(obj).children("img").attr("src"));
    $(obj).addClass("chosen-image");
}

function changeProductThumbType(obj) {
    $(".selected-thumb-type-product-image").find("input").val($(obj).val());
}

function changeThumbType(obj) {
    $(".selected-thumb-type-media-file").find("input").val($(obj).val());
}

function changeSrcByThumbType(src, thumbType) {
    src = src.replace(Sapo.routes.domain.thumb + "small/", Sapo.routes.domain.media);
    return Sapo.Utility.getThumb(src, thumbType);
}
// END: CKEditor
// BEGIN: Format text
function formatTextLength(content, length) {
    if (content.length > length) {
        content = content.substring(0, length) + "...";
    }
}
// ENN: Format text
function shouldOpenMarketingPopup() {
    return getCookie("marketing_showed") !== 'true'
}

function openMarketingPopup() {
    $.fancybox.open({
        fitToView: false,
        closeClick: false,
        openEffect: 'fade',
        closeEffect: 'fade',
        href: "#marketing-banner",
        autoSize: true,
        margin: [20, 0, 20, 0],
        overlayShow: true,
        'afterClose': function () {
            setCookie("marketing_showed", 'true', 365);
        }
    });
}

function stringTitle(dataString, lengthData) {
    return (dataString != null ? (dataString.length > lengthData ? dataString : "") : "");
}

function formatStringLength(dataString, lengthData) {
    return ((dataString != null && dataString !="")? (dataString.length > lengthData ? dataString.substring(0, lengthData) + "..." : dataString) : "---");
}
jQuery(function ($) {
    'use strict';

    var $floatBreakpoint = $('<div class="grid-float-breakpoint" style="position:absolute;top:-9999px;width:1px;height:1px;"></div>');
    var $xsVisible = $('<div class="visible-xs" style="position:absolute;top:-9999px;width:1px;height:1px;"></div>');
    var $smVisible = $('<div class="visible-sm" style="position:absolute;top:-9999px;width:1px;height:1px;"></div>');

    function openActiveTab(url) {
        if (url.match('#')) {
            $('.nav-tabs a[href=#' + url.split('#')[1] + ']').tab('show');
        }
    }

    function equalHeight(objects) {
        var max = 0;
        objects.each(function () {
            var height = $(this).height();
            max = height > max ? height : max;
        });
        objects.height(max);
    }

    $('body').append($floatBreakpoint).append($xsVisible).append($smVisible);
    $('[data-sidebar-toggle]').on('click', function () {
        if ($floatBreakpoint.is(':visible')) {
            $('body').toggleClass('sidebar-condensed');
            $('.ajax-notification').toggleClass('wide');
            if ($('body').hasClass('sidebar-condensed'))
                setCookie(SIDEBAR_CONDENSED_COOKIE_NAME, "true", 7);
            else
                setCookie(SIDEBAR_CONDENSED_COOKIE_NAME, "", 7);
        } else {
            $('body').toggleClass('sidebar-opened');
            $('.ajax-notification').toggleClass('wide');
            setCookie(SIDEBAR_CONDENSED_COOKIE_NAME, "", 7);
        }

        slide_scrollbar_init();
    });

    var SIDEBAR_CONDENSED_COOKIE_NAME = "__sidebar_condensed__"
    if (getCookie(SIDEBAR_CONDENSED_COOKIE_NAME) === 'true' && $floatBreakpoint.is(':visible')) {
        $('body').toggleClass('sidebar-condensed');
        $('.ajax-notification').toggleClass('wide');
        $(window).trigger('resize');
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    //$('.sidebar .nav').navgoco({
    //    caretHtml: false,
    //    accordion: true,
    //    onClickBefore: function () {
    //        if ($('body').hasClass('sidebar-condensed')) {
    //            var $parent = $(this).parent();
    //            // is first level menu
    //            if ($parent.parent().hasClass('nav')) {
    //                $parent.siblings().removeClass('nav-dropdown-open');

    //                if ($parent.hasClass('nav-dropdown')) {
    //                    $parent.toggleClass('nav-dropdown-open');
    //                }

    //                return false;
    //            }
    //        }
    //        return true;
    //    },
    //    onClickAfter: function () {
    //        if (!$("nav-dropdown").hasClass("open")) {
    //            var bottomOffset = $('.sidebar nav').height();
    //            $('.sidebar').stop().animate({
    //                'scrollTop': bottomOffset
    //            }, 600, 'swing');
    //        }
    //    }
    //});

    openActiveTab(document.location.toString());

    $('[data-rel="collapse"]').on('click', function () {
        var $this = $(this);
        var $panel = $this.closest('.panel');
        if ($panel.hasClass('collapsed')) {
            $this.children('.fa').removeClass('fa-plus').addClass('fa-minus');
            $panel.children('[class!="panel-heading"]').slideDown(300, function () {
                $panel.removeClass('collapsed');
            });
        } else {
            $this.children('.fa').removeClass('fa-minus').addClass('fa-plus');
            $panel.children('[class!="panel-heading"]').slideUp(300, function () {
                $panel.addClass('collapsed');
            });
        }
        return false;
    });

    $('[data-rel="reload"]').on('click', function () {
        return false;
    });

    $('[data-rel="close"]').on('click', function () {
        jQuery(this).closest('.panel').fadeOut(300);
        return false;
    });

    $('[data-toggle="tooltip"]').tooltip().on('show.bs.tooltip', function () {
        var style = $(this).data('style');
        if (style && style !== '') {
            $(this).data('bs.tooltip').tip().addClass('tooltip-' + style);
        }
    });
    $('[data-toggle="popover"]').popover().on('show.bs.popover', function () {
        var i, styles, style = $(this).data('style') || '';
        styles = style.split(' ');
        if (styles.length > 0) {
            for (i in styles) {
                styles[i] = 'popover-' + styles[i];
            }
            $(this).data('bs.popover').tip().addClass(styles.join(' '));
        }
    });

    $('[data-sync-height]').each(function () {
        equalHeight($(this).children());
    });

    $('.mail-navigation .active').on('click', function (e) {
        if ($xsVisible.is(':visible') || $smVisible.is(':visible')) {
            e.preventDefault();
            $(this).closest('.mail-navigation').toggleClass('open');

            return false;
        }
    });
    // Setup default options for Bootstrap3 WYSIHTML5
    if ($.fn.wysihtml5) {
        $.fn.wysihtml5.defaultOptions = $.extend({}, $.fn.wysihtml5.defaultOptions, {
            color: true
        });
    }
});

var _ = $.fn;
(function ($) {
    function Et(e) { return "function" == typeof e }
    function Dt(e) { V = { "boolean": !1, "function": !0, object: !0, number: !1, string: !1, undefined: !1 }; return !(!e || !V[typeof e]) }
    function d(e, t, n) {
        t || (t = 0), "undefined" == typeof n && (n = e ? e.length : 0);
        for (var i = -1, r = n - t || 0, o = Array(0 > r ? 0 : r) ; ++i < r;) o[i] = e[t + i]; return o
    }
    function lt(e) { var Si = RegExp("^" + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"); return "function" == typeof e && Si.test(e) }

    $.fn.debounce = function (e, t, n) {
        var i, r, o, a, s, u, l, c = 0, d = !1, f = !0;
        var h;
        mr = lt(mr = Date.now) && mr || function () { return (new Date).getTime() }
        if (!Et(e)) throw new Ci; if (t = Math.max(0, t) || 0, n === !0) { var p = !0; f = !1 } else Dt(n) && (p = n.leading, d = "maxWait" in n && (Math.max(t, n.maxWait) || 0), f = "trailing" in n ? n.trailing : f); var m = function () { var n = t - (mr() - a); if (0 >= n) { r && Di(r); var d = l; r = u = l = h, d && (c = mr(), o = e.apply(s, i), u || r || (i = s = null)) } else u = setTimeout(m, n) }, g = function () { u && Di(u), r = u = l = h, (f || d !== t) && (c = mr(), o = e.apply(s, i), u || r || (i = s = null)) }; return function () { if (i = arguments, a = mr(), s = this, l = f && (u || !p), d === !1) var n = p && !u; else { r || p || (c = a); var h = d - (a - c), v = 0 >= h; v ? (r && (r = Di(r)), c = a, o = e.apply(s, i)) : r || (r = Oi(g, h)) } return v && u ? u = Di(u) : u || t === d || (u = setTimeout(m, t)), n && (v = !0, o = e.apply(s, i)), !v || u || r || (i = s = null), o }
    }
    $.fn.defer = function (e) { var h; if (!Et(e)) throw new Ci; var t = d(arguments, 1); return setTimeout(function () { e.apply(h, t) }, 1) }
    $.fn.prepareTransition = function (ele) {
        return $(ele).each(function () {
            var t = $(ele); t.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",
            function () { t.removeClass("is-transitioning") }); var n = ["transition-duration", "-moz-transition-duration", "-webkit-transition-duration",
                "-o-transition-duration"], i = 0; $.each(n, function (e, n) { i || (i = parseFloat(t.css(n))) }),
            0 != i && (t.addClass("is-transitioning"), t[0].offsetWidth)
        })
    } 
})(jQuery);

//compare 2 json object
(function ($) {
    //Returns the object's class, Array, Date, RegExp, Object are of interest to us
    var getClass = function (val) {
        return Object.prototype.toString.call(val)
            .match(/^\[object\s(.*)\]$/)[1];
    };

    //Defines the type of the value, extended typeof
    var whatis = function (val) {

        if (val === undefined)
            return 'undefined';
        if (val === null)
            return 'null';

        var type = typeof val;

        if (type === 'object')
            type = getClass(val).toLowerCase();

        if (type === 'number') {
            if (val.toString().indexOf('.') > 0)
                return 'float';
            else
                return 'integer';
        }

        return type;
    };

    var compareObjects = function (a, b) {
        if (a === b)
            return true;
        for (var i in a) {
            if (b.hasOwnProperty(i)) {
                if (!equal(a[i], b[i])) return false;
            } else {
                return false;
            }
        }

        for (var i in b) {
            if (!a.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    };

    var compareArrays = function (a, b) {
        if (a === b)
            return true;
        if (a.length !== b.length)
            return false;
        for (var i = 0; i < a.length; i++) {
            if (!equal(a[i], b[i])) return false;
        };
        return true;
    };

    var _equal = {};
    _equal.array = compareArrays;
    _equal.object = compareObjects;
    _equal.date = function (a, b) {
        return a.getTime() === b.getTime();
    };
    _equal.regexp = function (a, b) {
        return a.toString() === b.toString();
    };
    //	uncoment to support function as string compare
    //	_equal.fucntion =  _equal.regexp;



    /*
     * Are two values equal, deep compare for objects and arrays.
     * @param a {any}
     * @param b {any}
     * @return {boolean} Are equal?
     */
    var equal = function (a, b) {
        if (a !== b) {
            var atype = whatis(a), btype = whatis(b);

            if (atype === btype)
                return _equal.hasOwnProperty(atype) ? _equal[atype](a, b) : a == b;

            return false;
        }

        return true;
    };

    $.fn.equal = equal;
})(jQuery);
//(function () {
//    window.Sapo || (window.Sapo = {});

//	var t = function (t, e) {
//		return function () {
//			return t.apply(e, arguments)
//		}
//	};
//	$(document).keyup(function (t) {
//		return t.keyCode === Sapo.Keycodes.ESCAPE ? (Sapo.NewModal.hide(), Sapo.Dropdown.hide()) : void 0
//	});
//	Sapo.NewModal = function () {
//	    function NewModal(el, opt) {
//			this.node = el;
//			this.options = null != opt ? opt : {};
//			this.reverseFocusRestrict = t(this.reverseFocusRestrict, this);
//			this.focusRestrict = t(this.focusRestrict, this);
//			this.onAnimationEnd = t(this.onAnimationEnd, this);
//			this.show = t(this.show, this);
//			this.isFullscreen = false;
//			this.options.autoShow && setTimeout(this.show, 0);

//			//var $container, $modalButton;
//			//$modalButton = this.$modalButton();
//			//if ($modalButton.length){
//			//	$modalButton.attr({
//			//		role: "button",
//			//		tabindex: 0
//			//	});
//			//	$modalButton.on("keydown", this.launchModal);
//			//	$container = this.$container();
//			//	if ($container.length) {
//			//		$container.length && $container.attr({
//			//			role: "dialog",
//			//			"aria-hidden": true
//			//		});
//			//	}
//			//}
//		}
//		var n, transitionEvent, backdropId, buttonClass, containerId, reverseFocusRestrictEvent, activeElement, l;


//		containerId = "sapo-modal-container", //s
//		backdropId = "sapo-modal-backdrop",  //o
//		buttonClass = "modal-button", //r
//		transitionEvent = "animationend webkitAnimationEnd", //i
//		reverseFocusRestrictEvent = "reverseFocusRestrict", //a
//		l = false, //l
//		activeElement = document.activeElement, //u
//		n = null, //n

//        NewModal.currentRequest = null;
//		NewModal.currentModal = null;
//		NewModal.container = function () {
//		    return document.getElementById(containerId)
//		};
//		NewModal.backdrop = function () {
//		    return document.getElementById(backdropId)
//		};
//		NewModal.button = function () {
//		    return document.getElementsByClassName(buttonClass)[0]
//		};
//		NewModal.prototype.$container = function () {
//			return $(this.constructor.container())
//		};
//		NewModal.prototype.$backdrop = function () {
//			return $(this.constructor.backdrop())
//		};
//		NewModal.prototype.$modalButton = function () {
//			return $(this.constructor.button())
//		};
//		NewModal.hide = function (t) {
//			var currentModal = Sapo.NewModal.currentModal;
//			if (t == null)
//				t = false;
//			if (currentModal != null)
//				currentModal.hide();
//			//if (t)
//			//	return void 0;
//			//else
//			//	return Sapo.UIModal.hide(true);

//			//return null == t && (t = !1), null != (e = Sapo.Modal.currentModal) && e.hide(), t ? void 0 : Sapo.UIModal.hide(!0)
//		};
//		NewModal.onClickHide = function (t) {
//			t.preventDefault();
//			return Sapo.NewModal.hide();
//		};
//		NewModal.isActive = function (t) {
//			var isActive;
//			if (t == null)
//				t = false;

//			if (Sapo.NewModal.currentModal == null)
//				isActive = false;
//			else
//				isActive = true;

//			//if (t == false && isActive == false)
//			//	isActive = Sapo.UIModal.isVisible(true);
//			return isActive;

//			//return null == t && (t = !1), e = null != Sapo.Modal.currentModal, t || e || (e = Sapo.UIModal.isVisible(true)), e
//		};
//		NewModal.prototype.bindingsContext = function () {
//			return Bindings.childContext(this.node)
//		};
//		NewModal.prototype.show = function (options) {
//			var $backdrop, $closeModals, $container, $headerTag, c, url, headerTagId;
//			null == options && (options = {});
//			options.context || (options.context = this.bindingsContext());
//			activeElement = document.activeElement;
//			l = true;
//			$backdrop = this.$backdrop();
//			$container = this.$container();

//			if ($container.length) {
//				if (options.keepOpen) {
//					//Sapo.UIModal.hide(true);
//				} else {
//					Sapo.NewModal.hide()
//				}
//				//t.keepOpen ? Sapo.UIModal.hide(!0) : Sapo.NewModal.hide();
//				Sapo.NewModal.currentModal = this;
//				if (null == options.content && (url = this.node.href)) {
//					void this.fetchHTML(url, options);
//				} else {
//					if (this.options.noscroll)
//						$container.addClass("no-scroll");
//					if (this.options.move)
//						$container.append(this.node.children);
//					else {
//						$container.html(options.content || this.node.innerHTML);
//						Bindings.bind($container[0], options.context).refreshImmediately();
//					}
//					this._rebindValidation();
//					//$container.one(transitionEvent, this.onAnimationEnd);
//					//setTimeout(function () {
//					//    return $container.off(transitionEvent, this.onAnimationEnd)
//					//}, 1e3);

//					//$container.show();
//					$container.modal("show");

//					//$container.keepOpen || $container.addClass("modal-animate");
//					this.setSize(this.options.size);
//					this.setHeight(this.options.height);
//					$container.on("click", ".close-modal, .modal-close-wrapper", this.constructor.onClickHide);
//					$backdrop.addClass("visible");
//				    //$("#wrapper").addClass("hide-when-printing");


//					"function" == typeof options.onRender && options.onRender();
//					//$headerTag = $container.find("h1, h2, h3, h4, h5, h6").first();
//					//headerTagId = $headerTag.attr("id") || "ModalTitle";
//					//$headerTag.attr("id", headerTagId);
//					//$container.attr({
//					//	"aria-hidden": false,
//					//	"aria-labelledby": headerTagId,
//					//	tabindex: -1
//					//});
//					$container.focus();
//					$container.on("keydown." + reverseFocusRestrictEvent, this.reverseFocusRestrict);
//					$backdrop.attr("tabindex", 0);
//					////c = Sapo.Focusable.findAll($container[0]);
//					////n = $(c[0]);
//					$backdrop.on("keydown", this.focusRestrict);
//					$closeModals = $container.find("[class=close-modal],[class=modal-close-wrapper]");
//					$closeModals.attr({
//						role: "button",
//						"aria-label": "Close dialog"
//					});
//					$closeModals.on("keydown", function (event) {
//						//if (event.which === Sapo.Keycodes.ENTER || event.which === Sapo.Keycodes.SPACE) {
//							event.preventDefault();
//							Sapo.NewModal.hide();
//						//}
//					});
//				}
//			} else {
//				return void 0;
//			}
//		};
//		NewModal.prototype.hide = function (t) {
//			var $backdrop, $container;
//			null == t && (t = {});
//			if (this.isShown()) {
//				$backdrop = this.$backdrop();
//				$container = this.$container();
//				if (NewModal.currentRequest != null)
//				    NewModal.currentRequest.abort();
//			    //null != (currRequest = this.request) && currRequest.abort();
//				$container.modal("hide");
//				this.isFullscreen = false;
//				//if (t.trigger !== false)
//				//	$container.trigger("modal:close");

//				//t.trigger !== !1 && $container.trigger("modal:close");
//				//if (this.options.noscroll)
//				//	$container.addClass("no-scroll");

//				//this.options.noscroll && $container.addClass("no-scroll");
//				if (this.options.move)
//					$(this.node).append($container.children());
//				else
//					$container[0] && Bindings.unbind($container[0]);
//				//this.options.move ? $(this.node).append($container.children()) : $container[0] && Bindings.unbind($container[0]);
//				$container.removeClass(function (t, e) {
//					return (e.match(/\b\S+-modal/g) || []).join(" ");
//				});
//				if ($container.is(":visible")) {
//					$container.attr("aria-hidden", true);
//					l = false;
//					if (activeElement != null)
//					    activeElement.focus();
//				}
//				//$container.is(":visible") && ($container.attr("aria-hidden", !0), l = !1, null != u && u.focus());
//				$container.off("keydown." + reverseFocusRestrictEvent);
//				$container.hide().empty().off();
//				$backdrop.removeClass("visible").off();
//				$backdrop.attr("tabindex", -1);
//				//$("#wrapper").removeClass("hide-when-printing");
//				Sapo.NewModal.currentModal = null;

//				//if (this.options.move)
//				//	return $(this.node).trigger("modal:closed");
//			}
//			return void 0;
//		};
//		NewModal.prototype.fetchHTML = function (url, options) {
//			null == options && (options = {});
//			Sapo.Loading.start();
//			if (NewModal.currentRequest != null)
//			    NewModal.currentRequest.abort();
//			NewModal.currentRequest = $.ajax({
//				dataType: "html",
//				url: url,
//				data: options.data
//			});
//			NewModal.currentRequest.done(function (that) {
//			    return function (result) {
//				    //if (NewModal.currentRequest.getResponseHeader("X-Sapo-Login-Required")) {
//					//	var i = window.location.pathname.split("/admin/")[1];
//					//	window.location.replace(Sapo.routes.auth_login({
//					//		redirect: i
//					//	}).html)
//					//} else {
//						that.show({
//							context: options.context,
//							content: "<div>" + result + "</div>",
//							onRender: options.onRender,
//							keepOpen: options.keepOpen || !1
//						})
//					//}
//				}
//			}(this));
//			NewModal.currentRequest.fail(function (that) {
//			    return function (result) {
//			        if (result.status == 403)
//			        {
//			            NProgress.done();

//			            Sapo.Utility.handleForbiddenRequest(false); return;
//			        }
			        
//			    }
//			}(this));
//			NewModal.currentRequest.always(function (that) {
//				return function () {
//				    NewModal.currentRequest = null;
//					Sapo.Loading.stop();
//				}
//			}(this));
//		};
//		NewModal.prototype.isShown = function () {
//			return Sapo.NewModal.currentModal === this
//		};
//		NewModal.prototype.setSize = function (size) {
//			if (this.isShown() && size && size.match(/^\b\S+$/)) {
//				return this.$container().addClass(size + "-modal");
//			}
//			return void 0;
//			//return this.isShown() && t && t.match(/^\b\S+$/) ? this.$container().addClass(t + "-modal") : void 0
//		};
//		NewModal.prototype.setHeight = function (t) {
//			if (t == null)
//				t = 300;
//			if (this.isShown()) {
//				t = Math.min(700, Math.max(100, t));
//				return this.$container().find(".modal-iframe").css("height", t);
//			}
//			return void 0;
//			//return null == t && (t = 300), this.isShown() && (t = Math.min(700, Math.max(100, t))) ? this.$container().find(".modal-iframe").css("height", t) : void 0
//		};
//		NewModal.prototype.toggleFullscreen = function () {
//			if (this.isShown()) {
//				this.$container().toggleClass("real-fullscreen-modal", !this.isFullscreen);
//				return this.isFullscreen = !this.isFullscreen;
//			}

//			return void 0;
//			// return this.isShown() ? (this.$container().toggleClass("real-fullscreen-modal", !this.isFullscreen), this.isFullscreen = !this.isFullscreen) : void 0
//		};

//		NewModal.prototype.onClose = function (callback) {
//			if (this.isShown())
//				return this.$container().one("modal:close", callback);
//			return void 0;
//			//return this.isShown() ? this.$container().one("modal:close", t) : void 0
//		};

//		//NewModal.prototype.onAnimationEnd = function () {
//		//	return this.$container().removeClass("modal-animate")
//		//};

//		NewModal.prototype.launchModal = function (t) {
//			var e;
//			return l || (e = t.which) !== Sapo.Keycodes.ENTER && e !== Sapo.Keycodes.SPACE ? void 0 : (t.preventDefault(), t.target.click())
//		};

//		NewModal.prototype.focusRestrict = function (event) {
//			//if (l && event.which === Sapo.Keycodes.TAB) {
//			//	event.stopPropagation();
//			//	return this.$container().focus();
//			//}
//			return void 0;
//			//return l && t.which === Sapo.Keycodes.TAB ? (t.stopPropagation(), this.$container().focus()) : void 0
//		};

//		NewModal.prototype.reverseFocusRestrict = function (event) {
//			//if (event.which === Sapo.Keycodes.SHIFT ? event.stopPropagation() : l && event.shiftKey && n.is(":focus")) {
//			//	event.stopPropagation();
//			//	return this.$backdrop().focus();
//			//}
//			return void (0);
//			//return t.which === Sapo.Keycodes.SHIFT ? t.stopPropagation() : l && t.shiftKey && n.is(":focus") ? (t.stopPropagation(), this.$backdrop().focus()) : void 0
//		};

//		NewModal.prototype._rebindValidation = function () {
//		    var $form = this.$container().find("form");
//		    if ($form.length != 0) {
//		        $form.data("validator", null);
//		        $.validator.unobtrusive.parse(document);
//		        if ($form.data("unobtrusiveValidation")) {
//		            $form.validate($form.data("unobtrusiveValidation").options);
//		        }
//		    }
//		}

//		return NewModal;
//	}();

//	//$(document).on("ready page:load", function () {
//	//    if (Sapo.NewModal.container() && Sapo.NewModal.currentModal && !Sapo.NewModal.container().innerHTML.trim().length)
//	//        Sapo.NewModal.hide();
//	//});
//}).call(this);
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
        $.validator.unobtrusive.adapters.add(validationName, ['dependentproperty', 'targetvalue', 'rule', 'ruleparam'], function (options) {
            var rp = options.params['ruleparam'];
            options.rules[validationName] = {
                dependentproperty: options.params['dependentproperty'],
                targetvalue: options.params['targetvalue'],
                rule: options.params['rule']
            };
            if (rp) {
                options.rules[validationName].ruleparam = rp.charAt(0) == '[' ? eval(rp) : rp;
            }
            options.messages[validationName] = options.message;
        });
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
                        g = g.toLowerCase().split(":"); var l = g.length, b = 8; "" === g[0] && "" === g[1] && "" === g[2] ? (g.shift(), g.shift()) : "" === g[0] && "" === g[1] ? g.shift() : "" === g[l - 1] && "" === g[l - 2] && g.pop(); l = g.length; -1 !== g[l - 1].indexOf(".") && (b = 7); var k; for (k = 0; k < l && "" !== g[k]; k++); if (k < b) for (g.splice(k, 1, "0000"); g.length < b;) g.splice(k, 0, "0000"); for (k = 0; k < b; k++) {
                            for (var l =
                                g[k].split(""), f = 0; 3 > f; f++) if ("0" === l[0] && 1 < l.length) l.splice(0, 1); else break; g[k] = l.join("")
                        } var l = -1, n = f = 0, h = -1, u = !1; for (k = 0; k < b; k++) u ? "0" === g[k] ? n += 1 : (u = !1, n > f && (l = h, f = n)) : "0" === g[k] && (u = !0, h = k, n = 1); n > f && (l = h, f = n); 1 < f && g.splice(l, f, ""); l = g.length; b = ""; "" === g[0] && (b = ":"); for (k = 0; k < l; k++) { b += g[k]; if (k === l - 1) break; b += ":" } "" === g[l - 1] && (b += ":"); return b
                    }, noConflict: function () { f.IPv6 === this && (f.IPv6 = n); return this }
                }
            });
            (function (f) {
                function n(b) { throw RangeError(v[b]); } function g(b, e) { for (var h = b.length; h--;) b[h] = e(b[h]); return b } function l(b, h) { return g(b.split(e), h).join(".") } function b(b) { for (var e = [], h = 0, g = b.length, a, c; h < g;) a = b.charCodeAt(h++), 55296 <= a && 56319 >= a && h < g ? (c = b.charCodeAt(h++), 56320 == (c & 64512) ? e.push(((a & 1023) << 10) + (c & 1023) + 65536) : (e.push(a), h--)) : e.push(a); return e } function k(b) { return g(b, function (b) { var e = ""; 65535 < b && (b -= 65536, e += x(b >>> 10 & 1023 | 55296), b = 56320 | b & 1023); return e += x(b) }).join("") } function A(b,
                    e) { return b + 22 + 75 * (26 > b) - ((0 != e) << 5) } function w(b, e, h) { var g = 0; b = h ? q(b / 700) : b >> 1; for (b += q(b / e); 455 < b; g += 36) b = q(b / 35); return q(g + 36 * b / (b + 38)) } function h(b) {
                        var e = [], h = b.length, g, a = 0, c = 128, d = 72, m, z, y, f, l; m = b.lastIndexOf("-"); 0 > m && (m = 0); for (z = 0; z < m; ++z) 128 <= b.charCodeAt(z) && n("not-basic"), e.push(b.charCodeAt(z)); for (m = 0 < m ? m + 1 : 0; m < h;) {
                            z = a; g = 1; for (y = 36; ; y += 36) {
                                m >= h && n("invalid-input"); f = b.charCodeAt(m++); f = 10 > f - 48 ? f - 22 : 26 > f - 65 ? f - 65 : 26 > f - 97 ? f - 97 : 36; (36 <= f || f > q((2147483647 - a) / g)) && n("overflow"); a += f * g; l =
                                    y <= d ? 1 : y >= d + 26 ? 26 : y - d; if (f < l) break; f = 36 - l; g > q(2147483647 / f) && n("overflow"); g *= f
                            } g = e.length + 1; d = w(a - z, g, 0 == z); q(a / g) > 2147483647 - c && n("overflow"); c += q(a / g); a %= g; e.splice(a++, 0, c)
                        } return k(e)
                    } function u(e) {
                        var g, h, f, a, c, d, m, z, y, l = [], u, k, p; e = b(e); u = e.length; g = 128; h = 0; c = 72; for (d = 0; d < u; ++d) y = e[d], 128 > y && l.push(x(y)); for ((f = a = l.length) && l.push("-"); f < u;) {
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
                        1), e-- , b--; return a
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
                            } c.hostname && "/" !== a.substring(d).charAt(0) && (d++ , a = "/" + a); return a.substring(d) || "/"
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
                Bindings.refreshImmediately();
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
                Bindings.refresh();
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




var Hashtable=(function(){var p="function";var n=(typeof Array.prototype.splice==p)?function(s,r){s.splice(r,1)}:function(u,t){var s,v,r;if(t===u.length-1){u.length=t}else{s=u.slice(t+1);u.length=t;for(v=0,r=s.length;v<r;++v){u[t+v]=s[v]}}};function a(t){var r;if(typeof t=="string"){return t}else{if(typeof t.hashCode==p){r=t.hashCode();return(typeof r=="string")?r:a(r)}else{if(typeof t.toString==p){return t.toString()}else{try{return String(t)}catch(s){return Object.prototype.toString.call(t)}}}}}function g(r,s){return r.equals(s)}function e(r,s){return(typeof s.equals==p)?s.equals(r):(r===s)}function c(r){return function(s){if(s===null){throw new Error("null is not a valid "+r)}else{if(typeof s=="undefined"){throw new Error(r+" must not be undefined")}}}}var q=c("key"),l=c("value");function d(u,s,t,r){this[0]=u;this.entries=[];this.addEntry(s,t);if(r!==null){this.getEqualityFunction=function(){return r}}}var h=0,j=1,f=2;function o(r){return function(t){var s=this.entries.length,v,u=this.getEqualityFunction(t);while(s--){v=this.entries[s];if(u(t,v[0])){switch(r){case h:return true;case j:return v;case f:return[s,v[1]]}}}return false}}function k(r){return function(u){var v=u.length;for(var t=0,s=this.entries.length;t<s;++t){u[v+t]=this.entries[t][r]}}}d.prototype={getEqualityFunction:function(r){return(typeof r.equals==p)?g:e},getEntryForKey:o(j),getEntryAndIndexForKey:o(f),removeEntryForKey:function(s){var r=this.getEntryAndIndexForKey(s);if(r){n(this.entries,r[0]);return r[1]}return null},addEntry:function(r,s){this.entries[this.entries.length]=[r,s]},keys:k(0),values:k(1),getEntries:function(s){var u=s.length;for(var t=0,r=this.entries.length;t<r;++t){s[u+t]=this.entries[t].slice(0)}},containsKey:o(h),containsValue:function(s){var r=this.entries.length;while(r--){if(s===this.entries[r][1]){return true}}return false}};function m(s,t){var r=s.length,u;while(r--){u=s[r];if(t===u[0]){return r}}return null}function i(r,s){var t=r[s];return(t&&(t instanceof d))?t:null}function b(t,r){var w=this;var v=[];var u={};var x=(typeof t==p)?t:a;var s=(typeof r==p)?r:null;this.put=function(B,C){q(B);l(C);var D=x(B),E,A,z=null;E=i(u,D);if(E){A=E.getEntryForKey(B);if(A){z=A[1];A[1]=C}else{E.addEntry(B,C)}}else{E=new d(D,B,C,s);v[v.length]=E;u[D]=E}return z};this.get=function(A){q(A);var B=x(A);var C=i(u,B);if(C){var z=C.getEntryForKey(A);if(z){return z[1]}}return null};this.containsKey=function(A){q(A);var z=x(A);var B=i(u,z);return B?B.containsKey(A):false};this.containsValue=function(A){l(A);var z=v.length;while(z--){if(v[z].containsValue(A)){return true}}return false};this.clear=function(){v.length=0;u={}};this.isEmpty=function(){return !v.length};var y=function(z){return function(){var A=[],B=v.length;while(B--){v[B][z](A)}return A}};this.keys=y("keys");this.values=y("values");this.entries=y("getEntries");this.remove=function(B){q(B);var C=x(B),z,A=null;var D=i(u,C);if(D){A=D.removeEntryForKey(B);if(A!==null){if(!D.entries.length){z=m(v,C);n(v,z);delete u[C]}}}return A};this.size=function(){var A=0,z=v.length;while(z--){A+=v[z].entries.length}return A};this.each=function(C){var z=w.entries(),A=z.length,B;while(A--){B=z[A];C(B[0],B[1])}};this.putAll=function(H,C){var B=H.entries();var E,F,D,z,A=B.length;var G=(typeof C==p);while(A--){E=B[A];F=E[0];D=E[1];if(G&&(z=w.get(F))){D=C(F,z,D)}w.put(F,D)}};this.clone=function(){var z=new b(t,r);z.putAll(w);return z}}return b})();
(function(k){var a=new Hashtable();var f=["ae","au","ca","cn","eg","gb","hk","il","in","jp","sk","th","tw","us"];var b=["at","br","de","dk","es","gr","it","nl","pt","tr","vn"];var i=["cz","fi","fr","ru","se","pl"];var d=["ch"];var g=[[".",","],[",","."],[","," "],[".","'"]];var c=[f,b,i,d];function j(n,l,m){this.dec=n;this.group=l;this.neg=m}function h(){for(var l=0;l<c.length;l++){localeGroup=c[l];for(var m=0;m<localeGroup.length;m++){a.put(localeGroup[m],l)}}}function e(l,r){if(a.size()==0){h()}var q=".";var o=",";var p="-";if(r==false){if(l.indexOf("_")!=-1){l=l.split("_")[1].toLowerCase()}else{if(l.indexOf("-")!=-1){l=l.split("-")[1].toLowerCase()}}}var n=a.get(l);if(n){var m=g[n];if(m){q=m[0];o=m[1]}}return new j(q,o,p)}k.fn.formatNumber=function(l,m,n){return this.each(function(){if(m==null){m=true}if(n==null){n=true}var p;if(k(this).is(":input")){p=new String(k(this).val())}else{p=new String(k(this).text())}var o=k.formatNumber(p,l);if(m){if(k(this).is(":input")){k(this).val(o)}else{k(this).text(o)}}if(n){return o}})};k.formatNumber=function(q,w){var w=k.extend({},k.fn.formatNumber.defaults,w);var l=e(w.locale.toLowerCase(),w.isFullLocale);var n=l.dec;var u=l.group;var o=l.neg;var m="0#-,.";var t="";var s=false;for(var r=0;r<w.format.length;r++){if(m.indexOf(w.format.charAt(r))==-1){t=t+w.format.charAt(r)}else{if(r==0&&w.format.charAt(r)=="-"){s=true;continue}else{break}}}var v="";for(var r=w.format.length-1;r>=0;r--){if(m.indexOf(w.format.charAt(r))==-1){v=w.format.charAt(r)+v}else{break}}w.format=w.format.substring(t.length);w.format=w.format.substring(0,w.format.length-v.length);var p=new Number(q);return k._formatNumber(p,w,v,t,s)};k._formatNumber=function(m,q,n,I,t){var q=k.extend({},k.fn.formatNumber.defaults,q);var G=e(q.locale.toLowerCase(),q.isFullLocale);var F=G.dec;var w=G.group;var l=G.neg;var z=false;if(isNaN(m)){if(q.nanForceZero==true){m=0;z=true}else{return null}}if(n=="%"){m=m*100}var B="";if(q.format.indexOf(".")>-1){var H=F;var u=q.format.substring(q.format.lastIndexOf(".")+1);if(q.round==true){m=new Number(m.toFixed(u.length))}else{var M=m.toString();M=M.substring(0,M.lastIndexOf(".")+u.length+1);m=new Number(M)}var A=m%1;var C=new String(A.toFixed(u.length));C=C.substring(C.lastIndexOf(".")+1);for(var J=0;J<u.length;J++){if(u.charAt(J)=="#"&&C.charAt(J)!="0"){H+=C.charAt(J);continue}else{if(u.charAt(J)=="#"&&C.charAt(J)=="0"){var r=C.substring(J);if(r.match("[1-9]")){H+=C.charAt(J);continue}else{break}}else{if(u.charAt(J)=="0"){H+=C.charAt(J)}}}}B+=H}else{m=Math.round(m)}var v=Math.floor(m);if(m<0){v=Math.ceil(m)}var E="";if(q.format.indexOf(".")==-1){E=q.format}else{E=q.format.substring(0,q.format.indexOf("."))}var L="";if(!(v==0&&E.substr(E.length-1)=="#")||z){var x=new String(Math.abs(v));var p=9999;if(E.lastIndexOf(",")!=-1){p=E.length-E.lastIndexOf(",")-1}var o=0;for(var J=x.length-1;J>-1;J--){L=x.charAt(J)+L;o++;if(o==p&&J!=0){L=w+L;o=0}}if(E.length>L.length){var K=E.indexOf("0");if(K!=-1){var D=E.length-K;var s=E.length-L.length-1;while(L.length<D){var y=E.charAt(s);if(y==","){y=w}L=y+L;s--}}}}if(!L&&E.indexOf("0",E.length-1)!==-1){L="0"}B=L+B;if(m<0&&t&&I.length>0){I=l+I}else{if(m<0){B=l+B}}if(!q.decimalSeparatorAlwaysShown){if(B.lastIndexOf(F)==B.length-1){B=B.substring(0,B.length-1)}}B=I+B+n;return B};k.fn.parseNumber=function(l,m,o){if(m==null){m=true}if(o==null){o=true}var p;if(k(this).is(":input")){p=new String(k(this).val())}else{p=new String(k(this).text())}var n=k.parseNumber(p,l);if(n){if(m){if(k(this).is(":input")){k(this).val(n.toString())}else{k(this).text(n.toString())}}if(o){return n}}};k.parseNumber=function(s,x){var x=k.extend({},k.fn.parseNumber.defaults,x);var m=e(x.locale.toLowerCase(),x.isFullLocale);var p=m.dec;var v=m.group;var q=m.neg;var l="1234567890.-";while(s.indexOf(v)>-1){s=s.replace(v,"")}s=s.replace(p,".").replace(q,"-");var w="";var o=false;if(s.charAt(s.length-1)=="%"||x.isPercentage==true){o=true}for(var t=0;t<s.length;t++){if(l.indexOf(s.charAt(t))>-1){w=w+s.charAt(t)}}var r=new Number(w);if(o){r=r/100;var u=w.indexOf(".");if(u!=-1){var n=w.length-u-1;r=r.toFixed(n+2)}else{r=r.toFixed(w.length-1)}}return r};k.fn.parseNumber.defaults={locale:"us",decimalSeparatorAlwaysShown:false,isPercentage:false,isFullLocale:false};k.fn.formatNumber.defaults={format:"#,###.00",locale:"us",decimalSeparatorAlwaysShown:false,nanForceZero:true,round:true,isFullLocale:false};Number.prototype.toFixed=function(l){return k._roundNumber(this,l)};k._roundNumber=function(n,m){var l=Math.pow(10,m||0);var o=String(Math.round(n*l)/l);if(m>0){var p=o.indexOf(".");if(p==-1){o+=".";p=0}else{p=o.length-(p+1)}while(p<m){o+="0";p++}}return o}})(jQuery);
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);
/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 * 
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 *
 * Version: 1.3.1 (05/03/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

	var tmp, loading, overlay, wrap, outer, inner, close, nav_left, nav_right,

		selectedIndex = 0, selectedOpts = {}, selectedArray = [], currentIndex = 0, currentOpts = {}, currentArray = [],

		ajaxLoader = null, imgPreloader = new Image(), imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, swfRegExp = /[^\.]\.(swf)\s*$/i,

		loadingTimer, loadingFrame = 1,

		start_pos, final_pos, busy = false, shadow = 20, fx = $.extend($('<div/>')[0], { prop: 0 }), titleh = 0, 

		isIE6 = !$.support.opacity && !window.XMLHttpRequest,

		/*
		 * Private methods 
		 */

		fancybox_abort = function() {
			loading.hide();

			imgPreloader.onerror = imgPreloader.onload = null;

			if (ajaxLoader) {
				ajaxLoader.abort();
			}

			tmp.empty();
		},

		fancybox_error = function() {
			$.fancybox('<p id="fancybox_error">The requested content cannot be loaded.<br />Please try again later.</p>', {
				'scrolling'		: 'no',
				'padding'		: 20,
				'transitionIn'	: 'none',
				'transitionOut'	: 'none'
			});
		},

		fancybox_get_viewport = function() {
			return [ $(window).width(), $(window).height(), $(document).scrollLeft(), $(document).scrollTop() ];
		},

		fancybox_get_zoom_to = function () {
			var view	= fancybox_get_viewport(),
				to		= {},

				margin = currentOpts.margin,
				resize = currentOpts.autoScale,

				horizontal_space	= (shadow + margin) * 2,
				vertical_space		= (shadow + margin) * 2,
				double_padding		= (currentOpts.padding * 2),
				
				ratio;

			if (currentOpts.width.toString().indexOf('%') > -1) {
				to.width = ((view[0] * parseFloat(currentOpts.width)) / 100) - (shadow * 2) ;
				resize = false;

			} else {
				to.width = currentOpts.width + double_padding;
			}

			if (currentOpts.height.toString().indexOf('%') > -1) {
				to.height = ((view[1] * parseFloat(currentOpts.height)) / 100) - (shadow * 2);
				resize = false;

			} else {
				to.height = currentOpts.height + double_padding;
			}

			if (resize && (to.width > (view[0] - horizontal_space) || to.height > (view[1] - vertical_space))) {
				if (selectedOpts.type == 'image' || selectedOpts.type == 'swf') {
					horizontal_space	+= double_padding;
					vertical_space		+= double_padding;

					ratio = Math.min(Math.min( view[0] - horizontal_space, currentOpts.width) / currentOpts.width, Math.min( view[1] - vertical_space, currentOpts.height) / currentOpts.height);

					to.width	= Math.round(ratio * (to.width	- double_padding)) + double_padding;
					to.height	= Math.round(ratio * (to.height	- double_padding)) + double_padding;

				} else {
					to.width	= Math.min(to.width,	(view[0] - horizontal_space));
					to.height	= Math.min(to.height,	(view[1] - vertical_space));
				}
			}

			to.top	= view[3] + ((view[1] - (to.height	+ (shadow * 2 ))) * 0.5);
			to.left	= view[2] + ((view[0] - (to.width	+ (shadow * 2 ))) * 0.5);

			if (currentOpts.autoScale === false) {
				to.top	= Math.max(view[3] + margin, to.top);
				to.left	= Math.max(view[2] + margin, to.left);
			}

			return to;
		},

		fancybox_format_title = function(title) {
			if (title && title.length) {
				switch (currentOpts.titlePosition) {
					case 'inside':
						return title;
					case 'over':
						return '<span id="fancybox-title-over">' + title + '</span>';
					default:
						return '<span id="fancybox-title-wrap"><span id="fancybox-title-left"></span><span id="fancybox-title-main">' + title + '</span><span id="fancybox-title-right"></span></span>';
				}
			}

			return false;
		},

		fancybox_process_title = function() {
			var title	= currentOpts.title,
				width	= final_pos.width - (currentOpts.padding * 2),
				titlec	= 'fancybox-title-' + currentOpts.titlePosition;
				
			$('#fancybox-title').remove();

			titleh = 0;

			if (currentOpts.titleShow === false) {
				return;
			}

			title = $.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(title, currentArray, currentIndex, currentOpts) : fancybox_format_title(title);

			if (!title || title === '') {
				return;
			}

			$('<div id="fancybox-title" class="' + titlec + '" />').css({
				'width'			: width,
				'paddingLeft'	: currentOpts.padding,
				'paddingRight'	: currentOpts.padding
			}).html(title).appendTo('body');

			switch (currentOpts.titlePosition) {
				case 'inside':
					titleh = $("#fancybox-title").outerHeight(true) - currentOpts.padding;
					final_pos.height += titleh;
				break;

				case 'over':
					$('#fancybox-title').css('bottom', currentOpts.padding);
				break;

				default:
					$('#fancybox-title').css('bottom', $("#fancybox-title").outerHeight(true) * -1);
				break;
			}

			$('#fancybox-title').appendTo( outer ).hide();
		},

		fancybox_set_navigation = function() {
			$(document).unbind('keydown.fb').bind('keydown.fb', function(e) {
				if (e.keyCode == 27 && currentOpts.enableEscapeButton) {
					e.preventDefault();
					$.fancybox.close();

				} else if (e.keyCode == 37) {
					e.preventDefault();
					$.fancybox.prev();

				} else if (e.keyCode == 39) {
					e.preventDefault();
					$.fancybox.next();
				}
			});

			if ($.fn.mousewheel) {
				wrap.unbind('mousewheel.fb');

				if (currentArray.length > 1) {
					wrap.bind('mousewheel.fb', function(e, delta) {
						e.preventDefault();

						if (busy || delta === 0) {
							return;
						}

						if (delta > 0) {
							$.fancybox.prev();
						} else {
							$.fancybox.next();
						}
					});
				}
			}

			if (!currentOpts.showNavArrows) { return; }

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex !== 0) {
				nav_left.show();
			}

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex != (currentArray.length -1)) {
				nav_right.show();
			}
		},

		fancybox_preload_images = function() {
			var href, 
				objNext;
				
			if ((currentArray.length -1) > currentIndex) {
				href = currentArray[ currentIndex + 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}

			if (currentIndex > 0) {
				href = currentArray[ currentIndex - 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}
		},

		_finish = function () {
			inner.css('overflow', (currentOpts.scrolling == 'auto' ? (currentOpts.type == 'image' || currentOpts.type == 'iframe' || currentOpts.type == 'swf' ? 'hidden' : 'auto') : (currentOpts.scrolling == 'yes' ? 'auto' : 'visible')));

			if (!$.support.opacity) {
				inner.get(0).style.removeAttribute('filter');
				wrap.get(0).style.removeAttribute('filter');
			}

			$('#fancybox-title').show();

			if (currentOpts.hideOnContentClick)	{
				inner.one('click', $.fancybox.close);
			}
			if (currentOpts.hideOnOverlayClick)	{
				overlay.one('click', $.fancybox.close);
			}

			if (currentOpts.showCloseButton) {
				close.show();
			}

			fancybox_set_navigation();

			$(window).bind("resize.fb", $.fancybox.center);

			if (currentOpts.centerOnScroll) {
				$(window).bind("scroll.fb", $.fancybox.center);
			} else {
				$(window).unbind("scroll.fb");
			}

			if ($.isFunction(currentOpts.onComplete)) {
				currentOpts.onComplete(currentArray, currentIndex, currentOpts);
			}

			busy = false;

			fancybox_preload_images();
		},

		fancybox_draw = function(pos) {
			var width	= Math.round(start_pos.width	+ (final_pos.width	- start_pos.width)	* pos),
				height	= Math.round(start_pos.height	+ (final_pos.height	- start_pos.height)	* pos),

				top		= Math.round(start_pos.top	+ (final_pos.top	- start_pos.top)	* pos),
				left	= Math.round(start_pos.left	+ (final_pos.left	- start_pos.left)	* pos);

			wrap.css({
				'width'		: width		+ 'px',
				'height'	: height	+ 'px',
				'top'		: top		+ 'px',
				'left'		: left		+ 'px'
			});

			width	= Math.max(width - currentOpts.padding * 2, 0);
			height	= Math.max(height - (currentOpts.padding * 2 + (titleh * pos)), 0);

			inner.css({
				'width'		: width		+ 'px',
				'height'	: height	+ 'px'
			});

			if (typeof final_pos.opacity !== 'undefined') {
				wrap.css('opacity', (pos < 0.5 ? 0.5 : pos));
			}
		},

		fancybox_get_obj_pos = function(obj) {
			var pos		= obj.offset();

			pos.top		+= parseFloat( obj.css('paddingTop') )	|| 0;
			pos.left	+= parseFloat( obj.css('paddingLeft') )	|| 0;

			pos.top		+= parseFloat( obj.css('border-top-width') )	|| 0;
			pos.left	+= parseFloat( obj.css('border-left-width') )	|| 0;

			pos.width	= obj.width();
			pos.height	= obj.height();

			return pos;
		},

		fancybox_get_zoom_from = function() {
			var orig = selectedOpts.orig ? $(selectedOpts.orig) : false,
				from = {},
				pos,
				view;

			if (orig && orig.length) {
				pos = fancybox_get_obj_pos(orig);

				from = {
					width	: (pos.width	+ (currentOpts.padding * 2)),
					height	: (pos.height	+ (currentOpts.padding * 2)),
					top		: (pos.top		- currentOpts.padding - shadow),
					left	: (pos.left		- currentOpts.padding - shadow)
				};
				
			} else {
				view = fancybox_get_viewport();

				from = {
					width	: 1,
					height	: 1,
					top		: view[3] + view[1] * 0.5,
					left	: view[2] + view[0] * 0.5
				};
			}

			return from;
		},

		fancybox_show = function() {
			loading.hide();

			if (wrap.is(":visible") && $.isFunction(currentOpts.onCleanup)) {
				if (currentOpts.onCleanup(currentArray, currentIndex, currentOpts) === false) {
					$.event.trigger('fancybox-cancel');

					busy = false;
					return;
				}
			}

			currentArray	= selectedArray;
			currentIndex	= selectedIndex;
			currentOpts		= selectedOpts;

			inner.get(0).scrollTop	= 0;
			inner.get(0).scrollLeft	= 0;

			if (currentOpts.overlayShow) {
				if (isIE6) {
					$('select:not(#fancybox-tmp select)').filter(function() {
						return this.style.visibility !== 'hidden';
					}).css({'visibility':'hidden'}).one('fancybox-cleanup', function() {
						this.style.visibility = 'inherit';
					});
				}

				overlay.css({
					'background-color'	: currentOpts.overlayColor,
					'opacity'			: currentOpts.overlayOpacity
				}).unbind().show();
			}

			final_pos = fancybox_get_zoom_to();

			fancybox_process_title();

			if (wrap.is(":visible")) {
				$( close.add( nav_left ).add( nav_right ) ).hide();

				var pos = wrap.position(),
					equal;

				start_pos = {
					top		:	pos.top ,
					left	:	pos.left,
					width	:	wrap.width(),
					height	:	wrap.height()
				};

				equal = (start_pos.width == final_pos.width && start_pos.height == final_pos.height);

				inner.fadeOut(currentOpts.changeFade, function() {
					var finish_resizing = function() {
						inner.html( tmp.contents() ).fadeIn(currentOpts.changeFade, _finish);
					};
					
					$.event.trigger('fancybox-change');

					inner.empty().css('overflow', 'hidden');

					if (equal) {
						inner.css({
							top			: currentOpts.padding,
							left		: currentOpts.padding,
							width		: Math.max(final_pos.width	- (currentOpts.padding * 2), 1),
							height		: Math.max(final_pos.height	- (currentOpts.padding * 2) - titleh, 1)
						});
						
						finish_resizing();

					} else {
						inner.css({
							top			: currentOpts.padding,
							left		: currentOpts.padding,
							width		: Math.max(start_pos.width	- (currentOpts.padding * 2), 1),
							height		: Math.max(start_pos.height	- (currentOpts.padding * 2), 1)
						});
						
						fx.prop = 0;

						$(fx).animate({ prop: 1 }, {
							 duration	: currentOpts.changeSpeed,
							 easing		: currentOpts.easingChange,
							 step		: fancybox_draw,
							 complete	: finish_resizing
						});
					}
				});

				return;
			}

			wrap.css('opacity', 1);

			if (currentOpts.transitionIn == 'elastic') {
				start_pos = fancybox_get_zoom_from();

				inner.css({
						top			: currentOpts.padding,
						left		: currentOpts.padding,
						width		: Math.max(start_pos.width	- (currentOpts.padding * 2), 1),
						height		: Math.max(start_pos.height	- (currentOpts.padding * 2), 1)
					})
					.html( tmp.contents() );

				wrap.css(start_pos).show();

				if (currentOpts.opacity) {
					final_pos.opacity = 0;
				}

				fx.prop = 0;

				$(fx).animate({ prop: 1 }, {
					 duration	: currentOpts.speedIn,
					 easing		: currentOpts.easingIn,
					 step		: fancybox_draw,
					 complete	: _finish
				});

			} else {
				inner.css({
						top			: currentOpts.padding,
						left		: currentOpts.padding,
						width		: Math.max(final_pos.width	- (currentOpts.padding * 2), 1),
						height		: Math.max(final_pos.height	- (currentOpts.padding * 2) - titleh, 1)
					})
					.html( tmp.contents() );

				wrap.css( final_pos ).fadeIn( currentOpts.transitionIn == 'none' ? 0 : currentOpts.speedIn, _finish );
			}
		},

		fancybox_process_inline = function() {
			tmp.width(	selectedOpts.width );
			tmp.height(	selectedOpts.height );

			if (selectedOpts.width	== 'auto') {
				selectedOpts.width = tmp.width();
			}
			if (selectedOpts.height	== 'auto') {
				selectedOpts.height	= tmp.height();
			}

			fancybox_show();
		},
		
		fancybox_process_image = function() {
			busy = true;

			selectedOpts.width	= imgPreloader.width;
			selectedOpts.height	= imgPreloader.height;

			$("<img />").attr({
				'id'	: 'fancybox-img',
				'src'	: imgPreloader.src,
				'alt'	: selectedOpts.title
			}).appendTo( tmp );

			fancybox_show();
		},

		fancybox_start = function() {
			fancybox_abort();

			var obj	= selectedArray[ selectedIndex ],
				href, 
				type, 
				title,
				str,
				emb,
				selector,
				data;

			selectedOpts = $.extend({}, $.fn.fancybox.defaults, (typeof $(obj).data('fancybox') == 'undefined' ? selectedOpts : $(obj).data('fancybox')));
			title = obj.title || $(obj).title || selectedOpts.title || '';
			
			if (obj.nodeName && !selectedOpts.orig) {
				selectedOpts.orig = $(obj).children("img:first").length ? $(obj).children("img:first") : $(obj);
			}

			if (title === '' && selectedOpts.orig) {
				title = selectedOpts.orig.attr('alt');
			}

			if (obj.nodeName && (/^(?:javascript|#)/i).test(obj.href)) {
				href = selectedOpts.href || null;
			} else {
				href = selectedOpts.href || obj.href || null;
			}

			if (selectedOpts.type) {
				type = selectedOpts.type;

				if (!href) {
					href = selectedOpts.content;
				}
				
			} else if (selectedOpts.content) {
				type	= 'html';

			} else if (href) {
				if (href.match(imgRegExp)) {
					type = 'image';

				} else if (href.match(swfRegExp)) {
					type = 'swf';

				} else if ($(obj).hasClass("iframe")) {
					type = 'iframe';

				} else if (href.match(/#/)) {
					obj = href.substr(href.indexOf("#"));

					type = $(obj).length > 0 ? 'inline' : 'ajax';
				} else {
					type = 'ajax';
				}
			} else {
				type = 'inline';
			}

			selectedOpts.type	= type;
			selectedOpts.href	= href;
			selectedOpts.title	= title;

			if (selectedOpts.autoDimensions && selectedOpts.type !== 'iframe' && selectedOpts.type !== 'swf') {
				selectedOpts.width		= 'auto';
				selectedOpts.height		= 'auto';
			}

			if (selectedOpts.modal) {
				selectedOpts.overlayShow		= true;
				selectedOpts.hideOnOverlayClick	= false;
				selectedOpts.hideOnContentClick	= false;
				selectedOpts.enableEscapeButton	= false;
				selectedOpts.showCloseButton	= false;
			}

			if ($.isFunction(selectedOpts.onStart)) {
				if (selectedOpts.onStart(selectedArray, selectedIndex, selectedOpts) === false) {
					busy = false;
					return;
				}
			}

			tmp.css('padding', (shadow + selectedOpts.padding + selectedOpts.margin));

			$('.fancybox-inline-tmp').unbind('fancybox-cancel').bind('fancybox-change', function() {
				$(this).replaceWith(inner.children());
			});

			switch (type) {
				case 'html' :
					tmp.html( selectedOpts.content );
					fancybox_process_inline();
				break;

				case 'inline' :
					$('<div class="fancybox-inline-tmp" />').hide().insertBefore( $(obj) ).bind('fancybox-cleanup', function() {
						$(this).replaceWith(inner.children());
					}).bind('fancybox-cancel', function() {
						$(this).replaceWith(tmp.children());
					});

					$(obj).appendTo(tmp);

					fancybox_process_inline();
				break;

				case 'image':
					busy = false;

					$.fancybox.showActivity();

					imgPreloader = new Image();

					imgPreloader.onerror = function() {
						fancybox_error();
					};

					imgPreloader.onload = function() {
						imgPreloader.onerror = null;
						imgPreloader.onload = null;
						fancybox_process_image();
					};

					imgPreloader.src = href;
		
				break;

				case 'swf':
					str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"><param name="movie" value="' + href + '"></param>';
					emb = '';
					
					$.each(selectedOpts.swf, function(name, val) {
						str += '<param name="' + name + '" value="' + val + '"></param>';
						emb += ' ' + name + '="' + val + '"';
					});

					str += '<embed src="' + href + '" type="application/x-shockwave-flash" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"' + emb + '></embed></object>';

					tmp.html(str);

					fancybox_process_inline();
				break;

				case 'ajax':
					selector	= href.split('#', 2);
					data		= selectedOpts.ajax.data || {};

					if (selector.length > 1) {
						href = selector[0];

						if (typeof data == "string") {
							data += '&selector=' + selector[1];
						} else {
							data.selector = selector[1];
						}
					}

					busy = false;
					$.fancybox.showActivity();

					ajaxLoader = $.ajax($.extend(selectedOpts.ajax, {
						url		: href,
						data	: data,
						error	: fancybox_error,
						success : function(data, textStatus, XMLHttpRequest) {
							if (ajaxLoader.status == 200) {
								tmp.html( data );
								fancybox_process_inline();
							}
						}
					}));

				break;

				case 'iframe' :
					$('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" scrolling="' + selectedOpts.scrolling + '" src="' + selectedOpts.href + '"></iframe>').appendTo(tmp);
					fancybox_show();
				break;
			}
		},

		fancybox_animate_loading = function() {
			if (!loading.is(':visible')){
				clearInterval(loadingTimer);
				return;
			}

			$('div', loading).css('top', (loadingFrame * -40) + 'px');

			loadingFrame = (loadingFrame + 1) % 12;
		},

		fancybox_init = function() {
			if ($("#fancybox-wrap").length) {
				return;
			}

			$('body').append(
				tmp			= $('<div id="fancybox-tmp"></div>'),
				loading		= $('<div id="fancybox-loading"><div></div></div>'),
				overlay		= $('<div id="fancybox-overlay"></div>'),
				wrap		= $('<div id="fancybox-wrap"></div>')
			);

			if (!$.support.opacity) {
				wrap.addClass('fancybox-ie');
				loading.addClass('fancybox-ie');
			}

			outer = $('<div id="fancybox-outer"></div>')
				.append('<div class="fancy-bg" id="fancy-bg-n"></div><div class="fancy-bg" id="fancy-bg-ne"></div><div class="fancy-bg" id="fancy-bg-e"></div><div class="fancy-bg" id="fancy-bg-se"></div><div class="fancy-bg" id="fancy-bg-s"></div><div class="fancy-bg" id="fancy-bg-sw"></div><div class="fancy-bg" id="fancy-bg-w"></div><div class="fancy-bg" id="fancy-bg-nw"></div>')
				.appendTo( wrap );

			outer.append(
				inner		= $('<div id="fancybox-inner"></div>'),
				close		= $('<a id="fancybox-close"></a>'),

				nav_left	= $('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),
				nav_right	= $('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')
			);

			close.click($.fancybox.close);
			loading.click($.fancybox.cancel);

			nav_left.click(function(e) {
				e.preventDefault();
				$.fancybox.prev();
			});

			nav_right.click(function(e) {
				e.preventDefault();
				$.fancybox.next();
			});

			if (isIE6) {
				overlay.get(0).style.setExpression('height',	"document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
				loading.get(0).style.setExpression('top',		"(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");

				outer.prepend('<iframe id="fancybox-hide-sel-frame" src="javascript:\'\';" scrolling="no" frameborder="0" ></iframe>');
			}
		};

	/*
	 * Public methods 
	 */

	$.fn.fancybox = function(options) {
		$(this)
			.data('fancybox', $.extend({}, options, ($.metadata ? $(this).metadata() : {})))
			.unbind('click.fb').bind('click.fb', function(e) {
				e.preventDefault();

				if (busy) {
					return;
				}

				busy = true;

				$(this).blur();

				selectedArray	= [];
				selectedIndex	= 0;

				var rel = $(this).attr('rel') || '';

				if (!rel || rel == '' || rel === 'nofollow') {
					selectedArray.push(this);

				} else {
					selectedArray	= $("a[rel=" + rel + "], area[rel=" + rel + "]");
					selectedIndex	= selectedArray.index( this );
				}

				fancybox_start();

				return false;
			});

		return this;
	};

	$.fancybox = function(obj) {
		if (busy) {
			return;
		}

		busy = true;

		var opts = typeof arguments[1] !== 'undefined' ? arguments[1] : {};

		selectedArray	= [];
		selectedIndex	= opts.index || 0;

		if ($.isArray(obj)) {
			for (var i = 0, j = obj.length; i < j; i++) {
				if (typeof obj[i] == 'object') {
					$(obj[i]).data('fancybox', $.extend({}, opts, obj[i]));
				} else {
					obj[i] = $({}).data('fancybox', $.extend({content : obj[i]}, opts));
				}
			}

			selectedArray = jQuery.merge(selectedArray, obj);

		} else {
			if (typeof obj == 'object') {
				$(obj).data('fancybox', $.extend({}, opts, obj));
			} else {
				obj = $({}).data('fancybox', $.extend({content : obj}, opts));
			}

			selectedArray.push(obj);
		}

		if (selectedIndex > selectedArray.length || selectedIndex < 0) {
			selectedIndex = 0;
		}

		fancybox_start();
	};

	$.fancybox.showActivity = function() {
		clearInterval(loadingTimer);

		loading.show();
		loadingTimer = setInterval(fancybox_animate_loading, 66);
	};

	$.fancybox.hideActivity = function() {
		loading.hide();
	};

	$.fancybox.next = function() {
		return $.fancybox.pos( currentIndex + 1);
	};
	
	$.fancybox.prev = function() {
		return $.fancybox.pos( currentIndex - 1);
	};

	$.fancybox.pos = function(pos) {
		if (busy) {
			return;
		}

		pos = parseInt(pos, 10);

		if (pos > -1 && currentArray.length > pos) {
			selectedIndex = pos;
			fancybox_start();
		}

		if (currentOpts.cyclic && currentArray.length > 1 && pos < 0) {
			selectedIndex = currentArray.length - 1;
			fancybox_start();
		}

		if (currentOpts.cyclic && currentArray.length > 1 && pos >= currentArray.length) {
			selectedIndex = 0;
			fancybox_start();
		}

		return;
	};

	$.fancybox.cancel = function() {
		if (busy) {
			return;
		}

		busy = true;

		$.event.trigger('fancybox-cancel');

		fancybox_abort();

		if (selectedOpts && $.isFunction(selectedOpts.onCancel)) {
			selectedOpts.onCancel(selectedArray, selectedIndex, selectedOpts);
		}

		busy = false;
	};

	// Note: within an iframe use - parent.$.fancybox.close();
	$.fancybox.close = function() {
		if (busy || wrap.is(':hidden')) {
			return;
		}

		busy = true;

		if (currentOpts && $.isFunction(currentOpts.onCleanup)) {
			if (currentOpts.onCleanup(currentArray, currentIndex, currentOpts) === false) {
				busy = false;
				return;
			}
		}

		fancybox_abort();

		$(close.add( nav_left ).add( nav_right )).hide();

		$('#fancybox-title').remove();

		wrap.add(inner).add(overlay).unbind();

		$(window).unbind("resize.fb scroll.fb");
		$(document).unbind('keydown.fb');

		function _cleanup() {
			overlay.fadeOut('fast');

			wrap.hide();

			$.event.trigger('fancybox-cleanup');

			inner.empty();

			if ($.isFunction(currentOpts.onClosed)) {
				currentOpts.onClosed(currentArray, currentIndex, currentOpts);
			}

			currentArray	= selectedOpts	= [];
			currentIndex	= selectedIndex	= 0;
			currentOpts		= selectedOpts	= {};

			busy = false;
		}

		inner.css('overflow', 'hidden');

		if (currentOpts.transitionOut == 'elastic') {
			start_pos = fancybox_get_zoom_from();

			var pos = wrap.position();

			final_pos = {
				top		:	pos.top ,
				left	:	pos.left,
				width	:	wrap.width(),
				height	:	wrap.height()
			};

			if (currentOpts.opacity) {
				final_pos.opacity = 1;
			}

			fx.prop = 1;

			$(fx).animate({ prop: 0 }, {
				 duration	: currentOpts.speedOut,
				 easing		: currentOpts.easingOut,
				 step		: fancybox_draw,
				 complete	: _cleanup
			});

		} else {
			wrap.fadeOut( currentOpts.transitionOut == 'none' ? 0 : currentOpts.speedOut, _cleanup);
		}
	};

	$.fancybox.resize = function() {
		var c, h;
		
		if (busy || wrap.is(':hidden')) {
			return;
		}

		busy = true;

		c = inner.wrapInner("<div style='overflow:auto'></div>").children();
		h = c.height();

		wrap.css({height:	h + (currentOpts.padding * 2) + titleh});
		inner.css({height:	h});

		c.replaceWith(c.children());

		$.fancybox.center();
	};

	$.fancybox.center = function() {
		busy = true;

		var view	= fancybox_get_viewport(),
			margin	= currentOpts.margin,
			to		= {};

		to.top	= view[3] + ((view[1] - ((wrap.height() - titleh) + (shadow * 2 ))) * 0.5);
		to.left	= view[2] + ((view[0] - (wrap.width() + (shadow * 2 ))) * 0.5);

		to.top	= Math.max(view[3] + margin, to.top);
		to.left	= Math.max(view[2] + margin, to.left);

		wrap.css(to);

		busy = false;
	};

	$.fn.fancybox.defaults = {
		padding				:	10,
		margin				:	20,
		opacity				:	false,
		modal				:	false,
		cyclic				:	false,
		scrolling			:	'auto',	// 'auto', 'yes' or 'no'

		width				:	600,
		height				:	600,

		autoScale			:	true,
		autoDimensions		:	true,
		centerOnScroll		:	false,

		ajax				:	{},
		swf					:	{ wmode: 'transparent' },

		hideOnOverlayClick	:	true,
		hideOnContentClick	:	false,

		overlayShow			:	true,
		overlayOpacity		:	0.3,
		overlayColor		:	'#666',

		titleShow			:	true,
		titlePosition		:	'outside',	// 'outside', 'inside' or 'over'
		titleFormat			:	null,

		transitionIn		:	'fade',	// 'elastic', 'fade' or 'none'
		transitionOut		:	'fade',	// 'elastic', 'fade' or 'none'

		speedIn				:	300,
		speedOut			:	300,

		changeSpeed			:	300,
		changeFade			:	'fast',

		easingIn			:	'swing',
		easingOut			:	'swing',

		showCloseButton		:	true,
		showNavArrows		:	true,
		enableEscapeButton	:	true,

		onStart				:	null,
		onCancel			:	null,
		onComplete			:	null,
		onCleanup			:	null,
		onClosed			:	null
	};

	$(document).ready(function() {
		fancybox_init();
	});

})(jQuery);
// Simple Set Clipboard System
// Author: Joseph Huckaby
var ZeroClipboard={version:"1.0.8",clients:{},moviePath:"ZeroClipboard.swf",nextId:1,$:function(a){return typeof a=="string"&&(a=document.getElementById(a)),a.addClass||(a.hide=function(){this.style.display="none"},a.show=function(){this.style.display=""},a.addClass=function(a){this.removeClass(a),this.className+=" "+a},a.removeClass=function(a){var b=this.className.split(/\s+/),c=-1;for(var d=0;d<b.length;d++)b[d]==a&&(c=d,d=b.length);return c>-1&&(b.splice(c,1),this.className=b.join(" ")),this},a.hasClass=function(a){return!!this.className.match(new RegExp("\\s*"+a+"\\s*"))}),a},setMoviePath:function(a){this.moviePath=a},newClient:function(){return new ZeroClipboard.Client},dispatch:function(a,b,c){var d=this.clients[a];d&&d.receiveEvent(b,c)},register:function(a,b){this.clients[a]=b},getDOMObjectPosition:function(a,b){var c={left:0,top:0,width:a.width?a.width:a.offsetWidth,height:a.height?a.height:a.offsetHeight};while(a&&a!=b)c.left+=a.offsetLeft,c.top+=a.offsetTop,a=a.offsetParent;return c},Client:function(a){this.handlers={},this.id=ZeroClipboard.nextId++,this.movieId="ZeroClipboardMovie_"+this.id,ZeroClipboard.register(this.id,this),a&&this.glue(a)}};ZeroClipboard.Client.prototype={id:0,ready:!1,movie:null,clipText:"",handCursorEnabled:!0,cssEffects:!0,handlers:null,zIndex:9999,glue:function(a,b,c){this.domElement=ZeroClipboard.$(a),this.domElement.style.zIndex&&(this.zIndex=parseInt(this.domElement.style.zIndex,10)+1),typeof b=="string"?b=ZeroClipboard.$(b):typeof b=="undefined"&&(b=document.getElementsByTagName("body")[0]);var d=ZeroClipboard.getDOMObjectPosition(this.domElement,b);this.div=document.createElement("div");var e=this.div.style;e.position="absolute",e.left=""+d.left+"px",e.top=""+d.top+"px",e.width=""+d.width+"px",e.height=""+d.height+"px",e.zIndex=this.zIndex;if(typeof c=="object")for(var f in c)e[f]=c[f];b.appendChild(this.div),this.div.innerHTML=this.getHTML(d.width,d.height)},getHTML:function(a,b){var c="",d="id="+this.id+"&width="+a+"&height="+b;if(navigator.userAgent.match(/MSIE/)){var e=location.href.match(/^https/i)?"https://":"http://";c+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+e+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+a+'" height="'+b+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+d+'"/><param name="wmode" value="transparent"/></object>'}else c+='<embed id="'+this.movieId+'" src="'+ZeroClipboard.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+a+'" height="'+b+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+d+'" wmode="transparent" />';return c},hide:function(){this.div&&(this.div.style.left="-2000px")},show:function(){this.reposition()},destroy:function(){if(this.domElement&&this.div){this.hide(),this.div.innerHTML="";var a=document.getElementsByTagName("body")[0];try{a.removeChild(this.div)}catch(b){}this.domElement=null,this.div=null}},reposition:function(a){a&&(this.domElement=ZeroClipboard.$(a),this.domElement||this.hide());if(this.domElement&&this.div){var b=ZeroClipboard.getDOMObjectPosition(this.domElement),c=this.div.style;c.left=""+b.left+"px",c.top=""+b.top+"px"}},setText:function(a){this.clipText=a,this.ready&&this.movie.setText(a)},addEventListener:function(a,b){a=a.toString().toLowerCase().replace(/^on/,""),this.handlers[a]||(this.handlers[a]=[]),this.handlers[a].push(b)},setHandCursor:function(a){this.handCursorEnabled=a,this.ready&&this.movie.setHandCursor(a)},setCSSEffects:function(a){this.cssEffects=!!a},receiveEvent:function(a,b){a=a.toString().toLowerCase().replace(/^on/,"");switch(a){case"load":this.movie=document.getElementById(this.movieId);if(!this.movie){var c=this;setTimeout(function(){c.receiveEvent("load",null)},1);return}if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){var c=this;setTimeout(function(){c.receiveEvent("load",null)},100),this.ready=!0;return}this.ready=!0,this.movie.setText(this.clipText),this.movie.setHandCursor(this.handCursorEnabled);break;case"mouseover":this.domElement&&this.cssEffects&&(this.domElement.addClass("hover"),this.recoverActive&&this.domElement.addClass("active"));break;case"mouseout":this.domElement&&this.cssEffects&&(this.recoverActive=!1,this.domElement.hasClass("active")&&(this.domElement.removeClass("active"),this.recoverActive=!0),this.domElement.removeClass("hover"));break;case"mousedown":this.domElement&&this.cssEffects&&this.domElement.addClass("active");break;case"mouseup":this.domElement&&this.cssEffects&&(this.domElement.removeClass("active"),this.recoverActive=!1)}if(this.handlers[a])for(var d=0,e=this.handlers[a].length;d<e;d++){var f=this.handlers[a][d];typeof f=="function"?f(this,b):typeof f=="object"&&f.length==2?f[0][f[1]](this,b):typeof f=="string"&&window[f](this,b)}}},typeof module!="undefined"&&(module.exports=ZeroClipboard);
/*
 Highcharts JS v4.0.3 (2014-07-03)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(){function r(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a}function w(){var a,b=arguments,c,d={},e=function(a,b){var c,d;typeof a!=="object"&&(a={});for(d in b)b.hasOwnProperty(d)&&(c=b[d],a[d]=c&&typeof c==="object"&&Object.prototype.toString.call(c)!=="[object Array]"&&d!=="renderTo"&&typeof c.nodeType!=="number"?e(a[d]||{},c):b[d]);return a};b[0]===!0&&(d=b[1],b=Array.prototype.slice.call(b,2));c=b.length;for(a=0;a<c;a++)d=e(d,b[a]);return d}function z(a,b){return parseInt(a,b||
10)}function Fa(a){return typeof a==="string"}function da(a){return a&&typeof a==="object"}function La(a){return Object.prototype.toString.call(a)==="[object Array]"}function ia(a){return typeof a==="number"}function za(a){return V.log(a)/V.LN10}function ja(a){return V.pow(10,a)}function ka(a,b){for(var c=a.length;c--;)if(a[c]===b){a.splice(c,1);break}}function s(a){return a!==t&&a!==null}function F(a,b,c){var d,e;if(Fa(b))s(c)?a.setAttribute(b,c):a&&a.getAttribute&&(e=a.getAttribute(b));else if(s(b)&&
da(b))for(d in b)a.setAttribute(d,b[d]);return e}function ra(a){return La(a)?a:[a]}function p(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++)if(c=a[b],c!==t&&c!==null)return c}function A(a,b){if(Aa&&!ba&&b&&b.opacity!==t)b.filter="alpha(opacity="+b.opacity*100+")";r(a.style,b)}function $(a,b,c,d,e){a=x.createElement(a);b&&r(a,b);e&&A(a,{padding:0,border:P,margin:0});c&&A(a,c);d&&d.appendChild(a);return a}function la(a,b){var c=function(){return t};c.prototype=new a;r(c.prototype,b);return c}function Ga(a,
b,c,d){var e=L.lang,a=+a||0,f=b===-1?(a.toString().split(".")[1]||"").length:isNaN(b=Q(b))?2:b,b=c===void 0?e.decimalPoint:c,d=d===void 0?e.thousandsSep:d,e=a<0?"-":"",c=String(z(a=Q(a).toFixed(f))),g=c.length>3?c.length%3:0;return e+(g?c.substr(0,g)+d:"")+c.substr(g).replace(/(\d{3})(?=\d)/g,"$1"+d)+(f?b+Q(a-c).toFixed(f).slice(2):"")}function Ha(a,b){return Array((b||2)+1-String(a).length).join(0)+a}function Ma(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(d);
return c.apply(this,a)}}function Ia(a,b){for(var c="{",d=!1,e,f,g,h,i,j=[];(c=a.indexOf(c))!==-1;){e=a.slice(0,c);if(d){f=e.split(":");g=f.shift().split(".");i=g.length;e=b;for(h=0;h<i;h++)e=e[g[h]];if(f.length)f=f.join(":"),g=/\.([0-9])/,h=L.lang,i=void 0,/f$/.test(f)?(i=(i=f.match(g))?i[1]:-1,e!==null&&(e=Ga(e,i,h.decimalPoint,f.indexOf(",")>-1?h.thousandsSep:""))):e=bb(f,e)}j.push(e);a=a.slice(c+1);c=(d=!d)?"}":"{"}j.push(a);return j.join("")}function lb(a){return V.pow(10,U(V.log(a)/V.LN10))}
function mb(a,b,c,d){var e,c=p(c,1);e=a/c;b||(b=[1,2,2.5,5,10],d&&d.allowDecimals===!1&&(c===1?b=[1,2,5,10]:c<=0.1&&(b=[1/c])));for(d=0;d<b.length;d++)if(a=b[d],e<=(b[d]+(b[d+1]||b[d]))/2)break;a*=c;return a}function nb(a,b){var c=a.length,d,e;for(e=0;e<c;e++)a[e].ss_i=e;a.sort(function(a,c){d=b(a,c);return d===0?a.ss_i-c.ss_i:d});for(e=0;e<c;e++)delete a[e].ss_i}function Na(a){for(var b=a.length,c=a[0];b--;)a[b]<c&&(c=a[b]);return c}function Ba(a){for(var b=a.length,c=a[0];b--;)a[b]>c&&(c=a[b]);
return c}function Oa(a,b){for(var c in a)a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c]}function Pa(a){cb||(cb=$(Ja));a&&cb.appendChild(a);cb.innerHTML=""}function ea(a){return parseFloat(a.toPrecision(14))}function Qa(a,b){va=p(a,b.animation)}function Ab(){var a=L.global.useUTC,b=a?"getUTC":"get",c=a?"setUTC":"set";Ra=(a&&L.global.timezoneOffset||0)*6E4;db=a?Date.UTC:function(a,b,c,g,h,i){return(new Date(a,b,p(c,1),p(g,0),p(h,0),p(i,0))).getTime()};ob=b+"Minutes";pb=b+"Hours";qb=b+"Day";
Wa=b+"Date";eb=b+"Month";fb=b+"FullYear";Bb=c+"Minutes";Cb=c+"Hours";rb=c+"Date";Db=c+"Month";Eb=c+"FullYear"}function G(){}function Sa(a,b,c,d){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;!c&&!d&&this.addLabel()}function ma(){this.init.apply(this,arguments)}function Xa(){this.init.apply(this,arguments)}function Fb(a,b,c,d,e){var f=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=b;this.x=d;this.total=null;this.points={};this.stack=e;this.alignOptions={align:b.align||(f?c?"left":
"right":"center"),verticalAlign:b.verticalAlign||(f?"middle":c?"bottom":"top"),y:p(b.y,f?4:c?14:-6),x:p(b.x,f?c?-6:6:0)};this.textAlign=b.textAlign||(f?c?"right":"left":"center")}var t,x=document,H=window,V=Math,v=V.round,U=V.floor,Ka=V.ceil,u=V.max,C=V.min,Q=V.abs,aa=V.cos,fa=V.sin,na=V.PI,Ca=na*2/360,wa=navigator.userAgent,Gb=H.opera,Aa=/msie/i.test(wa)&&!Gb,gb=x.documentMode===8,sb=/AppleWebKit/.test(wa),Ta=/Firefox/.test(wa),Hb=/(Mobile|Android|Windows Phone)/.test(wa),xa="http://www.w3.org/2000/svg",
ba=!!x.createElementNS&&!!x.createElementNS(xa,"svg").createSVGRect,Nb=Ta&&parseInt(wa.split("Firefox/")[1],10)<4,ga=!ba&&!Aa&&!!x.createElement("canvas").getContext,Ya,Za,Ib={},tb=0,cb,L,bb,va,ub,B,oa,sa=function(){return t},W=[],$a=0,Ja="div",P="none",Ob=/^[0-9]+$/,Pb="stroke-width",db,Ra,ob,pb,qb,Wa,eb,fb,Bb,Cb,rb,Db,Eb,J={},S;H.Highcharts?oa(16,!0):S=H.Highcharts={};bb=function(a,b,c){if(!s(b)||isNaN(b))return"Invalid date";var a=p(a,"%Y-%m-%d %H:%M:%S"),d=new Date(b-Ra),e,f=d[pb](),g=d[qb](),
h=d[Wa](),i=d[eb](),j=d[fb](),k=L.lang,l=k.weekdays,d=r({a:l[g].substr(0,3),A:l[g],d:Ha(h),e:h,b:k.shortMonths[i],B:k.months[i],m:Ha(i+1),y:j.toString().substr(2,2),Y:j,H:Ha(f),I:Ha(f%12||12),l:f%12||12,M:Ha(d[ob]()),p:f<12?"AM":"PM",P:f<12?"am":"pm",S:Ha(d.getSeconds()),L:Ha(v(b%1E3),3)},S.dateFormats);for(e in d)for(;a.indexOf("%"+e)!==-1;)a=a.replace("%"+e,typeof d[e]==="function"?d[e](b):d[e]);return c?a.substr(0,1).toUpperCase()+a.substr(1):a};oa=function(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+
a;if(b)throw c;H.console&&console.log(c)};B={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:26784E5,year:31556952E3};ub={init:function(a,b,c){var b=b||"",d=a.shift,e=b.indexOf("C")>-1,f=e?7:3,g,b=b.split(" "),c=[].concat(c),h,i,j=function(a){for(g=a.length;g--;)a[g]==="M"&&a.splice(g+1,0,a[g+1],a[g+2],a[g+1],a[g+2])};e&&(j(b),j(c));a.isArea&&(h=b.splice(b.length-6,6),i=c.splice(c.length-6,6));if(d<=c.length/f&&b.length===c.length)for(;d--;)c=[].concat(c).splice(0,f).concat(c);
a.shift=0;if(b.length)for(a=c.length;b.length<a;)d=[].concat(b).splice(b.length-f,f),e&&(d[f-6]=d[f-2],d[f-5]=d[f-1]),b=b.concat(d);h&&(b=b.concat(h),c=c.concat(i));return[b,c]},step:function(a,b,c,d){var e=[],f=a.length;if(c===1)e=d;else if(f===b.length&&c<1)for(;f--;)d=parseFloat(a[f]),e[f]=isNaN(d)?a[f]:c*parseFloat(b[f]-d)+d;else e=b;return e}};(function(a){H.HighchartsAdapter=H.HighchartsAdapter||a&&{init:function(b){var c=a.fx,d=c.step,e,f=a.Tween,g=f&&f.propHooks;e=a.cssHooks.opacity;a.extend(a.easing,
{easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c}});a.each(["cur","_default","width","height","opacity"],function(a,b){var e=d,k;b==="cur"?e=c.prototype:b==="_default"&&f&&(e=g[b],b="set");(k=e[b])&&(e[b]=function(c){var d,c=a?c:this;if(c.prop!=="align")return d=c.elem,d.attr?d.attr(c.prop,b==="cur"?t:c.now):k.apply(this,arguments)})});Ma(e,"get",function(a,b,c){return b.attr?b.opacity||0:a.call(this,b,c)});e=function(a){var c=a.elem,d;if(!a.started)d=b.init(c,c.d,c.toD),a.start=d[0],a.end=
d[1],a.started=!0;c.attr("d",b.step(a.start,a.end,a.pos,c.toD))};f?g.d={set:e}:d.d=e;this.each=Array.prototype.forEach?function(a,b){return Array.prototype.forEach.call(a,b)}:function(a,b){var c,d=a.length;for(c=0;c<d;c++)if(b.call(a[c],a[c],c,a)===!1)return c};a.fn.highcharts=function(){var a="Chart",b=arguments,c,d;if(this[0]){Fa(b[0])&&(a=b[0],b=Array.prototype.slice.call(b,1));c=b[0];if(c!==t)c.chart=c.chart||{},c.chart.renderTo=this[0],new S[a](c,b[1]),d=this;c===t&&(d=W[F(this[0],"data-highcharts-chart")])}return d}},
getScript:a.getScript,inArray:a.inArray,adapterRun:function(b,c){return a(b)[c]()},grep:a.grep,map:function(a,c){for(var d=[],e=0,f=a.length;e<f;e++)d[e]=c.call(a[e],a[e],e,a);return d},offset:function(b){return a(b).offset()},addEvent:function(b,c,d){a(b).bind(c,d)},removeEvent:function(b,c,d){var e=x.removeEventListener?"removeEventListener":"detachEvent";x[e]&&b&&!b[e]&&(b[e]=function(){});a(b).unbind(c,d)},fireEvent:function(b,c,d,e){var f=a.Event(c),g="detached"+c,h;!Aa&&d&&(delete d.layerX,
delete d.layerY,delete d.returnValue);r(f,d);b[c]&&(b[g]=b[c],b[c]=null);a.each(["preventDefault","stopPropagation"],function(a,b){var c=f[b];f[b]=function(){try{c.call(f)}catch(a){b==="preventDefault"&&(h=!0)}}});a(b).trigger(f);b[g]&&(b[c]=b[g],b[g]=null);e&&!f.isDefaultPrevented()&&!h&&e(f)},washMouseEvent:function(a){var c=a.originalEvent||a;if(c.pageX===t)c.pageX=a.pageX,c.pageY=a.pageY;return c},animate:function(b,c,d){var e=a(b);if(!b.style)b.style={};if(c.d)b.toD=c.d,c.d=1;e.stop();c.opacity!==
t&&b.attr&&(c.opacity+="px");e.animate(c,d)},stop:function(b){a(b).stop()}}})(H.jQuery);var T=H.HighchartsAdapter,M=T||{};T&&T.init.call(T,ub);var hb=M.adapterRun,Qb=M.getScript,Da=M.inArray,q=M.each,vb=M.grep,Rb=M.offset,Ua=M.map,N=M.addEvent,X=M.removeEvent,K=M.fireEvent,Sb=M.washMouseEvent,ib=M.animate,ab=M.stop,M={enabled:!0,x:0,y:15,style:{color:"#606060",cursor:"default",fontSize:"11px"}};L={colors:"#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#8085e8,#8d4653,#91e8e1".split(","),
symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),decimalPoint:".",numericSymbols:"k,M,G,T,P,E".split(","),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:","},global:{useUTC:!0,
canvasToolsURL:"http://code.highcharts.com/4.0.3/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/4.0.3/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#333333",fontSize:"18px"}},subtitle:{text:"",
align:"center",style:{color:"#555555"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},lineWidth:2,marker:{lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0,lineWidthPlus:1,radiusPlus:2},select:{fillColor:"#FFFFFF",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:w(M,{align:"center",enabled:!1,formatter:function(){return this.y===null?"":Ga(this.y,-1)},verticalAlign:"bottom",y:0}),cropThreshold:300,pointRange:0,states:{hover:{lineWidthPlus:1,
marker:{},halo:{size:10,opacity:0.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3}},labels:{style:{position:"absolute",color:"#3E576F"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#909090",borderRadius:0,navigation:{activeColor:"#274b6d",inactiveColor:"#CCC"},shadow:!1,itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold"},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",
width:"13px",height:"13px"},symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,animation:ba,backgroundColor:"rgba(249, 249, 249, .85)",borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",
day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{series.color}">●</span> {series.name}: <b>{point.y}</b><br/>',shadow:!0,snap:Hb?25:10,style:{color:"#333333",cursor:"default",fontSize:"12px",padding:"8px",whiteSpace:"nowrap"}},credits:{enabled:!0,text:"Highcharts.com",href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",
color:"#909090",fontSize:"9px"}}};var ca=L.plotOptions,T=ca.line;Ab();var Tb=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,Ub=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,Vb=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,ya=function(a){var b=[],c,d;(function(a){a&&a.stops?d=Ua(a.stops,function(a){return ya(a[1])}):(c=Tb.exec(a))?b=[z(c[1]),z(c[2]),z(c[3]),parseFloat(c[4],10)]:(c=Ub.exec(a))?b=[z(c[1],16),z(c[2],16),z(c[3],
16),1]:(c=Vb.exec(a))&&(b=[z(c[1]),z(c[2]),z(c[3]),1])})(a);return{get:function(c){var f;d?(f=w(a),f.stops=[].concat(f.stops),q(d,function(a,b){f.stops[b]=[f.stops[b][0],a.get(c)]})):f=b&&!isNaN(b[0])?c==="rgb"?"rgb("+b[0]+","+b[1]+","+b[2]+")":c==="a"?b[3]:"rgba("+b.join(",")+")":a;return f},brighten:function(a){if(d)q(d,function(b){b.brighten(a)});else if(ia(a)&&a!==0){var c;for(c=0;c<3;c++)b[c]+=z(a*255),b[c]<0&&(b[c]=0),b[c]>255&&(b[c]=255)}return this},rgba:b,setOpacity:function(a){b[3]=a;return this}}};
G.prototype={opacity:1,textProps:"fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow,HcTextStroke".split(","),init:function(a,b){this.element=b==="span"?$(b):x.createElementNS(xa,b);this.renderer=a},animate:function(a,b,c){b=p(b,va,!0);ab(this);if(b){b=w(b,{});if(c)b.complete=c;ib(this,a,b)}else this.attr(a),c&&c();return this},colorGradient:function(a,b,c){var d=this.renderer,e,f,g,h,i,j,k,l,m,n,o=[];a.linearGradient?f="linearGradient":a.radialGradient&&(f="radialGradient");
if(f){g=a[f];h=d.gradients;j=a.stops;m=c.radialReference;La(g)&&(a[f]=g={x1:g[0],y1:g[1],x2:g[2],y2:g[3],gradientUnits:"userSpaceOnUse"});f==="radialGradient"&&m&&!s(g.gradientUnits)&&(g=w(g,{cx:m[0]-m[2]/2+g.cx*m[2],cy:m[1]-m[2]/2+g.cy*m[2],r:g.r*m[2],gradientUnits:"userSpaceOnUse"}));for(n in g)n!=="id"&&o.push(n,g[n]);for(n in j)o.push(j[n]);o=o.join(",");h[o]?a=h[o].attr("id"):(g.id=a="highcharts-"+tb++,h[o]=i=d.createElement(f).attr(g).add(d.defs),i.stops=[],q(j,function(a){a[1].indexOf("rgba")===
0?(e=ya(a[1]),k=e.get("rgb"),l=e.get("a")):(k=a[1],l=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":k,"stop-opacity":l}).add(i);i.stops.push(a)}));c.setAttribute(b,"url("+d.url+"#"+a+")")}},attr:function(a,b){var c,d,e=this.element,f,g=this,h;typeof a==="string"&&b!==t&&(c=a,a={},a[c]=b);if(typeof a==="string")g=(this[a+"Getter"]||this._defaultGetter).call(this,a,e);else{for(c in a){d=a[c];h=!1;this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c)&&(f||(this.symbolAttr(a),
f=!0),h=!0);if(this.rotation&&(c==="x"||c==="y"))this.doTransform=!0;h||(this[c+"Setter"]||this._defaultSetter).call(this,d,c,e);this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c)&&this.updateShadows(c,d)}if(this.doTransform)this.updateTransform(),this.doTransform=!1}return g},updateShadows:function(a,b){for(var c=this.shadows,d=c.length;d--;)c[d].setAttribute(a,a==="height"?u(b-(c[d].cutHeight||0),0):a==="d"?this.d:b)},addClass:function(a){var b=this.element,c=F(b,"class")||
"";c.indexOf(a)===-1&&F(b,"class",c+" "+a);return this},symbolAttr:function(a){var b=this;q("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","),function(c){b[c]=p(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":P)},crisp:function(a){var b,c={},d,e=a.strokeWidth||this.strokeWidth||0;d=v(e)%2/2;a.x=U(a.x||this.x||0)+d;a.y=U(a.y||this.y||0)+d;a.width=U((a.width||this.width||
0)-2*d);a.height=U((a.height||this.height||0)-2*d);a.strokeWidth=e;for(b in a)this[b]!==a[b]&&(this[b]=c[b]=a[b]);return c},css:function(a){var b=this.styles,c={},d=this.element,e,f,g="";e=!b;if(a&&a.color)a.fill=a.color;if(b)for(f in a)a[f]!==b[f]&&(c[f]=a[f],e=!0);if(e){e=this.textWidth=a&&a.width&&d.nodeName.toLowerCase()==="text"&&z(a.width);b&&(a=r(b,c));this.styles=a;e&&(ga||!ba&&this.renderer.forExport)&&delete a.width;if(Aa&&!ba)A(this.element,a);else{b=function(a,b){return"-"+b.toLowerCase()};
for(f in a)g+=f.replace(/([A-Z])/g,b)+":"+a[f]+";";F(d,"style",g)}e&&this.added&&this.renderer.buildText(this)}return this},on:function(a,b){var c=this,d=c.element;Za&&a==="click"?(d.ontouchstart=function(a){c.touchEventFired=Date.now();a.preventDefault();b.call(d,a)},d.onclick=function(a){(wa.indexOf("Android")===-1||Date.now()-(c.touchEventFired||0)>1100)&&b.call(d,a)}):d["on"+a]=b;return this},setRadialReference:function(a){this.element.radialReference=a;return this},translate:function(a,b){return this.attr({translateX:a,
translateY:b})},invert:function(){this.inverted=!0;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,c=this.scaleX,d=this.scaleY,e=this.inverted,f=this.rotation,g=this.element;e&&(a+=this.attr("width"),b+=this.attr("height"));a=["translate("+a+","+b+")"];e?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+(g.getAttribute("x")||0)+" "+(g.getAttribute("y")||0)+")");(s(c)||s(d))&&a.push("scale("+p(c,1)+" "+p(d,1)+")");a.length&&g.setAttribute("transform",
a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){var d,e,f,g,h={};e=this.renderer;f=e.alignedObjects;if(a){if(this.alignOptions=a,this.alignByTranslate=b,!c||Fa(c))this.alignTo=d=c||"renderer",ka(f,this),f.push(this),c=null}else a=this.alignOptions,b=this.alignByTranslate,d=this.alignTo;c=p(c,e[d],e);d=a.align;e=a.verticalAlign;f=(c.x||0)+(a.x||0);g=(c.y||0)+(a.y||0);if(d==="right"||d==="center")f+=(c.width-(a.width||0))/{right:1,center:2}[d];
h[b?"translateX":"x"]=v(f);if(e==="bottom"||e==="middle")g+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||1);h[b?"translateY":"y"]=v(g);this[this.placed?"animate":"attr"](h);this.placed=!0;this.alignAttr=h;return this},getBBox:function(){var a=this.bBox,b=this.renderer,c,d,e=this.rotation;c=this.element;var f=this.styles,g=e*Ca;d=this.textStr;var h;if(d===""||Ob.test(d))h="num."+d.toString().length+(f?"|"+f.fontSize+"|"+f.fontFamily:"");h&&(a=b.cache[h]);if(!a){if(c.namespaceURI===xa||b.forExport){try{a=
c.getBBox?r({},c.getBBox()):{width:c.offsetWidth,height:c.offsetHeight}}catch(i){}if(!a||a.width<0)a={width:0,height:0}}else a=this.htmlGetBBox();if(b.isSVG){c=a.width;d=a.height;if(Aa&&f&&f.fontSize==="11px"&&d.toPrecision(3)==="16.9")a.height=d=14;if(e)a.width=Q(d*fa(g))+Q(c*aa(g)),a.height=Q(d*aa(g))+Q(c*fa(g))}this.bBox=a;h&&(b.cache[h]=a)}return a},show:function(a){return a&&this.element.namespaceURI===xa?(this.element.removeAttribute("visibility"),this):this.attr({visibility:a?"inherit":"visible"})},
hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.hide()}})},add:function(a){var b=this.renderer,c=a||b,d=c.element||b.box,e=this.element,f=this.zIndex,g,h;if(a)this.parentGroup=a;this.parentInverted=a&&a.inverted;this.textStr!==void 0&&b.buildText(this);if(f)c.handleZ=!0,f=z(f);if(c.handleZ){a=d.childNodes;for(g=0;g<a.length;g++)if(b=a[g],c=F(b,"zIndex"),b!==e&&(z(c)>f||!s(f)&&s(c))){d.insertBefore(e,
b);h=!0;break}}h||d.appendChild(e);this.added=!0;if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var b=a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},c=a.shadows,d=a.renderer.isSVG&&b.nodeName==="SPAN"&&a.parentGroup,e,f;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;ab(a);if(a.clipPath)a.clipPath=a.clipPath.destroy();if(a.stops){for(f=0;f<a.stops.length;f++)a.stops[f]=a.stops[f].destroy();a.stops=null}a.safeRemoveChild(b);for(c&&
q(c,function(b){a.safeRemoveChild(b)});d&&d.div&&d.div.childNodes.length===0;)b=d.parentGroup,a.safeRemoveChild(d.div),delete d.div,d=b;a.alignTo&&ka(a.renderer.alignedObjects,a);for(e in a)delete a[e];return null},shadow:function(a,b,c){var d=[],e,f,g=this.element,h,i,j,k;if(a){i=p(a.width,3);j=(a.opacity||0.15)/i;k=this.parentInverted?"(-1,-1)":"("+p(a.offsetX,1)+", "+p(a.offsetY,1)+")";for(e=1;e<=i;e++){f=g.cloneNode(0);h=i*2+1-2*e;F(f,{isShadow:"true",stroke:a.color||"black","stroke-opacity":j*
e,"stroke-width":h,transform:"translate"+k,fill:P});if(c)F(f,"height",u(F(f,"height")-h,0)),f.cutHeight=h;b?b.element.appendChild(f):g.parentNode.insertBefore(f,g);d.push(f)}this.shadows=d}return this},xGetter:function(a){this.element.nodeName==="circle"&&(a={x:"cx",y:"cy"}[a]||a);return this._defaultGetter(a)},_defaultGetter:function(a){a=p(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,b,c){a&&a.join&&(a=a.join(" "));
/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");c.setAttribute(b,a);this[b]=a},dashstyleSetter:function(a){var b;if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").replace("solid",1).split(",");for(b=a.length;b--;)a[b]=z(a[b])*this["stroke-width"];a=a.join(",");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",
{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,b,c){this[b]=a;c.setAttribute(b,a)},titleSetter:function(a){var b=this.element.getElementsByTagName("title")[0];b||(b=x.createElementNS(xa,"title"),this.element.appendChild(b));b.textContent=a},textSetter:function(a){if(a!==this.textStr)delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this)},fillSetter:function(a,b,c){typeof a==="string"?c.setAttribute(b,a):a&&this.colorGradient(a,b,c)},zIndexSetter:function(a,
b,c){c.setAttribute(b,a);this[b]=a},_defaultSetter:function(a,b,c){c.setAttribute(b,a)}};G.prototype.yGetter=G.prototype.xGetter;G.prototype.translateXSetter=G.prototype.translateYSetter=G.prototype.rotationSetter=G.prototype.verticalAlignSetter=G.prototype.scaleXSetter=G.prototype.scaleYSetter=function(a,b){this[b]=a;this.doTransform=!0};G.prototype["stroke-widthSetter"]=G.prototype.strokeSetter=function(a,b,c){this[b]=a;if(this.stroke&&this["stroke-width"])this.strokeWidth=this["stroke-width"],
G.prototype.fillSetter.call(this,this.stroke,"stroke",c),c.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0;else if(b==="stroke-width"&&a===0&&this.hasStroke)c.removeAttribute("stroke"),this.hasStroke=!1};var ta=function(){this.init.apply(this,arguments)};ta.prototype={Element:G,init:function(a,b,c,d,e){var f=location,g,d=this.createElement("svg").attr({version:"1.1"}).css(this.getStyle(d));g=d.element;a.appendChild(g);a.innerHTML.indexOf("xmlns")===-1&&F(g,"xmlns",xa);this.isSVG=
!0;this.box=g;this.boxWrapper=d;this.alignedObjects=[];this.url=(Ta||sb)&&x.getElementsByTagName("base").length?f.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(x.createTextNode("Created with Highcharts 4.0.3"));this.defs=this.createElement("defs").add();this.forExport=e;this.gradients={};this.cache={};this.setSize(b,c,!1);var h;if(Ta&&a.getBoundingClientRect)this.subPixelFix=b=function(){A(a,{left:0,top:0});h=a.getBoundingClientRect();
A(a,{left:Ka(h.left)-h.left+"px",top:Ka(h.top)-h.top+"px"})},b(),N(H,"resize",b)},getStyle:function(a){return this.style=r({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();Oa(this.gradients||{});this.gradients=null;if(a)this.defs=a.destroy();this.subPixelFix&&X(H,"resize",this.subPixelFix);return this.alignedObjects=
null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:function(){},buildText:function(a){for(var b=a.element,c=this,d=c.forExport,e=p(a.textStr,"").toString(),f=e.indexOf("<")!==-1,g=b.childNodes,h,i,j=F(b,"x"),k=a.styles,l=a.textWidth,m=k&&k.lineHeight,n=k&&k.HcTextStroke,o=g.length,Y=function(a){return m?z(m):c.fontMetrics(/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:k&&k.fontSize||c.style.fontSize||12,a).h};o--;)b.removeChild(g[o]);!f&&!n&&e.indexOf(" ")===
-1?b.appendChild(x.createTextNode(e)):(h=/<.*style="([^"]+)".*>/,i=/<.*href="(http[^"]+)".*>/,l&&!a.added&&this.box.appendChild(b),e=f?e.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g):[e],e[e.length-1]===""&&e.pop(),q(e,function(e,f){var g,m=0,e=e.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");g=e.split("|||");q(g,function(e){if(e!==
""||g.length===1){var n={},o=x.createElementNS(xa,"tspan"),p;h.test(e)&&(p=e.match(h)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),F(o,"style",p));i.test(e)&&!d&&(F(o,"onclick",'location.href="'+e.match(i)[1]+'"'),A(o,{cursor:"pointer"}));e=(e.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");if(e!==" "){o.appendChild(x.createTextNode(e));if(m)n.dx=0;else if(f&&j!==null)n.x=j;F(o,n);b.appendChild(o);!m&&f&&(!ba&&d&&A(o,{display:"block"}),F(o,"dy",Y(o)));if(l)for(var e=e.replace(/([^\^])-/g,
"$1- ").split(" "),n=g.length>1||e.length>1&&k.whiteSpace!=="nowrap",q,E,s=k.HcHeight,u=[],t=Y(o),Kb=1;n&&(e.length||u.length);)delete a.bBox,q=a.getBBox(),E=q.width,!ba&&c.forExport&&(E=c.measureSpanWidth(o.firstChild.data,a.styles)),q=E>l,!q||e.length===1?(e=u,u=[],e.length&&(Kb++,s&&Kb*t>s?(e=["..."],a.attr("title",a.textStr)):(o=x.createElementNS(xa,"tspan"),F(o,{dy:t,x:j}),p&&F(o,"style",p),b.appendChild(o))),E>l&&(l=E)):(o.removeChild(o.firstChild),u.unshift(e.pop())),e.length&&o.appendChild(x.createTextNode(e.join(" ").replace(/- /g,
"-")));m++}}})}))},button:function(a,b,c,d,e,f,g,h,i){var j=this.label(a,b,c,i,null,null,null,null,"button"),k=0,l,m,n,o,p,q,a={x1:0,y1:0,x2:0,y2:1},e=w({"stroke-width":1,stroke:"#CCCCCC",fill:{linearGradient:a,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},e);n=e.style;delete e.style;f=w(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#FFF"],[1,"#ACF"]]}},f);o=f.style;delete f.style;g=w(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#9BD"],[1,"#CDF"]]}},g);p=g.style;
delete g.style;h=w(e,{style:{color:"#CCC"}},h);q=h.style;delete h.style;N(j.element,Aa?"mouseover":"mouseenter",function(){k!==3&&j.attr(f).css(o)});N(j.element,Aa?"mouseout":"mouseleave",function(){k!==3&&(l=[e,f,g][k],m=[n,o,p][k],j.attr(l).css(m))});j.setState=function(a){(j.state=k=a)?a===2?j.attr(g).css(p):a===3&&j.attr(h).css(q):j.attr(e).css(n)};return j.on("click",function(){k!==3&&d.call(j)}).attr(e).css(r({cursor:"default"},n))},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=v(a[1])-b%
2/2);a[2]===a[5]&&(a[2]=a[5]=v(a[2])+b%2/2);return a},path:function(a){var b={fill:P};La(a)?b.d=a:da(a)&&r(b,a);return this.createElement("path").attr(b)},circle:function(a,b,c){a=da(a)?a:{x:a,y:b,r:c};b=this.createElement("circle");b.xSetter=function(a){this.element.setAttribute("cx",a)};b.ySetter=function(a){this.element.setAttribute("cy",a)};return b.attr(a)},arc:function(a,b,c,d,e,f){if(da(a))b=a.y,c=a.r,d=a.innerR,e=a.start,f=a.end,a=a.x;a=this.symbol("arc",a||0,b||0,c||0,c||0,{innerR:d||0,start:e||
0,end:f||0});a.r=c;return a},rect:function(a,b,c,d,e,f){var e=da(a)?a.r:e,g=this.createElement("rect"),a=da(a)?a:a===t?{}:{x:a,y:b,width:u(c,0),height:u(d,0)};if(f!==t)a.strokeWidth=f,a=g.crisp(a);if(e)a.r=e;g.rSetter=function(a){F(this.element,{rx:a,ry:a})};return g.attr(a)},setSize:function(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;this.height=b;for(this.boxWrapper[p(c,!0)?"animate":"attr"]({width:a,height:b});e--;)d[e].align()},g:function(a){var b=this.createElement("g");return s(a)?
b.attr({"class":"highcharts-"+a}):b},image:function(a,b,c,d,e){var f={preserveAspectRatio:P};arguments.length>1&&r(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f},symbol:function(a,b,c,d,e,f){var g,h=this.symbols[a],h=h&&h(v(b),v(c),d,e,f),i=/^url\((.*?)\)$/,j,k;if(h)g=this.path(h),r(g,{symbolName:a,x:b,y:c,width:d,height:e}),f&&r(g,f);else if(i.test(a))k=
function(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),a.alignByTranslate||a.translate(v((d-b[0])/2),v((e-b[1])/2)))},j=a.match(i)[1],a=Ib[j],g=this.image(j).attr({x:b,y:c}),g.isImg=!0,a?k(g,a):(g.attr({width:0,height:0}),$("img",{onload:function(){k(g,Ib[j]=[this.width,this.height])},src:j}));return g},symbols:{circle:function(a,b,c,d){var e=0.166*c;return["M",a+c/2,b,"C",a+c+e,b,a+c+e,b+d,a+c/2,b+d,"C",a-e,b+d,a-e,b,a+c/2,b,"Z"]},square:function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c,b+d,a,b+
d,"Z"]},triangle:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d,a,b+d,"Z"]},"triangle-down":function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"]},diamond:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+d,a,b+d/2,"Z"]},arc:function(a,b,c,d,e){var f=e.start,c=e.r||c||d,g=e.end-0.001,d=e.innerR,h=e.open,i=aa(f),j=fa(f),k=aa(g),g=fa(g),e=e.end-f<na?0:1;return["M",a+c*i,b+c*j,"A",c,c,0,e,1,a+c*k,b+c*g,h?"M":"L",a+d*k,b+d*g,"A",d,d,0,e,0,a+d*i,b+d*j,h?"":"Z"]},callout:function(a,b,c,d,
e){var f=C(e&&e.r||0,c,d),g=f+6,h=e&&e.anchorX,i=e&&e.anchorY,e=v(e.strokeWidth||0)%2/2;a+=e;b+=e;e=["M",a+f,b,"L",a+c-f,b,"C",a+c,b,a+c,b,a+c,b+f,"L",a+c,b+d-f,"C",a+c,b+d,a+c,b+d,a+c-f,b+d,"L",a+f,b+d,"C",a,b+d,a,b+d,a,b+d-f,"L",a,b+f,"C",a,b,a,b,a+f,b];h&&h>c&&i>b+g&&i<b+d-g?e.splice(13,3,"L",a+c,i-6,a+c+6,i,a+c,i+6,a+c,b+d-f):h&&h<0&&i>b+g&&i<b+d-g?e.splice(33,3,"L",a,i+6,a-6,i,a,i-6,a,b+f):i&&i>d&&h>a+g&&h<a+c-g?e.splice(23,3,"L",h+6,b+d,h,b+d+6,h-6,b+d,a+f,b+d):i&&i<0&&h>a+g&&h<a+c-g&&e.splice(3,
3,"L",h-6,b,h,b-6,h+6,b,c-f,b);return e}},clipRect:function(a,b,c,d){var e="highcharts-"+tb++,f=this.createElement("clipPath").attr({id:e}).add(this.defs),a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;return a},text:function(a,b,c,d){var e=ga||!ba&&this.forExport,f={};if(d&&!this.forExport)return this.html(a,b,c);f.x=Math.round(b||0);if(c)f.y=Math.round(c);if(a||a===0)f.text=a;a=this.createElement("text").attr(f);e&&a.css({position:"absolute"});if(!d)a.xSetter=function(a,b,c){var d=c.getElementsByTagName("tspan"),
e,f=c.getAttribute(b),m;for(m=0;m<d.length;m++)e=d[m],e.getAttribute(b)===f&&e.setAttribute(b,a);c.setAttribute(b,a)};return a},fontMetrics:function(a,b){a=a||this.style.fontSize;if(b&&H.getComputedStyle)b=b.element||b,a=H.getComputedStyle(b,"").fontSize;var a=/px/.test(a)?z(a):/em/.test(a)?parseFloat(a)*12:12,c=a<24?a+4:v(a*1.2),d=v(c*0.8);return{h:c,b:d,f:a}},label:function(a,b,c,d,e,f,g,h,i){function j(){var a,b;a=o.element.style;E=(u===void 0||wb===void 0||n.styles.textAlign)&&o.textStr&&o.getBBox();
n.width=(u||E.width||0)+2*D+jb;n.height=(wb||E.height||0)+2*D;R=D+m.fontMetrics(a&&a.fontSize,o).b;if(z){if(!p)a=v(-I*D),b=h?-R:0,n.box=p=d?m.symbol(d,a,b,n.width,n.height,y):m.rect(a,b,n.width,n.height,0,y[Pb]),p.attr("fill",P).add(n);p.isImg||p.attr(r({width:v(n.width),height:v(n.height)},y));y=null}}function k(){var a=n.styles,a=a&&a.textAlign,b=jb+D*(1-I),c;c=h?0:R;if(s(u)&&E&&(a==="center"||a==="right"))b+={center:0.5,right:1}[a]*(u-E.width);if(b!==o.x||c!==o.y)o.attr("x",b),c!==t&&o.attr("y",
c);o.x=b;o.y=c}function l(a,b){p?p.attr(a,b):y[a]=b}var m=this,n=m.g(i),o=m.text("",0,0,g).attr({zIndex:1}),p,E,I=0,D=3,jb=0,u,wb,xb,x,Jb=0,y={},R,z;n.onAdd=function(){o.add(n);n.attr({text:a||"",x:b,y:c});p&&s(e)&&n.attr({anchorX:e,anchorY:f})};n.widthSetter=function(a){u=a};n.heightSetter=function(a){wb=a};n.paddingSetter=function(a){s(a)&&a!==D&&(D=a,k())};n.paddingLeftSetter=function(a){s(a)&&a!==jb&&(jb=a,k())};n.alignSetter=function(a){I={left:0,center:0.5,right:1}[a]};n.textSetter=function(a){a!==
t&&o.textSetter(a);j();k()};n["stroke-widthSetter"]=function(a,b){a&&(z=!0);Jb=a%2/2;l(b,a)};n.strokeSetter=n.fillSetter=n.rSetter=function(a,b){b==="fill"&&a&&(z=!0);l(b,a)};n.anchorXSetter=function(a,b){e=a;l(b,a+Jb-xb)};n.anchorYSetter=function(a,b){f=a;l(b,a-x)};n.xSetter=function(a){n.x=a;I&&(a-=I*((u||E.width)+D));xb=v(a);n.attr("translateX",xb)};n.ySetter=function(a){x=n.y=v(a);n.attr("translateY",x)};var C=n.css;return r(n,{css:function(a){if(a){var b={},a=w(a);q(n.textProps,function(c){a[c]!==
t&&(b[c]=a[c],delete a[c])});o.css(b)}return C.call(n,a)},getBBox:function(){return{width:E.width+2*D,height:E.height+2*D,x:E.x-D,y:E.y-D}},shadow:function(a){p&&p.shadow(a);return n},destroy:function(){X(n.element,"mouseenter");X(n.element,"mouseleave");o&&(o=o.destroy());p&&(p=p.destroy());G.prototype.destroy.call(n);n=m=j=k=l=null}})}};Ya=ta;r(G.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&b.tagName==="SPAN"&&a.width)delete a.width,this.textWidth=b,this.updateTransform();this.styles=
r(this.styles,a);A(this.element,a);return this},htmlGetBBox:function(){var a=this.element,b=this.bBox;if(!b){if(a.nodeName==="text")a.style.position="absolute";b=this.bBox={x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}}return b},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,c=this.translateX||0,d=this.translateY||0,e=this.x||0,f=this.y||0,g=this.textAlign||"left",h={left:0,center:0.5,right:1}[g],i=this.shadows;A(b,{marginLeft:c,marginTop:d});
i&&q(i,function(a){A(a,{marginLeft:c+1,marginTop:d+1})});this.inverted&&q(b.childNodes,function(c){a.invertChild(c,b)});if(b.tagName==="SPAN"){var j=this.rotation,k,l=z(this.textWidth),m=[j,g,b.innerHTML,this.textWidth].join(",");if(m!==this.cTT){k=a.fontMetrics(b.style.fontSize).b;s(j)&&this.setSpanRotation(j,h,k);i=p(this.elemWidth,b.offsetWidth);if(i>l&&/[ \-]/.test(b.textContent||b.innerText))A(b,{width:l+"px",display:"block",whiteSpace:"normal"}),i=l;this.getSpanCorrection(i,k,h,j,g)}A(b,{left:e+
(this.xCorr||0)+"px",top:f+(this.yCorr||0)+"px"});if(sb)k=b.offsetHeight;this.cTT=m}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,c){var d={},e=Aa?"-ms-transform":sb?"-webkit-transform":Ta?"MozTransform":Gb?"-o-transform":"";d[e]=d.transform="rotate("+a+"deg)";d[e+(Ta?"Origin":"-origin")]=d.transformOrigin=b*100+"% "+c+"px";A(this.element,d)},getSpanCorrection:function(a,b,c){this.xCorr=-a*c;this.yCorr=-b}});r(ta.prototype,{html:function(a,b,c){var d=this.createElement("span"),e=d.element,
f=d.renderer;d.textSetter=function(a){a!==e.innerHTML&&delete this.bBox;e.innerHTML=this.textStr=a};d.xSetter=d.ySetter=d.alignSetter=d.rotationSetter=function(a,b){b==="align"&&(b="textAlign");d[b]=a;d.htmlUpdateTransform()};d.attr({text:a,x:v(b),y:v(c)}).css({position:"absolute",whiteSpace:"nowrap",fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});d.css=d.htmlCss;if(f.isSVG)d.add=function(a){var b,c=f.box.parentNode,j=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)j.push(a),a=a.parentGroup;
q(j.reverse(),function(a){var d;b=a.div=a.div||$(Ja,{className:F(a.element,"class")},{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px"},b||c);d=b.style;r(a,{translateXSetter:function(b,c){d.left=b+"px";a[c]=b;a.doTransform=!0},translateYSetter:function(b,c){d.top=b+"px";a[c]=b;a.doTransform=!0},visibilitySetter:function(a,b){d[b]=a}})})}}else b=c;b.appendChild(e);d.added=!0;d.alignOnAdd&&d.htmlUpdateTransform();return d};return d}});var Z;if(!ba&&!ga){Z={init:function(a,
b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"],e=b===Ja;(b==="shape"||e)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",e?"hidden":"visible");c.push(' style="',d.join(""),'"/>');if(b)c=e||b==="span"||b==="img"?c.join(""):a.prepVML(c),this.element=$(c);this.renderer=a},add:function(a){var b=this.renderer,c=this.element,d=b.box,d=a?a.element||a:d;a&&a.inverted&&b.invertChild(c,d);d.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&
this.updateTransform();if(this.onAdd)this.onAdd();return this},updateTransform:G.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=aa(a*Ca),c=fa(a*Ca);A(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",b,", M12=",-c,", M21=",c,", M22=",b,", sizingMethod='auto expand')"].join(""):P})},getSpanCorrection:function(a,b,c,d,e){var f=d?aa(d*Ca):1,g=d?fa(d*Ca):0,h=p(this.elemHeight,this.element.offsetHeight),i;this.xCorr=f<0&&-a;this.yCorr=g<0&&-h;i=f*g<
0;this.xCorr+=g*b*(i?1-c:c);this.yCorr-=f*b*(d?i?c:1-c:1);e&&e!=="left"&&(this.xCorr-=a*c*(f<0?-1:1),d&&(this.yCorr-=h*c*(g<0?-1:1)),A(this.element,{textAlign:e}))},pathToVML:function(a){for(var b=a.length,c=[];b--;)if(ia(a[b]))c[b]=v(a[b]*10)-5;else if(a[b]==="Z")c[b]="x";else if(c[b]=a[b],a.isArc&&(a[b]==="wa"||a[b]==="at"))c[b+5]===c[b+7]&&(c[b+7]+=a[b+7]>a[b+5]?1:-1),c[b+6]===c[b+8]&&(c[b+8]+=a[b+8]>a[b+6]?1:-1);return c.join(" ")||"x"},clip:function(a){var b=this,c;a?(c=a.members,ka(c,b),c.push(b),
b.destroyClip=function(){ka(c,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:gb?"inherit":"rect(auto)"});return b.css(a)},css:G.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&Pa(a)},destroy:function(){this.destroyClip&&this.destroyClip();return G.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=H.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var c,a=a.split(/[ ,]/);c=a.length;if(c===9||c===11)a[c-4]=a[c-2]=z(a[c-
2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],e,f=this.element,g=this.renderer,h,i=f.style,j,k=f.path,l,m,n,o;k&&typeof k.value!=="string"&&(k="x");m=k;if(a){n=p(a.width,3);o=(a.opacity||0.15)/n;for(e=1;e<=3;e++){l=n*2+1-2*e;c&&(m=this.cutOffPath(k.value,l+0.5));j=['<shape isShadow="true" strokeweight="',l,'" filled="false" path="',m,'" coordsize="10 10" style="',f.style.cssText,'" />'];h=$(g.prepVML(j),null,{left:z(i.left)+p(a.offsetX,1),top:z(i.top)+p(a.offsetY,1)});if(c)h.cutOff=
l+1;j=['<stroke color="',a.color||"black",'" opacity="',o*e,'"/>'];$(g.prepVML(j),null,null,h);b?b.element.appendChild(h):f.parentNode.insertBefore(h,f);d.push(h)}this.shadows=d}return this},updateShadows:sa,setAttr:function(a,b){gb?this.element[a]=b:this.element.setAttribute(a,b)},classSetter:function(a){this.element.className=a},dashstyleSetter:function(a,b,c){(c.getElementsByTagName("stroke")[0]||$(this.renderer.prepVML(["<stroke/>"]),null,null,c))[b]=a||"solid";this[b]=a},dSetter:function(a,b,
c){var d=this.shadows,a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(d)for(c=d.length;c--;)d[c].path=d[c].cutOff?this.cutOffPath(a,d[c].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,c){var d=c.nodeName;if(d==="SPAN")c.style.color=a;else if(d!=="IMG")c.filled=a!==P,this.setAttr("fillcolor",this.renderer.color(a,c,b,this))},opacitySetter:sa,rotationSetter:function(a,b,c){c=c.style;this[b]=c[b]=a;c.left=-v(fa(a*Ca)+1)+"px";c.top=v(aa(a*Ca))+"px"},strokeSetter:function(a,b,c){this.setAttr("strokecolor",
this.renderer.color(a,c,b))},"stroke-widthSetter":function(a,b,c){c.stroked=!!a;this[b]=a;ia(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,c){a==="inherit"&&(a="visible");this.shadows&&q(this.shadows,function(c){c.style[b]=a});c.nodeName==="DIV"&&(a=a==="hidden"?"-999em":0,gb||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a},xSetter:function(a,b,c){this[b]=a;b==="x"?b="left":b==="y"&&(b="top");this.updateClipping?(this[b]=
a,this.updateClipping()):c.style[b]=a},zIndexSetter:function(a,b,c){c.style[b]=a}};S.VMLElement=Z=la(G,Z);Z.prototype.ySetter=Z.prototype.widthSetter=Z.prototype.heightSetter=Z.prototype.xSetter;var ha={Element:Z,isIE8:wa.indexOf("MSIE 8.0")>-1,init:function(a,b,c,d){var e;this.alignedObjects=[];d=this.createElement(Ja).css(r(this.getStyle(d),{position:"relative"}));e=d.element;a.appendChild(d.element);this.isVML=!0;this.box=e;this.boxWrapper=d;this.cache={};this.setSize(b,c,!1);if(!x.namespaces.hcv){x.namespaces.add("hcv",
"urn:schemas-microsoft-com:vml");try{x.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(f){x.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,d){var e=this.createElement(),f=da(a);return r(e,{members:[],left:(f?a.x:a)+1,top:(f?a.y:b)+1,width:(f?a.width:
c)-1,height:(f?a.height:d)-1,getCSS:function(a){var b=a.element,c=b.nodeName,a=a.inverted,d=this.top-(c==="shape"?b.offsetTop:0),e=this.left,b=e+this.width,f=d+this.height,d={clip:"rect("+v(a?e:d)+"px,"+v(a?f:b)+"px,"+v(a?b:f)+"px,"+v(a?d:e)+"px)"};!a&&gb&&c==="DIV"&&r(d,{width:b+"px",height:f+"px"});return d},updateClipping:function(){q(e.members,function(a){a.element&&a.css(e.getCSS(a))})}})},color:function(a,b,c,d){var e=this,f,g=/^rgba/,h,i,j=P;a&&a.linearGradient?i="gradient":a&&a.radialGradient&&
(i="pattern");if(i){var k,l,m=a.linearGradient||a.radialGradient,n,o,p,E,I,D="",a=a.stops,u,s=[],t=function(){h=['<fill colors="'+s.join(",")+'" opacity="',p,'" o:opacity2="',o,'" type="',i,'" ',D,'focus="100%" method="any" />'];$(e.prepVML(h),null,null,b)};n=a[0];u=a[a.length-1];n[0]>0&&a.unshift([0,n[1]]);u[0]<1&&a.push([1,u[1]]);q(a,function(a,b){g.test(a[1])?(f=ya(a[1]),k=f.get("rgb"),l=f.get("a")):(k=a[1],l=1);s.push(a[0]*100+"% "+k);b?(p=l,E=k):(o=l,I=k)});if(c==="fill")if(i==="gradient")c=
m.x1||m[0]||0,a=m.y1||m[1]||0,n=m.x2||m[2]||0,m=m.y2||m[3]||0,D='angle="'+(90-V.atan((m-a)/(n-c))*180/na)+'"',t();else{var j=m.r,r=j*2,v=j*2,x=m.cx,y=m.cy,R=b.radialReference,w,j=function(){R&&(w=d.getBBox(),x+=(R[0]-w.x)/w.width-0.5,y+=(R[1]-w.y)/w.height-0.5,r*=R[2]/w.width,v*=R[2]/w.height);D='src="'+L.global.VMLRadialGradientURL+'" size="'+r+","+v+'" origin="0.5,0.5" position="'+x+","+y+'" color2="'+I+'" ';t()};d.added?j():d.onAdd=j;j=E}else j=k}else if(g.test(a)&&b.tagName!=="IMG")f=ya(a),h=
["<",c,' opacity="',f.get("a"),'"/>'],$(this.prepVML(h),null,null,b),j=f.get("rgb");else{j=b.getElementsByTagName(c);if(j.length)j[0].opacity=1,j[0].type="solid";j=a}return j},prepVML:function(a){var b=this.isIE8,a=a.join("");b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=a.indexOf('style="')===-1?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");
return a},text:ta.prototype.html,path:function(a){var b={coordsize:"10 10"};La(a)?b.d=a:da(a)&&r(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){var d=this.symbol("circle");if(da(a))c=a.r,b=a.y,a=a.x;d.isCircle=!0;d.r=c;return d.attr({x:a,y:b})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(Ja).attr(b)},image:function(a,b,c,d,e){var f=this.createElement("img").attr({src:a});arguments.length>1&&f.attr({x:b,y:c,width:d,
height:e});return f},createElement:function(a){return a==="rect"?this.symbol(a):ta.prototype.createElement.call(this,a)},invertChild:function(a,b){var c=this,d=b.style,e=a.tagName==="IMG"&&a.style;A(a,{flip:"x",left:z(d.width)-(e?z(e.top):1),top:z(d.height)-(e?z(e.left):1),rotation:-90});q(a.childNodes,function(b){c.invertChild(b,a)})},symbols:{arc:function(a,b,c,d,e){var f=e.start,g=e.end,h=e.r||c||d,c=e.innerR,d=aa(f),i=fa(f),j=aa(g),k=fa(g);if(g-f===0)return["x"];f=["wa",a-h,b-h,a+h,b+h,a+h*d,
b+h*i,a+h*j,b+h*k];e.open&&!c&&f.push("e","M",a,b);f.push("at",a-c,b-c,a+c,b+c,a+c*j,b+c*k,a+c*d,b+c*i,"x","e");f.isArc=!0;return f},circle:function(a,b,c,d,e){e&&(c=d=2*e.r);e&&e.isCircle&&(a-=c/2,b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,e){return ta.prototype.symbols[!s(e)||!e.r?"square":"callout"].call(0,a,b,c,d,e)}}};S.VMLRenderer=Z=function(){this.init.apply(this,arguments)};Z.prototype=w(ta.prototype,ha);Ya=Z}ta.prototype.measureSpanWidth=function(a,b){var c=
x.createElement("span"),d;d=x.createTextNode(a);c.appendChild(d);A(c,b);this.box.appendChild(c);d=c.offsetWidth;Pa(c);return d};var Lb;if(ga)S.CanVGRenderer=Z=function(){xa="http://www.w3.org/1999/xhtml"},Z.prototype.symbols={},Lb=function(){function a(){var a=b.length,d;for(d=0;d<a;d++)b[d]();b=[]}var b=[];return{push:function(c,d){b.length===0&&Qb(d,a);b.push(c)}}}(),Ya=Z;Sa.prototype={addLabel:function(){var a=this.axis,b=a.options,c=a.chart,d=a.horiz,e=a.categories,f=a.names,g=this.pos,h=b.labels,
i=h.rotation,j=a.tickPositions,d=d&&e&&!h.step&&!h.staggerLines&&!h.rotation&&c.plotWidth/j.length||!d&&(c.margin[3]||c.chartWidth*0.33),k=g===j[0],l=g===j[j.length-1],m,f=e?p(e[g],f[g],g):g,e=this.label,n=j.info;a.isDatetimeAxis&&n&&(m=b.dateTimeLabelFormats[n.higherRanks[g]||n.unitName]);this.isFirst=k;this.isLast=l;b=a.labelFormatter.call({axis:a,chart:c,isFirst:k,isLast:l,dateTimeLabelFormat:m,value:a.isLog?ea(ja(f)):f});g=d&&{width:u(1,v(d-2*(h.padding||10)))+"px"};g=r(g,h.style);if(s(e))e&&
e.attr({text:b}).css(g);else{m={align:a.labelAlign};if(ia(i))m.rotation=i;if(d&&h.ellipsis)g.HcHeight=a.len/j.length;this.label=e=s(b)&&h.enabled?c.renderer.text(b,0,0,h.useHTML).attr(m).css(g).add(a.labelGroup):null;a.tickBaseline=c.renderer.fontMetrics(h.style.fontSize,e).b;i&&a.side===2&&(a.tickBaseline*=aa(i*Ca))}this.yOffset=e?p(h.y,a.tickBaseline+(a.side===2?8:-(e.getBBox().height/2))):0},getLabelSize:function(){var a=this.label,b=this.axis;return a?a.getBBox()[b.horiz?"height":"width"]:0},
getLabelSides:function(){var a=this.label.getBBox(),b=this.axis,c=b.horiz,d=b.options.labels,a=c?a.width:a.height,b=c?d.x-a*{left:0,center:0.5,right:1}[b.labelAlign]:0;return[b,c?a+b:a]},handleOverflow:function(a,b){var c=!0,d=this.axis,e=this.isFirst,f=this.isLast,g=d.horiz?b.x:b.y,h=d.reversed,i=d.tickPositions,j=this.getLabelSides(),k=j[0],j=j[1],l,m,n,o=this.label.line||0;l=d.labelEdge;m=d.justifyLabels&&(e||f);l[o]===t||g+k>l[o]?l[o]=g+j:m||(c=!1);if(m){l=(m=d.justifyToPlot)?d.pos:0;m=m?l+d.len:
d.chart.chartWidth;do a+=e?1:-1,n=d.ticks[i[a]];while(i[a]&&(!n||!n.label||n.label.line!==o));d=n&&n.label.xy&&n.label.xy.x+n.getLabelSides()[e?0:1];e&&!h||f&&h?g+k<l&&(g=l-k,n&&g+j>d&&(c=!1)):g+j>m&&(g=m-j,n&&g+k<d&&(c=!1));b.x=g}return c},getPosition:function(a,b,c,d){var e=this.axis,f=e.chart,g=d&&f.oldChartHeight||f.chartHeight;return{x:a?e.translate(b+c,null,null,d)+e.transB:e.left+e.offset+(e.opposite?(d&&f.oldChartWidth||f.chartWidth)-e.right-e.left:0),y:a?g-e.bottom+e.offset-(e.opposite?e.height:
0):g-e.translate(b+c,null,null,d)-e.transB}},getLabelPosition:function(a,b,c,d,e,f,g,h){var i=this.axis,j=i.transA,k=i.reversed,l=i.staggerLines,a=a+e.x-(f&&d?f*j*(k?-1:1):0),b=b+this.yOffset-(f&&!d?f*j*(k?1:-1):0);if(l)c.line=g/(h||1)%l,b+=c.line*(i.labelOffset/l);return{x:a,y:b}},getMarkPath:function(a,b,c,d,e,f){return f.crispLine(["M",a,b,"L",a+(e?0:-c),b+(e?c:0)],d)},render:function(a,b,c){var d=this.axis,e=d.options,f=d.chart.renderer,g=d.horiz,h=this.type,i=this.label,j=this.pos,k=e.labels,
l=this.gridLine,m=h?h+"Grid":"grid",n=h?h+"Tick":"tick",o=e[m+"LineWidth"],q=e[m+"LineColor"],E=e[m+"LineDashStyle"],I=e[n+"Length"],m=e[n+"Width"]||0,D=e[n+"Color"],u=e[n+"Position"],n=this.mark,s=k.step,r=!0,v=d.tickmarkOffset,w=this.getPosition(g,j,v,b),x=w.x,w=w.y,y=g&&x===d.pos+d.len||!g&&w===d.pos?-1:1,c=p(c,1);this.isActive=!0;if(o){j=d.getPlotLinePath(j+v,o*y,b,!0);if(l===t){l={stroke:q,"stroke-width":o};if(E)l.dashstyle=E;if(!h)l.zIndex=1;if(b)l.opacity=0;this.gridLine=l=o?f.path(j).attr(l).add(d.gridGroup):
null}if(!b&&l&&j)l[this.isNew?"attr":"animate"]({d:j,opacity:c})}if(m&&I)u==="inside"&&(I=-I),d.opposite&&(I=-I),h=this.getMarkPath(x,w,I,m*y,g,f),n?n.animate({d:h,opacity:c}):this.mark=f.path(h).attr({stroke:D,"stroke-width":m,opacity:c}).add(d.axisGroup);if(i&&!isNaN(x))i.xy=w=this.getLabelPosition(x,w,i,g,k,v,a,s),this.isFirst&&!this.isLast&&!p(e.showFirstLabel,1)||this.isLast&&!this.isFirst&&!p(e.showLastLabel,1)?r=!1:!d.isRadial&&!k.step&&!k.rotation&&!b&&c!==0&&(r=this.handleOverflow(a,w)),
s&&a%s&&(r=!1),r&&!isNaN(w.y)?(w.opacity=c,i[this.isNew?"attr":"animate"](w),this.isNew=!1):i.attr("y",-9999)},destroy:function(){Oa(this,this.axis)}};S.PlotLineOrBand=function(a,b){this.axis=a;if(b)this.options=b,this.id=b.id};S.PlotLineOrBand.prototype={render:function(){var a=this,b=a.axis,c=b.horiz,d=(b.pointRange||0)/2,e=a.options,f=e.label,g=a.label,h=e.width,i=e.to,j=e.from,k=s(j)&&s(i),l=e.value,m=e.dashStyle,n=a.svgElem,o=[],p,q=e.color,I=e.zIndex,D=e.events,r={},t=b.chart.renderer;b.isLog&&
(j=za(j),i=za(i),l=za(l));if(h){if(o=b.getPlotLinePath(l,h),r={stroke:q,"stroke-width":h},m)r.dashstyle=m}else if(k){j=u(j,b.min-d);i=C(i,b.max+d);o=b.getPlotBandPath(j,i,e);if(q)r.fill=q;if(e.borderWidth)r.stroke=e.borderColor,r["stroke-width"]=e.borderWidth}else return;if(s(I))r.zIndex=I;if(n)if(o)n.animate({d:o},null,n.onGetPath);else{if(n.hide(),n.onGetPath=function(){n.show()},g)a.label=g=g.destroy()}else if(o&&o.length&&(a.svgElem=n=t.path(o).attr(r).add(),D))for(p in d=function(b){n.on(b,function(c){D[b].apply(a,
[c])})},D)d(p);if(f&&s(f.text)&&o&&o.length&&b.width>0&&b.height>0){f=w({align:c&&k&&"center",x:c?!k&&4:10,verticalAlign:!c&&k&&"middle",y:c?k?16:10:k?6:-4,rotation:c&&!k&&90},f);if(!g){r={align:f.textAlign||f.align,rotation:f.rotation};if(s(I))r.zIndex=I;a.label=g=t.text(f.text,0,0,f.useHTML).attr(r).css(f.style).add()}b=[o[1],o[4],k?o[6]:o[1]];k=[o[2],o[5],k?o[7]:o[2]];o=Na(b);c=Na(k);g.align(f,!1,{x:o,y:c,width:Ba(b)-o,height:Ba(k)-c});g.show()}else g&&g.hide();return a},destroy:function(){ka(this.axis.plotLinesAndBands,
this);delete this.axis;Oa(this)}};ma.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,gridLineColor:"#C0C0C0",labels:M,lineColor:"#C0D0E0",lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickColor:"#C0D0E0",tickLength:10,
tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",tickWidth:1,title:{align:"middle",style:{color:"#707070"}},type:"linear"},defaultYAxisOptions:{endOnTick:!0,gridLineWidth:1,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:!0,tickWidth:0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return Ga(this.total,-1)},style:M.style}},defaultLeftAxisOptions:{labels:{x:-15,y:null},title:{rotation:270}},
defaultRightAxisOptions:{labels:{x:15,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{x:0,y:null},title:{rotation:0}},defaultTopAxisOptions:{labels:{x:0,y:-15},title:{rotation:0}},init:function(a,b){var c=b.isX;this.horiz=a.inverted?!c:c;this.coll=(this.isXAxis=c)?"xAxis":"yAxis";this.opposite=b.opposite;this.side=b.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(b);var d=this.options,e=d.type;this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;
this.userOptions=b;this.minPixelPadding=0;this.chart=a;this.reversed=d.reversed;this.zoomEnabled=d.zoomEnabled!==!1;this.categories=d.categories||e==="category";this.names=[];this.isLog=e==="logarithmic";this.isDatetimeAxis=e==="datetime";this.isLinked=s(d.linkedTo);this.tickmarkOffset=this.categories&&d.tickmarkPlacement==="between"?0.5:0;this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;
this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.min=this.max=null;this.crosshair=p(d.crosshair,ra(a.options.tooltip.crosshairs)[c?0:1],!1);var f,d=this.options.events;Da(this,a.axes)===-1&&(c&&!this.isColorAxis?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];if(a.inverted&&c&&this.reversed===t)this.reversed=!0;this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(f in d)N(this,f,d[f]);if(this.isLog)this.val2lin=
za,this.lin2val=ja},setOptions:function(a){this.options=w(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],w(L[this.coll],a))},defaultLabelFormatter:function(){var a=this.axis,b=this.value,c=a.categories,d=this.dateTimeLabelFormat,e=L.lang.numericSymbols,f=e&&e.length,g,h=a.options.labels.format,a=a.isLog?b:a.tickInterval;if(h)g=Ia(h,this);else if(c)g=b;else if(d)g=
bb(d,b);else if(f&&a>=1E3)for(;f--&&g===t;)c=Math.pow(1E3,f+1),a>=c&&e[f]!==null&&(g=Ga(b/c,-1)+e[f]);g===t&&(g=Q(b)>=1E4?Ga(b,0):Ga(b,-1,t,""));return g},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=null;a.buildStacks&&a.buildStacks();q(a.series,function(c){if(c.visible||!b.options.chart.ignoreHiddenSeries){var d;d=c.options.threshold;var e;a.hasVisibleSeries=!0;a.isLog&&d<=0&&(d=null);if(a.isXAxis){if(d=c.xData,d.length)a.dataMin=C(p(a.dataMin,d[0]),
Na(d)),a.dataMax=u(p(a.dataMax,d[0]),Ba(d))}else{c.getExtremes();e=c.dataMax;c=c.dataMin;if(s(c)&&s(e))a.dataMin=C(p(a.dataMin,c),c),a.dataMax=u(p(a.dataMax,e),e);if(s(d))if(a.dataMin>=d)a.dataMin=d,a.ignoreMinPadding=!0;else if(a.dataMax<d)a.dataMax=d,a.ignoreMaxPadding=!0}}})},translate:function(a,b,c,d,e,f){var g=1,h=0,i=d?this.oldTransA:this.transA,d=d?this.oldMin:this.min,j=this.minPixelPadding,e=(this.options.ordinal||this.isLog&&e)&&this.lin2val;if(!i)i=this.transA;if(c)g*=-1,h=this.len;this.reversed&&
(g*=-1,h-=g*(this.sector||this.len));b?(a=a*g+h,a-=j,a=a/i+d,e&&(a=this.lin2val(a))):(e&&(a=this.val2lin(a)),f==="between"&&(f=0.5),a=g*(a-d)*i+h+g*j+(ia(f)?i*f*this.pointRange:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,d,e){var f=this.chart,g=this.left,h=this.top,i,j,k=c&&f.oldChartHeight||f.chartHeight,l=c&&f.oldChartWidth||
f.chartWidth,m;i=this.transB;e=p(e,this.translate(a,null,null,c));a=c=v(e+i);i=j=v(k-e-i);if(isNaN(e))m=!0;else if(this.horiz){if(i=h,j=k-this.bottom,a<g||a>g+this.width)m=!0}else if(a=g,c=l-this.right,i<h||i>h+this.height)m=!0;return m&&!d?null:f.renderer.crispLine(["M",a,i,"L",c,j],b||1)},getLinearTickPositions:function(a,b,c){var d,e=ea(U(b/a)*a),f=ea(Ka(c/a)*a),g=[];if(b===c&&ia(b))return[b];for(b=e;b<=f;){g.push(b);b=ea(b+a);if(b===d)break;d=b}return g},getMinorTickPositions:function(){var a=
this.options,b=this.tickPositions,c=this.minorTickInterval,d=[],e;if(this.isLog){e=b.length;for(a=1;a<e;a++)d=d.concat(this.getLogTickPositions(c,b[a-1],b[a],!0))}else if(this.isDatetimeAxis&&a.minorTickInterval==="auto")d=d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c),this.min,this.max,a.startOfWeek)),d[0]<this.min&&d.shift();else for(b=this.min+(b[0]-this.min)%c;b<=this.max;b+=c)d.push(b);return d},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,e=this.dataMax-
this.dataMin>=this.minRange,f,g,h,i,j;if(this.isXAxis&&this.minRange===t&&!this.isLog)s(a.min)||s(a.max)?this.minRange=null:(q(this.series,function(a){i=a.xData;for(g=j=a.xIncrement?1:i.length-1;g>0;g--)if(h=i[g]-i[g-1],f===t||h<f)f=h}),this.minRange=C(f*5,this.dataMax-this.dataMin));if(c-b<this.minRange){var k=this.minRange;d=(k-c+b)/2;d=[b-d,p(a.min,b-d)];if(e)d[2]=this.dataMin;b=Ba(d);c=[b+k,p(a.max,b+k)];if(e)c[2]=this.dataMax;c=Na(c);c-b<k&&(d[0]=c-k,d[1]=p(a.min,c-k),b=Ba(d))}this.min=b;this.max=
c},setAxisTranslation:function(a){var b=this,c=b.max-b.min,d=b.axisPointRange||0,e,f=0,g=0,h=b.linkedParent,i=!!b.categories,j=b.transA;if(b.isXAxis||i||d)h?(f=h.minPointOffset,g=h.pointRangePadding):q(b.series,function(a){var h=i?1:b.isXAxis?a.pointRange:b.axisPointRange||0,j=a.options.pointPlacement,n=a.closestPointRange;h>c&&(h=0);d=u(d,h);f=u(f,Fa(j)?0:h/2);g=u(g,j==="on"?0:h);!a.noSharedTooltip&&s(n)&&(e=s(e)?C(e,n):n)}),h=b.ordinalSlope&&e?b.ordinalSlope/e:1,b.minPointOffset=f*=h,b.pointRangePadding=
g*=h,b.pointRange=C(d,c),b.closestPointRange=e;if(a)b.oldTransA=j;b.translationSlope=b.transA=j=b.len/(c+g||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=j*f},setTickPositions:function(a){var b=this,c=b.chart,d=b.options,e=d.startOnTick,f=d.endOnTick,g=b.isLog,h=b.isDatetimeAxis,i=b.isXAxis,j=b.isLinked,k=b.options.tickPositioner,l=d.maxPadding,m=d.minPadding,n=d.tickInterval,o=d.minTickInterval,Y=d.tickPixelInterval,E,I=b.categories;j?(b.linkedParent=c[b.coll][d.linkedTo],c=b.linkedParent.getExtremes(),
b.min=p(c.min,c.dataMin),b.max=p(c.max,c.dataMax),d.type!==b.linkedParent.options.type&&oa(11,1)):(b.min=p(b.userMin,d.min,b.dataMin),b.max=p(b.userMax,d.max,b.dataMax));if(g)!a&&C(b.min,p(b.dataMin,b.min))<=0&&oa(10,1),b.min=ea(za(b.min)),b.max=ea(za(b.max));if(b.range&&s(b.max))b.userMin=b.min=u(b.min,b.max-b.range),b.userMax=b.max,b.range=null;b.beforePadding&&b.beforePadding();b.adjustForMinRange();if(!I&&!b.axisPointRange&&!b.usePercentage&&!j&&s(b.min)&&s(b.max)&&(c=b.max-b.min)){if(!s(d.min)&&
!s(b.userMin)&&m&&(b.dataMin<0||!b.ignoreMinPadding))b.min-=c*m;if(!s(d.max)&&!s(b.userMax)&&l&&(b.dataMax>0||!b.ignoreMaxPadding))b.max+=c*l}if(ia(d.floor))b.min=u(b.min,d.floor);if(ia(d.ceiling))b.max=C(b.max,d.ceiling);b.min===b.max||b.min===void 0||b.max===void 0?b.tickInterval=1:j&&!n&&Y===b.linkedParent.options.tickPixelInterval?b.tickInterval=b.linkedParent.tickInterval:(b.tickInterval=p(n,I?1:(b.max-b.min)*Y/u(b.len,Y)),!s(n)&&b.len<Y&&!this.isRadial&&!this.isLog&&!I&&e&&f&&(E=!0,b.tickInterval/=
4));i&&!a&&q(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();if(b.postProcessTickInterval)b.tickInterval=b.postProcessTickInterval(b.tickInterval);if(b.pointRange)b.tickInterval=u(b.pointRange,b.tickInterval);if(!n&&b.tickInterval<o)b.tickInterval=o;if(!h&&!g&&!n)b.tickInterval=mb(b.tickInterval,null,lb(b.tickInterval),d);b.minorTickInterval=d.minorTickInterval==="auto"&&b.tickInterval?b.tickInterval/
5:d.minorTickInterval;b.tickPositions=a=d.tickPositions?[].concat(d.tickPositions):k&&k.apply(b,[b.min,b.max]);if(!a)!b.ordinalPositions&&(b.max-b.min)/b.tickInterval>u(2*b.len,200)&&oa(19,!0),a=h?b.getTimeTicks(b.normalizeTimeTickInterval(b.tickInterval,d.units),b.min,b.max,d.startOfWeek,b.ordinalPositions,b.closestPointRange,!0):g?b.getLogTickPositions(b.tickInterval,b.min,b.max):b.getLinearTickPositions(b.tickInterval,b.min,b.max),E&&a.splice(1,a.length-2),b.tickPositions=a;if(!j)d=a[0],g=a[a.length-
1],h=b.minPointOffset||0,!e&&!f&&!I&&a.length===2&&a.splice(1,0,(g+d)/2),e?b.min=d:b.min-h>d&&a.shift(),f?b.max=g:b.max+h<g&&a.pop(),a.length===1&&(e=Q(b.max)>1E13?1:0.001,b.min-=e,b.max+=e)},setMaxTicks:function(){var a=this.chart,b=a.maxTicks||{},c=this.tickPositions,d=this._maxTicksKey=[this.coll,this.pos,this.len].join("-");if(!this.isLinked&&!this.isDatetimeAxis&&c&&c.length>(b[d]||0)&&this.options.alignTicks!==!1)b[d]=c.length;a.maxTicks=b},adjustTickAmount:function(){var a=this._maxTicksKey,
b=this.tickPositions,c=this.chart.maxTicks;if(c&&c[a]&&!this.isDatetimeAxis&&!this.categories&&!this.isLinked&&this.options.alignTicks!==!1&&this.min!==t){var d=this.tickAmount,e=b.length;this.tickAmount=a=c[a];if(e<a){for(;b.length<a;)b.push(ea(b[b.length-1]+this.tickInterval));this.transA*=(e-1)/(a-1);this.max=b[b.length-1]}if(s(d)&&a!==d)this.isDirty=!0}},setScale:function(){var a=this.stacks,b,c,d,e;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();e=this.len!==
this.oldAxisLength;q(this.series,function(a){if(a.isDirtyData||a.isDirty||a.xAxis.isDirty)d=!0});if(e||d||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax){if(!this.isXAxis)for(b in a)for(c in a[b])a[b][c].total=null,a[b][c].cum=0;this.forceRedraw=!1;this.getSeriesExtremes();this.setTickPositions();this.oldUserMin=this.userMin;this.oldUserMax=this.userMax;if(!this.isDirty)this.isDirty=e||this.min!==this.oldMin||this.max!==this.oldMax}else if(!this.isXAxis){if(this.oldStacks)a=
this.stacks=this.oldStacks;for(b in a)for(c in a[b])a[b][c].cum=a[b][c].total}this.setMaxTicks()},setExtremes:function(a,b,c,d,e){var f=this,g=f.chart,c=p(c,!0),e=r(e,{min:a,max:b});K(f,"setExtremes",e,function(){f.userMin=a;f.userMax=b;f.eventArgs=e;f.isDirtyExtremes=!0;c&&g.redraw(d)})},zoom:function(a,b){var c=this.dataMin,d=this.dataMax,e=this.options;this.allowZoomOutside||(s(c)&&a<=C(c,p(e.min,c))&&(a=t),s(d)&&b>=u(d,p(e.max,d))&&(b=t));this.displayBtn=a!==t||b!==t;this.setExtremes(a,b,!1,t,
{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,d=this.horiz,e=p(b.width,a.plotWidth-c+(b.offsetRight||0)),f=p(b.height,a.plotHeight),g=p(b.top,a.plotTop),b=p(b.left,a.plotLeft+c),c=/%$/;c.test(f)&&(f=parseInt(f,10)/100*a.plotHeight);c.test(g)&&(g=parseInt(g,10)/100*a.plotHeight+a.plotTop);this.left=b;this.top=g;this.width=e;this.height=f;this.bottom=a.chartHeight-f-g;this.right=a.chartWidth-e-b;this.len=u(d?e:f,0);this.pos=d?b:g},getExtremes:function(){var a=
this.isLog;return{min:a?ea(ja(this.min)):this.min,max:a?ea(ja(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=b?ja(this.min):this.min,b=b?ja(this.max):this.max;c>a||a===null?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(p(a,0)-this.side*90+720)%360;return a>15&&a<165?"right":a>195&&a<345?"left":"center"},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,
e=a.tickPositions,f=a.ticks,g=a.horiz,h=a.side,i=b.inverted?[1,0,3,2][h]:h,j,k,l=0,m,n=0,o=d.title,Y=d.labels,E=0,I=b.axisOffset,b=b.clipOffset,D=[-1,1,1,-1][h],r,v=1,w=p(Y.maxStaggerLines,5),x,z,C,y,R;a.hasData=j=a.hasVisibleSeries||s(a.min)&&s(a.max)&&!!e;a.showAxis=k=j||p(d.showEmpty,!0);a.staggerLines=a.horiz&&Y.staggerLines;if(!a.axisGroup)a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).add(),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(),a.labelGroup=c.g("axis-labels").attr({zIndex:Y.zIndex||
7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels").add();if(j||a.isLinked){a.labelAlign=p(Y.align||a.autoLabelAlign(Y.rotation));q(e,function(b){f[b]?f[b].addLabel():f[b]=new Sa(a,b)});if(a.horiz&&!a.staggerLines&&w&&!Y.rotation){for(j=a.reversed?[].concat(e).reverse():e;v<w;){x=[];z=!1;for(r=0;r<j.length;r++)C=j[r],y=(y=f[C].label&&f[C].label.getBBox())?y.width:0,R=r%v,y&&(C=a.translate(C),x[R]!==t&&C<x[R]&&(z=!0),x[R]=C+y);if(z)v++;else break}if(v>1)a.staggerLines=v}q(e,function(b){if(h===
0||h===2||{1:"left",3:"right"}[h]===a.labelAlign)E=u(f[b].getLabelSize(),E)});if(a.staggerLines)E*=a.staggerLines,a.labelOffset=E}else for(r in f)f[r].destroy(),delete f[r];if(o&&o.text&&o.enabled!==!1){if(!a.axisTitle)a.axisTitle=c.text(o.text,0,0,o.useHTML).attr({zIndex:7,rotation:o.rotation||0,align:o.textAlign||{low:"left",middle:"center",high:"right"}[o.align]}).addClass("highcharts-"+this.coll.toLowerCase()+"-title").css(o.style).add(a.axisGroup),a.axisTitle.isNew=!0;if(k)l=a.axisTitle.getBBox()[g?
"height":"width"],m=o.offset,n=s(m)?0:p(o.margin,g?5:10);a.axisTitle[k?"show":"hide"]()}a.offset=D*p(d.offset,I[h]);c=h===2?a.tickBaseline:0;g=E+n+(E&&D*(g?p(Y.y,a.tickBaseline+8):Y.x)-c);a.axisTitleMargin=p(m,g);I[h]=u(I[h],a.axisTitleMargin+l+D*a.offset,g);b[i]=u(b[i],U(d.lineWidth/2)*2)},getLinePath:function(a){var b=this.chart,c=this.opposite,d=this.offset,e=this.horiz,f=this.left+(c?this.width:0)+d,d=b.chartHeight-this.bottom-(c?this.height:0)+d;c&&(a*=-1);return b.renderer.crispLine(["M",e?
this.left:f,e?d:this.top,"L",e?b.chartWidth-this.right:f,e?d:b.chartHeight-this.bottom],a)},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,d=this.len,e=this.options.title,f=a?b:c,g=this.opposite,h=this.offset,i=z(e.style.fontSize||12),d={low:f+(a?0:d),middle:f+d/2,high:f+(a?d:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*(g?-1:1)*this.axisTitleMargin+(this.side===2?i:0);return{x:a?d:b+(g?this.width:0)+h+(e.x||0),y:a?b-(g?this.height:0)+h:d+(e.y||0)}},render:function(){var a=this,
b=a.horiz,c=a.reversed,d=a.chart,e=d.renderer,f=a.options,g=a.isLog,h=a.isLinked,i=a.tickPositions,j,k=a.axisTitle,l=a.ticks,m=a.minorTicks,n=a.alternateBands,o=f.stackLabels,p=f.alternateGridColor,E=a.tickmarkOffset,I=f.lineWidth,D=d.hasRendered&&s(a.oldMin)&&!isNaN(a.oldMin),r=a.hasData,u=a.showAxis,v,w=f.labels.overflow,x=a.justifyLabels=b&&w!==!1,z;a.labelEdge.length=0;a.justifyToPlot=w==="justify";q([l,m,n],function(a){for(var b in a)a[b].isActive=!1});if(r||h)if(a.minorTickInterval&&!a.categories&&
q(a.getMinorTickPositions(),function(b){m[b]||(m[b]=new Sa(a,b,"minor"));D&&m[b].isNew&&m[b].render(null,!0);m[b].render(null,!1,1)}),i.length&&(j=i.slice(),(b&&c||!b&&!c)&&j.reverse(),x&&(j=j.slice(1).concat([j[0]])),q(j,function(b,c){x&&(c=c===j.length-1?0:c+1);if(!h||b>=a.min&&b<=a.max)l[b]||(l[b]=new Sa(a,b)),D&&l[b].isNew&&l[b].render(c,!0,0.1),l[b].render(c)}),E&&a.min===0&&(l[-1]||(l[-1]=new Sa(a,-1,null,!0)),l[-1].render(-1))),p&&q(i,function(b,c){if(c%2===0&&b<a.max)n[b]||(n[b]=new S.PlotLineOrBand(a)),
v=b+E,z=i[c+1]!==t?i[c+1]+E:a.max,n[b].options={from:g?ja(v):v,to:g?ja(z):z,color:p},n[b].render(),n[b].isActive=!0}),!a._addedPlotLB)q((f.plotLines||[]).concat(f.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0;q([l,m,n],function(a){var b,c,e=[],f=va?va.duration||500:0,g=function(){for(c=e.length;c--;)a[e[c]]&&!a[e[c]].isActive&&(a[e[c]].destroy(),delete a[e[c]])};for(b in a)if(!a[b].isActive)a[b].render(b,!1,0),a[b].isActive=!1,e.push(b);a===n||!d.hasRendered||!f?g():f&&setTimeout(g,
f)});if(I)b=a.getLinePath(I),a.axisLine?a.axisLine.animate({d:b}):a.axisLine=e.path(b).attr({stroke:f.lineColor,"stroke-width":I,zIndex:7}).add(a.axisGroup),a.axisLine[u?"show":"hide"]();if(k&&u)k[k.isNew?"attr":"animate"](a.getTitlePosition()),k.isNew=!1;o&&o.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.render();q(this.plotLinesAndBands,function(a){a.render()});q(this.series,function(a){a.isDirty=!0})},destroy:function(a){var b=this,c=b.stacks,d,e=b.plotLinesAndBands;a||X(b);
for(d in c)Oa(c[d]),c[d]=null;q([b.ticks,b.minorTicks,b.alternateBands],function(a){Oa(a)});for(a=e.length;a--;)e[a].destroy();q("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","),function(a){b[a]&&(b[a]=b[a].destroy())});this.cross&&this.cross.destroy()},drawCrosshair:function(a,b){if(this.crosshair)if((s(b)||!p(this.crosshair.snap,!0))===!1)this.hideCrosshair();else{var c,d=this.crosshair,e=d.animation;p(d.snap,!0)?s(b)&&(c=this.chart.inverted!=this.horiz?b.plotX:
this.len-b.plotY):c=this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos;c=this.isRadial?this.getPlotLinePath(this.isXAxis?b.x:p(b.stackY,b.y)):this.getPlotLinePath(null,null,null,null,c);if(c===null)this.hideCrosshair();else if(this.cross)this.cross.attr({visibility:"visible"})[e?"animate":"attr"]({d:c},e);else{e={"stroke-width":d.width||1,stroke:d.color||"#C0C0C0",zIndex:d.zIndex||2};if(d.dashStyle)e.dashstyle=d.dashStyle;this.cross=this.chart.renderer.path(c).attr(e).add()}}},hideCrosshair:function(){this.cross&&
this.cross.hide()}};r(ma.prototype,{getPlotBandPath:function(a,b){var c=this.getPlotLinePath(b),d=this.getPlotLinePath(a);d&&c?d.push(c[4],c[5],c[1],c[2]):d=null;return d},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(a,b){var c=(new S.PlotLineOrBand(this,a)).render(),d=this.userOptions;c&&(b&&(d[b]=d[b]||[],d[b].push(a)),this.plotLinesAndBands.push(c));return c},removePlotBandOrLine:function(a){for(var b=
this.plotLinesAndBands,c=this.options,d=this.userOptions,e=b.length;e--;)b[e].id===a&&b[e].destroy();q([c.plotLines||[],d.plotLines||[],c.plotBands||[],d.plotBands||[]],function(b){for(e=b.length;e--;)b[e].id===a&&ka(b,b[e])})}});ma.prototype.getTimeTicks=function(a,b,c,d){var e=[],f={},g=L.global.useUTC,h,i=new Date(b-Ra),j=a.unitRange,k=a.count;if(s(b)){j>=B.second&&(i.setMilliseconds(0),i.setSeconds(j>=B.minute?0:k*U(i.getSeconds()/k)));if(j>=B.minute)i[Bb](j>=B.hour?0:k*U(i[ob]()/k));if(j>=B.hour)i[Cb](j>=
B.day?0:k*U(i[pb]()/k));if(j>=B.day)i[rb](j>=B.month?1:k*U(i[Wa]()/k));j>=B.month&&(i[Db](j>=B.year?0:k*U(i[eb]()/k)),h=i[fb]());j>=B.year&&(h-=h%k,i[Eb](h));if(j===B.week)i[rb](i[Wa]()-i[qb]()+p(d,1));b=1;Ra&&(i=new Date(i.getTime()+Ra));h=i[fb]();for(var d=i.getTime(),l=i[eb](),m=i[Wa](),n=g?Ra:(864E5+i.getTimezoneOffset()*6E4)%864E5;d<c;)e.push(d),j===B.year?d=db(h+b*k,0):j===B.month?d=db(h,l+b*k):!g&&(j===B.day||j===B.week)?d=db(h,l,m+b*k*(j===B.day?1:7)):d+=j*k,b++;e.push(d);q(vb(e,function(a){return j<=
B.hour&&a%B.day===n}),function(a){f[a]="day"})}e.info=r(a,{higherRanks:f,totalRange:j*k});return e};ma.prototype.normalizeTimeTickInterval=function(a,b){var c=b||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]],d=c[c.length-1],e=B[d[0]],f=d[1],g;for(g=0;g<c.length;g++)if(d=c[g],e=B[d[0]],f=d[1],c[g+1]&&a<=(e*f[f.length-1]+B[c[g+1][0]])/2)break;e===B.year&&
a<5*e&&(f=[1,2,5]);c=mb(a/e,f,d[0]==="year"?u(lb(a/e),1):1);return{unitRange:e,count:c,unitName:d[0]}};ma.prototype.getLogTickPositions=function(a,b,c,d){var e=this.options,f=this.len,g=[];if(!d)this._minorAutoInterval=null;if(a>=0.5)a=v(a),g=this.getLinearTickPositions(a,b,c);else if(a>=0.08)for(var f=U(b),h,i,j,k,l,e=a>0.3?[1,2,4]:a>0.15?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<c+1&&!l;f++){i=e.length;for(h=0;h<i&&!l;h++)j=za(ja(f)*e[h]),j>b&&(!d||k<=c)&&k!==t&&g.push(k),k>c&&(l=!0),k=j}else if(b=ja(b),
c=ja(c),a=e[d?"minorTickInterval":"tickInterval"],a=p(a==="auto"?null:a,this._minorAutoInterval,(c-b)*(e.tickPixelInterval/(d?5:1))/((d?f/this.tickPositions.length:f)||1)),a=mb(a,null,lb(a)),g=Ua(this.getLinearTickPositions(a,b,c),za),!d)this._minorAutoInterval=a/5;if(!d)this.tickInterval=a;return g};var Mb=S.Tooltip=function(){this.init.apply(this,arguments)};Mb.prototype={init:function(a,b){var c=b.borderWidth,d=b.style,e=z(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,
y:0};this.isHidden=!0;this.label=a.renderer.label("",0,0,b.shape||"callout",null,null,b.useHTML,null,"tooltip").attr({padding:e,fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).add().attr({y:-9999});ga||this.label.shadow(b.shadow);this.shared=b.shared},destroy:function(){if(this.label)this.label=this.label.destroy();clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,c,d){var e=this,f=e.now,g=e.options.animation!==!1&&!e.isHidden&&
(Q(a-f.x)>1||Q(b-f.y)>1),h=e.followPointer||e.len>1;r(f,{x:g?(2*f.x+a)/3:a,y:g?(f.y+b)/2:b,anchorX:h?t:g?(2*f.anchorX+c)/3:c,anchorY:h?t:g?(f.anchorY+d)/2:d});e.label.attr(f);if(g)clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,b,c,d)},32)},hide:function(){var a=this,b;clearTimeout(this.hideTimer);if(!this.isHidden)b=this.chart.hoverPoints,this.hideTimer=setTimeout(function(){a.label.fadeOut();a.isHidden=!0},p(this.options.hideDelay,500)),b&&q(b,function(a){a.setState()}),
this.chart.hoverPoints=null},getAnchor:function(a,b){var c,d=this.chart,e=d.inverted,f=d.plotTop,g=0,h=0,i,a=ra(a);c=a[0].tooltipPos;this.followPointer&&b&&(b.chartX===t&&(b=d.pointer.normalize(b)),c=[b.chartX-d.plotLeft,b.chartY-f]);c||(q(a,function(a){i=a.series.yAxis;g+=a.plotX;h+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&i?i.top-f:0)}),g/=a.length,h/=a.length,c=[e?d.plotWidth-h:g,this.shared&&!e&&a.length>1&&b?b.chartY-f:e?d.plotHeight-g:h]);return Ua(c,v)},getPosition:function(a,b,c){var d=
this.chart,e=this.distance,f={},g,h=["y",d.chartHeight,b,c.plotY+d.plotTop],i=["x",d.chartWidth,a,c.plotX+d.plotLeft],j=c.ttBelow||d.inverted&&!c.negative||!d.inverted&&c.negative,k=function(a,b,c,d){var g=c<d-e,b=d+e+c<b,c=d-e-c;d+=e;if(j&&b)f[a]=d;else if(!j&&g)f[a]=c;else if(g)f[a]=c;else if(b)f[a]=d;else return!1},l=function(a,b,c,d){if(d<e||d>b-e)return!1;else f[a]=d<c/2?1:d>b-c/2?b-c-2:d-c/2},m=function(a){var b=h;h=i;i=b;g=a},n=function(){k.apply(0,h)!==!1?l.apply(0,i)===!1&&!g&&(m(!0),n()):
g?f.x=f.y=0:(m(!0),n())};(d.inverted||this.len>1)&&m();n();return f},defaultFormatter:function(a){var b=this.points||ra(this),c=b[0].series,d;d=[a.tooltipHeaderFormatter(b[0])];q(b,function(a){c=a.series;d.push(c.tooltipFormatter&&c.tooltipFormatter(a)||a.point.tooltipFormatter(c.tooltipOptions.pointFormat))});d.push(a.options.footerFormat||"");return d.join("")},refresh:function(a,b){var c=this.chart,d=this.label,e=this.options,f,g,h={},i,j=[];i=e.formatter||this.defaultFormatter;var h=c.hoverPoints,
k,l=this.shared;clearTimeout(this.hideTimer);this.followPointer=ra(a)[0].series.tooltipOptions.followPointer;g=this.getAnchor(a,b);f=g[0];g=g[1];l&&(!a.series||!a.series.noSharedTooltip)?(c.hoverPoints=a,h&&q(h,function(a){a.setState()}),q(a,function(a){a.setState("hover");j.push(a.getLabelConfig())}),h={x:a[0].category,y:a[0].y},h.points=j,this.len=j.length,a=a[0]):h=a.getLabelConfig();i=i.call(h,this);h=a.series;this.distance=p(h.tooltipOptions.distance,16);i===!1?this.hide():(this.isHidden&&(ab(d),
d.attr("opacity",1).show()),d.attr({text:i}),k=e.borderColor||a.color||h.color||"#606060",d.attr({stroke:k}),this.updatePosition({plotX:f,plotY:g,negative:a.negative,ttBelow:a.ttBelow}),this.isHidden=!1);K(c,"tooltipRefresh",{text:i,x:f+c.plotLeft,y:g+c.plotTop,borderColor:k})},updatePosition:function(a){var b=this.chart,c=this.label,c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(v(c.x),v(c.y),a.plotX+b.plotLeft,a.plotY+b.plotTop)},tooltipHeaderFormatter:function(a){var b=
a.series,c=b.tooltipOptions,d=c.dateTimeLabelFormats,e=c.xDateFormat,f=b.xAxis,g=f&&f.options.type==="datetime"&&ia(a.key),c=c.headerFormat,f=f&&f.closestPointRange,h;if(g&&!e){if(f)for(h in B){if(B[h]>=f||B[h]<=B.day&&a.key%B[h]>0){e=d[h];break}}else e=d.day;e=e||d.year}g&&e&&(c=c.replace("{point.key}","{point.key:"+e+"}"));return Ia(c,{point:a,series:b})}};var pa;Za=x.documentElement.ontouchstart!==t;var Va=S.Pointer=function(a,b){this.init(a,b)};Va.prototype={init:function(a,b){var c=b.chart,d=
c.events,e=ga?"":c.zoomType,c=a.inverted,f;this.options=b;this.chart=a;this.zoomX=f=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=f&&!c||e&&c;this.zoomVert=e&&!c||f&&c;this.hasZoom=f||e;this.runChartClick=d&&!!d.click;this.pinchDown=[];this.lastValidTouch={};if(S.Tooltip&&b.tooltip.enabled)a.tooltip=new Mb(a,b.tooltip),this.followTouchMove=b.tooltip.followTouchMove;this.setDOMEvents()},normalize:function(a,b){var c,d,a=a||window.event,a=Sb(a);if(!a.target)a.target=a.srcElement;d=a.touches?a.touches.length?
a.touches.item(0):a.changedTouches[0]:a;if(!b)this.chartPosition=b=Rb(this.chart.container);d.pageX===t?(c=u(a.x,a.clientX-b.left),d=a.y):(c=d.pageX-b.left,d=d.pageY-b.top);return r(a,{chartX:v(c),chartY:v(d)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};q(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},getIndex:function(a){var b=this.chart;return b.inverted?b.plotHeight+b.plotTop-a.chartY:a.chartX-b.plotLeft},
runPointActions:function(a){var b=this.chart,c=b.series,d=b.tooltip,e,f,g=b.hoverPoint,h=b.hoverSeries,i,j,k=b.chartWidth,l=this.getIndex(a);if(d&&this.options.tooltip.shared&&(!h||!h.noSharedTooltip)){f=[];i=c.length;for(j=0;j<i;j++)if(c[j].visible&&c[j].options.enableMouseTracking!==!1&&!c[j].noSharedTooltip&&c[j].singularTooltips!==!0&&c[j].tooltipPoints.length&&(e=c[j].tooltipPoints[l])&&e.series)e._dist=Q(l-e.clientX),k=C(k,e._dist),f.push(e);for(i=f.length;i--;)f[i]._dist>k&&f.splice(i,1);if(f.length&&
f[0].clientX!==this.hoverX)d.refresh(f,a),this.hoverX=f[0].clientX}c=h&&h.tooltipOptions.followPointer;if(h&&h.tracker&&!c){if((e=h.tooltipPoints[l])&&e!==g)e.onMouseOver(a)}else d&&c&&!d.isHidden&&(h=d.getAnchor([{}],a),d.updatePosition({plotX:h[0],plotY:h[1]}));if(d&&!this._onDocumentMouseMove)this._onDocumentMouseMove=function(a){if(W[pa])W[pa].pointer.onDocumentMouseMove(a)},N(x,"mousemove",this._onDocumentMouseMove);q(b.axes,function(b){b.drawCrosshair(a,p(e,g))})},reset:function(a){var b=this.chart,
c=b.hoverSeries,d=b.hoverPoint,e=b.tooltip,f=e&&e.shared?b.hoverPoints:d;(a=a&&e&&f)&&ra(f)[0].plotX===t&&(a=!1);if(a)e.refresh(f),d&&d.setState(d.state,!0);else{if(d)d.onMouseOut();if(c)c.onMouseOut();e&&e.hide();if(this._onDocumentMouseMove)X(x,"mousemove",this._onDocumentMouseMove),this._onDocumentMouseMove=null;q(b.axes,function(a){a.hideCrosshair()});this.hoverX=null}},scaleGroups:function(a,b){var c=this.chart,d;q(c.series,function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&(e.group.attr(d),
e.markerGroup&&(e.markerGroup.attr(d),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,e=a.chartY,f=this.zoomHor,g=this.zoomVert,h=b.plotLeft,i=b.plotTop,j=b.plotWidth,k=b.plotHeight,l,m=this.mouseDownX,n=this.mouseDownY,
o=c.panKey&&a[c.panKey+"Key"];d<h?d=h:d>h+j&&(d=h+j);e<i?e=i:e>i+k&&(e=i+k);this.hasDragged=Math.sqrt(Math.pow(m-d,2)+Math.pow(n-e,2));if(this.hasDragged>10){l=b.isInsidePlot(m-h,n-i);if(b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&l&&!o&&!this.selectionMarker)this.selectionMarker=b.renderer.rect(h,i,f?1:j,g?1:k,0).attr({fill:c.selectionMarkerFill||"rgba(69,114,167,0.25)",zIndex:7}).add();this.selectionMarker&&f&&(d-=m,this.selectionMarker.attr({width:Q(d),x:(d>0?0:d)+m}));this.selectionMarker&&
g&&(d=e-n,this.selectionMarker.attr({height:Q(d),y:(d>0?0:d)+n}));l&&!this.selectionMarker&&c.panning&&b.pan(a,c.panning)}},drop:function(a){var b=this.chart,c=this.hasPinched;if(this.selectionMarker){var d={xAxis:[],yAxis:[],originalEvent:a.originalEvent||a},e=this.selectionMarker,f=e.attr?e.attr("x"):e.x,g=e.attr?e.attr("y"):e.y,h=e.attr?e.attr("width"):e.width,i=e.attr?e.attr("height"):e.height,j;if(this.hasDragged||c)q(b.axes,function(b){if(b.zoomEnabled){var c=b.horiz,e=a.type==="touchend"?b.minPixelPadding:
0,n=b.toValue((c?f:g)+e),c=b.toValue((c?f+h:g+i)-e);!isNaN(n)&&!isNaN(c)&&(d[b.coll].push({axis:b,min:C(n,c),max:u(n,c)}),j=!0)}}),j&&K(b,"selection",d,function(a){b.zoom(r(a,c?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();c&&this.scaleGroups()}if(b)A(b.container,{cursor:b._cursor}),b.cancelClick=this.hasDragged>10,b.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[]},onContainerMouseDown:function(a){a=this.normalize(a);a.preventDefault&&a.preventDefault();
this.dragStart(a)},onDocumentMouseUp:function(a){W[pa]&&W[pa].pointer.drop(a)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition,d=b.hoverSeries,a=this.normalize(a,c);c&&d&&!this.inClass(a.target,"highcharts-tracker")&&!b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)&&this.reset()},onContainerMouseLeave:function(){var a=W[pa];if(a)a.pointer.reset(),a.pointer.chartPosition=null},onContainerMouseMove:function(a){var b=this.chart;pa=b.index;a=this.normalize(a);a.returnValue=
!1;b.mouseIsDown==="mousedown"&&this.drag(a);(this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop))&&!b.openMenu&&this.runPointActions(a)},inClass:function(a,b){for(var c;a;){if(c=F(a,"class"))if(c.indexOf(b)!==-1)return!0;else if(c.indexOf("highcharts-container")!==-1)return!1;a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries,c=(a=a.relatedTarget||a.toElement)&&a.point&&a.point.series;if(b&&!b.options.stickyTracking&&!this.inClass(a,
"highcharts-tooltip")&&c!==b)b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop,a=this.normalize(a);a.cancelBubble=!0;b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(K(c.series,"click",r(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(r(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&K(b,"click",a)))},setDOMEvents:function(){var a=this,b=a.chart.container;b.onmousedown=function(b){a.onContainerMouseDown(b)};
b.onmousemove=function(b){a.onContainerMouseMove(b)};b.onclick=function(b){a.onContainerClick(b)};N(b,"mouseleave",a.onContainerMouseLeave);$a===1&&N(x,"mouseup",a.onDocumentMouseUp);if(Za)b.ontouchstart=function(b){a.onContainerTouchStart(b)},b.ontouchmove=function(b){a.onContainerTouchMove(b)},$a===1&&N(x,"touchend",a.onDocumentTouchEnd)},destroy:function(){var a;X(this.chart.container,"mouseleave",this.onContainerMouseLeave);$a||(X(x,"mouseup",this.onDocumentMouseUp),X(x,"touchend",this.onDocumentTouchEnd));
clearInterval(this.tooltipTimeout);for(a in this)this[a]=null}};r(S.Pointer.prototype,{pinchTranslate:function(a,b,c,d,e,f){(this.zoomHor||this.pinchHor)&&this.pinchTranslateDirection(!0,a,b,c,d,e,f);(this.zoomVert||this.pinchVert)&&this.pinchTranslateDirection(!1,a,b,c,d,e,f)},pinchTranslateDirection:function(a,b,c,d,e,f,g,h){var i=this.chart,j=a?"x":"y",k=a?"X":"Y",l="chart"+k,m=a?"width":"height",n=i["plot"+(a?"Left":"Top")],o,p,q=h||1,r=i.inverted,D=i.bounds[a?"h":"v"],u=b.length===1,s=b[0][l],
v=c[0][l],t=!u&&b[1][l],w=!u&&c[1][l],x,c=function(){!u&&Q(s-t)>20&&(q=h||Q(v-w)/Q(s-t));p=(n-v)/q+s;o=i["plot"+(a?"Width":"Height")]/q};c();b=p;b<D.min?(b=D.min,x=!0):b+o>D.max&&(b=D.max-o,x=!0);x?(v-=0.8*(v-g[j][0]),u||(w-=0.8*(w-g[j][1])),c()):g[j]=[v,w];r||(f[j]=p-n,f[m]=o);f=r?1/q:q;e[m]=o;e[j]=b;d[r?a?"scaleY":"scaleX":"scale"+k]=q;d["translate"+k]=f*n+(v-f*s)},pinch:function(a){var b=this,c=b.chart,d=b.pinchDown,e=b.followTouchMove,f=a.touches,g=f.length,h=b.lastValidTouch,i=b.hasZoom,j=b.selectionMarker,
k={},l=g===1&&(b.inClass(a.target,"highcharts-tracker")&&c.runTrackerClick||c.runChartClick),m={};(i||e)&&!l&&a.preventDefault();Ua(f,function(a){return b.normalize(a)});if(a.type==="touchstart")q(f,function(a,b){d[b]={chartX:a.chartX,chartY:a.chartY}}),h.x=[d[0].chartX,d[1]&&d[1].chartX],h.y=[d[0].chartY,d[1]&&d[1].chartY],q(c.axes,function(a){if(a.zoomEnabled){var b=c.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,e=a.toPixels(p(a.options.min,a.dataMin)),f=a.toPixels(p(a.options.max,a.dataMax)),g=
C(e,f),e=u(e,f);b.min=C(a.pos,g-d);b.max=u(a.pos+a.len,e+d)}});else if(d.length){if(!j)b.selectionMarker=j=r({destroy:sa},c.plotBox);b.pinchTranslate(d,f,k,j,m,h);b.hasPinched=i;b.scaleGroups(k,m);!i&&e&&g===1&&this.runPointActions(b.normalize(a))}},onContainerTouchStart:function(a){var b=this.chart;pa=b.index;a.touches.length===1?(a=this.normalize(a),b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)?(this.runPointActions(a),this.pinch(a)):this.reset()):a.touches.length===2&&this.pinch(a)},onContainerTouchMove:function(a){(a.touches.length===
1||a.touches.length===2)&&this.pinch(a)},onDocumentTouchEnd:function(a){W[pa]&&W[pa].pointer.drop(a)}});if(H.PointerEvent||H.MSPointerEvent){var ua={},yb=!!H.PointerEvent,Wb=function(){var a,b=[];b.item=function(a){return this[a]};for(a in ua)ua.hasOwnProperty(a)&&b.push({pageX:ua[a].pageX,pageY:ua[a].pageY,target:ua[a].target});return b},zb=function(a,b,c,d){a=a.originalEvent||a;if((a.pointerType==="touch"||a.pointerType===a.MSPOINTER_TYPE_TOUCH)&&W[pa])d(a),d=W[pa].pointer,d[b]({type:c,target:a.currentTarget,
preventDefault:sa,touches:Wb()})};r(Va.prototype,{onContainerPointerDown:function(a){zb(a,"onContainerTouchStart","touchstart",function(a){ua[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){zb(a,"onContainerTouchMove","touchmove",function(a){ua[a.pointerId]={pageX:a.pageX,pageY:a.pageY};if(!ua[a.pointerId].target)ua[a.pointerId].target=a.currentTarget})},onDocumentPointerUp:function(a){zb(a,"onContainerTouchEnd","touchend",function(a){delete ua[a.pointerId]})},
batchMSEvents:function(a){a(this.chart.container,yb?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,yb?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(x,yb?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});Ma(Va.prototype,"init",function(a,b,c){a.call(this,b,c);(this.hasZoom||this.followTouchMove)&&A(b.container,{"-ms-touch-action":P,"touch-action":P})});Ma(Va.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&
this.batchMSEvents(N)});Ma(Va.prototype,"destroy",function(a){this.batchMSEvents(X);a.call(this)})}var kb=S.Legend=function(a,b){this.init(a,b)};kb.prototype={init:function(a,b){var c=this,d=b.itemStyle,e=p(b.padding,8),f=b.itemMarginTop||0;this.options=b;if(b.enabled)c.itemStyle=d,c.itemHiddenStyle=w(d,b.itemHiddenStyle),c.itemMarginTop=f,c.padding=e,c.initialItemX=e,c.initialItemY=e-5,c.maxItemWidth=0,c.chart=a,c.itemHeight=0,c.lastLineHeight=0,c.symbolWidth=p(b.symbolWidth,16),c.pages=[],c.render(),
N(c.chart,"endResize",function(){c.positionCheckboxes()})},colorizeItem:function(a,b){var c=this.options,d=a.legendItem,e=a.legendLine,f=a.legendSymbol,g=this.itemHiddenStyle.color,c=b?c.itemStyle.color:g,h=b?a.legendColor||a.color||"#CCC":g,g=a.options&&a.options.marker,i={fill:h},j;d&&d.css({fill:c,color:c});e&&e.attr({stroke:h});if(f){if(g&&f.isMarker)for(j in i.stroke=h,g=a.convertAttribs(g),g)d=g[j],d!==t&&(i[j]=d);f.attr(i)}},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,
d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;a.legendGroup&&a.legendGroup.translate(b?e:this.legendWidth-e-2*c-4,d);if(f)f.x=e,f.y=d},destroyItem:function(a){var b=a.checkbox;q(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&Pa(a.checkbox)},destroy:function(){var a=this.group,b=this.box;if(b)this.box=b.destroy();if(a)this.group=a.destroy()},positionCheckboxes:function(a){var b=this.group.alignAttr,c,d=this.clipHeight||this.legendHeight;if(b)c=
b.translateY,q(this.allItems,function(e){var f=e.checkbox,g;f&&(g=c+f.y+(a||0)+3,A(f,{left:b.translateX+e.checkboxOffset+f.x-20+"px",top:g+"px",display:g>c-6&&g<c+d-6?"":P}))})},renderTitle:function(){var a=this.padding,b=this.options.title,c=0;if(b.text){if(!this.title)this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group);a=this.title.getBBox();c=a.height;this.offsetWidth=a.width;this.contentGroup.attr({translateY:c})}this.titleHeight=
c},renderItem:function(a){var b=this.chart,c=b.renderer,d=this.options,e=d.layout==="horizontal",f=this.symbolWidth,g=d.symbolPadding,h=this.itemStyle,i=this.itemHiddenStyle,j=this.padding,k=e?p(d.itemDistance,20):0,l=!d.rtl,m=d.width,n=d.itemMarginBottom||0,o=this.itemMarginTop,q=this.initialItemX,r=a.legendItem,s=a.series&&a.series.drawLegendSymbol?a.series:a,D=s.options,D=this.createCheckboxForItem&&D&&D.showCheckbox,t=d.useHTML;if(!r){a.legendGroup=c.g("legend-item").attr({zIndex:1}).add(this.scrollGroup);
a.legendItem=r=c.text(d.labelFormat?Ia(d.labelFormat,a):d.labelFormatter.call(a),l?f+g:-g,this.baseline||0,t).css(w(a.visible?h:i)).attr({align:l?"left":"right",zIndex:2}).add(a.legendGroup);if(!this.baseline)this.baseline=c.fontMetrics(h.fontSize,r).f+3+o,r.attr("y",this.baseline);s.drawLegendSymbol(this,a);this.setItemEvents&&this.setItemEvents(a,r,t,h,i);this.colorizeItem(a,a.visible);D&&this.createCheckboxForItem(a)}c=r.getBBox();f=a.checkboxOffset=d.itemWidth||a.legendItemWidth||f+g+c.width+
k+(D?20:0);this.itemHeight=g=v(a.legendItemHeight||c.height);if(e&&this.itemX-q+f>(m||b.chartWidth-2*j-q-d.x))this.itemX=q,this.itemY+=o+this.lastLineHeight+n,this.lastLineHeight=0;this.maxItemWidth=u(this.maxItemWidth,f);this.lastItemY=o+this.itemY+n;this.lastLineHeight=u(g,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];e?this.itemX+=f:(this.itemY+=o+g+n,this.lastLineHeight=g);this.offsetWidth=m||u((e?this.itemX-q-k:f)+j,this.offsetWidth)},getAllItems:function(){var a=[];q(this.chart.series,
function(b){var c=b.options;if(p(c.showInLegend,!s(c.linkedTo)?t:!1,!0))a=a.concat(b.legendItems||(c.legendType==="point"?b.data:b))});return a},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.group,e,f,g,h,i=a.box,j=a.options,k=a.padding,l=j.borderWidth,m=j.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;if(!d)a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup);a.renderTitle();
e=a.getAllItems();nb(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});j.reversed&&e.reverse();a.allItems=e;a.display=f=!!e.length;q(e,function(b){a.renderItem(b)});g=j.width||a.offsetWidth;h=a.lastItemY+a.lastLineHeight+a.titleHeight;h=a.handleOverflow(h);if(l||m){g+=k;h+=k;if(i){if(g>0&&h>0)i[i.isNew?"attr":"animate"](i.crisp({width:g,height:h})),i.isNew=!1}else a.box=i=c.rect(0,0,g,h,j.borderRadius,l||0).attr({stroke:j.borderColor,"stroke-width":l||
0,fill:m||P}).add(d).shadow(j.shadow),i.isNew=!0;i[f?"show":"hide"]()}a.legendWidth=g;a.legendHeight=h;q(e,function(b){a.positionItem(b)});f&&d.align(r({width:g,height:h},j),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,f=e.y,f=c.spacingBox.height+(e.verticalAlign==="top"?-f:f)-this.padding,g=e.maxHeight,h,i=this.clipRect,j=e.navigation,k=p(j.animation,!0),l=j.arrowSize||12,m=this.nav,n=this.pages,o,r=this.allItems;
e.layout==="horizontal"&&(f/=2);g&&(f=C(f,g));n.length=0;if(a>f&&!e.useHTML){this.clipHeight=h=u(f-20-this.titleHeight-this.padding,0);this.currentPage=p(this.currentPage,1);this.fullHeight=a;q(r,function(a,b){var c=a._legendItemPos[1],d=v(a.legendItem.getBBox().height),e=n.length;if(!e||c-n[e-1]>h&&(o||c)!==n[e-1])n.push(o||c),e++;b===r.length-1&&c+d-n[e-1]>h&&n.push(c);c!==o&&(o=c)});if(!i)i=b.clipRect=d.clipRect(0,this.padding,9999,0),b.contentGroup.clip(i);i.attr({height:h});if(!m)this.nav=m=
d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,l,l).on("click",function(){b.scroll(-1,k)}).add(m),this.pager=d.text("",15,10).css(j.style).add(m),this.down=d.symbol("triangle-down",0,0,l,l).on("click",function(){b.scroll(1,k)}).add(m);b.scroll(0);a=f}else if(m)i.attr({height:c.chartHeight}),m.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0;return a},scroll:function(a,b){var c=this.pages,d=c.length,e=this.currentPage+a,f=this.clipHeight,g=this.options.navigation,
h=g.activeColor,g=g.inactiveColor,i=this.pager,j=this.padding;e>d&&(e=d);if(e>0)b!==t&&Qa(b,this.chart),this.nav.attr({translateX:j,translateY:f+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({fill:e===1?g:h}).css({cursor:e===1?"default":"pointer"}),i.attr({text:e+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,fill:e===d?g:h}).css({cursor:e===d?"default":"pointer"}),c=-c[e-1]+this.initialItemY,this.scrollGroup.animate({translateY:c}),this.currentPage=e,this.positionCheckboxes(c)}};
M=S.LegendSymbolMixin={drawRectangle:function(a,b){var c=a.options.symbolHeight||12;b.legendSymbol=this.chart.renderer.rect(0,a.baseline-5-c/2,a.symbolWidth,c,a.options.symbolRadius||0).attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options,c=b.marker,d;d=a.symbolWidth;var e=this.chart.renderer,f=this.legendGroup,a=a.baseline-v(e.fontMetrics(a.options.itemStyle.fontSize,this.legendItem).b*0.3),g;if(b.lineWidth){g={"stroke-width":b.lineWidth};if(b.dashStyle)g.dashstyle=
b.dashStyle;this.legendLine=e.path(["M",0,a,"L",d,a]).attr(g).add(f)}if(c&&c.enabled!==!1)b=c.radius,this.legendSymbol=d=e.symbol(this.symbol,d/2-b,a-b,2*b,2*b).add(f),d.isMarker=!0}};(/Trident\/7\.0/.test(wa)||Ta)&&Ma(kb.prototype,"positionItem",function(a,b){var c=this,d=function(){b._legendItemPos&&a.call(c,b)};d();setTimeout(d)});Xa.prototype={init:function(a,b){var c,d=a.series;a.series=null;c=w(L,a);c.series=a.series=d;this.userOptions=a;d=c.chart;this.margin=this.splashArray("margin",d);this.spacing=
this.splashArray("spacing",d);var e=d.events;this.bounds={h:{},v:{}};this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var f=this,g;f.index=W.length;W.push(f);$a++;d.reflow!==!1&&N(f,"load",function(){f.initReflow()});if(e)for(g in e)N(f,g,e[g]);f.xAxis=[];f.yAxis=[];f.animation=ga?!1:p(d.animation,!0);f.pointCount=f.colorCounter=f.symbolCounter=0;f.firstRender()},initSeries:function(a){var b=this.options.chart;(b=J[a.type||b.type||b.defaultSeriesType])||
oa(17,!0);b=new b;b.init(this,a);return b},isInsidePlot:function(a,b,c){var d=c?b:a,a=c?a:b;return d>=0&&d<=this.plotWidth&&a>=0&&a<=this.plotHeight},adjustTickAmounts:function(){this.options.chart.alignTicks!==!1&&q(this.axes,function(a){a.adjustTickAmount()});this.maxTicks=null},redraw:function(a){var b=this.axes,c=this.series,d=this.pointer,e=this.legend,f=this.isDirtyLegend,g,h,i=this.hasCartesianSeries,j=this.isDirtyBox,k=c.length,l=k,m=this.renderer,n=m.isHidden(),o=[];Qa(a,this);n&&this.cloneRenderTo();
for(this.layOutTitles();l--;)if(a=c[l],a.options.stacking&&(g=!0,a.isDirty)){h=!0;break}if(h)for(l=k;l--;)if(a=c[l],a.options.stacking)a.isDirty=!0;q(c,function(a){a.isDirty&&a.options.legendType==="point"&&(f=!0)});if(f&&e.options.enabled)e.render(),this.isDirtyLegend=!1;g&&this.getStacks();if(i){if(!this.isResizing)this.maxTicks=null,q(b,function(a){a.setScale()});this.adjustTickAmounts()}this.getMargins();i&&(q(b,function(a){a.isDirty&&(j=!0)}),q(b,function(a){if(a.isDirtyExtremes)a.isDirtyExtremes=
!1,o.push(function(){K(a,"afterSetExtremes",r(a.eventArgs,a.getExtremes()));delete a.eventArgs});(j||g)&&a.redraw()}));j&&this.drawChartBox();q(c,function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset(!0);m.draw();K(this,"redraw");n&&this.cloneRenderTo(!0);q(o,function(a){a.call()})},get:function(a){var b=this.axes,c=this.series,d,e;for(d=0;d<b.length;d++)if(b[d].options.id===a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<c.length;d++){e=
c[d].points||[];for(b=0;b<e.length;b++)if(e[b].id===a)return e[b]}return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=ra(b.xAxis||{}),b=b.yAxis=ra(b.yAxis||{});q(c,function(a,b){a.index=b;a.isX=!0});q(b,function(a,b){a.index=b});c=c.concat(b);q(c,function(b){new ma(a,b)});a.adjustTickAmounts()},getSelectedPoints:function(){var a=[];q(this.series,function(b){a=a.concat(vb(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return vb(this.series,function(a){return a.selected})},
getStacks:function(){var a=this;q(a.yAxis,function(a){if(a.stacks&&a.hasVisibleSeries)a.oldStacks=a.stacks});q(a.series,function(b){if(b.options.stacking&&(b.visible===!0||a.options.chart.ignoreHiddenSeries===!1))b.stackKey=b.type+p(b.options.stack,"")})},setTitle:function(a,b,c){var g;var d=this,e=d.options,f;f=e.title=w(e.title,a);g=e.subtitle=w(e.subtitle,b),e=g;q([["title",a,f],["subtitle",b,e]],function(a){var b=a[0],c=d[b],e=a[1],a=a[2];c&&e&&(d[b]=c=c.destroy());a&&a.text&&!c&&(d[b]=d.renderer.text(a.text,
0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add())});d.layOutTitles(c)},layOutTitles:function(a){var b=0,c=this.title,d=this.subtitle,e=this.options,f=e.title,e=e.subtitle,g=this.renderer,h=this.spacingBox.width-44;if(c&&(c.css({width:(f.width||h)+"px"}).align(r({y:g.fontMetrics(f.style.fontSize,c).b-3},f),!1,"spacingBox"),!f.floating&&!f.verticalAlign))b=c.getBBox().height;d&&(d.css({width:(e.width||h)+"px"}).align(r({y:b+(f.margin-13)+g.fontMetrics(f.style.fontSize,
d).b},e),!1,"spacingBox"),!e.floating&&!e.verticalAlign&&(b=Ka(b+d.getBBox().height)));c=this.titleOffset!==b;this.titleOffset=b;if(!this.isDirtyBox&&c)this.isDirtyBox=c,this.hasRendered&&p(a,!0)&&this.isDirtyBox&&this.redraw()},getChartSize:function(){var a=this.options.chart,b=a.width,a=a.height,c=this.renderToClone||this.renderTo;if(!s(b))this.containerWidth=hb(c,"width");if(!s(a))this.containerHeight=hb(c,"height");this.chartWidth=u(0,b||this.containerWidth||600);this.chartHeight=u(0,p(a,this.containerHeight>
19?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;a?b&&(this.renderTo.appendChild(c),Pa(b),delete this.renderToClone):(c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),A(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&b.style.setProperty("display","block","important"),x.body.appendChild(b),c&&b.appendChild(c))},getContainer:function(){var a,b=this.options.chart,
c,d,e;this.renderTo=a=b.renderTo;e="highcharts-"+tb++;if(Fa(a))this.renderTo=a=x.getElementById(a);a||oa(13,!0);c=z(F(a,"data-highcharts-chart"));!isNaN(c)&&W[c]&&W[c].hasRendered&&W[c].destroy();F(a,"data-highcharts-chart",this.index);a.innerHTML="";!b.skipClone&&!a.offsetWidth&&this.cloneRenderTo();this.getChartSize();c=this.chartWidth;d=this.chartHeight;this.container=a=$(Ja,{className:"highcharts-container"+(b.className?" "+b.className:""),id:e},r({position:"relative",overflow:"hidden",width:c+
"px",height:d+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},b.style),this.renderToClone||a);this._cursor=a.style.cursor;this.renderer=b.forExport?new ta(a,c,d,b.style,!0):new Ya(a,c,d,b.style);ga&&this.renderer.create(this,a,c,d)},getMargins:function(){var a=this.spacing,b,c=this.legend,d=this.margin,e=this.options.legend,f=p(e.margin,20),g=e.x,h=e.y,i=e.align,j=e.verticalAlign,k=this.titleOffset;this.resetMargins();b=this.axisOffset;if(k&&!s(d[0]))this.plotTop=
u(this.plotTop,k+this.options.title.margin+a[0]);if(c.display&&!e.floating)if(i==="right"){if(!s(d[1]))this.marginRight=u(this.marginRight,c.legendWidth-g+f+a[1])}else if(i==="left"){if(!s(d[3]))this.plotLeft=u(this.plotLeft,c.legendWidth+g+f+a[3])}else if(j==="top"){if(!s(d[0]))this.plotTop=u(this.plotTop,c.legendHeight+h+f+a[0])}else if(j==="bottom"&&!s(d[2]))this.marginBottom=u(this.marginBottom,c.legendHeight-h+f+a[2]);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&
(this.plotTop+=this.extraTopMargin);this.hasCartesianSeries&&q(this.axes,function(a){a.getOffset()});s(d[3])||(this.plotLeft+=b[3]);s(d[0])||(this.plotTop+=b[0]);s(d[2])||(this.marginBottom+=b[2]);s(d[1])||(this.marginRight+=b[1]);this.setChartSize()},reflow:function(a){var b=this,c=b.options.chart,d=b.renderTo,e=c.width||hb(d,"width"),f=c.height||hb(d,"height"),c=a?a.target:H,d=function(){if(b.container)b.setSize(e,f,!1),b.hasUserSize=null};if(!b.hasUserSize&&e&&f&&(c===H||c===x)){if(e!==b.containerWidth||
f!==b.containerHeight)clearTimeout(b.reflowTimeout),a?b.reflowTimeout=setTimeout(d,100):d();b.containerWidth=e;b.containerHeight=f}},initReflow:function(){var a=this,b=function(b){a.reflow(b)};N(H,"resize",b);N(a,"destroy",function(){X(H,"resize",b)})},setSize:function(a,b,c){var d=this,e,f,g;d.isResizing+=1;g=function(){d&&K(d,"endResize",null,function(){d.isResizing-=1})};Qa(c,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;if(s(a))d.chartWidth=e=u(0,v(a)),d.hasUserSize=!!e;if(s(b))d.chartHeight=
f=u(0,v(b));(va?ib:A)(d.container,{width:e+"px",height:f+"px"},va);d.setChartSize(!0);d.renderer.setSize(e,f,c);d.maxTicks=null;q(d.axes,function(a){a.isDirty=!0;a.setScale()});q(d.series,function(a){a.isDirty=!0});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(c);d.oldChartHeight=null;K(d,"resize");va===!1?g():setTimeout(g,va&&va.duration||500)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,e=this.chartHeight,f=this.options.chart,g=this.spacing,
h=this.clipOffset,i,j,k,l;this.plotLeft=i=v(this.plotLeft);this.plotTop=j=v(this.plotTop);this.plotWidth=k=u(0,v(d-i-this.marginRight));this.plotHeight=l=u(0,v(e-j-this.marginBottom));this.plotSizeX=b?l:k;this.plotSizeY=b?k:l;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:g[3],y:g[0],width:d-g[3]-g[1],height:e-g[0]-g[2]};this.plotBox=c.plotBox={x:i,y:j,width:k,height:l};d=2*U(this.plotBorderWidth/2);b=Ka(u(d,h[3])/2);c=Ka(u(d,h[0])/2);this.clipBox={x:b,y:c,width:U(this.plotSizeX-
u(d,h[1])/2-b),height:u(0,U(this.plotSizeY-u(d,h[2])/2-c))};a||q(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this.spacing,b=this.margin;this.plotTop=p(b[0],a[0]);this.marginRight=p(b[1],a[1]);this.marginBottom=p(b[2],a[2]);this.plotLeft=p(b[3],a[3]);this.axisOffset=[0,0,0,0];this.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,e=this.chartBackground,f=this.plotBackground,g=
this.plotBorder,h=this.plotBGImage,i=a.borderWidth||0,j=a.backgroundColor,k=a.plotBackgroundColor,l=a.plotBackgroundImage,m=a.plotBorderWidth||0,n,o=this.plotLeft,p=this.plotTop,q=this.plotWidth,r=this.plotHeight,u=this.plotBox,s=this.clipRect,v=this.clipBox;n=i+(a.shadow?8:0);if(i||j)if(e)e.animate(e.crisp({width:c-n,height:d-n}));else{e={fill:j||P};if(i)e.stroke=a.borderColor,e["stroke-width"]=i;this.chartBackground=b.rect(n/2,n/2,c-n,d-n,a.borderRadius,i).attr(e).addClass("highcharts-background").add().shadow(a.shadow)}if(k)f?
f.animate(u):this.plotBackground=b.rect(o,p,q,r,0).attr({fill:k}).add().shadow(a.plotShadow);if(l)h?h.animate(u):this.plotBGImage=b.image(l,o,p,q,r).add();s?s.animate({width:v.width,height:v.height}):this.clipRect=b.clipRect(v);if(m)g?g.animate(g.crisp({x:o,y:p,width:q,height:r})):this.plotBorder=b.rect(o,p,q,r,0,-m).attr({stroke:a.plotBorderColor,"stroke-width":m,fill:P,zIndex:1}).add();this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,e,f;q(["inverted",
"angular","polar"],function(g){c=J[b.type||b.defaultSeriesType];f=a[g]||b[g]||c&&c.prototype[g];for(e=d&&d.length;!f&&e--;)(c=J[d[e].type])&&c.prototype[g]&&(f=!0);a[g]=f})},linkSeries:function(){var a=this,b=a.series;q(b,function(a){a.linkedSeries.length=0});q(b,function(b){var d=b.options.linkedTo;if(Fa(d)&&(d=d===":previous"?a.series[b.index-1]:a.get(d)))d.linkedSeries.push(b),b.linkedParent=d})},renderSeries:function(){q(this.series,function(a){a.translate();a.setTooltipPoints&&a.setTooltipPoints();
a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&q(b.items,function(c){var d=r(b.style,c.style),e=z(d.left)+a.plotLeft,f=z(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(c.html,e,f).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options;this.setTitle();this.legend=new kb(this,c.legend);this.getStacks();q(a,function(a){a.setScale()});this.getMargins();this.maxTicks=null;q(a,function(a){a.setTickPositions(!0);a.setMaxTicks()});
this.adjustTickAmounts();this.getMargins();this.drawChartBox();this.hasCartesianSeries&&q(a,function(a){a.render()});if(!this.seriesGroup)this.seriesGroup=b.g("series-group").attr({zIndex:3}).add();this.renderSeries();this.renderLabels();this.showCredits(c.credits);this.hasRendered=!0},showCredits:function(a){if(a.enabled&&!this.credits)this.credits=this.renderer.text(a.text,0,0).on("click",function(){if(a.href)location.href=a.href}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position)},
destroy:function(){var a=this,b=a.axes,c=a.series,d=a.container,e,f=d&&d.parentNode;K(a,"destroy");W[a.index]=t;$a--;a.renderTo.removeAttribute("data-highcharts-chart");X(a);for(e=b.length;e--;)b[e]=b[e].destroy();for(e=c.length;e--;)c[e]=c[e].destroy();q("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});if(d)d.innerHTML=
"",X(d),f&&Pa(d);for(e in a)delete a[e]},isReadyToRender:function(){var a=this;return!ba&&H==H.top&&x.readyState!=="complete"||ga&&!H.canvg?(ga?Lb.push(function(){a.firstRender()},a.options.global.canvasToolsURL):x.attachEvent("onreadystatechange",function(){x.detachEvent("onreadystatechange",a.firstRender);x.readyState==="complete"&&a.firstRender()}),!1):!0},firstRender:function(){var a=this,b=a.options,c=a.callback;if(a.isReadyToRender()){a.getContainer();K(a,"init");a.resetMargins();a.setChartSize();
a.propFromSeries();a.getAxes();q(b.series||[],function(b){a.initSeries(b)});a.linkSeries();K(a,"beforeRender");if(S.Pointer)a.pointer=new Va(a,b);a.render();a.renderer.draw();c&&c.apply(a,[a]);q(a.callbacks,function(b){b.apply(a,[a])});a.cloneRenderTo(!0);K(a,"load")}},splashArray:function(a,b){var c=b[a],c=da(c)?c:[c,c,c,c];return[p(b[a+"Top"],c[0]),p(b[a+"Right"],c[1]),p(b[a+"Bottom"],c[2]),p(b[a+"Left"],c[3])]}};Xa.prototype.callbacks=[];Z=S.CenteredSeriesMixin={getCenter:function(){var a=this.options,
b=this.chart,c=2*(a.slicedOffset||0),d,e=b.plotWidth-2*c,f=b.plotHeight-2*c,b=a.center,a=[p(b[0],"50%"),p(b[1],"50%"),a.size||"100%",a.innerSize||0],g=C(e,f),h;return Ua(a,function(a,b){h=/%$/.test(a);d=b<2||b===2&&h;return(h?[e,f,g,g][b]*z(a)/100:a)+(d?c:0)})}};var Ea=function(){};Ea.prototype={init:function(a,b,c){this.series=a;this.applyOptions(b,c);this.pointAttr={};if(a.options.colorByPoint&&(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter++],a.colorCounter===
b.length))a.colorCounter=0;a.chart.pointCount++;return this},applyOptions:function(a,b){var c=this.series,d=c.options.pointValKey||c.pointValKey,a=Ea.prototype.optionsToObject.call(this,a);r(this,a);this.options=this.options?r(this.options,a):a;if(d)this.y=this[d];if(this.x===t&&c)this.x=b===t?c.autoIncrement():b;return this},optionsToObject:function(a){var b={},c=this.series,d=c.pointArrayMap||["y"],e=d.length,f=0,g=0;if(typeof a==="number"||a===null)b[d[0]]=a;else if(La(a)){if(a.length>e){c=typeof a[0];
if(c==="string")b.name=a[0];else if(c==="number")b.x=a[0];f++}for(;g<e;)b[d[g++]]=a[f++]}else if(typeof a==="object"){b=a;if(a.dataLabels)c._hasPointLabels=!0;if(a.marker)c._hasPointMarkers=!0}return b},destroy:function(){var a=this.series.chart,b=a.hoverPoints,c;a.pointCount--;if(b&&(this.setState(),ka(b,this),!b.length))a.hoverPoints=null;if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)X(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(c in this)this[c]=
null},destroyElements:function(){for(var a="graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","),b,c=6;c--;)b=a[c],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var b=this.series,c=b.tooltipOptions,d=p(c.valueDecimals,""),e=c.valuePrefix||"",f=c.valueSuffix||"";q(b.pointArrayMap||
["y"],function(b){b="{point."+b;if(e||f)a=a.replace(b+"}",e+b+"}"+f);a=a.replace(b+"}",b+":,."+d+"f}")});return Ia(a,{point:this,series:this.series})},firePointEvent:function(a,b,c){var d=this,e=this.series.options;(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();a==="click"&&e.allowPointSelect&&(c=function(a){d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});K(this,a,b,c)}};var O=function(){};O.prototype={isCartesian:!0,type:"line",pointClass:Ea,sorted:!0,
requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],init:function(a,b){var c=this,d,e,f=a.series,g=function(a,b){return p(a.options.index,a._i)-p(b.options.index,b._i)};c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();r(c,{name:b.name,state:"",pointAttr:{},visible:b.visible!==!1,selected:b.selected===!0});if(ga)b.animation=!1;e=b.events;for(d in e)N(c,
d,e[d]);if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();q(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);if(c.isCartesian)a.hasCartesianSeries=!0;f.push(c);c._i=f.length-1;nb(f,g);this.yAxis&&nb(this.yAxis.series,g);q(f,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},bindAxes:function(){var a=this,b=a.options,c=a.chart,d;q(a.axisTypes||[],function(e){q(c[e],function(c){d=c.options;if(b[e]===
d.index||b[e]!==t&&b[e]===d.id||b[e]===t&&d.index===0)c.series.push(a),a[e]=c,c.isDirty=!0});!a[e]&&a.optionalAxis!==e&&oa(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments;q(c.parallelArrays,typeof b==="number"?function(d){var f=d==="y"&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=f}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))})},autoIncrement:function(){var a=this.options,b=this.xIncrement,b=p(b,a.pointStart,0);this.pointInterval=p(this.pointInterval,
a.pointInterval,1);this.xIncrement=b+this.pointInterval;return b},getSegments:function(){var a=-1,b=[],c,d=this.points,e=d.length;if(e)if(this.options.connectNulls){for(c=e;c--;)d[c].y===null&&d.splice(c,1);d.length&&(b=[d])}else q(d,function(c,g){c.y===null?(g>a+1&&b.push(d.slice(a+1,g)),a=g):g===e-1&&b.push(d.slice(a+1,g+1))});this.segments=b},setOptions:function(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},d=b.plotOptions||{},e=c[this.type];this.userOptions=a;c=w(e,c.series,
a);this.tooltipOptions=w(L.tooltip,L.plotOptions[this.type].tooltip,b.tooltip,d.series&&d.series.tooltip,d[this.type]&&d[this.type].tooltip,a.tooltip);e.marker===null&&delete c.marker;return c},getCyclic:function(a,b,c){var d=this.userOptions,e="_"+a+"Index",f=a+"Counter";b||(s(d[e])?b=d[e]:(d[e]=b=this.chart[f]%c.length,this.chart[f]+=1),b=c[b]);this[a]=b},getColor:function(){this.options.colorByPoint||this.getCyclic("color",this.options.color||ca[this.type].color,this.chart.options.colors)},getSymbol:function(){var a=
this.options.marker;this.getCyclic("symbol",a.symbol,this.chart.options.symbols);if(/^url/.test(this.symbol))a.radius=0},drawLegendSymbol:M.drawLineMarker,setData:function(a,b,c,d){var e=this,f=e.points,g=f&&f.length||0,h,i=e.options,j=e.chart,k=null,l=e.xAxis,m=l&&!!l.categories,n=e.tooltipPoints,o=i.turboThreshold,r=this.xData,u=this.yData,s=(h=e.pointArrayMap)&&h.length,a=a||[];h=a.length;b=p(b,!0);if(d!==!1&&h&&g===h&&!e.cropped&&!e.hasGroupedData)q(a,function(a,b){f[b].update(a,!1)});else{e.xIncrement=
null;e.pointRange=m?1:i.pointRange;e.colorCounter=0;q(this.parallelArrays,function(a){e[a+"Data"].length=0});if(o&&h>o){for(c=0;k===null&&c<h;)k=a[c],c++;if(ia(k)){m=p(i.pointStart,0);i=p(i.pointInterval,1);for(c=0;c<h;c++)r[c]=m,u[c]=a[c],m+=i;e.xIncrement=m}else if(La(k))if(s)for(c=0;c<h;c++)i=a[c],r[c]=i[0],u[c]=i.slice(1,s+1);else for(c=0;c<h;c++)i=a[c],r[c]=i[0],u[c]=i[1];else oa(12)}else for(c=0;c<h;c++)if(a[c]!==t&&(i={series:e},e.pointClass.prototype.applyOptions.apply(i,[a[c]]),e.updateParallelArrays(i,
c),m&&i.name))l.names[i.x]=i.name;Fa(u[0])&&oa(14,!0);e.data=[];e.options.data=a;for(c=g;c--;)f[c]&&f[c].destroy&&f[c].destroy();if(n)n.length=0;if(l)l.minRange=l.userMinRange;e.isDirty=e.isDirtyData=j.isDirtyBox=!0;c=!1}b&&j.redraw(c)},processData:function(a){var b=this.xData,c=this.yData,d=b.length,e;e=0;var f,g,h=this.xAxis,i=this.options,j=i.cropThreshold,k=0,l=this.isCartesian,m,n;if(l&&!this.isDirty&&!h.isDirty&&!this.yAxis.isDirty&&!a)return!1;if(l&&this.sorted&&(!j||d>j||this.forceCrop))if(m=
h.getExtremes(),n=m.min,m=m.max,b[d-1]<n||b[0]>m)b=[],c=[];else if(b[0]<n||b[d-1]>m)e=this.cropData(this.xData,this.yData,n,m),b=e.xData,c=e.yData,e=e.start,f=!0,k=b.length;for(a=b.length-1;a>=0;a--)d=b[a]-b[a-1],!f&&b[a]>n&&b[a]<m&&k++,d>0&&(g===t||d<g)?g=d:d<0&&this.requireSorting&&oa(15);this.cropped=f;this.cropStart=e;this.processedXData=b;this.processedYData=c;this.activePointCount=k;if(i.pointRange===null)this.pointRange=g||1;this.closestPointRange=g},cropData:function(a,b,c,d){var e=a.length,
f=0,g=e,h=p(this.cropShoulder,1),i;for(i=0;i<e;i++)if(a[i]>=c){f=u(0,i-h);break}for(;i<e;i++)if(a[i]>d){g=i+h;break}return{xData:a.slice(f,g),yData:b.slice(f,g),start:f,end:g}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,e=this.processedYData,f=this.pointClass,g=d.length,h=this.cropStart||0,i,j=this.hasGroupedData,k,l=[],m;if(!b&&!j)b=[],b.length=a.length,b=this.data=b;for(m=0;m<g;m++)i=h+m,j?l[m]=(new f).init(this,[d[m]].concat(ra(e[m]))):(b[i]?k=b[i]:a[i]!==
t&&(b[i]=k=(new f).init(this,a[i],d[m])),l[m]=k);if(b&&(g!==(c=b.length)||j))for(m=0;m<c;m++)if(m===h&&!j&&(m+=g),b[m])b[m].destroyElements(),b[m].plotX=t;this.data=b;this.points=l},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,d,e=[],f=0;d=this.xAxis.getExtremes();var g=d.min,h=d.max,i,j,k,l,a=a||this.stackedYData||this.processedYData;d=a.length;for(l=0;l<d;l++)if(j=c[l],k=a[l],i=k!==null&&k!==t&&(!b.isLog||k.length||k>0),j=this.getExtremesFromAll||this.cropped||(c[l+1]||j)>=g&&
(c[l-1]||j)<=h,i&&j)if(i=k.length)for(;i--;)k[i]!==null&&(e[f++]=k[i]);else e[f++]=k;this.dataMin=p(void 0,Na(e));this.dataMax=p(void 0,Ba(e))},translate:function(){this.processedXData||this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,e=this.yAxis,f=this.points,g=f.length,h=!!this.modifyValue,i=a.pointPlacement,j=i==="between"||ia(i),k=a.threshold,a=0;a<g;a++){var l=f[a],m=l.x,n=l.y,o=l.low,q=b&&e.stacks[(this.negStacks&&n<k?"-":"")+this.stackKey];
if(e.isLog&&n<=0)l.y=n=null;l.plotX=c.translate(m,0,0,0,1,i,this.type==="flags");if(b&&this.visible&&q&&q[m])q=q[m],n=q.points[this.index+","+a],o=n[0],n=n[1],o===0&&(o=p(k,e.min)),e.isLog&&o<=0&&(o=null),l.total=l.stackTotal=q.total,l.percentage=q.total&&l.y/q.total*100,l.stackY=n,q.setOffset(this.pointXOffset||0,this.barW||0);l.yBottom=s(o)?e.translate(o,0,1,0,1):null;h&&(n=this.modifyValue(n,l));l.plotY=typeof n==="number"&&n!==Infinity?e.translate(n,0,1,0,1):t;l.clientX=j?c.translate(m,0,0,0,
1):l.plotX;l.negative=l.y<(k||0);l.category=d&&d[l.x]!==t?d[l.x]:l.x}this.getSegments()},animate:function(a){var b=this.chart,c=b.renderer,d;d=this.options.animation;var e=this.clipBox||b.clipBox,f=b.inverted,g;if(d&&!da(d))d=ca[this.type].animation;g=["_sharedClip",d.duration,d.easing,e.height].join(",");a?(a=b[g],d=b[g+"m"],a||(b[g]=a=c.clipRect(r(e,{width:0})),b[g+"m"]=d=c.clipRect(-99,f?-b.plotLeft:-b.plotTop,99,f?b.chartWidth:b.chartHeight)),this.group.clip(a),this.markerGroup.clip(d),this.sharedClipKey=
g):((a=b[g])&&a.animate({width:b.plotSizeX},d),b[g+"m"]&&b[g+"m"].animate({width:b.plotSizeX+99},d),this.animate=null)},afterAnimate:function(){var a=this.chart,b=this.sharedClipKey,c=this.group,d=this.clipBox;if(c&&this.options.clip!==!1){if(!b||!d)c.clip(d?a.renderer.clipRect(d):a.clipRect);this.markerGroup.clip()}K(this,"afterAnimate");setTimeout(function(){b&&a[b]&&(d||(a[b]=a[b].destroy()),a[b+"m"]&&(a[b+"m"]=a[b+"m"].destroy()))},100)},drawPoints:function(){var a,b=this.points,c=this.chart,
d,e,f,g,h,i,j,k;d=this.options.marker;var l=this.pointAttr[""],m,n=this.markerGroup,o=p(d.enabled,this.activePointCount<0.5*this.xAxis.len/d.radius);if(d.enabled!==!1||this._hasPointMarkers)for(f=b.length;f--;)if(g=b[f],d=U(g.plotX),e=g.plotY,k=g.graphic,i=g.marker||{},a=o&&i.enabled===t||i.enabled,m=c.isInsidePlot(v(d),e,c.inverted),a&&e!==t&&!isNaN(e)&&g.y!==null)if(a=g.pointAttr[g.selected?"select":""]||l,h=a.r,i=p(i.symbol,this.symbol),j=i.indexOf("url")===0,k)k[m?"show":"hide"](!0).animate(r({x:d-
h,y:e-h},k.symbolName?{width:2*h,height:2*h}:{}));else{if(m&&(h>0||j))g.graphic=c.renderer.symbol(i,d-h,e-h,2*h,2*h).attr(a).add(n)}else if(k)g.graphic=k.destroy()},convertAttribs:function(a,b,c,d){var e=this.pointAttrToOptions,f,g,h={},a=a||{},b=b||{},c=c||{},d=d||{};for(f in e)g=e[f],h[f]=p(a[g],b[f],c[f],d[f]);return h},getAttribs:function(){var a=this,b=a.options,c=ca[a.type].marker?b.marker:b,d=c.states,e=d.hover,f,g=a.color;f={stroke:g,fill:g};var h=a.points||[],i,j=[],k,l=a.pointAttrToOptions;
k=a.hasPointSpecificOptions;var m=b.negativeColor,n=c.lineColor,o=c.fillColor;i=b.turboThreshold;var p;b.marker?(e.radius=e.radius||c.radius+e.radiusPlus,e.lineWidth=e.lineWidth||c.lineWidth+e.lineWidthPlus):e.color=e.color||ya(e.color||g).brighten(e.brightness).get();j[""]=a.convertAttribs(c,f);q(["hover","select"],function(b){j[b]=a.convertAttribs(d[b],j[""])});a.pointAttr=j;g=h.length;if(!i||g<i||k)for(;g--;){i=h[g];if((c=i.options&&i.options.marker||i.options)&&c.enabled===!1)c.radius=0;if(i.negative&&
m)i.color=i.fillColor=m;k=b.colorByPoint||i.color;if(i.options)for(p in l)s(c[l[p]])&&(k=!0);if(k){c=c||{};k=[];d=c.states||{};f=d.hover=d.hover||{};if(!b.marker)f.color=f.color||!i.options.color&&e.color||ya(i.color).brighten(f.brightness||e.brightness).get();f={color:i.color};if(!o)f.fillColor=i.color;if(!n)f.lineColor=i.color;k[""]=a.convertAttribs(r(f,c),j[""]);k.hover=a.convertAttribs(d.hover,j.hover,k[""]);k.select=a.convertAttribs(d.select,j.select,k[""])}else k=j;i.pointAttr=k}},destroy:function(){var a=
this,b=a.chart,c=/AppleWebKit\/533/.test(wa),d,e,f=a.data||[],g,h,i;K(a,"destroy");X(a);q(a.axisTypes||[],function(b){if(i=a[b])ka(i.series,a),i.isDirty=i.forceRedraw=!0});a.legendItem&&a.chart.legend.destroyItem(a);for(e=f.length;e--;)(g=f[e])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);q("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","),function(b){a[b]&&(d=c&&b==="group"?"hide":"destroy",a[b][d]())});if(b.hoverSeries===
a)b.hoverSeries=null;ka(b.series,a);for(h in a)delete a[h]},getSegmentPath:function(a){var b=this,c=[],d=b.options.step;q(a,function(e,f){var g=e.plotX,h=e.plotY,i;b.getPointSpline?c.push.apply(c,b.getPointSpline(a,e,f)):(c.push(f?"L":"M"),d&&f&&(i=a[f-1],d==="right"?c.push(i.plotX,h):d==="center"?c.push((i.plotX+g)/2,i.plotY,(i.plotX+g)/2,h):c.push(g,i.plotY)),c.push(e.plotX,e.plotY))});return c},getGraphPath:function(){var a=this,b=[],c,d=[];q(a.segments,function(e){c=a.getSegmentPath(e);e.length>
1?b=b.concat(c):d.push(e[0])});a.singlePoints=d;return a.graphPath=b},drawGraph:function(){var a=this,b=this.options,c=[["graph",b.lineColor||this.color]],d=b.lineWidth,e=b.dashStyle,f=b.linecap!=="square",g=this.getGraphPath(),h=b.negativeColor;h&&c.push(["graphNeg",h]);q(c,function(c,h){var k=c[0],l=a[k];if(l)ab(l),l.animate({d:g});else if(d&&g.length)l={stroke:c[1],"stroke-width":d,fill:P,zIndex:1},e?l.dashstyle=e:f&&(l["stroke-linecap"]=l["stroke-linejoin"]="round"),a[k]=a.chart.renderer.path(g).attr(l).add(a.group).shadow(!h&&
b.shadow)})},clipNeg:function(){var a=this.options,b=this.chart,c=b.renderer,d=a.negativeColor||a.negativeFillColor,e,f=this.graph,g=this.area,h=this.posClip,i=this.negClip;e=b.chartWidth;var j=b.chartHeight,k=u(e,j),l=this.yAxis;if(d&&(f||g)){d=v(l.toPixels(a.threshold||0,!0));d<0&&(k-=d);a={x:0,y:0,width:k,height:d};k={x:0,y:d,width:k,height:k};if(b.inverted)a.height=k.y=b.plotWidth-d,c.isVML&&(a={x:b.plotWidth-d-b.plotLeft,y:0,width:e,height:j},k={x:d+b.plotLeft-e,y:0,width:b.plotLeft+d,height:e});
l.reversed?(b=k,e=a):(b=a,e=k);h?(h.animate(b),i.animate(e)):(this.posClip=h=c.clipRect(b),this.negClip=i=c.clipRect(e),f&&this.graphNeg&&(f.clip(h),this.graphNeg.clip(i)),g&&(g.clip(h),this.areaNeg.clip(i)))}},invertGroups:function(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};q(["group","markerGroup"],function(c){b[c]&&b[c].attr(a).invert()})}var b=this,c=b.chart;if(b.xAxis)N(c,"resize",a),N(b,"destroy",function(){X(c,"resize",a)}),a(),b.invertGroups=a},plotGroup:function(a,b,c,d,
e){var f=this[a],g=!f;g&&(this[a]=f=this.chart.renderer.g(b).attr({visibility:c,zIndex:d||0.1}).add(e));f[g?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;if(a.inverted)b=c,c=this.xAxis;return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,e=(c=d.animation)&&!!a.animate&&b.renderer.isSVG&&p(c.duration,500)||0,f=a.visible?"visible":"hidden",g=d.zIndex,
h=a.hasRendered,i=b.seriesGroup;c=a.plotGroup("group","series",f,g,i);a.markerGroup=a.plotGroup("markerGroup","markers",f,g,i);e&&a.animate(!0);a.getAttribs();c.inverted=a.isCartesian?b.inverted:!1;a.drawGraph&&(a.drawGraph(),a.clipNeg());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&a.options.enableMouseTracking!==!1&&a.drawTracker();b.inverted&&a.invertGroups();d.clip!==!1&&!a.sharedClipKey&&!h&&c.clip(b.clipRect);e&&a.animate();if(!h)e?a.animationTimeout=setTimeout(function(){a.afterAnimate()},
e):a.afterAnimate();a.isDirty=a.isDirtyData=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirtyData,c=this.group,d=this.xAxis,e=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:p(d&&d.left,a.plotLeft),translateY:p(e&&e.top,a.plotTop)}));this.translate();this.setTooltipPoints&&this.setTooltipPoints(!0);this.render();b&&K(this,"updatedData")}};Fb.prototype={destroy:function(){Oa(this,this.axis)},render:function(a){var b=this.options,
c=b.format,c=c?Ia(c,this):b.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,null,null,b.useHTML).css(b.style).attr({align:this.textAlign,rotation:b.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,b){var c=this.axis,d=c.chart,e=d.inverted,f=this.isNegative,g=c.translate(c.usePercentage?100:this.total,0,0,0,1),c=c.translate(0),c=Q(g-c),h=d.xAxis[0].translate(this.x)+a,i=d.plotHeight,f={x:e?f?g:g-c:h,y:e?i-h-b:f?i-g-
c:i-g,width:e?c:b,height:e?b:c};if(e=this.label)e.align(this.alignOptions,null,f),f=e.alignAttr,e[this.options.crop===!1||d.isInsidePlot(f.x,f.y)?"show":"hide"](!0)}};ma.prototype.buildStacks=function(){var a=this.series,b=p(this.options.reversedStacks,!0),c=a.length;if(!this.isXAxis){for(this.usePercentage=!1;c--;)a[b?c:a.length-c-1].setStackedPoints();if(this.usePercentage)for(c=0;c<a.length;c++)a[c].setPercentStacks()}};ma.prototype.renderStackTotals=function(){var a=this.chart,b=a.renderer,c=
this.stacks,d,e,f=this.stackTotalGroup;if(!f)this.stackTotalGroup=f=b.g("stack-labels").attr({visibility:"visible",zIndex:6}).add();f.translate(a.plotLeft,a.plotTop);for(d in c)for(e in a=c[d],a)a[e].render(f)};O.prototype.setStackedPoints=function(){if(this.options.stacking&&!(this.visible!==!0&&this.chart.options.chart.ignoreHiddenSeries!==!1)){var a=this.processedXData,b=this.processedYData,c=[],d=b.length,e=this.options,f=e.threshold,g=e.stack,e=e.stacking,h=this.stackKey,i="-"+h,j=this.negStacks,
k=this.yAxis,l=k.stacks,m=k.oldStacks,n,o,p,q,r,s;for(q=0;q<d;q++){r=a[q];s=b[q];p=this.index+","+q;o=(n=j&&s<f)?i:h;l[o]||(l[o]={});if(!l[o][r])m[o]&&m[o][r]?(l[o][r]=m[o][r],l[o][r].total=null):l[o][r]=new Fb(k,k.options.stackLabels,n,r,g);o=l[o][r];o.points[p]=[o.cum||0];e==="percent"?(n=n?h:i,j&&l[n]&&l[n][r]?(n=l[n][r],o.total=n.total=u(n.total,o.total)+Q(s)||0):o.total=ea(o.total+(Q(s)||0))):o.total=ea(o.total+(s||0));o.cum=(o.cum||0)+(s||0);o.points[p].push(o.cum);c[q]=o.cum}if(e==="percent")k.usePercentage=
!0;this.stackedYData=c;k.oldStacks={}}};O.prototype.setPercentStacks=function(){var a=this,b=a.stackKey,c=a.yAxis.stacks,d=a.processedXData;q([b,"-"+b],function(b){var e;for(var f=d.length,g,h;f--;)if(g=d[f],e=(h=c[b]&&c[b][g])&&h.points[a.index+","+f],g=e)h=h.total?100/h.total:0,g[0]=ea(g[0]*h),g[1]=ea(g[1]*h),a.stackedYData[f]=g[1]})};r(Xa.prototype,{addSeries:function(a,b,c){var d,e=this;a&&(b=p(b,!0),K(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();b&&
e.redraw(c)}));return d},addAxis:function(a,b,c,d){var e=b?"xAxis":"yAxis",f=this.options;new ma(this,w(a,{index:this[e].length,isX:b}));f[e]=ra(f[e]||{});f[e].push(a);p(c,!0)&&this.redraw(d)},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,e=c.loading,f=function(){d&&A(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};if(!d)b.loadingDiv=d=$(Ja,{className:"highcharts-loading"},r(e.style,{zIndex:10,display:P}),b.container),b.loadingSpan=$("span",
null,e.labelStyle,d),N(b,"redraw",f);b.loadingSpan.innerHTML=a||c.lang.loading;if(!b.loadingShown)A(d,{opacity:0,display:""}),ib(d,{opacity:e.style.opacity},{duration:e.showDuration||0}),b.loadingShown=!0;f()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&ib(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){A(b,{display:P})}});this.loadingShown=!1}});r(Ea.prototype,{update:function(a,b,c){var d=this,e=d.series,f=d.graphic,g,h=e.data,i=e.chart,j=e.options,b=p(b,
!0);d.firePointEvent("update",{options:a},function(){d.applyOptions(a);if(da(a)){e.getAttribs();if(f)a&&a.marker&&a.marker.symbol?d.graphic=f.destroy():f.attr(d.pointAttr[d.state||""]);if(a&&a.dataLabels&&d.dataLabel)d.dataLabel=d.dataLabel.destroy()}g=Da(d,h);e.updateParallelArrays(d,g);j.data[g]=d.options;e.isDirty=e.isDirtyData=!0;if(!e.fixedBox&&e.hasCartesianSeries)i.isDirtyBox=!0;j.legendType==="point"&&i.legend.destroyItem(d);b&&i.redraw(c)})},remove:function(a,b){var c=this,d=c.series,e=d.points,
f=d.chart,g,h=d.data;Qa(b,f);a=p(a,!0);c.firePointEvent("remove",null,function(){g=Da(c,h);h.length===e.length&&e.splice(g,1);h.splice(g,1);d.options.data.splice(g,1);d.updateParallelArrays(c,"splice",g,1);c.destroy();d.isDirty=!0;d.isDirtyData=!0;a&&f.redraw()})}});r(O.prototype,{addPoint:function(a,b,c,d){var e=this.options,f=this.data,g=this.graph,h=this.area,i=this.chart,j=this.xAxis&&this.xAxis.names,k=g&&g.shift||0,l=e.data,m,n=this.xData;Qa(d,i);c&&q([g,h,this.graphNeg,this.areaNeg],function(a){if(a)a.shift=
k+1});if(h)h.isArea=!0;b=p(b,!0);d={series:this};this.pointClass.prototype.applyOptions.apply(d,[a]);g=d.x;h=n.length;if(this.requireSorting&&g<n[h-1])for(m=!0;h&&n[h-1]>g;)h--;this.updateParallelArrays(d,"splice",h,0,0);this.updateParallelArrays(d,h);if(j)j[g]=d.name;l.splice(h,0,a);m&&(this.data.splice(h,0,null),this.processData());e.legendType==="point"&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(d,"shift"),l.shift()));this.isDirtyData=this.isDirty=
!0;b&&(this.getAttribs(),i.redraw())},remove:function(a,b){var c=this,d=c.chart,a=p(a,!0);if(!c.isRemoving)c.isRemoving=!0,K(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;d.linkSeries();a&&d.redraw(b)});c.isRemoving=!1},update:function(a,b){var c=this,d=this.chart,e=this.userOptions,f=this.type,g=J[f].prototype,h=["group","markerGroup","dataLabelsGroup"],i;q(h,function(a){h[a]=c[a];delete c[a]});a=w(e,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},
a);this.remove(!1);for(i in g)g.hasOwnProperty(i)&&(this[i]=t);r(this,J[a.type||f].prototype);q(h,function(a){c[a]=h[a]});this.init(d,a);d.linkSeries();p(b,!0)&&d.redraw(!1)}});r(ma.prototype,{update:function(a,b){var c=this.chart,a=c.options[this.coll][this.options.index]=w(this.userOptions,a);this.destroy(!0);this._addedPlotLB=t;this.init(c,r(a,{events:t}));c.isDirtyBox=!0;p(b,!0)&&c.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,d=this.series,e=d.length;e--;)d[e]&&d[e].remove(!1);
ka(b.axes,this);ka(b[c],this);b.options[c].splice(this.options.index,1);q(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;p(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}});ha=la(O);J.line=ha;ca.area=w(T,{threshold:0});var qa=la(O,{type:"area",getSegments:function(){var a=this,b=[],c=[],d=[],e=this.xAxis,f=this.yAxis,g=f.stacks[this.stackKey],h={},i,j,k=this.points,l=this.options.connectNulls,m,n;
if(this.options.stacking&&!this.cropped){for(m=0;m<k.length;m++)h[k[m].x]=k[m];for(n in g)g[n].total!==null&&d.push(+n);d.sort(function(a,b){return a-b});q(d,function(b){var d=0,k;if(!l||h[b]&&h[b].y!==null)if(h[b])c.push(h[b]);else{for(m=a.index;m<=f.series.length;m++)if(k=g[b].points[m+","+b]){d=k[1];break}i=e.translate(b);j=f.toPixels(d,!0);c.push({y:null,plotX:i,clientX:i,plotY:j,yBottom:j,onMouseOver:sa})}});c.length&&b.push(c)}else O.prototype.getSegments.call(this),b=this.segments;this.segments=
b},getSegmentPath:function(a){var b=O.prototype.getSegmentPath.call(this,a),c=[].concat(b),d,e=this.options;d=b.length;var f=this.yAxis.getThreshold(e.threshold),g;d===3&&c.push("L",b[1],b[2]);if(e.stacking&&!this.closedStacks)for(d=a.length-1;d>=0;d--)g=p(a[d].yBottom,f),d<a.length-1&&e.step&&c.push(a[d+1].plotX,g),c.push(a[d].plotX,g);else this.closeSegment(c,a,f);this.areaPath=this.areaPath.concat(c);return b},closeSegment:function(a,b,c){a.push("L",b[b.length-1].plotX,c,"L",b[0].plotX,c)},drawGraph:function(){this.areaPath=
[];O.prototype.drawGraph.apply(this);var a=this,b=this.areaPath,c=this.options,d=c.negativeColor,e=c.negativeFillColor,f=[["area",this.color,c.fillColor]];(d||e)&&f.push(["areaNeg",d,e]);q(f,function(d){var e=d[0],f=a[e];f?f.animate({d:b}):a[e]=a.chart.renderer.path(b).attr({fill:p(d[2],ya(d[1]).setOpacity(p(c.fillOpacity,0.75)).get()),zIndex:0}).add(a.group)})},drawLegendSymbol:M.drawRectangle});J.area=qa;ca.spline=w(T);ha=la(O,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,e=b.plotY,
f=a[c-1],g=a[c+1],h,i,j,k;if(f&&g){a=f.plotY;j=g.plotX;var g=g.plotY,l;h=(1.5*d+f.plotX)/2.5;i=(1.5*e+a)/2.5;j=(1.5*d+j)/2.5;k=(1.5*e+g)/2.5;l=(k-i)*(j-d)/(j-h)+e-k;i+=l;k+=l;i>a&&i>e?(i=u(a,e),k=2*e-i):i<a&&i<e&&(i=C(a,e),k=2*e-i);k>g&&k>e?(k=u(g,e),i=2*e-k):k<g&&k<e&&(k=C(g,e),i=2*e-k);b.rightContX=j;b.rightContY=k}c?(b=["C",f.rightContX||f.plotX,f.rightContY||f.plotY,h||d,i||e,d,e],f.rightContX=f.rightContY=null):b=["M",d,e];return b}});J.spline=ha;ca.areaspline=w(ca.area);qa=qa.prototype;ha=la(ha,
{type:"areaspline",closedStacks:!0,getSegmentPath:qa.getSegmentPath,closeSegment:qa.closeSegment,drawGraph:qa.drawGraph,drawLegendSymbol:M.drawRectangle});J.areaspline=ha;ca.column=w(T,{borderColor:"#FFFFFF",borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1,halo:!1},select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},stickyTracking:!1,tooltip:{distance:6},
threshold:0});ha=la(O,{type:"column",pointAttrToOptions:{stroke:"borderColor",fill:"color",r:"borderRadius"},cropShoulder:0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){O.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&q(b.series,function(b){if(b.type===a.type)b.isDirty=!0})},getColumnMetrics:function(){var a=this,b=a.options,c=a.xAxis,d=a.yAxis,e=c.reversed,f,g={},h,i=0;b.grouping===!1?i=1:q(a.chart.series,function(b){var c=b.options,e=b.yAxis;if(b.type===
a.type&&b.visible&&d.len===e.len&&d.pos===e.pos)c.stacking?(f=b.stackKey,g[f]===t&&(g[f]=i++),h=g[f]):c.grouping!==!1&&(h=i++),b.columnIndex=h});var c=C(Q(c.transA)*(c.ordinalSlope||b.pointRange||c.closestPointRange||c.tickInterval||1),c.len),j=c*b.groupPadding,k=(c-2*j)/i,l=b.pointWidth,b=s(l)?(k-l)/2:k*b.pointPadding,l=p(l,k-2*b);return a.columnMetrics={width:l,offset:b+(j+((e?i-(a.columnIndex||0):a.columnIndex)||0)*k-c/2)*(e?-1:1)}},translate:function(){var a=this,b=a.chart,c=a.options,d=a.borderWidth=
p(c.borderWidth,a.activePointCount>0.5*a.xAxis.len?0:1),e=a.yAxis,f=a.translatedThreshold=e.getThreshold(c.threshold),g=p(c.minPointLength,5),h=a.getColumnMetrics(),i=h.width,j=a.barW=u(i,1+2*d),k=a.pointXOffset=h.offset,l=-(d%2?0.5:0),m=d%2?0.5:1;b.renderer.isVML&&b.inverted&&(m+=1);c.pointPadding&&(j=Ka(j));O.prototype.translate.apply(a);q(a.points,function(c){var d=p(c.yBottom,f),h=C(u(-999-d,c.plotY),e.len+999+d),q=c.plotX+k,r=j,s=C(h,d),t;t=u(h,d)-s;Q(t)<g&&g&&(t=g,s=v(Q(s-f)>g?d-g:f-(e.translate(c.y,
0,1,0,1)<=f?g:0)));c.barX=q;c.pointWidth=i;c.tooltipPos=b.inverted?[e.len-h,a.xAxis.len-q-r/2]:[q+r/2,h];r=v(q+r)+l;q=v(q)+l;r-=q;d=Q(s)<0.5;t=v(s+t)+m;s=v(s)+m;t-=s;d&&(s-=1,t+=1);c.shapeType="rect";c.shapeArgs={x:q,y:s,width:r,height:t}})},getSymbol:sa,drawLegendSymbol:M.drawRectangle,drawGraph:sa,drawPoints:function(){var a=this,b=this.chart,c=a.options,d=b.renderer,e=c.animationLimit||250,f,g;q(a.points,function(h){var i=h.plotY,j=h.graphic;if(i!==t&&!isNaN(i)&&h.y!==null)f=h.shapeArgs,i=s(a.borderWidth)?
{"stroke-width":a.borderWidth}:{},g=h.pointAttr[h.selected?"select":""]||a.pointAttr[""],j?(ab(j),j.attr(i)[b.pointCount<e?"animate":"attr"](w(f))):h.graphic=d[h.shapeType](f).attr(g).attr(i).add(a.group).shadow(c.shadow,null,c.stacking&&!c.borderRadius);else if(j)h.graphic=j.destroy()})},animate:function(a){var b=this.yAxis,c=this.options,d=this.chart.inverted,e={};if(ba)a?(e.scaleY=0.001,a=C(b.pos+b.len,u(b.pos,b.toPixels(c.threshold))),d?e.translateX=a-b.len:e.translateY=a,this.group.attr(e)):
(e.scaleY=1,e[d?"translateX":"translateY"]=b.pos,this.group.animate(e,this.options.animation),this.animate=null)},remove:function(){var a=this,b=a.chart;b.hasRendered&&q(b.series,function(b){if(b.type===a.type)b.isDirty=!0});O.prototype.remove.apply(a,arguments)}});J.column=ha;ca.bar=w(ca.column);qa=la(ha,{type:"bar",inverted:!0});J.bar=qa;ca.scatter=w(T,{lineWidth:0,tooltip:{headerFormat:'<span style="color:{series.color}">●</span> <span style="font-size: 10px;"> {series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"},
stickyTracking:!1});qa=la(O,{type:"scatter",sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,singularTooltips:!0,drawGraph:function(){this.options.lineWidth&&O.prototype.drawGraph.call(this)}});J.scatter=qa;ca.pie=w(T,{borderColor:"#FFFFFF",borderWidth:1,center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.name}},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,
showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}},stickyTracking:!1,tooltip:{followPointer:!0}});T={type:"pie",isCartesian:!1,pointClass:la(Ea,{init:function(){Ea.prototype.init.apply(this,arguments);var a=this,b;if(a.y<0)a.y=null;r(a,{visible:a.visible!==!1,name:p(a.name,"Slice")});b=function(b){a.slice(b.type==="select")};N(a,"select",b);N(a,"unselect",b);return a},setVisible:function(a){var b=this,c=b.series,d=c.chart;b.visible=b.options.visible=a=a===t?!b.visible:a;c.options.data[Da(b,
c.data)]=b.options;q(["graphic","dataLabel","connector","shadowGroup"],function(c){if(b[c])b[c][a?"show":"hide"](!0)});b.legendItem&&d.legend.colorizeItem(b,a);if(!c.isDirty&&c.options.ignoreHiddenPoint)c.isDirty=!0,d.redraw()},slice:function(a,b,c){var d=this.series;Qa(c,d.chart);p(b,!0);this.sliced=this.options.sliced=a=s(a)?a:!this.sliced;d.options.data[Da(this,d.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)},
haloPath:function(a){var b=this.shapeArgs,c=this.series.chart;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.plotLeft+b.x,c.plotTop+b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r,start:b.start,end:b.end})}}),requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},singularTooltips:!0,getColor:sa,animate:function(a){var b=this,c=b.points,d=b.startAngleRad;
if(!a)q(c,function(a){var c=a.graphic,a=a.shapeArgs;c&&(c.attr({r:b.center[3]/2,start:d,end:d}),c.animate({r:a.r,start:a.start,end:a.end},b.options.animation))}),b.animate=null},setData:function(a,b,c,d){O.prototype.setData.call(this,a,!1,c,d);this.processData();this.generatePoints();p(b,!0)&&this.chart.redraw(c)},generatePoints:function(){var a,b=0,c,d,e,f=this.options.ignoreHiddenPoint;O.prototype.generatePoints.call(this);c=this.points;d=c.length;for(a=0;a<d;a++)e=c[a],b+=f&&!e.visible?0:e.y;this.total=
b;for(a=0;a<d;a++)e=c[a],e.percentage=b>0?e.y/b*100:0,e.total=b},translate:function(a){this.generatePoints();var b=0,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f,g,h,i=c.startAngle||0,j=this.startAngleRad=na/180*(i-90),i=(this.endAngleRad=na/180*(p(c.endAngle,i+360)-90))-j,k=this.points,l=c.dataLabels.distance,c=c.ignoreHiddenPoint,m,n=k.length,o;if(!a)this.center=a=this.getCenter();this.getX=function(b,c){h=V.asin(C((b-a[1])/(a[2]/2+l),1));return a[0]+(c?-1:1)*aa(h)*(a[2]/2+l)};for(m=0;m<
n;m++){o=k[m];f=j+b*i;if(!c||o.visible)b+=o.percentage/100;g=j+b*i;o.shapeType="arc";o.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:v(f*1E3)/1E3,end:v(g*1E3)/1E3};h=(g+f)/2;h>1.5*na?h-=2*na:h<-na/2&&(h+=2*na);o.slicedTranslation={translateX:v(aa(h)*d),translateY:v(fa(h)*d)};f=aa(h)*a[2]/2;g=fa(h)*a[2]/2;o.tooltipPos=[a[0]+f*0.7,a[1]+g*0.7];o.half=h<-na/2||h>na/2?1:0;o.angle=h;e=C(e,l/2);o.labelPos=[a[0]+f+aa(h)*l,a[1]+g+fa(h)*l,a[0]+f+aa(h)*e,a[1]+g+fa(h)*e,a[0]+f,a[1]+g,l<0?"center":o.half?
"right":"left",h]}},drawGraph:null,drawPoints:function(){var a=this,b=a.chart.renderer,c,d,e=a.options.shadow,f,g;if(e&&!a.shadowGroup)a.shadowGroup=b.g("shadow").add(a.group);q(a.points,function(h){d=h.graphic;g=h.shapeArgs;f=h.shadowGroup;if(e&&!f)f=h.shadowGroup=b.g("shadow").add(a.shadowGroup);c=h.sliced?h.slicedTranslation:{translateX:0,translateY:0};f&&f.attr(c);d?d.animate(r(g,c)):h.graphic=d=b[h.shapeType](g).setRadialReference(a.center).attr(h.pointAttr[h.selected?"select":""]).attr({"stroke-linejoin":"round"}).attr(c).add(a.group).shadow(e,
f);h.visible!==void 0&&h.setVisible(h.visible)})},sortByAngle:function(a,b){a.sort(function(a,d){return a.angle!==void 0&&(d.angle-a.angle)*b})},drawLegendSymbol:M.drawRectangle,getCenter:Z.getCenter,getSymbol:sa};T=la(O,T);J.pie=T;O.prototype.drawDataLabels=function(){var a=this,b=a.options,c=b.cursor,d=b.dataLabels,e=a.points,f,g,h,i;if(d.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(d),i=a.plotGroup("dataLabelsGroup","data-labels",d.defer?"hidden":"visible",d.zIndex||6),!a.hasRendered&&
p(d.defer,!0)&&(i.attr({opacity:0}),N(a,"afterAnimate",function(){a.visible&&i.show();i[b.animation?"animate":"attr"]({opacity:1},{duration:200})})),g=d,q(e,function(b){var e,l=b.dataLabel,m,n,o=b.connector,q=!0;f=b.options&&b.options.dataLabels;e=p(f&&f.enabled,g.enabled);if(l&&!e)b.dataLabel=l.destroy();else if(e){d=w(g,f);e=d.rotation;m=b.getLabelConfig();h=d.format?Ia(d.format,m):d.formatter.call(m,d);d.style.color=p(d.color,d.style.color,a.color,"black");if(l)if(s(h))l.attr({text:h}),q=!1;else{if(b.dataLabel=
l=l.destroy(),o)b.connector=o.destroy()}else if(s(h)){l={fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":d.borderWidth,r:d.borderRadius||0,rotation:e,padding:d.padding,zIndex:1};for(n in l)l[n]===t&&delete l[n];l=b.dataLabel=a.chart.renderer[e?"text":"label"](h,0,-999,null,null,null,d.useHTML).attr(l).css(r(d.style,c&&{cursor:c})).add(i).shadow(d.shadow)}l&&a.alignDataLabel(b,l,d,null,q)}})};O.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=p(a.plotX,-999),
i=p(a.plotY,-999),j=b.getBBox();if(a=this.visible&&(a.series.forceDL||f.isInsidePlot(h,v(i),g)||d&&f.isInsidePlot(h,g?d.x+1:d.y+d.height-1,g)))d=r({x:g?f.plotWidth-i:h,y:v(g?f.plotHeight-h:i),width:0,height:0},d),r(c,{width:j.width,height:j.height}),c.rotation?b[e?"attr":"animate"]({x:d.x+c.x+d.width/2,y:d.y+c.y+d.height/2}).attr({align:c.align}):(b.align(c,null,d),g=b.alignAttr,p(c.overflow,"justify")==="justify"?this.justifyDataLabel(b,c,g,j,d,e):p(c.crop,!0)&&(a=f.isInsidePlot(g.x,g.y)&&f.isInsidePlot(g.x+
j.width,g.y+j.height)));if(!a)b.attr({y:-999}),b.placed=!1};O.prototype.justifyDataLabel=function(a,b,c,d,e,f){var g=this.chart,h=b.align,i=b.verticalAlign,j,k;j=c.x;if(j<0)h==="right"?b.align="left":b.x=-j,k=!0;j=c.x+d.width;if(j>g.plotWidth)h==="left"?b.align="right":b.x=g.plotWidth-j,k=!0;j=c.y;if(j<0)i==="bottom"?b.verticalAlign="top":b.y=-j,k=!0;j=c.y+d.height;if(j>g.plotHeight)i==="top"?b.verticalAlign="bottom":b.y=g.plotHeight-j,k=!0;if(k)a.placed=!f,a.align(b,null,e)};if(J.pie)J.pie.prototype.drawDataLabels=
function(){var a=this,b=a.data,c,d=a.chart,e=a.options.dataLabels,f=p(e.connectorPadding,10),g=p(e.connectorWidth,1),h=d.plotWidth,i=d.plotHeight,j,k,l=p(e.softConnector,!0),m=e.distance,n=a.center,o=n[2]/2,r=n[1],s=m>0,t,w,x,z=[[],[]],B,A,K,J,y,R=[0,0,0,0],N=function(a,b){return b.y-a.y};if(a.visible&&(e.enabled||a._hasPointLabels)){O.prototype.drawDataLabels.apply(a);q(b,function(a){a.dataLabel&&a.visible&&z[a.half].push(a)});for(J=2;J--;){var H=[],M=[],F=z[J],L=F.length,G;if(L){a.sortByAngle(F,
J-0.5);for(y=b=0;!b&&F[y];)b=F[y]&&F[y].dataLabel&&(F[y].dataLabel.getBBox().height||21),y++;if(m>0){w=C(r+o+m,d.plotHeight);for(y=u(0,r-o-m);y<=w;y+=b)H.push(y);w=H.length;if(L>w){c=[].concat(F);c.sort(N);for(y=L;y--;)c[y].rank=y;for(y=L;y--;)F[y].rank>=w&&F.splice(y,1);L=F.length}for(y=0;y<L;y++){c=F[y];x=c.labelPos;c=9999;var S,P;for(P=0;P<w;P++)S=Q(H[P]-x[1]),S<c&&(c=S,G=P);if(G<y&&H[y]!==null)G=y;else for(w<L-y+G&&H[y]!==null&&(G=w-L+y);H[G]===null;)G++;M.push({i:G,y:H[G]});H[G]=null}M.sort(N)}for(y=
0;y<L;y++){c=F[y];x=c.labelPos;t=c.dataLabel;K=c.visible===!1?"hidden":"visible";c=x[1];if(m>0){if(w=M.pop(),G=w.i,A=w.y,c>A&&H[G+1]!==null||c<A&&H[G-1]!==null)A=C(u(0,c),d.plotHeight)}else A=c;B=e.justify?n[0]+(J?-1:1)*(o+m):a.getX(A===r-o-m||A===r+o+m?c:A,J);t._attr={visibility:K,align:x[6]};t._pos={x:B+e.x+({left:f,right:-f}[x[6]]||0),y:A+e.y-10};t.connX=B;t.connY=A;if(this.options.size===null)w=t.width,B-w<f?R[3]=u(v(w-B+f),R[3]):B+w>h-f&&(R[1]=u(v(B+w-h+f),R[1])),A-b/2<0?R[0]=u(v(-A+b/2),R[0]):
A+b/2>i&&(R[2]=u(v(A+b/2-i),R[2]))}}}if(Ba(R)===0||this.verifyDataLabelOverflow(R))this.placeDataLabels(),s&&g&&q(this.points,function(b){j=b.connector;x=b.labelPos;if((t=b.dataLabel)&&t._pos)K=t._attr.visibility,B=t.connX,A=t.connY,k=l?["M",B+(x[6]==="left"?5:-5),A,"C",B,A,2*x[2]-x[4],2*x[3]-x[5],x[2],x[3],"L",x[4],x[5]]:["M",B+(x[6]==="left"?5:-5),A,"L",x[2],x[3],"L",x[4],x[5]],j?(j.animate({d:k}),j.attr("visibility",K)):b.connector=j=a.chart.renderer.path(k).attr({"stroke-width":g,stroke:e.connectorColor||
b.color||"#606060",visibility:K}).add(a.dataLabelsGroup);else if(j)b.connector=j.destroy()})}},J.pie.prototype.placeDataLabels=function(){q(this.points,function(a){var a=a.dataLabel,b;if(a)(b=a._pos)?(a.attr(a._attr),a[a.moved?"animate":"attr"](b),a.moved=!0):a&&a.attr({y:-999})})},J.pie.prototype.alignDataLabel=sa,J.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,d=c.center,e=c=c.minSize||80,f;d[0]!==null?e=u(b[2]-u(a[1],a[3]),c):(e=u(b[2]-a[1]-a[3],c),b[0]+=(a[3]-
a[1])/2);d[1]!==null?e=u(C(e,b[2]-u(a[0],a[2])),c):(e=u(C(e,b[2]-a[0]-a[2]),c),b[1]+=(a[0]-a[2])/2);e<b[2]?(b[2]=e,this.translate(b),q(this.points,function(a){if(a.dataLabel)a.dataLabel._pos=null}),this.drawDataLabels&&this.drawDataLabels()):f=!0;return f};if(J.column)J.column.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=a.dlBox||a.shapeArgs,i=a.below||a.plotY>p(this.translatedThreshold,f.plotSizeY),j=p(c.inside,!!this.options.stacking);if(h&&(d=w(h),g&&(d={x:f.plotWidth-
d.y-d.height,y:f.plotHeight-d.x-d.width,width:d.height,height:d.width}),!j))g?(d.x+=i?0:d.width,d.width=0):(d.y+=i?d.height:0,d.height=0);c.align=p(c.align,!g||j?"center":i?"right":"left");c.verticalAlign=p(c.verticalAlign,g||j?"middle":i?"top":"bottom");O.prototype.alignDataLabel.call(this,a,b,c,d,e)};T=S.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,d=a.options.cursor,e=d&&{cursor:d},f=function(c){var d=c.target,e;if(b.hoverSeries!==a)a.onMouseOver();for(;d&&!e;)e=d.point,
d=d.parentNode;if(e!==t&&e!==b.hoverPoint)e.onMouseOver(c)};q(a.points,function(a){if(a.graphic)a.graphic.element.point=a;if(a.dataLabel)a.dataLabel.element.point=a});if(!a._hasTracking)q(a.trackerGroups,function(b){if(a[b]&&(a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){c.onTrackerMouseOut(a)}).css(e),Za))a[b].on("touchstart",f)}),a._hasTracking=!0},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,
f=a.chart,g=f.pointer,h=f.renderer,i=f.options.tooltip.snap,j=a.tracker,k=b.cursor,l=k&&{cursor:k},k=a.singlePoints,m,n=function(){if(f.hoverSeries!==a)a.onMouseOver()},o="rgba(192,192,192,"+(ba?1.0E-4:0.002)+")";if(e&&!c)for(m=e+1;m--;)d[m]==="M"&&d.splice(m+1,0,d[m+1]-i,d[m+2],"L"),(m&&d[m]==="M"||m===e)&&d.splice(m,0,"L",d[m-2]+i,d[m-1]);for(m=0;m<k.length;m++)e=k[m],d.push("M",e.plotX-i,e.plotY,"L",e.plotX+i,e.plotY);j?j.attr({d:d}):(a.tracker=h.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?
"visible":"hidden",stroke:o,fill:c?o:P,"stroke-width":b.lineWidth+(c?0:2*i),zIndex:2}).add(a.group),q([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",n).on("mouseout",function(a){g.onTrackerMouseOut(a)}).css(l);if(Za)a.on("touchstart",n)}))}};if(J.column)ha.prototype.drawTracker=T.drawTrackerPoint;if(J.pie)J.pie.prototype.drawTracker=T.drawTrackerPoint;if(J.scatter)qa.prototype.drawTracker=T.drawTrackerPoint;r(kb.prototype,{setItemEvents:function(a,b,c,d,e){var f=
this;(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");b.css(f.options.itemHoverStyle)}).on("mouseout",function(){b.css(a.visible?d:e);a.setState()}).on("click",function(b){var c=function(){a.setVisible()},b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):K(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=$("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);N(a.checkbox,
"click",function(b){K(a,"checkboxClick",{checked:b.target.checked},function(){a.select()})})}});L.legend.itemStyle.cursor="pointer";r(Xa.prototype,{showResetZoom:function(){var a=this,b=L.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f=c.relativeTo==="chart"?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).add().align(c.position,!1,f)},zoomOut:function(){var a=this;
K(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?q(this.axes,function(a){b=a.zoom()}):q(a.xAxis.concat(a.yAxis),function(a){var e=a.axis,h=e.isXAxis;if(c[h?"zoomX":"zoomY"]||c[h?"pinchX":"pinchY"])b=e.zoom(a.min,a.max),e.displayBtn&&(d=!0)});e=this.resetZoomButton;if(d&&!e)this.showResetZoom();else if(!d&&da(e))this.resetZoomButton=e.destroy();b&&this.redraw(p(this.options.chart.animation,a&&a.animation,this.pointCount<100))},
pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&q(d,function(a){a.setState()});q(b==="xy"?[1,0]:[1],function(b){var d=a[b?"chartX":"chartY"],h=c[b?"xAxis":"yAxis"][0],i=c[b?"mouseDownX":"mouseDownY"],j=(h.pointRange||0)/2,k=h.getExtremes(),l=h.toValue(i-d,!0)+j,i=h.toValue(i+c[b?"plotWidth":"plotHeight"]-d,!0)-j;h.series.length&&l>C(k.dataMin,k.min)&&i<u(k.dataMax,k.max)&&(h.setExtremes(l,i,!1,!1,{trigger:"pan"}),e=!0);c[b?"mouseDownX":"mouseDownY"]=d});e&&c.redraw(!1);A(c.container,{cursor:"move"})}});
r(Ea.prototype,{select:function(a,b){var c=this,d=c.series,e=d.chart,a=p(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[Da(c,d.data)]=c.options;c.setState(a&&"select");b||q(e.getSelectedPoints(),function(a){if(a.selected&&a!==c)a.selected=a.options.selected=!1,d.options.data[Da(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect")})})},onMouseOver:function(a){var b=this.series,c=b.chart,d=c.tooltip,e=c.hoverPoint;
if(e&&e!==this)e.onMouseOut();this.firePointEvent("mouseOver");d&&(!d.shared||b.noSharedTooltip)&&d.refresh(this,a);this.setState("hover");c.hoverPoint=this},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;this.firePointEvent("mouseOut");if(!b||Da(this,b)===-1)this.setState(),a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var a=w(this.series.options.point,this.options).events,b;this.events=a;for(b in a)N(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a,
b){var c=this.plotX,d=this.plotY,e=this.series,f=e.options.states,g=ca[e.type].marker&&e.options.marker,h=g&&!g.enabled,i=g&&g.states[a],j=i&&i.enabled===!1,k=e.stateMarkerGraphic,l=this.marker||{},m=e.chart,n=e.halo,o,a=a||"";o=this.pointAttr[a]||e.pointAttr[a];if(!(a===this.state&&!b||this.selected&&a!=="select"||f[a]&&f[a].enabled===!1||a&&(j||h&&i.enabled===!1)||a&&l.states&&l.states[a]&&l.states[a].enabled===!1)){if(this.graphic)g=g&&this.graphic.symbolName&&o.r,this.graphic.attr(w(o,g?{x:c-
g,y:d-g,width:2*g,height:2*g}:{})),k&&k.hide();else{if(a&&i)if(g=i.radius,l=l.symbol||e.symbol,k&&k.currentSymbol!==l&&(k=k.destroy()),k)k[b?"animate":"attr"]({x:c-g,y:d-g});else if(l)e.stateMarkerGraphic=k=m.renderer.symbol(l,c-g,d-g,2*g,2*g).attr(o).add(e.markerGroup),k.currentSymbol=l;if(k)k[a&&m.isInsidePlot(c,d,m.inverted)?"show":"hide"]()}if((c=f[a]&&f[a].halo)&&c.size){if(!n)e.halo=n=m.renderer.path().add(e.seriesGroup);n.attr(r({fill:ya(this.color||e.color).setOpacity(c.opacity).get()},c.attributes))[b?
"animate":"attr"]({d:this.haloPath(c.size)})}else n&&n.attr({d:[]});this.state=a}},haloPath:function(a){var b=this.series,c=b.chart,d=b.getPlotBox(),e=c.inverted;return c.renderer.symbols.circle(d.translateX+(e?b.yAxis.len-this.plotY:this.plotX)-a,d.translateY+(e?b.xAxis.len-this.plotX:this.plotY)-a,a*2,a*2)}});r(O.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&K(this,"mouseOver");this.setState("hover");a.hoverSeries=
this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;if(d)d.onMouseOut();this&&a.events.mouseOut&&K(this,"mouseOut");c&&!a.stickyTracking&&(!c.shared||this.noSharedTooltip)&&c.hide();this.setState();b.hoverSeries=null},setState:function(a){var b=this.options,c=this.graph,d=this.graphNeg,e=b.states,b=b.lineWidth,a=a||"";if(this.state!==a)this.state=a,e[a]&&e[a].enabled===!1||(a&&(b=e[a].lineWidth||b+(e[a].lineWidthPlus||0)),c&&!c.dashstyle&&(a={"stroke-width":b},c.attr(a),
d&&d.attr(a)))},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,h=c.visible;f=(c.visible=a=c.userOptions.visible=a===t?!h:a)?"show":"hide";q(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&q(d.series,function(a){if(a.options.stacking&&a.visible)a.isDirty=!0});q(c.linkedSeries,function(b){b.setVisible(a,!1)});if(g)d.isDirtyBox=
!0;b!==!1&&d.redraw();K(c,f)},setTooltipPoints:function(a){var b=[],c,d,e=this.xAxis,f=e&&e.getExtremes(),g=e?e.tooltipLen||e.len:this.chart.plotSizeX,h,i,j=[];if(!(this.options.enableMouseTracking===!1||this.singularTooltips)){if(a)this.tooltipPoints=null;q(this.segments||this.points,function(a){b=b.concat(a)});e&&e.reversed&&(b=b.reverse());this.orderTooltipPoints&&this.orderTooltipPoints(b);a=b.length;for(i=0;i<a;i++)if(e=b[i],c=e.x,c>=f.min&&c<=f.max){h=b[i+1];c=d===t?0:d+1;for(d=b[i+1]?C(u(0,
U((e.clientX+(h?h.wrappedClientX||h.clientX:g))/2)),g):g;c>=0&&c<=d;)j[c++]=e}this.tooltipPoints=j}},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=a===t?!this.selected:a;if(this.checkbox)this.checkbox.checked=a;K(this,a?"select":"unselect")},drawTracker:T.drawTrackerGraph});r(S,{Axis:ma,Chart:Xa,Color:ya,Point:Ea,Tick:Sa,Renderer:Ya,Series:O,SVGElement:G,SVGRenderer:ta,arrayMin:Na,arrayMax:Ba,charts:W,dateFormat:bb,format:Ia,pathAnim:ub,
getOptions:function(){return L},hasBidiBug:Nb,isTouchDevice:Hb,numberFormat:Ga,seriesTypes:J,setOptions:function(a){L=w(!0,L,a);Ab();return L},addEvent:N,removeEvent:X,createElement:$,discardElement:Pa,css:A,each:q,extend:r,map:Ua,merge:w,pick:p,splat:ra,extendClass:la,pInt:z,wrap:Ma,svg:ba,canvas:ga,vml:!ba&&!ga,product:"Highcharts",version:"4.0.3"})})();



(function () {

    Sapo.listOrderOffline = function () {
        function listOrderOffline(element, options) {


            //listVariantExchange.base.constructor.call(this, element, options);
            var that = this;
            if (options != null) {
                for (var option in options) {
                    this[option] = options[option];
                }
            }
            this.element = element;
            $('.t-grid-pager-boder .pagination a.t-link').each(function () {
                if ($(this).data("initAjaxClick"))
                    return;
                $(this).data("initAjaxClick", true);

                $(this).click(function () {

                    var link = $(this).attr('href');
                    that.loadPageAdded(that.initTable, link);
                    return false;

                });
            })
            that.$filterForm = $("#frmFilter");
            Sapo.setDatePicker();
            that.initTable();
        }
        listOrderOffline.prototype.setFilterFormQueryValue = function (name, value) {

            var $filterItem = this.$filterForm.find("input[name=" + name + "]");
            if ($filterItem.length !== 0) {
                $filterItem.val(value);
            } else {
                this.$filterForm.append("<input type='hidden' name='" + name + "' value='" + value + "' />");
            }
        }
        //extend(Sapo.BaseFilterAndSaveSearch, listVariantExchange);
        listOrderOffline.prototype.initTable = function () {
            var that = this;
            $(".header__main span.title").text($("#title-head").val());
            var paddingTop = 335;
            if ($(".header-common-right").height() < 335) {
                paddingTop = $(".header-common-right").height();
            }
            else {
                //fix code
                paddingTop = $('.header-common-right .filter-tab-list').height() + 75 + 216;
            }
            //$('.boder-table').css({ "padding-top": paddingTop - 1 });
            $('#sapo-modal-container #parent-variant').fixedHeaderTable({

                create: function () {

                    $('#sapo-modal-container #parent-variant').css({ "width": "100%" });
                    var colLeftWidth = 0;
                    if ($(".colLeft").css("display") == "none") {
                        colLeftWidth = 0;
                    }
                    else {
                        colLeftWidth = $('#left-nav').width() + 20;
                    }
                    $('#sapo-modal-container .fht-thead').css({
                        "border-top": "0px #ddd solid", "position": "fixed",
                        "z-index": "1000", "width": "calc(100% - " + colLeftWidth + "px)",
                        "width": "99.9%"
                    });
                    $("#sapo-modal-container .fht-table-wrapper").css('min-height', ($(window).height() - 400));

                    $("#sapo-modal-container .fht-table-wrapper").css('max-height', ($(window).height() - 200));

                    //$("#sapo-modal-container .fht-tbody").css('overflow', 'hidden');
                    tooltip($("#sapo-modal-container table.defaul-table thead th"));
                    tooltip($("#sapo-modal-container table.defaul-table tbody td span"));
                    $('#sapo-modal-container .fht-tbody').css({
                        "margin-top": "38px"
                    });
                    $('#sapo-modal-container .fht-tbody').css({
                        "height": "calc(100% - 40px)",
                        "overflow-y": "auto",
                        "overflow-x": "hidden",
                        "margin-top": "38px"
                    });
                    $('#sapo-modal-container #parent-variant').css({
                        "margin-top": "-38px"
                    });
                    Bindings.unbind($("#sapo-modal-container .boder-table")[0]);
                    Bindings.bind($("#sapo-modal-container .boder-table")[0]);
                }
            });

            var scroll = document.querySelector.bind(document);

            Ps.initialize(scroll('#sapo-modal-container .fht-table-wrapper'), {
                theme: 'big-and-ugly'
            });

        }
        listOrderOffline.prototype.goTodetail = function (node, event, variantId, variant) {
            var that = this;
            var instance = window.Bindings.context(document.body).draftOrder;

            instance.getUnitsAndAddLineItemGift(variant);
            Sapo.NewModal.hide();
        }
        listOrderOffline.prototype.loadPageAdded = function (filter, url) {
            var that = this;
            console.log(Order)
            Order.dao.getByFilter(filter,
                function (data) {
                    var html = "";
                    var parent = "";

                    for (var i = 0; i < data.orders.length; i++) {
                        var itemOrder = data.orders[i];
                        if (itemOrder.error != undefined && itemOrder.error != null && itemOrder.error.length > 500) {
                            itemOrder.error = "Hệ thống đang nâng cấp"
                        }
                        if (itemOrder.error != undefined && itemOrder.error != null && itemOrder.error.length > 250) {
                            itemOrder.error.substring(0, 250)
                        }
                        if (itemOrder.shippingAddress != null && itemOrder.shippingAddress != undefined &&
                            itemOrder.shippingAddress.address1 != undefined && itemOrder.shippingAddress.address1 != null)
                            itemOrder.customerAddress = itemOrder.shippingAddress.address1;
                        else
                            itemOrder.customerAddress = ""
                        if (itemOrder.phoneNumber == undefined || itemOrder.phoneNumber == null)
                            itemOrder.phoneNumber = "";
                        var status = "";
                        var refreshButton = "";
                        var failDetail = "";
                        '<a class="btn btn-default" style="border:1px solid #cccccc; background-color: white;color: #151313">Đồng bộ lại</a>'
                        if (itemOrder.synch_status == "waiting") status = 'Chưa đồng bộ';
                        else if (itemOrder.synch_status == "failed") {
                            status = "Đồng bộ lỗi";
                            refreshButton = '<a class="btn btn-blank btn-reloadOrderOffline" bind-event-click="ReloadOrderOffline(' + JSON.stringify(filter).replace(/"/g, "&quot;") + ',' + JSON.stringify(itemOrder).replace(/"/g, "&quot;") + ')">Đồng bộ lại</a>';
                            failDetail = itemOrder.error;
                        }
                        else if (itemOrder.synch_status == "completed") status = "Đã đồng bộ";
                        var customerName = (itemOrder.customerName == null || itemOrder.customerName == undefined) ? "" : itemOrder.customerName;
                        if ((itemOrder.customerName == null || itemOrder.customerName == undefined) &&
                            (itemOrder.customerId == null || itemOrder.customerId == undefined || itemOrder.customerId == "")) {
                            customerName = "Khách lẻ"
                        }
                        var test = '<tr>' +
                            '<td class="btn-drilldown"><i class="fa icon-angle fa-angle-double-right"  bind-event-click="openDrilldown(' + itemOrder.local_id + ',this)"></i></td>' +
                            '<td class="left-td">' + itemOrder.code + '</td>' +
                            '<td class="left-td">' + that.FormatISODateStringToHMSDMY(itemOrder.local_created_on) + '</td>' +
                            '<td class="left-td">' + itemOrder.assigneeName + '</td>' +
                            '<td class="left-td">' + customerName + '<br/>' + itemOrder.phoneNumber + '<br/>' + itemOrder.customerAddress + '</td>' +
                            '<td class="right-td">' + $.formatNumber(itemOrder.offlineTotalAmount, { format: "#,##0.###", locale: "en" }) + '</td>' +
                            '<td class="left-td">' + status + '</td>' +
                            '<td class="left-td">' + failDetail + '</td>' +
                            '<td class="left-td">' + refreshButton + '</td>' +
                            '</tr>';
                        test += '<tr id="SOF-detail-' + itemOrder.local_id + '"><td colspan="100%" style="padding:0!important"></td></tr>'
                        html += test;
                    }
                    var pos = Twine.context($('body').get(0)).draftOrder;
                    var pager = pos.initPagerBoder(data.count, filter);

                    parent = '<div id="table-height" class="bulk-action-context">' +
                        '<table class="table defaul-table" id="parent-variant" style="margin-top: 0px !important;">' +
                        '<thead>' +
                        '<tr>' +
                        '<th style="width:20px"></th>' +
                        '<th style="width: 130px" class="left-th">Mã đơn hàng</th>' +
                        '<th style="width: 90px" class="left-th">Ngày tạo</th>' +
                        '<th style="width: 120px" class="left-th">Người tạo đơn</th>' +
                        '<th style="width: 120px" class="left-th">Khách hàng</th>' +
                        '<th style="width: 120px" class="right-th">Tổng giá trị</th>' +
                        '<th style="width: 110px" class="left-th">Trạng thái</th>' +
                        '<th style="width: 225px" class="left-th">Lỗi đồng bộ</th>' +
                        '<th style="width: 115px">Thao tác</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody class="tbody-scoler" id="line_item_order_offline_popup" >' +
                        html +
                        '</tbody>' +
                        '</table>' +
                        '</div>' +
                        '<div class="t-grid-pager-boder row" data-original-title="" id="pager-boder-order-offline">' +
                        pager +
                        '</div>';

                    var $offlineOrderTable = $("#sapo-modal-container #offlineOrderTable");
                    $offlineOrderTable.html(parent);
                    that.initTable();
                    tooltip($("a"));
                },
                function (error) { }

            )
        }
        listOrderOffline.prototype.openDrilldown = function (id, thiz) {
            var that = this;
            if ($("#SOF-detail-" + id + " .order-detail").length > 0) {
                $("#SOF-detail-" + id + " .order-detail").remove();
                $(thiz).parents("tr").find(".btn-drilldown i").addClass("fa-angle-double-right");
                $(thiz).parents("tr").find(".btn-drilldown i").removeClass("fa-angle-double-down");
            } else {
                Order.dao.getByLocalId(id,
                    function (data) {
                        console.log(data)
                        if (data.offlineTotal != null && data.offlineTotal != undefined)
                            data.offlineTotalFormat = money(data.offlineTotal, ",", ".", 0, "");
                        else
                            data.offlineTotalFormat = 0;

                        if (data.offlineTotalAmount != null && data.offlineTotalAmount != undefined)
                            data.offlineTotalAmountFormat = money(data.offlineTotalAmount, ",", ".", 0, "");
                        else
                            data.offlineTotalAmountFormat = 0;
                        data.offlinePaymentAmountCustomer = 0;
                        if (data.prePayments != null && data.prePayments != undefined && data.prePayments.length > 0) {
                            data.prePayments.forEach(function (payment, indexPayment) {
                                if (payment != null && payment != undefined) {
                                    payment.amountFormat = money(payment.amount, ",", ".", 0, "");
                                    data.offlinePaymentAmountCustomer += payment.amount;
                                }
                            })
                        }
                        data.offlinePaymentAmountCustomerFormat = money(data.offlinePaymentAmountCustomer, ",", ".", 0, "");

                        data.totalDiscountFormat = that.totalDiscountOrder(data)
                        if (data.orderLineItems != null && data.orderLineItems != undefined && data.orderLineItems.length > 0) {
                            data.orderLineItems.forEach(function (lineItem, indexItem) {
                                lineItem.item_index = indexItem + 1;
                                if (lineItem.price != null && lineItem.price != undefined)
                                    lineItem.priceFormat = money(lineItem.price, ",", ".", 0, "");
                                else
                                    lineItem.priceFormat = 0;

                                if (lineItem.vatamount != null && lineItem.vatamount != undefined)
                                    lineItem.vatamountFormat = money(lineItem.vatamount, ",", ".", 0, "");
                                else
                                    lineItem.vatamountFormat = 0;
                                if (lineItem.discountItems != null && lineItem.discountItems != undefined && lineItem.discountItems.length > 0) {
                                    lineItem.totalDiscountFormat = that.totalDiscountLineItem(lineItem)
                                }
                                if (lineItem.isFreeform == true)
                                    lineItem.name = lineItem.note;
                            })
                        }
                        if (data.taxTreatment == "exclusive")
                            data.taxTreatmentVn = "Giá chưa bao gồm thuế";
                        else
                            data.taxTreatmentVn = "Giá đã bao gồm thuế";

                        data.tags = data.tags.toString();
                        var template = $('#item-order-detail-template').html();
                        var html = Mustache.render(template, { "order_detail": data });
                        $(thiz).parents("tr").find(".btn-drilldown i").removeClass("fa-angle-double-right");
                        $(thiz).parents("tr").find(".btn-drilldown i").addClass("fa-angle-double-down");
                        $("#SOF-detail-" + id + " td").html(html);
                    },
                    function (error) { }
                )
            }
        }
        listOrderOffline.prototype.totalDiscountLineItem = function (orderLineItem) {
            var total = 0;

            if (orderLineItem != undefined && orderLineItem != null &&
                orderLineItem.discountItems != null && orderLineItem.discountItems != undefined && orderLineItem.discountItems.length > 0) {
                var rate = 0;
                var value = 0;
                orderLineItem.discountItems.forEach(function (discountItem, indexDiscount) {
                    if (discountItem != null) {
                        if (discountItem.rate != null && discountItem.rate != undefined && discountItem.rate > 0)
                            rate += discountItem.rate;
                        if (discountItem.value != null && discountItem.value != undefined && discountItem.value > 0)
                            value += discountItem.value;
                    }
                })
                total = orderLineItem.price * orderLineItem.quantity * rate / 100 + value;
                return money(total, ",", ".", 0, "");
            }
            return 0;
        }
        listOrderOffline.prototype.totalDiscountOrder = function (order) {
            var total = 0;

            if (order != undefined && order != null &&
                order.discountItems != null && order.discountItems != undefined && order.discountItems.length > 0) {
                var rate = 0;
                var value = 0;
                order.discountItems.forEach(function (discountItem, indexDiscount) {
                    if (discountItem != null) {
                        if (discountItem.rate != null && discountItem.rate != undefined && discountItem.rate > 0)
                            rate += discountItem.rate;
                        if (discountItem.value != null && discountItem.value != undefined && discountItem.value > 0)
                            value += discountItem.value;
                    }
                })
                total = order.offlineTotal * rate / 100 + value;
                return money(total, ",", ".", 0, "");
            }
            return 0;
        }
        listOrderOffline.prototype.FormatISODateStringToHMSDMY = function (date) {
            var str = date.split("T");
            var days = str[0];
            var year = days.split("-")[0];
            var month = days.split("-")[1];
            var day = days.split("-")[2];

            var hour = ((str[1].split("Z"))[0].split("."))[0];

            return day + "/" + month + "/" + year + ' ' + hour;
        }


        listOrderOffline.prototype.loadPagePaginationAdded = function (url) {

            var that = this;
            if (that.ajaxRequest)
                that.ajaxRequest.abort();
            url = typeof url !== 'undefined' ? url : ajaxUrls.listVariantExchange + '?' + $("#frmFilter").serialize();
            that.ajaxRequest = Sapo.Utility.loadAjax(url, "#fatherFormFilterAndSavedSearch", function () {
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
            }, { hide: false });
        }
        listOrderOffline.prototype.editNameSearched = function () {
            var that = this;
            this.gethtml_search_active = $("li.filter-tab-active").html();
            $("li.filter-tab-active").empty();
            $("li.filter-tab-active").append('<div class="form-group" style="float:left;">' +
                '<div class="controls">' +
                '<input bind="filter_name" class="input-validation-error form-control form-control-input-popup sapo-textbox" data-val="true" data-val-length="Tên tùy chọn sản phẩm tối đa 255 ký tự" data-val-length-max="255" data-val-required="Tên tùy chọn sản phẩm không được để trống" placeholder="Điền vào tên bộ lọc" id="add-filter-common-filtername" name="FilterName" style="width:100%" type="text" value="">' +
                '</div>' +
                '</div>');
            $("li.filter-tab-active").attr("id", "add-filter-common");
            Bindings.unbind($("li.filter-tab-active")[0]);
            Bindings.bind($("li.filter-tab-active")[0]);
            Bindings.refreshImmediately();

            $(".quick-finter").html($(".load-filter-searchId").html());
            Bindings.unbind($(".quick-finter")[0]);
            Bindings.bind($(".quick-finter")[0]);


            $("div.finter-content").css({ "display": "block" });

            initFilterTemplate();
            initPostion();
            that.initTable()
        }
        listOrderOffline.prototype.getListOrderOfflineByFilter = function (e) {
            var that = this;
            var filter = {};
            filter.page = 1;
            filter.limit = 10;
            var create_on_min = new Date(that.formatStringToDDMMYYY(that.created_on_min));
            var create_on_max = new Date(that.formatStringToDDMMYYY(that.created_on_max));
            create_on_max.setHours(create_on_max.getHours() + 31)
            create_on_max.setSeconds(create_on_max.getSeconds() - 1);

            create_on_min.setHours(create_on_min.getHours() + 7)
            filter.created_on_min = create_on_min.toISOString();
            filter.created_on_max = create_on_max.toISOString();
            filter.query = that.query;
            filter.synch_status = $("#status-sync-order").val();
            this.loadPageAdded(filter);
        }

        listOrderOffline.prototype.formatStringToDDMMYYY = function (str) {
            var splitted = str.split("/");
            return splitted[1] + "/" + splitted[0] + "/" + splitted[2];
        }

        function initPostion() {
            if ($('.quick-filter-list > .quick-filter-row:visible').length > 0) {
                for (i = 0; i < $('.quick-filter-list > .quick-filter-row:visible').length; i++) {
                    $($('.quick-filter-list > .quick-filter-row:visible')[i]).css({ "order": i.toString() }).data("displayOrder", i);
                }
            }
        }


        //phân trang

        listOrderOffline.prototype.NextPageOrderOffline = function (currentFilter) {
            if (currentFilter.totalPage > currentFilter.page)
                currentFilter.page += 1;
            this.loadPageAdded(currentFilter);
        }

        listOrderOffline.prototype.PreviousPageOrderOffline = function (currentFilter) {
            if (currentFilter.page > 1) currentFilter.page -= 1;
            this.loadPageAdded(currentFilter);
        }

        listOrderOffline.prototype.GoToPageOrderOffline = function (currentFilter, page) {
            currentFilter.page = page;
            this.loadPageAdded(currentFilter);

        }

        listOrderOffline.prototype.ReloadOrderOffline = function (filter, model, thiz) {
            $(".btn-reloadOrderOffline").addClass("disabled").html(Sapo.LOADING);
            var that = this;
            Order.synch.post(model,
                function (data) {
                    that.loadPageAdded(filter);
                    $(".btn-reloadOrderOffline").removeClass("disabled").html("Đồng bộ lại");
                },
                function (error) {
                    Sapo.Flash.error(error);
                    $(".btn-reloadOrderOffline").removeClass("disabled").html("Đồng bộ lại");
                })
        }

        return listOrderOffline;
    }();
}).call(this);

/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(a){return a}function c(a){return decodeURIComponent(a.replace(e," "))}function d(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return f.json?JSON.parse(a):a}catch(b){}}var e=/\+/g,f=a.cookie=function(e,g,h){if(void 0!==g){if(h=a.extend({},f.defaults,h),"number"==typeof h.expires){var i=h.expires,j=h.expires=new Date;j.setDate(j.getDate()+i)}return g=f.json?JSON.stringify(g):String(g),document.cookie=[f.raw?e:encodeURIComponent(e),"=",f.raw?g:encodeURIComponent(g),h.expires?"; expires="+h.expires.toUTCString():"",h.path?"; path="+h.path:"",h.domain?"; domain="+h.domain:"",h.secure?"; secure":""].join("")}for(var k=f.raw?b:c,l=document.cookie.split("; "),m=e?void 0:{},n=0,o=l.length;o>n;n++){var p=l[n].split("="),q=k(p.shift()),r=k(p.join("="));if(e&&e===q){m=d(r);break}e||(m[q]=d(r))}return m};f.defaults={},a.removeCookie=function(b,c){return void 0!==a.cookie(b)?(a.cookie(b,"",a.extend({},c,{expires:-1})),!0):!1}});
/*
 * jQuery Navgoco Menus Plugin v0.2.1 (2014-04-11)
 * https://github.com/tefra/navgoco
 *
 * Copyright (c) 2014 Chris T (@tefra)
 * BSD - https://github.com/tefra/navgoco/blob/master/LICENSE-BSD
 */
(function($) {

	"use strict";

	/**
	 * Plugin Constructor. Every menu must have a unique id which will either
	 * be the actual id attribute or its index in the page.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Integer} idx
	 * @returns {Object} Plugin Instance
	 */
	var Plugin = function(el, options, idx) {
		this.el = el;
		this.$el = $(el);
		this.options = options;
		this.uuid = this.$el.attr('id') ? this.$el.attr('id') : idx;
		this.state = {};
		this.init();
		return this;
	};

	/**
	 * Plugin methods
	 */
	Plugin.prototype = {
		/**
		 * Load cookie, assign a unique data-index attribute to
		 * all sub-menus and show|hide them according to cookie
		 * or based on the parent open class. Find all parent li > a
		 * links add the carent if it's on and attach the event click
		 * to them.
		 */
		init: function() {
			var self = this;
			self._load();
			self.$el.find('ul').each(function(idx) {
				var sub = $(this);
				sub.attr('data-index', idx);
				if (self.options.save && self.state.hasOwnProperty(idx)) {
					sub.parent().addClass(self.options.openClass);
					sub.show();
				} else if (sub.parent().hasClass(self.options.openClass)) {
					sub.show();
					self.state[idx] = 1;
				} else {
					sub.hide();
				}
			});

			var caret = $('<span></span>').prepend(self.options.caretHtml);
			var links = self.$el.find("li > a");
			self._trigger(caret, false);
			self._trigger(links, true);
			self.$el.find("li:has(ul) > a").prepend(caret);
		},
		/**
		 * Add the main event trigger to toggle menu items to the given sources
		 * @param {Element} sources
		 * @param {Boolean} isLink
		 */
		_trigger: function(sources, isLink) {
			var self = this;
			sources.on('click', function(event) {
				event.stopPropagation();
				var sub = isLink ? $(this).next() : $(this).parent().next();
				var isAnchor = false;
				if (isLink) {
					var href = $(this).attr('href');
					isAnchor = href === undefined || href === '' || href === '#';
				}
				sub = sub.length > 0 ? sub : false;
				self.options.onClickBefore.call(this, event, sub);

				if (!isLink || sub && isAnchor) {
					event.preventDefault();
					self._toggle(sub, sub.is(":hidden"));
					self._save();
				} else if (self.options.accordion) {
					var allowed = self.state = self._parents($(this));
					self.$el.find('ul').filter(':visible').each(function() {
						var sub = $(this),
							idx = sub.attr('data-index');

						if (!allowed.hasOwnProperty(idx)) {
							self._toggle(sub, false);
						}
					});
					self._save();
				}
				self.options.onClickAfter.call(this, event, sub);
			});
		},
		/**
		 * Accepts a JQuery Element and a boolean flag. If flag is false it removes the `open` css
		 * class from the parent li and slides up the sub-menu. If flag is open it adds the `open`
		 * css class to the parent li and slides down the menu. If accordion mode is on all
		 * sub-menus except the direct parent tree will close. Internally an object with the menus
		 * states is maintained for later save duty.
		 *
		 * @param {Element} sub
		 * @param {Boolean} open
		 */
		_toggle: function(sub, open) {
			var self = this,
				idx = sub.attr('data-index'),
				parent = sub.parent();

			self.options.onToggleBefore.call(this, sub, open);
			if (open) {
				parent.addClass(self.options.openClass);
				sub.slideDown(self.options.slide);
				self.state[idx] = 1;

				if (self.options.accordion) {
					var allowed = self.state = self._parents(sub);
					allowed[idx] = self.state[idx] = 1;

					self.$el.find('ul').filter(':visible').each(function() {
						var sub = $(this),
							idx = sub.attr('data-index');

						if (!allowed.hasOwnProperty(idx)) {
							self._toggle(sub, false);
						}
					});
				}
			} else {
				parent.removeClass(self.options.openClass);
				sub.slideUp(self.options.slide);
				self.state[idx] = 0;
			}
			self.options.onToggleAfter.call(this, sub, open);
		},
		/**
		 * Returns all parents of a sub-menu. When obj is true It returns an object with indexes for
		 * keys and the elements as values, if obj is false the object is filled with the value `1`.
		 *
		 * @since v0.1.2
		 * @param {Element} sub
		 * @param {Boolean} obj
		 * @returns {Object}
		 */
		_parents: function(sub, obj) {
			var result = {},
				parent = sub.parent(),
				parents = parent.parents('ul');

			parents.each(function() {
				var par = $(this),
					idx = par.attr('data-index');

				if (!idx) {
					return false;
				}
				result[idx] = obj ? par : 1;
			});
			return result;
		},
		/**
		 * If `save` option is on the internal object that keeps track of the sub-menus states is
		 * saved with a cookie. For size reasons only the open sub-menus indexes are stored.		 *
		 */
		_save: function() {
			if (this.options.save) {
				var save = {};
				for (var key in this.state) {
					if (this.state[key] === 1) {
						save[key] = 1;
					}
				}
				cookie[this.uuid] = this.state = save;
				$.cookie(this.options.cookie.name, JSON.stringify(cookie), this.options.cookie);
			}
		},
		/**
		 * If `save` option is on it reads the cookie data. The cookie contains data for all
		 * navgoco menus so the read happens only once and stored in the global `cookie` var.
		 */
		_load: function() {
			if (this.options.save) {
				if (cookie === null) {
					var data = $.cookie(this.options.cookie.name);
					cookie = (data) ? JSON.parse(data) : {};
				}
				this.state = cookie.hasOwnProperty(this.uuid) ? cookie[this.uuid] : {};
			}
		},
		/**
		 * Public method toggle to manually show|hide sub-menus. If no indexes are provided all
		 * items will be toggled. You can pass sub-menus indexes as regular params. eg:
		 * navgoco('toggle', true, 1, 2, 3, 4, 5);
		 *
		 * Since v0.1.2 it will also open parents when providing sub-menu indexes.
		 *
		 * @param {Boolean} open
		 */
		toggle: function(open) {
			var self = this,
				length = arguments.length;

			if (length <= 1) {
				self.$el.find('ul').each(function() {
					var sub = $(this);
					self._toggle(sub, open);
				});
			} else {
				var idx,
					list = {},
					args = Array.prototype.slice.call(arguments, 1);
				length--;

				for (var i = 0; i < length; i++) {
					idx = args[i];
					var sub = self.$el.find('ul[data-index="' + idx + '"]').first();
					if (sub) {
						list[idx] = sub;
						if (open) {
							var parents = self._parents(sub, true);
							for (var pIdx in parents) {
								if (!list.hasOwnProperty(pIdx)) {
									list[pIdx] = parents[pIdx];
								}
							}
						}
					}
				}

				for (idx in list) {
					self._toggle(list[idx], open);
				}
			}
			self._save();
		},
		/**
		 * Removes instance from JQuery data cache and unbinds events.
		 */
		destroy: function() {
			$.removeData(this.$el);
			this.$el.find("li:has(ul) > a").unbind('click');
			this.$el.find("li:has(ul) > a > span").unbind('click');
		}
	};

	/**
	 * A JQuery plugin wrapper for navgoco. It prevents from multiple instances and also handles
	 * public methods calls. If we attempt to call a public method on an element that doesn't have
	 * a navgoco instance, one will be created for it with the default options.
	 *
	 * @param {Object|String} options
	 */
	$.fn.navgoco = function(options) {
		if (typeof options === 'string' && options.charAt(0) !== '_' && options !== 'init') {
			var callback = true,
				args = Array.prototype.slice.call(arguments, 1);
		} else {
			options = $.extend({}, $.fn.navgoco.defaults, options || {});
			if (!$.cookie) {
				options.save = false;
			}
		}
		return this.each(function(idx) {
			var $this = $(this),
				obj = $this.data('navgoco');

			if (!obj) {
				obj = new Plugin(this, callback ? $.fn.navgoco.defaults : options, idx);
				$this.data('navgoco', obj);
			}
			if (callback) {
				obj[options].apply(obj, args);
			}
		});
	};
	/**
	 * Global var holding all navgoco menus open states
	 *
	 * @type {Object}
	 */
	var cookie = null;

	/**
	 * Default navgoco options
	 *
	 * @type {Object}
	 */
	$.fn.navgoco.defaults = {
		caretHtml: '',
		accordion: false,
		openClass: 'open',
		save: true,
		cookie: {
			name: 'navgoco',
			expires: false,
			path: '/'
		},
		slide: {
			duration: 400,
			easing: 'swing'
		},
		onClickBefore: $.noop,
		onClickAfter: $.noop,
		onToggleBefore: $.noop,
		onToggleAfter: $.noop
	};
})(jQuery);

(function ($) {
  "use strict";

  var defaultOptions = {
    tagClass: function(item) {
      return 'label label-info';
    },
    itemValue: function(item) {
      return item ? item.toString() : item;
    },
    itemText: function(item) {
      return this.itemValue(item);
    },
    freeInput: true,
    addOnBlur: true,
    maxTags: undefined,
    maxChars: undefined,
    confirmKeys: [13, 44],
    onTagExists: function(item, $tag) {
      $tag.hide().fadeIn();
    },
      //trimValue: false,
    trimValue: true,
    allowDuplicates: false
  };

  /**
   * Constructor function
   */
  function TagsInput(element, options) {
    this.itemsArray = [];

    this.$element = $(element);
    this.$element.hide();

    this.isSelect = (element.tagName === 'SELECT');
    this.multiple = (this.isSelect && element.hasAttribute('multiple'));
    this.objectItems = options && options.itemValue;
    this.placeholderText = element.hasAttribute('placeholder') ? this.$element.attr('placeholder') : '';
    //this.inputSize = Math.max(1, this.placeholderText.length);
    this.inputSize = Math.max(1, 4);
    this.$container = $('<div class="bootstrap-tagsinput form-control"></div>');
  
    this.$input = $('<input type="text"  placeholder="' + this.placeholderText + '"/>').appendTo(this.$container);

    this.$element.after(this.$container);

    var inputWidth = (this.inputSize < 3 ? 3 : this.inputSize) + "em";
    //this.$input.get(0).style.cssText = "width: " + inputWidth + " !important;";
    this.build(options);
  }

  TagsInput.prototype = {
    constructor: TagsInput,

    /**
     * Adds the given item as a new tag. Pass true to dontPushVal to prevent
     * updating the elements val()
     */
    add: function(item, dontPushVal) {
      var self = this;
     
      if (self.options.maxTags && self.itemsArray.length >= self.options.maxTags)
        return;
      if (self.itemsArray.length > 0) self.$input.attr('placeholder', '');
      else {         
          self.$input.attr('placeholder', self.placeholderText);
         self.$input.attr('size', this.placeholderText.length);
      }

      // Ignore falsey values, except false
      if (item !== false && !item)
        return;

      // Trim value
      if (typeof item === "string" && self.options.trimValue) {
        item = $.trim(item);
      }

      // Throw an error when trying to add an object while the itemValue option was not set
      if (typeof item === "object" && !self.objectItems)
        throw("Can't add objects when itemValue option is not set");

      // Ignore strings only containg whitespace
      if (item.toString().match(/^\s*$/))
        return;

      // If SELECT but not multiple, remove current tag
      if (self.isSelect && !self.multiple && self.itemsArray.length > 0)
        self.remove(self.itemsArray[0]);

      if (typeof item === "string" && this.$element[0].tagName === 'INPUT') {
        var items = item.split(',');
        if (items.length > 1) {
          for (var i = 0; i < items.length; i++) {
            this.add(items[i], true);
          }

          if (!dontPushVal)
            self.pushVal();
          return;
        }
      }

      var itemValue = self.options.itemValue(item),
          itemText = self.options.itemText(item),
          tagClass = self.options.tagClass(item);

      // Ignore items allready added
      var existing = $.grep(self.itemsArray, function(item) { return self.options.itemValue(item) === itemValue; } )[0];
      if (existing && !self.options.allowDuplicates) {
        // Invoke onTagExists
        if (self.options.onTagExists) {
          var $existingTag = $(".tag", self.$container).filter(function() { return $(this).data("item") === existing; });
          self.options.onTagExists(item, $existingTag);
        }
        return;
      }

      // if length greater than limit
      if (self.items().toString().length + item.length + 1 > self.options.maxInputLength)
        return;

      // raise beforeItemAdd arg
      var beforeItemAddEvent = $.Event('beforeItemAdd', { item: item, cancel: false });
      self.$element.trigger(beforeItemAddEvent);
      if (beforeItemAddEvent.cancel)
        return;

      // register item in internal array and map
      self.itemsArray.push(item);
      if (self.itemsArray.length > 0) self.$input.attr('placeholder', '');
      else {
          self.$input.attr('placeholder', self.placeholderText);
          self.$input.attr('size', this.placeholderText.length);
      }
      // add a tag element
      var $tag = $('<span class="tag ' + htmlEncode(tagClass) + '">' + htmlEncode(itemText) + '<span data-role="remove"></span></span>');
      $tag.data('item', item);
      self.findInputWrapper().before($tag);
      $tag.after(' ');

      // add <option /> if item represents a value not present in one of the <select />'s options
      if (self.isSelect && !$('option[value="' + encodeURIComponent(itemValue) + '"]',self.$element)[0]) {
        var $option = $('<option selected>' + htmlEncode(itemText) + '</option>');
        $option.data('item', item);
        $option.attr('value', itemValue);
        self.$element.append($option);
      }

      if (!dontPushVal)
        self.pushVal();

      // Add class when reached maxTags
      if (self.options.maxTags === self.itemsArray.length || self.items().toString().length === self.options.maxInputLength)
        self.$container.addClass('bootstrap-tagsinput-max');

      self.$element.trigger($.Event('itemAdded', { item: item }));
    },

    /**
     * Removes the given item. Pass true to dontPushVal to prevent updating the
     * elements val()
     */
    remove: function(item, dontPushVal) {
      var self = this;

      if (self.objectItems) {
        if (typeof item === "object")
          item = $.grep(self.itemsArray, function(other) { return self.options.itemValue(other) ==  self.options.itemValue(item); } );
        else
          item = $.grep(self.itemsArray, function(other) { return self.options.itemValue(other) ==  item; } );

        item = item[item.length-1];
      }

      if (item) {
        var beforeItemRemoveEvent = $.Event('beforeItemRemove', { item: item, cancel: false });
        self.$element.trigger(beforeItemRemoveEvent);
        if (beforeItemRemoveEvent.cancel)
          return;

        $('.tag', self.$container).filter(function() { return $(this).data('item') === item; }).remove();
        $('option', self.$element).filter(function() { return $(this).data('item') === item; }).remove();
        if($.inArray(item, self.itemsArray) !== -1)
          self.itemsArray.splice($.inArray(item, self.itemsArray), 1);
      }

      if (!dontPushVal)
        self.pushVal();

      // Remove class when reached maxTags
      if (self.options.maxTags > self.itemsArray.length)
        self.$container.removeClass('bootstrap-tagsinput-max');

      self.$element.trigger($.Event('itemRemoved',  { item: item }));
    },

    /**
     * Removes all items
     */
    removeAll: function() {
      var self = this;

      $('.tag', self.$container).remove();
      $('option', self.$element).remove();

      while(self.itemsArray.length > 0)
        self.itemsArray.pop();

      self.pushVal();
    },

    /**
     * Refreshes the tags so they match the text/value of their corresponding
     * item.
     */
    refresh: function() {
      var self = this;
      $('.tag', self.$container).each(function() {
        var $tag = $(this),
            item = $tag.data('item'),
            itemValue = self.options.itemValue(item),
            itemText = self.options.itemText(item),
            tagClass = self.options.tagClass(item);

          // Update tag's class and inner text
          $tag.attr('class', null);
          $tag.addClass('tag ' + htmlEncode(tagClass));
          $tag.contents().filter(function() {
            return this.nodeType == 3;
          })[0].nodeValue = htmlEncode(itemText);

          if (self.isSelect) {
            var option = $('option', self.$element).filter(function() { return $(this).data('item') === item; });
            option.attr('value', itemValue);
          }
      });
    },

    /**
     * Returns the items added as tags
     */
    items: function() {
      return this.itemsArray;
    },

    /**
     * Assembly value by retrieving the value of each item, and set it on the
     * element.
     */
    pushVal: function() {
      var self = this,
          val = $.map(self.items(), function(item) {
            return self.options.itemValue(item).toString();
          });

      self.$element.val(val, true).trigger('change');
    },

    /**
     * Initializes the tags input behaviour on the element
     */
    build: function(options) {
      var self = this;

      self.options = $.extend({}, defaultOptions, options);
      // When itemValue is set, freeInput should always be false
      if (self.objectItems)
        self.options.freeInput = false;

      makeOptionItemFunction(self.options, 'itemValue');
      makeOptionItemFunction(self.options, 'itemText');
      makeOptionFunction(self.options, 'tagClass');
      
      // Typeahead Bootstrap version 2.3.2
      if (self.options.typeahead) {
        var typeahead = self.options.typeahead || {};

        makeOptionFunction(typeahead, 'source');

        self.$input.typeahead($.extend({}, typeahead, {
          source: function (query, process) {
            function processItems(items) {
              var texts = [];

              for (var i = 0; i < items.length; i++) {
                var text = self.options.itemText(items[i]);
                map[text] = items[i];
                texts.push(text);
              }
              process(texts);
            }

            this.map = {};
            var map = this.map,
                data = typeahead.source(query);

            if ($.isFunction(data.success)) {
              // support for Angular callbacks
              data.success(processItems);
            } else if ($.isFunction(data.then)) {
              // support for Angular promises
              data.then(processItems);
            } else {
              // support for functions and jquery promises
              $.when(data)
               .then(processItems);
            }
          },
          updater: function (text) {
            self.add(this.map[text]);
          },
          matcher: function (text) {
            return (text.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1);
          },
          sorter: function (texts) {
            return texts.sort();
          },
          highlighter: function (text) {
            var regex = new RegExp( '(' + this.query + ')', 'gi' );
            return text.replace( regex, "<strong>$1</strong>" );
          }
        }));
      }

      // typeahead.js
      if (self.options.typeaheadjs) {
          var typeaheadjs = self.options.typeaheadjs || {};
          
          self.$input.typeahead(null, typeaheadjs).on('typeahead:selected', $.proxy(function (obj, datum) {
            if (typeaheadjs.valueKey)
              self.add(datum[typeaheadjs.valueKey]);
            else
              self.add(datum);
            self.$input.typeahead('val', '');
          }, self));
      }

      self.$container.on('click', $.proxy(function(event) {
        if (! self.$element.attr('disabled')) {
          self.$input.removeAttr('disabled');
        }
        self.$input.focus();
      }, self));

        if (self.options.addOnBlur && self.options.freeInput) {
          self.$input.on('focusout', $.proxy(function(event) {
              // HACK: only process on focusout when no typeahead opened, to
              //       avoid adding the typeahead text as tag
              if ($('.typeahead, .twitter-typeahead', self.$container).length === 0) {
                self.add(self.$input.val());
                self.$input.val('');
              }
          }, self));
        }
        

      self.$container.on('keydown', 'input', $.proxy(function(event) {
        var $input = $(event.target),
            $inputWrapper = self.findInputWrapper();

        if (self.$element.attr('disabled')) {
          self.$input.attr('disabled', 'disabled');
          return;
        }

        switch (event.which) {
          // BACKSPACE
          case 8:
            if (doGetCaretPosition($input[0]) === 0) {
              var prev = $inputWrapper.prev();
              if (prev) {
                self.remove(prev.data('item'));
              }
            }
            break;

          // DELETE
          case 46:
            if (doGetCaretPosition($input[0]) === 0) {
              var next = $inputWrapper.next();
              if (next) {
                self.remove(next.data('item'));
              }
            }
            break;

          // LEFT ARROW
          case 37:
            // Try to move the input before the previous tag
            var $prevTag = $inputWrapper.prev();
            if ($input.val().length === 0 && $prevTag[0]) {
              $prevTag.before($inputWrapper);
              $input.focus();
            }
            break;
          // RIGHT ARROW
          case 39:
            // Try to move the input after the next tag
            var $nextTag = $inputWrapper.next();
            if ($input.val().length === 0 && $nextTag[0]) {
              $nextTag.after($inputWrapper);
              $input.focus();
            }
            break;
         default:
             // ignore
         }

        // Reset internal input's size
        var textLength = $input.val().length,
            wordSpace = Math.ceil(textLength / 5),
            size = textLength + wordSpace + 1;
        $input.attr('size', Math.max(this.inputSize, $input.val().length));
      }, self));

      self.$container.on('keypress', 'input', $.proxy(function(event) {
         var $input = $(event.target);

         if (self.$element.attr('disabled')) {
            self.$input.attr('disabled', 'disabled');
            return;
         }

         var text = $input.val(),
         maxLengthReached = self.options.maxChars && text.length >= self.options.maxChars;
         if (self.options.freeInput && (keyCombinationInList(event, self.options.confirmKeys) || maxLengthReached)) {
            self.add(maxLengthReached ? text.substr(0, self.options.maxChars) : text);
            $input.val('');
            event.preventDefault();
         }

         // Reset internal input's size
         var textLength = $input.val().length,
            wordSpace = Math.ceil(textLength / 5),
            size = textLength + wordSpace + 1;
         $input.attr('size', Math.max(this.inputSize, $input.val().length));
      }, self));

      // Remove icon clicked
      self.$container.on('click', '[data-role=remove]', $.proxy(function(event) {
        if (self.$element.attr('disabled')) {
          return;
        }
        self.remove($(event.target).closest('.tag').data('item'));
      }, self));

      // Only add existing value as tags when using strings as tags
      if (self.options.itemValue === defaultOptions.itemValue) {
        if (self.$element[0].tagName === 'INPUT') {
            self.add(self.$element.val());
        } else {
          $('option', self.$element).each(function() {
            self.add($(this).attr('value'), true);
          });
        }
      }
    },

    /**
     * Removes all tagsinput behaviour and unregsiter all event handlers
     */
    destroy: function() {
      var self = this;

      // Unbind events
      self.$container.off('keypress', 'input');
      self.$container.off('click', '[role=remove]');

      self.$container.remove();
      self.$element.removeData('tagsinput');
      self.$element.show();
    },

    /**
     * Sets focus on the tagsinput
     */
    focus: function() {
      this.$input.focus();
    },

    /**
     * Returns the internal input element
     */
    input: function() {
      return this.$input;
    },

    /**
     * Returns the element which is wrapped around the internal input. This
     * is normally the $container, but typeahead.js moves the $input element.
     */
    findInputWrapper: function() {
      var elt = this.$input[0],
          container = this.$container[0];
      while(elt && elt.parentNode !== container)
        elt = elt.parentNode;

      return $(elt);
    }
  };

  /**
   * Register JQuery plugin
   */
  $.fn.tagsinput = function(arg1, arg2) {
    var results = [];

    this.each(function() {
      var tagsinput = $(this).data('tagsinput');
      // Initialize a new tags input
      if (!tagsinput) {
          tagsinput = new TagsInput(this, arg1);
          $(this).data('tagsinput', tagsinput);
          results.push(tagsinput);

          if (this.tagName === 'SELECT') {
              $('option', $(this)).attr('selected', 'selected');
          }

          // Init tags from $(this).val()
          $(this).val($(this).val());
      } else if (!arg1 && !arg2) {
          // tagsinput already exists
          // no function, trying to init
          results.push(tagsinput);
      } else if(tagsinput[arg1] !== undefined) {
          // Invoke function on existing tags input
          var retVal = tagsinput[arg1](arg2);
          if (retVal !== undefined)
              results.push(retVal);
      }
    });

    if ( typeof arg1 == 'string') {
      // Return the results from the invoked function calls
      return results.length > 1 ? results : results[0];
    } else {
      return results;
    }
  };

  $.fn.tagsinput.Constructor = TagsInput;

  /**
   * Most options support both a string or number as well as a function as
   * option value. This function makes sure that the option with the given
   * key in the given options is wrapped in a function
   */
  function makeOptionItemFunction(options, key) {
    if (typeof options[key] !== 'function') {
      var propertyName = options[key];
      options[key] = function(item) { return item[propertyName]; };
    }
  }
  function makeOptionFunction(options, key) {
    if (typeof options[key] !== 'function') {
      var value = options[key];
      options[key] = function() { return value; };
    }
  }
  /**
   * HtmlEncodes the given value
   */
  var htmlEncodeContainer = $('<div />');
  function htmlEncode(value) {
    if (value) {
      return htmlEncodeContainer.text(value).html();
    } else {
      return '';
    }
  }

  /**
   * Returns the position of the caret in the given input field
   * http://flightschool.acylt.com/devnotes/caret-position-woes/
   */
  function doGetCaretPosition(oField) {
    var iCaretPos = 0;
    if (document.selection) {
      oField.focus ();
      var oSel = document.selection.createRange();
      oSel.moveStart ('character', -oField.value.length);
      iCaretPos = oSel.text.length;
    } else if (oField.selectionStart || oField.selectionStart == '0') {
      iCaretPos = oField.selectionStart;
    }
    return (iCaretPos);
  }

  /**
    * Returns boolean indicates whether user has pressed an expected key combination. 
    * @param object keyPressEvent: JavaScript event object, refer
    *     http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    * @param object lookupList: expected key combinations, as in:
    *     [13, {which: 188, shiftKey: true}]
    */
  function keyCombinationInList(keyPressEvent, lookupList) {
      var found = false;
      $.each(lookupList, function (index, keyCombination) {
          if (typeof (keyCombination) === 'number' && keyPressEvent.which === keyCombination) {
              found = true;
              return false;
          }

          if (keyPressEvent.which === keyCombination.which) {
              var alt = !keyCombination.hasOwnProperty('altKey') || keyPressEvent.altKey === keyCombination.altKey,
                  shift = !keyCombination.hasOwnProperty('shiftKey') || keyPressEvent.shiftKey === keyCombination.shiftKey,
                  ctrl = !keyCombination.hasOwnProperty('ctrlKey') || keyPressEvent.ctrlKey === keyCombination.ctrlKey;
              if (alt && shift && ctrl) {
                  found = true;
                  return false;
              }
          }
      });

      return found;
  }

  /**
   * Initialize tagsinput behaviour on inputs and selects which have
   * data-role=tagsinput
   */
  $(function() {
    $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
  });
})(window.jQuery);


var isOnline = true;
window.addEventListener("online", onFunction);
window.addEventListener("offline", offFunction);

function onFunction() {
    if (offline) {
        var pos = Twine.context($('body').get(0)).draftOrder;
        pos.confirmOnline();
    }
    //var pos = Twine.context($('body').get(0)).draftOrder;
    //offline = false;
    //Bindings.refreshImmediately();
}

function offFunction() {
    //alert("Your browser is working offline.");
    if (!offline) {
        var pos = Twine.context($('body').get(0)).draftOrder;
        var isAllowBrowser = isCompatibleBrowser();
        pos.ConfirmOffline(isAllowBrowser);
       
    }
}

function isCompatibleBrowser() {
    var coccocVendor = "Coc Coc";
    var chromeVendor = "Google Inc.";
    var chromeUserAgentRegex = new RegExp("coc_coc_browser");
    function isCocCoc() {
        return (navigator.vendor === coccocVendor && chromeUserAgentRegex.test(navigator.userAgent));
    }
    function isChrome() {
        return (navigator.vendor === chromeVendor && navigator.userAgent.indexOf("Edge") < 0 && navigator.userAgent.indexOf("Firefox") < 0);
    }
    return (isCocCoc() || isChrome());
}



/*! Select2 4.0.1 | https://github.com/select2/select2/blob/master/LICENSE.md */!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.slice(0,n.length-1).concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=v.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),n.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var c=r[a];delete r[a],t[a]=!0,m.apply(b,c)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,c,d,f){var h,k,l,m,n,s,u=[],v=typeof d;if(f=f||a,"undefined"===v||"function"===v){for(c=!c.length&&d.length?["require","exports","module"]:c,n=0;n<c.length;n+=1)if(m=o(c[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=d?d.apply(q[a],u):void 0,a&&(h&&h.exports!==b&&h.exports!==q[a]?q[a]=h.exports:l===b&&s||(q[a]=l))}else a&&(q[a]=d)},a=c=n=function(a,c,d,e,f){if("string"==typeof a)return p[a]?p[a](c):j(o(a,c).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?m(b,a,c,d):setTimeout(function(){m(b,a,c,d)},4),n},n.config=function(a){return n(a)},a._defined=q,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};return d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice;this.listeners=this.listeners||{},a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return e!==f||"hidden"!==f&&"visible"!==f?"scroll"===e||"scroll"===f?!0:d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth:!1},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" select2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".select2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".select2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data"),e=""+c.id;null!=c.element&&c.element.selected||null==c.element&&a.inArray(e,d)>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")});var f=e.filter("[aria-selected=true]");f.length>0?f.first().trigger("mouseenter"):e.first().trigger("mouseenter")})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="select2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.title&&(c.title=b.title),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="select2-results__group";a(h);this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b,c){var d=this,e=b.id+"-results";this.$results.attr("id",e),b.on("results:all",function(a){d.clear(),d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("results:append",function(a){d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("query",function(a){d.hideMessages(),d.showLoading(a)}),b.on("select",function(){b.isOpen()&&d.setClasses()}),b.on("unselect",function(){b.isOpen()&&d.setClasses()}),b.on("open",function(){d.$results.attr("aria-expanded","true"),d.$results.attr("aria-hidden","false"),d.setClasses(),d.ensureHighlightVisible()}),b.on("close",function(){d.$results.attr("aria-expanded","false"),d.$results.attr("aria-hidden","true"),d.$results.removeAttr("aria-activedescendant")}),b.on("results:toggle",function(){var a=d.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),b.on("results:select",function(){var a=d.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?d.trigger("close",{}):d.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a);if(0!==c){var e=c-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top,h=f.offset().top,i=d.$results.scrollTop()+(h-g);0===e?d.$results.scrollTop(0):0>h-g&&d.$results.scrollTop(i)}}),b.on("results:next",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a),e=c+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top+d.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=d.$results.scrollTop()+h-g;0===e?d.$results.scrollTop(0):h>g&&d.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),b.on("results:message",function(a){d.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=d.$results.scrollTop(),c=d.$results.get(0).scrollHeight-d.$results.scrollTop()+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=d.$results.height();e?(d.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(d.$results.scrollTop(d.$results.get(0).scrollHeight-d.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(b){var c=a(this),e=c.data("data");return"true"===c.attr("aria-selected")?void(d.options.get("multiple")?d.trigger("unselect",{originalEvent:b,data:e}):d.trigger("close",{})):void d.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(b){var c=a(this).data("data");d.getHighlightedResults().removeClass("select2-results__option--highlighted"),d.trigger("results:focus",{data:c,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".select2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return a}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),b.attr("title",this.$element.attr("title")),b.attr("tabindex",this._tabindex),this.$selection=b,b},d.prototype.bind=function(a,b){var d=this,e=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),d.$selection.focus(),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.select2."+b.id,function(b){var c=a(b.target),d=c.closest(".select2"),e=a(".select2.select2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.select2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",d),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("selection:update",function(a){c.update(a.data)})},e.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},e.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".select2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.prop("title",b.title||b.text)},e}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,c){var e=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){e.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(b){if(!e.options.get("disabled")){var c=a(this),d=c.parent(),f=d.data("data");e.trigger("unselect",{originalEvent:b,data:f})}})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},d.prototype.selectionContainer=function(){var b=a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.prop("title",e.title||e.text),f.data("data",e),b.push(f)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e)},b}),b.define("select2/selection/allowClear",["jquery","../keys"],function(a,b){function c(){}return c.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},c.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var c=this.$selection.find(".select2-selection__clear");if(0!==c.length){b.stopPropagation();for(var d=c.data("data"),e=0;e<d.length;e++){var f={data:d[e]};if(this.trigger("unselect",f),f.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},c.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||(c.which==b.DELETE||c.which==b.BACKSPACE)&&this._handleClear(c)},c.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".select2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="select2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".select2-selection__rendered").prepend(d)}},c}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.trigger("focus")}),b.on("close",function(){e.$search.val(""),e.$search.removeAttr("aria-activedescendant"),e.$search.trigger("focus")}),b.on("enable",function(){e.$search.prop("disabled",!1),e._transferTabIndex()}),b.on("disable",function(){e.$search.prop("disabled",!0)}),b.on("focus",function(a){e.$search.trigger("focus")}),b.on("results:focus",function(a){e.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".select2-search--inline",function(a){e.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){e._handleBlur(a)}),this.$selection.on("keydown",".select2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f),a.preventDefault()}}});var f=document.documentMode,g=f&&11>=f;this.$selection.on("input.searchcheck",".select2-search--inline",function(a){return g?void e.$selection.off("input.search input.searchcheck"):void e.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(a){if(g&&"input"===a.type)return void e.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&e.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c&&this.$search.focus()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){var a={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};return a}),b.define("select2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){
var b=this;if(this.$element.prop("multiple"))return a.selected=!1,c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),void 0!==b.textContent?b.textContent=a.text:b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0),a.title&&(b.title=a.title);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[],title:a.prop("title")};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},l,j),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&""!==a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");if(void 0!==f&&(this.createTag=f),b.call(this,c,d),a.isArray(e))for(var g=0;g<e.length;g++){var h=e[g],i=this._normalizeItem(h),j=this.option(i);this.$element.append(j)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-select2-tag",!0),e.addOptions([m]),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){var c=(this._lastTag,this.$element.find("option[data-select2-tag]"));c.each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(a,b,c){function d(a){e.trigger("select",{data:a})}var e=this;b.term=b.term||"";var f=this.tokenizer(b,this.options,d);f.term!==b.term&&(this.$search.length&&(this.$search.val(f.term),this.$search.focus()),b.term=f.term),a.call(this,b,c)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=e.showSearch(a);b?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.select2."+d.id,g="resize.select2."+d.id,h="orientationchange.select2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){a(this).data("select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(b){var c=a(this).data("select2-scroll-position");a(this).scrollTop(c.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.select2."+d.id,f="resize.select2."+d.id,g="orientationchange.select2."+d.id,h=this.$container.parents().filter(b.hasScroll);h.off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=(this.$container.position(),this.$container.offset());f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom};if("static"!==this.$dropdownParent[0].style.position){var m=this.$dropdownParent.offset();l.top-=m.top,l.left-=m.left}c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(){d._handleSelectOnClose()})},a.prototype._handleSelectOnClose=function(){var a=this.getHighlightedResults();if(!(a.length<1)){var b=a.data("data");null!=b.element&&b.element.selected||null==b.element&&b.selected||this.trigger("select",{data:b})}},a}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close",{})},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c="Please enter "+b+" or more characters";return c},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"Không có kết quả phù hợp"},searching:function(){return"Searching…"}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}D.prototype.apply=function(l){if(l=a.extend({},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(O){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(P){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var Q=k.loadPath(this.defaults.amdLanguageBase+"en"),R=new k(l.language);R.extend(Q),l.translations=R}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var E=new D;return E}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),a.data("select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),a.data("data",a.data("select2Tags")),a.data("tags",!0)),a.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",a.data("ajaxUrl")),a.data("ajax--url",a.data("ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,a.data()):a.data();var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("select2")&&a.data("select2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=a.attr("tabindex")||0;a.data("old-tabindex",d),a.attr("tabindex","-1");var f=this.options.get("dataAdapter");this.dataAdapter=new f(a,this.options);var g=this.render();this._placeContainer(g);var h=this.options.get("selectionAdapter");this.selection=new h(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,g);var i=this.options.get("dropdownAdapter");this.dropdown=new i(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,g);var j=this.options.get("resultsAdapter");this.results=new j(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var k=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){k.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;i>h;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this._sync=c.bind(this._syncAttributes,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._sync);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._sync)}),this._observer.observe(this.$element[0],{attributes:!0,subtree:!1})):this.$element[0].addEventListener&&this.$element[0].addEventListener("DOMAttrModified",b._sync,!1)},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),(null==a||0===a.length)&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._sync),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&this.$element[0].removeEventListener("DOMAttrModified",this._sync,!1),this._sync=null,this.$element.off(".select2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),b.define("jquery-mousewheel",["jquery"],function(a){return a}),b.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults"],function(a,b,c,d){if(null==a.fn.select2){var e=["open","close","destroy"];a.fn.select2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d;return this.each(function(){var c=a(this).data("select2");null==c&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2.");var e=Array.prototype.slice.call(arguments,1);d=c[b].apply(c,e)}),a.inArray(b,e)>-1?this:d}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});

var CookieManager = {
    setCookie: function(name, value, days) {
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
    },

    getCookie: function(cname) {
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
}

/**
 * Bootstrap Multiselect (https://github.com/davidstutz/bootstrap-multiselect)
 *
 * Apache License, Version 2.0:
 * Copyright (c) 2012 - 2015 David Stutz
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a
 * copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * BSD 3-Clause License:
 * Copyright (c) 2012 - 2015 David Stutz
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    - Redistributions of source code must retain the above copyright notice,
 *      this list of conditions and the following disclaimer.
 *    - Redistributions in binary form must reproduce the above copyright notice,
 *      this list of conditions and the following disclaimer in the documentation
 *      and/or other materials provided with the distribution.
 *    - Neither the name of David Stutz nor the names of its contributors may be
 *      used to endorse or promote products derived from this software without
 *      specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
!function ($) {
    "use strict";// jshint ;_;

    if (typeof ko !== 'undefined' && ko.bindingHandlers && !ko.bindingHandlers.multiselect) {
        ko.bindingHandlers.multiselect = {
            after: ['options', 'value', 'selectedOptions', 'enable', 'disable'],

            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                var $element = $(element);
                var config = ko.toJS(valueAccessor());

                $element.multiselect(config);

                if (allBindings.has('options')) {
                    var options = allBindings.get('options');
                    if (ko.isObservable(options)) {
                        ko.computed({
                            read: function() {
                                options();
                                setTimeout(function() {
                                    var ms = $element.data('multiselect');
                                    if (ms)
                                        ms.updateOriginalOptions();//Not sure how beneficial this is.
                                    $element.multiselect('rebuild');
                                }, 1);
                            },
                            disposeWhenNodeIsRemoved: element
                        });
                    }
                }

                //value and selectedOptions are two-way, so these will be triggered even by our own actions.
                //It needs some way to tell if they are triggered because of us or because of outside change.
                //It doesn't loop but it's a waste of processing.
                if (allBindings.has('value')) {
                    var value = allBindings.get('value');
                    if (ko.isObservable(value)) {
                        ko.computed({
                            read: function() {
                                value();
                                setTimeout(function() {
                                    $element.multiselect('refresh');
                                }, 1);
                            },
                            disposeWhenNodeIsRemoved: element
                        }).extend({ rateLimit: 100, notifyWhenChangesStop: true });
                    }
                }

                //Switched from arrayChange subscription to general subscription using 'refresh'.
                //Not sure performance is any better using 'select' and 'deselect'.
                if (allBindings.has('selectedOptions')) {
                    var selectedOptions = allBindings.get('selectedOptions');
                    if (ko.isObservable(selectedOptions)) {
                        ko.computed({
                            read: function() {
                                selectedOptions();
                                setTimeout(function() {
                                    $element.multiselect('refresh');
                                }, 1);
                            },
                            disposeWhenNodeIsRemoved: element
                        }).extend({ rateLimit: 100, notifyWhenChangesStop: true });
                    }
                }

                var setEnabled = function (enable) {
                    setTimeout(function () {
                        if (enable)
                            $element.multiselect('enable');
                        else
                            $element.multiselect('disable');
                    });
                };

                if (allBindings.has('enable')) {
                    var enable = allBindings.get('enable');
                    if (ko.isObservable(enable)) {
                        ko.computed({
                            read: function () {
                                setEnabled(enable());
                            },
                            disposeWhenNodeIsRemoved: element
                        }).extend({ rateLimit: 100, notifyWhenChangesStop: true });
                    } else {
                        setEnabled(enable);
                    }
                }

                if (allBindings.has('disable')) {
                    var disable = allBindings.get('disable');
                    if (ko.isObservable(disable)) {
                        ko.computed({
                            read: function () {
                                setEnabled(!disable());
                            },
                            disposeWhenNodeIsRemoved: element
                        }).extend({ rateLimit: 100, notifyWhenChangesStop: true });
                    } else {
                        setEnabled(!disable);
                    }
                }

                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    $element.multiselect('destroy');
                });
            },

            update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                var $element = $(element);
                var config = ko.toJS(valueAccessor());

                $element.multiselect('setOptions', config);
                $element.multiselect('rebuild');
            }
        };
    }

    function forEach(array, callback) {
        for (var index = 0; index < array.length; ++index) {
            callback(array[index], index);
        }
    }

    /**
     * Constructor to create a new multiselect using the given select.
     *
     * @param {jQuery} select
     * @param {Object} options
     * @returns {Multiselect}
     */
    function Multiselect(select, options) {

        this.$select = $(select);

        // Placeholder via data attributes
        if (this.$select.attr("data-placeholder")) {
            options.nonSelectedText = this.$select.data("placeholder");
        }

        this.options = this.mergeOptions($.extend({}, options, this.$select.data()));

        // Initialization.
        // We have to clone to create a new reference.
        this.originalOptions = this.$select.clone()[0].options;
        this.query = '';
        this.searchTimeout = null;
        this.lastToggledInput = null;

        this.options.multiple = this.$select.attr('multiple') === "multiple";
        this.options.onChange = $.proxy(this.options.onChange, this);
        this.options.onSelectAll = $.proxy(this.options.onSelectAll, this);
        this.options.onDeselectAll = $.proxy(this.options.onDeselectAll, this);
        this.options.onDropdownShow = $.proxy(this.options.onDropdownShow, this);
        this.options.onDropdownHide = $.proxy(this.options.onDropdownHide, this);
        this.options.onDropdownShown = $.proxy(this.options.onDropdownShown, this);
        this.options.onDropdownHidden = $.proxy(this.options.onDropdownHidden, this);
        this.options.onInitialized = $.proxy(this.options.onInitialized, this);
        this.options.onFiltering = $.proxy(this.options.onFiltering, this);

        // Build select all if enabled.
        this.buildContainer();
        this.buildButton();
        this.buildDropdown();
        this.buildSelectAll();
        this.buildDropdownOptions();
        this.buildFilter();

        this.updateButtonText();
        this.updateSelectAll(true);

        if (this.options.enableClickableOptGroups && this.options.multiple) {
            this.updateOptGroups();
        }

        if (this.options.disableIfEmpty && $('option', this.$select).length <= 0) {
            this.disable();
        }

        this.$select.wrap('<span class="hide-native-select">').after(this.$container);
        this.options.onInitialized(this.$select, this.$container);
    }

    Multiselect.prototype = {

        defaults: {
            /**
             * Default text function will either print 'None selected' in case no
             * option is selected or a list of the selected options up to a length
             * of 3 selected options.
             *
             * @param {jQuery} options
             * @param {jQuery} select
             * @returns {String}
             */
            buttonText: function(options, select) {
                if (this.disabledText.length > 0
                        && (select.prop('disabled') || (options.length == 0 && this.disableIfEmpty)))  {

                    return this.disabledText;
                }
                else if (options.length === 0) {
                    return this.nonSelectedText;
                }
                else if (this.allSelectedText
                        && options.length === $('option', $(select)).length
                        && $('option', $(select)).length !== 1
                        && this.multiple) {

                    if (this.selectAllNumber) {
                        return this.allSelectedText + ' (' + options.length + ')';
                    }
                    else {
                        return this.allSelectedText;
                    }
                }
                else if (options.length > this.numberDisplayed) {
                    return options.length + ' ' + this.nSelectedText;
                }
                else {
                    var selected = '';
                    var delimiter = this.delimiterText;

                    options.each(function() {
                        var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).text();
                        selected += label + delimiter;
                    });

                    return selected.substr(0, selected.length - this.delimiterText.length);
                }
            },
            /**
             * Updates the title of the button similar to the buttonText function.
             *
             * @param {jQuery} options
             * @param {jQuery} select
             * @returns {@exp;selected@call;substr}
             */
            buttonTitle: function(options, select) {
                if (options.length === 0) {
                    return this.nonSelectedText;
                }
                else {
                    var selected = '';
                    var delimiter = this.delimiterText;

                    options.each(function () {
                        var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).text();
                        selected += label + delimiter;
                    });
                    return selected.substr(0, selected.length - this.delimiterText.length);
                }
            },
            checkboxName: function(option) {
                return false; // no checkbox name
            },
            /**
             * Create a label.
             *
             * @param {jQuery} element
             * @returns {String}
             */
            optionLabel: function(element){
                return $(element).attr('label') || $(element).text();
            },
            /**
             * Create a class.
             *
             * @param {jQuery} element
             * @returns {String}
             */
            optionClass: function(element) {
                return $(element).attr('class') || '';
            },
            /**
             * Triggered on change of the multiselect.
             *
             * Not triggered when selecting/deselecting options manually.
             *
             * @param {jQuery} option
             * @param {Boolean} checked
             */
            onChange : function(option, checked) {

            },
            /**
             * Triggered when the dropdown is shown.
             *
             * @param {jQuery} event
             */
            onDropdownShow: function(event) {

            },
            /**
             * Triggered when the dropdown is hidden.
             *
             * @param {jQuery} event
             */
            onDropdownHide: function(event) {

            },
            /**
             * Triggered after the dropdown is shown.
             *
             * @param {jQuery} event
             */
            onDropdownShown: function(event) {

            },
            /**
             * Triggered after the dropdown is hidden.
             *
             * @param {jQuery} event
             */
            onDropdownHidden: function(event) {

            },
            /**
             * Triggered on select all.
             */
            onSelectAll: function() {

            },
            /**
             * Triggered on deselect all.
             */
            onDeselectAll: function() {

            },
            /**
             * Triggered after initializing.
             *
             * @param {jQuery} $select
             * @param {jQuery} $container
             */
            onInitialized: function($select, $container) {

            },
            /**
             * Triggered on filtering.
             *
             * @param {jQuery} $filter
             */
            onFiltering: function($filter) {

            },
            enableHTML: false,
            buttonClass: 'btn btn-default pull-right',
            inheritClass: false,
            buttonWidth: 'auto',
            buttonContainer: '<div class="btn-group" />',
            dropRight: false,
            dropUp: false,
            selectedClass: 'active',
            // Maximum height of the dropdown menu.
            // If maximum height is exceeded a scrollbar will be displayed.
            maxHeight: false,
            includeSelectAllOption: false,
            includeSelectAllIfMoreThan: 0,
            selectAllText: ' Select all',
            selectAllValue: 'multiselect-all',
            selectAllName: false,
            selectAllNumber: true,
            selectAllJustVisible: true,
            enableFiltering: false,
            enableCaseInsensitiveFiltering: false,
            enableFullValueFiltering: false,
            enableClickableOptGroups: false,
            enableCollapsibleOptGroups: false,
            filterPlaceholder: 'Search',
            // possible options: 'text', 'value', 'both'
            filterBehavior: 'text',
            includeFilterClearBtn: true,
            preventInputChangeEvent: false,
            nonSelectedText: 'Chưa chọn kho', //None selected
            nSelectedText: 'Kho được chọn', //selected
            allSelectedText: 'Tất cả kho', //All selected
            numberDisplayed: 2,
            disableIfEmpty: false,
            disabledText: '',
            delimiterText: ', ',
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="icon-dropdown-select"><path d="M10 16l-4-4h8l-4 4zm0-12L6 8h8l-4-4z"></path></svg></button>',
                ul: '<ul class="multiselect-container dropdown-menu" style="width:100%"></ul>',
                filter: '<li class="multiselect-item multiselect-filter"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default pull-right multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',
                divider: '<li class="multiselect-item divider"></li>',
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
            }
        },

        constructor: Multiselect,

        /**
         * Builds the container of the multiselect.
         */
        buildContainer: function() {
            this.$container = $(this.options.buttonContainer);
            this.$container.on('show.bs.dropdown', this.options.onDropdownShow);
            this.$container.on('hide.bs.dropdown', this.options.onDropdownHide);
            this.$container.on('shown.bs.dropdown', this.options.onDropdownShown);
            this.$container.on('hidden.bs.dropdown', this.options.onDropdownHidden);
        },

        /**
         * Builds the button of the multiselect.
         */
        buildButton: function() {
            this.$button = $(this.options.templates.button).addClass(this.options.buttonClass);
            if (this.$select.attr('class') && this.options.inheritClass) {
                this.$button.addClass(this.$select.attr('class'));
            }
            // Adopt active state.
            if (this.$select.prop('disabled')) {
                this.disable();
            }
            else {
                this.enable();
            }

            // Manually add button width if set.
            if (this.options.buttonWidth && this.options.buttonWidth !== 'auto') {
                this.$button.css({
                    'width' : '100%', //this.options.buttonWidth,
                    'overflow' : 'hidden',
                    'text-overflow' : 'ellipsis'
                });
                this.$container.css({
                    'width': this.options.buttonWidth
                });
            }

            // Keep the tab index from the select.
            var tabindex = this.$select.attr('tabindex');
            if (tabindex) {
                this.$button.attr('tabindex', tabindex);
            }

            this.$container.prepend(this.$button);
        },

        /**
         * Builds the ul representing the dropdown menu.
         */
        buildDropdown: function() {

            // Build ul.
            this.$ul = $(this.options.templates.ul);

            if (this.options.dropRight) {
                this.$ul.addClass('pull-right');
            }

            // Set max height of dropdown menu to activate auto scrollbar.
            if (this.options.maxHeight) {
                // TODO: Add a class for this option to move the css declarations.
                this.$ul.css({
                    'max-height': this.options.maxHeight + 'px',
                    'overflow-y': 'auto',
                    'overflow-x': 'hidden'
                });
            }

            if (this.options.dropUp) {

                var height = Math.min(this.options.maxHeight, $('option[data-role!="divider"]', this.$select).length*26 + $('option[data-role="divider"]', this.$select).length*19 + (this.options.includeSelectAllOption ? 26 : 0) + (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering ? 44 : 0));
                var moveCalc = height + 34;

                this.$ul.css({
                    'max-height': height + 'px',
                    'overflow-y': 'auto',
                    'overflow-x': 'hidden',
                    'margin-top': "-" + moveCalc + 'px'
                });
            }

            this.$container.append(this.$ul);
        },

        /**
         * Build the dropdown options and binds all necessary events.
         *
         * Uses createDivider and createOptionValue to create the necessary options.
         */
        buildDropdownOptions: function() {

            this.$select.children().each($.proxy(function(index, element) {

                var $element = $(element);
                // Support optgroups and options without a group simultaneously.
                var tag = $element.prop('tagName')
                    .toLowerCase();

                if ($element.prop('value') === this.options.selectAllValue) {
                    return;
                }

                if (tag === 'optgroup') {
                    this.createOptgroup(element);
                }
                else if (tag === 'option') {

                    if ($element.data('role') === 'divider') {
                        this.createDivider();
                    }
                    else {
                        this.createOptionValue(element);
                    }

                }

                // Other illegal tags will be ignored.
            }, this));

            // Bind the change event on the dropdown elements.
            $('li:not(.multiselect-group) input', this.$ul).on('change', $.proxy(function(event) {
                var $target = $(event.target);

                var checked = $target.prop('checked') || false;
                var isSelectAllOption = $target.val() === this.options.selectAllValue;

                // Apply or unapply the configured selected class.
                if (this.options.selectedClass) {
                    if (checked) {
                        $target.closest('li')
                            .addClass(this.options.selectedClass);
                    }
                    else {
                        $target.closest('li')
                            .removeClass(this.options.selectedClass);
                    }
                }

                // Get the corresponding option.
                var value = $target.val();
                var $option = this.getOptionByValue(value);

                var $optionsNotThis = $('option', this.$select).not($option);
                var $checkboxesNotThis = $('input', this.$container).not($target);

                if (isSelectAllOption) {

                    if (checked) {
                        this.selectAll(this.options.selectAllJustVisible,true);
                    }
                    else {
                        this.deselectAll(this.options.selectAllJustVisible,true);
                    }
                }
                else {
                    if (checked) {
                        $option.prop('selected', true);

                        if (this.options.multiple) {
                            // Simply select additional option.
                            $option.prop('selected', true);
                        }
                        else {
                            // Unselect all other options and corresponding checkboxes.
                            if (this.options.selectedClass) {
                                $($checkboxesNotThis).closest('li').removeClass(this.options.selectedClass);
                            }

                            $($checkboxesNotThis).prop('checked', false);
                            $optionsNotThis.prop('selected', false);

                            // It's a single selection, so close.
                            this.$button.click();
                        }

                        if (this.options.selectedClass === "active") {
                            $optionsNotThis.closest("a").css("outline", "");
                        }
                    }
                    else {
                        // Unselect option.
                        $option.prop('selected', false);
                    }

                    // To prevent select all from firing onChange: #575
                    this.options.onChange($option, checked);

                    // Do not update select all or optgroups on select all change!
                    this.updateSelectAll();

                    if (this.options.enableClickableOptGroups && this.options.multiple) {
                        this.updateOptGroups();
                    }
                }

                this.$select.change();
                this.updateButtonText();

                if(this.options.preventInputChangeEvent) {
                    return false;
                }
            }, this));

            $('li a', this.$ul).on('mousedown', function(e) {
                if (e.shiftKey) {
                    // Prevent selecting text by Shift+click
                    return false;
                }
            });

            $('li a', this.$ul).on('touchstart click', $.proxy(function(event) {
                event.stopPropagation();

                var $target = $(event.target);

                if (event.shiftKey && this.options.multiple) {
                    if($target.is("label")){ // Handles checkbox selection manually (see https://github.com/davidstutz/bootstrap-multiselect/issues/431)
                        event.preventDefault();
                        $target = $target.find("input");
                        $target.prop("checked", !$target.prop("checked"));
                    }
                    var checked = $target.prop('checked') || false;

                    if (this.lastToggledInput !== null && this.lastToggledInput !== $target) { // Make sure we actually have a range
                        var from = $target.closest("li").index();
                        var to = this.lastToggledInput.closest("li").index();

                        if (from > to) { // Swap the indices
                            var tmp = to;
                            to = from;
                            from = tmp;
                        }

                        // Make sure we grab all elements since slice excludes the last index
                        ++to;

                        // Change the checkboxes and underlying options
                        var range = this.$ul.find("li").slice(from, to).find("input");

                        range.prop('checked', checked);

                        if (this.options.selectedClass) {
                            range.closest('li')
                                .toggleClass(this.options.selectedClass, checked);
                        }

                        for (var i = 0, j = range.length; i < j; i++) {
                            var $checkbox = $(range[i]);

                            var $option = this.getOptionByValue($checkbox.val());

                            $option.prop('selected', checked);
                        }
                    }

                    // Trigger the select "change" event
                    $target.trigger("change");
                }

                // Remembers last clicked option
                if($target.is("input") && !$target.closest("li").is(".multiselect-item")){
                    this.lastToggledInput = $target;
                }

                $target.blur();
            }, this));

            // Keyboard support.
            this.$container.off('keydown.multiselect').on('keydown.multiselect', $.proxy(function(event) {
                if ($('input[type="text"]', this.$container).is(':focus')) {
                    return;
                }

                if (event.keyCode === 9 && this.$container.hasClass('open')) {
                    this.$button.click();
                }
                else {
                    var $items = $(this.$container).find("li:not(.divider):not(.disabled) a").filter(":visible");

                    if (!$items.length) {
                        return;
                    }

                    var index = $items.index($items.filter(':focus'));

                    // Navigation up.
                    if (event.keyCode === 38 && index > 0) {
                        index--;
                    }
                    // Navigate down.
                    else if (event.keyCode === 40 && index < $items.length - 1) {
                        index++;
                    }
                    else if (!~index) {
                        index = 0;
                    }

                    var $current = $items.eq(index);
                    $current.focus();

                    if (event.keyCode === 32 || event.keyCode === 13) {
                        var $checkbox = $current.find('input');

                        $checkbox.prop("checked", !$checkbox.prop("checked"));
                        $checkbox.change();
                    }

                    event.stopPropagation();
                    event.preventDefault();
                }
            }, this));

            if (this.options.enableClickableOptGroups && this.options.multiple) {
                $("li.multiselect-group input", this.$ul).on("change", $.proxy(function(event) {
                    event.stopPropagation();

                    var $target = $(event.target);
                    var checked = $target.prop('checked') || false;

                    var $li = $(event.target).closest('li');
                    var $group = $li.nextUntil("li.multiselect-group")
                        .not('.multiselect-filter-hidden')
                        .not('.disabled');

                    var $inputs = $group.find("input");

                    var values = [];
                    var $options = [];

                    $.each($inputs, $.proxy(function(index, input) {
                        var value = $(input).val();
                        var $option = this.getOptionByValue(value);

                        if (checked) {
                            $(input).prop('checked', true);
                            $(input).closest('li')
                                .addClass(this.options.selectedClass);

                            $option.prop('selected', true);
                        }
                        else {
                            $(input).prop('checked', false);
                            $(input).closest('li')
                                .removeClass(this.options.selectedClass);

                            $option.prop('selected', false);
                        }

                        $options.push(this.getOptionByValue(value));
                    }, this))

                    // Cannot use select or deselect here because it would call updateOptGroups again.

                    this.options.onChange($options, checked);

                    this.updateButtonText();
                    this.updateSelectAll();
                }, this));
            }

            if (this.options.enableCollapsibleOptGroups && this.options.multiple) {
                $("li.multiselect-group .caret-container", this.$ul).on("click", $.proxy(function(event) {
                    var $li = $(event.target).closest('li');
                    var $inputs = $li.nextUntil("li.multiselect-group")
                            .not('.multiselect-filter-hidden');

                    var visible = true;
                    $inputs.each(function() {
                        visible = visible && $(this).is(':visible');
                    });

                    if (visible) {
                        $inputs.hide()
                            .addClass('multiselect-collapsible-hidden');
                    }
                    else {
                        $inputs.show()
                            .removeClass('multiselect-collapsible-hidden');
                    }
                }, this));

                $("li.multiselect-all", this.$ul).css('background', '#f3f3f3').css('border-bottom', '1px solid #eaeaea');
                $("li.multiselect-all > a > label.checkbox", this.$ul).css('padding', '3px 20px 3px 35px');
                $("li.multiselect-group > a > input", this.$ul).css('margin', '4px 0px 5px -20px');
            }
        },

        /**
         * Create an option using the given select option.
         *
         * @param {jQuery} element
         */
        createOptionValue: function(element) {
            var $element = $(element);
            if ($element.is(':selected')) {
                $element.prop('selected', true);
            }

            // Support the label attribute on options.
            var label = this.options.optionLabel(element);
            var classes = this.options.optionClass(element);
            var value = $element.val();
            var inputType = this.options.multiple ? "checkbox" : "radio";

            var $li = $(this.options.templates.li);
            var $label = $('label', $li);
            $label.addClass(inputType);
            $li.addClass(classes);

            if (this.options.enableHTML) {
                $label.html(" " + label);
            }
            else {
                $label.text(" " + label);
            }

            var $checkbox = $('<input/>').attr('type', inputType);

            var name = this.options.checkboxName($element);
            if (name) {
                $checkbox.attr('name', name);
            }

            $label.prepend($checkbox);

            var selected = $element.prop('selected') || false;
            $checkbox.val(value);

            if (value === this.options.selectAllValue) {
                $li.addClass("multiselect-item multiselect-all");
                $checkbox.parent().parent()
                    .addClass('multiselect-all');
            }

            $label.attr('title', $element.attr('title'));

            this.$ul.append($li);

            if ($element.is(':disabled')) {
                $checkbox.attr('disabled', 'disabled')
                    .prop('disabled', true)
                    .closest('a')
                    .attr("tabindex", "-1")
                    .closest('li')
                    .addClass('disabled');
            }

            $checkbox.prop('checked', selected);

            if (selected && this.options.selectedClass) {
                $checkbox.closest('li')
                    .addClass(this.options.selectedClass);
            }
        },

        /**
         * Creates a divider using the given select option.
         *
         * @param {jQuery} element
         */
        createDivider: function(element) {
            var $divider = $(this.options.templates.divider);
            this.$ul.append($divider);
        },

        /**
         * Creates an optgroup.
         *
         * @param {jQuery} group
         */
        createOptgroup: function(group) {
            var label = $(group).attr("label");
            var value = $(group).attr("value");
            var $li = $('<li class="multiselect-item multiselect-group"><a href="javascript:void(0);"><label><b></b></label></a></li>');

            var classes = this.options.optionClass(group);
            $li.addClass(classes);

            if (this.options.enableHTML) {
                $('label b', $li).html(" " + label);
            }
            else {
                $('label b', $li).text(" " + label);
            }

            if (this.options.enableCollapsibleOptGroups && this.options.multiple) {
                $('a', $li).append('<span class="caret-container"><b class="caret"></b></span>');
            }

            if (this.options.enableClickableOptGroups && this.options.multiple) {
                $('a label', $li).prepend('<input type="checkbox" value="' + value + '"/>');
            }

            if ($(group).is(':disabled')) {
                $li.addClass('disabled');
            }

            this.$ul.append($li);

            $("option", group).each($.proxy(function($, group) {
                this.createOptionValue(group);
            }, this))
        },

        /**
         * Build the select all.
         *
         * Checks if a select all has already been created.
         */
        buildSelectAll: function() {
            if (typeof this.options.selectAllValue === 'number') {
                this.options.selectAllValue = this.options.selectAllValue.toString();
            }

            var alreadyHasSelectAll = this.hasSelectAll();

            if (!alreadyHasSelectAll && this.options.includeSelectAllOption && this.options.multiple
                    && $('option', this.$select).length > this.options.includeSelectAllIfMoreThan) {

                // Check whether to add a divider after the select all.
                if (this.options.includeSelectAllDivider) {
                    this.$ul.prepend($(this.options.templates.divider));
                }

                var $li = $(this.options.templates.li);
                $('label', $li).addClass("checkbox");

                if (this.options.enableHTML) {
                    $('label', $li).html(" " + this.options.selectAllText);
                }
                else {
                    $('label', $li).text(" " + this.options.selectAllText);
                }

                if (this.options.selectAllName) {
                    $('label', $li).prepend('<input type="checkbox" name="' + this.options.selectAllName + '" />');
                }
                else {
                    $('label', $li).prepend('<input type="checkbox" />');
                }

                var $checkbox = $('input', $li);
                $checkbox.val(this.options.selectAllValue);

                $li.addClass("multiselect-item multiselect-all");
                $checkbox.parent().parent()
                    .addClass('multiselect-all');

                this.$ul.prepend($li);

                $checkbox.prop('checked', false);
            }
        },

        /**
         * Builds the filter.
         */
        buildFilter: function() {

            // Build filter if filtering OR case insensitive filtering is enabled and the number of options exceeds (or equals) enableFilterLength.
            if (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering) {
                var enableFilterLength = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);

                if (this.$select.find('option').length >= enableFilterLength) {

                    this.$filter = $(this.options.templates.filter);
                    $('input', this.$filter).attr('placeholder', this.options.filterPlaceholder);

                    // Adds optional filter clear button
                    if(this.options.includeFilterClearBtn) {
                        var clearBtn = $(this.options.templates.filterClearBtn);
                        clearBtn.on('click', $.proxy(function(event){
                            clearTimeout(this.searchTimeout);

                            this.$filter.find('.multiselect-search').val('');
                            $('li', this.$ul).show().removeClass('multiselect-filter-hidden');

                            this.updateSelectAll();

                            if (this.options.enableClickableOptGroups && this.options.multiple) {
                                this.updateOptGroups();
                            }

                        }, this));
                        this.$filter.find('.input-group').append(clearBtn);
                    }

                    this.$ul.prepend(this.$filter);

                    this.$filter.val(this.query).on('click', function(event) {
                        event.stopPropagation();
                    }).on('input keydown', $.proxy(function(event) {
                        // Cancel enter key default behaviour
                        if (event.which === 13) {
                          event.preventDefault();
                      }

                        // This is useful to catch "keydown" events after the browser has updated the control.
                        clearTimeout(this.searchTimeout);

                        this.searchTimeout = this.asyncFunction($.proxy(function() {

                            if (this.query !== event.target.value) {
                                this.query = event.target.value;

                                var currentGroup, currentGroupVisible;
                                $.each($('li', this.$ul), $.proxy(function(index, element) {
                                    var value = $('input', element).length > 0 ? $('input', element).val() : "";
                                    var text = $('label', element).text();

                                    var filterCandidate = '';
                                    if ((this.options.filterBehavior === 'text')) {
                                        filterCandidate = text;
                                    }
                                    else if ((this.options.filterBehavior === 'value')) {
                                        filterCandidate = value;
                                    }
                                    else if (this.options.filterBehavior === 'both') {
                                        filterCandidate = text + '\n' + value;
                                    }

                                    if (value !== this.options.selectAllValue && text) {

                                        // By default lets assume that element is not
                                        // interesting for this search.
                                        var showElement = false;

                                        if (this.options.enableCaseInsensitiveFiltering) {
                                            filterCandidate = filterCandidate.toLowerCase();
                                            this.query = this.query.toLowerCase();
                                        }

                                        if (this.options.enableFullValueFiltering && this.options.filterBehavior !== 'both') {
                                            var valueToMatch = filterCandidate.trim().substring(0, this.query.length);
                                            if (this.query.indexOf(valueToMatch) > -1) {
                                                showElement = true;
                                            }
                                        }
                                        else if (filterCandidate.indexOf(this.query) > -1) {
                                            showElement = true;
                                        }

                                        // Toggle current element (group or group item) according to showElement boolean.
                                        $(element).toggle(showElement)
                                            .toggleClass('multiselect-filter-hidden', !showElement);

                                        // Differentiate groups and group items.
                                        if ($(element).hasClass('multiselect-group')) {
                                            // Remember group status.
                                            currentGroup = element;
                                            currentGroupVisible = showElement;
                                        }
                                        else {
                                            // Show group name when at least one of its items is visible.
                                            if (showElement) {
                                                $(currentGroup).show()
                                                    .removeClass('multiselect-filter-hidden');
                                            }

                                            // Show all group items when group name satisfies filter.
                                            if (!showElement && currentGroupVisible) {
                                                $(element).show()
                                                    .removeClass('multiselect-filter-hidden');
                                            }
                                        }
                                    }
                                }, this));
                            }

                            this.updateSelectAll();

                            if (this.options.enableClickableOptGroups && this.options.multiple) {
                                this.updateOptGroups();
                            }

                            this.options.onFiltering(event.target);

                        }, this), 300, this);
                    }, this));
                }
            }
        },

        /**
         * Unbinds the whole plugin.
         */
        destroy: function() {
            this.$container.remove();
            this.$select.show();
            this.$select.data('multiselect', null);
        },

        /**
         * Refreshs the multiselect based on the selected options of the select.
         */
        refresh: function () {
            var inputs = $.map($('li input', this.$ul), $);

            $('option', this.$select).each($.proxy(function (index, element) {
                var $elem = $(element);
                var value = $elem.val();
                var $input;
                for (var i = inputs.length; 0 < i--; /**/) {
                    if (value !== ($input = inputs[i]).val())
                        continue; // wrong li

                    if ($elem.is(':selected')) {
                        $input.prop('checked', true);

                        if (this.options.selectedClass) {
                            $input.closest('li')
                                .addClass(this.options.selectedClass);
                        }
                    }
                    else {
                        $input.prop('checked', false);

                        if (this.options.selectedClass) {
                            $input.closest('li')
                                .removeClass(this.options.selectedClass);
                        }
                    }

                    if ($elem.is(":disabled")) {
                        $input.attr('disabled', 'disabled')
                            .prop('disabled', true)
                            .closest('li')
                            .addClass('disabled');
                    }
                    else {
                        $input.prop('disabled', false)
                            .closest('li')
                            .removeClass('disabled');
                    }
                    break; // assumes unique values
                }
            }, this));

            this.updateButtonText();
            this.updateSelectAll();

            if (this.options.enableClickableOptGroups && this.options.multiple) {
                this.updateOptGroups();
            }
        },

        /**
         * Select all options of the given values.
         *
         * If triggerOnChange is set to true, the on change event is triggered if
         * and only if one value is passed.
         *
         * @param {Array} selectValues
         * @param {Boolean} triggerOnChange
         */
        select: function(selectValues, triggerOnChange) {
            if(!$.isArray(selectValues)) {
                selectValues = [selectValues];
            }

            for (var i = 0; i < selectValues.length; i++) {
                var value = selectValues[i];

                if (value === null || value === undefined) {
                    continue;
                }

                var $option = this.getOptionByValue(value);
                var $checkbox = this.getInputByValue(value);

                if($option === undefined || $checkbox === undefined) {
                    continue;
                }

                if (!this.options.multiple) {
                    this.deselectAll(false);
                }

                if (this.options.selectedClass) {
                    $checkbox.closest('li')
                        .addClass(this.options.selectedClass);
                }

                $checkbox.prop('checked', true);
                $option.prop('selected', true);

                if (triggerOnChange) {
                    this.options.onChange($option, true);
                }
            }

            this.updateButtonText();
            this.updateSelectAll();

            if (this.options.enableClickableOptGroups && this.options.multiple) {
                this.updateOptGroups();
            }
        },

        /**
         * Clears all selected items.
         */
        clearSelection: function () {
            this.deselectAll(false);
            this.updateButtonText();
            this.updateSelectAll();

            if (this.options.enableClickableOptGroups && this.options.multiple) {
                this.updateOptGroups();
            }
        },

        /**
         * Deselects all options of the given values.
         *
         * If triggerOnChange is set to true, the on change event is triggered, if
         * and only if one value is passed.
         *
         * @param {Array} deselectValues
         * @param {Boolean} triggerOnChange
         */
        deselect: function(deselectValues, triggerOnChange) {
            if(!$.isArray(deselectValues)) {
                deselectValues = [deselectValues];
            }

            for (var i = 0; i < deselectValues.length; i++) {
                var value = deselectValues[i];

                if (value === null || value === undefined) {
                    continue;
                }

                var $option = this.getOptionByValue(value);
                var $checkbox = this.getInputByValue(value);

                if($option === undefined || $checkbox === undefined) {
                    continue;
                }

                if (this.options.selectedClass) {
                    $checkbox.closest('li')
                        .removeClass(this.options.selectedClass);
                }

                $checkbox.prop('checked', false);
                $option.prop('selected', false);

                if (triggerOnChange) {
                    this.options.onChange($option, false);
                }
            }

            this.updateButtonText();
            this.updateSelectAll();

            if (this.options.enableClickableOptGroups && this.options.multiple) {
                this.updateOptGroups();
            }
        },

        /**
         * Selects all enabled & visible options.
         *
         * If justVisible is true or not specified, only visible options are selected.
         *
         * @param {Boolean} justVisible
         * @param {Boolean} triggerOnSelectAll
         */
        selectAll: function (justVisible, triggerOnSelectAll) {

            var justVisible = typeof justVisible === 'undefined' ? true : justVisible;
            var allLis = $("li:not(.divider):not(.disabled):not(.multiselect-group)", this.$ul);
            var visibleLis = $("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapisble-hidden)", this.$ul).filter(':visible');

            if(justVisible) {
                $('input:enabled' , visibleLis).prop('checked', true);
                visibleLis.addClass(this.options.selectedClass);

                $('input:enabled' , visibleLis).each($.proxy(function(index, element) {
                    var value = $(element).val();
                    var option = this.getOptionByValue(value);
                    $(option).prop('selected', true);
                }, this));
            }
            else {
                $('input:enabled' , allLis).prop('checked', true);
                allLis.addClass(this.options.selectedClass);

                $('input:enabled' , allLis).each($.proxy(function(index, element) {
                    var value = $(element).val();
                    var option = this.getOptionByValue(value);
                    $(option).prop('selected', true);
                }, this));
            }

            $('li input[value="' + this.options.selectAllValue + '"]').prop('checked', true);

            if (this.options.enableClickableOptGroups && this.options.multiple) {
                this.updateOptGroups();
            }

            if (triggerOnSelectAll) {
                this.options.onSelectAll();
            }
        },

        /**
         * Deselects all options.
         *
         * If justVisible is true or not specified, only visible options are deselected.
         *
         * @param {Boolean} justVisible
         */
        deselectAll: function (justVisible, triggerOnDeselectAll) {

            var justVisible = typeof justVisible === 'undefined' ? true : justVisible;
            var allLis = $("li:not(.divider):not(.disabled):not(.multiselect-group)", this.$ul);
            var visibleLis = $("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapisble-hidden)", this.$ul).filter(':visible');

            if(justVisible) {
                $('input[type="checkbox"]:enabled' , visibleLis).prop('checked', false);
                visibleLis.removeClass(this.options.selectedClass);

                $('input[type="checkbox"]:enabled' , visibleLis).each($.proxy(function(index, element) {
                    var value = $(element).val();
                    var option = this.getOptionByValue(value);
                    $(option).prop('selected', false);
                }, this));
            }
            else {
                $('input[type="checkbox"]:enabled' , allLis).prop('checked', false);
                allLis.removeClass(this.options.selectedClass);

                $('input[type="checkbox"]:enabled' , allLis).each($.proxy(function(index, element) {
                    var value = $(element).val();
                    var option = this.getOptionByValue(value);
                    $(option).prop('selected', false);
                }, this));
            }

            $('li input[value="' + this.options.selectAllValue + '"]').prop('checked', false);

            if (this.options.enableClickableOptGroups && this.options.multiple) {
                this.updateOptGroups();
            }

            if (triggerOnDeselectAll) {
                this.options.onDeselectAll();
            }
        },

        /**
         * Rebuild the plugin.
         *
         * Rebuilds the dropdown, the filter and the select all option.
         */
        rebuild: function() {
            this.$ul.html('');

            // Important to distinguish between radios and checkboxes.
            this.options.multiple = this.$select.attr('multiple') === "multiple";

            this.buildSelectAll();
            this.buildDropdownOptions();
            this.buildFilter();

            this.updateButtonText();
            this.updateSelectAll(true);

            if (this.options.enableClickableOptGroups && this.options.multiple) {
                this.updateOptGroups();
            }

            if (this.options.disableIfEmpty && $('option', this.$select).length <= 0) {
                this.disable();
            }
            else {
                this.enable();
            }

            if (this.options.dropRight) {
                this.$ul.addClass('pull-right');
            }
        },

        /**
         * The provided data will be used to build the dropdown.
         */
        dataprovider: function(dataprovider) {

            var groupCounter = 0;
            var $select = this.$select.empty();

            $.each(dataprovider, function (index, option) {
                var $tag;

                if ($.isArray(option.children)) { // create optiongroup tag
                    groupCounter++;

                    $tag = $('<optgroup/>').attr({
                        label: option.label || 'Group ' + groupCounter,
                        disabled: !!option.disabled
                    });

                    forEach(option.children, function(subOption) { // add children option tags
                        var attributes = {
                            value: subOption.value,
                            label: subOption.label || subOption.value,
                            title: subOption.title,
                            selected: !!subOption.selected,
                            disabled: !!subOption.disabled
                        };

                        //Loop through attributes object and add key-value for each attribute
                       for (var key in subOption.attributes) {
                            attributes['data-' + key] = subOption.attributes[key];
                       }
                         //Append original attributes + new data attributes to option
                        $tag.append($('<option/>').attr(attributes));
                    });
                }
                else {

                    var attributes = {
                        'value': option.value,
                        'label': option.label || option.value,
                        'title': option.title,
                        'class': option.class,
                        'selected': !!option.selected,
                        'disabled': !!option.disabled
                    };
                    //Loop through attributes object and add key-value for each attribute
                    for (var key in option.attributes) {
                      attributes['data-' + key] = option.attributes[key];
                    }
                    //Append original attributes + new data attributes to option
                    $tag = $('<option/>').attr(attributes);

                    $tag.text(option.label || option.value);
                }

                $select.append($tag);
            });

            this.rebuild();
        },

        /**
         * Enable the multiselect.
         */
        enable: function() {
            this.$select.prop('disabled', false);
            this.$button.prop('disabled', false)
                .removeClass('disabled');
        },

        /**
         * Disable the multiselect.
         */
        disable: function() {
            this.$select.prop('disabled', true);
            this.$button.prop('disabled', true)
                .addClass('disabled');
        },

        /**
         * Set the options.
         *
         * @param {Array} options
         */
        setOptions: function(options) {
            this.options = this.mergeOptions(options);
        },

        /**
         * Merges the given options with the default options.
         *
         * @param {Array} options
         * @returns {Array}
         */
        mergeOptions: function(options) {
            return $.extend(true, {}, this.defaults, this.options, options);
        },

        /**
         * Checks whether a select all checkbox is present.
         *
         * @returns {Boolean}
         */
        hasSelectAll: function() {
            return $('li.multiselect-all', this.$ul).length > 0;
        },

        /**
         * Update opt groups.
         */
        updateOptGroups: function() {
            var $groups = $('li.multiselect-group', this.$ul)

            $groups.each(function() {
                var $options = $(this).nextUntil('li.multiselect-group')
                    .not('.multiselect-filter-hidden')
                    .not('.disabled');

                var checked = true;
                $options.each(function() {
                    var $input = $('input', this);

                    if (!$input.prop('checked')) {
                        checked = false;
                    }
                });

                $('input', this).prop('checked', checked);
            });
        },

        /**
         * Updates the select all checkbox based on the currently displayed and selected checkboxes.
         */
        updateSelectAll: function(notTriggerOnSelectAll) {
            if (this.hasSelectAll()) {
                var allBoxes = $("li:not(.multiselect-item):not(.multiselect-filter-hidden):not(.multiselect-group):not(.disabled) input:enabled", this.$ul);
                var allBoxesLength = allBoxes.length;
                var checkedBoxesLength = allBoxes.filter(":checked").length;
                var selectAllLi  = $("li.multiselect-all", this.$ul);
                var selectAllInput = selectAllLi.find("input");

                if (checkedBoxesLength > 0 && checkedBoxesLength === allBoxesLength) {
                    selectAllInput.prop("checked", true);
                    selectAllLi.addClass(this.options.selectedClass);
                    this.options.onSelectAll();
                }
                else {
                    selectAllInput.prop("checked", false);
                    selectAllLi.removeClass(this.options.selectedClass);
                    if (checkedBoxesLength === 0) {
                        if (!notTriggerOnSelectAll) {
                            this.options.onDeselectAll();
                        }
                    }
                }
            }
        },

        /**
         * Update the button text and its title based on the currently selected options.
         */
        updateButtonText: function() {
            var options = this.getSelected();

            // First update the displayed button text.
            if (this.options.enableHTML) {
                $('.multiselect .multiselect-selected-text', this.$container).html(this.options.buttonText(options, this.$select));
            }
            else {
                $('.multiselect .multiselect-selected-text', this.$container).text(this.options.buttonText(options, this.$select));
            }

            // Now update the title attribute of the button.
            $('.multiselect', this.$container).attr('title', this.options.buttonTitle(options, this.$select));
        },

        /**
         * Get all selected options.
         *
         * @returns {jQUery}
         */
        getSelected: function() {
            return $('option', this.$select).filter(":selected");
        },

        /**
         * Gets a select option by its value.
         *
         * @param {String} value
         * @returns {jQuery}
         */
        getOptionByValue: function (value) {

            var options = $('option', this.$select);
            var valueToCompare = value.toString();

            for (var i = 0; i < options.length; i = i + 1) {
                var option = options[i];
                if (option.value === valueToCompare) {
                    return $(option);
                }
            }
        },

        /**
         * Get the input (radio/checkbox) by its value.
         *
         * @param {String} value
         * @returns {jQuery}
         */
        getInputByValue: function (value) {

            var checkboxes = $('li input', this.$ul);
            var valueToCompare = value.toString();

            for (var i = 0; i < checkboxes.length; i = i + 1) {
                var checkbox = checkboxes[i];
                if (checkbox.value === valueToCompare) {
                    return $(checkbox);
                }
            }
        },

        /**
         * Used for knockout integration.
         */
        updateOriginalOptions: function() {
            this.originalOptions = this.$select.clone()[0].options;
        },

        asyncFunction: function(callback, timeout, self) {
            var args = Array.prototype.slice.call(arguments, 3);
            return setTimeout(function() {
                callback.apply(self || window, args);
            }, timeout);
        },

        setAllSelectedText: function(allSelectedText) {
            this.options.allSelectedText = allSelectedText;
            this.updateButtonText();
        }
    };

    $.fn.multiselect = function(option, parameter, extraOptions) {
        return this.each(function() {
            var data = $(this).data('multiselect');
            var options = typeof option === 'object' && option;

            // Initialize the multiselect.
            if (!data) {
                data = new Multiselect(this, options);
                $(this).data('multiselect', data);
            }

            // Call multiselect method.
            if (typeof option === 'string') {
                data[option](parameter, extraOptions);

                if (option === 'destroy') {
                    $(this).data('multiselect', false);
                }
            }
        });
    };

    $.fn.multiselect.Constructor = Multiselect;

    $(function() {
        $("select[data-role=multiselect]").multiselect();
    });

}(window.jQuery);


