import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn:
      "https://e111850faf994fa69fa0a543e2e52555@o464933.ingest.sentry.io/5476548",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException("Logging the error", error);
}

export default {
  init,
  log,
};
