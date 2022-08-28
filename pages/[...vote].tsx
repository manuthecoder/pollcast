import { Layout } from "../components/Layout";
import useSWR from "swr"

export default function Vote() {
  const url = "/api/fetchPoll?id="+ new URLSearchParams({
    id: window.location.href.split("/vote/")[1]
  })
  const {error, data} = useSWR(url, () => fetch(url).then(res => res.json()))
  return <Layout poll></Layout>;
}
