"use client";

import React from "react";

export function Pagination({
  page,
  setPage,
  total,
  totalPages,
  pageSize,
}: {
  page: number;
  setPage: (val: number) => void;
  total: number;
  totalPages: number;
  pageSize: number;
}) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-gray-400">
        Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)}{" "}
        of {total}
      </div>

      <nav className="flex items-center gap-2">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-white/5 disabled:opacity-40"
        >
          Prev
        </button>
        <div className="hidden sm:flex gap-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-1 rounded ${
                  pageNum === page ? "bg-white/7" : "bg-white/3"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-white/5 disabled:opacity-40"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
