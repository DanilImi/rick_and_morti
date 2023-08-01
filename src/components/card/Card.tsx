import { FC, useState } from "react";
import { ICharacters } from "../../api/get-characters";
import { Loader } from "../loader/Loader";
import { Modal } from "../modal-card/Modal";
import styles from "./card.module.scss";
interface ICard {
  data: ICharacters;
}
export const Card: FC<ICard> = ({ data }) => {
  const { name, image } = data;
  const [isloadingCard, setIsLoadingCard] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const onComplete = () => {
    setIsLoadingCard(false);
  };
  return (
    <>
      <div onClick={() => setIsOpen(true)} className={styles["character-card"]}>
        <div className={styles["avatar-container"]}>
          <div className={styles["avatar-shadow"]}>
            {isloadingCard && <Loader />}
            <img
              className={styles.avatar}
              src={image}
              alt="Character avatar"
              onLoad={onComplete}
            />
          </div>
        </div>
        <div className={styles.name}>{name}</div>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} data={data} />}
    </>
  );
};
