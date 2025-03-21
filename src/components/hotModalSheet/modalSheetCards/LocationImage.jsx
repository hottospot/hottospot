import styles from './LocationImage.module.scss';
import { locationPositionAtom } from '../../../atoms/locationPositionAtom';
import { useAtomValue } from 'jotai';

export const LocationImage = () => {
  const locationData = useAtomValue(locationPositionAtom);

  const copyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(locationData.address);
      console.log('コピー成功しました！！');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.leftContents}>
      <img className={styles.image} src={locationData.photo} alt="fire" />
      <div className={styles.textContainer}>
        <div className={styles.locationName}>{locationData?.name}</div>
        <div className={styles.locationDetails}>
          {locationData?.explanation}
        </div>
        <div className={styles.address} onClick={copyClipboard}>
          {locationData.address}
        </div>
      </div>
    </div>
  );
};
