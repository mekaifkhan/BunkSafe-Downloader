/**
 * Google Analytics 4 Integration and Session Tracking Helper
 */

export interface VisitorInfo {
  device: "Mobile" | "Tablet" | "Desktop";
  browser: string;
  country: string;
  isReturning: boolean;
  os: string;
}

// Global declarations for Google Analytics window object
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Fallback measurement ID
const GA_MEASUREMENT_ID = "G-BUNKSAFE26";

/**
 * Detects the current browser details.
 */
function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.indexOf("Firefox") > -1) return "Mozilla Firefox";
  if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) return "Opera";
  if (ua.indexOf("Trident") > -1) return "Internet Explorer";
  if (ua.indexOf("Edge") > -1) return "Microsoft Edge";
  if (ua.indexOf("Chrome") > -1) return "Google Chrome";
  if (ua.indexOf("Safari") > -1) return "Apple Safari";
  return "Unknown Browser";
}

/**
 * Detects the current Operating System.
 */
function getOS(): string {
  const ua = navigator.userAgent;
  if (ua.indexOf("Windows") > -1) return "Windows";
  if (ua.indexOf("Macintosh") > -1) return "macOS";
  if (ua.indexOf("Linux") > -1) return "Linux";
  if (ua.indexOf("Android") > -1) return "Android";
  if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) return "iOS";
  return "Other OS";
}

/**
 * Detects the device type.
 */
function getDeviceType(): "Mobile" | "Tablet" | "Desktop" {
  const width = window.innerWidth;
  if (width < 768) return "Mobile";
  if (width >= 768 && width < 1024) return "Tablet";
  return "Desktop";
}

/**
 * Estimates country based on the browser timezone.
 */
function estimateCountry(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return "India (Estimated)";
    
    // Simple timezone to country mappings
    if (tz.includes("Kolkata") || tz.includes("Calcutta")) return "India";
    if (tz.includes("New_York") || tz.includes("Chicago") || tz.includes("Los_Angeles")) return "United States";
    if (tz.includes("London")) return "United Kingdom";
    if (tz.includes("Berlin") || tz.includes("Paris") || tz.includes("Rome")) return "Europe";
    if (tz.includes("Singapore")) return "Singapore";
    if (tz.includes("Dubai")) return "UAE";
    if (tz.includes("Tokyo")) return "Japan";
    if (tz.includes("Sydney")) return "Australia";
    
    return tz.split("/")[1]?.replace("_", " ") || "India";
  } catch (e) {
    return "India";
  }
}

/**
 * Initializes Google Analytics 4 script tag dynamically.
 */
export function initializeGA(): void {
  if (typeof window === "undefined") return;

  // Check if already initialized
  if (document.getElementById("ga-gtag")) return;

  // Create script tag
  const script = document.createElement("script");
  script.id = "ga-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  
  window.gtag("js", new Date());
  
  // Custom configurations for enhanced privacy
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    cookie_flags: "SameSite=None;Secure",
    custom_map: {
      dimension1: "device_type",
      dimension2: "browser",
      dimension3: "estimated_country",
      dimension4: "visitor_status"
    }
  });

  // Track page view event immediately
  trackEvent("page_view", {
    page_title: document.title,
    page_path: window.location.pathname
  });

  // Check and log visitor status
  const visitor = getVisitorInfo();
  trackEvent("visitor_info", {
    device_type: visitor.device,
    browser: visitor.browser,
    estimated_country: visitor.country,
    visitor_status: visitor.isReturning ? "Returning" : "New",
    os: visitor.os
  });
}

/**
 * Logs a custom event to Google Analytics.
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
  // Console logging for verification during preview
  console.log(`[GA4 Event] ${eventName}:`, params);
}

/**
 * Compiles visitor details securely.
 */
export function getVisitorInfo(): VisitorInfo {
  if (typeof window === "undefined") {
    return { device: "Desktop", browser: "Unknown", country: "India", isReturning: false, os: "Unknown" };
  }

  const isReturningKey = "bunksafe_visited";
  const hasVisited = localStorage.getItem(isReturningKey);
  const isReturning = !!hasVisited;

  if (!hasVisited) {
    localStorage.setItem(isReturningKey, "true");
  }

  return {
    device: getDeviceType(),
    browser: getBrowser(),
    country: estimateCountry(),
    isReturning,
    os: getOS()
  };
}
