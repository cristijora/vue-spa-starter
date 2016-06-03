// Import System requirements
import Vue from 'vue'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'
import { initializeRouter } from './routes/routes'
import { initializeVueResource } from './resource/resource'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

initializeVueResource();
initializeRouter();

