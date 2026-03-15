"use client";

import { useCallback, useState } from "react";

const PITTER_PATTER_NEWSLETTER_UUID = "376e8237-adfe-45a3-9ce4-5acaff3e867f";

export function StayConnectedForm() {
  const [hasError, setHasError] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [roboFieldValue, setRoboFieldValue] = useState("");

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");

      if (roboFieldValue) {
        return;
      }

      const submitForm = async () => {
        try {
          const res = await fetch(
            "https://listmonk.handlewithcare.dev/api/public/subscription",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                list_uuids: [PITTER_PATTER_NEWSLETTER_UUID],
              }),
            },
          );
          if (res.status >= 400) {
            setHasError(true);
          } else {
            setHasError(false);
          }
        } catch (err) {
          console.warn(err);
          setHasError(true);
        }
        setHasSubmitted(true);
      };
      submitForm();
    },
    [],
  );

  return (
    <form
      className="mx-4 flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:items-baseline lg:mx-8 lg:justify-center"
      onSubmit={handleSubmit}
    >
      <span>Stay connected on our progress</span>
      <div className="relative flex flex-row">
        <div>
          <input
            type="email"
            name="email"
            placeholder="email address"
            required
            className="text-md w-[150px] rounded px-4 py-2 text-sm md:w-[250px] md:text-lg"
          />
          {hasError && (
            <p className="text-md absolute text-[#FF8A35] md:text-lg">
              Something went wrong. Try again?
            </p>
          )}
          {hasSubmitted && !hasError && (
            <p className="text-md absolute text-[#29F462] md:text-lg">
              Thanks for signing up!
            </p>
          )}
        </div>

        <div className="hidden">
          <label>{`Don't fill this out if you're human:`}</label>
          <input
            name="roboField"
            type="text"
            value={roboFieldValue}
            onChange={(e) => setRoboFieldValue(e.target.value)}
          />
        </div>
        <button type="submit" className="h-[45px] cursor-pointer underline">
          Get updates
        </button>
      </div>
    </form>
  );
}
