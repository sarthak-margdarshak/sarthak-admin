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

import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Container, Grid, Button } from "@mui/material";
// auth
import { useAuthContext } from "../../../../auth/useAuthContext";
// _mock_
import { _appFeatured } from "../../../../_mock/arrays";
// components
import { useSettingsContext } from "../../../../components/settings";
// sections
import {
  AppWelcome,
  AppFeatured,
  QuestionTypedChart,
  CategoryChart,
} from "../../../../sections/@dashboard/general/app";
// assets
import { SeoIllustration } from "../../../../assets/illustrations";
import React, { useEffect } from "react";
import { useState } from "react";
import { Question } from "../../../../auth/Question";
import { PATH_DASHBOARD } from "../../../../routes/paths";

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const { user, isInitialized } = useAuthContext();

  const { themeStretch } = useSettingsContext();

  const [standardWiseSeries, setStandardWise] = useState([]);
  const [subjectWiseSeries, setSubjectWise] = useState([]);
  const [chapterWiseSeries, setChapterWise] = useState([]);
  const [conceptWiseSeries, setConceptWise] = useState([]);
  const [questionCount, setQuestionCount] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        var data = await Question.getTotalQuestionStandardWise();
        setStandardWise(data);
        data = await Question.getTotalQuestionSubjectWise();
        setSubjectWise(data);
        data = await Question.getTotalQuestionChapterWise();
        setChapterWise(data);
        data = await Question.getTotalQuestionConceptWise();
        setConceptWise(data);
        data = await Question.getQuestionTypedData();
        setQuestionCount(data);
      } catch (error) {}
      setLoading(false);
    };
    fetchData();
  }, [isInitialized]);

  return (
    <React.Fragment>
      <Helmet>
        <title> General: App | Sarthak Admin</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome
              title={`Welcome back! \n ${user?.name}`}
              description="Have you typed any question? Contribute to Sarthak Institute by adding questions to the System. Click below!!!"
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: "auto", md: "inherit" },
                  }}
                />
              }
              action={
                <Button
                  component={RouterLink}
                  variant="contained"
                  to={PATH_DASHBOARD.question.new}
                >
                  Enter The magic world
                </Button>
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured list={_appFeatured} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <CategoryChart
              title="Total Question Standard wise"
              chart={{
                series: standardWiseSeries,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <CategoryChart
              title="Total Question Subject wise"
              chart={{
                series: subjectWiseSeries,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <CategoryChart
              title="Total Question Chapter wise"
              chart={{
                series: chapterWiseSeries,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <CategoryChart
              title="Total Question Concept wise"
              chart={{
                series: conceptWiseSeries,
              }}
            />
          </Grid>

          {!loading && (
            <Grid item xs={12} md={6} lg={8}>
              <QuestionTypedChart
                title="Question Typed"
                questionCount={questionCount}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
