import DiscussionBoard from '../components/discussion/DiscussionBoard';
import EventPage from '../components/event/EventPage';
import UserProfile from '../components/user/UserProfile';
import UserList from '../components/user/UserList';
import TopicPage from '../components/topic/TopicPage';
import Event from '../components/event/Event';
import NewEvent from '../components/event/NewEvent';
import NewTopic from '../components/topic/NewTopic';
import CompaniesPage from '../components/company/CompaniesPage';
import NewCompany from '../components/company/NewCompany';
import Company from '../components/company/Company';
import NotFound from '../components/NotFound';

export const routes = [
  {
    name: 'discussions',
    path: '/discussions',
    component: DiscussionBoard
  },
  {
    name: 'topic.new',
    path: '/discussions/new-topic',
    component: NewTopic,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'topicPage',
    path: '/discussions/:id',
    component: TopicPage
  },
  {
    name: 'user.profile',
    path: '/users/:id',
    component: UserProfile
  },
  {
    name: 'users',
    path: '/users',
    component: UserList
  },
  {
    name: 'events',
    path: '/events',
    component: EventPage
  },
  {
    name: 'event.new',
    path: '/events/new-event',
    component: NewEvent,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'showEvent',
    path: '/events/:id',
    component: Event
  },
  {
    name: 'companies',
    path: '/companies',
    component: CompaniesPage
  },
  {
    name: 'company.new',
    path: '/companies/new-company',
    component: NewCompany,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'company.show',
    path: '/companies/:id',
    component: Company
  },
  {
    name: '404',
    path: '*',
    component: NotFound
  },
];
