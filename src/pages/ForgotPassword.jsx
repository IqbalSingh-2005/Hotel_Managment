import { useState } from "react";
import { Background } from "../components/Background";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email) {
        setSubmitted(true);
      } else {
        setError("Please enter a valid email address");
      }
      setIsLoading(false);
    }, 1000);
  };

  if (submitted) {
    return (
      <Background>
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md animate-slideUp">
            {/* Success Message */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
              {/* Check Icon */}
              <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4 cinzel-decorative-regular">
                Check Your Email
              </h2>
              <p className="text-gray-300 mb-6 lora-sans">
                We've sent password reset instructions to
                <span className="block text-white font-medium mt-2">{email}</span>
              </p>
              <p className="text-sm text-gray-400 mb-8">
                Didn't receive the email? Check your spam folder or try again.
              </p>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full py-3 bg-white/5 border border-white/20 text-white rounded-xl 
                           hover:bg-white/10 transition-all duration-300"
                >
                  Try Another Email
                </button>
                <Link
                  to="/login"
                  className="block w-full py-3 bg-gradient-to-r from-white/20 to-white/10 border border-white/30 text-white rounded-xl 
                           font-light tracking-wide uppercase text-center transition-all duration-300 
                           hover:from-white hover:to-gray-100 hover:text-black hover:shadow-[0_12px_35px_rgba(255,255,255,0.3)]"
                >
                  Back to Login
                </Link>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-slideUp">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 cinzel-decorative-regular">
              Reset Password
            </h1>
            <p className="text-gray-300 lora-sans">
              Enter your email to receive reset instructions
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <label className="block text-white text-sm font-light mb-2 lora-sans">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 
                             focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              {/* Info Message */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                  💡 We'll send you an email with a link to reset your password. The link will expire in 1 hour.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-white/20 to-white/10 border border-white/30 text-white rounded-xl 
                         font-light tracking-wide uppercase transition-all duration-300 
                         hover:from-white hover:to-gray-100 hover:text-black hover:shadow-[0_12px_35px_rgba(255,255,255,0.3)]
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white text-sm transition-colors inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Background>
  );
};
