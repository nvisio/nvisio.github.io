// Live preview animations for the works section.
// - K-Radio: cycles through Korean FM stations, updating the dial pointer.
// - TokenUsageMonitor: increments a live token counter, animates a sparkline.

(function () {
  function initRadio(root) {
    var freqEl = root.querySelector('[data-freq]');
    var stationEl = root.querySelector('[data-station]');
    var ticksEl = root.querySelector('[data-ticks]');
    if (!freqEl || !stationEl || !ticksEl) return;

    var stations = [
      [91.9, 'CBS · 음악FM'],
      [89.1, 'KBS · 1FM'],
      [93.1, 'KBS · 클래시FM'],
      [95.9, 'MBC · FM4U'],
      [99.1, 'EBS · FM']
    ];

    function render(i) {
      var s = stations[i];
      var p = 0.15 + ((s[0] - 87.5) / (108 - 87.5)) * 0.55;
      freqEl.innerHTML = s[0].toFixed(1) + '<span class="unit">MHz</span>';
      stationEl.textContent = s[1];
      ticksEl.style.setProperty('--p', p);
    }

    var i = 0;
    render(i);
    setInterval(function () {
      i = (i + 1) % stations.length;
      render(i);
    }, 2400);
  }

  function initToken(root) {
    var countEl = root.querySelector('[data-token-count]');
    var barEl = root.querySelector('[data-token-bar]');
    var pathEl = root.querySelector('[data-spark-path]');
    var fillEl = root.querySelector('[data-spark-fill]');
    if (!countEl) return;

    var tokens = 184230;

    function format(n) {
      return n.toLocaleString();
    }

    setInterval(function () {
      tokens += Math.floor(40 + Math.random() * 320);
      countEl.textContent = format(tokens);
      if (barEl) {
        var width = Math.min(95, 30 + ((tokens % 9000) / 120));
        barEl.style.width = width + '%';
      }
    }, 900);

    if (pathEl && fillEl) {
      var n = 48;
      var pts = [];
      var v = 30;
      for (var i = 0; i < n; i++) {
        v += (Math.random() - 0.4) * 8;
        v = Math.max(8, Math.min(60, v));
        pts.push(v);
      }
      var w = 100;
      var h = 40;
      var step = w / (n - 1);
      var d = pts
        .map(function (y, i) {
          return (i === 0 ? 'M' : 'L') + (i * step).toFixed(2) + ' ' + (h - y * 0.55).toFixed(2);
        })
        .join(' ');
      pathEl.setAttribute('d', d);
      fillEl.setAttribute('d', d + ' L 100 40 L 0 40 Z');
    }
  }

  document.querySelectorAll('[data-preview="radio"]').forEach(initRadio);
  document.querySelectorAll('[data-preview="token"]').forEach(initToken);
})();
