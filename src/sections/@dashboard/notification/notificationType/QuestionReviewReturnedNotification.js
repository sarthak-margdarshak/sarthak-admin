import { Box, Badge, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../../../../routes/paths";
// utils
import { fToNow } from '../../../../utils/formatTime';
import { Notification } from "../../../../auth/AppwriteContext";
import { useSnackbar } from '../../../../components/snackbar';

export default function QuestionReviewReturnedNotification({ item }) {
  console.log(item)

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const data = JSON.parse(item?.data);

  const updateNotification = async () => {
    try {
      await Notification.updateSeen(item?.$id);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  return (
    <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
      {item?.seen ?
        <Card
          sx={{ cursor: 'pointer', mb: 2 }}
          onClick={() => {
            updateNotification();
            navigate(PATH_DASHBOARD.question.view(data?.questionId));
          }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8} md={9} lg={10}>
                <Stack direction="row" alignItems="center">

                  <Box sx={{ minWidth: 240 }}>
                    <Typography color="inherit" variant="subtitle2">
                      {data?.sentBy + ' has sent back to you to update a question ' + data?.questionId}
                    </Typography>

                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {fToNow(item?.$createdAt)}
                      </Typography>
                    </Box>

                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card> :
        <Badge badgeContent='New' color="error">
          <Card
            sx={{ cursor: 'pointer', mb: 2 }}
            onClick={() => {
              updateNotification();
              navigate(PATH_DASHBOARD.question.view(data?.questionId));
            }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8} md={9} lg={10}>
                  <Stack direction="row" alignItems="center">

                    <Box sx={{ minWidth: 240 }}>
                      <Typography color="inherit" variant="subtitle2">
                        {data?.sentBy + ' has sent back to you to update a question ' + data?.questionId}
                      </Typography>

                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {fToNow(item?.$createdAt)}
                        </Typography>
                      </Box>

                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Badge>
      }
    </Grid>
  )
}