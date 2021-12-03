import { useState, useEffect, useCallback } from "react";
import { FetchDataType } from "../models/IFetchData";
import { ItemType } from "../models/IItem";

const useFetch = (
  url: string,
  since: string,
  page: number,
  perPage: number
) => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);
  const [list, setList] = useState<ItemType[]>([]);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(false);

    const query = new URLSearchParams({
      since: since,
      per_page: perPage.toString(),
      page: page.toString(),
    }).toString();

    fetch(url + "?" + query)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error("Sorry, there is an issue on the server side.");
        }
      })
      .then((data) => {
        //get from the data only id, image of the owner and all file names
        const newList: ItemType[] = data.map((d: FetchDataType) => ({
          id: d.id,
          owner: d.owner.login,
          image: d.owner.avatar_url,
          names: Object.keys(d.files),
        }));
        setList((prevData: ItemType[]) => [...prevData, ...newList]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, [url, since, page, perPage]);

  useEffect(()=>{
    setList([]);
  },[since])

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  return { loading, error, list };
};

export default useFetch;
