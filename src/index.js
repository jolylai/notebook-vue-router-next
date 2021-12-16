import { createRouterMatcher } from './matcher'

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const matcher = createRouterMatcher(routes)
console.log('matcher: ', matcher)

matcher.addRoute(routes)
