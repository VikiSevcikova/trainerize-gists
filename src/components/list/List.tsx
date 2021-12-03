import { useCallback, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { ItemType } from "../../models/IItem";
import Item from "../item/Item";
import "./List.css";

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
}

const List: React.FC = () => {
  const url = "https://api.github.com/gists/public";
  
  //query parameters
  //since query patern -> YYYY-MM-DDTHH:MM:SSZ
  let lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth()-1);
  const [since, setSince] = useState(formatDate(lastMonth));
  const [page, setPage] = useState(1);
  const perPage = 30;

  //hook for infinite scroll
  const { loading, error, list } = useFetch(url, since, page, perPage);
  //used useRef because it persists after each render
  const observer = useRef<IntersectionObserver>();

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
    <div className="container">
      <form className="form-date" onSubmit={handleSubmit}>
        <label htmlFor="since"> List of items since: </label>
        <input type="date" id="since" defaultValue={formatDate(lastMonth)} max={formatDate(new Date())}/>
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
    </div>
  )
};

export default List;
