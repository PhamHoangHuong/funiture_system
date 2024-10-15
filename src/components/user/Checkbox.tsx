import React, { useEffect, useRef, forwardRef } from "react"

// Định nghĩa kiểu dữ liệu cho các props của component
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ indeterminate = false, ...rest }, ref) => {
        const defaultRef = useRef<HTMLInputElement>(null)
        const resolvedRef =
            (ref as React.RefObject<HTMLInputElement>) || defaultRef

        useEffect(() => {
            if (resolvedRef.current) {
                resolvedRef.current.indeterminate = indeterminate
            }
        }, [resolvedRef, indeterminate])

        return <input type="checkbox" ref={resolvedRef} {...rest} />
    }
)

Checkbox.displayName = "Checkbox" // Giúp React Developer Tools hiển thị tên component rõ ràng
