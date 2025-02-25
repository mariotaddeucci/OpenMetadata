/*
 *  Copyright 2021 Collate
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuthContext } from '../authentication/auth-provider/AuthProvider';
import Appbar from '../components/app-bar/Appbar';
import Loader from '../components/Loader/Loader';
import { ROUTES } from '../constants/constants';
import { AuthTypes } from '../enums/signin.enum';
import withSuspenseFallback from './withSuspenseFallback';

const AuthenticatedAppRouter = withSuspenseFallback(
  React.lazy(() => import('./AuthenticatedAppRouter'))
);
const SigninPage = withSuspenseFallback(
  React.lazy(() => import('../pages/login'))
);
const PageNotFound = withSuspenseFallback(
  React.lazy(() => import('../pages/page-not-found'))
);

const AppRouter = () => {
  const {
    authConfig,
    isAuthDisabled,
    isAuthenticated,
    loading,
    isSigningIn,
    getCallBackComponent,
  } = useAuthContext();
  const callbackComponent = getCallBackComponent();
  const oidcProviders = [
    AuthTypes.GOOGLE,
    AuthTypes.AWS_COGNITO,
    AuthTypes.CUSTOM_OIDC,
  ];
  const isOidcProvider =
    authConfig?.provider && oidcProviders.includes(authConfig.provider);

  return loading ? (
    <Loader />
  ) : (
    <>
      {isOidcProvider ? (
        <AuthenticatedAppRouter />
      ) : (
        <>
          <Appbar />
          <Switch>
            <Route exact path={ROUTES.HOME}>
              {!isAuthDisabled && !isAuthenticated && !isSigningIn ? (
                <Redirect to={ROUTES.SIGNIN} />
              ) : (
                <Redirect to={ROUTES.MY_DATA} />
              )}
            </Route>
            {!isSigningIn ? (
              <Route exact component={SigninPage} path={ROUTES.SIGNIN} />
            ) : null}
            {callbackComponent ? (
              <Route component={callbackComponent} path={ROUTES.CALLBACK} />
            ) : null}
            <Route exact component={PageNotFound} path={ROUTES.NOT_FOUND} />
            {isAuthDisabled || isAuthenticated ? (
              <AuthenticatedAppRouter />
            ) : (
              <Redirect to={ROUTES.SIGNIN} />
            )}
          </Switch>
        </>
      )}
    </>
  );
};

export default AppRouter;
