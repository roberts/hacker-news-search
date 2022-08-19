/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useMemo, useEffect } from "react";
import { useInfiniteQuery } from "react-query";

import { CommentCard, StoryCard } from "../components";
import { useDebounce, useHistory } from "../hooks";

const Search = () => {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState("story");
  const queryDebounced = useDebounce(query, 400);
  const { addHistory } = useHistory();
  const canFetch = useRef(true);
  const list = useInfiniteQuery(
    ["search", queryDebounced, tags],
    ({ pageParam = 0 }) =>
      fetch(
        `https://hn.algolia.com/api/v1/search?query=${queryDebounced}&tags=${tags}&page=${pageParam}`
      ).then((res) => res.json()),
    {
      onSettled: () => {
        canFetch.current = true;
      },
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        const current = lastPage?.page;
        if (lastPage?.nbPages > current + 1) {
          return (current || 0) + 1;
        }
        return undefined;
      },
    }
  );
  const CardComponent = {
    story: StoryCard,
    comment: CommentCard,
  }[tags];

  const data = useMemo(() => {
    const hits = list.data?.pages.reduce((initial, item) => {
      return [...initial, ...(item.hits || [])];
    }, []);
    return hits || [];
  }, [list]);

  const fetchNextPage = () => {
    if (canFetch.current) {
      canFetch.current = false;
      list.fetchNextPage();
    }
  };

  useEffect(() => {
    if (queryDebounced) addHistory(queryDebounced, tags);
  }, [tags, queryDebounced]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex w-full mb-6 gap-4">
        <input
          className=" h-16 bg-white focus:outline-primary border-gray-200 border rounded-lg flex-1 px-6"
          type="text"
          placeholder="Search by title, url or author"
          onChange={({ target }) => setQuery(target.value)}
        />
        <select
          className=" w-36 cursor-pointer focus:outline-primary bg-white border-gray-200 border rounded-lg px-4"
          onChange={({ target }) => setTags(target.value)}
        >
          <option value="story">Stories</option>
          <option value="comment">Comments</option>
        </select>
      </div>
      {data.length ? (
        <div className="bg-white flex flex-col border-gray-200 border rounded-lg">
          {data.map((item, index) => (
            <CardComponent key={item.objectID} index={index + 1} {...item} />
          ))}
        </div>
      ) : null}
      {list.isLoading || list.isFetching ? (
        <div className="flex w-full justify-center my-6 py-3">
          <span className=" text-primary font-bold">Loading...</span>
        </div>
      ) : (
        <button
          className="my-6 bg-primary self-center px-8 py-3 rounded-md"
          onClick={fetchNextPage}
        >
          <span className=" text-white">Load more</span>
        </button>
      )}
    </div>
  );
};

export { Search };
