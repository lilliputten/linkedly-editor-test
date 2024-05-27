import { makeObservable, observable, action, when, IReactionDisposer, computed } from 'mobx';
import bound from 'bind-decorator';

import { TTestData } from 'src/core/types';

export class AppDataStore {
  // NOTE: remember to clean/reset properties in `clearData`

  // Session reaction disposers...
  staticDisposers?: IReactionDisposer[];

  /* // UNUSED: File info
   * fileInfos: Partial<Record<TAppDataKey, TDataFileUploadInfo>> = {};
   */

  // State...
  @observable inited: boolean = false;
  @observable finished: boolean = false;
  @observable ready: boolean = false;
  @observable loading: boolean = false;
  @observable error?: Error;

  // Data...
  @observable testData?: TTestData;

  // Lifecycle...

  constructor() {
    makeObservable(this);
    // Automatically clear the error for final& successfull statuses (started, stopped)
    when(() => this.finished, this.clearError);
    this.setStaticReactions();
  }

  async destroy() {
    this.clearData();
    // TODO: Cleanup before exit?
    this.resetStaticReactions();
  }

  // Core getters...

  @computed get hasAllData() {
    return !!(
      this.testData /* && this.edgesData && this.flowsData && this.graphsData && this.nodesData */
    );
  }
  @computed get hasSomeData() {
    return !!(
      this.testData /* || this.edgesData || this.flowsData || this.graphsData || this.nodesData */
    );
  }

  @computed get hasData() {
    return this.hasAllData;
  }

  // Updaters...

  // Status setters...

  @action setInited(inited: typeof AppDataStore.prototype.inited) {
    this.inited = inited;
  }

  @action setFinished(finished: typeof AppDataStore.prototype.finished) {
    this.finished = finished;
  }

  @action setReady(ready: typeof AppDataStore.prototype.ready) {
    this.ready = ready;
  }

  @action setLoading(loading: typeof AppDataStore.prototype.loading) {
    this.loading = loading;
  }

  @action setError(error: typeof AppDataStore.prototype.error) {
    this.error = error;
  }

  @bound clearError() {
    this.setError(undefined);
  }

  // Data setters...

  @action setTestData(testData: typeof AppDataStore.prototype.testData) {
    this.testData = testData;
  }

  // File infos...

  /* // UNUSED: File info
   * @action setFileInfo(id: TAppDataKey, info?: TDataFileUploadInfo) {
   *   this.fileInfos = {
   *     ...this.fileInfos,
   *     [id]: info,
   *   };
   * }
   * @action clearFileInfos() {
   *   this.fileInfos = {};
   * }
   */

  // Generic utilities...

  @action clearData() {
    // NOTE: Don't just clear the data. It's a place to set them to default values.
    // Status...
    this.inited = false;
    this.finished = false;
    this.ready = false;
    this.loading = false;
    this.error = undefined;
    // Data...
    this.testData = undefined;
  }

  // Reactions...

  setStaticReactions() {
    this.staticDisposers = [
      // reaction(() => this.autoHiddenGraphNodes, this.updateHiddenGraphNodes),
      // reaction(() => this.userHiddenGraphNodes, this.updateHiddenGraphNodes),
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
