/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2026 Technologyst Labs
 *
 * ALTIVEC \u2014 weather widget (canvas animation + wttr.in lookup).
 * Loaded by index.html. Shares a few helpers with the main script via the
 * window.Altivec namespace (xhrGet, safeSetItem, isFunctionalAllowed), and
 * exposes initWeather() back on it so the page can kick the widget off after
 * cookie consent is resolved. ES3-only, for Safari Leopard WebKit / Aquafox.
 */
(function () {
    var A = window.Altivec || (window.Altivec = {});
    // Shared helpers provided by index.html.
    function xhrGet() { return A.xhrGet.apply(null, arguments); }
    function safeSetItem() { return A.safeSetItem.apply(null, arguments); }
    function isFunctionalAllowed() { return A.isFunctionalAllowed(); }

    // ── CANVAS WEATHER ANIMATION (unchanged) ──
    var wxCanvas = document.getElementById('weatherCanvas');
    var wxCtx = wxCanvas.getContext('2d');
    var wxState = { type: 'idle', t: 0, g1:'#1a1d24', g2:'#1a1d24', g3:'#1a1d24' };
    var rainDrops = [], snowFlakes = [], cloudPuffs = [], sunRays = [];

    function initParticles(type) {
        var w = wxCanvas.width, h = wxCanvas.height, i;
        rainDrops = []; snowFlakes = []; cloudPuffs = []; sunRays = [];
        if (type === 'rain' || type === 'drizzle' || type === 'lightrain') {
            var count = type === 'drizzle' ? 20 : type === 'lightrain' ? 35 : 70;
            var speedMin = type === 'drizzle' ? 1.5 : type === 'lightrain' ? 2.5 : 5;
            var speedRng = type === 'drizzle' ? 1.5 : type === 'lightrain' ? 2 : 4;
            var lenMin   = type === 'drizzle' ? 3   : type === 'lightrain' ? 5  : 8;
            var lenRng   = type === 'drizzle' ? 4   : type === 'lightrain' ? 6  : 10;
            for (i = 0; i < count; i++) {
                rainDrops.push({ x: Math.random()*w, y: Math.random()*h,
                    len: lenMin + Math.random()*lenRng, speed: speedMin + Math.random()*speedRng,
                    alpha: 0.15 + Math.random()*0.3 });
            }
        }
        if (type === 'snow') {
            for (i = 0; i < 45; i++) {
                snowFlakes.push({ x: Math.random()*w, y: Math.random()*h,
                    r: 1.5 + Math.random()*2.5, speed: 0.4 + Math.random()*0.8,
                    drift: (Math.random()-0.5)*0.4, alpha: 0.4 + Math.random()*0.4 });
            }
        }
        if (type === 'cloud' || type === 'rain' || type === 'lightrain' || type === 'drizzle' || type === 'snow') {
            for (i = 0; i < 3; i++) {
                cloudPuffs.push({ x: Math.random()*w, y: 15 + Math.random()*25,
                    w: 60 + Math.random()*80, speed: 0.12 + Math.random()*0.15,
                    alpha: 0.12 + Math.random()*0.1 });
            }
        }
        if (type === 'clear') {
            for (i = 0; i < 8; i++) {
                sunRays.push({ angle: (i/8)*Math.PI*2, len: 18+Math.random()*14, alpha: 0.15+Math.random()*0.1 });
            }
        }
    }

    function wxTypeFromCode(code) {
        if (code === 0) return { type:'clear',   g1:'#1a3a6a', g2:'#2a5aaa', g3:'#f0a030' };
        if (code <= 3) return { type:'cloud',   g1:'#1a2a4a', g2:'#2a3a6a', g3:'#3a4a7a' };
        if (code <= 48) return { type:'cloud',   g1:'#1a1e2a', g2:'#252d3e', g3:'#303a50' };
        if (code <= 55) return { type:'drizzle', g1:'#161c28', g2:'#1e2838', g3:'#263040' };
        if (code <= 65 || (code>=80&&code<=82)) {
            if (code === 293 || code === 296 || code === 353) return { type:'lightrain', g1:'#131926', g2:'#1a2535', g3:'#212f40' };
            return { type:'rain', g1:'#0e1420', g2:'#16202e', g3:'#1e2c3c' };
        }
        if (code <= 77 || (code>=85&&code<=86)) return { type:'snow', g1:'#1e2a3a', g2:'#2a3848', g3:'#e8eef8' };
        return { type:'storm', g1:'#0a0e18', g2:'#10161e', g3:'#181e28' };
    }

    function drawWeatherCanvas() {
        var w = wxCanvas.width, h = wxCanvas.height, t = wxState.t;
        var type = wxState.type, g1 = wxState.g1, g2 = wxState.g2, g3 = wxState.g3;
        var shift = Math.sin(t * 0.008) * 0.3;
        var grad = wxCtx.createLinearGradient(0, 0, w + w*shift, h);
        grad.addColorStop(0, g1); grad.addColorStop(0.5+shift*0.2, g2); grad.addColorStop(1, g3);
        wxCtx.fillStyle = grad; wxCtx.fillRect(0, 0, w, h);

        if (type === 'clear') {
            var sx = w*0.82, sy = h*0.38;
            var sg = wxCtx.createRadialGradient(sx, sy, 0, sx, sy, 38);
            sg.addColorStop(0, 'rgba(255,200,50,0.35)'); sg.addColorStop(0.5, 'rgba(255,160,20,0.12)'); sg.addColorStop(1, 'rgba(255,140,0,0)');
            wxCtx.fillStyle = sg; wxCtx.beginPath(); wxCtx.arc(sx, sy, 38, 0, Math.PI*2); wxCtx.fill();
            var sd = wxCtx.createRadialGradient(sx-4, sy-4, 2, sx, sy, 18);
            sd.addColorStop(0, '#fff8d0'); sd.addColorStop(1, '#f0a500');
            wxCtx.fillStyle = sd; wxCtx.beginPath(); wxCtx.arc(sx, sy, 18, 0, Math.PI*2); wxCtx.fill();
            for (var ri = 0; ri < sunRays.length; ri++) {
                var r = sunRays[ri], a = r.angle + t*0.004, p = Math.abs(Math.sin(t*0.02+ri));
                wxCtx.save(); wxCtx.globalAlpha = r.alpha*(0.6+p*0.4); wxCtx.strokeStyle = '#ffc040'; wxCtx.lineWidth = 1.5;
                wxCtx.beginPath(); wxCtx.moveTo(sx+Math.cos(a)*20, sy+Math.sin(a)*20); wxCtx.lineTo(sx+Math.cos(a)*(20+r.len*(0.8+p*0.4)), sy+Math.sin(a)*(20+r.len*(0.8+p*0.4))); wxCtx.stroke(); wxCtx.restore();
            }
        }
        for (var ci = 0; ci < cloudPuffs.length; ci++) {
            var c = cloudPuffs[ci]; c.x -= c.speed; if (c.x+c.w < 0) c.x = w+c.w;
            wxCtx.save(); wxCtx.globalAlpha = c.alpha; wxCtx.fillStyle = type==='snow'?'#dde8f8':'#8aaac8';
            wxCtx.beginPath(); wxCtx.ellipse(c.x,c.y,c.w/2,c.w*0.38/2,0,0,Math.PI*2); wxCtx.ellipse(c.x-c.w*0.22,c.y+c.w*0.38*0.1,c.w*0.32,c.w*0.38*0.45,0,0,Math.PI*2); wxCtx.ellipse(c.x+c.w*0.22,c.y+c.w*0.38*0.1,c.w*0.28,c.w*0.38*0.4,0,0,Math.PI*2); wxCtx.fill(); wxCtx.restore();
        }
        for (var di = 0; di < rainDrops.length; di++) {
            var d = rainDrops[di]; d.y += d.speed; d.x -= d.speed*0.18; if (d.y>h) { d.y=-d.len; d.x=Math.random()*w; }
            wxCtx.save(); wxCtx.globalAlpha = d.alpha; wxCtx.strokeStyle = '#8ab8e8'; wxCtx.lineWidth = 0.8;
            wxCtx.beginPath(); wxCtx.moveTo(d.x,d.y); wxCtx.lineTo(d.x-d.len*0.18,d.y+d.len); wxCtx.stroke(); wxCtx.restore();
        }
        for (var si = 0; si < snowFlakes.length; si++) {
            var s = snowFlakes[si]; s.y += s.speed; s.x += s.drift+Math.sin(t*0.02+s.y*0.05)*0.3;
            if (s.y>h){s.y=-4;s.x=Math.random()*w;} if(s.x<0){s.x=w;} if(s.x>w){s.x=0;}
            wxCtx.save(); wxCtx.globalAlpha=s.alpha; wxCtx.fillStyle='#e8f4ff'; wxCtx.beginPath(); wxCtx.arc(s.x,s.y,s.r,0,Math.PI*2); wxCtx.fill(); wxCtx.restore();
        }
        if (type==='storm' && Math.random()<0.004) { wxCtx.fillStyle='rgba(200,220,255,0.06)'; wxCtx.fillRect(0,0,w,h); }
        wxState.t++;
        var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(fn){setTimeout(fn,16);};
        raf(drawWeatherCanvas);
    }

    function initCanvas() {
        var inner = document.querySelector('.weather-inner');
        wxCanvas.width = inner.offsetWidth;
        wxCanvas.height = inner.offsetHeight;
        wxState = { type:'idle', t:0, g1:'#1a1d24', g2:'#1a1d24', g3:'#1a1d24' };
        initParticles('idle');
        drawWeatherCanvas();
    }

    if (window.addEventListener) { window.addEventListener('load', initCanvas); }
    else if (window.attachEvent) { window.attachEvent('onload', initCanvas); }

    // ── WEATHER (consent‑respecting) ──
    function initWeather() {
        var labels = document.querySelectorAll('#weatherLabel');
        for (var i = 0; i < labels.length; i++) labels[i].innerHTML = 'TOWN&nbsp;&nbsp;';
        document.getElementById('weatherInput').placeholder = 'e.g. Pontypool';
        if (isFunctionalAllowed()) {
            try {
                var saved = localStorage.getItem('altivec_town');
                if (saved) {
                    document.getElementById('weatherInput').value = saved;
                    fetchWeather();
                }
            } catch(e) {}
        }
    }

    function toggleSettings() {
        var s = document.getElementById('weatherSettings');
        if ((' ' + s.className + ' ').indexOf(' open ') >= 0) {
            s.className = s.className.replace(/\bopen\b/, '').replace(/\s+/,' ').replace(/^\s|\s$/,'');
        } else {
            s.className = s.className + ' open';
        }
    }

    function closeSettings() {
        var s = document.getElementById('weatherSettings');
        s.className = s.className.replace(/\bopen\b/, '').replace(/\s+/,' ').replace(/^\s|\s$/,'');
    }

    document.getElementById('weatherCog').onclick = toggleSettings;

    document.onclick = function(e) {
        var widget = document.getElementById('weatherWidget');
        var t = e ? e.target : window.event.srcElement;
        var inside = false;
        while (t) { if (t === widget) { inside = true; break; } t = t.parentNode; }
        if (!inside) closeSettings();
    };

    var WTTR_CODES = {
        113: { type:'clear',   icon:'&#9728;',  desc:'Clear'          },
        116: { type:'cloud',   icon:'&#9925;',  desc:'Partly Cloudy'  },
        119: { type:'cloud',   icon:'&#9729;',  desc:'Cloudy'         },
        122: { type:'cloud',   icon:'&#9729;',  desc:'Overcast'       },
        143: { type:'cloud',   icon:'&#127787;',desc:'Mist'           },
        176: { type:'drizzle', icon:'&#127782;',desc:'Patchy Rain'    },
        179: { type:'snow',    icon:'&#127784;',desc:'Patchy Snow'    },
        182: { type:'drizzle', icon:'&#127782;',desc:'Sleet'          },
        185: { type:'drizzle', icon:'&#127782;',desc:'Patchy Sleet'   },
        200: { type:'storm',   icon:'&#9928;',  desc:'Thundery Showers'},
        227: { type:'snow',    icon:'&#127784;',desc:'Blowing Snow'   },
        230: { type:'snow',    icon:'&#10052;', desc:'Blizzard'       },
        248: { type:'cloud',   icon:'&#127787;',desc:'Fog'            },
        260: { type:'cloud',   icon:'&#127787;',desc:'Freezing Fog'   },
        263: { type:'drizzle', icon:'&#127782;',desc:'Light Drizzle'  },
        266: { type:'drizzle', icon:'&#127782;',desc:'Drizzle'        },
        281: { type:'drizzle', icon:'&#127782;',desc:'Freezing Drizzle'},
        284: { type:'drizzle', icon:'&#127782;',desc:'Heavy Drizzle'  },
        293: { type:'lightrain', icon:'&#127783;',desc:'Light Rain'     },
        296: { type:'lightrain', icon:'&#127783;',desc:'Light Rain'     },
        299: { type:'rain',      icon:'&#127783;',desc:'Moderate Rain'  },
        302: { type:'rain',    icon:'&#127783;',desc:'Moderate Rain'  },
        305: { type:'rain',    icon:'&#127783;',desc:'Heavy Rain'     },
        308: { type:'rain',    icon:'&#127783;',desc:'Heavy Rain'     },
        311: { type:'drizzle', icon:'&#127782;',desc:'Light Sleet'    },
        314: { type:'drizzle', icon:'&#127782;',desc:'Moderate Sleet' },
        317: { type:'drizzle', icon:'&#127782;',desc:'Light Sleet'    },
        320: { type:'snow',    icon:'&#127784;',desc:'Moderate Snow'  },
        323: { type:'snow',    icon:'&#127784;',desc:'Patchy Snow'    },
        326: { type:'snow',    icon:'&#127784;',desc:'Light Snow'     },
        329: { type:'snow',    icon:'&#10052;', desc:'Patchy Snow'    },
        332: { type:'snow',    icon:'&#10052;', desc:'Moderate Snow'  },
        335: { type:'snow',    icon:'&#10052;', desc:'Patchy Heavy Snow'},
        338: { type:'snow',    icon:'&#10052;', desc:'Heavy Snow'     },
        350: { type:'drizzle', icon:'&#127782;',desc:'Ice Pellets'    },
        353: { type:'lightrain', icon:'&#127782;',desc:'Light Showers'  },
        356: { type:'rain',      icon:'&#127783;',desc:'Showers'        },
        359: { type:'rain',    icon:'&#127783;',desc:'Heavy Showers'  },
        362: { type:'drizzle', icon:'&#127782;',desc:'Sleet Showers'  },
        365: { type:'drizzle', icon:'&#127782;',desc:'Sleet Showers'  },
        368: { type:'snow',    icon:'&#127784;',desc:'Snow Showers'   },
        371: { type:'snow',    icon:'&#10052;', desc:'Heavy Snow'     },
        374: { type:'drizzle', icon:'&#127782;',desc:'Ice Pellet Showers'},
        377: { type:'drizzle', icon:'&#127782;',desc:'Ice Pellets'    },
        386: { type:'storm',   icon:'&#9928;',  desc:'Thunder'        },
        389: { type:'storm',   icon:'&#9928;',  desc:'Thunderstorm'   },
        392: { type:'storm',   icon:'&#9928;',  desc:'Thunder+Snow'   },
        395: { type:'storm',   icon:'&#9928;',  desc:'Blizzard'       }
    };

    function fetchWeather() {
        var raw = document.getElementById('weatherInput').value.replace(/^\s+|\s+$/g, '');
        if (!raw) return;

        var resultEl = document.getElementById('weatherResult');
        var errorEl  = document.getElementById('weatherError');
        var btn      = document.getElementById('weatherBtn');
        resultEl.className = resultEl.className.replace(/\bvisible\b/,'').replace(/\s+/,' ').replace(/^\s|\s$/,'');
        errorEl.className  = errorEl.className.replace(/\bvisible\b/,'').replace(/\s+/,' ').replace(/^\s|\s$/,'');
        btn.innerHTML = '...';

        xhrGet('http://wttr.in/' + encodeURIComponent(raw) + '?format=j1', function(data) {
            if (!data || !data.current_condition || !data.current_condition[0]) {
                errorEl.innerHTML = 'NOT FOUND';
                errorEl.className += ' visible';
                btn.innerHTML = '&#9729; GO';
                return;
            }
            var cur = data.current_condition[0], code = parseInt(cur.weatherCode);
            var wx = WTTR_CODES[code] || { type:'cloud', icon:'&#9729;', desc:'Unknown' };
            var temp = cur.temp_C;
            var loc = (data.nearest_area && data.nearest_area[0])
                ? (data.nearest_area[0].areaName[0].value + ', ' + data.nearest_area[0].country[0].value)
                : raw;

            var info = wxTypeFromCode(code <= 113 ? 0 : code <= 119 ? 2 : code <= 200 ? 3 : code <= 230 ? 73 : code <= 260 ? 45 : code <= 308 ? 63 : code <= 338 ? 73 : 95);
            wxState.type = wx.type; wxState.g1 = info.g1; wxState.g2 = info.g2; wxState.g3 = info.g3;
            initParticles(wx.type);

            document.getElementById('weatherIcon').innerHTML = wx.icon;
            document.getElementById('weatherTemp').innerHTML = temp + '&deg;C';
            document.getElementById('weatherDesc').innerHTML = escapeHtml(wx.desc);
            document.getElementById('weatherLoc').innerHTML  = escapeHtml(loc);

            var DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
            var todayDow = (new Date()).getDay(), html = '';
            var weather = data.weather;
            for (var i = 1; i < weather.length && i < 3; i++) {
                var day = weather[i], dayCode = parseInt(day.hourly[4].weatherCode);
                var dwx = WTTR_CODES[dayCode] || { icon:'&#9729;' };
                html += '<div class="forecast-day"><div class="forecast-dow">' + DAYS[(todayDow + i) % 7] + '</div><div class="forecast-icon">' + dwx.icon + '</div><div class="forecast-hi">' + day.maxtempC + '&deg;</div><div class="forecast-lo">' + day.mintempC + '&deg;</div></div>';
            }
            document.getElementById('wxForecast').innerHTML = html;
            resultEl.className += ' visible';
            document.getElementById('wxIdle').style.display = 'none';
            document.getElementById('weatherCog').className = 'weather-cog configured';
            closeSettings();
            safeSetItem('altivec_town', raw);
            btn.innerHTML = '&#9729; GO';
        }, function() {
            errorEl.innerHTML = 'FETCH ERROR';
            errorEl.className += ' visible';
            btn.innerHTML = '&#9729; GO';
        });
    }

    document.getElementById('weatherBtn').onclick = fetchWeather;
    document.getElementById('weatherInput').onkeypress = function(e) {
        if ((e ? e.keyCode : window.event.keyCode) === 13) fetchWeather();
    };
    // Expose the widget entry point for index.html to call post-consent.
    A.initWeather = initWeather;
})();

