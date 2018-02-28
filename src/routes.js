import DiscussionBoard from './components/discussion/DiscussionBoard';
import EventPage from './components/event/EventPage';
import UserProfile from './components/user/UserProfile';
import TopicPage from './components/topic/TopicPage';
import Topic from './components/topic/Topic';
import Event from './components/event/Event';
import NewEvent from './components/event/NewEvent';
import NewTopic from './components/topic/NewTopic';

export const routes = [
  { path: '/discussions', component: DiscussionBoard },
  { name: 'topic.new', path: '/discussions/new-topic', component: NewTopic },
  { name: 'topicPage', path: '/discussions/:id', component: TopicPage },
  { name: 'currentUser', path: '/users/:id', component: UserProfile },
  { name: 'eventPage', path: '/events', component: EventPage },
  { name: 'event.new', path: '/events/new-event', component: NewEvent },
  { name: 'showEvent', path: '/events/:id', component: Event }
];
