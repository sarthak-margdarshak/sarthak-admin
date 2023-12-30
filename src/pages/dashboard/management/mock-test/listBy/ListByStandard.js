import { Button, Container, Grid, Skeleton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import CustomBreadcrumbs from "../../../../../components/custom-breadcrumbs";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { useSettingsContext } from "../../../../../components/settings";
import Iconify from "../../../../../components/iconify";
import { Link as RouterLink } from 'react-router-dom';
import MockTestTile from "../../../../../sections/@dashboard/mock-test/MockTestTile";
import { useEffect, useState } from "react";
import { MockTest } from "../../../../../auth/AppwriteContext";
import MockLoaderSkeleton from "../../../../../sections/@dashboard/mock-test/MockLoaderSkeleton";

export default function ListByStandard() {
  const { themeStretch } = useSettingsContext();
  const [standardList, setStandardList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await MockTest.getMockTestStandardList();
      setStandardList(data);
      setLoading(false)
    }
    fetchData();
  }, [])

  return (
    <>
      <Helmet>
        <title> Mock-Test: List | Standard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Mock-Test"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Mock-Test',
            },
            {
              name: 'Standards'
            }
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.mockTest.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Mock-Test
            </Button>
          }
        />

        {
          loading
            ?
              <MockLoaderSkeleton />
            :
              <Grid container spacing={3}>
                {
                  standardList.map((value) =>
                    <Grid item key={value.id}>
                      <MockTestTile
                        tileValue={value.name}
                        tileLink={PATH_DASHBOARD.mockTest.subjectList(value.id)}
                      />
                    </Grid>
                  )
                }
              </Grid>
        }

      </Container >
    </>
  )
}