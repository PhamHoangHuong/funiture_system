import classNames from "classnames"
import { Link } from "react-router-dom"
import React from "react"
interface PaginationProps {
    page: number
    pageSize: number
    pathname: string
}

const RANGE = 2

export default function Pagination({
    page,
    pageSize,
    pathname,
}: PaginationProps) {
    const renderPagination = () => {
        let dotAfter = false
        let dotBefore = false

        const renderDotBefore = (index: number) => {
            if (!dotBefore) {
                dotBefore = true
                return (
                    <span key={index} className="mx-2">
                        ...
                    </span>
                )
            }
            return null
        }

        const renderDotAfter = (index: number) => {
            if (!dotAfter) {
                dotAfter = true
                return (
                    <span key={index} className="mx-2">
                        ...
                    </span>
                )
            }
            return null
        }

        return Array(pageSize)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1
                if (
                    page <= RANGE * 2 + 1 &&
                    pageNumber > page + RANGE &&
                    pageNumber < pageSize - RANGE + 1
                ) {
                    return renderDotAfter(index)
                } else if (
                    page > RANGE * 2 + 1 &&
                    page < pageSize - RANGE * 2
                ) {
                    if (pageNumber < page - RANGE && pageNumber > RANGE) {
                        return renderDotBefore(index)
                    } else if (
                        pageNumber > page + RANGE &&
                        pageNumber < pageSize - RANGE + 1
                    ) {
                        return renderDotAfter(index)
                    }
                } else if (
                    page >= pageSize - RANGE * 2 &&
                    pageNumber > RANGE &&
                    pageNumber < page - RANGE
                ) {
                    return renderDotBefore(index)
                }
                return (
                    <Link
                        to={{
                            pathname, // Sử dụng prop pathname để điều hướng đúng trang
                            search: `?page=${pageNumber}`, // Thêm query param để điều hướng đúng số trang
                        }}
                        key={index}
                        className={classNames("page-link border mx-2", {
                            "border-info": pageNumber === page,
                            "border-transparent": pageNumber !== page,
                        })}
                    >
                        {pageNumber}
                    </Link>
                )
            })
    }

    return (
        <div className="card-footer border-top">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mb-0">
                    <li
                        className={classNames("page-item", {
                            disabled: page === 1,
                        })}
                    >
                        <Link
                            className="page-link"
                            to={{
                                pathname,
                                search: `?page=${page - 1}`,
                            }}
                        >
                            Previous
                        </Link>
                    </li>
                    {renderPagination()}
                    <li
                        className={classNames("page-item", {
                            disabled: page === pageSize,
                        })}
                    >
                        <Link
                            className="page-link"
                            to={{
                                pathname,
                                search: `?page=${page + 1}`,
                            }}
                        >
                            Next
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
