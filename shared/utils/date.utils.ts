const formatter = new Intl.DateTimeFormat('ru', { dateStyle: 'short', timeStyle: 'medium' });

const formatDate = (date: string) => formatter.format(new Date(date));

export { formatDate };
