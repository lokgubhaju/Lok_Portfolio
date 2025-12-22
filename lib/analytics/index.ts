export { pushToDataLayer } from "./pushToDataLayer";
export type {
  GTMEvent,
  PageViewEvent,
  ButtonClickEvent,
  FormSubmitEvent,
  LinkClickEvent,
  ProjectViewEvent,
  DownloadEvent,
  SocialClickEvent,
} from "./pushToDataLayer";

export {
  trackButtonClick,
  trackFormSubmit,
  trackLinkClick,
  trackProjectView,
  trackDownload,
  trackSocialClick,
  trackPageView,
  trackScrollDepth,
  trackSectionView,
  trackCustomEvent,
} from "./trackingHelpers";

export { useInViewTracking, useScrollTracking } from "./hooks";
