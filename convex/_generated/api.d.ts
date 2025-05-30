/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as announcement from "../announcement.js";
import type * as clubs from "../clubs.js";
import type * as events from "../events.js";
import type * as file from "../file.js";
import type * as finance from "../finance.js";
import type * as memberships from "../memberships.js";
import type * as poll from "../poll.js";
import type * as task from "../task.js";
import type * as users from "../users.js";
import type * as utils_getMembership from "../utils/getMembership.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  announcement: typeof announcement;
  clubs: typeof clubs;
  events: typeof events;
  file: typeof file;
  finance: typeof finance;
  memberships: typeof memberships;
  poll: typeof poll;
  task: typeof task;
  users: typeof users;
  "utils/getMembership": typeof utils_getMembership;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
