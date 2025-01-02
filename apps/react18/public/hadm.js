!(function () {
  "use strict";
  let e = {};
  const t = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds",
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes",
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  };
  function n(e) {
    return (t = {}) => {
      const n = t.width ? String(t.width) : e.defaultWidth;
      return e.formats[n] || e.formats[e.defaultWidth];
    };
  }
  const r = {
      date: n({
        formats: {
          full: "EEEE, MMMM do, y",
          long: "MMMM do, y",
          medium: "MMM d, y",
          short: "MM/dd/yyyy",
        },
        defaultWidth: "full",
      }),
      time: n({
        formats: {
          full: "h:mm:ss a zzzz",
          long: "h:mm:ss a z",
          medium: "h:mm:ss a",
          short: "h:mm a",
        },
        defaultWidth: "full",
      }),
      dateTime: n({
        formats: {
          full: "{{date}} 'at' {{time}}",
          long: "{{date}} 'at' {{time}}",
          medium: "{{date}}, {{time}}",
          short: "{{date}}, {{time}}",
        },
        defaultWidth: "full",
      }),
    },
    a = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P",
    };
  function o(e) {
    return (t, n) => {
      let r;
      if (
        "formatting" ===
          ((null == n ? void 0 : n.context)
            ? String(n.context)
            : "standalone") &&
        e.formattingValues
      ) {
        const t = e.defaultFormattingWidth || e.defaultWidth,
          a = (null == n ? void 0 : n.width) ? String(n.width) : t;
        r = e.formattingValues[a] || e.formattingValues[t];
      } else {
        const t = e.defaultWidth,
          a = (null == n ? void 0 : n.width) ? String(n.width) : e.defaultWidth;
        r = e.values[a] || e.values[t];
      }
      return r[e.argumentCallback ? e.argumentCallback(t) : t];
    };
  }
  function i(e) {
    return (t, n = {}) => {
      const r = n.width,
        a = (r && e.matchPatterns[r]) || e.matchPatterns[e.defaultMatchWidth],
        o = t.match(a);
      if (!o) return null;
      const i = o[0],
        s = (r && e.parsePatterns[r]) || e.parsePatterns[e.defaultParseWidth],
        l = Array.isArray(s)
          ? (function (e, t) {
              for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
              return;
            })(s, (e) => e.test(i))
          : (function (e, t) {
              for (const n in e)
                if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
                  return n;
              return;
            })(s, (e) => e.test(i));
      let u;
      (u = e.valueCallback ? e.valueCallback(l) : l),
        (u = n.valueCallback ? n.valueCallback(u) : u);
      return { value: u, rest: t.slice(i.length) };
    };
  }
  function s(e) {
    return (t, n = {}) => {
      const r = t.match(e.matchPattern);
      if (!r) return null;
      const a = r[0],
        o = t.match(e.parsePattern);
      if (!o) return null;
      let i = e.valueCallback ? e.valueCallback(o[0]) : o[0];
      i = n.valueCallback ? n.valueCallback(i) : i;
      return { value: i, rest: t.slice(a.length) };
    };
  }
  const l = {
    code: "en-US",
    formatDistance: (e, n, r) => {
      let a;
      const o = t[e];
      return (
        (a =
          "string" == typeof o
            ? o
            : 1 === n
            ? o.one
            : o.other.replace("{{count}}", n.toString())),
        (null == r ? void 0 : r.addSuffix)
          ? r.comparison && r.comparison > 0
            ? "in " + a
            : a + " ago"
          : a
      );
    },
    formatLong: r,
    formatRelative: (e, t, n, r) => a[e],
    localize: {
      ordinalNumber: (e, t) => {
        const n = Number(e),
          r = n % 100;
        if (r > 20 || r < 10)
          switch (r % 10) {
            case 1:
              return n + "st";
            case 2:
              return n + "nd";
            case 3:
              return n + "rd";
          }
        return n + "th";
      },
      era: o({
        values: {
          narrow: ["B", "A"],
          abbreviated: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        defaultWidth: "wide",
      }),
      quarter: o({
        values: {
          narrow: ["1", "2", "3", "4"],
          abbreviated: ["Q1", "Q2", "Q3", "Q4"],
          wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
        },
        defaultWidth: "wide",
        argumentCallback: (e) => e - 1,
      }),
      month: o({
        values: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        defaultWidth: "wide",
      }),
      day: o({
        values: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        defaultWidth: "wide",
      }),
      dayPeriod: o({
        values: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
        },
        defaultWidth: "wide",
        formattingValues: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
        },
        defaultFormattingWidth: "wide",
      }),
    },
    match: {
      ordinalNumber: s({
        matchPattern: /^(\d+)(th|st|nd|rd)?/i,
        parsePattern: /\d+/i,
        valueCallback: (e) => parseInt(e, 10),
      }),
      era: i({
        matchPatterns: {
          narrow: /^(b|a)/i,
          abbreviated:
            /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
          wide: /^(before christ|before common era|anno domini|common era)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/^b/i, /^(a|c)/i] },
        defaultParseWidth: "any",
      }),
      quarter: i({
        matchPatterns: {
          narrow: /^[1234]/i,
          abbreviated: /^q[1234]/i,
          wide: /^[1234](th|st|nd|rd)? quarter/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
        defaultParseWidth: "any",
        valueCallback: (e) => e + 1,
      }),
      month: i({
        matchPatterns: {
          narrow: /^[jfmasond]/i,
          abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
          any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
        },
        defaultParseWidth: "any",
      }),
      day: i({
        matchPatterns: {
          narrow: /^[smtwf]/i,
          short: /^(su|mo|tu|we|th|fr|sa)/i,
          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
          any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
        },
        defaultParseWidth: "any",
      }),
      dayPeriod: i({
        matchPatterns: {
          narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
        },
        defaultMatchWidth: "any",
        parsePatterns: {
          any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i,
          },
        },
        defaultParseWidth: "any",
      }),
    },
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  };
  function u(t) {
    const n = {},
      r = e;
    for (const e in r)
      Object.prototype.hasOwnProperty.call(r, e) && (n[e] = r[e]);
    for (const e in t)
      Object.prototype.hasOwnProperty.call(t, e) &&
        (void 0 === t[e] ? delete n[e] : (n[e] = t[e]));
    e = n;
  }
  const c = {
      lessThanXSeconds: { one: "1초 미만", other: "{{count}}초 미만" },
      xSeconds: { one: "1초", other: "{{count}}초" },
      halfAMinute: "30초",
      lessThanXMinutes: { one: "1분 미만", other: "{{count}}분 미만" },
      xMinutes: { one: "1분", other: "{{count}}분" },
      aboutXHours: { one: "약 1시간", other: "약 {{count}}시간" },
      xHours: { one: "1시간", other: "{{count}}시간" },
      xDays: { one: "1일", other: "{{count}}일" },
      aboutXWeeks: { one: "약 1주", other: "약 {{count}}주" },
      xWeeks: { one: "1주", other: "{{count}}주" },
      aboutXMonths: { one: "약 1개월", other: "약 {{count}}개월" },
      xMonths: { one: "1개월", other: "{{count}}개월" },
      aboutXYears: { one: "약 1년", other: "약 {{count}}년" },
      xYears: { one: "1년", other: "{{count}}년" },
      overXYears: { one: "1년 이상", other: "{{count}}년 이상" },
      almostXYears: { one: "거의 1년", other: "거의 {{count}}년" },
    },
    d = {
      date: n({
        formats: {
          full: "y년 M월 d일 EEEE",
          long: "y년 M월 d일",
          medium: "y.MM.dd",
          short: "y.MM.dd",
        },
        defaultWidth: "full",
      }),
      time: n({
        formats: {
          full: "a H시 mm분 ss초 zzzz",
          long: "a H:mm:ss z",
          medium: "HH:mm:ss",
          short: "HH:mm",
        },
        defaultWidth: "full",
      }),
      dateTime: n({
        formats: {
          full: "{{date}} {{time}}",
          long: "{{date}} {{time}}",
          medium: "{{date}} {{time}}",
          short: "{{date}} {{time}}",
        },
        defaultWidth: "full",
      }),
    },
    f = {
      lastWeek: "'지난' eeee p",
      yesterday: "'어제' p",
      today: "'오늘' p",
      tomorrow: "'내일' p",
      nextWeek: "'다음' eeee p",
      other: "P",
    },
    p = {
      code: "ko",
      formatDistance: (e, t, n) => {
        let r;
        const a = c[e];
        return (
          (r =
            "string" == typeof a
              ? a
              : 1 === t
              ? a.one
              : a.other.replace("{{count}}", t.toString())),
          (null == n ? void 0 : n.addSuffix)
            ? n.comparison && n.comparison > 0
              ? r + " 후"
              : r + " 전"
            : r
        );
      },
      formatLong: d,
      formatRelative: (e, t, n, r) => f[e],
      localize: {
        ordinalNumber: (e, t) => {
          const n = Number(e);
          switch (String(null == t ? void 0 : t.unit)) {
            case "minute":
            case "second":
              return String(n);
            case "date":
              return n + "일";
            default:
              return n + "번째";
          }
        },
        era: o({
          values: {
            narrow: ["BC", "AD"],
            abbreviated: ["BC", "AD"],
            wide: ["기원전", "서기"],
          },
          defaultWidth: "wide",
        }),
        quarter: o({
          values: {
            narrow: ["1", "2", "3", "4"],
            abbreviated: ["Q1", "Q2", "Q3", "Q4"],
            wide: ["1분기", "2분기", "3분기", "4분기"],
          },
          defaultWidth: "wide",
          argumentCallback: (e) => e - 1,
        }),
        month: o({
          values: {
            narrow: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
            ],
            abbreviated: [
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월",
            ],
            wide: [
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월",
            ],
          },
          defaultWidth: "wide",
        }),
        day: o({
          values: {
            narrow: ["일", "월", "화", "수", "목", "금", "토"],
            short: ["일", "월", "화", "수", "목", "금", "토"],
            abbreviated: ["일", "월", "화", "수", "목", "금", "토"],
            wide: [
              "일요일",
              "월요일",
              "화요일",
              "수요일",
              "목요일",
              "금요일",
              "토요일",
            ],
          },
          defaultWidth: "wide",
        }),
        dayPeriod: o({
          values: {
            narrow: {
              am: "오전",
              pm: "오후",
              midnight: "자정",
              noon: "정오",
              morning: "아침",
              afternoon: "오후",
              evening: "저녁",
              night: "밤",
            },
            abbreviated: {
              am: "오전",
              pm: "오후",
              midnight: "자정",
              noon: "정오",
              morning: "아침",
              afternoon: "오후",
              evening: "저녁",
              night: "밤",
            },
            wide: {
              am: "오전",
              pm: "오후",
              midnight: "자정",
              noon: "정오",
              morning: "아침",
              afternoon: "오후",
              evening: "저녁",
              night: "밤",
            },
          },
          defaultWidth: "wide",
          formattingValues: {
            narrow: {
              am: "오전",
              pm: "오후",
              midnight: "자정",
              noon: "정오",
              morning: "아침",
              afternoon: "오후",
              evening: "저녁",
              night: "밤",
            },
            abbreviated: {
              am: "오전",
              pm: "오후",
              midnight: "자정",
              noon: "정오",
              morning: "아침",
              afternoon: "오후",
              evening: "저녁",
              night: "밤",
            },
            wide: {
              am: "오전",
              pm: "오후",
              midnight: "자정",
              noon: "정오",
              morning: "아침",
              afternoon: "오후",
              evening: "저녁",
              night: "밤",
            },
          },
          defaultFormattingWidth: "wide",
        }),
      },
      match: {
        ordinalNumber: s({
          matchPattern: /^(\d+)(일|번째)?/i,
          parsePattern: /\d+/i,
          valueCallback: (e) => parseInt(e, 10),
        }),
        era: i({
          matchPatterns: {
            narrow:
              /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
            abbreviated:
              /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
            wide: /^(기원전|서기)/i,
          },
          defaultMatchWidth: "wide",
          parsePatterns: { any: [/^(bc|기원전)/i, /^(ad|서기)/i] },
          defaultParseWidth: "any",
        }),
        quarter: i({
          matchPatterns: {
            narrow: /^[1234]/i,
            abbreviated: /^q[1234]/i,
            wide: /^[1234]사?분기/i,
          },
          defaultMatchWidth: "wide",
          parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
          defaultParseWidth: "any",
          valueCallback: (e) => e + 1,
        }),
        month: i({
          matchPatterns: {
            narrow: /^(1[012]|[123456789])/,
            abbreviated: /^(1[012]|[123456789])월/i,
            wide: /^(1[012]|[123456789])월/i,
          },
          defaultMatchWidth: "wide",
          parsePatterns: {
            any: [
              /^1월?$/,
              /^2/,
              /^3/,
              /^4/,
              /^5/,
              /^6/,
              /^7/,
              /^8/,
              /^9/,
              /^10/,
              /^11/,
              /^12/,
            ],
          },
          defaultParseWidth: "any",
        }),
        day: i({
          matchPatterns: {
            narrow: /^[일월화수목금토]/,
            short: /^[일월화수목금토]/,
            abbreviated: /^[일월화수목금토]/,
            wide: /^[일월화수목금토]요일/,
          },
          defaultMatchWidth: "wide",
          parsePatterns: {
            any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/],
          },
          defaultParseWidth: "any",
        }),
        dayPeriod: i({
          matchPatterns: { any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i },
          defaultMatchWidth: "any",
          parsePatterns: {
            any: {
              am: /^(am|오전)/i,
              pm: /^(pm|오후)/i,
              midnight: /^자정/i,
              noon: /^정오/i,
              morning: /^아침/i,
              afternoon: /^오후/i,
              evening: /^저녁/i,
              night: /^밤/i,
            },
          },
          defaultParseWidth: "any",
        }),
      },
      options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
    };
  function h(e) {
    return (h =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function g(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function m(e) {
    var t = (function (e, t) {
      if ("object" != h(e) || !e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var r = n.call(e, t || "default");
        if ("object" != h(r)) return r;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t ? String : Number)(e);
    })(e, "string");
    return "symbol" == h(t) ? t : t + "";
  }
  function v(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, m(r.key), r);
    }
  }
  function y(e, t, n) {
    return (
      t && v(e.prototype, t),
      n && v(e, n),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      e
    );
  }
  function b(e) {
    if (void 0 === e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return e;
  }
  function w(e, t) {
    return (w = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
  }
  function _(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError("Super expression must either be null or a function");
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, writable: !0, configurable: !0 },
    })),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      t && w(e, t);
  }
  function S(e, t) {
    if (t && ("object" == h(t) || "function" == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError(
        "Derived constructors may only return object or undefined"
      );
    return b(e);
  }
  function E(e) {
    return (E = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
  }
  function k(e, t, n) {
    return (
      (t = m(t)) in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function O(e) {
    if (Array.isArray(e)) return e;
  }
  function x(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function C(e, t) {
    if (e) {
      if ("string" == typeof e) return x(e, t);
      var n = {}.toString.call(e).slice(8, -1);
      return (
        "Object" === n && e.constructor && (n = e.constructor.name),
        "Map" === n || "Set" === n
          ? Array.from(e)
          : "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          ? x(e, t)
          : void 0
      );
    }
  }
  function T() {
    throw new TypeError(
      "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function N(e) {
    return (
      O(e) ||
      (function (e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      C(e) ||
      T()
    );
  }
  function R(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function L(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? R(Object(n), !0).forEach(function (t) {
            k(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : R(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  var P = {
      type: "logger",
      log: function (e) {
        this.output("log", e);
      },
      warn: function (e) {
        this.output("warn", e);
      },
      error: function (e) {
        this.output("error", e);
      },
      output: function (e, t) {
        console && console[e] && console[e].apply(console, t);
      },
    },
    j = new ((function () {
      function e(t) {
        var n =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        g(this, e), this.init(t, n);
      }
      return (
        y(e, [
          {
            key: "init",
            value: function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
              (this.prefix = t.prefix || "i18next:"),
                (this.logger = e || P),
                (this.options = t),
                (this.debug = t.debug);
            },
          },
          {
            key: "setDebug",
            value: function (e) {
              this.debug = e;
            },
          },
          {
            key: "log",
            value: function () {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return this.forward(t, "log", "", !0);
            },
          },
          {
            key: "warn",
            value: function () {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return this.forward(t, "warn", "", !0);
            },
          },
          {
            key: "error",
            value: function () {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return this.forward(t, "error", "");
            },
          },
          {
            key: "deprecate",
            value: function () {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return this.forward(t, "warn", "WARNING DEPRECATED: ", !0);
            },
          },
          {
            key: "forward",
            value: function (e, t, n, r) {
              return r && !this.debug
                ? null
                : ("string" == typeof e[0] &&
                    (e[0] = "".concat(n).concat(this.prefix, " ").concat(e[0])),
                  this.logger[t](e));
            },
          },
          {
            key: "create",
            value: function (t) {
              return new e(
                this.logger,
                L(
                  L({}, { prefix: "".concat(this.prefix, ":").concat(t, ":") }),
                  this.options
                )
              );
            },
          },
          {
            key: "clone",
            value: function (t) {
              return (
                ((t = t || this.options).prefix = t.prefix || this.prefix),
                new e(this.logger, t)
              );
            },
          },
        ]),
        e
      );
    })())(),
    I = (function () {
      function e() {
        g(this, e), (this.observers = {});
      }
      return (
        y(e, [
          {
            key: "on",
            value: function (e, t) {
              var n = this;
              return (
                e.split(" ").forEach(function (e) {
                  (n.observers[e] = n.observers[e] || []),
                    n.observers[e].push(t);
                }),
                this
              );
            },
          },
          {
            key: "off",
            value: function (e, t) {
              this.observers[e] &&
                (t
                  ? (this.observers[e] = this.observers[e].filter(function (e) {
                      return e !== t;
                    }))
                  : delete this.observers[e]);
            },
          },
          {
            key: "emit",
            value: function (e) {
              for (
                var t = arguments.length,
                  n = new Array(t > 1 ? t - 1 : 0),
                  r = 1;
                r < t;
                r++
              )
                n[r - 1] = arguments[r];
              if (this.observers[e]) {
                var a = [].concat(this.observers[e]);
                a.forEach(function (e) {
                  e.apply(void 0, n);
                });
              }
              if (this.observers["*"]) {
                var o = [].concat(this.observers["*"]);
                o.forEach(function (t) {
                  t.apply(t, [e].concat(n));
                });
              }
            },
          },
        ]),
        e
      );
    })();
  function A() {
    var e,
      t,
      n = new Promise(function (n, r) {
        (e = n), (t = r);
      });
    return (n.resolve = e), (n.reject = t), n;
  }
  function D(e) {
    return null == e ? "" : "" + e;
  }
  function z(e, t, n) {
    e.forEach(function (e) {
      t[e] && (n[e] = t[e]);
    });
  }
  function M(e, t, n) {
    function r(e) {
      return e && e.indexOf("###") > -1 ? e.replace(/###/g, ".") : e;
    }
    function a() {
      return !e || "string" == typeof e;
    }
    for (
      var o = "string" != typeof t ? [].concat(t) : t.split(".");
      o.length > 1;

    ) {
      if (a()) return {};
      var i = r(o.shift());
      !e[i] && n && (e[i] = new n()),
        (e = Object.prototype.hasOwnProperty.call(e, i) ? e[i] : {});
    }
    return a() ? {} : { obj: e, k: r(o.shift()) };
  }
  function U(e, t, n) {
    var r = M(e, t, Object);
    r.obj[r.k] = n;
  }
  function F(e, t) {
    var n = M(e, t),
      r = n.obj,
      a = n.k;
    if (r) return r[a];
  }
  function H(e, t, n) {
    var r = F(e, n);
    return void 0 !== r ? r : F(t, n);
  }
  function V(e, t, n) {
    for (var r in t)
      "__proto__" !== r &&
        "constructor" !== r &&
        (r in e
          ? "string" == typeof e[r] ||
            e[r] instanceof String ||
            "string" == typeof t[r] ||
            t[r] instanceof String
            ? n && (e[r] = t[r])
            : V(e[r], t[r], n)
          : (e[r] = t[r]));
    return e;
  }
  function B(e) {
    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
  var W = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
  };
  function K(e) {
    return "string" == typeof e
      ? e.replace(/[&<>"'\/]/g, function (e) {
          return W[e];
        })
      : e;
  }
  var $ =
      "undefined" != typeof window &&
      window.navigator &&
      void 0 === window.navigator.userAgentData &&
      window.navigator.userAgent &&
      window.navigator.userAgent.indexOf("MSIE") > -1,
    G = [" ", ",", "?", "!", ";"];
  function q(e, t) {
    var n =
      arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".";
    if (e) {
      if (e[t]) return e[t];
      for (var r = t.split(n), a = e, o = 0; o < r.length; ++o) {
        if (!a) return;
        if ("string" == typeof a[r[o]] && o + 1 < r.length) return;
        if (void 0 === a[r[o]]) {
          for (
            var i = 2, s = r.slice(o, o + i).join(n), l = a[s];
            void 0 === l && r.length > o + i;

          )
            i++, (l = a[(s = r.slice(o, o + i).join(n))]);
          if (void 0 === l) return;
          if (null === l) return null;
          if (t.endsWith(s)) {
            if ("string" == typeof l) return l;
            if (s && "string" == typeof l[s]) return l[s];
          }
          var u = r.slice(o + i).join(n);
          return u ? q(l, u, n) : void 0;
        }
        a = a[r[o]];
      }
      return a;
    }
  }
  function X(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function J(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? X(Object(n), !0).forEach(function (t) {
            k(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : X(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function Z(e) {
    var t = (function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch (e) {
        return !1;
      }
    })();
    return function () {
      var n,
        r = E(e);
      if (t) {
        var a = E(this).constructor;
        n = Reflect.construct(r, arguments, a);
      } else n = r.apply(this, arguments);
      return S(this, n);
    };
  }
  var Y = (function (e) {
      _(n, e);
      var t = Z(n);
      function n(e) {
        var r,
          a =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : { ns: ["translation"], defaultNS: "translation" };
        return (
          g(this, n),
          (r = t.call(this)),
          $ && I.call(b(r)),
          (r.data = e || {}),
          (r.options = a),
          void 0 === r.options.keySeparator && (r.options.keySeparator = "."),
          void 0 === r.options.ignoreJSONStructure &&
            (r.options.ignoreJSONStructure = !0),
          r
        );
      }
      return (
        y(n, [
          {
            key: "addNamespaces",
            value: function (e) {
              this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
            },
          },
          {
            key: "removeNamespaces",
            value: function (e) {
              var t = this.options.ns.indexOf(e);
              t > -1 && this.options.ns.splice(t, 1);
            },
          },
          {
            key: "getResource",
            value: function (e, t, n) {
              var r =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : {},
                a =
                  void 0 !== r.keySeparator
                    ? r.keySeparator
                    : this.options.keySeparator,
                o =
                  void 0 !== r.ignoreJSONStructure
                    ? r.ignoreJSONStructure
                    : this.options.ignoreJSONStructure,
                i = [e, t];
              n && "string" != typeof n && (i = i.concat(n)),
                n && "string" == typeof n && (i = i.concat(a ? n.split(a) : n)),
                e.indexOf(".") > -1 && (i = e.split("."));
              var s = F(this.data, i);
              return s || !o || "string" != typeof n
                ? s
                : q(this.data && this.data[e] && this.data[e][t], n, a);
            },
          },
          {
            key: "addResource",
            value: function (e, t, n, r) {
              var a =
                  arguments.length > 4 && void 0 !== arguments[4]
                    ? arguments[4]
                    : { silent: !1 },
                o = this.options.keySeparator;
              void 0 === o && (o = ".");
              var i = [e, t];
              n && (i = i.concat(o ? n.split(o) : n)),
                e.indexOf(".") > -1 && ((r = t), (t = (i = e.split("."))[1])),
                this.addNamespaces(t),
                U(this.data, i, r),
                a.silent || this.emit("added", e, t, n, r);
            },
          },
          {
            key: "addResources",
            value: function (e, t, n) {
              var r =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : { silent: !1 };
              for (var a in n)
                ("string" != typeof n[a] &&
                  "[object Array]" !== Object.prototype.toString.apply(n[a])) ||
                  this.addResource(e, t, a, n[a], { silent: !0 });
              r.silent || this.emit("added", e, t, n);
            },
          },
          {
            key: "addResourceBundle",
            value: function (e, t, n, r, a) {
              var o =
                  arguments.length > 5 && void 0 !== arguments[5]
                    ? arguments[5]
                    : { silent: !1 },
                i = [e, t];
              e.indexOf(".") > -1 &&
                ((r = n), (n = t), (t = (i = e.split("."))[1])),
                this.addNamespaces(t);
              var s = F(this.data, i) || {};
              r ? V(s, n, a) : (s = J(J({}, s), n)),
                U(this.data, i, s),
                o.silent || this.emit("added", e, t, n);
            },
          },
          {
            key: "removeResourceBundle",
            value: function (e, t) {
              this.hasResourceBundle(e, t) && delete this.data[e][t],
                this.removeNamespaces(t),
                this.emit("removed", e, t);
            },
          },
          {
            key: "hasResourceBundle",
            value: function (e, t) {
              return void 0 !== this.getResource(e, t);
            },
          },
          {
            key: "getResourceBundle",
            value: function (e, t) {
              return (
                t || (t = this.options.defaultNS),
                "v1" === this.options.compatibilityAPI
                  ? J(J({}, {}), this.getResource(e, t))
                  : this.getResource(e, t)
              );
            },
          },
          {
            key: "getDataByLanguage",
            value: function (e) {
              return this.data[e];
            },
          },
          {
            key: "hasLanguageSomeTranslations",
            value: function (e) {
              var t = this.getDataByLanguage(e);
              return !!((t && Object.keys(t)) || []).find(function (e) {
                return t[e] && Object.keys(t[e]).length > 0;
              });
            },
          },
          {
            key: "toJSON",
            value: function () {
              return this.data;
            },
          },
        ]),
        n
      );
    })(I),
    Q = {
      processors: {},
      addPostProcessor: function (e) {
        this.processors[e.name] = e;
      },
      handle: function (e, t, n, r, a) {
        var o = this;
        return (
          e.forEach(function (e) {
            o.processors[e] && (t = o.processors[e].process(t, n, r, a));
          }),
          t
        );
      },
    };
  function ee(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function te(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? ee(Object(n), !0).forEach(function (t) {
            k(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : ee(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function ne(e) {
    var t = (function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch (e) {
        return !1;
      }
    })();
    return function () {
      var n,
        r = E(e);
      if (t) {
        var a = E(this).constructor;
        n = Reflect.construct(r, arguments, a);
      } else n = r.apply(this, arguments);
      return S(this, n);
    };
  }
  var re = {},
    ae = (function (e) {
      _(n, e);
      var t = ne(n);
      function n(e) {
        var r,
          a =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return (
          g(this, n),
          (r = t.call(this)),
          $ && I.call(b(r)),
          z(
            [
              "resourceStore",
              "languageUtils",
              "pluralResolver",
              "interpolator",
              "backendConnector",
              "i18nFormat",
              "utils",
            ],
            e,
            b(r)
          ),
          (r.options = a),
          void 0 === r.options.keySeparator && (r.options.keySeparator = "."),
          (r.logger = j.create("translator")),
          r
        );
      }
      return (
        y(
          n,
          [
            {
              key: "changeLanguage",
              value: function (e) {
                e && (this.language = e);
              },
            },
            {
              key: "exists",
              value: function (e) {
                var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : { interpolation: {} };
                if (null == e) return !1;
                var n = this.resolve(e, t);
                return n && void 0 !== n.res;
              },
            },
            {
              key: "extractFromKey",
              value: function (e, t) {
                var n =
                  void 0 !== t.nsSeparator
                    ? t.nsSeparator
                    : this.options.nsSeparator;
                void 0 === n && (n = ":");
                var r =
                    void 0 !== t.keySeparator
                      ? t.keySeparator
                      : this.options.keySeparator,
                  a = t.ns || this.options.defaultNS || [],
                  o = n && e.indexOf(n) > -1,
                  i = !(
                    this.options.userDefinedKeySeparator ||
                    t.keySeparator ||
                    this.options.userDefinedNsSeparator ||
                    t.nsSeparator ||
                    (function (e, t, n) {
                      (t = t || ""), (n = n || "");
                      var r = G.filter(function (e) {
                        return t.indexOf(e) < 0 && n.indexOf(e) < 0;
                      });
                      if (0 === r.length) return !0;
                      var a = new RegExp(
                          "(".concat(
                            r
                              .map(function (e) {
                                return "?" === e ? "\\?" : e;
                              })
                              .join("|"),
                            ")"
                          )
                        ),
                        o = !a.test(e);
                      if (!o) {
                        var i = e.indexOf(n);
                        i > 0 && !a.test(e.substring(0, i)) && (o = !0);
                      }
                      return o;
                    })(e, n, r)
                  );
                if (o && !i) {
                  var s = e.match(this.interpolator.nestingRegexp);
                  if (s && s.length > 0) return { key: e, namespaces: a };
                  var l = e.split(n);
                  (n !== r ||
                    (n === r && this.options.ns.indexOf(l[0]) > -1)) &&
                    (a = l.shift()),
                    (e = l.join(r));
                }
                return (
                  "string" == typeof a && (a = [a]), { key: e, namespaces: a }
                );
              },
            },
            {
              key: "translate",
              value: function (e, t, r) {
                var a = this;
                if (
                  ("object" !== h(t) &&
                    this.options.overloadTranslationOptionHandler &&
                    (t =
                      this.options.overloadTranslationOptionHandler(arguments)),
                  "object" === h(t) && (t = te({}, t)),
                  t || (t = {}),
                  null == e)
                )
                  return "";
                Array.isArray(e) || (e = [String(e)]);
                var o =
                    void 0 !== t.returnDetails
                      ? t.returnDetails
                      : this.options.returnDetails,
                  i =
                    void 0 !== t.keySeparator
                      ? t.keySeparator
                      : this.options.keySeparator,
                  s = this.extractFromKey(e[e.length - 1], t),
                  l = s.key,
                  u = s.namespaces,
                  c = u[u.length - 1],
                  d = t.lng || this.language,
                  f =
                    t.appendNamespaceToCIMode ||
                    this.options.appendNamespaceToCIMode;
                if (d && "cimode" === d.toLowerCase()) {
                  if (f) {
                    var p = t.nsSeparator || this.options.nsSeparator;
                    return o
                      ? {
                          res: "".concat(c).concat(p).concat(l),
                          usedKey: l,
                          exactUsedKey: l,
                          usedLng: d,
                          usedNS: c,
                        }
                      : "".concat(c).concat(p).concat(l);
                  }
                  return o
                    ? {
                        res: l,
                        usedKey: l,
                        exactUsedKey: l,
                        usedLng: d,
                        usedNS: c,
                      }
                    : l;
                }
                var g = this.resolve(e, t),
                  m = g && g.res,
                  v = (g && g.usedKey) || l,
                  y = (g && g.exactUsedKey) || l,
                  b = Object.prototype.toString.apply(m),
                  w = [
                    "[object Number]",
                    "[object Function]",
                    "[object RegExp]",
                  ],
                  _ =
                    void 0 !== t.joinArrays
                      ? t.joinArrays
                      : this.options.joinArrays,
                  S = !this.i18nFormat || this.i18nFormat.handleAsObject,
                  E =
                    "string" != typeof m &&
                    "boolean" != typeof m &&
                    "number" != typeof m;
                if (
                  S &&
                  m &&
                  E &&
                  w.indexOf(b) < 0 &&
                  ("string" != typeof _ || "[object Array]" !== b)
                ) {
                  if (!t.returnObjects && !this.options.returnObjects) {
                    this.options.returnedObjectHandler ||
                      this.logger.warn(
                        "accessing an object - but returnObjects options is not enabled!"
                      );
                    var k = this.options.returnedObjectHandler
                      ? this.options.returnedObjectHandler(
                          v,
                          m,
                          te(te({}, t), {}, { ns: u })
                        )
                      : "key '"
                          .concat(l, " (")
                          .concat(
                            this.language,
                            ")' returned an object instead of string."
                          );
                    return o ? ((g.res = k), g) : k;
                  }
                  if (i) {
                    var O = "[object Array]" === b,
                      x = O ? [] : {},
                      C = O ? y : v;
                    for (var T in m)
                      if (Object.prototype.hasOwnProperty.call(m, T)) {
                        var N = "".concat(C).concat(i).concat(T);
                        (x[T] = this.translate(
                          N,
                          te(te({}, t), { joinArrays: !1, ns: u })
                        )),
                          x[T] === N && (x[T] = m[T]);
                      }
                    m = x;
                  }
                } else if (S && "string" == typeof _ && "[object Array]" === b)
                  (m = m.join(_)) && (m = this.extendTranslation(m, e, t, r));
                else {
                  var R = !1,
                    L = !1,
                    P = void 0 !== t.count && "string" != typeof t.count,
                    j = n.hasDefaultValue(t),
                    I = P ? this.pluralResolver.getSuffix(d, t.count, t) : "",
                    A = t["defaultValue".concat(I)] || t.defaultValue;
                  !this.isValidLookup(m) && j && ((R = !0), (m = A)),
                    this.isValidLookup(m) || ((L = !0), (m = l));
                  var D =
                      t.missingKeyNoValueFallbackToKey ||
                      this.options.missingKeyNoValueFallbackToKey,
                    z = D && L ? void 0 : m,
                    M = j && A !== m && this.options.updateMissing;
                  if (L || R || M) {
                    if (
                      (this.logger.log(
                        M ? "updateKey" : "missingKey",
                        d,
                        c,
                        l,
                        M ? A : m
                      ),
                      i)
                    ) {
                      var U = this.resolve(
                        l,
                        te(te({}, t), {}, { keySeparator: !1 })
                      );
                      U &&
                        U.res &&
                        this.logger.warn(
                          "Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format."
                        );
                    }
                    var F = [],
                      H = this.languageUtils.getFallbackCodes(
                        this.options.fallbackLng,
                        t.lng || this.language
                      );
                    if ("fallback" === this.options.saveMissingTo && H && H[0])
                      for (var V = 0; V < H.length; V++) F.push(H[V]);
                    else
                      "all" === this.options.saveMissingTo
                        ? (F = this.languageUtils.toResolveHierarchy(
                            t.lng || this.language
                          ))
                        : F.push(t.lng || this.language);
                    var B = function (e, n, r) {
                      var o = j && r !== m ? r : z;
                      a.options.missingKeyHandler
                        ? a.options.missingKeyHandler(e, c, n, o, M, t)
                        : a.backendConnector &&
                          a.backendConnector.saveMissing &&
                          a.backendConnector.saveMissing(e, c, n, o, M, t),
                        a.emit("missingKey", e, c, n, m);
                    };
                    this.options.saveMissing &&
                      (this.options.saveMissingPlurals && P
                        ? F.forEach(function (e) {
                            a.pluralResolver
                              .getSuffixes(e, t)
                              .forEach(function (n) {
                                B([e], l + n, t["defaultValue".concat(n)] || A);
                              });
                          })
                        : B(F, l, A));
                  }
                  (m = this.extendTranslation(m, e, t, g, r)),
                    L &&
                      m === l &&
                      this.options.appendNamespaceToMissingKey &&
                      (m = "".concat(c, ":").concat(l)),
                    (L || R) &&
                      this.options.parseMissingKeyHandler &&
                      (m =
                        "v1" !== this.options.compatibilityAPI
                          ? this.options.parseMissingKeyHandler(
                              this.options.appendNamespaceToMissingKey
                                ? "".concat(c, ":").concat(l)
                                : l,
                              R ? m : void 0
                            )
                          : this.options.parseMissingKeyHandler(m));
                }
                return o ? ((g.res = m), g) : m;
              },
            },
            {
              key: "extendTranslation",
              value: function (e, t, n, r, a) {
                var o = this;
                if (this.i18nFormat && this.i18nFormat.parse)
                  e = this.i18nFormat.parse(
                    e,
                    te(te({}, this.options.interpolation.defaultVariables), n),
                    r.usedLng,
                    r.usedNS,
                    r.usedKey,
                    { resolved: r }
                  );
                else if (!n.skipInterpolation) {
                  n.interpolation &&
                    this.interpolator.init(
                      te(te({}, n), {
                        interpolation: te(
                          te({}, this.options.interpolation),
                          n.interpolation
                        ),
                      })
                    );
                  var i,
                    s =
                      "string" == typeof e &&
                      (n &&
                      n.interpolation &&
                      void 0 !== n.interpolation.skipOnVariables
                        ? n.interpolation.skipOnVariables
                        : this.options.interpolation.skipOnVariables);
                  if (s) {
                    var l = e.match(this.interpolator.nestingRegexp);
                    i = l && l.length;
                  }
                  var u =
                    n.replace && "string" != typeof n.replace ? n.replace : n;
                  if (
                    (this.options.interpolation.defaultVariables &&
                      (u = te(
                        te({}, this.options.interpolation.defaultVariables),
                        u
                      )),
                    (e = this.interpolator.interpolate(
                      e,
                      u,
                      n.lng || this.language,
                      n
                    )),
                    s)
                  ) {
                    var c = e.match(this.interpolator.nestingRegexp);
                    i < (c && c.length) && (n.nest = !1);
                  }
                  !n.lng &&
                    "v1" !== this.options.compatibilityAPI &&
                    r &&
                    r.res &&
                    (n.lng = r.usedLng),
                    !1 !== n.nest &&
                      (e = this.interpolator.nest(
                        e,
                        function () {
                          for (
                            var e = arguments.length, r = new Array(e), i = 0;
                            i < e;
                            i++
                          )
                            r[i] = arguments[i];
                          return a && a[0] === r[0] && !n.context
                            ? (o.logger.warn(
                                "It seems you are nesting recursively key: "
                                  .concat(r[0], " in key: ")
                                  .concat(t[0])
                              ),
                              null)
                            : o.translate.apply(o, r.concat([t]));
                        },
                        n
                      )),
                    n.interpolation && this.interpolator.reset();
                }
                var d = n.postProcess || this.options.postProcess,
                  f = "string" == typeof d ? [d] : d;
                return (
                  null != e &&
                    f &&
                    f.length &&
                    !1 !== n.applyPostProcessor &&
                    (e = Q.handle(
                      f,
                      e,
                      t,
                      this.options && this.options.postProcessPassResolved
                        ? te({ i18nResolved: r }, n)
                        : n,
                      this
                    )),
                  e
                );
              },
            },
            {
              key: "resolve",
              value: function (e) {
                var t,
                  n,
                  r,
                  a,
                  o,
                  i = this,
                  s =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {};
                return (
                  "string" == typeof e && (e = [e]),
                  e.forEach(function (e) {
                    if (!i.isValidLookup(t)) {
                      var l = i.extractFromKey(e, s),
                        u = l.key;
                      n = u;
                      var c = l.namespaces;
                      i.options.fallbackNS &&
                        (c = c.concat(i.options.fallbackNS));
                      var d = void 0 !== s.count && "string" != typeof s.count,
                        f =
                          d &&
                          !s.ordinal &&
                          0 === s.count &&
                          i.pluralResolver.shouldUseIntlApi(),
                        p =
                          void 0 !== s.context &&
                          ("string" == typeof s.context ||
                            "number" == typeof s.context) &&
                          "" !== s.context,
                        h = s.lngs
                          ? s.lngs
                          : i.languageUtils.toResolveHierarchy(
                              s.lng || i.language,
                              s.fallbackLng
                            );
                      c.forEach(function (e) {
                        i.isValidLookup(t) ||
                          ((o = e),
                          !re["".concat(h[0], "-").concat(e)] &&
                            i.utils &&
                            i.utils.hasLoadedNamespace &&
                            !i.utils.hasLoadedNamespace(o) &&
                            ((re["".concat(h[0], "-").concat(e)] = !0),
                            i.logger.warn(
                              'key "'
                                .concat(n, '" for languages "')
                                .concat(
                                  h.join(", "),
                                  '" won\'t get resolved as namespace "'
                                )
                                .concat(o, '" was not yet loaded'),
                              "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
                            )),
                          h.forEach(function (n) {
                            if (!i.isValidLookup(t)) {
                              a = n;
                              var o,
                                l = [u];
                              if (i.i18nFormat && i.i18nFormat.addLookupKeys)
                                i.i18nFormat.addLookupKeys(l, u, n, e, s);
                              else {
                                var c;
                                d &&
                                  (c = i.pluralResolver.getSuffix(
                                    n,
                                    s.count,
                                    s
                                  ));
                                var h = "".concat(
                                  i.options.pluralSeparator,
                                  "zero"
                                );
                                if (
                                  (d && (l.push(u + c), f && l.push(u + h)), p)
                                ) {
                                  var g = ""
                                    .concat(u)
                                    .concat(i.options.contextSeparator)
                                    .concat(s.context);
                                  l.push(g),
                                    d && (l.push(g + c), f && l.push(g + h));
                                }
                              }
                              for (; (o = l.pop()); )
                                i.isValidLookup(t) ||
                                  ((r = o), (t = i.getResource(n, e, o, s)));
                            }
                          }));
                      });
                    }
                  }),
                  { res: t, usedKey: n, exactUsedKey: r, usedLng: a, usedNS: o }
                );
              },
            },
            {
              key: "isValidLookup",
              value: function (e) {
                return !(
                  void 0 === e ||
                  (!this.options.returnNull && null === e) ||
                  (!this.options.returnEmptyString && "" === e)
                );
              },
            },
            {
              key: "getResource",
              value: function (e, t, n) {
                var r =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : {};
                return this.i18nFormat && this.i18nFormat.getResource
                  ? this.i18nFormat.getResource(e, t, n, r)
                  : this.resourceStore.getResource(e, t, n, r);
              },
            },
          ],
          [
            {
              key: "hasDefaultValue",
              value: function (e) {
                var t = "defaultValue";
                for (var n in e)
                  if (
                    Object.prototype.hasOwnProperty.call(e, n) &&
                    t === n.substring(0, t.length) &&
                    void 0 !== e[n]
                  )
                    return !0;
                return !1;
              },
            },
          ]
        ),
        n
      );
    })(I);
  function oe(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  }
  var ie = (function () {
      function e(t) {
        g(this, e),
          (this.options = t),
          (this.supportedLngs = this.options.supportedLngs || !1),
          (this.logger = j.create("languageUtils"));
      }
      return (
        y(e, [
          {
            key: "getScriptPartFromCode",
            value: function (e) {
              if (!e || e.indexOf("-") < 0) return null;
              var t = e.split("-");
              return 2 === t.length
                ? null
                : (t.pop(),
                  "x" === t[t.length - 1].toLowerCase()
                    ? null
                    : this.formatLanguageCode(t.join("-")));
            },
          },
          {
            key: "getLanguagePartFromCode",
            value: function (e) {
              if (!e || e.indexOf("-") < 0) return e;
              var t = e.split("-");
              return this.formatLanguageCode(t[0]);
            },
          },
          {
            key: "formatLanguageCode",
            value: function (e) {
              if ("string" == typeof e && e.indexOf("-") > -1) {
                var t = [
                    "hans",
                    "hant",
                    "latn",
                    "cyrl",
                    "cans",
                    "mong",
                    "arab",
                  ],
                  n = e.split("-");
                return (
                  this.options.lowerCaseLng
                    ? (n = n.map(function (e) {
                        return e.toLowerCase();
                      }))
                    : 2 === n.length
                    ? ((n[0] = n[0].toLowerCase()),
                      (n[1] = n[1].toUpperCase()),
                      t.indexOf(n[1].toLowerCase()) > -1 &&
                        (n[1] = oe(n[1].toLowerCase())))
                    : 3 === n.length &&
                      ((n[0] = n[0].toLowerCase()),
                      2 === n[1].length && (n[1] = n[1].toUpperCase()),
                      "sgn" !== n[0] &&
                        2 === n[2].length &&
                        (n[2] = n[2].toUpperCase()),
                      t.indexOf(n[1].toLowerCase()) > -1 &&
                        (n[1] = oe(n[1].toLowerCase())),
                      t.indexOf(n[2].toLowerCase()) > -1 &&
                        (n[2] = oe(n[2].toLowerCase()))),
                  n.join("-")
                );
              }
              return this.options.cleanCode || this.options.lowerCaseLng
                ? e.toLowerCase()
                : e;
            },
          },
          {
            key: "isSupportedCode",
            value: function (e) {
              return (
                ("languageOnly" === this.options.load ||
                  this.options.nonExplicitSupportedLngs) &&
                  (e = this.getLanguagePartFromCode(e)),
                !this.supportedLngs ||
                  !this.supportedLngs.length ||
                  this.supportedLngs.indexOf(e) > -1
              );
            },
          },
          {
            key: "getBestMatchFromCodes",
            value: function (e) {
              var t,
                n = this;
              return e
                ? (e.forEach(function (e) {
                    if (!t) {
                      var r = n.formatLanguageCode(e);
                      (n.options.supportedLngs && !n.isSupportedCode(r)) ||
                        (t = r);
                    }
                  }),
                  !t &&
                    this.options.supportedLngs &&
                    e.forEach(function (e) {
                      if (!t) {
                        var r = n.getLanguagePartFromCode(e);
                        if (n.isSupportedCode(r)) return (t = r);
                        t = n.options.supportedLngs.find(function (e) {
                          return e === r
                            ? e
                            : e.indexOf("-") < 0 && r.indexOf("-") < 0
                            ? void 0
                            : 0 === e.indexOf(r)
                            ? e
                            : void 0;
                        });
                      }
                    }),
                  t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]),
                  t)
                : null;
            },
          },
          {
            key: "getFallbackCodes",
            value: function (e, t) {
              if (!e) return [];
              if (
                ("function" == typeof e && (e = e(t)),
                "string" == typeof e && (e = [e]),
                "[object Array]" === Object.prototype.toString.apply(e))
              )
                return e;
              if (!t) return e.default || [];
              var n = e[t];
              return (
                n || (n = e[this.getScriptPartFromCode(t)]),
                n || (n = e[this.formatLanguageCode(t)]),
                n || (n = e[this.getLanguagePartFromCode(t)]),
                n || (n = e.default),
                n || []
              );
            },
          },
          {
            key: "toResolveHierarchy",
            value: function (e, t) {
              var n = this,
                r = this.getFallbackCodes(
                  t || this.options.fallbackLng || [],
                  e
                ),
                a = [],
                o = function (e) {
                  e &&
                    (n.isSupportedCode(e)
                      ? a.push(e)
                      : n.logger.warn(
                          "rejecting language code not found in supportedLngs: ".concat(
                            e
                          )
                        ));
                };
              return (
                "string" == typeof e && e.indexOf("-") > -1
                  ? ("languageOnly" !== this.options.load &&
                      o(this.formatLanguageCode(e)),
                    "languageOnly" !== this.options.load &&
                      "currentOnly" !== this.options.load &&
                      o(this.getScriptPartFromCode(e)),
                    "currentOnly" !== this.options.load &&
                      o(this.getLanguagePartFromCode(e)))
                  : "string" == typeof e && o(this.formatLanguageCode(e)),
                r.forEach(function (e) {
                  a.indexOf(e) < 0 && o(n.formatLanguageCode(e));
                }),
                a
              );
            },
          },
        ]),
        e
      );
    })(),
    se = [
      {
        lngs: [
          "ach",
          "ak",
          "am",
          "arn",
          "br",
          "fil",
          "gun",
          "ln",
          "mfe",
          "mg",
          "mi",
          "oc",
          "pt",
          "pt-BR",
          "tg",
          "tl",
          "ti",
          "tr",
          "uz",
          "wa",
        ],
        nr: [1, 2],
        fc: 1,
      },
      {
        lngs: [
          "af",
          "an",
          "ast",
          "az",
          "bg",
          "bn",
          "ca",
          "da",
          "de",
          "dev",
          "el",
          "en",
          "eo",
          "es",
          "et",
          "eu",
          "fi",
          "fo",
          "fur",
          "fy",
          "gl",
          "gu",
          "ha",
          "hi",
          "hu",
          "hy",
          "ia",
          "it",
          "kk",
          "kn",
          "ku",
          "lb",
          "mai",
          "ml",
          "mn",
          "mr",
          "nah",
          "nap",
          "nb",
          "ne",
          "nl",
          "nn",
          "no",
          "nso",
          "pa",
          "pap",
          "pms",
          "ps",
          "pt-PT",
          "rm",
          "sco",
          "se",
          "si",
          "so",
          "son",
          "sq",
          "sv",
          "sw",
          "ta",
          "te",
          "tk",
          "ur",
          "yo",
        ],
        nr: [1, 2],
        fc: 2,
      },
      {
        lngs: [
          "ay",
          "bo",
          "cgg",
          "fa",
          "ht",
          "id",
          "ja",
          "jbo",
          "ka",
          "km",
          "ko",
          "ky",
          "lo",
          "ms",
          "sah",
          "su",
          "th",
          "tt",
          "ug",
          "vi",
          "wo",
          "zh",
        ],
        nr: [1],
        fc: 3,
      },
      {
        lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
        nr: [1, 2, 5],
        fc: 4,
      },
      { lngs: ["ar"], nr: [0, 1, 2, 3, 11, 100], fc: 5 },
      { lngs: ["cs", "sk"], nr: [1, 2, 5], fc: 6 },
      { lngs: ["csb", "pl"], nr: [1, 2, 5], fc: 7 },
      { lngs: ["cy"], nr: [1, 2, 3, 8], fc: 8 },
      { lngs: ["fr"], nr: [1, 2], fc: 9 },
      { lngs: ["ga"], nr: [1, 2, 3, 7, 11], fc: 10 },
      { lngs: ["gd"], nr: [1, 2, 3, 20], fc: 11 },
      { lngs: ["is"], nr: [1, 2], fc: 12 },
      { lngs: ["jv"], nr: [0, 1], fc: 13 },
      { lngs: ["kw"], nr: [1, 2, 3, 4], fc: 14 },
      { lngs: ["lt"], nr: [1, 2, 10], fc: 15 },
      { lngs: ["lv"], nr: [1, 2, 0], fc: 16 },
      { lngs: ["mk"], nr: [1, 2], fc: 17 },
      { lngs: ["mnk"], nr: [0, 1, 2], fc: 18 },
      { lngs: ["mt"], nr: [1, 2, 11, 20], fc: 19 },
      { lngs: ["or"], nr: [2, 1], fc: 2 },
      { lngs: ["ro"], nr: [1, 2, 20], fc: 20 },
      { lngs: ["sl"], nr: [5, 1, 2, 3], fc: 21 },
      { lngs: ["he", "iw"], nr: [1, 2, 20, 21], fc: 22 },
    ],
    le = {
      1: function (e) {
        return Number(e > 1);
      },
      2: function (e) {
        return Number(1 != e);
      },
      3: function (e) {
        return 0;
      },
      4: function (e) {
        return Number(
          e % 10 == 1 && e % 100 != 11
            ? 0
            : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
            ? 1
            : 2
        );
      },
      5: function (e) {
        return Number(
          0 == e
            ? 0
            : 1 == e
            ? 1
            : 2 == e
            ? 2
            : e % 100 >= 3 && e % 100 <= 10
            ? 3
            : e % 100 >= 11
            ? 4
            : 5
        );
      },
      6: function (e) {
        return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2);
      },
      7: function (e) {
        return Number(
          1 == e
            ? 0
            : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
            ? 1
            : 2
        );
      },
      8: function (e) {
        return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3);
      },
      9: function (e) {
        return Number(e >= 2);
      },
      10: function (e) {
        return Number(1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4);
      },
      11: function (e) {
        return Number(
          1 == e || 11 == e
            ? 0
            : 2 == e || 12 == e
            ? 1
            : e > 2 && e < 20
            ? 2
            : 3
        );
      },
      12: function (e) {
        return Number(e % 10 != 1 || e % 100 == 11);
      },
      13: function (e) {
        return Number(0 !== e);
      },
      14: function (e) {
        return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3);
      },
      15: function (e) {
        return Number(
          e % 10 == 1 && e % 100 != 11
            ? 0
            : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20)
            ? 1
            : 2
        );
      },
      16: function (e) {
        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2);
      },
      17: function (e) {
        return Number(1 == e || (e % 10 == 1 && e % 100 != 11) ? 0 : 1);
      },
      18: function (e) {
        return Number(0 == e ? 0 : 1 == e ? 1 : 2);
      },
      19: function (e) {
        return Number(
          1 == e
            ? 0
            : 0 == e || (e % 100 > 1 && e % 100 < 11)
            ? 1
            : e % 100 > 10 && e % 100 < 20
            ? 2
            : 3
        );
      },
      20: function (e) {
        return Number(
          1 == e ? 0 : 0 == e || (e % 100 > 0 && e % 100 < 20) ? 1 : 2
        );
      },
      21: function (e) {
        return Number(
          e % 100 == 1
            ? 1
            : e % 100 == 2
            ? 2
            : e % 100 == 3 || e % 100 == 4
            ? 3
            : 0
        );
      },
      22: function (e) {
        return Number(
          1 == e ? 0 : 2 == e ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3
        );
      },
    },
    ue = ["v1", "v2", "v3"],
    ce = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 };
  function de() {
    var e = {};
    return (
      se.forEach(function (t) {
        t.lngs.forEach(function (n) {
          e[n] = { numbers: t.nr, plurals: le[t.fc] };
        });
      }),
      e
    );
  }
  var fe = (function () {
    function e(t) {
      var n =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      g(this, e),
        (this.languageUtils = t),
        (this.options = n),
        (this.logger = j.create("pluralResolver")),
        (this.options.compatibilityJSON &&
          "v4" !== this.options.compatibilityJSON) ||
          ("undefined" != typeof Intl && Intl.PluralRules) ||
          ((this.options.compatibilityJSON = "v3"),
          this.logger.error(
            "Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling."
          )),
        (this.rules = de());
    }
    return (
      y(e, [
        {
          key: "addRule",
          value: function (e, t) {
            this.rules[e] = t;
          },
        },
        {
          key: "getRule",
          value: function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            if (this.shouldUseIntlApi())
              try {
                return new Intl.PluralRules(e, {
                  type: t.ordinal ? "ordinal" : "cardinal",
                });
              } catch (n) {
                return;
              }
            return (
              this.rules[e] ||
              this.rules[this.languageUtils.getLanguagePartFromCode(e)]
            );
          },
        },
        {
          key: "needsPlural",
          value: function (e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              n = this.getRule(e, t);
            return this.shouldUseIntlApi()
              ? n && n.resolvedOptions().pluralCategories.length > 1
              : n && n.numbers.length > 1;
          },
        },
        {
          key: "getPluralFormsOfKey",
          value: function (e, t) {
            var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
            return this.getSuffixes(e, n).map(function (e) {
              return "".concat(t).concat(e);
            });
          },
        },
        {
          key: "getSuffixes",
          value: function (e) {
            var t = this,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              r = this.getRule(e, n);
            return r
              ? this.shouldUseIntlApi()
                ? r
                    .resolvedOptions()
                    .pluralCategories.sort(function (e, t) {
                      return ce[e] - ce[t];
                    })
                    .map(function (e) {
                      return "".concat(t.options.prepend).concat(e);
                    })
                : r.numbers.map(function (r) {
                    return t.getSuffix(e, r, n);
                  })
              : [];
          },
        },
        {
          key: "getSuffix",
          value: function (e, t) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              r = this.getRule(e, n);
            return r
              ? this.shouldUseIntlApi()
                ? "".concat(this.options.prepend).concat(r.select(t))
                : this.getSuffixRetroCompatible(r, t)
              : (this.logger.warn("no plural rule found for: ".concat(e)), "");
          },
        },
        {
          key: "getSuffixRetroCompatible",
          value: function (e, t) {
            var n = this,
              r = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t)),
              a = e.numbers[r];
            this.options.simplifyPluralSuffix &&
              2 === e.numbers.length &&
              1 === e.numbers[0] &&
              (2 === a ? (a = "plural") : 1 === a && (a = ""));
            var o = function () {
              return n.options.prepend && a.toString()
                ? n.options.prepend + a.toString()
                : a.toString();
            };
            return "v1" === this.options.compatibilityJSON
              ? 1 === a
                ? ""
                : "number" == typeof a
                ? "_plural_".concat(a.toString())
                : o()
              : "v2" === this.options.compatibilityJSON ||
                (this.options.simplifyPluralSuffix &&
                  2 === e.numbers.length &&
                  1 === e.numbers[0])
              ? o()
              : this.options.prepend && r.toString()
              ? this.options.prepend + r.toString()
              : r.toString();
          },
        },
        {
          key: "shouldUseIntlApi",
          value: function () {
            return !ue.includes(this.options.compatibilityJSON);
          },
        },
      ]),
      e
    );
  })();
  function pe(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function he(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? pe(Object(n), !0).forEach(function (t) {
            k(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : pe(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function ge(e, t, n) {
    var r =
        arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ".",
      a = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
      o = H(e, t, n);
    return (
      !o &&
        a &&
        "string" == typeof n &&
        void 0 === (o = q(e, n, r)) &&
        (o = q(t, n, r)),
      o
    );
  }
  var me = (function () {
    function e() {
      var t =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      g(this, e),
        (this.logger = j.create("interpolator")),
        (this.options = t),
        (this.format =
          (t.interpolation && t.interpolation.format) ||
          function (e) {
            return e;
          }),
        this.init(t);
    }
    return (
      y(e, [
        {
          key: "init",
          value: function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            e.interpolation || (e.interpolation = { escapeValue: !0 });
            var t = e.interpolation;
            (this.escape = void 0 !== t.escape ? t.escape : K),
              (this.escapeValue = void 0 === t.escapeValue || t.escapeValue),
              (this.useRawValueToEscape =
                void 0 !== t.useRawValueToEscape && t.useRawValueToEscape),
              (this.prefix = t.prefix ? B(t.prefix) : t.prefixEscaped || "{{"),
              (this.suffix = t.suffix ? B(t.suffix) : t.suffixEscaped || "}}"),
              (this.formatSeparator = t.formatSeparator
                ? t.formatSeparator
                : t.formatSeparator || ","),
              (this.unescapePrefix = t.unescapeSuffix
                ? ""
                : t.unescapePrefix || "-"),
              (this.unescapeSuffix = this.unescapePrefix
                ? ""
                : t.unescapeSuffix || ""),
              (this.nestingPrefix = t.nestingPrefix
                ? B(t.nestingPrefix)
                : t.nestingPrefixEscaped || B("$t(")),
              (this.nestingSuffix = t.nestingSuffix
                ? B(t.nestingSuffix)
                : t.nestingSuffixEscaped || B(")")),
              (this.nestingOptionsSeparator = t.nestingOptionsSeparator
                ? t.nestingOptionsSeparator
                : t.nestingOptionsSeparator || ","),
              (this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3),
              (this.alwaysFormat = void 0 !== t.alwaysFormat && t.alwaysFormat),
              this.resetRegExp();
          },
        },
        {
          key: "reset",
          value: function () {
            this.options && this.init(this.options);
          },
        },
        {
          key: "resetRegExp",
          value: function () {
            var e = "".concat(this.prefix, "(.+?)").concat(this.suffix);
            this.regexp = new RegExp(e, "g");
            var t = ""
              .concat(this.prefix)
              .concat(this.unescapePrefix, "(.+?)")
              .concat(this.unescapeSuffix)
              .concat(this.suffix);
            this.regexpUnescape = new RegExp(t, "g");
            var n = ""
              .concat(this.nestingPrefix, "(.+?)")
              .concat(this.nestingSuffix);
            this.nestingRegexp = new RegExp(n, "g");
          },
        },
        {
          key: "interpolate",
          value: function (e, t, n, r) {
            var a,
              o,
              i,
              s = this,
              l =
                (this.options &&
                  this.options.interpolation &&
                  this.options.interpolation.defaultVariables) ||
                {};
            function u(e) {
              return e.replace(/\$/g, "$$$$");
            }
            var c = function (e) {
              if (e.indexOf(s.formatSeparator) < 0) {
                var a = ge(
                  t,
                  l,
                  e,
                  s.options.keySeparator,
                  s.options.ignoreJSONStructure
                );
                return s.alwaysFormat
                  ? s.format(
                      a,
                      void 0,
                      n,
                      he(he(he({}, r), t), {}, { interpolationkey: e })
                    )
                  : a;
              }
              var o = e.split(s.formatSeparator),
                i = o.shift().trim(),
                u = o.join(s.formatSeparator).trim();
              return s.format(
                ge(
                  t,
                  l,
                  i,
                  s.options.keySeparator,
                  s.options.ignoreJSONStructure
                ),
                u,
                n,
                he(he(he({}, r), t), {}, { interpolationkey: i })
              );
            };
            this.resetRegExp();
            var d =
                (r && r.missingInterpolationHandler) ||
                this.options.missingInterpolationHandler,
              f =
                r &&
                r.interpolation &&
                void 0 !== r.interpolation.skipOnVariables
                  ? r.interpolation.skipOnVariables
                  : this.options.interpolation.skipOnVariables;
            return (
              [
                {
                  regex: this.regexpUnescape,
                  safeValue: function (e) {
                    return u(e);
                  },
                },
                {
                  regex: this.regexp,
                  safeValue: function (e) {
                    return s.escapeValue ? u(s.escape(e)) : u(e);
                  },
                },
              ].forEach(function (t) {
                for (i = 0; (a = t.regex.exec(e)); ) {
                  var n = a[1].trim();
                  if (void 0 === (o = c(n)))
                    if ("function" == typeof d) {
                      var l = d(e, a, r);
                      o = "string" == typeof l ? l : "";
                    } else if (r && Object.prototype.hasOwnProperty.call(r, n))
                      o = "";
                    else {
                      if (f) {
                        o = a[0];
                        continue;
                      }
                      s.logger.warn(
                        "missed to pass in variable "
                          .concat(n, " for interpolating ")
                          .concat(e)
                      ),
                        (o = "");
                    }
                  else
                    "string" == typeof o || s.useRawValueToEscape || (o = D(o));
                  var u = t.safeValue(o);
                  if (
                    ((e = e.replace(a[0], u)),
                    f
                      ? ((t.regex.lastIndex += o.length),
                        (t.regex.lastIndex -= a[0].length))
                      : (t.regex.lastIndex = 0),
                    ++i >= s.maxReplaces)
                  )
                    break;
                }
              }),
              e
            );
          },
        },
        {
          key: "nest",
          value: function (e, t) {
            var n,
              r,
              a,
              o = this,
              i =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {};
            function s(e, t) {
              var n = this.nestingOptionsSeparator;
              if (e.indexOf(n) < 0) return e;
              var r = e.split(new RegExp("".concat(n, "[ ]*{"))),
                o = "{".concat(r[1]);
              e = r[0];
              var i = (o = this.interpolate(o, a)).match(/'/g),
                s = o.match(/"/g);
              ((i && i.length % 2 == 0 && !s) || s.length % 2 != 0) &&
                (o = o.replace(/'/g, '"'));
              try {
                (a = JSON.parse(o)), t && (a = he(he({}, t), a));
              } catch (l) {
                return (
                  this.logger.warn(
                    "failed parsing options string in nesting for key ".concat(
                      e
                    ),
                    l
                  ),
                  "".concat(e).concat(n).concat(o)
                );
              }
              return delete a.defaultValue, e;
            }
            for (; (n = this.nestingRegexp.exec(e)); ) {
              var l = [];
              ((a =
                (a = he({}, i)).replace && "string" != typeof a.replace
                  ? a.replace
                  : a).applyPostProcessor = !1),
                delete a.defaultValue;
              var u = !1;
              if (
                -1 !== n[0].indexOf(this.formatSeparator) &&
                !/{.*}/.test(n[1])
              ) {
                var c = n[1].split(this.formatSeparator).map(function (e) {
                  return e.trim();
                });
                (n[1] = c.shift()), (l = c), (u = !0);
              }
              if (
                (r = t(s.call(this, n[1].trim(), a), a)) &&
                n[0] === e &&
                "string" != typeof r
              )
                return r;
              "string" != typeof r && (r = D(r)),
                r ||
                  (this.logger.warn(
                    "missed to resolve ".concat(n[1], " for nesting ").concat(e)
                  ),
                  (r = "")),
                u &&
                  (r = l.reduce(function (e, t) {
                    return o.format(
                      e,
                      t,
                      i.lng,
                      he(he({}, i), {}, { interpolationkey: n[1].trim() })
                    );
                  }, r.trim())),
                (e = e.replace(n[0], r)),
                (this.regexp.lastIndex = 0);
            }
            return e;
          },
        },
      ]),
      e
    );
  })();
  function ve(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function ye(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? ve(Object(n), !0).forEach(function (t) {
            k(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : ve(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function be(e) {
    var t = e.toLowerCase().trim(),
      n = {};
    if (e.indexOf("(") > -1) {
      var r = e.split("(");
      t = r[0].toLowerCase().trim();
      var a = r[1].substring(0, r[1].length - 1);
      if ("currency" === t && a.indexOf(":") < 0)
        n.currency || (n.currency = a.trim());
      else if ("relativetime" === t && a.indexOf(":") < 0)
        n.range || (n.range = a.trim());
      else {
        a.split(";").forEach(function (e) {
          if (e) {
            var t = N(e.split(":")),
              r = t[0],
              a = t
                .slice(1)
                .join(":")
                .trim()
                .replace(/^'+|'+$/g, "");
            n[r.trim()] || (n[r.trim()] = a),
              "false" === a && (n[r.trim()] = !1),
              "true" === a && (n[r.trim()] = !0),
              isNaN(a) || (n[r.trim()] = parseInt(a, 10));
          }
        });
      }
    }
    return { formatName: t, formatOptions: n };
  }
  function we(e) {
    var t = {};
    return function (n, r, a) {
      var o = r + JSON.stringify(a),
        i = t[o];
      return i || ((i = e(r, a)), (t[o] = i)), i(n);
    };
  }
  var _e = (function () {
    function e() {
      var t =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      g(this, e),
        (this.logger = j.create("formatter")),
        (this.options = t),
        (this.formats = {
          number: we(function (e, t) {
            var n = new Intl.NumberFormat(e, ye({}, t));
            return function (e) {
              return n.format(e);
            };
          }),
          currency: we(function (e, t) {
            var n = new Intl.NumberFormat(
              e,
              ye(ye({}, t), {}, { style: "currency" })
            );
            return function (e) {
              return n.format(e);
            };
          }),
          datetime: we(function (e, t) {
            var n = new Intl.DateTimeFormat(e, ye({}, t));
            return function (e) {
              return n.format(e);
            };
          }),
          relativetime: we(function (e, t) {
            var n = new Intl.RelativeTimeFormat(e, ye({}, t));
            return function (e) {
              return n.format(e, t.range || "day");
            };
          }),
          list: we(function (e, t) {
            var n = new Intl.ListFormat(e, ye({}, t));
            return function (e) {
              return n.format(e);
            };
          }),
        }),
        this.init(t);
    }
    return (
      y(e, [
        {
          key: "init",
          value: function (e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : { interpolation: {} },
              n = t.interpolation;
            this.formatSeparator = n.formatSeparator
              ? n.formatSeparator
              : n.formatSeparator || ",";
          },
        },
        {
          key: "add",
          value: function (e, t) {
            this.formats[e.toLowerCase().trim()] = t;
          },
        },
        {
          key: "addCached",
          value: function (e, t) {
            this.formats[e.toLowerCase().trim()] = we(t);
          },
        },
        {
          key: "format",
          value: function (e, t, n) {
            var r = this,
              a =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : {},
              o = t.split(this.formatSeparator),
              i = o.reduce(function (e, t) {
                var o = be(t),
                  i = o.formatName,
                  s = o.formatOptions;
                if (r.formats[i]) {
                  var l = e;
                  try {
                    var u =
                        (a &&
                          a.formatParams &&
                          a.formatParams[a.interpolationkey]) ||
                        {},
                      c = u.locale || u.lng || a.locale || a.lng || n;
                    l = r.formats[i](e, c, ye(ye(ye({}, s), a), u));
                  } catch (d) {
                    r.logger.warn(d);
                  }
                  return l;
                }
                return (
                  r.logger.warn("there was no format function for ".concat(i)),
                  e
                );
              }, e);
            return i;
          },
        },
      ]),
      e
    );
  })();
  function Se(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function Ee(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? Se(Object(n), !0).forEach(function (t) {
            k(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Se(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function ke(e) {
    var t = (function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch (e) {
        return !1;
      }
    })();
    return function () {
      var n,
        r = E(e);
      if (t) {
        var a = E(this).constructor;
        n = Reflect.construct(r, arguments, a);
      } else n = r.apply(this, arguments);
      return S(this, n);
    };
  }
  var Oe = (function (e) {
    _(n, e);
    var t = ke(n);
    function n(e, r, a) {
      var o,
        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      return (
        g(this, n),
        (o = t.call(this)),
        $ && I.call(b(o)),
        (o.backend = e),
        (o.store = r),
        (o.services = a),
        (o.languageUtils = a.languageUtils),
        (o.options = i),
        (o.logger = j.create("backendConnector")),
        (o.waitingReads = []),
        (o.maxParallelReads = i.maxParallelReads || 10),
        (o.readingCalls = 0),
        (o.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5),
        (o.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350),
        (o.state = {}),
        (o.queue = []),
        o.backend && o.backend.init && o.backend.init(a, i.backend, i),
        o
      );
    }
    return (
      y(n, [
        {
          key: "queueLoad",
          value: function (e, t, n, r) {
            var a = this,
              o = {},
              i = {},
              s = {},
              l = {};
            return (
              e.forEach(function (e) {
                var r = !0;
                t.forEach(function (t) {
                  var s = "".concat(e, "|").concat(t);
                  !n.reload && a.store.hasResourceBundle(e, t)
                    ? (a.state[s] = 2)
                    : a.state[s] < 0 ||
                      (1 === a.state[s]
                        ? void 0 === i[s] && (i[s] = !0)
                        : ((a.state[s] = 1),
                          (r = !1),
                          void 0 === i[s] && (i[s] = !0),
                          void 0 === o[s] && (o[s] = !0),
                          void 0 === l[t] && (l[t] = !0)));
                }),
                  r || (s[e] = !0);
              }),
              (Object.keys(o).length || Object.keys(i).length) &&
                this.queue.push({
                  pending: i,
                  pendingCount: Object.keys(i).length,
                  loaded: {},
                  errors: [],
                  callback: r,
                }),
              {
                toLoad: Object.keys(o),
                pending: Object.keys(i),
                toLoadLanguages: Object.keys(s),
                toLoadNamespaces: Object.keys(l),
              }
            );
          },
        },
        {
          key: "loaded",
          value: function (e, t, n) {
            var r = e.split("|"),
              a = r[0],
              o = r[1];
            t && this.emit("failedLoading", a, o, t),
              n && this.store.addResourceBundle(a, o, n),
              (this.state[e] = t ? -1 : 2);
            var i = {};
            this.queue.forEach(function (n) {
              var r, s, l, u, c;
              (r = n.loaded),
                (s = o),
                (l = M(r, [a], Object)),
                (u = l.obj),
                (c = l.k),
                (u[c] = u[c] || []),
                u[c].push(s),
                (function (e, t) {
                  void 0 !== e.pending[t] &&
                    (delete e.pending[t], e.pendingCount--);
                })(n, e),
                t && n.errors.push(t),
                0 !== n.pendingCount ||
                  n.done ||
                  (Object.keys(n.loaded).forEach(function (e) {
                    i[e] || (i[e] = {});
                    var t = n.loaded[e];
                    t.length &&
                      t.forEach(function (t) {
                        void 0 === i[e][t] && (i[e][t] = !0);
                      });
                  }),
                  (n.done = !0),
                  n.errors.length ? n.callback(n.errors) : n.callback());
            }),
              this.emit("loaded", i),
              (this.queue = this.queue.filter(function (e) {
                return !e.done;
              }));
          },
        },
        {
          key: "read",
          value: function (e, t, n) {
            var r = this,
              a =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : 0,
              o =
                arguments.length > 4 && void 0 !== arguments[4]
                  ? arguments[4]
                  : this.retryTimeout,
              i = arguments.length > 5 ? arguments[5] : void 0;
            if (!e.length) return i(null, {});
            if (this.readingCalls >= this.maxParallelReads)
              this.waitingReads.push({
                lng: e,
                ns: t,
                fcName: n,
                tried: a,
                wait: o,
                callback: i,
              });
            else {
              this.readingCalls++;
              var s = function (s, l) {
                  if ((r.readingCalls--, r.waitingReads.length > 0)) {
                    var u = r.waitingReads.shift();
                    r.read(u.lng, u.ns, u.fcName, u.tried, u.wait, u.callback);
                  }
                  s && l && a < r.maxRetries
                    ? setTimeout(function () {
                        r.read.call(r, e, t, n, a + 1, 2 * o, i);
                      }, o)
                    : i(s, l);
                },
                l = this.backend[n].bind(this.backend);
              if (2 !== l.length) return l(e, t, s);
              try {
                var u = l(e, t);
                u && "function" == typeof u.then
                  ? u
                      .then(function (e) {
                        return s(null, e);
                      })
                      .catch(s)
                  : s(null, u);
              } catch (c) {
                s(c);
              }
            }
          },
        },
        {
          key: "prepareLoading",
          value: function (e, t) {
            var n = this,
              r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              a = arguments.length > 3 ? arguments[3] : void 0;
            if (!this.backend)
              return (
                this.logger.warn(
                  "No backend was added via i18next.use. Will not load resources."
                ),
                a && a()
              );
            "string" == typeof e &&
              (e = this.languageUtils.toResolveHierarchy(e)),
              "string" == typeof t && (t = [t]);
            var o = this.queueLoad(e, t, r, a);
            if (!o.toLoad.length) return o.pending.length || a(), null;
            o.toLoad.forEach(function (e) {
              n.loadOne(e);
            });
          },
        },
        {
          key: "load",
          value: function (e, t, n) {
            this.prepareLoading(e, t, {}, n);
          },
        },
        {
          key: "reload",
          value: function (e, t, n) {
            this.prepareLoading(e, t, { reload: !0 }, n);
          },
        },
        {
          key: "loadOne",
          value: function (e) {
            var t = this,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "",
              r = e.split("|"),
              a = r[0],
              o = r[1];
            this.read(a, o, "read", void 0, void 0, function (r, i) {
              r &&
                t.logger.warn(
                  ""
                    .concat(n, "loading namespace ")
                    .concat(o, " for language ")
                    .concat(a, " failed"),
                  r
                ),
                !r &&
                  i &&
                  t.logger.log(
                    ""
                      .concat(n, "loaded namespace ")
                      .concat(o, " for language ")
                      .concat(a),
                    i
                  ),
                t.loaded(e, r, i);
            });
          },
        },
        {
          key: "saveMissing",
          value: function (e, t, n, r, a) {
            var o =
                arguments.length > 5 && void 0 !== arguments[5]
                  ? arguments[5]
                  : {},
              i =
                arguments.length > 6 && void 0 !== arguments[6]
                  ? arguments[6]
                  : function () {};
            if (
              this.services.utils &&
              this.services.utils.hasLoadedNamespace &&
              !this.services.utils.hasLoadedNamespace(t)
            )
              this.logger.warn(
                'did not save key "'
                  .concat(n, '" as the namespace "')
                  .concat(t, '" was not yet loaded'),
                "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
              );
            else if (null != n && "" !== n) {
              if (this.backend && this.backend.create) {
                var s = Ee(Ee({}, o), {}, { isUpdate: a }),
                  l = this.backend.create.bind(this.backend);
                if (l.length < 6)
                  try {
                    var u;
                    (u = 5 === l.length ? l(e, t, n, r, s) : l(e, t, n, r)) &&
                    "function" == typeof u.then
                      ? u
                          .then(function (e) {
                            return i(null, e);
                          })
                          .catch(i)
                      : i(null, u);
                  } catch (c) {
                    i(c);
                  }
                else l(e, t, n, r, i, s);
              }
              e && e[0] && this.store.addResource(e[0], t, n, r);
            }
          },
        },
      ]),
      n
    );
  })(I);
  function xe() {
    return {
      debug: !1,
      initImmediate: !0,
      ns: ["translation"],
      defaultNS: ["translation"],
      fallbackLng: ["dev"],
      fallbackNS: !1,
      supportedLngs: !1,
      nonExplicitSupportedLngs: !1,
      load: "all",
      preload: !1,
      simplifyPluralSuffix: !0,
      keySeparator: ".",
      nsSeparator: ":",
      pluralSeparator: "_",
      contextSeparator: "_",
      partialBundledLanguages: !1,
      saveMissing: !1,
      updateMissing: !1,
      saveMissingTo: "fallback",
      saveMissingPlurals: !0,
      missingKeyHandler: !1,
      missingInterpolationHandler: !1,
      postProcess: !1,
      postProcessPassResolved: !1,
      returnNull: !0,
      returnEmptyString: !0,
      returnObjects: !1,
      joinArrays: !1,
      returnedObjectHandler: !1,
      parseMissingKeyHandler: !1,
      appendNamespaceToMissingKey: !1,
      appendNamespaceToCIMode: !1,
      overloadTranslationOptionHandler: function (e) {
        var t = {};
        if (
          ("object" === h(e[1]) && (t = e[1]),
          "string" == typeof e[1] && (t.defaultValue = e[1]),
          "string" == typeof e[2] && (t.tDescription = e[2]),
          "object" === h(e[2]) || "object" === h(e[3]))
        ) {
          var n = e[3] || e[2];
          Object.keys(n).forEach(function (e) {
            t[e] = n[e];
          });
        }
        return t;
      },
      interpolation: {
        escapeValue: !0,
        format: function (e, t, n, r) {
          return e;
        },
        prefix: "{{",
        suffix: "}}",
        formatSeparator: ",",
        unescapePrefix: "-",
        nestingPrefix: "$t(",
        nestingSuffix: ")",
        nestingOptionsSeparator: ",",
        maxReplaces: 1e3,
        skipOnVariables: !0,
      },
    };
  }
  function Ce(e) {
    return (
      "string" == typeof e.ns && (e.ns = [e.ns]),
      "string" == typeof e.fallbackLng && (e.fallbackLng = [e.fallbackLng]),
      "string" == typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]),
      e.supportedLngs &&
        e.supportedLngs.indexOf("cimode") < 0 &&
        (e.supportedLngs = e.supportedLngs.concat(["cimode"])),
      e
    );
  }
  function Te(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function Ne(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? Te(Object(n), !0).forEach(function (t) {
            k(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Te(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function Re(e) {
    var t = (function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch (e) {
        return !1;
      }
    })();
    return function () {
      var n,
        r = E(e);
      if (t) {
        var a = E(this).constructor;
        n = Reflect.construct(r, arguments, a);
      } else n = r.apply(this, arguments);
      return S(this, n);
    };
  }
  function Le() {}
  function Pe(e) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(function (t) {
      "function" == typeof e[t] && (e[t] = e[t].bind(e));
    });
  }
  var je = (function (e) {
    _(n, e);
    var t = Re(n);
    function n() {
      var e,
        r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        a = arguments.length > 1 ? arguments[1] : void 0;
      if (
        (g(this, n),
        (e = t.call(this)),
        $ && I.call(b(e)),
        (e.options = Ce(r)),
        (e.services = {}),
        (e.logger = j),
        (e.modules = { external: [] }),
        Pe(b(e)),
        a && !e.isInitialized && !r.isClone)
      ) {
        if (!e.options.initImmediate) return e.init(r, a), S(e, b(e));
        setTimeout(function () {
          e.init(r, a);
        }, 0);
      }
      return e;
    }
    return (
      y(n, [
        {
          key: "init",
          value: function () {
            var e = this,
              t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              n = arguments.length > 1 ? arguments[1] : void 0;
            "function" == typeof t && ((n = t), (t = {})),
              !t.defaultNS &&
                !1 !== t.defaultNS &&
                t.ns &&
                ("string" == typeof t.ns
                  ? (t.defaultNS = t.ns)
                  : t.ns.indexOf("translation") < 0 && (t.defaultNS = t.ns[0]));
            var r = xe();
            function a(e) {
              return e ? ("function" == typeof e ? new e() : e) : null;
            }
            if (
              ((this.options = Ne(Ne(Ne({}, r), this.options), Ce(t))),
              "v1" !== this.options.compatibilityAPI &&
                (this.options.interpolation = Ne(
                  Ne({}, r.interpolation),
                  this.options.interpolation
                )),
              void 0 !== t.keySeparator &&
                (this.options.userDefinedKeySeparator = t.keySeparator),
              void 0 !== t.nsSeparator &&
                (this.options.userDefinedNsSeparator = t.nsSeparator),
              !this.options.isClone)
            ) {
              var o;
              this.modules.logger
                ? j.init(a(this.modules.logger), this.options)
                : j.init(null, this.options),
                this.modules.formatter
                  ? (o = this.modules.formatter)
                  : "undefined" != typeof Intl && (o = _e);
              var i = new ie(this.options);
              this.store = new Y(this.options.resources, this.options);
              var s = this.services;
              (s.logger = j),
                (s.resourceStore = this.store),
                (s.languageUtils = i),
                (s.pluralResolver = new fe(i, {
                  prepend: this.options.pluralSeparator,
                  compatibilityJSON: this.options.compatibilityJSON,
                  simplifyPluralSuffix: this.options.simplifyPluralSuffix,
                })),
                !o ||
                  (this.options.interpolation.format &&
                    this.options.interpolation.format !==
                      r.interpolation.format) ||
                  ((s.formatter = a(o)),
                  s.formatter.init(s, this.options),
                  (this.options.interpolation.format = s.formatter.format.bind(
                    s.formatter
                  ))),
                (s.interpolator = new me(this.options)),
                (s.utils = {
                  hasLoadedNamespace: this.hasLoadedNamespace.bind(this),
                }),
                (s.backendConnector = new Oe(
                  a(this.modules.backend),
                  s.resourceStore,
                  s,
                  this.options
                )),
                s.backendConnector.on("*", function (t) {
                  for (
                    var n = arguments.length,
                      r = new Array(n > 1 ? n - 1 : 0),
                      a = 1;
                    a < n;
                    a++
                  )
                    r[a - 1] = arguments[a];
                  e.emit.apply(e, [t].concat(r));
                }),
                this.modules.languageDetector &&
                  ((s.languageDetector = a(this.modules.languageDetector)),
                  s.languageDetector.init &&
                    s.languageDetector.init(
                      s,
                      this.options.detection,
                      this.options
                    )),
                this.modules.i18nFormat &&
                  ((s.i18nFormat = a(this.modules.i18nFormat)),
                  s.i18nFormat.init && s.i18nFormat.init(this)),
                (this.translator = new ae(this.services, this.options)),
                this.translator.on("*", function (t) {
                  for (
                    var n = arguments.length,
                      r = new Array(n > 1 ? n - 1 : 0),
                      a = 1;
                    a < n;
                    a++
                  )
                    r[a - 1] = arguments[a];
                  e.emit.apply(e, [t].concat(r));
                }),
                this.modules.external.forEach(function (t) {
                  t.init && t.init(e);
                });
            }
            if (
              ((this.format = this.options.interpolation.format),
              n || (n = Le),
              this.options.fallbackLng &&
                !this.services.languageDetector &&
                !this.options.lng)
            ) {
              var l = this.services.languageUtils.getFallbackCodes(
                this.options.fallbackLng
              );
              l.length > 0 && "dev" !== l[0] && (this.options.lng = l[0]);
            }
            this.services.languageDetector ||
              this.options.lng ||
              this.logger.warn(
                "init: no languageDetector is used and no lng is defined"
              );
            var u = [
              "getResource",
              "hasResourceBundle",
              "getResourceBundle",
              "getDataByLanguage",
            ];
            u.forEach(function (t) {
              e[t] = function () {
                var n;
                return (n = e.store)[t].apply(n, arguments);
              };
            });
            var c = [
              "addResource",
              "addResources",
              "addResourceBundle",
              "removeResourceBundle",
            ];
            c.forEach(function (t) {
              e[t] = function () {
                var n;
                return (n = e.store)[t].apply(n, arguments), e;
              };
            });
            var d = A(),
              f = function () {
                var t = function (t, r) {
                  e.isInitialized &&
                    !e.initializedStoreOnce &&
                    e.logger.warn(
                      "init: i18next is already initialized. You should call init just once!"
                    ),
                    (e.isInitialized = !0),
                    e.options.isClone || e.logger.log("initialized", e.options),
                    e.emit("initialized", e.options),
                    d.resolve(r),
                    n(t, r);
                };
                if (
                  e.languages &&
                  "v1" !== e.options.compatibilityAPI &&
                  !e.isInitialized
                )
                  return t(null, e.t.bind(e));
                e.changeLanguage(e.options.lng, t);
              };
            return (
              this.options.resources || !this.options.initImmediate
                ? f()
                : setTimeout(f, 0),
              d
            );
          },
        },
        {
          key: "loadResources",
          value: function (e) {
            var t = this,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : Le,
              r = n,
              a = "string" == typeof e ? e : this.language;
            if (
              ("function" == typeof e && (r = e),
              !this.options.resources || this.options.partialBundledLanguages)
            ) {
              if (a && "cimode" === a.toLowerCase()) return r();
              var o = [],
                i = function (e) {
                  e &&
                    t.services.languageUtils
                      .toResolveHierarchy(e)
                      .forEach(function (e) {
                        o.indexOf(e) < 0 && o.push(e);
                      });
                };
              if (a) i(a);
              else {
                var s = this.services.languageUtils.getFallbackCodes(
                  this.options.fallbackLng
                );
                s.forEach(function (e) {
                  return i(e);
                });
              }
              this.options.preload &&
                this.options.preload.forEach(function (e) {
                  return i(e);
                }),
                this.services.backendConnector.load(
                  o,
                  this.options.ns,
                  function (e) {
                    e ||
                      t.resolvedLanguage ||
                      !t.language ||
                      t.setResolvedLanguage(t.language),
                      r(e);
                  }
                );
            } else r(null);
          },
        },
        {
          key: "reloadResources",
          value: function (e, t, n) {
            var r = A();
            return (
              e || (e = this.languages),
              t || (t = this.options.ns),
              n || (n = Le),
              this.services.backendConnector.reload(e, t, function (e) {
                r.resolve(), n(e);
              }),
              r
            );
          },
        },
        {
          key: "use",
          value: function (e) {
            if (!e)
              throw new Error(
                "You are passing an undefined module! Please check the object you are passing to i18next.use()"
              );
            if (!e.type)
              throw new Error(
                "You are passing a wrong module! Please check the object you are passing to i18next.use()"
              );
            return (
              "backend" === e.type && (this.modules.backend = e),
              ("logger" === e.type || (e.log && e.warn && e.error)) &&
                (this.modules.logger = e),
              "languageDetector" === e.type &&
                (this.modules.languageDetector = e),
              "i18nFormat" === e.type && (this.modules.i18nFormat = e),
              "postProcessor" === e.type && Q.addPostProcessor(e),
              "formatter" === e.type && (this.modules.formatter = e),
              "3rdParty" === e.type && this.modules.external.push(e),
              this
            );
          },
        },
        {
          key: "setResolvedLanguage",
          value: function (e) {
            if (e && this.languages && !(["cimode", "dev"].indexOf(e) > -1))
              for (var t = 0; t < this.languages.length; t++) {
                var n = this.languages[t];
                if (
                  !(["cimode", "dev"].indexOf(n) > -1) &&
                  this.store.hasLanguageSomeTranslations(n)
                ) {
                  this.resolvedLanguage = n;
                  break;
                }
              }
          },
        },
        {
          key: "changeLanguage",
          value: function (e, t) {
            var n = this;
            this.isLanguageChangingTo = e;
            var r = A();
            this.emit("languageChanging", e);
            var a = function (e) {
                (n.language = e),
                  (n.languages =
                    n.services.languageUtils.toResolveHierarchy(e)),
                  (n.resolvedLanguage = void 0),
                  n.setResolvedLanguage(e);
              },
              o = function (o) {
                e || o || !n.services.languageDetector || (o = []);
                var i =
                  "string" == typeof o
                    ? o
                    : n.services.languageUtils.getBestMatchFromCodes(o);
                i &&
                  (n.language || a(i),
                  n.translator.language || n.translator.changeLanguage(i),
                  n.services.languageDetector &&
                    n.services.languageDetector.cacheUserLanguage &&
                    n.services.languageDetector.cacheUserLanguage(i)),
                  n.loadResources(i, function (e) {
                    !(function (e, o) {
                      o
                        ? (a(o),
                          n.translator.changeLanguage(o),
                          (n.isLanguageChangingTo = void 0),
                          n.emit("languageChanged", o),
                          n.logger.log("languageChanged", o))
                        : (n.isLanguageChangingTo = void 0),
                        r.resolve(function () {
                          return n.t.apply(n, arguments);
                        }),
                        t &&
                          t(e, function () {
                            return n.t.apply(n, arguments);
                          });
                    })(e, i);
                  });
              };
            return (
              e ||
              !this.services.languageDetector ||
              this.services.languageDetector.async
                ? !e &&
                  this.services.languageDetector &&
                  this.services.languageDetector.async
                  ? 0 === this.services.languageDetector.detect.length
                    ? this.services.languageDetector.detect().then(o)
                    : this.services.languageDetector.detect(o)
                  : o(e)
                : o(this.services.languageDetector.detect()),
              r
            );
          },
        },
        {
          key: "getFixedT",
          value: function (e, t, n) {
            var r = this,
              a = function e(t, a) {
                var o;
                if ("object" !== h(a)) {
                  for (
                    var i = arguments.length,
                      s = new Array(i > 2 ? i - 2 : 0),
                      l = 2;
                    l < i;
                    l++
                  )
                    s[l - 2] = arguments[l];
                  o = r.options.overloadTranslationOptionHandler(
                    [t, a].concat(s)
                  );
                } else o = Ne({}, a);
                (o.lng = o.lng || e.lng),
                  (o.lngs = o.lngs || e.lngs),
                  (o.ns = o.ns || e.ns),
                  (o.keyPrefix = o.keyPrefix || n || e.keyPrefix);
                var u,
                  c = r.options.keySeparator || ".";
                return (
                  (u =
                    o.keyPrefix && Array.isArray(t)
                      ? t.map(function (e) {
                          return "".concat(o.keyPrefix).concat(c).concat(e);
                        })
                      : o.keyPrefix
                      ? "".concat(o.keyPrefix).concat(c).concat(t)
                      : t),
                  r.t(u, o)
                );
              };
            return (
              "string" == typeof e ? (a.lng = e) : (a.lngs = e),
              (a.ns = t),
              (a.keyPrefix = n),
              a
            );
          },
        },
        {
          key: "t",
          value: function () {
            var e;
            return (
              this.translator &&
              (e = this.translator).translate.apply(e, arguments)
            );
          },
        },
        {
          key: "exists",
          value: function () {
            var e;
            return (
              this.translator &&
              (e = this.translator).exists.apply(e, arguments)
            );
          },
        },
        {
          key: "setDefaultNamespace",
          value: function (e) {
            this.options.defaultNS = e;
          },
        },
        {
          key: "hasLoadedNamespace",
          value: function (e) {
            var t = this,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
            if (!this.isInitialized)
              return (
                this.logger.warn(
                  "hasLoadedNamespace: i18next was not initialized",
                  this.languages
                ),
                !1
              );
            if (!this.languages || !this.languages.length)
              return (
                this.logger.warn(
                  "hasLoadedNamespace: i18n.languages were undefined or empty",
                  this.languages
                ),
                !1
              );
            var r = n.lng || this.resolvedLanguage || this.languages[0],
              a = !!this.options && this.options.fallbackLng,
              o = this.languages[this.languages.length - 1];
            if ("cimode" === r.toLowerCase()) return !0;
            var i = function (e, n) {
              var r =
                t.services.backendConnector.state["".concat(e, "|").concat(n)];
              return -1 === r || 2 === r;
            };
            if (n.precheck) {
              var s = n.precheck(this, i);
              if (void 0 !== s) return s;
            }
            return (
              !!this.hasResourceBundle(r, e) ||
              !(
                this.services.backendConnector.backend &&
                (!this.options.resources ||
                  this.options.partialBundledLanguages)
              ) ||
              !(!i(r, e) || (a && !i(o, e)))
            );
          },
        },
        {
          key: "loadNamespaces",
          value: function (e, t) {
            var n = this,
              r = A();
            return this.options.ns
              ? ("string" == typeof e && (e = [e]),
                e.forEach(function (e) {
                  n.options.ns.indexOf(e) < 0 && n.options.ns.push(e);
                }),
                this.loadResources(function (e) {
                  r.resolve(), t && t(e);
                }),
                r)
              : (t && t(), Promise.resolve());
          },
        },
        {
          key: "loadLanguages",
          value: function (e, t) {
            var n = A();
            "string" == typeof e && (e = [e]);
            var r = this.options.preload || [],
              a = e.filter(function (e) {
                return r.indexOf(e) < 0;
              });
            return a.length
              ? ((this.options.preload = r.concat(a)),
                this.loadResources(function (e) {
                  n.resolve(), t && t(e);
                }),
                n)
              : (t && t(), Promise.resolve());
          },
        },
        {
          key: "dir",
          value: function (e) {
            if (
              (e ||
                (e =
                  this.resolvedLanguage ||
                  (this.languages && this.languages.length > 0
                    ? this.languages[0]
                    : this.language)),
              !e)
            )
              return "rtl";
            var t =
              (this.services && this.services.languageUtils) || new ie(xe());
            return [
              "ar",
              "shu",
              "sqr",
              "ssh",
              "xaa",
              "yhd",
              "yud",
              "aao",
              "abh",
              "abv",
              "acm",
              "acq",
              "acw",
              "acx",
              "acy",
              "adf",
              "ads",
              "aeb",
              "aec",
              "afb",
              "ajp",
              "apc",
              "apd",
              "arb",
              "arq",
              "ars",
              "ary",
              "arz",
              "auz",
              "avl",
              "ayh",
              "ayl",
              "ayn",
              "ayp",
              "bbz",
              "pga",
              "he",
              "iw",
              "ps",
              "pbt",
              "pbu",
              "pst",
              "prp",
              "prd",
              "ug",
              "ur",
              "ydd",
              "yds",
              "yih",
              "ji",
              "yi",
              "hbo",
              "men",
              "xmn",
              "fa",
              "jpr",
              "peo",
              "pes",
              "prs",
              "dv",
              "sam",
              "ckb",
            ].indexOf(t.getLanguagePartFromCode(e)) > -1 ||
              e.toLowerCase().indexOf("-arab") > 1
              ? "rtl"
              : "ltr";
          },
        },
        {
          key: "cloneInstance",
          value: function () {
            var e = this,
              t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : Le,
              a = Ne(Ne(Ne({}, this.options), t), { isClone: !0 }),
              o = new n(a);
            (void 0 === t.debug && void 0 === t.prefix) ||
              (o.logger = o.logger.clone(t));
            var i = ["store", "services", "language"];
            return (
              i.forEach(function (t) {
                o[t] = e[t];
              }),
              (o.services = Ne({}, this.services)),
              (o.services.utils = {
                hasLoadedNamespace: o.hasLoadedNamespace.bind(o),
              }),
              (o.translator = new ae(o.services, o.options)),
              o.translator.on("*", function (e) {
                for (
                  var t = arguments.length,
                    n = new Array(t > 1 ? t - 1 : 0),
                    r = 1;
                  r < t;
                  r++
                )
                  n[r - 1] = arguments[r];
                o.emit.apply(o, [e].concat(n));
              }),
              o.init(a, r),
              (o.translator.options = o.options),
              (o.translator.backendConnector.services.utils = {
                hasLoadedNamespace: o.hasLoadedNamespace.bind(o),
              }),
              o
            );
          },
        },
        {
          key: "toJSON",
          value: function () {
            return {
              options: this.options,
              store: this.store,
              language: this.language,
              languages: this.languages,
              resolvedLanguage: this.resolvedLanguage,
            };
          },
        },
      ]),
      n
    );
  })(I);
  k(je, "createInstance", function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = arguments.length > 1 ? arguments[1] : void 0;
    return new je(e, t);
  });
  var Ie = je.createInstance();
  (Ie.createInstance = je.createInstance),
    Ie.createInstance,
    Ie.dir,
    Ie.init,
    Ie.loadResources,
    Ie.reloadResources,
    Ie.use,
    Ie.changeLanguage,
    Ie.getFixedT,
    Ie.t,
    Ie.exists,
    Ie.setDefaultNamespace,
    Ie.hasLoadedNamespace,
    Ie.loadNamespaces,
    Ie.loadLanguages;
  var Ae = [],
    De = Ae.forEach,
    ze = Ae.slice;
  function Me(e) {
    return (
      De.call(ze.call(arguments, 1), function (t) {
        if (t) for (var n in t) void 0 === e[n] && (e[n] = t[n]);
      }),
      e
    );
  }
  var Ue = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,
    Fe = function (e, t, n) {
      var r = n || {};
      r.path = r.path || "/";
      var a = encodeURIComponent(t),
        o = "".concat(e, "=").concat(a);
      if (r.maxAge > 0) {
        var i = r.maxAge - 0;
        if (Number.isNaN(i)) throw new Error("maxAge should be a Number");
        o += "; Max-Age=".concat(Math.floor(i));
      }
      if (r.domain) {
        if (!Ue.test(r.domain)) throw new TypeError("option domain is invalid");
        o += "; Domain=".concat(r.domain);
      }
      if (r.path) {
        if (!Ue.test(r.path)) throw new TypeError("option path is invalid");
        o += "; Path=".concat(r.path);
      }
      if (r.expires) {
        if ("function" != typeof r.expires.toUTCString)
          throw new TypeError("option expires is invalid");
        o += "; Expires=".concat(r.expires.toUTCString());
      }
      if (
        (r.httpOnly && (o += "; HttpOnly"),
        r.secure && (o += "; Secure"),
        r.sameSite)
      )
        switch (
          "string" == typeof r.sameSite ? r.sameSite.toLowerCase() : r.sameSite
        ) {
          case !0:
            o += "; SameSite=Strict";
            break;
          case "lax":
            o += "; SameSite=Lax";
            break;
          case "strict":
            o += "; SameSite=Strict";
            break;
          case "none":
            o += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      return o;
    },
    He = function (e, t, n, r) {
      var a =
        arguments.length > 4 && void 0 !== arguments[4]
          ? arguments[4]
          : { path: "/", sameSite: "strict" };
      n &&
        ((a.expires = new Date()),
        a.expires.setTime(a.expires.getTime() + 60 * n * 1e3)),
        r && (a.domain = r),
        (document.cookie = Fe(e, encodeURIComponent(t), a));
    },
    Ve = function (e) {
      for (
        var t = "".concat(e, "="), n = document.cookie.split(";"), r = 0;
        r < n.length;
        r++
      ) {
        for (var a = n[r]; " " === a.charAt(0); ) a = a.substring(1, a.length);
        if (0 === a.indexOf(t)) return a.substring(t.length, a.length);
      }
      return null;
    },
    Be = {
      name: "cookie",
      lookup: function (e) {
        var t;
        if (e.lookupCookie && "undefined" != typeof document) {
          var n = Ve(e.lookupCookie);
          n && (t = n);
        }
        return t;
      },
      cacheUserLanguage: function (e, t) {
        t.lookupCookie &&
          "undefined" != typeof document &&
          He(
            t.lookupCookie,
            e,
            t.cookieMinutes,
            t.cookieDomain,
            t.cookieOptions
          );
      },
    },
    We = {
      name: "querystring",
      lookup: function (e) {
        var t;
        if ("undefined" != typeof window) {
          var n = window.location.search;
          !window.location.search &&
            window.location.hash &&
            window.location.hash.indexOf("?") > -1 &&
            (n = window.location.hash.substring(
              window.location.hash.indexOf("?")
            ));
          for (var r = n.substring(1).split("&"), a = 0; a < r.length; a++) {
            var o = r[a].indexOf("=");
            if (o > 0)
              r[a].substring(0, o) === e.lookupQuerystring &&
                (t = r[a].substring(o + 1));
          }
        }
        return t;
      },
    },
    Ke = null,
    $e = function () {
      if (null !== Ke) return Ke;
      try {
        Ke = "undefined" !== window && null !== window.localStorage;
        var e = "i18next.translate.boo";
        window.localStorage.setItem(e, "foo"),
          window.localStorage.removeItem(e);
      } catch (t) {
        Ke = !1;
      }
      return Ke;
    },
    Ge = {
      name: "localStorage",
      lookup: function (e) {
        var t;
        if (e.lookupLocalStorage && $e()) {
          var n = window.localStorage.getItem(e.lookupLocalStorage);
          n && (t = n);
        }
        return t;
      },
      cacheUserLanguage: function (e, t) {
        t.lookupLocalStorage &&
          $e() &&
          window.localStorage.setItem(t.lookupLocalStorage, e);
      },
    },
    qe = null,
    Xe = function () {
      if (null !== qe) return qe;
      try {
        qe = "undefined" !== window && null !== window.sessionStorage;
        var e = "i18next.translate.boo";
        window.sessionStorage.setItem(e, "foo"),
          window.sessionStorage.removeItem(e);
      } catch (t) {
        qe = !1;
      }
      return qe;
    },
    Je = {
      name: "sessionStorage",
      lookup: function (e) {
        var t;
        if (e.lookupSessionStorage && Xe()) {
          var n = window.sessionStorage.getItem(e.lookupSessionStorage);
          n && (t = n);
        }
        return t;
      },
      cacheUserLanguage: function (e, t) {
        t.lookupSessionStorage &&
          Xe() &&
          window.sessionStorage.setItem(t.lookupSessionStorage, e);
      },
    },
    Ze = {
      name: "navigator",
      lookup: function (e) {
        var t = [];
        if ("undefined" != typeof navigator) {
          if (navigator.languages)
            for (var n = 0; n < navigator.languages.length; n++)
              t.push(navigator.languages[n]);
          navigator.userLanguage && t.push(navigator.userLanguage),
            navigator.language && t.push(navigator.language);
        }
        return t.length > 0 ? t : void 0;
      },
    },
    Ye = {
      name: "htmlTag",
      lookup: function (e) {
        var t,
          n =
            e.htmlTag ||
            ("undefined" != typeof document ? document.documentElement : null);
        return (
          n &&
            "function" == typeof n.getAttribute &&
            (t = n.getAttribute("lang")),
          t
        );
      },
    },
    Qe = {
      name: "path",
      lookup: function (e) {
        var t;
        if ("undefined" != typeof window) {
          var n = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
          if (n instanceof Array)
            if ("number" == typeof e.lookupFromPathIndex) {
              if ("string" != typeof n[e.lookupFromPathIndex]) return;
              t = n[e.lookupFromPathIndex].replace("/", "");
            } else t = n[0].replace("/", "");
        }
        return t;
      },
    },
    et = {
      name: "subdomain",
      lookup: function (e) {
        var t =
            "number" == typeof e.lookupFromSubdomainIndex
              ? e.lookupFromSubdomainIndex + 1
              : 1,
          n =
            "undefined" != typeof window &&
            window.location &&
            window.location.hostname &&
            window.location.hostname.match(
              /^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i
            );
        if (n) return n[t];
      },
    };
  var tt = (function () {
    function e(t) {
      var n =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      g(this, e),
        (this.type = "languageDetector"),
        (this.detectors = {}),
        this.init(t, n);
    }
    return (
      y(e, [
        {
          key: "init",
          value: function (e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {};
            (this.services = e),
              (this.options = Me(t, this.options || {}, {
                order: [
                  "querystring",
                  "cookie",
                  "localStorage",
                  "sessionStorage",
                  "navigator",
                  "htmlTag",
                ],
                lookupQuerystring: "lng",
                lookupCookie: "i18next",
                lookupLocalStorage: "i18nextLng",
                lookupSessionStorage: "i18nextLng",
                caches: ["localStorage"],
                excludeCacheFor: ["cimode"],
              })),
              this.options.lookupFromUrlIndex &&
                (this.options.lookupFromPathIndex =
                  this.options.lookupFromUrlIndex),
              (this.i18nOptions = n),
              this.addDetector(Be),
              this.addDetector(We),
              this.addDetector(Ge),
              this.addDetector(Je),
              this.addDetector(Ze),
              this.addDetector(Ye),
              this.addDetector(Qe),
              this.addDetector(et);
          },
        },
        {
          key: "addDetector",
          value: function (e) {
            this.detectors[e.name] = e;
          },
        },
        {
          key: "detect",
          value: function (e) {
            var t = this;
            e || (e = this.options.order);
            var n = [];
            return (
              e.forEach(function (e) {
                if (t.detectors[e]) {
                  var r = t.detectors[e].lookup(t.options);
                  r && "string" == typeof r && (r = [r]),
                    r && (n = n.concat(r));
                }
              }),
              this.services.languageUtils.getBestMatchFromCodes
                ? n
                : n.length > 0
                ? n[0]
                : null
            );
          },
        },
        {
          key: "cacheUserLanguage",
          value: function (e, t) {
            var n = this;
            t || (t = this.options.caches),
              t &&
                ((this.options.excludeCacheFor &&
                  this.options.excludeCacheFor.indexOf(e) > -1) ||
                  t.forEach(function (t) {
                    n.detectors[t] &&
                      n.detectors[t].cacheUserLanguage(e, n.options);
                  }));
          },
        },
      ]),
      e
    );
  })();
  function nt(e, t) {
    if (null == e) return {};
    var n = {};
    for (var r in e)
      if ({}.hasOwnProperty.call(e, r)) {
        if (t.includes(r)) continue;
        n[r] = e[r];
      }
    return n;
  }
  function rt(e, t) {
    if (null == e) return {};
    var n,
      r,
      a = nt(e, t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (r = 0; r < o.length; r++)
        (n = o[r]),
          t.includes(n) ||
            ({}.propertyIsEnumerable.call(e, n) && (a[n] = e[n]));
    }
    return a;
  }
  function at(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  tt.type = "languageDetector";
  var ot = { exports: {} },
    it = {},
    st = Symbol.for("react.element"),
    lt = Symbol.for("react.portal"),
    ut = Symbol.for("react.fragment"),
    ct = Symbol.for("react.strict_mode"),
    dt = Symbol.for("react.profiler"),
    ft = Symbol.for("react.provider"),
    pt = Symbol.for("react.context"),
    ht = Symbol.for("react.forward_ref"),
    gt = Symbol.for("react.suspense"),
    mt = Symbol.for("react.memo"),
    vt = Symbol.for("react.lazy"),
    yt = Symbol.iterator;
  var bt = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    wt = Object.assign,
    _t = {};
  function St(e, t, n) {
    (this.props = e),
      (this.context = t),
      (this.refs = _t),
      (this.updater = n || bt);
  }
  function Et() {}
  function kt(e, t, n) {
    (this.props = e),
      (this.context = t),
      (this.refs = _t),
      (this.updater = n || bt);
  }
  (St.prototype.isReactComponent = {}),
    (St.prototype.setState = function (e, t) {
      if ("object" != typeof e && "function" != typeof e && null != e)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, e, t, "setState");
    }),
    (St.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    }),
    (Et.prototype = St.prototype);
  var Ot = (kt.prototype = new Et());
  (Ot.constructor = kt), wt(Ot, St.prototype), (Ot.isPureReactComponent = !0);
  var xt = Array.isArray,
    Ct = Object.prototype.hasOwnProperty,
    Tt = { current: null },
    Nt = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Rt(e, t, n) {
    var r,
      a = {},
      o = null,
      i = null;
    if (null != t)
      for (r in (void 0 !== t.ref && (i = t.ref),
      void 0 !== t.key && (o = "" + t.key),
      t))
        Ct.call(t, r) && !Nt.hasOwnProperty(r) && (a[r] = t[r]);
    var s = arguments.length - 2;
    if (1 === s) a.children = n;
    else if (1 < s) {
      for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
      a.children = l;
    }
    if (e && e.defaultProps)
      for (r in (s = e.defaultProps)) void 0 === a[r] && (a[r] = s[r]);
    return {
      $$typeof: st,
      type: e,
      key: o,
      ref: i,
      props: a,
      _owner: Tt.current,
    };
  }
  function Lt(e) {
    return "object" == typeof e && null !== e && e.$$typeof === st;
  }
  var Pt = /\/+/g;
  function jt(e, t) {
    return "object" == typeof e && null !== e && null != e.key
      ? (function (e) {
          var t = { "=": "=0", ":": "=2" };
          return (
            "$" +
            e.replace(/[=:]/g, function (e) {
              return t[e];
            })
          );
        })("" + e.key)
      : t.toString(36);
  }
  function It(e, t, n, r, a) {
    var o = typeof e;
    ("undefined" !== o && "boolean" !== o) || (e = null);
    var i = !1;
    if (null === e) i = !0;
    else
      switch (o) {
        case "string":
        case "number":
          i = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case st:
            case lt:
              i = !0;
          }
      }
    if (i)
      return (
        (a = a((i = e))),
        (e = "" === r ? "." + jt(i, 0) : r),
        xt(a)
          ? ((n = ""),
            null != e && (n = e.replace(Pt, "$&/") + "/"),
            It(a, t, n, "", function (e) {
              return e;
            }))
          : null != a &&
            (Lt(a) &&
              (a = (function (e, t) {
                return {
                  $$typeof: st,
                  type: e.type,
                  key: t,
                  ref: e.ref,
                  props: e.props,
                  _owner: e._owner,
                };
              })(
                a,
                n +
                  (!a.key || (i && i.key === a.key)
                    ? ""
                    : ("" + a.key).replace(Pt, "$&/") + "/") +
                  e
              )),
            t.push(a)),
        1
      );
    if (((i = 0), (r = "" === r ? "." : r + ":"), xt(e)))
      for (var s = 0; s < e.length; s++) {
        var l = r + jt((o = e[s]), s);
        i += It(o, t, n, l, a);
      }
    else if (
      "function" ==
      typeof (l = (function (e) {
        return null === e || "object" != typeof e
          ? null
          : "function" == typeof (e = (yt && e[yt]) || e["@@iterator"])
          ? e
          : null;
      })(e))
    )
      for (e = l.call(e), s = 0; !(o = e.next()).done; )
        i += It((o = o.value), t, n, (l = r + jt(o, s++)), a);
    else if ("object" === o)
      throw (
        ((t = String(e)),
        Error(
          "Objects are not valid as a React child (found: " +
            ("[object Object]" === t
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    return i;
  }
  function At(e, t, n) {
    if (null == e) return e;
    var r = [],
      a = 0;
    return (
      It(e, r, "", "", function (e) {
        return t.call(n, e, a++);
      }),
      r
    );
  }
  function Dt(e) {
    if (-1 === e._status) {
      var t = e._result;
      (t = t()).then(
        function (t) {
          (0 !== e._status && -1 !== e._status) ||
            ((e._status = 1), (e._result = t));
        },
        function (t) {
          (0 !== e._status && -1 !== e._status) ||
            ((e._status = 2), (e._result = t));
        }
      ),
        -1 === e._status && ((e._status = 0), (e._result = t));
    }
    if (1 === e._status) return e._result.default;
    throw e._result;
  }
  var zt = { current: null },
    Mt = { transition: null },
    Ut = {
      ReactCurrentDispatcher: zt,
      ReactCurrentBatchConfig: Mt,
      ReactCurrentOwner: Tt,
    };
  (it.Children = {
    map: At,
    forEach: function (e, t, n) {
      At(
        e,
        function () {
          t.apply(this, arguments);
        },
        n
      );
    },
    count: function (e) {
      var t = 0;
      return (
        At(e, function () {
          t++;
        }),
        t
      );
    },
    toArray: function (e) {
      return (
        At(e, function (e) {
          return e;
        }) || []
      );
    },
    only: function (e) {
      if (!Lt(e))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return e;
    },
  }),
    (it.Component = St),
    (it.Fragment = ut),
    (it.Profiler = dt),
    (it.PureComponent = kt),
    (it.StrictMode = ct),
    (it.Suspense = gt),
    (it.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ut),
    (it.cloneElement = function (e, t, n) {
      if (null == e)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            e +
            "."
        );
      var r = wt({}, e.props),
        a = e.key,
        o = e.ref,
        i = e._owner;
      if (null != t) {
        if (
          (void 0 !== t.ref && ((o = t.ref), (i = Tt.current)),
          void 0 !== t.key && (a = "" + t.key),
          e.type && e.type.defaultProps)
        )
          var s = e.type.defaultProps;
        for (l in t)
          Ct.call(t, l) &&
            !Nt.hasOwnProperty(l) &&
            (r[l] = void 0 === t[l] && void 0 !== s ? s[l] : t[l]);
      }
      var l = arguments.length - 2;
      if (1 === l) r.children = n;
      else if (1 < l) {
        s = Array(l);
        for (var u = 0; u < l; u++) s[u] = arguments[u + 2];
        r.children = s;
      }
      return {
        $$typeof: st,
        type: e.type,
        key: a,
        ref: o,
        props: r,
        _owner: i,
      };
    }),
    (it.createContext = function (e) {
      return (
        ((e = {
          $$typeof: pt,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }).Provider = { $$typeof: ft, _context: e }),
        (e.Consumer = e)
      );
    }),
    (it.createElement = Rt),
    (it.createFactory = function (e) {
      var t = Rt.bind(null, e);
      return (t.type = e), t;
    }),
    (it.createRef = function () {
      return { current: null };
    }),
    (it.forwardRef = function (e) {
      return { $$typeof: ht, render: e };
    }),
    (it.isValidElement = Lt),
    (it.lazy = function (e) {
      return { $$typeof: vt, _payload: { _status: -1, _result: e }, _init: Dt };
    }),
    (it.memo = function (e, t) {
      return { $$typeof: mt, type: e, compare: void 0 === t ? null : t };
    }),
    (it.startTransition = function (e) {
      var t = Mt.transition;
      Mt.transition = {};
      try {
        e();
      } finally {
        Mt.transition = t;
      }
    }),
    (it.unstable_act = function () {
      throw Error("act(...) is not supported in production builds of React.");
    }),
    (it.useCallback = function (e, t) {
      return zt.current.useCallback(e, t);
    }),
    (it.useContext = function (e) {
      return zt.current.useContext(e);
    }),
    (it.useDebugValue = function () {}),
    (it.useDeferredValue = function (e) {
      return zt.current.useDeferredValue(e);
    }),
    (it.useEffect = function (e, t) {
      return zt.current.useEffect(e, t);
    }),
    (it.useId = function () {
      return zt.current.useId();
    }),
    (it.useImperativeHandle = function (e, t, n) {
      return zt.current.useImperativeHandle(e, t, n);
    }),
    (it.useInsertionEffect = function (e, t) {
      return zt.current.useInsertionEffect(e, t);
    }),
    (it.useLayoutEffect = function (e, t) {
      return zt.current.useLayoutEffect(e, t);
    }),
    (it.useMemo = function (e, t) {
      return zt.current.useMemo(e, t);
    }),
    (it.useReducer = function (e, t, n) {
      return zt.current.useReducer(e, t, n);
    }),
    (it.useRef = function (e) {
      return zt.current.useRef(e);
    }),
    (it.useState = function (e) {
      return zt.current.useState(e);
    }),
    (it.useSyncExternalStore = function (e, t, n) {
      return zt.current.useSyncExternalStore(e, t, n);
    }),
    (it.useTransition = function () {
      return zt.current.useTransition();
    }),
    (it.version = "18.2.0"),
    (ot.exports = it);
  var Ft = ot.exports;
  const Ht = at(Ft);
  const Vt = at({
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  });
  var Bt = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
  function Wt(e) {
    var t = { type: "tag", name: "", voidElement: !1, attrs: {}, children: [] },
      n = e.match(/<\/?([^\s]+?)[/\s>]/);
    if (
      n &&
      ((t.name = n[1]),
      (Vt[n[1]] || "/" === e.charAt(e.length - 2)) && (t.voidElement = !0),
      t.name.startsWith("!--"))
    ) {
      var r = e.indexOf("--\x3e");
      return { type: "comment", comment: -1 !== r ? e.slice(4, r) : "" };
    }
    for (var a = new RegExp(Bt), o = null; null !== (o = a.exec(e)); )
      if (o[0].trim())
        if (o[1]) {
          var i = o[1].trim(),
            s = [i, ""];
          i.indexOf("=") > -1 && (s = i.split("=")),
            (t.attrs[s[0]] = s[1]),
            a.lastIndex--;
        } else
          o[2] && (t.attrs[o[2]] = o[3].trim().substring(1, o[3].length - 1));
    return t;
  }
  var Kt = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g,
    $t = /^\s*$/,
    Gt = Object.create(null);
  var qt = function (e, t) {
    t || (t = {}), t.components || (t.components = Gt);
    var n,
      r = [],
      a = [],
      o = -1,
      i = !1;
    if (0 !== e.indexOf("<")) {
      var s = e.indexOf("<");
      r.push({ type: "text", content: -1 === s ? e : e.substring(0, s) });
    }
    return (
      e.replace(Kt, function (s, l) {
        if (i) {
          if (s !== "</" + n.name + ">") return;
          i = !1;
        }
        var u,
          c = "/" !== s.charAt(1),
          d = s.startsWith("\x3c!--"),
          f = l + s.length,
          p = e.charAt(f);
        if (d) {
          var h = Wt(s);
          return o < 0 ? (r.push(h), r) : ((u = a[o]).children.push(h), r);
        }
        if (
          (c &&
            (o++,
            "tag" === (n = Wt(s)).type &&
              t.components[n.name] &&
              ((n.type = "component"), (i = !0)),
            n.voidElement ||
              i ||
              !p ||
              "<" === p ||
              n.children.push({
                type: "text",
                content: e.slice(f, e.indexOf("<", f)),
              }),
            0 === o && r.push(n),
            (u = a[o - 1]) && u.children.push(n),
            (a[o] = n)),
          (!c || n.voidElement) &&
            (o > -1 &&
              (n.voidElement || n.name === s.slice(2, -1)) &&
              (o--, (n = -1 === o ? r : a[o])),
            !i && "<" !== p && p))
        ) {
          u = -1 === o ? r : a[o].children;
          var g = e.indexOf("<", f),
            m = e.slice(f, -1 === g ? void 0 : g);
          $t.test(m) && (m = " "),
            ((g > -1 && o + u.length >= 0) || " " !== m) &&
              u.push({ type: "text", content: m });
        }
      }),
      r
    );
  };
  function Xt() {
    if (console && console.warn) {
      for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      "string" == typeof n[0] && (n[0] = "react-i18next:: ".concat(n[0])),
        (e = console).warn.apply(e, n);
    }
  }
  var Jt = {};
  function Zt() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    ("string" == typeof t[0] && Jt[t[0]]) ||
      ("string" == typeof t[0] && (Jt[t[0]] = new Date()), Xt.apply(void 0, t));
  }
  var Yt = function (e, t) {
    return function () {
      if (e.isInitialized) t();
      else {
        e.on("initialized", function n() {
          setTimeout(function () {
            e.off("initialized", n);
          }, 0),
            t();
        });
      }
    };
  };
  function Qt(e, t, n) {
    e.loadNamespaces(t, Yt(e, n));
  }
  function en(e, t, n, r) {
    "string" == typeof n && (n = [n]),
      n.forEach(function (t) {
        e.options.ns.indexOf(t) < 0 && e.options.ns.push(t);
      }),
      e.loadLanguages(t, Yt(e, r));
  }
  function tn(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      r = t.languages[0],
      a = !!t.options && t.options.fallbackLng,
      o = t.languages[t.languages.length - 1];
    if ("cimode" === r.toLowerCase()) return !0;
    var i = function (e, n) {
      var r = t.services.backendConnector.state["".concat(e, "|").concat(n)];
      return -1 === r || 2 === r;
    };
    return (
      !(
        n.bindI18n &&
        n.bindI18n.indexOf("languageChanging") > -1 &&
        t.services.backendConnector.backend &&
        t.isLanguageChangingTo &&
        !i(t.isLanguageChangingTo, e)
      ) &&
      (!!t.hasResourceBundle(r, e) ||
        !(
          t.services.backendConnector.backend &&
          (!t.options.resources || t.options.partialBundledLanguages)
        ) ||
        !(!i(r, e) || (a && !i(o, e))))
    );
  }
  function nn(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    if (!t.languages || !t.languages.length)
      return Zt("i18n.languages were undefined or empty", t.languages), !0;
    var r = void 0 !== t.options.ignoreJSONStructure;
    return r
      ? t.hasLoadedNamespace(e, {
          lng: n.lng,
          precheck: function (t, r) {
            if (
              n.bindI18n &&
              n.bindI18n.indexOf("languageChanging") > -1 &&
              t.services.backendConnector.backend &&
              t.isLanguageChangingTo &&
              !r(t.isLanguageChangingTo, e)
            )
              return !1;
          },
        })
      : tn(e, t, n);
  }
  var rn =
      /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
    an = {
      "&amp;": "&",
      "&#38;": "&",
      "&lt;": "<",
      "&#60;": "<",
      "&gt;": ">",
      "&#62;": ">",
      "&apos;": "'",
      "&#39;": "'",
      "&quot;": '"',
      "&#34;": '"',
      "&nbsp;": " ",
      "&#160;": " ",
      "&copy;": "©",
      "&#169;": "©",
      "&reg;": "®",
      "&#174;": "®",
      "&hellip;": "…",
      "&#8230;": "…",
      "&#x2F;": "/",
      "&#47;": "/",
    },
    on = function (e) {
      return an[e];
    };
  function sn(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function ln(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? sn(Object(n), !0).forEach(function (t) {
            k(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : sn(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  var un,
    cn = {
      bindI18n: "languageChanged",
      bindI18nStore: "",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: !0,
      transWrapTextNodes: "",
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
      useSuspense: !0,
      unescape: function (e) {
        return e.replace(rn, on);
      },
    };
  function dn() {
    return cn;
  }
  function fn() {
    return un;
  }
  var pn = ["format"],
    hn = [
      "children",
      "count",
      "parent",
      "i18nKey",
      "context",
      "tOptions",
      "values",
      "defaults",
      "components",
      "ns",
      "i18n",
      "t",
      "shouldUnescape",
    ];
  function gn(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function mn(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? gn(Object(n), !0).forEach(function (t) {
            k(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : gn(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function vn(e, t) {
    if (!e) return !1;
    var n = e.props ? e.props.children : e.children;
    return t ? n.length > 0 : !!n;
  }
  function yn(e) {
    return e ? (e.props ? e.props.children : e.children) : [];
  }
  function bn(e) {
    return Array.isArray(e) ? e : [e];
  }
  function wn(e, t) {
    if (!e) return "";
    var n = "",
      r = bn(e),
      a =
        t.transSupportBasicHtmlNodes && t.transKeepBasicHtmlNodesFor
          ? t.transKeepBasicHtmlNodesFor
          : [];
    return (
      r.forEach(function (e, r) {
        if ("string" == typeof e) n += "".concat(e);
        else if (Ft.isValidElement(e)) {
          var o = Object.keys(e.props).length,
            i = a.indexOf(e.type) > -1,
            s = e.props.children;
          if (!s && i && 0 === o) n += "<".concat(e.type, "/>");
          else if (s || (i && 0 === o))
            if (e.props.i18nIsDynamicList)
              n += "<".concat(r, "></").concat(r, ">");
            else if (i && 1 === o && "string" == typeof s)
              n += "<".concat(e.type, ">").concat(s, "</").concat(e.type, ">");
            else {
              var l = wn(s, t);
              n += "<".concat(r, ">").concat(l, "</").concat(r, ">");
            }
          else n += "<".concat(r, "></").concat(r, ">");
        } else if (null === e)
          Xt(
            "Trans: the passed in value is invalid - seems you passed in a null child."
          );
        else if ("object" === h(e)) {
          var u = e.format,
            c = rt(e, pn),
            d = Object.keys(c);
          if (1 === d.length) {
            var f = u ? "".concat(d[0], ", ").concat(u) : d[0];
            n += "{{".concat(f, "}}");
          } else
            Xt(
              "react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.",
              e
            );
        } else
          Xt(
            "Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.",
            e
          );
      }),
      n
    );
  }
  function _n(e, t, n, r, a, o) {
    if ("" === t) return [];
    var i = r.transKeepBasicHtmlNodesFor || [],
      s = t && new RegExp(i.join("|")).test(t);
    if (!e && !s) return [t];
    var l = {};
    !(function e(t) {
      bn(t).forEach(function (t) {
        "string" != typeof t &&
          (vn(t)
            ? e(yn(t))
            : "object" !== h(t) || Ft.isValidElement(t) || Object.assign(l, t));
      });
    })(e);
    var u = qt("<0>".concat(t, "</0>")),
      c = mn(mn({}, l), a);
    function d(e, t, n) {
      var r = yn(e),
        a = p(r, t.children, n);
      return (function (e) {
        return (
          "[object Array]" === Object.prototype.toString.call(e) &&
          e.every(function (e) {
            return Ft.isValidElement(e);
          })
        );
      })(r) && 0 === a.length
        ? r
        : a;
    }
    function f(e, t, n, r, a) {
      e.dummy && (e.children = t),
        n.push(
          Ft.cloneElement(
            e,
            mn(mn({}, e.props), {}, { key: r }),
            a ? void 0 : t
          )
        );
    }
    function p(t, a, l) {
      var u = bn(t);
      return bn(a).reduce(function (t, a, g) {
        var m,
          v,
          y,
          b =
            a.children &&
            a.children[0] &&
            a.children[0].content &&
            n.services.interpolator.interpolate(
              a.children[0].content,
              c,
              n.language
            );
        if ("tag" === a.type) {
          var w = u[parseInt(a.name, 10)];
          !w && 1 === l.length && l[0][a.name] && (w = l[0][a.name]),
            w || (w = {});
          var _ =
              0 !== Object.keys(a.attrs).length
                ? ((m = { props: a.attrs }),
                  ((y = mn({}, (v = w))).props = Object.assign(
                    m.props,
                    v.props
                  )),
                  y)
                : w,
            S = Ft.isValidElement(_),
            E = S && vn(a, !0) && !a.voidElement,
            k = s && "object" === h(_) && _.dummy && !S,
            O =
              "object" === h(e) &&
              null !== e &&
              Object.hasOwnProperty.call(e, a.name);
          if ("string" == typeof _) {
            var x = n.services.interpolator.interpolate(_, c, n.language);
            t.push(x);
          } else if (vn(_) || E) {
            f(_, d(_, a, l), t, g);
          } else if (k) {
            var C = p(u, a.children, l);
            t.push(Ft.cloneElement(_, mn(mn({}, _.props), {}, { key: g }), C));
          } else if (Number.isNaN(parseFloat(a.name))) {
            if (O) f(_, d(_, a, l), t, g, a.voidElement);
            else if (r.transSupportBasicHtmlNodes && i.indexOf(a.name) > -1)
              if (a.voidElement)
                t.push(
                  Ft.createElement(a.name, {
                    key: "".concat(a.name, "-").concat(g),
                  })
                );
              else {
                var T = p(u, a.children, l);
                t.push(
                  Ft.createElement(
                    a.name,
                    { key: "".concat(a.name, "-").concat(g) },
                    T
                  )
                );
              }
            else if (a.voidElement) t.push("<".concat(a.name, " />"));
            else {
              var N = p(u, a.children, l);
              t.push(
                "<".concat(a.name, ">").concat(N, "</").concat(a.name, ">")
              );
            }
          } else if ("object" !== h(_) || S)
            1 === a.children.length && b
              ? t.push(
                  Ft.cloneElement(_, mn(mn({}, _.props), {}, { key: g }), b)
                )
              : t.push(Ft.cloneElement(_, mn(mn({}, _.props), {}, { key: g })));
          else {
            var R = a.children[0] ? b : null;
            R && t.push(R);
          }
        } else if ("text" === a.type) {
          var L = r.transWrapTextNodes,
            P = o
              ? r.unescape(
                  n.services.interpolator.interpolate(a.content, c, n.language)
                )
              : n.services.interpolator.interpolate(a.content, c, n.language);
          L
            ? t.push(
                Ft.createElement(
                  L,
                  { key: "".concat(a.name, "-").concat(g) },
                  P
                )
              )
            : t.push(P);
        }
        return t;
      }, []);
    }
    return yn(p([{ dummy: !0, children: e || [] }], u, bn(e || []))[0]);
  }
  function Sn(e) {
    var t = e.children,
      n = e.count,
      r = e.parent,
      a = e.i18nKey,
      o = e.context,
      i = e.tOptions,
      s = void 0 === i ? {} : i,
      l = e.values,
      u = e.defaults,
      c = e.components,
      d = e.ns,
      f = e.i18n,
      p = e.t,
      h = e.shouldUnescape,
      g = rt(e, hn),
      m = f || fn();
    if (!m)
      return (
        Zt(
          "You will need to pass in an i18next instance by using i18nextReactModule"
        ),
        t
      );
    var v =
      p ||
      m.t.bind(m) ||
      function (e) {
        return e;
      };
    o && (s.context = o);
    var y = mn(mn({}, dn()), m.options && m.options.react),
      b = d || v.ns || (m.options && m.options.defaultNS);
    b = "string" == typeof b ? [b] : b || ["translation"];
    var w = u || wn(t, y) || y.transEmptyNodeValue || a,
      _ = y.hashTransKey,
      S = a || (_ ? _(w) : w),
      E = l
        ? s.interpolation
        : {
            interpolation: mn(
              mn({}, s.interpolation),
              {},
              { prefix: "#$?", suffix: "?$#" }
            ),
          },
      k = mn(
        mn(mn(mn({}, s), {}, { count: n }, l), E),
        {},
        { defaultValue: w, ns: b }
      ),
      O = _n(c || t, S ? v(S, k) : w, m, y, k, h),
      x = void 0 !== r ? r : y.defaultTransParent;
    return x ? Ft.createElement(x, g, O) : O;
  }
  var En = {
      type: "3rdParty",
      init: function (e) {
        !(function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          cn = ln(ln({}, cn), e);
        })(e.options.react),
          (function (e) {
            un = e;
          })(e);
      },
    },
    kn = Ft.createContext(),
    On = (function () {
      function e() {
        g(this, e), (this.usedNamespaces = {});
      }
      return (
        y(e, [
          {
            key: "addUsedNamespaces",
            value: function (e) {
              var t = this;
              e.forEach(function (e) {
                t.usedNamespaces[e] || (t.usedNamespaces[e] = !0);
              });
            },
          },
          {
            key: "getUsedNamespaces",
            value: function () {
              return Object.keys(this.usedNamespaces);
            },
          },
        ]),
        e
      );
    })(),
    xn = [
      "children",
      "count",
      "parent",
      "i18nKey",
      "context",
      "tOptions",
      "values",
      "defaults",
      "components",
      "ns",
      "i18n",
      "t",
      "shouldUnescape",
    ];
  function Cn(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function Tn(e) {
    var t = e.children,
      n = e.count,
      r = e.parent,
      a = e.i18nKey,
      o = e.context,
      i = e.tOptions,
      s = void 0 === i ? {} : i,
      l = e.values,
      u = e.defaults,
      c = e.components,
      d = e.ns,
      f = e.i18n,
      p = e.t,
      h = e.shouldUnescape,
      g = rt(e, xn),
      m = Ft.useContext(kn) || {},
      v = m.i18n,
      y = m.defaultNS,
      b = f || v || fn(),
      w = p || (b && b.t.bind(b));
    return Sn(
      (function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Cn(Object(n), !0).forEach(function (t) {
                k(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Cn(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      })(
        {
          children: t,
          count: n,
          parent: r,
          i18nKey: a,
          context: o,
          tOptions: s,
          values: l,
          defaults: u,
          components: c,
          ns: d || (w && w.ns) || y || (b && b.options && b.options.defaultNS),
          i18n: b,
          t: p,
          shouldUnescape: h,
        },
        g
      )
    );
  }
  function Nn(e, t) {
    return (
      O(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var r,
            a,
            o,
            i,
            s = [],
            l = !0,
            u = !1;
          try {
            if (((o = (n = n.call(e)).next), 0 === t));
            else
              for (
                ;
                !(l = (r = o.call(n)).done) &&
                (s.push(r.value), s.length !== t);
                l = !0
              );
          } catch (c) {
            (u = !0), (a = c);
          } finally {
            try {
              if (!l && null != n.return && ((i = n.return()), Object(i) !== i))
                return;
            } finally {
              if (u) throw a;
            }
          }
          return s;
        }
      })(e, t) ||
      C(e, t) ||
      T()
    );
  }
  function Rn(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function Ln(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? Rn(Object(n), !0).forEach(function (t) {
            k(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Rn(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  var Pn = function (e, t) {
    var n = Ft.useRef();
    return (
      Ft.useEffect(
        function () {
          n.current = e;
        },
        [e, t]
      ),
      n.current
    );
  };
  const jn = {
      LABEL_SYSTEM_NOTICE: "System Notice",
      LABEL_NOTICE_LINK: "Link",
      LABEL_SELECT_SITE: "Select Corporation",
      DESC_SYSTEM_MENU_LOAD_FAILED: "Failed to invoke\nthe system menu.",
      DESC_SYSTEM_MENU_NOT_EXIST: "The system menu\ndoes not exist.",
      LABEL_SYSTEM_MANAGEMENT: "System Management",
      LABEL_MY_ROLE: "My Role",
      LABEL_LOGIN_EXTENSION: "Login Extension",
      LABEL_HOME: "Home",
      LABEL_SYSTEM_SETTING: "System Setting",
      LABEL_LOGOUT: "Logout",
      ERR_VERIFICATION_NOT_EXECUTED_YET:
        "verifyAndReturnToken must be called first.",
      ERR_SERVER_ERROR_OCCURRED: "SSO 500! Please inquire.",
      ERR_REDIRECTION_EXCEEDED_WHILE_SSO_AUTHENTICATION:
        "An issue occurred during SSO authentication.\n(Redirection exceeded)",
      LABEL_TAG: "Tag",
      LABEL_SHOW_ALL_TAGS: "Show all permission tags",
      LABEL_SELECT_ALL_ROLE: "Select All",
      LABEL_ADD_NEW_ROLE: "Request to Add New Role",
    },
    In = {
      LABEL_SYSTEM_NOTICE: "System Notice",
      LABEL_NOTICE_LINK: "Link",
      LABEL_SELECT_SITE: "법인 선택",
      DESC_SYSTEM_MENU_LOAD_FAILED: "시스템 메뉴 호출에\n실패했습니다.",
      DESC_SYSTEM_MENU_NOT_EXIST: "시스템의 메뉴가\n존재하지 않습니다.",
      LABEL_SYSTEM_MANAGEMENT: "시스템 관리",
      LABEL_MY_ROLE: "내 역할",
      LABEL_LOGIN_EXTENSION: "로그인 연장",
      LABEL_HOME: "홈",
      LABEL_SYSTEM_SETTING: "시스템 설정",
      LABEL_LOGOUT: "로그아웃",
      ERR_VERIFICATION_NOT_EXECUTED_YET:
        "verifyAndReturnToken이 먼저 호출되어야 합니다.",
      ERR_SERVER_ERROR_OCCURRED: "SSO 500! 문의주세요.",
      ERR_REDIRECTION_EXCEEDED_WHILE_SSO_AUTHENTICATION:
        "SSO 인증 중 문제가 발생하였습니다.\n(리다이렉션 초과)",
      LABEL_TAG: "Tag",
      LABEL_SHOW_ALL_TAGS: "권한 태그 전체보기",
      LABEL_SELECT_ALL_ROLE: "전체선택",
      LABEL_ADD_NEW_ROLE: "신규 역할 추가 신청",
    },
    An = { LOCAL: "local", DEV: "dev", STAGE: "stg", PROD: "prod" },
    Dn = {
      [An.LOCAL]: {
        HMG_HOME: "https://local-admin.hmg-corp.io:3001",
        SSO_HOST: "https://dev-admin-api.hmg-corp.io",
        SSO_HOST_EU: "https://dev-admin-internal-api-eu.hmg-corp.io",
        CONFIG_HOST: "https://dev-admin-config.hmg-corp.io",
        COOKIE_TOKEN_PREFIX: "X-dev-hmg-admin-auth-",
        COOKIE_TOKEN_NAME: "X-dev-hmg-admin-authorization",
        NOTICE_FILE_NAME: "notice-dev.json",
      },
      [An.DEV]: {
        HMG_HOME: "https://dev-admin.hmg-corp.io",
        SSO_HOST: "https://dev-admin-api.hmg-corp.io",
        SSO_HOST_EU: "https://dev-admin-internal-api-eu.hmg-corp.io",
        CONFIG_HOST: "https://dev-admin-config.hmg-corp.io",
        COOKIE_TOKEN_PREFIX: "X-dev-hmg-admin-auth-",
        COOKIE_TOKEN_NAME: "X-dev-hmg-admin-authorization",
        NOTICE_FILE_NAME: "notice-dev.json",
      },
      [An.STAGE]: {
        HMG_HOME: "https://stg-admin.hmg-corp.io",
        SSO_HOST: "https://stg-admin-api.hmg-corp.io",
        SSO_HOST_EU: "https://stg-admin-internal-api-eu.hmg-corp.io",
        SSO_HOST_US: "https://stg-admin-internal-api-us.hmg-corp.io",
        CONFIG_HOST: "https://stg-admin-config.hmg-corp.io",
        COOKIE_TOKEN_PREFIX: "X-stg-hmg-admin-auth-",
        COOKIE_TOKEN_NAME: "X-stg-hmg-admin-authorization",
        NOTICE_FILE_NAME: "notice-stg.json",
      },
      [An.PROD]: {
        HMG_HOME: "https://admin.hmg-corp.io",
        SSO_HOST: "https://admin-api.hmg-corp.io",
        SSO_HOST_EU: "https://admin-internal-api-eu.hmg-corp.io",
        SSO_HOST_US: "https://admin-internal-api-us.hmg-corp.io",
        CONFIG_HOST: "https://admin-config.hmg-corp.io",
        COOKIE_TOKEN_PREFIX: "X-hmg-admin-auth-",
        COOKIE_TOKEN_NAME: "X-hmg-admin-authorization",
        NOTICE_FILE_NAME: "notice.json",
      },
    },
    zn = "compressed.",
    Mn = "hadm-language-storage",
    Un = "hadm-timer-storage",
    Fn = 36e5;
  var Hn = ((e) => (
      (e.SITE_CODE = "_sc_"),
      (e.ROLE_CODE = "_ir_"),
      (e.REDIRECT_CODE = "_r_"),
      (e.SSO_FLOW_CODE = "m"),
      e
    ))(Hn || {}),
    Vn = ((e) => ((e.FAIL_SSO_API = "FAIL_SSO_API"), e))(Vn || {}),
    Bn = ((e) => (
      (e.TYPE = "USER_PROJECT_SETTING"),
      (e.LANGUAGE_KEY = "language"),
      (e.ROLE_KEY = "role"),
      e
    ))(Bn || {});
  function Wn() {
    const { t: e, i18n: t } = (function (e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = t.i18n,
        r = Ft.useContext(kn) || {},
        a = r.i18n,
        o = r.defaultNS,
        i = n || a || fn();
      if ((i && !i.reportNamespaces && (i.reportNamespaces = new On()), !i)) {
        Zt(
          "You will need to pass in an i18next instance by using initReactI18next"
        );
        var s = function (e, t) {
            return "string" == typeof t
              ? t
              : t && "object" === h(t) && "string" == typeof t.defaultValue
              ? t.defaultValue
              : Array.isArray(e)
              ? e[e.length - 1]
              : e;
          },
          l = [s, {}, !1];
        return (l.t = s), (l.i18n = {}), (l.ready = !1), l;
      }
      i.options.react &&
        void 0 !== i.options.react.wait &&
        Zt(
          "It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour."
        );
      var u = Ln(Ln(Ln({}, dn()), i.options.react), t),
        c = u.useSuspense,
        d = u.keyPrefix,
        f = o || (i.options && i.options.defaultNS);
      (f = "string" == typeof f ? [f] : f || ["translation"]),
        i.reportNamespaces.addUsedNamespaces &&
          i.reportNamespaces.addUsedNamespaces(f);
      var p =
        (i.isInitialized || i.initializedStoreOnce) &&
        f.every(function (e) {
          return nn(e, i, u);
        });
      function g() {
        return i.getFixedT(
          t.lng || null,
          "fallback" === u.nsMode ? f : f[0],
          d
        );
      }
      var m = Nn(Ft.useState(g), 2),
        v = m[0],
        y = m[1],
        b = f.join();
      t.lng && (b = "".concat(t.lng).concat(b));
      var w = Pn(b),
        _ = Ft.useRef(!0);
      Ft.useEffect(
        function () {
          var e = u.bindI18n,
            n = u.bindI18nStore;
          function r() {
            _.current && y(g);
          }
          return (
            (_.current = !0),
            p ||
              c ||
              (t.lng
                ? en(i, t.lng, f, function () {
                    _.current && y(g);
                  })
                : Qt(i, f, function () {
                    _.current && y(g);
                  })),
            p && w && w !== b && _.current && y(g),
            e && i && i.on(e, r),
            n && i && i.store.on(n, r),
            function () {
              (_.current = !1),
                e &&
                  i &&
                  e.split(" ").forEach(function (e) {
                    return i.off(e, r);
                  }),
                n &&
                  i &&
                  n.split(" ").forEach(function (e) {
                    return i.store.off(e, r);
                  });
            }
          );
        },
        [i, b]
      );
      var S = Ft.useRef(!0);
      Ft.useEffect(
        function () {
          _.current && !S.current && y(g), (S.current = !1);
        },
        [i, d]
      );
      var E = [v, i, p];
      if (((E.t = v), (E.i18n = i), (E.ready = p), p)) return E;
      if (!p && !c) return E;
      throw new Promise(function (e) {
        t.lng
          ? en(i, t.lng, f, function () {
              return e();
            })
          : Qt(i, f, function () {
              return e();
            });
      });
    })();
    return {
      t: e,
      language: Ie.resolvedLanguage,
      setLanguage: t.changeLanguage,
      InferableTrans: function ({
        translationKey: e,
        placeholders: n,
        components: r,
      }) {
        return Tn({ i18n: t, i18nKey: e, values: n, components: r });
      },
    };
  }
  Ie.t;
  Ie.use(En)
    .use(tt)
    .init({
      debug: !1,
      fallbackLng: "en",
      ns: ["translation"],
      interpolation: { escapeValue: !1 },
      detection: {
        order: ["navigator", "cookie"],
        caches: ["cookie"],
        lookupCookie: "HA_SDK_LANG",
      },
      resources: { en: { translation: jn }, ko: { translation: In } },
    })
    .catch(() => console.error("Error occurred"));
  const Kn = { ko: p, en: l };
  Ie.on("languageChanged", () => {
    const e = Ie.resolvedLanguage;
    !(function (e) {
      document.documentElement.lang = e;
    })(e),
      (function (e) {
        u({ locale: Kn[e] });
      })(e);
  });
  var $n = { exports: {} },
    Gn = {},
    qn = Ft,
    Xn = Symbol.for("react.element"),
    Jn = Symbol.for("react.fragment"),
    Zn = Object.prototype.hasOwnProperty,
    Yn =
      qn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    Qn = { key: !0, ref: !0, __self: !0, __source: !0 };
  function er(e, t, n) {
    var r,
      a = {},
      o = null,
      i = null;
    for (r in (void 0 !== n && (o = "" + n),
    void 0 !== t.key && (o = "" + t.key),
    void 0 !== t.ref && (i = t.ref),
    t))
      Zn.call(t, r) && !Qn.hasOwnProperty(r) && (a[r] = t[r]);
    if (e && e.defaultProps)
      for (r in (t = e.defaultProps)) void 0 === a[r] && (a[r] = t[r]);
    return {
      $$typeof: Xn,
      type: e,
      key: o,
      ref: i,
      props: a,
      _owner: Yn.current,
    };
  }
  (Gn.Fragment = Jn), (Gn.jsx = er), (Gn.jsxs = er), ($n.exports = Gn);
  var tr = $n.exports,
    nr = {},
    rr = { exports: {} },
    ar = {},
    or = { exports: {} },
    ir = {};
  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  !(function (e) {
    function t(e, t) {
      var n = e.length;
      e.push(t);
      e: for (; 0 < n; ) {
        var r = (n - 1) >>> 1,
          o = e[r];
        if (!(0 < a(o, t))) break e;
        (e[r] = t), (e[n] = o), (n = r);
      }
    }
    function n(e) {
      return 0 === e.length ? null : e[0];
    }
    function r(e) {
      if (0 === e.length) return null;
      var t = e[0],
        n = e.pop();
      if (n !== t) {
        e[0] = n;
        e: for (var r = 0, o = e.length, i = o >>> 1; r < i; ) {
          var s = 2 * (r + 1) - 1,
            l = e[s],
            u = s + 1,
            c = e[u];
          if (0 > a(l, n))
            u < o && 0 > a(c, l)
              ? ((e[r] = c), (e[u] = n), (r = u))
              : ((e[r] = l), (e[s] = n), (r = s));
          else {
            if (!(u < o && 0 > a(c, n))) break e;
            (e[r] = c), (e[u] = n), (r = u);
          }
        }
      }
      return t;
    }
    function a(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return 0 !== n ? n : e.id - t.id;
    }
    if (
      "object" == typeof performance &&
      "function" == typeof performance.now
    ) {
      var o = performance;
      e.unstable_now = function () {
        return o.now();
      };
    } else {
      var i = Date,
        s = i.now();
      e.unstable_now = function () {
        return i.now() - s;
      };
    }
    var l = [],
      u = [],
      c = 1,
      d = null,
      f = 3,
      p = !1,
      h = !1,
      g = !1,
      m = "function" == typeof setTimeout ? setTimeout : null,
      v = "function" == typeof clearTimeout ? clearTimeout : null,
      y = "undefined" != typeof setImmediate ? setImmediate : null;
    function b(e) {
      for (var a = n(u); null !== a; ) {
        if (null === a.callback) r(u);
        else {
          if (!(a.startTime <= e)) break;
          r(u), (a.sortIndex = a.expirationTime), t(l, a);
        }
        a = n(u);
      }
    }
    function w(e) {
      if (((g = !1), b(e), !h))
        if (null !== n(l)) (h = !0), P(_);
        else {
          var t = n(u);
          null !== t && j(w, t.startTime - e);
        }
    }
    function _(t, a) {
      (h = !1), g && ((g = !1), v(O), (O = -1)), (p = !0);
      var o = f;
      try {
        for (
          b(a), d = n(l);
          null !== d && (!(d.expirationTime > a) || (t && !T()));

        ) {
          var i = d.callback;
          if ("function" == typeof i) {
            (d.callback = null), (f = d.priorityLevel);
            var s = i(d.expirationTime <= a);
            (a = e.unstable_now()),
              "function" == typeof s ? (d.callback = s) : d === n(l) && r(l),
              b(a);
          } else r(l);
          d = n(l);
        }
        if (null !== d) var c = !0;
        else {
          var m = n(u);
          null !== m && j(w, m.startTime - a), (c = !1);
        }
        return c;
      } finally {
        (d = null), (f = o), (p = !1);
      }
    }
    "undefined" != typeof navigator &&
      void 0 !== navigator.scheduling &&
      void 0 !== navigator.scheduling.isInputPending &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    var S,
      E = !1,
      k = null,
      O = -1,
      x = 5,
      C = -1;
    function T() {
      return !(e.unstable_now() - C < x);
    }
    function N() {
      if (null !== k) {
        var t = e.unstable_now();
        C = t;
        var n = !0;
        try {
          n = k(!0, t);
        } finally {
          n ? S() : ((E = !1), (k = null));
        }
      } else E = !1;
    }
    if ("function" == typeof y)
      S = function () {
        y(N);
      };
    else if ("undefined" != typeof MessageChannel) {
      var R = new MessageChannel(),
        L = R.port2;
      (R.port1.onmessage = N),
        (S = function () {
          L.postMessage(null);
        });
    } else
      S = function () {
        m(N, 0);
      };
    function P(e) {
      (k = e), E || ((E = !0), S());
    }
    function j(t, n) {
      O = m(function () {
        t(e.unstable_now());
      }, n);
    }
    (e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (e.unstable_continueExecution = function () {
        h || p || ((h = !0), P(_));
      }),
      (e.unstable_forceFrameRate = function (e) {
        0 > e || 125 < e
          ? console.error(
              "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
            )
          : (x = 0 < e ? Math.floor(1e3 / e) : 5);
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return f;
      }),
      (e.unstable_getFirstCallbackNode = function () {
        return n(l);
      }),
      (e.unstable_next = function (e) {
        switch (f) {
          case 1:
          case 2:
          case 3:
            var t = 3;
            break;
          default:
            t = f;
        }
        var n = f;
        f = t;
        try {
          return e();
        } finally {
          f = n;
        }
      }),
      (e.unstable_pauseExecution = function () {}),
      (e.unstable_requestPaint = function () {}),
      (e.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = f;
        f = e;
        try {
          return t();
        } finally {
          f = n;
        }
      }),
      (e.unstable_scheduleCallback = function (r, a, o) {
        var i = e.unstable_now();
        switch (
          ("object" == typeof o && null !== o
            ? (o = "number" == typeof (o = o.delay) && 0 < o ? i + o : i)
            : (o = i),
          r)
        ) {
          case 1:
            var s = -1;
            break;
          case 2:
            s = 250;
            break;
          case 5:
            s = 1073741823;
            break;
          case 4:
            s = 1e4;
            break;
          default:
            s = 5e3;
        }
        return (
          (r = {
            id: c++,
            callback: a,
            priorityLevel: r,
            startTime: o,
            expirationTime: (s = o + s),
            sortIndex: -1,
          }),
          o > i
            ? ((r.sortIndex = o),
              t(u, r),
              null === n(l) &&
                r === n(u) &&
                (g ? (v(O), (O = -1)) : (g = !0), j(w, o - i)))
            : ((r.sortIndex = s), t(l, r), h || p || ((h = !0), P(_))),
          r
        );
      }),
      (e.unstable_shouldYield = T),
      (e.unstable_wrapCallback = function (e) {
        var t = f;
        return function () {
          var n = f;
          f = t;
          try {
            return e.apply(this, arguments);
          } finally {
            f = n;
          }
        };
      });
  })(ir),
    (or.exports = ir);
  var sr = or.exports,
    lr = Ft,
    ur = sr;
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ function cr(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var dr = new Set(),
    fr = {};
  function pr(e, t) {
    hr(e, t), hr(e + "Capture", t);
  }
  function hr(e, t) {
    for (fr[e] = t, e = 0; e < t.length; e++) dr.add(t[e]);
  }
  var gr = !(
      "undefined" == typeof window ||
      void 0 === window.document ||
      void 0 === window.document.createElement
    ),
    mr = Object.prototype.hasOwnProperty,
    vr =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    yr = {},
    br = {};
  function wr(e, t, n, r, a, o, i) {
    (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
      (this.attributeName = r),
      (this.attributeNamespace = a),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = o),
      (this.removeEmptyString = i);
  }
  var _r = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      _r[e] = new wr(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      _r[t] = new wr(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
      e
    ) {
      _r[e] = new wr(e, 2, !1, e.toLowerCase(), null, !1, !1);
    }),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      _r[e] = new wr(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        _r[e] = new wr(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      _r[e] = new wr(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      _r[e] = new wr(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      _r[e] = new wr(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      _r[e] = new wr(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
  var Sr = /[\-:]([a-z])/g;
  function Er(e) {
    return e[1].toUpperCase();
  }
  function kr(e, t, n, r) {
    var a = _r.hasOwnProperty(t) ? _r[t] : null;
    (null !== a
      ? 0 !== a.type
      : r ||
        !(2 < t.length) ||
        ("o" !== t[0] && "O" !== t[0]) ||
        ("n" !== t[1] && "N" !== t[1])) &&
      ((function (e, t, n, r) {
        if (
          null == t ||
          (function (e, t, n, r) {
            if (null !== n && 0 === n.type) return !1;
            switch (typeof t) {
              case "function":
              case "symbol":
                return !0;
              case "boolean":
                return (
                  !r &&
                  (null !== n
                    ? !n.acceptsBooleans
                    : "data-" !== (e = e.toLowerCase().slice(0, 5)) &&
                      "aria-" !== e)
                );
              default:
                return !1;
            }
          })(e, t, n, r)
        )
          return !0;
        if (r) return !1;
        if (null !== n)
          switch (n.type) {
            case 3:
              return !t;
            case 4:
              return !1 === t;
            case 5:
              return isNaN(t);
            case 6:
              return isNaN(t) || 1 > t;
          }
        return !1;
      })(t, n, a, r) && (n = null),
      r || null === a
        ? (function (e) {
            return (
              !!mr.call(br, e) ||
              (!mr.call(yr, e) &&
                (vr.test(e) ? (br[e] = !0) : ((yr[e] = !0), !1)))
            );
          })(t) &&
          (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : a.mustUseProperty
        ? (e[a.propertyName] = null === n ? 3 !== a.type && "" : n)
        : ((t = a.attributeName),
          (r = a.attributeNamespace),
          null === n
            ? e.removeAttribute(t)
            : ((n = 3 === (a = a.type) || (4 === a && !0 === n) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(Sr, Er);
      _r[t] = new wr(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(Sr, Er);
        _r[t] = new wr(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(Sr, Er);
      _r[t] = new wr(
        t,
        1,
        !1,
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        !1
      );
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      _r[e] = new wr(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (_r.xlinkHref = new wr(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      _r[e] = new wr(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
  var Or = lr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    xr = Symbol.for("react.element"),
    Cr = Symbol.for("react.portal"),
    Tr = Symbol.for("react.fragment"),
    Nr = Symbol.for("react.strict_mode"),
    Rr = Symbol.for("react.profiler"),
    Lr = Symbol.for("react.provider"),
    Pr = Symbol.for("react.context"),
    jr = Symbol.for("react.forward_ref"),
    Ir = Symbol.for("react.suspense"),
    Ar = Symbol.for("react.suspense_list"),
    Dr = Symbol.for("react.memo"),
    zr = Symbol.for("react.lazy"),
    Mr = Symbol.for("react.offscreen"),
    Ur = Symbol.iterator;
  function Fr(e) {
    return null === e || "object" != typeof e
      ? null
      : "function" == typeof (e = (Ur && e[Ur]) || e["@@iterator"])
      ? e
      : null;
  }
  var Hr,
    Vr = Object.assign;
  function Br(e) {
    if (void 0 === Hr)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Hr = (t && t[1]) || "";
      }
    return "\n" + Hr + e;
  }
  var Wr = !1;
  function Kr(e, t) {
    if (!e || Wr) return "";
    Wr = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          "object" == typeof Reflect && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (u) {
            var r = u;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (u) {
            r = u;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (u) {
          r = u;
        }
        e();
      }
    } catch (u) {
      if (u && r && "string" == typeof u.stack) {
        for (
          var a = u.stack.split("\n"),
            o = r.stack.split("\n"),
            i = a.length - 1,
            s = o.length - 1;
          1 <= i && 0 <= s && a[i] !== o[s];

        )
          s--;
        for (; 1 <= i && 0 <= s; i--, s--)
          if (a[i] !== o[s]) {
            if (1 !== i || 1 !== s)
              do {
                if ((i--, 0 > --s || a[i] !== o[s])) {
                  var l = "\n" + a[i].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      l.includes("<anonymous>") &&
                      (l = l.replace("<anonymous>", e.displayName)),
                    l
                  );
                }
              } while (1 <= i && 0 <= s);
            break;
          }
      }
    } finally {
      (Wr = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? Br(e) : "";
  }
  function $r(e) {
    switch (e.tag) {
      case 5:
        return Br(e.type);
      case 16:
        return Br("Lazy");
      case 13:
        return Br("Suspense");
      case 19:
        return Br("SuspenseList");
      case 0:
      case 2:
      case 15:
        return (e = Kr(e.type, !1));
      case 11:
        return (e = Kr(e.type.render, !1));
      case 1:
        return (e = Kr(e.type, !0));
      default:
        return "";
    }
  }
  function Gr(e) {
    if (null == e) return null;
    if ("function" == typeof e) return e.displayName || e.name || null;
    if ("string" == typeof e) return e;
    switch (e) {
      case Tr:
        return "Fragment";
      case Cr:
        return "Portal";
      case Rr:
        return "Profiler";
      case Nr:
        return "StrictMode";
      case Ir:
        return "Suspense";
      case Ar:
        return "SuspenseList";
    }
    if ("object" == typeof e)
      switch (e.$$typeof) {
        case Pr:
          return (e.displayName || "Context") + ".Consumer";
        case Lr:
          return (e._context.displayName || "Context") + ".Provider";
        case jr:
          var t = e.render;
          return (
            (e = e.displayName) ||
              (e =
                "" !== (e = t.displayName || t.name || "")
                  ? "ForwardRef(" + e + ")"
                  : "ForwardRef"),
            e
          );
        case Dr:
          return null !== (t = e.displayName || null)
            ? t
            : Gr(e.type) || "Memo";
        case zr:
          (t = e._payload), (e = e._init);
          try {
            return Gr(e(t));
          } catch (n) {}
      }
    return null;
  }
  function qr(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = (e = t.render).displayName || e.name || ""),
          t.displayName || ("" !== e ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Gr(t);
      case 8:
        return t === Nr ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" == typeof t) return t.displayName || t.name || null;
        if ("string" == typeof t) return t;
    }
    return null;
  }
  function Xr(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Jr(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      "input" === e.toLowerCase() &&
      ("checkbox" === t || "radio" === t)
    );
  }
  function Zr(e) {
    e._valueTracker ||
      (e._valueTracker = (function (e) {
        var t = Jr(e) ? "checked" : "value",
          n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
          r = "" + e[t];
        if (
          !e.hasOwnProperty(t) &&
          void 0 !== n &&
          "function" == typeof n.get &&
          "function" == typeof n.set
        ) {
          var a = n.get,
            o = n.set;
          return (
            Object.defineProperty(e, t, {
              configurable: !0,
              get: function () {
                return a.call(this);
              },
              set: function (e) {
                (r = "" + e), o.call(this, e);
              },
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
              getValue: function () {
                return r;
              },
              setValue: function (e) {
                r = "" + e;
              },
              stopTracking: function () {
                (e._valueTracker = null), delete e[t];
              },
            }
          );
        }
      })(e));
  }
  function Yr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return (
      e && (r = Jr(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r) !== n && (t.setValue(e), !0)
    );
  }
  function Qr(e) {
    if (
      void 0 === (e = e || ("undefined" != typeof document ? document : void 0))
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch (t) {
      return e.body;
    }
  }
  function ea(e, t) {
    var n = t.checked;
    return Vr({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: null != n ? n : e._wrapperState.initialChecked,
    });
  }
  function ta(e, t) {
    var n = null == t.defaultValue ? "" : t.defaultValue,
      r = null != t.checked ? t.checked : t.defaultChecked;
    (n = Xr(null != t.value ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          "checkbox" === t.type || "radio" === t.type
            ? null != t.checked
            : null != t.value,
      });
  }
  function na(e, t) {
    null != (t = t.checked) && kr(e, "checked", t, !1);
  }
  function ra(e, t) {
    na(e, t);
    var n = Xr(t.value),
      r = t.type;
    if (null != n)
      "number" === r
        ? ((0 === n && "" === e.value) || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if ("submit" === r || "reset" === r)
      return void e.removeAttribute("value");
    t.hasOwnProperty("value")
      ? oa(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && oa(e, t.type, Xr(t.defaultValue)),
      null == t.checked &&
        null != t.defaultChecked &&
        (e.defaultChecked = !!t.defaultChecked);
  }
  function aa(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (
        !(
          ("submit" !== r && "reset" !== r) ||
          (void 0 !== t.value && null !== t.value)
        )
      )
        return;
      (t = "" + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    "" !== (n = e.name) && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      "" !== n && (e.name = n);
  }
  function oa(e, t, n) {
    ("number" === t && Qr(e.ownerDocument) === e) ||
      (null == n
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var ia = Array.isArray;
  function sa(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
      for (n = 0; n < e.length; n++)
        (a = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== a && (e[n].selected = a),
          a && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Xr(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n)
          return (e[a].selected = !0), void (r && (e[a].defaultSelected = !0));
        null !== t || e[a].disabled || (t = e[a]);
      }
      null !== t && (t.selected = !0);
    }
  }
  function la(e, t) {
    if (null != t.dangerouslySetInnerHTML) throw Error(cr(91));
    return Vr({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function ua(e, t) {
    var n = t.value;
    if (null == n) {
      if (((n = t.children), (t = t.defaultValue), null != n)) {
        if (null != t) throw Error(cr(92));
        if (ia(n)) {
          if (1 < n.length) throw Error(cr(93));
          n = n[0];
        }
        t = n;
      }
      null == t && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: Xr(n) };
  }
  function ca(e, t) {
    var n = Xr(t.value),
      r = Xr(t.defaultValue);
    null != n &&
      ((n = "" + n) !== e.value && (e.value = n),
      null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
      null != r && (e.defaultValue = "" + r);
  }
  function da(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      "" !== t &&
      null !== t &&
      (e.value = t);
  }
  function fa(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function pa(e, t) {
    return null == e || "http://www.w3.org/1999/xhtml" === e
      ? fa(t)
      : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
      ? "http://www.w3.org/1999/xhtml"
      : e;
  }
  var ha,
    ga,
    ma =
      ((ga = function (e, t) {
        if ("http://www.w3.org/2000/svg" !== e.namespaceURI || "innerHTML" in e)
          e.innerHTML = t;
        else {
          for (
            (ha = ha || document.createElement("div")).innerHTML =
              "<svg>" + t.valueOf().toString() + "</svg>",
              t = ha.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      }),
      "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
        ? function (e, t, n, r) {
            MSApp.execUnsafeLocalFunction(function () {
              return ga(e, t);
            });
          }
        : ga);
  function va(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && 3 === n.nodeType)
        return void (n.nodeValue = t);
    }
    e.textContent = t;
  }
  var ya = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    ba = ["Webkit", "ms", "Moz", "O"];
  function wa(e, t, n) {
    return null == t || "boolean" == typeof t || "" === t
      ? ""
      : n || "number" != typeof t || 0 === t || (ya.hasOwnProperty(e) && ya[e])
      ? ("" + t).trim()
      : t + "px";
  }
  function _a(e, t) {
    for (var n in ((e = e.style), t))
      if (t.hasOwnProperty(n)) {
        var r = 0 === n.indexOf("--"),
          a = wa(n, t[n], r);
        "float" === n && (n = "cssFloat"), r ? e.setProperty(n, a) : (e[n] = a);
      }
  }
  Object.keys(ya).forEach(function (e) {
    ba.forEach(function (t) {
      (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ya[t] = ya[e]);
    });
  });
  var Sa = Vr(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
  );
  function Ea(e, t) {
    if (t) {
      if (Sa[e] && (null != t.children || null != t.dangerouslySetInnerHTML))
        throw Error(cr(137, e));
      if (null != t.dangerouslySetInnerHTML) {
        if (null != t.children) throw Error(cr(60));
        if (
          "object" != typeof t.dangerouslySetInnerHTML ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(cr(61));
      }
      if (null != t.style && "object" != typeof t.style) throw Error(cr(62));
    }
  }
  function ka(e, t) {
    if (-1 === e.indexOf("-")) return "string" == typeof t.is;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Oa = null;
  function xa(e) {
    return (
      (e = e.target || e.srcElement || window).correspondingUseElement &&
        (e = e.correspondingUseElement),
      3 === e.nodeType ? e.parentNode : e
    );
  }
  var Ca = null,
    Ta = null,
    Na = null;
  function Ra(e) {
    if ((e = _l(e))) {
      if ("function" != typeof Ca) throw Error(cr(280));
      var t = e.stateNode;
      t && ((t = El(t)), Ca(e.stateNode, e.type, t));
    }
  }
  function La(e) {
    Ta ? (Na ? Na.push(e) : (Na = [e])) : (Ta = e);
  }
  function Pa() {
    if (Ta) {
      var e = Ta,
        t = Na;
      if (((Na = Ta = null), Ra(e), t)) for (e = 0; e < t.length; e++) Ra(t[e]);
    }
  }
  function ja(e, t) {
    return e(t);
  }
  function Ia() {}
  var Aa = !1;
  function Da(e, t, n) {
    if (Aa) return e(t, n);
    Aa = !0;
    try {
      return ja(e, t, n);
    } finally {
      (Aa = !1), (null !== Ta || null !== Na) && (Ia(), Pa());
    }
  }
  function za(e, t) {
    var n = e.stateNode;
    if (null === n) return null;
    var r = El(n);
    if (null === r) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) ||
          (r = !(
            "button" === (e = e.type) ||
            "input" === e ||
            "select" === e ||
            "textarea" === e
          )),
          (e = !r);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && "function" != typeof n) throw Error(cr(231, t, typeof n));
    return n;
  }
  var Ma = !1;
  if (gr)
    try {
      var Ua = {};
      Object.defineProperty(Ua, "passive", {
        get: function () {
          Ma = !0;
        },
      }),
        window.addEventListener("test", Ua, Ua),
        window.removeEventListener("test", Ua, Ua);
    } catch (ga) {
      Ma = !1;
    }
  function Fa(e, t, n, r, a, o, i, s, l) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, u);
    } catch (c) {
      this.onError(c);
    }
  }
  var Ha = !1,
    Va = null,
    Ba = !1,
    Wa = null,
    Ka = {
      onError: function (e) {
        (Ha = !0), (Va = e);
      },
    };
  function $a(e, t, n, r, a, o, i, s, l) {
    (Ha = !1), (Va = null), Fa.apply(Ka, arguments);
  }
  function Ga(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do {
        0 != (4098 & (t = e).flags) && (n = t.return), (e = t.return);
      } while (e);
    }
    return 3 === t.tag ? n : null;
  }
  function qa(e) {
    if (13 === e.tag) {
      var t = e.memoizedState;
      if (
        (null === t && null !== (e = e.alternate) && (t = e.memoizedState),
        null !== t)
      )
        return t.dehydrated;
    }
    return null;
  }
  function Xa(e) {
    if (Ga(e) !== e) throw Error(cr(188));
  }
  function Ja(e) {
    return null !==
      (e = (function (e) {
        var t = e.alternate;
        if (!t) {
          if (null === (t = Ga(e))) throw Error(cr(188));
          return t !== e ? null : e;
        }
        for (var n = e, r = t; ; ) {
          var a = n.return;
          if (null === a) break;
          var o = a.alternate;
          if (null === o) {
            if (null !== (r = a.return)) {
              n = r;
              continue;
            }
            break;
          }
          if (a.child === o.child) {
            for (o = a.child; o; ) {
              if (o === n) return Xa(a), e;
              if (o === r) return Xa(a), t;
              o = o.sibling;
            }
            throw Error(cr(188));
          }
          if (n.return !== r.return) (n = a), (r = o);
          else {
            for (var i = !1, s = a.child; s; ) {
              if (s === n) {
                (i = !0), (n = a), (r = o);
                break;
              }
              if (s === r) {
                (i = !0), (r = a), (n = o);
                break;
              }
              s = s.sibling;
            }
            if (!i) {
              for (s = o.child; s; ) {
                if (s === n) {
                  (i = !0), (n = o), (r = a);
                  break;
                }
                if (s === r) {
                  (i = !0), (r = o), (n = a);
                  break;
                }
                s = s.sibling;
              }
              if (!i) throw Error(cr(189));
            }
          }
          if (n.alternate !== r) throw Error(cr(190));
        }
        if (3 !== n.tag) throw Error(cr(188));
        return n.stateNode.current === n ? e : t;
      })(e))
      ? Za(e)
      : null;
  }
  function Za(e) {
    if (5 === e.tag || 6 === e.tag) return e;
    for (e = e.child; null !== e; ) {
      var t = Za(e);
      if (null !== t) return t;
      e = e.sibling;
    }
    return null;
  }
  var Ya = ur.unstable_scheduleCallback,
    Qa = ur.unstable_cancelCallback,
    eo = ur.unstable_shouldYield,
    to = ur.unstable_requestPaint,
    no = ur.unstable_now,
    ro = ur.unstable_getCurrentPriorityLevel,
    ao = ur.unstable_ImmediatePriority,
    oo = ur.unstable_UserBlockingPriority,
    io = ur.unstable_NormalPriority,
    so = ur.unstable_LowPriority,
    lo = ur.unstable_IdlePriority,
    uo = null,
    co = null;
  var fo = Math.clz32
      ? Math.clz32
      : function (e) {
          return 0 === (e >>>= 0) ? 32 : (31 - ((po(e) / ho) | 0)) | 0;
        },
    po = Math.log,
    ho = Math.LN2;
  var go = 64,
    mo = 4194304;
  function vo(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return 4194240 & e;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return 130023424 & e;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function yo(e, t) {
    var n = e.pendingLanes;
    if (0 === n) return 0;
    var r = 0,
      a = e.suspendedLanes,
      o = e.pingedLanes,
      i = 268435455 & n;
    if (0 !== i) {
      var s = i & ~a;
      0 !== s ? (r = vo(s)) : 0 !== (o &= i) && (r = vo(o));
    } else 0 !== (i = n & ~a) ? (r = vo(i)) : 0 !== o && (r = vo(o));
    if (0 === r) return 0;
    if (
      0 !== t &&
      t !== r &&
      0 == (t & a) &&
      ((a = r & -r) >= (o = t & -t) || (16 === a && 0 != (4194240 & o)))
    )
      return t;
    if ((0 != (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes)))
      for (e = e.entanglements, t &= r; 0 < t; )
        (a = 1 << (n = 31 - fo(t))), (r |= e[n]), (t &= ~a);
    return r;
  }
  function bo(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
      default:
        return -1;
    }
  }
  function wo(e) {
    return 0 !== (e = -1073741825 & e.pendingLanes)
      ? e
      : 1073741824 & e
      ? 1073741824
      : 0;
  }
  function _o() {
    var e = go;
    return 0 == (4194240 & (go <<= 1)) && (go = 64), e;
  }
  function So(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Eo(e, t, n) {
    (e.pendingLanes |= t),
      536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      ((e = e.eventTimes)[(t = 31 - fo(t))] = n);
  }
  function ko(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - fo(n),
        a = 1 << r;
      (a & t) | (e[r] & t) && (e[r] |= t), (n &= ~a);
    }
  }
  var Oo = 0;
  function xo(e) {
    return 1 < (e &= -e)
      ? 4 < e
        ? 0 != (268435455 & e)
          ? 16
          : 536870912
        : 4
      : 1;
  }
  var Co,
    To,
    No,
    Ro,
    Lo,
    Po = !1,
    jo = [],
    Io = null,
    Ao = null,
    Do = null,
    zo = new Map(),
    Mo = new Map(),
    Uo = [],
    Fo =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " "
      );
  function Ho(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Io = null;
        break;
      case "dragenter":
      case "dragleave":
        Ao = null;
        break;
      case "mouseover":
      case "mouseout":
        Do = null;
        break;
      case "pointerover":
      case "pointerout":
        zo.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Mo.delete(t.pointerId);
    }
  }
  function Vo(e, t, n, r, a, o) {
    return null === e || e.nativeEvent !== o
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: o,
          targetContainers: [a],
        }),
        null !== t && null !== (t = _l(t)) && To(t),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        null !== a && -1 === t.indexOf(a) && t.push(a),
        e);
  }
  function Bo(e) {
    var t = wl(e.target);
    if (null !== t) {
      var n = Ga(t);
      if (null !== n)
        if (13 === (t = n.tag)) {
          if (null !== (t = qa(n)))
            return (
              (e.blockedOn = t),
              void Lo(e.priority, function () {
                No(n);
              })
            );
        } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated)
          return void (e.blockedOn =
            3 === n.tag ? n.stateNode.containerInfo : null);
    }
    e.blockedOn = null;
  }
  function Wo(e) {
    if (null !== e.blockedOn) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = ti(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (null !== n)
        return null !== (t = _l(n)) && To(t), (e.blockedOn = n), !1;
      var r = new (n = e.nativeEvent).constructor(n.type, n);
      (Oa = r), n.target.dispatchEvent(r), (Oa = null), t.shift();
    }
    return !0;
  }
  function Ko(e, t, n) {
    Wo(e) && n.delete(t);
  }
  function $o() {
    (Po = !1),
      null !== Io && Wo(Io) && (Io = null),
      null !== Ao && Wo(Ao) && (Ao = null),
      null !== Do && Wo(Do) && (Do = null),
      zo.forEach(Ko),
      Mo.forEach(Ko);
  }
  function Go(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Po ||
        ((Po = !0),
        ur.unstable_scheduleCallback(ur.unstable_NormalPriority, $o)));
  }
  function qo(e) {
    function t(t) {
      return Go(t, e);
    }
    if (0 < jo.length) {
      Go(jo[0], e);
      for (var n = 1; n < jo.length; n++) {
        var r = jo[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      null !== Io && Go(Io, e),
        null !== Ao && Go(Ao, e),
        null !== Do && Go(Do, e),
        zo.forEach(t),
        Mo.forEach(t),
        n = 0;
      n < Uo.length;
      n++
    )
      (r = Uo[n]).blockedOn === e && (r.blockedOn = null);
    for (; 0 < Uo.length && null === (n = Uo[0]).blockedOn; )
      Bo(n), null === n.blockedOn && Uo.shift();
  }
  var Xo = Or.ReactCurrentBatchConfig,
    Jo = !0;
  function Zo(e, t, n, r) {
    var a = Oo,
      o = Xo.transition;
    Xo.transition = null;
    try {
      (Oo = 1), Qo(e, t, n, r);
    } finally {
      (Oo = a), (Xo.transition = o);
    }
  }
  function Yo(e, t, n, r) {
    var a = Oo,
      o = Xo.transition;
    Xo.transition = null;
    try {
      (Oo = 4), Qo(e, t, n, r);
    } finally {
      (Oo = a), (Xo.transition = o);
    }
  }
  function Qo(e, t, n, r) {
    if (Jo) {
      var a = ti(e, t, n, r);
      if (null === a) $s(e, t, r, ei, n), Ho(e, r);
      else if (
        (function (e, t, n, r, a) {
          switch (t) {
            case "focusin":
              return (Io = Vo(Io, e, t, n, r, a)), !0;
            case "dragenter":
              return (Ao = Vo(Ao, e, t, n, r, a)), !0;
            case "mouseover":
              return (Do = Vo(Do, e, t, n, r, a)), !0;
            case "pointerover":
              var o = a.pointerId;
              return zo.set(o, Vo(zo.get(o) || null, e, t, n, r, a)), !0;
            case "gotpointercapture":
              return (
                (o = a.pointerId),
                Mo.set(o, Vo(Mo.get(o) || null, e, t, n, r, a)),
                !0
              );
          }
          return !1;
        })(a, e, t, n, r)
      )
        r.stopPropagation();
      else if ((Ho(e, r), 4 & t && -1 < Fo.indexOf(e))) {
        for (; null !== a; ) {
          var o = _l(a);
          if (
            (null !== o && Co(o),
            null === (o = ti(e, t, n, r)) && $s(e, t, r, ei, n),
            o === a)
          )
            break;
          a = o;
        }
        null !== a && r.stopPropagation();
      } else $s(e, t, r, null, n);
    }
  }
  var ei = null;
  function ti(e, t, n, r) {
    if (((ei = null), null !== (e = wl((e = xa(r))))))
      if (null === (t = Ga(e))) e = null;
      else if (13 === (n = t.tag)) {
        if (null !== (e = qa(t))) return e;
        e = null;
      } else if (3 === n) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return 3 === t.tag ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return (ei = e), null;
  }
  function ni(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ro()) {
          case ao:
            return 1;
          case oo:
            return 4;
          case io:
          case so:
            return 16;
          case lo:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var ri = null,
    ai = null,
    oi = null;
  function ii() {
    if (oi) return oi;
    var e,
      t,
      n = ai,
      r = n.length,
      a = "value" in ri ? ri.value : ri.textContent,
      o = a.length;
    for (e = 0; e < r && n[e] === a[e]; e++);
    var i = r - e;
    for (t = 1; t <= i && n[r - t] === a[o - t]; t++);
    return (oi = a.slice(e, 1 < t ? 1 - t : void 0));
  }
  function si(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? 0 === (e = e.charCode) && 13 === t && (e = 13)
        : (e = t),
      10 === e && (e = 13),
      32 <= e || 13 === e ? e : 0
    );
  }
  function li() {
    return !0;
  }
  function ui() {
    return !1;
  }
  function ci(e) {
    function t(t, n, r, a, o) {
      for (var i in ((this._reactName = t),
      (this._targetInst = r),
      (this.type = n),
      (this.nativeEvent = a),
      (this.target = o),
      (this.currentTarget = null),
      e))
        e.hasOwnProperty(i) && ((t = e[i]), (this[i] = t ? t(a) : a[i]));
      return (
        (this.isDefaultPrevented = (
          null != a.defaultPrevented ? a.defaultPrevented : !1 === a.returnValue
        )
          ? li
          : ui),
        (this.isPropagationStopped = ui),
        this
      );
    }
    return (
      Vr(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault
              ? e.preventDefault()
              : "unknown" != typeof e.returnValue && (e.returnValue = !1),
            (this.isDefaultPrevented = li));
        },
        stopPropagation: function () {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation
              ? e.stopPropagation()
              : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
            (this.isPropagationStopped = li));
        },
        persist: function () {},
        isPersistent: li,
      }),
      t
    );
  }
  var di,
    fi,
    pi,
    hi = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    gi = ci(hi),
    mi = Vr({}, hi, { view: 0, detail: 0 }),
    vi = ci(mi),
    yi = Vr({}, mi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ni,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return void 0 === e.relatedTarget
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== pi &&
              (pi && "mousemove" === e.type
                ? ((di = e.screenX - pi.screenX), (fi = e.screenY - pi.screenY))
                : (fi = di = 0),
              (pi = e)),
            di);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : fi;
      },
    }),
    bi = ci(yi),
    wi = ci(Vr({}, yi, { dataTransfer: 0 })),
    _i = ci(Vr({}, mi, { relatedTarget: 0 })),
    Si = ci(Vr({}, hi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
    Ei = ci(
      Vr({}, hi, {
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      })
    ),
    ki = ci(Vr({}, hi, { data: 0 })),
    Oi = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    xi = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Ci = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Ti(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : !!(e = Ci[e]) && !!t[e];
  }
  function Ni() {
    return Ti;
  }
  var Ri = ci(
      Vr({}, mi, {
        key: function (e) {
          if (e.key) {
            var t = Oi[e.key] || e.key;
            if ("Unidentified" !== t) return t;
          }
          return "keypress" === e.type
            ? 13 === (e = si(e))
              ? "Enter"
              : String.fromCharCode(e)
            : "keydown" === e.type || "keyup" === e.type
            ? xi[e.keyCode] || "Unidentified"
            : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Ni,
        charCode: function (e) {
          return "keypress" === e.type ? si(e) : 0;
        },
        keyCode: function (e) {
          return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
        },
        which: function (e) {
          return "keypress" === e.type
            ? si(e)
            : "keydown" === e.type || "keyup" === e.type
            ? e.keyCode
            : 0;
        },
      })
    ),
    Li = ci(
      Vr({}, yi, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
      })
    ),
    Pi = ci(
      Vr({}, mi, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Ni,
      })
    ),
    ji = ci(Vr({}, hi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
    Ii = ci(
      Vr({}, yi, {
        deltaX: function (e) {
          return "deltaX" in e
            ? e.deltaX
            : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
        },
        deltaY: function (e) {
          return "deltaY" in e
            ? e.deltaY
            : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      })
    ),
    Ai = [9, 13, 27, 32],
    Di = gr && "CompositionEvent" in window,
    zi = null;
  gr && "documentMode" in document && (zi = document.documentMode);
  var Mi = gr && "TextEvent" in window && !zi,
    Ui = gr && (!Di || (zi && 8 < zi && 11 >= zi)),
    Fi = String.fromCharCode(32),
    Hi = !1;
  function Vi(e, t) {
    switch (e) {
      case "keyup":
        return -1 !== Ai.indexOf(t.keyCode);
      case "keydown":
        return 229 !== t.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Bi(e) {
    return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
  }
  var Wi = !1;
  var Ki = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function $i(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return "input" === t ? !!Ki[e.type] : "textarea" === t;
  }
  function Gi(e, t, n, r) {
    La(r),
      0 < (t = qs(t, "onChange")).length &&
        ((n = new gi("onChange", "change", null, n, r)),
        e.push({ event: n, listeners: t }));
  }
  var qi = null,
    Xi = null;
  function Ji(e) {
    Fs(e, 0);
  }
  function Zi(e) {
    if (Yr(Sl(e))) return e;
  }
  function Yi(e, t) {
    if ("change" === e) return t;
  }
  var Qi = !1;
  if (gr) {
    var es;
    if (gr) {
      var ts = "oninput" in document;
      if (!ts) {
        var ns = document.createElement("div");
        ns.setAttribute("oninput", "return;"),
          (ts = "function" == typeof ns.oninput);
      }
      es = ts;
    } else es = !1;
    Qi = es && (!document.documentMode || 9 < document.documentMode);
  }
  function rs() {
    qi && (qi.detachEvent("onpropertychange", as), (Xi = qi = null));
  }
  function as(e) {
    if ("value" === e.propertyName && Zi(Xi)) {
      var t = [];
      Gi(t, Xi, e, xa(e)), Da(Ji, t);
    }
  }
  function os(e, t, n) {
    "focusin" === e
      ? (rs(), (Xi = n), (qi = t).attachEvent("onpropertychange", as))
      : "focusout" === e && rs();
  }
  function is(e) {
    if ("selectionchange" === e || "keyup" === e || "keydown" === e)
      return Zi(Xi);
  }
  function ss(e, t) {
    if ("click" === e) return Zi(t);
  }
  function ls(e, t) {
    if ("input" === e || "change" === e) return Zi(t);
  }
  var us =
    "function" == typeof Object.is
      ? Object.is
      : function (e, t) {
          return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
        };
  function cs(e, t) {
    if (us(e, t)) return !0;
    if (
      "object" != typeof e ||
      null === e ||
      "object" != typeof t ||
      null === t
    )
      return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var a = n[r];
      if (!mr.call(t, a) || !us(e[a], t[a])) return !1;
    }
    return !0;
  }
  function ds(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function fs(e, t) {
    var n,
      r = ds(e);
    for (e = 0; r; ) {
      if (3 === r.nodeType) {
        if (((n = e + r.textContent.length), e <= t && n >= t))
          return { node: r, offset: t - e };
        e = n;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = ds(r);
    }
  }
  function ps(e, t) {
    return (
      !(!e || !t) &&
      (e === t ||
        ((!e || 3 !== e.nodeType) &&
          (t && 3 === t.nodeType
            ? ps(e, t.parentNode)
            : "contains" in e
            ? e.contains(t)
            : !!e.compareDocumentPosition &&
              !!(16 & e.compareDocumentPosition(t)))))
    );
  }
  function hs() {
    for (var e = window, t = Qr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = "string" == typeof t.contentWindow.location.href;
      } catch (r) {
        n = !1;
      }
      if (!n) break;
      t = Qr((e = t.contentWindow).document);
    }
    return t;
  }
  function gs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      (("input" === t &&
        ("text" === e.type ||
          "search" === e.type ||
          "tel" === e.type ||
          "url" === e.type ||
          "password" === e.type)) ||
        "textarea" === t ||
        "true" === e.contentEditable)
    );
  }
  function ms(e) {
    var t = hs(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (
      t !== n &&
      n &&
      n.ownerDocument &&
      ps(n.ownerDocument.documentElement, n)
    ) {
      if (null !== r && gs(n))
        if (
          ((t = r.start),
          void 0 === (e = r.end) && (e = t),
          "selectionStart" in n)
        )
          (n.selectionStart = t),
            (n.selectionEnd = Math.min(e, n.value.length));
        else if (
          (e = ((t = n.ownerDocument || document) && t.defaultView) || window)
            .getSelection
        ) {
          e = e.getSelection();
          var a = n.textContent.length,
            o = Math.min(r.start, a);
          (r = void 0 === r.end ? o : Math.min(r.end, a)),
            !e.extend && o > r && ((a = r), (r = o), (o = a)),
            (a = fs(n, o));
          var i = fs(n, r);
          a &&
            i &&
            (1 !== e.rangeCount ||
              e.anchorNode !== a.node ||
              e.anchorOffset !== a.offset ||
              e.focusNode !== i.node ||
              e.focusOffset !== i.offset) &&
            ((t = t.createRange()).setStart(a.node, a.offset),
            e.removeAllRanges(),
            o > r
              ? (e.addRange(t), e.extend(i.node, i.offset))
              : (t.setEnd(i.node, i.offset), e.addRange(t)));
        }
      for (t = [], e = n; (e = e.parentNode); )
        1 === e.nodeType &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for ("function" == typeof n.focus && n.focus(), n = 0; n < t.length; n++)
        ((e = t[n]).element.scrollLeft = e.left), (e.element.scrollTop = e.top);
    }
  }
  var vs = gr && "documentMode" in document && 11 >= document.documentMode,
    ys = null,
    bs = null,
    ws = null,
    _s = !1;
  function Ss(e, t, n) {
    var r =
      n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
    _s ||
      null == ys ||
      ys !== Qr(r) ||
      ("selectionStart" in (r = ys) && gs(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : (r = {
            anchorNode: (r = (
              (r.ownerDocument && r.ownerDocument.defaultView) ||
              window
            ).getSelection()).anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          }),
      (ws && cs(ws, r)) ||
        ((ws = r),
        0 < (r = qs(bs, "onSelect")).length &&
          ((t = new gi("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = ys))));
  }
  function Es(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var ks = {
      animationend: Es("Animation", "AnimationEnd"),
      animationiteration: Es("Animation", "AnimationIteration"),
      animationstart: Es("Animation", "AnimationStart"),
      transitionend: Es("Transition", "TransitionEnd"),
    },
    Os = {},
    xs = {};
  function Cs(e) {
    if (Os[e]) return Os[e];
    if (!ks[e]) return e;
    var t,
      n = ks[e];
    for (t in n) if (n.hasOwnProperty(t) && t in xs) return (Os[e] = n[t]);
    return e;
  }
  gr &&
    ((xs = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete ks.animationend.animation,
      delete ks.animationiteration.animation,
      delete ks.animationstart.animation),
    "TransitionEvent" in window || delete ks.transitionend.transition);
  var Ts = Cs("animationend"),
    Ns = Cs("animationiteration"),
    Rs = Cs("animationstart"),
    Ls = Cs("transitionend"),
    Ps = new Map(),
    js =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  function Is(e, t) {
    Ps.set(e, t), pr(t, [e]);
  }
  for (var As = 0; As < js.length; As++) {
    var Ds = js[As];
    Is(Ds.toLowerCase(), "on" + (Ds[0].toUpperCase() + Ds.slice(1)));
  }
  Is(Ts, "onAnimationEnd"),
    Is(Ns, "onAnimationIteration"),
    Is(Rs, "onAnimationStart"),
    Is("dblclick", "onDoubleClick"),
    Is("focusin", "onFocus"),
    Is("focusout", "onBlur"),
    Is(Ls, "onTransitionEnd"),
    hr("onMouseEnter", ["mouseout", "mouseover"]),
    hr("onMouseLeave", ["mouseout", "mouseover"]),
    hr("onPointerEnter", ["pointerout", "pointerover"]),
    hr("onPointerLeave", ["pointerout", "pointerover"]),
    pr(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    pr(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    pr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    pr(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    pr(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    pr(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var zs =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    Ms = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(zs)
    );
  function Us(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n),
      (function (e, t, n, r, a, o, i, s, l) {
        if (($a.apply(this, arguments), Ha)) {
          if (!Ha) throw Error(cr(198));
          var u = Va;
          (Ha = !1), (Va = null), Ba || ((Ba = !0), (Wa = u));
        }
      })(r, t, void 0, e),
      (e.currentTarget = null);
  }
  function Fs(e, t) {
    t = 0 != (4 & t);
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        a = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var i = r.length - 1; 0 <= i; i--) {
            var s = r[i],
              l = s.instance,
              u = s.currentTarget;
            if (((s = s.listener), l !== o && a.isPropagationStopped()))
              break e;
            Us(a, s, u), (o = l);
          }
        else
          for (i = 0; i < r.length; i++) {
            if (
              ((l = (s = r[i]).instance),
              (u = s.currentTarget),
              (s = s.listener),
              l !== o && a.isPropagationStopped())
            )
              break e;
            Us(a, s, u), (o = l);
          }
      }
    }
    if (Ba) throw ((e = Wa), (Ba = !1), (Wa = null), e);
  }
  function Hs(e, t) {
    var n = t[vl];
    void 0 === n && (n = t[vl] = new Set());
    var r = e + "__bubble";
    n.has(r) || (Ks(t, e, 2, !1), n.add(r));
  }
  function Vs(e, t, n) {
    var r = 0;
    t && (r |= 4), Ks(n, e, r, t);
  }
  var Bs = "_reactListening" + Math.random().toString(36).slice(2);
  function Ws(e) {
    if (!e[Bs]) {
      (e[Bs] = !0),
        dr.forEach(function (t) {
          "selectionchange" !== t && (Ms.has(t) || Vs(t, !1, e), Vs(t, !0, e));
        });
      var t = 9 === e.nodeType ? e : e.ownerDocument;
      null === t || t[Bs] || ((t[Bs] = !0), Vs("selectionchange", !1, t));
    }
  }
  function Ks(e, t, n, r) {
    switch (ni(t)) {
      case 1:
        var a = Zo;
        break;
      case 4:
        a = Yo;
        break;
      default:
        a = Qo;
    }
    (n = a.bind(null, t, n, e)),
      (a = void 0),
      !Ma ||
        ("touchstart" !== t && "touchmove" !== t && "wheel" !== t) ||
        (a = !0),
      r
        ? void 0 !== a
          ? e.addEventListener(t, n, { capture: !0, passive: a })
          : e.addEventListener(t, n, !0)
        : void 0 !== a
        ? e.addEventListener(t, n, { passive: a })
        : e.addEventListener(t, n, !1);
  }
  function $s(e, t, n, r, a) {
    var o = r;
    if (0 == (1 & t) && 0 == (2 & t) && null !== r)
      e: for (;;) {
        if (null === r) return;
        var i = r.tag;
        if (3 === i || 4 === i) {
          var s = r.stateNode.containerInfo;
          if (s === a || (8 === s.nodeType && s.parentNode === a)) break;
          if (4 === i)
            for (i = r.return; null !== i; ) {
              var l = i.tag;
              if (
                (3 === l || 4 === l) &&
                ((l = i.stateNode.containerInfo) === a ||
                  (8 === l.nodeType && l.parentNode === a))
              )
                return;
              i = i.return;
            }
          for (; null !== s; ) {
            if (null === (i = wl(s))) return;
            if (5 === (l = i.tag) || 6 === l) {
              r = o = i;
              continue e;
            }
            s = s.parentNode;
          }
        }
        r = r.return;
      }
    Da(function () {
      var r = o,
        a = xa(n),
        i = [];
      e: {
        var s = Ps.get(e);
        if (void 0 !== s) {
          var l = gi,
            u = e;
          switch (e) {
            case "keypress":
              if (0 === si(n)) break e;
            case "keydown":
            case "keyup":
              l = Ri;
              break;
            case "focusin":
              (u = "focus"), (l = _i);
              break;
            case "focusout":
              (u = "blur"), (l = _i);
              break;
            case "beforeblur":
            case "afterblur":
              l = _i;
              break;
            case "click":
              if (2 === n.button) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              l = bi;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              l = wi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              l = Pi;
              break;
            case Ts:
            case Ns:
            case Rs:
              l = Si;
              break;
            case Ls:
              l = ji;
              break;
            case "scroll":
              l = vi;
              break;
            case "wheel":
              l = Ii;
              break;
            case "copy":
            case "cut":
            case "paste":
              l = Ei;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              l = Li;
          }
          var c = 0 != (4 & t),
            d = !c && "scroll" === e,
            f = c ? (null !== s ? s + "Capture" : null) : s;
          c = [];
          for (var p, h = r; null !== h; ) {
            var g = (p = h).stateNode;
            if (
              (5 === p.tag &&
                null !== g &&
                ((p = g),
                null !== f && null != (g = za(h, f)) && c.push(Gs(h, g, p))),
              d)
            )
              break;
            h = h.return;
          }
          0 < c.length &&
            ((s = new l(s, u, null, n, a)), i.push({ event: s, listeners: c }));
        }
      }
      if (0 == (7 & t)) {
        if (
          ((l = "mouseout" === e || "pointerout" === e),
          (!(s = "mouseover" === e || "pointerover" === e) ||
            n === Oa ||
            !(u = n.relatedTarget || n.fromElement) ||
            (!wl(u) && !u[ml])) &&
            (l || s) &&
            ((s =
              a.window === a
                ? a
                : (s = a.ownerDocument)
                ? s.defaultView || s.parentWindow
                : window),
            l
              ? ((l = r),
                null !==
                  (u = (u = n.relatedTarget || n.toElement) ? wl(u) : null) &&
                  (u !== (d = Ga(u)) || (5 !== u.tag && 6 !== u.tag)) &&
                  (u = null))
              : ((l = null), (u = r)),
            l !== u))
        ) {
          if (
            ((c = bi),
            (g = "onMouseLeave"),
            (f = "onMouseEnter"),
            (h = "mouse"),
            ("pointerout" !== e && "pointerover" !== e) ||
              ((c = Li),
              (g = "onPointerLeave"),
              (f = "onPointerEnter"),
              (h = "pointer")),
            (d = null == l ? s : Sl(l)),
            (p = null == u ? s : Sl(u)),
            ((s = new c(g, h + "leave", l, n, a)).target = d),
            (s.relatedTarget = p),
            (g = null),
            wl(a) === r &&
              (((c = new c(f, h + "enter", u, n, a)).target = p),
              (c.relatedTarget = d),
              (g = c)),
            (d = g),
            l && u)
          )
            e: {
              for (f = u, h = 0, p = c = l; p; p = Xs(p)) h++;
              for (p = 0, g = f; g; g = Xs(g)) p++;
              for (; 0 < h - p; ) (c = Xs(c)), h--;
              for (; 0 < p - h; ) (f = Xs(f)), p--;
              for (; h--; ) {
                if (c === f || (null !== f && c === f.alternate)) break e;
                (c = Xs(c)), (f = Xs(f));
              }
              c = null;
            }
          else c = null;
          null !== l && Js(i, s, l, c, !1),
            null !== u && null !== d && Js(i, d, u, c, !0);
        }
        if (
          "select" ===
            (l =
              (s = r ? Sl(r) : window).nodeName && s.nodeName.toLowerCase()) ||
          ("input" === l && "file" === s.type)
        )
          var m = Yi;
        else if ($i(s))
          if (Qi) m = ls;
          else {
            m = is;
            var v = os;
          }
        else
          (l = s.nodeName) &&
            "input" === l.toLowerCase() &&
            ("checkbox" === s.type || "radio" === s.type) &&
            (m = ss);
        switch (
          (m && (m = m(e, r))
            ? Gi(i, m, n, a)
            : (v && v(e, s, r),
              "focusout" === e &&
                (v = s._wrapperState) &&
                v.controlled &&
                "number" === s.type &&
                oa(s, "number", s.value)),
          (v = r ? Sl(r) : window),
          e)
        ) {
          case "focusin":
            ($i(v) || "true" === v.contentEditable) &&
              ((ys = v), (bs = r), (ws = null));
            break;
          case "focusout":
            ws = bs = ys = null;
            break;
          case "mousedown":
            _s = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (_s = !1), Ss(i, n, a);
            break;
          case "selectionchange":
            if (vs) break;
          case "keydown":
          case "keyup":
            Ss(i, n, a);
        }
        var y;
        if (Di)
          e: {
            switch (e) {
              case "compositionstart":
                var b = "onCompositionStart";
                break e;
              case "compositionend":
                b = "onCompositionEnd";
                break e;
              case "compositionupdate":
                b = "onCompositionUpdate";
                break e;
            }
            b = void 0;
          }
        else
          Wi
            ? Vi(e, n) && (b = "onCompositionEnd")
            : "keydown" === e &&
              229 === n.keyCode &&
              (b = "onCompositionStart");
        b &&
          (Ui &&
            "ko" !== n.locale &&
            (Wi || "onCompositionStart" !== b
              ? "onCompositionEnd" === b && Wi && (y = ii())
              : ((ai = "value" in (ri = a) ? ri.value : ri.textContent),
                (Wi = !0))),
          0 < (v = qs(r, b)).length &&
            ((b = new ki(b, e, null, n, a)),
            i.push({ event: b, listeners: v }),
            y ? (b.data = y) : null !== (y = Bi(n)) && (b.data = y))),
          (y = Mi
            ? (function (e, t) {
                switch (e) {
                  case "compositionend":
                    return Bi(t);
                  case "keypress":
                    return 32 !== t.which ? null : ((Hi = !0), Fi);
                  case "textInput":
                    return (e = t.data) === Fi && Hi ? null : e;
                  default:
                    return null;
                }
              })(e, n)
            : (function (e, t) {
                if (Wi)
                  return "compositionend" === e || (!Di && Vi(e, t))
                    ? ((e = ii()), (oi = ai = ri = null), (Wi = !1), e)
                    : null;
                switch (e) {
                  case "paste":
                    return null;
                  case "keypress":
                    if (
                      !(t.ctrlKey || t.altKey || t.metaKey) ||
                      (t.ctrlKey && t.altKey)
                    ) {
                      if (t.char && 1 < t.char.length) return t.char;
                      if (t.which) return String.fromCharCode(t.which);
                    }
                    return null;
                  case "compositionend":
                    return Ui && "ko" !== t.locale ? null : t.data;
                  default:
                    return null;
                }
              })(e, n)) &&
            0 < (r = qs(r, "onBeforeInput")).length &&
            ((a = new ki("onBeforeInput", "beforeinput", null, n, a)),
            i.push({ event: a, listeners: r }),
            (a.data = y));
      }
      Fs(i, t);
    });
  }
  function Gs(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function qs(e, t) {
    for (var n = t + "Capture", r = []; null !== e; ) {
      var a = e,
        o = a.stateNode;
      5 === a.tag &&
        null !== o &&
        ((a = o),
        null != (o = za(e, n)) && r.unshift(Gs(e, o, a)),
        null != (o = za(e, t)) && r.push(Gs(e, o, a))),
        (e = e.return);
    }
    return r;
  }
  function Xs(e) {
    if (null === e) return null;
    do {
      e = e.return;
    } while (e && 5 !== e.tag);
    return e || null;
  }
  function Js(e, t, n, r, a) {
    for (var o = t._reactName, i = []; null !== n && n !== r; ) {
      var s = n,
        l = s.alternate,
        u = s.stateNode;
      if (null !== l && l === r) break;
      5 === s.tag &&
        null !== u &&
        ((s = u),
        a
          ? null != (l = za(n, o)) && i.unshift(Gs(n, l, s))
          : a || (null != (l = za(n, o)) && i.push(Gs(n, l, s)))),
        (n = n.return);
    }
    0 !== i.length && e.push({ event: t, listeners: i });
  }
  var Zs = /\r\n?/g,
    Ys = /\u0000|\uFFFD/g;
  function Qs(e) {
    return ("string" == typeof e ? e : "" + e)
      .replace(Zs, "\n")
      .replace(Ys, "");
  }
  function el(e, t, n) {
    if (((t = Qs(t)), Qs(e) !== t && n)) throw Error(cr(425));
  }
  function tl() {}
  var nl = null,
    rl = null;
  function al(e, t) {
    return (
      "textarea" === e ||
      "noscript" === e ||
      "string" == typeof t.children ||
      "number" == typeof t.children ||
      ("object" == typeof t.dangerouslySetInnerHTML &&
        null !== t.dangerouslySetInnerHTML &&
        null != t.dangerouslySetInnerHTML.__html)
    );
  }
  var ol = "function" == typeof setTimeout ? setTimeout : void 0,
    il = "function" == typeof clearTimeout ? clearTimeout : void 0,
    sl = "function" == typeof Promise ? Promise : void 0,
    ll =
      "function" == typeof queueMicrotask
        ? queueMicrotask
        : void 0 !== sl
        ? function (e) {
            return sl.resolve(null).then(e).catch(ul);
          }
        : ol;
  function ul(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function cl(e, t) {
    var n = t,
      r = 0;
    do {
      var a = n.nextSibling;
      if ((e.removeChild(n), a && 8 === a.nodeType))
        if ("/$" === (n = a.data)) {
          if (0 === r) return e.removeChild(a), void qo(t);
          r--;
        } else ("$" !== n && "$?" !== n && "$!" !== n) || r++;
      n = a;
    } while (n);
    qo(t);
  }
  function dl(e) {
    for (; null != e; e = e.nextSibling) {
      var t = e.nodeType;
      if (1 === t || 3 === t) break;
      if (8 === t) {
        if ("$" === (t = e.data) || "$!" === t || "$?" === t) break;
        if ("/$" === t) return null;
      }
    }
    return e;
  }
  function fl(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (8 === e.nodeType) {
        var n = e.data;
        if ("$" === n || "$!" === n || "$?" === n) {
          if (0 === t) return e;
          t--;
        } else "/$" === n && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var pl = Math.random().toString(36).slice(2),
    hl = "__reactFiber$" + pl,
    gl = "__reactProps$" + pl,
    ml = "__reactContainer$" + pl,
    vl = "__reactEvents$" + pl,
    yl = "__reactListeners$" + pl,
    bl = "__reactHandles$" + pl;
  function wl(e) {
    var t = e[hl];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[ml] || n[hl])) {
        if (
          ((n = t.alternate),
          null !== t.child || (null !== n && null !== n.child))
        )
          for (e = fl(e); null !== e; ) {
            if ((n = e[hl])) return n;
            e = fl(e);
          }
        return t;
      }
      n = (e = n).parentNode;
    }
    return null;
  }
  function _l(e) {
    return !(e = e[hl] || e[ml]) ||
      (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
      ? null
      : e;
  }
  function Sl(e) {
    if (5 === e.tag || 6 === e.tag) return e.stateNode;
    throw Error(cr(33));
  }
  function El(e) {
    return e[gl] || null;
  }
  var kl = [],
    Ol = -1;
  function xl(e) {
    return { current: e };
  }
  function Cl(e) {
    0 > Ol || ((e.current = kl[Ol]), (kl[Ol] = null), Ol--);
  }
  function Tl(e, t) {
    Ol++, (kl[Ol] = e.current), (e.current = t);
  }
  var Nl = {},
    Rl = xl(Nl),
    Ll = xl(!1),
    Pl = Nl;
  function jl(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Nl;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var a,
      o = {};
    for (a in n) o[a] = t[a];
    return (
      r &&
        (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = o)),
      o
    );
  }
  function Il(e) {
    return null != (e = e.childContextTypes);
  }
  function Al() {
    Cl(Ll), Cl(Rl);
  }
  function Dl(e, t, n) {
    if (Rl.current !== Nl) throw Error(cr(168));
    Tl(Rl, t), Tl(Ll, n);
  }
  function zl(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), "function" != typeof r.getChildContext))
      return n;
    for (var a in (r = r.getChildContext()))
      if (!(a in t)) throw Error(cr(108, qr(e) || "Unknown", a));
    return Vr({}, n, r);
  }
  function Ml(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        Nl),
      (Pl = Rl.current),
      Tl(Rl, e),
      Tl(Ll, Ll.current),
      !0
    );
  }
  function Ul(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(cr(169));
    n
      ? ((e = zl(e, t, Pl)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        Cl(Ll),
        Cl(Rl),
        Tl(Rl, e))
      : Cl(Ll),
      Tl(Ll, n);
  }
  var Fl = null,
    Hl = !1,
    Vl = !1;
  function Bl(e) {
    null === Fl ? (Fl = [e]) : Fl.push(e);
  }
  function Wl() {
    if (!Vl && null !== Fl) {
      Vl = !0;
      var e = 0,
        t = Oo;
      try {
        var n = Fl;
        for (Oo = 1; e < n.length; e++) {
          var r = n[e];
          do {
            r = r(!0);
          } while (null !== r);
        }
        (Fl = null), (Hl = !1);
      } catch (a) {
        throw (null !== Fl && (Fl = Fl.slice(e + 1)), Ya(ao, Wl), a);
      } finally {
        (Oo = t), (Vl = !1);
      }
    }
    return null;
  }
  var Kl = [],
    $l = 0,
    Gl = null,
    ql = 0,
    Xl = [],
    Jl = 0,
    Zl = null,
    Yl = 1,
    Ql = "";
  function eu(e, t) {
    (Kl[$l++] = ql), (Kl[$l++] = Gl), (Gl = e), (ql = t);
  }
  function tu(e, t, n) {
    (Xl[Jl++] = Yl), (Xl[Jl++] = Ql), (Xl[Jl++] = Zl), (Zl = e);
    var r = Yl;
    e = Ql;
    var a = 32 - fo(r) - 1;
    (r &= ~(1 << a)), (n += 1);
    var o = 32 - fo(t) + a;
    if (30 < o) {
      var i = a - (a % 5);
      (o = (r & ((1 << i) - 1)).toString(32)),
        (r >>= i),
        (a -= i),
        (Yl = (1 << (32 - fo(t) + a)) | (n << a) | r),
        (Ql = o + e);
    } else (Yl = (1 << o) | (n << a) | r), (Ql = e);
  }
  function nu(e) {
    null !== e.return && (eu(e, 1), tu(e, 1, 0));
  }
  function ru(e) {
    for (; e === Gl; )
      (Gl = Kl[--$l]), (Kl[$l] = null), (ql = Kl[--$l]), (Kl[$l] = null);
    for (; e === Zl; )
      (Zl = Xl[--Jl]),
        (Xl[Jl] = null),
        (Ql = Xl[--Jl]),
        (Xl[Jl] = null),
        (Yl = Xl[--Jl]),
        (Xl[Jl] = null);
  }
  var au = null,
    ou = null,
    iu = !1,
    su = null;
  function lu(e, t) {
    var n = jp(5, null, null, 0);
    (n.elementType = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      null === (t = e.deletions)
        ? ((e.deletions = [n]), (e.flags |= 16))
        : t.push(n);
  }
  function uu(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          null !==
            (t =
              1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase()
                ? null
                : t) &&
          ((e.stateNode = t), (au = e), (ou = dl(t.firstChild)), !0)
        );
      case 6:
        return (
          null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) &&
          ((e.stateNode = t), (au = e), (ou = null), !0)
        );
      case 13:
        return (
          null !== (t = 8 !== t.nodeType ? null : t) &&
          ((n = null !== Zl ? { id: Yl, overflow: Ql } : null),
          (e.memoizedState = {
            dehydrated: t,
            treeContext: n,
            retryLane: 1073741824,
          }),
          ((n = jp(18, null, null, 0)).stateNode = t),
          (n.return = e),
          (e.child = n),
          (au = e),
          (ou = null),
          !0)
        );
      default:
        return !1;
    }
  }
  function cu(e) {
    return 0 != (1 & e.mode) && 0 == (128 & e.flags);
  }
  function du(e) {
    if (iu) {
      var t = ou;
      if (t) {
        var n = t;
        if (!uu(e, t)) {
          if (cu(e)) throw Error(cr(418));
          t = dl(n.nextSibling);
          var r = au;
          t && uu(e, t)
            ? lu(r, n)
            : ((e.flags = (-4097 & e.flags) | 2), (iu = !1), (au = e));
        }
      } else {
        if (cu(e)) throw Error(cr(418));
        (e.flags = (-4097 & e.flags) | 2), (iu = !1), (au = e);
      }
    }
  }
  function fu(e) {
    for (
      e = e.return;
      null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

    )
      e = e.return;
    au = e;
  }
  function pu(e) {
    if (e !== au) return !1;
    if (!iu) return fu(e), (iu = !0), !1;
    var t;
    if (
      ((t = 3 !== e.tag) &&
        !(t = 5 !== e.tag) &&
        (t =
          "head" !== (t = e.type) &&
          "body" !== t &&
          !al(e.type, e.memoizedProps)),
      t && (t = ou))
    ) {
      if (cu(e)) throw (hu(), Error(cr(418)));
      for (; t; ) lu(e, t), (t = dl(t.nextSibling));
    }
    if ((fu(e), 13 === e.tag)) {
      if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
        throw Error(cr(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (8 === e.nodeType) {
            var n = e.data;
            if ("/$" === n) {
              if (0 === t) {
                ou = dl(e.nextSibling);
                break e;
              }
              t--;
            } else ("$" !== n && "$!" !== n && "$?" !== n) || t++;
          }
          e = e.nextSibling;
        }
        ou = null;
      }
    } else ou = au ? dl(e.stateNode.nextSibling) : null;
    return !0;
  }
  function hu() {
    for (var e = ou; e; ) e = dl(e.nextSibling);
  }
  function gu() {
    (ou = au = null), (iu = !1);
  }
  function mu(e) {
    null === su ? (su = [e]) : su.push(e);
  }
  var vu = Or.ReactCurrentBatchConfig;
  function yu(e, t) {
    if (e && e.defaultProps) {
      for (var n in ((t = Vr({}, t)), (e = e.defaultProps)))
        void 0 === t[n] && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  var bu = xl(null),
    wu = null,
    _u = null,
    Su = null;
  function Eu() {
    Su = _u = wu = null;
  }
  function ku(e) {
    var t = bu.current;
    Cl(bu), (e._currentValue = t);
  }
  function Ou(e, t, n) {
    for (; null !== e; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
          : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function xu(e, t) {
    (wu = e),
      (Su = _u = null),
      null !== (e = e.dependencies) &&
        null !== e.firstContext &&
        (0 != (e.lanes & t) && (_d = !0), (e.firstContext = null));
  }
  function Cu(e) {
    var t = e._currentValue;
    if (Su !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), null === _u)) {
        if (null === wu) throw Error(cr(308));
        (_u = e), (wu.dependencies = { lanes: 0, firstContext: e });
      } else _u = _u.next = e;
    return t;
  }
  var Tu = null;
  function Nu(e) {
    null === Tu ? (Tu = [e]) : Tu.push(e);
  }
  function Ru(e, t, n, r) {
    var a = t.interleaved;
    return (
      null === a ? ((n.next = n), Nu(t)) : ((n.next = a.next), (a.next = n)),
      (t.interleaved = n),
      Lu(e, r)
    );
  }
  function Lu(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; )
      (e.childLanes |= t),
        null !== (n = e.alternate) && (n.childLanes |= t),
        (n = e),
        (e = e.return);
    return 3 === n.tag ? n.stateNode : null;
  }
  var Pu = !1;
  function ju(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function Iu(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        });
  }
  function Au(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function Du(e, t, n) {
    var r = e.updateQueue;
    if (null === r) return null;
    if (((r = r.shared), 0 != (2 & Rf))) {
      var a = r.pending;
      return (
        null === a ? (t.next = t) : ((t.next = a.next), (a.next = t)),
        (r.pending = t),
        Lu(e, n)
      );
    }
    return (
      null === (a = r.interleaved)
        ? ((t.next = t), Nu(r))
        : ((t.next = a.next), (a.next = t)),
      (r.interleaved = t),
      Lu(e, n)
    );
  }
  function zu(e, t, n) {
    if (null !== (t = t.updateQueue) && ((t = t.shared), 0 != (4194240 & n))) {
      var r = t.lanes;
      (n |= r &= e.pendingLanes), (t.lanes = n), ko(e, n);
    }
  }
  function Mu(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (null !== r && n === (r = r.updateQueue)) {
      var a = null,
        o = null;
      if (null !== (n = n.firstBaseUpdate)) {
        do {
          var i = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          };
          null === o ? (a = o = i) : (o = o.next = i), (n = n.next);
        } while (null !== n);
        null === o ? (a = o = t) : (o = o.next = t);
      } else a = o = t;
      return (
        (n = {
          baseState: r.baseState,
          firstBaseUpdate: a,
          lastBaseUpdate: o,
          shared: r.shared,
          effects: r.effects,
        }),
        void (e.updateQueue = n)
      );
    }
    null === (e = n.lastBaseUpdate) ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t);
  }
  function Uu(e, t, n, r) {
    var a = e.updateQueue;
    Pu = !1;
    var o = a.firstBaseUpdate,
      i = a.lastBaseUpdate,
      s = a.shared.pending;
    if (null !== s) {
      a.shared.pending = null;
      var l = s,
        u = l.next;
      (l.next = null), null === i ? (o = u) : (i.next = u), (i = l);
      var c = e.alternate;
      null !== c &&
        (s = (c = c.updateQueue).lastBaseUpdate) !== i &&
        (null === s ? (c.firstBaseUpdate = u) : (s.next = u),
        (c.lastBaseUpdate = l));
    }
    if (null !== o) {
      var d = a.baseState;
      for (i = 0, c = u = l = null, s = o; ; ) {
        var f = s.lane,
          p = s.eventTime;
        if ((r & f) === f) {
          null !== c &&
            (c = c.next =
              {
                eventTime: p,
                lane: 0,
                tag: s.tag,
                payload: s.payload,
                callback: s.callback,
                next: null,
              });
          e: {
            var h = e,
              g = s;
            switch (((f = t), (p = n), g.tag)) {
              case 1:
                if ("function" == typeof (h = g.payload)) {
                  d = h.call(p, d, f);
                  break e;
                }
                d = h;
                break e;
              case 3:
                h.flags = (-65537 & h.flags) | 128;
              case 0:
                if (
                  null ==
                  (f =
                    "function" == typeof (h = g.payload) ? h.call(p, d, f) : h)
                )
                  break e;
                d = Vr({}, d, f);
                break e;
              case 2:
                Pu = !0;
            }
          }
          null !== s.callback &&
            0 !== s.lane &&
            ((e.flags |= 64),
            null === (f = a.effects) ? (a.effects = [s]) : f.push(s));
        } else
          (p = {
            eventTime: p,
            lane: f,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null,
          }),
            null === c ? ((u = c = p), (l = d)) : (c = c.next = p),
            (i |= f);
        if (null === (s = s.next)) {
          if (null === (s = a.shared.pending)) break;
          (s = (f = s).next),
            (f.next = null),
            (a.lastBaseUpdate = f),
            (a.shared.pending = null);
        }
      }
      if (
        (null === c && (l = d),
        (a.baseState = l),
        (a.firstBaseUpdate = u),
        (a.lastBaseUpdate = c),
        null !== (t = a.shared.interleaved))
      ) {
        a = t;
        do {
          (i |= a.lane), (a = a.next);
        } while (a !== t);
      } else null === o && (a.shared.lanes = 0);
      (Mf |= i), (e.lanes = i), (e.memoizedState = d);
    }
  }
  function Fu(e, t, n) {
    if (((e = t.effects), (t.effects = null), null !== e))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          a = r.callback;
        if (null !== a) {
          if (((r.callback = null), (r = n), "function" != typeof a))
            throw Error(cr(191, a));
          a.call(r);
        }
      }
  }
  var Hu = new lr.Component().refs;
  function Vu(e, t, n, r) {
    (n = null == (n = n(r, (t = e.memoizedState))) ? t : Vr({}, t, n)),
      (e.memoizedState = n),
      0 === e.lanes && (e.updateQueue.baseState = n);
  }
  var Bu = {
    isMounted: function (e) {
      return !!(e = e._reactInternals) && Ga(e) === e;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = np(),
        a = rp(e),
        o = Au(r, a);
      (o.payload = t),
        null != n && (o.callback = n),
        null !== (t = Du(e, o, a)) && (ap(t, e, a, r), zu(t, e, a));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = np(),
        a = rp(e),
        o = Au(r, a);
      (o.tag = 1),
        (o.payload = t),
        null != n && (o.callback = n),
        null !== (t = Du(e, o, a)) && (ap(t, e, a, r), zu(t, e, a));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = np(),
        r = rp(e),
        a = Au(n, r);
      (a.tag = 2),
        null != t && (a.callback = t),
        null !== (t = Du(e, a, r)) && (ap(t, e, r, n), zu(t, e, r));
    },
  };
  function Wu(e, t, n, r, a, o, i) {
    return "function" == typeof (e = e.stateNode).shouldComponentUpdate
      ? e.shouldComponentUpdate(r, o, i)
      : !t.prototype ||
          !t.prototype.isPureReactComponent ||
          !cs(n, r) ||
          !cs(a, o);
  }
  function Ku(e, t, n) {
    var r = !1,
      a = Nl,
      o = t.contextType;
    return (
      "object" == typeof o && null !== o
        ? (o = Cu(o))
        : ((a = Il(t) ? Pl : Rl.current),
          (o = (r = null != (r = t.contextTypes)) ? jl(e, a) : Nl)),
      (t = new t(n, o)),
      (e.memoizedState =
        null !== t.state && void 0 !== t.state ? t.state : null),
      (t.updater = Bu),
      (e.stateNode = t),
      (t._reactInternals = e),
      r &&
        (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a),
        (e.__reactInternalMemoizedMaskedChildContext = o)),
      t
    );
  }
  function $u(e, t, n, r) {
    (e = t.state),
      "function" == typeof t.componentWillReceiveProps &&
        t.componentWillReceiveProps(n, r),
      "function" == typeof t.UNSAFE_componentWillReceiveProps &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && Bu.enqueueReplaceState(t, t.state, null);
  }
  function Gu(e, t, n, r) {
    var a = e.stateNode;
    (a.props = n), (a.state = e.memoizedState), (a.refs = Hu), ju(e);
    var o = t.contextType;
    "object" == typeof o && null !== o
      ? (a.context = Cu(o))
      : ((o = Il(t) ? Pl : Rl.current), (a.context = jl(e, o))),
      (a.state = e.memoizedState),
      "function" == typeof (o = t.getDerivedStateFromProps) &&
        (Vu(e, t, o, n), (a.state = e.memoizedState)),
      "function" == typeof t.getDerivedStateFromProps ||
        "function" == typeof a.getSnapshotBeforeUpdate ||
        ("function" != typeof a.UNSAFE_componentWillMount &&
          "function" != typeof a.componentWillMount) ||
        ((t = a.state),
        "function" == typeof a.componentWillMount && a.componentWillMount(),
        "function" == typeof a.UNSAFE_componentWillMount &&
          a.UNSAFE_componentWillMount(),
        t !== a.state && Bu.enqueueReplaceState(a, a.state, null),
        Uu(e, n, a, r),
        (a.state = e.memoizedState)),
      "function" == typeof a.componentDidMount && (e.flags |= 4194308);
  }
  function qu(e, t, n) {
    if (
      null !== (e = n.ref) &&
      "function" != typeof e &&
      "object" != typeof e
    ) {
      if (n._owner) {
        if ((n = n._owner)) {
          if (1 !== n.tag) throw Error(cr(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(cr(147, e));
        var a = r,
          o = "" + e;
        return null !== t &&
          null !== t.ref &&
          "function" == typeof t.ref &&
          t.ref._stringRef === o
          ? t.ref
          : (((t = function (e) {
              var t = a.refs;
              t === Hu && (t = a.refs = {}),
                null === e ? delete t[o] : (t[o] = e);
            })._stringRef = o),
            t);
      }
      if ("string" != typeof e) throw Error(cr(284));
      if (!n._owner) throw Error(cr(290, e));
    }
    return e;
  }
  function Xu(e, t) {
    throw (
      ((e = Object.prototype.toString.call(t)),
      Error(
        cr(
          31,
          "[object Object]" === e
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e
        )
      ))
    );
  }
  function Ju(e) {
    return (0, e._init)(e._payload);
  }
  function Zu(e) {
    function t(t, n) {
      if (e) {
        var r = t.deletions;
        null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
      }
    }
    function n(n, r) {
      if (!e) return null;
      for (; null !== r; ) t(n, r), (r = r.sibling);
      return null;
    }
    function r(e, t) {
      for (e = new Map(); null !== t; )
        null !== t.key ? e.set(t.key, t) : e.set(t.index, t), (t = t.sibling);
      return e;
    }
    function a(e, t) {
      return ((e = Ap(e, t)).index = 0), (e.sibling = null), e;
    }
    function o(t, n, r) {
      return (
        (t.index = r),
        e
          ? null !== (r = t.alternate)
            ? (r = r.index) < n
              ? ((t.flags |= 2), n)
              : r
            : ((t.flags |= 2), n)
          : ((t.flags |= 1048576), n)
      );
    }
    function i(t) {
      return e && null === t.alternate && (t.flags |= 2), t;
    }
    function s(e, t, n, r) {
      return null === t || 6 !== t.tag
        ? (((t = Up(n, e.mode, r)).return = e), t)
        : (((t = a(t, n)).return = e), t);
    }
    function l(e, t, n, r) {
      var o = n.type;
      return o === Tr
        ? c(e, t, n.props.children, r, n.key)
        : null !== t &&
          (t.elementType === o ||
            ("object" == typeof o &&
              null !== o &&
              o.$$typeof === zr &&
              Ju(o) === t.type))
        ? (((r = a(t, n.props)).ref = qu(e, t, n)), (r.return = e), r)
        : (((r = Dp(n.type, n.key, n.props, null, e.mode, r)).ref = qu(
            e,
            t,
            n
          )),
          (r.return = e),
          r);
    }
    function u(e, t, n, r) {
      return null === t ||
        4 !== t.tag ||
        t.stateNode.containerInfo !== n.containerInfo ||
        t.stateNode.implementation !== n.implementation
        ? (((t = Fp(n, e.mode, r)).return = e), t)
        : (((t = a(t, n.children || [])).return = e), t);
    }
    function c(e, t, n, r, o) {
      return null === t || 7 !== t.tag
        ? (((t = zp(n, e.mode, r, o)).return = e), t)
        : (((t = a(t, n)).return = e), t);
    }
    function d(e, t, n) {
      if (("string" == typeof t && "" !== t) || "number" == typeof t)
        return ((t = Up("" + t, e.mode, n)).return = e), t;
      if ("object" == typeof t && null !== t) {
        switch (t.$$typeof) {
          case xr:
            return (
              ((n = Dp(t.type, t.key, t.props, null, e.mode, n)).ref = qu(
                e,
                null,
                t
              )),
              (n.return = e),
              n
            );
          case Cr:
            return ((t = Fp(t, e.mode, n)).return = e), t;
          case zr:
            return d(e, (0, t._init)(t._payload), n);
        }
        if (ia(t) || Fr(t)) return ((t = zp(t, e.mode, n, null)).return = e), t;
        Xu(e, t);
      }
      return null;
    }
    function f(e, t, n, r) {
      var a = null !== t ? t.key : null;
      if (("string" == typeof n && "" !== n) || "number" == typeof n)
        return null !== a ? null : s(e, t, "" + n, r);
      if ("object" == typeof n && null !== n) {
        switch (n.$$typeof) {
          case xr:
            return n.key === a ? l(e, t, n, r) : null;
          case Cr:
            return n.key === a ? u(e, t, n, r) : null;
          case zr:
            return f(e, t, (a = n._init)(n._payload), r);
        }
        if (ia(n) || Fr(n)) return null !== a ? null : c(e, t, n, r, null);
        Xu(e, n);
      }
      return null;
    }
    function p(e, t, n, r, a) {
      if (("string" == typeof r && "" !== r) || "number" == typeof r)
        return s(t, (e = e.get(n) || null), "" + r, a);
      if ("object" == typeof r && null !== r) {
        switch (r.$$typeof) {
          case xr:
            return l(t, (e = e.get(null === r.key ? n : r.key) || null), r, a);
          case Cr:
            return u(t, (e = e.get(null === r.key ? n : r.key) || null), r, a);
          case zr:
            return p(e, t, n, (0, r._init)(r._payload), a);
        }
        if (ia(r) || Fr(r)) return c(t, (e = e.get(n) || null), r, a, null);
        Xu(t, r);
      }
      return null;
    }
    return function s(l, u, c, h) {
      if (
        ("object" == typeof c &&
          null !== c &&
          c.type === Tr &&
          null === c.key &&
          (c = c.props.children),
        "object" == typeof c && null !== c)
      ) {
        switch (c.$$typeof) {
          case xr:
            e: {
              for (var g = c.key, m = u; null !== m; ) {
                if (m.key === g) {
                  if ((g = c.type) === Tr) {
                    if (7 === m.tag) {
                      n(l, m.sibling),
                        ((u = a(m, c.props.children)).return = l),
                        (l = u);
                      break e;
                    }
                  } else if (
                    m.elementType === g ||
                    ("object" == typeof g &&
                      null !== g &&
                      g.$$typeof === zr &&
                      Ju(g) === m.type)
                  ) {
                    n(l, m.sibling),
                      ((u = a(m, c.props)).ref = qu(l, m, c)),
                      (u.return = l),
                      (l = u);
                    break e;
                  }
                  n(l, m);
                  break;
                }
                t(l, m), (m = m.sibling);
              }
              c.type === Tr
                ? (((u = zp(c.props.children, l.mode, h, c.key)).return = l),
                  (l = u))
                : (((h = Dp(c.type, c.key, c.props, null, l.mode, h)).ref = qu(
                    l,
                    u,
                    c
                  )),
                  (h.return = l),
                  (l = h));
            }
            return i(l);
          case Cr:
            e: {
              for (m = c.key; null !== u; ) {
                if (u.key === m) {
                  if (
                    4 === u.tag &&
                    u.stateNode.containerInfo === c.containerInfo &&
                    u.stateNode.implementation === c.implementation
                  ) {
                    n(l, u.sibling),
                      ((u = a(u, c.children || [])).return = l),
                      (l = u);
                    break e;
                  }
                  n(l, u);
                  break;
                }
                t(l, u), (u = u.sibling);
              }
              ((u = Fp(c, l.mode, h)).return = l), (l = u);
            }
            return i(l);
          case zr:
            return s(l, u, (m = c._init)(c._payload), h);
        }
        if (ia(c))
          return (function (a, i, s, l) {
            for (
              var u = null, c = null, h = i, g = (i = 0), m = null;
              null !== h && g < s.length;
              g++
            ) {
              h.index > g ? ((m = h), (h = null)) : (m = h.sibling);
              var v = f(a, h, s[g], l);
              if (null === v) {
                null === h && (h = m);
                break;
              }
              e && h && null === v.alternate && t(a, h),
                (i = o(v, i, g)),
                null === c ? (u = v) : (c.sibling = v),
                (c = v),
                (h = m);
            }
            if (g === s.length) return n(a, h), iu && eu(a, g), u;
            if (null === h) {
              for (; g < s.length; g++)
                null !== (h = d(a, s[g], l)) &&
                  ((i = o(h, i, g)),
                  null === c ? (u = h) : (c.sibling = h),
                  (c = h));
              return iu && eu(a, g), u;
            }
            for (h = r(a, h); g < s.length; g++)
              null !== (m = p(h, a, g, s[g], l)) &&
                (e &&
                  null !== m.alternate &&
                  h.delete(null === m.key ? g : m.key),
                (i = o(m, i, g)),
                null === c ? (u = m) : (c.sibling = m),
                (c = m));
            return (
              e &&
                h.forEach(function (e) {
                  return t(a, e);
                }),
              iu && eu(a, g),
              u
            );
          })(l, u, c, h);
        if (Fr(c))
          return (function (a, i, s, l) {
            var u = Fr(s);
            if ("function" != typeof u) throw Error(cr(150));
            if (null == (s = u.call(s))) throw Error(cr(151));
            for (
              var c = (u = null), h = i, g = (i = 0), m = null, v = s.next();
              null !== h && !v.done;
              g++, v = s.next()
            ) {
              h.index > g ? ((m = h), (h = null)) : (m = h.sibling);
              var y = f(a, h, v.value, l);
              if (null === y) {
                null === h && (h = m);
                break;
              }
              e && h && null === y.alternate && t(a, h),
                (i = o(y, i, g)),
                null === c ? (u = y) : (c.sibling = y),
                (c = y),
                (h = m);
            }
            if (v.done) return n(a, h), iu && eu(a, g), u;
            if (null === h) {
              for (; !v.done; g++, v = s.next())
                null !== (v = d(a, v.value, l)) &&
                  ((i = o(v, i, g)),
                  null === c ? (u = v) : (c.sibling = v),
                  (c = v));
              return iu && eu(a, g), u;
            }
            for (h = r(a, h); !v.done; g++, v = s.next())
              null !== (v = p(h, a, g, v.value, l)) &&
                (e &&
                  null !== v.alternate &&
                  h.delete(null === v.key ? g : v.key),
                (i = o(v, i, g)),
                null === c ? (u = v) : (c.sibling = v),
                (c = v));
            return (
              e &&
                h.forEach(function (e) {
                  return t(a, e);
                }),
              iu && eu(a, g),
              u
            );
          })(l, u, c, h);
        Xu(l, c);
      }
      return ("string" == typeof c && "" !== c) || "number" == typeof c
        ? ((c = "" + c),
          null !== u && 6 === u.tag
            ? (n(l, u.sibling), ((u = a(u, c)).return = l), (l = u))
            : (n(l, u), ((u = Up(c, l.mode, h)).return = l), (l = u)),
          i(l))
        : n(l, u);
    };
  }
  var Yu = Zu(!0),
    Qu = Zu(!1),
    ec = {},
    tc = xl(ec),
    nc = xl(ec),
    rc = xl(ec);
  function ac(e) {
    if (e === ec) throw Error(cr(174));
    return e;
  }
  function oc(e, t) {
    switch ((Tl(rc, t), Tl(nc, e), Tl(tc, ec), (e = t.nodeType))) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : pa(null, "");
        break;
      default:
        t = pa(
          (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
          (e = e.tagName)
        );
    }
    Cl(tc), Tl(tc, t);
  }
  function ic() {
    Cl(tc), Cl(nc), Cl(rc);
  }
  function sc(e) {
    ac(rc.current);
    var t = ac(tc.current),
      n = pa(t, e.type);
    t !== n && (Tl(nc, e), Tl(tc, n));
  }
  function lc(e) {
    nc.current === e && (Cl(tc), Cl(nc));
  }
  var uc = xl(0);
  function cc(e) {
    for (var t = e; null !== t; ) {
      if (13 === t.tag) {
        var n = t.memoizedState;
        if (
          null !== n &&
          (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)
        )
          return t;
      } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
        if (0 != (128 & t.flags)) return t;
      } else if (null !== t.child) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; null === t.sibling; ) {
        if (null === t.return || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var dc = [];
  function fc() {
    for (var e = 0; e < dc.length; e++)
      dc[e]._workInProgressVersionPrimary = null;
    dc.length = 0;
  }
  var pc = Or.ReactCurrentDispatcher,
    hc = Or.ReactCurrentBatchConfig,
    gc = 0,
    mc = null,
    vc = null,
    yc = null,
    bc = !1,
    wc = !1,
    _c = 0,
    Sc = 0;
  function Ec() {
    throw Error(cr(321));
  }
  function kc(e, t) {
    if (null === t) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!us(e[n], t[n])) return !1;
    return !0;
  }
  function Oc(e, t, n, r, a, o) {
    if (
      ((gc = o),
      (mc = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (pc.current = null === e || null === e.memoizedState ? ld : ud),
      (e = n(r, a)),
      wc)
    ) {
      o = 0;
      do {
        if (((wc = !1), (_c = 0), 25 <= o)) throw Error(cr(301));
        (o += 1),
          (yc = vc = null),
          (t.updateQueue = null),
          (pc.current = cd),
          (e = n(r, a));
      } while (wc);
    }
    if (
      ((pc.current = sd),
      (t = null !== vc && null !== vc.next),
      (gc = 0),
      (yc = vc = mc = null),
      (bc = !1),
      t)
    )
      throw Error(cr(300));
    return e;
  }
  function xc() {
    var e = 0 !== _c;
    return (_c = 0), e;
  }
  function Cc() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return null === yc ? (mc.memoizedState = yc = e) : (yc = yc.next = e), yc;
  }
  function Tc() {
    if (null === vc) {
      var e = mc.alternate;
      e = null !== e ? e.memoizedState : null;
    } else e = vc.next;
    var t = null === yc ? mc.memoizedState : yc.next;
    if (null !== t) (yc = t), (vc = e);
    else {
      if (null === e) throw Error(cr(310));
      (e = {
        memoizedState: (vc = e).memoizedState,
        baseState: vc.baseState,
        baseQueue: vc.baseQueue,
        queue: vc.queue,
        next: null,
      }),
        null === yc ? (mc.memoizedState = yc = e) : (yc = yc.next = e);
    }
    return yc;
  }
  function Nc(e, t) {
    return "function" == typeof t ? t(e) : t;
  }
  function Rc(e) {
    var t = Tc(),
      n = t.queue;
    if (null === n) throw Error(cr(311));
    n.lastRenderedReducer = e;
    var r = vc,
      a = r.baseQueue,
      o = n.pending;
    if (null !== o) {
      if (null !== a) {
        var i = a.next;
        (a.next = o.next), (o.next = i);
      }
      (r.baseQueue = a = o), (n.pending = null);
    }
    if (null !== a) {
      (o = a.next), (r = r.baseState);
      var s = (i = null),
        l = null,
        u = o;
      do {
        var c = u.lane;
        if ((gc & c) === c)
          null !== l &&
            (l = l.next =
              {
                lane: 0,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null,
              }),
            (r = u.hasEagerState ? u.eagerState : e(r, u.action));
        else {
          var d = {
            lane: c,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null,
          };
          null === l ? ((s = l = d), (i = r)) : (l = l.next = d),
            (mc.lanes |= c),
            (Mf |= c);
        }
        u = u.next;
      } while (null !== u && u !== o);
      null === l ? (i = r) : (l.next = s),
        us(r, t.memoizedState) || (_d = !0),
        (t.memoizedState = r),
        (t.baseState = i),
        (t.baseQueue = l),
        (n.lastRenderedState = r);
    }
    if (null !== (e = n.interleaved)) {
      a = e;
      do {
        (o = a.lane), (mc.lanes |= o), (Mf |= o), (a = a.next);
      } while (a !== e);
    } else null === a && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Lc(e) {
    var t = Tc(),
      n = t.queue;
    if (null === n) throw Error(cr(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      a = n.pending,
      o = t.memoizedState;
    if (null !== a) {
      n.pending = null;
      var i = (a = a.next);
      do {
        (o = e(o, i.action)), (i = i.next);
      } while (i !== a);
      us(o, t.memoizedState) || (_d = !0),
        (t.memoizedState = o),
        null === t.baseQueue && (t.baseState = o),
        (n.lastRenderedState = o);
    }
    return [o, r];
  }
  function Pc() {}
  function jc(e, t) {
    var n = mc,
      r = Tc(),
      a = t(),
      o = !us(r.memoizedState, a);
    if (
      (o && ((r.memoizedState = a), (_d = !0)),
      (r = r.queue),
      Kc(Dc.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || o || (null !== yc && 1 & yc.memoizedState.tag))
    ) {
      if (
        ((n.flags |= 2048),
        Fc(9, Ac.bind(null, n, r, a, t), void 0, null),
        null === Lf)
      )
        throw Error(cr(349));
      0 != (30 & gc) || Ic(n, t, a);
    }
    return a;
  }
  function Ic(e, t, n) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      null === (t = mc.updateQueue)
        ? ((t = { lastEffect: null, stores: null }),
          (mc.updateQueue = t),
          (t.stores = [e]))
        : null === (n = t.stores)
        ? (t.stores = [e])
        : n.push(e);
  }
  function Ac(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), zc(t) && Mc(e);
  }
  function Dc(e, t, n) {
    return n(function () {
      zc(t) && Mc(e);
    });
  }
  function zc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !us(e, n);
    } catch (r) {
      return !0;
    }
  }
  function Mc(e) {
    var t = Lu(e, 1);
    null !== t && ap(t, e, 1, -1);
  }
  function Uc(e) {
    var t = Cc();
    return (
      "function" == typeof e && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Nc,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = rd.bind(null, mc, e)),
      [t.memoizedState, e]
    );
  }
  function Fc(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      null === (t = mc.updateQueue)
        ? ((t = { lastEffect: null, stores: null }),
          (mc.updateQueue = t),
          (t.lastEffect = e.next = e))
        : null === (n = t.lastEffect)
        ? (t.lastEffect = e.next = e)
        : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
      e
    );
  }
  function Hc() {
    return Tc().memoizedState;
  }
  function Vc(e, t, n, r) {
    var a = Cc();
    (mc.flags |= e),
      (a.memoizedState = Fc(1 | t, n, void 0, void 0 === r ? null : r));
  }
  function Bc(e, t, n, r) {
    var a = Tc();
    r = void 0 === r ? null : r;
    var o = void 0;
    if (null !== vc) {
      var i = vc.memoizedState;
      if (((o = i.destroy), null !== r && kc(r, i.deps)))
        return void (a.memoizedState = Fc(t, n, o, r));
    }
    (mc.flags |= e), (a.memoizedState = Fc(1 | t, n, o, r));
  }
  function Wc(e, t) {
    return Vc(8390656, 8, e, t);
  }
  function Kc(e, t) {
    return Bc(2048, 8, e, t);
  }
  function $c(e, t) {
    return Bc(4, 2, e, t);
  }
  function Gc(e, t) {
    return Bc(4, 4, e, t);
  }
  function qc(e, t) {
    return "function" == typeof t
      ? ((e = e()),
        t(e),
        function () {
          t(null);
        })
      : null != t
      ? ((e = e()),
        (t.current = e),
        function () {
          t.current = null;
        })
      : void 0;
  }
  function Xc(e, t, n) {
    return (
      (n = null != n ? n.concat([e]) : null), Bc(4, 4, qc.bind(null, t, e), n)
    );
  }
  function Jc() {}
  function Zc(e, t) {
    var n = Tc();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && kc(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function Yc(e, t) {
    var n = Tc();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && kc(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function Qc(e, t, n) {
    return 0 == (21 & gc)
      ? (e.baseState && ((e.baseState = !1), (_d = !0)), (e.memoizedState = n))
      : (us(n, t) ||
          ((n = _o()), (mc.lanes |= n), (Mf |= n), (e.baseState = !0)),
        t);
  }
  function ed(e, t) {
    var n = Oo;
    (Oo = 0 !== n && 4 > n ? n : 4), e(!0);
    var r = hc.transition;
    hc.transition = {};
    try {
      e(!1), t();
    } finally {
      (Oo = n), (hc.transition = r);
    }
  }
  function td() {
    return Tc().memoizedState;
  }
  function nd(e, t, n) {
    var r = rp(e);
    if (
      ((n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ad(e))
    )
      od(t, n);
    else if (null !== (n = Ru(e, t, n, r))) {
      ap(n, e, r, np()), id(n, t, r);
    }
  }
  function rd(e, t, n) {
    var r = rp(e),
      a = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (ad(e)) od(t, a);
    else {
      var o = e.alternate;
      if (
        0 === e.lanes &&
        (null === o || 0 === o.lanes) &&
        null !== (o = t.lastRenderedReducer)
      )
        try {
          var i = t.lastRenderedState,
            s = o(i, n);
          if (((a.hasEagerState = !0), (a.eagerState = s), us(s, i))) {
            var l = t.interleaved;
            return (
              null === l
                ? ((a.next = a), Nu(t))
                : ((a.next = l.next), (l.next = a)),
              void (t.interleaved = a)
            );
          }
        } catch (u) {}
      null !== (n = Ru(e, t, a, r)) && (ap(n, e, r, (a = np())), id(n, t, r));
    }
  }
  function ad(e) {
    var t = e.alternate;
    return e === mc || (null !== t && t === mc);
  }
  function od(e, t) {
    wc = bc = !0;
    var n = e.pending;
    null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t);
  }
  function id(e, t, n) {
    if (0 != (4194240 & n)) {
      var r = t.lanes;
      (n |= r &= e.pendingLanes), (t.lanes = n), ko(e, n);
    }
  }
  var sd = {
      readContext: Cu,
      useCallback: Ec,
      useContext: Ec,
      useEffect: Ec,
      useImperativeHandle: Ec,
      useInsertionEffect: Ec,
      useLayoutEffect: Ec,
      useMemo: Ec,
      useReducer: Ec,
      useRef: Ec,
      useState: Ec,
      useDebugValue: Ec,
      useDeferredValue: Ec,
      useTransition: Ec,
      useMutableSource: Ec,
      useSyncExternalStore: Ec,
      useId: Ec,
      unstable_isNewReconciler: !1,
    },
    ld = {
      readContext: Cu,
      useCallback: function (e, t) {
        return (Cc().memoizedState = [e, void 0 === t ? null : t]), e;
      },
      useContext: Cu,
      useEffect: Wc,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = null != n ? n.concat([e]) : null),
          Vc(4194308, 4, qc.bind(null, t, e), n)
        );
      },
      useLayoutEffect: function (e, t) {
        return Vc(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return Vc(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Cc();
        return (
          (t = void 0 === t ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, n) {
        var r = Cc();
        return (
          (t = void 0 !== n ? n(t) : t),
          (r.memoizedState = r.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (r.queue = e),
          (e = e.dispatch = nd.bind(null, mc, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        return (e = { current: e }), (Cc().memoizedState = e);
      },
      useState: Uc,
      useDebugValue: Jc,
      useDeferredValue: function (e) {
        return (Cc().memoizedState = e);
      },
      useTransition: function () {
        var e = Uc(!1),
          t = e[0];
        return (e = ed.bind(null, e[1])), (Cc().memoizedState = e), [t, e];
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = mc,
          a = Cc();
        if (iu) {
          if (void 0 === n) throw Error(cr(407));
          n = n();
        } else {
          if (((n = t()), null === Lf)) throw Error(cr(349));
          0 != (30 & gc) || Ic(r, t, n);
        }
        a.memoizedState = n;
        var o = { value: n, getSnapshot: t };
        return (
          (a.queue = o),
          Wc(Dc.bind(null, r, o, e), [e]),
          (r.flags |= 2048),
          Fc(9, Ac.bind(null, r, o, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = Cc(),
          t = Lf.identifierPrefix;
        if (iu) {
          var n = Ql;
          (t =
            ":" +
            t +
            "R" +
            (n = (Yl & ~(1 << (32 - fo(Yl) - 1))).toString(32) + n)),
            0 < (n = _c++) && (t += "H" + n.toString(32)),
            (t += ":");
        } else t = ":" + t + "r" + (n = Sc++).toString(32) + ":";
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    ud = {
      readContext: Cu,
      useCallback: Zc,
      useContext: Cu,
      useEffect: Kc,
      useImperativeHandle: Xc,
      useInsertionEffect: $c,
      useLayoutEffect: Gc,
      useMemo: Yc,
      useReducer: Rc,
      useRef: Hc,
      useState: function () {
        return Rc(Nc);
      },
      useDebugValue: Jc,
      useDeferredValue: function (e) {
        return Qc(Tc(), vc.memoizedState, e);
      },
      useTransition: function () {
        return [Rc(Nc)[0], Tc().memoizedState];
      },
      useMutableSource: Pc,
      useSyncExternalStore: jc,
      useId: td,
      unstable_isNewReconciler: !1,
    },
    cd = {
      readContext: Cu,
      useCallback: Zc,
      useContext: Cu,
      useEffect: Kc,
      useImperativeHandle: Xc,
      useInsertionEffect: $c,
      useLayoutEffect: Gc,
      useMemo: Yc,
      useReducer: Lc,
      useRef: Hc,
      useState: function () {
        return Lc(Nc);
      },
      useDebugValue: Jc,
      useDeferredValue: function (e) {
        var t = Tc();
        return null === vc ? (t.memoizedState = e) : Qc(t, vc.memoizedState, e);
      },
      useTransition: function () {
        return [Lc(Nc)[0], Tc().memoizedState];
      },
      useMutableSource: Pc,
      useSyncExternalStore: jc,
      useId: td,
      unstable_isNewReconciler: !1,
    };
  function dd(e, t) {
    try {
      var n = "",
        r = t;
      do {
        (n += $r(r)), (r = r.return);
      } while (r);
      var a = n;
    } catch (o) {
      a = "\nError generating stack: " + o.message + "\n" + o.stack;
    }
    return { value: e, source: t, stack: a, digest: null };
  }
  function fd(e, t, n) {
    return {
      value: e,
      source: null,
      stack: null != n ? n : null,
      digest: null != t ? t : null,
    };
  }
  function pd(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var hd = "function" == typeof WeakMap ? WeakMap : Map;
  function gd(e, t, n) {
    ((n = Au(-1, n)).tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
      (n.callback = function () {
        $f || (($f = !0), (Gf = r)), pd(0, t);
      }),
      n
    );
  }
  function md(e, t, n) {
    (n = Au(-1, n)).tag = 3;
    var r = e.type.getDerivedStateFromError;
    if ("function" == typeof r) {
      var a = t.value;
      (n.payload = function () {
        return r(a);
      }),
        (n.callback = function () {
          pd(0, t);
        });
    }
    var o = e.stateNode;
    return (
      null !== o &&
        "function" == typeof o.componentDidCatch &&
        (n.callback = function () {
          pd(0, t),
            "function" != typeof r &&
              (null === qf ? (qf = new Set([this])) : qf.add(this));
          var e = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: null !== e ? e : "",
          });
        }),
      n
    );
  }
  function vd(e, t, n) {
    var r = e.pingCache;
    if (null === r) {
      r = e.pingCache = new hd();
      var a = new Set();
      r.set(t, a);
    } else void 0 === (a = r.get(t)) && ((a = new Set()), r.set(t, a));
    a.has(n) || (a.add(n), (e = Cp.bind(null, e, t, n)), t.then(e, e));
  }
  function yd(e) {
    do {
      var t;
      if (
        ((t = 13 === e.tag) &&
          (t = null === (t = e.memoizedState) || null !== t.dehydrated),
        t)
      )
        return e;
      e = e.return;
    } while (null !== e);
    return null;
  }
  function bd(e, t, n, r, a) {
    return 0 == (1 & e.mode)
      ? (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            1 === n.tag &&
              (null === n.alternate
                ? (n.tag = 17)
                : (((t = Au(-1, 1)).tag = 2), Du(n, t, 1))),
            (n.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = a), e);
  }
  var wd = Or.ReactCurrentOwner,
    _d = !1;
  function Sd(e, t, n, r) {
    t.child = null === e ? Qu(t, null, n, r) : Yu(t, e.child, n, r);
  }
  function Ed(e, t, n, r, a) {
    n = n.render;
    var o = t.ref;
    return (
      xu(t, a),
      (r = Oc(e, t, n, r, o, a)),
      (n = xc()),
      null === e || _d
        ? (iu && n && nu(t), (t.flags |= 1), Sd(e, t, r, a), t.child)
        : ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~a),
          Kd(e, t, a))
    );
  }
  function kd(e, t, n, r, a) {
    if (null === e) {
      var o = n.type;
      return "function" != typeof o ||
        Ip(o) ||
        void 0 !== o.defaultProps ||
        null !== n.compare ||
        void 0 !== n.defaultProps
        ? (((e = Dp(n.type, null, r, t, t.mode, a)).ref = t.ref),
          (e.return = t),
          (t.child = e))
        : ((t.tag = 15), (t.type = o), Od(e, t, o, r, a));
    }
    if (((o = e.child), 0 == (e.lanes & a))) {
      var i = o.memoizedProps;
      if ((n = null !== (n = n.compare) ? n : cs)(i, r) && e.ref === t.ref)
        return Kd(e, t, a);
    }
    return (
      (t.flags |= 1),
      ((e = Ap(o, r)).ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Od(e, t, n, r, a) {
    if (null !== e) {
      var o = e.memoizedProps;
      if (cs(o, r) && e.ref === t.ref) {
        if (((_d = !1), (t.pendingProps = r = o), 0 == (e.lanes & a)))
          return (t.lanes = e.lanes), Kd(e, t, a);
        0 != (131072 & e.flags) && (_d = !0);
      }
    }
    return Td(e, t, n, r, a);
  }
  function xd(e, t, n) {
    var r = t.pendingProps,
      a = r.children,
      o = null !== e ? e.memoizedState : null;
    if ("hidden" === r.mode)
      if (0 == (1 & t.mode))
        (t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          Tl(Af, If),
          (If |= n);
      else {
        if (0 == (1073741824 & n))
          return (
            (e = null !== o ? o.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            Tl(Af, If),
            (If |= e),
            null
          );
        (t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (r = null !== o ? o.baseLanes : n),
          Tl(Af, If),
          (If |= r);
      }
    else
      null !== o ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
        Tl(Af, If),
        (If |= r);
    return Sd(e, t, a, n), t.child;
  }
  function Cd(e, t) {
    var n = t.ref;
    ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function Td(e, t, n, r, a) {
    var o = Il(n) ? Pl : Rl.current;
    return (
      (o = jl(t, o)),
      xu(t, a),
      (n = Oc(e, t, n, r, o, a)),
      (r = xc()),
      null === e || _d
        ? (iu && r && nu(t), (t.flags |= 1), Sd(e, t, n, a), t.child)
        : ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~a),
          Kd(e, t, a))
    );
  }
  function Nd(e, t, n, r, a) {
    if (Il(n)) {
      var o = !0;
      Ml(t);
    } else o = !1;
    if ((xu(t, a), null === t.stateNode))
      Wd(e, t), Ku(t, n, r), Gu(t, n, r, a), (r = !0);
    else if (null === e) {
      var i = t.stateNode,
        s = t.memoizedProps;
      i.props = s;
      var l = i.context,
        u = n.contextType;
      "object" == typeof u && null !== u
        ? (u = Cu(u))
        : (u = jl(t, (u = Il(n) ? Pl : Rl.current)));
      var c = n.getDerivedStateFromProps,
        d =
          "function" == typeof c ||
          "function" == typeof i.getSnapshotBeforeUpdate;
      d ||
        ("function" != typeof i.UNSAFE_componentWillReceiveProps &&
          "function" != typeof i.componentWillReceiveProps) ||
        ((s !== r || l !== u) && $u(t, i, r, u)),
        (Pu = !1);
      var f = t.memoizedState;
      (i.state = f),
        Uu(t, r, i, a),
        (l = t.memoizedState),
        s !== r || f !== l || Ll.current || Pu
          ? ("function" == typeof c && (Vu(t, n, c, r), (l = t.memoizedState)),
            (s = Pu || Wu(t, n, s, r, f, l, u))
              ? (d ||
                  ("function" != typeof i.UNSAFE_componentWillMount &&
                    "function" != typeof i.componentWillMount) ||
                  ("function" == typeof i.componentWillMount &&
                    i.componentWillMount(),
                  "function" == typeof i.UNSAFE_componentWillMount &&
                    i.UNSAFE_componentWillMount()),
                "function" == typeof i.componentDidMount &&
                  (t.flags |= 4194308))
              : ("function" == typeof i.componentDidMount &&
                  (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = l)),
            (i.props = r),
            (i.state = l),
            (i.context = u),
            (r = s))
          : ("function" == typeof i.componentDidMount && (t.flags |= 4194308),
            (r = !1));
    } else {
      (i = t.stateNode),
        Iu(e, t),
        (s = t.memoizedProps),
        (u = t.type === t.elementType ? s : yu(t.type, s)),
        (i.props = u),
        (d = t.pendingProps),
        (f = i.context),
        "object" == typeof (l = n.contextType) && null !== l
          ? (l = Cu(l))
          : (l = jl(t, (l = Il(n) ? Pl : Rl.current)));
      var p = n.getDerivedStateFromProps;
      (c =
        "function" == typeof p ||
        "function" == typeof i.getSnapshotBeforeUpdate) ||
        ("function" != typeof i.UNSAFE_componentWillReceiveProps &&
          "function" != typeof i.componentWillReceiveProps) ||
        ((s !== d || f !== l) && $u(t, i, r, l)),
        (Pu = !1),
        (f = t.memoizedState),
        (i.state = f),
        Uu(t, r, i, a);
      var h = t.memoizedState;
      s !== d || f !== h || Ll.current || Pu
        ? ("function" == typeof p && (Vu(t, n, p, r), (h = t.memoizedState)),
          (u = Pu || Wu(t, n, u, r, f, h, l) || !1)
            ? (c ||
                ("function" != typeof i.UNSAFE_componentWillUpdate &&
                  "function" != typeof i.componentWillUpdate) ||
                ("function" == typeof i.componentWillUpdate &&
                  i.componentWillUpdate(r, h, l),
                "function" == typeof i.UNSAFE_componentWillUpdate &&
                  i.UNSAFE_componentWillUpdate(r, h, l)),
              "function" == typeof i.componentDidUpdate && (t.flags |= 4),
              "function" == typeof i.getSnapshotBeforeUpdate &&
                (t.flags |= 1024))
            : ("function" != typeof i.componentDidUpdate ||
                (s === e.memoizedProps && f === e.memoizedState) ||
                (t.flags |= 4),
              "function" != typeof i.getSnapshotBeforeUpdate ||
                (s === e.memoizedProps && f === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = h)),
          (i.props = r),
          (i.state = h),
          (i.context = l),
          (r = u))
        : ("function" != typeof i.componentDidUpdate ||
            (s === e.memoizedProps && f === e.memoizedState) ||
            (t.flags |= 4),
          "function" != typeof i.getSnapshotBeforeUpdate ||
            (s === e.memoizedProps && f === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return Rd(e, t, n, r, o, a);
  }
  function Rd(e, t, n, r, a, o) {
    Cd(e, t);
    var i = 0 != (128 & t.flags);
    if (!r && !i) return a && Ul(t, n, !1), Kd(e, t, o);
    (r = t.stateNode), (wd.current = t);
    var s =
      i && "function" != typeof n.getDerivedStateFromError ? null : r.render();
    return (
      (t.flags |= 1),
      null !== e && i
        ? ((t.child = Yu(t, e.child, null, o)), (t.child = Yu(t, null, s, o)))
        : Sd(e, t, s, o),
      (t.memoizedState = r.state),
      a && Ul(t, n, !0),
      t.child
    );
  }
  function Ld(e) {
    var t = e.stateNode;
    t.pendingContext
      ? Dl(0, t.pendingContext, t.pendingContext !== t.context)
      : t.context && Dl(0, t.context, !1),
      oc(e, t.containerInfo);
  }
  function Pd(e, t, n, r, a) {
    return gu(), mu(a), (t.flags |= 256), Sd(e, t, n, r), t.child;
  }
  var jd,
    Id,
    Ad,
    Dd = { dehydrated: null, treeContext: null, retryLane: 0 };
  function zd(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Md(e, t, n) {
    var r,
      a = t.pendingProps,
      o = uc.current,
      i = !1,
      s = 0 != (128 & t.flags);
    if (
      ((r = s) ||
        (r = (null === e || null !== e.memoizedState) && 0 != (2 & o)),
      r
        ? ((i = !0), (t.flags &= -129))
        : (null !== e && null === e.memoizedState) || (o |= 1),
      Tl(uc, 1 & o),
      null === e)
    )
      return (
        du(t),
        null !== (e = t.memoizedState) && null !== (e = e.dehydrated)
          ? (0 == (1 & t.mode)
              ? (t.lanes = 1)
              : "$!" === e.data
              ? (t.lanes = 8)
              : (t.lanes = 1073741824),
            null)
          : ((s = a.children),
            (e = a.fallback),
            i
              ? ((a = t.mode),
                (i = t.child),
                (s = { mode: "hidden", children: s }),
                0 == (1 & a) && null !== i
                  ? ((i.childLanes = 0), (i.pendingProps = s))
                  : (i = Mp(s, a, 0, null)),
                (e = zp(e, a, n, null)),
                (i.return = t),
                (e.return = t),
                (i.sibling = e),
                (t.child = i),
                (t.child.memoizedState = zd(n)),
                (t.memoizedState = Dd),
                e)
              : Ud(t, s))
      );
    if (null !== (o = e.memoizedState) && null !== (r = o.dehydrated))
      return (function (e, t, n, r, a, o, i) {
        if (n)
          return 256 & t.flags
            ? ((t.flags &= -257), Fd(e, t, i, (r = fd(Error(cr(422))))))
            : null !== t.memoizedState
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((o = r.fallback),
              (a = t.mode),
              (r = Mp({ mode: "visible", children: r.children }, a, 0, null)),
              ((o = zp(o, a, i, null)).flags |= 2),
              (r.return = t),
              (o.return = t),
              (r.sibling = o),
              (t.child = r),
              0 != (1 & t.mode) && Yu(t, e.child, null, i),
              (t.child.memoizedState = zd(i)),
              (t.memoizedState = Dd),
              o);
        if (0 == (1 & t.mode)) return Fd(e, t, i, null);
        if ("$!" === a.data) {
          if ((r = a.nextSibling && a.nextSibling.dataset)) var s = r.dgst;
          return (
            (r = s), Fd(e, t, i, (r = fd((o = Error(cr(419))), r, void 0)))
          );
        }
        if (((s = 0 != (i & e.childLanes)), _d || s)) {
          if (null !== (r = Lf)) {
            switch (i & -i) {
              case 4:
                a = 2;
                break;
              case 16:
                a = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                a = 32;
                break;
              case 536870912:
                a = 268435456;
                break;
              default:
                a = 0;
            }
            0 !== (a = 0 != (a & (r.suspendedLanes | i)) ? 0 : a) &&
              a !== o.retryLane &&
              ((o.retryLane = a), Lu(e, a), ap(r, e, a, -1));
          }
          return vp(), Fd(e, t, i, (r = fd(Error(cr(421)))));
        }
        return "$?" === a.data
          ? ((t.flags |= 128),
            (t.child = e.child),
            (t = Np.bind(null, e)),
            (a._reactRetry = t),
            null)
          : ((e = o.treeContext),
            (ou = dl(a.nextSibling)),
            (au = t),
            (iu = !0),
            (su = null),
            null !== e &&
              ((Xl[Jl++] = Yl),
              (Xl[Jl++] = Ql),
              (Xl[Jl++] = Zl),
              (Yl = e.id),
              (Ql = e.overflow),
              (Zl = t)),
            ((t = Ud(t, r.children)).flags |= 4096),
            t);
      })(e, t, s, a, r, o, n);
    if (i) {
      (i = a.fallback), (s = t.mode), (r = (o = e.child).sibling);
      var l = { mode: "hidden", children: a.children };
      return (
        0 == (1 & s) && t.child !== o
          ? (((a = t.child).childLanes = 0),
            (a.pendingProps = l),
            (t.deletions = null))
          : ((a = Ap(o, l)).subtreeFlags = 14680064 & o.subtreeFlags),
        null !== r ? (i = Ap(r, i)) : ((i = zp(i, s, n, null)).flags |= 2),
        (i.return = t),
        (a.return = t),
        (a.sibling = i),
        (t.child = a),
        (a = i),
        (i = t.child),
        (s =
          null === (s = e.child.memoizedState)
            ? zd(n)
            : {
                baseLanes: s.baseLanes | n,
                cachePool: null,
                transitions: s.transitions,
              }),
        (i.memoizedState = s),
        (i.childLanes = e.childLanes & ~n),
        (t.memoizedState = Dd),
        a
      );
    }
    return (
      (e = (i = e.child).sibling),
      (a = Ap(i, { mode: "visible", children: a.children })),
      0 == (1 & t.mode) && (a.lanes = n),
      (a.return = t),
      (a.sibling = null),
      null !== e &&
        (null === (n = t.deletions)
          ? ((t.deletions = [e]), (t.flags |= 16))
          : n.push(e)),
      (t.child = a),
      (t.memoizedState = null),
      a
    );
  }
  function Ud(e, t) {
    return (
      ((t = Mp({ mode: "visible", children: t }, e.mode, 0, null)).return = e),
      (e.child = t)
    );
  }
  function Fd(e, t, n, r) {
    return (
      null !== r && mu(r),
      Yu(t, e.child, null, n),
      ((e = Ud(t, t.pendingProps.children)).flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Hd(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    null !== r && (r.lanes |= t), Ou(e.return, t, n);
  }
  function Vd(e, t, n, r, a) {
    var o = e.memoizedState;
    null === o
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: a,
        })
      : ((o.isBackwards = t),
        (o.rendering = null),
        (o.renderingStartTime = 0),
        (o.last = r),
        (o.tail = n),
        (o.tailMode = a));
  }
  function Bd(e, t, n) {
    var r = t.pendingProps,
      a = r.revealOrder,
      o = r.tail;
    if ((Sd(e, t, r.children, n), 0 != (2 & (r = uc.current))))
      (r = (1 & r) | 2), (t.flags |= 128);
    else {
      if (null !== e && 0 != (128 & e.flags))
        e: for (e = t.child; null !== e; ) {
          if (13 === e.tag) null !== e.memoizedState && Hd(e, n, t);
          else if (19 === e.tag) Hd(e, n, t);
          else if (null !== e.child) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; null === e.sibling; ) {
            if (null === e.return || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      r &= 1;
    }
    if ((Tl(uc, r), 0 == (1 & t.mode))) t.memoizedState = null;
    else
      switch (a) {
        case "forwards":
          for (n = t.child, a = null; null !== n; )
            null !== (e = n.alternate) && null === cc(e) && (a = n),
              (n = n.sibling);
          null === (n = a)
            ? ((a = t.child), (t.child = null))
            : ((a = n.sibling), (n.sibling = null)),
            Vd(t, !1, a, n, o);
          break;
        case "backwards":
          for (n = null, a = t.child, t.child = null; null !== a; ) {
            if (null !== (e = a.alternate) && null === cc(e)) {
              t.child = a;
              break;
            }
            (e = a.sibling), (a.sibling = n), (n = a), (a = e);
          }
          Vd(t, !0, n, null, o);
          break;
        case "together":
          Vd(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function Wd(e, t) {
    0 == (1 & t.mode) &&
      null !== e &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function Kd(e, t, n) {
    if (
      (null !== e && (t.dependencies = e.dependencies),
      (Mf |= t.lanes),
      0 == (n & t.childLanes))
    )
      return null;
    if (null !== e && t.child !== e.child) throw Error(cr(153));
    if (null !== t.child) {
      for (
        n = Ap((e = t.child), e.pendingProps), t.child = n, n.return = t;
        null !== e.sibling;

      )
        (e = e.sibling), ((n = n.sibling = Ap(e, e.pendingProps)).return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function $d(e, t) {
    if (!iu)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; null !== t; )
            null !== t.alternate && (n = t), (t = t.sibling);
          null === n ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; null !== n; )
            null !== n.alternate && (r = n), (n = n.sibling);
          null === r
            ? t || null === e.tail
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function Gd(e) {
    var t = null !== e.alternate && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var a = e.child; null !== a; )
        (n |= a.lanes | a.childLanes),
          (r |= 14680064 & a.subtreeFlags),
          (r |= 14680064 & a.flags),
          (a.return = e),
          (a = a.sibling);
    else
      for (a = e.child; null !== a; )
        (n |= a.lanes | a.childLanes),
          (r |= a.subtreeFlags),
          (r |= a.flags),
          (a.return = e),
          (a = a.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
  }
  function qd(e, t, n) {
    var r = t.pendingProps;
    switch ((ru(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Gd(t), null;
      case 1:
        return Il(t.type) && Al(), Gd(t), null;
      case 3:
        return (
          (r = t.stateNode),
          ic(),
          Cl(Ll),
          Cl(Rl),
          fc(),
          r.pendingContext &&
            ((r.context = r.pendingContext), (r.pendingContext = null)),
          (null !== e && null !== e.child) ||
            (pu(t)
              ? (t.flags |= 4)
              : null === e ||
                (e.memoizedState.isDehydrated && 0 == (256 & t.flags)) ||
                ((t.flags |= 1024), null !== su && (lp(su), (su = null)))),
          Gd(t),
          null
        );
      case 5:
        lc(t);
        var a = ac(rc.current);
        if (((n = t.type), null !== e && null != t.stateNode))
          Id(e, t, n, r),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
        else {
          if (!r) {
            if (null === t.stateNode) throw Error(cr(166));
            return Gd(t), null;
          }
          if (((e = ac(tc.current)), pu(t))) {
            (r = t.stateNode), (n = t.type);
            var o = t.memoizedProps;
            switch (((r[hl] = t), (r[gl] = o), (e = 0 != (1 & t.mode)), n)) {
              case "dialog":
                Hs("cancel", r), Hs("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                Hs("load", r);
                break;
              case "video":
              case "audio":
                for (a = 0; a < zs.length; a++) Hs(zs[a], r);
                break;
              case "source":
                Hs("error", r);
                break;
              case "img":
              case "image":
              case "link":
                Hs("error", r), Hs("load", r);
                break;
              case "details":
                Hs("toggle", r);
                break;
              case "input":
                ta(r, o), Hs("invalid", r);
                break;
              case "select":
                (r._wrapperState = { wasMultiple: !!o.multiple }),
                  Hs("invalid", r);
                break;
              case "textarea":
                ua(r, o), Hs("invalid", r);
            }
            for (var i in (Ea(n, o), (a = null), o))
              if (o.hasOwnProperty(i)) {
                var s = o[i];
                "children" === i
                  ? "string" == typeof s
                    ? r.textContent !== s &&
                      (!0 !== o.suppressHydrationWarning &&
                        el(r.textContent, s, e),
                      (a = ["children", s]))
                    : "number" == typeof s &&
                      r.textContent !== "" + s &&
                      (!0 !== o.suppressHydrationWarning &&
                        el(r.textContent, s, e),
                      (a = ["children", "" + s]))
                  : fr.hasOwnProperty(i) &&
                    null != s &&
                    "onScroll" === i &&
                    Hs("scroll", r);
              }
            switch (n) {
              case "input":
                Zr(r), aa(r, o, !0);
                break;
              case "textarea":
                Zr(r), da(r);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" == typeof o.onClick && (r.onclick = tl);
            }
            (r = a), (t.updateQueue = r), null !== r && (t.flags |= 4);
          } else {
            (i = 9 === a.nodeType ? a : a.ownerDocument),
              "http://www.w3.org/1999/xhtml" === e && (e = fa(n)),
              "http://www.w3.org/1999/xhtml" === e
                ? "script" === n
                  ? (((e = i.createElement("div")).innerHTML =
                      "<script></script>"),
                    (e = e.removeChild(e.firstChild)))
                  : "string" == typeof r.is
                  ? (e = i.createElement(n, { is: r.is }))
                  : ((e = i.createElement(n)),
                    "select" === n &&
                      ((i = e),
                      r.multiple
                        ? (i.multiple = !0)
                        : r.size && (i.size = r.size)))
                : (e = i.createElementNS(e, n)),
              (e[hl] = t),
              (e[gl] = r),
              jd(e, t),
              (t.stateNode = e);
            e: {
              switch (((i = ka(n, r)), n)) {
                case "dialog":
                  Hs("cancel", e), Hs("close", e), (a = r);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Hs("load", e), (a = r);
                  break;
                case "video":
                case "audio":
                  for (a = 0; a < zs.length; a++) Hs(zs[a], e);
                  a = r;
                  break;
                case "source":
                  Hs("error", e), (a = r);
                  break;
                case "img":
                case "image":
                case "link":
                  Hs("error", e), Hs("load", e), (a = r);
                  break;
                case "details":
                  Hs("toggle", e), (a = r);
                  break;
                case "input":
                  ta(e, r), (a = ea(e, r)), Hs("invalid", e);
                  break;
                case "option":
                  a = r;
                  break;
                case "select":
                  (e._wrapperState = { wasMultiple: !!r.multiple }),
                    (a = Vr({}, r, { value: void 0 })),
                    Hs("invalid", e);
                  break;
                case "textarea":
                  ua(e, r), (a = la(e, r)), Hs("invalid", e);
                  break;
                default:
                  a = r;
              }
              for (o in (Ea(n, a), (s = a)))
                if (s.hasOwnProperty(o)) {
                  var l = s[o];
                  "style" === o
                    ? _a(e, l)
                    : "dangerouslySetInnerHTML" === o
                    ? null != (l = l ? l.__html : void 0) && ma(e, l)
                    : "children" === o
                    ? "string" == typeof l
                      ? ("textarea" !== n || "" !== l) && va(e, l)
                      : "number" == typeof l && va(e, "" + l)
                    : "suppressContentEditableWarning" !== o &&
                      "suppressHydrationWarning" !== o &&
                      "autoFocus" !== o &&
                      (fr.hasOwnProperty(o)
                        ? null != l && "onScroll" === o && Hs("scroll", e)
                        : null != l && kr(e, o, l, i));
                }
              switch (n) {
                case "input":
                  Zr(e), aa(e, r, !1);
                  break;
                case "textarea":
                  Zr(e), da(e);
                  break;
                case "option":
                  null != r.value && e.setAttribute("value", "" + Xr(r.value));
                  break;
                case "select":
                  (e.multiple = !!r.multiple),
                    null != (o = r.value)
                      ? sa(e, !!r.multiple, o, !1)
                      : null != r.defaultValue &&
                        sa(e, !!r.multiple, r.defaultValue, !0);
                  break;
                default:
                  "function" == typeof a.onClick && (e.onclick = tl);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          null !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return Gd(t), null;
      case 6:
        if (e && null != t.stateNode) Ad(0, t, e.memoizedProps, r);
        else {
          if ("string" != typeof r && null === t.stateNode)
            throw Error(cr(166));
          if (((n = ac(rc.current)), ac(tc.current), pu(t))) {
            if (
              ((r = t.stateNode),
              (n = t.memoizedProps),
              (r[hl] = t),
              (o = r.nodeValue !== n) && null !== (e = au))
            )
              switch (e.tag) {
                case 3:
                  el(r.nodeValue, n, 0 != (1 & e.mode));
                  break;
                case 5:
                  !0 !== e.memoizedProps.suppressHydrationWarning &&
                    el(r.nodeValue, n, 0 != (1 & e.mode));
              }
            o && (t.flags |= 4);
          } else
            ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[
              hl
            ] = t),
              (t.stateNode = r);
        }
        return Gd(t), null;
      case 13:
        if (
          (Cl(uc),
          (r = t.memoizedState),
          null === e ||
            (null !== e.memoizedState && null !== e.memoizedState.dehydrated))
        ) {
          if (iu && null !== ou && 0 != (1 & t.mode) && 0 == (128 & t.flags))
            hu(), gu(), (t.flags |= 98560), (o = !1);
          else if (((o = pu(t)), null !== r && null !== r.dehydrated)) {
            if (null === e) {
              if (!o) throw Error(cr(318));
              if (!(o = null !== (o = t.memoizedState) ? o.dehydrated : null))
                throw Error(cr(317));
              o[hl] = t;
            } else
              gu(),
                0 == (128 & t.flags) && (t.memoizedState = null),
                (t.flags |= 4);
            Gd(t), (o = !1);
          } else null !== su && (lp(su), (su = null)), (o = !0);
          if (!o) return 65536 & t.flags ? t : null;
        }
        return 0 != (128 & t.flags)
          ? ((t.lanes = n), t)
          : ((r = null !== r) !== (null !== e && null !== e.memoizedState) &&
              r &&
              ((t.child.flags |= 8192),
              0 != (1 & t.mode) &&
                (null === e || 0 != (1 & uc.current)
                  ? 0 === Df && (Df = 3)
                  : vp())),
            null !== t.updateQueue && (t.flags |= 4),
            Gd(t),
            null);
      case 4:
        return ic(), null === e && Ws(t.stateNode.containerInfo), Gd(t), null;
      case 10:
        return ku(t.type._context), Gd(t), null;
      case 17:
        return Il(t.type) && Al(), Gd(t), null;
      case 19:
        if ((Cl(uc), null === (o = t.memoizedState))) return Gd(t), null;
        if (((r = 0 != (128 & t.flags)), null === (i = o.rendering)))
          if (r) $d(o, !1);
          else {
            if (0 !== Df || (null !== e && 0 != (128 & e.flags)))
              for (e = t.child; null !== e; ) {
                if (null !== (i = cc(e))) {
                  for (
                    t.flags |= 128,
                      $d(o, !1),
                      null !== (r = i.updateQueue) &&
                        ((t.updateQueue = r), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      r = n,
                      n = t.child;
                    null !== n;

                  )
                    (e = r),
                      ((o = n).flags &= 14680066),
                      null === (i = o.alternate)
                        ? ((o.childLanes = 0),
                          (o.lanes = e),
                          (o.child = null),
                          (o.subtreeFlags = 0),
                          (o.memoizedProps = null),
                          (o.memoizedState = null),
                          (o.updateQueue = null),
                          (o.dependencies = null),
                          (o.stateNode = null))
                        : ((o.childLanes = i.childLanes),
                          (o.lanes = i.lanes),
                          (o.child = i.child),
                          (o.subtreeFlags = 0),
                          (o.deletions = null),
                          (o.memoizedProps = i.memoizedProps),
                          (o.memoizedState = i.memoizedState),
                          (o.updateQueue = i.updateQueue),
                          (o.type = i.type),
                          (e = i.dependencies),
                          (o.dependencies =
                            null === e
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (n = n.sibling);
                  return Tl(uc, (1 & uc.current) | 2), t.child;
                }
                e = e.sibling;
              }
            null !== o.tail &&
              no() > Wf &&
              ((t.flags |= 128), (r = !0), $d(o, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (null !== (e = cc(i))) {
              if (
                ((t.flags |= 128),
                (r = !0),
                null !== (n = e.updateQueue) &&
                  ((t.updateQueue = n), (t.flags |= 4)),
                $d(o, !0),
                null === o.tail &&
                  "hidden" === o.tailMode &&
                  !i.alternate &&
                  !iu)
              )
                return Gd(t), null;
            } else
              2 * no() - o.renderingStartTime > Wf &&
                1073741824 !== n &&
                ((t.flags |= 128), (r = !0), $d(o, !1), (t.lanes = 4194304));
          o.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : (null !== (n = o.last) ? (n.sibling = i) : (t.child = i),
              (o.last = i));
        }
        return null !== o.tail
          ? ((t = o.tail),
            (o.rendering = t),
            (o.tail = t.sibling),
            (o.renderingStartTime = no()),
            (t.sibling = null),
            (n = uc.current),
            Tl(uc, r ? (1 & n) | 2 : 1 & n),
            t)
          : (Gd(t), null);
      case 22:
      case 23:
        return (
          pp(),
          (r = null !== t.memoizedState),
          null !== e && (null !== e.memoizedState) !== r && (t.flags |= 8192),
          r && 0 != (1 & t.mode)
            ? 0 != (1073741824 & If) &&
              (Gd(t), 6 & t.subtreeFlags && (t.flags |= 8192))
            : Gd(t),
          null
        );
      case 24:
      case 25:
        return null;
    }
    throw Error(cr(156, t.tag));
  }
  function Xd(e, t) {
    switch ((ru(t), t.tag)) {
      case 1:
        return (
          Il(t.type) && Al(),
          65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null
        );
      case 3:
        return (
          ic(),
          Cl(Ll),
          Cl(Rl),
          fc(),
          0 != (65536 & (e = t.flags)) && 0 == (128 & e)
            ? ((t.flags = (-65537 & e) | 128), t)
            : null
        );
      case 5:
        return lc(t), null;
      case 13:
        if ((Cl(uc), null !== (e = t.memoizedState) && null !== e.dehydrated)) {
          if (null === t.alternate) throw Error(cr(340));
          gu();
        }
        return 65536 & (e = t.flags)
          ? ((t.flags = (-65537 & e) | 128), t)
          : null;
      case 19:
        return Cl(uc), null;
      case 4:
        return ic(), null;
      case 10:
        return ku(t.type._context), null;
      case 22:
      case 23:
        return pp(), null;
      case 24:
      default:
        return null;
    }
  }
  (jd = function (e, t) {
    for (var n = t.child; null !== n; ) {
      if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
      else if (4 !== n.tag && null !== n.child) {
        (n.child.return = n), (n = n.child);
        continue;
      }
      if (n === t) break;
      for (; null === n.sibling; ) {
        if (null === n.return || n.return === t) return;
        n = n.return;
      }
      (n.sibling.return = n.return), (n = n.sibling);
    }
  }),
    (Id = function (e, t, n, r) {
      var a = e.memoizedProps;
      if (a !== r) {
        (e = t.stateNode), ac(tc.current);
        var o,
          i = null;
        switch (n) {
          case "input":
            (a = ea(e, a)), (r = ea(e, r)), (i = []);
            break;
          case "select":
            (a = Vr({}, a, { value: void 0 })),
              (r = Vr({}, r, { value: void 0 })),
              (i = []);
            break;
          case "textarea":
            (a = la(e, a)), (r = la(e, r)), (i = []);
            break;
          default:
            "function" != typeof a.onClick &&
              "function" == typeof r.onClick &&
              (e.onclick = tl);
        }
        for (u in (Ea(n, r), (n = null), a))
          if (!r.hasOwnProperty(u) && a.hasOwnProperty(u) && null != a[u])
            if ("style" === u) {
              var s = a[u];
              for (o in s) s.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
            } else
              "dangerouslySetInnerHTML" !== u &&
                "children" !== u &&
                "suppressContentEditableWarning" !== u &&
                "suppressHydrationWarning" !== u &&
                "autoFocus" !== u &&
                (fr.hasOwnProperty(u)
                  ? i || (i = [])
                  : (i = i || []).push(u, null));
        for (u in r) {
          var l = r[u];
          if (
            ((s = null != a ? a[u] : void 0),
            r.hasOwnProperty(u) && l !== s && (null != l || null != s))
          )
            if ("style" === u)
              if (s) {
                for (o in s)
                  !s.hasOwnProperty(o) ||
                    (l && l.hasOwnProperty(o)) ||
                    (n || (n = {}), (n[o] = ""));
                for (o in l)
                  l.hasOwnProperty(o) &&
                    s[o] !== l[o] &&
                    (n || (n = {}), (n[o] = l[o]));
              } else n || (i || (i = []), i.push(u, n)), (n = l);
            else
              "dangerouslySetInnerHTML" === u
                ? ((l = l ? l.__html : void 0),
                  (s = s ? s.__html : void 0),
                  null != l && s !== l && (i = i || []).push(u, l))
                : "children" === u
                ? ("string" != typeof l && "number" != typeof l) ||
                  (i = i || []).push(u, "" + l)
                : "suppressContentEditableWarning" !== u &&
                  "suppressHydrationWarning" !== u &&
                  (fr.hasOwnProperty(u)
                    ? (null != l && "onScroll" === u && Hs("scroll", e),
                      i || s === l || (i = []))
                    : (i = i || []).push(u, l));
        }
        n && (i = i || []).push("style", n);
        var u = i;
        (t.updateQueue = u) && (t.flags |= 4);
      }
    }),
    (Ad = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    });
  var Jd = !1,
    Zd = !1,
    Yd = "function" == typeof WeakSet ? WeakSet : Set,
    Qd = null;
  function ef(e, t) {
    var n = e.ref;
    if (null !== n)
      if ("function" == typeof n)
        try {
          n(null);
        } catch (r) {
          xp(e, t, r);
        }
      else n.current = null;
  }
  function tf(e, t, n) {
    try {
      n();
    } catch (r) {
      xp(e, t, r);
    }
  }
  var nf = !1;
  function rf(e, t, n) {
    var r = t.updateQueue;
    if (null !== (r = null !== r ? r.lastEffect : null)) {
      var a = (r = r.next);
      do {
        if ((a.tag & e) === e) {
          var o = a.destroy;
          (a.destroy = void 0), void 0 !== o && tf(t, n, o);
        }
        a = a.next;
      } while (a !== r);
    }
  }
  function af(e, t) {
    if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function of(e) {
    var t = e.ref;
    if (null !== t) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      "function" == typeof t ? t(e) : (t.current = e);
    }
  }
  function sf(e) {
    var t = e.alternate;
    null !== t && ((e.alternate = null), sf(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      5 === e.tag &&
        null !== (t = e.stateNode) &&
        (delete t[hl], delete t[gl], delete t[vl], delete t[yl], delete t[bl]),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  function lf(e) {
    return 5 === e.tag || 3 === e.tag || 4 === e.tag;
  }
  function uf(e) {
    e: for (;;) {
      for (; null === e.sibling; ) {
        if (null === e.return || lf(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        5 !== e.tag && 6 !== e.tag && 18 !== e.tag;

      ) {
        if (2 & e.flags) continue e;
        if (null === e.child || 4 === e.tag) continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(2 & e.flags)) return e.stateNode;
    }
  }
  function cf(e, t, n) {
    var r = e.tag;
    if (5 === r || 6 === r)
      (e = e.stateNode),
        t
          ? 8 === n.nodeType
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (8 === n.nodeType
              ? (t = n.parentNode).insertBefore(e, n)
              : (t = n).appendChild(e),
            null != (n = n._reactRootContainer) ||
              null !== t.onclick ||
              (t.onclick = tl));
    else if (4 !== r && null !== (e = e.child))
      for (cf(e, t, n), e = e.sibling; null !== e; )
        cf(e, t, n), (e = e.sibling);
  }
  function df(e, t, n) {
    var r = e.tag;
    if (5 === r || 6 === r)
      (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (4 !== r && null !== (e = e.child))
      for (df(e, t, n), e = e.sibling; null !== e; )
        df(e, t, n), (e = e.sibling);
  }
  var ff = null,
    pf = !1;
  function hf(e, t, n) {
    for (n = n.child; null !== n; ) gf(e, t, n), (n = n.sibling);
  }
  function gf(e, t, n) {
    if (co && "function" == typeof co.onCommitFiberUnmount)
      try {
        co.onCommitFiberUnmount(uo, n);
      } catch (s) {}
    switch (n.tag) {
      case 5:
        Zd || ef(n, t);
      case 6:
        var r = ff,
          a = pf;
        (ff = null),
          hf(e, t, n),
          (pf = a),
          null !== (ff = r) &&
            (pf
              ? ((e = ff),
                (n = n.stateNode),
                8 === e.nodeType
                  ? e.parentNode.removeChild(n)
                  : e.removeChild(n))
              : ff.removeChild(n.stateNode));
        break;
      case 18:
        null !== ff &&
          (pf
            ? ((e = ff),
              (n = n.stateNode),
              8 === e.nodeType
                ? cl(e.parentNode, n)
                : 1 === e.nodeType && cl(e, n),
              qo(e))
            : cl(ff, n.stateNode));
        break;
      case 4:
        (r = ff),
          (a = pf),
          (ff = n.stateNode.containerInfo),
          (pf = !0),
          hf(e, t, n),
          (ff = r),
          (pf = a);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Zd &&
          null !== (r = n.updateQueue) &&
          null !== (r = r.lastEffect)
        ) {
          a = r = r.next;
          do {
            var o = a,
              i = o.destroy;
            (o = o.tag),
              void 0 !== i && (0 != (2 & o) || 0 != (4 & o)) && tf(n, t, i),
              (a = a.next);
          } while (a !== r);
        }
        hf(e, t, n);
        break;
      case 1:
        if (
          !Zd &&
          (ef(n, t),
          "function" == typeof (r = n.stateNode).componentWillUnmount)
        )
          try {
            (r.props = n.memoizedProps),
              (r.state = n.memoizedState),
              r.componentWillUnmount();
          } catch (s) {
            xp(n, t, s);
          }
        hf(e, t, n);
        break;
      case 21:
        hf(e, t, n);
        break;
      case 22:
        1 & n.mode
          ? ((Zd = (r = Zd) || null !== n.memoizedState), hf(e, t, n), (Zd = r))
          : hf(e, t, n);
        break;
      default:
        hf(e, t, n);
    }
  }
  function mf(e) {
    var t = e.updateQueue;
    if (null !== t) {
      e.updateQueue = null;
      var n = e.stateNode;
      null === n && (n = e.stateNode = new Yd()),
        t.forEach(function (t) {
          var r = Rp.bind(null, e, t);
          n.has(t) || (n.add(t), t.then(r, r));
        });
    }
  }
  function vf(e, t) {
    var n = t.deletions;
    if (null !== n)
      for (var r = 0; r < n.length; r++) {
        var a = n[r];
        try {
          var o = e,
            i = t,
            s = i;
          e: for (; null !== s; ) {
            switch (s.tag) {
              case 5:
                (ff = s.stateNode), (pf = !1);
                break e;
              case 3:
              case 4:
                (ff = s.stateNode.containerInfo), (pf = !0);
                break e;
            }
            s = s.return;
          }
          if (null === ff) throw Error(cr(160));
          gf(o, i, a), (ff = null), (pf = !1);
          var l = a.alternate;
          null !== l && (l.return = null), (a.return = null);
        } catch (u) {
          xp(a, t, u);
        }
      }
    if (12854 & t.subtreeFlags)
      for (t = t.child; null !== t; ) yf(t, e), (t = t.sibling);
  }
  function yf(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((vf(t, e), bf(e), 4 & r)) {
          try {
            rf(3, e, e.return), af(3, e);
          } catch (g) {
            xp(e, e.return, g);
          }
          try {
            rf(5, e, e.return);
          } catch (g) {
            xp(e, e.return, g);
          }
        }
        break;
      case 1:
        vf(t, e), bf(e), 512 & r && null !== n && ef(n, n.return);
        break;
      case 5:
        if (
          (vf(t, e),
          bf(e),
          512 & r && null !== n && ef(n, n.return),
          32 & e.flags)
        ) {
          var a = e.stateNode;
          try {
            va(a, "");
          } catch (g) {
            xp(e, e.return, g);
          }
        }
        if (4 & r && null != (a = e.stateNode)) {
          var o = e.memoizedProps,
            i = null !== n ? n.memoizedProps : o,
            s = e.type,
            l = e.updateQueue;
          if (((e.updateQueue = null), null !== l))
            try {
              "input" === s && "radio" === o.type && null != o.name && na(a, o),
                ka(s, i);
              var u = ka(s, o);
              for (i = 0; i < l.length; i += 2) {
                var c = l[i],
                  d = l[i + 1];
                "style" === c
                  ? _a(a, d)
                  : "dangerouslySetInnerHTML" === c
                  ? ma(a, d)
                  : "children" === c
                  ? va(a, d)
                  : kr(a, c, d, u);
              }
              switch (s) {
                case "input":
                  ra(a, o);
                  break;
                case "textarea":
                  ca(a, o);
                  break;
                case "select":
                  var f = a._wrapperState.wasMultiple;
                  a._wrapperState.wasMultiple = !!o.multiple;
                  var p = o.value;
                  null != p
                    ? sa(a, !!o.multiple, p, !1)
                    : f !== !!o.multiple &&
                      (null != o.defaultValue
                        ? sa(a, !!o.multiple, o.defaultValue, !0)
                        : sa(a, !!o.multiple, o.multiple ? [] : "", !1));
              }
              a[gl] = o;
            } catch (g) {
              xp(e, e.return, g);
            }
        }
        break;
      case 6:
        if ((vf(t, e), bf(e), 4 & r)) {
          if (null === e.stateNode) throw Error(cr(162));
          (a = e.stateNode), (o = e.memoizedProps);
          try {
            a.nodeValue = o;
          } catch (g) {
            xp(e, e.return, g);
          }
        }
        break;
      case 3:
        if (
          (vf(t, e), bf(e), 4 & r && null !== n && n.memoizedState.isDehydrated)
        )
          try {
            qo(t.containerInfo);
          } catch (g) {
            xp(e, e.return, g);
          }
        break;
      case 4:
        vf(t, e), bf(e);
        break;
      case 13:
        vf(t, e),
          bf(e),
          8192 & (a = e.child).flags &&
            ((o = null !== a.memoizedState),
            (a.stateNode.isHidden = o),
            !o ||
              (null !== a.alternate && null !== a.alternate.memoizedState) ||
              (Bf = no())),
          4 & r && mf(e);
        break;
      case 22:
        if (
          ((c = null !== n && null !== n.memoizedState),
          1 & e.mode ? ((Zd = (u = Zd) || c), vf(t, e), (Zd = u)) : vf(t, e),
          bf(e),
          8192 & r)
        ) {
          if (
            ((u = null !== e.memoizedState),
            (e.stateNode.isHidden = u) && !c && 0 != (1 & e.mode))
          )
            for (Qd = e, c = e.child; null !== c; ) {
              for (d = Qd = c; null !== Qd; ) {
                switch (((p = (f = Qd).child), f.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    rf(4, f, f.return);
                    break;
                  case 1:
                    ef(f, f.return);
                    var h = f.stateNode;
                    if ("function" == typeof h.componentWillUnmount) {
                      (r = f), (n = f.return);
                      try {
                        (t = r),
                          (h.props = t.memoizedProps),
                          (h.state = t.memoizedState),
                          h.componentWillUnmount();
                      } catch (g) {
                        xp(r, n, g);
                      }
                    }
                    break;
                  case 5:
                    ef(f, f.return);
                    break;
                  case 22:
                    if (null !== f.memoizedState) {
                      Ef(d);
                      continue;
                    }
                }
                null !== p ? ((p.return = f), (Qd = p)) : Ef(d);
              }
              c = c.sibling;
            }
          e: for (c = null, d = e; ; ) {
            if (5 === d.tag) {
              if (null === c) {
                c = d;
                try {
                  (a = d.stateNode),
                    u
                      ? "function" == typeof (o = a.style).setProperty
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none")
                      : ((s = d.stateNode),
                        (i =
                          null != (l = d.memoizedProps.style) &&
                          l.hasOwnProperty("display")
                            ? l.display
                            : null),
                        (s.style.display = wa("display", i)));
                } catch (g) {
                  xp(e, e.return, g);
                }
              }
            } else if (6 === d.tag) {
              if (null === c)
                try {
                  d.stateNode.nodeValue = u ? "" : d.memoizedProps;
                } catch (g) {
                  xp(e, e.return, g);
                }
            } else if (
              ((22 !== d.tag && 23 !== d.tag) ||
                null === d.memoizedState ||
                d === e) &&
              null !== d.child
            ) {
              (d.child.return = d), (d = d.child);
              continue;
            }
            if (d === e) break e;
            for (; null === d.sibling; ) {
              if (null === d.return || d.return === e) break e;
              c === d && (c = null), (d = d.return);
            }
            c === d && (c = null),
              (d.sibling.return = d.return),
              (d = d.sibling);
          }
        }
        break;
      case 19:
        vf(t, e), bf(e), 4 & r && mf(e);
        break;
      case 21:
        break;
      default:
        vf(t, e), bf(e);
    }
  }
  function bf(e) {
    var t = e.flags;
    if (2 & t) {
      try {
        e: {
          for (var n = e.return; null !== n; ) {
            if (lf(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(cr(160));
        }
        switch (r.tag) {
          case 5:
            var a = r.stateNode;
            32 & r.flags && (va(a, ""), (r.flags &= -33)), df(e, uf(e), a);
            break;
          case 3:
          case 4:
            var o = r.stateNode.containerInfo;
            cf(e, uf(e), o);
            break;
          default:
            throw Error(cr(161));
        }
      } catch (i) {
        xp(e, e.return, i);
      }
      e.flags &= -3;
    }
    4096 & t && (e.flags &= -4097);
  }
  function wf(e, t, n) {
    (Qd = e), _f(e);
  }
  function _f(e, t, n) {
    for (var r = 0 != (1 & e.mode); null !== Qd; ) {
      var a = Qd,
        o = a.child;
      if (22 === a.tag && r) {
        var i = null !== a.memoizedState || Jd;
        if (!i) {
          var s = a.alternate,
            l = (null !== s && null !== s.memoizedState) || Zd;
          s = Jd;
          var u = Zd;
          if (((Jd = i), (Zd = l) && !u))
            for (Qd = a; null !== Qd; )
              (l = (i = Qd).child),
                22 === i.tag && null !== i.memoizedState
                  ? kf(a)
                  : null !== l
                  ? ((l.return = i), (Qd = l))
                  : kf(a);
          for (; null !== o; ) (Qd = o), _f(o), (o = o.sibling);
          (Qd = a), (Jd = s), (Zd = u);
        }
        Sf(e);
      } else
        0 != (8772 & a.subtreeFlags) && null !== o
          ? ((o.return = a), (Qd = o))
          : Sf(e);
    }
  }
  function Sf(e) {
    for (; null !== Qd; ) {
      var t = Qd;
      if (0 != (8772 & t.flags)) {
        var n = t.alternate;
        try {
          if (0 != (8772 & t.flags))
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Zd || af(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (4 & t.flags && !Zd)
                  if (null === n) r.componentDidMount();
                  else {
                    var a =
                      t.elementType === t.type
                        ? n.memoizedProps
                        : yu(t.type, n.memoizedProps);
                    r.componentDidUpdate(
                      a,
                      n.memoizedState,
                      r.__reactInternalSnapshotBeforeUpdate
                    );
                  }
                var o = t.updateQueue;
                null !== o && Fu(t, o, r);
                break;
              case 3:
                var i = t.updateQueue;
                if (null !== i) {
                  if (((n = null), null !== t.child))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  Fu(t, i, n);
                }
                break;
              case 5:
                var s = t.stateNode;
                if (null === n && 4 & t.flags) {
                  n = s;
                  var l = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      l.autoFocus && n.focus();
                      break;
                    case "img":
                      l.src && (n.src = l.src);
                  }
                }
                break;
              case 6:
              case 4:
              case 12:
                break;
              case 13:
                if (null === t.memoizedState) {
                  var u = t.alternate;
                  if (null !== u) {
                    var c = u.memoizedState;
                    if (null !== c) {
                      var d = c.dehydrated;
                      null !== d && qo(d);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(cr(163));
            }
          Zd || (512 & t.flags && of(t));
        } catch (f) {
          xp(t, t.return, f);
        }
      }
      if (t === e) {
        Qd = null;
        break;
      }
      if (null !== (n = t.sibling)) {
        (n.return = t.return), (Qd = n);
        break;
      }
      Qd = t.return;
    }
  }
  function Ef(e) {
    for (; null !== Qd; ) {
      var t = Qd;
      if (t === e) {
        Qd = null;
        break;
      }
      var n = t.sibling;
      if (null !== n) {
        (n.return = t.return), (Qd = n);
        break;
      }
      Qd = t.return;
    }
  }
  function kf(e) {
    for (; null !== Qd; ) {
      var t = Qd;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              af(4, t);
            } catch (l) {
              xp(t, n, l);
            }
            break;
          case 1:
            var r = t.stateNode;
            if ("function" == typeof r.componentDidMount) {
              var a = t.return;
              try {
                r.componentDidMount();
              } catch (l) {
                xp(t, a, l);
              }
            }
            var o = t.return;
            try {
              of(t);
            } catch (l) {
              xp(t, o, l);
            }
            break;
          case 5:
            var i = t.return;
            try {
              of(t);
            } catch (l) {
              xp(t, i, l);
            }
        }
      } catch (l) {
        xp(t, t.return, l);
      }
      if (t === e) {
        Qd = null;
        break;
      }
      var s = t.sibling;
      if (null !== s) {
        (s.return = t.return), (Qd = s);
        break;
      }
      Qd = t.return;
    }
  }
  var Of,
    xf = Math.ceil,
    Cf = Or.ReactCurrentDispatcher,
    Tf = Or.ReactCurrentOwner,
    Nf = Or.ReactCurrentBatchConfig,
    Rf = 0,
    Lf = null,
    Pf = null,
    jf = 0,
    If = 0,
    Af = xl(0),
    Df = 0,
    zf = null,
    Mf = 0,
    Uf = 0,
    Ff = 0,
    Hf = null,
    Vf = null,
    Bf = 0,
    Wf = 1 / 0,
    Kf = null,
    $f = !1,
    Gf = null,
    qf = null,
    Xf = !1,
    Jf = null,
    Zf = 0,
    Yf = 0,
    Qf = null,
    ep = -1,
    tp = 0;
  function np() {
    return 0 != (6 & Rf) ? no() : -1 !== ep ? ep : (ep = no());
  }
  function rp(e) {
    return 0 == (1 & e.mode)
      ? 1
      : 0 != (2 & Rf) && 0 !== jf
      ? jf & -jf
      : null !== vu.transition
      ? (0 === tp && (tp = _o()), tp)
      : 0 !== (e = Oo)
      ? e
      : (e = void 0 === (e = window.event) ? 16 : ni(e.type));
  }
  function ap(e, t, n, r) {
    if (50 < Yf) throw ((Yf = 0), (Qf = null), Error(cr(185)));
    Eo(e, n, r),
      (0 != (2 & Rf) && e === Lf) ||
        (e === Lf && (0 == (2 & Rf) && (Uf |= n), 4 === Df && up(e, jf)),
        op(e, r),
        1 === n &&
          0 === Rf &&
          0 == (1 & t.mode) &&
          ((Wf = no() + 500), Hl && Wl()));
  }
  function op(e, t) {
    var n = e.callbackNode;
    !(function (e, t) {
      for (
        var n = e.suspendedLanes,
          r = e.pingedLanes,
          a = e.expirationTimes,
          o = e.pendingLanes;
        0 < o;

      ) {
        var i = 31 - fo(o),
          s = 1 << i,
          l = a[i];
        -1 === l
          ? (0 != (s & n) && 0 == (s & r)) || (a[i] = bo(s, t))
          : l <= t && (e.expiredLanes |= s),
          (o &= ~s);
      }
    })(e, t);
    var r = yo(e, e === Lf ? jf : 0);
    if (0 === r)
      null !== n && Qa(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((null != n && Qa(n), 1 === t))
        0 === e.tag
          ? (function (e) {
              (Hl = !0), Bl(e);
            })(cp.bind(null, e))
          : Bl(cp.bind(null, e)),
          ll(function () {
            0 == (6 & Rf) && Wl();
          }),
          (n = null);
      else {
        switch (xo(r)) {
          case 1:
            n = ao;
            break;
          case 4:
            n = oo;
            break;
          case 16:
            n = io;
            break;
          case 536870912:
            n = lo;
            break;
          default:
            n = io;
        }
        n = Lp(n, ip.bind(null, e));
      }
      (e.callbackPriority = t), (e.callbackNode = n);
    }
  }
  function ip(e, t) {
    if (((ep = -1), (tp = 0), 0 != (6 & Rf))) throw Error(cr(327));
    var n = e.callbackNode;
    if (kp() && e.callbackNode !== n) return null;
    var r = yo(e, e === Lf ? jf : 0);
    if (0 === r) return null;
    if (0 != (30 & r) || 0 != (r & e.expiredLanes) || t) t = yp(e, r);
    else {
      t = r;
      var a = Rf;
      Rf |= 2;
      var o = mp();
      for (
        (Lf === e && jf === t) || ((Kf = null), (Wf = no() + 500), hp(e, t));
        ;

      )
        try {
          wp();
          break;
        } catch (s) {
          gp(e, s);
        }
      Eu(),
        (Cf.current = o),
        (Rf = a),
        null !== Pf ? (t = 0) : ((Lf = null), (jf = 0), (t = Df));
    }
    if (0 !== t) {
      if ((2 === t && 0 !== (a = wo(e)) && ((r = a), (t = sp(e, a))), 1 === t))
        throw ((n = zf), hp(e, 0), up(e, r), op(e, no()), n);
      if (6 === t) up(e, r);
      else {
        if (
          ((a = e.current.alternate),
          0 == (30 & r) &&
            !(function (e) {
              for (var t = e; ; ) {
                if (16384 & t.flags) {
                  var n = t.updateQueue;
                  if (null !== n && null !== (n = n.stores))
                    for (var r = 0; r < n.length; r++) {
                      var a = n[r],
                        o = a.getSnapshot;
                      a = a.value;
                      try {
                        if (!us(o(), a)) return !1;
                      } catch (i) {
                        return !1;
                      }
                    }
                }
                if (((n = t.child), 16384 & t.subtreeFlags && null !== n))
                  (n.return = t), (t = n);
                else {
                  if (t === e) break;
                  for (; null === t.sibling; ) {
                    if (null === t.return || t.return === e) return !0;
                    t = t.return;
                  }
                  (t.sibling.return = t.return), (t = t.sibling);
                }
              }
              return !0;
            })(a) &&
            (2 === (t = yp(e, r)) &&
              0 !== (o = wo(e)) &&
              ((r = o), (t = sp(e, o))),
            1 === t))
        )
          throw ((n = zf), hp(e, 0), up(e, r), op(e, no()), n);
        switch (((e.finishedWork = a), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(cr(345));
          case 2:
            Ep(e, Vf, Kf);
            break;
          case 3:
            if (
              (up(e, r), (130023424 & r) === r && 10 < (t = Bf + 500 - no()))
            ) {
              if (0 !== yo(e, 0)) break;
              if (((a = e.suspendedLanes) & r) !== r) {
                np(), (e.pingedLanes |= e.suspendedLanes & a);
                break;
              }
              e.timeoutHandle = ol(Ep.bind(null, e, Vf, Kf), t);
              break;
            }
            Ep(e, Vf, Kf);
            break;
          case 4:
            if ((up(e, r), (4194240 & r) === r)) break;
            for (t = e.eventTimes, a = -1; 0 < r; ) {
              var i = 31 - fo(r);
              (o = 1 << i), (i = t[i]) > a && (a = i), (r &= ~o);
            }
            if (
              ((r = a),
              10 <
                (r =
                  (120 > (r = no() - r)
                    ? 120
                    : 480 > r
                    ? 480
                    : 1080 > r
                    ? 1080
                    : 1920 > r
                    ? 1920
                    : 3e3 > r
                    ? 3e3
                    : 4320 > r
                    ? 4320
                    : 1960 * xf(r / 1960)) - r))
            ) {
              e.timeoutHandle = ol(Ep.bind(null, e, Vf, Kf), r);
              break;
            }
            Ep(e, Vf, Kf);
            break;
          case 5:
            Ep(e, Vf, Kf);
            break;
          default:
            throw Error(cr(329));
        }
      }
    }
    return op(e, no()), e.callbackNode === n ? ip.bind(null, e) : null;
  }
  function sp(e, t) {
    var n = Hf;
    return (
      e.current.memoizedState.isDehydrated && (hp(e, t).flags |= 256),
      2 !== (e = yp(e, t)) && ((t = Vf), (Vf = n), null !== t && lp(t)),
      e
    );
  }
  function lp(e) {
    null === Vf ? (Vf = e) : Vf.push.apply(Vf, e);
  }
  function up(e, t) {
    for (
      t &= ~Ff,
        t &= ~Uf,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;

    ) {
      var n = 31 - fo(t),
        r = 1 << n;
      (e[n] = -1), (t &= ~r);
    }
  }
  function cp(e) {
    if (0 != (6 & Rf)) throw Error(cr(327));
    kp();
    var t = yo(e, 0);
    if (0 == (1 & t)) return op(e, no()), null;
    var n = yp(e, t);
    if (0 !== e.tag && 2 === n) {
      var r = wo(e);
      0 !== r && ((t = r), (n = sp(e, r)));
    }
    if (1 === n) throw ((n = zf), hp(e, 0), up(e, t), op(e, no()), n);
    if (6 === n) throw Error(cr(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      Ep(e, Vf, Kf),
      op(e, no()),
      null
    );
  }
  function dp(e, t) {
    var n = Rf;
    Rf |= 1;
    try {
      return e(t);
    } finally {
      0 === (Rf = n) && ((Wf = no() + 500), Hl && Wl());
    }
  }
  function fp(e) {
    null !== Jf && 0 === Jf.tag && 0 == (6 & Rf) && kp();
    var t = Rf;
    Rf |= 1;
    var n = Nf.transition,
      r = Oo;
    try {
      if (((Nf.transition = null), (Oo = 1), e)) return e();
    } finally {
      (Oo = r), (Nf.transition = n), 0 == (6 & (Rf = t)) && Wl();
    }
  }
  function pp() {
    (If = Af.current), Cl(Af);
  }
  function hp(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((-1 !== n && ((e.timeoutHandle = -1), il(n)), null !== Pf))
      for (n = Pf.return; null !== n; ) {
        var r = n;
        switch ((ru(r), r.tag)) {
          case 1:
            null != (r = r.type.childContextTypes) && Al();
            break;
          case 3:
            ic(), Cl(Ll), Cl(Rl), fc();
            break;
          case 5:
            lc(r);
            break;
          case 4:
            ic();
            break;
          case 13:
          case 19:
            Cl(uc);
            break;
          case 10:
            ku(r.type._context);
            break;
          case 22:
          case 23:
            pp();
        }
        n = n.return;
      }
    if (
      ((Lf = e),
      (Pf = e = Ap(e.current, null)),
      (jf = If = t),
      (Df = 0),
      (zf = null),
      (Ff = Uf = Mf = 0),
      (Vf = Hf = null),
      null !== Tu)
    ) {
      for (t = 0; t < Tu.length; t++)
        if (null !== (r = (n = Tu[t]).interleaved)) {
          n.interleaved = null;
          var a = r.next,
            o = n.pending;
          if (null !== o) {
            var i = o.next;
            (o.next = a), (r.next = i);
          }
          n.pending = r;
        }
      Tu = null;
    }
    return e;
  }
  function gp(e, t) {
    for (;;) {
      var n = Pf;
      try {
        if ((Eu(), (pc.current = sd), bc)) {
          for (var r = mc.memoizedState; null !== r; ) {
            var a = r.queue;
            null !== a && (a.pending = null), (r = r.next);
          }
          bc = !1;
        }
        if (
          ((gc = 0),
          (yc = vc = mc = null),
          (wc = !1),
          (_c = 0),
          (Tf.current = null),
          null === n || null === n.return)
        ) {
          (Df = 1), (zf = t), (Pf = null);
          break;
        }
        e: {
          var o = e,
            i = n.return,
            s = n,
            l = t;
          if (
            ((t = jf),
            (s.flags |= 32768),
            null !== l && "object" == typeof l && "function" == typeof l.then)
          ) {
            var u = l,
              c = s,
              d = c.tag;
            if (0 == (1 & c.mode) && (0 === d || 11 === d || 15 === d)) {
              var f = c.alternate;
              f
                ? ((c.updateQueue = f.updateQueue),
                  (c.memoizedState = f.memoizedState),
                  (c.lanes = f.lanes))
                : ((c.updateQueue = null), (c.memoizedState = null));
            }
            var p = yd(i);
            if (null !== p) {
              (p.flags &= -257),
                bd(p, i, s, 0, t),
                1 & p.mode && vd(o, u, t),
                (l = u);
              var h = (t = p).updateQueue;
              if (null === h) {
                var g = new Set();
                g.add(l), (t.updateQueue = g);
              } else h.add(l);
              break e;
            }
            if (0 == (1 & t)) {
              vd(o, u, t), vp();
              break e;
            }
            l = Error(cr(426));
          } else if (iu && 1 & s.mode) {
            var m = yd(i);
            if (null !== m) {
              0 == (65536 & m.flags) && (m.flags |= 256),
                bd(m, i, s, 0, t),
                mu(dd(l, s));
              break e;
            }
          }
          (o = l = dd(l, s)),
            4 !== Df && (Df = 2),
            null === Hf ? (Hf = [o]) : Hf.push(o),
            (o = i);
          do {
            switch (o.tag) {
              case 3:
                (o.flags |= 65536),
                  (t &= -t),
                  (o.lanes |= t),
                  Mu(o, gd(0, l, t));
                break e;
              case 1:
                s = l;
                var v = o.type,
                  y = o.stateNode;
                if (
                  0 == (128 & o.flags) &&
                  ("function" == typeof v.getDerivedStateFromError ||
                    (null !== y &&
                      "function" == typeof y.componentDidCatch &&
                      (null === qf || !qf.has(y))))
                ) {
                  (o.flags |= 65536),
                    (t &= -t),
                    (o.lanes |= t),
                    Mu(o, md(o, s, t));
                  break e;
                }
            }
            o = o.return;
          } while (null !== o);
        }
        Sp(n);
      } catch (b) {
        (t = b), Pf === n && null !== n && (Pf = n = n.return);
        continue;
      }
      break;
    }
  }
  function mp() {
    var e = Cf.current;
    return (Cf.current = sd), null === e ? sd : e;
  }
  function vp() {
    (0 !== Df && 3 !== Df && 2 !== Df) || (Df = 4),
      null === Lf ||
        (0 == (268435455 & Mf) && 0 == (268435455 & Uf)) ||
        up(Lf, jf);
  }
  function yp(e, t) {
    var n = Rf;
    Rf |= 2;
    var r = mp();
    for ((Lf === e && jf === t) || ((Kf = null), hp(e, t)); ; )
      try {
        bp();
        break;
      } catch (a) {
        gp(e, a);
      }
    if ((Eu(), (Rf = n), (Cf.current = r), null !== Pf)) throw Error(cr(261));
    return (Lf = null), (jf = 0), Df;
  }
  function bp() {
    for (; null !== Pf; ) _p(Pf);
  }
  function wp() {
    for (; null !== Pf && !eo(); ) _p(Pf);
  }
  function _p(e) {
    var t = Of(e.alternate, e, If);
    (e.memoizedProps = e.pendingProps),
      null === t ? Sp(e) : (Pf = t),
      (Tf.current = null);
  }
  function Sp(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), 0 == (32768 & t.flags))) {
        if (null !== (n = qd(n, t, If))) return void (Pf = n);
      } else {
        if (null !== (n = Xd(n, t))) return (n.flags &= 32767), void (Pf = n);
        if (null === e) return (Df = 6), void (Pf = null);
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      }
      if (null !== (t = t.sibling)) return void (Pf = t);
      Pf = t = e;
    } while (null !== t);
    0 === Df && (Df = 5);
  }
  function Ep(e, t, n) {
    var r = Oo,
      a = Nf.transition;
    try {
      (Nf.transition = null),
        (Oo = 1),
        (function (e, t, n, r) {
          do {
            kp();
          } while (null !== Jf);
          if (0 != (6 & Rf)) throw Error(cr(327));
          n = e.finishedWork;
          var a = e.finishedLanes;
          if (null === n) return null;
          if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
            throw Error(cr(177));
          (e.callbackNode = null), (e.callbackPriority = 0);
          var o = n.lanes | n.childLanes;
          if (
            ((function (e, t) {
              var n = e.pendingLanes & ~t;
              (e.pendingLanes = t),
                (e.suspendedLanes = 0),
                (e.pingedLanes = 0),
                (e.expiredLanes &= t),
                (e.mutableReadLanes &= t),
                (e.entangledLanes &= t),
                (t = e.entanglements);
              var r = e.eventTimes;
              for (e = e.expirationTimes; 0 < n; ) {
                var a = 31 - fo(n),
                  o = 1 << a;
                (t[a] = 0), (r[a] = -1), (e[a] = -1), (n &= ~o);
              }
            })(e, o),
            e === Lf && ((Pf = Lf = null), (jf = 0)),
            (0 == (2064 & n.subtreeFlags) && 0 == (2064 & n.flags)) ||
              Xf ||
              ((Xf = !0),
              Lp(io, function () {
                return kp(), null;
              })),
            (o = 0 != (15990 & n.flags)),
            0 != (15990 & n.subtreeFlags) || o)
          ) {
            (o = Nf.transition), (Nf.transition = null);
            var i = Oo;
            Oo = 1;
            var s = Rf;
            (Rf |= 4),
              (Tf.current = null),
              (function (e, t) {
                if (((nl = Jo), gs((e = hs())))) {
                  if ("selectionStart" in e)
                    var n = { start: e.selectionStart, end: e.selectionEnd };
                  else
                    e: {
                      var r =
                        (n = ((n = e.ownerDocument) && n.defaultView) || window)
                          .getSelection && n.getSelection();
                      if (r && 0 !== r.rangeCount) {
                        n = r.anchorNode;
                        var a = r.anchorOffset,
                          o = r.focusNode;
                        r = r.focusOffset;
                        try {
                          n.nodeType, o.nodeType;
                        } catch (w) {
                          n = null;
                          break e;
                        }
                        var i = 0,
                          s = -1,
                          l = -1,
                          u = 0,
                          c = 0,
                          d = e,
                          f = null;
                        t: for (;;) {
                          for (
                            var p;
                            d !== n ||
                              (0 !== a && 3 !== d.nodeType) ||
                              (s = i + a),
                              d !== o ||
                                (0 !== r && 3 !== d.nodeType) ||
                                (l = i + r),
                              3 === d.nodeType && (i += d.nodeValue.length),
                              null !== (p = d.firstChild);

                          )
                            (f = d), (d = p);
                          for (;;) {
                            if (d === e) break t;
                            if (
                              (f === n && ++u === a && (s = i),
                              f === o && ++c === r && (l = i),
                              null !== (p = d.nextSibling))
                            )
                              break;
                            f = (d = f).parentNode;
                          }
                          d = p;
                        }
                        n = -1 === s || -1 === l ? null : { start: s, end: l };
                      } else n = null;
                    }
                  n = n || { start: 0, end: 0 };
                } else n = null;
                for (
                  rl = { focusedElem: e, selectionRange: n }, Jo = !1, Qd = t;
                  null !== Qd;

                )
                  if (
                    ((e = (t = Qd).child),
                    0 != (1028 & t.subtreeFlags) && null !== e)
                  )
                    (e.return = t), (Qd = e);
                  else
                    for (; null !== Qd; ) {
                      t = Qd;
                      try {
                        var h = t.alternate;
                        if (0 != (1024 & t.flags))
                          switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                              break;
                            case 1:
                              if (null !== h) {
                                var g = h.memoizedProps,
                                  m = h.memoizedState,
                                  v = t.stateNode,
                                  y = v.getSnapshotBeforeUpdate(
                                    t.elementType === t.type
                                      ? g
                                      : yu(t.type, g),
                                    m
                                  );
                                v.__reactInternalSnapshotBeforeUpdate = y;
                              }
                              break;
                            case 3:
                              var b = t.stateNode.containerInfo;
                              1 === b.nodeType
                                ? (b.textContent = "")
                                : 9 === b.nodeType &&
                                  b.documentElement &&
                                  b.removeChild(b.documentElement);
                              break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                              break;
                            default:
                              throw Error(cr(163));
                          }
                      } catch (w) {
                        xp(t, t.return, w);
                      }
                      if (null !== (e = t.sibling)) {
                        (e.return = t.return), (Qd = e);
                        break;
                      }
                      Qd = t.return;
                    }
                (h = nf), (nf = !1);
              })(e, n),
              yf(n, e),
              ms(rl),
              (Jo = !!nl),
              (rl = nl = null),
              (e.current = n),
              wf(n),
              to(),
              (Rf = s),
              (Oo = i),
              (Nf.transition = o);
          } else e.current = n;
          if (
            (Xf && ((Xf = !1), (Jf = e), (Zf = a)),
            0 === (o = e.pendingLanes) && (qf = null),
            (function (e) {
              if (co && "function" == typeof co.onCommitFiberRoot)
                try {
                  co.onCommitFiberRoot(
                    uo,
                    e,
                    void 0,
                    128 == (128 & e.current.flags)
                  );
                } catch (t) {}
            })(n.stateNode),
            op(e, no()),
            null !== t)
          )
            for (r = e.onRecoverableError, n = 0; n < t.length; n++)
              (a = t[n]),
                r(a.value, { componentStack: a.stack, digest: a.digest });
          if ($f) throw (($f = !1), (e = Gf), (Gf = null), e);
          0 != (1 & Zf) && 0 !== e.tag && kp(),
            0 != (1 & (o = e.pendingLanes))
              ? e === Qf
                ? Yf++
                : ((Yf = 0), (Qf = e))
              : (Yf = 0),
            Wl();
        })(e, t, n, r);
    } finally {
      (Nf.transition = a), (Oo = r);
    }
    return null;
  }
  function kp() {
    if (null !== Jf) {
      var e = xo(Zf),
        t = Nf.transition,
        n = Oo;
      try {
        if (((Nf.transition = null), (Oo = 16 > e ? 16 : e), null === Jf))
          var r = !1;
        else {
          if (((e = Jf), (Jf = null), (Zf = 0), 0 != (6 & Rf)))
            throw Error(cr(331));
          var a = Rf;
          for (Rf |= 4, Qd = e.current; null !== Qd; ) {
            var o = Qd,
              i = o.child;
            if (0 != (16 & Qd.flags)) {
              var s = o.deletions;
              if (null !== s) {
                for (var l = 0; l < s.length; l++) {
                  var u = s[l];
                  for (Qd = u; null !== Qd; ) {
                    var c = Qd;
                    switch (c.tag) {
                      case 0:
                      case 11:
                      case 15:
                        rf(8, c, o);
                    }
                    var d = c.child;
                    if (null !== d) (d.return = c), (Qd = d);
                    else
                      for (; null !== Qd; ) {
                        var f = (c = Qd).sibling,
                          p = c.return;
                        if ((sf(c), c === u)) {
                          Qd = null;
                          break;
                        }
                        if (null !== f) {
                          (f.return = p), (Qd = f);
                          break;
                        }
                        Qd = p;
                      }
                  }
                }
                var h = o.alternate;
                if (null !== h) {
                  var g = h.child;
                  if (null !== g) {
                    h.child = null;
                    do {
                      var m = g.sibling;
                      (g.sibling = null), (g = m);
                    } while (null !== g);
                  }
                }
                Qd = o;
              }
            }
            if (0 != (2064 & o.subtreeFlags) && null !== i)
              (i.return = o), (Qd = i);
            else
              e: for (; null !== Qd; ) {
                if (0 != (2048 & (o = Qd).flags))
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      rf(9, o, o.return);
                  }
                var v = o.sibling;
                if (null !== v) {
                  (v.return = o.return), (Qd = v);
                  break e;
                }
                Qd = o.return;
              }
          }
          var y = e.current;
          for (Qd = y; null !== Qd; ) {
            var b = (i = Qd).child;
            if (0 != (2064 & i.subtreeFlags) && null !== b)
              (b.return = i), (Qd = b);
            else
              e: for (i = y; null !== Qd; ) {
                if (0 != (2048 & (s = Qd).flags))
                  try {
                    switch (s.tag) {
                      case 0:
                      case 11:
                      case 15:
                        af(9, s);
                    }
                  } catch (_) {
                    xp(s, s.return, _);
                  }
                if (s === i) {
                  Qd = null;
                  break e;
                }
                var w = s.sibling;
                if (null !== w) {
                  (w.return = s.return), (Qd = w);
                  break e;
                }
                Qd = s.return;
              }
          }
          if (
            ((Rf = a),
            Wl(),
            co && "function" == typeof co.onPostCommitFiberRoot)
          )
            try {
              co.onPostCommitFiberRoot(uo, e);
            } catch (_) {}
          r = !0;
        }
        return r;
      } finally {
        (Oo = n), (Nf.transition = t);
      }
    }
    return !1;
  }
  function Op(e, t, n) {
    (e = Du(e, (t = gd(0, (t = dd(n, t)), 1)), 1)),
      (t = np()),
      null !== e && (Eo(e, 1, t), op(e, t));
  }
  function xp(e, t, n) {
    if (3 === e.tag) Op(e, e, n);
    else
      for (; null !== t; ) {
        if (3 === t.tag) {
          Op(t, e, n);
          break;
        }
        if (1 === t.tag) {
          var r = t.stateNode;
          if (
            "function" == typeof t.type.getDerivedStateFromError ||
            ("function" == typeof r.componentDidCatch &&
              (null === qf || !qf.has(r)))
          ) {
            (t = Du(t, (e = md(t, (e = dd(n, e)), 1)), 1)),
              (e = np()),
              null !== t && (Eo(t, 1, e), op(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function Cp(e, t, n) {
    var r = e.pingCache;
    null !== r && r.delete(t),
      (t = np()),
      (e.pingedLanes |= e.suspendedLanes & n),
      Lf === e &&
        (jf & n) === n &&
        (4 === Df || (3 === Df && (130023424 & jf) === jf && 500 > no() - Bf)
          ? hp(e, 0)
          : (Ff |= n)),
      op(e, t);
  }
  function Tp(e, t) {
    0 === t &&
      (0 == (1 & e.mode)
        ? (t = 1)
        : ((t = mo), 0 == (130023424 & (mo <<= 1)) && (mo = 4194304)));
    var n = np();
    null !== (e = Lu(e, t)) && (Eo(e, t, n), op(e, n));
  }
  function Np(e) {
    var t = e.memoizedState,
      n = 0;
    null !== t && (n = t.retryLane), Tp(e, n);
  }
  function Rp(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          a = e.memoizedState;
        null !== a && (n = a.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(cr(314));
    }
    null !== r && r.delete(t), Tp(e, n);
  }
  function Lp(e, t) {
    return Ya(e, t);
  }
  function Pp(e, t, n, r) {
    (this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function jp(e, t, n, r) {
    return new Pp(e, t, n, r);
  }
  function Ip(e) {
    return !(!(e = e.prototype) || !e.isReactComponent);
  }
  function Ap(e, t) {
    var n = e.alternate;
    return (
      null === n
        ? (((n = jp(e.tag, t, e.key, e.mode)).elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = 14680064 & e.flags),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        null === t ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function Dp(e, t, n, r, a, o) {
    var i = 2;
    if (((r = e), "function" == typeof e)) Ip(e) && (i = 1);
    else if ("string" == typeof e) i = 5;
    else
      e: switch (e) {
        case Tr:
          return zp(n.children, a, o, t);
        case Nr:
          (i = 8), (a |= 8);
          break;
        case Rr:
          return ((e = jp(12, n, t, 2 | a)).elementType = Rr), (e.lanes = o), e;
        case Ir:
          return ((e = jp(13, n, t, a)).elementType = Ir), (e.lanes = o), e;
        case Ar:
          return ((e = jp(19, n, t, a)).elementType = Ar), (e.lanes = o), e;
        case Mr:
          return Mp(n, a, o, t);
        default:
          if ("object" == typeof e && null !== e)
            switch (e.$$typeof) {
              case Lr:
                i = 10;
                break e;
              case Pr:
                i = 9;
                break e;
              case jr:
                i = 11;
                break e;
              case Dr:
                i = 14;
                break e;
              case zr:
                (i = 16), (r = null);
                break e;
            }
          throw Error(cr(130, null == e ? e : typeof e, ""));
      }
    return (
      ((t = jp(i, n, t, a)).elementType = e), (t.type = r), (t.lanes = o), t
    );
  }
  function zp(e, t, n, r) {
    return ((e = jp(7, e, r, t)).lanes = n), e;
  }
  function Mp(e, t, n, r) {
    return (
      ((e = jp(22, e, r, t)).elementType = Mr),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function Up(e, t, n) {
    return ((e = jp(6, e, null, t)).lanes = n), e;
  }
  function Fp(e, t, n) {
    return (
      ((t = jp(4, null !== e.children ? e.children : [], e.key, t)).lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function Hp(e, t, n, r, a) {
    (this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = So(0)),
      (this.expirationTimes = So(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = So(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = a),
      (this.mutableSourceEagerHydrationData = null);
  }
  function Vp(e, t, n, r, a, o, i, s, l) {
    return (
      (e = new Hp(e, t, n, s, l)),
      1 === t ? ((t = 1), !0 === o && (t |= 8)) : (t = 0),
      (o = jp(3, null, null, t)),
      (e.current = o),
      (o.stateNode = e),
      (o.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      ju(o),
      e
    );
  }
  function Bp(e, t, n) {
    var r =
      3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: Cr,
      key: null == r ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function Wp(e) {
    if (!e) return Nl;
    e: {
      if (Ga((e = e._reactInternals)) !== e || 1 !== e.tag)
        throw Error(cr(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Il(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (null !== t);
      throw Error(cr(171));
    }
    if (1 === e.tag) {
      var n = e.type;
      if (Il(n)) return zl(e, n, t);
    }
    return t;
  }
  function Kp(e, t, n, r, a, o, i, s, l) {
    return (
      ((e = Vp(n, r, !0, e, 0, o, 0, s, l)).context = Wp(null)),
      (n = e.current),
      ((o = Au((r = np()), (a = rp(n)))).callback = null != t ? t : null),
      Du(n, o, a),
      (e.current.lanes = a),
      Eo(e, a, r),
      op(e, r),
      e
    );
  }
  function $p(e, t, n, r) {
    var a = t.current,
      o = np(),
      i = rp(a);
    return (
      (n = Wp(n)),
      null === t.context ? (t.context = n) : (t.pendingContext = n),
      ((t = Au(o, i)).payload = { element: e }),
      null !== (r = void 0 === r ? null : r) && (t.callback = r),
      null !== (e = Du(a, t, i)) && (ap(e, a, i, o), zu(e, a, i)),
      i
    );
  }
  function Gp(e) {
    if (!(e = e.current).child) return null;
    switch (e.child.tag) {
      case 5:
      default:
        return e.child.stateNode;
    }
  }
  function qp(e, t) {
    if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
      var n = e.retryLane;
      e.retryLane = 0 !== n && n < t ? n : t;
    }
  }
  function Xp(e, t) {
    qp(e, t), (e = e.alternate) && qp(e, t);
  }
  Of = function (e, t, n) {
    if (null !== e)
      if (e.memoizedProps !== t.pendingProps || Ll.current) _d = !0;
      else {
        if (0 == (e.lanes & n) && 0 == (128 & t.flags))
          return (
            (_d = !1),
            (function (e, t, n) {
              switch (t.tag) {
                case 3:
                  Ld(t), gu();
                  break;
                case 5:
                  sc(t);
                  break;
                case 1:
                  Il(t.type) && Ml(t);
                  break;
                case 4:
                  oc(t, t.stateNode.containerInfo);
                  break;
                case 10:
                  var r = t.type._context,
                    a = t.memoizedProps.value;
                  Tl(bu, r._currentValue), (r._currentValue = a);
                  break;
                case 13:
                  if (null !== (r = t.memoizedState))
                    return null !== r.dehydrated
                      ? (Tl(uc, 1 & uc.current), (t.flags |= 128), null)
                      : 0 != (n & t.child.childLanes)
                      ? Md(e, t, n)
                      : (Tl(uc, 1 & uc.current),
                        null !== (e = Kd(e, t, n)) ? e.sibling : null);
                  Tl(uc, 1 & uc.current);
                  break;
                case 19:
                  if (((r = 0 != (n & t.childLanes)), 0 != (128 & e.flags))) {
                    if (r) return Bd(e, t, n);
                    t.flags |= 128;
                  }
                  if (
                    (null !== (a = t.memoizedState) &&
                      ((a.rendering = null),
                      (a.tail = null),
                      (a.lastEffect = null)),
                    Tl(uc, uc.current),
                    r)
                  )
                    break;
                  return null;
                case 22:
                case 23:
                  return (t.lanes = 0), xd(e, t, n);
              }
              return Kd(e, t, n);
            })(e, t, n)
          );
        _d = 0 != (131072 & e.flags);
      }
    else (_d = !1), iu && 0 != (1048576 & t.flags) && tu(t, ql, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        Wd(e, t), (e = t.pendingProps);
        var a = jl(t, Rl.current);
        xu(t, n), (a = Oc(null, t, r, e, a, n));
        var o = xc();
        return (
          (t.flags |= 1),
          "object" == typeof a &&
          null !== a &&
          "function" == typeof a.render &&
          void 0 === a.$$typeof
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              Il(r) ? ((o = !0), Ml(t)) : (o = !1),
              (t.memoizedState =
                null !== a.state && void 0 !== a.state ? a.state : null),
              ju(t),
              (a.updater = Bu),
              (t.stateNode = a),
              (a._reactInternals = t),
              Gu(t, r, e, n),
              (t = Rd(null, t, r, !0, o, n)))
            : ((t.tag = 0), iu && o && nu(t), Sd(null, t, a, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            (Wd(e, t),
            (e = t.pendingProps),
            (r = (a = r._init)(r._payload)),
            (t.type = r),
            (a = t.tag =
              (function (e) {
                if ("function" == typeof e) return Ip(e) ? 1 : 0;
                if (null != e) {
                  if ((e = e.$$typeof) === jr) return 11;
                  if (e === Dr) return 14;
                }
                return 2;
              })(r)),
            (e = yu(r, e)),
            a)
          ) {
            case 0:
              t = Td(null, t, r, e, n);
              break e;
            case 1:
              t = Nd(null, t, r, e, n);
              break e;
            case 11:
              t = Ed(null, t, r, e, n);
              break e;
            case 14:
              t = kd(null, t, r, yu(r.type, e), n);
              break e;
          }
          throw Error(cr(306, r, ""));
        }
        return t;
      case 0:
        return (
          (r = t.type),
          (a = t.pendingProps),
          Td(e, t, r, (a = t.elementType === r ? a : yu(r, a)), n)
        );
      case 1:
        return (
          (r = t.type),
          (a = t.pendingProps),
          Nd(e, t, r, (a = t.elementType === r ? a : yu(r, a)), n)
        );
      case 3:
        e: {
          if ((Ld(t), null === e)) throw Error(cr(387));
          (r = t.pendingProps),
            (a = (o = t.memoizedState).element),
            Iu(e, t),
            Uu(t, r, null, n);
          var i = t.memoizedState;
          if (((r = i.element), o.isDehydrated)) {
            if (
              ((o = {
                element: r,
                isDehydrated: !1,
                cache: i.cache,
                pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                transitions: i.transitions,
              }),
              (t.updateQueue.baseState = o),
              (t.memoizedState = o),
              256 & t.flags)
            ) {
              t = Pd(e, t, r, n, (a = dd(Error(cr(423)), t)));
              break e;
            }
            if (r !== a) {
              t = Pd(e, t, r, n, (a = dd(Error(cr(424)), t)));
              break e;
            }
            for (
              ou = dl(t.stateNode.containerInfo.firstChild),
                au = t,
                iu = !0,
                su = null,
                n = Qu(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (-3 & n.flags) | 4096), (n = n.sibling);
          } else {
            if ((gu(), r === a)) {
              t = Kd(e, t, n);
              break e;
            }
            Sd(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          sc(t),
          null === e && du(t),
          (r = t.type),
          (a = t.pendingProps),
          (o = null !== e ? e.memoizedProps : null),
          (i = a.children),
          al(r, a) ? (i = null) : null !== o && al(r, o) && (t.flags |= 32),
          Cd(e, t),
          Sd(e, t, i, n),
          t.child
        );
      case 6:
        return null === e && du(t), null;
      case 13:
        return Md(e, t, n);
      case 4:
        return (
          oc(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          null === e ? (t.child = Yu(t, null, r, n)) : Sd(e, t, r, n),
          t.child
        );
      case 11:
        return (
          (r = t.type),
          (a = t.pendingProps),
          Ed(e, t, r, (a = t.elementType === r ? a : yu(r, a)), n)
        );
      case 7:
        return Sd(e, t, t.pendingProps, n), t.child;
      case 8:
      case 12:
        return Sd(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (a = t.pendingProps),
            (o = t.memoizedProps),
            (i = a.value),
            Tl(bu, r._currentValue),
            (r._currentValue = i),
            null !== o)
          )
            if (us(o.value, i)) {
              if (o.children === a.children && !Ll.current) {
                t = Kd(e, t, n);
                break e;
              }
            } else
              for (null !== (o = t.child) && (o.return = t); null !== o; ) {
                var s = o.dependencies;
                if (null !== s) {
                  i = o.child;
                  for (var l = s.firstContext; null !== l; ) {
                    if (l.context === r) {
                      if (1 === o.tag) {
                        (l = Au(-1, n & -n)).tag = 2;
                        var u = o.updateQueue;
                        if (null !== u) {
                          var c = (u = u.shared).pending;
                          null === c
                            ? (l.next = l)
                            : ((l.next = c.next), (c.next = l)),
                            (u.pending = l);
                        }
                      }
                      (o.lanes |= n),
                        null !== (l = o.alternate) && (l.lanes |= n),
                        Ou(o.return, n, t),
                        (s.lanes |= n);
                      break;
                    }
                    l = l.next;
                  }
                } else if (10 === o.tag) i = o.type === t.type ? null : o.child;
                else if (18 === o.tag) {
                  if (null === (i = o.return)) throw Error(cr(341));
                  (i.lanes |= n),
                    null !== (s = i.alternate) && (s.lanes |= n),
                    Ou(i, n, t),
                    (i = o.sibling);
                } else i = o.child;
                if (null !== i) i.return = o;
                else
                  for (i = o; null !== i; ) {
                    if (i === t) {
                      i = null;
                      break;
                    }
                    if (null !== (o = i.sibling)) {
                      (o.return = i.return), (i = o);
                      break;
                    }
                    i = i.return;
                  }
                o = i;
              }
          Sd(e, t, a.children, n), (t = t.child);
        }
        return t;
      case 9:
        return (
          (a = t.type),
          (r = t.pendingProps.children),
          xu(t, n),
          (r = r((a = Cu(a)))),
          (t.flags |= 1),
          Sd(e, t, r, n),
          t.child
        );
      case 14:
        return (
          (a = yu((r = t.type), t.pendingProps)),
          kd(e, t, r, (a = yu(r.type, a)), n)
        );
      case 15:
        return Od(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (a = t.pendingProps),
          (a = t.elementType === r ? a : yu(r, a)),
          Wd(e, t),
          (t.tag = 1),
          Il(r) ? ((e = !0), Ml(t)) : (e = !1),
          xu(t, n),
          Ku(t, r, a),
          Gu(t, r, a, n),
          Rd(null, t, r, !0, e, n)
        );
      case 19:
        return Bd(e, t, n);
      case 22:
        return xd(e, t, n);
    }
    throw Error(cr(156, t.tag));
  };
  var Jp =
    "function" == typeof reportError
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Zp(e) {
    this._internalRoot = e;
  }
  function Yp(e) {
    this._internalRoot = e;
  }
  function Qp(e) {
    return !(!e || (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType));
  }
  function eh(e) {
    return !(
      !e ||
      (1 !== e.nodeType &&
        9 !== e.nodeType &&
        11 !== e.nodeType &&
        (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
    );
  }
  function th() {}
  function nh(e, t, n, r, a) {
    var o = n._reactRootContainer;
    if (o) {
      var i = o;
      if ("function" == typeof a) {
        var s = a;
        a = function () {
          var e = Gp(i);
          s.call(e);
        };
      }
      $p(t, i, e, a);
    } else
      i = (function (e, t, n, r, a) {
        if (a) {
          if ("function" == typeof r) {
            var o = r;
            r = function () {
              var e = Gp(i);
              o.call(e);
            };
          }
          var i = Kp(t, r, e, 0, null, !1, 0, "", th);
          return (
            (e._reactRootContainer = i),
            (e[ml] = i.current),
            Ws(8 === e.nodeType ? e.parentNode : e),
            fp(),
            i
          );
        }
        for (; (a = e.lastChild); ) e.removeChild(a);
        if ("function" == typeof r) {
          var s = r;
          r = function () {
            var e = Gp(l);
            s.call(e);
          };
        }
        var l = Vp(e, 0, !1, null, 0, !1, 0, "", th);
        return (
          (e._reactRootContainer = l),
          (e[ml] = l.current),
          Ws(8 === e.nodeType ? e.parentNode : e),
          fp(function () {
            $p(t, l, n, r);
          }),
          l
        );
      })(n, t, e, a, r);
    return Gp(i);
  }
  (Yp.prototype.render = Zp.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (null === t) throw Error(cr(409));
      $p(e, t, null, null);
    }),
    (Yp.prototype.unmount = Zp.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (null !== e) {
          this._internalRoot = null;
          var t = e.containerInfo;
          fp(function () {
            $p(null, e, null, null);
          }),
            (t[ml] = null);
        }
      }),
    (Yp.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = Ro();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < Uo.length && 0 !== t && t < Uo[n].priority; n++);
        Uo.splice(n, 0, e), 0 === n && Bo(e);
      }
    }),
    (Co = function (e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var n = vo(t.pendingLanes);
            0 !== n &&
              (ko(t, 1 | n),
              op(t, no()),
              0 == (6 & Rf) && ((Wf = no() + 500), Wl()));
          }
          break;
        case 13:
          fp(function () {
            var t = Lu(e, 1);
            if (null !== t) {
              var n = np();
              ap(t, e, 1, n);
            }
          }),
            Xp(e, 1);
      }
    }),
    (To = function (e) {
      if (13 === e.tag) {
        var t = Lu(e, 134217728);
        if (null !== t) ap(t, e, 134217728, np());
        Xp(e, 134217728);
      }
    }),
    (No = function (e) {
      if (13 === e.tag) {
        var t = rp(e),
          n = Lu(e, t);
        if (null !== n) ap(n, e, t, np());
        Xp(e, t);
      }
    }),
    (Ro = function () {
      return Oo;
    }),
    (Lo = function (e, t) {
      var n = Oo;
      try {
        return (Oo = e), t();
      } finally {
        Oo = n;
      }
    }),
    (Ca = function (e, t, n) {
      switch (t) {
        case "input":
          if ((ra(e, n), (t = n.name), "radio" === n.type && null != t)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var a = El(r);
                if (!a) throw Error(cr(90));
                Yr(r), ra(r, a);
              }
            }
          }
          break;
        case "textarea":
          ca(e, n);
          break;
        case "select":
          null != (t = n.value) && sa(e, !!n.multiple, t, !1);
      }
    }),
    (ja = dp),
    (Ia = fp);
  var rh = { usingClientEntryPoint: !1, Events: [_l, Sl, El, La, Pa, dp] },
    ah = {
      findFiberByHostInstance: wl,
      bundleType: 0,
      version: "18.2.0",
      rendererPackageName: "react-dom",
    },
    oh = {
      bundleType: ah.bundleType,
      version: ah.version,
      rendererPackageName: ah.rendererPackageName,
      rendererConfig: ah.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: Or.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return null === (e = Ja(e)) ? null : e.stateNode;
      },
      findFiberByHostInstance:
        ah.findFiberByHostInstance ||
        function () {
          return null;
        },
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
    };
  if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var ih = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ih.isDisabled && ih.supportsFiber)
      try {
        (uo = ih.inject(oh)), (co = ih);
      } catch (ga) {}
  }
  (ar.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rh),
    (ar.createPortal = function (e, t) {
      var n =
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!Qp(t)) throw Error(cr(200));
      return Bp(e, t, null, n);
    }),
    (ar.createRoot = function (e, t) {
      if (!Qp(e)) throw Error(cr(299));
      var n = !1,
        r = "",
        a = Jp;
      return (
        null != t &&
          (!0 === t.unstable_strictMode && (n = !0),
          void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
          void 0 !== t.onRecoverableError && (a = t.onRecoverableError)),
        (t = Vp(e, 1, !1, null, 0, n, 0, r, a)),
        (e[ml] = t.current),
        Ws(8 === e.nodeType ? e.parentNode : e),
        new Zp(t)
      );
    }),
    (ar.findDOMNode = function (e) {
      if (null == e) return null;
      if (1 === e.nodeType) return e;
      var t = e._reactInternals;
      if (void 0 === t) {
        if ("function" == typeof e.render) throw Error(cr(188));
        throw ((e = Object.keys(e).join(",")), Error(cr(268, e)));
      }
      return (e = null === (e = Ja(t)) ? null : e.stateNode);
    }),
    (ar.flushSync = function (e) {
      return fp(e);
    }),
    (ar.hydrate = function (e, t, n) {
      if (!eh(t)) throw Error(cr(200));
      return nh(null, e, t, !0, n);
    }),
    (ar.hydrateRoot = function (e, t, n) {
      if (!Qp(e)) throw Error(cr(405));
      var r = (null != n && n.hydratedSources) || null,
        a = !1,
        o = "",
        i = Jp;
      if (
        (null != n &&
          (!0 === n.unstable_strictMode && (a = !0),
          void 0 !== n.identifierPrefix && (o = n.identifierPrefix),
          void 0 !== n.onRecoverableError && (i = n.onRecoverableError)),
        (t = Kp(t, null, e, 1, null != n ? n : null, a, 0, o, i)),
        (e[ml] = t.current),
        Ws(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          (a = (a = (n = r[e])._getVersion)(n._source)),
            null == t.mutableSourceEagerHydrationData
              ? (t.mutableSourceEagerHydrationData = [n, a])
              : t.mutableSourceEagerHydrationData.push(n, a);
      return new Yp(t);
    }),
    (ar.render = function (e, t, n) {
      if (!eh(t)) throw Error(cr(200));
      return nh(null, e, t, !1, n);
    }),
    (ar.unmountComponentAtNode = function (e) {
      if (!eh(e)) throw Error(cr(40));
      return (
        !!e._reactRootContainer &&
        (fp(function () {
          nh(null, null, e, !1, function () {
            (e._reactRootContainer = null), (e[ml] = null);
          });
        }),
        !0)
      );
    }),
    (ar.unstable_batchedUpdates = dp),
    (ar.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!eh(n)) throw Error(cr(200));
      if (null == e || void 0 === e._reactInternals) throw Error(cr(38));
      return nh(e, t, n, !1, r);
    }),
    (ar.version = "18.2.0-next-9e3b772b8-20220608"),
    (function e() {
      if (
        "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
        } catch (t) {
          console.error(t);
        }
    })(),
    (rr.exports = ar);
  var sh = rr.exports,
    lh = sh;
  (nr.createRoot = lh.createRoot), (nr.hydrateRoot = lh.hydrateRoot);
  var uh = {
    VITE_AUTHENTICATION_SUBJECT: "sso",
    VITE_LOCAL_HMG_HOME: "https://local-admin.hmg-corp.io:3001",
    VITE_LOCAL_SSO_HOST: "https://dev-admin-api.hmg-corp.io",
    VITE_LOCAL_SSO_HOST_EU: "https://dev-admin-internal-api-eu.hmg-corp.io",
    VITE_LOCAL_CONFIG_HOST: "https://dev-admin-config.hmg-corp.io",
    VITE_DEV_HMG_HOME: "https://dev-admin.hmg-corp.io",
    VITE_DEV_SSO_HOST: "https://dev-admin-api.hmg-corp.io",
    VITE_DEV_SSO_HOST_EU: "https://dev-admin-internal-api-eu.hmg-corp.io",
    VITE_DEV_CONFIG_HOST: "https://dev-admin-config.hmg-corp.io",
    VITE_STG_HMG_HOME: "https://stg-admin.hmg-corp.io",
    VITE_STG_SSO_HOST: "https://stg-admin-api.hmg-corp.io",
    VITE_STG_SSO_HOST_EU: "https://stg-admin-internal-api-eu.hmg-corp.io",
    VITE_STG_SSO_HOST_US: "https://stg-admin-internal-api-us.hmg-corp.io",
    VITE_STG_CONFIG_HOST: "https://stg-admin-config.hmg-corp.io",
    VITE_PRD_HMG_HOME: "https://admin.hmg-corp.io",
    VITE_PRD_SSO_HOST: "https://admin-api.hmg-corp.io",
    VITE_PRD_SSO_HOST_EU: "https://admin-internal-api-eu.hmg-corp.io",
    VITE_PRD_SSO_HOST_US: "https://admin-internal-api-us.hmg-corp.io",
    VITE_PRD_CONFIG_HOST: "https://admin-config.hmg-corp.io",
    VITE_DEV_COOKIE_TOKEN_PREFIX: "X-dev-hmg-admin-auth-",
    VITE_DEV_COOKIE_TOKEN_NAME: "X-dev-hmg-admin-authorization",
    VITE_STG_COOKIE_TOKEN_PREFIX: "X-stg-hmg-admin-auth-",
    VITE_STG_COOKIE_TOKEN_NAME: "X-stg-hmg-admin-authorization",
    VITE_PRD_COOKIE_TOKEN_PREFIX: "X-hmg-admin-auth-",
    VITE_PRD_COOKIE_TOKEN_NAME: "X-hmg-admin-authorization",
    BASE_URL: "/",
    MODE: "original",
    DEV: !1,
    PROD: !0,
    SSR: !1,
  };
  const ch = (e) => {
      let t;
      const n = new Set(),
        r = (e, r) => {
          const a = "function" == typeof e ? e(t) : e;
          if (!Object.is(a, t)) {
            const e = t;
            (t = (null != r ? r : "object" != typeof a)
              ? a
              : Object.assign({}, t, a)),
              n.forEach((n) => n(t, e));
          }
        },
        a = () => t,
        o = {
          setState: r,
          getState: a,
          subscribe: (e) => (n.add(e), () => n.delete(e)),
          destroy: () => {
            "production" !== (uh ? "original" : void 0) &&
              console.warn(
                "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
              ),
              n.clear();
          },
        };
      return (t = e(r, a, o)), o;
    },
    dh = (e) => (e ? ch(e) : ch);
  var fh = { exports: {} },
    ph = {},
    hh = { exports: {} },
    gh = {},
    mh = Ft;
  var vh =
      "function" == typeof Object.is
        ? Object.is
        : function (e, t) {
            return (
              (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
            );
          },
    yh = mh.useState,
    bh = mh.useEffect,
    wh = mh.useLayoutEffect,
    _h = mh.useDebugValue;
  function Sh(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !vh(e, n);
    } catch (r) {
      return !0;
    }
  }
  var Eh =
    "undefined" == typeof window ||
    void 0 === window.document ||
    void 0 === window.document.createElement
      ? function (e, t) {
          return t();
        }
      : function (e, t) {
          var n = t(),
            r = yh({ inst: { value: n, getSnapshot: t } }),
            a = r[0].inst,
            o = r[1];
          return (
            wh(
              function () {
                (a.value = n), (a.getSnapshot = t), Sh(a) && o({ inst: a });
              },
              [e, n, t]
            ),
            bh(
              function () {
                return (
                  Sh(a) && o({ inst: a }),
                  e(function () {
                    Sh(a) && o({ inst: a });
                  })
                );
              },
              [e]
            ),
            _h(n),
            n
          );
        };
  (gh.useSyncExternalStore =
    void 0 !== mh.useSyncExternalStore ? mh.useSyncExternalStore : Eh),
    (hh.exports = gh);
  var kh = hh.exports,
    Oh = Ft,
    xh = kh;
  /**
   * @license React
   * use-sync-external-store-shim/with-selector.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Ch =
      "function" == typeof Object.is
        ? Object.is
        : function (e, t) {
            return (
              (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
            );
          },
    Th = xh.useSyncExternalStore,
    Nh = Oh.useRef,
    Rh = Oh.useEffect,
    Lh = Oh.useMemo,
    Ph = Oh.useDebugValue;
  (ph.useSyncExternalStoreWithSelector = function (e, t, n, r, a) {
    var o = Nh(null);
    if (null === o.current) {
      var i = { hasValue: !1, value: null };
      o.current = i;
    } else i = o.current;
    o = Lh(
      function () {
        function e(e) {
          if (!l) {
            if (((l = !0), (o = e), (e = r(e)), void 0 !== a && i.hasValue)) {
              var t = i.value;
              if (a(t, e)) return (s = t);
            }
            return (s = e);
          }
          if (((t = s), Ch(o, e))) return t;
          var n = r(e);
          return void 0 !== a && a(t, n) ? t : ((o = e), (s = n));
        }
        var o,
          s,
          l = !1,
          u = void 0 === n ? null : n;
        return [
          function () {
            return e(t());
          },
          null === u
            ? void 0
            : function () {
                return e(u());
              },
        ];
      },
      [t, n, r, a]
    );
    var s = Th(e, o[0], o[1]);
    return (
      Rh(
        function () {
          (i.hasValue = !0), (i.value = s);
        },
        [s]
      ),
      Ph(s),
      s
    );
  }),
    (fh.exports = ph);
  const jh = at(fh.exports);
  var Ih = {
    VITE_AUTHENTICATION_SUBJECT: "sso",
    VITE_LOCAL_HMG_HOME: "https://local-admin.hmg-corp.io:3001",
    VITE_LOCAL_SSO_HOST: "https://dev-admin-api.hmg-corp.io",
    VITE_LOCAL_SSO_HOST_EU: "https://dev-admin-internal-api-eu.hmg-corp.io",
    VITE_LOCAL_CONFIG_HOST: "https://dev-admin-config.hmg-corp.io",
    VITE_DEV_HMG_HOME: "https://dev-admin.hmg-corp.io",
    VITE_DEV_SSO_HOST: "https://dev-admin-api.hmg-corp.io",
    VITE_DEV_SSO_HOST_EU: "https://dev-admin-internal-api-eu.hmg-corp.io",
    VITE_DEV_CONFIG_HOST: "https://dev-admin-config.hmg-corp.io",
    VITE_STG_HMG_HOME: "https://stg-admin.hmg-corp.io",
    VITE_STG_SSO_HOST: "https://stg-admin-api.hmg-corp.io",
    VITE_STG_SSO_HOST_EU: "https://stg-admin-internal-api-eu.hmg-corp.io",
    VITE_STG_SSO_HOST_US: "https://stg-admin-internal-api-us.hmg-corp.io",
    VITE_STG_CONFIG_HOST: "https://stg-admin-config.hmg-corp.io",
    VITE_PRD_HMG_HOME: "https://admin.hmg-corp.io",
    VITE_PRD_SSO_HOST: "https://admin-api.hmg-corp.io",
    VITE_PRD_SSO_HOST_EU: "https://admin-internal-api-eu.hmg-corp.io",
    VITE_PRD_SSO_HOST_US: "https://admin-internal-api-us.hmg-corp.io",
    VITE_PRD_CONFIG_HOST: "https://admin-config.hmg-corp.io",
    VITE_DEV_COOKIE_TOKEN_PREFIX: "X-dev-hmg-admin-auth-",
    VITE_DEV_COOKIE_TOKEN_NAME: "X-dev-hmg-admin-authorization",
    VITE_STG_COOKIE_TOKEN_PREFIX: "X-stg-hmg-admin-auth-",
    VITE_STG_COOKIE_TOKEN_NAME: "X-stg-hmg-admin-authorization",
    VITE_PRD_COOKIE_TOKEN_PREFIX: "X-hmg-admin-auth-",
    VITE_PRD_COOKIE_TOKEN_NAME: "X-hmg-admin-authorization",
    BASE_URL: "/",
    MODE: "original",
    DEV: !1,
    PROD: !0,
    SSR: !1,
  };
  const { useSyncExternalStoreWithSelector: Ah } = jh;
  let Dh = !1;
  function zh(e, t = e.getState, n) {
    "production" !== (Ih ? "original" : void 0) &&
      n &&
      !Dh &&
      (console.warn(
        "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
      ),
      (Dh = !0));
    const r = Ah(e.subscribe, e.getState, e.getServerState || e.getState, t, n);
    return Ft.useDebugValue(r), r;
  }
  const Mh = dh(() => ({ projectCode: "", stage: "prod", languages: [] }));
  function Uh(e) {
    return zh(Mh, e);
  }
  const Fh = (function () {
      let e = null;
      return {
        getInstance: function (t) {
          return (
            e ||
              (e = (function (e) {
                let t = [],
                  n = e,
                  r = null,
                  a = "";
                function o(e) {
                  try {
                    fetch(n + "/hadm-log", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(e),
                      mode: "no-cors",
                    });
                  } catch (t) {
                    console.error(t);
                  }
                }
                function i() {
                  0 !== t.length && (o(t), (t = []));
                }
                return (
                  setInterval(() => i(), 6e4),
                  window.addEventListener("beforeunload", () => {
                    i();
                  }),
                  {
                    setUserData: function (e) {
                      r = e;
                    },
                    setProjectCode: function (e) {
                      a = e;
                    },
                    axiosError: function (e) {
                      var t, n, r;
                      return JSON.stringify({
                        message: e.message,
                        url:
                          ((null == (t = e.config) ? void 0 : t.baseURL) ||
                            "") + (null == (n = e.config) ? void 0 : n.url),
                        data: null == (r = e.config) ? void 0 : r.data,
                      });
                    },
                    logError: function ({ error: e, isDirectSend: n = !1 }) {
                      let s;
                      console.debug(e);
                      try {
                        s = e instanceof Error ? e.message : JSON.parse(e);
                      } catch {
                        s = e;
                      }
                      const l = JSON.stringify({
                        projectCode: a,
                        data: s,
                        userData: r,
                        location: window.location,
                        time: new Date().getTime(),
                      });
                      return (
                        n ? o([l]) : (t.push(l), t.length >= 100 && i()), e
                      );
                    },
                    flushErrors: i,
                    setErrorLogUrl: function (e) {
                      n = e;
                    },
                  }
                );
              })(t)),
            e
          );
        },
      };
    })().getInstance(Dn[Mh.getState().stage].CONFIG_HOST),
    Hh = dh((e, t) => ({
      mySsoHostUrl: "",
      getMySsoHostUrl: () => t().mySsoHostUrl,
      getCookieCustomData() {
        const { stage: e, projectCode: t } = Mh.getState();
        return `${Dn[e].COOKIE_TOKEN_PREFIX}${t}-custom-data`;
      },
      getCustomRegion() {
        var e;
        try {
          return null == (e = JSON.parse(Nw(t().getCookieCustomData()) || "{}"))
            ? void 0
            : e.region;
        } catch {
          return;
        }
      },
      setCustomRegion(e, n = 10) {
        e
          ? Tw(t().getCookieCustomData(), JSON.stringify({ region: e }), n)
          : Rw(t().getCookieCustomData());
      },
    }));
  function Vh(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }
  const { toString: Bh } = Object.prototype,
    { getPrototypeOf: Wh } = Object,
    Kh = ((e) => (t) => {
      const n = Bh.call(t);
      return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
    })(Object.create(null)),
    $h = (e) => ((e = e.toLowerCase()), (t) => Kh(t) === e),
    Gh = (e) => (t) => typeof t === e,
    { isArray: qh } = Array,
    Xh = Gh("undefined");
  const Jh = $h("ArrayBuffer");
  const Zh = Gh("string"),
    Yh = Gh("function"),
    Qh = Gh("number"),
    eg = (e) => null !== e && "object" == typeof e,
    tg = (e) => {
      if ("object" !== Kh(e)) return !1;
      const t = Wh(e);
      return !(
        (null !== t &&
          t !== Object.prototype &&
          null !== Object.getPrototypeOf(t)) ||
        Symbol.toStringTag in e ||
        Symbol.iterator in e
      );
    },
    ng = $h("Date"),
    rg = $h("File"),
    ag = $h("Blob"),
    og = $h("FileList"),
    ig = $h("URLSearchParams"),
    [sg, lg, ug, cg] = ["ReadableStream", "Request", "Response", "Headers"].map(
      $h
    );
  function dg(e, t, { allOwnKeys: n = !1 } = {}) {
    if (null == e) return;
    let r, a;
    if (("object" != typeof e && (e = [e]), qh(e)))
      for (r = 0, a = e.length; r < a; r++) t.call(null, e[r], r, e);
    else {
      const a = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
        o = a.length;
      let i;
      for (r = 0; r < o; r++) (i = a[r]), t.call(null, e[i], i, e);
    }
  }
  function fg(e, t) {
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r,
      a = n.length;
    for (; a-- > 0; ) if (((r = n[a]), t === r.toLowerCase())) return r;
    return null;
  }
  const pg =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self
        ? self
        : "undefined" != typeof window
        ? window
        : global,
    hg = (e) => !Xh(e) && e !== pg;
  const gg = (
      (e) => (t) =>
        e && t instanceof e
    )("undefined" != typeof Uint8Array && Wh(Uint8Array)),
    mg = $h("HTMLFormElement"),
    vg = (
      ({ hasOwnProperty: e }) =>
      (t, n) =>
        e.call(t, n)
    )(Object.prototype),
    yg = $h("RegExp"),
    bg = (e, t) => {
      const n = Object.getOwnPropertyDescriptors(e),
        r = {};
      dg(n, (n, a) => {
        let o;
        !1 !== (o = t(n, a, e)) && (r[a] = o || n);
      }),
        Object.defineProperties(e, r);
    },
    wg = "abcdefghijklmnopqrstuvwxyz",
    _g = "0123456789",
    Sg = { DIGIT: _g, ALPHA: wg, ALPHA_DIGIT: wg + wg.toUpperCase() + _g };
  const Eg = $h("AsyncFunction"),
    kg = {
      isArray: qh,
      isArrayBuffer: Jh,
      isBuffer: function (e) {
        return (
          null !== e &&
          !Xh(e) &&
          null !== e.constructor &&
          !Xh(e.constructor) &&
          Yh(e.constructor.isBuffer) &&
          e.constructor.isBuffer(e)
        );
      },
      isFormData: (e) => {
        let t;
        return (
          e &&
          (("function" == typeof FormData && e instanceof FormData) ||
            (Yh(e.append) &&
              ("formdata" === (t = Kh(e)) ||
                ("object" === t &&
                  Yh(e.toString) &&
                  "[object FormData]" === e.toString()))))
        );
      },
      isArrayBufferView: function (e) {
        let t;
        return (
          (t =
            "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
              ? ArrayBuffer.isView(e)
              : e && e.buffer && Jh(e.buffer)),
          t
        );
      },
      isString: Zh,
      isNumber: Qh,
      isBoolean: (e) => !0 === e || !1 === e,
      isObject: eg,
      isPlainObject: tg,
      isReadableStream: sg,
      isRequest: lg,
      isResponse: ug,
      isHeaders: cg,
      isUndefined: Xh,
      isDate: ng,
      isFile: rg,
      isBlob: ag,
      isRegExp: yg,
      isFunction: Yh,
      isStream: (e) => eg(e) && Yh(e.pipe),
      isURLSearchParams: ig,
      isTypedArray: gg,
      isFileList: og,
      forEach: dg,
      merge: function e() {
        const { caseless: t } = (hg(this) && this) || {},
          n = {},
          r = (r, a) => {
            const o = (t && fg(n, a)) || a;
            tg(n[o]) && tg(r)
              ? (n[o] = e(n[o], r))
              : tg(r)
              ? (n[o] = e({}, r))
              : qh(r)
              ? (n[o] = r.slice())
              : (n[o] = r);
          };
        for (let a = 0, o = arguments.length; a < o; a++)
          arguments[a] && dg(arguments[a], r);
        return n;
      },
      extend: (e, t, n, { allOwnKeys: r } = {}) => (
        dg(
          t,
          (t, r) => {
            n && Yh(t) ? (e[r] = Vh(t, n)) : (e[r] = t);
          },
          { allOwnKeys: r }
        ),
        e
      ),
      trim: (e) =>
        e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
      stripBOM: (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
      inherits: (e, t, n, r) => {
        (e.prototype = Object.create(t.prototype, r)),
          (e.prototype.constructor = e),
          Object.defineProperty(e, "super", { value: t.prototype }),
          n && Object.assign(e.prototype, n);
      },
      toFlatObject: (e, t, n, r) => {
        let a, o, i;
        const s = {};
        if (((t = t || {}), null == e)) return t;
        do {
          for (a = Object.getOwnPropertyNames(e), o = a.length; o-- > 0; )
            (i = a[o]),
              (r && !r(i, e, t)) || s[i] || ((t[i] = e[i]), (s[i] = !0));
          e = !1 !== n && Wh(e);
        } while (e && (!n || n(e, t)) && e !== Object.prototype);
        return t;
      },
      kindOf: Kh,
      kindOfTest: $h,
      endsWith: (e, t, n) => {
        (e = String(e)),
          (void 0 === n || n > e.length) && (n = e.length),
          (n -= t.length);
        const r = e.indexOf(t, n);
        return -1 !== r && r === n;
      },
      toArray: (e) => {
        if (!e) return null;
        if (qh(e)) return e;
        let t = e.length;
        if (!Qh(t)) return null;
        const n = new Array(t);
        for (; t-- > 0; ) n[t] = e[t];
        return n;
      },
      forEachEntry: (e, t) => {
        const n = (e && e[Symbol.iterator]).call(e);
        let r;
        for (; (r = n.next()) && !r.done; ) {
          const n = r.value;
          t.call(e, n[0], n[1]);
        }
      },
      matchAll: (e, t) => {
        let n;
        const r = [];
        for (; null !== (n = e.exec(t)); ) r.push(n);
        return r;
      },
      isHTMLForm: mg,
      hasOwnProperty: vg,
      hasOwnProp: vg,
      reduceDescriptors: bg,
      freezeMethods: (e) => {
        bg(e, (t, n) => {
          if (Yh(e) && -1 !== ["arguments", "caller", "callee"].indexOf(n))
            return !1;
          const r = e[n];
          Yh(r) &&
            ((t.enumerable = !1),
            "writable" in t
              ? (t.writable = !1)
              : t.set ||
                (t.set = () => {
                  throw Error("Can not rewrite read-only method '" + n + "'");
                }));
        });
      },
      toObjectSet: (e, t) => {
        const n = {},
          r = (e) => {
            e.forEach((e) => {
              n[e] = !0;
            });
          };
        return qh(e) ? r(e) : r(String(e).split(t)), n;
      },
      toCamelCase: (e) =>
        e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, n) {
          return t.toUpperCase() + n;
        }),
      noop: () => {},
      toFiniteNumber: (e, t) =>
        null != e && Number.isFinite((e = +e)) ? e : t,
      findKey: fg,
      global: pg,
      isContextDefined: hg,
      ALPHABET: Sg,
      generateString: (e = 16, t = Sg.ALPHA_DIGIT) => {
        let n = "";
        const { length: r } = t;
        for (; e--; ) n += t[(Math.random() * r) | 0];
        return n;
      },
      isSpecCompliantForm: function (e) {
        return !!(
          e &&
          Yh(e.append) &&
          "FormData" === e[Symbol.toStringTag] &&
          e[Symbol.iterator]
        );
      },
      toJSONObject: (e) => {
        const t = new Array(10),
          n = (e, r) => {
            if (eg(e)) {
              if (t.indexOf(e) >= 0) return;
              if (!("toJSON" in e)) {
                t[r] = e;
                const a = qh(e) ? [] : {};
                return (
                  dg(e, (e, t) => {
                    const o = n(e, r + 1);
                    !Xh(o) && (a[t] = o);
                  }),
                  (t[r] = void 0),
                  a
                );
              }
            }
            return e;
          };
        return n(e, 0);
      },
      isAsyncFn: Eg,
      isThenable: (e) => e && (eg(e) || Yh(e)) && Yh(e.then) && Yh(e.catch),
    };
  function Og(e, t, n, r, a) {
    Error.call(this),
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error().stack),
      (this.message = e),
      (this.name = "AxiosError"),
      t && (this.code = t),
      n && (this.config = n),
      r && (this.request = r),
      a && (this.response = a);
  }
  kg.inherits(Og, Error, {
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: kg.toJSONObject(this.config),
        code: this.code,
        status:
          this.response && this.response.status ? this.response.status : null,
      };
    },
  });
  const xg = Og.prototype,
    Cg = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL",
  ].forEach((e) => {
    Cg[e] = { value: e };
  }),
    Object.defineProperties(Og, Cg),
    Object.defineProperty(xg, "isAxiosError", { value: !0 }),
    (Og.from = (e, t, n, r, a, o) => {
      const i = Object.create(xg);
      return (
        kg.toFlatObject(
          e,
          i,
          function (e) {
            return e !== Error.prototype;
          },
          (e) => "isAxiosError" !== e
        ),
        Og.call(i, e.message, t, n, r, a),
        (i.cause = e),
        (i.name = e.name),
        o && Object.assign(i, o),
        i
      );
    });
  function Tg(e) {
    return kg.isPlainObject(e) || kg.isArray(e);
  }
  function Ng(e) {
    return kg.endsWith(e, "[]") ? e.slice(0, -2) : e;
  }
  function Rg(e, t, n) {
    return e
      ? e
          .concat(t)
          .map(function (e, t) {
            return (e = Ng(e)), !n && t ? "[" + e + "]" : e;
          })
          .join(n ? "." : "")
      : t;
  }
  const Lg = kg.toFlatObject(kg, {}, null, function (e) {
    return /^is[A-Z]/.test(e);
  });
  function Pg(e, t, n) {
    if (!kg.isObject(e)) throw new TypeError("target must be an object");
    t = t || new FormData();
    const r = (n = kg.toFlatObject(
        n,
        { metaTokens: !0, dots: !1, indexes: !1 },
        !1,
        function (e, t) {
          return !kg.isUndefined(t[e]);
        }
      )).metaTokens,
      a = n.visitor || u,
      o = n.dots,
      i = n.indexes,
      s =
        (n.Blob || ("undefined" != typeof Blob && Blob)) &&
        kg.isSpecCompliantForm(t);
    if (!kg.isFunction(a)) throw new TypeError("visitor must be a function");
    function l(e) {
      if (null === e) return "";
      if (kg.isDate(e)) return e.toISOString();
      if (!s && kg.isBlob(e))
        throw new Og("Blob is not supported. Use a Buffer instead.");
      return kg.isArrayBuffer(e) || kg.isTypedArray(e)
        ? s && "function" == typeof Blob
          ? new Blob([e])
          : Buffer.from(e)
        : e;
    }
    function u(e, n, a) {
      let s = e;
      if (e && !a && "object" == typeof e)
        if (kg.endsWith(n, "{}"))
          (n = r ? n : n.slice(0, -2)), (e = JSON.stringify(e));
        else if (
          (kg.isArray(e) &&
            (function (e) {
              return kg.isArray(e) && !e.some(Tg);
            })(e)) ||
          ((kg.isFileList(e) || kg.endsWith(n, "[]")) && (s = kg.toArray(e)))
        )
          return (
            (n = Ng(n)),
            s.forEach(function (e, r) {
              !kg.isUndefined(e) &&
                null !== e &&
                t.append(
                  !0 === i ? Rg([n], r, o) : null === i ? n : n + "[]",
                  l(e)
                );
            }),
            !1
          );
      return !!Tg(e) || (t.append(Rg(a, n, o), l(e)), !1);
    }
    const c = [],
      d = Object.assign(Lg, {
        defaultVisitor: u,
        convertValue: l,
        isVisitable: Tg,
      });
    if (!kg.isObject(e)) throw new TypeError("data must be an object");
    return (
      (function e(n, r) {
        if (!kg.isUndefined(n)) {
          if (-1 !== c.indexOf(n))
            throw Error("Circular reference detected in " + r.join("."));
          c.push(n),
            kg.forEach(n, function (n, o) {
              !0 ===
                (!(kg.isUndefined(n) || null === n) &&
                  a.call(t, n, kg.isString(o) ? o.trim() : o, r, d)) &&
                e(n, r ? r.concat(o) : [o]);
            }),
            c.pop();
        }
      })(e),
      t
    );
  }
  function jg(e) {
    const t = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0",
    };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (e) {
      return t[e];
    });
  }
  function Ig(e, t) {
    (this._pairs = []), e && Pg(e, this, t);
  }
  const Ag = Ig.prototype;
  function Dg(e) {
    return encodeURIComponent(e)
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%20/g, "+")
      .replace(/%5B/gi, "[")
      .replace(/%5D/gi, "]");
  }
  function zg(e, t, n) {
    if (!t) return e;
    const r = (n && n.encode) || Dg,
      a = n && n.serialize;
    let o;
    if (
      ((o = a
        ? a(t, n)
        : kg.isURLSearchParams(t)
        ? t.toString()
        : new Ig(t, n).toString(r)),
      o)
    ) {
      const t = e.indexOf("#");
      -1 !== t && (e = e.slice(0, t)),
        (e += (-1 === e.indexOf("?") ? "?" : "&") + o);
    }
    return e;
  }
  (Ag.append = function (e, t) {
    this._pairs.push([e, t]);
  }),
    (Ag.toString = function (e) {
      const t = e
        ? function (t) {
            return e.call(this, t, jg);
          }
        : jg;
      return this._pairs
        .map(function (e) {
          return t(e[0]) + "=" + t(e[1]);
        }, "")
        .join("&");
    });
  class Mg {
    constructor() {
      this.handlers = [];
    }
    use(e, t, n) {
      return (
        this.handlers.push({
          fulfilled: e,
          rejected: t,
          synchronous: !!n && n.synchronous,
          runWhen: n ? n.runWhen : null,
        }),
        this.handlers.length - 1
      );
    }
    eject(e) {
      this.handlers[e] && (this.handlers[e] = null);
    }
    clear() {
      this.handlers && (this.handlers = []);
    }
    forEach(e) {
      kg.forEach(this.handlers, function (t) {
        null !== t && e(t);
      });
    }
  }
  const Ug = {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1,
    },
    Fg = {
      isBrowser: !0,
      classes: {
        URLSearchParams:
          "undefined" != typeof URLSearchParams ? URLSearchParams : Ig,
        FormData: "undefined" != typeof FormData ? FormData : null,
        Blob: "undefined" != typeof Blob ? Blob : null,
      },
      protocols: ["http", "https", "file", "blob", "url", "data"],
    },
    Hg = "undefined" != typeof window && "undefined" != typeof document,
    Vg =
      ((Bg = "undefined" != typeof navigator && navigator.product),
      Hg && ["ReactNative", "NativeScript", "NS"].indexOf(Bg) < 0);
  var Bg;
  const Wg =
      "undefined" != typeof WorkerGlobalScope &&
      self instanceof WorkerGlobalScope &&
      "function" == typeof self.importScripts,
    Kg = (Hg && window.location.href) || "http://localhost",
    $g = {
      ...Object.freeze(
        Object.defineProperty(
          {
            __proto__: null,
            hasBrowserEnv: Hg,
            hasStandardBrowserEnv: Vg,
            hasStandardBrowserWebWorkerEnv: Wg,
            origin: Kg,
          },
          Symbol.toStringTag,
          { value: "Module" }
        )
      ),
      ...Fg,
    };
  function Gg(e) {
    function t(e, n, r, a) {
      let o = e[a++];
      if ("__proto__" === o) return !0;
      const i = Number.isFinite(+o),
        s = a >= e.length;
      if (((o = !o && kg.isArray(r) ? r.length : o), s))
        return kg.hasOwnProp(r, o) ? (r[o] = [r[o], n]) : (r[o] = n), !i;
      (r[o] && kg.isObject(r[o])) || (r[o] = []);
      return (
        t(e, n, r[o], a) &&
          kg.isArray(r[o]) &&
          (r[o] = (function (e) {
            const t = {},
              n = Object.keys(e);
            let r;
            const a = n.length;
            let o;
            for (r = 0; r < a; r++) (o = n[r]), (t[o] = e[o]);
            return t;
          })(r[o])),
        !i
      );
    }
    if (kg.isFormData(e) && kg.isFunction(e.entries)) {
      const n = {};
      return (
        kg.forEachEntry(e, (e, r) => {
          t(
            (function (e) {
              return kg
                .matchAll(/\w+|\[(\w*)]/g, e)
                .map((e) => ("[]" === e[0] ? "" : e[1] || e[0]));
            })(e),
            r,
            n,
            0
          );
        }),
        n
      );
    }
    return null;
  }
  const qg = {
    transitional: Ug,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [
      function (e, t) {
        const n = t.getContentType() || "",
          r = n.indexOf("application/json") > -1,
          a = kg.isObject(e);
        a && kg.isHTMLForm(e) && (e = new FormData(e));
        if (kg.isFormData(e)) return r ? JSON.stringify(Gg(e)) : e;
        if (
          kg.isArrayBuffer(e) ||
          kg.isBuffer(e) ||
          kg.isStream(e) ||
          kg.isFile(e) ||
          kg.isBlob(e) ||
          kg.isReadableStream(e)
        )
          return e;
        if (kg.isArrayBufferView(e)) return e.buffer;
        if (kg.isURLSearchParams(e))
          return (
            t.setContentType(
              "application/x-www-form-urlencoded;charset=utf-8",
              !1
            ),
            e.toString()
          );
        let o;
        if (a) {
          if (n.indexOf("application/x-www-form-urlencoded") > -1)
            return (function (e, t) {
              return Pg(
                e,
                new $g.classes.URLSearchParams(),
                Object.assign(
                  {
                    visitor: function (e, t, n, r) {
                      return $g.isNode && kg.isBuffer(e)
                        ? (this.append(t, e.toString("base64")), !1)
                        : r.defaultVisitor.apply(this, arguments);
                    },
                  },
                  t
                )
              );
            })(e, this.formSerializer).toString();
          if ((o = kg.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
            const t = this.env && this.env.FormData;
            return Pg(
              o ? { "files[]": e } : e,
              t && new t(),
              this.formSerializer
            );
          }
        }
        return a || r
          ? (t.setContentType("application/json", !1),
            (function (e, t, n) {
              if (kg.isString(e))
                try {
                  return (t || JSON.parse)(e), kg.trim(e);
                } catch (r) {
                  if ("SyntaxError" !== r.name) throw r;
                }
              return (0, JSON.stringify)(e);
            })(e))
          : e;
      },
    ],
    transformResponse: [
      function (e) {
        const t = this.transitional || qg.transitional,
          n = t && t.forcedJSONParsing,
          r = "json" === this.responseType;
        if (kg.isResponse(e) || kg.isReadableStream(e)) return e;
        if (e && kg.isString(e) && ((n && !this.responseType) || r)) {
          const n = !(t && t.silentJSONParsing) && r;
          try {
            return JSON.parse(e);
          } catch (a) {
            if (n) {
              if ("SyntaxError" === a.name)
                throw Og.from(
                  a,
                  Og.ERR_BAD_RESPONSE,
                  this,
                  null,
                  this.response
                );
              throw a;
            }
          }
        }
        return e;
      },
    ],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: $g.classes.FormData, Blob: $g.classes.Blob },
    validateStatus: function (e) {
      return e >= 200 && e < 300;
    },
    headers: {
      common: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": void 0,
      },
    },
  };
  kg.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
    qg.headers[e] = {};
  });
  const Xg = kg.toObjectSet([
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent",
    ]),
    Jg = Symbol("internals");
  function Zg(e) {
    return e && String(e).trim().toLowerCase();
  }
  function Yg(e) {
    return !1 === e || null == e ? e : kg.isArray(e) ? e.map(Yg) : String(e);
  }
  function Qg(e, t, n, r, a) {
    return kg.isFunction(r)
      ? r.call(this, t, n)
      : (a && (t = n),
        kg.isString(t)
          ? kg.isString(r)
            ? -1 !== t.indexOf(r)
            : kg.isRegExp(r)
            ? r.test(t)
            : void 0
          : void 0);
  }
  class em {
    constructor(e) {
      e && this.set(e);
    }
    set(e, t, n) {
      const r = this;
      function a(e, t, n) {
        const a = Zg(t);
        if (!a) throw new Error("header name must be a non-empty string");
        const o = kg.findKey(r, a);
        (!o || void 0 === r[o] || !0 === n || (void 0 === n && !1 !== r[o])) &&
          (r[o || t] = Yg(e));
      }
      const o = (e, t) => kg.forEach(e, (e, n) => a(e, n, t));
      if (kg.isPlainObject(e) || e instanceof this.constructor) o(e, t);
      else if (
        kg.isString(e) &&
        (e = e.trim()) &&
        !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())
      )
        o(
          ((e) => {
            const t = {};
            let n, r, a;
            return (
              e &&
                e.split("\n").forEach(function (e) {
                  (a = e.indexOf(":")),
                    (n = e.substring(0, a).trim().toLowerCase()),
                    (r = e.substring(a + 1).trim()),
                    !n ||
                      (t[n] && Xg[n]) ||
                      ("set-cookie" === n
                        ? t[n]
                          ? t[n].push(r)
                          : (t[n] = [r])
                        : (t[n] = t[n] ? t[n] + ", " + r : r));
                }),
              t
            );
          })(e),
          t
        );
      else if (kg.isHeaders(e)) for (const [i, s] of e.entries()) a(s, i, n);
      else null != e && a(t, e, n);
      return this;
    }
    get(e, t) {
      if ((e = Zg(e))) {
        const n = kg.findKey(this, e);
        if (n) {
          const e = this[n];
          if (!t) return e;
          if (!0 === t)
            return (function (e) {
              const t = Object.create(null),
                n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
              let r;
              for (; (r = n.exec(e)); ) t[r[1]] = r[2];
              return t;
            })(e);
          if (kg.isFunction(t)) return t.call(this, e, n);
          if (kg.isRegExp(t)) return t.exec(e);
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(e, t) {
      if ((e = Zg(e))) {
        const n = kg.findKey(this, e);
        return !(!n || void 0 === this[n] || (t && !Qg(0, this[n], n, t)));
      }
      return !1;
    }
    delete(e, t) {
      const n = this;
      let r = !1;
      function a(e) {
        if ((e = Zg(e))) {
          const a = kg.findKey(n, e);
          !a || (t && !Qg(0, n[a], a, t)) || (delete n[a], (r = !0));
        }
      }
      return kg.isArray(e) ? e.forEach(a) : a(e), r;
    }
    clear(e) {
      const t = Object.keys(this);
      let n = t.length,
        r = !1;
      for (; n--; ) {
        const a = t[n];
        (e && !Qg(0, this[a], a, e, !0)) || (delete this[a], (r = !0));
      }
      return r;
    }
    normalize(e) {
      const t = this,
        n = {};
      return (
        kg.forEach(this, (r, a) => {
          const o = kg.findKey(n, a);
          if (o) return (t[o] = Yg(r)), void delete t[a];
          const i = e
            ? (function (e) {
                return e
                  .trim()
                  .toLowerCase()
                  .replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
              })(a)
            : String(a).trim();
          i !== a && delete t[a], (t[i] = Yg(r)), (n[i] = !0);
        }),
        this
      );
    }
    concat(...e) {
      return this.constructor.concat(this, ...e);
    }
    toJSON(e) {
      const t = Object.create(null);
      return (
        kg.forEach(this, (n, r) => {
          null != n &&
            !1 !== n &&
            (t[r] = e && kg.isArray(n) ? n.join(", ") : n);
        }),
        t
      );
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON())
        .map(([e, t]) => e + ": " + t)
        .join("\n");
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(e) {
      return e instanceof this ? e : new this(e);
    }
    static concat(e, ...t) {
      const n = new this(e);
      return t.forEach((e) => n.set(e)), n;
    }
    static accessor(e) {
      const t = (this[Jg] = this[Jg] = { accessors: {} }).accessors,
        n = this.prototype;
      function r(e) {
        const r = Zg(e);
        t[r] ||
          (!(function (e, t) {
            const n = kg.toCamelCase(" " + t);
            ["get", "set", "has"].forEach((r) => {
              Object.defineProperty(e, r + n, {
                value: function (e, n, a) {
                  return this[r].call(this, t, e, n, a);
                },
                configurable: !0,
              });
            });
          })(n, e),
          (t[r] = !0));
      }
      return kg.isArray(e) ? e.forEach(r) : r(e), this;
    }
  }
  function tm(e, t) {
    const n = this || qg,
      r = t || n,
      a = em.from(r.headers);
    let o = r.data;
    return (
      kg.forEach(e, function (e) {
        o = e.call(n, o, a.normalize(), t ? t.status : void 0);
      }),
      a.normalize(),
      o
    );
  }
  function nm(e) {
    return !(!e || !e.__CANCEL__);
  }
  function rm(e, t, n) {
    Og.call(this, null == e ? "canceled" : e, Og.ERR_CANCELED, t, n),
      (this.name = "CanceledError");
  }
  function am(e, t, n) {
    const r = n.config.validateStatus;
    n.status && r && !r(n.status)
      ? t(
          new Og(
            "Request failed with status code " + n.status,
            [Og.ERR_BAD_REQUEST, Og.ERR_BAD_RESPONSE][
              Math.floor(n.status / 100) - 4
            ],
            n.config,
            n.request,
            n
          )
        )
      : e(n);
  }
  em.accessor([
    "Content-Type",
    "Content-Length",
    "Accept",
    "Accept-Encoding",
    "User-Agent",
    "Authorization",
  ]),
    kg.reduceDescriptors(em.prototype, ({ value: e }, t) => {
      let n = t[0].toUpperCase() + t.slice(1);
      return {
        get: () => e,
        set(e) {
          this[n] = e;
        },
      };
    }),
    kg.freezeMethods(em),
    kg.inherits(rm, Og, { __CANCEL__: !0 });
  const om = (e, t, n = 3) => {
      let r = 0;
      const a = (function (e, t) {
        e = e || 10;
        const n = new Array(e),
          r = new Array(e);
        let a,
          o = 0,
          i = 0;
        return (
          (t = void 0 !== t ? t : 1e3),
          function (s) {
            const l = Date.now(),
              u = r[i];
            a || (a = l), (n[o] = s), (r[o] = l);
            let c = i,
              d = 0;
            for (; c !== o; ) (d += n[c++]), (c %= e);
            if (((o = (o + 1) % e), o === i && (i = (i + 1) % e), l - a < t))
              return;
            const f = u && l - u;
            return f ? Math.round((1e3 * d) / f) : void 0;
          }
        );
      })(50, 250);
      return (function (e, t) {
        let n = 0;
        const r = 1e3 / t;
        let a = null;
        return function () {
          const t = !0 === this,
            o = Date.now();
          if (t || o - n > r)
            return (
              a && (clearTimeout(a), (a = null)),
              (n = o),
              e.apply(null, arguments)
            );
          a ||
            (a = setTimeout(
              () => ((a = null), (n = Date.now()), e.apply(null, arguments)),
              r - (o - n)
            ));
        };
      })((n) => {
        const o = n.loaded,
          i = n.lengthComputable ? n.total : void 0,
          s = o - r,
          l = a(s);
        r = o;
        const u = {
          loaded: o,
          total: i,
          progress: i ? o / i : void 0,
          bytes: s,
          rate: l || void 0,
          estimated: l && i && o <= i ? (i - o) / l : void 0,
          event: n,
          lengthComputable: null != i,
        };
        (u[t ? "download" : "upload"] = !0), e(u);
      }, n);
    },
    im = $g.hasStandardBrowserEnv
      ? (function () {
          const e = /(msie|trident)/i.test(navigator.userAgent),
            t = document.createElement("a");
          let n;
          function r(n) {
            let r = n;
            return (
              e && (t.setAttribute("href", r), (r = t.href)),
              t.setAttribute("href", r),
              {
                href: t.href,
                protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
                host: t.host,
                search: t.search ? t.search.replace(/^\?/, "") : "",
                hash: t.hash ? t.hash.replace(/^#/, "") : "",
                hostname: t.hostname,
                port: t.port,
                pathname:
                  "/" === t.pathname.charAt(0) ? t.pathname : "/" + t.pathname,
              }
            );
          }
          return (
            (n = r(window.location.href)),
            function (e) {
              const t = kg.isString(e) ? r(e) : e;
              return t.protocol === n.protocol && t.host === n.host;
            }
          );
        })()
      : (function () {
          return function () {
            return !0;
          };
        })(),
    sm = $g.hasStandardBrowserEnv
      ? {
          write(e, t, n, r, a, o) {
            const i = [e + "=" + encodeURIComponent(t)];
            kg.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
              kg.isString(r) && i.push("path=" + r),
              kg.isString(a) && i.push("domain=" + a),
              !0 === o && i.push("secure"),
              (document.cookie = i.join("; "));
          },
          read(e) {
            const t = document.cookie.match(
              new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
            );
            return t ? decodeURIComponent(t[3]) : null;
          },
          remove(e) {
            this.write(e, "", Date.now() - 864e5);
          },
        }
      : { write() {}, read: () => null, remove() {} };
  function lm(e, t) {
    return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
      ? (function (e, t) {
          return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
        })(e, t)
      : t;
  }
  const um = (e) => (e instanceof em ? { ...e } : e);
  function cm(e, t) {
    t = t || {};
    const n = {};
    function r(e, t, n) {
      return kg.isPlainObject(e) && kg.isPlainObject(t)
        ? kg.merge.call({ caseless: n }, e, t)
        : kg.isPlainObject(t)
        ? kg.merge({}, t)
        : kg.isArray(t)
        ? t.slice()
        : t;
    }
    function a(e, t, n) {
      return kg.isUndefined(t)
        ? kg.isUndefined(e)
          ? void 0
          : r(void 0, e, n)
        : r(e, t, n);
    }
    function o(e, t) {
      if (!kg.isUndefined(t)) return r(void 0, t);
    }
    function i(e, t) {
      return kg.isUndefined(t)
        ? kg.isUndefined(e)
          ? void 0
          : r(void 0, e)
        : r(void 0, t);
    }
    function s(n, a, o) {
      return o in t ? r(n, a) : o in e ? r(void 0, n) : void 0;
    }
    const l = {
      url: o,
      method: o,
      data: o,
      baseURL: i,
      transformRequest: i,
      transformResponse: i,
      paramsSerializer: i,
      timeout: i,
      timeoutMessage: i,
      withCredentials: i,
      withXSRFToken: i,
      adapter: i,
      responseType: i,
      xsrfCookieName: i,
      xsrfHeaderName: i,
      onUploadProgress: i,
      onDownloadProgress: i,
      decompress: i,
      maxContentLength: i,
      maxBodyLength: i,
      beforeRedirect: i,
      transport: i,
      httpAgent: i,
      httpsAgent: i,
      cancelToken: i,
      socketPath: i,
      responseEncoding: i,
      validateStatus: s,
      headers: (e, t) => a(um(e), um(t), !0),
    };
    return (
      kg.forEach(Object.keys(Object.assign({}, e, t)), function (r) {
        const o = l[r] || a,
          i = o(e[r], t[r], r);
        (kg.isUndefined(i) && o !== s) || (n[r] = i);
      }),
      n
    );
  }
  const dm = (e) => {
      const t = cm({}, e);
      let n,
        {
          data: r,
          withXSRFToken: a,
          xsrfHeaderName: o,
          xsrfCookieName: i,
          headers: s,
          auth: l,
        } = t;
      if (
        ((t.headers = s = em.from(s)),
        (t.url = zg(lm(t.baseURL, t.url), e.params, e.paramsSerializer)),
        l &&
          s.set(
            "Authorization",
            "Basic " +
              btoa(
                (l.username || "") +
                  ":" +
                  (l.password ? unescape(encodeURIComponent(l.password)) : "")
              )
          ),
        kg.isFormData(r))
      )
        if ($g.hasStandardBrowserEnv || $g.hasStandardBrowserWebWorkerEnv)
          s.setContentType(void 0);
        else if (!1 !== (n = s.getContentType())) {
          const [e, ...t] = n
            ? n
                .split(";")
                .map((e) => e.trim())
                .filter(Boolean)
            : [];
          s.setContentType([e || "multipart/form-data", ...t].join("; "));
        }
      if (
        $g.hasStandardBrowserEnv &&
        (a && kg.isFunction(a) && (a = a(t)), a || (!1 !== a && im(t.url)))
      ) {
        const e = o && i && sm.read(i);
        e && s.set(o, e);
      }
      return t;
    },
    fm =
      "undefined" != typeof XMLHttpRequest &&
      function (e) {
        return new Promise(function (t, n) {
          const r = dm(e);
          let a = r.data;
          const o = em.from(r.headers).normalize();
          let i,
            { responseType: s } = r;
          function l() {
            r.cancelToken && r.cancelToken.unsubscribe(i),
              r.signal && r.signal.removeEventListener("abort", i);
          }
          let u = new XMLHttpRequest();
          function c() {
            if (!u) return;
            const r = em.from(
              "getAllResponseHeaders" in u && u.getAllResponseHeaders()
            );
            am(
              function (e) {
                t(e), l();
              },
              function (e) {
                n(e), l();
              },
              {
                data:
                  s && "text" !== s && "json" !== s
                    ? u.response
                    : u.responseText,
                status: u.status,
                statusText: u.statusText,
                headers: r,
                config: e,
                request: u,
              }
            ),
              (u = null);
          }
          u.open(r.method.toUpperCase(), r.url, !0),
            (u.timeout = r.timeout),
            "onloadend" in u
              ? (u.onloadend = c)
              : (u.onreadystatechange = function () {
                  u &&
                    4 === u.readyState &&
                    (0 !== u.status ||
                      (u.responseURL &&
                        0 === u.responseURL.indexOf("file:"))) &&
                    setTimeout(c);
                }),
            (u.onabort = function () {
              u &&
                (n(new Og("Request aborted", Og.ECONNABORTED, r, u)),
                (u = null));
            }),
            (u.onerror = function () {
              n(new Og("Network Error", Og.ERR_NETWORK, r, u)), (u = null);
            }),
            (u.ontimeout = function () {
              let e = r.timeout
                ? "timeout of " + r.timeout + "ms exceeded"
                : "timeout exceeded";
              const t = r.transitional || Ug;
              r.timeoutErrorMessage && (e = r.timeoutErrorMessage),
                n(
                  new Og(
                    e,
                    t.clarifyTimeoutError ? Og.ETIMEDOUT : Og.ECONNABORTED,
                    r,
                    u
                  )
                ),
                (u = null);
            }),
            void 0 === a && o.setContentType(null),
            "setRequestHeader" in u &&
              kg.forEach(o.toJSON(), function (e, t) {
                u.setRequestHeader(t, e);
              }),
            kg.isUndefined(r.withCredentials) ||
              (u.withCredentials = !!r.withCredentials),
            s && "json" !== s && (u.responseType = r.responseType),
            "function" == typeof r.onDownloadProgress &&
              u.addEventListener("progress", om(r.onDownloadProgress, !0)),
            "function" == typeof r.onUploadProgress &&
              u.upload &&
              u.upload.addEventListener("progress", om(r.onUploadProgress)),
            (r.cancelToken || r.signal) &&
              ((i = (t) => {
                u &&
                  (n(!t || t.type ? new rm(null, e, u) : t),
                  u.abort(),
                  (u = null));
              }),
              r.cancelToken && r.cancelToken.subscribe(i),
              r.signal &&
                (r.signal.aborted
                  ? i()
                  : r.signal.addEventListener("abort", i)));
          const d = (function (e) {
            const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
            return (t && t[1]) || "";
          })(r.url);
          d && -1 === $g.protocols.indexOf(d)
            ? n(
                new Og("Unsupported protocol " + d + ":", Og.ERR_BAD_REQUEST, e)
              )
            : u.send(a || null);
        });
      },
    pm = (e, t) => {
      let n,
        r = new AbortController();
      const a = function (e) {
        if (!n) {
          (n = !0), i();
          const t = e instanceof Error ? e : this.reason;
          r.abort(
            t instanceof Og ? t : new rm(t instanceof Error ? t.message : t)
          );
        }
      };
      let o =
        t &&
        setTimeout(() => {
          a(new Og(`timeout ${t} of ms exceeded`, Og.ETIMEDOUT));
        }, t);
      const i = () => {
        e &&
          (o && clearTimeout(o),
          (o = null),
          e.forEach((e) => {
            e &&
              (e.removeEventListener
                ? e.removeEventListener("abort", a)
                : e.unsubscribe(a));
          }),
          (e = null));
      };
      e.forEach(
        (e) => e && e.addEventListener && e.addEventListener("abort", a)
      );
      const { signal: s } = r;
      return (
        (s.unsubscribe = i),
        [
          s,
          () => {
            o && clearTimeout(o), (o = null);
          },
        ]
      );
    },
    hm = function* (e, t) {
      let n = e.byteLength;
      if (n < t) return void (yield e);
      let r,
        a = 0;
      for (; a < n; ) (r = a + t), yield e.slice(a, r), (a = r);
    },
    gm = (e, t, n, r, a) => {
      const o = (async function* (e, t, n) {
        for await (const r of e)
          yield* hm(ArrayBuffer.isView(r) ? r : await n(String(r)), t);
      })(e, t, a);
      let i = 0;
      return new ReadableStream(
        {
          type: "bytes",
          async pull(e) {
            const { done: t, value: a } = await o.next();
            if (t) return e.close(), void r();
            let s = a.byteLength;
            n && n((i += s)), e.enqueue(new Uint8Array(a));
          },
          cancel: (e) => (r(e), o.return()),
        },
        { highWaterMark: 2 }
      );
    },
    mm = (e, t) => {
      const n = null != e;
      return (r) =>
        setTimeout(() => t({ lengthComputable: n, total: e, loaded: r }));
    },
    vm =
      "function" == typeof fetch &&
      "function" == typeof Request &&
      "function" == typeof Response,
    ym = vm && "function" == typeof ReadableStream,
    bm =
      vm &&
      ("function" == typeof TextEncoder
        ? (
            (e) => (t) =>
              e.encode(t)
          )(new TextEncoder())
        : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
    wm =
      ym &&
      (() => {
        let e = !1;
        const t = new Request($g.origin, {
          body: new ReadableStream(),
          method: "POST",
          get duplex() {
            return (e = !0), "half";
          },
        }).headers.has("Content-Type");
        return e && !t;
      })(),
    _m =
      ym &&
      !!(() => {
        try {
          return kg.isReadableStream(new Response("").body);
        } catch (e) {}
      })(),
    Sm = { stream: _m && ((e) => e.body) };
  var Em;
  vm &&
    ((Em = new Response()),
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
      !Sm[e] &&
        (Sm[e] = kg.isFunction(Em[e])
          ? (t) => t[e]()
          : (t, n) => {
              throw new Og(
                `Response type '${e}' is not supported`,
                Og.ERR_NOT_SUPPORT,
                n
              );
            });
    }));
  const km = async (e, t) => {
      const n = kg.toFiniteNumber(e.getContentLength());
      return null == n
        ? (async (e) =>
            null == e
              ? 0
              : kg.isBlob(e)
              ? e.size
              : kg.isSpecCompliantForm(e)
              ? (await new Request(e).arrayBuffer()).byteLength
              : kg.isArrayBufferView(e)
              ? e.byteLength
              : (kg.isURLSearchParams(e) && (e += ""),
                kg.isString(e) ? (await bm(e)).byteLength : void 0))(t)
        : n;
    },
    Om = {
      http: null,
      xhr: fm,
      fetch:
        vm &&
        (async (e) => {
          let {
            url: t,
            method: n,
            data: r,
            signal: a,
            cancelToken: o,
            timeout: i,
            onDownloadProgress: s,
            onUploadProgress: l,
            responseType: u,
            headers: c,
            withCredentials: d = "same-origin",
            fetchOptions: f,
          } = dm(e);
          u = u ? (u + "").toLowerCase() : "text";
          let p,
            h,
            [g, m] = a || o || i ? pm([a, o], i) : [];
          const v = () => {
            !p &&
              setTimeout(() => {
                g && g.unsubscribe();
              }),
              (p = !0);
          };
          let y;
          try {
            if (
              l &&
              wm &&
              "get" !== n &&
              "head" !== n &&
              0 !== (y = await km(c, r))
            ) {
              let e,
                n = new Request(t, { method: "POST", body: r, duplex: "half" });
              kg.isFormData(r) &&
                (e = n.headers.get("content-type")) &&
                c.setContentType(e),
                n.body && (r = gm(n.body, 65536, mm(y, om(l)), null, bm));
            }
            kg.isString(d) || (d = d ? "cors" : "omit"),
              (h = new Request(t, {
                ...f,
                signal: g,
                method: n.toUpperCase(),
                headers: c.normalize().toJSON(),
                body: r,
                duplex: "half",
                withCredentials: d,
              }));
            let a = await fetch(h);
            const o = _m && ("stream" === u || "response" === u);
            if (_m && (s || o)) {
              const e = {};
              ["status", "statusText", "headers"].forEach((t) => {
                e[t] = a[t];
              });
              const t = kg.toFiniteNumber(a.headers.get("content-length"));
              a = new Response(
                gm(a.body, 65536, s && mm(t, om(s, !0)), o && v, bm),
                e
              );
            }
            u = u || "text";
            let i = await Sm[kg.findKey(Sm, u) || "text"](a, e);
            return (
              !o && v(),
              m && m(),
              await new Promise((t, n) => {
                am(t, n, {
                  data: i,
                  headers: em.from(a.headers),
                  status: a.status,
                  statusText: a.statusText,
                  config: e,
                  request: h,
                });
              })
            );
          } catch (b) {
            if ((v(), b && "TypeError" === b.name && /fetch/i.test(b.message)))
              throw Object.assign(
                new Og("Network Error", Og.ERR_NETWORK, e, h),
                { cause: b.cause || b }
              );
            throw Og.from(b, b && b.code, e, h);
          }
        }),
    };
  kg.forEach(Om, (e, t) => {
    if (e) {
      try {
        Object.defineProperty(e, "name", { value: t });
      } catch (n) {}
      Object.defineProperty(e, "adapterName", { value: t });
    }
  });
  const xm = (e) => `- ${e}`,
    Cm = (e) => kg.isFunction(e) || null === e || !1 === e,
    Tm = (e) => {
      e = kg.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const a = {};
      for (let o = 0; o < t; o++) {
        let t;
        if (
          ((n = e[o]),
          (r = n),
          !Cm(n) && ((r = Om[(t = String(n)).toLowerCase()]), void 0 === r))
        )
          throw new Og(`Unknown adapter '${t}'`);
        if (r) break;
        a[t || "#" + o] = r;
      }
      if (!r) {
        const e = Object.entries(a).map(
          ([e, t]) =>
            `adapter ${e} ` +
            (!1 === t
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        throw new Og(
          "There is no suitable adapter to dispatch the request " +
            (t
              ? e.length > 1
                ? "since :\n" + e.map(xm).join("\n")
                : " " + xm(e[0])
              : "as no adapter specified"),
          "ERR_NOT_SUPPORT"
        );
      }
      return r;
    };
  function Nm(e) {
    if (
      (e.cancelToken && e.cancelToken.throwIfRequested(),
      e.signal && e.signal.aborted)
    )
      throw new rm(null, e);
  }
  function Rm(e) {
    Nm(e),
      (e.headers = em.from(e.headers)),
      (e.data = tm.call(e, e.transformRequest)),
      -1 !== ["post", "put", "patch"].indexOf(e.method) &&
        e.headers.setContentType("application/x-www-form-urlencoded", !1);
    return Tm(e.adapter || qg.adapter)(e).then(
      function (t) {
        return (
          Nm(e),
          (t.data = tm.call(e, e.transformResponse, t)),
          (t.headers = em.from(t.headers)),
          t
        );
      },
      function (t) {
        return (
          nm(t) ||
            (Nm(e),
            t &&
              t.response &&
              ((t.response.data = tm.call(e, e.transformResponse, t.response)),
              (t.response.headers = em.from(t.response.headers)))),
          Promise.reject(t)
        );
      }
    );
  }
  const Lm = "1.7.2",
    Pm = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach(
    (e, t) => {
      Pm[e] = function (n) {
        return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
      };
    }
  );
  const jm = {};
  Pm.transitional = function (e, t, n) {
    function r(e, t) {
      return (
        "[Axios v1.7.2] Transitional option '" +
        e +
        "'" +
        t +
        (n ? ". " + n : "")
      );
    }
    return (n, a, o) => {
      if (!1 === e)
        throw new Og(
          r(a, " has been removed" + (t ? " in " + t : "")),
          Og.ERR_DEPRECATED
        );
      return (
        t &&
          !jm[a] &&
          ((jm[a] = !0),
          console.warn(
            r(
              a,
              " has been deprecated since v" +
                t +
                " and will be removed in the near future"
            )
          )),
        !e || e(n, a, o)
      );
    };
  };
  const Im = {
      assertOptions: function (e, t, n) {
        if ("object" != typeof e)
          throw new Og("options must be an object", Og.ERR_BAD_OPTION_VALUE);
        const r = Object.keys(e);
        let a = r.length;
        for (; a-- > 0; ) {
          const o = r[a],
            i = t[o];
          if (i) {
            const t = e[o],
              n = void 0 === t || i(t, o, e);
            if (!0 !== n)
              throw new Og(
                "option " + o + " must be " + n,
                Og.ERR_BAD_OPTION_VALUE
              );
          } else if (!0 !== n)
            throw new Og("Unknown option " + o, Og.ERR_BAD_OPTION);
        }
      },
      validators: Pm,
    },
    Am = Im.validators;
  class Dm {
    constructor(e) {
      (this.defaults = e),
        (this.interceptors = { request: new Mg(), response: new Mg() });
    }
    async request(e, t) {
      try {
        return await this._request(e, t);
      } catch (n) {
        if (n instanceof Error) {
          let e;
          Error.captureStackTrace
            ? Error.captureStackTrace((e = {}))
            : (e = new Error());
          const t = e.stack ? e.stack.replace(/^.+\n/, "") : "";
          try {
            n.stack
              ? t &&
                !String(n.stack).endsWith(t.replace(/^.+\n.+\n/, "")) &&
                (n.stack += "\n" + t)
              : (n.stack = t);
          } catch (r) {}
        }
        throw n;
      }
    }
    _request(e, t) {
      "string" == typeof e ? ((t = t || {}).url = e) : (t = e || {}),
        (t = cm(this.defaults, t));
      const { transitional: n, paramsSerializer: r, headers: a } = t;
      void 0 !== n &&
        Im.assertOptions(
          n,
          {
            silentJSONParsing: Am.transitional(Am.boolean),
            forcedJSONParsing: Am.transitional(Am.boolean),
            clarifyTimeoutError: Am.transitional(Am.boolean),
          },
          !1
        ),
        null != r &&
          (kg.isFunction(r)
            ? (t.paramsSerializer = { serialize: r })
            : Im.assertOptions(
                r,
                { encode: Am.function, serialize: Am.function },
                !0
              )),
        (t.method = (t.method || this.defaults.method || "get").toLowerCase());
      let o = a && kg.merge(a.common, a[t.method]);
      a &&
        kg.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          (e) => {
            delete a[e];
          }
        ),
        (t.headers = em.concat(o, a));
      const i = [];
      let s = !0;
      this.interceptors.request.forEach(function (e) {
        ("function" == typeof e.runWhen && !1 === e.runWhen(t)) ||
          ((s = s && e.synchronous), i.unshift(e.fulfilled, e.rejected));
      });
      const l = [];
      let u;
      this.interceptors.response.forEach(function (e) {
        l.push(e.fulfilled, e.rejected);
      });
      let c,
        d = 0;
      if (!s) {
        const e = [Rm.bind(this), void 0];
        for (
          e.unshift.apply(e, i),
            e.push.apply(e, l),
            c = e.length,
            u = Promise.resolve(t);
          d < c;

        )
          u = u.then(e[d++], e[d++]);
        return u;
      }
      c = i.length;
      let f = t;
      for (d = 0; d < c; ) {
        const e = i[d++],
          t = i[d++];
        try {
          f = e(f);
        } catch (p) {
          t.call(this, p);
          break;
        }
      }
      try {
        u = Rm.call(this, f);
      } catch (p) {
        return Promise.reject(p);
      }
      for (d = 0, c = l.length; d < c; ) u = u.then(l[d++], l[d++]);
      return u;
    }
    getUri(e) {
      return zg(
        lm((e = cm(this.defaults, e)).baseURL, e.url),
        e.params,
        e.paramsSerializer
      );
    }
  }
  kg.forEach(["delete", "get", "head", "options"], function (e) {
    Dm.prototype[e] = function (t, n) {
      return this.request(
        cm(n || {}, { method: e, url: t, data: (n || {}).data })
      );
    };
  }),
    kg.forEach(["post", "put", "patch"], function (e) {
      function t(t) {
        return function (n, r, a) {
          return this.request(
            cm(a || {}, {
              method: e,
              headers: t ? { "Content-Type": "multipart/form-data" } : {},
              url: n,
              data: r,
            })
          );
        };
      }
      (Dm.prototype[e] = t()), (Dm.prototype[e + "Form"] = t(!0));
    });
  class zm {
    constructor(e) {
      if ("function" != typeof e)
        throw new TypeError("executor must be a function.");
      let t;
      this.promise = new Promise(function (e) {
        t = e;
      });
      const n = this;
      this.promise.then((e) => {
        if (!n._listeners) return;
        let t = n._listeners.length;
        for (; t-- > 0; ) n._listeners[t](e);
        n._listeners = null;
      }),
        (this.promise.then = (e) => {
          let t;
          const r = new Promise((e) => {
            n.subscribe(e), (t = e);
          }).then(e);
          return (
            (r.cancel = function () {
              n.unsubscribe(t);
            }),
            r
          );
        }),
        e(function (e, r, a) {
          n.reason || ((n.reason = new rm(e, r, a)), t(n.reason));
        });
    }
    throwIfRequested() {
      if (this.reason) throw this.reason;
    }
    subscribe(e) {
      this.reason
        ? e(this.reason)
        : this._listeners
        ? this._listeners.push(e)
        : (this._listeners = [e]);
    }
    unsubscribe(e) {
      if (!this._listeners) return;
      const t = this._listeners.indexOf(e);
      -1 !== t && this._listeners.splice(t, 1);
    }
    static source() {
      let e;
      return {
        token: new zm(function (t) {
          e = t;
        }),
        cancel: e,
      };
    }
  }
  const Mm = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
  };
  Object.entries(Mm).forEach(([e, t]) => {
    Mm[t] = e;
  });
  const Um = (function e(t) {
    const n = new Dm(t),
      r = Vh(Dm.prototype.request, n);
    return (
      kg.extend(r, Dm.prototype, n, { allOwnKeys: !0 }),
      kg.extend(r, n, null, { allOwnKeys: !0 }),
      (r.create = function (n) {
        return e(cm(t, n));
      }),
      r
    );
  })(qg);
  (Um.Axios = Dm),
    (Um.CanceledError = rm),
    (Um.CancelToken = zm),
    (Um.isCancel = nm),
    (Um.VERSION = Lm),
    (Um.toFormData = Pg),
    (Um.AxiosError = Og),
    (Um.Cancel = Um.CanceledError),
    (Um.all = function (e) {
      return Promise.all(e);
    }),
    (Um.spread = function (e) {
      return function (t) {
        return e.apply(null, t);
      };
    }),
    (Um.isAxiosError = function (e) {
      return kg.isObject(e) && !0 === e.isAxiosError;
    }),
    (Um.mergeConfig = cm),
    (Um.AxiosHeaders = em),
    (Um.formToJSON = (e) => Gg(kg.isHTMLForm(e) ? new FormData(e) : e)),
    (Um.getAdapter = Tm),
    (Um.HttpStatusCode = Mm),
    (Um.default = Um);
  const Fm = Um.create({
    timeout: 2e4,
    headers: { "Content-Type": "application/json" },
    withCredentials: !0,
  });
  async function Hm(e) {
    try {
      const { data: t } = await Fm.get("/sso/settings", { params: e });
      return t;
    } catch {
      return [];
    }
  }
  async function Vm(e) {
    try {
      const { data: t } = await Fm.post("/sso/settings", e);
      return t;
    } catch {
      return { id: "" };
    }
  }
  async function Bm(e, t) {
    try {
      const { data: n } = await Fm.put(`/sso/settings/${e}`, t);
      return n;
    } catch {
      return "";
    }
  }
  async function Wm(e) {
    try {
      const { data: t } = await Fm.delete("/sso/settings", { params: e });
      return t;
    } catch {
      return "";
    }
  }
  Fm.interceptors.request.use(
    (e) => {
      const t = Hh.getState().getMySsoHostUrl();
      return (e.baseURL = t), e;
    },
    (e) => Promise.reject(e)
  ),
    Fm.interceptors.response.use(
      (e) => e,
      (e) => $w(e, Fm)
    );
  const Km = dh(() => ({
    siteCode: "",
    currentState: { siteCode: null, roleIds: [] },
    name: "",
    rankName: "",
    department: "",
  }));
  function $m(e) {
    return zh(Km, e);
  }
  const Gm = dh((e, t) => ({
    iss: "",
    userId: "",
    department: "",
    displayName: "",
    sites: [],
    siteCode: "",
    tagIds: [],
    roleIds: [],
    permissions: [],
    iat: 0,
    expired: 0,
    info: "",
    isManager: !1,
    getIsManager() {
      var e;
      return Boolean(
        t().isManager ||
          (null == (e = t().permissions)
            ? void 0
            : e.some((e) => e === `MASTER$${Mh.getState().projectCode}`))
      );
    },
  }));
  function qm(e) {
    return zh(Gm, e);
  }
  function Xm() {
    return {
      projectCode: Mh.getState().projectCode,
      settingType: Bn.TYPE,
      settingKey: Bn.ROLE_KEY,
    };
  }
  function Jm(e) {
    return { ...Xm(), settingValue: zw(e) };
  }
  const Zm = dh((e, t) => ({
    id: "",
    myRoleSetting: {},
    myRoleSettingOrigin: [],
    async initRole() {
      const { setNewMetadata: n } = Qm.getState(),
        { siteCode: r, currentState: a } = Km.getState(),
        { getRoleSetting: o, putRoleSetting: i, getAssignedRoles: s } = t(),
        l = s();
      if (
        (await o(),
        0 === Object.keys(Zm.getState().myRoleSetting).length &&
          0 === Zm.getState().myRoleSettingOrigin.length)
      ) {
        const t = {
            [r || ""]: l.map((e) => ({ id: e.id, ck: e.disabled ? 0 : 1 })),
          },
          n = JSON.stringify(t),
          { id: a } = await Vm(Jm(n));
        e({
          id: a,
          myRoleSetting: t,
          myRoleSettingOrigin: [
            { id: a, isUse: !0, settingKey: Bn.ROLE_KEY, settingValue: n },
          ],
        });
      }
      const u = Zm.getState().myRoleSetting[r || ""] || [];
      l.length > 0 &&
      !(() => {
        if (0 === u.length || l.length !== u.length) return !1;
        const e = [...l.map((e) => e.id)].sort((e, t) => e.localeCompare(t)),
          t = [...u.map((e) => e.id)].sort((e, t) => e.localeCompare(t));
        for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
        return !0;
      })()
        ? await i(
            {
              ...Zm.getState().myRoleSetting,
              [r || ""]: l.map((e) => ({ id: e.id, ck: e.disabled ? 0 : 1 })),
            },
            !1
          )
        : ((a.roleIds = l
            .filter((e) => u.some((t) => t.id === e.id && t.ck))
            .map((e) => e.id)),
          null == n || n());
    },
    async getRoleSetting() {
      var t;
      const n = await Hm(Xm());
      let r;
      try {
        r = JSON.parse(Mw(n[0].settingValue));
      } catch {
        r = {};
      }
      n.length > 1 || Array.isArray(r)
        ? await Wm(Xm())
        : e({
            id: (null == (t = null == n ? void 0 : n[0]) ? void 0 : t.id) || "",
            myRoleSetting: r,
            myRoleSettingOrigin: n,
          });
    },
    getAssignedRoles() {
      var e, n;
      const { roleResult: r, menuResult: a } = Qm.getState(),
        { siteCode: o } = Km.getState(),
        { sites: i, roleIds: s } = Gm.getState(),
        l =
          (null == (e = null == a ? void 0 : a.project)
            ? void 0
            : e.isGlobal) || !1
            ? (i.find((e) => e.sc === o) || {}).rIds || []
            : s || [],
        u = t().getPermissionCodeWithSiteCodes();
      return (
        (null == (n = null == r ? void 0 : r.roles)
          ? void 0
          : n
              .filter((e) => l.includes(e.id))
              .map((e) => ({
                ...e,
                disabled: !e.permissionIds.some((e) =>
                  null == u ? void 0 : u.includes(e)
                ),
              }))) || []
      );
    },
    async putRoleSetting(e, n) {
      var r, a;
      await Bm(Zm.getState().id, Jm(JSON.stringify(e))),
        Zm.setState({ myRoleSetting: e }),
        !1 !== n && t().emitPermissionCodes(),
        null == (a = (r = Qm.getState()).setNewMetadata) || a.call(r);
    },
    getCurrentRoleUrl() {
      const { siteCode: e, currentState: t } = Km.getState(),
        { menuOrigin: n, roles: r } = Qm.getState();
      if (!n || !r) return "";
      const a = new Set(),
        o = t.roleIds;
      r.filter((e) => (null == o ? void 0 : o.indexOf(e.id)) > -1).forEach(
        (e) => {
          var t;
          null == (t = e.permissionIds) ||
            t.forEach((e) => {
              a.add(e);
            });
        }
      );
      const i = Vw(Cw(xw(n).children, a, e || "", !0) || []);
      return (null == i ? void 0 : i.url)
        ? qw(i.url, { key: "_sc_", value: e || "" })
        : "";
    },
    emitPermissionCodes() {
      const e = t().getCurrentRoleUrl(),
        { to: n, urlWithParams: r, isSameDomain: a } = Hw(e);
      sv.getState().emit("changeRole", {
        permissionCodes: t().getPermissionCodes(!0),
        to: n,
        urlWithParams: r,
        isSameDomain: a,
      });
    },
    getPermissionCodes(e) {
      var n;
      const { roles: r, project: a } = Qm.getState(),
        { myRoleSetting: o, getRoleIds: i } = Zm.getState(),
        { siteCode: s } = Km.getState(),
        l = new Set(),
        u = (null == a ? void 0 : a.isGlobal) || !1,
        c = t().getPermissionCodeWithSiteCodes();
      let d = (null == i ? void 0 : i(u)) || [];
      if (e) {
        const e =
          null == (n = o[s || ""])
            ? void 0
            : n.filter((e) => 1 === e.ck).map((e) => e.id);
        d = d.filter((t) => e.includes(t));
      }
      return (
        null == r ||
          r
            .filter((e) => d.indexOf(e.id) > -1)
            .forEach((e) => {
              e.permissionIds &&
                e.permissionIds.length > 0 &&
                e.permissionIds.forEach((e) => {
                  (null == c ? void 0 : c.includes(e)) && l.add(e);
                });
            }),
        Array.from(l)
      );
    },
    getPermissionCodeWithSiteCodes() {
      var e;
      const { project: t, menuResult: n } = Qm.getState(),
        r = (null == t ? void 0 : t.isGlobal) || !1,
        { siteCode: a } = Km.getState();
      return (
        (null == (e = null == n ? void 0 : n.menus)
          ? void 0
          : e
              .filter((e) => !r || e.allowSiteCodes.includes(a || ""))
              .map((e) => e.requiredPermissionIds)
              .reduce((e, t) => [...e, ...t], [])) || []
      );
    },
  }));
  function Ym(e) {
    return zh(Zm, e);
  }
  const Qm = dh((e, t) => ({
      roles: void 0,
      tags: void 0,
      menus: void 0,
      menuOrigin: void 0,
      projectName: void 0,
      project: void 0,
      siteData: void 0,
      getNewMetadata: (e) => {
        var n, r;
        const { roleResult: a, menuResult: o, siteResult: i } = t(),
          { currentState: s } = Km.getState(),
          l = new Set(),
          u = (null == o ? void 0 : o.project.isGlobal) || !1;
        e &&
          s.roleIds &&
          0 === s.roleIds.length &&
          (s.roleIds =
            (null == (r = (n = Zm.getState()).getRoleIds)
              ? void 0
              : r.call(n, u)) || []),
          null == a ||
            a.roles
              .filter((e) => {
                var t;
                return (
                  (null == (t = s.roleIds) ? void 0 : t.indexOf(e.id)) > -1
                );
              })
              .forEach((e) => {
                var t;
                null == (t = e.permissionIds) ||
                  t.forEach((e) => {
                    l.add(e);
                  });
              });
        const c = Cw(
          xw((null == o ? void 0 : o.menus) || []).children,
          l,
          s.siteCode || "",
          u
        );
        return {
          roles: null == a ? void 0 : a.roles,
          tags: null == a ? void 0 : a.tags,
          menus: c,
          menuOrigin: null == o ? void 0 : o.menus,
          projectName: null == o ? void 0 : o.projectName,
          project: null == o ? void 0 : o.project,
          siteData: null == i ? void 0 : i.sites,
        };
      },
      setNewMetadata() {
        e(t().getNewMetadata());
      },
    })),
    ev = (e) => ({
      id: e.id,
      name: e.name,
      url: e.url,
      parentId: e.parentId,
      order: e.order,
      requiredPermissionIds: e.requiredPermissionIds,
      allowSiteCodes: e.allowSiteCodes,
      multilingual: e.multilingual,
      isVisible: e.isVisible,
      isAccessible: e.isAccessible,
      children: e.children.map(ev),
    }),
    tv = (e) => ({
      id: e.id,
      multilingual: e.multilingual,
      permissionIds: e.permissionIds,
      roleId: e.roleId,
      roleName: e.roleName,
    }),
    nv = (e) => ({
      id: e.id,
      multilingual: e.multilingual,
      tagCode: e.tagCode,
    }),
    rv = (e) => {
      if (void 0 !== e)
        return {
          isGlobal: e.isGlobal,
          siteCodes: e.siteCodes,
          languages: e.languages,
          multilingual: e.multilingual,
          session: e.session,
        };
    },
    av = (e) => {
      if (void 0 !== e)
        return Object.keys(e).reduce(
          (t, n) => (t || (t = {}), (t[n] = e[n]), t),
          {}
        );
    },
    ov = (e) => {
      if (void 0 !== e)
        return Object.keys(e).reduce(
          (t, n) => (
            t || (t = {}),
            (t[n] = {
              name: e[n].name,
              abbrName: e[n].abbrName,
              regionType: e[n].regionType,
              country: e[n].country,
            }),
            t
          ),
          {}
        );
    };
  function iv(e) {
    return zh(Qm, e);
  }
  const sv = dh((e, t) => ({
    activeMenuUrl: "",
    setActiveMenuUrl(t) {
      e({ activeMenuUrl: t });
    },
    emit() {},
    getSiteCodeUrl(e) {
      const { sites: t } = Gm.getState(),
        { menuOrigin: n, roles: r } = Qm.getState();
      if (!n || !r || !t.some((t) => t.sc === e)) return;
      const a = new Set(),
        o = Array.from(new Set((t.find((t) => t.sc === e) || {}).rIds || []));
      r.filter((e) => (null == o ? void 0 : o.indexOf(e.id)) > -1).forEach(
        (e) => {
          var t;
          null == (t = e.permissionIds) ||
            t.forEach((e) => {
              a.add(e);
            });
        }
      );
      const i = Cw(xw(n).children, a, e || "", !0),
        s =
          Bw(i || [], window.location.origin + window.location.pathname) ||
          Vw(i || []);
      return (null == s ? void 0 : s.url)
        ? qw(s.url, { key: "_sc_", value: e })
        : void 0;
    },
    changeSiteCode(e) {
      const { emit: n } = sv.getState();
      n("changeSiteCode", { siteCode: e }),
        window.location.assign(t().getSiteCodeUrl(e) || "/");
    },
  }));
  function lv(e) {
    return zh(sv, e);
  }
  /*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */ function uv(
    e
  ) {
    let t = e.length;
    for (; --t >= 0; ) e[t] = 0;
  }
  const cv = 256,
    dv = 286,
    fv = 30,
    pv = 15,
    hv = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
      5, 5, 5, 0,
    ]),
    gv = new Uint8Array([
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
      11, 11, 12, 12, 13, 13,
    ]),
    mv = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7,
    ]),
    vv = new Uint8Array([
      16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
    ]),
    yv = new Array(576);
  uv(yv);
  const bv = new Array(60);
  uv(bv);
  const wv = new Array(512);
  uv(wv);
  const _v = new Array(256);
  uv(_v);
  const Sv = new Array(29);
  uv(Sv);
  const Ev = new Array(fv);
  function kv(e, t, n, r, a) {
    (this.static_tree = e),
      (this.extra_bits = t),
      (this.extra_base = n),
      (this.elems = r),
      (this.max_length = a),
      (this.has_stree = e && e.length);
  }
  let Ov, xv, Cv;
  function Tv(e, t) {
    (this.dyn_tree = e), (this.max_code = 0), (this.stat_desc = t);
  }
  uv(Ev);
  const Nv = (e) => (e < 256 ? wv[e] : wv[256 + (e >>> 7)]),
    Rv = (e, t) => {
      (e.pending_buf[e.pending++] = 255 & t),
        (e.pending_buf[e.pending++] = (t >>> 8) & 255);
    },
    Lv = (e, t, n) => {
      e.bi_valid > 16 - n
        ? ((e.bi_buf |= (t << e.bi_valid) & 65535),
          Rv(e, e.bi_buf),
          (e.bi_buf = t >> (16 - e.bi_valid)),
          (e.bi_valid += n - 16))
        : ((e.bi_buf |= (t << e.bi_valid) & 65535), (e.bi_valid += n));
    },
    Pv = (e, t, n) => {
      Lv(e, n[2 * t], n[2 * t + 1]);
    },
    jv = (e, t) => {
      let n = 0;
      do {
        (n |= 1 & e), (e >>>= 1), (n <<= 1);
      } while (--t > 0);
      return n >>> 1;
    },
    Iv = (e, t, n) => {
      const r = new Array(16);
      let a,
        o,
        i = 0;
      for (a = 1; a <= pv; a++) (i = (i + n[a - 1]) << 1), (r[a] = i);
      for (o = 0; o <= t; o++) {
        let t = e[2 * o + 1];
        0 !== t && (e[2 * o] = jv(r[t]++, t));
      }
    },
    Av = (e) => {
      let t;
      for (t = 0; t < dv; t++) e.dyn_ltree[2 * t] = 0;
      for (t = 0; t < fv; t++) e.dyn_dtree[2 * t] = 0;
      for (t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;
      (e.dyn_ltree[512] = 1),
        (e.opt_len = e.static_len = 0),
        (e.sym_next = e.matches = 0);
    },
    Dv = (e) => {
      e.bi_valid > 8
        ? Rv(e, e.bi_buf)
        : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf),
        (e.bi_buf = 0),
        (e.bi_valid = 0);
    },
    zv = (e, t, n, r) => {
      const a = 2 * t,
        o = 2 * n;
      return e[a] < e[o] || (e[a] === e[o] && r[t] <= r[n]);
    },
    Mv = (e, t, n) => {
      const r = e.heap[n];
      let a = n << 1;
      for (
        ;
        a <= e.heap_len &&
        (a < e.heap_len && zv(t, e.heap[a + 1], e.heap[a], e.depth) && a++,
        !zv(t, r, e.heap[a], e.depth));

      )
        (e.heap[n] = e.heap[a]), (n = a), (a <<= 1);
      e.heap[n] = r;
    },
    Uv = (e, t, n) => {
      let r,
        a,
        o,
        i,
        s = 0;
      if (0 !== e.sym_next)
        do {
          (r = 255 & e.pending_buf[e.sym_buf + s++]),
            (r += (255 & e.pending_buf[e.sym_buf + s++]) << 8),
            (a = e.pending_buf[e.sym_buf + s++]),
            0 === r
              ? Pv(e, a, t)
              : ((o = _v[a]),
                Pv(e, o + cv + 1, t),
                (i = hv[o]),
                0 !== i && ((a -= Sv[o]), Lv(e, a, i)),
                r--,
                (o = Nv(r)),
                Pv(e, o, n),
                (i = gv[o]),
                0 !== i && ((r -= Ev[o]), Lv(e, r, i)));
        } while (s < e.sym_next);
      Pv(e, 256, t);
    },
    Fv = (e, t) => {
      const n = t.dyn_tree,
        r = t.stat_desc.static_tree,
        a = t.stat_desc.has_stree,
        o = t.stat_desc.elems;
      let i,
        s,
        l,
        u = -1;
      for (e.heap_len = 0, e.heap_max = 573, i = 0; i < o; i++)
        0 !== n[2 * i]
          ? ((e.heap[++e.heap_len] = u = i), (e.depth[i] = 0))
          : (n[2 * i + 1] = 0);
      for (; e.heap_len < 2; )
        (l = e.heap[++e.heap_len] = u < 2 ? ++u : 0),
          (n[2 * l] = 1),
          (e.depth[l] = 0),
          e.opt_len--,
          a && (e.static_len -= r[2 * l + 1]);
      for (t.max_code = u, i = e.heap_len >> 1; i >= 1; i--) Mv(e, n, i);
      l = o;
      do {
        (i = e.heap[1]),
          (e.heap[1] = e.heap[e.heap_len--]),
          Mv(e, n, 1),
          (s = e.heap[1]),
          (e.heap[--e.heap_max] = i),
          (e.heap[--e.heap_max] = s),
          (n[2 * l] = n[2 * i] + n[2 * s]),
          (e.depth[l] =
            (e.depth[i] >= e.depth[s] ? e.depth[i] : e.depth[s]) + 1),
          (n[2 * i + 1] = n[2 * s + 1] = l),
          (e.heap[1] = l++),
          Mv(e, n, 1);
      } while (e.heap_len >= 2);
      (e.heap[--e.heap_max] = e.heap[1]),
        ((e, t) => {
          const n = t.dyn_tree,
            r = t.max_code,
            a = t.stat_desc.static_tree,
            o = t.stat_desc.has_stree,
            i = t.stat_desc.extra_bits,
            s = t.stat_desc.extra_base,
            l = t.stat_desc.max_length;
          let u,
            c,
            d,
            f,
            p,
            h,
            g = 0;
          for (f = 0; f <= pv; f++) e.bl_count[f] = 0;
          for (
            n[2 * e.heap[e.heap_max] + 1] = 0, u = e.heap_max + 1;
            u < 573;
            u++
          )
            (c = e.heap[u]),
              (f = n[2 * n[2 * c + 1] + 1] + 1),
              f > l && ((f = l), g++),
              (n[2 * c + 1] = f),
              c > r ||
                (e.bl_count[f]++,
                (p = 0),
                c >= s && (p = i[c - s]),
                (h = n[2 * c]),
                (e.opt_len += h * (f + p)),
                o && (e.static_len += h * (a[2 * c + 1] + p)));
          if (0 !== g) {
            do {
              for (f = l - 1; 0 === e.bl_count[f]; ) f--;
              e.bl_count[f]--,
                (e.bl_count[f + 1] += 2),
                e.bl_count[l]--,
                (g -= 2);
            } while (g > 0);
            for (f = l; 0 !== f; f--)
              for (c = e.bl_count[f]; 0 !== c; )
                (d = e.heap[--u]),
                  d > r ||
                    (n[2 * d + 1] !== f &&
                      ((e.opt_len += (f - n[2 * d + 1]) * n[2 * d]),
                      (n[2 * d + 1] = f)),
                    c--);
          }
        })(e, t),
        Iv(n, u, e.bl_count);
    },
    Hv = (e, t, n) => {
      let r,
        a,
        o = -1,
        i = t[1],
        s = 0,
        l = 7,
        u = 4;
      for (
        0 === i && ((l = 138), (u = 3)), t[2 * (n + 1) + 1] = 65535, r = 0;
        r <= n;
        r++
      )
        (a = i),
          (i = t[2 * (r + 1) + 1]),
          (++s < l && a === i) ||
            (s < u
              ? (e.bl_tree[2 * a] += s)
              : 0 !== a
              ? (a !== o && e.bl_tree[2 * a]++, e.bl_tree[32]++)
              : s <= 10
              ? e.bl_tree[34]++
              : e.bl_tree[36]++,
            (s = 0),
            (o = a),
            0 === i
              ? ((l = 138), (u = 3))
              : a === i
              ? ((l = 6), (u = 3))
              : ((l = 7), (u = 4)));
    },
    Vv = (e, t, n) => {
      let r,
        a,
        o = -1,
        i = t[1],
        s = 0,
        l = 7,
        u = 4;
      for (0 === i && ((l = 138), (u = 3)), r = 0; r <= n; r++)
        if (((a = i), (i = t[2 * (r + 1) + 1]), !(++s < l && a === i))) {
          if (s < u)
            do {
              Pv(e, a, e.bl_tree);
            } while (0 != --s);
          else
            0 !== a
              ? (a !== o && (Pv(e, a, e.bl_tree), s--),
                Pv(e, 16, e.bl_tree),
                Lv(e, s - 3, 2))
              : s <= 10
              ? (Pv(e, 17, e.bl_tree), Lv(e, s - 3, 3))
              : (Pv(e, 18, e.bl_tree), Lv(e, s - 11, 7));
          (s = 0),
            (o = a),
            0 === i
              ? ((l = 138), (u = 3))
              : a === i
              ? ((l = 6), (u = 3))
              : ((l = 7), (u = 4));
        }
    };
  let Bv = !1;
  const Wv = (e, t, n, r) => {
    Lv(e, 0 + (r ? 1 : 0), 3),
      Dv(e),
      Rv(e, n),
      Rv(e, ~n),
      n && e.pending_buf.set(e.window.subarray(t, t + n), e.pending),
      (e.pending += n);
  };
  var Kv = {
    _tr_init: (e) => {
      Bv ||
        ((() => {
          let e, t, n, r, a;
          const o = new Array(16);
          for (n = 0, r = 0; r < 28; r++)
            for (Sv[r] = n, e = 0; e < 1 << hv[r]; e++) _v[n++] = r;
          for (_v[n - 1] = r, a = 0, r = 0; r < 16; r++)
            for (Ev[r] = a, e = 0; e < 1 << gv[r]; e++) wv[a++] = r;
          for (a >>= 7; r < fv; r++)
            for (Ev[r] = a << 7, e = 0; e < 1 << (gv[r] - 7); e++)
              wv[256 + a++] = r;
          for (t = 0; t <= pv; t++) o[t] = 0;
          for (e = 0; e <= 143; ) (yv[2 * e + 1] = 8), e++, o[8]++;
          for (; e <= 255; ) (yv[2 * e + 1] = 9), e++, o[9]++;
          for (; e <= 279; ) (yv[2 * e + 1] = 7), e++, o[7]++;
          for (; e <= 287; ) (yv[2 * e + 1] = 8), e++, o[8]++;
          for (Iv(yv, 287, o), e = 0; e < fv; e++)
            (bv[2 * e + 1] = 5), (bv[2 * e] = jv(e, 5));
          (Ov = new kv(yv, hv, 257, dv, pv)),
            (xv = new kv(bv, gv, 0, fv, pv)),
            (Cv = new kv(new Array(0), mv, 0, 19, 7));
        })(),
        (Bv = !0)),
        (e.l_desc = new Tv(e.dyn_ltree, Ov)),
        (e.d_desc = new Tv(e.dyn_dtree, xv)),
        (e.bl_desc = new Tv(e.bl_tree, Cv)),
        (e.bi_buf = 0),
        (e.bi_valid = 0),
        Av(e);
    },
    _tr_stored_block: Wv,
    _tr_flush_block: (e, t, n, r) => {
      let a,
        o,
        i = 0;
      e.level > 0
        ? (2 === e.strm.data_type &&
            (e.strm.data_type = ((e) => {
              let t,
                n = 4093624447;
              for (t = 0; t <= 31; t++, n >>>= 1)
                if (1 & n && 0 !== e.dyn_ltree[2 * t]) return 0;
              if (
                0 !== e.dyn_ltree[18] ||
                0 !== e.dyn_ltree[20] ||
                0 !== e.dyn_ltree[26]
              )
                return 1;
              for (t = 32; t < cv; t++) if (0 !== e.dyn_ltree[2 * t]) return 1;
              return 0;
            })(e)),
          Fv(e, e.l_desc),
          Fv(e, e.d_desc),
          (i = ((e) => {
            let t;
            for (
              Hv(e, e.dyn_ltree, e.l_desc.max_code),
                Hv(e, e.dyn_dtree, e.d_desc.max_code),
                Fv(e, e.bl_desc),
                t = 18;
              t >= 3 && 0 === e.bl_tree[2 * vv[t] + 1];
              t--
            );
            return (e.opt_len += 3 * (t + 1) + 5 + 5 + 4), t;
          })(e)),
          (a = (e.opt_len + 3 + 7) >>> 3),
          (o = (e.static_len + 3 + 7) >>> 3),
          o <= a && (a = o))
        : (a = o = n + 5),
        n + 4 <= a && -1 !== t
          ? Wv(e, t, n, r)
          : 4 === e.strategy || o === a
          ? (Lv(e, 2 + (r ? 1 : 0), 3), Uv(e, yv, bv))
          : (Lv(e, 4 + (r ? 1 : 0), 3),
            ((e, t, n, r) => {
              let a;
              for (
                Lv(e, t - 257, 5), Lv(e, n - 1, 5), Lv(e, r - 4, 4), a = 0;
                a < r;
                a++
              )
                Lv(e, e.bl_tree[2 * vv[a] + 1], 3);
              Vv(e, e.dyn_ltree, t - 1), Vv(e, e.dyn_dtree, n - 1);
            })(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, i + 1),
            Uv(e, e.dyn_ltree, e.dyn_dtree)),
        Av(e),
        r && Dv(e);
    },
    _tr_tally: (e, t, n) => (
      (e.pending_buf[e.sym_buf + e.sym_next++] = t),
      (e.pending_buf[e.sym_buf + e.sym_next++] = t >> 8),
      (e.pending_buf[e.sym_buf + e.sym_next++] = n),
      0 === t
        ? e.dyn_ltree[2 * n]++
        : (e.matches++,
          t--,
          e.dyn_ltree[2 * (_v[n] + cv + 1)]++,
          e.dyn_dtree[2 * Nv(t)]++),
      e.sym_next === e.sym_end
    ),
    _tr_align: (e) => {
      Lv(e, 2, 3),
        Pv(e, 256, yv),
        ((e) => {
          16 === e.bi_valid
            ? (Rv(e, e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0))
            : e.bi_valid >= 8 &&
              ((e.pending_buf[e.pending++] = 255 & e.bi_buf),
              (e.bi_buf >>= 8),
              (e.bi_valid -= 8));
        })(e);
    },
  };
  var $v = (e, t, n, r) => {
    let a = (65535 & e) | 0,
      o = ((e >>> 16) & 65535) | 0,
      i = 0;
    for (; 0 !== n; ) {
      (i = n > 2e3 ? 2e3 : n), (n -= i);
      do {
        (a = (a + t[r++]) | 0), (o = (o + a) | 0);
      } while (--i);
      (a %= 65521), (o %= 65521);
    }
    return a | (o << 16) | 0;
  };
  const Gv = new Uint32Array(
    (() => {
      let e,
        t = [];
      for (var n = 0; n < 256; n++) {
        e = n;
        for (var r = 0; r < 8; r++)
          e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1;
        t[n] = e;
      }
      return t;
    })()
  );
  var qv = (e, t, n, r) => {
      const a = Gv,
        o = r + n;
      e ^= -1;
      for (let i = r; i < o; i++) e = (e >>> 8) ^ a[255 & (e ^ t[i])];
      return -1 ^ e;
    },
    Xv = {
      2: "need dictionary",
      1: "stream end",
      0: "",
      "-1": "file error",
      "-2": "stream error",
      "-3": "data error",
      "-4": "insufficient memory",
      "-5": "buffer error",
      "-6": "incompatible version",
    },
    Jv = {
      Z_NO_FLUSH: 0,
      Z_PARTIAL_FLUSH: 1,
      Z_SYNC_FLUSH: 2,
      Z_FULL_FLUSH: 3,
      Z_FINISH: 4,
      Z_BLOCK: 5,
      Z_TREES: 6,
      Z_OK: 0,
      Z_STREAM_END: 1,
      Z_NEED_DICT: 2,
      Z_ERRNO: -1,
      Z_STREAM_ERROR: -2,
      Z_DATA_ERROR: -3,
      Z_MEM_ERROR: -4,
      Z_BUF_ERROR: -5,
      Z_NO_COMPRESSION: 0,
      Z_BEST_SPEED: 1,
      Z_BEST_COMPRESSION: 9,
      Z_DEFAULT_COMPRESSION: -1,
      Z_FILTERED: 1,
      Z_HUFFMAN_ONLY: 2,
      Z_RLE: 3,
      Z_FIXED: 4,
      Z_DEFAULT_STRATEGY: 0,
      Z_BINARY: 0,
      Z_TEXT: 1,
      Z_UNKNOWN: 2,
      Z_DEFLATED: 8,
    };
  const {
      _tr_init: Zv,
      _tr_stored_block: Yv,
      _tr_flush_block: Qv,
      _tr_tally: ey,
      _tr_align: ty,
    } = Kv,
    {
      Z_NO_FLUSH: ny,
      Z_PARTIAL_FLUSH: ry,
      Z_FULL_FLUSH: ay,
      Z_FINISH: oy,
      Z_BLOCK: iy,
      Z_OK: sy,
      Z_STREAM_END: ly,
      Z_STREAM_ERROR: uy,
      Z_DATA_ERROR: cy,
      Z_BUF_ERROR: dy,
      Z_DEFAULT_COMPRESSION: fy,
      Z_FILTERED: py,
      Z_HUFFMAN_ONLY: hy,
      Z_RLE: gy,
      Z_FIXED: my,
      Z_DEFAULT_STRATEGY: vy,
      Z_UNKNOWN: yy,
      Z_DEFLATED: by,
    } = Jv,
    wy = 258,
    _y = 262,
    Sy = 42,
    Ey = 113,
    ky = 666,
    Oy = (e, t) => ((e.msg = Xv[t]), t),
    xy = (e) => 2 * e - (e > 4 ? 9 : 0),
    Cy = (e) => {
      let t = e.length;
      for (; --t >= 0; ) e[t] = 0;
    },
    Ty = (e) => {
      let t,
        n,
        r,
        a = e.w_size;
      (t = e.hash_size), (r = t);
      do {
        (n = e.head[--r]), (e.head[r] = n >= a ? n - a : 0);
      } while (--t);
      (t = a), (r = t);
      do {
        (n = e.prev[--r]), (e.prev[r] = n >= a ? n - a : 0);
      } while (--t);
    };
  let Ny = (e, t, n) => ((t << e.hash_shift) ^ n) & e.hash_mask;
  const Ry = (e) => {
      const t = e.state;
      let n = t.pending;
      n > e.avail_out && (n = e.avail_out),
        0 !== n &&
          (e.output.set(
            t.pending_buf.subarray(t.pending_out, t.pending_out + n),
            e.next_out
          ),
          (e.next_out += n),
          (t.pending_out += n),
          (e.total_out += n),
          (e.avail_out -= n),
          (t.pending -= n),
          0 === t.pending && (t.pending_out = 0));
    },
    Ly = (e, t) => {
      Qv(
        e,
        e.block_start >= 0 ? e.block_start : -1,
        e.strstart - e.block_start,
        t
      ),
        (e.block_start = e.strstart),
        Ry(e.strm);
    },
    Py = (e, t) => {
      e.pending_buf[e.pending++] = t;
    },
    jy = (e, t) => {
      (e.pending_buf[e.pending++] = (t >>> 8) & 255),
        (e.pending_buf[e.pending++] = 255 & t);
    },
    Iy = (e, t, n, r) => {
      let a = e.avail_in;
      return (
        a > r && (a = r),
        0 === a
          ? 0
          : ((e.avail_in -= a),
            t.set(e.input.subarray(e.next_in, e.next_in + a), n),
            1 === e.state.wrap
              ? (e.adler = $v(e.adler, t, a, n))
              : 2 === e.state.wrap && (e.adler = qv(e.adler, t, a, n)),
            (e.next_in += a),
            (e.total_in += a),
            a)
      );
    },
    Ay = (e, t) => {
      let n,
        r,
        a = e.max_chain_length,
        o = e.strstart,
        i = e.prev_length,
        s = e.nice_match;
      const l = e.strstart > e.w_size - _y ? e.strstart - (e.w_size - _y) : 0,
        u = e.window,
        c = e.w_mask,
        d = e.prev,
        f = e.strstart + wy;
      let p = u[o + i - 1],
        h = u[o + i];
      e.prev_length >= e.good_match && (a >>= 2),
        s > e.lookahead && (s = e.lookahead);
      do {
        if (
          ((n = t),
          u[n + i] === h &&
            u[n + i - 1] === p &&
            u[n] === u[o] &&
            u[++n] === u[o + 1])
        ) {
          (o += 2), n++;
          do {} while (
            u[++o] === u[++n] &&
            u[++o] === u[++n] &&
            u[++o] === u[++n] &&
            u[++o] === u[++n] &&
            u[++o] === u[++n] &&
            u[++o] === u[++n] &&
            u[++o] === u[++n] &&
            u[++o] === u[++n] &&
            o < f
          );
          if (((r = wy - (f - o)), (o = f - wy), r > i)) {
            if (((e.match_start = t), (i = r), r >= s)) break;
            (p = u[o + i - 1]), (h = u[o + i]);
          }
        }
      } while ((t = d[t & c]) > l && 0 != --a);
      return i <= e.lookahead ? i : e.lookahead;
    },
    Dy = (e) => {
      const t = e.w_size;
      let n, r, a;
      do {
        if (
          ((r = e.window_size - e.lookahead - e.strstart),
          e.strstart >= t + (t - _y) &&
            (e.window.set(e.window.subarray(t, t + t - r), 0),
            (e.match_start -= t),
            (e.strstart -= t),
            (e.block_start -= t),
            e.insert > e.strstart && (e.insert = e.strstart),
            Ty(e),
            (r += t)),
          0 === e.strm.avail_in)
        )
          break;
        if (
          ((n = Iy(e.strm, e.window, e.strstart + e.lookahead, r)),
          (e.lookahead += n),
          e.lookahead + e.insert >= 3)
        )
          for (
            a = e.strstart - e.insert,
              e.ins_h = e.window[a],
              e.ins_h = Ny(e, e.ins_h, e.window[a + 1]);
            e.insert &&
            ((e.ins_h = Ny(e, e.ins_h, e.window[a + 3 - 1])),
            (e.prev[a & e.w_mask] = e.head[e.ins_h]),
            (e.head[e.ins_h] = a),
            a++,
            e.insert--,
            !(e.lookahead + e.insert < 3));

          );
      } while (e.lookahead < _y && 0 !== e.strm.avail_in);
    },
    zy = (e, t) => {
      let n,
        r,
        a,
        o =
          e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5,
        i = 0,
        s = e.strm.avail_in;
      do {
        if (((n = 65535), (a = (e.bi_valid + 42) >> 3), e.strm.avail_out < a))
          break;
        if (
          ((a = e.strm.avail_out - a),
          (r = e.strstart - e.block_start),
          n > r + e.strm.avail_in && (n = r + e.strm.avail_in),
          n > a && (n = a),
          n < o &&
            ((0 === n && t !== oy) || t === ny || n !== r + e.strm.avail_in))
        )
          break;
        (i = t === oy && n === r + e.strm.avail_in ? 1 : 0),
          Yv(e, 0, 0, i),
          (e.pending_buf[e.pending - 4] = n),
          (e.pending_buf[e.pending - 3] = n >> 8),
          (e.pending_buf[e.pending - 2] = ~n),
          (e.pending_buf[e.pending - 1] = ~n >> 8),
          Ry(e.strm),
          r &&
            (r > n && (r = n),
            e.strm.output.set(
              e.window.subarray(e.block_start, e.block_start + r),
              e.strm.next_out
            ),
            (e.strm.next_out += r),
            (e.strm.avail_out -= r),
            (e.strm.total_out += r),
            (e.block_start += r),
            (n -= r)),
          n &&
            (Iy(e.strm, e.strm.output, e.strm.next_out, n),
            (e.strm.next_out += n),
            (e.strm.avail_out -= n),
            (e.strm.total_out += n));
      } while (0 === i);
      return (
        (s -= e.strm.avail_in),
        s &&
          (s >= e.w_size
            ? ((e.matches = 2),
              e.window.set(
                e.strm.input.subarray(
                  e.strm.next_in - e.w_size,
                  e.strm.next_in
                ),
                0
              ),
              (e.strstart = e.w_size),
              (e.insert = e.strstart))
            : (e.window_size - e.strstart <= s &&
                ((e.strstart -= e.w_size),
                e.window.set(
                  e.window.subarray(e.w_size, e.w_size + e.strstart),
                  0
                ),
                e.matches < 2 && e.matches++,
                e.insert > e.strstart && (e.insert = e.strstart)),
              e.window.set(
                e.strm.input.subarray(e.strm.next_in - s, e.strm.next_in),
                e.strstart
              ),
              (e.strstart += s),
              (e.insert += s > e.w_size - e.insert ? e.w_size - e.insert : s)),
          (e.block_start = e.strstart)),
        e.high_water < e.strstart && (e.high_water = e.strstart),
        i
          ? 4
          : t !== ny &&
            t !== oy &&
            0 === e.strm.avail_in &&
            e.strstart === e.block_start
          ? 2
          : ((a = e.window_size - e.strstart),
            e.strm.avail_in > a &&
              e.block_start >= e.w_size &&
              ((e.block_start -= e.w_size),
              (e.strstart -= e.w_size),
              e.window.set(
                e.window.subarray(e.w_size, e.w_size + e.strstart),
                0
              ),
              e.matches < 2 && e.matches++,
              (a += e.w_size),
              e.insert > e.strstart && (e.insert = e.strstart)),
            a > e.strm.avail_in && (a = e.strm.avail_in),
            a &&
              (Iy(e.strm, e.window, e.strstart, a),
              (e.strstart += a),
              (e.insert += a > e.w_size - e.insert ? e.w_size - e.insert : a)),
            e.high_water < e.strstart && (e.high_water = e.strstart),
            (a = (e.bi_valid + 42) >> 3),
            (a =
              e.pending_buf_size - a > 65535 ? 65535 : e.pending_buf_size - a),
            (o = a > e.w_size ? e.w_size : a),
            (r = e.strstart - e.block_start),
            (r >= o ||
              ((r || t === oy) &&
                t !== ny &&
                0 === e.strm.avail_in &&
                r <= a)) &&
              ((n = r > a ? a : r),
              (i = t === oy && 0 === e.strm.avail_in && n === r ? 1 : 0),
              Yv(e, e.block_start, n, i),
              (e.block_start += n),
              Ry(e.strm)),
            i ? 3 : 1)
      );
    },
    My = (e, t) => {
      let n, r;
      for (;;) {
        if (e.lookahead < _y) {
          if ((Dy(e), e.lookahead < _y && t === ny)) return 1;
          if (0 === e.lookahead) break;
        }
        if (
          ((n = 0),
          e.lookahead >= 3 &&
            ((e.ins_h = Ny(e, e.ins_h, e.window[e.strstart + 3 - 1])),
            (n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
            (e.head[e.ins_h] = e.strstart)),
          0 !== n &&
            e.strstart - n <= e.w_size - _y &&
            (e.match_length = Ay(e, n)),
          e.match_length >= 3)
        )
          if (
            ((r = ey(e, e.strstart - e.match_start, e.match_length - 3)),
            (e.lookahead -= e.match_length),
            e.match_length <= e.max_lazy_match && e.lookahead >= 3)
          ) {
            e.match_length--;
            do {
              e.strstart++,
                (e.ins_h = Ny(e, e.ins_h, e.window[e.strstart + 3 - 1])),
                (n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                (e.head[e.ins_h] = e.strstart);
            } while (0 != --e.match_length);
            e.strstart++;
          } else
            (e.strstart += e.match_length),
              (e.match_length = 0),
              (e.ins_h = e.window[e.strstart]),
              (e.ins_h = Ny(e, e.ins_h, e.window[e.strstart + 1]));
        else (r = ey(e, 0, e.window[e.strstart])), e.lookahead--, e.strstart++;
        if (r && (Ly(e, !1), 0 === e.strm.avail_out)) return 1;
      }
      return (
        (e.insert = e.strstart < 2 ? e.strstart : 2),
        t === oy
          ? (Ly(e, !0), 0 === e.strm.avail_out ? 3 : 4)
          : e.sym_next && (Ly(e, !1), 0 === e.strm.avail_out)
          ? 1
          : 2
      );
    },
    Uy = (e, t) => {
      let n, r, a;
      for (;;) {
        if (e.lookahead < _y) {
          if ((Dy(e), e.lookahead < _y && t === ny)) return 1;
          if (0 === e.lookahead) break;
        }
        if (
          ((n = 0),
          e.lookahead >= 3 &&
            ((e.ins_h = Ny(e, e.ins_h, e.window[e.strstart + 3 - 1])),
            (n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
            (e.head[e.ins_h] = e.strstart)),
          (e.prev_length = e.match_length),
          (e.prev_match = e.match_start),
          (e.match_length = 2),
          0 !== n &&
            e.prev_length < e.max_lazy_match &&
            e.strstart - n <= e.w_size - _y &&
            ((e.match_length = Ay(e, n)),
            e.match_length <= 5 &&
              (e.strategy === py ||
                (3 === e.match_length && e.strstart - e.match_start > 4096)) &&
              (e.match_length = 2)),
          e.prev_length >= 3 && e.match_length <= e.prev_length)
        ) {
          (a = e.strstart + e.lookahead - 3),
            (r = ey(e, e.strstart - 1 - e.prev_match, e.prev_length - 3)),
            (e.lookahead -= e.prev_length - 1),
            (e.prev_length -= 2);
          do {
            ++e.strstart <= a &&
              ((e.ins_h = Ny(e, e.ins_h, e.window[e.strstart + 3 - 1])),
              (n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
              (e.head[e.ins_h] = e.strstart));
          } while (0 != --e.prev_length);
          if (
            ((e.match_available = 0),
            (e.match_length = 2),
            e.strstart++,
            r && (Ly(e, !1), 0 === e.strm.avail_out))
          )
            return 1;
        } else if (e.match_available) {
          if (
            ((r = ey(e, 0, e.window[e.strstart - 1])),
            r && Ly(e, !1),
            e.strstart++,
            e.lookahead--,
            0 === e.strm.avail_out)
          )
            return 1;
        } else (e.match_available = 1), e.strstart++, e.lookahead--;
      }
      return (
        e.match_available &&
          ((r = ey(e, 0, e.window[e.strstart - 1])), (e.match_available = 0)),
        (e.insert = e.strstart < 2 ? e.strstart : 2),
        t === oy
          ? (Ly(e, !0), 0 === e.strm.avail_out ? 3 : 4)
          : e.sym_next && (Ly(e, !1), 0 === e.strm.avail_out)
          ? 1
          : 2
      );
    };
  function Fy(e, t, n, r, a) {
    (this.good_length = e),
      (this.max_lazy = t),
      (this.nice_length = n),
      (this.max_chain = r),
      (this.func = a);
  }
  const Hy = [
    new Fy(0, 0, 0, 0, zy),
    new Fy(4, 4, 8, 4, My),
    new Fy(4, 5, 16, 8, My),
    new Fy(4, 6, 32, 32, My),
    new Fy(4, 4, 16, 16, Uy),
    new Fy(8, 16, 32, 32, Uy),
    new Fy(8, 16, 128, 128, Uy),
    new Fy(8, 32, 128, 256, Uy),
    new Fy(32, 128, 258, 1024, Uy),
    new Fy(32, 258, 258, 4096, Uy),
  ];
  function Vy() {
    (this.strm = null),
      (this.status = 0),
      (this.pending_buf = null),
      (this.pending_buf_size = 0),
      (this.pending_out = 0),
      (this.pending = 0),
      (this.wrap = 0),
      (this.gzhead = null),
      (this.gzindex = 0),
      (this.method = by),
      (this.last_flush = -1),
      (this.w_size = 0),
      (this.w_bits = 0),
      (this.w_mask = 0),
      (this.window = null),
      (this.window_size = 0),
      (this.prev = null),
      (this.head = null),
      (this.ins_h = 0),
      (this.hash_size = 0),
      (this.hash_bits = 0),
      (this.hash_mask = 0),
      (this.hash_shift = 0),
      (this.block_start = 0),
      (this.match_length = 0),
      (this.prev_match = 0),
      (this.match_available = 0),
      (this.strstart = 0),
      (this.match_start = 0),
      (this.lookahead = 0),
      (this.prev_length = 0),
      (this.max_chain_length = 0),
      (this.max_lazy_match = 0),
      (this.level = 0),
      (this.strategy = 0),
      (this.good_match = 0),
      (this.nice_match = 0),
      (this.dyn_ltree = new Uint16Array(1146)),
      (this.dyn_dtree = new Uint16Array(122)),
      (this.bl_tree = new Uint16Array(78)),
      Cy(this.dyn_ltree),
      Cy(this.dyn_dtree),
      Cy(this.bl_tree),
      (this.l_desc = null),
      (this.d_desc = null),
      (this.bl_desc = null),
      (this.bl_count = new Uint16Array(16)),
      (this.heap = new Uint16Array(573)),
      Cy(this.heap),
      (this.heap_len = 0),
      (this.heap_max = 0),
      (this.depth = new Uint16Array(573)),
      Cy(this.depth),
      (this.sym_buf = 0),
      (this.lit_bufsize = 0),
      (this.sym_next = 0),
      (this.sym_end = 0),
      (this.opt_len = 0),
      (this.static_len = 0),
      (this.matches = 0),
      (this.insert = 0),
      (this.bi_buf = 0),
      (this.bi_valid = 0);
  }
  const By = (e) => {
      if (!e) return 1;
      const t = e.state;
      return !t ||
        t.strm !== e ||
        (t.status !== Sy &&
          57 !== t.status &&
          69 !== t.status &&
          73 !== t.status &&
          91 !== t.status &&
          103 !== t.status &&
          t.status !== Ey &&
          t.status !== ky)
        ? 1
        : 0;
    },
    Wy = (e) => {
      if (By(e)) return Oy(e, uy);
      (e.total_in = e.total_out = 0), (e.data_type = yy);
      const t = e.state;
      return (
        (t.pending = 0),
        (t.pending_out = 0),
        t.wrap < 0 && (t.wrap = -t.wrap),
        (t.status = 2 === t.wrap ? 57 : t.wrap ? Sy : Ey),
        (e.adler = 2 === t.wrap ? 0 : 1),
        (t.last_flush = -2),
        Zv(t),
        sy
      );
    },
    Ky = (e) => {
      const t = Wy(e);
      var n;
      return (
        t === sy &&
          (((n = e.state).window_size = 2 * n.w_size),
          Cy(n.head),
          (n.max_lazy_match = Hy[n.level].max_lazy),
          (n.good_match = Hy[n.level].good_length),
          (n.nice_match = Hy[n.level].nice_length),
          (n.max_chain_length = Hy[n.level].max_chain),
          (n.strstart = 0),
          (n.block_start = 0),
          (n.lookahead = 0),
          (n.insert = 0),
          (n.match_length = n.prev_length = 2),
          (n.match_available = 0),
          (n.ins_h = 0)),
        t
      );
    },
    $y = (e, t, n, r, a, o) => {
      if (!e) return uy;
      let i = 1;
      if (
        (t === fy && (t = 6),
        r < 0 ? ((i = 0), (r = -r)) : r > 15 && ((i = 2), (r -= 16)),
        a < 1 ||
          a > 9 ||
          n !== by ||
          r < 8 ||
          r > 15 ||
          t < 0 ||
          t > 9 ||
          o < 0 ||
          o > my ||
          (8 === r && 1 !== i))
      )
        return Oy(e, uy);
      8 === r && (r = 9);
      const s = new Vy();
      return (
        (e.state = s),
        (s.strm = e),
        (s.status = Sy),
        (s.wrap = i),
        (s.gzhead = null),
        (s.w_bits = r),
        (s.w_size = 1 << s.w_bits),
        (s.w_mask = s.w_size - 1),
        (s.hash_bits = a + 7),
        (s.hash_size = 1 << s.hash_bits),
        (s.hash_mask = s.hash_size - 1),
        (s.hash_shift = ~~((s.hash_bits + 3 - 1) / 3)),
        (s.window = new Uint8Array(2 * s.w_size)),
        (s.head = new Uint16Array(s.hash_size)),
        (s.prev = new Uint16Array(s.w_size)),
        (s.lit_bufsize = 1 << (a + 6)),
        (s.pending_buf_size = 4 * s.lit_bufsize),
        (s.pending_buf = new Uint8Array(s.pending_buf_size)),
        (s.sym_buf = s.lit_bufsize),
        (s.sym_end = 3 * (s.lit_bufsize - 1)),
        (s.level = t),
        (s.strategy = o),
        (s.method = n),
        Ky(e)
      );
    };
  var Gy = {
    deflateInit: (e, t) => $y(e, t, by, 15, 8, vy),
    deflateInit2: $y,
    deflateReset: Ky,
    deflateResetKeep: Wy,
    deflateSetHeader: (e, t) =>
      By(e) || 2 !== e.state.wrap ? uy : ((e.state.gzhead = t), sy),
    deflate: (e, t) => {
      if (By(e) || t > iy || t < 0) return e ? Oy(e, uy) : uy;
      const n = e.state;
      if (
        !e.output ||
        (0 !== e.avail_in && !e.input) ||
        (n.status === ky && t !== oy)
      )
        return Oy(e, 0 === e.avail_out ? dy : uy);
      const r = n.last_flush;
      if (((n.last_flush = t), 0 !== n.pending)) {
        if ((Ry(e), 0 === e.avail_out)) return (n.last_flush = -1), sy;
      } else if (0 === e.avail_in && xy(t) <= xy(r) && t !== oy)
        return Oy(e, dy);
      if (n.status === ky && 0 !== e.avail_in) return Oy(e, dy);
      if (
        (n.status === Sy && 0 === n.wrap && (n.status = Ey), n.status === Sy)
      ) {
        let t = (by + ((n.w_bits - 8) << 4)) << 8,
          r = -1;
        if (
          ((r =
            n.strategy >= hy || n.level < 2
              ? 0
              : n.level < 6
              ? 1
              : 6 === n.level
              ? 2
              : 3),
          (t |= r << 6),
          0 !== n.strstart && (t |= 32),
          (t += 31 - (t % 31)),
          jy(n, t),
          0 !== n.strstart && (jy(n, e.adler >>> 16), jy(n, 65535 & e.adler)),
          (e.adler = 1),
          (n.status = Ey),
          Ry(e),
          0 !== n.pending)
        )
          return (n.last_flush = -1), sy;
      }
      if (57 === n.status)
        if (((e.adler = 0), Py(n, 31), Py(n, 139), Py(n, 8), n.gzhead))
          Py(
            n,
            (n.gzhead.text ? 1 : 0) +
              (n.gzhead.hcrc ? 2 : 0) +
              (n.gzhead.extra ? 4 : 0) +
              (n.gzhead.name ? 8 : 0) +
              (n.gzhead.comment ? 16 : 0)
          ),
            Py(n, 255 & n.gzhead.time),
            Py(n, (n.gzhead.time >> 8) & 255),
            Py(n, (n.gzhead.time >> 16) & 255),
            Py(n, (n.gzhead.time >> 24) & 255),
            Py(n, 9 === n.level ? 2 : n.strategy >= hy || n.level < 2 ? 4 : 0),
            Py(n, 255 & n.gzhead.os),
            n.gzhead.extra &&
              n.gzhead.extra.length &&
              (Py(n, 255 & n.gzhead.extra.length),
              Py(n, (n.gzhead.extra.length >> 8) & 255)),
            n.gzhead.hcrc &&
              (e.adler = qv(e.adler, n.pending_buf, n.pending, 0)),
            (n.gzindex = 0),
            (n.status = 69);
        else if (
          (Py(n, 0),
          Py(n, 0),
          Py(n, 0),
          Py(n, 0),
          Py(n, 0),
          Py(n, 9 === n.level ? 2 : n.strategy >= hy || n.level < 2 ? 4 : 0),
          Py(n, 3),
          (n.status = Ey),
          Ry(e),
          0 !== n.pending)
        )
          return (n.last_flush = -1), sy;
      if (69 === n.status) {
        if (n.gzhead.extra) {
          let t = n.pending,
            r = (65535 & n.gzhead.extra.length) - n.gzindex;
          for (; n.pending + r > n.pending_buf_size; ) {
            let a = n.pending_buf_size - n.pending;
            if (
              (n.pending_buf.set(
                n.gzhead.extra.subarray(n.gzindex, n.gzindex + a),
                n.pending
              ),
              (n.pending = n.pending_buf_size),
              n.gzhead.hcrc &&
                n.pending > t &&
                (e.adler = qv(e.adler, n.pending_buf, n.pending - t, t)),
              (n.gzindex += a),
              Ry(e),
              0 !== n.pending)
            )
              return (n.last_flush = -1), sy;
            (t = 0), (r -= a);
          }
          let a = new Uint8Array(n.gzhead.extra);
          n.pending_buf.set(a.subarray(n.gzindex, n.gzindex + r), n.pending),
            (n.pending += r),
            n.gzhead.hcrc &&
              n.pending > t &&
              (e.adler = qv(e.adler, n.pending_buf, n.pending - t, t)),
            (n.gzindex = 0);
        }
        n.status = 73;
      }
      if (73 === n.status) {
        if (n.gzhead.name) {
          let t,
            r = n.pending;
          do {
            if (n.pending === n.pending_buf_size) {
              if (
                (n.gzhead.hcrc &&
                  n.pending > r &&
                  (e.adler = qv(e.adler, n.pending_buf, n.pending - r, r)),
                Ry(e),
                0 !== n.pending)
              )
                return (n.last_flush = -1), sy;
              r = 0;
            }
            (t =
              n.gzindex < n.gzhead.name.length
                ? 255 & n.gzhead.name.charCodeAt(n.gzindex++)
                : 0),
              Py(n, t);
          } while (0 !== t);
          n.gzhead.hcrc &&
            n.pending > r &&
            (e.adler = qv(e.adler, n.pending_buf, n.pending - r, r)),
            (n.gzindex = 0);
        }
        n.status = 91;
      }
      if (91 === n.status) {
        if (n.gzhead.comment) {
          let t,
            r = n.pending;
          do {
            if (n.pending === n.pending_buf_size) {
              if (
                (n.gzhead.hcrc &&
                  n.pending > r &&
                  (e.adler = qv(e.adler, n.pending_buf, n.pending - r, r)),
                Ry(e),
                0 !== n.pending)
              )
                return (n.last_flush = -1), sy;
              r = 0;
            }
            (t =
              n.gzindex < n.gzhead.comment.length
                ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++)
                : 0),
              Py(n, t);
          } while (0 !== t);
          n.gzhead.hcrc &&
            n.pending > r &&
            (e.adler = qv(e.adler, n.pending_buf, n.pending - r, r));
        }
        n.status = 103;
      }
      if (103 === n.status) {
        if (n.gzhead.hcrc) {
          if (n.pending + 2 > n.pending_buf_size && (Ry(e), 0 !== n.pending))
            return (n.last_flush = -1), sy;
          Py(n, 255 & e.adler), Py(n, (e.adler >> 8) & 255), (e.adler = 0);
        }
        if (((n.status = Ey), Ry(e), 0 !== n.pending))
          return (n.last_flush = -1), sy;
      }
      if (
        0 !== e.avail_in ||
        0 !== n.lookahead ||
        (t !== ny && n.status !== ky)
      ) {
        let r =
          0 === n.level
            ? zy(n, t)
            : n.strategy === hy
            ? ((e, t) => {
                let n;
                for (;;) {
                  if (0 === e.lookahead && (Dy(e), 0 === e.lookahead)) {
                    if (t === ny) return 1;
                    break;
                  }
                  if (
                    ((e.match_length = 0),
                    (n = ey(e, 0, e.window[e.strstart])),
                    e.lookahead--,
                    e.strstart++,
                    n && (Ly(e, !1), 0 === e.strm.avail_out))
                  )
                    return 1;
                }
                return (
                  (e.insert = 0),
                  t === oy
                    ? (Ly(e, !0), 0 === e.strm.avail_out ? 3 : 4)
                    : e.sym_next && (Ly(e, !1), 0 === e.strm.avail_out)
                    ? 1
                    : 2
                );
              })(n, t)
            : n.strategy === gy
            ? ((e, t) => {
                let n, r, a, o;
                const i = e.window;
                for (;;) {
                  if (e.lookahead <= wy) {
                    if ((Dy(e), e.lookahead <= wy && t === ny)) return 1;
                    if (0 === e.lookahead) break;
                  }
                  if (
                    ((e.match_length = 0),
                    e.lookahead >= 3 &&
                      e.strstart > 0 &&
                      ((a = e.strstart - 1),
                      (r = i[a]),
                      r === i[++a] && r === i[++a] && r === i[++a]))
                  ) {
                    o = e.strstart + wy;
                    do {} while (
                      r === i[++a] &&
                      r === i[++a] &&
                      r === i[++a] &&
                      r === i[++a] &&
                      r === i[++a] &&
                      r === i[++a] &&
                      r === i[++a] &&
                      r === i[++a] &&
                      a < o
                    );
                    (e.match_length = wy - (o - a)),
                      e.match_length > e.lookahead &&
                        (e.match_length = e.lookahead);
                  }
                  if (
                    (e.match_length >= 3
                      ? ((n = ey(e, 1, e.match_length - 3)),
                        (e.lookahead -= e.match_length),
                        (e.strstart += e.match_length),
                        (e.match_length = 0))
                      : ((n = ey(e, 0, e.window[e.strstart])),
                        e.lookahead--,
                        e.strstart++),
                    n && (Ly(e, !1), 0 === e.strm.avail_out))
                  )
                    return 1;
                }
                return (
                  (e.insert = 0),
                  t === oy
                    ? (Ly(e, !0), 0 === e.strm.avail_out ? 3 : 4)
                    : e.sym_next && (Ly(e, !1), 0 === e.strm.avail_out)
                    ? 1
                    : 2
                );
              })(n, t)
            : Hy[n.level].func(n, t);
        if (((3 !== r && 4 !== r) || (n.status = ky), 1 === r || 3 === r))
          return 0 === e.avail_out && (n.last_flush = -1), sy;
        if (
          2 === r &&
          (t === ry
            ? ty(n)
            : t !== iy &&
              (Yv(n, 0, 0, !1),
              t === ay &&
                (Cy(n.head),
                0 === n.lookahead &&
                  ((n.strstart = 0), (n.block_start = 0), (n.insert = 0)))),
          Ry(e),
          0 === e.avail_out)
        )
          return (n.last_flush = -1), sy;
      }
      return t !== oy
        ? sy
        : n.wrap <= 0
        ? ly
        : (2 === n.wrap
            ? (Py(n, 255 & e.adler),
              Py(n, (e.adler >> 8) & 255),
              Py(n, (e.adler >> 16) & 255),
              Py(n, (e.adler >> 24) & 255),
              Py(n, 255 & e.total_in),
              Py(n, (e.total_in >> 8) & 255),
              Py(n, (e.total_in >> 16) & 255),
              Py(n, (e.total_in >> 24) & 255))
            : (jy(n, e.adler >>> 16), jy(n, 65535 & e.adler)),
          Ry(e),
          n.wrap > 0 && (n.wrap = -n.wrap),
          0 !== n.pending ? sy : ly);
    },
    deflateEnd: (e) => {
      if (By(e)) return uy;
      const t = e.state.status;
      return (e.state = null), t === Ey ? Oy(e, cy) : sy;
    },
    deflateSetDictionary: (e, t) => {
      let n = t.length;
      if (By(e)) return uy;
      const r = e.state,
        a = r.wrap;
      if (2 === a || (1 === a && r.status !== Sy) || r.lookahead) return uy;
      if (
        (1 === a && (e.adler = $v(e.adler, t, n, 0)),
        (r.wrap = 0),
        n >= r.w_size)
      ) {
        0 === a &&
          (Cy(r.head), (r.strstart = 0), (r.block_start = 0), (r.insert = 0));
        let e = new Uint8Array(r.w_size);
        e.set(t.subarray(n - r.w_size, n), 0), (t = e), (n = r.w_size);
      }
      const o = e.avail_in,
        i = e.next_in,
        s = e.input;
      for (
        e.avail_in = n, e.next_in = 0, e.input = t, Dy(r);
        r.lookahead >= 3;

      ) {
        let e = r.strstart,
          t = r.lookahead - 2;
        do {
          (r.ins_h = Ny(r, r.ins_h, r.window[e + 3 - 1])),
            (r.prev[e & r.w_mask] = r.head[r.ins_h]),
            (r.head[r.ins_h] = e),
            e++;
        } while (--t);
        (r.strstart = e), (r.lookahead = 2), Dy(r);
      }
      return (
        (r.strstart += r.lookahead),
        (r.block_start = r.strstart),
        (r.insert = r.lookahead),
        (r.lookahead = 0),
        (r.match_length = r.prev_length = 2),
        (r.match_available = 0),
        (e.next_in = i),
        (e.input = s),
        (e.avail_in = o),
        (r.wrap = a),
        sy
      );
    },
    deflateInfo: "pako deflate (from Nodeca project)",
  };
  const qy = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
  var Xy = function (e) {
      const t = Array.prototype.slice.call(arguments, 1);
      for (; t.length; ) {
        const n = t.shift();
        if (n) {
          if ("object" != typeof n)
            throw new TypeError(n + "must be non-object");
          for (const t in n) qy(n, t) && (e[t] = n[t]);
        }
      }
      return e;
    },
    Jy = (e) => {
      let t = 0;
      for (let r = 0, a = e.length; r < a; r++) t += e[r].length;
      const n = new Uint8Array(t);
      for (let r = 0, a = 0, o = e.length; r < o; r++) {
        let t = e[r];
        n.set(t, a), (a += t.length);
      }
      return n;
    };
  let Zy = !0;
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (mE) {
    Zy = !1;
  }
  const Yy = new Uint8Array(256);
  for (let vE = 0; vE < 256; vE++)
    Yy[vE] =
      vE >= 252
        ? 6
        : vE >= 248
        ? 5
        : vE >= 240
        ? 4
        : vE >= 224
        ? 3
        : vE >= 192
        ? 2
        : 1;
  Yy[254] = Yy[254] = 1;
  var Qy = (e) => {
      if ("function" == typeof TextEncoder && TextEncoder.prototype.encode)
        return new TextEncoder().encode(e);
      let t,
        n,
        r,
        a,
        o,
        i = e.length,
        s = 0;
      for (a = 0; a < i; a++)
        (n = e.charCodeAt(a)),
          55296 == (64512 & n) &&
            a + 1 < i &&
            ((r = e.charCodeAt(a + 1)),
            56320 == (64512 & r) &&
              ((n = 65536 + ((n - 55296) << 10) + (r - 56320)), a++)),
          (s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4);
      for (t = new Uint8Array(s), o = 0, a = 0; o < s; a++)
        (n = e.charCodeAt(a)),
          55296 == (64512 & n) &&
            a + 1 < i &&
            ((r = e.charCodeAt(a + 1)),
            56320 == (64512 & r) &&
              ((n = 65536 + ((n - 55296) << 10) + (r - 56320)), a++)),
          n < 128
            ? (t[o++] = n)
            : n < 2048
            ? ((t[o++] = 192 | (n >>> 6)), (t[o++] = 128 | (63 & n)))
            : n < 65536
            ? ((t[o++] = 224 | (n >>> 12)),
              (t[o++] = 128 | ((n >>> 6) & 63)),
              (t[o++] = 128 | (63 & n)))
            : ((t[o++] = 240 | (n >>> 18)),
              (t[o++] = 128 | ((n >>> 12) & 63)),
              (t[o++] = 128 | ((n >>> 6) & 63)),
              (t[o++] = 128 | (63 & n)));
      return t;
    },
    eb = (e, t) => {
      const n = t || e.length;
      if ("function" == typeof TextDecoder && TextDecoder.prototype.decode)
        return new TextDecoder().decode(e.subarray(0, t));
      let r, a;
      const o = new Array(2 * n);
      for (a = 0, r = 0; r < n; ) {
        let t = e[r++];
        if (t < 128) {
          o[a++] = t;
          continue;
        }
        let i = Yy[t];
        if (i > 4) (o[a++] = 65533), (r += i - 1);
        else {
          for (t &= 2 === i ? 31 : 3 === i ? 15 : 7; i > 1 && r < n; )
            (t = (t << 6) | (63 & e[r++])), i--;
          i > 1
            ? (o[a++] = 65533)
            : t < 65536
            ? (o[a++] = t)
            : ((t -= 65536),
              (o[a++] = 55296 | ((t >> 10) & 1023)),
              (o[a++] = 56320 | (1023 & t)));
        }
      }
      return ((e, t) => {
        if (t < 65534 && e.subarray && Zy)
          return String.fromCharCode.apply(
            null,
            e.length === t ? e : e.subarray(0, t)
          );
        let n = "";
        for (let r = 0; r < t; r++) n += String.fromCharCode(e[r]);
        return n;
      })(o, a);
    },
    tb = (e, t) => {
      (t = t || e.length) > e.length && (t = e.length);
      let n = t - 1;
      for (; n >= 0 && 128 == (192 & e[n]); ) n--;
      return n < 0 || 0 === n ? t : n + Yy[e[n]] > t ? n : t;
    };
  var nb = function () {
    (this.input = null),
      (this.next_in = 0),
      (this.avail_in = 0),
      (this.total_in = 0),
      (this.output = null),
      (this.next_out = 0),
      (this.avail_out = 0),
      (this.total_out = 0),
      (this.msg = ""),
      (this.state = null),
      (this.data_type = 2),
      (this.adler = 0);
  };
  const rb = Object.prototype.toString,
    {
      Z_NO_FLUSH: ab,
      Z_SYNC_FLUSH: ob,
      Z_FULL_FLUSH: ib,
      Z_FINISH: sb,
      Z_OK: lb,
      Z_STREAM_END: ub,
      Z_DEFAULT_COMPRESSION: cb,
      Z_DEFAULT_STRATEGY: db,
      Z_DEFLATED: fb,
    } = Jv;
  function pb(e) {
    this.options = Xy(
      {
        level: cb,
        method: fb,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: db,
      },
      e || {}
    );
    let t = this.options;
    t.raw && t.windowBits > 0
      ? (t.windowBits = -t.windowBits)
      : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16),
      (this.err = 0),
      (this.msg = ""),
      (this.ended = !1),
      (this.chunks = []),
      (this.strm = new nb()),
      (this.strm.avail_out = 0);
    let n = Gy.deflateInit2(
      this.strm,
      t.level,
      t.method,
      t.windowBits,
      t.memLevel,
      t.strategy
    );
    if (n !== lb) throw new Error(Xv[n]);
    if ((t.header && Gy.deflateSetHeader(this.strm, t.header), t.dictionary)) {
      let e;
      if (
        ((e =
          "string" == typeof t.dictionary
            ? Qy(t.dictionary)
            : "[object ArrayBuffer]" === rb.call(t.dictionary)
            ? new Uint8Array(t.dictionary)
            : t.dictionary),
        (n = Gy.deflateSetDictionary(this.strm, e)),
        n !== lb)
      )
        throw new Error(Xv[n]);
      this._dict_set = !0;
    }
  }
  function hb(e, t) {
    const n = new pb(t);
    if ((n.push(e, !0), n.err)) throw n.msg || Xv[n.err];
    return n.result;
  }
  (pb.prototype.push = function (e, t) {
    const n = this.strm,
      r = this.options.chunkSize;
    let a, o;
    if (this.ended) return !1;
    for (
      o = t === ~~t ? t : !0 === t ? sb : ab,
        "string" == typeof e
          ? (n.input = Qy(e))
          : "[object ArrayBuffer]" === rb.call(e)
          ? (n.input = new Uint8Array(e))
          : (n.input = e),
        n.next_in = 0,
        n.avail_in = n.input.length;
      ;

    )
      if (
        (0 === n.avail_out &&
          ((n.output = new Uint8Array(r)), (n.next_out = 0), (n.avail_out = r)),
        (o === ob || o === ib) && n.avail_out <= 6)
      )
        this.onData(n.output.subarray(0, n.next_out)), (n.avail_out = 0);
      else {
        if (((a = Gy.deflate(n, o)), a === ub))
          return (
            n.next_out > 0 && this.onData(n.output.subarray(0, n.next_out)),
            (a = Gy.deflateEnd(this.strm)),
            this.onEnd(a),
            (this.ended = !0),
            a === lb
          );
        if (0 !== n.avail_out) {
          if (o > 0 && n.next_out > 0)
            this.onData(n.output.subarray(0, n.next_out)), (n.avail_out = 0);
          else if (0 === n.avail_in) break;
        } else this.onData(n.output);
      }
    return !0;
  }),
    (pb.prototype.onData = function (e) {
      this.chunks.push(e);
    }),
    (pb.prototype.onEnd = function (e) {
      e === lb && (this.result = Jy(this.chunks)),
        (this.chunks = []),
        (this.err = e),
        (this.msg = this.strm.msg);
    });
  var gb = {
    Deflate: pb,
    deflate: hb,
    deflateRaw: function (e, t) {
      return ((t = t || {}).raw = !0), hb(e, t);
    },
    gzip: function (e, t) {
      return ((t = t || {}).gzip = !0), hb(e, t);
    },
    constants: Jv,
  };
  const mb = 16209;
  var vb = function (e, t) {
    let n, r, a, o, i, s, l, u, c, d, f, p, h, g, m, v, y, b, w, _, S, E, k, O;
    const x = e.state;
    (n = e.next_in),
      (k = e.input),
      (r = n + (e.avail_in - 5)),
      (a = e.next_out),
      (O = e.output),
      (o = a - (t - e.avail_out)),
      (i = a + (e.avail_out - 257)),
      (s = x.dmax),
      (l = x.wsize),
      (u = x.whave),
      (c = x.wnext),
      (d = x.window),
      (f = x.hold),
      (p = x.bits),
      (h = x.lencode),
      (g = x.distcode),
      (m = (1 << x.lenbits) - 1),
      (v = (1 << x.distbits) - 1);
    e: do {
      p < 15 && ((f += k[n++] << p), (p += 8), (f += k[n++] << p), (p += 8)),
        (y = h[f & m]);
      t: for (;;) {
        if (
          ((b = y >>> 24),
          (f >>>= b),
          (p -= b),
          (b = (y >>> 16) & 255),
          0 === b)
        )
          O[a++] = 65535 & y;
        else {
          if (!(16 & b)) {
            if (0 == (64 & b)) {
              y = h[(65535 & y) + (f & ((1 << b) - 1))];
              continue t;
            }
            if (32 & b) {
              x.mode = 16191;
              break e;
            }
            (e.msg = "invalid literal/length code"), (x.mode = mb);
            break e;
          }
          (w = 65535 & y),
            (b &= 15),
            b &&
              (p < b && ((f += k[n++] << p), (p += 8)),
              (w += f & ((1 << b) - 1)),
              (f >>>= b),
              (p -= b)),
            p < 15 &&
              ((f += k[n++] << p), (p += 8), (f += k[n++] << p), (p += 8)),
            (y = g[f & v]);
          n: for (;;) {
            if (
              ((b = y >>> 24),
              (f >>>= b),
              (p -= b),
              (b = (y >>> 16) & 255),
              !(16 & b))
            ) {
              if (0 == (64 & b)) {
                y = g[(65535 & y) + (f & ((1 << b) - 1))];
                continue n;
              }
              (e.msg = "invalid distance code"), (x.mode = mb);
              break e;
            }
            if (
              ((_ = 65535 & y),
              (b &= 15),
              p < b &&
                ((f += k[n++] << p),
                (p += 8),
                p < b && ((f += k[n++] << p), (p += 8))),
              (_ += f & ((1 << b) - 1)),
              _ > s)
            ) {
              (e.msg = "invalid distance too far back"), (x.mode = mb);
              break e;
            }
            if (((f >>>= b), (p -= b), (b = a - o), _ > b)) {
              if (((b = _ - b), b > u && x.sane)) {
                (e.msg = "invalid distance too far back"), (x.mode = mb);
                break e;
              }
              if (((S = 0), (E = d), 0 === c)) {
                if (((S += l - b), b < w)) {
                  w -= b;
                  do {
                    O[a++] = d[S++];
                  } while (--b);
                  (S = a - _), (E = O);
                }
              } else if (c < b) {
                if (((S += l + c - b), (b -= c), b < w)) {
                  w -= b;
                  do {
                    O[a++] = d[S++];
                  } while (--b);
                  if (((S = 0), c < w)) {
                    (b = c), (w -= b);
                    do {
                      O[a++] = d[S++];
                    } while (--b);
                    (S = a - _), (E = O);
                  }
                }
              } else if (((S += c - b), b < w)) {
                w -= b;
                do {
                  O[a++] = d[S++];
                } while (--b);
                (S = a - _), (E = O);
              }
              for (; w > 2; )
                (O[a++] = E[S++]),
                  (O[a++] = E[S++]),
                  (O[a++] = E[S++]),
                  (w -= 3);
              w && ((O[a++] = E[S++]), w > 1 && (O[a++] = E[S++]));
            } else {
              S = a - _;
              do {
                (O[a++] = O[S++]),
                  (O[a++] = O[S++]),
                  (O[a++] = O[S++]),
                  (w -= 3);
              } while (w > 2);
              w && ((O[a++] = O[S++]), w > 1 && (O[a++] = O[S++]));
            }
            break;
          }
        }
        break;
      }
    } while (n < r && a < i);
    (w = p >> 3),
      (n -= w),
      (p -= w << 3),
      (f &= (1 << p) - 1),
      (e.next_in = n),
      (e.next_out = a),
      (e.avail_in = n < r ? r - n + 5 : 5 - (n - r)),
      (e.avail_out = a < i ? i - a + 257 : 257 - (a - i)),
      (x.hold = f),
      (x.bits = p);
  };
  const yb = 15,
    bb = new Uint16Array([
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
      67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
    ]),
    wb = new Uint8Array([
      16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19,
      19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
    ]),
    _b = new Uint16Array([
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513,
      769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0,
    ]),
    Sb = new Uint8Array([
      16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23,
      24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
    ]);
  var Eb = (e, t, n, r, a, o, i, s) => {
    const l = s.bits;
    let u,
      c,
      d,
      f,
      p,
      h,
      g = 0,
      m = 0,
      v = 0,
      y = 0,
      b = 0,
      w = 0,
      _ = 0,
      S = 0,
      E = 0,
      k = 0,
      O = null;
    const x = new Uint16Array(16),
      C = new Uint16Array(16);
    let T,
      N,
      R,
      L = null;
    for (g = 0; g <= yb; g++) x[g] = 0;
    for (m = 0; m < r; m++) x[t[n + m]]++;
    for (b = l, y = yb; y >= 1 && 0 === x[y]; y--);
    if ((b > y && (b = y), 0 === y))
      return (a[o++] = 20971520), (a[o++] = 20971520), (s.bits = 1), 0;
    for (v = 1; v < y && 0 === x[v]; v++);
    for (b < v && (b = v), S = 1, g = 1; g <= yb; g++)
      if (((S <<= 1), (S -= x[g]), S < 0)) return -1;
    if (S > 0 && (0 === e || 1 !== y)) return -1;
    for (C[1] = 0, g = 1; g < yb; g++) C[g + 1] = C[g] + x[g];
    for (m = 0; m < r; m++) 0 !== t[n + m] && (i[C[t[n + m]]++] = m);
    if (
      (0 === e
        ? ((O = L = i), (h = 20))
        : 1 === e
        ? ((O = bb), (L = wb), (h = 257))
        : ((O = _b), (L = Sb), (h = 0)),
      (k = 0),
      (m = 0),
      (g = v),
      (p = o),
      (w = b),
      (_ = 0),
      (d = -1),
      (E = 1 << b),
      (f = E - 1),
      (1 === e && E > 852) || (2 === e && E > 592))
    )
      return 1;
    for (;;) {
      (T = g - _),
        i[m] + 1 < h
          ? ((N = 0), (R = i[m]))
          : i[m] >= h
          ? ((N = L[i[m] - h]), (R = O[i[m] - h]))
          : ((N = 96), (R = 0)),
        (u = 1 << (g - _)),
        (c = 1 << w),
        (v = c);
      do {
        (c -= u), (a[p + (k >> _) + c] = (T << 24) | (N << 16) | R | 0);
      } while (0 !== c);
      for (u = 1 << (g - 1); k & u; ) u >>= 1;
      if ((0 !== u ? ((k &= u - 1), (k += u)) : (k = 0), m++, 0 == --x[g])) {
        if (g === y) break;
        g = t[n + i[m]];
      }
      if (g > b && (k & f) !== d) {
        for (
          0 === _ && (_ = b), p += v, w = g - _, S = 1 << w;
          w + _ < y && ((S -= x[w + _]), !(S <= 0));

        )
          w++, (S <<= 1);
        if (((E += 1 << w), (1 === e && E > 852) || (2 === e && E > 592)))
          return 1;
        (d = k & f), (a[d] = (b << 24) | (w << 16) | (p - o) | 0);
      }
    }
    return (
      0 !== k && (a[p + k] = ((g - _) << 24) | (64 << 16) | 0), (s.bits = b), 0
    );
  };
  const {
      Z_FINISH: kb,
      Z_BLOCK: Ob,
      Z_TREES: xb,
      Z_OK: Cb,
      Z_STREAM_END: Tb,
      Z_NEED_DICT: Nb,
      Z_STREAM_ERROR: Rb,
      Z_DATA_ERROR: Lb,
      Z_MEM_ERROR: Pb,
      Z_BUF_ERROR: jb,
      Z_DEFLATED: Ib,
    } = Jv,
    Ab = 16180,
    Db = 16190,
    zb = 16191,
    Mb = 16192,
    Ub = 16194,
    Fb = 16199,
    Hb = 16200,
    Vb = 16206,
    Bb = 16209,
    Wb = (e) =>
      ((e >>> 24) & 255) +
      ((e >>> 8) & 65280) +
      ((65280 & e) << 8) +
      ((255 & e) << 24);
  function Kb() {
    (this.strm = null),
      (this.mode = 0),
      (this.last = !1),
      (this.wrap = 0),
      (this.havedict = !1),
      (this.flags = 0),
      (this.dmax = 0),
      (this.check = 0),
      (this.total = 0),
      (this.head = null),
      (this.wbits = 0),
      (this.wsize = 0),
      (this.whave = 0),
      (this.wnext = 0),
      (this.window = null),
      (this.hold = 0),
      (this.bits = 0),
      (this.length = 0),
      (this.offset = 0),
      (this.extra = 0),
      (this.lencode = null),
      (this.distcode = null),
      (this.lenbits = 0),
      (this.distbits = 0),
      (this.ncode = 0),
      (this.nlen = 0),
      (this.ndist = 0),
      (this.have = 0),
      (this.next = null),
      (this.lens = new Uint16Array(320)),
      (this.work = new Uint16Array(288)),
      (this.lendyn = null),
      (this.distdyn = null),
      (this.sane = 0),
      (this.back = 0),
      (this.was = 0);
  }
  const $b = (e) => {
      if (!e) return 1;
      const t = e.state;
      return !t || t.strm !== e || t.mode < Ab || t.mode > 16211 ? 1 : 0;
    },
    Gb = (e) => {
      if ($b(e)) return Rb;
      const t = e.state;
      return (
        (e.total_in = e.total_out = t.total = 0),
        (e.msg = ""),
        t.wrap && (e.adler = 1 & t.wrap),
        (t.mode = Ab),
        (t.last = 0),
        (t.havedict = 0),
        (t.flags = -1),
        (t.dmax = 32768),
        (t.head = null),
        (t.hold = 0),
        (t.bits = 0),
        (t.lencode = t.lendyn = new Int32Array(852)),
        (t.distcode = t.distdyn = new Int32Array(592)),
        (t.sane = 1),
        (t.back = -1),
        Cb
      );
    },
    qb = (e) => {
      if ($b(e)) return Rb;
      const t = e.state;
      return (t.wsize = 0), (t.whave = 0), (t.wnext = 0), Gb(e);
    },
    Xb = (e, t) => {
      let n;
      if ($b(e)) return Rb;
      const r = e.state;
      return (
        t < 0 ? ((n = 0), (t = -t)) : ((n = 5 + (t >> 4)), t < 48 && (t &= 15)),
        t && (t < 8 || t > 15)
          ? Rb
          : (null !== r.window && r.wbits !== t && (r.window = null),
            (r.wrap = n),
            (r.wbits = t),
            qb(e))
      );
    },
    Jb = (e, t) => {
      if (!e) return Rb;
      const n = new Kb();
      (e.state = n), (n.strm = e), (n.window = null), (n.mode = Ab);
      const r = Xb(e, t);
      return r !== Cb && (e.state = null), r;
    };
  let Zb,
    Yb,
    Qb = !0;
  const ew = (e) => {
      if (Qb) {
        (Zb = new Int32Array(512)), (Yb = new Int32Array(32));
        let t = 0;
        for (; t < 144; ) e.lens[t++] = 8;
        for (; t < 256; ) e.lens[t++] = 9;
        for (; t < 280; ) e.lens[t++] = 7;
        for (; t < 288; ) e.lens[t++] = 8;
        for (Eb(1, e.lens, 0, 288, Zb, 0, e.work, { bits: 9 }), t = 0; t < 32; )
          e.lens[t++] = 5;
        Eb(2, e.lens, 0, 32, Yb, 0, e.work, { bits: 5 }), (Qb = !1);
      }
      (e.lencode = Zb), (e.lenbits = 9), (e.distcode = Yb), (e.distbits = 5);
    },
    tw = (e, t, n, r) => {
      let a;
      const o = e.state;
      return (
        null === o.window &&
          ((o.wsize = 1 << o.wbits),
          (o.wnext = 0),
          (o.whave = 0),
          (o.window = new Uint8Array(o.wsize))),
        r >= o.wsize
          ? (o.window.set(t.subarray(n - o.wsize, n), 0),
            (o.wnext = 0),
            (o.whave = o.wsize))
          : ((a = o.wsize - o.wnext),
            a > r && (a = r),
            o.window.set(t.subarray(n - r, n - r + a), o.wnext),
            (r -= a)
              ? (o.window.set(t.subarray(n - r, n), 0),
                (o.wnext = r),
                (o.whave = o.wsize))
              : ((o.wnext += a),
                o.wnext === o.wsize && (o.wnext = 0),
                o.whave < o.wsize && (o.whave += a))),
        0
      );
    };
  var nw = {
    inflateReset: qb,
    inflateReset2: Xb,
    inflateResetKeep: Gb,
    inflateInit: (e) => Jb(e, 15),
    inflateInit2: Jb,
    inflate: (e, t) => {
      let n,
        r,
        a,
        o,
        i,
        s,
        l,
        u,
        c,
        d,
        f,
        p,
        h,
        g,
        m,
        v,
        y,
        b,
        w,
        _,
        S,
        E,
        k = 0;
      const O = new Uint8Array(4);
      let x, C;
      const T = new Uint8Array([
        16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
      ]);
      if ($b(e) || !e.output || (!e.input && 0 !== e.avail_in)) return Rb;
      (n = e.state),
        n.mode === zb && (n.mode = Mb),
        (i = e.next_out),
        (a = e.output),
        (l = e.avail_out),
        (o = e.next_in),
        (r = e.input),
        (s = e.avail_in),
        (u = n.hold),
        (c = n.bits),
        (d = s),
        (f = l),
        (E = Cb);
      e: for (;;)
        switch (n.mode) {
          case Ab:
            if (0 === n.wrap) {
              n.mode = Mb;
              break;
            }
            for (; c < 16; ) {
              if (0 === s) break e;
              s--, (u += r[o++] << c), (c += 8);
            }
            if (2 & n.wrap && 35615 === u) {
              0 === n.wbits && (n.wbits = 15),
                (n.check = 0),
                (O[0] = 255 & u),
                (O[1] = (u >>> 8) & 255),
                (n.check = qv(n.check, O, 2, 0)),
                (u = 0),
                (c = 0),
                (n.mode = 16181);
              break;
            }
            if (
              (n.head && (n.head.done = !1),
              !(1 & n.wrap) || (((255 & u) << 8) + (u >> 8)) % 31)
            ) {
              (e.msg = "incorrect header check"), (n.mode = Bb);
              break;
            }
            if ((15 & u) !== Ib) {
              (e.msg = "unknown compression method"), (n.mode = Bb);
              break;
            }
            if (
              ((u >>>= 4),
              (c -= 4),
              (S = 8 + (15 & u)),
              0 === n.wbits && (n.wbits = S),
              S > 15 || S > n.wbits)
            ) {
              (e.msg = "invalid window size"), (n.mode = Bb);
              break;
            }
            (n.dmax = 1 << n.wbits),
              (n.flags = 0),
              (e.adler = n.check = 1),
              (n.mode = 512 & u ? 16189 : zb),
              (u = 0),
              (c = 0);
            break;
          case 16181:
            for (; c < 16; ) {
              if (0 === s) break e;
              s--, (u += r[o++] << c), (c += 8);
            }
            if (((n.flags = u), (255 & n.flags) !== Ib)) {
              (e.msg = "unknown compression method"), (n.mode = Bb);
              break;
            }
            if (57344 & n.flags) {
              (e.msg = "unknown header flags set"), (n.mode = Bb);
              break;
            }
            n.head && (n.head.text = (u >> 8) & 1),
              512 & n.flags &&
                4 & n.wrap &&
                ((O[0] = 255 & u),
                (O[1] = (u >>> 8) & 255),
                (n.check = qv(n.check, O, 2, 0))),
              (u = 0),
              (c = 0),
              (n.mode = 16182);
          case 16182:
            for (; c < 32; ) {
              if (0 === s) break e;
              s--, (u += r[o++] << c), (c += 8);
            }
            n.head && (n.head.time = u),
              512 & n.flags &&
                4 & n.wrap &&
                ((O[0] = 255 & u),
                (O[1] = (u >>> 8) & 255),
                (O[2] = (u >>> 16) & 255),
                (O[3] = (u >>> 24) & 255),
                (n.check = qv(n.check, O, 4, 0))),
              (u = 0),
              (c = 0),
              (n.mode = 16183);
          case 16183:
            for (; c < 16; ) {
              if (0 === s) break e;
              s--, (u += r[o++] << c), (c += 8);
            }
            n.head && ((n.head.xflags = 255 & u), (n.head.os = u >> 8)),
              512 & n.flags &&
                4 & n.wrap &&
                ((O[0] = 255 & u),
                (O[1] = (u >>> 8) & 255),
                (n.check = qv(n.check, O, 2, 0))),
              (u = 0),
              (c = 0),
              (n.mode = 16184);
          case 16184:
            if (1024 & n.flags) {
              for (; c < 16; ) {
                if (0 === s) break e;
                s--, (u += r[o++] << c), (c += 8);
              }
              (n.length = u),
                n.head && (n.head.extra_len = u),
                512 & n.flags &&
                  4 & n.wrap &&
                  ((O[0] = 255 & u),
                  (O[1] = (u >>> 8) & 255),
                  (n.check = qv(n.check, O, 2, 0))),
                (u = 0),
                (c = 0);
            } else n.head && (n.head.extra = null);
            n.mode = 16185;
          case 16185:
            if (
              1024 & n.flags &&
              ((p = n.length),
              p > s && (p = s),
              p &&
                (n.head &&
                  ((S = n.head.extra_len - n.length),
                  n.head.extra ||
                    (n.head.extra = new Uint8Array(n.head.extra_len)),
                  n.head.extra.set(r.subarray(o, o + p), S)),
                512 & n.flags && 4 & n.wrap && (n.check = qv(n.check, r, p, o)),
                (s -= p),
                (o += p),
                (n.length -= p)),
              n.length)
            )
              break e;
            (n.length = 0), (n.mode = 16186);
          case 16186:
            if (2048 & n.flags) {
              if (0 === s) break e;
              p = 0;
              do {
                (S = r[o + p++]),
                  n.head &&
                    S &&
                    n.length < 65536 &&
                    (n.head.name += String.fromCharCode(S));
              } while (S && p < s);
              if (
                (512 & n.flags &&
                  4 & n.wrap &&
                  (n.check = qv(n.check, r, p, o)),
                (s -= p),
                (o += p),
                S)
              )
                break e;
            } else n.head && (n.head.name = null);
            (n.length = 0), (n.mode = 16187);
          case 16187:
            if (4096 & n.flags) {
              if (0 === s) break e;
              p = 0;
              do {
                (S = r[o + p++]),
                  n.head &&
                    S &&
                    n.length < 65536 &&
                    (n.head.comment += String.fromCharCode(S));
              } while (S && p < s);
              if (
                (512 & n.flags &&
                  4 & n.wrap &&
                  (n.check = qv(n.check, r, p, o)),
                (s -= p),
                (o += p),
                S)
              )
                break e;
            } else n.head && (n.head.comment = null);
            n.mode = 16188;
          case 16188:
            if (512 & n.flags) {
              for (; c < 16; ) {
                if (0 === s) break e;
                s--, (u += r[o++] << c), (c += 8);
              }
              if (4 & n.wrap && u !== (65535 & n.check)) {
                (e.msg = "header crc mismatch"), (n.mode = Bb);
                break;
              }
              (u = 0), (c = 0);
            }
            n.head && ((n.head.hcrc = (n.flags >> 9) & 1), (n.head.done = !0)),
              (e.adler = n.check = 0),
              (n.mode = zb);
            break;
          case 16189:
            for (; c < 32; ) {
              if (0 === s) break e;
              s--, (u += r[o++] << c), (c += 8);
            }
            (e.adler = n.check = Wb(u)), (u = 0), (c = 0), (n.mode = Db);
          case Db:
            if (0 === n.havedict)
              return (
                (e.next_out = i),
                (e.avail_out = l),
                (e.next_in = o),
                (e.avail_in = s),
                (n.hold = u),
                (n.bits = c),
                Nb
              );
            (e.adler = n.check = 1), (n.mode = zb);
          case zb:
            if (t === Ob || t === xb) break e;
          case Mb:
            if (n.last) {
              (u >>>= 7 & c), (c -= 7 & c), (n.mode = Vb);
              break;
            }
            for (; c < 3; ) {
              if (0 === s) break e;
              s--, (u += r[o++] << c), (c += 8);
            }
            switch (((n.last = 1 & u), (u >>>= 1), (c -= 1), 3 & u)) {
              case 0:
                n.mode = 16193;
                break;
              case 1:
                if ((ew(n), (n.mode = Fb), t === xb)) {
                  (u >>>= 2), (c -= 2);
                  break e;
                }
                break;
              case 2:
                n.mode = 16196;
                break;
              case 3:
                (e.msg = "invalid block type"), (n.mode = Bb);
            }
            (u >>>= 2), (c -= 2);
            break;
          case 16193:
            for (u >>>= 7 & c, c -= 7 & c; c < 32; ) {
              if (0 === s) break e;
              s--, (u += r[o++] << c), (c += 8);
            }
            if ((65535 & u) != ((u >>> 16) ^ 65535)) {
              (e.msg = "invalid stored block lengths"), (n.mode = Bb);
              break;
            }
            if (
              ((n.length = 65535 & u),
              (u = 0),
              (c = 0),
              (n.mode = Ub),
              t === xb)
            )
              break e;
          case Ub:
            n.mode = 16195;
          case 16195:
            if (((p = n.length), p)) {
              if ((p > s && (p = s), p > l && (p = l), 0 === p)) break e;
              a.set(r.subarray(o, o + p), i),
                (s -= p),
                (o += p),
                (l -= p),
                (i += p),
                (n.length -= p);
              break;
            }
            n.mode = zb;
            break;
          case 16196:
            for (; c < 14; ) {
              if (0 === s) break e;
              s--, (u += r[o++] << c), (c += 8);
            }
            if (
              ((n.nlen = 257 + (31 & u)),
              (u >>>= 5),
              (c -= 5),
              (n.ndist = 1 + (31 & u)),
              (u >>>= 5),
              (c -= 5),
              (n.ncode = 4 + (15 & u)),
              (u >>>= 4),
              (c -= 4),
              n.nlen > 286 || n.ndist > 30)
            ) {
              (e.msg = "too many length or distance symbols"), (n.mode = Bb);
              break;
            }
            (n.have = 0), (n.mode = 16197);
          case 16197:
            for (; n.have < n.ncode; ) {
              for (; c < 3; ) {
                if (0 === s) break e;
                s--, (u += r[o++] << c), (c += 8);
              }
              (n.lens[T[n.have++]] = 7 & u), (u >>>= 3), (c -= 3);
            }
            for (; n.have < 19; ) n.lens[T[n.have++]] = 0;
            if (
              ((n.lencode = n.lendyn),
              (n.lenbits = 7),
              (x = { bits: n.lenbits }),
              (E = Eb(0, n.lens, 0, 19, n.lencode, 0, n.work, x)),
              (n.lenbits = x.bits),
              E)
            ) {
              (e.msg = "invalid code lengths set"), (n.mode = Bb);
              break;
            }
            (n.have = 0), (n.mode = 16198);
          case 16198:
            for (; n.have < n.nlen + n.ndist; ) {
              for (
                ;
                (k = n.lencode[u & ((1 << n.lenbits) - 1)]),
                  (m = k >>> 24),
                  (v = (k >>> 16) & 255),
                  (y = 65535 & k),
                  !(m <= c);

              ) {
                if (0 === s) break e;
                s--, (u += r[o++] << c), (c += 8);
              }
              if (y < 16) (u >>>= m), (c -= m), (n.lens[n.have++] = y);
              else {
                if (16 === y) {
                  for (C = m + 2; c < C; ) {
                    if (0 === s) break e;
                    s--, (u += r[o++] << c), (c += 8);
                  }
                  if (((u >>>= m), (c -= m), 0 === n.have)) {
                    (e.msg = "invalid bit length repeat"), (n.mode = Bb);
                    break;
                  }
                  (S = n.lens[n.have - 1]),
                    (p = 3 + (3 & u)),
                    (u >>>= 2),
                    (c -= 2);
                } else if (17 === y) {
                  for (C = m + 3; c < C; ) {
                    if (0 === s) break e;
                    s--, (u += r[o++] << c), (c += 8);
                  }
                  (u >>>= m),
                    (c -= m),
                    (S = 0),
                    (p = 3 + (7 & u)),
                    (u >>>= 3),
                    (c -= 3);
                } else {
                  for (C = m + 7; c < C; ) {
                    if (0 === s) break e;
                    s--, (u += r[o++] << c), (c += 8);
                  }
                  (u >>>= m),
                    (c -= m),
                    (S = 0),
                    (p = 11 + (127 & u)),
                    (u >>>= 7),
                    (c -= 7);
                }
                if (n.have + p > n.nlen + n.ndist) {
                  (e.msg = "invalid bit length repeat"), (n.mode = Bb);
                  break;
                }
                for (; p--; ) n.lens[n.have++] = S;
              }
            }
            if (n.mode === Bb) break;
            if (0 === n.lens[256]) {
              (e.msg = "invalid code -- missing end-of-block"), (n.mode = Bb);
              break;
            }
            if (
              ((n.lenbits = 9),
              (x = { bits: n.lenbits }),
              (E = Eb(1, n.lens, 0, n.nlen, n.lencode, 0, n.work, x)),
              (n.lenbits = x.bits),
              E)
            ) {
              (e.msg = "invalid literal/lengths set"), (n.mode = Bb);
              break;
            }
            if (
              ((n.distbits = 6),
              (n.distcode = n.distdyn),
              (x = { bits: n.distbits }),
              (E = Eb(2, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, x)),
              (n.distbits = x.bits),
              E)
            ) {
              (e.msg = "invalid distances set"), (n.mode = Bb);
              break;
            }
            if (((n.mode = Fb), t === xb)) break e;
          case Fb:
            n.mode = Hb;
          case Hb:
            if (s >= 6 && l >= 258) {
              (e.next_out = i),
                (e.avail_out = l),
                (e.next_in = o),
                (e.avail_in = s),
                (n.hold = u),
                (n.bits = c),
                vb(e, f),
                (i = e.next_out),
                (a = e.output),
                (l = e.avail_out),
                (o = e.next_in),
                (r = e.input),
                (s = e.avail_in),
                (u = n.hold),
                (c = n.bits),
                n.mode === zb && (n.back = -1);
              break;
            }
            for (
              n.back = 0;
              (k = n.lencode[u & ((1 << n.lenbits) - 1)]),
                (m = k >>> 24),
                (v = (k >>> 16) & 255),
                (y = 65535 & k),
                !(m <= c);

            ) {
              if (0 === s) break e;
              s--, (u += r[o++] << c), (c += 8);
            }
            if (v && 0 == (240 & v)) {
              for (
                b = m, w = v, _ = y;
                (k = n.lencode[_ + ((u & ((1 << (b + w)) - 1)) >> b)]),
                  (m = k >>> 24),
                  (v = (k >>> 16) & 255),
                  (y = 65535 & k),
                  !(b + m <= c);

              ) {
                if (0 === s) break e;
                s--, (u += r[o++] << c), (c += 8);
              }
              (u >>>= b), (c -= b), (n.back += b);
            }
            if (
              ((u >>>= m), (c -= m), (n.back += m), (n.length = y), 0 === v)
            ) {
              n.mode = 16205;
              break;
            }
            if (32 & v) {
              (n.back = -1), (n.mode = zb);
              break;
            }
            if (64 & v) {
              (e.msg = "invalid literal/length code"), (n.mode = Bb);
              break;
            }
            (n.extra = 15 & v), (n.mode = 16201);
          case 16201:
            if (n.extra) {
              for (C = n.extra; c < C; ) {
                if (0 === s) break e;
                s--, (u += r[o++] << c), (c += 8);
              }
              (n.length += u & ((1 << n.extra) - 1)),
                (u >>>= n.extra),
                (c -= n.extra),
                (n.back += n.extra);
            }
            (n.was = n.length), (n.mode = 16202);
          case 16202:
            for (
              ;
              (k = n.distcode[u & ((1 << n.distbits) - 1)]),
                (m = k >>> 24),
                (v = (k >>> 16) & 255),
                (y = 65535 & k),
                !(m <= c);

            ) {
              if (0 === s) break e;
              s--, (u += r[o++] << c), (c += 8);
            }
            if (0 == (240 & v)) {
              for (
                b = m, w = v, _ = y;
                (k = n.distcode[_ + ((u & ((1 << (b + w)) - 1)) >> b)]),
                  (m = k >>> 24),
                  (v = (k >>> 16) & 255),
                  (y = 65535 & k),
                  !(b + m <= c);

              ) {
                if (0 === s) break e;
                s--, (u += r[o++] << c), (c += 8);
              }
              (u >>>= b), (c -= b), (n.back += b);
            }
            if (((u >>>= m), (c -= m), (n.back += m), 64 & v)) {
              (e.msg = "invalid distance code"), (n.mode = Bb);
              break;
            }
            (n.offset = y), (n.extra = 15 & v), (n.mode = 16203);
          case 16203:
            if (n.extra) {
              for (C = n.extra; c < C; ) {
                if (0 === s) break e;
                s--, (u += r[o++] << c), (c += 8);
              }
              (n.offset += u & ((1 << n.extra) - 1)),
                (u >>>= n.extra),
                (c -= n.extra),
                (n.back += n.extra);
            }
            if (n.offset > n.dmax) {
              (e.msg = "invalid distance too far back"), (n.mode = Bb);
              break;
            }
            n.mode = 16204;
          case 16204:
            if (0 === l) break e;
            if (((p = f - l), n.offset > p)) {
              if (((p = n.offset - p), p > n.whave && n.sane)) {
                (e.msg = "invalid distance too far back"), (n.mode = Bb);
                break;
              }
              p > n.wnext
                ? ((p -= n.wnext), (h = n.wsize - p))
                : (h = n.wnext - p),
                p > n.length && (p = n.length),
                (g = n.window);
            } else (g = a), (h = i - n.offset), (p = n.length);
            p > l && (p = l), (l -= p), (n.length -= p);
            do {
              a[i++] = g[h++];
            } while (--p);
            0 === n.length && (n.mode = Hb);
            break;
          case 16205:
            if (0 === l) break e;
            (a[i++] = n.length), l--, (n.mode = Hb);
            break;
          case Vb:
            if (n.wrap) {
              for (; c < 32; ) {
                if (0 === s) break e;
                s--, (u |= r[o++] << c), (c += 8);
              }
              if (
                ((f -= l),
                (e.total_out += f),
                (n.total += f),
                4 & n.wrap &&
                  f &&
                  (e.adler = n.check =
                    n.flags
                      ? qv(n.check, a, f, i - f)
                      : $v(n.check, a, f, i - f)),
                (f = l),
                4 & n.wrap && (n.flags ? u : Wb(u)) !== n.check)
              ) {
                (e.msg = "incorrect data check"), (n.mode = Bb);
                break;
              }
              (u = 0), (c = 0);
            }
            n.mode = 16207;
          case 16207:
            if (n.wrap && n.flags) {
              for (; c < 32; ) {
                if (0 === s) break e;
                s--, (u += r[o++] << c), (c += 8);
              }
              if (4 & n.wrap && u !== (4294967295 & n.total)) {
                (e.msg = "incorrect length check"), (n.mode = Bb);
                break;
              }
              (u = 0), (c = 0);
            }
            n.mode = 16208;
          case 16208:
            E = Tb;
            break e;
          case Bb:
            E = Lb;
            break e;
          case 16210:
            return Pb;
          case 16211:
          default:
            return Rb;
        }
      return (
        (e.next_out = i),
        (e.avail_out = l),
        (e.next_in = o),
        (e.avail_in = s),
        (n.hold = u),
        (n.bits = c),
        (n.wsize ||
          (f !== e.avail_out && n.mode < Bb && (n.mode < Vb || t !== kb))) &&
          tw(e, e.output, e.next_out, f - e.avail_out),
        (d -= e.avail_in),
        (f -= e.avail_out),
        (e.total_in += d),
        (e.total_out += f),
        (n.total += f),
        4 & n.wrap &&
          f &&
          (e.adler = n.check =
            n.flags
              ? qv(n.check, a, f, e.next_out - f)
              : $v(n.check, a, f, e.next_out - f)),
        (e.data_type =
          n.bits +
          (n.last ? 64 : 0) +
          (n.mode === zb ? 128 : 0) +
          (n.mode === Fb || n.mode === Ub ? 256 : 0)),
        ((0 === d && 0 === f) || t === kb) && E === Cb && (E = jb),
        E
      );
    },
    inflateEnd: (e) => {
      if ($b(e)) return Rb;
      let t = e.state;
      return t.window && (t.window = null), (e.state = null), Cb;
    },
    inflateGetHeader: (e, t) => {
      if ($b(e)) return Rb;
      const n = e.state;
      return 0 == (2 & n.wrap) ? Rb : ((n.head = t), (t.done = !1), Cb);
    },
    inflateSetDictionary: (e, t) => {
      const n = t.length;
      let r, a, o;
      return $b(e)
        ? Rb
        : ((r = e.state),
          0 !== r.wrap && r.mode !== Db
            ? Rb
            : r.mode === Db && ((a = 1), (a = $v(a, t, n, 0)), a !== r.check)
            ? Lb
            : ((o = tw(e, t, n, n)),
              o ? ((r.mode = 16210), Pb) : ((r.havedict = 1), Cb)));
    },
    inflateInfo: "pako inflate (from Nodeca project)",
  };
  var rw = function () {
    (this.text = 0),
      (this.time = 0),
      (this.xflags = 0),
      (this.os = 0),
      (this.extra = null),
      (this.extra_len = 0),
      (this.name = ""),
      (this.comment = ""),
      (this.hcrc = 0),
      (this.done = !1);
  };
  const aw = Object.prototype.toString,
    {
      Z_NO_FLUSH: ow,
      Z_FINISH: iw,
      Z_OK: sw,
      Z_STREAM_END: lw,
      Z_NEED_DICT: uw,
      Z_STREAM_ERROR: cw,
      Z_DATA_ERROR: dw,
      Z_MEM_ERROR: fw,
    } = Jv;
  function pw(e) {
    this.options = Xy({ chunkSize: 65536, windowBits: 15, to: "" }, e || {});
    const t = this.options;
    t.raw &&
      t.windowBits >= 0 &&
      t.windowBits < 16 &&
      ((t.windowBits = -t.windowBits),
      0 === t.windowBits && (t.windowBits = -15)),
      !(t.windowBits >= 0 && t.windowBits < 16) ||
        (e && e.windowBits) ||
        (t.windowBits += 32),
      t.windowBits > 15 &&
        t.windowBits < 48 &&
        0 == (15 & t.windowBits) &&
        (t.windowBits |= 15),
      (this.err = 0),
      (this.msg = ""),
      (this.ended = !1),
      (this.chunks = []),
      (this.strm = new nb()),
      (this.strm.avail_out = 0);
    let n = nw.inflateInit2(this.strm, t.windowBits);
    if (n !== sw) throw new Error(Xv[n]);
    if (
      ((this.header = new rw()),
      nw.inflateGetHeader(this.strm, this.header),
      t.dictionary &&
        ("string" == typeof t.dictionary
          ? (t.dictionary = Qy(t.dictionary))
          : "[object ArrayBuffer]" === aw.call(t.dictionary) &&
            (t.dictionary = new Uint8Array(t.dictionary)),
        t.raw &&
          ((n = nw.inflateSetDictionary(this.strm, t.dictionary)), n !== sw)))
    )
      throw new Error(Xv[n]);
  }
  function hw(e, t) {
    const n = new pw(t);
    if ((n.push(e), n.err)) throw n.msg || Xv[n.err];
    return n.result;
  }
  (pw.prototype.push = function (e, t) {
    const n = this.strm,
      r = this.options.chunkSize,
      a = this.options.dictionary;
    let o, i, s;
    if (this.ended) return !1;
    for (
      i = t === ~~t ? t : !0 === t ? iw : ow,
        "[object ArrayBuffer]" === aw.call(e)
          ? (n.input = new Uint8Array(e))
          : (n.input = e),
        n.next_in = 0,
        n.avail_in = n.input.length;
      ;

    ) {
      for (
        0 === n.avail_out &&
          ((n.output = new Uint8Array(r)), (n.next_out = 0), (n.avail_out = r)),
          o = nw.inflate(n, i),
          o === uw &&
            a &&
            ((o = nw.inflateSetDictionary(n, a)),
            o === sw ? (o = nw.inflate(n, i)) : o === dw && (o = uw));
        n.avail_in > 0 && o === lw && n.state.wrap > 0 && 0 !== e[n.next_in];

      )
        nw.inflateReset(n), (o = nw.inflate(n, i));
      switch (o) {
        case cw:
        case dw:
        case uw:
        case fw:
          return this.onEnd(o), (this.ended = !0), !1;
      }
      if (((s = n.avail_out), n.next_out && (0 === n.avail_out || o === lw)))
        if ("string" === this.options.to) {
          let e = tb(n.output, n.next_out),
            t = n.next_out - e,
            a = eb(n.output, e);
          (n.next_out = t),
            (n.avail_out = r - t),
            t && n.output.set(n.output.subarray(e, e + t), 0),
            this.onData(a);
        } else
          this.onData(
            n.output.length === n.next_out
              ? n.output
              : n.output.subarray(0, n.next_out)
          );
      if (o !== sw || 0 !== s) {
        if (o === lw)
          return (
            (o = nw.inflateEnd(this.strm)), this.onEnd(o), (this.ended = !0), !0
          );
        if (0 === n.avail_in) break;
      }
    }
    return !0;
  }),
    (pw.prototype.onData = function (e) {
      this.chunks.push(e);
    }),
    (pw.prototype.onEnd = function (e) {
      e === sw &&
        ("string" === this.options.to
          ? (this.result = this.chunks.join(""))
          : (this.result = Jy(this.chunks))),
        (this.chunks = []),
        (this.err = e),
        (this.msg = this.strm.msg);
    });
  var gw = {
    Inflate: pw,
    inflate: hw,
    inflateRaw: function (e, t) {
      return ((t = t || {}).raw = !0), hw(e, t);
    },
    ungzip: hw,
    constants: Jv,
  };
  const { Deflate: mw, deflate: vw, deflateRaw: yw, gzip: bw } = gb,
    { Inflate: ww, inflate: _w, inflateRaw: Sw, ungzip: Ew } = gw;
  var kw = {
    Deflate: mw,
    deflate: vw,
    deflateRaw: yw,
    gzip: bw,
    Inflate: ww,
    inflate: _w,
    inflateRaw: Sw,
    ungzip: Ew,
    constants: Jv,
  };
  function Ow(e) {
    const t = (e.startsWith(zn) ? Mw(e.split(zn)[1]) : e)
        .split(".")[1]
        .replace(/-/g, "+")
        .replace(/_/g, "/"),
      n = decodeURIComponent(
        atob(t)
          .split("")
          .map((e) => `%${`00${e.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join("")
      );
    return JSON.parse(n);
  }
  function xw(e) {
    const t = { 0: { id: "0", children: [] } };
    return (
      e.forEach((e) => {
        t[`${e.id}`] = { ...e, children: [] };
      }),
      e.forEach((e) => {
        if (null !== e.parentId && void 0 !== e.parentId) {
          const n = t[`${e.parentId}`];
          n && n.children.push(t[`${e.id}`]);
        }
      }),
      t[0]
    );
  }
  function Cw(e, t, n, r) {
    return e.map((e) => {
      const a = { ...e },
        o = a.requiredPermissionIds.some((e) => t.has(e)),
        i = a.allowSiteCodes.includes(n);
      if (
        ((a.isVisible = r ? o && i : o),
        (a.isAccessible = r ? o && i : o),
        a.children && Array.isArray(a.children) && a.children.length > 0)
      ) {
        const e = Cw(a.children, t, n, r);
        e.length > 0
          ? ((a.isVisible = a.isVisible || e.some((e) => e.isVisible)),
            (a.children = e))
          : (a.children = []);
      }
      return a.url || (a.isAccessible = !1), a;
    });
  }
  function Tw(e, t, n) {
    let r;
    (r = n && n > 0 ? `max-age=${60 * n};` : ""),
      (document.cookie = `${e}=${t};${r}path=/`);
  }
  function Nw(e) {
    return decodeURIComponent(document.cookie)
      .split(";")
      .filter((e) => !!e)
      .reduce((e, t) => {
        const [n, r] = t.trim().split("=");
        return (e[n] = r), e;
      }, {})[e];
  }
  function Rw(e) {
    document.cookie = `${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  function Lw(e, t) {
    const n = Nw(e);
    n && Tw(e, n, t);
  }
  function Pw(e, t, n) {
    if (e.isVisible && e.isAccessible && e.url === t && !n) return !1;
    for (const r of e.children) if (!Pw(r, t)) return !1;
    return !0;
  }
  function jw(e, t) {
    return new URLSearchParams(e.search).get(t);
  }
  function Iw() {
    let e = Number.parseInt(
      window.localStorage.getItem("hmg-admin-count") || "0"
    );
    if ((isNaN(e) && (e = 0), e > 8)) {
      const e = Fh.logError({
        error: Ie.t("ERR_REDIRECTION_EXCEEDED_WHILE_SSO_AUTHENTICATION") || "",
        isDirectSend: !0,
      });
      return alert(e), !1;
    }
    return window.localStorage.setItem("hmg-admin-count", `${e + 1}`), !0;
  }
  function Aw() {
    window.localStorage.setItem("hmg-admin-count", "0");
  }
  function Dw(e, t) {
    try {
      const n = new URL(decodeURIComponent(e));
      let r = n;
      return (
        Object.entries(t).forEach(([e, t]) => {
          jw(n, e) ||
            (r = new URL(
              (function (e, t, n) {
                const r = new URLSearchParams(e.search);
                return r.set(t, n), `${e.origin}${e.pathname}?${r.toString()}`;
              })(r, e, t)
            ));
        }),
        encodeURIComponent(r.href)
      );
    } catch (n) {
      return Fh.logError({ error: `[hmg-Admin] url error, ${e}` }), "/";
    }
  }
  function zw(e) {
    return btoa(String.fromCharCode.apply(null, kw.gzip(e)));
  }
  function Mw(e) {
    return kw.ungzip(
      Uint8Array.from(atob(e), (e) => e.charCodeAt(0)),
      { to: "string" }
    );
  }
  function Uw(e) {
    try {
      const t = new URL(e),
        n = new URL(window.location.href),
        r = Array.from(n.searchParams.entries()),
        a = Object.values(Hn);
      return (
        r.forEach(([e, n]) => {
          a.includes(e) && t.searchParams.set(e, n);
        }),
        t.href
      );
    } catch {
      return e;
    }
  }
  const Fw = (e) => {
    if ("" === e) return !0;
    try {
      return new URL(e).origin === window.location.origin;
    } catch {
      return !1;
    }
  };
  function Hw(e, t) {
    try {
      const n = new URL(Uw(e));
      return (
        null == t ||
          t.forEach(({ key: e, value: t }) => {
            t && n.searchParams.set(e, t);
          }),
        (n.pathname = new URL(e).pathname),
        {
          to: n.pathname + n.search,
          urlWithParams: n.href,
          isSameDomain: Fw(n.href),
        }
      );
    } catch (n) {
      return (
        Fh.logError({ error: `[hmg-Admin] url error, ${e}` }),
        {
          to: "/",
          urlWithParams: location.href,
          isSameDomain: Fw(location.href),
        }
      );
    }
  }
  function Vw(e) {
    for (const t of e) {
      if (t.isAccessible && t.isVisible) return t;
      if (t.children) {
        const e = Vw(t.children);
        if (e) return e;
      }
    }
    return null;
  }
  function Bw(e, t) {
    for (const n of e) {
      if (n.isAccessible && n.isVisible && n.url === t) return n;
      if (n.children) {
        const e = Bw(n.children, t);
        if (e) return e;
      }
    }
    return null;
  }
  function Ww(e, t) {
    return (
      (null == e ? void 0 : e[t]) || (null == e ? void 0 : e[Object.keys(e)[0]])
    );
  }
  function Kw(e) {
    return e.startsWith("K") ? "" : "theme_hyundai";
  }
  const $w = async (e, t) => {
      var n;
      const r = e.config;
      return (
        r.retryCount || (r.retryCount = 0),
        r.retryCount < 3
          ? ((r.retryCount += 1),
            await new Promise((e) => setTimeout(e, 200)),
            t(r))
          : (Fh.logError({ error: Fh.axiosError(e) }),
            Promise.reject((null == (n = e.response) ? void 0 : n.data) || e))
      );
    },
    Gw = (e) => {
      const t =
        "HQ" === e.regionType ? e.regionType : e.country ?? e.regionType;
      return e.abbrName ? `${e.abbrName}${t ? ` (${t})` : ""}` : "";
    },
    qw = (e, t) => {
      try {
        const n = new URL(e, window.location.href);
        return n.searchParams.set(t.key, t.value), n.toString();
      } catch (n) {
        return e;
      }
    },
    Xw = Um.create({
      timeout: 2e4,
      headers: { "Content-Type": "application/json" },
      withCredentials: !0,
    });
  async function Jw(e) {
    const { data: t } = await Xw.get(e);
    return t;
  }
  async function Zw(e) {
    const { data: t } = await Xw.get(e);
    return t;
  }
  async function Yw(e) {
    const { data: t } = await Xw.get(e);
    return t;
  }
  Xw.interceptors.response.use(
    (e) => e,
    (e) => $w(e, Xw)
  );
  const Qw = () => {
    const [e, t] = Ft.useState(!1),
      n = Ft.useRef(null),
      r = Ft.useRef(null);
    return (
      Ft.useEffect(() => {
        const e = (e) => {
          var a, o;
          (null == (a = n.current) ? void 0 : a.contains(e.target)) ||
            (null == (o = r.current) ? void 0 : o.contains(e.target)) ||
            t(!1);
        };
        return (
          document.addEventListener("click", e),
          () => document.removeEventListener("click", e)
        );
      }, []),
      { dropdownRef: n, buttonRef: r, isOpen: e, setIsOpen: t }
    );
  };
  var e_ = {
    VITE_AUTHENTICATION_SUBJECT: "sso",
    VITE_LOCAL_HMG_HOME: "https://local-admin.hmg-corp.io:3001",
    VITE_LOCAL_SSO_HOST: "https://dev-admin-api.hmg-corp.io",
    VITE_LOCAL_SSO_HOST_EU: "https://dev-admin-internal-api-eu.hmg-corp.io",
    VITE_LOCAL_CONFIG_HOST: "https://dev-admin-config.hmg-corp.io",
    VITE_DEV_HMG_HOME: "https://dev-admin.hmg-corp.io",
    VITE_DEV_SSO_HOST: "https://dev-admin-api.hmg-corp.io",
    VITE_DEV_SSO_HOST_EU: "https://dev-admin-internal-api-eu.hmg-corp.io",
    VITE_DEV_CONFIG_HOST: "https://dev-admin-config.hmg-corp.io",
    VITE_STG_HMG_HOME: "https://stg-admin.hmg-corp.io",
    VITE_STG_SSO_HOST: "https://stg-admin-api.hmg-corp.io",
    VITE_STG_SSO_HOST_EU: "https://stg-admin-internal-api-eu.hmg-corp.io",
    VITE_STG_SSO_HOST_US: "https://stg-admin-internal-api-us.hmg-corp.io",
    VITE_STG_CONFIG_HOST: "https://stg-admin-config.hmg-corp.io",
    VITE_PRD_HMG_HOME: "https://admin.hmg-corp.io",
    VITE_PRD_SSO_HOST: "https://admin-api.hmg-corp.io",
    VITE_PRD_SSO_HOST_EU: "https://admin-internal-api-eu.hmg-corp.io",
    VITE_PRD_SSO_HOST_US: "https://admin-internal-api-us.hmg-corp.io",
    VITE_PRD_CONFIG_HOST: "https://admin-config.hmg-corp.io",
    VITE_DEV_COOKIE_TOKEN_PREFIX: "X-dev-hmg-admin-auth-",
    VITE_DEV_COOKIE_TOKEN_NAME: "X-dev-hmg-admin-authorization",
    VITE_STG_COOKIE_TOKEN_PREFIX: "X-stg-hmg-admin-auth-",
    VITE_STG_COOKIE_TOKEN_NAME: "X-stg-hmg-admin-authorization",
    VITE_PRD_COOKIE_TOKEN_PREFIX: "X-hmg-admin-auth-",
    VITE_PRD_COOKIE_TOKEN_NAME: "X-hmg-admin-authorization",
    BASE_URL: "/",
    MODE: "original",
    DEV: !1,
    PROD: !0,
    SSR: !1,
  };
  function t_(e, t) {
    let n;
    try {
      n = e();
    } catch (r) {
      return;
    }
    return {
      getItem: (e) => {
        var t;
        const r = (e) => (null === e ? null : JSON.parse(e, void 0)),
          a = null != (t = n.getItem(e)) ? t : null;
        return a instanceof Promise ? a.then(r) : r(a);
      },
      setItem: (e, t) => n.setItem(e, JSON.stringify(t, void 0)),
      removeItem: (e) => n.removeItem(e),
    };
  }
  const n_ = (e) => (t) => {
      try {
        const n = e(t);
        return n instanceof Promise
          ? n
          : {
              then: (e) => n_(e)(n),
              catch(e) {
                return this;
              },
            };
      } catch (n) {
        return {
          then(e) {
            return this;
          },
          catch: (e) => n_(e)(n),
        };
      }
    },
    r_ = (e, t) =>
      "getStorage" in t || "serialize" in t || "deserialize" in t
        ? ("production" !== (e_ ? "original" : void 0) &&
            console.warn(
              "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."
            ),
          ((e, t) => (n, r, a) => {
            let o = {
                getStorage: () => localStorage,
                serialize: JSON.stringify,
                deserialize: JSON.parse,
                partialize: (e) => e,
                version: 0,
                merge: (e, t) => ({ ...t, ...e }),
                ...t,
              },
              i = !1;
            const s = new Set(),
              l = new Set();
            let u;
            try {
              u = o.getStorage();
            } catch (m) {}
            if (!u)
              return e(
                (...e) => {
                  console.warn(
                    `[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`
                  ),
                    n(...e);
                },
                r,
                a
              );
            const c = n_(o.serialize),
              d = () => {
                const e = o.partialize({ ...r() });
                let t;
                const n = c({ state: e, version: o.version })
                  .then((e) => u.setItem(o.name, e))
                  .catch((e) => {
                    t = e;
                  });
                if (t) throw t;
                return n;
              },
              f = a.setState;
            a.setState = (e, t) => {
              f(e, t), d();
            };
            const p = e(
              (...e) => {
                n(...e), d();
              },
              r,
              a
            );
            let h;
            const g = () => {
              var e;
              if (!u) return;
              (i = !1), s.forEach((e) => e(r()));
              const t =
                (null == (e = o.onRehydrateStorage)
                  ? void 0
                  : e.call(o, r())) || void 0;
              return n_(u.getItem.bind(u))(o.name)
                .then((e) => {
                  if (e) return o.deserialize(e);
                })
                .then((e) => {
                  if (e) {
                    if ("number" != typeof e.version || e.version === o.version)
                      return e.state;
                    if (o.migrate) return o.migrate(e.state, e.version);
                    console.error(
                      "State loaded from storage couldn't be migrated since no migrate function was provided"
                    );
                  }
                })
                .then((e) => {
                  var t;
                  return (
                    (h = o.merge(e, null != (t = r()) ? t : p)), n(h, !0), d()
                  );
                })
                .then(() => {
                  null == t || t(h, void 0), (i = !0), l.forEach((e) => e(h));
                })
                .catch((e) => {
                  null == t || t(void 0, e);
                });
            };
            return (
              (a.persist = {
                setOptions: (e) => {
                  (o = { ...o, ...e }), e.getStorage && (u = e.getStorage());
                },
                clearStorage: () => {
                  null == u || u.removeItem(o.name);
                },
                getOptions: () => o,
                rehydrate: () => g(),
                hasHydrated: () => i,
                onHydrate: (e) => (
                  s.add(e),
                  () => {
                    s.delete(e);
                  }
                ),
                onFinishHydration: (e) => (
                  l.add(e),
                  () => {
                    l.delete(e);
                  }
                ),
              }),
              g(),
              h || p
            );
          })(e, t))
        : ((e, t) => (n, r, a) => {
            let o = {
                storage: t_(() => localStorage),
                partialize: (e) => e,
                version: 0,
                merge: (e, t) => ({ ...t, ...e }),
                ...t,
              },
              i = !1;
            const s = new Set(),
              l = new Set();
            let u = o.storage;
            if (!u)
              return e(
                (...e) => {
                  console.warn(
                    `[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`
                  ),
                    n(...e);
                },
                r,
                a
              );
            const c = () => {
                const e = o.partialize({ ...r() });
                return u.setItem(o.name, { state: e, version: o.version });
              },
              d = a.setState;
            a.setState = (e, t) => {
              d(e, t), c();
            };
            const f = e(
              (...e) => {
                n(...e), c();
              },
              r,
              a
            );
            let p;
            const h = () => {
              var e, t;
              if (!u) return;
              (i = !1),
                s.forEach((e) => {
                  var t;
                  return e(null != (t = r()) ? t : f);
                });
              const a =
                (null == (t = o.onRehydrateStorage)
                  ? void 0
                  : t.call(o, null != (e = r()) ? e : f)) || void 0;
              return n_(u.getItem.bind(u))(o.name)
                .then((e) => {
                  if (e) {
                    if ("number" != typeof e.version || e.version === o.version)
                      return e.state;
                    if (o.migrate) return o.migrate(e.state, e.version);
                    console.error(
                      "State loaded from storage couldn't be migrated since no migrate function was provided"
                    );
                  }
                })
                .then((e) => {
                  var t;
                  return (
                    (p = o.merge(e, null != (t = r()) ? t : f)), n(p, !0), c()
                  );
                })
                .then(() => {
                  null == a || a(p, void 0),
                    (p = r()),
                    (i = !0),
                    l.forEach((e) => e(p));
                })
                .catch((e) => {
                  null == a || a(void 0, e);
                });
            };
            return (
              (a.persist = {
                setOptions: (e) => {
                  (o = { ...o, ...e }), e.storage && (u = e.storage);
                },
                clearStorage: () => {
                  null == u || u.removeItem(o.name);
                },
                getOptions: () => o,
                rehydrate: () => h(),
                hasHydrated: () => i,
                onHydrate: (e) => (
                  s.add(e),
                  () => {
                    s.delete(e);
                  }
                ),
                onFinishHydration: (e) => (
                  l.add(e),
                  () => {
                    l.delete(e);
                  }
                ),
              }),
              o.skipHydration || h(),
              p || f
            );
          })(e, t),
    a_ = [{ languageCode: "ko", displayText: "한국어", isDefaultLang: !0 }];
  function o_() {
    return {
      projectCode: Mh.getState().projectCode,
      settingType: Bn.TYPE,
      settingKey: Bn.LANGUAGE_KEY,
    };
  }
  function i_(e) {
    return { ...o_(), settingValue: e };
  }
  const s_ = dh(
    r_(
      (e, t) => ({
        languages: a_,
        myLanguageSetting: [],
        async initLanguage() {
          var n;
          const {
            languages: r,
            initLanguage: a,
            getCurrentLanguageCode: o,
            setCurrentLanguageCode: i,
          } = t();
          if (1 === r.length)
            return void (await i(r[0].languageCode, o() !== r[0].languageCode));
          let s = await Hm(o_());
          if (0 === s.length) {
            const e = o(),
              { id: t } = await Vm(i_(e));
            s = [
              {
                id: t,
                isUse: !0,
                settingKey: Bn.LANGUAGE_KEY,
                settingValue: e,
              },
            ];
          }
          e({ myLanguageSetting: s });
          let l = o();
          r.some((e) => e.languageCode === l) || (l = r[0].languageCode),
            await i(l, !0),
            (s.length > 1 ||
              (null == (n = null == s ? void 0 : s[0])
                ? void 0
                : n.settingValue.startsWith("{"))) &&
              (await Wm(o_()), await a());
        },
        getLanguages: () => t().languages,
        getDefaultLanguage: () =>
          t().languages.find((e) => e.isDefaultLang) || t().languages[0],
        getCurrentLanguage() {
          const {
            languages: e,
            getCurrentLanguageCode: n,
            getDefaultLanguage: r,
          } = t();
          return e.find((e) => e.languageCode === n()) || r() || a_[0];
        },
        getCurrentLanguageCode() {
          var e;
          const { myLanguageSetting: n, getDefaultLanguage: r } = t();
          return (
            (null == (e = null == n ? void 0 : n[0])
              ? void 0
              : e.settingValue) ||
            r().languageCode ||
            "en"
          );
        },
        async setCurrentLanguageCode(n, r) {
          var a;
          const o =
            (null == (a = t().languages.find((e) => e.languageCode === n))
              ? void 0
              : a.displayText) || "";
          Ie.changeLanguage(n),
            sv
              .getState()
              .emit("changeLanguage", { languageCode: n, displayText: o });
          const { myLanguageSetting: i, getCurrentLanguageCode: s } = t();
          n !== s() &&
            (r && (await Bm(i[0].id, i_(n)), (i[0].settingValue = n)),
            e({ myLanguageSetting: i }));
        },
      }),
      { name: Mn, storage: t_(() => localStorage), version: 0.002 }
    )
  );
  function l_(e) {
    var t,
      n,
      r = "";
    if ("string" == typeof e || "number" == typeof e) r += e;
    else if ("object" == typeof e)
      if (Array.isArray(e)) {
        var a = e.length;
        for (t = 0; t < a; t++)
          e[t] && (n = l_(e[t])) && (r && (r += " "), (r += n));
      } else for (n in e) e[n] && (r && (r += " "), (r += n));
    return r;
  }
  function u_() {
    for (var e, t, n = 0, r = "", a = arguments.length; n < a; n++)
      (e = arguments[n]) && (t = l_(e)) && (r && (r += " "), (r += t));
    return r;
  }
  function c_() {
    var e;
    const { dropdownRef: t, isOpen: n, setIsOpen: r } = Qw(),
      {
        languages: a,
        getCurrentLanguage: o,
        setCurrentLanguageCode: i,
      } = zh(s_, (e) => e);
    const s = async (e) => {
      a.some((t) => t.languageCode === e) && (r(!1), await i(e, !0));
    };
    return (
      Ft.useEffect(() => {
        sv.setState({ changeLanguage: s });
      }, []),
      a.length <= 1
        ? null
        : tr.jsxs("div", {
            className: u_(
              "header-hmg-common__dropdown header-hmg-common__dropdown-lang-setting",
              n && "is_open"
            ),
            ref: t,
            children: [
              tr.jsx("button", {
                type: "button",
                className: "header-hmg-common__dropdown-btn-top",
                onClick: () => r(!n),
                children: null == (e = o()) ? void 0 : e.displayText,
              }),
              n &&
                tr.jsx("div", {
                  className: "header-hmg-common__dropdown-box",
                  children: tr.jsx("ul", {
                    className: "header-hmg-common__dropdown-lst",
                    children: a.map((e) => {
                      var t;
                      return tr.jsx(
                        "li",
                        {
                          className: u_(
                            "header-hmg-common__dropdown-item",
                            e.languageCode ===
                              (null == (t = o()) ? void 0 : t.languageCode) &&
                              "header-hmg-common__dropdown-item--selected"
                          ),
                          onClick: () => s(e.languageCode),
                          style: { cursor: "pointer", userSelect: "none" },
                          children: e.displayText,
                        },
                        e.languageCode
                      );
                    }),
                  }),
                }),
            ],
          })
    );
  }
  const d_ = dh(
    r_(
      (e, t) => ({
        bufferTime: 0,
        timer: new Date().getTime() + Fn,
        clearTimer() {
          var n, r;
          const a = t().getSessionSeconds(),
            o = new Date().getTime(),
            i = Math.floor(new Date().getTime() / 1e3) - +Gm.getState().iat,
            s = +Gm.getState().expired - +Gm.getState().iat,
            l = 1e3 * +Gm.getState().expired <= Date.now();
          e({
            timer: 1e3 * Math.floor(o / 1e3) + 1e3 * a,
            bufferTime: s < i || l ? t().bufferTime : i,
          });
          const { projectCode: u, stage: c } = Mh.getState(),
            d = Dn[c].COOKIE_TOKEN_PREFIX + u,
            f = Dn[c].COOKIE_TOKEN_NAME;
          Lw(d, a / 60),
            Lw(f, a / 60),
            null == (r = (n = sv.getState()).verifyAndReturnToken) || r.call(n);
        },
        getSessionSeconds() {
          var e, t;
          const n =
            null ==
            (t = null == (e = Qm.getState().project) ? void 0 : e.session)
              ? void 0
              : t.sessionTimeout;
          return n || 3600;
        },
      }),
      { name: Un, storage: t_(() => localStorage), version: 0.001 }
    )
  );
  function f_(e) {
    return zh(d_, e);
  }
  function p_() {
    const { logout: e } = lv((e) => e),
      { timer: t, clearTimer: n } = f_((e) => e),
      { t: r } = Wn(),
      a = iv((e) => e.project),
      [o, i] = Ft.useState(!0),
      [s, l] = Ft.useState(new Date().getTime());
    return (
      Ft.useEffect(() => {
        var e;
        n(),
          !1 ===
            (null == (e = null == a ? void 0 : a.session)
              ? void 0
              : e.isVisibleTimer) && i(!1);
      }, []),
      Ft.useEffect(() => {
        l(1e3 * Math.floor(new Date().getTime() / 1e3));
        const n = setInterval(() => {
          l(1e3 * Math.floor(new Date().getTime() / 1e3)),
            t - s <= 1e3 && (null == e || e());
        }, 1e3);
        return () => clearInterval(n);
      }, [t, s]),
      !1 === o
        ? null
        : tr.jsx("div", {
            className: u_(
              "header-hmg-common__login-state",
              t - s < 3e5 && "header-hmg-common__login-state-notice"
            ),
            children: tr.jsxs("button", {
              type: "button",
              className: "header-hmg-common__login-state-btn",
              onClick: () => n(),
              children: [
                tr.jsx("span", {
                  className: "header-hmg-common__login-state-time",
                  children: (function (e) {
                    const t = Math.floor(e / 1e3),
                      n = t % 60;
                    return `${Math.floor(t / 60)
                      .toString()
                      .padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
                  })(t - s > 0 ? t - s : 0),
                }),
                tr.jsx("span", {
                  className: "header-hmg-common__login-state-txt",
                  children: r("LABEL_LOGIN_EXTENSION"),
                }),
              ],
            }),
          })
    );
  }
  const h_ = dh((e, t) => ({
    projectCodes: [],
    forProjects: !1,
    multilingual: { ko: { title: "", url: null } },
    title: "",
    url: null,
    getVisibleNotice: () =>
      t().projectCodes.includes(Mh.getState().projectCode) || t().forProjects,
  }));
  function g_(e) {
    return zh(h_, e);
  }
  function m_() {
    var e, t;
    const { t: n, language: r } = Wn(),
      { siteCode: a } = qm((e) => e),
      {
        title: o,
        url: i,
        multilingual: s,
        getVisibleNotice: l,
        getNoticeData: u,
      } = g_((e) => e);
    if (
      (Ft.useEffect(() => {
        null == u || u();
      }, []),
      !l())
    )
      return null;
    const c = (null == (e = null == s ? void 0 : s[r]) ? void 0 : e.title) || o,
      d = (null == (t = null == s ? void 0 : s[r]) ? void 0 : t.url) || i;
    return tr.jsx("div", {
      className: u_("banner-hmg-common is_open", Kw(a)),
      children: tr.jsxs("div", {
        className: "banner-hmg-common__cont",
        children: [
          tr.jsx("span", {
            className: "banner-hmg-common__ico-notice",
            children: n("LABEL_SYSTEM_NOTICE"),
          }),
          c,
          d &&
            tr.jsx("a", {
              href: d,
              className: "banner-hmg-common__link",
              target: "_blank",
              rel: "noreferrer",
              children: n("LABEL_NOTICE_LINK"),
            }),
        ],
      }),
    });
  }
  function v_() {
    return (v_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }).apply(null, arguments);
  }
  const y_ = { disableDefaultClasses: !1 },
    b_ = Ft.createContext(y_);
  function w_(e) {
    return (e && e.ownerDocument) || document;
  }
  function __(e, t) {
    "function" == typeof e ? e(t) : e && (e.current = t);
  }
  const S_ = "undefined" != typeof window ? Ft.useLayoutEffect : Ft.useEffect;
  function E_(...e) {
    return Ft.useMemo(
      () =>
        e.every((e) => null == e)
          ? null
          : (t) => {
              e.forEach((e) => {
                __(e, t);
              });
            },
      e
    );
  }
  const k_ = (e) => e,
    O_ = (() => {
      let e = k_;
      return {
        configure(t) {
          e = t;
        },
        generate: (t) => e(t),
        reset() {
          e = k_;
        },
      };
    })(),
    x_ = {
      active: "active",
      checked: "checked",
      completed: "completed",
      disabled: "disabled",
      error: "error",
      expanded: "expanded",
      focused: "focused",
      focusVisible: "focusVisible",
      open: "open",
      readOnly: "readOnly",
      required: "required",
      selected: "selected",
    };
  function C_(e, t, n = "Mui") {
    const r = x_[t];
    return r ? `${n}-${r}` : `${O_.generate(e)}-${t}`;
  }
  function T_(e) {
    var t,
      n,
      r = "";
    if ("string" == typeof e || "number" == typeof e) r += e;
    else if ("object" == typeof e)
      if (Array.isArray(e))
        for (t = 0; t < e.length; t++)
          e[t] && (n = T_(e[t])) && (r && (r += " "), (r += n));
      else for (t in e) e[t] && (r && (r += " "), (r += t));
    return r;
  }
  function N_() {
    for (var e, t, n = 0, r = ""; n < arguments.length; )
      (e = arguments[n++]) && (t = T_(e)) && (r && (r += " "), (r += t));
    return r;
  }
  function R_(e) {
    if (void 0 === e) return {};
    const t = {};
    return (
      Object.keys(e)
        .filter((t) => !(t.match(/^on[A-Z]/) && "function" == typeof e[t]))
        .forEach((n) => {
          t[n] = e[n];
        }),
      t
    );
  }
  function L_(e) {
    const {
      getSlotProps: t,
      additionalProps: n,
      externalSlotProps: r,
      externalForwardedProps: a,
      className: o,
    } = e;
    if (!t) {
      const e = N_(
          null == a ? void 0 : a.className,
          null == r ? void 0 : r.className,
          o,
          null == n ? void 0 : n.className
        ),
        t = v_(
          {},
          null == n ? void 0 : n.style,
          null == a ? void 0 : a.style,
          null == r ? void 0 : r.style
        ),
        i = v_({}, n, a, r);
      return (
        e.length > 0 && (i.className = e),
        Object.keys(t).length > 0 && (i.style = t),
        { props: i, internalRef: void 0 }
      );
    }
    const i = (function (e, t = []) {
        if (void 0 === e) return {};
        const n = {};
        return (
          Object.keys(e)
            .filter(
              (n) =>
                n.match(/^on[A-Z]/) &&
                "function" == typeof e[n] &&
                !t.includes(n)
            )
            .forEach((t) => {
              n[t] = e[t];
            }),
          n
        );
      })(v_({}, a, r)),
      s = R_(r),
      l = R_(a),
      u = t(i),
      c = N_(
        null == u ? void 0 : u.className,
        null == n ? void 0 : n.className,
        o,
        null == a ? void 0 : a.className,
        null == r ? void 0 : r.className
      ),
      d = v_(
        {},
        null == u ? void 0 : u.style,
        null == n ? void 0 : n.style,
        null == a ? void 0 : a.style,
        null == r ? void 0 : r.style
      ),
      f = v_({}, u, n, l, s);
    return (
      c.length > 0 && (f.className = c),
      Object.keys(d).length > 0 && (f.style = d),
      { props: f, internalRef: u.ref }
    );
  }
  const P_ = ["elementType", "externalSlotProps", "ownerState"];
  function j_(e) {
    var t;
    const { elementType: n, externalSlotProps: r, ownerState: a } = e,
      o = nt(e, P_),
      i = (function (e, t) {
        return "function" == typeof e ? e(t) : e;
      })(r, a),
      { props: s, internalRef: l } = L_(v_({}, o, { externalSlotProps: i }));
    return (function (e, t, n) {
      return void 0 === e || "string" == typeof e
        ? t
        : v_({}, t, { ownerState: v_({}, t.ownerState, n) });
    })(
      n,
      v_({}, s, {
        ref: E_(
          l,
          null == i ? void 0 : i.ref,
          null == (t = e.additionalProps) ? void 0 : t.ref
        ),
      }),
      a
    );
  }
  var I_ = "top",
    A_ = "bottom",
    D_ = "right",
    z_ = "left",
    M_ = "auto",
    U_ = [I_, A_, D_, z_],
    F_ = "start",
    H_ = "end",
    V_ = "viewport",
    B_ = "popper",
    W_ = U_.reduce(function (e, t) {
      return e.concat([t + "-" + F_, t + "-" + H_]);
    }, []),
    K_ = [].concat(U_, [M_]).reduce(function (e, t) {
      return e.concat([t, t + "-" + F_, t + "-" + H_]);
    }, []),
    $_ = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function G_(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function q_(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function X_(e) {
    return e instanceof q_(e).Element || e instanceof Element;
  }
  function J_(e) {
    return e instanceof q_(e).HTMLElement || e instanceof HTMLElement;
  }
  function Z_(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof q_(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  const Y_ = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var n = t.styles[e] || {},
          r = t.attributes[e] || {},
          a = t.elements[e];
        J_(a) &&
          G_(a) &&
          (Object.assign(a.style, n),
          Object.keys(r).forEach(function (e) {
            var t = r[e];
            !1 === t
              ? a.removeAttribute(e)
              : a.setAttribute(e, !0 === t ? "" : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var r = t.elements[e],
              a = t.attributes[e] || {},
              o = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
              ).reduce(function (e, t) {
                return (e[t] = ""), e;
              }, {});
            J_(r) &&
              G_(r) &&
              (Object.assign(r.style, o),
              Object.keys(a).forEach(function (e) {
                r.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  function Q_(e) {
    return e.split("-")[0];
  }
  var eS = Math.max,
    tS = Math.min,
    nS = Math.round;
  function rS() {
    var e = navigator.userAgentData;
    return null != e && e.brands && Array.isArray(e.brands)
      ? e.brands
          .map(function (e) {
            return e.brand + "/" + e.version;
          })
          .join(" ")
      : navigator.userAgent;
  }
  function aS() {
    return !/^((?!chrome|android).)*safari/i.test(rS());
  }
  function oS(e, t, n) {
    void 0 === t && (t = !1), void 0 === n && (n = !1);
    var r = e.getBoundingClientRect(),
      a = 1,
      o = 1;
    t &&
      J_(e) &&
      ((a = (e.offsetWidth > 0 && nS(r.width) / e.offsetWidth) || 1),
      (o = (e.offsetHeight > 0 && nS(r.height) / e.offsetHeight) || 1));
    var i = (X_(e) ? q_(e) : window).visualViewport,
      s = !aS() && n,
      l = (r.left + (s && i ? i.offsetLeft : 0)) / a,
      u = (r.top + (s && i ? i.offsetTop : 0)) / o,
      c = r.width / a,
      d = r.height / o;
    return {
      width: c,
      height: d,
      top: u,
      right: l + c,
      bottom: u + d,
      left: l,
      x: l,
      y: u,
    };
  }
  function iS(e) {
    var t = oS(e),
      n = e.offsetWidth,
      r = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - r) <= 1 && (r = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
    );
  }
  function sS(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && Z_(n)) {
      var r = t;
      do {
        if (r && e.isSameNode(r)) return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function lS(e) {
    return q_(e).getComputedStyle(e);
  }
  function uS(e) {
    return ["table", "td", "th"].indexOf(G_(e)) >= 0;
  }
  function cS(e) {
    return ((X_(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function dS(e) {
    return "html" === G_(e)
      ? e
      : e.assignedSlot || e.parentNode || (Z_(e) ? e.host : null) || cS(e);
  }
  function fS(e) {
    return J_(e) && "fixed" !== lS(e).position ? e.offsetParent : null;
  }
  function pS(e) {
    for (var t = q_(e), n = fS(e); n && uS(n) && "static" === lS(n).position; )
      n = fS(n);
    return n &&
      ("html" === G_(n) || ("body" === G_(n) && "static" === lS(n).position))
      ? t
      : n ||
          (function (e) {
            var t = /firefox/i.test(rS());
            if (/Trident/i.test(rS()) && J_(e) && "fixed" === lS(e).position)
              return null;
            var n = dS(e);
            for (
              Z_(n) && (n = n.host);
              J_(n) && ["html", "body"].indexOf(G_(n)) < 0;

            ) {
              var r = lS(n);
              if (
                "none" !== r.transform ||
                "none" !== r.perspective ||
                "paint" === r.contain ||
                -1 !== ["transform", "perspective"].indexOf(r.willChange) ||
                (t && "filter" === r.willChange) ||
                (t && r.filter && "none" !== r.filter)
              )
                return n;
              n = n.parentNode;
            }
            return null;
          })(e) ||
          t;
  }
  function hS(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function gS(e, t, n) {
    return eS(e, tS(t, n));
  }
  function mS(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function vS(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t;
    }, {});
  }
  function yS(e) {
    return e.split("-")[1];
  }
  var bS = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function wS(e) {
    var t,
      n = e.popper,
      r = e.popperRect,
      a = e.placement,
      o = e.variation,
      i = e.offsets,
      s = e.position,
      l = e.gpuAcceleration,
      u = e.adaptive,
      c = e.roundOffsets,
      d = e.isFixed,
      f = i.x,
      p = void 0 === f ? 0 : f,
      h = i.y,
      g = void 0 === h ? 0 : h,
      m = "function" == typeof c ? c({ x: p, y: g }) : { x: p, y: g };
    (p = m.x), (g = m.y);
    var v = i.hasOwnProperty("x"),
      y = i.hasOwnProperty("y"),
      b = z_,
      w = I_,
      _ = window;
    if (u) {
      var S = pS(n),
        E = "clientHeight",
        k = "clientWidth";
      if (
        (S === q_(n) &&
          "static" !== lS((S = cS(n))).position &&
          "absolute" === s &&
          ((E = "scrollHeight"), (k = "scrollWidth")),
        (S = S),
        a === I_ || ((a === z_ || a === D_) && o === H_))
      )
        (w = A_),
          (g -=
            (d && S === _ && _.visualViewport
              ? _.visualViewport.height
              : S[E]) - r.height),
          (g *= l ? 1 : -1);
      if (a === z_ || ((a === I_ || a === A_) && o === H_))
        (b = D_),
          (p -=
            (d && S === _ && _.visualViewport ? _.visualViewport.width : S[k]) -
            r.width),
          (p *= l ? 1 : -1);
    }
    var O,
      x = Object.assign({ position: s }, u && bS),
      C =
        !0 === c
          ? (function (e, t) {
              var n = e.x,
                r = e.y,
                a = t.devicePixelRatio || 1;
              return { x: nS(n * a) / a || 0, y: nS(r * a) / a || 0 };
            })({ x: p, y: g }, q_(n))
          : { x: p, y: g };
    return (
      (p = C.x),
      (g = C.y),
      l
        ? Object.assign(
            {},
            x,
            (((O = {})[w] = y ? "0" : ""),
            (O[b] = v ? "0" : ""),
            (O.transform =
              (_.devicePixelRatio || 1) <= 1
                ? "translate(" + p + "px, " + g + "px)"
                : "translate3d(" + p + "px, " + g + "px, 0)"),
            O)
          )
        : Object.assign(
            {},
            x,
            (((t = {})[w] = y ? g + "px" : ""),
            (t[b] = v ? p + "px" : ""),
            (t.transform = ""),
            t)
          )
    );
  }
  var _S = { passive: !0 };
  var SS = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function ES(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return SS[e];
    });
  }
  var kS = { start: "end", end: "start" };
  function OS(e) {
    return e.replace(/start|end/g, function (e) {
      return kS[e];
    });
  }
  function xS(e) {
    var t = q_(e);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function CS(e) {
    return oS(cS(e)).left + xS(e).scrollLeft;
  }
  function TS(e) {
    var t = lS(e),
      n = t.overflow,
      r = t.overflowX,
      a = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + a + r);
  }
  function NS(e) {
    return ["html", "body", "#document"].indexOf(G_(e)) >= 0
      ? e.ownerDocument.body
      : J_(e) && TS(e)
      ? e
      : NS(dS(e));
  }
  function RS(e, t) {
    var n;
    void 0 === t && (t = []);
    var r = NS(e),
      a = r === (null == (n = e.ownerDocument) ? void 0 : n.body),
      o = q_(r),
      i = a ? [o].concat(o.visualViewport || [], TS(r) ? r : []) : r,
      s = t.concat(i);
    return a ? s : s.concat(RS(dS(i)));
  }
  function LS(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function PS(e, t, n) {
    return t === V_
      ? LS(
          (function (e, t) {
            var n = q_(e),
              r = cS(e),
              a = n.visualViewport,
              o = r.clientWidth,
              i = r.clientHeight,
              s = 0,
              l = 0;
            if (a) {
              (o = a.width), (i = a.height);
              var u = aS();
              (u || (!u && "fixed" === t)) &&
                ((s = a.offsetLeft), (l = a.offsetTop));
            }
            return { width: o, height: i, x: s + CS(e), y: l };
          })(e, n)
        )
      : X_(t)
      ? (function (e, t) {
          var n = oS(e, !1, "fixed" === t);
          return (
            (n.top = n.top + e.clientTop),
            (n.left = n.left + e.clientLeft),
            (n.bottom = n.top + e.clientHeight),
            (n.right = n.left + e.clientWidth),
            (n.width = e.clientWidth),
            (n.height = e.clientHeight),
            (n.x = n.left),
            (n.y = n.top),
            n
          );
        })(t, n)
      : LS(
          (function (e) {
            var t,
              n = cS(e),
              r = xS(e),
              a = null == (t = e.ownerDocument) ? void 0 : t.body,
              o = eS(
                n.scrollWidth,
                n.clientWidth,
                a ? a.scrollWidth : 0,
                a ? a.clientWidth : 0
              ),
              i = eS(
                n.scrollHeight,
                n.clientHeight,
                a ? a.scrollHeight : 0,
                a ? a.clientHeight : 0
              ),
              s = -r.scrollLeft + CS(e),
              l = -r.scrollTop;
            return (
              "rtl" === lS(a || n).direction &&
                (s += eS(n.clientWidth, a ? a.clientWidth : 0) - o),
              { width: o, height: i, x: s, y: l }
            );
          })(cS(e))
        );
  }
  function jS(e, t, n, r) {
    var a =
        "clippingParents" === t
          ? (function (e) {
              var t = RS(dS(e)),
                n =
                  ["absolute", "fixed"].indexOf(lS(e).position) >= 0 && J_(e)
                    ? pS(e)
                    : e;
              return X_(n)
                ? t.filter(function (e) {
                    return X_(e) && sS(e, n) && "body" !== G_(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      o = [].concat(a, [n]),
      i = o[0],
      s = o.reduce(function (t, n) {
        var a = PS(e, n, r);
        return (
          (t.top = eS(a.top, t.top)),
          (t.right = tS(a.right, t.right)),
          (t.bottom = tS(a.bottom, t.bottom)),
          (t.left = eS(a.left, t.left)),
          t
        );
      }, PS(e, i, r));
    return (
      (s.width = s.right - s.left),
      (s.height = s.bottom - s.top),
      (s.x = s.left),
      (s.y = s.top),
      s
    );
  }
  function IS(e) {
    var t,
      n = e.reference,
      r = e.element,
      a = e.placement,
      o = a ? Q_(a) : null,
      i = a ? yS(a) : null,
      s = n.x + n.width / 2 - r.width / 2,
      l = n.y + n.height / 2 - r.height / 2;
    switch (o) {
      case I_:
        t = { x: s, y: n.y - r.height };
        break;
      case A_:
        t = { x: s, y: n.y + n.height };
        break;
      case D_:
        t = { x: n.x + n.width, y: l };
        break;
      case z_:
        t = { x: n.x - r.width, y: l };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    var u = o ? hS(o) : null;
    if (null != u) {
      var c = "y" === u ? "height" : "width";
      switch (i) {
        case F_:
          t[u] = t[u] - (n[c] / 2 - r[c] / 2);
          break;
        case H_:
          t[u] = t[u] + (n[c] / 2 - r[c] / 2);
      }
    }
    return t;
  }
  function AS(e, t) {
    void 0 === t && (t = {});
    var n = t,
      r = n.placement,
      a = void 0 === r ? e.placement : r,
      o = n.strategy,
      i = void 0 === o ? e.strategy : o,
      s = n.boundary,
      l = void 0 === s ? "clippingParents" : s,
      u = n.rootBoundary,
      c = void 0 === u ? V_ : u,
      d = n.elementContext,
      f = void 0 === d ? B_ : d,
      p = n.altBoundary,
      h = void 0 !== p && p,
      g = n.padding,
      m = void 0 === g ? 0 : g,
      v = mS("number" != typeof m ? m : vS(m, U_)),
      y = f === B_ ? "reference" : B_,
      b = e.rects.popper,
      w = e.elements[h ? y : f],
      _ = jS(X_(w) ? w : w.contextElement || cS(e.elements.popper), l, c, i),
      S = oS(e.elements.reference),
      E = IS({ reference: S, element: b, strategy: "absolute", placement: a }),
      k = LS(Object.assign({}, b, E)),
      O = f === B_ ? k : S,
      x = {
        top: _.top - O.top + v.top,
        bottom: O.bottom - _.bottom + v.bottom,
        left: _.left - O.left + v.left,
        right: O.right - _.right + v.right,
      },
      C = e.modifiersData.offset;
    if (f === B_ && C) {
      var T = C[a];
      Object.keys(x).forEach(function (e) {
        var t = [D_, A_].indexOf(e) >= 0 ? 1 : -1,
          n = [I_, A_].indexOf(e) >= 0 ? "y" : "x";
        x[e] += T[n] * t;
      });
    }
    return x;
  }
  function DS(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function zS(e) {
    return [I_, D_, A_, z_].some(function (t) {
      return e[t] >= 0;
    });
  }
  function MS(e, t, n) {
    void 0 === n && (n = !1);
    var r,
      a,
      o = J_(t),
      i =
        J_(t) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            n = nS(t.width) / e.offsetWidth || 1,
            r = nS(t.height) / e.offsetHeight || 1;
          return 1 !== n || 1 !== r;
        })(t),
      s = cS(t),
      l = oS(e, i, n),
      u = { scrollLeft: 0, scrollTop: 0 },
      c = { x: 0, y: 0 };
    return (
      (o || (!o && !n)) &&
        (("body" !== G_(t) || TS(s)) &&
          (u =
            (r = t) !== q_(r) && J_(r)
              ? { scrollLeft: (a = r).scrollLeft, scrollTop: a.scrollTop }
              : xS(r)),
        J_(t)
          ? (((c = oS(t, !0)).x += t.clientLeft), (c.y += t.clientTop))
          : s && (c.x = CS(s))),
      {
        x: l.left + u.scrollLeft - c.x,
        y: l.top + u.scrollTop - c.y,
        width: l.width,
        height: l.height,
      }
    );
  }
  function US(e) {
    var t = new Map(),
      n = new Set(),
      r = [];
    function a(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var r = t.get(e);
              r && a(r);
            }
          }),
        r.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        n.has(e.name) || a(e);
      }),
      r
    );
  }
  var FS = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function HS() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function VS(e) {
    void 0 === e && (e = {});
    var t = e,
      n = t.defaultModifiers,
      r = void 0 === n ? [] : n,
      a = t.defaultOptions,
      o = void 0 === a ? FS : a;
    return function (e, t, n) {
      void 0 === n && (n = o);
      var a,
        i,
        s = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, FS, o),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        l = [],
        u = !1,
        c = {
          state: s,
          setOptions: function (n) {
            var a = "function" == typeof n ? n(s.options) : n;
            d(),
              (s.options = Object.assign({}, o, s.options, a)),
              (s.scrollParents = {
                reference: X_(e)
                  ? RS(e)
                  : e.contextElement
                  ? RS(e.contextElement)
                  : [],
                popper: RS(t),
              });
            var i,
              u,
              f = (function (e) {
                var t = US(e);
                return $_.reduce(function (e, n) {
                  return e.concat(
                    t.filter(function (e) {
                      return e.phase === n;
                    })
                  );
                }, []);
              })(
                ((i = [].concat(r, s.options.modifiers)),
                (u = i.reduce(function (e, t) {
                  var n = e[t.name];
                  return (
                    (e[t.name] = n
                      ? Object.assign({}, n, t, {
                          options: Object.assign({}, n.options, t.options),
                          data: Object.assign({}, n.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {})),
                Object.keys(u).map(function (e) {
                  return u[e];
                }))
              );
            return (
              (s.orderedModifiers = f.filter(function (e) {
                return e.enabled;
              })),
              s.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  r = void 0 === n ? {} : n,
                  a = e.effect;
                if ("function" == typeof a) {
                  var o = a({ state: s, name: t, instance: c, options: r }),
                    i = function () {};
                  l.push(o || i);
                }
              }),
              c.update()
            );
          },
          forceUpdate: function () {
            if (!u) {
              var e = s.elements,
                t = e.reference,
                n = e.popper;
              if (HS(t, n)) {
                (s.rects = {
                  reference: MS(t, pS(n), "fixed" === s.options.strategy),
                  popper: iS(n),
                }),
                  (s.reset = !1),
                  (s.placement = s.options.placement),
                  s.orderedModifiers.forEach(function (e) {
                    return (s.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var r = 0; r < s.orderedModifiers.length; r++)
                  if (!0 !== s.reset) {
                    var a = s.orderedModifiers[r],
                      o = a.fn,
                      i = a.options,
                      l = void 0 === i ? {} : i,
                      d = a.name;
                    "function" == typeof o &&
                      (s =
                        o({ state: s, options: l, name: d, instance: c }) || s);
                  } else (s.reset = !1), (r = -1);
              }
            }
          },
          update:
            ((a = function () {
              return new Promise(function (e) {
                c.forceUpdate(), e(s);
              });
            }),
            function () {
              return (
                i ||
                  (i = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (i = void 0), e(a());
                    });
                  })),
                i
              );
            }),
          destroy: function () {
            d(), (u = !0);
          },
        };
      if (!HS(e, t)) return c;
      function d() {
        l.forEach(function (e) {
          return e();
        }),
          (l = []);
      }
      return (
        c.setOptions(n).then(function (e) {
          !u && n.onFirstUpdate && n.onFirstUpdate(e);
        }),
        c
      );
    };
  }
  var BS = VS({
    defaultModifiers: [
      {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function () {},
        effect: function (e) {
          var t = e.state,
            n = e.instance,
            r = e.options,
            a = r.scroll,
            o = void 0 === a || a,
            i = r.resize,
            s = void 0 === i || i,
            l = q_(t.elements.popper),
            u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
          return (
            o &&
              u.forEach(function (e) {
                e.addEventListener("scroll", n.update, _S);
              }),
            s && l.addEventListener("resize", n.update, _S),
            function () {
              o &&
                u.forEach(function (e) {
                  e.removeEventListener("scroll", n.update, _S);
                }),
                s && l.removeEventListener("resize", n.update, _S);
            }
          );
        },
        data: {},
      },
      {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function (e) {
          var t = e.state,
            n = e.name;
          t.modifiersData[n] = IS({
            reference: t.rects.reference,
            element: t.rects.popper,
            strategy: "absolute",
            placement: t.placement,
          });
        },
        data: {},
      },
      {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function (e) {
          var t = e.state,
            n = e.options,
            r = n.gpuAcceleration,
            a = void 0 === r || r,
            o = n.adaptive,
            i = void 0 === o || o,
            s = n.roundOffsets,
            l = void 0 === s || s,
            u = {
              placement: Q_(t.placement),
              variation: yS(t.placement),
              popper: t.elements.popper,
              popperRect: t.rects.popper,
              gpuAcceleration: a,
              isFixed: "fixed" === t.options.strategy,
            };
          null != t.modifiersData.popperOffsets &&
            (t.styles.popper = Object.assign(
              {},
              t.styles.popper,
              wS(
                Object.assign({}, u, {
                  offsets: t.modifiersData.popperOffsets,
                  position: t.options.strategy,
                  adaptive: i,
                  roundOffsets: l,
                })
              )
            )),
            null != t.modifiersData.arrow &&
              (t.styles.arrow = Object.assign(
                {},
                t.styles.arrow,
                wS(
                  Object.assign({}, u, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: l,
                  })
                )
              )),
            (t.attributes.popper = Object.assign({}, t.attributes.popper, {
              "data-popper-placement": t.placement,
            }));
        },
        data: {},
      },
      Y_,
      {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: ["popperOffsets"],
        fn: function (e) {
          var t = e.state,
            n = e.options,
            r = e.name,
            a = n.offset,
            o = void 0 === a ? [0, 0] : a,
            i = K_.reduce(function (e, n) {
              return (
                (e[n] = (function (e, t, n) {
                  var r = Q_(e),
                    a = [z_, I_].indexOf(r) >= 0 ? -1 : 1,
                    o =
                      "function" == typeof n
                        ? n(Object.assign({}, t, { placement: e }))
                        : n,
                    i = o[0],
                    s = o[1];
                  return (
                    (i = i || 0),
                    (s = (s || 0) * a),
                    [z_, D_].indexOf(r) >= 0 ? { x: s, y: i } : { x: i, y: s }
                  );
                })(n, t.rects, o)),
                e
              );
            }, {}),
            s = i[t.placement],
            l = s.x,
            u = s.y;
          null != t.modifiersData.popperOffsets &&
            ((t.modifiersData.popperOffsets.x += l),
            (t.modifiersData.popperOffsets.y += u)),
            (t.modifiersData[r] = i);
        },
      },
      {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function (e) {
          var t = e.state,
            n = e.options,
            r = e.name;
          if (!t.modifiersData[r]._skip) {
            for (
              var a = n.mainAxis,
                o = void 0 === a || a,
                i = n.altAxis,
                s = void 0 === i || i,
                l = n.fallbackPlacements,
                u = n.padding,
                c = n.boundary,
                d = n.rootBoundary,
                f = n.altBoundary,
                p = n.flipVariations,
                h = void 0 === p || p,
                g = n.allowedAutoPlacements,
                m = t.options.placement,
                v = Q_(m),
                y =
                  l ||
                  (v === m || !h
                    ? [ES(m)]
                    : (function (e) {
                        if (Q_(e) === M_) return [];
                        var t = ES(e);
                        return [OS(e), t, OS(t)];
                      })(m)),
                b = [m].concat(y).reduce(function (e, n) {
                  return e.concat(
                    Q_(n) === M_
                      ? (function (e, t) {
                          void 0 === t && (t = {});
                          var n = t,
                            r = n.placement,
                            a = n.boundary,
                            o = n.rootBoundary,
                            i = n.padding,
                            s = n.flipVariations,
                            l = n.allowedAutoPlacements,
                            u = void 0 === l ? K_ : l,
                            c = yS(r),
                            d = c
                              ? s
                                ? W_
                                : W_.filter(function (e) {
                                    return yS(e) === c;
                                  })
                              : U_,
                            f = d.filter(function (e) {
                              return u.indexOf(e) >= 0;
                            });
                          0 === f.length && (f = d);
                          var p = f.reduce(function (t, n) {
                            return (
                              (t[n] = AS(e, {
                                placement: n,
                                boundary: a,
                                rootBoundary: o,
                                padding: i,
                              })[Q_(n)]),
                              t
                            );
                          }, {});
                          return Object.keys(p).sort(function (e, t) {
                            return p[e] - p[t];
                          });
                        })(t, {
                          placement: n,
                          boundary: c,
                          rootBoundary: d,
                          padding: u,
                          flipVariations: h,
                          allowedAutoPlacements: g,
                        })
                      : n
                  );
                }, []),
                w = t.rects.reference,
                _ = t.rects.popper,
                S = new Map(),
                E = !0,
                k = b[0],
                O = 0;
              O < b.length;
              O++
            ) {
              var x = b[O],
                C = Q_(x),
                T = yS(x) === F_,
                N = [I_, A_].indexOf(C) >= 0,
                R = N ? "width" : "height",
                L = AS(t, {
                  placement: x,
                  boundary: c,
                  rootBoundary: d,
                  altBoundary: f,
                  padding: u,
                }),
                P = N ? (T ? D_ : z_) : T ? A_ : I_;
              w[R] > _[R] && (P = ES(P));
              var j = ES(P),
                I = [];
              if (
                (o && I.push(L[C] <= 0),
                s && I.push(L[P] <= 0, L[j] <= 0),
                I.every(function (e) {
                  return e;
                }))
              ) {
                (k = x), (E = !1);
                break;
              }
              S.set(x, I);
            }
            if (E)
              for (
                var A = function (e) {
                    var t = b.find(function (t) {
                      var n = S.get(t);
                      if (n)
                        return n.slice(0, e).every(function (e) {
                          return e;
                        });
                    });
                    if (t) return (k = t), "break";
                  },
                  D = h ? 3 : 1;
                D > 0;
                D--
              ) {
                if ("break" === A(D)) break;
              }
            t.placement !== k &&
              ((t.modifiersData[r]._skip = !0),
              (t.placement = k),
              (t.reset = !0));
          }
        },
        requiresIfExists: ["offset"],
        data: { _skip: !1 },
      },
      {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function (e) {
          var t = e.state,
            n = e.options,
            r = e.name,
            a = n.mainAxis,
            o = void 0 === a || a,
            i = n.altAxis,
            s = void 0 !== i && i,
            l = n.boundary,
            u = n.rootBoundary,
            c = n.altBoundary,
            d = n.padding,
            f = n.tether,
            p = void 0 === f || f,
            h = n.tetherOffset,
            g = void 0 === h ? 0 : h,
            m = AS(t, {
              boundary: l,
              rootBoundary: u,
              padding: d,
              altBoundary: c,
            }),
            v = Q_(t.placement),
            y = yS(t.placement),
            b = !y,
            w = hS(v),
            _ = "x" === w ? "y" : "x",
            S = t.modifiersData.popperOffsets,
            E = t.rects.reference,
            k = t.rects.popper,
            O =
              "function" == typeof g
                ? g(Object.assign({}, t.rects, { placement: t.placement }))
                : g,
            x =
              "number" == typeof O
                ? { mainAxis: O, altAxis: O }
                : Object.assign({ mainAxis: 0, altAxis: 0 }, O),
            C = t.modifiersData.offset
              ? t.modifiersData.offset[t.placement]
              : null,
            T = { x: 0, y: 0 };
          if (S) {
            if (o) {
              var N,
                R = "y" === w ? I_ : z_,
                L = "y" === w ? A_ : D_,
                P = "y" === w ? "height" : "width",
                j = S[w],
                I = j + m[R],
                A = j - m[L],
                D = p ? -k[P] / 2 : 0,
                z = y === F_ ? E[P] : k[P],
                M = y === F_ ? -k[P] : -E[P],
                U = t.elements.arrow,
                F = p && U ? iS(U) : { width: 0, height: 0 },
                H = t.modifiersData["arrow#persistent"]
                  ? t.modifiersData["arrow#persistent"].padding
                  : { top: 0, right: 0, bottom: 0, left: 0 },
                V = H[R],
                B = H[L],
                W = gS(0, E[P], F[P]),
                K = b
                  ? E[P] / 2 - D - W - V - x.mainAxis
                  : z - W - V - x.mainAxis,
                $ = b
                  ? -E[P] / 2 + D + W + B + x.mainAxis
                  : M + W + B + x.mainAxis,
                G = t.elements.arrow && pS(t.elements.arrow),
                q = G ? ("y" === w ? G.clientTop || 0 : G.clientLeft || 0) : 0,
                X = null != (N = null == C ? void 0 : C[w]) ? N : 0,
                J = j + $ - X,
                Z = gS(p ? tS(I, j + K - X - q) : I, j, p ? eS(A, J) : A);
              (S[w] = Z), (T[w] = Z - j);
            }
            if (s) {
              var Y,
                Q = "x" === w ? I_ : z_,
                ee = "x" === w ? A_ : D_,
                te = S[_],
                ne = "y" === _ ? "height" : "width",
                re = te + m[Q],
                ae = te - m[ee],
                oe = -1 !== [I_, z_].indexOf(v),
                ie = null != (Y = null == C ? void 0 : C[_]) ? Y : 0,
                se = oe ? re : te - E[ne] - k[ne] - ie + x.altAxis,
                le = oe ? te + E[ne] + k[ne] - ie - x.altAxis : ae,
                ue =
                  p && oe
                    ? (de = gS(se, te, (ce = le))) > ce
                      ? ce
                      : de
                    : gS(p ? se : re, te, p ? le : ae);
              (S[_] = ue), (T[_] = ue - te);
            }
            var ce, de;
            t.modifiersData[r] = T;
          }
        },
        requiresIfExists: ["offset"],
      },
      {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function (e) {
          var t,
            n = e.state,
            r = e.name,
            a = e.options,
            o = n.elements.arrow,
            i = n.modifiersData.popperOffsets,
            s = Q_(n.placement),
            l = hS(s),
            u = [z_, D_].indexOf(s) >= 0 ? "height" : "width";
          if (o && i) {
            var c = (function (e, t) {
                return mS(
                  "number" !=
                    typeof (e =
                      "function" == typeof e
                        ? e(
                            Object.assign({}, t.rects, {
                              placement: t.placement,
                            })
                          )
                        : e)
                    ? e
                    : vS(e, U_)
                );
              })(a.padding, n),
              d = iS(o),
              f = "y" === l ? I_ : z_,
              p = "y" === l ? A_ : D_,
              h =
                n.rects.reference[u] +
                n.rects.reference[l] -
                i[l] -
                n.rects.popper[u],
              g = i[l] - n.rects.reference[l],
              m = pS(o),
              v = m
                ? "y" === l
                  ? m.clientHeight || 0
                  : m.clientWidth || 0
                : 0,
              y = h / 2 - g / 2,
              b = c[f],
              w = v - d[u] - c[p],
              _ = v / 2 - d[u] / 2 + y,
              S = gS(b, _, w),
              E = l;
            n.modifiersData[r] =
              (((t = {})[E] = S), (t.centerOffset = S - _), t);
          }
        },
        effect: function (e) {
          var t = e.state,
            n = e.options.element,
            r = void 0 === n ? "[data-popper-arrow]" : n;
          null != r &&
            ("string" != typeof r ||
              (r = t.elements.popper.querySelector(r))) &&
            sS(t.elements.popper, r) &&
            (t.elements.arrow = r);
        },
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"],
      },
      {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: function (e) {
          var t = e.state,
            n = e.name,
            r = t.rects.reference,
            a = t.rects.popper,
            o = t.modifiersData.preventOverflow,
            i = AS(t, { elementContext: "reference" }),
            s = AS(t, { altBoundary: !0 }),
            l = DS(i, r),
            u = DS(s, a, o),
            c = zS(l),
            d = zS(u);
          (t.modifiersData[n] = {
            referenceClippingOffsets: l,
            popperEscapeOffsets: u,
            isReferenceHidden: c,
            hasPopperEscaped: d,
          }),
            (t.attributes.popper = Object.assign({}, t.attributes.popper, {
              "data-popper-reference-hidden": c,
              "data-popper-escaped": d,
            }));
        },
      },
    ],
  });
  const WS = Ft.forwardRef(function (e, t) {
    const { children: n, container: r, disablePortal: a = !1 } = e,
      [o, i] = Ft.useState(null),
      s = E_(Ft.isValidElement(n) ? n.ref : null, t);
    if (
      (S_(() => {
        a ||
          i(
            (function (e) {
              return "function" == typeof e ? e() : e;
            })(r) || document.body
          );
      }, [r, a]),
      S_(() => {
        if (o && !a)
          return (
            __(t, o),
            () => {
              __(t, null);
            }
          );
      }, [t, o, a]),
      a)
    ) {
      if (Ft.isValidElement(n)) {
        const e = { ref: s };
        return Ft.cloneElement(n, e);
      }
      return tr.jsx(Ft.Fragment, { children: n });
    }
    return tr.jsx(Ft.Fragment, { children: o ? sh.createPortal(n, o) : o });
  });
  function KS(e) {
    return C_("MuiPopper", e);
  }
  !(function (e, t, n = "Mui") {
    const r = {};
    t.forEach((t) => {
      r[t] = C_(e, t, n);
    });
  })("MuiPopper", ["root"]);
  const $S = [
      "anchorEl",
      "children",
      "direction",
      "disablePortal",
      "modifiers",
      "open",
      "placement",
      "popperOptions",
      "popperRef",
      "slotProps",
      "slots",
      "TransitionProps",
      "ownerState",
    ],
    GS = [
      "anchorEl",
      "children",
      "container",
      "direction",
      "disablePortal",
      "keepMounted",
      "modifiers",
      "open",
      "placement",
      "popperOptions",
      "popperRef",
      "style",
      "transition",
      "slotProps",
      "slots",
    ];
  function qS(e) {
    return "function" == typeof e ? e() : e;
  }
  const XS = () =>
      (function (e, t, n) {
        const r = {};
        return (
          Object.keys(e).forEach((a) => {
            r[a] = e[a]
              .reduce((e, r) => {
                if (r) {
                  const a = t(r);
                  "" !== a && e.push(a), n && n[r] && e.push(n[r]);
                }
                return e;
              }, [])
              .join(" ");
          }),
          r
        );
      })(
        { root: ["root"] },
        (function (e) {
          const { disableDefaultClasses: t } = Ft.useContext(b_);
          return (n) => (t ? "" : e(n));
        })(KS)
      ),
    JS = {},
    ZS = Ft.forwardRef(function (e, t) {
      var n;
      const {
          anchorEl: r,
          children: a,
          direction: o,
          disablePortal: i,
          modifiers: s,
          open: l,
          placement: u,
          popperOptions: c,
          popperRef: d,
          slotProps: f = {},
          slots: p = {},
          TransitionProps: h,
        } = e,
        g = nt(e, $S),
        m = Ft.useRef(null),
        v = E_(m, t),
        y = Ft.useRef(null),
        b = E_(y, d),
        w = Ft.useRef(b);
      S_(() => {
        w.current = b;
      }, [b]),
        Ft.useImperativeHandle(d, () => y.current, []);
      const _ = (function (e, t) {
          if ("ltr" === t) return e;
          switch (e) {
            case "bottom-end":
              return "bottom-start";
            case "bottom-start":
              return "bottom-end";
            case "top-end":
              return "top-start";
            case "top-start":
              return "top-end";
            default:
              return e;
          }
        })(u, o),
        [S, E] = Ft.useState(_),
        [k, O] = Ft.useState(qS(r));
      Ft.useEffect(() => {
        y.current && y.current.forceUpdate();
      }),
        Ft.useEffect(() => {
          r && O(qS(r));
        }, [r]),
        S_(() => {
          if (!k || !l) return;
          let e = [
            { name: "preventOverflow", options: { altBoundary: i } },
            { name: "flip", options: { altBoundary: i } },
            {
              name: "onUpdate",
              enabled: !0,
              phase: "afterWrite",
              fn: ({ state: e }) => {
                E(e.placement);
              },
            },
          ];
          null != s && (e = e.concat(s)),
            c && null != c.modifiers && (e = e.concat(c.modifiers));
          const t = BS(k, m.current, v_({ placement: _ }, c, { modifiers: e }));
          return (
            w.current(t),
            () => {
              t.destroy(), w.current(null);
            }
          );
        }, [k, i, s, l, c, _]);
      const x = { placement: S };
      null !== h && (x.TransitionProps = h);
      const C = XS(),
        T = null != (n = p.root) ? n : "div",
        N = j_({
          elementType: T,
          externalSlotProps: f.root,
          externalForwardedProps: g,
          additionalProps: { role: "tooltip", ref: v },
          ownerState: e,
          className: C.root,
        });
      return tr.jsx(
        T,
        v_({}, N, { children: "function" == typeof a ? a(x) : a })
      );
    }),
    YS = Ft.forwardRef(function (e, t) {
      const {
          anchorEl: n,
          children: r,
          container: a,
          direction: o = "ltr",
          disablePortal: i = !1,
          keepMounted: s = !1,
          modifiers: l,
          open: u,
          placement: c = "bottom",
          popperOptions: d = JS,
          popperRef: f,
          style: p,
          transition: h = !1,
          slotProps: g = {},
          slots: m = {},
        } = e,
        v = nt(e, GS),
        [y, b] = Ft.useState(!0);
      if (!s && !u && (!h || y)) return null;
      let w;
      if (a) w = a;
      else if (n) {
        const e = qS(n);
        w = e && void 0 !== e.nodeType ? w_(e).body : w_(null).body;
      }
      const _ = u || !s || (h && !y) ? void 0 : "none",
        S = h
          ? {
              in: u,
              onEnter: () => {
                b(!1);
              },
              onExited: () => {
                b(!0);
              },
            }
          : void 0;
      return tr.jsx(WS, {
        disablePortal: i,
        container: w,
        children: tr.jsx(
          ZS,
          v_(
            {
              anchorEl: n,
              direction: o,
              disablePortal: i,
              modifiers: l,
              ref: t,
              open: h ? !y : u,
              placement: c,
              popperOptions: d,
              popperRef: f,
              slotProps: g,
              slots: m,
            },
            v,
            {
              style: v_({ position: "fixed", top: 0, left: 0, display: _ }, p),
              TransitionProps: S,
              children: r,
            }
          )
        ),
      });
    });
  function QS({
    placement: e,
    tooltip: t,
    children: n,
    container: r = null,
    hoverClassName: a,
  }) {
    var o, i;
    const [s, l] = Ft.useState(!1),
      u = Ft.useRef(null);
    const c =
      ((null == (o = u.current) ? void 0 : o.offsetWidth) || 0) <
      ((null == (i = u.current) ? void 0 : i.scrollWidth) || 0);
    return tr.jsxs(tr.Fragment, {
      children: [
        Ht.cloneElement(n, {
          ref: u,
          onMouseEnter: function () {
            u.current instanceof HTMLElement && a && u.current.classList.add(a),
              l(!0);
          },
          onMouseLeave: function () {
            u.current instanceof HTMLElement &&
              a &&
              u.current.classList.remove(a),
              l(!1);
          },
        }),
        tr.jsx(YS, {
          open: s && c,
          anchorEl: u.current,
          container: r,
          placement: e,
          slotProps: { root: { className: "tooltip-hmg-common" } },
          children: t,
        }),
      ],
    });
  }
  const eE = ({ title: e }) => {
    const t = Uh((e) => e.stage);
    return tr.jsxs("h1", {
      className: "header-hmg-common__logo",
      children: [
        tr.jsx(QS, {
          tooltip: tr.jsx("div", { children: e }),
          children: tr.jsx("a", {
            className: "header-hmg-common__lnk",
            children: e,
          }),
        }),
        tr.jsx("a", {
          className: "header-hmg-common__lnk",
          style: { position: "absolute", opacity: 0, zIndex: -1 },
          children: e,
        }),
        false,
        t !== An.PROD &&
          tr.jsx("span", {
            className: "header-hmg-common__ico-badge",
            children: t,
          }),
      ],
    });
  };
  function tE() {
    const { t: e } = Wn(),
      { dropdownRef: t, buttonRef: n, isOpen: r, setIsOpen: a } = Qw(),
      { name: o, rankName: i, department: s, getMyUserData: l } = $m((e) => e),
      { stage: u, projectCode: c } = Uh((e) => e),
      { getIsManager: d, displayName: f, department: p } = qm((e) => e),
      { logout: h } = lv((e) => e);
    return (
      Ft.useEffect(() => {
        null == l || l();
      }, []),
      tr.jsxs("div", {
        className: u_(
          "header-hmg-common__dropdown header-hmg-common__dropdown-user",
          r && "is_selected"
        ),
        ref: t,
        children: [
          tr.jsxs("button", {
            type: "button",
            className: "header-hmg-common__dropdown-btn-top",
            ref: n,
            onClick: () => a(!r),
            style: { textAlign: "center" },
            children: [
              (s ?? (p && "-" !== p)) &&
                tr.jsx("span", {
                  className: "header-hmg-common__dropdown-btn-txt",
                  children: s ?? p ?? "",
                }),
              tr.jsx("span", {
                className: "header-hmg-common__dropdown-btn-txt",
                children: o ? `${o} ${i ?? ""}` : f,
              }),
            ],
          }),
          r &&
            tr.jsx("div", {
              className: "header-hmg-common__dropdown-box",
              children: tr.jsxs("ul", {
                className: "header-hmg-common__dropdown-lst",
                children: [
                  tr.jsx("li", {
                    className: "header-hmg-common__dropdown-item",
                    children: tr.jsx("a", {
                      href: Dn[u].HMG_HOME,
                      className:
                        "header-hmg-common__dropdown-lnk header-hmg-common__dropdown-lnk--selected",
                      children: e("LABEL_HOME"),
                    }),
                  }),
                  d() &&
                    tr.jsx("li", {
                      className: "header-hmg-common__dropdown-item",
                      children: tr.jsx("a", {
                        href: `${Dn[u].HMG_HOME}/projects/${c}`,
                        className: "header-hmg-common__dropdown-lnk",
                        children: e("LABEL_SYSTEM_SETTING"),
                      }),
                    }),
                  tr.jsx("li", {
                    className: "header-hmg-common__dropdown-item",
                    children: tr.jsx("a", {
                      className: "header-hmg-common__dropdown-lnk",
                      href: "#",
                      onClick: (e) => {
                        e.preventDefault(), null == h || h();
                      },
                      children: e("LABEL_LOGOUT"),
                    }),
                  }),
                ],
              }),
            }),
        ],
      })
    );
  }
  function nE({ roles: e }) {
    var t, n;
    const { dropdownRef: r, isOpen: a, setIsOpen: o } = Qw(),
      { siteCode: i, currentState: s } = $m((e) => e),
      { stage: l, projectCode: u } = Uh((e) => e),
      { t: c, language: d } = Wn(),
      { myRoleSetting: f, putRoleSetting: p } = Ym((e) => e),
      [h, g] = Ft.useState(
        (null == (t = f[i || ""]) ? void 0 : t.map((e) => Boolean(e.ck))) || []
      ),
      m = e
        .filter((e, t) => h[t])
        .map((e) => {
          var t;
          return (
            (null == (t = Ww(e.multilingual, d)) ? void 0 : t.name) ||
            e.roleName[d]
          );
        })
        .join(", ");
    return e && 0 !== e.length
      ? tr.jsxs("div", {
          className: u_(
            "header-hmg-common__dropdown header-hmg-common__dropdown-system",
            a && "is_selected"
          ),
          ref: r,
          children: [
            tr.jsx("button", {
              type: "button",
              className: "header-hmg-common__dropdown-btn-top",
              onClick: () => o(!a),
              children: tr.jsxs("span", {
                className: "header-hmg-common__dropdown-btn-top-txt",
                children: [c("LABEL_MY_ROLE"), " : ", m],
              }),
            }),
            a &&
              tr.jsxs("div", {
                className: "header-hmg-common__dropdown-box",
                children: [
                  tr.jsxs("ul", {
                    className: "header-hmg-common__dropdown-lst",
                    children: [
                      tr.jsx("li", {
                        className: "header-hmg-common__dropdown-item",
                        children: tr.jsxs("span", {
                          className: "chk_box",
                          children: [
                            tr.jsx("input", {
                              type: "checkbox",
                              className: "inp_chk",
                              id: "chk1",
                              checked:
                                null ==
                                (n = h.filter((t, n) => {
                                  var r;
                                  return (
                                    !1 ===
                                    (null == (r = e.find((e, t) => n === t))
                                      ? void 0
                                      : r.disabled)
                                  );
                                }))
                                  ? void 0
                                  : n.every(Boolean),
                              onChange: (t) =>
                                ((t) => {
                                  if (t)
                                    g(
                                      Array.from(
                                        { length: e.length },
                                        (t, n) => {
                                          var r;
                                          return (
                                            !1 ===
                                            (null ==
                                            (r = e.find((e, t) => n === t))
                                              ? void 0
                                              : r.disabled)
                                          );
                                        }
                                      )
                                    ),
                                      (s.roleIds = e
                                        .filter((e) => !1 === e.disabled)
                                        .map((e) => e.id));
                                  else {
                                    const t = e.findIndex(
                                      (e) => !1 === e.disabled
                                    );
                                    g(
                                      Array.from(
                                        { length: e.length },
                                        (e, n) => n === t
                                      )
                                    ),
                                      (s.roleIds = e
                                        .filter(
                                          (e, n) => !1 === e.disabled && n === t
                                        )
                                        .map((e) => e.id));
                                  }
                                  (s.roleIds = Array.from(new Set(s.roleIds))),
                                    p({
                                      ...Zm.getState().myRoleSetting,
                                      [i || ""]: e.map((e, n) => ({
                                        id: e.id,
                                        ck: e.disabled
                                          ? 0
                                          : t || 0 === n
                                          ? 1
                                          : 0,
                                      })),
                                    });
                                })(t.target.checked),
                            }),
                            tr.jsx("label", {
                              htmlFor: "chk1",
                              className: "lbl",
                              children: c("LABEL_SELECT_ALL_ROLE"),
                            }),
                          ],
                        }),
                      }),
                      null == e
                        ? void 0
                        : e.map((t, n) => {
                            var r;
                            return tr.jsx(
                              "li",
                              {
                                className: u_(
                                  "header-hmg-common__dropdown-item"
                                ),
                                children: tr.jsxs("span", {
                                  className: "chk_box",
                                  children: [
                                    tr.jsx("input", {
                                      type: "checkbox",
                                      className: "inp_chk",
                                      id: `chk1_${t.roleId}`,
                                      checked: !t.disabled && h[n],
                                      onChange: (t) =>
                                        ((t, n) => {
                                          const r = [...h];
                                          (1 === r.filter((e) => e).length &&
                                            r[t]) ||
                                            ((r[t] = n),
                                            n
                                              ? s.roleIds.push(e[t].id)
                                              : (s.roleIds = s.roleIds.filter(
                                                  (n) =>
                                                    n !==
                                                    (null == e
                                                      ? void 0
                                                      : e[t].id)
                                                )),
                                            (s.roleIds = Array.from(
                                              new Set(s.roleIds)
                                            )),
                                            g(r),
                                            p({
                                              ...Zm.getState().myRoleSetting,
                                              [i || ""]: e.map((e, t) => ({
                                                id: e.id,
                                                ck: e.disabled
                                                  ? 0
                                                  : r[t]
                                                  ? 1
                                                  : 0,
                                              })),
                                            }));
                                        })(n, t.target.checked),
                                      disabled: t.disabled,
                                    }),
                                    tr.jsx("label", {
                                      htmlFor: `chk1_${t.roleId}`,
                                      className: "lbl",
                                      children:
                                        (null == (r = Ww(t.multilingual, d))
                                          ? void 0
                                          : r.name) || t.roleName[d],
                                    }),
                                  ],
                                }),
                              },
                              t.id
                            );
                          }),
                    ],
                  }),
                  tr.jsx("a", {
                    type: "button",
                    className: "header-hmg-common__system-dropdown-btn",
                    href: `${Dn[l].HMG_HOME}/apply?apply=projectCode-${u}`,
                    children: c("LABEL_ADD_NEW_ROLE"),
                  }),
                ],
              }),
          ],
        })
      : null;
  }
  function rE() {
    const { t: e, language: t } = Wn(),
      { tagIds: n } = qm((e) => e),
      { tags: r } = iv((e) => e);
    return n && n.length > 0
      ? tr.jsxs("div", {
          className:
            "header-hmg-common__tag header-hmg-common__has-tooltip-hover-event",
          "data-tooltip": "true",
          children: [
            tr.jsx("span", {
              className: "header-hmg-common__tag-label",
              children: e("LABEL_TAG"),
            }),
            tr.jsx("div", {
              className: "tooltip-hmg-common tooltip-hmg-common_tag",
              style: { top: 24, left: 0 },
              children: tr.jsxs("div", {
                className: "tooltip-hmg-common_tag_box",
                children: [
                  tr.jsx("strong", { children: e("LABEL_SHOW_ALL_TAGS") }),
                  tr.jsx("div", {
                    className: "scroll_wrap",
                    children: tr.jsx("ul", {
                      className: "tag_list",
                      children:
                        null == r
                          ? void 0
                          : r
                              .filter((e) => n.includes(e.id))
                              .map((e) => {
                                const n = Ww(e.multilingual, t);
                                return tr.jsx(
                                  "li",
                                  {
                                    className: "tag_name",
                                    children:
                                      (null == n ? void 0 : n.name) ||
                                      e.multilingual.KO.name,
                                  },
                                  e.id
                                );
                              }),
                    }),
                  }),
                ],
              }),
            }),
          ],
        })
      : null;
  }
  function aE() {
    const {
        projectName: e,
        project: t,
        menus: n,
        getMetadata: r,
      } = iv((e) => e),
      { siteCode: a } = qm((e) => e),
      o = Ym((e) => e.getAssignedRoles),
      { language: i } = Wn(),
      s = Ww(null == t ? void 0 : t.multilingual, i),
      l = o();
    return (
      Ft.useEffect(() => {
        null == r || r();
      }, []),
      void 0 === n
        ? tr.jsx("header", {
            className: "header-hmg-common",
            style: { height: 58 },
          })
        : tr.jsxs("header", {
            className: u_("header-hmg-common", Kw(a)),
            children: [
              tr.jsx(m_, {}),
              tr.jsxs("div", {
                className: "header-hmg-common__inner",
                children: [
                  tr.jsx("div", {
                    className: "header-hmg-common__section",
                    style: { paddingRight: 336 },
                    children: tr.jsxs("div", {
                      className: "header-hmg-common__section_inner",
                      children: [
                        tr.jsx(eE, {
                          title:
                            (null == s ? void 0 : s.name) ||
                            (null == e ? void 0 : e[i]) ||
                            "",
                        }),
                        l && tr.jsx(nE, { roles: l }),
                        tr.jsx(rE, {}),
                      ],
                    }),
                  }),
                  tr.jsx("div", {
                    className: "header-hmg-common__section",
                    children: tr.jsxs("div", {
                      className: "header-hmg-common__section_inner",
                      children: [
                        tr.jsx(p_, {}),
                        tr.jsx(c_, {}),
                        tr.jsx(tE, {}),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          })
    );
  }
  const oE = ({ site: e }) => {
      const { siteCode: t } = $m((e) => e),
        n = lv((e) => e.getSiteCodeUrl),
        r = Gw(e),
        a = n(e.sc);
      return r
        ? tr.jsx("li", {
            children: tr.jsx("a", {
              href: a,
              className: u_(
                "dropdown-hmg-common_item",
                e.sc === t && "dropdown-hmg-common_item--selected",
                !a && "dropdown-hmg-common_item--disabled"
              ),
              children: r,
            }),
          })
        : null;
    },
    iE = () => {
      const { t: e } = Wn(),
        { siteCode: t } = $m((e) => e),
        { siteData: n } = iv((e) => e),
        { dropdownRef: r, isOpen: a, setIsOpen: o } = Qw(),
        { sites: i } = qm((e) => e),
        s = Gw((null == n ? void 0 : n[t || ""]) || {}),
        l = i
          .map((e) => ({ ...(null == n ? void 0 : n[e.sc]), sc: e.sc }))
          .filter((e) => e.abbrName);
      return s
        ? tr.jsxs(tr.Fragment, {
            children: [
              tr.jsx("h2", {
                className: "lnb_tit",
                children: e("LABEL_SELECT_SITE"),
              }),
              tr.jsxs("div", {
                className: u_(
                  "dropdown-hmg-common lnb_dropdown",
                  a && "is_open"
                ),
                style: { padding: 0 },
                ref: r,
                children: [
                  tr.jsx("button", {
                    className: "dropdown-hmg-common_btn_top",
                    onClick: () => o(!a),
                    children: s,
                  }),
                  a &&
                    tr.jsx("div", {
                      className: "dropdown-hmg-common_box",
                      children: tr.jsx("ul", {
                        className: "dropdown-hmg-common_lst",
                        children:
                          null == l
                            ? void 0
                            : l.map((e) => tr.jsx(oE, { site: e }, e.sc)),
                      }),
                    }),
                ],
              }),
            ],
          })
        : null;
    },
    sE = () => {
      const { t: e } = Wn();
      return tr.jsx("div", {
        className: "lnb-hmg-common__error",
        children: tr.jsx("p", {
          className: "lnb-hmg-common__error-txt",
          style: { whiteSpace: "pre-line" },
          children: e("DESC_SYSTEM_MENU_NOT_EXIST"),
        }),
      });
    };
  function lE({ item: e, depth: t }) {
    const [n, r] = Ft.useState(!0),
      { menuChangeHandler: a, emit: o } = lv((e) => e),
      i = f_((e) => e.clearTimer),
      { getNoticeData: s } = g_((e) => e),
      { siteCode: l } = $m((e) => e),
      { menus: u } = iv((e) => e),
      { language: c } = Wn(),
      d = Ww(e.multilingual, c),
      f = (e, t) => {
        const n = Bw(u || [], e);
        if (!n) return;
        const {
            to: r,
            urlWithParams: c,
            isSameDomain: d,
          } = Hw(n.url || "", t || []),
          f = {
            menuName: n.name,
            url: n.url,
            siteCode: l,
            urlWithParams: c,
            to: r,
            isSameDomain: d,
            multilingual: n.multilingual,
          };
        null == a || a(f), o("changeMenu", f), null == s || s(), i();
      },
      p = Ft.useRef(null),
      h =
        (function (e, t) {
          if (!e || !t) return !1;
          try {
            const n = new URL(e),
              r = new URL(t),
              a = n.searchParams,
              o = r.searchParams,
              i = Array.from(a.keys()).every(
                (e) => !o.get(e) || a.get(e) === o.get(e)
              ),
              s =
                "/" === n.pathname.slice(-1)
                  ? n.pathname.slice(0, -1)
                  : n.pathname,
              l =
                "/" === r.pathname.slice(-1)
                  ? r.pathname.slice(0, -1)
                  : r.pathname;
            return n.hostname === r.hostname && s === l && i;
          } catch (n) {
            return (
              Fh.logError({ error: `[hmg-Admin] url error, ${e} ${t}` }), !1
            );
          }
        })(e.url || "", window.location.href) && Pw(e, e.url || "", !0),
      g = e.children.filter((e) => e.isVisible).length > 0;
    return (
      Ft.useEffect(() => {
        var e;
        sv.setState({ changeMenu: f }),
          h &&
            (null == (e = p.current) || e.scrollIntoView({ block: "center" }));
      }, []),
      tr.jsxs("li", {
        ref: p,
        className: u_(
          "lnb-hmg-common__menu-item",
          !e.isAccessible && !g && "lnb-hmg-common__menu-item--off",
          h && "lnb-hmg-common__menu-item--selected"
        ),
        children: [
          tr.jsxs("div", {
            className: "lnb-hmg-common__menu-box",
            children: [
              e.children.some((e) => e.isVisible) &&
                tr.jsx("button", {
                  type: "button",
                  className: u_(
                    "lnb-hmg-common__menu-btn",
                    n && "lnb-hmg-common__menu--open"
                  ),
                  style: { ...(t && { paddingLeft: 10 * t + 4 }) },
                  onClick: () => {
                    r(!n);
                  },
                }),
              tr.jsx(QS, {
                tooltip: tr.jsx("div", {
                  children: (null == d ? void 0 : d.name) || e.name,
                }),
                children: tr.jsx("a", {
                  onClick: (t) => {
                    t.altKey ||
                      t.metaKey ||
                      t.ctrlKey ||
                      t.shiftKey ||
                      (t.preventDefault(),
                      e.isAccessible ? f(e.url || "") : r(!n));
                  },
                  href: e.isAccessible ? `${Uw(e.url || "")}` : "#",
                  className: u_(
                    "lnb-hmg-common__menu-lnk",
                    0 === t && "lnb-hmg-common__menu-first"
                  ),
                  style: { ...(0 !== t && !g && { paddingLeft: 10 * t + 4 }) },
                  children: (null == d ? void 0 : d.name) || e.name,
                }),
              }),
            ],
          }),
          n && tr.jsx(uE, { menus: e.children, depth: t + 1 }),
        ],
      })
    );
  }
  function uE({ menus: e, depth: t }) {
    return tr.jsx("ul", {
      className: "lnb-hmg-common__menu-lst",
      children: e
        .filter(({ isVisible: e }) => e)
        .map((e) => tr.jsx(lE, { item: e, depth: t }, e.id)),
    });
  }
  function cE() {
    const { projectName: e, project: t, menus: n } = iv((e) => e),
      { getVisibleNotice: r } = g_((e) => e),
      { setActiveMenuUrl: a } = lv((e) => e),
      { language: o } = Wn(),
      i = Ww(null == t ? void 0 : t.multilingual, o);
    return (
      ((e) => {
        const t = Ft.useRef(window.location.href);
        Ft.useEffect(() => {
          const n = new Event("pushstate"),
            r = window.history.pushState;
          window.history.pushState = function (e, t, a) {
            r.call(window.history, e, t, a), window.dispatchEvent(n);
          };
          const a = () => {
            e(t);
          };
          return (
            window.addEventListener("popstate", a),
            window.addEventListener("pushstate", a),
            () => {
              (window.history.pushState = r),
                window.removeEventListener("popstate", a),
                window.removeEventListener("pushstate", a);
            }
          );
        }, []);
      })(() => {
        a(window.location.origin + window.location.pathname);
      }),
      tr.jsxs("div", {
        className: "lnb-hmg-common__inner",
        style: {
          height: r() ? "calc(-183px + 100vh)" : "calc(-135px + 100vh)",
        },
        children: [
          (null == t ? void 0 : t.isGlobal) && tr.jsx(iE, {}),
          tr.jsx("h2", {
            className: "lnb-hmg-common__tit",
            children:
              (null == i ? void 0 : i.name) || (null == e ? void 0 : e[o]),
          }),
          n && n.filter(({ isVisible: e }) => e).length > 0
            ? tr.jsx(uE, { menus: n, depth: 0 })
            : tr.jsx(sE, {}),
        ],
      })
    );
  }
  function dE() {
    const { t: e } = Wn(),
      { projectCode: t, stage: n } = Uh((e) => e);
    return tr.jsx("div", {
      className: "lnb-hmg-common__bottom",
      children: tr.jsx("a", {
        href: `${Dn[n].HMG_HOME}/projects/${t}/setting`,
        className: "lnb-hmg-common__system-setting-link",
        children: e("LABEL_SYSTEM_SETTING"),
      }),
    });
  }
  const fE = () => {
      const { siteCode: e, getIsManager: t } = qm((e) => e),
        { menus: n, getMetadata: r } = iv((e) => e);
      return (
        Ft.useEffect(() => {
          null == r || r();
        }, []),
        void 0 === n
          ? tr.jsx("aside", {
              className: "lnb-hmg-common",
              style: { height: "calc(-60px + 100vh)" },
            })
          : tr.jsxs("aside", {
              className: u_("lnb-hmg-common", Kw(e)),
              children: [tr.jsx(cE, {}), t() && tr.jsx(dE, {})],
            })
      );
    },
    pE = () => {
      const { siteCode: e } = qm((e) => e);
      return tr.jsx("header", {
        className: u_("header-hmg-common", Kw(e)),
        children: tr.jsx("div", {
          className: "header-hmg-common__inner",
          children: tr.jsx("div", {
            className: "header-hmg-common__section",
            style: { paddingRight: 336 },
            children: tr.jsx("div", {
              className: "header-hmg-common__section_inner",
              children: tr.jsx(eE, { title: "hmg-Admin" }),
            }),
          }),
        }),
      });
    },
    hE = () => {
      const { t: e } = Wn(),
        { siteCode: t } = qm((e) => e),
        { getVisibleNotice: n } = g_((e) => e);
      return tr.jsx("aside", {
        className: u_("lnb-hmg-common", Kw(t)),
        children: tr.jsx("div", {
          className: "lnb-hmg-common__inner",
          style: {
            height: n() ? "calc(-108px + 100vh)" : "calc(-60px + 100vh)",
          },
          children: tr.jsx("div", {
            className: "lnb-hmg-common__error",
            children: tr.jsx("p", {
              className: "lnb-hmg-common__error-txt",
              style: { whiteSpace: "pre-line" },
              children: e("DESC_SYSTEM_MENU_LOAD_FAILED"),
            }),
          }),
        }),
      });
    };
  let gE = null;
  window.hmgAdmin = {
    createHmgAdmin: function (e) {
      if (gE) return gE;
      if (!e.projectCode)
        throw new Error("[hmgAdmin] options.projectCode is required.");
      Fh.setProjectCode(e.projectCode);
      let t = An.PROD;
      if (
        e.stage &&
        ((t = e.stage.toLocaleLowerCase()),
        t !== An.LOCAL && t !== An.PROD && t !== An.STAGE && t !== An.DEV)
      )
        throw new Error(
          "[hmgAdmin] The options.stage must be one of dev, stg or prod."
        );
      const n = { ...e, stage: t };
      Mh.setState(n),
        ((e) => {
          const t = `${Mn}-${e}`;
          s_.persist.setOptions({ name: t }),
            s_.persist.rehydrate(),
            localStorage.removeItem(Mn),
            window.addEventListener("storage", (e) => {
              if (e.key === t) {
                const t = JSON.parse(e.newValue || "{}");
                t.state &&
                  (s_.setState(t.state),
                  s_
                    .getState()
                    .setCurrentLanguageCode(
                      s_.getState().getCurrentLanguageCode()
                    ));
              }
            });
        })(Mh.getState().projectCode),
        ((e) => {
          const t = `${Un}-${e}`;
          d_.persist.setOptions({ name: t }),
            d_.persist.rehydrate(),
            localStorage.removeItem(Un),
            window.addEventListener("storage", (e) => {
              if (e.key === t) {
                const t = JSON.parse(e.newValue || "{}");
                t.state && d_.setState(t.state);
              }
            });
        })(Mh.getState().projectCode),
        Fh.setErrorLogUrl(Dn[Mh.getState().stage].CONFIG_HOST);
      const r = {
        siteCode: jw(new URL(window.location.href), Hn.SITE_CODE) || "",
        roleIds: [],
      };
      Km.setState({ currentState: r, siteCode: r.siteCode });
      const a = Dn[n.stage].COOKIE_TOKEN_PREFIX + e.projectCode,
        o = Dn[n.stage].COOKIE_TOKEN_NAME;
      let i,
        s = null,
        l = null,
        u = null,
        c = null,
        d = !1;
      const f = Hh.getState().getMySsoHostUrl,
        p = {
          changeMenu: [],
          changeSiteCode: [],
          changeLanguage: [],
          changeRole: [],
        };
      async function h() {
        function e(e, r, a) {
          const o = [e, a];
          return [An.LOCAL, An.DEV].includes(t)
            ? o.includes("EU")
              ? Dn[t].SSO_HOST_EU
              : Dn[t].SSO_HOST
            : o.includes("EU")
            ? Dn[t].SSO_HOST_EU
            : o.includes("US")
            ? Dn[t].SSO_HOST_US
            : o.includes("HQ")
            ? Dn[t].SSO_HOST
            : "string" == typeof r
            ? r
            : Dn[n.stage].SSO_HOST;
        }
        try {
          const t = `${a}-dynamic-url`,
            r = Nw(t),
            o = Hh.getState().getCustomRegion();
          if (r) {
            const { region: t, url: n } = JSON.parse(r);
            return e(t, n, o);
          }
          const i = `${Dn[n.stage].CONFIG_HOST}/dynamic/api-url`,
            s = await fetch(i, { method: "GET" }),
            l = await s.json();
          Tw(t, JSON.stringify(l), 5);
          const { region: u, url: c } = l;
          return e(u, c, o);
        } catch (r) {
          return Fh.logError({ error: r.message }), Dn[n.stage].SSO_HOST;
        }
      }
      async function g() {
        return (
          c ||
          ((c = new Promise(async (e, t) => {
            Hh.setState({ mySsoHostUrl: await h() });
            const s = new URLSearchParams(window.location.search),
              l = s.get(Hn.SSO_FLOW_CODE),
              u = s.get(Hn.REDIRECT_CODE),
              c = "" === s.get(Hn.ROLE_CODE),
              d = T();
            if (c) {
              await Wm(Xm()), s.delete(Hn.ROLE_CODE);
              const e = s.toString() ? `?${s.toString()}` : "";
              window.history.replaceState(
                window.history.state,
                "",
                `${window.location.pathname}${e}`
              );
            }
            if ("l" !== l) {
              if (d) {
                try {
                  Gm.setState(Ow(d)), (i = Gm.getState());
                } catch (f) {
                  return (
                    Fh.logError({ error: f.message }),
                    Rw(a),
                    Rw(o),
                    void t("[hmg-Admin] Token parse error")
                  );
                }
                const { sites: s } = i,
                  c = s.length > 0;
                c &&
                  ((r.siteCode && s.some((e) => e.sc === r.siteCode)) ||
                    (r.siteCode = s[0].sc));
                const p = { ...(c && { [Hn.SITE_CODE]: r.siteCode }) };
                Km.setState({ siteCode: r.siteCode });
                let h = d;
                if (1e3 * +i.expired <= Date.now()) {
                  const e = await m({ jwt: d });
                  if (e) h = e;
                  else {
                    const e = await m({ retry: !0 });
                    if (e)
                      return void x("s" === l && u ? u : window.location.href);
                    if (void 0 !== e) return;
                  }
                }
                if (u) return void x(c ? Dw(u, p) : u);
                if (
                  !(
                    new URL(window.location.href).origin ===
                    Dn[n.stage].HMG_HOME
                  )
                ) {
                  const e = decodeURIComponent(
                    Dw(encodeURIComponent(window.location.href), p)
                  );
                  window.history.replaceState(window.history.state, "", e);
                }
                Aw(), Gm.setState(Ow(h)), (i = Gm.getState());
                const { department: g, displayName: v, ...y } = i;
                return Fh.setUserData(y), void e(h);
              }
              "s" === l && u
                ? C(u, !0)
                : "at" === l && u
                ? (await m()) && x(u)
                : C(encodeURIComponent(window.location.href), !0);
            } else k();
          })),
          c.finally(async () => {
            c = null;
          }),
          c)
        );
      }
      async function m(e) {
        try {
          const t = d_.getState().bufferTime,
            r = await fetch(`${f()}/sso/${n.projectCode}/token`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                ...(n.stage !== An.PROD ? { isDebug: "1" } : {}),
              },
              body: JSON.stringify({
                accessToken: null == e ? void 0 : e.jwt,
                bufferTime: t,
              }),
            });
          if (!r.ok) {
            throw { error: await r.text(), raw: r };
          }
          const i = await r.json(),
            s =
              i.accessToken.length <= 4e3
                ? i.accessToken
                : `compressed.${zw(i.accessToken)}`;
          if (s) {
            const e = d_.getState().getSessionSeconds();
            Tw(a, s, e / 60), Tw(o, i.accessToken, e / 60);
          }
          return s;
        } catch (t) {
          const n = t;
          if (
            (Fh.logError({ error: t instanceof Error ? t : JSON.stringify(t) }),
            null == e ? void 0 : e.jwt)
          )
            return "";
          if (n.raw && n.raw.status >= 400 && n.raw.status < 500)
            return k(), "";
          if (null == e ? void 0 : e.retry) return;
          !(function (e) {
            const t = Fh.logError({
              error: `${Ie.t("ERR_SERVER_ERROR_OCCURRED")} [code:${e}]`,
            });
            alert(t);
          })(Vn.FAIL_SSO_API);
        } finally {
          d_.setState({ bufferTime: 0 });
        }
      }
      function v() {
        if (!i) {
          const e = Fh.logError({
            error: `[hmgAdmin] ${Ie.t("ERR_VERIFICATION_NOT_EXECUTED_YET")}`,
            isDirectSend: !0,
          });
        }
        const e = T();
        e && (Gm.setState(Ow(e)), (i = Gm.getState()));
      }
      async function y(e) {
        return new Promise((t) => {
          const n = new MutationObserver((e) => {
            const r = e.some((e) => e.addedNodes.length > 0);
            n.disconnect(), t(r);
          });
          n.observe("string" == typeof e ? document.querySelector(e) : e, {
            childList: !0,
            subtree: !0,
          });
        });
      }
      sv.setState({
        emit: function (e, t) {
          p[e] && p[e].forEach((e) => e(t));
        },
      }),
        sv.setState({ verifyAndReturnToken: g });
      let b = !1,
        w = !1;
      function _() {
        if (s) return s;
        const e = `${Dn[n.stage].CONFIG_HOST}/libs/${
          Dn[n.stage].NOTICE_FILE_NAME
        }`;
        return (
          (s = (async function (e) {
            const { data: t } = await Xw.get(e);
            return t;
          })(e)
            .then((e) => ((s = null), h_.setState(e), e))
            .finally(() => {
              s = null;
            })),
          s
        );
      }
      function S() {
        return (
          u ||
          ((u = (async function () {
            try {
              const { data: e } = await Fm.get("/sso/me");
              return e;
            } catch {
              return { department: "", name: "", rankName: "", userId: "" };
            }
          })().then((e) => {
            u = null;
            const { name: t, rankName: n, department: r } = e;
            return Km.setState({ name: t, rankName: n, department: r }), e;
          })),
          u)
        );
      }
      function E() {
        if (l) return l;
        const e = `${Dn[n.stage].CONFIG_HOST}/config/${
            n.projectCode
          }/menu.json`,
          t = `${Dn[n.stage].CONFIG_HOST}/config/${n.projectCode}/role.json`,
          r = `${Dn[n.stage].CONFIG_HOST}/config/common/site.json`;
        return (
          (l = Promise.all([Zw(t), Jw(e), Yw(r)])
            .then(
              ([e, t, n]) => (
                window.localStorage.setItem(
                  "hmg-admin-roles",
                  JSON.stringify(e)
                ),
                window.localStorage.setItem(
                  "hmg-admin-menus",
                  JSON.stringify(t)
                ),
                window.localStorage.setItem(
                  "hmg-admin-sites",
                  JSON.stringify(n)
                ),
                [e, t, n]
              )
            )
            .catch((e) => {
              const t = window.localStorage.getItem("hmg-admin-roles"),
                n = window.localStorage.getItem("hmg-admin-menus"),
                r = window.localStorage.getItem("hmg-admin-sites");
              if (!t || !n || !r) {
                const t = Fh.logError({
                  error: `[hmgAdmin] metadata load fail ${e.message}`,
                  isDirectSend: !0,
                });
                throw new Error(t.toString());
              }
              return [JSON.parse(t), JSON.parse(n), JSON.parse(r)];
            })
            .then(async ([e, t, n]) => {
              if (
                (Qm.setState({
                  roleResult: e,
                  menuResult: t,
                  siteResult: n,
                  project: t.project,
                }),
                Qm.getState().getNewMetadata(!0),
                t.project.languages)
              ) {
                const e = Mh.getState().languages;
                e && (null == e ? void 0 : e.length) > 0
                  ? s_.setState({
                      languages: t.project.languages.filter((t) =>
                        e.includes(t.languageCode)
                      ),
                    })
                  : s_.setState({ languages: t.project.languages });
              }
              d ||
                ((d = !0),
                await Promise.all([
                  s_.getState().initLanguage(),
                  Zm.getState().initRole(),
                ]));
              const r = Qm.getState().getNewMetadata();
              return Qm.setState(r), r;
            })
            .finally(() => {
              l = null;
            })),
          l
        );
      }
      async function k() {
        Rw(a),
          Rw(o),
          (function () {
            const e = Mh.getState().projectCode;
            [Un, Mn].forEach((t) => {
              localStorage.removeItem(t), localStorage.removeItem(t + "-" + e);
            });
          })(),
          f() || Hh.setState({ mySsoHostUrl: await h() }),
          window.location.replace(`${f()}/sso/logout`);
      }
      function O(e) {
        try {
          const t = decodeURIComponent(decodeURIComponent(e)),
            n = new URL(t);
          return n.pathname + n.search;
        } catch {
          return decodeURIComponent(decodeURIComponent(e));
        }
      }
      function x(e) {
        Iw() ? window.location.replace(O(e)) : Aw();
      }
      async function C(e, t) {
        Iw()
          ? (f() || Hh.setState({ mySsoHostUrl: await h() }),
            window.location.replace(
              `${f()}/sso/${n.projectCode}/authorize?upForm=${
                t ? "Y" : "N"
              }&redirectUrl=${O(e)}&siteCode=HKMC_W`
            ))
          : Aw();
      }
      function T() {
        let e;
        const t = Nw(a),
          r = `${a}-SESSION`;
        return Nw(r)
          ? ((e = t
              ? t.startsWith(zn)
                ? Mw(t.split(zn)[1])
                : t
              : Object.keys(
                  decodeURIComponent(document.cookie)
                    .split(";")
                    .filter((e) => !!e)
                    .reduce((e, t) => {
                      const [n, r] = t.trim().split("=");
                      return (e[n] = r), e;
                    }, {})
                ).some((e) => e.includes(Dn[n.stage].COOKIE_TOKEN_PREFIX))
              ? void 0
              : Nw(o)),
            e)
          : (Tw(r, "1"), Rw(a), void Rw(o));
      }
      return (
        h_.setState({ getNoticeData: _ }),
        Km.setState({ getMyUserData: S }),
        Qm.setState({ getMetadata: E }),
        sv.setState({ logout: k }),
        Zm.setState({
          getRoleIds: function (e) {
            v();
            let t = e
              ? (i.sites.find((e) => e.sc === r.siteCode) || {}).rIds || []
              : i.roleIds || [];
            return (t = Array.from(new Set(t))), t;
          },
        }),
        (gE = {
          mountMenu: async function (e, t) {
            function n() {
              const t = "string" == typeof e ? document.querySelector(e) : e;
              if (t) {
                if (!b) {
                  b = !0;
                  const e = nr.createRoot(t);
                  try {
                    e.render(tr.jsx(fE, {}));
                  } catch {
                    e.render(tr.jsx(hE, {}));
                  }
                }
              } else Fh.logError({ error: "Menu Element not found" });
              document.removeEventListener("DOMContentLoaded", n);
            }
            return (
              v(),
              t && sv.setState({ menuChangeHandler: t }),
              "loading" === document.readyState
                ? (document.addEventListener("DOMContentLoaded", n), !1)
                : (n(), await y(e))
            );
          },
          mountHeader: async function (e) {
            function t() {
              const n = "string" == typeof e ? document.querySelector(e) : e;
              if (n) {
                if (!w) {
                  w = !0;
                  const e = nr.createRoot(n);
                  try {
                    e.render(tr.jsx(aE, {}));
                  } catch {
                    e.render(tr.jsx(pE, {}));
                  }
                }
              } else Fh.logError({ error: "Header Element not found" });
              document.removeEventListener("DOMContentLoaded", t);
            }
            return (
              v(),
              "loading" === document.readyState
                ? (document.addEventListener("DOMContentLoaded", t), !1)
                : (t(), await y(e))
            );
          },
          getPayload: function () {
            return (
              v(),
              {
                iat: i.iat,
                expired: i.expired,
                userId: i.userId,
                department: i.department,
                displayName: i.displayName,
                sites: i.sites,
                siteCode: i.siteCode,
                tagIds: i.tagIds,
                roleIds: i.roleIds,
                permissions: i.permissions,
                isManager: i.isManager,
              }
            );
          },
          getNoticeData: _,
          getUserInformation: function () {
            return v(), S();
          },
          getMenusAndRolesRaw: async function () {
            var e, t, n;
            v();
            const r = await E();
            return {
              menus: [...((null == (e = r.menus) ? void 0 : e.map(ev)) || [])],
              roles: [...((null == (t = r.roles) ? void 0 : t.map(tv)) || [])],
              tags: [...((null == (n = r.tags) ? void 0 : n.map(nv)) || [])],
              project: rv(r.project),
              siteData: ov(r.siteData),
              projectName: av(r.projectName),
            };
          },
          getPermissionCodes: async function (e) {
            return v(), await E(), Zm.getState().getPermissionCodes(e);
          },
          getTagCodes: async function () {
            v();
            const { tags: e } = await E(),
              { tagIds: t } = i,
              n = null == e ? void 0 : e.filter((e) => t.includes(e.id));
            return (null == n ? void 0 : n.map((e) => e.tagCode)) || [];
          },
          getDynamicServerUrl: h,
          getVisibleNotice: h_.getState().getVisibleNotice,
          clearTimer: d_.getState().clearTimer,
          getLanguages: s_.getState().getLanguages,
          getCurrentLanguage: s_.getState().getCurrentLanguage,
          getCurrentLanguageCode: s_.getState().getCurrentLanguageCode,
          getDefaultLanguage: s_.getState().getDefaultLanguage,
          getSiteCodes: function () {
            var e;
            return (
              v(),
              (null == (e = null == i ? void 0 : i.sites)
                ? void 0
                : e.map((e) => e.sc)) || []
            );
          },
          getCurrentSiteCode: function () {
            return Km.getState().currentState.siteCode;
          },
          getUserSiteCode: function () {
            return v(), (null == i ? void 0 : i.siteCode) || "";
          },
          verifyAndReturnToken: g,
          logout: k,
          goToSSO: C,
          setCustomRegion: Hh.getState().setCustomRegion,
          on: function (e, t) {
            return (
              p[e] || (p[e] = []),
              p[e].push(t),
              () => {
                const n = p[e].indexOf(t);
                -1 !== n && p[e].splice(n, 1);
              }
            );
          },
          changeMenu: function (e) {
            var t, n;
            null == (n = (t = sv.getState()).changeMenu) || n.call(t, e);
          },
          changeLanguage: function (e) {
            var t, n;
            null == (n = (t = sv.getState()).changeLanguage) || n.call(t, e);
          },
          changeSiteCode: function (e) {
            var t, n;
            null == (n = (t = sv.getState()).changeSiteCode) || n.call(t, e);
          },
        }),
        gE
      );
    },
  };
})();
