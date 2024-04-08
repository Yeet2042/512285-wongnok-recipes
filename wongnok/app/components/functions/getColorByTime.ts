export default function getColorByTime(time: string) {
    switch (time) {
      case '5-10min':
        return 'bg-success';
      case '11-30min':
        return 'bg-warning';
      case '31-60min':
        return 'bg-danger';
      case '60+min':
        return 'bg-secondary';
      default:
        return '';
    }
  }