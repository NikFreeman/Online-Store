import { getList, getProductsList } from './pages/products/products';
import { start } from './pages/products/products';
import './style.css';

console.log('Online-Store');
getList().then(getProductsList);
start();
// getList().then((data) => createCards(data.products));

// getList().then((data) => console.log(groupeByCategory(data.products)));
