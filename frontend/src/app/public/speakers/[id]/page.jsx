"use client";

import { getSpeakerProfile } from "@/lib/api/profile";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SpeakerPage() {

  const params = useParams();

  const id = params.id;

  const [speaker, setSpeaker] = useState({
    id: null,
    fullName: "",
    bio: "",
    profilePicture: "",
    externalLinks: {},
    sessions: [],
  });

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!id) return;

    const fetchSpeaker = async () => {

      setError(null);

      try {

        const result = await getSpeakerProfile(id);

        if (!result.success) {

          setError(result.message || "Something went wrong");

        } else {

          setSpeaker(result.speaker);
        }

      } catch {

        setError("Cannot connect to server");

      } finally {

        setLoading(false);
      }
    };

    fetchSpeaker();

  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>

      <img
        src={speaker.profilePicture}
        alt={speaker.fullName}
        width={200}
      />

      <h1>{speaker.fullName}</h1>

      <p>{speaker.bio}</p>

      <h2>External Links</h2>

      <pre>
        {JSON.stringify(speaker.externalLinks, null, 2)}
      </pre>

      <h2>Sessions</h2>

      <ul>
        {speaker.sessions.map((session) => (
          <li key={session.id}>

            <h3>{session.title}</h3>

          </li>
        ))}
      </ul>

    </div>
  );
}