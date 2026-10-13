"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, LayoutGrid } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { STORY_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { StorySummary } from "@/types";
import { STORY_CATEGORY_ICON } from "./story-category";
import { StoryGrid } from "./story-grid";

/** Stories per page. */
const PAGE_SIZE = 3;

type View = { category: string | null; page: number };

function parse(params: URLSearchParams): View {
  const slug = params.get("category");
  const category = STORY_CATEGORIES.some((c) => c.slug === slug) ? slug : null;
  const page = Number.parseInt(params.get("page") ?? "1", 10);
  return { category, page: Number.isFinite(page) && page > 0 ? page : 1 };
}

function serialise({ category, page }: View) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  return params.toString();
}

/**
 * The stories list. One row of category filters on top, three cards a page
 * and a pager underneath. The URL query is the state —
 * `?category=agro-tourism&page=2` — so a view can be shared, and the article
 * pages link straight to a category. Changes go through
 * `history.replaceState`, which Next keeps in step with `useSearchParams`;
 * nothing navigates away from the page.
 *
 * Wrap in Suspense with `StoriesBrowserFallback`: the first page, unfiltered,
 * which is what the prerendered HTML shows.
 */
export function StoriesBrowser({ stories }: { stories: StorySummary[] }) {
  const params = useSearchParams();
  const view = parse(new URLSearchParams(params.toString()));

  const onChange = (next: View) => {
    const query = serialise(next);
    window.history.replaceState(
      null,
      "",
      `${query ? `?${query}` : window.location.pathname}${window.location.hash}`,
    );
  };

  return <BrowserView stories={stories} view={view} onChange={onChange} />;
}

export function StoriesBrowserFallback({ stories }: { stories: StorySummary[] }) {
  return <BrowserView stories={stories} view={{ category: null, page: 1 }} onChange={() => {}} />;
}

function BrowserView({
  stories,
  view,
  onChange,
}: {
  stories: StorySummary[];
  view: View;
  onChange: (next: View) => void;
}) {
  const topRef = useRef<HTMLDivElement>(null);

  const category = STORY_CATEGORIES.find((c) => c.slug === view.category);
  const results = category ? stories.filter((story) => story.category === category.key) : stories;
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(view.page, pageCount);
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const countFor = (key: string) => stories.filter((story) => story.category === key).length;

  /**
   * Apply a change. A category change leaves the page where it is; a page
   * change brings the top of the list back into view.
   */
  const update = (next: View) => {
    onChange(next);
    if (next.page === page) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div ref={topRef} className="scroll-mt-28 sm:scroll-mt-32">
      {/* Categories — one frosted glass row, fixed in place above the list.
          It scrolls sideways, scrollbar hidden, where it can't fit. */}
      <fieldset className="min-w-0">
        <legend className="sr-only">Story category</legend>
        <div className="flex gap-1.5 overflow-x-auto overscroll-x-contain rounded-pill border border-white bg-white/70 p-1.5 shadow-card ring-1 ring-brand/10 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Tab
            checked={!category}
            onChange={() => update({ category: null, page: 1 })}
            icon={<LayoutGrid aria-hidden="true" className="size-4" strokeWidth={1.75} />}
            count={stories.length}
          >
            All stories
          </Tab>
          {STORY_CATEGORIES.map(({ key, slug, title }) => {
            const Icon = STORY_CATEGORY_ICON[key];
            return (
              <Tab
                key={key}
                checked={category?.key === key}
                onChange={() => update({ category: slug, page: 1 })}
                icon={<Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />}
                count={countFor(key)}
              >
                {title}
              </Tab>
            );
          })}
        </div>
      </fieldset>

      {/* What is showing — announced politely when the filter changes. */}
      <div className="mt-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 sm:mt-12">
        <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          {category ? category.title : "All travel stories"}
        </h2>
        <p aria-live="polite" className="text-sm text-muted">
          {results.length === 0
            ? "No stories yet"
            : `${results.length} ${results.length === 1 ? "story" : "stories"}${
                pageCount > 1 ? ` · Page ${page} of ${pageCount}` : ""
              }`}
        </p>
      </div>
      {category && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-pretty text-muted">{category.intro}</p>
      )}

      <div className="mt-10">
        {visible.length > 0 ? (
          <StoryGrid stories={visible} />
        ) : (
          <div className="mx-auto max-w-xl rounded-card bg-brand-light px-6 py-14 text-center sm:px-10">
            <BookOpen aria-hidden="true" className="mx-auto size-8 text-brand" strokeWidth={1.5} />
            <p className="mt-4 font-display text-2xl leading-tight text-ink">New stories coming soon</p>
            <p className="mt-3 text-base leading-relaxed text-pretty text-muted">
              We are writing the first {category?.title.toLowerCase()} stories now. In the meantime,
              there is plenty to read in the rest of the collection.
            </p>
            <ButtonLink
              href="/travel-stories"
              variant="secondary"
              className="mt-8"
              onClick={(event) => {
                event.preventDefault();
                update({ category: null, page: 1 });
              }}
            >
              Browse all travel stories
            </ButtonLink>
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <nav aria-label="Stories pages" className="mt-16 flex items-center justify-center gap-2">
          <PagerButton
            disabled={page === 1}
            onClick={() => update({ category: view.category, page: page - 1 })}
            label="Previous page"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Previous</span>
          </PagerButton>

          <ol className="flex items-center gap-1.5">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <button
                  type="button"
                  aria-label={`Page ${n}`}
                  aria-current={n === page ? "page" : undefined}
                  onClick={() => update({ category: view.category, page: n })}
                  className={cn(
                    "grid size-11 place-items-center rounded-pill text-sm font-medium tabular-nums transition-colors duration-200 ease-out",
                    n === page ? "bg-brand text-white" : "text-ink hover:bg-brand-light hover:text-brand",
                  )}
                >
                  {n}
                </button>
              </li>
            ))}
          </ol>

          <PagerButton
            disabled={page === pageCount}
            onClick={() => update({ category: view.category, page: page + 1 })}
            label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </PagerButton>
        </nav>
      )}
    </div>
  );
}

function Tab({
  checked,
  onChange,
  icon,
  count,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <label className="group/tab inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-pill px-4 py-2.5 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-200 ease-out select-none hover:bg-brand-light hover:text-brand has-checked:bg-brand has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand">
      <input type="radio" name="story-category" checked={checked} onChange={onChange} className="sr-only" />
      {icon}
      {children}
      <span className="rounded-pill bg-brand/10 px-2 py-0.5 text-xs tabular-nums group-has-checked/tab:bg-white/20">
        {count}
      </span>
    </label>
  );
}

function PagerButton({
  disabled,
  onClick,
  label,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-11 items-center gap-2 rounded-pill border border-brand px-4 text-sm font-medium text-brand transition-colors duration-200 ease-out hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-35 sm:px-5"
    >
      {children}
    </button>
  );
}
