import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import Iconify from '../../../../components/iconify/Iconify';
// Sections
import QuestionListComponent from '../../../../sections/@dashboard/question/view/QuestionListComponent';
import { useLocales } from '../../../../locales';

// ----------------------------------------------------------------------

export default function QuestionEditPage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title>{translate('pages_dashboard_management_question_questionListPage_title')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('pages_dashboard_management_question_questionListPage_question')}
          links={[
            {
              name: translate('pages_dashboard_management_question_questionListPage_dashboard'),
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate('pages_dashboard_management_question_questionListPage_questions'),
            },
          ]}
          action={
            <Button
              onClick={() => window.open(PATH_DASHBOARD.question.new, '_self')}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {translate('pages_dashboard_management_question_questionListPage_new')}
            </Button>
          }
        />

        <QuestionListComponent />

      </Container>
    </>
  );
}
