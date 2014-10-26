/*
Copyright 2013, KISSY v1.40
MIT Licensed
build time: Nov 21 23:47
*/
var KISSY = function(a) {
    function e(a) {
        var f = {};
        g.each(k,
        function(e, b) {
            f[b] = function(c) {
                return g.log(c, b, a)
            }
        });
        return f
    }
    var g, l = 0,
    k = {
        debug: 10,
        info: 20,
        warn: 30,
        error: 40
    };
    g = {
        __BUILD_TIME: "20131121234724",
        Env: {
            host: this
        },
        Config: {
            debug: "",
            fns: {}
        },
        version: "1.40",
        config: function(d, e) {
            var n, b, c = this,
            p, h = g.Config,
            q = h.fns;
            g.isObject(d) ? g.each(d,
            function(a, b) { (p = q[b]) ? p.call(c, a) : h[b] = a
            }) : (n = q[d], e === a ? b = n ? n.call(c) : h[d] : n ? b = n.call(c, e) : h[d] = e);
            return b
        },
        log: function() {
            return a
        },
        getLogger: function(a) {
            return e(a)
        },
        error: function() {},
        guid: function(a) {
            return (a || "") + l++
        },
        Logger: {}
    };
    g.Logger.Level = {
        DEBUG: "debug",
        INFO: "info",
        WARN: "warn",
        ERROR: "error"
    };
    return g
} (); (function(a, e) {
    function g() {}
    function l(c, j, b, m, i, h) {
        if (!j || !c) return c;
        var p, t, f, g;
        j[d] = c;
        h.push(j);
        f = a.keys(j);
        g = f.length;
        for (p = 0; p < g; p++) if (t = f[p], t != d) {
            var k = c,
            x = j,
            E = b,
            F = m,
            H = i,
            L = h;
            if (E || !(t in k) || H) {
                var w = k[t],
                u = x[t];
                if (w === u) w === e && (k[t] = w);
                else if (F && (u = F.call(x, t, u)), H && u && (a.isArray(u) || a.isPlainObject(u))) u[d] ? k[t] = u[d] : (x = w && (a.isArray(w) || a.isPlainObject(w)) ? w: a.isArray(u) ? [] : {},
                k[t] = x, l(x, u, E, F, n, L));
                else if (u !== e && (E || !(t in k))) k[t] = u
            }
        }
        return c
    }
    function k(a, c) {
        return "constructor" == a ? e: c
    }
    var d = "__MIX_CIRCULAR",
    f = this,
    n = !0,
    b = Object,
    c = b.create,
    p = !{
        toString: 1
    }.propertyIsEnumerable("toString"),
    h = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toString,toLocaleString,valueOf".split(","); (function(a, c) {
        for (var b in c) a[b] = c[b]
    })(a, {
        stamp: function(c, b, o) {
            var o = o || "__~ks_stamped",
            m = c[o];
            if (!m && !b) try {
                m = c[o] = a.guid(o)
            } catch(i) {
                m = e
            }
            return m
        },
        keys: b.keys ||
        function(a) {
            var c = [],
            b,
            m;
            for (b in a) a.hasOwnProperty(b) && c.push(b);
            if (p) for (m = h.length - 1; 0 <= m; m--) b = h[m],
            a.hasOwnProperty(b) && c.push(b);
            return c
        },
        mix: function(c, b, o, m, i) {
            "object" === typeof o && (m = o.whitelist, i = o.deep, o = o.overwrite);
            if (m && "function" !== typeof m) var h = m,
            m = function(c, b) {
                return a.inArray(c, h) ? b: e
            };
            o === e && (o = n);
            var p = [],
            t = 0;
            for (l(c, b, o, m, i, p); b = p[t++];) delete b[d];
            return c
        },
        merge: function(c) {
            var c = a.makeArray(arguments),
            b = {},
            o,
            m = c.length;
            for (o = 0; o < m; o++) a.mix(b, c[o]);
            return b
        },
        augment: function(c, b) {
            var o = a.makeArray(arguments),
            m = o.length - 2,
            i = 1,
            h,
            d,
            p = o[m],
            f = o[m + 1];
            a.isArray(f) || (p = f, f = e, m++);
            "boolean" !== typeof p && (p = e, m++);
            for (; i < m; i++) {
                d = o[i];
                if (h = d.prototype) d = a.mix({},
                h, !0, k);
                a.mix(c.prototype, d, p, f)
            }
            return c
        },
        extend: function(b, j, o, m) {
            if (!j || !b) return b;
            var i = j.prototype;
            i.constructor = j;
            c ? j = c(i) : (g.prototype = i, j = new g);
            j.constructor = b;
            b.prototype = a.mix(j, b.prototype);
            b.superclass = i;
            o && a.mix(j, o);
            m && a.mix(b, m);
            return b
        },
        namespace: function() {
            var c = a.makeArray(arguments),
            b = c.length,
            o = null,
            m,
            i,
            h,
            d = c[b - 1] === n && b--;
            for (m = 0; m < b; m++) {
                h = ("" + c[m]).split(".");
                o = d ? f: this;
                for (i = f[h[0]] === o ? 1 : 0; i < h.length; ++i) o = o[h[i]] = o[h[i]] || {}
            }
            return o
        }
    })
})(KISSY); (function(a, e) {
    var g = Array.prototype,
    l = g.indexOf,
    k = g.lastIndexOf,
    d = g.filter,
    f = g.every,
    n = g.some,
    b = g.map;
    a.mix(a, {
        each: function(c, b, h) {
            if (c) {
                var d, j, o = 0;
                d = c && c.length;
                j = d === e || "function" == a.type(c);
                h = h || null;
                if (j) for (j = a.keys(c); o < j.length && !(d = j[o], !1 === b.call(h, c[d], d, c)); o++);
                else for (j = c[0]; o < d && !1 !== b.call(h, j, o, c); j = c[++o]);
            }
            return c
        },
        indexOf: l ?
        function(a, b) {
            return l.call(b, a)
        }: function(a, b) {
            for (var h = 0,
            d = b.length; h < d; ++h) if (b[h] === a) return h;
            return - 1
        },
        lastIndexOf: k ?
        function(a, b) {
            return k.call(b, a)
        }: function(a, b) {
            for (var d = b.length - 1; 0 <= d && b[d] !== a; d--);
            return d
        },
        unique: function(b, d) {
            var h = b.slice();
            d && h.reverse();
            for (var q = 0,
            j, o; q < h.length;) {
                for (o = h[q]; (j = a.lastIndexOf(o, h)) !== q;) h.splice(j, 1);
                q += 1
            }
            d && h.reverse();
            return h
        },
        inArray: function(b, d) {
            return - 1 < a.indexOf(b, d)
        },
        filter: d ?
        function(a, b, h) {
            return d.call(a, b, h || this)
        }: function(b, d, h) {
            var q = [];
            a.each(b,
            function(a, b, c) {
                d.call(h || this, a, b, c) && q.push(a)
            });
            return q
        },
        map: b ?
        function(a, d, h) {
            return b.call(a, d, h || this)
        }: function(a, b, d) {
            for (var q = a.length,
            j = Array(q), o = 0; o < q; o++) {
                var m = "string" == typeof a ? a.charAt(o) : a[o];
                if (m || o in a) j[o] = b.call(d || this, m, o, a)
            }
            return j
        },
        reduce: function(a, b, d) {
            var q = a.length;
            if ("function" !== typeof b) throw new TypeError("callback is not function!");
            if (0 === q && 2 == arguments.length) throw new TypeError("arguments invalid");
            var j = 0,
            o;
            if (3 <= arguments.length) o = arguments[2];
            else {
                do {
                    if (j in a) {
                        o = a[j++];
                        break
                    }
                    j += 1;
                    if (j >= q) throw new TypeError;
                } while ( 1 )
            }
            for (; j < q;) j in a && (o = b.call(e, o, a[j], j, a)),
            j++;
            return o
        },
        every: f ?
        function(a, b, d) {
            return f.call(a, b, d || this)
        }: function(a, b, d) {
            for (var q = a && a.length || 0,
            j = 0; j < q; j++) if (j in a && !b.call(d, a[j], j, a)) return ! 1;
            return ! 0
        },
        some: n ?
        function(a, b, d) {
            return n.call(a, b, d || this)
        }: function(a, b, d) {
            for (var q = a && a.length || 0,
            j = 0; j < q; j++) if (j in a && b.call(d, a[j], j, a)) return ! 0;
            return ! 1
        },
        makeArray: function(b) {
            if (null == b) return [];
            if (a.isArray(b)) return b;
            var d = typeof b.length,
            h = typeof b;
            if ("number" != d || b.alert || "string" == h || "function" == h && !("item" in b && "number" == d)) return [b];
            for (var d = [], h = 0, q = b.length; h < q; h++) d[h] = b[h];
            return d
        }
    })
})(KISSY); (function(a, e) {
    function g(a) {
        var b = typeof a;
        return null == a || "object" !== b && "function" !== b
    }
    function l() {
        if (b) return b;
        var c = d;
        a.each(f,
        function(a) {
            c += a + "|"
        });
        c = c.slice(0, -1);
        return b = RegExp(c, "g")
    }
    function k() {
        if (c) return c;
        var b = d;
        a.each(n,
        function(a) {
            b += a + "|"
        });
        b += "&#(\\d{1,5});";
        return c = RegExp(b, "g")
    }
    var d = "",
    f = {
        "&amp;": "&",
        "&gt;": ">",
        "&lt;": "<",
        "&#x60;": "`",
        "&#x2F;": "/",
        "&quot;": '"',
        "&#x27;": "'"
    },
    n = {},
    b,
    c,
    p = /[\-#$\^*()+\[\]{}|\\,.?\s]/g; (function() {
        for (var a in f) n[f[a]] = a
    })();
    a.mix(a, {
        urlEncode: function(a) {
            return encodeURIComponent("" + a)
        },
        urlDecode: function(a) {
            return decodeURIComponent(a.replace(/\+/g, " "))
        },
        fromUnicode: function(a) {
            return a.replace(/\\u([a-f\d]{4})/ig,
            function(a, b) {
                return String.fromCharCode(parseInt(b, 16))
            })
        },
        escapeHtml: function(a) {
            return (a + "").replace(l(),
            function(a) {
                return n[a]
            })
        },
        escapeRegExp: function(a) {
            return a.replace(p, "\\$&")
        },
        unEscapeHtml: function(a) {
            return a.replace(k(),
            function(a, b) {
                return f[a] || String.fromCharCode( + b)
            })
        },
        param: function(b, c, j, o) {
            c = c || "&";
            j = j || "=";
            o === e && (o = !0);
            var m = [],
            i,
            r,
            f,
            p,
            k,
            n = a.urlEncode;
            for (i in b) if (k = b[i], i = n(i), g(k)) m.push(i),
            k !== e && m.push(j, n(k + d)),
            m.push(c);
            else if (a.isArray(k) && k.length) {
                r = 0;
                for (p = k.length; r < p; ++r) f = k[r],
                g(f) && (m.push(i, o ? n("[]") : d), f !== e && m.push(j, n(f + d)), m.push(c))
            }
            m.pop();
            return m.join(d)
        },
        unparam: function(b, c, j) {
            if ("string" != typeof b || !(b = a.trim(b))) return {};
            for (var j = j || "=",
            d = {},
            m, i = a.urlDecode,
            b = b.split(c || "&"), r = 0, f = b.length; r < f; ++r) {
                m = b[r].indexOf(j);
                if ( - 1 == m) c = i(b[r]),
                m = e;
                else {
                    c = i(b[r].substring(0, m));
                    m = b[r].substring(m + 1);
                    try {
                        m = i(m)
                    } catch(p) {
                        "decodeURIComponent error : " + m,
                        p
                    }
                    a.endsWith(c, "[]") && (c = c.substring(0, c.length - 2))
                }
                c in d ? a.isArray(d[c]) ? d[c].push(m) : d[c] = [d[c], m] : d[c] = m
            }
            return d
        }
    });
    a.escapeHTML = a.escapeHtml;
    a.unEscapeHTML = a.unEscapeHtml
})(KISSY); (function(a) {
    function e(a, e, k) {
        var d = [].slice,
        f = d.call(arguments, 3),
        n = function() {},
        b = function() {
            var b = d.call(arguments);
            return e.apply(this instanceof n ? this: k, a ? b.concat(f) : f.concat(b))
        };
        n.prototype = e.prototype;
        b.prototype = new n;
        return b
    }
    a.mix(a, {
        noop: function() {},
        bind: e(0, e, null, 0),
        rbind: e(0, e, null, 1),
        later: function(e, l, k, d, f) {
            var l = l || 0,
            n = e,
            b = a.makeArray(f),
            c;
            "string" == typeof e && (n = d[e]);
            n || "method undefined";
            e = function() {
                n.apply(d, b)
            };
            c = k ? setInterval(e, l) : setTimeout(e, l);
            return {
                id: c,
                interval: k,
                cancel: function() {
                    this.interval ? clearInterval(c) : clearTimeout(c)
                }
            }
        },
        throttle: function(e, l, k) {
            l = l || 150;
            if ( - 1 === l) return function() {
                e.apply(k || this, arguments)
            };
            var d = a.now();
            return function() {
                var f = a.now();
                f - d > l && (d = f, e.apply(k || this, arguments))
            }
        },
        buffer: function(e, l, k) {
            function d() {
                d.stop();
                f = a.later(e, l, 0, k || this, arguments)
            }
            l = l || 150;
            if ( - 1 === l) return function() {
                e.apply(k || this, arguments)
            };
            var f = null;
            d.stop = function() {
                f && (f.cancel(), f = 0)
            };
            return d
        }
    })
})(KISSY); (function(a, e) {
    function g(b, c, e) {
        var h = b,
        q, j, o, m;
        if (!b) return h;
        if (b[f]) return e[b[f]].destination;
        if ("object" === typeof b) {
            m = b.constructor;
            if (a.inArray(m, [Boolean, String, Number, Date, RegExp])) h = new m(b.valueOf());
            else if (q = a.isArray(b)) h = c ? a.filter(b, c) : b.concat();
            else if (j = a.isPlainObject(b)) h = {};
            b[f] = m = a.guid("c");
            e[m] = {
                destination: h,
                input: b
            }
        }
        if (q) for (b = 0; b < h.length; b++) h[b] = g(h[b], c, e);
        else if (j) for (o in b) if (o !== f && (!c || c.call(b, b[o], o, b) !== d)) h[o] = g(b[o], c, e);
        return h
    }
    function l(b, c, d, h) {
        if (b[n] === c && c[n] === b) return k;
        b[n] = c;
        c[n] = b;
        var f = function(a, b) {
            return null !== a && a !== e && a[b] !== e
        },
        j;
        for (j in c) ! f(b, j) && f(c, j) && d.push("expected has key '" + j + "', but missing from actual.");
        for (j in b) ! f(c, j) && f(b, j) && d.push("expected missing key '" + j + "', but present in actual.");
        for (j in c) j != n && (a.equals(b[j], c[j], d, h) || h.push("'" + j + "' was '" + (c[j] ? c[j].toString() : c[j]) + "' in expected, but was '" + (b[j] ? b[j].toString() : b[j]) + "' in actual."));
        a.isArray(b) && a.isArray(c) && b.length != c.length && h.push("arrays were not the same length");
        delete b[n];
        delete c[n];
        return 0 === d.length && 0 === h.length
    }
    var k = !0,
    d = !1,
    f = "__~ks_cloned",
    n = "__~ks_compared";
    a.mix(a, {
        equals: function(a, c, d, h) {
            d = d || [];
            h = h || [];
            return a === c ? k: a === e || null === a || c === e || null === c ? null == a && null == c: a instanceof Date && c instanceof Date ? a.getTime() == c.getTime() : "string" == typeof a && "string" == typeof c || "number" === typeof a && "number" === typeof c ? a == c: "object" === typeof a && "object" === typeof c ? l(a, c, d, h) : a === c
        },
        clone: function(b, c) {
            var d = {},
            h = g(b, c, d);
            a.each(d,
            function(a) {
                a = a.input;
                if (a[f]) try {
                    delete a[f]
                } catch(b) {
                    a[f] = e
                }
            });
            d = null;
            return h
        },
        now: Date.now ||
        function() {
            return + new Date
        }
    })
})(KISSY); (function(a, e) {
    var g = /^[\s\xa0]+|[\s\xa0]+$/g,
    l = String.prototype.trim,
    k = /\\?\{([^{}]+)\}/g;
    a.mix(a, {
        trim: l ?
        function(a) {
            return null == a ? "": l.call(a)
        }: function(a) {
            return null == a ? "": (a + "").replace(g, "")
        },
        substitute: function(a, f, n) {
            return "string" != typeof a || !f ? a: a.replace(n || k,
            function(a, c) {
                return "\\" === a.charAt(0) ? a.slice(1) : f[c] === e ? "": f[c]
            })
        },
        ucfirst: function(a) {
            a += "";
            return a.charAt(0).toUpperCase() + a.substring(1)
        },
        startsWith: function(a, e) {
            return 0 === a.lastIndexOf(e, 0)
        },
        endsWith: function(a, e) {
            var k = a.length - e.length;
            return 0 <= k && a.indexOf(e, k) == k
        }
    })
})(KISSY); (function(a, e) {
    var g = {},
    l = Object.prototype,
    k = l.toString;
    a.mix(a, {
        type: function(a) {
            return null == a ? "" + a: g[k.call(a)] || "object"
        },
        isNull: function(a) {
            return null === a
        },
        isUndefined: function(a) {
            return a === e
        },
        isEmptyObject: function(a) {
            for (var f in a) if (f !== e) return ! 1;
            return ! 0
        },
        isPlainObject: function(d) {
            if (!d || "object" !== a.type(d) || d.nodeType || d.window == d) return ! 1;
            var f, k;
            try {
                if ((k = d.constructor) && !l.hasOwnProperty.call(d, "constructor") && !l.hasOwnProperty.call(k.prototype, "isPrototypeOf")) return ! 1
            } catch(b) {
                return ! 1
            }
            for (f in d);
            return f === e || l.hasOwnProperty.call(d, f)
        }
    });
    a.each("Boolean,Number,String,Function,Date,RegExp,Object,Array".split(","),
    function(d, e) {
        g["[object " + d + "]"] = e = d.toLowerCase();
        a["is" + d] = function(d) {
            return a.type(d) == e
        }
    });
    a.isArray = Array.isArray || a.isArray
})(KISSY); (function(a) {
    function e() {
        for (var a = 0,
        b; b = g[a++];) try {
            b()
        } catch(c) {
            setTimeout(function() {
                throw c;
            },
            0)
        }
        1 < a && (g = []);
        l = 0
    }
    var g = [],
    l = 0;
    a.setImmediate = function(a) {
        g.push(a);
        l || (l = 1, k())
    };
    var k;
    if ("function" === typeof setImmediate) k = function() {
        setImmediate(e)
    };
    else if ("undefined" !== typeof process && "function" == typeof process.nextTick) k = function() {
        process.nextTick(e)
    };
    else if ("undefined" !== typeof MessageChannel) {
        var d = new MessageChannel;
        d.port1.onmessage = function() {
            k = f;
            d.port1.onmessage = e;
            e()
        };
        var f = function() {
            d.port2.postMessage(0)
        };
        k = function() {
            setTimeout(e, 0);
            f()
        }
    } else k = function() {
        setTimeout(e, 0)
    }
})(KISSY); (function(a) {
    function e(a, d) {
        for (var e = 0,
        g = a.length - 1,
        b = [], c; 0 <= g; g--) c = a[g],
        "." != c && (".." === c ? e++:e ? e--:b[b.length] = c);
        if (d) for (; e--; e) b[b.length] = "..";
        return b = b.reverse()
    }
    var g = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/,
    l = a.Path = {
        resolve: function() {
            var k = "",
            d, f = arguments,
            g, b = 0;
            for (d = f.length - 1; 0 <= d && !b; d--) g = f[d],
            "string" == typeof g && g && (k = g + "/" + k, b = "/" == g.charAt(0));
            k = e(a.filter(k.split("/"),
            function(a) {
                return !! a
            }), !b).join("/");
            return (b ? "/": "") + k || "."
        },
        normalize: function(k) {
            var d = "/" == k.charAt(0),
            f = "/" == k.slice( - 1),
            k = e(a.filter(k.split("/"),
            function(a) {
                return !! a
            }), !d).join("/"); ! k && !d && (k = ".");
            k && f && (k += "/");
            return (d ? "/": "") + k
        },
        join: function() {
            var e = a.makeArray(arguments);
            return l.normalize(a.filter(e,
            function(a) {
                return a && "string" == typeof a
            }).join("/"))
        },
        relative: function(e, d) {
            var e = l.normalize(e),
            d = l.normalize(d),
            f = a.filter(e.split("/"),
            function(a) {
                return !! a
            }),
            g = [],
            b,
            c,
            p = a.filter(d.split("/"),
            function(a) {
                return !! a
            });
            c = Math.min(f.length, p.length);
            for (b = 0; b < c && f[b] == p[b]; b++);
            for (c = b; b < f.length;) g.push(".."),
            b++;
            g = g.concat(p.slice(c));
            return g = g.join("/")
        },
        basename: function(a, d) {
            var e;
            e = (a.match(g) || [])[3] || "";
            d && e && e.slice( - 1 * d.length) == d && (e = e.slice(0, -1 * d.length));
            return e
        },
        dirname: function(a) {
            var d = a.match(g) || [],
            a = d[1] || "",
            d = d[2] || "";
            if (!a && !d) return ".";
            d && (d = d.substring(0, d.length - 1));
            return a + d
        },
        extname: function(a) {
            return (a.match(g) || [])[4] || ""
        }
    }
})(KISSY); (function(a, e) {
    function g(b) {
        b._queryMap || (b._queryMap = a.unparam(b._query))
    }
    function l(a) {
        this._query = a || ""
    }
    function k(a, b) {
        return encodeURI(a).replace(b,
        function(a) {
            a = a.charCodeAt(0).toString(16);
            return "%" + (1 == a.length ? "0" + a: a)
        })
    }
    function d(b) {
        if (b instanceof d) return b.clone();
        var c = this;
        a.mix(c, {
            scheme: "",
            userInfo: "",
            hostname: "",
            port: "",
            path: "",
            query: "",
            fragment: ""
        });
        b = d.getComponents(b);
        a.each(b,
        function(b, d) {
            b = b || "";
            if ("query" == d) c.query = new l(b);
            else {
                try {
                    b = a.urlDecode(b)
                } catch(j) {
                    j + "urlDecode error : " + b
                }
                c[d] = b
            }
        });
        return c
    }
    var f = /[#\/\?@]/g,
    n = /[#\?]/g,
    b = /[#@]/g,
    c = /#/g,
    p = RegExp("^(?:([\\w\\d+.-]+):)?(?://(?:([^/?#@]*)@)?([\\w\\d\\-\\u0100-\\uffff.+%]*|\\[[^\\]]+\\])(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
    h = a.Path,
    q = {
        scheme: 1,
        userInfo: 2,
        hostname: 3,
        port: 4,
        path: 5,
        query: 6,
        fragment: 7
    };
    l.prototype = {
        constructor: l,
        clone: function() {
            return new l(this.toString())
        },
        reset: function(a) {
            this._query = a || "";
            this._queryMap = null;
            return this
        },
        count: function() {
            var b = 0,
            c, d;
            g(this);
            c = this._queryMap;
            for (d in c) a.isArray(c[d]) ? b += c[d].length: b++;
            return b
        },
        has: function(b) {
            var c;
            g(this);
            c = this._queryMap;
            return b ? b in c: !a.isEmptyObject(c)
        },
        get: function(a) {
            var b;
            g(this);
            b = this._queryMap;
            return a ? b[a] : b
        },
        keys: function() {
            g(this);
            return a.keys(this._queryMap)
        },
        set: function(b, c) {
            var d;
            g(this);
            d = this._queryMap;
            "string" == typeof b ? this._queryMap[b] = c: (b instanceof l && (b = b.get()), a.each(b,
            function(a, b) {
                d[b] = a
            }));
            return this
        },
        remove: function(a) {
            g(this);
            a ? delete this._queryMap[a] : this._queryMap = {};
            return this
        },
        add: function(a, b) {
            var c, d;
            if ("string" == typeof a) g(this),
            c = this._queryMap,
            d = c[a],
            d = d === e ? b: [].concat(d).concat(b),
            c[a] = d;
            else for (c in a instanceof l && (a = a.get()), a) this.add(c, a[c]);
            return this
        },
        toString: function(b) {
            g(this);
            return a.param(this._queryMap, e, e, b)
        }
    };
    d.prototype = {
        constructor: d,
        clone: function() {
            var b = new d,
            c = this;
            a.each(q,
            function(a, d) {
                b[d] = c[d]
            });
            b.query = b.query.clone();
            return b
        },
        resolve: function(b) {
            "string" == typeof b && (b = new d(b));
            var c = 0,
            m, i = this.clone();
            a.each("scheme,userInfo,hostname,port,path,query,fragment".split(","),
            function(d) {
                if (d == "path") if (c) i[d] = b[d];
                else {
                    if (d = b.path) {
                        c = 1;
                        if (!a.startsWith(d, "/")) if (i.hostname && !i.path) d = "/" + d;
                        else if (i.path) {
                            m = i.path.lastIndexOf("/");
                            m != -1 && (d = i.path.slice(0, m + 1) + d)
                        }
                        i.path = h.normalize(d)
                    }
                } else if (d == "query") {
                    if (c || b.query.toString()) {
                        i.query = b.query.clone();
                        c = 1
                    }
                } else if (c || b[d]) {
                    i[d] = b[d];
                    c = 1
                }
            });
            return i
        },
        getScheme: function() {
            return this.scheme
        },
        setScheme: function(a) {
            this.scheme = a;
            return this
        },
        getHostname: function() {
            return this.hostname
        },
        setHostname: function(a) {
            this.hostname = a;
            return this
        },
        setUserInfo: function(a) {
            this.userInfo = a;
            return this
        },
        getUserInfo: function() {
            return this.userInfo
        },
        setPort: function(a) {
            this.port = a;
            return this
        },
        getPort: function() {
            return this.port
        },
        setPath: function(a) {
            this.path = a;
            return this
        },
        getPath: function() {
            return this.path
        },
        setQuery: function(c) {
            "string" == typeof c && (a.startsWith(c, "?") && (c = c.slice(1)), c = new l(k(c, b)));
            this.query = c;
            return this
        },
        getQuery: function() {
            return this.query
        },
        getFragment: function() {
            return this.fragment
        },
        setFragment: function(b) {
            a.startsWith(b, "#") && (b = b.slice(1));
            this.fragment = b;
            return this
        },
        isSameOriginAs: function(a) {
            return this.hostname.toLowerCase() == a.hostname.toLowerCase() && this.scheme.toLowerCase() == a.scheme.toLowerCase() && this.port.toLowerCase() == a.port.toLowerCase()
        },
        toString: function(b) {
            var d = [],
            m,
            i;
            if (m = this.scheme) d.push(k(m, f)),
            d.push(":");
            if (m = this.hostname) {
                d.push("//");
                if (i = this.userInfo) d.push(k(i, f)),
                d.push("@");
                d.push(encodeURIComponent(m));
                if (i = this.port) d.push(":"),
                d.push(i)
            }
            if (i = this.path) m && !a.startsWith(i, "/") && (i = "/" + i),
            i = h.normalize(i),
            d.push(k(i, n));
            if (b = this.query.toString.call(this.query, b)) d.push("?"),
            d.push(b);
            if (b = this.fragment) d.push("#"),
            d.push(k(b, c));
            return d.join("")
        }
    };
    d.Query = l;
    d.getComponents = function(b) {
        var c = (b || "").match(p) || [],
        d = {};
        a.each(q,
        function(a, b) {
            d[b] = c[a]
        });
        return d
    };
    a.Uri = d
})(KISSY); (function(a, e) {
    function g(a) {
        var b = 0;
        return parseFloat(a.replace(/\./g,
        function() {
            return 0 === b++?".": ""
        }))
    }
    function l(a, b) {
        var c;
        b.trident = 0.1;
        if ((c = a.match(/Trident\/([\d.]*)/)) && c[1]) b.trident = g(c[1]);
        b.core = "trident"
    }
    function k(a) {
        var b, c;
        return (b = a.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) && (c = b[1] || b[2]) ? g(c) : 0
    }
    function d(a) {
        var b, c = "",
        d = "",
        i, h = [6, 9],
        f,
        p = n && n.createElement("div"),
        D = [],
        s = {
            webkit: e,
            trident: e,
            gecko: e,
            presto: e,
            chrome: e,
            safari: e,
            firefox: e,
            ie: e,
            opera: e,
            mobile: e,
            core: e,
            shell: e,
            phantomjs: e,
            os: e,
            ipad: e,
            iphone: e,
            ipod: e,
            ios: e,
            android: e,
            nodejs: e
        };
        p && p.getElementsByTagName && (p.innerHTML = "<\!--[if IE {{version}}]><s></s><![endif]--\>".replace("{{version}}", ""), D = p.getElementsByTagName("s"));
        if (0 < D.length) {
            l(a, s);
            i = h[0];
            for (h = h[1]; i <= h; i++) if (p.innerHTML = "<\!--[if IE {{version}}]><s></s><![endif]--\>".replace("{{version}}", i), 0 < D.length) {
                s[d = "ie"] = i;
                break
            }
            if (!s.ie && (f = k(a))) s[d = "ie"] = f
        } else if ((i = a.match(/AppleWebKit\/([\d.]*)/)) && i[1]) {
            s[c = "webkit"] = g(i[1]);
            if ((i = a.match(/OPR\/(\d+\.\d+)/)) && i[1]) s[d = "opera"] = g(i[1]);
            else if ((i = a.match(/Chrome\/([\d.]*)/)) && i[1]) s[d = "chrome"] = g(i[1]);
            else if ((i = a.match(/\/([\d.]*) Safari/)) && i[1]) s[d = "safari"] = g(i[1]);
            if (/ Mobile\//.test(a) && a.match(/iPad|iPod|iPhone/)) {
                s.mobile = "apple";
                if ((i = a.match(/OS ([^\s]*)/)) && i[1]) s.ios = g(i[1].replace("_", "."));
                b = "ios";
                if ((i = a.match(/iPad|iPod|iPhone/)) && i[0]) s[i[0].toLowerCase()] = s.ios
            } else if (/ Android/i.test(a)) {
                if (/Mobile/.test(a) && (b = s.mobile = "android"), (i = a.match(/Android ([^\s]*);/)) && i[1]) s.android = g(i[1])
            } else if (i = a.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/)) s.mobile = i[0].toLowerCase();
            if ((i = a.match(/PhantomJS\/([^\s]*)/)) && i[1]) s.phantomjs = g(i[1])
        } else if ((i = a.match(/Presto\/([\d.]*)/)) && i[1]) {
            if (s[c = "presto"] = g(i[1]), (i = a.match(/Opera\/([\d.]*)/)) && i[1]) {
                s[d = "opera"] = g(i[1]);
                if ((i = a.match(/Opera\/.* Version\/([\d.]*)/)) && i[1]) s[d] = g(i[1]);
                if ((i = a.match(/Opera Mini[^;]*/)) && i) s.mobile = i[0].toLowerCase();
                else if ((i = a.match(/Opera Mobi[^;]*/)) && i) s.mobile = i[0]
            }
        } else if (f = k(a)) s[d = "ie"] = f,
        l(a, s);
        else if (i = a.match(/Gecko/)) {
            s[c = "gecko"] = 0.1;
            if ((i = a.match(/rv:([\d.]*)/)) && i[1]) s[c] = g(i[1]),
            /Mobile|Tablet/.test(a) && (s.mobile = "firefox");
            if ((i = a.match(/Firefox\/([\d.]*)/)) && i[1]) s[d = "firefox"] = g(i[1])
        }
        b || (/windows|win32/i.test(a) ? b = "windows": /macintosh|mac_powerpc/i.test(a) ? b = "macintosh": /linux/i.test(a) ? b = "linux": /rhino/i.test(a) && (b = "rhino"));
        s.os = b;
        s.core = s.core || c;
        s.shell = d;
        return s
    }
    var f = a.Env.host,
    n = f.document,
    f = f.navigator,
    b = KISSY.UA = d(f && f.userAgent || "");
    if ("object" === typeof process) {
        var c, p;
        if ((c = process.versions) && (p = c.node)) b.os = process.platform,
        b.nodejs = g(p)
    }
    b.getDescriptorFromUserAgent = d;
    c = "webkit,trident,gecko,presto,chrome,safari,firefox,ie,opera".split(",");
    p = n && n.documentElement;
    var h = "";
    p && (a.each(c,
    function(a) {
        var c = b[a];
        c && (h += " ks-" + a + (parseInt(c) + ""), h += " ks-" + a)
    }), a.trim(h) && (p.className = a.trim(p.className + h)))
})(KISSY); (function(a, e) {
    var g = a.Env.host,
    l = a.UA,
    k = ["", "Webkit", "Moz", "O", "ms"],
    d = g.document || {},
    f,
    n,
    b,
    c,
    p,
    h = d.documentElement,
    q,
    j = !0,
    o = !1,
    m = "ontouchstart" in d && !l.phantomjs,
    i = d.documentMode || l.ie;
    h && (h.querySelector && 8 != i && (o = !0), q = h.style, a.each(k,
    function(a) {
        var d = a ? a + "Transition": "transition",
        i = a ? a + "Transform": "transform";
        c === e && d in q && (c = a, n = d);
        p === e && i in q && (p = a, b = i)
    }), j = "classList" in h, f = "msPointerEnabled" in (g.navigator || {}));
    a.Features = {
        isMsPointerSupported: function() {
            return f
        },
        isTouchEventSupported: function() {
            return m
        },
        isDeviceMotionSupported: function() {
            return !! g.DeviceMotionEvent
        },
        isHashChangeSupported: function() {
            return "onhashchange" in g && (!i || i > 7)
        },
        isTransitionSupported: function() {
            return c !== e
        },
        isTransformSupported: function() {
            return p !== e
        },
        isClassListSupported: function() {
            return j
        },
        isQuerySelectorSupported: function() {
            return ! a.config("dom/selector") && o
        },
        isIELessThan: function(a) {
            return !! (i && i < a)
        },
        getTransitionPrefix: function() {
            return c
        },
        getTransformPrefix: function() {
            return p
        },
        getTransitionProperty: function() {
            return n
        },
        getTransformProperty: function() {
            return b
        }
    }
})(KISSY); (function(a) { (a.Loader = {}).Status = {
        INIT: 0,
        LOADING: 1,
        LOADED: 2,
        ERROR: 3,
        ATTACHED: 4
    }
})(KISSY); (function(a) {
    function e(a) {
        if ("string" == typeof a) return g(a);
        for (var b = [], c = 0, d = a.length; c < d; c++) b[c] = g(a[c]);
        return b
    }
    function g(a) {
        "/" == a.charAt(a.length - 1) && (a += "index");
        return a
    }
    function l(b, c) {
        var d = c.indexOf("!");
        if ( - 1 != d) {
            var e = c.substring(0, d),
            c = c.substring(d + 1);
            a.use(e, {
                sync: !0,
                success: function(a, d) {
                    d.alias && (c = d.alias(b, c, e))
                }
            })
        }
        return c
    }
    var k = a.Loader,
    d = a.Path,
    f = a.Env.host,
    n = a.startsWith,
    b = k.Status,
    c = b.ATTACHED,
    p = b.LOADED,
    h = b.ERROR,
    q = k.Utils = {},
    j = f.document;
    a.mix(q, {
        docHead: function() {
            return j.getElementsByTagName("head")[0] || j.documentElement
        },
        normalDepModuleName: function(a, b) {
            var c = 0,
            e;
            if (!b) return b;
            if ("string" == typeof b) return n(b, "../") || n(b, "./") ? d.resolve(d.dirname(a), b) : d.normalize(b);
            for (e = b.length; c < e; c++) b[c] = q.normalDepModuleName(a, b[c]);
            return b
        },
        createModulesInfo: function(b, c) {
            a.each(c,
            function(a) {
                q.createModuleInfo(b, a)
            })
        },
        createModuleInfo: function(b, c, d) {
            var c = g(c),
            e = b.Env.mods,
            h = e[c];
            return h ? h: e[c] = h = new k.Module(a.mix({
                name: c,
                runtime: b
            },
            d))
        },
        isAttached: function(b, d) {
            var e;
            a: {
                var h = b.Env.mods,
                f, g;
                e = a.makeArray(d);
                for (g = 0; g < e.length; g++) if (f = h[e[g]], !f || f.status !== c) {
                    e = 0;
                    break a
                }
                e = 1
            }
            return e
        },
        getModules: function(b, d) {
            var e = [b],
            h,
            f,
            g,
            p,
            j = b.Env.mods;
            a.each(d,
            function(d) {
                h = j[d];
                if (!h || "css" != h.getType()) f = q.unalias(b, d),
                (g = a.reduce(f,
                function(a, b) {
                    p = j[b];
                    return a && p && p.status == c
                },
                !0)) ? e.push(j[f[0]].value) : e.push(null)
            });
            return e
        },
        attachModsRecursively: function(a, b, c, d, e) {
            var c = c || [],
            e = e || {},
            h,
            f = 1,
            g = a.length,
            p = c.length;
            for (h = 0; h < g; h++) f = f && q.attachModRecursively(a[h], b, c, d, e),
            c.length = p;
            return f
        },
        attachModRecursively: function(a, b, d, e, f) {
            var g, j = b.Env.mods[a];
            if (a in f) return f[a];
            if (!j) return f[a] = 0;
            g = j.status;
            if (g == c) return f[a] = 1;
            g == h && e.push(j);
            return g != p ? f[a] = 0 : q.attachModsRecursively(j.getNormalizedRequires(), b, d, e, f) ? (q.attachMod(b, j), f[a] = 1) : f[a] = 0
        },
        attachMod: function(a, b) {
            if (b.status == p) {
                var d = b.fn;
                b.value = "function" === typeof d ? d.apply(b, q.getModules(a, b.getRequiresWithAlias())) : d;
                b.status = c
            }
        },
        getModNamesAsArray: function(a) {
            "string" == typeof a && (a = a.replace(/\s+/g, "").split(","));
            return a
        },
        normalizeModNames: function(a, b, c) {
            return q.unalias(a, q.normalizeModNamesWithAlias(a, b, c))
        },
        unalias: function(a, b) {
            for (var c = [].concat(b), d, h, f, g = 0, j, p = a.Env.mods; ! g;) {
                g = 1;
                for (d = c.length - 1; 0 <= d; d--) if ((h = p[c[d]]) && (f = h.alias)) {
                    g = 0;
                    for (j = f.length - 1; 0 <= j; j--) f[j] || f.splice(j, 1);
                    c.splice.apply(c, [d, 1].concat(e(f)))
                }
            }
            return c
        },
        normalizeModNamesWithAlias: function(a, b, c) {
            var d = [],
            h,
            f;
            if (b) {
                h = 0;
                for (f = b.length; h < f; h++) b[h] && d.push(l(a, e(b[h])))
            }
            c && (d = q.normalDepModuleName(c, d));
            return d
        },
        registerModule: function(b, c, d, e) {
            var c = g(c),
            h = b.Env.mods,
            f = h[c];
            f && f.fn ? (c + " is defined more than once", "warn") : (q.createModuleInfo(b, c), f = h[c], a.mix(f, {
                name: c,
                status: p,
                fn: d
            }), a.mix(f, e))
        },
        getMappedPath: function(a, b, c) {
            for (var a = c || a.Config.mappedRules || [], d, c = 0; c < a.length; c++) if (d = a[c], b.match(d[0])) return b.replace(d[0], d[1]);
            return b
        },
        getHash: function(a) {
            var b = 5381,
            c;
            for (c = a.length; - 1 < --c;) b = (b << 5) + b + a.charCodeAt(c);
            return b + ""
        }
    })
})(KISSY); (function(a) {
    function e(a, c) {
        return c in a ? a[c] : a.runtime.Config[c]
    }
    function g(b) {
        a.mix(this, b)
    }
    function l(b) {
        this.status = k.Status.INIT;
        a.mix(this, b);
        this.waitedCallbacks = []
    }
    var k = a.Loader,
    d = a.Path,
    f = k.Utils;
    a.augment(g, {
        reset: function(b) {
            a.mix(this, b)
        },
        getTag: function() {
            return e(this, "tag")
        },
        getName: function() {
            return this.name
        },
        getBase: function() {
            return e(this, "base")
        },
        getPrefixUriForCombo: function() {
            var a = this.getName();
            return this.getBase() + (a && !this.isIgnorePackageNameInUri() ? a + "/": "")
        },
        getPackageUri: function() {
            return this.packageUri ? this.packageUri: this.packageUri = new a.Uri(this.getPrefixUriForCombo())
        },
        getBaseUri: function() {
            return e(this, "baseUri")
        },
        isDebug: function() {
            return e(this, "debug")
        },
        isIgnorePackageNameInUri: function() {
            return e(this, "ignorePackageNameInUri")
        },
        getCharset: function() {
            return e(this, "charset")
        },
        isCombine: function() {
            return e(this, "combine")
        },
        getGroup: function() {
            return e(this, "group")
        }
    });
    k.Package = g;
    a.augment(l, {
        wait: function(a) {
            this.waitedCallbacks.push(a)
        },
        notifyAll: function() {
            for (var a, c = this.waitedCallbacks.length,
            d = 0; d < c; d++) {
                a = this.waitedCallbacks[d];
                try {
                    a(this)
                } catch(e) {
                    e.stack || e,
                    "error",
                    setTimeout(function() {
                        throw e;
                    },
                    0)
                }
            }
            this.waitedCallbacks = []
        },
        setValue: function(a) {
            this.value = a
        },
        getType: function() {
            var a = this.type;
            a || (this.type = a = ".css" == d.extname(this.name).toLowerCase() ? "css": "js");
            return a
        },
        getFullPathUri: function() {
            var b, c, e, h;
            if (!this.fullPathUri) {
                if (this.fullpath) c = new a.Uri(this.fullpath);
                else {
                    c = this.getPackage();
                    b = c.getBaseUri();
                    h = this.getPath();
                    if (c.isIgnorePackageNameInUri() && (e = c.getName())) h = d.relative(e, h);
                    c = b.resolve(h);
                    if (b = this.getTag()) b += "." + this.getType(),
                    c.query.set("t", b)
                }
                this.fullPathUri = c
            }
            return this.fullPathUri
        },
        getFullPath: function() {
            var a;
            this.fullpath || (a = this.getFullPathUri(), this.fullpath = f.getMappedPath(this.runtime, a.toString()));
            return this.fullpath
        },
        getPath: function() {
            var a;
            if (! (a = this.path)) {
                a = this.name;
                var c = "." + this.getType(),
                e = "-min";
                a = d.join(d.dirname(a), d.basename(a, c));
                this.getPackage().isDebug() && (e = "");
                a = this.path = a + e + c
            }
            return a
        },
        getValue: function() {
            return this.value
        },
        getName: function() {
            return this.name
        },
        getPackage: function() {
            var b;
            if (! (b = this.packageInfo)) {
                var c = this.name;
                b = this.runtime.config("packages");
                var c = c + "/",
                d = "",
                e;
                for (e in b) a.startsWith(c, e + "/") && e.length > d.length && (d = e);
                b = this.packageInfo = b[d] || n
            }
            return b
        },
        getTag: function() {
            return this.tag || this.getPackage().getTag()
        },
        getCharset: function() {
            return this.charset || this.getPackage().getCharset()
        },
        getRequiredMods: function() {
            var b = this.runtime;
            return a.map(this.getNormalizedRequires(),
            function(a) {
                return f.createModuleInfo(b, a)
            })
        },
        getRequiresWithAlias: function() {
            var a = this.requiresWithAlias,
            c = this.requires;
            if (!c || 0 == c.length) return c || [];
            a || (this.requiresWithAlias = a = f.normalizeModNamesWithAlias(this.runtime, c, this.name));
            return a
        },
        getNormalizedRequires: function() {
            var a, c = this.normalizedRequiresStatus,
            d = this.status,
            e = this.requires;
            if (!e || 0 == e.length) return e || [];
            if ((a = this.normalizedRequires) && c == d) return a;
            this.normalizedRequiresStatus = d;
            return this.normalizedRequires = f.normalizeModNames(this.runtime, e, this.name)
        }
    });
    k.Module = l;
    var n = new g({
        name: "",
        runtime: a
    })
})(KISSY); (function(a) {
    function e(a, c) {
        var d = 0;
        if (k.webkit) a.sheet && ("webkit css poll loaded: " + c, d = 1);
        else if (a.sheet) try {
            a.sheet.cssRules && ("same domain css poll loaded: " + c, d = 1)
        } catch(e) {
            var f = e.name;
            "css poll exception: " + f + " " + e.code + " " + c;
            "NS_ERROR_DOM_SECURITY_ERR" == f && ("css poll exception: " + f + "loaded : " + c, d = 1)
        }
        return d
    }
    function g() {
        for (var b in n) {
            var c = n[b],
            d = c.node;
            e(d, b) && (c.callback && c.callback.call(d), delete n[b])
        }
        a.isEmptyObject(n) ? ("clear css poll timer", f = 0) : f = setTimeout(g, l)
    }
    var l = 30,
    k = a.UA,
    d = a.Loader.Utils,
    f = 0,
    n = {};
    d.pollCss = function(a, c) {
        var d;
        d = n[a.href] = {};
        d.node = a;
        d.callback = c;
        f || ("start css poll timer", g())
    };
    d.isCssLoaded = e
})(KISSY); (function(a) {
    var e = a.Env.host.document,
    g = a.Loader.Utils,
    l = a.Path,
    k = {},
    d, f = a.UA;
    a.getScript = function(n, b, c) {
        function p() {
            var a = r.readyState;
            if (!a || "loaded" == a || "complete" == a) r.onreadystatechange = r.onload = null,
            A(0)
        }
        var h = b,
        q = 0,
        j, o, m, i;
        a.startsWith(l.extname(n).toLowerCase(), ".css") && (q = 1);
        a.isPlainObject(h) && (b = h.success, j = h.error, o = h.timeout, c = h.charset, m = h.attrs);
        h = k[n] = k[n] || [];
        h.push([b, j]);
        if (1 < h.length) return h.node;
        var r = e.createElement(q ? "link": "script");
        m && a.each(m,
        function(a, b) {
            r.setAttribute(b, a)
        });
        c && (r.charset = c);
        q ? (r.href = n, r.rel = "stylesheet") : (r.src = n, r.async = !0);
        h.node = r;
        var A = function(b) {
            var c;
            if (i) {
                i.cancel();
                i = void 0
            }
            a.each(k[n],
            function(a) { (c = a[b]) && c.call(r)
            });
            delete k[n]
        },
        b = "onload" in r,
        c = a.Config.forceCssPoll || f.webkit && 536 > f.webkit;
        q && c && b && (b = !1);
        b ? (r.onload = p, r.onerror = function() {
            r.onerror = null;
            A(1)
        }) : q ? g.pollCss(r,
        function() {
            A(0)
        }) : r.onreadystatechange = p;
        o && (i = a.later(function() {
            A(1)
        },
        1E3 * o));
        d || (d = g.docHead());
        q ? d.appendChild(r) : d.insertBefore(r, d.firstChild);
        return r
    }
})(KISSY); (function(a, e) {
    function g(b) {
        b = b.replace(/\\/g, "/");
        "/" != b.charAt(b.length - 1) && (b += "/");
        f ? b = f.resolve(b) : (a.startsWith(b, "file:") || (b = "file:" + b), b = new a.Uri(b));
        return b
    }
    var l = a.Loader,
    k = l.Utils,
    d = a.Env.host.location,
    f, n, b = a.Config.fns;
    if (!a.UA.nodejs && d && (n = d.href)) f = new a.Uri(n);
    a.Config.loadModsFn = function(b, d) {
        a.getScript(b.fullpath, d)
    };
    b.map = function(a) {
        var b = this.Config;
        return ! 1 === a ? b.mappedRules = [] : b.mappedRules = (b.mappedRules || []).concat(a || [])
    };
    b.mapCombo = function(a) {
        var b = this.Config;
        return ! 1 === a ? b.mappedComboRules = [] : b.mappedComboRules = (b.mappedComboRules || []).concat(a || [])
    };
    b.packages = function(b) {
        var d, f = this.Config,
        k = f.packages = f.packages || {};
        return b ? (a.each(b,
        function(b, c) {
            d = b.name || c;
            var e = g(b.base || b.path);
            b.name = d;
            b.base = e.toString();
            b.baseUri = e;
            b.runtime = a;
            delete b.path;
            k[d] ? k[d].reset(b) : k[d] = new l.Package(b)
        }), e) : !1 === b ? (f.packages = {},
        e) : k
    };
    b.modules = function(b) {
        var d = this;
        b && a.each(b,
        function(b, c) {
            var e = k.createModuleInfo(d, c, b);
            e.status == l.Status.INIT && a.mix(e, b)
        })
    };
    b.base = function(a) {
        var b = this.Config;
        if (!a) return b.base;
        a = g(a);
        b.base = a.toString();
        b.baseUri = a;
        return e
    }
})(KISSY); (function(a, e) {
    function g(c, f, h, g, j) {
        var k = f && f.length,
        l = [],
        o = [];
        a.each(f,
        function(f) {
            var n, p = {
                timeout: j,
                success: function() {
                    o.push(f);
                    n && m && ("standard browser get mod name after load : " + n.name, b.registerModule(c, n.name, m.fn, m.config), m = e); --k || h(o, l)
                },
                error: function() {
                    l.push(f); --k || h(o, l)
                },
                charset: g
            };
            f.combine || (n = f.mods[0], "css" == n.getType() ? n = e: d && (i = n.name, r = a.now(), p.attrs = {
                "data-mod-name": n.name
            }));
            a.Config.loadModsFn(f, p)
        })
    }
    function l(b, d) {
        a.mix(this, {
            runtime: b,
            waitingModules: d
        })
    }
    function k(a, b) {
        for (var a = a.split(/\//), b = b.split(/\//), d = Math.min(a.length, b.length), c = 0; c < d && a[c] === b[c]; c++);
        return a.slice(0, c).join("/") + "/"
    }
    var d = a.UA.ie && 10 > a.UA.ie,
    f = a.Loader,
    n = f.Status,
    b = f.Utils,
    c = b.getHash,
    p = n.LOADING,
    h = n.LOADED,
    q = n.ERROR,
    j = a.now(),
    o = n.ATTACHED;
    l.groupTag = j;
    var m, i, r;
    l.add = function(c, f, h, g) {
        if ("function" === typeof c) if (h = f, f = c, d) {
            var c = a.Env.host.document.getElementsByTagName("script"),
            j,
            k,
            l;
            for (k = c.length - 1; 0 <= k; k--) if (l = c[k], "interactive" == l.readyState) {
                j = l;
                break
            }
            j ? j = j.getAttribute("data-mod-name") : ("can not find interactive script,time diff : " + (a.now() - r), "old_ie get mod name from cache : " + i, j = i);
            b.registerModule(g, j, f, h);
            i = null;
            r = 0
        } else m = {
            fn: f,
            config: h
        };
        else d ? (i = null, r = 0) : m = e,
        b.registerModule(g, c, f, h)
    };
    a.augment(l, {
        use: function(c) {
            var d = a.Config.timeout,
            e = this.runtime,
            c = a.keys(this.calculate(c));
            b.createModulesInfo(e, c);
            c = this.getComboUrls(c);
            a.each(c.css,
            function(c) {
                g(e, c,
                function(c, d) {
                    a.each(c,
                    function(c) {
                        a.each(c.mods,
                        function(c) {
                            b.registerModule(e, c.getName(), a.noop);
                            c.notifyAll()
                        })
                    });
                    a.each(d,
                    function(b) {
                        a.each(b.mods,
                        function(a) {
                            a.name + " is not loaded! can not find module in path : " + b.fullpath;
                            "error";
                            a.status = q;
                            a.notifyAll()
                        })
                    })
                },
                c.charset, d)
            });
            a.each(c.js,
            function(b) {
                g(e, b,
                function() {
                    a.each(b,
                    function(b) {
                        a.each(b.mods,
                        function(a) {
                            a.fn || (a.name + " is not loaded! can not find module in path : " + b.fullpath, "error", a.status = q);
                            a.notifyAll()
                        })
                    })
                },
                b.charset, d)
            })
        },
        calculate: function(a, c, d) {
            var e, f, g, j, i = this.waitingModules,
            k = this.runtime,
            d = d || {},
            c = c || {};
            for (e = 0; e < a.length; e++) f = a[e],
            c[f] || (c[f] = 1, g = b.createModuleInfo(k, f), j = g.status, j === q || j === o || (j != h && !i.contains(f) && (j != p && (g.status = p, d[f] = 1), g.wait(function(a) {
                i.remove(a.getName());
                i.notifyAll()
            }), i.add(f)), this.calculate(g.getNormalizedRequires(), c, d)));
            return d
        },
        getComboMods: function(c, d) {
            for (var e = {},
            f, h = this.runtime,
            g = 0,
            i = c.length,
            l, n, m, o, p, r, q, G, I; g < i; ++g) {
                l = c[g];
                l = b.createModuleInfo(h, l);
                m = l.getType();
                I = l.getFullPath();
                n = l.getPackage();
                q = n.getName();
                p = n.getCharset();
                o = n.getTag();
                G = n.getGroup();
                r = n.getPrefixUriForCombo();
                f = n.getPackageUri();
                var v = q; (l.canBeCombined = n.isCombine() && a.startsWith(I, r)) && G ? (v = G + "_" + p + "_" + j, (n = d[v]) ? n.isSameOriginAs(f) ? n.setPath(k(n.getPath(), f.getPath())) : (v = q, d[q] = f) : d[v] = f.clone()) : d[q] = f;
                f = e[m] = e[m] || {}; (m = f[v]) ? 1 == m.tags.length && m.tags[0] == o || m.tags.push(o) : (m = f[v] = [], m.charset = p, m.tags = [o]);
                m.push(l)
            }
            return e
        },
        getComboUrls: function(a) {
            var d = this.runtime,
            e = d.Config,
            f = e.comboPrefix,
            h = e.comboSep,
            g = e.comboMaxFileNum,
            j = e.comboMaxUrlLength,
            i = {},
            a = this.getComboMods(a, i),
            k = {},
            l;
            for (l in a) {
                k[l] = {};
                for (var n in a[l]) {
                    var m = [],
                    o = [],
                    p = a[l][n],
                    q = p.tags,
                    r = (q = 1 < q.length ? c(q.join("")) : q[0]) ? "?t=" + encodeURIComponent(q) + "." + l: "",
                    q = r.length,
                    v = i[n].toString(),
                    M = v.length,
                    J = v + f,
                    y = k[l][n] = [],
                    v = J.length;
                    y.charset = p.charset;
                    y.mods = [];
                    for (var K = function() {
                        y.push({
                            combine: 1,
                            fullpath: b.getMappedPath(d, J + m.join(h) + r, e.mappedComboRules),
                            mods: o
                        })
                    },
                    B = 0; B < p.length; B++) {
                        var z = p[B];
                        y.mods.push(z);
                        var C = z.getFullPath();
                        if (z.canBeCombined) {
                            if (C = C.slice(M).replace(/\?.*$/, ""), m.push(C), o.push(z), m.length > g || v + m.join(h).length + q > j) m.pop(),
                            o.pop(),
                            K(),
                            m = [],
                            o = [],
                            B--
                        } else y.push({
                            combine: 0,
                            fullpath: C,
                            mods: [z]
                        })
                    }
                    m.length && K()
                }
            }
            return k
        }
    });
    f.ComboLoader = l
})(KISSY); (function(a, e) {
    function g(b) {
        a.mix(this, {
            fn: b,
            waitMods: {}
        })
    }
    var l = a.Loader,
    k = a.Env,
    d = l.Utils,
    f = a.setImmediate,
    n = l.ComboLoader;
    g.prototype = {
        constructor: g,
        notifyAll: function() {
            var b = this.fn;
            b && a.isEmptyObject(this.waitMods) && (this.fn = null, b())
        },
        add: function(a) {
            this.waitMods[a] = 1
        },
        remove: function(a) {
            delete this.waitMods[a]
        },
        contains: function(a) {
            return this.waitMods[a]
        }
    };
    l.WaitingModules = g;
    a.mix(a, {
        add: function(b, c, d) {
            n.add(b, c, d, a)
        },
        use: function(b, c) {
            function k() {++m;
                var g = [],
                n = a.now(),
                t;
                t = d.attachModsRecursively(h, a, e, g);
                m + " check duration " + (a.now() - n);
                t ? c && (o ? c.apply(a, d.getModules(a, b)) : f(function() {
                    c.apply(a, d.getModules(a, b))
                })) : g.length ? j && (o ? j.apply(a, g) : f(function() {
                    j.apply(a, g)
                })) : (m + " reload " + b, i.fn = k, l.use(h))
            }
            var h, l, j, o, m = 0,
            i = new g(k);
            a.isPlainObject(c) && (o = c.sync, j = c.error, c = c.success);
            b = d.getModNamesAsArray(b);
            b = d.normalizeModNamesWithAlias(a, b);
            h = d.unalias(a, b);
            l = new n(a, i);
            o ? i.notifyAll() : f(function() {
                i.notifyAll()
            });
            return a
        },
        require: function(b) {
            b = d.unalias(a, d.normalizeModNamesWithAlias(a, [b]));
            return d.attachModsRecursively(b, a) ? d.getModules(a, b)[1] : e
        }
    });
    k.mods = {}
})(KISSY); (function(a) {
    function e(b) {
        var c = b.src || "";
        if (!c.match(n)) return 0;
        var b = (b = b.getAttribute("data-config")) ? (new Function("return " + b))() : {},
        e = b.comboPrefix = b.comboPrefix || "??",
        g = b.comboSep = b.comboSep || ",",
        l,
        j = c.indexOf(e); - 1 == j ? l = c.replace(f, "$1") : (l = c.substring(0, j), "/" != l.charAt(l.length - 1) && (l += "/"), e = c.substring(j + e.length).split(g), a.each(e,
        function(a) {
            if (a.match(n)) return l += a.replace(f, "$1"),
            !1
        }));
        return a.mix({
            base: l,
            tag: k.getHash(d + c)
        },
        b)
    }
    function g() {
        var a = l.getElementsByTagName("script"),
        c,
        d;
        for (c = a.length - 1; 0 <= c; c--) if (d = e(a[c])) return d;
        "must load kissy by file name in browser environment: seed.js or seed-min.js";
        "error";
        return null
    }
    var l = a.Env.host && a.Env.host.document,
    k = a.Loader.Utils,
    d = "20131121234724",
    f = /^(.*)(seed|kissy)(?:-min)?\.js[^/] * /i,n=/ (seed | kissy)( ? :-min) ? \.js / i; a.config({
        charset: "utf-8",
        lang: "zh-cn",
        tag: d
    }); a.UA.nodejs ? a.config({
        charset: "utf-8",
        base: __dirname.replace(/\\/g, "/").replace(/\/$/, "") + "/"
    }) : l && l.getElementsByTagName && a.config(a.mix({
        comboMaxUrlLength: 2E3,
        comboMaxFileNum: 40
    },
    g()))
})(KISSY);
KISSY.add("i18n", {
    alias: function(a, e) {
        return e + "/i18n/" + a.Config.lang
    }
}); (function(a, e) {
    function g() {
        if (!b) {
            d && !k.nodejs && m(l, j, g);
            b = 1;
            for (var e = 0; e < c.length; e++) try {
                c[e](a)
            } catch(f) {
                f.stack || f,
                "error",
                setTimeout(function() {
                    throw f;
                },
                0)
            }
        }
    }
    var l = a.Env.host,
    k = a.UA,
    d = l.document,
    f = d && d.documentElement,
    n = l.location,
    b = 0,
    c = [],
    p = /^#?([\w-]+)$/,
    h = /\S/,
    q = !(!d || !d.addEventListener),
    j = "load",
    o = q ?
    function(a, b, c) {
        a.addEventListener(b, c, !1)
    }: function(a, b, c) {
        a.attachEvent("on" + b, c)
    },
    m = q ?
    function(a, b, c) {
        a.removeEventListener(b, c, !1)
    }: function(a, b, c) {
        a.detachEvent("on" + b, c)
    };
    a.mix(a, {
        isWindow: function(a) {
            return null != a && a == a.window
        },
        parseXML: function(a) {
            if (a.documentElement) return a;
            var b;
            try {
                l.DOMParser ? b = (new DOMParser).parseFromString(a, "text/xml") : (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = !1, b.loadXML(a))
            } catch(c) {
                "parseXML error :",
                c,
                b = e
            } (!b || !b.documentElement || b.getElementsByTagName("parsererror").length) && "Invalid XML: " + a;
            return b
        },
        globalEval: function(a) {
            a && h.test(a) && (l.execScript ||
            function(a) {
                l.eval.call(l, a)
            })(a)
        },
        ready: function(d) {
            if (b) try {
                d(a)
            } catch(e) {
                e.stack || e,
                "error",
                setTimeout(function() {
                    throw e;
                },
                0)
            } else c.push(d);
            return this
        },
        available: function(b, c) {
            var b = (b + "").match(p)[1],
            e = 1,
            f = a.later(function() {
                if (500 < ++e) f.cancel();
                else {
                    var a = d.getElementById(b);
                    a && (c(a), f.cancel())
                }
            },
            40, !0)
        }
    });
    if (n && -1 !== (n.search || "").indexOf("ks-debug")) a.Config.debug = !0; (function() {
        if (!d || "complete" === d.readyState) g();
        else if (o(l, j, g), q) {
            var a = function() {
                m(d, "DOMContentLoaded", a);
                g()
            };
            o(d, "DOMContentLoaded", a)
        } else {
            var b = function() {
                "complete" === d.readyState && (m(d, "readystatechange", b), g())
            };
            o(d, "readystatechange", b);
            var c, e = f && f.doScroll;
            try {
                c = null === l.frameElement
            } catch(h) {
                c = !1
            }
            if (e && c) {
                var i = function() {
                    try {
                        e("left"),
                        g()
                    } catch(a) {
                        setTimeout(i, 40)
                    }
                };
                i()
            }
        }
    })();
    if (k.ie) try {
        d.execCommand("BackgroundImageCache", !1, !0)
    } catch(i) {}
})(KISSY, void 0); (function(a) {
    a.config({
        modules: {
            core: {
                alias: "dom,event,io,anim,base,node,json,ua,cookie".split(",")
            },
            ajax: {
                alias: ["io"]
            },
            "rich-base": {
                alias: ["base"]
            }
        }
    });
    if ("undefined" != typeof location) {
        var e = a.startsWith(location.href, "https") ? "https://s.tbcdn.cn/s/kissy/": "http://a.tbcdn.cn/s/kissy/";
        a.config({
            packages: {
                gallery: {
                    base: e
                },
                mobile: {
                    base: e
                }
            }
        })
    }
})(KISSY); (function(a, e, g) {
    a({
        anim: {
            requires: ["dom", "anim/base", "anim/timer", KISSY.Features.isTransitionSupported() ? "anim/transition": ""]
        }
    });
    a({
        "anim/base": {
            requires: ["dom", "promise"]
        }
    });
    a({
        "anim/timer": {
            requires: ["dom", "anim/base"]
        }
    });
    a({
        "anim/transition": {
            requires: ["dom", "event/dom", "anim/base"]
        }
    });
    a({
        base: {
            requires: ["event/custom"]
        }
    });
    a({
        button: {
            requires: ["node", "component/control"]
        }
    });
    a({
        color: {
            requires: ["base"]
        }
    });
    a({
        combobox: {
            requires: ["node", "component/control", "menu", "base", "io"]
        }
    });
    a({
        "component/container": {
            requires: ["component/control", "component/manager"]
        }
    });
    a({
        "component/control": {
            requires: ["node", "base", "promise", "component/manager", "xtemplate/runtime"]
        }
    });
    a({
        "component/extension/align": {
            requires: ["node"]
        }
    });
    a({
        "component/extension/delegate-children": {
            requires: ["node", "component/manager"]
        }
    });
    a({
        "component/plugin/drag": {
            requires: ["base", "dd"]
        }
    });
    a({
        "component/plugin/resize": {
            requires: ["resizable"]
        }
    });
    a({
        "date/format": {
            requires: ["date/gregorian", "i18n!date"]
        }
    });
    a({
        "date/gregorian": {
            requires: ["i18n!date"]
        }
    });
    a({
        "date/picker": {
            requires: ["node", "date/gregorian", "i18n!date/picker", "component/control", "date/format"]
        }
    });
    a({
        "date/popup-picker": {
            requires: ["date/picker", "component/extension/align", "component/extension/shim"]
        }
    });
    a({
        dd: {
            requires: ["node", "base"]
        }
    });
    a({
        "dd/plugin/constrain": {
            requires: ["base", "node"]
        }
    });
    a({
        "dd/plugin/proxy": {
            requires: ["node", "base", "dd"]
        }
    });
    a({
        "dd/plugin/scroll": {
            requires: ["dd", "base", "node"]
        }
    });
    a({
        "dom/basic": {
            alias: ["dom/base", e.isIELessThan(9) ? "dom/ie": "", e.isClassListSupported() ? "": "dom/class-list"]
        },
        dom: {
            alias: ["dom/basic", !e.isQuerySelectorSupported() ? "dom/selector": ""]
        }
    });
    a({
        "dom/class-list": {
            requires: ["dom/base"]
        }
    });
    a({
        "dom/ie": {
            requires: ["dom/base"]
        }
    });
    a({
        "dom/selector": {
            requires: ["dom/basic"]
        }
    });
    a({
        editor: {
            requires: ["node", "html-parser", "component/control", "event"]
        }
    });
    a({
        event: {
            requires: ["event/dom", "event/custom"]
        }
    });
    a({
        "event/custom": {
            requires: ["event/base"]
        }
    });
    a({
        "event/dom": {
            alias: ["event/dom/base", e.isTouchEventSupported() || e.isMsPointerSupported() ? "event/dom/touch": "", e.isDeviceMotionSupported() ? "event/dom/shake": "", e.isHashChangeSupported() ? "": "event/dom/hashchange", e.isIELessThan(9) ? "event/dom/ie": "", g.ie ? "": "event/dom/focusin"]
        }
    });
    a({
        "event/dom/base": {
            requires: ["event/base", "dom"]
        }
    });
    a({
        "event/dom/focusin": {
            requires: ["event/dom/base"]
        }
    });
    a({
        "event/dom/hashchange": {
            requires: ["event/dom/base", "dom"]
        }
    });
    a({
        "event/dom/ie": {
            requires: ["event/dom/base", "dom"]
        }
    });
    a({
        "event/dom/shake": {
            requires: ["event/dom/base"]
        }
    });
    a({
        "event/dom/touch": {
            requires: ["event/dom/base", "dom"]
        }
    });
    a({
        "filter-menu": {
            requires: ["menu", "node", "component/extension/content-render"]
        }
    });
    a({
        io: {
            requires: ["dom", "event/custom", "promise", "event"]
        }
    });
    a({
        kison: {
            requires: ["base"]
        }
    });
    a({
        menu: {
            requires: "node,component/container,component/extension/delegate-children,component/control,component/extension/content-render,component/extension/align,component/extension/shim".split(",")
        }
    });
    a({
        menubutton: {
            requires: ["node", "button", "component/extension/content-render", "menu"]
        }
    });
    a({
        mvc: {
            requires: ["base", "node", "io", "json"]
        }
    });
    a({
        node: {
            requires: ["dom", "event/dom", "anim"]
        }
    });
    a({
        overlay: {
            requires: ["component/container", "component/extension/shim", "component/extension/align", "node", "component/extension/content-render"]
        }
    });
    a({
        resizable: {
            requires: ["node", "base", "dd"]
        }
    });
    a({
        "resizable/plugin/proxy": {
            requires: ["base", "node"]
        }
    });
    a({
        "scroll-view": {
            alias: [e.isTouchEventSupported() || e.isMsPointerSupported() ? "scroll-view/drag": "scroll-view/base"]
        }
    });
    a({
        "scroll-view/base": {
            requires: ["node", "anim", "component/container", "component/extension/content-render"]
        }
    });
    a({
        "scroll-view/drag": {
            requires: ["scroll-view/base", "node", "anim"]
        }
    });
    a({
        "scroll-view/plugin/pull-to-refresh": {
            requires: ["base"]
        }
    });
    a({
        "scroll-view/plugin/scrollbar": {
            requires: ["base", "node", "component/control"]
        }
    });
    a({
        separator: {
            requires: ["component/control"]
        }
    });
    a({
        "split-button": {
            requires: ["component/container", "button", "menubutton"]
        }
    });
    a({
        stylesheet: {
            requires: ["dom"]
        }
    });
    a({
        swf: {
            requires: ["dom", "json", "base"]
        }
    });
    a({
        tabs: {
            requires: ["component/container", "toolbar", "button"]
        }
    });
    a({
        toolbar: {
            requires: ["component/container", "component/extension/delegate-children", "node"]
        }
    });
    a({
        tree: {
            requires: ["node", "component/container", "component/extension/content-render", "component/extension/delegate-children"]
        }
    });
    a({
        xtemplate: {
            requires: ["xtemplate/runtime", "xtemplate/compiler"]
        }
    });
    a({
        "xtemplate/compiler": {
            requires: ["xtemplate/runtime"]
        }
    });
    a({
        "xtemplate/nodejs": {
            requires: ["xtemplate"]
        }
    })
})(function(a) {
    KISSY.config("modules", a)
},
KISSY.Features, KISSY.UA); (function(a) {
    a.add("empty", a.noop);
    a.add("ua",
    function() {
        return a.UA
    });
    a.add("uri",
    function() {
        return a.Uri
    });
    a.add("path",
    function() {
        return a.Path
    });
    var e = a.Env.host,
    g = (e.document || {}).documentMode,
    l = (a.UA.nodejs && "object" === typeof global ? global: e).JSON;
    g && 9 > g && (l = null);
    if (l) a.add("json",
    function() {
        return a.JSON = l
    }),
    a.parseJson = function(a) {
        return l.parse(a)
    };
    else {
        var k = /^[\],:{}\s]*$/,
        d = /(?:^|:|,)(?:\s*\[)+/g,
        f = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        n = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
        a.parseJson = function(b) {
            return null === b ? b: "string" === typeof b && (b = a.trim(b)) && k.test(b.replace(f, "@").replace(n, "]").replace(d, "")) ? (new Function("return " + b))() : a.error("Invalid Json: " + b)
        }
    }
    a.UA.nodejs && (a.KISSY = a, module.exports = a)
})(KISSY);