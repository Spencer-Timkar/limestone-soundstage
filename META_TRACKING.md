# Release funnel tracking (version 2)

Applies to `/mothers-daughter` and `/grace`. Nothing in this change deploys code or modifies Ads Manager. The local `/tracking-review` demonstration is preview-only and must not be copied into the source repository.

## Event contract

| Action | Vercel event | Meta event |
| --- | --- | --- |
| First release landing in a visit | ReleaseLanding | ReleaseLanding |
| First streaming-button click for that release | Hyperfollow Conversion | StreamingLinkClick |
| Further taps, including another music service | None | None |
| Reload within the same visit | Normal pageview only | Normal PageView only |

Meta keeps its existing normal PageView event. Vercel's normal pageviews also remain unchanged. The new landing and click events are distinct from pageviews. StreamingLinkClick keeps its existing name for compatibility with existing Meta custom conversions; its definition changes from every eligible tap to the first tap per release/visit. Compare dates before and after deployment with that definition change in mind.

A visit is scoped to one browser tab and restarts after 30 minutes between tracked actions or a different set of explicit campaign/ad tags. Each release has its own landing and conversion within the visit. Reloads retain the counters in sessionStorage. Closing a tab normally clears it; copied tabs and separate browsers/devices cannot be treated as one person. If storage is unavailable, the fallback prevents repeats only until reload. This is session-level uniqueness, not unique people. Tagless navigation within the same tab retains the initial campaign context for Vercel events. Meta still runs only on currently eligible tagged URLs, matching the existing policy.

Allowlisted parameters: utm_source, utm_medium, utm_campaign, utm_content, utm_term, campaign_id, adset_id, ad_id. Values are capped at 200 characters. No raw fbclid, full referrer, email or contact form data is copied into custom event properties or the visit store. Meta's existing Pixel still receives the page URL and processes its own click identifiers normally. Click events include release, page, first platform, seconds_to_click, and tracking_version=2. PageView is not a unique denominator; use ReleaseLanding.

## Platform coverage

Music buttons explicitly carry their platform labels, replacing hostname inference. This covers Spotify, Apple Music, Deezer, YouTube, YouTube Music, iTunes Store, TIDAL and Amazon Music wherever those buttons exist. Social icons have no music marker and do not count as streaming conversions. iTunes is a music-store click, not proof of a download or purchase. Grace's YouTube Music button now links to the supplied release playlist:
https://music.youtube.com/playlist?list=OLAK5uy_nkOYbKsOoVH-n_dGcjw2MobI36LVHYWbs

## Meta integration

Use the existing numeric NEXT_PUBLIC_META_PIXEL_ID. No new token is required. The SDK still loads only on the two release pages when the current URL has fbclid, or a Meta/Facebook/Instagram source plus paid_social/paid/cpc/ppc medium. Leaving eligibility reloads to unload the SDK. Automatic Meta event configuration remains disabled. This component has no consent dialog; the previous documentation claiming a consent prompt was stale. The change preserves the existing loading behavior, and privacy copy describes the additional visit storage.

Events use fbq trackCustom with eventID. This is browser Pixel tracking, not Conversions API. Event IDs do not create a server-side copy or prove delivery. Network blockers may prevent events. This implementation does not detect installed apps, app opens, actual listening, saves, follows or purchases.

In Ads Manager's URL parameters field, retain the existing readable tags and add stable IDs. Example (without a leading question mark):

```text
utm_source=meta&utm_medium=paid_social&utm_campaign=mothers_daughter&utm_content=v1_stan_lee&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}
```

Use grace and the appropriate creative label for Grace ads. Existing tags work; numeric IDs distinguish ads that share names. Adding these parameters is an Ads Manager change and has not been performed here.

After approval and deployment, verify the existing dataset in Meta Events Manager Test Events: fresh tagged landing gives PageView and ReleaseLanding; first music click gives StreamingLinkClick with correct release/platform/ad tags; repeated taps and reload produce no additional unique conversion; a different ad tag or timeout permits a new landing/conversion. Check TIDAL, Amazon Music, iTunes and Grace YouTube Music in fresh visits so prior conversion deduplication does not hide the platform test. Keep the existing StreamingLinkClick custom conversion/optimization if that is the selected business goal. ReleaseLanding is for funnel measurement, not a replacement optimization target.

## Reporting and limits

For the same release, ad ID and period, compare unique StreamingLinkClick events with ReleaseLanding events. Report this as visit-to-music-click conversion, not stream conversion. Reporting-window boundaries, blocked events, tag changes, attribution windows and distinct counting methods can affect ratios. Do not divide Meta attributed conversions by Vercel pageviews to claim a true conversion rate.

Vercel custom events require Pro or Enterprise. The current account blocked custom-event reads, so recording code alone does not unlock its dashboard. Meta event parameters provide an independent inspection path; Ads Manager attribution totals still differ from raw first-party visit counts. No plan or billing setting was changed.

## Verification

Run `node lib/releaseTracking.test.mjs` and `npx tsc --noEmit`. Local automated tests verify repeat suppression, reload persistence, release separation, campaign changes, timeout, storage fallback, parameter filtering, and event dispatch. Local tests do not establish receipt by the live Meta dataset. Perform Test Events checks after deployment before relying on new reporting.
