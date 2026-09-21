# Meta advertising tracking

Tracking and the consent prompt are limited to `/mothers-daughter` and `/grace`, and require `fbclid` or a Meta/Facebook/Instagram source plus a paid medium (`paid_social`, `paid`, `cpc`, or `ppc`) in the current URL. This is an ad-marker heuristic, not proof of an ad click: shared tagged links qualify, and ads without markers do not. There is no session-wide ad attribution. Leaving an eligible URL after loading the SDK forces a reload to unload it. Meta automatic event configuration is disabled; Vercel Analytics remains unchanged.

For local testing, use `/mothers-daughter?utm_source=meta&utm_medium=paid_social&utm_campaign=mothers_daughter_release`. Also test unmarked visits and the homepage: neither should show a prompt or load the Meta SDK.

1. Create or select the band's website Pixel/dataset in Meta Events Manager and grant the ad account access.
2. Add `NEXT_PUBLIC_META_PIXEL_ID` in Vercel with the numeric Pixel ID. This ID is public, not an access token. Redeploy the latest commit after setting it. Leave it unset to disable both the Pixel and its consent prompt.
3. Test the live release page in Events Manager's Test Events tool. Accept advertising tracking: expect PageView, then StreamingLinkClick when clicking a streaming button. Check platform and release properties. Test client-side page navigation and declining in a fresh browser session. No Meta SDK request should occur before acceptance.
4. Test withdrawal using Ad privacy settings. The page reloads to unload the SDK. Previously shared data is not deleted.
5. Add UTM parameters in Ads Manager and verify the ad destination is the live release page. UTMs do not install tracking. Configure a custom conversion for StreamingLinkClick if desired; it measures outbound clicks, not actual streams.

No Conversions API, automatic advanced matching, or purchase events are installed. Cross-origin Spotify iframe playback is not tracked by this integration. Review the advertising privacy notice and your applicable consent requirements before activation.
