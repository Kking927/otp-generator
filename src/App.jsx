import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [otp, setOtp] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const isCounting = secondsLeft > 0;

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  const handleGenerateOtp = () => {
    setOtp(generateOtp());
    setSecondsLeft(5);
  };

  useEffect(() => {
    if (!isCounting) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isCounting]);

  return (
    <div className="container">
      <div className="card">
        <h1 id="otp-title">OTP Generator</h1>
        <h2 id="otp-display">
          {otp ? otp : "Click 'Generate OTP' to get a code"}
        </h2>
        <p id="otp-timer" aria-live="assertive">
          {isCounting
            ? `Expires in: ${secondsLeft} second${secondsLeft > 1 ? "s" : ""}`
            : otp && "OTP expired. Click the button to generate a new OTP."}
        </p>
        <button
          id="generate-otp-button"
          disabled={isCounting}
          onClick={handleGenerateOtp}
        >
          Generate OTP
        </button>
      </div>
    </div>
  );
}

export default App;
