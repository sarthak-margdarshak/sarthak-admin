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

import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// EXPORT ---------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// DASHBOARD: GENERAL
export const GeneralAppPage = Loadable(lazy(() => import('../pages/dashboard/general/app/GeneralAppPage')));

// DASHBOARD: USER
export const UserProfilePage = Loadable(lazy(() => import('../pages/dashboard/management/user/UserProfilePage')));
export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/management/user/UserAccountPage')));

// DASHBOARD: TEAM
export const TeamListPage = Loadable(lazy(() => import('../pages/dashboard/management/team/TeamListPage')));
export const TeamCreatePage = Loadable(lazy(() => import('../pages/dashboard/management/team/TeamCreatePage')));
export const TeamDetailsPage = Loadable(lazy(() => import('../pages/dashboard/management/team/TeamDetailsPage')));
export const TeamUserPermissionPage = Loadable(lazy(() => import('../pages/dashboard/management/team/UserUpdatePermissionPage')));

// DASHBOARD: QUESTION
export const QuestionListPage = Loadable(lazy(() => import('../pages/dashboard/management/question/QuestionListPage')));
export const QuestionCreatePage = Loadable(lazy(() => import('../pages/dashboard/management/question/QuestionCreatePage')));
export const QuestionDetailsPage = Loadable(lazy(() => import('../pages/dashboard/management/question/QuestionDetailsPage')));
export const QuestionEditPage = Loadable(lazy(() => import('../pages/dashboard/management/question/QuestionEditPage')));

// NOTIFICATION
export const NotificationListPage = Loadable(lazy(() => import('../pages/dashboard/notifications/NotificationListPage')));

// MOCK-TEST
export const MockTestListStandardPage = Loadable(lazy(() => import('../pages/dashboard/management/mock-test/listBy/ListByStandard')));
export const MockTestPage = Loadable(lazy(() => import('../pages/dashboard/management/mock-test/MockTestPage')));
export const MockTestEditPage = Loadable(lazy(() => import('../pages/dashboard/management/mock-test/MockTestEditPage')));
export const MockTestListBySubjectPage = Loadable(lazy(() => import('../pages/dashboard/management/mock-test/listBy/ListBySubject')));
export const MockTestListByChapterPage = Loadable(lazy(() => import('../pages/dashboard/management/mock-test/listBy/ListByChapter')));
export const MockTestListByConceptPage = Loadable(lazy(() => import('../pages/dashboard/management/mock-test/listBy/ListByConcept')));
export const MockTestListPage = Loadable(lazy(() => import('../pages/dashboard/management/mock-test/listBy/List')));
export const MockTestNewPage = Loadable(lazy(() => import('../pages/dashboard/management/mock-test/MockTestNewPage')))

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const FaqsPage = Loadable(lazy(() => import('../pages/FaqsPage')));
export const AboutPage = Loadable(lazy(() => import('../pages/AboutPage')));
export const Contact = Loadable(lazy(() => import('../pages/ContactPage')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));
export const ChangeLogPage = Loadable(lazy(() => import('../pages/ChangeLogPage')));
export const PrivacyAndPolicyPage = Loadable(lazy(() => import('../pages/PrivacyAndPolicyPage')));
export const TermsAndConditionsPage = Loadable(lazy(() => import('../pages/TermsAndConditionsPage')));
