import DiscussionBoard from './components/discussion/DiscussionBoard';
import EventPage from './components/event/EventPage';
import UserProfile from './components/user/UserProfile';
import TopicPage from './components/topic/TopicPage';
import Event from './components/event/Event';
import NewEvent from './components/event/NewEvent';
import NewTopic from './components/topic/NewTopic';
import Company from './components/company/Company';
import NotFound from './components/NotFound';

export const routes = [
  { name: 'discussions',path: '/discussions', component: DiscussionBoard },
  { name: 'topic.new', path: '/discussions/new-topic', component: NewTopic },
  { name: 'topicPage', path: '/discussions/:id', component: TopicPage },
  { name: 'user.profile', path: '/users/:id', component: UserProfile },
  { name: 'events', path: '/events', component: EventPage },
  { name: 'event.new', path: '/events/new-event', component: NewEvent },
  { name: 'showEvent', path: '/events/:id', component: Event },
  { name: 'company.show', path: '/companies/:id', component: Company },
  { name: '404', path: '*', component: NotFound },
];
