import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import QuestionDetails from '../../../../sections/@dashboard/question/edit/QuestionDetails';
import Iconify from '../../../../components/iconify/Iconify';
import { useLocales } from '../../../../locales';

// ----------------------------------------------------------------------

export default function QuestionDetailsPage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  const questionId = window.location.pathname.split('/')[3];

  return (
    <>
      <Helmet>
        <title>{translate('pages_dashboard_management_question_questionDetailsPage_title')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('pages_dashboard_management_question_questionDetailsPage_view')}
          links={[
            {
              name: translate('pages_dashboard_management_question_questionDetailsPage__dashboard'),
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate('pages_dashboard_management_question_questionDetailsPage_question'),
              href: PATH_DASHBOARD.question.list,
            },
            {
              name: questionId,
            },
          ]}
          action={
            <Button
              onClick={() => window.open(PATH_DASHBOARD.question.new, '_self')}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {translate('pages_dashboard_management_question_questionDetailsPage_new')}
            </Button>
          }
        />

        <QuestionDetails inComingQuestionId={questionId} />

      </Container>
    </>
  );
}
