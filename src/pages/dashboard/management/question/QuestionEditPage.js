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

// ----------------------------------------------------------------------

export default function QuestionEditPage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  const questionId = window.location.pathname.split('/')[3];

  return (
    <>
      <Helmet>
        <title>{translate('pages_dashboard_management_question_questionEditPage_title')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('pages_dashboard_management_question_questionEditPage_edit_question')}
          links={[
            {
              name: translate('pages_dashboard_management_question_questionEditPage_dashboard'),
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate('pages_dashboard_management_question_questionEditPage_question'),
              href: PATH_DASHBOARD.question.list,
            },
            {
              name: questionId,
              href: PATH_DASHBOARD.question.view(questionId),
            },
            {
              name: translate('pages_dashboard_management_question_questionEditPage_edit'),
            },
          ]}
        />

        <QuestionNewCreateForm inComingQuestionId={questionId} />
      </Container>
    </>
  );
}
