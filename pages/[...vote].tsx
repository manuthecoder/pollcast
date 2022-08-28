import { Layout } from "../components/Layout";
import useSWR from "swr";
import io from "socket.io-client";
import { useState, useEffect } from "react";

let socket: any;

export default function Vote() {
  const [username, setUsername] = useState("");
  const [chosenUsername, setChosenUsername] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("newIncomingMessage", (msg: any) => {
      alert(msg);
    });
  };

  const sendMessage = async (msg: string) => {
    socket.emit("createdMessage", msg);
    alert("Sent!");
  };

  const url =
    "/api/fetchPoll?id=" +
    new URLSearchParams({
      id: window.location.href.split("/vote/")[1],
    });
  const { error, data } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );

  return (
    <Layout poll>
      {error && <>An error occured while trying to fetch the poll</>}
      {data ? JSON.stringify(data) : <>Loading...</>}
      <button onClick={() => sendMessage("Hi")}>Hi</button>
    </Layout>
  );
}
