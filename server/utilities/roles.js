// npm dependencies
const roles                 = require('user-groups-roles');
const { userRoles }         = require('../utilities/constants');

// Creating the roles
{
    roles.createNewRole(userRoles.ADMIN);
    roles.createNewRole(userRoles.USER);
}

// creating and setting the privileges for routes
{
    // creating the privs and setting default value for routes.
    roles.createNewPrivileges(['/api/users'             , 'GET'],    'get users'                    , false);
    roles.createNewPrivileges(['/api/users/:name'       , 'GET'],    'get user details by name'     , false);
    roles.createNewPrivileges(['/api/users/me'          , 'GET'],    'get loggedin user details'    , false);
    roles.createNewPrivileges(['/api/users/register'    , 'POST'],   'add user details'             , false);
    roles.createNewPrivileges(['/api/users/createTeam'  , 'POST'],   'add user details'             , false);
    roles.createNewPrivileges(['/api/users/adminAccess' , 'POST'],   'Giving admin access'          , false);
    roles.createNewPrivileges(['/api/users'             , 'PUT'],    'update user details'          , false);
    roles.createNewPrivileges(['/api/users/:email'      , 'DELETE'], 'remove user details by name'  , false);

    // setting the accessibility of url to respective user.
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/users'             , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/users/:name'       , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/users/me'          , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/users/register'    , 'POST']    , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/users/createTeam'  , 'POST']    , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/users/adminAccess' , 'POST']    , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/users'             , 'PUT']     , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/users/:email'      , 'DELETE']  , true);

    roles.addPrivilegeToRole(userRoles.USER, ['/api/users'              , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/users/:name'        , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/users/me'           , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/users/register'     , 'POST']    , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/users/createTeam'   , 'POST']    , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/users/adminAccess'  , 'POST']    , false);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/users'              , 'PUT']     , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/users/:email'       , 'DELETE']  , false);

}

// creating and setting the privileges for routes
{
    // creating the privs and setting default value for routes.
    roles.createNewPrivileges(['/api/iplTeams'                  , 'GET'],    'get all teams'                     , false);
    roles.createNewPrivileges(['/api/iplTeams/players/:name'    , 'GET'],    'get player details by playername'  , false);
    roles.createNewPrivileges(['/api/iplTeams/teams/:name'      , 'GET'],    'get team details by teamname'      , false);
    roles.createNewPrivileges(['/api/iplTeams'                  , 'POST'],   'Add team details'                  , false);

    // setting the accessibility of url to respective user.
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/iplTeams'                  , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/iplTeams/players/:name'    , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/iplTeams/teams/:name'      , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/iplTeams'                  , 'POST']    , true);

    roles.addPrivilegeToRole(userRoles.USER, ['/api/iplTeams'                   , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/iplTeams/players/:name'     , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/iplTeams/teams/:name'       , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/iplTeams'                   , 'POST']    , false);

}

{
    roles.createNewPrivileges(['/api/roles' , 'GET']   ,'get roles'    , false);
    roles.createNewPrivileges(['/api/roles' , 'POST']  ,'add roles'    , false);

    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/roles'  , 'GET']  , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/roles'  , 'POST'] , true);

    roles.addPrivilegeToRole(userRoles.USER, ['/api/roles'  , 'GET']   , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/roles'  , 'POST']  , false);
}

{
    roles.createNewPrivileges(['/api/players' , 'GET']   ,'get players'    , false);
    roles.createNewPrivileges(['/api/players' , 'POST']  ,'add players'    , false);

    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/players'  , 'GET']  , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/players'  , 'POST'] , true);

    roles.addPrivilegeToRole(userRoles.USER, ['/api/players'  , 'GET']   , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/players'  , 'POST']  , false);
}

{
    roles.createNewPrivileges(['/api/countries' , 'GET']   ,'get countries'  , false);
    roles.createNewPrivileges(['/api/countries' , 'POST']  ,'add countries'  , false);

    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/countries'  , 'GET']    , true);
    roles.addPrivilegeToRole(userRoles.ADMIN, ['/api/countries'  , 'POST']   , true);

    roles.addPrivilegeToRole(userRoles.USER, ['/api/countries'  , 'GET']     , true);
    roles.addPrivilegeToRole(userRoles.USER, ['/api/countries'  , 'POST']    , false);
}

// Default export
module.exports = { roles };