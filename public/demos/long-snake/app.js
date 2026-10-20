(()=>{var Wi={stand:{name:"\u4E00\u5B57\u5217\u9635",description:"\u86C7\u9996\u5728\u524D\u3001\u86C7\u8EAB\u5C45\u4E2D\u3001\u86C7\u5C3E\u6BBF\u540E\uFF0C\u67E5\u770B\u7EB5\u957F\u961F\u5F62\u3002"},march:{name:"\u6CBF\u7EBF\u884C\u519B",description:"\u5404\u6392\u4FDD\u6301\u95F4\u8DDD\u524D\u8FDB\uFF0C\u6B65\u5352\u8FC8\u6B65\uFF0C\u9A91\u5175\u7B56\u9A6C\uFF0C\u65D7\u624B\u968F\u961F\u79FB\u52A8\u3002"},turn:{name:"\u86C7\u884C\u8F6C\u5411",description:"\u86C7\u9996\u5FAA\u66F2\u7EBF\u5F15\u5BFC\uFF0C\u86C7\u8EAB\u4E0E\u86C7\u5C3E\u6CBF\u540C\u4E00\u8DEF\u5F84\u8DDF\u8FDB\u3002"},respond:{name:"\u9996\u5C3E\u7167\u5E94",description:"\u4ECE\u957F\u5217\u9010\u6E10\u5F2F\u6210\u5F27\u5F62\uFF0C\u9A91\u5175\u6CBF\u5F27\u7EBF\u8DDF\u8FDB\uFF0C\u6B65\u5175\u8F6C\u5411\u4E2D\u90E8\u76EE\u6807\u3002"}},Gr=(n,e,t)=>Math.max(e,Math.min(t,n)),Bd=(n,e,t)=>{let i=Gr((t-n)/(e-n),0,1);return i*i*(3-2*i)},ou=()=>({schema:"ruoyi-long-snake-v1",count:360,ranks:4,cavalryPercent:20,spacing:1.25,speed:1,bend:12,duration:24,mode:"march",guides:!0,labels:!0,dust:!0});function Wr(n){if(!n||typeof n!="object")throw new Error("\u914D\u7F6E\u5FC5\u987B\u662FJSON\u5BF9\u8C61");let e=n;if(e.schema!=="ruoyi-long-snake-v1")throw new Error("\u8BF7\u9009\u62E9\u672C\u519B\u9635\u9884\u6F14\u5BFC\u51FA\u7684\u914D\u7F6E");function t(r,s,o,a=!1){let c=e[r];if(typeof c!="number"||!Number.isFinite(c)||c<s||c>o||a&&!Number.isInteger(c))throw new Error(`\u914D\u7F6E\u9879 ${r} \u8D85\u51FA\u8303\u56F4`);return c}let i=t("ranks",1,6,!0);if(![1,2,3,4,6].includes(i))throw new Error("\u6392\u6570\u53EF\u90091\u30012\u30013\u30014\u30016");if(!Object.prototype.hasOwnProperty.call(Wi,String(e.mode)))throw new Error("\u672A\u77E5\u519B\u9635\u52A8\u4F5C");for(let r of["guides","labels","dust"])if(typeof e[r]!="boolean")throw new Error(`\u914D\u7F6E\u9879 ${r} \u5FC5\u987B\u4E3A\u5F00\u5173`);return{schema:"ruoyi-long-snake-v1",count:t("count",24,960,!0),ranks:i,cavalryPercent:e.cavalryPercent===void 0?0:t("cavalryPercent",0,50,!0),spacing:t("spacing",.95,2),speed:t("speed",0,2),bend:t("bend",0,24),duration:t("duration",6,30),mode:e.mode,guides:e.guides,labels:e.labels,dust:e.dust}}function Dn(n){return Math.round(Math.ceil(n.count/n.ranks)*n.cavalryPercent/100)}function Ld(n){return Math.max(n.spacing*1.08,Dn(n)?1.45:0)}function Fd(n,e){let t=Math.min(e,Dn(n));return t*3.5+(e-t)*n.spacing}function au(n){return Fd(n,Math.max(1,Math.ceil(n.count/n.ranks)-1))}function ma(n,e){let t=Math.floor(e/n.ranks)/Math.max(1,Math.ceil(n.count/n.ranks)-1);return t<.2?"head":t<.8?"body":"tail"}function qr(n,e){let t=Math.floor(e/n.ranks),i=e%n.ranks,r=Dn(n);if(t<r)return"cavalry";if(t%12===2&&i===Math.floor(n.ranks/2))return"flag";let s=(t-r)/Math.max(1,Math.ceil(n.count/n.ranks)-r-1);return s<.2?"shield":s<.8?"spear":"bow"}function cu(n,e){let t=au(n),i=256,r=t*.6+n.duration*n.speed+10,s=new Float64Array(i+1),o=new Float64Array(i+1),a=new Float64Array(i+1),c=(n.ranks-1)*Ld(n),l=Dn(n)?18:6,u=Math.max(12,t*.24,Math.sqrt(n.bend*(c+l))),f=n.mode==="respond"?Bd(2,n.duration*.65,e*n.speed):0,h=Math.max(t/4.3,c+(Dn(n)?18:8)),d=f/h;for(let m=0;m<=i;m++){let y=(m/i*2-1)*r;s[m]=d>0?Math.sin(y*d)/d:y,o[m]=n.mode==="turn"?n.bend*Math.sin(y/u):d>0?2*Math.sin(y*d/2)**2/d:0,m&&(a[m]=a[m-1]+Math.hypot(s[m]-s[m-1],o[m]-o[m-1]))}return{xs:s,zs:o,arcs:a,origin:a[i/2],length:t,response:f,radius:h}}function Xr(n,e,t,i,r){let s=Math.floor(t/n.ranks),o=t%n.ranks,a=n.mode==="march"||n.mode==="turn",c=a?(i-n.duration/2)*n.speed*.8:0,l=Gr(e.origin+e.length/2-Fd(n,s)+c,1e-4,e.arcs[e.arcs.length-1]-1e-4),u=0,f=e.arcs.length-1;for(;f-u>1;){let v=u+f>>1;e.arcs[v]<l?u=v:f=v}let h=(l-e.arcs[u])/(e.arcs[f]-e.arcs[u]),d=e.xs[f]-e.xs[u],m=e.zs[f]-e.zs[u],y=Math.hypot(d,m),g=(o-(n.ranks-1)/2)*Ld(n);r[0]=e.xs[u]+d*h-m/y*g,r[1]=e.zs[u]+m*h+d/y*g;let p=Math.atan2(d,m),w=Math.atan2(-r[0],e.radius*.7-r[1]),C=Math.atan2(Math.sin(w-p),Math.cos(w-p));r[2]=p+(qr(n,t)==="cavalry"?0:C*Bd(.15,.95,e.response)),r[3]=i*n.speed*5.3+s*.34+o*.8,r[4]=n.speed>0&&(a||n.mode==="respond"&&e.response>0&&e.response<1)?1:0,r[5]=ma(n,t)==="head"?0:ma(n,t)==="body"?1:2}function Dd(n){let e={shield:0,spear:0,bow:0,flag:0,cavalry:0};for(let t=0;t<n.count;t++)e[qr(n,t)]++;return e}var Bc="186",nr={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ir={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bf=0,Wu=1,vf=2;var Tr=1,wf=2,Ps=3,rr=0,yn=1,kn=2,mi=0,Bs=1,qu=2,Xu=3,Yu=4,Af=5;var Cr=100,Sf=101,Mf=102,Ef=103,Tf=104,Cf=200,Rf=201,If=202,Pf=203,Zu=204,$u=205,Bf=206,Lf=207,Ff=208,Df=209,Uf=210,Of=211,Nf=212,kf=213,zf=214,qa=0,Xa=1,Ya=2,ds=3,Za=4,$a=5,ja=6,Ja=7,ju=0,Vf=1,Hf=2,ii=0,Ju=1,Ku=2,Qu=3,Wo=4,eh=5,th=6,nh=7;var ih=300,sr=301,Rr=302,Lc=303,Fc=304,qo=306,fs=1e3,di=1001,Ka=1002,tn=1003,Gf=1004;var Xo=1005;var rn=1006,Dc=1007;var or=1008;var An=1009,rh=1010,sh=1011,Ls=1012,Uc=1013,ri=1014,zn=1015,si=1016,Oc=1017,Nc=1018,Fs=1020,oh=35902,ah=35899,ch=1021,lh=1022,Vn=1023,fi=1026,ar=1027,kc=1028,zc=1029,cr=1030,Vc=1031;var Hc=1033,Yo=33776,Zo=33777,$o=33778,jo=33779,Gc=35840,Wc=35841,qc=35842,Xc=35843,Yc=36196,Zc=37492,$c=37496,jc=37488,Jc=37489,Jo=37490,Kc=37491,Qc=37808,el=37809,tl=37810,nl=37811,il=37812,rl=37813,sl=37814,ol=37815,al=37816,cl=37817,ll=37818,ul=37819,hl=37820,dl=37821,fl=36492,pl=36494,ml=36495,gl=36283,_l=36284,Ko=36285,yl=36286;var go=2300,Qa=2301,Ga=2302,Du=2303,Uu=2400,Ou=2401,Nu=2402;var Wf=3200;var xl=0,qf=1,Di="",Qt="srgb",_o="srgb-linear",yo="linear",bt="srgb";var Wa=7680;var Xf=519,Yf=512,Zf=513,$f=514,bl=515,jf=516,Jf=517,vl=518,Kf=519,uh=35044,Ds=35048;var hh="300 es",Qn=2e3,ps=2001;function Bg(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Lg(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function xo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Qf(){let n=xo("canvas");return n.style.display="block",n}var Ud={},ms=null;function bo(...n){let e="THREE."+n.shift();ms?ms("log",e,...n):console.log(e,...n)}function ep(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function He(...n){n=ep(n);let e="THREE."+n.shift();if(ms)ms("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ge(...n){n=ep(n);let e="THREE."+n.shift();if(ms)ms("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function vr(...n){let e=n.join(" ");e in Ud||(Ud[e]=!0,He(...n))}function tp(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var np={[qa]:Xa,[Ya]:ja,[Za]:Ja,[ds]:$a,[Xa]:qa,[ja]:Ya,[Ja]:Za,[$a]:ds},ei=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Od=1234567,ho=Math.PI/180,gs=180/Math.PI;function Bi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]).toLowerCase()}function et(n,e,t){return Math.max(e,Math.min(t,n))}function dh(n,e){return(n%e+e)%e}function Fg(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Dg(n,e,t){return n!==e?(t-n)/(e-n):0}function fo(n,e,t){return(1-t)*n+t*e}function Ug(n,e,t,i){return fo(n,e,1-Math.exp(-t*i))}function Og(n,e=1){return e-Math.abs(dh(n,e*2)-e)}function Ng(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function kg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function zg(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Vg(n,e){return n+Math.random()*(e-n)}function Hg(n){return n*(.5-Math.random())}function Gg(n){n!==void 0&&(Od=n);let e=Od+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Wg(n){return n*ho}function qg(n){return n*gs}function Xg(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function Yg(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Zg(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function $g(n,e,t,i,r){let s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+i)/2),u=o((e+i)/2),f=s((e-i)/2),h=o((e-i)/2),d=s((i-e)/2),m=o((i-e)/2);switch(r){case"XYX":n.set(a*u,c*f,c*h,a*l);break;case"YZY":n.set(c*h,a*u,c*f,a*l);break;case"ZXZ":n.set(c*f,c*h,a*u,a*l);break;case"XZX":n.set(a*u,c*m,c*d,a*l);break;case"YXY":n.set(c*d,a*u,c*m,a*l);break;case"ZYZ":n.set(c*m,c*d,a*u,a*l);break;default:He("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Kn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function vt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Us={DEG2RAD:ho,RAD2DEG:gs,generateUUID:Bi,clamp:et,euclideanModulo:dh,mapLinear:Fg,inverseLerp:Dg,lerp:fo,damp:Ug,pingpong:Og,smoothstep:Ng,smootherstep:kg,randInt:zg,randFloat:Vg,randFloatSpread:Hg,seededRandom:Gg,degToRad:Wg,radToDeg:qg,isPowerOfTwo:Xg,ceilPowerOfTwo:Yg,floorPowerOfTwo:Zg,setQuaternionFromProperEuler:$g,normalize:vt,denormalize:Kn},ge=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},mn=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3],h=s[o+0],d=s[o+1],m=s[o+2],y=s[o+3];if(f!==y||c!==h||l!==d||u!==m){let g=c*h+l*d+u*m+f*y;g<0&&(h=-h,d=-d,m=-m,y=-y,g=-g);let p=1-a;if(g<.9995){let w=Math.acos(g),C=Math.sin(w);p=Math.sin(p*w)/C,a=Math.sin(a*w)/C,c=c*p+h*a,l=l*p+d*a,u=u*p+m*a,f=f*p+y*a}else{c=c*p+h*a,l=l*p+d*a,u=u*p+m*a,f=f*p+y*a;let w=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=w,l*=w,u*=w,f*=w}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=s[o],h=s[o+1],d=s[o+2],m=s[o+3];return e[t]=a*m+u*f+c*d-l*h,e[t+1]=c*m+u*h+l*f-a*d,e[t+2]=l*m+u*d+a*h-c*f,e[t+3]=u*m-a*f-c*h-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),f=a(s/2),h=c(i/2),d=c(r/2),m=c(s/2);switch(o){case"XYZ":this._x=h*u*f+l*d*m,this._y=l*d*f-h*u*m,this._z=l*u*m+h*d*f,this._w=l*u*f-h*d*m;break;case"YXZ":this._x=h*u*f+l*d*m,this._y=l*d*f-h*u*m,this._z=l*u*m-h*d*f,this._w=l*u*f+h*d*m;break;case"ZXY":this._x=h*u*f-l*d*m,this._y=l*d*f+h*u*m,this._z=l*u*m+h*d*f,this._w=l*u*f-h*d*m;break;case"ZYX":this._x=h*u*f-l*d*m,this._y=l*d*f+h*u*m,this._z=l*u*m-h*d*f,this._w=l*u*f+h*d*m;break;case"YZX":this._x=h*u*f+l*d*m,this._y=l*d*f+h*u*m,this._z=l*u*m-h*d*f,this._w=l*u*f-h*d*m;break;case"XZY":this._x=h*u*f-l*d*m,this._y=l*d*f-h*u*m,this._z=l*u*m+h*d*f,this._w=l*u*f+h*d*m;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],f=t[10],h=i+a+f;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-r)*d}else if(i>a&&i>f){let d=2*Math.sqrt(1+i-a-f);this._w=(u-c)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+l)/d}else if(a>f){let d=2*Math.sqrt(1+a-i-f);this._w=(s-l)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(c+u)/d}else{let d=2*Math.sqrt(1+f-i-a);this._w=(o-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+c*l+o*f-a*u,this.y=i+c*u+a*l-s*f,this.z=r+c*f+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return lu.copy(this).projectOnVector(e),this.sub(lu)}reflect(e){return this.sub(lu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},lu=new R,Nd=new mn,Ye=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,r,s,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],h=i[2],d=i[5],m=i[8],y=r[0],g=r[3],p=r[6],w=r[1],C=r[4],v=r[7],A=r[2],S=r[5],T=r[8];return s[0]=o*y+a*w+c*A,s[3]=o*g+a*C+c*S,s[6]=o*p+a*v+c*T,s[1]=l*y+u*w+f*A,s[4]=l*g+u*C+f*S,s[7]=l*p+u*v+f*T,s[2]=h*y+d*w+m*A,s[5]=h*g+d*C+m*S,s[8]=h*p+d*v+m*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=u*o-a*l,h=a*c-u*s,d=l*s-o*c,m=t*f+i*h+r*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=f*y,e[1]=(r*l-u*i)*y,e[2]=(a*i-r*o)*y,e[3]=h*y,e[4]=(u*t-r*c)*y,e[5]=(r*s-a*t)*y,e[6]=d*y,e[7]=(i*c-l*t)*y,e[8]=(o*t-i*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return vr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(uu.makeScale(e,t)),this}rotate(e){return vr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(uu.makeRotation(-e)),this}translate(e,t){return vr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(uu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},uu=new Ye,kd=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zd=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jg(){let n={enabled:!0,workingColorSpace:_o,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===bt&&(r.r=Li(r.r),r.g=Li(r.g),r.b=Li(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===bt&&(r.r=hs(r.r),r.g=hs(r.g),r.b=hs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Di?yo:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return vr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return vr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[_o]:{primaries:e,whitePoint:i,transfer:yo,toXYZ:kd,fromXYZ:zd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:e,whitePoint:i,transfer:bt,toXYZ:kd,fromXYZ:zd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}}),n}var ot=jg();function Li(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function hs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Yr,ec=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Yr===void 0&&(Yr=xo("canvas")),Yr.width=e.width,Yr.height=e.height;let r=Yr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Yr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=xo("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Li(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Li(t[i]/255)*255):t[i]=Li(t[i]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Jg=0,_s=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=Bi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(hu(r[o].image)):s.push(hu(r[o]))}else s=hu(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function hu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ec.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}var Kg=0,du=new R,gn=class n extends ei{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=di,r=di,s=rn,o=or,a=Vn,c=An,l=n.DEFAULT_ANISOTROPY,u=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kg++}),this.uuid=Bi(),this.name="",this.source=new _s(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(du).x}get height(){return this.source.getSize(du).y}get depth(){return this.source.getSize(du).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ih)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fs:e.x=e.x-Math.floor(e.x);break;case di:e.x=e.x<0?0:1;break;case Ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fs:e.y=e.y-Math.floor(e.y);break;case di:e.y=e.y<0?0:1;break;case Ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};gn.DEFAULT_IMAGE=null;gn.DEFAULT_MAPPING=ih;gn.DEFAULT_ANISOTROPY=1;var Lt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],m=c[9],y=c[2],g=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+y)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let C=(l+1)/2,v=(d+1)/2,A=(p+1)/2,S=(u+h)/4,T=(f+y)/4,x=(m+g)/4;return C>v&&C>A?C<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(C),r=S/i,s=T/i):v>A?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=S/r,s=x/r):A<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),i=T/s,r=x/s),this.set(i,r,s,t),this}let w=Math.sqrt((g-m)*(g-m)+(f-y)*(f-y)+(h-u)*(h-u));return Math.abs(w)<.001&&(w=1),this.x=(g-m)/w,this.y=(f-y)/w,this.z=(h-u)/w,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},tc=class extends ei{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Lt(0,0,e,t),this.scissorTest=!1,this.viewport=new Lt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new gn(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new _s(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},wn=class extends tc{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},vo=class extends gn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var nc=class extends gn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var nt=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,r,s,o,a,c,l,u,f,h,d,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,f,h,d,m,y,g)}set(e,t,i,r,s,o,a,c,l,u,f,h,d,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/Zr.setFromMatrixColumn(e,0).length(),s=1/Zr.setFromMatrixColumn(e,1).length(),o=1/Zr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){let h=o*u,d=o*f,m=a*u,y=a*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=d+m*l,t[5]=h-y*l,t[9]=-a*c,t[2]=y-h*l,t[6]=m+d*l,t[10]=o*c}else if(e.order==="YXZ"){let h=c*u,d=c*f,m=l*u,y=l*f;t[0]=h+y*a,t[4]=m*a-d,t[8]=o*l,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-m,t[6]=y+h*a,t[10]=o*c}else if(e.order==="ZXY"){let h=c*u,d=c*f,m=l*u,y=l*f;t[0]=h-y*a,t[4]=-o*f,t[8]=m+d*a,t[1]=d+m*a,t[5]=o*u,t[9]=y-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let h=o*u,d=o*f,m=a*u,y=a*f;t[0]=c*u,t[4]=m*l-d,t[8]=h*l+y,t[1]=c*f,t[5]=y*l+h,t[9]=d*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let h=o*c,d=o*l,m=a*c,y=a*l;t[0]=c*u,t[4]=y-h*f,t[8]=m*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*f+m,t[10]=h-y*f}else if(e.order==="XZY"){let h=o*c,d=o*l,m=a*c,y=a*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=h*f+y,t[5]=o*u,t[9]=d*f-m,t[2]=m*f-d,t[6]=a*u,t[10]=y*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qg,e,e0)}lookAt(e,t,i){let r=this.elements;return Cn.subVectors(e,t),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),qi.crossVectors(i,Cn),qi.lengthSq()===0&&(Math.abs(i.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),qi.crossVectors(i,Cn)),qi.normalize(),ga.crossVectors(Cn,qi),r[0]=qi.x,r[4]=ga.x,r[8]=Cn.x,r[1]=qi.y,r[5]=ga.y,r[9]=Cn.y,r[2]=qi.z,r[6]=ga.z,r[10]=Cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],h=i[9],d=i[13],m=i[2],y=i[6],g=i[10],p=i[14],w=i[3],C=i[7],v=i[11],A=i[15],S=r[0],T=r[4],x=r[8],M=r[12],I=r[1],D=r[5],O=r[9],k=r[13],B=r[2],P=r[6],W=r[10],Y=r[14],te=r[3],X=r[7],j=r[11],ie=r[15];return s[0]=o*S+a*I+c*B+l*te,s[4]=o*T+a*D+c*P+l*X,s[8]=o*x+a*O+c*W+l*j,s[12]=o*M+a*k+c*Y+l*ie,s[1]=u*S+f*I+h*B+d*te,s[5]=u*T+f*D+h*P+d*X,s[9]=u*x+f*O+h*W+d*j,s[13]=u*M+f*k+h*Y+d*ie,s[2]=m*S+y*I+g*B+p*te,s[6]=m*T+y*D+g*P+p*X,s[10]=m*x+y*O+g*W+p*j,s[14]=m*M+y*k+g*Y+p*ie,s[3]=w*S+C*I+v*B+A*te,s[7]=w*T+C*D+v*P+A*X,s[11]=w*x+C*O+v*W+A*j,s[15]=w*M+C*k+v*Y+A*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],f=e[6],h=e[10],d=e[14],m=e[3],y=e[7],g=e[11],p=e[15],w=c*d-l*h,C=a*d-l*f,v=a*h-c*f,A=o*d-l*u,S=o*h-c*u,T=o*f-a*u;return t*(y*w-g*C+p*v)-i*(m*w-g*A+p*S)+r*(m*C-y*A+p*T)-s*(m*v-y*S+g*T)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],o=e[5],a=e[9],c=e[2],l=e[6],u=e[10];return t*(o*u-a*l)-i*(s*u-a*c)+r*(s*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=e[9],h=e[10],d=e[11],m=e[12],y=e[13],g=e[14],p=e[15],w=t*a-i*o,C=t*c-r*o,v=t*l-s*o,A=i*c-r*a,S=i*l-s*a,T=r*l-s*c,x=u*y-f*m,M=u*g-h*m,I=u*p-d*m,D=f*g-h*y,O=f*p-d*y,k=h*p-d*g,B=w*k-C*O+v*D+A*I-S*M+T*x;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/B;return e[0]=(a*k-c*O+l*D)*P,e[1]=(r*O-i*k-s*D)*P,e[2]=(y*T-g*S+p*A)*P,e[3]=(h*S-f*T-d*A)*P,e[4]=(c*I-o*k-l*M)*P,e[5]=(t*k-r*I+s*M)*P,e[6]=(g*v-m*T-p*C)*P,e[7]=(u*T-h*v+d*C)*P,e[8]=(o*O-a*I+l*x)*P,e[9]=(i*I-t*O-s*x)*P,e[10]=(m*S-y*v+p*w)*P,e[11]=(f*v-u*S-d*w)*P,e[12]=(a*M-o*D-c*x)*P,e[13]=(t*D-i*M+r*x)*P,e[14]=(y*C-m*A-g*w)*P,e[15]=(u*A-f*C+h*w)*P,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,f=a+a,h=s*l,d=s*u,m=s*f,y=o*u,g=o*f,p=a*f,w=c*l,C=c*u,v=c*f,A=i.x,S=i.y,T=i.z;return r[0]=(1-(y+p))*A,r[1]=(d+v)*A,r[2]=(m-C)*A,r[3]=0,r[4]=(d-v)*S,r[5]=(1-(h+p))*S,r[6]=(g+w)*S,r[7]=0,r[8]=(m+C)*T,r[9]=(g-w)*T,r[10]=(1-(h+y))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let o=Zr.set(r[0],r[1],r[2]).length(),a=Zr.set(r[4],r[5],r[6]).length(),c=Zr.set(r[8],r[9],r[10]).length();s<0&&(o=-o),$n.copy(this);let l=1/o,u=1/a,f=1/c;return $n.elements[0]*=l,$n.elements[1]*=l,$n.elements[2]*=l,$n.elements[4]*=u,$n.elements[5]*=u,$n.elements[6]*=u,$n.elements[8]*=f,$n.elements[9]*=f,$n.elements[10]*=f,t.setFromRotationMatrix($n),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,r,s,o,a=Qn,c=!1){let l=this.elements,u=2*s/(t-e),f=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r),m,y;if(c)m=s/(o-s),y=o*s/(o-s);else if(a===Qn)m=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(a===ps)m=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Qn,c=!1){let l=this.elements,u=2/(t-e),f=2/(i-r),h=-(t+e)/(t-e),d=-(i+r)/(i-r),m,y;if(c)m=1/(o-s),y=o/(o-s);else if(a===Qn)m=-2/(o-s),y=-(o+s)/(o-s);else if(a===ps)m=-1/(o-s),y=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Zr=new R,$n=new nt,Qg=new R(0,0,0),e0=new R(1,1,1),qi=new R,ga=new R,Cn=new R,Vd=new nt,Hd=new mn,ti=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-et(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(et(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Vd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hd.setFromEuler(this),this.setFromQuaternion(Hd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ti.DEFAULT_ORDER="XYZ";var ys=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},t0=0,Gd=new R,$r=new mn,Mi=new nt,_a=new R,to=new R,n0=new R,i0=new mn,Wd=new R(1,0,0),qd=new R(0,1,0),Xd=new R(0,0,1),Yd={type:"added"},r0={type:"removed"},jr={type:"childadded",child:null},fu={type:"childremoved",child:null},Xt=class n extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:t0++}),this.uuid=Bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new R,t=new ti,i=new mn,r=new R(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new nt},normalMatrix:{value:new Ye}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ys,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $r.setFromAxisAngle(e,t),this.quaternion.multiply($r),this}rotateOnWorldAxis(e,t){return $r.setFromAxisAngle(e,t),this.quaternion.premultiply($r),this}rotateX(e){return this.rotateOnAxis(Wd,e)}rotateY(e){return this.rotateOnAxis(qd,e)}rotateZ(e){return this.rotateOnAxis(Xd,e)}translateOnAxis(e,t){return Gd.copy(e).applyQuaternion(this.quaternion),this.position.add(Gd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wd,e)}translateY(e){return this.translateOnAxis(qd,e)}translateZ(e){return this.translateOnAxis(Xd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?_a.copy(e):_a.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),to.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mi.lookAt(to,_a,this.up):Mi.lookAt(_a,to,this.up),this.quaternion.setFromRotationMatrix(Mi),r&&(Mi.extractRotation(r.matrixWorld),$r.setFromRotationMatrix(Mi),this.quaternion.premultiply($r.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ge("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yd),jr.child=e,this.dispatchEvent(jr),jr.child=null):Ge("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(r0),fu.child=e,this.dispatchEvent(fu),fu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yd),jr.child=e,this.dispatchEvent(jr),jr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,e,n0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,i0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),m=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Xt.DEFAULT_UP=new R(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Pi=class extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}},s0={type:"move"},xs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,i),p=this._getHandJoint(l,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,m=.005;l.inputState.pinching&&h>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(s0)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Pi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},ip={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},ya={h:0,s:0,l:0};function pu(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var We=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=ot.workingColorSpace){return this.r=e,this.g=t,this.b=i,ot.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=ot.workingColorSpace){if(e=dh(e,1),t=et(t,0,1),i=et(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=pu(o,s,e+1/3),this.g=pu(o,s,e),this.b=pu(o,s,e-1/3)}return ot.colorSpaceToWorking(this,r),this}setStyle(e,t=Qt){function i(s){s!==void 0&&parseFloat(s)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){let i=ip[e.toLowerCase()];return i!==void 0?this.setHex(i,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}copyLinearToSRGB(e){return this.r=hs(e.r),this.g=hs(e.g),this.b=hs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return ot.workingToColorSpace(cn.copy(this),e),Math.round(et(cn.r*255,0,255))*65536+Math.round(et(cn.g*255,0,255))*256+Math.round(et(cn.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(cn.copy(this),t);let i=cn.r,r=cn.g,s=cn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=Qt){ot.workingToColorSpace(cn.copy(this),e);let t=cn.r,i=cn.g,r=cn.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Xi),this.setHSL(Xi.h+e,Xi.s+t,Xi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Xi),e.getHSL(ya);let i=fo(Xi.h,ya.h,t),r=fo(Xi.s,ya.s,t),s=fo(Xi.l,ya.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},cn=new We;We.NAMES=ip;var bs=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new We(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},wo=class extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ti,this.environmentIntensity=1,this.environmentRotation=new ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},jn=new R,Ei=new R,mu=new R,Ti=new R,Jr=new R,Kr=new R,Zd=new R,gu=new R,_u=new R,yu=new R,xu=new Lt,bu=new Lt,vu=new Lt,Ii=class n{constructor(e=new R,t=new R,i=new R){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),jn.subVectors(e,t),r.cross(jn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){jn.subVectors(r,t),Ei.subVectors(i,t),mu.subVectors(e,t);let o=jn.dot(jn),a=jn.dot(Ei),c=jn.dot(mu),l=Ei.dot(Ei),u=Ei.dot(mu),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;let h=1/f,d=(l*c-a*u)*h,m=(o*u-a*c)*h;return s.set(1-d-m,m,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,Ti)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ti.x),c.addScaledVector(o,Ti.y),c.addScaledVector(a,Ti.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return xu.setScalar(0),bu.setScalar(0),vu.setScalar(0),xu.fromBufferAttribute(e,t),bu.fromBufferAttribute(e,i),vu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(xu,s.x),o.addScaledVector(bu,s.y),o.addScaledVector(vu,s.z),o}static isFrontFacing(e,t,i,r){return jn.subVectors(i,t),Ei.subVectors(e,t),jn.cross(Ei).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),jn.cross(Ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;Jr.subVectors(r,i),Kr.subVectors(s,i),gu.subVectors(e,i);let c=Jr.dot(gu),l=Kr.dot(gu);if(c<=0&&l<=0)return t.copy(i);_u.subVectors(e,r);let u=Jr.dot(_u),f=Kr.dot(_u);if(u>=0&&f<=u)return t.copy(r);let h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(Jr,o);yu.subVectors(e,s);let d=Jr.dot(yu),m=Kr.dot(yu);if(m>=0&&d<=m)return t.copy(s);let y=d*l-c*m;if(y<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(i).addScaledVector(Kr,a);let g=u*m-d*f;if(g<=0&&f-u>=0&&d-m>=0)return Zd.subVectors(s,r),a=(f-u)/(f-u+(d-m)),t.copy(r).addScaledVector(Zd,a);let p=1/(g+y+h);return o=y*p,a=h*p,t.copy(i).addScaledVector(Jr,o).addScaledVector(Kr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},pi=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Jn):Jn.fromBufferAttribute(s,o),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),xa.copy(i.boundingBox)),xa.applyMatrix4(e.matrixWorld),this.union(xa)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(no),ba.subVectors(this.max,no),Qr.subVectors(e.a,no),es.subVectors(e.b,no),ts.subVectors(e.c,no),Yi.subVectors(es,Qr),Zi.subVectors(ts,es),_r.subVectors(Qr,ts);let t=[0,-Yi.z,Yi.y,0,-Zi.z,Zi.y,0,-_r.z,_r.y,Yi.z,0,-Yi.x,Zi.z,0,-Zi.x,_r.z,0,-_r.x,-Yi.y,Yi.x,0,-Zi.y,Zi.x,0,-_r.y,_r.x,0];return!wu(t,Qr,es,ts,ba)||(t=[1,0,0,0,1,0,0,0,1],!wu(t,Qr,es,ts,ba))?!1:(va.crossVectors(Yi,Zi),t=[va.x,va.y,va.z],wu(t,Qr,es,ts,ba))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ci=[new R,new R,new R,new R,new R,new R,new R,new R],Jn=new R,xa=new pi,Qr=new R,es=new R,ts=new R,Yi=new R,Zi=new R,_r=new R,no=new R,ba=new R,va=new R,yr=new R;function wu(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){yr.fromArray(n,s);let a=r.x*Math.abs(yr.x)+r.y*Math.abs(yr.y)+r.z*Math.abs(yr.z),c=e.dot(yr),l=t.dot(yr),u=i.dot(yr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Wt=new R,wa=new ge,o0=0,en=class extends ei{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:o0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=uh,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)wa.fromBufferAttribute(this,t),wa.applyMatrix3(e),this.setXY(t,wa.x,wa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix3(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Kn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=vt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),r=vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),r=vt(r,this.array),s=vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ao=class extends en{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var So=class extends en{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var yt=class extends en{constructor(e,t,i){super(new Float32Array(e),t,i)}},a0=new pi,io=new R,Au=new R,On=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):a0.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;io.subVectors(e,this.center);let t=io.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(io,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Au.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(io.copy(e.center).add(Au)),this.expandByPoint(io.copy(e.center).sub(Au))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},c0=0,Un=new nt,Su=new Xt,ns=new R,Rn=new pi,ro=new pi,Kt=new R,Ot=class n extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:c0++}),this.uuid=Bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bg(e)?So:Ao)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Ye().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Un.makeRotationFromQuaternion(e),this.applyMatrix4(Un),this}rotateX(e){return Un.makeRotationX(e),this.applyMatrix4(Un),this}rotateY(e){return Un.makeRotationY(e),this.applyMatrix4(Un),this}rotateZ(e){return Un.makeRotationZ(e),this.applyMatrix4(Un),this}translate(e,t,i){return Un.makeTranslation(e,t,i),this.applyMatrix4(Un),this}scale(e,t,i){return Un.makeScale(e,t,i),this.applyMatrix4(Un),this}lookAt(e){return Su.lookAt(e),Su.updateMatrix(),this.applyMatrix4(Su.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new yt(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ge("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Rn.setFromBufferAttribute(s),this.morphTargetsRelative?(Kt.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(Kt),Kt.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(Kt)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ge('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new On);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ge("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let i=this.boundingSphere.center;if(Rn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];ro.setFromBufferAttribute(a),this.morphTargetsRelative?(Kt.addVectors(Rn.min,ro.min),Rn.expandByPoint(Kt),Kt.addVectors(Rn.max,ro.max),Rn.expandByPoint(Kt)):(Rn.expandByPoint(ro.min),Rn.expandByPoint(ro.max))}Rn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Kt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Kt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Kt.fromBufferAttribute(a,l),c&&(ns.fromBufferAttribute(e,l),Kt.add(ns)),r=Math.max(r,i.distanceToSquared(Kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ge('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ge("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new en(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let x=0;x<i.count;x++)a[x]=new R,c[x]=new R;let l=new R,u=new R,f=new R,h=new ge,d=new ge,m=new ge,y=new R,g=new R;function p(x,M,I){l.fromBufferAttribute(i,x),u.fromBufferAttribute(i,M),f.fromBufferAttribute(i,I),h.fromBufferAttribute(s,x),d.fromBufferAttribute(s,M),m.fromBufferAttribute(s,I),u.sub(l),f.sub(l),d.sub(h),m.sub(h);let D=1/(d.x*m.y-m.x*d.y);isFinite(D)&&(y.copy(u).multiplyScalar(m.y).addScaledVector(f,-d.y).multiplyScalar(D),g.copy(f).multiplyScalar(d.x).addScaledVector(u,-m.x).multiplyScalar(D),a[x].add(y),a[M].add(y),a[I].add(y),c[x].add(g),c[M].add(g),c[I].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let x=0,M=w.length;x<M;++x){let I=w[x],D=I.start,O=I.count;for(let k=D,B=D+O;k<B;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let C=new R,v=new R,A=new R,S=new R;function T(x){A.fromBufferAttribute(r,x),S.copy(A);let M=a[x];C.copy(M),C.sub(A.multiplyScalar(A.dot(M))).normalize(),v.crossVectors(S,M);let D=v.dot(c[x])<0?-1:1;o.setXYZW(x,C.x,C.y,C.z,D)}for(let x=0,M=w.length;x<M;++x){let I=w[x],D=I.start,O=I.count;for(let k=D,B=D+O;k<B;k+=3)T(e.getX(k+0)),T(e.getX(k+1)),T(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new en(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);let r=new R,s=new R,o=new R,a=new R,c=new R,l=new R,u=new R,f=new R;if(e)for(let h=0,d=e.count;h<d;h+=3){let m=e.getX(h+0),y=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,y),o.fromBufferAttribute(t,g),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,y),l.fromBufferAttribute(i,g),a.add(u),c.add(u),l.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(y,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Kt.fromBufferAttribute(e,t),Kt.normalize(),e.setXYZ(t,Kt.x,Kt.y,Kt.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u),d=0,m=0;for(let y=0,g=c.length;y<g;y++){a.isInterleavedBufferAttribute?d=c[y]*a.data.stride+a.offset:d=c[y]*u;for(let p=0;p<u;p++)h[m++]=l[d++]}return new en(h,u,f)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,f=l.length;u<f;u++){let h=l[u],d=e(h,i);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){let d=l[f];u.push(d.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],f=s[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ic=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=uh,this.updateRanges=[],this.version=0,this.uuid=Bi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},pn=new R,Mo=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)pn.fromBufferAttribute(this,t),pn.applyMatrix4(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)pn.fromBufferAttribute(this,t),pn.applyNormalMatrix(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)pn.fromBufferAttribute(this,t),pn.transformDirection(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Kn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=vt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Kn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Kn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Kn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Kn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),r=vt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),r=vt(r,this.array),s=vt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){bo("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new en(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){bo("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Mu=new R,l0=new R,u0=new Ye,In=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Mu.subVectors(i,t).cross(l0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(Mu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||u0.getNormalMatrix(e),r=this.coplanarPoint(Mu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},h0=0,ni=class extends ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:h0++}),this.uuid=Bi(),this.name="",this.type="Material",this.blending=Bs,this.side=rr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zu,this.blendDst=$u,this.blendEquation=Cr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wa,this.stencilZFail=Wa,this.stencilZPass=Wa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new We().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new In().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ge().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ge().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},vs=class extends ni{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},is,so=new R,rs=new R,ss=new R,os=new ge,oo=new ge,rp=new nt,Aa=new R,ao=new R,Sa=new R,$d=new ge,Eu=new ge,jd=new ge,Eo=class extends Xt{constructor(e=new vs){if(super(),this.isSprite=!0,this.type="Sprite",is===void 0){is=new Ot;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new ic(t,5);is.setIndex([0,1,2,0,2,3]),is.setAttribute("position",new Mo(i,3,0,!1)),is.setAttribute("uv",new Mo(i,2,3,!1))}this.geometry=is,this.material=e,this.center=new ge(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Ge('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),rs.setFromMatrixScale(this.matrixWorld),rp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ss.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&rs.multiplyScalar(-ss.z);let i=this.material.rotation,r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));let o=this.center;Ma(Aa.set(-.5,-.5,0),ss,o,rs,r,s),Ma(ao.set(.5,-.5,0),ss,o,rs,r,s),Ma(Sa.set(.5,.5,0),ss,o,rs,r,s),$d.set(0,0),Eu.set(1,0),jd.set(1,1);let a=e.ray.intersectTriangle(Aa,ao,Sa,!1,so);if(a===null&&(Ma(ao.set(-.5,.5,0),ss,o,rs,r,s),Eu.set(0,1),a=e.ray.intersectTriangle(Aa,Sa,ao,!1,so),a===null))return;let c=e.ray.origin.distanceTo(so);c<e.near||c>e.far||t.push({distance:c,point:so.clone(),uv:Ii.getInterpolation(so,Aa,ao,Sa,$d,Eu,jd,new ge),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Ma(n,e,t,i,r,s){os.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(oo.x=s*os.x-r*os.y,oo.y=r*os.x+s*os.y):oo.copy(os),n.copy(e),n.x+=oo.x,n.y+=oo.y,n.applyMatrix4(rp)}var Ri=new R,Tu=new R,Ea=new R,Ta=new R,Fi=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ri.copy(this.origin).addScaledVector(this.direction,t),Ri.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Tu.copy(e).add(t).multiplyScalar(.5),Ea.copy(t).sub(e).normalize(),Ta.copy(this.origin).sub(Tu);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Ea),a=Ta.dot(this.direction),c=-Ta.dot(Ea),l=Ta.lengthSq(),u=Math.abs(1-o*o),f,h,d,m;if(u>0)if(f=o*c-a,h=o*a-c,m=s*u,f>=0)if(h>=-m)if(h<=m){let y=1/u;f*=y,h*=y,d=f*(f+o*h+2*a)+h*(o*f+h+2*c)+l}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h<=-m?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l):h<=m?(f=0,h=Math.min(Math.max(-s,-c),s),d=h*(h+2*c)+l):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Tu).addScaledVector(Ea,h),d}intersectSphere(e,t){if(e.radius<0)return null;Ri.subVectors(e.center,this.origin);let i=Ri.dot(this.direction),r=Ri.dot(Ri)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Ri)!==null}intersectTriangle(e,t,i,r,s){let o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,f=e.x-o.x,h=e.y-o.y,d=e.z-o.z,m=t.x-o.x,y=t.y-o.y,g=t.z-o.z,p=i.x-o.x,w=i.y-o.y,C=i.z-o.z,v=Math.abs(c),A=Math.abs(l),S=Math.abs(u),T,x,M,I,D,O,k,B,P,W,Y,te;if(v>=A&&v>=S?(M=c,O=f,P=m,te=p,c>=0?(T=l,x=u,I=h,D=d,k=y,B=g,W=w,Y=C):(T=u,x=l,I=d,D=h,k=g,B=y,W=C,Y=w)):A>=S?(M=l,O=h,P=y,te=w,l>=0?(T=u,x=c,I=d,D=f,k=g,B=m,W=C,Y=p):(T=c,x=u,I=f,D=d,k=m,B=g,W=p,Y=C)):(M=u,O=d,P=g,te=C,u>=0?(T=c,x=l,I=f,D=h,k=m,B=y,W=p,Y=w):(T=l,x=c,I=h,D=f,k=y,B=m,W=w,Y=p)),M===0)return null;let X=T/M,j=x/M,ie=1/M,Te=I-X*O,Se=D-j*O,gt=k-X*P,Ze=B-j*P,at=W-X*te,z=Y-j*te,ee=at*Ze-z*gt,we=Te*z-Se*at,ze=gt*Se-Ze*Te;if(r){if(ee<0||we<0||ze<0)return null}else if((ee<0||we<0||ze<0)&&(ee>0||we>0||ze>0))return null;let ve=ee+we+ze;if(ve===0)return null;let Me=ie*(ee*O+we*P+ze*te);return(ve>0?Me<0:Me>0)?null:this.at(Me/ve,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},wr=class extends ni{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.combine=ju,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Jd=new nt,xr=new Fi,Ca=new On,Kd=new R,Ra=new R,Ia=new R,Pa=new R,Cu=new R,Ba=new R,Qd=new R,La=new R,qt=class extends Xt{constructor(e=new Ot,t=new wr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Ba.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],f=s[c];u!==0&&(Cu.fromBufferAttribute(f,e),o?Ba.addScaledVector(Cu,u):Ba.addScaledVector(Cu.sub(t),u))}t.add(Ba)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ca.copy(i.boundingSphere),Ca.applyMatrix4(s),xr.copy(e.ray).recast(e.near),!(Ca.containsPoint(xr.origin)===!1&&(xr.intersectSphere(Ca,Kd)===null||xr.origin.distanceToSquared(Kd)>(e.far-e.near)**2))&&(Jd.copy(s).invert(),xr.copy(e.ray).applyMatrix4(Jd),!(i.boundingBox!==null&&xr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,xr)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=h.length;m<y;m++){let g=h[m],p=o[g.materialIndex],w=Math.max(g.start,d.start),C=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=w,A=C;v<A;v+=3){let S=a.getX(v),T=a.getX(v+1),x=a.getX(v+2);r=Fa(this,p,e,i,l,u,f,S,T,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let g=m,p=y;g<p;g+=3){let w=a.getX(g),C=a.getX(g+1),v=a.getX(g+2);r=Fa(this,o,e,i,l,u,f,w,C,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,y=h.length;m<y;m++){let g=h[m],p=o[g.materialIndex],w=Math.max(g.start,d.start),C=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let v=w,A=C;v<A;v+=3){let S=v,T=v+1,x=v+2;r=Fa(this,p,e,i,l,u,f,S,T,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,d.start),y=Math.min(c.count,d.start+d.count);for(let g=m,p=y;g<p;g+=3){let w=g,C=g+1,v=g+2;r=Fa(this,o,e,i,l,u,f,w,C,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function d0(n,e,t,i,r,s,o,a){let c;if(e.side===yn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===rr,a),c===null)return null;La.copy(a),La.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(La);return l<t.near||l>t.far?null:{distance:l,point:La.clone(),object:n}}function Fa(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,Ra),n.getVertexPosition(c,Ia),n.getVertexPosition(l,Pa);let u=d0(n,e,t,i,Ra,Ia,Pa,Qd);if(u){let f=new R;Ii.getBarycoord(Qd,Ra,Ia,Pa,f),r&&(u.uv=Ii.getInterpolatedAttribute(r,a,c,l,f,new ge)),s&&(u.uv1=Ii.getInterpolatedAttribute(s,a,c,l,f,new ge)),o&&(u.normal=Ii.getInterpolatedAttribute(o,a,c,l,f,new R),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new R,materialIndex:0};Ii.getNormal(Ra,Ia,Pa,h.normal),u.face=h,u.barycoord=f}return u}var To=class extends gn{constructor(e=null,t=1,i=1,r,s,o,a,c,l=tn,u=tn,f,h){super(null,o,a,c,l,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Co=class extends en{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},as=new nt,ef=new nt,Da=[],tf=new pi,f0=new nt,co=new qt,lo=new On,Ro=class extends qt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Co(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,f0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new pi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,as),tf.copy(e.boundingBox).applyMatrix4(as),this.boundingBox.union(tf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new On),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,as),lo.copy(e.boundingSphere).applyMatrix4(as),this.boundingSphere.union(lo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(co.geometry=this.geometry,co.material=this.material,co.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),lo.copy(this.boundingSphere),lo.applyMatrix4(i),e.ray.intersectsSphere(lo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,as),ef.multiplyMatrices(i,as),co.matrixWorld=ef,co.raycast(e,Da);for(let o=0,a=Da.length;o<a;o++){let c=Da[o];c.instanceId=s,c.object=this,t.push(c)}Da.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Co(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new To(new Float32Array(r*this.count),r,this.count,kc,zn));let s=this.morphTexture.source.data.data,o=0;for(let l=0;l<i.length;l++)o+=i[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;return s[c]=a,s.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},br=new On,p0=new ge(.5,.5),Ua=new R,ws=class{constructor(e=new In,t=new In,i=new In,r=new In,s=new In,o=new In){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Qn,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],f=s[5],h=s[6],d=s[7],m=s[8],y=s[9],g=s[10],p=s[11],w=s[12],C=s[13],v=s[14],A=s[15];if(r[0].setComponents(l-o,d-u,p-m,A-w).normalize(),r[1].setComponents(l+o,d+u,p+m,A+w).normalize(),r[2].setComponents(l+a,d+f,p+y,A+C).normalize(),r[3].setComponents(l-a,d-f,p-y,A-C).normalize(),i)r[4].setComponents(c,h,g,v).normalize(),r[5].setComponents(l-c,d-h,p-g,A-v).normalize();else if(r[4].setComponents(l-c,d-h,p-g,A-v).normalize(),t===Qn)r[5].setComponents(l+c,d+h,p+g,A+v).normalize();else if(t===ps)r[5].setComponents(c,h,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),br.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),br.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(br)}intersectsSprite(e){br.center.set(0,0,0);let t=p0.distanceTo(e.center);return br.radius=.7071067811865476+t,br.applyMatrix4(e.matrixWorld),this.intersectsSphere(br)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Ua.x=r.normal.x>0?e.max.x:e.min.x,Ua.y=r.normal.y>0?e.max.y:e.min.y,Ua.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ua)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ar=class extends ni{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},rc=new R,sc=new R,nf=new nt,uo=new Fi,Oa=new On,Ru=new R,rf=new R,As=class extends Xt{constructor(e=new Ot,t=new Ar){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)rc.fromBufferAttribute(t,r-1),sc.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=rc.distanceTo(sc);e.setAttribute("lineDistance",new yt(i,1))}else He("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Oa.copy(i.boundingSphere),Oa.applyMatrix4(r),Oa.radius+=s,e.ray.intersectsSphere(Oa)===!1)return;nf.copy(r).invert(),uo.copy(e.ray).applyMatrix4(nf);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){let d=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let y=d,g=m-1;y<g;y+=l){let p=u.getX(y),w=u.getX(y+1),C=Na(this,e,uo,c,p,w,y);C&&t.push(C)}if(this.isLineLoop){let y=u.getX(m-1),g=u.getX(d),p=Na(this,e,uo,c,y,g,m-1);p&&t.push(p)}}else{let d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let y=d,g=m-1;y<g;y+=l){let p=Na(this,e,uo,c,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=Na(this,e,uo,c,m-1,d,m-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Na(n,e,t,i,r,s,o){let a=n.geometry.attributes.position;if(rc.fromBufferAttribute(a,r),sc.fromBufferAttribute(a,s),t.distanceSqToSegment(rc,sc,Ru,rf)>i)return;Ru.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(Ru);if(!(l<e.near||l>e.far))return{distance:l,point:rf.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var sf=new R,of=new R,oc=class extends As{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)sf.fromBufferAttribute(t,r),of.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+sf.distanceTo(of);e.setAttribute("lineDistance",new yt(i,1))}else He("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var ac=class extends ni{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},af=new nt,ku=new Fi,ka=new On,za=new R,Io=class extends Xt{constructor(e=new Ot,t=new ac){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ka.copy(i.boundingSphere),ka.applyMatrix4(r),ka.radius+=s,e.ray.intersectsSphere(ka)===!1)return;af.copy(r).invert(),ku.copy(e.ray).applyMatrix4(af);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,f=i.attributes.position;if(l!==null){let h=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let m=h,y=d;m<y;m++){let g=l.getX(m);za.fromBufferAttribute(f,g),cf(za,g,c,r,e,t,this)}}else{let h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let m=h,y=d;m<y;m++)za.fromBufferAttribute(f,m),cf(za,m,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function cf(n,e,t,i,r,s,o){let a=ku.distanceSqToPoint(n);if(a<t){let c=new R;ku.closestPointToPoint(n,c),c.applyMatrix4(i);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Po=class extends gn{constructor(e=[],t=sr,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Sr=class extends gn{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ji=class extends gn{constructor(e,t,i=ri,r,s,o,a=tn,c=tn,l,u=fi,f=1){if(u!==fi&&u!==ar)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:f};super(h,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _s(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},cc=class extends ji{constructor(e,t=ri,i=sr,r,s,o=tn,a=tn,c,l=fi){let u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Bo=class extends gn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ji=class n extends Ot{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],f=[],h=0,d=0;m("z","y","x",-1,-1,i,t,e,o,s,0),m("z","y","x",1,-1,i,t,-e,o,s,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new yt(l,3)),this.setAttribute("normal",new yt(u,3)),this.setAttribute("uv",new yt(f,2));function m(y,g,p,w,C,v,A,S,T,x,M){let I=v/T,D=A/x,O=v/2,k=A/2,B=S/2,P=T+1,W=x+1,Y=0,te=0,X=new R;for(let j=0;j<W;j++){let ie=j*D-k;for(let Te=0;Te<P;Te++){let Se=Te*I-O;X[y]=Se*w,X[g]=ie*C,X[p]=B,l.push(X.x,X.y,X.z),X[y]=0,X[g]=0,X[p]=S>0?1:-1,u.push(X.x,X.y,X.z),f.push(Te/T),f.push(1-j/x),Y+=1}}for(let j=0;j<x;j++)for(let ie=0;ie<T;ie++){let Te=h+ie+P*j,Se=h+ie+P*(j+1),gt=h+(ie+1)+P*(j+1),Ze=h+(ie+1)+P*j;c.push(Te,Se,Ze),c.push(Se,gt,Ze),te+=6}a.addGroup(d,te,M),d+=te,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Mr=class n extends Ot{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],f=[],h=[],d=[],m=0,y=[],g=i/2,p=0;w(),o===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new yt(f,3)),this.setAttribute("normal",new yt(h,3)),this.setAttribute("uv",new yt(d,2));function w(){let v=new R,A=new R,S=0,T=(t-e)/i;for(let x=0;x<=s;x++){let M=[],I=x/s,D=I*(t-e)+e;for(let O=0;O<=r;O++){let k=O/r,B=k*c+a,P=Math.sin(B),W=Math.cos(B);A.x=D*P,A.y=-I*i+g,A.z=D*W,f.push(A.x,A.y,A.z),v.set(P,T,W).normalize(),h.push(v.x,v.y,v.z),d.push(k,1-I),M.push(m++)}y.push(M)}for(let x=0;x<r;x++)for(let M=0;M<s;M++){let I=y[M][x],D=y[M+1][x],O=y[M+1][x+1],k=y[M][x+1];(e>0||M!==0)&&(u.push(I,D,k),S+=3),(t>0||M!==s-1)&&(u.push(D,O,k),S+=3)}l.addGroup(p,S,0),p+=S}function C(v){let A=m,S=new ge,T=new R,x=0,M=v===!0?e:t,I=v===!0?1:-1;for(let O=1;O<=r;O++)f.push(0,g*I,0),h.push(0,I,0),d.push(.5,.5),m++;let D=m;for(let O=0;O<=r;O++){let B=O/r*c+a,P=Math.cos(B),W=Math.sin(B);T.x=M*W,T.y=g*I,T.z=M*P,f.push(T.x,T.y,T.z),h.push(0,I,0),S.x=P*.5+.5,S.y=W*.5*I+.5,d.push(S.x,S.y),m++}for(let O=0;O<r;O++){let k=A+O,B=D+O;v===!0?u.push(B,B+1,k):u.push(B+1,B,k),x+=3}l.addGroup(p,x,v===!0?1:2),p+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ss=class n extends Mr{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Nn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){He("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,s=i.length,o;t?o=t:o=e*i[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=i[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===o)return r/(s-1);let u=i[r],h=i[r+1]-u,d=(o-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new ge:new R);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new R,r=[],s=[],o=[],a=new R,c=new nt;for(let d=0;d<=e;d++){let m=d/e;r[d]=this.getTangentAt(m,new R)}s[0]=new R,o[0]=new R;let l=Number.MAX_VALUE,u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=l&&(l=u,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),h<=l&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(et(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(a,m))}o[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(et(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(r[m],d*m)),o[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Lo=class extends Nn{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ge){let i=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=c-this.aX,d=l-this.aY;c=h*u-d*f+this.aX,l=h*f+d*u+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},lc=class extends Lo{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function fh(){let n=0,e=0,t=0,i=0;function r(s,o,a,c){n=s,e=a,t=-3*s+3*o-2*a-c,i=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,f){let h=(o-s)/l-(a-s)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+f)+(c-a)/f;h*=u,d*=u,r(o,a,h,d)},calc:function(s){let o=s*s,a=o*s;return n+e*s+t*o+i*a}}}var lf=new R,uf=new R,Iu=new fh,Pu=new fh,Bu=new fh,Er=class extends Nn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new R){let i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(uf.subVectors(r[0],r[1]).add(r[0]),l=uf);let f=r[a%s],h=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(lf.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=lf),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(f),d),y=Math.pow(f.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),Iu.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,m,y,g),Pu.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,m,y,g),Bu.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,m,y,g)}else this.curveType==="catmullrom"&&(Iu.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),Pu.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),Bu.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return i.set(Iu.calc(c),Pu.calc(c),Bu.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function hf(n,e,t,i,r){let s=(i-e)*.5,o=(r-t)*.5,a=n*n,c=n*a;return(2*t-2*i+s+o)*c+(-3*t+3*i-2*s-o)*a+s*n+t}function m0(n,e){let t=1-n;return t*t*e}function g0(n,e){return 2*(1-n)*n*e}function _0(n,e){return n*n*e}function po(n,e,t,i){return m0(n,e)+g0(n,t)+_0(n,i)}function y0(n,e){let t=1-n;return t*t*t*e}function x0(n,e){let t=1-n;return 3*t*t*n*e}function b0(n,e){return 3*(1-n)*n*n*e}function v0(n,e){return n*n*n*e}function mo(n,e,t,i,r){return y0(n,e)+x0(n,t)+b0(n,i)+v0(n,r)}var uc=class extends Nn{constructor(e=new ge,t=new ge,i=new ge,r=new ge){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new ge){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(mo(e,r.x,s.x,o.x,a.x),mo(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},hc=class extends Nn{constructor(e=new R,t=new R,i=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new R){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(mo(e,r.x,s.x,o.x,a.x),mo(e,r.y,s.y,o.y,a.y),mo(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},dc=class extends Nn{constructor(e=new ge,t=new ge){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ge){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ge){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fc=class extends Nn{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},pc=class extends Nn{constructor(e=new ge,t=new ge,i=new ge){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ge){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(po(e,r.x,s.x,o.x),po(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fo=class extends Nn{constructor(e=new R,t=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new R){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(po(e,r.x,s.x,o.x),po(e,r.y,s.y,o.y),po(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},mc=class extends Nn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ge){let i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return i.set(hf(a,c.x,l.x,u.x,f.x),hf(a,c.y,l.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new ge().fromArray(r))}return this}},w0=Object.freeze({__proto__:null,ArcCurve:lc,CatmullRomCurve3:Er,CubicBezierCurve:uc,CubicBezierCurve3:hc,EllipseCurve:Lo,LineCurve:dc,LineCurve3:fc,QuadraticBezierCurve:pc,QuadraticBezierCurve3:Fo,SplineCurve:mc});var Ki=class n extends Ot{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,f=e/a,h=t/c,d=[],m=[],y=[],g=[];for(let p=0;p<u;p++){let w=p*h-o;for(let C=0;C<l;C++){let v=C*f-s;m.push(v,-w,0),y.push(0,0,1),g.push(C/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let w=0;w<a;w++){let C=w+l*p,v=w+l*(p+1),A=w+1+l*(p+1),S=w+1+l*p;d.push(C,v,S),d.push(v,A,S)}this.setIndex(d),this.setAttribute("position",new yt(m,3)),this.setAttribute("normal",new yt(y,3)),this.setAttribute("uv",new yt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},Ms=class n extends Ot{constructor(e=.5,t=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);let a=[],c=[],l=[],u=[],f=e,h=(t-e)/r,d=new R,m=new ge;for(let y=0;y<=r;y++){for(let g=0;g<=i;g++){let p=s+g/i*o;d.x=f*Math.cos(p),d.y=f*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),m.x=(d.x/t+1)/2,m.y=(d.y/t+1)/2,u.push(m.x,m.y)}f+=h}for(let y=0;y<r;y++){let g=y*(i+1);for(let p=0;p<i;p++){let w=p+g,C=w,v=w+i+1,A=w+i+2,S=w+1;a.push(C,v,S),a.push(v,A,S)}}this.setIndex(a),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(l,3)),this.setAttribute("uv",new yt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Es=class n extends Ot{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,u=[],f=new R,h=new R,d=[],m=[],y=[],g=[];for(let p=0;p<=i;p++){let w=[],C=p/i,v=o+C*a,A=e*Math.cos(v),S=Math.sqrt(e*e-A*A),T=0;p===0&&o===0?T=.5/t:p===i&&c===Math.PI&&(T=-.5/t);for(let x=0;x<=t;x++){let M=x/t,I=r+M*s;f.x=-S*Math.cos(I),f.y=A,f.z=S*Math.sin(I),m.push(f.x,f.y,f.z),h.copy(f).normalize(),y.push(h.x,h.y,h.z),g.push(M+T,1-C),w.push(l++)}u.push(w)}for(let p=0;p<i;p++)for(let w=0;w<t;w++){let C=u[p][w+1],v=u[p][w],A=u[p+1][w],S=u[p+1][w+1];(p!==0||o>0)&&d.push(C,v,S),(p!==i-1||c<Math.PI)&&d.push(v,A,S)}this.setIndex(d),this.setAttribute("position",new yt(m,3)),this.setAttribute("normal",new yt(y,3)),this.setAttribute("uv",new yt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Do=class n extends Ot{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:o,thetaLength:a},i=Math.floor(i),r=Math.floor(r);let c=[],l=[],u=[],f=[],h=new R,d=new R,m=new R;for(let y=0;y<=i;y++){let g=o+y/i*a;for(let p=0;p<=r;p++){let w=p/r*s;d.x=(e+t*Math.cos(g))*Math.cos(w),d.y=(e+t*Math.cos(g))*Math.sin(w),d.z=t*Math.sin(g),l.push(d.x,d.y,d.z),h.x=e*Math.cos(w),h.y=e*Math.sin(w),m.subVectors(d,h).normalize(),u.push(m.x,m.y,m.z),f.push(p/r),f.push(y/i)}}for(let y=1;y<=i;y++)for(let g=1;g<=r;g++){let p=(r+1)*y+g-1,w=(r+1)*(y-1)+g-1,C=(r+1)*(y-1)+g,v=(r+1)*y+g;c.push(p,w,v),c.push(w,C,v)}this.setIndex(c),this.setAttribute("position",new yt(l,3)),this.setAttribute("normal",new yt(u,3)),this.setAttribute("uv",new yt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Ts=class n extends Ot{constructor(e=new Fo(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:r,closed:s};let o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new R,c=new R,l=new ge,u=new R,f=[],h=[],d=[],m=[];y(),this.setIndex(m),this.setAttribute("position",new yt(f,3)),this.setAttribute("normal",new yt(h,3)),this.setAttribute("uv",new yt(d,2));function y(){for(let C=0;C<t;C++)g(C);g(s===!1?t:0),w(),p()}function g(C){u=e.getPointAt(C/t,u);let v=o.normals[C],A=o.binormals[C];for(let S=0;S<=r;S++){let T=S/r*Math.PI*2,x=Math.sin(T),M=-Math.cos(T);c.x=M*v.x+x*A.x,c.y=M*v.y+x*A.y,c.z=M*v.z+x*A.z,c.normalize(),h.push(c.x,c.y,c.z),a.x=u.x+i*c.x,a.y=u.y+i*c.y,a.z=u.z+i*c.z,f.push(a.x,a.y,a.z)}}function p(){for(let C=1;C<=t;C++)for(let v=1;v<=r;v++){let A=(r+1)*(C-1)+(v-1),S=(r+1)*C+(v-1),T=(r+1)*C+v,x=(r+1)*(C-1)+v;m.push(A,S,x),m.push(S,T,x)}}function w(){for(let C=0;C<=t;C++)for(let v=0;v<=r;v++)l.x=C/t,l.y=v/r,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new n(new w0[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function Ir(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(df(r))r.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(df(r[0])){let s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function un(n){let e={};for(let t=0;t<n.length;t++){let i=Ir(n[t]);for(let r in i)e[r]=i[r]}return e}function df(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function A0(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ph(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}var sp={clone:Ir,merge:un},S0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,M0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_n=class extends ni{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=S0,this.fragmentShader=M0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ir(e.uniforms),this.uniformsGroups=A0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new We().setHex(r.value);break;case"v2":this.uniforms[i].value=new ge().fromArray(r.value);break;case"v3":this.uniforms[i].value=new R().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Lt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ye().fromArray(r.value);break;case"m4":this.uniforms[i].value=new nt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},gc=class extends _n{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Uo=class extends ni{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xl,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var _c=class extends ni{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},yc=class extends ni{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function cs(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Lu(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Qi=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break t}o=t.length;break n}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break t}o=i,i=0;break n}break e}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},xc=class extends Qi{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Uu,endingEnd:Uu}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ou:s=e,a=2*t-i;break;case Nu:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Ou:o=e,c=2*i-t;break;case Nu:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,m=(i-t)/(r-t),y=m*m,g=y*m,p=-h*g+2*h*y-h*m,w=(1+h)*g+(-1.5-2*h)*y+(-.5+h)*m+1,C=(-1-d)*g+(1.5+d)*y+.5*m,v=d*g-d*y;for(let A=0;A!==a;++A)s[A]=p*o[u+A]+w*o[l+A]+C*o[c+A]+v*o[f+A];return s}},bc=class extends Qi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),f=1-u;for(let h=0;h!==a;++h)s[h]=o[l+h]*f+o[c+h]*u;return s}},vc=class extends Qi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},wc=class extends Qi{interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.inTangents,f=this.outTangents;if(!u||!f){let m=(i-t)/(r-t),y=1-m;for(let g=0;g!==a;++g)s[g]=o[l+g]*y+o[c+g]*m;return s}let h=a*2,d=e-1;for(let m=0;m!==a;++m){let y=o[l+m],g=o[c+m],p=d*h+m*2,w=f[p],C=f[p+1],v=e*h+m*2,A=u[v],S=u[v+1],T=T0(i,t,w,A,r);s[m]=op(T,y,C,S,g)}return s}};function op(n,e,t,i,r){let s=1-n;return s*s*s*e+3*s*s*n*t+3*s*n*n*i+n*n*n*r}function E0(n,e,t,i,r){let s=1-n;return 3*s*s*(t-e)+6*s*n*(i-t)+3*n*n*(r-i)}function T0(n,e,t,i,r){let s=(n-e)/(r-e);for(let o=0;o<8;o++){let a=op(s,e,t,i,r)-n;if(Math.abs(a)<1e-10)break;let c=E0(s,e,t,i,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-a/c))}return s}var Pn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=cs(t,this.TimeBufferType),this.values=cs(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:cs(e.times,Array),values:cs(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),Lu(e.settings)&&(i.settings={inTangents:cs(e.settings.inTangents,Array),outTangents:cs(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new vc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new bc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new xc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new wc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case go:t=this.InterpolantFactoryMethodDiscrete;break;case Qa:t=this.InterpolantFactoryMethodLinear;break;case Ga:t=this.InterpolantFactoryMethodSmooth;break;case Du:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return He("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return go;case this.InterpolantFactoryMethodLinear:return Qa;case this.InterpolantFactoryMethodSmooth:return Ga;case this.InterpolantFactoryMethodBezier:return Du}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;Lu(this.settings)&&(ff(this.settings.inTangents,e),ff(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ge("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Ge("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){Ge("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Ge("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&Lg(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){Ge("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Ga,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let f=a*i,h=f-i,d=f+i;for(let m=0;m!==i;++m){let y=t[f+m];if(y!==t[h+m]||y!==t[d+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let f=a*i,h=o*i;for(let d=0;d!==i;++d)t[h+d]=t[f+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,Lu(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ff(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}Pn.prototype.ValueTypeName="";Pn.prototype.TimeBufferType=Float32Array;Pn.prototype.ValueBufferType=Float32Array;Pn.prototype.DefaultInterpolation=Qa;var er=class extends Pn{constructor(e,t,i){super(e,t,i)}};er.prototype.ValueTypeName="bool";er.prototype.ValueBufferType=Array;er.prototype.DefaultInterpolation=go;er.prototype.InterpolantFactoryMethodLinear=void 0;er.prototype.InterpolantFactoryMethodSmooth=void 0;var Ac=class extends Pn{constructor(e,t,i,r){super(e,t,i,r)}};Ac.prototype.ValueTypeName="color";var Sc=class extends Pn{constructor(e,t,i,r){super(e,t,i,r)}};Sc.prototype.ValueTypeName="number";var Mc=class extends Qi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)mn.slerpFlat(s,0,o,l-a,o,l,c);return s}},Oo=class extends Pn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Mc(this.times,this.values,this.getValueSize(),e)}};Oo.prototype.ValueTypeName="quaternion";Oo.prototype.InterpolantFactoryMethodSmooth=void 0;var tr=class extends Pn{constructor(e,t,i){super(e,t,i)}};tr.prototype.ValueTypeName="string";tr.prototype.ValueBufferType=Array;tr.prototype.DefaultInterpolation=go;tr.prototype.InterpolantFactoryMethodLinear=void 0;tr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ec=class extends Pn{constructor(e,t,i,r){super(e,t,i,r)}};Ec.prototype.ValueTypeName="vector";var Tc=class{constructor(e,t,i){let r=this,s=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){let f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){let d=l[f],m=l[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},ap=new Tc,Cc=class{constructor(e){this.manager=e!==void 0?e:ap,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Cc.DEFAULT_MATERIAL_NAME="__DEFAULT";var No=class extends Xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},ko=class extends No{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Fu=new nt,pf=new R,mf=new R,Rc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ws,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new Lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;pf.setFromMatrixPosition(e.matrixWorld),t.position.copy(pf),mf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(mf),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){Fu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Fu,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,o=r?r.z/s.x:1,a=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===ps||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(Fu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Va=new R,Ha=new mn,hi=new R,zo=class extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=Qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Va,Ha,hi),hi.x===1&&hi.y===1&&hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Va,Ha,hi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Va,Ha,hi),hi.x===1&&hi.y===1&&hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Va,Ha,hi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},$i=new R,gf=new ge,_f=new ge,ln=class extends zo{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=gs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ho*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gs*2*Math.atan(Math.tan(ho*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($i.x,$i.y).multiplyScalar(-e/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($i.x,$i.y).multiplyScalar(-e/$i.z)}getViewSize(e,t){return this.getViewBounds(e,gf,_f),t.subVectors(_f,gf)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ho*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Cs=class extends zo{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},zu=class extends Rc{constructor(){super(new Cs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Rs=class extends No{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.shadow=new zu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ls=-90,us=1,Ic=class extends Xt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ln(ls,us,e,t);r.layers=this.layers,this.add(r);let s=new ln(ls,us,e,t);s.layers=this.layers,this.add(s);let o=new ln(ls,us,e,t);o.layers=this.layers,this.add(o);let a=new ln(ls,us,e,t);a.layers=this.layers,this.add(a);let c=new ln(ls,us,e,t);c.layers=this.layers,this.add(c);let l=new ln(ls,us,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===Qn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ps)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},Pc=class extends ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var mh="\\[\\]\\.:\\/",C0=new RegExp("["+mh+"]","g"),gh="[^"+mh+"]",R0="[^"+mh.replace("\\.","")+"]",I0=/((?:WC+[\/:])*)/.source.replace("WC",gh),P0=/(WCOD+)?/.source.replace("WCOD",R0),B0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gh),L0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gh),F0=new RegExp("^"+I0+P0+B0+L0+"$"),D0=["material","materials","bones","map"],Vu=class{constructor(e,t,i){let r=i||Bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Bt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(C0,"")}static parseTrackName(e){let t=F0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);D0.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let c=i(a.children);if(c)return c}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){He("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Ge("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ge("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ge("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ge("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ge("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Ge("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Ge("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[r];if(o===void 0){let l=t.nodeName;Ge("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Ge("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ge("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Bt.Composite=Vu;Bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Bt.prototype.GetterByBindingType=[Bt.prototype._getValue_direct,Bt.prototype._getValue_array,Bt.prototype._getValue_arrayElement,Bt.prototype._getValue_toArray];Bt.prototype.SetterByBindingTypeAndVersioning=[[Bt.prototype._setValue_direct,Bt.prototype._setValue_direct_setNeedsUpdate,Bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_array,Bt.prototype._setValue_array_setNeedsUpdate,Bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_arrayElement,Bt.prototype._setValue_arrayElement_setNeedsUpdate,Bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_fromArray,Bt.prototype._setValue_fromArray_setNeedsUpdate,Bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var KA=new Float32Array(1);var yf=new nt,Vo=class{constructor(e,t,i=0,r=1/0){this.ray=new Fi(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new ys,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ge("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return yf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yf),this}intersectObject(e,t=!0,i=[]){return Hu(e,this,i,t),i.sort(xf),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Hu(e[r],this,i,t);return i.sort(xf),i}};function xf(n,e){return n.distance-e.distance}function Hu(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let o=0,a=s.length;o<a;o++)Hu(s[o],e,t,!0)}}var Is=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=et(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Gu=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};var Ho=class extends oc{constructor(e=10,t=10,i=4473924,r=8947848){i=new We(i),r=new We(r);let s=t/2,o=e/t,a=e/2,c=[],l=[];for(let h=0,d=0,m=-a;h<=t;h++,m+=o){c.push(-a,0,m,a,0,m),c.push(m,0,-a,m,0,a);let y=h===s?i:r;y.toArray(l,d),d+=3,y.toArray(l,d),d+=3,y.toArray(l,d),d+=3,y.toArray(l,d),d+=3}let u=new Ot;u.setAttribute("position",new yt(c,3)),u.setAttribute("color",new yt(l,3));let f=new Ar({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};var Go=class extends ei{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function _h(n,e,t,i){let r=U0(i);switch(t){case ch:return n*e;case kc:return n*e/r.components*r.byteLength;case zc:return n*e/r.components*r.byteLength;case cr:return n*e*2/r.components*r.byteLength;case Vc:return n*e*2/r.components*r.byteLength;case lh:return n*e*3/r.components*r.byteLength;case Vn:return n*e*4/r.components*r.byteLength;case Hc:return n*e*4/r.components*r.byteLength;case Yo:case Zo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $o:case jo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Wc:case Xc:return Math.max(n,16)*Math.max(e,8)/4;case Gc:case qc:return Math.max(n,8)*Math.max(e,8)/2;case Yc:case Zc:case jc:case Jc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $c:case Jo:case Kc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Qc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case el:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case tl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case nl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case il:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case rl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case sl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ol:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case al:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case cl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ll:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ul:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case hl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case dl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case fl:case pl:case ml:return Math.ceil(n/4)*Math.ceil(e/4)*16;case gl:case _l:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ko:case yl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function U0(n){switch(n){case An:case rh:return{byteLength:1,components:1};case Ls:case sh:case si:return{byteLength:2,components:1};case Oc:case Nc:return{byteLength:2,components:4};case ri:case Uc:case zn:return{byteLength:4,components:1};case oh:case ah:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bc}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bc);function Rp(){let n=null,e=!1,t=null,i=null;function r(s,o){i=n.requestAnimationFrame(r),t(s,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function O0(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,f=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){let u=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,u);else{f.sort((d,m)=>d.start-m.start);let h=0;for(let d=1;d<f.length;d++){let m=f[h],y=f[d];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++h,f[h]=y)}f.length=h+1;for(let d=0,m=f.length;d<m;d++){let y=f[d];n.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var N0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,k0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,z0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,V0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,H0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,G0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,W0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,q0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,X0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Y0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Z0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,j0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,J0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,K0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Q0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,e_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,t_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,n_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,i_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,r_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,s_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,o_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,a_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,c_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,l_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,u_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,d_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,f_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,p_="gl_FragColor = linearToOutputTexel( gl_FragColor );",m_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,g_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,__=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,y_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,x_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,b_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,v_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,w_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,A_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,S_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,M_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,E_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,T_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,C_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,R_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,I_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,P_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,B_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,L_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,F_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,D_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,U_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,O_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,N_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,k_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,z_=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,V_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,H_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,G_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,W_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,q_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,X_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Y_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Z_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,j_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,J_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,K_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Q_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ey=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ty=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ny=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,iy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ry=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ay=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ly=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,uy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,py=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,my=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_y=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,by=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,vy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ay=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Sy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,My=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ey=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ty=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ry=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Iy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Py=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,By=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ly=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Fy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Uy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Oy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ny=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ky=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,qy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Xy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Zy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$y=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ky=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ex=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ix=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,sx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ox=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ax=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ux=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,px=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_x=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tt={alphahash_fragment:N0,alphahash_pars_fragment:k0,alphamap_fragment:z0,alphamap_pars_fragment:V0,alphatest_fragment:H0,alphatest_pars_fragment:G0,aomap_fragment:W0,aomap_pars_fragment:q0,batching_pars_vertex:X0,batching_vertex:Y0,begin_vertex:Z0,beginnormal_vertex:$0,bsdfs:j0,iridescence_fragment:J0,bumpmap_pars_fragment:K0,clipping_planes_fragment:Q0,clipping_planes_pars_fragment:e_,clipping_planes_pars_vertex:t_,clipping_planes_vertex:n_,color_fragment:i_,color_pars_fragment:r_,color_pars_vertex:s_,color_vertex:o_,common:a_,cube_uv_reflection_fragment:c_,defaultnormal_vertex:l_,displacementmap_pars_vertex:u_,displacementmap_vertex:h_,emissivemap_fragment:d_,emissivemap_pars_fragment:f_,colorspace_fragment:p_,colorspace_pars_fragment:m_,envmap_fragment:g_,envmap_common_pars_fragment:__,envmap_pars_fragment:y_,envmap_pars_vertex:x_,envmap_physical_pars_fragment:I_,envmap_vertex:b_,fog_vertex:v_,fog_pars_vertex:w_,fog_fragment:A_,fog_pars_fragment:S_,gradientmap_pars_fragment:M_,lightmap_pars_fragment:E_,lights_lambert_fragment:T_,lights_lambert_pars_fragment:C_,lights_pars_begin:R_,lights_toon_fragment:P_,lights_toon_pars_fragment:B_,lights_phong_fragment:L_,lights_phong_pars_fragment:F_,lights_physical_fragment:D_,lights_physical_pars_fragment:U_,lights_fragment_begin:O_,lights_fragment_maps:N_,lights_fragment_end:k_,lightprobes_pars_fragment:z_,logdepthbuf_fragment:V_,logdepthbuf_pars_fragment:H_,logdepthbuf_pars_vertex:G_,logdepthbuf_vertex:W_,map_fragment:q_,map_pars_fragment:X_,map_particle_fragment:Y_,map_particle_pars_fragment:Z_,metalnessmap_fragment:$_,metalnessmap_pars_fragment:j_,morphinstance_vertex:J_,morphcolor_vertex:K_,morphnormal_vertex:Q_,morphtarget_pars_vertex:ey,morphtarget_vertex:ty,normal_fragment_begin:ny,normal_fragment_maps:iy,normal_pars_fragment:ry,normal_pars_vertex:sy,normal_vertex:oy,normalmap_pars_fragment:ay,clearcoat_normal_fragment_begin:cy,clearcoat_normal_fragment_maps:ly,clearcoat_pars_fragment:uy,iridescence_pars_fragment:hy,opaque_fragment:dy,packing:fy,premultiplied_alpha_fragment:py,project_vertex:my,dithering_fragment:gy,dithering_pars_fragment:_y,roughnessmap_fragment:yy,roughnessmap_pars_fragment:xy,shadowmap_pars_fragment:by,shadowmap_pars_vertex:vy,shadowmap_vertex:wy,shadowmask_pars_fragment:Ay,skinbase_vertex:Sy,skinning_pars_vertex:My,skinning_vertex:Ey,skinnormal_vertex:Ty,specularmap_fragment:Cy,specularmap_pars_fragment:Ry,tonemapping_fragment:Iy,tonemapping_pars_fragment:Py,transmission_fragment:By,transmission_pars_fragment:Ly,uv_pars_fragment:Fy,uv_pars_vertex:Dy,uv_vertex:Uy,worldpos_vertex:Oy,background_vert:Ny,background_frag:ky,backgroundCube_vert:zy,backgroundCube_frag:Vy,cube_vert:Hy,cube_frag:Gy,depth_vert:Wy,depth_frag:qy,distance_vert:Xy,distance_frag:Yy,equirect_vert:Zy,equirect_frag:$y,linedashed_vert:jy,linedashed_frag:Jy,meshbasic_vert:Ky,meshbasic_frag:Qy,meshlambert_vert:ex,meshlambert_frag:tx,meshmatcap_vert:nx,meshmatcap_frag:ix,meshnormal_vert:rx,meshnormal_frag:sx,meshphong_vert:ox,meshphong_frag:ax,meshphysical_vert:cx,meshphysical_frag:lx,meshtoon_vert:ux,meshtoon_frag:hx,points_vert:dx,points_frag:fx,shadow_vert:px,shadow_frag:mx,sprite_vert:gx,sprite_frag:_x},_e={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},_i={basic:{uniforms:un([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:un([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new We(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:un([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:un([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:un([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new We(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:un([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:un([_e.points,_e.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:un([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:un([_e.common,_e.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:un([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:un([_e.sprite,_e.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:un([_e.common,_e.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:un([_e.lights,_e.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};_i.physical={uniforms:un([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};var wl={r:0,b:0,g:0},yx=new nt,Ip=new Ye;Ip.set(-1,0,0,0,1,0,0,0,1);function xx(n,e,t,i,r,s){let o=new We(0),a=r===!0?0:1,c,l,u=null,f=0,h=null;function d(w){let C=w.isScene===!0?w.background:null;if(C&&C.isTexture){let v=w.backgroundBlurriness>0;C=e.get(C,v)}return C}function m(w){let C=!1,v=d(w);v===null?g(o,a):v&&v.isColor&&(g(v,1),C=!0);let A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function y(w,C){let v=d(C);v&&(v.isCubeTexture||v.mapping===qo)?(l===void 0&&(l=new qt(new Ji(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Ir(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,S,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(yx.makeRotationFromEuler(C.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ip),l.material.toneMapped=ot.getTransfer(v.colorSpace)!==bt,(u!==v||f!==v.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,h=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new qt(new Ki(2,2),new _n({name:"BackgroundMaterial",uniforms:Ir(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:rr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.toneMapped=ot.getTransfer(v.colorSpace)!==bt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,h=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function g(w,C){w.getRGB(wl,ph(n)),t.buffers.color.setClear(wl.r,wl.g,wl.b,C,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,C=1){o.set(w),a=C,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(w){a=w,g(o,a)},render:m,addToRenderList:y,dispose:p}}function bx(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null),s=r,o=!1;function a(D,O,k,B,P){let W=!1,Y=f(D,B,k,O);s!==Y&&(s=Y,l(s.object)),W=d(D,B,k,P),W&&m(D,B,k,P),P!==null&&e.update(P,n.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,v(D,O,k,B),P!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(P).buffer))}function c(){return n.createVertexArray()}function l(D){return n.bindVertexArray(D)}function u(D){return n.deleteVertexArray(D)}function f(D,O,k,B){let P=B.wireframe===!0,W=i[O.id];W===void 0&&(W={},i[O.id]=W);let Y=D.isInstancedMesh===!0?D.id:0,te=W[Y];te===void 0&&(te={},W[Y]=te);let X=te[k.id];X===void 0&&(X={},te[k.id]=X);let j=X[P];return j===void 0&&(j=h(c()),X[P]=j),j}function h(D){let O=[],k=[],B=[];for(let P=0;P<t;P++)O[P]=0,k[P]=0,B[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:k,attributeDivisors:B,object:D,attributes:{},index:null}}function d(D,O,k,B){let P=s.attributes,W=O.attributes,Y=0,te=k.getAttributes();for(let X in te)if(te[X].location>=0){let ie=P[X],Te=W[X];if(Te===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(Te=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(Te=D.instanceColor)),ie===void 0||ie.attribute!==Te||Te&&ie.data!==Te.data)return!0;Y++}return s.attributesNum!==Y||s.index!==B}function m(D,O,k,B){let P={},W=O.attributes,Y=0,te=k.getAttributes();for(let X in te)if(te[X].location>=0){let ie=W[X];ie===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(ie=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(ie=D.instanceColor));let Te={};Te.attribute=ie,ie&&ie.data&&(Te.data=ie.data),P[X]=Te,Y++}s.attributes=P,s.attributesNum=Y,s.index=B}function y(){let D=s.newAttributes;for(let O=0,k=D.length;O<k;O++)D[O]=0}function g(D){p(D,0)}function p(D,O){let k=s.newAttributes,B=s.enabledAttributes,P=s.attributeDivisors;k[D]=1,B[D]===0&&(n.enableVertexAttribArray(D),B[D]=1),P[D]!==O&&(n.vertexAttribDivisor(D,O),P[D]=O)}function w(){let D=s.newAttributes,O=s.enabledAttributes;for(let k=0,B=O.length;k<B;k++)O[k]!==D[k]&&(n.disableVertexAttribArray(k),O[k]=0)}function C(D,O,k,B,P,W,Y){Y===!0?n.vertexAttribIPointer(D,O,k,P,W):n.vertexAttribPointer(D,O,k,B,P,W)}function v(D,O,k,B){y();let P=B.attributes,W=k.getAttributes(),Y=O.defaultAttributeValues;for(let te in W){let X=W[te];if(X.location>=0){let j=P[te];if(j===void 0&&(te==="instanceMatrix"&&D.instanceMatrix&&(j=D.instanceMatrix),te==="instanceColor"&&D.instanceColor&&(j=D.instanceColor)),j!==void 0){let ie=j.normalized,Te=j.itemSize,Se=e.get(j);if(Se===void 0)continue;let gt=Se.buffer,Ze=Se.type,at=Se.bytesPerElement,z=Ze===n.INT||Ze===n.UNSIGNED_INT||j.gpuType===Uc;if(j.isInterleavedBufferAttribute){let ee=j.data,we=ee.stride,ze=j.offset;if(ee.isInstancedInterleavedBuffer){for(let ve=0;ve<X.locationSize;ve++)p(X.location+ve,ee.meshPerAttribute);D.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ve=0;ve<X.locationSize;ve++)g(X.location+ve);n.bindBuffer(n.ARRAY_BUFFER,gt);for(let ve=0;ve<X.locationSize;ve++)C(X.location+ve,Te/X.locationSize,Ze,ie,we*at,(ze+Te/X.locationSize*ve)*at,z)}else{if(j.isInstancedBufferAttribute){for(let ee=0;ee<X.locationSize;ee++)p(X.location+ee,j.meshPerAttribute);D.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ee=0;ee<X.locationSize;ee++)g(X.location+ee);n.bindBuffer(n.ARRAY_BUFFER,gt);for(let ee=0;ee<X.locationSize;ee++)C(X.location+ee,Te/X.locationSize,Ze,ie,Te*at,Te/X.locationSize*ee*at,z)}}else if(Y!==void 0){let ie=Y[te];if(ie!==void 0)switch(ie.length){case 2:n.vertexAttrib2fv(X.location,ie);break;case 3:n.vertexAttrib3fv(X.location,ie);break;case 4:n.vertexAttrib4fv(X.location,ie);break;default:n.vertexAttrib1fv(X.location,ie)}}}}w()}function A(){M();for(let D in i){let O=i[D];for(let k in O){let B=O[k];for(let P in B){let W=B[P];for(let Y in W)u(W[Y].object),delete W[Y];delete B[P]}}delete i[D]}}function S(D){if(i[D.id]===void 0)return;let O=i[D.id];for(let k in O){let B=O[k];for(let P in B){let W=B[P];for(let Y in W)u(W[Y].object),delete W[Y];delete B[P]}}delete i[D.id]}function T(D){for(let O in i){let k=i[O];for(let B in k){let P=k[B];if(P[D.id]===void 0)continue;let W=P[D.id];for(let Y in W)u(W[Y].object),delete W[Y];delete P[D.id]}}}function x(D){for(let O in i){let k=i[O],B=D.isInstancedMesh===!0?D.id:0,P=k[B];if(P!==void 0){for(let W in P){let Y=P[W];for(let te in Y)u(Y[te].object),delete Y[te];delete P[W]}delete k[B],Object.keys(k).length===0&&delete i[O]}}}function M(){I(),o=!0,s!==r&&(s=r,l(s.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:M,resetDefaultState:I,dispose:A,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:T,initAttributes:y,enableAttribute:g,disableUnusedAttributes:w}}function vx(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function a(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let h=0;for(let d=0;d<u;d++)h+=l[d];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function wx(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==Vn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){let x=T===si&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==An&&T!==zn&&!x&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(He("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:w,maxVaryings:C,maxFragmentUniforms:v,maxSamples:A,samples:S}}function Ax(n){let e=this,t=null,i=0,r=!1,s=!1,o=new In,a=new Ye,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){let m=f.clippingPlanes,y=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!r||m===null||m.length===0||s&&!g)s?u(null):l();else{let w=s?0:i,C=w*4,v=p.clippingState||null;c.value=v,v=u(m,h,C,d);for(let A=0;A!==C;++A)v[A]=t[A];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,m){let y=f!==null?f.length:0,g=null;if(y!==0){if(g=c.value,m!==!0||g===null){let p=d+y*4,w=h.matrixWorldInverse;a.getNormalMatrix(w),(g===null||g.length<p)&&(g=new Float32Array(p));for(let C=0,v=d;C!==y;++C,v+=4)o.copy(f[C]).applyMatrix4(w,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}var Ns=4,Sx=6,Mx=20,Ex=256,Qo=new Cs,cp=new We,yh=null,xh=0,bh=0,vh=!1,Tx=new R,Pr=new R,Sl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=Tx}=s;yh=this._renderer.getRenderTarget(),xh=this._renderer.getActiveCubeFace(),bh=this._renderer.getActiveMipmapLevel(),vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=up(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(yh,xh,bh),this._renderer.xr.enabled=vh,e.scissorTest=!1,Os(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===sr||e.mapping===Rr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yh=this._renderer.getRenderTarget(),xh=this._renderer.getActiveCubeFace(),bh=this._renderer.getActiveMipmapLevel(),vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:si,format:Vn,colorSpace:_o,depthBuffer:!1},r=lp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lp(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Cx(s)),this._blurMaterial=Ix(s,e,t),this._ggxMaterial=Rx(s,e,t)}return r}_compileMaterial(e){let t=new qt(new Ot,e);this._renderer.compile(t,Qo)}_sceneToCubeUV(e,t,i,r,s){let c=new ln(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(cp),f.toneMapping=ii,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qt(new Ji,new wr({name:"PMREM.Background",side:yn,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,p=!1,w=e.background;w?w.isColor&&(g.color.copy(w),e.background=null,p=!0):(g.color.copy(cp),p=!0);for(let C=0;C<6;C++){let v=C%3;v===0?(c.up.set(0,l[C],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[C],s.y,s.z)):v===1?(c.up.set(0,0,l[C]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[C],s.z)):(c.up.set(0,l[C],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[C]));let A=this._cubeSize;Os(r,v*A,C>2?A:0,A,A),f.setRenderTarget(r),p&&f.render(y,c),f.render(e,c)}f.toneMapping=d,f.autoClear=h,e.background=w}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===sr||e.mapping===Rr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=hp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=up());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;Os(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Qo)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let c=o.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=l*1.25,d=f*h,{_lodMax:m}=this,y=this._sizeLods[i],g=3*y*(i>m-Ns?i-m+Ns:0),p=4*(this._cubeSize-y);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=m-t,Os(s,g,p,3*y,2*y),r.setRenderTarget(s),r.render(a,Qo),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-i,Os(e,g,p,3*y,2*y),r.setRenderTarget(e),r.render(a,Qo)}_blur(e,t,i,r){let s=this._pingPongRenderTarget,o=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,o),this._blurPass(s,e,i,i,o)}_blurPass(e,t,i,r,s){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[r];c.material=a;let l=a.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-i;let u=this._sizeLods[r],f=3*u*(r>this._lodMax-Ns?r-this._lodMax+Ns:0),h=4*(this._cubeSize-u);Os(t,f,h,3*u,2*u),o.setRenderTarget(t),o.render(c,Qo)}};function Cx(n){let e=[],t=[],i=n,r=n-Ns+1+Sx;for(let s=0;s<r;s++){let o=Math.pow(2,i);e.push(o);let a=1/(o-2),c=-a,l=1+a,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,h=6,d=3,m=new Float32Array(d*h*f),y=new Float32Array(d*h*f);for(let p=0;p<f;p++){let w=p%3*2/3-1,C=p>2?0:-1,v=[w,C,0,w+2/3,C,0,w+2/3,C+1,0,w,C,0,w+2/3,C+1,0,w,C+1,0];m.set(v,d*h*p);for(let A=0;A<h;A++){let S=u[A*2]*2-1,T=u[A*2+1]*2-1;p===0?Pr.set(1,T,S):p===1?Pr.set(-S,1,-T):p===2?Pr.set(-S,T,1):p===3?Pr.set(-1,T,-S):p===4?Pr.set(-S,-1,T):Pr.set(S,T,-1),Pr.toArray(y,(p*h+A)*d)}}let g=new Ot;g.setAttribute("position",new en(m,d)),g.setAttribute("outputDirection",new en(y,d)),t.push(new qt(g,null)),i>Ns&&i--}return{lodMeshes:t,sizeLods:e}}function lp(n,e,t){let i=new wn(n,e,t);return i.texture.mapping=qo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Os(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Rx(n,e,t){return new _n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ex,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Tl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Ix(n,e,t){return new _n({name:"SphericalGaussianBlur",defines:{SAMPLES:Mx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Tl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function up(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function hp(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Tl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ml=class extends wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Po(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ji(5,5,5),s=new _n({name:"CubemapFromEquirect",uniforms:Ir(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:yn,blending:mi});s.uniforms.tEquirect.value=t;let o=new qt(r,s),a=t.minFilter;return t.minFilter===or&&(t.minFilter=rn),new Ic(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}};function Px(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,d=!1){return h==null?null:d?o(h):s(h)}function s(h){if(h&&h.isTexture){let d=h.mapping;if(d===Lc||d===Fc)if(e.has(h)){let m=e.get(h).texture;return a(m,h.mapping)}else{let m=h.image;if(m&&m.height>0){let y=new Ml(m.height);return y.fromEquirectangularTexture(n,h),e.set(h,y),h.addEventListener("dispose",l),a(y.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let d=h.mapping,m=d===Lc||d===Fc,y=d===sr||d===Rr;if(m||y){let g=t.get(h),p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new Sl(n)),g=m?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{let w=h.image;return m&&w&&w.height>0||y&&w&&c(w)?(i===null&&(i=new Sl(n)),g=m?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function a(h,d){return d===Lc?h.mapping=sr:d===Fc&&(h.mapping=Rr),h}function c(h){let d=0,m=6;for(let y=0;y<m;y++)h[y]!==void 0&&d++;return d===m}function l(h){let d=h.target;d.removeEventListener("dispose",l);let m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function u(h){let d=h.target;d.removeEventListener("dispose",u);let m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function Bx(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&vr("WebGLRenderer: "+i+" extension not supported."),r}}}function Lx(n,e,t,i){let r={},s=new WeakMap;function o(f){let h=f.target;h.index!==null&&e.remove(h.index);for(let m in h.attributes)e.remove(h.attributes[m]);h.removeEventListener("dispose",o),delete r[h.id];let d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function c(f){let h=f.attributes;for(let d in h)e.update(h[d],n.ARRAY_BUFFER)}function l(f){let h=[],d=f.index,m=f.attributes.position,y=0;if(m===void 0)return;if(d!==null){let w=d.array;y=d.version;for(let C=0,v=w.length;C<v;C+=3){let A=w[C+0],S=w[C+1],T=w[C+2];h.push(A,S,S,T,T,A)}}else{let w=m.array;y=m.version;for(let C=0,v=w.length/3-1;C<v;C+=3){let A=C+0,S=C+1,T=C+2;h.push(A,S,S,T,T,A)}}let g=new(m.count>=65535?So:Ao)(h,1);g.version=y;let p=s.get(f);p&&e.remove(p),s.set(f,g)}function u(f){let h=s.get(f);if(h){let d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function Fx(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,h){n.drawElements(i,h,s,f*o),t.update(h,i,1)}function l(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,s,f*o,d),t.update(h,i,d))}function u(f,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,d);let y=0;for(let g=0;g<d;g++)y+=h[g];t.update(y,i,1)}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Dx(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:Ge("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Ux(n,e,t){let i=new WeakMap,r=new Lt;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0,h=i.get(a);if(h===void 0||h.count!==f){let M=function(){T.dispose(),i.delete(a),a.removeEventListener("dispose",M)};h!==void 0&&h.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],C=0;d===!0&&(C=1),m===!0&&(C=2),y===!0&&(C=3);let v=a.attributes.position.count*C,A=1;v>e.maxTextureSize&&(A=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let S=new Float32Array(v*A*4*f),T=new vo(S,v,A,f);T.type=zn,T.needsUpdate=!0;let x=C*4;for(let I=0;I<f;I++){let D=g[I],O=p[I],k=w[I],B=v*A*4*I;for(let P=0;P<D.count;P++){let W=P*x;d===!0&&(r.fromBufferAttribute(D,P),S[B+W+0]=r.x,S[B+W+1]=r.y,S[B+W+2]=r.z,S[B+W+3]=0),m===!0&&(r.fromBufferAttribute(O,P),S[B+W+4]=r.x,S[B+W+5]=r.y,S[B+W+6]=r.z,S[B+W+7]=0),y===!0&&(r.fromBufferAttribute(k,P),S[B+W+8]=r.x,S[B+W+9]=r.y,S[B+W+10]=r.z,S[B+W+11]=k.itemSize===4?r.w:1)}}h={count:f,texture:T,size:new ge(v,A)},i.set(a,h),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let d=0;for(let y=0;y<l.length;y++)d+=l[y];let m=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",m),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Ox(n,e,t,i,r){let s=new WeakMap;function o(l){let u=r.render.frame,f=l.geometry,h=e.get(l,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function a(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var Nx={[Ju]:"LINEAR_TONE_MAPPING",[Ku]:"REINHARD_TONE_MAPPING",[Qu]:"CINEON_TONE_MAPPING",[Wo]:"ACES_FILMIC_TONE_MAPPING",[th]:"AGX_TONE_MAPPING",[nh]:"NEUTRAL_TONE_MAPPING",[eh]:"CUSTOM_TONE_MAPPING"};function kx(n,e,t,i,r,s){let o=new wn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new Ot;l.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new yt([0,2,0,0,2,0],2));let u=new gc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new qt(l,u),h=new Cs(-1,1,1,-1,0,1),d=null,m=null,y=!1,g,p=null,w=[],C=!1;this.setSize=function(v,A){o.setSize(v,A),a!==null&&a.setSize(v,A),c!==null&&c.setSize(v,A);for(let S=0;S<w.length;S++){let T=w[S];T.setSize&&T.setSize(v,A)}},this.setEffects=function(v){w=v,C=w.length>0&&w[0].isRenderPass===!0;let A=o.width,S=o.height;w.length>0&&a===null&&(a=new wn(A,S,{type:si,depthBuffer:!1,stencilBuffer:!1}),c=new wn(A,S,{type:si,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<w.length;T++){let x=w[T];x.setSize&&x.setSize(A,S)}},this.begin=function(v,A){if(y||v.toneMapping===ii&&w.length===0)return!1;if(p=A,A!==null){let S=A.width,T=A.height;(o.width!==S||o.height!==T)&&this.setSize(S,T)}return C===!1&&v.setRenderTarget(o),g=v.toneMapping,v.toneMapping=ii,!0},this.hasRenderPass=function(){return C},this.end=function(v,A){v.toneMapping=g,y=!0;let S=o,T=a;for(let x=0;x<w.length;x++){let M=w[x];M.enabled!==!1&&(M.render(v,T,S,A),M.needsSwap!==!1&&(S=T,T=T===a?c:a))}if(d!==v.outputColorSpace||m!==v.toneMapping){d=v.outputColorSpace,m=v.toneMapping,u.defines={},ot.getTransfer(d)===bt&&(u.defines.SRGB_TRANSFER="");let x=Nx[m];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=S.texture,v.setRenderTarget(p),v.render(f,h),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Pp=new gn,Sh=new ji(1,1),Bp=new vo,Lp=new nc,Fp=new Po,dp=[],fp=[],pp=new Float32Array(16),mp=new Float32Array(9),gp=new Float32Array(4);function zs(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=dp[r];if(s===void 0&&(s=new Float32Array(r),dp[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Cl(n,e){let t=fp[e];t===void 0&&(t=new Int32Array(e),fp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function zx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Vx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2fv(this.addr,e),Zt(t,e)}}function Hx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;n.uniform3fv(this.addr,e),Zt(t,e)}}function Gx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4fv(this.addr,e),Zt(t,e)}}function Wx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;gp.set(i),n.uniformMatrix2fv(this.addr,!1,gp),Zt(t,i)}}function qx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;mp.set(i),n.uniformMatrix3fv(this.addr,!1,mp),Zt(t,i)}}function Xx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;pp.set(i),n.uniformMatrix4fv(this.addr,!1,pp),Zt(t,i)}}function Yx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Zx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2iv(this.addr,e),Zt(t,e)}}function $x(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3iv(this.addr,e),Zt(t,e)}}function jx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4iv(this.addr,e),Zt(t,e)}}function Jx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Kx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2uiv(this.addr,e),Zt(t,e)}}function Qx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3uiv(this.addr,e),Zt(t,e)}}function eb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4uiv(this.addr,e),Zt(t,e)}}function tb(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Sh.compareFunction=t.isReversedDepthBuffer()?vl:bl,s=Sh):s=Pp,t.setTexture2D(e||s,r)}function nb(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Lp,r)}function ib(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Fp,r)}function rb(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Bp,r)}function sb(n){switch(n){case 5126:return zx;case 35664:return Vx;case 35665:return Hx;case 35666:return Gx;case 35674:return Wx;case 35675:return qx;case 35676:return Xx;case 5124:case 35670:return Yx;case 35667:case 35671:return Zx;case 35668:case 35672:return $x;case 35669:case 35673:return jx;case 5125:return Jx;case 36294:return Kx;case 36295:return Qx;case 36296:return eb;case 35678:case 36198:case 36298:case 36306:case 35682:return tb;case 35679:case 36299:case 36307:return nb;case 35680:case 36300:case 36308:case 36293:return ib;case 36289:case 36303:case 36311:case 36292:return rb}}function ob(n,e){n.uniform1fv(this.addr,e)}function ab(n,e){let t=zs(e,this.size,2);n.uniform2fv(this.addr,t)}function cb(n,e){let t=zs(e,this.size,3);n.uniform3fv(this.addr,t)}function lb(n,e){let t=zs(e,this.size,4);n.uniform4fv(this.addr,t)}function ub(n,e){let t=zs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function hb(n,e){let t=zs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function db(n,e){let t=zs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function fb(n,e){n.uniform1iv(this.addr,e)}function pb(n,e){n.uniform2iv(this.addr,e)}function mb(n,e){n.uniform3iv(this.addr,e)}function gb(n,e){n.uniform4iv(this.addr,e)}function _b(n,e){n.uniform1uiv(this.addr,e)}function yb(n,e){n.uniform2uiv(this.addr,e)}function xb(n,e){n.uniform3uiv(this.addr,e)}function bb(n,e){n.uniform4uiv(this.addr,e)}function vb(n,e,t){let i=this.cache,r=e.length,s=Cl(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=Sh:o=Pp;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function wb(n,e,t){let i=this.cache,r=e.length,s=Cl(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Lp,s[o])}function Ab(n,e,t){let i=this.cache,r=e.length,s=Cl(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Fp,s[o])}function Sb(n,e,t){let i=this.cache,r=e.length,s=Cl(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Bp,s[o])}function Mb(n){switch(n){case 5126:return ob;case 35664:return ab;case 35665:return cb;case 35666:return lb;case 35674:return ub;case 35675:return hb;case 35676:return db;case 5124:case 35670:return fb;case 35667:case 35671:return pb;case 35668:case 35672:return mb;case 35669:case 35673:return gb;case 5125:return _b;case 36294:return yb;case 36295:return xb;case 36296:return bb;case 35678:case 36198:case 36298:case 36306:case 35682:return vb;case 35679:case 36299:case 36307:return wb;case 35680:case 36300:case 36308:case 36293:return Ab;case 36289:case 36303:case 36311:case 36292:return Sb}}var Mh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=sb(t.type)}},Eh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Mb(t.type)}},Th=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},wh=/(\w+)(\])?(\[|\.)?/g;function _p(n,e){n.seq.push(e),n.map[e.id]=e}function Eb(n,e,t){let i=n.name,r=i.length;for(wh.lastIndex=0;;){let s=wh.exec(i),o=wh.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){_p(t,l===void 0?new Mh(a,n,e):new Eh(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new Th(a),_p(t,f)),t=f}}}var ks=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);Eb(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function yp(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Tb=37297,Cb=0;function Rb(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var xp=new Ye;function Ib(n){ot._getMatrix(xp,ot.workingColorSpace,n);let e=`mat3( ${xp.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(n)){case yo:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function bp(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Rb(n.getShaderSource(e),a)}else return s}function Pb(n,e){let t=Ib(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Bb={[Ju]:"Linear",[Ku]:"Reinhard",[Qu]:"Cineon",[Wo]:"ACESFilmic",[th]:"AgX",[nh]:"Neutral",[eh]:"Custom"};function Lb(n,e){let t=Bb[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Al=new R;function Fb(){ot.getLuminanceCoefficients(Al);let n=Al.x.toFixed(4),e=Al.y.toFixed(4),t=Al.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Db(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ta).join(`
`)}function Ub(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Ob(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function ta(n){return n!==""}function vp(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wp(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Nb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ch(n){return n.replace(Nb,zb)}var kb=new Map;function zb(n,e){let t=tt[e];if(t===void 0){let i=kb.get(e);if(i!==void 0)t=tt[i],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ch(t)}var Vb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ap(n){return n.replace(Vb,Hb)}function Hb(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Sp(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Gb={[Tr]:"SHADOWMAP_TYPE_PCF",[Ps]:"SHADOWMAP_TYPE_VSM"};function Wb(n){return Gb[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var qb={[sr]:"ENVMAP_TYPE_CUBE",[Rr]:"ENVMAP_TYPE_CUBE",[qo]:"ENVMAP_TYPE_CUBE_UV"};function Xb(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":qb[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var Yb={[Rr]:"ENVMAP_MODE_REFRACTION"};function Zb(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Yb[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var $b={[ju]:"ENVMAP_BLENDING_MULTIPLY",[Vf]:"ENVMAP_BLENDING_MIX",[Hf]:"ENVMAP_BLENDING_ADD"};function jb(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":$b[n.combine]||"ENVMAP_BLENDING_NONE"}function Jb(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Kb(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Wb(t),l=Xb(t),u=Zb(t),f=jb(t),h=Jb(t),d=Db(t),m=Ub(s),y=r.createProgram(),g,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ta).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ta).join(`
`),p.length>0&&(p+=`
`)):(g=[Sp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ta).join(`
`),p=[Sp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ii?"#define TONE_MAPPING":"",t.toneMapping!==ii?tt.tonemapping_pars_fragment:"",t.toneMapping!==ii?Lb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,Pb("linearToOutputTexel",t.outputColorSpace),Fb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ta).join(`
`)),o=Ch(o),o=vp(o,t),o=wp(o,t),a=Ch(a),a=vp(a,t),a=wp(a,t),o=Ap(o),a=Ap(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===hh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let C=w+g+o,v=w+p+a,A=yp(r,r.VERTEX_SHADER,C),S=yp(r,r.FRAGMENT_SHADER,v);r.attachShader(y,A),r.attachShader(y,S),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function T(D){if(n.debug.checkShaderErrors){let O=r.getProgramInfoLog(y)||"",k=r.getShaderInfoLog(A)||"",B=r.getShaderInfoLog(S)||"",P=O.trim(),W=k.trim(),Y=B.trim(),te=!0,X=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(te=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,y,A,S);else{let j=bp(r,A,"vertex"),ie=bp(r,S,"fragment");Ge("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+P+`
`+j+`
`+ie)}else P!==""?He("WebGLProgram: Program Info Log:",P):(W===""||Y==="")&&(X=!1);X&&(D.diagnostics={runnable:te,programLog:P,vertexShader:{log:W,prefix:g},fragmentShader:{log:Y,prefix:p}})}r.deleteShader(A),r.deleteShader(S),x=new ks(r,y),M=Ob(r,y)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(y,Tb)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cb++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=A,this.fragmentShader=S,this}var Qb=0,Rh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Ih(e),t.set(e,i)),i}},Ih=class{constructor(e){this.id=Qb++,this.code=e,this.usedTimes=0}};function ev(n){return n===cr||n===Jo||n===Ko}function tv(n,e,t,i,r,s){let o=new ys,a=new Rh,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer,h=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function y(x,M,I,D,O,k){let B=D.fog,P=O.geometry,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,te=e.get(x.envMap||W,Y),X=te&&te.mapping===qo?te.image.height:null,j=d[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&He("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let ie=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,Te=ie!==void 0?ie.length:0,Se=0;P.morphAttributes.position!==void 0&&(Se=1),P.morphAttributes.normal!==void 0&&(Se=2),P.morphAttributes.color!==void 0&&(Se=3);let gt,Ze,at,z;if(j){let St=_i[j];gt=St.vertexShader,Ze=St.fragmentShader}else{gt=x.vertexShader,Ze=x.fragmentShader;let St=a.getVertexShaderStage(x),ft=a.getFragmentShaderStage(x);a.update(x,St,ft),at=St.id,z=ft.id}let ee=n.getRenderTarget(),we=n.state.buffers.depth.getReversed(),ze=O.isInstancedMesh===!0,ve=O.isBatchedMesh===!0,Me=!!x.map,je=!!x.matcap,Je=!!te,st=!!x.aoMap,ut=!!x.lightMap,$e=!!x.bumpMap&&x.wireframe===!1,_t=!!x.normalMap,Vt=!!x.displacementMap,Nt=!!x.emissiveMap,pe=!!x.metalnessMap,Ut=!!x.roughnessMap,U=x.anisotropy>0,kt=x.clearcoat>0,dt=x.dispersion>0,E=x.retroreflectivity>0,_=x.iridescence>0,N=x.sheen>0,G=x.transmission>0,Z=U&&!!x.anisotropyMap,oe=kt&&!!x.clearcoatMap,ce=kt&&!!x.clearcoatNormalMap,$=kt&&!!x.clearcoatRoughnessMap,Q=_&&!!x.iridescenceMap,le=_&&!!x.iridescenceThicknessMap,Ce=N&&!!x.sheenColorMap,ue=N&&!!x.sheenRoughnessMap,he=!!x.specularMap,Le=!!x.specularColorMap,ke=!!x.specularIntensityMap,Ve=G&&!!x.transmissionMap,L=G&&!!x.thicknessMap,de=!!x.gradientMap,K=!!x.alphaMap,fe=x.alphaTest>0,me=!!x.alphaHash,re=!!x.extensions,Fe=ii;x.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Fe=n.toneMapping);let Re={shaderID:j,shaderType:x.type,shaderName:x.name,vertexShader:gt,fragmentShader:Ze,defines:x.defines,customVertexShaderID:at,customFragmentShaderID:z,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:ve,batchingColor:ve&&O._colorsTexture!==null,instancing:ze,instancingColor:ze&&O.instanceColor!==null,instancingMorph:ze&&O.morphTexture!==null,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Me,matcap:je,envMap:Je,envMapMode:Je&&te.mapping,envMapCubeUVHeight:X,aoMap:st,lightMap:ut,bumpMap:$e,normalMap:_t,displacementMap:Vt,emissiveMap:Nt,normalMapObjectSpace:_t&&x.normalMapType===qf,normalMapTangentSpace:_t&&x.normalMapType===xl,packedNormalMap:_t&&x.normalMapType===xl&&ev(x.normalMap.format),metalnessMap:pe,roughnessMap:Ut,anisotropy:U,anisotropyMap:Z,clearcoat:kt,clearcoatMap:oe,clearcoatNormalMap:ce,clearcoatRoughnessMap:$,dispersion:dt,retroreflection:E,iridescence:_,iridescenceMap:Q,iridescenceThicknessMap:le,sheen:N,sheenColorMap:Ce,sheenRoughnessMap:ue,specularMap:he,specularColorMap:Le,specularIntensityMap:ke,transmission:G,transmissionMap:Ve,thicknessMap:L,gradientMap:de,opaque:x.transparent===!1&&x.blending===Bs&&x.alphaToCoverage===!1,alphaMap:K,alphaTest:fe,alphaHash:me,combine:x.combine,mapUv:Me&&m(x.map.channel),aoMapUv:st&&m(x.aoMap.channel),lightMapUv:ut&&m(x.lightMap.channel),bumpMapUv:$e&&m(x.bumpMap.channel),normalMapUv:_t&&m(x.normalMap.channel),displacementMapUv:Vt&&m(x.displacementMap.channel),emissiveMapUv:Nt&&m(x.emissiveMap.channel),metalnessMapUv:pe&&m(x.metalnessMap.channel),roughnessMapUv:Ut&&m(x.roughnessMap.channel),anisotropyMapUv:Z&&m(x.anisotropyMap.channel),clearcoatMapUv:oe&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:ce&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:le&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:ue&&m(x.sheenRoughnessMap.channel),specularMapUv:he&&m(x.specularMap.channel),specularColorMapUv:Le&&m(x.specularColorMap.channel),specularIntensityMapUv:ke&&m(x.specularIntensityMap.channel),transmissionMapUv:Ve&&m(x.transmissionMap.channel),thicknessMapUv:L&&m(x.thicknessMap.channel),alphaMapUv:K&&m(x.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(_t||U),vertexNormals:!!P.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!P.attributes.uv&&(Me||K),fog:!!B,useFog:x.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||P.attributes.normal===void 0&&_t===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:we,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Se,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Fe,decodeVideoTexture:Me&&x.map.isVideoTexture===!0&&ot.getTransfer(x.map.colorSpace)===bt,decodeVideoTextureEmissive:Nt&&x.emissiveMap.isVideoTexture===!0&&ot.getTransfer(x.emissiveMap.colorSpace)===bt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===kn,flipSided:x.side===yn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:re&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&x.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function g(x){let M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)M.push(I),M.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(p(M,x),w(M,x),M.push(n.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function p(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numSunLights),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numSunLightShadows),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function w(x,M){o.disableAll(),M.instancing&&o.enable(0),M.instancingColor&&o.enable(1),M.instancingMorph&&o.enable(2),M.matcap&&o.enable(3),M.envMap&&o.enable(4),M.normalMapObjectSpace&&o.enable(5),M.normalMapTangentSpace&&o.enable(6),M.clearcoat&&o.enable(7),M.iridescence&&o.enable(8),M.alphaTest&&o.enable(9),M.vertexColors&&o.enable(10),M.vertexAlphas&&o.enable(11),M.vertexUv1s&&o.enable(12),M.vertexUv2s&&o.enable(13),M.vertexUv3s&&o.enable(14),M.vertexTangents&&o.enable(15),M.anisotropy&&o.enable(16),M.alphaHash&&o.enable(17),M.batching&&o.enable(18),M.dispersion&&o.enable(19),M.retroreflection&&o.enable(24),M.batchingColor&&o.enable(20),M.gradientMap&&o.enable(21),M.packedNormalMap&&o.enable(22),M.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),M.numLightProbeGrids>0&&o.enable(22),M.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function C(x){let M=d[x.type],I;if(M){let D=_i[M];I=sp.clone(D.uniforms)}else I=x.uniforms;return I}function v(x,M){let I=u.get(M);return I!==void 0?++I.usedTimes:(I=new Kb(n,M,x,r),l.push(I),u.set(M,I)),I}function A(x){if(--x.usedTimes===0){let M=l.indexOf(x);l[M]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function S(x){a.remove(x)}function T(){a.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:C,acquireProgram:v,releaseProgram:A,releaseShaderCache:S,programs:l,dispose:T}}function nv(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function iv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Mp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ep(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function a(h,d,m,y,g,p){let w=n[e];return w===void 0?(w={id:h.id,object:h,geometry:d,material:m,materialVariant:o(h),groupOrder:y,renderOrder:h.renderOrder,z:g,group:p},n[e]=w):(w.id=h.id,w.object=h,w.geometry=d,w.material=m,w.materialVariant=o(h),w.groupOrder=y,w.renderOrder=h.renderOrder,w.z=g,w.group=p),e++,w}function c(h,d,m,y,g,p,w){w.reversedDepth===!0&&(g=-g);let C=a(h,d,m,y,g,p);m.transmission>0?i.push(C):m.transparent===!0?r.push(C):t.push(C)}function l(h,d,m,y,g,p){let w=a(h,d,m,y,g,p);m.transmission>0?i.unshift(w):m.transparent===!0?r.unshift(w):t.unshift(w)}function u(h,d){t.length>1&&t.sort(h||iv),i.length>1&&i.sort(d||Mp),r.length>1&&r.sort(d||Mp)}function f(){for(let h=e,d=n.length;h<d;h++){let m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:f,sort:u}}function rv(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new Ep,n.set(i,[o])):r>=s.length?(o=new Ep,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function sv(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new R,color:new We};break;case"SpotLight":t={position:new R,direction:new R,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new R,halfWidth:new R,halfHeight:new R};break}return n[e.id]=t,t}}}function ov(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var av=0;function cv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function lv(n){let e=new sv,t=ov(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new R);let r=new R,s=new nt,o=new nt;function a(l){let u=0,f=0,h=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let d=0,m=0,y=0,g=0,p=0,w=0,C=0,v=0,A=0,S=0,T=0,x=0,M=0,I=0;l.sort(cv);for(let O=0,k=l.length;O<k;O++){let B=l[O],P=B.color,W=B.intensity,Y=B.distance,te=null;if(B.shadow&&B.shadow.map&&(B.shadow.map.texture.format===cr?te=B.shadow.map.texture:te=B.shadow.map.depthTexture||B.shadow.map.texture),B.isAmbientLight)u+=P.r*W,f+=P.g*W,h+=P.b*W;else if(B.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(B.sh.coefficients[X],W);I++}else if(B.isSunLight){let X=e.get(B);if(X.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let j=B.shadow,ie=t.get(B);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),i.sunShadow[m]=ie,i.sunShadowMap[m]=te;let Te=j.getViewportCount();for(let Se=0;Se<Te;Se++)i.sunShadowMatrix[y+Se]=j.getMatrix(Se),i.sunShadowCascade[y+Se]=j._cascadeData[Se];y+=Te,m++}i.sun[d]=X,d++}else if(B.isDirectionalLight){let X=e.get(B);if(X.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let j=B.shadow,ie=t.get(B);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,i.directionalShadow[g]=ie,i.directionalShadowMap[g]=te,i.directionalShadowMatrix[g]=B.shadow.matrix,A++}i.directional[g]=X,g++}else if(B.isSpotLight){let X=e.get(B);X.position.setFromMatrixPosition(B.matrixWorld),X.color.copy(P).multiplyScalar(W),X.distance=Y,X.coneCos=Math.cos(B.angle),X.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),X.decay=B.decay,i.spot[w]=X;let j=B.shadow;if(B.map&&(i.spotLightMap[x]=B.map,x++,j.updateMatrices(B),B.castShadow&&M++),i.spotLightMatrix[w]=j.matrix,B.castShadow){let ie=t.get(B);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,i.spotShadow[w]=ie,i.spotShadowMap[w]=te,T++}w++}else if(B.isRectAreaLight){let X=e.get(B);X.color.copy(P).multiplyScalar(W),X.halfWidth.set(B.width*.5,0,0),X.halfHeight.set(0,B.height*.5,0),i.rectArea[C]=X,C++}else if(B.isPointLight){let X=e.get(B);if(X.color.copy(B.color).multiplyScalar(B.intensity),X.distance=B.distance,X.decay=B.decay,B.castShadow){let j=B.shadow,ie=t.get(B);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,ie.shadowCameraNear=j.camera.near,ie.shadowCameraFar=j.camera.far,i.pointShadow[p]=ie,i.pointShadowMap[p]=te,i.pointShadowMatrix[p]=B.shadow.matrix,S++}i.point[p]=X,p++}else if(B.isHemisphereLight){let X=e.get(B);X.skyColor.copy(B.color).multiplyScalar(W),X.groundColor.copy(B.groundColor).multiplyScalar(W),i.hemi[v]=X,v++}}C>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;let D=i.hash;(D.sunLength!==d||D.directionalLength!==g||D.pointLength!==p||D.spotLength!==w||D.rectAreaLength!==C||D.hemiLength!==v||D.numSunShadows!==m||D.numDirectionalShadows!==A||D.numPointShadows!==S||D.numSpotShadows!==T||D.numSpotMaps!==x||D.numLightProbes!==I)&&(i.sun.length=d,i.directional.length=g,i.spot.length=w,i.rectArea.length=C,i.point.length=p,i.hemi.length=v,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=S,i.pointShadowMap.length=S,i.pointShadowMatrix.length=S,i.spotShadow.length=T,i.spotShadowMap.length=T,i.spotLightMatrix.length=T+x-M,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=I,D.sunLength=d,D.directionalLength=g,D.pointLength=p,D.spotLength=w,D.rectAreaLength=C,D.hemiLength=v,D.numSunShadows=m,D.numDirectionalShadows=A,D.numPointShadows=S,D.numSpotShadows=T,D.numSpotMaps=x,D.numLightProbes=I,i.version=av++)}function c(l,u){let f=0,h=0,d=0,m=0,y=0,g=0,p=u.matrixWorldInverse;for(let w=0,C=l.length;w<C;w++){let v=l[w];if(v.isSunLight){let A=i.sun[f];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(p),f++}else if(v.isDirectionalLight){let A=i.directional[h];A.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),h++}else if(v.isSpotLight){let A=i.spot[m];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),m++}else if(v.isRectAreaLight){let A=i.rectArea[y];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(p),o.identity(),s.copy(v.matrixWorld),s.premultiply(p),o.extractRotation(s),A.halfWidth.set(v.width*.5,0,0),A.halfHeight.set(0,v.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),y++}else if(v.isPointLight){let A=i.point[d];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(p),d++}else if(v.isHemisphereLight){let A=i.hemi[g];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(p),g++}}}return{setup:a,setupView:c,state:i}}function Tp(n){let e=new lv(n),t=[],i=[],r=[];function s(h){f.camera=h,t.length=0,i.length=0,r.length=0}function o(h){t.push(h)}function a(h){i.push(h)}function c(h){r.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}let f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function uv(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new Tp(n),e.set(r,[a])):s>=o.length?(a=new Tp(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var hv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,fv=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],pv=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Cp=new nt,ea=new R,Ah=new R;function mv(n,e,t){let i=new ws,r=new ge,s=new ge,o=new Lt,a=new _c,c=new yc,l={},u=t.maxTextureSize,f={[rr]:yn,[yn]:rr,[kn]:kn},h=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:hv,fragmentShader:dv}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let m=new Ot;m.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new qt(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tr;let p=this.type;this.render=function(S,T,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===wf&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Tr);let M=n.getRenderTarget(),I=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),O=n.state;O.setBlending(mi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let k=p!==this.type;k&&T.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(P=>P.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,P=S.length;B<P;B++){let W=S[B],Y=W.shadow;if(Y===void 0){He("WebGLShadowMap:",W,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);let te=Y.getFrameExtents();r.multiply(te),s.copy(Y.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/te.x),r.x=s.x*te.x,Y.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/te.y),r.y=s.y*te.y,Y.mapSize.y=s.y));let X=n.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=X,Y.map===null||k===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===Ps){if(W.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new wn(r.x,r.y,{format:cr,type:si,minFilter:rn,magFilter:rn,generateMipmaps:!1}),Y.map.texture.name=W.name+".shadowMap",Y.map.depthTexture=new ji(r.x,r.y,zn),Y.map.depthTexture.name=W.name+".shadowMapDepth",Y.map.depthTexture.format=fi,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=tn,Y.map.depthTexture.magFilter=tn}else W.isPointLight?(Y.map=new Ml(r.x),Y.map.depthTexture=new cc(r.x,ri)):(Y.map=new wn(r.x,r.y),Y.map.depthTexture=new ji(r.x,r.y,ri)),Y.map.depthTexture.name=W.name+".shadowMap",Y.map.depthTexture.format=fi,this.type===Tr?(Y.map.depthTexture.compareFunction=X?vl:bl,Y.map.depthTexture.minFilter=rn,Y.map.depthTexture.magFilter=rn):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=tn,Y.map.depthTexture.magFilter=tn);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==r.x||Y.map.height!==r.y)&&Y.map.setSize(r.x,r.y);let j=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();W.isPointLight!==!0&&Y.updateMatrices(W,x);for(let ie=0;ie<j;ie++){let Te=Y.getCamera(ie);if(W.isPointLight){let Se=Y.camera,gt=Y.matrix,Ze=W.distance||Se.far;Ze!==Se.far&&(Se.far=Ze,Se.updateProjectionMatrix()),ea.setFromMatrixPosition(W.matrixWorld),Se.position.copy(ea),Ah.copy(Se.position),Ah.add(fv[ie]),Se.up.copy(pv[ie]),Se.lookAt(Ah),Se.updateMatrixWorld(),gt.makeTranslation(-ea.x,-ea.y,-ea.z),Cp.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(Cp,Se.coordinateSystem,Se.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)n.setRenderTarget(Y.map,ie),n.clear();else{ie===0&&(n.setRenderTarget(Y.map),n.clear());let Se=Y.getViewport(ie);o.set(s.x*Se.x,s.y*Se.y,s.x*Se.z,s.y*Se.w),O.viewport(o)}i=Y.getFrustum(ie),v(T,x,Te,W,this.type)}Y.isPointLightShadow!==!0&&this.type===Ps&&w(Y,x),Y.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(M,I,D)};function w(S,T){let x=e.update(y);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new wn(r.x,r.y,{format:cr,type:si}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(T,null,x,h,y,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(T,null,x,d,y,null)}function C(S,T,x,M){let I=null,D=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(D!==void 0)I=D;else if(I=x.isPointLight===!0?c:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let O=I.uuid,k=T.uuid,B=l[O];B===void 0&&(B={},l[O]=B);let P=B[k];P===void 0&&(P=I.clone(),B[k]=P,T.addEventListener("dispose",A)),I=P}if(I.visible=T.visible,I.wireframe=T.wireframe,M===Ps?I.side=T.shadowSide!==null?T.shadowSide:T.side:I.side=T.shadowSide!==null?T.shadowSide:f[T.side],I.alphaMap=T.alphaMap,I.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,I.map=T.map,I.clipShadows=T.clipShadows,I.clippingPlanes=T.clippingPlanes,I.clipIntersection=T.clipIntersection,I.displacementMap=T.displacementMap,I.displacementScale=T.displacementScale,I.displacementBias=T.displacementBias,I.wireframeLinewidth=T.wireframeLinewidth,I.linewidth=T.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let O=n.properties.get(I);O.light=x}return I}function v(S,T,x,M,I){if(S.visible===!1)return;if(S.layers.test(T.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&I===Ps)&&(!S.frustumCulled||S.intersectsFrustum(i))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let k=e.update(S),B=S.material;if(Array.isArray(B)){let P=k.groups;for(let W=0,Y=P.length;W<Y;W++){let te=P[W],X=B[te.materialIndex];if(X&&X.visible){let j=C(S,X,M,I);S.onBeforeShadow(n,S,T,x,k,j,te),n.renderBufferDirect(x,null,k,j,S,te),S.onAfterShadow(n,S,T,x,k,j,te)}}}else if(B.visible){let P=C(S,B,M,I);S.onBeforeShadow(n,S,T,x,k,P,null),n.renderBufferDirect(x,null,k,P,S,null),S.onAfterShadow(n,S,T,x,k,P,null)}}let O=S.children;for(let k=0,B=O.length;k<B;k++)v(O[k],T,x,M,I)}function A(S){S.target.removeEventListener("dispose",A);for(let x in l){let M=l[x],I=S.target.uuid;I in M&&(M[I].dispose(),delete M[I])}}}function gv(n,e){function t(){let L=!1,de=new Lt,K=null,fe=new Lt(0,0,0,0);return{setMask:function(me){K!==me&&!L&&(n.colorMask(me,me,me,me),K=me)},setLocked:function(me){L=me},setClear:function(me,re,Fe,Re,St){St===!0&&(me*=Re,re*=Re,Fe*=Re),de.set(me,re,Fe,Re),fe.equals(de)===!1&&(n.clearColor(me,re,Fe,Re),fe.copy(de))},reset:function(){L=!1,K=null,fe.set(-1,0,0,0)}}}function i(){let L=!1,de=!1,K=null,fe=null,me=null;return{setReversed:function(re){if(de!==re){let Fe=e.get("EXT_clip_control");re?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT),de=re;let Re=me;me=null,this.setClear(Re)}},getReversed:function(){return de},setTest:function(re){re?ee(n.DEPTH_TEST):we(n.DEPTH_TEST)},setMask:function(re){K!==re&&!L&&(n.depthMask(re),K=re)},setFunc:function(re){if(de&&(re=np[re]),fe!==re){switch(re){case qa:n.depthFunc(n.NEVER);break;case Xa:n.depthFunc(n.ALWAYS);break;case Ya:n.depthFunc(n.LESS);break;case ds:n.depthFunc(n.LEQUAL);break;case Za:n.depthFunc(n.EQUAL);break;case $a:n.depthFunc(n.GEQUAL);break;case ja:n.depthFunc(n.GREATER);break;case Ja:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}fe=re}},setLocked:function(re){L=re},setClear:function(re){me!==re&&(me=re,de&&(re=1-re),n.clearDepth(re))},reset:function(){L=!1,K=null,fe=null,me=null,de=!1}}}function r(){let L=!1,de=null,K=null,fe=null,me=null,re=null,Fe=null,Re=null,St=null;return{setTest:function(ft){L||(ft?ee(n.STENCIL_TEST):we(n.STENCIL_TEST))},setMask:function(ft){de!==ft&&!L&&(n.stencilMask(ft),de=ft)},setFunc:function(ft,En,Ln){(K!==ft||fe!==En||me!==Ln)&&(n.stencilFunc(ft,En,Ln),K=ft,fe=En,me=Ln)},setOp:function(ft,En,Ln){(re!==ft||Fe!==En||Re!==Ln)&&(n.stencilOp(ft,En,Ln),re=ft,Fe=En,Re=Ln)},setLocked:function(ft){L=ft},setClear:function(ft){St!==ft&&(n.clearStencil(ft),St=ft)},reset:function(){L=!1,de=null,K=null,fe=null,me=null,re=null,Fe=null,Re=null,St=null}}}let s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap,u={},f={},h={},d=new WeakMap,m=[],y=null,g=!1,p=null,w=null,C=null,v=null,A=null,S=null,T=null,x=new We(0,0,0),M=0,I=!1,D=null,O=null,k=null,B=null,P=null,W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,te=0,X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(X)[1]),Y=te>=1):X.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Y=te>=2);let j=null,ie={},Te=n.getParameter(n.SCISSOR_BOX),Se=n.getParameter(n.VIEWPORT),gt=new Lt().fromArray(Te),Ze=new Lt().fromArray(Se);function at(L,de,K,fe){let me=new Uint8Array(4),re=n.createTexture();n.bindTexture(L,re),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Fe=0;Fe<K;Fe++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,me):n.texImage2D(de+Fe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,me);return re}let z={};z[n.TEXTURE_2D]=at(n.TEXTURE_2D,n.TEXTURE_2D,1),z[n.TEXTURE_CUBE_MAP]=at(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[n.TEXTURE_2D_ARRAY]=at(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),z[n.TEXTURE_3D]=at(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ee(n.DEPTH_TEST),o.setFunc(ds),$e(!1),_t(Wu),ee(n.CULL_FACE),st(mi);function ee(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function we(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function ze(L,de){return h[L]!==de?(n.bindFramebuffer(L,de),h[L]=de,L===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=de),L===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=de),!0):!1}function ve(L,de){let K=m,fe=!1;if(L){K=d.get(de),K===void 0&&(K=[],d.set(de,K));let me=L.textures;if(K.length!==me.length||K[0]!==n.COLOR_ATTACHMENT0){for(let re=0,Fe=me.length;re<Fe;re++)K[re]=n.COLOR_ATTACHMENT0+re;K.length=me.length,fe=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,fe=!0);fe&&n.drawBuffers(K)}function Me(L){return y!==L?(n.useProgram(L),y=L,!0):!1}let je={[Cr]:n.FUNC_ADD,[Sf]:n.FUNC_SUBTRACT,[Mf]:n.FUNC_REVERSE_SUBTRACT};je[Ef]=n.MIN,je[Tf]=n.MAX;let Je={[Cf]:n.ZERO,[Rf]:n.ONE,[If]:n.SRC_COLOR,[Zu]:n.SRC_ALPHA,[Uf]:n.SRC_ALPHA_SATURATE,[Ff]:n.DST_COLOR,[Bf]:n.DST_ALPHA,[Pf]:n.ONE_MINUS_SRC_COLOR,[$u]:n.ONE_MINUS_SRC_ALPHA,[Df]:n.ONE_MINUS_DST_COLOR,[Lf]:n.ONE_MINUS_DST_ALPHA,[Of]:n.CONSTANT_COLOR,[Nf]:n.ONE_MINUS_CONSTANT_COLOR,[kf]:n.CONSTANT_ALPHA,[zf]:n.ONE_MINUS_CONSTANT_ALPHA};function st(L,de,K,fe,me,re,Fe,Re,St,ft){if(L===mi){g===!0&&(we(n.BLEND),g=!1);return}if(g===!1&&(ee(n.BLEND),g=!0),L!==Af){if(L!==p||ft!==I){if((w!==Cr||A!==Cr)&&(n.blendEquation(n.FUNC_ADD),w=Cr,A=Cr),ft)switch(L){case Bs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qu:n.blendFunc(n.ONE,n.ONE);break;case Xu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Yu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ge("WebGLState: Invalid blending: ",L);break}else switch(L){case Bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qu:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Xu:Ge("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yu:Ge("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ge("WebGLState: Invalid blending: ",L);break}C=null,v=null,S=null,T=null,x.set(0,0,0),M=0,p=L,I=ft}return}me=me||de,re=re||K,Fe=Fe||fe,(de!==w||me!==A)&&(n.blendEquationSeparate(je[de],je[me]),w=de,A=me),(K!==C||fe!==v||re!==S||Fe!==T)&&(n.blendFuncSeparate(Je[K],Je[fe],Je[re],Je[Fe]),C=K,v=fe,S=re,T=Fe),(Re.equals(x)===!1||St!==M)&&(n.blendColor(Re.r,Re.g,Re.b,St),x.copy(Re),M=St),p=L,I=!1}function ut(L,de){L.side===kn?we(n.CULL_FACE):ee(n.CULL_FACE);let K=L.side===yn;de&&(K=!K),$e(K),L.blending===Bs&&L.transparent===!1?st(mi):st(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);let fe=L.stencilWrite;a.setTest(fe),fe&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Nt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):we(n.SAMPLE_ALPHA_TO_COVERAGE)}function $e(L){D!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),D=L)}function _t(L){L!==bf?(ee(n.CULL_FACE),L!==O&&(L===Wu?n.cullFace(n.BACK):L===vf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):we(n.CULL_FACE),O=L}function Vt(L){L!==k&&(Y&&n.lineWidth(L),k=L)}function Nt(L,de,K){L?(ee(n.POLYGON_OFFSET_FILL),(B!==de||P!==K)&&(B=de,P=K,o.getReversed()&&(de=-de),n.polygonOffset(de,K))):we(n.POLYGON_OFFSET_FILL)}function pe(L){L?ee(n.SCISSOR_TEST):we(n.SCISSOR_TEST)}function Ut(L){L===void 0&&(L=n.TEXTURE0+W-1),j!==L&&(n.activeTexture(L),j=L)}function U(L,de,K){K===void 0&&(j===null?K=n.TEXTURE0+W-1:K=j);let fe=ie[K];fe===void 0&&(fe={type:void 0,texture:void 0},ie[K]=fe),(fe.type!==L||fe.texture!==de)&&(j!==K&&(n.activeTexture(K),j=K),n.bindTexture(L,de||z[L]),fe.type=L,fe.texture=de)}function kt(){let L=ie[j];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function dt(){try{n.compressedTexImage2D(...arguments)}catch(L){Ge("WebGLState:",L)}}function E(){try{n.compressedTexImage3D(...arguments)}catch(L){Ge("WebGLState:",L)}}function _(){try{n.texSubImage2D(...arguments)}catch(L){Ge("WebGLState:",L)}}function N(){try{n.texSubImage3D(...arguments)}catch(L){Ge("WebGLState:",L)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(L){Ge("WebGLState:",L)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(L){Ge("WebGLState:",L)}}function oe(){try{n.texStorage2D(...arguments)}catch(L){Ge("WebGLState:",L)}}function ce(){try{n.texStorage3D(...arguments)}catch(L){Ge("WebGLState:",L)}}function $(){try{n.texImage2D(...arguments)}catch(L){Ge("WebGLState:",L)}}function Q(){try{n.texImage3D(...arguments)}catch(L){Ge("WebGLState:",L)}}function le(L){return f[L]!==void 0?f[L]:n.getParameter(L)}function Ce(L,de){f[L]!==de&&(n.pixelStorei(L,de),f[L]=de)}function ue(L){gt.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),gt.copy(L))}function he(L){Ze.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Ze.copy(L))}function Le(L,de){let K=l.get(de);K===void 0&&(K=new WeakMap,l.set(de,K));let fe=K.get(L);fe===void 0&&(fe=n.getUniformBlockIndex(de,L.name),K.set(L,fe))}function ke(L,de){let fe=l.get(de).get(L);c.get(de)!==fe&&(n.uniformBlockBinding(de,fe,L.__bindingPointIndex),c.set(de,fe))}function Ve(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},j=null,ie={},h={},d=new WeakMap,m=[],y=null,g=!1,p=null,w=null,C=null,v=null,A=null,S=null,T=null,x=new We(0,0,0),M=0,I=!1,D=null,O=null,k=null,B=null,P=null,gt.set(0,0,n.canvas.width,n.canvas.height),Ze.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ee,disable:we,bindFramebuffer:ze,drawBuffers:ve,useProgram:Me,setBlending:st,setMaterial:ut,setFlipSided:$e,setCullFace:_t,setLineWidth:Vt,setPolygonOffset:Nt,setScissorTest:pe,activeTexture:Ut,bindTexture:U,unbindTexture:kt,compressedTexImage2D:dt,compressedTexImage3D:E,texImage2D:$,texImage3D:Q,pixelStorei:Ce,getParameter:le,updateUBOMapping:Le,uniformBlockBinding:ke,texStorage2D:oe,texStorage3D:ce,texSubImage2D:_,texSubImage3D:N,compressedTexSubImage2D:G,compressedTexSubImage3D:Z,scissor:ue,viewport:he,reset:Ve}}function _v(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ge,u=new WeakMap,f=new Set,h,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(E,_){return m?new OffscreenCanvas(E,_):xo("canvas")}function g(E,_,N){let G=1,Z=dt(E);if((Z.width>N||Z.height>N)&&(G=N/Math.max(Z.width,Z.height)),G<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let oe=Math.floor(G*Z.width),ce=Math.floor(G*Z.height);h===void 0&&(h=y(oe,ce));let $=_?y(oe,ce):h;return $.width=oe,$.height=ce,$.getContext("2d").drawImage(E,0,0,oe,ce),He("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+oe+"x"+ce+")."),$}else return"data"in E&&He("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),E;return E}function p(E){return E.generateMipmaps}function w(E){n.generateMipmap(E)}function C(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(E,_,N,G,Z,oe=!1){if(E!==null){if(n[E]!==void 0)return n[E];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ce;G&&(ce=e.get("EXT_texture_norm16"),ce||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=_;if(_===n.RED&&(N===n.FLOAT&&($=n.R32F),N===n.HALF_FLOAT&&($=n.R16F),N===n.UNSIGNED_BYTE&&($=n.R8),N===n.UNSIGNED_SHORT&&ce&&($=ce.R16_EXT),N===n.SHORT&&ce&&($=ce.R16_SNORM_EXT)),_===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.R8UI),N===n.UNSIGNED_SHORT&&($=n.R16UI),N===n.UNSIGNED_INT&&($=n.R32UI),N===n.BYTE&&($=n.R8I),N===n.SHORT&&($=n.R16I),N===n.INT&&($=n.R32I)),_===n.RG&&(N===n.FLOAT&&($=n.RG32F),N===n.HALF_FLOAT&&($=n.RG16F),N===n.UNSIGNED_BYTE&&($=n.RG8),N===n.UNSIGNED_SHORT&&ce&&($=ce.RG16_EXT),N===n.SHORT&&ce&&($=ce.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RG8UI),N===n.UNSIGNED_SHORT&&($=n.RG16UI),N===n.UNSIGNED_INT&&($=n.RG32UI),N===n.BYTE&&($=n.RG8I),N===n.SHORT&&($=n.RG16I),N===n.INT&&($=n.RG32I)),_===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RGB8UI),N===n.UNSIGNED_SHORT&&($=n.RGB16UI),N===n.UNSIGNED_INT&&($=n.RGB32UI),N===n.BYTE&&($=n.RGB8I),N===n.SHORT&&($=n.RGB16I),N===n.INT&&($=n.RGB32I)),_===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RGBA8UI),N===n.UNSIGNED_SHORT&&($=n.RGBA16UI),N===n.UNSIGNED_INT&&($=n.RGBA32UI),N===n.BYTE&&($=n.RGBA8I),N===n.SHORT&&($=n.RGBA16I),N===n.INT&&($=n.RGBA32I)),_===n.RGB&&(N===n.UNSIGNED_SHORT&&ce&&($=ce.RGB16_EXT),N===n.SHORT&&ce&&($=ce.RGB16_SNORM_EXT),N===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),_===n.RGBA){let Q=oe?yo:ot.getTransfer(Z);N===n.FLOAT&&($=n.RGBA32F),N===n.HALF_FLOAT&&($=n.RGBA16F),N===n.UNSIGNED_BYTE&&($=Q===bt?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT&&ce&&($=ce.RGBA16_EXT),N===n.SHORT&&ce&&($=ce.RGBA16_SNORM_EXT),N===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function A(E,_){let N;return E?_===null||_===ri||_===Fs?N=n.DEPTH24_STENCIL8:_===zn?N=n.DEPTH32F_STENCIL8:_===Ls&&(N=n.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ri||_===Fs?N=n.DEPTH_COMPONENT24:_===zn?N=n.DEPTH_COMPONENT32F:_===Ls&&(N=n.DEPTH_COMPONENT16),N}function S(E,_){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==tn&&E.minFilter!==rn?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function T(E){let _=E.target;_.removeEventListener("dispose",T),M(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&f.delete(_)}function x(E){let _=E.target;_.removeEventListener("dispose",x),D(_)}function M(E){let _=i.get(E);if(_.__webglInit===void 0)return;let N=E.source,G=d.get(N);if(G){let Z=G[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&I(E),Object.keys(G).length===0&&d.delete(N)}i.remove(E)}function I(E){let _=i.get(E);n.deleteTexture(_.__webglTexture);let N=E.source,G=d.get(N);delete G[_.__cacheKey],o.memory.textures--}function D(E){let _=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(_.__webglFramebuffer[G]))for(let Z=0;Z<_.__webglFramebuffer[G].length;Z++)n.deleteFramebuffer(_.__webglFramebuffer[G][Z]);else n.deleteFramebuffer(_.__webglFramebuffer[G]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[G])}else{if(Array.isArray(_.__webglFramebuffer))for(let G=0;G<_.__webglFramebuffer.length;G++)n.deleteFramebuffer(_.__webglFramebuffer[G]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let G=0;G<_.__webglColorRenderbuffer.length;G++)_.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[G]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let N=E.textures;for(let G=0,Z=N.length;G<Z;G++){let oe=i.get(N[G]);oe.__webglTexture&&(n.deleteTexture(oe.__webglTexture),o.memory.textures--),i.remove(N[G])}i.remove(E)}let O=0;function k(){O=0}function B(){return O}function P(E){O=E}function W(){let E=O;return E>=r.maxTextures&&He("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+r.maxTextures),O+=1,E}function Y(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function te(E,_){let N=i.get(E);if(E.isVideoTexture&&U(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&N.__version!==E.version){let G=E.image;if(G===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{we(N,E,_);return}}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+_)}function X(E,_){let N=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){we(N,E,_);return}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+_)}function j(E,_){let N=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){we(N,E,_);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+_)}function ie(E,_){let N=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&N.__version!==E.version){ze(N,E,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+_)}let Te={[fs]:n.REPEAT,[di]:n.CLAMP_TO_EDGE,[Ka]:n.MIRRORED_REPEAT},Se={[tn]:n.NEAREST,[Gf]:n.NEAREST_MIPMAP_NEAREST,[Xo]:n.NEAREST_MIPMAP_LINEAR,[rn]:n.LINEAR,[Dc]:n.LINEAR_MIPMAP_NEAREST,[or]:n.LINEAR_MIPMAP_LINEAR},gt={[Yf]:n.NEVER,[Kf]:n.ALWAYS,[Zf]:n.LESS,[bl]:n.LEQUAL,[$f]:n.EQUAL,[vl]:n.GEQUAL,[jf]:n.GREATER,[Jf]:n.NOTEQUAL};function Ze(E,_){if(_.type===zn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===rn||_.magFilter===Dc||_.magFilter===Xo||_.magFilter===or||_.minFilter===rn||_.minFilter===Dc||_.minFilter===Xo||_.minFilter===or)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,Te[_.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,Te[_.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,Te[_.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,Se[_.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,Se[_.minFilter]),_.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,gt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===tn||_.minFilter!==Xo&&_.minFilter!==or||_.type===zn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function at(E,_){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",T));let G=_.source,Z=d.get(G);Z===void 0&&(Z={},d.set(G,Z));let oe=Y(_);if(oe!==E.__cacheKey){Z[oe]===void 0&&(Z[oe]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),Z[oe].usedTimes++;let ce=Z[E.__cacheKey];ce!==void 0&&(Z[E.__cacheKey].usedTimes--,ce.usedTimes===0&&I(_)),E.__cacheKey=oe,E.__webglTexture=Z[oe].texture}return N}function z(E,_,N){return Math.floor(Math.floor(E/N)/_)}function ee(E,_,N,G){let oe=E.updateRanges;if(oe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,N,G,_.data);else{oe.sort((Ce,ue)=>Ce.start-ue.start);let ce=0;for(let Ce=1;Ce<oe.length;Ce++){let ue=oe[ce],he=oe[Ce],Le=ue.start+ue.count,ke=z(he.start,_.width,4),Ve=z(ue.start,_.width,4);he.start<=Le+1&&ke===Ve&&z(he.start+he.count-1,_.width,4)===ke?ue.count=Math.max(ue.count,he.start+he.count-ue.start):(++ce,oe[ce]=he)}oe.length=ce+1;let $=t.getParameter(n.UNPACK_ROW_LENGTH),Q=t.getParameter(n.UNPACK_SKIP_PIXELS),le=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Ce=0,ue=oe.length;Ce<ue;Ce++){let he=oe[Ce],Le=Math.floor(he.start/4),ke=Math.ceil(he.count/4),Ve=Le%_.width,L=Math.floor(Le/_.width),de=ke,K=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ve),t.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,Ve,L,de,K,N,G,_.data)}E.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,$),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(n.UNPACK_SKIP_ROWS,le)}}function we(E,_,N){let G=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(G=n.TEXTURE_3D);let Z=at(E,_),oe=_.source;t.bindTexture(G,E.__webglTexture,n.TEXTURE0+N);let ce=i.get(oe);if(oe.version!==ce.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+N),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let K=ot.getPrimaries(ot.workingColorSpace),fe=_.colorSpace===Di?null:ot.getPrimaries(_.colorSpace),me=_.colorSpace===Di||K===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let Q=g(_.image,!1,r.maxTextureSize);Q=kt(_,Q);let le=s.convert(_.format,_.colorSpace),Ce=s.convert(_.type),ue=v(_.internalFormat,le,Ce,_.normalized,_.colorSpace,_.isVideoTexture);Ze(G,_);let he,Le=_.mipmaps,ke=_.isVideoTexture!==!0,Ve=ce.__version===void 0||Z===!0,L=oe.dataReady,de=S(_,Q);if(_.isDepthTexture)ue=A(_.format===ar,_.type),Ve&&(ke?t.texStorage2D(n.TEXTURE_2D,1,ue,Q.width,Q.height):t.texImage2D(n.TEXTURE_2D,0,ue,Q.width,Q.height,0,le,Ce,null));else if(_.isDataTexture)if(Le.length>0){ke&&Ve&&t.texStorage2D(n.TEXTURE_2D,de,ue,Le[0].width,Le[0].height);for(let K=0,fe=Le.length;K<fe;K++)he=Le[K],ke?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,he.width,he.height,le,Ce,he.data):t.texImage2D(n.TEXTURE_2D,K,ue,he.width,he.height,0,le,Ce,he.data);_.generateMipmaps=!1}else ke?(Ve&&t.texStorage2D(n.TEXTURE_2D,de,ue,Q.width,Q.height),L&&ee(_,Q,le,Ce)):t.texImage2D(n.TEXTURE_2D,0,ue,Q.width,Q.height,0,le,Ce,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){ke&&Ve&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,ue,Le[0].width,Le[0].height,Q.depth);for(let K=0,fe=Le.length;K<fe;K++)if(he=Le[K],_.format!==Vn)if(le!==null)if(ke){if(L)if(_.layerUpdates.size>0){let me=_h(he.width,he.height,_.format,_.type);for(let re of _.layerUpdates){let Fe=he.data.subarray(re*me/he.data.BYTES_PER_ELEMENT,(re+1)*me/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,re,he.width,he.height,1,le,Fe)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,he.width,he.height,Q.depth,le,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,ue,he.width,he.height,Q.depth,0,he.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,he.width,he.height,Q.depth,le,Ce,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,ue,he.width,he.height,Q.depth,0,le,Ce,he.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{ke&&Ve&&t.texStorage2D(n.TEXTURE_2D,de,ue,Le[0].width,Le[0].height);for(let K=0,fe=Le.length;K<fe;K++)he=Le[K],_.format!==Vn?le!==null?ke?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,he.width,he.height,le,he.data):t.compressedTexImage2D(n.TEXTURE_2D,K,ue,he.width,he.height,0,he.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,he.width,he.height,le,Ce,he.data):t.texImage2D(n.TEXTURE_2D,K,ue,he.width,he.height,0,le,Ce,he.data)}else if(_.isDataArrayTexture)if(ke){if(Ve&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,ue,Q.width,Q.height,Q.depth),L)if(_.layerUpdates.size>0){let K=_h(Q.width,Q.height,_.format,_.type);for(let fe of _.layerUpdates){let me=Q.data.subarray(fe*K/Q.data.BYTES_PER_ELEMENT,(fe+1)*K/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,fe,Q.width,Q.height,1,le,Ce,me)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,le,Ce,Q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ue,Q.width,Q.height,Q.depth,0,le,Ce,Q.data);else if(_.isData3DTexture)ke?(Ve&&t.texStorage3D(n.TEXTURE_3D,de,ue,Q.width,Q.height,Q.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,le,Ce,Q.data)):t.texImage3D(n.TEXTURE_3D,0,ue,Q.width,Q.height,Q.depth,0,le,Ce,Q.data);else if(_.isFramebufferTexture){if(Ve)if(ke)t.texStorage2D(n.TEXTURE_2D,de,ue,Q.width,Q.height);else{let K=Q.width,fe=Q.height;for(let me=0;me<de;me++)t.texImage2D(n.TEXTURE_2D,me,ue,K,fe,0,le,Ce,null),K>>=1,fe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let K=n.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),Q.parentNode!==K){K.appendChild(Q),f.add(_),K.onpaint=fe=>{let me=fe.changedElements;for(let re of f)me.includes(re.image)&&(re.needsUpdate=!0)},K.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Q);else{let me=n.RGBA,re=n.RGBA,Fe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,me,re,Fe,Q)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Le.length>0){if(ke&&Ve){let K=dt(Le[0]);t.texStorage2D(n.TEXTURE_2D,de,ue,K.width,K.height)}for(let K=0,fe=Le.length;K<fe;K++)he=Le[K],ke?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,le,Ce,he):t.texImage2D(n.TEXTURE_2D,K,ue,le,Ce,he);_.generateMipmaps=!1}else if(ke){if(Ve){let K=dt(Q);t.texStorage2D(n.TEXTURE_2D,de,ue,K.width,K.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,le,Ce,Q)}else t.texImage2D(n.TEXTURE_2D,0,ue,le,Ce,Q);p(_)&&w(G),ce.__version=oe.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function ze(E,_,N){if(_.image.length!==6)return;let G=at(E,_),Z=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+N);let oe=i.get(Z);if(Z.version!==oe.__version||G===!0){t.activeTexture(n.TEXTURE0+N);let ce=ot.getPrimaries(ot.workingColorSpace),$=_.colorSpace===Di?null:ot.getPrimaries(_.colorSpace),Q=_.colorSpace===Di||ce===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let le=_.isCompressedTexture||_.image[0].isCompressedTexture,Ce=_.image[0]&&_.image[0].isDataTexture,ue=[];for(let re=0;re<6;re++)!le&&!Ce?ue[re]=g(_.image[re],!0,r.maxCubemapSize):ue[re]=Ce?_.image[re].image:_.image[re],ue[re]=kt(_,ue[re]);let he=ue[0],Le=s.convert(_.format,_.colorSpace),ke=s.convert(_.type),Ve=v(_.internalFormat,Le,ke,_.normalized,_.colorSpace),L=_.isVideoTexture!==!0,de=oe.__version===void 0||G===!0,K=Z.dataReady,fe=S(_,he);Ze(n.TEXTURE_CUBE_MAP,_);let me;if(le){L&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Ve,he.width,he.height);for(let re=0;re<6;re++){me=ue[re].mipmaps;for(let Fe=0;Fe<me.length;Fe++){let Re=me[Fe];_.format!==Vn?Le!==null?L?K&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Fe,0,0,Re.width,Re.height,Le,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Fe,Ve,Re.width,Re.height,0,Re.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Fe,0,0,Re.width,Re.height,Le,ke,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Fe,Ve,Re.width,Re.height,0,Le,ke,Re.data)}}}else{if(me=_.mipmaps,L&&de){me.length>0&&fe++;let re=dt(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Ve,re.width,re.height)}for(let re=0;re<6;re++)if(Ce){L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ue[re].width,ue[re].height,Le,ke,ue[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ve,ue[re].width,ue[re].height,0,Le,ke,ue[re].data);for(let Fe=0;Fe<me.length;Fe++){let St=me[Fe].image[re].image;L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Fe+1,0,0,St.width,St.height,Le,ke,St.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Fe+1,Ve,St.width,St.height,0,Le,ke,St.data)}}else{L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Le,ke,ue[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ve,Le,ke,ue[re]);for(let Fe=0;Fe<me.length;Fe++){let Re=me[Fe];L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Fe+1,0,0,Le,ke,Re.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Fe+1,Ve,Le,ke,Re.image[re])}}}p(_)&&w(n.TEXTURE_CUBE_MAP),oe.__version=Z.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function ve(E,_,N,G,Z,oe){let ce=s.convert(N.format,N.colorSpace),$=s.convert(N.type),Q=v(N.internalFormat,ce,$,N.normalized,N.colorSpace),le=i.get(_),Ce=i.get(N);if(Ce.__renderTarget=_,!le.__hasExternalTextures){let ue=Math.max(1,_.width>>oe),he=Math.max(1,_.height>>oe);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,oe,Q,ue,he,_.depth,0,ce,$,null):t.texImage2D(Z,oe,Q,ue,he,0,ce,$,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),Ut(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,Z,Ce.__webglTexture,0,pe(_)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,Z,Ce.__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Me(E,_,N){if(n.bindRenderbuffer(n.RENDERBUFFER,E),_.depthBuffer){let G=_.depthTexture,Z=G&&G.isDepthTexture?G.type:null,oe=A(_.stencilBuffer,Z),ce=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ut(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pe(_),oe,_.width,_.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,pe(_),oe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,oe,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,E)}else{let G=_.textures;for(let Z=0;Z<G.length;Z++){let oe=G[Z],ce=s.convert(oe.format,oe.colorSpace),$=s.convert(oe.type),Q=v(oe.internalFormat,ce,$,oe.normalized,oe.colorSpace);Ut(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pe(_),Q,_.width,_.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,pe(_),Q,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Q,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function je(E,_,N){let G=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=i.get(_.depthTexture);if(Z.__renderTarget=_,(!Z.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),G){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,_.depthTexture.addEventListener("dispose",T)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Ze(n.TEXTURE_CUBE_MAP,_.depthTexture);let le=s.convert(_.depthTexture.format),Ce=s.convert(_.depthTexture.type),ue;_.depthTexture.format===fi?ue=n.DEPTH_COMPONENT24:_.depthTexture.format===ar&&(ue=n.DEPTH24_STENCIL8);for(let he=0;he<6;he++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ue,_.width,_.height,0,le,Ce,null)}}else te(_.depthTexture,0);let oe=Z.__webglTexture,ce=pe(_),$=G?n.TEXTURE_CUBE_MAP_POSITIVE_X+N:n.TEXTURE_2D,Q=_.depthTexture.format===ar?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===fi)Ut(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,$,oe,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,Q,$,oe,0);else if(_.depthTexture.format===ar)Ut(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,$,oe,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,Q,$,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Je(E){let _=i.get(E),N=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){let G=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),G){let Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,G.removeEventListener("dispose",Z)};G.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=G}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(N)for(let G=0;G<6;G++)je(_.__webglFramebuffer[G],E,G);else{let G=E.texture.mipmaps;G&&G.length>0?je(_.__webglFramebuffer[0],E,0):je(_.__webglFramebuffer,E,0)}else if(N){_.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[G]),_.__webglDepthbuffer[G]===void 0)_.__webglDepthbuffer[G]=n.createRenderbuffer(),Me(_.__webglDepthbuffer[G],E,!1);else{let Z=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,oe)}}else{let G=E.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Me(_.__webglDepthbuffer,E,!1);else{let Z=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,oe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function st(E,_,N){let G=i.get(E);_!==void 0&&ve(G.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Je(E)}function ut(E){let _=E.texture,N=i.get(E),G=i.get(_);E.addEventListener("dispose",x);let Z=E.textures,oe=E.isWebGLCubeRenderTarget===!0,ce=Z.length>1;if(ce||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=_.version,o.memory.textures++),oe){N.__webglFramebuffer=[];for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[$]=[];for(let Q=0;Q<_.mipmaps.length;Q++)N.__webglFramebuffer[$][Q]=n.createFramebuffer()}else N.__webglFramebuffer[$]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let $=0;$<_.mipmaps.length;$++)N.__webglFramebuffer[$]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(ce)for(let $=0,Q=Z.length;$<Q;$++){let le=i.get(Z[$]);le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture(),o.memory.textures++)}if(E.samples>0&&Ut(E)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let $=0;$<Z.length;$++){let Q=Z[$];N.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[$]);let le=s.convert(Q.format,Q.colorSpace),Ce=s.convert(Q.type),ue=v(Q.internalFormat,le,Ce,Q.normalized,Q.colorSpace,E.isXRRenderTarget===!0),he=pe(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,he,ue,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,N.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),Me(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(oe){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),Ze(n.TEXTURE_CUBE_MAP,_);for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)ve(N.__webglFramebuffer[$][Q],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Q);else ve(N.__webglFramebuffer[$],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);p(_)&&w(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let $=0,Q=Z.length;$<Q;$++){let le=Z[$],Ce=i.get(le),ue=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ue=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,Ce.__webglTexture),Ze(ue,le),ve(N.__webglFramebuffer,E,le,n.COLOR_ATTACHMENT0+$,ue,0),p(le)&&w(ue)}t.unbindTexture()}else{let $=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&($=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture($,G.__webglTexture),Ze($,_),_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)ve(N.__webglFramebuffer[Q],E,_,n.COLOR_ATTACHMENT0,$,Q);else ve(N.__webglFramebuffer,E,_,n.COLOR_ATTACHMENT0,$,0);p(_)&&w($),t.unbindTexture()}E.depthBuffer&&Je(E)}function $e(E){let _=E.textures;for(let N=0,G=_.length;N<G;N++){let Z=_[N];if(p(Z)){let oe=C(E),ce=i.get(Z).__webglTexture;t.bindTexture(oe,ce),w(oe),t.unbindTexture()}}}let _t=[],Vt=[];function Nt(E){if(E.samples>0){if(Ut(E)===!1){let _=E.textures,N=E.width,G=E.height,Z=n.COLOR_BUFFER_BIT,oe=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(E),$=_.length>1;if($)for(let le=0;le<_.length;le++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);let Q=E.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let le=0;le<_.length;le++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[le]);let Ce=i.get(_[le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ce,0)}n.blitFramebuffer(0,0,N,G,0,0,N,G,Z,n.NEAREST),c===!0&&(_t.length=0,Vt.length=0,_t.push(n.COLOR_ATTACHMENT0+le),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&(_t.push(oe),Vt.push(oe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Vt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let le=0;le<_.length;le++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,ce.__webglColorRenderbuffer[le]);let Ce=i.get(_[le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,Ce,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&c){let _=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function pe(E){return Math.min(r.maxSamples,E.samples)}function Ut(E){let _=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(E){let _=o.render.frame;u.get(E)!==_&&(u.set(E,_),E.update())}function kt(E,_){let N=E.colorSpace,G=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==_o&&N!==Di&&(ot.getTransfer(N)===bt?(G!==Vn||Z!==An)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ge("WebGLTextures: Unsupported texture color space:",N)),_}function dt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=k,this.getTextureUnits=B,this.setTextureUnits=P,this.setTexture2D=te,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=ie,this.rebindTextures=st,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Ut,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function yv(n,e){function t(i,r=Di){let s,o=ot.getTransfer(r);if(i===An)return n.UNSIGNED_BYTE;if(i===Oc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Nc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===oh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ah)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===rh)return n.BYTE;if(i===sh)return n.SHORT;if(i===Ls)return n.UNSIGNED_SHORT;if(i===Uc)return n.INT;if(i===ri)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===si)return n.HALF_FLOAT;if(i===ch)return n.ALPHA;if(i===lh)return n.RGB;if(i===Vn)return n.RGBA;if(i===fi)return n.DEPTH_COMPONENT;if(i===ar)return n.DEPTH_STENCIL;if(i===kc)return n.RED;if(i===zc)return n.RED_INTEGER;if(i===cr)return n.RG;if(i===Vc)return n.RG_INTEGER;if(i===Hc)return n.RGBA_INTEGER;if(i===Yo||i===Zo||i===$o||i===jo)if(o===bt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Yo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Zo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$o)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===jo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Yo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Zo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$o)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===jo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Gc||i===Wc||i===qc||i===Xc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Gc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Wc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===qc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Xc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Yc||i===Zc||i===$c||i===jc||i===Jc||i===Jo||i===Kc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Yc||i===Zc)return o===bt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===$c)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===jc)return s.COMPRESSED_R11_EAC;if(i===Jc)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Jo)return s.COMPRESSED_RG11_EAC;if(i===Kc)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Qc||i===el||i===tl||i===nl||i===il||i===rl||i===sl||i===ol||i===al||i===cl||i===ll||i===ul||i===hl||i===dl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Qc)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===el)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===tl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===nl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===il)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===rl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===sl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ol)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===al)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===cl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ll)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ul)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===hl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===dl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fl||i===pl||i===ml)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===fl)return o===bt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===pl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ml)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===gl||i===_l||i===Ko||i===yl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===gl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===_l)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ko)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===yl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Fs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var xv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ph=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Bo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new _n({vertexShader:xv,fragmentShader:bv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qt(new Ki(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Bh=class extends ei{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,m=null,y=typeof XRWebGLBinding<"u",g=new Ph,p={},w=t.getContextAttributes(),C=null,v=null,A=[],S=[],T=new ge,x=null,M=null,I=new ln;I.viewport=new Lt;let D=new ln;D.viewport=new Lt;let O=[I,D],k=new Pc,B=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let ee=A[z];return ee===void 0&&(ee=new xs,A[z]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(z){let ee=A[z];return ee===void 0&&(ee=new xs,A[z]=ee),ee.getGripSpace()},this.getHand=function(z){let ee=A[z];return ee===void 0&&(ee=new xs,A[z]=ee),ee.getHandSpace()};function W(z){let ee=S.indexOf(z.inputSource);if(ee===-1)return;let we=A[ee];we!==void 0&&(we.update(z.inputSource,z.frame,l||o),we.dispatchEvent({type:z.type,data:z.inputSource}))}function Y(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",te);for(let z=0;z<A.length;z++){let ee=S[z];ee!==null&&(S[z]=null,A[z].disconnect(ee))}B=null,P=null,g.reset();for(let z in p)delete p[z];if(e.setRenderTarget(C),d=null,h=null,f=null,r=null,v=null,at.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(T.width,T.height,!1),M!==null){let z=M.camera;z.fov=M.fov,z.zoom=M.zoom,z.updateProjectionMatrix(),M=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,i.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,i.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(z){l=z},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",te),w.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(T),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let we=null,ze=null,ve=null;w.depth&&(ve=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,we=w.stencil?ar:fi,ze=w.stencil?Fs:ri);let Me={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(Me),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new wn(h.textureWidth,h.textureHeight,{format:Vn,type:An,depthTexture:new ji(h.textureWidth,h.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let we={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,we),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new wn(d.framebufferWidth,d.framebufferHeight,{format:Vn,type:An,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),at.setContext(r),at.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function te(z){for(let ee=0;ee<z.removed.length;ee++){let we=z.removed[ee],ze=S.indexOf(we);ze>=0&&(S[ze]=null,A[ze].disconnect(we))}for(let ee=0;ee<z.added.length;ee++){let we=z.added[ee],ze=S.indexOf(we);if(ze===-1){for(let Me=0;Me<A.length;Me++)if(Me>=S.length){S.push(we),ze=Me;break}else if(S[Me]===null){S[Me]=we,ze=Me;break}if(ze===-1)break}let ve=A[ze];ve&&ve.connect(we)}}let X=new R,j=new R;function ie(z,ee,we){X.setFromMatrixPosition(ee.matrixWorld),j.setFromMatrixPosition(we.matrixWorld);let ze=X.distanceTo(j),ve=ee.projectionMatrix.elements,Me=we.projectionMatrix.elements,je=ve[14]/(ve[10]-1),Je=ve[14]/(ve[10]+1),st=(ve[9]+1)/ve[5],ut=(ve[9]-1)/ve[5],$e=(ve[8]-1)/ve[0],_t=(Me[8]+1)/Me[0],Vt=je*$e,Nt=je*_t,pe=ze/(-$e+_t),Ut=pe*-$e;if(ee.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ut),z.translateZ(pe),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),ve[10]===-1)z.projectionMatrix.copy(ee.projectionMatrix),z.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{let U=je+pe,kt=Je+pe,dt=Vt-Ut,E=Nt+(ze-Ut),_=st*Je/kt*U,N=ut*Je/kt*U;z.projectionMatrix.makePerspective(dt,E,_,N,U,kt),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function Te(z,ee){ee===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(ee.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;let ee=z.near,we=z.far;g.texture!==null&&(g.depthNear>0&&(ee=g.depthNear),g.depthFar>0&&(we=g.depthFar)),k.near=D.near=I.near=ee,k.far=D.far=I.far=we,(B!==k.near||P!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),B=k.near,P=k.far),k.layers.mask=z.layers.mask|6,I.layers.mask=k.layers.mask&-5,D.layers.mask=k.layers.mask&-3;let ze=z.parent,ve=k.cameras;Te(k,ze);for(let Me=0;Me<ve.length;Me++)Te(ve[Me],ze);ve.length===2?ie(k,I,D):k.projectionMatrix.copy(I.projectionMatrix),M===null&&z.isPerspectiveCamera&&(M={camera:z,fov:z.fov,zoom:z.zoom}),Se(z,k,ze)};function Se(z,ee,we){we===null?z.matrix.copy(ee.matrixWorld):(z.matrix.copy(we.matrixWorld),z.matrix.invert(),z.matrix.multiply(ee.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(ee.projectionMatrix),z.projectionMatrixInverse.copy(ee.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=gs*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(z){c=z,h!==null&&(h.fixedFoveation=z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(z){return p[z]};let gt=null;function Ze(z,ee){if(u=ee.getViewerPose(l||o),m=ee,u!==null){let we=u.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let ze=!1;we.length!==k.cameras.length&&(k.cameras.length=0,ze=!0);for(let Je=0;Je<we.length;Je++){let st=we[Je],ut=null;if(d!==null)ut=d.getViewport(st);else{let _t=f.getViewSubImage(h,st);ut=_t.viewport,Je===0&&(e.setRenderTargetTextures(v,_t.colorTexture,_t.depthStencilTexture),e.setRenderTarget(v))}let $e=O[Je];$e===void 0&&($e=new ln,$e.layers.enable(Je),$e.viewport=new Lt,O[Je]=$e),$e.matrix.fromArray(st.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(st.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(ut.x,ut.y,ut.width,ut.height),Je===0&&(k.matrix.copy($e.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),ze===!0&&k.cameras.push($e)}let ve=r.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){f=i.getBinding();let Je=f.getDepthInformation(we[0]);Je&&Je.isValid&&Je.texture&&g.init(Je,r.renderState)}if(ve&&ve.includes("camera-access")&&y){e.state.unbindTexture(),f=i.getBinding();for(let Je=0;Je<we.length;Je++){let st=we[Je].camera;if(st){let ut=p[st];ut||(ut=new Bo,p[st]=ut);let $e=f.getCameraImage(st);ut.sourceTexture=$e}}}}for(let we=0;we<A.length;we++){let ze=S[we],ve=A[we];ze!==null&&ve!==void 0&&ve.update(ze,ee,l||o)}gt&&gt(z,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),m=null}let at=new Rp;at.setAnimationLoop(Ze),this.setAnimationLoop=function(z){gt=z},this.dispose=function(){}}},vv=new nt,Dp=new Ye;Dp.set(-1,0,0,0,1,0,0,0,1);function wv(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,ph(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,w,C,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),f(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),h(g,p),p.isMeshPhysicalMaterial&&d(g,p,v)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),y(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,w,C):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===yn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===yn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let w=e.get(p),C=w.envMap,v=w.envMapRotation;C&&(g.envMap.value=C,g.envMapRotation.value.setFromMatrix4(vv.makeRotationFromEuler(v)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Dp),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,w,C){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*w,g.scale.value=C*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,w){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===yn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let w=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Av(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,A){let S=A.program;i.uniformBlockBinding(v,S)}function l(v,A){let S=r[v.id];S===void 0&&(g(v),S=u(v),r[v.id]=S,v.addEventListener("dispose",w));let T=A.program;i.updateUBOMapping(v,T);let x=e.render.frame;s[v.id]!==x&&(h(v),s[v.id]=x)}function u(v){let A=f();v.__bindingPointIndex=A;let S=n.createBuffer(),T=v.__size,x=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,T,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,S),S}function f(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Ge("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){let A=r[v.id],S=v.uniforms,T=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let x=0,M=S.length;x<M;x++){let I=S[x];if(Array.isArray(I))for(let D=0,O=I.length;D<O;D++)d(I[D],x,D,T);else d(I,x,0,T)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(v,A,S,T){if(y(v,A,S,T)===!0){let x=v.__offset,M=v.value;if(Array.isArray(M)){let I=0;for(let D=0;D<M.length;D++){let O=M[D],k=p(O);m(O,v.__data,I),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(I+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(M,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,v.__data)}}function m(v,A,S){typeof v=="number"||typeof v=="boolean"?A[0]=v:v.isMatrix3?(A[0]=v.elements[0],A[1]=v.elements[1],A[2]=v.elements[2],A[3]=0,A[4]=v.elements[3],A[5]=v.elements[4],A[6]=v.elements[5],A[7]=0,A[8]=v.elements[6],A[9]=v.elements[7],A[10]=v.elements[8],A[11]=0):ArrayBuffer.isView(v)?A.set(new v.constructor(v.buffer,v.byteOffset,A.length)):v.toArray(A,S)}function y(v,A,S,T){let x=v.value,M=A+"_"+S;if(T[M]===void 0)return typeof x=="number"||typeof x=="boolean"?T[M]=x:ArrayBuffer.isView(x)?T[M]=x.slice():T[M]=x.clone(),!0;{let I=T[M];if(typeof x=="number"||typeof x=="boolean"){if(I!==x)return T[M]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(I.equals(x)===!1)return I.copy(x),!0}}return!1}function g(v){let A=v.uniforms,S=0,T=16;for(let M=0,I=A.length;M<I;M++){let D=Array.isArray(A[M])?A[M]:[A[M]];for(let O=0,k=D.length;O<k;O++){let B=D[O],P=Array.isArray(B.value)?B.value:[B.value];for(let W=0,Y=P.length;W<Y;W++){let te=P[W],X=p(te),j=S%T,ie=j%X.boundary,Te=j+ie;S+=ie,Te!==0&&T-Te<X.storage&&(S+=T-Te),B.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=X.storage}}}let x=S%T;return x>0&&(S+=T-x),v.__size=S,v.__cache={},this}function p(v){let A={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(A.boundary=4,A.storage=4):v.isVector2?(A.boundary=8,A.storage=8):v.isVector3||v.isColor?(A.boundary=16,A.storage=12):v.isVector4?(A.boundary=16,A.storage=16):v.isMatrix3?(A.boundary=48,A.storage=48):v.isMatrix4?(A.boundary=64,A.storage=64):v.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(A.boundary=16,A.storage=v.byteLength):He("WebGLRenderer: Unsupported uniform value type.",v),A}function w(v){let A=v.target;A.removeEventListener("dispose",w);let S=o.indexOf(A.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[A.id]),delete r[A.id],delete s[A.id]}function C(){for(let v in r)n.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:c,update:l,dispose:C}}var Sv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),gi=null;function Mv(){return gi===null&&(gi=new To(Sv,16,16,cr,si),gi.name="DFG_LUT",gi.minFilter=rn,gi.magFilter=rn,gi.wrapS=di,gi.wrapT=di,gi.generateMipmaps=!1,gi.needsUpdate=!0),gi}var El=class{constructor(e={}){let{canvas:t=Qf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=An}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;let y=d,g=new Set([Hc,Vc,zc]),p=new Set([An,ri,Ls,Fs,Oc,Nc]),w=new Uint32Array(4),C=new Int32Array(4),v=new R,A=null,S=null,T=[],x=[],M=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,D=!1,O=null,k=null,B=null,P=null;this._outputColorSpace=Qt;let W=0,Y=0,te=null,X=-1,j=null,ie=new Lt,Te=new Lt,Se=null,gt=new We(0),Ze=0,at=t.width,z=t.height,ee=1,we=null,ze=null,ve=new Lt(0,0,at,z),Me=new Lt(0,0,at,z),je=!1,Je=new ws,st=!1,ut=!1,$e=new nt,_t=new R,Vt=new Lt,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},pe=!1;function Ut(){return te===null?ee:1}let U=i;function kt(b,F){return t.getContext(b,F)}let dt,E,_,N,G,Z,oe,ce,$,Q,le,Ce,ue,he,Le,ke,Ve,L,de,K,fe,me,re;try{let b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Bc}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",ft,!1),t.addEventListener("webglcontextcreationerror",En,!1),U===null){let F="webgl2";if(U=kt(F,b),U===null)throw kt(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Fe()}catch(b){throw t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",En,!1),Ge("WebGLRenderer: "+b.message),b}function Fe(){dt=new Bx(U),dt.init(),fe=new yv(U,dt),E=new wx(U,dt,e,fe),_=new gv(U,dt),E.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),k=U.createFramebuffer(),B=U.createFramebuffer(),P=U.createFramebuffer(),N=new Dx(U),G=new nv,Z=new _v(U,dt,_,G,E,fe,N),oe=new Px(I),ce=new O0(U),me=new bx(U,ce),$=new Lx(U,ce,N,me),Q=new Ox(U,$,ce,me,N),L=new Ux(U,E,Z),Le=new Ax(G),le=new tv(I,oe,dt,E,me,Le),Ce=new wv(I,G),ue=new rv,he=new uv(dt),Ve=new xx(I,oe,_,Q,m,c),ke=new mv(I,Q,E),re=new Av(U,N,E,_),de=new vx(U,dt,N),K=new Fx(U,dt,N),N.programs=le.programs,I.capabilities=E,I.extensions=dt,I.properties=G,I.renderLists=ue,I.shadowMap=ke,I.state=_,I.info=N}y!==An&&(M=new kx(y,t.width,t.height,a,r,s));let Re=new Bh(I,U);this.xr=Re,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let b=dt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=dt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(b){b!==void 0&&(ee=b,this.setSize(at,z,!1))},this.getSize=function(b){return b.set(at,z)},this.setSize=function(b,F,q=!0){if(Re.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}at=b,z=F,t.width=Math.floor(b*ee),t.height=Math.floor(F*ee),q===!0&&(t.style.width=b+"px",t.style.height=F+"px"),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(at*ee,z*ee).floor()},this.setDrawingBufferSize=function(b,F,q){at=b,z=F,ee=q,t.width=Math.floor(b*q),t.height=Math.floor(F*q),this.setViewport(0,0,b,F)},this.setEffects=function(b){if(y===An){Ge("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let F=0;F<b.length;F++)if(b[F].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ie)},this.getViewport=function(b){return b.copy(ve)},this.setViewport=function(b,F,q,V){b.isVector4?ve.set(b.x,b.y,b.z,b.w):ve.set(b,F,q,V),_.viewport(ie.copy(ve).multiplyScalar(ee).round())},this.getScissor=function(b){return b.copy(Me)},this.setScissor=function(b,F,q,V){b.isVector4?Me.set(b.x,b.y,b.z,b.w):Me.set(b,F,q,V),_.scissor(Te.copy(Me).multiplyScalar(ee).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(b){_.setScissorTest(je=b)},this.setOpaqueSort=function(b){we=b},this.setTransparentSort=function(b){ze=b},this.getClearColor=function(b){return b.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor(...arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,q=!0){let V=0;if(b){let H=!1;if(te!==null){let be=te.texture.format;H=g.has(be)}if(H){let be=te.texture.type,Ee=p.has(be),xe=Ve.getClearColor(),Ie=Ve.getClearAlpha(),De=xe.r,Qe=xe.g,rt=xe.b;Ee?(w[0]=De,w[1]=Qe,w[2]=rt,w[3]=Ie,U.clearBufferuiv(U.COLOR,0,w)):(C[0]=De,C[1]=Qe,C[2]=rt,C[3]=Ie,U.clearBufferiv(U.COLOR,0,C))}else V|=U.COLOR_BUFFER_BIT}F&&(V|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(V|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&U.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),O=b},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",En,!1),Ve.dispose(),ue.dispose(),he.dispose(),G.dispose(),oe.dispose(),Q.dispose(),me.dispose(),re.dispose(),le.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",Xe),Re.removeEventListener("sessionend",pt),mt.stop()};function St(b){b.preventDefault(),bo("WebGLRenderer: Context Lost."),D=!0}function ft(){bo("WebGLRenderer: Context Restored."),D=!1;let b=N.autoReset,F=ke.enabled,q=ke.autoUpdate,V=ke.needsUpdate,H=ke.type;Fe(),N.autoReset=b,ke.enabled=F,ke.autoUpdate=q,ke.needsUpdate=V,ke.type=H}function En(b){Ge("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Ln(b){let F=b.target;F.removeEventListener("dispose",Ln),ru(F)}function ru(b){su(b),G.remove(b)}function su(b){let F=G.get(b).programs;F!==void 0&&(F.forEach(function(q){le.releaseProgram(q)}),b.isShaderMaterial&&le.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,q,V,H,be){F===null&&(F=Nt);let Ee=H.isMesh&&H.matrixWorld.determinantAffine()<0,xe=Rg(b,F,q,V,H);_.setMaterial(V,Ee);let Ie=q.index,De=1;if(V.wireframe===!0){if(Ie=$.getWireframeAttribute(q),Ie===void 0)return;De=2}let Qe=q.drawRange,rt=q.attributes.position,Pe=Qe.start*De,xt=(Qe.start+Qe.count)*De;be!==null&&(Pe=Math.max(Pe,be.start*De),xt=Math.min(xt,(be.start+be.count)*De)),Ie!==null?(Pe=Math.max(Pe,0),xt=Math.min(xt,Ie.count)):rt!=null&&(Pe=Math.max(Pe,0),xt=Math.min(xt,rt.count));let Gt=xt-Pe;if(Gt<0||Gt===1/0)return;me.setup(H,V,xe,q,Ie);let Pt,Tt=de;if(Ie!==null&&(Pt=ce.get(Ie),Tt=K,Tt.setIndex(Pt)),H.isMesh)V.wireframe===!0?(_.setLineWidth(V.wireframeLinewidth*Ut()),Tt.setMode(U.LINES)):Tt.setMode(U.TRIANGLES);else if(H.isLine){let on=V.linewidth;on===void 0&&(on=1),_.setLineWidth(on*Ut()),H.isLineSegments?Tt.setMode(U.LINES):H.isLineLoop?Tt.setMode(U.LINE_LOOP):Tt.setMode(U.LINE_STRIP)}else H.isPoints?Tt.setMode(U.POINTS):H.isSprite&&Tt.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(dt.get("WEBGL_multi_draw"))Tt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let on=H._multiDrawStarts,Ae=H._multiDrawCounts,fn=H._multiDrawCount,ht=Ie?ce.get(Ie).bytesPerElement:1,Fn=G.get(V).currentProgram.getUniforms();for(let ui=0;ui<fn;ui++)Fn.setValue(U,"_gl_DrawID",ui),Tt.render(on[ui]/ht,Ae[ui])}else if(H.isInstancedMesh)Tt.renderInstances(Pe,Gt,H.count);else if(q.isInstancedBufferGeometry){let on=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ae=Math.min(q.instanceCount,on);Tt.renderInstances(Pe,Gt,Ae)}else Tt.render(Pe,Gt)};function ne(b,F,q,V){O!==null&&b.isNodeMaterial&&O.setObject(V,b),st===!0&&Le.setState(b,q,!1),b.transparent===!0&&b.side===kn&&b.forceSinglePass===!1?(b.side=yn,b.needsUpdate=!0,gr(b,F,V),b.side=rr,b.needsUpdate=!0,gr(b,F,V),b.side=kn):gr(b,F,V)}this.compile=function(b,F,q=null){q===null&&(q=b),O!==null&&O.renderStart(b,F,q),S=he.get(q),S.init(F),x.push(S),q.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(S.pushLight(H),H.castShadow&&S.pushShadow(H))}),b!==q&&b.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(S.pushLight(H),H.castShadow&&S.pushShadow(H))}),S.setupLights(),O!==null&&O.updateLights(S.state.lightsArray),ut=this.localClippingEnabled,st=Le.init(this.clippingPlanes,ut),st===!0&&Le.setGlobalState(this.clippingPlanes,F),O!==null&&ke.render(S.state.shadowsArray,q,F);let V=new Set;return b.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let be=H.material;if(be)if(Array.isArray(be))for(let Ee=0;Ee<be.length;Ee++){let xe=be[Ee];ne(xe,q,F,H),V.add(xe)}else ne(be,q,F,H),V.add(be)}),S=x.pop(),O!==null&&O.renderEnd(),V},this.compileAsync=function(b,F,q=null){let V=this.compile(b,F,q);return new Promise(H=>{function be(){if(V.forEach(function(Ee){let Ie=G.get(Ee).currentProgram;(Ie===void 0||Ie.isReady())&&V.delete(Ee)}),V.size===0){H(b);return}setTimeout(be,10)}dt.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let ye=null;function it(b){ye&&ye(b)}function Xe(){mt.stop()}function pt(){mt.start()}let mt=new Rp;mt.setAnimationLoop(it),typeof self<"u"&&mt.setContext(self),this.setAnimationLoop=function(b){ye=b,Re.setAnimationLoop(b),b===null?mt.stop():mt.start()},Re.addEventListener("sessionstart",Xe),Re.addEventListener("sessionend",pt),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){Ge("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;O!==null&&O.renderStart(b,F);let q=Re.enabled===!0&&Re.isPresenting===!0,V=M!==null&&(te===null||q)&&M.begin(I,te);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(F),F=Re.getCamera()),b.isScene===!0&&b.onBeforeRender(I,b,F,te),S=he.get(b,x.length),S.init(F),S.state.textureUnits=Z.getTextureUnits(),x.push(S),$e.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Je.setFromProjectionMatrix($e,Qn,F.reversedDepth),ut=this.localClippingEnabled,st=Le.init(this.clippingPlanes,ut),A=ue.get(b,T.length),A.init(),T.push(A),Re.enabled===!0&&Re.isPresenting===!0){let Ee=I.xr.getDepthSensingMesh();Ee!==null&&Oe(Ee,F,-1/0,I.sortObjects)}Oe(b,F,0,I.sortObjects),A.finish(),O!==null&&O.updateLights(S.state.lightsArray),I.sortObjects===!0&&A.sort(we,ze),pe=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,pe&&Ve.addToRenderList(A,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),st===!0&&Le.beginShadows();let H=S.state.shadowsArray;if(ke.render(H,b,F),st===!0&&Le.endShadows(),(V&&M.hasRenderPass())===!1){let Ee=A.opaque,xe=A.transmissive;if(S.setupLights(),F.isArrayCamera){let Ie=F.cameras;if(xe.length>0)for(let De=0,Qe=Ie.length;De<Qe;De++){let rt=Ie[De];Tn(Ee,xe,b,rt)}pe&&Ve.render(b);for(let De=0,Qe=Ie.length;De<Qe;De++){let rt=Ie[De];Ht(A,b,rt,rt.viewport)}}else xe.length>0&&Tn(Ee,xe,b,F),pe&&Ve.render(b),Ht(A,b,F)}te!==null&&Y===0&&(Z.updateMultisampleRenderTarget(te),Z.updateRenderTargetMipmap(te)),V&&M.end(I),b.isScene===!0&&b.onAfterRender(I,b,F),me.resetDefaultState(),X=-1,j=null,x.pop(),x.length>0?(S=x[x.length-1],Z.setTextureUnits(S.state.textureUnits),st===!0&&Le.setGlobalState(I.clippingPlanes,S.state.camera)):S=null,T.pop(),T.length>0?A=T[T.length-1]:A=null,O!==null&&O.renderEnd()};function Oe(b,F,q,V){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLightProbeGrid)S.pushLightProbeGrid(b);else if(b.isLight)S.pushLight(b),b.castShadow&&S.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(Je)){V&&Vt.setFromMatrixPosition(b.matrixWorld).applyMatrix4($e);let Ee=Q.update(b),xe=b.material;xe.visible&&A.push(b,Ee,xe,q,Vt.z,null,F)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(Je))){let Ee=Q.update(b),xe=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Vt.copy(b.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Vt.copy(Ee.boundingSphere.center)),Vt.applyMatrix4(b.matrixWorld).applyMatrix4($e)),Array.isArray(xe)){let Ie=Ee.groups;for(let De=0,Qe=Ie.length;De<Qe;De++){let rt=Ie[De],Pe=xe[rt.materialIndex];Pe&&Pe.visible&&A.push(b,Ee,Pe,q,Vt.z,rt,F)}}else xe.visible&&A.push(b,Ee,xe,q,Vt.z,null,F)}}let be=b.children;for(let Ee=0,xe=be.length;Ee<xe;Ee++)Oe(be[Ee],F,q,V)}function Ht(b,F,q,V){let{opaque:H,transmissive:be,transparent:Ee}=b;S.setupLightsView(q),st===!0&&Le.setGlobalState(I.clippingPlanes,q),V&&_.viewport(ie.copy(V)),H.length>0&&Jt(H,F,q),be.length>0&&Jt(be,F,q),Ee.length>0&&Jt(Ee,F,q),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Tn(b,F,q,V){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[V.id]===void 0){let Pe=dt.has("EXT_color_buffer_half_float")||dt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[V.id]=new wn(1,1,{generateMipmaps:!0,type:Pe?si:An,minFilter:or,samples:Math.max(4,E.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ot.workingColorSpace})}let be=S.state.transmissionRenderTarget[V.id],Ee=V.viewport||ie;be.setSize(Ee.z*I.transmissionResolutionScale,Ee.w*I.transmissionResolutionScale);let xe=I.getRenderTarget(),Ie=I.getActiveCubeFace(),De=I.getActiveMipmapLevel();I.setRenderTarget(be),I.getClearColor(gt),Ze=I.getClearAlpha(),Ze<1&&I.setClearColor(16777215,.5),I.clear(),pe&&Ve.render(q);let Qe=I.toneMapping;I.toneMapping=ii;let rt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),S.setupLightsView(V),st===!0&&Le.setGlobalState(I.clippingPlanes,V),Jt(b,q,V),Z.updateMultisampleRenderTarget(be),Z.updateRenderTargetMipmap(be),dt.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let xt=0,Gt=F.length;xt<Gt;xt++){let Pt=F[xt],{object:Tt,geometry:on,material:Ae,group:fn}=Pt;if(Ae.side===kn&&Tt.layers.test(V.layers)){let ht=Ae.side;Ae.side=yn,Ae.needsUpdate=!0,It(Tt,q,V,on,Ae,fn),Ae.side=ht,Ae.needsUpdate=!0,Pe=!0}}Pe===!0&&(Z.updateMultisampleRenderTarget(be),Z.updateRenderTargetMipmap(be))}I.setRenderTarget(xe,Ie,De),I.setClearColor(gt,Ze),rt!==void 0&&(V.viewport=rt),I.toneMapping=Qe}function Jt(b,F,q){let V=F.isScene===!0?F.overrideMaterial:null;for(let H=0,be=b.length;H<be;H++){let Ee=b[H],{object:xe,geometry:Ie,group:De}=Ee,Qe=Ee.material;Qe.allowOverride===!0&&V!==null&&(Qe=V),xe.layers.test(q.layers)&&It(xe,F,q,Ie,Qe,De)}}function It(b,F,q,V,H,be){O!==null&&H.isNodeMaterial&&O.setObject(b,H),b.onBeforeRender(I,F,q,V,H,be),b.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),H.onBeforeRender(I,F,q,V,b,be),H.transparent===!0&&H.side===kn&&H.forceSinglePass===!1?(H.side=yn,H.needsUpdate=!0,I.renderBufferDirect(q,F,V,H,b,be),H.side=rr,H.needsUpdate=!0,I.renderBufferDirect(q,F,V,H,b,be),H.side=kn):I.renderBufferDirect(q,F,V,H,b,be),b.onAfterRender(I,F,q,V,H,be)}function gr(b,F,q){F.isScene!==!0&&(F=Nt);let V=G.get(b),H=S.state.lights,be=S.state.shadowsArray,Ee=H.state.version,xe=le.getParameters(b,H.state,be,F,q,S.state.lightProbeGridArray),Ie=le.getProgramCacheKey(xe),De=V.programs;V.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?F.environment:null,V.fog=F.fog;let Qe=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;V.envMap=oe.get(b.envMap||V.environment,Qe),V.envMapRotation=V.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,De===void 0&&(b.addEventListener("dispose",Ln),De=new Map,V.programs=De);let rt=De.get(Ie);if(rt!==void 0){if(V.currentProgram===rt&&V.lightsStateVersion===Ee)return Rd(b,xe),rt}else xe.uniforms=le.getUniforms(b),O!==null&&b.isNodeMaterial&&O.build(b,q,xe),b.onBeforeCompile(xe,I),rt=le.acquireProgram(xe,Ie),De.set(Ie,rt),V.uniforms=xe.uniforms;let Pe=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Pe.clippingPlanes=Le.uniform),Rd(b,xe),V.needsLights=Pg(b),V.lightsStateVersion=Ee,V.needsLights&&(Pe.ambientLightColor.value=H.state.ambient,Pe.lightProbe.value=H.state.probe,Pe.sunLights.value=H.state.sun,Pe.sunLightShadows.value=H.state.sunShadow,Pe.directionalLights.value=H.state.directional,Pe.directionalLightShadows.value=H.state.directionalShadow,Pe.spotLights.value=H.state.spot,Pe.spotLightShadows.value=H.state.spotShadow,Pe.rectAreaLights.value=H.state.rectArea,Pe.ltc_1.value=H.state.rectAreaLTC1,Pe.ltc_2.value=H.state.rectAreaLTC2,Pe.pointLights.value=H.state.point,Pe.pointLightShadows.value=H.state.pointShadow,Pe.hemisphereLights.value=H.state.hemi,Pe.sunShadowMatrix.value=H.state.sunShadowMatrix,Pe.sunShadowCascade.value=H.state.sunShadowCascade,Pe.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Pe.spotLightMatrix.value=H.state.spotLightMatrix,Pe.spotLightMap.value=H.state.spotLightMap,Pe.pointShadowMatrix.value=H.state.pointShadowMatrix),V.lightProbeGrid=S.state.lightProbeGridArray.length>0,V.currentProgram=rt,V.uniformsList=null,rt}function Cd(b){if(b.uniformsList===null){let F=b.currentProgram.getUniforms();b.uniformsList=ks.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function Rd(b,F){let q=G.get(b);q.outputColorSpace=F.outputColorSpace,q.batching=F.batching,q.batchingColor=F.batchingColor,q.instancing=F.instancing,q.instancingColor=F.instancingColor,q.instancingMorph=F.instancingMorph,q.skinning=F.skinning,q.morphTargets=F.morphTargets,q.morphNormals=F.morphNormals,q.morphColors=F.morphColors,q.morphTargetsCount=F.morphTargetsCount,q.numClippingPlanes=F.numClippingPlanes,q.numIntersection=F.numClipIntersection,q.vertexAlphas=F.vertexAlphas,q.vertexTangents=F.vertexTangents,q.toneMapping=F.toneMapping}function Cg(b,F){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;v.setFromMatrixPosition(F.matrixWorld);for(let q=0,V=b.length;q<V;q++){let H=b[q];if(H.texture!==null&&H.boundingBox.containsPoint(v))return H}return null}function Rg(b,F,q,V,H){F.isScene!==!0&&(F=Nt),Z.resetTextureUnits();let be=F.fog,Ee=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?F.environment:null,xe=te===null?I.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:ot.workingColorSpace,Ie=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,De=oe.get(V.envMap||Ee,Ie),Qe=V.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,rt=!!q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Pe=!!q.morphAttributes.position,xt=!!q.morphAttributes.normal,Gt=!!q.morphAttributes.color,Pt=ii;V.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Pt=I.toneMapping);let Tt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,on=Tt!==void 0?Tt.length:0,Ae=G.get(V),fn=S.state.lights;if(st===!0&&(ut===!0||b!==j)){let Rt=b===j&&V.id===X;Le.setState(V,b,Rt)}let ht=!1;V.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==fn.state.version||Ae.outputColorSpace!==xe||H.isBatchedMesh&&Ae.batching===!1||!H.isBatchedMesh&&Ae.batching===!0||H.isBatchedMesh&&Ae.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&Ae.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&Ae.instancing===!1||!H.isInstancedMesh&&Ae.instancing===!0||H.isSkinnedMesh&&Ae.skinning===!1||!H.isSkinnedMesh&&Ae.skinning===!0||H.isInstancedMesh&&Ae.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ae.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ae.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ae.instancingMorph===!1&&H.morphTexture!==null||Ae.envMap!==De||V.fog===!0&&Ae.fog!==be||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Le.numPlanes||Ae.numIntersection!==Le.numIntersection)||Ae.vertexAlphas!==Qe||Ae.vertexTangents!==rt||Ae.morphTargets!==Pe||Ae.morphNormals!==xt||Ae.morphColors!==Gt||Ae.toneMapping!==Pt||Ae.morphTargetsCount!==on||!!Ae.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(ht=!0):(ht=!0,Ae.__version=V.version);let Fn=Ae.currentProgram;ht===!0&&(Fn=gr(V,F,H),O&&V.isNodeMaterial&&O.onUpdateProgram(V,Fn,Ae));let ui=!1,Vi=!1,Vr=!1,Mt=Fn.getUniforms(),zt=Ae.uniforms;if(_.useProgram(Fn.program)&&(ui=!0,Vi=!0,Vr=!0),V.id!==X&&(X=V.id,Vi=!0),Ae.needsLights){let Rt=Cg(S.state.lightProbeGridArray,H);Ae.lightProbeGrid!==Rt&&(Ae.lightProbeGrid=Rt,Vi=!0)}if(ui||j!==b){_.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Mt.setValue(U,"projectionMatrix",b.projectionMatrix),Mt.setValue(U,"viewMatrix",b.matrixWorldInverse);let Gi=Mt.map.cameraPosition;Gi!==void 0&&Gi.setValue(U,_t.setFromMatrixPosition(b.matrixWorld)),E.logarithmicDepthBuffer&&Mt.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Mt.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),j!==b&&(j=b,Vi=!0,Vr=!0)}if(Ae.needsLights&&(fn.state.sunShadowMap.length>0&&Mt.setValue(U,"sunShadowMap",fn.state.sunShadowMap,Z),fn.state.directionalShadowMap.length>0&&Mt.setValue(U,"directionalShadowMap",fn.state.directionalShadowMap,Z),fn.state.spotShadowMap.length>0&&Mt.setValue(U,"spotShadowMap",fn.state.spotShadowMap,Z),fn.state.pointShadowMap.length>0&&Mt.setValue(U,"pointShadowMap",fn.state.pointShadowMap,Z)),H.isSkinnedMesh){Mt.setOptional(U,H,"bindMatrix"),Mt.setOptional(U,H,"bindMatrixInverse");let Rt=H.skeleton;Rt&&(Rt.boneTexture===null&&Rt.computeBoneTexture(),Mt.setValue(U,"boneTexture",Rt.boneTexture,Z))}H.isBatchedMesh&&(Mt.setOptional(U,H,"batchingTexture"),Mt.setValue(U,"batchingTexture",H._matricesTexture,Z),Mt.setOptional(U,H,"batchingIdTexture"),Mt.setValue(U,"batchingIdTexture",H._indirectTexture,Z),Mt.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&Mt.setValue(U,"batchingColorTexture",H._colorsTexture,Z));let Hi=q.morphAttributes;if((Hi.position!==void 0||Hi.normal!==void 0||Hi.color!==void 0)&&L.update(H,q,Fn),(Vi||Ae.receiveShadow!==H.receiveShadow)&&(Ae.receiveShadow=H.receiveShadow,Mt.setValue(U,"receiveShadow",H.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&F.environment!==null&&(zt.envMapIntensity.value=F.environmentIntensity),zt.dfgLUT!==void 0&&(zt.dfgLUT.value=Mv()),Vi){if(Mt.setValue(U,"toneMappingExposure",I.toneMappingExposure),Ae.needsLights&&Ig(zt,Vr),be&&V.fog===!0&&Ce.refreshFogUniforms(zt,be),Ce.refreshMaterialUniforms(zt,V,ee,z,S.state.transmissionRenderTarget[b.id]),Ae.needsLights&&Ae.lightProbeGrid){let Rt=Ae.lightProbeGrid;zt.probesSH.value=Rt.texture,zt.probesMin.value.copy(Rt.boundingBox.min),zt.probesMax.value.copy(Rt.boundingBox.max),zt.probesResolution.value.copy(Rt.resolution)}ks.upload(U,Cd(Ae),zt,Z)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ks.upload(U,Cd(Ae),zt,Z),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Mt.setValue(U,"center",H.center),Mt.setValue(U,"modelViewMatrix",H.modelViewMatrix),Mt.setValue(U,"normalMatrix",H.normalMatrix),Mt.setValue(U,"modelMatrix",H.matrixWorld),V.uniformsGroups!==void 0){let Rt=V.uniformsGroups;for(let Gi=0,Hr=Rt.length;Gi<Hr;Gi++){let Pd=Rt[Gi];re.update(Pd,Fn),re.bind(Pd,Fn)}}return Fn}function Ig(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.sunLights.needsUpdate=F,b.sunLightShadows.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function Pg(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(b,F,q){let V=G.get(b);V.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),G.get(b.texture).__webglTexture=F,G.get(b.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:q,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,F){let q=G.get(b);q.__webglFramebuffer=F,q.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(b,F=0,q=0){te=b,W=F,Y=q;let V=null,H=!1,be=!1;if(b){let xe=G.get(b);if(xe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,xe.__webglFramebuffer),ie.copy(b.viewport),Te.copy(b.scissor),Se=b.scissorTest,_.viewport(ie),_.scissor(Te),_.setScissorTest(Se),X=-1;return}else if(xe.__webglFramebuffer===void 0)Z.setupRenderTarget(b);else if(xe.__hasExternalTextures)Z.rebindTextures(b,G.get(b.texture).__webglTexture,G.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Qe=b.depthTexture;if(xe.__boundDepthTexture!==Qe){if(Qe!==null&&G.has(Qe)&&(b.width!==Qe.image.width||b.height!==Qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(b)}}let Ie=b.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(be=!0);let De=G.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(De[F])?V=De[F][q]:V=De[F],H=!0):b.samples>0&&Z.useMultisampledRTT(b)===!1?V=G.get(b).__webglMultisampledFramebuffer:Array.isArray(De)?V=De[q]:V=De,ie.copy(b.viewport),Te.copy(b.scissor),Se=b.scissorTest}else ie.copy(ve).multiplyScalar(ee).floor(),Te.copy(Me).multiplyScalar(ee).floor(),Se=je;if(q!==0&&(V=k),_.bindFramebuffer(U.FRAMEBUFFER,V)&&_.drawBuffers(b,V),_.viewport(ie),_.scissor(Te),_.setScissorTest(Se),H){let xe=G.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+F,xe.__webglTexture,q)}else if(be){let xe=F;for(let Ie=0;Ie<b.textures.length;Ie++){let De=G.get(b.textures[Ie]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ie,De.__webglTexture,q,xe)}}else if(b!==null&&q!==0){let xe=G.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,xe.__webglTexture,q)}X=-1};function Id(b){let F=G.get(b);return(F.__readFormat!==b.format||F.__readType!==b.type)&&(F.__readFormat=b.format,F.__readType=b.type,F.__formatReadable=E.textureFormatReadable(b.format),F.__typeReadable=E.textureTypeReadable(b.type)),F}this.readRenderTargetPixels=function(b,F,q,V,H,be,Ee,xe=0){if(!(b&&b.isWebGLRenderTarget)){Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ie=Ie[Ee]),Ie){_.bindFramebuffer(U.FRAMEBUFFER,Ie);try{let De=b.textures[xe],Qe=De.format,rt=De.type;b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+xe);let Pe=Id(De);if(Pe.__formatReadable===!1){Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pe.__typeReadable===!1){Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-V&&q>=0&&q<=b.height-H&&U.readPixels(F,q,V,H,fe.convert(Qe),fe.convert(rt),be)}finally{let De=te!==null?G.get(te).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(b,F,q,V,H,be,Ee,xe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ie=Ie[Ee]),Ie)if(F>=0&&F<=b.width-V&&q>=0&&q<=b.height-H){_.bindFramebuffer(U.FRAMEBUFFER,Ie);let De=b.textures[xe],Qe=De.format,rt=De.type;b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+xe);let Pe=Id(De);if(Pe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,xt),U.bufferData(U.PIXEL_PACK_BUFFER,be.byteLength,U.STREAM_READ),U.readPixels(F,q,V,H,fe.convert(Qe),fe.convert(rt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Gt=te!==null?G.get(te).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,Gt);let Pt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await tp(U,Pt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,xt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,be),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(xt),U.deleteSync(Pt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,F=null,q=0){let V=Math.pow(2,-q),H=Math.floor(b.image.width*V),be=Math.floor(b.image.height*V),Ee=F!==null?F.x:0,xe=F!==null?F.y:0;Z.setTexture2D(b,0),U.copyTexSubImage2D(U.TEXTURE_2D,q,0,0,Ee,xe,H,be),_.unbindTexture()},this.copyTextureToTexture=function(b,F,q=null,V=null,H=0,be=0){let Ee,xe,Ie,De,Qe,rt,Pe,xt,Gt,Pt=b.isCompressedTexture?b.mipmaps[be]:b.image;if(q!==null)Ee=q.max.x-q.min.x,xe=q.max.y-q.min.y,Ie=q.isBox3?q.max.z-q.min.z:1,De=q.min.x,Qe=q.min.y,rt=q.isBox3?q.min.z:0;else{let zt=Math.pow(2,-H);Ee=Math.floor(Pt.width*zt),xe=Math.floor(Pt.height*zt),b.isDataArrayTexture?Ie=Pt.depth:b.isData3DTexture?Ie=Math.floor(Pt.depth*zt):Ie=1,De=0,Qe=0,rt=0}V!==null?(Pe=V.x,xt=V.y,Gt=V.z):(Pe=0,xt=0,Gt=0);let Tt=fe.convert(F.format),on=fe.convert(F.type),Ae;F.isData3DTexture?(Z.setTexture3D(F,0),Ae=U.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Z.setTexture2DArray(F,0),Ae=U.TEXTURE_2D_ARRAY):(Z.setTexture2D(F,0),Ae=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);let fn=_.getParameter(U.UNPACK_ROW_LENGTH),ht=_.getParameter(U.UNPACK_IMAGE_HEIGHT),Fn=_.getParameter(U.UNPACK_SKIP_PIXELS),ui=_.getParameter(U.UNPACK_SKIP_ROWS),Vi=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,Pt.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Pt.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,De),_.pixelStorei(U.UNPACK_SKIP_ROWS,Qe),_.pixelStorei(U.UNPACK_SKIP_IMAGES,rt);let Vr=b.isDataArrayTexture||b.isData3DTexture,Mt=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){let zt=G.get(b),Hi=G.get(F),Rt=G.get(zt.__renderTarget),Gi=G.get(Hi.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,Rt.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,Gi.__webglFramebuffer);for(let Hr=0;Hr<Ie;Hr++)Vr&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(b).__webglTexture,H,rt+Hr),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(F).__webglTexture,be,Gt+Hr)),U.blitFramebuffer(De,Qe,Ee,xe,Pe,xt,Ee,xe,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||b.isRenderTargetTexture||G.has(b)){let zt=G.get(b),Hi=G.get(F);_.bindFramebuffer(U.READ_FRAMEBUFFER,B),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,P);for(let Rt=0;Rt<Ie;Rt++)Vr?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,zt.__webglTexture,H,rt+Rt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,zt.__webglTexture,H),Mt?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Hi.__webglTexture,be,Gt+Rt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Hi.__webglTexture,be),H!==0?U.blitFramebuffer(De,Qe,Ee,xe,Pe,xt,Ee,xe,U.COLOR_BUFFER_BIT,U.NEAREST):Mt?U.copyTexSubImage3D(Ae,be,Pe,xt,Gt+Rt,De,Qe,Ee,xe):U.copyTexSubImage2D(Ae,be,Pe,xt,De,Qe,Ee,xe);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Mt?b.isDataTexture||b.isData3DTexture?U.texSubImage3D(Ae,be,Pe,xt,Gt,Ee,xe,Ie,Tt,on,Pt.data):F.isCompressedArrayTexture?U.compressedTexSubImage3D(Ae,be,Pe,xt,Gt,Ee,xe,Ie,Tt,Pt.data):U.texSubImage3D(Ae,be,Pe,xt,Gt,Ee,xe,Ie,Tt,on,Pt):b.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,be,Pe,xt,Ee,xe,Tt,on,Pt.data):b.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,be,Pe,xt,Pt.width,Pt.height,Tt,Pt.data):U.texSubImage2D(U.TEXTURE_2D,be,Pe,xt,Ee,xe,Tt,on,Pt);_.pixelStorei(U.UNPACK_ROW_LENGTH,fn),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ht),_.pixelStorei(U.UNPACK_SKIP_PIXELS,Fn),_.pixelStorei(U.UNPACK_SKIP_ROWS,ui),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Vi),be===0&&F.generateMipmaps&&U.generateMipmap(Ae),_.unbindTexture()},this.initRenderTarget=function(b){G.get(b).__webglFramebuffer===void 0&&Z.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Z.setTextureCube(b,0):b.isData3DTexture?Z.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Z.setTexture2DArray(b,0):Z.setTexture2D(b,0),_.unbindTexture()},this.resetState=function(){W=0,Y=0,te=null,_.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}};var Up={type:"change"},Fh={type:"start"},Np={type:"end"},Rl=new Fi,Op=new In,Tv=Math.cos(70*Us.DEG2RAD),$t=new R,Sn=2*Math.PI,wt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lh=1e-6,Il=class extends Go{constructor(e,t=null){super(e,t),this.state=wt.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:nr.ROTATE,MIDDLE:nr.DOLLY,RIGHT:nr.PAN},this.touches={ONE:ir.ROTATE,TWO:ir.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new mn,this._lastTargetPosition=new R,this._quat=new mn().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Is,this._sphericalDelta=new Is,this._scale=1,this._panOffset=new R,this._rotateStart=new ge,this._rotateEnd=new ge,this._rotateDelta=new ge,this._panStart=new ge,this._panEnd=new ge,this._panDelta=new ge,this._dollyStart=new ge,this._dollyEnd=new ge,this._dollyDelta=new ge,this._dollyDirection=new R,this._mouse=new ge,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Rv.bind(this),this._onPointerDown=Cv.bind(this),this._onPointerUp=Iv.bind(this),this._onContextMenu=Ov.bind(this),this._onMouseWheel=Lv.bind(this),this._onKeyDown=Fv.bind(this),this._onTouchStart=Dv.bind(this),this._onTouchMove=Uv.bind(this),this._onMouseDown=Pv.bind(this),this._onMouseMove=Bv.bind(this),this._interceptControlDown=Nv.bind(this),this._interceptControlUp=kv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=wt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Up),this.update(),this.state=wt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;$t.copy(t).sub(this.target),$t.applyQuaternion(this._quat),this._spherical.setFromVector3($t),this.autoRotate&&this.state===wt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Sn:i>Math.PI&&(i-=Sn),r<-Math.PI?r+=Sn:r>Math.PI&&(r-=Sn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if($t.setFromSpherical(this._spherical),$t.applyQuaternion(this._quatInverse),t.copy(this.target).add($t),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=$t.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){let a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;let l=new R(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=$t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Rl.origin.copy(this.object.position),Rl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Rl.direction))<Tv?this.object.lookAt(this.target):(Op.setFromNormalAndCoplanarPoint(this.object.up,this.target),Rl.intersectPlane(Op,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Lh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lh||this._lastTargetPosition.distanceToSquared(this.target)>Lh?(this.dispatchEvent(Up),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Sn/60*this.autoRotateSpeed*e:Sn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){$t.setFromMatrixColumn(t,0),$t.multiplyScalar(-e),this._panOffset.add($t)}_panUp(e,t){this.screenSpacePanning===!0?$t.setFromMatrixColumn(t,1):($t.setFromMatrixColumn(t,0),$t.crossVectors(this.object.up,$t)),$t.multiplyScalar(e),this._panOffset.add($t)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;$t.copy(r).sub(this.target);let s=$t.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ge,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function Cv(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Rv(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Iv(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Np),this.state=wt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Pv(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case nr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=wt.DOLLY;break;case nr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=wt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=wt.ROTATE}break;case nr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=wt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=wt.PAN}break;default:this.state=wt.NONE}this.state!==wt.NONE&&this.dispatchEvent(Fh)}function Bv(n){switch(this.state){case wt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case wt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case wt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Lv(n){this.enabled===!1||this.enableZoom===!1||this.state!==wt.NONE||(n.preventDefault(),this.dispatchEvent(Fh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Np))}function Fv(n){this.enabled!==!1&&this._handleKeyDown(n)}function Dv(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ir.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=wt.TOUCH_ROTATE;break;case ir.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=wt.TOUCH_PAN;break;default:this.state=wt.NONE}break;case 2:switch(this.touches.TWO){case ir.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=wt.TOUCH_DOLLY_PAN;break;case ir.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=wt.TOUCH_DOLLY_ROTATE;break;default:this.state=wt.NONE}break;default:this.state=wt.NONE}this.state!==wt.NONE&&this.dispatchEvent(Fh)}function Uv(n){switch(this._trackPointer(n),this.state){case wt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case wt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case wt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case wt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=wt.NONE}}function Ov(n){this.enabled!==!1&&n.preventDefault()}function Nv(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function kv(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var jt=960;function Pl(n,e=!1){let t=new El({antialias:!0,preserveDrawingBuffer:e});t.setPixelRatio(e?1:Math.min(devicePixelRatio,1.5)),t.outputColorSpace=Qt,t.toneMapping=Wo,t.toneMappingExposure=1.12,t.shadowMap.enabled=!0,t.shadowMap.type=Tr,t.domElement.setAttribute("aria-label","\u4E00\u5B57\u957F\u86C7\u9635\u4E09\u7EF4\u753B\u9762\uFF0C\u53EF\u62D6\u52A8\u89C2\u5BDF\u5E76\u70B9\u9009\u5175\u5352"),t.domElement.style.touchAction="none",n?.appendChild(t.domElement);let i=new wo;i.background=new We("#b6b59e"),i.fog=new bs("#b6b59e",160,700);let r=new ln(43,1,.1,5e3);r.position.set(20,60,90);let s=n?new Il(r,t.domElement):void 0,o=new R(0,1,0);s&&(s.target.copy(o),s.enableDamping=!0,s.dampingFactor=.1,s.maxPolarAngle=Math.PI*.485,s.minDistance=5,s.maxDistance=3500),i.add(new ko("#e9e3cb","#4b4935",2.1));let a=new Rs("#ffedc3",3);a.position.set(-50,90,55),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.normalBias=.04,a.shadow.bias=-2e-4,i.add(a);let c=new Rs("#cbd9d4",1.3);c.position.set(40,25,-40),i.add(c);let l=[],u=[],f=[],h=ne=>(l.push(ne),ne),d=(ne,ye=0,it=.8)=>{let Xe=new Uo({color:ne,metalness:ye,roughness:it});return u.push(Xe),Xe},m=d("#454e4e",.55,.62),y=d("#64695d",.55,.57),g=d("#b29b5d",.65,.53),p=d("#bb9974"),w=d("#3b332b"),C=d("#943d2d"),v=d("#705336"),A=d("#262523"),S=d("#973c2a");S.side=kn;let T={box:h(new Ji(1,1,1)),sphere:h(new Es(1,10,8)),cylinder:h(new Mr(1,1,1,8)),cone:h(new Ss(1,1,6)),shield:h(new Mr(1,1,1,18)),rim:h(new Do(1,.04,4,20)),dome:h(new Es(1,12,8,0,Math.PI*2,0,Math.PI/2))};function x(){let ne=document.createElement("canvas");ne.width=ne.height=256;let ye=ne.getContext("2d");ye.fillStyle="#b5a383",ye.fillRect(0,0,256,256);for(let Xe=0;Xe<2400;Xe++){let pt=Math.sin(Xe*13.123)*43758.545,mt=Math.sin(Xe*37.32+5)*45345.12;ye.fillStyle=Xe%4?"rgba(58,55,38,.08)":"rgba(237,218,179,.14)",ye.fillRect((pt-Math.floor(pt))*256,(mt-Math.floor(mt))*256,Xe%3+1,1)}let it=new Sr(ne);return it.colorSpace=Qt,it.wrapS=it.wrapT=fs,it.repeat.set(180,180),f.push(it),it}let M=d("#c0b18e");M.map=x();let I=new qt(h(new Ki(2200,2200)),M);I.rotation.x=-Math.PI/2,I.receiveShadow=!0,i.add(I);let D=new Ho(1800,180,"#8b8368","#a49470");D.material.transparent=!0,D.material.opacity=.17,u.push(D.material),l.push(D.geometry),D.position.y=.006,i.add(D);let O=d("#7c8263");for(let ne=0;ne<22;ne++){let ye=new qt(T.cone,O);ye.position.set((ne-11)*27,9+Math.sin(ne*6)*4,-180-Math.sin(ne)*20),ye.scale.set(29,26+Math.sin(ne*4)*13,36),i.add(ye)}let k=d("#656a4b");for(let ne=0;ne<12;ne++){let ye=new qt(h(new Ss(2.2,3.6,4)),k);ye.position.set((ne-5.5)*7,1.8,-35-ne%2*7),ye.rotation.y=Math.PI/4,ye.scale.z=1.35,ye.castShadow=!0,i.add(ye)}let B=new Map;function P(ne,ye,it,Xe=jt){let pt=new Ro(ye,it,Xe);return pt.count=0,pt.instanceMatrix.setUsage(Ds),pt.castShadow=!0,pt.frustumCulled=!1,pt.boundingSphere=new On(new R,2e3),B.set(ne,pt),i.add(pt),pt}let W=P("body",T.box,m);P("skirt",T.box,m),P("belt",T.box,C),P("strap",T.box,g,jt*2),P("head",T.sphere,p),P("helmet",T.dome,y),P("band",T.cylinder,y),P("plume",T.cone,C),P("eyes",T.sphere,A,jt*2),P("nose",T.sphere,p),P("arms",T.box,m,jt*2),P("hands",T.sphere,p,jt*2),P("legs",T.box,w,jt*4),P("boots",T.box,w,jt*2),P("shield",T.shield,v),P("rim",T.rim,g),P("boss",T.sphere,g),P("spear",T.cylinder,v),P("point",T.cone,y);let Y=new Er([new R(0,-.5,0),new R(.23,-.27,0),new R(.28,0,0),new R(.23,.27,0),new R(0,.5,0)]);P("bow",h(new Ts(Y,12,.027,5,!1)),v),P("string",T.cylinder,g),P("quiver",T.cylinder,w),P("arrows",T.cylinder,v,jt*3),P("arrowtips",T.cone,y,jt*3),P("flagpole",T.cylinder,v),P("finial",T.sphere,g);let te=d("#79533a"),X=d("#302921"),j=d("#584331"),ie=P("horseBody",T.sphere,te),Te=new Uint16Array(jt);P("horseHaunch",T.sphere,te,jt*2),P("horseNeck",T.sphere,te),P("horseHead",T.sphere,te,jt*2),P("horseMuzzle",T.sphere,j),P("horseEars",T.cone,te,jt*2),P("horseEyes",T.sphere,A,jt*4),P("horseMane",T.box,X,jt*2),P("horseTail",T.cylinder,X),P("horseLegs",T.cylinder,te,jt*8),P("horseHooves",T.box,X,jt*4),P("saddleBlanket",T.box,C),P("saddle",T.box,w),P("bridle",T.box,w,jt*3),P("stirrups",T.rim,g,jt*2);for(let ne of[-1,1]){let ye=new Er([new R(ne*.18,1.92,1.25),new R(ne*.19,1.78,.65),new R(-.34,1.86,.13)]);P(`reins${ne}`,h(new Ts(ye,10,.012,4,!1)),w)}let Se=h(new Ki(.85,1.23,8,8));for(let ne=0;ne<Se.attributes.position.count;ne++){let ye=Se.attributes.position;ye.setZ(ne,Math.sin(ye.getX(ne)*5+ye.getY(ne)*4)*.07)}Se.computeVertexNormals();let gt=document.createElement("canvas");gt.width=128,gt.height=192;let Ze=gt.getContext("2d");Ze.fillStyle="#963d29",Ze.fillRect(0,0,128,192),Ze.strokeStyle="#c5a26d",Ze.lineWidth=6,Ze.strokeRect(8,8,112,176),Ze.font="76px SimSun,serif",Ze.textAlign="center",Ze.fillStyle="#dfcc9b",Ze.fillText("\u519B",64,122);let at=new Sr(gt);at.colorSpace=Qt,f.push(at),S.map=at,P("banner",Se,S);let z=new Float64Array(6),ee=new R,we=new R,ze=new mn,ve=new ti,Me=new nt,je=new nt,Je=new nt,st=new nt,ut=new nt,$e=new nt,_t=new nt,Vt=[new We("#716351"),new We("#46524f"),new We("#5b6241")];function Nt(ne,ye,it,Xe,pt=0,mt=0,Oe=0){return ze.setFromEuler(ve.set(pt,mt,Oe)),Je.compose(ee.set(ye,it,Xe),ze,we.set(1,1,1)),st.multiplyMatrices(ne,Je)}function pe(ne,ye,it,Xe,pt,mt,Oe,Ht,Tn=0,Jt=0,It=0){let gr=B.get(ne);ze.setFromEuler(ve.set(Tn,Jt,It)),Je.compose(ee.set(it,Xe,pt),ze,we.set(mt,Oe,Ht)),st.multiplyMatrices(ye,Je),gr.setMatrixAt(gr.count++,st)}function Ut(ne,ye,it){Te[ie.count]=ne,pe("horseBody",je,0,1.27,0,.34,.43,.78),pe("horseHaunch",je,0,1.28,-.5,.36,.42,.37),pe("horseHaunch",je,0,1.28,.49,.34,.46,.34),pe("horseNeck",je,0,1.68,.66,.21,.5,.23,.38),pe("horseHead",je,0,2.02,.97,.19,.26,.29,.35),pe("horseHead",je,0,1.9,1.2,.18,.17,.25,.3),pe("horseMuzzle",je,0,1.84,1.4,.18,.13,.1);for(let Xe of[-1,1]){pe("horseEars",je,Xe*.1,2.31,.9,.055,.2,.055,-.12,0,Xe*-.18),pe("horseEyes",je,Xe*.179,2.1,1.03,.022,.023,.028),pe("horseEyes",je,Xe*.1,1.91,1.47,.026,.012,.008),pe(`reins${Xe}`,je,0,0,0,1,1,1),pe("stirrups",je,Xe*.5,.96,.23,.12,.16,.12,0,Math.PI/2);for(let pt of[-1,1]){let mt=Math.sin(ye+(Xe===-1?Math.PI:0)+(pt===-1?Math.PI*.5:0))*it;ut.copy(Nt(je,Xe*.26,1.2,pt*.52,mt*.25)),pe("horseLegs",ut,0,-.265,0,.072,.53,.072),$e.copy(Nt(ut,0,-.53,0,Math.max(0,-mt)*.45)),pe("horseLegs",$e,0,-.26,0,.052,.52,.052),pe("horseHooves",$e,0,-.58,.035,.16,.16,.23)}}pe("horseMane",je,0,1.85,.46,.065,.71,.11,.38),pe("horseMane",je,0,2.21,.93,.13,.07,.25,.12),pe("horseTail",je,0,1.04,-1.1,.075,.72,.075,.3,0,Math.sin(ye*.6)*it*.1),pe("saddleBlanket",je,0,1.56,-.04,.68,.1,.72),pe("saddle",je,0,1.65,-.03,.51,.1,.52),pe("bridle",je,0,1.97,1.13,.405,.035,.35,.35),pe("bridle",je,-.2,2.04,1.05,.024,.34,.05,.35),pe("bridle",je,.2,2.04,1.05,.024,.34,.05,.35)}let U=new Float32Array(1024*3),kt=h(new Ot);kt.setAttribute("position",new en(U,3).setUsage(Ds));let dt=new Ar({color:"#914f2b",transparent:!0,opacity:.55});u.push(dt);let E=new As(kt,dt);E.frustumCulled=!1,i.add(E);let _=new Pi,N=new wr({color:"#a54832",transparent:!0,opacity:.55,depthWrite:!1});u.push(N);let G=new qt(h(new Ms(1.5,1.65,40)),N);G.rotation.x=-Math.PI/2,_.add(G),i.add(_);let Z=new qt(h(new Ms(.48,.58,24)),N);Z.rotation.x=-Math.PI/2,Z.visible=!1,i.add(Z);let oe=[],ce=[],$=720,Q=!1;function le(ne,ye){ne.clearRect(0,0,320,80),ne.fillStyle="rgba(36,45,38,.86)",ne.fillRect(0,0,320,80),ne.strokeStyle="#ab9a6f",ne.lineWidth=3,ne.strokeRect(2,2,316,76),ne.fillStyle="#ecdfba",ne.font="36px SimSun,serif",ne.textAlign="center",ne.textBaseline="middle",ne.fillText(ye,160,41)}for(let ne of["\u86C7\u9996 \xB7 \u76FE\u9635","\u86C7\u8EAB \xB7 \u67AA\u9635","\u86C7\u5C3E \xB7 \u5F13\u9635"]){let ye=document.createElement("canvas");ye.width=320,ye.height=80;let it=ye.getContext("2d");ce.push(it),le(it,ne);let Xe=new Sr(ye);Xe.colorSpace=Qt,f.push(Xe);let pt=new vs({map:Xe,depthTest:!1,depthWrite:!1});u.push(pt);let mt=new Eo(pt);mt.center.set(.5,-.6),mt.renderOrder=3,oe.push(mt),i.add(mt)}let Ce=h(new Ot),ue=new Float32Array(360*3),he=new Float32Array(360);Ce.setAttribute("position",new en(ue,3).setUsage(Ds)),Ce.setAttribute("alpha",new en(he,1).setUsage(Ds));let Le=new _n({transparent:!0,depthWrite:!1,vertexShader:"attribute float alpha;varying float vAlpha;void main(){vAlpha=alpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(210./max(1.,-mv.z),2.,30.);}",fragmentShader:"varying float vAlpha;void main(){float d=length(gl_PointCoord-vec2(.5))*2.;if(d>1.)discard;gl_FragColor=vec4(.49,.40,.26,vAlpha*pow(1.-d,2.)*.14);}"});u.push(Le);let ke=new Io(Ce,Le);ke.frustumCulled=!1,i.add(ke);let Ve="field",L=-1,de,K=new Vo,fe=new ge,me;function re(ne){me={x:ne.clientX,y:ne.clientY}}function Fe(ne){if(!me||Math.hypot(ne.clientX-me.x,ne.clientY-me.y)>6)return;me=void 0;let ye=t.domElement.getBoundingClientRect();fe.set((ne.clientX-ye.left)/ye.width*2-1,1-(ne.clientY-ye.top)/ye.height*2),K.setFromCamera(fe,r);let it=K.intersectObjects([W,ie],!1)[0];it?.instanceId!==void 0&&(L=it.object===ie?Te[it.instanceId]:it.instanceId,de?.(L))}n&&(t.domElement.addEventListener("pointerdown",re),t.domElement.addEventListener("pointerup",Fe));let Re=[new R,new R,new R,new R];function St(ne,ye){let it=cu(ne,ye);for(let Oe of B.values())Oe.count=0;let Xe=0;for(let Oe=0;Oe<ne.count;Oe++){Xr(ne,it,Oe,ye,z);let Ht=Math.sin(z[3])*z[4],Tn=qr(ne,Oe),Jt=Tn==="cavalry";ze.setFromEuler(ve.set(0,z[2],0)),je.compose(ee.set(z[0],0,z[1]),ze,we.set(1,1,1)),Jt&&Ut(Oe,z[3]*.8,z[4]),ze.setFromEuler(ve.set(0,z[2],0)),Me.compose(ee.set(z[0],(Jt?.95:0)+Math.abs(Ht)*.015,z[1]),ze,we.set(1,1,1)),pe("body",Me,0,1.13,0,.46,.55,.26),W.setColorAt(Oe,Vt[z[5]]),pe("skirt",Me,0,.8,0,.54,.27,.33),pe("belt",Me,0,.93,.005,.49,.1,.29);for(let It of[-1,1])pe("strap",Me,It*.13,1.18,.145,.022,.42,.02,0,0,It*-.06);pe("head",Me,0,1.57,.006,.15,.2,.145),pe("helmet",Me,0,1.68,0,.19,.2,.18),pe("band",Me,0,1.67,0,.19,.09,.18),pe("plume",Me,0,1.92,-.02,.055,.25,.045,-.25);for(let It of[-1,1])pe("eyes",Me,It*.052,1.59,.146,.017,.011,.011),pe("arms",Me,It*.31,1.12,.06,.15,.44,.16,-.25+Ht*It*.1),pe("hands",Me,It*.34,.91,Tn==="flag"&&It===1?0:.13,.07,.08,.07),ut.copy(Nt(Me,It*(Jt?.21:.14),.77,Jt?.02:0,Jt?-.9:Ht*It*.42,0,Jt?It*.45:0)),pe("legs",ut,0,-.145,0,.15,.28,.18),$e.copy(Nt(ut,0,-.29,0,Jt?1.05:Math.max(0,-Ht*It)*.46,0,Jt?-It*.4:0)),pe("legs",$e,0,-.15,0,.14,.28,.16),pe("boots",$e,0,-.33,.035,.18,.17,.3);if(pe("nose",Me,0,1.55,.165,.025,.034,.03),Tn==="shield")pe("shield",Me,-.43,1.05,.24,.31,.065,.38,Math.PI/2),pe("rim",Me,-.43,1.05,.28,.315,.38,1),pe("boss",Me,-.43,1.05,.3,.075,.075,.055),_t.copy(Nt(Me,.35,1.2,.1,-.08)),pe("spear",_t,0,.55,0,.018,2.1,.018),pe("point",_t,0,1.68,0,.055,.2,.038);else if(Tn==="spear"||Tn==="cavalry")_t.copy(Nt(Me,.35,1.22,.12,-.17-Math.abs(Ht)*.025)),pe("spear",_t,0,.58,0,.021,2.3,.021),pe("point",_t,0,1.83,0,.058,.24,.043);else if(Tn==="bow"){pe("bow",Me,.07,.92,.14,1,1,1,-.1),pe("string",Me,.07,.92,.14,.006,1,.006,-.1),pe("quiver",Me,-.1,1.28,-.24,.095,.47,.095,.15);for(let It=-1;It<=1;It++)pe("arrows",Me,-.1+It*.04,1.54,-.24,.009,.6,.009),pe("arrowtips",Me,-.1+It*.04,1.9,-.24,.025,.12,.022)}else pe("flagpole",Me,.38,1.78,0,.027,3.5,.027),pe("finial",Me,.38,3.57,0,.07,.09,.07),pe("banner",Me,.38,2.79,-.425,1,1,1,0,-Math.PI/2+Math.sin(ye*2.2+Oe)*.16,Math.sin(ye+Oe)*.04);ne.dust&&z[4]&&Oe%4===0&&Xe<360&&(ue[Xe*3]=z[0]-Math.sin(z[2])*.42,ue[Xe*3+1]=.22+Math.abs(Math.sin(ye*2+Oe))*.18,ue[Xe*3+2]=z[1]-Math.cos(z[2])*.42,he[Xe]=.3+.7*Math.abs(Math.sin(ye*1.9+Oe)),Xe++),Oe===L&&(Z.position.set(z[0],.028,z[1]),Z.scale.setScalar(Jt?1.7:1))}for(let Oe of B.values())Oe.instanceMatrix.needsUpdate=!0;W.instanceColor&&(W.instanceColor.needsUpdate=!0),Z.visible=L>=0&&L<ne.count;let pt=Math.ceil(ne.count/ne.ranks),mt=Dn(ne)>0;if(mt!==Q){le(ce[0],mt?"\u86C7\u9996 \xB7 \u524D\u519B":"\u86C7\u9996 \xB7 \u76FE\u9635"),le(ce[1],mt?"\u86C7\u8EAB \xB7 \u6B65\u9635":"\u86C7\u8EAB \xB7 \u67AA\u9635");for(let Oe=0;Oe<2;Oe++)oe[Oe].material.map.needsUpdate=!0;Q=mt}for(let Oe=0;Oe<pt;Oe++)Xr(ne,it,Oe*ne.ranks+(ne.ranks-1)/2,ye,z),U[Oe*3]=z[0],U[Oe*3+1]=.021,U[Oe*3+2]=z[1];kt.setDrawRange(0,pt),kt.attributes.position.needsUpdate=!0,E.visible=ne.guides,D.visible=ne.guides;for(let Oe=0;Oe<3;Oe++){let Ht=Math.min(pt-1,Math.round((pt-1)*[.1,.5,.9][Oe]));Xr(ne,it,Ht*ne.ranks+(ne.ranks-1)/2,ye,z),Re[Oe].set(z[0],1,z[1]),oe[Oe].position.set(z[0],4.6,z[1]),oe[Oe].visible=ne.labels}if(Xr(ne,it,Math.max(0,Math.floor((Dn(ne)-1)/2))*ne.ranks+(ne.ranks-1)/2,ye,z),Re[3].set(z[0],1.65,z[1]),_.visible=ne.guides&&ne.mode==="respond",_.position.set(0,.022,it.radius*.7),Ve==="head"||Ve==="body"||Ve==="tail"||Ve==="cavalry"){let Oe=Re[Ve==="head"?0:Ve==="body"?1:Ve==="tail"?2:3],Ht=s?.target??o;ee.copy(Oe).sub(Ht),r.position.add(ee),Ht.copy(Oe),o.copy(Oe),r.lookAt(Oe)}for(let Oe of oe){let Ht=r.position.distanceTo(Oe.position)*2*Math.tan(Us.degToRad(r.fov/2))*22/$;Oe.scale.set(Ht*4,Ht,1)}return Ce.setDrawRange(0,Xe),Ce.attributes.position.needsUpdate=!0,Ce.attributes.alpha.needsUpdate=!0,s?.update(),t.render(i,r),{columns:pt,length:it.length,response:it.response,dustCount:Xe}}function ft(ne,ye,it){Ve=ne;let Xe=Math.max(au(ye)+20,ye.bend*2+25,32),pt=Math.tan(Us.degToRad(r.fov/2)),mt=Math.max(Xe/(2*pt*r.aspect),Xe*.65)*1.12;if(o.set(0,1,ye.mode==="respond"?Xe*.12:0),ne==="head"||ne==="body"||ne==="tail"||ne==="cavalry"){let Ht=cu(ye,it),Tn=Math.ceil(ye.count/ye.ranks),Jt=ne==="head"?.1:ne==="body"?.5:.9,It=ne==="cavalry"?Math.max(0,Math.floor((Dn(ye)-1)/2)):Math.round((Tn-1)*Jt);Xr(ye,Ht,It*ye.ranks+(ye.ranks-1)/2,it,z),o.set(z[0],ne==="cavalry"?1.65:1,z[1]),r.position.copy(o).add(new R(8,6,12).multiplyScalar(r.aspect<1?1.4:1))}else r.position.copy(o).add(ne==="overview"?new R(0,mt,.1):new R(.17,.64,.75).normalize().multiplyScalar(mt));s?.target.copy(o),r.lookAt(o),s?.update(),i.fog=new bs("#b6b59e",Math.max(150,mt*1.7),Math.max(700,mt*4));let Oe=Math.min(700,Xe*.6+25);a.shadow.camera.left=-Oe,a.shadow.camera.right=Oe,a.shadow.camera.top=Oe,a.shadow.camera.bottom=-Oe,a.shadow.camera.far=Math.max(500,Oe*3),a.shadow.camera.updateProjectionMatrix()}function En(ne,ye){$=Math.max(1,ye),t.setSize(ne,ye),r.aspect=ne/ye,r.updateProjectionMatrix()}function Ln(){return{position:r.position.toArray(),target:(s?.target??o).toArray(),preset:Ve,aspect:r.aspect}}function ru(ne,ye=!1){r.position.fromArray(ne.position),o.fromArray(ne.target),ye&&r.position.sub(o).multiplyScalar(Math.max(1,ne.aspect/r.aspect)).add(o),s?.target.copy(o),Ve=ne.preset,r.lookAt(o)}function su(){s?.dispose(),t.domElement.removeEventListener("pointerdown",re),t.domElement.removeEventListener("pointerup",Fe);for(let ne of B.values())ne.dispose();new Set(l).forEach(ne=>ne.dispose()),new Set(u).forEach(ne=>ne.dispose()),f.forEach(ne=>ne.dispose()),t.dispose(),t.forceContextLoss(),t.domElement.remove()}return{renderer:t,update:St,resize:En,setView:ft,view:Ln,applyView:ru,dispose:su,onPick:ne=>{de=ne},clearSelection:()=>{L=-1}}}function J(n){if(!n)throw new Error("Assertion failed.")}var zv=Math.PI/180,sT=180/Math.PI,Vv=n=>{let e=(n%360+360)%360;if(e===0||e===90||e===180||e===270)return e;throw new Error(`Invalid rotation ${n}.`)},Oh=[1,0,0,0,1,0,0,0,1],zp=(n,e,t)=>{let[i,r,,s,o]=n,a=Math.abs(i)*e+Math.abs(s)*t,c=Math.abs(r)*e+Math.abs(o)*t;return Bl(Bl(kp(-e/2,-t/2),n),kp(a/2,c/2))};var Vp=n=>{let e=n*zv,t=Math.round(Math.cos(e)),i=Math.round(Math.sin(e));return[t,i,0,-i,t,0,0,0,1]},kp=(n,e)=>[1,0,0,0,1,0,n,e,1],Hp=(n,e)=>[n,0,0,0,e,0,0,0,1],Bl=(n,e)=>{let t=new Array(9);for(let i=0;i<3;i++)for(let r=0;r<3;r++)t[3*i+r]=n[3*i]*e[r]+n[3*i+1]*e[3+r]+n[3*i+2]*e[6+r];return t},Gp=(n,e,t,i)=>({rotation:Vv(n+(e?-t:t)),flip:e!==i}),xn=n=>n&&n[n.length-1],yi=n=>n>=0&&n<2**32,Wp=n=>n>=-(2**31)&&n<2**31,ae=n=>{let e=0;for(;n.readBits(1)===0&&e<32;)e++;if(e>=32)throw new Error("Invalid exponential-Golomb code.");return(1<<e)-1+n.readBits(e)};var xi=n=>{let e=ae(n);return e&1?e+1>>1:-(e>>1)};var hn=n=>n.constructor===Uint8Array?n:ArrayBuffer.isView(n)?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):new Uint8Array(n),ur=n=>n.constructor===DataView?n:ArrayBuffer.isView(n)?new DataView(n.buffer,n.byteOffset,n.byteLength):new DataView(n),Hv=typeof globalThis.TextEncoder<"u"?globalThis.TextEncoder:class{constructor(){this.encoding="utf-8"}encode(e=""){let t=new Uint8Array(3*e.length),i=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);if(s<128)t[i++]=s;else if(s<2048)t[i++]=192|s>>6,t[i++]=128|s&63;else if(s<55296||s>57343)t[i++]=224|s>>12,t[i++]=128|s>>6&63,t[i++]=128|s&63;else{let o=r+1<e.length?e.charCodeAt(r+1):0;s<56320&&o>=56320&&o<=57343?(s=65536+(s-55296<<10)+(o-56320),r++,t[i++]=240|s>>18,t[i++]=128|s>>12&63,t[i++]=128|s>>6&63,t[i++]=128|s&63):(t[i++]=239,t[i++]=191,t[i++]=189)}}return t.slice(0,i)}},aT=typeof globalThis.TextDecoder<"u"?globalThis.TextDecoder:class{constructor(e="utf-8"){let t=e.trim().toLowerCase();if(t==="utf-8"||t==="utf8"||t==="unicode-1-1-utf-8")this.encoding="utf-8";else if(t==="utf-16le"||t==="utf-16")this.encoding="utf-16le";else if(t==="utf-16be")this.encoding="utf-16be";else throw new RangeError(`The encoding label provided ('${e}') is invalid.`)}decode(e){let t=e?hn(e):new Uint8Array(0),i=[];if(this.encoding==="utf-8"){let s=t.length>=3&&t[0]===239&&t[1]===187&&t[2]===191?3:0;for(;s<t.length;){let o=t[s];if(o<128){i.push(o),s++;continue}let a,c;if(o>=194&&o<224)a=1,c=o&31;else if(o>=224&&o<240)a=2,c=o&15;else if(o>=240&&o<245)a=3,c=o&7;else{i.push(65533),s++;continue}let l=o===224?160:o===240?144:128,u=o===237?159:o===244?143:191,f=1;for(;f<=a;f++){let h=s+f<t.length?t[s+f]:0;if(h<l||h>u)break;c=c<<6|h&63,l=128,u=191}s+=f,f<=a?i.push(65533):c>=65536?(c-=65536,i.push(55296|c>>10,56320|c&1023)):i.push(c)}}else{let s=this.encoding==="utf-16le",o=s?255:254,a=s?254:255,c=t.length>=2&&t[0]===o&&t[1]===a?2:0;for(;c+1<t.length;){let l=s?t[c]|t[c+1]<<8:t[c]<<8|t[c+1];if(c+=2,l>=55296&&l<=56319){let u=c+1<t.length?s?t[c]|t[c+1]<<8:t[c]<<8|t[c+1]:-1;u>=56320&&u<=57343?(i.push(l,u),c+=2):i.push(65533)}else l>=56320&&l<=57343?i.push(65533):i.push(l)}c<t.length&&i.push(65533)}let r="";for(let s=0;s<i.length;s+=8192)r+=String.fromCharCode(...i.slice(s,s+8192));return r}};var Hn=new Hv;var Br={bt709:1,bt470bg:5,smpte170m:6,bt2020:9,smpte432:12};var Lr={bt709:1,smpte170m:6,linear:8,"iec61966-2-1":13,pq:16,hlg:18};var Fr={rgb:0,bt709:1,bt470bg:5,smpte170m:6,"bt2020-ncl":9};var qp=n=>!n||n.primaries==null&&n.transfer==null&&n.matrix==null&&n.fullRange==null;var na=n=>n instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&n instanceof SharedArrayBuffer||ArrayBuffer.isView(n),Vs=class{constructor(){this.currentPromise=Promise.resolve(),this.pending=0}async acquire(){let e,t=new Promise(r=>{let s=!1;e=()=>{s||(r(),this.pending--,s=!0)}}),i=this.currentPromise;return this.currentPromise=t,this.pending++,await i,e}};var Nh=(n,e,t)=>{let i=0,r=n.length-1,s=-1;for(;i<=r;){let o=i+(r-i+1)/2|0;t(n[o])<=e?(s=o,i=o+1):r=o-1}return s};var Fl=()=>{let n,e;return{promise:new Promise((i,r)=>{n=i,e=r}),resolve:n,reject:e}};var oi=n=>{throw new Error(`Unexpected value: ${n}`)},kh=(n,e,t)=>{let i=n.getUint8(e),r=n.getUint8(e+1),s=n.getUint8(e+2);return t?i|r<<8|s<<16:i<<16|r<<8|s};var zh=(n,e,t,i)=>{t=t>>>0,t=t&16777215,i?(n.setUint8(e,t&255),n.setUint8(e+1,t>>>8&255),n.setUint8(e+2,t>>>16&255)):(n.setUint8(e,t>>>16&255),n.setUint8(e+1,t>>>8&255),n.setUint8(e+2,t&255))};var Hs=(n,e,t)=>Math.max(e,Math.min(t,n)),Xp=(n,e,t)=>n+(e-n)*t;var Yp="und";var Vh=(n,e)=>Math.round(n/e)*e;var Hh=(n,e)=>Math.floor(n*e)/e;var Zp=n=>{let e=0;for(;n!==0;)n&=n-1,e++;return e},Gv=/^[a-z]{3}$/,$p=n=>Gv.test(n),hr=1e6*(1+Number.EPSILON);var jp=(n,e)=>{let t=n<0?-1:1;n=Math.abs(n);let i=0,r=1,s=1,o=0,a=n;for(;;){let c=Math.floor(a),l=c*s+i,u=c*o+r;if(u>e)return{num:t*s,den:o};if(i=s,r=o,s=l,o=u,a=1/(a-c),!isFinite(a))break}return{num:t*s,den:o}},Ll=class{constructor(){this.currentPromise=Promise.resolve()}call(e){return this.currentPromise=this.currentPromise.then(e)}};var Dh=null,Dl=()=>Dh!==null?Dh:Dh=typeof navigator<"u"&&navigator.userAgent?.includes("Firefox"),Uh=null,Jp=()=>Uh!==null?Uh:Uh=!!(typeof navigator<"u"&&(navigator.vendor?.includes("Google Inc")||/Chrome/.test(navigator.userAgent)));var Kp=n=>typeof globalThis.isSecureContext<"u"&&!globalThis.isSecureContext?`${n} is not available in this environment; this may be because this page is running in an insecure context. Try serving your page over HTTPS or use localhost.`:`${n} is not available in this environment.`,Qp=n=>n instanceof DOMException&&n.name==="QuotaExceededError"&&/reclaimed/i.test(n.message),Wv=(async()=>{})().constructor,ai=n=>n instanceof Wv||n instanceof Promise?!0:typeof n?.then=="function";var Ul=function*(n){for(let e in n){let t=n[e];t!==void 0&&(yield{key:e,value:t})}};var em=()=>{Symbol.dispose??=Symbol("Symbol.dispose")},tm=n=>typeof n=="number"&&!Number.isNaN(n);var nm=(n,e)=>{let t=-1,i=1/0;for(let r=0;r<n.length;r++){let s=e(n[r]);s<i&&(i=s,t=r)}return t};var Ol=n=>{J(Number.isInteger(n.num)),J(Number.isInteger(n.den)),J(n.den!==0);let e=Math.abs(n.num),t=Math.abs(n.den);for(;t!==0;){let r=e%t;e=t,t=r}let i=e||1;return{num:n.num/i,den:n.den/i}},Nl=(n,e)=>{if(typeof n!="object"||!n)throw new TypeError(`${e} must be an object.`);if(!Number.isInteger(n.left)||n.left<0)throw new TypeError(`${e}.left must be a non-negative integer.`);if(!Number.isInteger(n.top)||n.top<0)throw new TypeError(`${e}.top must be a non-negative integer.`);if(!Number.isInteger(n.width)||n.width<0)throw new TypeError(`${e}.width must be a non-negative integer.`);if(!Number.isInteger(n.height)||n.height<0)throw new TypeError(`${e}.height must be a non-negative integer.`)};var im=n=>new Promise(e=>setTimeout(e,n));var kl=n=>Array.isArray(n)?n:[n],lr=class{constructor(){this._listeners=new Map}on(e,t,i){this._listeners.has(e)||this._listeners.set(e,new Set);let r={fn:t,once:i?.once??!1};return this._listeners.get(e).add(r),()=>{this._listeners.get(e)?.delete(r)}}_emit(...e){let[t,i]=e,r=this._listeners.get(t);if(r)for(let s of r){try{s.fn(i)}catch(o){console.error(o)}s.once&&r.delete(s)}}};var rm=n=>n!==null&&typeof n=="object"&&Object.getPrototypeOf(n)===Object.prototype&&Object.values(n).every(e=>typeof e=="string");var bi;(function(n){n[n.Silent=0]="Silent",n[n.Errors=1]="Errors",n[n.Warnings=2]="Warnings",n[n.Info=3]="Info"})(bi||(bi={}));var nn=class n{constructor(){}static get level(){return n._level}static set level(e){if(e!==bi.Silent&&e!==bi.Errors&&e!==bi.Warnings&&e!==bi.Info)throw new TypeError("Invalid log level. Use one of the values of the LogLevel enum.");n._level=e}static get _emitter(){return n._emitterInstance??=new lr}static on(e,t,i){return n._emitter.on(e,t,i)}static _error(...e){n._emitter._emit("error",e),n._level>=bi.Errors&&console.error(...e)}static _warn(...e){n._emitter._emit("warn",e),n._level>=bi.Warnings&&console.warn(...e)}static _info(...e){n._emitter._emit("info",e),n._level>=bi.Info&&console.info(...e)}};nn._level=bi.Info;nn._emitterInstance=null;var ia=class{constructor(e,t){if(this.data=e,this.mimeType=t,!(e instanceof Uint8Array))throw new TypeError("data must be a Uint8Array.");if(typeof t!="string")throw new TypeError("mimeType must be a string.")}},Gh=class{constructor(e,t,i,r){if(this.data=e,this.mimeType=t,this.name=i,this.description=r,!(e instanceof Uint8Array))throw new TypeError("data must be a Uint8Array.");if(t!==void 0&&typeof t!="string")throw new TypeError("mimeType, when provided, must be a string.");if(i!==void 0&&typeof i!="string")throw new TypeError("name, when provided, must be a string.");if(r!==void 0&&typeof r!="string")throw new TypeError("description, when provided, must be a string.")}},sm=n=>{if(!n||typeof n!="object")throw new TypeError("tags must be an object.");if(n.title!==void 0&&typeof n.title!="string")throw new TypeError("tags.title, when provided, must be a string.");if(n.description!==void 0&&typeof n.description!="string")throw new TypeError("tags.description, when provided, must be a string.");if(n.artist!==void 0&&typeof n.artist!="string")throw new TypeError("tags.artist, when provided, must be a string.");if(n.album!==void 0&&typeof n.album!="string")throw new TypeError("tags.album, when provided, must be a string.");if(n.albumArtist!==void 0&&typeof n.albumArtist!="string")throw new TypeError("tags.albumArtist, when provided, must be a string.");if(n.trackNumber!==void 0&&(!Number.isInteger(n.trackNumber)||n.trackNumber<=0))throw new TypeError("tags.trackNumber, when provided, must be a positive integer.");if(n.tracksTotal!==void 0&&(!Number.isInteger(n.tracksTotal)||n.tracksTotal<=0))throw new TypeError("tags.tracksTotal, when provided, must be a positive integer.");if(n.discNumber!==void 0&&(!Number.isInteger(n.discNumber)||n.discNumber<=0))throw new TypeError("tags.discNumber, when provided, must be a positive integer.");if(n.discsTotal!==void 0&&(!Number.isInteger(n.discsTotal)||n.discsTotal<=0))throw new TypeError("tags.discsTotal, when provided, must be a positive integer.");if(n.genre!==void 0&&typeof n.genre!="string")throw new TypeError("tags.genre, when provided, must be a string.");if(n.date!==void 0&&(!(n.date instanceof Date)||Number.isNaN(n.date.getTime())))throw new TypeError("tags.date, when provided, must be a valid Date.");if(n.beatsPerMinute!==void 0&&(!Number.isInteger(n.beatsPerMinute)||n.beatsPerMinute<=0))throw new TypeError("tags.beatsPerMinute, when provided, must be a positive integer.");if(n.lyrics!==void 0&&typeof n.lyrics!="string")throw new TypeError("tags.lyrics, when provided, must be a string.");if(n.images!==void 0){if(!Array.isArray(n.images))throw new TypeError("tags.images, when provided, must be an array.");for(let e of n.images){if(!e||typeof e!="object")throw new TypeError("Each image in tags.images must be an object.");if(!(e.data instanceof Uint8Array))throw new TypeError("Each image.data must be a Uint8Array.");if(typeof e.mimeType!="string")throw new TypeError("Each image.mimeType must be a string.");if(!["coverFront","coverBack","unknown"].includes(e.kind))throw new TypeError("Each image.kind must be 'coverFront', 'coverBack', or 'unknown'.")}}if(n.comment!==void 0&&typeof n.comment!="string")throw new TypeError("tags.comment, when provided, must be a string.");if(n.raw!==void 0){if(!n.raw||typeof n.raw!="object")throw new TypeError("tags.raw, when provided, must be an object.");for(let e of Object.values(n.raw))if(e!==null&&typeof e!="string"&&!(Array.isArray(e)&&e.every(t=>typeof t=="string"))&&!(e instanceof Uint8Array)&&!(e instanceof ia)&&!(e instanceof Gh)&&!rm(e))throw new TypeError("Each value in tags.raw must be a string, string array, Uint8Array, RichImageData, AttachedFile, Record<string, string>, or null.")}};var om=n=>{if(!n||typeof n!="object")throw new TypeError("disposition must be an object.");if(n.default!==void 0&&typeof n.default!="boolean")throw new TypeError("disposition.default must be a boolean.");if(n.primary!==void 0&&typeof n.primary!="boolean")throw new TypeError("disposition.primary must be a boolean.");if(n.forced!==void 0&&typeof n.forced!="boolean")throw new TypeError("disposition.forced must be a boolean.");if(n.original!==void 0&&typeof n.original!="boolean")throw new TypeError("disposition.original must be a boolean.");if(n.commentary!==void 0&&typeof n.commentary!="boolean")throw new TypeError("disposition.commentary must be a boolean.");if(n.hearingImpaired!==void 0&&typeof n.hearingImpaired!="boolean")throw new TypeError("disposition.hearingImpaired must be a boolean.");if(n.visuallyImpaired!==void 0&&typeof n.visuallyImpaired!="boolean")throw new TypeError("disposition.visuallyImpaired must be a boolean.")};var Ft=class n{constructor(e){this.bytes=e,this.pos=0}seekToByte(e){this.pos=8*e}readBit(){let e=Math.floor(this.pos/8),t=this.bytes[e]??0,i=7-(this.pos&7),r=(t&1<<i)>>i;return this.pos++,r}readBits(e){if(e===1)return this.readBit();let t=0;for(let i=0;i<e;i++)t<<=1,t|=this.readBit();return t}writeBits(e,t){let i=this.pos+e;for(let r=this.pos;r<i;r++){let s=Math.floor(r/8),o=this.bytes[s],a=7-(r&7);o&=~(1<<a),o|=(t&1<<i-r-1)>>i-r-1<<a,this.bytes[s]=o}this.pos=i}copyBits(e,t){let i=0;for(i;i<e-7;i+=8)this.writeBits(8,t.readBits(8));let r=e-i;r>0&&this.writeBits(r,t.readBits(r))}readAlignedByte(){if(this.pos%8!==0)throw new Error("Bitstream is not byte-aligned.");let e=this.pos/8,t=this.bytes[e]??0;return this.pos+=8,t}skipBits(e){this.pos+=e}getBitsLeft(){return this.bytes.length*8-this.pos}clone(){let e=new n(this.bytes);return e.pos=this.pos,e}};var qh=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],Xh=[-1,1,2,3,4,5,6,8];var lm=n=>{let e=n.objectType===5||n.objectType===29,t=n.objectType===29,i=e?n.outputSampleRate/2:n.outputSampleRate,r=t?1:n.outputNumberOfChannels,s=Xh.indexOf(r);if(s===-1)throw new TypeError(`Unsupported number of channels: ${n.outputNumberOfChannels}`);let o=16;n.objectType>=32&&(o+=6),Wh(i)===15&&(o+=24),e&&(o+=9,Wh(n.outputSampleRate)===15&&(o+=24));let a=Math.ceil(o/8),c=new Uint8Array(a),l=new Ft(c);return am(l,n.objectType),cm(l,i),l.writeBits(4,s),e&&(cm(l,n.outputSampleRate),am(l,2)),l.writeBits(3,0),c},am=(n,e)=>{e<32?n.writeBits(5,e):(n.writeBits(5,31),n.writeBits(6,e-32))},cm=(n,e)=>{let t=Wh(e);n.writeBits(4,t),t===15&&n.writeBits(24,e)},Wh=n=>{let e=qh.indexOf(n);return e===-1?15:e};var um=[48e3,44100,32e3],hm=[24e3,22050,16e3];var qv="1.61.1",zl=`Mediabunny v${qv}`;var Ui;(function(n){n[n.NON_IDR_SLICE=1]="NON_IDR_SLICE",n[n.SLICE_DPA=2]="SLICE_DPA",n[n.SLICE_DPB=3]="SLICE_DPB",n[n.SLICE_DPC=4]="SLICE_DPC",n[n.IDR=5]="IDR",n[n.SEI=6]="SEI",n[n.SPS=7]="SPS",n[n.PPS=8]="PPS",n[n.AUD=9]="AUD",n[n.SPS_EXT=13]="SPS_EXT"})(Ui||(Ui={}));var Gn;(function(n){n[n.RASL_N=8]="RASL_N",n[n.RASL_R=9]="RASL_R",n[n.BLA_W_LP=16]="BLA_W_LP",n[n.RSV_IRAP_VCL23=23]="RSV_IRAP_VCL23",n[n.VPS_NUT=32]="VPS_NUT",n[n.SPS_NUT=33]="SPS_NUT",n[n.PPS_NUT=34]="PPS_NUT",n[n.AUD_NUT=35]="AUD_NUT",n[n.PREFIX_SEI_NUT=39]="PREFIX_SEI_NUT",n[n.SUFFIX_SEI_NUT=40]="SUFFIX_SEI_NUT"})(Gn||(Gn={}));var Gs=function*(n){let e=0,t=-1;for(;e<n.length-2;){let i=n.indexOf(0,e);if(i===-1||i>=n.length-2)break;e=i;let r=0;if(e+3<n.length&&n[e+1]===0&&n[e+2]===0&&n[e+3]===1?r=4:n[e+1]===0&&n[e+2]===1&&(r=3),r===0){e++;continue}t!==-1&&e>t&&(yield{offset:t,length:e-t}),t=e+r,e=t}t!==-1&&t<n.length&&(yield{offset:t,length:n.length-t})},ym=function*(n,e){let t=0,i=new DataView(n.buffer,n.byteOffset,n.byteLength);for(;t+e<=n.length;){let r;e===1?r=i.getUint8(t):e===2?r=i.getUint16(t,!1):e===3?r=kh(i,t,!1):(J(e===4),r=i.getUint32(t,!1)),t+=e,yield{offset:t,length:r},t+=r}},Zv=(n,e)=>{if(e.description){let r=(hn(e.description)[4]&3)+1;return ym(n,r)}else return Gs(n)},xm=n=>n&31,Vl=n=>{let e=[],t=n.length;for(let i=0;i<t;i++)i+2<t&&n[i]===0&&n[i+1]===0&&n[i+2]===3?(e.push(0,0),i+=2):e.push(n[i]);return new Uint8Array(e)};var ET=new Uint8Array([0,0,0,1]);var bm=(n,e)=>{let t=n.reduce((s,o)=>s+e+o.byteLength,0),i=new Uint8Array(t),r=0;for(let s of n){let o=new DataView(i.buffer,i.byteOffset,i.byteLength);switch(e){case 1:o.setUint8(r,s.byteLength);break;case 2:o.setUint16(r,s.byteLength,!1);break;case 3:zh(o,r,s.byteLength,!1);break;case 4:o.setUint32(r,s.byteLength,!1);break}r+=e,i.set(s,r),r+=s.byteLength}return i};var vm=n=>{try{let e=[],t=[],i=[];for(let a of Gs(n)){let c=n.subarray(a.offset,a.offset+a.length),l=xm(c[0]);l===Ui.SPS?e.push(c):l===Ui.PPS?t.push(c):l===Ui.SPS_EXT&&i.push(c)}if(e.length===0||t.length===0)return null;let r=e[0],s=$v(r);J(s!==null);let o=s.profileIdc===100||s.profileIdc===110||s.profileIdc===122||s.profileIdc===144;return{configurationVersion:1,avcProfileIndication:s.profileIdc,profileCompatibility:s.constraintFlags,avcLevelIndication:s.levelIdc,lengthSizeMinusOne:3,sequenceParameterSets:e,pictureParameterSets:t,chromaFormat:o?s.chromaFormatIdc:null,bitDepthLumaMinus8:o?s.bitDepthLumaMinus8:null,bitDepthChromaMinus8:o?s.bitDepthChromaMinus8:null,sequenceParameterSetExt:o?i:null}}catch(e){return nn._error("Error building AVC Decoder Configuration Record:",e),null}},wm=n=>{let e=[];e.push(n.configurationVersion),e.push(n.avcProfileIndication),e.push(n.profileCompatibility),e.push(n.avcLevelIndication),e.push(252|n.lengthSizeMinusOne&3),e.push(224|n.sequenceParameterSets.length&31);for(let t of n.sequenceParameterSets){let i=t.byteLength;e.push(i>>8),e.push(i&255);for(let r=0;r<i;r++)e.push(t[r])}e.push(n.pictureParameterSets.length);for(let t of n.pictureParameterSets){let i=t.byteLength;e.push(i>>8),e.push(i&255);for(let r=0;r<i;r++)e.push(t[r])}if((n.avcProfileIndication===100||n.avcProfileIndication===110||n.avcProfileIndication===122||n.avcProfileIndication===144)&&n.chromaFormat!==null){J(n.bitDepthLumaMinus8!==null),J(n.bitDepthChromaMinus8!==null),J(n.sequenceParameterSetExt!==null),e.push(252|n.chromaFormat&3),e.push(248|n.bitDepthLumaMinus8&7),e.push(248|n.bitDepthChromaMinus8&7),e.push(n.sequenceParameterSetExt.length);for(let t of n.sequenceParameterSetExt){let i=t.byteLength;e.push(i>>8),e.push(i&255);for(let r=0;r<i;r++)e.push(t[r])}}return new Uint8Array(e)};var Am={1:{num:1,den:1},2:{num:12,den:11},3:{num:10,den:11},4:{num:16,den:11},5:{num:40,den:33},6:{num:24,den:11},7:{num:20,den:11},8:{num:32,den:11},9:{num:80,den:33},10:{num:18,den:11},11:{num:15,den:11},12:{num:64,den:33},13:{num:160,den:99},14:{num:4,den:3},15:{num:3,den:2},16:{num:2,den:1}},$v=n=>{try{let e=Vl(n),t=new Ft(e);if(t.skipBits(1),t.skipBits(2),t.readBits(5)!==7)return null;let r=t.readAlignedByte(),s=t.readAlignedByte(),o=t.readAlignedByte();ae(t);let a=1,c=0,l=0,u=0;if((r===100||r===110||r===122||r===244||r===44||r===83||r===86||r===118||r===128)&&(a=ae(t),a===3&&(u=t.readBits(1)),c=ae(t),l=ae(t),t.skipBits(1),t.readBits(1))){for(let W=0;W<(a!==3?8:12);W++)if(t.readBits(1)){let te=W<6?16:64,X=8,j=8;for(let ie=0;ie<te;ie++){if(j!==0){let Te=xi(t);j=(X+Te+256)%256}X=j===0?X:j}}}ae(t);let f=ae(t);if(f===0)ae(t);else if(f===1){t.skipBits(1),xi(t),xi(t);let P=ae(t);for(let W=0;W<P;W++)xi(t)}ae(t),t.skipBits(1);let h=ae(t),d=ae(t),m=16*(h+1),y=16*(d+1),g=m,p=y,w=t.readBits(1);if(w||t.skipBits(1),t.skipBits(1),t.readBits(1)){let P=ae(t),W=ae(t),Y=ae(t),te=ae(t),X,j;if((u===0?a:0)===0)X=1,j=2-w;else{let Te=a===3?1:2,Se=a===1?2:1;X=Te,j=Se*(2-w)}g-=X*(P+W),p-=j*(Y+te)}let v=2,A=2,S=2,T=0,x={num:1,den:1},M=null,I=null,D=null,O=null,k=t.pos;if(t.readBits(1)){if(t.readBits(1)){let Te=t.readBits(8);if(Te===255)x={num:t.readBits(16),den:t.readBits(16)};else{let Se=Am[Te];Se&&(x=Se)}}t.readBits(1)&&t.skipBits(1),t.readBits(1)&&(t.skipBits(3),T=t.readBits(1),t.readBits(1)&&(v=t.readBits(8),A=t.readBits(8),S=t.readBits(8))),t.readBits(1)&&(ae(t),ae(t)),t.readBits(1)&&(t.skipBits(32),t.skipBits(32),t.skipBits(1));let j=t.readBits(1);j&&dm(t);let ie=t.readBits(1);ie&&dm(t),(j||ie)&&t.skipBits(1),t.skipBits(1),D=t.pos,O=t.readBits(1),O&&(t.skipBits(1),ae(t),ae(t),ae(t),ae(t),M=ae(t),I=ae(t))}if(M===null){J(I===null);let P=s&16;if((r===44||r===86||r===100||r===110||r===122||r===244)&&P)M=0,I=0;else{let W=h+1,Y=d+1,te=(2-w)*Y,X=ra.find(ie=>ie.level>=o)??xn(ra),j=Math.min(Math.floor(X.maxDpbMbs/(W*te)),16);M=j,I=j}}return J(I!==null),{emulationUnpreventedBytes:e,profileIdc:r,constraintFlags:s,levelIdc:o,frameMbsOnlyFlag:w,chromaFormatIdc:a,bitDepthLumaMinus8:c,bitDepthChromaMinus8:l,codedWidth:m,codedHeight:y,displayWidth:g,displayHeight:p,pixelAspectRatio:x,colourPrimaries:v,matrixCoefficients:S,transferCharacteristics:A,fullRangeFlag:T,numReorderFrames:M,maxDecFrameBuffering:I,vuiParametersFlagBitOffset:k,bitstreamRestrictionFlagBitOffset:D,bitstreamRestrictionFlag:O}}catch(e){return nn._error("Error parsing AVC SPS:",e),null}},dm=n=>{let e=ae(n);n.skipBits(4),n.skipBits(4);for(let t=0;t<=e;t++)ae(n),ae(n),n.skipBits(1);n.skipBits(5),n.skipBits(5),n.skipBits(5),n.skipBits(5)};var jv=(n,e)=>{if(e.description){let r=(hn(e.description)[21]&3)+1;return ym(n,r)}else return Gs(n)},Yh=n=>n>>1&63,Jv=n=>{try{let e=new Ft(Vl(n));e.skipBits(16),e.readBits(4);let t=e.readBits(3),i=e.readBits(1),{general_profile_space:r,general_tier_flag:s,general_profile_idc:o,general_profile_compatibility_flags:a,general_constraint_indicator_flags:c,general_level_idc:l}=Kv(e,t);ae(e);let u=ae(e),f=0;u===3&&(f=e.readBits(1));let h=ae(e),d=ae(e),m=h,y=d;if(e.readBits(1)){let O=ae(e),k=ae(e),B=ae(e),P=ae(e),W=1,Y=1,te=f===0?u:0;te===1?(W=2,Y=2):te===2&&(W=2,Y=1),m-=(O+k)*W,y-=(B+P)*Y}let g=ae(e),p=ae(e);ae(e);let C=e.readBits(1)?0:t,v=0;for(let O=C;O<=t;O++)ae(e),v=ae(e),ae(e);ae(e),ae(e),ae(e),ae(e),ae(e),ae(e),e.readBits(1)&&e.readBits(1)&&Qv(e),e.skipBits(1),e.skipBits(1),e.readBits(1)&&(e.skipBits(4),e.skipBits(4),ae(e),ae(e),e.skipBits(1));let A=ae(e);if(ew(e,A),e.readBits(1)){let O=ae(e);for(let k=0;k<O;k++)ae(e),e.skipBits(1)}e.skipBits(1),e.skipBits(1);let S=2,T=2,x=2,M=0,I=0,D={num:1,den:1};if(e.readBits(1)){let O=nw(e,t);D=O.pixelAspectRatio,S=O.colourPrimaries,T=O.transferCharacteristics,x=O.matrixCoefficients,M=O.fullRangeFlag,I=O.minSpatialSegmentationIdc}return{displayWidth:m,displayHeight:y,pixelAspectRatio:D,colourPrimaries:S,transferCharacteristics:T,matrixCoefficients:x,fullRangeFlag:M,maxDecFrameBuffering:v+1,spsMaxSubLayersMinus1:t,spsTemporalIdNestingFlag:i,generalProfileSpace:r,generalTierFlag:s,generalProfileIdc:o,generalProfileCompatibilityFlags:a,generalConstraintIndicatorFlags:c,generalLevelIdc:l,chromaFormatIdc:u,bitDepthLumaMinus8:g,bitDepthChromaMinus8:p,minSpatialSegmentationIdc:I}}catch(e){return nn._error("Error parsing HEVC SPS:",e),null}},Sm=n=>{try{let e=[],t=[],i=[],r=[];for(let l of Gs(n)){let u=n.subarray(l.offset,l.offset+l.length),f=Yh(u[0]);f===Gn.VPS_NUT?e.push(u):f===Gn.SPS_NUT?t.push(u):f===Gn.PPS_NUT?i.push(u):(f===Gn.PREFIX_SEI_NUT||f===Gn.SUFFIX_SEI_NUT)&&r.push(u)}if(t.length===0||i.length===0)return null;let s=Jv(t[0]);if(!s)return null;let o=0;if(i.length>0){let l=i[0],u=new Ft(Vl(l));u.skipBits(16),ae(u),ae(u),u.skipBits(1),u.skipBits(1),u.skipBits(3),u.skipBits(1),u.skipBits(1),ae(u),ae(u),xi(u),u.skipBits(1),u.skipBits(1),u.readBits(1)&&ae(u),xi(u),xi(u),u.skipBits(1),u.skipBits(1),u.skipBits(1),u.skipBits(1);let f=u.readBits(1),h=u.readBits(1);!f&&!h?o=0:f&&!h?o=2:!f&&h?o=3:o=0}let a=[...e.length?[{arrayCompleteness:1,nalUnitType:Gn.VPS_NUT,nalUnits:e}]:[],...t.length?[{arrayCompleteness:1,nalUnitType:Gn.SPS_NUT,nalUnits:t}]:[],...i.length?[{arrayCompleteness:1,nalUnitType:Gn.PPS_NUT,nalUnits:i}]:[],...r.length?[{arrayCompleteness:1,nalUnitType:Yh(r[0][0]),nalUnits:r}]:[]];return{configurationVersion:1,generalProfileSpace:s.generalProfileSpace,generalTierFlag:s.generalTierFlag,generalProfileIdc:s.generalProfileIdc,generalProfileCompatibilityFlags:s.generalProfileCompatibilityFlags,generalConstraintIndicatorFlags:s.generalConstraintIndicatorFlags,generalLevelIdc:s.generalLevelIdc,minSpatialSegmentationIdc:s.minSpatialSegmentationIdc,parallelismType:o,chromaFormatIdc:s.chromaFormatIdc,bitDepthLumaMinus8:s.bitDepthLumaMinus8,bitDepthChromaMinus8:s.bitDepthChromaMinus8,avgFrameRate:0,constantFrameRate:0,numTemporalLayers:s.spsMaxSubLayersMinus1+1,temporalIdNested:s.spsTemporalIdNestingFlag,lengthSizeMinusOne:3,arrays:a}}catch(e){return nn._error("Error building HEVC Decoder Configuration Record:",e),null}},Kv=(n,e)=>{let t=n.readBits(2),i=n.readBits(1),r=n.readBits(5),s=0;for(let u=0;u<32;u++)s=s<<1|n.readBits(1);let o=new Uint8Array(6);for(let u=0;u<6;u++)o[u]=n.readBits(8);let a=n.readBits(8),c=[],l=[];for(let u=0;u<e;u++)c.push(n.readBits(1)),l.push(n.readBits(1));if(e>0)for(let u=e;u<8;u++)n.skipBits(2);for(let u=0;u<e;u++)c[u]&&n.skipBits(88),l[u]&&n.skipBits(8);return{general_profile_space:t,general_tier_flag:i,general_profile_idc:r,general_profile_compatibility_flags:s,general_constraint_indicator_flags:o,general_level_idc:a}},Qv=n=>{for(let e=0;e<4;e++)for(let t=0;t<(e===3?2:6);t++)if(!n.readBits(1))ae(n);else{let r=Math.min(64,1<<4+(e<<1));e>1&&xi(n);for(let s=0;s<r;s++)xi(n)}},ew=(n,e)=>{let t=[];for(let i=0;i<e;i++)t[i]=tw(n,i,e,t)},tw=(n,e,t,i)=>{let r=0,s=0,o=0;if(e!==0&&(s=n.readBits(1)),s){if(e===t){let c=ae(n);o=e-(c+1)}else o=e-1;n.readBits(1),ae(n);let a=i[o]??0;for(let c=0;c<=a;c++)n.readBits(1)||n.readBits(1);r=i[o]}else{let a=ae(n),c=ae(n);for(let l=0;l<a;l++)ae(n),n.readBits(1);for(let l=0;l<c;l++)ae(n),n.readBits(1);r=a+c}return r},nw=(n,e)=>{let t=2,i=2,r=2,s=0,o=0,a={num:1,den:1};if(n.readBits(1)){let c=n.readBits(8);if(c===255)a={num:n.readBits(16),den:n.readBits(16)};else{let l=Am[c];l&&(a=l)}}return n.readBits(1)&&n.readBits(1),n.readBits(1)&&(n.readBits(3),s=n.readBits(1),n.readBits(1)&&(t=n.readBits(8),i=n.readBits(8),r=n.readBits(8))),n.readBits(1)&&(ae(n),ae(n)),n.readBits(1),n.readBits(1),n.readBits(1),n.readBits(1)&&(ae(n),ae(n),ae(n),ae(n)),n.readBits(1)&&(n.readBits(32),n.readBits(32),n.readBits(1)&&ae(n),n.readBits(1)&&iw(n,!0,e)),n.readBits(1)&&(n.readBits(1),n.readBits(1),n.readBits(1),o=ae(n),ae(n),ae(n),ae(n),ae(n)),{pixelAspectRatio:a,colourPrimaries:t,transferCharacteristics:i,matrixCoefficients:r,fullRangeFlag:s,minSpatialSegmentationIdc:o}},iw=(n,e,t)=>{let i=!1,r=!1,s=!1;e&&(i=n.readBits(1)===1,r=n.readBits(1)===1,(i||r)&&(s=n.readBits(1)===1,s&&(n.readBits(8),n.readBits(5),n.readBits(1),n.readBits(5)),n.readBits(4),n.readBits(4),s&&n.readBits(4),n.readBits(5),n.readBits(5),n.readBits(5)));for(let o=0;o<=t;o++){let a=n.readBits(1)===1,c=!0;a||(c=n.readBits(1)===1);let l=!1;c?ae(n):l=n.readBits(1)===1;let u=1;l||(u=ae(n)+1),i&&fm(n,u,s),r&&fm(n,u,s)}},fm=(n,e,t)=>{for(let i=0;i<e;i++)ae(n),ae(n),t&&(ae(n),ae(n)),n.readBits(1)},Mm=n=>{let e=[];e.push(n.configurationVersion),e.push((n.generalProfileSpace&3)<<6|(n.generalTierFlag&1)<<5|n.generalProfileIdc&31),e.push(n.generalProfileCompatibilityFlags>>>24&255),e.push(n.generalProfileCompatibilityFlags>>>16&255),e.push(n.generalProfileCompatibilityFlags>>>8&255),e.push(n.generalProfileCompatibilityFlags&255),e.push(...n.generalConstraintIndicatorFlags),e.push(n.generalLevelIdc&255),e.push(240|n.minSpatialSegmentationIdc>>8&15),e.push(n.minSpatialSegmentationIdc&255),e.push(252|n.parallelismType&3),e.push(252|n.chromaFormatIdc&3),e.push(248|n.bitDepthLumaMinus8&7),e.push(248|n.bitDepthChromaMinus8&7),e.push(n.avgFrameRate>>8&255),e.push(n.avgFrameRate&255),e.push((n.constantFrameRate&3)<<6|(n.numTemporalLayers&7)<<3|(n.temporalIdNested&1)<<2|n.lengthSizeMinusOne&3),e.push(n.arrays.length&255);for(let t of n.arrays){e.push((t.arrayCompleteness&1)<<7|0|t.nalUnitType&63),e.push(t.nalUnits.length>>8&255),e.push(t.nalUnits.length&255);for(let i of t.nalUnits){e.push(i.length>>8&255),e.push(i.length&255);for(let r=0;r<i.length;r++)e.push(i[r])}}return new Uint8Array(e)};var pm;(function(n){n[n.audAllowed=0]="audAllowed",n[n.beforeFirstVcl=1]="beforeFirstVcl",n[n.afterFirstVcl=2]="afterFirstVcl",n[n.eoBitstreamAllowed=3]="eoBitstreamAllowed",n[n.noMoreDataAllowed=4]="noMoreDataAllowed"})(pm||(pm={}));var rw=function*(n){let e=new Ft(n),t=()=>{let i=0;for(let r=0;r<8;r++){let s=e.readAlignedByte();if(i+=(s&127)*2**(r*7),!(s&128))break;if(r===7&&s&128)return null}return i>2**32-1?null:i};for(;e.getBitsLeft()>=8;){e.skipBits(1);let i=e.readBits(4),r=e.readBits(1),s=e.readBits(1);e.skipBits(1),r&&e.skipBits(8);let o;if(s){let a=t();if(a===null)return;o=a}else o=Math.floor(e.getBitsLeft()/8);J(e.pos%8===0),yield{type:i,data:n.subarray(e.pos/8,e.pos/8+o)},e.skipBits(o*8)}};var Em=n=>{let e=ur(n),t=e.getUint8(9),i=e.getUint16(10,!0),r=e.getUint32(12,!0),s=e.getInt16(16,!0),o=e.getUint8(18),a=null;return o&&(a=n.subarray(19,21+t)),{outputChannelCount:t,preSkip:i,inputSampleRate:r,outputGain:s,channelMappingFamily:o,channelMappingTable:a}};var Tm=(n,e,t)=>{switch(n){case"avc":{for(let i of Zv(t,e)){let r=t[i.offset],s=xm(r);if(s>=Ui.NON_IDR_SLICE&&s<=Ui.SLICE_DPC)return"delta";if(s===Ui.IDR)return"key";if(s===Ui.SEI&&!Jp()){let o=t.subarray(i.offset,i.offset+i.length),a=Vl(o),c=1;do{let l=0;for(;;){let h=a[c++];if(h===void 0||(l+=h,h<255))break}let u=0;for(;;){let h=a[c++];if(h===void 0||(u+=h,h<255))break}if(l===6){let h=new Ft(a);h.pos=8*c;let d=ae(h),m=h.readBits(1);if(d===0&&m===1)return"key"}c+=u}while(c<a.length-1)}}return"delta"}case"hevc":{for(let i of jv(t,e)){let r=Yh(t[i.offset]);if(r<Gn.BLA_W_LP)return"delta";if(r<=Gn.RSV_IRAP_VCL23)return"key"}return"delta"}case"vp8":return(t[0]&1)===0?"key":"delta";case"vp9":{let i=new Ft(t);if(i.readBits(2)!==2)return null;let r=i.readBits(1);return(i.readBits(1)<<1)+r===3&&i.skipBits(1),i.readBits(1)?null:i.readBits(1)===0?"key":"delta"}case"av1":{let i=!1;for(let{type:r,data:s}of rw(t))if(r===1){let o=new Ft(s);o.skipBits(4),i=!!o.readBits(1)}else if(r===3||r===6||r===7){if(i)return"key";let o=new Ft(s);return o.readBits(1)?null:o.readBits(2)===0?"key":"delta"}return null}case"prores":return"key";default:oi(n),J(!1)}},mm;(function(n){n[n.STREAMINFO=0]="STREAMINFO",n[n.VORBIS_COMMENT=4]="VORBIS_COMMENT",n[n.PICTURE=6]="PICTURE"})(mm||(mm={}));var Cm=n=>{if(n.length<7||n[0]!==11||n[1]!==119)return null;let e=new Ft(n);e.skipBits(16),e.skipBits(16);let t=e.readBits(2);if(t===3)return null;let i=e.readBits(6),r=e.readBits(5);if(r>8)return null;let s=e.readBits(3),o=e.readBits(3);o&1&&o!==1&&e.skipBits(2),o&4&&e.skipBits(2),o===2&&e.skipBits(2);let a=e.readBits(1),c=Math.floor(i/2);return{fscod:t,bsid:r,bsmod:s,acmod:o,lfeon:a,bitRateCode:c}},TT=[64*2,69*2,96*2,64*2,70*2,96*2,80*2,87*2,120*2,80*2,88*2,120*2,96*2,104*2,144*2,96*2,105*2,144*2,112*2,121*2,168*2,112*2,122*2,168*2,128*2,139*2,192*2,128*2,140*2,192*2,160*2,174*2,240*2,160*2,175*2,240*2,192*2,208*2,288*2,192*2,209*2,288*2,224*2,243*2,336*2,224*2,244*2,336*2,256*2,278*2,384*2,256*2,279*2,384*2,320*2,348*2,480*2,320*2,349*2,480*2,384*2,417*2,576*2,384*2,418*2,576*2,448*2,487*2,672*2,448*2,488*2,672*2,512*2,557*2,768*2,512*2,558*2,768*2,640*2,696*2,960*2,640*2,697*2,960*2,768*2,835*2,1152*2,768*2,836*2,1152*2,896*2,975*2,1344*2,896*2,976*2,1344*2,1024*2,1114*2,1536*2,1024*2,1115*2,1536*2,1152*2,1253*2,1728*2,1152*2,1254*2,1728*2,1280*2,1393*2,1920*2,1280*2,1394*2,1920*2];var CT=new Uint8Array([5,4,65,67,45,51]),RT=new Uint8Array([5,4,69,65,67,51]),sw=[1,2,3,6],Rm=n=>{if(n.length<6||n[0]!==11||n[1]!==119)return null;let e=new Ft(n);e.skipBits(16);let t=e.readBits(2);if(e.skipBits(3),t!==0&&t!==2)return null;let i=e.readBits(11),r=e.readBits(2),s=0,o;r===3?(s=e.readBits(2),o=3):o=e.readBits(2);let a=e.readBits(3),c=e.readBits(1),l=e.readBits(5);if(l<11||l>16)return null;let u=sw[o],f;return r<3?f=um[r]/1e3:f=hm[s]/1e3,{dataRate:Math.round((i+1)*f/(u*16)),substreams:[{fscod:r,fscod2:s,bsid:l,bsmod:0,acmod:a,lfeon:c,numDepSub:0,chanLoc:0}]}};var ow=1683496997,aw=18,cw=10;var gm=32,lw=20,uw=8,hw=[0,8e3,16e3,32e3,0,0,11025,22050,44100,0,0,12e3,24e3,48e3,96e3,192e3],dw=[32e3,56e3,64e3,96e3,112e3,128e3,192e3,224e3,256e3,32e4,384e3,448e3,512e3,576e3,64e4,768e3,96e4,1024e3,1152e3,128e4,1344e3,1408e3,1411200,1472e3,1536e3,192e4,2048e3,3072e3,384e4,0,0,0],fw=[16,16,20,20,0,24,24,0],_m=[1,2,2,2,2,3,3,4,4,5,6,6,6,7,8,8],pw=[1,2,2,2,2,3,18,19,6,7,518,323,83,519,582,535],mw=8;var gw=[32e3,44100,48e3,0],_w=[8e3,16e3,32e3,64e3,128e3,22050,44100,88200,176400,352800,12e3,24e3,48e3,96e3,192e3,384e3],yw=[512,1024,2048,4096],Im=n=>{let e=xw(n),t=ur(n),i=e?Math.ceil(e.frameSize/4)*4:0,r=null;for(;i+4<=n.length&&t.getUint32(i)===ow;){let o=bw(n.subarray(i));if(!o)break;r??=o,i+=o.frameSize}if(e)return{frameSize:r?i:e.frameSize,sampleRate:e.sampleRate,numberOfChannels:e.numberOfChannels,sampleCount:e.sampleCount,channelLayout:e.channelLayout,pcmResolution:e.pcmResolution,bitRate:e.bitRate,core:e,hasExtensions:r!==null};if(!r?.asset)return null;let{asset:s}=r;return{frameSize:i,sampleRate:s.sampleRate,numberOfChannels:s.numberOfChannels,sampleCount:s.sampleCount,channelLayout:s.channelLayout,pcmResolution:s.pcmResolution,bitRate:0,core:null,hasExtensions:!0}};var xw=n=>{if(n.length<aw||n[0]!==127||n[1]!==254||n[2]!==128||n[3]!==1)return null;let e=new Ft(n);if(e.skipBits(32),e.skipBits(1),e.readBits(5)!==gm-1)return null;let t=e.readBits(1),i=e.readBits(7)+1;if(i%uw!==0)return null;let r=e.readBits(14)+1;if(r<96)return null;let s=e.readBits(6);if(s>=_m.length)return null;let o=hw[e.readBits(4)];if(o===0)return null;let a=dw[e.readBits(5)];if(e.readBits(1)!==0)return null;e.skipBits(4),e.skipBits(5);let c=e.readBits(2);if(c===3)return null;e.skipBits(1),t&&e.skipBits(16),e.skipBits(7);let l=fw[e.readBits(3)];if(l===0)return null;let u=c!==0;return{frameSize:r,sampleRate:o,numberOfChannels:_m[s]+(u?1:0),sampleCount:i*gm,channelLayout:pw[s]|(u?mw:0),amode:s,lfePresent:u,bitRate:a,pcmResolution:l}},bw=n=>{if(n.length<cw||n[0]!==100||n[1]!==88||n[2]!==32||n[3]!==37)return null;let e=new Ft(n);e.skipBits(32),e.skipBits(8);let t=e.readBits(2),i=e.readBits(1),r=8+4*i,s=16+4*i;e.skipBits(r);let o=e.readBits(s)+1,a={frameSize:o,asset:null};if(!e.readBits(1))return a;let c=gw[e.readBits(2)],l=512*(e.readBits(3)+1);e.readBits(1)&&e.skipBits(36);let u=e.readBits(3)+1,f=e.readBits(3)+1,h=[];for(let p=0;p<u;p++)h.push(e.readBits(t+1));for(let p of h)e.skipBits(8*Zp(p));if(e.readBits(1)){e.skipBits(2);let p=e.readBits(2)+1<<2,w=e.readBits(2)+1;e.skipBits(w*p)}for(let p=0;p<f;p++)e.skipBits(s);e.skipBits(9),e.skipBits(3),e.readBits(1)&&e.skipBits(4),e.readBits(1)&&e.skipBits(24),e.readBits(1)&&e.skipBits(8*(e.readBits(10)+1));let d=e.readBits(5)+1,m=_w[e.readBits(4)],y=e.readBits(8)+1,g=0;if(e.readBits(1)&&(y>2&&e.skipBits(1),y>6&&e.skipBits(1),e.readBits(1))){let p=e.readBits(2)+1<<2;g=e.readBits(p)}return c===0||e.getBitsLeft()<0?a:{frameSize:o,asset:{sampleRate:m,numberOfChannels:y,sampleCount:Math.round(l*m/c),channelLayout:g,pcmResolution:d}}};var Pm=n=>{let e=new Uint8Array(lw),t=ur(e);t.setUint32(0,n.sampleRate),t.setUint32(4,n.bitRate),t.setUint32(8,n.bitRate),e[12]=n.pcmResolution;let i=n.core&&!n.hasExtensions?1:0,r=new Ft(e);return r.seekToByte(13),r.writeBits(2,Math.max(yw.indexOf(n.sampleCount),0)),r.writeBits(5,i),r.writeBits(1,n.core?.lfePresent?1:0),r.writeBits(6,n.core?.amode??0),r.writeBits(14,n.core?n.core.frameSize-1:0),r.writeBits(1,0),r.writeBits(3,0),r.writeBits(16,n.channelLayout),r.writeBits(1,0),r.writeBits(1,0),r.writeBits(1,0),r.writeBits(5,0),e};var qn=["avc","hevc","vp9","av1","vp8","prores"],Wn=["pcm-s16","pcm-s16be","pcm-s24","pcm-s24be","pcm-s32","pcm-s32be","pcm-f32","pcm-f32be","pcm-f64","pcm-f64be","pcm-u8","pcm-s8","ulaw","alaw"],Hl=["aac","opus","mp3","vorbis","flac","ac3","eac3","dts"],Dr=[...Hl,...Wn],dr=["webvtt"],ra=[{maxMacroblocks:99,maxBitrate:64e3,maxDpbMbs:396,level:10},{maxMacroblocks:396,maxBitrate:192e3,maxDpbMbs:900,level:11},{maxMacroblocks:396,maxBitrate:384e3,maxDpbMbs:2376,level:12},{maxMacroblocks:396,maxBitrate:768e3,maxDpbMbs:2376,level:13},{maxMacroblocks:396,maxBitrate:2e6,maxDpbMbs:2376,level:20},{maxMacroblocks:792,maxBitrate:4e6,maxDpbMbs:4752,level:21},{maxMacroblocks:1620,maxBitrate:4e6,maxDpbMbs:8100,level:22},{maxMacroblocks:1620,maxBitrate:1e7,maxDpbMbs:8100,level:30},{maxMacroblocks:3600,maxBitrate:14e6,maxDpbMbs:18e3,level:31},{maxMacroblocks:5120,maxBitrate:2e7,maxDpbMbs:20480,level:32},{maxMacroblocks:8192,maxBitrate:2e7,maxDpbMbs:32768,level:40},{maxMacroblocks:8192,maxBitrate:5e7,maxDpbMbs:32768,level:41},{maxMacroblocks:8704,maxBitrate:5e7,maxDpbMbs:34816,level:42},{maxMacroblocks:22080,maxBitrate:135e6,maxDpbMbs:110400,level:50},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:51},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:52},{maxMacroblocks:139264,maxBitrate:24e7,maxDpbMbs:696320,level:60},{maxMacroblocks:139264,maxBitrate:48e7,maxDpbMbs:696320,level:61},{maxMacroblocks:139264,maxBitrate:8e8,maxDpbMbs:696320,level:62}],Bm=[{maxPictureSize:36864,maxBitrate:128e3,tier:"L",level:30},{maxPictureSize:122880,maxBitrate:15e5,tier:"L",level:60},{maxPictureSize:245760,maxBitrate:3e6,tier:"L",level:63},{maxPictureSize:552960,maxBitrate:6e6,tier:"L",level:90},{maxPictureSize:983040,maxBitrate:1e7,tier:"L",level:93},{maxPictureSize:2228224,maxBitrate:12e6,tier:"L",level:120},{maxPictureSize:2228224,maxBitrate:3e7,tier:"H",level:120},{maxPictureSize:2228224,maxBitrate:2e7,tier:"L",level:123},{maxPictureSize:2228224,maxBitrate:5e7,tier:"H",level:123},{maxPictureSize:8912896,maxBitrate:25e6,tier:"L",level:150},{maxPictureSize:8912896,maxBitrate:1e8,tier:"H",level:150},{maxPictureSize:8912896,maxBitrate:4e7,tier:"L",level:153},{maxPictureSize:8912896,maxBitrate:16e7,tier:"H",level:153},{maxPictureSize:8912896,maxBitrate:6e7,tier:"L",level:156},{maxPictureSize:8912896,maxBitrate:24e7,tier:"H",level:156},{maxPictureSize:35651584,maxBitrate:6e7,tier:"L",level:180},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:180},{maxPictureSize:35651584,maxBitrate:12e7,tier:"L",level:183},{maxPictureSize:35651584,maxBitrate:48e7,tier:"H",level:183},{maxPictureSize:35651584,maxBitrate:24e7,tier:"L",level:186},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:186}],Zh=[{maxPictureSize:36864,maxBitrate:2e5,level:10},{maxPictureSize:73728,maxBitrate:8e5,level:11},{maxPictureSize:122880,maxBitrate:18e5,level:20},{maxPictureSize:245760,maxBitrate:36e5,level:21},{maxPictureSize:552960,maxBitrate:72e5,level:30},{maxPictureSize:983040,maxBitrate:12e6,level:31},{maxPictureSize:2228224,maxBitrate:18e6,level:40},{maxPictureSize:2228224,maxBitrate:3e7,level:41},{maxPictureSize:8912896,maxBitrate:6e7,level:50},{maxPictureSize:8912896,maxBitrate:12e7,level:51},{maxPictureSize:8912896,maxBitrate:18e7,level:52},{maxPictureSize:35651584,maxBitrate:18e7,level:60},{maxPictureSize:35651584,maxBitrate:24e7,level:61},{maxPictureSize:35651584,maxBitrate:48e7,level:62}],Lm=[{maxPictureSize:147456,maxBitrate:15e5,tier:"M",level:0},{maxPictureSize:278784,maxBitrate:3e6,tier:"M",level:1},{maxPictureSize:665856,maxBitrate:6e6,tier:"M",level:4},{maxPictureSize:1065024,maxBitrate:1e7,tier:"M",level:5},{maxPictureSize:2359296,maxBitrate:12e6,tier:"M",level:8},{maxPictureSize:2359296,maxBitrate:3e7,tier:"H",level:8},{maxPictureSize:2359296,maxBitrate:2e7,tier:"M",level:9},{maxPictureSize:2359296,maxBitrate:5e7,tier:"H",level:9},{maxPictureSize:8912896,maxBitrate:3e7,tier:"M",level:12},{maxPictureSize:8912896,maxBitrate:1e8,tier:"H",level:12},{maxPictureSize:8912896,maxBitrate:4e7,tier:"M",level:13},{maxPictureSize:8912896,maxBitrate:16e7,tier:"H",level:13},{maxPictureSize:8912896,maxBitrate:6e7,tier:"M",level:14},{maxPictureSize:8912896,maxBitrate:24e7,tier:"H",level:14},{maxPictureSize:35651584,maxBitrate:6e7,tier:"M",level:15},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:15},{maxPictureSize:35651584,maxBitrate:6e7,tier:"M",level:16},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:16},{maxPictureSize:35651584,maxBitrate:1e8,tier:"M",level:17},{maxPictureSize:35651584,maxBitrate:48e7,tier:"H",level:17},{maxPictureSize:35651584,maxBitrate:16e7,tier:"M",level:18},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:18},{maxPictureSize:35651584,maxBitrate:16e7,tier:"M",level:19},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:19}];var sa=["ap4x","ap4h","apch","apcn","apcs","apco"],$h=["dtsc","dtsh","dtsl","dtse"],vw=[{fourCc:"apco",bitrate:45e6,alpha:!1},{fourCc:"apcs",bitrate:102e6,alpha:!1},{fourCc:"apcn",bitrate:147e6,alpha:!1},{fourCc:"apch",bitrate:22e7,alpha:!1},{fourCc:"ap4h",bitrate:33e7,alpha:!0},{fourCc:"ap4x",bitrate:5e8,alpha:!0}],Fm=(n,e,t,i,r)=>{if(n==="avc"){let o=Math.ceil(e/16)*Math.ceil(t/16),a=ra.find(h=>o<=h.maxMacroblocks&&i<=h.maxBitrate)??xn(ra),c=a?a.level:0,l="64".padStart(2,"0"),u="00",f=c.toString(16).padStart(2,"0");return`avc1.${l}${u}${f}`}else if(n==="hevc"){let s="",a="6",c=e*t,l=Bm.find(f=>c<=f.maxPictureSize&&i<=f.maxBitrate)??xn(Bm);return`hev1.${s}1.${a}.${l.tier}${l.level}.B0`}else{if(n==="vp8")return"vp8";if(n==="vp9"){let s="00",o=e*t,a=Zh.find(l=>o<=l.maxPictureSize&&i<=l.maxBitrate)??xn(Zh);return`vp09.${s}.${a.level.toString().padStart(2,"0")}.08`}else if(n==="av1"){let o=e*t,a=Lm.find(u=>o<=u.maxPictureSize&&i<=u.maxBitrate)??xn(Lm);return`av01.0.${a.level.toString().padStart(2,"0")}${a.tier}.08`}else if(n==="prores"){let o=Math.pow(e*t/2073600,.95),a=vw.filter(u=>u.alpha===r),c=a[0].fourCc,l=1/0;for(let{fourCc:u,bitrate:f}of a){let h=Math.abs(f*o-i);h<l&&(l=h,c=u)}return c}else oi(n)}throw new TypeError(`Unhandled codec '${String(n)}'.`)};var Dm=n=>{let e=n.split("."),r=(1<<7)+1,s=Number(e[1]),o=e[2],a=Number(o.slice(0,-1)),c=(s<<5)+a,l=o.slice(-1)==="H"?1:0,u=Number(e[3]),f=u===8?0:1,h=u===12?1:0,d=e[4]?Number(e[4]):0,m=e[5]?Number(e[5][0]):1,y=e[5]?Number(e[5][1]):1,g=e[5]?Number(e[5][2]):0,p=(l<<7)+(f<<6)+(h<<5)+(d<<4)+(m<<3)+(y<<2)+g;return[r,c,p,0]};var Um=/^pcm-([usf])(\d+)(be)?$/,Oi=n=>{if(J(Wn.includes(n)),n==="ulaw")return{dataType:"ulaw",sampleSize:1,littleEndian:!0,silentValue:255};if(n==="alaw")return{dataType:"alaw",sampleSize:1,littleEndian:!0,silentValue:213};let e=Um.exec(n);J(e);let t;e[1]==="u"?t="unsigned":e[1]==="s"?t="signed":t="float";let i=Number(e[2])/8,r=e[3]!=="be",s=n==="pcm-u8"?2**7:0;return{dataType:t,sampleSize:i,littleEndian:r,silentValue:s}},Gl=n=>n.startsWith("avc1")||n.startsWith("avc3")?"avc":n.startsWith("hev1")||n.startsWith("hvc1")?"hevc":n==="vp8"?"vp8":n.startsWith("vp09")?"vp9":n.startsWith("av01")?"av1":sa.includes(n)?"prores":n==="mp3"||n==="mp4a.69"||n==="mp4a.6B"||n==="mp4a.6b"||n==="mp4a.40.34"?"mp3":n.startsWith("mp4a.40.")||n==="mp4a.67"?"aac":n==="opus"||n==="Opus"?"opus":n==="vorbis"?"vorbis":n==="flac"?"flac":n==="ac-3"||n==="ac3"?"ac3":n==="ec-3"||n==="eac3"?"eac3":$h.includes(n)?"dts":n==="ulaw"?"ulaw":n==="alaw"?"alaw":Um.test(n)?n:n==="webvtt"?"webvtt":null,Om=n=>n==="avc"?{avc:{format:"avc"}}:n==="hevc"?{hevc:{format:"hevc"}}:{};var ww=["avc1","avc3","hev1","hvc1","vp8","vp09","av01",...sa],Aw=/^(avc1|avc3)\.[0-9a-fA-F]{6}$/,Sw=/^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/,Mw=/^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/,Ew=/^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/,Wl=(n,e)=>{if(!n)throw new TypeError("Video chunk metadata must be provided.");if(typeof n!="object")throw new TypeError("Video chunk metadata must be an object.");if(!n.decoderConfig)throw new TypeError("Video chunk metadata must include a decoder configuration.");if(typeof n.decoderConfig!="object")throw new TypeError("Video chunk metadata decoder configuration must be an object.");if(typeof n.decoderConfig.codec!="string")throw new TypeError("Video chunk metadata decoder configuration must specify a codec string.");if(!ww.some(t=>n.decoderConfig.codec.startsWith(t)))throw new TypeError("Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the Mediabunny Codec Registry.");if(!Number.isInteger(n.decoderConfig.codedWidth)||n.decoderConfig.codedWidth<=0)throw new TypeError("Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).");if(!Number.isInteger(n.decoderConfig.codedHeight)||n.decoderConfig.codedHeight<=0)throw new TypeError("Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).");if(n.decoderConfig.displayAspectWidth!==void 0&&(!Number.isInteger(n.decoderConfig.displayAspectWidth)||n.decoderConfig.displayAspectWidth<=0))throw new TypeError("Video chunk metadata decoder configuration displayAspectWidth, when defined, must be a positive integer.");if(n.decoderConfig.displayAspectHeight!==void 0&&(!Number.isInteger(n.decoderConfig.displayAspectHeight)||n.decoderConfig.displayAspectHeight<=0))throw new TypeError("Video chunk metadata decoder configuration displayAspectHeight, when defined, must be a positive integer.");if(n.decoderConfig.displayAspectWidth!==void 0!=(n.decoderConfig.displayAspectHeight!==void 0))throw new TypeError("Video chunk metadata decoder configuration must specify both displayAspectWidth and displayAspectHeight, or neither.");if(n.decoderConfig.description!==void 0&&!na(n.decoderConfig.description))throw new TypeError("Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.");if(n.decoderConfig.colorSpace!==void 0){let{colorSpace:t}=n.decoderConfig;if(typeof t!="object")throw new TypeError("Video chunk metadata decoder configuration colorSpace, when provided, must be an object.");let i=Object.keys(Br);if(t.primaries!=null&&!i.includes(t.primaries))throw new TypeError(`Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${i.join(", ")}.`);let r=Object.keys(Lr);if(t.transfer!=null&&!r.includes(t.transfer))throw new TypeError(`Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${r.join(", ")}.`);let s=Object.keys(Fr);if(t.matrix!=null&&!s.includes(t.matrix))throw new TypeError(`Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${s.join(", ")}.`);if(t.fullRange!=null&&typeof t.fullRange!="boolean")throw new TypeError("Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.")}if(n.decoderConfig.codec.startsWith("avc1")||n.decoderConfig.codec.startsWith("avc3")){if(!Aw.test(n.decoderConfig.codec))throw new TypeError("Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.")}else if(n.decoderConfig.codec.startsWith("hev1")||n.decoderConfig.codec.startsWith("hvc1")){if(!Sw.test(n.decoderConfig.codec))throw new TypeError("Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.")}else if(n.decoderConfig.codec.startsWith("vp8")){if(n.decoderConfig.codec!=="vp8")throw new TypeError('Video chunk metadata decoder configuration codec string for VP8 must be "vp8".')}else if(n.decoderConfig.codec.startsWith("vp09")){if(!Mw.test(n.decoderConfig.codec))throw new TypeError('Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.')}else if(n.decoderConfig.codec.startsWith("av01")){if(!Ew.test(n.decoderConfig.codec))throw new TypeError('Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.')}else if(sa.some(t=>n.decoderConfig.codec.startsWith(t))&&!sa.some(t=>n.decoderConfig.codec===t))throw new TypeError(`Video chunk metadata decoder configuration codec string for ProRes must be one of the valid ProRes four-character codes: ${sa.join(", ")}.`);if(e!==null&&Gl(n.decoderConfig.codec)!==e)throw new TypeError(`Video chunk metadata decoder configuration codec string '${n.decoderConfig.codec}' does not fit to the track codec '${e}'.`)},Tw=["mp4a","mp3","opus","vorbis","flac","ulaw","alaw","pcm","ac-3","ec-3","dts"],ql=(n,e)=>{if(!n)throw new TypeError("Audio chunk metadata must be provided.");if(typeof n!="object")throw new TypeError("Audio chunk metadata must be an object.");if(!n.decoderConfig)throw new TypeError("Audio chunk metadata must include a decoder configuration.");if(typeof n.decoderConfig!="object")throw new TypeError("Audio chunk metadata decoder configuration must be an object.");if(typeof n.decoderConfig.codec!="string")throw new TypeError("Audio chunk metadata decoder configuration must specify a codec string.");if(!Tw.some(t=>n.decoderConfig.codec.startsWith(t)))throw new TypeError("Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the Mediabunny Codec Registry.");if(!Number.isInteger(n.decoderConfig.sampleRate)||n.decoderConfig.sampleRate<=0)throw new TypeError("Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).");if(!Number.isInteger(n.decoderConfig.numberOfChannels)||n.decoderConfig.numberOfChannels<=0)throw new TypeError("Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).");if(n.decoderConfig.description!==void 0&&!na(n.decoderConfig.description))throw new TypeError("Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.");if(n.decoderConfig.codec.startsWith("mp4a")&&n.decoderConfig.codec!=="mp4a.69"&&n.decoderConfig.codec!=="mp4a.6B"&&n.decoderConfig.codec!=="mp4a.6b"){if(!["mp4a.40.2","mp4a.40.02","mp4a.40.5","mp4a.40.05","mp4a.40.29","mp4a.67"].includes(n.decoderConfig.codec))throw new TypeError("Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.")}else if(n.decoderConfig.codec.startsWith("mp3")||n.decoderConfig.codec.startsWith("mp4a")){if(n.decoderConfig.codec!=="mp3"&&n.decoderConfig.codec!=="mp4a.69"&&n.decoderConfig.codec!=="mp4a.6B"&&n.decoderConfig.codec!=="mp4a.6b")throw new TypeError('Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".')}else if(n.decoderConfig.codec.startsWith("opus")){if(n.decoderConfig.codec!=="opus")throw new TypeError('Audio chunk metadata decoder configuration codec string for Opus must be "opus".');if(n.decoderConfig.description&&n.decoderConfig.description.byteLength<18)throw new TypeError("Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.")}else if(n.decoderConfig.codec.startsWith("vorbis")){if(n.decoderConfig.codec!=="vorbis")throw new TypeError('Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".');if(!n.decoderConfig.description)throw new TypeError("Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.")}else if(n.decoderConfig.codec.startsWith("flac")){if(n.decoderConfig.codec!=="flac")throw new TypeError('Audio chunk metadata decoder configuration codec string for FLAC must be "flac".');if(!n.decoderConfig.description||n.decoderConfig.description.byteLength<42)throw new TypeError("Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.")}else if(n.decoderConfig.codec.startsWith("ac-3")||n.decoderConfig.codec.startsWith("ac3")){if(n.decoderConfig.codec!=="ac-3")throw new TypeError('Audio chunk metadata decoder configuration codec string for AC-3 must be "ac-3".')}else if(n.decoderConfig.codec.startsWith("ec-3")||n.decoderConfig.codec.startsWith("eac3")){if(n.decoderConfig.codec!=="ec-3")throw new TypeError('Audio chunk metadata decoder configuration codec string for EC-3 must be "ec-3".')}else if(n.decoderConfig.codec.startsWith("dts")){if(!$h.includes(n.decoderConfig.codec))throw new TypeError(`Audio chunk metadata decoder configuration codec string for DTS must be one of the following four-character codes: ${$h.join(", ")}.`)}else if((n.decoderConfig.codec.startsWith("pcm")||n.decoderConfig.codec.startsWith("ulaw")||n.decoderConfig.codec.startsWith("alaw"))&&!Wn.includes(n.decoderConfig.codec))throw new TypeError(`Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${Wn.join(", ")}).`);if(e!==null&&Gl(n.decoderConfig.codec)!==e)throw new TypeError(`Audio chunk metadata decoder configuration codec string '${n.decoderConfig.codec}' does not fit to the track codec '${e}'.`)},Nm=n=>{if(!n)throw new TypeError("Subtitle metadata must be provided.");if(typeof n!="object")throw new TypeError("Subtitle metadata must be an object.");if(!n.config)throw new TypeError("Subtitle metadata must include a config object.");if(typeof n.config!="object")throw new TypeError("Subtitle metadata config must be an object.");if(typeof n.config.description!="string")throw new TypeError("Subtitle metadata config description must be a string.")};var km=new Uint8Array(0),fr=class n{constructor(e,t,i,r,s=-1,o,a){if(this.data=e,this.type=t,this.timestamp=i,this.duration=r,this.sequenceNumber=s,e===km&&o===void 0)throw new Error("Internal error: byteLength must be explicitly provided when constructing metadata-only packets.");if(o===void 0&&(o=e.byteLength),!(e instanceof Uint8Array))throw new TypeError("data must be a Uint8Array.");if(t!=="key"&&t!=="delta")throw new TypeError('type must be either "key" or "delta".');if(!Number.isFinite(i))throw new TypeError("timestamp must be a number.");if(!Number.isFinite(r)||r<0)throw new TypeError("duration must be a non-negative number.");if(!Number.isFinite(s))throw new TypeError("sequenceNumber must be a number.");if(!Number.isInteger(o)||o<0)throw new TypeError("byteLength must be a non-negative integer.");if(a!==void 0&&(typeof a!="object"||!a))throw new TypeError("sideData, when provided, must be an object.");if(a?.alpha!==void 0&&!(a.alpha instanceof Uint8Array))throw new TypeError("sideData.alpha, when provided, must be a Uint8Array.");if(a?.alphaByteLength!==void 0&&(!Number.isInteger(a.alphaByteLength)||a.alphaByteLength<0))throw new TypeError("sideData.alphaByteLength, when provided, must be a non-negative integer.");this.byteLength=o,this.sideData=a??{},this.sideData.alpha&&this.sideData.alphaByteLength===void 0&&(this.sideData.alphaByteLength=this.sideData.alpha.byteLength)}get isMetadataOnly(){return this.data===km}get microsecondTimestamp(){return Math.trunc(hr*this.timestamp)}get microsecondDuration(){return Math.trunc(hr*this.duration)}toEncodedVideoChunk(){if(this.isMetadataOnly)throw new TypeError("Metadata-only packets cannot be converted to a video chunk.");if(typeof EncodedVideoChunk>"u")throw new Error("EncodedVideoChunk is not available in this environment.");return new EncodedVideoChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}alphaToEncodedVideoChunk(e=this.type){if(!this.sideData.alpha)throw new TypeError("This packet does not contain alpha side data.");if(this.isMetadataOnly)throw new TypeError("Metadata-only packets cannot be converted to a video chunk.");if(typeof EncodedVideoChunk>"u")throw new Error("EncodedVideoChunk is not available in this environment.");return new EncodedVideoChunk({data:this.sideData.alpha,type:e,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}toEncodedAudioChunk(){if(this.isMetadataOnly)throw new TypeError("Metadata-only packets cannot be converted to an audio chunk.");if(typeof EncodedAudioChunk>"u")throw new Error("EncodedAudioChunk is not available in this environment.");return new EncodedAudioChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}static fromEncodedChunk(e,t){if(!(e instanceof EncodedVideoChunk||e instanceof EncodedAudioChunk))throw new TypeError("chunk must be an EncodedVideoChunk or EncodedAudioChunk.");let i=new Uint8Array(e.byteLength);return e.copyTo(i),new n(i,e.type,e.timestamp/1e6,(e.duration??0)/1e6,void 0,void 0,t)}clone(e){if(e!==void 0&&(typeof e!="object"||e===null))throw new TypeError("options, when provided, must be an object.");if(e?.data!==void 0&&!(e.data instanceof Uint8Array))throw new TypeError("options.data, when provided, must be a Uint8Array.");if(e?.type!==void 0&&e.type!=="key"&&e.type!=="delta")throw new TypeError('options.type, when provided, must be either "key" or "delta".');if(e?.timestamp!==void 0&&!Number.isFinite(e.timestamp))throw new TypeError("options.timestamp, when provided, must be a number.");if(e?.duration!==void 0&&!Number.isFinite(e.duration))throw new TypeError("options.duration, when provided, must be a number.");if(e?.sequenceNumber!==void 0&&!Number.isFinite(e.sequenceNumber))throw new TypeError("options.sequenceNumber, when provided, must be a number.");if(e?.sideData!==void 0&&(typeof e.sideData!="object"||e.sideData===null))throw new TypeError("options.sideData, when provided, must be an object.");return new n(e?.data??this.data,e?.type??this.type,e?.timestamp??this.timestamp,e?.duration??this.duration,e?.sequenceNumber??this.sequenceNumber,this.byteLength,e?.sideData??this.sideData)}};var zm=n=>{let t=(n.hasVideo?"video/":n.hasAudio?"audio/":"application/")+(n.isQuickTime?"quicktime":"mp4");if(n.codecStrings.length>0){let i=[...new Set(n.codecStrings)];t+=`; codecs="${i.join(", ")}"`}return t};var Xl=8,jh=16;var Vm=7,Hm=9,Jh=n=>{let e=n.filePos,t=Gm(n,9),i=new Ft(t);if(i.readBits(12)!==4095||(i.skipBits(1),i.readBits(2)!==0))return null;let o=i.readBits(1),a=i.readBits(2)+1,c=i.readBits(4);if(c===15)return null;i.skipBits(1);let l=i.readBits(3);if(l===0)throw new Error("ADTS frames with channel configuration 0 are not supported.");i.skipBits(1),i.skipBits(1),i.skipBits(1),i.skipBits(1);let u=i.readBits(13);i.skipBits(11);let f=i.readBits(2)+1;if(f!==1)throw new Error("ADTS frames with more than one AAC frame are not supported.");let h=null;return o===1?n.filePos-=2:h=i.readBits(16),{objectType:a,samplingFrequencyIndex:c,channelConfiguration:l,frameLength:u,numberOfAacFrames:f,crcCheck:h,startPos:e}};var Rw=function(n,e,t){if(e!=null){if(typeof e!="object"&&typeof e!="function")throw new TypeError("Object expected.");var i,r;if(t){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");i=e[Symbol.asyncDispose]}if(i===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");i=e[Symbol.dispose],t&&(r=i)}if(typeof i!="function")throw new TypeError("Object not disposable.");r&&(i=function(){try{r.call(this)}catch(s){return Promise.reject(s)}}),n.stack.push({value:e,dispose:i,async:t})}else t&&n.stack.push({async:!0});return e},Iw=function(n){return function(e){function t(o){e.error=e.hasError?new n(o,e.error,"An error was suppressed during disposal."):o,e.hasError=!0}var i,r=0;function s(){for(;i=e.stack.pop();)try{if(!i.async&&r===1)return r=0,e.stack.push(i),Promise.resolve().then(s);if(i.dispose){var o=i.dispose.call(i.value);if(i.async)return r|=2,Promise.resolve(o).then(s,function(a){return t(a),s()})}else r|=1}catch(a){t(a)}if(r===1)return e.hasError?Promise.reject(e.error):Promise.resolve();if(e.hasError)throw e.error}return s()}}(typeof SuppressedError=="function"?SuppressedError:function(n,e,t){var i=new Error(t);return i.name="SuppressedError",i.error=n,i.suppressed=e,i});em();var Wm=-1/0,qm=-1/0,Kh=null;typeof FinalizationRegistry<"u"&&(Kh=new FinalizationRegistry(n=>{let e=performance.now();n.type==="video"?(e-Wm>=1e3&&(nn._error("A VideoSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your VideoSamples as soon as you're done using them."),Wm=e),typeof VideoFrame<"u"&&n.data instanceof VideoFrame&&n.data.close()):(e-qm>=1e3&&(nn._error("An AudioSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your AudioSamples as soon as you're done using them."),qm=e),typeof AudioData<"u"&&n.data instanceof AudioData&&n.data.close())}));var Ni=class{constructor(){this._referenceCount=0,this._lastAllocationBuffer=null}},Qh=["I420","I420P10","I420P12","I420A","I420AP10","I420AP12","I422","I422P10","I422P12","I422A","I422AP10","I422AP12","I444","I444P10","I444P12","I444A","I444AP10","I444AP12","NV12","RGBA","RGBX","BGRA","BGRX"],Pw=new Set(Qh),pr=class n{get codedWidth(){return this.visibleRect.width}get codedHeight(){return this.visibleRect.height}get displayWidth(){return this.rotation%180===0?this.squarePixelWidth:this.squarePixelHeight}get displayHeight(){return this.rotation%180===0?this.squarePixelHeight:this.squarePixelWidth}get microsecondTimestamp(){return Math.trunc(hr*this.timestamp)}get microsecondDuration(){return Math.trunc(hr*this.duration)}get hasAlpha(){return this.format&&this.format.includes("A")}constructor(e,t){if(this._closed=!1,e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer||ArrayBuffer.isView(e)){if(!t||typeof t!="object")throw new TypeError("init must be an object.");if(t.format===void 0||!Pw.has(t.format))throw new TypeError("init.format must be one of: "+Qh.join(", "));if(!Number.isInteger(t.codedWidth)||t.codedWidth<=0)throw new TypeError("init.codedWidth must be a positive integer.");if(!Number.isInteger(t.codedHeight)||t.codedHeight<=0)throw new TypeError("init.codedHeight must be a positive integer.");if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(t.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("init.flip, when provided, must be a boolean.");if(!Number.isFinite(t.timestamp))throw new TypeError("init.timestamp must be a number.");if(t.duration!==void 0&&(!Number.isFinite(t.duration)||t.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");if(t.layout!==void 0){if(!Array.isArray(t.layout))throw new TypeError("init.layout, when provided, must be an array.");for(let s of t.layout){if(!s||typeof s!="object"||Array.isArray(s))throw new TypeError("Each entry in init.layout must be an object.");if(!Number.isInteger(s.offset)||s.offset<0)throw new TypeError("plane.offset must be a non-negative integer.");if(!Number.isInteger(s.stride)||s.stride<0)throw new TypeError("plane.stride must be a non-negative integer.")}}if(t.visibleRect!==void 0&&Nl(t.visibleRect,"init.visibleRect"),t.displayWidth!==void 0&&(!Number.isInteger(t.displayWidth)||t.displayWidth<=0))throw new TypeError("init.displayWidth, when provided, must be a positive integer.");if(t.displayHeight!==void 0&&(!Number.isInteger(t.displayHeight)||t.displayHeight<=0))throw new TypeError("init.displayHeight, when provided, must be a positive integer.");if(t.displayWidth!==void 0!=(t.displayHeight!==void 0))throw new TypeError("init.displayWidth and init.displayHeight must be either both provided or both omitted.");this.format=t.format,this.rotation=t.rotation??0,this.flip=t.flip??!1,this.timestamp=t.timestamp,this.duration=t.duration??0;let i=t.layout??Fw(t.format,t.codedWidth,t.codedHeight),r=t.colorSpace??null;r===null&&(this.format==="RGBA"||this.format==="RGBX"||this.format==="BGRA"||this.format==="BGRX"?r={primaries:"bt709",transfer:"iec61966-2-1",matrix:"rgb",fullRange:!0}:r={primaries:"bt709",transfer:"bt709",matrix:"bt709",fullRange:!1}),this.visibleRect={left:t.visibleRect?.left??0,top:t.visibleRect?.top??0,width:t.visibleRect?.width??t.codedWidth,height:t.visibleRect?.height??t.codedHeight},t.displayWidth!==void 0?(this.squarePixelWidth=this.rotation%180===0?t.displayWidth:t.displayHeight,this.squarePixelHeight=this.rotation%180===0?t.displayHeight:t.displayWidth):(this.squarePixelWidth=this.visibleRect.width,this.squarePixelHeight=this.visibleRect.height),this._data=t._doNotCopy?hn(e):hn(e).slice(),this._layout=i,this.colorSpace=new ca(r)}else if(typeof VideoFrame<"u"&&e instanceof VideoFrame){if(t?.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(t?.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("init.flip, when provided, must be a boolean.");if(t?.timestamp!==void 0&&!Number.isFinite(t?.timestamp))throw new TypeError("init.timestamp, when provided, must be a number.");if(t?.duration!==void 0&&(!Number.isFinite(t.duration)||t.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");t?.visibleRect!==void 0&&Nl(t.visibleRect,"init.visibleRect"),this._data=e,this._layout=null,this.format=e.format,this.visibleRect={left:e.visibleRect?.x??0,top:e.visibleRect?.y??0,width:e.visibleRect?.width??e.codedWidth,height:e.visibleRect?.height??e.codedHeight},this.rotation=t?.rotation??0,this.flip=t?.flip??!1,this.squarePixelWidth=e.displayWidth,this.squarePixelHeight=e.displayHeight,this.timestamp=t?.timestamp??e.timestamp/1e6,this.duration=t?.duration??(e.duration??0)/1e6,this.colorSpace=new ca(e.colorSpace)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof SVGImageElement<"u"&&e instanceof SVGImageElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas){if(!t||typeof t!="object")throw new TypeError("init must be an object.");if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(t.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("init.flip, when provided, must be a boolean.");if(!Number.isFinite(t.timestamp))throw new TypeError("init.timestamp must be a number.");if(t.duration!==void 0&&(!Number.isFinite(t.duration)||t.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");if(t.visibleRect!==void 0&&Nl(t.visibleRect,"init.visibleRect"),typeof VideoFrame<"u")return new n(new VideoFrame(e,{timestamp:Math.trunc(t.timestamp*hr),duration:Math.trunc((t.duration??0)*hr)||void 0,visibleRect:t.visibleRect&&{x:t.visibleRect.left,y:t.visibleRect.top,width:t.visibleRect.width,height:t.visibleRect.height}}),t);let i=0,r=0;if("naturalWidth"in e?(i=e.naturalWidth,r=e.naturalHeight):"videoWidth"in e?(i=e.videoWidth,r=e.videoHeight):"width"in e&&(i=Number(e.width),r=Number(e.height)),!i||!r)throw new TypeError("Could not determine dimensions.");let s=t.visibleRect??{left:0,top:0,width:i,height:r},o=new OffscreenCanvas(s.width,s.height),a=o.getContext("2d",{alpha:Dl(),willReadFrequently:!0});if(!a)throw new Error("OffscreenCanvas must have support for the '2d' context in order to create a VideoSample from this data.");a.drawImage(e,-s.left,-s.top),this._data=o,this._layout=null,this.format="RGBX",this.visibleRect={left:0,top:0,width:s.width,height:s.height},this.squarePixelWidth=s.width,this.squarePixelHeight=s.height,this.rotation=t.rotation??0,this.flip=t.flip??!1,this.timestamp=t.timestamp,this.duration=t.duration??0,this.colorSpace=new ca({matrix:"rgb",primaries:"bt709",transfer:"iec61966-2-1",fullRange:!0})}else if(e instanceof Ni){if(!t||typeof t!="object")throw new TypeError("init must be an object.");if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(t.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("init.flip, when provided, must be a boolean.");if(!Number.isFinite(t.timestamp))throw new TypeError("init.timestamp must be a number.");if(t.duration!==void 0&&(!Number.isFinite(t.duration)||t.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");if(this._data=e,e._referenceCount++,this.format=e.getFormat(),this.format!==null&&!Qh.includes(this.format))throw new TypeError("getFormat() must return a VideoSamplePixelFormat or null.");if(this.visibleRect={left:0,top:0,width:e.getCodedWidth(),height:e.getCodedHeight()},!Number.isInteger(this.visibleRect.width)||this.visibleRect.width<=0)throw new TypeError("getCodedWidth() must return a positive integer.");if(!Number.isInteger(this.visibleRect.height)||this.visibleRect.height<=0)throw new TypeError("getCodedHeight() must return a positive integer.");if(this.squarePixelWidth=e.getSquarePixelWidth(),!Number.isInteger(this.squarePixelWidth)||this.squarePixelWidth<=0)throw new TypeError("getSquarePixelWidth() must return a positive integer.");if(this.squarePixelHeight=e.getSquarePixelHeight(),!Number.isInteger(this.squarePixelHeight)||this.squarePixelHeight<=0)throw new TypeError("getSquarePixelHeight() must return a positive integer.");this.rotation=t.rotation??0,this.flip=t.flip??!1,this.timestamp=t.timestamp,this.duration=t.duration??0,this.colorSpace=e.getColorSpace()}else throw new TypeError("Invalid data type: Must be a BufferSource, CanvasImageSource, or VideoSampleResource.");this.encodeOptions=t?.encodeOptions??{},this.pixelAspectRatio=Ol({num:this.squarePixelWidth*this.codedHeight,den:this.squarePixelHeight*this.codedWidth}),Kh?.register(this,{type:"video",data:this._data},this)}clone(){if(this._closed)throw new Error("VideoSample is closed.");return J(this._data!==null),this._data instanceof Ni?new n(this._data,{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,flip:this.flip,encodeOptions:this.encodeOptions}):aa(this._data)?new n(this._data.clone(),{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,flip:this.flip,encodeOptions:this.encodeOptions}):this._data instanceof Uint8Array?(J(this._layout),new n(this._data,{format:this.format,layout:this._layout,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,flip:this.flip,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions,_doNotCopy:!0})):new n(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,flip:this.flip,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions})}close(){this._closed||(Kh?.unregister(this),this._data instanceof Ni?(this._data._referenceCount--,this._data._referenceCount===0&&this._data.close()):aa(this._data)?this._data.close():this._data=null,this._closed=!0)}allocationSize(e={}){if($m(e),this._closed)throw new Error("VideoSample is closed.");if((e.format??this.format)==null)throw new Error("Cannot get allocation size when format is null.");return aa(this._data)?this._data.allocationSize(e):jm(this,e).allocationSize}async copyTo(e,t={}){if(!na(e))throw new TypeError("destination must be an ArrayBuffer or an ArrayBuffer view.");if($m(t),this._closed)throw new Error("VideoSample is closed.");if((t.format??this.format)==null)throw new Error("Cannot copy video sample data when format is null.");if(J(this._data!==null),aa(this._data))return this._data.copyTo(e,t);if(t.format&&!["RGBA","RGBX","BGRA","BGRX"].includes(this.format)&&["RGBA","RGBX","BGRA","BGRX"].includes(t.format))if(this._data instanceof Ni){let l={stack:[],error:void 0,hasError:!1};try{let u=Rw(l,await this._data.toRgbSample({timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,flip:this.flip},t.colorSpace??"srgb"),!1);if(!(u instanceof n))throw new TypeError("toRgbSample() must return a VideoSample.");if(!["RGBA","RGBX","BGRA","BGRX"].includes(u.format))throw new Error(`Sample returned by toRgbSample was expected to have an RGB format, got '${u.format}' instead.`);return await u.copyTo(e,t)}catch(u){l.error=u,l.hasError=!0}finally{Iw(l)}}else{if(typeof VideoFrame>"u")throw new Error("For this sample, converting from a non-RGB to an RGB format requires VideoFrame to be defined.");let l=this.toVideoFrame(),u=await l.copyTo(e,t);return l.close(),u}let i=jm(this,t);J(this.format);let r=hn(e);if(r.byteLength<i.allocationSize)throw new TypeError(`Destination buffer too small. Required: ${i.allocationSize}, Available: ${r.byteLength}`);let s=Zl(this.format),o;if(this._data instanceof Ni){let l=this._data.getDataPlanes();if(ai(l)&&(l=await l),!Array.isArray(l)||l.some(u=>!(u.data instanceof Uint8Array)||!Number.isInteger(u.stride)||u.stride<0))throw new TypeError('getDataPlanes() must return an array of objects with a Uint8Array "data" property and a non-negative integer "stride" property.');o=l}else if(this._data instanceof Uint8Array)J(this._layout),J(this._layout.length===s.length),o=this._layout.map((l,u)=>{let f=Math.ceil(this.codedHeight/s[u].heightDivisor);return{data:this._data.subarray(l.offset,l.offset+l.stride*f),stride:l.stride}});else{let u=this._data.getContext("2d");J(u);let f=u.getImageData(0,0,this.codedWidth,this.codedHeight);o=[{data:hn(f.data),stride:4*this.codedWidth}]}let a=[],c=s.length;for(let l=0;l<c;l++){let u=i.computedLayouts[l],f=o[l].stride,h=o[l].data,d=u.sourceTop*f;d+=u.sourceLeftBytes;let m=u.destinationOffset,y=u.sourceWidthBytes,g={offset:m,stride:u.destinationStride};for(let p=0;p<u.sourceHeight;p++){if(d+y>h.byteLength)throw new Error("Source buffer OOB read.");if(m+y>r.byteLength)throw new Error("Destination buffer OOB write.");let w=h.subarray(d,d+y);r.set(w,m),d+=f,m+=u.destinationStride}a.push(g)}if(t.format!==void 0){let l=this.format.startsWith("RGB")!==t.format.startsWith("RGB"),u=this.format.includes("X")&&t.format.includes("A");if(l||u)for(let f=0;f<i.allocationSize;f+=4){if(l){let h=r[f],d=r[f+2];r[f]=d,r[f+2]=h}u&&(r[f+3]=255)}}return a}toVideoFrame(){if(this._closed)throw new Error("VideoSample is closed.");if(J(this._data!==null),this._data instanceof Ni){if(this.format===null)throw new Error("Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if format is null.");let e=this._data.getDataPlanes();if(ai(e))throw new Error("Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if getDataPlanes() returns a promise.");let t=e.reduce((o,a)=>o+a.data.byteLength,0),i=new Uint8Array(t),r=0,s=[];for(let o of e)i.set(o.data,r),s.push(r),r+=o.data.byteLength;return new VideoFrame(i,{format:this.format,layout:e.map((o,a)=>({offset:s[a],stride:o.stride})),codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})}else return aa(this._data)?new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0}):this._data instanceof Uint8Array?(J(this._layout),new VideoFrame(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,layout:this._layout,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})):new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0})}draw(e,t,i,r,s,o,a,c,l){let u=0,f=0,h=this.displayWidth,d=this.displayHeight,m=0,y=0,g=this.displayWidth,p=this.displayHeight;if(o!==void 0?(u=t,f=i,h=r,d=s,m=o,y=a,c!==void 0?(g=c,p=l):(g=h,p=d)):(m=t,y=i,r!==void 0&&(g=r,p=s)),!(typeof CanvasRenderingContext2D<"u"&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<"u"&&e instanceof OffscreenCanvasRenderingContext2D))throw new TypeError("context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.");if(!Number.isFinite(u))throw new TypeError("sx must be a number.");if(!Number.isFinite(f))throw new TypeError("sy must be a number.");if(!Number.isFinite(h)||h<0)throw new TypeError("sWidth must be a non-negative number.");if(!Number.isFinite(d)||d<0)throw new TypeError("sHeight must be a non-negative number.");if(!Number.isFinite(m))throw new TypeError("dx must be a number.");if(!Number.isFinite(y))throw new TypeError("dy must be a number.");if(!Number.isFinite(g)||g<0)throw new TypeError("dWidth must be a non-negative number.");if(!Number.isFinite(p)||p<0)throw new TypeError("dHeight must be a non-negative number.");if(this._closed)throw new Error("VideoSample is closed.");({sx:u,sy:f,sWidth:h,sHeight:d}=this._unmapSourceRegion(u,f,h,d,this.rotation,this.flip));let w=this.toCanvasImageSource();e.save();let C=m+g/2,v=y+p/2;e.translate(C,v),this.flip&&e.scale(-1,1),e.rotate(this.rotation*Math.PI/180);let A=this.rotation%180===0?1:g/p;e.scale(1/A,A),e.drawImage(w,u,f,h,d,-g/2,-p/2,g,p),e.restore()}drawWithFit(e,t){if(!(typeof CanvasRenderingContext2D<"u"&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<"u"&&e instanceof OffscreenCanvasRenderingContext2D))throw new TypeError("context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.");if(!t||typeof t!="object")throw new TypeError("options must be an object.");if(!["fill","contain","cover"].includes(t.fit))throw new TypeError("options.fit must be 'fill', 'contain', or 'cover'.");if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("options.rotation, when provided, must be 0, 90, 180, or 270.");if(t.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("options.flip, when provided, must be a boolean.");t.crop!==void 0&&Yl(t.crop,"options.");let i=e.canvas.width,r=e.canvas.height,s=t.rotation??this.rotation,o=t.flip??this.flip,[a,c]=s%180===0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],l=t.crop;l&&(l=Zm(l,a,c));let u,f,h,d,{sx:m,sy:y,sWidth:g,sHeight:p}=this._unmapSourceRegion(t.crop?.left??0,t.crop?.top??0,t.crop?.width??a,t.crop?.height??c,s,o);if(t.fit==="fill")u=0,f=0,h=i,d=r;else{let[C,v]=t.crop?[t.crop.width,t.crop.height]:[a,c],A=t.fit==="contain"?Math.min(i/C,r/v):Math.max(i/C,r/v);h=C*A,d=v*A,u=(i-h)/2,f=(r-d)/2}e.save();let w=s%180===0?1:h/d;e.translate(i/2,r/2),o&&e.scale(-1,1),e.rotate(s*Math.PI/180),e.scale(1/w,w),e.translate(-i/2,-r/2),e.drawImage(this.toCanvasImageSource(),m,y,g,p,u,f,h,d),e.restore()}_unmapSourceRegion(e,t,i,r,s,o){return o&&(e=(s%180===0?this.squarePixelWidth:this.squarePixelHeight)-e-i),s===90?[e,t,i,r]=[t,this.squarePixelHeight-e-i,r,i]:s===180?[e,t]=[this.squarePixelWidth-e-i,this.squarePixelHeight-t-r]:s===270&&([e,t,i,r]=[this.squarePixelWidth-t-r,e,r,i]),{sx:e,sy:t,sWidth:i,sHeight:r}}_drawWithFitAndMipmapping(e,t,i){let r=e.width,s=e.height,[o,a]=i.rotation%180===0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],c=i.crop?i.crop.width:o,l=i.crop?i.crop.height:a,u=0;2*r<c&&2*s<l&&(u=Math.floor(Math.log2(Math.min(c/r,l/s))));let f=r*2**u,h=s*2**u,{canvas:d,context:m,isNew:y}=u>0?Ym(f,h):{canvas:e,context:t,isNew:i.targetIsFresh};m.imageSmoothingQuality="high",i.fillBlack?(m.fillStyle="black",m.fillRect(0,0,f,h)):y||m.clearRect(0,0,f,h),this.drawWithFit(m,{fit:i.fit,rotation:i.rotation,flip:i.flip,crop:i.crop}),m.globalCompositeOperation="copy";for(let g=u;g>1;g--){let p=r*2**g,w=s*2**g;m.drawImage(d,0,0,p,w,0,0,p/2,w/2)}m.globalCompositeOperation="source-over",u>0&&(t.imageSmoothingQuality="high",t.globalCompositeOperation="copy",t.drawImage(d,0,0,2*r,2*s,0,0,r,s),t.globalCompositeOperation="source-over")}toCanvasImageSource(){if(this._closed)throw new Error("VideoSample is closed.");if(J(this._data!==null),this._data instanceof Ni||this._data instanceof Uint8Array){let e=this.toVideoFrame();return queueMicrotask(()=>e.close()),e}else return this._data}async transform(e){if(!e||typeof e!="object")throw new TypeError("options must be an object.");if(e.width!==void 0&&(!Number.isInteger(e.width)||e.width<=0))throw new TypeError("options.width, when provided, must be a positive integer.");if(e.height!==void 0&&(!Number.isInteger(e.height)||e.height<=0))throw new TypeError("options.height, when provided, must be a positive integer.");if(e.roundDimensionsTo!==void 0&&(!Number.isInteger(e.roundDimensionsTo)||e.roundDimensionsTo<=0))throw new TypeError("options.roundDimensionsTo, when provided, must be a positive integer.");if(e.fit!==void 0&&!["fill","contain","cover"].includes(e.fit))throw new TypeError('options.fit, when provided, must be one of "fill", "contain", or "cover".');if(e.width!==void 0&&e.height!==void 0&&e.fit===void 0)throw new TypeError("When both options.width and options.height are provided, options.fit must also be provided.");if(e.rotate!==void 0&&![0,90,180,270].includes(e.rotate))throw new TypeError("options.rotate, when provided, must be 0, 90, 180 or 270.");if(e.flip!==void 0&&typeof e.flip!="boolean")throw new TypeError("options.flip, when provided, must be a boolean.");if(e.crop!==void 0&&Yl(e.crop,"options."),e.alpha!==void 0&&!["keep","discard"].includes(e.alpha))throw new TypeError("options.alpha, when provided, must be 'keep' or 'discard'.");let{rotation:t,flip:i}=Gp(this.rotation,this.flip,e.rotate??0,e.flip??!1),[r,s]=t%180===0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],o=e.crop;o&&(o=Zm(o,r,s));let a=o?o.width:r,c=o?o.height:s,l=a/c,u,f;e.width!==void 0&&e.height===void 0?(u=e.width,f=u/l):e.width===void 0&&e.height!==void 0?(f=e.height,u=f*l):e.width!==void 0&&e.height!==void 0?(u=e.width,f=e.height):(u=a,f=c),u=Vh(u,e.roundDimensionsTo??1),f=Vh(f,e.roundDimensionsTo??1);let h={width:u,height:f,fit:e.fit??"fill",rotation:t,flip:i,crop:o??{left:0,top:0,width:r,height:s},alpha:e.alpha??"keep"};for(let g of Bw){let p=g(this,h);if(ai(p)&&(p=await p),p!==null)return p}let{canvas:d,context:m,isNew:y}=Ym(h.width,h.height);return this._drawWithFitAndMipmapping(d,m,{fit:h.fit,rotation:h.rotation,flip:h.flip,crop:h.crop,targetIsFresh:y,fillBlack:h.alpha==="discard"}),new n(d,{timestamp:this.timestamp,duration:this.duration,rotation:0,flip:!1})}setRotation(e){if(![0,90,180,270].includes(e))throw new TypeError("newRotation must be 0, 90, 180, or 270.");this.rotation=e}setFlip(e){if(typeof e!="boolean")throw new TypeError("newFlip must be a boolean.");this.flip=e}setTimestamp(e){if(!Number.isFinite(e))throw new TypeError("newTimestamp must be a number.");this.timestamp=e}setDuration(e){if(!Number.isFinite(e)||e<0)throw new TypeError("newDuration must be a non-negative number.");this.duration=e}setEncodeOptions(e){if(!e||typeof e!="object")throw new TypeError("newEncodeOptions must be an object.");this.encodeOptions=e}[Symbol.dispose](){this.close()}},Bw=[];var Lw=3,oa=[],Xm=0,Ym=(n,e)=>{for(let r of oa)if(r.canvas.width===n&&r.canvas.height===e)return r.age=Xm++,{canvas:r.canvas,context:r.context,isNew:!1};let t;if(typeof OffscreenCanvas<"u")t=new OffscreenCanvas(n,e);else{if(typeof window>"u"||typeof document>"u")throw new Error("Cannot transform VideoSamples in this environment. Either run in an environment with OffscreenCanvas or HTMLCanvasElement, or supply a custom VideoSample transformer using registerVideoSampleTransformer().");t=document.createElement("canvas"),t.width=n,t.height=e}let i=t.getContext("2d",{alpha:!0,willReadFrequently:!1});if(!i)throw new Error("The '2d' canvas context is required to transform VideoSamples. Register a custom transformer using registerVideoSampleTransformer to work around this limitation.");return oa.length>=Lw&&oa.splice(nm(oa,r=>r.age),1),oa.push({canvas:t,context:i,age:Xm++}),{canvas:t,context:i,isNew:!0}},ca=class{constructor(e){if(e!==void 0){if(!e||typeof e!="object")throw new TypeError("init.colorSpace, when provided, must be an object.");let t=Object.keys(Br);if(e.primaries!=null&&!t.includes(e.primaries))throw new TypeError(`init.colorSpace.primaries, when provided, must be one of ${t.join(", ")}.`);let i=Object.keys(Lr);if(e.transfer!=null&&!i.includes(e.transfer))throw new TypeError(`init.colorSpace.transfer, when provided, must be one of ${i.join(", ")}.`);let r=Object.keys(Fr);if(e.matrix!=null&&!r.includes(e.matrix))throw new TypeError(`init.colorSpace.matrix, when provided, must be one of ${r.join(", ")}.`);if(e.fullRange!=null&&typeof e.fullRange!="boolean")throw new TypeError("init.colorSpace.fullRange, when provided, must be a boolean.")}this.primaries=e?.primaries??null,this.transfer=e?.transfer??null,this.matrix=e?.matrix??null,this.fullRange=e?.fullRange??null}toJSON(){return{primaries:this.primaries,transfer:this.transfer,matrix:this.matrix,fullRange:this.fullRange}}},aa=n=>typeof VideoFrame<"u"&&n instanceof VideoFrame,Zm=(n,e,t)=>{let i=Math.min(n.left,e),r=Math.min(n.top,t),s=Math.min(n.width,e-i),o=Math.min(n.height,t-r);return J(s>=0),J(o>=0),{left:i,top:r,width:s,height:o}},Yl=(n,e)=>{if(!n||typeof n!="object")throw new TypeError(e+"crop, when provided, must be an object.");if(!Number.isInteger(n.left)||n.left<0)throw new TypeError(e+"crop.left must be a non-negative integer.");if(!Number.isInteger(n.top)||n.top<0)throw new TypeError(e+"crop.top must be a non-negative integer.");if(!Number.isInteger(n.width)||n.width<0)throw new TypeError(e+"crop.width must be a non-negative integer.");if(!Number.isInteger(n.height)||n.height<0)throw new TypeError(e+"crop.height must be a non-negative integer.")},$m=n=>{if(!n||typeof n!="object")throw new TypeError("options must be an object.");if(n.colorSpace!==void 0&&!["display-p3","srgb"].includes(n.colorSpace))throw new TypeError("options.colorSpace, when provided, must be 'display-p3' or 'srgb'.");if(n.format!==void 0&&typeof n.format!="string")throw new TypeError("options.format, when provided, must be a string.");if(n.layout!==void 0){if(!Array.isArray(n.layout))throw new TypeError("options.layout, when provided, must be an array.");for(let e of n.layout){if(!e||typeof e!="object")throw new TypeError("Each entry in options.layout must be an object.");if(!Number.isInteger(e.offset)||e.offset<0)throw new TypeError("plane.offset must be a non-negative integer.");if(!Number.isInteger(e.stride)||e.stride<0)throw new TypeError("plane.stride must be a non-negative integer.")}}if(n.rect!==void 0){if(!n.rect||typeof n.rect!="object")throw new TypeError("options.rect, when provided, must be an object.");if(n.rect.x!==void 0&&(!Number.isInteger(n.rect.x)||n.rect.x<0))throw new TypeError("options.rect.x, when provided, must be a non-negative integer.");if(n.rect.y!==void 0&&(!Number.isInteger(n.rect.y)||n.rect.y<0))throw new TypeError("options.rect.y, when provided, must be a non-negative integer.");if(n.rect.width!==void 0&&(!Number.isInteger(n.rect.width)||n.rect.width<0))throw new TypeError("options.rect.width, when provided, must be a non-negative integer.");if(n.rect.height!==void 0&&(!Number.isInteger(n.rect.height)||n.rect.height<0))throw new TypeError("options.rect.height, when provided, must be a non-negative integer.")}},Fw=(n,e,t)=>{let i=Zl(n),r=[],s=0;for(let o of i){let a=Math.ceil(e/o.widthDivisor),c=Math.ceil(t/o.heightDivisor),l=a*o.sampleBytes,u=l*c;r.push({offset:s,stride:l}),s+=u}return r},Zl=n=>{let e=(t,i,r,s,o)=>{let a=[{sampleBytes:t,widthDivisor:1,heightDivisor:1},{sampleBytes:i,widthDivisor:r,heightDivisor:s},{sampleBytes:i,widthDivisor:r,heightDivisor:s}];return o&&a.push({sampleBytes:t,widthDivisor:1,heightDivisor:1}),a};switch(n){case"I420":return e(1,1,2,2,!1);case"I420P10":case"I420P12":return e(2,2,2,2,!1);case"I420A":return e(1,1,2,2,!0);case"I420AP10":case"I420AP12":return e(2,2,2,2,!0);case"I422":return e(1,1,2,1,!1);case"I422P10":case"I422P12":return e(2,2,2,1,!1);case"I422A":return e(1,1,2,1,!0);case"I422AP10":case"I422AP12":return e(2,2,2,1,!0);case"I444":return e(1,1,1,1,!1);case"I444P10":case"I444P12":return e(2,2,1,1,!1);case"I444A":return e(1,1,1,1,!0);case"I444AP10":case"I444AP12":return e(2,2,1,1,!0);case"NV12":return[{sampleBytes:1,widthDivisor:1,heightDivisor:1},{sampleBytes:2,widthDivisor:2,heightDivisor:2}];case"RGBA":case"RGBX":case"BGRA":case"BGRX":return[{sampleBytes:4,widthDivisor:1,heightDivisor:1}];default:oi(n),J(!1)}},jm=(n,e)=>{let t={left:0,top:0,width:n.codedWidth,height:n.codedHeight},i=e.rect,r=Dw(t,i,n.codedWidth,n.codedHeight,n.format),s=e.layout,o;if(!e.format||e.format===n.format)o=n.format;else if(["RGBA","RGBX","BGRA","BGRX"].includes(e.format))o=e.format;else throw new Error("NotSupportedError: Invalid destination format.");return Ow(r,o,s)},Dw=(n,e,t,i,r)=>{let s={...n};if(e!==void 0){if(e.width===0||e.height===0)throw new TypeError("visibleRect dimensions cannot be zero.");if((e.x||0)+(e.width||0)>t)throw new TypeError("visibleRect exceeds codedWidth.");if((e.y||0)+(e.height||0)>i)throw new TypeError("visibleRect exceeds codedHeight.");s.x=e.x||0,s.y=e.y||0,s.width=e.width||0,s.height=e.height||0}if(!Uw(r,s))throw new TypeError("visibleRect alignment is invalid for the format.");return s},Uw=(n,e)=>{if(n===null)return!0;let t=Zl(n);for(let i=0;i<t.length;i++){let r=t[i],s=r.widthDivisor,o=r.heightDivisor;if((e.x||0)%s!==0||(e.y||0)%o!==0)return!1}return!0},Ow=(n,e,t)=>{let i=Zl(e),r=i.length;if(t!==void 0&&t.length!==r)throw new TypeError(`Layout must have ${r} planes.`);let s=0,o=[],a=[];for(let c=0;c<r;c++){let l=i[c],u=l.sampleBytes,f=l.widthDivisor,h=l.heightDivisor,d={destinationOffset:0,destinationStride:0,sourceTop:0,sourceHeight:0,sourceLeftBytes:0,sourceWidthBytes:0};if(d.sourceTop=Math.ceil(Math.trunc(n.y||0)/h),d.sourceHeight=Math.ceil(Math.trunc(n.height||0)/h),d.sourceLeftBytes=Math.floor(Math.trunc(n.x||0)/f)*u,d.sourceWidthBytes=Math.floor(Math.trunc(n.width||0)/f)*u,t!==void 0){let g=t[c];if(g.stride<d.sourceWidthBytes)throw new TypeError(`Stride for plane ${c} is too small.`);d.destinationOffset=g.offset,d.destinationStride=g.stride}else d.destinationOffset=s,d.destinationStride=d.sourceWidthBytes;let y=d.destinationStride*d.sourceHeight+d.destinationOffset;if(y>4294967295)throw new TypeError("Allocation size exceeds limit.");a.push(y),s=Math.max(s,y);for(let g=0;g<c;g++){let p=o[g];if(!(a[c]<=p.destinationOffset||a[g]<=d.destinationOffset))throw new TypeError("Planes overlap.")}o.push(d)}return{allocationSize:s,computedLayouts:o}};var Jm=new Map;var eg=n=>{if(!n||typeof n!="object")throw new TypeError("Encoding config must be an object.");if(!qn.includes(n.codec))throw new TypeError(`Invalid video codec '${n.codec}'. Must be one of: ${qn.join(", ")}.`);let e=n.bitrate;if(n.quality===void 0&&e===void 0)throw new TypeError("config.quality must be provided.");if(n.quality!==void 0&&e!==void 0)throw new TypeError("config.quality and config.bitrate cannot both be provided.");if(n.quality!==void 0&&!(n.quality instanceof vi))throw new TypeError("config.quality, when provided, must be a Quality.");if(e!==void 0&&!(e instanceof vi)&&(!Number.isInteger(e)||e<=0))throw new TypeError("config.bitrate, when provided, must be a positive integer or a quality.");if(n.keyFrameInterval!==void 0&&(!Number.isFinite(n.keyFrameInterval)||n.keyFrameInterval<0))throw new TypeError("config.keyFrameInterval, when provided, must be a non-negative number.");if(n.sizeChangeBehavior!==void 0&&!["deny","passThrough","fill","contain","cover"].includes(n.sizeChangeBehavior))throw new TypeError("config.sizeChangeBehavior, when provided, must be 'deny', 'passThrough', 'fill', 'contain' or 'cover'.");if(n.transform!==void 0){if(typeof n.transform!="object"||!n.transform)throw new TypeError("config.transform, when provided, must be an object.");if(n.transform.width!==void 0&&(!Number.isInteger(n.transform.width)||n.transform.width<=0))throw new TypeError("config.transform.width, when provided, must be a positive integer.");if(n.transform.height!==void 0&&(!Number.isInteger(n.transform.height)||n.transform.height<=0))throw new TypeError("config.transform.height, when provided, must be a positive integer.");if(n.transform.fit!==void 0&&!["fill","contain","cover"].includes(n.transform.fit))throw new TypeError('config.transform.fit, when provided, must be one of "fill", "contain", or "cover".');if(n.transform.width!==void 0&&n.transform.height!==void 0&&n.transform.fit===void 0&&!["fill","contain","cover"].includes(n.sizeChangeBehavior))throw new TypeError("When both config.transform.width and config.transform.height are provided, config.transform.fit must also be provided.");if(n.transform.fit!==void 0&&["fill","contain","cover"].includes(n.sizeChangeBehavior)&&n.transform.fit!==n.sizeChangeBehavior)throw new TypeError("config.transform.fit, when provided, cannot differ from config.sizeChangeBehavior when config.sizeChangeBehavior is 'fill', 'contain' or 'cover', as sizeChangeBehavior already determines the fitting algorithm.");if(n.transform.rotate!==void 0&&![0,90,180,270].includes(n.transform.rotate))throw new TypeError("config.transform.rotate, when provided, must be 0, 90, 180 or 270.");if(n.transform.flip!==void 0&&typeof n.transform.flip!="boolean")throw new TypeError("config.transform.flip, when provided, must be a boolean.");if(n.transform.crop!==void 0&&Yl(n.transform.crop,"config.transform."),n.transform.process!==void 0&&typeof n.transform.process!="function")throw new TypeError("config.transform.process, when provided, must be a function.");if(n.transform.frameRate!==void 0&&(!Number.isFinite(n.transform.frameRate)||n.transform.frameRate<=0))throw new TypeError("config.transform.frameRate, when provided, must be a finite positive number.");if(n.transform.force!==void 0&&typeof n.transform.force!="boolean")throw new TypeError("config.transform.force, when provided, must be a boolean.")}if(n.onEncodedPacket!==void 0&&typeof n.onEncodedPacket!="function")throw new TypeError("config.onEncodedPacket, when provided, must be a function.");if(n.onEncoderConfig!==void 0&&typeof n.onEncoderConfig!="function")throw new TypeError("config.onEncoderConfig, when provided, must be a function.");if(n.onEncodedSample!==void 0&&typeof n.onEncodedSample!="function")throw new TypeError("config.onEncodedSample, when provided, must be a function.");tg(n.codec,n)},tg=(n,e)=>{if(!e||typeof e!="object")throw new TypeError("Encoding options must be an object.");if(e.alpha!==void 0&&!["discard","keep"].includes(e.alpha))throw new TypeError("options.alpha, when provided, must be 'discard' or 'keep'.");let t=e.bitrateMode;if(t!==void 0&&!["constant","variable"].includes(t))throw new TypeError("bitrateMode, when provided, must be 'constant' or 'variable'.");if(e.latencyMode!==void 0&&!["quality","realtime"].includes(e.latencyMode))throw new TypeError("latencyMode, when provided, must be 'quality' or 'realtime'.");if(e.fullCodecString!==void 0&&typeof e.fullCodecString!="string")throw new TypeError("fullCodecString, when provided, must be a string.");if(e.fullCodecString!==void 0&&Gl(e.fullCodecString)!==n)throw new TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${n}).`);if(e.hardwareAcceleration!==void 0&&!["no-preference","prefer-hardware","prefer-software"].includes(e.hardwareAcceleration))throw new TypeError("hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.");if(e.scalabilityMode!==void 0&&typeof e.scalabilityMode!="string")throw new TypeError("scalabilityMode, when provided, must be a string.");if(e.contentHint!==void 0&&typeof e.contentHint!="string")throw new TypeError("contentHint, when provided, must be a string.")},td=n=>{let e=n.bitrateMode,t=n.quality._toVideoRateControl(n.codec,n.width,n.height,e),i=(s,o,a)=>({codec:n.fullCodecString??Fm(n.codec,n.width,n.height,a,n.alpha==="keep"),width:n.width,height:n.height,displayWidth:n.squarePixelWidth,displayHeight:n.squarePixelHeight,bitrate:s,bitrateMode:o,alpha:n.alpha??"discard",framerate:n.framerate,latencyMode:n.latencyMode,hardwareAcceleration:n.hardwareAcceleration,scalabilityMode:n.scalabilityMode,contentHint:n.contentHint,...Om(n.codec)}),r=[];return t.quantizer!==null&&r.push({config:i(void 0,"quantizer",t.bitrate),quantizer:t.quantizer}),t.bitrateMode!=="quantizer"&&r.push({config:i(t.bitrate,t.bitrateMode,t.bitrate),quantizer:null}),J(r.length>0),r};var vi=class{constructor(e){if((typeof e=="number"||typeof e=="string")&&(e={quality:e}),!e||typeof e!="object")throw new TypeError("options must be an object.");if(e.bitrateMode!==void 0&&!["constant","variable"].includes(e.bitrateMode))throw new TypeError("options.bitrateMode, when provided, must be 'constant' or 'variable'.");if("quality"in e){if(typeof e.quality=="string"?!(e.quality in Km):typeof e.quality!="number"||Number.isNaN(e.quality))throw new TypeError("options.quality must be a number, or one of 'very-low', 'low', 'medium', 'high' or 'very-high'.");if(e.preferBitrate!==void 0&&typeof e.preferBitrate!="boolean")throw new TypeError("options.preferBitrate, when provided, must be a boolean.");if("bitrate"in e||"quantizer"in e)throw new TypeError("options.quality cannot be combined with options.bitrate or options.quantizer.");this._quality=typeof e.quality=="string"?Km[e.quality]:e.quality,this._preferBitrate=e.preferBitrate??!1,this._bitrate=void 0,this._quantizer=void 0}else{if(e.bitrate!==void 0&&(!Number.isInteger(e.bitrate)||e.bitrate<=0))throw new TypeError("options.bitrate, when provided, must be a positive integer.");if(e.quantizer!==void 0&&(!Number.isInteger(e.quantizer)||e.quantizer<0))throw new TypeError("options.quantizer, when provided, must be a non-negative integer.");if(e.bitrate===void 0&&e.quantizer===void 0)throw new TypeError("At least one of options.bitrate or options.quantizer must be set.");if("preferBitrate"in e)throw new TypeError("options.preferBitrate can only be combined with options.quality.");this._quality=void 0,this._preferBitrate=!1,this._bitrate=e.bitrate,this._quantizer=e.quantizer}this._bitrateMode=e.bitrateMode}_toVideoRateControl(e,t,i,r){let s=Nw[e],o=null,a=this._bitrateMode??r??"variable";if(this._quantizer!==void 0){if(s)if(this._quantizer<s.min||this._quantizer>s.max){if(this._bitrate===void 0)throw new Error(`Quantizer ${this._quantizer} is out of range for codec '${e}'; must be between ${s.min} and ${s.max}.`)}else o=this._quantizer,this._bitrate===void 0&&(a="quantizer");else if(this._bitrate===void 0)throw new Error(`Codec '${e}' does not support quantizer-based encoding. Provide a bitrate in the Quality to define a fallback.`)}else this._bitrate===void 0&&s&&!this._preferBitrate&&(J(this._quality!==void 0),o=Hs(Math.round(Xp(s.worst,s.best,this._quality)),s.min,s.max));let c;if(this._bitrate!==void 0)c=this._bitrate;else{let l=this._quality;l===void 0&&(J(o!==null&&s),l=Hs((o-s.worst)/(s.best-s.worst),0,1)),c=Qm(e,t,i,ed(l))}return{quantizer:o,bitrate:c,bitrateMode:a}}_toVideoBitrate(e,t,i){return this._bitrate!==void 0?this._bitrate:(J(this._quality!==void 0),Qm(e,t,i,ed(this._quality)))}_toAudioBitrate(e){if(Wn.includes(e)||e==="flac")return;if(this._bitrate!==void 0)return this._bitrate;if(this._quality===void 0)throw new Error("This Quality defines neither a quality level nor a bitrate and therefore cannot be used for audio encoding.");let t=ed(this._quality),r={aac:128e3,opus:64e3,mp3:16e4,vorbis:64e3,ac3:384e3,eac3:192e3,dts:768e3}[e];if(!r)throw new Error(`Unhandled codec: ${e}`);let s=r*t;return e==="aac"?s=[96e3,128e3,16e4,192e3].reduce((a,c)=>Math.abs(c-s)<Math.abs(a-s)?c:a):e==="opus"||e==="vorbis"?s=Math.max(6e3,s):e==="mp3"&&(s=[8e3,16e3,24e3,32e3,4e4,48e3,64e3,8e4,96e3,112e3,128e3,16e4,192e3,224e3,256e3,32e4].reduce((a,c)=>Math.abs(c-s)<Math.abs(a-s)?c:a)),Math.round(s/1e3)*1e3}},Km={"very-low":0,low:.25,medium:.5,high:.75,"very-high":1},Nw={avc:{min:0,max:51,worst:41,best:16},hevc:{min:0,max:51,worst:41,best:16},vp9:{min:0,max:63,worst:52,best:20},av1:{min:0,max:255,worst:208,best:80}},ed=n=>.3*Math.exp(2.5538*n),Qm=(n,e,t,i)=>{let r=e*t,s=1920*1080,o=3e6,a=Math.pow(r/s,.95),c=o*a,l={avc:1,hevc:.6,vp9:.6,av1:.4,vp8:1.2,prores:22e7/o},f=c*l[n]*i;return Math.ceil(f/1e3)*1e3},nd=(n,e)=>{if(n==="avc")return{avc:{quantizer:e}};if(n==="hevc")return{hevc:{quantizer:e}};if(n==="vp9")return{vp9:{quantizer:e}};if(n==="av1")return{av1:{quantizer:e}};J(!1)};var id=async(n,e={})=>{let{width:t=1280,height:i=720,quality:r,bitrate:s,frameRate:o,...a}=e;if(!qn.includes(n))return!1;if(!Number.isInteger(t)||t<=0)throw new TypeError("width must be a positive integer.");if(!Number.isInteger(i)||i<=0)throw new TypeError("height must be a positive integer.");if(r!==void 0&&!(r instanceof vi))throw new TypeError("quality, when provided, must be a Quality.");if(r!==void 0&&s!==void 0)throw new TypeError("quality and bitrate cannot both be provided.");if(s!==void 0&&!(s instanceof vi)&&(!Number.isInteger(s)||s<=0))throw new TypeError("bitrate must be a positive integer or a quality.");if(o!==void 0&&(!Number.isFinite(o)||o<=0))throw new TypeError("frameRate, when provided, must be a finite positive number.");tg(n,a);let c=rd(r,s)??new vi("medium"),l;try{l=td({codec:n,width:t,height:i,quality:c,framerate:o,...a,alpha:"discard"})}catch{return!1}let u=JSON.stringify(l),f=Jm.get(u);if(f)return f;let h=(async()=>{for(let{config:m}of l)if($l.some(y=>y.supports(n,m)))return!0;if(typeof VideoEncoder>"u"||(t%2===1||i%2===1)&&(n==="avc"||n==="hevc"))return!1;for(let{config:m,quantizer:y}of l){try{if(!(await VideoEncoder.isConfigSupported(m)).supported)continue}catch{continue}if(!Dl()||await new Promise(async p=>{try{let w=new VideoEncoder({output:()=>{},error:()=>p(!1)});w.configure(m);let C=new Uint8Array(t*i*4),v=new VideoFrame(C,{format:"RGBA",codedWidth:t,codedHeight:i,timestamp:0});w.encode(v,y!==null?nd(n,y):void 0),v.close(),await w.flush(),p(!0)}catch{p(!1)}}))return!0}return!1})();return Jm.set(u,h),h};var rd=(n,e)=>{if(n!==void 0)return n;if(e!==void 0)return e instanceof vi?e:new vi({bitrate:e})};var $l=[];var la=class n{constructor(e,t,i,r,s){this.bytes=e,this.view=t,this.offset=i,this.start=r,this.end=s,this.bufferPos=r-i}static tempFromBytes(e){return new n(e,ur(e),0,0,e.length)}get length(){return this.end-this.start}get filePos(){return this.offset+this.bufferPos}set filePos(e){this.bufferPos=e-this.offset}get remainingLength(){return Math.max(this.end-this.filePos,0)}skip(e){this.bufferPos+=e}slice(e,t=this.end-e){if(e<this.start||e+t>this.end)throw new RangeError("Slicing outside of original slice.");return new n(this.bytes,this.view,this.offset,e,e+t)}},zw=(n,e)=>{if(n.filePos<n.start||n.filePos+e>n.end)throw new RangeError(`Tried reading [${n.filePos}, ${n.filePos+e}), but slice is [${n.start}, ${n.end}). This is likely an internal error, please report it alongside the file that caused it.`)},Gm=(n,e)=>{zw(n,e);let t=n.bytes.subarray(n.bufferPos,n.bufferPos+e);return n.bufferPos+=e,t};var jl=class{constructor(e){this.mutex=new Vs,this.trackTimestampInfo=new WeakMap,this.output=e}onTrackClose(e){}validateTimestamp(e,t,i){let r=this.trackTimestampInfo.get(e);if(r){if(i&&(r.maxTimestampBeforeLastKeyPacket=r.maxTimestamp),r.maxTimestampBeforeLastKeyPacket!==null&&t<r.maxTimestampBeforeLastKeyPacket)throw new Error(`Timestamps cannot be smaller than the largest timestamp of the previous GOP (a GOP begins with a key packet and ends right before the next key packet). Got ${t}s, but largest timestamp is ${r.maxTimestampBeforeLastKeyPacket}s.`);r.maxTimestamp=Math.max(r.maxTimestamp,t)}else{if(!i)throw new Error("First packet must be a key packet.");r={maxTimestamp:t,maxTimestampBeforeLastKeyPacket:null},this.trackTimestampInfo.set(e,r)}}};var sd=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g;var ng=n=>{let e=Math.floor(n/36e5),t=Math.floor(n%(60*60*1e3)/(60*1e3)),i=Math.floor(n%(60*1e3)/1e3),r=n%1e3;return e.toString().padStart(2,"0")+":"+t.toString().padStart(2,"0")+":"+i.toString().padStart(2,"0")+"."+r.toString().padStart(3,"0")};var Ur=class{constructor(e){this.writer=e,this.helper=new Uint8Array(8),this.helperView=new DataView(this.helper.buffer),this.offsets=new WeakMap}writeU32(e){this.helperView.setUint32(0,e,!1),this.writer.write(this.helper.subarray(0,4))}writeU64(e){this.helperView.setUint32(0,Math.floor(e/2**32),!1),this.helperView.setUint32(4,e,!1),this.writer.write(this.helper.subarray(0,8))}writeAscii(e){for(let t=0;t<e.length;t++)this.helperView.setUint8(t%8,e.charCodeAt(t)),t%8===7&&this.writer.write(this.helper);e.length%8!==0&&this.writer.write(this.helper.subarray(0,e.length%8))}writeBox(e){if(this.offsets.set(e,this.writer.getPos()),e.contents&&!e.children)this.writeBoxHeader(e,e.size??e.contents.byteLength+8),this.writer.write(e.contents);else{let t=this.writer.getPos();if(this.writeBoxHeader(e,0),e.contents&&this.writer.write(e.contents),e.children)for(let s of e.children)s&&this.writeBox(s);let i=this.writer.getPos(),r=e.size??i-t;this.writer.seek(t),this.writeBoxHeader(e,r),this.writer.seek(i)}}writeBoxHeader(e,t){this.writeU32(e.largeSize?1:t),this.writeAscii(e.type),e.largeSize&&this.writeU64(t)}measureBoxHeader(e){return 8+(e.largeSize?8:0)}patchBox(e){let t=this.offsets.get(e);J(t!==void 0);let i=this.writer.getPos();this.writer.seek(t),this.writeBox(e),this.writer.seek(i)}measureBox(e){if(e.contents&&!e.children)return this.measureBoxHeader(e)+e.contents.byteLength;{let t=this.measureBoxHeader(e);if(e.contents&&(t+=e.contents.byteLength),e.children)for(let i of e.children)i&&(t+=this.measureBox(i));return t}}},Ke=new Uint8Array(8),Yn=new DataView(Ke.buffer),Dt=n=>[(n%256+256)%256],Ne=n=>(Yn.setUint16(0,n,!1),[Ke[0],Ke[1]]),ld=n=>(Yn.setInt16(0,n,!1),[Ke[0],Ke[1]]),og=n=>(Yn.setUint32(0,n,!1),[Ke[1],Ke[2],Ke[3]]),se=n=>(Yn.setUint32(0,n,!1),[Ke[0],Ke[1],Ke[2],Ke[3]]),Si=n=>(Yn.setInt32(0,n,!1),[Ke[0],Ke[1],Ke[2],Ke[3]]),li=n=>(Yn.setUint32(0,Math.floor(n/2**32),!1),Yn.setUint32(4,n,!1),[Ke[0],Ke[1],Ke[2],Ke[3],Ke[4],Ke[5],Ke[6],Ke[7]]),ig=n=>(Yn.setInt32(0,Math.floor(n/2**32),!1),Yn.setUint32(4,n,!1),[Ke[0],Ke[1],Ke[2],Ke[3],Ke[4],Ke[5],Ke[6],Ke[7]]),ag=n=>(Yn.setInt16(0,2**8*n,!1),[Ke[0],Ke[1]]),Xn=n=>(Yn.setInt32(0,2**16*n,!1),[Ke[0],Ke[1],Ke[2],Ke[3]]),od=n=>(Yn.setInt32(0,2**30*n,!1),[Ke[0],Ke[1],Ke[2],Ke[3]]),ad=(n,e)=>{let t=[],i=n;do{let r=i&127;i>>=7,t.length>0&&(r|=128),t.push(r),e!==void 0&&e--}while(i>0||e);return t.reverse()},At=(n,e=!1)=>{let t=Array(n.length).fill(null).map((i,r)=>n.charCodeAt(r));return e&&t.push(0),t},cg=n=>[Xn(n[0]),Xn(n[1]),od(n[2]),Xn(n[3]),Xn(n[4]),od(n[5]),Xn(n[6]),Xn(n[7]),od(n[8])],Be=(n,e,t)=>({type:n,contents:e&&new Uint8Array(e.flat(10)),children:t}),ct=(n,e,t,i,r)=>Be(n,[Dt(e),og(t),i??[]],r),lg=n=>n.isQuickTime?Be("ftyp",[At("qt  "),se(512),At("qt  ")]):n.fragmented?n.cmaf?Be("ftyp",[At("iso5"),se(512),At("iso5"),At("iso6"),At("mp41"),At("cmfc"),At("dash")]):Be("ftyp",[At("iso5"),se(512),At("iso5"),At("iso6"),At("mp41")]):Be("ftyp",[At("isom"),se(512),At("isom"),n.holdsAvc?At("avc1"):[],At("mp41")]),ud=()=>Be("styp",[At("iso5"),se(0),At("iso5"),At("iso6"),At("mp41"),At("cmfc"),At("dash")]),hd=(n,e)=>{let t=Math.max(0,n.minWrittenTimestamp),i=Math.max(0,n.maxWrittenEndTimestamp-t);return Number.isFinite(i)||(i=0),ct("sidx",1,0,[se(1),se(Mn),li(Et(t,Mn)),li(0),Ne(0),Ne(1),se(e&2147483647),se(Et(i,Mn)),se(0)])},ua=n=>({type:"mdat",largeSize:n}),ug=n=>({type:"free",size:n}),Ws=n=>Be("moov",void 0,[Vw(n.creationTime,n.trackDatas),...n.trackDatas.map(e=>Hw(e,n.creationTime)),n.isFragmented?CA(n.trackDatas):null,OA(n)]),Vw=(n,e)=>{let t=Math.max(0,...e.map(o=>Math.max(0,Et(Or(o),Mn)+Et(o.startTimestampOffset??0,Mn)))),i=Math.max(0,...e.map(o=>o.track.id))+1,r=!yi(n)||!yi(t),s=r?li:se;return ct("mvhd",+r,0,[s(n),s(n),se(Mn),s(t),Xn(1),ag(1),Array(10).fill(0),cg(Oh),Array(24).fill(0),se(i)])},Hw=(n,e)=>{let t=xg(n),i=n.startTimestampOffset!==null&&n.startTimestampOffset!==0;return Be("trak",void 0,[Gw(n,e),i?Ww(n):null,qw(n,e),t.name!==void 0?Be("udta",void 0,[Be("name",[...Hn.encode(t.name)])]):null])},Gw=(n,e)=>{let t=Math.max(0,Et(Or(n),Mn)+Et(n.startTimestampOffset??0,Mn)),i=!yi(e)||!yi(t),r=i?li:se,s;if(n.type==="video"&&n.track.metadata.transformationMatrix)s=n.track.metadata.transformationMatrix;else if(n.type==="video"){let{rotation:c,flip:l}=n.track.metadata,u=Bl(Vp(c??0),Hp(l?-1:1,1));s=zp(u,n.info.width,n.info.height)}else s=Oh;let o=2;n.track.metadata.disposition?.default!==!1&&(o|=1);let a=n.type==="video"?0:n.type==="audio"?1:n.type==="subtitle"?2:oi(n);return ct("tkhd",+i,o,[r(e),r(e),se(n.track.id),se(0),r(t),Array(8).fill(0),Ne(0),Ne(a),ag(n.type==="audio"?1:0),Ne(0),cg(s),Xn(n.type==="video"?n.info.width:0),Xn(n.type==="video"?n.info.height:0)])},Ww=n=>{let e=n.startTimestampOffset;if(J(e!==null),e>0){let t=Et(e,Mn),i=Et(Or(n),Mn),r=!yi(t)||!yi(i),s=r?li:se,o=r?ig:Si;return Be("edts",void 0,[ct("elst",r?1:0,0,[se(2),s(t),o(-1),Xn(1),s(i),o(0),Xn(1)])])}else{let t=Et(-e,n.timescale),i=Math.max(0,Et(Or(n),Mn)+Et(e,Mn)),r=!Wp(t)||!yi(i),s=r?li:se,o=r?ig:Si;return Be("edts",void 0,[ct("elst",r?1:0,0,[se(1),s(i),o(t),Xn(1)])])}},qw=(n,e)=>Be("mdia",void 0,[Xw(n,e),dd(!0,Yw[n.type],Zw[n.type]),$w(n)]),Xw=(n,e)=>{let t=Et(Or(n),n.timescale),i=!yi(e)||!yi(t),r=i?li:se;return ct("mdhd",+i,0,[r(e),r(e),se(n.timescale),r(t),Ne(yg(n.track.metadata.languageCode??Yp)),Ne(0)])},Yw={video:"vide",audio:"soun",subtitle:"text"},Zw={video:"MediabunnyVideoHandler",audio:"MediabunnySoundHandler",subtitle:"MediabunnyTextHandler"},dd=(n,e,t,i="\0\0\0\0")=>ct("hdlr",0,0,[n?At("mhlr"):se(0),At(e),At(i),se(0),se(0),At(t,!0)]),$w=n=>Be("minf",void 0,[Qw[n.type](),eA(),iA(n)]),jw=()=>ct("vmhd",0,1,[Ne(0),Ne(0),Ne(0),Ne(0)]),Jw=()=>ct("smhd",0,0,[Ne(0),Ne(0)]),Kw=()=>ct("nmhd",0,0),Qw={video:jw,audio:Jw,subtitle:Kw},eA=()=>Be("dinf",void 0,[tA()]),tA=()=>ct("dref",0,0,[se(1)],[nA()]),nA=()=>ct("url ",0,1),iA=n=>{let e=n.compositionTimeOffsetTable.length>1||n.compositionTimeOffsetTable.some(t=>t.sampleCompositionTimeOffset!==0);return Be("stbl",void 0,[rA(n),vA(n),e?EA(n):null,e?TA(n):null,AA(n),SA(n),MA(n),wA(n)])},rA=n=>{let e;if(n.type==="video")e=sA(VA(n.track.source._codec,n.info.decoderConfig.codec),n);else if(n.type==="audio"){let t=_g(n.track.source._codec,n.info.decoderConfig.codec,n.muxer.isQuickTime);J(t),e=hA(t,n)}else n.type==="subtitle"&&(e=xA(WA[n.track.source._codec],n));return J(e),ct("stsd",0,0,[se(1)],[e])},sA=(n,e)=>Be(n,[Array(6).fill(0),Ne(1),Ne(0),Ne(0),Array(12).fill(0),Ne(e.info.width),Ne(e.info.height),se(4718592),se(4718592),se(0),Ne(1),Dt(zl.length),At(zl),Array(31-zl.length).fill(0),Ne(e.info.hasAlphaChannel?32:24),ld(65535)],[HA[e.track.source._codec]?.(e)??null,oA(e),qp(e.info.decoderConfig.colorSpace)?null:aA(e),fd(e)]),fd=n=>n.avgBitrate===0&&n.maxBitrate===0?null:Be("btrt",[se(0),se(n.maxBitrate),se(n.avgBitrate)]),oA=n=>n.info.pixelAspectRatio.num===n.info.pixelAspectRatio.den?null:Be("pasp",[se(n.info.pixelAspectRatio.num),se(n.info.pixelAspectRatio.den)]),aA=n=>{let e=n.info.decoderConfig.colorSpace;return Be("colr",[At(n.muxer.isQuickTime?"nclc":"nclx"),Ne(e?.primaries!=null?Br[e.primaries]:2),Ne(e?.transfer!=null?Lr[e.transfer]:2),Ne(e?.matrix!=null?Fr[e.matrix]:2),n.muxer.isQuickTime?[]:Dt((e?.fullRange?1:0)<<7)])},cA=n=>n.info.decoderConfig&&Be("avcC",[...hn(n.info.decoderConfig.description)]),lA=n=>n.info.decoderConfig&&Be("hvcC",[...hn(n.info.decoderConfig.description)]),rg=n=>{if(!n.info.decoderConfig)return null;let e=n.info.decoderConfig,t=e.codec.split("."),i=Number(t[1]),r=Number(t[2]),s=Number(t[3]),o=t[4]?Number(t[4]):1,a=t[8]?Number(t[8]):Number(e.colorSpace?.fullRange??0),c=(s<<4)+(o<<1)+a,l=t[5]?Number(t[5]):e.colorSpace?.primaries?Br[e.colorSpace.primaries]:1,u=t[6]?Number(t[6]):e.colorSpace?.transfer?Lr[e.colorSpace.transfer]:1,f=t[7]?Number(t[7]):e.colorSpace?.matrix?Fr[e.colorSpace.matrix]:1;return ct("vpcC",1,0,[Dt(i),Dt(r),Dt(c),Dt(l),Dt(u),Dt(f),Ne(0)])},uA=n=>Be("av1C",Dm(n.info.decoderConfig.codec)),hA=(n,e)=>{let t=0,i,r=16,s=Wn.includes(e.track.source._codec);if(s){let o=e.track.source._codec,{sampleSize:a}=Oi(o);r=8*a,r>16&&(t=1)}if(e.muxer.isQuickTime&&(t=1),t===0)i=[Array(6).fill(0),Ne(1),Ne(t),Ne(0),se(0),Ne(e.info.numberOfChannels),Ne(r),Ne(0),Ne(0),Ne(e.info.sampleRate<2**16?e.info.sampleRate:0),Ne(0)];else{let o=s?0:-2;i=[Array(6).fill(0),Ne(1),Ne(t),Ne(0),se(0),Ne(e.info.numberOfChannels),Ne(Math.min(r,16)),ld(o),Ne(0),Ne(e.info.sampleRate<2**16?e.info.sampleRate:0),Ne(0),s?[se(1),se(r/8),se(e.info.numberOfChannels*r/8)]:[se(0),se(0),se(0)],se(2)]}return Be(n,i,[GA(e.track.source._codec,e.muxer.isQuickTime)?.(e)??null,fd(e)])},cd=n=>{let e;switch(n.track.source._codec){case"aac":e=64;break;case"mp3":e=107;break;case"vorbis":e=221;break;default:throw new Error(`Unhandled audio codec: ${n.track.source._codec}`)}let t=[...Dt(e),...Dt(21),...og(0),...se(n.maxBitrate),...se(n.avgBitrate)];if(n.info.decoderConfig.description){let i=hn(n.info.decoderConfig.description);t=[...t,...Dt(5),...ad(i.byteLength),...i]}return t=[...Ne(1),...Dt(0),...Dt(4),...ad(t.length),...t,...Dt(6),...Dt(1),...Dt(2)],t=[...Dt(3),...ad(t.length),...t],ct("esds",0,0,t)},mr=n=>Be("wave",void 0,[dA(n),fA(n),Be("\0\0\0\0")]),dA=n=>Be("frma",[At(_g(n.track.source._codec,n.info.decoderConfig.codec,n.muxer.isQuickTime))]),fA=n=>{let{littleEndian:e}=Oi(n.track.source._codec);return Be("enda",[Ne(+e)])},pA=n=>{let e=n.info.numberOfChannels,t=3840,i=n.info.sampleRate,r=0,s=0,o=new Uint8Array(0),a=n.info.decoderConfig?.description;if(a){J(a.byteLength>=18);let c=hn(a),l=Em(c);e=l.outputChannelCount,t=l.preSkip,i=l.inputSampleRate,r=l.outputGain,s=l.channelMappingFamily,l.channelMappingTable&&(o=l.channelMappingTable)}return Be("dOps",[Dt(0),Dt(e),Ne(t),se(i),ld(r),Dt(s),...o])},mA=n=>{let e=n.info.decoderConfig?.description;J(e);let t=hn(e);return ct("dfLa",0,0,[...t.subarray(4)])},wi=n=>{let{littleEndian:e,sampleSize:t}=Oi(n.track.source._codec),i=+e;return ct("pcmC",0,0,[Dt(i),Dt(8*t)])},gA=n=>{J(n.info.primingPacket);let e=Cm(n.info.primingPacket.data);if(!e)throw new Error("Couldn't extract AC-3 frame info from the audio packet. Ensure the packets contain valid AC-3 sync frames (as specified in ETSI TS 102 366).");let t=new Uint8Array(3),i=new Ft(t);return i.writeBits(2,e.fscod),i.writeBits(5,e.bsid),i.writeBits(3,e.bsmod),i.writeBits(3,e.acmod),i.writeBits(1,e.lfeon),i.writeBits(5,e.bitRateCode),i.writeBits(5,0),Be("dac3",[...t])},_A=n=>{J(n.info.primingPacket);let e=Rm(n.info.primingPacket.data);if(!e)throw new Error("Couldn't extract E-AC-3 frame info from the audio packet. Ensure the packets contain valid E-AC-3 sync frames (as specified in ETSI TS 102 366).");let t=16;for(let o of e.substreams)t+=23,o.numDepSub>0?t+=9:t+=1;let i=Math.ceil(t/8),r=new Uint8Array(i),s=new Ft(r);s.writeBits(13,e.dataRate),s.writeBits(3,e.substreams.length-1);for(let o of e.substreams)s.writeBits(2,o.fscod),s.writeBits(5,o.bsid),s.writeBits(1,0),s.writeBits(1,0),s.writeBits(3,o.bsmod),s.writeBits(3,o.acmod),s.writeBits(1,o.lfeon),s.writeBits(3,0),s.writeBits(4,o.numDepSub),o.numDepSub>0?s.writeBits(9,o.chanLoc):s.writeBits(1,0);return Be("dec3",[...r])},yA=n=>{J(n.info.primingPacket);let e=Im(n.info.primingPacket.data);if(!e)throw new Error("Couldn't extract DTS frame info from the audio packet. Ensure the packets contain valid DTS frames as specified in ETSI TS 102 114.");return Be("ddts",[...Pm(e)])},xA=(n,e)=>Be(n,[Array(6).fill(0),Ne(1)],[qA[e.track.source._codec](e),fd(e)]),bA=n=>Be("vttC",[...Hn.encode(n.info.config.description)]);var vA=n=>ct("stts",0,0,[se(n.timeToSampleTable.length),n.timeToSampleTable.map(e=>[se(e.sampleCount),se(e.sampleDelta)])]),wA=n=>{if(n.samples.every(t=>t.type==="key"))return null;let e=[...n.samples.entries()].filter(([,t])=>t.type==="key");return ct("stss",0,0,[se(e.length),e.map(([t])=>se(t+1))])},AA=n=>ct("stsc",0,0,[se(n.compactlyCodedChunkTable.length),n.compactlyCodedChunkTable.map(e=>[se(e.firstChunk),se(e.samplesPerChunk),se(1)])]),SA=n=>{if(n.type==="audio"&&n.info.requiresPcmTransformation){let{sampleSize:e}=Oi(n.track.source._codec);return ct("stsz",0,0,[se(e*n.info.numberOfChannels),se(n.samples.reduce((t,i)=>t+Et(i.duration,n.timescale),0))])}return ct("stsz",0,0,[se(0),se(n.samples.length),n.samples.map(e=>se(e.size))])},MA=n=>n.finalizedChunks.length>0&&xn(n.finalizedChunks).offset>=2**32?ct("co64",0,0,[se(n.finalizedChunks.length),n.finalizedChunks.map(e=>li(e.offset))]):ct("stco",0,0,[se(n.finalizedChunks.length),n.finalizedChunks.map(e=>se(e.offset))]),EA=n=>ct("ctts",1,0,[se(n.compositionTimeOffsetTable.length),n.compositionTimeOffsetTable.map(e=>[se(e.sampleCount),Si(e.sampleCompositionTimeOffset)])]),TA=n=>{let e=1/0,t=-1/0,i=1/0,r=-1/0;J(n.compositionTimeOffsetTable.length>0),J(n.samples.length>0);for(let o=0;o<n.compositionTimeOffsetTable.length;o++){let a=n.compositionTimeOffsetTable[o];e=Math.min(e,a.sampleCompositionTimeOffset),t=Math.max(t,a.sampleCompositionTimeOffset)}for(let o=0;o<n.samples.length;o++){let a=n.samples[o];i=Math.min(i,Et(a.timestamp,n.timescale)),r=Math.max(r,Et(a.timestamp+a.duration,n.timescale))}let s=Math.max(-e,0);return r>=2**31?null:ct("cslg",0,0,[Si(s),Si(e),Si(t),Si(i),Si(r)])},CA=n=>Be("mvex",void 0,n.map(RA)),RA=n=>ct("trex",0,0,[se(n.track.id),se(1),se(0),se(0),se(0)]),pd=(n,e)=>Be("moof",void 0,[IA(n),...e.map(PA)]),IA=n=>ct("mfhd",0,0,[se(n)]),hg=n=>{let e=0,t=0,i=0,r=0,s=n.type==="delta";return t|=+s,s?e|=1:e|=2,e<<24|t<<16|i<<8|r},PA=n=>Be("traf",void 0,[BA(n),LA(n),FA(n)]),BA=n=>{J(n.currentChunk);let e=0;e|=8,e|=16,e|=32,e|=131072;let t=n.currentChunk.samples[1]??n.currentChunk.samples[0],i={duration:t.timescaleUnitsToNextSample,size:t.size,flags:hg(t)};return ct("tfhd",0,e,[se(n.track.id),se(i.duration),se(i.size),se(i.flags)])},LA=n=>(J(n.currentChunk),ct("tfdt",1,0,[li(Et(n.currentChunk.startTimestamp,n.timescale))])),FA=n=>{J(n.currentChunk);let e=n.currentChunk.samples.map(y=>y.timescaleUnitsToNextSample),t=n.currentChunk.samples.map(y=>y.size),i=n.currentChunk.samples.map(hg),r=n.currentChunk.samples.map(y=>Et(y.timestamp-y.decodeTimestamp,n.timescale)),s=new Set(e),o=new Set(t),a=new Set(i),c=new Set(r),l=a.size===2&&i[0]!==i[1],u=s.size>1,f=o.size>1,h=!l&&a.size>1,d=c.size>1||[...c].some(y=>y!==0),m=0;return m|=1,m|=4*+l,m|=256*+u,m|=512*+f,m|=1024*+h,m|=2048*+d,ct("trun",1,m,[se(n.currentChunk.samples.length),se(n.currentChunk.offset-n.currentChunk.moofOffset||0),l?se(i[0]):[],n.currentChunk.samples.map((y,g)=>[u?se(e[g]):[],f?se(t[g]):[],h?se(i[g]):[],d?Si(r[g]):[]])])},dg=n=>Be("mfra",void 0,[...n.map(DA),UA()]),DA=n=>ct("tfra",1,0,[se(n.track.id),se(63),se(n.finalizedChunks.length),n.finalizedChunks.map(t=>[li(Et(t.samples[0].timestamp,n.timescale)),li(t.moofOffset),se(t.trafIndex+1),se(1),se(1)])]),UA=()=>ct("mfro",0,0,[se(0)]),fg=()=>Be("vtte"),pg=(n,e,t,i,r)=>Be("vttc",void 0,[r!==null?Be("vsid",[Si(r)]):null,t!==null?Be("iden",[...Hn.encode(t)]):null,e!==null?Be("ctim",[...Hn.encode(ng(e))]):null,i!==null?Be("sttg",[...Hn.encode(i)]):null,Be("payl",[...Hn.encode(n)])]),mg=n=>Be("vtta",[...Hn.encode(n)]),OA=n=>{let e=[],t=n.format._options.metadataFormat??"auto",i=n.output._metadataTags;if(t==="mdir"||t==="auto"&&!n.isQuickTime){let r=kA(i);r&&e.push(r)}else if(t==="mdta"){let r=zA(i);r&&e.push(r)}else(t==="udta"||t==="auto"&&n.isQuickTime)&&NA(e,n.output._metadataTags);return e.length===0?null:Be("udta",void 0,e)},NA=(n,e)=>{for(let{key:t,value:i}of Ul(e))switch(t){case"title":n.push(Ai("\xA9nam",i));break;case"description":n.push(Ai("\xA9des",i));break;case"artist":n.push(Ai("\xA9ART",i));break;case"album":n.push(Ai("\xA9alb",i));break;case"albumArtist":n.push(Ai("albr",i));break;case"genre":n.push(Ai("\xA9gen",i));break;case"date":n.push(Ai("\xA9day",i.toISOString().slice(0,10)));break;case"comment":n.push(Ai("\xA9cmt",i));break;case"lyrics":n.push(Ai("\xA9lyr",i));break;case"raw":break;case"discNumber":case"discsTotal":case"trackNumber":case"tracksTotal":case"beatsPerMinute":case"images":break;default:oi(t)}if(e.raw)for(let t in e.raw){let i=e.raw[t];i==null||t.length!==4||n.some(r=>r.type===t)||(typeof i=="string"?n.push(Ai(t,i)):i instanceof Uint8Array&&n.push(Be(t,Array.from(i))))}},Ai=(n,e)=>{let t=Hn.encode(e);return Be(n,[Ne(t.length),Ne(yg("und")),Array.from(t)])},sg={"image/jpeg":13,"image/png":14,"image/bmp":27},gg=(n,e)=>{let t=[];for(let{key:i,value:r}of Ul(n))switch(i){case"title":t.push({key:e?"title":"\xA9nam",value:ci(r)});break;case"description":t.push({key:e?"description":"\xA9des",value:ci(r)});break;case"artist":t.push({key:e?"artist":"\xA9ART",value:ci(r)});break;case"album":t.push({key:e?"album":"\xA9alb",value:ci(r)});break;case"albumArtist":t.push({key:e?"album_artist":"aART",value:ci(r)});break;case"comment":t.push({key:e?"comment":"\xA9cmt",value:ci(r)});break;case"genre":t.push({key:e?"genre":"\xA9gen",value:ci(r)});break;case"beatsPerMinute":e||t.push({key:"tmpo",value:Be("data",[se(21),se(0),Ne(r)])});break;case"lyrics":t.push({key:e?"lyrics":"\xA9lyr",value:ci(r)});break;case"date":t.push({key:e?"date":"\xA9day",value:ci(r.toISOString().slice(0,10))});break;case"images":for(let s of r)s.kind==="coverFront"&&t.push({key:"covr",value:Be("data",[se(sg[s.mimeType]??0),se(0),Array.from(s.data)])});break;case"trackNumber":if(e){let s=n.tracksTotal!==void 0?`${r}/${n.tracksTotal}`:r.toString();t.push({key:"track",value:ci(s)})}else t.push({key:"trkn",value:Be("data",[se(0),se(0),Ne(0),Ne(r),Ne(n.tracksTotal??0),Ne(0)])});break;case"discNumber":e||t.push({key:"disc",value:Be("data",[se(0),se(0),Ne(0),Ne(r),Ne(n.discsTotal??0),Ne(0)])});break;case"tracksTotal":case"discsTotal":break;case"raw":break;default:oi(i)}if(n.raw)for(let i in n.raw){let r=n.raw[i];r==null||!e&&i.length!==4||t.some(s=>s.key===i)||(typeof r=="string"?t.push({key:i,value:ci(r)}):r instanceof Uint8Array?t.push({key:i,value:Be("data",[se(0),se(0),Array.from(r)])}):r instanceof ia&&t.push({key:i,value:Be("data",[se(sg[r.mimeType]??0),se(0),Array.from(r.data)])}))}return t},kA=n=>{let e=gg(n,!1);return e.length===0?null:ct("meta",0,0,void 0,[dd(!1,"mdir","","appl"),Be("ilst",void 0,e.map(t=>Be(t.key,void 0,[t.value])))])},zA=n=>{let e=gg(n,!0);return e.length===0?null:Be("meta",void 0,[dd(!1,"mdta",""),ct("keys",0,0,[se(e.length)],e.map(t=>Be("mdta",[...Hn.encode(t.key)]))),Be("ilst",void 0,e.map((t,i)=>{let r=String.fromCharCode(...se(i+1));return Be(r,void 0,[t.value])}))])},ci=n=>Be("data",[se(1),se(0),...Hn.encode(n)]),VA=(n,e)=>{switch(n){case"avc":return e.startsWith("avc3")?"avc3":"avc1";case"hevc":return"hvc1";case"vp8":return"vp08";case"vp9":return"vp09";case"av1":return"av01";case"prores":return e}},HA={avc:cA,hevc:lA,vp8:rg,vp9:rg,av1:uA,prores:null},_g=(n,e,t)=>{switch(n){case"aac":return"mp4a";case"mp3":return"mp4a";case"opus":return"Opus";case"vorbis":return"mp4a";case"flac":return"fLaC";case"ulaw":return"ulaw";case"alaw":return"alaw";case"pcm-u8":return"raw ";case"pcm-s8":return"sowt";case"ac3":return"ac-3";case"eac3":return"ec-3";case"dts":return e}if(t)switch(n){case"pcm-s16":return"sowt";case"pcm-s16be":return"twos";case"pcm-s24":return"in24";case"pcm-s24be":return"in24";case"pcm-s32":return"in32";case"pcm-s32be":return"in32";case"pcm-f32":return"fl32";case"pcm-f32be":return"fl32";case"pcm-f64":return"fl64";case"pcm-f64be":return"fl64"}else switch(n){case"pcm-s16":return"ipcm";case"pcm-s16be":return"ipcm";case"pcm-s24":return"ipcm";case"pcm-s24be":return"ipcm";case"pcm-s32":return"ipcm";case"pcm-s32be":return"ipcm";case"pcm-f32":return"fpcm";case"pcm-f32be":return"fpcm";case"pcm-f64":return"fpcm";case"pcm-f64be":return"fpcm"}},GA=(n,e)=>{switch(n){case"aac":return cd;case"mp3":return cd;case"opus":return pA;case"vorbis":return cd;case"flac":return mA;case"ac3":return gA;case"eac3":return _A;case"dts":return yA}if(e)switch(n){case"pcm-s24":return mr;case"pcm-s24be":return mr;case"pcm-s32":return mr;case"pcm-s32be":return mr;case"pcm-f32":return mr;case"pcm-f32be":return mr;case"pcm-f64":return mr;case"pcm-f64be":return mr}else switch(n){case"pcm-s16":return wi;case"pcm-s16be":return wi;case"pcm-s24":return wi;case"pcm-s24be":return wi;case"pcm-s32":return wi;case"pcm-s32be":return wi;case"pcm-f32":return wi;case"pcm-f32be":return wi;case"pcm-f64":return wi;case"pcm-f64be":return wi}return null},WA={webvtt:"wvtt"},qA={webvtt:bA},yg=n=>{J(n.length===3);let e=0;for(let t=0;t<3;t++)e<<=5,e+=n.charCodeAt(t)-96;return e};var Nr=class{constructor(e,t){if(this.finalized=!1,this.started=!1,this.pos=0,this.trackedWrites=null,this.trackedStart=-1,this.trackedEnd=-1,e._writerAcquired)throw new Error("Can't have multiple Writers for the same Target.");this.target=e,e._setMonotonicity(t),e._writerAcquired=!0}start(){J(!this.started),this.target._start(),this.started=!0}write(e){J(this.started&&!this.finalized),this.maybeTrackWrites(e),this.target._write(e,this.pos),this.pos+=e.byteLength}seek(e){this.pos=e}getPos(){return this.pos}async flush(){return J(this.started&&!this.finalized),this.target._flush()}async finalize(){J(this.started&&!this.finalized),await this.target._finalize(),this.finalized=!0}maybeTrackWrites(e){if(!this.trackedWrites)return;let t=this.getPos();if(t<this.trackedStart){if(t+e.byteLength<=this.trackedStart)return;e=e.subarray(this.trackedStart-t),t=0}let i=t+e.byteLength-this.trackedStart,r=this.trackedWrites.byteLength;for(;r<i;)r*=2;if(r!==this.trackedWrites.byteLength){let s=new Uint8Array(r);s.set(this.trackedWrites,0),this.trackedWrites=s}this.trackedWrites.set(e,t-this.trackedStart),this.trackedEnd=Math.max(this.trackedEnd,t+e.byteLength)}startTrackingWrites(){this.trackedWrites=new Uint8Array(2**10),this.trackedStart=this.getPos(),this.trackedEnd=this.trackedStart}stopTrackingWrites(){if(!this.trackedWrites)throw new Error("Internal error: Can't get tracked writes since nothing was tracked.");let t={data:this.trackedWrites.subarray(0,this.trackedEnd-this.trackedStart),start:this.trackedStart,end:this.trackedEnd};return this.trackedWrites=null,t}};var Bn=class extends lr{constructor(){super(...arguments),this._writerAcquired=!1,this._monotonicity=null,this.onwrite=null}_setMonotonicity(e){this._monotonicity!==!1&&(this._monotonicity=e)}_dispatchWrite(e,t){this.onwrite?.(e,t),this._emit("write",{start:e,end:t})}slice(e){if(!Number.isInteger(e)||e<0)throw new TypeError("offset must be a non-negative integer.");return new Jl(this,e)}},md=2**16,gd=2**32,ki=class extends Bn{constructor(e={}){if(super(),this.buffer=null,this._maxPos=0,!e||typeof e!="object")throw new TypeError("BufferTarget options, when provided, must be an object.");if(e.onFinalize!==void 0&&typeof e.onFinalize!="function")throw new TypeError("options.onFinalize, when provided, must be a function.");if(this._options=e,this._supportsResize="resize"in new ArrayBuffer(0),this._supportsResize)try{this._buffer=new ArrayBuffer(md,{maxByteLength:gd})}catch{this._buffer=new ArrayBuffer(md),this._supportsResize=!1}else this._buffer=new ArrayBuffer(md);this._bytes=new Uint8Array(this._buffer)}_ensureSize(e){let t=this._buffer.byteLength;for(;t<e;)t*=2;if(t!==this._buffer.byteLength){if(t>gd)throw new Error(`ArrayBuffer exceeded maximum size of ${gd} bytes. Please consider using another target.`);if(this._supportsResize)this._buffer.resize(t);else{let i=new ArrayBuffer(t),r=new Uint8Array(i);r.set(this._bytes,0),this._buffer=i,this._bytes=r}}}_start(){}_write(e,t){this._ensureSize(t+e.byteLength),this._bytes.set(e,t),this._maxPos=Math.max(this._maxPos,t+e.byteLength),this._dispatchWrite(t,t+e.byteLength)}async _flush(){}async _finalize(){this.buffer=this._buffer.slice(0,this._maxPos),this._options.onFinalize&&await this._options.onFinalize(this.buffer),this._emit("finalized")}async _close(){}_getSlice(e,t){return this._bytes.slice(e,t)}},x1=2**24;var Jl=class extends Bn{constructor(e,t){super(),this._baseTarget=e,this._offset=t}_start(){}_write(e,t){this._baseTarget._write(e,this._offset+t),this._dispatchWrite(t,t+e.byteLength)}_flush(){return this._baseTarget._flush()}async _finalize(){this._emit("finalized")}async _close(){}_setMonotonicity(e){super._setMonotonicity(e),this._baseTarget._setMonotonicity(e)}},kr=class{constructor(e,t){if(this.rootPath=e,this.getTarget=t,typeof e!="string")throw new TypeError("rootPath must be a string.");if(typeof t!="function")throw new TypeError("getTarget must be a function.")}};var Mn=57600,XA=2082844800,xg=n=>{let e={},t=n.track;return t.metadata.name!==void 0&&(e.name=t.metadata.name),e},Et=(n,e,t=!0)=>{let i=n*e;return t?Math.round(i):i},Or=n=>{if(n.samples.length===0)return 0;let e=1/0,t=-1/0;for(let i=0;i<n.samples.length;i++){let r=n.samples[i];r.timestamp<e&&(e=r.timestamp),r.timestamp+r.duration>t&&(t=r.timestamp+r.duration)}return e===1/0?0:t-e},Kl=class extends jl{constructor(e,t){super(e),this.writer=null,this.boxWriter=null,this.initWriter=null,this.initBoxWriter=null,this.auxTarget=new ki,this.auxWriter=new Nr(this.auxTarget,!1),this.auxBoxWriter=new Ur(this.auxWriter),this.mdat=null,this.ftypSize=null,this.trackDatas=[],this.allTracksKnown=Fl(),this.creationTime=Math.floor(Date.now()/1e3)+XA,this.finalizedChunks=[],this.wroteFragmentedHeader=!1,this.nextFragmentNumber=1,this.maxWrittenTimestamp=-1/0,this.minWrittenTimestamp=1/0,this.maxWrittenEndTimestamp=-1/0,this.segmentHeaderSize=null,this.format=t,this.formatOptions={...t._options},this.isQuickTime=t instanceof Xs,this.isCmaf=t instanceof qs,this.minimumFragmentDuration=this.formatOptions.minimumFragmentDuration??(t instanceof qs?1/0:1),this.auxWriter.start()}async start(){let e=await this.mutex.acquire();if(this.isCmaf?(this.fastStart="fragmented",this.isFragmented=!0):(this.writer=await this.output._getRootWriter(i=>this.formatOptions.fastStart!==void 0?this.formatOptions.fastStart==="fragmented":i instanceof ki),this.boxWriter=new Ur(this.writer),this.fastStart=this.formatOptions.fastStart??(this.writer.target instanceof ki?"in-memory":!1),this.isFragmented=this.fastStart==="fragmented"),this.isCmaf){if(!this.output._hasInitTarget())throw new Error("CMAF outputs require the initTarget field in OutputOptions to be set; the init segment will be written to it.");let i=await this.output._getInitTarget(),r=new Nr(i,!0);r.start(),this.initWriter=r,this.initBoxWriter=new Ur(r)}let t=this.output.tracks.some(i=>i.isVideoTrack()&&i.source._codec==="avc");{let i=this.initBoxWriter??this.boxWriter;if(J(i),this.formatOptions.onFtyp&&i.writer.startTrackingWrites(),i.writeBox(lg({isQuickTime:this.isQuickTime,holdsAvc:t,fragmented:this.isFragmented,cmaf:this.isCmaf})),this.formatOptions.onFtyp){let{data:r,start:s}=i.writer.stopTrackingWrites();this.formatOptions.onFtyp(r,s)}this.ftypSize=i.writer.getPos(),this.isCmaf&&await this.initWriter.flush()}if(this.fastStart!=="in-memory")if(this.fastStart==="reserve"){for(let i of this.output.tracks)if(i.metadata.maximumPacketCount===void 0)throw new Error("All tracks must specify maximumPacketCount in their metadata when using fastStart: 'reserve'.")}else this.isFragmented||(J(this.writer),J(this.boxWriter),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=ua(!0),this.boxWriter.writeBox(this.mdat));await this.writer?.flush();for(let i of this.output.tracks)i.isVideoTrack()&&i.metadata.decoderConfig?this.getVideoTrackData(i,i.metadata.primingPacket??null,{decoderConfig:i.metadata.decoderConfig}):i.isAudioTrack()&&i.metadata.decoderConfig&&this.getAudioTrackData(i,i.metadata.primingPacket??null,{decoderConfig:i.metadata.decoderConfig});e()}allTracksAreKnown(){for(let e of this.output.tracks)if(!e.source._closed&&!this.trackDatas.some(t=>t.track===e))return!1;return!0}async getMimeType(){await this.allTracksKnown.promise;let e=this.trackDatas.map(t=>t.type==="video"||t.type==="audio"?t.info.decoderConfig.codec:{webvtt:"wvtt"}[t.track.source._codec]);return zm({isQuickTime:this.isQuickTime,hasVideo:this.trackDatas.some(t=>t.type==="video"),hasAudio:this.trackDatas.some(t=>t.type==="audio"),codecStrings:e})}getVideoTrackData(e,t,i){let r=this.trackDatas.find(d=>d.track===e);if(r)return r;Wl(i,e.source._codec),J(i),J(i.decoderConfig);let s={...i.decoderConfig};J(s.codedWidth!==void 0),J(s.codedHeight!==void 0);let o=!1;if(e.source._codec==="avc"&&!s.description){if(!t)throw new Error("No AVC description provided; you must therefore provide a priming packet.");let d=vm(t.data);if(!d)throw new Error("Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.");s.description=wm(d),o=!0}else if(e.source._codec==="hevc"&&!s.description){if(!t)throw new Error("No HEVC description provided; you must therefore provide a priming packet.");let d=Sm(t.data);if(!d)throw new Error("Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.");s.description=Mm(d),o=!0}let a=jp(1/(e.metadata.frameRate??Mn),1e6).den,c=s.displayAspectWidth,l=s.displayAspectHeight,u=c===void 0||l===void 0?{num:1,den:1}:Ol({num:c*s.codedHeight,den:l*s.codedWidth}),f=s.codec==="ap4h"||s.codec==="ap4x",h={muxer:this,track:e,type:"video",info:{width:s.codedWidth,height:s.codedHeight,pixelAspectRatio:u,decoderConfig:s,requiresAnnexBTransformation:o,hasAlphaChannel:f},timescale:a,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,avgBitrate:e.source._nominalBitrate??e.metadata.averageBitrate??0,maxBitrate:e.source._nominalBitrate??e.metadata.bitrate??0};return this.trackDatas.push(h),this.trackDatas.sort((d,m)=>d.track.id-m.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),h}getAudioTrackData(e,t,i){let r=this.trackDatas.find(c=>c.track===e);if(r)return r;ql(i,e.source._codec),J(i),J(i.decoderConfig);let s={...i.decoderConfig},o=!1;if(e.source._codec==="aac"&&!s.description){if(!t)throw new Error("No AAC description provided; you must therefore provide a priming packet.");let c=Jh(la.tempFromBytes(t.data));if(!c)throw new Error("Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.");let l=qh[c.samplingFrequencyIndex],u=Xh[c.channelConfiguration];if(l===void 0||u===void 0)throw new Error("Invalid ADTS frame header.");s.description=lm({objectType:c.objectType,outputSampleRate:l,outputNumberOfChannels:u}),o=!0}if(!t){if(e.source._codec==="ac3"||e.source._codec==="eac3")throw new Error("AC-3/E-AC-3 require a priming packet.");if(e.source._codec==="dts")throw new Error("DTS requires a priming packet.")}let a={muxer:this,track:e,type:"audio",info:{numberOfChannels:i.decoderConfig.numberOfChannels,sampleRate:i.decoderConfig.sampleRate,decoderConfig:s,requiresPcmTransformation:!this.isFragmented&&Wn.includes(e.source._codec),expectedNextPcmPacketTimestamp:null,requiresAdtsStripping:o,primingPacket:t},timescale:s.sampleRate,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,avgBitrate:e.source._nominalBitrate??e.metadata.averageBitrate??0,maxBitrate:e.source._nominalBitrate??e.metadata.bitrate??0};return this.trackDatas.push(a),this.trackDatas.sort((c,l)=>c.track.id-l.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),a}getSubtitleTrackData(e,t){let i=this.trackDatas.find(s=>s.track===e);if(i)return i;Nm(t),J(t),J(t.config);let r={muxer:this,track:e,type:"subtitle",info:{config:t.config},timescale:1e3,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,avgBitrate:e.source._nominalBitrate??e.metadata.averageBitrate??0,maxBitrate:e.source._nominalBitrate??e.metadata.bitrate??0,lastCueEndTimestamp:null,cueQueue:[],nextSourceId:0,cueToSourceId:new WeakMap};return this.trackDatas.push(r),this.trackDatas.sort((s,o)=>s.track.id-o.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),r}async addEncodedVideoPacket(e,t,i){let r=await this.mutex.acquire();try{let s=this.getVideoTrackData(e,t,i),o=t.data;if(s.info.requiresAnnexBTransformation){let c=[...Gs(o)].map(l=>o.subarray(l.offset,l.offset+l.length));if(c.length===0)throw new Error("Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.");o=bm(c,4)}this.validateTimestamp(s.track,t.timestamp,t.type==="key");let a=this.createSampleForTrack(s,o,t.timestamp,t.duration,t.type);await this.registerSample(s,a)}finally{r()}}async addEncodedAudioPacket(e,t,i){let r=await this.mutex.acquire();try{let s=this.getAudioTrackData(e,t,i),o=t.data;if(s.info.requiresAdtsStripping){let u=Jh(la.tempFromBytes(o));if(!u)throw new Error("Expected ADTS frame, didn't get one.");let f=u.crcCheck===null?Vm:Hm;o=o.subarray(f)}this.validateTimestamp(s.track,t.timestamp,t.type==="key");let a=t.timestamp,c=t.duration;if(s.info.requiresPcmTransformation){let f=Oi(s.info.decoderConfig.codec).sampleSize*s.info.numberOfChannels;if(c=o.byteLength/f/s.info.sampleRate,s.info.expectedNextPcmPacketTimestamp!==null){let h=a-s.info.expectedNextPcmPacketTimestamp;if(h<.01)a=s.info.expectedNextPcmPacketTimestamp;else{let d=await this.padWithSilence(s,s.info.expectedNextPcmPacketTimestamp,h);a=s.info.expectedNextPcmPacketTimestamp+d}}s.info.expectedNextPcmPacketTimestamp=a+c}let l=this.createSampleForTrack(s,o,a,c,t.type);await this.registerSample(s,l)}finally{r()}}async padWithSilence(e,t,i){let r=Et(i,e.timescale);if(i=r/e.timescale,r>0){let{sampleSize:s,silentValue:o}=Oi(e.info.decoderConfig.codec),a=r*e.info.numberOfChannels,c=new Uint8Array(s*a).fill(o),l=this.createSampleForTrack(e,new Uint8Array(c.buffer),t,i,"key");await this.registerSample(e,l)}return i}async addSubtitleCue(e,t,i){let r=await this.mutex.acquire();try{let s=this.getSubtitleTrackData(e,i);this.validateTimestamp(s.track,t.timestamp,!0),e.source._codec==="webvtt"&&(s.cueQueue.push(t),await this.processWebVTTCues(s,t.timestamp))}finally{r()}}async processWebVTTCues(e,t){for(;e.cueQueue.length>0;){e.lastCueEndTimestamp??=Math.min(0,e.cueQueue[0].timestamp);let i=new Set([]);for(let l of e.cueQueue)J(l.timestamp<=t),J(e.lastCueEndTimestamp<=l.timestamp+l.duration),i.add(Math.max(l.timestamp,e.lastCueEndTimestamp)),i.add(l.timestamp+l.duration);let r=[...i].sort((l,u)=>l-u),s=r[0],o=r[1]??s;if(t<o)break;if(e.lastCueEndTimestamp<s){this.auxWriter.seek(0);let l=fg();this.auxBoxWriter.writeBox(l);let u=this.auxTarget._getSlice(0,this.auxWriter.getPos()),f=this.createSampleForTrack(e,u,e.lastCueEndTimestamp,s-e.lastCueEndTimestamp,"key");await this.registerSample(e,f),e.lastCueEndTimestamp=s}this.auxWriter.seek(0);for(let l=0;l<e.cueQueue.length;l++){let u=e.cueQueue[l];if(u.timestamp>=o)break;sd.lastIndex=0;let f=sd.test(u.text),h=u.timestamp+u.duration,d=e.cueToSourceId.get(u);if(d===void 0&&o<h&&(d=e.nextSourceId++,e.cueToSourceId.set(u,d)),u.notes){let y=mg(u.notes);this.auxBoxWriter.writeBox(y)}let m=pg(u.text,f?s:null,u.identifier??null,u.settings??null,d??null);this.auxBoxWriter.writeBox(m),h===o&&e.cueQueue.splice(l--,1)}let a=this.auxTarget._getSlice(0,this.auxWriter.getPos()),c=this.createSampleForTrack(e,a,s,o-s,"key");await this.registerSample(e,c),e.lastCueEndTimestamp=o}}createSampleForTrack(e,t,i,r,s){return{timestamp:i,decodeTimestamp:i,duration:r,data:t,size:t.byteLength,type:s,timescaleUnitsToNextSample:Et(r,e.timescale)}}processTimestamps(e,t){if(e.timestampProcessingQueue.length===0)return;if(e.type==="audio"&&e.info.requiresPcmTransformation){J(!this.isFragmented),e.startTimestampOffset??=e.timestampProcessingQueue[0].timestamp;let r=0;for(let s=0;s<e.timestampProcessingQueue.length;s++){let o=e.timestampProcessingQueue[s],a=Et(o.duration,e.timescale);r+=a}if(e.timeToSampleTable.length===0)e.timeToSampleTable.push({sampleCount:r,sampleDelta:1});else{let s=xn(e.timeToSampleTable);s.sampleCount+=r}e.timestampProcessingQueue.length=0;return}let i=e.timestampProcessingQueue.map(r=>r.timestamp).sort((r,s)=>r-s);this.isFragmented?e.startTimestampOffset??=Math.min(i[0],0):e.startTimestampOffset??=i[0];for(let r=0;r<e.timestampProcessingQueue.length;r++){let s=e.timestampProcessingQueue[r];s.decodeTimestamp=i[r];let o=Et(s.timestamp-s.decodeTimestamp,e.timescale),a=Et(s.duration,e.timescale);if(e.lastTimescaleUnits!==null){J(e.lastSample);let c=Et(s.decodeTimestamp,e.timescale,!1),l=Math.round(c-e.lastTimescaleUnits);if(J(l>=0),e.lastTimescaleUnits+=l,e.lastSample.timescaleUnitsToNextSample=l,!this.isFragmented){let u=xn(e.timeToSampleTable);if(J(u),u.sampleCount===1){u.sampleDelta=l;let h=e.timeToSampleTable[e.timeToSampleTable.length-2];h&&h.sampleDelta===l&&(h.sampleCount++,e.timeToSampleTable.pop(),u=h)}else u.sampleDelta!==l&&(u.sampleCount--,e.timeToSampleTable.push(u={sampleCount:1,sampleDelta:l}));u.sampleDelta===a?u.sampleCount++:e.timeToSampleTable.push({sampleCount:1,sampleDelta:a});let f=xn(e.compositionTimeOffsetTable);J(f),f.sampleCompositionTimeOffset===o?f.sampleCount++:e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:o})}}else e.lastTimescaleUnits=Et(s.decodeTimestamp,e.timescale,!1),this.isFragmented||(e.timeToSampleTable.push({sampleCount:1,sampleDelta:a}),e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:o}));e.lastSample=s}if(e.timestampProcessingQueue.length=0,J(e.lastSample),J(e.lastTimescaleUnits!==null),t!==void 0&&e.lastSample.timescaleUnitsToNextSample===0){J(t.type==="key");let r=Et(t.timestamp,e.timescale,!1),s=Math.round(r-e.lastTimescaleUnits);e.lastSample.timescaleUnitsToNextSample=s}}async registerSample(e,t){t.type==="key"&&this.processTimestamps(e,t),e.timestampProcessingQueue.push(t),this.isFragmented?(e.sampleQueue.push(t),await this.interleaveSamples()):this.fastStart==="reserve"?await this.registerSampleFastStartReserve(e,t):await this.addSampleToTrack(e,t)}async addSampleToTrack(e,t){if(!this.isFragmented&&(e.samples.push(t),this.fastStart==="reserve")){let r=e.track.metadata.maximumPacketCount;if(J(r!==void 0),e.samples.length>r)throw new Error(`Track #${e.track.id} has already reached the maximum packet count (${r}). Either add less packets or increase the maximum packet count.`)}let i=!1;if(!e.currentChunk)i=!0;else{e.currentChunk.startTimestamp=Math.min(e.currentChunk.startTimestamp,t.timestamp);let r=t.timestamp-e.currentChunk.startTimestamp;if(this.isFragmented){let s=this.trackDatas.every(o=>{if(e===o)return t.type==="key";let a=o.sampleQueue[0];return a?a.type==="key":o.closed});r>=this.minimumFragmentDuration&&s&&t.timestamp>this.maxWrittenTimestamp&&(i=!0,await this.finalizeFragment())}else i=r>=.5}i&&(e.currentChunk&&await this.finalizeCurrentChunk(e),e.currentChunk={startTimestamp:t.timestamp,samples:[],offset:null,moofOffset:null,trafIndex:null}),J(e.currentChunk),e.currentChunk.samples.push(t),this.isFragmented&&(this.maxWrittenTimestamp=Math.max(this.maxWrittenTimestamp,t.timestamp),this.maxWrittenEndTimestamp=Math.max(this.maxWrittenEndTimestamp,t.timestamp+t.duration),this.minWrittenTimestamp=Math.min(this.minWrittenTimestamp,t.timestamp))}async finalizeCurrentChunk(e){if(J(!this.isFragmented),J(this.writer),!e.currentChunk)return;e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk);let t=e.currentChunk.samples.length;if(e.type==="audio"&&e.info.requiresPcmTransformation&&(t=e.currentChunk.samples.reduce((i,r)=>i+Et(r.duration,e.timescale),0)),(e.compactlyCodedChunkTable.length===0||xn(e.compactlyCodedChunkTable).samplesPerChunk!==t)&&e.compactlyCodedChunkTable.push({firstChunk:e.finalizedChunks.length,samplesPerChunk:t}),this.fastStart==="in-memory"){e.currentChunk.offset=0;return}e.currentChunk.offset=this.writer.getPos();for(let i of e.currentChunk.samples)J(i.data),this.writer.write(i.data),i.data=null;await this.writer.flush()}async interleaveSamples(e=!1){if(J(this.isFragmented),!(!e&&!this.allTracksAreKnown()))e:for(;;){let t=null,i=1/0;for(let s of this.trackDatas){if(!e&&s.sampleQueue.length===0&&!s.closed)break e;s.sampleQueue.length>0&&s.sampleQueue[0].timestamp<i&&(t=s,i=s.sampleQueue[0].timestamp)}if(!t)break;let r=t.sampleQueue.shift();await this.addSampleToTrack(t,r)}}async finalizeFragment(e=!this.isCmaf){if(J(this.isFragmented),!this.wroteFragmentedHeader){this.wroteFragmentedHeader=!0;let d=this.initBoxWriter??this.boxWriter;J(d),this.formatOptions.onMoov&&d.writer.startTrackingWrites(),this.ensureOneEnabledTrack();let m=Ws(this);if(d.writeBox(m),this.formatOptions.onMoov){let{data:y,start:g}=d.writer.stopTrackingWrites();this.formatOptions.onMoov(y,g)}if(this.isCmaf){J(this.initWriter),await this.initWriter.flush(),await this.initWriter.finalize(),this.writer=await this.output._getRootWriter(!0),this.boxWriter=new Ur(this.writer);let y=this.boxWriter.measureBox(ud()),g=this.boxWriter.measureBox(hd(this,0));this.segmentHeaderSize=y+g,this.writer.seek(this.segmentHeaderSize)}}J(this.writer),J(this.boxWriter);let t=this.trackDatas.filter(d=>d.currentChunk);if(t.length===0){e&&await this.writer.flush();return}let i=this.nextFragmentNumber++,r=pd(i,t),s=this.writer.getPos(),o=s+this.boxWriter.measureBox(r),a=o+Xl,c=1/0;for(let d=0;d<t.length;d++){let m=t[d];J(m.currentChunk),J(m.startTimestampOffset!==null),m.currentChunk.offset=a,m.currentChunk.moofOffset=s,m.currentChunk.trafIndex=d,m.currentChunk.startTimestamp-=m.startTimestampOffset;for(let y of m.currentChunk.samples)a+=y.size,y.timestamp-=m.startTimestampOffset,y.decodeTimestamp-=m.startTimestampOffset;c=Math.min(c,m.currentChunk.startTimestamp)}let l=a-o,u=l>=2**32;if(u)for(let d of t)d.currentChunk.offset+=jh-Xl;this.formatOptions.onMoof&&this.writer.startTrackingWrites();let f=pd(i,t);if(this.boxWriter.writeBox(f),this.formatOptions.onMoof){let{data:d,start:m}=this.writer.stopTrackingWrites();this.formatOptions.onMoof(d,m,c)}J(this.writer.getPos()===o),this.formatOptions.onMdat&&this.writer.startTrackingWrites();let h=ua(u);h.size=l,this.boxWriter.writeBox(h),this.writer.seek(o+(u?jh:Xl));for(let d of t)for(let m of d.currentChunk.samples)this.writer.write(m.data),m.data=null;if(this.formatOptions.onMdat){let{data:d,start:m}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(d,m)}for(let d of t)d.finalizedChunks.push(d.currentChunk),this.finalizedChunks.push(d.currentChunk),d.currentChunk=null;e&&await this.writer.flush()}async registerSampleFastStartReserve(e,t){this.allTracksAreKnown()?(this.mdat||await this.createFastStartReserveMdat(),await this.addSampleToTrack(e,t)):e.sampleQueue.push(t)}async createFastStartReserveMdat(){J(this.writer),J(this.boxWriter),this.ensureOneEnabledTrack();let e=Ws(this),i=this.boxWriter.measureBox(e)+this.computeSampleTableSizeUpperBound()+4096;J(this.ftypSize!==null),this.writer.seek(this.ftypSize+i),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=ua(!0),this.boxWriter.writeBox(this.mdat);for(let r of this.trackDatas){for(let s of r.sampleQueue)await this.addSampleToTrack(r,s);r.sampleQueue.length=0}}computeSampleTableSizeUpperBound(){J(this.fastStart==="reserve");let e=0;for(let t of this.trackDatas){let i=t.track.metadata.maximumPacketCount;J(i!==void 0),e+=8*Math.ceil(2/3*i),e+=4*i,e+=8*Math.ceil(2/3*i),e+=12*Math.ceil(2/3*i),e+=4*i,e+=8*i}return e}async onTrackClose(e){let t=await this.mutex.acquire(),i=this.trackDatas.find(r=>r.track===e);i&&(i.closed=!0,i.type==="subtitle"&&e.source._codec==="webvtt"&&await this.processWebVTTCues(i,1/0),this.processTimestamps(i)),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),this.isFragmented&&await this.interleaveSamples(),t()}ensureOneEnabledTrack(){for(let e of["video","audio","subtitle"]){let t=this.trackDatas.filter(r=>r.type===e);if(t.length===0)continue;if(!t.some(r=>r.track.metadata.disposition?.default!==!1)){let r=t[0];r.track.metadata.disposition={...r.track.metadata.disposition,default:!0}}}}async forceFragmentFinalization(){J(this.isFragmented);let e=await this.mutex.acquire();try{for(let t of this.trackDatas)t.type==="subtitle"&&t.track.source._codec==="webvtt"&&await this.processWebVTTCues(t,1/0),this.processTimestamps(t);await this.interleaveSamples(!0),await this.finalizeFragment()}finally{e()}}async finalize(){let e=await this.mutex.acquire();this.allTracksKnown.resolve(),this.ensureOneEnabledTrack(),!this.mdat&&this.fastStart==="reserve"&&await this.createFastStartReserveMdat();for(let t of this.trackDatas)t.closed=!0,t.type==="subtitle"&&t.track.source._codec==="webvtt"&&await this.processWebVTTCues(t,1/0),this.processTimestamps(t);if(this.isFragmented)await this.interleaveSamples(!0),await this.finalizeFragment(!1);else for(let t of this.trackDatas){await this.finalizeCurrentChunk(t);let i=Or(t);if(i>0){let a=0;for(let c of t.samples)a+=c.size;t.avgBitrate=Math.round(8*a/i)}else t.avgBitrate=0;let r=0,s=0,o=0;for(let a=0;a<t.samples.length;a++){let c=t.samples[a];for(s+=c.size;c.decodeTimestamp-t.samples[r].decodeTimestamp>=1;)s-=t.samples[r].size,r++;o=Math.max(o,s)}if(t.maxBitrate=8*o,t.startTimestampOffset!==null)for(let a=0;a<t.samples.length;a++){let c=t.samples[a];c.timestamp-=t.startTimestampOffset,c.decodeTimestamp-=t.startTimestampOffset}}if(J(this.writer),J(this.boxWriter),this.fastStart==="in-memory"){this.mdat=ua(!1);let t;for(let r=0;r<2;r++){let s=Ws(this),o=this.boxWriter.measureBox(s);t=this.boxWriter.measureBox(this.mdat);let a=this.writer.getPos()+o+t;for(let c of this.finalizedChunks){c.offset=a;for(let{data:l}of c.samples)J(l),a+=l.byteLength,t+=l.byteLength}if(a<2**32)break;t>=2**32&&(this.mdat.largeSize=!0)}this.formatOptions.onMoov&&this.writer.startTrackingWrites();let i=Ws(this);if(this.boxWriter.writeBox(i),this.formatOptions.onMoov){let{data:r,start:s}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(r,s)}this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat.size=t,this.boxWriter.writeBox(this.mdat);for(let r of this.finalizedChunks)for(let s of r.samples)J(s.data),this.writer.write(s.data),s.data=null;if(this.formatOptions.onMdat){let{data:r,start:s}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(r,s)}}else if(this.isFragmented)if(this.isCmaf){let t=this.segmentHeaderSize!==null?this.writer.getPos()-this.segmentHeaderSize:0;this.writer.seek(0),this.boxWriter.writeBox(ud()),this.boxWriter.writeBox(hd(this,t))}else{let t=this.writer.getPos(),i=dg(this.trackDatas);this.boxWriter.writeBox(i);let r=this.writer.getPos()-t;this.writer.seek(this.writer.getPos()-4),this.boxWriter.writeU32(r)}else{J(this.mdat);let t=this.boxWriter.offsets.get(this.mdat);J(t!==void 0);let i=this.writer.getPos()-t;if(this.mdat.size=i,this.mdat.largeSize=i>=2**32,this.boxWriter.patchBox(this.mdat),this.formatOptions.onMdat){let{data:s,start:o}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(s,o)}let r=Ws(this);if(this.fastStart==="reserve"){J(this.ftypSize!==null),this.writer.seek(this.ftypSize),this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(r);let s=this.boxWriter.offsets.get(this.mdat)-this.writer.getPos();this.boxWriter.writeBox(ug(s))}else this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(r);if(this.formatOptions.onMoov){let{data:s,start:o}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(s,o)}}e()}};var YA=function(n,e,t){if(e!=null){if(typeof e!="object"&&typeof e!="function")throw new TypeError("Object expected.");var i,r;if(t){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");i=e[Symbol.asyncDispose]}if(i===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");i=e[Symbol.dispose],t&&(r=i)}if(typeof i!="function")throw new TypeError("Object not disposable.");r&&(i=function(){try{r.call(this)}catch(s){return Promise.reject(s)}}),n.stack.push({value:e,dispose:i,async:t})}else t&&n.stack.push({async:!0});return e},ZA=function(n){return function(e){function t(o){e.error=e.hasError?new n(o,e.error,"An error was suppressed during disposal."):o,e.hasError=!0}var i,r=0;function s(){for(;i=e.stack.pop();)try{if(!i.async&&r===1)return r=0,e.stack.push(i),Promise.resolve().then(s);if(i.dispose){var o=i.dispose.call(i.value);if(i.async)return r|=2,Promise.resolve(o).then(s,function(a){return t(a),s()})}else r|=1}catch(a){t(a)}if(r===1)return e.hasError?Promise.reject(e.error):Promise.resolve();if(e.hasError)throw e.error}return s()}}(typeof SuppressedError=="function"?SuppressedError:function(n,e,t){var i=new Error(t);return i.name="SuppressedError",i.error=n,i.suppressed=e,i}),Ys=class{constructor(){this._connectedTrack=null,this._closingPromise=null,this._closed=!1,this._nominalBitrate=null}_ensureValidAdd(){if(!this._connectedTrack)throw new Error("Source is not connected to an output track.");if(this._connectedTrack.output.state==="canceled")throw new Error("Output has been canceled.");if(this._connectedTrack.output.state==="finalizing"||this._connectedTrack.output.state==="finalized")throw new Error("Output has been finalized.");if(this._connectedTrack.output.state==="pending")throw new Error("Output has not started.");if(this._closed)throw new Error("Source is closed.")}async _start(){}async _flushAndClose(e){}close(){if(this._closingPromise)return;let e=this._connectedTrack;if(!e)throw new Error("Cannot call close without connecting the source to an output track.");if(e.output.state==="pending")throw new Error("Cannot call close before output has been started.");this._closingPromise=(async()=>{await this._flushAndClose(!1),this._closed=!0,!(e.output.state==="finalizing"||e.output.state==="finalized")&&e.output._muxer.onTrackClose(e)})()}async _flushOrWaitForOngoingClose(e){return this._closingPromise??=(async()=>{await this._flushAndClose(e),this._closed=!0})()}},Zs=class extends Ys{constructor(e){if(super(),!qn.includes(e))throw new TypeError(`Invalid video codec '${e}'. Must be one of: ${qn.join(", ")}.`);this._codec=e}},bg=(n,e)=>{if(n.metadata.hasOnlyKeyPackets&&e.type!=="key")throw new Error("Cannot add non-key packets to a hasOnlyKeyPackets video track.")};var yd=class{setError(e){this.errorSet||(this.error=e,this.errorSet=!0)}constructor(e,t){this.source=e,this.encodingConfig=t,this.ensureEncoderPromise=null,this.encoderInitialized=!1,this.encoder=null,this.encoderConfig=null,this.encodersReclaimed=!1,this.muxer=null,this.lastMultipleOfKeyFrameInterval=-1,this.emittedEncoderPackets=0,this.codedWidth=null,this.codedHeight=null,this.outputWidth=null,this.outputHeight=null,this.frameRateLastSample=null,this.frameRateLastTimestamp=null,this.frameRateLastEndTimestamp=null,this.preciseTimings=[],this.customEncoder=null,this.customEncoderCallSerializer=new Ll,this.customEncoderQueueSize=0,this.defaultEncodeOptions={},this.alphaEncoder=null,this.splitter=null,this.splitterCreationFailed=!1,this.alphaFrameQueue=[],this.error=null,this.errorSet=!1,this.lastMuxerPromise=Promise.resolve(),this.closed=!1}async add(e,t,i){let r=e;try{this.checkForEncoderError(),this.source._ensureValidAdd();let s=this.encodingConfig,o=s.sizeChangeBehavior??"deny",a=!1;if(this.codedWidth!==null&&this.codedHeight!==null){if((e.codedWidth!==this.codedWidth||e.codedHeight!==this.codedHeight)&&(a=!0,o==="deny"))throw new Error(`Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${e.codedWidth}x${e.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'deny' in the encoding options.`)}else this.codedWidth=e.codedWidth,this.codedHeight=e.codedHeight;if(s.transform?.width!==void 0||s.transform?.height!==void 0||s.transform?.rotate!==void 0||s.transform?.flip!==void 0||s.transform?.crop!==void 0||s.transform?.force===!0||a&&o!=="passThrough"){let f=s.transform?.width,h=s.transform?.height,d=s.transform?.fit??"fill";a&&o!=="passThrough"&&(J(this.outputWidth),J(this.outputHeight),J(o!=="deny"),f=this.outputWidth,h=this.outputHeight,d=o);let m=await e.transform({width:f,height:h,roundDimensionsTo:2,crop:s.transform?.crop,rotate:s.transform?.rotate,flip:s.transform?.flip,fit:d,alpha:s.alpha});(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=m.displayWidth,this.outputHeight=m.displayHeight),t&&e.close(),e=m,t=!0}else(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=e.codedWidth,this.outputHeight=e.codedHeight);let u=s.transform?.frameRate;if(u!==void 0){let f=e.timestamp+e.duration,h=Hh(e.timestamp,u);if(this.frameRateLastSample!==null)if(h<=this.frameRateLastTimestamp){this.frameRateLastSample.close(),this.frameRateLastSample=e.clone(),this.frameRateLastEndTimestamp=f;return}else await this.padFrameRate(h,i);e===r&&(e=e.clone(),t=!0),e.setTimestamp(h),e.setDuration(1/u),this.frameRateLastSample?.close(),this.frameRateLastSample=e.clone(),this.frameRateLastTimestamp=h,this.frameRateLastEndTimestamp=f}await this.processAndEncode(e,i)}finally{t&&e.close()}}async processAndEncode(e,t){let i=this.encodingConfig,r;if(i.transform?.process){let s=i.transform.process(e);if(ai(s)&&(s=await s),s===null)return;Array.isArray(s)||(s=[s]);let o=[];try{for(let a of s)a instanceof pr?o.push(a):typeof VideoFrame<"u"&&a instanceof VideoFrame?o.push(new pr(a)):o.push(new pr(a,{timestamp:e.timestamp,duration:e.duration}))}catch(a){for(let c of o)c!==e&&c.close();for(let c of s)(c instanceof pr&&c!==e||typeof VideoFrame<"u"&&c instanceof VideoFrame)&&c.close();throw a}r=o}else r=[e];try{for(let s of r){if(this.encoderInitialized||(this.ensureEncoderPromise||this.ensureEncoder(s),this.encoderInitialized||await this.ensureEncoderPromise),J(this.encoderInitialized),this.closed)break;this.encodersReclaimed&&this.recreateWebCodecsEncoders();let o=this.encodingConfig.keyFrameInterval??2,a=Math.floor(s.timestamp/o),c={...this.defaultEncodeOptions,...s.encodeOptions,...t},l={...c,keyFrame:c.keyFrame!==void 0?c.keyFrame:o===0||a!==this.lastMultipleOfKeyFrameInterval};if(this.lastMultipleOfKeyFrameInterval=a,this.encodingConfig.onEncodedSample?.(s),this.customEncoder){this.customEncoderQueueSize++;let u=s.clone(),f=this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(u,l)).catch(h=>this.setError(h)).finally(()=>{this.customEncoderQueueSize--,u.close()});this.customEncoderQueueSize>=4&&await f}else{J(this.encoder);let u=s.toVideoFrame(),f=Nh(this.preciseTimings,u.timestamp,d=>d.microsecondTimestamp),h=f!==-1?this.preciseTimings[f]:null;if(h&&h.microsecondTimestamp===u.timestamp?(h.timestamp!==s.timestamp&&(h.timestampIsValid=!1),h.duration!==s.duration&&(h.durationIsValid=!1)):(this.preciseTimings.splice(f+1,0,{microsecondTimestamp:u.timestamp,timestamp:s.timestamp,duration:s.duration,timestampIsValid:!0,durationIsValid:!0}),this.preciseTimings.length>128&&this.preciseTimings.shift()),this.alphaEncoder)if(!!u.format&&!u.format.includes("A")||this.splitterCreationFailed){this.alphaFrameQueue.push(null);try{this.encoder.encode(u,l)}finally{u.close()}}else{this.splitter||(this.splitter=new xd);let{colorFrame:m,alphaFrame:y}=await this.splitter.split(u);this.alphaFrameQueue.push(y);try{this.encoder.encode(m,l)}finally{m.close()}}else try{this.encoder.encode(u,l)}finally{u.close()}this.encoder.encodeQueueSize>=4&&await new Promise(d=>this.encoder.addEventListener("dequeue",d,{once:!0}))}await this.lastMuxerPromise}}finally{for(let s of r)s!==e&&s.close()}}async padFrameRate(e,t){let i=this.encodingConfig.transform.frameRate;J(this.frameRateLastSample);let r=Math.round((e-this.frameRateLastTimestamp)*i);for(let s=1;s<r;s++){let o={stack:[],error:void 0,hasError:!1};try{let a=YA(o,this.frameRateLastSample.clone(),!1);a.setTimestamp(this.frameRateLastTimestamp+s/i),a.setDuration(1/i),await this.processAndEncode(a,t)}catch(a){o.error=a,o.hasError=!0}finally{ZA(o)}}}ensureEncoder(e){this.ensureEncoderPromise=(async()=>{let t=rd(this.encodingConfig.quality,this.encodingConfig.bitrate);J(t!==void 0);let i=td({...this.encodingConfig,quality:t,width:e.codedWidth,height:e.codedHeight,squarePixelWidth:e.squarePixelWidth,squarePixelHeight:e.squarePixelHeight,framerate:this.source._connectedTrack?.metadata.frameRate}),r=null,s;for(let a of i){let c=a.config;if(this.encodingConfig.onEncoderConfig?.(c),s=$l.find(u=>u.supports(this.encodingConfig.codec,c)),s){r=a;break}if(typeof VideoEncoder>"u")continue;if(c.alpha="discard",this.encodingConfig.alpha==="keep"&&(c.latencyMode="quality"),(c.width%2===1||c.height%2===1)&&(this.encodingConfig.codec==="avc"||this.encodingConfig.codec==="hevc"))throw new Error(`The dimensions ${c.width}x${c.height} are not supported for codec '${this.encodingConfig.codec}'; both width and height must be even numbers. Make sure to round your dimensions to the nearest even number.`);try{if((await VideoEncoder.isConfigSupported(c)).supported){r=a;break}}catch{}}if(!r){if(typeof VideoEncoder>"u")throw new Error(Kp("VideoEncoder"));let a=i[0].config,c=i.map(({config:l,quantizer:u})=>u!==null?`quantizer ${u}`:`${l.bitrate} bps`);throw new Error(`This specific encoder configuration (${a.codec}, ${c.join(" / ")}, ${a.width}x${a.height}, hardware acceleration: ${a.hardwareAcceleration??"no-preference"}) is not supported in this environment. Consider using another codec or changing your video parameters.`)}let o=r.config;r.quantizer!==null?this.defaultEncodeOptions=nd(this.encodingConfig.codec,r.quantizer):this.source._nominalBitrate=o.bitrate??null,s?(this.customEncoder=new s,this.customEncoder.codec=this.encodingConfig.codec,this.customEncoder.config=o,this.customEncoder.onPacket=(a,c)=>{if(!(a instanceof fr))throw new TypeError("The first argument passed to onPacket must be an EncodedPacket.");if(c!==void 0&&(!c||typeof c!="object"))throw new TypeError("The second argument passed to onPacket must be an object or undefined.");bg(this.source._connectedTrack,a),this.encodingConfig.onEncodedPacket?.(a,c),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,a,c).catch(l=>{this.setError(l)})},this.customEncoder.onError=a=>{this.setError(a)},await this.customEncoder.init()):(this.encoderConfig=o,this.createWebCodecsEncoders()),J(this.source._connectedTrack),this.muxer=this.source._connectedTrack.output._muxer,this.encoderInitialized=!0})()}createWebCodecsEncoders(){let e=this.encoderConfig;J(e);let t=[],i=[],r=0,s=0,o=(c,l)=>{if(Qp(c)){this.encodersReclaimed=!0;return}c.stack=l,this.setError(c)},a=new Error("Encoding error").stack;if(this.encoder=new VideoEncoder({output:(c,l)=>{if(!this.alphaEncoder){this.addPacket(c,null,l);return}let u=this.alphaFrameQueue.shift();J(u!==void 0),u?(this.alphaEncoder.encode(u,{...this.defaultEncodeOptions,keyFrame:c.type==="key"}),s++,u.close(),t.push({chunk:c,meta:l})):s===0?this.addPacket(c,null,l):(i.push(r+s),t.push({chunk:c,meta:l}))},error:c=>o(c,a)}),this.encoder.configure(e),this.encodingConfig.alpha==="keep"){let c=new Error("Encoding error").stack;this.alphaEncoder=new VideoEncoder({output:(l,u)=>{s--;let f=t.shift();for(J(f!==void 0),this.addPacket(f.chunk,l,f.meta),r++;i.length>0&&i[0]===r;){i.shift();let h=t.shift();J(h!==void 0),this.addPacket(h.chunk,null,h.meta)}},error:l=>o(l,c)}),this.alphaEncoder.configure(e)}}addPacket(e,t,i){let r={};if(t){let l=new Uint8Array(t.byteLength);t.copyTo(l),r.alpha=l}let s=fr.fromEncodedChunk(e,r),o=Nh(this.preciseTimings,e.timestamp,l=>l.microsecondTimestamp),a=o!==-1?this.preciseTimings[o]:null,c=null;this.emittedEncoderPackets===0&&s.type==="delta"&&i?.decoderConfig&&(c=Tm(this.encodingConfig.codec,i.decoderConfig,s.data)),(a&&a.microsecondTimestamp===e.timestamp||c!==null)&&(s=s.clone({timestamp:a?.timestampIsValid?a.timestamp:void 0,duration:a?.durationIsValid?a.duration:void 0,type:c??void 0})),bg(this.source._connectedTrack,s),this.encodingConfig.onEncodedPacket?.(s,i),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,s,i).catch(l=>{this.setError(l)}),this.emittedEncoderPackets++}recreateWebCodecsEncoders(){J(this.encoder),this.encoder.state!=="closed"&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!=="closed"&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(e=>e?.close()),this.alphaFrameQueue.length=0,this.encodersReclaimed=!1,this.lastMultipleOfKeyFrameInterval=-1,this.createWebCodecsEncoders()}async flushAndClose(e){try{if(!e&&(this.checkForEncoderError(),this.frameRateLastSample)){let t=this.encodingConfig.transform.frameRate,i=Hh(this.frameRateLastEndTimestamp,t);await this.padFrameRate(i)}this.closed=!0,e||(this.customEncoder?this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()):this.encoder&&!this.encodersReclaimed&&(await this.encoder.flush(),await this.alphaEncoder?.flush(),await im(25)))}finally{this.closed=!0,this.frameRateLastSample?.close(),this.frameRateLastSample=null,this.customEncoder?await this.customEncoderCallSerializer.call(()=>this.customEncoder.close()).catch(t=>this.setError(t)):this.encoder&&(this.encoder.state!=="closed"&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!=="closed"&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(t=>t?.close()),this.alphaFrameQueue.length=0,this.splitter?.close())}e||this.checkForEncoderError()}getQueueSize(){return this.customEncoder?this.customEncoderQueueSize:this.encoder?.encodeQueueSize??0}checkForEncoderError(){if(this.errorSet)throw this.error}},_d=null,xd=class{constructor(){this.worker=null,this.pendingRequests=new Map,this.nextRequestId=0}split(e){if(!this.worker){if(!_d){let r=new Blob([`(${$A.toString()})()`],{type:"application/javascript"});_d=URL.createObjectURL(r)}this.worker=new Worker(_d),this.worker.addEventListener("message",r=>{let s=r.data,o=this.pendingRequests.get(s.id);o&&(this.pendingRequests.delete(s.id),"error"in s?o.reject(new Error(s.error)):o.resolve({colorFrame:s.colorFrame,alphaFrame:s.alphaFrame}))}),this.worker.addEventListener("error",r=>{let s=new Error(r.message||"Color/alpha splitter worker error.");for(let o of this.pendingRequests.values())o.reject(s);this.pendingRequests.clear()})}let t=this.nextRequestId++,i=Fl();return this.pendingRequests.set(t,i),this.worker.postMessage({id:t,sourceFrame:e},{transfer:[e]}),i.promise}close(){this.worker?.terminate(),this.worker=null;let e=new Error("Color/alpha splitter closed.");for(let t of this.pendingRequests.values())t.reject(e);this.pendingRequests.clear()}},$A=()=>{let n=null,e=Promise.resolve();self.addEventListener("message",s=>{let{id:o,sourceFrame:a}=s.data;e=e.then(async()=>{try{let{colorFrame:c,alphaFrame:l}=await t(a);self.postMessage({id:o,colorFrame:c,alphaFrame:l},{transfer:[c,l]})}catch(c){self.postMessage({id:o,error:c.message})}finally{a.close()}})});let t=async s=>{let o=s.format;if(!o)throw new Error("CPU color/alpha splitting requires a known VideoFrame format.");let a=s.allocationSize();if((!n||n.byteLength!==a)&&(n=new Uint8Array(a)),await s.copyTo(n),o==="RGBA"||o==="BGRA")return i(n,o,s);if(o==="I420A"||o==="I420AP10"||o==="I420AP12"||o==="I422A"||o==="I422AP10"||o==="I422AP12"||o==="I444A"||o==="I444AP10"||o==="I444AP12")return r(n,o,s);throw new Error(`CPU color/alpha splitting does not support format '${o}'.`)},i=(s,o,a)=>{let c=a.visibleRect?.width??a.codedWidth,l=a.visibleRect?.height??a.codedHeight,u=c*l,f=Math.ceil(c/2),h=Math.ceil(l/2),d=u+f*h*2,m=new Uint8Array(d);for(let w=0,C=3;w<u;w++,C+=4)m[w]=s[C];m.fill(128,u);let y=new VideoFrame(s,{format:o==="RGBA"?"RGBX":"BGRX",codedWidth:c,codedHeight:l,timestamp:a.timestamp,duration:a.duration??void 0}),g={format:"I420",codedWidth:c,codedHeight:l,timestamp:a.timestamp,duration:a.duration??void 0,colorSpace:{fullRange:!0,matrix:"bt709",primaries:"bt709",transfer:"bt709"},transfer:[m.buffer]},p=new VideoFrame(m,g);return{colorFrame:y,alphaFrame:p}},r=(s,o,a)=>{let c=a.visibleRect?.width??a.codedWidth,l=a.visibleRect?.height??a.codedHeight,u=o.includes("P10"),f=o.includes("P12"),h=u||f?2:1,d,m;o.startsWith("I420")?(d=Math.ceil(c/2),m=Math.ceil(l/2)):o.startsWith("I422")?(d=Math.ceil(c/2),m=l):(d=c,m=l);let y=c*l,g=d*m,p=y*h,w=g*h,C=y*h,v=p+w*2,A=o.replace("A",""),S=Math.ceil(c/2),T=Math.ceil(l/2),x=S*T,M=x*h,I=C+2*M,D=new Uint8Array(I),O=v;D.set(s.subarray(O,O+C),0);let k=C,B=u?512:f?2048:128;h===1?D.fill(B,k):new Uint16Array(D.buffer,k,2*x).fill(B);let P=u?"I420P10":f?"I420P12":"I420",W=new VideoFrame(s.subarray(0,v),{format:A,codedWidth:c,codedHeight:l,timestamp:a.timestamp,duration:a.duration??void 0}),Y={format:P,codedWidth:c,codedHeight:l,timestamp:a.timestamp,duration:a.duration??void 0,colorSpace:{fullRange:!0,matrix:"bt709",primaries:"bt709",transfer:"bt709"},transfer:[D.buffer]},te=new VideoFrame(D,Y);return{colorFrame:W,alphaFrame:te}}};var ha=class extends Zs{constructor(e,t){if(!(typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement)&&!(typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas))throw new TypeError("canvas must be an HTMLCanvasElement or OffscreenCanvas.");eg(t),super(t.codec),this._encoder=new yd(this,t),this._canvas=e}add(e,t=0,i){if(!Number.isFinite(e))throw new TypeError("timestamp must be a finite number.");if(!Number.isFinite(t)||t<0)throw new TypeError("duration must be a non-negative number.");let r=new pr(this._canvas,{timestamp:e,duration:t});return this._encoder.add(r,!0,i)}_flushAndClose(e){return this._encoder.flushAndClose(e)}};var da=class extends Ys{constructor(e){if(super(),!Dr.includes(e))throw new TypeError(`Invalid audio codec '${e}'. Must be one of: ${Dr.join(", ")}.`);this._codec=e}};var fa=class extends Ys{constructor(e){if(super(),!dr.includes(e))throw new TypeError(`Invalid subtitle codec '${e}'. Must be one of: ${dr.join(", ")}.`);this._codec=e}};var $s=class{get supportsVideoRotationMetadata(){return this.supportsVideoTransformationMetadata}getSupportedVideoCodecs(){return this.getSupportedCodecs().filter(e=>qn.includes(e))}getSupportedAudioCodecs(){return this.getSupportedCodecs().filter(e=>Dr.includes(e))}getSupportedSubtitleCodecs(){return this.getSupportedCodecs().filter(e=>dr.includes(e))}_codecUnsupportedHint(e){return""}_isFragmentedIsobmff(){return!1}},js=class extends $s{constructor(e={}){if(!e||typeof e!="object")throw new TypeError("options must be an object.");if(e.fastStart!==void 0&&![!1,"in-memory","reserve","fragmented"].includes(e.fastStart))throw new TypeError("options.fastStart, when provided, must be false, 'in-memory', 'reserve', or 'fragmented'.");if(e.minimumFragmentDuration!==void 0&&(!tm(e.minimumFragmentDuration)||e.minimumFragmentDuration<0))throw new TypeError("options.minimumFragmentDuration, when provided, must be a non-negative number.");if(e.onFtyp!==void 0&&typeof e.onFtyp!="function")throw new TypeError("options.onFtyp, when provided, must be a function.");if(e.onMoov!==void 0&&typeof e.onMoov!="function")throw new TypeError("options.onMoov, when provided, must be a function.");if(e.onMdat!==void 0&&typeof e.onMdat!="function")throw new TypeError("options.onMdat, when provided, must be a function.");if(e.onMoof!==void 0&&typeof e.onMoof!="function")throw new TypeError("options.onMoof, when provided, must be a function.");if(e.metadataFormat!==void 0&&!["mdir","mdta","udta","auto"].includes(e.metadataFormat))throw new TypeError("options.metadataFormat, when provided, must be either 'auto', 'mdir', 'mdta', or 'udta'.");super(),this._options=e}getSupportedTrackCounts(){return{video:{min:0,max:4294967295},audio:{min:0,max:4294967295},subtitle:{min:0,max:4294967295},total:{min:0,max:4294967295}}}get supportsVideoTransformationMetadata(){return!0}get supportsTimestampedMediaData(){return!0}get negativeTimestampSupport(){return"full"}_createMuxer(e){return new Kl(e,this)}_isFragmentedIsobmff(){return this._options.fastStart==="fragmented"}},Js=class extends js{constructor(e){super(e)}get _name(){return"MP4"}get fileExtension(){return".mp4"}get mimeType(){return"video/mp4"}getSupportedCodecs(){return[...qn,...Hl,"pcm-s16","pcm-s16be","pcm-s24","pcm-s24be","pcm-s32","pcm-s32be","pcm-f32","pcm-f32be","pcm-f64","pcm-f64be",...dr]}_codecUnsupportedHint(e){return new Xs().getSupportedCodecs().includes(e)?" Switching to MOV will grant support for this codec.":""}},qs=class extends js{constructor(e){super(e)}get _name(){return"CMAF"}get fileExtension(){return".m4s"}get mimeType(){return"video/mp4"}getSupportedCodecs(){return[...qn,...Hl,"pcm-s16","pcm-s16be","pcm-s24","pcm-s24be","pcm-s32","pcm-s32be","pcm-f32","pcm-f32be","pcm-f64","pcm-f64be",...dr]}},Xs=class extends js{constructor(e){super(e)}get _name(){return"MOV"}get fileExtension(){return".mov"}get mimeType(){return"video/quicktime"}getSupportedCodecs(){return[...qn,...Dr]}_codecUnsupportedHint(e){return new Js().getSupportedCodecs().includes(e)?" Switching to MP4 will grant support for this codec.":""}};var vg=["video","audio","subtitle"],Ks=class n{constructor(e,t,i,r,s){this.id=e,this.output=t,this.type=i,this.source=r,this.metadata=s}isVideoTrack(){return this.type==="video"}isAudioTrack(){return this.type==="audio"}isSubtitleTrack(){return this.type==="subtitle"}canBePairedWith(e){if(!(e instanceof n))throw new TypeError("other must be an OutputTrack.");if(this===e)return!1;let t=kl(this.metadata.group),i=kl(e.metadata.group);for(let r of t)if(this.type!==e.type&&i.some(a=>r===a)||i.some(a=>r._pairedGroups.has(a)))return!0;return!1}},Ql=class extends Ks{constructor(e,t,i,r){super(e,t,"video",i,r)}},eu=class extends Ks{constructor(e,t,i,r){super(e,t,"audio",i,r)}},tu=class extends Ks{constructor(e,t,i,r){super(e,t,"subtitle",i,r)}},Qs=class n{constructor(){this._pairedGroups=new Set}pairWith(e){if(!(e instanceof n))throw new TypeError("other must be an OutputTrackGroup.");if(this===e)throw new TypeError("Cannot pair a group with itself.");this._pairedGroups.add(e),e._pairedGroups.add(this)}},bd=n=>{if(!n||typeof n!="object")throw new TypeError("metadata must be an object.");if(n.languageCode!==void 0&&!$p(n.languageCode))throw new TypeError("metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.");if(n.name!==void 0&&typeof n.name!="string")throw new TypeError("metadata.name, when provided, must be a string.");if(n.disposition!==void 0&&om(n.disposition),n.maximumPacketCount!==void 0&&(!Number.isInteger(n.maximumPacketCount)||n.maximumPacketCount<0))throw new TypeError("metadata.maximumPacketCount, when provided, must be a non-negative integer.");if(n.bitrate!==void 0&&(!Number.isFinite(n.bitrate)||n.bitrate<0))throw new TypeError("metadata.bitrate, when provided, must be a non-negative number.");if(n.averageBitrate!==void 0&&(!Number.isFinite(n.averageBitrate)||n.averageBitrate<0))throw new TypeError("metadata.averageBitrate, when provided, must be a non-negative number.");if(n.group!==void 0&&!(n.group instanceof Qs)&&(!Array.isArray(n.group)||n.group.some(e=>!(e instanceof Qs))))throw new TypeError("metadata.group, when provided, must be an OutputTrackGroup instance or an array of OutputTrackGroup instances.")},pa=class extends lr{get target(){let e="Output.target cannot be used when using PathedTarget with an async callback. Use the 'target' event instead.";if(this._rootTargetPromise)throw new TypeError(e);let t=this._getRootTarget();if(ai(t))throw new TypeError(e);return t}constructor(e){if(super(),this.state="pending",this.defaultTrackGroup=new Qs,this.tracks=[],this._onFinalize=null,this._unfinalizedTargets=new Set,this._rootWriterPromise=null,this._startPromise=null,this._cancelPromise=null,this._finalizePromise=null,this._mutex=new Vs,this._metadataTags={},this._rootTarget=null,this._rootTargetPromise=null,this._firstMediaStreamTimestamp=null,!e||typeof e!="object")throw new TypeError("options must be an object.");if(!(e.format instanceof $s))throw new TypeError("options.format must be an OutputFormat.");if(!(e.target instanceof Bn||e.target instanceof kr))throw new TypeError("options.target must be a Target or a PathedTarget.");if(e.target instanceof Bn&&this._rememberTarget(e.target),e.initTarget!==void 0&&!(e.initTarget instanceof Bn)&&typeof e.initTarget!="function")throw new Error("options.initTarget, when provided, must be a Target or a function that returns or resolves to a Target.");if(e.onFinalize!==void 0&&typeof e.onFinalize!="function")throw new TypeError("options.onFinalize, when provided, must be a function.");this.format=e.format,this._target=e.target,this._onFinalize=e.onFinalize??null,this._initTarget=e.initTarget??null,this._initTarget instanceof Bn&&this._rememberTarget(this._initTarget),this._muxer=e.format._createMuxer(this)}_getTargetValidated(e){J(this._target instanceof kr);let t=this._target.getTarget(e),i=r=>{if(!(r instanceof Bn))throw new TypeError("getTarget must return a Target.");return r};return ai(t)?t.then(i):i(t)}async _getTarget(e){J(this._target instanceof kr);let t=await this._getTargetValidated(e);return this._emit("target",{target:t,request:e,isRoot:e.isRoot}),this.state==="canceled"?await t._close():this._rememberTarget(t),t}_rememberTarget(e){this._unfinalizedTargets.add(e),e.on("finalized",()=>this._unfinalizedTargets.delete(e),{once:!0})}async _getInitTarget(){if(J(this._initTarget!==null),this._initTarget instanceof Bn)return this._initTarget;let e=await this._initTarget();return this.state==="canceled"?await e._close():this._rememberTarget(e),e}_hasInitTarget(){return this._initTarget!==null}_getRootTarget(){if(this._rootTarget)return this._rootTarget;if(this._rootTargetPromise)return this._rootTargetPromise;if(this._target instanceof Bn)return this._emit("target",{target:this._target,request:null,isRoot:!0}),this._rootTarget=this._target,this._target;let e={path:this._target.rootPath,isRoot:!0,mimeType:this.format.mimeType},t=this._getTargetValidated(e),i=r=>(this.state==="canceled"?r._close():this._rememberTarget(r),this._emit("target",{target:r,request:e,isRoot:!0}),this._rootTarget=r,r);return ai(t)?this._rootTargetPromise=t.then(i):i(t)}_getRootWriter(e){return this._rootWriterPromise??=(async()=>{let t=await this._getRootTarget(),i=new Nr(t,typeof e=="boolean"?e:e(t));return i.start(),i})()}addVideoTrack(e,t={}){if(!(e instanceof Zs))throw new TypeError("source must be a VideoSource.");if(bd(t),t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError(`Invalid video rotation: ${t.rotation}. Has to be 0, 90, 180 or 270.`);if(t.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("metadata.flip, when provided, must be a boolean.");if(t.transformationMatrix!==void 0&&(!Array.isArray(t.transformationMatrix)||t.transformationMatrix.length!==9||!t.transformationMatrix.every(r=>Number.isFinite(r))))throw new TypeError("metadata.transformationMatrix, when provided, must be an array of 9 finite numbers.");if(t.frameRate!==void 0&&(!Number.isFinite(t.frameRate)||t.frameRate<=0))throw new TypeError(`Invalid video frame rate: ${t.frameRate}. Must be a positive number.`);if(t.hasOnlyKeyPackets!==void 0&&typeof t.hasOnlyKeyPackets!="boolean")throw new TypeError("metadata.hasOnlyKeyPackets, when provided, must be a boolean.");if(t.canBeTransparent!==void 0&&typeof t.canBeTransparent!="boolean")throw new TypeError("metadata.canBeTransparent, when provided, must be a boolean.");if(t.decoderConfig!==void 0&&Wl({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof fr))throw new TypeError("metadata.primingPacket, when provided, must be an EncodedPacket.");if(t.decoderConfig===void 0)throw new TypeError("metadata.primingPacket can only be provided alongside metadata.decoderConfig.")}let i={...t};return i.group??=this.defaultTrackGroup,this._addTrack(new Ql(this.tracks.length+1,this,e,i))}addAudioTrack(e,t={}){if(!(e instanceof da))throw new TypeError("source must be an AudioSource.");if(bd(t),t.decoderConfig!==void 0&&ql({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof fr))throw new TypeError("metadata.primingPacket, when provided, must be an EncodedPacket.");if(t.decoderConfig===void 0)throw new TypeError("metadata.primingPacket can only be provided alongside metadata.decoderConfig.")}let i={...t};return i.group??=this.defaultTrackGroup,this._addTrack(new eu(this.tracks.length+1,this,e,i))}addSubtitleTrack(e,t={}){if(!(e instanceof fa))throw new TypeError("source must be a SubtitleSource.");bd(t);let i={...t};return i.group??=this.defaultTrackGroup,this._addTrack(new tu(this.tracks.length+1,this,e,i))}setMetadataTags(e){if(sm(e),this.state!=="pending")throw new Error("Cannot set metadata tags after output has been started or canceled.");this._metadataTags=e}_addTrack(e){if(this.state!=="pending")throw new Error("Cannot add track after output has been started or canceled.");if(e.source._connectedTrack)throw new Error("Source is already used for a track.");let t=this.format.getSupportedTrackCounts(),i=this.tracks.reduce((o,a)=>o+(a.type===e.type?1:0),0),r=t[e.type].max;if(i===r)throw new Error(r===0?`${this.format._name} does not support ${e.type} tracks.`:`${this.format._name} does not support more than ${r} ${e.type} track${r===1?"":"s"}.`);let s=t.total.max;if(this.tracks.length===s)throw new Error(`${this.format._name} does not support more than ${s} tracks${s===1?"":"s"} in total.`);if(e.isVideoTrack()){let o=this.format.getSupportedVideoCodecs();if(o.length===0)throw new Error(`${this.format._name} does not support video tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!o.includes(e.source._codec))throw new Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${o.map(a=>`'${a}'`).join(", ")}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isAudioTrack()){let o=this.format.getSupportedAudioCodecs();if(o.length===0)throw new Error(`${this.format._name} does not support audio tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!o.includes(e.source._codec))throw new Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${o.map(a=>`'${a}'`).join(", ")}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isSubtitleTrack()){let o=this.format.getSupportedSubtitleCodecs();if(o.length===0)throw new Error(`${this.format._name} does not support subtitle tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!o.includes(e.source._codec))throw new Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${o.map(a=>`'${a}'`).join(", ")}.`+this.format._codecUnsupportedHint(e.source._codec))}return this.tracks.push(e),e.source._connectedTrack=e,e}hasEnoughTracks(){let e=this.format.getSupportedTrackCounts();for(let i of vg){let r=this.tracks.reduce((o,a)=>o+(a.type===i?1:0),0),s=e[i].min;if(r<s)return!1}let t=e.total.min;return!(this.tracks.length<t)}async start(){let e=this.format.getSupportedTrackCounts();for(let i of vg){let r=this.tracks.reduce((o,a)=>o+(a.type===i?1:0),0),s=e[i].min;if(r<s)throw new Error(s===e[i].max?`${this.format._name} requires exactly ${s} ${i} track${s===1?"":"s"}.`:`${this.format._name} requires at least ${s} ${i} track${s===1?"":"s"}.`)}let t=e.total.min;if(this.tracks.length<t)throw new Error(t===e.total.max?`${this.format._name} requires exactly ${t} track${t===1?"":"s"}.`:`${this.format._name} requires at least ${t} track${t===1?"":"s"}.`);if(this.state==="canceled")throw new Error("Output has been canceled.");return this._startPromise?(nn._warn("Output has already been started."),this._startPromise):this._startPromise=(async()=>{this.state="started";let i=this._mutex.acquire();try{await this._muxer.start();let r=this.tracks.map(s=>s.source._start());await Promise.all(r)}finally{(await i)()}})()}getMimeType(){return this._muxer.getMimeType()}async cancel(){if(this.state==="canceled")return this._cancelPromise??void 0;if(this.state==="finalizing"||this.state==="finalized"){this.state==="finalized"&&nn._warn("Output has already been finalized.");return}return this._cancelPromise=(async()=>{this.state="canceled";let e=await this._mutex.acquire();try{let t=this.tracks.map(i=>i.source._flushOrWaitForOngoingClose(!0));await Promise.all(t),await Promise.all([...this._unfinalizedTargets].map(i=>i._close())),this._unfinalizedTargets.clear()}finally{e()}})()}async finalize(){if(this.state==="pending")throw new Error("Cannot finalize before starting.");if(this.state==="canceled")throw new Error("Cannot finalize after canceling.");return this._finalizePromise?(nn._warn("Output has already been finalized."),this._finalizePromise):this._finalizePromise=(async()=>{this.state="finalizing";let e=await this._mutex.acquire();try{let t=this.tracks.map(i=>i.source._flushOrWaitForOngoingClose(!1));if(await Promise.all(t),await this._muxer.finalize(),this._rootWriterPromise){let i=await this._rootWriterPromise;i.finalized||(await i.flush(),await i.finalize())}this._onFinalize&&await this._onFinalize(),this.state="finalized"}catch(t){throw this.state="canceled",t}finally{await Promise.all([...this._unfinalizedTargets].map(t=>t._close().catch(()=>{}))),this._unfinalizedTargets.clear(),e()}})()}};var wg=Symbol.for("mediabunny loaded");globalThis[wg]&&nn._error(`[WARNING]
Mediabunny was loaded twice. This will likely cause Mediabunny not to work correctly. Check if multiple dependencies are importing different versions of Mediabunny, or if something is being bundled incorrectly.`);globalThis[wg]=!0;async function Ag(n,e,t,i,r){let s=Wr(n),o=t==="9:16"?720:1280,a=t==="9:16"?1280:720;if(!await id("avc",{width:o,height:a,bitrate:5e6}))throw new Error("\u6D4F\u89C8\u5668\u4E0D\u652F\u6301H.264\u7F16\u7801\uFF0C\u8BF7\u5728\u65B0\u7248Edge\u6216Chrome\u4E2D\u5BFC\u51FA");let c=Pl(void 0,!0);c.resize(o,a),c.setView(e.preset,s,0),c.applyView(e,!0);let l=new pa({format:new Js,target:new ki}),u=new ha(c.renderer.domElement,{codec:"avc",bitrate:5e6});l.addVideoTrack(u,{frameRate:24});try{await l.start();let f=Math.round(s.duration*24);for(let h=0;h<f;h++){if(r.aborted)throw new Error("\u5DF2\u53D6\u6D88\u5BFC\u51FA");c.update(s,h/24),await u.add(h/24,1/24),i((h+1)/f),h%6===0&&await new Promise(d=>setTimeout(d,0))}if(await l.finalize(),!l.target.buffer)throw new Error("\u672A\u6536\u5230\u7F16\u7801\u7ED3\u679C");return new Blob([l.target.buffer],{type:"video/mp4"})}catch(f){throw await l.cancel(),f}finally{u.close(),c.dispose()}}var qe=n=>{let e=document.getElementById(n);if(!e)throw new Error(`\u7F3A\u5C11\u63A7\u4EF6 ${n}`);return e},lt=n=>qe(n),nu=n=>qe(n),Sg="ruoyi-long-snake-v1",Ue=ou(),Ct=0,bn=!0,eo=!1,Ad=0,vn="field",iu;try{let n=localStorage.getItem(Sg);n&&(Ue=Wr(JSON.parse(n)))}catch{}function Zn(n,e=!1){qe("status").textContent=n,qe("status").classList.toggle("error",e)}function zi(){clearTimeout(Ad),Ad=window.setTimeout(()=>{try{localStorage.setItem(Sg,JSON.stringify(Ue))}catch{Zn("\u672C\u5730\u4FDD\u5B58\u4E0D\u53EF\u7528\uFF0C\u8BF7\u5BFC\u51FA\u914D\u7F6E\u7559\u5B58")}},200)}var dn=Pl(qe("viewport")),Sd=new Map;function zr(){dn.clearSelection(),qe("picked").textContent="\u70B9\u9009\u5175\u5352\u6216\u9A6C\u8EAB\u53EF\u67E5\u770B\u6240\u5C5E\u961F\u5217",vn==="cavalry"&&!Dn(Ue)&&(vn="head")}var Mg=new ResizeObserver(()=>{let n=qe("viewport").getBoundingClientRect();dn.resize(n.width,n.height),dn.setView(vn,Ue,Ct)});Mg.observe(qe("viewport"));function sn(){lt("count").value=String(Ue.count),nu("ranks").value=String(Ue.ranks),lt("cavalryPercent").value=String(Ue.cavalryPercent),lt("spacing").value=String(Ue.spacing),lt("speed").value=String(Ue.speed),lt("bend").value=String(Ue.bend),lt("duration").value=String(Ue.duration);for(let e of["guides","labels","dust"])lt(e).checked=Ue[e];lt("timeline").max=lt("time").max=String(Ue.duration),qe("spacing-value").textContent=`${Ue.spacing.toFixed(2)} m`,qe("speed-value").textContent=`${Ue.speed.toFixed(1)}\xD7`,qe("bend-value").textContent=`${Ue.bend.toFixed(0)} m`,qe("mode-name").textContent=Wi[Ue.mode].name,qe("mode-help").textContent=Wi[Ue.mode].description;for(let e of document.querySelectorAll("[data-mode]")){let t=e.dataset.mode===Ue.mode;e.setAttribute("aria-pressed",String(t)),e.classList.toggle("active",t)}for(let e of document.querySelectorAll("[data-view]")){let t=e.dataset.view===vn;e.setAttribute("aria-pressed",String(t)),e.classList.toggle("active",t),e.disabled=e.dataset.view==="cavalry"&&!Dn(Ue)}qe("play").textContent=bn?"\u6682\u505C\u884C\u519B":"\u7EE7\u7EED\u6F14\u793A",qe("state").textContent=bn?"\u6F14\u793A\u4E2D":"\u5DF2\u6682\u505C",qe("total").textContent=String(Ue.count);let n=Dd(Ue);qe("shield-count").textContent=String(n.shield),qe("spear-count").textContent=String(n.spear),qe("bow-count").textContent=String(n.bow),qe("flag-count").textContent=String(n.flag),qe("cavalry-count").textContent=String(n.cavalry),qe("cavalry-value").textContent=`${Ue.cavalryPercent}% \xB7 ${n.cavalry}\u9A91`}function jA(){let n=Number(lt("count").value);Number.isFinite(n)&&Number.isInteger(n)&&n>=24&&n<=960&&(Ue.count=n,zr(),sn(),zi(),dn.setView(vn,Ue,Ct))}lt("count").addEventListener("input",jA);lt("count").addEventListener("change",()=>{Ue.count=Gr(Math.round(Number(lt("count").value)||360),24,960),zr(),sn(),zi(),dn.setView(vn,Ue,Ct)});nu("ranks").addEventListener("change",()=>{Ue.ranks=Number(nu("ranks").value),zr(),sn(),zi(),dn.setView(vn,Ue,Ct)});for(let n of["spacing","speed","bend","cavalryPercent"])lt(n).addEventListener("input",()=>{Ue[n]=Number(lt(n).value),n==="cavalryPercent"&&zr(),sn(),zi(),n!=="speed"&&dn.setView(vn,Ue,Ct)});for(let n of["guides","labels","dust"])lt(n).addEventListener("change",()=>{Ue[n]=lt(n).checked,zi()});function Ed(){let n=Number(lt("duration").value);!Number.isFinite(n)||n<6||n>30||(Ue.duration=n,Ct=Math.min(Ct,n),lt("timeline").max=lt("time").max=String(n),zi())}lt("duration").addEventListener("input",Ed);lt("duration").addEventListener("change",()=>{Ed(),sn()});for(let n of document.querySelectorAll("[data-mode]"))n.addEventListener("click",()=>{Ue.mode=n.dataset.mode,Ct=0,bn=!0,zr(),sn(),zi(),dn.setView(vn,Ue,Ct),Zn(Wi[Ue.mode].description)});for(let n of document.querySelectorAll("[data-view]"))n.addEventListener("click",()=>{vn=n.dataset.view,dn.setView(vn,Ue,Ct),sn()});qe("play").addEventListener("click",()=>{Ct>=Ue.duration&&(Ct=0),bn=!bn,sn()});qe("restart").addEventListener("click",()=>{Ct=0,bn=!0,sn()});qe("peak").addEventListener("click",()=>{Ct=Ue.duration*.72,bn=!1,sn()});for(let n of["timeline","time"])lt(n).addEventListener("input",()=>{Ct=Gr(Number(lt(n).value),0,Ue.duration),bn=!1,sn()});dn.onPick(n=>{let e={head:"\u86C7\u9996",body:"\u86C7\u8EAB",tail:"\u86C7\u5C3E"}[ma(Ue,n)],t={shield:"\u76FE\u5175",spear:"\u67AA\u5175",bow:"\u5F13\u5175",flag:"\u65D7\u624B",cavalry:"\u9A91\u5175"}[qr(Ue,n)];qe("picked").textContent=`${e} \xB7 \u7B2C${Math.floor(n/Ue.ranks)+1}\u5217\u7B2C${n%Ue.ranks+1}\u6392 \xB7 ${t}`});qe("default").addEventListener("click",()=>{Ue=ou(),Ct=0,bn=!0,vn="field",zr(),sn(),zi(),dn.setView(vn,Ue,Ct),Zn("\u5DF2\u6062\u590D360\u4EBA\u30014\u6392\u7684\u519B\u9635\uFF0C\u5305\u542B72\u9A91")});function Eg(n,e,t){let i=Sd.get(e);i&&URL.revokeObjectURL(i);let r=URL.createObjectURL(n);Sd.set(e,r);let s=qe(e);return s.href=r,s.download=t,s.hidden=!1,s.click(),r}qe("save").addEventListener("click",()=>{Eg(new Blob([JSON.stringify(Ue,null,2)],{type:"application/json"}),"download-config","\u4E00\u5B57\u957F\u86C7\u9635-\u7F16\u6392\u914D\u7F6E.json"),Zn("\u914D\u7F6E\u5DF2\u751F\u6210\uFF0C\u53EF\u4F7F\u7528\u4E0B\u65B9\u94FE\u63A5\u4E0B\u8F7D")});qe("load").addEventListener("click",()=>lt("file").click());lt("file").addEventListener("change",async()=>{let n=lt("file").files?.[0];if(n)try{if(n.size>65536)throw new Error("\u914D\u7F6E\u6587\u4EF6\u4E0D\u80FD\u8D85\u8FC764KB");Ue=Wr(JSON.parse(await n.text())),Ct=0,bn=!1,vn="field",zr(),sn(),zi(),dn.setView(vn,Ue,Ct),Zn("\u914D\u7F6E\u5DF2\u5BFC\u5165\uFF0C\u70B9\u51FB\u7EE7\u7EED\u6F14\u793A")}catch(e){Zn(e instanceof Error?e.message:"\u5BFC\u5165\u5931\u8D25",!0)}finally{lt("file").value=""}});qe("export").addEventListener("click",async()=>{if(eo)return;let n=Ue;try{n=Wr({...Ue,count:Number(lt("count").value),duration:Number(lt("duration").value)})}catch(e){Zn(e instanceof Error?e.message:"\u8BF7\u68C0\u67E5\u5175\u529B\u548C\u65F6\u957F\u8303\u56F4",!0);return}Ue=n,Ed(),eo=!0,bn=!1,iu=new AbortController,sn(),qe("export").disabled=!0,qe("cancel").hidden=!1,qe("export-progress").hidden=!1,Zn("\u6B63\u5728\u51C6\u5907\u519B\u9635\u89C6\u9891\u2026");try{let e=await Ag(n,dn.view(),nu("aspect").value,i=>{qe("export-progress").value=i,Zn(`\u6B63\u5728\u5BFC\u51FA\u519B\u9635 ${Math.round(i*100)}%`)},iu.signal),t=Eg(e,"download-video",`\u4E00\u5B57\u957F\u86C7\u9635-${Wi[n.mode].name}-${n.duration}\u79D2.mp4`);qe("result-video").src=t,qe("result").hidden=!1,qe("result-meta").textContent=`${Wi[n.mode].name} \xB7 ${n.count}\u4EBA \xB7 ${n.duration}\u79D2 \xB7 720p \xB7 \u65E0\u58F0`,Zn("\u89C6\u9891\u5DF2\u751F\u6210\uFF0C\u53EF\u5728\u4E0B\u65B9\u56DE\u653E\u548C\u4E0B\u8F7D")}catch(e){Zn(e instanceof Error?e.message:"\u89C6\u9891\u5BFC\u51FA\u5931\u8D25",!0)}finally{eo=!1,qe("export").disabled=!1,qe("cancel").hidden=!0,qe("export-progress").hidden=!0}});qe("cancel").addEventListener("click",()=>iu?.abort());window.addEventListener("keydown",n=>{n.code==="Space"&&n.target instanceof Element&&!n.target.matches("input,select,button,textarea")&&(n.preventDefault(),bn=!bn,sn())});var Md=performance.now(),vd=Md,wd=0,Td=0;function Tg(n){let e=Gr((n-Md)/1e3,0,.08);if(Md=n,bn&&!eo&&(Ct+=e,Ct>=Ue.duration&&(lt("loop").checked?Ct%=Ue.duration:(Ct=Ue.duration,bn=!1,sn()))),!eo){let t=dn.update(Ue,Ct);qe("length").textContent=`${t.length.toFixed(1)} m`,qe("columns").textContent=String(t.columns),qe("phase").textContent=Ue.mode==="respond"?t.response>.99?"\u9996\u5C3E\u5185\u6536 \xB7 \u4E92\u76F8\u7167\u5E94":t.response>0?"\u86C7\u8EAB\u7A33\u4F4F \xB7 \u9996\u5C3E\u5185\u6536":"\u7EB5\u957F\u961F\u5217\u5C31\u4F4D":Wi[Ue.mode].name,wd++}if(n-vd>180){lt("timeline").value=String(Ct),document.activeElement!==lt("time")&&(lt("time").value=Ct.toFixed(2)),qe("clock").textContent=`${Ct.toFixed(1)} / ${Ue.duration} s`;let t=dn.renderer.info.render;qe("performance").textContent=eo?"\u9884\u6F14\u6682\u505C \xB7 \u6B63\u5728\u9010\u5E27\u5BFC\u51FA":`${Math.round(wd*1e3/(n-vd))} fps \xB7 ${t.calls} draws \xB7 ${t.triangles.toLocaleString()} triangles`,wd=0,vd=n}Td=requestAnimationFrame(Tg)}sn();Zn("\u519B\u9635\u5DF2\u5C31\u4F4D\u3002\u9009\u62E9\u52A8\u4F5C\u548C\u673A\u4F4D\uFF0C\u62D6\u52A8\u753B\u9762\u6216\u70B9\u9009\u5175\u5352\u3002");Td=requestAnimationFrame(Tg);window.addEventListener("pagehide",()=>{cancelAnimationFrame(Td),clearTimeout(Ad),iu?.abort(),Mg.disconnect(),Sd.forEach(n=>URL.revokeObjectURL(n)),dn.dispose()},{once:!0});})();
/*! For license information please see app.js.LEGAL.txt */
