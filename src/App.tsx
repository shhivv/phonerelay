import { nanoid } from "nanoid";
import "./App.css";
import Peer from "peerjs";
import { useEffect, useState } from "react";

function App() {
  const id = nanoid(8).toUpperCase();
  const [streamEnabled, setStreamEnabled] = useState(false);

  useEffect(() => {
    const peer = new Peer(id, {});

    peer.on("error", (err) => {
      console.log(err);
    });

    peer.once("call", (call) => {
      call.answer();
      call.on("stream", (stream: MediaStream) => {
        setStreamEnabled(true);
        (document.getElementById("videoEl")! as HTMLVideoElement).srcObject =
          stream;
      });
    });
  }, [id]);

  return (
    <>
      {streamEnabled ? null : <div id="peerId">{id}</div>}
      <video id="videoEl" autoPlay />
    </>
  );
}

export default App;
