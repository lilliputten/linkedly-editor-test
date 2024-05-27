import * as React from 'react';
import classNames from 'classnames';

import { TPropsWithClassName } from 'src/core/types';
import { version, timestamp } from 'src/core/constants/config';

import styles from './AppFooter.module.scss';

/* // UNUSED: Old data state helpers
 * const FileInfoContent: React.FC<{ info: TDataFileUploadInfo }> = ({ info }) => {
 *   const appDataStore = useAppDataStore();
 *   const {
 *     fileId,
 *     fileName,
 *     // fileType,
 *     fileSize,
 *   } = info;
 *   const title = makeTitleFromPropertyId(fileId, { parseCamelCase: true });
 *   const size = getApproxSize(fileSize, { normalize: true }).join('');
 *   const dataInfo = getAppDataInfo(appDataStore[fileId]);
 *   return (
 *     <span className={styles.FileInfo} data-file-id={fileId}>
 *       {title}: <strong>{fileName}</strong> ({size}, {dataInfo})
 *     </span>
 *   );
 * };
 * const DataState: React.FC<TPropsWithClassName> = observer((props) => {
 *   const { className } = props;
 *   const appDataStore = useAppDataStore();
 *   const {
 *     // prettier-ignore
 *     hasSomeData,
 *     fileInfos,
 *   } = appDataStore;
 *   const content =
 *     hasSomeData &&
 *     !!fileInfos &&
 *     Object.values(fileInfos)
 *       .filter(Boolean)
 *       .map((info) => <FileInfoContent key={info.fileId} info={info} />);
 *   return <div className={classNames(className, styles.DataState)}>{content}</div>;
 * });
 */

export const AppFooter: React.FC<TPropsWithClassName> = (props) => {
  const appInfo = `Version: ${version} @${timestamp}`;
  const { className } = props;
  return (
    <div className={classNames(className, styles.root)}>
      {/* // TODO: Show data state
      <DataState className={classNames(styles.leftInfo)} />
      */}
      <div className={classNames(styles.rightInfo)}>
        {/* Application info */}
        {appInfo}
      </div>
    </div>
  );
};
