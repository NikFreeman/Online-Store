import { getList, createCards } from './pages/products';
import './style.css';

console.log('Online-Store');

getList().then((data) => createCards(data));
