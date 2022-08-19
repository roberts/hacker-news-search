import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const StoryCard = ({
  index,
  author,
  created_at,
  num_comments,
  points,
  title,
  objectID,
  url,
}) => {
  return (
    <div className="flex flex-1 items-center p-4 border-b border-gray-200">
      <span className="min-w-[2rem] text-center mr-3">{index}</span>
      <div class="w-0 h-0 border-l-8 border-r-8 border-transparent border-b-8 border-b-primary"></div>
      <div className="flex flex-col flex-1 ml-2.5 gap-1">
        <a
          href={`https://news.ycombinator.com/item?id=${objectID}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-baseline"
        >
          <h3 className=" text-lg">{title}</h3>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="ml-2 text-sm opacity-70 "
          >
            ({url})
          </a>
        </a>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span>
            {points} points by {author}
          </span>
          <span>|</span>
          <span>{dayjs(created_at).fromNow()}</span> <span>|</span>
          <span>{num_comments} comments</span>
        </div>
      </div>
    </div>
  );
};

export { StoryCard };
