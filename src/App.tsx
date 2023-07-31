import { FC, useCallback, useRef, useState } from "react";
import { Card } from "./components/card/Card";
import { usePagination } from "./hooks/usePagination";
import styles from "./app.module.scss";
import { Error } from "./components/error/Error";

const App: FC = () => {
  const [page, setPage] = useState(1);
  const { data, more, loading, error } = usePagination(page);
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
          <div className={styles.app}>
            {data.map((obj: any, index: number) => (
              <>
                <div
                  ref={index === data.length - 1 ? lastElementRef : undefined}
                >
                  <Card data={obj} />
                </div>
              </>
            ))}
            {loading && <li id="loader">Loading...</li>}
            {!more && <div id="end">You've the reached the end</div>}
          </div>
        </>
      )}
    </>
  );
};

export default App;
