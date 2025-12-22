import { formatEmptyValues } from "./formatEmptyValues";

/**
 * Type guard to check if a value is a non-null object record
 */
const isNonNullRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

/**
 * Pushes an event to the Google Tag Manager dataLayer
 * @param event - The event object to push to the dataLayer
 *
 * @example
 * ```typescript
 * pushToDataLayer({
 *   event: 'button_click',
 *   eventAction: 'click',
 *   eventLabel: 'Download Resume',
 *   eventCategory: 'User Interaction'
 * });
 * ```
 */
export const pushToDataLayer = (event: unknown): void => {
  // Only run in browser environment
  if (typeof window !== "object") {
    return;
  }

  if (typeof window.dataLayer === "undefined") {
    window.dataLayer = [];
  }

  let formattedEvent = event;
  if (isNonNullRecord(event)) {
    formattedEvent = formatEmptyValues(event);
  }

  window.dataLayer.push(formattedEvent);

  if (process.env.NODE_ENV === "development") {
    console.log("[GTM] Event pushed to dataLayer:", formattedEvent);
  }
};

/** Type definitions for common GTM events **/
export interface GTMEvent {
  event: string;
  [key: string]: unknown;
}

export interface PageViewEvent extends GTMEvent {
  event: "page_view";
  page_title?: string;
  page_location?: string;
  page_path?: string;
}

export interface ButtonClickEvent extends GTMEvent {
  event: "button_click";
  eventAction: string;
  eventLabel: string;
  eventCategory?: string;
}

export interface FormSubmitEvent extends GTMEvent {
  event: "form_submit";
  form_name: string;
  form_destination?: string;
  success?: boolean;
}

export interface LinkClickEvent extends GTMEvent {
  event: "link_click";
  link_url: string;
  link_text: string;
  link_type?: string;
}

export interface ProjectViewEvent extends GTMEvent {
  event: "project_view";
  project_name: string;
  project_category?: string;
}

export interface DownloadEvent extends GTMEvent {
  event: "file_download";
  file_name: string;
  file_type: string;
}

export interface SocialClickEvent extends GTMEvent {
  event: "social_click";
  social_platform: string;
  social_action: string;
}
