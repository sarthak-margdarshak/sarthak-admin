import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import { QuestionNewCreateForm } from '../../../../sections/@dashboard/question/create';
import { useLocales } from '../../../../locales';
import {string as string} from '../../../../resource/string'

// ----------------------------------------------------------------------

export default function QuestionCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title>{translate(string.pages.dashboard.management.question.createPage.title)}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate(string.pages.dashboard.management.question.createPage.createANewQuestion)}
          links={[
            {
              name: translate(string.pages.dashboard.management.question.createPage.dashboard),
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate(string.pages.dashboard.management.question.createPage.question),
              href: PATH_DASHBOARD.question.list,
            },
            {
              name: translate(string.pages.dashboard.management.question.createPage.create),
            },
          ]}
        />

        <QuestionNewCreateForm />
      </Container>
    </>
  );
}
