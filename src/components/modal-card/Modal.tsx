import { Dispatch, FC, SetStateAction } from "react";
import styles from "./modal.module.scss";
import { RiCloseLine } from "react-icons/ri";
import { ICharacters } from "../../api/get-characters";
interface ISetIsOpen {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: ICharacters;
}
export const Modal: FC<ISetIsOpen> = ({ setIsOpen, data }) => {
  const { image, species, status, name, gender, location, origin } = data;
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)}>
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <img src={image} alt="icon" />
              </div>
              <div className={styles.container}>
                <div className={styles["wrapper-column"]}>
                  <div className={styles["wrapper-div"]}>
                    <span>Name:</span>
                    <div>{name}</div>
                  </div>
                  <div className={styles["wrapper-div"]}>
                    <span>Status:</span>
                    <div>{status}</div>
                  </div>
                  <div className={styles["wrapper-div"]}>
                    <span>Species:</span>
                    <div>{species}</div>
                  </div>
                </div>
                <div className={styles["wrapper-column"]}>
                  <div className={styles["wrapper-div"]}>
                    <span>Origin:</span>
                    <div>{origin.name}</div>
                  </div>
                  <div className={styles["wrapper-div"]}>
                    <span>Location:</span>
                    <div>{location.name}</div>
                  </div>
                  <div className={styles["wrapper-div"]}>
                    <span>Gender:</span>
                    <div>{gender}</div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
