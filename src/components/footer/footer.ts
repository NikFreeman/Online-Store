export const footer = document.createElement('footer');
footer.className = 'footer';

const footerContent = document.createElement('div');
footerContent.className = 'wrapper footer__wrapper';

footer.append(footerContent);

const authorsCont = document.createElement('div');
authorsCont.className = 'footer__authors';

const ghLinkOne = document.createElement('a');
ghLinkOne.className = 'footer__author-link';
ghLinkOne.href = 'https://github.com/NikFreeman';
ghLinkOne.target = '_blanc';

const ghImageOne = document.createElement('img');
ghImageOne.className = 'footer__author-gh';
ghImageOne.src = require('../../assets/images/github_bw.png');
ghImageOne.alt = 'GitHub Logo';

const authorNameOne = document.createElement('span');
authorNameOne.className = 'footer__author-name';
authorNameOne.textContent = 'NikFreeman';

ghLinkOne.append(ghImageOne, authorNameOne);

const ghLinkTwo = document.createElement('a');
ghLinkTwo.className = 'footer__author-link';
ghLinkTwo.href = 'https://github.com/Bonus156';
ghLinkTwo.target = '_blanc';

const ghImageTwo = document.createElement('img');
ghImageTwo.className = 'footer__author-gh';
ghImageTwo.src = require('../../assets/images/github_bw.png');
ghImageTwo.alt = 'GitHub Logo';

const authorNameTwo = document.createElement('span');
authorNameTwo.className = 'footer__author-name';
authorNameTwo.textContent = 'Bonus156';

ghLinkTwo.append(ghImageTwo, authorNameTwo);
authorsCont.append(ghLinkOne, ghLinkTwo);

const rsCont = document.createElement('div');
rsCont.className = 'footer__rs';

const rsLink = document.createElement('a');
rsLink.className = 'footer__rsschool-link';
rsLink.href = 'https://rs.school/js/';
rsLink.target = '_blanc';

const rsImage = document.createElement('img');
rsImage.className = 'footer__rsschool-logo';
rsImage.src = require('../../assets/images/rs_school_js.png');
rsImage.alt = 'RSSchool Logo';

const year = document.createElement('span');
year.className = 'footer__year';
year.textContent = '2023';

rsCont.append(rsLink, year);
rsLink.append(rsImage);

footerContent.append(authorsCont, rsCont);
