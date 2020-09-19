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