import{a4 as v,a7 as M,aB as j,_ as u,g as q,s as H,a as Y,b as Z,q as J,p as K,l as _,c as Q,D as X,H as ee,N as te,e as ae,y as re,F as ne}from"./mermaid.core-BCQ92dzq.js";import{p as ie}from"./chunk-4BX2VUAB-_iJ3yiCc.js";import{p as oe}from"./treemap-KMMF4GRG-CIvzuKk0.js";import{d as L}from"./arc-CT6ZMbE-.js";import{o as se}from"./ordinal-D3QwGHSO.js";import"./mermaid-NA5CF7SZ-BLmXvdgo.js";import"./product_logo-D13hEBab.js";import"./dayjs.min-CusGE5tu.js";import"./isArray-wghjNQ3q.js";import"./min-CSs1IPe0.js";import"./_baseUniq-BFgKBuWc.js";import"./_arrayReduce-Dq31dRPX.js";import"./init-Bp56B_5a.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{};e.SENTRY_RELEASE={id:"cef3d2e981a8c76e9e817128ae6fc814ac1270e0"}}catch{}})();try{(function(){var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},a=new e.Error().stack;a&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[a]="a42ce772-88f2-4dd3-b80a-63b597c5d3dd",e._sentryDebugIdIdentifier="sentry-dbid-a42ce772-88f2-4dd3-b80a-63b597c5d3dd")})()}catch{}function le(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}function ce(e){return e}function de(){var e=ce,a=le,g=null,w=v(0),o=v(M),l=v(0);function s(t){var n,c=(t=j(t)).length,p,S,m=0,d=new Array(c),i=new Array(c),y=+w.apply(this,arguments),x=Math.min(M,Math.max(-M,o.apply(this,arguments)-y)),h,A=Math.min(Math.abs(x)/c,l.apply(this,arguments)),T=A*(x<0?-1:1),f;for(n=0;n<c;++n)(f=i[d[n]=n]=+e(t[n],n,t))>0&&(m+=f);for(a!=null?d.sort(function(D,b){return a(i[D],i[b])}):g!=null&&d.sort(function(D,b){return g(t[D],t[b])}),n=0,S=m?(x-c*T)/m:0;n<c;++n,y=h)p=d[n],f=i[p],h=y+(f>0?f*S:0)+T,i[p]={data:t[p],index:n,value:f,startAngle:y,endAngle:h,padAngle:A};return i}return s.value=function(t){return arguments.length?(e=typeof t=="function"?t:v(+t),s):e},s.sortValues=function(t){return arguments.length?(a=t,g=null,s):a},s.sort=function(t){return arguments.length?(g=t,a=null,s):g},s.startAngle=function(t){return arguments.length?(w=typeof t=="function"?t:v(+t),s):w},s.endAngle=function(t){return arguments.length?(o=typeof t=="function"?t:v(+t),s):o},s.padAngle=function(t){return arguments.length?(l=typeof t=="function"?t:v(+t),s):l},s}var ue=ne.pie,F={sections:new Map,showData:!1},C=F.sections,N=F.showData,pe=structuredClone(ue),fe=u(()=>structuredClone(pe),"getConfig"),ge=u(()=>{C=new Map,N=F.showData,re()},"clear"),he=u(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);C.has(e)||(C.set(e,a),_.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),me=u(()=>C,"getSections"),ye=u(e=>{N=e},"setShowData"),ve=u(()=>N,"getShowData"),O={getConfig:fe,clear:ge,setDiagramTitle:K,getDiagramTitle:J,setAccTitle:Z,getAccTitle:Y,setAccDescription:H,getAccDescription:q,addSection:he,getSections:me,setShowData:ye,getShowData:ve},we=u((e,a)=>{ie(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),Se={parse:u(async e=>{const a=await oe("pie",e);_.debug(a),we(a,O)},"parse")},xe=u(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),De=xe,be=u(e=>{const a=[...e.values()].reduce((o,l)=>o+l,0),g=[...e.entries()].map(([o,l])=>({label:o,value:l})).filter(o=>o.value/a*100>=1).sort((o,l)=>l.value-o.value);return de().value(o=>o.value)(g)},"createPieArcs"),Ae=u((e,a,g,w)=>{_.debug(`rendering pie chart
`+e);const o=w.db,l=Q(),s=X(o.getConfig(),l.pie),t=40,n=18,c=4,p=450,S=p,m=ee(a),d=m.append("g");d.attr("transform","translate("+S/2+","+p/2+")");const{themeVariables:i}=l;let[y]=te(i.pieOuterStrokeWidth);y??=2;const x=s.textPosition,h=Math.min(S,p)/2-t,A=L().innerRadius(0).outerRadius(h),T=L().innerRadius(h*x).outerRadius(h*x);d.append("circle").attr("cx",0).attr("cy",0).attr("r",h+y/2).attr("class","pieOuterCircle");const f=o.getSections(),D=be(f),b=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let $=0;f.forEach(r=>{$+=r});const z=D.filter(r=>(r.data.value/$*100).toFixed(0)!=="0"),E=se(b);d.selectAll("mySlices").data(z).enter().append("path").attr("d",A).attr("fill",r=>E(r.data.label)).attr("class","pieCircle"),d.selectAll("mySlices").data(z).enter().append("text").text(r=>(r.data.value/$*100).toFixed(0)+"%").attr("transform",r=>"translate("+T.centroid(r)+")").style("text-anchor","middle").attr("class","slice"),d.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const R=[...f.entries()].map(([r,I])=>({label:r,value:I})),k=d.selectAll(".legend").data(R).enter().append("g").attr("class","legend").attr("transform",(r,I)=>{const W=n+c,B=W*R.length/2,V=12*n,U=I*W-B;return"translate("+V+","+U+")"});k.append("rect").attr("width",n).attr("height",n).style("fill",r=>E(r.label)).style("stroke",r=>E(r.label)),k.append("text").attr("x",n+c).attr("y",n-c).text(r=>o.getShowData()?`${r.label} [${r.value}]`:r.label);const P=Math.max(...k.selectAll("text").nodes().map(r=>r?.getBoundingClientRect().width??0)),G=S+t+n+c+P;m.attr("viewBox",`0 0 ${G} ${p}`),ae(m,p,G,s.useMaxWidth)},"draw"),Te={draw:Ae},Le={parser:Se,db:O,renderer:Te,styles:De};export{Le as diagram};
