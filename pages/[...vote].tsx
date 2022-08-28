import { Layout } from "../components/Layout";
import useSWR from "swr";

export default function Vote() {
  const url =
    "/api/fetchPoll?id=" +
    new URLSearchParams({
      id: window.location.href.split("/vote/")[1],
    });
  const { error, data } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );
  return <Layout poll>
    {error && <>An error occured while trying to fetch the poll</>}
{data ? JSON.stringify(data): <>Loading...</>}

  </Layout>;
}
