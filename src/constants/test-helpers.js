const mockState = (store = {}) => JSON.parse(JSON.stringify(store));

const mockGetters = (getters = {}) => Object.keys(getters)
  .reduce((reducedGetters, name) => ({
    ...reducedGetters,
    [name]: jest.fn(),
  }), {});

const mockAction = () => jest.fn(() => Promise.resolve());
const mockActions = (actions = {}) => Object.keys(actions).reduce((mockedActions, name) => ({
  ...mockedActions,
  [name]: mockAction(),
}), {});

const mockMutations = (mutations = {}) => Object.keys(mutations).reduce((mockedMutations, name) => ({
  ...mockedMutations,
  [name]: jest.fn(),
}), {});

export function mockModules(modules) {
  return Object.keys(modules).reduce((mockedModules, name) => {
    let nextModule = modules[name];

    return {
      ...mockedModules,
      [name]: {
        namespaced: nextModule.namespaced,
        state: mockState(nextModule.state),
        getters: mockGetters(nextModule.getters),
        actions: mockActions(nextModule.actions),
        mutations: mockMutations(nextModule.mutations),
      }
    };
  }, {});
}

export function resetModules(modules) {
  return Object.keys(modules).reduce((resetedModules, nextModuleName) => ({
    ...resetedModules,
    [nextModuleName]: {
      ...modules[nextModuleName],
      state: JSON.parse(JSON.stringify(modules[nextModuleName].state || {})),
    },
  }), {});
}

function getNamespacedKeys(obj, moduleName, isNamespaced) {
  return Object.keys(obj).reduce((results, key) => ({
    ...results,
    [key]: (isNamespaced ? `${moduleName}/${key}` : key),
  }), {});
}

export function getActionTypes(moduleConfig) {
  const moduleName = Object.keys(moduleConfig)[0];
  const module = moduleConfig[moduleName];
  const isNamespaced = module.namespaced;

  return getNamespacedKeys(module.actions, moduleName, isNamespaced);
}

export function getGetterTypes(moduleConfig) {
  const moduleName = Object.keys(moduleConfig)[0];
  const module = moduleConfig[moduleName];
  const isNamespaced = module.namespaced;

  return getNamespacedKeys(module.getters, moduleName, isNamespaced);
}
