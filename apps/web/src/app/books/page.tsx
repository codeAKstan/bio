"use client";

import { Button } from "@bio/ui/components/button";
import { Card } from "@bio/ui/components/card";
import { Checkbox } from "@bio/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@bio/ui/components/dropdown-menu";
import { Input } from "@bio/ui/components/input";
import { Label } from "@bio/ui/components/label";
import { ChevronDown, ChevronUp, Grid2x2, Grid3x3, Grid as GridIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import coverA from "../../c.png";
import coverB from "../../first.jpg";
import coverC from "../../second.webp";
import coverD from "../../third.webp";

type BookItem = {
  id: string;
  title: string;
  price: number;
  inStock: boolean;
  onSale: boolean;
  image: StaticImageData;
};

const BOOKS: BookItem[] = [
  {
    id: "beyond-luxury",
    title: "Beyond Luxury: The Luxury Mindset",
    price: 9.99,
    inStock: true,
    onSale: true,
    image: coverB,
  },
  {
    id: "immersive-memories",
    title: "Immersive Memories",
    price: 99.0,
    inStock: true,
    onSale: false,
    image: coverC,
  },
  {
    id: "editorials-vol-1",
    title: "Editorials, Vol. 1",
    price: 49.0,
    inStock: false,
    onSale: false,
    image: coverD,
  },
  {
    id: "campaign-notes",
    title: "Campaign Notes",
    price: 35.0,
    inStock: true,
    onSale: false,
    image: coverA,
  },
  {
    id: "limited-edition",
    title: "Limited Edition Prints",
    price: 120.0,
    inStock: true,
    onSale: true,
    image: coverC,
  },
  {
    id: "studio-journal",
    title: "Studio Journal",
    price: 24.0,
    inStock: true,
    onSale: false,
    image: coverB,
  },
  {
    id: "sequencing-and-pace",
    title: "Sequencing & Pace",
    price: 59.0,
    inStock: false,
    onSale: true,
    image: coverD,
  },
  {
    id: "collaboration-series",
    title: "Collaboration Series",
    price: 79.0,
    inStock: true,
    onSale: false,
    image: coverA,
  },
  {
    id: "personal-work",
    title: "Personal Work Collection",
    price: 89.0,
    inStock: true,
    onSale: false,
    image: coverC,
  },
  {
    id: "special-edition",
    title: "Special Edition",
    price: 149.0,
    inStock: true,
    onSale: true,
    image: coverD,
  },
  {
    id: "proofs",
    title: "Proofs & Outtakes",
    price: 29.0,
    inStock: false,
    onSale: false,
    image: coverB,
  },
  {
    id: "body-of-work",
    title: "A Body of Work",
    price: 109.0,
    inStock: true,
    onSale: false,
    image: coverA,
  },
];

type SortKey = "default" | "price-asc" | "price-desc" | "title-asc";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Default sorting" },
  { key: "title-asc", label: "Name: A to Z" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export default function BooksPage() {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterOnSale, setFilterOnSale] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [pageSize, setPageSize] = useState<9 | 12 | 18 | 24>(9);
  const [page, setPage] = useState(1);

  const filteredAndSorted = useMemo(() => {
    const filtered = BOOKS.filter((b) => {
      if (b.price < minPrice || b.price > maxPrice) return false;
      if (filterInStock && !b.inStock) return false;
      if (filterOnSale && !b.onSale) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sortKey) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return sorted;
  }, [filterInStock, filterOnSale, maxPrice, minPrice, sortKey]);

  const total = filteredAndSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = filteredAndSorted.slice(startIndex, startIndex + pageSize);

  const gridClass =
    gridCols === 2 ? "lg:grid-cols-2" : gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <main className="min-h-svh w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Books</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-8">
            <div>
              <div className="text-xs font-semibold tracking-wide text-foreground">FILTER BY PRICE</div>
              <div className="mt-4 flex items-end gap-3">
                <div className="flex-1">
                  <div className="text-[11px] text-muted-foreground">Min</div>
                  <Input
                    inputMode="numeric"
                    value={minPrice}
                    onChange={(e) => {
                      const next = Number(e.target.value || 0);
                      setMinPrice(next);
                      setPage(1);
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] text-muted-foreground">Max</div>
                  <Input
                    inputMode="numeric"
                    value={maxPrice}
                    onChange={(e) => {
                      const next = Number(e.target.value || 0);
                      setMaxPrice(next);
                      setPage(1);
                    }}
                  />
                </div>
                <Button
                  className="rounded-full bg-indigo-600 px-4 text-xs font-semibold text-white hover:bg-indigo-500"
                  onClick={() => setPage(1)}
                >
                  Filter
                </Button>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Price: {formatPrice(minPrice)} — {formatPrice(maxPrice)}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-wide text-foreground">STOCK STATUS</div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={filterOnSale}
                    onCheckedChange={(checked) => {
                      setFilterOnSale(Boolean(checked));
                      setPage(1);
                    }}
                  />
                  <Label>On sale</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={filterInStock}
                    onCheckedChange={(checked) => {
                      setFilterInStock(Boolean(checked));
                      setPage(1);
                    }}
                  />
                  <Label>In stock</Label>
                </div>
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-muted-foreground">
                Show&nbsp;
                <button
                  type="button"
                  className="px-1 hover:text-foreground"
                  onClick={() => {
                    setPageSize(9);
                    setPage(1);
                  }}
                >
                  9
                </button>
                &nbsp;/&nbsp;
                <button
                  type="button"
                  className="px-1 hover:text-foreground"
                  onClick={() => {
                    setPageSize(12);
                    setPage(1);
                  }}
                >
                  12
                </button>
                &nbsp;/&nbsp;
                <button
                  type="button"
                  className="px-1 hover:text-foreground"
                  onClick={() => {
                    setPageSize(18);
                    setPage(1);
                  }}
                >
                  18
                </button>
                &nbsp;/&nbsp;
                <button
                  type="button"
                  className="px-1 hover:text-foreground"
                  onClick={() => {
                    setPageSize(24);
                    setPage(1);
                  }}
                >
                  24
                </button>
                <span className="ml-3 hidden sm:inline">Showing {pageItems.length} of {total} results</span>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-none"
                    aria-pressed={gridCols === 2}
                    onClick={() => setGridCols(2)}
                  >
                    <Grid2x2 />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-none"
                    aria-pressed={gridCols === 3}
                    onClick={() => setGridCols(3)}
                  >
                    <Grid3x3 />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-none"
                    aria-pressed={gridCols === 4}
                    onClick={() => setGridCols(4)}
                  >
                    <GridIcon />
                  </Button>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="outline" className="gap-2 rounded-none">
                        {SORT_OPTIONS.find((o) => o.key === sortKey)?.label ?? "Default sorting"}
                        <ChevronDown className="size-4" />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    {SORT_OPTIONS.map((opt) => (
                      <DropdownMenuItem
                        key={opt.key}
                        onClick={() => {
                          setSortKey(opt.key);
                          setPage(1);
                        }}
                      >
                        {opt.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className={`mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 ${gridClass}`}>
              {pageItems.map((book) => (
                <div key={book.id} className="group min-w-0">
                  <Card className="gap-3 border border-border/70 py-0">
                    <div className="relative aspect-[3/4] w-full bg-muted">
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
                        className="object-cover"
                        priority={book.id === "beyond-luxury"}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100" />
                      <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full rounded-none bg-background/90 text-foreground backdrop-blur hover:bg-background"
                          disabled={!book.inStock}
                        >
                          {book.inStock ? "Add to cart" : "Out of stock"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                  <div className="mt-3 text-xs font-medium leading-snug text-foreground line-clamp-2">
                    {book.title}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{formatPrice(book.price)}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between border-t pt-6 text-xs text-muted-foreground">
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed right-6 bottom-6 grid size-12 place-items-center rounded-full bg-background/90 text-foreground shadow-lg ring-1 ring-border/70 backdrop-blur hover:bg-background"
        aria-label="Scroll to top"
      >
        <ChevronUp className="size-5" />
      </button>
    </main>
  );
}
