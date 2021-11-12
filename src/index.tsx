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
      </BrowserRouter>
    </Suspense>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
