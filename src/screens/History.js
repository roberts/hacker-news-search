import { useHistory } from "../hooks";

const History = () => {
  const { histories } = useHistory();

  return (
    <div className="flex flex-1 flex-col">
      <h1 className=" text-2xl">History</h1>
      {histories.length ? (
        <div className="bg-white flex flex-col border-gray-200 mt-6 border rounded-lg">
          {histories.map((item) => (
            <p
              key={item.id}
              className="flex flex-1 capitalize items-center p-4 border-b border-gray-200"
            >
              {item.type}
              <span className=" text-sm text-gray-600 mx-1.5 lowercase">
                about
              </span>
              {item.query}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export { History };
