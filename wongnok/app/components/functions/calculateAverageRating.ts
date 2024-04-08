type Comment = [
    comment: string,
    rating: number
]

export default function calculateAverageRating(comments: Comment[]) {
    if (comments.length === 0) return 0
    const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0)
    return totalRating / comments.length
}