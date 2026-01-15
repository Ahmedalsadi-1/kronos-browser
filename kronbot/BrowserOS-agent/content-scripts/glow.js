var glow=(function(){"use strict";(function(){try{var o=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{};o.SENTRY_RELEASE={id:"850560cdfb5607663c662c646ed9e0458a773f78"}}catch{}})();try{(function(){var o=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},s=new o.Error().stack;s&&(o._sentryDebugIds=o._sentryDebugIds||{},o._sentryDebugIds[s]="180eb513-e26c-47d7-8e44-0a238ad331cb",o._sentryDebugIdIdentifier="sentry-dbid-180eb513-e26c-47d7-8e44-0a238ad331cb")})()}catch{}function o(t){return t}const u=globalThis.browser?.runtime?.id?globalThis.browser:globalThis.chrome,p="browseros-glow-overlay",g="browseros-glow-styles",b=1,w=.6;function m(){if(document.getElementById(g))return;const t=b,e=document.createElement("style");e.id=g,e.textContent=`
    @keyframes browseros-glow-pulse {
      0% {
        box-shadow:
          inset 0 0 ${58*t}px ${26*t}px transparent,
          inset 0 0 ${50*t}px ${22*t}px rgba(251, 102, 24, 0.06),
          inset 0 0 ${42*t}px ${18*t}px rgba(251, 102, 24, 0.12),
          inset 0 0 ${34*t}px ${14*t}px rgba(251, 102, 24, 0.18);
      }
      50% {
        box-shadow:
          inset 0 0 ${72*t}px ${35*t}px transparent,
          inset 0 0 ${64*t}px ${32*t}px rgba(251, 102, 24, 0.10),
          inset 0 0 ${54*t}px ${26*t}px rgba(251, 102, 24, 0.18),
          inset 0 0 ${46*t}px ${22*t}px rgba(251, 102, 24, 0.24);
      }
      100% {
        box-shadow:
          inset 0 0 ${58*t}px ${26*t}px transparent,
          inset 0 0 ${50*t}px ${22*t}px rgba(251, 102, 24, 0.06),
          inset 0 0 ${42*t}px ${18*t}px rgba(251, 102, 24, 0.12),
          inset 0 0 ${34*t}px ${14*t}px rgba(251, 102, 24, 0.18);
      }
    }

    @keyframes browseros-glow-fade-in {
      from { opacity: 0; }
      to { opacity: ${w}; }
    }

    #${p} {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
      z-index: 2147483647 !important;
      opacity: 0;
      will-change: opacity;
      animation:
        browseros-glow-pulse 3s ease-in-out infinite,
        browseros-glow-fade-in 420ms cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
    }
  `;const n=()=>document.head.appendChild(e);document.head?n():document.addEventListener("DOMContentLoaded",n,{once:!0})}function v(){a(),m();const t=document.createElement("div");t.id=p;const e=()=>document.body.appendChild(t);document.body?e():document.addEventListener("DOMContentLoaded",e,{once:!0})}function a(){const t=document.getElementById(p);t&&t.remove()}const E={matches:["*://*/*"],runAt:"document_start",main(){let t=null;u.runtime.onMessage.addListener((e,n,i)=>{if(!(typeof e!="object"||!("conversationId"in e)||!("isActive"in e)))return e.isActive?(t=e.conversationId,v()):e.conversationId===t&&(t=null,a()),i({success:!0}),!0}),window.addEventListener("beforeunload",a),document.addEventListener("visibilitychange",()=>{document.hidden&&a()})}};function d(t,...e){}const y={debug:(...t)=>d(console.debug,...t),log:(...t)=>d(console.log,...t),warn:(...t)=>d(console.warn,...t),error:(...t)=>d(console.error,...t)};class h extends Event{constructor(e,n){super(h.EVENT_NAME,{}),this.newUrl=e,this.oldUrl=n}static EVENT_NAME=f("wxt:locationchange")}function f(t){return`${u?.runtime?.id}:glow:${t}`}function I(t){let e,n;return{run(){e==null&&(n=new URL(location.href),e=t.setInterval(()=>{let i=new URL(location.href);i.href!==n.href&&(window.dispatchEvent(new h(i,n)),n=i)},1e3))}}}class l{constructor(e,n){this.contentScriptName=e,this.options=n,this.abortController=new AbortController,this.isTopFrame?(this.listenForNewerScripts({ignoreFirstEvent:!0}),this.stopOldScripts()):this.listenForNewerScripts()}static SCRIPT_STARTED_MESSAGE_TYPE=f("wxt:content-script-started");isTopFrame=window.self===window.top;abortController;locationWatcher=I(this);receivedMessageIds=new Set;get signal(){return this.abortController.signal}abort(e){return this.abortController.abort(e)}get isInvalid(){return u.runtime.id==null&&this.notifyInvalidated(),this.signal.aborted}get isValid(){return!this.isInvalid}onInvalidated(e){return this.signal.addEventListener("abort",e),()=>this.signal.removeEventListener("abort",e)}block(){return new Promise(()=>{})}setInterval(e,n){const i=setInterval(()=>{this.isValid&&e()},n);return this.onInvalidated(()=>clearInterval(i)),i}setTimeout(e,n){const i=setTimeout(()=>{this.isValid&&e()},n);return this.onInvalidated(()=>clearTimeout(i)),i}requestAnimationFrame(e){const n=requestAnimationFrame((...i)=>{this.isValid&&e(...i)});return this.onInvalidated(()=>cancelAnimationFrame(n)),n}requestIdleCallback(e,n){const i=requestIdleCallback((...r)=>{this.signal.aborted||e(...r)},n);return this.onInvalidated(()=>cancelIdleCallback(i)),i}addEventListener(e,n,i,r){n==="wxt:locationchange"&&this.isValid&&this.locationWatcher.run(),e.addEventListener?.(n.startsWith("wxt:")?f(n):n,i,{...r,signal:this.signal})}notifyInvalidated(){this.abort("Content script context invalidated"),y.debug(`Content script "${this.contentScriptName}" context invalidated`)}stopOldScripts(){window.postMessage({type:l.SCRIPT_STARTED_MESSAGE_TYPE,contentScriptName:this.contentScriptName,messageId:Math.random().toString(36).slice(2)},"*")}verifyScriptStartedEvent(e){const n=e.data?.type===l.SCRIPT_STARTED_MESSAGE_TYPE,i=e.data?.contentScriptName===this.contentScriptName,r=!this.receivedMessageIds.has(e.data?.messageId);return n&&i&&r}listenForNewerScripts(e){let n=!0;const i=r=>{if(this.verifyScriptStartedEvent(r)){this.receivedMessageIds.add(r.data.messageId);const x=n;if(n=!1,x&&e?.ignoreFirstEvent)return;this.notifyInvalidated()}};addEventListener("message",i),this.onInvalidated(()=>removeEventListener("message",i))}}function $(){}function c(t,...e){}const S={debug:(...t)=>c(console.debug,...t),log:(...t)=>c(console.log,...t),warn:(...t)=>c(console.warn,...t),error:(...t)=>c(console.error,...t)};return(async()=>{try{const{main:t,...e}=E,n=new l("glow",e);return await t(n)}catch(t){throw S.error('The content script "glow" crashed on startup!',t),t}})()})();
glow;