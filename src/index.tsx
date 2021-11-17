import React, { lazy, Suspense } from 'react'
import loadable from '@loadable/component'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'normalize.css'
import './assets/css/base.css'
import '@/assets/css/base-tmp.less'
import { Provider } from './store/context'

const HomePage = loadable(() => import(/* webpackChunkName: 'HomePage'*/ './pages/home'))
const MinePage = loadable(() => import(/* webpackChunkName: 'MinePage'*/ './pages/mine'))
const DemoPage = loadable(() => import(/* webpackChunkName: 'DemoPage'*/ './pages/demo'))

// protocol
const PrivacyPage = loadable(() => import(/* webpackChunkName: 'PrivacyPage'*/ './pages/protocol/Privacy'))
const ServicePage = loadable(() => import(/* webpackChunkName: 'ServicePage'*/ './pages/protocol/Service'))

const env = process.env.NODE_ENV
console.log(env)

const App = () => (
  <Provider>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Route path="/mine" exact component={MinePage}></Route>
        <Route path="/home" exact component={HomePage}></Route>
        <Route path="/demo" exact component={DemoPage}></Route>
        <Route path="/" exact component={HomePage}></Route>

        <Route path="/protocol/privacy" exact component={PrivacyPage}></Route>
        <Route path="/protocol/service" exact component={ServicePage}></Route>
      </BrowserRouter>
    </Suspense>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
