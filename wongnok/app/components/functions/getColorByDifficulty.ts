export default function getColorByDifficulty(difficulty: string) {
    switch (difficulty) {
      case 'easy':
        return 'bg-success';
      case 'medium':
        return 'bg-warning';
      case 'hard':
        return 'bg-danger';
      default:
        return '';
    }
}