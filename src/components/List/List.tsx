import { useEffect, useState } from "react";
import "./List.css";
import { fetchApi } from "../../fetchApi";
import { Details } from "../Details/Details";

type TypeLoadData = {
  id: number | null;
  name: string;
};

export const List = () => {
  const [loading, setLoading] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [componentInfo, setComponentInfo] = useState<TypeLoadData>({
    id: null,
    name: "",
  });
  const [data, setData] = useState<TypeLoadData[]>([]);

  const loadData = async () => {
    setLoading(true);
    const url =
      "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json";

    const fetchResponse = await fetchApi(url);

    setData(fetchResponse);
  };

  useEffect(() => {
    if (!loading) {
      loadData();
    }
  }, [loading]);

  const handleClick = (id: number | null, name: string) => {
    setShowComponent(true);
    const info = { id, name };

    setComponentInfo(info);
  };
  if (!loading) {
    return <span>Загрузка...</span>;
  }
  return (
    <div className="container">
      <div className="list-container">
        {data.length !== 0 &&
          data.map((item) => {
            return (
              <div
                className="list-item"
                key={item.id}
                onClick={() => handleClick(item.id, item.name)}
              >
                {item.name}
              </div>
            );
          })}
      </div>

      {showComponent && <Details info={componentInfo} />}
    </div>
  );
};
