import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [otp, setOtp] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [copied, setCopied] = useState(false);

  const isCounting = secondsLeft > 0;

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  const handleGenerateOtp = () => {
    setOtp(generateOtp());
    setSecondsLeft(5);
    setCopied(false); // reset copied status
  };

  const handleCopyOtp = () => {
    if (!otp) return; // nothing to copy
    navigator.clipboard.writeText(otp).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // hide tooltip after 1.5s
    });
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

        <h2
          id="otp-display"
          onClick={handleCopyOtp}
          style={{ cursor: otp ? "pointer" : "default", position: "relative" }}
        >
          {otp ? otp : "Click 'Generate OTP' to get a code"}
          {copied && (
            <span
              style={{
                position: "absolute",
                top: "-1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#ff00ff",
                color: "#fff",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
                fontWeight: "600",
                boxShadow: "0 0 5px #ff00ff",
              }}
            >
              Copied!
            </span>
          )}
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
