import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { deployedPlatform, platformRegistrationUrl } from "@/lib/platformUrls";

function safeDestination(search: string, state: unknown) {
  const stateFrom = (state as { from?: string } | null)?.from;
  const queryNext = new URLSearchParams(search).get("next");
  const candidate = queryNext || stateFrom;
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//") || ["/", "/signin", "/register"].includes(candidate)) return null;
  return candidate;
}

export function SignInPage() {
  const { signIn, signInWithGoogle, configured, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const authNotice = (location.state as { authNotice?: string } | null)?.authNotice;

  useEffect(() => {
    if (!user) return;
    const next = safeDestination(location.search, location.state) || sessionStorage.getItem("ih_auth_next");
    sessionStorage.removeItem("ih_auth_next");
    navigate(next || "/account", { replace: true });
  }, [user, location.state, navigate]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    let message: string | null = null;
    try {
      message = await Promise.race([
        signIn(email, password),
        new Promise<string>((resolve) =>
          window.setTimeout(
            () => resolve("Sign-in is taking longer than expected. Please check your connection and try again."),
            15000,
          ),
        ),
      ]);
    } catch {
      message = "Unable to complete sign-in. Please try again.";
    } finally {
      setBusy(false);
    }
    if (message) return setError(message);
    if (rememberDevice) localStorage.setItem("ih_remember_device", "1");
    else localStorage.removeItem("ih_remember_device");
    const next = safeDestination(location.search, location.state);
    sessionStorage.removeItem("ih_auth_next");
    navigate(next || "/account", { replace: true });
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle={deployedPlatform === "corporate" ? "Sign in to continue to your IHLink account." : `Sign in to your ${deployedPlatform === "datasub" ? "DataSub" : deployedPlatform === "schoolpro" ? "SchoolPro" : "platform"} account.`}
    >
      {!configured && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 flex gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>
            The secure account service is prepared and awaiting its production
            Supabase credentials.
          </span>
        </div>
      )}
      {authNotice && <p className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">{authNotice}</p>}
      <form className="space-y-4" onSubmit={submit}>
        <Input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email address"
          type="email"
          leftIcon={<Mail className="w-4 h-4" />}
          placeholder="name@example.com"
        />
        <Input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type={showPassword ? "text" : "password"}
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={<button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="p-1 rounded hover:bg-gray-100">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>}
          placeholder="Enter your password"
        />
        {error && (
          <p
            role="alert"
            className="text-sm text-rose-600 bg-rose-50 rounded-lg p-3"
          >
            {error}
          </p>
        )}
        <div className="flex justify-between">
          <label className="flex items-center gap-2 text-sm text-muted"><input type="checkbox" checked={rememberDevice} onChange={(e) => setRememberDevice(e.target.checked)} className="h-4 w-4 rounded border-gray-300"/>Remember this device</label>
          <Link
            className="text-sm font-bold text-royal-600"
            to="/reset-password"
          >
            Forgot password?
          </Link>
        </div>
        <Button disabled={busy} fullWidth size="lg">
          {busy ? "Signing in…" : "Sign In"}
        </Button>
        <button
          disabled={busy}
          type="button"
          onClick={async () => {
            const next = safeDestination(location.search, location.state);
            if (next) sessionStorage.setItem("ih_auth_next", next);
            if (rememberDevice) localStorage.setItem("ih_remember_device", "1");
            else localStorage.removeItem("ih_remember_device");
            setError(await signInWithGoogle());
          }}
          className="w-full border rounded-xl py-3 font-semibold text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Continue with Google
        </button>
        <p className="text-sm text-center text-muted">
          New to IHLink?{" "}
          <a href={deployedPlatform === "corporate" ? "/register" : platformRegistrationUrl(deployedPlatform)} className="font-bold text-royal-600">
            Create account
          </a>
        </p>
      </form>
    </AuthShell>
  );
}
