import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-red-100 text-red-600 mx-auto mb-6">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Authentication Error
        </h1>
        <p className="text-zinc-600 mb-8">
          We encountered an error while trying to authenticate you. Please try again.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-[#E53935] text-white font-medium rounded-xl transition-all duration-200 hover:bg-[#C62828]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
