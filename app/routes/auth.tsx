import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

export const meta = () => [
  { title: "Resumind | Sign In" },
  {
    name: "description",
    content:
      "Sign in to Resumind and analyze your resumes with AI — powered by Puter.js, right in your browser.",
  },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next ? decodeURIComponent(next) : "/");
    }
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-100">
        <Link to={"/"}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Resumind
          </h1>
        </Link>

        {/* Subtitle */}
        <p className="mt-2 text-gray-600">
          AI-powered resume insights — private, local, and fully under your
          control.
        </p>

        <hr className="my-6 border-gray-200" />

        {/* Info Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Welcome 👋</h2>
          <p className="text-gray-500 text-sm">
            Sign in with your Puter account to manage and analyze your resumes.
            Everything runs in your browser — your data stays with you.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8">
          {isLoading ? (
            <button
              disabled
              className="w-full py-3 rounded-xl bg-blue-500 text-white font-medium opacity-70 animate-pulse"
            >
              Signing you in...
            </button>
          ) : auth.isAuthenticated ? (
            <button
              onClick={auth.signOut}
              className="w-full py-3 rounded-xl bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={auth.signIn}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
            >
              Log In with Puter
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-gray-400">
          Powered by{" "}
          <span className="font-semibold text-gray-500">Puter.js</span> — no
          servers, no tracking, just your data.
        </p>
      </div>
    </main>
  );
};

export default Auth;
