import setWindowEventListeners from './js/utils/windowEventListeners';

import Emitter from './js/Emitter';

import './js/main';
import './js/search-form';
import './js/nav';
import './js/mobile-nav';
import './js/themes';
import './js/preloader';

import Contacts from './js/widgets/Contacts';
import dataContacts from './js/data/contacts';

import Reviews from './js/widgets/Reviews';
import dataReviews from './js/data/reviews';

import Tasks from './js/widgets/Tasks';
import dataTasks from './js/data/tasks';

import OurTechnologies from './js/widgets/OurTechnologies';
import dataOurTechnologies from './js/data/ourTechnologies';

import EarnByCountry from './js/widgets/EarnByCountry';
import dataEarnByCountry from './js/data/earnByCountry';

import WeeklyEarning from './js/widgets/WeeklyEarning';
import dataWeeklyEarning from './js/data/weeklyEarning';

import SiteViews from './js/widgets/SiteViews';
import dataSiteViews from './js/data/siteViews';

import './scss/main.scss';
import './scss/header.scss';
import './scss/nav.scss';
import './scss/themes.scss';
import './scss/widgets.scss';
import './scss/preloader.scss';
import './scss/widgets/site-views.scss';
import './scss/widgets/earn-by-country.scss';
import './scss/widgets/contacts.scss';
import './scss/widgets/reviews.scss';
import './scss/widgets/tasks.scss';
import './scss/widgets/our-technologies.scss';

const emitter = new Emitter();

const contactsSelector = '.widgets .widget-contacts';
const contactsTitle = 'Contacts';
const contacts = new Contacts(emitter, contactsTitle, dataContacts, contactsSelector);

const reviewsSelector = '.widgets .widget-reviews';
const reviewsTitle = 'Reviews';
const reviews = new Reviews(emitter, reviewsTitle, dataReviews, reviewsSelector);

const tasksSelector = '.widgets .widget-tasks';
const tasksTitle = 'Tasks';
const tasks = new Tasks(emitter, tasksTitle, dataTasks, tasksSelector);

const ourTechnologiesSelector = '.widgets .widget-our-technologies';
const ourTechnologiesTitle = 'Our Technologies';
const ourTechnologies = new OurTechnologies(emitter, ourTechnologiesTitle, dataOurTechnologies, ourTechnologiesSelector);

const earnByCountrySelector = '.widgets .widget-earn-by-country';
const earnByCountryTitle = 'Earn By Country';
const earnByCountry = new EarnByCountry(emitter, earnByCountryTitle, dataEarnByCountry, earnByCountrySelector);

const weeklyEarningSelector = '.widgets .widget-weekly-earning';
const weeklyEarningTitle = 'Weekly Earning';
const weeklyEarning = new WeeklyEarning(emitter, weeklyEarningTitle, dataWeeklyEarning, weeklyEarningSelector);

const siteViewsSelector = '.widgets .widget-site-views';
const siteViewsTitle = 'Site Views';
const siteViews = new SiteViews(emitter, siteViewsTitle, dataSiteViews, siteViewsSelector);

setWindowEventListeners();
