import{_ as l,s as S,g as _,q as O,p as D,a as R,b as k,H as F,y as G,D as b,E as $,F as P,l as z,K as H}from"./mermaid.core-sgqsVXX5.js";import{p as V}from"./chunk-4BX2VUAB-DLFfeH2W.js";import{p as W}from"./treemap-KMMF4GRG-DJkVsCDN.js";import"./mermaid-NA5CF7SZ-DoFU6Vfk.js";import"./product_logo-CblUR3bH.js";import"./dayjs.min-RTqauz05.js";import"./isArray-u3hEW1hi.js";import"./min-CvwwOv8U.js";import"./_baseUniq-DkVygEMJ.js";import"./_arrayReduce-DA9huR5Z.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{};t.SENTRY_RELEASE={id:"850560cdfb5607663c662c646ed9e0458a773f78"}}catch{}})();try{(function(){var t=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},e=new t.Error().stack;e&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[e]="de3e544d-7e93-4eb9-a7cc-bd0e95fabf6e",t._sentryDebugIdIdentifier="sentry-dbid-de3e544d-7e93-4eb9-a7cc-bd0e95fabf6e")})()}catch{}var m={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},w={axes:[],curves:[],options:m},h=structuredClone(w),B=P.radar,j=l(()=>b({...B,...$().radar}),"getConfig"),C=l(()=>h.axes,"getAxes"),N=l(()=>h.curves,"getCurves"),Y=l(()=>h.options,"getOptions"),q=l(t=>{h.axes=t.map(e=>({name:e.name,label:e.label??e.name}))},"setAxes"),K=l(t=>{h.curves=t.map(e=>({name:e.name,label:e.label??e.name,entries:U(e.entries)}))},"setCurves"),U=l(t=>{if(t[0].axis==null)return t.map(a=>a.value);const e=C();if(e.length===0)throw new Error("Axes must be populated before curves for reference entries");return e.map(a=>{const r=t.find(n=>n.axis?.$refText===a.name);if(r===void 0)throw new Error("Missing entry for axis "+a.label);return r.value})},"computeCurveEntries"),X=l(t=>{const e=t.reduce((a,r)=>(a[r.name]=r,a),{});h.options={showLegend:e.showLegend?.value??m.showLegend,ticks:e.ticks?.value??m.ticks,max:e.max?.value??m.max,min:e.min?.value??m.min,graticule:e.graticule?.value??m.graticule}},"setOptions"),Z=l(()=>{G(),h=structuredClone(w)},"clear"),v={getAxes:C,getCurves:N,getOptions:Y,setAxes:q,setCurves:K,setOptions:X,getConfig:j,clear:Z,setAccTitle:k,getAccTitle:R,setDiagramTitle:D,getDiagramTitle:O,getAccDescription:_,setAccDescription:S},J=l(t=>{V(t,v);const{axes:e,curves:a,options:r}=t;v.setAxes(e),v.setCurves(a),v.setOptions(r)},"populate"),Q={parse:l(async t=>{const e=await W("radar",t);z.debug(e),J(e)},"parse")},ee=l((t,e,a,r)=>{const n=r.db,o=n.getAxes(),i=n.getCurves(),s=n.getOptions(),c=n.getConfig(),d=n.getDiagramTitle(),u=F(e),p=te(u,c),g=s.max??Math.max(...i.map(y=>Math.max(...y.entries))),x=s.min,f=Math.min(c.width,c.height)/2;ae(p,o,f,s.ticks,s.graticule),re(p,o,f,c),M(p,o,i,x,g,s.graticule,c),L(p,i,s.showLegend,c),p.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),te=l((t,e)=>{const a=e.width+e.marginLeft+e.marginRight,r=e.height+e.marginTop+e.marginBottom,n={x:e.marginLeft+e.width/2,y:e.marginTop+e.height/2};return t.attr("viewbox",`0 0 ${a} ${r}`).attr("width",a).attr("height",r),t.append("g").attr("transform",`translate(${n.x}, ${n.y})`)},"drawFrame"),ae=l((t,e,a,r,n)=>{if(n==="circle")for(let o=0;o<r;o++){const i=a*(o+1)/r;t.append("circle").attr("r",i).attr("class","radarGraticule")}else if(n==="polygon"){const o=e.length;for(let i=0;i<r;i++){const s=a*(i+1)/r,c=e.map((d,u)=>{const p=2*u*Math.PI/o-Math.PI/2,g=s*Math.cos(p),x=s*Math.sin(p);return`${g},${x}`}).join(" ");t.append("polygon").attr("points",c).attr("class","radarGraticule")}}},"drawGraticule"),re=l((t,e,a,r)=>{const n=e.length;for(let o=0;o<n;o++){const i=e[o].label,s=2*o*Math.PI/n-Math.PI/2;t.append("line").attr("x1",0).attr("y1",0).attr("x2",a*r.axisScaleFactor*Math.cos(s)).attr("y2",a*r.axisScaleFactor*Math.sin(s)).attr("class","radarAxisLine"),t.append("text").text(i).attr("x",a*r.axisLabelFactor*Math.cos(s)).attr("y",a*r.axisLabelFactor*Math.sin(s)).attr("class","radarAxisLabel")}},"drawAxes");function M(t,e,a,r,n,o,i){const s=e.length,c=Math.min(i.width,i.height)/2;a.forEach((d,u)=>{if(d.entries.length!==s)return;const p=d.entries.map((g,x)=>{const f=2*Math.PI*x/s-Math.PI/2,y=A(g,r,n,c),E=y*Math.cos(f),I=y*Math.sin(f);return{x:E,y:I}});o==="circle"?t.append("path").attr("d",T(p,i.curveTension)).attr("class",`radarCurve-${u}`):o==="polygon"&&t.append("polygon").attr("points",p.map(g=>`${g.x},${g.y}`).join(" ")).attr("class",`radarCurve-${u}`)})}l(M,"drawCurves");function A(t,e,a,r){const n=Math.min(Math.max(t,e),a);return r*(n-e)/(a-e)}l(A,"relativeRadius");function T(t,e){const a=t.length;let r=`M${t[0].x},${t[0].y}`;for(let n=0;n<a;n++){const o=t[(n-1+a)%a],i=t[n],s=t[(n+1)%a],c=t[(n+2)%a],d={x:i.x+(s.x-o.x)*e,y:i.y+(s.y-o.y)*e},u={x:s.x-(c.x-i.x)*e,y:s.y-(c.y-i.y)*e};r+=` C${d.x},${d.y} ${u.x},${u.y} ${s.x},${s.y}`}return`${r} Z`}l(T,"closedRoundCurve");function L(t,e,a,r){if(!a)return;const n=(r.width/2+r.marginRight)*3/4,o=-(r.height/2+r.marginTop)*3/4,i=20;e.forEach((s,c)=>{const d=t.append("g").attr("transform",`translate(${n}, ${o+c*i})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${c}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(s.label)})}l(L,"drawLegend");var ne={draw:ee},se=l((t,e)=>{let a="";for(let r=0;r<t.THEME_COLOR_LIMIT;r++){const n=t[`cScale${r}`];a+=`
		.radarCurve-${r} {
			color: ${n};
			fill: ${n};
			fill-opacity: ${e.curveOpacity};
			stroke: ${n};
			stroke-width: ${e.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${n};
			fill-opacity: ${e.curveOpacity};
			stroke: ${n};
		}
		`}return a},"genIndexStyles"),oe=l(t=>{const e=H(),a=$(),r=b(e,a.themeVariables),n=b(r.radar,t);return{themeVariables:r,radarOptions:n}},"buildRadarStyleOptions"),ie=l(({radar:t}={})=>{const{themeVariables:e,radarOptions:a}=oe(t);return`
	.radarTitle {
		font-size: ${e.fontSize};
		color: ${e.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${a.axisColor};
		stroke-width: ${a.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${a.axisLabelFontSize}px;
		color: ${a.axisColor};
	}
	.radarGraticule {
		fill: ${a.graticuleColor};
		fill-opacity: ${a.graticuleOpacity};
		stroke: ${a.graticuleColor};
		stroke-width: ${a.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${a.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${se(e,a)}
	`},"styles"),ve={parser:Q,db:v,renderer:ne,styles:ie};export{ve as diagram};
