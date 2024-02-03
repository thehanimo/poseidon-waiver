import Form from "@/components/Form";
import { useState } from "react";

export default function Home() {
  const [completed, setCompleted] = useState(false);
  return (
    <div className="">
      <div className="flex justify-center align-items-center">
        <img
          className="w-[120px] py-4"
          src="/Header_Logo_Grey_paddlesurf_600x.gif"
        />
      </div>

      {completed ? (
        <div className="flex flex-col justify-center items-center mt-40">
          <div className="font-serif text-4xl">You&apos;re all set!</div>
          <button
            onClick={() => setCompleted(false)}
            className="flex items-center mt-40 hover:underline transition-all"
          >
            Start over <img className="ml-1 w-4" src="/retry.svg" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-center align-items-center mt-8">
            <div className="font-serif text-4xl">
              Let&apos;s get you started!
            </div>
          </div>
          <Form setCompleted={setCompleted} />
        </>
      )}
    </div>
  );
}
