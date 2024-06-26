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

// routes
import { PATH_DASHBOARD } from "./routes/paths";

// API
// ----------------------------------------------------------------------

export const APPWRITE_API = {
  backendUrl: process.env.REACT_APP_BACKEND_URL,
  projectId: process.env.REACT_APP_APPWRITE_PROJECT_ID,
  databaseId: process.env.REACT_APP_APPWRITE_SARTHAK_DATABASE,
  collections: {
    adminUsers: process.env.REACT_APP_APPWRITE_COLLECTION_ADMIN_USERS,
    chapters: process.env.REACT_APP_APPWRITE_COLLECTION_CHAPTERS,
    concepts: process.env.REACT_APP_APPWRITE_COLLECTION_CONCEPTS,
    mockTest: process.env.REACT_APP_APPWRITE_COLLECTION_MOCKTEST,
    mockTestDriver: process.env.REACT_APP_APPWRITE_COLLECTION_MOCK_TEST_DRIVER,
    questions: process.env.REACT_APP_APPWRITE_COLLECTION_QUESTIONS,
    sarthakInfoData:
      process.env.REACT_APP_APPWRITE_COLLECTION_SARTHAK_INFO_DATA,
    standards: process.env.REACT_APP_APPWRITE_COLLECTION_STANDARDS,
    subjects: process.env.REACT_APP_APPWRITE_COLLECTION_SUBJECTS,
    products: process.env.REACT_APP_APPWRITE_COLLECTION_PRODUCTS,
  },
  documents: {
    sarthak: process.env.REACT_APP_APPWRITE_DOCUMENT_SARTHAK,
    ceoId: process.env.REACT_APP_APPWRITE_DOCUMENT_CEO_ID,
  },
  buckets: {
    adminUserImage: process.env.REACT_APP_APPWRITE_BUCKET_ADMIN_USER_IMAGE,
    questionFiles: process.env.REACT_APP_APPWRITE_BUCKET_QUESTION_FILES,
    productFiles: process.env.REACT_APP_APPWRITE_BUCKET_PRODUCT_FILES,
  },
  functions: {
    contactInstitute: process.env.REACT_APP_APPWRITE_FUCTION_CONTACT_INSTITUTE,
    toogleBlock: process.env.REACT_APP_APPWRITE_FUCTION_TOGGLE_BLOCK,
    publishQuestion: process.env.REACT_APP_APPWRITE_FUCTION_PUBLIC_QUESTION,
    publishMockTest: process.env.REACT_APP_APPWRITE_FUCTION_PUBLISH_MOCK_TEST,
    publishProduct: process.env.REACT_APP_APPWRITE_FUCTION_PUBLISH_PRODUCT,
  },
};

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};
