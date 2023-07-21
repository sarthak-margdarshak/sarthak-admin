import PropTypes from 'prop-types';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Step,
  Paper,
  Button,
  Stepper,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Grid,
  CardHeader,
  CardContent,
  Card,
  Stack,
  Typography,
  Autocomplete,
  TextField,
  Divider,
  Alert,
  Collapse,
  IconButton,
  Dialog,
  Slide,
  Toolbar,
  AppBar,
} from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
import { Upload } from '../../../../components/upload';
// Auth
import { useAuthContext } from '../../../../auth/useAuthContext';
import {
  Question,
} from '../../../../auth/AppwriteContext';
// Routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// Animation
import { MotionContainer, varFade, varZoom } from '../../../../components/animate';
import { m } from 'framer-motion';
// Latex
import MathInput from "react-math-keyboard";
import 'katex/dist/katex.min.css';
import ReactKatex from '@pkasila/react-katex';

import PermissionDeniedComponent from '../../../_examples/PermissionDeniedComponent';

// ----------------------------------------------------------------------

const STEPS = ['Meta data', 'Question', 'Option A', 'Option B', 'Option C', 'Option D'];

// ----------------------------------------------------------------------

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderRadius: 1,
    borderTopWidth: 3,
    borderColor: theme.palette.divider,
  },
}));

// ----------------------------------------------------------------------

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  height: 22,
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.disabled,
  ...(ownerState.active && {
    color: theme.palette.success.main,
  }),
  '& .QontoStepIcon-completedIcon': {
    zIndex: 1,
    fontSize: 18,
    color: theme.palette.success.main,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

// ----------------------------------------------------------------------

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  className: PropTypes.string,
};

// ----------------------------------------------------------------------

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Iconify
          icon="eva:checkmark-fill"
          className="QontoStepIcon-completedIcon"
          width={24}
          height={24}
        />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

// ----------------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ----------------------------------------------------------------------

export default function QuestionNewCreateForm({ metaData }) {

  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [content, setContent] = useState('');

  const [questionId, setquestionId] = useState(metaData?.id || '');

  const [question, setQuestion] = useState(metaData?.question || '');
  const [coverQuestion, setCoverQuestion] = useState(metaData?.coverQuestion || null);
  const [optionA, setOptionA] = useState(metaData?.optionA || '');
  const [coverOptionA, setCoverOptionA] = useState(metaData?.coverOptionA || null);
  const [optionB, setOptionB] = useState(metaData?.optionB || '');
  const [coverOptionB, setCoverOptionB] = useState(metaData?.coverOptionB || null);
  const [optionC, setOptionC] = useState(metaData?.optionC || '');
  const [coverOptionC, setCoverOptionC] = useState(metaData?.coverOptionC || null);
  const [optionD, setOptionD] = useState(metaData?.optionD || '');
  const [coverOptionD, setCoverOptionD] = useState(metaData?.coverOptionD || null);

  const [standard, setStandard] = useState(metaData?.standard || '');
  const [subject, setSubject] = useState(metaData?.subject || '');
  const [chapter, setChapter] = useState(metaData?.chapter || '');
  const [concept, setConcept] = useState(metaData?.concept || '');

  const [standardList, setStandardList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [conceptList, setConceptList] = useState([]);

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [motionKey, setMotionKey] = useState(0);
  const [motion, setMotion] = useState('fadeInRight');

  const [mathDialogOpen, setMathDialogOpen] = useState(false);
  const [latex, setLatex] = useState("")

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState({ active: false, message: 'This is an error' })

  const [canEdit] = useState(!metaData || ((metaData?.status === 'Initialize' && user?.$id === metaData?.editedBy) || (metaData?.status === 'ReviewedBack' || user?.$id === metaData?.reviewdBackTo)));

  const formData = {
    questionId: questionId,
    standard: standard,
    subject: subject,
    chapter: chapter,
    concept: concept,
    question: question,
    coverQuestion: coverQuestion,
    optionA: optionA,
    coverOptionA: coverOptionA,
    optionB: optionB,
    coverOptionB: coverOptionB,
    optionC: optionC,
    coverOptionC: coverOptionC,
    optionD: optionD,
    coverOptionD: coverOptionD,
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        var data = await Question.getStandardList();
        setStandardList(data);
        data = await Question.getSubjectList()
        setSubjectList(data);
        data = await Question.getChapterList()
        setChapterList(data);
        data = await Question.getConceptList()
        setConceptList(data);
        setIsLoadingData(false)
      } catch (error) {
        setIsLoadingData(false)
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
    fetchData();
  }, [metaData, enqueueSnackbar])

  const handleNext = () => {
    if (activeStep === 0) {
      saveMetaData();
    } else if (activeStep === 1) {
      saveQuestion();
    } else if (activeStep === 2) {
      saveOptionA();
    } else if (activeStep === 3) {
      saveOptionB();
    } else if (activeStep === 4) {
      saveOptionC();
    }
  };

  const handleBack = async () => {
    setMotionKey(motionKey + 1)
    setMotion('zoomOut')
    if (activeStep === 2) {
      setContent(question);
    } else if (activeStep === 3) {
      setContent(optionA);
    } else if (activeStep === 4) {
      setContent(optionB);
    } else if (activeStep === 5) {
      setContent(optionC);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMotionKey(motionKey + 2)
    setMotion('fadeInRight')
  };

  const saveMetaData = async () => {
    setIsSaving(true);
    if (formData?.standard === null || formData?.standard === '') {
      setError({ active: true, message: 'Standard cannot be empty. — check it out!' });
      setIsSaving(false);
      return false;
    }
    if (formData?.subject === null || formData?.subject === '') {
      setError({ active: true, message: 'Subject cannot be empty. — check it out!' });
      setIsSaving(false);
      return false;
    }
    if (formData?.chapter === null || formData?.chapter === '') {
      setError({ active: true, message: 'Chapter cannot be empty. — check it out!' });
      setIsSaving(false);
      return false;
    }
    if (formData?.concept === null || formData?.concept === '') {
      setError({ active: true, message: 'Concept cannot be empty. — check it out!' });
      setIsSaving(false);
      return false;
    }
    try {
      const savedQuestion = await Question.uploadMetaDataQuestion(questionId, standard, subject, chapter, concept, user?.$id);
      setquestionId(savedQuestion?.$id);
      setContent(question);
      setMotionKey(motionKey + 1)
      setMotion('zoomOut')
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMotionKey(motionKey + 2)
      setMotion('fadeInRight');
    } catch (error) {
      setError({ active: true, message: error.message });
    }
    setIsSaving(false);
    setMotionKey(motionKey + 1);
  }

  const saveQuestion = async () => {
    setQuestion(content);
    setIsSaving(true);
    if (content === null || content === '') {
      setError({ active: true, message: 'Question cannot be empty. — check it out!' });
      setIsSaving(false);
      return false;
    }
    try {
      await Question.uploadQuestionContent(questionId, content, coverQuestion, user?.$id);
      setContent(optionA);
      setMotionKey(motionKey + 1)
      setMotion('zoomOut')
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMotionKey(motionKey + 2)
      setMotion('fadeInRight')
    } catch (error) {
      setError({ active: true, message: error.message });
    }
    setIsSaving(false);
  }

  const saveOptionA = async () => {
    setIsSaving(true);
    setOptionA(content);
    if (content === null || content === '') {
      setError({ active: true, message: 'Option A cannot be empty. — check it out!' });
      setIsSaving(false);
      return false;
    }
    try {
      await Question.uploadOptionAContent(questionId, content, coverOptionA, user?.$id);
      setContent(optionB);
      setMotionKey(motionKey + 1)
      setMotion('zoomOut')
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMotionKey(motionKey + 2)
      setMotion('fadeInRight')
    } catch (error) {
      setError({ active: true, message: error.message });
    }
    setIsSaving(false);
  }

  const saveOptionB = async () => {
    setIsSaving(true);
    setOptionB(content);
    if (content === null || content === '') {
      setError({ active: true, message: 'Option B cannot be empty. — check it out!' });
      setIsSaving(false);
      return false;
    }
    try {
      await Question.uploadOptionBContent(questionId, content, coverOptionB, user?.$id);
      setContent(optionC);
      setMotionKey(motionKey + 1)
      setMotion('zoomOut')
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMotionKey(motionKey + 2)
      setMotion('fadeInRight')
    } catch (error) {
      setError({ active: true, message: error.message });
    }
    setIsSaving(false);
  }

  const saveOptionC = async () => {
    setIsSaving(true);
    setOptionC(content);
    if (content === null || content === '') {
      setError({ active: true, message: 'Option C cannot be empty. — check it out!' });
      setIsSaving(false);
      return false;
    }
    try {
      await Question.uploadOptionCContent(questionId, content, coverOptionC, user?.$id);
      setContent(optionD);
      setMotionKey(motionKey + 1)
      setMotion('zoomOut')
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMotionKey(motionKey + 2)
      setMotion('fadeInRight')
    } catch (error) {
      setError({ active: true, message: error.message });
    }
    setIsSaving(false);
  }

  const saveOptionD = async () => {
    setIsSaving(true);
    setOptionD(content);
    if (content === null || content === '') {
      setError({ active: true, message: 'Option D cannot be empty. — check it out!' });
      setIsSaving(false);
      return false;
    }
    try {
      await Question.uploadOptionDContent(questionId, content, coverOptionD, user?.$id);
      await Question.sendForApproval(questionId, user?.$id);
      enqueueSnackbar('Successfully Sent for Approval');
      navigate(PATH_DASHBOARD.question.view(questionId))
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      setError({ active: true, message: error.message });
    }
    setIsSaving(false);
  }

  const onSubmit = async () => {
    saveOptionD();
  };

  const handleDropQuestion = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setCoverQuestion(newFile)
      }
    },
    [setCoverQuestion]
  );

  const handleDropOptionA = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setCoverOptionA(newFile)
      }
    },
    [setCoverOptionA]
  );

  const handleDropOptionB = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setCoverOptionB(newFile);
      }
    },
    [setCoverOptionB]
  );

  const handleDropOptionC = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setCoverOptionC(newFile);
      }
    },
    [setCoverOptionC]
  );

  const handleDropOptionD = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setCoverOptionD(newFile);
      }
    },
    [setCoverOptionD]
  );

  if (!canEdit) {
    return <PermissionDeniedComponent />
  }

  return (
    <Paper
      sx={{
        p: 1,
        my: 1,
        minHeight: 120,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>

          <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} >
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Divider sx={{ m: 1 }} />

          <Typography variant='h6' sx={{ m: 1 }}>
            Editor Playground
          </Typography>

          <Typography variant='subtitle2' sx={{ m: 1 }}>
            Use this editor to insert in the box of question and options
          </Typography>

          <Box sx={{ textAlign: 'right', mt: 2, mb: 2 }}>
            <Button
              sx={{ mr: 1 }}
              onClick={() => setMathDialogOpen(true)}
              color='info'
              variant='outlined'
              startIcon={<Iconify icon="tabler:math" />}
            >
              Math
            </Button>
          </Box>

          <TextField
            id="outlined-textarea"
            placeholder="Type here......."
            multiline
            fullWidth
            rows={5}
            maxRows={10}
            variant="filled"
            disabled={activeStep===0}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />

          <Dialog
            fullScreen
            open={mathDialogOpen}
            onClose={() => setMathDialogOpen(false)}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setMathDialogOpen(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Math Editor
                </Typography>
                <Button 
                  autoFocus
                  color="inherit"
                  onClick={() => {
                    if(latex!=='') {
                      setContent(content+' $'+latex+'$');
                    }
                    setLatex('');
                    setMathDialogOpen(false);

                  }}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <MathInput setValue={setLatex} />
          </Dialog>

          <Box sx={{ textAlign: 'right', mt: 2, mb: 2 }}>
            <Button
              disabled={content === ''}
              sx={{ mr: 1 }}
              onClick={() => setContent('<p></p>')}
              startIcon={<Iconify icon="mdi:clear-outline" />}
            >
              Clear
            </Button>
          </Box>

          <Divider />

          <Grid container>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>

              <Box sx={{ textAlign: 'left', mt: 1 }}>
                <Button
                  disabled={activeStep === 0}
                  variant="contained"
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  startIcon={<Iconify icon="mingcute:back-fill" />}
                >
                  Back
                </Button>
              </Box>

            </Grid>

            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Box sx={{ textAlign: 'right', mt: 1 }}>
                {activeStep === STEPS.length - 1 ?
                  <LoadingButton
                    variant="contained"
                    sx={{ mr: 1 }}
                    endIcon={<Iconify icon="iconoir:submit-document" />}
                    loading={isSaving}
                    onClick={onSubmit}
                  >
                    Submit For Approval
                  </LoadingButton>
                  :
                  <LoadingButton
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                    endIcon={<Iconify icon="carbon:next-outline" />}
                    color='success'
                    loading={isSaving}
                  >
                    Proceed to Next Step
                  </LoadingButton>
                }
              </Box>
            </Grid>
          </Grid>

          <Collapse in={error?.active}>
            <Divider sx={{ m: 1 }} />

            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setError({ active: false });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error?.message}
            </Alert>
          </Collapse>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={STEPS[activeStep]} />

            <CardContent>
              <MotionContainer component={m.body} variants={getVariant(motion)}>
                <Grid container spacing={3} key={motionKey} sx={{ p: 1, display: activeStep === 0 ? 'block' : 'none' }}>

                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      disabled
                      value={questionId}
                      label='ID'
                      helperText='ID is automatically generated by the system.'
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Autocomplete
                      fullWidth
                      freeSolo
                      autoSelect
                      autoComplete
                      value={standard}
                      loading={isLoadingData}
                      options={standardList}
                      onChange={(event, value) => {
                        setStandard(value?.$id ? value?.name : value);
                      }}
                      getOptionLabel={(option) => option?.name || option}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          {option?.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Standard" />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Autocomplete
                      fullWidth
                      freeSolo
                      autoSelect
                      autoComplete
                      value={subject}
                      loading={isLoadingData}
                      options={subjectList}
                      onChange={(event, value) => {
                        setSubject(value?.$id ? value?.name : value);
                      }}
                      getOptionLabel={(option) => option?.name || option}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          {option?.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Subject" />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Autocomplete
                      fullWidth
                      freeSolo
                      autoSelect
                      autoComplete
                      value={chapter}
                      loading={isLoadingData}
                      options={chapterList}
                      onChange={(event, value) => {
                        setChapter(value?.$id ? value?.name : value);
                      }}
                      getOptionLabel={(option) => option?.name || option}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          {option?.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Chapter" />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Autocomplete
                      fullWidth
                      freeSolo
                      autoSelect
                      autoComplete
                      value={concept}
                      loading={isLoadingData}
                      filterSelectedOptions
                      options={conceptList}
                      onChange={(event, value) => {
                        setConcept(value?.$id ? value?.name : value);
                      }}
                      getOptionLabel={(option) => option?.name || option}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          {option?.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Concept" />
                      )}
                    />
                  </Grid>
                </Grid>
              </MotionContainer>

              <MotionContainer component={m.body} variants={getVariant(motion)} sx={{ display: activeStep === 1 ? 'block' : 'none' }}>
                <Grid sx={{ p: 1 }} container spacing={3} key={motionKey}>
                  <Grid item xs={12} md={12}>
                    <Paper
                      sx={{
                        p: 1,
                        my: 1,
                        minHeight: 100,
                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                      }}
                    >
                      <ReactKatex>{content}</ReactKatex>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Upload Image If Required
                      </Typography>

                      <Upload
                        accept={{ 'image/*': [] }}
                        file={coverQuestion}
                        maxSize={15360}
                        onDrop={handleDropQuestion}
                        onDelete={() => {
                          setCoverQuestion(null);
                        }}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </MotionContainer>

              <MotionContainer component={m.body} variants={getVariant(motion)} sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
                <Grid sx={{ p: 1 }} container spacing={3} key={motionKey}>
                  <Grid item xs={12} md={12}>
                    <Paper
                      sx={{
                        p: 1,
                        my: 1,
                        minHeight: 100,
                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                      }}
                    >
                      <ReactKatex>{content}</ReactKatex>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Upload Image If Required
                      </Typography>

                      <Upload
                        accept={{ 'image/*': [] }}
                        file={coverOptionA}
                        maxSize={15360}
                        onDrop={handleDropOptionA}
                        onDelete={() => {
                          setCoverOptionA(null);
                        }}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </MotionContainer>

              <MotionContainer component={m.body} variants={getVariant(motion)} sx={{ display: activeStep === 3 ? 'block' : 'none' }}>
                <Grid sx={{ p: 1 }} container spacing={3} key={motionKey}>

                  <Grid item xs={12} md={12}>
                    <Paper
                      sx={{
                        p: 1,
                        my: 1,
                        minHeight: 100,
                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                      }}
                    >
                      <ReactKatex>{content}</ReactKatex>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Upload Image If Required
                      </Typography>

                      <Upload
                        accept={{ 'image/*': [] }}
                        file={coverOptionB}
                        maxSize={15360}
                        onDrop={handleDropOptionB}
                        onDelete={() => {
                          setCoverOptionB(null)
                        }}
                      />
                    </Stack>
                  </Grid>

                </Grid>
              </MotionContainer>

              <MotionContainer component={m.body} variants={getVariant(motion)} sx={{ display: activeStep === 4 ? 'block' : 'none' }}>
                <Grid sx={{ p: 1 }} container spacing={3} key={motionKey}>

                  <Grid item xs={12} md={12}>
                    <Paper
                      sx={{
                        p: 1,
                        my: 1,
                        minHeight: 100,
                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                      }}
                    >
                      <ReactKatex>{content}</ReactKatex>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Upload Image If Required
                      </Typography>

                      <Upload
                        accept={{ 'image/*': [] }}
                        file={coverOptionC}
                        maxSize={15360}
                        onDrop={handleDropOptionC}
                        onDelete={() => {
                          setCoverOptionC(null)
                        }}
                      />
                    </Stack>
                  </Grid>

                </Grid>
              </MotionContainer>

              <MotionContainer component={m.body} variants={getVariant(motion)} sx={{ display: activeStep === 5 ? 'block' : 'none' }}>
                <Grid sx={{ p: 1 }} container spacing={3} key={motionKey}>

                  <Grid item xs={12} md={12}>
                    <Paper
                      sx={{
                        p: 1,
                        my: 1,
                        minHeight: 100,
                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                      }}
                    >
                      <ReactKatex>{content}</ReactKatex>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Upload Image If Required
                      </Typography>

                      <Upload
                        accept={{ 'image/*': [] }}
                        file={coverOptionD}
                        maxSize={15360}
                        onDrop={handleDropOptionD}
                        onDelete={() => {
                          setCoverOptionD(null)
                        }}
                      />
                    </Stack>
                  </Grid>

                </Grid>
              </MotionContainer>

            </CardContent>
          </Card>
        </Grid>
      </Grid >
    </Paper >
  );
}

// ----------------------------------------------------------------------

function getVariant(variant) {
  return {
    fadeInLeft: varFade().inLeft,
    fadeInRight: varFade().inRight,
    zoomOut: varZoom().out,
  }[variant];
}