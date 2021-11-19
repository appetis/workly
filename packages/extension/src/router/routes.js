import Home from '@/views/Home'
import User from '@/views/User'
import Link from '../views/Link'
import Setting from '@/views/Setting'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
  {
    path: '/link',
    name: 'Link',
    component: Link,
  },
  {
    path: '/setting',
    name: 'Setting',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Setting,
  },
]

export default routes
