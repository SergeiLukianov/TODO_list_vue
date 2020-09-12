import Vue from 'vue'
import App from './App'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import store from './store'

Vue.config.productionTip = false

const requireComponent = require.context(
  // The relative path of the components folder
  './components/base',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.vue$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  let componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  let componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName.split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  Vue.component(componentName, componentConfig.default)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
