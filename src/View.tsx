import { useLoaderData } from "react-router-dom";
import Peer from "peerjs";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function View() {
  const { peerId } = useLoaderData() as { peerId: string };

  useEffect(() => {
    const peer = new Peer(nanoid(8).toUpperCase(), {
      debug: 3,
    });

    peer.on("error", (err) => {
      console.log(err);
    });

    peer.on("open", () => {
      navigator.mediaDevices
        .getUserMedia({ video: {
          facingMode: "environment"
        }, audio: false,  })
        .then((stream: MediaStream) => {
          peer.call(peerId, stream);
        })
        .catch((err: Error) => {
          console.error("Failed to get local stream", err);
        });
    });
  }, [peerId]);

  return <>{peerId}</>;
}
