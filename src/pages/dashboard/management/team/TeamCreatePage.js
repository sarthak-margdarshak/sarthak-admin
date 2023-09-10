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

import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import TeamNewForm from '../../../../sections/@dashboard/team/newTeam/TeamNewForm';
// locales
import { useLocales } from '../../../../locales';

// ----------------------------------------------------------------------

export default function TeamCreatePage() {
  const arr = window.location.pathname.split('/');
  var teamId = null;
  if (arr.length === 5) {
    teamId = arr[3];
  }

  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
      {teamId ?
        <title>{translate('pages_dashboard_management_team_teamCreatePage_title_edit')}</title>:
        <title>{translate('pages_dashboard_management_team_teamCreatePage_title_create')}</title>
      }
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        {teamId ?
        <CustomBreadcrumbs
        heading={translate('pages_dashboard_management_team_teamCreatePage_title_edit_team')}
        links={[
          {
            name: translate('pages_dashboard_management_team_teamCreatePage_dashboard'),
            href: PATH_DASHBOARD.root,
          },
          {
            name: translate('pages_dashboard_management_team_teamCreatePage_team'),
            href: PATH_DASHBOARD.team.list,
          },
          {
            name: teamId,
            href: PATH_DASHBOARD.team.view(teamId),
          },
          { name: translate('pages_dashboard_management_team_teamCreatePage_edit')}
        ]}
      />:
        <CustomBreadcrumbs
          heading={translate('pages_dashboard_management_team_teamCreatePage_createANewTeam')}
          links={[
            {
              name: translate('pages_dashboard_management_team_teamCreatePage_dashboard'),
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate('pages_dashboard_management_team_teamCreatePage_team'),
              href: PATH_DASHBOARD.team.list,
            },
            { name: translate('pages_dashboard_management_team_teamCreatePage_new_team') },
          ]}
        />}
        <TeamNewForm teamId={teamId} />
      </Container>
    </>
  );
}
