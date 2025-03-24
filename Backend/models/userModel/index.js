/**
 * User Model - Combines all user-related functions
 * This index file consolidates authentication, queries, profile management, and 2FA operations.
 */

import * as userQueries from './userQueries.js';
import * as userAuth from './userAuth.js';
import * as userProfile from './userProfile.js';
import * as user2FA from './user2FA.js';

export default {
    ...userQueries,
    ...userAuth,
    ...userProfile,
    ...user2FA
};
