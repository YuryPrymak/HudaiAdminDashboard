import setWindowEventListeners from './utils/windowEventListeners';

import Emitter from './Emitter';

import Contacts from './widgets/Contacts';
import dataContacts from './data/contacts';

import Reviews from './widgets/Reviews';
import dataReviews from './data/reviews';

import Tasks from './widgets/Tasks';
import dataTasks from './data/tasks';

import OurTechnologies from './widgets/OurTechnologies';
import dataOurTechnologies from './data/ourTechnologies';

import EarnByCountry from './widgets/EarnByCountry';
import dataEarnByCountry from './data/earnByCountry';

import WeeklyEarning from './widgets/WeeklyEarning';
import dataWeeklyEarning from './data/weeklyEarning';

import SiteViews from './widgets/SiteViews';
import dataSiteViews from './data/siteViews';

export default (() => {
  const emitter = new Emitter();

  const widgets = [
    {
      Class: SiteViews,
      title: 'Site Views',
      selector: '.widgets .widget-site-views',
      data: dataSiteViews,
    },
    {
      Class: WeeklyEarning,
      title: 'Weekly Earning',
      selector: '.widgets .widget-weekly-earning',
      data: dataWeeklyEarning,
    },
    {
      Class: EarnByCountry,
      title: 'Earn By Country',
      selector: '.widgets .widget-earn-by-country',
      data: dataEarnByCountry,
    },
    {
      Class: Contacts,
      title: 'Contacts',
      selector: '.widgets .widget-contacts',
      data: dataContacts,
    },
    {
      Class: Reviews,
      title: 'Reviews',
      selector: '.widgets .widget-reviews',
      data: dataReviews,
    },
    {
      Class: Tasks,
      title: 'Tasks',
      selector: '.widgets .widget-tasks',
      data: dataTasks,
    },
    {
      Class: OurTechnologies,
      title: 'Our Technologies',
      selector: '.widgets .widget-our-technologies',
      data: dataOurTechnologies,
    },
  ];

  widgets.forEach(widget => {
    new widget.Class(emitter, widget.title, widget.selector, widget.data);
  });

  setWindowEventListeners();
})();
