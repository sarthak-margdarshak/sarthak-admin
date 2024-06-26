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

import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, Card, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../../components/iconify";
import { useSnackbar } from "../../../../components/snackbar";
import FormProvider, { RHFTextField } from "../../../../components/hook-form";
// Auth
import { useAuthContext } from "../../../../auth/useAuthContext";
// locales
import { useLocales } from "../../../../locales";

// ----------------------------------------------------------------------

const SOCIAL_LINKS = [
  {
    value: "facebookId",
    icon: <Iconify icon="eva:facebook-fill" width={24} />,
  },
  {
    value: "instagramId",
    icon: <Iconify icon="ant-design:instagram-filled" width={24} />,
  },
  {
    value: "linkedinId",
    icon: <Iconify icon="eva:linkedin-fill" width={24} />,
  },
  {
    value: "twitterId",
    icon: <Iconify icon="eva:twitter-fill" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function AccountSocialLinks() {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { userProfile, updateUserProfile } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    facebookId: Yup.string().matches(
      /^(http:\/\/|https:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)|^$/,
      translate("invalid_fb")
    ),
    instagramId: Yup.string().matches(
      /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)|^$/,
      translate("invalid_insta")
    ),
    linkedinId: Yup.string().matches(
      /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)|^$/,
      translate("invalid_linked")
    ),
    twitterId: Yup.string().matches(
      /(?:https?:)?\/\/(?:www\.|m\.)?twitter\.com\/(\w{2,15})\/?(?:\?\S+)?(?:#\S+)?$|^$/,
      translate("invalid_twit")
    ),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      facebookId: userProfile?.facebookId || "",
      instagramId: userProfile?.instagramId || "",
      linkedinId: userProfile?.linkedinId || "",
      twitterId: userProfile?.twitterId || "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await updateUserProfile({
        facebookId: data.facebookId || null,
        instagramId: data.instagramId || null,
        linkedinId: data.linkedinId || null,
        twitterId: data.twitterId || null,
      });
      enqueueSnackbar(translate("update_success") + " !!!", {
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <RHFTextField
              key={link.value}
              name={link.value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{link.icon}</InputAdornment>
                ),
              }}
            />
          ))}

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {translate("save_changes")}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
