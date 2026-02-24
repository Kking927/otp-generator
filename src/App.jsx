import { useState, useEffect } from "react";
import "./App.css";
import ".index.css";

function App() {
  const [otp, setOtp] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [copied, setCopied] = useState(false);

  const isCounting = secondsLeft > 0;

  // Generate a 6-digit OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  // Handle Generate OTP button click
  const handleGenerateOtp = () => {
    setOtp(generateOtp());
    setSecondsLeft(5);
    setCopied(false); // reset copied state when new OTP is generated
  };

  // Countdown timer
  useEffect(() => {
    if (!isCounting) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isCounting]);

  // Copy OTP to clipboard
  const handleCopy = () => {
    if (!otp) return;
    navigator.clipboard.writeText(otp);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // hide "Copied!" after 1.5s
  };

  return (
    <div className="container">
      <div className="card">
        <h1 id="otp-title">OTP Generator</h1>

        {/* OTP display with copy functionality */}
        <h2
          id="otp-display"
          className={copied ? "copied" : ""}
          onClick={otp ? handleCopy : undefined}
        >
          {otp ? otp : "Click\n 'Generate OTP'\n to get a code"}
        </h2>

        {/* Countdown / expiration message */}
        <p id="otp-timer" aria-live="assertive">
          {isCounting
            ? `Expires in: ${secondsLeft} second${secondsLeft > 1 ? "s" : ""}`
            : otp && "OTP expired. Click the button to generate a new OTP."}
        </p>

        {/* Generate button */}
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
