// flow-typed signature: 4d8e947f2e396ef2f26ecbd1ed7f04ab
// flow-typed version: 97d98ab83e/react-router-dom_v4.x.x/flow_>=v0.53.x

import * as React from 'react';

declare module "react-router-dom" {
  declare class BrowserRouter extends React.Component<{
    basename?: string,
    forceRefresh?: boolean,
    getUserConfirmation?: GetUserConfirmation,
    keyLength?: number,
    children?: React.Node
  }> {}

  declare class HashRouter extends React.Component<{
    basename?: string,
    getUserConfirmation?: GetUserConfirmation,
    hashType?: "slash" | "noslash" | "hashbang",
    children?: React.Node
  }> {}

  declare class Link extends React.Component<{
    to: string | LocationShape,
    replace?: boolean,
    children?: React.Node
  }> {}

  declare class NavLink extends React.Component<{
    to: string | LocationShape,
    activeClassName?: string,
    className?: string,
    activeStyle?: Object,
    style?: Object,
    isActive?: (match: Match, location: Location) => boolean,
    children?: React.Node,
    exact?: boolean,
    strict?: boolean
  }> {}

  // NOTE: Below are duplicated from react-router. If updating these, please
  // update the react-router and react-router-native types as well.
  declare type Location = {
    pathname: string,
    search: string,
    hash: string,
    state?: any,
    key?: string
  };

  declare type LocationShape = {
    pathname?: string,
    search?: string,
    hash?: string,
    state?: any
  };

  declare type HistoryAction = "PUSH" | "REPLACE" | "POP";

  declare type RouterHistory = {
    length: number,
    location: Location,
    action: HistoryAction,
    listen(
      callback: (location: Location, action: HistoryAction) => void
    ): () => void,
    push(path: string | LocationShape, state?: any): void,
    replace(path: string | LocationShape, state?: any): void,
    go(n: number): void,
    goBack(): void,
    goForward(): void,
    canGo?: (n: number) => boolean,
    block(
      callback: (location: Location, action: HistoryAction) => boolean
    ): void,
    // createMemoryHistory
    index?: number,
    entries?: Array<Location>
  };

  declare type Match = {
    params: { [key: string]: ?string },
    isExact: boolean,
    path: string,
    url: string
  };

  declare type ContextRouter = {|
    history: RouterHistory,
    location: Location,
    match: Match
  |};

  declare type GetUserConfirmation = (
    message: string,
    callback: (confirmed: boolean) => void
  ) => void;

  declare type StaticRouterContext = {
    url?: string
  };

  declare class StaticRouter extends React.Component<{
    basename?: string,
    location?: string | Location,
    context: StaticRouterContext,
    children?: React.Node
  }> {}

  declare class MemoryRouter extends React.Component<{
    initialEntries?: Array<LocationShape | string>,
    initialIndex?: number,
    getUserConfirmation?: GetUserConfirmation,
    keyLength?: number,
    children?: React.Node
  }> {}

  declare class Router extends React.Component<{
    history: RouterHistory,
    children?: React.Node
  }> {}

  declare class Prompt extends React.Component<{
    message: string | ((location: Location) => string | true),
    when?: boolean
  }> {}

  declare class Redirect extends React.Component<{
    to: string | LocationShape,
    push?: boolean
  }> {}

  declare class Route extends React.Component<{
    component?: React.Component<*>,
    render?: (router: ContextRouter) => React.Node,
    children?: React.Component<ContextRouter> | React.Node,
    path?: string,
    exact?: boolean,
    strict?: boolean
  }> {}

  declare class Switch extends React.Component<{
    children?: React.Node
  }> {}

  declare function withRouter<P>(
    Component: React.Component<{| ...ContextRouter, ...P |}>
  ): React.Component<P>;

  declare type MatchPathOptions = {
    path?: string,
    exact?: boolean,
    sensitive?: boolean,
    strict?: boolean
  };

  declare function matchPath(
    pathname: string,
    options?: MatchPathOptions | string
  ): null | Match;
}
