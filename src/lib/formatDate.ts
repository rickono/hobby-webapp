export function formatDate(
    dateString: string,
    options?: Partial<{
        day: 'numeric' | '2-digit',
        month: "numeric" | "2-digit" | "long" | "short" | "narrow",
        year: "numeric" | "2-digit",
        timeZone: string,
    }>
) {
    if (!options) {
        return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        })
    }
    return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', options)
}
