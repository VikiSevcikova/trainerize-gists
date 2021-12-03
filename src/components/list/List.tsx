import { useCallback, useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { ItemType } from "../../models/IItem";
import Item from "../item/Item";
import "./List.css";

const List: React.FC = () => {
  const url = "https://api.github.com/gists/public";
  
  //query parameters
  //since query patern -> YYYY-MM-DDTHH:MM:SSZ
  const [since, setSince] = useState<string>(new Date("2021-09-10").toISOString());
  const [page, setPage] = useState<number>(1);
  const perPage = 30;

  //hook for infinite scroll
  const { loading, error, list } = useFetch(url, since, page, perPage);
  //used useRef because it persists after each render
  const observer = useRef<IntersectionObserver>();
  console.log("list",list);
  console.log("page",page)
  console.log("error",error)

  //lastItemRef is set to the last item in the list
  const lastItemRef = useCallback(node => {
    //if the data are loading then dont check if intersecting, we dont want to trigger to fetch new data
    if (loading) return;
    //if the observer is set we need to remove the observer from the last item so the new last item will be set correctly
    if (observer.current) observer.current.disconnect()
    //create a new observer and if last item is visible / in the viewport increase the page
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(page => page + 1)
      }
    })
    //the new last item in the list is set to be observed
    if (node) observer.current.observe(node)
  }, [loading]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      since: { value: string }
    };
    setSince(target.since.value);
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="since"> List of items since: </label>
        <input type="date" id="since" max={new Date().toISOString().split("T")[0]}/>
        <button type="submit">Submit</button>
      </form>

      <ul>
          {list.map((item: ItemType, index: number) => 
              {
                  if (list.length === index + 1) {
                      return <div ref={lastItemRef} key={item.id}> <Item item={item}/> </div>
                    } else {
                      return <div key={item.id}><Item item={item}/></div>
                    }
              }
          )}
      </ul>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
    </>
  )
};

export default List;
