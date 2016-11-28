window.txEval = function(source, target) {
    if (typeof source == "function") {
        return source.call(target || this)
    } else {
        if (typeof source == "string") {
            return (target) ? target.eval(source) : this.eval(source)
        }
    }
};
(function() {
    try {
        EditorJSLoader.readyState = "loading"
    } catch (s) {}
    var b = document,
        h = window,
        n = b.documentElement,
        c = false,
        u = true,
        i = null,
        q;
    if (typeof JSON !== "object") {
        JSON = {}
    }(function() {
        function y(E) {
            return E < 10 ? "0" + E : E
        }
        if (typeof Date.prototype.toJSON !== "function") {
            Date.prototype.toJSON = function() {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + y(this.getUTCMonth() + 1) + "-" + y(this.getUTCDate()) + "T" + y(this.getUTCHours()) + ":" + y(this.getUTCMinutes()) + ":" + y(this.getUTCSeconds()) + "Z" : null
            };
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
                return this.valueOf()
            }
        }
        var x = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            A = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            B, w, D = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            C;

        function e(E) {
            A.lastIndex = 0;
            return A.test(E) ? '"' + E.replace(A, function(F) {
                var G = D[F];
                return typeof G === "string" ? G : "\\u" + ("0000" + F.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + E + '"'
        }

        function z(L, I) {
            var G, F, M, E, J = B,
                H, K = I[L];
            if (K && typeof K === "object" && typeof K.toJSON === "function") {
                K = K.toJSON(L)
            }
            if (typeof C === "function") {
                K = C.call(I, L, K)
            }
            switch (typeof K) {
                case "string":
                    return e(K);
                case "number":
                    return isFinite(K) ? String(K) : "null";
                case "boolean":
                case "null":
                    return String(K);
                case "object":
                    if (!K) {
                        return "null"
                    }
                    B += w;
                    H = [];
                    if (Object.prototype.toString.apply(K) === "[object Array]") {
                        E = K.length;
                        for (G = 0; G < E; G += 1) {
                            H[G] = z(G, K) || "null"
                        }
                        M = H.length === 0 ? "[]" : B ? "[\n" + B + H.join(",\n" + B) + "\n" + J + "]" : "[" + H.join(",") + "]";
                        B = J;
                        return M
                    }
                    if (C && typeof C === "object") {
                        E = C.length;
                        for (G = 0; G < E; G += 1) {
                            if (typeof C[G] === "string") {
                                F = C[G];
                                M = z(F, K);
                                if (M) {
                                    H.push(e(F) + (B ? ": " : ":") + M)
                                }
                            }
                        }
                    } else {
                        for (F in K) {
                            if (Object.prototype.hasOwnProperty.call(K, F)) {
                                M = z(F, K);
                                if (M) {
                                    H.push(e(F) + (B ? ": " : ":") + M)
                                }
                            }
                        }
                    }
                    M = H.length === 0 ? "{}" : B ? "{\n" + B + H.join(",\n" + B) + "\n" + J + "}" : "{" + H.join(",") + "}";
                    B = J;
                    return M
            }
        }
        if (typeof JSON.stringify !== "function") {
            JSON.stringify = function(H, F, G) {
                var E;
                B = "";
                w = "";
                if (typeof G === "number") {
                    for (E = 0; E < G; E += 1) {
                        w += " "
                    }
                } else {
                    if (typeof G === "string") {
                        w = G
                    }
                }
                C = F;
                if (F && typeof F !== "function" && (typeof F !== "object" || typeof F.length !== "number")) {
                    throw new Error("JSON.stringify")
                }
                return z("", {
                    "": H
                })
            }
        }
        if (typeof JSON.parse !== "function") {
            JSON.parse = function(H, E) {
                var G;

                function F(L, K) {
                    var J, I, M = L[K];
                    if (M && typeof M === "object") {
                        for (J in M) {
                            if (Object.prototype.hasOwnProperty.call(M, J)) {
                                I = F(M, J);
                                if (I !== undefined) {
                                    M[J] = I
                                } else {
                                    delete M[J]
                                }
                            }
                        }
                    }
                    return E.call(L, K, M)
                }
                H = String(H);
                x.lastIndex = 0;
                if (x.test(H)) {
                    H = H.replace(x, function(I) {
                        return "\\u" + ("0000" + I.charCodeAt(0).toString(16)).slice(-4)
                    })
                }
                if (/^[\],:{}\s]*$/.test(H.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                    G = txEval("(" + H + ")");
                    return typeof E === "function" ? F({
                        "": G
                    }, "") : G
                }
                throw new SyntaxError("JSON.parse")
            }
        }
    }());
    var t = {};
    (function() {
        Object.extend = function(z, B) {
            for (var A in B) {
                z[A] = B[A]
            }
            return z
        };
        h.Class = {
            create: function() {
                return function() {
                    this.initialize.apply(this, arguments)
                }
            }
        };
        h.$break = {};
        Function.prototype.bind = function() {
            var z = this,
                B = $A(arguments),
                A = B.shift();
            return function() {
                return z.apply(A, B.concat($A(arguments)))
            }
        };
        Function.prototype.bindAsEventListener = function() {
            var z = this,
                B = $A(arguments),
                A = B.shift();
            return function(C) {
                return z.apply(A, [C || h.event].concat(B))
            }
        };
        var y = function(B) {
            var z = arguments;
            if (z.length > 1) {
                for (var A = 0, D = [], C = z.length; A < C; A++) {
                    D.push(t(z[A]))
                }
                return D
            }
            if (typeof B == "string") {
                B = b.getElementById(B)
            }
            return B
        };
        t = y;
        var x = navigator.userAgent.toLowerCase();
        var e = function(z) {
            return x.indexOf(z) != -1
        };
        var w = function(z) {
            return z.test(x)
        };
        Object.extend(t, {
            chrome: e("chrome"),
            safari: e("safari") && e("chrome") == c,
            gecko: e("firefox"),
            gecko_ver: e("firefox") ? parseFloat(x.replace(/.*firefox\/([\d\.]+).*/g, "$1")) : 0,
            msie: e("msie") || e("trident"),
            msie_ver: e("msie") || e("trident") ? (function() {
                return e("msie") ? parseFloat(x.split("msie")[1]) : parseFloat(x.split("rv:")[1])
            })() : 0,
            msie_docmode: b.documentMode || 0,
            webkit: e("applewebkit"),
            webkit_ver: e("applewebkit") ? parseFloat(x.replace(/.*safari\//g, "")) : 0,
            opera: e("opera"),
            presto: e("presto"),
            os_win: e("win"),
            os_win7: e("windows nt 6.1"),
            os_win8: e("windows nt 6.2"),
            os_win8_1: e("windows nt 6.3"),
            os_mac: e("mac"),
            iphone: e("iphone"),
            ipod: e("ipod"),
            ipad: e("ipad"),
            ios: e("like mac os x") && e("mobile"),
            ios_ver: (e("like mac os x") && e("mobile")) ? parseFloat(x.replace(/^.*os (\d+)([_\d]*) .*$/g, "$1.$2").replace(/_/g, "")) : 0,
            android: e("android"),
            android_ver: e("android") ? parseFloat(x.replace(/.*android[\s]*([\d\.]+).*/g, "$1")) : 0,
            blackberry: e("blackberry"),
            winphone: e("windows phone os"),
            wince: e("windows ce")
        });
        Object.extend(t, {
            msie_std: (t.msie && !b.selection),
            msie_nonstd: (t.msie && !!b.selection),
            msie6: (t.msie && 6 <= t.msie_ver && t.msie_ver < 7),
            msie_quirks: t.msie && h.top.document.compatMode !== "CSS1Compat"
        });
        Object.extend(t, {
            extend: Object.extend,
            browser: function() {
                if (t.msie) {
                    return "msie"
                } else {
                    if (t.gecko) {
                        return "firefox"
                    } else {
                        if (t.chrome) {
                            return "chrome"
                        } else {
                            if (t.webkit) {
                                return "safari"
                            } else {
                                if (t.opera) {
                                    return "opera"
                                } else {
                                    return ""
                                }
                            }
                        }
                    }
                }
            }()
        });
        h.$must = function(B, z) {
            var A = t(B);
            if (!A) {
                throw new Error("[Exception] " + z + ": cannot find element: id='" + B + "'")
            }
            return A
        };
        h.txlib = y
    })();
    (function() {
        t.extend(t, {
            classNames: function(e) {
                return e.className.split(" ")
            },
            hasClassName: function(w, e) {
                if (e && w.className) {
                    var x = w.className.split(/\s+/);
                    return x.contains(e)
                }
                return c
            },
            addClassName: function(e, w) {
                if (!this.hasClassName(e, w)) {
                    e.className += " " + w
                }
            },
            removeClassName: function(w, e) {
                var x = w.className.split(/\s+/);
                w.className = x.without(e).compact().join(" ")
            },
            visible: function(e) {
                return t.getStyle(e, "display") != "none"
            },
            toggle: function(e) {
                e = t(e);
                t[t.visible(e) ? "hide" : "show"](e);
                return e
            },
            show: function(e) {
                t(e).style.display = "block";
                return e
            },
            hide: function(e) {
                t(e).style.display = "none";
                return e
            }
        })
    })();
    t.extend(t, {
        getStyle: function(w, x) {
            w = t(w);
            x = x == "float" ? "cssFloat" : x.camelize();
            var y = w.style[x];
            if (!y) {
                var e = b.defaultView.getComputedStyle(w, i);
                y = e ? e[x] : i
            }
            if (x == "opacity") {
                return y ? parseFloat(y) : 1
            }
            return y == "auto" ? i : y
        },
        setStyle: function(e, x, w) {
            e = t(e);
            var z = e.style;
            for (var y in x) {
                if (x.hasOwnProperty(y)) {
                    if (y === "opacity") {
                        t.setOpacity(e, x[y])
                    } else {
                        z[(y === "float" || y === "cssFloat") ? (z.styleFloat === q ? "cssFloat" : "styleFloat") : (w ? y : y.camelize())] = x[y]
                    }
                }
            }
            return e
        },
        setStyleProperty: function(e, x) {
            var w = u;
            this.setStyle(e, x, w)
        },
        getOpacity: function(e) {
            return t(e).getStyle("opacity")
        },
        setOpacity: function(e, w) {
            e = t(e);
            e.style.opacity = (w == 1 || w === "") ? "" : (w < 0.00001) ? 0 : w;
            return e
        },
        applyCSSText: function(x, w) {
            var e = x.createElement("style");
            e.setAttribute("type", "text/css");
            if (e.styleSheet) {
                e.styleSheet.cssText = w
            } else {
                e.textContent = w
            }
            x.getElementsByTagName("head")[0].appendChild(e)
        }
    });
    (function() {
        if (t.msie_nonstd) {
            t.getStyle = function(w, x) {
                w = t(w);
                x = (x == "float" || x == "cssFloat") ? "styleFloat" : x.camelize();
                var y = w.style[x];
                if (!y && w.currentStyle) {
                    y = w.currentStyle[x]
                }
                if (x == "opacity") {
                    if (y = (t.getStyle(w, "filter") || "").match(/alpha\(opacity=(.*)\)/)) {
                        if (y[1]) {
                            return parseFloat(y[1]) / 100
                        }
                    }
                    return 1
                }
                if (y == "auto") {
                    if ((x == "width" || x == "height") && (t.getStyle(w, "display") != "none")) {
                        return w["offset" + x.capitalize()] + "px"
                    }
                    return i
                }
                return y
            }
        }
        if (t.msie_nonstd) {
            t.setOpacity = function(w, z) {
                w = t(w);
                var y = t.getStyle(w, "filter"),
                    x = w.style;
                if (z == 1 || z === "") {
                    x.filter = y.replace(/alpha\([^\)]*\)/gi, "");
                    return w
                } else {
                    if (z < 0.00001) {
                        z = 0
                    }
                }
                x.filter = y.replace(/alpha\([^\)]*\)/gi, "") + "alpha(opacity=" + (z * 100) + ")";
                return w
            }
        }
        if (t.gecko) {
            t.extend(t, {
                setOpacity: function(w, x) {
                    w = t(w);
                    w.style.opacity = (x == 1) ? 0.999999 : (x === "") ? "" : (x < 0.00001) ? 0 : x;
                    return w
                }
            })
        }
        t.JSONHelper = {
            encodeURIComponentReplacer: function(w, x) {
                if (typeof x === "string") {
                    if (!e(x)) {
                        return encodeURIComponent(x)
                    }
                }
                return x
            },
            decodeURIComponentReviver: function(w, x) {
                if (typeof x === "string") {
                    if (!e(x)) {
                        return decodeURIComponent(x)
                    } else {
                        return JSON.parse(x, arguments.callee)
                    }
                }
                return x
            }
        };
        var e = function(w) {
            return (w.charAt(0) == "[" && w.charAt(w.length - 1) == "]")
        }
    })();
    (function() {
        t.extend(t, {
            cumulativeOffset: function(w) {
                var e = 0,
                    x = 0;
                do {
                    e += w.offsetTop || 0;
                    x += w.offsetLeft || 0;
                    w = w.offsetParent
                } while (w);
                return [x, e]
            },
            positionedOffset: function(w) {
                var e = 0,
                    y = 0;
                do {
                    e += w.offsetTop || 0;
                    y += w.offsetLeft || 0;
                    w = w.offsetParent;
                    if (w) {
                        if (w.tagName == "BODY") {
                            break
                        }
                        var x = t.getStyle(w, "position");
                        if (x == "relative" || x == "absolute") {
                            break
                        }
                    }
                } while (w);
                return [y, e]
            },
            getDimensions: function(x) {
                var B = t.getStyle(x, "display");
                if (B != "none" && B != i) {
                    return {
                        width: x.offsetWidth,
                        height: x.offsetHeight
                    }
                }
                var w = x.style;
                var A = w.visibility;
                var y = w.position;
                var e = w.display;
                w.visibility = "hidden";
                w.position = "absolute";
                w.display = "block";
                var C = x.clientWidth;
                var z = x.clientHeight;
                w.display = e;
                w.position = y;
                w.visibility = A;
                return {
                    width: C,
                    height: z
                }
            },
            getCoords: function(D, z) {
                var y = z || false;
                var x = D.offsetWidth;
                var A = D.offsetHeight;
                var B = {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                };
                var C;
                while (D) {
                    B.left += D.offsetLeft || 0;
                    B.top += D.offsetTop || 0;
                    D = D.offsetParent;
                    if (y) {
                        if (D) {
                            if (D.tagName == "BODY") {
                                break
                            }
                            C = t.getStyle(D, "position");
                            if (C !== "static") {
                                break
                            }
                        }
                    }
                }
                B.right = B.left + x;
                B.bottom = B.top + A;
                return B
            },
            getCoordsTarget: function(e) {
                return this.getCoords(e, u)
            }
        });
        if (t.webkit) {
            t.cumulativeOffset = function(w) {
                var e = 0,
                    x = 0;
                do {
                    e += w.offsetTop || 0;
                    x += w.offsetLeft || 0;
                    if (w.offsetParent == b.body) {
                        if (t.getStyle(w, "position") == "absolute") {
                            break
                        }
                    }
                    w = w.offsetParent
                } while (w);
                return [x, e]
            }
        }
    })();
    (function() {
        t.extend(t, {
            KEY_BACKSPACE: 8,
            KEY_TAB: 9,
            KEY_RETURN: 13,
            KEY_ESC: 27,
            KEY_LEFT: 37,
            KEY_UP: 38,
            KEY_RIGHT: 39,
            KEY_DOWN: 40,
            KEY_DELETE: 46,
            KEY_HOME: 36,
            KEY_END: 35,
            KEY_PAGEUP: 33,
            KEY_PAGEDOWN: 34,
            element: function(e) {
                return t(e.target || e.srcElement)
            },
            isLeftClick: function(e) {
                return (((e.which) && (e.which == 1)) || ((e.button) && (e.button == 1)))
            },
            pointerX: function(e) {
                return e.pageX || (e.clientX + (b.documentElement.scrollLeft || b.body.scrollLeft))
            },
            pointerY: function(e) {
                return e.pageY || (e.clientY + (b.documentElement.scrollTop || b.body.scrollTop))
            },
            stop: function(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                    e.stopPropagation()
                } else {
                    e.returnValue = c;
                    e.cancelBubble = u
                }
            },
            findElement: function(x, w) {
                var e = t.element(x);
                while (e.parentNode && (!e.tagName || !e.tagName.toUpperCase || (e.tagName.toUpperCase() != w.toUpperCase()))) {
                    e = e.parentNode
                }
                return e
            },
            observers: c,
            _observeAndCache: function(y, x, w, e) {
                if (!this.observers) {
                    this.observers = []
                }
                if (y.addEventListener) {
                    this.observers.push([y, x, w, e]);
                    y.addEventListener(x, w, e)
                } else {
                    if (y.attachEvent) {
                        this.observers.push([y, x, w, e]);
                        y.attachEvent("on" + x, w)
                    }
                }
            },
            simulateEvent: function(A, w, z) {
                var B = t.observers;
                if (!B) {
                    return
                }
                for (var x = 0, y = B.length; x < y; x++) {
                    var e = B[x];
                    if (e && e[1] === w && e[0] === A) {
                        e[2](z)
                    }
                }
            },
            unloadCache: function() {
                if (!t.observers) {
                    return
                }
                for (var e = 0, w = t.observers.length; e < w; e++) {
                    t.stopObserving.apply(this, t.observers[e]);
                    t.observers[e][0] = i
                }
                t.observers = c
            },
            observe: function(y, x, w, e) {
                y = t(y);
                e = e || c;
                if (x == "keypress") {
                    x = "keydown"
                }
                t._observeAndCache(y, x, w, e)
            },
            stopObserving: function(z, y, x, w) {
                z = t(z);
                w = w || c;
                if (y == "keypress") {
                    y = "keydown"
                }
                if (z.removeEventListener) {
                    z.removeEventListener(y, x, w)
                } else {
                    if (z.detachEvent) {
                        try {
                            z.detachEvent("on" + y, x)
                        } catch (A) {}
                    }
                }
            }
        });
        if (t.msie) {
            t.observe(window, "unload", t.unloadCache, c)
        }
    })();
    (function() {
        t.extend(Object, {
            clone: function(e) {
                return Object.extend({}, e)
            }
        });
        t.extend(t, {
            isPrimitiveType: function(w) {
                var e = new t.Set("string", "number", "boolean", "date", "function");
                return e.contains(typeof w)
            },
            deepcopy: function(y, e) {
                var x = y;
                if (!e) {
                    return x
                }
                for (var w in e) {
                    switch (typeof(e[w])) {
                        case "string":
                        case "number":
                        case "boolean":
                        case "date":
                        case "function":
                            x[w] = e[w];
                            break;
                        default:
                            if (e[w]) {
                                if (e[w].constructor == Array) {
                                    x[w] = [].concat(e[w])
                                } else {
                                    x[w] = x[w] || {};
                                    this.deepcopy(x[w], e[w])
                                }
                            } else {
                                x[w] = i
                            }
                            break
                    }
                }
                return x
            }
        })
    })();
    (function() {
        t.extend(String, {
            interpret: function(e) {
                return e == i ? "" : String(e)
            },
            specialChar: {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                "\\": "\\\\"
            }
        });
        t.extend(String.prototype, {
            gsub: function(z, x) {
                var e = "",
                    y = this,
                    w;
                x = arguments.callee.prepareReplacement(x);
                while (y.length > 0) {
                    if (w = y.match(z)) {
                        e += y.slice(0, w.index);
                        e += String.interpret(x(w));
                        y = y.slice(w.index + w[0].length)
                    } else {
                        e += y, y = ""
                    }
                }
                return e
            },
            strip: function() {
                return this.replace(/^\s+/, "").replace(/\s+$/, "")
            },
            stripTags: function() {
                return this.replace(/<\/?[^>]+>/gi, "")
            },
            toQueryParams: function(y) {
                var e = this.strip().match(/([^?#]*)(#.*)?$/);
                if (!e) {
                    return {}
                }
                var x = {};
                var w = i;
                e[1].split(y || "&").each(function(C) {
                    var B = i,
                        z = i;
                    var A = C.match(/([\w_]+)=(.*)/);
                    if (A) {
                        w = B = decodeURIComponent(A[1]);
                        if (A[2]) {
                            z = decodeURIComponent(A[2])
                        }
                    } else {
                        if (w) {
                            B = w;
                            z = x[B];
                            z += "&" + decodeURIComponent(C)
                        } else {
                            return
                        }
                    }
                    if (B in x) {
                        if (x[B].constructor != Array) {
                            x[B] = [x[B]]
                        }
                        x[B].push(z)
                    } else {
                        x[B] = z
                    }
                });
                return x
            },
            toArray: function() {
                return this.split("")
            },
            times: function(x) {
                var e = "";
                for (var w = 0; w < x; w++) {
                    e += this
                }
                return e
            },
            camelize: function() {
                var y = this.split("-"),
                    e = y.length;
                if (e == 1) {
                    return y[0]
                }
                var x = this.charAt(0) == "-" ? y[0].charAt(0).toUpperCase() + y[0].substring(1) : y[0];
                for (var w = 1; w < e; w++) {
                    x += y[w].charAt(0).toUpperCase() + y[w].substring(1)
                }
                return x
            },
            capitalize: function() {
                return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
            },
            include: function(e) {
                return this.indexOf(e) > -1
            },
            empty: function() {
                return this == ""
            },
            blank: function() {
                return /^\s*$/.test(this)
            }
        });
        String.prototype.gsub.prepareReplacement = function(w) {
            if (typeof w == "function") {
                return w
            }
            var e = new Template(w);
            return function(x) {
                return e.evaluate(x)
            }
        };
        t.extend(String.prototype, {
            trim: function() {
                return this.replace(/(^\s*)|(\s*$)/g, "")
            },
            getRegExp: function() {
                return this.replace(/\\/g, "\\\\").replace(/\./g, "\\.").replace(/\//g, "\\/").replace(/\?/g, "\\?").replace(/\^/g, "\\^").replace(/\)/g, "\\)").replace(/\(/g, "\\(").replace(/\]/g, "\\]").replace(/\[/g, "\\[").replace(/\$/g, "\\$").replace(/\+/g, "\\+").replace(/\|/g, "\\|").replace(/&/g, "(&|&amp;)")
            },
            toNumber: function() {
                return (isNaN(this) ? 0 : parseInt(this, 10))
            },
            toFloat: function() {
                return (isNaN(this) ? 0 : parseFloat(this))
            },
            getRealLength: function() {
                var x = this;
                var e = 0;
                for (var w = 0; w < x.length; w++) {
                    e += (escape(x.charAt(w)).charAt(1) == "u") ? 2 : 1
                }
                return e
            },
            cutRealLength: function(x) {
                var y = this;
                var e = 0;
                for (var w = 0; w < y.length; w++) {
                    e += (escape(y.charAt(w)).charAt(1) == "u") ? 2 : 1;
                    if (e > x) {
                        return y.substring(0, w - 3).concat("...")
                    }
                }
                return y
            },
            getCut: function(e) {
                return this.cutRealLength(e)
            },
            parsePx: function() {
                if (this == i || this.length == 0) {
                    return 0
                } else {
                    if (this.indexOf("px") > -1) {
                        return this.substring(0, this.indexOf("px")).toNumber()
                    } else {
                        return this.toNumber()
                    }
                }
            },
            toPx: function() {
                if (this.indexOf("px") > -1) {
                    return this + ""
                } else {
                    return this + "px"
                }
            },
            isPx: function() {
                var e = this;
                if (e.trim() == "") {
                    return false
                } else {
                    if (e.indexOf("px") != -1) {
                        e = this.parsePx()
                    }
                }
                return !isNaN(e)
            },
            toByteUnit: function() {
                return this.toNumber().toByteUnit()
            },
            toCurrency: function() {
                var w = this;
                for (var e = 0; e < Math.floor((w.length - (1 + e)) / 3); e++) {
                    w = w.substring(0, w.length - (4 * e + 3)) + "," + w.substring(w.length - (4 * e + 3))
                }
                return w
            },
            replaceAll: function(e, w) {
                e = e.replace(new RegExp("(\\W)", "g"), "\\$1");
                w = w.replace(new RegExp("\\$", "g"), "$$$$");
                return this.replace(new RegExp(e, "gm"), w)
            }
        })
    })();
    (function() {
        t.extend(Number.prototype, {
            toPaddedString: function(x, w) {
                var e = this.toString(w || 10);
                return "0".times(x - e.length) + e
            },
            toTime: function() {
                return Math.floor(this / 60).toString().toPaddedString(2) + ":" + (this % 60).toString().toPaddedString(2)
            },
            toByteUnit: function() {
                var x;
                var e = ["GB", "MB", "KB"];
                if (this == 0) {
                    return "0" + e[2]
                }
                for (var w = 0; w < e.length; w++) {
                    x = this / Math.pow(1024, 3 - w);
                    if (x < 1) {
                        continue
                    }
                    return (Math.round(x * 10) / 10) + e[w]
                }
                return "1" + e[2]
            },
            toPx: function() {
                return this.toString() + "px"
            },
            parsePx: function() {
                return this + 0
            },
            isPx: function() {
                return u
            },
            toNumber: function() {
                return this + 0
            },
            toCurrency: function() {
                return this.toString().toCurrency()
            },
            getRegExp: function() {
                return this.toString().getRegExp()
            }
        })
    })();
    (function() {
        t.extend(Array.prototype, {
            each: function(x) {
                if (h.DEBUG) {
                    for (var w = 0, y = this.length; w < y; w++) {
                        x(this[w])
                    }
                } else {
                    try {
                        for (var w = 0, y = this.length; w < y; w++) {
                            x(this[w])
                        }
                    } catch (z) {
                        if (z != $break) {
                            throw z
                        }
                    }
                }
                return this
            },
            indexOf: function(w) {
                for (var e = 0; e < this.length; e++) {
                    if (this[e] == w) {
                        return e
                    }
                }
                return -1
            },
            map: function(x) {
                for (var e = [], w = 0, y = this.length; w < y; ++w) {
                    e[w] = x(this[w])
                }
                return e
            },
            include: function(e) {
                return this.contains(e)
            },
            contains: function(e) {
                return this.indexOf(e) >= 0
            },
            pluck: function(w) {
                var e = [];
                this.each(function(x) {
                    e.push(x[w])
                });
                return e
            },
            find: function(y) {
                for (var w = 0, e = this.length; w < e; w++) {
                    var x = this[w];
                    if (y(x, w)) {
                        return x
                    }
                }
                return i
            },
            findAll: function(z) {
                var x = [];
                for (var w = 0, e = this.length; w < e; w++) {
                    var y = this[w];
                    if (z(y, w)) {
                        x.push(y)
                    }
                }
                return x
            },
            inject: function(z, x) {
                for (var w = 0, e = this.length; w < e; w++) {
                    var y = this[w];
                    z = x(z, y, w)
                }
                return z
            },
            without: function() {
                var e = $A(arguments);
                return this.findAll(function(w) {
                    return !e.include(w)
                })
            },
            last: function() {
                return this[this.length - 1]
            },
            flatten: function() {
                return this.inject([], function(w, e) {
                    return w.concat(e && e.constructor == Array ? e.flatten() : [e])
                })
            },
            compact: function() {
                return this.findAll(function(e) {
                    return (e != i) && (e != "")
                })
            },
            uniq: function(e) {
                return this.inject([], function(y, x, w) {
                    if (0 == w || (e ? y.last() != x : !y.contains(x))) {
                        y.push(x)
                    }
                    return y
                })
            },
            toMap: function(w) {
                var e = {};
                this.each(function(x) {
                    e[x[w]] = x
                });
                return e
            }
        });
        Array.prototype.select = Array.prototype.findAll;
        Array.prototype.detect = Array.prototype.find;
        h.$A = function(x) {
            if (!x) {
                return []
            }
            if (typeof x.toArray === "function") {
                return x.toArray()
            } else {
                var y = [];
                for (var w = 0, e = x.length; w < e; w++) {
                    y.push(x[w])
                }
                return y
            }
        };
        t.Set = function() {
            var w = arguments;
            for (var x = 0, e = w.length; x < e; x++) {
                this[w[x]] = u
            }
        };
        t.Set.prototype.contains = function(e) {
            return e in this
        };
        t.objectToQueryString = function(x) {
            var y = [];
            for (var e in x) {
                if (x.hasOwnProperty(e)) {
                    var w = x[e];
                    if (w === i || w === q) {
                        w = ""
                    }
                    y.push(encodeURIComponent(e) + "=" + encodeURIComponent(w))
                }
            }
            return y.join("&")
        }
    })();
    (function() {
        if (typeof(HTMLElement) != q + "") {
            var x = HTMLElement.prototype;
            var w = x.__proto__ = {
                __proto__: x.__proto__
            };
            if (HTMLElement.prototype.__defineSetter__) {
                w.__defineSetter__("innerText", function(A) {
                    this.textContent = A
                })
            }
            if (HTMLElement.prototype.__defineGetter__) {
                w.__defineGetter__("innerText", function() {
                    return this.textContent
                })
            }
        }
        if (typeof(XMLDocument) != q + "") {
            var z = XMLDocument;
            if (z.prototype.__defineGetter__) {
                z.prototype.__defineGetter__("xml", function() {
                    return (new XMLSerializer()).serializeToString(this)
                })
            }
        }
        if (typeof(Node) != q + "") {
            if (Node.prototype && Node.prototype.__defineGetter__) {
                Node.prototype.__defineGetter__("xml", function() {
                    return (new XMLSerializer()).serializeToString(this)
                })
            }
        }
        if (typeof(b.implementation) != q + "") {
            if (b.implementation.hasFeature("XPath", "3.0")) {
                if (typeof(z) != q + "") {
                    z.prototype.selectNodes = function(C, E) {
                        if (!E) {
                            E = this
                        }
                        var D = this.defaultNS;
                        var A = this.evaluate(C, E, {
                            normalResolver: this.createNSResolver(this.documentElement),
                            lookupNamespaceURI: function(G) {
                                switch (G) {
                                    case "dflt":
                                        return D;
                                    default:
                                        return this.normalResolver.lookupNamespaceURI(G)
                                }
                            }
                        }, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, i);
                        var F = [];
                        for (var B = 0; B < A.snapshotLength; B++) {
                            F[B] = A.snapshotItem(B)
                        }
                        return F
                    };
                    z.prototype.setProperty = function(B, A) {
                        if (B == "SelectionNamespaces" && A.indexOf("xmlns:dflt") == 0) {
                            this.defaultNS = A.replace(/^.*=\'(.+)\'/, "$1")
                        }
                    };
                    z.prototype.defaultNS;
                    z.prototype.selectSingleNode = function(B, C) {
                        if (!C) {
                            C = this
                        }
                        var A = this.selectNodes(B, C);
                        if (A.length > 0) {
                            return A[0]
                        } else {
                            return i
                        }
                    };
                    z.prototype.createNode = function(A, C, B) {
                        if (A == 1) {
                            return this.createElementNS(B, C)
                        } else {
                            return i
                        }
                    }
                }
                if (typeof(Element) != q + "") {
                    Element.prototype.selectNodes = function(A) {
                        if (this.ownerDocument.selectNodes) {
                            return this.ownerDocument.selectNodes(A, this)
                        } else {
                            throw "For XML Elements Only"
                        }
                    };
                    Element.prototype.selectSingleNode = function(A) {
                        if (this.ownerDocument.selectSingleNode) {
                            return this.ownerDocument.selectSingleNode(A, this)
                        } else {
                            throw "For XML Elements Only"
                        }
                    };
                    Element.prototype.text;
                    var y = Element.prototype;
                    var e = y.__proto__ = {
                        __proto__: y.__proto__
                    };
                    if (Element.prototype.__defineSetter__) {
                        e.__defineSetter__("text", function(A) {
                            this.textContent = A
                        })
                    }
                    if (Element.prototype.__defineGetter__) {
                        e.__defineGetter__("text", function() {
                            return this.textContent
                        })
                    }
                    if (h.origElement) {
                        h.origElement.prototype.selectNodes = Element.prototype.selectNodes;
                        h.origElement.prototype.selectSingleNode = Element.prototype.selectSingleNode
                    }
                }
            }
        }
    })();
    h.$tx = t;
    var d = h.goog = h.goog || {};
    d.global = h;
    d.LOCALE = "en";
    d.provide = function(e) {
        d.exportPath_(e)
    };
    d.exportPath_ = function(x, e, A) {
        var y = x.split(".");
        var z = A || d.global;
        if (!(y[0] in z) && z.execScript) {
            z.execScript("var " + y[0])
        }
        for (var w; y.length && (w = y.shift());) {
            if (!y.length && d.isDef(e)) {
                z[w] = e
            } else {
                if (z[w]) {
                    z = z[w]
                } else {
                    z = z[w] = {}
                }
            }
        }
    };
    d.abstractMethod = function() {
        throw Error("unimplemented abstract method")
    };
    d.typeOf = function(x) {
        var w = typeof x;
        if (w == "object") {
            if (x) {
                if (x instanceof Array) {
                    return "array"
                } else {
                    if (x instanceof Object) {
                        return w
                    }
                }
                var e = Object.prototype.toString.call((x));
                if (e == "[object Window]") {
                    return "object"
                }
                if ((e == "[object Array]" || typeof x.length == "number" && typeof x.splice != q + "" && typeof x.propertyIsEnumerable != q + "" && !x.propertyIsEnumerable("splice"))) {
                    return "array"
                }
                if ((e == "[object Function]" || typeof x.call != q + "" && typeof x.propertyIsEnumerable != q + "" && !x.propertyIsEnumerable("call"))) {
                    return "function"
                }
            } else {
                return i + ""
            }
        } else {
            if (w == "function" && typeof x.call == q + "") {
                return "object"
            }
        }
        return w
    };
    d.isDef = function(e) {
        return e !== q
    };
    d.isNull = function(e) {
        return e === i
    };
    d.isDefAndNotNull = function(e) {
        return e != i
    };
    d.isArray = function(e) {
        return d.typeOf(e) == "array"
    };
    d.isArrayLike = function(w) {
        var e = d.typeOf(w);
        return e == "array" || e == "object" && typeof w.length == "number"
    };
    d.isDateLike = function(e) {
        return d.isObject(e) && typeof e.getFullYear == "function"
    };
    d.isString = function(e) {
        return typeof e == "string"
    };
    d.isBoolean = function(e) {
        return typeof e == "boolean"
    };
    d.isNumber = function(e) {
        return typeof e == "number"
    };
    d.isFunction = function(e) {
        return d.typeOf(e) == "function"
    };
    d.isObject = function(w) {
        var e = d.typeOf(w);
        return e == "object" || e == "array" || e == "function"
    };
    d.getUid = function(e) {
        return e[d.UID_PROPERTY_] || (e[d.UID_PROPERTY_] = ++d.uidCounter_)
    };
    d.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
    d.uidCounter_ = 0;
    Object.prototype.clone;
    d.bindNative_ = function(e, x, w) {
        return (e.call.apply(e.bind, arguments))
    };
    d.bindJs_ = function(w, z, x) {
        var e = z || d.global;
        if (arguments.length > 2) {
            var y = Array.prototype.slice.call(arguments, 2);
            return function() {
                var A = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(A, y);
                return w.apply(e, A)
            }
        } else {
            return function() {
                return w.apply(e, arguments)
            }
        }
    };
    d.bind = function(e, x, w) {
        if (Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1) {
            d.bind = d.bindNative_
        } else {
            d.bind = d.bindJs_
        }
        return d.bind.apply(i, arguments)
    };
    d.partial = function(w, x) {
        var e = Array.prototype.slice.call(arguments, 1);
        return function() {
            var y = Array.prototype.slice.call(arguments);
            y.unshift.apply(y, e);
            return w.apply(this, y)
        }
    };
    d.now = Date.now || (function() {
        return +new Date()
    });
    d.inherits = function(w, e) {
        function x() {}
        x.prototype = e.prototype;
        w.superClass_ = e.prototype;
        w.prototype = new x();
        w.prototype.constructor = w
    };
    d.base = function(z, e, B) {
        var x = arguments.callee.caller;
        if (x.superClass_) {
            return x.superClass_.constructor.apply(z, Array.prototype.slice.call(arguments, 1))
        }
        var w = Array.prototype.slice.call(arguments, 2);
        var A = c;
        for (var y = z.constructor; y; y = y.superClass_ && y.superClass_.constructor) {
            if (y.prototype[e] === x) {
                A = u
            } else {
                if (A) {
                    return y.prototype[e].apply(z, w)
                }
            }
        }
        if (z[e] === x) {
            return z.constructor.prototype[e].apply(z, w)
        } else {
            throw Error("goog.base called from a method of one name to a method of a different name")
        }
    };
    d.provide("goog.string");
    d.provide("goog.string.Unicode");
    d.string.Unicode = {
        NBSP: "\xa0"
    };
    d.string.startsWith = function(w, e) {
        return w.lastIndexOf(e, 0) == 0
    };
    d.string.isEmpty = function(e) {
        return /^[\s\xa0]*$/.test(e)
    };
    d.string.stripNewlines = function(e) {
        return e.replace(/ ?(\r\n|\r|\n)+/g, " ")
    };
    d.string.canonicalizeNewlines = function(e) {
        return e.replace(/(\r\n|\r|\n)/g, "\n")
    };
    d.string.trim = function(e) {
        return e.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    };
    d.string.htmlEscape = function(w, e) {
        if (e) {
            return w.replace(d.string.amperRe_, "&amp;").replace(d.string.ltRe_, "&lt;").replace(d.string.gtRe_, "&gt;").replace(d.string.quotRe_, "&quot;")
        } else {
            if (!d.string.allRe_.test(w)) {
                return w
            }
            if (w.indexOf("&") != -1) {
                w = w.replace(d.string.amperRe_, "&amp;")
            }
            if (w.indexOf("<") != -1) {
                w = w.replace(d.string.ltRe_, "&lt;")
            }
            if (w.indexOf(">") != -1) {
                w = w.replace(d.string.gtRe_, "&gt;")
            }
            if (w.indexOf('"') != -1) {
                w = w.replace(d.string.quotRe_, "&quot;")
            }
            return w
        }
    };
    d.string.amperRe_ = /&/g;
    d.string.ltRe_ = /</g;
    d.string.gtRe_ = />/g;
    d.string.quotRe_ = /\"/g;
    d.string.allRe_ = /[&<>\"]/;
    d.string.contains = function(w, e) {
        return w.indexOf(e) != -1
    };
    d.string.buildString = function(e) {
        return Array.prototype.join.call(arguments, "")
    };
    d.string.compareVersions = function(w, J) {
        var x = 0;
        var E = d.string.trim(String(w)).split(".");
        var D = d.string.trim(String(J)).split(".");
        var A = Math.max(E.length, D.length);
        for (var B = 0; x == 0 && B < A; B++) {
            var e = E[B] || "";
            var I = D[B] || "";
            var F = new RegExp("(\\d*)(\\D*)", "g");
            var z = new RegExp("(\\d*)(\\D*)", "g");
            do {
                var H = F.exec(e) || ["", "", ""];
                var G = z.exec(I) || ["", "", ""];
                if (H[0].length == 0 && G[0].length == 0) {
                    break
                }
                var C = H[1].length == 0 ? 0 : parseInt(H[1], 10);
                var y = G[1].length == 0 ? 0 : parseInt(G[1], 10);
                x = d.string.compareElements_(C, y) || d.string.compareElements_(H[2].length == 0, G[2].length == 0) || d.string.compareElements_(H[2], G[2])
            } while (x == 0)
        }
        return x
    };
    d.string.compareElements_ = function(w, e) {
        if (w < e) {
            return -1
        } else {
            if (w > e) {
                return 1
            }
        }
        return 0
    };
    d.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
    d.string.createUniqueString = function() {
        return "goog_" + d.string.uniqueStringCounter_++
    };
    d.provide("goog.userAgent");
    d.userAgent.ASSUME_IE = c;
    d.userAgent.ASSUME_GECKO = c;
    d.userAgent.ASSUME_WEBKIT = c;
    d.userAgent.ASSUME_MOBILE_WEBKIT = c;
    d.userAgent.ASSUME_OPERA = c;
    d.userAgent.ASSUME_ANY_VERSION = c;
    d.userAgent.BROWSER_KNOWN_ = d.userAgent.ASSUME_IE || d.userAgent.ASSUME_GECKO || d.userAgent.ASSUME_MOBILE_WEBKIT || d.userAgent.ASSUME_WEBKIT || d.userAgent.ASSUME_OPERA;
    d.userAgent.getUserAgentString = function() {
        return d.global.navigator ? d.global.navigator.userAgent : i
    };
    d.userAgent.getNavigator = function() {
        return d.global.navigator
    };
    d.userAgent.init_ = function() {
        d.userAgent.detectedOpera_ = c;
        d.userAgent.detectedIe_ = c;
        d.userAgent.detectedWebkit_ = c;
        d.userAgent.detectedMobile_ = c;
        d.userAgent.detectedGecko_ = c;
        var w;
        if (!d.userAgent.BROWSER_KNOWN_ && (w = d.userAgent.getUserAgentString())) {
            var e = d.userAgent.getNavigator();
            d.userAgent.detectedOpera_ = d.string.startsWith(w, "Opera");
            d.userAgent.detectedIe_ = !d.userAgent.detectedOpera_ && (d.string.contains(w, "MSIE") || d.string.contains(w, "Trident"));
            d.userAgent.detectedWebkit_ = !d.userAgent.detectedOpera_ && d.string.contains(w, "WebKit");
            d.userAgent.detectedMobile_ = d.userAgent.detectedWebkit_ && d.string.contains(w, "Mobile");
            d.userAgent.detectedGecko_ = !d.userAgent.detectedOpera_ && !d.userAgent.detectedWebkit_ && !d.userAgent.detectedIe_ && e.product == "Gecko"
        }
    };
    if (!d.userAgent.BROWSER_KNOWN_) {
        d.userAgent.init_()
    }
    d.userAgent.OPERA = d.userAgent.BROWSER_KNOWN_ ? d.userAgent.ASSUME_OPERA : d.userAgent.detectedOpera_;
    d.userAgent.IE = d.userAgent.BROWSER_KNOWN_ ? d.userAgent.ASSUME_IE : d.userAgent.detectedIe_;
    d.userAgent.GECKO = d.userAgent.BROWSER_KNOWN_ ? d.userAgent.ASSUME_GECKO : d.userAgent.detectedGecko_;
    d.userAgent.WEBKIT = d.userAgent.BROWSER_KNOWN_ ? d.userAgent.ASSUME_WEBKIT || d.userAgent.ASSUME_MOBILE_WEBKIT : d.userAgent.detectedWebkit_;
    d.userAgent.MOBILE = d.userAgent.ASSUME_MOBILE_WEBKIT || d.userAgent.detectedMobile_;
    d.userAgent.SAFARI = d.userAgent.WEBKIT;
    d.userAgent.determinePlatform_ = function() {
        var e = d.userAgent.getNavigator();
        return e && e.platform || ""
    };
    d.userAgent.PLATFORM = d.userAgent.determinePlatform_();
    d.userAgent.ASSUME_MAC = c;
    d.userAgent.ASSUME_WINDOWS = c;
    d.userAgent.ASSUME_LINUX = c;
    d.userAgent.ASSUME_X11 = c;
    d.userAgent.PLATFORM_KNOWN_ = d.userAgent.ASSUME_MAC || d.userAgent.ASSUME_WINDOWS || d.userAgent.ASSUME_LINUX || d.userAgent.ASSUME_X11;
    d.userAgent.initPlatform_ = function() {
        d.userAgent.detectedMac_ = d.string.contains(d.userAgent.PLATFORM, "Mac");
        d.userAgent.detectedWindows_ = d.string.contains(d.userAgent.PLATFORM, "Win");
        d.userAgent.detectedLinux_ = d.string.contains(d.userAgent.PLATFORM, "Linux");
        d.userAgent.detectedX11_ = !!d.userAgent.getNavigator() && d.string.contains(d.userAgent.getNavigator()["appVersion"] || "", "X11")
    };
    if (!d.userAgent.PLATFORM_KNOWN_) {
        d.userAgent.initPlatform_()
    }
    d.userAgent.MAC = d.userAgent.PLATFORM_KNOWN_ ? d.userAgent.ASSUME_MAC : d.userAgent.detectedMac_;
    d.userAgent.WINDOWS = d.userAgent.PLATFORM_KNOWN_ ? d.userAgent.ASSUME_WINDOWS : d.userAgent.detectedWindows_;
    d.userAgent.LINUX = d.userAgent.PLATFORM_KNOWN_ ? d.userAgent.ASSUME_LINUX : d.userAgent.detectedLinux_;
    d.userAgent.X11 = d.userAgent.PLATFORM_KNOWN_ ? d.userAgent.ASSUME_X11 : d.userAgent.detectedX11_;
    d.userAgent.determineVersion_ = function() {
        var w = "",
            z;
        if (d.userAgent.OPERA && d.global.opera) {
            var y = d.global.opera.version;
            w = typeof y == "function" ? y() : y
        } else {
            if (d.userAgent.GECKO) {
                z = /rv\:([^\);]+)(\)|;)/
            } else {
                if (d.userAgent.IE) {
                    z = /MSIE\s+([^\);]+)(\)|;)/
                } else {
                    if (d.userAgent.WEBKIT) {
                        z = /WebKit\/(\S+)/
                    }
                }
            }
            if (z) {
                var e = z.exec(d.userAgent.getUserAgentString());
                w = e ? e[1] : ""
            }
        }
        if (d.userAgent.IE) {
            var x = d.userAgent.getDocumentMode_();
            if (x > parseFloat(w)) {
                return String(x)
            }
        }
        return w
    };
    d.userAgent.getDocumentMode_ = function() {
        var e = d.global.document;
        return e ? e.documentMode : q
    };
    d.userAgent.VERSION = d.userAgent.determineVersion_();
    d.userAgent.compare = function(w, e) {
        return d.string.compareVersions(w, e)
    };
    d.userAgent.isVersionOrHigherCache_ = {};
    d.userAgent.isVersionOrHigher = function(e) {
        return d.userAgent.ASSUME_ANY_VERSION || d.userAgent.isVersionOrHigherCache_[e] || (d.userAgent.isVersionOrHigherCache_[e] = d.string.compareVersions(d.userAgent.VERSION, e) >= 0)
    };
    d.userAgent.isVersion = d.userAgent.isVersionOrHigher;
    d.userAgent.isDocumentModeCache_ = {};
    d.userAgent.isDocumentModeOrHigher = function(e) {
        return d.userAgent.IE && d.userAgent.DOCUMENT_MODE >= e
    };
    d.userAgent.isDocumentMode = d.userAgent.isDocumentModeOrHigher;
    d.userAgent.DOCUMENT_MODE = (function() {
        var e = d.global.document;
        if (!e || !d.userAgent.IE) {
            return undefined
        }
        var w = d.userAgent.getDocumentMode_();
        return w || (e.compatMode == "CSS1Compat" ? parseInt(d.userAgent.VERSION, 10) : 5)
    })();
    d.provide("goog.array");
    d.provide("goog.array.ArrayLike");
    d.NATIVE_ARRAY_PROTOTYPES = u;
    d.array.ArrayLike;
    d.array.peek = function(e) {
        return e[e.length - 1]
    };
    d.array.ARRAY_PROTOTYPE_ = Array.prototype;
    d.array.indexOf = d.NATIVE_ARRAY_PROTOTYPES && d.array.ARRAY_PROTOTYPE_.indexOf ? function(e, x, w) {
        return d.array.ARRAY_PROTOTYPE_.indexOf.call(e, x, w)
    } : function(e, z, w) {
        var y = w == i ? 0 : (w < 0 ? Math.max(0, e.length + w) : w);
        if (d.isString(e)) {
            if (!d.isString(z) || z.length != 1) {
                return -1
            }
            return e.indexOf(z, y)
        }
        for (var x = y; x < e.length; x++) {
            if (x in e && e[x] === z) {
                return x
            }
        }
        return -1
    };
    d.array.forEach = d.NATIVE_ARRAY_PROTOTYPES && d.array.ARRAY_PROTOTYPE_.forEach ? function(e, x, w) {
        d.array.ARRAY_PROTOTYPE_.forEach.call(e, x, w)
    } : function(e, A, z) {
        var w = e.length;
        var x = d.isString(e) ? e.split("") : e;
        for (var y = 0; y < w; y++) {
            if (y in x) {
                A.call(z, x[y], y, e)
            }
        }
    };
    d.array.forEachRight = function(e, A, z) {
        var w = e.length;
        var x = d.isString(e) ? e.split("") : e;
        for (var y = w - 1; y >= 0; --y) {
            if (y in x) {
                A.call(z, x[y], y, e)
            }
        }
    };
    d.array.filter = d.NATIVE_ARRAY_PROTOTYPES && d.array.ARRAY_PROTOTYPE_.filter ? function(e, x, w) {
        return d.array.ARRAY_PROTOTYPE_.filter.call(e, x, w)
    } : function(z, A, e) {
        var x = z.length;
        var B = [];
        var D = 0;
        var C = d.isString(z) ? z.split("") : z;
        for (var y = 0; y < x; y++) {
            if (y in C) {
                var w = C[y];
                if (A.call(e, w, y, z)) {
                    B[D++] = w
                }
            }
        }
        return B
    };
    d.array.map = d.NATIVE_ARRAY_PROTOTYPES && d.array.ARRAY_PROTOTYPE_.map ? function(e, x, w) {
        return d.array.ARRAY_PROTOTYPE_.map.call(e, x, w)
    } : function(e, B, A) {
        var w = e.length;
        var z = new Array(w);
        var x = d.isString(e) ? e.split("") : e;
        for (var y = 0; y < w; y++) {
            if (y in x) {
                z[y] = B.call(A, x[y], y, e)
            }
        }
        return z
    };
    d.array.some = d.NATIVE_ARRAY_PROTOTYPES && d.array.ARRAY_PROTOTYPE_.some ? function(e, x, w) {
        return d.array.ARRAY_PROTOTYPE_.some.call(e, x, w)
    } : function(e, A, z) {
        var w = e.length;
        var x = d.isString(e) ? e.split("") : e;
        for (var y = 0; y < w; y++) {
            if (y in x && A.call(z, x[y], y, e)) {
                return u
            }
        }
        return c
    };
    d.array.every = d.NATIVE_ARRAY_PROTOTYPES && d.array.ARRAY_PROTOTYPE_.every ? function(e, x, w) {
        return d.array.ARRAY_PROTOTYPE_.every.call(e, x, w)
    } : function(e, A, z) {
        var w = e.length;
        var x = d.isString(e) ? e.split("") : e;
        for (var y = 0; y < w; y++) {
            if (y in x && !A.call(z, x[y], y, e)) {
                return c
            }
        }
        return u
    };
    d.array.contains = function(e, w) {
        return d.array.indexOf(e, w) >= 0
    };
    d.array.isEmpty = function(e) {
        return e.length == 0
    };
    d.array.clear = function(e) {
        if (!d.isArray(e)) {
            for (var w = e.length - 1; w >= 0; w--) {
                delete e[w]
            }
        }
        e.length = 0
    };
    d.array.insertAt = function(e, x, w) {
        d.array.splice(e, w, 0, x)
    };
    d.array.remove = function(e, x) {
        var w = d.array.indexOf(e, x);
        var y;
        if ((y = w >= 0)) {
            d.array.removeAt(e, w)
        }
        return y
    };
    d.array.removeAt = function(e, w) {
        return d.array.ARRAY_PROTOTYPE_.splice.call(e, w, 1).length == 1
    };
    d.array.concat = function(e) {
        return d.array.ARRAY_PROTOTYPE_.concat.apply(d.array.ARRAY_PROTOTYPE_, arguments)
    };
    d.array.clone = function(w) {
        if (d.isArray(w)) {
            return d.array.concat((w))
        } else {
            var y = [];
            for (var x = 0, e = w.length; x < e; x++) {
                y[x] = w[x]
            }
            return y
        }
    };
    d.array.toArray = function(e) {
        if (d.isArray(e)) {
            return d.array.concat((e))
        }
        return d.array.clone((e))
    };
    d.array.splice = function(e, w, x, y) {
        return d.array.ARRAY_PROTOTYPE_.splice.apply(e, d.array.slice(arguments, 1))
    };
    d.array.slice = function(w, x, e) {
        if (arguments.length <= 2) {
            return d.array.ARRAY_PROTOTYPE_.slice.call(w, x)
        } else {
            return d.array.ARRAY_PROTOTYPE_.slice.call(w, x, e)
        }
    };
    d.array.sort = function(e, w) {
        d.array.ARRAY_PROTOTYPE_.sort.call(e, w || d.array.defaultCompare)
    };
    d.array.equals = function(x, w, A) {
        if (!d.isArrayLike(x) || !d.isArrayLike(w) || x.length != w.length) {
            return c
        }
        var e = x.length;
        var z = A || d.array.defaultCompareEquality;
        for (var y = 0; y < e; y++) {
            if (!z(x[y], w[y])) {
                return c
            }
        }
        return u
    };
    d.array.compare = function(w, e, x) {
        return d.array.equals(w, e, x)
    };
    d.array.defaultCompare = function(w, e) {
        return w > e ? 1 : w < e ? -1 : 0
    };
    d.array.defaultCompareEquality = function(w, e) {
        return w === e
    };
    d.array.repeat = function(w, y) {
        var x = [];
        for (var e = 0; e < y; e++) {
            x[e] = w
        }
        return x
    };
    d.provide("goog.dom.classes");
    d.dom.classes.get = function(e) {
        var w = e.className;
        return w && typeof w.split == "function" ? w.split(/\s+/) : []
    };
    d.dom.classes.add = function(y, z) {
        var x = d.dom.classes.get(y);
        var w = d.array.slice(arguments, 1);
        var e = d.dom.classes.add_(x, w);
        y.className = x.join(" ");
        return e
    };
    d.dom.classes.add_ = function(x, e) {
        var y = 0;
        for (var w = 0; w < e.length; w++) {
            if (!d.array.contains(x, e[w])) {
                x.push(e[w]);
                y++
            }
        }
        return y == e.length
    };
    d.provide("goog.object");
    d.object.forEach = function(y, x, w) {
        for (var e in y) {
            x.call(w, y[e], e, y)
        }
    };
    d.object.filter = function(z, y, x) {
        var w = {};
        for (var e in z) {
            if (y.call(x, z[e], e, z)) {
                w[e] = z[e]
            }
        }
        return w
    };
    d.object.map = function(z, y, x) {
        var w = {};
        for (var e in z) {
            w[e] = y.call(x, z[e], e, z)
        }
        return w
    };
    d.object.every = function(y, x, w) {
        for (var e in y) {
            if (!x.call(w, y[e], e, y)) {
                return c
            }
        }
        return u
    };
    d.object.getCount = function(w) {
        var x = 0;
        for (var e in w) {
            x++
        }
        return x
    };
    d.object.contains = function(e, w) {
        return d.object.containsValue(e, w)
    };
    d.object.getValues = function(y) {
        var x = [];
        var w = 0;
        for (var e in y) {
            x[w++] = y[e]
        }
        return x
    };
    d.object.getKeys = function(y) {
        var x = [];
        var w = 0;
        for (var e in y) {
            x[w++] = e
        }
        return x
    };
    d.object.containsValue = function(w, x) {
        for (var e in w) {
            if (w[e] == x) {
                return u
            }
        }
        return c
    };
    d.object.isEmpty = function(w) {
        for (var e in w) {
            return c
        }
        return u
    };
    d.object.clear = function(w) {
        for (var e in w) {
            delete w[e]
        }
    };
    d.object.remove = function(w, e) {
        var x;
        if ((x = e in w)) {
            delete w[e]
        }
        return x
    };
    d.object.add = function(w, e, x) {
        if (e in w) {
            throw Error('The object already contains the key "' + e + '"')
        }
        d.object.set(w, e, x)
    };
    d.object.get = function(x, e, w) {
        if (e in x) {
            return x[e]
        }
        return w
    };
    d.object.set = function(x, e, w) {
        x[e] = w
    };
    d.object.clone = function(x) {
        var w = {};
        for (var e in x) {
            w[e] = x[e]
        }
        return w
    };
    d.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    d.object.extend = function(z, A) {
        var x, y;
        for (var w = 1; w < arguments.length; w++) {
            y = arguments[w];
            for (x in y) {
                z[x] = y[x]
            }
            for (var e = 0; e < d.object.PROTOTYPE_FIELDS_.length; e++) {
                x = d.object.PROTOTYPE_FIELDS_[e];
                if (Object.prototype.hasOwnProperty.call(y, x)) {
                    z[x] = y[x]
                }
            }
        }
    };
    d.object.create = function(w) {
        var y = arguments.length;
        if (y == 1 && d.isArray(arguments[0])) {
            return d.object.create.apply(i, arguments[0])
        }
        if (y % 2) {
            throw Error("Uneven number of arguments")
        }
        var x = {};
        for (var e = 0; e < y; e += 2) {
            x[arguments[e]] = arguments[e + 1]
        }
        return x
    };
    d.provide("goog.dom.TagName");
    d.dom.TagName = {
        A: "A",
        ABBR: "ABBR",
        ACRONYM: "ACRONYM",
        ADDRESS: "ADDRESS",
        APPLET: "APPLET",
        AREA: "AREA",
        B: "B",
        BASE: "BASE",
        BASEFONT: "BASEFONT",
        BDO: "BDO",
        BIG: "BIG",
        BLOCKQUOTE: "BLOCKQUOTE",
        BODY: "BODY",
        BR: "BR",
        BUTTON: "BUTTON",
        CANVAS: "CANVAS",
        CAPTION: "CAPTION",
        CENTER: "CENTER",
        CITE: "CITE",
        CODE: "CODE",
        COL: "COL",
        COLGROUP: "COLGROUP",
        DD: "DD",
        DEL: "DEL",
        DFN: "DFN",
        DIR: "DIR",
        DIV: "DIV",
        DL: "DL",
        DT: "DT",
        EM: "EM",
        FIELDSET: "FIELDSET",
        FONT: "FONT",
        FORM: "FORM",
        FRAME: "FRAME",
        FRAMESET: "FRAMESET",
        H1: "H1",
        H2: "H2",
        H3: "H3",
        H4: "H4",
        H5: "H5",
        H6: "H6",
        HEAD: "HEAD",
        HR: "HR",
        HTML: "HTML",
        I: "I",
        IFRAME: "IFRAME",
        IMG: "IMG",
        INPUT: "INPUT",
        INS: "INS",
        ISINDEX: "ISINDEX",
        KBD: "KBD",
        LABEL: "LABEL",
        LEGEND: "LEGEND",
        LI: "LI",
        LINK: "LINK",
        MAP: "MAP",
        MENU: "MENU",
        META: "META",
        NOFRAMES: "NOFRAMES",
        NOSCRIPT: "NOSCRIPT",
        OBJECT: "OBJECT",
        OL: "OL",
        OPTGROUP: "OPTGROUP",
        OPTION: "OPTION",
        P: "P",
        PARAM: "PARAM",
        PRE: "PRE",
        Q: "Q",
        S: "S",
        SAMP: "SAMP",
        SCRIPT: "SCRIPT",
        SELECT: "SELECT",
        SMALL: "SMALL",
        SPAN: "SPAN",
        STRIKE: "STRIKE",
        STRONG: "STRONG",
        STYLE: "STYLE",
        SUB: "SUB",
        SUP: "SUP",
        TABLE: "TABLE",
        TBODY: "TBODY",
        TD: "TD",
        TEXTAREA: "TEXTAREA",
        TFOOT: "TFOOT",
        TH: "TH",
        THEAD: "THEAD",
        TITLE: "TITLE",
        TR: "TR",
        TT: "TT",
        U: "U",
        UL: "UL",
        VAR: "VAR"
    };
    d.provide("goog.math.Size");
    d.math.Size = function(w, e) {
        this.width = w;
        this.height = e
    };
    d.math.Size.equals = function(w, e) {
        if (w == e) {
            return u
        }
        if (!w || !e) {
            return c
        }
        return w.width == e.width && w.height == e.height
    };
    d.math.Size.prototype.clone = function() {
        return new d.math.Size(this.width, this.height)
    };
    d.math.Size.prototype.area = function() {
        return this.width * this.height
    };
    d.math.Size.prototype.isEmpty = function() {
        return !this.area()
    };
    d.provide("goog.dom.BrowserFeature");
    d.dom.BrowserFeature = {
        CAN_ADD_NAME_OR_TYPE_ATTRIBUTES: !d.userAgent.IE || d.userAgent.isVersion("9"),
        CAN_USE_CHILDREN_ATTRIBUTE: !d.userAgent.GECKO && !d.userAgent.IE || d.userAgent.IE && d.userAgent.isVersion("9") || d.userAgent.GECKO && d.userAgent.isVersion("1.9.1"),
        CAN_USE_INNER_TEXT: d.userAgent.IE && !d.userAgent.isVersion("9"),
        INNER_HTML_NEEDS_SCOPED_ELEMENT: d.userAgent.IE
    };
    d.provide("goog.math.Coordinate");
    d.math.Coordinate = function(w, e) {
        this.x = d.isDef(w) ? w : 0;
        this.y = d.isDef(e) ? e : 0
    };
    d.math.Coordinate.prototype.clone = function() {
        return new d.math.Coordinate(this.x, this.y)
    };
    d.math.Coordinate.equals = function(w, e) {
        if (w == e) {
            return u
        }
        if (!w || !e) {
            return c
        }
        return w.x == e.x && w.y == e.y
    };
    d.provide("goog.dom");
    d.provide("goog.dom.DomHelper");
    d.provide("goog.dom.NodeType");
    d.dom.ASSUME_QUIRKS_MODE = c;
    d.dom.ASSUME_STANDARDS_MODE = c;
    d.dom.COMPAT_MODE_KNOWN_ = d.dom.ASSUME_QUIRKS_MODE || d.dom.ASSUME_STANDARDS_MODE;
    d.dom.NodeType = {
        ELEMENT: 1,
        ATTRIBUTE: 2,
        TEXT: 3,
        CDATA_SECTION: 4,
        ENTITY_REFERENCE: 5,
        ENTITY: 6,
        PROCESSING_INSTRUCTION: 7,
        COMMENT: 8,
        DOCUMENT: 9,
        DOCUMENT_TYPE: 10,
        DOCUMENT_FRAGMENT: 11,
        NOTATION: 12
    };
    d.dom.getDomHelper = function(e) {
        return e ? new d.dom.DomHelper(d.dom.getOwnerDocument(e)) : (d.dom.defaultDomHelper_ || (d.dom.defaultDomHelper_ = new d.dom.DomHelper()))
    };
    d.dom.defaultDomHelper_;
    d.dom.getDocument = function() {
        return document
    };
    d.dom.getElement = function(e) {
        return d.isString(e) ? b.getElementById(e) : e
    };
    d.dom.$ = d.dom.getElement;
    d.dom.getElementsByTagNameAndClass = function(x, e, w) {
        return d.dom.getElementsByTagNameAndClass_(document, x, e, w)
    };
    d.dom.getElementsByClass = function(x, w) {
        var e = w || document;
        if (d.dom.canUseQuerySelector_(e)) {
            return e.querySelectorAll("." + x)
        } else {
            if (e.getElementsByClassName) {
                return e.getElementsByClassName(x)
            }
        }
        return d.dom.getElementsByTagNameAndClass_(document, "*", x, w)
    };
    d.dom.getElementByClass = function(x, w) {
        var e = w || document;
        var y = i;
        if (d.dom.canUseQuerySelector_(e)) {
            y = e.querySelector("." + x)
        } else {
            y = d.dom.getElementsByClass(x, w)[0]
        }
        return y || i
    };
    d.dom.canUseQuerySelector_ = function(e) {
        return e.querySelectorAll && e.querySelector && (!d.userAgent.WEBKIT || d.dom.isCss1CompatMode_(document) || d.userAgent.isVersion("528"))
    };
    d.dom.getElementsByTagNameAndClass_ = function(E, D, x, G) {
        var F = G || E;
        var w = (D && D != "*") ? D.toUpperCase() : "";
        if (d.dom.canUseQuerySelector_(F) && (w || x)) {
            var C = w + (x ? "." + x : "");
            return F.querySelectorAll(C)
        }
        if (x && F.getElementsByClassName) {
            var y = F.getElementsByClassName(x);
            if (w) {
                var H = {};
                var A = 0;
                for (var z = 0, e; e = y[z]; z++) {
                    if (w == e.nodeName) {
                        H[A++] = e
                    }
                }
                H.length = A;
                return H
            } else {
                return y
            }
        }
        var y = F.getElementsByTagName(w || "*");
        if (x) {
            var H = {};
            var A = 0;
            for (var z = 0, e; e = y[z]; z++) {
                var B = e.className;
                if (typeof B.split == "function" && d.array.contains(B.split(/\s+/), x)) {
                    H[A++] = e
                }
            }
            H.length = A;
            return H
        } else {
            return y
        }
    };
    d.dom.$$ = d.dom.getElementsByTagNameAndClass;
    d.dom.setProperties = function(w, e) {
        d.object.forEach(e, function(y, x) {
            if (x == "style") {
                w.style.cssText = y
            } else {
                if (x == "class") {
                    w.className = y
                } else {
                    if (x == "for") {
                        w.htmlFor = y
                    } else {
                        if (x in d.dom.DIRECT_ATTRIBUTE_MAP_) {
                            w.setAttribute(d.dom.DIRECT_ATTRIBUTE_MAP_[x], y)
                        } else {
                            w[x] = y
                        }
                    }
                }
            }
        })
    };
    d.dom.DIRECT_ATTRIBUTE_MAP_ = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        height: "height",
        width: "width",
        usemap: "useMap",
        frameborder: "frameBorder",
        maxlength: "maxLength",
        type: "type"
    };
    d.dom.getViewportSize = function(e) {
        return d.dom.getViewportSize_(e || window)
    };
    d.dom.getViewportSize_ = function(z) {
        var y = z.document;
        if (d.userAgent.WEBKIT && !d.userAgent.isVersion("500") && !d.userAgent.MOBILE) {
            if (typeof z.innerHeight == q + "") {
                z = window
            }
            var x = z.innerHeight;
            var w = z.document.documentElement.scrollHeight;
            if (z == z.top) {
                if (w < x) {
                    x -= 15
                }
            }
            return new d.math.Size(z.innerWidth, x)
        }
        var e = d.dom.isCss1CompatMode_(y) ? y.documentElement : y.body;
        return new d.math.Size(e.clientWidth, e.clientHeight)
    };
    d.dom.getWindow = function(e) {
        return e ? d.dom.getWindow_(e) : window
    };
    d.dom.getWindow_ = function(e) {
        return e.parentWindow || e.defaultView
    };
    d.dom.createDom = function(w, e, x) {
        return d.dom.createDom_(document, arguments)
    };
    d.dom.createDom_ = function(z, w) {
        var y = w[0];
        var e = w[1];
        if (!d.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && e && (e.name || e.type)) {
            var B = ["<", y];
            if (e.name) {
                B.push(' name="', d.string.htmlEscape(e.name), '"')
            }
            if (e.type) {
                B.push(' type="', d.string.htmlEscape(e.type), '"');
                var A = {};
                d.object.extend(A, e);
                e = A;
                delete e.type
            }
            B.push(">");
            y = B.join("")
        }
        var x = z.createElement(y);
        if (e) {
            if (d.isString(e)) {
                x.className = e
            } else {
                if (d.isArray(e)) {
                    d.dom.classes.add.apply(i, [x].concat(e))
                } else {
                    d.dom.setProperties(x, e)
                }
            }
        }
        if (w.length > 2) {
            d.dom.append_(z, x, w, 2)
        }
        return x
    };
    d.dom.append_ = function(A, z, w, B) {
        function y(C) {
            if (C) {
                z.appendChild(d.isString(C) ? A.createTextNode(C) : C)
            }
        }
        for (var x = B; x < w.length; x++) {
            var e = w[x];
            if (d.isArrayLike(e) && !d.dom.isNodeLike(e)) {
                d.array.forEach(d.dom.isNodeList(e) ? d.array.clone(e) : e, y)
            } else {
                y(e)
            }
        }
    };
    d.dom.$dom = d.dom.createDom;
    d.dom.createElement = function(e) {
        return b.createElement(e)
    };
    d.dom.createTextNode = function(e) {
        return b.createTextNode(e)
    };
    d.dom.isCss1CompatMode_ = function(e) {
        if (d.dom.COMPAT_MODE_KNOWN_) {
            return d.dom.ASSUME_STANDARDS_MODE
        }
        return e.compatMode == "CSS1Compat"
    };
    d.dom.canHaveChildren_OLD = function(e) {
        if (e.nodeType != d.dom.NodeType.ELEMENT) {
            return c
        }
        switch (e.tagName) {
            case d.dom.TagName.APPLET:
            case d.dom.TagName.AREA:
            case d.dom.TagName.BASE:
            case d.dom.TagName.BR:
            case d.dom.TagName.COL:
            case d.dom.TagName.FRAME:
            case d.dom.TagName.HR:
            case d.dom.TagName.IMG:
            case d.dom.TagName.INPUT:
            case d.dom.TagName.IFRAME:
            case d.dom.TagName.ISINDEX:
            case d.dom.TagName.LINK:
            case d.dom.TagName.NOFRAMES:
            case d.dom.TagName.NOSCRIPT:
            case d.dom.TagName.META:
            case d.dom.TagName.OBJECT:
            case d.dom.TagName.PARAM:
            case d.dom.TagName.SCRIPT:
            case d.dom.TagName.STYLE:
                return c
        }
        return u
    };
    d.dom.TAGS_CANT_HAVE_CHILDREN = {
        APPLET: u,
        AREA: u,
        BASE: u,
        BR: u,
        COL: u,
        FRAME: u,
        HR: u,
        IMG: u,
        INPUT: u,
        IFRAME: u,
        ISINDEX: u,
        LINK: u,
        NOFRAMES: u,
        NOSCRIPT: u,
        META: u,
        OBJECT: u,
        PARAM: u,
        SCRIPT: u,
        STYLE: u
    };
    d.dom.canHaveChildren = function(e) {
        return e.nodeType == d.dom.NodeType.ELEMENT && !d.dom.TAGS_CANT_HAVE_CHILDREN[e.tagName]
    };
    d.dom.appendChild = function(e, w) {
        e.appendChild(w)
    };
    d.dom.append = function(e, w) {
        d.dom.append_(d.dom.getOwnerDocument(e), e, arguments, 1)
    };
    d.dom.removeChildren = function(e) {
        var w;
        while ((w = e.firstChild)) {
            e.removeChild(w)
        }
    };
    d.dom.insertSiblingBefore = function(w, e) {
        if (e.parentNode) {
            e.parentNode.insertBefore(w, e)
        }
    };
    d.dom.insertSiblingAfter = function(w, e) {
        if (e.parentNode) {
            e.parentNode.insertBefore(w, e.nextSibling)
        }
    };
    d.dom.removeNode = function(e) {
        return e && e.parentNode ? e.parentNode.removeChild(e) : i
    };
    d.dom.replaceNode = function(e, x) {
        var w = x.parentNode;
        if (w) {
            w.replaceChild(e, x)
        }
    };
    d.dom.flattenElement = function(e) {
        var x, w = e.parentNode;
        if (w && w.nodeType != d.dom.NodeType.DOCUMENT_FRAGMENT) {
            if (e.removeNode) {
                return (e.removeNode(c))
            } else {
                while ((x = e.firstChild)) {
                    w.insertBefore(x, e)
                }
                return (d.dom.removeNode(e))
            }
        }
    };
    d.dom.isNodeLike = function(e) {
        return d.isObject(e) && e.nodeType > 0
    };
    d.dom.contains = function(w, e) {
        if (w.contains && e.nodeType == d.dom.NodeType.ELEMENT) {
            return w == e || w.contains(e)
        }
        if (typeof w.compareDocumentPosition != q + "") {
            return w == e || Boolean(w.compareDocumentPosition(e) & 16)
        }
        while (e && w != e) {
            e = e.parentNode
        }
        return e == w
    };
    d.dom.compareNodeOrder = function(C, B) {
        if (C == B) {
            return 0
        }
        if (C.compareDocumentPosition) {
            return C.compareDocumentPosition(B) & 2 ? 1 : -1
        }
        if ("sourceIndex" in C || (C.parentNode && "sourceIndex" in C.parentNode)) {
            var x = C.nodeType == d.dom.NodeType.ELEMENT;
            var e = B.nodeType == d.dom.NodeType.ELEMENT;
            if (x && e) {
                return C.sourceIndex - B.sourceIndex
            } else {
                var y = C.parentNode;
                var w = B.parentNode;
                if (y == w) {
                    return d.dom.compareSiblingOrder_(C, B)
                }
                if (!x && d.dom.contains(y, B)) {
                    return -1 * d.dom.compareParentsDescendantNodeIe_(C, B)
                }
                if (!e && d.dom.contains(w, C)) {
                    return d.dom.compareParentsDescendantNodeIe_(B, C)
                }
                return (x ? C.sourceIndex : y.sourceIndex) - (e ? B.sourceIndex : w.sourceIndex)
            }
        }
        var z = d.dom.getOwnerDocument(C);
        var D, A;
        D = z.createRange();
        D.selectNode(C);
        D.collapse(u);
        A = z.createRange();
        A.selectNode(B);
        A.collapse(u);
        return D.compareBoundaryPoints(d.global.Range.START_TO_END, A)
    };
    d.dom.compareParentsDescendantNodeIe_ = function(y, x) {
        var w = y.parentNode;
        if (w == x) {
            return -1
        }
        var e = x;
        while (e.parentNode != w) {
            e = e.parentNode
        }
        return d.dom.compareSiblingOrder_(e, y)
    };
    d.dom.compareSiblingOrder_ = function(w, e) {
        var x = e;
        while ((x = x.previousSibling)) {
            if (x == w) {
                return -1
            }
        }
        return 1
    };
    d.dom.findCommonAncestor = function(C) {
        var z, B = arguments.length;
        if (!B) {
            return i
        } else {
            if (B == 1) {
                return arguments[0]
            }
        }
        var D = [];
        var e = Infinity;
        for (z = 0; z < B; z++) {
            var E = [];
            var x = arguments[z];
            while (x) {
                E.unshift(x);
                x = x.parentNode
            }
            D.push(E);
            e = Math.min(e, E.length)
        }
        var w = i;
        for (z = 0; z < e; z++) {
            var A = D[0][z];
            for (var y = 1; y < B; y++) {
                if (A != D[y][z]) {
                    return w
                }
            }
            w = A
        }
        return w
    };
    d.dom.getOwnerDocument = function(e) {
        return (e.nodeType == d.dom.NodeType.DOCUMENT ? e : e.ownerDocument || e.document)
    };
    d.dom.getOuterHtml = function(e) {
        if ("outerHTML" in e) {
            return e.outerHTML
        } else {
            var w = d.dom.getOwnerDocument(e);
            var x = w.createElement("div");
            x.appendChild(e.cloneNode(u));
            return x.innerHTML
        }
    };
    d.dom.TAGS_TO_IGNORE_ = {
        SCRIPT: 1,
        STYLE: 1,
        HEAD: 1,
        IFRAME: 1,
        OBJECT: 1
    };
    d.dom.PREDEFINED_TAG_VALUES_ = {
        IMG: " ",
        BR: "\n"
    };
    d.dom.getTextContent = function(x) {
        var w;
        if (d.dom.BrowserFeature.CAN_USE_INNER_TEXT && ("innerText" in x)) {
            w = d.string.canonicalizeNewlines(x.innerText)
        } else {
            var e = [];
            d.dom.getTextContent_(x, e, u);
            w = e.join("")
        }
        w = w.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
        w = w.replace(/\u200B/g, "");
        if (!d.userAgent.IE) {
            w = w.replace(/ +/g, " ")
        }
        if (w != " ") {
            w = w.replace(/^\s*/, "")
        }
        return w
    };
    d.dom.getRawTextContent = function(w) {
        var e = [];
        d.dom.getTextContent_(w, e, c);
        return e.join("")
    };
    d.dom.getTextContent_ = function(x, w, e) {
        if (x.nodeName in d.dom.TAGS_TO_IGNORE_) {} else {
            if (x.nodeType == d.dom.NodeType.TEXT) {
                if (e) {
                    w.push(String(x.nodeValue).replace(/(\r\n|\r|\n)/g, ""))
                } else {
                    w.push(x.nodeValue)
                }
            } else {
                if (x.nodeName in d.dom.PREDEFINED_TAG_VALUES_) {
                    w.push(d.dom.PREDEFINED_TAG_VALUES_[x.nodeName])
                } else {
                    var y = x.firstChild;
                    while (y) {
                        d.dom.getTextContent_(y, w, e);
                        y = y.nextSibling
                    }
                }
            }
        }
    };
    d.dom.isNodeList = function(e) {
        if (e && typeof e.length == "number") {
            if (d.isObject(e)) {
                return typeof e.item == "function" || typeof e.item == "string"
            } else {
                if (d.isFunction(e)) {
                    return typeof e.item == "function"
                }
            }
        }
        return c
    };
    d.dom.DomHelper = function(e) {
        this.document_ = e || d.global.document || document
    };
    d.dom.DomHelper.prototype.getDomHelper = d.dom.getDomHelper;
    d.dom.DomHelper.prototype.setDocument = function(e) {
        this.document_ = e
    };
    d.dom.DomHelper.prototype.getDocument = function() {
        return this.document_
    };
    d.dom.DomHelper.prototype.getElement = function(e) {
        if (d.isString(e)) {
            return this.document_.getElementById(e)
        } else {
            return e
        }
    };
    d.dom.DomHelper.prototype.$ = d.dom.DomHelper.prototype.getElement;
    d.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(x, e, w) {
        return d.dom.getElementsByTagNameAndClass_(this.document_, x, e, w)
    };
    d.dom.DomHelper.prototype.getElementsByClass = function(w, e) {
        var x = e || this.document_;
        return d.dom.getElementsByClass(w, x)
    };
    d.dom.DomHelper.prototype.getElementByClass = function(w, e) {
        var x = e || this.document_;
        return d.dom.getElementByClass(w, x)
    };
    d.dom.DomHelper.prototype.$$ = d.dom.DomHelper.prototype.getElementsByTagNameAndClass;
    d.dom.DomHelper.prototype.setProperties = d.dom.setProperties;
    d.dom.DomHelper.prototype.getViewportSize = function(e) {
        return d.dom.getViewportSize(e || this.getWindow())
    };
    d.dom.Appendable;
    d.dom.DomHelper.prototype.createDom = function(w, e, x) {
        return d.dom.createDom_(this.document_, arguments)
    };
    d.dom.DomHelper.prototype.$dom = d.dom.DomHelper.prototype.createDom;
    d.dom.DomHelper.prototype.createElement = function(e) {
        return this.document_.createElement(e)
    };
    d.dom.DomHelper.prototype.createTextNode = function(e) {
        return this.document_.createTextNode(e)
    };
    d.dom.DomHelper.prototype.getWindow = function() {
        return d.dom.getWindow_(this.document_)
    };
    d.dom.DomHelper.prototype.appendChild = d.dom.appendChild;
    d.dom.DomHelper.prototype.append = d.dom.append;
    d.dom.DomHelper.prototype.removeChildren = d.dom.removeChildren;
    d.dom.DomHelper.prototype.insertSiblingBefore = d.dom.insertSiblingBefore;
    d.dom.DomHelper.prototype.insertSiblingAfter = d.dom.insertSiblingAfter;
    d.dom.DomHelper.prototype.removeNode = d.dom.removeNode;
    d.dom.DomHelper.prototype.replaceNode = d.dom.replaceNode;
    d.dom.DomHelper.prototype.flattenElement = d.dom.flattenElement;
    d.dom.DomHelper.prototype.isNodeLike = d.dom.isNodeLike;
    d.dom.DomHelper.prototype.contains = d.dom.contains;
    d.dom.DomHelper.prototype.getOwnerDocument = d.dom.getOwnerDocument;
    d.dom.DomHelper.prototype.getTextContent = d.dom.getTextContent;
    d.provide("goog.iter");
    d.provide("goog.iter.Iterator");
    d.provide("goog.iter.StopIteration");
    d.iter.Iterable;
    if ("StopIteration" in d.global) {
        d.iter.StopIteration = d.global.StopIteration
    } else {
        d.iter.StopIteration = Error("StopIteration")
    }
    d.iter.Iterator = function() {};
    d.iter.Iterator.prototype.next = function() {
        throw d.iter.StopIteration
    };
    d.iter.Iterator.prototype.__iterator__ = function(e) {
        return this
    };
    d.iter.toIterator = function(w) {
        if (w instanceof d.iter.Iterator) {
            return w
        }
        if (typeof w.__iterator__ == "function") {
            return w.__iterator__(c)
        }
        if (d.isArrayLike(w)) {
            var e = 0;
            var x = new d.iter.Iterator;
            x.next = function() {
                while (u) {
                    if (e >= w.length) {
                        throw d.iter.StopIteration
                    }
                    if (!(e in w)) {
                        e++;
                        continue
                    }
                    return w[e++]
                }
            };
            return x
        }
        throw Error("Not implemented")
    };
    d.iter.forEach = function(y, x, w) {
        if (d.isArrayLike(y)) {
            try {
                d.array.forEach((y), x, w)
            } catch (e) {
                if (e !== d.iter.StopIteration) {
                    throw e
                }
            }
        } else {
            y = d.iter.toIterator(y);
            try {
                while (u) {
                    x.call(w, y.next(), q, y)
                }
            } catch (e) {
                if (e !== d.iter.StopIteration) {
                    throw e
                }
            }
        }
    };
    d.iter.filter = function(x, w, e) {
        x = d.iter.toIterator(x);
        var y = new d.iter.Iterator;
        y.next = function() {
            while (u) {
                var z = x.next();
                if (w.call(e, z, q, x)) {
                    return z
                }
            }
        };
        return y
    };
    d.iter.join = function(w, e) {
        return d.iter.toArray(w).join(e)
    };
    d.iter.map = function(x, w, e) {
        x = d.iter.toIterator(x);
        var y = new d.iter.Iterator;
        y.next = function() {
            while (u) {
                var z = x.next();
                return w.call(e, z, q, x)
            }
        };
        return y
    };
    d.iter.some = function(y, x, w) {
        y = d.iter.toIterator(y);
        try {
            while (u) {
                if (x.call(w, y.next(), q, y)) {
                    return u
                }
            }
        } catch (e) {
            if (e !== d.iter.StopIteration) {
                throw e
            }
        }
        return c
    };
    d.iter.every = function(y, x, w) {
        y = d.iter.toIterator(y);
        try {
            while (u) {
                if (!x.call(w, y.next(), q, y)) {
                    return c
                }
            }
        } catch (e) {
            if (e !== d.iter.StopIteration) {
                throw e
            }
        }
        return u
    };
    d.iter.toArray = function(e) {
        if (d.isArrayLike(e)) {
            return d.array.toArray((e))
        }
        e = d.iter.toIterator(e);
        var w = [];
        d.iter.forEach(e, function(x) {
            w.push(x)
        });
        return w
    };
    d.iter.equals = function(w, e) {
        w = d.iter.toIterator(w);
        e = d.iter.toIterator(e);
        var y, x;
        try {
            while (u) {
                y = x = c;
                var C = w.next();
                y = u;
                var B = e.next();
                x = u;
                if (C != B) {
                    return c
                }
            }
        } catch (z) {
            if (z !== d.iter.StopIteration) {
                throw z
            } else {
                if (y && !x) {
                    return c
                }
                if (!x) {
                    try {
                        B = e.next();
                        return c
                    } catch (A) {
                        if (A !== d.iter.StopIteration) {
                            throw A
                        }
                        return u
                    }
                }
            }
        }
        return c
    };
    d.provide("goog.dom.TagIterator");
    d.provide("goog.dom.TagWalkType");
    d.dom.TagWalkType = {
        START_TAG: 1,
        OTHER: 0,
        END_TAG: -1
    };
    d.dom.TagIterator = function(z, e, x, y, w) {
        this.reversed = !!e;
        if (z) {
            this.setPosition(z, y)
        }
        this.depth = w != q ? w : this.tagType || 0;
        if (this.reversed) {
            this.depth *= -1
        }
        this.constrained = !x
    };
    d.inherits(d.dom.TagIterator, d.iter.Iterator);
    d.dom.TagIterator.prototype.node = i;
    d.dom.TagIterator.prototype.tagType = d.dom.TagWalkType.OTHER;
    d.dom.TagIterator.prototype.depth;
    d.dom.TagIterator.prototype.reversed;
    d.dom.TagIterator.prototype.constrained;
    d.dom.TagIterator.prototype.started_ = c;
    d.dom.TagIterator.prototype.setPosition = function(w, x, e) {
        this.node = w;
        if (w) {
            if (d.isNumber(x)) {
                this.tagType = x
            } else {
                this.tagType = this.node.nodeType != d.dom.NodeType.ELEMENT ? d.dom.TagWalkType.OTHER : this.reversed ? d.dom.TagWalkType.END_TAG : d.dom.TagWalkType.START_TAG
            }
        }
        if (d.isNumber(e)) {
            this.depth = e
        }
    };
    d.dom.TagIterator.prototype.copyFrom = function(e) {
        this.node = e.node;
        this.tagType = e.tagType;
        this.depth = e.depth;
        this.reversed = e.reversed;
        this.constrained = e.constrained
    };
    d.dom.TagIterator.prototype.clone = function() {
        return new d.dom.TagIterator(this.node, this.reversed, !this.constrained, this.tagType, this.depth)
    };
    d.dom.TagIterator.prototype.skipTag = function() {
        var e = this.reversed ? d.dom.TagWalkType.END_TAG : d.dom.TagWalkType.START_TAG;
        if (this.tagType == e) {
            this.tagType = (e * -1);
            this.depth += this.tagType * (this.reversed ? -1 : 1)
        }
    };
    d.dom.TagIterator.prototype.restartTag = function() {
        var e = this.reversed ? d.dom.TagWalkType.START_TAG : d.dom.TagWalkType.END_TAG;
        if (this.tagType == e) {
            this.tagType = (e * -1);
            this.depth += this.tagType * (this.reversed ? -1 : 1)
        }
    };
    d.dom.TagIterator.prototype.next = function() {
        var x;
        if (this.started_) {
            if (!this.node || this.constrained && this.depth == 0) {
                throw d.iter.StopIteration
            }
            x = this.node;
            var e = this.reversed ? d.dom.TagWalkType.END_TAG : d.dom.TagWalkType.START_TAG;
            if (this.tagType == e) {
                var y = this.reversed ? x.lastChild : x.firstChild;
                if (y) {
                    this.setPosition(y)
                } else {
                    this.setPosition(x, (e * -1))
                }
            } else {
                var w = this.reversed ? x.previousSibling : x.nextSibling;
                if (w && x.parentNode == w.parentNode) {
                    this.setPosition(w)
                } else {
                    this.setPosition(x.parentNode, (e * -1))
                }
            }
            this.depth += this.tagType * (this.reversed ? -1 : 1)
        } else {
            this.started_ = u
        }
        x = this.node;
        if (!this.node) {
            throw d.iter.StopIteration
        }
        return x
    };
    d.dom.TagIterator.prototype.isStarted = function() {
        return this.started_
    };
    d.dom.TagIterator.prototype.isStartTag = function() {
        return this.tagType == d.dom.TagWalkType.START_TAG
    };
    d.dom.TagIterator.prototype.isEndTag = function() {
        return this.tagType == d.dom.TagWalkType.END_TAG
    };
    d.dom.TagIterator.prototype.equals = function(e) {
        return e.node == this.node && (!this.node || e.tagType == this.tagType)
    };
    d.dom.TagIterator.prototype.splice = function(y) {
        var x = this.node;
        this.restartTag();
        this.reversed = !this.reversed;
        d.dom.TagIterator.prototype.next.call(this);
        this.reversed = !this.reversed;
        var e = d.isArrayLike(arguments[0]) ? arguments[0] : arguments;
        for (var w = e.length - 1; w >= 0; w--) {
            d.dom.insertSiblingAfter(e[w], x)
        }
        d.dom.removeNode(x)
    };
    d.provide("goog.structs");
    d.structs.getCount = function(e) {
        if (typeof e.getCount == "function") {
            return e.getCount()
        }
        if (d.isArrayLike(e) || d.isString(e)) {
            return e.length
        }
        return d.object.getCount(e)
    };
    d.structs.getValues = function(w) {
        if (typeof w.getValues == "function") {
            return w.getValues()
        }
        if (d.isString(w)) {
            return w.split("")
        }
        if (d.isArrayLike(w)) {
            var y = [];
            var e = w.length;
            for (var x = 0; x < e; x++) {
                y.push(w[x])
            }
            return y
        }
        return d.object.getValues(w)
    };
    d.structs.getKeys = function(w) {
        if (typeof w.getKeys == "function") {
            return w.getKeys()
        }
        if (typeof w.getValues == "function") {
            return q
        }
        if (d.isArrayLike(w) || d.isString(w)) {
            var y = [];
            var e = w.length;
            for (var x = 0; x < e; x++) {
                y.push(x)
            }
            return y
        }
        return d.object.getKeys(w)
    };
    d.structs.contains = function(e, w) {
        if (typeof e.contains == "function") {
            return e.contains(w)
        }
        if (typeof e.containsValue == "function") {
            return e.containsValue(w)
        }
        if (d.isArrayLike(e) || d.isString(e)) {
            return d.array.contains((e), w)
        }
        return d.object.containsValue(e, w)
    };
    d.structs.isEmpty = function(e) {
        if (typeof e.isEmpty == "function") {
            return e.isEmpty()
        }
        if (d.isArrayLike(e) || d.isString(e)) {
            return d.array.isEmpty((e))
        }
        return d.object.isEmpty(e)
    };
    d.structs.clear = function(e) {
        if (typeof e.clear == "function") {
            e.clear()
        } else {
            if (d.isArrayLike(e)) {
                d.array.clear((e))
            } else {
                d.object.clear(e)
            }
        }
    };
    d.structs.forEach = function(x, B, A) {
        if (typeof x.forEach == "function") {
            x.forEach(B, A)
        } else {
            if (d.isArrayLike(x) || d.isString(x)) {
                d.array.forEach((x), B, A)
            } else {
                var z = d.structs.getKeys(x);
                var w = d.structs.getValues(x);
                var e = w.length;
                for (var y = 0; y < e; y++) {
                    B.call(A, w[y], z && z[y], x)
                }
            }
        }
    };
    d.structs.filter = function(x, B, A) {
        if (typeof x.filter == "function") {
            return x.filter(B, A)
        }
        if (d.isArrayLike(x) || d.isString(x)) {
            return d.array.filter((x), B, A)
        }
        var C;
        var z = d.structs.getKeys(x);
        var w = d.structs.getValues(x);
        var e = w.length;
        if (z) {
            C = {};
            for (var y = 0; y < e; y++) {
                if (B.call(A, w[y], z[y], x)) {
                    C[z[y]] = w[y]
                }
            }
        } else {
            C = [];
            for (var y = 0; y < e; y++) {
                if (B.call(A, w[y], q, x)) {
                    C.push(w[y])
                }
            }
        }
        return C
    };
    d.structs.map = function(x, B, A) {
        if (typeof x.map == "function") {
            return x.map(B, A)
        }
        if (d.isArrayLike(x) || d.isString(x)) {
            return d.array.map((x), B, A)
        }
        var C;
        var z = d.structs.getKeys(x);
        var w = d.structs.getValues(x);
        var e = w.length;
        if (z) {
            C = {};
            for (var y = 0; y < e; y++) {
                C[z[y]] = B.call(A, w[y], z[y], x)
            }
        } else {
            C = [];
            for (var y = 0; y < e; y++) {
                C[y] = B.call(A, w[y], q, x)
            }
        }
        return C
    };
    d.structs.some = function(x, B, A) {
        if (typeof x.some == "function") {
            return x.some(B, A)
        }
        if (d.isArrayLike(x) || d.isString(x)) {
            return d.array.some((x), B, A)
        }
        var z = d.structs.getKeys(x);
        var w = d.structs.getValues(x);
        var e = w.length;
        for (var y = 0; y < e; y++) {
            if (B.call(A, w[y], z && z[y], x)) {
                return u
            }
        }
        return c
    };
    d.structs.every = function(x, B, A) {
        if (typeof x.every == "function") {
            return x.every(B, A)
        }
        if (d.isArrayLike(x) || d.isString(x)) {
            return d.array.every((x), B, A)
        }
        var z = d.structs.getKeys(x);
        var w = d.structs.getValues(x);
        var e = w.length;
        for (var y = 0; y < e; y++) {
            if (!B.call(A, w[y], z && z[y], x)) {
                return c
            }
        }
        return u
    };
    d.provide("goog.structs.Map");
    d.structs.Map = function(w, x) {
        this.map_ = {};
        this.keys_ = [];
        var y = arguments.length;
        if (y > 1) {
            if (y % 2) {
                throw Error("Uneven number of arguments")
            }
            for (var e = 0; e < y; e += 2) {
                this.set(arguments[e], arguments[e + 1])
            }
        } else {
            if (w) {
                this.addAll((w))
            }
        }
    };
    d.structs.Map.prototype.count_ = 0;
    d.structs.Map.prototype.version_ = 0;
    d.structs.Map.prototype.getCount = function() {
        return this.count_
    };
    d.structs.Map.prototype.getValues = function() {
        this.cleanupKeysArray_();
        var x = [];
        for (var w = 0; w < this.keys_.length; w++) {
            var e = this.keys_[w];
            x.push(this.map_[e])
        }
        return x
    };
    d.structs.Map.prototype.getKeys = function() {
        this.cleanupKeysArray_();
        return (this.keys_.concat())
    };
    d.structs.Map.prototype.containsKey = function(e) {
        return d.structs.Map.hasKey_(this.map_, e)
    };
    d.structs.Map.prototype.containsValue = function(x) {
        for (var w = 0; w < this.keys_.length; w++) {
            var e = this.keys_[w];
            if (d.structs.Map.hasKey_(this.map_, e) && this.map_[e] == x) {
                return u
            }
        }
        return c
    };
    d.structs.Map.prototype.equals = function(x, e) {
        if (this === x) {
            return u
        }
        if (this.count_ != x.getCount()) {
            return c
        }
        var w = e || d.structs.Map.defaultEquals;
        this.cleanupKeysArray_();
        for (var z, y = 0; z = this.keys_[y]; y++) {
            if (!w(this.get(z), x.get(z))) {
                return c
            }
        }
        return u
    };
    d.structs.Map.defaultEquals = function(w, e) {
        return w === e
    };
    d.structs.Map.prototype.isEmpty = function() {
        return this.count_ == 0
    };
    d.structs.Map.prototype.clear = function() {
        this.map_ = {};
        this.keys_.length = 0;
        this.count_ = 0;
        this.version_ = 0
    };
    d.structs.Map.prototype.remove = function(e) {
        if (d.structs.Map.hasKey_(this.map_, e)) {
            delete this.map_[e];
            this.count_--;
            this.version_++;
            if (this.keys_.length > 2 * this.count_) {
                this.cleanupKeysArray_()
            }
            return u
        }
        return c
    };
    d.structs.Map.prototype.cleanupKeysArray_ = function() {
        if (this.count_ != this.keys_.length) {
            var x = 0;
            var w = 0;
            while (x < this.keys_.length) {
                var y = this.keys_[x];
                if (d.structs.Map.hasKey_(this.map_, y)) {
                    this.keys_[w++] = y
                }
                x++
            }
            this.keys_.length = w
        }
        if (this.count_ != this.keys_.length) {
            var e = {};
            var x = 0;
            var w = 0;
            while (x < this.keys_.length) {
                var y = this.keys_[x];
                if (!(d.structs.Map.hasKey_(e, y))) {
                    this.keys_[w++] = y;
                    e[y] = 1
                }
                x++
            }
            this.keys_.length = w
        }
    };
    d.structs.Map.prototype.get = function(e, w) {
        if (d.structs.Map.hasKey_(this.map_, e)) {
            return this.map_[e]
        }
        return w
    };
    d.structs.Map.prototype.set = function(e, w) {
        if (!(d.structs.Map.hasKey_(this.map_, e))) {
            this.count_++;
            this.keys_.push(e);
            this.version_++
        }
        this.map_[e] = w
    };
    d.structs.Map.prototype.addAll = function(y) {
        var x, e;
        if (y instanceof d.structs.Map) {
            x = y.getKeys();
            e = y.getValues()
        } else {
            x = d.object.getKeys(y);
            e = d.object.getValues(y)
        }
        for (var w = 0; w < x.length; w++) {
            this.set(x[w], e[w])
        }
    };
    d.structs.Map.prototype.clone = function() {
        return new d.structs.Map(this)
    };
    d.structs.Map.prototype.toObject = function() {
        this.cleanupKeysArray_();
        var x = {};
        for (var w = 0; w < this.keys_.length; w++) {
            var e = this.keys_[w];
            x[e] = this.map_[e]
        }
        return x
    };
    d.structs.Map.prototype.__iterator__ = function(B) {
        this.cleanupKeysArray_();
        var w = 0;
        var x = this.keys_;
        var y = this.map_;
        var e = this.version_;
        var A = this;
        var z = new d.iter.Iterator;
        z.next = function() {
            while (u) {
                if (e != A.version_) {
                    throw Error("The map has changed since the iterator was created")
                }
                if (w >= x.length) {
                    throw d.iter.StopIteration
                }
                var C = x[w++];
                return B ? C : y[C]
            }
        };
        return z
    };
    d.structs.Map.hasKey_ = function(w, e) {
        return Object.prototype.hasOwnProperty.call(w, e)
    };
    d.provide("goog.structs.Set");
    d.structs.Set = function(e) {
        this.map_ = new d.structs.Map;
        if (e) {
            this.addAll(e)
        }
    };
    d.structs.Set.getKey_ = function(w) {
        var e = typeof w;
        if (e == "object" && w || e == "function") {
            return "o" + d.getUid((w))
        } else {
            return e.substr(0, 1) + w
        }
    };
    d.structs.Set.prototype.getCount = function() {
        return this.map_.getCount()
    };
    d.structs.Set.prototype.add = function(e) {
        this.map_.set(d.structs.Set.getKey_(e), e)
    };
    d.structs.Set.prototype.addAll = function(x) {
        var w = d.structs.getValues(x);
        var e = w.length;
        for (var y = 0; y < e; y++) {
            this.add(w[y])
        }
    };
    d.structs.Set.prototype.remove = function(e) {
        return this.map_.remove(d.structs.Set.getKey_(e))
    };
    d.structs.Set.prototype.clear = function() {
        this.map_.clear()
    };
    d.structs.Set.prototype.isEmpty = function() {
        return this.map_.isEmpty()
    };
    d.structs.Set.prototype.contains = function(e) {
        return this.map_.containsKey(d.structs.Set.getKey_(e))
    };
    d.structs.Set.prototype.containsAll = function(e) {
        return d.structs.every(e, this.contains, this)
    };
    d.structs.Set.prototype.getValues = function() {
        return this.map_.getValues()
    };
    d.structs.Set.prototype.clone = function() {
        return new d.structs.Set(this)
    };
    d.structs.Set.prototype.equals = function(e) {
        return this.getCount() == d.structs.getCount(e) && this.isSubsetOf(e)
    };
    d.structs.Set.prototype.isSubsetOf = function(e) {
        var w = d.structs.getCount(e);
        if (this.getCount() > w) {
            return c
        }
        if (!(e instanceof d.structs.Set) && w > 5) {
            e = new d.structs.Set(e)
        }
        return d.structs.every(this, function(x) {
            return d.structs.contains(e, x)
        })
    };
    d.structs.Set.prototype.__iterator__ = function(e) {
        return this.map_.__iterator__(c)
    };
    d.provide("goog.disposable.IDisposable");
    d.disposable.IDisposable = function() {};
    d.disposable.IDisposable.prototype.dispose;
    d.disposable.IDisposable.prototype.isDisposed;
    d.provide("goog.Disposable");
    d.provide("goog.dispose");
    d.Disposable = function() {
        if (d.Disposable.ENABLE_MONITORING) {
            d.Disposable.instances_[d.getUid(this)] = this
        }
    };
    d.Disposable.ENABLE_MONITORING = c;
    d.Disposable.instances_ = {};
    d.Disposable.prototype.disposed_ = c;
    d.Disposable.prototype.isDisposed = function() {
        return this.disposed_
    };
    d.Disposable.prototype.getDisposed = d.Disposable.prototype.isDisposed;
    d.Disposable.prototype.dispose = function() {
        if (!this.disposed_) {
            this.disposed_ = u;
            this.disposeInternal();
            if (d.Disposable.ENABLE_MONITORING) {
                var e = d.getUid(this);
                if (!d.Disposable.instances_.hasOwnProperty(e)) {
                    throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call")
                }
                delete d.Disposable.instances_[e]
            }
        }
    };
    d.Disposable.prototype.disposeInternal = function() {};
    d.dispose = function(e) {
        if (e && typeof e.dispose == "function") {
            e.dispose()
        }
    };
    d.provide("goog.dom.SavedRange");
    d.dom.SavedRange = function() {
        d.Disposable.call(this)
    };
    d.inherits(d.dom.SavedRange, d.Disposable);
    d.dom.SavedRange.prototype.restore = function(w) {
        var e = this.restoreInternal();
        if (!w) {
            this.dispose()
        }
        return e
    };
    d.dom.SavedRange.prototype.restoreInternal = d.abstractMethod;
    d.provide("goog.dom.SavedCaretRange");
    d.dom.SavedCaretRange = function(e) {
        d.dom.SavedRange.call(this);
        this.startCaretId_ = d.string.createUniqueString();
        this.endCaretId_ = d.string.createUniqueString();
        this.dom_ = d.dom.getDomHelper(e.getDocument());
        e.surroundWithNodes(this.createCaret_(u), this.createCaret_(c));
        this.removeIncidentalTextNode_()
    };
    d.inherits(d.dom.SavedCaretRange, d.dom.SavedRange);
    d.dom.SavedCaretRange.prototype.getCaret = function(e) {
        return this.dom_.getElement(e ? this.startCaretId_ : this.endCaretId_)
    };
    d.dom.SavedCaretRange.prototype.removeIncidentalTextNode_ = function() {
        var w = this.getCaret(u);
        this.removeIfEmptyText_(w.previousSibling);
        this.removeIfEmptyText_(w.nextSibling);
        var e = this.getCaret(c);
        this.removeIfEmptyText_(e.previousSibling);
        this.removeIfEmptyText_(e.nextSibling)
    };
    d.dom.SavedCaretRange.prototype.removeIfEmptyText_ = function(e) {
        if (e && e.nodeType === d.dom.NodeType.TEXT && !e.nodeValue) {
            d.dom.removeNode(e)
        }
    };
    d.dom.SavedCaretRange.prototype.removeCarets = function(e) {
        d.dom.removeNode(this.getCaret(u));
        d.dom.removeNode(this.getCaret(c));
        return e
    };
    d.dom.SavedCaretRange.prototype.restoreInternal = function() {
        var y = i;
        var B = this.getCaret(u);
        var x = this.getCaret(c);
        if (B && x) {
            var A = B.parentNode;
            var w = d.array.indexOf(A.childNodes, B);
            var e = x.parentNode;
            var z = d.array.indexOf(e.childNodes, x);
            y = d.dom.Range.createFromNodes(A, w + 1, e, z);
            y.select()
        }
        return y
    };
    d.dom.SavedCaretRange.prototype.disposeInternal = function() {
        this.removeCarets();
        this.dom_ = i
    };
    d.dom.SavedCaretRange.prototype.createCaret_ = function(e) {
        return this.dom_.createDom(d.dom.TagName.SPAN, {
            id: e ? this.startCaretId_ : this.endCaretId_
        })
    };
    d.dom.SavedCaretRange.CARET_REGEX = /<span\s+id="?goog_\d+"?><\/span>/ig;
    d.provide("goog.dom.AbstractRange");
    d.provide("goog.dom.RangeIterator");
    d.provide("goog.dom.RangeType");
    d.dom.RangeType = {
        TEXT: "text",
        CONTROL: "control",
        MULTI: "mutli"
    };
    d.dom.AbstractRange = function() {};
    d.dom.AbstractRange.getBrowserSelectionForWindow = function(A) {
        if (A.getSelection) {
            return A.getSelection()
        } else {
            var z = A.document;
            var x = z.selection;
            if (x) {
                try {
                    var w = x.createRange();
                    if (w.parentElement) {
                        if (w.parentElement().document != z) {
                            return i
                        }
                    } else {
                        if (!w.length || w.item(0).document != z) {
                            return i
                        }
                    }
                } catch (y) {
                    return i
                }
                return x
            }
            return i
        }
    };
    d.dom.AbstractRange.isNativeControlRange = function(e) {
        return !!e && !!e.addElement
    };
    d.dom.AbstractRange.prototype.clone = d.abstractMethod;
    d.dom.AbstractRange.prototype.getType = d.abstractMethod;
    d.dom.AbstractRange.prototype.getBrowserRangeObject = d.abstractMethod;
    d.dom.AbstractRange.prototype.setBrowserRangeObject = function(e) {
        return c
    };
    d.dom.AbstractRange.prototype.getTextRangeCount = d.abstractMethod;
    d.dom.AbstractRange.prototype.getTextRange = d.abstractMethod;
    d.dom.AbstractRange.prototype.getTextRanges = function() {
        var w = [];
        for (var x = 0, e = this.getTextRangeCount(); x < e; x++) {
            w.push(this.getTextRange(x))
        }
        return w
    };
    d.dom.AbstractRange.prototype.getContainer = d.abstractMethod;
    d.dom.AbstractRange.prototype.getStartNode = d.abstractMethod;
    d.dom.AbstractRange.prototype.getStartOffset = d.abstractMethod;
    d.dom.AbstractRange.prototype.getEndNode = d.abstractMethod;
    d.dom.AbstractRange.prototype.getEndOffset = d.abstractMethod;
    d.dom.AbstractRange.prototype.getAnchorNode = function() {
        return this.isReversed() ? this.getEndNode() : this.getStartNode()
    };
    d.dom.AbstractRange.prototype.getAnchorOffset = function() {
        return this.isReversed() ? this.getEndOffset() : this.getStartOffset()
    };
    d.dom.AbstractRange.prototype.getFocusNode = function() {
        return this.isReversed() ? this.getStartNode() : this.getEndNode()
    };
    d.dom.AbstractRange.prototype.getFocusOffset = function() {
        return this.isReversed() ? this.getStartOffset() : this.getEndOffset()
    };
    d.dom.AbstractRange.prototype.isReversed = function() {
        return c
    };
    d.dom.AbstractRange.prototype.getDocument = function() {
        return d.dom.getOwnerDocument(d.userAgent.IE ? this.getContainer() : this.getStartNode())
    };
    d.dom.AbstractRange.prototype.getWindow = function() {
        return d.dom.getWindow(this.getDocument())
    };
    d.dom.AbstractRange.prototype.containsRange = d.abstractMethod;
    d.dom.AbstractRange.prototype.containsNode = function(e, w) {
        return this.containsRange(d.dom.Range.createFromNodeContents(e), w)
    };
    d.dom.AbstractRange.prototype.isRangeInDocument = d.abstractMethod;
    d.dom.AbstractRange.prototype.isCollapsed = d.abstractMethod;
    d.dom.AbstractRange.prototype.getText = d.abstractMethod;
    d.dom.AbstractRange.prototype.getHtmlFragment = d.abstractMethod;
    d.dom.AbstractRange.prototype.getValidHtml = d.abstractMethod;
    d.dom.AbstractRange.prototype.getPastableHtml = d.abstractMethod;
    d.dom.AbstractRange.prototype.__iterator__ = d.abstractMethod;
    d.dom.AbstractRange.prototype.select = d.abstractMethod;
    d.dom.AbstractRange.prototype.removeContents = d.abstractMethod;
    d.dom.AbstractRange.prototype.insertNode = d.abstractMethod;
    d.dom.AbstractRange.prototype.surroundWithNodes = d.abstractMethod;
    d.dom.AbstractRange.prototype.saveUsingDom = d.abstractMethod;
    d.dom.AbstractRange.prototype.saveUsingCarets = function() {
        return (this.getStartNode() && this.getEndNode()) ? new d.dom.SavedCaretRange(this) : i
    };
    d.dom.AbstractRange.prototype.collapse = d.abstractMethod;
    d.dom.RangeIterator = function(e, w) {
        d.dom.TagIterator.call(this, e, w, u)
    };
    d.inherits(d.dom.RangeIterator, d.dom.TagIterator);
    d.dom.RangeIterator.prototype.getStartTextOffset = d.abstractMethod;
    d.dom.RangeIterator.prototype.getEndTextOffset = d.abstractMethod;
    d.dom.RangeIterator.prototype.getStartNode = d.abstractMethod;
    d.dom.RangeIterator.prototype.getEndNode = d.abstractMethod;
    d.dom.RangeIterator.prototype.isLast = d.abstractMethod;
    d.provide("goog.dom.AbstractMultiRange");
    d.dom.AbstractMultiRange = function() {};
    d.inherits(d.dom.AbstractMultiRange, d.dom.AbstractRange);
    d.dom.AbstractMultiRange.prototype.containsRange = function(z, y) {
        var e = this.getTextRanges();
        var x = z.getTextRanges();
        var w = y ? d.array.some : d.array.every;
        return w(x, function(A) {
            return d.array.some(e, function(B) {
                return B.containsRange(A, y)
            })
        })
    };
    d.dom.AbstractMultiRange.prototype.insertNode = function(e, w) {
        if (w) {
            d.dom.insertSiblingBefore(e, this.getStartNode())
        } else {
            d.dom.insertSiblingAfter(e, this.getEndNode())
        }
        return e
    };
    d.dom.AbstractMultiRange.prototype.surroundWithNodes = function(w, e) {
        this.insertNode(w, u);
        this.insertNode(e, c)
    };
    d.provide("goog.dom.TextRangeIterator");
    d.dom.TextRangeIterator = function(x, B, y, C, A) {
        var D;
        if (x) {
            this.startNode_ = x;
            this.startOffset_ = B;
            this.endNode_ = y;
            this.endOffset_ = C;
            if (x.nodeType == d.dom.NodeType.ELEMENT && x.tagName != d.dom.TagName.BR) {
                var w = x.childNodes;
                var E = w[B];
                if (E) {
                    this.startNode_ = E;
                    this.startOffset_ = 0
                } else {
                    if (w.length) {
                        this.startNode_ = (d.array.peek(w))
                    }
                    D = u
                }
            }
            if (y.nodeType == d.dom.NodeType.ELEMENT) {
                this.endNode_ = y.childNodes[C];
                if (this.endNode_) {
                    this.endOffset_ = 0
                } else {
                    this.endNode_ = y
                }
            }
        }
        d.dom.RangeIterator.call(this, A ? this.endNode_ : this.startNode_, A);
        if (D) {
            try {
                this.next()
            } catch (z) {
                if (z != d.iter.StopIteration) {
                    throw z
                }
            }
        }
    };
    d.inherits(d.dom.TextRangeIterator, d.dom.RangeIterator);
    d.dom.TextRangeIterator.prototype.startNode_ = i;
    d.dom.TextRangeIterator.prototype.endNode_ = i;
    d.dom.TextRangeIterator.prototype.startOffset_ = 0;
    d.dom.TextRangeIterator.prototype.endOffset_ = 0;
    d.dom.TextRangeIterator.prototype.getStartTextOffset = function() {
        return this.node.nodeType != d.dom.NodeType.TEXT ? -1 : this.node == this.startNode_ ? this.startOffset_ : 0
    };
    d.dom.TextRangeIterator.prototype.getEndTextOffset = function() {
        return this.node.nodeType != d.dom.NodeType.TEXT ? -1 : this.node == this.endNode_ ? this.endOffset_ : this.node.nodeValue.length
    };
    d.dom.TextRangeIterator.prototype.getStartNode = function() {
        return this.startNode_
    };
    d.dom.TextRangeIterator.prototype.setStartNode = function(e) {
        if (!this.isStarted()) {
            this.setPosition(e)
        }
        this.startNode_ = e;
        this.startOffset_ = 0
    };
    d.dom.TextRangeIterator.prototype.getEndNode = function() {
        return this.endNode_
    };
    d.dom.TextRangeIterator.prototype.setEndNode = function(e) {
        this.endNode_ = e;
        this.endOffset_ = 0
    };
    d.dom.TextRangeIterator.prototype.isLast = function() {
        return this.isStarted() && this.node == this.endNode_ && (!this.endOffset_ || !this.isStartTag())
    };
    d.dom.TextRangeIterator.prototype.next = function() {
        if (this.isLast()) {
            throw d.iter.StopIteration
        }
        return d.dom.TextRangeIterator.superClass_.next.call(this)
    };
    d.dom.TextRangeIterator.prototype.skipTag = function() {
        d.dom.TextRangeIterator.superClass_.skipTag.apply(this);
        if (d.dom.contains(this.node, this.endNode_)) {
            throw d.iter.StopIteration
        }
    };
    d.dom.TextRangeIterator.prototype.copyFrom = function(e) {
        this.startNode_ = e.startNode_;
        this.endNode_ = e.endNode_;
        this.startOffset_ = e.startOffset_;
        this.endOffset_ = e.endOffset_;
        this.isReversed_ = e.isReversed_;
        d.dom.TextRangeIterator.superClass_.copyFrom.call(this, e)
    };
    d.dom.TextRangeIterator.prototype.clone = function() {
        var e = new d.dom.TextRangeIterator(this.startNode_, this.startOffset_, this.endNode_, this.endOffset_, this.isReversed_);
        e.copyFrom(this);
        return e
    };
    d.provide("goog.userAgent.jscript");
    d.userAgent.jscript.ASSUME_NO_JSCRIPT = c;
    d.userAgent.jscript.init_ = function() {
        var e = "ScriptEngine" in d.global;
        d.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = e && d.global.ScriptEngine() == "JScript";
        d.userAgent.jscript.DETECTED_VERSION_ = d.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? (d.global.ScriptEngineMajorVersion() + "." + d.global.ScriptEngineMinorVersion() + "." + d.global.ScriptEngineBuildVersion()) : "0"
    };
    if (!d.userAgent.jscript.ASSUME_NO_JSCRIPT) {
        d.userAgent.jscript.init_()
    }
    d.userAgent.jscript.HAS_JSCRIPT = d.userAgent.jscript.ASSUME_NO_JSCRIPT ? c : d.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
    d.userAgent.jscript.VERSION = d.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : d.userAgent.jscript.DETECTED_VERSION_;
    d.userAgent.jscript.isVersion = function(e) {
        return d.string.compareVersions(d.userAgent.jscript.VERSION, e) >= 0
    };
    d.provide("goog.string.StringBuffer");
    d.string.StringBuffer = function(e, w) {
        this.buffer_ = d.userAgent.jscript.HAS_JSCRIPT ? [] : "";
        if (e != i) {
            this.append.apply(this, arguments)
        }
    };
    d.string.StringBuffer.prototype.set = function(e) {
        this.clear();
        this.append(e)
    };
    if (d.userAgent.jscript.HAS_JSCRIPT) {
        d.string.StringBuffer.prototype.bufferLength_ = 0;
        d.string.StringBuffer.prototype.append = function(w, e, x) {
            if (e == i) {
                this.buffer_[this.bufferLength_++] = w
            } else {
                this.buffer_.push.apply((this.buffer_), arguments);
                this.bufferLength_ = this.buffer_.length
            }
            return this
        }
    } else {
        d.string.StringBuffer.prototype.append = function(w, e, y) {
            this.buffer_ += w;
            if (e != i) {
                for (var x = 1; x < arguments.length; x++) {
                    this.buffer_ += arguments[x]
                }
            }
            return this
        }
    }
    d.string.StringBuffer.prototype.clear = function() {
        if (d.userAgent.jscript.HAS_JSCRIPT) {
            this.buffer_.length = 0;
            this.bufferLength_ = 0
        } else {
            this.buffer_ = ""
        }
    };
    d.string.StringBuffer.prototype.getLength = function() {
        return this.toString().length
    };
    d.string.StringBuffer.prototype.toString = function() {
        if (d.userAgent.jscript.HAS_JSCRIPT) {
            var e = this.buffer_.join("");
            this.clear();
            if (e) {
                this.append(e)
            }
            return e
        } else {
            return (this.buffer_)
        }
    };
    d.provide("goog.dom.RangeEndpoint");
    d.dom.RangeEndpoint = {
        START: 1,
        END: 0
    };
    d.provide("goog.dom.browserrange.AbstractRange");
    d.dom.browserrange.AbstractRange = function() {};
    d.dom.browserrange.AbstractRange.prototype.clone = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.getBrowserRange = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.getContainer = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.getStartNode = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.getStartOffset = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.getEndNode = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.getEndOffset = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.compareBrowserRangeEndpoints = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.containsRange = function(C, A) {
        var y = A && !C.isCollapsed();
        var x = C.getBrowserRange();
        var B = d.dom.RangeEndpoint.START,
            w = d.dom.RangeEndpoint.END;
        try {
            if (y) {
                return this.compareBrowserRangeEndpoints(x, w, B) >= 0 && this.compareBrowserRangeEndpoints(x, B, w) <= 0
            } else {
                return this.compareBrowserRangeEndpoints(x, w, w) >= 0 && this.compareBrowserRangeEndpoints(x, B, B) <= 0
            }
        } catch (z) {
            if (!d.userAgent.IE) {
                throw z
            }
            return c
        }
    };
    d.dom.browserrange.AbstractRange.prototype.containsNode = function(e, w) {
        return this.containsRange(d.dom.browserrange.createRangeFromNodeContents(e), w)
    };
    d.dom.browserrange.AbstractRange.prototype.isCollapsed = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.getText = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.getHtmlFragment = function() {
        var e = new d.string.StringBuffer();
        d.iter.forEach(this, function(z, B, y) {
            if (z.nodeType == d.dom.NodeType.TEXT) {
                e.append(d.string.htmlEscape(z.nodeValue.substring(y.getStartTextOffset(), y.getEndTextOffset())))
            } else {
                if (z.nodeType == d.dom.NodeType.ELEMENT) {
                    if (y.isEndTag()) {
                        if (d.dom.canHaveChildren(z)) {
                            e.append("</" + z.tagName + ">")
                        }
                    } else {
                        var A = z.cloneNode(c);
                        var x = d.dom.getOuterHtml(A);
                        if (d.userAgent.IE && z.tagName == d.dom.TagName.LI) {
                            e.append(x)
                        } else {
                            var w = x.lastIndexOf("<");
                            e.append(w ? x.substr(0, w) : x)
                        }
                    }
                }
            }
        }, this);
        return e.toString()
    };
    d.dom.browserrange.AbstractRange.prototype.getValidHtml = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.__iterator__ = function(e) {
        return new d.dom.TextRangeIterator(this.getStartNode(), this.getStartOffset(), this.getEndNode(), this.getEndOffset())
    };
    d.dom.browserrange.AbstractRange.prototype.select = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.removeContents = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.surroundContents = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.insertNode = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.surroundWithNodes = d.abstractMethod;
    d.dom.browserrange.AbstractRange.prototype.collapse = d.abstractMethod;
    d.provide("goog.dom.browserrange.W3cRange");
    d.dom.browserrange.W3cRange = function(e) {
        this.range_ = e
    };
    d.inherits(d.dom.browserrange.W3cRange, d.dom.browserrange.AbstractRange);
    d.dom.browserrange.W3cRange.getBrowserRangeForNode = function(y) {
        var A = d.dom.getOwnerDocument(y).createRange();
        if (y.nodeType == d.dom.NodeType.TEXT) {
            A.setStart(y, 0);
            A.setEnd(y, y.length)
        } else {
            if (!d.dom.browserrange.canContainRangeEndpoint(y)) {
                var x = y.parentNode;
                var w = d.array.indexOf(x.childNodes, y);
                A.setStart(x, w);
                A.setEnd(x, w + 1)
            } else {
                var z, e = y;
                while ((z = e.firstChild) && d.dom.browserrange.canContainRangeEndpoint(z)) {
                    e = z
                }
                A.setStart(e, 0);
                e = y;
                while ((z = e.lastChild) && d.dom.browserrange.canContainRangeEndpoint(z)) {
                    e = z
                }
                A.setEnd(e, e.nodeType == d.dom.NodeType.ELEMENT ? e.childNodes.length : e.length)
            }
        }
        return A
    };
    d.dom.browserrange.W3cRange.getBrowserRangeForNodes = function(y, w, e, x) {
        var z = d.dom.getOwnerDocument(y).createRange();
        z.setStart(y, w);
        z.setEnd(e, x);
        return z
    };
    d.dom.browserrange.W3cRange.createFromNodeContents = function(e) {
        return new d.dom.browserrange.W3cRange(d.dom.browserrange.W3cRange.getBrowserRangeForNode(e))
    };
    d.dom.browserrange.W3cRange.createFromNodes = function(y, w, e, x) {
        return new d.dom.browserrange.W3cRange(d.dom.browserrange.W3cRange.getBrowserRangeForNodes(y, w, e, x))
    };
    d.dom.browserrange.W3cRange.prototype.clone = function() {
        return new this.constructor(this.range_.cloneRange())
    };
    d.dom.browserrange.W3cRange.prototype.getBrowserRange = function() {
        return this.range_
    };
    d.dom.browserrange.W3cRange.prototype.getContainer = function() {
        return this.range_.commonAncestorContainer
    };
    d.dom.browserrange.W3cRange.prototype.getStartNode = function() {
        return this.range_.startContainer
    };
    d.dom.browserrange.W3cRange.prototype.getStartOffset = function() {
        return this.range_.startOffset
    };
    d.dom.browserrange.W3cRange.prototype.getEndNode = function() {
        return this.range_.endContainer
    };
    d.dom.browserrange.W3cRange.prototype.getEndOffset = function() {
        return this.range_.endOffset
    };
    d.dom.browserrange.W3cRange.prototype.compareBrowserRangeEndpoints = function(w, x, e) {
        return this.range_.compareBoundaryPoints(e == d.dom.RangeEndpoint.START ? (x == d.dom.RangeEndpoint.START ? d.global.Range.START_TO_START : d.global.Range.START_TO_END) : (x == d.dom.RangeEndpoint.START ? d.global.Range.END_TO_START : d.global.Range.END_TO_END), (w))
    };
    d.dom.browserrange.W3cRange.prototype.isCollapsed = function() {
        return this.range_.collapsed
    };
    d.dom.browserrange.W3cRange.prototype.getText = function() {
        return this.range_.toString()
    };
    d.dom.browserrange.W3cRange.prototype.getValidHtml = function() {
        var y = d.dom.getDomHelper(this.range_.startContainer).createDom("div");
        y.appendChild(this.range_.cloneContents());
        var e = y.innerHTML;
        if (d.string.startsWith(e, "<") || !this.isCollapsed() && !d.string.contains(e, "<")) {
            return e
        }
        var w = this.getContainer();
        w = w.nodeType == d.dom.NodeType.ELEMENT ? w : w.parentNode;
        var x = d.dom.getOuterHtml((w.cloneNode(c)));
        return x.replace(">", ">" + e)
    };
    d.dom.browserrange.W3cRange.prototype.select = function(e) {
        var w = d.dom.getWindow(d.dom.getOwnerDocument(this.getStartNode()));
        this.selectInternal(w.getSelection(), e)
    };
    d.dom.browserrange.W3cRange.prototype.selectInternal = function(w, e) {
        w.removeAllRanges();
        w.addRange(this.range_)
    };
    d.dom.browserrange.W3cRange.prototype.removeContents = function() {
        var e = this.range_;
        e.extractContents();
        if (e.startContainer.hasChildNodes()) {
            var x = e.startContainer.childNodes[e.startOffset];
            if (x) {
                var w = x.previousSibling;
                if (d.dom.getRawTextContent(x) == "") {
                    d.dom.removeNode(x)
                }
                if (w && d.dom.getRawTextContent(w) == "") {
                    d.dom.removeNode(w)
                }
            }
        }
    };
    d.dom.browserrange.W3cRange.prototype.surroundContents = function(e) {
        this.range_.surroundContents(e);
        return e
    };
    d.dom.browserrange.W3cRange.prototype.insertNode = function(w, x) {
        var e = this.range_.cloneRange();
        e.collapse(x);
        e.insertNode(w);
        e.detach();
        return w
    };
    d.dom.browserrange.W3cRange.prototype.surroundWithNodes = function(w, y) {
        var z = d.dom.getWindow(d.dom.getOwnerDocument(this.getStartNode()));
        var e = d.dom.Range.createFromWindow(z);
        if (e) {
            var A = e.getStartNode();
            var E = e.getEndNode();
            var F = e.getStartOffset();
            var x = e.getEndOffset()
        }
        var C = this.range_.cloneRange();
        var B = this.range_.cloneRange();
        C.collapse(c);
        B.collapse(u);
        C.insertNode(y);
        B.insertNode(w);
        C.detach();
        B.detach();
        if (e) {
            var D = function(G) {
                return G == w || G == y
            };
            if (A.nodeType == d.dom.NodeType.TEXT) {
                while (F > A.length) {
                    F -= A.length;
                    do {
                        A = A.nextSibling
                    } while (D(A))
                }
            }
            if (E.nodeType == d.dom.NodeType.TEXT) {
                while (x > E.length) {
                    x -= E.length;
                    do {
                        E = E.nextSibling
                    } while (D(E))
                }
            }
            d.dom.Range.createFromNodes(A, (F), E, (x)).select()
        }
    };
    d.dom.browserrange.W3cRange.prototype.collapse = function(e) {
        this.range_.collapse(e)
    };
    d.provide("goog.dom.browserrange.WebKitRange");
    d.dom.browserrange.WebKitRange = function(e) {
        d.dom.browserrange.W3cRange.call(this, e)
    };
    d.inherits(d.dom.browserrange.WebKitRange, d.dom.browserrange.W3cRange);
    d.dom.browserrange.WebKitRange.createFromNodeContents = function(e) {
        return new d.dom.browserrange.WebKitRange(d.dom.browserrange.W3cRange.getBrowserRangeForNode(e))
    };
    d.dom.browserrange.WebKitRange.createFromNodes = function(y, w, e, x) {
        return new d.dom.browserrange.WebKitRange(d.dom.browserrange.W3cRange.getBrowserRangeForNodes(y, w, e, x))
    };
    d.dom.browserrange.WebKitRange.prototype.compareBrowserRangeEndpoints = function(w, x, e) {
        if (d.userAgent.isVersion("528")) {
            return (d.dom.browserrange.WebKitRange.superClass_.compareBrowserRangeEndpoints.call(this, w, x, e))
        }
        return this.range_.compareBoundaryPoints(e == d.dom.RangeEndpoint.START ? (x == d.dom.RangeEndpoint.START ? d.global.Range.START_TO_START : d.global.Range.END_TO_START) : (x == d.dom.RangeEndpoint.START ? d.global.Range.START_TO_END : d.global.Range.END_TO_END), (w))
    };
    d.dom.browserrange.WebKitRange.prototype.selectInternal = function(e, w) {
        e.removeAllRanges();
        if (w) {
            e.setBaseAndExtent(this.getEndNode(), this.getEndOffset(), this.getStartNode(), this.getStartOffset())
        } else {
            e.setBaseAndExtent(this.getStartNode(), this.getStartOffset(), this.getEndNode(), this.getEndOffset())
        }
    };
    d.provide("goog.dom.NodeIterator");
    d.dom.NodeIterator = function(y, e, x, w) {
        d.dom.TagIterator.call(this, y, e, x, i, w)
    };
    d.inherits(d.dom.NodeIterator, d.dom.TagIterator);
    d.dom.NodeIterator.prototype.next = function() {
        do {
            d.dom.NodeIterator.superClass_.next.call(this)
        } while (this.isEndTag());
        return this.node
    };
    d.provide("goog.dom.browserrange.IeRange");
    d.dom.browserrange.IeRange = function(e, w) {
        this.range_ = e;
        this.doc_ = w
    };
    d.inherits(d.dom.browserrange.IeRange, d.dom.browserrange.AbstractRange);
    d.dom.browserrange.IeRange.getBrowserRangeForNode_ = function(x) {
        var z = d.dom.getOwnerDocument(x).body.createTextRange();
        if (x.nodeType == d.dom.NodeType.ELEMENT) {
            z.moveToElementText(x);
            if (d.dom.browserrange.canContainRangeEndpoint(x) && !x.childNodes.length) {
                z.collapse(c)
            }
        } else {
            var y = 0;
            var w = x;
            while (w = w.previousSibling) {
                var e = w.nodeType;
                if (e == d.dom.NodeType.TEXT) {
                    y += w.length
                } else {
                    if (e == d.dom.NodeType.ELEMENT) {
                        z.moveToElementText(w);
                        break
                    }
                }
            }
            if (!w) {
                z.moveToElementText(x.parentNode)
            }
            z.collapse(!w);
            if (y) {
                z.move("character", y)
            }
            z.moveEnd("character", x.length)
        }
        return z
    };
    d.dom.browserrange.IeRange.getBrowserRangeForNodes_ = function(y, w, e, x) {
        var C, B = c;
        if (y.nodeType == d.dom.NodeType.ELEMENT) {
            C = y.childNodes[w];
            B = !C;
            y = C || y.lastChild || y;
            w = 0
        }
        var z = d.dom.browserrange.IeRange.getBrowserRangeForNode_(y);
        if (w) {
            z.move("character", w)
        }
        if (y == e && w == x) {
            z.collapse(u);
            return z
        }
        if (B) {
            z.collapse(c)
        }
        B = c;
        if (e.nodeType == d.dom.NodeType.ELEMENT) {
            C = e.childNodes[x];
            e = C || e.lastChild || e;
            x = 0;
            B = !C
        }
        var A = d.dom.browserrange.IeRange.getBrowserRangeForNode_(e);
        A.collapse(!B);
        if (x) {
            A.moveEnd("character", x)
        }
        z.setEndPoint("EndToEnd", A);
        return z
    };
    d.dom.browserrange.IeRange.createFromNodeContents = function(x) {
        var w = new d.dom.browserrange.IeRange(d.dom.browserrange.IeRange.getBrowserRangeForNode_(x), d.dom.getOwnerDocument(x));
        if (!d.dom.browserrange.canContainRangeEndpoint(x)) {
            w.startNode_ = w.endNode_ = w.parentNode_ = x.parentNode;
            w.startOffset_ = d.array.indexOf(w.parentNode_.childNodes, x);
            w.endOffset_ = w.startOffset_ + 1
        } else {
            var y, e = x;
            while ((y = e.firstChild) && d.dom.browserrange.canContainRangeEndpoint(y)) {
                e = y
            }
            w.startNode_ = e;
            w.startOffset_ = 0;
            e = x;
            while ((y = e.lastChild) && d.dom.browserrange.canContainRangeEndpoint(y)) {
                e = y
            }
            w.endNode_ = e;
            w.endOffset_ = e.nodeType == d.dom.NodeType.ELEMENT ? e.childNodes.length : e.length;
            w.parentNode_ = x
        }
        return w
    };
    d.dom.browserrange.IeRange.createFromNodes = function(z, w, e, y) {
        var x = new d.dom.browserrange.IeRange(d.dom.browserrange.IeRange.getBrowserRangeForNodes_(z, w, e, y), d.dom.getOwnerDocument(z));
        x.startNode_ = z;
        x.startOffset_ = w;
        x.endNode_ = e;
        x.endOffset_ = y;
        return x
    };
    d.dom.browserrange.IeRange.prototype.parentNode_ = i;
    d.dom.browserrange.IeRange.prototype.startNode_ = i;
    d.dom.browserrange.IeRange.prototype.endNode_ = i;
    d.dom.browserrange.IeRange.prototype.startOffset_ = -1;
    d.dom.browserrange.IeRange.prototype.endOffset_ = -1;
    d.dom.browserrange.IeRange.prototype.clone = function() {
        var e = new d.dom.browserrange.IeRange(this.range_.duplicate(), this.doc_);
        e.parentNode_ = this.parentNode_;
        e.startNode_ = this.startNode_;
        e.endNode_ = this.endNode_;
        return e
    };
    d.dom.browserrange.IeRange.prototype.getBrowserRange = function() {
        return this.range_
    };
    d.dom.browserrange.IeRange.prototype.clearCachedValues_ = function() {
        this.parentNode_ = this.startNode_ = this.endNode_ = i;
        this.startOffset_ = this.endOffset_ = -1
    };
    d.dom.browserrange.IeRange.prototype.getContainer = function() {
        if (!this.parentNode_) {
            var y = this.range_.text;
            var e = this.range_.duplicate();
            var x = y.replace(/ +$/, "");
            var A = y.length - x.length;
            if (A) {
                e.moveEnd("character", -A)
            }
            var w = e.parentElement();
            var B = e.htmlText;
            var z = d.string.stripNewlines(B).length;
            if (this.isCollapsed() && z > 0) {
                return (this.parentNode_ = w)
            }
            while (z > d.string.stripNewlines(w.outerHTML).length) {
                w = w.parentNode
            }
            while (w.childNodes.length == 1 && w.firstChild && w.innerText == d.dom.browserrange.IeRange.getNodeText_(w.firstChild)) {
                if (!d.dom.browserrange.canContainRangeEndpoint(w.firstChild)) {
                    break
                }
                w = w.firstChild
            }
            if (y.length == 0) {
                w = this.findDeepestContainer_(w)
            }
            this.parentNode_ = w
        }
        return this.parentNode_
    };
    d.dom.browserrange.IeRange.prototype.findDeepestContainer_ = function(y) {
        var F = y.childNodes;
        for (var B = 0, D = F.length; B < D; B++) {
            var w = F[B];
            if (d.dom.browserrange.canContainRangeEndpoint(w)) {
                var z = d.dom.browserrange.IeRange.getBrowserRangeForNode_(w);
                var e = d.dom.RangeEndpoint.START;
                var A = d.dom.RangeEndpoint.END;
                var C = (z.htmlText != w.outerHTML);
                var E = this.isCollapsed() && C;
                var x = E ? (this.compareBrowserRangeEndpoints(z, e, e) >= 0 && this.compareBrowserRangeEndpoints(z, e, A) <= 0) : this.range_.inRange(z);
                if (x) {
                    return this.findDeepestContainer_(w)
                }
            }
        }
        return y
    };
    d.dom.browserrange.IeRange.prototype.getStartNode = function() {
        if (!this.startNode_) {
            this.startNode_ = this.getEndpointNode_(d.dom.RangeEndpoint.START);
            if (this.isCollapsed()) {
                this.endNode_ = this.startNode_
            }
        }
        return this.startNode_
    };
    d.dom.browserrange.IeRange.prototype.getStartOffset = function() {
        if (this.startOffset_ < 0) {
            this.startOffset_ = this.getOffset_(d.dom.RangeEndpoint.START);
            if (this.isCollapsed()) {
                this.endOffset_ = this.startOffset_
            }
        }
        return this.startOffset_
    };
    d.dom.browserrange.IeRange.prototype.getEndNode = function() {
        if (this.isCollapsed()) {
            return this.getStartNode()
        }
        if (!this.endNode_) {
            this.endNode_ = this.getEndpointNode_(d.dom.RangeEndpoint.END)
        }
        return this.endNode_
    };
    d.dom.browserrange.IeRange.prototype.getEndOffset = function() {
        if (this.isCollapsed()) {
            return this.getStartOffset()
        }
        if (this.endOffset_ < 0) {
            this.endOffset_ = this.getOffset_(d.dom.RangeEndpoint.END);
            if (this.isCollapsed()) {
                this.startOffset_ = this.endOffset_
            }
        }
        return this.endOffset_
    };
    d.dom.browserrange.IeRange.prototype.compareBrowserRangeEndpoints = function(w, x, e) {
        return this.range_.compareEndPoints((x == d.dom.RangeEndpoint.START ? "Start" : "End") + "To" + (e == d.dom.RangeEndpoint.START ? "Start" : "End"), w)
    };
    d.dom.browserrange.IeRange.prototype.getEndpointNode_ = function(I, D) {
        var B = D || this.getContainer();
        if (!B || !B.firstChild) {
            return B
        }
        var x = d.dom.RangeEndpoint.START,
            E = d.dom.RangeEndpoint.END;
        var A = I == x;
        for (var F = 0, z = B.childNodes.length; F < z; F++) {
            var G = A ? F : z - F - 1;
            var y = B.childNodes[G];
            var C;
            try {
                C = d.dom.browserrange.createRangeFromNodeContents(y)
            } catch (H) {
                continue
            }
            var w = C.getBrowserRange();
            if (this.isCollapsed()) {
                if (!d.dom.browserrange.canContainRangeEndpoint(y)) {
                    if (this.compareBrowserRangeEndpoints(w, x, x) == 0) {
                        this.startOffset_ = this.endOffset_ = G;
                        return B
                    }
                } else {
                    if (C.containsRange(this)) {
                        return this.getEndpointNode_(I, y)
                    }
                }
            } else {
                if (this.containsRange(C)) {
                    if (!d.dom.browserrange.canContainRangeEndpoint(y)) {
                        if (A) {
                            this.startOffset_ = G
                        } else {
                            this.endOffset_ = G + 1
                        }
                        return B
                    }
                    while (y.childNodes.length == 1) {
                        y = y.firstChild
                    }
                    return this.getEndpointNode_(I, y)
                } else {
                    if (this.compareBrowserRangeEndpoints(w, x, E) < 0 && this.compareBrowserRangeEndpoints(w, E, x) > 0) {
                        while (y.childNodes.length == 1 && y.firstChild) {
                            y = y.firstChild
                        }
                        return this.getEndpointNode_(I, y)
                    }
                }
            }
        }
        return B
    };
    d.dom.browserrange.IeRange.prototype.compareNodeEndpoints_ = function(x, w, e) {
        return this.range_.compareEndPoints((w == d.dom.RangeEndpoint.START ? "Start" : "End") + "To" + (e == d.dom.RangeEndpoint.START ? "Start" : "End"), d.dom.browserrange.createRangeFromNodeContents(x).getBrowserRange())
    };
    d.dom.browserrange.IeRange.prototype.getOffset_ = function(I, w) {
        var A = I == d.dom.RangeEndpoint.START;
        var x = w || (A ? this.getStartNode() : this.getEndNode());
        if (x.nodeType == d.dom.NodeType.ELEMENT) {
            var B = x.childNodes;
            var H = B.length;
            var z = A ? 0 : H - 1;
            var E = A ? 1 : -1;
            for (var F = z; F >= 0 && F < H; F += E) {
                var y = B[F];
                if (d.dom.browserrange.canContainRangeEndpoint(y)) {
                    continue
                }
                var e = this.compareNodeEndpoints_(y, I, I);
                if (e == 0) {
                    return A ? F : F + 1
                }
            }
            return F == -1 ? 0 : F
        } else {
            var G = this.range_.duplicate();
            var D = d.dom.browserrange.IeRange.getBrowserRangeForNode_(x);
            G.setEndPoint(A ? "EndToEnd" : "StartToStart", D);
            var C = G.text.length;
            return A ? x.length - C : C
        }
    };
    d.dom.browserrange.IeRange.getNodeText_ = function(e) {
        return e.nodeType == d.dom.NodeType.TEXT ? e.nodeValue : e.innerText
    };
    d.dom.browserrange.IeRange.prototype.isRangeInDocument = function() {
        var e = this.doc_.body.createTextRange();
        e.moveToElementText(this.doc_.body);
        return this.containsRange(new d.dom.browserrange.IeRange(e, this.doc_), u)
    };
    d.dom.browserrange.IeRange.prototype.isCollapsed = function() {
        return this.range_.compareEndPoints("StartToEnd", this.range_) == 0
    };
    d.dom.browserrange.IeRange.prototype.getText = function() {
        return this.range_.text
    };
    d.dom.browserrange.IeRange.prototype.getValidHtml = function() {
        return this.range_.htmlText
    };
    d.dom.browserrange.IeRange.prototype.select = function(e) {
        this.range_.select()
    };
    d.dom.browserrange.IeRange.prototype.removeContents = function() {
        if (this.range_.htmlText) {
            var x = this.getStartNode();
            var A = this.getEndNode();
            var F = this.range_.text;
            var C = this.range_.duplicate();
            C.moveStart("character", 1);
            C.moveStart("character", -1);
            if (C.text != F) {
                var D = new d.dom.NodeIterator(x, c, u);
                var z = [];
                d.iter.forEach(D, function(e) {
                    if (e.nodeType != d.dom.NodeType.TEXT && this.containsNode(e)) {
                        z.push(e);
                        D.skipTag()
                    }
                    if (e == A) {
                        throw d.iter.StopIteration
                    }
                });
                this.collapse(u);
                d.array.forEach(z, d.dom.removeNode);
                this.clearCachedValues_();
                return
            }
            this.range_ = C;
            this.range_.text = "";
            this.clearCachedValues_();
            var w = this.getStartNode();
            var y = this.getStartOffset();
            try {
                var E = x.nextSibling;
                if (x == A && x.parentNode && x.nodeType == d.dom.NodeType.TEXT && E && E.nodeType == d.dom.NodeType.TEXT) {
                    x.nodeValue += E.nodeValue;
                    d.dom.removeNode(E);
                    this.range_ = d.dom.browserrange.IeRange.getBrowserRangeForNode_(w);
                    this.range_.move("character", y);
                    this.clearCachedValues_()
                }
            } catch (B) {}
        }
    };
    d.dom.browserrange.IeRange.getDomHelper_ = function(e) {
        return d.dom.getDomHelper(e.parentElement())
    };
    d.dom.browserrange.IeRange.pasteElement_ = function(w, y, x) {
        x = x || d.dom.browserrange.IeRange.getDomHelper_(w);
        var z;
        var e = z = y.id;
        if (!z) {
            z = y.id = d.string.createUniqueString()
        }
        w.pasteHTML(y.outerHTML);
        y = x.getElement(z);
        if (y) {
            if (!e) {
                y.removeAttribute("id")
            }
        }
        return y
    };
    d.dom.browserrange.IeRange.prototype.surroundContents = function(e) {
        d.dom.removeNode(e);
        e.innerHTML = this.range_.htmlText;
        e = d.dom.browserrange.IeRange.pasteElement_(this.range_, e);
        if (e) {
            this.range_.moveToElementText(e)
        }
        this.clearCachedValues_();
        return e
    };
    d.dom.browserrange.IeRange.insertNode_ = function(A, y, z, w) {
        w = w || d.dom.browserrange.IeRange.getDomHelper_(A);
        var e;
        if (y.nodeType != d.dom.NodeType.ELEMENT) {
            e = u;
            y = w.createDom(d.dom.TagName.DIV, i, y)
        }
        A.collapse(z);
        y = d.dom.browserrange.IeRange.pasteElement_(A, (y), w);
        if (e) {
            var x = y.firstChild;
            w.flattenElement(y);
            y = x
        }
        return y
    };
    d.dom.browserrange.IeRange.prototype.insertNode = function(w, x) {
        var e = d.dom.browserrange.IeRange.insertNode_(this.range_.duplicate(), w, x);
        this.clearCachedValues_();
        return e
    };
    d.dom.browserrange.IeRange.prototype.surroundWithNodes = function(w, e) {
        var y = this.range_.duplicate();
        var x = this.range_.duplicate();
        d.dom.browserrange.IeRange.insertNode_(y, w, u);
        d.dom.browserrange.IeRange.insertNode_(x, e, c);
        this.clearCachedValues_()
    };
    d.dom.browserrange.IeRange.prototype.collapse = function(e) {
        this.range_.collapse(e);
        if (e) {
            this.endNode_ = this.startNode_;
            this.endOffset_ = this.startOffset_
        } else {
            this.startNode_ = this.endNode_;
            this.startOffset_ = this.endOffset_
        }
    };
    d.provide("goog.dom.browserrange.GeckoRange");
    d.dom.browserrange.GeckoRange = function(e) {
        d.dom.browserrange.W3cRange.call(this, e)
    };
    d.inherits(d.dom.browserrange.GeckoRange, d.dom.browserrange.W3cRange);
    d.dom.browserrange.GeckoRange.createFromNodeContents = function(e) {
        return new d.dom.browserrange.GeckoRange(d.dom.browserrange.W3cRange.getBrowserRangeForNode(e))
    };
    d.dom.browserrange.GeckoRange.createFromNodes = function(y, w, e, x) {
        return new d.dom.browserrange.GeckoRange(d.dom.browserrange.W3cRange.getBrowserRangeForNodes(y, w, e, x))
    };
    d.dom.browserrange.GeckoRange.prototype.selectInternal = function(x, A) {
        var w = A ? this.getEndNode() : this.getStartNode();
        var y = A ? this.getEndOffset() : this.getStartOffset();
        var z = A ? this.getStartNode() : this.getEndNode();
        var e = A ? this.getStartOffset() : this.getEndOffset();
        x.collapse(w, y);
        if (w != z || y != e) {
            x.extend(z, e)
        }
    };
    d.provide("goog.dom.browserrange.OperaRange");
    d.dom.browserrange.OperaRange = function(e) {
        d.dom.browserrange.W3cRange.call(this, e)
    };
    d.inherits(d.dom.browserrange.OperaRange, d.dom.browserrange.W3cRange);
    d.dom.browserrange.OperaRange.createFromNodeContents = function(e) {
        return new d.dom.browserrange.OperaRange(d.dom.browserrange.W3cRange.getBrowserRangeForNode(e))
    };
    d.dom.browserrange.OperaRange.createFromNodes = function(y, w, e, x) {
        return new d.dom.browserrange.OperaRange(d.dom.browserrange.W3cRange.getBrowserRangeForNodes(y, w, e, x))
    };
    d.dom.browserrange.OperaRange.prototype.selectInternal = function(e, w) {
        e.collapse(this.getStartNode(), this.getStartOffset());
        if (this.getEndNode() != this.getStartNode() || this.getEndOffset() != this.getStartOffset()) {
            e.extend(this.getEndNode(), this.getEndOffset())
        }
        if (e.rangeCount == 0) {
            e.addRange(this.range_)
        }
    };
    d.provide("goog.dom.browserrange");
    d.provide("goog.dom.browserrange.Error");
    d.dom.browserrange.Error = {
        NOT_IMPLEMENTED: "Not Implemented"
    };
    d.dom.browserrange.createRange = function(e) {
        if (d.userAgent.IE && !d.userAgent.isDocumentMode(9)) {
            return new d.dom.browserrange.IeRange((e), d.dom.getOwnerDocument(e.parentElement()))
        } else {
            if (d.userAgent.WEBKIT) {
                return new d.dom.browserrange.WebKitRange((e))
            } else {
                if (d.userAgent.GECKO) {
                    return new d.dom.browserrange.GeckoRange((e))
                } else {
                    if (d.userAgent.OPERA) {
                        return new d.dom.browserrange.OperaRange((e))
                    } else {
                        return new d.dom.browserrange.W3cRange((e))
                    }
                }
            }
        }
    };
    d.dom.browserrange.createRangeFromNodeContents = function(e) {
        if (d.userAgent.IE && !d.userAgent.isDocumentMode(9)) {
            return d.dom.browserrange.IeRange.createFromNodeContents(e)
        } else {
            if (d.userAgent.WEBKIT) {
                return d.dom.browserrange.WebKitRange.createFromNodeContents(e)
            } else {
                if (d.userAgent.GECKO) {
                    return d.dom.browserrange.GeckoRange.createFromNodeContents(e)
                } else {
                    if (d.userAgent.OPERA) {
                        return d.dom.browserrange.OperaRange.createFromNodeContents(e)
                    } else {
                        return d.dom.browserrange.W3cRange.createFromNodeContents(e)
                    }
                }
            }
        }
    };
    d.dom.browserrange.createRangeFromNodes = function(y, w, e, x) {
        if (d.userAgent.IE && !d.userAgent.isDocumentMode(9)) {
            return d.dom.browserrange.IeRange.createFromNodes(y, w, e, x)
        } else {
            if (d.userAgent.WEBKIT) {
                return d.dom.browserrange.WebKitRange.createFromNodes(y, w, e, x)
            } else {
                if (d.userAgent.GECKO) {
                    return d.dom.browserrange.GeckoRange.createFromNodes(y, w, e, x)
                } else {
                    if (d.userAgent.OPERA) {
                        return d.dom.browserrange.OperaRange.createFromNodes(y, w, e, x)
                    } else {
                        return d.dom.browserrange.W3cRange.createFromNodes(y, w, e, x)
                    }
                }
            }
        }
    };
    d.dom.browserrange.canContainRangeEndpoint = function(e) {
        return d.dom.canHaveChildren(e) || e.nodeType == d.dom.NodeType.TEXT
    };
    d.provide("goog.dom.TextRange");
    d.dom.TextRange = function() {};
    d.inherits(d.dom.TextRange, d.dom.AbstractRange);
    d.dom.TextRange.createFromBrowserRange = function(e, w) {
        return d.dom.TextRange.createFromBrowserRangeWrapper_(d.dom.browserrange.createRange(e), w)
    };
    d.dom.TextRange.createFromBrowserRangeWrapper_ = function(x, w) {
        var e = new d.dom.TextRange();
        e.browserRangeWrapper_ = x;
        e.isReversed_ = !!w;
        return e
    };
    d.dom.TextRange.createFromNodeContents = function(w, e) {
        return d.dom.TextRange.createFromBrowserRangeWrapper_(d.dom.browserrange.createRangeFromNodeContents(w), e)
    };
    d.dom.TextRange.createFromNodes = function(x, z, A, e) {
        var w = new d.dom.TextRange();
        w.isReversed_ = d.dom.Range.isReversed(x, z, A, e);
        if (x.tagName == "BR") {
            var y = x.parentNode;
            z = d.array.indexOf(y.childNodes, x);
            x = y
        }
        if (A.tagName == "BR") {
            var y = A.parentNode;
            e = d.array.indexOf(y.childNodes, A);
            A = y
        }
        if (w.isReversed_) {
            w.startNode_ = A;
            w.startOffset_ = e;
            w.endNode_ = x;
            w.endOffset_ = z
        } else {
            w.startNode_ = x;
            w.startOffset_ = z;
            w.endNode_ = A;
            w.endOffset_ = e
        }
        return w
    };
    d.dom.TextRange.prototype.browserRangeWrapper_ = i;
    d.dom.TextRange.prototype.startNode_ = i;
    d.dom.TextRange.prototype.startOffset_ = i;
    d.dom.TextRange.prototype.endNode_ = i;
    d.dom.TextRange.prototype.endOffset_ = i;
    d.dom.TextRange.prototype.isReversed_ = c;
    d.dom.TextRange.prototype.clone = function() {
        var e = new d.dom.TextRange();
        e.browserRangeWrapper_ = this.browserRangeWrapper_;
        e.startNode_ = this.startNode_;
        e.startOffset_ = this.startOffset_;
        e.endNode_ = this.endNode_;
        e.endOffset_ = this.endOffset_;
        e.isReversed_ = this.isReversed_;
        return e
    };
    d.dom.TextRange.prototype.getType = function() {
        return d.dom.RangeType.TEXT
    };
    d.dom.TextRange.prototype.getBrowserRangeObject = function() {
        return this.getBrowserRangeWrapper_().getBrowserRange()
    };
    d.dom.TextRange.prototype.setBrowserRangeObject = function(e) {
        if (d.dom.AbstractRange.isNativeControlRange(e)) {
            return c
        }
        this.browserRangeWrapper_ = d.dom.browserrange.createRange(e);
        this.clearCachedValues_();
        return u
    };
    d.dom.TextRange.prototype.clearCachedValues_ = function() {
        this.startNode_ = this.startOffset_ = this.endNode_ = this.endOffset_ = i
    };
    d.dom.TextRange.prototype.getTextRangeCount = function() {
        return 1
    };
    d.dom.TextRange.prototype.getTextRange = function(e) {
        return this
    };
    d.dom.TextRange.prototype.getBrowserRangeWrapper_ = function() {
        return this.browserRangeWrapper_ || (this.browserRangeWrapper_ = d.dom.browserrange.createRangeFromNodes(this.getStartNode(), this.getStartOffset(), this.getEndNode(), this.getEndOffset()))
    };
    d.dom.TextRange.prototype.getContainer = function() {
        return this.getBrowserRangeWrapper_().getContainer()
    };
    d.dom.TextRange.prototype.getStartNode = function() {
        return this.startNode_ || (this.startNode_ = this.getBrowserRangeWrapper_().getStartNode())
    };
    d.dom.TextRange.prototype.getStartOffset = function() {
        return this.startOffset_ != i ? this.startOffset_ : (this.startOffset_ = this.getBrowserRangeWrapper_().getStartOffset())
    };
    d.dom.TextRange.prototype.getEndNode = function() {
        return this.endNode_ || (this.endNode_ = this.getBrowserRangeWrapper_().getEndNode())
    };
    d.dom.TextRange.prototype.getEndOffset = function() {
        return this.endOffset_ != i ? this.endOffset_ : (this.endOffset_ = this.getBrowserRangeWrapper_().getEndOffset())
    };
    d.dom.TextRange.prototype.moveToNodes = function(y, w, e, x, z) {
        this.startNode_ = y;
        this.startOffset_ = w;
        this.endNode_ = e;
        this.endOffset_ = x;
        this.isReversed_ = z;
        this.browserRangeWrapper_ = i
    };
    d.dom.TextRange.prototype.isReversed = function() {
        return this.isReversed_
    };
    d.dom.TextRange.prototype.containsRange = function(z, y) {
        var e = z.getType();
        if (e == d.dom.RangeType.TEXT) {
            return this.getBrowserRangeWrapper_().containsRange(z.getBrowserRangeWrapper_(), y)
        } else {
            if (e == d.dom.RangeType.CONTROL) {
                var x = z.getElements();
                var w = y ? d.array.some : d.array.every;
                return w(x, function(A) {
                    return this.containsNode(A, y)
                }, this)
            }
        }
        return c
    };
    d.dom.TextRange.isAttachedNode = function(x) {
        if (d.userAgent.IE && !d.userAgent.isDocumentMode(9)) {
            var w = c;
            try {
                w = x.parentNode
            } catch (y) {}
            return !!w
        } else {
            return d.dom.contains(x.ownerDocument.body, x)
        }
    };
    d.dom.TextRange.prototype.isRangeInDocument = function() {
        return (!this.startNode_ || d.dom.TextRange.isAttachedNode(this.startNode_)) && (!this.endNode_ || d.dom.TextRange.isAttachedNode(this.endNode_)) && (!(d.userAgent.IE && !d.userAgent.isDocumentMode(9)) || this.getBrowserRangeWrapper_().isRangeInDocument())
    };
    d.dom.TextRange.prototype.isCollapsed = function() {
        return this.getBrowserRangeWrapper_().isCollapsed()
    };
    d.dom.TextRange.prototype.getText = function() {
        return this.getBrowserRangeWrapper_().getText()
    };
    d.dom.TextRange.prototype.getHtmlFragment = function() {
        return this.getBrowserRangeWrapper_().getHtmlFragment()
    };
    d.dom.TextRange.prototype.getValidHtml = function() {
        return this.getBrowserRangeWrapper_().getValidHtml()
    };
    d.dom.TextRange.prototype.getPastableHtml = function() {
        var w = this.getValidHtml();
        if (w.match(/^\s*<td\b/i)) {
            w = "<table><tbody><tr>" + w + "</tr></tbody></table>"
        } else {
            if (w.match(/^\s*<tr\b/i)) {
                w = "<table><tbody>" + w + "</tbody></table>"
            } else {
                if (w.match(/^\s*<tbody\b/i)) {
                    w = "<table>" + w + "</table>"
                } else {
                    if (w.match(/^\s*<li\b/i)) {
                        var e = this.getContainer();
                        var x = d.dom.TagName.UL;
                        while (e) {
                            if (e.tagName == d.dom.TagName.OL) {
                                x = d.dom.TagName.OL;
                                break
                            } else {
                                if (e.tagName == d.dom.TagName.UL) {
                                    break
                                }
                            }
                            e = e.parentNode
                        }
                        w = d.string.buildString("<", x, ">", w, "</", x, ">")
                    }
                }
            }
        }
        return w
    };
    d.dom.TextRange.prototype.__iterator__ = function(e) {
        return new d.dom.TextRangeIterator(this.getStartNode(), this.getStartOffset(), this.getEndNode(), this.getEndOffset())
    };
    d.dom.TextRange.prototype.select = function() {
        this.getBrowserRangeWrapper_().select(this.isReversed_)
    };
    d.dom.TextRange.prototype.removeContents = function() {
        this.getBrowserRangeWrapper_().removeContents();
        this.clearCachedValues_()
    };
    d.dom.TextRange.prototype.surroundContents = function(w) {
        var e = this.getBrowserRangeWrapper_().surroundContents(w);
        this.clearCachedValues_();
        return e
    };
    d.dom.TextRange.prototype.insertNode = function(w, x) {
        var e = this.getBrowserRangeWrapper_().insertNode(w, x);
        this.clearCachedValues_();
        return e
    };
    d.dom.TextRange.prototype.surroundWithNodes = function(w, e) {
        this.getBrowserRangeWrapper_().surroundWithNodes(w, e);
        this.clearCachedValues_()
    };
    d.dom.TextRange.prototype.saveUsingDom = function() {
        return new d.dom.DomSavedTextRange_(this)
    };
    d.dom.TextRange.prototype.collapse = function(w) {
        var e = this.isReversed() ? !w : w;
        if (this.browserRangeWrapper_) {
            this.browserRangeWrapper_.collapse(e)
        }
        if (e) {
            this.endNode_ = this.startNode_;
            this.endOffset_ = this.startOffset_
        } else {
            this.startNode_ = this.endNode_;
            this.startOffset_ = this.endOffset_
        }
        this.isReversed_ = c
    };
    d.dom.DomSavedTextRange_ = function(e) {
        this.anchorNode_ = e.getAnchorNode();
        this.anchorOffset_ = e.getAnchorOffset();
        this.focusNode_ = e.getFocusNode();
        this.focusOffset_ = e.getFocusOffset()
    };
    d.inherits(d.dom.DomSavedTextRange_, d.dom.SavedRange);
    d.dom.DomSavedTextRange_.prototype.restoreInternal = function() {
        return d.dom.Range.createFromNodes(this.anchorNode_, this.anchorOffset_, this.focusNode_, this.focusOffset_)
    };
    d.dom.DomSavedTextRange_.prototype.disposeInternal = function() {
        d.dom.DomSavedTextRange_.superClass_.disposeInternal.call(this);
        this.anchorNode_ = i;
        this.focusNode_ = i
    };
    d.provide("goog.dom.MultiRange");
    d.provide("goog.dom.MultiRangeIterator");
    d.dom.MultiRange = function() {
        this.browserRanges_ = [];
        this.ranges_ = [];
        this.sortedRanges_ = i;
        this.container_ = i
    };
    d.inherits(d.dom.MultiRange, d.dom.AbstractMultiRange);
    d.dom.MultiRange.createFromBrowserSelection = function(y) {
        var w = new d.dom.MultiRange();
        for (var x = 0, e = y.rangeCount; x < e; x++) {
            w.browserRanges_.push(y.getRangeAt(x))
        }
        return w
    };
    d.dom.MultiRange.createFromBrowserRanges = function(w) {
        var e = new d.dom.MultiRange();
        e.browserRanges_ = d.array.clone(w);
        return e
    };
    d.dom.MultiRange.createFromTextRanges = function(w) {
        var e = new d.dom.MultiRange();
        e.ranges_ = w;
        e.browserRanges_ = w.map(function(x) {
            return x.getBrowserRangeObject()
        });
        return e
    };
    d.dom.MultiRange.prototype.clearCachedValues_ = function() {
        this.ranges_ = [];
        this.sortedRanges_ = i;
        this.container_ = i
    };
    d.dom.MultiRange.prototype.clone = function() {
        return d.dom.MultiRange.createFromBrowserRanges(this.browserRanges_)
    };
    d.dom.MultiRange.prototype.getType = function() {
        return d.dom.RangeType.MULTI
    };
    d.dom.MultiRange.prototype.getBrowserRangeObject = function() {
        return this.browserRanges_[0]
    };
    d.dom.MultiRange.prototype.setBrowserRangeObject = function(e) {
        return c
    };
    d.dom.MultiRange.prototype.getTextRangeCount = function() {
        return this.browserRanges_.length
    };
    d.dom.MultiRange.prototype.getTextRange = function(e) {
        if (!this.ranges_[e]) {
            this.ranges_[e] = d.dom.TextRange.createFromBrowserRange(this.browserRanges_[e])
        }
        return this.ranges_[e]
    };
    d.dom.MultiRange.prototype.getContainer = function() {
        if (!this.container_) {
            var w = [];
            for (var x = 0, e = this.getTextRangeCount(); x < e; x++) {
                w.push(this.getTextRange(x).getContainer())
            }
            this.container_ = d.dom.findCommonAncestor.apply(i, w)
        }
        return this.container_
    };
    d.dom.MultiRange.prototype.getSortedRanges = function() {
        if (!this.sortedRanges_) {
            this.sortedRanges_ = this.getTextRanges();
            this.sortedRanges_.sort(function(w, e) {
                var y = w.getStartNode();
                var z = w.getStartOffset();
                var x = e.getStartNode();
                var A = e.getStartOffset();
                if (y == x && z == A) {
                    return 0
                }
                return d.dom.Range.isReversed(y, z, x, A) ? 1 : -1
            })
        }
        return this.sortedRanges_
    };
    d.dom.MultiRange.prototype.getStartNode = function() {
        return this.getSortedRanges()[0].getStartNode()
    };
    d.dom.MultiRange.prototype.getStartOffset = function() {
        return this.getSortedRanges()[0].getStartOffset()
    };
    d.dom.MultiRange.prototype.getEndNode = function() {
        return this.getSortedRanges().last().getEndNode()
    };
    d.dom.MultiRange.prototype.getEndOffset = function() {
        return this.getSortedRanges().last().getEndOffset()
    };
    d.dom.MultiRange.prototype.isRangeInDocument = function() {
        return this.getTextRanges().every(function(e) {
            return e.isRangeInDocument()
        })
    };
    d.dom.MultiRange.prototype.isCollapsed = function() {
        return this.browserRanges_.length == 0 || this.browserRanges_.length == 1 && this.getTextRange(0).isCollapsed()
    };
    d.dom.MultiRange.prototype.getText = function() {
        return this.getTextRanges().map(function(e) {
            return e.getText()
        }).join("")
    };
    d.dom.MultiRange.prototype.getHtmlFragment = function() {
        return this.getValidHtml()
    };
    d.dom.MultiRange.prototype.getValidHtml = function() {
        return this.getTextRanges().map(function(e) {
            return e.getValidHtml()
        }).join("")
    };
    d.dom.MultiRange.prototype.getPastableHtml = function() {
        return this.getValidHtml()
    };
    d.dom.MultiRange.prototype.__iterator__ = function(e) {
        return new d.dom.MultiRangeIterator(this)
    };
    d.dom.MultiRange.prototype.select = function() {
        var x = d.dom.AbstractRange.getBrowserSelectionForWindow(this.getWindow());
        x.removeAllRanges();
        for (var w = 0, e = this.getTextRangeCount(); w < e; w++) {
            x.addRange(this.getTextRange(w).getBrowserRangeObject())
        }
    };
    d.dom.MultiRange.prototype.removeContents = function() {
        this.getTextRanges().each(function(e) {
            e.removeContents()
        })
    };
    d.dom.MultiRange.prototype.saveUsingDom = function() {
        return new d.dom.DomSavedMultiRange_(this)
    };
    d.dom.MultiRange.prototype.collapse = function(w) {
        if (!this.isCollapsed()) {
            var e = w ? this.getTextRange(0) : this.getTextRange(this.getTextRangeCount() - 1);
            this.clearCachedValues_();
            e.collapse(w);
            this.ranges_ = [e];
            this.sortedRanges_ = [e];
            this.browserRanges_ = [e.getBrowserRangeObject()]
        }
    };
    d.dom.DomSavedMultiRange_ = function(e) {
        this.savedRanges_ = e.getTextRanges().map(function(w) {
            return w.saveUsingDom()
        })
    };
    d.inherits(d.dom.DomSavedMultiRange_, d.dom.SavedRange);
    d.dom.DomSavedMultiRange_.prototype.restoreInternal = function() {
        var e = this.savedRanges_.map(function(w) {
            return w.restore()
        });
        return d.dom.MultiRange.createFromTextRanges(e)
    };
    d.dom.DomSavedMultiRange_.prototype.disposeInternal = function() {
        d.dom.DomSavedMultiRange_.superClass_.disposeInternal.call(this);
        this.savedRanges_.map(function(e) {
            e.dispose()
        });
        delete this.savedRanges_
    };
    d.dom.MultiRangeIterator = function(e) {
        if (e) {
            this.iterators_ = e.getSortedRanges().map(function(w) {
                return d.iter.toIterator(w)
            })
        }
        d.dom.RangeIterator.call(this, e ? this.getStartNode() : i, c)
    };
    d.inherits(d.dom.MultiRangeIterator, d.dom.RangeIterator);
    d.dom.MultiRangeIterator.prototype.iterators_ = i;
    d.dom.MultiRangeIterator.prototype.currentIdx_ = 0;
    d.dom.MultiRangeIterator.prototype.getStartTextOffset = function() {
        return this.iterators_[this.currentIdx_].getStartTextOffset()
    };
    d.dom.MultiRangeIterator.prototype.getEndTextOffset = function() {
        return this.iterators_[this.currentIdx_].getEndTextOffset()
    };
    d.dom.MultiRangeIterator.prototype.getStartNode = function() {
        return this.iterators_[0].getStartNode()
    };
    d.dom.MultiRangeIterator.prototype.getEndNode = function() {
        return this.iterators_.last().getEndNode()
    };
    d.dom.MultiRangeIterator.prototype.isLast = function() {
        return this.iterators_[this.currentIdx_].isLast()
    };
    d.dom.MultiRangeIterator.prototype.next = function() {
        try {
            var x = this.iterators_[this.currentIdx_];
            var w = x.next();
            this.setPosition(x.node, x.tagType, x.depth);
            return w
        } catch (e) {
            if (e !== d.iter.StopIteration || this.iterators_.length - 1 == this.currentIdx_) {
                throw e
            } else {
                this.currentIdx_++;
                return this.next()
            }
        }
    };
    d.dom.MultiRangeIterator.prototype.copyFrom = function(e) {
        this.iterators_ = d.array.clone(e.iterators_);
        d.dom.MultiRangeIterator.superClass_.copyFrom.call(this, e)
    };
    d.dom.MultiRangeIterator.prototype.clone = function() {
        var e = new d.dom.MultiRangeIterator(i);
        e.copyFrom(this);
        return e
    };
    d.provide("goog.dom.ControlRange");
    d.provide("goog.dom.ControlRangeIterator");
    d.dom.ControlRange = function() {};
    d.inherits(d.dom.ControlRange, d.dom.AbstractMultiRange);
    d.dom.ControlRange.createFromBrowserRange = function(w) {
        var e = new d.dom.ControlRange();
        e.range_ = w;
        return e
    };
    d.dom.ControlRange.createFromElements = function(y) {
        var w = d.dom.getOwnerDocument(arguments[0]).body.createControlRange();
        for (var x = 0, e = arguments.length; x < e; x++) {
            w.addElement(arguments[x])
        }
        return d.dom.ControlRange.createFromBrowserRange(w)
    };
    d.dom.ControlRange.prototype.range_ = i;
    d.dom.ControlRange.prototype.elements_ = i;
    d.dom.ControlRange.prototype.sortedElements_ = i;
    d.dom.ControlRange.prototype.clearCachedValues_ = function() {
        this.elements_ = i;
        this.sortedElements_ = i
    };
    d.dom.ControlRange.prototype.clone = function() {
        return d.dom.ControlRange.createFromElements.apply(this, this.getElements())
    };
    d.dom.ControlRange.prototype.getType = function() {
        return d.dom.RangeType.CONTROL
    };
    d.dom.ControlRange.prototype.getBrowserRangeObject = function() {
        return this.range_ || b.body.createControlRange()
    };
    d.dom.ControlRange.prototype.setBrowserRangeObject = function(e) {
        if (!d.dom.AbstractRange.isNativeControlRange(e)) {
            return c
        }
        this.range_ = e;
        return u
    };
    d.dom.ControlRange.prototype.getTextRangeCount = function() {
        return this.range_ ? this.range_.length : 0
    };
    d.dom.ControlRange.prototype.getTextRange = function(e) {
        return d.dom.TextRange.createFromNodeContents(this.range_.item(e))
    };
    d.dom.ControlRange.prototype.getContainer = function() {
        return d.dom.findCommonAncestor.apply(i, this.getElements())
    };
    d.dom.ControlRange.prototype.getStartNode = function() {
        return this.getSortedElements()[0]
    };
    d.dom.ControlRange.prototype.getStartOffset = function() {
        return 0
    };
    d.dom.ControlRange.prototype.getEndNode = function() {
        var w = this.getSortedElements();
        var e = (w.last());
        return (w.find(function(x) {
            return d.dom.contains(x, e)
        }))
    };
    d.dom.ControlRange.prototype.getEndOffset = function() {
        return this.getEndNode().childNodes.length
    };
    d.dom.ControlRange.prototype.getElements = function() {
        if (!this.elements_) {
            this.elements_ = [];
            if (this.range_) {
                for (var e = 0; e < this.range_.length; e++) {
                    this.elements_.push(this.range_.item(e))
                }
            }
        }
        return this.elements_
    };
    d.dom.ControlRange.prototype.getSortedElements = function() {
        if (!this.sortedElements_) {
            this.sortedElements_ = this.getElements().concat();
            this.sortedElements_.sort(function(w, e) {
                return w.sourceIndex - e.sourceIndex
            })
        }
        return this.sortedElements_
    };
    d.dom.ControlRange.prototype.isRangeInDocument = function() {
        var w = c;
        try {
            w = this.getElements().every(function(e) {
                return d.userAgent.IE ? e.parentNode : d.dom.contains(e.ownerDocument.body, e)
            })
        } catch (x) {}
        return w
    };
    d.dom.ControlRange.prototype.isCollapsed = function() {
        return !this.range_ || !this.range_.length
    };
    d.dom.ControlRange.prototype.getText = function() {
        return ""
    };
    d.dom.ControlRange.prototype.getHtmlFragment = function() {
        return this.getSortedElements().map(d.dom.getOuterHtml).join("")
    };
    d.dom.ControlRange.prototype.getValidHtml = function() {
        return this.getHtmlFragment()
    };
    d.dom.ControlRange.prototype.getPastableHtml = d.dom.ControlRange.prototype.getValidHtml;
    d.dom.ControlRange.prototype.__iterator__ = function(e) {
        return new d.dom.ControlRangeIterator(this)
    };
    d.dom.ControlRange.prototype.select = function() {
        if (this.range_) {
            this.range_.select()
        }
    };
    d.dom.ControlRange.prototype.removeContents = function() {
        if (this.range_) {
            var w = [];
            for (var x = 0, e = this.range_.length; x < e; x++) {
                w.push(this.range_.item(x))
            }
            w.each(d.dom.removeNode);
            this.collapse(c)
        }
    };
    d.dom.ControlRange.prototype.saveUsingDom = function() {
        return new d.dom.DomSavedControlRange_(this)
    };
    d.dom.ControlRange.prototype.collapse = function(e) {
        this.range_ = i;
        this.clearCachedValues_()
    };
    d.dom.DomSavedControlRange_ = function(e) {
        this.elements_ = e.getElements()
    };
    d.inherits(d.dom.DomSavedControlRange_, d.dom.SavedRange);
    d.dom.DomSavedControlRange_.prototype.restoreInternal = function() {
        var y = this.elements_.length ? d.dom.getOwnerDocument(this.elements_[0]) : document;
        var x = y.body.createControlRange();
        for (var w = 0, e = this.elements_.length; w < e; w++) {
            x.addElement(this.elements_[w])
        }
        return d.dom.ControlRange.createFromBrowserRange(x)
    };
    d.dom.DomSavedControlRange_.prototype.disposeInternal = function() {
        d.dom.DomSavedControlRange_.superClass_.disposeInternal.call(this);
        delete this.elements_
    };
    d.dom.ControlRangeIterator = function(e) {
        if (e) {
            this.elements_ = e.getSortedElements();
            this.startNode_ = this.elements_.shift();
            this.endNode_ = (this.elements_.last()) || this.startNode_
        }
        d.dom.RangeIterator.call(this, this.startNode_, c)
    };
    d.inherits(d.dom.ControlRangeIterator, d.dom.RangeIterator);
    d.dom.ControlRangeIterator.prototype.startNode_ = i;
    d.dom.ControlRangeIterator.prototype.endNode_ = i;
    d.dom.ControlRangeIterator.prototype.elements_ = i;
    d.dom.ControlRangeIterator.prototype.getStartTextOffset = function() {
        return 0
    };
    d.dom.ControlRangeIterator.prototype.getEndTextOffset = function() {
        return 0
    };
    d.dom.ControlRangeIterator.prototype.getStartNode = function() {
        return this.startNode_
    };
    d.dom.ControlRangeIterator.prototype.getEndNode = function() {
        return this.endNode_
    };
    d.dom.ControlRangeIterator.prototype.isLast = function() {
        return !this.depth && !this.elements_.length
    };
    d.dom.ControlRangeIterator.prototype.next = function() {
        if (this.isLast()) {
            throw d.iter.StopIteration
        } else {
            if (!this.depth) {
                var e = this.elements_.shift();
                this.setPosition(e, d.dom.TagWalkType.START_TAG, d.dom.TagWalkType.START_TAG);
                return e
            }
        }
        return d.dom.ControlRangeIterator.superClass_.next.call(this)
    };
    d.dom.ControlRangeIterator.prototype.copyFrom = function(e) {
        this.elements_ = e.elements_;
        this.startNode_ = e.startNode_;
        this.endNode_ = e.endNode_;
        d.dom.ControlRangeIterator.superClass_.copyFrom.call(this, e)
    };
    d.dom.ControlRangeIterator.prototype.clone = function() {
        var e = new d.dom.ControlRangeIterator(i);
        e.copyFrom(this);
        return e
    };
    d.provide("goog.dom.Range");
    d.dom.Range.createFromWindow = function(w) {
        var e = d.dom.AbstractRange.getBrowserSelectionForWindow(w || window);
        return e && d.dom.Range.createFromBrowserSelection(e)
    };
    d.dom.Range.createFromBrowserSelection = function(x) {
        var w;
        var y = c;
        if (x.createRange) {
            try {
                w = x.createRange()
            } catch (z) {
                return i
            }
        } else {
            if (x.rangeCount) {
                if (x.rangeCount > 1) {
                    return d.dom.MultiRange.createFromBrowserSelection((x))
                } else {
                    w = x.getRangeAt(0);
                    y = d.dom.Range.isReversed(x.anchorNode, x.anchorOffset, x.focusNode, x.focusOffset)
                }
            } else {
                return i
            }
        }
        return d.dom.Range.createFromBrowserRange(w, y)
    };
    d.dom.Range.createFromBrowserRange = function(e, w) {
        return d.dom.AbstractRange.isNativeControlRange(e) ? d.dom.ControlRange.createFromBrowserRange(e) : d.dom.TextRange.createFromBrowserRange(e, w)
    };
    d.dom.Range.createFromNodeContents = function(w, e) {
        return d.dom.TextRange.createFromNodeContents(w, e)
    };
    d.dom.Range.createCaret = function(e, w) {
        return d.dom.TextRange.createFromNodes(e, w, e, w)
    };
    d.dom.Range.createFromNodes = function(y, w, e, x) {
        return d.dom.TextRange.createFromNodes(y, w, e, x)
    };
    d.dom.Range.clearSelection = function(x) {
        var w = d.dom.AbstractRange.getBrowserSelectionForWindow(x || window);
        if (!w) {
            return
        }
        if (w.empty) {
            try {
                w.empty()
            } catch (y) {}
        } else {
            w.removeAllRanges()
        }
    };
    d.dom.Range.isReversed = function(w, x, y, e) {
        if (w == y) {
            return e < x
        }
        var z;
        if (w.nodeType == d.dom.NodeType.ELEMENT && x) {
            z = w.childNodes[x];
            if (z) {
                w = z;
                x = 0
            } else {
                if (d.dom.contains(w, y)) {
                    return u
                }
            }
        }
        if (y.nodeType == d.dom.NodeType.ELEMENT && e) {
            z = y.childNodes[e];
            if (z) {
                y = z;
                e = 0
            } else {
                if (d.dom.contains(y, w)) {
                    return c
                }
            }
        }
        return (d.dom.compareNodeOrder(w, y) || x - e) > 0
    };
    d.provide("export_dep");
    h.tx = {};

    function a(w, y) {
        for (var x = 0, e = w.length; x < e; x++) {
            y(w[x])
        }
    }
    h.installHyperscript = function(w, e) {
        a("a big blockquote br b center code dd dl dt div em font form h1 h2 h3 h4 h5 h6 hr img iframe input i li ol option pre p script select small span strike strong style sub sup table tbody td textarea tr ul u".split(" "), function(x) {
            w[x] = function() {
                var y = e.createElement(x);
                a(arguments, function(A) {
                    if (A.nodeType) {
                        y.appendChild(A)
                    } else {
                        if (typeof A == "string" || typeof A == "number") {
                            if (x == "textarea") {
                                if (t.msie) {
                                    y.value += A
                                } else {
                                    y.text += A
                                }
                            } else {
                                y.innerHTML += A
                            }
                        } else {
                            if (typeof A == "array") {
                                for (var C = 0; C < A.length; C++) {
                                    y.appendChild(A[C])
                                }
                            } else {
                                for (var z in A) {
                                    if (z == "style") {
                                        for (var B in A[z]) {
                                            if ((B == "float" || B == "cssFloat")) {
                                                y[z][y[z].styleFloat === q ? "cssFloat" : "styleFloat"] = A[z][B]
                                            } else {
                                                y[z][B] = A[z][B]
                                            }
                                        }
                                    } else {
                                        if (["more", "less", "longDesc"].contains(z)) {
                                            if (y.setAttribute) {
                                                y.setAttribute(z, A[z])
                                            }
                                        } else {
                                            if (["colSpan", "rowSpan", "cellPadding", "cellSpacing"].contains(z)) {
                                                if (y.setAttribute) {
                                                    y.setAttribute(z, A[z])
                                                }
                                            } else {
                                                if (A[z]) {
                                                    y[z] = A[z]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
                return y
            }
        })
    };
    installHyperscript(h.tx, b);
    (function() {
        function w(y, x) {
            if (!y) {
                return ""
            }
            if (x.indexOf("{if:") > -1) {
                x = x.replace(/#\{if:([_\w]+)([=><!]+)([_'"\-\w]+)\}([\s\S]*?)#\{\/if:\1\}/gm, function(D, A, C, G, F) {
                    if (y[A] == i) {
                        return D
                    }
                    var B = c;
                    try {
                        C = ((C == "=") ? "==" : C);
                        var H = '"' + (y[A] + "").replace(/['"]/g, "") + '"';
                        var z = '"' + G.replace(/['"]/g, "") + '"';
                        B = txEval("(" + H + C + z + ")")
                    } catch (E) {
                        B = c
                    }
                    if (B) {
                        return w(y, F)
                    } else {
                        return ""
                    }
                })
            }
            if (x.indexOf("{for:") > -1) {
                x = x.replace(/#\{for:([_\w]+):?(\d*):?(\d*)\}([\s\S]*?)#\{\/for:\1\}/gm, function(G, z, H, B, E) {
                    if (!y[z] || !y[z].length) {
                        return G
                    }
                    var C = y[z];
                    var A = [];
                    H = !!H ? (isNaN(H) ? C.length : parseInt(H)) : C.length;
                    B = !!B ? (isNaN(B) ? 0 : parseInt(B)) : 0;
                    for (var D = 0, F = Math.min(C.length, H); D < F; D++) {
                        A.push(w(C[D], E))
                    }
                    return A.join("").substring(B)
                })
            }
            return x.replace(/#\{([_\w]+)\}/g, function(A, z) {
                if (y[z] != i) {
                    return y[z]
                } else {
                    return A
                }
            })
        }
        var e = h.Template = function(x) {
            this.template = x
        };
        e.prototype = {
            evaluate: function(x) {
                return w(x, this.template)
            },
            evaluateToDom: function(y, x) {
                if (typeof(x) === "string") {
                    x = b.getElementById(x)
                }
                x.innerHTML = w(y, this.template)
            },
            evaluateAsDom: function(z, y) {
                var x = (y || document).createElement("div");
                x.innerHTML = w(z, this.template);
                return x.firstChild
            }
        }
    })();
    (function() {
        var e, z, x;
        var A = {
            "#": function(D, E) {
                if ((e = /(\S*)#(\S+)/.exec(E)) !== i) {
                    var C = e[1];
                    var F = e[2];
                    if (!D.getElementById) {
                        D = D.ownerDocument
                    }
                    if (z = D.getElementById(F)) {
                        if (C.length < 1 || z.nodeName.toLowerCase() == C) {
                            return [z]
                        }
                    }
                }
                return []
            },
            ".": function(E, I) {
                if ((e = /(\S*)\.(\S+)/.exec(I)) !== i) {
                    var D = ((e[1] === "") ? "*" : e[1]);
                    var C = e[2];
                    if ((x = E.getElementsByTagName(D)).length > 0) {
                        var G = [];
                        for (var F = 0; F < x.length; F++) {
                            var H = x[F];
                            if ((new RegExp("(^| )" + C + "($| )")).test(H.className)) {
                                G.push(H)
                            }
                        }
                        return G
                    }
                }
                return []
            },
            "*": function(C, F) {
                if ((x = C.getElementsByTagName(F)).length > 0) {
                    var E = [];
                    for (var D = 0; D < x.length; D++) {
                        E.push(x[D])
                    }
                    return E
                }
                return []
            }
        };
        var w = function(C, G) {
            if (C.length < 1) {
                return []
            }
            var F;
            if ((f = /(\.|#)/.exec(G)) !== i) {
                if (A[f[1]]) {
                    F = f[1]
                }
            }
            F = F || "*";
            var E = [];
            for (var D = 0; D < C.length; D++) {
                E = E.concat(A[F](C[D], G))
            }
            return E
        };
        var B = function(C, F) {
            var E = [C];
            var G = F.split(" ");
            for (var D = 0; D < G.length; D++) {
                E = w(E, G[D])
            }
            return E
        };
        var y = function(F, C, G) {
            G = !!G;
            if (F.nodeType !== 1 && F.nodeType !== 9) {
                return (G ? [] : i)
            }
            if (!C || typeof C !== "string") {
                return (G ? [] : i)
            }
            var E;
            var H = [];
            var I = C.split(",");
            for (var D = 0; D < I.length; D++) {
                E = B(F, I[D]);
                if (E && E.length > 0) {
                    H = H.concat(E);
                    if (!G) {
                        break
                    }
                }
            }
            if (G) {
                return H
            } else {
                return H[0]
            }
        };
        h.dGetty = function() {
            var C = arguments;
            if (C.length == 1) {
                if (typeof(C[0]) === "string") {
                    return y(b, C[0])
                }
            } else {
                if (C.length == 2) {
                    if (C[0].nodeType && typeof(C[1]) === "string") {
                        return y(C[0], C[1])
                    }
                }
            }
            return i
        };
        h.dGetties = function() {
            var C = arguments;
            if (C.length == 1) {
                if (typeof(C[0]) === "string") {
                    return y(b, C[0], u)
                }
            } else {
                if (C.length == 2) {
                    if (C[0].nodeType && typeof(C[1]) === "string") {
                        return y(C[0], C[1], u)
                    }
                }
            }
            return []
        }
    })();
    (function() {
        var e, z, x;
        var A = {
            "#": function(C, D) {
                if ((e = /(\S*)#(\S+)/.exec(D)) !== i) {
                    var B = e[1];
                    var E = e[2];
                    if (B.length < 1 || C.nodeName.toLowerCase() == B) {
                        if (C.id == E) {
                            return u
                        }
                    }
                }
                return c
            },
            ".": function(D, E) {
                if ((e = /(\S*)\.(\S+)/.exec(E)) !== i) {
                    var C = e[1];
                    var B = e[2];
                    if (C.length < 1 || D.nodeName.toLowerCase() == C) {
                        if (D.className.indexOf(B) > -1) {
                            return u
                        }
                    }
                }
                return c
            },
            "*": function(C, D) {
                var B = D;
                if (C.nodeName.toLowerCase() == B) {
                    return u
                }
                return c
            }
        };
        var w = function(B, D) {
            var C;
            if ((f = /(\.|#)/.exec(D)) !== i) {
                if (A[f[1]]) {
                    C = f[1]
                }
            }
            C = C || "*";
            return A[C](B, D)
        };
        var y = function(D, B) {
            if (D.nodeType !== 1) {
                return c
            }
            var E = c;
            var F = B.split(",");
            for (var C = 0; C < F.length; C++) {
                E = w(D, F[C]);
                if (E) {
                    break
                }
            }
            return E
        };
        h.dChecky = function() {
            var B = arguments;
            if (B.length == 2) {
                if (B[0].nodeType && typeof(B[1]) === "string") {
                    return y(B[0], B[1])
                }
            }
            return c
        }
    })();
    (function() {
        var e, y, x;
        var z = {
            "#": function(C, E) {
                if ((e = /(\S*)#(\S+)/.exec(E)) !== i) {
                    var B = ((e[1] === "") ? "*" : e[1]);
                    var F = e[2];
                    var D = C;
                    while (D) {
                        if (D.nodeName.toLowerCase() == "body") {
                            break
                        }
                        if (B == "*" || D.nodeName.toLowerCase() == B) {
                            if (D.id == F) {
                                return D
                            }
                        }
                        D = D.parentNode
                    }
                }
                return i
            },
            ".": function(D, F) {
                if ((e = /(\S*)\.(\S+)/.exec(F)) !== i) {
                    var C = ((e[1] === "") ? "*" : e[1]);
                    var B = e[2];
                    var E = D;
                    while (E) {
                        if (E.nodeName.toLowerCase() == "body") {
                            break
                        }
                        if (C == "*" || E.nodeName.toLowerCase() == C) {
                            if (E.className.indexOf(B) > -1) {
                                return E
                            }
                        }
                        E = E.parentNode
                    }
                }
                return i
            },
            "*": function(C, G) {
                var E = C;
                var F = {};
                var H = G.split(",");
                for (var D = 0, B = H.length; D < B; D++) {
                    F[H[D]] = u
                }
                while (E) {
                    if (E.nodeName.toLowerCase() == "body") {
                        break
                    }
                    if (F[E.nodeName.toLowerCase()]) {
                        return E
                    }
                    E = E.parentNode
                }
                return i
            }
        };
        var A = function(C, E) {
            var D;
            if ((f = /(\.|#|:\w+)/.exec(E)) !== i) {
                if (z[f[1]]) {
                    D = f[1]
                }
            }
            D = D || "*";
            var B = i;
            if ((B = z[D](C, E)) != i) {
                return B
            }
            return i
        };
        var w = function(F, C) {
            if (!C || typeof C !== "string") {
                return i
            }
            var E = F;
            var G = C.split(" ");
            for (var D = 0, B = G.length; D < B; D++) {
                if ((E = A(E, G[D])) == i) {
                    return i
                }
            }
            return E
        };
        h.dFindy = function() {
            var B = arguments;
            if (B.length == 1) {
                throw new Error("need more arguments")
            } else {
                if (B.length == 2) {
                    if (B[0].nodeType && typeof(B[1]) === "string") {
                        return w(B[0], B[1])
                    }
                }
            }
            return i
        }
    })();
    (function() {
        var e = function(x) {
            this.selectSingleNode = function(y) {
                if (!x) {
                    return i
                }
                return x.selectSingleNode(y)
            };
            this.selectNodes = function(y) {
                if (!x) {
                    return []
                }
                return x.selectNodes(y)
            };
            this.getAttributeNode = function(y) {
                if (!x) {
                    return i
                }
                return x.getAttributeNode(y)
            };
            this.hasChildNodes = function() {
                if (!x) {
                    return c
                }
                return x.hasChildNodes()
            };
            this.text = x ? (x.textContent || x.text) : i;
            this.type = x ? x.nodeType : 0;
            this.name = (x && x.nodeType == 1) ? (x.nodeName || "") : "";
            return this
        };
        e.prototype = {
            getValueOrDefault: function(y, x) {
                if (y === "") {
                    return x
                } else {
                    if (typeof(x) === "number") {
                        return (isNaN(y) ? 0 : parseInt(y))
                    } else {
                        if (typeof(x) === "boolean") {
                            return !!y
                        } else {
                            return y
                        }
                    }
                }
            },
            xText: function(x) {
                x = x || "";
                var y = this.text;
                y = (y || "").trim();
                return this.getValueOrDefault(y, x)
            },
            xAttr: function(z, y) {
                y = y || "";
                var x = this.getAttributeNode(z);
                var A = (!x) ? "" : x.nodeValue.trim();
                return this.getValueOrDefault(A, y)
            },
            xGet: function(x) {
                return xGetty(this, x)
            },
            xGets: function(x) {
                return xGetties(this, x)
            }
        };
        var w = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "MSXML4.DOMDocument", "MSXML3.DOMDocument", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XmlDom"];
        h.xCreate = function(z) {
            if (t.msie) {
                var y = (function() {
                    var B = i;
                    for (var A = 0; A < w.length; A++) {
                        try {
                            B = new ActiveXObject(w[A])
                        } catch (C) {}
                        if (B !== i) {
                            return B
                        }
                    }
                    return i
                })();
                if (y === i) {
                    return i
                }
                y.async = c;
                y.loadXML(z);
                if (y.parseError.errorCode !== 0) {
                    return i
                }
                return new e(y)
            } else {
                var x = new DOMParser();
                var y = x.parseFromString(new String(z), "text/xml");
                return new e(y)
            }
        };
        h.xGetty = function(x, y) {
            if (x === i) {
                return i
            }
            return new e(x.selectSingleNode(y))
        };
        h.xGetties = function(A, C) {
            if (A === i) {
                return []
            }
            var B = [];
            var y = A.selectNodes(C);
            for (var z = 0, x = y.length; z < x; z++) {
                B.push(new e(y[z]))
            }
            return B
        }
    })();

    function r(e, x) {
        for (var w in x) {
            e[w] = x[w]
        }
        return e
    }
    var l = function() {
        this.empty = true;
        this.shorthand = false;
        this.properties = {}
    };
    l.TAGS_FOR_PRESENTATION = {
        U: {
            textDecoration: "underline"
        },
        B: {
            fontWeight: "bold"
        },
        STRONG: {
            fontWeight: "bold"
        },
        I: {
            fontStyle: "italic"
        },
        EM: {
            fontStyle: "italic"
        },
        S: {
            textDecoration: "line-through"
        },
        STRIKE: {
            textDecoration: "line-through"
        },
        INS: {
            textDecoration: "underline"
        },
        DEL: {
            textDecoration: "line-through"
        },
        FONT: function(w) {
            var e = {};
            if (w.face) {
                e.fontFamily = w.face
            }
            if (w.color) {
                e.color = w.color
            }
            var x = ["", "x-small", "small", "medium", "large", "x-large", "xx-large"];
            if (w.size) {
                var y = w.size;
                e.fontSize = isNaN(y) ? y : x[Math.min(Math.max(1, y), 6)]
            }
            return e
        }
    };
    l.FONT_RELATED_CSS_PROPERTIES = {
        font: "font",
        "font-style": "fontStyle",
        "font-weight": "fontWeight",
        "font-size": "fontSize",
        "font-family": "fontFamily",
        "text-decoration": "textDecoration",
        color: "color",
        "background-color": "backgroundColor"
    };
    l.create = function(D, z) {
        var E = new l();
        var y = l.TAGS_FOR_PRESENTATION[D];
        if (y) {
            var C = (typeof y == "function") ? y(z) : y;
            for (var e in C) {
                E.setProperty(e, C[e])
            }
        }
        var x = z.style;
        if (x) {
            x = x.replace(/[\w-]+:\s?;/g, "");
            var B = x.split(/; ?|: ?/);
            for (var A = 0; A < B.length - 1; A += 2) {
                var w = l.FONT_RELATED_CSS_PROPERTIES[B[A].toLowerCase()];
                if (w) {
                    if (w != "backgroundColor" || (l.TAGS_FOR_PRESENTATION[D] || D == "SPAN")) {
                        E.setProperty(w, B[A + 1])
                    }
                }
            }
        }
        return E.getComputedStyles()
    };
    l.FONT_CSS_REGEXP = /(.*?)(\w+)(\/\w+)?\s+(['"]?[\w\uac00-\ud7a3]+['"]?)$/;
    l.NORMAL_VALUE = "normal";
    l.prototype.isEmpty = function() {
        return this.empty
    };
    l.prototype.setProperty = function(e, w) {
        if (/^font$/i.test(e)) {
            var x = this.fromShorthand(w);
            if (x) {
                this.shorthand = true;
                r(this.properties, this.fromShorthand(w))
            }
        } else {
            this.properties[e] = w
        }
        this.empty = false
    };
    l.prototype.getComputedStyles = function() {
        if (this.shorthand) {
            return this.toShorthand()
        } else {
            return r({}, this.properties)
        }
    };
    l.prototype.fromShorthand = function(y) {
        var w = y.indexOf(","),
            x = "";
        if (w > 0) {
            x = y.substring(w);
            y = y.substring(0, w)
        }
        var B = y.match(l.FONT_CSS_REGEXP);
        if (B === i) {
            return i
        }
        var A = l.NORMAL_VALUE;
        var e = {
            fontSize: B[2],
            lineHeight: (B[3] || A).replace("/", ""),
            fontFamily: B[4] + x,
            fontWeight: A,
            fontStyle: A,
            fontVariant: A
        };
        var z = B[1];
        if (/bold|700/i.test(z)) {
            e.fontWeight = "bold"
        }
        if (/italic/i.test(z)) {
            e.fontStyle = "italic"
        }
        if (/small-caps/i.test(z)) {
            e.fontVarient = "small-caps"
        }
        return e
    };
    l.prototype.toShorthand = function() {
        var y = r({}, this.properties);
        var x = l.NORMAL_VALUE;
        var w = [];
        ["fontWeight", "fontStyle", "fontVarient"].each(function(z) {
            if (y[z] != x) {
                w.push(y[z])
            }
        });
        if (y.lineHeight != x) {
            w.push(y.fontSize + "/" + y.lineHeight)
        } else {
            w.push(y.fontSize)
        }
        w.push(y.fontFamily);
        ["fontWeight", "fontStyle", "fontVarient", "fontSize", "lineHeight", "fontFamily"].each(function(z) {
            delete y[z]
        });
        var e = {
            font: w.join(" ")
        };
        e = r(e, y);
        return e
    };
    var g = {
        __WORD_JOINER: "\ufeff",
        __WORD_JOINER_REGEXP: /\ufeff/g,
        __KEY: {
            ENTER: "13",
            DELETE: "46",
            SPACE: "32",
            BACKSPACE: "8",
            TAB: "9",
            PASTE: "86",
            CUT: "88"
        },
        I: {},
        X: {},
        define: function(e, w) {
            return Object.extend(e, w)
        },
        available: function(w, e) {
            if (!t("tx_" + e)) {
                return c
            }
            if (!w) {
                return c
            }
            if (w.use == c) {
                return c
            }
            return u
        }
    };
    (function(w) {
        function x(z) {
            var y = z;
            while (y.$reference) {
                y = y.$reference
            }
            return y
        }

        function e(C) {
            var A = C.constructor.superclass;
            if (A) {
                var E = A.prototype.initialize;
                A.prototype.initialize = function() {
                    this.$reference = C
                };
                var D = new A();
                A.prototype.initialize = E;
                var z = function(F) {
                    if (!D[F]) {
                        return i
                    }
                    return function() {
                        var J = arguments;
                        var I = x(C);
                        var G = I.$super;
                        I.$super = D.$super;
                        var H = D[F].apply(I, J);
                        I.$super = G;
                        return H
                    }
                };
                var B = {};
                for (var y in D) {
                    if (y.charAt(0) != "$") {
                        if (typeof(D[y]) == "function") {
                            B[y] = z(y)
                        }
                    }
                }
                C.$super = B
            }
        }
        w.Class = {
            create: function(z) {
                var y = function() {
                    var B = this.constructor.prototype;
                    for (var A in B) {
                        if (B[A] && typeof(B[A]) === "object") {
                            if (B[A].constructor == Array) {
                                this[A] = [].concat(B[A])
                            } else {
                                this[A] = Object.extend({}, B[A])
                            }
                        }
                    }
                    e(this);
                    var C = arguments;
                    this.initialize.apply(this, C)
                };
                return w.Class.draft(z, y)
            },
            draft: function(B, C) {
                var z = C ? C : function() {
                    e(this)
                };
                if (B.$const) {
                    Object.extend(z, B.$const)
                }
                if (B.$extend) {
                    Object.extend(z.prototype, B.$extend.prototype);
                    z.superclass = B.$extend
                }
                if (B.$mixins) {
                    var A = $A(B.$mixins);
                    A.each(function(D) {
                        Object.extend(z.prototype, D)
                    })
                }
                for (var y in B) {
                    if (y.charAt(0) != "$") {
                        z.prototype[y] = B[y]
                    }
                }
                return z
            },
            overwrite: function(z, y) {
                if (z.prototype) {
                    Object.extend(z.prototype, y)
                }
                return z
            }
        };
        w.Mixin = w.Faculty = {
            create: function(A) {
                var z = {};
                for (var y in A) {
                    if (A[y] && typeof(A[y]) === "object") {
                        if (A[y].constructor == Array) {
                            z[y] = [].concat(A[y])
                        } else {
                            z[y] = Object.extend({}, A[y])
                        }
                    } else {
                        z[y] = A[y]
                    }
                }
                return z
            },
            toClass: function(y, z) {
                return w.Class.create(Object.extend({
                    initialize: z ? z : function() {}
                }, y))
            }
        }
    })(g);
    (function(e) {
        Object.extend(e, {
            installs: [],
            registers: [],
            modules: [],
            modulesX: [],
            install: function(x, w) {
                w.desc = "[install] " + x;
                e.installs.push(w)
            },
            register: function(x, w) {
                w.desc = "[register] " + x;
                e.registers.push(w)
            },
            module: function(x, w) {
                w.desc = "[module] " + x;
                e.modules.push(w)
            },
            moduleX: function(x, w) {
                w.desc = "[moduleX] " + x;
                e.modulesX.push(w)
            },
            invoke: function(E, A, D, w, x, y) {
                for (var z = 0, B = E.length; z < B; z++) {
                    var C = E[z];
                    C(A, D, w, x, y)
                }
            },
            invokeInstallation: function(y, z, A, x, w) {
                e.invoke(e.installs, y, z, A, x, w)
            },
            invokeRegisters: function(y, z, A, x, w) {
                e.invoke(e.registers, y, z, A, x, w)
            },
            invokeModules: function(y, z, A, x, w) {
                e.invoke(e.modules, y, z, A, x, w)
            },
            group: function() {},
            groupEnd: function() {}
        })
    })(g);
    h.Trex = g;
    (function(e) {
        e.Ev = {
            __EDITOR_PANEL_MOUSEDOWN: "editor.panel.mousedown",
            __EDITOR_LOAD_DATA_BEGIN: "editor.load.data.begin",
            __EDITOR_LOAD_DATA_END: "editor.load.data.end",
            __CANVAS_PANEL_KEYDOWN: "canvas.panel.keydown",
            __CANVAS_PANEL_KEYUP: "canvas.panel.keyup",
            __CANVAS_PANEL_MOUSEDOWN: "canvas.panel.mousedown",
            __CANVAS_PANEL_MOUSEUP: "canvas.panel.mouseup",
            __CANVAS_PANEL_MOUSEOVER: "canvas.panel.mouseover",
            __CANVAS_PANEL_MOUSEOUT: "canvas.panel.mouseout",
            __CANVAS_PANEL_CLICK: "canvas.panel.click",
            __CANVAS_PANEL_DBLCLICK: "canvas.panel.dbclick",
            __CANVAS_PANEL_PASTE: "canvas.panel.paste",
            __CANVAS_PANEL_SCROLLING: "canvas.panel.scrolling",
            __IFRAME_LOAD_COMPLETE: "iframe.load.complete",
            __IFRAME_LOADING_TIME: "iframe.loading.time",
            __CANVAS_SOURCE_PANEL_CLICK: "canvas.source.panel.click",
            __CANVAS_SOURCE_PANEL_KEYDOWN: "canvas.source.panel.mousedown",
            __CANVAS_SOURCE_PANEL_MOUSEDOWN: "canvas.source.panel.mousedown",
            __CANVAS_TEXT_PANEL_CLICK: "canvas.text.panel.click",
            __CANVAS_MODE_CHANGE: "canvas.mode.change",
            __TOOL_CLICK: "toolbar.button.click",
            __TOOL_SHORTCUT_KEY: "toolbar.shortcut",
            __ON_SUBMIT: "editor.submit",
            __CANVAS_WRAP_WIDTH_CHANGE: "canvas.wrap.width.change",
            __CANVAS_HEIGHT_CHANGE: "canvas.height.change",
            __CANVAS_PANEL_QUERY_STATUS: "canvas.panel.style.change",
            __CANVAS_PANEL_DELETE_SOMETHING: "canvas.panel.delkey.press",
            __ENTRYBOX_ENTRY_ADDED: "entrybox.entryadded",
            __CANVAS_PANEL_BACKSPACE_TABLE: "canvas.panel.backspace.table",
            __ENTRYBOX_ENTRY_MODIFIED: "entrybox.entrymodified",
            __ENTRYBOX_ENTRY_REMOVED: "entrybox.entryremoved",
            __ENTRYBOX_ALL_ENTRY_REMOVED: "entrybox.removed.all.perfectly",
            __ENTRYBOX_CAPACITY_UPDATE: "entrybox.capacity.update",
            __ATTACHBOX_SHOW: "attachbox.show",
            __ATTACHBOX_HIDE: "attachbox.hide",
            __CANVAS_BEFORE_UNLOAD: "canvas.unload",
            __CANVAS_ENTRY_ADDED: "canvas.entry.added",
            __COMMAND_NODE_ADDED: "cmd.entry.added",
            __CMD_ALIGN_LEFT: "align.left",
            __CMD_ALIGN_CENTER: "align.center",
            __CMD_ALIGN_RIGHT: "align.right",
            __CMD_ALIGN_FULL: "align.full",
            __CMD_ALIGN_IMG_LEFT: "align.img.left",
            __CMD_ALIGN_IMG_CENTER: "align.img.center",
            __CMD_ALIGN_IMG_FLOAT_LEFT: "align.img.floatleft",
            __CMD_ALIGN_IMG_FLOAT_RIGHT: "align.img.floatright",
            __TOOL_CELL_LINE_CHANGE: "tool.cell.line.change",
            __CANVAS_MODE_INITIALIZE: "canvas.mode.initialize",
            __CANVAS_DATA_INITIALIZE: "canvas.load.data",
            __ENTRYBOX_ENTRY_REFRESH: "entrybox.entryrefresh",
            __PASTE_SEARCHRESULT: "trex.paste.info",
            __RUNTIME_EXCEPTION: "editor.runtime.exception",
            __REPORT_TO_MAGPIE: "editor.report.magpie",
            __SHOULD_CLOSE_MENUS: "editor.shouldclosemenus",
            __CANVAS_IMAGE_PLACEHOLDER_DBLCLICK: "canvas.image.placeholder.dbclick",
            __MENU_LAYER_SHOW: "menu.layer.show",
            __MENU_LAYER_HIDE: "menu.layer.hide",
            __MENU_LAYER_CHANGE_SIZE: "menu.layer.change.size"
        }
    })(g);
    var k = {
        fire: function(x, e) {
            if (x && x.tagName) {
                var w = e[x.tagName.toLowerCase()];
                if (w) {
                    w(x, e)
                } else {
                    k.propagateToParent(x, e)
                }
            } else {}
        },
        propagateToParent: function(w, e) {
            var y = w.parentNode;
            if (y && y.tagName && y.tagName.toLowerCase) {
                var x = e[y.tagName.toLowerCase()];
                if (x) {
                    x(y, e)
                } else {
                    k.propagateToParent(y, e)
                }
            }
        },
        stopPropagation: function() {}
    };
    var m = function(x, y, e, w) {
        return {
            data: x,
            style: {
                padding: y,
                backgroundColor: e,
                border: w
            }
        }
    };
    g.__CONFIG_COMMON = {
        thumbs: {
            options: [{
                color: "#FF0000"
            }, {
                color: "#FF5E00"
            }, {
                color: "#FFBB00"
            }, {
                color: "#FFE400"
            }, {
                color: "#ABF200"
            }, {
                color: "#1FDA11"
            }, {
                color: "#00D8FF"
            }, {
                color: "#0055FF"
            }, {
                color: "#0900FF"
            }, {
                color: "#6600FF"
            }, {
                color: "#FF00DD"
            }, {
                color: "#FF007F"
            }, {
                color: "#000000"
            }, {
                color: "#FFFFFF"
            }, {
                color: "#FFD8D8"
            }, {
                color: "#FAE0D4"
            }, {
                color: "#FAECC5"
            }, {
                color: "#FAF4C0"
            }, {
                color: "#E4F7BA"
            }, {
                color: "#CEFBC9"
            }, {
                color: "#D4F4FA"
            }, {
                color: "#D9E5FF"
            }, {
                color: "#DAD9FF"
            }, {
                color: "#E8D9FF"
            }, {
                color: "#FFD9FA"
            }, {
                color: "#FFD9EC"
            }, {
                color: "#F6F6F6"
            }, {
                color: "#EAEAEA"
            }, {
                color: "#FFA7A7"
            }, {
                color: "#FFC19E"
            }, {
                color: "#FFE08C"
            }, {
                color: "#FAED7D"
            }, {
                color: "#CEF279"
            }, {
                color: "#B7F0B1"
            }, {
                color: "#B2EBF4"
            }, {
                color: "#B2CCFF"
            }, {
                color: "#B5B2FF"
            }, {
                color: "#D1B2FF"
            }, {
                color: "#FFB2F5"
            }, {
                color: "#FFB2D9"
            }, {
                color: "#D5D5D5"
            }, {
                color: "#BDBDBD"
            }, {
                color: "#F15F5F"
            }, {
                color: "#F29661"
            }, {
                color: "#F2CB61"
            }, {
                color: "#E5D85C"
            }, {
                color: "#BCE55C"
            }, {
                color: "#86E57F"
            }, {
                color: "#5CD1E5"
            }, {
                color: "#6699FF"
            }, {
                color: "#6B66FF"
            }, {
                color: "#A366FF"
            }, {
                color: "#F261DF"
            }, {
                color: "#F261AA"
            }, {
                color: "#A6A6A6"
            }, {
                color: "#8C8C8C"
            }, {
                color: "#CC3D3D"
            }, {
                color: "#CC723D"
            }, {
                color: "#CCA63D"
            }, {
                color: "#C4B73B"
            }, {
                color: "#9FC93C"
            }, {
                color: "#47C83E"
            }, {
                color: "#3DB7CC"
            }, {
                color: "#4174D9"
            }, {
                color: "#4641D9"
            }, {
                color: "#7E41D9"
            }, {
                color: "#D941C5"
            }, {
                color: "#D9418D"
            }, {
                color: "#747474"
            }, {
                color: "#5D5D5D"
            }, {
                color: "#980000"
            }, {
                color: "#993800"
            }, {
                color: "#997000"
            }, {
                color: "#998A00"
            }, {
                color: "#6B9900"
            }, {
                color: "#2F9D27"
            }, {
                color: "#008299"
            }, {
                color: "#003399"
            }, {
                color: "#050099"
            }, {
                color: "#3D0099"
            }, {
                color: "#990085"
            }, {
                color: "#99004C"
            }, {
                color: "#4C4C4C"
            }, {
                color: "#353535"
            }, {
                color: "#670000"
            }, {
                color: "#662500"
            }, {
                color: "#664B00"
            }, {
                color: "#665C00"
            }, {
                color: "#476600"
            }, {
                color: "#22741C"
            }, {
                color: "#005766"
            }, {
                color: "#002266"
            }, {
                color: "#030066"
            }, {
                color: "#290066"
            }, {
                color: "#660058"
            }, {
                color: "#660033"
            }, {
                color: "#212121"
            }, {
                color: "#000000"
            }],
            transparent: {
                color: "transparent",
                border: "#999999",
                image: "#iconpath/ic_transparent4.gif?v=2",
                thumb: "#iconpath/txt_transparent.gif?v=2",
                thumbImage: "#iconpath/color_transparent_prev.gif?v=2"
            }
        },
        textbox: {
            options: [m("txc-textbox1", "10px", "#ffffff", "1px solid #f7f7f7"), m("txc-textbox2", "10px", "#eeeeee", "1px solid #eeeeee"), m("txc-textbox3", "10px", "#fefeb8", "1px solid #fefeb8"), m("txc-textbox4", "10px", "#fedec7", "1px solid #fedec7"), m("txc-textbox5", "10px", "#e7fdb5", "1px solid #e7fdb5"), m("txc-textbox6", "10px", "#dbe8fb", "1px solid #dbe8fb"), m("txc-textbox7", "10px", "#ffffff", "1px dashed #cbcbcb"), m("txc-textbox8", "10px", "#eeeeee", "1px dashed #c1c1c1"), m("txc-textbox9", "10px", "#fefeb8", "1px dashed #f3c534"), m("txc-textbox10", "10px", "#fedec7", "1px dashed #fe8943"), m("txc-textbox11", "10px", "#e7fdb5", "1px dashed #9fd331"), m("txc-textbox12", "10px", "#dbe8fb", "1px dashed #79a5e4"), m("txc-textbox13", "10px", "#ffffff", "1px solid #cbcbcb"), m("txc-textbox14", "10px", "#eeeeee", "1px solid #c1c1c1"), m("txc-textbox15", "10px", "#fefeb8", "1px solid #f3c534"), m("txc-textbox16", "10px", "#fedec7", "1px solid #fe8943"), m("txc-textbox17", "10px", "#e7fdb5", "1px solid #9fd331"), m("txc-textbox18", "10px", "#dbe8fb", "1px solid #79a5e4"), m("txc-textbox19", "10px", "#ffffff", "3px double #cbcbcb"), m("txc-textbox20", "10px", "#eeeeee", "3px double #c1c1c1"), m("txc-textbox21", "10px", "#fefeb8", "3px double #f3c534"), m("txc-textbox22", "10px", "#fedec7", "3px double #fe8943"), m("txc-textbox23", "10px", "#e7fdb5", "3px double #9fd331"), m("txc-textbox24", "10px", "#dbe8fb", "3px double #79a5e4")]
        }
    };
    var p = function() {
        var w = c;
        var e = [];
        var B = {};
        var E = {
            cdnHost: "//s1.daumcdn.net/editor",
            cmnHost: "http://editor.daum.net",
            wrapper: "tx_trex_container",
            form: "tx_editor_form",
            txIconPath: "images/icon/editor/",
            txDecoPath: "images/deco/contents/",
            params: [],
            events: {
                preventUnload: u,
                useHotKey: u
            },
            save: {},
            adaptor: {},
            toolbar: {},
            sidebar: {
                attachbox: {},
                embeder: {},
                attacher: {},
                searcher: {}
            },
            plugin: {}
        };
        var y = function() {
            return {
                Tool: E.toolbar,
                Sidebar: E.sidebar,
                Plugin: E.plugin,
                Adaptor: E.adaptor,
                Save: E.save,
                Attacher: E.sidebar.attacher,
                Embeder: E.sidebar.embeder,
                Searcher: E.sidebar.searcher
            }
        };
        var D = function(H, G) {
            if (w) {
                throw new Error("configure is already setup (addParameter)")
            }
            B[H] = G
        };
        var x = {
            getUrl: function(J, K) {
                if (typeof J !== "string") {
                    return J
                }
                var G = h.EditorJSLoader || opener && opener.EditorJSLoader || (PopupUtil && PopupUtil.getOpener()["EditorJSLoader"]);
                J = J.replace(/#host#path\/pages\//g, G.getPageBasePath());
                J = J.replace(/#host/g, E.txHost);
                J = J.replace(/#path\/?/g, E.txPath);
                J = J.replace(/#cdnhost/g, E.cdnHost);
                J = J.replace(/#cmnhost/g, E.cmnHost);
                for (var H in B) {
                    J = J.replace(new RegExp("#".concat(H), "g"), E[B[H]])
                }
                if (K) {
                    for (var I in K) {
                        J = J.replace(new RegExp("#".concat(I), "g"), K[I])
                    }
                }
                return J
            },
            getPopFeatures: function(G) {
                if (G == i) {
                    return i
                }
                if (typeof(G) === "string") {
                    return G
                }
                var H = [];
                ["toolbar", "location", "directories", "menubar"].each(function(I) {
                    H.push(I + "=" + (G[I] || "no"))
                });
                ["scrollbars", "resizable"].each(function(I) {
                    H.push(I + "=" + (G[I] || "yes"))
                });
                ["width", "height"].each(function(I) {
                    H.push(I + "=" + (G[I] || "500"))
                });
                ["left", "top"].each(function(I) {
                    H.push(I + "=" + (G[I] || "100"))
                });
                return H.join(",")
            },
            getDecoPath: function(G) {
                return G.replace(/#decopath\/?/, this.getUrl(E.txDecoPath))
            },
            getIconPath: function(G) {
                return G.replace(/#iconpath\/?/, this.getUrl(E.txIconPath))
            },
            setup: function(G) {
                t.deepcopy(E, G);
                E.params.each(function(H) {
                    D(H, H)
                });
                e.each(function(H) {
                    H(E)
                });
                w = u;
                this.setupVersion();
                return E
            },
            setupVersion: function() {
                E.txVersion = Editor.version
            },
            addParameter: function(H, G) {
                D(H, G)
            },
            clone: function(G) {
                return t.deepcopy({}, G)
            },
            merge: function() {
                var G = {};
                $A(arguments).each(function(H) {
                    t.deepcopy(G, H)
                });
                return G
            }
        };
        x.add = function(G, H) {
            if (w) {
                throw new Error("configure is already setup (mergeConfig)")
            }
            t.deepcopy(E, G);
            if (H) {
                e.push(H)
            }
        };
        x.get = function(G) {
            return E[G]
        };
        var A = function(H, G, I) {
            if (w) {
                throw new Error("configure is already setup (mergeConfig)")
            }
            this[H] = this[H] || {};
            t.deepcopy(this[H], G);
            if (I) {
                e.push(I)
            }
        };
        var z = function(G) {
            return this[G]
        };
        var F = y();
        for (var C in F) {
            x["add" + C] = A.bind(F[C]);
            x["get" + C] = z.bind(F[C])
        }
        return x
    }();
    h.TrexConfig = p;
    var j = function() {
        var x = {};

        function e(y) {
            return (y.indexOf("#iconpath") > -1) ? p.getIconPath(y) : y
        }

        function w(y) {
            return (y.indexOf("#decopath") > -1) ? p.getDecoPath(y) : y
        }
        return {
            getMsg: function(z) {
                var y = x[z] || "";
                return e(w(y))
            },
            addMsg: function(y) {
                t.deepcopy(x, y)
            },
            printAll: function() {
                for (var y in x) {
                    if (x.hasOwnProperty(y)) {}
                }
            }
        }
    }();
    h.TXMSG = j.getMsg;
    h.TrexMessage = j;
    var o = function(e) {
        this.config = e || {}
    };
    o.prototype.set = function(B, A) {
        var z = B.split(".");
        var e = z[z.length - 1];
        var w = this.config;
        for (var y = 0; y < z.length - 1; y++) {
            var x = z[y];
            if (!w[x]) {
                w[x] = {}
            }
            w = w[x]
        }
        if (t.isPrimitiveType(A)) {
            w[e] = A
        } else {
            if (!w[e]) {
                w[e] = {}
            }
            t.deepcopy(w[e], A)
        }
    };
    o.prototype.getConfig = function() {
        return this.config
    };
    h.EditorConfigBuilder = o;
    g.MarkupTemplate = {};
    (function() {
        var e = {};
        g.define(g.MarkupTemplate, {
            add: function(w, x) {
                e[w] = x
            },
            get: function(w) {
                if (!e[w]) {
                    return {
                        evaluate: function() {
                            return ""
                        },
                        evaluateToDom: function() {
                            return ""
                        }
                    }
                }
                if (typeof(e[w]) == "string") {
                    var x = e[w].replace(/@[\w\.]+/g, function(y) {
                        return TXMSG(y)
                    });
                    e[w] = new Template(x)
                }
                return e[w]
            },
            splitList: function(F, B, z) {
                var y = {
                    row: []
                };
                var D = z.length;
                var C = y.row;
                for (var E = 0; E < F; E++) {
                    C.push({
                        col: []
                    });
                    var w = C.last().col;
                    for (var x = 0; x < B; x++) {
                        var A = {
                            image: "",
                            data: "&nbsp;",
                            klass: ""
                        };
                        if (E * B + x < D) {
                            if (typeof(z[E * B + x]) == "string") {
                                A.data = z[E * B + x]
                            } else {
                                A = Object.extend(A, z[E * B + x])
                            }
                        }
                        w.push(A)
                    }
                }
                return y
            }
        })
    })();
    var v = {};
    (function() {
        var A = {
            "%body": ["body"],
            "%text": ["#text", "br"],
            "%element": ["#element"],
            "%control": ["img", "object", "hr", "table", "button", "iframe"],
            "%inline": ["span", "font", "u", "i", "b", "em", "strong", "big", "small", "a", "sub", "sup", "span"],
            "%block": ["p", "div", "ul", "ol", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "dl", "hr", "table", "button"],
            "%paragraph": ["p", "li", "dd", "dt", "h1", "h2", "h3", "h4", "h5", "h6", "td", "th", "div", "caption"],
            "%wrapper": ["div", "ul", "ol", "dl", "pre", "xmp", "table", "button", "blockquote"],
            "%innergroup": ["li", "dd", "dt", "td", "th"],
            "%outergroup": ["ul", "ol", "dl", "tr", "tbody", "thead", "tfoot", "table"],
            "%tablegroup": ["td", "th", "tr", "tbody", "thead", "tfoot", "table"],
            "%listgroup": ["li", "ul", "ol"],
            "%datagroup": ["dd", "dt", "dl"],
            "%listhead": ["ul", "ol"]
        };
        var w = {};
        for (var x in A) {
            w[x] = {};
            if (A[x]) {
                $A(A[x]).each(function(B) {
                    w[x][B] = u
                })
            }
        }

        function e(B) {
            var D = {};
            var C = B.split(",");
            C.each(function(F) {
                if (w[F]) {
                    for (var E in w[F]) {
                        D[E] = u
                    }
                } else {
                    D[F] = u
                }
            });
            return D
        }
        var z = g.Class.create({
            initialize: function(B) {
                this.patterns = B;
                this.map = e(B)
            },
            hasParts: function() {
                return (this.patterns.length > 0)
            },
            include: function(D) {
                var C = e(D);
                for (var B in C) {
                    if (this.map[B]) {
                        return u
                    }
                }
                return c
            },
            memberOf: function(D) {
                var C = e(D);
                for (var B in this.map) {
                    if (C[B]) {
                        return u
                    }
                }
                return c
            },
            extract: function(E) {
                var D = e(E);
                var C = [];
                for (var B in this.map) {
                    if (D[B]) {
                        C.push(B)
                    }
                }
                return v.translate(C.join(","))
            },
            getExpression: function() {
                if (!this.exprs) {
                    var C = [];
                    for (var B in this.map) {
                        C.push(B)
                    }
                    this.exprs = C.join(",")
                }
                return this.exprs
            }
        });
        var y = {};
        Object.extend(v, {
            translate: function(B) {
                if (!y[B]) {
                    y[B] = new z(B)
                }
                return y[B]
            }
        })
    })();
    Object.extend(v, {
        __POSITION: {
            __START_OF_TEXT: -1,
            __MIDDLE_OF_TEXT: 0,
            __END_OF_TEXT: 1,
            __EMPTY_TEXT: -2
        }
    });
    Object.extend(v, {
        isElement: function(e) {
            return e && e.nodeType == 1
        },
        isBody: function(e) {
            return v.isElement(e) && e.tagName == "BODY"
        },
        isBlock: function(e) {
            return v.kindOf(e, "%block")
        },
        isParagraph: function(e) {
            return v.kindOf(e, "%paragraph")
        },
        isText: function(e) {
            return v.kindOf(e, "%text")
        },
        isControl: function(e) {
            return v.kindOf(e, "%control")
        },
        isTagName: function(w, e) {
            e = e.toUpperCase();
            return w && w.tagName === e
        },
        getOwnerDocument: function(e) {
            return e.ownerDocument || e.document
        },
        getName: function(e) {
            return ((e && e.nodeType == 1) ? e.nodeName.toLowerCase() : "")
        },
        getText: function(e) {
            return e.textContent || e.text || e.innerText || ""
        },
        getLength: function(e) {
            if (!e) {
                return 0
            }
            if (e.nodeType == 1) {
                return e.childNodes.length
            } else {
                if (e.nodeType == 3) {
                    return e.nodeValue.length
                }
            }
            return 0
        },
        indexOf: function(x) {
            if (!x) {
                return -1
            }
            var z = x.parentNode;
            for (var w = 0, e = z.childNodes.length, y = z.childNodes; w < e; w++) {
                if (y[w] == x) {
                    return w
                }
            }
            return -1
        },
        hasContent: function(w, e) {
            if (!w || w.nodeType != 3) {
                return u
            }
            var x = v.removeMeaninglessSpace(w.nodeValue);
            if (e) {
                x = x.replace(g.__WORD_JOINER_REGEXP, "")
            }
            return (x != "")
        },
        removeEmptyTextNode: function(e) {
            if (e && e.nodeType == 3 && !e.nodeValue) {
                v.remove(e)
            }
        },
        hasUsefulChildren: function(w, e) {
            if (!w) {
                return c
            }
            var x = v.removeMeaninglessSpace(w.innerHTML);
            if (e) {
                x = x.replace(g.__WORD_JOINER_REGEXP, "")
            }
            if (!x) {
                return c
            }
            if (x.stripTags()) {
                return u
            }
            if (x.search(/<(img|br|hr)\s?[^>]*>/i) > -1) {
                return u
            }
            if (x.search(/<span\sid="?tx_(start|end)_marker"?><\/span>/i) > -1) {
                return u
            }
            return c
        },
        hasData: function(w, e) {
            if (!w) {
                return c
            }
            var x = "";
            if (w.nodeType == 1) {
                x = w.innerHTML
            } else {
                x = w.nodeValue
            }
            x = v.removeMeaninglessSpace(x);
            if (x.trim() == "") {
                return c
            }
            if (x.stripTags() != "") {
                return u
            }
            if (e) {
                return c
            }
            if (x.search(/<br\s?\/?>/i) > -1) {
                return u
            }
            return c
        },
        removeMeaninglessSpace: function(e) {
            return e.replace(/(^[\f\n\r\t\v\u2028\u2029]*)|([\f\n\r\t\v\u2028\u2029]*$)/g, "")
        }
    });
    Object.extend(v, {
        search: function(y, B, e) {
            var z = (y.length == 1) ? b : y[0];
            var A = y[y.length - 1];
            var x = (!A || !z || !z.nodeType || typeof A != "string");
            if (x) {
                return e
            }
            var w = v.translate(A);
            return B(z, w.getExpression())
        },
        find: function() {
            return this.search(arguments, dFindy, i)
        },
        collect: function() {
            return this.search(arguments, dGetty, i)
        },
        collectAll: function() {
            return this.search(arguments, dGetties, [])
        }
    });
    (function() {
        function x(z) {
            if (z) {
                if (typeof(z) === "function") {
                    return z
                } else {
                    var A = v.translate(z);
                    return function(B) {
                        if (B.nodeType == 1) {
                            if (A.include("#element")) {
                                return u
                            } else {
                                return dChecky(B, A.getExpression())
                            }
                        } else {
                            return A.include("#text")
                        }
                    }
                }
            } else {
                return i
            }
        }
        var y = {};

        function e(A) {
            A = A || "#element,#text";
            if (y[A]) {
                return y[A]
            }
            var z = new w(A);
            y[A] = z;
            return z
        }
        var w = g.Class.create({
            initialize: function(z) {
                this.pattern = z;
                this.translator = v.translate(z);
                this.hasClassPattern = z.indexOf(".") >= 0;
                this.hasIdPattern = z.indexOf("#") >= 0;
                this.matchesText = this.translator.include("#text");
                this.matchesElement = this.translator.include("#element")
            },
            test: function(C) {
                var z = C.nodeType;
                var E = this.translator.map;
                if (z == 1) {
                    if (this.matchesElement) {
                        return u
                    }
                    var B = C.tagName.toLowerCase();
                    if (E[B]) {
                        return u
                    }
                    var D = [];
                    if (this.hasClassPattern && C.className) {
                        C.className.split(/\s/).each(function(G) {
                            D.push("." + G);
                            D.push(B + "." + G)
                        })
                    }
                    if (this.hasIdPattern && C.id) {
                        var F = C.id;
                        D.push("#" + F);
                        D.push(B + "#" + F)
                    }
                    for (var A = 0; A < D.length; A++) {
                        if (E[D[A]]) {
                            return u
                        }
                    }
                    return c
                } else {
                    if (z == 3) {
                        return this.matchesText
                    }
                }
            }
        });
        Object.extend(v, {
            tagName: function(A, z) {
                if (!A) {
                    return i
                }
                return A.tagName
            },
            kindOf: function(A, B) {
                if (!A || !B) {
                    return c
                }
                var z = e(B);
                return z.test(A)
            },
            kindOf_old: function(z, A) {
                if (!z || !A) {
                    return c
                }
                return x(A)(z)
            },
            ancestor: function(B, C) {
                if (!B || !B.parentNode) {
                    return i
                }
                var A = e(C);
                var z = B.parentNode;
                while (z) {
                    if (v.isBody(z)) {
                        return i
                    }
                    if (A.test(z)) {
                        break
                    }
                    z = z.parentNode
                }
                return z
            },
            findAncestor: function(B, z, A) {
                while (!A(B)) {
                    if (z(B)) {
                        return B
                    }
                    B = B.parentNode
                }
                return i
            },
            descendant: function(z, A) {
                var B = v.descendants(z, A, u);
                if (B.length == 0) {
                    return i
                }
                return B[0]
            },
            descendants: function(A, D, F) {
                F = F || c;
                if (!A || !A.firstChild) {
                    return []
                }
                var z = c;
                var B = e(D);
                var E = [];
                var C = function(I) {
                    if (F && z) {
                        return
                    }
                    if (!v.first(I)) {
                        return
                    }
                    var J = v.children(I);
                    for (var H = 0, G = J.length; H < G; H++) {
                        if (B.test(J[H])) {
                            E.push(J[H]);
                            z = u
                        } else {
                            C(J[H])
                        }
                    }
                };
                C(A);
                return E
            },
            children: function(B, C) {
                var D = [];
                if (!B || !B.firstChild) {
                    return D
                }
                var A = e(C);
                var z = v.first(B);
                while (z) {
                    if (A.test(z)) {
                        D.push(z)
                    }
                    z = z.nextSibling
                }
                return D
            },
            next: function(B, C) {
                if (!B || !B.nextSibling) {
                    return i
                }
                var A = e(C);
                var z = B.nextSibling;
                while (z) {
                    if (v.hasContent(z)) {
                        if (A.test(z)) {
                            break
                        }
                    }
                    z = z.nextSibling
                }
                return z
            },
            previous: function(B, C) {
                if (!B || !B.previousSibling) {
                    return i
                }
                var A = e(C);
                var z = B.previousSibling;
                while (z) {
                    if (v.hasContent(z)) {
                        if (A.test(z)) {
                            break
                        }
                    }
                    z = z.previousSibling
                }
                return z
            },
            first: function(B, C) {
                if (!B || !B.firstChild) {
                    return i
                }
                var A = e(C);
                var z = B.firstChild;
                while (z) {
                    if (v.hasContent(z)) {
                        if (A.test(z)) {
                            break
                        }
                    }
                    z = z.nextSibling
                }
                return z
            },
            last: function(B, C) {
                if (!B || !B.lastChild) {
                    return i
                }
                var A = e(C);
                var z = B.lastChild;
                while (z) {
                    if (v.hasContent(z)) {
                        if (A.test(z)) {
                            break
                        }
                    }
                    z = z.previousSibling
                }
                return z
            },
            extract: function(C, F, D) {
                var E = [];
                if (!C || !F || !D) {
                    return E
                }
                var B = e(D);
                var z = c;
                var A = C.firstChild;
                while (A) {
                    if (v.include(A, F)) {
                        z = u
                    }
                    if (B.test(A)) {
                        E.push(A)
                    } else {
                        if (z) {
                            break
                        } else {
                            E = []
                        }
                    }
                    A = A.nextSibling
                }
                return z ? E : []
            },
            parent: function(z) {
                if (!z || !z.parentNode) {
                    return i
                }
                return z.parentNode
            },
            body: function(A) {
                if (!A || !A.parentNode) {
                    return i
                }
                var z = A.parentNode;
                while (z) {
                    if (v.isBody(z)) {
                        return z
                    }
                    z = z.parentNode
                }
                return i
            },
            top: function(A, B) {
                B = B || c;
                var z = A;
                while (v.first(z)) {
                    z = v.first(z)
                }
                if (B) {
                    return z
                } else {
                    if (v.kindOf(z, "#tx_start_marker,#tx_end_marker")) {
                        z = z.nextSibling || z.parentNode
                    } else {
                        if (v.kindOf(z, "%control")) {
                            z = z.parentNode
                        }
                    }
                    return z
                }
            },
            bottom: function(A, B) {
                B = B || c;
                var z = A;
                while (v.last(z)) {
                    z = v.last(z)
                }
                if (B) {
                    return z
                } else {
                    if (v.kindOf(z, "#tx_start_marker,#tx_end_marker")) {
                        z = z.previousSibling || z.parentNode
                    } else {
                        if (v.kindOf(z, "%control")) {
                            z = z.parentNode
                        }
                    }
                    return z
                }
            },
            include: function(A, B) {
                if (!A || !B) {
                    return c
                }
                if (A == B) {
                    return u
                }
                var z = B;
                while (z) {
                    if (v.isBody(z)) {
                        return c
                    } else {
                        if (z == A) {
                            return u
                        }
                    }
                    z = z.parentNode
                }
                return c
            },
            prevNodeUntilTagName: function(A, B, z) {
                z = z.toUpperCase();
                if (B === 0) {
                    A = A.previousSibling
                } else {
                    A = A.childNodes[B - 1]
                }
                while (A && A.lastChild) {
                    if (A.tagName === z) {
                        break
                    }
                    A = A.lastChild
                }
                return A
            }
        })
    })();
    Object.extend(v, {
        insertFirst: function(e, w) {
            if (!e || !w) {
                return
            }
            if (e.firstChild) {
                e.insertBefore(w, e.firstChild)
            } else {
                e.appendChild(w)
            }
            return w
        },
        insertAt: function(e, w) {
            if (!e || !w) {
                return
            }
            w.parentNode.insertBefore(e, w);
            return e
        },
        insertNext: function(w, x) {
            if (!w || !x) {
                return
            }
            var e = x.nextSibling;
            if (e) {
                e.parentNode.insertBefore(w, e)
            } else {
                x.parentNode.appendChild(w)
            }
            return w
        },
        append: function(e, w) {
            if (!e || !w) {
                return
            }
            e.appendChild(w);
            return w
        },
        remove: function(e) {
            if (!e) {
                return
            }
            if (e.parentNode) {
                e.parentNode.removeChild(e)
            }
            e = i
        },
        html: function(w, e) {
            if (!w) {
                return
            }
            w.innerHTML = e || "";
            return w
        },
        clean: function(e) {
            return v.html(e)
        },
        stuff: function(x, w) {
            if (!x) {
                return x
            }
            if (v.hasUsefulChildren(x, u)) {
                return x
            }
            if (x.lastChild) {
                var e = x;
                while (e.lastChild) {
                    e = e.lastChild
                }
                v.insertNext(w, e)
            } else {
                v.append(x, w)
            }
            return x
        }
    });
    Object.extend(v, {
        removeListIfEmpty: function(e) {
            while (v.kindOf(e, "%listhead") && e.childNodes.length == 1 && v.kindOf(e.firstChild, "%listhead")) {
                e = e.firstChild
            }
            while (v.kindOf(e, "%listhead") && e.childNodes.length == 0) {
                var w = e.parentNode;
                v.remove(e);
                e = w
            }
        }
    });
    Object.extend(v, {
        moveChild: function(e, x, w, z) {
            if (!e || !x) {
                return
            }
            w = Math.min(Math.max(w || 0), e.childNodes.length);
            z = Math.min(Math.max(z || e.childNodes.length), e.childNodes.length);
            if (w >= z) {
                return
            }
            var y = w;
            while (y++ < z && w < e.childNodes.length) {
                x.appendChild(e.childNodes[w])
            }
        },
        moveChildToParent: function(e) {
            if (!e) {
                return
            }
            while (e.firstChild) {
                e.parentNode.insertBefore(e.firstChild, e)
            }
        }
    });
    Object.extend(v, {
        replace: function(z, A) {
            if (!z || !A) {
                return i
            }
            if (v.getName(z) == v.getName(A)) {
                v.remove(A);
                return z
            } else {
                var x = [],
                    B = z.childNodes,
                    e = B.length;
                for (var w = 0; w < e; w++) {
                    x.push(B[w])
                }
                for (w = 0; w < e; w++) {
                    var C = x[w];
                    if (C.lastChild === z) {
                        var y = v.clone(C);
                        v.moveChild(C, y);
                        C.innerHTML = "";
                        A.appendChild(y)
                    } else {
                        A.appendChild(C)
                    }
                }
                v.insertAt(A, z);
                v.remove(z);
                return A
            }
        },
        clone: function(x, e) {
            var w = x.cloneNode(!!e);
            if (x.nodeType == 1) {
                w.removeAttribute("id")
            }
            return w
        }
    });
    Object.extend(v, {
        wrap: function(e, w) {
            if (!e || !w) {
                return i
            }
            if (w instanceof Array == c) {
                w = [].concat(w)
            }
            v.insertAt(e, w[0]);
            w.each((function(x) {
                v.append(e, x)
            }));
            return e
        },
        unwrap: function(e) {
            if (!e) {
                return i
            }
            var w = v.first(e);
            if (t.msie_nonstd) {
                e.removeNode()
            } else {
                v.moveChildToParent(e);
                v.remove(e)
            }
            return w
        }
    });
    Object.extend(v, {
        divideText: function(w, x) {
            if (!v.isText(w)) {
                return w
            }
            if (x <= 0 || x >= w.length) {
                return w
            }
            var e = w.cloneNode(c);
            w.deleteData(x, w.length - x);
            e.deleteData(0, x);
            v.insertNext(e, w);
            return e
        },
        divideNode: function(y, z) {
            if (!v.isElement(y)) {
                return i
            }
            var w = y.childNodes.length - z;
            var e = y.cloneNode(c);
            for (var x = 0; x < w; x++) {
                v.insertFirst(e, y.lastChild)
            }
            v.insertNext(e, y);
            return e
        },
        splitAt: function(w, e) {
            if (!v.isElement(w)) {
                return
            }
            var x = v.clone(w);
            v.moveChild(w, x, e + 1, w.childNodes.length);
            v.insertNext(x, w);
            return x
        },
        divideTree: function(e, y) {
            var w = y,
                z, x;
            do {
                x = w.parentNode;
                z = v.indexOf(w);
                w = v.divideNode(x, z)
            } while (w.previousSibling != e);
            return w
        },
        divideParagraph: function(y) {
            var w = y;
            var e = v.indexOf(y);
            var x = w;
            while (w) {
                if (v.isBody(w)) {
                    break
                } else {
                    if (v.kindOf(w, "td,th,%wrapper,%outergroup")) {
                        break
                    } else {
                        if (v.kindOf(w, "#tx_start_marker,#tx_end_marker")) {
                            e = v.indexOf(w)
                        } else {
                            if (v.isControl(w)) {
                                e = v.indexOf(w)
                            } else {
                                if (v.isText(w)) {
                                    w = v.divideText(w, e);
                                    e = v.indexOf(w)
                                } else {
                                    w = v.divideNode(w, e);
                                    e = v.indexOf(w);
                                    x = w;
                                    if (v.kindOf(w, "p,li,dd,dt,h1,h2,h3,h4,h5,h6")) {
                                        break
                                    }
                                }
                            }
                        }
                    }
                }
                w = w.parentNode
            }
            return x
        },
        wrapInlinesWithP: function(z, y) {
            var e = v.getOwnerDocument(z);
            var x = v.extract(y || e.body, z, "%text,%inline,%control");
            if (this.hasOnlySavedCaret(x, z)) {
                return i
            }
            var w = e.createElement("p");
            v.wrap(w, x);
            return w
        },
        hasOnlySavedCaret: function(e, x) {
            var w = e.findAll(function(y) {
                return y.nodeType != 3 || y.nodeValue.trim() != ""
            });
            return this.isGoogRangeCaret(x) && w.length == 1 && w[0] == x
        },
        isGoogRangeCaret: function(e) {
            return e && /goog_[0-9]+/.test(e.id)
        }
    });
    Object.extend(v, {
        paragraphOf: function(e) {
            if (!e) {
                return "p"
            }
            var w = v.translate(e);
            if (w.memberOf("ul,ol")) {
                return "li"
            } else {
                if (w.memberOf("dl")) {
                    return "dd"
                } else {
                    if (w.memberOf("tr,tbody,thead,tfoot,table")) {
                        return "td"
                    } else {
                        return "p"
                    }
                }
            }
        },
        inlineOf: function() {
            return "span"
        },
        outerOf: function(e) {
            if (!e) {
                return "span"
            }
            var w = v.translate(e);
            if (w.memberOf("li")) {
                return "ol"
            } else {
                if (w.memberOf("dd,dt")) {
                    return "dl"
                } else {
                    if (w.memberOf("td,th,tr")) {
                        return "table"
                    } else {
                        return "p"
                    }
                }
            }
        }
    });
    (function() {
        var w = 0;
        var y = g.Class.create({
            $const: {
                __FONT_SIZE_BASIS: 9,
                __REG_EXT_NUMBER: new RegExp("[0-9.]+"),
                __REG_EXT_UNIT: new RegExp("px|pt|em")
            },
            initialize: function() {
                this.unitConverter = {
                    px2em: 1 / 12,
                    px2pt: 9 / 12,
                    em2px: 12,
                    em2pt: 9,
                    pt2px: 12 / 9,
                    pt2em: 1 / 9
                }
            },
            calculate: function(D, B) {
                if (D == i || D.length == 0) {
                    D = "0em"
                }
                if (B == i || B.length == 0) {
                    B = "0em"
                }
                var G = this.extractSign(B);
                var E = this.extractUnit(D);
                var C = this.extractUnit(B);
                var A = this.extractNumber(D).toNumber();
                var z = this.extractNumber(B).toNumber();
                if (E != C) {
                    if (this.unitConverter[E + "2" + C]) {
                        A *= this.unitConverter[E + "2" + C]
                    }
                }
                var F = 0;
                if (G == "-") {
                    F = Math.max(A - z, 0)
                } else {
                    F = (A + z)
                }
                F = (Math.round(F * 10) / 10);
                if (F == 0) {
                    return i
                } else {
                    return F + C
                }
            },
            needCalculation: function(z) {
                if (z == i || typeof z != "string") {
                    return c
                } else {
                    return (z.charAt(0) == "+" || z.charAt(0) == "-")
                }
            },
            extractSign: function(z) {
                var A = "+";
                if (z.charAt(0) == "+" || z.charAt(0) == "-") {
                    A = z.charAt(0)
                }
                return A
            },
            extractNumber: function(B) {
                var z = 0;
                var A;
                if ((A = B.match(y.__REG_EXT_NUMBER)) != i) {
                    z = A[0]
                }
                if (B.indexOf("%") > -1) {
                    z = z / 100
                }
                return z
            },
            extractUnit: function(B) {
                var z = "em";
                var A;
                if ((A = B.match(y.__REG_EXT_UNIT)) != i) {
                    z = A[0]
                }
                return z
            }
        });
        var x = new y();
        var e = {
            colspan: "colSpan",
            rowspan: "rowSpan",
            valign: "vAlign",
            datetime: "dateTime",
            accesskey: "accessKey",
            tabindex: "tabIndex",
            enctype: "encType",
            maxlength: "maxLength",
            readonly: "readOnly",
            longdesc: "longDesc",
            cellPadding: "cellPadding",
            cellSpacing: "cellSpacing",
            more: "more",
            less: "less",
            style: "style"
        };
        Object.extend(v, {
            applyAttributes: function(B, A) {
                if (!v.isElement(B)) {
                    return
                }
                for (var z in A) {
                    if (z == "style") {
                        v.applyStyles(B, A[z])
                    } else {
                        v.setAttribute(B, z, A[z])
                    }
                }
            },
            removeAttributes: function(B, A) {
                if (!v.isElement(B)) {
                    return
                }
                for (var z in A) {
                    if (z == "style") {
                        v.removeStyles(A[z])
                    } else {
                        B.removeAttribute(z, w)
                    }
                }
            },
            getAttribute: function(A, z) {
                if (!v.isElement(A)) {
                    return i
                }
                if (A && A.getAttribute) {
                    return A.getAttribute(e[z] || z)
                } else {
                    return i
                }
            },
            setAttribute: function(A, z, C) {
                if (!v.isElement(A)) {
                    return
                }
                if (C == i || C.length == 0 || C == 0) {
                    A.removeAttribute(z, w)
                } else {
                    if (e[z]) {
                        A.setAttribute(e[z], C)
                    } else {
                        try {
                            A[z] = C
                        } catch (B) {
                            A.setAttribute(e[z] || z, C)
                        }
                    }
                }
            },
            setStyles: function(z, F, C) {
                var D = z.style.cssText;
                var E;
                var H = Object.extend({}, F);
                if (H.font) {
                    if (C) {
                        z.style.font = H.font
                    } else {
                        if (z.style.cssText.indexOf("font:") == -1) {
                            z.style.cssText = "font: " + H.font + "; " + z.style.cssText
                        }
                    }
                    delete H.font
                }
                for (var A in H) {
                    var G;
                    if (x.needCalculation(H[A])) {
                        G = x.calculate(z.style[A], H[A])
                    } else {
                        G = H[A]
                    }
                    if (G == i) {
                        G = ""
                    }
                    if (A == "float") {
                        A = t.msie ? "styleFloat" : "cssFloat"
                    }
                    E = (!z.style[A] && (A.indexOf("font") != 0 || D.indexOf("font:") == -1)) || C;
                    var B = (A == "textDecoration") && !z.style[A].include(G);
                    if (E) {
                        z.style[A] = G
                    } else {
                        if (B) {
                            z.style[A] += " " + G
                        }
                    }
                }
                v._clearUselessStyle(z)
            },
            applyStyles: function(A, z) {
                this.setStyles(A, z, u)
            },
            addStyles: function(A, z) {
                this.setStyles(A, z, c)
            },
            removeStyles: function(D, C) {
                var B = D.style.cssText;
                var A = B;
                for (var z in C) {
                    z = z.replace(/([A-Z])/g, "-$1");
                    B = B.replace(new RegExp("(^| )" + z + "\\s*:[^;]+;? ?", "ig"), "")
                }
                if (A != B) {
                    D.style.cssText = B;
                    v._clearUselessStyle(D)
                }
            },
            _clearUselessStyle: function(z) {
                var A = v.getAttribute(z, "style");
                if (!A) {
                    z.removeAttribute("style", w)
                }
            },
            getStyleText: function(z) {
                return z.style.cssText
            },
            setStyleText: function(z, A) {
                z.style.cssText = A;
                !A && v._clearUselessStyle(z)
            }
        })
    })();
    Object.extend(v, {
        goInto: function(w, e) {
            if (!w || !w.scrollIntoView) {
                return
            }
            w.scrollIntoView(e)
        },
        getScrollTop: function(e) {
            if (!e) {
                return 0
            }
            return e.documentElement.scrollTop >= 0 ? e.documentElement.scrollTop : e.body.scrollTop
        },
        setScrollTop: function(w, e) {
            if (!w) {
                return
            }
            if (w.documentElement.scrollTop) {
                w.documentElement.scrollTop = e
            } else {
                w.body.scrollTop = e
            }
        },
        getScrollLeft: function(e) {
            if (!e) {
                return 0
            }
            return (e.documentElement.scrollLeft || e.body.scrollLeft)
        },
        setScrollLeft: function(e, w) {
            if (!e) {
                return
            }
            if (e.documentElement.scrollLeft) {
                e.documentElement.scrollLeft = w
            } else {
                e.body.scrollLeft = w
            }
        },
        getPosition: function(z, F) {
            if (!z) {
                return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
            F = !!F;
            z = t(z);
            var D = (F) ? t.cumulativeOffset(z) : t.positionedOffset(z);
            var A;
            var C = z.style.display;
            if (C != "none" && C != i) {
                A = {
                    width: z.offsetWidth,
                    height: z.offsetHeight
                }
            } else {
                var x = z.style;
                var E = x.visibility;
                var B = x.position;
                var w = x.display;
                x.visibility = "hidden";
                x.position = "absolute";
                x.display = "block";
                var e = z.clientWidth;
                var y = z.clientHeight;
                x.display = w;
                x.position = B;
                x.visibility = E;
                A = {
                    width: e,
                    height: y
                }
            }
            return {
                x: D[0],
                y: D[1],
                width: A.width,
                height: A.height
            }
        },
        getWidth: function(w) {
            var e = w.style.width;
            if (e.isPx()) {
                return e.parsePx()
            }
            return w.offsetWidth
        },
        setWidth: function(w, e) {
            v.applyStyles(w, {
                width: e
            })
        },
        getHeight: function(w) {
            var e = w.style.height;
            if (e.isPx()) {
                return e.parsePx()
            }
            return w.offsetHeight
        },
        setHeight: function(w, e) {
            v.applyStyles(w, {
                height: e
            })
        },
        replacePngPath: function(y) {
            if (t.msie6) {
                if (b.location.href.indexOf("http://") > -1) {
                    return
                }
                try {
                    var B = t.getStyle(y, "filter");
                    var x = /src='([^']+)'/.exec(B)[1];
                    if (!x || x == "none") {
                        return
                    } else {
                        if (x.indexOf("http://") > -1) {
                            return
                        }
                    }
                    var w = b.location.href.split("/");
                    w.push("css");
                    w.pop();
                    x = x.replace(/\.\.\//g, function() {
                        w.pop();
                        return ""
                    });
                    var z = w.join("/") + "/" + x;
                    y.style.filter = B.replace(/src='([^']+)'/, "src='" + z + "'")
                } catch (A) {
                    alert(A)
                }
            }
        }
    });
    Object.extend(v, {
        EMPTY_BOGUS: (t.msie_quirks || t.msie && t.msie_ver < 11 ? "&nbsp;" : "<br>")
    });
    Object.extend(v, {
        EMPTY_PARAGRAPH_HTML: "<p>" + v.EMPTY_BOGUS + "</p>"
    });
    h.$tom = v;
    (function(e) {
        e.Util = {
            _dispElIds: [],
            getDispElId: function() {
                var x;
                do {
                    x = "tx_entry_" + (Math.floor(Math.random() * 90000) + 10000) + "_"
                } while (e.Util._dispElIds.contains(x));
                e.Util._dispElIds.push(x);
                return x
            },
            generateKey: function() {
                return parseInt(Math.random() * 100000000)
            },
            toStyleString: function(y) {
                var z = [];
                for (var x in y) {
                    if (y[x]) {
                        z.push(x.replace(/([A-Z])/g, "-$1").toLowerCase());
                        z.push(":");
                        z.push(y[x]);
                        z.push(";")
                    }
                }
                return z.join("")
            },
            toAttrString: function(y) {
                var z = [];
                for (var x in y) {
                    if (y[x]) {
                        z.push(" " + x + '="' + y[x] + '"')
                    }
                }
                return z.join("")
            },
            getMatchValue: function(z, y, A) {
                var x;
                if ((x = z.exec(y)) != i) {
                    return x[A]
                } else {
                    return i
                }
            },
            getAttachmentType: function(y) {
                y = (y || "").toLowerCase();
                var x = ["image/jpg", "image/jpeg", "image/png", "image/tiff", "image/gif", "image/bmp", "image/x-jg", "image/ief", "image/pict", "jpg", "bmp", "gif", "png"];
                if (x.contains(y)) {
                    return "image"
                }
                return "file"
            },
            thumburl: function(x) {
                x = (x || "").toLowerCase();
                switch (x) {
                    case "doc":
                    case "docx":
                        return w("#iconpath/pn_word.gif");
                    case "xls":
                    case "xlsx":
                        return w("#iconpath/pn_xls.gif");
                    case "ppt":
                    case "pptx":
                        return w("#iconpath/pn_ppt.gif");
                    case "pdf":
                        return w("#iconpath/pn_pdf.gif");
                    case "txt":
                        return w("#iconpath/pn_txt.gif");
                    case "hwp":
                        return w("#iconpath/pn_hwp.gif");
                    case "zip":
                    case "alz":
                        return w("#iconpath/pn_zip.gif");
                    case "mp3":
                    case "wav":
                    case "ogg":
                    case "wma":
                    case "mp4":
                    case "ape":
                    case "ra":
                    case "ram":
                        return w("#iconpath/pn_mp3.gif");
                    case "avi":
                    case "mpeg":
                    case "wmv":
                    case "asf":
                        return w("#iconpath/pn_movie.gif");
                    case "swf":
                        return w("#iconpath/pn_swf.gif");
                    case "htm":
                    case "html":
                        return w("#iconpath/pn_html.gif");
                    case "jpg":
                    case "gif":
                    case "png":
                    case "bmp":
                        return w("#iconpath/pn_etc.gif");
                    default:
                        return w("#iconpath/pn_etc.gif")
                }
            },
            prevurl: function(x) {
                x = (x || "").toLowerCase();
                switch (x) {
                    case "doc":
                    case "docx":
                        return w("#iconpath/p_word_s.gif");
                    case "xls":
                    case "xlsx":
                        return w("#iconpath/p_xls_s.gif");
                    case "ppt":
                    case "pptx":
                        return w("#iconpath/p_ppt_s.gif");
                    case "pdf":
                        return w("#iconpath/p_pdf_s.gif");
                    case "txt":
                        return w("#iconpath/p_txt_s.gif");
                    case "hwp":
                        return w("#iconpath/p_hwp_s.gif");
                    case "zip":
                    case "alz":
                        return w("#iconpath/p_zip_s.gif");
                    case "mp3":
                    case "wav":
                    case "ogg":
                    case "wma":
                    case "mp4":
                    case "ape":
                    case "ra":
                    case "ram":
                        return w("#iconpath/p_mp3_s.gif");
                    case "avi":
                    case "mpeg":
                    case "wmv":
                    case "asf":
                        return w("#iconpath/p_movie_s.gif");
                    case "swf":
                        return w("#iconpath/p_swf_s.gif");
                    case "htm":
                    case "html":
                        return w("#iconpath/p_html_s.gif");
                    case "jpg":
                        return w("#iconpath/p_jpg_s.gif");
                    case "gif":
                        return w("#iconpath/p_gif_s.gif");
                    case "png":
                    case "bmp":
                        return w("#iconpath/p_png_s.gif");
                    default:
                        return w("#iconpath/p_etc_s.gif")
                }
            },
            getMatchedClassName: function(B, A) {
                var x = c;
                var y = "";
                for (var z = 0; z < A.length; z++) {
                    y = A[z];
                    if (t.hasClassName(B, y)) {
                        x = y;
                        break
                    }
                }
                return x
            },
            getAllAttributesFromEmbed: function(y) {
                var B = {};
                y = y.replace(/<embed|>/ig, "");
                try {
                    var A = /(\w+)=((?:\")[^\"]+(?:\"|$)|(?:')[^']+(?:'|$)|(?:[^\"'][^ \n]+($| |\n)))/ig;
                    var x;
                    while ((x = A.exec(y)) != i) {
                        B[x[1].trim().toLowerCase()] = x[2].replace(/^(\"|')/i, "").replace(/(\"|')$/i, "").trim()
                    }
                } catch (z) {}
                return B
            },
            getAllAttributes: function(z) {
                var A = {};
                var x;
                var y = /style="(?:\s*|(?:[^"]*(?:;\s*)))width\s*:\s*([0-9]+)px[^"]*"/ig;
                while ((x = y.exec(z)) != i) {
                    A.width = x[1]
                }
                y = /style="(?:\s*|(?:[^"]*(?:;\s*)))height\s*:\s*([0-9]+)px[^"]*"/ig;
                while ((x = y.exec(z)) != i) {
                    A.height = x[1]
                }
                y = new RegExp('\\s+([a-zA-Z]+)="([^"]*)"', "g");
                while ((x = y.exec(z)) != i) {
                    if (!A[x[1].toLowerCase()]) {
                        A[x[1].toLowerCase()] = x[2]
                    }
                }
                y = new RegExp("\\s+([a-zA-Z]+)='([^']*)'", "g");
                while ((x = y.exec(z)) != i) {
                    if (!A[x[1].toLowerCase()]) {
                        A[x[1].toLowerCase()] = x[2]
                    }
                }
                y = new RegExp("\\s+([a-zA-Z]+)=([^\\s>]*)", "g");
                while ((x = y.exec(z)) != i) {
                    if (!A[x[1].toLowerCase()]) {
                        A[x[1].toLowerCase()] = x[2]
                    }
                }
                return A
            }
        };
        e.HtmlCreator = {
            createTableMarkup: function(F, B, z) {
                var y = [];
                y.push('<table unselectable="on">');
                y.push("<tbody>");
                var D = z.length;
                var A;
                for (var E = 0; E < F; E++) {
                    y.push("<tr>");
                    for (var x = 0; x < B; x++) {
                        if (E * B + x < D) {
                            A = z[E * B + x];
                            if (A.image) {
                                var C = p.getIconPath(A.image);
                                y.push('<td class="tx-menu-list-item"><a href="javascript:;"><span class="' + (A.klass || "") + '"><img src="' + C + '" data="' + A.data + '"/></span></a></td>')
                            } else {
                                y.push('<td class="tx-menu-list-item"><a href="javascript:;"><span class="' + (A.klass || "") + '">' + A.data + "</span></a></td>")
                            }
                        } else {
                            y.push('<td class="tx-menu-list-item"><a href="javascript:;"><span class="">&nbsp;</span></a></td>')
                        }
                    }
                    y.push("</tr>")
                }
                y.push("</tbody>");
                y.push("</table>");
                return y.join("\n")
            }
        };
        e.String = {
            escapeQuot: function(x) {
                return x.replace(new RegExp('"', "g"), "&quot;").replace(new RegExp("'", "g"), "&#39;")
            },
            unescapeQuot: function(x) {
                return x.replace(new RegExp("&quot;", "gi"), '"').replace(new RegExp("&#39;", "g"), "'")
            },
            htmlspecialchars: function(x) {
                return e.String.escapeQuot(x.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;").replace(new RegExp(">", "g"), "&gt;"))
            },
            unHtmlspecialchars: function(x) {
                return e.String.unescapeQuot(x.replace(new RegExp("&amp;", "gi"), "&").replace(new RegExp("&lt;", "gi"), "<").replace(new RegExp("&gt;", "gi"), ">"))
            },
            parseAttribute: function(y, B) {
                var C = new RegExp("(^|\\W)" + B + '="([^"]*)"', "gi");
                var A = new RegExp("(^|\\W)" + B + "='([^']*)'", "gi");
                var z = new RegExp("(^|\\W)" + B + "=([^\\s>]*)", "gi");
                var x;
                if (x = C.exec(y)) {
                    return x[2]
                } else {
                    if (x = A.exec(y)) {
                        return x[2]
                    } else {
                        if (x = z.exec(y)) {
                            return x[2]
                        } else {
                            return ""
                        }
                    }
                }
            },
            changeAttribute: function(z, y, C, A) {
                var F = new RegExp("(^|\\W)(" + y + '=")' + C + '(")', "gi");
                var E = new RegExp("(^|\\W)(" + y + "=')" + C + "(')", "gi");
                var D = new RegExp("(^|\\W)(" + y + "=)" + C, "gi");
                var B = new RegExp("<([\\w]+\\s*)", "gi");
                var x = c;
                if (z.search(F) > -1) {
                    x = u;
                    z = z.replace(F, "$1$2" + A + "$3")
                }
                if (z.search(E) > -1) {
                    x = u;
                    z = z.replace(E, "$1$2" + A + "$3")
                }
                if (z.search(D) > -1) {
                    x = u;
                    z = z.replace(D, "$1$2" + A)
                }
                if (!x) {
                    z = z.replace(B, "<$1" + y + "=" + A + " ")
                }
                return z
            }
        };
        e.Validator = e.Class.create({
            initialize: function() {},
            strip: function(x) {
                return x.stripTags().replace(/&nbsp;/g, "").replace(e.__WORD_JOINER_REGEXP, "").trim()
            },
            exists: function(x) {
                if (!x) {
                    return c
                }
                if (this.strip(x) == "") {
                    if (x.search(/<(img|iframe|object|embed|table|hr|script|TXDB)/i) < 0) {
                        return c
                    }
                }
                return u
            },
            equals: function(x, y) {
                if (!x || !y) {
                    return c
                }
                if (x.search(/<(img|iframe|object|embed|table|hr|script|TXDB)/i) < 0) {
                    if (this.strip(x) == this.strip(y)) {
                        return u
                    }
                }
                return c
            }
        });
        e.Repeater = e.Class.create({
            initialize: function(x) {
                this.execHandler = x
            },
            start: function(x) {
                if (this.tItv) {
                    this.clear()
                }
                this.tItv = h.setInterval(this.onTimer.bind(this), x)
            },
            clear: function() {
                h.clearInterval(this.tItv);
                this.tItv = i
            },
            onTimer: function() {
                if (this.execHandler != i) {
                    this.execHandler()
                }
            }
        });
        e.Timer = e.Class.create({
            initialize: function(x) {
                this.execHandler = x
            },
            start: function(x) {
                h.setTimeout(this.onTimer.bind(this), x)
            },
            onTimer: function() {
                if (this.execHandler != i) {
                    this.execHandler()
                }
            }
        });
        e.Paging = e.Class.create({
            $const: {
                DEFAULT_PAGE_SIZE: 5,
                DEFAULT_BLOCK_SIZE: 10
            },
            initialize: function(y, x) {
                this.data = y;
                this.currentpage = x.initPage || 1;
                this.totalrow = x.totalrow || this.getTotalRow();
                this.pagesize = x.pagesize || e.Paging.DEFAULT_PAGE_SIZE;
                this.blocksize = x.blocksize || e.Paging.DEFAULT_PAGE_SIZE;
                this.totalpage = Math.ceil(this.totalrow / this.pagesize);
                this.totalblock = Math.ceil(this.totalpage / this.blocksize)
            },
            getNextPage: function() {
                return (this.currentpage < this.totalpage) ? this.currentpage + 1 : 0
            },
            getPrevPage: function() {
                return (this.currentpage > 1) ? this.currentpage - 1 : 0
            },
            getNextBlock: function() {
                var x = Math.ceil(this.currentpage / this.blocksize);
                return (x < this.totalblock) ? x * this.blocksize + 1 : 0
            },
            getPrevBlock: function() {
                var x = Math.ceil(this.currentpage / this.blocksize);
                return (x > 1) ? (x - 2) * this.blocksize + 1 : 0
            },
            getPageList: function() {
                var y = [];
                var x = Math.ceil(this.currentpage / this.blocksize) - 1;
                var A = (x * this.blocksize + 1);
                var B = Math.min(this.totalpage, (A + this.blocksize - 1));
                for (var z = A; z <= B; z++) {
                    y.push(z)
                }
                return y
            },
            movePage: function(x) {
                this.currentpage = x || this.currentpage
            },
            getOnePageData: function() {
                var x = [];
                var A = (this.currentpage - 1) * this.pagesize;
                var y = Math.min(this.currentpage * this.pagesize, this.totalrow);
                for (var z = A; z < y; z++) {
                    x.push(this.data[z])
                }
                return x
            },
            getTotalRow: function() {
                return this.data.length
            }
        });
        e.Slidebar = e.Class.create({
            initialize: function(x) {
                this.elContext = x.el;
                this.knobWidth = x.knobWidth;
                this.isDisabled = c;
                this.handler = function(z) {
                    if (!this.isDisabled && typeof x.handler == "function") {
                        x.handler(z)
                    }
                };
                this.logicObj = {
                    interval: x.interval || 5,
                    min: x.min || 0,
                    max: x.max || 100
                };
                this.physicObj = {
                    min: 0,
                    width: x.barSize || 100
                };
                this.physicObj.max = this.physicObj.width - this.knobWidth;
                this.physicObj.interval = this.logicObj.interval * this.physicObj.max / this.logicObj.max;
                this.startPos = 0;
                this.startX = 0;
                this.isDrag = c;
                this.result = 0;
                var y = v.collect(this.elContext, "dd.tx-slide");
                v.collect(y, "span.tx-slide-min").innerHTML = "";
                v.collect(y, "span.tx-slide-max").innerHTML = "";
                this.bindEvent();
                this.setKnobPosition(x.defaultValue || x.min || 0)
            },
            regenerate: function(x) {
                x = parseInt(x * this.physicObj.width / this.logicObj.max);
                this.setKnobPosition(x)
            },
            bindEvent: function() {
                var z = v.collect(this.elContext, "dd.tx-slide");
                var y = v.collect(z, "a.tx-slide-prev");
                var x = v.collect(z, "a.tx-slide-next");
                var B = v.collect(z, "div.tx-slide-bar");
                var A = this.elKnob = v.collect(z, "div.tx-slide-knob");
                t.observe(A, "mousedown", function(C) {
                    this.isDrag = u;
                    this.startPos = this.getKnobPosition();
                    this.startX = C.clientX;
                    t.stop(C)
                }.bind(this));
                t.observe(A, "mouseup", function() {
                    this.isDrag = c
                }.bind(this));
                t.observe(this.elContext, "mousemove", function(C) {
                    if (this.isDrag) {
                        this.setKnobPosition(this.startPos + C.clientX - this.startX);
                        t.stop(C);
                        this.handler(this.result)
                    }
                }.bind(this));
                t.observe(y, "click", function(E) {
                    var D = Math.round(this.physicObj.interval) - 1;
                    var C = this;
                    var F = function() {
                        var G = C.getKnobPosition();
                        C.setKnobPosition(G - 1);
                        if (D-- > 0) {
                            setTimeout(F, 10)
                        } else {
                            C.handler(C.result)
                        }
                    };
                    F();
                    t.stop(E)
                }.bind(this));
                t.observe(x, "click", function(E) {
                    var D = Math.round(this.physicObj.interval);
                    var C = this;
                    var F = function() {
                        var G = C.getKnobPosition();
                        C.setKnobPosition(G + 1);
                        if (--D > 0) {
                            setTimeout(F, 10)
                        } else {
                            C.handler(C.result)
                        }
                    };
                    F();
                    t.stop(E)
                }.bind(this));
                t.observe(this.elContext, "mouseup", function() {
                    if (this.isDrag) {
                        this.isDrag = c
                    }
                }.bind(this));
                t.observe(A, "click", function(C) {
                    t.stop(C)
                }.bind(this));
                t.observe(B, "click", function(D) {
                    if (!this.isDrag) {
                        var C = D.layerX || D.x;
                        this.setKnobPosition(C - this.knobWidth / 2);
                        this.handler(this.result)
                    }
                }.bind(this))
            },
            getKnobPosition: function() {
                var x = t.getStyle(this.elKnob, "left");
                return x.parsePx()
            },
            setKnobPosition: function(x) {
                x = (x < this.physicObj.max) ? x : this.physicObj.max;
                x = (x > this.physicObj.min) ? x : this.physicObj.min;
                t.setStyle(this.elKnob, {
                    left: x.toPx()
                });
                this.result = Math.round(x * this.logicObj.interval / this.physicObj.interval)
            },
            setDisable: function() {
                this.isDisabled = u
            },
            setEnable: function() {
                this.isDisabled = c
            },
            getDisabled: function() {
                return this.isDisabled
            }
        });
        e.DynamicSizer = e.Class.create({
            initialize: function(x) {
                this.config = x;
                this.wrapper = x.el;
                this.elEventContext = tx.div({
                    className: "tx-dynamic-sizer-context"
                });
                this.currentSize = {
                    row: 0,
                    col: 0
                };
                this.dynamicSizingEnabled = u;
                if (!x.moveHandler) {
                    x.moveHandler = function() {}
                }
                if (!x.clickHandler) {
                    x.clickHandler = function() {}
                }
                this.wrapper.appendChild(this.elEventContext);
                this.previewTable = new e.DynamicSizer.PreviewTable({
                    parentEl: this.elEventContext,
                    mouseOverHandler: this.changeSize.bind(this),
                    mouseClickHandler: this.selectSize.bind(this)
                })
            },
            clear: function() {
                this.dynamicSizingEnabled = u;
                this.changeSize(0, 0)
            },
            changeSize: function(y, x) {
                if (this.dynamicSizingEnabled) {
                    this.currentSize.row = y;
                    this.currentSize.col = x;
                    this._changeSelectionSize(y, x);
                    this.config.moveHandler(y, x)
                }
            },
            _changeSelectionSize: function(y, x) {
                this.previewTable.moveSelectionPos(y, x)
            },
            toggleDynamicSizing: function() {
                this.dynamicSizingEnabled = !this.dynamicSizingEnabled;
                if (this.dynamicSizingEnabled) {
                    this.selection.enableResize()
                } else {
                    this.selection.disableResize()
                }
            },
            selectSize: function(x) {
                this.config.clickHandler(x, this.currentSize)
            },
            getCurruentSize: function() {
                return this.currentSize
            }
        });
        e.DynamicSizer.PreviewTable = e.Class.create({
            $const: {
                DEFAULT_TD_STYLE: {},
                DEFAULT_TABLE_PROPERTY: {
                    cellpadding: "0",
                    cellspacing: "1"
                },
                MAX_SIZE: {
                    COL: 10,
                    ROW: 10
                }
            },
            initialize: function(y) {
                this.config = y;
                this.elTable = i;
                this.elTable = this.generateTable("tx-event");
                this.elSelection = tx.div({
                    className: "tx-selection"
                }, this.generateTable("tx-selection"));
                var z = this.generateTable("tx-panel");
                this.eventBinding();
                y.parentEl.appendChild(this.elTable);
                y.parentEl.appendChild(this.elSelection);
                y.parentEl.appendChild(z);
                var A = v.getPosition(this.elTable);
                var x = e.DynamicSizer.PreviewTable.MAX_SIZE;
                this.cellSize = {
                    width: Math.round((A.width - A.x) / x.COL),
                    height: (A.height - A.y) / x.ROW
                }
            },
            generateTable: function(B) {
                var z = tx.tbody();
                var y = e.DynamicSizer.PreviewTable;
                for (var A = 0; A < y.MAX_SIZE.ROW; A++) {
                    var D = tx.tr();
                    for (var x = 0; x < y.MAX_SIZE.COL; x++) {
                        var E = tx.td(tx.div({
                            style: y.DEFAULT_TD_STYLE
                        }));
                        E = this.setCoordToAttr(E, x + 1, A + 1);
                        D.appendChild(E)
                    }
                    z.appendChild(D)
                }
                var C = tx.table(y.DEFAULT_TABLE_PROPERTY);
                t.addClassName(C, B || "");
                C.appendChild(z);
                return C
            },
            moveSelectionPos: function(A, y) {
                var z = (y * this.cellSize.width).toPx();
                var x = (A * this.cellSize.height).toPx();
                t.setStyle(this.elSelection, {
                    width: z,
                    height: x
                })
            },
            setCoordToAttr: function(y, x, z) {
                y.setAttribute("col", x);
                y.setAttribute("row", z);
                return y
            },
            getCoordFromAttr: function(x) {
                return {
                    col: x.getAttribute("col") || 0,
                    row: x.getAttribute("row") || 0
                }
            },
            eventBinding: function() {
                this.mouseOverHandler = this.config.mouseOverHandler;
                this.mouseClickHandler = this.config.mouseClickHandler;
                var x = this;
                var z = function(C) {
                    var B = t.element(C) || {};
                    var A = (B.tagName || "").toUpperCase();
                    if (B && A == "TD") {
                        var D = x.getCoordFromAttr(B);
                        x.mouseOverHandler(D.row, D.col)
                    }
                    t.stop(C)
                };
                var y = function(A) {
                    x.mouseClickHandler(A)
                };
                t.observe(this.elTable, "mouseover", z);
                t.observe(this.elTable, "click", y)
            }
        });
        e.ImageScale = e.Class.create({
            initialize: function(z, y) {
                if (!z.imageurl) {
                    return
                }
                if (z.actualwidth) {
                    return
                }
                var x = function(B, A) {
                    z.actualwidth = B;
                    z.actualheight = A;
                    if (y) {
                        y(B, A)
                    }
                };
                setTimeout(function() {
                    var A = new Image();
                    A.onerror = function() {
                        A = i
                    };
                    if (A.onreadystatechange) {
                        A.onreadystatechange = function() {
                            if (this.readyState == "complete") {
                                x(this.width, this.height);
                                A = i
                            }
                        }
                    } else {
                        A.onload = function() {
                            x(this.width, this.height);
                            A = i
                        }
                    }
                    A.src = z.imageurl
                }, 10)
            }
        });

        function w(x) {
            var y = p.getIconPath(x);
            return y + ""
        }
    })(g);
    g.ImageResizer = g.Class.create({
        initialize: function(C, x) {
            var z = C;
            var B = x.maxWidth || 200;
            var A = x.maxHeight || 200;
            var y = x.defImgUrl;
            var e = x.onComplete || function() {};

            function w(I, F) {
                var G, E;
                var H = I.width;
                var D = I.height;
                if (H == B && D == A) {
                    E = B;
                    G = A
                } else {
                    if (H < B && D < A) {
                        E = H;
                        G = D
                    } else {
                        G = A;
                        E = Math.floor(A * (H / D));
                        if (E > B) {
                            E = B;
                            G = Math.floor(B * (D / H))
                        }
                    }
                }
                z.width = E;
                z.height = G;
                z.src = F;
                e(E, G)
            }
            this.execResize = function(D) {
                var E = new Image();
                E.onerror = function() {
                    z.width = B;
                    z.height = A;
                    z.src = y;
                    E = i
                };
                if (E.onreadystatechange) {
                    E.onreadystatechange = function() {
                        if (this.readyState == "complete") {
                            w(E, D)
                        }
                    }
                } else {
                    E.onload = function() {
                        w(E, D)
                    }
                }
                E.src = D
            }
        }
    });
    g.TableUtil = {
        isDaumTable: function(e) {
            return t.hasClassName(e, "txc-table")
        },
        cloneNodeForEmptyTd: function(w) {
            var e;
            e = w.cloneNode(c);
            g.TableUtil.emptyTd(e);
            return e
        },
        emptyTd: function(e) {
            e.innerHTML = "&nbsp;"
        },
        splitWidthByColSpan: function(w) {
            var e;
            if (1 < w.colSpan && w.style.width) {
                e = parseInt(w.style.width, 10);
                v.setStyles(w, {
                    width: Math.floor(e / w.colSpan) + "px"
                }, u)
            }
        },
        splitHeightByRowSpan: function(w) {
            var e;
            if (1 < w.rowSpan && w.style.height) {
                e = parseInt(w.style.height, 10);
                v.setStyles(w, {
                    height: Math.floor(e / w.rowSpan) + "px"
                }, u)
            }
        },
        collapseCaret: function(x, w) {
            var e;
            try {
                e = x.getProcessor().createGoogRangeFromNodes(w, 0, w, 0);
                e.select()
            } catch (y) {}
        },
        getClosestByTagNames: function(e, x) {
            var w;
            if (x && typeof x.tagName === "string") {
                w = x.tagName.toLowerCase();
                if (w !== "body") {
                    if (e.contains(w)) {
                        return x
                    } else {
                        return arguments.callee(e, x.parentNode)
                    }
                }
            }
            return i
        },
        getTableIndexerFromTd: function(w) {
            var e;
            e = g.TableUtil.getClosestByTagNames(["table"], w);
            return new g.TableUtil.Indexer(e)
        }
    };
    g.TableUtil.Boundary = g.Class.create({
        initialize: function(e) {
            this.top = -1;
            this.left = -1;
            this.bottom = -1;
            this.right = -1;
            if (e) {
                this.set(e)
            }
        },
        getTop: function() {
            return this.top
        },
        getLeft: function() {
            return this.left
        },
        getBottom: function() {
            return this.bottom
        },
        getRight: function() {
            return this.right
        },
        setTop: function(e) {
            this.top = e
        },
        setLeft: function(e) {
            this.left = e
        },
        setBottom: function(e) {
            this.bottom = e
        },
        setRight: function(e) {
            this.right = e
        },
        set: function(e) {
            if ("top" in e) {
                this.setTop(e.top)
            }
            if ("left" in e) {
                this.setLeft(e.left)
            }
            if ("bottom" in e) {
                this.setBottom(e.bottom)
            }
            if ("right" in e) {
                this.setRight(e.right)
            }
        },
        isValid: function() {
            if (this.top === -1) {
                return c
            }
            if (this.left === -1) {
                return c
            }
            if (this.bottom === -1) {
                return c
            }
            if (this.right === -1) {
                return c
            }
            return u
        },
        addBoundary: function(y, w) {
            var x, e;
            x = this.addStartBoundary(y, w);
            e = this.addEndBoundary(y, w);
            return x || e
        },
        merge: function(x) {
            var w, e;
            w = this.addStartBoundary(x.top, x.left);
            e = this.addEndBoundary(x.bottom, x.right);
            return w || e
        },
        addStartBoundary: function(x, e) {
            var w;
            w = c;
            if (this.top === -1 || x < this.top) {
                this.top = x;
                w = u
            }
            if (this.left === -1 || e < this.left) {
                this.left = e;
                w = u
            }
            return w
        },
        addEndBoundary: function(x, e) {
            var w;
            w = c;
            if (this.bottom === -1 || this.bottom < x) {
                this.bottom = x;
                w = u
            }
            if (this.right === -1 || this.right < e) {
                this.right = e;
                w = u
            }
            return w
        }
    });
    g.TableUtil.Indexer = g.Class.create({
        initialize: function(e) {
            this.indexData = i;
            this.table = i;
            this.resetIndex();
            this.setTable(e);
            this.makeIndex()
        },
        getRowSize: function() {
            return this.indexData.length
        },
        getColSize: function() {
            if (0 < this.indexData.length) {
                return this.indexData[0].length
            }
            return 0
        },
        getTd: function(w, e) {
            if (this.indexData[w]) {
                if (this.indexData[w][e]) {
                    return this.indexData[w][e]
                }
            }
            return i
        },
        getTdArr: function(z) {
            var e, y, x, w;
            e = [];
            y = z.top;
            while (y <= z.bottom) {
                x = this.indexData[y];
                w = z.left;
                while (w <= z.right) {
                    if (e.contains(x[w]) === c) {
                        e.push(x[w])
                    }
                    w += 1
                }
                y += 1
            }
            return e
        },
        getTdArrHasTop: function(x) {
            var w, A, z, e, y;
            w = [];
            e = this.getColSize();
            for (y = 0; y < e; y += 1) {
                A = this.getTd(x, y);
                z = this.getTd(x - 1, y);
                this.uniquePushWhenDifferent(w, A, z)
            }
            return w
        },
        getTdArrHasBottom: function(x) {
            var w, A, z, e, y;
            w = [];
            e = this.getColSize();
            for (y = 0; y < e; y += 1) {
                A = this.getTd(x, y);
                z = this.getTd(x + 1, y);
                this.uniquePushWhenDifferent(w, A, z)
            }
            return w
        },
        getTdArrHasLeft: function(x) {
            var w, A, z, e, y;
            w = [];
            e = this.getRowSize();
            for (y = 0; y < e; y += 1) {
                A = this.getTd(y, x);
                z = this.getTd(y, x - 1);
                this.uniquePushWhenDifferent(w, A, z)
            }
            return w
        },
        getTdArrHasRight: function(x) {
            var w, A, z, e, y;
            w = [];
            e = this.getRowSize();
            for (y = 0; y < e; y += 1) {
                A = this.getTd(y, x);
                z = this.getTd(y, x + 1);
                this.uniquePushWhenDifferent(w, A, z)
            }
            return w
        },
        getBoundary: function(C) {
            var e, A, z, B, x, y, w;
            e = new g.TableUtil.Boundary();
            A = this.indexData;
            z = A.length;
            for (B = 0; B < z; B += 1) {
                x = A[B];
                if (x) {
                    y = x.length;
                    for (w = 0; w < y; w += 1) {
                        if (x[w] === C) {
                            e.addBoundary(B, w)
                        }
                    }
                }
            }
            return e
        },
        reload: function() {
            this.resetIndex();
            this.makeIndex()
        },
        uniquePushWhenDifferent: function(e, x, w) {
            if (x !== w) {
                if (e.contains(x) === c) {
                    e.push(x)
                }
            }
        },
        resetIndex: function() {
            this.indexData = []
        },
        setTable: function(e) {
            this.table = e
        },
        makeIndex: function() {
            var A, z, C, B, x, y, w, e;
            A = this.table.rows;
            z = A.length;
            for (C = 0; C < z; C += 1) {
                B = A[C];
                x = B.cells;
                y = x.length;
                for (w = 0; w < y; w += 1) {
                    e = x[w];
                    this.addCellIndex(C, e)
                }
            }
        },
        addCellIndex: function(C, e) {
            var B, A, y, w, x, z;
            B = this.getNextCellIndex(this.indexData[C]);
            y = e.rowSpan;
            for (A = 0; A < y; A += 1) {
                w = C + A;
                if (!this.indexData[w]) {
                    this.indexData[w] = []
                }
                z = e.colSpan;
                for (x = 0; x < z; x += 1) {
                    this.indexData[w][B + x] = e
                }
            }
        },
        getNextCellIndex: function(w) {
            var x, e;
            if (!w) {
                return 0
            }
            e = w.length;
            for (x = 0; x < e; x += 1) {
                if (!w[x]) {
                    break
                }
            }
            return x
        }
    });
    g.I.XHRequester = g.Faculty.create({
        createXMLHttp: function() {
            var x = i;
            try {
                if (h.XMLHttpRequest) {
                    x = new XMLHttpRequest()
                } else {
                    if (h.ActiveXObject) {
                        x = new ActiveXObject("Msxml2.XMLHTTP");
                        if (!x) {
                            x = new ActiveXObject("Microsoft.XMLHTTP")
                        }
                    }
                }
                return x
            } catch (w) {
                return i
            }
        },
        sendRequest: function(w, x, y, z, D, E) {
            if (x == i && x != "") {
                return i
            }
            var B = i;
            var A = this.createXMLHttp();
            if (A == i) {
                return i
            }
            var F = function() {
                if (A.status == 200) {
                    if (w.toUpperCase() == "HEAD") {
                        B = D(A.getAllResponseHeaders())
                    } else {
                        B = D(A.responseText)
                    }
                } else {
                    B = E(A.status)
                }
                A = i
            };
            try {
                if (z) {
                    A.onreadystatechange = function() {
                        if (A.readyState == 4) {
                            F()
                        }
                    }
                }
                if (w.toUpperCase() == "POST") {
                    A.open("POST", x, z);
                    A.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
                    A.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    A.send(y)
                } else {
                    if (y && y.length > 0) {
                        x = x + ((x.indexOf("?") > -1) ? "&" : "?") + y
                    }
                    A.open(w.toUpperCase(), x, z);
                    A.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    A.send(i)
                }
                if (!z) {
                    F()
                }
                return B
            } catch (C) {
                return i
            }
        }
    });
    g.Responder = {
        callbacks: {},
        process: function() {},
        newKey: function() {
            var e = "exe_" + Math.floor(Math.random() * 100000);
            if (this[e]) {
                return this.newKey()
            } else {
                return e
            }
        },
        register: function(w) {
            var e = this.newKey();
            this.callbacks[e] = function(x) {
                w(x);
                this.callbacks[e] = i
            }.bind(this);
            return e
        }
    };
    g.I.JSRequester = g.Faculty.create({
        importScript: function(y, B, A, D) {
            if (y == i && y != "") {
                return i
            }
            B = B || "utf-8";
            A = A || b;
            try {
                var z = A.getElementsByTagName("head")[0] || A.documentElement;
                var x = A.createElement("script");
                x.type = "text/javascript";
                x.charset = B;
                x.src = y;
                var w = c;
                x.onload = x.onreadystatechange = function() {
                    if (!w && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                        w = u;
                        if (D) {
                            D()
                        }
                        x.onload = x.onreadystatechange = i;
                        if (z && x.parentNode) {
                            z.removeChild(x)
                        }
                    }
                };
                z.insertBefore(x, z.firstChild)
            } catch (C) {}
        }
    });
    h.$stop = {};
    h.$propagate = {};
    g.I.JobObservable = g.Faculty.create({
        jobObservers: {},
        observeJob: function(w, e) {
            if (!this.jobObservers[w]) {
                this.jobObservers[w] = []
            }
            this.jobObservers[w].push(e)
        },
        reserveJob: function(y, w, x) {
            x = x || 500;
            if (!this.jobObservers[y]) {
                this.jobObservers[y] = []
            }
            var e = this;
            this.jobObservers[y].push(function() {
                var z = $A(arguments);
                setTimeout(function() {
                    w.apply(e, z)
                }, x)
            })
        },
        removeJob: function(e, x) {
            if (!this.jobObservers[e]) {
                return
            }
            if (!x) {
                this.jobObservers[e].length = 0
            } else {
                for (var w = 0; w < this.jobObservers[e].length; w++) {
                    if (this.jobObservers[e][w] === x) {
                        this.jobObservers[e].splice(w, 1)
                    }
                }
            }
        },
        fireJobs: function(y) {
            var w = this;
            var x = $A(arguments).slice(1);
            if (!this.jobObservers[y]) {
                return
            }
            if (h.DEBUG) {
                this.jobObservers[y].each(function(e) {
                    e.apply(w, x)
                })
            } else {
                try {
                    this.jobObservers[y].each(function(e) {
                        e.apply(w, x)
                    })
                } catch (z) {
                    if (z != $stop) {
                        throw z
                    }
                }
            }
        }
    });
    g.I.KeyObservable = g.Faculty.create({
        keyObservers: {},
        observeKey: function(x, w) {
            var e = function(y) {
                return (y.ctrlKey ? "T" : "F") + (y.altKey ? "T" : "F") + (y.shiftKey ? "T" : "F") + "_" + y.keyCode
            }(x);
            if (!this.keyObservers[e]) {
                this.keyObservers[e] = []
            }
            this.keyObservers[e].push(w)
        },
        fireKeys: function(y) {
            var x = function(A) {
                return (A.ctrlKey ? "T" : "F") + (A.altKey ? "T" : "F") + (A.shiftKey ? "T" : "F") + "_" + A.keyCode
            }(y);
            if (!this.keyObservers[x]) {
                return
            }
            var w = this;
            var z = c;
            var e = function() {
                if (!z) {
                    t.stop(y);
                    z = u
                }
            };
            this.keyObservers[x].each(function(A) {
                try {
                    A.apply(w, [y]);
                    e()
                } catch (B) {
                    if (B === $stop) {
                        e()
                    } else {
                        if (B !== $propagate) {}
                    }
                }
            })
        },
        registerKeyEvent: function(w) {
            try {
                t.observe(w, "keydown", this.fireKeys.bind(this), u)
            } catch (x) {}
        }
    });
    g.I.ElementObservable = g.Faculty.create({
        elementObservers: {},
        observeElement: function(x, e) {
            if (x == i) {
                this.observeElement({
                    tag: "*tx-final-body*"
                }, e)
            } else {
                if (x.length) {
                    for (var w = 0; w < x.length; w++) {
                        var y = x[w];
                        this.observeElement(y, e)
                    }
                } else {
                    if (!this.elementObservers[x.tag]) {
                        this.elementObservers[x.tag] = {}
                    }
                    if (!x.klass) {
                        x.klass = "*tx-all-class*"
                    }
                    if (!this.elementObservers[x.tag][x.klass]) {
                        this.elementObservers[x.tag][x.klass] = []
                    }
                    this.elementObservers[x.tag][x.klass].push(e)
                }
            }
        },
        fireElements: function(z) {
            if (!z) {
                return
            }
            var y = z;
            var x = $A(arguments).slice(1);
            var w = this;
            try {
                var B;
                if (v.kindOf(y, "img,hr,table,button,iframe")) {
                    B = this.collectObserverByElement(y.nodeName.toLowerCase(), y.className);
                    if (B) {
                        B.each(function(e) {
                            e.apply(w, [y].concat(x))
                        })
                    }
                } else {
                    while (y) {
                        B = this.collectObserverByElement(y.nodeName.toLowerCase(), y.className);
                        if (B) {
                            B.each(function(e) {
                                e.apply(w, [y].concat(x))
                            })
                        }
                        if (v.isBody(y)) {
                            break
                        }
                        y = v.parent(y)
                    }
                }
            } catch (A) {
                if (A != $stop) {
                    throw A
                }
            }
            this.fireFinally()
        },
        fireFinally: function() {
            var e = this;
            var w = $A(arguments).slice(1);
            var x = this.collectObserverByElement("*tx-final-body*");
            if (x) {
                x.each(function(y) {
                    y.apply(e, [i].concat(w))
                })
            }
        },
        collectObserverByElement: function(w, e) {
            if (!this.elementObservers[w]) {
                return i
            }
            var z = [];
            e = e || "";
            if (e != "") {
                var x = e.split(" ");
                for (var y in this.elementObservers[w]) {
                    if (x.contains(y)) {
                        z.push(this.elementObservers[w][y])
                    }
                }
            }
            if (this.elementObservers[w]["*tx-all-class*"]) {
                z.push(this.elementObservers[w]["*tx-all-class*"])
            }
            return z.flatten()
        }
    });
    g.I.MouseoverObservable = g.Faculty.create({
        mouseoverObservers: {},
        observeMouseover: function(e, w, x) {
            if (!this.mouseoverObservers[e]) {
                this.mouseoverObservers[e] = {
                    success: [],
                    fail: [],
                    flag: c
                }
            }
            this.mouseoverObservers[e]["success"].push(w);
            if (x) {
                this.mouseoverObservers[e]["fail"].push(x)
            }
        },
        fireMouseover: function(z) {
            if (!z) {
                return
            }
            var y = z;
            var w = this;
            try {
                for (var x in this.mouseoverObservers) {
                    this.mouseoverObservers[x].flag = c
                }
                while (y) {
                    var C = this.collectMouseoverObserver(y);
                    if (C.length > 0) {
                        var B = this.getPositionByNode(y);
                        C.each(function(e) {
                            e.apply(w, [y, B])
                        })
                    }
                    if (v.isBody(y)) {
                        break
                    }
                    y = v.parent(y)
                }
            } catch (A) {
                if (A != $stop) {
                    throw A
                }
            }
            this.runMouseoverFailHandler()
        },
        runMouseoverFailHandler: function() {
            var w = [];
            for (var e in this.mouseoverObservers) {
                if (!this.mouseoverObservers[e].flag) {
                    w.push(this.mouseoverObservers[e]["fail"])
                }
            }
            w.flatten().each(function(x) {
                x()
            })
        },
        collectMouseoverObserver: function(B) {
            var C = [];
            var x = B.className || "";
            var w = B.tagName;
            if (w) {
                w = w.toLowerCase();
                if (this.mouseoverObservers[w]) {
                    C.push(this.mouseoverObservers[w]["success"]);
                    this.mouseoverObservers[w]["flag"] = u
                }
            }
            if (x != "") {
                var y = x.split(" ");
                for (var A = 0, e = y.length; A < e; A++) {
                    var z = w + "." + y[A];
                    if (this.mouseoverObservers[z]) {
                        C.push(this.mouseoverObservers[z]["success"]);
                        this.mouseoverObservers[z]["flag"] = u
                    }
                }
            }
            return C.flatten()
        }
    });
    g.I.Runnable = g.Faculty.create({
        isRunning: c,
        repeater: i,
        threads: [],
        startThread: function(e) {
            if (this.repeater) {
                this.repeater.clear()
            } else {
                this.repeater = new g.Repeater(this.runThread.bind(this))
            }
            this.repeater.start(e)
        },
        stopThread: function() {
            this.repeater.clear()
        },
        runThread: function() {
            if (this.isRunning) {
                return
            }
            if (this.threads.length > 0) {
                this.isRunning = u;
                (this.threads.shift())();
                this.isRunning = c
            }
        },
        putThread: function(e, w) {
            if (w) {
                this.threads.unshift(e)
            } else {
                this.threads.push(e)
            }
        }
    });
    j.addMsg({
        "@menu.pallete.revert": "\uae30\ubcf8\uc0c9\uc73c\ub85c",
        "@adoptor.label": "\uac00\ub098\ub2e4",
        "@adoptor.transparent": "\ud22c\uba85"
    });
    g.MarkupTemplate.add("menu.colorpallete.text", '#{for:items}<li class="tx-menu-list-item" style="background-color:#{color}"><a unselectable="on" style="color:#{text}">#{label}</a></li>#{/for:items}');
    g.MarkupTemplate.add("menu.colorpallete.thumb", '#{for:items}<li class="tx-menu-list-item" unselectable="on" style="background-color:#{color};border:none;#{if:image!=null}background-image:url(#{image})#{/if:image};"></li>#{/for:items}');
    g.MarkupTemplate.add("menu.colorpallete.revert", '<p class="tx-pallete-revert"><a unselectable="on" href="javascript:;" title="@menu.pallete.revert">@menu.pallete.revert</a></p>');
    g.I.ColorPallete = g.Faculty.create({
        isGradeInit: c,
        isPickerDisplayed: c,
        onregenerated: function(e, w) {
            this.setColorValueAtInputbox(w)
        },
        setColorValueAtInputbox: function(x) {
            if (!x) {
                return
            }
            if (typeof x != "string" && x.toString) {
                x = x.toString()
            }
            var y = x.split("|")[0];
            if (!g.Color.getValidColor(y)) {
                y = "#000000"
            }
            var e = v.collect(this.elInner, "p.tx-pallete-input input");
            var w = v.collect(this.elInner, "p.tx-pallete-input span");
            if (x && e && w) {
                e.value = y;
                w.style.backgroundColor = y
            }
        },
        hookEvent: function(x) {
            var E = this.elMenu;
            var H = this.elInner = v.collect(E, "div.tx-menu-inner");
            var D = v.collect(H, "ul.tx-pallete-text-list");
            if (x.texts) {
                var K = x.texts.options;
                g.MarkupTemplate.get("menu.colorpallete.text").evaluateToDom({
                    items: K
                }, D);
                var z = v.collectAll(D, "li");
                this.addColorClickEvent(z, K)
            } else {
                H.removeChild(D);
                D = i
            }
            if (x.thumbs) {
                var F = !!x.needTrans;
                var C = [].concat(x.thumbs.options);
                if (F) {
                    C.pop();
                    C.push(Object.extend({}, x.thumbs.transparent))
                }
                var I = v.collect(H, "ul.tx-pallete-thumb-list");
                g.MarkupTemplate.get("menu.colorpallete.thumb").evaluateToDom({
                    items: C
                }, I);
                var A = v.collectAll(I, "li");
                this.addColorClickEvent(A, C)
            }
            this.elPicker = v.collect(H, "div.tx-pallete-picker");
            var w = v.collect(H, "div.tx-pallete-buttons");
            var e = this.elMore = v.collect(w, "p.tx-pallete-more a");
            t.observe(e, "click", this.togglePicker.bind(this));
            if (x.needRevert) {
                v.insertFirst(w, g.MarkupTemplate.get("menu.colorpallete.revert").evaluateAsDom({}));
                t.observe(v.collect(w, "p.tx-pallete-revert a"), "click", function(L) {
                    this.onSelect(L, i);
                    this.hide()
                }.bind(this))
            }
            var J = v.collect(this.elInner, "p.tx-pallete-input");
            this.elPreview = v.collect(J, "span");
            var B = this.elInput = v.collect(J, "input");
            var y = this.elEnter = v.collect(J, "a");
            var G = this;
            t.observe(B, "blur", function() {
                G.lastValue = B.value
            });
            t.observe(y, "click", this.onColorEnter.bind(this))
        },
        addColorClickEvent: function(A, w) {
            for (var y = 0, e = A.length; y < e; y++) {
                var x = A[y];
                var z = w[y];
                t.observe(x, "click", this.onSelect.bindAsEventListener(this, z.color + (z.text ? "|" + z.text : "")))
            }
        },
        _generatePicker: function() {
            var w = this.elPicker;
            var x = v.collect(w, "div.tx-pallete-pickerbox");
            t.observe(x, "mouseout", this.onMouseOut.bind(this));
            var y = this.elChromaBar = v.collect(x, "div.tx-chromabar");
            v.replacePngPath(y);
            t.observe(y, "mousedown", this.onChromDown.bindAsEventListener(this));
            t.observe(y, "mousemove", this.onChromMove.bindAsEventListener(this));
            t.observe(y, "mouseup", this.onChromUp.bindAsEventListener(this));
            this.elHueBar = v.collect(x, "div.tx-huebar");
            var e = this.elHueBar;
            this.hueDownHandler = this.onHueDown.bindAsEventListener(this);
            this.hueMoveHandler = this.onHueMove.bindAsEventListener(this);
            this.hueUpHandler = this.onHueUp.bindAsEventListener(this);
            this.hueClickHandler = this.onHueClick.bindAsEventListener(this);
            t.observe(e, "mousedown", this.hueDownHandler);
            t.observe(e, "click", this.hueClickHandler);
            this.nColWidth = 150;
            this.nColHeight = 120;
            this.nHueHeight = 120;
            this.mRGB = {
                r: 0,
                g: 0,
                b: 0
            };
            this.mHSV = {
                h: 0,
                s: 100,
                v: 100
            };
            this.setHueColor("FF0000")
        },
        reinitGrade: function() {
            var w = t.cumulativeOffset(this.elMenu);
            var e = t.positionedOffset(this.elChromaBar);
            this.iChromPos = {
                x: (w[0] + e[0]),
                y: (w[1] + e[1])
            };
            e = t.positionedOffset(this.elHueBar);
            this.iHuePos = {
                x: (w[0] + e[0]),
                y: (w[1] + e[1])
            }
        },
        onColorEnter: function(w) {
            var e;
            if (this.elInput.value == TXMSG("@adoptor.transparent")) {
                e = "transparent"
            } else {
                e = g.Color.getValidColor(this.elInput.value)
            }
            if (e !== i) {
                this.onSelect(w, e)
            }
            this.hide()
        },
        previewColor: function(e) {
            this.changeColor(e)
        },
        onMouseOut: function() {
            if (this.lastValue !== i && this.lastValue !== q && this.mousedownDetected) {
                this.changeColor(this.lastValue)
            }
        },
        changeColor: function(e) {
            e = g.Color.getHexColor(e);
            this.elPreview.style.backgroundColor = e;
            if (e == "transparent") {
                this.elInput.value = TXMSG("@adoptor.transparent")
            } else {
                this.elInput.value = e
            }
        },
        enterColor: function() {
            if (this.elInput.value == TXMSG("@adoptor.transparent")) {
                this.changeColor("transparent")
            } else {
                if (this.elInput.value.length == 7) {
                    var e = g.Color.getValidColor(this.elInput.value);
                    if (e !== i) {
                        this.changeColor(e)
                    }
                }
            }
        },
        togglePicker: function(x) {
            var e = this.elMore;
            var w = this.elPicker;
            if (this.isPickerDisplayed) {
                e.className = "tx-more-down";
                t.hide(w)
            } else {
                e.className = "tx-more-up";
                t.show(w);
                if (t.msie6) {
                    w.style.padding = "1px";
                    setTimeout(function() {
                        w.style.padding = "0px"
                    }, 0)
                }
                if (!this.isGradeInit) {
                    this._generatePicker();
                    this.isGradeInit = u;
                    this.reinitGrade()
                }
            }
            this.isPickerDisplayed = !this.isPickerDisplayed;
            t.stop(x)
        },
        getChromCoords: function(w) {
            var x = (w.clientX - this.iChromPos.x) + n.scrollLeft;
            var e = (w.clientY - this.iChromPos.y) + n.scrollTop;
            x = Math.min(this.nColWidth, Math.max(0, x));
            e = Math.min(this.nColHeight, Math.max(0, e));
            return {
                x: x,
                y: e
            }
        },
        getHueCoords: function(e) {
            var w = e.offsetY || e.layerY;
            return Math.min(this.nHueHeight, Math.max(0, w))
        },
        getColorByEvent: function(e, B) {
            var z = (e / (this.nColWidth)) * 100;
            var w = (1 - B / (this.nColHeight)) * 100;
            var A = 3;
            z = Math.floor(Math.min(Math.max(z, 0), 100));
            if (z < A) {
                z = 0
            } else {
                if (z > 100 - A) {
                    z = 100
                }
            }
            w = Math.floor(Math.min(Math.max(w, 0), 100));
            if (w < A) {
                w = 0
            } else {
                if (w > 100 - A) {
                    w = 100
                }
            }
            this.mHSV.s = z;
            this.mHSV.v = w;
            this.mRGB = this.hsv2rgb(this.mHSV.h, this.mHSV.s, this.mHSV.v);
            return this.rgb2hex(this.mRGB.r, this.mRGB.g, this.mRGB.b)
        },
        onChromDown: function() {
            this.mousedownDetected = u
        },
        onChromMove: function(w) {
            if (this.mousedownDetected) {
                var x = this.getChromCoords(w);
                var e = this.getColorByEvent(x.x, x.y);
                this.previewColor(e)
            }
        },
        onChromUp: function(w) {
            var x = this.getChromCoords(w);
            var e = this.getColorByEvent(x.x, x.y);
            this.previewColor(e);
            this.lastValue = e;
            this.mousedownDetected = c
        },
        getHueByEvent: function(x) {
            var e = parseInt((x / (this.nHueHeight)) * 360);
            this.mHSV.h = Math.floor(Math.min(Math.max(e, 0), 360));
            var w = this.hsv2rgb(this.mHSV.h, 100, 100);
            return this.rgb2hex(w.r, w.g, w.b)
        },
        setHueColor: function(e) {
            this.elChromaBar.style.backgroundColor = e
        },
        onHueDown: function() {
            t.observe(b, "mousemove", this.hueMoveHandler);
            t.observe(b, "mouseup", this.hueUpHandler)
        },
        onHueMove: function(w) {
            var x = this.getHueCoords(w);
            var e = this.getHueByEvent(x);
            this.setHueColor(e)
        },
        onHueClick: function(w) {
            var x = this.getHueCoords(w);
            var e = this.getHueByEvent(x);
            this.setHueColor(e)
        },
        onHueUp: function() {
            t.stopObserving(b, "mousemove", this.hueMoveHandler);
            t.stopObserving(b, "mouseup", this.hueUpHandler)
        },
        hex2rgb: function(e) {
            this.mRGB.r = (this.toDec(e.substr(0, 1)) * 16) + this.toDec(e.substr(1, 1));
            this.mRGB.g = (this.toDec(e.substr(2, 1)) * 16) + this.toDec(e.substr(3, 1));
            this.mRGB.b = (this.toDec(e.substr(4, 1)) * 16) + this.toDec(e.substr(5, 1));
            return this.mRGB
        },
        toDec: function(w) {
            var e = "0123456789ABCDEF";
            return e.indexOf(w.toUpperCase())
        },
        rgb2hex: function(x, w, e) {
            x = x.toString(16);
            if (x.length == 1) {
                x = "0" + x
            }
            w = w.toString(16);
            if (w.length == 1) {
                w = "0" + w
            }
            e = e.toString(16);
            if (e.length == 1) {
                e = "0" + e
            }
            return "#" + x + w + e
        },
        hsv2rgb: function(x, I, H) {
            x %= 360;
            I /= 100;
            H /= 100;
            var e = 0,
                y = 0,
                C = 0;
            if (I === 0) {
                e = Math.floor(H * 255);
                y = Math.floor(H * 255);
                C = Math.floor(H * 255)
            } else {
                var A = x / 60;
                var z = Math.floor(A);
                var G = H * (1 - I);
                var E = H * (1 - I * (A - z));
                var D = H * (1 - I * (1 - (A - z)));
                var w = 0,
                    B = 0,
                    F = 0;
                if (z === 0) {
                    w = H;
                    B = D;
                    F = G
                } else {
                    if (z == 1) {
                        w = E;
                        B = H;
                        F = G
                    } else {
                        if (z == 2) {
                            w = G;
                            B = H;
                            F = D
                        } else {
                            if (z == 3) {
                                w = G;
                                B = E;
                                F = H
                            } else {
                                if (z == 4) {
                                    w = D;
                                    B = G;
                                    F = H
                                } else {
                                    if (z == 5) {
                                        w = H;
                                        B = G;
                                        F = E
                                    }
                                }
                            }
                        }
                    }
                }
                e = Math.floor(w * 255);
                y = Math.floor(B * 255);
                C = Math.floor(F * 255)
            }
            return {
                r: e,
                g: y,
                b: C
            }
        },
        rgb2hsv: function(w, B, G) {
            var y = (w / 255);
            var E = (B / 255);
            var I = (G / 255);
            var A = 0,
                J = 0,
                H = 0;
            var F = Math.min(y, E, I);
            var x = Math.max(y, E, I);
            var D = x - F;
            H = D;
            if (D === 0) {
                A = 0;
                J = 0
            } else {
                J = D / x;
                var C = (((x - y) / 6) + (D / 2)) / D;
                var e = (((x - E) / 6) + (D / 2)) / D;
                var z = (((x - I) / 6) + (D / 2)) / D;
                if (y == x) {
                    A = z - e
                } else {
                    if (E == x) {
                        A = (1 / 3) + C - z
                    } else {
                        if (I == x) {
                            A = (2 / 3) + e - C
                        }
                    }
                }
                if (A < 0) {
                    A += 1
                }
                if (A > 1) {
                    A -= 1
                }
            }
            return {
                h: A,
                s: J,
                v: H
            }
        }
    });
    g.Color = {
        getHexColor: function(w) {
            w = w.trim();
            if (w.indexOf("rgb") < 0) {
                if (w.length > 0 && (w.indexOf("-moz-use") > -1 || w == "transparent")) {
                    return "transparent"
                } else {
                    return w
                }
            }
            if (/rgba\s?\((0,\s?){3}0\)/i.test(w)) {
                return "transparent"
            }
            var e = w.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*\d*\)/i);
            if (!e) {
                return w
            }
            e.shift();
            if (e.length < 3) {
                return w
            }
            var z;
            var y = "#";
            for (var x = 0; x < 3; x++) {
                z = parseInt(e[x].trim()).toString(16).toUpperCase();
                if (z.length == 1) {
                    y = y.concat("0" + z)
                } else {
                    if (z.length > 2) {
                        y = y.concat("FF")
                    } else {
                        y = y.concat("" + z)
                    }
                }
            }
            return y
        },
        getValidColor: function(w) {
            if (w === i || w == "transparent") {
                return "transparent"
            }
            var e = w.match(/#?([0-9a-f]{6}|[0-9a-f]{3})/i);
            if (e === i || w.length > 8) {
                return i
            }
            if (e[1].length == 3) {
                return "#" + e[1] + e[1]
            } else {
                return "#" + e[1]
            }
        },
        getOptColor: function(w, x) {
            if (!w || w.length != 7 || w.charAt(0) != "#") {
                return "#e5e5e5"
            }
            w = w.substring(1, 7).toLowerCase();
            x = isNaN(x) ? 100 : x;
            var y = "#";
            var A, e;
            for (var z = 0; z < 3; z++) {
                A = parseInt(w.substr(z * 2, 2), 16);
                e = Math.round(Math.floor((255 - A) * (1 - x * 0.01) + A * (x * 0.02))).toString(16);
                if (e.length == 1) {
                    y += "0" + e
                } else {
                    if (e.length > 2) {
                        y += "ff"
                    } else {
                        y += e
                    }
                }
            }
            return y
        }
    };
    g.I.CookieBaker = g.Faculty.create({
        cookieName: i,
        cookieValue: i,
        initCookie: function(e, w) {
            this.cookieName = e;
            this.cookieValue = function() {
                var z = b.cookie.split(";");
                for (var y = 0; y < z.length; y++) {
                    var x = z[y].replace(/^\s+/, "");
                    if (x.indexOf(e + "=") == 0) {
                        return x.substring(e.length + 1)
                    }
                }
                return i
            }() || "";
            this.maxCnt = w || 3
        },
        writeCookie: function(w, z) {
            var e = this.cookieName,
                y;
            if (z) {
                var x = new Date();
                x.setTime(new Date().getTime() + z * 24 * 60 * 60 * 1000);
                y = "; expires=" + x.toGMTString()
            } else {
                y = ""
            }
            if (w === i) {
                w = ""
            }
            b.cookie = e + "=" + w + y + "; path=/";
            this.cookieValue = w
        },
        readCookie: function() {
            if (this.cookieValue === i + "") {
                return i
            }
            return this.cookieValue
        },
        eraseCookie: function() {
            var e = this.cookieName;
            this.writeCookie(e, "", -1)
        },
        extractOptions: function(e, x) {
            var y = e.toMap("data");
            var w = [];
            x.split("|").compact().each(function(z) {
                if (y[z]) {
                    w.push(y[z])
                }
            }.bind(this));
            return w
        },
        mergeValues: function(x, w) {
            var e = x.split("|").compact();
            if (e.contains(w)) {
                return x
            }
            if (e.length >= this.maxCnt) {
                e.pop()
            }
            e.unshift(w);
            return e.join("|")
        }
    });
    g.MarkupTemplate.add("button.itsnew", '<em class="tx-itsnew" title="new">new</em>');
    g.MarkupTemplate.add("button.select.text", "<span>#{data}</span>");
    g.Button = g.Class.create({
        $const: {
            __borderClasses: {
                "tx-btn-trans": u,
                "tx-btn-lbg": u,
                "tx-btn-bg": u,
                "tx-btn-rbg": u,
                "tx-btn-lrbg": u,
                "tx-slt-tlbg": u,
                "tx-slt-tbg": u,
                "tx-slt-trbg": u,
                "tx-slt-blbg": u,
                "tx-slt-bbg": u,
                "tx-slt-brbg": u,
                "tx-slt-31bg": u,
                "tx-slt-31lbg": u,
                "tx-slt-31rbg": u,
                "tx-slt-70lbg": u,
                "tx-slt-70bg": u,
                "tx-slt-59bg": u,
                "tx-slt-42bg": u,
                "tx-slt-56bg": u,
                "tx-btn-nlrbg": u,
                "tx-btn-43lrbg": u,
                "tx-btn-52lrbg": u,
                "tx-btn-57lrbg": u,
                "tx-btn-71lrbg": u,
                "tx-btn-48lbg": u,
                "tx-btn-48rbg": u,
                "tx-btn-30lrbg": u,
                "tx-btn-46lrbg": u,
                "tx-btn-67lrbg": u,
                "tx-btn-49lbg": u,
                "tx-btn-58bg": u,
                "tx-btn-46bg": u,
                "tx-btn-49rbg": u,
                "tx-btn-widget": u,
                "tx-btn-widget-tbg": u,
                "tx-btn-widget-brbg": u
            },
            addBorderClass: function(e) {
                g.Button.__borderClasses[e] = u
            },
            getBorderClass: function(y) {
                var e = t.classNames(y);
                for (var x = 0; x < e.length; x++) {
                    var w = e[x];
                    var z = g.Button.__borderClasses[w];
                    if (z) {
                        return w
                    }
                }
            }
        },
        hasState: i,
        isDisabled: i,
        lastValue: i,
        lastText: i,
        elButton: i,
        elIcon: i,
        borderClass: i,
        _command: function() {},
        setCommand: function(e) {
            this._command = e
        },
        initialize: function(e) {
            var z = this.config = e;
            if (z.borderClass) {
                g.Button.addBorderClass(z.borderClass)
            }
            this.itsNew = !!z.itsnew;
            this.hasState = !!z.status;
            this.isDisabled = c;
            this.lastValue = z.selectedValue || i;
            if (e.el) {
                this.elButton = e.el
            } else {
                var w = z.id || "tx_" + z.identity;
                this.elButton = $must(w + (z.initializedId || ""))
            }
            var y = this.elButton;
            var x = this.elIcon = v.collect(y, "a");
            if (!x) {
                throw new Error("[Exception]Trex.Button : can't find elIcon for button '" + w + "'")
            }
            this.borderClass = g.Button.getBorderClass(y);
            if (this.oninitialized) {
                this.oninitialized.bind(this)(z)
            }
            this.generate();
            if (this.itsNew) {
                v.append(x, g.MarkupTemplate.get("button.itsnew").evaluateAsDom({}))
            }
            if (z.selectedValue && this.setValue) {
                this.setValue(z.selectedValue)
            }
            if (z.selectedText && this.setText) {
                this.setText(z.selectedText)
            }
            if (z.selectedState && this.setState) {
                this.setState(z.selectedState)
            }
        },
        generate: function() {
            var e = this.elIcon;
            this.hdlMouseDown = this.onMouseDown.bindAsEventListener(this);
            this.hdlMouseOver = this.onMouseOver.bindAsEventListener(this);
            this.hdlMouseOut = this.onMouseOut.bindAsEventListener(this);
            this.hdlKeydown = this.onKeyDown.bindAsEventListener(this);
            this.hdlClick = this.onClick.bindAsEventListener(this);
            t.observe(e, "mousedown", this.hdlMouseDown);
            t.observe(e, "mouseover", this.hdlMouseOver);
            t.observe(e, "mouseout", this.hdlMouseOut);
            t.observe(e, "keydown", this.hdlKeydown);
            t.observe(e, "click", this.hdlClick);
            if (this.ongenerated) {
                this.ongenerated.bind(this)(this.config)
            }
        },
        removeHandler: function() {
            if (!this.hdlMouseDown) {
                return
            }
            var e = this.elIcon;
            t.stopObserving(e, "mousedown", this.hdlMouseDown);
            t.stopObserving(e, "mouseover", this.hdlMouseOver);
            t.stopObserving(e, "mouseout", this.hdlMouseOut);
            t.stopObserving(e, "keydown", this.hdlKeydown);
            t.stopObserving(e, "click", this.hdlClick)
        },
        getCurrentBorderClass: function(y) {
            var e = t.classNames(y);
            for (var x = 0; x < e.length; x++) {
                var w = e[x];
                if (w.indexOf(this.borderClass) != -1) {
                    return w
                }
            }
            return q + ""
        },
        normalState: function() {
            var e = this.getCurrentBorderClass(this.elButton);
            if (e == this.borderClass) {
                return
            }
            t.removeClassName(this.elButton, e);
            t.addClassName(this.elButton, this.borderClass)
        },
        hoveredState: function() {
            var e = this.getCurrentBorderClass(this.elButton);
            t.removeClassName(this.elButton, e);
            t.addClassName(this.elButton, this.borderClass + "-hovered");
            this.decreaseZindex()
        },
        pushedState: function() {
            var e = this.getCurrentBorderClass(this.elButton);
            t.removeClassName(this.elButton, e);
            t.addClassName(this.elButton, this.borderClass + "-pushed")
        },
        currentState: function() {
            var w = this.getCurrentBorderClass(this.elButton);
            var e = "normal";
            if (w.indexOf("-pushed") != -1) {
                e = "pushed"
            } else {
                if (w.indexOf("-hovered") != -1) {
                    e = "hovered"
                }
            }
            return e
        },
        isPushed: function() {
            return ("pushed" == this.currentState())
        },
        hasMenu: function() {
            return this.tool ? !!(this.tool.menu) : c
        },
        onMouseDown: function(e) {
            if (e) {
                t.stop(e)
            }
            if (this.isDisabled) {
                return
            }
            if (this.hasMenu() || this.hasState) {
                if (this._command(e) === c) {
                    return
                }
            } else {
                this.evsessionstarted = u
            }
            if (this.isPushed()) {
                this.normalState()
            } else {
                this.pushedState()
            }
        },
        onMouseOver: function() {
            if (this.isDisabled || this.isPushed()) {
                return
            }
            this.hoveredState()
        },
        onMouseOut: function() {
            if (this.evsessionstarted) {
                this.normalState();
                this.evsessionstarted = c
            }
            if (this.isDisabled || this.isPushed()) {
                return
            }
            this.normalState()
        },
        onClick: function(e) {
            if (e) {
                t.stop(e)
            }
            if (this.isDisabled) {
                return
            }
            if (!this.hasState) {
                this._command();
                this.normalState();
                this.evsessionstarted = c
            }
        },
        onKeyDown: function(e) {
            if (e.keyCode === 13) {
                this.onMouseDown(e);
                this.onClick(e)
            }
        },
        updateAfterCommand: function(e, w) {
            this.setValueAndText(e, w);
            this.normalState()
        },
        setValueAndText: function(e, w) {
            this.setValue(e);
            this.setText(w)
        },
        setValue: function(e) {
            if (e) {
                this.lastValue = e
            }
        },
        setText: function(e) {
            this.lastText = e
        },
        getValue: function() {
            return this.lastValue
        },
        getText: function() {
            return this.lastText
        },
        setState: function(e) {
            if (e) {
                this.pushedState()
            } else {
                this.normalState()
            }
        },
        setClassName: function(e) {
            this.elIcon.className = e
        },
        disable: function() {
            if (this.elButton) {
                this.isDisabled = u;
                t.addClassName(this.elButton, "tx-disable")
            }
        },
        enable: function() {
            if (this.elButton) {
                this.isDisabled = c;
                t.removeClassName(this.elButton, "tx-disable")
            }
        },
        release: function() {
            if (this.isDisabled) {
                return
            }
            if (this.hasMenu() || !this.hasState) {
                this.normalState()
            }
        },
        increaseZindex: function() {
            var e = 10;
            if (v.parent(this.elButton)) {
                t.setStyle(v.parent(this.elButton), {
                    zIndex: e
                })
            }
        },
        decreaseZindex: function() {
            var e = 4;
            if (v.parent(this.elButton)) {
                t.setStyle(v.parent(this.elButton), {
                    zIndex: e
                })
            }
        }
    });
    g.Button.Select = g.Class.create({
        $extend: g.Button,
        ongenerated: function() {
            g.MarkupTemplate.get("button.select.text").evaluateToDom({
                data: v.getText(this.elIcon)
            }, this.elIcon);
            this.elText = v.collect(this.elIcon, "span");
            var e = v.collect(this.elButton, "a.tx-arrow");
            if (e) {
                t.observe(e, "mousedown", this.onMouseDown.bindAsEventListener(this));
                t.observe(e, "mouseover", this.onArrowMouseOver.bindAsEventListener(this));
                t.observe(e, "mouseout", this.onArrowMouseOut.bindAsEventListener(this));
                t.observe(e, "click", this.onClick.bindAsEventListener(this))
            }
        },
        setText: function(e) {
            this.elText.innerText = e
        },
        onArrowMouseOver: function() {
            if (this.isDisabled || this.isPushed()) {
                return
            }
            this.hoveredState()
        },
        onArrowMouseOut: function() {
            if (this.isDisabled || this.isPushed()) {
                return
            }
            this.normalState()
        }
    });
    g.Button.Splits = g.Class.create({
        $extend: g.Button,
        ongenerated: function() {
            var w = this.elButton;
            var e = this.elArrow = v.collect(w, "a.tx-arrow");
            if (!e) {
                throw new Error("[Exception]Trex.Button.Splits : not exist element(a.tx-arrow)")
            }
            t.observe(e, "mousedown", this.onArrowMouseDown.bindAsEventListener(this));
            t.observe(e, "mouseover", this.onArrowMouseOver.bindAsEventListener(this));
            t.observe(e, "mouseout", this.onArrowMouseOut.bindAsEventListener(this));
            t.observe(e, "click", this.onArrowClick.bindAsEventListener(this))
        },
        arrowHoveredState: function() {
            var e = this.getCurrentBorderClass(this.elButton);
            t.removeClassName(this.elButton, e);
            t.addClassName(this.elButton, this.borderClass + "-arrow-hovered")
        },
        arrowPushedState: function() {
            var e = this.getCurrentBorderClass(this.elButton);
            t.removeClassName(this.elButton, e);
            t.addClassName(this.elButton, this.borderClass + "-arrow-pushed")
        },
        onMouseDown: function() {
            if (this.isDisabled) {
                return
            }
            if (this.isPushed()) {
                this._command();
                this.normalState();
                this.commandexecuted = u
            } else {
                this.pushedState();
                this.commandexecuted = c;
                this.evsessionstarted = u
            }
        },
        onClick: function(e) {
            if (e) {
                t.stop(e)
            }
            if (this.isDisabled) {
                return
            }
            if (!this.commandexecuted) {
                this.tool.execute(this.lastValue, this.lastText);
                this.evsessionstarted = c
            } else {
                this.commandexecuted = c
            }
            this.normalState()
        },
        onArrowMouseDown: function() {
            if (this.isDisabled) {
                return
            }
            if (this._command() === c) {
                return
            }
            if (this.isPushed()) {
                this.normalState()
            } else {
                this.arrowPushedState()
            }
        },
        onArrowClick: function(e) {
            if (e) {
                t.stop(e)
            }
            if (this.isDisabled) {
                return
            }
        },
        onArrowMouseOver: function() {
            if (this.isDisabled || this.isPushed()) {
                return
            }
            this.arrowHoveredState()
        },
        onArrowMouseOut: function() {
            if (this.isDisabled || this.isPushed()) {
                return
            }
            if (this.commandexecuted) {
                this.commandexecuted = c
            }
            this.normalState()
        }
    });
    g.Button.Toggle = g.Class.create({
        $extend: g.Button,
        setValue: function(e) {
            if (e) {
                this.pushedState()
            } else {
                this.normalState()
            }
        }
    });
    g.Button.Widget = g.Class.create({
        $extend: g.Button.Select,
        setText: function(e) {
            this.elIcon.innerText = e;
            if (this.lastText) {
                t.removeClassName(this.elIcon, this.lastText)
            }
            t.addClassName(this.elIcon, e);
            this.lastText = e
        },
        setMenu: function(x, e) {
            this.hasState = u;
            var w = this;
            x.setCommand(function() {
                var y = e.apply(this, arguments);
                w.updateAfterCommand.apply(w, arguments);
                return y
            });
            w.setCommand(function() {
                if (!w.isPushed()) {
                    var y = w.getValue();
                    x.show(y)
                } else {
                    x.hide()
                }
                return u
            })
        }
    });
    g.Button.ColorWidget = g.Class.create({
        $extend: g.Button.Widget,
        setValue: function(e) {
            t.setStyle(this.elIcon.parentNode, {
                backgroundColor: e
            });
            this.lastValue = e
        },
        setText: function() {}
    });
    j.addMsg({
        "@menu.pallete.enter": "\uc785\ub825",
        "@menu.pallete.more": "\ub354\ubcf4\uae30"
    });
    g.Menu = g.Class.create({
        $mixins: [g.I.JobObservable],
        isInit: c,
        isDisplayed: c,
        _command: function() {},
        setCommand: function(e) {
            this._command = e
        },
        initialize: function(e) {
            var x = this.config = e;
            var y;
            if (x.el) {
                y = x.el;
                if (!y) {
                    throw new Error("[Exception]Trex.Menu : not exist element(" + x.el + ")")
                }
            } else {
                var w = x.id;
                var z = ((x.initializedId) ? x.initializedId : "");
                if (!w) {
                    if (!x.identity) {
                        throw new Error("[Exception]Trex.Menu : not exist config - id")
                    }
                    w = "tx_" + x.identity + "_menu"
                }
                y = t(w + z);
                if (!y) {
                    throw new Error("[Exception]Trex.Menu : not exist element(" + w + ")")
                }
            }
            this.elMenu = y;
            if (x.top) {
                y.style.top = x.top + "px"
            }
            if (x.left) {
                y.style.left = x.left + "px"
            }
            if (this.oninitialized) {
                this.oninitialized.bind(this)(e)
            }
            if (this.ongenerated) {
                this.generateHandler = this.ongenerated.bind(this)
            }
            if (this.onregenerated) {
                this.regenerateHandler = this.onregenerated.bind(this)
            }
        },
        generate: function(e) {
            if (this.generateHandler) {
                var w = this.config;
                this.generateHandler(w, e)
            }
        },
        regenerate: function(e) {
            if (this.initHandler) {
                this.initHandler()
            }
            if (this.regenerateHandler) {
                var w = this.config;
                this.regenerateHandler(w, e)
            }
        },
        getValidOptions: function(e) {
            return e.options.findAll(function(w) {
                return !w.expired
            })
        },
        onSelect: function() {
            var e = $A(arguments);
            var w = e.shift();
            this._command.apply(this, e);
            this.hide();
            t.stop(w)
        },
        onCancel: function() {
            if (this.cancelHandler) {
                this.cancelHandler()
            }
            this.hide()
        },
        visible: function() {
            return this.isDisplayed
        },
        show: function(e) {
            t.show(this.elMenu);
            if (this.isInit) {
                this.regenerate(e)
            } else {
                if (!!this.config.listseturl) {
                    this.lazyGenerate(e)
                } else {
                    this.generate(e);
                    this.isInit = u;
                    this.regenerate(e)
                }
            }
            if (this.showSpecial) {
                this.showSpecial()
            }
            this.isDisplayed = u;
            this.fireJobs(g.Ev.__MENU_LAYER_SHOW, {
                detail: {
                    menu: this
                }
            })
        },
        lazyGenerate: function(e) {
            var w = this;
            new(g.Class.create({
                $mixins: [g.I.JSRequester],
                initialize: function() {
                    this.importScript(w.config.listseturl, "utf-8", b, function() {
                        w.generate();
                        w.isInit = u;
                        w.regenerate(e)
                    })
                }
            }))()
        },
        hide: function() {
            t.hide(this.elMenu);
            this.isDisplayed = c;
            this.fireJobs(g.Ev.__MENU_LAYER_HIDE, {
                detail: {
                    menu: this
                }
            })
        },
        toggle: function() {
            if (this.isDisplayed) {
                this.hide()
            } else {
                this.show()
            }
        },
        release: function(e) {
            if (!this.isInit) {
                return
            }
            this.hide(e)
        }
    });
    g.MarkupTemplate.add("menu.select", '<ul class="tx-menu-list" unselectable="on">#{items}</ul>');
    g.MarkupTemplate.add("menu.select.item", '<li class="tx-menu-list-item"><a class="#{klass}" href="javascript:;" unselectable="on">#{label}</a></li>');
    g.Menu.Select = g.Class.create({
        $extend: g.Menu,
        generate: function() {
            var x = this.config;
            var e = this.getValidOptions(x);
            var w = this.generateList(e);
            v.insertFirst(this.elMenu, w);
            if (this.generateHandler) {
                this.generateHandler(x)
            }
            if (this.ongeneratedList) {
                this.generateList = this.ongeneratedList.bind(this)
            }
            if (this.ongeneratedListItem) {
                this.generateListItem = this.ongeneratedListItem.bind(this)
            }
        },
        generateList: function(z) {
            var w = g.MarkupTemplate.get("menu.select").evaluateAsDom({
                items: this.generateListItem(z)
            });
            var y = v.collectAll(w, "li a");
            for (var e = 0; e < z.length; e++) {
                var A = z[e];
                var x = y[e];
                t.observe(x, "click", this.onSelect.bindAsEventListener(this, A.data, A.title))
            }
            return w
        },
        generateListItem: function(x) {
            var e = [];
            for (var w = 0; w < x.length; w++) {
                e.push(g.MarkupTemplate.get("menu.select.item").evaluate(x[w]))
            }
            return e.join("")
        },
        onSelect: function() {
            var w = $A(arguments);
            var e = w.shift();
            this._command.apply(this, w);
            this.hide();
            t.stop(e)
        }
    });
    g.MarkupTemplate.add("menu.items", ['<table unselectable="on"><tbody>', "	#{for:row}<tr>", '		#{for:col}<td class="tx-menu-list-item">', '<a href="javascript:;"><span class="#{klass}">', '#{if:image!=""}<img src="#{image}" data="#{data}"/>#{/if:image}', '#{if:image=""}#{data}#{/if:image}', "</span></a>", "		</td>#{/for:col}", "	</tr>#{/for:row}", "</tbody></table>"].join(""));
    g.MarkupTemplate.add("menu.list", ['<div class="tx-menu-inner">', '	<div class="tx-menu-list">', "   	#{items}", "    </div>", "</div>"].join(""));
    g.Menu.List = g.Class.create({
        $extend: g.Menu,
        generate: function() {
            var x = this.config;
            var e = this.getValidOptions(x);
            this.cols = x.cols || 1;
            this.rows = x.rows || e.length;
            var w = this.generateList(e);
            v.insertFirst(this.elMenu, w);
            if (this.ongeneratedList) {
                this.generateList = this.ongeneratedList.bind(this)
            }
            if (this.ongeneratedListItem) {
                this.generateListItem = this.ongeneratedListItem.bind(this)
            }
            if (this.generateHandler) {
                this.generateHandler(x)
            }
        },
        generateList: function(w) {
            var e = g.MarkupTemplate.splitList(this.rows, this.cols, w);
            var x = g.MarkupTemplate.get("menu.list").evaluateAsDom({
                items: g.MarkupTemplate.get("menu.items").evaluate(e)
            });
            t.observe(x, "click", this.onSelect.bindAsEventListener(this));
            t.observe(x, "mouseover", this.onItemMouseOver.bindAsEventListener(this));
            t.observe(x, "mouseout", this.onItemMouseOut.bindAsEventListener(this));
            return x
        },
        onItemMouseOver: function(e) {
            var w = t.findElement(e, "span");
            if (w.tagName && w.tagName.toLowerCase() == "span") {
                t.addClassName(w, "tx-item-hovered")
            }
            t.stop(e)
        },
        onItemMouseOut: function(e) {
            var w = t.findElement(e, "span");
            if (w.tagName && w.tagName.toLowerCase() == "span") {
                t.removeClassName(w, "tx-item-hovered")
            }
            t.stop(e)
        },
        onSelect: function(w) {
            var x = t.findElement(w, "span");
            if (x.tagName && x.tagName.toLowerCase() == "span") {
                var e;
                if (x.firstChild && x.firstChild.nodeType == 1 && x.firstChild.tagName.toLowerCase() == "img") {
                    e = v.getAttribute(x.firstChild, "data") || ""
                } else {
                    e = x.innerText
                }
                this._command(e);
                this.hide()
            }
            t.stop(w)
        }
    });
    g.MarkupTemplate.add("menu.matrix", ['<div class="tx-menu-inner">', '	<ul class="tx-menu-matrix-title">', '		#{for:matrices}<li class=""><a href="javascript:;" class="tx-menu-matrix-title-item">#{title}</a></li>#{/for:matrices}', "	</ul>", '	<div class="tx-menu-matrix-listset">', '   	#{for:matrices}<div class="tx-menu-matrix-list #{klass}">', "       	#{items}", "		</div>#{/for:matrices}", "    </div>", "</div>"].join(""));
    g.Menu.Matrix = g.Class.create({
        $extend: g.Menu,
        generate: function() {
            var x = this.config;
            var e = this.matrices = x.matrices.findAll(function(y) {
                return !y.onlyIE || t.msie
            });
            this.cols = x.cols || 10;
            this.rows = x.rows || 5;
            var w = this.generateMatrix(e);
            v.insertFirst(this.elMenu, w);
            if (this.ongeneratedList) {
                this.generateList = this.ongeneratedList.bind(this)
            }
            if (this.ongeneratedListItem) {
                this.generateListItem = this.ongeneratedListItem.bind(this)
            }
            if (this.generateHandler) {
                this.generateHandler(x)
            }
            this.showTab()
        },
        regenerate: function() {
            this.showTab();
            if (this.regenerateHandler) {
                var e = this.config;
                this.regenerateHandler(e)
            }
        },
        showTab: function() {
            var x = this.lastElList;
            var w = this.lastElTitleItem;
            var e = (!x || !w);
            if (e) {
                x = this.defaultElListItem;
                w = this.defaultElTitleItem
            }
            this.onTitleClick(i, w, x)
        },
        generateMatrix: function(E) {
            var F = this;
            var A = this.cols;
            var D = this.rows;
            E.each(function(H) {
                var G = g.MarkupTemplate.splitList(D, A, H.options);
                H.items = g.MarkupTemplate.get("menu.items").evaluate(G)
            });
            var C = g.MarkupTemplate.get("menu.matrix").evaluateAsDom({
                matrices: E
            });
            var B = v.collectAll(C, "div.tx-menu-matrix-listset div.tx-menu-matrix-list");
            var w = v.collectAll(C, "ul.tx-menu-matrix-title li");
            var y = function() {
                for (var G = 0, H = E.length; G < H; G++) {
                    if (E[G].defaultshow) {
                        return G
                    }
                }
                return 0
            }();
            this.defaultElListItem = B[y];
            this.defaultElTitleItem = w[y];
            for (var x = 0; x < E.length; x++) {
                var e = B[x];
                t.observe(e, "click", F.onSelect.bindAsEventListener(F));
                t.observe(e, "mouseover", F.onItemMouseOver.bindAsEventListener(F));
                t.observe(e, "mouseout", F.onItemMouseOut.bindAsEventListener(F));
                var z = w[x];
                t.observe(z, "click", F.onTitleClick.bindAsEventListener(F, z, e))
            }
            return C
        },
        onTitleClick: function(x, w, e) {
            if (this.lastElList != e) {
                t.show(e);
                if (this.lastElList) {
                    t.hide(this.lastElList)
                }
                this.lastElList = e;
                if (this.lastElTitleItem) {
                    t.removeClassName(this.lastElTitleItem, "tx-selected")
                }
                t.addClassName(w, "tx-selected");
                this.lastElTitleItem = w
            }
            if (x) {
                t.stop(x)
            }
        },
        onItemMouseOver: function(e) {
            var w = t.findElement(e, "span");
            if (w.tagName && w.tagName.toLowerCase() == "span") {
                t.addClassName(w, "tx-item-hovered")
            }
            t.stop(e)
        },
        onItemMouseOut: function(e) {
            var w = t.findElement(e, "span");
            if (w.tagName && w.tagName.toLowerCase() == "span") {
                t.removeClassName(w, "tx-item-hovered")
            }
            t.stop(e)
        },
        onSelect: function(e) {
            var w = t.findElement(e, "span");
            if (w.tagName && w.tagName.toLowerCase() == "span") {
                this._command(w.innerText);
                this.hide()
            }
            t.stop(e)
        }
    });
    g.MarkupTemplate.add("menu.colorPallete", ['<div class="tx-menu-inner">', '<ul class="tx-pallete-text-list"></ul>', '<ul class="tx-pallete-thumb-list"></ul>', '<p class="tx-pallete-input"><span style="background-color: rgb(7, 3, 3);"></span><input type="text" class="tx-color-value"/><a class="tx-enter">@menu.pallete.enter</a></p>', '<div class="tx-pallete-buttons">', '	<p class="tx-pallete-more"><a class="tx-more-down" href="javascript:;">@menu.pallete.more</a></p>', "</div>", '<div class="tx-pallete-picker">', '	<div class="tx-pallete-pickerbox">', '		<div class="tx-chromabar" style="background-color: rgb(255, 0, 0);"></div><div class="tx-huebar"></div>', "	</div>", "</div>", "</div>"].join(""));
    g.Menu.ColorPallete = g.Class.create({
        $extend: g.Menu,
        $mixins: [g.I.ColorPallete],
        generate: function() {
            var w = this.config;
            var x = this.elMenu;
            g.MarkupTemplate.get("menu.colorPallete").evaluateToDom({}, x);
            var e = w.thumbs.transparent;
            w.thumbs.transparent = Object.extend(w.thumbs.transparent, {
                image: p.getIconPath(e.image),
                thumb: p.getIconPath(e.thumb),
                thumbImage: p.getIconPath(e.thumbImage)
            });
            if (!this.hookEvent) {
                throw new Error("[Exception]Trex.Menu.ColorPallete : not implement function(hookEvent)")
            }
            this.hookEvent(w);
            if (this.generateHandler) {
                this.generateHandler(w)
            }
            this.bindEvents()
        },
        onSelect: function() {
            var w = $A(arguments);
            var e = w.shift();
            this._command.apply(this, w);
            this.remainColor(w);
            this.hide();
            t.stop(e)
        },
        remainColor: function(e) {
            if (e) {
                this.setColorValueAtInputbox(e)
            }
        },
        bindEvents: function() {
            var e = this;
            t.observe(this.elMore, "click", function(w) {
                e.fireJobs(g.Ev.__MENU_LAYER_CHANGE_SIZE, {
                    detail: {
                        menu: e
                    }
                })
            })
        }
    });
    t.msie && g.module("add menu layer shield for IE flash object", function(y, A, B, x) {
        g.MarkupTemplate.add("menu.shield", ['<div class="tx-menu-back" style="overflow:hidden;position:absolute;border:0;">', '<iframe src="about:blank" width="100%" height="100%" frameborder="0"></iframe>', "</div>"].join(""));
        var w = g.Class.create({
            initialize: function(E, D) {
                this.id = E;
                this.menuEl = D;
                this.shieldEl = g.MarkupTemplate.get("menu.shield").evaluateAsDom({})
            },
            show: function() {
                this.update();
                v.insertAt(this.shieldEl, this.menuEl);
                t.show(this.shieldEl)
            },
            hide: function() {
                t.hide(this.shieldEl);
                v.remove(this.shieldEl)
            },
            update: function() {
                var D = {
                    width: this.menuEl.offsetWidth.toPx(),
                    height: this.menuEl.offsetHeight.toPx(),
                    left: t.getStyle(this.menuEl, "left"),
                    top: t.getStyle(this.menuEl, "top")
                };
                t.setStyle(this.shieldEl, D)
            },
            destroy: function() {
                this.id = i;
                this.menuEl = i;
                this.shieldEl = i
            }
        });
        var e = g.Class.create({
            initialize: function() {
                this.entry = {}
            },
            show: function(G, F) {
                var D = this.entry[G];
                if (!D) {
                    var E = new w(G, F);
                    this.entry[G] = D = E
                }
                D.show()
            },
            hide: function(E) {
                var D = this.entry[E];
                if (D) {
                    D.hide();
                    D.destroy();
                    delete this.entry[E]
                }
            },
            updateAll: function() {
                var D = this.entry;
                setTimeout(function() {
                    for (var E in D) {
                        if (D.hasOwnProperty(E)) {
                            D[E].update()
                        }
                    }
                }, 1)
            }
        });
        var z = new e();

        function C(E) {
            var F;
            try {
                if (E.config.id) {
                    F = E.config.id + E.config.initializedId
                } else {
                    F = E.config.el.className
                }
            } catch (D) {
                F = "unknown"
            }
            return F
        }
        A.observeJob(g.Ev.__MENU_LAYER_SHOW, function(D) {
            var E = D.detail.menu;
            z.show(C(E), E.elMenu)
        });
        A.observeJob(g.Ev.__MENU_LAYER_HIDE, function(D) {
            var E = D.detail.menu;
            z.hide(C(E))
        });
        A.observeJob(g.Ev.__MENU_LAYER_CHANGE_SIZE, function(D) {
            z.updateAll()
        })
    });
    g.Editor = g.Class.create({
        $mixins: [g.I.JobObservable, g.I.KeyObservable],
        toolbar: i,
        sidebar: i,
        canvas: i,
        config: i,
        initialConfig: i,
        initialize: function(x) {
            this.initialConfig = x;
            var C = this,
                B = this.config = p.setup(x);
            var A = this.canvas = new g.Canvas(C, B);
            var w = this.toolbar = new g.Toolbar(C, B);
            var z = this.sidebar = new g.Sidebar(C, B);
            g.invokeInstallation(C, w, z, A, B);
            var e = B.events;
            var y = function(D) {
                if (e.useHotKey) {
                    C.fireKeys(D)
                }
            };
            t.observe(b, "keydown", y.bindAsEventListener(this), c);
            A.observeJob(g.Ev.__IFRAME_LOAD_COMPLETE, function() {
                var D = new Date().getTime();
                var G = Math.round((D - Editor.initStartTime) / 100) / 10;
                C.fireJobs(g.Ev.__IFRAME_LOADING_TIME, G);
                var F = C.getInitializedId();
                var E = t("tx_loading" + F);
                if (!E) {
                    return
                }
                if (A.mode != g.Canvas.__WYSIWYG_MODE) {
                    A.fireJobs(g.Ev.__CANVAS_MODE_INITIALIZE, g.Canvas.__WYSIWYG_MODE, A.mode)
                }
                t.hide(E)
            });
            g.invokeRegisters(C, w, z, A, B);
            g.invokeModules(C, w, z, A, B)
        },
        getToolbar: function() {
            return this.toolbar
        },
        getSidebar: function() {
            return this.sidebar
        },
        getCanvas: function() {
            return this.canvas
        },
        getUsedWebfont: function() {
            return this.canvas.getUsedWebfont()
        },
        getConfig: function() {
            return this.config
        },
        getInitialConfig: function() {
            return this.initialConfig
        },
        getParam: function(w) {
            var e = {},
                x = this.config;
            x.params.each(function(y) {
                if (x[y]) {
                    e[y] = x[y]
                }
            });
            return e[w]
        },
        getWrapper: function() {
            if (!this.initialConfig.wrapper) {
                throw new Error("`wrapper` config variable should be provided")
            }
            return $must(this.initialConfig.wrapper)
        },
        getInitializedId: function() {
            return this.initialConfig.initializedId || ""
        },
        saveEditor: function() {
            this.setDisableUnloadHandler();
            this.getSaver().submit()
        },
        loadEditor: function(e) {
            this.getSaver().load(e)
        },
        getContent: function() {
            return this.getSaver().getContent()
        },
        getAttachments: function(w, e) {
            return this.getSaver().getAttachments(w, e)
        },
        getEmbeddedData: function(e) {
            return this.getSaver().getEmbeddedData(e)
        },
        getResults: function(e) {
            return this.getSaver().getResults(e)
        },
        getAutosaveSeq: function() {
            return (this.getAutoSaver && this.getAutoSaver()) ? this.getAutoSaver().getCurSeq() : "0"
        }
    });
    (function() {
        h.Editor = g.Class.create({
            $const: {
                __ACTIVE: c,
                __PANEL_LOADED: c,
                __EDITOR_LOADED: c,
                __MULTI_LIST: [],
                __SELECTED_INDEX: 0
            },
            _initEditor: function(x, w) {
                Editor.__EDITOR_LOADED = c;
                Editor.__PANEL_LOADED = c;
                x = new g.Editor(w);
                var y = x.getInitializedId();
                if (y != i) {
                    var e = y == "" ? 0 : y;
                    Editor.__MULTI_LIST[e] = x;
                    Editor.__SELECTED_INDEX = e
                }
                Object.extend(Editor, x);
                Editor.__EDITOR_LOADED = u;
                Editor.__ACTIVE = u
            },
            initialize: function(w) {
                if (g.hmailLogging) {
                    g.hmailLogging(w)
                }
                Editor.initStartTime = new Date().getTime();
                var y = null;
                if (h.DEBUG) {
                    this._initEditor(y, w)
                } else {
                    try {
                        this._initEditor(y, w)
                    } catch (x) {
                        if (y) {
                            y.fireJobs(g.Ev.__RUNTIME_EXCEPTION, x)
                        } else {
                            throw "failed to initialize editor. caused by " + x
                        }
                        throw x
                    }
                }
            }
        });
        Editor.modify = function(e) {
            if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
                if (this.loadEditor) {
                    this.loadEditor(e)
                }
            } else {
                setTimeout(this.modify.bind(this, e), 10)
            }
        };
        Editor.restore = function(e) {
            if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
                if (this.getAutoSaver && this.getAutoSaver()) {
                    this.getAutoSaver().load(e)
                }
            } else {
                setTimeout(this.restore.bind(this, e), 10)
            }
        };
        Editor.save = function() {
            if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
                if (this.saveEditor) {
                    this.saveEditor()
                }
            } else {
                setTimeout(this.saveEditor.bind(this), 10)
            }
            return c
        };
        Editor.focus = function() {
            if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
                var e = this.getCanvas();
                if (e) {
                    e.focus()
                }
            } else {
                setTimeout(this.focus.bind(this), 10)
            }
            return c
        };
        Editor.focusOnTop = function() {
            if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
                var e = this.getCanvas();
                if (e) {
                    e.focusOnTop()
                }
            } else {
                setTimeout(this.focusOnTop.bind(this), 10)
            }
            return c
        };
        Editor.focusOnBottom = function() {
            if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
                var e = this.getCanvas();
                if (e) {
                    e.focusOnBottom()
                }
            } else {
                setTimeout(this.focusOnBottom.bind(this), 10)
            }
            return c
        };
        Editor.permitUnload = function() {
            if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
                this.setDisableUnloadHandler()
            } else {
                setTimeout(this.permitUnload.bind(this), 500)
            }
        };
        Editor.onPanelLoadComplete = function(e) {
            if (Editor.__PANEL_LOADED == u && Editor.__EDITOR_LOADED == u) {
                if (e) {
                    e()
                }
            } else {
                setTimeout(Editor.onPanelLoadComplete.bind(Editor, e), 500)
            }
        };
        Editor.switchEditor = function(e) {
            Editor.__SELECTED_INDEX = e;
            Object.extend(Editor, Editor.__MULTI_LIST[e])
        };
        Editor.editorForAsyncLoad = Editor;
        Editor.forEachEditor = function(e) {
            var x, w = Editor.__MULTI_LIST;
            for (x in w) {
                if (w.hasOwnProperty(x)) {
                    e(w[x])
                }
            }
        };
        Editor.focusOnForm = function(e) {
            if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
                h.focus();
                var w = Editor.getForm();
                if (w.getElementByName(e)) {
                    w.getElementByName(e).focus()
                }
            } else {
                setTimeout(Editor.focusOnForm.bind(Editor, e), 500)
            }
            return c
        };
        Editor.fromHdrive = function(z) {
            var w = [];
            for (var y = 0; y < z.length; y++) {
                w.push(z[y])
            }
            var e = {
                content: "",
                attachments: w
            };
            if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
                if (this.loadEditor) {
                    this.loadEditor(e);
                    var A = Editor.getAttachBox().datalist;
                    for (var x = 0; x < A.length; x++) {
                        A[x].execAppend()
                    }
                }
            } else {
                setTimeout(this.fromHdrive.bind(this, z), 10)
            }
        };
        Editor.refreshSize = function() {
            this.canvas.fireJobs(g.Ev.__CANVAS_WRAP_WIDTH_CHANGE)
        };
        Editor.prototype.switchEditor = Editor.switchEditor;
        Editor.prototype.focusOnForm = Editor.focusOnForm
    })();
    g.Toolbar = g.Class.create({
        $mixins: [g.I.JobObservable],
        el: i,
        tools: i,
        initialize: function(e, w) {
            this.canvas = e.getCanvas();
            var x = w.initializedId || "";
            this.el = $must("tx_toolbar_basic" + x, "Trex.Toolbar")
        },
        disableToolbar: function() {
            var w = this.tools;
            for (var e in w) {
                if (w[e].button) {
                    w[e].button.disable()
                }
            }
        },
        serializeToolValues: function() {
            var y = this.tools;
            var e = {};
            for (var x in y) {
                var w = y[x];
                e[x] = w.button.lastValue
            }
            return e
        },
        widgetSeq: 0,
        makeWidget: function(x, A, y) {
            var w = this;
            var z = this.canvas;
            var e = new(function() {
                this.identity = "widget" + (++w.widgetSeq);
                this.wysiwygonly = u;
                this.menuFoldAuto = u;
                this.canvas = z;
                this.toolbar = w
            })();
            g.Tool.prototype.weave.bind(e)(x, A, y);
            this.tools[e.identity] = e;
            return e
        }
    });
    g.install("editor.getTool", function(w, x) {
        var e = x.tools = {};
        w.getTool = function(y) {
            if (e[y] != i) {
                return e[y]
            } else {
                if (arguments.length == 0) {
                    return e
                } else {
                    return i
                }
            }
        }
    });
    g.register("new tools", function(A, C, e, w, x) {
        var B = C.tools;
        var y = x.initializedId || "";
        for (var E in g.Tool) {
            var D = g.Tool[E]["__Identity"];
            if (D) {
                var z = p.getTool(D, x);
                z.initializedId = y;
                if (g.available(z, D + y)) {
                    B[D] = new g.Tool[E](A, C, z)
                }
            }
        }
        if (!!w.config.readonly) {
            C.disableToolbar()
        }
    });
    g.module("bind events with tools", function(y, C, e, w) {
        var A = C.tools;
        var x = function() {
            var E, G, F, H;
            E = t.ios || t.android;
            if (!E) {
                return
            }
            for (G in A) {
                F = A[G];
                if (F.disabledonmobile) {
                    H = F.button;
                    H.disable()
                }
            }
        };
        x();
        var B = function(I, H) {
            if (I == H) {
                return
            }
            for (var F in A) {
                var E = A[F];
                var G = E.button;
                if (g.Canvas.__WYSIWYG_MODE == H) {
                    G.enable()
                } else {
                    if (g.Canvas.__WYSIWYG_MODE == I) {
                        if (E.wysiwygonly) {
                            G.disable()
                        } else {
                            G.enable()
                        }
                    }
                }
            }
            x()
        };
        w.observeJob(g.Ev.__CANVAS_MODE_CHANGE, B);
        w.observeJob(g.Ev.__CANVAS_MODE_INITIALIZE, B);
        var D = function(G) {
            for (var F in A) {
                var E = A[F];
                if (G != E.identity) {
                    if (E.button) {
                        E.button.release();
                        E.button.decreaseZindex()
                    }
                    if (E.menu && E.menuFoldAuto) {
                        E.menu.release()
                    }
                }
            }
        };
        w.observeJob(g.Ev.__CANVAS_PANEL_CLICK, D);
        w.observeJob(g.Ev.__CANVAS_SOURCE_PANEL_CLICK, D);
        w.observeJob(g.Ev.__CANVAS_TEXT_PANEL_CLICK, D);
        C.observeJob(g.Ev.__TOOL_CLICK, D);
        w.observeKey({
            ctrlKey: c,
            altKey: c,
            shiftKey: c,
            keyCode: 27
        }, D);
        y.observeKey({
            ctrlKey: c,
            altKey: c,
            shiftKey: c,
            keyCode: 27
        }, D);
        t.observe(b, "click", function(F) {
            var G = t.element(F);
            var E = ["tx-sidebar", "tx-toolbar-basic", "tx-toolbar-advanced", "tx-sidebar-boundary", "tx-toolbar-boundary", "tx-toolbar-boundary"];
            if (g.Util.getMatchedClassName(G, E)) {
                D("-")
            }
        }, c);
        var z = function() {
            y.fireJobs(g.Ev.__SHOULD_CLOSE_MENUS)
        };
        C.observeJob(g.Ev.__TOOL_CLICK, z)
    });
    g.Tool = g.Class.draft({
        identity: i,
        button: i,
        menu: i,
        initialize: function(w, x, e) {
            if (!this.constructor.__Identity) {
                throw new Error("[Exception]Trex.Tool : not implement const(__Identity)")
            }
            this.identity = this.constructor.__Identity;
            if (!w) {
                throw new Error("[Exception]Trex.Tool : not exist argument(editor)")
            }
            this.editor = w;
            this.toolbar = x;
            this.canvas = w.getCanvas();
            this.config = e;
            this.wysiwygonly = ((e.wysiwygonly != i) ? e.wysiwygonly : u);
            this.menuFoldAuto = ((e.menuFoldAuto != i) ? e.menuFoldAuto : u);
            if (e.disabledonmobile != i) {
                this.disabledonmobile = e.disabledonmobile
            }
            this.buttonCfg = p.merge({
                id: "tx_" + this.identity
            }, e);
            this.menuCfg = p.merge({
                id: "tx_" + this.identity + "_menu"
            }, e);
            this.oninitialized.bind(this)(e)
        },
        oninitialized: function() {
            throw new Error("[Exception]Trex.Tool : not implements function(oninitialized)")
        },
        weave: function(z, e, w, C) {
            var y = this;
            var D = this.identity;
            var B = this.toolbar;
            var A = this.canvas;
            this.button = z;
            z.tool = this;
            var x = i;
            if (!e) {
                z.setCommand(x = function() {
                    B.fireJobs(g.Ev.__TOOL_CLICK, D);
                    return w.apply(y, arguments)
                })
            } else {
                this.menu = e;
                e.tool = this;
                e.initHandler = C || function() {};
                e.cancelHandler = function() {
                    z.setState(c)
                };
                e.setCommand(x = function() {
                    var E = arguments;
                    var F = w.apply(y, E);
                    if (F === $stop) {
                        z.normalState.apply(z, E)
                    } else {
                        z.updateAfterCommand.apply(z, E)
                    }
                    return F
                });
                z.setCommand(function(F) {
                    B.fireJobs(g.Ev.__TOOL_CLICK, D, F);
                    if (!z.isPushed()) {
                        var G = z.getValue();
                        z.increaseZindex();
                        e.show(G)
                    } else {
                        e.hide();
                        if (t.msie) {
                            var E = A.getProcessor();
                            if (E.restoreRange) {
                                setTimeout(function() {
                                    E.restoreRange()
                                }, 0)
                            }
                        }
                    }
                    return u
                });
                e.observeJob(g.Ev.__MENU_LAYER_SHOW, function(E) {
                    B.fireJobs(g.Ev.__MENU_LAYER_SHOW, E)
                });
                e.observeJob(g.Ev.__MENU_LAYER_HIDE, function(E) {
                    B.fireJobs(g.Ev.__MENU_LAYER_HIDE, E)
                });
                e.observeJob(g.Ev.__MENU_LAYER_CHANGE_SIZE, function(E) {
                    B.fireJobs(g.Ev.__MENU_LAYER_CHANGE_SIZE, E)
                })
            }
            this.execute = x
        },
        resetWeave: function() {
            this.button.removeHandler();
            this.button.normalState();
            this.button = i;
            this.menu = i;
            this.execute = i
        },
        forceActivate: function() {
            if (this.button && this.menu) {
                this.button.pushedState();
                this.button.increaseZindex();
                this.menu.show()
            }
        },
        bindKeyboard: function(x, y) {
            var w = this.toolbar;
            var e = this.identity;
            this.canvas.observeKey(x, function(z) {
                y(z);
                w.fireJobs(g.Ev.__TOOL_SHORTCUT_KEY, e)
            })
        }
    });
    g.AsyncTool = g.Class.draft({
        $extend: g.Tool,
        oninitialized: function() {
            this.loaded = false;
            throw new Error("[Exception]Trex.AsyncTool : not implements function(oninitialized)")
        },
        onLoadModule: function() {
            var e = this;
            var w = this.config.asyncUrl;
            if (/^(?:\/\/)|(?:\w+:\/\/)/.test(w) === false) {
                w = this.getJSBasePath() + w
            }
            Editor.editorForAsyncLoad = this.editor;
            EditorJSLoader.asyncLoadModule({
                url: p.getUrl(w),
                callback: function() {
                    e.loaded = true
                }
            })
        },
        getJSBasePath: function() {
            var x;
            try {
                x = EditorJSLoader.getJSBasePath("editor.js")
            } catch (w) {
                x = EditorJSLoader.getJSBasePath()
            }
            return x
        }
    });
    g.Sidebar = g.Class.create({
        $const: {
            __REG_ENTRY_ATTR_PAIR_Q: new RegExp('([\\w]+)="([^"]+)"', "g"),
            __REG_ENTRY_ATTR_PAIR_NQ: new RegExp("([\\w]+)=([\\w]+)", "g")
        },
        $mixins: [g.I.JobObservable],
        entryboxRegistry: i,
        initialize: function(e) {
            var w = e.getCanvas();
            this.entryboxRegistry = {};
            this.getFields = function() {
                var x = [];
                for (var z in this.entryboxRegistry) {
                    var y = this.entryboxRegistry[z];
                    x = x.concat(y.getFields())
                }
                return x
            };
            this.syncSidebar = function() {
                var x = w.getContent();
                for (var y in this.entryboxRegistry) {
                    this.entryboxRegistry[y].syncBox(x)
                }
            };
            this.emptyEntries = function() {
                for (var x in this.entryboxRegistry) {
                    this.entryboxRegistry[x].empty()
                }
            };
            w.observeJob(g.Ev.__CANVAS_PANEL_DELETE_SOMETHING, function() {
                this.syncSidebar()
            }.bind(this))
        }
    });
    g.EntryBox = g.Class.draft({
        $mixins: [g.I.JobObservable],
        autoSeq: 0,
        datalist: [],
        initialize: function() {
            throw new Error("[Exception]Trex.EntryBox : not implements function(initialize)")
        },
        newSeq: function() {
            return (++this.autoSeq)
        },
        syncSeq: function(e) {
            this.autoSeq = (e > this.autoSeq) ? e : this.autoSeq;
            return e
        },
        empty: function() {
            this.fireJobs(g.Ev.__ENTRYBOX_ALL_ENTRY_REMOVED);
            this.datalist = []
        },
        append: function(e) {
            this.datalist.push(e);
            this.fireJobs(g.Ev.__ENTRYBOX_ENTRY_ADDED, e)
        },
        modify: function(e) {
            this.fireJobs(g.Ev.__ENTRYBOX_ENTRY_MODIFIED, e)
        },
        remove: function(e) {
            e.deletedMark = u;
            this.fireJobs(g.Ev.__ENTRYBOX_ENTRY_REMOVED, e)
        },
        syncBox: function(e) {
            this.datalist.each(function(w) {
                w.execSync(e)
            })
        },
        getFields: function() {
            var e = [];
            this.datalist.each(function(w) {
                e.push(w.getField())
            });
            return e.findAll(function(w) {
                return (w != i)
            })
        },
        getEntries: function(e) {
            if (!e) {
                return this.datalist
            }
            var w = [];
            this.datalist.each(function(x) {
                if (x.type == e) {
                    w.push(x)
                }
            });
            return w
        }
    });
    g.Entry = g.Class.draft({
        $mixins: [g.I.JobObservable],
        existStage: c,
        deletedMark: c,
        initialize: function() {
            throw new Error("[Exception]Trex.Entry : not implements function(initialize)")
        },
        setExistStage: function(e) {
            this.existStage = e
        },
        execRegister: function() {
            this.register();
            this.entryBox.append(this);
            this.setExistStage(u)
        },
        execReload: function() {
            if (this.reload) {
                this.reload()
            }
            this.entryBox.append(this);
            this.exchangeHandlerAtReload()
        },
        execRemove: function() {
            this.remove();
            this.entryBox.remove(this)
        },
        execReplace: function(e) {
            this.replace(e);
            this.entryBox.modify(this);
            this.setExistStage(u)
        },
        execAppend: function() {
            this.register();
            this.setExistStage(u)
        },
        execSync: function(e) {
            this.setExistStage(this.checkExisted(e))
        },
        checkExisted: function(e) {
            if (this.canvas.isWYSIWYG()) {
                return (e.search(this.regHtml) > -1)
            } else {
                return (e.search(this.regText) > -1)
            }
        },
        getChangedContent: function(w, z, y, x) {
            var e = c;
            if (w.search(z) > -1) {
                e = u;
                if (this.actor.canResized) {
                    w = this.getChangedContentWithAttr(w, z, y, x)
                } else {
                    w = w.replace(z, y)
                }
            }
            this.setExistStage(e);
            return w
        },
        getChangedContentFromHtml: function(e) {
            return this.getChangedContent(e, this.regHtml, this.dispText, ["id", "class"])
        },
        getChangedContentToHtml: function(e) {
            return this.getChangedContent(e, this.regText, this.dispHtml)
        },
        getChangedContentAtSave: function(e) {
            return this.getChangedContent(e, this.regHtml, this.saveHtml, ["id", "class"])
        },
        getChangedContentAtLoad: function(e) {
            return this.getChangedContent(e, this.regLoad, this.dispHtml)
        },
        getChangedContentWithAttr: function(z, e, E, A) {
            A = A || [];
            var x = g.Util.getAllAttributes(E);
            var B = function(J) {
                var I = g.Util.getMatchValue(/<([a-z]*)/i, E, 1);
                var K = ["<" + I.toLowerCase()];
                var H = g.Util.getAllAttributes(J);
                for (var G in x) {
                    if (["width", "height"].contains(G)) {
                        if (!H[G]) {
                            K.push(G + '="' + x[G] + '"')
                        }
                    } else {
                        K.push(G + '="' + x[G] + '"')
                    }
                }
                for (var G in H) {
                    if (!A.contains(G)) {
                        if (["width", "height"].contains(G)) {
                            K.push(G + '="' + H[G] + '"')
                        } else {
                            if (!x[G]) {
                                K.push(G + '="' + H[G] + '"')
                            }
                        }
                    }
                }
                K.push("/>");
                return K.join(" ")
            };
            var D = z;
            var y;
            e.lastIndex = 0;
            while ((y = e.exec(D)) != i) {
                var w = y[0];
                var F = B(w);
                var C = w.getRegExp();
                z = z.replace(new RegExp(C, "gmi"), F)
            }
            return z
        },
        getField: function() {
            if (!this.field) {
                return i
            }
            return {
                name: this.field.name,
                value: [this.field.value, this.existStage].join("|")
            }
        },
        exchangeHandlerAtReload: function() {}
    });
    g.Actor = g.Class.draft({
        $mixins: [g.I.JobObservable],
        isDisabled: c,
        initialize: function() {
            throw new Error("[Exception]Trex.Actor : not implements function(initialize)")
        },
        execAttach: function(x, w) {
            var e = this.createEntry(this.getDataForEntry(x), w);
            e.execRegister();
            this.canvas.fireJobs("canvas." + (w || this.constructor.__Identity) + ".added", e)
        },
        getDatalist: function() {
            return this.entryBox.getEntries(this.name)
        },
        execReattach: function(z, x) {
            var y = this.getDatalist();
            var A = this.getDataForEntry(z);
            if (y.length < 1) {
                var e = this.createEntry(A, x);
                e.execRegister()
            } else {
                var e = y[0];
                var w = {
                    regHtml: e.regHtml,
                    regText: e.regText
                };
                e.setProperties(A);
                e.execReplace(w)
            }
        },
        execReload: function(z, y, x) {
            var w = this.getDataForEntry(z, y);
            if (w) {
                var e = this.createEntry(w, x);
                e.execReload()
            }
        },
        existEntry: function() {
            return ((this.getDatalist().length == 0) ? c : u)
        },
        getFirstEntryData: function() {
            var e = this.getDatalist();
            return ((e.length == 0) ? i : e[0].data)
        }
    });
    g.install("editor.getDocParser", function(y, z, A, w, e) {
        var x = new g.Docparser(y, A, e);
        y.getDocParser = function() {
            return x
        }
    });
    g.Docparser = g.Class.create({
        initialize: function(w, x, e) {
            this.editor = w;
            this.sidebar = x;
            this.config = e
        },
        filters: {},
        registerFilter: function(e, w) {
            this.filters[e] = w
        },
        getFilter: function(e) {
            return this.filters[e]
        },
        executeFilters: function(x, w) {
            var e = this.filters;
            ["before " + x, x, "after " + x].each(function(A) {
                var y, z;
                for (y in e) {
                    if (e.hasOwnProperty(y)) {
                        z = e[y];
                        if (z[A]) {
                            w = z[A](w)
                        }
                    }
                }
            });
            return w
        },
        getContentsAtChangingMode: function(w, e, x) {
            if (e == x) {
                return w
            }
            w = w.trim() || "";
            return this.executeFilters(e.concat("2").concat(x), w)
        },
        convertAtLoad: function(w, e, x) {
            if (x == "original") {
                w = this.executeFilters(e.concat("@load"), w)
            } else {
                if (e != x) {
                    w = this.executeFilters(x.concat("2").concat(e), w)
                }
            }
            return w
        },
        convertAtSave: function(x, w, e) {
            if (e == "original") {
                x = this.executeFilters(w.concat("4save"), x)
            } else {
                if (w != e) {
                    x = this.executeFilters(w.concat("2").concat(e), x)
                }
            }
            return x
        },
        text2source: function(e) {
            return this.executeFilters("text2source", e)
        },
        text2html: function(e) {
            if (e === "") {
                return v.EMPTY_PARAGRAPH_HTML
            }
            return this.executeFilters("text2html", e)
        },
        source2text: function(e) {
            return this.executeFilters("source2text", e)
        },
        source2html: function(e) {
            if (e === "") {
                return v.EMPTY_PARAGRAPH_HTML
            }
            return this.executeFilters("source2html", e)
        },
        html2text: function(e) {
            return this.executeFilters("html2text", e)
        },
        html2source: function(e) {
            return this.executeFilters("html2source", e)
        }
    });
    g.install("editor.getEntryProxy", function(y, z, A, x, w) {
        var e = new g.EntryProxy(y, A, w);
        y.getEntryProxy = function() {
            return e
        }
    });
    g.EntryProxy = g.Class.create({
        initialize: function(w, x, e) {
            this.editor = w;
            this.sidebar = x;
            this.config = e
        },
        commands: {},
        registerCommand: function(e, w) {
            this.commands[e] = w
        },
        getcommand: function(e) {
            return this.commands[e]
        },
        executeCommand: function(x, w) {
            for (var e in this.commands) {
                var y = this.commands[e];
                if (y[x]) {
                    y[x](w)
                }
            }
        },
        setAttachments: function(e, x) {
            e = e || [];
            x = x || "";
            var w = this.editor.getAttachBox();
            w.empty();
            var y = this.sidebar.getAttacher();
            e.each(function(A) {
                try {
                    var z = y[A.attacher];
                    if (z) {
                        z.execReload(A.data, x, A.type)
                    }
                } catch (B) {}
            })
        },
        getAttachments: function(e, w) {
            w = !!w;
            var x = [];
            e.each(function(y) {
                if (y.deletedMark) {
                    return
                }
                if (w || y.existStage) {
                    x.push({
                        type: y.type,
                        attacher: y.actor.name,
                        existStage: y.existStage,
                        data: Object.extend(y.data, {
                            tmpSeq: y.dataSeq
                        })
                    })
                }
            });
            return x
        }
    });
    g.install("editor.getForm", function(x, y, z, w, e) {
        var A = new g.FormProxy(x, z, e);
        x.getForm = function() {
            return A
        }
    });
    g.FormProxy = g.Class.create({
        initialize: function(w, y, e) {
            this.editor = w;
            this.sidebar = y;
            this.config = e;
            var x = this.elForm = b.forms[e.form] || b.getElementById(e.form);
            if (!x) {
                throw new Error("[Exception]Trex.Form : not exist element - " + e.form)
            }
            x.onsubmit = function() {
                return c
            }
        },
        submit: function() {
            this.elForm.submit()
        },
        createField: function(e) {
            this.elForm.appendChild(e)
        },
        getElements: function() {
            return this.elForm.elements
        },
        getElementByName: function(e) {
            return this.elForm[e]
        },
        getFormField: function() {
            var w = {};
            var y = this.getElements();
            var e;
            for (var x = 0; x < y.length; x++) {
                e = y[x];
                if (!["select", "input", "textarea"].contains(e.tagName.toLowerCase())) {
                    continue
                }
                if (!e.name && !e.id) {
                    continue
                }
                if (e.tagName.toLowerCase() == "select") {
                    if (e.selectedIndex > 0) {
                        w[e.name] = e.options[e.selectedIndex].value
                    }
                } else {
                    if (e.type == "radio" && !e.checked) {} else {
                        if (e.type == "checkbox" && !e.checked) {} else {
                            w[e.name || e.id] = e.value
                        }
                    }
                }
            }
            return w
        },
        setFormField: function(e) {
            if (!e) {
                return
            }
            var A = this.getElements();
            var y;
            var w;
            for (var z = 0; z < A.length; z++) {
                y = A[z];
                if (!["select", "input", "textarea"].contains(y.tagName.toLowerCase())) {
                    continue
                }
                if (y.name === i || y.name.length === 0) {
                    continue
                }
                if (!e[y.name]) {
                    continue
                }
                w = e[y.name];
                if (y.tagName.toLowerCase() == "select") {
                    for (var x = 0; x < y.options.length; x++) {
                        if (y.options[x].value == w) {
                            y.options[x].selected = u;
                            break
                        }
                    }
                } else {
                    if (y.type == "radio" || y.type == "checkbox") {
                        if (y.value == w) {
                            y.checked = u
                        }
                    } else {
                        y.value = w
                    }
                }
            }
        }
    });
    g.install("editor.getSaver & editor.getDataAsJSON & editor.setDataByJSON", function(x, y, z, w, e) {
        var A = new g.Save(x, y, z, w, e);
        x.getSaver = function() {
            return A
        };
        x.getDataAsJSON = function() {
            var B = w.getContent();
            var C = new g.Validator();
            if (!C.exists(B)) {
                return i
            }
            return {
                inputmode: w.getCurrentPanel().getName(),
                content: B,
                attachments: function() {
                    var D = z.getAttachments();
                    return x.getEntryProxy().getAttachments(D, u)
                }(),
                resultBox: function() {
                    var E = x.getResultBox();
                    var D = [];
                    E.datalist.each(function(F) {
                        D.push(F.data)
                    });
                    return D
                }(),
                formfield: x.getForm().getFormField()
            }
        };
        x.setDataByJSON = function(E) {
            if (!E) {
                return
            }
            var C = w.mode;
            var B = E.inputmode || C;
            if (B == "original") {} else {
                if (B != C) {
                    w.fireJobs(g.Ev.__CANVAS_MODE_INITIALIZE, C, B);
                    w.changeMode(B)
                }
            }
            var D = E.content;
            if (E.attachments) {
                x.getEntryProxy().setAttachments(E.attachments, D)
            }
            if (D) {
                D = x.getDocParser().convertAtLoad(D, C, B);
                w.initContent(D)
            }
            if (E.resultBox) {
                E.resultBox.each(function(G) {
                    var F;
                    F = z.searchers[G._meta.type];
                    if (F) {
                        F.execReload(G, D)
                    }
                })
            }
            z.syncSidebar();
            if (E.formfield) {
                x.getForm().setFormField(E.formfield)
            }
        }
    });
    g.Save = g.Class.create({
        editor: i,
        toolbar: i,
        sidebar: i,
        canvas: i,
        config: i,
        form: i,
        initialize: function(x, y, z, w, e) {
            this.editor = x;
            this.toolbar = y;
            this.sidebar = z;
            this.canvas = w;
            this.config = e;
            this.form = x.getForm();
            this.docparser = x.getDocParser();
            this.entryproxy = x.getEntryProxy()
        },
        save: function() {
            try {
                if (typeof validForm == "function") {
                    if (!validForm(this.editor)) {
                        return c
                    }
                }
                if (typeof setForm == "function") {
                    if (!setForm(this.editor)) {
                        return c
                    }
                }
                return u
            } catch (w) {
                this.editor.fireJobs(g.Ev.__RUNTIME_EXCEPTION, w);
                return c
            }
        },
        submit: function() {
            if (this.save()) {
                this.editor.fireJobs(g.Ev.__ON_SUBMIT, this.editor);
                if (this.config.save && typeof this.config.save.onSave == "function") {
                    var e = this.config.save.onSave;
                    e()
                } else {
                    this.form.submit()
                }
            }
        },
        getContent: function(w) {
            var y = this.canvas;
            var e = y.mode;
            var z = w || "original";
            var x = y.getContent();
            x = this.docparser.convertAtSave(x, e, z);
            return x
        },
        getAttachments: function(w, e) {
            e = e || c;
            var x = this.sidebar.getAttachments(w);
            return this.entryproxy.getAttachments(x, e)
        },
        getEmbeddedData: function(e) {
            return this.sidebar.getEmbeddedData(e)
        },
        getResults: function(e) {
            return this.sidebar.getResults(e)
        },
        load: function(w) {
            this.editor.fireJobs(g.Ev.__EDITOR_LOAD_DATA_BEGIN);
            if (!w) {
                throw new Error("[Exception]Trex.Save : not exist argument(data)")
            }
            if (typeof loadForm == "function") {
                loadForm(this.editor, w)
            }
            try {
                this.setDataByJSONToEditor(w)
            } catch (e) {
                alert(" - Error: " + e.message + "\n\uc18c\uc2a4\ubcf4\uae30 \ubaa8\ub4dc\ub85c \uc804\ud658\ud569\ub2c8\ub2e4.\n\uc798\ubabb\ub41c HTML\uc774 \uc788\ub294\uc9c0 \ud655\uc778\ud574\uc8fc\uc138\uc694.");
                w.inputmode = g.Canvas.__HTML_MODE;
                try {
                    this.setDataByJSONToEditor(w)
                } catch (x) {}
            }
            if (typeof postLoad == "function") {
                postLoad(this.editor, w)
            }
            this.editor.fireJobs(g.Ev.__EDITOR_LOAD_DATA_END)
        },
        setDataByJSONToEditor: function(e) {
            this.editor.setDataByJSON({
                inputmode: (!e.inputmode || e.inputmode == "html") ? "original" : e.inputmode,
                content: function() {
                    var w = e.content;
                    if (typeof w == "string") {
                        return e.content
                    } else {
                        if (w && w.nodeType && (w.nodeType == 1)) {
                            return e.content.value
                        } else {
                            return ""
                        }
                    }
                }(),
                attachments: e.attachments
            })
        },
        makeField: function() {
            var y = this.sidebar;
            var x = this.form;
            var e = this.getContent();
            x.createField(tx.textarea({
                name: "tx_content",
                style: {
                    display: "none"
                }
            }, e));
            var w = y.getFields();
            w.each(function(z) {
                x.createField(tx.input({
                    type: "hidden",
                    name: z.name,
                    value: z.value
                }))
            })
        }
    });
    g.module("new Trex.Resizer", function(y, z, B, x, w) {
        var C = w.initializedId || "";
        var e = p.get("resizer", w);
        var A = i;
        y.setMinHeight = function(D) {
            return A.setMinHeight(D)
        };
        y.restoreMinHeight = function() {
            return A.restoreMinHeight()
        };
        if (g.available(e, "resizer" + C)) {
            A = new g.Resizer(y, e)
        }
    });
    p.add({
        resizer: {
            minHeight: 200
        }
    });
    g.Resizer = g.Class.create({
        $const: {
            __Identity: "resizer"
        },
        $mixins: [g.I.JobObservable],
        initialize: function(x, e) {
            var A = 0;
            if (!x) {
                return
            }
            this.config = e;
            var B = x.getInitializedId();
            var w = this.elBar = t("tx_resizer" + B);
            if (!w) {
                return
            }
            if (t.msie_ver == "5.5") {
                w.setAttribute("align", "center")
            }
            this.resizeHeightAtService = function(C) {
                if (typeof resizeHeight == "function") {
                    resizeHeight(C)
                }
            };
            this.resizingHeightAtService = function(C) {
                if (typeof resizingEditorHeight == "function") {
                    resizingEditorHeight(C)
                }
            };
            this.minDragHeight = e.minHeight;
            var z;
            this.startDrag = function(D) {
                var F = x.getCanvas();
                var E = F.getCurrentPanel();
                if (E == i) {
                    return
                }
                var C = E.getPosition();
                this.panelHeight = C.height;
                this.dragStartPosY = D.clientY;
                this.isDragging = u;
                t.observe(b, "mousemove", this.documentDraggingHandler);
                t.observe(b, "mouseup", this.stopDragHandler);
                if (E.getName() == g.Canvas.__WYSIWYG_MODE) {
                    this.panelTop = C.y;
                    z = E.getDocument();
                    if (z == i) {
                        return
                    }
                    F.fireJobs("canvas.height.beforechange");
                    t.observe(z, "mousemove", this.wysiwygDraggingHandler);
                    t.observe(z, "mouseup", this.stopDragHandler)
                }
                t.stop(D)
            };
            this.stopDrag = function(C) {
                var E = x.getCanvas();
                var D = E.getCurrentPanel();
                if (D == i) {
                    return
                }
                this.isDragging = c;
                t.stopObserving(b, "mousemove", this.documentDraggingHandler);
                t.stopObserving(b, "mouseup", this.stopDragHandler);
                if (z == i) {
                    return
                }
                t.stopObserving(z, "mousemove", this.wysiwygDraggingHandler);
                t.stopObserving(z, "mouseup", this.stopDragHandler);
                z = i;
                this.resizeHeightAtService(A);
                E.fireJobs("canvas.height.afterchange");
                t.stop(C)
            };
            this.dragingAtDocument = function(D) {
                var F = x.getCanvas();
                if (this.isDragging) {
                    var E = F.getCurrentPanel();
                    if (E == i) {
                        return
                    }
                    try {
                        var C = Math.max((this.panelHeight + D.clientY - this.dragStartPosY), this.minDragHeight.parsePx()).toPx();
                        E.setPanelHeight(C);
                        A = C;
                        F.fireJobs("canvas.height.change", C);
                        this.resizingHeightAtService(C)
                    } catch (G) {}
                }
                t.stop(D)
            };
            this.dragingAtWysiwyg = function(E) {
                var G = x.getCanvas();
                if (this.isDragging) {
                    var F = G.getCurrentPanel();
                    if (F == i) {
                        return
                    }
                    try {
                        var I = b.body.scrollTop || n.scrollTop || h.pageYOffset;
                        var D = G.getCanvasPos();
                        var C = Math.max((this.panelHeight + E.clientY + D.y - this.dragStartPosY + this.panelTop - I), this.minDragHeight.parsePx()).toPx();
                        F.setPanelHeight(C);
                        G.fireJobs("canvas.height.change", C)
                    } catch (H) {}
                }
                t.stop(E)
            };
            this.startDragHandler = this.startDrag.bindAsEventListener(this);
            this.stopDragHandler = this.stopDrag.bindAsEventListener(this);
            this.documentDraggingHandler = this.dragingAtDocument.bindAsEventListener(this);
            this.wysiwygDraggingHandler = this.dragingAtWysiwyg.bindAsEventListener(this);
            this.isDragging = c;
            t.observe(w, "mousedown", this.startDragHandler);
            var y = x.getCanvas();
            y.observeJob("canvas.fullscreen.change", function() {
                t.hide(w)
            });
            y.observeJob("canvas.normalscreen.change", function() {
                t.show(w)
            })
        },
        setMinHeight: function(e) {
            return this.minDragHeight = e.toPx()
        },
        restoreMinHeight: function() {
            return this.minDragHeight = this.config.minHeight || 200
        }
    });
    g.I.History = {};
    g.I.History.Standard = {
        getRangeData: function() {
            throw Error("Unimplemented abstract method")
        },
        restoreRange: function(e) {
            throw Error("Unimplemented abstract method")
        }
    };
    g.I.History.Webkit = {
        getRangeData: function() {
            var z = this.canvas.getProcessor(),
                A = z.getTxSel(),
                y = A.getSel().rangeCount;
            var B, w;
            if (y) {
                var x = A.getSel().getRangeAt(0);
                var e = x.cloneRange();
                e.selectNodeContents(this.canvas.getCurrentPanel().getDocument().body);
                e.setEnd(x.startContainer, x.startOffset);
                B = e.toString().length;
                w = B + x.toString().length
            } else {
                B = 0;
                w = 0
            }
            return {
                start: B,
                end: w
            }
        },
        restoreRange: function(E) {
            var D = this.canvas.getCurrentPanel().getDocument().body;
            var e = 0,
                B = document.createRange();
            B.setStart(D, 0);
            B.collapse(true);
            var A = [D],
                x, y = false,
                F = false;
            while (!F && (x = A.pop())) {
                if (x.nodeType == 3) {
                    var C = e + x.length;
                    if (!y && E.start >= e && E.start <= C) {
                        B.setStart(x, E.start - e);
                        y = true
                    }
                    if (y && E.end >= e && E.end <= C) {
                        B.setEnd(x, E.end - e);
                        F = true
                    }
                    e = C
                } else {
                    var z = x.childNodes.length;
                    while (z--) {
                        A.push(x.childNodes[z])
                    }
                }
            }
            var w = window.getSelection();
            w.removeAllRanges();
            w.addRange(B)
        }
    };
    g.I.History.Trident = {
        getRangeData: function() {
            var B = this.canvas.getCurrentPanel().getDocument();
            var y = B.body;
            try {
                var w = B.selection.createRange()
            } catch (A) {
                return {
                    start: 0,
                    end: 0
                }
            }
            var z = B.body.createTextRange();
            z.moveToElementText(y);
            try {
                z.setEndPoint("EndToStart", w);
                var C = z.text.length;
                return {
                    start: C,
                    end: C + w.text.length
                }
            } catch (A) {}
            var x = z.text.length;
            return {
                start: x,
                end: x
            }
        },
        restoreRange: function(x) {
            var y = this.canvas.getCurrentPanel().getDocument();
            var w = y.body;
            var e = y.body.createTextRange();
            e.moveToElementText(w);
            e.collapse(true);
            e.moveEnd("character", x.end);
            e.moveStart("character", x.start);
            e.select()
        }
    };
    (function() {
        function e(z, y) {
            while (z.length >= y) {
                z.shift()
            }
        }
        var x = 20;
        g.History = g.Class.create({
            $mixins: [g.I.History.Standard, ((t.msie_nonstd) ? g.I.History.Trident : g.I.History.Webkit)],
            maxUndoCount: x,
            canvas: i,
            undoMementoList: i,
            redoMementoList: i,
            currentMemento: i,
            contentModified: c,
            initialize: function(y) {
                this.canvas = y;
                this.setupHistory();
                this.bindKeyEvent(y)
            },
            bindKeyEvent: function(z) {
                var y = this;
                z.observeJob("canvas.panel.undo", function() {
                    y.undoHandler()
                });
                z.observeJob("canvas.panel.redo", function() {
                    y.redoHandler()
                })
            },
            setupHistory: function() {
                this.initHistory({
                    content: v.EMPTY_PARAGRAPH_HTML,
                    scrollTop: 0
                })
            },
            canUndo: function() {
                return this.undoMementoList.length > 0
            },
            canRedo: function() {
                return this.redoMementoList.length > 0
            },
            setCurrentMemento: function(y) {
                this.currentMemento = y
            },
            undoHandler: function() {
                var z = this;
                z.saveHistoryIfEdited();
                if (!z.canUndo()) {
                    return
                }
                var y = z.undoMementoList.pop();
                y.undo();
                z.redoMementoList.push(y);
                z.setCurrentMemento(y)
            },
            redoHandler: function() {
                var y = this;
                y.saveHistoryIfEdited();
                if (!y.canRedo()) {
                    return
                }
                var z = y.redoMementoList.pop();
                z.redo();
                y.undoMementoList.push(z);
                y.setCurrentMemento(z)
            },
            initHistory: function(B) {
                var z = this;
                z.undoMementoList = [];
                z.redoMementoList = [];
                var A = new w();
                var y = Object.extend({
                    content: v.EMPTY_PARAGRAPH_HTML,
                    scrollTop: 0
                }, B);
                A.addUndoData(y);
                A.addHandler(z.getTextHandler());
                z.setCurrentMemento(A)
            },
            saveHistory: function(C, E, B) {
                var z = this;
                var y = z.undoMementoList;
                var D = z.currentMemento;
                z.redoMementoList = [];
                if (arguments.length == 3) {
                    D.addUndoRedData(C, E, B)
                }
                var F = z.getTextData();
                D.addRedoData(F);
                e(y, z.maxUndoCount);
                y.push(D);
                var A = new w();
                A.addHandler(z.getTextHandler());
                A.addUndoData(F);
                z.setCurrentMemento(A);
                z.contentModified = c
            },
            injectHistory: function(B, C, A) {
                if (!this.canUndo()) {
                    return
                }
                var y = this.undoMementoList;
                var z = y[y.length - 1];
                z.addUndoRedData(B, C, A)
            },
            saveHistoryIfEdited: function() {
                if (this.contentModified) {
                    this.saveHistory()
                }
            },
            saveHistoryByKeyEvent: function(A) {
                var z = {
                    code: A.keyCode,
                    ctrl: A.ctrlKey || (A.keyCode === 17),
                    alt: A.altKey || (A.keyCode === 18),
                    shift: A.shiftKey || (A.keyCode === 16)
                };
                if (z.code == 229) {
                    return
                }
                var y = this;
                if (z.code == g.__KEY.ENTER || z.code == g.__KEY.SPACE || z.code == g.__KEY.TAB) {
                    y.saveHistoryIfEdited()
                } else {
                    if (z.code == g.__KEY.DELETE || z.code == g.__KEY.BACKSPACE) {
                        y.saveHistory()
                    } else {
                        if ((z.code == g.__KEY.PASTE || z.code == g.__KEY.CUT) && z.ctrl) {
                            y.saveHistory()
                        } else {
                            if (((z.code > 32 && z.code < 41) && z.shift) || (z.code == 65 && z.ctrl)) {
                                y.saveHistoryIfEdited()
                            } else {
                                if (z.ctrl || z.alt || (z.shift && z.code == 16)) {} else {
                                    y.contentModified = u
                                }
                            }
                        }
                    }
                }
            },
            getTextHandler: function() {
                var z = this.canvas;
                var y = this;
                return function(C) {
                    z.setContent(C.content);
                    var B = {
                        start: 0,
                        end: 0
                    };
                    var A = C.range || B;
                    y.restoreRange(A);
                    if (t.msie_nonstd) {
                        setTimeout(function() {
                            z.setScrollTop(C.scrollTop)
                        }, 0)
                    }
                }
            },
            getTextData: function() {
                return {
                    content: this.canvas.getContent(),
                    scrollTop: this.canvas.getScrollTop(),
                    range: this.getRangeData()
                }
            }
        });
        var w = g.Class.create({
            initialize: function() {
                this.before = {};
                this.after = {};
                this.handlers = []
            },
            addUndoRedData: function(z, A, y) {
                Object.extend(this.before, z);
                Object.extend(this.after, A);
                this.handlers.push(y)
            },
            addHandler: function(y) {
                this.handlers.push(y)
            },
            addUndoData: function(y) {
                Object.extend(this.before, y)
            },
            addRedoData: function(y) {
                Object.extend(this.after, y)
            },
            undo: function() {
                var y = this;
                y.handlers.each(function(z) {
                    z(y.before)
                })
            },
            redo: function() {
                var y = this;
                y.handlers.each(function(z) {
                    z(y.after)
                })
            }
        })
    })();
    (function(w) {
        var x = new t.Set(13, 8, 32, 33, 34, 37, 38, 39, 40, 46);
        var e = function(y) {
            return x.contains(y)
        };
        p.add({
            canvas: {
                doctype: "auto",
                mode: ["text", "html", "source"],
                styles: {
                    color: "#333333",
                    fontFamily: "\ub3cb\uc6c0",
                    fontSize: "9pt",
                    backgroundColor: "#ffffff",
                    lineHeight: "1.5",
                    padding: "8px"
                },
                pMarginZero: true,
                selectedMode: "html",
                readonly: c,
                initHeight: 400,
                minHeight: 200,
                ext: "html",
                param: "",
                newlinepolicy: "p",
                showGuideArea: u,
                convertingText: u,
                escapeTextModeContents: u,
                removeTextModeBr: c
            }
        }, function(z) {
            var B = p.get("canvas", z);
            var y = z.events;
            B.initializedId = z.initializedId || "";
            B.useHotKey = y.useHotKey;
            var C = p.getTool("switcher", z);
            if (w.available(C, "switcher" + B.initializedId)) {
                B.mode = C.options.pluck("data")
            }
            var D = p.getTool("fontfamily", z);
            if (w.available(D, "fontfamily" + B.initializedId)) {
                if (D.webfont && D.webfont.use) {
                    B.webfont = D.webfont;
                    B.webfont.options.each(function(E) {
                        E.url = p.getUrl(E.url)
                    })
                }
            }
            var A = p.get("resizer", z);
            if (A) {
                B.minHeight = A.minHeight
            }
            B.wysiwygUrl = p.getUrl([(B.wysiwygPath || "#host#path/pages/daumx/"), "wysiwyg_", (B.serviceWysiwyg || ""), ((B.doctype == "html") ? "html" : "xhtml"), ".", (B.ext ? B.ext : "html"), "?prefix=" + z.initializedId, "&", B.param].join(""));
            if (B.doctype == "auto") {
                if (t.msie && t.msie_quirks) {
                    B.doctype = "quirks"
                } else {
                    B.doctype = "edge"
                }
            }
        });
        p.add({
            size: {}
        });
        w.Canvas = w.Class.create({
            $const: {
                __TEXT_MODE: "text",
                __HTML_MODE: "source",
                __WYSIWYG_MODE: "html",
                __WYSIWYG_PADDING: 8,
                __IMAGE_PADDING: 5
            },
            $mixins: [w.I.JobObservable, w.I.KeyObservable, w.I.ElementObservable, w.I.MouseoverObservable],
            editor: i,
            elContainer: i,
            config: i,
            history: i,
            panels: i,
            initialize: function(y, A) {
                this.editor = y;
                var z = this.config = p.get("canvas", A);
                var B = ((A.initializedId) ? A.initializedId : "");
                this.elContainer = t("tx_canvas" + B);
                this.wysiwygEl = t("tx_canvas_wysiwyg_holder" + B);
                this.sourceEl = t("tx_canvas_source_holder" + B);
                this.textEl = t("tx_canvas_text_holder" + B);
                this.initConfig(A);
                this.createPanel();
                this.history = new w.History(this, z);
                this.setCanvasSize({
                    height: z.initHeight
                })
            },
            initConfig: function(A) {
                var z = this.config;
                this.getRootConfig = function() {
                    return A
                };
                this.getConfig = function() {
                    return z
                };
                this.getStyleConfig = function(B) {
                    if (B) {
                        return z.styles[B]
                    } else {
                        return z.styles
                    }
                };
                var y = p.get("size", A);
                this.measureWrapWidth = function() {
                    y.wrapWidth = this.getContainerWidth()
                };
                this.measureWrapWidth();
                if (!y.contentWidth) {
                    y.contentWidth = y.wrapWidth
                }
                y.contentPadding = z.styles.padding.parsePx();
                this.getSizeConfig = function() {
                    return y
                }
            },
            getContainerWidth: function() {
                return t.getDimensions(this.elContainer).width
            },
            createPanel: function() {
                var B = this;
                var A = this.config;
                this.panels = {};
                this.mode = A.selectedMode || w.Canvas.__WYSIWYG_MODE;
                if ((t.ios && t.ios_ver < 5) || (t.android && t.android_ver < 3)) {
                    this.mode = w.Canvas.__TEXT_MODE
                }
                var z = {
                    text: function(C) {
                        return new w.Canvas.TextPanel(B, C)
                    },
                    source: function(C) {
                        return new w.Canvas.HtmlPanel(B, C)
                    },
                    html: function(C) {
                        return new w.Canvas.WysiwygPanel(B, C)
                    }
                };
                A.mode.each(function(C) {
                    if (z[C]) {
                        B.panels[C] = z[C](A)
                    }
                });
                for (var y in B.panels) {
                    if (this.mode == y) {
                        B.panels[y].show()
                    } else {
                        B.panels[y].hide()
                    }
                }
                B.observeJob("canvas.panel.iframe.load", function(C) {
                    B.fireJobs(w.Ev.__IFRAME_LOAD_COMPLETE, C)
                })
            },
            changeMode: function(z) {
                var y = this.editor;
                var D = this.mode;
                if (D == z) {
                    return
                }
                var A = this.panels[D];
                var B = this.panels[z];
                if (!A || !B) {
                    throw new Error("[Exception]Trex.Canvas : not suppored mode")
                }
                var F = A.getContent();
                var C = y.getDocParser().getContentsAtChangingMode(F, D, z);
                if (D == w.Canvas.__WYSIWYG_MODE) {
                    if (t.msie_ver === 8) {
                        A.hide()
                    }
                    A.setContent("");
                    try {
                        this.focusOnTop()
                    } catch (E) {}
                }
                try {
                    B.setContent(C)
                } catch (G) {
                    alert(" - Error: " + G.message + "\n\uc5d0\ub514\ud130 \ud0c0\uc785 \ubcc0\uacbd\uc5d0 \uc2e4\ud328\ud558\uc600\uc2b5\ub2c8\ub2e4.\n\uc798\ubabb\ub41c HTML\uc774 \uc788\ub294\uc9c0 \ud655\uc778\ud574\uc8fc\uc138\uc694.");
                    A.setContent(F);
                    A.show();
                    return
                }
                this.mode = z;
                this.fireJobs(w.Ev.__CANVAS_MODE_CHANGE, D, z);
                B.setPanelHeight(A.getPanelHeight());
                B.show();
                A.hide();
                try {
                    if (z == "html" && !this.getPanel("html").designModeActivated && t.gecko) {
                        this.getPanel("html").el.contentDocument.designMode = "on";
                        this.getPanel("html").designModeActivated = u
                    }
                } catch (E) {
                    throw E
                }
            },
            focus: function() {
                this.panels[this.mode].focus()
            },
            focusOnTop: function() {
                if (!this.isWYSIWYG()) {
                    return
                }
                this.getProcessor().focusOnTop()
            },
            focusOnBottom: function() {
                if (!this.isWYSIWYG()) {
                    return
                }
                this.getProcessor().focusOnBottom()
            },
            getCanvasPos: function() {
                var y = t.cumulativeOffset(this.elContainer);
                return {
                    x: y[0],
                    y: y[1]
                }
            },
            setCanvasSize: function(y) {
                if (this.panels[this.mode] && y.height) {
                    this.panels[this.mode].setPanelHeight(y.height)
                } else {
                    throw new Error("[Exception]Trex.Canvas : argument has no property - size.height ")
                }
            },
            canHTML: function() {
                return this.isWYSIWYG()
            },
            isWYSIWYG: function() {
                return this.mode === w.Canvas.__WYSIWYG_MODE
            },
            getPanel: function(y) {
                if (this.panels[y]) {
                    return this.panels[y]
                } else {
                    return i
                }
            },
            getCurrentPanel: function() {
                if (this.panels[this.mode]) {
                    return this.panels[this.mode]
                } else {
                    return i
                }
            },
            getProcessor: function(y) {
                if (!y) {
                    return this.panels[this.mode].getProcessor()
                } else {
                    return this.panels[y].getProcessor()
                }
            },
            getContent: function() {
                var y = this.panels[this.mode].getContent();
                if (y) {
                    y = y.replace(w.__WORD_JOINER_REGEXP, "")
                }
                return y
            },
            getScrollTop: function() {
                if (!this.isWYSIWYG()) {
                    return 0
                }
                return this.panels[this.mode].getScrollTop()
            },
            setScrollTop: function(y) {
                if (!this.isWYSIWYG()) {
                    return
                }
                this.panels[this.mode].setScrollTop(y)
            },
            setContent: function(y) {
                this.panels[this.mode].setContent(y);
                this.includeWebfontCss(y)
            },
            initContent: function(y) {
                this.history.initHistory({
                    content: y
                });
                this.panels[this.mode].setContent(y);
                this.includeWebfontCss(y);
                this.fireJobs(w.Ev.__CANVAS_DATA_INITIALIZE, w.Canvas.__WYSIWYG_MODE, i)
            },
            includeWebfontCss: function(y) {
                if (!this.isWYSIWYG()) {
                    return
                }
                return this.panels[this.mode].includeWebfontCss(y)
            },
            getUsedWebfont: function() {
                if (!this.isWYSIWYG()) {
                    return []
                }
                return this.panels[this.mode].getUsedWebfont()
            },
            runScript: function(y) {
                if (!this.isWYSIWYG()) {
                    return []
                }
                this.panels[this.mode].runScript(y)
            },
            importScript: function(y, z) {
                if (!this.isWYSIWYG()) {
                    return []
                }
                this.panels[this.mode].importScript(y, z)
            },
            query: function(z) {
                if (!this.isWYSIWYG()) {
                    return i
                }
                var y = this.getProcessor();
                return z(y)
            },
            execute: function(A) {
                var z = this.history;
                var y = this.getProcessor();
                if (this.isWYSIWYG()) {
                    this.getPanel("html").ensureFocused();
                    if (y.restoreRange) {
                        setTimeout(function() {
                            y.restoreRange();
                            A(y);
                            z.saveHistory();
                            y.restore()
                        }, 0)
                    } else {
                        A(y);
                        y.focus();
                        z.saveHistory();
                        y.restore()
                    }
                } else {
                    A(y)
                }
            },
            moveCaret: function(y) {
                if (!y) {
                    return
                }
                if (!this.isWYSIWYG()) {
                    return
                }
                this.getProcessor().moveCaretWith(y)
            },
            pasteContent: function(A, y, z) {
                y = y || c;
                this.execute(function(B) {
                    B.pasteContent(A, y, z)
                })
            },
            pasteNode: function(A, y, z) {
                if (!this.isWYSIWYG()) {
                    return
                }
                y = y || c;
                this.execute(function(B) {
                    B.pasteNode(A, y, z)
                })
            },
            addStyle: function(y) {
                this.panels[this.mode].addStyle(y)
            },
            getStyle: function(y) {
                return this.panels[this.mode].getStyle(y)
            },
            getPositionByNode: function(y) {
                if (!this.isWYSIWYG()) {
                    return {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    }
                }
                return this.panels[this.mode].getPositionByNode(y)
            },
            onKeyDown: function(A) {
                var C = this.getProcessor();
                var B = this.getCurrentPanel().getDocument();

                function D() {
                    var E = d.dom.Range.createFromBrowserSelection(B.getSelection ? B.getSelection() : C.getSel());
                    var F = E.getStartNode();
                    var G = E.getStartOffset();
                    return {
                        node: F,
                        offset: G
                    }
                }
                var y = D();
                this.fireJobs(w.Ev.__CANVAS_PANEL_KEYDOWN, A);
                var z = null;
                if (A.keyCode == w.__KEY.BACKSPACE && C.isCollapsed() && (z = v.prevNodeUntilTagName(y.node, y.offset, "table")) && v.isTagName(z, "table")) {
                    t.stop(A);
                    this.fireJobs(w.Ev.__CANVAS_PANEL_BACKSPACE_TABLE, z)
                }
                if (this.config.useHotKey) {
                    this.fireKeys(A)
                }
            },
            onKeyUp: function(y) {
                var z = y.keyCode + "";
                if (e(z)) {
                    this.getProcessor().clearDummy()
                }
                this.history.saveHistoryByKeyEvent(y);
                try {
                    this.mayAttachmentChanged = u;
                    this.fireJobs(w.Ev.__CANVAS_PANEL_KEYUP, y);
                    if (this.isWYSIWYG() && e(z)) {
                        this.triggerQueryStatus()
                    }
                    if (z === w.__KEY.DELETE || z === w.__KEY.BACKSPACE) {
                        this.fireJobs(w.Ev.__CANVAS_PANEL_DELETE_SOMETHING)
                    }
                } catch (A) {}
            },
            onMouseOver: function(y) {
                try {
                    this.fireMouseover(t.element(y));
                    this.fireJobs(w.Ev.__CANVAS_PANEL_MOUSEOVER, y)
                } catch (z) {}
            },
            onMouseOut: function(y) {
                try {
                    this.fireJobs(w.Ev.__CANVAS_PANEL_MOUSEOUT, y)
                } catch (z) {}
            },
            onMouseDown: function(y) {
                this.getProcessor().clearDummy();
                try {
                    this.fireElements(t.element(y))
                } catch (A) {}
                this.fireJobs(w.Ev.__CANVAS_PANEL_MOUSEDOWN, y);
                var z = this.history;
                z.saveHistoryIfEdited()
            },
            onMouseUp: function(z) {
                try {
                    var y = this;
                    y.fireJobs(w.Ev.__CANVAS_PANEL_MOUSEUP, z);
                    setTimeout(function() {
                        var B = y.getProcessor().createGoogRange();
                        if (B) {
                            y.fireJobs(w.Ev.__CANVAS_PANEL_QUERY_STATUS, B)
                        }
                    }, 20)
                } catch (A) {}
            },
            mayAttachmentChanged: c,
            onClick: function(y) {
                this.fireJobs(w.Ev.__CANVAS_PANEL_CLICK, y)
            },
            onDoubleClick: function(y) {
                this.fireJobs(w.Ev.__CANVAS_PANEL_DBLCLICK, y)
            },
            onScroll: function(y) {
                this.fireJobs(w.Ev.__CANVAS_PANEL_SCROLLING, y)
            },
            onPaste: function(y) {
                this.fireJobs(w.Ev.__CANVAS_PANEL_PASTE, y)
            },
            triggerQueryStatus: function() {
                this.cancelReservedQueryStatusTrigger();
                this.reserveQueryStatusTrigger()
            },
            reserveQueryStatusTrigger: function() {
                var y = this;
                this.reservedQueryStatusTrigger = setTimeout(function() {
                    var z = y.getProcessor().createGoogRange();
                    if (z) {
                        y.fireJobs(w.Ev.__CANVAS_PANEL_QUERY_STATUS, z);
                        y.fireElements(y.getProcessor().getNode())
                    }
                }, 20)
            },
            cancelReservedQueryStatusTrigger: function() {
                if (this.reservedQueryStatusTrigger) {
                    clearTimeout(this.reservedQueryStatusTrigger)
                }
            },
            syncProperty: function() {
                this.triggerQueryStatus()
            }
        })
    })(g);
    g.module("bind canvas events for close external menus", function(x, y, z, w) {
        var e = function() {
            x.fireJobs(g.Ev.__SHOULD_CLOSE_MENUS)
        };
        w.observeJob(g.Ev.__CANVAS_PANEL_CLICK, e);
        w.observeJob(g.Ev.__CANVAS_SOURCE_PANEL_CLICK, e);
        w.observeJob(g.Ev.__CANVAS_TEXT_PANEL_CLICK, e)
    });
    g.module("make getter for 'iframeheight' and 'iframetop' size", function(x, y, z, w) {
        var A = 0;
        var e = 0;
        w.observeJob(g.Ev.__CANVAS_HEIGHT_CHANGE, function(B) {
            A = B.parsePx()
        });
        w.observeJob("canvas.apply.background", function() {
            var C = w.getPanel(g.Canvas.__WYSIWYG_MODE);
            var B = v.getPosition(C.el);
            e = B.y
        });
        w.reserveJob(g.Ev.__IFRAME_LOAD_COMPLETE, function() {
            var C = w.getPanel(g.Canvas.__WYSIWYG_MODE);
            A = C.getPanelHeight().parsePx();
            var B = v.getPosition(C.el);
            e = B.y
        }, 300);
        w.getIframeHeight = function() {
            return A
        };
        w.getIframeTop = function() {
            return e
        }
    });
    g.module("sync attachment data periodically", function(w, x, y, e) {
        setTimeout(function() {
            setInterval(function() {
                if (e.mayAttachmentChanged) {
                    e.fireJobs(g.Ev.__CANVAS_PANEL_DELETE_SOMETHING);
                    e.mayAttachmentChanged = c
                }
            }, 3000)
        }, 10000)
    });
    g.Canvas.BasedPanel = g.Class.draft({
        initialize: function(x, w) {
            this.config = w;
            this.canvas = x;
            this.elHolder = this.getHolder(w);
            this.el = this.getPanel(w);
            if (!this.el) {
                throw new Error("[Exception]Trex.Canvas.Panel : panel element is not founded")
            }
            var e = this.constructor.__MODE;
            this.getName = function() {
                return e
            };
            this.lastHeight = i
        },
        focus: function() {
            this.el.focus()
        },
        show: function() {
            try {
                t.show(this.elHolder)
            } catch (w) {}
        },
        hide: function() {
            try {
                t.hide(this.elHolder)
            } catch (w) {}
        },
        getStyle: function(e) {
            if (this.el.style[e]) {
                return this.el.style[e]
            } else {
                return i
            }
        },
        addStyle: function(w) {
            for (var e in w) {
                if (this.el.style[e]) {
                    this.el.style[e] = w[e]
                }
            }
        },
        getPosition: function() {
            return v.getPosition(this.el)
        },
        getPanelHeight: function() {
            return v.getHeight(this.el).toPx()
        },
        setPanelHeight: function(e) {
            e = e.toPx();
            if (this.lastHeight == e) {
                return
            }
            v.setHeight(this.el, e);
            this.lastHeight = e
        }
    });
    (function() {
        g.WysiwygIframeLoader = g.Class.create({
            initialize: function(D, C, B) {
                this.iframe = D;
                this.iframeUrl = C;
                this.doctype = "";
                switch (B) {
                    case "edge":
                    case "loose":
                    case "strict":
                        this.doctype = B
                }
            },
            load: function(C) {
                try {
                    this.loadLocalIframe(C, this.doctype)
                } catch (B) {
                    this.reloadUsingCatalyst(C)
                }
            },
            loadLocalIframe: function(D, B) {
                var C = this.iframe.contentWindow.document;
                C.open();
                switch (B) {
                    case "edge":
                        C.write(A);
                        break;
                    case "loose":
                        C.write(x);
                        break;
                    case "strict":
                        C.write(y);
                        break
                }
                C.write(e);
                C.close();
                setTimeout(function() {
                    D(C)
                }, 0)
            },
            reloadUsingCatalyst: function(G) {
                var C = this;
                h.__tx_wysiwyg_iframe_load_complete = function() {
                    C.loadLocalIframe(G, "")
                };
                if (!this.iframeUrl) {
                    try {
                        var F = EditorJSLoader.getPageBasePath("editor.js")
                    } catch (D) {
                        F = EditorJSLoader.getPageBasePath()
                    }
                    var B = this.doctype;
                    switch (B) {
                        case "edge":
                        case "loose":
                        case "strict":
                            this.iframeUrl = F + "trex/iframe_loader_catalyst_" + B + ".html";
                            break;
                        default:
                            this.iframeUrl = F + "trex/iframe_loader_catalyst.html"
                    }
                }
                var E = (document.location.hostname != document.domain);
                if (E) {
                    this.iframeUrl = this.iframeUrl + ((this.iframeUrl.indexOf("?") > -1) ? "&" : "?") + "xssDomain=" + document.domain
                }
                this.iframe.src = this.iframeUrl
            },
            loadRemoteIframe: function() {
                var B = this.el;
                B.setAttribute("src", this.canvasConfig.wysiwygUrl)
            }
        });

        function z(D) {
            var B = b.location;
            if (/^(https?:|file:|)\/\//.test(D)) {} else {
                if (D.indexOf("/") === 0) {
                    D = "//" + B.host + ":" + (B.port || "80") + D
                } else {
                    var C = B.href;
                    var E = C.lastIndexOf("/");
                    D = C.substring(0, E + 1) + D
                }
            }
            return D
        }
        var w = z(EditorJSLoader.getCSSBasePath());
        var A = "<!DOCTYPE html>";
        var x = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">';
        var y = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">';
        var e = '<html lang="ko"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>DaumEditor Wygiwyg Panel</title><script id="txScriptForEval"><\/script><link rel="stylesheet" href="' + w + 'content_view.css" type="text/css"></link><link rel="stylesheet" href="' + w + 'content_wysiwyg.css" type="text/css"></link><style id="txStyleForSetRule"></style></head><body class="tx-content-container">' + v.EMPTY_PARAGRAPH_HTML + "</body></html>"
    })();
    (function() {
        g.WebfontLoader = g.Class.create({
            initialize: function(w, e) {
                this.doc = w;
                this.styleCnt = 0;
                this.defWebfont = e.styles.fontFamily;
                this.useWebfont = (e.webfont && e.webfont.use);
                this.webfontCfg = e.webfont || [];
                this.elStyleSheet = this.getStyleSheet()
            },
            load: function(x) {
                if (!t.msie) {
                    return
                }
                if (!x) {
                    return
                }
                if (!this.useWebfont) {
                    return
                }
                var e = [];
                x += " // font-family:" + this.defWebfont;
                x.replace(/font-family\s*:\s*(\w*)/gi, function(z, y) {
                    e.push(y);
                    return z
                });
                if (e.length == 0) {
                    return
                }
                var w = this;
                setTimeout(function() {
                    var y = e.uniq().join("||");
                    w.webfontCfg.options.each(function(z) {
                        if (z.url && y.indexOf(z.data) > -1) {
                            w.imports(z)
                        }
                    })
                }, 10)
            },
            getUsed: function() {
                if (!t.msie) {
                    return []
                }
                var e = [];
                if (!this.useWebfont) {
                    return e
                }
                this.webfontCfg.options.each(function(w) {
                    if (!w.url) {
                        e.push(w.data)
                    }
                });
                return e
            },
            getStyleSheet: function() {
                return this.doc.styleSheets[this.styleCnt++]
            },
            imports: function(w) {
                try {
                    this.elStyleSheet.addImport(w.url, 2)
                } catch (x) {
                    this.elStyleSheet = this.getStyleSheet();
                    this.elStyleSheet.addImport(w.url, 2)
                }
                w.url = i
            }
        })
    })();
    (function() {
        var e = 16;
        g.WysiwygRelative = g.Class.create({
            initialize: function(w) {
                this.iframe = w
            },
            getRelative: function(x) {
                var D = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                var E = this.iframe.contentWindow.document;
                if (x) {
                    var C = v.getPosition(x, u);
                    var A = v.getHeight(this.iframe);
                    var w = v.getScrollTop(E);
                    if (C.y + C.height < w || C.y > w + A) {
                        return D
                    } else {
                        var B = 0;
                        var z = 0;
                        var F = v.getWidth(this.iframe);
                        var y = v.getScrollLeft(E);
                        D.x = B + ((y > 0) ? 0 : C.x);
                        D.width = Math.min(F - C.x - e, C.width - ((y > 0) ? y - C.x : 0));
                        D.height = C.height;
                        D.y = C.y - w + z
                    }
                }
                return D
            }
        })
    })();
    (function() {
        g.WysiwygEventBinder = g.Class.create({
            initialize: function(A, z, y) {
                this.win = A;
                this.doc = z;
                this.canvas = y
            },
            bindEvents: function() {
                this.translateDocumentEventToCanvas("keyup", "onKeyUp");
                this.translateDocumentEventToCanvas("keydown", "onKeyDown");
                this.translateDocumentEventToCanvas("mouseover", "onMouseOver");
                this.translateDocumentEventToCanvas("mouseout", "onMouseOut");
                this.translateDocumentEventToCanvas("click", "onClick");
                this.translateDocumentEventToCanvas("dblclick", "onDoubleClick");
                this.translateDocumentEventToCanvas("mousedown", "onMouseDown");
                this.translateDocumentEventToCanvas("mouseup", "onMouseUp");
                this.translateWindowEventToCanvas("scroll", "onScroll");
                this.translateBodyEventToCanvas("paste", "onPaste");
                this.triggerQueryStatusWhenTenConsecutiveKeyPressesDetected()
            },
            translateDocumentEventToCanvas: function(y, z) {
                this.translateEventToCanvas(this.doc, y, z)
            },
            translateWindowEventToCanvas: function(y, z) {
                this.translateEventToCanvas(this.win, y, z)
            },
            translateBodyEventToCanvas: function(y, z) {
                this.translateEventToCanvas(this.doc.body, y, z)
            },
            translateEventToCanvas: function(B, y, A) {
                var z = this.canvas;
                t.observe(B, y, function(C) {
                    z[A](C)
                }, c)
            },
            triggerQueryStatusWhenTenConsecutiveKeyPressesDetected: function() {
                var y = this.canvas;
                e(this.doc, function() {
                    y.triggerQueryStatus()
                })
            }
        });
        var e = function(y, z) {
            var B = 0,
                C = -1,
                A = "keydown";
            t.observe(y, A, function(E) {
                var D = E.keyCode;
                if (!x(D) && C !== D) {
                    if (B >= 9) {
                        z();
                        B = 0
                    } else {
                        B++
                    }
                    C = D
                }
            }, c)
        };
        var x = function(y) {
            return w.contains(y)
        };
        var w = new t.Set(8, 16, 17, 18, 32, 33, 34, 37, 38, 39, 40, 46, 229)
    })();
    (function() {
        g.Canvas.WysiwygPanel = g.Class.create({
            $extend: g.Canvas.BasedPanel,
            $const: {
                __MODE: g.Canvas.__WYSIWYG_MODE,
                EVENT_BINDING_DELAY: 500
            },
            initialize: function(A, B) {
                this.$super.initialize(A, B);
                this.canvasConfig = B;
                this.iframe = this.el;
                this.wysiwygWindow = this.iframe.contentWindow;
                this.onceWysiwygFocused = false;
                var z = this;
                var C = new g.WysiwygIframeLoader(this.iframe, B.wysiwygCatalystUrl, B.doctype);
                C.load(function(F) {
                    z.wysiwygDoc = F;
                    z.initializeSubModules(F);
                    installHyperscript(z.wysiwygWindow, z.wysiwygDoc);
                    z.makeEditable();
                    z.applyBodyStyles(z.canvasConfig.styles);
                    z.applyCustomCssText(z.canvasConfig.customCssText);
                    z.clearContent();
                    z.bindEvents(A);
                    Editor.__PANEL_LOADED = u;
                    t.observe(z.wysiwygWindow, "focus", function E() {
                        if (!z.onceWysiwygFocused) {
                            z.onceWysiwygFocused = true
                        }
                    });
                    if (t.msie_nonstd) {
                        var D = z.wysiwygDoc.getElementsByTagName("html");
                        if (D && D[0]) {
                            t.observe(D[0], "click", function(G) {
                                var H = t.element(G);
                                if (A.canHTML() && D[0] == H) {
                                    z.focus()
                                }
                            })
                        }
                    }
                    A.fireJobs(g.Ev.__IFRAME_LOAD_COMPLETE, F)
                })
            },
            initializeSubModules: function(A) {
                var z = this.wysiwygWindow;
                this.processor = new g.Canvas.ProcessorP(z, A);
                this.webfontLoader = new g.WebfontLoader(A, this.canvasConfig)
            },
            makeEditable: function() {
                if (this.canvasConfig.readonly) {
                    return
                }
                if (this.wysiwygDoc.body.contentEditable) {
                    this.wysiwygDoc.body.contentEditable = u
                } else {
                    var z = this;
                    setTimeout(function() {
                        try {
                            z.wysiwygDoc.designMode = "On";
                            if (t.gecko) {
                                z.wysiwygDoc.execCommand("enableInlineTableEditing", c, c)
                            }
                        } catch (A) {
                            z.designModeActivated = c
                        }
                    }, 10)
                }
            },
            getName: function() {
                return this.constructor.__MODE
            },
            getWindow: function() {
                return this.wysiwygWindow
            },
            getDocument: function() {
                return this.wysiwygDoc
            },
            getContent: function() {
                return this.wysiwygDoc.body.innerHTML
            },
            setContent: function(z) {
                z = this.doPreFilter(z);
                this.setBodyHTML(z);
                this.doPostFilter(this.wysiwygDoc.body)
            },
            doPreFilter: function(z) {
                if (z) {
                    z = y(z);
                    z = w(z)
                }
                return z
            },
            setBodyHTML: function(z) {
                this.wysiwygDoc.body.innerHTML = z || v.EMPTY_PARAGRAPH_HTML
            },
            doPostFilter: function(z) {
                x(z)
            },
            clearContent: function() {
                this.setContent("")
            },
            getScrollTop: function() {
                return v.getScrollTop(this.wysiwygDoc)
            },
            setScrollTop: function(z) {
                v.setScrollTop(this.wysiwygDoc, z)
            },
            getScrollLeft: function() {
                return v.getScrollLeft(this.wysiwygDoc)
            },
            getProcessor: function() {
                return this.processor
            },
            ifProcessorReady: function(z) {
                if (this.processor) {
                    z(this.processor)
                }
            },
            getStyle: function(z) {
                return t.getStyle(this.wysiwygDoc.body, z)
            },
            addStyle: function(z) {
                t.setStyleProperty(this.wysiwygDoc.body, z)
            },
            setBodyStyle: function(B, A) {
                var z = e(A);
                t.setStyleProperty(B.body, z)
            },
            setFontStyle: function(C, A) {
                var B = Object.extend(A, {
                    browser: t.browser,
                    pMarginZero: this.canvasConfig.pMarginZero ? "true" : "false"
                });
                var z = new Template(["#{if:pMarginZero=='true'}p { margin:0; padding:0; }#{/if:pMarginZero}", "body, td, button { color:#{color}; font-size:#{fontSize}; font-family:#{fontFamily}; line-height:#{lineHeight}; }", "a, a:hover, a:link, a:active, a:visited { color:#{color}; }", "div.txc-search-border { border-color:#{color}; }", "div.txc-search-opborder { border-color:#{color}; }", "img.tx-unresizable { width: auto !important; height: auto !important; }", "button a { text-decoration:none #{if:browser=='firefox'}!important#{/if:browser}; color:#{color} #{if:browser=='firefox'}!important#{/if:browser}; }"].join("\n")).evaluate(B);
                t.applyCSSText(C, z)
            },
            applyBodyStyles: function(z) {
                var B = this.wysiwygDoc;
                try {
                    this.setFontStyle(B, z);
                    this.setBodyStyle(B, z)
                } catch (A) {}
            },
            applyCustomCssText: function(z) {
                if (!z) {
                    return
                }
                var A = this.wysiwygDoc;
                try {
                    t.applyCSSText(A, z)
                } catch (B) {}
            },
            setRule: function(z, C) {
                var B, A, D;
                try {
                    B = this.wysiwygDoc.getElementById("txStyleForSetRule");
                    A = B.sheet ? B.sheet : B.styleSheet;
                    D = A.cssRules ? A.cssRules : A.rules;
                    if (A.insertRule) {
                        if (0 < D.length) {
                            A.deleteRule(0)
                        }
                        if (z) {
                            A.insertRule(z + "{" + C + "}", 0)
                        }
                    } else {
                        if (A.addRule) {
                            if (0 < D.length) {
                                A.removeRule(0)
                            }
                            if (z) {
                                A.addRule(z, C, 0)
                            }
                        }
                    }
                } catch (E) {}
            },
            bindEvents: function(z) {
                var A = new g.WysiwygEventBinder(this.wysiwygWindow, this.wysiwygDoc, z, this.processor);
                setTimeout(function() {
                    A.bindEvents()
                }, this.constructor.EVENT_BINDING_DELAY)
            },
            getPanel: function(z) {
                var A = z.initializedId || "";
                return $must("tx_canvas_wysiwyg" + A, "Trex.Canvas.WysiwygPanel")
            },
            getHolder: function(z) {
                var A = z.initializedId || "";
                return $must("tx_canvas_wysiwyg_holder" + A, "Trex.Canvas.WysiwygPanel")
            },
            focus: function() {
                this.ifProcessorReady(function(z) {
                    z.focus()
                })
            },
            ensureFocused: function() {
                if (!this.onceWysiwygFocused) {
                    this.onceWysiwygFocused = true;
                    this.focus()
                }
            },
            show: function() {
                this.$super.show();
                this.ifProcessorReady(function(z) {
                    setTimeout(function() {
                        try {
                            z.focusOnTop()
                        } catch (A) {}
                    }, 100)
                })
            },
            hide: function() {
                this.ifProcessorReady(function(z) {
                    z.blur()
                });
                this.$super.hide()
            },
            includeWebfontCss: function(z) {
                this.webfontLoader.load(z)
            },
            getUsedWebfont: function() {
                return this.webfontLoader.getUsed()
            },
            getPositionByNode: function(A) {
                var z = new g.WysiwygRelative(this.iframe);
                return z.getRelative(A)
            }
        });

        function e(C) {
            var z = ["color", "fontSize", "fontFamily", "lineHeight"];
            var A = Object.clone(C);
            for (var B = 0; B < z.length; B++) {
                delete A[z[B]]
            }
            return A
        }

        function y(z) {
            return z.replace(g.__WORD_JOINER_REGEXP, "")
        }

        function w(z) {
            if (t.msie) {
                z = z.replace(/(<script|<style)/i, g.__WORD_JOINER + "$1")
            }
            return z
        }

        function x(A) {
            if (t.msie_nonstd) {
                var D = v.collectAll(A, "p,li");
                for (var B = 0, z = D.length; B < z; B++) {
                    var C = D[B];
                    if (v.getLength(C) === 0 && C.tagName.toLowerCase() !== "p") {
                        try {
                            C.innerHTML = "&nbsp;"
                        } catch (E) {}
                    }
                    if (v.getLength(C) === 1 && C.innerHTML === "&nbsp;") {
                        C.innerHTML = ""
                    }
                }
            }
        }
    })();
    g.module("canvas set focus on mousedown event. only IE.", function(x, y, z, w, e) {
        if (!t.msie_std) {
            return
        }
        w.observeJob(g.Ev.__CANVAS_PANEL_MOUSEUP, function(B) {
            if (t.isLeftClick(B)) {
                var A = t.element(B).tagName;
                if (A.toLocaleLowerCase() == "html") {
                    w.focusOnBottom()
                }
            }
        })
    });
    g.Canvas.TextareaPanel = g.Class.create({
        $extend: g.Canvas.BasedPanel,
        initialize: function(w, e) {
            this.$super.initialize(w, e);
            var x = new g.Canvas.TextAreaProcessor(this.el);
            this.getProcessor = function() {
                return x
            };
            this.lastHeight = (this.lastHeight - 9 * 2).toPx();
            if (!!e.readonly) {
                this.setReadOnly()
            }
        },
        show: function() {
            this.$super.show();
            var w = this.elHolder;
            var e = this.getProcessor();
            setTimeout(function() {
                try {
                    e.focusOnTop()
                } catch (x) {}
                if (t.msie6) {
                    w.style.padding = "1px";
                    setTimeout(function() {
                        w.style.padding = "0px"
                    }, 0)
                }
            }, 100)
        },
        setContent: function(e) {
            this.el.value = e
        },
        getContent: function() {
            return this.el.value
        },
        getPanelHeight: function() {
            return (v.getHeight(this.el).parsePx() + 2).toPx()
        },
        setPanelHeight: function(e) {
            this.$super.setPanelHeight((e.parsePx() - 2).toPx())
        },
        setReadOnly: function() {
            this.el.readOnly = u
        }
    });
    g.Canvas.HtmlPanel = g.Class.create({
        $extend: g.Canvas.TextareaPanel,
        $const: {
            __MODE: g.Canvas.__HTML_MODE
        },
        initialize: function(w, e) {
            this.$super.initialize(w, e);
            this.bindEvents();
            if (t.msie_ver == "8") {
                this.el.setAttribute("style", "width: 500px; min-width: 100%; max-width: 100%;")
            }
            if (!e.styles.notApplyBgColorOnSourceMode) {
                if (e.styles.backgroundColor) {
                    t.setStyle(this.el, {
                        backgroundColor: e.styles.backgroundColor
                    })
                }
                if (e.styles.color) {
                    t.setStyle(this.el, {
                        color: e.styles.color
                    })
                }
            }
        },
        bindEvents: function() {
            var e = {
                keydown: function(x) {
                    this.canvas.fireJobs(g.Ev.__CANVAS_SOURCE_PANEL_KEYDOWN, x)
                },
                keyup: function() {
                    var x = this.canvas.getProcessor();
                    if (x && x.savePosition) {
                        x.savePosition()
                    }
                },
                mousedown: function(x) {
                    this.canvas.fireJobs(g.Ev.__CANVAS_SOURCE_PANEL_MOUSEDOWN, x)
                },
                mouseup: function() {
                    var x = this.canvas.getProcessor();
                    if (x && x.savePosition) {
                        x.savePosition()
                    }
                },
                click: function(x) {
                    this.canvas.fireJobs(g.Ev.__CANVAS_SOURCE_PANEL_CLICK, x)
                }
            };
            for (var w in e) {
                t.observe(this.el, w, e[w].bind(this), u)
            }
        },
        getPanel: function(e) {
            var w = ((e.initializedId) ? e.initializedId : "");
            return $must("tx_canvas_source" + w, "Trex.Canvas.HtmlPanel")
        },
        getHolder: function(e) {
            var w = ((e.initializedId) ? e.initializedId : "");
            return $must("tx_canvas_source_holder" + w, "Trex.Canvas.HtmlPanel")
        },
        setContent: function(w) {
            var e = new g.Validator();
            if (e.exists(w)) {
                this.$super.setContent(w)
            } else {
                this.$super.setContent("")
            }
        }
    });
    g.Canvas.TextPanel = g.Class.create({
        $extend: g.Canvas.TextareaPanel,
        $const: {
            __MODE: g.Canvas.__TEXT_MODE
        },
        initialize: function(w, e) {
            this.$super.initialize(w, e);
            this.bindEvents()
        },
        bindEvents: function() {
            var e = {
                keydown: function() {},
                keyup: function() {},
                mousedown: function() {},
                mouseup: function() {},
                click: function(x) {
                    this.canvas.fireJobs(g.Ev.__CANVAS_TEXT_PANEL_CLICK, x)
                }
            };
            for (var w in e) {
                t.observe(this.el, w, e[w].bind(this), u)
            }
        },
        getPanel: function(e) {
            var w = ((e.initializedId) ? e.initializedId : "");
            return $must("tx_canvas_text" + w, "Trex.Canvas.TextPanel")
        },
        getHolder: function(e) {
            var w = ((e.initializedId) ? e.initializedId : "");
            return $must("tx_canvas_text_holder" + w, "Trex.Canvas.TextPanel")
        }
    });
    g.module("interrupt enter key action @ text panel", function(w, y, z, e) {
        var x = e.config.newlinepolicy;
        var A = e.config.insertbr;
        if (x == "br" && A) {
            e.observeJob(g.Ev.__CANVAS_SOURCE_PANEL_KEYDOWN, function(B) {
                if (e.isWYSIWYG()) {
                    return
                }
                e.getProcessor().controlEnter(B)
            })
        }
    });
    g.I.Marker = {};
    g.I.Marker.Standard = {
        paste: function() {
            var e = this.processor.getRange();
            var B = e.endContainer;
            var z = e.startContainer;
            if (B.nodeType == 9) {
                B = this.processor.doc.body;
                z = this.processor.doc.body
            }
            var y = this.endMarker = this.processor.create("span", {
                id: "tx_end_marker"
            });
            var w = e.endOffset;
            if (B.nodeType == 3) {
                B.splitText(w);
                B.parentNode.insertBefore(y, B.nextSibling)
            } else {
                B.insertBefore(y, B.childNodes[w])
            }
            var A = this.startMarker = this.processor.create("span", {
                id: "tx_start_marker"
            });
            var x = e.startOffset;
            if (z.nodeType == 3) {
                z.splitText(x);
                z.parentNode.insertBefore(A, z.nextSibling)
            } else {
                z.insertBefore(A, z.childNodes[x])
            }
        },
        remove: function() {
            v.remove(this.startMarker);
            v.remove(this.endMarker)
        }
    };
    g.I.Marker.Trident = {
        paste: function() {
            this.clear();
            var w = this.processor.getRange();
            var e = this.processor.doc.body;
            var y = w.duplicate();
            y.collapse(u);
            y.pasteHTML('<span id="tx_start_marker"></span>');
            this.startMarker = v.collect(e, "#tx_start_marker");
            var x = w.duplicate();
            x.collapse(c);
            x.pasteHTML('<span id="tx_end_marker"></span>');
            this.endMarker = v.collect(e, "#tx_end_marker")
        },
        clear: function() {
            var e = this.processor.doc.body;
            v.remove(v.collect(e, "#tx_start_marker"));
            v.remove(v.collect(e, "#tx_end_marker"))
        },
        remove: function() {
            v.remove(this.startMarker);
            v.remove(this.endMarker)
        }
    };
    g.Canvas.Marker = g.Class.create({
        $mixins: [((t.msie_nonstd) ? g.I.Marker.Trident : g.I.Marker.Standard)],
        initialize: function(e) {
            this.processor = e
        },
        backup: function() {
            this.processor.bookmarkWithMarker(this)
        },
        checkCollapsed: function() {
            return (v.next(this.startMarker) == this.endMarker)
        }
    });
    g.I.Selection = {};
    g.I.Selection.Standard = {
        getSel: function() {
            return this.win.getSelection()
        },
        getText: function() {
            return this.getSel().toString()
        },
        getNode: function() {
            var e = this.getRange();
            if (e) {
                var w = e.startContainer;
                if (w.nodeType == 1) {
                    if (v.isBody(w)) {
                        return (w)
                    } else {
                        return (w.childNodes[e.startOffset])
                    }
                } else {
                    return (w.parentNode)
                }
            } else {
                return i
            }
        },
        createRange: function() {
            return this.doc.createRange()
        },
        createTextRange: function() {
            return this.doc.createRange()
        },
        getRange: function(x) {
            var w = this.getSel();
            if (w && w.rangeCount > 0) {
                if (x == i) {
                    if (w.rangeCount == 1) {
                        return w.getRangeAt(0)
                    } else {
                        return this.mergeRange(w)
                    }
                } else {
                    var e = w.getRangeAt(0);
                    e.collapse(x);
                    return e
                }
            } else {
                return this.doc.createRange()
            }
        },
        isCollapsed: function() {
            var e = this.getSel();
            return (e && e.isCollapsed)
        },
        collapse: function(w) {
            var x = this.getSel();
            if (x && x.rangeCount > 0) {
                var e = x.getRangeAt(0);
                e.collapse(w)
            }
        },
        getControl: function() {
            var w = this.getSel();
            var e;
            if (t.opera) {
                e = w.anchorNode.childNodes[w.anchorOffset];
                if (e == i) {
                    return i
                }
                if (w.isCollapsed && e.tagName != "IMG") {
                    return i
                }
            } else {
                if (w.isCollapsed) {
                    return i
                }
                e = w.anchorNode.childNodes[w.anchorOffset]
            }
            if (v.kindOf(e, "%control")) {
                return e
            } else {
                return i
            }
        },
        hasControl: function() {
            return (this.getControl() != i)
        },
        selectControl: function(w) {
            var e = this.createRange();
            e.selectNode(w);
            var x = this.getSel();
            x.removeAllRanges();
            x.addRange(e)
        },
        compareTextPos: function() {
            var e = this.getRange();
            if (e) {
                var w = e.startContainer;
                if (w.nodeType == 3) {
                    if (w.textContent.trim().length == 0) {
                        return v.__POSITION.__EMPTY_TEXT
                    } else {
                        if (e.startOffset == 0) {
                            return v.__POSITION.__START_OF_TEXT
                        } else {
                            if (e.startOffset == w.textContent.length) {
                                return v.__POSITION.__END_OF_TEXT
                            } else {
                                return v.__POSITION.__MIDDLE_OF_TEXT
                            }
                        }
                    }
                }
            }
            return v.__POSITION.__END_OF_TEXT
        },
        mergeRange: function(A) {
            try {
                var z = [];
                for (var y = 0, D = A.rangeCount; y < D; y++) {
                    z.push(A.getRangeAt(y))
                }
                A.removeAllRanges();
                var x = z[0].startContainer.childNodes[z[0].startOffset];
                var C = z[D - 1].endContainer.childNodes[z[D - 1].endOffset - 1];
                var w = this.doc.createRange();
                try {
                    w.setStart(x, 0)
                } catch (B) {
                    w.collapse(u)
                }
                try {
                    w.setEnd(C, C.childNodes.length)
                } catch (B) {}
                A.addRange(w);
                return A.getRangeAt(0)
            } catch (B) {
                return A.getRangeAt(0)
            }
        },
        setStart: function(w, x, z) {
            try {
                w.setStart(x, z)
            } catch (y) {
                w.collapse(u);
                w.setStart(x, z)
            }
        },
        setEnd: function(w, x, z) {
            try {
                w.setEnd(x, z)
            } catch (y) {
                w.collapse(c);
                w.setEnd(x, z)
            }
        },
        selectRange: function(e) {
            var w = this.getSel();
            w.removeAllRanges();
            w.addRange(e)
        }
    };
    g.I.Selection.Trident = {
        getSel: function() {
            return this.doc.selection
        },
        getText: function() {
            return this.getSel().createRange().text
        },
        getNode: function() {
            var w = this.getSel();
            var e = w.type.toLowerCase();
            if (e === "control") {
                return (w.createRange().item(0))
            } else {
                return (w.createRange().parentElement())
            }
        },
        createRange: function() {
            var e = this.getSel();
            return e.createRange()
        },
        createTextRange: function() {
            return this.doc.body.createTextRange()
        },
        getRange: function(y) {
            var x = this.getSel();
            var w = x.type.toLowerCase();
            if (w == "none") {
                return x.createRange() ? x.createRange() : function() {
                    var z = this.doc.body.createTextRange();
                    z.collapse(u);
                    z.select();
                    return z
                }()
            }
            if (y == i) {
                return x.createRange()
            } else {
                if (w === "text") {
                    var e = x.createRange();
                    e.collapse(y);
                    e.select();
                    return x.createRange()
                } else {
                    if (w === "control") {
                        x.empty()
                    }
                    return x.createRange()
                }
            }
        },
        isCollapsed: function() {
            var x = this.getSel();
            var w = x.type.toLowerCase();
            if (w === "none") {
                return u
            } else {
                if (w === "control") {
                    return u
                } else {
                    if (w === "text") {
                        var e = x.createRange();
                        return e.compareEndPoints("StartToEnd", e) == 0
                    } else {
                        return u
                    }
                }
            }
        },
        collapse: function(x) {
            var y = this.getSel();
            var w = y.type.toLowerCase();
            if (w === "text") {
                var e = y.createRange();
                e.collapse(x);
                e.select();
                return y.createRange()
            } else {
                if (w === "control") {
                    y.empty()
                }
                return y.createRange()
            }
        },
        getControl: function() {
            var x = this.getSel();
            var e = x.type.toLowerCase();
            if (e === "control") {
                var w = x.createRange().item(0);
                if (v.kindOf(w, "%control")) {
                    return w
                } else {
                    return i
                }
            } else {
                return i
            }
        },
        hasControl: function() {
            var w = this.getSel();
            var e = w.type.toLowerCase();
            if (e === "control") {
                return u
            } else {
                return c
            }
        },
        selectControl: function(w) {
            var e = this.doc.body.createControlRange();
            e.add(w);
            e.select()
        },
        compareTextPos: function() {
            var x = this.getSel();
            var w = x.type.toLowerCase();
            if (w === "none") {
                var e = x.createRange();
                var y = e.duplicate();
                y.moveToElementText(e.parentElement());
                if (y.text.trim().replace(g.__WORD_JOINER_REGEXP, "").length == 0) {
                    return v.__POSITION.__EMPTY_TEXT
                } else {
                    if (e.compareEndPoints("StartToStart", y) == 0) {
                        return v.__POSITION.__START_OF_TEXT
                    } else {
                        if (e.compareEndPoints("EndToEnd", y) == 0) {
                            return v.__POSITION.__END_OF_TEXT
                        } else {
                            return v.__POSITION.__MIDDLE_OF_TEXT
                        }
                    }
                }
            }
            return v.__POSITION.__END_OF_TEXT
        },
        transTextRange: function(e, z, A, x) {
            var y = this.createTextRange();
            var w = this.win.span(g.__WORD_JOINER);
            v.insertAt(w, z);
            y.moveToElementText(w);
            v.remove(w);
            y.collapse(u);
            y.moveStart("character", A);
            if (x) {
                e.setEndPoint("StartToStart", y)
            } else {
                e.setEndPoint("EndToEnd", y)
            }
            return e
        },
        setStart: function(w, x, z) {
            try {
                this.transTextRange(w, x, z, u)
            } catch (y) {}
            return w
        },
        setEnd: function(w, x, z) {
            try {
                this.transTextRange(w, x, z, c)
            } catch (y) {}
            return w
        },
        selectRange: function(e) {
            e.select()
        }
    };
    g.I.Selection.TridentStandard = {
        getControl: function() {
            var y = this.getSel();
            if (y.isCollapsed) {
                return null
            }
            if (v.isElement(y.anchorNode)) {
                var x = y.anchorNode.childNodes[y.anchorOffset];
                if (v.kindOf(x, "%control")) {
                    return x
                } else {
                    return null
                }
            }
            var w = v.previous(y.focusNode);
            var e = v.next(y.anchorNode);
            if (w == e) {
                return v.first(w, "%control")
            } else {
                return null
            }
        },
        selectControl: function(w) {
            var e = this.createRange();
            e.selectNode(w);
            var x = this.getSel();
            x.removeAllRanges();
            x.addRange(e)
        }
    };
    g.I.Selection.Gecko = {};
    g.I.Selection.Webkit = {
        getControl: function() {
            var y = this.getSel();
            if (y.isCollapsed) {
                return i
            }
            if (v.isElement(y.anchorNode)) {
                var x = y.anchorNode.childNodes[y.anchorOffset];
                if (v.kindOf(x, "%control")) {
                    return x
                } else {
                    return i
                }
            }
            var w = v.previous(y.focusNode);
            var e = v.next(y.anchorNode);
            if (w == e) {
                return v.first(w, "%control")
            } else {
                return i
            }
        },
        selectControl: function(w) {
            var e = this.createRange();
            e.selectNode(w);
            var x = this.getSel();
            x.removeAllRanges();
            x.addRange(e)
        }
    };
    g.I.Selection.Presto = {};
    g.Canvas.Selection = g.Class.create({
        $mixins: [g.I.Selection.Standard, ((t.msie_nonstd) ? g.I.Selection.Trident : {}), ((t.msie_std) ? g.I.Selection.TridentStandard : {}), ((t.gecko) ? g.I.Selection.Gecko : {}), ((t.webkit) ? g.I.Selection.Webkit : {}), ((t.presto) ? g.I.Selection.Presto : {})],
        initialize: function(e) {
            this.processor = e;
            this.win = e.win;
            this.doc = e.doc
        }
    });
    g.Canvas.Bookmark = g.Class.create({
        startContainer: i,
        startOffset: 0,
        endContainer: i,
        endOffset: 0,
        initialize: function(e) {
            this.processor = e;
            this.win = e.win;
            this.doc = e.doc;
            this.dummy = function() {
                return e.newDummy()
            }
        },
        collapse: function(e) {
            if (e) {
                this.updateEnd(this.startContainer, this.startOffset)
            } else {
                this.updateStart(this.endContainer, this.endOffset)
            }
        },
        save: function(e) {
            this.updateStart(e.startContainer, e.startOffset);
            this.updateEnd(e.endContainer, e.endOffset)
        },
        saveAroundNode: function(e) {
            this.updateStartBefore(v.top(e));
            this.updateEndAfter(v.bottom(e))
        },
        saveIntoFirst: function(w) {
            var e = v.top(w);
            this.updateEndBefore(e);
            this.collapse(c)
        },
        saveIntoLast: function(w) {
            var e = v.bottom(w);
            this.updateEndBefore(e);
            this.collapse(c)
        },
        savePreviousTo: function(w) {
            if (v.previous(w)) {
                var e = v.top(v.previous(w));
                this.updateEndAfter(e)
            } else {
                this.updateEndBefore(w)
            }
            this.collapse(c)
        },
        saveNextTo: function(w) {
            if (v.next(w)) {
                var e = v.top(v.next(w));
                this.updateEndBefore(e)
            } else {
                this.updateEndAfter(w)
            }
            this.collapse(c)
        },
        saveWithMarker: function(e) {
            if (e.checkCollapsed()) {
                this.updateEndAfter(e.endMarker);
                this.collapse(c)
            } else {
                this.updateStartBefore(e.startMarker);
                this.updateEndAfter(e.endMarker)
            }
        },
        select: function(y) {
            if (this.isValid()) {
                var w = y.createTextRange();
                try {
                    y.setStart(w, this.startContainer, this.startOffset);
                    y.setEnd(w, this.endContainer, this.endOffset)
                } catch (x) {}
                y.selectRange(w)
            }
            this.reset()
        },
        isValid: function() {
            return this.isValidStartContainer() && this.isValidEndContainer()
        },
        isValidStartContainer: function() {
            return this.doc.body === v.body(this.startContainer)
        },
        isValidEndContainer: function() {
            return this.doc.body === v.body(this.endContainer)
        },
        updateStart: function(e, w) {
            this.startContainer = e;
            this.startOffset = w
        },
        updateStartBefore: function(w) {
            var e = this.dummy();
            v.insertAt(e, w);
            this.startContainer = e;
            this.startOffset = 0
        },
        updateStartAfter: function(w) {
            var e = this.dummy();
            v.insertNext(e, w);
            this.startContainer = e;
            this.startOffset = 0
        },
        updateEnd: function(e, w) {
            this.endContainer = e;
            this.endOffset = w
        },
        updateEndBefore: function(w) {
            var e = this.dummy();
            if (w.nodeName && w.nodeName.toUpperCase() == "P" && !w.nodeValue) {
                v.append(w, e)
            } else {
                v.insertAt(e, w)
            }
            this.endContainer = e;
            this.endOffset = e.length
        },
        updateEndAfter: function(w) {
            var e = this.dummy();
            v.insertNext(e, w);
            this.endContainer = e;
            this.endOffset = e.length
        },
        reset: function() {
            this.startContainer = i;
            this.startOffset = 0;
            this.endContainer = i;
            this.endOffset = 0
        }
    });
    g.Canvas.TextAreaProcessor = g.Class.create({
        $mixins: [],
        initialize: function(e) {
            this.el = e
        },
        focus: function() {
            this.el.focus()
        },
        focusOnTop: function() {
            var e = this.el;
            if (e.createTextRange) {
                var w = e.createTextRange();
                w.collapse(u);
                w.moveStart("character", 0);
                w.moveEnd("character", 0);
                w.select()
            } else {
                if (e.setSelectionRange) {
                    e.select();
                    e.setSelectionRange(0, 0)
                } else {
                    e.focus()
                }
            }
        },
        blur: function() {
            h.focus()
        },
        savePosition: function() {},
        controlEnter: function() {
            var e = this;
            e.insertTag("<br/>", "")
        },
        insertTag: function(e, w) {
            this.pasteContent(e + w);
            return u
        },
        pasteContent: function(e) {
            this.el.value += e
        }
    });
    g.I.Processor = {};
    g.I.Processor.Standard = {
        txSelection: i,
        isRangeInsideWysiwyg: c,
        lastRange: i,
        initialize: function(w, e) {
            this.win = w;
            this.doc = e;
            this.txSelection = new g.Canvas.Selection(this);
            this.bookmark = new g.Canvas.Bookmark(this)
        },
        getTxSel: function() {
            return this.txSelection
        },
        getSel: function() {
            return this.txSelection.getSel()
        },
        getRange: function() {
            return this.txSelection.getRange()
        },
        getBookmark: function() {
            return this.bookmark
        },
        isCollapsed: function() {
            return this.txSelection.isCollapsed()
        },
        getNode: function() {
            return this.txSelection.getNode()
        },
        getControl: function() {
            return this.txSelection.getControl()
        },
        hasControl: function() {
            return this.txSelection.hasControl()
        },
        selectControl: function(e) {
            return this.txSelection.selectControl(e)
        },
        getText: function() {
            return this.txSelection.getText()
        },
        compareTextPos: function() {
            return this.txSelection.compareTextPos()
        },
        findNode: function(w) {
            try {
                return v.find(this.getNode(), w)
            } catch (x) {
                return i
            }
        },
        queryStyle: function(x, w) {
            if (!x) {
                return i
            }
            w = ((w == "float") ? ((x.style.styleFloat === q) ? "cssFloat" : "styleFloat") : w);
            if (x.style && x.style[w]) {
                return x.style[w]
            } else {
                if (x.currentStyle && x.currentStyle[w]) {
                    return x.currentStyle[w]
                } else {
                    if (h.getComputedStyle) {
                        var y = x;
                        while (v.isText(y)) {
                            y = y.parentNode
                        }
                        var e = this.doc.defaultView.getComputedStyle(y, i);
                        return ((e) ? e[w] : i)
                    }
                }
            }
            return i
        },
        queryAttr: function(w, e) {
            if (!w) {
                return i
            }
            return v.getAttribute(w, e)
        },
        queryCommandState: function(x) {
            try {
                return this.doc.queryCommandState(x)
            } catch (w) {
                return c
            }
        },
        queryCommandValue: function(x) {
            try {
                return this.doc.queryCommandValue(x)
            } catch (w) {
                return ""
            }
        },
        execCommand: function(y, w) {
            if (t.gecko) {
                try {
                    this.doc.execCommand("styleWithCSS", c, c)
                } catch (x) {}
            }
            try {
                this.doc.execCommand(y, c, w)
            } catch (x) {}
        },
        execWithMarker: function(x) {
            var w = new g.Canvas.Marker(this);
            this.bookmarkTo();
            try {
                w.paste();
                w.backup();
                x(w)
            } catch (y) {} finally {
                w.remove()
            }
        },
        focus: function() {
            this.doc.body.focus()
        },
        blur: function() {
            h.focus()
        },
        focusOnTop: function() {
            this.focus();
            this.selectFirstText(this.doc.body);
            this.doc.body.scrollTop = 0
        },
        selectFirstText: function(w) {
            var x = v.top(w);
            var e = this.createGoogRangeFromNodes(x, 0, x, 0);
            e.select()
        },
        focusOnBottom: function() {
            this.focus();
            this.moveCaretTo(this.doc.body, c);
            this.doc.body.scrollTop = this.doc.body.scrollHeight
        },
        moveCaretTo: function(w, e) {
            if (!w) {
                return
            }
            this.bookmarkInto(w, e);
            this.bookmark.select(this.txSelection)
        },
        moveCaretWith: function(w) {
            if (!w) {
                return
            }
            var e = this.findNode(w);
            if (e) {
                this.bookmark.saveNextTo(e);
                this.bookmark.select(this.txSelection)
            }
        },
        selectAround: function(e) {
            if (!e) {
                return
            }
            this.bookmark.saveAroundNode(e);
            this.bookmark.select(this.txSelection)
        },
        bookmarkInto: function(w, e) {
            if (!w) {
                return
            }
            e = (e == i) ? u : e;
            if (e) {
                this.bookmark.saveIntoFirst(w)
            } else {
                this.bookmark.saveIntoLast(w)
            }
        },
        bookmarkToPrevious: function(e) {
            if (!e) {
                return
            }
            this.bookmark.savePreviousTo(e)
        },
        bookmarkToNext: function(e) {
            if (!e) {
                return
            }
            this.bookmark.saveNextTo(e)
        },
        bookmarkTo: function(e) {
            e = e || this.txSelection.getRange();
            this.bookmark.save({
                startContainer: e.startContainer,
                startOffset: e.startOffset,
                endContainer: e.endContainer,
                endOffset: e.endOffset
            })
        },
        bookmarkWithMarker: function(e) {
            this.bookmark.saveWithMarker(e)
        },
        restore: function() {
            this.bookmark.select(this.txSelection)
        },
        create: function() {
            var x = arguments[0];
            var z = this.newNode(x);
            for (var y = 1; y < arguments.length; y++) {
                var e = arguments[y];
                if (e.nodeType) {
                    v.append(z, e)
                } else {
                    if (typeof(e) == "string" || typeof(e) == "number") {
                        z.innerHTML += e
                    } else {
                        if (typeof(e) == "array") {
                            for (var w = 0; w < e.length; w++) {
                                v.append(z, e[w])
                            }
                        } else {
                            v.applyAttributes(z, e)
                        }
                    }
                }
            }
            return z
        },
        pasteNode: function(A, z, C) {
            if (!A) {
                return
            }
            if (!A.length) {
                A = [].concat(A)
            }
            this.txSelection.collapse(c);
            if (z) {
                var y, w, e;
                var B = this;
                this.execWithMarker(function(D) {
                    e = v.divideParagraph(D.endMarker);
                    var E = v.kindOf(e, "p,li,dd,dt,h1,h2,h3,h4,h5,h6");
                    if (E) {
                        y = v.previous(e);
                        w = v.clone(e)
                    } else {
                        e = B.newNode("p");
                        v.insertAt(e, D.endMarker);
                        w = B.newNode("p")
                    }
                    v.insertAt(w, e);
                    A.each(function(F) {
                        v.append(w, F)
                    });
                    if (C) {
                        v.applyAttributes(w, C)
                    }
                });
                if (y) {
                    if (!v.hasData(y)) {
                        this.stuffNode(y)
                    }
                }
                this.stuffNode(e);
                this.bookmark.saveIntoFirst(e)
            } else {
                var x = this;
                this.executeUsingCaret(function(E, H) {
                    var F = H.getCaret(c),
                        D = H.getCaret(c);
                    var G = t.msie_nonstd ? F : i;
                    A.each(function(I) {
                        E.insertNode(I, G)
                    });
                    if (D && D.nextSibling) {
                        x.moveCaretTo(D.nextSibling, 0)
                    }
                })
            }
            return A[0]
        },
        pasteContent: function(x, w, z) {
            var e = this.create("div");
            e.innerHTML = x;
            var y = v.children(e);
            return this.pasteNode(y, w, z)
        },
        replace: function(x, e, w) {
            this.bookmark.saveAroundNode(x);
            return v.replace(x, this.create(e, w))
        },
        blocks: function(x) {
            var z = [];
            var y = x();
            if (this.hasControl()) {
                var w = this.getControl();
                if (v.kindOf(w.parentNode, y)) {
                    z.push(w.parentNode)
                }
            } else {
                var e = this;
                this.execWithMarker(function(A) {
                    var C = e.getBlockRangeIterator(y, A.startMarker, A.endMarker);
                    var B;
                    while (C.hasNext()) {
                        B = C.next();
                        if (v.kindOf(B, "#tx_start_marker,#tx_end_marker")) {} else {
                            z.push(B)
                        }
                    }
                })
            }
            return z
        },
        inlines: function(y) {
            var B = [];
            var z = y();
            var x = this;
            var A = function() {
                return x.create(v.inlineOf())
            };
            if (this.hasControl()) {
                var w = this.getControl();
                if (v.kindOf(w, z)) {
                    B.push(w)
                } else {
                    var e = A();
                    v.insertNext(e, w);
                    v.append(e, w)
                }
            } else {
                this.execWithMarker(function(D) {
                    if (D.checkCollapsed()) {
                        var C = A();
                        v.append(C, x.newDummy());
                        v.insertNext(C, D.startMarker);
                        x.bookmarkTo({
                            startContainer: C,
                            startOffset: 1,
                            endContainer: C,
                            endOffset: 1
                        });
                        B.push(C)
                    } else {
                        var F = x.getInlineRangeIterator(z, D.startMarker, D.endMarker);
                        var E;
                        while (F.hasNext()) {
                            E = F.next();
                            if (v.kindOf(E, "#tx_start_marker,#tx_end_marker")) {} else {
                                if (v.kindOf(E, "br")) {} else {
                                    B.push(E)
                                }
                            }
                        }
                    }
                })
            }
            return B
        },
        controls: function(e) {
            var w = [];
            if (this.hasControl()) {
                if (v.kindOf(this.getControl(), e())) {
                    w.push(this.getControl())
                }
            }
            return w
        },
        addDummyNbsp: function() {},
        apply: function(w, e) {
            if (!w) {
                return i
            }
            if (!w.length) {
                w = [].concat(w)
            }
            w.each(function(x) {
                v.applyAttributes(x, e)
            });
            return w
        },
        wrap: function(x, e, w) {
            if (!x) {
                return i
            }
            if (!x.length) {
                x = [].concat(x)
            }
            w = w || {};
            return v.wrap(this.create(e, w), x)
        },
        unwrap: function(e) {
            if (!e) {
                return i
            }
            this.bookmark.saveAroundNode(e);
            return v.unwrap(e)
        },
        createGoogRange: function() {
            return d.dom.Range.createFromWindow(this.win)
        },
        createGoogRangeFromNodes: function(y, w, e, x) {
            return d.dom.Range.createFromNodes(y, w, e, x)
        },
        executeUsingCaret: function(w) {
            try {
                var e = this.createGoogRange();
                var x = e.saveUsingCarets();
                return w(e, x)
            } finally {
                if (!x.isDisposed()) {
                    x.restore()
                }
            }
        }
    };
    g.module("observe that @when control elements are focused at", function(w, x, y, e) {
        if (t.webkit || t.presto) {
            e.observeJob(g.Ev.__CANVAS_PANEL_MOUSEDOWN, function(B) {
                var A = e.getProcessor();
                var z = t.element(B);
                if (v.kindOf(z, "img,hr,iframe,table")) {
                    var C = v.find(z, "button");
                    if (C) {
                        A.selectControl(C)
                    } else {
                        A.selectControl(z)
                    }
                } else {
                    if (v.kindOf(z, "button")) {
                        A.selectControl(z)
                    }
                }
            })
        }
    });
    g.module("bind iframe activate or deactivate event", function(w, x, y, e) {
        e.observeJob(g.Ev.__IFRAME_LOAD_COMPLETE, function(z) {
            var A = e.getProcessor(g.Canvas.__WYSIWYG_MODE);
            t.observe(z, "beforedeactivate", function(B) {
                A.isRangeInsideWysiwyg = true;
                A.lastRange = A.getRange()
            });
            t.observe(z, "deactivate", function(B) {
                if (A.hasControl()) {
                    return
                }
                A.isRangeInsideWysiwyg = false
            });
            t.observe(z, "activate", function() {
                A.isRangeInsideWysiwyg = true;
                A.lastRange = i
            })
        })
    });
    g.I.Processor.Trident = {
        stuffNode: function(e) {
            if (v.getLength(e) == 0) {
                e.innerHTML = "&nbsp;"
            }
            return e
        },
        controlEnterByParagraph: function() {
            var w = this.findNode("div");
            var e;
            if (!w) {
                throw $propagate
            }
            var x = this.findNode("%paragraph");
            if (v.kindOf(x, "p")) {
                if (v.first(w, "p") == x) {
                    this.execWithMarker(function(y) {
                        e = v.divideParagraph(y.endMarker)
                    });
                    this.stuffNode(x);
                    this.stuffNode(e);
                    this.moveCaretTo(e)
                } else {
                    throw $propagate
                }
            } else {
                if (v.kindOf(x, "li,td,th,dd,dt")) {
                    throw $propagate
                } else {
                    e = this.newParagraph("p");
                    this.execWithMarker(function(y) {
                        v.insertNext(e, y.endMarker)
                    });
                    this.moveCaretTo(e)
                }
            }
        }
    };
    g.module("delete image element @when backspace key event fires", function(w, x, y, e) {
        if (t.msie_nonstd) {
            e.observeKey({
                ctrlKey: c,
                altKey: c,
                shiftKey: c,
                keyCode: g.__KEY.BACKSPACE
            }, function() {
                var A = e.getProcessor();
                if (A.hasControl() && A.getControl()) {
                    try {
                        var z = A.getControl();
                        v.remove(z)
                    } catch (B) {}
                    throw $stop
                }
                throw $propagate
            })
        }
    });
    g.module("delete table element @when backspace key event fires", function(w, x, y, e) {
        if (t.msie_nonstd) {
            var z;
            e.observeKey({
                ctrlKey: c,
                altKey: c,
                shiftKey: c,
                keyCode: g.__KEY.BACKSPACE
            }, function() {
                var B = e.getProcessor();
                var A = B.getRange();
                try {
                    if (z == A.boundingLeft) {
                        var D = v.previous(B.getNode());
                        if (v.kindOf(D, "table")) {
                            v.remove(D)
                        }
                    }
                } catch (C) {}
                z = A.boundingLeft;
                throw $propagate
            })
        }
    });
    Object.extend(g.I.Processor.Trident, {
        restoreRange: function() {
            if (!this.isRangeInsideWysiwyg && this.lastRange) {
                try {
                    this.lastRange.select()
                } catch (z) {
                    var y = this.getSel();
                    var x = y.type.toLowerCase();
                    if (x === "control") {
                        y.empty();
                        var w = y.createRange();
                        w.collapse(c);
                        w.select()
                    }
                } finally {
                    this.lastRange = i
                }
            }
        }
    });
    g.I.Processor.TridentStandard = {
        stuffNode: function(e) {
            return v.stuff(e, this.newNode("br"))
        },
        controlEnterByParagraph: function(e) {
            throw $propagate
        },
        controlEnterByLinebreak: function(y) {
            var x = this;
            var w = this.getRange(false);
            var A = w.endContainer.parentNode;
            if (A && (A.tagName == "P" || A.tagName == "DIV" || A.tagName == "BODY" || A.tagName == "BLOCKQUOTE")) {
                if (A.tagName == "BLOCKQUOTE" || t.hasClassName(A, "txc-textbox") || t.hasClassName(A, "txc-moreless")) {
                    t.stop(y);
                    var e = x.win.br();
                    w.insertNode(e);
                    w.selectNode(e);
                    w.collapse(false);
                    e = x.win.br();
                    w.insertNode(e);
                    w.selectNode(e);
                    w.collapse(false);
                    var w = x.getRange(false);
                    w.selectNodeContents(e.nextSibling);
                    var z = x.getSel();
                    z.removeAllRanges();
                    z.addRange(w);
                    z.collapseToStart()
                }
            }
        },
        queryCommandState: function(z) {
            var w = this.getRange();
            if (this.hasControl() && w.collapsed === c && w.endOffset - w.startOffset === 1) {
                if (z === "bold" || z === "underline" || z === "italic" || z === "strikethrough") {
                    var x = this.getControl();
                    if (x.tagName === "IMG" || x.tagName === "BUTTON") {
                        return c
                    }
                }
            }
            try {
                return this.doc.queryCommandState(z)
            } catch (y) {
                return c
            }
        },
        addDummyNbsp: function(e) {
            var w;
            if (e.length === 1) {
                w = e[0];
                if (w.tagName.toLowerCase() === "span" && w.childNodes.length === 1 && w.firstChild.nodeType === 3 && w.firstChild.data === "") {
                    w.firstChild.data = "\u00A0"
                }
            }
        }
    };
    Object.extend(g.I.Processor.TridentStandard, {
        restoreRange: function() {
            if (!this.isRangeInsideWysiwyg && this.lastRange) {
                var e = this.getSel();
                e.removeAllRanges();
                e.addRange(this.lastRange)
            }
        }
    });
    g.I.Processor.Gecko = {
        stuffNode: function(e) {
            return v.stuff(e, this.newNode("br"))
        },
        controlEnterByParagraph: function() {
            throw $propagate
        }
    };
    g.I.Processor.Webkit = {
        stuffNode: function(e) {
            return v.stuff(e, this.newNode("br"))
        },
        controlEnterByParagraph: function() {
            throw $propagate
        },
        findParagraph: function(x) {
            var e = function(y) {
                return v.kindOf(y, "div,p,blockquote")
            };
            var w = function(y) {
                return v.kindOf(y, "body,li,%tablegroup")
            };
            return v.findAncestor(x, e, w)
        },
        findAncestorListItem: function(x) {
            var e = function(y) {
                return v.kindOf(y, "li")
            };
            var w = function(y) {
                return v.kindOf(y, "body,%tablegroup")
            };
            return v.findAncestor(x, e, w)
        },
        divideListItem: function(e) {
            var x, w = this;
            w.execWithMarker(function(y) {
                x = v.divideTree(e, y.endMarker)
            });
            if (!v.hasUsefulChildren(e, u)) {
                e.innerHTML = ""
            }
            if (!v.hasUsefulChildren(x, u)) {
                x.innerHTML = ""
            }
            w.stuffNode(e);
            w.stuffNode(x);
            w.moveCaretTo(x)
        },
        queryCommandState: function(z) {
            var w = this.getRange();
            if (this.hasControl() && w.collapsed === c && w.endOffset - w.startOffset === 1) {
                if (z === "bold" || z === "underline" || z === "italic" || z === "strikethrough") {
                    var x = this.getControl();
                    if (x.tagName === "IMG" || x.tagName === "BUTTON") {
                        return c
                    }
                }
            }
            try {
                return this.doc.queryCommandState(z)
            } catch (y) {
                return c
            }
        },
        addDummyNbsp: function(e) {
            var w;
            if (e.length === 1) {
                w = e[0];
                if (w.tagName.toLowerCase() === "span" && w.childNodes.length === 1 && w.firstChild.nodeType === 3 && w.firstChild.data === "") {
                    w.firstChild.data = "\u00A0"
                }
            }
        }
    };
    g.I.Processor.Presto = {
        stuffNode: function(e) {
            return v.stuff(e, this.newNode("br"))
        },
        controlEnterByParagraph: function(e) {
            throw $propagate
        }
    };
    g.I.Processor.StandardP = {
        putBogusParagraph: function() {
            var x = this.doc.body;
            var w = v.last(x);
            if (w && v.kindOf(w, "p")) {
                return
            }
            var e = this.newParagraph("p");
            if (v.kindOf(w, "br")) {
                v.replace(w, e)
            } else {
                v.append(x, e)
            }
        }
    };
    g.module("put bogus paragraph @when any key event fires", function(w, x, y, e) {
        if (t.msie_nonstd) {
            return
        }
        if (e.config.newlinepolicy == "p") {
            e.reserveJob(g.Ev.__CANVAS_PANEL_KEYUP, function() {
                if (!e.isWYSIWYG()) {
                    return
                }
                var z = e.getProcessor();
                z.putBogusParagraph()
            }, 10)
        }
    });
    g.module("interrupt enter key action @ wysiwyg panel", function(w, x, z, e) {
        var y = p.get("canvas");
        if (y.newlinepolicy != "p") {
            return
        }
        e.observeKey({
            ctrlKey: c,
            altKey: c,
            shiftKey: c,
            keyCode: g.__KEY.ENTER
        }, function(B) {
            if (!e.isWYSIWYG()) {
                return
            }
            var A = e.getProcessor();
            try {
                A.getTxSel().collapse(c);
                A.controlEnterByParagraph(B)
            } catch (C) {
                if (C == $propagate) {
                    throw C
                }
            }
        })
    });
    g.I.Processor.TridentP = {};
    g.I.Processor.TridentStandardP = {};
    g.I.Processor.GeckoP = {};
    g.I.Processor.WebkitP = {};
    g.I.Processor.PrestoP = {};
    (function() {
        var e = g.Class.create({
            initialize: function(y, x, z, w) {
                this.processor = y;
                this.start = z;
                this.end = w || this.start;
                this.current = this.start;
                this.wTranslator = v.translate(x).extract("%wrapper");
                this.pTranslator = v.translate(x).extract("%paragraph")
            },
            hasNext: function() {
                return !!this.current
            },
            next: function() {
                var x = this.current;
                x = this.find(x);
                var w = x;
                if (v.include(x, this.end)) {
                    w = i
                } else {
                    while (w && !v.next(w)) {
                        w = v.parent(w);
                        if (v.isBody(w)) {
                            w = i
                        }
                    }
                    if (w) {
                        w = v.next(w)
                    }
                }
                if (w == this.end) {
                    w = i
                }
                this.current = w;
                return x
            },
            find: function(A) {
                var y;
                var z = A;
                if (!v.hasContent(z)) {
                    return z
                }
                while (z) {
                    y = z;
                    if (v.isBody(z)) {
                        break
                    }
                    if (v.kindOf(z, this.wTranslator.getExpression())) {
                        return z
                    }
                    if (v.kindOf(z, "%wrapper,%outergroup")) {
                        z = v.descendant(y, this.pTranslator.getExpression());
                        if (z) {
                            return z
                        }
                        z = v.descendant(y, "%paragraph");
                        if (z) {
                            y = z;
                            break
                        }
                    }
                    if (v.kindOf(z, this.pTranslator.getExpression())) {
                        return z
                    }
                    if (z.nextSibling && z.nodeType == 3) {
                        z = z.nextSibling
                    } else {
                        z = z.parentNode
                    }
                }
                var x = v.paragraphOf(v.getName(y));
                var B = this.processor.newNode(x);
                var w = v.extract(y, A, "%text,%inline,img,object,embed,hr");
                v.wrap(B, w);
                this.processor.stuffNode(B);
                return B
            }
        });
        Object.extend(g.I.Processor.Standard, {
            getBlockRangeIterator: function(x, y, w) {
                return new e(this, x, y, w)
            }
        })
    })();
    (function() {
        var e = g.Class.create({
            initialize: function(y, x, z, w) {
                this.processor = y;
                this.start = z;
                this.end = w || this.start;
                this.current = this.start;
                this.iTranslator = v.translate(x).extract("%inline")
            },
            hasNext: function() {
                return !!this.current
            },
            next: function() {
                var x = this.current;
                x = this.find(x);
                var w = x;
                if (x == this.end) {
                    w = i
                } else {
                    while (w && !v.next(w)) {
                        w = v.parent(w);
                        if (v.isBody(w)) {
                            w = i
                        }
                    }
                    if (w) {
                        w = v.next(w)
                    }
                }
                if (v.include(w, this.end)) {
                    w = v.top(w, u)
                }
                this.current = w;
                return x
            },
            find: function(A) {
                var z = A;
                if (v.kindOf(z, "%paragraph,%outergroup,%block") || v.isBody(z)) {
                    var y = z;
                    z = v.top(y, u);
                    if (!z) {
                        var x = v.inlineOf();
                        var w = this.processor.create(x);
                        v.append(y, w);
                        return w
                    }
                }
                if (v.kindOf(z, "br")) {
                    return z
                } else {
                    if (!v.hasContent(z)) {
                        return z
                    }
                }
                if (v.kindOf(z, this.iTranslator.getExpression())) {
                    return z
                }
                var x = v.inlineOf();
                var w = this.processor.create(x);
                v.insertAt(w, z);
                if (z) {
                    v.append(w, z)
                }
                return w
            }
        });
        Object.extend(g.I.Processor.Standard, {
            getInlineRangeIterator: function(x, y, w) {
                return new e(this, x, y, w)
            }
        })
    })();
    (function() {
        var e = i;
        var w = {};
        var x = {};
        Object.extend(g.I.Processor.Standard, {
            newNode: function(y) {
                if (e != this.doc) {
                    w = {};
                    e = this.doc
                }
                if (!w[y]) {
                    w[y] = this.win[y]()
                }
                return v.clone(w[y], c)
            },
            newText: function(y) {
                return this.doc.createTextNode(y)
            },
            newParagraph: function(y) {
                if (e != this.doc) {
                    x = {};
                    e = this.doc
                }
                if (!x[y]) {
                    x[y] = this.stuffNode(this.newNode(y))
                }
                return v.clone(x[y], u)
            }
        })
    })();
    (function() {
        var e = i;
        var w = i;
        var y = c;
        var x = [];
        Object.extend(g.I.Processor.Standard, {
            newDummy: function(z) {
                if (e != this.doc) {
                    w = i;
                    x = [];
                    e = this.doc
                }
                if (!w) {
                    w = this.doc.createTextNode(g.__WORD_JOINER)
                }
                var A = v.clone(w);
                if (!z) {
                    x.push(A);
                    y = u
                }
                return A
            },
            clearDummy: function() {
                if (!y) {
                    return
                }
                var B, D;
                try {
                    B = this.createGoogRange();
                    D = B && B.getStartNode()
                } catch (A) {}
                var G = i;
                for (var E = 0, z = x.length - 1; E < z; E++) {
                    try {
                        var C = x.shift();
                        if (C && C.nodeValue) {
                            if (C.nodeValue == g.__WORD_JOINER) {
                                if (D != C) {
                                    v.remove(C)
                                } else {
                                    G = C
                                }
                            } else {
                                C.nodeValue = C.nodeValue.replace(g.__WORD_JOINER_REGEXP, "")
                            }
                        } else {}
                    } catch (F) {}
                }
                G && x.splice(0, 0, G);
                y = c
            }
        })
    })();
    g.Canvas.Processor = g.Class.draft({
        $mixins: [g.I.Processor.Standard, ((t.msie_nonstd) ? g.I.Processor.Trident : {}), ((t.msie_std) ? g.I.Processor.TridentStandard : {}), ((t.gecko) ? g.I.Processor.Gecko : {}), ((t.webkit) ? g.I.Processor.Webkit : {}), ((t.presto) ? g.I.Processor.Presto : {})]
    });
    g.Canvas.ProcessorP = g.Class.create({
        $extend: g.Canvas.Processor,
        $mixins: [g.I.Processor.StandardP, ((t.msie_nonstd) ? g.I.Processor.TridentP : {}), ((t.msie_std) ? g.I.Processor.TridentStandardP : {}), ((t.gecko) ? g.I.Processor.GeckoP : {}), ((t.webkit) ? g.I.Processor.WebkitP : {}), ((t.presto) ? g.I.Processor.PrestoP : {})]
    });
    g.register("filter > mode change", function(E, F, e, y, A) {
        function x(J) {
            var K = [
                [g.__WORD_JOINER_REGEXP, ""],
                [new RegExp("<(\\/?[a-z]+)[^>]*>", "gi"), "<$1>"],
                [new RegExp("\\n\\s*", "g"), ""],
                [new RegExp("<head>.*?<\\/head>", "gi"), ""],
                [new RegExp("<script>.*?<\\/script>", "gi"), ""],
                [new RegExp("<style>.*?<\\/style>", "gi"), ""],
                [new RegExp("<!--.*?-->", "gi"), ""],
                [new RegExp("<span></span>", "gi"), ""],
                [new RegExp("^<p>&nbsp;</p>$", "gi"), ""],
                [new RegExp("^<p><br></p>$", "gi"), ""],
                [new RegExp("<td>(.+?)<\\/td>", "gi"), "\t$1"],
                [new RegExp("<th>(.+?)<\\/th>", "gi"), " \t$1"],
                [new RegExp("<\\/tr>", "gi"), ""],
                [new RegExp("<tr>", "gi"), "\n"],
                [new RegExp("<\\?tbody>", "gi"), ""],
                [new RegExp("<div>([^<]*)<\\/div>", "gi"), "\n$1"],
                [new RegExp("<p>&nbsp;</p>", "gi"), "\n"],
                [new RegExp("<p><br></p>", "gi"), "\n"],
                [new RegExp("<br>(<\\/p>)", "gi"), "$1"],
                [new RegExp("<h[1-6]>(.+?)<\\/h[1-6]>", "gi"), "\n$1\n\n"],
                [new RegExp("(<p>(.+?)<\\/p>)", "gi"), "$1\n"],
                [new RegExp("<br>\\n", "gi"), "\n"],
                [new RegExp("<br>", "gi"), "\n"],
                [new RegExp("(<ul>|<\\/ul>|<ol>|<\\/ol>|<\\/table>)", "gi"), "\n\n"],
                [new RegExp("(<li>(.+?)<\\/li>)", "gi"), "\t$1\n"],
                [new RegExp("<div><\\/div>\n", "gi"), "~"],
                [new RegExp("<[\\/a-zA-Z!]+>", "g"), ""],
                [new RegExp("&nbsp;?", "g"), " "],
                [new RegExp("&quot;?", "g"), '"'],
                [new RegExp("&gt;?", "g"), ">"],
                [new RegExp("&lt;?", "g"), "<"],
                [new RegExp("&amp;?", "g"), "&"],
                [new RegExp("&copy;?", "g"), "(c)"],
                [new RegExp("&trade;?", "g"), "(tm)"],
                [new RegExp("&#8220;?", "g"), '"'],
                [new RegExp("&#8221;?", "g"), '"'],
                [new RegExp("&#8211;?", "g"), "_"],
                [new RegExp("&#8217;?", "g"), "'"],
                [new RegExp("&#38;?", "g"), "&"],
                [new RegExp("&#169;?", "g"), "(c)"],
                [new RegExp("&#8482;?", "g"), "(tm)"],
                [new RegExp("&#151;?", "g"), "--"],
                [new RegExp("&#039;?", "g"), "'"],
                [new RegExp("&#147;?", "g"), '"'],
                [new RegExp("&#148;?", "g"), '"'],
                [new RegExp("&#149;?", "g"), "*"],
                [new RegExp("&reg;?", "g"), "(R]"],
                [new RegExp("&bull;?", "g"), "*"]
            ];
            var I = J;
            for (var H = 0; H < K.length; H++) {
                I = I.replace(K[H][0], K[H][1])
            }
            return I
        }

        function C(H) {
            try {
                return H.replace(new RegExp("<br[^>]*>\\n", "gi"), "\n")
            } catch (I) {}
            return H
        }

        function B(H) {
            if (H !== i && H.length !== 0) {
                H = H.replace(/&/g, "&amp;");
                H = H.replace(/ /g, "&nbsp;");
                H = H.replace(/\"/g, "&quot;");
                H = H.replace(/>/g, "&gt;");
                H = H.replace(/</g, "&lt;");
                if (H.lastIndexOf("\n") === H.length - 1) {
                    H = H.substr(0, H.length - 1)
                }
                if (H.lastIndexOf("\r") === H.length - 1) {
                    H = H.substr(0, H.length - 1)
                }
                H = H.replace(/\r\n|\r|\n/g, "<br>\n")
            }
            return H
        }

        function z(H) {
            return H.replace(/<\/(p)><(p[\s>])/gi, "</$1>\n<$2")
        }

        function G(H) {
            return H.replace(/<\/(p)>\n+<(p[\s>])/gi, "</$1><$2")
        }

        function D(K) {
            if (!(t.msie && t.msie_docmode < 9)) {
                return K
            }
            if (!y.isWYSIWYG()) {
                return K
            }
            var J = y.getCurrentPanel().getWindow().location,
                I = J.protocol + "//" + J.host,
                H = J.href,
                M = H.substring(0, H.lastIndexOf("/") + 1),
                L = new RegExp("(href=[\"'])(" + I.getRegExp() + "[^\"']*)([\"'])", "gi");
            return K.replace(L, function(O, P, Q, R) {
                var N = Q.replace(H, "").replace(M, "").replace(I, "");
                return P + N + R
            })
        }
        var w = E.getDocParser();
        w.registerFilter("filter/converting", {
            "text@load": function(H) {
                return x(H)
            },
            "source@load": function(H) {
                return H
            },
            "html@load": function(H) {
                return H
            },
            text4save: function(I) {
                var H;
                if (A.canvas.escapeTextModeContents) {
                    H = B(I)
                } else {
                    H = I
                }
                if (A.canvas.removeTextModeBr) {
                    H = C(H)
                }
                return H
            },
            source4save: function(H) {
                return H
            },
            html4save: function(H) {
                return D(H)
            },
            text2source: function(H) {
                return B(H)
            },
            text2html: function(H) {
                return B(H)
            },
            source2text: function(H) {
                return x(G(H))
            },
            source2html: function(H) {
                return G(H)
            },
            html2text: function(H) {
                return x(H)
            },
            html2source: function(H) {
                return D(z(H))
            }
        })
    });
    g.register("filter > non-breaking space", function(x) {
        function e(y) {
            return y.replace(/\u00A0/g, " ")
        }
        var w = x.getDocParser();
        w.registerFilter("filter/converting/nonbreakingsapce", {
            "text@load": function(y) {
                return e(y)
            },
            "source@load": function(y) {
                return e(y)
            },
            "html@load": function(y) {
                return e(y)
            },
            text4save: function(y) {
                return e(y)
            },
            source4save: function(y) {
                return e(y)
            },
            html4save: function(y) {
                return e(y)
            },
            text2html: function(y) {
                return e(y)
            },
            source2html: function(y) {
                return e(y)
            },
            html2source: function(y) {
                return e(y)
            }
        })
    });
    g.register("filter > clear redundancy", function(x) {
        function e(D) {
            var C = function(J, H, E) {
                var G = 0;
                var F = function(K, L, M) {
                    G++;
                    if (M.length == 0 || M.trim().length == 0) {
                        return ""
                    } else {
                        return ['<span style="', H, ":", L, ';">', M, "</span>"].join("")
                    }
                };
                var I = new RegExp('(?:<span[^>;]*style="' + H + ':[^";]*;?"[^>;]*>){' + E + "}<span\\s*style=['\"]?" + H + ":\\s*(\\w+)[;'\"]*>([\\S\\s]*?)</span>(?:</span>){" + E + "}", "gi");
                do {
                    G = 0;
                    J = J.replace(I, F)
                } while (G > 0);
                return J
            };
            D = D.replace(/<(span|font)([^>]*)><\/\1>/gi, function(G, E, F) {
                if (/ (?:id|class)=/i.test(F)) {
                    return G
                }
                return ""
            });
            var B = ["font-size", "font-family"];
            for (var A = 0; A < B.length; A++) {
                D = C(D, B[A], 2);
                D = C(D, B[A], 1)
            }
            return D
        }

        function y(A) {
            return t.msie ? A.replace(/<p>\s*<\/p>/gi, "") : A
        }

        function z(A) {
            return t.msie ? A.replace(/<p>\s*<\/p>/gi, v.EMPTY_PARAGRAPH_HTML) : A
        }
        var w = x.getDocParser();
        w.registerFilter("filter/redundancy", {
            "text@load": function(A) {
                return A
            },
            "source@load": function(A) {
                return y(e(A))
            },
            "html@load": function(A) {
                return y(e(A))
            },
            text4save: function(A) {
                return A
            },
            source4save: function(A) {
                return z(A)
            },
            html4save: function(A) {
                return z(A)
            },
            text2source: function(A) {
                return A
            },
            text2html: function(A) {
                return A
            },
            source2text: function(A) {
                return A
            },
            source2html: function(A) {
                return A
            },
            html2text: function(A) {
                return A
            },
            html2source: function(A) {
                return e(A)
            }
        })
    });
    j.addMsg({
        "@attacher.only.wysiwyg.alert": "\uc5d0\ub514\ud130 \uc0c1\ud0dc\uc5d0\uc11c\ub9cc \ubcf8\ubb38\uc5d0 \uc0bd\uc785\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.\n\uc5d0\ub514\ud130\ubaa8\ub4dc\uc5d0\uc11c \ucca8\ubd80\ubc15\uc2a4\uc758 \uc378\ub124\uc77c\uc744 \ud074\ub9ad\ud574\uc11c \uc0bd\uc785\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
    });
    g.Attachment = g.Class.draft({
        $extend: g.Entry,
        isChecked: c,
        focused: c,
        attrs: {
            align: "left"
        },
        initialize: function(e, w) {
            this.actor = e;
            this.canvas = e.canvas;
            this.entryBox = e.entryBox;
            this.type = this.constructor.__Identity;
            this.setProperties(w);
            if (this.oninitialized) {
                this.oninitialized(e, w)
            }
        },
        setFocused: function(e) {
            if (this.focused !== e) {
                this.focused = e
            }
        },
        setExistStage: function(e) {
            this.existStage = e;
            if (this.entryBox.changeState) {
                this.entryBox.changeState(this)
            }
        },
        remove: function() {
            var e = this.canvas.getContent();
            if (this.canvas.isWYSIWYG()) {
                if (e.search(this.regHtml) > -1) {
                    e = e.replace(this.regHtml, "");
                    this.canvas.setContent(e)
                }
            } else {
                if (e.search(this.regText) > -1) {
                    e = e.replace(this.regText, "");
                    this.canvas.setContent(e)
                }
            }
        },
        register: function() {
            if (Editor.getSidebar().addOnlyBox) {
                return
            }
            var x = this.actor;
            if (x.boxonly) {
                return
            }
            if (this.canvas.isWYSIWYG()) {
                var z = this.pastescope;
                var A = this.dispHtml;
                var y = "img";
                var w = A.match(/<(\w+)/);
                if (w && w[1]) {
                    y = w[1]
                }
                if (this.objectStyle) {
                    var B = new RegExp("<" + y + " ", "i");
                    A = A.replace(B, "<" + y + ' style="' + g.Util.toStyleString(this.objectStyle) + '" ')
                }
                if (this.objectAttr) {
                    A = A.replace(B, "<" + y + " " + g.Util.toAttrString(this.objectAttr) + " ")
                }
                var e = this.paragraphStyle || {};
                if (t.webkit) {
                    this.canvas.getPanel("html").el.focus()
                }
                this.canvas.execute(function(C) {
                    C.moveCaretWith(z);
                    C.pasteContent(A, u, {
                        style: e
                    })
                })
            } else {
                if (this.actor.wysiwygonly) {
                    alert(TXMSG("@attacher.only.wysiwyg.alert"))
                } else {
                    this.canvas.getProcessor().insertTag("", this.dispText)
                }
            }
        },
        replace: function(y) {
            var x = this.canvas;
            var w = x.getContent();
            var e = this.actor;
            if (!e.boxonly) {
                if (x.isWYSIWYG()) {
                    if (w.search(y.regHtml) > -1) {
                        w = w.replace(y.regHtml, this.dispHtml);
                        x.setContent(w)
                    } else {
                        x.pasteContent(this.dispHtml, u)
                    }
                } else {
                    if (w.search(y.regText) > -1) {
                        w = w.replace(y.regText, "");
                        x.setContent(w)
                    }
                    alert(TXMSG("@attacher.only.wysiwyg.alert"))
                }
            }
        },
        setProperties: function(w) {
            var e = w;
            this.data = e;
            this.key = this.actor.getKey(e) || "K" + g.Util.generateKey();
            this.field = this.getFieldAttr(e);
            this.boxAttr = this.getBoxAttr(e);
            this.objectAttr = this.getObjectAttr.bind(this)(e);
            this.objectStyle = this.getObjectStyle.bind(this)(e);
            this.paragraphStyle = this.getParaStyle.bind(this)(e);
            this.saveHtml = this.getSaveHtml.bind(this)(e);
            this.dispHtml = this.getDispHtml.bind(this)(e);
            this.dispText = this.getDispText.bind(this)(e);
            this.regLoad = this.getRegLoad.bind(this)(e);
            this.regHtml = this.getRegHtml.bind(this)(e);
            this.regText = this.getRegText.bind(this)(e)
        },
        refreshProperties: function() {
            this.setProperties(this.data)
        },
        getObjectAttr: function() {
            return this.actor.config.objattr
        },
        getObjectStyle: function() {
            var e = {};
            if (this.actor.config.objstyle) {
                e = Object.extend(e, this.actor.config.objstyle)
            }
            return e
        },
        getParaStyle: function(e) {
            var w = Object.extend({}, this.actor.config.parastyle || this.actor.config.defaultstyle);
            return w
        }
    });
    p.addSidebar("attachbox", {
        show: c,
        destroy: c
    });
    g.AttachBox = g.Class.create({
        $extend: g.EntryBox,
        isChecked: c,
        initialize: function() {},
        checkAvailableCapacity: function() {
            return u
        },
        getAvailableCapacity: function() {
            return u
        },
        checkInsertableSize: function() {
            return u
        }
    });
    g.install("editor.getAttachBox & sidebar.getAttachments", function(y, z, A, x, w) {
        var e = new g.AttachBox(w, y);
        A.entryboxRegistry.attachbox = e;
        y.getAttachBox = function() {
            return e
        };
        A.getAttachments = e.getEntries.bind(e)
    });
    g.register("filter > attachers", function(x) {
        var e = x.getAttachBox();
        var w = x.getDocParser();
        w.registerFilter("filter/attachments", {
            "text@load": function(z) {
                var y = e.datalist;
                y.each(function(A) {
                    if (A.loadDataByContent) {
                        A.loadDataByContent("text@load", z)
                    }
                    z = A.getChangedContent(z, A.regLoad, "")
                });
                return z
            },
            "source@load": function(z) {
                var y = e.datalist;
                y.each(function(A) {
                    if (A.loadDataByContent) {
                        A.loadDataByContent("source@load", z)
                    }
                    z = A.getChangedContent(z, A.regLoad, A.dispText)
                });
                return z
            },
            "html@load": function(z) {
                var y = e.datalist;
                y.each(function(A) {
                    if (A.loadDataByContent) {
                        A.loadDataByContent("html@load", z)
                    }
                    z = A.getChangedContent(z, A.regLoad, A.dispHtml)
                });
                return z
            },
            text4save: function(z) {
                var y = e.datalist;
                y.each(function(A) {
                    if (A.loadDataByContent) {
                        A.loadDataByContent("text4save", z)
                    }
                    z = A.getChangedContent(z, A.regText, "")
                });
                return z
            },
            source4save: function(z) {
                var y = e.datalist;
                y.each(function(A) {
                    if (A.loadDataByContent) {
                        A.loadDataByContent("source4save", z)
                    }
                    z = A.getChangedContent(z, A.regText, A.saveHtml, ["id", "class"])
                });
                return z
            },
            html4save: function(z) {
                var y = e.datalist;
                y.each(function(A) {
                    if (A.loadDataByContent) {
                        A.loadDataByContent("html4save", z)
                    }
                    z = A.getChangedContent(z, A.regHtml, A.saveHtml, ["id", "class"])
                });
                return z
            },
            text2source: function(y) {
                return y
            },
            text2html: function(y) {
                return y
            },
            source2text: function(z) {
                var y = e.datalist;
                y.each(function(A) {
                    if (A.loadDataByContent) {
                        A.loadDataByContent("source2text", z)
                    }
                    z = A.getChangedContent(z, A.regText, "")
                });
                return z
            },
            source2html: function(z) {
                var y = e.datalist;
                y.each(function(A) {
                    if (A.loadDataByContent) {
                        A.loadDataByContent("source2html", z)
                    }
                    z = A.getChangedContent(z, A.regText, A.dispHtml)
                });
                return z
            },
            html2text: function(z) {
                var y = e.datalist;
                y.each(function(A) {
                    if (A.loadDataByContent) {
                        A.loadDataByContent("html2text", z)
                    }
                    z = A.getChangedContent(z, A.regHtml, "")
                });
                return z
            },
            html2source: function(z) {
                var y = e.datalist;
                y.each(function(A) {
                    if (A.loadDataByContent) {
                        A.loadDataByContent("html2source", z)
                    }
                    z = A.getChangedContent(z, A.regHtml, A.dispText, ["id", "class"])
                });
                return z
            }
        })
    });
    g.module("push history @when entrybox has changes", function(x, y, z, w) {
        var e = x.getAttachBox();
        e.observeJob(g.Ev.__ENTRYBOX_ENTRY_REMOVED, function(B) {
            w.history.saveHistory({
                deleted: c
            }, {
                deleted: u
            }, function(C) {
                B.deletedMark = C.deleted;
                e.fireJobs(g.Ev.__ENTRYBOX_ENTRY_REFRESH, B)
            })
        });
        var A = function(B) {
            if (t.msie) {
                setTimeout(function() {
                    B()
                }, 0)
            } else {
                B()
            }
        };
        e.observeJob(g.Ev.__ENTRYBOX_ENTRY_ADDED, function(B) {
            A(function() {
                w.history.injectHistory({
                    deleted: u
                }, {
                    deleted: c
                }, function(C) {
                    B.deletedMark = C.deleted;
                    e.fireJobs(g.Ev.__ENTRYBOX_ENTRY_REFRESH, B)
                })
            })
        })
    });
    j.addMsg({
        "@attacher.ins": "\uc0bd\uc785",
        "@attacher.del": "\uc0ad\uc81c",
        "@attacher.preview.image": "#iconpath/pn_preview.gif",
        "@attacher.delete.confirm": "\uc0ad\uc81c\ud558\uc2dc\uba74 \ubcf8\ubb38\uc5d0\uc11c\ub3c4 \uc0ad\uc81c\ub429\ub2c8\ub2e4. \uacc4\uc18d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",
        "@attacher.delete.all.confirm": "\ubaa8\ub4e0 \ucca8\ubd80 \ud30c\uc77c\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c? \uc0ad\uc81c\ud558\uc2dc\uba74 \ubcf8\ubb38\uc5d0\uc11c\ub3c4 \uc0ad\uc81c\ub429\ub2c8\ub2e4.",
        "@attacher.exist.alert": "\uc774\ubbf8 \ubcf8\ubb38\uc5d0 \uc0bd\uc785\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4."
    });
    g.install("attachbox.onAttachBoxInitialized @if config.sidebar.attachbox.show = true", function(y, z, A, x, w) {
        var e = y.getAttachBox();
        if (w.sidebar.attachbox.show == u) {
            Object.extend(e, g.I.AttachBox);
            e.onAttachBoxInitialized(w, x, y)
        }
    });
    g.I.AttachBox = {
        useBox: u,
        isDisplay: c,
        lastSelectedEntry: i,
        onAttachBoxInitialized: function(A, z) {
            var E = this;
            this.canvas = z;
            var B = ((A.initializedId) ? A.initializedId : "");
            this.elBox = $must("tx_attach_div" + B, "Trex.I.AttachBox");
            this.elList = $must("tx_attach_list" + B, "Trex.I.AttachBox");
            var F = $must("tx_attach_preview" + B, "Trex.I.AttachBox");
            this.elPreviewKind = v.collect(F, "p");
            var w = v.collect(F, "img");
            this.elPreviewImg = w;
            this.imageResizer = new g.ImageResizer(w, {
                maxWidth: 147,
                maxHeight: 108,
                defImgUrl: TXMSG("@attacher.preview.image"),
                onComplete: function(H, G) {
                    w.style.marginTop = Math.floor((108 - G) / 2).toPx()
                }
            });
            this.elDelete = v.collect("#tx_attach_delete" + B + " a");
            t.observe(this.elDelete, "click", function() {
                if (A.sidebar.attachbox.confirmForDeleteAll) {
                    E.onDeleteAll(false)
                } else {
                    E.onDeleteAll(true)
                }
            });
            if (typeof showAttachBox == "function") {
                this.observeJob(g.Ev.__ATTACHBOX_SHOW, function() {
                    showAttachBox()
                })
            }
            if (typeof hideAttachBox == "function") {
                this.observeJob(g.Ev.__ATTACHBOX_HIDE, function() {
                    hideAttachBox()
                })
            }
            var e = $must("tx_upload_progress" + B, "Trex.I.AttachBox");
            this.elProgress = e;
            this.elProgressPercent = v.collect(e, "div");
            this.elProgressTicker = v.collect(e, "p");
            this.observeJob(g.Ev.__ENTRYBOX_ENTRY_ADDED, function(G) {
                E.registerEntryNode(G);
                E.displayBox()
            });
            this.observeJob(g.Ev.__ENTRYBOX_ENTRY_MODIFIED, function(G) {
                E.modifyEntryNode(G);
                E.refreshPreview()
            });
            this.observeJob(g.Ev.__ENTRYBOX_ENTRY_REMOVED, function(G) {
                E.removeEntryNode(G);
                E.displayBox();
                if (E.lastSelectedEntry && E.lastSelectedEntry.key == G.key) {
                    E.refreshPreview()
                }
            });
            this.observeJob(g.Ev.__ENTRYBOX_ALL_ENTRY_REMOVED, function() {
                E.datalist.each(function(G) {
                    E.removeEntryNode(G, u)
                });
                E.displayBox();
                if (E.lastSelectedEntry) {
                    E.refreshPreview()
                }
            });
            this.observeJob(g.Ev.__ENTRYBOX_ENTRY_REFRESH, function(G) {
                E.displayBox();
                E.refreshEntryNode(G)
            });
            var C = t("tx_attach_up_size" + B),
                D = t("tx_attach_max_size" + B),
                y = t("tx_attach_group_used_size" + B),
                x = t("tx_attach_group_max_size" + B);
            this.observeJob(g.Ev.__ENTRYBOX_CAPACITY_UPDATE, function() {
                var G = A.sidebar.capacity;
                if (G.show == c) {
                    return
                }
                if (C) {
                    C.innerText = G.uploaded.toByteUnit()
                }
                if (D) {
                    D.innerText = G.available.toByteUnit()
                }
                if (G.group) {
                    if (y) {
                        y.innerText = (G.group.used + G.uploaded).toByteUnit()
                    }
                    if (x) {
                        x.innerText = G.group.maximum.toByteUnit()
                    }
                }
            })
        },
        onDeleteAll: function(e) {
            if (this.datalist.length === 0) {
                return
            }
            if (!e && !confirm(TXMSG("@attacher.delete.all.confirm"))) {
                return
            }
            this.datalist.each(function(w) {
                if (w.deletedMark == c) {
                    w.execRemove()
                }
            });
            this.initPreviewImage()
        },
        checkDisplay: function() {
            return this.isDisplay
        },
        setDisplay: function(e) {
            this.isDisplay = e
        },
        displayBox: function() {
            var e = c;
            for (var w = 0; w < this.datalist.length; w++) {
                if (this.datalist[w].deletedMark == c) {
                    e = u
                }
            }
            if (this.isDisplay == e) {
                return
            }
            if (e) {
                t.show(this.elBox);
                this.fireJobs(g.Ev.__ATTACHBOX_SHOW, u)
            } else {
                t.hide(this.elBox);
                this.fireJobs(g.Ev.__ATTACHBOX_HIDE, c)
            }
            this.isDisplay = e
        },
        registerEntryNode: function(y) {
            var A = tx.li({
                className: "type-" + y.type
            });
            if (y.actor.boxonly) {
                t.addClassName(A, "tx-boxonly")
            }
            this.elList.appendChild(A);
            y.elData = A;
            y.makeSelection = function(C) {
                if (C) {
                    this.showEntryThumb(y)
                } else {
                    this.hideEntryThumb(y)
                }
            }.bind(this);
            t.observe(A, "mouseover", this.onEntryMouseOver.bind(this, y));
            t.observe(A, "mouseout", this.onEntryMouseOut.bind(this, y));
            var z = tx.dl();
            A.appendChild(z);
            var w = tx.dt({
                className: "tx-name",
                unselectable: "on"
            }, y.boxAttr.name);
            y.elName = w;
            z.appendChild(w);
            t.observe(A, "click", function(C) {
                var D = t.element(C);
                if (D.className == "tx-delete" || D.className == "tx-insert") {
                    return
                }
                if (C.ctrlKey) {
                    this.clickEntryWithCtrl(y)
                } else {
                    if (C.shiftKey) {
                        this.clickEntryWithShift(y)
                    } else {
                        this.clickEntry(y)
                    }
                }
                if (y.actor.name == "image") {
                    if (!y.data.width || !y.data.height) {
                        new g.ImageScale(y.data)
                    }
                }
            }.bind(this), c);
            var x = tx.dd({
                className: "tx-button"
            });
            z.appendChild(x);
            var e = tx.a({
                className: "tx-delete"
            }, TXMSG("@attacher.del"));
            x.appendChild(e);
            t.observe(e, "click", function() {
                if (!confirm(TXMSG("@attacher.delete.confirm"))) {
                    return
                }
                y.execRemove()
            }, c);
            var B = tx.a({
                className: "tx-insert"
            }, TXMSG("@attacher.ins"));
            y.elInsert = B;
            x.appendChild(B);
            t.observe(B, "click", function() {
                if (y.existStage && !y.actor.config.multipleuse) {
                    alert(TXMSG("@attacher.exist.alert"))
                } else {
                    y.execAppend()
                }
            }, c)
        },
        changeState: function(w) {
            var e = w.existStage;
            if (e && !w.actor.config.multipleuse) {
                t.addClassName(w.elData, "tx-existed")
            } else {
                t.removeClassName(w.elData, "tx-existed")
            }
        },
        modifyEntryNode: function(e) {
            e.elName.innerText = e.boxAttr.name
        },
        removeEntryNode: function(e, w) {
            if (w) {
                e.elData.parentNode.removeChild(e.elData)
            } else {
                if (e.deletedMark) {
                    t.hide(e.elData)
                }
            }
        },
        refreshEntryNode: function(e) {
            if (e.deletedMark) {
                t.hide(e.elData)
            } else {
                t.show(e.elData)
            }
        },
        refreshPreview: function() {
            for (var w = 0, e = this.datalist.length - 1; w < e; ++w) {
                var x = this.datalist[w];
                if (this.lastSelectedEntry && this.lastSelectedEntry.key == x.key && x.deleteMark == false) {
                    this.setPreivewImage(x);
                    return u
                }
            }
            for (var w = 0, e = this.datalist.length - 1; w < e; ++w) {
                var x = this.datalist[w];
                if (x.deletedMark == false && t.hasClassName(x.elData, "tx-clicked")) {
                    this.setPreivewImage(x);
                    return u
                }
            }
            this.initPreviewImage();
            return c
        },
        setPreivewImage: function(e) {
            this.imageResizer.execResize(e.boxAttr.image);
            this.lastSelectedEntry = e
        },
        initPreviewImage: function() {
            this.imageResizer.execResize(TXMSG("@attacher.preview.image"));
            this.lastSelectedEntry = i
        },
        showEntryThumb: function(e) {
            t.addClassName(e.elData, "tx-clicked");
            t.removeClassName(e.elData, "tx-hovered")
        },
        hideEntryThumb: function(e) {
            t.removeClassName(e.elData, "tx-clicked")
        },
        onEntryMouseOver: function(e) {
            t.addClassName(e.elData, "tx-hovered")
        },
        onEntryMouseOut: function(e) {
            t.removeClassName(e.elData, "tx-hovered")
        },
        startUpload: function() {
            this.elProgressPercent.style.width = "0".toPx();
            t.setStyle(this.elList, {
                opacity: 0.3
            });
            t.show(this.elProgress)
        },
        doUpload: function(w) {
            var e = 300;
            this.elProgressPercent.style.width = Math.floor(e * (isNaN(w) ? 0 : parseFloat(w) * 0.01)).toPx();
            this.elProgressTicker.innerText = Math.floor((isNaN(w) ? 0 : parseFloat(w))) + "%"
        },
        endUpload: function() {
            t.hide(this.elProgress);
            t.setStyle(this.elList, {
                opacity: 1
            })
        },
        clickEntry: function(e) {
            if (this.lastSelectedEntry) {
                if (this.lastSelectedEntry.key == e.key) {
                    return
                }
                this.datalist.each(function(w) {
                    w.makeSelection(c)
                })
            }
            this.elPreviewKind.className = ((e.boxAttr.className) ? e.boxAttr.className : "");
            e.makeSelection(u);
            this.setPreivewImage(e)
        },
        clickEntryWithCtrl: function(e) {
            if (t.hasClassName(e.elData, "tx-clicked")) {
                e.makeSelection(c);
                this.refreshPreview()
            } else {
                this.elPreviewKind.className = ((e.boxAttr.className) ? e.boxAttr.className : "");
                e.makeSelection(u);
                this.setPreivewImage(e)
            }
        },
        clickEntryWithShift: function(x) {
            if (t.hasClassName(x.elData, "tx-clicked")) {
                x.makeSelection(c);
                this.lastSelectedEntry = i
            } else {
                var e = this.getIndexOf(x);
                var y;
                if (this.lastSelectedEntry) {
                    y = this.getIndexOf(this.lastSelectedEntry)
                }
                var A = y,
                    z = e;
                if (e == y) {
                    A = z = e
                } else {
                    if (e < y) {
                        A = e;
                        z = y
                    }
                }
                this.elPreviewKind.className = ((x.boxAttr.className) ? x.boxAttr.className : "");
                for (var w = A; w < z + 1; w++) {
                    this.datalist[w].makeSelection(u)
                }
                this.setPreivewImage(x)
            }
        },
        getIndexOf: function(x) {
            var w, e;
            for (w = 0; w < this.datalist.length; w++) {
                if (this.datalist[w] === x) {
                    e = u;
                    break
                }
            }
            return e ? w : -1
        },
        getSelectedList: function(w) {
            var x = [];
            var e;
            if (w) {
                e = this.getAttachments(w)
            } else {
                e = this.datalist
            }
            e.each(function(y) {
                if (t.hasClassName(y.elData, "tx-clicked")) {
                    x.push(y)
                }
            });
            return x
        },
        removeSelection: function(e) {
            e.each(function(w) {
                t.removeClassName(w.elData, "tx-clicked")
            })
        }
    };
    g.install("attachbox.onFileCapacityInitialized @if sidebar.capacity.show = true", function(y, z, A, x, w) {
        var e = y.getAttachBox();
        if (w.sidebar.capacity.show === u) {
            Object.extend(e, g.I.FileCapacity);
            e.onFileCapacityInitialized(w, x)
        }
    });
    p.addSidebar("capacity", {
        show: u,
        maximum: 3145728,
        filemaximum: i,
        filter: {
            use: "",
            sound: {
                title: "sound file",
                maximum: 3145728,
                extensions: ",mp3,wav,ogg,wma,mp4,ape,wmv,asf,ra,ram,"
            },
            movie: {
                title: "movie file",
                maximum: 3145728,
                extensions: ",wmv,mpg,avi,"
            }
        }
    });
    g.I.FileCapacity = {
        onFileCapacityInitialized: function(y, x) {
            var z = (y.initializedId) ? y.initializedId : "";
            var A = y.sidebar.capacity;
            A.uploaded = 0;
            A.available = A.maximum;
            A.uploadedFileNum = 0;
            var B = function(G, H) {
                H = parseInt(H, 10);
                if (isNaN(H) || A[G] == q) {
                    return c
                }
                if (A.group && G == "available") {
                    A[G] = Math.min(H, A.maximum, A.group.maximum - A.group.used)
                } else {
                    A[G] = H
                }
                return A[G]
            };
            this.checkAvailableCapacity = function() {
                return (A.uploaded < A.available)
            };
            this.checkInsertableSize = function(G) {
                return (parseInt(A.uploaded, 10) + parseInt(G, 10) <= parseInt(A.available, 10))
            };
            this.getCapacity = function(G) {
                return (A[G] || 0)
            };
            this.changeAvailableCapacity = function(G) {
                if (B("available", G)) {
                    E();
                    return G
                }
                return c
            };
            this.changeMaximumCapacity = function(G) {
                if (B("maximum", G)) {
                    return G
                }
                return c
            };
            this.changeFileMaximumCapacity = function(G) {
                if (B("filemaximum", G)) {
                    return G
                }
                return c
            };
            var D = function(H) {
                var G = A.uploaded + H.toNumber();
                if (G < 0) {
                    G = 0
                }
                A.uploaded = G
            };
            var C = function(G) {
                D(-1 * G);
                A.uploadedFileNum -= 1
            };
            var w = function(G) {
                D(G);
                A.uploadedFileNum += 1
            };
            var e = {};
            if (A.filter.use.length > 0) {
                A.filter.use.split(",").each(function(G) {
                    if (A.filter[G]) {
                        e[G] = Object.extend({}, A.filter[G])
                    }
                })
            }
            this.getFiltersNameByExt = function(H) {
                var I = [];
                for (var G in e) {
                    if (e[G].extensions.indexOf("," + H.toLowerCase() + ",") > -1) {
                        I.push(G)
                    }
                }
                return I
            };
            this.getFilterExtensions = function(G) {
                if (e[G]) {
                    return e[G].extensions
                } else {
                    return i
                }
            };
            this.getFilterMaximum = function(G) {
                if (e[G]) {
                    return e[G].maximum
                } else {
                    return i
                }
            };
            this.getUploadedSizeByFilter = function(H) {
                var I = 0;
                var G = e[H].extensions;
                this.datalist.each(function(K) {
                    if (K.data && K.data.filename) {
                        var J = K.data.filename.split(".").pop().toLowerCase();
                        if (G.indexOf("," + J + ",") > -1) {
                            I += K.data.filesize
                        }
                    }
                });
                return I
            };
            if (A.group) {
                B("available", Math.min(A.maximum, A.group.maximum - A.group.used))
            }
            this.getGroupCapacity = function(G) {
                return ((A.group) ? (A.group[G] || 0) : 0)
            };
            this.observeJob(g.Ev.__ENTRYBOX_ENTRY_ADDED, function(G) {
                if (G.actor.isCheckSize) {
                    w(G.data.filesize || 0);
                    E()
                }
            });
            this.observeJob(g.Ev.__ENTRYBOX_ENTRY_REMOVED, function(G) {
                if (G.actor.isCheckSize) {
                    C(G.data.filesize || 0);
                    E()
                }
            });
            this.observeJob(g.Ev.__ENTRYBOX_ALL_ENTRY_REMOVED, function() {
                A.uploaded = 0;
                A.uploadedFileNum = 0;
                E()
            });
            this.observeJob(g.Ev.__ENTRYBOX_ENTRY_REFRESH, function(H) {
                if (!H.actor.isCheckSize) {
                    return
                }
                var G = H.data.filesize || 0;
                if (H.deletedMark) {
                    C(G)
                } else {
                    w(G)
                }
                E()
            });
            var F = this;
            var E = function() {
                var G = {
                    uploaded: A.uploaded,
                    available: A.available,
                    maximum: A.maximum,
                    uploadedFileNum: A.uploadedFileNum,
                    group: A.group
                };
                F.fireJobs(g.Ev.__ENTRYBOX_CAPACITY_UPDATE, G)
            }
        }
    };
    j.addMsg({
        "@attacher.can.modify.alert": "\uae30\uc874\uc5d0 \ub4f1\ub85d\ub41c #{title}\uc744(\ub97c) \uc218\uc815\ud560 \uc218 \uc788\ub294 \ud654\uba74\uc73c\ub85c \uc774\ub3d9\ud569\ub2c8\ub2e4.",
        "@attacher.can.modify.confirm": "#{title}\uc740(\ub294) \ud558\ub098\ub9cc \ub4f1\ub85d\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4.\n\ub2e4\uc2dc \uc62c\ub9ac\uc2dc\uba74 \uae30\uc874\uc758 #{title}\uc774(\uac00) \uc0ad\uc81c\ub429\ub2c8\ub2e4. \uacc4\uc18d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",
        "@attacher.insert.alert": "\uc5d0\ub514\ud130 \uc0c1\ud0dc\uc5d0\uc11c\ub9cc \uc0bd\uc785\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
        "@attacher.capacity.alert": "\uc6a9\ub7c9\uc744 \ucd08\uacfc\ud558\uc600\uc2b5\ub2c8\ub2e4.",
        "@attacher.size.alert": "\uc6a9\ub7c9\uc744 \ucd08\uacfc\ud558\uc5ec \ub354\uc774\uc0c1 \ub4f1\ub85d\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."
    });
    g.install("sidebar.getAttacher & sidebar.getUploadAdaptor", function(w, x, y) {
        var e = y.attachers = {};
        y.getAttacher = function(z) {
            if (e[z] != i) {
                return e[z]
            } else {
                if (arguments.length == 0) {
                    return e
                } else {
                    return i
                }
            }
        }
    });
    g.register("new attachers", function(A, C, e, w, x) {
        var B = A.getAttachBox();
        var z = e.attachers;
        for (var y in g.Attacher) {
            var D = g.Attacher[y]["__Identity"];
            if (D) {
                z[D] = new g.Attacher[y](A, B, x)
            }
        }
        if (z.file) {
            e.getUploadAdaptor = function() {
                return z.file.getAdaptor()
            }
        }
    });
    g.Attacher = g.Class.draft({
        $extend: g.Actor,
        canModified: c,
        canResized: c,
        initialize: function(w, y, e) {
            this.editor = w;
            this.canvas = w.getCanvas();
            this.entryBox = y;
            var x = this.config = p.getAttacher(this.constructor.__Identity, e);
            if (e.pvpage && !!x.usepvpage) {
                this.pvUrl = p.getUrl(e.pvpage, {
                    pvname: this.name
                })
            }
            this.boxonly = ((x.boxonly != i) ? x.boxonly : c);
            this.isMultiple = ((x.multiple != i) ? x.multiple : c);
            this.isCheckSize = ((x.checksize != i) ? x.checksize : c);
            this.wysiwygonly = ((x.wysiwygonly != i) ? x.wysiwygonly : u);
            this.pastescope = x.pastescope;
            if (this.oninitialized) {
                this.oninitialized(e)
            }
            this.attachHandler = this.attachHandler.bind(this)
        },
        execute: function(B) {
            if (this.wysiwygonly && !this.canvas.isWYSIWYG()) {
                alert(TXMSG("@attacher.insert.alert"));
                return
            }
            if (this.isCheckSize && !this.entryBox.checkAvailableCapacity()) {
                alert(TXMSG("@attacher.capacity.alert"));
                return
            }
            if (!this.checkInsertable()) {
                if (this.canModified) {
                    var x = new Template(TXMSG("@attacher.can.modify.alert"));
                    alert(x.evaluate({
                        title: this.title
                    }))
                } else {
                    var x = new Template(TXMSG("@attacher.can.modify.confirm"));
                    if (!confirm(x.evaluate({
                            title: this.title
                        }))) {
                        return
                    }
                }
            }
            if (this.clickHandler) {
                this.clickHandler()
            } else {
                try {
                    var w = this.config.popPageUrl;
                    if (B) {
                        w = w + ((w.indexOf("?") > -1) ? "&" : "?") + B
                    }
                    var y = (document.location.hostname != document.domain);
                    if (y) {
                        w = w + ((w.indexOf("?") > -1) ? "&" : "?") + "xssDomain=" + document.domain
                    }
                    w = (this.pvUrl ? this.pvUrl + ((this.pvUrl.indexOf("?") > -1) ? "&" : "?") + "u=" + escape(w) : w);
                    var A = h.open(w, "at" + this.name, this.config.features);
                    A.focus()
                } catch (z) {}
            }
        },
        attachHandler: function(w, e) {
            if (this.checkInsertable()) {
                if (this.isCheckSize && !this.entryBox.checkInsertableSize(w.filesize)) {
                    alert(TXMSG("@attacher.size.alert"));
                    return
                }
                this.execAttach(w, e)
            } else {
                this.execReattach(w, e)
            }
        },
        createEntry: function(w, e) {
            return this.createAttachment(w, e)
        },
        createAttachment: function(x, w) {
            var e = this.constructor.__Identity;
            if (w) {
                e = w
            }
            return new g.Attachment[e.capitalize()](this, x)
        },
        checkInsertable: function() {
            return (this.isMultiple || this.getDatalist().length === 0)
        }
    });
    j.addMsg({
        "@embeder.alert": "\uc5d0\ub514\ud130 \uc0c1\ud0dc\uc5d0\uc11c\ub9cc \uc0bd\uc785\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
    });
    g.EmbedBox = g.Class.create({
        $extend: g.EntryBox,
        initialize: function() {}
    });
    g.install("editor.getEmbedBox & sidebar.getEmbeder & sidebar.getEmbeddedData", function(y, z, A, x, w) {
        var B = new g.EmbedBox(w, x, y);
        A.entryboxRegistry.embedbox = B;
        y.getEmbedBox = function() {
            return B
        };
        A.getEmbeddedData = B.getEntries.bind(B);
        var e = A.embeders = {};
        A.getEmbeder = function(C) {
            if (e[C] != i) {
                return e[C]
            } else {
                if (arguments.length == 0) {
                    return e
                } else {
                    return i
                }
            }
        }
    });
    g.register("new embeders", function(z, B, e, w, x) {
        var D = z.getEmbedBox();
        var A = e.embeders;
        for (var y in g.Embeder) {
            var C = g.Embeder[y]["__Identity"];
            if (C) {
                if (!B.tools[C]) {}
                A[C] = new g.Embeder[y](z, D, x)
            }
        }
    });
    g.Embeder = g.Class.draft({
        $extend: g.Actor,
        canResized: c,
        initialize: function(w, y, e) {
            this.editor = w;
            this.canvas = w.getCanvas();
            var x = this.config = p.getEmbeder(this.constructor.__Identity, e);
            if (e.pvpage && !!x.usepvpage) {
                this.pvUrl = p.getUrl(e.pvpage, {
                    pvname: this.name
                })
            }
            this.wysiwygonly = ((x.wysiwygonly != i) ? x.wysiwygonly : u);
            this.pastescope = x.pastescope;
            this.embedHandler = this.embedHandler.bind(this);
            if (this.oninitialized) {
                this.oninitialized.bind(this)(e)
            }
        },
        execute: function() {
            if (this.wysiwygonly && !this.canvas.isWYSIWYG()) {
                alert(TXMSG("@embeder.alert"));
                return
            }
            if (this.clickHandler) {
                this.clickHandler()
            } else {
                try {
                    var w = this.config.popPageUrl;
                    var x = (document.location.hostname != document.domain);
                    if (x) {
                        w = w + ((w.indexOf("?") > -1) ? "&" : "?") + "xssDomain=" + document.domain
                    }
                    w = (this.pvUrl ? this.pvUrl + ((this.pvUrl.indexOf("?") > -1) ? "&" : "?") + "u=" + escape(w) : w);
                    var z = h.open(w, "at" + this.name, this.config.features);
                    z.focus()
                } catch (y) {}
            }
        },
        embedHandler: function(e) {
            this.execAttach(e)
        },
        createEntry: function(x, w) {
            var e = this.constructor.__Identity;
            if (w) {
                e = w
            }
            return new g.EmbedEntry[e.capitalize()](this, x)
        },
        execAttach: function(y) {
            var x = this.pastescope;
            var w = this.getCreatedHtml(y);
            var e = this.config.parastyle || this.config.defaultstyle || {};
            this.canvas.execute(function(z) {
                z.moveCaretWith(x);
                z.pasteContent(w, u, e)
            })
        },
        execReattach: function() {},
        execReload: function() {},
        getReloadContent: function(y, x) {
            if (!y.dispElId) {
                return x
            }
            var e = this.getCreatedHtml(y);
            var w = new RegExp('<(?:img|IMG)[^>]*id="?' + y.dispElId + '"?[^>]*/?>', "gm");
            if (x.search(w) > -1) {
                return x.replace(w, e)
            }
            return x
        }
    });
    g.EmbedEntry = g.Class.create({
        $extend: g.Entry,
        attrs: {
            align: "left"
        },
        initialize: function(e, w) {
            this.actor = e;
            this.canvas = e.canvas;
            this.entryBox = e.entryBox;
            this.setProperties(w)
        },
        register: function() {
            if (this.canvas.isWYSIWYG()) {
                var e = this.actor.config.defaultstyle;
                if (e) {
                    this.canvas.pasteContent(this.dispHtml, u, {
                        style: e
                    })
                } else {
                    this.canvas.pasteContent(this.dispHtml, u)
                }
            } else {
                this.canvas.getProcessor().insertTag("", this.dispText)
            }
        },
        setProperties: function(w) {
            this.type = this.constructor.__Identity;
            var e = this.data = w;
            this.key = e.key;
            this.dispHtml = this.getDispHtml(e);
            this.saveHtml = this.dispText = this.getDispText(e);
            this.regHtml = this.getRegHtml(e);
            this.regLoad = this.regText = this.getRegText(e)
        }
    });
    g.I.ButtonFontTool = g.Mixin.create({
        oninitialized: function(w) {
            var e = this;
            e.button = new g.Button(e.buttonCfg);
            e.weave(e.button, i, e.handler);
            if (w.sync) {
                e.startSyncButtonWithStyle()
            }
            e.bindKeyboard(w.hotKey, e.handler.bind(e))
        },
        rangeExecutor: function(y, z, w) {
            var x = null;
            if (t.msie && this.wrapDummy && y.isCollapsed()) {
                x = this.wrapDummy(y, w);
                y.execCommand(this.getQueryCommandName());
                var e = y.createGoogRangeFromNodes(x, 1, x, 1);
                e.select()
            } else {
                y.execCommand(this.getQueryCommandName())
            }
        },
        onAfterHandler: function(w) {
            var e = this.canvas;
            if (e.triggerQueryStatus) {
                e.triggerQueryStatus()
            }
        },
        startSyncButtonWithStyle: function() {
            var e = this;
            e.canvas.observeJob(g.Ev.__CANVAS_PANEL_QUERY_STATUS, function(w) {
                e.syncButton(e.queryCurrentStyle(w))
            })
        },
        queryCurrentStyle: function(w) {
            var e = this;
            var x = e.canvas.query(function(y) {
                var A = e.getQueryCommandName();
                if (A && !t.opera && !t.gecko) {
                    return y.queryCommandState(A)
                } else {
                    var z = e.findQueryingNode(w);
                    return !!z && e.isStyleApplied(z)
                }
            });
            return x
        },
        computeNewStyle: function() {
            return i
        },
        cachedProperty: c,
        syncButton: function(e) {
            if (this.cachedProperty != e) {
                this.button.setState(e);
                this.cachedProperty = e
            }
        }
    });
    g.I.MenuFontTool = g.Mixin.create({
        oninitialized: function(x) {
            var w = this;
            w.beforeOnInitialized(x);
            var e = w.menuInitHandler && w.menuInitHandler.bind(w);
            w.weave(w.createButton(), w.createMenu(), w.handler, e);
            if (x.sync) {
                w.startSyncButtonWithStyle()
            }
        },
        rangeExecutor: function(w, x, e) {
            this.wrapTextAsStyledSpan(w, x, e)
        },
        startSyncButtonWithStyle: function() {
            var e = this;
            e.canvas.observeJob(g.Ev.__CANVAS_PANEL_QUERY_STATUS, function(w) {
                e.syncButton(e.queryCurrentStyle(w))
            })
        },
        queryCurrentStyle: function(w) {
            var e = this;
            var y = e.queryCommandValue();
            if (e.reliableQueriedValue(y) && y && e.getTextByValue(y)) {
                return e.getTextByValue(y)
            }
            var x = e.canvas.query(function(z) {
                var A;
                if (t.msie && w.isCollapsed()) {
                    A = z.getNode()
                } else {
                    A = e.findQueryingNode(w)
                }
                return e.queryElementCurrentStyle(A)
            });
            if (x && e.getTextByValue(x)) {
                return e.getTextByValue(x)
            }
            return y || x || e.getTextByValue(e.getDefaultProperty())
        },
        queryCommandValue: function() {
            var e = this;
            return e.canvas.query(function(w) {
                return w.queryCommandValue(e.getQueryCommandName())
            })
        },
        reliableQueriedValue: function(e) {
            return u
        },
        queryElementCurrentStyle: function(y) {
            var w = this.getCssPropertyName();
            var B = y;
            var A = 10;
            for (var x = 0; x < A && v.kindOf(B, "%inline"); x++) {
                var e = B.style[w];
                if (e) {
                    return e
                }
                if (v.kindOf(B, "font") && v.getAttribute(this.getFontTagAttribute())) {
                    return v.getAttribute(this.getFontTagAttribute())
                }
                B = B.parentNode
            }
            var z = this.canvas.getProcessor();
            if (y) {
                return z.queryStyle(y, w)
            } else {
                return i
            }
        },
        computeNewStyle: function(w) {
            var e = {};
            e[this.getCssPropertyName()] = w;
            return e
        },
        cachedProperty: c,
        syncButton: function(w) {
            var e = this;
            e.button.setText(w);
            if (e.cachedProperty != w) {
                e.button.setText(w);
                e.cachedProperty = w
            }
        }
    });
    g.I.FontTool = g.Mixin.create({
        initialize: function(w, x, e) {
            this.$super.initialize(w, x, e)
        },
        handler: function(e) {
            this.onBeforeHandler(e);
            this.doHandle(e);
            this.onAfterHandler(e)
        },
        onBeforeHandler: function() {},
        doHandle: function(y) {
            var w = this,
                e, x = w.computeNewStyle(y);
            w.canvas.execute(function(A) {
                var z = (A.table) ? A.table.getTdArr() : [];
                if (z.length > 0) {
                    e = d.dom.Range.createFromNodeContents(z[0]);
                    A.executeUsingCaret(function() {
                        w.tableCellsExecutor(A, x, z)
                    })
                } else {
                    e = A.createGoogRange();
                    if (e) {
                        w.rangeExecutor(A, x, e)
                    }
                }
            })
        },
        onAfterHandler: function() {},
        tableCellsExecutor: function(x, y, w) {
            var e = this;
            w.each(function(z) {
                var A = d.dom.Range.createFromNodeContents(z);
                A.select();
                e.rangeExecutor(x, y, A)
            })
        },
        findQueryingNode: function(w) {
            if (w) {
                var y;
                try {
                    y = this.findFirst(w.__iterator__(), function(z) {
                        return z.nodeType == 3 && z.nodeValue.trim()
                    })
                } catch (e) {}
                if (y) {
                    return y.parentNode
                } else {
                    var x = w.getStartNode();
                    if (x && x.nodeType == 3) {
                        return x.parentNode
                    }
                    return x
                }
            }
        },
        findFirst: function(w, y) {
            try {
                return d.iter.filter(w, y).next()
            } catch (x) {
                return null
            }
        }
    });
    g.I.WrappingSpanFontTool = g.Mixin.create({
        wrapTextAsStyledSpan: function(z, B, D) {
            var C;
            if (z.isCollapsed()) {
                var x = D.getStartNode();
                if (x.nodeType == 3) {
                    x = x.parentNode
                }
                var E = this.findOrCreateDummySpan(x, z, D);
                var w = E.firstChild;
                z.createGoogRangeFromNodes(w, w.length, w, w.length).select();
                C = [E]
            } else {
                z.executeUsingCaret(function(G, J) {
                    var H = y(J);
                    var I = e(H);
                    C = F(I)
                })
            }
            z.apply(C, {
                style: B
            });

            function y(I) {
                var H = I.getCaret(u),
                    G = I.getCaret(c);
                return new d.dom.TextRangeIterator(H, 0, G, 0)
            }

            function e(H) {
                var G = [];
                d.iter.forEach(H, function(I) {
                    if (I.nodeType == 3 && !v.kindOf(I.parentNode, "table,thead,tbody,tr,ul,ol")) {
                        G.push(I)
                    }
                });
                return G
            }

            function F(H) {
                var G = [];
                H.each(function(K) {
                    var I = K.parentNode;
                    if (I.nodeName == "SPAN" && A(I)) {
                        G.push(I)
                    } else {
                        var J = z.create("span");
                        v.wrap(J, K);
                        G.push(J)
                    }
                });
                return G
            }

            function A(J) {
                var K = J.childNodes;
                var H = K.length;
                if (H > 3) {
                    return c
                }
                for (var I = 0, G = H; I < G; I++) {
                    if (v.isGoogRangeCaret(K[I])) {
                        H = H - 1
                    }
                }
                return H == 1
            }
        },
        findOrCreateDummySpan: function(x, w, e) {
            var y = (x.tagName == "SPAN" && x.childNodes.length == 1 && x.firstChild.nodeType == 3 && x.firstChild.nodeValue == g.__WORD_JOINER);
            if (y) {
                return x
            } else {
                return this.createDummySpan(x, w, e)
            }
        },
        createDummySpan: function(e, y, w) {
            var x = null;
            if (e.tagName == "SPAN") {
                x = v.clone(e)
            } else {
                x = y.create("span")
            }
            x.appendChild(y.newDummy());
            x = w.insertNode(x);
            v.removeEmptyTextNode(x.previousSibling);
            v.removeEmptyTextNode(x.nextSibling);
            return x
        }
    });
    g.I.WrappingDummyFontTool = g.Mixin.create({
        wrapDummy: function(w, e) {
            var x = this.createDummySpan(w, e);
            var y = x.firstChild;
            v.unwrap(x);
            w.createGoogRangeFromNodes(y, 0, y, y.length).select();
            return y
        },
        createDummySpan: function(x, e) {
            var w = null;
            w = x.create("span");
            w.appendChild(x.newDummy());
            w = e.insertNode(w);
            v.removeEmptyTextNode(w.previousSibling);
            v.removeEmptyTextNode(w.nextSibling);
            return w
        }
    });
    j.addMsg({
        "@switcher.wysiwyg": "\uc5d0\ub514\ud130",
        "@switcher.source": "HTML",
        "@switcher.text": "\ud14d\uc2a4\ud2b8"
    });
    p.addTool("switcher", {
        wysiwygonly: c,
        status: u,
        options: [{
            label: TXMSG("@switcher.wysiwyg"),
            title: TXMSG("@switcher.wysiwyg"),
            data: "html"
        }, {
            label: TXMSG("@switcher.source"),
            title: TXMSG("@switcher.source"),
            data: "source"
        }, {
            label: TXMSG("@switcher.text"),
            title: TXMSG("@switcher.text"),
            data: "text"
        }]
    });
    g.Tool.Switcher = g.Class.create({
        $const: {
            __Identity: "switcher"
        },
        $extend: g.Tool,
        oninitialized: function(w) {
            var C = this.canvas;
            var x = {};
            w.options.each(function(E) {
                x[E.data] = {
                    title: E.title
                }
            });
            var e = "";
            var A = w.options[0];
            var B = function(E) {
                if (E === "text") {
                    if (C.mode !== "text") {
                        return u
                    }
                }
                return c
            };
            var y = function() {
                var F, G, E;
                F = C.getContent();
                G = F.toLowerCase().trim();
                E = v.EMPTY_PARAGRAPH_HTML.toLowerCase().trim();
                if (G && G !== E && G !== "&nbsp;") {
                    return u
                }
                return c
            };
            var z = function(E) {
                if (w.changeModeConfirmMsg) {
                    if (B(E)) {
                        if (y()) {
                            if (c === confirm(w.changeModeConfirmMsg)) {
                                return $stop
                            }
                        }
                    }
                }
                C.changeMode(E)
            };
            var D = function(F, E) {
                if (F == E) {
                    return
                }
                if (e == E) {
                    return
                }
                if (!x[E]) {
                    return
                }
                this.button.setValue(E);
                this.button.setText(x[E].title);
                e = E
            }.bind(this);
            C.observeJob(g.Ev.__CANVAS_MODE_CHANGE, D);
            C.observeJob(g.Ev.__CANVAS_MODE_INITIALIZE, D);
            this.weave.bind(this)(new g.Button.Select(p.merge(this.buttonCfg, {
                selectedValue: A.data,
                selectedText: A.label
            })), new g.Menu.Select(this.menuCfg), z)
        }
    });
    p.addTool("switchertoggle", {
        wysiwygonly: c,
        sync: u,
        status: u,
        options: [{
            label: "\uc5d0\ub514\ud130",
            title: "\uc5d0\ub514\ud130",
            data: "html"
        }, {
            label: "HTML",
            title: "HTML",
            data: "source"
        }]
    });
    g.Tool.SwitcherToggle = g.Class.create({
        $const: {
            __Identity: "switchertoggle"
        },
        $extend: g.Tool,
        oninitialized: function() {
            var x = this.canvas;
            var w = function() {
                switch (x.mode) {
                    case "html":
                        x.changeMode("source");
                        break;
                    case "source":
                        x.changeMode("html");
                        break
                }
                return c
            };
            this.weave.bind(this)(new g.Button.Toggle(p.merge(this.buttonCfg, {
                borderClass: "tx-switchtoggle"
            })), i, w);
            var e = function(z, y) {
                this.button.setValue(y == "source")
            }.bind(this);
            x.observeJob(g.Ev.__CANVAS_MODE_CHANGE, e);
            x.observeJob(g.Ev.__CANVAS_MODE_INITIALIZE, e)
        }
    });
    j.addMsg({
        "@fontfamily.gulim": "\uad74\ub9bc",
        "@fontfamily.batang": "\ubc14\ud0d5",
        "@fontfamily.dotum": "\ub3cb\uc6c0",
        "@fontfamily.gungsuh": "\uad81\uc11c"
    });
    p.addTool("fontfamily", {
        sync: u,
        status: u,
        useFavorite: u,
        options: [{
            label: TXMSG("@fontfamily.gulim") + ' (<span class="tx-txt">\uac00\ub098\ub2e4\ub77c</span>)',
            title: TXMSG("@fontfamily.gulim"),
            data: "Gulim,\uad74\ub9bc,AppleGothic,sans-serif",
            klass: "tx-gulim"
        }, {
            label: TXMSG("@fontfamily.batang") + ' (<span class="tx-txt">\uac00\ub098\ub2e4\ub77c</span>)',
            title: TXMSG("@fontfamily.batang"),
            data: "Batang,\ubc14\ud0d5,serif",
            klass: "tx-batang"
        }, {
            label: TXMSG("@fontfamily.dotum") + ' (<span class="tx-txt">\uac00\ub098\ub2e4\ub77c</span>)',
            title: TXMSG("@fontfamily.dotum"),
            data: "Dotum,\ub3cb\uc6c0,sans-serif",
            klass: "tx-dotum"
        }, {
            label: TXMSG("@fontfamily.gungsuh") + ' (<span class="tx-txt">\uac00\ub098\ub2e4\ub77c</span>)',
            title: TXMSG("@fontfamily.gungsuh"),
            data: "Gungsuh,\uad81\uc11c,serif",
            klass: "tx-gungseo"
        }, {
            label: 'Arial (<span class="tx-txt">abcde</span>)',
            title: "Arial",
            data: "Arial,sans-serif",
            klass: "tx-arial"
        }, {
            label: 'Verdana (<span class="tx-txt">abcde</span>)',
            title: "Verdana",
            data: "Verdana,sans-serif",
            klass: "tx-verdana"
        }, {
            label: 'Courier New (<span class="tx-txt">abcde</span>)',
            title: "Courier New",
            data: "Courier New,monspace",
            klass: "tx-courier-new"
        }]
    });
    g.Tool.FontFamily = g.Class.create({
        $const: {
            __Identity: "fontfamily"
        },
        $extend: g.Tool,
        $mixins: [g.I.CookieBaker, g.I.FontTool, g.I.MenuFontTool, g.I.WrappingSpanFontTool],
        beforeOnInitialized: function(x) {
            function w(z) {
                e.usedWebFonts = ((t.msie && z.webfont && z.webfont.use) ? z.webfont.options : []);
                e.usedFonts = z.options.concat(e.usedWebFonts)
            }

            function y(z) {
                if (z.useFavorite && e.usedWebFonts.length > 0) {
                    e.useFavorite = u;
                    e.initCookie("txFontFamilyFavorite")
                } else {
                    e.useFavorite = c
                }
            }
            var e = this;
            e.focusLoosed = c;
            w(x);
            y(x);
            e.createFontFamilyMap(e.usedFonts)
        },
        createFontFamilyMap: function(x) {
            var w = this,
                e = {};
            this.fontFamilyMap = e;
            x.each(function(B) {
                var y, C, A, z;
                y = B.data.split(",");
                C = B.title;
                for (A = 0; A < y.length; A += 1) {
                    z = w.preprocessFontFamily(y[A]);
                    e[z] = C
                }
                if (!e[C.toLowerCase()]) {
                    e[C.toLowerCase()] = C
                }
            })
        },
        createButton: function() {
            var e = new g.Button.Select(this.buttonCfg);
            this.button = e;
            e.setValue(this.getDefaultProperty());
            e.setText(this.getTextByValue(this.getDefaultProperty()));
            return e
        },
        createMenu: function() {
            var e = this;
            var w = new g.Menu.Select(p.merge(e.menuCfg, {
                options: e.usedFonts
            }));
            this.menu = w;
            w.generateListItem = function(B) {
                var y = [],
                    A, C, z;
                for (A = 0; A < B.length; A += 1) {
                    C = B[A];
                    z = C.label;
                    C.label = C.label.replace(/<span class="tx\-txt">/, '<span class="tx-txt" style="font-family:' + C.data + ';">');
                    y.push(g.MarkupTemplate.get("menu.select.item").evaluate(C));
                    C.label = z
                }
                return y.join("")
            };
            if (e.usedWebFonts.length > 0) {
                t.addClassName(w.elMenu, "tx-fontfamily-webfont-menu");
                var x = tx.input({
                    type: "text",
                    className: "tx-dummyfocus"
                });
                v.append(w.elMenu, x);
                t.observe(w.elMenu, "mousedown", function(y) {
                    if (y.offsetX < e.menu.elMenu.clientWidth) {
                        return
                    }
                    x.style.top = y.offsetY.toPx();
                    if (!e.focusLoosed) {
                        x.focus();
                        x.blur();
                        e.menu.elMenu.focus();
                        e.focusLoosed = u
                    }
                })
            }
            return w
        },
        menuInitHandler: function() {
            var w = this;
            var y = w.menu;
            w.focusLoosed = c;
            if (!w.useFavorite) {
                return []
            }
            y.elMenu.scrollTop = 0;
            var x = v.collect(y.elMenu, "ul.tx-menu-favlist");
            if (x) {
                v.remove(x)
            }
            var e = w.extractOptions(w.usedFonts, w.readCookie());
            x = y.generateList(e);
            v.insertFirst(y.elMenu, x);
            t.addClassName(x, "tx-menu-favlist");
            return e
        },
        onBeforeHandler: function(e) {
            this.canvas.includeWebfontCss("font-family: " + e)
        },
        onAfterHandler: function(w) {
            var e = this;
            if (e.useFavorite) {
                e.writeCookie(e.mergeValues(e.readCookie(), w))
            }
        },
        getDefaultProperty: function() {
            return this.canvas.getStyleConfig().fontFamily
        },
        getRelatedCssPropertyNames: function() {
            return ["font", this.getCssPropertyName()]
        },
        getCssPropertyName: function() {
            return "fontFamily"
        },
        getQueryCommandName: function() {
            return "fontname"
        },
        getFontTagAttribute: function() {
            return "face"
        },
        preprocessFontFamily: function(e) {
            return e.toLowerCase().replace(/'|"/g, "").replace(/_?9$/, "")
        },
        getTextByValue: function(e) {
            if (e.include(",")) {
                e = e.split(",")[0]
            }
            e = this.preprocessFontFamily(e);
            return this.fontFamilyMap[e]
        }
    });
    p.addTool("fontsize", {
        sync: u,
        status: u,
        options: [{
            label: "\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (8pt)",
            title: "8pt",
            data: "8pt",
            klass: "tx-8pt"
        }, {
            label: "\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (9pt)",
            title: "9pt",
            data: "9pt",
            klass: "tx-9pt"
        }, {
            label: "\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (10pt)",
            title: "10pt",
            data: "10pt",
            klass: "tx-10pt"
        }, {
            label: "\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (11pt)",
            title: "11pt",
            data: "11pt",
            klass: "tx-11pt"
        }, {
            label: "\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (12pt)",
            title: "12pt",
            data: "12pt",
            klass: "tx-12pt"
        }, {
            label: "\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (14pt)",
            title: "14pt",
            data: "14pt",
            klass: "tx-14pt"
        }, {
            label: "\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (18pt)",
            title: "18pt",
            data: "18pt",
            klass: "tx-18pt"
        }, {
            label: "\uac00\ub098\ub2e4\ub77c\ub9c8 (24pt)",
            title: "24pt",
            data: "24pt",
            klass: "tx-24pt"
        }, {
            label: "\uac00\ub098\ub2e4 (36pt)",
            title: "36pt",
            data: "36pt",
            klass: "tx-36pt"
        }]
    });
    g.Tool.FontSize = g.Class.create({
        $const: {
            __Identity: "fontsize"
        },
        $extend: g.Tool,
        $mixins: [g.I.FontTool, g.I.MenuFontTool, g.I.WrappingSpanFontTool],
        beforeOnInitialized: function(e) {
            this.createFontSizeMap(e)
        },
        createButton: function() {
            var w = this.getDefaultProperty();
            var e = this.button = new g.Button.Select(this.buttonCfg);
            e.setValue(w);
            e.setText(this.getTextByValue(w));
            return e
        },
        createMenu: function() {
            return new g.Menu.Select(this.menuCfg)
        },
        createFontSizeMap: function(e) {
            var w = this.fontSizeMap = {};
            e.options.each(function(x) {
                w[x.data] = x.title
            });
            [{
                title: "8pt",
                data: "1"
            }, {
                title: "10pt",
                data: "2"
            }, {
                title: "12pt",
                data: "3"
            }, {
                title: "14pt",
                data: "4"
            }, {
                title: "18pt",
                data: "5"
            }, {
                title: "24pt",
                data: "6"
            }, {
                title: "36pt",
                data: "7"
            }, {
                title: "7.5pt",
                data: "10px"
            }, {
                title: "8pt",
                data: "11px"
            }, {
                title: "9pt",
                data: "12px"
            }, {
                title: "10pt",
                data: "13px"
            }, {
                title: "11pt",
                data: "15px"
            }, {
                title: "12pt",
                data: "16px"
            }, {
                title: "14pt",
                data: "19px"
            }, {
                title: "18pt",
                data: "24px"
            }, {
                title: "24pt",
                data: "32px"
            }, {
                title: "36pt",
                data: "48px"
            }, {
                title: "8pt",
                data: "x-small"
            }, {
                title: "10pt",
                data: "small"
            }, {
                title: "12pt",
                data: "medium"
            }, {
                title: "14pt",
                data: "large"
            }, {
                title: "18pt",
                data: "x-large"
            }, {
                title: "24pt",
                data: "xx-large"
            }, {
                title: "36pt",
                data: "-webkit-xxx-large"
            }].each(function(x) {
                w[x.data] = x.title
            })
        },
        reliableQueriedValue: function(e) {
            return t.webkit === false
        },
        getTextByValue: function(x) {
            var w = this.fontSizeMap[x];
            if (!w) {
                var e = Math.round(parseFloat(x)).toPx();
                w = this.fontSizeMap[e]
            }
            return w
        },
        getRelatedCssPropertyNames: function() {
            return ["font", this.getCssPropertyName()]
        },
        getCssPropertyName: function() {
            return "fontSize"
        },
        getQueryCommandName: function() {
            return "fontsize"
        },
        getDefaultProperty: function() {
            return this.canvas.getStyleConfig().fontSize
        },
        getFontTagAttribute: function() {
            return "size"
        }
    });
    p.addTool("bold", {
        wysiwygonly: u,
        sync: u,
        status: u,
        hotKey: {
            ctrlKey: u,
            keyCode: 66
        }
    });
    g.Tool.Bold = g.Class.create({
        $const: {
            __Identity: "bold"
        },
        $extend: g.Tool,
        $mixins: [g.I.FontTool, g.I.ButtonFontTool, g.I.WrappingDummyFontTool],
        getRelatedCssPropertyNames: function() {
            return ["font", this.getCssPropertyName()]
        },
        getCssPropertyName: function() {
            return "fontWeight"
        },
        getQueryCommandName: function() {
            return "bold"
        },
        isStyleApplied: function(e) {
            return ["bold", "700"].contains(t.getStyle(e, "fontWeight"))
        }
    });
    p.addTool("underline", {
        wysiwygonly: u,
        sync: u,
        status: u,
        hotKey: {
            ctrlKey: u,
            keyCode: 85
        }
    });
    g.Tool.Underline = g.Class.create({
        $const: {
            __Identity: "underline"
        },
        $extend: g.Tool,
        $mixins: [g.I.FontTool, g.I.ButtonFontTool, g.I.WrappingDummyFontTool],
        getRelatedCssPropertyNames: function() {
            return [this.getCssPropertyName()]
        },
        getCssPropertyName: function() {
            return "textDecoration"
        },
        getQueryCommandName: function() {
            return "underline"
        },
        isStyleApplied: function(e) {
            return t.getStyle(e, "textDecoration").include("underline")
        }
    });
    p.addTool("italic", {
        wysiwygonly: u,
        sync: u,
        status: u,
        hotKey: {
            ctrlKey: u,
            keyCode: 73
        }
    });
    g.Tool.Italic = g.Class.create({
        $const: {
            __Identity: "italic"
        },
        $extend: g.Tool,
        $mixins: [g.I.FontTool, g.I.ButtonFontTool, g.I.WrappingDummyFontTool],
        getRelatedCssPropertyNames: function() {
            return ["font", this.getCssPropertyName()]
        },
        getCssPropertyName: function() {
            return "fontStyle"
        },
        getQueryCommandName: function() {
            return "italic"
        },
        isStyleApplied: function(e) {
            return t.getStyle(e, "fontStyle") == "italic"
        }
    });
    p.addTool("strike", {
        wysiwygonly: u,
        sync: u,
        status: u,
        hotKey: {
            ctrlKey: u,
            keyCode: 68
        }
    });
    g.Tool.Strike = g.Class.create({
        $const: {
            __Identity: "strike"
        },
        $extend: g.Tool,
        $mixins: [g.I.FontTool, g.I.ButtonFontTool, g.I.WrappingDummyFontTool],
        getRelatedCssPropertyNames: function() {
            return [this.getCssPropertyName()]
        },
        getCssPropertyName: function() {
            return "textDecoration"
        },
        getQueryCommandName: function() {
            return "strikethrough"
        },
        isStyleApplied: function(e) {
            return t.getStyle(e, "textDecoration").include("line-through")
        }
    });
    p.addTool("forecolor", {
        defaultcolor: "#7c84ef",
        wysiwygonly: u,
        sync: c,
        status: u,
        useFavorite: u,
        thumbs: g.__CONFIG_COMMON.thumbs,
        needRevert: u
    });
    g.Tool.ForeColor = g.Class.create({
        $const: {
            __Identity: "forecolor"
        },
        $extend: g.Tool,
        $mixins: [g.I.CookieBaker, g.I.FontTool, g.I.MenuFontTool, g.I.WrappingSpanFontTool],
        beforeOnInitialized: function(e) {
            this.useFavorite = !!e.useFavorite;
            if (this.useFavorite) {
                this.initCookie("txForeColorFavorite")
            }
        },
        createButton: function() {
            var w = this.readCookie() || this.getDefaultProperty();
            var e = this.button = new g.Button.Splits(this.buttonCfg);
            e.setValue(w);
            this.syncButton(w);
            return e
        },
        createMenu: function() {
            return new g.Menu.ColorPallete(this.menuCfg)
        },
        onAfterHandler: function(e) {
            this.syncButton(e);
            if (this.useFavorite) {
                this.writeCookie(e)
            }
        },
        getDefaultProperty: function() {
            return this.canvas.getStyleConfig().color
        },
        getRelatedCssPropertyNames: function() {
            return [this.getCssPropertyName()]
        },
        getCssPropertyName: function() {
            return "color"
        },
        getQueryCommandName: function() {
            return "forecolor"
        },
        computeNewStyle: function(w) {
            var e = {};
            e[this.getCssPropertyName()] = w || this.getDefaultProperty();
            return e
        },
        syncButton: function(w) {
            try {
                if (w) {
                    t.setStyle(this.button.elButton, {
                        backgroundColor: w
                    })
                }
            } catch (x) {}
        }
    });
    p.addTool("backcolor", {
        defaultcolor: "#9aa5ea",
        wysiwygonly: u,
        sync: c,
        status: u,
        useFavorite: u,
        texts: {
            options: [{
                color: "#ff0000",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#e545d0",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#000000",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#ff5e00",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#7c43b1",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#848484",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#ffbb00",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#4673ff",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#66e8ff",
                text: "#000000",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#ffe400",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#1fafda",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#8cfccb",
                text: "#000000",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#a8c40d",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#009999",
                text: "#ffffff",
                label: "\uac00\ub098\ub2e4"
            }, {
                color: "#ffffff",
                text: "#000000",
                label: "\uac00\ub098\ub2e4"
            }]
        },
        thumbs: g.__CONFIG_COMMON.thumbs,
        needRevert: u,
        needTrans: c
    });
    g.Tool.BackColor = g.Class.create({
        $const: {
            __Identity: "backcolor"
        },
        $extend: g.Tool,
        $mixins: [g.I.CookieBaker, g.I.FontTool, g.I.MenuFontTool, g.I.WrappingSpanFontTool],
        beforeOnInitialized: function(e) {
            this.useFavorite = !!e.useFavorite;
            if (this.useFavorite) {
                this.initCookie("txBackColorFavorite")
            }
        },
        createButton: function() {
            var w = this.readCookie() || this.getDefaultProperty();
            var e = this.button = new g.Button.Splits(this.buttonCfg);
            e.setValue(w);
            this.syncButton(w);
            return e
        },
        createMenu: function() {
            return new g.Menu.ColorPallete(this.menuCfg)
        },
        onAfterHandler: function(e) {
            this.syncButton(e);
            if (this.useFavorite) {
                this.writeCookie(e)
            }
        },
        getDefaultProperty: function() {
            return this.config.defaultcolor
        },
        syncButton: function(x) {
            try {
                var w = x ? x.split("|")[0] : i;
                if (w) {
                    t.setStyle(this.button.elButton, {
                        backgroundColor: w
                    })
                }
            } catch (y) {}
        },
        getRelatedCssPropertyNames: function() {
            return ["color", this.getCssPropertyName()]
        },
        getCssPropertyName: function() {
            return "backgroundColor"
        },
        getQueryCommandName: function() {
            return (t.gecko || t.opera) ? "hilitecolor" : "backcolor"
        },
        computeNewStyle: function(w) {
            if (this.shouldRevert(w) || this.includeTextColor(w)) {
                var e = w ? w.split("|") : [];
                return {
                    backgroundColor: e[0],
                    color: e[1]
                }
            }
            return {
                backgroundColor: w
            }
        },
        shouldRevert: function(e) {
            return e == i
        },
        includeTextColor: function(e) {
            return e && (e.indexOf("|") > -1)
        }
    });
    p.addTool("indent", {
        sync: c,
        status: c,
        hotKey: {
            keyCode: 9
        }
    });
    g.Tool.Indent = g.Class.create({
        $const: {
            __Identity: "indent"
        },
        $extend: g.Tool,
        oninitialized: function(e) {
            this.weave(new g.Button(this.buttonCfg), i, this.handler);
            this.bindKeyboard(e.hotKey, this.tabKeyHandler.bind(this));
            this.createHandlers()
        },
        handler: function() {
            var e = this,
                w = e.canvas;
            w.execute(function(x) {
                e.onIndentClicked.handle(x)
            })
        },
        tabKeyHandler: function() {
            var e = this;
            this.canvas.execute(function(w) {
                e.onTabPressed.handle(w)
            })
        },
        createHandlers: function() {
            var A = g.Tool.Indent;
            var z = A.Judge;
            var w = A.Operation;
            var x = A.Handler;
            var B = g.ChainHandler;
            var e = B.connect([new B(z.ListItem, w.IndentListItem), new B(z.BlockNode, w.IndentBlockNode)]);
            var y = B.connect([new B(z.And(z.HeadOfParagraph, z.ListItem), w.IndentListItem), new B(z.ChildOfLastTableCell, w.GoToBelowTable), new B(z.ChildOfTableCell, w.GoToNextCell), new B(z.And(z.HeadOfParagraph, z.BlockNode), w.IndentBlockNode), new B(z.AlwaysTrue, w.AddFourSpaces)]);
            this.onTabPressed = new x(y, e, e);
            this.onIndentClicked = new x(e, e, e)
        }
    });
    g.Tool.Indent.Handler = g.Class.create({
        initialize: function(e, x, A) {
            var y = g.Tool.Indent;
            var z = y.RangeIndenter;
            var w = y.TableCellIndenter;
            this.collapsedRange = new z(e);
            this.selectedRange = new z(x);
            this.tableCellSelected = new w(A)
        },
        handle: function(e) {
            var w = (e.table) ? e.table.getTdArr() : [];
            if (w.length > 0) {
                this.tableCellSelected.indent(e)
            } else {
                if (e.isCollapsed()) {
                    this.collapsedRange.indent(e)
                } else {
                    this.selectedRange.indent(e)
                }
            }
        }
    });
    g.ChainHandler = g.Class.create({
        $const: {
            connect: function(e) {
                var x = e[0];
                for (var w = 1; w < e.length; w++) {
                    e[w - 1].setNext(e[w])
                }
                return x
            }
        },
        initialize: function(e, w) {
            this.judge = e;
            this.executor = w;
            return this
        },
        setNext: function(e) {
            this.successor = e;
            return this.successor
        },
        handle: function() {
            var e = arguments;
            if (this.judge.apply(this, e)) {
                this.executor.apply(this, e)
            } else {
                if (this.successor) {
                    this.successor.handle.apply(this.successor, e)
                }
            }
        }
    });
    (function() {
        g.Tool.Indent.Helper = {
            findBlocksToIndentFromRange: function(z, C, E) {
                var A = E.getCaret(u);
                var y = E.getCaret(c);
                if (C.isCollapsed()) {
                    z.getStartNode();
                    z.getStartOffset();
                    var D = this.findBlockToIndent(A, C);
                    var x = (D.tagName == "P" && D.firstChild == A && D.lastChild == y);
                    if (x) {
                        C.stuffNode(D)
                    }
                    E.restoreInternal();
                    return [D]
                } else {
                    var B = new d.dom.TextRangeIterator(A, 0, y, 0);
                    return this.findBlocksToIndentFromIterator(C, B)
                }
            },
            findBlocksToIndentFromIterator: function(C, B) {
                var y = this;
                var A = y.collectAllNodes(B);
                var z = y.selectLeafNodes(A);
                var x = y.filterUnableToIndent(z);
                var D = x.map(function(E) {
                    return y.findBlockToIndent(E, C)
                });
                D = D.compact().uniq();
                return D
            },
            collectAllNodes: function(y) {
                var x = [];
                d.iter.forEach(y, function(z) {
                    if (!x.contains(z)) {
                        x.push(z)
                    }
                });
                return x
            },
            selectLeafNodes: function(x) {
                var y = [];
                x.each(function(z) {
                    if (z.childNodes.length == 0) {
                        y.push(z)
                    }
                });
                return y
            },
            filterUnableToIndent: function(y) {
                var x = [];
                y.each(function(z) {
                    if (v.kindOf(z, "ul,ol,dl")) {
                        v.removeListIfEmpty(z)
                    } else {
                        if (v.kindOf(z.parentNode, "table") && v.isText(z)) {} else {
                            if (v.kindOf(z.parentNode, "thead,tbody,tfooter") && !v.kindOf(z, "tr")) {} else {
                                if (v.kindOf(z.parentNode, "tr") && !v.kindOf(z, "th,td")) {} else {
                                    if (v.kindOf(z.parentNode, "ul,ol,dl") && !v.kindOf(z, "li,dd,dt")) {} else {
                                        x.push(z)
                                    }
                                }
                            }
                        }
                    }
                });
                return x
            },
            findBlockToIndent: function(x) {
                var y = this.findOrCreateBlockForNode(x);
                return this.findIndentableHigherBlock(y)
            },
            findOrCreateBlockForNode: function(y) {
                if (v.isText(y) || v.kindOf(y, "%inline,img")) {
                    var x = v.ancestor(y, "p,li,dd,dt,h1,h2,h3,h4,h5,h6,div");
                    if (x && v.children(x, "%block").length == 0) {
                        return x
                    } else {
                        x = v.ancestor(y, "%paragraph,pre,noscript,form,hr,address,fieldset,blockquote");
                        return v.wrapInlinesWithP(y, x)
                    }
                } else {
                    return y
                }
            },
            findIndentableHigherBlock: function(z) {
                var x = i;
                var y = z;
                while (y && y.tagName != "BODY") {
                    if (!x && v.kindOf(y, "p,div,h1,h2,h3,h4,h5,h6")) {
                        x = y
                    } else {
                        if (v.kindOf(y, "li,dd,dt")) {
                            return y
                        } else {
                            if (x && v.kindOf(y, "td,th")) {
                                return x
                            }
                        }
                    }
                    y = y.parentNode
                }
                return x
            },
            findAncestorTableCell: function(x) {
                return v.ancestor(x, "td,th")
            },
            findNextCell: function(z) {
                var A = this.findCurrentCell(z);
                var y = v.next(A, "td,th");
                if (!y) {
                    var x = v.next(v.parent(A), "tr");
                    if (x) {
                        y = v.first(x, "td,th")
                    }
                }
                return y
            },
            findPreviousCell: function(y) {
                var z = this.findCurrentCell(y);
                var x = v.previous(z, "td,th");
                if (!x) {
                    var A = v.previous(v.parent(z), "tr");
                    if (A) {
                        x = v.last(A, "td,th")
                    }
                }
                return x
            },
            findCurrentCell: function(x) {
                return v.kindOf(x, "td,th") ? x : this.findAncestorTableCell(x)
            },
            isCaretOnStartOf: function(C, z) {
                var A = z.getStartNode();
                var x = z.getStartOffset();
                while (v.isElement(A) && A.childNodes.length > 0) {
                    A = A.childNodes[x];
                    x = 0
                }
                var B = new d.dom.TextRangeIterator(C, 0, A, x);
                var y = c;
                d.iter.forEach(B, function(D) {
                    if (D.nodeType == 3 && !v.kindOf(D.parentNode, "script,style")) {
                        var E = (D === A) ? D.nodeValue.substring(0, x) : D.nodeValue;
                        E = E.replace(g.__WORD_JOINER_REGEXP, "");
                        y = v.removeMeaninglessSpace(E).length > 0
                    } else {
                        if (v.isElement(D)) {
                            if (v.kindOf(D, "img,embed,iframe")) {
                                y = u
                            }
                        }
                    }
                    if (y) {
                        throw d.iter.StopIteration
                    }
                });
                return !y
            }
        };
        var e = g.Tool.Indent.Helper;
        var w = {};
        g.Tool.Indent.RangeIndenter = g.Class.create({
            initialize: function(x) {
                this.handler = x
            },
            indent: function(y) {
                var x = this;
                y.executeUsingCaret(function(z, B) {
                    var A = e.findBlocksToIndentFromRange(z, y, B);
                    A.each(function(C) {
                        try {
                            x.handler.handle(C, y, z)
                        } catch (D) {
                            if (D == w) {
                                B.dispose()
                            } else {
                                throw D
                            }
                        }
                    })
                })
            }
        });
        g.Tool.Indent.TableCellIndenter = g.Class.create({
            initialize: function(x) {
                this.handler = x
            },
            indent: function(y) {
                var x = this;
                var z = (y.table) ? y.table.getTdArr() : [];
                z.each(function(A) {
                    var C = new d.dom.TagIterator(A);
                    var B = e.findBlocksToIndentFromIterator(y, C);
                    B.each(function(D) {
                        x.handler.handle(D, y, i)
                    })
                })
            }
        });
        g.Tool.Indent.Judge = {
            ChildOfFirstTableCell: function(x) {
                var y = e.findAncestorTableCell(x);
                return y && !e.findPreviousCell(y)
            },
            ChildOfLastTableCell: function(x) {
                var y = e.findAncestorTableCell(x);
                return y && !e.findNextCell(y)
            },
            ChildOfTableCell: function(x) {
                return e.findAncestorTableCell(x)
            },
            ListItem: function(x) {
                return v.kindOf(x, "li") && v.kindOf(x.parentNode, "ol,ul")
            },
            OneDepthList: function(y) {
                if (v.kindOf(y, "li")) {
                    var x = new g.Tool.StyledList.ListBuilder();
                    if (x.countDepthOfList(y) == 1) {
                        return u
                    }
                }
                return c
            },
            IndentedBlockNode: function(x) {
                return v.kindOf(x, "%block") && x.style && x.style.marginLeft != ""
            },
            BlockNode: function(x) {
                return v.kindOf(x, "%block")
            },
            HeadOfParagraph: function(z, y, x) {
                return e.isCaretOnStartOf(z, x)
            },
            And: function(y, x) {
                return function() {
                    return y.apply(this, arguments) && x.apply(this, arguments)
                }
            },
            AlwaysTrue: function() {
                return u
            }
        };
        g.Tool.Indent.Operation = {
            GoToBelowTable: function(z, x) {
                var y = v.ancestor(z, "table");
                x.bookmarkToNext(y);
                throw w
            },
            GoToNextCell: function(z, y) {
                var x = e.findNextCell(z);
                if (x) {
                    y.selectFirstText(x);
                    throw w
                }
            },
            IndentListItem: function(z) {
                var x = v.ancestor(z, "ul,ol,dl");
                if (x) {
                    var y = v.previous(z);
                    var A = v.next(z);
                    if (v.kindOf(y, "ul,ol,dl")) {
                        v.append(y, z)
                    } else {
                        var B = v.clone(x);
                        v.applyStyles(B, {
                            marginLeft: i,
                            paddingLeft: i
                        });
                        v.wrap(B, z)
                    }
                    if (v.kindOf(A, "ul,ol,dl")) {
                        v.moveChild(A, z.parentNode);
                        v.remove(A)
                    }
                }
            },
            getChildrenAsElement: function(z) {
                var B = [];
                var A = z.childNodes;
                for (var y = 0, x = A.length; y < x; y++) {
                    var D = A[y];
                    if (v.isText(D)) {
                        var C = v.wrapInlinesWithP(D, z);
                        B.push(C)
                    } else {
                        if (v.isElement(D)) {
                            B.push(D)
                        }
                    }
                }
                return B
            },
            IndentBlockNode: function(x) {
                v.applyStyles(x, {
                    marginLeft: "+2em"
                })
            },
            AddFourSpaces: function(y, x) {
                x.pasteContent("&nbsp;&nbsp;&nbsp;&nbsp;", c)
            },
            GoToAboveTable: function(z, x) {
                var y = v.ancestor(z, "table");
                x.bookmarkToPrevious(y);
                throw w
            },
            GoToPreviousCell: function(z, x) {
                var y = e.findPreviousCell(z);
                if (y) {
                    x.moveCaretTo(y, u);
                    throw w
                }
            },
            OutdentListItem: function(B, A) {
                var C = v.ancestor(B, "ul,ol,dl");
                if (!C) {
                    return
                }
                var x = C.parentNode;
                if (v.kindOf(x, "li")) {
                    v.unwrap(x);
                    x = C.parentNode
                }
                var E = v.kindOf(x, "ul,ol,dl") ? x : i;
                var z;
                if (E) {
                    z = v.divideNode(C, v.indexOf(B));
                    v.insertAt(B, z)
                } else {
                    z = v.divideNode(C, v.indexOf(B));
                    var y = v.getStyleText(B);
                    var D = A.newNode("p");
                    v.setStyleText(D, y);
                    v.replace(B, D);
                    v.insertAt(D, z)
                }
                v.removeListIfEmpty(C);
                v.removeListIfEmpty(z)
            },
            OutdentBlockNode: function(x) {
                v.applyStyles(x, {
                    marginLeft: "-2em"
                })
            },
            Propagate: function() {
                throw $propagate
            }
        }
    })();
    p.addTool("outdent", {
        sync: c,
        status: c,
        hotKey: {
            shiftKey: u,
            keyCode: 9
        }
    });
    g.Tool.Outdent = g.Class.create({
        $const: {
            __Identity: "outdent"
        },
        $extend: g.Tool,
        oninitialized: function(e) {
            this.weave(new g.Button(this.buttonCfg), i, this.handler);
            this.createHandlers();
            if (t.opera == c) {
                this.observeBackspace()
            }
            this.bindKeyboard(e.hotKey, this.shiftTabKeyHandler.bind(this))
        },
        handler: function() {
            var e = this;
            this.canvas.execute(function(w) {
                e.onOutdentClicked.handle(w)
            })
        },
        shiftTabKeyHandler: function() {
            var e = this;
            this.canvas.execute(function(w) {
                e.onShiftTabPressed.handle(w)
            })
        },
        observeBackspace: function() {
            var w = this.canvas;
            var e = this;
            w.observeKey({
                keyCode: g.__KEY.BACKSPACE
            }, function() {
                w.query(function(x) {
                    e.onBackspace.handle(x)
                })
            })
        },
        createHandlers: function() {
            var e = g.Tool.Indent;
            var x = e.Judge;
            var w = e.Operation;
            var z = e.Handler;
            var C = g.ChainHandler;
            var A = C.connect([new C(x.ListItem, w.OutdentListItem), new C(x.BlockNode, w.OutdentBlockNode)]);
            var y = C.connect([new C(x.AlwaysTrue, w.Propagate)]);
            var D = C.connect([new C(x.ListItem, w.OutdentListItem), new C(x.ChildOfFirstTableCell, w.GoToAboveTable), new C(x.ChildOfTableCell, w.GoToPreviousCell), new C(x.BlockNode, w.OutdentBlockNode)]);
            var B = C.connect([new C(x.And(x.HeadOfParagraph, x.OneDepthList), w.Propagate), new C(x.And(x.HeadOfParagraph, x.ListItem), w.OutdentListItem), new C(x.And(x.HeadOfParagraph, x.IndentedBlockNode), w.OutdentBlockNode), new C(x.AlwaysTrue, w.Propagate)]);
            this.onShiftTabPressed = new z(D, A, A);
            this.onOutdentClicked = new z(A, A, A);
            this.onBackspace = new z(B, y, y)
        }
    });
    g.I.AlignExecution = g.Mixin.create({
        executeAlignImageMode: function(x) {
            var z = this.constructor.__ImageModeProps.image;
            var w = x.getControl();
            if (!w) {
                return
            }
            x.apply(w, z);
            var e = this.constructor.__ImageModeProps.paragraph;
            if (e) {
                var y = v.find(w, "%paragraph");
                x.apply(y, e)
            }
        },
        executeAlignTextMode: function(z) {
            var e = this.constructor.__TextModeProps.paragraph;
            var x = z.getControl();
            if (x && v.kindOf(x, "button")) {
                var B = v.find(x, "%paragraph");
                if (B) {
                    z.apply(B, e)
                }
                var w = v.collect(x, "blockquote");
                if (w) {
                    w.style.margin = this.constructor.__TextModeProps.button["style"]["margin"]
                }
            } else {
                var A = z.blocks(function() {
                    return "%paragraph"
                });
                z.apply(A, e);
                var y = [];
                A.each(function(D) {
                    var C;
                    C = v.collectAll(D, "table,hr");
                    C.each(function(E) {
                        y.push(E)
                    })
                });
                z.apply(y, {
                    align: e.style["textAlign"]
                })
            }
        },
        queryImageFloat: function(w) {
            var e = w.getControl();
            if (e) {
                return w.queryStyle(e, "float")
            } else {
                return i
            }
        },
        queryParaFloat: function(x) {
            var e, w = x.findNode("%paragraph");
            if (w) {
                e = x.queryStyle(w, "float")
            }
            return e || i
        },
        queryTextAlign: function(x) {
            var w = x.findNode("%paragraph");
            var e = x.queryStyle(w, "textAlign");
            if (!e) {
                e = x.queryAttr(w, "align")
            }
            if (!e || e == "start" || e == "auto" || e == "-webkit-auto") {
                e = "left"
            }
            return e
        },
        queryControlAlign: function(e) {
            var w = e.getControl();
            return e.queryAttr(w, "align")
        },
        executeAlign: function(w) {
            var e = this;
            var x = e.getAlignMode(w);
            if (x == "tableCell") {
                e.executeTableCellMode(w)
            } else {
                if (x == "image") {
                    e.executeAlignImageMode(w)
                } else {
                    e.executeAlignTextMode(w)
                }
            }
        },
        getAlignMode: function(w) {
            var e = (w.table) ? w.table.getTdArr() : [];
            if (e.length > 0) {
                return "tableCell"
            } else {
                if (this.imageAlignMode) {
                    return "image"
                } else {
                    return "text"
                }
            }
        },
        executeTableCellMode: function(y) {
            if (!this.indenter) {
                var z = g.Tool.Indent.Judge;
                var A = g.ChainHandler;
                var w = this;

                function e(B) {
                    v.applyAttributes(B, w.constructor.__TextModeProps.paragraph)
                }
                var x = A.connect([new A(z.ListItem, e), new A(z.BlockNode, e)]);
                this.indenter = new g.Tool.Indent.TableCellIndenter(x)
            }
            this.indenter.indent(y)
        },
        syncButtonState: function() {
            var e = this;
            var w = e.canvas.query(function(x) {
                return e.queryCurrentStyle(x)
            });
            e.button.setState(w)
        },
        queryCurrentStyle: function(e) {
            if (this.imageAlignMode) {
                return this.queryImageMode(e)
            }
            return this.queryTextMode(e)
        },
        queryImageMode: function(x) {
            var e = this.constructor.__ImageModeProps;
            var y = this.queryImageFloat(x);
            if (y && y != "none") {
                if (e.image && e.image.style["float"]) {
                    return (y == e.image.style["float"])
                }
            }
            var z = this.queryParaFloat(x);
            if (z && z != "none") {
                if (e.paragraph && e.paragraph.style["float"]) {
                    return (z == e.paragraph.style["float"])
                }
            }
            var w = this.queryTextAlign(x);
            if (e.paragraph && e.paragraph.style.textAlign) {
                return (w == e.paragraph.style.textAlign)
            }
            return c
        },
        queryTextMode: function(x) {
            var y = this.constructor.__TextModeProps;
            var w = y.paragraph.style.textAlign;
            var e = this.queryControlAlign(x);
            if (e == i) {
                var z = this.queryTextAlign(x) || "left";
                return (z == w)
            } else {
                return (e == w)
            }
        }
    });
    (function() {
        p.addTool("alignleft", {
            sync: u,
            status: u,
            hotKey: {
                ctrlKey: u,
                keyCode: 188
            }
        });
        var x = "left";
        var e = "none";
        var y = "none";
        var w = {
            align: i,
            style: {
                textAlign: x
            }
        };
        g.Tool.AlignLeft = g.Class.create({
            $const: {
                __Identity: "alignleft",
                __ImageModeProps: {
                    paragraph: w,
                    image: {
                        style: {
                            clear: y,
                            "float": e,
                            marginLeft: "",
                            marginRight: ""
                        }
                    }
                },
                __TextModeProps: {
                    paragraph: w,
                    button: {
                        style: {
                            margin: "0"
                        }
                    }
                }
            },
            $extend: g.Tool,
            $mixins: [g.I.AlignExecution],
            oninitialized: function(A) {
                var z = this;
                z.imageAlignMode = c;
                z.weave(new g.Button(z.buttonCfg), i, z.handler);
                z.bindKeyboard(A.hotKey, z.handler.bind(z));
                z.startSyncButtonWithStyle()
            },
            handler: function() {
                var z = this;
                var A = z.canvas;
                var B = z.toolbar;
                A.execute(function(C) {
                    z.executeAlign(C);
                    var D = z.getAlignMode(C);
                    if (D == "image") {
                        B.fireJobs(g.Ev.__CMD_ALIGN_IMG_LEFT)
                    } else {
                        if (D == "text") {
                            B.fireJobs(g.Ev.__CMD_ALIGN_LEFT)
                        }
                    }
                });
                A.triggerQueryStatus()
            },
            startSyncButtonWithStyle: function() {
                var z = this;
                z.canvas.observeJob(g.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
                    z.syncButtonState()
                })
            }
        })
    })();
    (function() {
        p.addTool("aligncenter", {
            sync: u,
            status: u,
            hotKey: {
                ctrlKey: u,
                keyCode: 190
            }
        });
        var x = "center";
        var e = "none";
        var y = "none";
        var w = {
            align: i,
            style: {
                textAlign: x
            }
        };
        g.Tool.AlignCenter = g.Class.create({
            $const: {
                __Identity: "aligncenter",
                __ImageModeProps: {
                    paragraph: w,
                    image: {
                        style: {
                            clear: y,
                            "float": e,
                            marginLeft: "",
                            marginRight: ""
                        }
                    }
                },
                __TextModeProps: {
                    paragraph: w,
                    button: {
                        style: {
                            margin: "0 auto"
                        }
                    }
                }
            },
            $extend: g.Tool,
            $mixins: [g.I.AlignExecution],
            oninitialized: function(A) {
                var z = this;
                z.imageAlignMode = c;
                z.weave(new g.Button(z.buttonCfg), i, z.handler);
                z.bindKeyboard(A.hotKey, z.handler.bind(z));
                z.startSyncButtonWithStyle()
            },
            handler: function() {
                var z = this;
                var A = z.canvas;
                var B = z.toolbar;
                A.execute(function(C) {
                    z.executeAlign(C);
                    var D = z.getAlignMode(C);
                    if (D == "image") {
                        B.fireJobs(g.Ev.__CMD_ALIGN_IMG_CENTER)
                    } else {
                        if (D == "text") {
                            B.fireJobs(g.Ev.__CMD_ALIGN_CENTER)
                        }
                    }
                });
                A.triggerQueryStatus()
            },
            startSyncButtonWithStyle: function() {
                var z = this;
                z.canvas.observeJob(g.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
                    z.syncButtonState()
                })
            }
        })
    })();
    (function() {
        p.addTool("alignright", {
            sync: u,
            status: u,
            hotKey: {
                ctrlKey: u,
                keyCode: 191
            }
        });
        var x = "right";
        var e = "left";
        var y = "both";
        var z = "8px";
        var w = "";
        g.Tool.AlignRight = g.Class.create({
            $const: {
                __Identity: "alignright",
                __ImageModeProps: {
                    image: {
                        style: {
                            clear: y,
                            "float": e,
                            marginLeft: w,
                            marginRight: z
                        }
                    }
                },
                __TextModeProps: {
                    paragraph: {
                        align: i,
                        style: {
                            textAlign: x
                        }
                    },
                    button: {
                        style: {
                            margin: "0 0 0 auto"
                        }
                    }
                }
            },
            $extend: g.Tool,
            $mixins: [g.I.AlignExecution],
            oninitialized: function(B) {
                var A = this;
                A.imageAlignMode = c;
                A.weave(new g.Button(A.buttonCfg), i, A.handler);
                A.bindKeyboard(B.hotKey, A.handler.bind(A));
                A.startSyncButtonWithStyle()
            },
            handler: function() {
                var A = this;
                var B = A.canvas;
                var C = A.toolbar;
                B.execute(function(D) {
                    A.executeAlign(D);
                    var E = A.getAlignMode(D);
                    if (E == "image") {
                        C.fireJobs(g.Ev.__CMD_ALIGN_IMG_FLOAT_LEFT)
                    } else {
                        if (E == "text") {
                            C.fireJobs(g.Ev.__CMD_ALIGN_RIGHT)
                        }
                    }
                });
                B.triggerQueryStatus()
            },
            startSyncButtonWithStyle: function() {
                var A = this;
                A.canvas.observeJob(g.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
                    A.syncButtonState()
                })
            }
        })
    })();
    (function() {
        p.addTool("alignfull", {
            sync: u,
            status: u
        });
        var x = "justify";
        var e = "right";
        var y = "both";
        var z = "8px";
        var w = "";
        g.Tool.AlignFull = g.Class.create({
            $const: {
                __Identity: "alignfull",
                __ImageModeProps: {
                    image: {
                        style: {
                            clear: y,
                            "float": e,
                            marginLeft: z,
                            marginRight: w
                        }
                    }
                },
                __TextModeProps: {
                    paragraph: {
                        align: i,
                        style: {
                            textAlign: x
                        }
                    },
                    button: {
                        style: {
                            margin: "0"
                        }
                    }
                }
            },
            $extend: g.Tool,
            $mixins: [g.I.AlignExecution],
            oninitialized: function() {
                var A = this;
                A.imageAlignMode = c;
                A.weave(new g.Button(A.buttonCfg), i, A.handler);
                A.startSyncButtonWithStyle()
            },
            handler: function() {
                var A = this;
                var B = A.canvas;
                var C = A.toolbar;
                B.execute(function(D) {
                    A.executeAlign(D);
                    var E = A.getAlignMode(D);
                    if (E == "image") {
                        C.fireJobs(g.Ev.__CMD_ALIGN_IMG_FLOAT_RIGHT)
                    } else {
                        if (E == "text") {
                            C.fireJobs(g.Ev.__CMD_ALIGN_FULL)
                        }
                    }
                });
                B.triggerQueryStatus()
            },
            startSyncButtonWithStyle: function() {
                var A = this;
                A.canvas.observeJob(g.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
                    A.syncButtonState()
                })
            }
        })
    })();
    p.addTool("insertcells", {
        sync: c,
        status: u,
        options: [{
            label: "\uc704\ub85c \uc0bd\uc785",
            title: "\uc704\ub85c \uc0bd\uc785",
            data: "addRowUpper",
            klass: "tx-insertcells-1"
        }, {
            label: "\uc544\ub798 \uc0bd\uc785",
            title: "\uc544\ub798 \uc0bd\uc785",
            data: "addRowBelow",
            klass: "tx-insertcells-2"
        }, {
            label: "\uc67c\ucabd \uc0bd\uc785",
            title: "\uc67c\ucabd \uc0bd\uc785",
            data: "addColLeft",
            klass: "tx-insertcells-3"
        }, {
            label: "\uc624\ub978\ucabd \uc0bd\uc785",
            title: "\uc624\ub978\ucabd \uc0bd\uc785",
            data: "addColRight",
            klass: "tx-insertcells-4"
        }]
    });
    g.Tool.Insertcells = g.Class.create({
        $const: {
            __Identity: "insertcells"
        },
        $extend: g.Tool,
        oninitialized: function(e) {
            var y = this.canvas;
            var A = y.getStyleConfig().insert;
            var w = (e.options || []);
            var z = {};
            w.each(function(B) {
                z[B.data] = B.title
            });
            var x = function(B) {
                y.query(function(C) {
                    if (C.table) {
                        switch (B) {
                            case "addRowUpper":
                                C.table.insertRowAbove();
                                break;
                            case "addRowBelow":
                                C.table.insertRowBelow();
                                break;
                            case "addColLeft":
                                C.table.insertColLeft();
                                break;
                            case "addColRight":
                                C.table.insertColRight();
                                break
                        }
                    }
                })
            };
            this.weave.bind(this)(new g.Button.Select(p.merge(this.buttonCfg, {
                selectedValue: A
            })), new g.Menu.Select(this.menuCfg), x)
        }
    });
    p.addTool("deletecells", {
        sync: c,
        status: u,
        options: [{
            label: "\ud589 \uc0ad\uc81c",
            title: "\ud589 \uc0ad\uc81c",
            data: "deleteRow",
            klass: "tx-deletecells-1"
        }, {
            label: "\uc5f4 \uc0ad\uc81c",
            title: "\uc5f4 \uc0ad\uc81c",
            data: "deleteCol",
            klass: "tx-deletecells-2"
        }]
    });
    g.Tool.deletecells = g.Class.create({
        $const: {
            __Identity: "deletecells"
        },
        $extend: g.Tool,
        oninitialized: function(e) {
            var x = this.canvas;
            var y = x.getStyleConfig().insert;
            var w = function(z) {
                x.query(function(A) {
                    if (A.table) {
                        switch (z) {
                            case "deleteRow":
                                A.table.deleteRow();
                                break;
                            case "deleteCol":
                                A.table.deleteCol();
                                break
                        }
                    }
                })
            };
            this.weave.bind(this)(new g.Button.Select(p.merge(this.buttonCfg, {
                selectedValue: y
            })), new g.Menu.Select(this.menuCfg), w)
        }
    });
    p.addTool("mergecells", {
        sync: c,
        status: u,
        options: [{
            label: "\ubcd1\ud569",
            title: "\ubcd1\ud569",
            data: "merge",
            klass: "tx-mergecells-1"
        }, {
            label: "\ubd84\ud560",
            title: "\ubd84\ud560",
            data: "cancelmerge",
            klass: "tx-mergecells-2"
        }]
    });
    g.Tool.Mergecells = g.Class.create({
        $const: {
            __Identity: "mergecells"
        },
        $extend: g.Tool,
        oninitialized: function() {
            var w = this.canvas;
            var x = w.getStyleConfig().insert;
            var e = function(y) {
                w.query(function(z) {
                    if (z.table) {
                        switch (y) {
                            case "merge":
                                z.table.merge();
                                break;
                            case "cancelmerge":
                                z.table.resetMerge();
                                break
                        }
                    }
                })
            };
            this.weave.bind(this)(new g.Button.Select(p.merge(this.buttonCfg, {
                selectedValue: x
            })), new g.Menu.Select(this.menuCfg), e)
        }
    });
    j.addMsg({
        "@cellslineheight.subtitle1": "1pt",
        "@cellslineheight.subtitle2": "2pt",
        "@cellslineheight.subtitle3": "3pt",
        "@cellslineheight.subtitle4": "4pt",
        "@cellslineheight.subtitle5": "5pt"
    });
    p.addTool("cellslineheight", {
        sync: c,
        status: u,
        options: [{
            label: TXMSG("@cellslineheight.subtitle1"),
            title: "1pt",
            data: 1,
            klass: "tx-cellslineheight-1"
        }, {
            label: TXMSG("@cellslineheight.subtitle2"),
            title: "2pt",
            data: 2,
            klass: "tx-cellslineheight-2"
        }, {
            label: TXMSG("@cellslineheight.subtitle3"),
            title: "3pt",
            data: 3,
            klass: "tx-cellslineheight-3"
        }, {
            label: TXMSG("@cellslineheight.subtitle4"),
            title: "4pt",
            data: 4,
            klass: "tx-cellslineheight-4"
        }, {
            label: TXMSG("@cellslineheight.subtitle5"),
            title: "5pt",
            data: 5,
            klass: "tx-cellslineheight-5"
        }]
    });
    g.Tool.Cellslineheight = g.Class.create({
        $const: {
            __Identity: "cellslineheight"
        },
        $extend: g.Tool,
        oninitialized: function(w) {
            var e = this;
            e.createListStyleMap(w);
            e.weave(new g.Button.CellslineheightList(e.buttonCfg), new g.Menu.Select(e.menuCfg), e.handler)
        },
        createListStyleMap: function(e) {
            var w = this.listStyleMap = {};
            e.options.each(function(x) {
                w[x.data] = {
                    type: x.type,
                    klass: x.klass
                }
            })
        },
        handler: function(w) {
            var e = this;
            if (!e.listStyleMap[w]) {
                return
            }
            e.canvas.query(function(x) {
                if (x.table) {
                    x.table.setBorderHeight(w)
                }
            })
        },
        getButtonClassByValue: function(w) {
            var e = this.listStyleMap;
            if (e[w]) {
                return e[w].klass
            } else {
                return e[this.getDefaultProperty()].klass
            }
        }
    });
    g.Button.CellslineheightList = g.Class.create({
        $extend: g.Button.Select
    });
    p.addTool("cellslinecolor", {
        defaultcolor: "#7c84ef",
        wysiwygonly: u,
        sync: c,
        status: u,
        useFavorite: u,
        thumbs: g.__CONFIG_COMMON.thumbs,
        needRevert: u
    });
    g.Tool.Cellslinecolor = g.Class.create({
        $const: {
            __Identity: "cellslinecolor"
        },
        $extend: g.Tool,
        oninitialized: function() {
            var w = this.canvas;
            var e = this;
            this.button = new g.Button(this.buttonCfg);
            var x = function(z) {
                y(z);
                w.query(function(A) {
                    if (A.table) {
                        A.table.setBorderColor(z)
                    }
                })
            };
            var y = function(z) {
                if (z) {
                    try {
                        t.setStyle(e.button.elButton, {
                            backgroundColor: z
                        })
                    } catch (A) {}
                }
            };
            y(this.config.defaultcolor);
            this.weave.bind(this)(e.button, new g.Menu.ColorPallete(this.menuCfg), x)
        }
    });
    j.addMsg({
        "@cellslinestyle.subtitle1": "\ud14c\ub450\ub9ac \uc5c6\uc74c",
        "@cellslinestyle.subtitle2": "\uc2e4\uc120",
        "@cellslinestyle.subtitle3": "\uc810\uc120",
        "@cellslinestyle.subtitle4": "\uc791\uc740 \uc810\uc120"
    });
    p.addTool("cellslinestyle", {
        sync: c,
        status: u,
        options: [{
            label: TXMSG("@cellslinestyle.subtitle1"),
            title: "\ud14c\ub450\ub9ac \uc5c6\uc74c",
            data: "none",
            klass: "tx-cellslinestyle-1"
        }, {
            label: TXMSG("@cellslinestyle.subtitle2"),
            title: "\uc2e4\uc120",
            data: "solid",
            klass: "tx-cellslinestyle-2"
        }, {
            label: TXMSG("@cellslinestyle.subtitle3"),
            title: "\uc810\uc120",
            data: "dotted",
            klass: "tx-cellslinestyle-3"
        }, {
            label: TXMSG("@cellslinestyle.subtitle4"),
            title: "\uc791\uc740 \uc810\uc120",
            data: "dashed",
            klass: "tx-cellslinestyle-4"
        }]
    });
    g.Tool.Cellslinestyle = g.Class.create({
        $const: {
            __Identity: "cellslinestyle"
        },
        $extend: g.Tool,
        oninitialized: function(w) {
            var e = this;
            e.createListStyleMap(w);
            e.weave(new g.Button.CellsLineStyledList(e.buttonCfg), new g.Menu.Select(e.menuCfg), e.handler)
        },
        createListStyleMap: function(e) {
            var w = this.listStyleMap = {};
            e.options.each(function(x) {
                w[x.data] = {
                    type: x.type,
                    klass: x.klass
                }
            })
        },
        handler: function(w) {
            var e = this;
            if (!e.listStyleMap[w]) {
                return
            }
            e.canvas.query(function(x) {
                if (x.table) {
                    x.table.setBorderType(w)
                }
            })
        },
        getDefaultProperty: function() {
            return 1
        }
    });
    g.Button.CellsLineStyledList = g.Class.create({
        $extend: g.Button.Select
    });
    p.addTool("cellsoutline", {
        sync: c,
        status: u,
        options: [{
            label: "\ubaa8\ub4e0 \ud14c\ub450\ub9ac",
            title: "\ubaa8\ub4e0 \ud14c\ub450\ub9ac",
            data: "all",
            klass: "tx-cellsoutline-1"
        }, {
            label: "\ubc14\uae65 \ud14c\ub450\ub9ac",
            title: "\ubc14\uae65 \ud14c\ub450\ub9ac",
            data: "out",
            klass: "tx-cellsoutline-2"
        }, {
            label: "\uc548\ucabd \ud14c\ub450\ub9ac",
            title: "\uc548\ucabd \ud14c\ub450\ub9ac",
            data: "in",
            klass: "tx-cellsoutline-3"
        }, {
            label: "\uc704\ucabd \ud14c\ub450\ub9ac",
            title: "\uc704\ucabd \ud14c\ub450\ub9ac",
            data: "top",
            klass: "tx-cellsoutline-4"
        }, {
            label: "\uc544\ub798\ucabd \ud14c\ub450\ub9ac",
            title: "\uc544\ub798\ucabd \ud14c\ub450\ub9ac",
            data: "bottom",
            klass: "tx-cellsoutline-5"
        }, {
            label: "\uc67c\ucabd \ud14c\ub450\ub9ac",
            title: "\uc67c\ucabd \ud14c\ub450\ub9ac",
            data: "left",
            klass: "tx-cellsoutline-6"
        }, {
            label: "\uc624\ub978\ucabd \ud14c\ub450\ub9ac",
            title: "\uc624\ub978\ucabd \ud14c\ub450\ub9ac",
            data: "right",
            klass: "tx-cellsoutline-7"
        }, {
            label: "\ud14c\ub450\ub9ac \uc5c6\uc74c",
            title: "\ud14c\ub450\ub9ac \uc5c6\uc74c",
            data: "none",
            klass: "tx-cellsoutline-8"
        }]
    });
    g.Tool.Cellsoutline = g.Class.create({
        $const: {
            __Identity: "cellsoutline"
        },
        $extend: g.Tool,
        oninitialized: function(w) {
            var e = this;
            this.twinkleCount = 0;
            this.twinkleTimer = i;
            e.createListStyleMap(w);
            e.weave(new g.Button.CellsoutlineList(e.buttonCfg), new g.Menu.Select(e.menuCfg), e.handler);
            this.toolbar.observeJob(g.Ev.__TOOL_CELL_LINE_CHANGE, function(x) {
                if (x.fromInit != u) {
                    e.twinkleButton()
                }
            })
        },
        createListStyleMap: function(e) {
            var w = this.listStyleMap = {};
            e.options.each(function(x) {
                w[x.data] = {
                    type: x.type,
                    klass: x.klass
                }
            })
        },
        handler: function(w) {
            var e = this;
            if (!e.listStyleMap[w]) {
                return
            }
            e.canvas.query(function(x) {
                if (x.table) {
                    x.table.setBorderRange(w)
                }
            });
            e.canvas.execute(function(x) {
                if (x.table) {
                    if (w == "none") {
                        x.table.setNoBorder()
                    } else {
                        x.table.applyBorder()
                    }
                }
            })
        },
        twinkleButton: function() {
            var e;
            e = this;
            if (this.twinkleTimer) {
                clearInterval(this.twinkleTimer);
                this.twinkleTimer = i
            }
            this.twinkleCount = 4;
            this.twinkleTimer = setInterval(function() {
                if (0 < e.twinkleCount) {
                    e.twinkleCount -= 1;
                    if (e.button.currentState() == "hovered") {
                        e.button.normalState()
                    } else {
                        e.button.hoveredState()
                    }
                } else {
                    e.button.normalState();
                    clearInterval(e.twinkleTimer);
                    e.twinkleTimer = i
                }
            }, 500)
        }
    });
    g.Button.CellsoutlineList = g.Class.create({
        $extend: g.Button.Select
    });
    g.MarkupTemplate.add("cellsline.preview", ['<table width="#{width}" cellPadding="0" style="line-height:0"><tbody><tr>', '<td valign="center" height="#{height}">', '<div style="border-bottom:#{value};width:#{width}px;height:2px;overflow:hidden;"></div>', "</td>", "</tr></tbody></table>"].join(""));
    p.addTool("cellslinepreview", {
        sync: c,
        status: u,
        options: [{
            label: g.MarkupTemplate.get("cellsline.preview").evaluate({
                value: "1pt solid #ccc",
                width: 70,
                height: 14
            }),
            title: "1pt solid #ccc",
            data: "#ccc 1 solid"
        }, {
            label: g.MarkupTemplate.get("cellsline.preview").evaluate({
                value: "2pt solid #c54",
                width: 70,
                height: 14
            }),
            title: "2pt solid #c54",
            data: "#c54 2 solid"
        }, {
            label: g.MarkupTemplate.get("cellsline.preview").evaluate({
                value: "2pt solid #67f",
                width: 70,
                height: 14
            }),
            title: "2pt solid #67f",
            data: "#67f 2 solid"
        }, {
            label: g.MarkupTemplate.get("cellsline.preview").evaluate({
                value: "3pt solid #000",
                width: 70,
                height: 14
            }),
            title: "3pt solid #000",
            data: "#000 3 solid"
        }, {
            label: g.MarkupTemplate.get("cellsline.preview").evaluate({
                value: "1pt dashed #d4c",
                width: 70,
                height: 14
            }),
            title: "1pt dashed #d4c",
            data: "#d4c 1 dashed"
        }]
    });
    g.Tool.Cellslinepreview = g.Class.create({
        $const: {
            __Identity: "cellslinepreview"
        },
        $extend: g.Tool,
        oninitialized: function(w) {
            var e = this;
            this.data = {
                color: "",
                height: 0,
                type: ""
            };
            this.weave(new g.Button.CellslinepreviewList(this.buttonCfg), new g.Menu.Select(this.menuCfg), this.handler);
            this.toolbar.observeJob(g.Ev.__TOOL_CELL_LINE_CHANGE, function(x) {
                e.setData(x);
                e.refreshPreview()
            })
        },
        setData: function(e) {
            if ("color" in e) {
                this.data.color = e.color
            }
            if ("height" in e) {
                this.data.height = e.height
            }
            if ("type" in e) {
                this.data.type = e.type
            }
        },
        refreshPreview: function() {
            var e;
            e = this.data;
            text = e.height + "pt " + e.type + " " + e.color;
            this.setPreview(text)
        },
        setPreview: function(e) {
            this.button.elText.innerHTML = g.MarkupTemplate.get("cellsline.preview").evaluate({
                value: e,
                width: 43,
                height: 14
            })
        },
        addBorderHistory: function(e) {
            this.setData(e);
            this.refreshPreview()
        },
        handler: function(x, y) {
            var e = this,
                w = e.canvas;
            w.execute(function(A) {
                var z;
                if (A.table) {
                    z = x.split(" ");
                    A.table.setBorderButtons(z[0], z[1], z[2])
                }
            })
        }
    });
    g.Button.CellslinepreviewList = g.Class.create({
        $extend: g.Button.Select,
        setText: function(e) {
            this.tool.setPreview(e)
        }
    });
    p.addTool("tablebackcolor", {
        defaultcolor: "#9aa5ea",
        wysiwygonly: u,
        sync: c,
        status: u,
        useFavorite: u,
        thumbs: g.__CONFIG_COMMON.thumbs,
        needRevert: u
    });
    g.Tool.Tablebackcolor = g.Class.create({
        $const: {
            __Identity: "tablebackcolor"
        },
        $extend: g.Tool,
        oninitialized: function() {
            var x = this.canvas;
            var e = this;
            e.button = new g.Button(this.buttonCfg);
            var w = function(z) {
                x.query(function(A) {
                    if (A.table) {
                        A.table.tableBackground(z)
                    }
                });
                y(z)
            };
            var y = function(z) {
                try {
                    if (z) {
                        t.setStyle(e.button.elButton, {
                            backgroundColor: z
                        })
                    }
                } catch (A) {}
            };
            this.weave.bind(this)(e.button, new g.Menu.ColorPallete(this.menuCfg), w)
        }
    });
    p.addTool("tableedittool", {
        sync: c,
        status: u,
        opened: c
    });
    g.Tool.TableEditTool = g.Class.create({
        $const: {
            __Identity: "tableedittool"
        },
        $extend: g.Tool,
        oninitialized: function(w) {
            var e = this.toolbar;
            var A = e.el;
            var z = v.collect(A.parentNode, "div.tx-toolbar-advanced");
            if (!z) {
                return
            }
            e.observeJob("toolbar.advanced.fold", function() {
                t.hide(z);
                t.removeClassName(A, "tx-toolbar-basic-open")
            });
            e.observeJob("toolbar.advanced.spread", function() {
                t.show(z);
                t.addClassName(A, "tx-toolbar-basic-open")
            });
            var y = c;
            var x = function() {
                if (y) {
                    e.fireJobs("toolbar.advanced.fold")
                } else {
                    e.fireJobs("toolbar.advanced.spread")
                }
                y = !y
            };
            this.weave.bind(this)(new g.Button(this.buttonCfg), i, x);
            if (w.opened == u) {
                z.show();
                t.addClassName(A, "tx-toolbar-basic-open");
                y = u
            }
        }
    });
    p.addTool("tabletemplate", {
        sync: c,
        status: u,
        rows: 5,
        cols: 9,
        options: [{
            label: "image",
            data: 1,
            klass: "tx-tabletemplate-1"
        }, {
            label: "image",
            data: 2,
            klass: "tx-tabletemplate-2"
        }, {
            label: "image",
            data: 3,
            klass: "tx-tabletemplate-3"
        }, {
            label: "image",
            data: 4,
            klass: "tx-tabletemplate-4"
        }, {
            label: "image",
            data: 5,
            klass: "tx-tabletemplate-5"
        }, {
            label: "image",
            data: 6,
            klass: "tx-tabletemplate-6"
        }, {
            label: "image",
            data: 7,
            klass: "tx-tabletemplate-7"
        }, {
            label: "image",
            data: 8,
            klass: "tx-tabletemplate-8"
        }, {
            label: "image",
            data: 9,
            klass: "tx-tabletemplate-9"
        }, {
            label: "image",
            data: 10,
            klass: "tx-tabletemplate-10"
        }, {
            label: "image",
            data: 11,
            klass: "tx-tabletemplate-11"
        }, {
            label: "image",
            data: 12,
            klass: "tx-tabletemplate-12"
        }, {
            label: "image",
            data: 13,
            klass: "tx-tabletemplate-13"
        }, {
            label: "image",
            data: 14,
            klass: "tx-tabletemplate-14"
        }, {
            label: "image",
            data: 15,
            klass: "tx-tabletemplate-15"
        }, {
            label: "image",
            data: 16,
            klass: "tx-tabletemplate-16"
        }, {
            label: "image",
            data: 17,
            klass: "tx-tabletemplate-17"
        }, {
            label: "image",
            data: 18,
            klass: "tx-tabletemplate-18"
        }, {
            label: "image",
            data: 19,
            klass: "tx-tabletemplate-19"
        }, {
            label: "image",
            data: 20,
            klass: "tx-tabletemplate-20"
        }, {
            label: "image",
            data: 21,
            klass: "tx-tabletemplate-21"
        }, {
            label: "image",
            data: 22,
            klass: "tx-tabletemplate-22"
        }, {
            label: "image",
            data: 23,
            klass: "tx-tabletemplate-23"
        }, {
            label: "image",
            data: 24,
            klass: "tx-tabletemplate-24"
        }, {
            label: "image",
            data: 25,
            klass: "tx-tabletemplate-25"
        }, {
            label: "image",
            data: 26,
            klass: "tx-tabletemplate-26"
        }, {
            label: "image",
            data: 27,
            klass: "tx-tabletemplate-27"
        }, {
            label: "image",
            data: 28,
            klass: "tx-tabletemplate-28"
        }, {
            label: "image",
            data: 29,
            klass: "tx-tabletemplate-29"
        }, {
            label: "image",
            data: 30,
            klass: "tx-tabletemplate-30"
        }, {
            label: "image",
            data: 31,
            klass: "tx-tabletemplate-31"
        }, {
            label: "image",
            data: 32,
            klass: "tx-tabletemplate-32"
        }, {
            label: "image",
            data: 33,
            klass: "tx-tabletemplate-33"
        }, {
            label: "image",
            data: 34,
            klass: "tx-tabletemplate-34"
        }, {
            label: "image",
            data: 35,
            klass: "tx-tabletemplate-35"
        }, {
            label: "image",
            data: 36,
            klass: "tx-tabletemplate-36"
        }, {
            label: "image",
            data: 37,
            klass: "tx-tabletemplate-37"
        }, {
            label: "image",
            data: 38,
            klass: "tx-tabletemplate-38"
        }, {
            label: "image",
            data: 39,
            klass: "tx-tabletemplate-39"
        }, {
            label: "image",
            data: 40,
            klass: "tx-tabletemplate-40"
        }, {
            label: "image",
            data: 41,
            klass: "tx-tabletemplate-41"
        }, {
            label: "image",
            data: 42,
            klass: "tx-tabletemplate-42"
        }, {
            label: "image",
            data: 43,
            klass: "tx-tabletemplate-43"
        }, {
            label: "image",
            data: 44,
            klass: "tx-tabletemplate-44"
        }, {
            label: "image",
            data: 45,
            klass: "tx-tabletemplate-45"
        }]
    });
    g.Tool.Tabletemplate = g.Class.create({
        $const: {
            __Identity: "tabletemplate"
        },
        $extend: g.Tool,
        oninitialized: function(w) {
            var e = this;
            var y = this.canvas;
            var z = {};
            w.options.each(function(A) {
                z[A.data] = {
                    type: A.type
                }
            });
            var x = function(B) {
                if (!z[B]) {
                    return
                }
                var A = i;
                y.execute(function(C) {
                    if (C.table) {
                        A = C.findNode("table");
                        C.table.setTemplateStyle(A, B)
                    }
                })
            };
            this.weave.bind(this)(new g.Button(this.buttonCfg), new g.Menu.List(this.menuCfg), x)
        }
    });
    p.addTool("lineheight", {
        sync: c,
        status: u,
        options: [{
            label: "50%",
            title: "50%",
            data: "0.5"
        }, {
            label: "80%",
            title: "80%",
            data: "0.8"
        }, {
            label: "100%",
            title: "100%",
            data: "1.0"
        }, {
            label: "120%",
            title: "120%",
            data: "1.2"
        }, {
            label: "150%",
            title: "150%",
            data: "1.5"
        }, {
            label: "180%",
            title: "180%",
            data: "1.8"
        }, {
            label: "200%",
            title: "200%",
            data: "2.0"
        }]
    });
    g.Tool.LineHeight = g.Class.create({
        $const: {
            __Identity: "lineheight"
        },
        $extend: g.Tool,
        oninitialized: function(e) {
            var y = this.canvas;
            var A = y.getStyleConfig().lineHeight;
            var w = (e.options || []);
            var z = {};
            w.each(function(B) {
                z[B.data] = B.title
            });
            var x = function(B) {
                y.execute(function(C) {
                    var D = C.blocks(function() {
                        return "%paragraph"
                    });
                    C.apply(D, {
                        style: {
                            lineHeight: B
                        }
                    })
                })
            };
            this.weave.bind(this)(new g.Button.Select(p.merge(this.buttonCfg, {
                selectedValue: A
            })), new g.Menu.Select(this.menuCfg), x)
        }
    });
    j.addMsg({
        "@styledlist.subtitle1": "\ucde8\uc18c",
        "@styledlist.subtitle2": "\ub3d9\uadf8\ub77c\ubbf8",
        "@styledlist.subtitle3": "\ub124\ubaa8",
        "@styledlist.subtitle4": "\uc22b\uc790",
        "@styledlist.subtitle5": "\ub85c\ub9c8\uc22b\uc790",
        "@styledlist.subtitle6": "\uc54c\ud30c\ubcb3"
    });
    p.addTool("styledlist", {
        status: u,
        options: [{
            label: TXMSG("@styledlist.subtitle1"),
            title: "cancel",
            type: "cancel",
            data: "cancel",
            klass: "tx-styledlist-0"
        }, {
            label: TXMSG("@styledlist.subtitle2"),
            title: "disc",
            type: "ul",
            data: "disc",
            klass: "tx-styledlist-1"
        }, {
            label: TXMSG("@styledlist.subtitle3"),
            title: "square",
            type: "ul",
            data: "square",
            klass: "tx-styledlist-2"
        }, {
            label: TXMSG("@styledlist.subtitle4"),
            title: "decimal",
            type: "ol",
            data: "decimal",
            klass: "tx-styledlist-3"
        }, {
            label: TXMSG("@styledlist.subtitle5"),
            title: "upper-roman",
            type: "ol",
            data: "upper-roman",
            klass: "tx-styledlist-4"
        }, {
            label: TXMSG("@styledlist.subtitle6"),
            title: "upper-alpha",
            type: "ol",
            data: "upper-alpha",
            klass: "tx-styledlist-5"
        }],
        hotKey: {
            ul: {
                ctrlKey: u,
                altKey: u,
                keyCode: 85
            },
            ol: {
                ctrlKey: u,
                altKey: u,
                keyCode: 79
            }
        }
    });
    g.Tool.StyledList = g.Class.create({
        $const: {
            __Identity: "styledlist"
        },
        $extend: g.Tool,
        oninitialized: function(w) {
            var e = this;
            e.createListStyleMap(w);
            e.weave(new g.Button.StyledList(e.buttonCfg), new g.Menu.Select(e.menuCfg), e.handler, e.menuInitHandler.bind(e));
            e.indentHelper = g.Tool.Indent.Helper;
            e.bindKeyboard(w.hotKey.ul, e.handler.bind(e, "disc"));
            e.bindKeyboard(w.hotKey.ol, e.handler.bind(e, "decimal"));
            e.startSyncButtonWithStyle()
        },
        createListStyleMap: function(e) {
            var w = this.listStyleMap = {};
            e.options.each(function(x) {
                w[x.data] = {
                    type: x.type,
                    klass: x.klass
                }
            })
        },
        handler: function(x) {
            var w = this;
            if (!w.listStyleMap[x]) {
                return
            }
            var e = w.listStyleMap[x].type;
            var y = {
                listStyleType: x
            };
            w.canvas.execute(function(z) {
                if (e == "cancel") {
                    w.outdentListItem(z)
                } else {
                    w.createListFromSelection(z, e, y)
                }
            })
        },
        outdentListItem: function(e) {
            e.executeUsingCaret(function(w, y) {
                var x = g.Tool.Indent.Helper.findBlocksToIndentFromRange(w, e, y);
                x.each(function(z) {
                    g.Tool.Indent.Operation.OutdentListItem(z, e)
                })
            })
        },
        createListFromSelection: function(x, w, y) {
            var e = this;
            x.executeUsingCaret(function(z, C) {
                var B = e.indentHelper.findBlocksToIndentFromRange(z, x, C);
                var A = e.groupEachList(B);
                A.each(function(E) {
                    var D = new g.Tool.StyledList.ListBuilder(x, w, y);
                    D.createListForNodes(E)
                })
            });
            this._removeBrInListItemForIE(x)
        },
        _removeBrInListItemForIE: function(x) {
            if (t.msie_docmode >= 11) {
                var e = x.createGoogRange();
                var w = e.getStartNode();
                if (e.isCollapsed() && v.isElement(w) && v.isElement(w.firstChild) && v.isTagName(w.firstChild, "br")) {
                    v.remove(w.firstChild);
                    w.appendChild(x.newText(""))
                }
            }
        },
        groupEachList: function(w) {
            var e = this.indentHelper;
            var z = [];
            var y = [];
            var x = i;
            w.each(function(A) {
                var B = e.findCurrentCell(A);
                if (B != x) {
                    if (y.length > 0) {
                        z.push(y);
                        y = []
                    }
                    x = B
                }
                y.push(A)
            });
            if (y.length > 0) {
                z.push(y)
            }
            return z
        },
        menuInitHandler: function() {
            var e = this.canvas.query(function(x) {
                return !!x.findNode("%listhead")
            });
            var w = v.collect(this.menu.elMenu, "li");
            if (e) {
                t.show(w)
            } else {
                t.hide(w)
            }
        },
        startSyncButtonWithStyle: function() {
            var e = this;
            var w = e.canvas;
            var x = e.getDefaultProperty();
            w.observeJob(g.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
                var z = w.query(function(A) {
                    var B = A.findNode("%listhead");
                    return A.queryStyle(B, "listStyleType")
                });
                z = z || e.getDefaultProperty();
                if (x == z) {
                    return
                }
                var y = e.getButtonClassByValue(z);
                e.button.setText(y);
                x = z
            })
        },
        getDefaultProperty: function() {
            return "decimal"
        },
        getButtonClassByValue: function(w) {
            var e = this.listStyleMap;
            if (e[w]) {
                return e[w].klass
            } else {
                return e[this.getDefaultProperty()].klass
            }
        }
    });
    g.Button.StyledList = g.Class.create({
        $extend: g.Button.Select,
        setText: function(e) {
            this.elIcon.className = "tx-icon " + e
        }
    });
    g.Tool.StyledList.ListBuilder = g.Class.create({
        currentDepth: i,
        prepared: c,
        listElement: i,
        uselessListCandidate: [],
        processor: i,
        initialize: function(w, e, x) {
            this.processor = w;
            this.listTag = e;
            this.listStyle = x
        },
        createListForNodes: function(w) {
            var e = this;
            var x = e.getNodeDepthList(w);
            x.each(function(y) {
                var z = y.node;
                var A = y.depth;
                if (!e.prepared) {
                    e.prepareRootList(z, A)
                }
                e.adjustDepth(z, A);
                e.appendAsListItem(z)
            });
            e.cleanupEmptyList()
        },
        getNodeDepthList: function(w) {
            var e = this;
            return w.map(function(x) {
                return {
                    node: x,
                    depth: e.countDepthOfList(x)
                }
            })
        },
        countDepthOfList: function(x) {
            var w = 0;
            var e = v.parent(x);
            while (e && !v.isBody(e)) {
                if (v.kindOf(e, "ol,ul")) {
                    w++
                } else {
                    if (v.kindOf(e, "th,td")) {
                        break
                    }
                }
                e = v.parent(e)
            }
            return (w || 1)
        },
        prepareRootList: function(x, y) {
            var e = this;
            e.listElement = e.createNewList();
            var w;
            if (x.tagName == "LI") {
                e.uselessListCandidate.push(x.parentNode);
                w = v.divideNode(x.parentNode, v.indexOf(x))
            } else {
                w = x
            }
            v.insertAt(e.listElement, w);
            e.currentDepth = y;
            e.listDepth = y;
            e.prepared = u
        },
        adjustDepth: function(w, x) {
            var e = this;
            while (x != e.currentDepth) {
                if (x > e.currentDepth) {
                    e.increaseDepth()
                } else {
                    e.decreaseDepth()
                }
            }
        },
        increaseDepth: function() {
            var w = this;
            var x = w.listElement;
            w.currentDepth++;
            var e = w.createNewList();
            x.appendChild(e);
            w.listElement = e
        },
        decreaseDepth: function() {
            var e = this;
            var x = e.listElement;
            e.currentDepth--;
            if (e.listDepth > e.currentDepth) {
                e.uselessListCandidate.push(x.parentNode);
                var y = v.divideNode(x.parentNode, v.indexOf(x));
                var w = e.createNewList();
                v.insertAt(w, y);
                w.appendChild(x)
            }
            e.listElement = x.parentNode
        },
        createNewList: function() {
            var e = this;
            var w = e.processor.newNode(e.listTag);
            t.setStyle(w, e.listStyle);
            return w
        },
        cleanupEmptyList: function() {
            this.uselessListCandidate.each(function(e) {
                v.removeListIfEmpty(e)
            })
        },
        wrapWithListItem: function(x) {
            if (x.tagName == "LI") {
                return x
            } else {
                if (x.tagName == "P" || (t.webkit && x.tagName == "DIV")) {
                    var w = this.createListItem();
                    v.applyStyles(x, {
                        marginLeft: i
                    });
                    if (v.getStyleText(x)) {
                        v.wrap(w, x);
                        return w
                    } else {
                        return v.replace(x, w)
                    }
                } else {
                    var e = this.createListItem();
                    e.appendChild(x);
                    return e
                }
            }
        },
        createListItem: function() {
            return this.processor.newNode("li")
        },
        appendAsListItem: function(w) {
            var e = this.wrapWithListItem(w);
            if (v.kindOf(w.parentNode, "%listhead")) {
                this.uselessListCandidate.push(w.parentNode)
            }
            this.listElement.appendChild(e)
        }
    });
    p.addTool("link", {
        wysiwygonly: u,
        sync: c,
        status: u
    });
    j.addMsg({
        "@insertlink.cancel.image": "#iconpath/btn_cancel.gif?v=2",
        "@insertlink.confirm.image": "#iconpath/btn_confirm.gif?v=2",
        "@insertlink.invalid.url": "URL\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",
        "@insertlink.link.alt": "[#{title}]\ub85c \uc774\ub3d9\ud569\ub2c8\ub2e4.",
        "@insertlink.remove.image": "#iconpath/btn_remove.gif?v=2",
        "@insertlink.title": "\uc120\ud0dd\ub41c \ubd80\ubd84\uc5d0 \uac78\ub9b4 URL\uc8fc\uc18c\ub97c \ub123\uc5b4\uc8fc\uc138\uc694.",
        "@insertlink.onclick.target": "\ud074\ub9ad \uc2dc",
        "@insertlink.target.blank": "\uc0c8 \ucc3d",
        "@insertlink.target.self": "\ud604\uc7ac\ucc3d",
        "@insertlink.class.name": "tx-link"
    });
    g.Tool.Link = g.Class.create({
        $const: {
            __Identity: "link"
        },
        $extend: g.Tool,
        oninitialized: function() {
            var e = this;
            var A = this.canvas;
            var y = function(B) {
                if (A.isWYSIWYG()) {
                    if (B) {
                        A.execute(function(C) {
                            var F = {
                                href: B.link,
                                target: B.target ? B.target : "_blank",
                                className: B.className
                            };
                            var E, D;
                            if (C.findNode("a")) {
                                E = C.findNode("a");
                                v.applyAttributes(E, F)
                            } else {
                                if (C.hasControl()) {
                                    D = C.controls(function() {
                                        return "img"
                                    });
                                    v.wrap(C.create("a", F), D)
                                } else {
                                    if (C.isCollapsed()) {
                                        E = C.create("a", F);
                                        E.innerHTML = B.link;
                                        C.pasteNode(E, c)
                                    } else {
                                        D = C.inlines(function() {
                                            return "%text,img,a,%inline"
                                        });
                                        D.each(function(G) {
                                            if (v.hasUsefulChildren(G, u)) {
                                                if (v.kindOf(G, "a")) {
                                                    v.applyAttributes(G, F)
                                                } else {
                                                    if (v.kindOf(G, "img")) {
                                                        v.wrap(C.create("a", F), [G])
                                                    } else {
                                                        var I = v.getStyleText(G);
                                                        var J = v.collectAll(G, "a");
                                                        J.each(function(K) {
                                                            v.moveChildToParent(K);
                                                            v.remove(K)
                                                        });
                                                        var H = C.create("a", F);
                                                        v.setStyleText(H, I);
                                                        v.replace(G, H)
                                                    }
                                                }
                                            } else {
                                                v.remove(G)
                                            }
                                        })
                                    }
                                }
                            }
                        })
                    } else {
                        A.execute(function(D) {
                            var C = D.findNode("a");
                            if (C) {
                                D.unwrap(C)
                            }
                        })
                    }
                } else {
                    A.execute(function(C) {
                        C.insertTag('<a href="' + B.link + '" target="' + B.target + '" >', "</a>")
                    })
                }
            };
            var x = "";
            var w = function() {
                if (A.isWYSIWYG()) {
                    return A.query(function(B) {
                        var C, D, E, F;
                        C = B.findNode("a");
                        if (C) {
                            D = v.getAttribute(C, "href");
                            if (D) {
                                E = v.getAttribute(C, "target");
                                return {
                                    exist: u,
                                    value: D,
                                    target: E
                                }
                            }
                        } else {
                            F = B.getText();
                            if (/^\w+\:\/\/\S+/.test(F)) {
                                return {
                                    exist: c,
                                    value: F
                                }
                            }
                        }
                        return {
                            exist: c,
                            value: x
                        }
                    })
                } else {
                    return {
                        exist: c,
                        value: x
                    }
                }
            };
            this.weave.bind(this)(new g.Button(this.buttonCfg), new g.Menu.Link(this.menuCfg), y, w);
            var z = function(B) {
                e.button.onMouseDown(B)
            };
            this.bindKeyboard({
                ctrlKey: u,
                keyCode: 75
            }, z)
        }
    });
    g.MarkupTemplate.add("menu.insertlink", ['<div class="tx-menu-inner">', "    <dl>", "        <dt>", "            @insertlink.title", "        </dt>", "        <dd>", '            <input type="text" class="tx-text-input"/>', "        </dd>", '        <dd class="tx-rp">', '            <span class="tx-text tx-first">@insertlink.onclick.target</span>', '            <span><input type="radio" name="tx-insertlink-win" value="_blank"/><span class="tx-text">@insertlink.target.blank</span></span>', '            <span><input type="radio" name="tx-insertlink-win" value="_top"/><span class="tx-text">@insertlink.target.self</span></span>', "        </dd>", '        <dd class="tx-hr">', "            <hr/>", "        </dd>", "        <dd>", '            <img width="32" height="21" src="@insertlink.confirm.image"/>', '            <img width="32" height="21" src="@insertlink.cancel.image"/>', '            <img width="51" height="21" src="@insertlink.remove.image" style="display: none;"/>', "        </dd>", "    </dl>", "</div>"].join(""));
    g.Menu.Link = g.Class.create({
        $extend: g.Menu,
        ongenerated: function() {
            var B = this.elMenu;
            g.MarkupTemplate.get("menu.insertlink").evaluateToDom({}, B);
            var e = v.collectAll(B, ".tx-rp input");
            var w = this.newInput = e[0];
            t.observe(w, "click", function() {
                w.checked = "checked";
                z.checked = ""
            });
            var z = this.currInput = e[1];
            t.observe(z, "click", function() {
                z.checked = "checked";
                w.checked = ""
            });
            var y = this.urlValidator;
            var A = this.elInput = v.collect(B, "input.tx-text-input");
            t.observe(A, "keydown", function(E) {
                if (E.keyCode == 13) {
                    var F = y(A.value);
                    if (!F) {
                        alert(TXMSG("@insertlink.invalid.url"));
                        t.stop(E);
                        return
                    }
                    var D = w.checked ? w.value : z.value;
                    this.onSelect(E, {
                        link: F,
                        target: D,
                        className: TXMSG("@insertlink.class.name")
                    });
                    t.stop(E)
                }
            }.bindAsEventListener(this));
            var C = v.collectAll(B, "img");
            t.observe(C[0], "click", function(E) {
                var F = y(A.value);
                if (!F) {
                    alert(TXMSG("@insertlink.invalid.url"));
                    t.stop(E);
                    return
                }
                var D = w.checked ? w.value : z.value;
                this.onSelect(E, {
                    link: F,
                    target: D,
                    className: TXMSG("@insertlink.class.name")
                });
                t.stop(E)
            }.bind(this));
            t.observe(C[1], "click", function() {
                this.onCancel()
            }.bindAsEventListener(this));
            var x = t(C[2]);
            t.observe(x, "click", function(D) {
                this.onSelect(D, i)
            }.bindAsEventListener(this));
            this.toggleRemoveBtn = function(D) {
                x.style.display = ((D) ? "" : "none")
            }
        },
        onregenerated: function() {
            var w = this.elInput;
            var e = this.initHandler();
            w.value = e.value;
            if (e.target == "_self" || e.target == "_top") {
                this.currInput.checked = "checked";
                this.newInput.checked = ""
            } else {
                this.newInput.checked = "checked";
                this.currInput.checked = ""
            }
            this.toggleRemoveBtn(e.exist);
            w.focus();
            if (t.msie_nonstd) {
                setTimeout(function() {
                    try {
                        w.focus();
                        var x = b.selection.createRange();
                        x.move("character", w.value.length);
                        x.select()
                    } catch (y) {}
                }, 100)
            }
        },
        urlValidator: function(w) {
            if (!w) {
                return c
            }
            w = w.trim();
            if (w.length == 0) {
                return c
            }
            var e = /^[a-z0-9+.-]+:|^\/\//i;
            if (e.test(w)) {
                return w
            } else {
                return "http://" + w
            }
        }
    });
    p.addTool("richtextbox", {
        sync: c,
        status: u,
        rows: 4,
        cols: 6,
        borderwidth: 1,
        bordercolor: "#cbcbcb",
        bgcolor: "#ffffff",
        padding: "10px",
        styles: [{
            klass: "",
            image: "#iconpath/textbox/thum_line01.gif?v=2",
            data: "solid"
        }, {
            klass: "",
            image: "#iconpath/textbox/thum_line02.gif?v=2",
            data: "double"
        }, {
            klass: "",
            image: "#iconpath/textbox/thum_line03.gif?v=2",
            data: "dashed"
        }, {
            klass: "",
            image: "#iconpath/textbox/thum_line04.gif?v=2",
            data: "none"
        }],
        options: g.__CONFIG_COMMON.textbox.options,
        thumbs: g.__CONFIG_COMMON.thumbs
    });
    j.addMsg({
        "@richtextbox.add": "\ub354\ud558\uae30",
        "@richtextbox.sub": "\ube7c\uae30",
        "@richtextbox.alert": "1 \uc774\uc0c1 20 \uc774\ud558\uc758 \uc22b\uc790\ub9cc \uc785\ub825 \uac00\ub2a5\ud569\ub2c8\ub2e4.",
        "@richtextbox.bg.color": "\ubc30\uacbd\uc0c9",
        "@richtextbox.border.color": "\uc120 \uc0c9",
        "@richtextbox.border.style": "\uc120 \uc2a4\ud0c0\uc77c",
        "@richtextbox.border.width": "\uc120 \uad75\uae30"
    });
    g.Tool.RichTextBox = g.Class.create({
        $const: {
            __Identity: "richtextbox"
        },
        $extend: g.Tool,
        oninitialized: function() {
            var y = this.canvas;
            var w = this.toolbar;
            var e = this;
            var x = this.handler = function() {
                var C = e.menu;
                var z = {
                    borderStyle: C.elPreview.style.borderStyle,
                    borderWidth: C.elPreview.style.borderWidth,
                    borderColor: C.elPreview.style.borderColor,
                    backgroundColor: C.elPreview.style.backgroundColor,
                    padding: C.padding
                };
                var A = "div";
                var B = {
                    className: "txc-textbox",
                    style: z
                };
                y.execute(function(E) {
                    var F = E.blocks(function() {
                        return "%wrapper,%paragraph"
                    });
                    var D;
                    F = F.findAll(function(G) {
                        if (v.kindOf(G, "%innergroup")) {
                            D = E.wrap(v.children(G), A, B);
                            w.fireJobs("cmd.textbox.added", D);
                            return c
                        } else {
                            return u
                        }
                    });
                    D = E.wrap(F, A, B);
                    w.fireJobs("cmd.textbox.added", D)
                })
            };
            this.weave.bind(this)(new g.Button(this.buttonCfg), new g.Menu.RichTextbox(this.menuCfg), x)
        }
    });
    g.MarkupTemplate.add("richtextbox.colorpallete", ['<dd class="#{wrapClass}">', '	<div class="tx-color-box">', '		<a href="javascript:;" class="tx-color-bg-thumb" style="background-color:#{color}"></a>', "	</div>", '	<a href="javascript:;" class="tx-color-arrow-down"></a>', '	<div class="tx-colorpallete" unselectable="on" style="display:none;z-index:15000;"></div>', "</dd>"].join(""));
    g.Menu.RichTextbox = g.Class.create({
        $extend: g.Menu,
        ongenerated: function(P) {
            var D = this;
            var z = {};
            P.options.each(function(S) {
                z[S.data] = S.style
            });
            this.borderWidth = P.borderWidth || 1;
            this.borderColor = P.borderColor || "#cbcbcb";
            this.bgColor = P.bgColor || "#ffffff";
            this.padding = P.padding;
            var O = this.generateBorderStyle.bind(this);
            var G = this.generateBorderWidth.bind(this);
            var J = this.generateBorderColor.bind(this);
            var C = this.generateBgColor.bind(this);
            var B = this.elMenu;
            var N = v.collect(B, "div.tx-menu-header");
            var x = v.collect(N, "div.tx-menu-preview-area");
            this.elPreview = v.collect(x, "div.tx-menu-preview");
            var R = this.elSwitch = v.collect(N, "div.tx-menu-switch");
            var K = v.collect(R, "div.tx-menu-simple");
            var M = v.collect(R, "div.tx-menu-advanced");
            var w = v.collect(B, "div.tx-menu-inner");
            var E = v.collect(B, "div.tx-menu-footer");
            var H = v.collect(E, "img.tx-menu-confirm");
            var e = v.collect(E, "img.tx-menu-cancel");
            (function I() {
                var U = D.simplePalette = tx.div({
                    className: "tx-menu-list"
                });
                w.appendChild(U);
                var S = P.rows;
                var T = P.cols;
                U.innerHTML = g.HtmlCreator.createTableMarkup(S, T, P.options);
                t.observe(U, "click", function(V) {
                    var W = t.element(V);
                    k.fire(W, {
                        span: function() {
                            var Y;
                            if (W.firstChild && W.firstChild.nodeType == 1 && W.firstChild.tagName.toLowerCase() == "img") {
                                Y = W.firstChild.title
                            } else {
                                Y = W.innerText
                            }
                            var X = z[Y];
                            A(X)
                        }
                    });
                    t.stop(V)
                })
            })();
            (function y() {
                var S = D.advancedPalette = tx.div({
                    className: "tx-advanced-list"
                });
                w.appendChild(S);
                S.appendChild(tx.dl({
                    style: {
                        height: "24px"
                    }
                }, tx.dt(TXMSG("@richtextbox.border.style")), O()));
                S.appendChild(tx.dl(tx.dt(TXMSG("@richtextbox.border.width")), G()));
                S.appendChild(tx.dl(tx.dt(TXMSG("@richtextbox.border.color")), J()));
                S.appendChild(tx.dl(tx.dt(TXMSG("@richtextbox.bg.color")), C()))
            })();
            var L = function() {
                D.borderWidthInput.value = parseInt(D.elPreview.style.borderWidth);
                D.borderColorInput.style.backgroundColor = D.elPreview.style.borderTopColor;
                D.bgColorInput.style.backgroundColor = D.elPreview.style.backgroundColor
            };
            var A = function(S) {
                D.elPreview.style.border = S.border;
                D.elPreview.style.backgroundColor = S.backgroundColor
            };
            var Q = function(S) {
                if (S == "simple") {
                    t.addClassName(K, "tx-selected");
                    t.show(D.simplePalette);
                    t.removeClassName(M, "tx-selected");
                    t.hide(D.advancedPalette)
                } else {
                    if (S == "advanced") {
                        t.removeClassName(K, "tx-selected");
                        t.hide(D.simplePalette);
                        t.addClassName(M, "tx-selected");
                        t.show(D.advancedPalette);
                        L()
                    }
                }
                D.fireJobs(g.Ev.__MENU_LAYER_CHANGE_SIZE, {
                    detail: {
                        menu: D
                    }
                })
            };
            (function F() {
                t.observe(K, "click", Q.bind(D, "simple"));
                t.observe(M, "click", Q.bind(D, "advanced"));
                t.observe(H, "click", D.onSelect.bind(D));
                t.observe(e, "click", function() {
                    D.onCancel()
                })
            })();
            Q("simple");
            A(z["txc-textbox13"])
        },
        generateBorderStyle: function() {
            var w = this;
            var e = tx.dd({
                className: "tx-border-area"
            });
            t.observe(e, "click", function(x) {
                var y = t.element(x);
                k.fire(y, {
                    img: function(z) {
                        var A = z.getAttribute("data");
                        w.elPreview.style.borderStyle = A;
                        if (A == "double" && w.borderWidthInput.value.toNumber() < 3) {
                            w.elPreview.style.borderWidth = "3px";
                            w.borderWidthInput.value = "3"
                        }
                    }
                });
                t.stop(x)
            });
            e.innerHTML = g.HtmlCreator.createTableMarkup(1, 4, this.config.styles);
            return e
        },
        generateBorderWidth: function() {
            var A = this;
            var w = tx.dd({
                className: "tx-border-area"
            });
            var z = this.borderWidthInput = tx.input({
                type: "text",
                value: this.borderWidth
            });
            w.appendChild(z);
            var x = function(B) {
                if (B > 20) {
                    alert(TXMSG("@richtextbox.alert"));
                    z.value = 20
                } else {
                    if (B < 1) {
                        alert(TXMSG("@richtextbox.alert"));
                        z.value = 1
                    } else {
                        A.elPreview.style.borderWidth = B + "px";
                        z.value = B
                    }
                }
            };
            t.observe(z, "blur", function(B) {
                x(z.value.toNumber(), B)
            });
            t.observe(z, "keydown", function(B) {
                if (B.keyCode == t.KEY_RETURN) {
                    t.stop(B)
                }
            });
            var y = tx.a({
                href: "javascript:;",
                className: "btn_add"
            }, TXMSG("@richtextbox.add"));
            w.appendChild(y);
            t.observe(y, "click", function(B) {
                x(z.value.toNumber() + 1);
                t.stop(B)
            });
            var e = tx.a({
                href: "javascript:;",
                className: "btn_sub"
            }, TXMSG("@richtextbox.sub"));
            w.appendChild(e);
            t.observe(e, "click", function(B) {
                x(z.value.toNumber() - 1);
                t.stop(B)
            });
            return w
        },
        generateBorderColor: function() {
            var C = this;
            var y = g.MarkupTemplate.get("richtextbox.colorpallete").evaluateAsDom({
                color: this.borderColor,
                wrapClass: "tx-color-wrap"
            });
            var z = v.collect(y, "div.tx-colorpallete");
            var e = function(D) {
                C.elPreview.style.borderColor = B.style.backgroundColor = C.borderColor = D
            };
            var x = i;
            var A = function() {
                if (x == i) {
                    x = C.createColorPallete(z, e);
                    x.show()
                } else {
                    if (!t.visible(z)) {
                        x.show()
                    } else {
                        x.hide()
                    }
                }
            };
            this.externalBorderColorToggler = function() {
                if (t.visible(z)) {
                    x.hide()
                }
            };
            var B = this.borderColorInput = v.collect(y, ".tx-color-box a");
            t.observe(B, "click", function(D) {
                C.externalBgColorToggler();
                A();
                t.stop(D)
            });
            var w = v.collect(y, "a.tx-color-arrow-down");
            t.observe(w, "click", function(D) {
                C.externalBgColorToggler();
                A();
                t.stop(D)
            });
            return y
        },
        createColorPallete: function(w, y) {
            var e = this;
            var x = new g.Menu.ColorPallete({
                el: w,
                thumbs: this.config.thumbs
            });
            x.setCommand(y);
            x.observeJob(g.Ev.__MENU_LAYER_SHOW, function(z) {
                e.fireJobs(g.Ev.__MENU_LAYER_SHOW, z)
            });
            x.observeJob(g.Ev.__MENU_LAYER_HIDE, function(z) {
                e.fireJobs(g.Ev.__MENU_LAYER_HIDE, z)
            });
            x.observeJob(g.Ev.__MENU_LAYER_CHANGE_SIZE, function(z) {
                e.fireJobs(g.Ev.__MENU_LAYER_CHANGE_SIZE, z)
            });
            return x
        },
        generateBgColor: function() {
            var C = this;
            var x = g.MarkupTemplate.get("richtextbox.colorpallete").evaluateAsDom({
                color: this.bgColor
            });
            var y = v.collect(x, "div.tx-colorpallete");
            var A = function(D) {
                C.elPreview.style.backgroundColor = B.style.backgroundColor = C.bgColor = D
            };
            var w = i;
            var z = function() {
                if (w == i) {
                    w = C.createColorPallete(y, A);
                    w.show()
                } else {
                    if (!t.visible(y)) {
                        w.show()
                    } else {
                        w.hide()
                    }
                }
            };
            this.externalBgColorToggler = function() {
                if (t.visible(y)) {
                    w.hide()
                }
            };
            var B = this.bgColorInput = v.collect(x, ".tx-color-box a");
            t.observe(B, "click", function(D) {
                C.externalBorderColorToggler();
                z();
                t.stop(D)
            });
            var e = v.collect(x, "a.tx-color-arrow-down");
            t.observe(e, "click", function(D) {
                C.externalBorderColorToggler();
                z();
                t.stop(D)
            });
            return x
        }
    });
    p.addTool("quote", {
        sync: c,
        status: u,
        rows: 2,
        cols: 3,
        options: [{
            type: "image",
            data: "tx-quote1",
            image: "#iconpath/quote/citation01.gif?v=2"
        }, {
            type: "image",
            data: "tx-quote2",
            image: "#iconpath/quote/citation02.gif?v=2"
        }, {
            type: "image",
            data: "tx-quote3",
            image: "#iconpath/quote/citation03.gif?v=2"
        }, {
            type: "image",
            data: "tx-quote4",
            image: "#iconpath/quote/citation04.gif?v=2"
        }, {
            type: "image",
            data: "tx-quote5",
            image: "#iconpath/quote/citation05.gif?v=2"
        }, {
            type: "cancel",
            data: "tx-quote6",
            image: "#iconpath/quote/citation06.gif?v=2"
        }]
    }, function(e) {
        var w = p.getTool("quote", e);
        w.options.each(function(x) {
            x.image = p.getIconPath(x.image, "quote")
        })
    });
    g.Tool.Quote = g.Class.create({
        $const: {
            __Identity: "quote"
        },
        $extend: g.Tool,
        oninitialized: function(w) {
            var e = this;
            var z = this.canvas;
            var A = {};
            w.options.each(function(B) {
                A[B.data] = {
                    type: B.type
                }
            });
            var x = function(D) {
                if (!A[D]) {
                    return
                }
                var C = A[D].type;
                var B = "blockquote";
                var E = {
                    className: D
                };
                if (z.isWYSIWYG()) {
                    z.execute(function(G) {
                        var F = G.findNode(B);
                        if (F) {
                            if (C == "cancel") {
                                G.unwrap(F)
                            } else {
                                G.apply(F, E)
                            }
                        } else {
                            if (C != "cancel") {
                                var H = G.blocks(function() {
                                    return "%wrapper,%paragraph"
                                });
                                H = H.findAll(function(I) {
                                    if (v.kindOf(I, "%innergroup")) {
                                        G.wrap(v.children(I), B, E);
                                        return c
                                    } else {
                                        return u
                                    }
                                });
                                G.wrap(H, B, E)
                            }
                        }
                    })
                } else {
                    z.execute(function(F) {
                        F.insertTag("<blockquote>", "</blockquote>")
                    })
                }
            };
            this.weave.bind(this)(new g.Button(this.buttonCfg), new g.Menu.List(this.menuCfg), x);
            var y = function(B) {
                e.button.onMouseDown(B)
            };
            this.bindKeyboard({
                ctrlKey: u,
                keyCode: 81
            }, y)
        }
    });
    p.addTool("table", {
        borderStyle: "1px solid #ccc",
        sync: c,
        status: u
    }, function(w) {
        var e = p.get("canvas", w).styles.backgroundColor;
        if (e != "transparent") {
            p.getTool("table", w).bgcolor = e
        }
    });
    j.addMsg({
        "@table.alert": "1 \uc774\uc0c1 99 \uc774\ud558\uc758 \uc22b\uc790\ub9cc \uc785\ub825 \uac00\ub2a5\ud569\ub2c8\ub2e4."
    });
    g.Tool.Table = g.Class.create({
        $const: {
            __Identity: "table",
            __DEFAULT_TABLE_PROPERTY: {
                cellSpacing: 0,
                cellPadding: 1,
                border: 0,
                style: {
                    border: "none",
                    borderCollapse: "collapse"
                }
            },
            __DEFAULT_TABLE_PROPERTY_STR: 'cellspacing="0" cellpadding="0" border="0"',
            __DEFAULT_TABLE_STYLE: "border:none;border-collapse:collapse;",
            __DEFAULT_TABLE_CLASS: "txc-table",
            __DEFAULT_TABLE_CELL_HEIGHT: 24
        },
        $extend: g.Tool,
        oninitialized: function(w) {
            var e = this;
            this.tableSize = {
                row: 0,
                col: 0
            };
            var y = this.canvas;
            var x = this.handler = function(A) {
                var z = e.makeEmptyTable(A.row, A.col);
                y.execute(function(C) {
                    var B = C.pasteContent(z, u);
                    C.bookmarkInto(B);
                    if (e.toolbar.tools.advanced) {
                        e.toolbar.tools.advanced.forceOpen()
                    }
                })
            };
            this.weave.bind(this)(new g.Button(this.buttonCfg), new g.Menu.Table(this.menuCfg), x)
        },
        makeEmptyTable: function(F, e) {
            var E = [];
            var C = this._createDefaultTableWidth();
            E.push('<table class="' + g.Tool.Table.__DEFAULT_TABLE_CLASS + '" width="' + C + '" ');
            E.push(g.Tool.Table.__DEFAULT_TABLE_PROPERTY_STR);
            E.push(' style="');
            E.push(g.Tool.Table.__DEFAULT_TABLE_STYLE);
            E.push(";font-family:");
            E.push(this.editor.canvas.getStyle("fontFamily"));
            E.push(";font-size:");
            E.push(this.editor.canvas.getStyle("fontSize"));
            E.push('"><tbody>');
            var D = this.config.borderStyle;
            var B = parseInt(C / e).toPx(),
                A = g.Tool.Table.__DEFAULT_TABLE_CELL_HEIGHT.toPx();
            var w = ["border-bottom:", D, ";border-right:", D, ";"].join("");
            for (var z = 0; z < F; z++) {
                E.push("<tr>");
                for (var y = 0; y < e; y++) {
                    var x = [w];
                    E.push('<td style="width:');
                    E.push(B);
                    E.push(";");
                    E.push("height:", A, ";");
                    E.push(w);
                    if (z == 0) {
                        E.push("border-top:", D, ";")
                    }
                    if (y == 0) {
                        E.push("border-left:", D, ";")
                    }
                    E.push(';"><p>' + v.EMPTY_BOGUS + "</p></td>")
                }
                E.push("</tr>\n")
            }
            E.push("</tbody></table>");
            return E.join("")
        },
        _createDefaultTableWidth: function() {
            var e = this.config.tableWidth;
            if (!e) {
                var w = this.canvas.getSizeConfig().contentPadding || 8;
                e = (this.canvas.getSizeConfig().contentWidth || 600) - w * 2 - 20
            }
            return e
        }
    });
    g.Tool.Table.TemplateWizard = g.Class.create({
        initialize: function() {
            this.templateList = (typeof getTableTemplateList == "function") ? getTableTemplateList() : [{
                klass: "ex1",
                common: {
                    backgroundColor: "transparent",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "1px solid #d9d9d9",
                    borderBottom: "1px solid #d9d9d9"
                },
                firstRow: {
                    borderTop: "1px solid #000"
                },
                firstCol: {
                    borderLeft: "1px solid #000"
                },
                lastCol: {
                    borderRight: "1px solid #000"
                },
                lastRow: {
                    borderBottom: "1px solid #000"
                },
                evenRow: {},
                oddRow: {}
            }];
            this.currentTemplate = i
        },
        applyStyle: function(z, y) {
            if (isNaN(y)) {
                return
            }
            var x = new g.Tool.Table.TableCellMatrixer(z);
            var A = x.getTdMatrix();
            this.currentTemplate = this.templateList[y];
            for (var w = 0; w < A.length; w++) {
                for (var e = 0; e < A[w].length; e++) {
                    this.setCellStyle(A[w][e], {
                        isEvenRow: (w % 2) == 1,
                        isFirstRow: w == 0,
                        isLastRow: w == A.length - 1,
                        isFirstCol: e == 0,
                        isLastCol: (e == A[w].length - 1)
                    })
                }
            }
        },
        setCellStyle: function(w, e) {
            var x = this.currentTemplate;
            var y = Object.extend({}, x.common);
            Object.extend(y, (e.isEvenRow) ? x.evenRow : x.oddRow);
            Object.extend(y, (e.isFirstRow) ? x.firstRow : (e.isLastRow) ? x.lastRow : {});
            Object.extend(y, (e.isLastCol) ? x.lastCol : {});
            Object.extend(y, (e.isFirstCol) ? x.firstCol : {});
            txlib.setStyle(w, y)
        },
        getTemplateList: function() {
            return this.templateList
        }
    });
    g.Tool.Table.TableCellMatrixer = g.Class.create({
        initialize: function(y) {
            this.rowSize = this.initRowSize(y);
            this.colSize = this.initColSize(y);
            var x = v.first(y, "tbody") || y;
            this.tdMatrix = this.createTdMatrix(x);
            for (var w = 0; w < this.tdMatrix.length; w++) {
                for (var e = 0; e < this.tdMatrix[w].length; e++) {
                    var z = this.tdMatrix[w][e];
                    if (z.cols > 1) {
                        z.cols--;
                        this.tdMatrix[w].splice(e + 1, 0, z)
                    }
                }
            }
            for (var w = 0; w < this.tdMatrix.length; w++) {
                for (var e = 0; e < this.tdMatrix[w].length; e++) {
                    var z = this.tdMatrix[w][e];
                    if (z.rows > 1) {
                        z.rows--;
                        this.tdMatrix[w + 1].splice(e, 0, z)
                    }
                }
            }
        },
        createTdMatrix: function(w) {
            var y = [];
            var z = v.children(w, "tr");
            for (var x = 0, e = z.length; x < e; x++) {
                y.push(this.createTdArray(z[x]))
            }
            return y
        },
        createTdArray: function(z) {
            var y = [];
            var x = v.children(z, "td");
            for (var w = 0, e = x.length; w < e; w++) {
                y.push(this.decorateSingleTd(x[w]))
            }
            return y
        },
        decorateSingleTd: function(x) {
            var w = parseInt(x.getAttribute("colSpan") || 1);
            var e = parseInt(x.getAttribute("rowSpan") || 1);
            x.cols = w;
            x.rows = (e - 1) * w + 1;
            return x
        },
        initRowSize: function(e) {
            return e.rows.length
        },
        initColSize: function(w) {
            var e = 0;
            var x = v.children(v.collect(w, "tr"), "td");
            x.each(function(y) {
                e += parseInt(y.getAttribute("colSpan") || 1)
            });
            return e
        },
        getRowSize: function() {
            return this.rowSize
        },
        getColSize: function() {
            return this.colSize
        },
        getTdMatrix: function() {
            return this.tdMatrix
        }
    });
    j.addMsg({
        "@table.title.insert": "\ud45c\uc0bd\uc785 &nbsp;",
        "@table.title.setDirectly": "\ud45c \uc9c1\uc811\uc124\uc815",
        "@table.title.row": "\uc5f4 \uac1c\uc218",
        "@table.title.col": "\ud589 \uac1c\uc218"
    });
    g.MarkupTemplate.add("menu.table.direct", ["<div>@table.title.setDirectly</div>", '<div class="tx-table-input-area">', '<div class="tx-field tx-col-field">@table.title.row<input type="text" value="1"><a class="tx-btn tx-btn-add" href="javascript:;">@table.title.row+</a><a class="tx-btn tx-btn-sub" href="javascript:;">@table.title.row-</a></div>', '<div class="tx-field tx-row-field">@table.title.col<input type="text" value="1"><a class="tx-btn tx-btn-add" href="javascript:;">@table.title.col+</a><a class="tx-btn tx-btn-sub" href="javascript:;">@table.title.col-</a></div>', "</div>"].join(""));
    g.Menu.Table = g.Class.create({
        $const: {
            MAX_ROW: 99,
            MAX_COL: 99
        },
        $extend: g.Menu,
        ongenerated: function() {
            this.rowSize = 1;
            this.colSize = 1;
            this.elInnerPreview = v.collect(this.elMenu, "div.tx-menu-inner .tx-menu-preview");
            this.dynamicSizer = this.generateDynamicSizer(this.elInnerPreview);
            this.elInnerRowCol = v.collect(this.elMenu, "div.tx-menu-inner .tx-menu-rowcol");
            this.generateTextSizer(this.elInnerRowCol);
            this.elButtonArea = v.collect(this.elMenu, "div.tx-menu-inner .tx-menu-enter");
            this.generateButtonArea(this.elButtonArea)
        },
        onregenerated: function() {
            this.showDynamicSizer()
        },
        showDynamicSizer: function() {
            this.dynamicSizer.clear();
            t.show(this.elInnerPreview);
            t.hide(this.elInnerRowCol);
            t.hide(this.elButtonArea)
        },
        showTextSizer: function() {
            t.hide(this.elInnerPreview);
            t.show(this.elInnerRowCol);
            t.show(this.elButtonArea)
        },
        generateDynamicSizer: function(y) {
            var w = this;
            var B = tx.span();
            var z = tx.div({
                className: "tx-dynamic-sizer-display"
            }, TXMSG("@table.title.insert"), B);
            y.appendChild(z);
            var A = new g.DynamicSizer({
                el: y,
                clickHandler: this.onSelect.bind(this),
                moveHandler: function(D, C) {
                    B.innerHTML = D + "x" + C
                }
            });
            var e = tx.a({
                href: "javascript:;"
            }, TXMSG("@table.title.setDirectly"));
            t.observe(e, "click", function(C) {
                w.showTextSizer();
                t.stop(C);
                w.fireJobs(g.Ev.__MENU_LAYER_CHANGE_SIZE, {
                    detail: {
                        menu: w
                    }
                })
            });
            var x = tx.div({
                className: "tx-more-button"
            });
            x.appendChild(e);
            y.appendChild(x);
            return A
        },
        generateTextSizer: function(w) {
            var e = this;
            g.MarkupTemplate.get("menu.table.direct").evaluateToDom({}, w);
            var y = {
                calculate: function(C, A, B) {
                    C = parseInt(C);
                    if (C + B > A || C + B < 1) {
                        alert(TXMSG("@table.alert"));
                        return C
                    } else {
                        return C + B
                    }
                },
                getValidValue: function(C, B, A) {
                    if (C <= 0 || C > A) {
                        alert(TXMSG("@table.alert"));
                        return B
                    } else {
                        return C
                    }
                }
            };
            var x = v.collect(w, "div.tx-col-field input");
            t.observe(x, "blur", function() {
                x.value = e.colSize = y.getValidValue(x.value, e.colSize, g.Menu.Table.MAX_COL)
            });
            t.observe(v.collect(w, "div.tx-col-field a.tx-btn-add"), "click", function() {
                x.value = e.colSize = y.calculate(e.colSize, g.Menu.Table.MAX_COL, 1);
                return c
            });
            t.observe(v.collect(w, "div.tx-col-field a.tx-btn-sub"), "click", function() {
                x.value = e.colSize = y.calculate(e.colSize, g.Menu.Table.MAX_COL, -1);
                return c
            });
            var z = v.collect(w, "div.tx-row-field input");
            t.observe(z, "blur", function() {
                z.value = e.rowSize = y.getValidValue(z.value, e.rowSize, g.Menu.Table.MAX_ROW)
            });
            t.observe(v.collect(w, "div.tx-row-field a.tx-btn-add"), "click", function() {
                z.value = e.rowSize = y.calculate(e.rowSize, g.Menu.Table.MAX_ROW, 1);
                return c
            });
            t.observe(v.collect(w, "div.tx-row-field a.tx-btn-sub"), "click", function() {
                z.value = e.rowSize = y.calculate(e.rowSize, g.Menu.Table.MAX_ROW, -1);
                return c
            })
        },
        generateButtonArea: function(x) {
            var e = this;
            var y = tx.div();
            var z = tx.a({
                href: "javascript:;",
                className: "tx-btn-confirm"
            }, "\ud655\uc778");
            var w = tx.a({
                href: "javascript:;",
                className: "tx-btn-cancel"
            }, "\ucde8\uc18c");
            t.observe(z, "click", function(A) {
                e.onSelect(A, {
                    row: e.rowSize,
                    col: e.colSize
                })
            });
            t.observe(w, "click", function() {
                this.onCancel();
                return c
            }.bindAsEventListener(this));
            y.appendChild(z);
            y.appendChild(w);
            x.appendChild(y)
        }
    });
    (function() {
        j.addMsg({
            "@emoticon.subtitle.person": "\uc0ac\ub78c",
            "@emoticon.subtitle.animal": "\ub3d9\uc2dd\ubb3c",
            "@emoticon.subtitle.thing": "\uc0ac\ubb3c",
            "@emoticon.subtitle.etc": "\uae30\ud0c0"
        });
        var e = function(z, y) {
            var A = [];
            for (var x = 1; x <= y; x++) {
                A.push("#decopath/emoticon/" + z + "_" + w(x) + ".gif?v=2")
            }
            return A
        };
        var w = function(x) {
            return (x < 10) ? "0" + x : String(x)
        };
        p.addTool("emoticon", {
            sync: c,
            status: u,
            rows: 5,
            cols: 7,
            matrices: [{
                title: TXMSG("@emoticon.subtitle.person"),
                klass: "tx-menu-matrix-per",
                options: e("per", 29)
            }, {
                title: TXMSG("@emoticon.subtitle.animal"),
                klass: "tx-menu-matrix-ani",
                options: e("ani", 28)
            }, {
                title: TXMSG("@emoticon.subtitle.thing"),
                klass: "tx-menu-matrix-things",
                options: e("things", 35),
                defaultshow: u
            }, {
                title: TXMSG("@emoticon.subtitle.etc"),
                klass: "tx-menu-matrix-etc",
                options: e("etc", 29)
            }],
            asyncUrl: "trex/tool/async/emoticon.js"
        }, function(x) {
            var y = p.getTool("emoticon", x);
            y.matrices.each(function(A) {
                for (var B = 0, z = A.options.length; B < z; B++) {
                    A.options[B] = p.getDecoPath(A.options[B])
                }
            })
        });
        g.Tool.Emoticon = g.Class.create({
            $const: {
                __Identity: "emoticon"
            },
            $extend: g.AsyncTool,
            oninitialized: function() {
                this.weave.bind(this)(new g.Button(this.buttonCfg), i, this.onLoadModule)
            }
        })
    })();
    p.addTool("redo", {
        sync: c,
        status: c
    });
    g.Tool.ReDo = g.Class.create({
        $const: {
            __Identity: "redo"
        },
        $extend: g.Tool,
        oninitialized: function() {
            var w = this.canvas;
            var e = function() {
                w.getProcessor().blur();
                w.focus();
                setTimeout(function() {
                    w.fireJobs("canvas.panel.redo")
                }, 0)
            };
            this.weave.bind(this)(new g.Button(this.buttonCfg), i, e);
            this.bindKeyboard({
                ctrlKey: u,
                keyCode: 89
            }, function() {
                w.fireJobs("canvas.panel.redo");
                w.triggerQueryStatus()
            })
        }
    });
    p.addTool("undo", {
        sync: c,
        status: c
    });
    g.Tool.UnDo = g.Class.create({
        $const: {
            __Identity: "undo"
        },
        $extend: g.Tool,
        oninitialized: function() {
            var w = this.canvas;
            var e = function() {
                w.getProcessor().blur();
                w.focus();
                setTimeout(function() {
                    w.fireJobs("canvas.panel.undo")
                }, 20)
            };
            this.weave.bind(this)(new g.Button(this.buttonCfg), i, e);
            this.bindKeyboard({
                ctrlKey: u,
                keyCode: 90
            }, function() {
                w.fireJobs("canvas.panel.undo");
                w.triggerQueryStatus()
            })
        }
    });
    p.addTool("removeformat", {
        wysiwygonly: u,
        sync: u,
        status: c,
        hotKey: {
            ctrlKey: u,
            shiftKey: u,
            keyCode: 88
        }
    });
    g.I.FontToolForRemoveformat = g.Mixin.create({
        oninitialized: function(e) {
            this.bindKeyboard(e.hotKey, this.handler.bind(this))
        },
        computeNewStyle: function() {
            return i
        },
        rangeExecutor: function(e) {
            e.execCommand(this.getQueryCommandName())
        }
    });
    g.Tool.Removeformat = g.Class.create({
        $const: {
            __Identity: "removeformat"
        },
        $extend: g.Tool,
        $mixins: [g.I.FontTool, g.I.FontToolForRemoveformat],
        getQueryCommandName: function() {
            return "removeformat"
        },
        isStyleApplied: function(e) {
            return false
        }
    });
    g.module("initialize removeformat without toolbar button", function(y, z, A, w) {
        if (!t("tx_removeformat")) {
            var e = p.getTool("removeformat");
            var x = b.createElement("div");
            x.id = "tx_removeformat";
            b.body.appendChild(x);
            new g.Tool.Removeformat(y, z, e)
        }
    });
    p.addTool("horizontalrule", {
        wysiwygonly: u,
        sync: c,
        status: u,
        top: i,
        left: i,
        options: [{
            data: "tx-hr-border-1",
            image: "#iconpath/horizontalrule/line01.gif?v=2",
            html: '<hr style="display:block; border: black 0 none; border-top: black 1px solid; height: 1px"/>'
        }, {
            data: "tx-hr-border-2",
            image: "#iconpath/horizontalrule/line02.gif?v=2",
            html: '<hr style="display:block; border: black 0 none; border-top: black 1px solid; border-bottom: black 3px solid; height: 7px"/>'
        }, {
            data: "tx-hr-border-3",
            image: "#iconpath/horizontalrule/line04.gif?v=2",
            html: '<hr style="display:block; border: black 0 none; border-top: black 1px dotted; height: 1px"/>'
        }, {
            data: "tx-hr-image-1",
            image: "#iconpath/horizontalrule/line03.gif?v=2",
            html: '<div style="background: url(#decopath/horizontalrule/line03.gif?v=2) repeat-x scroll left;  width: 99%; height: 15px"><hr style="border: black 0 none; left: -9999px; position: relative; top: -9999px"></div>'
        }, {
            data: "tx-hr-image-2",
            image: "#iconpath/horizontalrule/line05.gif?v=2",
            html: '<div style="background: url(#decopath/horizontalrule/line05.gif?v=2) repeat-x scroll left;  width: 99%; height: 15px"><hr style="border: black 0 none; left: -9999px; position: relative; top: -9999px"></div>'
        }, {
            data: "tx-hr-image-3",
            image: "#iconpath/horizontalrule/line06.gif?v=2",
            html: '<div style="background: url(#decopath/horizontalrule/line06.gif?v=2) repeat-x scroll left;  width: 99%; height: 15px"><hr style="border: black 0 none; left: -9999px; position: relative; top: -9999px"></div>'
        }, {
            data: "tx-hr-image-4",
            image: "#iconpath/horizontalrule/line07.gif?v=2",
            html: '<div style="background: url(#decopath/horizontalrule/line08.gif?v=2) repeat-x scroll left;  width: 99%; height: 15px"><hr style="border: black 0 none; left: -9999px; position: relative; top: -9999px"></div>'
        }]
    }, function(e) {
        var w = p.getTool("horizontalrule", e);
        w.options.each(function(x) {
            x.image = p.getIconPath(x.image);
            if (x.html) {
                x.html = p.getDecoPath(x.html)
            }
        })
    });
    g.Tool.HorizontalRule = g.Class.create({
        $const: {
            __Identity: "horizontalrule"
        },
        $extend: g.Tool,
        oninitialized: function(e) {
            var x = this.canvas;
            var y = {};
            e.options.each(function(z) {
                y[z.data] = {
                    html: z.html
                }
            });
            var w = function(A) {
                if (!y[A]) {
                    return
                }
                var z = y[A];
                if (x.isWYSIWYG()) {
                    x.execute(function(B) {
                        B.pasteContent(z.html, u)
                    })
                } else {
                    x.execute(function(B) {
                        B.insertTag("", z.html)
                    })
                }
            };
            this.weave.bind(this)(new g.Button(this.buttonCfg), new g.Menu.List(this.menuCfg), w)
        }
    });
    (function() {
        j.addMsg({
            "@specialchar.subtitle1": "\uc77c\ubc18\uae30\ud638",
            "@specialchar.subtitle2": "\uc218\ud559\ubd80\ud638, \ud1b5\ud654\ub2e8\uc704",
            "@specialchar.subtitle3": "\uc6d0 \uae30\ud638, \uad04\ud638",
            "@specialchar.subtitle4": "\uc77c\ubcf8\uc5b4",
            "@specialchar.subtitle5": "\ub85c\ub9c8\uc790, \uadf8\ub9ac\uc2a4"
        });
        p.addTool("specialchar", {
            sync: c,
            status: u,
            rows: 9,
            cols: 20,
            top: i,
            left: i,
            matrices: [{
                title: TXMSG("@specialchar.subtitle1"),
                options: ["\uff03", "\uff06", "\uff0a", "\uff20", "\xa7", "\u203b", "\u2606", "\u2605", "\u25cb", "\u25cf", "\u25ce", "\u25c7", "\u25c6", "\u25a1", "\u25a0", "\u25b3", "\u25b2", "\u25bd", "\u25bc", "\u2192", "\u2190", "\u2191", "\u2193", "\u2194", "\u3013", "\u25c1", "\u25c0", "\u25b7", "\u25b6", "\u2664", "\u2660", "\u2661", "\u2665", "\u2667", "\u2663", "\u2299", "\u25c8", "\u25a3", "\u25d0", "\u25d1", "\u2592", "\u25a4", "\u25a5", "\u25a8", "\u25a7", "\u25a6", "\u25a9", "\u2668", "\u260f", "\u260e", "\u261c", "\u261e", "\xb6", "\u2020", "\u2021", "\u2195", "\u2197", "\u2199", "\u2196", "\u2198", "\u266d", "\u2669", "\u266a", "\u266c", "\u327f", "\u321c", "\u2116", "\u33c7", "\u2122", "\u33c2", "\u33d8", "\u2121", "\xae", "\xaa", "\xba", "\uff02", "\uff08", "\uff09", "\uff3b", "\uff3d", "\uff5b", "\uff5d", "\u2018", "\u2019", "\u201c", "\u201d", "\u3014", "\u3015", "\u3008", "\u3009", "\u300a", "\u300b", "\u300c", "\u300d", "\u300e", "\u300f", "\u3010", "\u3011", "\uff01", "\uff07", "\uff0c", "\uff0e", "\uff0f", "\uff1a", "\uff1b", "\uff1f", "\uff3e", "\uff3f", "\uff40", "\uff5c", "\uffe3", "\u3001", "\u3002", "\xb7", "\u2025", "\u2026", "\xa8", "\u3003", "\u2015", "\u2225", "\uff3c", "\u223c", "\xb4", "\uff5e", "\u02c7", "\u02d8", "\u02dd", "\u02da", "\u02d9", "\xb8", "\u02db", "\xa1", "\xbf", "\u02d0"]
            }, {
                title: TXMSG("@specialchar.subtitle2"),
                options: ["\uff0b", "\uff0d", "\uff1c", "\uff1d", "\uff1e", "\xb1", "\xd7", "\xf7", "\u2260", "\u2264", "\u2265", "\u221e", "\u2234", "\u2642", "\u2640", "\u2220", "\u22a5", "\u2312", "\u2202", "\u2207", "\u2261", "\u2252", "\u226a", "\u226b", "\u221a", "\u223d", "\u221d", "\u2235", "\u222b", "\u222c", "\u2208", "\u220b", "\u2286", "\u2287", "\u2282", "\u2283", "\u222a", "\u2229", "\u2227", "\u2228", "\uffe2", "\u21d2", "\u21d4", "\u2200", "\u2203", "\u222e", "\u2211", "\u220f", "\uff04", "\uff05", "\uffe6", "\uff26", "\u2032", "\u2033", "\u2103", "\u212b", "\uffe0", "\uffe1", "\uffe5", "\xa4", "\u2109", "\u2030", "?", "\u3395", "\u3396", "\u3397", "\u2113", "\u3398", "\u33c4", "\u33a3", "\u33a4", "\u33a5", "\u33a5", "\u33a6", "\u3399", "\u339a", "\u339b", "\u339c", "\u339d", "\u339e", "\u339f", "\u33a0", "\u33a1", "\u33a2", "\u33ca", "\u338d", "\u338e", "\u338f", "\u33cf", "\u3388", "\u3389", "\u33c8", "\u33a7", "\u33a8", "\u33b0", "\u33b1", "\u33b2", "\u33b3", "\u33b4", "\u33b5", "\u33b6", "\u33b7", "\u33b8", "\u33b9", "\u3380", "\u3381", "\u3382", "\u3383", "\u3384", "\u33ba", "\u33bb", "\u33bc", "\u33bd", "\u33be", "\u33bf", "\u3390", "\u3391", "\u3392", "\u3393", "\u3394", "\u2126", "\u33c0", "\u33c1", "\u338a", "\u338b", "\u338c", "\u33d6", "\u33c5", "\u33ad", "\u33ae", "\u33af", "\u33db", "\u33a9", "\u33aa", "\u33ab", "\u33ac", "\u33dd", "\u33d0", "\u33d3", "\u33c3", "\u33c9", "\u33dc", "\u33c6"]
            }, {
                title: TXMSG("@specialchar.subtitle3"),
                options: ["\u3260", "\u3261", "\u3262", "\u3263", "\u3264", "\u3265", "\u3266", "\u3267", "\u3268", "\u3269", "\u326a", "\u326b", "\u326c", "\u326d", "\u326e", "\u326f", "\u3270", "\u3271", "\u3272", "\u3273", "\u3274", "\u3275", "\u3276", "\u3277", "\u3278", "\u3279", "\u327a", "\u327b", "\u3200", "\u3201", "\u3202", "\u3203", "\u3204", "\u3205", "\u3206", "\u3207", "\u3208", "\u3209", "\u320a", "\u320b", "\u320c", "\u320d", "\u320e", "\u320f", "\u3210", "\u3211", "\u3212", "\u3213", "\u3214", "\u3215", "\u3216", "\u3217", "\u3218", "\u3219", "\u321a", "\u321b", "\u24d0", "\u24d1", "\u24d2", "\u24d3", "\u24d4", "\u24d5", "\u24d6", "\u24d7", "\u24d8", "\u24d9", "\u24da", "\u24db", "\u24dc", "\u24dd", "\u24de", "\u24df", "\u24e0", "\u24e1", "\u24e2", "\u24e3", "\u24e4", "\u24e5", "\u24e6", "\u24e7", "\u24e8", "\u24e9", "\u2460", "\u2461", "\u2462", "\u2463", "\u2464", "\u2465", "\u2466", "\u2467", "\u2468", "\u2469", "\u246a", "\u246b", "\u246c", "\u246d", "\u246e", "\u249c", "\u249d", "\u249e", "\u249f", "\u24a0", "\u24a1", "\u24a2", "\u24a3", "\u24a4", "\u24a5", "\u24a6", "\u24a7", "\u24a8", "\u24a9", "\u24aa", "\u24ab", "\u24ac", "\u24ad", "\u24ae", "\u24af", "\u24b0", "\u24b1", "\u24b2", "\u24b3", "\u24b4", "\u24b5", "\u2474", "\u2475", "\u2476", "\u2477", "\u2478", "\u2479", "\u247a", "\u247b", "\u247c", "\u247d", "\u247e", "\u247f", "\u2480", "\u2481", "\u2482"]
            }, {
                title: TXMSG("@specialchar.subtitle4"),
                options: ["\u3041", "\u3042", "\u3043", "\u3044", "\u3045", "\u3046", "\u3047", "\u3048", "\u3049", "\u304a", "\u304b", "\u304c", "\u304d", "\u304e", "\u304f", "\u3050", "\u3051", "\u3049", "\u3053", "\u3054", "\u3055", "\u3056", "\u3057", "\u3058", "\u3059", "\u305a", "\u305b", "\u305c", "\u305d", "\u305e", "\u305f", "\u3060", "\u3061", "\u3062", "\u3063", "\u3064", "\u3065", "\u3066", "\u3067", "\u3068", "\u3069", "\u306a", "\u306b", "\u306c", "\u306d", "\u306e", "\u306f", "\u3070", "\u3071", "\u3072", "\u3073", "\u3074", "\u3075", "\u3076", "\u3077", "\u3078", "\u3079", "\u307a", "\u307b", "\u307c", "\u307d", "\u307e", "\u307f", "\u3080", "\u3081", "\u3082", "\u3083", "\u3084", "\u3085", "\u3086", "\u3087", "\u3088", "\u3089", "\u308a", "\u308b", "\u308c", "\u308d", "\u308e", "\u308f", "\u3090", "\u3091", "\u3092", "\u3093", "\u30a1", "\u30a2", "\u30a3", "\u30a4", "\u30a5", "\u30a6", "\u30a7", "\u30a8", "\u30a9", "\u30aa", "\u30ab", "\u30ac", "\u30ad", "\u30ae", "\u30af", "\u30b0", "\u30b1", "\u30b2", "\u30b3", "\u30b4", "\u30b5", "\u30b6", "\u30b7", "\u30b8", "\u30b9", "\u30ba", "\u30bb", "\u30bc", "\u30bd", "\u30be", "\u30bf", "\u30c0", "\u30c1", "\u30c2", "\u30c3", "\u30c4", "\u30c5", "\u30c6", "\u30c7", "\u30c8", "\u30c9", "\u30ca", "\u30cb", "\u30cc", "\u30cd", "\u30ce", "\u30cf", "\u30d0", "\u30d1", "\u30d2", "\u30d3", "\u30d4", "\u30d5", "\u30d6", "\u30d7", "\u30d8", "\u30d9", "\u30da", "\u30db", "\u30dc", "\u30dd", "\u30de", "\u30df", "\u30e0", "\u30e1", "\u30e2", "\u30e3", "\u30e4", "\u30e5", "\u30e6", "\u30e7", "\u30e8", "\u30e9", "\u30ea", "\u30eb", "\u30ec", "\u30ed", "\u30ee", "\u30ef", "\u30f0", "\u30f1", "\u30f2", "\u30f3", "\u30f4", "\u30f5", "\u30f6"]
            }, {
                title: TXMSG("@specialchar.subtitle5"),
                options: ["\uff10", "\uff11", "\uff12", "\uff13", "\uff14", "\uff15", "\uff16", "\uff17", "\uff18", "\uff19", "\u2170", "\u2171", "\u2172", "\u2173", "\u2174", "\u2175", "\u2176", "\u2177", "\u2178", "\u2179", "\u2160", "\u2161", "\u2162", "\u2163", "\u2164", "\u2165", "\u2166", "\u2167", "\u2168", "\u2169", "\u0391", "\u0392", "\u0393", "\u0394", "\u0395", "\u0396", "\u0397", "\u0398", "\u0399", "\u039a", "\u039b", "\u039c", "\u039d", "\u039e", "\u039f", "\u03a0", "\u03a1", "\u03a3", "\u03a4", "\u03a5", "\u03a6", "\u03a7", "\u03a8", "\u03a9", "\u03b1", "\u03b2", "\u03b3", "\u03b4", "\u03b5", "\u03b6", "\u03b7", "\u03b8", "\u03b9\u03ba", "\u03bb", "\u03bc", "\u03bd", "\u03be", "\u03bf", "\u03c0", "\u03c1", "\u03c3", "\u03c4", "\u03c5", "\u03c6", "\u03c7", "\u03c8", "\u03c9"]
            }],
            asyncUrl: "trex/tool/async/specialchar.js"
        });
        g.Tool.SpecialChar = g.Class.create({
            $const: {
                __Identity: "specialchar"
            },
            $extend: g.AsyncTool,
            oninitialized: function(e) {
                this.config = e;
                this.weave.bind(this)(new g.Button(this.buttonCfg), i, this.onLoadModule)
            }
        })
    })();
    p.addTool("dictionary", {
        url: "http://engdic.daum.net/dicen/small_view_top.do",
        sync: c,
        status: c
    });
    g.Tool.Dictionary = g.Class.create({
        $const: {
            __Identity: "dictionary"
        },
        $extend: g.Tool,
        oninitialized: function(e) {
            var x = this.canvas;
            var w = function() {
                var A = x.query(function(B) {
                    return encodeURI(B.getText())
                });
                var y = (A.length > 0) ? "http://engdic.daum.net/dicen/small_search.do" : e.url;
                var z = h.open(y + "?q=" + A, "dicWin", "width=410,height=550,scrollbars=yes");
                z.focus()
            };
            this.weave.bind(this)(new g.Button(this.buttonCfg), i, w)
        }
    });
    (function() {
        p.addTool("background", {
            wysiwygonly: u,
            sync: c,
            status: u,
            needRevert: true,
            thumbs: g.__CONFIG_COMMON.thumbs
        });
        var e;
        g.Tool.Background = g.Class.create({
            $const: {
                __Identity: "background"
            },
            $extend: g.Tool,
            oninitialized: function() {
                this.weave(new g.Button(this.buttonCfg), new g.Menu.ColorPallete(this.menuCfg), this.handler)
            },
            handler: function(x) {
                var w = this;
                var y = w.canvas;
                y.fireJobs("canvas.apply.backgroundcolor", x);
                y.history.saveHistory({
                    backgroundColor: e,
                    backgroundImage: y.getStyle("backgroundImage")
                }, {
                    backgroundColor: x,
                    backgroundImage: y.getStyle("backgroundImage")
                }, function(z) {
                    w._restoreColor(z)
                });
                if (x === null) {
                    y.addStyle({
                        backgroundColor: y.getConfig().styles ? y.getConfig().styles.backgroundColor || "" : "",
                        backgroundImage: y.getConfig().styles ? y.getConfig().styles.backgroundImage || "" : ""
                    });
                    e = "";
                    y.getConfig().hasUserBgcolor = c
                } else {
                    y.addStyle({
                        backgroundColor: x,
                        backgroundImage: ""
                    });
                    e = x;
                    y.getConfig().hasUserBgcolor = u
                }
            },
            _restoreColor: function(x) {
                var w = this.canvas;
                w.addStyle({
                    backgroundColor: x.backgroundColor
                });
                if (x.backgroundImage) {
                    w.addStyle({
                        backgroundImage: x.backgroundImage
                    })
                }
                e = x.backgroundColor
            }
        });
        g.install("canvas.getBgColor & canvas.setBgColor & editor.getContentWithBg", function(z, A, B, y, x) {
            e = x.canvas.styles.backgroundColor;
            y.getBgColor = function() {
                var C = e || y.getPanel("html").getStyle("backgroundColor");
                if (C) {
                    return g.Color.getHexColor(C)
                } else {
                    return ""
                }
            };
            y.setBgColor = function(C) {
                y.getPanel("html").addStyle({
                    backgroundColor: C || "transparent"
                })
            };
            z.getContentWithBg = function() {
                var C = y.getBgColor().toLowerCase();
                if (C == "transparent") {
                    return z.getContent()
                } else {
                    return ['<table class="txc-wrapper" border="0" cellspacing="0" cellpadding="0"><tr>', '<td bgcolor="', C, '">', z.getContent(), "</td>", "</tr></table>"].join("")
                }
            };
            var w = y.initContent.bind(y);
            y.initContent = function(D) {
                if (D.search(/<table[^>]*txc-wrapper[^>]*>/i) > -1) {
                    var C;
                    D = D.replace(/<table[^>]*txc-wrapper[^>]*><tr><td([^>]*)>([\s\S]*?)<\/td><\/tr><\/table>/i, function(G, E, F) {
                        C = E.replace(/\sbgcolor="([#\w]*)"/, "$1");
                        return F
                    });
                    y.setBgColor(C)
                }
                w(D)
            };
            y.history.initHistory({
                backgroundColor: x.canvas.styles.backgroundColor,
                backgroundImage: x.canvas.styles.backgroundImage || "none"
            });
            y.reserveJob(g.Ev.__IFRAME_LOAD_COMPLETE, function() {
                var C = y.config.articleBackgroundColor;
                if (C && C != "transparent") {
                    y.addStyle({
                        backgroundColor: C,
                        backgroundImage: ""
                    })
                }
            });
            y.observeJob("canvas.apply.letterpaper", function(C) {
                if (C.id) {
                    y.getPanel("html").addStyle({
                        backgroundColor: "transparent"
                    })
                }
            })
        })
    })();
    p.addTool("advanced", {
        sync: c,
        status: u,
        opened: c
    });
    g.Tool.Advanced = g.Class.create({
        $const: {
            __Identity: "advanced"
        },
        $extend: g.Tool,
        oninitialized: function(x) {
            var e = this;
            var w = this.toolbar;
            var A = w.el;
            e.opened = c;
            var z = v.collect(A.parentNode, "div.tx-toolbar-advanced");
            if (!z) {
                return
            }
            w.observeJob("toolbar.advanced.fold", function() {
                t.hide(z);
                t.removeClassName(A, "tx-toolbar-basic-open")
            });
            w.observeJob("toolbar.advanced.spread", function() {
                t.show(z);
                t.addClassName(A, "tx-toolbar-basic-open")
            });
            var y = function() {
                if (e.opened) {
                    w.fireJobs("toolbar.advanced.fold")
                } else {
                    w.fireJobs("toolbar.advanced.spread")
                }
                e.opened = !e.opened
            };
            this.weave.bind(this)(new g.Button(this.buttonCfg), i, y);
            if (x.opened == u) {
                z.show();
                t.addClassName(A, "tx-toolbar-basic-open");
                e.opened = u
            }
        },
        forceOpen: function() {
            this.button.pushedState();
            this.toolbar.fireJobs("toolbar.advanced.spread");
            this.opened = u
        }
    });
    g.module("add drop-down menu button if extra buttons exist.", function(w, x, y, e) {
        e.observeJob(g.Ev.__IFRAME_LOAD_COMPLETE, function() {
            var z = v.collectAll(w.getWrapper(), "li.tx-list-extra div.tx-extra");
            if (z.length == 0) {
                return
            }
            z.each(function(B) {
                var A = v.next(B, ".tx-extra-menu");
                if (!A) {
                    return
                }
                x.makeWidget(new g.Button({
                    el: B,
                    sync: c,
                    status: u
                }), new g.Menu({
                    el: A
                }), function() {})
            })
        })
    });
    (function() {
        p.addTool("fullscreen", {
            wysiwygonly: c,
            status: c,
            switched: c,
            minHeight: 200,
            minWidth: 766,
            asyncUrl: "trex/tool/async/fullscreen.js"
        });
        g.Tool.FullScreen = g.Class.create({
            $const: {
                __Identity: "fullscreen"
            },
            $extend: g.AsyncTool,
            oninitialized: function(w) {
                this.weave.bind(this)(new g.Button(this.buttonCfg), i, this.onLoadModule);
                var e = this;
                this.bindKeyboard({
                    ctrlKey: u,
                    keyCode: 77
                }, function() {
                    if (!e.loaded) {
                        e.onLoadModule()
                    }
                })
            }
        })
    })();
    p.addTool("image", {
        disabledonmobile: u,
        wysiwygonly: u,
        sync: c,
        status: c
    });
    j.addMsg({
        "@image.title": "\uc0ac\uc9c4"
    });
    g.Tool.Image = g.Class.create({
        $const: {
            __Identity: "image"
        },
        $extend: g.Tool,
        oninitialized: function() {
            var e = this.editor;
            this.weave.bind(this)(new g.Button(this.buttonCfg), i, function() {
                e.getSidebar().getAttacher("image").execute()
            })
        }
    });
    p.addAttacher("image", {
        multiple: u,
        multipleuse: c,
        checksize: u,
        boxonly: c,
        wysiwygonly: u,
        objattr: {},
        features: {
            left: 250,
            top: 65,
            width: 797,
            height: 644
        },
        popPageUrl: "#host#path/pages/trex/image.html"
    }, function(e) {
        var w = p.getAttacher("image", e);
        w.popPageUrl = p.getUrl(w.popPageUrl);
        w.features = p.getPopFeatures(w.features)
    });
    g.Attacher.Image = g.Class.create({
        $const: {
            __Identity: "image"
        },
        $extend: g.Attacher,
        name: "image",
        title: TXMSG("@image.title"),
        canModified: c,
        canResized: u,
        oninitialized: function() {},
        getKey: function(e) {
            return e.imageurl
        },
        getDataForEntry: function(x) {
            x.imageurl = this.encodeSpaceInUrl(x.imageurl);
            x.originalurl = this.encodeSpaceInUrl(x.originalurl);
            x.attachurl = this.encodeSpaceInUrl(x.attachurl);
            x.thumburl = x.thumburl || x.imageurl.replace(/\/image\//gm, "/P150x100/");
            if (!x.dispElId) {
                x.dispElId = g.Util.getDispElId()
            }
            var e = ((x.tmpSeq) ? this.entryBox.syncSeq(x.tmpSeq) : this.entryBox.newSeq());
            var w = Object.extend({
                dataSeq: e
            }, x);
            return w
        },
        createEntry: function(w, e) {
            return this.createAttachment(w, e)
        },
        encodeSpaceInUrl: function(e) {
            if (!e) {
                return
            }
            return e.replace(/ /g, "%20")
        },
        execAttach: function(x, w) {
            var e = this.createEntry(this.getDataForEntry(x), w);
            e.execRegister()
        },
        execReload: function(y, x, w) {
            var e = this.createEntry(this.getDataForEntry(y, x), w);
            e.execReload()
        }
    });
    g.Attachment.Image = g.Class.create({
        $const: {
            __Identity: "image"
        },
        $extend: g.Attachment,
        getFieldAttr: function(e) {
            return {
                name: "tx_attach_image",
                value: [e.thumburl, e.imageurl, e.originalurl, e.exifurl, e.filename, e.filesize].join("|")
            }
        },
        getBoxAttr: function(w) {
            var e = w.width ? w.width + "x" + w.height + " / " : "";
            return {
                name: w.filename + " (" + e + w.filesize.toByteUnit() + ")",
                image: w.thumburl
            }
        },
        getObjectAttr: function(w) {
            var e = Object.extend({}, this.actor.config.objattr);
            if (w.width) {
                if (!e.width || e.width > w.width) {
                    e.width = w.width
                }
            } else {
                e.width = i
            }
            if (w.height) {
                if (!e.height || e.height > w.height) {
                    e.height = w.height
                }
            } else {
                e.height = i
            }
            return e
        },
        getObjectStyle: function(x) {
            var w = {};
            if (this.actor.config.objstyle) {
                w = Object.extend(w, this.actor.config.objstyle)
            }
            if (x.imagealign) {
                var e = {
                    L: g.Tool.AlignLeft,
                    C: g.Tool.AlignCenter,
                    FL: g.Tool.AlignRight,
                    FR: g.Tool.AlignFull
                }[x.imagealign];
                if (e && e.__ImageModeProps && e.__ImageModeProps.image) {
                    w = Object.extend(w, e.__ImageModeProps.image["style"])
                }
            }
            return w
        },
        getParaStyle: function(w) {
            var x = Object.extend({}, this.actor.config.parastyle || this.actor.config.defaultstyle);
            if (w.imagealign) {
                var e = {
                    L: g.Tool.AlignLeft,
                    C: g.Tool.AlignCenter,
                    FL: g.Tool.AlignRight,
                    FR: g.Tool.AlignFull
                }[w.imagealign];
                if (e && e.__ImageModeProps && e.__ImageModeProps.paragraph) {
                    x = Object.extend(x, e.__ImageModeProps.paragraph["style"])
                }
            }
            return x
        },
        getSaveHtml: function(e) {
            return '<img src="' + e.imageurl + '" class="txc-image"/>'
        },
        getDispHtml: function(e) {
            return '<img id="' + e.dispElId + '" src="' + e.imageurl + '" class="txc-image"/>'
        },
        getDispText: function(e) {
            return '<img src="' + e.imageurl + '" class="txc-image"/>'
        },
        getRegLoad: function(e) {
            return new RegExp('<(?:img|IMG)[^>]*src="?' + e.imageurl.getRegExp() + '"?[^>]*/?>', "gim")
        },
        getRegHtml: function(e) {
            return new RegExp('<(?:img|IMG)[^>]*src="?' + e.imageurl.getRegExp() + '"?[^>]*/?>', "gim")
        },
        getRegText: function(e) {
            return new RegExp('<(?:img|IMG)[^>]*src="?' + e.imageurl.getRegExp() + '"?[^>]*/?>', "gim")
        }
    });
    p.addTool("file", {
        disabledonmobile: u,
        wysiwygonly: u,
        sync: c,
        status: c
    });
    j.addMsg({
        "@file.title": "\ud30c\uc77c"
    });
    g.Tool.File = g.Class.create({
        $const: {
            __Identity: "file"
        },
        $extend: g.Tool,
        oninitialized: function() {
            var e = this.editor;
            this.weave.bind(this)(new g.Button(this.buttonCfg), i, function() {
                e.getSidebar().getAttacher("file").execute()
            })
        }
    });
    p.addAttacher("file", {
        multiple: u,
        multipleuse: c,
        checksize: u,
        boxonly: c,
        wysiwygonly: c,
        features: {
            left: 250,
            top: 65,
            width: 450,
            height: 404
        },
        popPageUrl: "#host#path/pages/trex/file.html"
    }, function(e) {
        var w = p.getAttacher("file", e);
        w.popPageUrl = p.getUrl(w.popPageUrl);
        w.features = p.getPopFeatures(w.features)
    });
    g.Attacher.File = g.Class.create({
        $const: {
            __Identity: "file"
        },
        $extend: g.Attacher,
        name: "file",
        title: TXMSG("@file.title"),
        canModified: u,
        canResized: c,
        oninitialized: function() {},
        getKey: function(e) {
            return e.key || e.attachurl
        },
        getDataForEntry: function(z) {
            if (!z.dispElId) {
                z.dispElId = g.Util.getDispElId()
            }
            var e = ((z.tmpSeq) ? this.entryBox.syncSeq(z.tmpSeq) : this.entryBox.newSeq());
            var y = z.filename.split(".").pop().toLowerCase();
            var w;
            switch (y) {
                case "jpg":
                case "gif":
                case "png":
                case "bmp":
                    w = z.attachurl.replace("/attach/", "/thumbnail/");
                    break;
                default:
                    w = g.Util.thumburl(y)
            }
            var x = Object.extend({
                dataSeq: e,
                thumburl: w,
                prevurl: g.Util.prevurl(z.filename.split(".").pop().toLowerCase())
            }, z);
            return x
        }
    });
    g.Attachment.File = g.Class.create({
        $const: {
            __Identity: "file"
        },
        $extend: g.Attachment,
        getFieldAttr: function(e) {
            return {
                name: "tx_attach_file",
                value: [e.attachurl, e.filesize, e.filename].join("|")
            }
        },
        getBoxAttr: function(z) {
            var w = 56;
            var x = z.filename;
            if (x.getRealLength() > w) {
                if (/\./.test(x)) {
                    var A = x.split(".");
                    var y = A.pop().cutRealLength(w - 4);
                    var e = A.join(".").cutRealLength(w - 1 - y.length);
                    x = e + "." + y
                } else {
                    x = x.cutRealLength(w)
                }
            }
            return {
                name: x + " (" + z.filesize.toByteUnit() + ")",
                image: z.thumburl
            }
        },
        getObjectStyle: function(x) {
            var w = {};
            if (this.actor.config.objstyle) {
                w = Object.extend(w, this.actor.config.objstyle)
            }
            if (x.imagealign) {
                var e = {
                    L: g.Tool.AlignLeft,
                    C: g.Tool.AlignCenter,
                    FL: g.Tool.AlignRight,
                    FR: g.Tool.AlignFull
                }[x.imagealign];
                if (e && e.__TextModeProps && e.__TextModeProps.image) {
                    w = Object.extend(w, e.__TextModeProps.button["style"])
                }
            }
            return w
        },
        getParaStyle: function(w) {
            var x = Object.extend({}, this.actor.config.parastyle || this.actor.config.defaultstyle);
            if (w.imagealign) {
                var e = {
                    L: g.Tool.AlignLeft,
                    C: g.Tool.AlignCenter,
                    FL: g.Tool.AlignFull,
                    FR: g.Tool.AlignRight
                }[w.imagealign];
                if (e && e.__TextModeProps && e.__TextModeProps.paragraph) {
                    x = Object.extend(x, e.__TextModeProps.paragraph["style"])
                }
            }
            return x
        },
        getSaveHtml: function(e) {
            return '<a href="' + e.attachurl + '"><img src="' + e.prevurl + '"/> ' + e.filename + "</a>"
        },
        getDispHtml: function(e) {
            return '<button id="' + e.dispElId + '" class="txc-file"><img class="tx-unresizable" src="' + e.prevurl + '" ld="' + e.attachurl + '"/> ' + e.filename + "</button>"
        },
        getDispText: function(e) {
            return "[" + TXMSG("@file.title") + ":" + e.dataSeq + "]"
        },
        getRegLoad: function(e) {
            return new RegExp('<(?:a|A)\\s*href="?' + e.attachurl.getRegExp() + '[^"]*"?[^>]*><(?:img|IMG)[^>]*/?>[\\S\\s]*?</(?:a|A)>', "gm")
        },
        getRegHtml: function(e) {
            return new RegExp('<(?:button|BUTTON)[^>]*id="?' + e.dispElId + '"?[^>]*>[\\S\\s]*?' + e.attachurl.getRegExp() + "[\\S\\s]*?</(?:button|BUTTON)>", "gm")
        },
        getRegText: function(e) {
            return new RegExp("\\[" + TXMSG("@file.title") + ":" + e.dataSeq + "\\]", "gm")
        }
    });
    p.addTool("media", {
        wysiwygonly: u,
        sync: c,
        status: c
    });
    j.addMsg({
        "@media.title": "\uba40\ud2f0\ubbf8\ub514\uc5b4",
        "@media.prev.url": "#iconpath/spacer2.gif?v=2",
        "@media.prev.url.tvpot": "#iconpath/img_multi_tvpot.gif?v=2",
        "@media.prev.url.wmp": "#iconpath/spacer2.gif?v=2"
    });
    g.Tool.Media = g.Class.create({
        $const: {
            __Identity: "media"
        },
        $extend: g.Tool,
        oninitialized: function() {
            var e = this.editor;
            this.weave.bind(this)(new g.Button(this.buttonCfg), i, function() {
                e.getSidebar().getEmbeder("media").execute()
            })
        }
    });
    p.addEmbeder("media", {
        wysiwygonly: u,
        useCC: c,
        features: {
            left: 250,
            top: 65,
            width: 458,
            height: 568,
            resizable: "yes"
        },
        popPageUrl: "#host#path/pages/trex/multimedia.html",
        allowNetworkingFilter: c,
        allowNetworkingSites: []
    }, function(e) {
        var w = e.sidebar.embeder.media;
        w.popPageUrl = p.getUrl(w.popPageUrl);
        w.features = p.getPopFeatures(w.features)
    });
    (function() {
        g.Embeder.Media = g.Class.create({
            $const: {
                __Identity: "media"
            },
            $extend: g.Embeder,
            name: "media",
            title: TXMSG("@media.title"),
            canResized: u,
            getCreatedHtml: function(G) {
                var F = G.code || this.makeSourceByUrl(G.url);
                return B(F)
            },
            getDataForEntry: function() {},
            makeSourceByUrl: function(F) {
                var H = this.getUrlExt(F);
                var G = y(F);
                switch (H) {
                    case "swf":
                        return this.generateHTMLForFlash(F, G);
                    case "mp3":
                    case "wma":
                    case "asf":
                    case "asx":
                    case "mpg":
                    case "mpeg":
                    case "wmv":
                    case "avi":
                        return this.generateHTMLForMoviePlayer(F, G);
                    case "mov":
                        return this.generateHTMLForQuicktime(F, G);
                    case "jpg":
                    case "bmp":
                    case "gif":
                    case "png":
                        return this.generateHTMLForImage(F, G);
                    default:
                        var I = this.generateHTMLIfIframeSource(F, G);
                        if (I) {
                            return I
                        }
                        return this.generateHTMLForDefaultEmbed(F, G)
                }
            },
            getUrlExt: function(F) {
                return F.split(".").pop().split("?")[0].toLowerCase()
            },
            getAllowScriptAccess: function(F) {
                var G = " allowScriptAccess='never'";
                if (this.config.allowNetworkingFilter && A(F, this.config) == c) {
                    G += " allowNetworking='internal'"
                }
                return G
            },
            generateHTMLForDefaultEmbed: function(F, G) {
                return '<embed src="' + F + "\" width='" + G.width + "' height='" + G.height + "' " + this.getAllowScriptAccess(F) + " ></embed>"
            },
            generateHTMLForImage: function(F, G) {
                return '<img src="' + F + '" border="0"/>'
            },
            generateHTMLForFlash: function(F, G) {
                return '<embed src="' + F + "\" quality='high' " + this.getAllowScriptAccess(F) + " type='application/x-shockwave-flash' allowfullscreen='true' pluginspage='http://www.macromedia.com/go/getflashplayer' wmode='transparent' width='" + G.width + "' height='" + G.height + "'></embed>"
            },
            generateHTMLForMoviePlayer: function(F, G) {
                return '<embed src="' + F + '" type="application/x-mplayer2" pluginspage="http://www.microsoft.com/Windows/MediaPlayer/" width=\'' + G.width + "' height='" + G.height + "'></embed>"
            },
            generateHTMLForQuicktime: function(F, G) {
                return '<embed src="' + F + '" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/indext.html" width=\'' + G.width + "' height='" + G.height + "'></embed>"
            },
            generateHTMLIfIframeSource: function(H, I) {
                var G = e(H);
                if (G) {
                    return '<iframe src="http://videofarm.daum.net/controller/video/viewer/Video.html?play_loc=undefined&vid=' + G + "\" width='" + I.width + "' height='" + I.height + '\' frameborder="0" allowfullscreen></iframe>'
                }
                var F = x(H);
                if (F) {
                    return '<iframe src="http://www.youtube.com/embed/' + F + "\" width='" + I.width + "' height='" + I.height + '\' frameborder="0" allowfullscreen></iframe>'
                }
                return i
            }
        });
        g.register("filter > media ", function(F, G, I) {
            var H = I.embeders.media.config;
            F.getDocParser().registerFilter("filter/embeder/media", {
                "text@load": function(J) {
                    return J
                },
                "source@load": function(J) {
                    return B(J)
                },
                "html@load": function(J) {
                    return B(J)
                },
                text4save: function(J) {
                    return J
                },
                source4save: function(J) {
                    J = D(J);
                    J = z(J, H);
                    return J
                },
                html4save: function(J) {
                    J = D(J);
                    J = z(J, H);
                    return J
                },
                text2source: function(J) {
                    return J
                },
                text2html: function(J) {
                    return J
                },
                source2text: function(J) {
                    return J
                },
                source2html: function(J) {
                    return B(J)
                },
                html2text: function(J) {
                    return D(J)
                },
                html2source: function(J) {
                    return D(J)
                }
            })
        });

        function A(I, H) {
            var G, K, J, F;
            K = "";
            G = /[\/]*\/\/([^\/]+)\//i.exec(I);
            if (G && G[1]) {
                K = G[1]
            }
            F = H.allowNetworkingSites.length;
            for (J = 0; J < F; J += 1) {
                if (K == H.allowNetworkingSites[J].host) {
                    return u
                }
            }
            return c
        }

        function z(H, G) {
            var F;
            if (G.allowNetworkingFilter == c) {
                return H
            }
            F = H.replace(/(<object[^>]*>)((?:\n|.)*?)(<\/object>)/gi, function(K, O, M, I) {
                var J, L;
                var N = c;
                J = /data[\s]*=[\s"']*(http:\/\/[^\/]+\/)[^("'\s)]+/i.exec(O);
                if (J && J.length == 2) {
                    L = J[1];
                    if (A(L, G) === c) {
                        N = u
                    }
                }
                J = /<param[^>]*=[^\w]*movie[^\w]+[^>]*>/i.exec(M);
                if (J && J[0]) {
                    L = /\s+value=["']?([^\s"']*)["']?/i.exec(J[0]);
                    if (L && L[1]) {
                        if (A(L[1], G) === c) {
                            N = u
                        }
                    }
                }
                J = /<param[^>]*=[^\w]*src[^\w]+[^>]*>/i.exec(M);
                if (J && J[0]) {
                    L = /\s+value=["']?([^\s"']*)["']?/i.exec(J[0]);
                    if (L && L[1]) {
                        if (A(L[1], G) === c) {
                            N = u
                        }
                    }
                }
                if (N === u) {
                    M = M.replace(/<param[^>]*=[^\w]*allowNetworking[^\w]+[^>]*>/i, "");
                    M = '<param name="allowNetworking" value="internal" />'.concat(M)
                }
                return O + M + I
            });
            F = F.replace(/(<embed)([^>]*)(><\/embed>|\/>)/gi, function(L, M, I, J) {
                var K = /\s+src=["']?([^\s"']*)["']?/i.exec(I);
                if (K && K[1]) {
                    if (A(K[1], G)) {
                        return M + I + J
                    }
                }
                I = I.replace(/\s+allowNetworking=["']?[\w]*["']?/i, "").concat(' allowNetworking="internal"');
                return M + I + J
            });
            return F
        }

        function D(K) {
            var H;
            var J = new RegExp("<(?:img|IMG)[^>]*txc-media[^>]*/?>", "gim");
            var I = K;
            while ((H = J.exec(I)) != i) {
                var G = H[0];
                var F = w(G);
                if (!t.msie && F.indexOf("$") > -1) {
                    F = F.replace(/\$/g, "$$$$")
                }
                K = K.replace(G, F)
            }
            return K
        }

        function B(L) {
            if (t.msie) {
                if (t.msie_ver < 10) {
                    L = L.replace(/<iframe[^>]*src=("|'|)https?:\/\/www\.youtube\.com\/embed\/(\w+)\1[^>]*><\/iframe>/i, function(S, R, Q) {
                        var P, T, O;
                        P = S.match(/\swidth=['"]?(\d+)/);
                        T = (P && P[1]) || "560";
                        P = S.match(/\sheight=['"]?(\d+)/);
                        O = (P && P[1]) || "315";
                        return '<object width="' + T + '" height="' + O + '"><param name="movie" value="https://www.youtube.com/v/' + Q + '?version=3&amp;hl=ko_KR" /><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="wmode" value="transparent" /><embed src="https://www.youtube.com/v/' + Q + '?version=3&amp;hl=ko_KR" type="application/x-shockwave-flash" width="' + T + '" height="' + O + '" allowscriptaccess="always" allowfullscreen="true" wmode="transparent"></embed></object>'
                    })
                }
                if (/<object/.test(L) && /<embed[^>]*type=['"]application\/x-shockwave-flash['"][^>]*>/i.test(L) && !/<object[^>]*type=['"]application\/x-shockwave-flash['"][^>]*>/i.test(L)) {
                    var J = L.indexOf(">");
                    L = L.substring(0, J) + ' type="application/x-shockwave-flash"' + L.substring(J)
                }
                return L
            } else {
                var K, I, G, M;
                var H = L;
                var F = new RegExp("<(?:script)[^>]*>[\\S\\s]*?(<(?:embed|EMBED)[^>]*src=[^>]*>)[\\S\\s]*?</(?:script)>", "gim");
                while ((K = F.exec(H)) != i) {
                    I = K[0];
                    G = I.replace(/<embed/i, "<xxembed");
                    L = L.replace(I, G)
                }
                var N = new RegExp("<(?:object|OBJECT)[^>]*>[\\S\\s]*?(<(?:embed|EMBED)[^>]*src=[^>]*>)[\\S\\s]*?</(?:object|OBJECT)>", "gim");
                while ((K = N.exec(H)) != i) {
                    I = K[0];
                    M = K[1];
                    G = E(I, M);
                    L = L.replace(I, G)
                }
                N = new RegExp("<(?:embed|EMBED)[^>]*src=[^>]*(?:/?>|></(?:embed|EMBED)>)", "gim");
                while ((K = N.exec(H)) != i) {
                    I = K[0];
                    M = K[0];
                    G = E(I, M);
                    L = L.replace(I, G)
                }
                L = L.replace(/<xxembed/i, "<embed");
                return L
            }
        }

        function E(H, P) {
            var G = g.Util.getAllAttributesFromEmbed(P);
            var K = G.src;
            var L = (G.width || " ").parsePx();
            var M = (G.height || " ").parsePx();
            if (isNaN(L) || isNaN(M)) {
                var Q = y(K);
                L = Q.width;
                M = Q.height
            }
            var J = "<embed";
            for (var I in G) {
                if (G.hasOwnProperty(I)) {
                    J += " " + I + '="' + G[I] + '"'
                }
            }
            J += ">";
            var O = H.split(P);
            H = O[0] + J;
            for (var N = 1; N < O.length; N++) {
                H += O[N]
            }
            var F = C(K);
            return '<img src="' + F.imageSrc + '" width="' + L + '" height="' + M + '" border="0" class="tx-entry-embed txc-media' + F.className + '" ld="' + encodeURIComponent(H) + '"/>'
        }

        function w(K) {
            var F = g.Util.getAllAttributes(K);
            var J = F.ld;
            if (!J || J.length == 0) {
                return ""
            }
            var H = F.width;
            var I = F.height;
            var L = decodeURIComponent(J);
            var O = L;
            if (L.indexOf("object") > -1 || L.indexOf("OBJECT") > -1) {
                var M;
                var P = new RegExp("<(?:embed|EMBED)[^>]*src=[^>]*(?:/?>|></(?:embed|EMBED)>)", "gim");
                while ((M = P.exec(L)) != i) {
                    O = M[0]
                }
            }
            F = g.Util.getAllAttributes(O);
            var G = F.src;
            var N = y(G);
            if (isNaN(H)) {
                L = g.String.changeAttribute(L, "width", H, N.width)
            } else {
                L = g.String.changeAttribute(L, "width", H, H)
            }
            if (isNaN(I)) {
                L = g.String.changeAttribute(L, "height", I, N.height)
            } else {
                L = g.String.changeAttribute(L, "height", I, I)
            }
            return L
        }

        function e(F) {
            return (F.match(/http:\/\/tvpot\.daum\.net\/v\/(.{23})/) || [])[1]
        }

        function x(F) {
            return (F.match(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/) || [])[1]
        }

        function y(G) {
            var F, I;
            if (G.indexOf("api.bloggernews.media.daum.net/static/recombox1") > -1) {
                F = 400;
                I = 80
            } else {
                if (G.indexOf("flvs.daum.net/flvPlayer") > -1) {
                    F = 502;
                    I = 399
                } else {
                    if (G.indexOf("youtube") != -1 || G.indexOf("youtu.be") != -1 || G.indexOf("tvpot.daum.net") != -1) {
                        var H = p.get("size");
                        if (H.contentWidth > 640) {
                            F = 640;
                            I = 360
                        } else {
                            F = 560;
                            I = 315
                        }
                    } else {
                        var J = G.split(".").pop().split("?")[0].toLowerCase();
                        switch (J) {
                            case "mp3":
                            case "wma":
                            case "asf":
                            case "asx":
                                F = 280;
                                I = 45;
                                break;
                            case "mpg":
                            case "mpeg":
                            case "wmv":
                            case "avi":
                                F = 320;
                                I = 285;
                                break;
                            default:
                                F = 400;
                                I = 300;
                                break
                        }
                    }
                }
            }
            return {
                width: F,
                height: I
            }
        }

        function C(H) {
            var F = "";
            var G = "";
            if (H.indexOf("api.bloggernews.media.daum.net/static/recombox1") > -1) {
                F = "";
                G = TXMSG("@media.prev.url")
            } else {
                if (H.indexOf("flvs.daum.net/flvPlayer") > -1) {
                    F = " txc-media-tvpot";
                    G = TXMSG("@media.prev.url.tvpot")
                } else {
                    var I = H.split(".").pop().split("?")[0].toLowerCase();
                    switch (I) {
                        case "mp3":
                        case "wma":
                        case "asf":
                        case "asx":
                            F = " txc-media-wmp";
                            G = TXMSG("@media.prev.url.wmp");
                            break;
                        case "mpg":
                        case "mpeg":
                        case "wmv":
                        case "avi":
                            F = " txc-media-wmp";
                            G = TXMSG("@media.prev.url.wmp");
                            break;
                        default:
                            F = "";
                            G = TXMSG("@media.prev.url");
                            break
                    }
                }
            }
            return {
                className: F,
                imageSrc: G
            }
        }
    })();
    j.addMsg({
        "@canvas.unload.message": "\uc791\uc131\ud558\uc2e0 \ub0b4\uc6a9\uc774 \uc800\uc7a5\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4. \ud398\uc774\uc9c0\ub97c \ub5a0\ub098\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",
        "@canvas.unload.message.at.modify": "\uc791\uc131\ud558\uc2e0 \ub0b4\uc6a9\uc774 \uc800\uc7a5\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4. \ud398\uc774\uc9c0\ub97c \ub5a0\ub098\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"
    });
    g.install("editor.isDisableUnloadHandler & editor.setDisableUnloadHandler", function(e) {
        var w = u;
        e.isDisableUnloadHandler = function() {
            return w
        };
        e.setDisableUnloadHandler = function() {
            w = c
        };
        e.setEnableUnloadHandler = function() {
            w = u
        }
    });
    g.module("observing beforeunload event", function(z, A, B, x, w) {
        var e = w.events;
        var y = new g.Validator();
        t.observe(window, "beforeunload", function(C) {
            if (z.isDisableUnloadHandler()) {
                if (e.preventUnload) {
                    x.fireJobs(g.Ev.__CANVAS_BEFORE_UNLOAD);
                    if (y.exists(x.getContent())) {
                        C.returnValue = TXMSG("@canvas.unload.message");
                        return TXMSG("@canvas.unload.message")
                    }
                }
            }
        }, c)
    });
    j.addMsg({
        "@align.image.align.center": "\uac00\uc6b4\ub370\uc815\ub82c",
        "@align.image.align.full": "\uc624\ub978\ucabd\uae00\ud750\ub984",
        "@align.image.align.left": "\uc67c\ucabd\uc815\ub82c",
        "@align.image.align.right": "\uc67c\ucabd\uae00\ud750\ub984",
        "@align.text.align.center": "\uac00\uc6b4\ub370\uc815\ub82c (Ctrl+.)",
        "@align.text.align.full": "\uc591\ucabd\uc815\ub82c",
        "@align.text.align.left": "\uc67c\ucabd\uc815\ub82c (Ctrl+,)",
        "@align.text.align.right": "\uc624\ub978\ucabd\uc815\ub82c (Ctrl+/)"
    });
    g.module("Register an eventhandler in order to change align icons upon toolbar when user click a specific image or not.", function(y, A, B, x) {
        var C = "tx-selected-image";
        var w = [A.tools.alignleft, A.tools.aligncenter, A.tools.alignright, A.tools.alignfull];
        var e = ["txc-2image-c", "txc-3image-c", "txc-footnote", "txc-jukebox", "txc-movie", "txc-gallery", "txc-imazing", "txc-map", "txc-file", "txc-emo", "tx-entry-embed", "txc-bgm", "txc-pie"];
        var z = function(D) {
            var E = function(F, H, J) {
                if (!F) {
                    return
                }
                var I = i;
                var G = i;
                if (!I) {
                    I = v.find(F.button.elButton, "li")
                }
                if (!G) {
                    G = t(F.button.elIcon)
                }
                G.title = J;
                if (H == "image") {
                    if (!t.hasClassName(I, C)) {
                        t.addClassName(I, C)
                    }
                    F.imageAlignMode = u
                } else {
                    if (t.hasClassName(I, C)) {
                        t.removeClassName(I, C)
                    }
                    F.imageAlignMode = c
                }
            };
            E(w[0], D, D == "image" ? TXMSG("@align.image.align.left") : TXMSG("@align.text.align.left"));
            E(w[1], D, D == "image" ? TXMSG("@align.image.align.center") : TXMSG("@align.text.align.center"));
            E(w[2], D, D == "image" ? TXMSG("@align.image.align.right") : TXMSG("@align.text.align.right"));
            E(w[3], D, D == "image" ? TXMSG("@align.image.align.full") : TXMSG("@align.text.align.full"))
        };
        x.observeElement([{
            tag: "body"
        }, {
            tag: "table"
        }, {
            tag: "hr"
        }], function() {
            z("text")
        });
        x.observeElement({
            tag: "img"
        }, function(E) {
            var D = g.Util.getMatchedClassName(E, e);
            if (D) {
                z("text")
            } else {
                if (v.find(E, "button")) {
                    z("text")
                } else {
                    z("image")
                }
            }
        })
    });
    g.module("make padding area inside Canvas with editor width", function(A, K, M, y) {
        var G = y.getPanel(g.Canvas.__WYSIWYG_MODE);
        if (!G) {
            return
        }
        var O = G.el;
        var L = 16;
        var D = 28;
        var S = 2;
        var E;
        var x;
        var B;
        var R;
        var V = y.getSizeConfig();
        var U = y.getContainerWidth();
        var P = V.contentWidth.toNumber();
        var T = V.contentPadding.toNumber();
        var z = (U > P);
        y.observeJob("canvas.apply.background", function(Y) {
            X({
                top: (Y && Y.topLeftHeight) ? Y.topLeftHeight.parsePx() : 0,
                right: (Y && Y.midRightWidth) ? Y.midRightWidth.parsePx() : 0,
                bottom: (Y && Y.botLeftHeight) ? Y.botLeftHeight.parsePx() : 0,
                left: (Y && Y.midLeftWidth) ? Y.midLeftWidth.parsePx() : 0
            })
        });
        y.observeJob("canvas.apply.letterpaper", function(Y) {
            X({
                top: (Y && Y.topHeight) ? Y.topHeight.parsePx() : 0,
                right: (Y && (Y.midColor || Y.midUrl)) ? T : 0,
                bottom: (Y && Y.botHeight) ? Y.botHeight.parsePx() : 0,
                left: (Y && (Y.midColor || Y.midUrl)) ? T : 0
            })
        });
        if (z) {
            y.observeJob(g.Ev.__IFRAME_LOAD_COMPLETE, function() {
                X();
                e();
                F()
            });
            y.observeJob(g.Ev.__CANVAS_MODE_CHANGE, function() {
                H();
                F()
            });
            y.observeJob(g.Ev.__CANVAS_WRAP_WIDTH_CHANGE, C);
            y.observeJob("canvas.normalscreen.change", C);
            y.observeJob("canvas.fullscreen.change", C);
            if (!t.msie_nonstd) {
                if (t.gecko) {
                    t.setStyle(O, {
                        overflowX: "auto",
                        overflowY: "auto"
                    })
                } else {
                    t.setStyle(O, {
                        overflowX: "auto",
                        overflowY: "scroll"
                    })
                }
            }
        }
        y.getCanvasGuideSize = function() {
            return I().leftWidth.parsePx()
        };

        function X(Y) {
            G.addStyle(N(Y))
        }

        function N(Y) {
            var ab = {};
            var ac = ["top", "bottom", "left", "right"];
            for (var aa = 0; aa < ac.length; aa++) {
                var Z = ac[aa];
                ab[Z] = (Y && Y[Z]) || T
            }
            if (z) {
                ab.left = Math.max(Math.ceil(w()), 0);
                ab.right = Math.max(Math.floor(w()), 0);
                return {
                    width: P,
                    paddingLeft: "0",
                    paddingRight: "0",
                    paddingTop: ab.top.toPx(),
                    paddingBottom: ab.bottom.toPx(),
                    marginLeft: ab.left.toPx(),
                    marginRight: ab.right.toPx()
                }
            } else {
                return {
                    paddingTop: ab.top.toPx(),
                    paddingRight: ab.right.toPx(),
                    paddingBottom: ab.bottom.toPx(),
                    paddingLeft: ab.left.toPx()
                }
            }
        }

        function w() {
            return (U - P - S - L) / 2
        }

        function I() {
            var Y = w();
            if (Y < D) {
                return {
                    leftWidth: "0",
                    rightWidth: "0",
                    rightPos: "0"
                }
            } else {
                return {
                    leftWidth: Math.ceil(Y - T).toPx(),
                    rightWidth: Math.max(0, (Math.floor(Y - T))).toPx(),
                    rightPos: (P + Math.ceil(Y + T)).toPx()
                }
            }
        }

        function W() {
            return E && x
        }
        var J;

        function C() {
            clearTimeout(J);
            J = setTimeout(function() {
                U = y.getContainerWidth();
                Q()
            }, 4)
        }

        function Q() {
            X();
            H();
            F()
        }

        function e() {
            var Y = y.getStyleConfig().color;
            E = tx.div({
                className: "tx-wysiwyg-padding"
            });
            B = tx.div({
                className: "tx-wysiwyg-padding-divL",
                style: {
                    borderColor: Y
                }
            });
            x = tx.div({
                className: "tx-wysiwyg-padding"
            });
            R = tx.div({
                className: "tx-wysiwyg-padding-divR",
                style: {
                    borderColor: Y
                }
            });
            var Z = y.wysiwygEl;
            E.appendChild(B);
            Z.insertBefore(E, O);
            x.appendChild(R);
            Z.insertBefore(x, O);
            H()
        }

        function H() {
            if (W()) {
                var Z = I();
                t.setStyle(E, {
                    width: Z.leftWidth
                });
                t.setStyle(x, {
                    width: Z.rightWidth,
                    left: Z.rightPos
                });
                var Y = Z.leftWidth.parsePx() > D;
                var aa = y.getConfig().showGuideArea;
                var ab = Y && aa ? "1px solid" : "0 none";
                t.setStyle(B, {
                    borderRight: ab,
                    borderBottom: ab
                });
                t.setStyle(R, {
                    borderLeft: ab,
                    borderBottom: ab
                })
            }
        }

        function F() {
            if (W()) {
                if (y.mode == g.Canvas.__WYSIWYG_MODE) {
                    t.show(E);
                    t.show(x)
                } else {
                    t.hide(E);
                    t.hide(x)
                }
            }
        }
    });
    g.module("Register an eventhandler in order to resize block and edit search results & some images in wysiwig panel.", function(y, z, A, w) {
        if (t.msie_nonstd) {
            var e = function(B) {
                if (B.onresizestart == i) {
                    B.onresizestart = function() {
                        return c
                    }
                }
            };
            w.observeElement({
                tag: "img",
                klass: "tx-unresizable"
            }, e);
            w.observeElement({
                tag: "img",
                klass: "tx-entry-attach"
            }, e);
            w.observeElement({
                tag: "img",
                klass: "txc-footnote"
            }, e);
            w.observeElement({
                tag: "iframe",
                klass: "txc-map"
            }, e)
        }
        var x;
        if (t.msie_nonstd) {
            x = function(B) {
                B.setAttribute("unselectable", "on");
                $A(B.getElementsByTagName("*")).each(function(D) {
                    if (D.nodeName.charAt(0) != "/") {
                        D.setAttribute("unselectable", "on")
                    }
                });
                var C = w.getProcessor();
                C.selectControl(B)
            }
        } else {
            x = function(B) {
                var C = w.getProcessor();
                C.selectControl(B);
                throw $stop
            }
        }
        w.observeElement({
            tag: "button"
        }, x);
        w.observeElement({
            tag: "img"
        }, function(B) {
            var C = v.find(B, "button");
            if (C) {
                x(C);
                throw $stop
            }
        })
    });
    g.module("in order to save history for image resizing on IE", function(y, z, A, w) {
        var x = w.history;
        var e = {};
        var B = i;
        w.observeJob(g.Ev.__CANVAS_PANEL_MOUSEDOWN, function(D) {
            var C = t.element(D);
            if (C && C.tagName && C.tagName.toLowerCase() == "img") {
                B = C;
                e = v.getPosition(C)
            }
        });
        w.observeJob(g.Ev.__CANVAS_PANEL_MOUSEUP, function() {
            if (B) {
                var D = c;
                try {
                    var E = v.getPosition(B);
                    for (var C in E) {
                        if (E[C] != e[C]) {
                            D = u
                        }
                    }
                    if (D) {
                        x.saveHistory()
                    }
                } catch (F) {} finally {
                    B = i
                }
            }
        })
    });
    g.module("Add layer to display notice message on editor area before editing", function(x, y, z, w, e) {
        if (e.initializedMessage) {
            w.observeJob(g.Ev.__IFRAME_LOAD_COMPLETE, function() {
                var E = tx.div({
                    id: "tx-canvas-notice",
                    className: "tx-canvas-notice"
                }, e.initializedMessage);
                var B = t("tx_loading");
                var A = B.parentNode;
                A.insertBefore(E, B);
                var D = false;
                var C = function() {
                    if (!D && t("tx-canvas-notice")) {
                        D = true;
                        A.removeChild(E);
                        w.focus()
                    }
                };
                setTimeout(function() {
                    t.observe(w.getPanel("html").getWindow(), "focus", C)
                }, 30);
                t.observe(E, "click", C);
                w.observeJob(g.Ev.__CANVAS_DATA_INITIALIZE, C);
                y.observeJob(g.Ev.__TOOL_CLICK, C)
            })
        }
    });
    g.MarkupTemplate.add("table.col.resize.dragger", '<div class="tx-table-col-resize-dragger" style="position:absolute; overflow:hidden; top: 0; left: 0; width: 3px; height: 100%; cursor:col-resize;"></div>');
    g.MarkupTemplate.add("table.row.resize.dragger", '<div class="tx-table-row-resize-dragger" style="position:absolute; overflow:hidden; top: 0; left: 0; width: 100%; height: 3px; cursor:row-resize;"></div>');
    j.addMsg({
        "@table.noselect.alert": "\ud14c\uc774\ube14\uc744 \uc120\ud0dd\ud558\uc2e0 \ud6c4 \uc0ac\uc6a9\uac00\ub2a5\ud569\ub2c8\ub2e4."
    });
    g.Table = {};
    g.module("table selector", function(y, z, A, x, w) {
        var e;
        e = function(D) {
            var C, B, E;
            C = g.MarkupTemplate.get("table.col.resize.dragger").evaluateAsDom({});
            B = g.MarkupTemplate.get("table.row.resize.dragger").evaluateAsDom({});
            E = D.wysiwygEl;
            v.insertFirst(E, C);
            v.insertFirst(E, B);
            t.hide(C);
            t.hide(B)
        };
        x.observeJob(g.Ev.__CANVAS_PANEL_BACKSPACE_TABLE, function(B) {
            v.remove(B)
        });
        x.observeJob(g.Ev.__IFRAME_LOAD_COMPLETE, function() {
            var H, C, E, G, J, D;
            H = new g.Table.Selector(y, w);
            C = new g.Table.Merge(y, w);
            E = new g.Table.Insert(y, w);
            G = new g.Table.Delete(y, w);
            J = new g.Table.Border(y, w);
            D = new g.Table.TemplateLoader();
            e(x);
            var M = x.getPanel(g.Canvas.__WYSIWYG_MODE);
            var F = M.getProcessor();
            var I = function() {
                var N, O;
                if (H.getSelected().isValid() === c) {
                    N = F.getNode();
                    O = g.TableUtil.getClosestByTagNames(["td", "th"], N);
                    if (O) {
                        H.selectByTd(O, O)
                    }
                }
            };
            x.observeElement({
                tag: "table"
            }, function(N) {
                if (z.tools.advanced) {
                    z.tools.advanced.forceOpen()
                }
            });
            var B = {
                range: "all",
                color: "",
                height: 1,
                type: "solid"
            };
            var L = function() {
                var N = z.tools.cellslinecolor;
                if (N) {
                    B.color = N.config.defaultcolor
                }
            };
            L();
            var K = function() {
                alert(TXMSG("@table.noselect.alert"))
            };
            F.table = {
                getTdArr: function() {
                    return H.getSelectedTdArr()
                },
                isDuringSelection: function() {
                    return H.isDuringSelection()
                },
                execute: function(O, N) {
                    if (!N) {
                        I()
                    }
                    if (H.getSelected().isValid()) {
                        O();
                        x.history.saveHistory()
                    } else {
                        K()
                    }
                },
                merge: function() {
                    this.execute(function() {
                        C.merge(H)
                    }, u)
                },
                resetMerge: function() {
                    this.execute(function() {
                        C.resetMerge(H)
                    })
                },
                insertRowAbove: function() {
                    this.execute(function() {
                        E.insertRowAbove(H)
                    })
                },
                insertRowBelow: function() {
                    this.execute(function() {
                        E.insertRowBelow(H)
                    })
                },
                insertColLeft: function() {
                    this.execute(function() {
                        E.insertColLeft(H)
                    })
                },
                insertColRight: function() {
                    this.execute(function() {
                        E.insertColRight(H)
                    })
                },
                deleteRow: function() {
                    this.execute(function() {
                        G.deleteRow(H)
                    })
                },
                deleteCol: function() {
                    this.execute(function() {
                        G.deleteCol(H)
                    })
                },
                setBorderRange: function(N) {
                    B.range = N
                },
                setBorderColor: function(N) {
                    B.color = N;
                    z.fireJobs(g.Ev.__TOOL_CELL_LINE_CHANGE, {
                        color: N
                    })
                },
                setBorderHeight: function(N) {
                    B.height = N;
                    z.fireJobs(g.Ev.__TOOL_CELL_LINE_CHANGE, {
                        height: N
                    })
                },
                setBorderType: function(N) {
                    B.type = N;
                    z.fireJobs(g.Ev.__TOOL_CELL_LINE_CHANGE, {
                        type: N
                    })
                },
                setNoBorder: function() {
                    var N = this;
                    this.execute(function() {
                        J.setTableSelect(H);
                        J.setBorderRange("all");
                        J.changeBorderColor(N.getTdArr(), "");
                        J.changeBorderHeight(N.getTdArr(), "0");
                        J.changeBorderType(N.getTdArr(), "none")
                    })
                },
                setBorderButtons: function(O, N, Q) {
                    var P;
                    P = z.tools.cellslinecolor;
                    if (P) {
                        P.execute(O)
                    }
                    P = z.tools.cellslineheight;
                    if (P) {
                        P.execute(N)
                    }
                    P = z.tools.cellslinestyle;
                    if (P) {
                        P.execute(Q)
                    }
                },
                getBorderProperty: function() {
                    return {
                        color: B.color,
                        height: B.height,
                        type: B.type
                    }
                },
                applyBorder: function() {
                    var N = this;
                    this.execute(function() {
                        J.setTableSelect(H);
                        J.setBorderRange(B.range);
                        J.changeBorderColor(N.getTdArr(), B.color);
                        J.changeBorderHeight(N.getTdArr(), B.height);
                        J.changeBorderType(N.getTdArr(), B.type);
                        N.addBorderHistory()
                    })
                },
                addBorderHistory: function() {
                    var N;
                    N = z.tools.cellslinepreview;
                    if (N) {
                        N.addBorderHistory(B)
                    }
                },
                tableBackground: function(O) {
                    var N = this;
                    this.execute(function() {
                        var R, S, Q, P;
                        R = {
                            backgroundColor: O
                        };
                        S = N.getTdArr();
                        P = S.length;
                        for (Q = 0; Q < P; Q += 1) {
                            t.setStyle(S[Q], R)
                        }
                        H.reset()
                    })
                },
                setTemplateStyle: function(O, N) {
                    if (O) {
                        D.getTemplate(N, function(P) {
                            P.apply(O);
                            H.reset()
                        })
                    } else {
                        K()
                    }
                }
            };
            z.fireJobs(g.Ev.__TOOL_CELL_LINE_CHANGE, {
                color: B.color,
                height: B.height,
                type: B.type,
                fromInit: u
            });
            z.observeJob(g.Ev.__TOOL_CLICK, function(N) {
                if (["fontfamily", "fontsize", "bold", "underline", "italic", "strike", "forecolor", "backcolor", "indent", "outdent", "alignleft", "aligncenter", "alignright", "alignfull", "mergecells", "splitcells", "insertcells", "deletecells", "cellsoutline", "cellslinecolor", "cellslineheight", "cellslinestyle", "cellslinepreview", "tablebackcolor", "tabletemplate"].contains(N) === c) {
                    H.reset()
                }
                if (N === "tablebackcolor") {
                    I()
                }
            })
        })
    });
    g.Table.Selector = g.Class.create({
        SELECTED_CLASS_NAME: "tx_table_selected_cell",
        SELECTED_CSS_TEXT: "{background:#e9eeff !important}",
        initialize: function(e) {
            this.canvas = e.getCanvas();
            this.wysiwygPanel = this.canvas.getPanel(g.Canvas.__WYSIWYG_MODE);
            this.htmlBody = this.getHtmlBody();
            this.isDragging = c;
            this.currentTable = i;
            this.currentTd = i;
            this.paintedTdArr = [];
            this.startCellBoundary = new g.TableUtil.Boundary();
            this.endCellBoundary = this.startCellBoundary;
            this.selectedBoundary = new g.TableUtil.Boundary();
            this.tableIndexer = i;
            this.applyCss();
            this.observeEvent()
        },
        getHtmlBody: function() {
            var e;
            e = this.wysiwygPanel.getDocument();
            return e.body
        },
        applyCss: function() {
            var e;
            e = this.wysiwygPanel.getDocument();
            t.applyCSSText(e, "." + this.SELECTED_CLASS_NAME + this.SELECTED_CSS_TEXT)
        },
        observeEvent: function() {
            var e;
            e = this;
            this.canvas.observeJob(g.Ev.__CANVAS_PANEL_MOUSEDOWN, function(x) {
                var w;
                w = t.element(x);
                e.onmousedown(w)
            });
            t.observe(this.htmlBody, "mousemove", function(x) {
                var w;
                w = t.element(x);
                e.onmousemove(w)
            });
            this.canvas.observeJob(g.Ev.__CANVAS_PANEL_MOUSEUP, function(w) {
                e.onmouseup()
            });
            t.observe(h.top, "mouseup", function(w) {
                e.onmouseup()
            });
            this.canvas.observeJob(g.Ev.__CANVAS_PANEL_KEYDOWN, function(w) {
                if (e.isDragging) {
                    t.stop(w);
                    e.reset()
                } else {
                    e.onkeydown(w.ctrlKey, w.keyCode)
                }
            });
            this.canvas.observeJob(g.Ev.__CANVAS_DATA_INITIALIZE, function(w) {
                if (w === g.Canvas.__WYSIWYG_MODE) {
                    e.clearSelected()
                }
            })
        },
        onmousedown: function(w) {
            var x, e;
            this.reset();
            if (this.canvas.config.readonly === c) {
                x = g.TableUtil.getClosestByTagNames(["td", "th"], w);
                e = v.find(x, ".txc-info");
                if (x && !e) {
                    this.selectStart(x);
                    this.turnOnDragging()
                }
            }
        },
        onmousemove: function(w) {
            var y, e, x;
            if (this.isDragging) {
                y = g.TableUtil.getClosestByTagNames(["td", "th"], w);
                if (y) {
                    e = g.TableUtil.getClosestByTagNames(["table"], y);
                    if (e === this.currentTable && y !== this.currentTd) {
                        this.selectEnd(y);
                        this.applySelected();
                        g.TableUtil.collapseCaret(this.wysiwygPanel, w)
                    }
                } else {
                    x = (this.endCellBoundary === this.startCellBoundary);
                    if (this.currentTd && x) {
                        this.selectEnd(this.currentTd);
                        this.applySelected();
                        g.TableUtil.collapseCaret(this.wysiwygPanel, w)
                    }
                }
            }
        },
        onmouseup: function() {
            if (this.isDragging) {
                this.turnOffDragging()
            }
        },
        onkeydown: function(z, y) {
            var x, e, w;
            if (z === c) {
                if (y === t.KEY_DELETE) {
                    x = this.getSelectedTdArr();
                    e = x.length;
                    for (w = 0; w < e; w += 1) {
                        g.TableUtil.emptyTd(x[w])
                    }
                }
                this.reset()
            }
        },
        selectStart: function(e) {
            this.currentTable = g.TableUtil.getClosestByTagNames(["table"], e);
            this.tableIndexer = new g.TableUtil.Indexer(this.currentTable);
            this.startCellBoundary = this.tableIndexer.getBoundary(e);
            this.endCellBoundary = this.startCellBoundary;
            this.currentTd = e
        },
        selectEnd: function(e) {
            this.endCellBoundary = this.tableIndexer.getBoundary(e);
            this.currentTd = e
        },
        applySelected: function() {
            this.calculateSelectedBoundary();
            this.extendSelectedBoundary();
            this.paint()
        },
        calculateSelectedBoundary: function() {
            this.selectedBoundary = new g.TableUtil.Boundary();
            this.selectedBoundary.merge(this.startCellBoundary);
            this.selectedBoundary.merge(this.endCellBoundary)
        },
        extendSelectedBoundary: function() {
            var e;
            e = this.selectedBoundary.isValid();
            while (e) {
                e = this.oneTimeExtendBoundary()
            }
        },
        oneTimeExtendBoundary: function() {
            var y, x, w, z, e;
            y = this.tableIndexer.getTdArr(this.selectedBoundary);
            w = y.length;
            for (x = 0; x < w; x += 1) {
                z = this.tableIndexer.getBoundary(y[x]);
                e = this.selectedBoundary.merge(z);
                if (e) {
                    return u
                }
            }
            return c
        },
        paint: function() {
            var w, e;
            w = this.tableIndexer.getTdArr(this.selectedBoundary);
            e = Array.prototype.without.apply(this.paintedTdArr, w);
            this.paintSelected(w);
            this.eraseSelected(e)
        },
        paintSelected: function(w) {
            var e;
            e = this;
            this.paintedTdArr = [];
            w.each(function(x) {
                t.addClassName(x, e.SELECTED_CLASS_NAME);
                e.paintedTdArr.push(x)
            })
        },
        eraseSelected: function(e) {
            this.removeClassName(e);
            this.paintedTdArr = Array.prototype.without.apply(this.paintedTdArr, e)
        },
        removeClassName: function(w) {
            var e;
            e = this;
            w.each(function(y) {
                var x;
                t.removeClassName(y, e.SELECTED_CLASS_NAME);
                if (y.className === "") {
                    x = y.removeAttribute("class");
                    if (x === c) {
                        y.removeAttribute("className")
                    }
                }
            })
        },
        clearSelected: function() {
            var e;
            e = v.collectAll(this.htmlBody, "." + this.SELECTED_CLASS_NAME);
            this.removeClassName(e);
            this.paintedTdArr = []
        },
        resetBoundary: function() {
            this.startCellBoundary = new g.TableUtil.Boundary();
            this.endCellBoundary = this.startCellBoundary;
            this.selectedBoundary = new g.TableUtil.Boundary()
        },
        turnOnDragging: function() {
            this.isDragging = u
        },
        turnOffDragging: function() {
            this.isDragging = c
        },
        resetDragging: function() {
            this.isDragging = c;
            this.currentTable = i;
            this.currentTd = i
        },
        isDuringSelection: function() {
            return this.isDragging
        },
        getIndexer: function() {
            return this.tableIndexer
        },
        getSelected: function() {
            return this.selectedBoundary
        },
        getSelectedTdArr: function() {
            if (this.selectedBoundary.isValid()) {
                return this.tableIndexer.getTdArr(this.selectedBoundary)
            }
            return []
        },
        selectByBoundary: function(e) {
            this.resetBoundary();
            this.selectedBoundary = e;
            this.paint()
        },
        selectByTd: function(e, w) {
            this.selectStart(e);
            this.selectEnd(w);
            this.applySelected()
        },
        reset: function() {
            this.clearSelected();
            this.resetBoundary();
            this.resetDragging();
            this.reloadIndexer()
        },
        reloadIndexer: function() {
            if (this.tableIndexer) {
                this.tableIndexer.reload()
            }
        },
        getSizeOfSelected: function() {
            var w, x, y, e, z;
            w = this.getSelectedTdArr();
            if (0 < w.length) {
                x = w[0];
                y = w[w.length - 1];
                e = v.getPosition(x);
                z = v.getPosition(y);
                return {
                    width: z.x + z.width - e.x,
                    height: z.y + z.height - e.y
                }
            }
            return {
                width: 0,
                height: 0
            }
        }
    });
    j.addMsg({
        "@table.merge.confirm": "\uc140\uc744 \ubcd1\ud569\ud558\uba74 \ub9e8 \uc704\ucabd \uc140\uc5d0 \uc788\ub294 \uac12\ub9cc \ub0a8\uace0 \ub098\uba38\uc9c0 \uac12\uc740 \uc783\uac8c \ub429\ub2c8\ub2e4.",
        "@table.merge.more.select.cells": "\ub450 \uac1c \uc774\uc0c1\uc758 \uc140\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."
    });
    g.Table.Merge = g.Class.create({
        initialize: function(w) {
            var e;
            e = w.getCanvas();
            this.wysiwygPanel = e.getPanel(g.Canvas.__WYSIWYG_MODE)
        },
        merge: function(y) {
            var x, z, w;
            y.reloadIndexer();
            x = y.getSelectedTdArr();
            if (1 < x.length) {
                var e = this.isExistContents(x, 1);
                if (e && confirm(TXMSG("@table.merge.confirm")) == c) {
                    return
                }
                w = y.getSizeOfSelected();
                z = x[0];
                this.deleteCellForMerge(x);
                this.extendCellForMerge(z, y, w);
                y.reset();
                y.selectByTd(z, z);
                g.TableUtil.collapseCaret(this.wysiwygPanel, z)
            } else {
                alert(TXMSG("@table.merge.more.select.cells"))
            }
        },
        isExistContents: function(e, E) {
            E = E || 0;
            var B = u;
            for (var x = E, C = e.length; x < C; x++) {
                var D = e[x] || "";
                var z = D.innerHTML.trim().toLowerCase().replace(/(&nbsp;|\s)/g, "");
                var y = (z == "<p></p>"),
                    w = (z == "<p><br></p>"),
                    A = (z == "");
                if (y || w || A) {
                    B = c;
                    break
                }
            }
            return B
        },
        deleteCellForMerge: function(y) {
            var x, z, w, e;
            x = y[0].innerHTML;
            e = y.length;
            for (w = 1; w < e; w += 1) {
                z = x.replace(g.__WORD_JOINER_REGEXP, "").trim();
                if (z === "" || z === "&nbsp;") {
                    x = y[w].innerHTML
                }
                v.remove(y[w])
            }
            y[0].innerHTML = x
        },
        extendCellForMerge: function(y, x, w) {
            var e;
            e = x.getSelected();
            y.colSpan = e.right - e.left + 1;
            y.rowSpan = e.bottom - e.top + 1;
            if (y.style.width) {
                v.setWidth(y, w.width + "px")
            }
            if (y.style.height) {
                v.setHeight(y, w.height + "px")
            }
        },
        resetMerge: function(x) {
            var w, e;
            x.reloadIndexer();
            w = this.splitCol(x);
            x.reloadIndexer();
            e = this.splitRow(x);
            if (w === c && e === c) {
                alert("\uc774\ubbf8 \ud569\uccd0\uc9c4 \uc140\ub9cc \ubd84\ud560 \uac00\ub2a5\ud569\ub2c8\ub2e4.")
            } else {
                x.reloadIndexer()
            }
        },
        splitCol: function(z) {
            var A, y, B, x, e, w;
            A = c;
            y = z.getSelectedTdArr();
            e = y.length;
            if (0 < e) {
                for (x = 0; x < e; x += 1) {
                    B = y[x];
                    w = this.splitTdByColSpan(B);
                    A = A || w
                }
            }
            return A
        },
        splitRow: function(z) {
            var A, y, B, x, e, w;
            A = c;
            y = z.getSelectedTdArr();
            e = y.length;
            if (0 < e) {
                for (x = 0; x < e; x += 1) {
                    B = y[x];
                    w = this.splitTdByRowSpan(B);
                    A = A || w
                }
            }
            return A
        },
        splitTdByColSpan: function(y) {
            var w, e, x;
            w = y.colSpan - 1;
            x = 0 < w;
            g.TableUtil.splitWidthByColSpan(y);
            y.colSpan = 1;
            while (0 < w) {
                e = g.TableUtil.cloneNodeForEmptyTd(y);
                v.insertNext(e, y);
                w -= 1
            }
            return x
        },
        splitTdByRowSpan: function(x) {
            var w, e;
            e = x.rowSpan - 1;
            w = 0 < e;
            g.TableUtil.splitHeightByRowSpan(x);
            while (0 < e) {
                this.splitTdOneByOne(x);
                e -= 1
            }
            return w
        },
        splitTdOneByOne: function(y) {
            var e, w, x;
            e = this.getTrForInsert(y);
            w = this.getTdForInsert(y, e);
            x = g.TableUtil.cloneNodeForEmptyTd(y);
            x.rowSpan = 1;
            y.rowSpan -= 1;
            if (w) {
                v.insertAt(x, w)
            } else {
                v.append(e, x)
            }
        },
        getTrForInsert: function(y) {
            var x, e, w;
            w = v.parent(y);
            e = y.rowSpan - 1;
            for (x = 0; x < e; x += 1) {
                w = v.next(w, "tr")
            }
            return w
        },
        getTdForInsert: function(x, B) {
            var z, D, w, E, A, y, C, e;
            z = g.TableUtil.getTableIndexerFromTd(x);
            D = z.getBoundary(x);
            w = D.left;
            E = B.cells;
            A = E.length;
            for (y = 0; y < A; y += 1) {
                C = E[y];
                e = z.getBoundary(C);
                if (w <= e.left) {
                    return C
                }
            }
            return i
        }
    });
    g.Table.Insert = g.Class.create({
        COL_DIRECTION: {
            LEFT: "left",
            RIGHT: "right"
        },
        initialize: function(w) {
            var e;
            e = w.getCanvas();
            this.wysiwygPanel = e.getPanel(g.Canvas.__WYSIWYG_MODE)
        },
        insertRowAbove: function(w) {
            var x, e;
            w.reloadIndexer();
            x = w.getSelected();
            if (x.isValid()) {
                e = w.getIndexer();
                this.insertRowAboveByBoundary(x, e);
                w.reset()
            }
        },
        insertRowAboveByBoundary: function(B, x) {
            var y, w, e, z, A;
            y = x.table;
            w = B.bottom - B.top + 1;
            e = B.top;
            z = x.getTdArr(new g.TableUtil.Boundary({
                top: B.top,
                right: x.getColSize() - 1,
                bottom: B.top,
                left: 0
            }));
            A = x.getTdArrHasTop(B.top);
            this.addRow(y, w, e, z, A)
        },
        addRow: function(A, x, e, B, C) {
            var z, y, w;
            z = function(E) {
                var D;
                if (C.contains(E)) {
                    D = g.TableUtil.cloneNodeForEmptyTd(E);
                    g.TableUtil.splitHeightByRowSpan(D);
                    D.rowSpan = 1;
                    w.appendChild(D)
                } else {
                    E.rowSpan += 1
                }
            };
            for (y = 0; y < x; y += 1) {
                w = A.insertRow(e);
                B.each(z)
            }
        },
        insertRowBelow: function(w) {
            var x, e;
            w.reloadIndexer();
            x = w.getSelected();
            if (x.isValid()) {
                e = w.getIndexer();
                this.insertRowBelowByBoundary(x, e);
                w.reset()
            }
        },
        insertRowBelowByBoundary: function(B, x) {
            var y, w, e, z, A;
            y = x.table;
            w = B.bottom - B.top + 1;
            e = B.bottom + 1;
            z = x.getTdArr(new g.TableUtil.Boundary({
                top: B.bottom,
                right: x.getColSize() - 1,
                bottom: B.bottom,
                left: 0
            }));
            A = x.getTdArrHasBottom(B.bottom);
            this.addRow(y, w, e, z, A)
        },
        insertColLeft: function(w) {
            var x, e;
            w.reloadIndexer();
            x = w.getSelected();
            if (x.isValid()) {
                e = w.getIndexer();
                this.insertColLeftByBoundary(x, e);
                w.reset()
            }
        },
        insertColLeftByBoundary: function(z, e) {
            var w, x, y;
            w = z.right - z.left + 1;
            x = e.getTdArr(new g.TableUtil.Boundary({
                top: 0,
                right: z.left,
                bottom: e.getRowSize() - 1,
                left: z.left
            }));
            y = e.getTdArrHasLeft(z.left);
            this.addCol(w, x, y, this.COL_DIRECTION.LEFT)
        },
        addCol: function(y, z, B, A) {
            var e, x, w;
            e = this;
            x = function(D) {
                var C;
                if (B.contains(D)) {
                    C = g.TableUtil.cloneNodeForEmptyTd(D);
                    g.TableUtil.splitWidthByColSpan(C);
                    C.colSpan = 1;
                    if (A === e.COL_DIRECTION.LEFT) {
                        v.insertAt(C, D)
                    } else {
                        v.insertNext(C, D)
                    }
                } else {
                    D.colSpan += 1
                }
            };
            for (w = 0; w < y; w += 1) {
                z.each(x)
            }
        },
        insertColRight: function(w) {
            var x, e;
            w.reloadIndexer();
            x = w.getSelected();
            if (x.isValid()) {
                e = w.getIndexer();
                this.insertColRightByBoundary(x, e);
                w.reset()
            }
        },
        insertColRightByBoundary: function(z, e) {
            var w, x, y;
            w = z.right - z.left + 1;
            x = e.getTdArr(new g.TableUtil.Boundary({
                top: 0,
                right: z.right,
                bottom: e.getRowSize() - 1,
                left: z.right
            }));
            y = e.getTdArrHasRight(z.right);
            this.addCol(w, x, y, this.COL_DIRECTION.RIGHT)
        }
    });
    g.Table.Delete = g.Class.create({
        initialize: function(w) {
            var e;
            e = w.getCanvas();
            this.wysiwygPanel = e.getPanel(g.Canvas.__WYSIWYG_MODE)
        },
        deleteRow: function(e) {
            var w;
            w = e.getSelected();
            if (w.isValid()) {
                this.deleteRowOneByOne(e);
                e.reset();
                this.deleteEmptyTableByTableSelector(e)
            }
        },
        deleteRowOneByOne: function(y) {
            var e, x, z, w;
            z = y.getSelected();
            e = z.top;
            x = z.bottom - z.top + 1;
            while (0 < x) {
                y.reloadIndexer();
                w = y.getIndexer();
                this.deleteRowByIndex(w, e);
                x -= 1
            }
            if (e === 0) {
                this.drawTopBorder(y)
            }
        },
        drawTopBorder: function(z) {
            var x, y, e, w, A;
            z.reloadIndexer();
            x = z.getIndexer();
            y = x.getTdArrHasTop(0);
            e = y.length;
            for (w = 0; w < e; w += 1) {
                A = y[w];
                if (A.style.borderTop === "" && A.style.borderBottom !== "") {
                    A.style.borderTop = A.style.borderBottom
                }
            }
        },
        deleteRowByIndex: function(y, x) {
            var A, w, e, z;
            A = this.getTdArrByRowIndex(y, x);
            w = this.getTdArrByHasTop(y, x);
            e = A.length;
            if (0 < e) {
                z = v.parent(A[0]);
                this.deleteTdInDeleteRow(A, w, z, y);
                v.remove(z)
            }
        },
        getTdArrByRowIndex: function(w, e) {
            return w.getTdArr(new g.TableUtil.Boundary({
                top: e,
                right: w.getColSize() - 1,
                bottom: e,
                left: 0
            }))
        },
        getTdArrByHasTop: function(w, e) {
            return w.getTdArrHasTop(e)
        },
        deleteTdInDeleteRow: function(A, w, z, y) {
            var e, x, B;
            e = A.length;
            for (x = 0; x < e; x += 1) {
                B = A[x];
                if (1 < B.rowSpan) {
                    B.rowSpan -= 1;
                    this.reduceHeightAsRow(B, z);
                    if (w.contains(B)) {
                        this.shiftRowOfTd(B, y)
                    }
                } else {
                    v.remove(B)
                }
            }
        },
        reduceHeightAsRow: function(y, w) {
            var x, e;
            if (y.style.height) {
                x = parseInt(y.style.height, 10);
                e = x - w.offsetHeight;
                if (0 < e) {
                    v.setStyles(y, {
                        height: e + "px"
                    }, u)
                }
            }
        },
        shiftRowOfTd: function(z, x) {
            var y, e, w;
            y = v.parent(z);
            e = v.next(y, "tr");
            w = this.getTdForInsert(z, e, x);
            if (w) {
                v.insertAt(z, w)
            } else {
                v.append(e, z)
            }
        },
        getTdForInsert: function(x, B, z) {
            var D, w, E, A, y, C, e;
            D = z.getBoundary(x);
            w = D.left;
            E = B.cells;
            A = E.length;
            for (y = 0; y < A; y += 1) {
                C = E[y];
                e = z.getBoundary(C);
                if (w <= e.left) {
                    return C
                }
            }
            return i
        },
        deleteEmptyTableByTableSelector: function(x) {
            var e, w;
            e = x.getIndexer();
            w = e.table;
            if (w.rows.length === 0) {
                v.remove(w)
            }
        },
        deleteCol: function(e) {
            var w;
            w = e.getSelected();
            if (w.isValid()) {
                this.deleteColOneByOne(e);
                e.reset();
                this.deleteEmptyTableByTableSelector(e)
            }
        },
        deleteColOneByOne: function(y) {
            var e, x, z, w;
            z = y.getSelected();
            e = z.left;
            x = z.right - z.left + 1;
            while (0 < x) {
                y.reloadIndexer();
                w = y.getIndexer();
                this.deleteColByIndex(w, e);
                x -= 1
            }
            if (e === 0) {
                this.drawLeftBorder(y)
            }
        },
        drawLeftBorder: function(z) {
            var x, y, e, w, A;
            z.reloadIndexer();
            x = z.getIndexer();
            y = x.getTdArrHasLeft(0);
            e = y.length;
            for (w = 0; w < e; w += 1) {
                A = y[w];
                if (A.style.borderLeft === "" && A.style.borderRight !== "") {
                    A.style.borderLeft = A.style.borderRight
                }
            }
        },
        deleteColByIndex: function(y, w) {
            var z, e, x, A;
            z = this.getTdArrByColIndex(y, w);
            e = z.length;
            for (x = 0; x < e; x += 1) {
                A = z[x];
                if (1 < A.colSpan) {
                    A.colSpan -= 1
                } else {
                    v.remove(A)
                }
            }
        },
        getTdArrByColIndex: function(w, e) {
            return w.getTdArr(new g.TableUtil.Boundary({
                top: 0,
                right: e,
                bottom: w.getRowSize() - 1,
                left: e
            }))
        }
    });
    g.Table.Border = g.Class.create({
        $const: {
            BORDER_STYLE: "1px solid #ccc"
        },
        initialize: function(x, w) {
            var e;
            e = x.getCanvas();
            this.wysiwygPanel = e.getPanel(g.Canvas.__WYSIWYG_MODE);
            this.borderRange = "all";
            this.borderColor = "#4174D9";
            this.tableSelect = i;
            this.selectedBoundary = i
        },
        setBorderRange: function(e) {
            this.borderRange = e
        },
        setTableSelect: function(e) {
            this.tableSelect = e;
            this.selectedBoundary = e.getSelected()
        },
        changeTopBorderStyle: function(z, D, C) {
            var w = {};
            var x = this.selectedBoundary;
            var E, e;
            var B = this.tableSelect.getIndexer();
            var y;
            if (x.top == 0) {
                E = "borderTop" + D;
                y = new g.TableUtil.Boundary({
                    top: x.top,
                    bottom: x.top,
                    left: x.left,
                    right: x.right
                })
            } else {
                E = "borderBottom" + D;
                y = new g.TableUtil.Boundary({
                    top: x.top - 1,
                    bottom: x.top - 1,
                    left: x.left,
                    right: x.right
                })
            }
            e = B.getTdArr(y);
            w[E] = C;
            for (var A = 0; A < e.length; A++) {
                t.setStyle(e[A], w)
            }
        },
        changeBottomBorderStyle: function(y, D, C) {
            var w = {};
            var x = this.selectedBoundary;
            var E, e, z;
            var B = this.tableSelect.getIndexer();
            E = "borderBottom" + D;
            z = new g.TableUtil.Boundary({
                top: x.bottom,
                bottom: x.bottom,
                left: x.left,
                right: x.right
            });
            e = B.getTdArr(z);
            w[E] = C;
            for (var A = 0; A < e.length; A++) {
                t.setStyle(e[A], w)
            }
        },
        changeLeftBorderStyle: function(z, D, C) {
            var w = {};
            var x = this.selectedBoundary;
            var E, e;
            var B = this.tableSelect.getIndexer();
            var y;
            if (x.left == 0) {
                E = "borderLeft" + D;
                y = new g.TableUtil.Boundary({
                    top: x.top,
                    bottom: x.bottom,
                    left: x.left,
                    right: x.left
                })
            } else {
                E = "borderRight" + D;
                y = new g.TableUtil.Boundary({
                    top: x.top,
                    bottom: x.bottom,
                    left: x.left - 1,
                    right: x.left - 1
                })
            }
            e = B.getTdArr(y);
            w[E] = C;
            for (var A = 0; A < e.length; A++) {
                t.setStyle(e[A], w)
            }
        },
        changeRightBorderStyle: function(z, D, C) {
            var w = {};
            var x = this.selectedBoundary;
            var E, e;
            var B = this.tableSelect.getIndexer();
            var y;
            E = "borderRight" + D;
            y = new g.TableUtil.Boundary({
                top: x.top,
                bottom: x.bottom,
                left: x.right,
                right: x.right
            });
            e = B.getTdArr(y);
            w[E] = C;
            for (var A = 0; A < e.length; A++) {
                t.setStyle(e[A], w)
            }
        },
        changeInBorderStyle: function(B, H, G) {
            var C = {};
            var z = {};
            var y = this.selectedBoundary;
            var I, e, F, x;
            var A, w;
            var E = this.tableSelect.getIndexer();
            F = "borderBottom" + H;
            A = new g.TableUtil.Boundary({
                top: y.top,
                bottom: y.bottom - 1,
                left: y.left,
                right: y.right
            });
            I = E.getTdArr(A);
            C[F] = G;
            for (var D = 0; D < I.length; D++) {
                t.setStyle(I[D], C)
            }
            x = "borderRight" + H;
            w = new g.TableUtil.Boundary({
                top: y.top,
                bottom: y.bottom,
                left: y.left,
                right: y.right - 1
            });
            e = E.getTdArr(w);
            z[x] = G;
            for (var D = 0; D < e.length; D++) {
                t.setStyle(e[D], z)
            }
        },
        changeOutBorderStyle: function(x, e, w) {
            this.changeTopBorderStyle(x, e, w);
            this.changeBottomBorderStyle(x, e, w);
            this.changeLeftBorderStyle(x, e, w);
            this.changeRightBorderStyle(x, e, w)
        },
        changeNoneBorderStyle: function(x, e, w) {},
        changeBorderStyle: function(x, e, w) {
            var y = this.borderRange;
            switch (y) {
                case "top":
                    this.changeTopBorderStyle(x, e, w);
                    break;
                case "bottom":
                    this.changeBottomBorderStyle(x, e, w);
                    break;
                case "left":
                    this.changeLeftBorderStyle(x, e, w);
                    break;
                case "right":
                    this.changeRightBorderStyle(x, e, w);
                    break;
                case "in":
                    this.changeInBorderStyle(x, e, w);
                    break;
                case "out":
                    this.changeOutBorderStyle(x, e, w);
                    break;
                case "all":
                    this.changeInBorderStyle(x, e, w);
                    this.changeOutBorderStyle(x, e, w);
                    break;
                case "none":
                    this.changeInBorderStyle(x, e, w);
                    this.changeOutBorderStyle(x, e, w);
                    break;
                default:
                    break
            }
        },
        changeBorderColor: function(w, e) {
            if (e != i) {
                this.borderColor = e
            }
            this.changeBorderStyle(w, "Color", this.borderColor)
        },
        changeBorderType: function(w, e) {
            this.changeBorderStyle(w, "Style", e);
            this.changeBorderColor(w)
        },
        changeBorderHeight: function(x, w) {
            var e = w.toPx();
            this.changeBorderStyle(x, "Width", e);
            this.changeBorderColor(x)
        }
    });
    (function() {
        g.Table.TemplateLoader = g.Class.create({
            initialize: function() {
                this.templateList = i
            },
            getTemplate: function(x, y) {
                if (isNaN(x)) {
                    return
                }
                if (this.templateList) {
                    y(new e(this.templateList[x]))
                } else {
                    var w = this;
                    this.loadTemplate(function(z) {
                        w.templateList = z;
                        y(new e(w.templateList[x]))
                    })
                }
            },
            loadTemplate: function(x) {
                var w = this.getJSBasePath() + "trex/modules/table/async/template_data.js";
                EditorJSLoader.asyncLoadModule({
                    url: p.getUrl(w),
                    callback: function() {
                        var y = getTableTemplateList();
                        x(y)
                    }
                })
            },
            getJSBasePath: function() {
                var x;
                try {
                    x = EditorJSLoader.getJSBasePath("editor.js")
                } catch (w) {
                    x = EditorJSLoader.getJSBasePath()
                }
                return x
            }
        });
        var e = g.Class.create({
            initialize: function(w) {
                this.templateData = w
            },
            apply: function(A) {
                var z = new g.Tool.Table.TableCellMatrixer(A);
                var B = z.getTdMatrix();
                var w = this;
                for (var y = 0; y < B.length; y++) {
                    for (var x = 0; x < B[y].length; x++) {
                        w.setCellStyle(B[y][x], {
                            isEvenRow: (y % 2) == 1,
                            isFirstRow: y == 0,
                            isLastRow: y == B.length - 1,
                            isFirstCol: x == 0,
                            isLastCol: (x == B[y].length - 1)
                        })
                    }
                }
            },
            setCellStyle: function(x, w) {
                var y = this.templateData;
                var z = Object.extend({}, y.common);
                Object.extend(z, (w.isEvenRow) ? y.evenRow : y.oddRow);
                Object.extend(z, (w.isFirstRow) ? y.firstRow : (w.isLastRow) ? y.lastRow : {});
                Object.extend(z, (w.isLastCol) ? y.lastCol : {});
                Object.extend(z, (w.isFirstCol) ? y.firstCol : {});
                txlib.setStyle(x, z)
            }
        })
    })();
    g.module("table resize dragger", function(w, x, y, e) {
        e.observeJob(g.Ev.__IFRAME_LOAD_COMPLETE, function() {
            var X = e.getPanel(g.Canvas.__WYSIWYG_MODE);
            var I = X.getDocument();
            var aE = X.getWindow();
            var ac = I.body;
            var aH = 20;
            var aB;
            var aP = v.collect(e.wysiwygEl, ".tx-table-col-resize-dragger");
            var aN = v.collect(e.wysiwygEl, ".tx-table-row-resize-dragger");
            var Z = c;
            var aM, Y, au, aq;
            var aL, aQ, aK;
            var ao, Q, P;
            var aC, z;
            var E, C;
            var S, aA, aF;
            var aj, K, ab;
            var W, V, aI;
            var aJ = {
                TOP: "EDGE_TOP",
                BOTTOM: "EDGE_BOTTOM",
                LEFT: "EDGE_LEFT",
                RIGHT: "EDGE_RIGHT",
                NONE: "NONE"
            };
            var ae = aJ.NONE;
            var L = function() {
                Z = c;
                aC = i;
                z = i;
                aM = Y = i;
                au = aq = i;
                aA = S = aF = i;
                aj = K = ab = i;
                E = C = 0;
                ao = Q = P = 0;
                aL = aQ = aK = 0
            };
            var ah = function() {
                aM = v.find(aC, "table");
                if (aM == i) {
                    return i
                }
                Z = u;
                ao = aM.offsetWidth;
                if (ae != aJ.NONE) {
                    t.stop(aI);
                    D()
                }
                switch (ae) {
                    case aJ.LEFT:
                        ax();
                        ai();
                        break;
                    case aJ.RIGHT:
                        aG();
                        ai();
                        break;
                    case aJ.TOP:
                        M();
                        az();
                        break;
                    case aJ.BOTTOM:
                        F();
                        az();
                        break
                }
            };
            var ax = function() {
                var aS = new g.TableUtil.Indexer(aM);
                var aR = aS.getBoundary(aC);
                if (aR.left > 0) {
                    S = aS.getTdArrHasRight(aR.left - 1);
                    aA = aS.getTdArrHasLeft(aR.left)
                }
            };
            var aG = function() {
                var aS = new g.TableUtil.Indexer(aM);
                var aR = aS.getBoundary(aC);
                var aT = aS.getColSize();
                S = aS.getTdArrHasRight(aR.right);
                if (aR.right < aT - 1) {
                    aA = aS.getTdArrHasLeft(aR.right + 1)
                }
            };
            var M = function() {
                var aS = new g.TableUtil.Indexer(aM);
                var aR = aS.getBoundary(aC);
                aF = aS.getTdArrHasBottom(aR.top - 1)
            };
            var F = function() {
                var aS = new g.TableUtil.Indexer(aM);
                var aR = aS.getBoundary(aC);
                aF = aS.getTdArrHasTop(aR.bottom)
            };
            var at = function() {
                switch (ae) {
                    case aJ.LEFT:
                    case aJ.RIGHT:
                        G();
                        break;
                    case aJ.TOP:
                    case aJ.BOTTOM:
                        O();
                        break
                }
            };
            var R = function() {
                if (Z) {
                    z = H();
                    ar()
                } else {
                    aa()
                }
            };
            var ar = function() {
                switch (ae) {
                    case aJ.LEFT:
                    case aJ.RIGHT:
                        am();
                        break;
                    case aJ.TOP:
                    case aJ.BOTTOM:
                        aD();
                        break
                }
            };
            var aa = function() {
                var aS = v.find(t.element(aI), "td");
                var aR = v.find(aS, ".txc-info");
                if (aS && !aR) {
                    aC = aS;
                    ae = T(aC);
                    D()
                } else {
                    ae = aJ.NONE;
                    D()
                }
            };
            var H = function() {
                var aR = i;
                switch (ae) {
                    case aJ.LEFT:
                    case aJ.RIGHT:
                        aR = aP;
                        break;
                    case aJ.TOP:
                    case aJ.BOTTOM:
                        aR = aN;
                        break
                }
                return aR
            };
            var ai = function() {
                Z = u;
                aj = [];
                K = [];
                var aR = 0;
                if (S) {
                    for (aR = 0; aR < S.length; aR++) {
                        aj.push(S[aR].offsetWidth)
                    }
                    aL = aO(aj);
                    for (aR = 0; aR < S.length; aR++) {
                        if (aL == aj[aR]) {
                            au = S[aR];
                            break
                        }
                    }
                }
                if (aA) {
                    for (aR = 0; aR < aA.length; aR++) {
                        K.push(aA[aR].offsetWidth)
                    }
                    aQ = aO(K);
                    for (aR = 0; aR < aA.length; aR++) {
                        if (aQ == K[aR]) {
                            aq = aA[aR];
                            break
                        }
                    }
                }
                Q = t.getCoordsTarget(z).left
            };
            var am = function() {
                if (Z) {
                    var aR = parseInt(W - v.getScrollLeft(I) - Q);
                    var aS;
                    if (au && aq) {
                        aS = B(au, aR)
                    }
                    if (au && aq == i) {
                        aS = al(au, aR)
                    }
                    if (au == i && aq) {
                        aS = aw(aq, aR)
                    }
                    if (aS) {
                        t.setStyle(z, {
                            left: aS.toPx()
                        })
                    }
                }
            };
            var B = function(aT, aS) {
                var aV, aW, aR, aU, aX;
                aV = aL + aQ;
                aW = aL + aS;
                aR = aQ - aS;
                aU = t.getCoordsTarget(aT);
                if (aW >= aH && aR >= aH) {
                    aX = W - v.getScrollLeft(I)
                } else {
                    if (aW <= aH) {
                        aW = aH;
                        aR = aV - aW;
                        aX = aU.left - v.getScrollLeft(I) + aW
                    } else {
                        if (aR <= aH) {
                            aR = aH;
                            aW = aV - aR;
                            aX = aU.left - v.getScrollLeft(I) + aW
                        }
                    }
                }
                E = aW - aL;
                return aX
            };
            var al = function(aS, aR) {
                var aU, aT, aV;
                aU = aL + aR;
                aT = t.getCoordsTarget(aS);
                if (aU < aH) {
                    aU = aH
                }
                aV = aT.left - v.getScrollLeft(I) + aU;
                E = aU - aL;
                return aV
            };
            var aw = function(aU, aS) {
                var aR, aT, aV;
                aR = aQ - aS;
                aT = t.getCoordsTarget(aU);
                if (aR < aH) {
                    aR = aH
                }
                aV = aT.left + aR;
                E = aQ - aR;
                return aV
            };
            var G = function() {
                J();
                L();
                aa();
                ay()
            };
            var J = function() {
                var aR;
                if (S) {
                    for (aR = 0; aR < S.length; aR++) {
                        S[aR].style.width = (aj[aR] + E).toPx()
                    }
                }
                if (aA) {
                    for (aR = 0; aR < aA.length; aR++) {
                        aA[aR].style.width = (K[aR] - E).toPx()
                    }
                }
                if (S && aA == i) {
                    N()
                }
            };
            var az = function() {
                Z = u;
                aK = aC.offsetHeight;
                ab = [];
                if (aF) {
                    var aR;
                    for (aR = 0; aR < aF.length; aR++) {
                        ab.push(parseInt(aF[aR].offsetHeight))
                    }
                    aK = aO(ab);
                    for (aR = 0; aR < aF.length; aR++) {
                        if (aK == ab[aR]) {
                            Y = aF[aR]
                        }
                    }
                }
                P = t.getCoordsTarget(z).top
            };
            var aD = function() {
                if (Z) {
                    var aR = V - v.getScrollTop(I) - P;
                    var aS = aK + parseInt(aR);
                    var aT = t.getCoordsTarget(Y);
                    var aU = i;
                    if (aS < 0) {
                        aS = 0;
                        aU = aT.top + aS - v.getScrollTop(I)
                    } else {
                        aU = V - v.getScrollTop(I)
                    }
                    if (aU) {
                        t.setStyle(z, {
                            top: aU.toPx()
                        })
                    }
                    C = aS - aK
                }
            };
            var O = function() {
                ad();
                L();
                aa();
                ay()
            };
            var ad = function() {
                if (aF) {
                    for (var aS = 0; aS < aF.length; aS++) {
                        var aR = ab[aS] + C;
                        if (aR < 0) {
                            aR = 20
                        }
                        aF[aS].style.height = aR.toPx()
                    }
                }
            };
            (function U() {
                var aR = I.createElement("div");
                ac.appendChild(aR);
                aR.style.width = aR.style.paddingLeft = "1px";
                aB = aR.offsetWidth === 2;
                ac.removeChild(aR)
            })();
            var T = function(aU) {
                var a3, a5 = aJ.NONE;
                if ("getBoundingClientRect" in document.documentElement) {
                    try {
                        var a4 = aU.ownerDocument,
                            aS = a4.documentElement,
                            aY = a4.body;
                        var aX = aU.getBoundingClientRect(),
                            aZ = a4.defaultView || a4.parentWindow,
                            aW = aS.clientTop || aY.clientTop || 0,
                            a1 = aS.clientLeft || aY.clientLeft || 0,
                            aR = aZ.pageYOffset || aB && aS.scrollTop || aY.scrollTop,
                            aV = aZ.pageXOffset || aB && aS.scrollLeft || aY.scrollLeft,
                            a2 = aX.top + aR - aW,
                            aT = aX.left + aV - a1;
                        a3 = {
                            top: a2,
                            left: aT,
                            bottom: a2 + aU.offsetHeight,
                            right: aT + aU.offsetWidth
                        }
                    } catch (a0) {
                        a3 = i
                    }
                }
                if (!a3) {
                    a3 = t.getCoordsTarget(aU)
                }
                if ((W - a3.left) < 5 && aU.cellIndex != 0) {
                    a5 = aJ.LEFT
                } else {
                    if ((a3.right - 5) < W) {
                        a5 = aJ.RIGHT
                    } else {
                        if ((V - a3.top) < 5 && aU.parentNode.rowIndex != 0) {
                            a5 = aJ.TOP
                        } else {
                            if ((a3.bottom - 5) < V) {
                                a5 = aJ.BOTTOM
                            }
                        }
                    }
                }
                return a5
            };
            var D = function() {
                e.query(function(aR) {
                    if (aR.table) {
                        if (aR.table.isDuringSelection() || e.config.readonly) {
                            ae = aJ.NONE
                        }
                        switch (ae) {
                            case aJ.LEFT:
                            case aJ.RIGHT:
                                t.hide(aN);
                                t.show(aP);
                                ag(aP);
                                z = aP;
                                break;
                            case aJ.TOP:
                            case aJ.BOTTOM:
                                t.hide(aP);
                                t.show(aN);
                                af(aN);
                                z = aN;
                                break;
                            case aJ.NONE:
                                t.hide(aP);
                                t.hide(aN);
                                break
                        }
                    }
                })
            };
            var ag = function(aS) {
                if (aS == i) {
                    return
                }
                var aR;
                if (Z) {
                    aR = t.getCoordsTarget(aS).left;
                    t.setStyle(aS, {
                        width: "2px",
                        height: X.el.clientHeight.toPx(),
                        border: "1px dotted #81aFFC",
                        background: "",
                        left: aR.toPx()
                    });
                    t.setOpacity(aP, 1)
                } else {
                    aR = W - v.getScrollLeft(I);
                    t.setStyle(aS, {
                        width: "2px",
                        height: X.el.clientHeight.toPx(),
                        border: "",
                        background: "#fff",
                        left: aR.toPx()
                    });
                    t.setOpacity(aP, 0)
                }
            };
            var af = function(aS) {
                if (aS == i) {
                    return
                }
                var aR = i;
                if (Z) {
                    aR = t.getCoordsTarget(aS).top;
                    t.setStyle(aS, {
                        height: "2px",
                        border: "1px dotted #81aFFC",
                        background: "",
                        top: aR.toPx()
                    });
                    t.setOpacity(aN, 1)
                } else {
                    aR = V - v.getScrollTop(I);
                    t.setStyle(aS, {
                        height: "2px",
                        border: "",
                        background: "#fff",
                        top: aR.toPx()
                    });
                    t.setOpacity(aN, 0)
                }
            };
            var N = function() {
                var aR = 0;
                if (ao) {
                    aR = parseInt(ao) + E;
                    aM.width = aR.toPx();
                    aM.style.width = aR.toPx()
                }
            };
            var A = function() {
                t.observe(b.body, "mouseup", function(aR) {
                    av(aR);
                    at()
                });
                if (t.msie) {
                    t.observe(ac, "mousemove", function(aR) {
                        av(aR);
                        R()
                    });
                    t.observe(ac, "mouseup", function(aR) {
                        av(aR);
                        at()
                    })
                } else {
                    t.observe(aE, "mousemove", function(aR) {
                        av(aR);
                        R()
                    });
                    t.observe(aE, "mouseup", function(aR) {
                        av(aR);
                        at()
                    })
                }
                if (t.safari) {
                    t.observe(b.body, "mousemove", function(aR) {
                        if (Z) {
                            ak(aR);
                            R()
                        }
                    })
                }
                t.observe(aP, "mousedown", function(aR) {
                    av(aR);
                    ah()
                });
                t.observe(aN, "mousedown", function(aR) {
                    av(aR);
                    ah()
                })
            };
            var av = function(aR) {
                aI = aR;
                W = ap(aI);
                V = an(aI)
            };
            var ak = function(aR) {
                aI = aR;
                W = ap(aI) - t.getCoords(e.wysiwygEl).left + I.body.scrollLeft;
                V = an(aI) - t.getCoords(e.wysiwygEl).top + I.body.scrollTop
            };
            var ap = function(aS) {
                var aR = 0;
                aS = aS || aE.event;
                if (aS.pageX) {
                    aR = aS.pageX
                } else {
                    if (aS.clientX) {
                        aR = aS.clientX + I.body.scrollLeft + I.documentElement.scrollLeft
                    }
                }
                return aR
            };
            var an = function(aR) {
                var aS = 0;
                aR = aR || aE.event;
                if (aR.pageY) {
                    aS = aR.pageY
                } else {
                    if (aR.clientY) {
                        aS = aR.clientY + I.body.scrollTop + I.documentElement.scrollTop
                    }
                }
                return aS
            };

            function aO(aR) {
                return Math.min.apply(Math, aR)
            }

            function ay() {
                e.history.saveHistory()
            }
            L();
            A()
        })
    });
    if (typeof Editor !== "undefined") {
        Editor.version = "7.4.9"
    }
    try {
        EditorJSLoader.readyState = "complete";
        EditorJSLoader.finish()
    } catch (s) {}
})();