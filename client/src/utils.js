import format from 'date-fns/format';

export const getMinimalisticCreationDate = (date) => format(new Date(date), 'MMM d, u');

export const getExplicitCreationDate = (date) => format(new Date(date), 'EEEE, MMMM d, u h:m a');

export const toggleButton = (isOpen, setIsOpen) => setIsOpen((prev) => !prev);
