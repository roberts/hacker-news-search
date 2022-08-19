import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const CommentCard = ({
  story_title,
  author,
  created_at,
  points,
  comment_text,
  story_id,
}) => {
  return (
    <div className="flex flex-1 items-center p-4 border-b border-gray-200">
      <div className="flex flex-col flex-1 ml-2.5 gap-1">
        <span
          className=" text-sm !whitespace-pre-wrap flex-1 gap-1.5 flex flex-col"
          dangerouslySetInnerHTML={{ __html: comment_text }}
        ></span>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span>
            {points} points by {author}
          </span>
          <span>|</span>
          <span>{dayjs(created_at).fromNow()}</span> <span>|</span>
          <a
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-all underline"
            href={`https://news.ycombinator.com/item?id=${story_id}`}
          >
            on : {story_title}
          </a>
        </div>
      </div>
    </div>
  );
};

export { CommentCard };
