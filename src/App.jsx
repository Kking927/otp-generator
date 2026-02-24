import { useState, useEffect } from "react";
import "./app.css";
import "./index.css";

function App() {
  const [otp, setOtp] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [copied, setCopied] = useState(false);

  const isCounting = secondsLeft > 0;

  // Generate a 6-digit OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  // Handle Generate OTP button
  const handleGenerateOtp = () => {
    setOtp(generateOtp());
    setSecondsLeft(5);
    setCopied(false); // reset copied state when new OTP is generated
  };

  // Countdown timer logic
  useEffect(() => {
    if (!isCounting) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isCounting]);

  // Copy OTP to clipboard when clicked
  const handleCopy = () => {
    if (!otp) return;
    navigator.clipboard.writeText(otp);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // hide "Copied!" after 1.5s
  };

  return (
    <div className="container">
      <div className="card">
        <h1 id="otp-title">OTP Generator</h1>
        <h2
          id="otp-display"
          className={copied ? "copied" : ""}
          onClick={handleCopy}
        >
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
