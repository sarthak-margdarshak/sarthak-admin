// @mui
import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import Image from '../../../../components/image/Image';
import Iconify from '../../../../components/iconify/Iconify';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../routes/paths';

export default function QuestionViewComponent({ metaData }) {
  const navigate = useNavigate();
  return (
    <>
      <Paper
        sx={{
          p: 1,
          my: 3,
          minHeight: 120,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
        }}
      >

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant='h6'>Question</Typography>
            <Paper
              sx={{
                p: 1,
                minHeight: 120,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
              }}
            >
              <FroalaEditorView model={metaData?.question} />
              {metaData?.coverQuestion &&
                <Image
                  disabledEffect
                  alt='question'
                  src={metaData?.coverQuestion}
                  sx={{ borderRadius: 1 }}
                />
              }
            </Paper>

          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='h6'>Options</Typography>
            <Paper
              sx={{
                p: 1,
                minHeight: 120,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
              }}
            >
              <Stack direction={'row'}>
                <Typography variant='subtitle2' sx={{ mt: 2, mr: 1 }}>{'(A)'}</Typography>
                <FroalaEditorView model={metaData?.optionA} />
              </Stack>
              {metaData?.coverOptionA &&
                <Image
                  disabledEffect
                  alt='option A'
                  src={metaData?.coverOptionA}
                  sx={{ borderRadius: 1, ml: 2 }}
                />
              }
              <Divider sx={{m: 1}} />

              <Stack direction={'row'} >
                <Typography variant='subtitle2' sx={{ mt: 2, mr: 1 }}>{'(B)'}</Typography>
                <FroalaEditorView model={metaData?.optionB} />
              </Stack>
              {metaData?.coverOptionB &&
                <Image
                  disabledEffect
                  alt='option B'
                  src={metaData?.coverOptionB}
                  sx={{ borderRadius: 1, ml: 2 }}
                />
              }
              <Divider sx={{m: 1}} />

              <Stack direction={'row'} >
                <Typography variant='subtitle2' sx={{ mt: 2, mr: 1 }}>{'(C)'}</Typography>
                <FroalaEditorView model={metaData?.optionC} />
              </Stack>
              {metaData?.coverOptionC &&
                <Image
                  disabledEffect
                  alt='option C'
                  src={metaData?.coverOptionC}
                  sx={{ borderRadius: 1, ml: 2 }}
                />
              }
              <Divider sx={{m: 1}} />

              <Stack direction={'row'}>
                <Typography variant='subtitle2' sx={{ mt: 2, mr: 1 }}>{'(D)'}</Typography>
                <FroalaEditorView sx={{ ml: 2 }} model={metaData?.optionD} />
              </Stack>
              {metaData?.coverOptionD &&
                <Image
                  disabledEffect
                  alt='option D'
                  src={metaData?.coverOptionD}
                  sx={{ borderRadius: 1, ml: 2 }}
                />
              }
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'right', m: 2 }}>
        <Button
          startIcon={<Iconify icon='tabler:edit' />}
          onClick={() => navigate(PATH_DASHBOARD.question.edit(metaData?.id))}
        >
          Edit
        </Button>
        </Box>

      </Paper >
    </>
  )
}