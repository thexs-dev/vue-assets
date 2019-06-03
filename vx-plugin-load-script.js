const LoadScript = {
  install: function (Vue) {
    Vue.loadScript = Vue.prototype.$loadScript = function (src) {
      // eslint-disable-line no-param-reassign
      return new Promise(function (resolve, reject) {
        if (document.querySelector('script[src="' + src + '"]')) {
          resolve();
          return;
        }

        const el = document.createElement('script');
        el.type = 'text/javascript';
        el.async = true;
        el.src = src;
        el.addEventListener('load', resolve);
        el.addEventListener('error', reject);
        el.addEventListener('abort', reject);
        document.head.appendChild(el);
      });
    };

    Vue.unloadScript = Vue.prototype.$unloadScript = function (src) {
      // eslint-disable-line no-param-reassign
      return new Promise(function (resolve, reject) {
        const el = document.querySelector('script[src="' + src + '"]');

        if (!el) {
          reject();
          return;
        }

        document.head.removeChild(el);
        resolve();
      });
    };
  }
};
// export default LoadScript;

/* plugin here without export, after trying all of the below ...
from https://github.com/tserkov/vue-plugin-load-script version @1.2.0
  <script src="https://cdn.jsdelivr.net/npm/vue-plugin-load-script"></script>
  <script type="module">import LoadScript from './vue-plugin-load-script.js';</script>
  <script type="module">import LoadScript from './node_modules/vue-plugin-load-script/index.js';</script>
  <script type="module" src="./vue-plugin-load-script.js"></script>
  <script>import LoadScript from 'vue-plugin-load-script';</script>
  <script src='https://unpkg.com/vue-plugin-load-script'></script>
  <script src='https://unpkg.com/vue-plugin-load-script@1.2.0/index.js'></script>
*/