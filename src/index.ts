import router from './routes/router';
import { header } from './components/header/header';
import render from './utils/render';
import { footer } from './components/footer/footer';
import './styles/index.css';
import './style.css';

render('header', header);
router();
render('footer', footer);
