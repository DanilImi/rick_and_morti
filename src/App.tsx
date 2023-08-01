import { FC, useCallback, useRef, useState } from "react";
import { Card } from "./components/card/Card";
import { usePagination } from "./hooks/usePagination";
import styles from "./app.module.scss";
import { Error } from "./components/error/Error";
import { FaArrowCircleUp } from "react-icons/fa";
import { Loader } from "./components/loader/Loader";

const App: FC = () => {
  const [page, setPage] = useState(1);
  const { data, more, loading, error } = usePagination(page);
  const ref = useRef(null);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const observer = useRef<IntersectionObserver | null>();

  const lastElementRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      if (!more) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && more) setPage((prev) => prev + 1);
      });
      if (element) observer.current.observe(element);
    },
    [more]
  );
  return (
    <>
      {error ? (
        <Error />
      ) : (
        <>
          <div className={styles.app} ref={ref}>
            <button className={styles["btn-to-top"]} onClick={scrollToTop}>
              <FaArrowCircleUp size={24} color="#333" />
            </button>
            {data.map((obj: any, index: number) => (
              <>
                <div
                  ref={index === data.length - 1 ? lastElementRef : undefined}
                >
                  <Card data={obj} />
                </div>
              </>
            ))}
            {loading && <Loader />}
            {!more && <div id="end">You've the reached the end</div>}
          </div>
        </>
      )}
    </>
  );
};

export default App;
