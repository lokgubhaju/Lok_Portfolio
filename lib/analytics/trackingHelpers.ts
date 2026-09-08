import {
  pushToDataLayer,
  ButtonClickEvent,
  FormSubmitEvent,
  LinkClickEvent,
  ProjectViewEvent,
  DownloadEvent,
  SocialClickEvent,
  PageViewEvent,
} from "./pushToDataLayer";

export const trackButtonClick = (
  label: string,
  action: string = "click",
  category?: string
) => {
  const event: ButtonClickEvent = {
    event: "button_click",
    eventAction: action,
    eventLabel: label,
    ...(category && { eventCategory: category }),
  };
  pushToDataLayer(event);
};

export const trackFormSubmit = (
  formName: string,
  success: boolean,
  destination?: string
) => {
  const event: FormSubmitEvent = {
    event: "form_submit",
    form_name: formName,
    success,
    ...(destination && { form_destination: destination }),
  };
  pushToDataLayer(event);
};

export const trackLinkClick = (
  url: string,
  text: string,
  type?: "external" | "internal" | "download"
) => {
  const event: LinkClickEvent = {
    event: "link_click",
    link_url: url,
    link_text: text,
    ...(type && { link_type: type }),
  };
  pushToDataLayer(event);
};

export const trackProjectView = (projectName: string, category?: string) => {
  const event: ProjectViewEvent = {
    event: "project_view",
    project_name: projectName,
    ...(category && { project_category: category }),
  };
  pushToDataLayer(event);
};

export const trackDownload = (fileName: string, fileType: string) => {
  const event: DownloadEvent = {
    event: "file_download",
    file_name: fileName,
    file_type: fileType,
  };
  pushToDataLayer(event);
};

export const trackSocialClick = (
  platform: "github" | "linkedin" | "twitter" | "email" | string,
  action: string = "click"
) => {
  const event: SocialClickEvent = {
    event: "social_click",
    social_platform: platform,
    social_action: action,
  };
  pushToDataLayer(event);
};

export const trackPageView = (
  pageTitle?: string,
  pagePath?: string,
  pageLocation?: string
) => {
  const event: PageViewEvent = {
    event: "page_view",
    ...(pageTitle && { page_title: pageTitle }),
    ...(pagePath && { page_path: pagePath }),
    ...(pageLocation && { page_location: pageLocation }),
  };
  pushToDataLayer(event);
};

export const trackScrollDepth = (depth: number) => {
  pushToDataLayer({
    event: "scroll_depth",
    scroll_depth: depth,
  });
};

export const trackSectionView = (sectionName: string) => {
  pushToDataLayer({
    event: "section_view",
    section_name: sectionName,
  });
};

export const trackCustomEvent = (
  eventName: string,
  eventData?: Record<string, unknown>
) => {
  pushToDataLayer({
    event: eventName,
    ...eventData,
  });
};
