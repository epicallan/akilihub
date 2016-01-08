
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import BlogPage from './components/BlogPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import DataPage from './components/DataPage';
import UgandaDecidesPageActions from './actions/UgandaPageActions';
import testData from './components/DataPage/data';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/contact', async () => <ContactPage />);

  on('/data', async(state) => {
    // const response = await fetch('/api/social/twdata');
    // const data = await response.json();
    // console.log(data[0]);

    const res = await fetch(`/api/content?path=${state.path}`);
    const html = await res.json();
    UgandaDecidesPageActions.getData(testData);
    return <DataPage {...html} />;
  });

  on('/blog', async(state) => {
    const res = await fetch(`/api/content?path=${state.path}`);
    const html = await res.json();
    return <BlogPage {...html} />;
  });

  on('*', async (state) => {
    const response = await fetch(`/api/content?path=${state.path}`);
    const content = await response.json();
    return content && <ContentPage {...content} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
