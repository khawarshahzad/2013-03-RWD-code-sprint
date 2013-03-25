/*! Viewport Resizer v1.1.3 | http://lab.maltewassermann.com/viewport-resizer/ Copyright (c) 2012 Created by Malte Wassermann */
(function (q, C, J) {
    var U = C.createElement("script"),
        V = C.getElementsByTagName("script")[0];
    U.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js";
    V.parentNode.insertBefore(U, V);
    C.close();
    var W = function (a) {
        q.jQuery && [jQuery.fn.jquery, "1.8"].sort()[1] === jQuery.fn.jquery ? a(jQuery) : q.setTimeout(function () {
            W(a)
        }, 100)
    };
    W(function (a) {
        function x(b) {
            b = typeof b === "undefined" ? a("a.active", p) : a(b);
            var e = b.attr("data-viewport").toDimension();
            a("a.active", y).removeClass("active").end(b.addClass("active"));
            X(e)
        }
        function z(b, e) {
            var d = b ? b : a("a.active", y),
                g = b ? d.attr("data-viewport").toDimension() : {
                    width: D,
                    height: K
                }, k = e == "swap" ? {
                    width: g.height,
                    height: g.width
                } : {
                    width: g.width,
                    height: g.height
                }, h = k.width + "x" + k.height,
                f = RegExp(e == "swap" ? g.width + "x" + g.height : g.height + "x" + g.width, "g");
            g = e != null ? Y(e == "swap" && d.is(".portrait, .landscape") ? d.hasClass("landscape") ? 0 : -90 : e) : Y(g);
            var l = d.text();
            if (d.hasClass("custom") || !d.attr("data-icon")) {
                d.text(l.replace(f, h));
                l = d.text() === h ? "Custom" : d.text()
            }
            Z.html(a("<b>").text(l).after("Size: " +
                h + " (" + g + "), Ratio: " + function (j, i) {
                function n(r, L) {
                    if (L === 0) return r;
                    return n(L, r % L)
                }
                c = n(j, i);
                return j / c + ":" + i / c
            }(k.width, k.height)));
            d.attr("title", l);
            if (!b) {
                s.val(h).triggerHandler("edit");
                $ = s.val()
            }
        }
        function oa() {
            var b = "";
            a('a:not([data-viewport="auto"])', "#devices").clone().removeAttr("class").each(function () {
                b += a(this).prop("outerHTML")
            });
            a("#bookmarklet", A).attr({
                href: "javascript:void((function(d){if(self!=top||d.getElementById('toolbar')&&d.getElementById('toolbar').getAttribute('data-resizer'))return false;d.write('<!DOCTYPE HTML><html style=\"opacity:0;\"><head><meta charset=\"utf-8\"></head><body>" + b + '<script src="' + pa + "\"><\/script></body></html>')})(document));"
            })
        }
        function qa() {
            function b(j) {
                var i = h && typeof h === "number" ? h : Math.min(100 / u * D / 100, 1);
                i = Math.min(i, 10);
                i = Math.max(i, 0.25);
                i = j ? "" : "scale(" + i + ")";
                j = j ? "" : "0 0";
                v.css({
                    zoom: i,
                    "-webkit-transform": i,
                    "-webkit-transform-origin": j,
                    "-moz-transform": i,
                    "-moz-transform-origin": j,
                    "-ms-transform": i,
                    "-ms-transform-origin": j,
                    "-o-transform": i,
                    "-o-transform-origin": j,
                    transform: i,
                    "transform-origin": j
                })
            }
            function e(j) {
                v.css({
                    "min-width": j ? "" : u + "px",
                    "min-height": j || !l ? "" : l + "px"
                })
            }
            if (!m) return false;
            var d = function () {
                var j = {};
                if (m.find("meta[name=viewport]", "head").length) {
                    var i = m.find("meta[name=viewport]", "head");
                    typeof i.attr("content") !== "undefined" && i.attr("content").replace(/(\s)\s*/gm, "").split(/[,;.]+/).map(function (n) {
                        n = n.split("=");
                        j[n[0]] = n[1]
                    })
                }
                return j
            }(),
                g = d.width || false,
                k = d.height || false;
            d = d["initial-scale"] || false;
            var h = true,
                f = true,
                l = false;
            if (E) {
                b("clear");
                e("clear");
                return false
            }
            if (g) if (g !== "device-width") u = Number(g);
                else f = h = false;
                else u = 980;
            if (k && k !== "device-height") l = Number(k);
            if (d) {
                f = h = false;
                if (d === "minimum-scale") d = 0.25;
                if (d === "maximum-scale") d = 10;
                d = Number(d);
                if (d < 1) {
                    u = 980 + 1 * d;
                    f = h = true
                } else if (d > 1) h = d
            }
            h && b();
            f && e()
        }
        function aa() {
            m = o.contents();
            u = m.width() || 0;
            v = a("html", m);
            M = a("body", m);
            N = v.add(M);
            if (!ba) {
                var b = ["DOMMouseScroll", "mousewheel"];
                if (a.event.fixHooks) for (var e = b.length; e;) a.event.fixHooks[b[--e]] = a.event.mouseHooks;
                a.event.special.mousewheel = {
                    setup: function () {
                        if (this.addEventListener) for (var f = b.length; f;) this.addEventListener(b[--f],
                                    d, false);
                        else this.onmousewheel = d
                    },
                    teardown: function () {
                        if (this.removeEventListener) for (var f = b.length; f;) this.removeEventListener(b[--f], d, false);
                        else this.onmousewheel = null
                    }
                };
                a.fn.extend({
                    mousewheel: function (f) {
                        return f ? this.bind("mousewheel", f) : this.trigger("mousewheel")
                    },
                    unmousewheel: function (f) {
                        return this.unbind("mousewheel", f)
                    }
                });
                var d = function (f) {
                    var l = f || q.event,
                        j = [].slice.call(arguments, 1),
                        i = 0,
                        n = 0,
                        r = 0;
                    f = a.event.fix(l);
                    f.type = "mousewheel";
                    if (l.wheelDelta) i = l.wheelDelta / 120;
                    if (l.detail) i = -l.detail /
                            3;
                    r = i;
                    if (l.axis !== J && l.axis === l.HORIZONTAL_AXIS) {
                        r = 0;
                        n = -1 * i
                    }
                    if (l.wheelDeltaY !== J) r = l.wheelDeltaY / 120;
                    if (l.wheelDeltaX !== J) n = -1 * l.wheelDeltaX / 120;
                    j.unshift(f, i, n, r);
                    return (a.event.dispatch || a.event.handle).apply(this, j)
                }, g = o.height(),
                    k = 0;
                v.css("overflow-y", "hidden");
                N.on("mousewheel", function (f, l, j, i) {
                    f.preventDefault();
                    f = 0.05;
                    if (l > 0.1) f *= 5;
                    i = i > -f && i < f;
                    if (!(j < -f && i || j > f && i)) {
                        j = m.height() - g;
                        k -= l * ra;
                        if (k < 0) k = 0;
                        if (k > j) k = j;
                        m.scrollTop(k)
                    }
                })
            }
            O && N.css({
                overflow: "scroll",
                "-webkit-overflow-scrolling": "touch",
                width: "100%",
                height: "100%"
            });
            e = v.css("background-color");
            var h = M.css("background-color");
            o.css("background-color", e === "transparent" || e === "rgba(0, 0, 0, 0)" ? h === "transparent" || h === "rgba(0, 0, 0, 0)" ? "#fff" : h : e);
            m.find("title", "head").length && !P.find("title").length && P.prepend(m.find("title").prepend("↔ "))
        }
        function sa(b) {
            function e(g) {
                a("[data-viewport].active", "#devices").attr({
                    "data-viewport": g.height + "x" + g.width
                }).orientationClassName();
                return {
                    width: g.height,
                    height: g.width
                }
            }
            var d = a("a.active",
                p).attr("data-viewport").toDimension();
            if (b === 0 || b === 180) {
                if (d.width > d.height) d = e(d)
            } else if (b === 90 || b === -90) if (d.height > d.width) d = e(d);
            X(d)
        }
        function X(b) {
            D = b.width;
            K = b.height;
            E = b.auto;
            Q.attr({
                "class": E ? "auto" : ""
            });
            w.attr({
                "class": O && E || F.hasClass("active") ? "notransition" : "transition"
            }).css({
                width: D,
                height: K
            });
            var e = setTimeout(function () {
                qa();
                clearTimeout(e)
            }, 200);
            z()
        }
        function Y(b) {
            if (typeof b === "object") b = b.width === b.height ? false : b.width > b.height ? -90 : 0;
            return b === 0 || b === 180 ? "Portrait" : b === 90 || b === -90 ? "Landscape" : "n/a"
        }
        function ca(b) {
            var e = a();
            a('<a data-viewport="auto" data-icon="auto">Auto Size</a>').add(b).each(function () {
                e = e.add(a("<li>").append(a(this).setProperties().orientationClassName()))
            });
            p.html(e)
        }
        function da() {
            G.add(A).addClass("updated");
            ea.removeClass("invisible")
        }
        function fa() {
            a("a.active", p).length ? x(a("a.active", p).removeClass("active").get(0)) : x(a('[data-viewport="auto"]', y))
        }
        if (a("#toolbar[data-resizer]").length) return false;
        var pa = "http://lab.maltewassermann.com/viewport-resizer/resizer.min.js",
            t = a(q),
            R = a("html"),
            P = a("head"),
            ga = a("body"),
            B = a(location).attr("href"),
            H = typeof navigator.userAgent === "undefined" ? "n/a" : navigator.userAgent,
            ba = /webkit/i.test(H),
            O = /mobile.*safari/i.test(H),
            S = /opera/i.test(H),
            ta = R.is('[data-init="onload"]'),
            ua = a('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">'),
            ha = a('<style type="text/css" media="print">'),
            y = a('<div id="toolbar">').attr("data-resizer", "basic"),
            Q = a('<div id="container">'),
            w = a('<div id="wrapper">'),
            o = a('<iframe id="content" name="content" frameborder="0">').attr("src",
                B),
            ia = a('<b id="handle-e">'),
            ja = a('<b id="handle-s">'),
            T = a('<b id="handle-w">');
        B = a('<b id="handle-se">');
        var ka = a('<b id="handle-sw">'),
            F = ia.add(ja).add(T).add(B).add(ka),
            p = a('<ul id="devices">'),
            la = a('<ul id="tools">'),
            Z = a('<li class="info">');
        B = a('<ul id="extras">');
        var A = a('<div id="expand">').hide(),
            va = a('<a id="bookmarklet">').attr("data-text", "Your bookmarklet").append(a("<span>").html("↔ Resizer")),
            ea = a('<span class="invisible">').text(" has been changed. Please save or update your bookmarklet."),
            wa = new Date,
            I = 10,
            ra = S ? 2 : 30,
            m = false,
            D, K, E, ma, v, M, N, u, $;
        String.prototype.toDimension = function () {
            if (this == "auto") return {
                    width: typeof t.innerWidth() === "undefined" ? 400 : t.innerWidth(),
                    height: typeof t.innerHeight() === "undefined" ? 558 : t.innerHeight() - 42,
                    auto: true
            };
            else {
                var b = this.match(/\d{1,}\d/g);
                if (b) {
                    b = b.slice(0, 2);
                    return {
                        width: parseInt(typeof b[0] === "undefined" ? 400 : b[0]),
                        height: parseInt(typeof b[1] === "undefined" ? 600 : b[1]),
                        auto: false
                    }
                } else return null
            }
        };
        a.fn.setProperties = function () {
            var b = a(this);
            if (b.is(":empty")) {
                var e =
                    b.attr("data-viewport").toDimension();
                b.addClass("custom").text(e.width + "x" + e.height)
            }
            return b.attr("title", b.text())
        };
        a.fn.orientationClassName = function () {
            var b = a(this).attr("data-viewport").toDimension();
            b = b.width > b.height && !b.auto ? "landscape" : b.height > b.width && !b.auto ? "portrait" : "";
            return a(this).removeClass("portrait landscape").addClass(b)
        };
        (function () {
            function b(h) {
                h.preventDefault();
                o.css({
                    "pointer-events": "none"
                });
                var f = k.is(T) || k.is(ka) ? g.x - h.pageX : h.pageX - g.x;
                f = k.is(ja) ? g.w : Math.max(f + (g.w /
                    2 + d().w / 2), 0);
                h = k.is(ia) || k.is(T) ? g.h : Math.max(h.pageY - g.y + g.h, 0);
                f = f > I ? f : I;
                h = h > I ? h : I;
                s.val(f + "x" + h).triggerHandler("change");
                k.addClass("active")
            }
            function e() {
                t.off({
                    mousemove: b,
                    mouseup: e
                });
                o.css({
                    "pointer-events": ""
                });
                k.removeClass("active")
            }
            function d() {
                return {
                    w: parseInt(w.css("width")) || w.width() || 0,
                    h: parseInt(w.css("height")) || w.height() || 0
                }
            }
            var g = {}, k;
            F.on({
                mouseenter: function () {
                    F.hasClass("active") || a(this).addClass("hover")
                },
                mouseleave: function () {
                    a(this).removeClass("hover")
                },
                mousedown: function (h) {
                    h.preventDefault();
                    k = a(this);
                    g = {
                        w: d().w,
                        h: d().h,
                        x: h.pageX,
                        y: h.pageY
                    };
                    t.on({
                        mousemove: b,
                        mouseup: e
                    })
                }
            })
        })();
        var s = a('<input id="edit" type="text" value="">').on("edit", function () {
            a(this).css({
                width: Math.round((a(this).val().length + 1) * 7)
            })
        }).on("mouseover focus", function () {
            a(this).parent().addClass("hover")
        }).on("mouseout blur", function (b) {
            if (b.type == "blur" || !a(this).is(":focus")) a(this).parent().removeClass("hover")
        }).on("keyup", function () {
            a(this).triggerHandler("edit")
        }).on("change", function () {
            var b = a(this).val().toDimension();
            if (b) {
                a(this).parent().addClass("activeAdd");
                b = a("#add").text("").attr({
                    "data-viewport": b.width + "x" + b.height
                }).setProperties();
                x(b);
                a(this).trigger("blur")
            } else a(this).val($).triggerHandler("edit")
        });
        S = a('<a id="add" data-viewport="" data-icon="add" title="Add size to toolbar">').on("click touchend", function (b) {
            var e = a(this),
                d = e.clone();
            e.removeClass("active").fadeOut("slow", function () {
                a("li.activeAdd", la).removeClass("activeAdd");
                a("<li>").append(d.removeAttr("id").removeAttr("data-icon").removeAttr("title").removeClass("custom").orientationClassName().fadeIn("slow")).appendTo(p);
                da()
            });
            b.preventDefault()
        });
        var G = a('<a data-icon="hint" title="Information">').on("click touchend", function (b) {
            oa();
            a(this).toggleClass("open");
            G.hasClass("updated") || A.removeClass("updated");
            A.slideToggle(150, function () {
                G.removeClass("updated")
            });
            b.preventDefault()
        }),
            xa = a('<a data-icon="reload" title="Reload current page">').on("click touchend", function (b) {
                o.attr({
                    src: m.get(0).location.href
                }).on("load", function () {
                    aa()
                });
                b.preventDefault()
            }),
            ya = a('<a data-icon="print" title="Print...">').on("click touchend", function (b) {
                ha.html("body,#content{height:" + m.height() + "px !important;}");
                q.focus();
                q.print();
                b.preventDefault()
            }),
            na = a('<a data-icon="close" title="Close toolbar">').on("click touchend", function (b) {
                q.location.href = m.get(0).location.href;
                b.preventDefault()
            });
        P.prepend(ua).prepend('<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9, chrome=1">').prepend('<link rel="stylesheet" href="css/app.css">').append(ha);
        ca(a("[data-viewport]", ga));
        y.append(p).append(la.append(a("<li>").append(a('<label for="edit" data-icon="edit" title="Customize current size"><span>Customize:</span></label>').after(s).after(S))).append(Z)).append(B.append(a("<li>").append(xa)).append(ba ?
            a("<li>").append(ya) : null).append(a("<li>").append(G)).append(!ta ? a("<li>").append(na) : null)).before(A.append(a('<div class="inner">').append(a('<p class="well">').append(va.after(ea))).append(function () {
            var b = a("<dl>");
            a.each({
                "Viewport Resizer version": "1.1.3",
                "User agent": H
            }, function (e, d) {
                b.append(a("<dt>").text(e)).append(a("<dd>").text(d))
            });
            return b
        }()).append(a('<p class="muted">').html('About: <a href="http://lab.maltewassermann.com/viewport-resizer/" target="_blank">Viewport Resizer</a> is designed by Malte Wassermann (c) ' +
            wa.getFullYear())))).after(Q.append(w.append(o).append(F))).prependTo(ga);
        p.on("click touchend", '[data-viewport]:not(".active")', function (b) {
            x(a(this));
            b.preventDefault()
        }).on("mouseenter", '[data-viewport]:not(".active")', function () {
            z(a(this))
        }).on("mouseleave", '[data-viewport]:not(".active")', function () {
            z()
        }).on("click touchend", '[data-viewport]:not([data-viewport="auto"]).active', function (b) {
            a(this).removeClass("hover");
            sa(a(this).hasClass("landscape") ? 0 : -90);
            b.preventDefault()
        }).on("mouseenter",
            '[data-viewport]:not([data-viewport="auto"]).active', function () {
            a(this).addClass("hover");
            z(a(this), "swap")
        }).on("mouseleave", '[data-viewport]:not([data-viewport="auto"]).active', function () {
            a(this).removeClass("hover");
            z()
        });
        o.on("load", function () {
           
            aa();
            if (O) {
                y.add(Q).not(p).on("click touchend", function (d) {
                    !a(d.target).is(s) && s.is(":focus") && s.trigger("blur")
                });
                o.attr({
                    scrolling: "no"
                })
            }
            fa();
            R.css("opacity", 1);
            var e = setTimeout(function () {
                R.addClass("complete");
                clearTimeout(e)
            }, 100)
        });
        t.on("resize", function () {
            a("a.active", p).is('[data-viewport="auto"]') && x()
        }).on("beforeunload", function () {
            na.click()
        });
        C.updateDeviceList = function (b) {
            ca(b);
            da();
            fa()
        }
    })
})(window, document);