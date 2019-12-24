import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import FormStudent from '~/pages/Students/FormStudent';

import Plans from '~/pages/Plans';
import FormPlan from '~/pages/Plans/FormPlan';

import Registrations from '~/pages/Registrations';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/new" component={FormStudent} isPrivate />
      <Route path="/students/:studentId" component={FormStudent} isPrivate />
      <Route path="/students" component={Students} isPrivate />

      <Route path="/plans/new" component={FormPlan} isPrivate />
      <Route path="/plans/:planId" component={FormPlan} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />

      <Route path="/registrations" component={Registrations} isPrivate />
      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
