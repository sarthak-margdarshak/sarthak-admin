/**
 * Written By - Ritesh Ranjan
 * Website - https://sagittariusk2.github.io/
 * 
 *  /|||||\    /|||||\   |||||||\   |||||||||  |||   |||   /|||||\   ||| ///
 * |||        |||   |||  |||   |||     |||     |||   |||  |||   |||  |||///
 *  \|||||\   |||||||||  |||||||/      |||     |||||||||  |||||||||  |||||
 *       |||  |||   |||  |||  \\\      |||     |||   |||  |||   |||  |||\\\
 *  \|||||/   |||   |||  |||   \\\     |||     |||   |||  |||   |||  ||| \\\
 * 
 */

// IMPORT ---------------------------------------------------------------
import PropTypes from 'prop-types';
// react
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// appwrite
import { Account, Client, Databases, ID, Permission, Role, Storage, Teams } from "appwrite";
import { APPWRITE_API } from '../config-global';
import { User } from './User';

// CLIENT INITIALIZATION ------------------------------------------------
export const client = new Client()
  .setEndpoint(APPWRITE_API.backendUrl)
  .setProject(APPWRITE_API.projectId);

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);
export const teams = new Teams(client);

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  profileImage: null,
  userProfile: null,
  userGeneral: null,
  userPermissions: null,
  userSocialLinks: null,
  underMaintenance: false,
};

const reducer = (state, action) => {
  // AUTH REDUCER
  if (action.type === 'INITIAL') {
    return {
      ...state,
      isInitialized: action.payload.isInitialized,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      profileImage: action.payload.profileImage,
      userProfile: action.payload.userProfile,
      userGeneral: action.payload.userGeneral,
      userPermissions: action.payload.userPermissions,
      userSocialLinks: action.payload.userSocialLinks,
      underMaintenance: action.payload.underMaintenance,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isInitialized: action.payload.isInitialized,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      profileImage: action.payload.profileImage,
      userProfile: action.payload.userProfile,
      userGeneral: action.payload.userGeneral,
      userPermissions: action.payload.userPermissions,
      userSocialLinks: action.payload.userSocialLinks,
      underMaintenance: action.payload.underMaintenance,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isInitialized: action.payload.isInitialized,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      profileImage: action.payload.profileImage,
      userProfile: action.payload.userProfile,
      userGeneral: action.payload.userGeneral,
      userPermissions: action.payload.userPermissions,
      userSocialLinks: action.payload.userSocialLinks,
    };
  }
  if (action.type === 'UPDATE_PASSWORD') {
    return {
      ...state
    };
  }
  // UPDATE REDUCER
  if (action.type === 'UPDATE_PROFILE_IMAGE') {
    return {
      ...state,
      isInitialized: action.payload.isInitialized,
      isAuthenticated: action.payload.isAuthenticated,
      profileImage: action.payload.profileImage,
      userProfile: action.payload.userProfile,
    }
  }
  if (action.type === 'UPDATE_USER_GENERAL') {
    return {
      ...state,
      userGeneral: action.payload.userGeneral,
    }
  }
  if (action.type === 'UPDATE_USER_SOCIAL_LINKS') {
    return {
      ...state,
      userSocialLinks: action.payload.userSocialLinks,
    }
  }
  // FETCH REDUCER
  if (action.type === 'FETCH_GENERAL_DATA') {
    return {
      ...state,
      userGeneral: action.payload.userGeneral,
    }
  }
  if (action.type === 'FETCH_PERMISSION_DATA') {
    return {
      ...state,
      userPermissions: action.payload.userPermissions,
    }
  }
  if (action.type === 'FETCH_SOCIAL_LINKS_DATA') {
    return {
      ...state,
      userSocialLinks: action.payload.userSocialLinks,
    }
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState);

  // ******** BEGINS : FETCH DATA FUNCTIONS : ON DEMAND ********
  // Fetch User General Data
  const fetchGeneralData = useCallback(async (id) => {
    var userGeneral = state.userGeneral;
    if (!userGeneral) {
      userGeneral = await User.getUserGeneralData(id)
    }
    dispatch({
      type: 'FETCH_GENERAL_DATA',
      payload: {
        userGeneral: userGeneral,
      },
    });
  }, [state]);

  // Fetch User Permissions Data
  const fetchPermissionData = useCallback(async (id) => {
    var userPermissions = state.userPermissions;
    if (!userPermissions) {
      userPermissions = await User.getUserPermissionData(id);
    }
    dispatch({
      type: 'FETCH_PERMISSION_DATA',
      payload: {
        userPermissions: userPermissions,
      },
    });
  }, [state]);

  // Fetch User Social Links Data
  const fetchSocialLinksData = useCallback(async (id) => {
    var userSocialLinks = state.userSocialLinks;
    if (!userSocialLinks) {
      userSocialLinks = await User.getUserSocialLinksData(id);
    }
    dispatch({
      type: 'FETCH_SOCIAL_LINKS_DATA',
      payload: {
        userSocialLinks: userSocialLinks,
      },
    });
  }, [state]);
  // ******** END : FETCH DATA FUNCTIONS : ON DEMAND ********



  // ******** BEGINS : AUTH FUNCTIONS ********
  // INITIAL
  const initialize = useCallback(() => {
    try {
      account.get().then(async function (response) {
        const sarthakInfoData = await databases.getDocument(
          APPWRITE_API.databaseId,
          APPWRITE_API.databases.sarthakInfoData,
          APPWRITE_API.databases.sarthakInfoDataCollection
        );
        dispatch({
          type: 'INITIAL',
          payload: {
            underMaintenance: sarthakInfoData?.maintenance,
          }
        })
        const user = response;
        const userProfile = await User.getProfileData(user.$id);
        var profileImage = null;
        if (userProfile.photoUrl) {
          profileImage = await User.getImageProfileLink(userProfile.photoUrl);
        }
        dispatch({
          type: 'INITIAL',
          payload: {
            isInitialized: true,
            isAuthenticated: true,
            user: user,
            profileImage: profileImage,
            userProfile: userProfile,
          },
        });
      }, async function (error) {
        dispatch({
          type: 'INITIAL',
          payload: {
            isInitialized: true,
            isAuthenticated: false,
            user: null,
            profileImage: null,
            userProfile: null,
            userGeneral: null,
            userPermissions: null,
            userSocialLinks: null,
          },
        });
      });
    } catch (error) {
      dispatch({
        type: 'INITIAL',
        payload: {
          isInitialized: false,
          isAuthenticated: false,
          user: null,
          profileImage: null,
          userProfile: null,
          userGeneral: null,
          userPermissions: null,
          userSocialLinks: null,
          underMaintenance: true,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    try {
      await account.createEmailSession(email, password);
      const user = await account.get();
      const currTeams = (await teams.list()).teams;
      const adminTeams = currTeams.filter((val, i) => val.$id===APPWRITE_API.team.admin)
      if(adminTeams.length!==1) {
        account.deleteSessions();
        return {success: false, message: "Unauthorised login attempt."}
      }
      const userProfile = await User.getProfileData(user.$id);
      var profileImage = null;
      if (userProfile.photoUrl) {
        profileImage = await User.getImageProfileLink(userProfile.photoUrl);
      }
      dispatch({
        type: 'LOGIN',
        payload: {
          isInitialized: true,
          isAuthenticated: true,
          user: user,
          profileImage: profileImage,
          userProfile: userProfile,
        },
      });
      return {success: true, message: ""}
    } catch (err) {
      return {success: false, message: err.message}
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await account.deleteSessions();
    dispatch({
      type: 'LOGOUT',
      payload: {
        isInitialized: true,
        isAuthenticated: false,
        user: null,
        profileImage: null,
        userProfile: null,
        userGeneral: null,
        userPermissions: null,
        userSocialLinks: null,
      }
    });
  }, []);

  // UPDATE PASSWORD
  const updatePassword = useCallback(async (oldPassword, newPassword) => {
    await account.updatePassword(newPassword, oldPassword);
    dispatch({
      type: 'UPDATE_PASSWORD',
      payload: {}
    });
  }, []);
  // ******** END : AUTH FUNCTIONS ********



  // ******** BEGINS : UPDATE DATA FUNCTIONS ********
  // UPDATE PROFILE IMAGE
  const updateProfileImage = useCallback(async (file) => {
    if (state.profileImage) {
      await storage.deleteFile(
        APPWRITE_API.buckets.userImage,
        state.userProfile.photoUrl,
      );
    }

    const response = await storage.createFile(
      APPWRITE_API.buckets.userImage,
      ID.unique(),
      file,
      [
        Permission.update(Role.user(state.user.$id)),
        Permission.read(Role.user(state.user.$id)),
        Permission.delete(Role.user(state.user.$id)),
        Permission.read(Role.any()),
      ]
    );

    await databases.updateDocument(
      APPWRITE_API.databaseId,
      APPWRITE_API.databases.usersProfile,
      state.user.$id,
      {
        photoUrl: response.$id
      },
    );

    const userProfile = await User.getProfileData(state.user.$id);
    const profileImage = await User.getImageProfileLink(userProfile.photoUrl);
    dispatch({
      type: 'UPDATE_PROFILE_IMAGE',
      payload: {
        isInitialized: true,
        isAuthenticated: true,
        profileImage: profileImage,
        userProfile: userProfile,
      }
    })
  }, [state])

  // UPDATE USER GENERAL
  const updateUserGeneral = useCallback(async (info) => {
    await databases.updateDocument(
      APPWRITE_API.databaseId,
      APPWRITE_API.databases.usersGeneral,
      state.user.$id,
      {
        address: info.address,
        country: info.country,
        city: info.city,
        state: info.state,
        zipCode: info.zipCode,
        about: info.about,
        schoolCollege: info.schoolCollege,
      },
    );

    const userGeneral = await databases.getDocument(
      APPWRITE_API.databaseId,
      APPWRITE_API.databases.usersGeneral,
      state.user.$id,
    );

    dispatch({
      type: 'UPDATE_USER_GENERAL',
      payload: {
        userGeneral: userGeneral,
      },
    });

  }, [state])

  // UPDATE USER SOCIAL LINKS
  const updateUserSocialLinks = useCallback(async (info) => {
    await databases.updateDocument(
      APPWRITE_API.databaseId,
      APPWRITE_API.databases.usersSocialLinks,
      state.user.$id,
      {
        facebookId: info.facebookId === '' ? null : info.facebookId,
        instagramId: info.instagramId === '' ? null : info.instagramId,
        linkedinId: info.linkedinId === '' ? null : info.linkedinId,
        twitterId: info.twitterId === '' ? null : info.twitterId,
      },
    );

    const userSocialLinks = await databases.getDocument(
      APPWRITE_API.databaseId,
      APPWRITE_API.databases.usersSocialLinks,
      state.user.$id,
    );

    dispatch({
      type: 'UPDATE_USER_SOCIAL_LINKS',
      payload: {
        userSocialLinks: userSocialLinks,
      },
    });
  }, [state])
  // ******** END : UPDATE DATA FUNCTIONS ********



  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      profileImage: state.profileImage,
      userProfile: state.userProfile,
      userGeneral: state.userGeneral,
      userPermissions: state.userPermissions,
      userSocialLinks: state.userSocialLinks,
      underMaintenance: state.underMaintenance,
      // auth functions
      login,
      logout,
      updatePassword,
      //update functions
      updateProfileImage,
      updateUserGeneral,
      updateUserSocialLinks,
      // fetch functions
      fetchGeneralData,
      fetchPermissionData,
      fetchSocialLinksData,
      // team variables
      // team functions
    }),
    [state.isInitialized, state.isAuthenticated, state.user, state.profileImage, state.userProfile, state.userGeneral, state.userPermissions, state.userSocialLinks, state.underMaintenance, login, logout, updatePassword, updateProfileImage, updateUserGeneral, updateUserSocialLinks, fetchGeneralData, fetchPermissionData, fetchSocialLinksData]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
