import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { CursorGlow } from "@/components/site/CursorGlow";
import { LoaderScreen } from "@/components/site/LoaderScreen";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-xl text-center w-full">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
        {error && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-lg text-left w-full overflow-auto max-w-2xl mx-auto shadow-sm">
            <h3 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2">
              Client-Side Diagnostic Error
            </h3>
            <p className="text-sm font-mono font-bold text-foreground break-all">{error.message || String(error)}</p>
            {error.stack && (
              <pre className="mt-2 text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all leading-relaxed max-h-60 p-3 bg-black/5 dark:bg-white/5 rounded border border-black/10">
                {error.stack}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Eunoia Resin Art — Preserving Your Precious Memories Forever" },
      { name: "description", content: "Luxury handcrafted resin art preserving bridal bouquets, baby keepsakes & life's most precious memories. Made with soul by Manjima in Kerala." },
      { name: "author", content: "Eunoia Resin Art" },
      { property: "og:title", content: "Eunoia Resin Art — Preserving Your Precious Memories Forever" },
      { property: "og:description", content: "Luxury handcrafted resin art preserving bridal bouquets, baby keepsakes & life's most precious memories. Made with soul by Manjima in Kerala." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Eunoia Resin Art — Preserving Your Precious Memories Forever" },
      { name: "twitter:description", content: "Luxury handcrafted resin art preserving bridal bouquets, baby keepsakes & life's most precious memories. Made with soul by Manjima in Kerala." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isCheckout = location.pathname === "/checkout";
  const isDashboard = location.pathname === "/manjima-dashboard";

  return (
    <QueryClientProvider client={queryClient}>
      <LoaderScreen />
      <CursorGlow />
      {!isDashboard && <Navbar />}
      <main className={isDashboard ? "" : "pt-20"}>
        <Outlet />
      </main>
      {!isCheckout && !isDashboard && <Footer />}
      {!isDashboard && <WhatsAppButton />}
    </QueryClientProvider>
  );
}
