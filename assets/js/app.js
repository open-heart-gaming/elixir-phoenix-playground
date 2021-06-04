// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import '../css/app.scss';

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import 'phoenix_html';
import { Socket } from 'phoenix';
import NProgress from 'nprogress';
import { LiveSocket } from 'phoenix_live_view';
import Hooks from './_hooks';

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute('content');

let liveSocket = new LiveSocket('/live', Socket, {
  hooks: Hooks,
  params: {
    _csrf_token: csrfToken,
  },
  metadata: {
    // Inspect `e` and return whatever you need
    // https://hexdocs.pm/phoenix_live_view/bindings.html#click-events
    click: (e, el) => {
      return {
        altKey: e.altKey,
        clientX: e.clientX,
        clientY: e.clientY,
      };
    },
  },
});

// Show progress bar on live navigation and form submits
window.addEventListener('phx:page-loading-start', (info) => NProgress.start());
window.addEventListener('phx:page-loading-stop', (info) => NProgress.done());

// connect if there are any LiveViews on the page
liveSocket.connect();

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket;
