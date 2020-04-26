import { search$ } from './live-search';

const containerRef = document.querySelector('.container') as HTMLDivElement;
search$
    .subscribe((htmlString) => {
        containerRef.innerHTML = htmlString;
    });
