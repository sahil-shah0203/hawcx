import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleBiometricAuth = async () => {
    if (!window.PublicKeyCredential) {
      setStatus("Biometric authentication is not supported on this browser.");
      return;
    }

    try {
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array([117, 34, 98, 191]),
          allowCredentials: [],
          timeout: 60000,
        },
      });

      if (credential) {
        setStatus("Biometric authentication successful. Submitting email...");
        await sendEmailToServer(); // ✅ Ensure navigation happens after this
      }
    } catch (error) {
      setStatus("Biometric authentication failed.");
    }
  };

  const sendEmailToServer = async () => {
    if (!email.trim()) {
      setStatus("Please enter a valid email.");
      return;
    }

    try {
      // Simulate an API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("Sent to backend! ✅");

      // ✅ Redirect to home page after 2 seconds (same behavior as Sign-Up)
      setTimeout(() => navigate(ROUTES.home, { replace: true }), 2000);
    } catch (error) {
      setStatus("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">Sign In with Biometrics</h2>
        <form className="flex flex-col space-y-4">
          <Input
            classes="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            classes="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleBiometricAuth}
          >
            Authenticate
          </Button>
          {status && <p className="text-center text-gray-600 mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
}
