import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
  runInAction,
} from 'mobx';
import bound from 'bind-decorator';

import {
  TMuiThemeMode,
  validMuiThemeModes,
  defaultMuiThemeMode,
  TUpdatableParameter,
} from 'src/core/types';
import { getSavedOrQueryParameter } from 'src/core/helpers/generic';
import { AppDataStore } from 'src/store/AppDataStore';
import { toBoolean } from 'src/core/helpers/basic';

export type TAppSessionStoreStatus = undefined | 'dataLoaded' | 'finished';

const storagePrefix = 'AppSessionStore:';

// TODO: Move default parameters to constants?
const defaultShowLeftPanel: boolean = false;

/** Parameters what could be saved (via `saveParameter`) and restored from the
 * local storage (or from url query, via `restoreParameters`)
 * TODO: To derive it from `updatableParameters`?
 */
const queryParameters = [
  // prettier-ignore
  'showLeftPanel',
  'themeMode',
  'useDemo',
  'showDemo',

  // These parameters will be excluded from `saveableParameters` (only to initialize from url query)...
  'doAutoLoad',
  'doAutoStart',
] as const;
export type TQueryParameter = (typeof queryParameters)[number];

/** Parameters not supposed to be saved -- not included into the `saveableParameters` list */
const nonSaveableParameters = [
  'useDemo',
  'showDemo',
  'doAutoLoad',
  'doAutoStart',
  // 'autoLoad*', // Applyed via special check (see below)
];

/** Parameters to save to the local storage */
const saveableParameters = queryParameters.filter(
  (id) =>
    // Exclude auto load urls...
    !id.startsWith('autoLoadUrl') && !nonSaveableParameters.includes(id), // id !== 'doAutoLoad' && id !== 'doAutoStart',
);

/** Updatable parameters descriptions */
const updatableParameters: TUpdatableParameter<TQueryParameter>[] = [
  { id: 'showLeftPanel', type: 'boolean' },
  { id: 'useDemo', type: 'boolean' },
  { id: 'showDemo', type: 'boolean' },
  { id: 'themeMode', type: 'string', validValues: validMuiThemeModes },
  // Auto load...
  { id: 'doAutoLoad', type: 'boolean' },
  { id: 'doAutoStart', type: 'boolean' },
];

/** Allow to pass all login checks and go directly to inner data pages */
const DEBUG_SKIP_LOGIN = toBoolean(process.env.DEBUG_SKIP_LOGIN);

export class AppSessionStore {
  // NOTE: remember to clean/reset properties in `clearData` or in `clearSettings`

  // Session reaction disposers...
  staticDisposers?: IReactionDisposer[];

  /* Allow to use demo */
  @observable useDemo: boolean = false;

  @observable inited: boolean = false;
  @observable finished: boolean = false;
  @observable showHelp: boolean = false;
  @observable showDemo: boolean = false;
  @observable logged: boolean = true; // DEBUG!
  @observable ready: boolean = false;
  @observable loading: boolean = false;
  @observable status: TAppSessionStoreStatus;
  @observable error?: Error = undefined;

  /* // UNUSED: [>* Callback to go to load new data page <]
   * @observable loadNewDataCb?: () => void | undefined;
   */

  /* // UNUSED: Don't mix session and data
   * @observable appDataStore?: AppDataStore;
   */

  // Settings...

  /** TODO: Show left panel */
  @observable showLeftPanel: boolean = defaultShowLeftPanel;

  /** Application theme */
  @observable themeMode: TMuiThemeMode = defaultMuiThemeMode;

  // Default auto load values...

  @observable doAutoLoad: boolean = false;
  @observable doAutoStart: boolean = false;

  // Lifecycle...

  constructor() {
    makeObservable(this);
    this.setStaticReactions();
    this.restoreParameters();
  }

  async destroy() {
    this.clearData();
    this.resetStaticReactions();
  }

  // Core getters...

  /** The root state: what component show to the user */
  @computed get rootState() {
    const {
      // prettier-ignore
      inited,
      loading,
      ready,
      logged,
      finished,
      showDemo,
    } = this;
    // eslint-disable-next-line no-console
    console.log('[AppSessionStore:rootState] start', {
      inited,
      loading,
      ready,
      logged,
      finished,
      showDemo,
      DEBUG_SKIP_LOGIN,
    });
    let rootState = 'waiting';
    if (!inited || loading) {
      rootState = 'waiting';
    } else if (showDemo) {
      rootState = 'demo';
    } else if (finished) {
      rootState = 'finished';
    } else if (!logged && !DEBUG_SKIP_LOGIN) {
      rootState = 'login';
    } else {
      rootState = 'main';
      // rootState = 'waiting';
    }
    // eslint-disable-next-line no-console
    console.log('[AppSessionStore:rootState] result', rootState);
    return rootState;
  }

  /** Is current status final and successful (started, stopped)? */
  @computed get isFinished() {
    return this.finished;
  }

  // Init settings...

  /** Initialize default parameters */
  restoreParameters() {
    updatableParameters.forEach((paramItem) => {
      const { id } = paramItem;
      const val = getSavedOrQueryParameter(paramItem, { storagePrefix, showWarining: true });
      if (val != null) {
        runInAction(() => {
          // @ts-ignore
          this[id] = val;
        });
        // eslint-disable-next-line no-console
        console.info('[AppSessionStore:restoreParameters] Updated parameter', id, '=', val);
      }
    });
  }

  /** Save parameter into the storage */
  saveParameter(id: TQueryParameter) {
    const hasLocalStorage = typeof localStorage !== 'undefined';
    if (hasLocalStorage) {
      const storageId = [storagePrefix, id].filter(Boolean).join('');
      const val = this[id];
      /* console.log('[AppSessionStore:saveParameter]', {
       *   id,
       *   val,
       *   storageId,
       * });
       */
      localStorage.setItem(storageId, String(val));
    }
  }

  /** Initialize settings (reserved for future use */
  initSettings(): Promise<void> {
    // TODO?
    return Promise.resolve();
  }

  // Core setters...

  @action.bound setShowLeftPanel(showLeftPanel: typeof AppSessionStore.prototype.showLeftPanel) {
    this.showLeftPanel = showLeftPanel;
  }

  @action setInited(inited: typeof AppSessionStore.prototype.inited) {
    this.inited = inited;
  }

  @action setFinished(finished: typeof AppSessionStore.prototype.finished) {
    this.finished = finished;
  }

  @action.bound setShowHelp(showHelp: typeof AppSessionStore.prototype.showHelp) {
    this.showHelp = showHelp;
  }

  @action.bound setShowDemo(showDemo: typeof AppSessionStore.prototype.showDemo) {
    this.showDemo = showDemo;
  }

  @action setReady(ready: typeof AppSessionStore.prototype.ready) {
    this.ready = ready;
  }

  @action setLogged(logged: typeof AppSessionStore.prototype.logged) {
    this.logged = logged;
  }

  @action setLoading(loading: typeof AppSessionStore.prototype.loading) {
    this.loading = loading;
  }

  @action setError(error: typeof AppSessionStore.prototype.error) {
    this.error = error;
  }

  @bound clearError() {
    this.setError(undefined);
  }

  @action setStatus(status: typeof AppSessionStore.prototype.status) {
    this.status = status;
  }

  // Reactions...

  /** Make some initalization/cleanup things for a data store */
  @bound onAppDataStore(appDataStore?: AppDataStore) {
    // const { nodesColorMode } = this;
    if (appDataStore) {
      // TODO: Invoke some syncs for data store...
      // appDataStore.onNodesColorModeChanged(nodesColorMode);
    }
  }

  // Misc setters...

  @action setThemeMode(themeMode: typeof AppSessionStore.prototype.themeMode) {
    this.themeMode = themeMode;
  }

  // Other setters...

  /* @action setLoadNewDataCb(loadNewDataCb: typeof AppSessionStore.prototype.loadNewDataCb) {
   *   this.loadNewDataCb = loadNewDataCb;
   * }
   */

  // Generic utilities...

  @action clearData() {
    // this.inited = false;
    // this.finished = false;
    // this.ready = false;
    // this.loading = false;
    this.status = undefined;
    this.error = undefined;

    this.showHelp = false;
    this.showDemo = false;

    // Reset settings?
    this.clearSettings();
  }

  // Settings...

  @action clearSettings() {
    // TODO: Use saved on initialization default values and list of resetable parameters...
    this.showLeftPanel = defaultShowLeftPanel;
    this.themeMode = defaultMuiThemeMode;
    this.doAutoLoad = false;
    this.doAutoStart = false;
  }

  // Reactions...

  setStaticReactions() {
    this.staticDisposers = [
      // prettier-ignore
      /* // TODO: Basic options reactions...
       * reaction(() => this.autoHideNodes, this.onAutoHideNodesChanged),
       * reaction(() => this.autoHideNodesThreshold, this.onAutoHideNodesParamsChanged),
       * reaction(() => this.autoHideNodesMaxOutputs, this.onAutoHideNodesParamsChanged),
       * reaction(() => this.nodesColorMode, this.onNodesColorModeChanged),
       */
      /* // UNUSED: Linked app data store...
       * reaction(() => this.appDataStore, this.onAppDataStore),
       */
      // Add reactions to save all the saveable parameters to the local storage...
      ...saveableParameters.map((id) =>
        reaction(() => this[id], this.saveParameter.bind(this, id)),
      ),
    ];
  }
  resetStaticReactions() {
    const { staticDisposers } = this;
    // Reset all disposers...
    if (Array.isArray(staticDisposers) && staticDisposers.length) {
      staticDisposers.forEach((disposer) => disposer());
    }
    this.staticDisposers = undefined;
  }
}

export type TSessionRootState = typeof AppSessionStore.prototype.rootState;
