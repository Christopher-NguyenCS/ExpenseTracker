import { useMemo } from "react";

// get size of Expenses, number of expenses in list, produce number sibling numbers appear next to current page before dots appear, get current page
export function usePagination({ totalCount, pageSize, siblingCount = 1, currentPage }) {

    function range(start, end, step = 1) {
        return Array.from({ length: (end - start) / step + 1 }, (_, i) => start + i * step);
    }

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);
        const totalPageNumbers = siblingCount + 5; // number of visible pages including siblings

        // If the total page count is less than the page numbers we want to show, return all pages
        if (totalPageCount <= totalPageNumbers) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        // Only right dots
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(1, leftItemCount);

            return [...leftRange, "DOTS", lastPageIndex];
        }

        // Only left dots
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

            return [firstPageIndex, "DOTS", ...rightRange];
        }

        // Both left and right dots
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
        }

        // Default to return all pages if no conditions are met (safety fallback)
        return range(1, totalPageCount);
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
}
