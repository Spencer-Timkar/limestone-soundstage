import test from 'node:test';
import assert from 'node:assert/strict';
import { createReleaseTracker, dispatchReleaseEvent, isMetaAd, attributionFrom, VISIT_TIMEOUT, STORAGE_KEY } from './releaseTracking.ts';
const md = '/mothers-daughter', grace = '/grace';
const ad = '?utm_source=meta&utm_medium=paid_social&utm_campaign=mothers_daughter&utm_content=v1_stan_lee&ad_id=123&fbclid=private-click-id';
function fixture() {
  const map = new Map(); let time=1000, seq=0;
  const storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};
  const make=()=>createReleaseTracker(storage,()=>time,()=>`event-${++seq}`);
  return {map,make,advance:n=>{time+=n;}};
}
test('landing is once per release, surviving reload with campaign attribution',()=>{
  const f=fixture(), t=f.make();
  assert.equal(t.landing(md,ad).data.ad_id,'123');
  assert.equal(t.landing(md,ad),null);
  assert.equal(f.make().landing(md,ad),null);
  assert.equal(t.landing(grace,'').data.utm_content,'v1_stan_lee');
});
test('first streaming choice counts; duplicate and different-service taps do not inflate conversion',()=>{
  const f=fixture(),t=f.make(); t.landing(md,ad); f.advance(5000);
  const click=t.click(md,ad,'TIDAL');
  assert.equal(click.name,'StreamingLinkClick'); assert.equal(click.data.platform,'TIDAL');
  assert.equal(click.data.seconds_to_click,5);
  assert.equal(t.click(md,ad,'TIDAL'),null);
  assert.equal(t.click(md,ad,'Amazon Music'),null);
  assert.equal(f.make().click(md,ad,'Spotify'),null);
});
test('Grace and Mothers Daughter have independent unique conversions',()=>{
  const t=fixture().make(); t.landing(md,ad); t.click(md,ad,'Spotify');
  t.landing(grace,''); assert.equal(t.click(grace,'','YouTube Music').name,'StreamingLinkClick');
});
test('a new ad resets the visit and uses the new creative',()=>{
  const t=fixture().make(); t.landing(md,ad); t.click(md,ad,'Spotify');
  const other=ad.replace('v1_stan_lee','v2');
  assert.equal(t.landing(md,other).data.utm_content,'v2');
  assert.ok(t.click(md,other,'Apple Music'));
});
test('30 minutes between tracked actions starts a new visit',()=>{
  const f=fixture(), t=f.make(); t.landing(md,ad); t.click(md,ad,'Spotify');
  f.advance(VISIT_TIMEOUT); assert.ok(t.landing(md,ad)); assert.ok(t.click(md,ad,'Spotify'));
});
test('channel navigation stays separate from streaming; plain social links are never passed to the tracker',()=>{
  const t=fixture().make(); t.landing(grace,ad);
  assert.equal(t.click(grace,ad,'YouTube',true).name,'MusicChannelClick');
  assert.equal(t.click(grace,ad,'YouTube Music').name,'StreamingLinkClick');
});
test('blocked and malformed storage never prevents conversion handling',()=>{
  const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};
  const t=createReleaseTracker(blocked,()=>1,()=> 'id');
  assert.ok(t.landing(md,ad)); assert.equal(t.landing(md,ad),null); assert.ok(t.click(md,ad,'Spotify'));
  const f=fixture(); f.map.set(STORAGE_KEY,'{"version":2,"lastActivity":1,"attribution":{},"seen":[],"startedAt":"bad"}');
  assert.ok(f.make().landing(md,ad));
});
test('attribution is bounded and allowlisted; raw click IDs and unrelated query values are not copied',()=>{
  const data=attributionFrom(ad+'&email=secret@example.com');
  assert.equal(data.fbclid,undefined); assert.equal(data.email,undefined);
  assert.equal(attributionFrom('?utm_content='+ 'a'.repeat(500)).utm_content.length,200);
  assert.equal(isMetaAd(ad),true); assert.equal(isMetaAd('?utm_source=google&utm_medium=cpc'),false);
  assert.equal(isMetaAd('?fbclid=example'),true);
});
test('unsupported pages produce no funnel event',()=>assert.equal(fixture().make().landing('/',ad),null));
test('existing Meta conversion name and event ID are preserved; a failed analytics destination cannot block Meta',()=>{
  const t=fixture().make(), received=[]; const event=t.click(md,ad,'Amazon Music');
  dispatchReleaseEvent(event,()=>{throw Error('blocked');},(...args)=>received.push(args));
  assert.equal(received[0][0],'StreamingLinkClick'); assert.equal(received[0][2].eventID,event.id);
  const analytics=[]; dispatchReleaseEvent(event,(...args)=>analytics.push(args));
  assert.equal(analytics[0][0],'Hyperfollow Conversion');
  dispatchReleaseEvent(null,()=>assert.fail());
});
test('readable storage that rejects writes cannot overwrite in-memory conversion deduplication',()=>{
  const f=fixture(); f.make().landing(md,ad);
  const readOnly={getItem:k=>f.map.get(k)??null,setItem(){throw Error('quota exceeded');}};
  const t=createReleaseTracker(readOnly,()=>1000,()=> 'id');
  assert.ok(t.click(md,ad,'Amazon Music'));
  assert.equal(t.click(md,ad,'TIDAL'),null);
});
