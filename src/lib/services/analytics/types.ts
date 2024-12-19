export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

export interface AnalyticsProvider {
  initialize(): Promise<void>;
  trackEvent(event: AnalyticsEvent): Promise<void>;
  identify(userId: string, traits?: Record<string, unknown>): Promise<void>;
  setUserProperties(properties: Record<string, unknown>): Promise<void>;
}