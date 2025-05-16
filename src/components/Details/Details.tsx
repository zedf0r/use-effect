import { useEffect, useState } from "react";
import { fetchApi } from "../../fetchApi";

type TypeDetailsProps = {
  id: number | null;
  name: string;
};

type TypeDetail = {
  id: number;
  name: string;
  avatar?: string;
  details: {
    city: string;
    company: string;
    position: string;
  };
};

export const Details = ({ info }: { info: TypeDetailsProps }) => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<TypeDetail | null>(null);

  const loadData = async () => {
    setLoading(true);
    const url = `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`;

    const fetchRespone = await fetchApi(url);

    setDetail(fetchRespone);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
    return () => {};
  }, [info.id]);

  if (loading) {
    return <span>Загрузка...</span>;
  }

  return (
    <div className="details">
      <>
        <img src={detail?.avatar} alt={detail?.name} />
        <div className="detail name">{detail?.name}</div>
        <div className="detail">City: {detail?.details.city}</div>
        <div className="detail">Company: {detail?.details.company}</div>
        <div className="detail">Position: {detail?.details.position}</div>
      </>
    </div>
  );
};
