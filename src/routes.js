import DiscussionBoard from './components/discussion/DiscussionBoard'
import EventPage from './components/event/EventPage'
import UserProfile from './components/user/UserProfile'
import TopicPage from './components/topic/TopicPage'
import Topic from './components/topic/Topic'
import Event from './components/event/Event'
import NewEvent from './components/event/NewEvent'

export const routes = [
    { path: '/discussions', component: DiscussionBoard },
    {
      name: 'topicPage', path: '/discussions/:id', component: TopicPage, children: [
        { name: 'showTopic', path: '', component: Topic }
      ]
    },
    // { name: 'showTopic', path: '/discussions/:id', component: Topic },
    { name: 'currentUser', path: '/users/:id', component: UserProfile },
    { name: 'eventPage', path: '/events', component: EventPage },
    { name: 'event.new', path: '/events/new-event', component: NewEvent },
    { name: 'showEvent', path: '/events/:id', component: Event }

  ]
;
