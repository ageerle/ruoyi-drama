(()=>{var ei=[{id:"upper-rings",name:"\u4E0A\u5C42\u4E09\u9053\u5706\u8F6E",axis:"y",center:[0,5.2,0],radius:.53,rings:[-.38,0,.38],kind:"ring"},{id:"middle-rings",name:"\u4E2D\u5C42\u4E24\u9053\u5706\u8F6E",axis:"y",center:[0,3.91,0],radius:.57,rings:[-.3,.3],kind:"ring"},{id:"lower-ring",name:"\u4E0B\u5C42\u5706\u8F6E",axis:"y",center:[0,2.15,0],radius:.61,rings:[0],kind:"ring"},{id:"left-wheel",name:"\u5DE6\u4FA7\u7AD6\u5411\u82B1\u8F6E",axis:"z",center:[-.54,2.91,.05],radius:.46,rings:[0],kind:"wheel"},{id:"right-wheel",name:"\u53F3\u4FA7\u7AD6\u5411\u82B1\u8F6E",axis:"z",center:[.54,2.91,.05],radius:.46,rings:[0],kind:"wheel"},{id:"upper-stages",name:"\u4E0A\u5C42\u60AC\u6302\u620F\u53F0",axis:"y",center:[0,4.58,0],radius:1.46,rings:[0],kind:"stage"},{id:"lower-stages",name:"\u4E0B\u5C42\u60AC\u6302\u620F\u53F0",axis:"y",center:[0,3.45,0],radius:1.94,rings:[0],kind:"stage"}],vn=1e4,Zd=2.85,bn=Math.PI*2,Pi=(i,e,t)=>Math.max(e,Math.min(t,i));function Au(){return{schema:"ruoyi-firework-puppets-v1",duration:15,speed:1,density:1,gravity:4.8,wind:.18,smoke:!0,color:"#ffbf55",layers:ei.map((i,e)=>({id:i.id,enabled:!0,rpm:[11,-14,16,24,-24,3,-2][e],start:[4,2,0,1,1.4,0,0][e],end:14,phase:e*23,sparks:!0}))}}function yn(i,e,t,n){if(typeof i!="number"||!Number.isFinite(i)||i<e||i>t)throw new Error(`${n}\u987B\u5728${e}\u2014${t}\u8303\u56F4\u5185`);return i}function Xr(i){if(!i||typeof i!="object")throw new Error("\u914D\u7F6E\u987B\u4E3AJSON\u5BF9\u8C61");let e=i;if(e.schema!=="ruoyi-firework-puppets-v1")throw new Error("\u8BF7\u9009\u62E9\u672C\u9875\u5BFC\u51FA\u7684\u836F\u53D1\u6728\u5076\u9884\u6F14\u914D\u7F6E");let t=yn(e.duration,6,30,"\u8868\u6F14\u65F6\u957F");if(!Array.isArray(e.layers)||e.layers.length!==ei.length)throw new Error("\u914D\u7F6E\u987B\u5305\u542B\u4E03\u7EC4\u8F6E\u67B6\u4E0E\u620F\u53F0");let n=ei.map(r=>{let s=e.layers.filter(l=>l&&l.id===r.id);if(s.length!==1)throw new Error("\u8F6E\u67B6\u914D\u7F6E\u6709\u7F3A\u5931\u6216\u91CD\u590D");let o=s[0],a=yn(o.start,0,t-.2,"\u542F\u52A8\u65F6\u95F4"),c=yn(o.end,a+.2,t,"\u7ED3\u675F\u65F6\u95F4");if(typeof o.enabled!="boolean"||typeof o.sparks!="boolean")throw new Error("\u8F6E\u67B6\u5F00\u5173\u65E0\u6548");return{id:r.id,enabled:o.enabled,sparks:o.sparks,start:a,end:c,rpm:yn(o.rpm,-45,45,"\u8F6C\u901F"),phase:yn(o.phase,-360,360,"\u521D\u59CB\u89D2\u5EA6")}});if(typeof e.smoke!="boolean"||typeof e.color!="string"||!/^#[a-f\d]{6}$/i.test(e.color))throw new Error("\u70DF\u96FE\u6216\u989C\u8272\u8BBE\u7F6E\u65E0\u6548");return{schema:"ruoyi-firework-puppets-v1",duration:t,layers:n,speed:yn(e.speed,0,2,"\u6574\u4F53\u8F6C\u901F\u500D\u7387"),density:yn(e.density,0,2,"\u706B\u82B1\u5F3A\u5EA6"),gravity:yn(e.gravity,1,12,"\u4E0B\u5760\u901F\u5EA6"),wind:yn(e.wind,-1,1,"\u6A2A\u5411\u98CE"),smoke:e.smoke,color:e.color}}function Kg(i,e){let t=Pi(i,0,e),n=Math.min(.8,e/2);return t<n?t*t/(2*n):t<=e-n?t-n/2:e-n-(e-t)**2/(2*n)}function Yr(i,e,t=1){return i.phase*Math.PI/180+(i.enabled?i.rpm*t*bn/60*Kg(e-i.start,i.end-i.start):0)}function Da(i,e){if(!i.enabled||!i.sparks)return 0;let t=e-i.start-.25,n=i.end-i.start-.25;return Pi(t/.65,0,1)*Pi((n-t)/1.1,0,1)}function Su(i){return i.kind==="stage"?4:i.rings.length*3}function di(i){let e=Math.imul(i^1831565813,73244475);return e=Math.imul(e^e>>>16,73244475),((e^e>>>16)>>>0)/4294967296}function Mu(i,e,t,n,r,s){let o=Yr(e,n,r),a=Math.sign(e.rpm)||1,c=i.radius,l=i.axis==="y"?-1:1,u=l*o+t%3*bn/3,d=i.rings[Math.floor(t/3)]??0;i.kind==="stage"&&(u=l*o+(t<2?0:Math.PI),d=-.69);let h=Math.cos(u),f=Math.sin(u),m=1.2+Math.abs(e.rpm*r)*bn/60*c*.3;s[0]=i.center[0]+h*c+(i.kind==="stage"?t%2?.15:-.15:0),i.axis==="y"?(s[1]=i.center[1]+d,s[2]=i.center[2]+f*c,s[3]=-f*a*l*m+h*.32,s[4]=i.kind==="stage"?-.25:.9,s[5]=h*a*l*m+f*.32):(s[1]=i.center[1]+f*c,s[2]=i.center[2]+.06,s[3]=-f*a*m+h*.6,s[4]=h*a*m+f*.6+.35,s[5]=.18)}function $d(i,e,t,n,r,s,o,a){let c=s*8191+n*127+ei.indexOf(e)*104729,l=o-r,u=1.25+di(c+1)*1.6,d=Da(t,r);if(l<0||l>=u||d<=.025)return!1;Mu(e,t,n,r,i.speed,a);let h=a[0],f=a[1],m=a[2],y=a[3]*(.55+di(c+2))+(di(c+3)-.5)*.4,g=a[4]+(di(c+4)-.5)*.65,p=a[5]*(.65+di(c+5))+(di(c+6)-.5)*.25;if(a[0]=h+y*l+i.wind*l*l*.2,a[1]=f+g*l-i.gravity*l*l/2,a[2]=m+p*l,a[1]<.075)return!1;let w=Math.max(0,l-.065);return a[3]=h+y*w+i.wind*w*w*.2,a[4]=f+g*w-i.gravity*w*w/2,a[5]=m+p*w,a[6]=d*Math.min(1,l*25)*(1-l/u)**.65,a[7]=1.8+di(c+7)*2.4,a[8]=di(c+8),!0}var Xc="186",tr={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ir={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Lf=0,lh=1,Ff=2;var Tr=1,Df=2,Ds=3,nr=0,ui=1,ln=2,Li=0,Us=1,rr=2,uh=3,hh=4,Uf=5;var Cr=100,Of=101,Nf=102,kf=103,zf=104,Vf=200,Hf=201,Gf=202,Wf=203,dh=204,fh=205,qf=206,Xf=207,Yf=208,Zf=209,$f=210,jf=211,Kf=212,Jf=213,Qf=214,uc=0,hc=1,dc=2,us=3,fc=4,pc=5,mc=6,gc=7,ph=0,ep=1,tp=2,$i=0,Jo=1,Qo=2,ea=3,Rr=4,ta=5,ia=6,na=7;var mh=300,sr=301,Ir=302,Yc=303,Zc=304,ra=306,hs=1e3,rn=1001,_c=1002,Gt=1003,ip=1004;var sa=1005;var jt=1006,$c=1007;var or=1008;var pi=1009,gh=1010,_h=1011,Os=1012,jc=1013,ji=1014,Fi=1015,Kt=1016,Kc=1017,Jc=1018,Ns=1020,xh=35902,yh=35899,bh=1021,vh=1022,Di=1023,sn=1026,ar=1027,Qc=1028,el=1029,cr=1030,tl=1031;var il=1033,oa=33776,aa=33777,ca=33778,la=33779,nl=35840,rl=35841,sl=35842,ol=35843,al=36196,cl=37492,ll=37496,ul=37488,hl=37489,ua=37490,dl=37491,fl=37808,pl=37809,ml=37810,gl=37811,_l=37812,xl=37813,yl=37814,bl=37815,vl=37816,wl=37817,Al=37818,Sl=37819,Ml=37820,El=37821,Tl=36492,Cl=36494,Rl=36495,Il=36283,Pl=36284,ha=36285,Bl=36286;var xo=2300,xc=2301,cc=2302,Ku=2303,Ju=2400,Qu=2401,eh=2402;var np=3200;var Ll=0,rp=1,Rn="",Zt="srgb",yo="srgb-linear",bo="linear",gt="srgb";var lc=7680;var sp=519,op=512,ap=513,cp=514,Fl=515,lp=516,up=517,Dl=518,hp=519,dp=35044,wh=35048;var Ah="300 es",Yi=2e3,ds=2001;function Jg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Qg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function vo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fp(){let i=vo("canvas");return i.style.display="block",i}var jd={},fs=null;function Sh(...i){let e="THREE."+i.shift();fs?fs("log",e,...i):console.log(e,...i)}function pp(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ge(...i){i=pp(i);let e="THREE."+i.shift();if(fs)fs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ze(...i){i=pp(i);let e="THREE."+i.shift();if(fs)fs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ar(...i){let e=i.join(" ");e in jd||(jd[e]=!0,Ge(...i))}function mp(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var gp={[uc]:hc,[dc]:mc,[fc]:gc,[us]:pc,[hc]:uc,[mc]:dc,[gc]:fc,[pc]:us},Zi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},ti=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kd=1234567,po=Math.PI/180,ps=180/Math.PI;function Pr(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ti[i&255]+ti[i>>8&255]+ti[i>>16&255]+ti[i>>24&255]+"-"+ti[e&255]+ti[e>>8&255]+"-"+ti[e>>16&15|64]+ti[e>>24&255]+"-"+ti[t&63|128]+ti[t>>8&255]+"-"+ti[t>>16&255]+ti[t>>24&255]+ti[n&255]+ti[n>>8&255]+ti[n>>16&255]+ti[n>>24&255]).toLowerCase()}function nt(i,e,t){return Math.max(e,Math.min(t,i))}function Mh(i,e){return(i%e+e)%e}function e0(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function t0(i,e,t){return i!==e?(t-i)/(e-i):0}function mo(i,e,t){return(1-t)*i+t*e}function i0(i,e,t,n){return mo(i,e,1-Math.exp(-t*n))}function n0(i,e=1){return e-Math.abs(Mh(i,e*2)-e)}function r0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function s0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function o0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function a0(i,e){return i+Math.random()*(e-i)}function c0(i){return i*(.5-Math.random())}function l0(i){i!==void 0&&(Kd=i);let e=Kd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function u0(i){return i*po}function h0(i){return i*ps}function d0(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function f0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function p0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function m0(i,e,t,n,r){let s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),h=o((e-n)/2),f=s((n-e)/2),m=o((n-e)/2);switch(r){case"XYX":i.set(a*u,c*d,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*u,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*u,a*l);break;default:Ge("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function cs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ai(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var da={DEG2RAD:po,RAD2DEG:ps,generateUUID:Pr,clamp:nt,euclideanModulo:Mh,mapLinear:e0,inverseLerp:t0,lerp:mo,damp:i0,pingpong:n0,smoothstep:r0,smootherstep:s0,randInt:o0,randFloat:a0,randFloatSpread:c0,seededRandom:l0,degToRad:u0,radToDeg:h0,isPowerOfTwo:d0,ceilPowerOfTwo:f0,floorPowerOfTwo:p0,setQuaternionFromProperEuler:m0,normalize:ai,denormalize:cs},le=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ni=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],h=s[o+0],f=s[o+1],m=s[o+2],y=s[o+3];if(d!==y||c!==h||l!==f||u!==m){let g=c*h+l*f+u*m+d*y;g<0&&(h=-h,f=-f,m=-m,y=-y,g=-g);let p=1-a;if(g<.9995){let w=Math.acos(g),T=Math.sin(w);p=Math.sin(p*w)/T,a=Math.sin(a*w)/T,c=c*p+h*a,l=l*p+f*a,u=u*p+m*a,d=d*p+y*a}else{c=c*p+h*a,l=l*p+f*a,u=u*p+m*a,d=d*p+y*a;let w=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=w,l*=w,u*=w,d*=w}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,o){let a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=s[o],h=s[o+1],f=s[o+2],m=s[o+3];return e[t]=a*m+u*d+c*f-l*h,e[t+1]=c*m+u*h+l*d-a*f,e[t+2]=l*m+u*f+a*h-c*d,e[t+3]=u*m-a*d-c*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),d=a(s/2),h=c(n/2),f=c(r/2),m=c(s/2);switch(o){case"XYZ":this._x=h*u*d+l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d+h*f*m;break;case"YZX":this._x=h*u*d+l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d-h*f*m;break;case"XZY":this._x=h*u*d-l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d+h*f*m;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(s-l)*f,this._z=(o-r)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(u-c)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(s-l)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-r)/f,this._x=(s+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),u=2*(a*t-s*r),d=2*(s*n-o*t);return this.x=t+c*l+o*d-a*u,this.y=n+c*u+a*l-s*d,this.z=r+c*d+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Eu.copy(this).projectOnVector(e),this.sub(Eu)}reflect(e){return this.sub(Eu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Eu=new R,Jd=new ni,Ke=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,r,s,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],f=n[5],m=n[8],y=r[0],g=r[3],p=r[6],w=r[1],T=r[4],b=r[7],A=r[2],S=r[5],I=r[8];return s[0]=o*y+a*w+c*A,s[3]=o*g+a*T+c*S,s[6]=o*p+a*b+c*I,s[1]=l*y+u*w+d*A,s[4]=l*g+u*T+d*S,s[7]=l*p+u*b+d*I,s[2]=h*y+f*w+m*A,s[5]=h*g+f*T+m*S,s[8]=h*p+f*b+m*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,h=a*c-u*s,f=l*s-o*c,m=t*d+n*h+r*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=d*y,e[1]=(r*l-u*n)*y,e[2]=(a*n-r*o)*y,e[3]=h*y,e[4]=(u*t-r*c)*y,e[5]=(r*s-a*t)*y,e[6]=f*y,e[7]=(n*c-l*t)*y,e[8]=(o*t-n*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return Ar("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Tu.makeScale(e,t)),this}rotate(e){return Ar("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Tu.makeRotation(-e)),this}translate(e,t){return Ar("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Tu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Tu=new Ke,Qd=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ef=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function g0(){let i={enabled:!0,workingColorSpace:yo,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===gt&&(r.r=Tn(r.r),r.g=Tn(r.g),r.b=Tn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===gt&&(r.r=ls(r.r),r.g=ls(r.g),r.b=ls(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Rn?bo:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ar("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ar("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[yo]:{primaries:e,whitePoint:n,transfer:bo,toXYZ:Qd,fromXYZ:ef,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Zt},outputColorSpaceConfig:{drawingBufferColorSpace:Zt}},[Zt]:{primaries:e,whitePoint:n,transfer:gt,toXYZ:Qd,fromXYZ:ef,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Zt}}}),i}var ot=g0();function Tn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Zr,yc=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Zr===void 0&&(Zr=vo("canvas")),Zr.width=e.width,Zr.height=e.height;let r=Zr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Zr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=vo("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Tn(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Tn(t[n]/255)*255):t[n]=Tn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},_0=0,ms=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_0++}),this.uuid=Pr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Cu(r[o].image)):s.push(Cu(r[o]))}else s=Cu(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Cu(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?yc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}var x0=0,Ru=new R,li=class i extends Zi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=rn,r=rn,s=jt,o=or,a=Di,c=pi,l=i.DEFAULT_ANISOTROPY,u=Rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=Pr(),this.name="",this.source=new ms(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ru).x}get height(){return this.source.getSize(Ru).y}get depth(){return this.source.getSize(Ru).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hs:e.x=e.x-Math.floor(e.x);break;case rn:e.x=e.x<0?0:1;break;case _c:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hs:e.y=e.y-Math.floor(e.y);break;case rn:e.y=e.y<0?0:1;break;case _c:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};li.DEFAULT_IMAGE=null;li.DEFAULT_MAPPING=mh;li.DEFAULT_ANISOTROPY=1;var It=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],m=c[9],y=c[2],g=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+y)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(l+1)/2,b=(f+1)/2,A=(p+1)/2,S=(u+h)/4,I=(d+y)/4,x=(m+g)/4;return T>b&&T>A?T<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(T),r=S/n,s=I/n):b>A?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=S/r,s=x/r):A<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),n=I/s,r=x/s),this.set(n,r,s,t),this}let w=Math.sqrt((g-m)*(g-m)+(d-y)*(d-y)+(h-u)*(h-u));return Math.abs(w)<.001&&(w=1),this.x=(g-m)/w,this.y=(d-y)/w,this.z=(h-u)/w,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},bc=class extends Zi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new li(r),o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new ms(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Nt=class extends bc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},wo=class extends li{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var vc=class extends li{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var _t=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,r,s,o,a,c,l,u,d,h,f,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,u,d,h,f,m,y,g)}set(e,t,n,r,s,o,a,c,l,u,d,h,f,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/$r.setFromMatrixColumn(e,0).length(),s=1/$r.setFromMatrixColumn(e,1).length(),o=1/$r.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let h=o*u,f=o*d,m=a*u,y=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=f+m*l,t[5]=h-y*l,t[9]=-a*c,t[2]=y-h*l,t[6]=m+f*l,t[10]=o*c}else if(e.order==="YXZ"){let h=c*u,f=c*d,m=l*u,y=l*d;t[0]=h+y*a,t[4]=m*a-f,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-m,t[6]=y+h*a,t[10]=o*c}else if(e.order==="ZXY"){let h=c*u,f=c*d,m=l*u,y=l*d;t[0]=h-y*a,t[4]=-o*d,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*u,t[9]=y-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let h=o*u,f=o*d,m=a*u,y=a*d;t[0]=c*u,t[4]=m*l-f,t[8]=h*l+y,t[1]=c*d,t[5]=y*l+h,t[9]=f*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let h=o*c,f=o*l,m=a*c,y=a*l;t[0]=c*u,t[4]=y-h*d,t[8]=m*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=f*d+m,t[10]=h-y*d}else if(e.order==="XZY"){let h=o*c,f=o*l,m=a*c,y=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+y,t[5]=o*u,t[9]=f*d-m,t[2]=m*d-f,t[6]=a*u,t[10]=y*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(y0,e,b0)}lookAt(e,t,n){let r=this.elements;return bi.subVectors(e,t),bi.lengthSq()===0&&(bi.z=1),bi.normalize(),Hn.crossVectors(n,bi),Hn.lengthSq()===0&&(Math.abs(n.z)===1?bi.x+=1e-4:bi.z+=1e-4,bi.normalize(),Hn.crossVectors(n,bi)),Hn.normalize(),Ua.crossVectors(bi,Hn),r[0]=Hn.x,r[4]=Ua.x,r[8]=bi.x,r[1]=Hn.y,r[5]=Ua.y,r[9]=bi.y,r[2]=Hn.z,r[6]=Ua.z,r[10]=bi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],w=n[3],T=n[7],b=n[11],A=n[15],S=r[0],I=r[4],x=r[8],E=r[12],P=r[1],F=r[5],N=r[9],V=r[13],B=r[2],U=r[6],H=r[10],Z=r[14],ne=r[3],G=r[7],j=r[11],ie=r[15];return s[0]=o*S+a*P+c*B+l*ne,s[4]=o*I+a*F+c*U+l*G,s[8]=o*x+a*N+c*H+l*j,s[12]=o*E+a*V+c*Z+l*ie,s[1]=u*S+d*P+h*B+f*ne,s[5]=u*I+d*F+h*U+f*G,s[9]=u*x+d*N+h*H+f*j,s[13]=u*E+d*V+h*Z+f*ie,s[2]=m*S+y*P+g*B+p*ne,s[6]=m*I+y*F+g*U+p*G,s[10]=m*x+y*N+g*H+p*j,s[14]=m*E+y*V+g*Z+p*ie,s[3]=w*S+T*P+b*B+A*ne,s[7]=w*I+T*F+b*U+A*G,s[11]=w*x+T*N+b*H+A*j,s[15]=w*E+T*V+b*Z+A*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],f=e[14],m=e[3],y=e[7],g=e[11],p=e[15],w=c*f-l*h,T=a*f-l*d,b=a*h-c*d,A=o*f-l*u,S=o*h-c*u,I=o*d-a*u;return t*(y*w-g*T+p*b)-n*(m*w-g*A+p*S)+r*(m*T-y*A+p*I)-s*(m*b-y*S+g*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],o=e[5],a=e[9],c=e[2],l=e[6],u=e[10];return t*(o*u-a*l)-n*(s*u-a*c)+r*(s*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],f=e[11],m=e[12],y=e[13],g=e[14],p=e[15],w=t*a-n*o,T=t*c-r*o,b=t*l-s*o,A=n*c-r*a,S=n*l-s*a,I=r*l-s*c,x=u*y-d*m,E=u*g-h*m,P=u*p-f*m,F=d*g-h*y,N=d*p-f*y,V=h*p-f*g,B=w*V-T*N+b*F+A*P-S*E+I*x;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/B;return e[0]=(a*V-c*N+l*F)*U,e[1]=(r*N-n*V-s*F)*U,e[2]=(y*I-g*S+p*A)*U,e[3]=(h*S-d*I-f*A)*U,e[4]=(c*P-o*V-l*E)*U,e[5]=(t*V-r*P+s*E)*U,e[6]=(g*b-m*I-p*T)*U,e[7]=(u*I-h*b+f*T)*U,e[8]=(o*N-a*P+l*x)*U,e[9]=(n*P-t*N-s*x)*U,e[10]=(m*S-y*b+p*w)*U,e[11]=(d*b-u*S-f*w)*U,e[12]=(a*E-o*F-c*x)*U,e[13]=(t*F-n*E+r*x)*U,e[14]=(y*T-m*A-g*w)*U,e[15]=(u*A-d*T+h*w)*U,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,d=a+a,h=s*l,f=s*u,m=s*d,y=o*u,g=o*d,p=a*d,w=c*l,T=c*u,b=c*d,A=n.x,S=n.y,I=n.z;return r[0]=(1-(y+p))*A,r[1]=(f+b)*A,r[2]=(m-T)*A,r[3]=0,r[4]=(f-b)*S,r[5]=(1-(h+p))*S,r[6]=(g+w)*S,r[7]=0,r[8]=(m+T)*I,r[9]=(g-w)*I,r[10]=(1-(h+y))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let o=$r.set(r[0],r[1],r[2]).length(),a=$r.set(r[4],r[5],r[6]).length(),c=$r.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Wi.copy(this);let l=1/o,u=1/a,d=1/c;return Wi.elements[0]*=l,Wi.elements[1]*=l,Wi.elements[2]*=l,Wi.elements[4]*=u,Wi.elements[5]*=u,Wi.elements[6]*=u,Wi.elements[8]*=d,Wi.elements[9]*=d,Wi.elements[10]*=d,t.setFromRotationMatrix(Wi),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,r,s,o,a=Yi,c=!1){let l=this.elements,u=2*s/(t-e),d=2*s/(n-r),h=(t+e)/(t-e),f=(n+r)/(n-r),m,y;if(c)m=s/(o-s),y=o*s/(o-s);else if(a===Yi)m=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(a===ds)m=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=Yi,c=!1){let l=this.elements,u=2/(t-e),d=2/(n-r),h=-(t+e)/(t-e),f=-(n+r)/(n-r),m,y;if(c)m=1/(o-s),y=o/(o-s);else if(a===Yi)m=-2/(o-s),y=-(o+s)/(o-s);else if(a===ds)m=-1/(o-s),y=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},$r=new R,Wi=new _t,y0=new R(0,0,0),b0=new R(1,1,1),Hn=new R,Ua=new R,bi=new R,tf=new _t,nf=new ni,Cn=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(nt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return tf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(tf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return nf.setFromEuler(this),this.setFromQuaternion(nf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Cn.DEFAULT_ORDER="XYZ";var Ao=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},v0=0,rf=new R,jr=new ni,wn=new _t,Oa=new R,so=new R,w0=new R,A0=new ni,sf=new R(1,0,0),of=new R(0,1,0),af=new R(0,0,1),cf={type:"added"},S0={type:"removed"},Kr={type:"childadded",child:null},Iu={type:"childremoved",child:null},Wt=class i extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:v0++}),this.uuid=Pr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new R,t=new Cn,n=new ni,r=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new _t},normalMatrix:{value:new Ke}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ao,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return jr.setFromAxisAngle(e,t),this.quaternion.multiply(jr),this}rotateOnWorldAxis(e,t){return jr.setFromAxisAngle(e,t),this.quaternion.premultiply(jr),this}rotateX(e){return this.rotateOnAxis(sf,e)}rotateY(e){return this.rotateOnAxis(of,e)}rotateZ(e){return this.rotateOnAxis(af,e)}translateOnAxis(e,t){return rf.copy(e).applyQuaternion(this.quaternion),this.position.add(rf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sf,e)}translateY(e){return this.translateOnAxis(of,e)}translateZ(e){return this.translateOnAxis(af,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Oa.copy(e):Oa.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),so.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(so,Oa,this.up):wn.lookAt(Oa,so,this.up),this.quaternion.setFromRotationMatrix(wn),r&&(wn.extractRotation(r.matrixWorld),jr.setFromRotationMatrix(wn),this.quaternion.premultiply(jr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cf),Kr.child=e,this.dispatchEvent(Kr),Kr.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(S0),Iu.child=e,this.dispatchEvent(Iu),Iu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cf),Kr.child=e,this.dispatchEvent(Kr),Kr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,e,w0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,A0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=r,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Wt.DEFAULT_UP=new R(0,1,0);Wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var fi=class extends Wt{constructor(){super(),this.isGroup=!0,this.type="Group"}},M0={type:"move"},gs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(l,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;l.inputState.pinching&&h>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(M0)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new fi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},_p={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},Na={h:0,s:0,l:0};function Pu(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ye=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=ot.workingColorSpace){if(e=Mh(e,1),t=nt(t,0,1),n=nt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Pu(o,s,e+1/3),this.g=Pu(o,s,e),this.b=Pu(o,s,e-1/3)}return ot.colorSpaceToWorking(this,r),this}setStyle(e,t=Zt){function n(s){s!==void 0&&parseFloat(s)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Zt){let n=_p[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tn(e.r),this.g=Tn(e.g),this.b=Tn(e.b),this}copyLinearToSRGB(e){return this.r=ls(e.r),this.g=ls(e.g),this.b=ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zt){return ot.workingToColorSpace(ii.copy(this),e),Math.round(nt(ii.r*255,0,255))*65536+Math.round(nt(ii.g*255,0,255))*256+Math.round(nt(ii.b*255,0,255))}getHexString(e=Zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(ii.copy(this),t);let n=ii.r,r=ii.g,s=ii.b,o=Math.max(n,r,s),a=Math.min(n,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-n)/d+2;break;case s:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(ii.copy(this),t),e.r=ii.r,e.g=ii.g,e.b=ii.b,e}getStyle(e=Zt){ot.workingToColorSpace(ii.copy(this),e);let t=ii.r,n=ii.g,r=ii.b;return e!==Zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Gn),this.setHSL(Gn.h+e,Gn.s+t,Gn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gn),e.getHSL(Na);let n=mo(Gn.h,Na.h,t),r=mo(Gn.s,Na.s,t),s=mo(Gn.l,Na.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ii=new Ye;Ye.NAMES=_p;var So=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ye(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Mo=class extends Wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},qi=new R,An=new R,Bu=new R,Sn=new R,Jr=new R,Qr=new R,lf=new R,Lu=new R,Fu=new R,Du=new R,Uu=new It,Ou=new It,Nu=new It,Yn=class i{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),qi.subVectors(e,t),r.cross(qi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){qi.subVectors(r,t),An.subVectors(n,t),Bu.subVectors(e,t);let o=qi.dot(qi),a=qi.dot(An),c=qi.dot(Bu),l=An.dot(An),u=An.dot(Bu),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;let h=1/d,f=(l*c-a*u)*h,m=(o*u-a*c)*h;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,Sn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Sn.x),c.addScaledVector(o,Sn.y),c.addScaledVector(a,Sn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,o){return Uu.setScalar(0),Ou.setScalar(0),Nu.setScalar(0),Uu.fromBufferAttribute(e,t),Ou.fromBufferAttribute(e,n),Nu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Uu,s.x),o.addScaledVector(Ou,s.y),o.addScaledVector(Nu,s.z),o}static isFrontFacing(e,t,n,r){return qi.subVectors(n,t),An.subVectors(e,t),qi.cross(An).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qi.subVectors(this.c,this.b),An.subVectors(this.a,this.b),qi.cross(An).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,o,a;Jr.subVectors(r,n),Qr.subVectors(s,n),Lu.subVectors(e,n);let c=Jr.dot(Lu),l=Qr.dot(Lu);if(c<=0&&l<=0)return t.copy(n);Fu.subVectors(e,r);let u=Jr.dot(Fu),d=Qr.dot(Fu);if(u>=0&&d<=u)return t.copy(r);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(Jr,o);Du.subVectors(e,s);let f=Jr.dot(Du),m=Qr.dot(Du);if(m>=0&&f<=m)return t.copy(s);let y=f*l-c*m;if(y<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(Qr,a);let g=u*m-f*d;if(g<=0&&d-u>=0&&f-m>=0)return lf.subVectors(s,r),a=(d-u)/(d-u+(f-m)),t.copy(r).addScaledVector(lf,a);let p=1/(g+y+h);return o=y*p,a=h*p,t.copy(n).addScaledVector(Jr,o).addScaledVector(Qr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},on=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Xi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Xi):Xi.fromBufferAttribute(s,o),Xi.applyMatrix4(e.matrixWorld),this.expandByPoint(Xi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ka.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ka.copy(n.boundingBox)),ka.applyMatrix4(e.matrixWorld),this.union(ka)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xi),Xi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(oo),za.subVectors(this.max,oo),es.subVectors(e.a,oo),ts.subVectors(e.b,oo),is.subVectors(e.c,oo),Wn.subVectors(ts,es),qn.subVectors(is,ts),xr.subVectors(es,is);let t=[0,-Wn.z,Wn.y,0,-qn.z,qn.y,0,-xr.z,xr.y,Wn.z,0,-Wn.x,qn.z,0,-qn.x,xr.z,0,-xr.x,-Wn.y,Wn.x,0,-qn.y,qn.x,0,-xr.y,xr.x,0];return!ku(t,es,ts,is,za)||(t=[1,0,0,0,1,0,0,0,1],!ku(t,es,ts,is,za))?!1:(Va.crossVectors(Wn,qn),t=[Va.x,Va.y,Va.z],ku(t,es,ts,is,za))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Mn=[new R,new R,new R,new R,new R,new R,new R,new R],Xi=new R,ka=new on,es=new R,ts=new R,is=new R,Wn=new R,qn=new R,xr=new R,oo=new R,za=new R,Va=new R,yr=new R;function ku(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){yr.fromArray(i,s);let a=r.x*Math.abs(yr.x)+r.y*Math.abs(yr.y)+r.z*Math.abs(yr.z),c=e.dot(yr),l=t.dot(yr),u=n.dot(yr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Ot=new R,Ha=new le,E0=0,ci=class extends Zi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:E0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=dp,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ha.fromBufferAttribute(this,t),Ha.applyMatrix3(e),this.setXY(t,Ha.x,Ha.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix3(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=cs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ai(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=cs(t,this.array)),t}setX(e,t){return this.normalized&&(t=ai(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=cs(t,this.array)),t}setY(e,t){return this.normalized&&(t=ai(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=cs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ai(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=cs(t,this.array)),t}setW(e,t){return this.normalized&&(t=ai(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ai(t,this.array),n=ai(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ai(t,this.array),n=ai(n,this.array),r=ai(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=ai(t,this.array),n=ai(n,this.array),r=ai(r,this.array),s=ai(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Eo=class extends ci{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var To=class extends ci{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var mt=class extends ci{constructor(e,t,n){super(new Float32Array(e),t,n)}},T0=new on,ao=new R,zu=new R,an=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):T0.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ao.subVectors(e,this.center);let t=ao.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(ao,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ao.copy(e.center).add(zu)),this.expandByPoint(ao.copy(e.center).sub(zu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},C0=0,Bi=new _t,Vu=new Wt,ns=new R,vi=new on,co=new on,Ht=new R,Pt=class i extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:C0++}),this.uuid=Pr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jg(e)?To:Eo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Bi.makeRotationFromQuaternion(e),this.applyMatrix4(Bi),this}rotateX(e){return Bi.makeRotationX(e),this.applyMatrix4(Bi),this}rotateY(e){return Bi.makeRotationY(e),this.applyMatrix4(Bi),this}rotateZ(e){return Bi.makeRotationZ(e),this.applyMatrix4(Bi),this}translate(e,t,n){return Bi.makeTranslation(e,t,n),this.applyMatrix4(Bi),this}scale(e,t,n){return Bi.makeScale(e,t,n),this.applyMatrix4(Bi),this}lookAt(e){return Vu.lookAt(e),Vu.updateMatrix(),this.applyMatrix4(Vu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new mt(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];vi.setFromBufferAttribute(s),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,vi.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,vi.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(vi.min),this.boundingBox.expandByPoint(vi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new an);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(vi.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];co.setFromBufferAttribute(a),this.morphTargetsRelative?(Ht.addVectors(vi.min,co.min),vi.expandByPoint(Ht),Ht.addVectors(vi.max,co.max),vi.expandByPoint(Ht)):(vi.expandByPoint(co.min),vi.expandByPoint(co.max))}vi.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)Ht.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ht));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ht.fromBufferAttribute(a,l),c&&(ns.fromBufferAttribute(e,l),Ht.add(ns)),r=Math.max(r,n.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new ci(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let x=0;x<n.count;x++)a[x]=new R,c[x]=new R;let l=new R,u=new R,d=new R,h=new le,f=new le,m=new le,y=new R,g=new R;function p(x,E,P){l.fromBufferAttribute(n,x),u.fromBufferAttribute(n,E),d.fromBufferAttribute(n,P),h.fromBufferAttribute(s,x),f.fromBufferAttribute(s,E),m.fromBufferAttribute(s,P),u.sub(l),d.sub(l),f.sub(h),m.sub(h);let F=1/(f.x*m.y-m.x*f.y);isFinite(F)&&(y.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(F),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(F),a[x].add(y),a[E].add(y),a[P].add(y),c[x].add(g),c[E].add(g),c[P].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let x=0,E=w.length;x<E;++x){let P=w[x],F=P.start,N=P.count;for(let V=F,B=F+N;V<B;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let T=new R,b=new R,A=new R,S=new R;function I(x){A.fromBufferAttribute(r,x),S.copy(A);let E=a[x];T.copy(E),T.sub(A.multiplyScalar(A.dot(E))).normalize(),b.crossVectors(S,E);let F=b.dot(c[x])<0?-1:1;o.setXYZW(x,T.x,T.y,T.z,F)}for(let x=0,E=w.length;x<E;++x){let P=w[x],F=P.start,N=P.count;for(let V=F,B=F+N;V<B;V+=3)I(e.getX(V+0)),I(e.getX(V+1)),I(e.getX(V+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new ci(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let r=new R,s=new R,o=new R,a=new R,c=new R,l=new R,u=new R,d=new R;if(e)for(let h=0,f=e.count;h<f;h+=3){let m=e.getX(h+0),y=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,y),o.fromBufferAttribute(t,g),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,g),a.add(u),c.add(u),l.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ht.fromBufferAttribute(e,t),Ht.normalize(),e.setXYZ(t,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u),f=0,m=0;for(let y=0,g=c.length;y<g;y++){a.isInterleavedBufferAttribute?f=c[y]*a.data.stride+a.offset:f=c[y]*u;for(let p=0;p<u;p++)h[m++]=l[f++]}return new ci(h,u,d)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,n);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,d=l.length;u<d;u++){let h=l[u],f=e(h,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let f=l[d];u.push(f.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],d=s[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Hu=new R,R0=new R,I0=new Ke,wi=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Hu.subVectors(n,t).cross(R0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Hu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||I0.getNormalMatrix(e),r=this.coplanarPoint(Hu).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},P0=0,cn=class extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:P0++}),this.uuid=Pr(),this.name="",this.type="Material",this.blending=Us,this.side=nr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dh,this.blendDst=fh,this.blendEquation=Cr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=lc,this.stencilZFail=lc,this.stencilZPass=lc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ye().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new wi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new le().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new le().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var En=new R,Gu=new R,Ga=new R,Wa=new R,Zn=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,En)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=En.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(En.copy(this.origin).addScaledVector(this.direction,t),En.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Gu.copy(e).add(t).multiplyScalar(.5),Ga.copy(t).sub(e).normalize(),Wa.copy(this.origin).sub(Gu);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Ga),a=Wa.dot(this.direction),c=-Wa.dot(Ga),l=Wa.lengthSq(),u=Math.abs(1-o*o),d,h,f,m;if(u>0)if(d=o*c-a,h=o*a-c,m=s*u,d>=0)if(h>=-m)if(h<=m){let y=1/u;d*=y,h*=y,f=d*(d+o*h+2*a)+h*(o*d+h+2*c)+l}else h=s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h=-s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h<=-m?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+h*(h+2*c)+l):h<=m?(d=0,h=Math.min(Math.max(-s,-c),s),f=h*(h+2*c)+l):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+h*(h+2*c)+l);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Gu).addScaledVector(Ga,h),f}intersectSphere(e,t){if(e.radius<0)return null;En.subVectors(e.center,this.origin);let n=En.dot(this.direction),r=En.dot(En)-n*n,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,En)!==null}intersectTriangle(e,t,n,r,s){let o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,d=e.x-o.x,h=e.y-o.y,f=e.z-o.z,m=t.x-o.x,y=t.y-o.y,g=t.z-o.z,p=n.x-o.x,w=n.y-o.y,T=n.z-o.z,b=Math.abs(c),A=Math.abs(l),S=Math.abs(u),I,x,E,P,F,N,V,B,U,H,Z,ne;if(b>=A&&b>=S?(E=c,N=d,U=m,ne=p,c>=0?(I=l,x=u,P=h,F=f,V=y,B=g,H=w,Z=T):(I=u,x=l,P=f,F=h,V=g,B=y,H=T,Z=w)):A>=S?(E=l,N=h,U=y,ne=w,l>=0?(I=u,x=c,P=f,F=d,V=g,B=m,H=T,Z=p):(I=c,x=u,P=d,F=f,V=m,B=g,H=p,Z=T)):(E=u,N=f,U=g,ne=T,u>=0?(I=c,x=l,P=d,F=h,V=m,B=y,H=p,Z=w):(I=l,x=c,P=h,F=d,V=y,B=m,H=w,Z=p)),E===0)return null;let G=I/E,j=x/E,ie=1/E,Ce=P-G*N,Ee=F-j*N,dt=V-G*U,st=B-j*U,lt=H-G*ne,Q=Z-j*ne,re=lt*st-Q*dt,ve=Ce*Q-Ee*lt,We=dt*Ee-st*Ce;if(r){if(re<0||ve<0||We<0)return null}else if((re<0||ve<0||We<0)&&(re>0||ve>0||We>0))return null;let Te=re+ve+We;if(Te===0)return null;let Xe=ie*(re*N+ve*U+We*ne);return(Te>0?Xe<0:Xe>0)?null:this.at(Xe/Te,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Sr=class extends cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=ph,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},uf=new _t,br=new Zn,qa=new an,hf=new R,Xa=new R,Ya=new R,Za=new R,Wu=new R,$a=new R,df=new R,ja=new R,qt=class extends Wt{constructor(e=new Pt,t=new Sr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){$a.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],d=s[c];u!==0&&(Wu.fromBufferAttribute(d,e),o?$a.addScaledVector(Wu,u):$a.addScaledVector(Wu.sub(t),u))}t.add($a)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qa.copy(n.boundingSphere),qa.applyMatrix4(s),br.copy(e.ray).recast(e.near),!(qa.containsPoint(br.origin)===!1&&(br.intersectSphere(qa,hf)===null||br.origin.distanceToSquared(hf)>(e.far-e.near)**2))&&(uf.copy(s).invert(),br.copy(e.ray).applyMatrix4(uf),!(n.boundingBox!==null&&br.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,br)))}_computeIntersections(e,t,n){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=h.length;m<y;m++){let g=h[m],p=o[g.materialIndex],w=Math.max(g.start,f.start),T=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let b=w,A=T;b<A;b+=3){let S=a.getX(b),I=a.getX(b+1),x=a.getX(b+2);r=Ka(this,p,e,n,l,u,d,S,I,x),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let w=a.getX(g),T=a.getX(g+1),b=a.getX(g+2);r=Ka(this,o,e,n,l,u,d,w,T,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,y=h.length;m<y;m++){let g=h[m],p=o[g.materialIndex],w=Math.max(g.start,f.start),T=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let b=w,A=T;b<A;b+=3){let S=b,I=b+1,x=b+2;r=Ka(this,p,e,n,l,u,d,S,I,x),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,f.start),y=Math.min(c.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let w=g,T=g+1,b=g+2;r=Ka(this,o,e,n,l,u,d,w,T,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function B0(i,e,t,n,r,s,o,a){let c;if(e.side===ui?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===nr,a),c===null)return null;ja.copy(a),ja.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(ja);return l<t.near||l>t.far?null:{distance:l,point:ja.clone(),object:i}}function Ka(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,Xa),i.getVertexPosition(c,Ya),i.getVertexPosition(l,Za);let u=B0(i,e,t,n,Xa,Ya,Za,df);if(u){let d=new R;Yn.getBarycoord(df,Xa,Ya,Za,d),r&&(u.uv=Yn.getInterpolatedAttribute(r,a,c,l,d,new le)),s&&(u.uv1=Yn.getInterpolatedAttribute(s,a,c,l,d,new le)),o&&(u.normal=Yn.getInterpolatedAttribute(o,a,c,l,d,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new R,materialIndex:0};Yn.getNormal(Xa,Ya,Za,h.normal),u.face=h,u.barycoord=d}return u}var Co=class extends li{constructor(e=null,t=1,n=1,r,s,o,a,c,l=Gt,u=Gt,d,h){super(null,o,a,c,l,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ro=class extends ci{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},rs=new _t,ff=new _t,Ja=[],pf=new on,L0=new _t,lo=new qt,uo=new an,_s=class extends qt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ro(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,L0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new on),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,rs),pf.copy(e.boundingBox).applyMatrix4(rs),this.boundingBox.union(pf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new an),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,rs),uo.copy(e.boundingSphere).applyMatrix4(rs),this.boundingSphere.union(uo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(lo.geometry=this.geometry,lo.material=this.material,lo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),uo.copy(this.boundingSphere),uo.applyMatrix4(n),e.ray.intersectsSphere(uo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,rs),ff.multiplyMatrices(n,rs),lo.matrixWorld=ff,lo.raycast(e,Ja);for(let o=0,a=Ja.length;o<a;o++){let c=Ja[o];c.instanceId=s,c.object=this,t.push(c)}Ja.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ro(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Co(new Float32Array(r*this.count),r,this.count,Qc,Fi));let s=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;return s[c]=a,s.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},vr=new an,F0=new le(.5,.5),Qa=new R,xs=class{constructor(e=new wi,t=new wi,n=new wi,r=new wi,s=new wi,o=new wi){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Yi,n=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],d=s[5],h=s[6],f=s[7],m=s[8],y=s[9],g=s[10],p=s[11],w=s[12],T=s[13],b=s[14],A=s[15];if(r[0].setComponents(l-o,f-u,p-m,A-w).normalize(),r[1].setComponents(l+o,f+u,p+m,A+w).normalize(),r[2].setComponents(l+a,f+d,p+y,A+T).normalize(),r[3].setComponents(l-a,f-d,p-y,A-T).normalize(),n)r[4].setComponents(c,h,g,b).normalize(),r[5].setComponents(l-c,f-h,p-g,A-b).normalize();else if(r[4].setComponents(l-c,f-h,p-g,A-b).normalize(),t===Yi)r[5].setComponents(l+c,f+h,p+g,A+b).normalize();else if(t===ds)r[5].setComponents(c,h,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vr)}intersectsSprite(e){vr.center.set(0,0,0);let t=F0.distanceTo(e.center);return vr.radius=.7071067811865476+t,vr.applyMatrix4(e.matrixWorld),this.intersectsSphere(vr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Qa.x=r.normal.x>0?e.max.x:e.min.x,Qa.y=r.normal.y>0?e.max.y:e.min.y,Qa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Qa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Io=class extends cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},wc=new R,Ac=new R,mf=new _t,ho=new Zn,ec=new an,qu=new R,gf=new R,Sc=class extends Wt{constructor(e=new Pt,t=new Io){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)wc.fromBufferAttribute(t,r-1),Ac.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=wc.distanceTo(Ac);e.setAttribute("lineDistance",new mt(n,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ec.copy(n.boundingSphere),ec.applyMatrix4(r),ec.radius+=s,e.ray.intersectsSphere(ec)===!1)return;mf.copy(r).invert(),ho.copy(e.ray).applyMatrix4(mf);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=l){let p=u.getX(y),w=u.getX(y+1),T=tc(this,e,ho,c,p,w,y);T&&t.push(T)}if(this.isLineLoop){let y=u.getX(m-1),g=u.getX(f),p=tc(this,e,ho,c,y,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=l){let p=tc(this,e,ho,c,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=tc(this,e,ho,c,m-1,f,m-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function tc(i,e,t,n,r,s,o){let a=i.geometry.attributes.position;if(wc.fromBufferAttribute(a,r),Ac.fromBufferAttribute(a,s),t.distanceSqToSegment(wc,Ac,qu,gf)>n)return;qu.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(qu);if(!(l<e.near||l>e.far))return{distance:l,point:gf.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var _f=new R,xf=new R,ys=class extends Sc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)_f.fromBufferAttribute(t,r),xf.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+_f.distanceTo(xf);e.setAttribute("lineDistance",new mt(n,1))}else Ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Mc=class extends cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},yf=new _t,th=new Zn,ic=new an,nc=new R,bs=class extends Wt{constructor(e=new Pt,t=new Mc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ic.copy(n.boundingSphere),ic.applyMatrix4(r),ic.radius+=s,e.ray.intersectsSphere(ic)===!1)return;yf.copy(r).invert(),th.copy(e.ray).applyMatrix4(yf);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){let h=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let m=h,y=f;m<y;m++){let g=l.getX(m);nc.fromBufferAttribute(d,g),bf(nc,g,c,r,e,t,this)}}else{let h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let m=h,y=f;m<y;m++)nc.fromBufferAttribute(d,m),bf(nc,m,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function bf(i,e,t,n,r,s,o){let a=th.distanceSqToPoint(i);if(a<t){let c=new R;th.closestPointToPoint(i,c),c.applyMatrix4(n);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Po=class extends li{constructor(e=[],t=sr,n,r,s,o,a,c,l,u){super(e,t,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},vs=class extends li{constructor(e,t,n,r,s,o,a,c,l){super(e,t,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var $n=class extends li{constructor(e,t,n=ji,r,s,o,a=Gt,c=Gt,l,u=sn,d=1){if(u!==sn&&u!==ar)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ms(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ec=class extends $n{constructor(e,t=ji,n=sr,r,s,o=Gt,a=Gt,c,l=sn){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,s,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Bo=class extends li{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},jn=class i extends Pt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],d=[],h=0,f=0;m("z","y","x",-1,-1,n,t,e,o,s,0),m("z","y","x",1,-1,n,t,-e,o,s,1),m("x","z","y",1,1,e,n,t,r,o,2),m("x","z","y",1,-1,e,n,-t,r,o,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(u,3)),this.setAttribute("uv",new mt(d,2));function m(y,g,p,w,T,b,A,S,I,x,E){let P=b/I,F=A/x,N=b/2,V=A/2,B=S/2,U=I+1,H=x+1,Z=0,ne=0,G=new R;for(let j=0;j<H;j++){let ie=j*F-V;for(let Ce=0;Ce<U;Ce++){let Ee=Ce*P-N;G[y]=Ee*w,G[g]=ie*T,G[p]=B,l.push(G.x,G.y,G.z),G[y]=0,G[g]=0,G[p]=S>0?1:-1,u.push(G.x,G.y,G.z),d.push(Ce/I),d.push(1-j/x),Z+=1}}for(let j=0;j<x;j++)for(let ie=0;ie<I;ie++){let Ce=h+ie+U*j,Ee=h+ie+U*(j+1),dt=h+(ie+1)+U*(j+1),st=h+(ie+1)+U*j;c.push(Ce,Ee,st),c.push(Ee,dt,st),ne+=6}a.addGroup(f,ne,E),f+=ne,h+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var ws=class i extends Pt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],h=[],f=[],m=0,y=[],g=n/2,p=0;w(),o===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new mt(d,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(f,2));function w(){let b=new R,A=new R,S=0,I=(t-e)/n;for(let x=0;x<=s;x++){let E=[],P=x/s,F=P*(t-e)+e;for(let N=0;N<=r;N++){let V=N/r,B=V*c+a,U=Math.sin(B),H=Math.cos(B);A.x=F*U,A.y=-P*n+g,A.z=F*H,d.push(A.x,A.y,A.z),b.set(U,I,H).normalize(),h.push(b.x,b.y,b.z),f.push(V,1-P),E.push(m++)}y.push(E)}for(let x=0;x<r;x++)for(let E=0;E<s;E++){let P=y[E][x],F=y[E+1][x],N=y[E+1][x+1],V=y[E][x+1];(e>0||E!==0)&&(u.push(P,F,V),S+=3),(t>0||E!==s-1)&&(u.push(F,N,V),S+=3)}l.addGroup(p,S,0),p+=S}function T(b){let A=m,S=new le,I=new R,x=0,E=b===!0?e:t,P=b===!0?1:-1;for(let N=1;N<=r;N++)d.push(0,g*P,0),h.push(0,P,0),f.push(.5,.5),m++;let F=m;for(let N=0;N<=r;N++){let B=N/r*c+a,U=Math.cos(B),H=Math.sin(B);I.x=E*H,I.y=g*P,I.z=E*U,d.push(I.x,I.y,I.z),h.push(0,P,0),S.x=U*.5+.5,S.y=H*.5*P+.5,f.push(S.x,S.y),m++}for(let N=0;N<r;N++){let V=A+N,B=F+N;b===!0?u.push(B,B+1,V):u.push(B+1,B,V),x+=3}l.addGroup(p,x,b===!0?1:2),p+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},As=class i extends ws{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Ai=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ge("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);let u=n[r],h=n[r+1]-u,f=(o-u)/h;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new le:new R);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new R,r=[],s=[],o=[],a=new R,c=new _t;for(let f=0;f<=e;f++){let m=f/e;r[f]=this.getTangentAt(m,new R)}s[0]=new R,o[0]=new R;let l=Number.MAX_VALUE,u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),h<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(nt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(nt(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(r[m],f*m)),o[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ss=class extends Ai{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new le){let n=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=c-this.aX,f=l-this.aY;c=h*u-f*d+this.aX,l=h*d+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Tc=class extends Ss{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Eh(){let i=0,e=0,t=0,n=0;function r(s,o,a,c){i=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,d){let h=(o-s)/l-(a-s)/(l+u)+(a-o)/u,f=(a-o)/u-(c-o)/(u+d)+(c-a)/d;h*=u,f*=u,r(o,a,h,f)},calc:function(s){let o=s*s,a=o*s;return i+e*s+t*o+n*a}}}var vf=new R,wf=new R,Xu=new Eh,Yu=new Eh,Zu=new Eh,Ms=class extends Ai{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new R){let n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(wf.subVectors(r[0],r[1]).add(r[0]),l=wf);let d=r[a%s],h=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(vf.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=vf),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),Xu.initNonuniformCatmullRom(l.x,d.x,h.x,u.x,m,y,g),Yu.initNonuniformCatmullRom(l.y,d.y,h.y,u.y,m,y,g),Zu.initNonuniformCatmullRom(l.z,d.z,h.z,u.z,m,y,g)}else this.curveType==="catmullrom"&&(Xu.initCatmullRom(l.x,d.x,h.x,u.x,this.tension),Yu.initCatmullRom(l.y,d.y,h.y,u.y,this.tension),Zu.initCatmullRom(l.z,d.z,h.z,u.z,this.tension));return n.set(Xu.calc(c),Yu.calc(c),Zu.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Af(i,e,t,n,r){let s=(n-e)*.5,o=(r-t)*.5,a=i*i,c=i*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*i+t}function D0(i,e){let t=1-i;return t*t*e}function U0(i,e){return 2*(1-i)*i*e}function O0(i,e){return i*i*e}function go(i,e,t,n){return D0(i,e)+U0(i,t)+O0(i,n)}function N0(i,e){let t=1-i;return t*t*t*e}function k0(i,e){let t=1-i;return 3*t*t*i*e}function z0(i,e){return 3*(1-i)*i*i*e}function V0(i,e){return i*i*i*e}function _o(i,e,t,n,r){return N0(i,e)+k0(i,t)+z0(i,n)+V0(i,r)}var Lo=class extends Ai{constructor(e=new le,t=new le,n=new le,r=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new le){let n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(_o(e,r.x,s.x,o.x,a.x),_o(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Cc=class extends Ai{constructor(e=new R,t=new R,n=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new R){let n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(_o(e,r.x,s.x,o.x,a.x),_o(e,r.y,s.y,o.y,a.y),_o(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fo=class extends Ai{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Rc=class extends Ai{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Do=class extends Ai{constructor(e=new le,t=new le,n=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new le){let n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(go(e,r.x,s.x,o.x),go(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Uo=class extends Ai{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){let n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(go(e,r.x,s.x,o.x),go(e,r.y,s.y,o.y),go(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Oo=class extends Ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){let n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],d=r[o>r.length-3?r.length-1:o+2];return n.set(Af(a,c.x,l.x,u.x,d.x),Af(a,c.y,l.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new le().fromArray(r))}return this}},Ic=Object.freeze({__proto__:null,ArcCurve:Tc,CatmullRomCurve3:Ms,CubicBezierCurve:Lo,CubicBezierCurve3:Cc,EllipseCurve:Ss,LineCurve:Fo,LineCurve3:Rc,QuadraticBezierCurve:Do,QuadraticBezierCurve3:Uo,SplineCurve:Oo}),Pc=class extends Ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ic[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new Ic[r.type]().fromJSON(r))}return this}},No=class extends Pc{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Fo(this.currentPoint.clone(),new le(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Do(this.currentPoint.clone(),new le(e,t),new le(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){let a=new Lo(this.currentPoint.clone(),new le(e,t),new le(n,r),new le(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Oo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,r,s,o,a,c),this}absellipse(e,t,n,r,s,o,a,c){let l=new Ss(e,t,n,r,s,o,a,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Es=class extends No{constructor(e){super(e),this.uuid=Pr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new No().fromJSON(r))}return this}};function H0(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=xp(i,0,r,t,!0),o=[];if(!s||s.next===s.prev)return o;let a,c,l;if(n&&(s=Y0(i,e,s,t)),i.length>80*t){a=i[0],c=i[1];let u=a,d=c;for(let h=t;h<r;h+=t){let f=i[h],m=i[h+1];f<a&&(a=f),m<c&&(c=m),f>u&&(u=f),m>d&&(d=m)}l=Math.max(u-a,d-c),l=l!==0?32767/l:0}return ko(s,o,t,a,c,l,0),o}function xp(i,e,t,n,r){let s;if(r===r_(i,e,t,n)>0)for(let o=e;o<t;o+=n)s=Sf(o/n|0,i[o],i[o+1],s);else for(let o=t-n;o>=e;o-=n)s=Sf(o/n|0,i[o],i[o+1],s);return s&&Ts(s,s.next)&&(Vo(s),s=s.next),s}function Mr(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Ts(t,t.next)||Bt(t.prev,t,t.next)===0)){if(Vo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ko(i,e,t,n,r,s,o){if(!i)return;!o&&s&&J0(i,n,r,s);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(s?W0(i,n,r,s):G0(i)){e.push(c.i,i.i,l.i),Vo(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=q0(Mr(i),e),ko(i,e,t,n,r,s,2)):o===2&&X0(i,e,t,n,r,s):ko(Mr(i),e,t,n,r,s,1);break}}}function G0(i){let e=i.prev,t=i,n=i.next;if(Bt(e,t,n)>=0)return!1;let r=e.x,s=t.x,o=n.x,a=e.y,c=t.y,l=n.y,u=Math.min(r,s,o),d=Math.min(a,c,l),h=Math.max(r,s,o),f=Math.max(a,c,l),m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=h&&m.y>=d&&m.y<=f&&fo(r,a,s,c,o,l,m.x,m.y)&&Bt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function W0(i,e,t,n){let r=i.prev,s=i,o=i.next;if(Bt(r,s,o)>=0)return!1;let a=r.x,c=s.x,l=o.x,u=r.y,d=s.y,h=o.y,f=Math.min(a,c,l),m=Math.min(u,d,h),y=Math.max(a,c,l),g=Math.max(u,d,h),p=ih(f,m,e,t,n),w=ih(y,g,e,t,n),T=i.prevZ,b=i.nextZ;for(;T&&T.z>=p&&b&&b.z<=w;){if(T.x>=f&&T.x<=y&&T.y>=m&&T.y<=g&&T!==r&&T!==o&&fo(a,u,c,d,l,h,T.x,T.y)&&Bt(T.prev,T,T.next)>=0||(T=T.prevZ,b.x>=f&&b.x<=y&&b.y>=m&&b.y<=g&&b!==r&&b!==o&&fo(a,u,c,d,l,h,b.x,b.y)&&Bt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;T&&T.z>=p;){if(T.x>=f&&T.x<=y&&T.y>=m&&T.y<=g&&T!==r&&T!==o&&fo(a,u,c,d,l,h,T.x,T.y)&&Bt(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;b&&b.z<=w;){if(b.x>=f&&b.x<=y&&b.y>=m&&b.y<=g&&b!==r&&b!==o&&fo(a,u,c,d,l,h,b.x,b.y)&&Bt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function q0(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Ts(n,r)&&bp(n,t,t.next,r)&&zo(n,r)&&zo(r,n)&&(e.push(n.i,t.i,r.i),Vo(t),Vo(t.next),t=i=r),t=t.next}while(t!==i);return Mr(t)}function X0(i,e,t,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&t_(o,a)){let c=vp(o,a);o=Mr(o,o.next),c=Mr(c,c.next),ko(o,e,t,n,r,s,0),ko(c,e,t,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function Y0(i,e,t,n){let r=[];for(let s=0,o=e.length;s<o;s++){let a=e[s]*n,c=s<o-1?e[s+1]*n:i.length,l=xp(i,a,c,n,!1);l===l.next&&(l.steiner=!0),r.push(e_(l))}r.sort(Z0);for(let s=0;s<r.length;s++)t=$0(r[s],t);return t}function Z0(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function $0(i,e){let t=j0(i,e);if(!t)return e;let n=vp(t,i);return Mr(n,n.next),Mr(t,t.next)}function j0(i,e){let t=e,n=i.x,r=i.y,s=-1/0,o;if(Ts(i,t))return t;do{if(Ts(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let d=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>s&&(s=d,o=t.x<t.next.x?t:t.next,d===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,c=o.x,l=o.y,u=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&yp(r<l?n:s,r,c,l,r<l?s:n,r,t.x,t.y)){let d=Math.abs(r-t.y)/(n-t.x);zo(t,i)&&(d<u||d===u&&(t.x>o.x||t.x===o.x&&K0(o,t)))&&(o=t,u=d)}t=t.next}while(t!==a);return o}function K0(i,e){return Bt(i.prev,i,e.prev)<0&&Bt(e.next,i,i.next)<0}function J0(i,e,t,n){let r=i;do r.z===0&&(r.z=ih(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Q0(r)}function Q0(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,a--):(r=o,o=o.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=o}s.nextZ=null,t*=2}while(e>1);return i}function ih(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function e_(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function yp(i,e,t,n,r,s,o,a){return(r-o)*(e-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(n-a)}function fo(i,e,t,n,r,s,o,a){return!(i===o&&e===a)&&yp(i,e,t,n,r,s,o,a)}function t_(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!i_(i,e)&&(zo(i,e)&&zo(e,i)&&n_(i,e)&&(Bt(i.prev,i,e.prev)||Bt(i,e.prev,e))||Ts(i,e)&&Bt(i.prev,i,i.next)>0&&Bt(e.prev,e,e.next)>0)}function Bt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ts(i,e){return i.x===e.x&&i.y===e.y}function bp(i,e,t,n){let r=sc(Bt(i,e,t)),s=sc(Bt(i,e,n)),o=sc(Bt(t,n,i)),a=sc(Bt(t,n,e));return!!(r!==s&&o!==a||r===0&&rc(i,t,e)||s===0&&rc(i,n,e)||o===0&&rc(t,i,n)||a===0&&rc(t,e,n))}function rc(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function sc(i){return i>0?1:i<0?-1:0}function i_(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&bp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function zo(i,e){return Bt(i.prev,i,i.next)<0?Bt(i,e,i.next)>=0&&Bt(i,i.prev,e)>=0:Bt(i,e,i.prev)<0||Bt(i,i.next,e)<0}function n_(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function vp(i,e){let t=nh(i.i,i.x,i.y),n=nh(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Sf(i,e,t,n){let r=nh(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Vo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function nh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function r_(i,e,t,n){let r=0;for(let s=e,o=t-n;s<t;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}var rh=class{static triangulate(e,t,n=2){return H0(e,t,n)}},wr=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Mf(e),Ef(n,e);let o=e.length;t.forEach(Mf);for(let c=0;c<t.length;c++)r.push(o),o+=t[c].length,Ef(n,t[c]);let a=rh.triangulate(n,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}};function Mf(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Ef(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ho=class i extends Pt{constructor(e=new Es([new le(.5,.5),new le(-.5,.5),new le(-.5,-.5),new le(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let a=0,c=e.length;a<c;a++){let l=e[a];o(l)}this.setAttribute("position",new mt(r,3)),this.setAttribute("uv",new mt(s,2)),this.computeVertexNormals();function o(a){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,w=t.UVGenerator!==void 0?t.UVGenerator:s_,T,b=!1,A,S,I,x;if(p){T=p.getSpacedPoints(u),b=!0,h=!1;let se=p.isCatmullRomCurve3?p.closed:!1;A=p.computeFrenetFrames(u,se),S=new R,I=new R,x=new R}h||(g=0,f=0,m=0,y=0);let E=a.extractPoints(l),P=E.shape,F=E.holes;if(!wr.isClockWise(P)){P=P.reverse();for(let se=0,ue=F.length;se<ue;se++){let de=F[se];wr.isClockWise(de)&&(F[se]=de.reverse())}}function V(se){let de=10000000000000001e-36,fe=se[0];for(let _e=1;_e<=se.length;_e++){let ze=_e%se.length,Ne=se[ze],qe=Ne.x-fe.x,Ve=Ne.y-fe.y,L=qe*qe+Ve*Ve,ft=Math.max(Math.abs(Ne.x),Math.abs(Ne.y),Math.abs(fe.x),Math.abs(fe.y)),tt=de*ft*ft;if(L<=tt){se.splice(ze,1),_e--;continue}fe=Ne}}V(P),F.forEach(V);let B=F.length,U=P;for(let se=0;se<B;se++){let ue=F[se];P=P.concat(ue)}function H(se,ue,de){return ue||Ze("ExtrudeGeometry: vec does not exist"),se.clone().addScaledVector(ue,de)}let Z=P.length;function ne(se,ue,de){let fe,_e,ze,Ne=se.x-ue.x,qe=se.y-ue.y,Ve=de.x-se.x,L=de.y-se.y,ft=Ne*Ne+qe*qe,tt=Ne*L-qe*Ve;if(Math.abs(tt)>Number.EPSILON){let M=Math.sqrt(ft),_=Math.sqrt(Ve*Ve+L*L),z=ue.x-qe/M,W=ue.y+Ne/M,K=de.x-L/_,pe=de.y+Ve/_,me=((K-z)*L-(pe-W)*Ve)/(Ne*L-qe*Ve);fe=z+Ne*me-se.x,_e=W+qe*me-se.y;let J=fe*fe+_e*_e;if(J<=2)return new le(fe,_e);ze=Math.sqrt(J/2)}else{let M=!1;Ne>Number.EPSILON?Ve>Number.EPSILON&&(M=!0):Ne<-Number.EPSILON?Ve<-Number.EPSILON&&(M=!0):Math.sign(qe)===Math.sign(L)&&(M=!0),M?(fe=-qe,_e=Ne,ze=Math.sqrt(ft)):(fe=Ne,_e=qe,ze=Math.sqrt(ft/2))}return new le(fe/ze,_e/ze)}let G=[];for(let se=0,ue=U.length,de=ue-1,fe=se+1;se<ue;se++,de++,fe++)de===ue&&(de=0),fe===ue&&(fe=0),G[se]=ne(U[se],U[de],U[fe]);let j=[],ie,Ce=G.concat();for(let se=0,ue=B;se<ue;se++){let de=F[se];ie=[];for(let fe=0,_e=de.length,ze=_e-1,Ne=fe+1;fe<_e;fe++,ze++,Ne++)ze===_e&&(ze=0),Ne===_e&&(Ne=0),ie[fe]=ne(de[fe],de[ze],de[Ne]);j.push(ie),Ce=Ce.concat(ie)}let Ee;if(g===0)Ee=wr.triangulateShape(U,F);else{let se=[],ue=[];for(let de=0;de<g;de++){let fe=de/g,_e=f*Math.cos(fe*Math.PI/2),ze=m*Math.sin(fe*Math.PI/2)+y;for(let Ne=0,qe=U.length;Ne<qe;Ne++){let Ve=H(U[Ne],G[Ne],ze);ve(Ve.x,Ve.y,-_e),fe===0&&se.push(Ve)}for(let Ne=0,qe=B;Ne<qe;Ne++){let Ve=F[Ne];ie=j[Ne];let L=[];for(let ft=0,tt=Ve.length;ft<tt;ft++){let M=H(Ve[ft],ie[ft],ze);ve(M.x,M.y,-_e),fe===0&&L.push(M)}fe===0&&ue.push(L)}}Ee=wr.triangulateShape(se,ue)}let dt=Ee.length,st=m+y;for(let se=0;se<Z;se++){let ue=h?H(P[se],Ce[se],st):P[se];b?(I.copy(A.normals[0]).multiplyScalar(ue.x),S.copy(A.binormals[0]).multiplyScalar(ue.y),x.copy(T[0]).add(I).add(S),ve(x.x,x.y,x.z)):ve(ue.x,ue.y,0)}for(let se=1;se<=u;se++)for(let ue=0;ue<Z;ue++){let de=h?H(P[ue],Ce[ue],st):P[ue];b?(I.copy(A.normals[se]).multiplyScalar(de.x),S.copy(A.binormals[se]).multiplyScalar(de.y),x.copy(T[se]).add(I).add(S),ve(x.x,x.y,x.z)):ve(de.x,de.y,d/u*se)}for(let se=g-1;se>=0;se--){let ue=se/g,de=f*Math.cos(ue*Math.PI/2),fe=m*Math.sin(ue*Math.PI/2)+y;for(let _e=0,ze=U.length;_e<ze;_e++){let Ne=H(U[_e],G[_e],fe);ve(Ne.x,Ne.y,d+de)}for(let _e=0,ze=F.length;_e<ze;_e++){let Ne=F[_e];ie=j[_e];for(let qe=0,Ve=Ne.length;qe<Ve;qe++){let L=H(Ne[qe],ie[qe],fe);b?ve(L.x,L.y+T[u-1].y,T[u-1].x+de):ve(L.x,L.y,d+de)}}}lt(),Q();function lt(){let se=r.length/3;if(h){let ue=0,de=Z*ue;for(let fe=0;fe<dt;fe++){let _e=Ee[fe];We(_e[2]+de,_e[1]+de,_e[0]+de)}ue=u+g*2,de=Z*ue;for(let fe=0;fe<dt;fe++){let _e=Ee[fe];We(_e[0]+de,_e[1]+de,_e[2]+de)}}else{for(let ue=0;ue<dt;ue++){let de=Ee[ue];We(de[2],de[1],de[0])}for(let ue=0;ue<dt;ue++){let de=Ee[ue];We(de[0]+Z*u,de[1]+Z*u,de[2]+Z*u)}}n.addGroup(se,r.length/3-se,0)}function Q(){let se=r.length/3,ue=0;re(U,ue),ue+=U.length;for(let de=0,fe=F.length;de<fe;de++){let _e=F[de];re(_e,ue),ue+=_e.length}n.addGroup(se,r.length/3-se,1)}function re(se,ue){let de=se.length;for(;--de>=0;){let fe=de,_e=de-1;_e<0&&(_e=se.length-1);for(let ze=0,Ne=u+g*2;ze<Ne;ze++){let qe=Z*ze,Ve=Z*(ze+1),L=ue+fe+qe,ft=ue+_e+qe,tt=ue+_e+Ve,M=ue+fe+Ve;Te(L,ft,tt,M)}}}function ve(se,ue,de){c.push(se),c.push(ue),c.push(de)}function We(se,ue,de){Xe(se),Xe(ue),Xe(de);let fe=r.length/3,_e=w.generateTopUV(n,r,fe-3,fe-2,fe-1);xt(_e[0]),xt(_e[1]),xt(_e[2])}function Te(se,ue,de,fe){Xe(se),Xe(ue),Xe(fe),Xe(ue),Xe(de),Xe(fe);let _e=r.length/3,ze=w.generateSideWallUV(n,r,_e-6,_e-3,_e-2,_e-1);xt(ze[0]),xt(ze[1]),xt(ze[3]),xt(ze[1]),xt(ze[2]),xt(ze[3])}function Xe(se){r.push(c[se*3+0]),r.push(c[se*3+1]),r.push(c[se*3+2])}function xt(se){s.push(se.x),s.push(se.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return o_(t,n,e)}static fromJSON(e,t){let n=[];for(let s=0,o=e.shapes.length;s<o;s++){let a=t[e.shapes[s]];n.push(a)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Ic[r.type]().fromJSON(r)),new i(n,e.options)}},s_={generateTopUV:function(i,e,t,n,r){let s=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[r*3],u=e[r*3+1];return[new le(s,o),new le(a,c),new le(l,u)]},generateSideWallUV:function(i,e,t,n,r,s){let o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],d=e[n*3+2],h=e[r*3],f=e[r*3+1],m=e[r*3+2],y=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new le(o,1-c),new le(l,1-d),new le(h,1-m),new le(y,1-p)]:[new le(a,1-c),new le(u,1-d),new le(f,1-m),new le(g,1-p)]}};function o_(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Er=class i extends Pt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,d=e/a,h=t/c,f=[],m=[],y=[],g=[];for(let p=0;p<u;p++){let w=p*h-o;for(let T=0;T<l;T++){let b=T*d-s;m.push(b,-w,0),y.push(0,0,1),g.push(T/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let w=0;w<a;w++){let T=w+l*p,b=w+l*(p+1),A=w+1+l*(p+1),S=w+1+l*p;f.push(T,b,S),f.push(b,A,S)}this.setIndex(f),this.setAttribute("position",new mt(m,3)),this.setAttribute("normal",new mt(y,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Go=class i extends Pt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new R,h=new R,f=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){let w=[],T=p/n,b=o+T*a,A=e*Math.cos(b),S=Math.sqrt(e*e-A*A),I=0;p===0&&o===0?I=.5/t:p===n&&c===Math.PI&&(I=-.5/t);for(let x=0;x<=t;x++){let E=x/t,P=r+E*s;d.x=-S*Math.cos(P),d.y=A,d.z=S*Math.sin(P),m.push(d.x,d.y,d.z),h.copy(d).normalize(),y.push(h.x,h.y,h.z),g.push(E+I,1-T),w.push(l++)}u.push(w)}for(let p=0;p<n;p++)for(let w=0;w<t;w++){let T=u[p][w+1],b=u[p][w],A=u[p+1][w],S=u[p+1][w+1];(p!==0||o>0)&&f.push(T,b,S),(p!==n-1||c<Math.PI)&&f.push(b,A,S)}this.setIndex(f),this.setAttribute("position",new mt(m,3)),this.setAttribute("normal",new mt(y,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Cs=class i extends Pt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:o,thetaLength:a},n=Math.floor(n),r=Math.floor(r);let c=[],l=[],u=[],d=[],h=new R,f=new R,m=new R;for(let y=0;y<=n;y++){let g=o+y/n*a;for(let p=0;p<=r;p++){let w=p/r*s;f.x=(e+t*Math.cos(g))*Math.cos(w),f.y=(e+t*Math.cos(g))*Math.sin(w),f.z=t*Math.sin(g),l.push(f.x,f.y,f.z),h.x=e*Math.cos(w),h.y=e*Math.sin(w),m.subVectors(f,h).normalize(),u.push(m.x,m.y,m.z),d.push(p/r),d.push(y/n)}}for(let y=1;y<=n;y++)for(let g=1;g<=r;g++){let p=(r+1)*y+g-1,w=(r+1)*(y-1)+g-1,T=(r+1)*(y-1)+g,b=(r+1)*y+g;c.push(p,w,b),c.push(w,T,b)}this.setIndex(c),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(u,3)),this.setAttribute("uv",new mt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Wo=class i extends Pt{constructor(e=new Uo(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new R,c=new R,l=new le,u=new R,d=[],h=[],f=[],m=[];y(),this.setIndex(m),this.setAttribute("position",new mt(d,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(f,2));function y(){for(let T=0;T<t;T++)g(T);g(s===!1?t:0),w(),p()}function g(T){u=e.getPointAt(T/t,u);let b=o.normals[T],A=o.binormals[T];for(let S=0;S<=r;S++){let I=S/r*Math.PI*2,x=Math.sin(I),E=-Math.cos(I);c.x=E*b.x+x*A.x,c.y=E*b.y+x*A.y,c.z=E*b.z+x*A.z,c.normalize(),h.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,d.push(a.x,a.y,a.z)}}function p(){for(let T=1;T<=t;T++)for(let b=1;b<=r;b++){let A=(r+1)*(T-1)+(b-1),S=(r+1)*T+(b-1),I=(r+1)*T+b,x=(r+1)*(T-1)+b;m.push(A,S,x),m.push(S,I,x)}}function w(){for(let T=0;T<=t;T++)for(let b=0;b<=r;b++)l.x=T/t,l.y=b/r,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Ic[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function Br(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(Tf(r))r.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Tf(r[0])){let s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function ri(i){let e={};for(let t=0;t<i.length;t++){let n=Br(i[t]);for(let r in n)e[r]=n[r]}return e}function Tf(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function a_(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Th(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}var In={clone:Br,merge:ri},c_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,l_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Rt=class extends cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=c_,this.fragmentShader=l_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Br(e.uniforms),this.uniformsGroups=a_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new Ye().setHex(r.value);break;case"v2":this.uniforms[n].value=new le().fromArray(r.value);break;case"v3":this.uniforms[n].value=new R().fromArray(r.value);break;case"v4":this.uniforms[n].value=new It().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ke().fromArray(r.value);break;case"m4":this.uniforms[n].value=new _t().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Rs=class extends Rt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Is=class extends cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ll,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Bc=class extends cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=np,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Lc=class extends cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ss(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function $u(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Kn=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let o;i:{n:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break n;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break t}o=t.length;break i}if(!(e>=s)){let a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break t}o=n,n=0;break i}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Fc=class extends Kn{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ju,endingEnd:Ju}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Qu:s=e,a=2*t-n;break;case eh:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Qu:o=e,c=2*n-t;break;case eh:o=1,c=n+r[1]-r[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,m=(n-t)/(r-t),y=m*m,g=y*m,p=-h*g+2*h*y-h*m,w=(1+h)*g+(-1.5-2*h)*y+(-.5+h)*m+1,T=(-1-f)*g+(1.5+f)*y+.5*m,b=f*g-f*y;for(let A=0;A!==a;++A)s[A]=p*o[u+A]+w*o[l+A]+T*o[c+A]+b*o[d+A];return s}},Dc=class extends Kn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(r-t),d=1-u;for(let h=0;h!==a;++h)s[h]=o[l+h]*d+o[c+h]*u;return s}},Uc=class extends Kn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Oc=class extends Kn{interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.inTangents,d=this.outTangents;if(!u||!d){let m=(n-t)/(r-t),y=1-m;for(let g=0;g!==a;++g)s[g]=o[l+g]*y+o[c+g]*m;return s}let h=a*2,f=e-1;for(let m=0;m!==a;++m){let y=o[l+m],g=o[c+m],p=f*h+m*2,w=d[p],T=d[p+1],b=e*h+m*2,A=u[b],S=u[b+1],I=h_(n,t,w,A,r);s[m]=wp(I,y,T,S,g)}return s}};function wp(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function u_(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function h_(i,e,t,n,r){let s=(i-e)/(r-e);for(let o=0;o<8;o++){let a=wp(s,e,t,n,r)-i;if(Math.abs(a)<1e-10)break;let c=u_(s,e,t,n,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-a/c))}return s}var Si=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ss(t,this.TimeBufferType),this.values=ss(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ss(e.times,Array),values:ss(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),$u(e.settings)&&(n.settings={inTangents:ss(e.settings.inTangents,Array),outTangents:ss(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Uc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Dc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Fc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Oc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case xo:t=this.InterpolantFactoryMethodDiscrete;break;case xc:t=this.InterpolantFactoryMethodLinear;break;case cc:t=this.InterpolantFactoryMethodSmooth;break;case Ku:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ge("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xo;case this.InterpolantFactoryMethodLinear:return xc;case this.InterpolantFactoryMethodSmooth:return cc;case this.InterpolantFactoryMethodBezier:return Ku}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;$u(this.settings)&&(Cf(this.settings.inTangents,e),Cf(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ze("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(Ze("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Ze("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Ze("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&Qg(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){Ze("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===cc,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*n,h=d-n,f=d+n;for(let m=0;m!==n;++m){let y=t[d+m];if(y!==t[h+m]||y!==t[f+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*n,h=o*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,$u(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Cf(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Si.prototype.ValueTypeName="";Si.prototype.TimeBufferType=Float32Array;Si.prototype.ValueBufferType=Float32Array;Si.prototype.DefaultInterpolation=xc;var Jn=class extends Si{constructor(e,t,n){super(e,t,n)}};Jn.prototype.ValueTypeName="bool";Jn.prototype.ValueBufferType=Array;Jn.prototype.DefaultInterpolation=xo;Jn.prototype.InterpolantFactoryMethodLinear=void 0;Jn.prototype.InterpolantFactoryMethodSmooth=void 0;var Nc=class extends Si{constructor(e,t,n,r){super(e,t,n,r)}};Nc.prototype.ValueTypeName="color";var kc=class extends Si{constructor(e,t,n,r){super(e,t,n,r)}};kc.prototype.ValueTypeName="number";var zc=class extends Kn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)ni.slerpFlat(s,0,o,l-a,o,l,c);return s}},qo=class extends Si{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new zc(this.times,this.values,this.getValueSize(),e)}};qo.prototype.ValueTypeName="quaternion";qo.prototype.InterpolantFactoryMethodSmooth=void 0;var Qn=class extends Si{constructor(e,t,n){super(e,t,n)}};Qn.prototype.ValueTypeName="string";Qn.prototype.ValueBufferType=Array;Qn.prototype.DefaultInterpolation=xo;Qn.prototype.InterpolantFactoryMethodLinear=void 0;Qn.prototype.InterpolantFactoryMethodSmooth=void 0;var Vc=class extends Si{constructor(e,t,n,r){super(e,t,n,r)}};Vc.prototype.ValueTypeName="vector";var Hc=class{constructor(e,t,n){let r=this,s=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let f=l[d],m=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ap=new Hc,Gc=class{constructor(e){this.manager=e!==void 0?e:Ap,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Gc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ps=class extends Wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Xo=class extends Ps{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ju=new _t,Rf=new R,If=new R,Yo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=pi,this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xs,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Rf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Rf),If.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(If),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){ju.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ju,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,o=r?r.z/s.x:1,a=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===ds||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(ju)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},oc=new R,ac=new ni,nn=new R,Zo=class extends Wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(oc,ac,nn),nn.x===1&&nn.y===1&&nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oc,ac,nn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(oc,ac,nn),nn.x===1&&nn.y===1&&nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oc,ac,nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Xn=new R,Pf=new le,Bf=new le,$t=class extends Zo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ps*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(po*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ps*2*Math.atan(Math.tan(po*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z),Xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z)}getViewSize(e,t){return this.getViewBounds(e,Pf,Bf),t.subVectors(Bf,Pf)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(po*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var sh=class extends Yo{constructor(){super(new $t(90,1,.5,500)),this.isPointLightShadow=!0}},$o=class extends Ps{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new sh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},er=class extends Zo{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},oh=class extends Yo{constructor(){super(new er(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Bs=class extends Ps{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Wt.DEFAULT_UP),this.updateMatrix(),this.target=new Wt,this.shadow=new oh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var os=-90,as=1,Wc=class extends Wt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new $t(os,as,e,t);r.layers=this.layers,this.add(r);let s=new $t(os,as,e,t);s.layers=this.layers,this.add(s);let o=new $t(os,as,e,t);o.layers=this.layers,this.add(o);let a=new $t(os,as,e,t);a.layers=this.layers,this.add(a);let c=new $t(os,as,e,t);c.layers=this.layers,this.add(c);let l=new $t(os,as,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===Yi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ds)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},qc=class extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},jo=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=d_.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function d_(){this._document.hidden===!1&&this.reset()}var Ch="\\[\\]\\.:\\/",f_=new RegExp("["+Ch+"]","g"),Rh="[^"+Ch+"]",p_="[^"+Ch.replace("\\.","")+"]",m_=/((?:WC+[\/:])*)/.source.replace("WC",Rh),g_=/(WCOD+)?/.source.replace("WCOD",p_),__=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Rh),x_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Rh),y_=new RegExp("^"+m_+g_+__+x_+"$"),b_=["material","materials","bones","map"],ah=class{constructor(e,t,n){let r=n||Ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ct=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(f_,"")}static parseTrackName(e){let t=y_.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);b_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ge("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ze("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[r];if(o===void 0){let l=t.nodeName;Ze("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ct.Composite=ah;Ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ct.prototype.GetterByBindingType=[Ct.prototype._getValue_direct,Ct.prototype._getValue_array,Ct.prototype._getValue_arrayElement,Ct.prototype._getValue_toArray];Ct.prototype.SetterByBindingTypeAndVersioning=[[Ct.prototype._setValue_direct,Ct.prototype._setValue_direct_setNeedsUpdate,Ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_array,Ct.prototype._setValue_array_setNeedsUpdate,Ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_arrayElement,Ct.prototype._setValue_arrayElement_setNeedsUpdate,Ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_fromArray,Ct.prototype._setValue_fromArray_setNeedsUpdate,Ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zS=new Float32Array(1);var Ls=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=nt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(nt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var ch=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};var Fs=class extends ys{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new Pt;r.setAttribute("position",new mt(t,3)),r.setAttribute("color",new mt(n,3));let s=new Io({vertexColors:!0,toneMapped:!1});super(r,s),this.type="AxesHelper"}setColors(e,t,n){let r=new Ye,s=this.geometry.attributes.color.array;return r.set(e),r.toArray(s,0),r.toArray(s,3),r.set(t),r.toArray(s,6),r.toArray(s,9),r.set(n),r.toArray(s,12),r.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};var Ko=class extends Zi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Ih(i,e,t,n){let r=v_(n);switch(t){case bh:return i*e;case Qc:return i*e/r.components*r.byteLength;case el:return i*e/r.components*r.byteLength;case cr:return i*e*2/r.components*r.byteLength;case tl:return i*e*2/r.components*r.byteLength;case vh:return i*e*3/r.components*r.byteLength;case Di:return i*e*4/r.components*r.byteLength;case il:return i*e*4/r.components*r.byteLength;case oa:case aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ca:case la:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case rl:case ol:return Math.max(i,16)*Math.max(e,8)/4;case nl:case sl:return Math.max(i,8)*Math.max(e,8)/2;case al:case cl:case ul:case hl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ll:case ua:case dl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ml:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case gl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case xl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case yl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case bl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case vl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case wl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Al:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Sl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ml:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case El:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Tl:case Cl:case Rl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Il:case Pl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ha:case Bl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function v_(i){switch(i){case pi:case gh:return{byteLength:1,components:1};case Os:case _h:case Kt:return{byteLength:2,components:1};case Kc:case Jc:return{byteLength:2,components:4};case ji:case jc:case Fi:return{byteLength:4,components:1};case xh:case yh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xc}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xc);function qp(){let i=null,e=!1,t=null,n=null;function r(s,o){n=i.requestAnimationFrame(r),t(s,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function w_(i){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){let m=d[h],y=d[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++h,d[h]=y)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){let y=d[f];i.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var A_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,S_=`#ifdef USE_ALPHAHASH
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
#endif`,M_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,E_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,T_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,C_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,R_=`#ifdef USE_AOMAP
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
#endif`,I_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,P_=`#ifdef USE_BATCHING
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
#endif`,B_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,L_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,F_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,D_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,U_=`#ifdef USE_IRIDESCENCE
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
#endif`,O_=`#ifdef USE_BUMPMAP
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
#endif`,N_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,k_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,z_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,V_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,H_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,G_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,W_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,q_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,X_=`#define PI 3.141592653589793
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
} // validated`,Y_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Z_=`vec3 transformedNormal = objectNormal;
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
#endif`,$_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,j_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,K_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,J_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Q_="gl_FragColor = linearToOutputTexel( gl_FragColor );",ex=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tx=`#ifdef USE_ENVMAP
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
#endif`,ix=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,nx=`#ifdef USE_ENVMAP
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
#endif`,rx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sx=`#ifdef USE_ENVMAP
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
#endif`,ox=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ax=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ux=`#ifdef USE_GRADIENTMAP
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
}`,hx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,px=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,mx=`#ifdef USE_ENVMAP
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
#endif`,gx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_x=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bx=`PhysicalMaterial material;
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
#endif`,vx=`uniform sampler2D dfgLUT;
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
}`,wx=`
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
#endif`,Ax=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ex=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ix=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Px=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lx=`#if defined( USE_POINTS_UV )
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
#endif`,Fx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ux=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ox=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kx=`#ifdef USE_MORPHTARGETS
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
#endif`,zx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Hx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Gx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Xx=`#ifdef USE_NORMALMAP
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
#endif`,Yx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$x=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Qx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ey=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ty=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,iy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ny=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ry=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,oy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ay=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,cy=`float getShadowMask() {
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
}`,ly=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uy=`#ifdef USE_SKINNING
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
#endif`,hy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dy=`#ifdef USE_SKINNING
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
#endif`,fy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,py=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,my=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,_y=`#ifdef USE_TRANSMISSION
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
#endif`,xy=`#ifdef USE_TRANSMISSION
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
#endif`,yy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,by=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ay=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sy=`uniform sampler2D t2D;
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
}`,My=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ey=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ty=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ry=`#include <common>
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
}`,Iy=`#if DEPTH_PACKING == 3200
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
}`,Py=`#define DISTANCE
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
}`,By=`#define DISTANCE
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
}`,Ly=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dy=`uniform float scale;
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
}`,Uy=`uniform vec3 diffuse;
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
}`,Oy=`#include <common>
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
}`,Ny=`uniform vec3 diffuse;
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
}`,ky=`#define LAMBERT
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
}`,zy=`#define LAMBERT
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
}`,Vy=`#define MATCAP
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
}`,Hy=`#define MATCAP
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
}`,Gy=`#define NORMAL
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
}`,Wy=`#define NORMAL
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
}`,qy=`#define PHONG
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
}`,Xy=`#define PHONG
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
}`,Yy=`#define STANDARD
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
}`,Zy=`#define STANDARD
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
}`,$y=`#define TOON
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
}`,jy=`#define TOON
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
}`,Ky=`uniform float size;
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
}`,Jy=`uniform vec3 diffuse;
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
}`,Qy=`#include <common>
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
}`,eb=`uniform vec3 color;
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
}`,tb=`uniform float rotation;
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
}`,ib=`uniform vec3 diffuse;
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
}`,rt={alphahash_fragment:A_,alphahash_pars_fragment:S_,alphamap_fragment:M_,alphamap_pars_fragment:E_,alphatest_fragment:T_,alphatest_pars_fragment:C_,aomap_fragment:R_,aomap_pars_fragment:I_,batching_pars_vertex:P_,batching_vertex:B_,begin_vertex:L_,beginnormal_vertex:F_,bsdfs:D_,iridescence_fragment:U_,bumpmap_pars_fragment:O_,clipping_planes_fragment:N_,clipping_planes_pars_fragment:k_,clipping_planes_pars_vertex:z_,clipping_planes_vertex:V_,color_fragment:H_,color_pars_fragment:G_,color_pars_vertex:W_,color_vertex:q_,common:X_,cube_uv_reflection_fragment:Y_,defaultnormal_vertex:Z_,displacementmap_pars_vertex:$_,displacementmap_vertex:j_,emissivemap_fragment:K_,emissivemap_pars_fragment:J_,colorspace_fragment:Q_,colorspace_pars_fragment:ex,envmap_fragment:tx,envmap_common_pars_fragment:ix,envmap_pars_fragment:nx,envmap_pars_vertex:rx,envmap_physical_pars_fragment:mx,envmap_vertex:sx,fog_vertex:ox,fog_pars_vertex:ax,fog_fragment:cx,fog_pars_fragment:lx,gradientmap_pars_fragment:ux,lightmap_pars_fragment:hx,lights_lambert_fragment:dx,lights_lambert_pars_fragment:fx,lights_pars_begin:px,lights_toon_fragment:gx,lights_toon_pars_fragment:_x,lights_phong_fragment:xx,lights_phong_pars_fragment:yx,lights_physical_fragment:bx,lights_physical_pars_fragment:vx,lights_fragment_begin:wx,lights_fragment_maps:Ax,lights_fragment_end:Sx,lightprobes_pars_fragment:Mx,logdepthbuf_fragment:Ex,logdepthbuf_pars_fragment:Tx,logdepthbuf_pars_vertex:Cx,logdepthbuf_vertex:Rx,map_fragment:Ix,map_pars_fragment:Px,map_particle_fragment:Bx,map_particle_pars_fragment:Lx,metalnessmap_fragment:Fx,metalnessmap_pars_fragment:Dx,morphinstance_vertex:Ux,morphcolor_vertex:Ox,morphnormal_vertex:Nx,morphtarget_pars_vertex:kx,morphtarget_vertex:zx,normal_fragment_begin:Vx,normal_fragment_maps:Hx,normal_pars_fragment:Gx,normal_pars_vertex:Wx,normal_vertex:qx,normalmap_pars_fragment:Xx,clearcoat_normal_fragment_begin:Yx,clearcoat_normal_fragment_maps:Zx,clearcoat_pars_fragment:$x,iridescence_pars_fragment:jx,opaque_fragment:Kx,packing:Jx,premultiplied_alpha_fragment:Qx,project_vertex:ey,dithering_fragment:ty,dithering_pars_fragment:iy,roughnessmap_fragment:ny,roughnessmap_pars_fragment:ry,shadowmap_pars_fragment:sy,shadowmap_pars_vertex:oy,shadowmap_vertex:ay,shadowmask_pars_fragment:cy,skinbase_vertex:ly,skinning_pars_vertex:uy,skinning_vertex:hy,skinnormal_vertex:dy,specularmap_fragment:fy,specularmap_pars_fragment:py,tonemapping_fragment:my,tonemapping_pars_fragment:gy,transmission_fragment:_y,transmission_pars_fragment:xy,uv_pars_fragment:yy,uv_pars_vertex:by,uv_vertex:vy,worldpos_vertex:wy,background_vert:Ay,background_frag:Sy,backgroundCube_vert:My,backgroundCube_frag:Ey,cube_vert:Ty,cube_frag:Cy,depth_vert:Ry,depth_frag:Iy,distance_vert:Py,distance_frag:By,equirect_vert:Ly,equirect_frag:Fy,linedashed_vert:Dy,linedashed_frag:Uy,meshbasic_vert:Oy,meshbasic_frag:Ny,meshlambert_vert:ky,meshlambert_frag:zy,meshmatcap_vert:Vy,meshmatcap_frag:Hy,meshnormal_vert:Gy,meshnormal_frag:Wy,meshphong_vert:qy,meshphong_frag:Xy,meshphysical_vert:Yy,meshphysical_frag:Zy,meshtoon_vert:$y,meshtoon_frag:jy,points_vert:Ky,points_frag:Jy,shadow_vert:Qy,shadow_frag:eb,sprite_vert:tb,sprite_frag:ib},Ae={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},hn={basic:{uniforms:ri([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:ri([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:ri([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:ri([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:ri([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new Ye(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:ri([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:ri([Ae.points,Ae.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:ri([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:ri([Ae.common,Ae.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:ri([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:ri([Ae.sprite,Ae.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distance:{uniforms:ri([Ae.common,Ae.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distance_vert,fragmentShader:rt.distance_frag},shadow:{uniforms:ri([Ae.lights,Ae.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};hn.physical={uniforms:ri([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var Ul={r:0,b:0,g:0},nb=new _t,Xp=new Ke;Xp.set(-1,0,0,0,1,0,0,0,1);function rb(i,e,t,n,r,s){let o=new Ye(0),a=r===!0?0:1,c,l,u=null,d=0,h=null;function f(w){let T=w.isScene===!0?w.background:null;if(T&&T.isTexture){let b=w.backgroundBlurriness>0;T=e.get(T,b)}return T}function m(w){let T=!1,b=f(w);b===null?g(o,a):b&&b.isColor&&(g(b,1),T=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(w,T){let b=f(T);b&&(b.isCubeTexture||b.mapping===ra)?(l===void 0&&(l=new qt(new jn(1,1,1),new Rt({name:"BackgroundCubeMaterial",uniforms:Br(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,S,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(nb.makeRotationFromEuler(T.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Xp),l.material.toneMapped=ot.getTransfer(b.colorSpace)!==gt,(u!==b||d!==b.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=b,d=b.version,h=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new qt(new Er(2,2),new Rt({name:"BackgroundMaterial",uniforms:Br(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:nr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=ot.getTransfer(b.colorSpace)!==gt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,h=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function g(w,T){w.getRGB(Ul,Th(i)),t.buffers.color.setClear(Ul.r,Ul.g,Ul.b,T,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,T=1){o.set(w),a=T,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(w){a=w,g(o,a)},render:m,addToRenderList:y,dispose:p}}function sb(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null),s=r,o=!1;function a(F,N,V,B,U){let H=!1,Z=d(F,B,V,N);s!==Z&&(s=Z,l(s.object)),H=f(F,B,V,U),H&&m(F,B,V,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,b(F,N,V,B),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return i.createVertexArray()}function l(F){return i.bindVertexArray(F)}function u(F){return i.deleteVertexArray(F)}function d(F,N,V,B){let U=B.wireframe===!0,H=n[N.id];H===void 0&&(H={},n[N.id]=H);let Z=F.isInstancedMesh===!0?F.id:0,ne=H[Z];ne===void 0&&(ne={},H[Z]=ne);let G=ne[V.id];G===void 0&&(G={},ne[V.id]=G);let j=G[U];return j===void 0&&(j=h(c()),G[U]=j),j}function h(F){let N=[],V=[],B=[];for(let U=0;U<t;U++)N[U]=0,V[U]=0,B[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:V,attributeDivisors:B,object:F,attributes:{},index:null}}function f(F,N,V,B){let U=s.attributes,H=N.attributes,Z=0,ne=V.getAttributes();for(let G in ne)if(ne[G].location>=0){let ie=U[G],Ce=H[G];if(Ce===void 0&&(G==="instanceMatrix"&&F.instanceMatrix&&(Ce=F.instanceMatrix),G==="instanceColor"&&F.instanceColor&&(Ce=F.instanceColor)),ie===void 0||ie.attribute!==Ce||Ce&&ie.data!==Ce.data)return!0;Z++}return s.attributesNum!==Z||s.index!==B}function m(F,N,V,B){let U={},H=N.attributes,Z=0,ne=V.getAttributes();for(let G in ne)if(ne[G].location>=0){let ie=H[G];ie===void 0&&(G==="instanceMatrix"&&F.instanceMatrix&&(ie=F.instanceMatrix),G==="instanceColor"&&F.instanceColor&&(ie=F.instanceColor));let Ce={};Ce.attribute=ie,ie&&ie.data&&(Ce.data=ie.data),U[G]=Ce,Z++}s.attributes=U,s.attributesNum=Z,s.index=B}function y(){let F=s.newAttributes;for(let N=0,V=F.length;N<V;N++)F[N]=0}function g(F){p(F,0)}function p(F,N){let V=s.newAttributes,B=s.enabledAttributes,U=s.attributeDivisors;V[F]=1,B[F]===0&&(i.enableVertexAttribArray(F),B[F]=1),U[F]!==N&&(i.vertexAttribDivisor(F,N),U[F]=N)}function w(){let F=s.newAttributes,N=s.enabledAttributes;for(let V=0,B=N.length;V<B;V++)N[V]!==F[V]&&(i.disableVertexAttribArray(V),N[V]=0)}function T(F,N,V,B,U,H,Z){Z===!0?i.vertexAttribIPointer(F,N,V,U,H):i.vertexAttribPointer(F,N,V,B,U,H)}function b(F,N,V,B){y();let U=B.attributes,H=V.getAttributes(),Z=N.defaultAttributeValues;for(let ne in H){let G=H[ne];if(G.location>=0){let j=U[ne];if(j===void 0&&(ne==="instanceMatrix"&&F.instanceMatrix&&(j=F.instanceMatrix),ne==="instanceColor"&&F.instanceColor&&(j=F.instanceColor)),j!==void 0){let ie=j.normalized,Ce=j.itemSize,Ee=e.get(j);if(Ee===void 0)continue;let dt=Ee.buffer,st=Ee.type,lt=Ee.bytesPerElement,Q=st===i.INT||st===i.UNSIGNED_INT||j.gpuType===jc;if(j.isInterleavedBufferAttribute){let re=j.data,ve=re.stride,We=j.offset;if(re.isInstancedInterleavedBuffer){for(let Te=0;Te<G.locationSize;Te++)p(G.location+Te,re.meshPerAttribute);F.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Te=0;Te<G.locationSize;Te++)g(G.location+Te);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let Te=0;Te<G.locationSize;Te++)T(G.location+Te,Ce/G.locationSize,st,ie,ve*lt,(We+Ce/G.locationSize*Te)*lt,Q)}else{if(j.isInstancedBufferAttribute){for(let re=0;re<G.locationSize;re++)p(G.location+re,j.meshPerAttribute);F.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let re=0;re<G.locationSize;re++)g(G.location+re);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let re=0;re<G.locationSize;re++)T(G.location+re,Ce/G.locationSize,st,ie,Ce*lt,Ce/G.locationSize*re*lt,Q)}}else if(Z!==void 0){let ie=Z[ne];if(ie!==void 0)switch(ie.length){case 2:i.vertexAttrib2fv(G.location,ie);break;case 3:i.vertexAttrib3fv(G.location,ie);break;case 4:i.vertexAttrib4fv(G.location,ie);break;default:i.vertexAttrib1fv(G.location,ie)}}}}w()}function A(){E();for(let F in n){let N=n[F];for(let V in N){let B=N[V];for(let U in B){let H=B[U];for(let Z in H)u(H[Z].object),delete H[Z];delete B[U]}}delete n[F]}}function S(F){if(n[F.id]===void 0)return;let N=n[F.id];for(let V in N){let B=N[V];for(let U in B){let H=B[U];for(let Z in H)u(H[Z].object),delete H[Z];delete B[U]}}delete n[F.id]}function I(F){for(let N in n){let V=n[N];for(let B in V){let U=V[B];if(U[F.id]===void 0)continue;let H=U[F.id];for(let Z in H)u(H[Z].object),delete H[Z];delete U[F.id]}}}function x(F){for(let N in n){let V=n[N],B=F.isInstancedMesh===!0?F.id:0,U=V[B];if(U!==void 0){for(let H in U){let Z=U[H];for(let ne in Z)u(Z[ne].object),delete Z[ne];delete U[H]}delete V[B],Object.keys(V).length===0&&delete n[N]}}}function E(){P(),o=!0,s!==r&&(s=r,l(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:E,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:I,initAttributes:y,enableAttribute:g,disableUnusedAttributes:w}}function ob(i,e,t){let n;function r(c){n=c}function s(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function a(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let f=0;f<u;f++)h+=l[f];t.update(h,n,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function ab(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(I){return!(I!==Di&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let x=I===Kt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==pi&&I!==Fi&&!x&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Ge("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:b,maxSamples:A,samples:S}}function cb(i){let e=this,t=null,n=0,r=!1,s=!1,o=new wi,a=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||r;return r=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let m=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!r||m===null||m.length===0||s&&!g)s?u(null):l();else{let w=s?0:n,T=w*4,b=p.clippingState||null;c.value=b,b=u(m,h,T,f);for(let A=0;A!==T;++A)b[A]=t[A];p.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,m){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=c.value,m!==!0||g===null){let p=f+y*4,w=h.matrixWorldInverse;a.getNormalMatrix(w),(g===null||g.length<p)&&(g=new Float32Array(p));for(let T=0,b=f;T!==y;++T,b+=4)o.copy(d[T]).applyMatrix4(w,a),o.normal.toArray(g,b),g[b+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}var zs=4,lb=6,ub=20,hb=256,fa=new er,Sp=new Ye,Ph=null,Bh=0,Lh=0,Fh=!1,db=new R,Lr=new R,Nl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:o=256,position:a=db}=s;Ph=this._renderer.getRenderTarget(),Bh=this._renderer.getActiveCubeFace(),Lh=this._renderer.getActiveMipmapLevel(),Fh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ep(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ph,Bh,Lh),this._renderer.xr.enabled=Fh,e.scissorTest=!1,ks(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===sr||e.mapping===Ir?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ph=this._renderer.getRenderTarget(),Bh=this._renderer.getActiveCubeFace(),Lh=this._renderer.getActiveMipmapLevel(),Fh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:Kt,format:Di,colorSpace:yo,depthBuffer:!1},r=Mp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mp(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=fb(s)),this._blurMaterial=mb(s,e,t),this._ggxMaterial=pb(s,e,t)}return r}_compileMaterial(e){let t=new qt(new Pt,e);this._renderer.compile(t,fa)}_sceneToCubeUV(e,t,n,r,s){let c=new $t(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Sp),d.toneMapping=$i,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qt(new jn,new Sr({name:"PMREM.Background",side:ui,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,p=!1,w=e.background;w?w.isColor&&(g.color.copy(w),e.background=null,p=!0):(g.color.copy(Sp),p=!0);for(let T=0;T<6;T++){let b=T%3;b===0?(c.up.set(0,l[T],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[T],s.y,s.z)):b===1?(c.up.set(0,0,l[T]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[T],s.z)):(c.up.set(0,l[T],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[T]));let A=this._cubeSize;ks(r,b*A,T>2?A:0,A,A),d.setRenderTarget(r),p&&d.render(y,c),d.render(e,c)}d.toneMapping=f,d.autoClear=h,e.background=w}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===sr||e.mapping===Ir;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ep());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;ks(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,fa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=l*1.25,f=d*h,{_lodMax:m}=this,y=this._sizeLods[n],g=3*y*(n>m-zs?n-m+zs:0),p=4*(this._cubeSize-y);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=m-t,ks(s,g,p,3*y,2*y),r.setRenderTarget(s),r.render(a,fa),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-n,ks(e,g,p,3*y,2*y),r.setRenderTarget(e),r.render(a,fa)}_blur(e,t,n,r){let s=this._pingPongRenderTarget,o=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,o),this._blurPass(s,e,n,n,o)}_blurPass(e,t,n,r,s){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[r];c.material=a;let l=a.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[r],d=3*u*(r>this._lodMax-zs?r-this._lodMax+zs:0),h=4*(this._cubeSize-u);ks(t,d,h,3*u,2*u),o.setRenderTarget(t),o.render(c,fa)}};function fb(i){let e=[],t=[],n=i,r=i-zs+1+lb;for(let s=0;s<r;s++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),c=-a,l=1+a,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,h=6,f=3,m=new Float32Array(f*h*d),y=new Float32Array(f*h*d);for(let p=0;p<d;p++){let w=p%3*2/3-1,T=p>2?0:-1,b=[w,T,0,w+2/3,T,0,w+2/3,T+1,0,w,T,0,w+2/3,T+1,0,w,T+1,0];m.set(b,f*h*p);for(let A=0;A<h;A++){let S=u[A*2]*2-1,I=u[A*2+1]*2-1;p===0?Lr.set(1,I,S):p===1?Lr.set(-S,1,-I):p===2?Lr.set(-S,I,1):p===3?Lr.set(-1,I,-S):p===4?Lr.set(-S,-1,I):Lr.set(S,I,-1),Lr.toArray(y,(p*h+A)*f)}}let g=new Pt;g.setAttribute("position",new ci(m,f)),g.setAttribute("outputDirection",new ci(y,f)),t.push(new qt(g,null)),n>zs&&n--}return{lodMeshes:t,sizeLods:e}}function Mp(i,e,t){let n=new Nt(i,e,t);return n.texture.mapping=ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ks(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function pb(i,e,t){return new Rt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:hb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Vl(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function mb(i,e,t){return new Rt({name:"SphericalGaussianBlur",defines:{SAMPLES:ub,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Vl(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Ep(){return new Rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vl(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Tp(){return new Rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Vl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var kl=class extends Nt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Po(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new jn(5,5,5),s=new Rt({name:"CubemapFromEquirect",uniforms:Br(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ui,blending:Li});s.uniforms.tEquirect.value=t;let o=new qt(r,s),a=t.minFilter;return t.minFilter===or&&(t.minFilter=jt),new Wc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}};function gb(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,f=!1){return h==null?null:f?o(h):s(h)}function s(h){if(h&&h.isTexture){let f=h.mapping;if(f===Yc||f===Zc)if(e.has(h)){let m=e.get(h).texture;return a(m,h.mapping)}else{let m=h.image;if(m&&m.height>0){let y=new kl(m.height);return y.fromEquirectangularTexture(i,h),e.set(h,y),h.addEventListener("dispose",l),a(y.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let f=h.mapping,m=f===Yc||f===Zc,y=f===sr||f===Ir;if(m||y){let g=t.get(h),p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new Nl(i)),g=m?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{let w=h.image;return m&&w&&w.height>0||y&&w&&c(w)?(n===null&&(n=new Nl(i)),g=m?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function a(h,f){return f===Yc?h.mapping=sr:f===Zc&&(h.mapping=Ir),h}function c(h){let f=0,m=6;for(let y=0;y<m;y++)h[y]!==void 0&&f++;return f===m}function l(h){let f=h.target;f.removeEventListener("dispose",l);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function _b(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Ar("WebGLRenderer: "+n+" extension not supported."),r}}}function xb(i,e,t,n){let r={},s=new WeakMap;function o(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let m in h.attributes)e.remove(h.attributes[m]);h.removeEventListener("dispose",o),delete r[h.id];let f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function c(d){let h=d.attributes;for(let f in h)e.update(h[f],i.ARRAY_BUFFER)}function l(d){let h=[],f=d.index,m=d.attributes.position,y=0;if(m===void 0)return;if(f!==null){let w=f.array;y=f.version;for(let T=0,b=w.length;T<b;T+=3){let A=w[T+0],S=w[T+1],I=w[T+2];h.push(A,S,S,I,I,A)}}else{let w=m.array;y=m.version;for(let T=0,b=w.length/3-1;T<b;T+=3){let A=T+0,S=T+1,I=T+2;h.push(A,S,S,I,I,A)}}let g=new(m.count>=65535?To:Eo)(h,1);g.version=y;let p=s.get(d);p&&e.remove(p),s.set(d,g)}function u(d){let h=s.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function yb(i,e,t){let n;function r(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,h){i.drawElements(n,h,s,d*o),t.update(h,n,1)}function l(d,h,f){f!==0&&(i.drawElementsInstanced(n,h,s,d*o,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,f);let y=0;for(let g=0;g<f;g++)y+=h[g];t.update(y,n,1)}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function bb(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:Ze("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function vb(i,e,t){let n=new WeakMap,r=new It;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==d){let E=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],T=0;f===!0&&(T=1),m===!0&&(T=2),y===!0&&(T=3);let b=a.attributes.position.count*T,A=1;b>e.maxTextureSize&&(A=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let S=new Float32Array(b*A*4*d),I=new wo(S,b,A,d);I.type=Fi,I.needsUpdate=!0;let x=T*4;for(let P=0;P<d;P++){let F=g[P],N=p[P],V=w[P],B=b*A*4*P;for(let U=0;U<F.count;U++){let H=U*x;f===!0&&(r.fromBufferAttribute(F,U),S[B+H+0]=r.x,S[B+H+1]=r.y,S[B+H+2]=r.z,S[B+H+3]=0),m===!0&&(r.fromBufferAttribute(N,U),S[B+H+4]=r.x,S[B+H+5]=r.y,S[B+H+6]=r.z,S[B+H+7]=0),y===!0&&(r.fromBufferAttribute(V,U),S[B+H+8]=r.x,S[B+H+9]=r.y,S[B+H+10]=r.z,S[B+H+11]=V.itemSize===4?r.w:1)}}h={count:d,texture:I,size:new le(b,A)},n.set(a,h),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let y=0;y<l.length;y++)f+=l[y];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function wb(i,e,t,n,r){let s=new WeakMap;function o(l){let u=r.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return h}function a(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var Ab={[Jo]:"LINEAR_TONE_MAPPING",[Qo]:"REINHARD_TONE_MAPPING",[ea]:"CINEON_TONE_MAPPING",[Rr]:"ACES_FILMIC_TONE_MAPPING",[ia]:"AGX_TONE_MAPPING",[na]:"NEUTRAL_TONE_MAPPING",[ta]:"CUSTOM_TONE_MAPPING"};function Sb(i,e,t,n,r,s){let o=new Nt(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new Pt;l.setAttribute("position",new mt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new mt([0,2,0,0,2,0],2));let u=new Rs({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new qt(l,u),h=new er(-1,1,1,-1,0,1),f=null,m=null,y=!1,g,p=null,w=[],T=!1;this.setSize=function(b,A){o.setSize(b,A),a!==null&&a.setSize(b,A),c!==null&&c.setSize(b,A);for(let S=0;S<w.length;S++){let I=w[S];I.setSize&&I.setSize(b,A)}},this.setEffects=function(b){w=b,T=w.length>0&&w[0].isRenderPass===!0;let A=o.width,S=o.height;w.length>0&&a===null&&(a=new Nt(A,S,{type:Kt,depthBuffer:!1,stencilBuffer:!1}),c=new Nt(A,S,{type:Kt,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<w.length;I++){let x=w[I];x.setSize&&x.setSize(A,S)}},this.begin=function(b,A){if(y||b.toneMapping===$i&&w.length===0)return!1;if(p=A,A!==null){let S=A.width,I=A.height;(o.width!==S||o.height!==I)&&this.setSize(S,I)}return T===!1&&b.setRenderTarget(o),g=b.toneMapping,b.toneMapping=$i,!0},this.hasRenderPass=function(){return T},this.end=function(b,A){b.toneMapping=g,y=!0;let S=o,I=a;for(let x=0;x<w.length;x++){let E=w[x];E.enabled!==!1&&(E.render(b,I,S,A),E.needsSwap!==!1&&(S=I,I=I===a?c:a))}if(f!==b.outputColorSpace||m!==b.toneMapping){f=b.outputColorSpace,m=b.toneMapping,u.defines={},ot.getTransfer(f)===gt&&(u.defines.SRGB_TRANSFER="");let x=Ab[m];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=S.texture,b.setRenderTarget(p),b.render(d,h),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Yp=new li,Oh=new $n(1,1),Zp=new wo,$p=new vc,jp=new Po,Cp=[],Rp=[],Ip=new Float32Array(16),Pp=new Float32Array(9),Bp=new Float32Array(4);function Hs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=Cp[r];if(s===void 0&&(s=new Float32Array(r),Cp[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function zt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Hl(i,e){let t=Rp[e];t===void 0&&(t=new Int32Array(e),Rp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Mb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Eb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),zt(t,e)}}function Tb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),zt(t,e)}}function Cb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),zt(t,e)}}function Rb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;Bp.set(n),i.uniformMatrix2fv(this.addr,!1,Bp),zt(t,n)}}function Ib(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;Pp.set(n),i.uniformMatrix3fv(this.addr,!1,Pp),zt(t,n)}}function Pb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;Ip.set(n),i.uniformMatrix4fv(this.addr,!1,Ip),zt(t,n)}}function Bb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Lb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),zt(t,e)}}function Fb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),zt(t,e)}}function Db(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),zt(t,e)}}function Ub(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ob(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),zt(t,e)}}function Nb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),zt(t,e)}}function kb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),zt(t,e)}}function zb(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Oh.compareFunction=t.isReversedDepthBuffer()?Dl:Fl,s=Oh):s=Yp,t.setTexture2D(e||s,r)}function Vb(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||$p,r)}function Hb(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||jp,r)}function Gb(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Zp,r)}function Wb(i){switch(i){case 5126:return Mb;case 35664:return Eb;case 35665:return Tb;case 35666:return Cb;case 35674:return Rb;case 35675:return Ib;case 35676:return Pb;case 5124:case 35670:return Bb;case 35667:case 35671:return Lb;case 35668:case 35672:return Fb;case 35669:case 35673:return Db;case 5125:return Ub;case 36294:return Ob;case 36295:return Nb;case 36296:return kb;case 35678:case 36198:case 36298:case 36306:case 35682:return zb;case 35679:case 36299:case 36307:return Vb;case 35680:case 36300:case 36308:case 36293:return Hb;case 36289:case 36303:case 36311:case 36292:return Gb}}function qb(i,e){i.uniform1fv(this.addr,e)}function Xb(i,e){let t=Hs(e,this.size,2);i.uniform2fv(this.addr,t)}function Yb(i,e){let t=Hs(e,this.size,3);i.uniform3fv(this.addr,t)}function Zb(i,e){let t=Hs(e,this.size,4);i.uniform4fv(this.addr,t)}function $b(i,e){let t=Hs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function jb(i,e){let t=Hs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Kb(i,e){let t=Hs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Jb(i,e){i.uniform1iv(this.addr,e)}function Qb(i,e){i.uniform2iv(this.addr,e)}function ev(i,e){i.uniform3iv(this.addr,e)}function tv(i,e){i.uniform4iv(this.addr,e)}function iv(i,e){i.uniform1uiv(this.addr,e)}function nv(i,e){i.uniform2uiv(this.addr,e)}function rv(i,e){i.uniform3uiv(this.addr,e)}function sv(i,e){i.uniform4uiv(this.addr,e)}function ov(i,e,t){let n=this.cache,r=e.length,s=Hl(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),zt(n,s));let o;this.type===i.SAMPLER_2D_SHADOW?o=Oh:o=Yp;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function av(i,e,t){let n=this.cache,r=e.length,s=Hl(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),zt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||$p,s[o])}function cv(i,e,t){let n=this.cache,r=e.length,s=Hl(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),zt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||jp,s[o])}function lv(i,e,t){let n=this.cache,r=e.length,s=Hl(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),zt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Zp,s[o])}function uv(i){switch(i){case 5126:return qb;case 35664:return Xb;case 35665:return Yb;case 35666:return Zb;case 35674:return $b;case 35675:return jb;case 35676:return Kb;case 5124:case 35670:return Jb;case 35667:case 35671:return Qb;case 35668:case 35672:return ev;case 35669:case 35673:return tv;case 5125:return iv;case 36294:return nv;case 36295:return rv;case 36296:return sv;case 35678:case 36198:case 36298:case 36306:case 35682:return ov;case 35679:case 36299:case 36307:return av;case 35680:case 36300:case 36308:case 36293:return cv;case 36289:case 36303:case 36311:case 36292:return lv}}var Nh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Wb(t.type)}},kh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uv(t.type)}},zh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],n)}}},Dh=/(\w+)(\])?(\[|\.)?/g;function Lp(i,e){i.seq.push(e),i.map[e.id]=e}function hv(i,e,t){let n=i.name,r=n.length;for(Dh.lastIndex=0;;){let s=Dh.exec(n),o=Dh.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Lp(t,l===void 0?new Nh(a,i,e):new kh(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new zh(a),Lp(t,d)),t=d}}}var Vs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);hv(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&n.push(o)}return n}};function Fp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var dv=37297,fv=0;function pv(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Dp=new Ke;function mv(i){ot._getMatrix(Dp,ot.workingColorSpace,i);let e=`mat3( ${Dp.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case bo:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Up(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+pv(i.getShaderSource(e),a)}else return s}function gv(i,e){let t=mv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var _v={[Jo]:"Linear",[Qo]:"Reinhard",[ea]:"Cineon",[Rr]:"ACESFilmic",[ia]:"AgX",[na]:"Neutral",[ta]:"Custom"};function xv(i,e){let t=_v[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ol=new R;function yv(){ot.getLuminanceCoefficients(Ol);let i=Ol.x.toFixed(4),e=Ol.y.toFixed(4),t=Ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ma).join(`
`)}function vv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function wv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),o=s.name,a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function ma(i){return i!==""}function Op(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Np(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Av=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vh(i){return i.replace(Av,Mv)}var Sv=new Map;function Mv(i,e){let t=rt[e];if(t===void 0){let n=Sv.get(e);if(n!==void 0)t=rt[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Vh(t)}var Ev=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kp(i){return i.replace(Ev,Tv)}function Tv(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function zp(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Cv={[Tr]:"SHADOWMAP_TYPE_PCF",[Ds]:"SHADOWMAP_TYPE_VSM"};function Rv(i){return Cv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Iv={[sr]:"ENVMAP_TYPE_CUBE",[Ir]:"ENVMAP_TYPE_CUBE",[ra]:"ENVMAP_TYPE_CUBE_UV"};function Pv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Iv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Bv={[Ir]:"ENVMAP_MODE_REFRACTION"};function Lv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Bv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Fv={[ph]:"ENVMAP_BLENDING_MULTIPLY",[ep]:"ENVMAP_BLENDING_MIX",[tp]:"ENVMAP_BLENDING_ADD"};function Dv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Fv[i.combine]||"ENVMAP_BLENDING_NONE"}function Uv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Ov(i,e,t,n){let r=i.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Rv(t),l=Pv(t),u=Lv(t),d=Dv(t),h=Uv(t),f=bv(t),m=vv(s),y=r.createProgram(),g,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ma).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ma).join(`
`),p.length>0&&(p+=`
`)):(g=[zp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ma).join(`
`),p=[zp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$i?"#define TONE_MAPPING":"",t.toneMapping!==$i?rt.tonemapping_pars_fragment:"",t.toneMapping!==$i?xv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,gv("linearToOutputTexel",t.outputColorSpace),yv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ma).join(`
`)),o=Vh(o),o=Op(o,t),o=Np(o,t),a=Vh(a),a=Op(a,t),a=Np(a,t),o=kp(o),a=kp(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Ah?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ah?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let T=w+g+o,b=w+p+a,A=Fp(r,r.VERTEX_SHADER,T),S=Fp(r,r.FRAGMENT_SHADER,b);r.attachShader(y,A),r.attachShader(y,S),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function I(F){if(i.debug.checkShaderErrors){let N=r.getProgramInfoLog(y)||"",V=r.getShaderInfoLog(A)||"",B=r.getShaderInfoLog(S)||"",U=N.trim(),H=V.trim(),Z=B.trim(),ne=!0,G=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,A,S);else{let j=Up(r,A,"vertex"),ie=Up(r,S,"fragment");Ze("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+U+`
`+j+`
`+ie)}else U!==""?Ge("WebGLProgram: Program Info Log:",U):(H===""||Z==="")&&(G=!1);G&&(F.diagnostics={runnable:ne,programLog:U,vertexShader:{log:H,prefix:g},fragmentShader:{log:Z,prefix:p}})}r.deleteShader(A),r.deleteShader(S),x=new Vs(r,y),E=wv(r,y)}let x;this.getUniforms=function(){return x===void 0&&I(this),x};let E;this.getAttributes=function(){return E===void 0&&I(this),E};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(y,dv)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=fv++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=A,this.fragmentShader=S,this}var Nv=0,Hh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Gh(e),t.set(e,n)),n}},Gh=class{constructor(e){this.id=Nv++,this.code=e,this.usedTimes=0}};function kv(i){return i===cr||i===ua||i===ha}function zv(i,e,t,n,r,s){let o=new Ao,a=new Hh,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer,h=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function y(x,E,P,F,N,V){let B=F.fog,U=N.geometry,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?F.environment:null,Z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ne=e.get(x.envMap||H,Z),G=ne&&ne.mapping===ra?ne.image.height:null,j=f[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&Ge("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let ie=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Ce=ie!==void 0?ie.length:0,Ee=0;U.morphAttributes.position!==void 0&&(Ee=1),U.morphAttributes.normal!==void 0&&(Ee=2),U.morphAttributes.color!==void 0&&(Ee=3);let dt,st,lt,Q;if(j){let Ie=hn[j];dt=Ie.vertexShader,st=Ie.fragmentShader}else{dt=x.vertexShader,st=x.fragmentShader;let Ie=a.getVertexShaderStage(x),$e=a.getFragmentShaderStage(x);a.update(x,Ie,$e),lt=Ie.id,Q=$e.id}let re=i.getRenderTarget(),ve=i.state.buffers.depth.getReversed(),We=N.isInstancedMesh===!0,Te=N.isBatchedMesh===!0,Xe=!!x.map,xt=!!x.matcap,se=!!ne,ue=!!x.aoMap,de=!!x.lightMap,fe=!!x.bumpMap&&x.wireframe===!1,_e=!!x.normalMap,ze=!!x.displacementMap,Ne=!!x.emissiveMap,qe=!!x.metalnessMap,Ve=!!x.roughnessMap,L=x.anisotropy>0,ft=x.clearcoat>0,tt=x.dispersion>0,M=x.retroreflectivity>0,_=x.iridescence>0,z=x.sheen>0,W=x.transmission>0,K=L&&!!x.anisotropyMap,pe=ft&&!!x.clearcoatMap,me=ft&&!!x.clearcoatNormalMap,J=ft&&!!x.clearcoatRoughnessMap,ee=_&&!!x.iridescenceMap,xe=_&&!!x.iridescenceThicknessMap,Be=z&&!!x.sheenColorMap,we=z&&!!x.sheenRoughnessMap,ye=!!x.specularMap,Ue=!!x.specularColorMap,He=!!x.specularIntensityMap,Je=W&&!!x.transmissionMap,O=W&&!!x.thicknessMap,be=!!x.gradientMap,C=!!x.alphaMap,Y=x.alphaTest>0,oe=!!x.alphaHash,k=!!x.extensions,ae=$i;x.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ae=i.toneMapping);let he={shaderID:j,shaderType:x.type,shaderName:x.name,vertexShader:dt,fragmentShader:st,defines:x.defines,customVertexShaderID:lt,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:Te,batchingColor:Te&&N._colorsTexture!==null,instancing:We,instancingColor:We&&N.instanceColor!==null,instancingMorph:We&&N.morphTexture!==null,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Xe,matcap:xt,envMap:se,envMapMode:se&&ne.mapping,envMapCubeUVHeight:G,aoMap:ue,lightMap:de,bumpMap:fe,normalMap:_e,displacementMap:ze,emissiveMap:Ne,normalMapObjectSpace:_e&&x.normalMapType===rp,normalMapTangentSpace:_e&&x.normalMapType===Ll,packedNormalMap:_e&&x.normalMapType===Ll&&kv(x.normalMap.format),metalnessMap:qe,roughnessMap:Ve,anisotropy:L,anisotropyMap:K,clearcoat:ft,clearcoatMap:pe,clearcoatNormalMap:me,clearcoatRoughnessMap:J,dispersion:tt,retroreflection:M,iridescence:_,iridescenceMap:ee,iridescenceThicknessMap:xe,sheen:z,sheenColorMap:Be,sheenRoughnessMap:we,specularMap:ye,specularColorMap:Ue,specularIntensityMap:He,transmission:W,transmissionMap:Je,thicknessMap:O,gradientMap:be,opaque:x.transparent===!1&&x.blending===Us&&x.alphaToCoverage===!1,alphaMap:C,alphaTest:Y,alphaHash:oe,combine:x.combine,mapUv:Xe&&m(x.map.channel),aoMapUv:ue&&m(x.aoMap.channel),lightMapUv:de&&m(x.lightMap.channel),bumpMapUv:fe&&m(x.bumpMap.channel),normalMapUv:_e&&m(x.normalMap.channel),displacementMapUv:ze&&m(x.displacementMap.channel),emissiveMapUv:Ne&&m(x.emissiveMap.channel),metalnessMapUv:qe&&m(x.metalnessMap.channel),roughnessMapUv:Ve&&m(x.roughnessMap.channel),anisotropyMapUv:K&&m(x.anisotropyMap.channel),clearcoatMapUv:pe&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:me&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Be&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:we&&m(x.sheenRoughnessMap.channel),specularMapUv:ye&&m(x.specularMap.channel),specularColorMapUv:Ue&&m(x.specularColorMap.channel),specularIntensityMapUv:He&&m(x.specularIntensityMap.channel),transmissionMapUv:Je&&m(x.transmissionMap.channel),thicknessMapUv:O&&m(x.thicknessMap.channel),alphaMapUv:C&&m(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(_e||L),vertexNormals:!!U.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!U.attributes.uv&&(Xe||C),fog:!!B,useFog:x.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||U.attributes.normal===void 0&&_e===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ve,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:Ee,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,decodeVideoTexture:Xe&&x.map.isVideoTexture===!0&&ot.getTransfer(x.map.colorSpace)===gt,decodeVideoTextureEmissive:Ne&&x.emissiveMap.isVideoTexture===!0&&ot.getTransfer(x.emissiveMap.colorSpace)===gt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ln,flipSided:x.side===ui,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:k&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(k&&x.extensions.multiDraw===!0||Te)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return he.vertexUv1s=c.has(1),he.vertexUv2s=c.has(2),he.vertexUv3s=c.has(3),c.clear(),he}function g(x){let E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(let P in x.defines)E.push(P),E.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(p(E,x),w(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function p(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function w(x,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function T(x){let E=f[x.type],P;if(E){let F=hn[E];P=In.clone(F.uniforms)}else P=x.uniforms;return P}function b(x,E){let P=u.get(E);return P!==void 0?++P.usedTimes:(P=new Ov(i,E,x,r),l.push(P),u.set(E,P)),P}function A(x){if(--x.usedTimes===0){let E=l.indexOf(x);l[E]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function S(x){a.remove(x)}function I(){a.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:T,acquireProgram:b,releaseProgram:A,releaseShaderCache:S,programs:l,dispose:I}}function Vv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Hv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Vp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Hp(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function a(h,f,m,y,g,p){let w=i[e];return w===void 0?(w={id:h.id,object:h,geometry:f,material:m,materialVariant:o(h),groupOrder:y,renderOrder:h.renderOrder,z:g,group:p},i[e]=w):(w.id=h.id,w.object=h,w.geometry=f,w.material=m,w.materialVariant=o(h),w.groupOrder=y,w.renderOrder=h.renderOrder,w.z=g,w.group=p),e++,w}function c(h,f,m,y,g,p,w){w.reversedDepth===!0&&(g=-g);let T=a(h,f,m,y,g,p);m.transmission>0?n.push(T):m.transparent===!0?r.push(T):t.push(T)}function l(h,f,m,y,g,p){let w=a(h,f,m,y,g,p);m.transmission>0?n.unshift(w):m.transparent===!0?r.unshift(w):t.unshift(w)}function u(h,f){t.length>1&&t.sort(h||Hv),n.length>1&&n.sort(f||Vp),r.length>1&&r.sort(f||Vp)}function d(){for(let h=e,f=i.length;h<f;h++){let m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function Gv(){let i=new WeakMap;function e(n,r){let s=i.get(n),o;return s===void 0?(o=new Hp,i.set(n,[o])):r>=s.length?(o=new Hp,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Wv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new R,color:new Ye};break;case"SpotLight":t={position:new R,direction:new R,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function qv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Xv=0;function Yv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Zv(i){let e=new Wv,t=qv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);let r=new R,s=new _t,o=new _t;function a(l){let u=0,d=0,h=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,w=0,T=0,b=0,A=0,S=0,I=0,x=0,E=0,P=0;l.sort(Yv);for(let N=0,V=l.length;N<V;N++){let B=l[N],U=B.color,H=B.intensity,Z=B.distance,ne=null;if(B.shadow&&B.shadow.map&&(B.shadow.map.texture.format===cr?ne=B.shadow.map.texture:ne=B.shadow.map.depthTexture||B.shadow.map.texture),B.isAmbientLight)u+=U.r*H,d+=U.g*H,h+=U.b*H;else if(B.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(B.sh.coefficients[G],H);P++}else if(B.isSunLight){let G=e.get(B);if(G.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let j=B.shadow,ie=t.get(B);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[m]=ie,n.sunShadowMap[m]=ne;let Ce=j.getViewportCount();for(let Ee=0;Ee<Ce;Ee++)n.sunShadowMatrix[y+Ee]=j.getMatrix(Ee),n.sunShadowCascade[y+Ee]=j._cascadeData[Ee];y+=Ce,m++}n.sun[f]=G,f++}else if(B.isDirectionalLight){let G=e.get(B);if(G.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let j=B.shadow,ie=t.get(B);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.directionalShadow[g]=ie,n.directionalShadowMap[g]=ne,n.directionalShadowMatrix[g]=B.shadow.matrix,A++}n.directional[g]=G,g++}else if(B.isSpotLight){let G=e.get(B);G.position.setFromMatrixPosition(B.matrixWorld),G.color.copy(U).multiplyScalar(H),G.distance=Z,G.coneCos=Math.cos(B.angle),G.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),G.decay=B.decay,n.spot[w]=G;let j=B.shadow;if(B.map&&(n.spotLightMap[x]=B.map,x++,j.updateMatrices(B),B.castShadow&&E++),n.spotLightMatrix[w]=j.matrix,B.castShadow){let ie=t.get(B);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.spotShadow[w]=ie,n.spotShadowMap[w]=ne,I++}w++}else if(B.isRectAreaLight){let G=e.get(B);G.color.copy(U).multiplyScalar(H),G.halfWidth.set(B.width*.5,0,0),G.halfHeight.set(0,B.height*.5,0),n.rectArea[T]=G,T++}else if(B.isPointLight){let G=e.get(B);if(G.color.copy(B.color).multiplyScalar(B.intensity),G.distance=B.distance,G.decay=B.decay,B.castShadow){let j=B.shadow,ie=t.get(B);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,ie.shadowCameraNear=j.camera.near,ie.shadowCameraFar=j.camera.far,n.pointShadow[p]=ie,n.pointShadowMap[p]=ne,n.pointShadowMatrix[p]=B.shadow.matrix,S++}n.point[p]=G,p++}else if(B.isHemisphereLight){let G=e.get(B);G.skyColor.copy(B.color).multiplyScalar(H),G.groundColor.copy(B.groundColor).multiplyScalar(H),n.hemi[b]=G,b++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let F=n.hash;(F.sunLength!==f||F.directionalLength!==g||F.pointLength!==p||F.spotLength!==w||F.rectAreaLength!==T||F.hemiLength!==b||F.numSunShadows!==m||F.numDirectionalShadows!==A||F.numPointShadows!==S||F.numSpotShadows!==I||F.numSpotMaps!==x||F.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=g,n.spot.length=w,n.rectArea.length=T,n.point.length=p,n.hemi.length=b,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=I,n.spotShadowMap.length=I,n.spotLightMatrix.length=I+x-E,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=P,F.sunLength=f,F.directionalLength=g,F.pointLength=p,F.spotLength=w,F.rectAreaLength=T,F.hemiLength=b,F.numSunShadows=m,F.numDirectionalShadows=A,F.numPointShadows=S,F.numSpotShadows=I,F.numSpotMaps=x,F.numLightProbes=P,n.version=Xv++)}function c(l,u){let d=0,h=0,f=0,m=0,y=0,g=0,p=u.matrixWorldInverse;for(let w=0,T=l.length;w<T;w++){let b=l[w];if(b.isSunLight){let A=n.sun[d];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(p),d++}else if(b.isDirectionalLight){let A=n.directional[h];A.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),h++}else if(b.isSpotLight){let A=n.spot[m];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),m++}else if(b.isRectAreaLight){let A=n.rectArea[y];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),o.identity(),s.copy(b.matrixWorld),s.premultiply(p),o.extractRotation(s),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),y++}else if(b.isPointLight){let A=n.point[f];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){let A=n.hemi[g];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(p),g++}}}return{setup:a,setupView:c,state:n}}function Gp(i){let e=new Zv(i),t=[],n=[],r=[];function s(h){d.camera=h,t.length=0,n.length=0,r.length=0}function o(h){t.push(h)}function a(h){n.push(h)}function c(h){r.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function $v(i){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new Gp(i),e.set(r,[a])):s>=o.length?(a=new Gp(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var jv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kv=`uniform sampler2D shadow_pass;
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
}`,Jv=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Qv=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Wp=new _t,pa=new R,Uh=new R;function ew(i,e,t){let n=new xs,r=new le,s=new le,o=new It,a=new Bc,c=new Lc,l={},u=t.maxTextureSize,d={[nr]:ui,[ui]:nr,[ln]:ln},h=new Rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:jv,fragmentShader:Kv}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let m=new Pt;m.setAttribute("position",new ci(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new qt(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tr;let p=this.type;this.render=function(S,I,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===Df&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Tr);let E=i.getRenderTarget(),P=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Li),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let V=p!==this.type;V&&I.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(U=>U.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,U=S.length;B<U;B++){let H=S[B],Z=H.shadow;if(Z===void 0){Ge("WebGLShadowMap:",H,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);let ne=Z.getFrameExtents();r.multiply(ne),s.copy(Z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ne.x),r.x=s.x*ne.x,Z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ne.y),r.y=s.y*ne.y,Z.mapSize.y=s.y));let G=i.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=G,Z.map===null||V===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===Ds){if(H.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new Nt(r.x,r.y,{format:cr,type:Kt,minFilter:jt,magFilter:jt,generateMipmaps:!1}),Z.map.texture.name=H.name+".shadowMap",Z.map.depthTexture=new $n(r.x,r.y,Fi),Z.map.depthTexture.name=H.name+".shadowMapDepth",Z.map.depthTexture.format=sn,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Gt,Z.map.depthTexture.magFilter=Gt}else H.isPointLight?(Z.map=new kl(r.x),Z.map.depthTexture=new Ec(r.x,ji)):(Z.map=new Nt(r.x,r.y),Z.map.depthTexture=new $n(r.x,r.y,ji)),Z.map.depthTexture.name=H.name+".shadowMap",Z.map.depthTexture.format=sn,this.type===Tr?(Z.map.depthTexture.compareFunction=G?Dl:Fl,Z.map.depthTexture.minFilter=jt,Z.map.depthTexture.magFilter=jt):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Gt,Z.map.depthTexture.magFilter=Gt);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==r.x||Z.map.height!==r.y)&&Z.map.setSize(r.x,r.y);let j=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();H.isPointLight!==!0&&Z.updateMatrices(H,x);for(let ie=0;ie<j;ie++){let Ce=Z.getCamera(ie);if(H.isPointLight){let Ee=Z.camera,dt=Z.matrix,st=H.distance||Ee.far;st!==Ee.far&&(Ee.far=st,Ee.updateProjectionMatrix()),pa.setFromMatrixPosition(H.matrixWorld),Ee.position.copy(pa),Uh.copy(Ee.position),Uh.add(Jv[ie]),Ee.up.copy(Qv[ie]),Ee.lookAt(Uh),Ee.updateMatrixWorld(),dt.makeTranslation(-pa.x,-pa.y,-pa.z),Wp.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(Wp,Ee.coordinateSystem,Ee.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)i.setRenderTarget(Z.map,ie),i.clear();else{ie===0&&(i.setRenderTarget(Z.map),i.clear());let Ee=Z.getViewport(ie);o.set(s.x*Ee.x,s.y*Ee.y,s.x*Ee.z,s.y*Ee.w),N.viewport(o)}n=Z.getFrustum(ie),b(I,x,Ce,H,this.type)}Z.isPointLightShadow!==!0&&this.type===Ds&&w(Z,x),Z.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(E,P,F)};function w(S,I){let x=e.update(y);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null?S.mapPass=new Nt(r.x,r.y,{format:cr,type:Kt}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(I,null,x,h,y,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(I,null,x,f,y,null)}function T(S,I,x,E){let P=null,F=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(F!==void 0)P=F;else if(P=x.isPointLight===!0?c:a,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let N=P.uuid,V=I.uuid,B=l[N];B===void 0&&(B={},l[N]=B);let U=B[V];U===void 0&&(U=P.clone(),B[V]=U,I.addEventListener("dispose",A)),P=U}if(P.visible=I.visible,P.wireframe=I.wireframe,E===Ds?P.side=I.shadowSide!==null?I.shadowSide:I.side:P.side=I.shadowSide!==null?I.shadowSide:d[I.side],P.alphaMap=I.alphaMap,P.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,P.map=I.map,P.clipShadows=I.clipShadows,P.clippingPlanes=I.clippingPlanes,P.clipIntersection=I.clipIntersection,P.displacementMap=I.displacementMap,P.displacementScale=I.displacementScale,P.displacementBias=I.displacementBias,P.wireframeLinewidth=I.wireframeLinewidth,P.linewidth=I.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let N=i.properties.get(P);N.light=x}return P}function b(S,I,x,E,P){if(S.visible===!1)return;if(S.layers.test(I.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===Ds)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let V=e.update(S),B=S.material;if(Array.isArray(B)){let U=V.groups;for(let H=0,Z=U.length;H<Z;H++){let ne=U[H],G=B[ne.materialIndex];if(G&&G.visible){let j=T(S,G,E,P);S.onBeforeShadow(i,S,I,x,V,j,ne),i.renderBufferDirect(x,null,V,j,S,ne),S.onAfterShadow(i,S,I,x,V,j,ne)}}}else if(B.visible){let U=T(S,B,E,P);S.onBeforeShadow(i,S,I,x,V,U,null),i.renderBufferDirect(x,null,V,U,S,null),S.onAfterShadow(i,S,I,x,V,U,null)}}let N=S.children;for(let V=0,B=N.length;V<B;V++)b(N[V],I,x,E,P)}function A(S){S.target.removeEventListener("dispose",A);for(let x in l){let E=l[x],P=S.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function tw(i,e){function t(){let O=!1,be=new It,C=null,Y=new It(0,0,0,0);return{setMask:function(oe){C!==oe&&!O&&(i.colorMask(oe,oe,oe,oe),C=oe)},setLocked:function(oe){O=oe},setClear:function(oe,k,ae,he,Ie){Ie===!0&&(oe*=he,k*=he,ae*=he),be.set(oe,k,ae,he),Y.equals(be)===!1&&(i.clearColor(oe,k,ae,he),Y.copy(be))},reset:function(){O=!1,C=null,Y.set(-1,0,0,0)}}}function n(){let O=!1,be=!1,C=null,Y=null,oe=null;return{setReversed:function(k){if(be!==k){let ae=e.get("EXT_clip_control");k?ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.ZERO_TO_ONE_EXT):ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.NEGATIVE_ONE_TO_ONE_EXT),be=k;let he=oe;oe=null,this.setClear(he)}},getReversed:function(){return be},setTest:function(k){k?re(i.DEPTH_TEST):ve(i.DEPTH_TEST)},setMask:function(k){C!==k&&!O&&(i.depthMask(k),C=k)},setFunc:function(k){if(be&&(k=gp[k]),Y!==k){switch(k){case uc:i.depthFunc(i.NEVER);break;case hc:i.depthFunc(i.ALWAYS);break;case dc:i.depthFunc(i.LESS);break;case us:i.depthFunc(i.LEQUAL);break;case fc:i.depthFunc(i.EQUAL);break;case pc:i.depthFunc(i.GEQUAL);break;case mc:i.depthFunc(i.GREATER);break;case gc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Y=k}},setLocked:function(k){O=k},setClear:function(k){oe!==k&&(oe=k,be&&(k=1-k),i.clearDepth(k))},reset:function(){O=!1,C=null,Y=null,oe=null,be=!1}}}function r(){let O=!1,be=null,C=null,Y=null,oe=null,k=null,ae=null,he=null,Ie=null;return{setTest:function($e){O||($e?re(i.STENCIL_TEST):ve(i.STENCIL_TEST))},setMask:function($e){be!==$e&&!O&&(i.stencilMask($e),be=$e)},setFunc:function($e,je,yt){(C!==$e||Y!==je||oe!==yt)&&(i.stencilFunc($e,je,yt),C=$e,Y=je,oe=yt)},setOp:function($e,je,yt){(k!==$e||ae!==je||he!==yt)&&(i.stencilOp($e,je,yt),k=$e,ae=je,he=yt)},setLocked:function($e){O=$e},setClear:function($e){Ie!==$e&&(i.clearStencil($e),Ie=$e)},reset:function(){O=!1,be=null,C=null,Y=null,oe=null,k=null,ae=null,he=null,Ie=null}}}let s=new t,o=new n,a=new r,c=new WeakMap,l=new WeakMap,u={},d={},h={},f=new WeakMap,m=[],y=null,g=!1,p=null,w=null,T=null,b=null,A=null,S=null,I=null,x=new Ye(0,0,0),E=0,P=!1,F=null,N=null,V=null,B=null,U=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,ne=0,G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(G)[1]),Z=ne>=1):G.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),Z=ne>=2);let j=null,ie={},Ce=i.getParameter(i.SCISSOR_BOX),Ee=i.getParameter(i.VIEWPORT),dt=new It().fromArray(Ce),st=new It().fromArray(Ee);function lt(O,be,C,Y){let oe=new Uint8Array(4),k=i.createTexture();i.bindTexture(O,k),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ae=0;ae<C;ae++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(be,0,i.RGBA,1,1,Y,0,i.RGBA,i.UNSIGNED_BYTE,oe):i.texImage2D(be+ae,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,oe);return k}let Q={};Q[i.TEXTURE_2D]=lt(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=lt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=lt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=lt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(i.DEPTH_TEST),o.setFunc(us),fe(!1),_e(lh),re(i.CULL_FACE),ue(Li);function re(O){u[O]!==!0&&(i.enable(O),u[O]=!0)}function ve(O){u[O]!==!1&&(i.disable(O),u[O]=!1)}function We(O,be){return h[O]!==be?(i.bindFramebuffer(O,be),h[O]=be,O===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=be),O===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=be),!0):!1}function Te(O,be){let C=m,Y=!1;if(O){C=f.get(be),C===void 0&&(C=[],f.set(be,C));let oe=O.textures;if(C.length!==oe.length||C[0]!==i.COLOR_ATTACHMENT0){for(let k=0,ae=oe.length;k<ae;k++)C[k]=i.COLOR_ATTACHMENT0+k;C.length=oe.length,Y=!0}}else C[0]!==i.BACK&&(C[0]=i.BACK,Y=!0);Y&&i.drawBuffers(C)}function Xe(O){return y!==O?(i.useProgram(O),y=O,!0):!1}let xt={[Cr]:i.FUNC_ADD,[Of]:i.FUNC_SUBTRACT,[Nf]:i.FUNC_REVERSE_SUBTRACT};xt[kf]=i.MIN,xt[zf]=i.MAX;let se={[Vf]:i.ZERO,[Hf]:i.ONE,[Gf]:i.SRC_COLOR,[dh]:i.SRC_ALPHA,[$f]:i.SRC_ALPHA_SATURATE,[Yf]:i.DST_COLOR,[qf]:i.DST_ALPHA,[Wf]:i.ONE_MINUS_SRC_COLOR,[fh]:i.ONE_MINUS_SRC_ALPHA,[Zf]:i.ONE_MINUS_DST_COLOR,[Xf]:i.ONE_MINUS_DST_ALPHA,[jf]:i.CONSTANT_COLOR,[Kf]:i.ONE_MINUS_CONSTANT_COLOR,[Jf]:i.CONSTANT_ALPHA,[Qf]:i.ONE_MINUS_CONSTANT_ALPHA};function ue(O,be,C,Y,oe,k,ae,he,Ie,$e){if(O===Li){g===!0&&(ve(i.BLEND),g=!1);return}if(g===!1&&(re(i.BLEND),g=!0),O!==Uf){if(O!==p||$e!==P){if((w!==Cr||A!==Cr)&&(i.blendEquation(i.FUNC_ADD),w=Cr,A=Cr),$e)switch(O){case Us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rr:i.blendFunc(i.ONE,i.ONE);break;case uh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case hh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ze("WebGLState: Invalid blending: ",O);break}else switch(O){case Us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case uh:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case hh:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",O);break}T=null,b=null,S=null,I=null,x.set(0,0,0),E=0,p=O,P=$e}return}oe=oe||be,k=k||C,ae=ae||Y,(be!==w||oe!==A)&&(i.blendEquationSeparate(xt[be],xt[oe]),w=be,A=oe),(C!==T||Y!==b||k!==S||ae!==I)&&(i.blendFuncSeparate(se[C],se[Y],se[k],se[ae]),T=C,b=Y,S=k,I=ae),(he.equals(x)===!1||Ie!==E)&&(i.blendColor(he.r,he.g,he.b,Ie),x.copy(he),E=Ie),p=O,P=!1}function de(O,be){O.side===ln?ve(i.CULL_FACE):re(i.CULL_FACE);let C=O.side===ui;be&&(C=!C),fe(C),O.blending===Us&&O.transparent===!1?ue(Li):ue(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);let Y=O.stencilWrite;a.setTest(Y),Y&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ne(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):ve(i.SAMPLE_ALPHA_TO_COVERAGE)}function fe(O){F!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),F=O)}function _e(O){O!==Lf?(re(i.CULL_FACE),O!==N&&(O===lh?i.cullFace(i.BACK):O===Ff?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ve(i.CULL_FACE),N=O}function ze(O){O!==V&&(Z&&i.lineWidth(O),V=O)}function Ne(O,be,C){O?(re(i.POLYGON_OFFSET_FILL),(B!==be||U!==C)&&(B=be,U=C,o.getReversed()&&(be=-be),i.polygonOffset(be,C))):ve(i.POLYGON_OFFSET_FILL)}function qe(O){O?re(i.SCISSOR_TEST):ve(i.SCISSOR_TEST)}function Ve(O){O===void 0&&(O=i.TEXTURE0+H-1),j!==O&&(i.activeTexture(O),j=O)}function L(O,be,C){C===void 0&&(j===null?C=i.TEXTURE0+H-1:C=j);let Y=ie[C];Y===void 0&&(Y={type:void 0,texture:void 0},ie[C]=Y),(Y.type!==O||Y.texture!==be)&&(j!==C&&(i.activeTexture(C),j=C),i.bindTexture(O,be||Q[O]),Y.type=O,Y.texture=be)}function ft(){let O=ie[j];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function tt(){try{i.compressedTexImage2D(...arguments)}catch(O){Ze("WebGLState:",O)}}function M(){try{i.compressedTexImage3D(...arguments)}catch(O){Ze("WebGLState:",O)}}function _(){try{i.texSubImage2D(...arguments)}catch(O){Ze("WebGLState:",O)}}function z(){try{i.texSubImage3D(...arguments)}catch(O){Ze("WebGLState:",O)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(O){Ze("WebGLState:",O)}}function K(){try{i.compressedTexSubImage3D(...arguments)}catch(O){Ze("WebGLState:",O)}}function pe(){try{i.texStorage2D(...arguments)}catch(O){Ze("WebGLState:",O)}}function me(){try{i.texStorage3D(...arguments)}catch(O){Ze("WebGLState:",O)}}function J(){try{i.texImage2D(...arguments)}catch(O){Ze("WebGLState:",O)}}function ee(){try{i.texImage3D(...arguments)}catch(O){Ze("WebGLState:",O)}}function xe(O){return d[O]!==void 0?d[O]:i.getParameter(O)}function Be(O,be){d[O]!==be&&(i.pixelStorei(O,be),d[O]=be)}function we(O){dt.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),dt.copy(O))}function ye(O){st.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),st.copy(O))}function Ue(O,be){let C=l.get(be);C===void 0&&(C=new WeakMap,l.set(be,C));let Y=C.get(O);Y===void 0&&(Y=i.getUniformBlockIndex(be,O.name),C.set(O,Y))}function He(O,be){let Y=l.get(be).get(O);c.get(be)!==Y&&(i.uniformBlockBinding(be,Y,O.__bindingPointIndex),c.set(be,Y))}function Je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},j=null,ie={},h={},f=new WeakMap,m=[],y=null,g=!1,p=null,w=null,T=null,b=null,A=null,S=null,I=null,x=new Ye(0,0,0),E=0,P=!1,F=null,N=null,V=null,B=null,U=null,dt.set(0,0,i.canvas.width,i.canvas.height),st.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:ve,bindFramebuffer:We,drawBuffers:Te,useProgram:Xe,setBlending:ue,setMaterial:de,setFlipSided:fe,setCullFace:_e,setLineWidth:ze,setPolygonOffset:Ne,setScissorTest:qe,activeTexture:Ve,bindTexture:L,unbindTexture:ft,compressedTexImage2D:tt,compressedTexImage3D:M,texImage2D:J,texImage3D:ee,pixelStorei:Be,getParameter:xe,updateUBOMapping:Ue,uniformBlockBinding:He,texStorage2D:pe,texStorage3D:me,texSubImage2D:_,texSubImage3D:z,compressedTexSubImage2D:W,compressedTexSubImage3D:K,scissor:we,viewport:ye,reset:Je}}function iw(i,e,t,n,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new le,u=new WeakMap,d=new Set,h,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(M,_){return m?new OffscreenCanvas(M,_):vo("canvas")}function g(M,_,z){let W=1,K=tt(M);if((K.width>z||K.height>z)&&(W=z/Math.max(K.width,K.height)),W<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){let pe=Math.floor(W*K.width),me=Math.floor(W*K.height);h===void 0&&(h=y(pe,me));let J=_?y(pe,me):h;return J.width=pe,J.height=me,J.getContext("2d").drawImage(M,0,0,pe,me),Ge("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+pe+"x"+me+")."),J}else return"data"in M&&Ge("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),M;return M}function p(M){return M.generateMipmaps}function w(M){i.generateMipmap(M)}function T(M){return M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?i.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(M,_,z,W,K,pe=!1){if(M!==null){if(i[M]!==void 0)return i[M];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let me;W&&(me=e.get("EXT_texture_norm16"),me||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=_;if(_===i.RED&&(z===i.FLOAT&&(J=i.R32F),z===i.HALF_FLOAT&&(J=i.R16F),z===i.UNSIGNED_BYTE&&(J=i.R8),z===i.UNSIGNED_SHORT&&me&&(J=me.R16_EXT),z===i.SHORT&&me&&(J=me.R16_SNORM_EXT)),_===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(J=i.R8UI),z===i.UNSIGNED_SHORT&&(J=i.R16UI),z===i.UNSIGNED_INT&&(J=i.R32UI),z===i.BYTE&&(J=i.R8I),z===i.SHORT&&(J=i.R16I),z===i.INT&&(J=i.R32I)),_===i.RG&&(z===i.FLOAT&&(J=i.RG32F),z===i.HALF_FLOAT&&(J=i.RG16F),z===i.UNSIGNED_BYTE&&(J=i.RG8),z===i.UNSIGNED_SHORT&&me&&(J=me.RG16_EXT),z===i.SHORT&&me&&(J=me.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(J=i.RG8UI),z===i.UNSIGNED_SHORT&&(J=i.RG16UI),z===i.UNSIGNED_INT&&(J=i.RG32UI),z===i.BYTE&&(J=i.RG8I),z===i.SHORT&&(J=i.RG16I),z===i.INT&&(J=i.RG32I)),_===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(J=i.RGB8UI),z===i.UNSIGNED_SHORT&&(J=i.RGB16UI),z===i.UNSIGNED_INT&&(J=i.RGB32UI),z===i.BYTE&&(J=i.RGB8I),z===i.SHORT&&(J=i.RGB16I),z===i.INT&&(J=i.RGB32I)),_===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),z===i.UNSIGNED_INT&&(J=i.RGBA32UI),z===i.BYTE&&(J=i.RGBA8I),z===i.SHORT&&(J=i.RGBA16I),z===i.INT&&(J=i.RGBA32I)),_===i.RGB&&(z===i.UNSIGNED_SHORT&&me&&(J=me.RGB16_EXT),z===i.SHORT&&me&&(J=me.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),_===i.RGBA){let ee=pe?bo:ot.getTransfer(K);z===i.FLOAT&&(J=i.RGBA32F),z===i.HALF_FLOAT&&(J=i.RGBA16F),z===i.UNSIGNED_BYTE&&(J=ee===gt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&me&&(J=me.RGBA16_EXT),z===i.SHORT&&me&&(J=me.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function A(M,_){let z;return M?_===null||_===ji||_===Ns?z=i.DEPTH24_STENCIL8:_===Fi?z=i.DEPTH32F_STENCIL8:_===Os&&(z=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ji||_===Ns?z=i.DEPTH_COMPONENT24:_===Fi?z=i.DEPTH_COMPONENT32F:_===Os&&(z=i.DEPTH_COMPONENT16),z}function S(M,_){return p(M)===!0||M.isFramebufferTexture&&M.minFilter!==Gt&&M.minFilter!==jt?Math.log2(Math.max(_.width,_.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?_.mipmaps.length:1}function I(M){let _=M.target;_.removeEventListener("dispose",I),E(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&d.delete(_)}function x(M){let _=M.target;_.removeEventListener("dispose",x),F(_)}function E(M){let _=n.get(M);if(_.__webglInit===void 0)return;let z=M.source,W=f.get(z);if(W){let K=W[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&P(M),Object.keys(W).length===0&&f.delete(z)}n.remove(M)}function P(M){let _=n.get(M);i.deleteTexture(_.__webglTexture);let z=M.source,W=f.get(z);delete W[_.__cacheKey],o.memory.textures--}function F(M){let _=n.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),n.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let K=0;K<_.__webglFramebuffer[W].length;K++)i.deleteFramebuffer(_.__webglFramebuffer[W][K]);else i.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)i.deleteFramebuffer(_.__webglFramebuffer[W]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let z=M.textures;for(let W=0,K=z.length;W<K;W++){let pe=n.get(z[W]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),o.memory.textures--),n.remove(z[W])}n.remove(M)}let N=0;function V(){N=0}function B(){return N}function U(M){N=M}function H(){let M=N;return M>=r.maxTextures&&Ge("WebGLTextures: Trying to use "+(M+1)+" texture units while this GPU supports only "+r.maxTextures),N+=1,M}function Z(M){let _=[];return _.push(M.wrapS),_.push(M.wrapT),_.push(M.wrapR||0),_.push(M.magFilter),_.push(M.minFilter),_.push(M.anisotropy),_.push(M.internalFormat),_.push(M.format),_.push(M.type),_.push(M.generateMipmaps),_.push(M.premultiplyAlpha),_.push(M.flipY),_.push(M.unpackAlignment),_.push(M.colorSpace),_.join()}function ne(M,_){let z=n.get(M);if(M.isVideoTexture&&L(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&z.__version!==M.version){let W=M.image;if(W===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{ve(z,M,_);return}}else M.isExternalTexture&&(z.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+_)}function G(M,_){let z=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&z.__version!==M.version){ve(z,M,_);return}else M.isExternalTexture&&(z.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+_)}function j(M,_){let z=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&z.__version!==M.version){ve(z,M,_);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+_)}function ie(M,_){let z=n.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&z.__version!==M.version){We(z,M,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+_)}let Ce={[hs]:i.REPEAT,[rn]:i.CLAMP_TO_EDGE,[_c]:i.MIRRORED_REPEAT},Ee={[Gt]:i.NEAREST,[ip]:i.NEAREST_MIPMAP_NEAREST,[sa]:i.NEAREST_MIPMAP_LINEAR,[jt]:i.LINEAR,[$c]:i.LINEAR_MIPMAP_NEAREST,[or]:i.LINEAR_MIPMAP_LINEAR},dt={[op]:i.NEVER,[hp]:i.ALWAYS,[ap]:i.LESS,[Fl]:i.LEQUAL,[cp]:i.EQUAL,[Dl]:i.GEQUAL,[lp]:i.GREATER,[up]:i.NOTEQUAL};function st(M,_){if(_.type===Fi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===jt||_.magFilter===$c||_.magFilter===sa||_.magFilter===or||_.minFilter===jt||_.minFilter===$c||_.minFilter===sa||_.minFilter===or)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(M,i.TEXTURE_WRAP_S,Ce[_.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,Ce[_.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,Ce[_.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,Ee[_.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,Ee[_.minFilter]),_.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,dt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Gt||_.minFilter!==sa&&_.minFilter!==or||_.type===Fi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(M,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function lt(M,_){let z=!1;M.__webglInit===void 0&&(M.__webglInit=!0,_.addEventListener("dispose",I));let W=_.source,K=f.get(W);K===void 0&&(K={},f.set(W,K));let pe=Z(_);if(pe!==M.__cacheKey){K[pe]===void 0&&(K[pe]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),K[pe].usedTimes++;let me=K[M.__cacheKey];me!==void 0&&(K[M.__cacheKey].usedTimes--,me.usedTimes===0&&P(_)),M.__cacheKey=pe,M.__webglTexture=K[pe].texture}return z}function Q(M,_,z){return Math.floor(Math.floor(M/z)/_)}function re(M,_,z,W){let pe=M.updateRanges;if(pe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,z,W,_.data);else{pe.sort((Be,we)=>Be.start-we.start);let me=0;for(let Be=1;Be<pe.length;Be++){let we=pe[me],ye=pe[Be],Ue=we.start+we.count,He=Q(ye.start,_.width,4),Je=Q(we.start,_.width,4);ye.start<=Ue+1&&He===Je&&Q(ye.start+ye.count-1,_.width,4)===He?we.count=Math.max(we.count,ye.start+ye.count-we.start):(++me,pe[me]=ye)}pe.length=me+1;let J=t.getParameter(i.UNPACK_ROW_LENGTH),ee=t.getParameter(i.UNPACK_SKIP_PIXELS),xe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Be=0,we=pe.length;Be<we;Be++){let ye=pe[Be],Ue=Math.floor(ye.start/4),He=Math.ceil(ye.count/4),Je=Ue%_.width,O=Math.floor(Ue/_.width),be=He,C=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Je),t.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,Je,O,be,C,z,W,_.data)}M.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,J),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(i.UNPACK_SKIP_ROWS,xe)}}function ve(M,_,z){let W=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=i.TEXTURE_3D);let K=lt(M,_),pe=_.source;t.bindTexture(W,M.__webglTexture,i.TEXTURE0+z);let me=n.get(pe);if(pe.version!==me.__version||K===!0){if(t.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let C=ot.getPrimaries(ot.workingColorSpace),Y=_.colorSpace===Rn?null:ot.getPrimaries(_.colorSpace),oe=_.colorSpace===Rn||C===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let ee=g(_.image,!1,r.maxTextureSize);ee=ft(_,ee);let xe=s.convert(_.format,_.colorSpace),Be=s.convert(_.type),we=b(_.internalFormat,xe,Be,_.normalized,_.colorSpace,_.isVideoTexture);st(W,_);let ye,Ue=_.mipmaps,He=_.isVideoTexture!==!0,Je=me.__version===void 0||K===!0,O=pe.dataReady,be=S(_,ee);if(_.isDepthTexture)we=A(_.format===ar,_.type),Je&&(He?t.texStorage2D(i.TEXTURE_2D,1,we,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,we,ee.width,ee.height,0,xe,Be,null));else if(_.isDataTexture)if(Ue.length>0){He&&Je&&t.texStorage2D(i.TEXTURE_2D,be,we,Ue[0].width,Ue[0].height);for(let C=0,Y=Ue.length;C<Y;C++)ye=Ue[C],He?O&&t.texSubImage2D(i.TEXTURE_2D,C,0,0,ye.width,ye.height,xe,Be,ye.data):t.texImage2D(i.TEXTURE_2D,C,we,ye.width,ye.height,0,xe,Be,ye.data);_.generateMipmaps=!1}else He?(Je&&t.texStorage2D(i.TEXTURE_2D,be,we,ee.width,ee.height),O&&re(_,ee,xe,Be)):t.texImage2D(i.TEXTURE_2D,0,we,ee.width,ee.height,0,xe,Be,ee.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){He&&Je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,we,Ue[0].width,Ue[0].height,ee.depth);for(let C=0,Y=Ue.length;C<Y;C++)if(ye=Ue[C],_.format!==Di)if(xe!==null)if(He){if(O)if(_.layerUpdates.size>0){let oe=Ih(ye.width,ye.height,_.format,_.type);for(let k of _.layerUpdates){let ae=ye.data.subarray(k*oe/ye.data.BYTES_PER_ELEMENT,(k+1)*oe/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,C,0,0,k,ye.width,ye.height,1,xe,ae)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,C,0,0,0,ye.width,ye.height,ee.depth,xe,ye.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,C,we,ye.width,ye.height,ee.depth,0,ye.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?O&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,C,0,0,0,ye.width,ye.height,ee.depth,xe,Be,ye.data):t.texImage3D(i.TEXTURE_2D_ARRAY,C,we,ye.width,ye.height,ee.depth,0,xe,Be,ye.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{He&&Je&&t.texStorage2D(i.TEXTURE_2D,be,we,Ue[0].width,Ue[0].height);for(let C=0,Y=Ue.length;C<Y;C++)ye=Ue[C],_.format!==Di?xe!==null?He?O&&t.compressedTexSubImage2D(i.TEXTURE_2D,C,0,0,ye.width,ye.height,xe,ye.data):t.compressedTexImage2D(i.TEXTURE_2D,C,we,ye.width,ye.height,0,ye.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?O&&t.texSubImage2D(i.TEXTURE_2D,C,0,0,ye.width,ye.height,xe,Be,ye.data):t.texImage2D(i.TEXTURE_2D,C,we,ye.width,ye.height,0,xe,Be,ye.data)}else if(_.isDataArrayTexture)if(He){if(Je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,we,ee.width,ee.height,ee.depth),O)if(_.layerUpdates.size>0){let C=Ih(ee.width,ee.height,_.format,_.type);for(let Y of _.layerUpdates){let oe=ee.data.subarray(Y*C/ee.data.BYTES_PER_ELEMENT,(Y+1)*C/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Y,ee.width,ee.height,1,xe,Be,oe)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,xe,Be,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,we,ee.width,ee.height,ee.depth,0,xe,Be,ee.data);else if(_.isData3DTexture)He?(Je&&t.texStorage3D(i.TEXTURE_3D,be,we,ee.width,ee.height,ee.depth),O&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,xe,Be,ee.data)):t.texImage3D(i.TEXTURE_3D,0,we,ee.width,ee.height,ee.depth,0,xe,Be,ee.data);else if(_.isFramebufferTexture){if(Je)if(He)t.texStorage2D(i.TEXTURE_2D,be,we,ee.width,ee.height);else{let C=ee.width,Y=ee.height;for(let oe=0;oe<be;oe++)t.texImage2D(i.TEXTURE_2D,oe,we,C,Y,0,xe,Be,null),C>>=1,Y>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let C=i.canvas;if(C.hasAttribute("layoutsubtree")||C.setAttribute("layoutsubtree","true"),ee.parentNode!==C){C.appendChild(ee),d.add(_),C.onpaint=Y=>{let oe=Y.changedElements;for(let k of d)oe.includes(k.image)&&(k.needsUpdate=!0)},C.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ee);else{let oe=i.RGBA,k=i.RGBA,ae=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,oe,k,ae,ee)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(He&&Je){let C=tt(Ue[0]);t.texStorage2D(i.TEXTURE_2D,be,we,C.width,C.height)}for(let C=0,Y=Ue.length;C<Y;C++)ye=Ue[C],He?O&&t.texSubImage2D(i.TEXTURE_2D,C,0,0,xe,Be,ye):t.texImage2D(i.TEXTURE_2D,C,we,xe,Be,ye);_.generateMipmaps=!1}else if(He){if(Je){let C=tt(ee);t.texStorage2D(i.TEXTURE_2D,be,we,C.width,C.height)}O&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,Be,ee)}else t.texImage2D(i.TEXTURE_2D,0,we,xe,Be,ee);p(_)&&w(W),me.__version=pe.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function We(M,_,z){if(_.image.length!==6)return;let W=lt(M,_),K=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+z);let pe=n.get(K);if(K.version!==pe.__version||W===!0){t.activeTexture(i.TEXTURE0+z);let me=ot.getPrimaries(ot.workingColorSpace),J=_.colorSpace===Rn?null:ot.getPrimaries(_.colorSpace),ee=_.colorSpace===Rn||me===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let xe=_.isCompressedTexture||_.image[0].isCompressedTexture,Be=_.image[0]&&_.image[0].isDataTexture,we=[];for(let k=0;k<6;k++)!xe&&!Be?we[k]=g(_.image[k],!0,r.maxCubemapSize):we[k]=Be?_.image[k].image:_.image[k],we[k]=ft(_,we[k]);let ye=we[0],Ue=s.convert(_.format,_.colorSpace),He=s.convert(_.type),Je=b(_.internalFormat,Ue,He,_.normalized,_.colorSpace),O=_.isVideoTexture!==!0,be=pe.__version===void 0||W===!0,C=K.dataReady,Y=S(_,ye);st(i.TEXTURE_CUBE_MAP,_);let oe;if(xe){O&&be&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Y,Je,ye.width,ye.height);for(let k=0;k<6;k++){oe=we[k].mipmaps;for(let ae=0;ae<oe.length;ae++){let he=oe[ae];_.format!==Di?Ue!==null?O?C&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,ae,0,0,he.width,he.height,Ue,he.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,ae,Je,he.width,he.height,0,he.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?C&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,ae,0,0,he.width,he.height,Ue,He,he.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,ae,Je,he.width,he.height,0,Ue,He,he.data)}}}else{if(oe=_.mipmaps,O&&be){oe.length>0&&Y++;let k=tt(we[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Y,Je,k.width,k.height)}for(let k=0;k<6;k++)if(Be){O?C&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,0,0,we[k].width,we[k].height,Ue,He,we[k].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,Je,we[k].width,we[k].height,0,Ue,He,we[k].data);for(let ae=0;ae<oe.length;ae++){let Ie=oe[ae].image[k].image;O?C&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,ae+1,0,0,Ie.width,Ie.height,Ue,He,Ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,ae+1,Je,Ie.width,Ie.height,0,Ue,He,Ie.data)}}else{O?C&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,0,0,Ue,He,we[k]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,Je,Ue,He,we[k]);for(let ae=0;ae<oe.length;ae++){let he=oe[ae];O?C&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,ae+1,0,0,Ue,He,he.image[k]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+k,ae+1,Je,Ue,He,he.image[k])}}}p(_)&&w(i.TEXTURE_CUBE_MAP),pe.__version=K.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function Te(M,_,z,W,K,pe){let me=s.convert(z.format,z.colorSpace),J=s.convert(z.type),ee=b(z.internalFormat,me,J,z.normalized,z.colorSpace),xe=n.get(_),Be=n.get(z);if(Be.__renderTarget=_,!xe.__hasExternalTextures){let we=Math.max(1,_.width>>pe),ye=Math.max(1,_.height>>pe);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,pe,ee,we,ye,_.depth,0,me,J,null):t.texImage2D(K,pe,ee,we,ye,0,me,J,null)}t.bindFramebuffer(i.FRAMEBUFFER,M),Ve(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,K,Be.__webglTexture,0,qe(_)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,K,Be.__webglTexture,pe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(M,_,z){if(i.bindRenderbuffer(i.RENDERBUFFER,M),_.depthBuffer){let W=_.depthTexture,K=W&&W.isDepthTexture?W.type:null,pe=A(_.stencilBuffer,K),me=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ve(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qe(_),pe,_.width,_.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,qe(_),pe,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,pe,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,me,i.RENDERBUFFER,M)}else{let W=_.textures;for(let K=0;K<W.length;K++){let pe=W[K],me=s.convert(pe.format,pe.colorSpace),J=s.convert(pe.type),ee=b(pe.internalFormat,me,J,pe.normalized,pe.colorSpace);Ve(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qe(_),ee,_.width,_.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,qe(_),ee,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ee,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xt(M,_,z){let W=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,M),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(_.depthTexture);if(K.__renderTarget=_,(!K.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),W){if(K.__webglInit===void 0&&(K.__webglInit=!0,_.depthTexture.addEventListener("dispose",I)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),st(i.TEXTURE_CUBE_MAP,_.depthTexture);let xe=s.convert(_.depthTexture.format),Be=s.convert(_.depthTexture.type),we;_.depthTexture.format===sn?we=i.DEPTH_COMPONENT24:_.depthTexture.format===ar&&(we=i.DEPTH24_STENCIL8);for(let ye=0;ye<6;ye++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,we,_.width,_.height,0,xe,Be,null)}}else ne(_.depthTexture,0);let pe=K.__webglTexture,me=qe(_),J=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,ee=_.depthTexture.format===ar?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===sn)Ve(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,J,pe,0,me):i.framebufferTexture2D(i.FRAMEBUFFER,ee,J,pe,0);else if(_.depthTexture.format===ar)Ve(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,J,pe,0,me):i.framebufferTexture2D(i.FRAMEBUFFER,ee,J,pe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function se(M){let _=n.get(M),z=M.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==M.depthTexture){let W=M.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){let K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",K)};W.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=W}if(M.depthTexture&&!_.__autoAllocateDepthBuffer)if(z)for(let W=0;W<6;W++)xt(_.__webglFramebuffer[W],M,W);else{let W=M.texture.mipmaps;W&&W.length>0?xt(_.__webglFramebuffer[0],M,0):xt(_.__webglFramebuffer,M,0)}else if(z){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=i.createRenderbuffer(),Xe(_.__webglDepthbuffer[W],M,!1);else{let K=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=_.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,pe)}}else{let W=M.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Xe(_.__webglDepthbuffer,M,!1);else{let K=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,pe)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(M,_,z){let W=n.get(M);_!==void 0&&Te(W.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&se(M)}function de(M){let _=M.texture,z=n.get(M),W=n.get(_);M.addEventListener("dispose",x);let K=M.textures,pe=M.isWebGLCubeRenderTarget===!0,me=K.length>1;if(me||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=_.version,o.memory.textures++),pe){z.__webglFramebuffer=[];for(let J=0;J<6;J++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[J]=[];for(let ee=0;ee<_.mipmaps.length;ee++)z.__webglFramebuffer[J][ee]=i.createFramebuffer()}else z.__webglFramebuffer[J]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let J=0;J<_.mipmaps.length;J++)z.__webglFramebuffer[J]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(me)for(let J=0,ee=K.length;J<ee;J++){let xe=n.get(K[J]);xe.__webglTexture===void 0&&(xe.__webglTexture=i.createTexture(),o.memory.textures++)}if(M.samples>0&&Ve(M)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let J=0;J<K.length;J++){let ee=K[J];z.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[J]);let xe=s.convert(ee.format,ee.colorSpace),Be=s.convert(ee.type),we=b(ee.internalFormat,xe,Be,ee.normalized,ee.colorSpace,M.isXRRenderTarget===!0),ye=qe(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,we,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,z.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Xe(z.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pe){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),st(i.TEXTURE_CUBE_MAP,_);for(let J=0;J<6;J++)if(_.mipmaps&&_.mipmaps.length>0)for(let ee=0;ee<_.mipmaps.length;ee++)Te(z.__webglFramebuffer[J][ee],M,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ee);else Te(z.__webglFramebuffer[J],M,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);p(_)&&w(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){for(let J=0,ee=K.length;J<ee;J++){let xe=K[J],Be=n.get(xe),we=i.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(we=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(we,Be.__webglTexture),st(we,xe),Te(z.__webglFramebuffer,M,xe,i.COLOR_ATTACHMENT0+J,we,0),p(xe)&&w(we)}t.unbindTexture()}else{let J=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(J=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(J,W.__webglTexture),st(J,_),_.mipmaps&&_.mipmaps.length>0)for(let ee=0;ee<_.mipmaps.length;ee++)Te(z.__webglFramebuffer[ee],M,_,i.COLOR_ATTACHMENT0,J,ee);else Te(z.__webglFramebuffer,M,_,i.COLOR_ATTACHMENT0,J,0);p(_)&&w(J),t.unbindTexture()}M.depthBuffer&&se(M)}function fe(M){let _=M.textures;for(let z=0,W=_.length;z<W;z++){let K=_[z];if(p(K)){let pe=T(M),me=n.get(K).__webglTexture;t.bindTexture(pe,me),w(pe),t.unbindTexture()}}}let _e=[],ze=[];function Ne(M){if(M.samples>0){if(Ve(M)===!1){let _=M.textures,z=M.width,W=M.height,K=i.COLOR_BUFFER_BIT,pe=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=n.get(M),J=_.length>1;if(J)for(let xe=0;xe<_.length;xe++)t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer);let ee=M.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let xe=0;xe<_.length;xe++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,me.__webglColorRenderbuffer[xe]);let Be=n.get(_[xe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Be,0)}i.blitFramebuffer(0,0,z,W,0,0,z,W,K,i.NEAREST),c===!0&&(_e.length=0,ze.length=0,_e.push(i.COLOR_ATTACHMENT0+xe),M.depthBuffer&&M.storeMultisampledDepthBuffer===!1&&(_e.push(pe),ze.push(pe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ze)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_e))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let xe=0;xe<_.length;xe++){t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,me.__webglColorRenderbuffer[xe]);let Be=n.get(_[xe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,Be,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.storeMultisampledDepthBuffer===!1&&c){let _=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function qe(M){return Math.min(r.maxSamples,M.samples)}function Ve(M){let _=n.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function L(M){let _=o.render.frame;u.get(M)!==_&&(u.set(M,_),M.update())}function ft(M,_){let z=M.colorSpace,W=M.format,K=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||z!==yo&&z!==Rn&&(ot.getTransfer(z)===gt?(W!==Di||K!==pi)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",z)),_}function tt(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(l.width=M.naturalWidth||M.width,l.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(l.width=M.displayWidth,l.height=M.displayHeight):(l.width=M.width,l.height=M.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=V,this.getTextureUnits=B,this.setTextureUnits=U,this.setTexture2D=ne,this.setTexture2DArray=G,this.setTexture3D=j,this.setTextureCube=ie,this.rebindTextures=ue,this.setupRenderTarget=de,this.updateRenderTargetMipmap=fe,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=se,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function nw(i,e){function t(n,r=Rn){let s,o=ot.getTransfer(r);if(n===pi)return i.UNSIGNED_BYTE;if(n===Kc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Jc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===gh)return i.BYTE;if(n===_h)return i.SHORT;if(n===Os)return i.UNSIGNED_SHORT;if(n===jc)return i.INT;if(n===ji)return i.UNSIGNED_INT;if(n===Fi)return i.FLOAT;if(n===Kt)return i.HALF_FLOAT;if(n===bh)return i.ALPHA;if(n===vh)return i.RGB;if(n===Di)return i.RGBA;if(n===sn)return i.DEPTH_COMPONENT;if(n===ar)return i.DEPTH_STENCIL;if(n===Qc)return i.RED;if(n===el)return i.RED_INTEGER;if(n===cr)return i.RG;if(n===tl)return i.RG_INTEGER;if(n===il)return i.RGBA_INTEGER;if(n===oa||n===aa||n===ca||n===la)if(o===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===oa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===aa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ca)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===la)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===oa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===aa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ca)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===la)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===nl||n===rl||n===sl||n===ol)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===nl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===rl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===sl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ol)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===al||n===cl||n===ll||n===ul||n===hl||n===ua||n===dl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===al||n===cl)return o===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ll)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===ul)return s.COMPRESSED_R11_EAC;if(n===hl)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ua)return s.COMPRESSED_RG11_EAC;if(n===dl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===fl||n===pl||n===ml||n===gl||n===_l||n===xl||n===yl||n===bl||n===vl||n===wl||n===Al||n===Sl||n===Ml||n===El)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===fl)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===pl)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ml)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===gl)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===_l)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xl)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===yl)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bl)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vl)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===wl)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Al)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sl)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ml)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===El)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Tl||n===Cl||n===Rl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Tl)return o===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Cl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Rl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Il||n===Pl||n===ha||n===Bl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Il)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Pl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ha)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Bl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ns?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var rw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sw=`
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

}`,Wh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Bo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Rt({vertexShader:rw,fragmentShader:sw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qt(new Er(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qh=class extends Zi{constructor(e,t){super();let n=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,m=null,y=typeof XRWebGLBinding<"u",g=new Wh,p={},w=t.getContextAttributes(),T=null,b=null,A=[],S=[],I=new le,x=null,E=null,P=new $t;P.viewport=new It;let F=new $t;F.viewport=new It;let N=[P,F],V=new qc,B=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let re=A[Q];return re===void 0&&(re=new gs,A[Q]=re),re.getTargetRaySpace()},this.getControllerGrip=function(Q){let re=A[Q];return re===void 0&&(re=new gs,A[Q]=re),re.getGripSpace()},this.getHand=function(Q){let re=A[Q];return re===void 0&&(re=new gs,A[Q]=re),re.getHandSpace()};function H(Q){let re=S.indexOf(Q.inputSource);if(re===-1)return;let ve=A[re];ve!==void 0&&(ve.update(Q.inputSource,Q.frame,l||o),ve.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Z(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",ne);for(let Q=0;Q<A.length;Q++){let re=S[Q];re!==null&&(S[Q]=null,A[Q].disconnect(re))}B=null,U=null,g.reset();for(let Q in p)delete p[Q];if(e.setRenderTarget(T),f=null,h=null,d=null,r=null,b=null,lt.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(I.width,I.height,!1),E!==null){let Q=E.camera;Q.fov=E.fov,Q.zoom=E.zoom,Q.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(T=e.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",ne),w.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(I),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,We=null,Te=null;w.depth&&(Te=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=w.stencil?ar:sn,We=w.stencil?Ns:ji);let Xe={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(Xe),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new Nt(h.textureWidth,h.textureHeight,{format:Di,type:pi,depthTexture:new $n(h.textureWidth,h.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let ve={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ve),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Nt(f.framebufferWidth,f.framebufferHeight,{format:Di,type:pi,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),lt.setContext(r),lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ne(Q){for(let re=0;re<Q.removed.length;re++){let ve=Q.removed[re],We=S.indexOf(ve);We>=0&&(S[We]=null,A[We].disconnect(ve))}for(let re=0;re<Q.added.length;re++){let ve=Q.added[re],We=S.indexOf(ve);if(We===-1){for(let Xe=0;Xe<A.length;Xe++)if(Xe>=S.length){S.push(ve),We=Xe;break}else if(S[Xe]===null){S[Xe]=ve,We=Xe;break}if(We===-1)break}let Te=A[We];Te&&Te.connect(ve)}}let G=new R,j=new R;function ie(Q,re,ve){G.setFromMatrixPosition(re.matrixWorld),j.setFromMatrixPosition(ve.matrixWorld);let We=G.distanceTo(j),Te=re.projectionMatrix.elements,Xe=ve.projectionMatrix.elements,xt=Te[14]/(Te[10]-1),se=Te[14]/(Te[10]+1),ue=(Te[9]+1)/Te[5],de=(Te[9]-1)/Te[5],fe=(Te[8]-1)/Te[0],_e=(Xe[8]+1)/Xe[0],ze=xt*fe,Ne=xt*_e,qe=We/(-fe+_e),Ve=qe*-fe;if(re.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Ve),Q.translateZ(qe),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Te[10]===-1)Q.projectionMatrix.copy(re.projectionMatrix),Q.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{let L=xt+qe,ft=se+qe,tt=ze-Ve,M=Ne+(We-Ve),_=ue*se/ft*L,z=de*se/ft*L;Q.projectionMatrix.makePerspective(tt,M,_,z,L,ft),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Ce(Q,re){re===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(re.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let re=Q.near,ve=Q.far;g.texture!==null&&(g.depthNear>0&&(re=g.depthNear),g.depthFar>0&&(ve=g.depthFar)),V.near=F.near=P.near=re,V.far=F.far=P.far=ve,(B!==V.near||U!==V.far)&&(r.updateRenderState({depthNear:V.near,depthFar:V.far}),B=V.near,U=V.far),V.layers.mask=Q.layers.mask|6,P.layers.mask=V.layers.mask&-5,F.layers.mask=V.layers.mask&-3;let We=Q.parent,Te=V.cameras;Ce(V,We);for(let Xe=0;Xe<Te.length;Xe++)Ce(Te[Xe],We);Te.length===2?ie(V,P,F):V.projectionMatrix.copy(P.projectionMatrix),E===null&&Q.isPerspectiveCamera&&(E={camera:Q,fov:Q.fov,zoom:Q.zoom}),Ee(Q,V,We)};function Ee(Q,re,ve){ve===null?Q.matrix.copy(re.matrixWorld):(Q.matrix.copy(ve.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(re.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(re.projectionMatrix),Q.projectionMatrixInverse.copy(re.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ps*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(Q){c=Q,h!==null&&(h.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(V)},this.getCameraTexture=function(Q){return p[Q]};let dt=null;function st(Q,re){if(u=re.getViewerPose(l||o),m=re,u!==null){let ve=u.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let We=!1;ve.length!==V.cameras.length&&(V.cameras.length=0,We=!0);for(let se=0;se<ve.length;se++){let ue=ve[se],de=null;if(f!==null)de=f.getViewport(ue);else{let _e=d.getViewSubImage(h,ue);de=_e.viewport,se===0&&(e.setRenderTargetTextures(b,_e.colorTexture,_e.depthStencilTexture),e.setRenderTarget(b))}let fe=N[se];fe===void 0&&(fe=new $t,fe.layers.enable(se),fe.viewport=new It,N[se]=fe),fe.matrix.fromArray(ue.transform.matrix),fe.matrix.decompose(fe.position,fe.quaternion,fe.scale),fe.projectionMatrix.fromArray(ue.projectionMatrix),fe.projectionMatrixInverse.copy(fe.projectionMatrix).invert(),fe.viewport.set(de.x,de.y,de.width,de.height),se===0&&(V.matrix.copy(fe.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),We===!0&&V.cameras.push(fe)}let Te=r.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let se=d.getDepthInformation(ve[0]);se&&se.isValid&&se.texture&&g.init(se,r.renderState)}if(Te&&Te.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let se=0;se<ve.length;se++){let ue=ve[se].camera;if(ue){let de=p[ue];de||(de=new Bo,p[ue]=de);let fe=d.getCameraImage(ue);de.sourceTexture=fe}}}}for(let ve=0;ve<A.length;ve++){let We=S[ve],Te=A[ve];We!==null&&Te!==void 0&&Te.update(We,re,l||o)}dt&&dt(Q,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),m=null}let lt=new qp;lt.setAnimationLoop(st),this.setAnimationLoop=function(Q){dt=Q},this.dispose=function(){}}},ow=new _t,Kp=new Ke;Kp.set(-1,0,0,0,1,0,0,0,1);function aw(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Th(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,w,T,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),d(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),h(g,p),p.isMeshPhysicalMaterial&&f(g,p,b)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),y(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,w,T):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===ui&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===ui&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let w=e.get(p),T=w.envMap,b=w.envMapRotation;T&&(g.envMap.value=T,g.envMapRotation.value.setFromMatrix4(ow.makeRotationFromEuler(b)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Kp),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,w,T){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*w,g.scale.value=T*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,w){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ui&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let w=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function cw(i,e,t,n){let r={},s={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,A){let S=A.program;n.uniformBlockBinding(b,S)}function l(b,A){let S=r[b.id];S===void 0&&(g(b),S=u(b),r[b.id]=S,b.addEventListener("dispose",w));let I=A.program;n.updateUBOMapping(b,I);let x=e.render.frame;s[b.id]!==x&&(h(b),s[b.id]=x)}function u(b){let A=d();b.__bindingPointIndex=A;let S=i.createBuffer(),I=b.__size,x=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,I,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,S),S}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){let A=r[b.id],S=b.uniforms,I=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let x=0,E=S.length;x<E;x++){let P=S[x];if(Array.isArray(P))for(let F=0,N=P.length;F<N;F++)f(P[F],x,F,I);else f(P,x,0,I)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,A,S,I){if(y(b,A,S,I)===!0){let x=b.__offset,E=b.value;if(Array.isArray(E)){let P=0;for(let F=0;F<E.length;F++){let N=E[F],V=p(N);m(N,b.__data,P),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(P+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(E,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,b.__data)}}function m(b,A,S){typeof b=="number"||typeof b=="boolean"?A[0]=b:b.isMatrix3?(A[0]=b.elements[0],A[1]=b.elements[1],A[2]=b.elements[2],A[3]=0,A[4]=b.elements[3],A[5]=b.elements[4],A[6]=b.elements[5],A[7]=0,A[8]=b.elements[6],A[9]=b.elements[7],A[10]=b.elements[8],A[11]=0):ArrayBuffer.isView(b)?A.set(new b.constructor(b.buffer,b.byteOffset,A.length)):b.toArray(A,S)}function y(b,A,S,I){let x=b.value,E=A+"_"+S;if(I[E]===void 0)return typeof x=="number"||typeof x=="boolean"?I[E]=x:ArrayBuffer.isView(x)?I[E]=x.slice():I[E]=x.clone(),!0;{let P=I[E];if(typeof x=="number"||typeof x=="boolean"){if(P!==x)return I[E]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(P.equals(x)===!1)return P.copy(x),!0}}return!1}function g(b){let A=b.uniforms,S=0,I=16;for(let E=0,P=A.length;E<P;E++){let F=Array.isArray(A[E])?A[E]:[A[E]];for(let N=0,V=F.length;N<V;N++){let B=F[N],U=Array.isArray(B.value)?B.value:[B.value];for(let H=0,Z=U.length;H<Z;H++){let ne=U[H],G=p(ne),j=S%I,ie=j%G.boundary,Ce=j+ie;S+=ie,Ce!==0&&I-Ce<G.storage&&(S+=I-Ce),B.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=G.storage}}}let x=S%I;return x>0&&(S+=I-x),b.__size=S,b.__cache={},this}function p(b){let A={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(A.boundary=4,A.storage=4):b.isVector2?(A.boundary=8,A.storage=8):b.isVector3||b.isColor?(A.boundary=16,A.storage=12):b.isVector4?(A.boundary=16,A.storage=16):b.isMatrix3?(A.boundary=48,A.storage=48):b.isMatrix4?(A.boundary=64,A.storage=64):b.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(A.boundary=16,A.storage=b.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",b),A}function w(b){let A=b.target;A.removeEventListener("dispose",w);let S=o.indexOf(A.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(r[A.id]),delete r[A.id],delete s[A.id]}function T(){for(let b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:c,update:l,dispose:T}}var lw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),un=null;function uw(){return un===null&&(un=new Co(lw,16,16,cr,Kt),un.name="DFG_LUT",un.minFilter=jt,un.magFilter=jt,un.wrapS=rn,un.wrapT=rn,un.generateMipmaps=!1,un.needsUpdate=!0),un}var zl=class{constructor(e={}){let{canvas:t=fp(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=pi}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let y=f,g=new Set([il,tl,el]),p=new Set([pi,ji,Os,Ns,Kc,Jc]),w=new Uint32Array(4),T=new Int32Array(4),b=new R,A=null,S=null,I=[],x=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,F=!1,N=null,V=null,B=null,U=null;this._outputColorSpace=Zt;let H=0,Z=0,ne=null,G=-1,j=null,ie=new It,Ce=new It,Ee=null,dt=new Ye(0),st=0,lt=t.width,Q=t.height,re=1,ve=null,We=null,Te=new It(0,0,lt,Q),Xe=new It(0,0,lt,Q),xt=!1,se=new xs,ue=!1,de=!1,fe=new _t,_e=new R,ze=new It,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},qe=!1;function Ve(){return ne===null?re:1}let L=n;function ft(v,D){return t.getContext(v,D)}let tt,M,_,z,W,K,pe,me,J,ee,xe,Be,we,ye,Ue,He,Je,O,be,C,Y,oe,k;try{let v={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xc}`),t.addEventListener("webglcontextlost",Ie,!1),t.addEventListener("webglcontextrestored",$e,!1),t.addEventListener("webglcontextcreationerror",je,!1),L===null){let D="webgl2";if(L=ft(D,v),L===null)throw ft(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ae()}catch(v){throw t.removeEventListener("webglcontextlost",Ie,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",je,!1),Ze("WebGLRenderer: "+v.message),v}function ae(){tt=new _b(L),tt.init(),Y=new nw(L,tt),M=new ab(L,tt,e,Y),_=new tw(L,tt),M.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),V=L.createFramebuffer(),B=L.createFramebuffer(),U=L.createFramebuffer(),z=new bb(L),W=new Vv,K=new iw(L,tt,_,W,M,Y,z),pe=new gb(P),me=new w_(L),oe=new sb(L,me),J=new xb(L,me,z,oe),ee=new wb(L,J,me,oe,z),O=new vb(L,M,K),Ue=new cb(W),xe=new zv(P,pe,tt,M,oe,Ue),Be=new aw(P,W),we=new Gv,ye=new $v(tt),Je=new rb(P,pe,_,ee,m,c),He=new ew(P,ee,M),k=new cw(L,z,M,_),be=new ob(L,tt,z),C=new yb(L,tt,z),z.programs=xe.programs,P.capabilities=M,P.extensions=tt,P.properties=W,P.renderLists=we,P.shadowMap=He,P.state=_,P.info=z}y!==pi&&(E=new Sb(y,t.width,t.height,a,r,s));let he=new qh(P,L);this.xr=he,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let v=tt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=tt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(v){v!==void 0&&(re=v,this.setSize(lt,Q,!1))},this.getSize=function(v){return v.set(lt,Q)},this.setSize=function(v,D,$=!0){if(he.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}lt=v,Q=D,t.width=Math.floor(v*re),t.height=Math.floor(D*re),$===!0&&(t.style.width=v+"px",t.style.height=D+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,v,D)},this.getDrawingBufferSize=function(v){return v.set(lt*re,Q*re).floor()},this.setDrawingBufferSize=function(v,D,$){lt=v,Q=D,re=$,t.width=Math.floor(v*$),t.height=Math.floor(D*$),this.setViewport(0,0,v,D)},this.setEffects=function(v){if(y===pi){Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let D=0;D<v.length;D++)if(v[D].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(ie)},this.getViewport=function(v){return v.copy(Te)},this.setViewport=function(v,D,$,q){v.isVector4?Te.set(v.x,v.y,v.z,v.w):Te.set(v,D,$,q),_.viewport(ie.copy(Te).multiplyScalar(re).round())},this.getScissor=function(v){return v.copy(Xe)},this.setScissor=function(v,D,$,q){v.isVector4?Xe.set(v.x,v.y,v.z,v.w):Xe.set(v,D,$,q),_.scissor(Ce.copy(Xe).multiplyScalar(re).round())},this.getScissorTest=function(){return xt},this.setScissorTest=function(v){_.setScissorTest(xt=v)},this.setOpaqueSort=function(v){ve=v},this.setTransparentSort=function(v){We=v},this.getClearColor=function(v){return v.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(v=!0,D=!0,$=!0){let q=0;if(v){let X=!1;if(ne!==null){let Me=ne.texture.format;X=g.has(Me)}if(X){let Me=ne.texture.type,Pe=p.has(Me),Se=Je.getClearColor(),Le=Je.getClearAlpha(),Oe=Se.r,it=Se.g,at=Se.b;Pe?(w[0]=Oe,w[1]=it,w[2]=at,w[3]=Le,L.clearBufferuiv(L.COLOR,0,w)):(T[0]=Oe,T[1]=it,T[2]=at,T[3]=Le,L.clearBufferiv(L.COLOR,0,T))}else q|=L.COLOR_BUFFER_BIT}D&&(q|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(q|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&L.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),N=v},this.dispose=function(){t.removeEventListener("webglcontextlost",Ie,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",je,!1),Je.dispose(),we.dispose(),ye.dispose(),W.dispose(),pe.dispose(),ee.dispose(),oe.dispose(),k.dispose(),xe.dispose(),he.dispose(),he.removeEventListener("sessionstart",Ba),he.removeEventListener("sessionend",Gi),Ri.stop()};function Ie(v){v.preventDefault(),Sh("WebGLRenderer: Context Lost."),F=!0}function $e(){Sh("WebGLRenderer: Context Restored."),F=!1;let v=z.autoReset,D=He.enabled,$=He.autoUpdate,q=He.needsUpdate,X=He.type;ae(),z.autoReset=v,He.enabled=D,He.autoUpdate=$,He.needsUpdate=q,He.type=X}function je(v){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function yt(v){let D=v.target;D.removeEventListener("dispose",yt),xi(D)}function xi(v){Ti(v),W.remove(v)}function Ti(v){let D=W.get(v).programs;D!==void 0&&(D.forEach(function($){xe.releaseProgram($)}),v.isShaderMaterial&&xe.releaseShaderCache(v))}this.renderBufferDirect=function(v,D,$,q,X,Me){D===null&&(D=Ne);let Pe=X.isMesh&&X.matrixWorld.determinantAffine()<0,Se=Zg(v,D,$,q,X);_.setMaterial(q,Pe);let Le=$.index,Oe=1;if(q.wireframe===!0){if(Le=J.getWireframeAttribute($),Le===void 0)return;Oe=2}let it=$.drawRange,at=$.attributes.position,Fe=it.start*Oe,bt=(it.start+it.count)*Oe;Me!==null&&(Fe=Math.max(Fe,Me.start*Oe),bt=Math.min(bt,(Me.start+Me.count)*Oe)),Le!==null?(Fe=Math.max(Fe,0),bt=Math.min(bt,Le.count)):at!=null&&(Fe=Math.max(Fe,0),bt=Math.min(bt,at.count));let Ut=bt-Fe;if(Ut<0||Ut===1/0)return;oe.setup(X,q,Se,$,Le);let Tt,Mt=be;if(Le!==null&&(Tt=me.get(Le),Mt=C,Mt.setIndex(Tt)),X.isMesh)q.wireframe===!0?(_.setLineWidth(q.wireframeLinewidth*Ve()),Mt.setMode(L.LINES)):Mt.setMode(L.TRIANGLES);else if(X.isLine){let Qt=q.linewidth;Qt===void 0&&(Qt=1),_.setLineWidth(Qt*Ve()),X.isLineSegments?Mt.setMode(L.LINES):X.isLineLoop?Mt.setMode(L.LINE_LOOP):Mt.setMode(L.LINE_STRIP)}else X.isPoints?Mt.setMode(L.POINTS):X.isSprite&&Mt.setMode(L.TRIANGLES);if(X.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))Mt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let Qt=X._multiDrawStarts,Re=X._multiDrawCounts,oi=X._multiDrawCount,pt=Le?me.get(Le).bytesPerElement:1,Ii=W.get(q).currentProgram.getUniforms();for(let tn=0;tn<oi;tn++)Ii.setValue(L,"_gl_DrawID",tn),Mt.render(Qt[tn]/pt,Re[tn])}else if(X.isInstancedMesh)Mt.renderInstances(Fe,Ut,X.count);else if($.isInstancedBufferGeometry){let Qt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Re=Math.min($.instanceCount,Qt);Mt.renderInstances(Fe,Ut,Re)}else Mt.render(Fe,Ut)};function Nn(v,D,$,q){N!==null&&v.isNodeMaterial&&N.setObject(q,v),ue===!0&&Ue.setState(v,$,!1),v.transparent===!0&&v.side===ln&&v.forceSinglePass===!1?(v.side=ui,v.needsUpdate=!0,Fa(v,D,q),v.side=nr,v.needsUpdate=!0,Fa(v,D,q),v.side=ln):Fa(v,D,q)}this.compile=function(v,D,$=null){$===null&&($=v),N!==null&&N.renderStart(v,D,$),S=ye.get($),S.init(D),x.push(S),$.traverseVisible(function(X){X.isLight&&X.layers.test(D.layers)&&(S.pushLight(X),X.castShadow&&S.pushShadow(X))}),v!==$&&v.traverseVisible(function(X){X.isLight&&X.layers.test(D.layers)&&(S.pushLight(X),X.castShadow&&S.pushShadow(X))}),S.setupLights(),N!==null&&N.updateLights(S.state.lightsArray),de=this.localClippingEnabled,ue=Ue.init(this.clippingPlanes,de),ue===!0&&Ue.setGlobalState(this.clippingPlanes,D),N!==null&&He.render(S.state.shadowsArray,$,D);let q=new Set;return v.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let Me=X.material;if(Me)if(Array.isArray(Me))for(let Pe=0;Pe<Me.length;Pe++){let Se=Me[Pe];Nn(Se,$,D,X),q.add(Se)}else Nn(Me,$,D,X),q.add(Me)}),S=x.pop(),N!==null&&N.renderEnd(),q},this.compileAsync=function(v,D,$=null){let q=this.compile(v,D,$);return new Promise(X=>{function Me(){if(q.forEach(function(Pe){let Le=W.get(Pe).currentProgram;(Le===void 0||Le.isReady())&&q.delete(Pe)}),q.size===0){X(v);return}setTimeout(Me,10)}tt.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Ci=null;function Gr(v){Ci&&Ci(v)}function Ba(){Ri.stop()}function Gi(){Ri.start()}let Ri=new qp;Ri.setAnimationLoop(Gr),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(v){Ci=v,he.setAnimationLoop(v),v===null?Ri.stop():Ri.start()},he.addEventListener("sessionstart",Ba),he.addEventListener("sessionend",Gi),this.render=function(v,D){if(D!==void 0&&D.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;N!==null&&N.renderStart(v,D);let $=he.enabled===!0&&he.isPresenting===!0,q=E!==null&&(ne===null||$)&&E.begin(P,ne);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(he.cameraAutoUpdate===!0&&he.updateCamera(D),D=he.getCamera()),v.isScene===!0&&v.onBeforeRender(P,v,D,ne),S=ye.get(v,x.length),S.init(D),S.state.textureUnits=K.getTextureUnits(),x.push(S),fe.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),se.setFromProjectionMatrix(fe,Yi,D.reversedDepth),de=this.localClippingEnabled,ue=Ue.init(this.clippingPlanes,de),A=we.get(v,I.length),A.init(),I.push(A),he.enabled===!0&&he.isPresenting===!0){let Pe=P.xr.getDepthSensingMesh();Pe!==null&&_r(Pe,D,-1/0,P.sortObjects)}_r(v,D,0,P.sortObjects),A.finish(),N!==null&&N.updateLights(S.state.lightsArray),P.sortObjects===!0&&A.sort(ve,We),qe=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,qe&&Je.addToRenderList(A,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ue===!0&&Ue.beginShadows();let X=S.state.shadowsArray;if(He.render(X,v,D),ue===!0&&Ue.endShadows(),(q&&E.hasRenderPass())===!1){let Pe=A.opaque,Se=A.transmissive;if(S.setupLights(),D.isArrayCamera){let Le=D.cameras;if(Se.length>0)for(let Oe=0,it=Le.length;Oe<it;Oe++){let at=Le[Oe];Hd(Pe,Se,v,at)}qe&&Je.render(v);for(let Oe=0,it=Le.length;Oe<it;Oe++){let at=Le[Oe];yi(A,v,at,at.viewport)}}else Se.length>0&&Hd(Pe,Se,v,D),qe&&Je.render(v),yi(A,v,D)}ne!==null&&Z===0&&(K.updateMultisampleRenderTarget(ne),K.updateRenderTargetMipmap(ne)),q&&E.end(P),v.isScene===!0&&v.onAfterRender(P,v,D),oe.resetDefaultState(),G=-1,j=null,x.pop(),x.length>0?(S=x[x.length-1],K.setTextureUnits(S.state.textureUnits),ue===!0&&Ue.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,I.pop(),I.length>0?A=I[I.length-1]:A=null,N!==null&&N.renderEnd()};function _r(v,D,$,q){if(v.visible===!1)return;if(v.layers.test(D.layers)){if(v.isGroup)$=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(D);else if(v.isLightProbeGrid)S.pushLightProbeGrid(v);else if(v.isLight)S.pushLight(v),v.castShadow&&S.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(se)){q&&ze.setFromMatrixPosition(v.matrixWorld).applyMatrix4(fe);let Pe=ee.update(v),Se=v.material;Se.visible&&A.push(v,Pe,Se,$,ze.z,null,D)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(se))){let Pe=ee.update(v),Se=v.material;if(q&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),ze.copy(v.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),ze.copy(Pe.boundingSphere.center)),ze.applyMatrix4(v.matrixWorld).applyMatrix4(fe)),Array.isArray(Se)){let Le=Pe.groups;for(let Oe=0,it=Le.length;Oe<it;Oe++){let at=Le[Oe],Fe=Se[at.materialIndex];Fe&&Fe.visible&&A.push(v,Pe,Fe,$,ze.z,at,D)}}else Se.visible&&A.push(v,Pe,Se,$,ze.z,null,D)}}let Me=v.children;for(let Pe=0,Se=Me.length;Pe<Se;Pe++)_r(Me[Pe],D,$,q)}function yi(v,D,$,q){let{opaque:X,transmissive:Me,transparent:Pe}=v;S.setupLightsView($),ue===!0&&Ue.setGlobalState(P.clippingPlanes,$),q&&_.viewport(ie.copy(q)),X.length>0&&La(X,D,$),Me.length>0&&La(Me,D,$),Pe.length>0&&La(Pe,D,$),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Hd(v,D,$,q){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[q.id]===void 0){let Fe=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[q.id]=new Nt(1,1,{generateMipmaps:!0,type:Fe?Kt:pi,minFilter:or,samples:Math.max(4,M.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ot.workingColorSpace})}let Me=S.state.transmissionRenderTarget[q.id],Pe=q.viewport||ie;Me.setSize(Pe.z*P.transmissionResolutionScale,Pe.w*P.transmissionResolutionScale);let Se=P.getRenderTarget(),Le=P.getActiveCubeFace(),Oe=P.getActiveMipmapLevel();P.setRenderTarget(Me),P.getClearColor(dt),st=P.getClearAlpha(),st<1&&P.setClearColor(16777215,.5),P.clear(),qe&&Je.render($);let it=P.toneMapping;P.toneMapping=$i;let at=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),S.setupLightsView(q),ue===!0&&Ue.setGlobalState(P.clippingPlanes,q),La(v,$,q),K.updateMultisampleRenderTarget(Me),K.updateRenderTargetMipmap(Me),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let bt=0,Ut=D.length;bt<Ut;bt++){let Tt=D[bt],{object:Mt,geometry:Qt,material:Re,group:oi}=Tt;if(Re.side===ln&&Mt.layers.test(q.layers)){let pt=Re.side;Re.side=ui,Re.needsUpdate=!0,Gd(Mt,$,q,Qt,Re,oi),Re.side=pt,Re.needsUpdate=!0,Fe=!0}}Fe===!0&&(K.updateMultisampleRenderTarget(Me),K.updateRenderTargetMipmap(Me))}P.setRenderTarget(Se,Le,Oe),P.setClearColor(dt,st),at!==void 0&&(q.viewport=at),P.toneMapping=it}function La(v,D,$){let q=D.isScene===!0?D.overrideMaterial:null;for(let X=0,Me=v.length;X<Me;X++){let Pe=v[X],{object:Se,geometry:Le,group:Oe}=Pe,it=Pe.material;it.allowOverride===!0&&q!==null&&(it=q),Se.layers.test($.layers)&&Gd(Se,D,$,Le,it,Oe)}}function Gd(v,D,$,q,X,Me){N!==null&&X.isNodeMaterial&&N.setObject(v,X),v.onBeforeRender(P,D,$,q,X,Me),v.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),X.onBeforeRender(P,D,$,q,v,Me),X.transparent===!0&&X.side===ln&&X.forceSinglePass===!1?(X.side=ui,X.needsUpdate=!0,P.renderBufferDirect($,D,q,X,v,Me),X.side=nr,X.needsUpdate=!0,P.renderBufferDirect($,D,q,X,v,Me),X.side=ln):P.renderBufferDirect($,D,q,X,v,Me),v.onAfterRender(P,D,$,q,X,Me)}function Fa(v,D,$){D.isScene!==!0&&(D=Ne);let q=W.get(v),X=S.state.lights,Me=S.state.shadowsArray,Pe=X.state.version,Se=xe.getParameters(v,X.state,Me,D,$,S.state.lightProbeGridArray),Le=xe.getProgramCacheKey(Se),Oe=q.programs;q.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?D.environment:null,q.fog=D.fog;let it=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;q.envMap=pe.get(v.envMap||q.environment,it),q.envMapRotation=q.environment!==null&&v.envMap===null?D.environmentRotation:v.envMapRotation,Oe===void 0&&(v.addEventListener("dispose",yt),Oe=new Map,q.programs=Oe);let at=Oe.get(Le);if(at!==void 0){if(q.currentProgram===at&&q.lightsStateVersion===Pe)return qd(v,Se),at}else Se.uniforms=xe.getUniforms(v),N!==null&&v.isNodeMaterial&&N.build(v,$,Se),v.onBeforeCompile(Se,P),at=xe.acquireProgram(Se,Le),Oe.set(Le,at),q.uniforms=Se.uniforms;let Fe=q.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Fe.clippingPlanes=Ue.uniform),qd(v,Se),q.needsLights=jg(v),q.lightsStateVersion=Pe,q.needsLights&&(Fe.ambientLightColor.value=X.state.ambient,Fe.lightProbe.value=X.state.probe,Fe.sunLights.value=X.state.sun,Fe.sunLightShadows.value=X.state.sunShadow,Fe.directionalLights.value=X.state.directional,Fe.directionalLightShadows.value=X.state.directionalShadow,Fe.spotLights.value=X.state.spot,Fe.spotLightShadows.value=X.state.spotShadow,Fe.rectAreaLights.value=X.state.rectArea,Fe.ltc_1.value=X.state.rectAreaLTC1,Fe.ltc_2.value=X.state.rectAreaLTC2,Fe.pointLights.value=X.state.point,Fe.pointLightShadows.value=X.state.pointShadow,Fe.hemisphereLights.value=X.state.hemi,Fe.sunShadowMatrix.value=X.state.sunShadowMatrix,Fe.sunShadowCascade.value=X.state.sunShadowCascade,Fe.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Fe.spotLightMatrix.value=X.state.spotLightMatrix,Fe.spotLightMap.value=X.state.spotLightMap,Fe.pointShadowMatrix.value=X.state.pointShadowMatrix),q.lightProbeGrid=S.state.lightProbeGridArray.length>0,q.currentProgram=at,q.uniformsList=null,at}function Wd(v){if(v.uniformsList===null){let D=v.currentProgram.getUniforms();v.uniformsList=Vs.seqWithValue(D.seq,v.uniforms)}return v.uniformsList}function qd(v,D){let $=W.get(v);$.outputColorSpace=D.outputColorSpace,$.batching=D.batching,$.batchingColor=D.batchingColor,$.instancing=D.instancing,$.instancingColor=D.instancingColor,$.instancingMorph=D.instancingMorph,$.skinning=D.skinning,$.morphTargets=D.morphTargets,$.morphNormals=D.morphNormals,$.morphColors=D.morphColors,$.morphTargetsCount=D.morphTargetsCount,$.numClippingPlanes=D.numClippingPlanes,$.numIntersection=D.numClipIntersection,$.vertexAlphas=D.vertexAlphas,$.vertexTangents=D.vertexTangents,$.toneMapping=D.toneMapping}function Yg(v,D){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;b.setFromMatrixPosition(D.matrixWorld);for(let $=0,q=v.length;$<q;$++){let X=v[$];if(X.texture!==null&&X.boundingBox.containsPoint(b))return X}return null}function Zg(v,D,$,q,X){D.isScene!==!0&&(D=Ne),K.resetTextureUnits();let Me=D.fog,Pe=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?D.environment:null,Se=ne===null?P.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ot.workingColorSpace,Le=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Oe=pe.get(q.envMap||Pe,Le),it=q.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,at=!!$.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Fe=!!$.morphAttributes.position,bt=!!$.morphAttributes.normal,Ut=!!$.morphAttributes.color,Tt=$i;q.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Tt=P.toneMapping);let Mt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Qt=Mt!==void 0?Mt.length:0,Re=W.get(q),oi=S.state.lights;if(ue===!0&&(de===!0||v!==j)){let Et=v===j&&q.id===G;Ue.setState(q,v,Et)}let pt=!1;q.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==oi.state.version||Re.outputColorSpace!==Se||X.isBatchedMesh&&Re.batching===!1||!X.isBatchedMesh&&Re.batching===!0||X.isBatchedMesh&&Re.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Re.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Re.instancing===!1||!X.isInstancedMesh&&Re.instancing===!0||X.isSkinnedMesh&&Re.skinning===!1||!X.isSkinnedMesh&&Re.skinning===!0||X.isInstancedMesh&&Re.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Re.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Re.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Re.instancingMorph===!1&&X.morphTexture!==null||Re.envMap!==Oe||q.fog===!0&&Re.fog!==Me||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==Ue.numPlanes||Re.numIntersection!==Ue.numIntersection)||Re.vertexAlphas!==it||Re.vertexTangents!==at||Re.morphTargets!==Fe||Re.morphNormals!==bt||Re.morphColors!==Ut||Re.toneMapping!==Tt||Re.morphTargetsCount!==Qt||!!Re.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(pt=!0):(pt=!0,Re.__version=q.version);let Ii=Re.currentProgram;pt===!0&&(Ii=Fa(q,D,X),N&&q.isNodeMaterial&&N.onUpdateProgram(q,Ii,Re));let tn=!1,kn=!1,Wr=!1,At=Ii.getUniforms(),Dt=Re.uniforms;if(_.useProgram(Ii.program)&&(tn=!0,kn=!0,Wr=!0),q.id!==G&&(G=q.id,kn=!0),Re.needsLights){let Et=Yg(S.state.lightProbeGridArray,X);Re.lightProbeGrid!==Et&&(Re.lightProbeGrid=Et,kn=!0)}if(tn||j!==v){_.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),At.setValue(L,"projectionMatrix",v.projectionMatrix),At.setValue(L,"viewMatrix",v.matrixWorldInverse);let Vn=At.map.cameraPosition;Vn!==void 0&&Vn.setValue(L,_e.setFromMatrixPosition(v.matrixWorld)),M.logarithmicDepthBuffer&&At.setValue(L,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&At.setValue(L,"isOrthographic",v.isOrthographicCamera===!0),j!==v&&(j=v,kn=!0,Wr=!0)}if(Re.needsLights&&(oi.state.sunShadowMap.length>0&&At.setValue(L,"sunShadowMap",oi.state.sunShadowMap,K),oi.state.directionalShadowMap.length>0&&At.setValue(L,"directionalShadowMap",oi.state.directionalShadowMap,K),oi.state.spotShadowMap.length>0&&At.setValue(L,"spotShadowMap",oi.state.spotShadowMap,K),oi.state.pointShadowMap.length>0&&At.setValue(L,"pointShadowMap",oi.state.pointShadowMap,K)),X.isSkinnedMesh){At.setOptional(L,X,"bindMatrix"),At.setOptional(L,X,"bindMatrixInverse");let Et=X.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),At.setValue(L,"boneTexture",Et.boneTexture,K))}X.isBatchedMesh&&(At.setOptional(L,X,"batchingTexture"),At.setValue(L,"batchingTexture",X._matricesTexture,K),At.setOptional(L,X,"batchingIdTexture"),At.setValue(L,"batchingIdTexture",X._indirectTexture,K),At.setOptional(L,X,"batchingColorTexture"),X._colorsTexture!==null&&At.setValue(L,"batchingColorTexture",X._colorsTexture,K));let zn=$.morphAttributes;if((zn.position!==void 0||zn.normal!==void 0||zn.color!==void 0)&&O.update(X,$,Ii),(kn||Re.receiveShadow!==X.receiveShadow)&&(Re.receiveShadow=X.receiveShadow,At.setValue(L,"receiveShadow",X.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&D.environment!==null&&(Dt.envMapIntensity.value=D.environmentIntensity),Dt.dfgLUT!==void 0&&(Dt.dfgLUT.value=uw()),kn){if(At.setValue(L,"toneMappingExposure",P.toneMappingExposure),Re.needsLights&&$g(Dt,Wr),Me&&q.fog===!0&&Be.refreshFogUniforms(Dt,Me),Be.refreshMaterialUniforms(Dt,q,re,Q,S.state.transmissionRenderTarget[v.id]),Re.needsLights&&Re.lightProbeGrid){let Et=Re.lightProbeGrid;Dt.probesSH.value=Et.texture,Dt.probesMin.value.copy(Et.boundingBox.min),Dt.probesMax.value.copy(Et.boundingBox.max),Dt.probesResolution.value.copy(Et.resolution)}Vs.upload(L,Wd(Re),Dt,K)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Vs.upload(L,Wd(Re),Dt,K),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&At.setValue(L,"center",X.center),At.setValue(L,"modelViewMatrix",X.modelViewMatrix),At.setValue(L,"normalMatrix",X.normalMatrix),At.setValue(L,"modelMatrix",X.matrixWorld),q.uniformsGroups!==void 0){let Et=q.uniformsGroups;for(let Vn=0,qr=Et.length;Vn<qr;Vn++){let Yd=Et[Vn];k.update(Yd,Ii),k.bind(Yd,Ii)}}return Ii}function $g(v,D){v.ambientLightColor.needsUpdate=D,v.lightProbe.needsUpdate=D,v.sunLights.needsUpdate=D,v.sunLightShadows.needsUpdate=D,v.directionalLights.needsUpdate=D,v.directionalLightShadows.needsUpdate=D,v.pointLights.needsUpdate=D,v.pointLightShadows.needsUpdate=D,v.spotLights.needsUpdate=D,v.spotLightShadows.needsUpdate=D,v.rectAreaLights.needsUpdate=D,v.hemisphereLights.needsUpdate=D}function jg(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(v,D,$){let q=W.get(v);q.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),W.get(v.texture).__webglTexture=D,W.get(v.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:$,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,D){let $=W.get(v);$.__webglFramebuffer=D,$.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(v,D=0,$=0){ne=v,H=D,Z=$;let q=null,X=!1,Me=!1;if(v){let Se=W.get(v);if(Se.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(L.FRAMEBUFFER,Se.__webglFramebuffer),ie.copy(v.viewport),Ce.copy(v.scissor),Ee=v.scissorTest,_.viewport(ie),_.scissor(Ce),_.setScissorTest(Ee),G=-1;return}else if(Se.__webglFramebuffer===void 0)K.setupRenderTarget(v);else if(Se.__hasExternalTextures)K.rebindTextures(v,W.get(v.texture).__webglTexture,W.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let it=v.depthTexture;if(Se.__boundDepthTexture!==it){if(it!==null&&W.has(it)&&(v.width!==it.image.width||v.height!==it.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(v)}}let Le=v.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(Me=!0);let Oe=W.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Oe[D])?q=Oe[D][$]:q=Oe[D],X=!0):v.samples>0&&K.useMultisampledRTT(v)===!1?q=W.get(v).__webglMultisampledFramebuffer:Array.isArray(Oe)?q=Oe[$]:q=Oe,ie.copy(v.viewport),Ce.copy(v.scissor),Ee=v.scissorTest}else ie.copy(Te).multiplyScalar(re).floor(),Ce.copy(Xe).multiplyScalar(re).floor(),Ee=xt;if($!==0&&(q=V),_.bindFramebuffer(L.FRAMEBUFFER,q)&&_.drawBuffers(v,q),_.viewport(ie),_.scissor(Ce),_.setScissorTest(Ee),X){let Se=W.get(v.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,Se.__webglTexture,$)}else if(Me){let Se=D;for(let Le=0;Le<v.textures.length;Le++){let Oe=W.get(v.textures[Le]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Le,Oe.__webglTexture,$,Se)}}else if(v!==null&&$!==0){let Se=W.get(v.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Se.__webglTexture,$)}G=-1};function Xd(v){let D=W.get(v);return(D.__readFormat!==v.format||D.__readType!==v.type)&&(D.__readFormat=v.format,D.__readType=v.type,D.__formatReadable=M.textureFormatReadable(v.format),D.__typeReadable=M.textureTypeReadable(v.type)),D}this.readRenderTargetPixels=function(v,D,$,q,X,Me,Pe,Se=0){if(!(v&&v.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=W.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Pe!==void 0&&(Le=Le[Pe]),Le){_.bindFramebuffer(L.FRAMEBUFFER,Le);try{let Oe=v.textures[Se],it=Oe.format,at=Oe.type;v.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Se);let Fe=Xd(Oe);if(Fe.__formatReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Fe.__typeReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=v.width-q&&$>=0&&$<=v.height-X&&L.readPixels(D,$,q,X,Y.convert(it),Y.convert(at),Me)}finally{let Oe=ne!==null?W.get(ne).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(v,D,$,q,X,Me,Pe,Se=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=W.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Pe!==void 0&&(Le=Le[Pe]),Le)if(D>=0&&D<=v.width-q&&$>=0&&$<=v.height-X){_.bindFramebuffer(L.FRAMEBUFFER,Le);let Oe=v.textures[Se],it=Oe.format,at=Oe.type;v.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Se);let Fe=Xd(Oe);if(Fe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Fe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let bt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,bt),L.bufferData(L.PIXEL_PACK_BUFFER,Me.byteLength,L.STREAM_READ),L.readPixels(D,$,q,X,Y.convert(it),Y.convert(at),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let Ut=ne!==null?W.get(ne).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Ut);let Tt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await mp(L,Tt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,bt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Me),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(bt),L.deleteSync(Tt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,D=null,$=0){let q=Math.pow(2,-$),X=Math.floor(v.image.width*q),Me=Math.floor(v.image.height*q),Pe=D!==null?D.x:0,Se=D!==null?D.y:0;K.setTexture2D(v,0),L.copyTexSubImage2D(L.TEXTURE_2D,$,0,0,Pe,Se,X,Me),_.unbindTexture()},this.copyTextureToTexture=function(v,D,$=null,q=null,X=0,Me=0){let Pe,Se,Le,Oe,it,at,Fe,bt,Ut,Tt=v.isCompressedTexture?v.mipmaps[Me]:v.image;if($!==null)Pe=$.max.x-$.min.x,Se=$.max.y-$.min.y,Le=$.isBox3?$.max.z-$.min.z:1,Oe=$.min.x,it=$.min.y,at=$.isBox3?$.min.z:0;else{let Dt=Math.pow(2,-X);Pe=Math.floor(Tt.width*Dt),Se=Math.floor(Tt.height*Dt),v.isDataArrayTexture?Le=Tt.depth:v.isData3DTexture?Le=Math.floor(Tt.depth*Dt):Le=1,Oe=0,it=0,at=0}q!==null?(Fe=q.x,bt=q.y,Ut=q.z):(Fe=0,bt=0,Ut=0);let Mt=Y.convert(D.format),Qt=Y.convert(D.type),Re;D.isData3DTexture?(K.setTexture3D(D,0),Re=L.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(K.setTexture2DArray(D,0),Re=L.TEXTURE_2D_ARRAY):(K.setTexture2D(D,0),Re=L.TEXTURE_2D),_.activeTexture(L.TEXTURE0),_.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),_.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),_.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);let oi=_.getParameter(L.UNPACK_ROW_LENGTH),pt=_.getParameter(L.UNPACK_IMAGE_HEIGHT),Ii=_.getParameter(L.UNPACK_SKIP_PIXELS),tn=_.getParameter(L.UNPACK_SKIP_ROWS),kn=_.getParameter(L.UNPACK_SKIP_IMAGES);_.pixelStorei(L.UNPACK_ROW_LENGTH,Tt.width),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Tt.height),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Oe),_.pixelStorei(L.UNPACK_SKIP_ROWS,it),_.pixelStorei(L.UNPACK_SKIP_IMAGES,at);let Wr=v.isDataArrayTexture||v.isData3DTexture,At=D.isDataArrayTexture||D.isData3DTexture;if(v.isDepthTexture){let Dt=W.get(v),zn=W.get(D),Et=W.get(Dt.__renderTarget),Vn=W.get(zn.__renderTarget);_.bindFramebuffer(L.READ_FRAMEBUFFER,Et.__webglFramebuffer),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let qr=0;qr<Le;qr++)Wr&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,W.get(v).__webglTexture,X,at+qr),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,W.get(D).__webglTexture,Me,Ut+qr)),L.blitFramebuffer(Oe,it,Pe,Se,Fe,bt,Pe,Se,L.DEPTH_BUFFER_BIT,L.NEAREST);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(X!==0||v.isRenderTargetTexture||W.has(v)){let Dt=W.get(v),zn=W.get(D);_.bindFramebuffer(L.READ_FRAMEBUFFER,B),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,U);for(let Et=0;Et<Le;Et++)Wr?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Dt.__webglTexture,X,at+Et):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Dt.__webglTexture,X),At?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,zn.__webglTexture,Me,Ut+Et):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,zn.__webglTexture,Me),X!==0?L.blitFramebuffer(Oe,it,Pe,Se,Fe,bt,Pe,Se,L.COLOR_BUFFER_BIT,L.NEAREST):At?L.copyTexSubImage3D(Re,Me,Fe,bt,Ut+Et,Oe,it,Pe,Se):L.copyTexSubImage2D(Re,Me,Fe,bt,Oe,it,Pe,Se);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else At?v.isDataTexture||v.isData3DTexture?L.texSubImage3D(Re,Me,Fe,bt,Ut,Pe,Se,Le,Mt,Qt,Tt.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(Re,Me,Fe,bt,Ut,Pe,Se,Le,Mt,Tt.data):L.texSubImage3D(Re,Me,Fe,bt,Ut,Pe,Se,Le,Mt,Qt,Tt):v.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Me,Fe,bt,Pe,Se,Mt,Qt,Tt.data):v.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Me,Fe,bt,Tt.width,Tt.height,Mt,Tt.data):L.texSubImage2D(L.TEXTURE_2D,Me,Fe,bt,Pe,Se,Mt,Qt,Tt);_.pixelStorei(L.UNPACK_ROW_LENGTH,oi),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pt),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Ii),_.pixelStorei(L.UNPACK_SKIP_ROWS,tn),_.pixelStorei(L.UNPACK_SKIP_IMAGES,kn),Me===0&&D.generateMipmaps&&L.generateMipmap(Re),_.unbindTexture()},this.initRenderTarget=function(v){W.get(v).__webglFramebuffer===void 0&&K.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?K.setTextureCube(v,0):v.isData3DTexture?K.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?K.setTexture2DArray(v,0):K.setTexture2D(v,0),_.unbindTexture()},this.resetState=function(){H=0,Z=0,ne=null,_.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}};var Jp={type:"change"},Yh={type:"start"},em={type:"end"},Gl=new Zn,Qp=new wi,dw=Math.cos(70*da.DEG2RAD),Vt=new R,mi=2*Math.PI,vt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Xh=1e-6,Wl=class extends Ko{constructor(e,t=null){super(e,t),this.state=vt.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:tr.ROTATE,MIDDLE:tr.DOLLY,RIGHT:tr.PAN},this.touches={ONE:ir.ROTATE,TWO:ir.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new ni,this._lastTargetPosition=new R,this._quat=new ni().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ls,this._sphericalDelta=new Ls,this._scale=1,this._panOffset=new R,this._rotateStart=new le,this._rotateEnd=new le,this._rotateDelta=new le,this._panStart=new le,this._panEnd=new le,this._panDelta=new le,this._dollyStart=new le,this._dollyEnd=new le,this._dollyDelta=new le,this._dollyDirection=new R,this._mouse=new le,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=pw.bind(this),this._onPointerDown=fw.bind(this),this._onPointerUp=mw.bind(this),this._onContextMenu=ww.bind(this),this._onMouseWheel=xw.bind(this),this._onKeyDown=yw.bind(this),this._onTouchStart=bw.bind(this),this._onTouchMove=vw.bind(this),this._onMouseDown=gw.bind(this),this._onMouseMove=_w.bind(this),this._interceptControlDown=Aw.bind(this),this._interceptControlUp=Sw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=vt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Jp),this.update(),this.state=vt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Vt.copy(t).sub(this.target),Vt.applyQuaternion(this._quat),this._spherical.setFromVector3(Vt),this.autoRotate&&this.state===vt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=mi:n>Math.PI&&(n-=mi),r<-Math.PI?r+=mi:r>Math.PI&&(r-=mi),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Vt.setFromSpherical(this._spherical),Vt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Vt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Vt.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){let a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;let l=new R(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Vt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Gl.origin.copy(this.object.position),Gl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Gl.direction))<dw?this.object.lookAt(this.target):(Qp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Gl.intersectPlane(Qp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Xh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Xh||this._lastTargetPosition.distanceToSquared(this.target)>Xh?(this.dispatchEvent(Jp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?mi/60*this.autoRotateSpeed*e:mi/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Vt.setFromMatrixColumn(t,0),Vt.multiplyScalar(-e),this._panOffset.add(Vt)}_panUp(e,t){this.screenSpacePanning===!0?Vt.setFromMatrixColumn(t,1):(Vt.setFromMatrixColumn(t,0),Vt.crossVectors(this.object.up,Vt)),Vt.multiplyScalar(e),this._panOffset.add(Vt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Vt.copy(r).sub(this.target);let s=Vt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,s=t-n.top,o=n.width,a=n.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(mi*this._rotateDelta.x/t.clientHeight),this._rotateUp(mi*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(mi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-mi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(mi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-mi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(mi*this._rotateDelta.x/t.clientHeight),this._rotateUp(mi*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new le,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function fw(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function pw(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function mw(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(em),this.state=vt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function gw(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case tr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=vt.DOLLY;break;case tr.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=vt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=vt.ROTATE}break;case tr.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=vt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=vt.PAN}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(Yh)}function _w(i){switch(this.state){case vt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case vt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case vt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function xw(i){this.enabled===!1||this.enableZoom===!1||this.state!==vt.NONE||(i.preventDefault(),this.dispatchEvent(Yh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(em))}function yw(i){this.enabled!==!1&&this._handleKeyDown(i)}function bw(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ir.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=vt.TOUCH_ROTATE;break;case ir.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=vt.TOUCH_PAN;break;default:this.state=vt.NONE}break;case 2:switch(this.touches.TWO){case ir.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=vt.TOUCH_DOLLY_PAN;break;case ir.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=vt.TOUCH_DOLLY_ROTATE;break;default:this.state=vt.NONE}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(Yh)}function vw(i){switch(this._trackPointer(i),this.state){case vt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case vt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case vt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case vt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=vt.NONE}}function ww(i){this.enabled!==!1&&i.preventDefault()}function Aw(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Sw(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Gs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Mi=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Mw=new er(-1,1,1,-1,0,1),Zh=class extends Pt{constructor(){super(),this.setAttribute("position",new mt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new mt([0,2,0,0,2,0],2))}},Ew=new Zh,lr=class{constructor(e){this._mesh=new qt(Ew,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Mw)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var ql=class extends Mi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Rt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=In.clone(e.uniforms),this.material=new Rt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new lr(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ga=class extends Mi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},Xl=class extends Mi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Yl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new le);this._width=n.width,this._height=n.height,t=new Nt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Kt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ql(Gs),this.copyPass.material.blending=Li,this.timer=new jo}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let r=0,s=this.passes.length;r<s;r++){let o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ga!==void 0&&(o instanceof ga?n=!0:o instanceof Xl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new le);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Zl=class extends Mi{constructor(e,t,n=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ye}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}};var tm={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ye(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Ws=class i extends Mi{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e!==void 0?new le(e.x,e.y):new le(256,256),this.clearColor=new Ye(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Nt(s,o,{type:Kt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new Nt(s,o,{type:Kt,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let h=new Nt(s,o,{type:Kt,depthBuffer:!1});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),s=Math.round(s/2),o=Math.round(o/2)}let a=tm;this.highPassUniforms=In.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Rt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let c=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new le(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=In.clone(Gs.uniforms),this.blendMaterial=new Rt({uniforms:this.copyUniforms,vertexShader:Gs.vertexShader,fragmentShader:Gs.fragmentShader,premultipliedAlpha:!0,blending:rr,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ye,this._oldClearAlpha=1,this._basic=new Sr,this._fsQuad=new lr(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,r),this.renderTargetsVertical[s].setSize(n,r),this.separableBlurMaterials[s].uniforms.invSize.value=new le(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(e,t,n,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let o=0;o<e;o++)t.push(.39894*Math.exp(-.5*o*o/(n*n))/n);let r=[],s=[];for(let o=1;o<e;o+=2){let a=t[o],c=o+1<e?t[o+1]:0,l=a+c;r.push((o*a+(o+1)*c)/l),s.push(l)}return new Rt({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new le(.5,.5)},direction:{value:new le(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:s}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Rt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Ws.BlurDirectionX=new le(1,0);Ws.BlurDirectionY=new le(0,1);var _a={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

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

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var $l=class extends Mi{constructor(){super(),this.isOutputPass=!0,this.uniforms=In.clone(_a.uniforms),this.material=new Rs({name:_a.name,uniforms:this.uniforms,vertexShader:_a.vertexShader,fragmentShader:_a.fragmentShader}),this._fsQuad=new lr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ot.getTransfer(this._outputColorSpace)===gt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Jo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Qo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ea?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Rr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ia?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===na?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===ta&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};function Tw(){let i=document.createElement("canvas");i.width=128,i.height=512;let e=i.getContext("2d");e.fillStyle="#c9a16d",e.fillRect(0,0,128,512);for(let n=0;n<95;n++){let r=di(n+1)*128;e.strokeStyle=`rgba(86,49,22,${.035+di(n+6)*.15})`,e.lineWidth=.3+di(n+7),e.beginPath(),e.moveTo(r,0),e.bezierCurveTo(r+8,180,r-7,290,r+2,512),e.stroke()}let t=new vs(i);return t.colorSpace=Zt,t.wrapS=t.wrapT=hs,t}function Cw(i){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d");t.fillStyle="#8e241c",t.fillRect(0,0,128,128),t.strokeStyle="#cfab61",t.lineWidth=5,t.strokeRect(8,8,112,112),t.font='70px "SimSun",serif',t.fillStyle="#ebd19b",t.textAlign="center",t.textBaseline="middle",t.fillText(i,64,68);let n=new vs(e);return n.colorSpace=Zt,n}function jl(i,e=!1){let t=new zl({antialias:!0,alpha:!1,preserveDrawingBuffer:e});t.info.autoReset=!1,t.setPixelRatio(e?1:Math.min(window.devicePixelRatio,1.5)),t.outputColorSpace=Zt,t.toneMapping=Rr,t.toneMappingExposure=1.15,t.shadowMap.enabled=!0,t.shadowMap.type=Tr,t.domElement.setAttribute("aria-label","\u836F\u53D1\u6728\u5076\u4E09\u7EF4\u9884\u6F14\uFF0C\u53EF\u62D6\u52A8\u89C2\u5BDF\u89D2\u5EA6"),t.domElement.style.touchAction="none",i?.appendChild(t.domElement);let n=new Mo;n.background=new Ye("#080f1c"),n.fog=new So("#080f1c",.021);let r=new $t(40,1,.1,80);r.position.set(4.5,5.5,12.5);let s=i?new Wl(r,t.domElement):void 0;s&&(s.target.set(0,3.95,0),s.enableDamping=!0,s.dampingFactor=.09,s.minDistance=3,s.maxDistance=25,s.maxPolarAngle=Math.PI*.58),r.lookAt(0,3.95,0),n.add(new Xo("#8da7ce","#46362b",1.8));let o=new Bs("#bbcff0",2.3);o.position.set(-4,10,5),o.castShadow=!0,o.shadow.mapSize.set(1024,1024),o.shadow.camera.left=-6,o.shadow.camera.right=6,o.shadow.camera.top=9,o.shadow.camera.bottom=-5,o.shadow.normalBias=.025,n.add(o);let a=new Bs("#ffd6a0",1.7);a.position.set(4,6,7),n.add(a);let c=new $o("#ffad49",0,9,1.5);c.position.set(0,3.8,1),n.add(c);let l=new Yl(t);l.addPass(new Zl(n,r)),l.addPass(new Ws(new le(800,800),.55,.45,1.1)),l.addPass(new $l);let u=Tw(),d=[],h=[u],f=[],m=(C,Y=0,oe=.7,k)=>{let ae=new Is({color:C,metalness:Y,roughness:oe,map:k??null});return d.push(ae),ae},y=m("#d2aa73",0,.8,u),g=m("#624126",0,.83,u),p=m("#aa3023",.05,.52),w=m("#bd9045",.55,.35),T=m("#b89d67"),b=m("#bf9060",0,.83,u),A=m("#292522"),S=m("#873322",0,.78),I=m("#415370"),x=C=>(f.push(C),C),E=x(new jn(1,1,1)),P=x(new Go(1,16,12)),F=x(new ws(1,1,1,12)),N=x(new As(1,1,12));function V(C,Y,oe,k,ae,he,Ie=1,$e=1,je=1){let yt=new qt(C,Y);return yt.position.set(k,ae,he),yt.scale.set(Ie,$e,je),yt.castShadow=!0,yt.receiveShadow=!0,oe.add(yt),yt}let B=(C,Y,oe,k,ae,he,Ie,$e)=>V(E,Y,C,oe,k,ae,he,Ie,$e),U=(C,Y,oe,k,ae,he,Ie=he,$e=he)=>V(P,Y,C,oe,k,ae,he,Ie,$e),H=(C,Y,oe,k,ae,he,Ie)=>V(F,Y,C,oe,k,ae,he,Ie,he);function Z(C,Y,oe,k,ae=y){let he=oe.clone().sub(Y),Ie=H(C,ae,0,0,0,k,he.length());return Ie.position.copy(Y).add(oe).multiplyScalar(.5),Ie.quaternion.setFromUnitVectors(new R(0,1,0),he.normalize()),Ie}function ne(C,Y,oe,k){return V(x(new Wo(new Ms(Y),20,oe,6,!1)),k,C,0,0,0)}let G=new fi;n.add(G),B(G,g,0,.12,0,1.2,.22,.95),B(G,p,0,.32,0,.96,.2,.72),H(G,y,0,3.7,0,.037,6.65);for(let C of[2.15,2.91,3.45,3.91,4.58,5.2,6.15])H(G,w,0,C,0,.062,.07);for(let C of[6.05,6.5]){for(let Y of[-1,1])B(G,y,Y*.56,C,0,.07,.065,1.16),B(G,y,0,C,Y*.56,1.16,.065,.07);if(C===6.05){let Y=new _s(E,g,36),oe=new _t,k=new R(.013,.43,.013);for(let ae=0;ae<36;ae++){let he=Math.floor(ae/9),Ie=-.5+ae%9/8,$e=he<2?he?.55:-.55:Ie,je=he<2?Ie:he===2?-.55:.55;oe.compose(new R($e,6.27,je),new ni,k),Y.setMatrixAt(ae,oe)}Y.castShadow=!0,G.add(Y)}}H(G,g,0,6.82,0,.045,.58),B(G,A,0,7.05,0,.27,.045,.16);let j=new fi;j.position.set(0,7.06,0),G.add(j),U(j,w,0,.22,0,.08,.14,.09),ne(j,[new R(0,.27,0),new R(-.04,.39,0),new R(-.16,.48,0)],.035,w),U(j,w,-.17,.48,0,.052);let ie=V(N,w,j,-.245,.472,.006,.025,.1,.025);ie.rotation.z=Math.PI/2,U(j,A,-.186,.49,.048,.008);for(let C=0;C<7;C++)for(let Y of[-1,1]){let oe=new Es;oe.moveTo(0,0),oe.quadraticCurveTo(.05,.31,.1,.6-C*.048),oe.quadraticCurveTo(.13,.24,0,0);let k=V(x(new Ho(oe,{depth:.008,bevelEnabled:!1})),C%2?w:p,j,Y*.035,.26,-.028*C);k.rotation.z=-Y*(.28+C*.13),k.scale.x=Y}for(let C=0;C<4;C++)ne(j,[new R(.02,.2,-.045),new R(.12+C*.09,.14,-.2),new R(.3+C*.07,.36+C*.03,-.4)],.013,C%2?p:w);for(let C of[-1,1])Z(j,new R(C*.03,.05,0),new R(C*.05,.17,0),.013,w),B(j,w,C*.05,.04,.025,.055,.014,.1);let Ce=new Map,Ee=new Map,dt=[];function st(C,Y,oe){let k=new fi;if(k.position.set(oe,-.6,0),C.add(k),Y==="horse"){U(k,b,0,.1,-.005,.11,.07,.045),U(k,b,.085,.21,0,.045,.06,.045),U(k,b,.12,.21,.025,.04,.035,.04),Z(k,new R(.06,.1,0),new R(.075,.2,0),.03,b);for(let Ie of[-.065,.055])for(let $e of[-.025,.025])H(k,g,Ie,.04,$e,.012,.085);B(k,S,-.02,.14,0,.09,.028,.09);return}for(let Ie of[-.026,.026])H(k,A,Ie,.032,0,.016,.065),B(k,A,Ie,.008,.012,.03,.016,.045);U(k,Y==="monk"?S:Y==="pig"?I:p,0,.125,0,.052,.074,.034);let ae=U(k,b,0,.235,0,.052,.058,.045);if(U(k,A,-.017,.245,.042,.006),U(k,A,.017,.245,.042,.006),U(k,b,0,.226,.047,.009,.008,.007),Y==="pig"){U(k,b,0,.228,.057,.023,.013,.013);for(let Ie of[-1,1])U(k,b,Ie*.048,.268,0,.012,.025,.008)}if(Y==="monkey"){for(let Ie of[-1,1])U(k,b,Ie*.055,.235,0,.016,.021,.009);ne(k,[new R(0,.11,-.035),new R(.1,.1,-.05),new R(.1,.2,-.07)],.009,b)}if(Y==="monk"){H(k,w,0,.29,0,.055,.025);for(let Ie=0;Ie<5;Ie++)V(N,w,k,Math.cos(Ie*bn/5)*.043,.32,Math.sin(Ie*bn/5)*.043,.015,.045,.015)}else H(k,A,0,.282,0,.047,.024),H(k,w,0,.283,0,.049,.008);let he=new fi;he.position.set(-.044,.17,0),k.add(he),H(he,Y==="monk"?S:p,-.008,-.041,0,.014,.082),U(he,b,-.008,-.08,0,.013),H(k,Y==="monk"?S:I,.055,.13,0,.015,.082),U(k,b,.055,.087,0,.013),H(he,w,-.024,-.025,.025,.005,.26),dt.push({arm:he,head:ae,carrier:C,parent:C.parent,side:Math.sign(C.position.x),base:0})}function lt(C,Y,oe){let k=new fi;k.position.set(Y,-.055,0),C.add(k),H(k,w,0,-.63,0,.26,.035),H(k,p,0,-.017,0,.25,.07),H(k,w,0,.02,0,.256,.016);for(let ae=0;ae<4;ae++){let he=ae*bn/4+Math.PI/4;H(k,T,Math.cos(he)*.23,-.32,Math.sin(he)*.23,.004,.6)}return st(k,oe,0),k}let Q=[];for(let C of ei){let Y=new fi;if(Y.position.fromArray(C.center),Ce.set(C.id,Y),G.add(Y),C.kind==="ring")for(let k of C.rings){let ae=V(x(new Cs(C.radius,.019,6,48)),y,Y,0,k,0);ae.rotation.x=Math.PI/2;for(let he=0;he<3;he++){let Ie=he*bn/3;Z(Y,new R(0,k,0),new R(Math.cos(Ie)*C.radius,k,Math.sin(Ie)*C.radius),.014),U(Y,he===0?p:w,Math.cos(Ie)*C.radius,k,Math.sin(Ie)*C.radius,.027)}}else if(C.kind==="wheel"){V(x(new Cs(C.radius,.04,8,48)),p,Y,0,0,0);for(let k=0;k<5;k++){let ae=k*bn/5,he=B(Y,k===0?w:p,Math.cos(ae)*.22,Math.sin(ae)*.22,0,.4,.043,.038);he.rotation.z=ae}U(Y,w,0,0,.045,.071,.071,.028),U(Y,w,C.radius,0,.005,.039)}else{B(Y,y,0,0,0,C.radius*2+.18,.065,.075);for(let k of[-1,1]){let ae=C.id==="upper-stages"?k<0?"monkey":"pig":k<0?"monk":"horse",he=lt(Y,k*C.radius,ae);Q.push({group:he,layer:C.id,offset:k})}}let oe=new Fs(.35);oe.position.y=C.kind==="ring"?0:.05,oe.visible=!1,Y.add(oe),Ee.set(C.id,oe)}B(G,y,0,1.99,0,3.4,.06,.06);for(let[C,Y]of[[-1,"\u56FD\u6CF0\u6C11\u5B89"],[1,"\u98CE\u8C03\u96E8\u987A"]])H(G,T,C*1.62,1.2,0,.004,1.5),Array.from(Y).forEach((oe,k)=>{let ae=Cw(oe);h.push(ae);let he=m("#ffffff",0,.86,ae),Ie=B(G,he,C*1.62,1.8-k*.29,0,.22,.24,.015);Ie.castShadow=!1});let re=m("#202938",0,.95),ve=m("#414959",0,.95),We=V(x(new Er(70,70)),re,n,0,0,0);We.rotation.x=-Math.PI/2,We.castShadow=!1;let Te=new _s(E,ve,88),Xe=new _t;for(let C=0;C<88;C++)Xe.compose(new R((C%11-5)*1.08,.012,(Math.floor(C/11)-3.5)*1.05),new ni,new R(1.04,.024,1.01)),Te.setMatrixAt(C,Xe);Te.receiveShadow=!0,n.add(Te);let xt=m("#17212e",.1,.78),se=m("#303749",0,.95);B(n,se,0,.65,-4.2,14,1.3,.22),B(n,ve,0,1.32,-4.2,14.1,.09,.33);for(let C=0;C<9;C++)B(n,ve,-7+C*1.75,.79,-4.2,.24,1.6,.3);for(let C of[-4.7,4.7]){for(let ae of[-.55,.55])H(n,g,C+ae,1.7,-5,.11,3.4);B(n,p,C,3.22,-5,1.9,.19,.25);let Y=V(N,xt,n,C,3.72,-5,1.65,.67,1.65);Y.geometry=x(new As(1,1,4)),Y.rotation.y=Math.PI/4;let oe=U(n,w,C,2.95,-4.85,.1,.16,.1),k=new Is({color:"#ffbb66",emissive:"#ff9c30",emissiveIntensity:1.5});d.push(k),oe.material=k}let ue=new Float32Array(vn*3),de=new Float32Array(vn*3),fe=new Float32Array(vn),_e=new Float32Array(vn),ze=new Float32Array(vn*6),Ne=new Float32Array(vn*6),qe=new Float32Array(vn*2);function Ve(C,Y){return new ci(C,Y).setUsage(wh)}let L=x(new Pt);L.setAttribute("position",Ve(ue,3)),L.setAttribute("color",Ve(de,3)),L.setAttribute("alpha",Ve(fe,1)),L.setAttribute("size",Ve(_e,1));let ft=new Rt({transparent:!0,depthWrite:!1,blending:rr,uniforms:{pixelRatio:{value:t.getPixelRatio()}},vertexShader:"attribute float alpha; attribute float size; attribute vec3 color; varying float vAlpha; varying vec3 vColor; uniform float pixelRatio; void main(){vAlpha=alpha;vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(size*pixelRatio*9./max(1.,-mv.z),1.,14.);}",fragmentShader:"varying float vAlpha; varying vec3 vColor; void main(){float d=length(gl_PointCoord-vec2(.5))*2.;if(d>1.)discard;gl_FragColor=vec4(vColor,vAlpha*pow(1.-d,1.3));}"});d.push(ft);let tt=new bs(L,ft);tt.frustumCulled=!1,n.add(tt);let M=x(new Pt);M.setAttribute("position",Ve(ze,3)),M.setAttribute("color",Ve(Ne,3)),M.setAttribute("alpha",Ve(qe,1));let _=new Rt({transparent:!0,depthWrite:!1,blending:rr,vertexShader:"attribute float alpha; attribute vec3 color; varying float vAlpha; varying vec3 vColor; void main(){vAlpha=alpha;vColor=color;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying float vAlpha; varying vec3 vColor; void main(){gl_FragColor=vec4(vColor,vAlpha*.55);}"});d.push(_);let z=new ys(M,_);z.frustumCulled=!1,n.add(z);let W=x(new Pt),K=new Float32Array(96*3),pe=new Float32Array(96);W.setAttribute("position",Ve(K,3)),W.setAttribute("alpha",Ve(pe,1));let me=new Rt({transparent:!0,depthWrite:!1,vertexShader:"attribute float alpha;varying float vAlpha; void main(){vAlpha=alpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(230./max(1.,-mv.z),10.,80.);}",fragmentShader:"varying float vAlpha;void main(){float d=length(gl_PointCoord-vec2(.5))*2.;if(d>1.)discard;gl_FragColor=vec4(.36,.40,.47,vAlpha*pow(1.-d,2.)*.09);}"});d.push(me);let J=new bs(W,me);J.frustumCulled=!1,n.add(J);let ee=new Float64Array(9),xe=new Ye,Be=new R(0,3.95,0),we=0;function ye(C,Y,oe,k){for(let je of C.layers){let yt=Ce.get(je.id),xi=ei.find(Ti=>Ti.id===je.id);yt.rotation[xi.axis]=Yr(je,Y,C.speed),Ee.get(je.id).visible=k&&je.id===oe}for(let je of Q){let yt=C.layers.find(xi=>xi.id===je.layer);je.group.rotation.y=-Yr(yt,Y,C.speed),je.group.rotation.z=Math.sin(Y*2.2+je.offset)*.025*(yt.enabled?1:0)}for(let je of dt)je.arm.rotation.z=.2+Math.sin(Y*3.1+je.side)*.45,je.head.rotation.y=Math.sin(Y*1.9+je.side)*.17;let ae=0,he=0;xe.set(C.color);let Ie=Math.max(1,Math.round(43*C.density));for(let je=0;je<ei.length;je++){let yt=ei[je],xi=C.layers.find(Ci=>Ci.id===yt.id);if(he+=Da(xi,Y),!xi.sparks||!xi.enabled||C.density===0)continue;let Ti=Math.max(0,Math.floor((Y-Zd)*Ie)),Nn=Math.floor(Y*Ie);for(let Ci=0;Ci<Su(yt);Ci++)for(let Gr=Ti;Gr<=Nn&&!(ae>=vn);Gr++){let Ba=(Gr+di(Ci+je*100))/Ie;if(!$d(C,yt,xi,Ci,Ba,Gr,Y,ee))continue;let Gi=ae*3,Ri=ae*6,_r=ee[8]>.8?3.4:1.7;ue[Gi]=ee[0],ue[Gi+1]=ee[1],ue[Gi+2]=ee[2],de[Gi]=xe.r*_r+.15,de[Gi+1]=xe.g*_r+.06,de[Gi+2]=xe.b*_r,fe[ae]=ee[6],_e[ae]=ee[7];for(let yi=0;yi<3;yi++)ze[Ri+yi]=ee[yi],ze[Ri+yi+3]=ee[yi+3],Ne[Ri+yi]=de[Gi+yi],Ne[Ri+yi+3]=de[Gi+yi];qe[ae*2]=ee[6],qe[ae*2+1]=0,ae++}}L.setDrawRange(0,ae),M.setDrawRange(0,ae*2);for(let je of Object.values(L.attributes))je.needsUpdate=!0;for(let je of Object.values(M.attributes))je.needsUpdate=!0;let $e=0;if(C.smoke&&C.density>0)for(let je=0;je<96;je++){let yt=je%ei.length,xi=C.layers.find(Ci=>Ci.id===ei[yt].id),Ti=(Y+di(je+66)*3.4)%3.4,Nn=Y-Ti;Nn<0||Da(xi,Nn)<=.05||(Mu(ei[yt],xi,je%Su(ei[yt]),Nn,C.speed,ee),K[$e*3]=ee[0]+C.wind*Ti+Math.sin(je*11)*Ti*.15,K[$e*3+1]=ee[1]+Ti*.38,K[$e*3+2]=ee[2]-Ti*.13,pe[$e]=Math.sin(Ti/3.4*Math.PI),$e++)}return W.setDrawRange(0,$e),W.attributes.position.needsUpdate=!0,W.attributes.alpha.needsUpdate=!0,c.intensity=he*2.3*C.density,we=ae,s?.update(),t.info.reset(),l.render(),we}function Ue(){let C=s?.target??Be,Y=r.position.clone().sub(C).normalize(),oe=da.degToRad(r.fov/2),k=Math.max(4.3/Math.tan(oe),2.45/(Math.tan(oe)*r.aspect))*1.13;C.set(0,3.95,0),Be.copy(C),r.position.copy(C).addScaledVector(Y,k),r.lookAt(C),s?.update()}function He(C,Y,oe=!1){t.setSize(C,Y),l.setSize(C,Y),r.aspect=C/Y,r.updateProjectionMatrix(),oe&&Ue()}function Je(){return{position:r.position.toArray(),target:(s?.target??Be).toArray()}}function O(C,Y=!1){r.position.fromArray(C.position),Be.fromArray(C.target),s?.target.copy(Be),r.lookAt(Be),Y&&Ue()}function be(){s?.dispose();for(let C of l.passes)C.dispose();l.dispose(),G.traverse(C=>{C instanceof Fs&&(C.geometry.dispose(),(Array.isArray(C.material)?C.material:[C.material]).forEach(oe=>oe.dispose()))}),new Set(f).forEach(C=>C.dispose()),new Set(d).forEach(C=>C.dispose()),h.forEach(C=>C.dispose()),t.dispose(),t.forceContextLoss(),t.domElement.remove()}return{renderer:t,scene:n,camera:r,composer:l,controls:s,update:ye,resize:He,fit:Ue,view:Je,applyView:O,dispose:be}}function te(i){if(!i)throw new Error("Assertion failed.")}var Rw=Math.PI/180,S1=180/Math.PI,Iw=i=>{let e=(i%360+360)%360;if(e===0||e===90||e===180||e===270)return e;throw new Error(`Invalid rotation ${i}.`)},Kh=[1,0,0,0,1,0,0,0,1],nm=(i,e,t)=>{let[n,r,,s,o]=i,a=Math.abs(n)*e+Math.abs(s)*t,c=Math.abs(r)*e+Math.abs(o)*t;return Kl(Kl(im(-e/2,-t/2),i),im(a/2,c/2))};var rm=i=>{let e=i*Rw,t=Math.round(Math.cos(e)),n=Math.round(Math.sin(e));return[t,n,0,-n,t,0,0,0,1]},im=(i,e)=>[1,0,0,0,1,0,i,e,1],sm=(i,e)=>[i,0,0,0,e,0,0,0,1],Kl=(i,e)=>{let t=new Array(9);for(let n=0;n<3;n++)for(let r=0;r<3;r++)t[3*n+r]=i[3*n]*e[r]+i[3*n+1]*e[3+r]+i[3*n+2]*e[6+r];return t},om=(i,e,t,n)=>({rotation:Iw(i+(e?-t:t)),flip:e!==n}),hi=i=>i&&i[i.length-1],dn=i=>i>=0&&i<2**32,am=i=>i>=-(2**31)&&i<2**31,ge=i=>{let e=0;for(;i.readBits(1)===0&&e<32;)e++;if(e>=32)throw new Error("Invalid exponential-Golomb code.");return(1<<e)-1+i.readBits(e)};var fn=i=>{let e=ge(i);return e&1?e+1>>1:-(e>>1)};var si=i=>i.constructor===Uint8Array?i:ArrayBuffer.isView(i)?new Uint8Array(i.buffer,i.byteOffset,i.byteLength):new Uint8Array(i),hr=i=>i.constructor===DataView?i:ArrayBuffer.isView(i)?new DataView(i.buffer,i.byteOffset,i.byteLength):new DataView(i),Pw=typeof globalThis.TextEncoder<"u"?globalThis.TextEncoder:class{constructor(){this.encoding="utf-8"}encode(e=""){let t=new Uint8Array(3*e.length),n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);if(s<128)t[n++]=s;else if(s<2048)t[n++]=192|s>>6,t[n++]=128|s&63;else if(s<55296||s>57343)t[n++]=224|s>>12,t[n++]=128|s>>6&63,t[n++]=128|s&63;else{let o=r+1<e.length?e.charCodeAt(r+1):0;s<56320&&o>=56320&&o<=57343?(s=65536+(s-55296<<10)+(o-56320),r++,t[n++]=240|s>>18,t[n++]=128|s>>12&63,t[n++]=128|s>>6&63,t[n++]=128|s&63):(t[n++]=239,t[n++]=191,t[n++]=189)}}return t.slice(0,n)}},E1=typeof globalThis.TextDecoder<"u"?globalThis.TextDecoder:class{constructor(e="utf-8"){let t=e.trim().toLowerCase();if(t==="utf-8"||t==="utf8"||t==="unicode-1-1-utf-8")this.encoding="utf-8";else if(t==="utf-16le"||t==="utf-16")this.encoding="utf-16le";else if(t==="utf-16be")this.encoding="utf-16be";else throw new RangeError(`The encoding label provided ('${e}') is invalid.`)}decode(e){let t=e?si(e):new Uint8Array(0),n=[];if(this.encoding==="utf-8"){let s=t.length>=3&&t[0]===239&&t[1]===187&&t[2]===191?3:0;for(;s<t.length;){let o=t[s];if(o<128){n.push(o),s++;continue}let a,c;if(o>=194&&o<224)a=1,c=o&31;else if(o>=224&&o<240)a=2,c=o&15;else if(o>=240&&o<245)a=3,c=o&7;else{n.push(65533),s++;continue}let l=o===224?160:o===240?144:128,u=o===237?159:o===244?143:191,d=1;for(;d<=a;d++){let h=s+d<t.length?t[s+d]:0;if(h<l||h>u)break;c=c<<6|h&63,l=128,u=191}s+=d,d<=a?n.push(65533):c>=65536?(c-=65536,n.push(55296|c>>10,56320|c&1023)):n.push(c)}}else{let s=this.encoding==="utf-16le",o=s?255:254,a=s?254:255,c=t.length>=2&&t[0]===o&&t[1]===a?2:0;for(;c+1<t.length;){let l=s?t[c]|t[c+1]<<8:t[c]<<8|t[c+1];if(c+=2,l>=55296&&l<=56319){let u=c+1<t.length?s?t[c]|t[c+1]<<8:t[c]<<8|t[c+1]:-1;u>=56320&&u<=57343?(n.push(l,u),c+=2):n.push(65533)}else l>=56320&&l<=57343?n.push(65533):n.push(l)}c<t.length&&n.push(65533)}let r="";for(let s=0;s<n.length;s+=8192)r+=String.fromCharCode(...n.slice(s,s+8192));return r}};var Ui=new Pw;var Fr={bt709:1,bt470bg:5,smpte170m:6,bt2020:9,smpte432:12};var Dr={bt709:1,smpte170m:6,linear:8,"iec61966-2-1":13,pq:16,hlg:18};var Ur={rgb:0,bt709:1,bt470bg:5,smpte170m:6,"bt2020-ncl":9};var cm=i=>!i||i.primaries==null&&i.transfer==null&&i.matrix==null&&i.fullRange==null;var xa=i=>i instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&i instanceof SharedArrayBuffer||ArrayBuffer.isView(i),qs=class{constructor(){this.currentPromise=Promise.resolve(),this.pending=0}async acquire(){let e,t=new Promise(r=>{let s=!1;e=()=>{s||(r(),this.pending--,s=!0)}}),n=this.currentPromise;return this.currentPromise=t,this.pending++,await n,e}};var Jh=(i,e,t)=>{let n=0,r=i.length-1,s=-1;for(;n<=r;){let o=n+(r-n+1)/2|0;t(i[o])<=e?(s=o,n=o+1):r=o-1}return s};var Ql=()=>{let i,e;return{promise:new Promise((n,r)=>{i=n,e=r}),resolve:i,reject:e}};var Ki=i=>{throw new Error(`Unexpected value: ${i}`)},Qh=(i,e,t)=>{let n=i.getUint8(e),r=i.getUint8(e+1),s=i.getUint8(e+2);return t?n|r<<8|s<<16:n<<16|r<<8|s};var ed=(i,e,t,n)=>{t=t>>>0,t=t&16777215,n?(i.setUint8(e,t&255),i.setUint8(e+1,t>>>8&255),i.setUint8(e+2,t>>>16&255)):(i.setUint8(e,t>>>16&255),i.setUint8(e+1,t>>>8&255),i.setUint8(e+2,t&255))};var Xs=(i,e,t)=>Math.max(e,Math.min(t,i)),lm=(i,e,t)=>i+(e-i)*t;var um="und";var td=(i,e)=>Math.round(i/e)*e;var id=(i,e)=>Math.floor(i*e)/e;var hm=i=>{let e=0;for(;i!==0;)i&=i-1,e++;return e},Bw=/^[a-z]{3}$/,dm=i=>Bw.test(i),dr=1e6*(1+Number.EPSILON);var fm=(i,e)=>{let t=i<0?-1:1;i=Math.abs(i);let n=0,r=1,s=1,o=0,a=i;for(;;){let c=Math.floor(a),l=c*s+n,u=c*o+r;if(u>e)return{num:t*s,den:o};if(n=s,r=o,s=l,o=u,a=1/(a-c),!isFinite(a))break}return{num:t*s,den:o}},Jl=class{constructor(){this.currentPromise=Promise.resolve()}call(e){return this.currentPromise=this.currentPromise.then(e)}};var $h=null,eu=()=>$h!==null?$h:$h=typeof navigator<"u"&&navigator.userAgent?.includes("Firefox"),jh=null,pm=()=>jh!==null?jh:jh=!!(typeof navigator<"u"&&(navigator.vendor?.includes("Google Inc")||/Chrome/.test(navigator.userAgent)));var mm=i=>typeof globalThis.isSecureContext<"u"&&!globalThis.isSecureContext?`${i} is not available in this environment; this may be because this page is running in an insecure context. Try serving your page over HTTPS or use localhost.`:`${i} is not available in this environment.`,gm=i=>i instanceof DOMException&&i.name==="QuotaExceededError"&&/reclaimed/i.test(i.message),Lw=(async()=>{})().constructor,Ji=i=>i instanceof Lw||i instanceof Promise?!0:typeof i?.then=="function";var tu=function*(i){for(let e in i){let t=i[e];t!==void 0&&(yield{key:e,value:t})}};var _m=()=>{Symbol.dispose??=Symbol("Symbol.dispose")},xm=i=>typeof i=="number"&&!Number.isNaN(i);var ym=(i,e)=>{let t=-1,n=1/0;for(let r=0;r<i.length;r++){let s=e(i[r]);s<n&&(n=s,t=r)}return t};var iu=i=>{te(Number.isInteger(i.num)),te(Number.isInteger(i.den)),te(i.den!==0);let e=Math.abs(i.num),t=Math.abs(i.den);for(;t!==0;){let r=e%t;e=t,t=r}let n=e||1;return{num:i.num/n,den:i.den/n}},nu=(i,e)=>{if(typeof i!="object"||!i)throw new TypeError(`${e} must be an object.`);if(!Number.isInteger(i.left)||i.left<0)throw new TypeError(`${e}.left must be a non-negative integer.`);if(!Number.isInteger(i.top)||i.top<0)throw new TypeError(`${e}.top must be a non-negative integer.`);if(!Number.isInteger(i.width)||i.width<0)throw new TypeError(`${e}.width must be a non-negative integer.`);if(!Number.isInteger(i.height)||i.height<0)throw new TypeError(`${e}.height must be a non-negative integer.`)};var bm=i=>new Promise(e=>setTimeout(e,i));var ru=i=>Array.isArray(i)?i:[i],ur=class{constructor(){this._listeners=new Map}on(e,t,n){this._listeners.has(e)||this._listeners.set(e,new Set);let r={fn:t,once:n?.once??!1};return this._listeners.get(e).add(r),()=>{this._listeners.get(e)?.delete(r)}}_emit(...e){let[t,n]=e,r=this._listeners.get(t);if(r)for(let s of r){try{s.fn(n)}catch(o){console.error(o)}s.once&&r.delete(s)}}};var vm=i=>i!==null&&typeof i=="object"&&Object.getPrototypeOf(i)===Object.prototype&&Object.values(i).every(e=>typeof e=="string");var pn;(function(i){i[i.Silent=0]="Silent",i[i.Errors=1]="Errors",i[i.Warnings=2]="Warnings",i[i.Info=3]="Info"})(pn||(pn={}));var Xt=class i{constructor(){}static get level(){return i._level}static set level(e){if(e!==pn.Silent&&e!==pn.Errors&&e!==pn.Warnings&&e!==pn.Info)throw new TypeError("Invalid log level. Use one of the values of the LogLevel enum.");i._level=e}static get _emitter(){return i._emitterInstance??=new ur}static on(e,t,n){return i._emitter.on(e,t,n)}static _error(...e){i._emitter._emit("error",e),i._level>=pn.Errors&&console.error(...e)}static _warn(...e){i._emitter._emit("warn",e),i._level>=pn.Warnings&&console.warn(...e)}static _info(...e){i._emitter._emit("info",e),i._level>=pn.Info&&console.info(...e)}};Xt._level=pn.Info;Xt._emitterInstance=null;var ya=class{constructor(e,t){if(this.data=e,this.mimeType=t,!(e instanceof Uint8Array))throw new TypeError("data must be a Uint8Array.");if(typeof t!="string")throw new TypeError("mimeType must be a string.")}},nd=class{constructor(e,t,n,r){if(this.data=e,this.mimeType=t,this.name=n,this.description=r,!(e instanceof Uint8Array))throw new TypeError("data must be a Uint8Array.");if(t!==void 0&&typeof t!="string")throw new TypeError("mimeType, when provided, must be a string.");if(n!==void 0&&typeof n!="string")throw new TypeError("name, when provided, must be a string.");if(r!==void 0&&typeof r!="string")throw new TypeError("description, when provided, must be a string.")}},wm=i=>{if(!i||typeof i!="object")throw new TypeError("tags must be an object.");if(i.title!==void 0&&typeof i.title!="string")throw new TypeError("tags.title, when provided, must be a string.");if(i.description!==void 0&&typeof i.description!="string")throw new TypeError("tags.description, when provided, must be a string.");if(i.artist!==void 0&&typeof i.artist!="string")throw new TypeError("tags.artist, when provided, must be a string.");if(i.album!==void 0&&typeof i.album!="string")throw new TypeError("tags.album, when provided, must be a string.");if(i.albumArtist!==void 0&&typeof i.albumArtist!="string")throw new TypeError("tags.albumArtist, when provided, must be a string.");if(i.trackNumber!==void 0&&(!Number.isInteger(i.trackNumber)||i.trackNumber<=0))throw new TypeError("tags.trackNumber, when provided, must be a positive integer.");if(i.tracksTotal!==void 0&&(!Number.isInteger(i.tracksTotal)||i.tracksTotal<=0))throw new TypeError("tags.tracksTotal, when provided, must be a positive integer.");if(i.discNumber!==void 0&&(!Number.isInteger(i.discNumber)||i.discNumber<=0))throw new TypeError("tags.discNumber, when provided, must be a positive integer.");if(i.discsTotal!==void 0&&(!Number.isInteger(i.discsTotal)||i.discsTotal<=0))throw new TypeError("tags.discsTotal, when provided, must be a positive integer.");if(i.genre!==void 0&&typeof i.genre!="string")throw new TypeError("tags.genre, when provided, must be a string.");if(i.date!==void 0&&(!(i.date instanceof Date)||Number.isNaN(i.date.getTime())))throw new TypeError("tags.date, when provided, must be a valid Date.");if(i.beatsPerMinute!==void 0&&(!Number.isInteger(i.beatsPerMinute)||i.beatsPerMinute<=0))throw new TypeError("tags.beatsPerMinute, when provided, must be a positive integer.");if(i.lyrics!==void 0&&typeof i.lyrics!="string")throw new TypeError("tags.lyrics, when provided, must be a string.");if(i.images!==void 0){if(!Array.isArray(i.images))throw new TypeError("tags.images, when provided, must be an array.");for(let e of i.images){if(!e||typeof e!="object")throw new TypeError("Each image in tags.images must be an object.");if(!(e.data instanceof Uint8Array))throw new TypeError("Each image.data must be a Uint8Array.");if(typeof e.mimeType!="string")throw new TypeError("Each image.mimeType must be a string.");if(!["coverFront","coverBack","unknown"].includes(e.kind))throw new TypeError("Each image.kind must be 'coverFront', 'coverBack', or 'unknown'.")}}if(i.comment!==void 0&&typeof i.comment!="string")throw new TypeError("tags.comment, when provided, must be a string.");if(i.raw!==void 0){if(!i.raw||typeof i.raw!="object")throw new TypeError("tags.raw, when provided, must be an object.");for(let e of Object.values(i.raw))if(e!==null&&typeof e!="string"&&!(Array.isArray(e)&&e.every(t=>typeof t=="string"))&&!(e instanceof Uint8Array)&&!(e instanceof ya)&&!(e instanceof nd)&&!vm(e))throw new TypeError("Each value in tags.raw must be a string, string array, Uint8Array, RichImageData, AttachedFile, Record<string, string>, or null.")}};var Am=i=>{if(!i||typeof i!="object")throw new TypeError("disposition must be an object.");if(i.default!==void 0&&typeof i.default!="boolean")throw new TypeError("disposition.default must be a boolean.");if(i.primary!==void 0&&typeof i.primary!="boolean")throw new TypeError("disposition.primary must be a boolean.");if(i.forced!==void 0&&typeof i.forced!="boolean")throw new TypeError("disposition.forced must be a boolean.");if(i.original!==void 0&&typeof i.original!="boolean")throw new TypeError("disposition.original must be a boolean.");if(i.commentary!==void 0&&typeof i.commentary!="boolean")throw new TypeError("disposition.commentary must be a boolean.");if(i.hearingImpaired!==void 0&&typeof i.hearingImpaired!="boolean")throw new TypeError("disposition.hearingImpaired must be a boolean.");if(i.visuallyImpaired!==void 0&&typeof i.visuallyImpaired!="boolean")throw new TypeError("disposition.visuallyImpaired must be a boolean.")};var Lt=class i{constructor(e){this.bytes=e,this.pos=0}seekToByte(e){this.pos=8*e}readBit(){let e=Math.floor(this.pos/8),t=this.bytes[e]??0,n=7-(this.pos&7),r=(t&1<<n)>>n;return this.pos++,r}readBits(e){if(e===1)return this.readBit();let t=0;for(let n=0;n<e;n++)t<<=1,t|=this.readBit();return t}writeBits(e,t){let n=this.pos+e;for(let r=this.pos;r<n;r++){let s=Math.floor(r/8),o=this.bytes[s],a=7-(r&7);o&=~(1<<a),o|=(t&1<<n-r-1)>>n-r-1<<a,this.bytes[s]=o}this.pos=n}copyBits(e,t){let n=0;for(n;n<e-7;n+=8)this.writeBits(8,t.readBits(8));let r=e-n;r>0&&this.writeBits(r,t.readBits(r))}readAlignedByte(){if(this.pos%8!==0)throw new Error("Bitstream is not byte-aligned.");let e=this.pos/8,t=this.bytes[e]??0;return this.pos+=8,t}skipBits(e){this.pos+=e}getBitsLeft(){return this.bytes.length*8-this.pos}clone(){let e=new i(this.bytes);return e.pos=this.pos,e}};var sd=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],od=[-1,1,2,3,4,5,6,8];var Em=i=>{let e=i.objectType===5||i.objectType===29,t=i.objectType===29,n=e?i.outputSampleRate/2:i.outputSampleRate,r=t?1:i.outputNumberOfChannels,s=od.indexOf(r);if(s===-1)throw new TypeError(`Unsupported number of channels: ${i.outputNumberOfChannels}`);let o=16;i.objectType>=32&&(o+=6),rd(n)===15&&(o+=24),e&&(o+=9,rd(i.outputSampleRate)===15&&(o+=24));let a=Math.ceil(o/8),c=new Uint8Array(a),l=new Lt(c);return Sm(l,i.objectType),Mm(l,n),l.writeBits(4,s),e&&(Mm(l,i.outputSampleRate),Sm(l,2)),l.writeBits(3,0),c},Sm=(i,e)=>{e<32?i.writeBits(5,e):(i.writeBits(5,31),i.writeBits(6,e-32))},Mm=(i,e)=>{let t=rd(e);i.writeBits(4,t),t===15&&i.writeBits(24,e)},rd=i=>{let e=sd.indexOf(i);return e===-1?15:e};var Tm=[48e3,44100,32e3],Cm=[24e3,22050,16e3];var Fw="1.61.1",su=`Mediabunny v${Fw}`;var Pn;(function(i){i[i.NON_IDR_SLICE=1]="NON_IDR_SLICE",i[i.SLICE_DPA=2]="SLICE_DPA",i[i.SLICE_DPB=3]="SLICE_DPB",i[i.SLICE_DPC=4]="SLICE_DPC",i[i.IDR=5]="IDR",i[i.SEI=6]="SEI",i[i.SPS=7]="SPS",i[i.PPS=8]="PPS",i[i.AUD=9]="AUD",i[i.SPS_EXT=13]="SPS_EXT"})(Pn||(Pn={}));var Oi;(function(i){i[i.RASL_N=8]="RASL_N",i[i.RASL_R=9]="RASL_R",i[i.BLA_W_LP=16]="BLA_W_LP",i[i.RSV_IRAP_VCL23=23]="RSV_IRAP_VCL23",i[i.VPS_NUT=32]="VPS_NUT",i[i.SPS_NUT=33]="SPS_NUT",i[i.PPS_NUT=34]="PPS_NUT",i[i.AUD_NUT=35]="AUD_NUT",i[i.PREFIX_SEI_NUT=39]="PREFIX_SEI_NUT",i[i.SUFFIX_SEI_NUT=40]="SUFFIX_SEI_NUT"})(Oi||(Oi={}));var Ys=function*(i){let e=0,t=-1;for(;e<i.length-2;){let n=i.indexOf(0,e);if(n===-1||n>=i.length-2)break;e=n;let r=0;if(e+3<i.length&&i[e+1]===0&&i[e+2]===0&&i[e+3]===1?r=4:i[e+1]===0&&i[e+2]===1&&(r=3),r===0){e++;continue}t!==-1&&e>t&&(yield{offset:t,length:e-t}),t=e+r,e=t}t!==-1&&t<i.length&&(yield{offset:t,length:i.length-t})},Dm=function*(i,e){let t=0,n=new DataView(i.buffer,i.byteOffset,i.byteLength);for(;t+e<=i.length;){let r;e===1?r=n.getUint8(t):e===2?r=n.getUint16(t,!1):e===3?r=Qh(n,t,!1):(te(e===4),r=n.getUint32(t,!1)),t+=e,yield{offset:t,length:r},t+=r}},Ow=(i,e)=>{if(e.description){let r=(si(e.description)[4]&3)+1;return Dm(i,r)}else return Ys(i)},Um=i=>i&31,ou=i=>{let e=[],t=i.length;for(let n=0;n<t;n++)n+2<t&&i[n]===0&&i[n+1]===0&&i[n+2]===3?(e.push(0,0),n+=2):e.push(i[n]);return new Uint8Array(e)};var q1=new Uint8Array([0,0,0,1]);var Om=(i,e)=>{let t=i.reduce((s,o)=>s+e+o.byteLength,0),n=new Uint8Array(t),r=0;for(let s of i){let o=new DataView(n.buffer,n.byteOffset,n.byteLength);switch(e){case 1:o.setUint8(r,s.byteLength);break;case 2:o.setUint16(r,s.byteLength,!1);break;case 3:ed(o,r,s.byteLength,!1);break;case 4:o.setUint32(r,s.byteLength,!1);break}r+=e,n.set(s,r),r+=s.byteLength}return n};var Nm=i=>{try{let e=[],t=[],n=[];for(let a of Ys(i)){let c=i.subarray(a.offset,a.offset+a.length),l=Um(c[0]);l===Pn.SPS?e.push(c):l===Pn.PPS?t.push(c):l===Pn.SPS_EXT&&n.push(c)}if(e.length===0||t.length===0)return null;let r=e[0],s=Nw(r);te(s!==null);let o=s.profileIdc===100||s.profileIdc===110||s.profileIdc===122||s.profileIdc===144;return{configurationVersion:1,avcProfileIndication:s.profileIdc,profileCompatibility:s.constraintFlags,avcLevelIndication:s.levelIdc,lengthSizeMinusOne:3,sequenceParameterSets:e,pictureParameterSets:t,chromaFormat:o?s.chromaFormatIdc:null,bitDepthLumaMinus8:o?s.bitDepthLumaMinus8:null,bitDepthChromaMinus8:o?s.bitDepthChromaMinus8:null,sequenceParameterSetExt:o?n:null}}catch(e){return Xt._error("Error building AVC Decoder Configuration Record:",e),null}},km=i=>{let e=[];e.push(i.configurationVersion),e.push(i.avcProfileIndication),e.push(i.profileCompatibility),e.push(i.avcLevelIndication),e.push(252|i.lengthSizeMinusOne&3),e.push(224|i.sequenceParameterSets.length&31);for(let t of i.sequenceParameterSets){let n=t.byteLength;e.push(n>>8),e.push(n&255);for(let r=0;r<n;r++)e.push(t[r])}e.push(i.pictureParameterSets.length);for(let t of i.pictureParameterSets){let n=t.byteLength;e.push(n>>8),e.push(n&255);for(let r=0;r<n;r++)e.push(t[r])}if((i.avcProfileIndication===100||i.avcProfileIndication===110||i.avcProfileIndication===122||i.avcProfileIndication===144)&&i.chromaFormat!==null){te(i.bitDepthLumaMinus8!==null),te(i.bitDepthChromaMinus8!==null),te(i.sequenceParameterSetExt!==null),e.push(252|i.chromaFormat&3),e.push(248|i.bitDepthLumaMinus8&7),e.push(248|i.bitDepthChromaMinus8&7),e.push(i.sequenceParameterSetExt.length);for(let t of i.sequenceParameterSetExt){let n=t.byteLength;e.push(n>>8),e.push(n&255);for(let r=0;r<n;r++)e.push(t[r])}}return new Uint8Array(e)};var zm={1:{num:1,den:1},2:{num:12,den:11},3:{num:10,den:11},4:{num:16,den:11},5:{num:40,den:33},6:{num:24,den:11},7:{num:20,den:11},8:{num:32,den:11},9:{num:80,den:33},10:{num:18,den:11},11:{num:15,den:11},12:{num:64,den:33},13:{num:160,den:99},14:{num:4,den:3},15:{num:3,den:2},16:{num:2,den:1}},Nw=i=>{try{let e=ou(i),t=new Lt(e);if(t.skipBits(1),t.skipBits(2),t.readBits(5)!==7)return null;let r=t.readAlignedByte(),s=t.readAlignedByte(),o=t.readAlignedByte();ge(t);let a=1,c=0,l=0,u=0;if((r===100||r===110||r===122||r===244||r===44||r===83||r===86||r===118||r===128)&&(a=ge(t),a===3&&(u=t.readBits(1)),c=ge(t),l=ge(t),t.skipBits(1),t.readBits(1))){for(let H=0;H<(a!==3?8:12);H++)if(t.readBits(1)){let ne=H<6?16:64,G=8,j=8;for(let ie=0;ie<ne;ie++){if(j!==0){let Ce=fn(t);j=(G+Ce+256)%256}G=j===0?G:j}}}ge(t);let d=ge(t);if(d===0)ge(t);else if(d===1){t.skipBits(1),fn(t),fn(t);let U=ge(t);for(let H=0;H<U;H++)fn(t)}ge(t),t.skipBits(1);let h=ge(t),f=ge(t),m=16*(h+1),y=16*(f+1),g=m,p=y,w=t.readBits(1);if(w||t.skipBits(1),t.skipBits(1),t.readBits(1)){let U=ge(t),H=ge(t),Z=ge(t),ne=ge(t),G,j;if((u===0?a:0)===0)G=1,j=2-w;else{let Ce=a===3?1:2,Ee=a===1?2:1;G=Ce,j=Ee*(2-w)}g-=G*(U+H),p-=j*(Z+ne)}let b=2,A=2,S=2,I=0,x={num:1,den:1},E=null,P=null,F=null,N=null,V=t.pos;if(t.readBits(1)){if(t.readBits(1)){let Ce=t.readBits(8);if(Ce===255)x={num:t.readBits(16),den:t.readBits(16)};else{let Ee=zm[Ce];Ee&&(x=Ee)}}t.readBits(1)&&t.skipBits(1),t.readBits(1)&&(t.skipBits(3),I=t.readBits(1),t.readBits(1)&&(b=t.readBits(8),A=t.readBits(8),S=t.readBits(8))),t.readBits(1)&&(ge(t),ge(t)),t.readBits(1)&&(t.skipBits(32),t.skipBits(32),t.skipBits(1));let j=t.readBits(1);j&&Rm(t);let ie=t.readBits(1);ie&&Rm(t),(j||ie)&&t.skipBits(1),t.skipBits(1),F=t.pos,N=t.readBits(1),N&&(t.skipBits(1),ge(t),ge(t),ge(t),ge(t),E=ge(t),P=ge(t))}if(E===null){te(P===null);let U=s&16;if((r===44||r===86||r===100||r===110||r===122||r===244)&&U)E=0,P=0;else{let H=h+1,Z=f+1,ne=(2-w)*Z,G=ba.find(ie=>ie.level>=o)??hi(ba),j=Math.min(Math.floor(G.maxDpbMbs/(H*ne)),16);E=j,P=j}}return te(P!==null),{emulationUnpreventedBytes:e,profileIdc:r,constraintFlags:s,levelIdc:o,frameMbsOnlyFlag:w,chromaFormatIdc:a,bitDepthLumaMinus8:c,bitDepthChromaMinus8:l,codedWidth:m,codedHeight:y,displayWidth:g,displayHeight:p,pixelAspectRatio:x,colourPrimaries:b,matrixCoefficients:S,transferCharacteristics:A,fullRangeFlag:I,numReorderFrames:E,maxDecFrameBuffering:P,vuiParametersFlagBitOffset:V,bitstreamRestrictionFlagBitOffset:F,bitstreamRestrictionFlag:N}}catch(e){return Xt._error("Error parsing AVC SPS:",e),null}},Rm=i=>{let e=ge(i);i.skipBits(4),i.skipBits(4);for(let t=0;t<=e;t++)ge(i),ge(i),i.skipBits(1);i.skipBits(5),i.skipBits(5),i.skipBits(5),i.skipBits(5)};var kw=(i,e)=>{if(e.description){let r=(si(e.description)[21]&3)+1;return Dm(i,r)}else return Ys(i)},ad=i=>i>>1&63,zw=i=>{try{let e=new Lt(ou(i));e.skipBits(16),e.readBits(4);let t=e.readBits(3),n=e.readBits(1),{general_profile_space:r,general_tier_flag:s,general_profile_idc:o,general_profile_compatibility_flags:a,general_constraint_indicator_flags:c,general_level_idc:l}=Vw(e,t);ge(e);let u=ge(e),d=0;u===3&&(d=e.readBits(1));let h=ge(e),f=ge(e),m=h,y=f;if(e.readBits(1)){let N=ge(e),V=ge(e),B=ge(e),U=ge(e),H=1,Z=1,ne=d===0?u:0;ne===1?(H=2,Z=2):ne===2&&(H=2,Z=1),m-=(N+V)*H,y-=(B+U)*Z}let g=ge(e),p=ge(e);ge(e);let T=e.readBits(1)?0:t,b=0;for(let N=T;N<=t;N++)ge(e),b=ge(e),ge(e);ge(e),ge(e),ge(e),ge(e),ge(e),ge(e),e.readBits(1)&&e.readBits(1)&&Hw(e),e.skipBits(1),e.skipBits(1),e.readBits(1)&&(e.skipBits(4),e.skipBits(4),ge(e),ge(e),e.skipBits(1));let A=ge(e);if(Gw(e,A),e.readBits(1)){let N=ge(e);for(let V=0;V<N;V++)ge(e),e.skipBits(1)}e.skipBits(1),e.skipBits(1);let S=2,I=2,x=2,E=0,P=0,F={num:1,den:1};if(e.readBits(1)){let N=qw(e,t);F=N.pixelAspectRatio,S=N.colourPrimaries,I=N.transferCharacteristics,x=N.matrixCoefficients,E=N.fullRangeFlag,P=N.minSpatialSegmentationIdc}return{displayWidth:m,displayHeight:y,pixelAspectRatio:F,colourPrimaries:S,transferCharacteristics:I,matrixCoefficients:x,fullRangeFlag:E,maxDecFrameBuffering:b+1,spsMaxSubLayersMinus1:t,spsTemporalIdNestingFlag:n,generalProfileSpace:r,generalTierFlag:s,generalProfileIdc:o,generalProfileCompatibilityFlags:a,generalConstraintIndicatorFlags:c,generalLevelIdc:l,chromaFormatIdc:u,bitDepthLumaMinus8:g,bitDepthChromaMinus8:p,minSpatialSegmentationIdc:P}}catch(e){return Xt._error("Error parsing HEVC SPS:",e),null}},Vm=i=>{try{let e=[],t=[],n=[],r=[];for(let l of Ys(i)){let u=i.subarray(l.offset,l.offset+l.length),d=ad(u[0]);d===Oi.VPS_NUT?e.push(u):d===Oi.SPS_NUT?t.push(u):d===Oi.PPS_NUT?n.push(u):(d===Oi.PREFIX_SEI_NUT||d===Oi.SUFFIX_SEI_NUT)&&r.push(u)}if(t.length===0||n.length===0)return null;let s=zw(t[0]);if(!s)return null;let o=0;if(n.length>0){let l=n[0],u=new Lt(ou(l));u.skipBits(16),ge(u),ge(u),u.skipBits(1),u.skipBits(1),u.skipBits(3),u.skipBits(1),u.skipBits(1),ge(u),ge(u),fn(u),u.skipBits(1),u.skipBits(1),u.readBits(1)&&ge(u),fn(u),fn(u),u.skipBits(1),u.skipBits(1),u.skipBits(1),u.skipBits(1);let d=u.readBits(1),h=u.readBits(1);!d&&!h?o=0:d&&!h?o=2:!d&&h?o=3:o=0}let a=[...e.length?[{arrayCompleteness:1,nalUnitType:Oi.VPS_NUT,nalUnits:e}]:[],...t.length?[{arrayCompleteness:1,nalUnitType:Oi.SPS_NUT,nalUnits:t}]:[],...n.length?[{arrayCompleteness:1,nalUnitType:Oi.PPS_NUT,nalUnits:n}]:[],...r.length?[{arrayCompleteness:1,nalUnitType:ad(r[0][0]),nalUnits:r}]:[]];return{configurationVersion:1,generalProfileSpace:s.generalProfileSpace,generalTierFlag:s.generalTierFlag,generalProfileIdc:s.generalProfileIdc,generalProfileCompatibilityFlags:s.generalProfileCompatibilityFlags,generalConstraintIndicatorFlags:s.generalConstraintIndicatorFlags,generalLevelIdc:s.generalLevelIdc,minSpatialSegmentationIdc:s.minSpatialSegmentationIdc,parallelismType:o,chromaFormatIdc:s.chromaFormatIdc,bitDepthLumaMinus8:s.bitDepthLumaMinus8,bitDepthChromaMinus8:s.bitDepthChromaMinus8,avgFrameRate:0,constantFrameRate:0,numTemporalLayers:s.spsMaxSubLayersMinus1+1,temporalIdNested:s.spsTemporalIdNestingFlag,lengthSizeMinusOne:3,arrays:a}}catch(e){return Xt._error("Error building HEVC Decoder Configuration Record:",e),null}},Vw=(i,e)=>{let t=i.readBits(2),n=i.readBits(1),r=i.readBits(5),s=0;for(let u=0;u<32;u++)s=s<<1|i.readBits(1);let o=new Uint8Array(6);for(let u=0;u<6;u++)o[u]=i.readBits(8);let a=i.readBits(8),c=[],l=[];for(let u=0;u<e;u++)c.push(i.readBits(1)),l.push(i.readBits(1));if(e>0)for(let u=e;u<8;u++)i.skipBits(2);for(let u=0;u<e;u++)c[u]&&i.skipBits(88),l[u]&&i.skipBits(8);return{general_profile_space:t,general_tier_flag:n,general_profile_idc:r,general_profile_compatibility_flags:s,general_constraint_indicator_flags:o,general_level_idc:a}},Hw=i=>{for(let e=0;e<4;e++)for(let t=0;t<(e===3?2:6);t++)if(!i.readBits(1))ge(i);else{let r=Math.min(64,1<<4+(e<<1));e>1&&fn(i);for(let s=0;s<r;s++)fn(i)}},Gw=(i,e)=>{let t=[];for(let n=0;n<e;n++)t[n]=Ww(i,n,e,t)},Ww=(i,e,t,n)=>{let r=0,s=0,o=0;if(e!==0&&(s=i.readBits(1)),s){if(e===t){let c=ge(i);o=e-(c+1)}else o=e-1;i.readBits(1),ge(i);let a=n[o]??0;for(let c=0;c<=a;c++)i.readBits(1)||i.readBits(1);r=n[o]}else{let a=ge(i),c=ge(i);for(let l=0;l<a;l++)ge(i),i.readBits(1);for(let l=0;l<c;l++)ge(i),i.readBits(1);r=a+c}return r},qw=(i,e)=>{let t=2,n=2,r=2,s=0,o=0,a={num:1,den:1};if(i.readBits(1)){let c=i.readBits(8);if(c===255)a={num:i.readBits(16),den:i.readBits(16)};else{let l=zm[c];l&&(a=l)}}return i.readBits(1)&&i.readBits(1),i.readBits(1)&&(i.readBits(3),s=i.readBits(1),i.readBits(1)&&(t=i.readBits(8),n=i.readBits(8),r=i.readBits(8))),i.readBits(1)&&(ge(i),ge(i)),i.readBits(1),i.readBits(1),i.readBits(1),i.readBits(1)&&(ge(i),ge(i),ge(i),ge(i)),i.readBits(1)&&(i.readBits(32),i.readBits(32),i.readBits(1)&&ge(i),i.readBits(1)&&Xw(i,!0,e)),i.readBits(1)&&(i.readBits(1),i.readBits(1),i.readBits(1),o=ge(i),ge(i),ge(i),ge(i),ge(i)),{pixelAspectRatio:a,colourPrimaries:t,transferCharacteristics:n,matrixCoefficients:r,fullRangeFlag:s,minSpatialSegmentationIdc:o}},Xw=(i,e,t)=>{let n=!1,r=!1,s=!1;e&&(n=i.readBits(1)===1,r=i.readBits(1)===1,(n||r)&&(s=i.readBits(1)===1,s&&(i.readBits(8),i.readBits(5),i.readBits(1),i.readBits(5)),i.readBits(4),i.readBits(4),s&&i.readBits(4),i.readBits(5),i.readBits(5),i.readBits(5)));for(let o=0;o<=t;o++){let a=i.readBits(1)===1,c=!0;a||(c=i.readBits(1)===1);let l=!1;c?ge(i):l=i.readBits(1)===1;let u=1;l||(u=ge(i)+1),n&&Im(i,u,s),r&&Im(i,u,s)}},Im=(i,e,t)=>{for(let n=0;n<e;n++)ge(i),ge(i),t&&(ge(i),ge(i)),i.readBits(1)},Hm=i=>{let e=[];e.push(i.configurationVersion),e.push((i.generalProfileSpace&3)<<6|(i.generalTierFlag&1)<<5|i.generalProfileIdc&31),e.push(i.generalProfileCompatibilityFlags>>>24&255),e.push(i.generalProfileCompatibilityFlags>>>16&255),e.push(i.generalProfileCompatibilityFlags>>>8&255),e.push(i.generalProfileCompatibilityFlags&255),e.push(...i.generalConstraintIndicatorFlags),e.push(i.generalLevelIdc&255),e.push(240|i.minSpatialSegmentationIdc>>8&15),e.push(i.minSpatialSegmentationIdc&255),e.push(252|i.parallelismType&3),e.push(252|i.chromaFormatIdc&3),e.push(248|i.bitDepthLumaMinus8&7),e.push(248|i.bitDepthChromaMinus8&7),e.push(i.avgFrameRate>>8&255),e.push(i.avgFrameRate&255),e.push((i.constantFrameRate&3)<<6|(i.numTemporalLayers&7)<<3|(i.temporalIdNested&1)<<2|i.lengthSizeMinusOne&3),e.push(i.arrays.length&255);for(let t of i.arrays){e.push((t.arrayCompleteness&1)<<7|0|t.nalUnitType&63),e.push(t.nalUnits.length>>8&255),e.push(t.nalUnits.length&255);for(let n of t.nalUnits){e.push(n.length>>8&255),e.push(n.length&255);for(let r=0;r<n.length;r++)e.push(n[r])}}return new Uint8Array(e)};var Pm;(function(i){i[i.audAllowed=0]="audAllowed",i[i.beforeFirstVcl=1]="beforeFirstVcl",i[i.afterFirstVcl=2]="afterFirstVcl",i[i.eoBitstreamAllowed=3]="eoBitstreamAllowed",i[i.noMoreDataAllowed=4]="noMoreDataAllowed"})(Pm||(Pm={}));var Yw=function*(i){let e=new Lt(i),t=()=>{let n=0;for(let r=0;r<8;r++){let s=e.readAlignedByte();if(n+=(s&127)*2**(r*7),!(s&128))break;if(r===7&&s&128)return null}return n>2**32-1?null:n};for(;e.getBitsLeft()>=8;){e.skipBits(1);let n=e.readBits(4),r=e.readBits(1),s=e.readBits(1);e.skipBits(1),r&&e.skipBits(8);let o;if(s){let a=t();if(a===null)return;o=a}else o=Math.floor(e.getBitsLeft()/8);te(e.pos%8===0),yield{type:n,data:i.subarray(e.pos/8,e.pos/8+o)},e.skipBits(o*8)}};var Gm=i=>{let e=hr(i),t=e.getUint8(9),n=e.getUint16(10,!0),r=e.getUint32(12,!0),s=e.getInt16(16,!0),o=e.getUint8(18),a=null;return o&&(a=i.subarray(19,21+t)),{outputChannelCount:t,preSkip:n,inputSampleRate:r,outputGain:s,channelMappingFamily:o,channelMappingTable:a}};var Wm=(i,e,t)=>{switch(i){case"avc":{for(let n of Ow(t,e)){let r=t[n.offset],s=Um(r);if(s>=Pn.NON_IDR_SLICE&&s<=Pn.SLICE_DPC)return"delta";if(s===Pn.IDR)return"key";if(s===Pn.SEI&&!pm()){let o=t.subarray(n.offset,n.offset+n.length),a=ou(o),c=1;do{let l=0;for(;;){let h=a[c++];if(h===void 0||(l+=h,h<255))break}let u=0;for(;;){let h=a[c++];if(h===void 0||(u+=h,h<255))break}if(l===6){let h=new Lt(a);h.pos=8*c;let f=ge(h),m=h.readBits(1);if(f===0&&m===1)return"key"}c+=u}while(c<a.length-1)}}return"delta"}case"hevc":{for(let n of kw(t,e)){let r=ad(t[n.offset]);if(r<Oi.BLA_W_LP)return"delta";if(r<=Oi.RSV_IRAP_VCL23)return"key"}return"delta"}case"vp8":return(t[0]&1)===0?"key":"delta";case"vp9":{let n=new Lt(t);if(n.readBits(2)!==2)return null;let r=n.readBits(1);return(n.readBits(1)<<1)+r===3&&n.skipBits(1),n.readBits(1)?null:n.readBits(1)===0?"key":"delta"}case"av1":{let n=!1;for(let{type:r,data:s}of Yw(t))if(r===1){let o=new Lt(s);o.skipBits(4),n=!!o.readBits(1)}else if(r===3||r===6||r===7){if(n)return"key";let o=new Lt(s);return o.readBits(1)?null:o.readBits(2)===0?"key":"delta"}return null}case"prores":return"key";default:Ki(i),te(!1)}},Bm;(function(i){i[i.STREAMINFO=0]="STREAMINFO",i[i.VORBIS_COMMENT=4]="VORBIS_COMMENT",i[i.PICTURE=6]="PICTURE"})(Bm||(Bm={}));var qm=i=>{if(i.length<7||i[0]!==11||i[1]!==119)return null;let e=new Lt(i);e.skipBits(16),e.skipBits(16);let t=e.readBits(2);if(t===3)return null;let n=e.readBits(6),r=e.readBits(5);if(r>8)return null;let s=e.readBits(3),o=e.readBits(3);o&1&&o!==1&&e.skipBits(2),o&4&&e.skipBits(2),o===2&&e.skipBits(2);let a=e.readBits(1),c=Math.floor(n/2);return{fscod:t,bsid:r,bsmod:s,acmod:o,lfeon:a,bitRateCode:c}},X1=[64*2,69*2,96*2,64*2,70*2,96*2,80*2,87*2,120*2,80*2,88*2,120*2,96*2,104*2,144*2,96*2,105*2,144*2,112*2,121*2,168*2,112*2,122*2,168*2,128*2,139*2,192*2,128*2,140*2,192*2,160*2,174*2,240*2,160*2,175*2,240*2,192*2,208*2,288*2,192*2,209*2,288*2,224*2,243*2,336*2,224*2,244*2,336*2,256*2,278*2,384*2,256*2,279*2,384*2,320*2,348*2,480*2,320*2,349*2,480*2,384*2,417*2,576*2,384*2,418*2,576*2,448*2,487*2,672*2,448*2,488*2,672*2,512*2,557*2,768*2,512*2,558*2,768*2,640*2,696*2,960*2,640*2,697*2,960*2,768*2,835*2,1152*2,768*2,836*2,1152*2,896*2,975*2,1344*2,896*2,976*2,1344*2,1024*2,1114*2,1536*2,1024*2,1115*2,1536*2,1152*2,1253*2,1728*2,1152*2,1254*2,1728*2,1280*2,1393*2,1920*2,1280*2,1394*2,1920*2];var Y1=new Uint8Array([5,4,65,67,45,51]),Z1=new Uint8Array([5,4,69,65,67,51]),Zw=[1,2,3,6],Xm=i=>{if(i.length<6||i[0]!==11||i[1]!==119)return null;let e=new Lt(i);e.skipBits(16);let t=e.readBits(2);if(e.skipBits(3),t!==0&&t!==2)return null;let n=e.readBits(11),r=e.readBits(2),s=0,o;r===3?(s=e.readBits(2),o=3):o=e.readBits(2);let a=e.readBits(3),c=e.readBits(1),l=e.readBits(5);if(l<11||l>16)return null;let u=Zw[o],d;return r<3?d=Tm[r]/1e3:d=Cm[s]/1e3,{dataRate:Math.round((n+1)*d/(u*16)),substreams:[{fscod:r,fscod2:s,bsid:l,bsmod:0,acmod:a,lfeon:c,numDepSub:0,chanLoc:0}]}};var $w=1683496997,jw=18,Kw=10;var Lm=32,Jw=20,Qw=8,eA=[0,8e3,16e3,32e3,0,0,11025,22050,44100,0,0,12e3,24e3,48e3,96e3,192e3],tA=[32e3,56e3,64e3,96e3,112e3,128e3,192e3,224e3,256e3,32e4,384e3,448e3,512e3,576e3,64e4,768e3,96e4,1024e3,1152e3,128e4,1344e3,1408e3,1411200,1472e3,1536e3,192e4,2048e3,3072e3,384e4,0,0,0],iA=[16,16,20,20,0,24,24,0],Fm=[1,2,2,2,2,3,3,4,4,5,6,6,6,7,8,8],nA=[1,2,2,2,2,3,18,19,6,7,518,323,83,519,582,535],rA=8;var sA=[32e3,44100,48e3,0],oA=[8e3,16e3,32e3,64e3,128e3,22050,44100,88200,176400,352800,12e3,24e3,48e3,96e3,192e3,384e3],aA=[512,1024,2048,4096],Ym=i=>{let e=cA(i),t=hr(i),n=e?Math.ceil(e.frameSize/4)*4:0,r=null;for(;n+4<=i.length&&t.getUint32(n)===$w;){let o=lA(i.subarray(n));if(!o)break;r??=o,n+=o.frameSize}if(e)return{frameSize:r?n:e.frameSize,sampleRate:e.sampleRate,numberOfChannels:e.numberOfChannels,sampleCount:e.sampleCount,channelLayout:e.channelLayout,pcmResolution:e.pcmResolution,bitRate:e.bitRate,core:e,hasExtensions:r!==null};if(!r?.asset)return null;let{asset:s}=r;return{frameSize:n,sampleRate:s.sampleRate,numberOfChannels:s.numberOfChannels,sampleCount:s.sampleCount,channelLayout:s.channelLayout,pcmResolution:s.pcmResolution,bitRate:0,core:null,hasExtensions:!0}};var cA=i=>{if(i.length<jw||i[0]!==127||i[1]!==254||i[2]!==128||i[3]!==1)return null;let e=new Lt(i);if(e.skipBits(32),e.skipBits(1),e.readBits(5)!==Lm-1)return null;let t=e.readBits(1),n=e.readBits(7)+1;if(n%Qw!==0)return null;let r=e.readBits(14)+1;if(r<96)return null;let s=e.readBits(6);if(s>=Fm.length)return null;let o=eA[e.readBits(4)];if(o===0)return null;let a=tA[e.readBits(5)];if(e.readBits(1)!==0)return null;e.skipBits(4),e.skipBits(5);let c=e.readBits(2);if(c===3)return null;e.skipBits(1),t&&e.skipBits(16),e.skipBits(7);let l=iA[e.readBits(3)];if(l===0)return null;let u=c!==0;return{frameSize:r,sampleRate:o,numberOfChannels:Fm[s]+(u?1:0),sampleCount:n*Lm,channelLayout:nA[s]|(u?rA:0),amode:s,lfePresent:u,bitRate:a,pcmResolution:l}},lA=i=>{if(i.length<Kw||i[0]!==100||i[1]!==88||i[2]!==32||i[3]!==37)return null;let e=new Lt(i);e.skipBits(32),e.skipBits(8);let t=e.readBits(2),n=e.readBits(1),r=8+4*n,s=16+4*n;e.skipBits(r);let o=e.readBits(s)+1,a={frameSize:o,asset:null};if(!e.readBits(1))return a;let c=sA[e.readBits(2)],l=512*(e.readBits(3)+1);e.readBits(1)&&e.skipBits(36);let u=e.readBits(3)+1,d=e.readBits(3)+1,h=[];for(let p=0;p<u;p++)h.push(e.readBits(t+1));for(let p of h)e.skipBits(8*hm(p));if(e.readBits(1)){e.skipBits(2);let p=e.readBits(2)+1<<2,w=e.readBits(2)+1;e.skipBits(w*p)}for(let p=0;p<d;p++)e.skipBits(s);e.skipBits(9),e.skipBits(3),e.readBits(1)&&e.skipBits(4),e.readBits(1)&&e.skipBits(24),e.readBits(1)&&e.skipBits(8*(e.readBits(10)+1));let f=e.readBits(5)+1,m=oA[e.readBits(4)],y=e.readBits(8)+1,g=0;if(e.readBits(1)&&(y>2&&e.skipBits(1),y>6&&e.skipBits(1),e.readBits(1))){let p=e.readBits(2)+1<<2;g=e.readBits(p)}return c===0||e.getBitsLeft()<0?a:{frameSize:o,asset:{sampleRate:m,numberOfChannels:y,sampleCount:Math.round(l*m/c),channelLayout:g,pcmResolution:f}}};var Zm=i=>{let e=new Uint8Array(Jw),t=hr(e);t.setUint32(0,i.sampleRate),t.setUint32(4,i.bitRate),t.setUint32(8,i.bitRate),e[12]=i.pcmResolution;let n=i.core&&!i.hasExtensions?1:0,r=new Lt(e);return r.seekToByte(13),r.writeBits(2,Math.max(aA.indexOf(i.sampleCount),0)),r.writeBits(5,n),r.writeBits(1,i.core?.lfePresent?1:0),r.writeBits(6,i.core?.amode??0),r.writeBits(14,i.core?i.core.frameSize-1:0),r.writeBits(1,0),r.writeBits(3,0),r.writeBits(16,i.channelLayout),r.writeBits(1,0),r.writeBits(1,0),r.writeBits(1,0),r.writeBits(5,0),e};var ki=["avc","hevc","vp9","av1","vp8","prores"],Ni=["pcm-s16","pcm-s16be","pcm-s24","pcm-s24be","pcm-s32","pcm-s32be","pcm-f32","pcm-f32be","pcm-f64","pcm-f64be","pcm-u8","pcm-s8","ulaw","alaw"],au=["aac","opus","mp3","vorbis","flac","ac3","eac3","dts"],Or=[...au,...Ni],fr=["webvtt"],ba=[{maxMacroblocks:99,maxBitrate:64e3,maxDpbMbs:396,level:10},{maxMacroblocks:396,maxBitrate:192e3,maxDpbMbs:900,level:11},{maxMacroblocks:396,maxBitrate:384e3,maxDpbMbs:2376,level:12},{maxMacroblocks:396,maxBitrate:768e3,maxDpbMbs:2376,level:13},{maxMacroblocks:396,maxBitrate:2e6,maxDpbMbs:2376,level:20},{maxMacroblocks:792,maxBitrate:4e6,maxDpbMbs:4752,level:21},{maxMacroblocks:1620,maxBitrate:4e6,maxDpbMbs:8100,level:22},{maxMacroblocks:1620,maxBitrate:1e7,maxDpbMbs:8100,level:30},{maxMacroblocks:3600,maxBitrate:14e6,maxDpbMbs:18e3,level:31},{maxMacroblocks:5120,maxBitrate:2e7,maxDpbMbs:20480,level:32},{maxMacroblocks:8192,maxBitrate:2e7,maxDpbMbs:32768,level:40},{maxMacroblocks:8192,maxBitrate:5e7,maxDpbMbs:32768,level:41},{maxMacroblocks:8704,maxBitrate:5e7,maxDpbMbs:34816,level:42},{maxMacroblocks:22080,maxBitrate:135e6,maxDpbMbs:110400,level:50},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:51},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:52},{maxMacroblocks:139264,maxBitrate:24e7,maxDpbMbs:696320,level:60},{maxMacroblocks:139264,maxBitrate:48e7,maxDpbMbs:696320,level:61},{maxMacroblocks:139264,maxBitrate:8e8,maxDpbMbs:696320,level:62}],$m=[{maxPictureSize:36864,maxBitrate:128e3,tier:"L",level:30},{maxPictureSize:122880,maxBitrate:15e5,tier:"L",level:60},{maxPictureSize:245760,maxBitrate:3e6,tier:"L",level:63},{maxPictureSize:552960,maxBitrate:6e6,tier:"L",level:90},{maxPictureSize:983040,maxBitrate:1e7,tier:"L",level:93},{maxPictureSize:2228224,maxBitrate:12e6,tier:"L",level:120},{maxPictureSize:2228224,maxBitrate:3e7,tier:"H",level:120},{maxPictureSize:2228224,maxBitrate:2e7,tier:"L",level:123},{maxPictureSize:2228224,maxBitrate:5e7,tier:"H",level:123},{maxPictureSize:8912896,maxBitrate:25e6,tier:"L",level:150},{maxPictureSize:8912896,maxBitrate:1e8,tier:"H",level:150},{maxPictureSize:8912896,maxBitrate:4e7,tier:"L",level:153},{maxPictureSize:8912896,maxBitrate:16e7,tier:"H",level:153},{maxPictureSize:8912896,maxBitrate:6e7,tier:"L",level:156},{maxPictureSize:8912896,maxBitrate:24e7,tier:"H",level:156},{maxPictureSize:35651584,maxBitrate:6e7,tier:"L",level:180},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:180},{maxPictureSize:35651584,maxBitrate:12e7,tier:"L",level:183},{maxPictureSize:35651584,maxBitrate:48e7,tier:"H",level:183},{maxPictureSize:35651584,maxBitrate:24e7,tier:"L",level:186},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:186}],cd=[{maxPictureSize:36864,maxBitrate:2e5,level:10},{maxPictureSize:73728,maxBitrate:8e5,level:11},{maxPictureSize:122880,maxBitrate:18e5,level:20},{maxPictureSize:245760,maxBitrate:36e5,level:21},{maxPictureSize:552960,maxBitrate:72e5,level:30},{maxPictureSize:983040,maxBitrate:12e6,level:31},{maxPictureSize:2228224,maxBitrate:18e6,level:40},{maxPictureSize:2228224,maxBitrate:3e7,level:41},{maxPictureSize:8912896,maxBitrate:6e7,level:50},{maxPictureSize:8912896,maxBitrate:12e7,level:51},{maxPictureSize:8912896,maxBitrate:18e7,level:52},{maxPictureSize:35651584,maxBitrate:18e7,level:60},{maxPictureSize:35651584,maxBitrate:24e7,level:61},{maxPictureSize:35651584,maxBitrate:48e7,level:62}],jm=[{maxPictureSize:147456,maxBitrate:15e5,tier:"M",level:0},{maxPictureSize:278784,maxBitrate:3e6,tier:"M",level:1},{maxPictureSize:665856,maxBitrate:6e6,tier:"M",level:4},{maxPictureSize:1065024,maxBitrate:1e7,tier:"M",level:5},{maxPictureSize:2359296,maxBitrate:12e6,tier:"M",level:8},{maxPictureSize:2359296,maxBitrate:3e7,tier:"H",level:8},{maxPictureSize:2359296,maxBitrate:2e7,tier:"M",level:9},{maxPictureSize:2359296,maxBitrate:5e7,tier:"H",level:9},{maxPictureSize:8912896,maxBitrate:3e7,tier:"M",level:12},{maxPictureSize:8912896,maxBitrate:1e8,tier:"H",level:12},{maxPictureSize:8912896,maxBitrate:4e7,tier:"M",level:13},{maxPictureSize:8912896,maxBitrate:16e7,tier:"H",level:13},{maxPictureSize:8912896,maxBitrate:6e7,tier:"M",level:14},{maxPictureSize:8912896,maxBitrate:24e7,tier:"H",level:14},{maxPictureSize:35651584,maxBitrate:6e7,tier:"M",level:15},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:15},{maxPictureSize:35651584,maxBitrate:6e7,tier:"M",level:16},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:16},{maxPictureSize:35651584,maxBitrate:1e8,tier:"M",level:17},{maxPictureSize:35651584,maxBitrate:48e7,tier:"H",level:17},{maxPictureSize:35651584,maxBitrate:16e7,tier:"M",level:18},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:18},{maxPictureSize:35651584,maxBitrate:16e7,tier:"M",level:19},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:19}];var va=["ap4x","ap4h","apch","apcn","apcs","apco"],ld=["dtsc","dtsh","dtsl","dtse"],uA=[{fourCc:"apco",bitrate:45e6,alpha:!1},{fourCc:"apcs",bitrate:102e6,alpha:!1},{fourCc:"apcn",bitrate:147e6,alpha:!1},{fourCc:"apch",bitrate:22e7,alpha:!1},{fourCc:"ap4h",bitrate:33e7,alpha:!0},{fourCc:"ap4x",bitrate:5e8,alpha:!0}],Km=(i,e,t,n,r)=>{if(i==="avc"){let o=Math.ceil(e/16)*Math.ceil(t/16),a=ba.find(h=>o<=h.maxMacroblocks&&n<=h.maxBitrate)??hi(ba),c=a?a.level:0,l="64".padStart(2,"0"),u="00",d=c.toString(16).padStart(2,"0");return`avc1.${l}${u}${d}`}else if(i==="hevc"){let s="",a="6",c=e*t,l=$m.find(d=>c<=d.maxPictureSize&&n<=d.maxBitrate)??hi($m);return`hev1.${s}1.${a}.${l.tier}${l.level}.B0`}else{if(i==="vp8")return"vp8";if(i==="vp9"){let s="00",o=e*t,a=cd.find(l=>o<=l.maxPictureSize&&n<=l.maxBitrate)??hi(cd);return`vp09.${s}.${a.level.toString().padStart(2,"0")}.08`}else if(i==="av1"){let o=e*t,a=jm.find(u=>o<=u.maxPictureSize&&n<=u.maxBitrate)??hi(jm);return`av01.0.${a.level.toString().padStart(2,"0")}${a.tier}.08`}else if(i==="prores"){let o=Math.pow(e*t/2073600,.95),a=uA.filter(u=>u.alpha===r),c=a[0].fourCc,l=1/0;for(let{fourCc:u,bitrate:d}of a){let h=Math.abs(d*o-n);h<l&&(l=h,c=u)}return c}else Ki(i)}throw new TypeError(`Unhandled codec '${String(i)}'.`)};var Jm=i=>{let e=i.split("."),r=(1<<7)+1,s=Number(e[1]),o=e[2],a=Number(o.slice(0,-1)),c=(s<<5)+a,l=o.slice(-1)==="H"?1:0,u=Number(e[3]),d=u===8?0:1,h=u===12?1:0,f=e[4]?Number(e[4]):0,m=e[5]?Number(e[5][0]):1,y=e[5]?Number(e[5][1]):1,g=e[5]?Number(e[5][2]):0,p=(l<<7)+(d<<6)+(h<<5)+(f<<4)+(m<<3)+(y<<2)+g;return[r,c,p,0]};var Qm=/^pcm-([usf])(\d+)(be)?$/,Bn=i=>{if(te(Ni.includes(i)),i==="ulaw")return{dataType:"ulaw",sampleSize:1,littleEndian:!0,silentValue:255};if(i==="alaw")return{dataType:"alaw",sampleSize:1,littleEndian:!0,silentValue:213};let e=Qm.exec(i);te(e);let t;e[1]==="u"?t="unsigned":e[1]==="s"?t="signed":t="float";let n=Number(e[2])/8,r=e[3]!=="be",s=i==="pcm-u8"?2**7:0;return{dataType:t,sampleSize:n,littleEndian:r,silentValue:s}},cu=i=>i.startsWith("avc1")||i.startsWith("avc3")?"avc":i.startsWith("hev1")||i.startsWith("hvc1")?"hevc":i==="vp8"?"vp8":i.startsWith("vp09")?"vp9":i.startsWith("av01")?"av1":va.includes(i)?"prores":i==="mp3"||i==="mp4a.69"||i==="mp4a.6B"||i==="mp4a.6b"||i==="mp4a.40.34"?"mp3":i.startsWith("mp4a.40.")||i==="mp4a.67"?"aac":i==="opus"||i==="Opus"?"opus":i==="vorbis"?"vorbis":i==="flac"?"flac":i==="ac-3"||i==="ac3"?"ac3":i==="ec-3"||i==="eac3"?"eac3":ld.includes(i)?"dts":i==="ulaw"?"ulaw":i==="alaw"?"alaw":Qm.test(i)?i:i==="webvtt"?"webvtt":null,eg=i=>i==="avc"?{avc:{format:"avc"}}:i==="hevc"?{hevc:{format:"hevc"}}:{};var hA=["avc1","avc3","hev1","hvc1","vp8","vp09","av01",...va],dA=/^(avc1|avc3)\.[0-9a-fA-F]{6}$/,fA=/^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/,pA=/^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/,mA=/^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/,lu=(i,e)=>{if(!i)throw new TypeError("Video chunk metadata must be provided.");if(typeof i!="object")throw new TypeError("Video chunk metadata must be an object.");if(!i.decoderConfig)throw new TypeError("Video chunk metadata must include a decoder configuration.");if(typeof i.decoderConfig!="object")throw new TypeError("Video chunk metadata decoder configuration must be an object.");if(typeof i.decoderConfig.codec!="string")throw new TypeError("Video chunk metadata decoder configuration must specify a codec string.");if(!hA.some(t=>i.decoderConfig.codec.startsWith(t)))throw new TypeError("Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the Mediabunny Codec Registry.");if(!Number.isInteger(i.decoderConfig.codedWidth)||i.decoderConfig.codedWidth<=0)throw new TypeError("Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).");if(!Number.isInteger(i.decoderConfig.codedHeight)||i.decoderConfig.codedHeight<=0)throw new TypeError("Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).");if(i.decoderConfig.displayAspectWidth!==void 0&&(!Number.isInteger(i.decoderConfig.displayAspectWidth)||i.decoderConfig.displayAspectWidth<=0))throw new TypeError("Video chunk metadata decoder configuration displayAspectWidth, when defined, must be a positive integer.");if(i.decoderConfig.displayAspectHeight!==void 0&&(!Number.isInteger(i.decoderConfig.displayAspectHeight)||i.decoderConfig.displayAspectHeight<=0))throw new TypeError("Video chunk metadata decoder configuration displayAspectHeight, when defined, must be a positive integer.");if(i.decoderConfig.displayAspectWidth!==void 0!=(i.decoderConfig.displayAspectHeight!==void 0))throw new TypeError("Video chunk metadata decoder configuration must specify both displayAspectWidth and displayAspectHeight, or neither.");if(i.decoderConfig.description!==void 0&&!xa(i.decoderConfig.description))throw new TypeError("Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.");if(i.decoderConfig.colorSpace!==void 0){let{colorSpace:t}=i.decoderConfig;if(typeof t!="object")throw new TypeError("Video chunk metadata decoder configuration colorSpace, when provided, must be an object.");let n=Object.keys(Fr);if(t.primaries!=null&&!n.includes(t.primaries))throw new TypeError(`Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${n.join(", ")}.`);let r=Object.keys(Dr);if(t.transfer!=null&&!r.includes(t.transfer))throw new TypeError(`Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${r.join(", ")}.`);let s=Object.keys(Ur);if(t.matrix!=null&&!s.includes(t.matrix))throw new TypeError(`Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${s.join(", ")}.`);if(t.fullRange!=null&&typeof t.fullRange!="boolean")throw new TypeError("Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.")}if(i.decoderConfig.codec.startsWith("avc1")||i.decoderConfig.codec.startsWith("avc3")){if(!dA.test(i.decoderConfig.codec))throw new TypeError("Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.")}else if(i.decoderConfig.codec.startsWith("hev1")||i.decoderConfig.codec.startsWith("hvc1")){if(!fA.test(i.decoderConfig.codec))throw new TypeError("Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.")}else if(i.decoderConfig.codec.startsWith("vp8")){if(i.decoderConfig.codec!=="vp8")throw new TypeError('Video chunk metadata decoder configuration codec string for VP8 must be "vp8".')}else if(i.decoderConfig.codec.startsWith("vp09")){if(!pA.test(i.decoderConfig.codec))throw new TypeError('Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.')}else if(i.decoderConfig.codec.startsWith("av01")){if(!mA.test(i.decoderConfig.codec))throw new TypeError('Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.')}else if(va.some(t=>i.decoderConfig.codec.startsWith(t))&&!va.some(t=>i.decoderConfig.codec===t))throw new TypeError(`Video chunk metadata decoder configuration codec string for ProRes must be one of the valid ProRes four-character codes: ${va.join(", ")}.`);if(e!==null&&cu(i.decoderConfig.codec)!==e)throw new TypeError(`Video chunk metadata decoder configuration codec string '${i.decoderConfig.codec}' does not fit to the track codec '${e}'.`)},gA=["mp4a","mp3","opus","vorbis","flac","ulaw","alaw","pcm","ac-3","ec-3","dts"],uu=(i,e)=>{if(!i)throw new TypeError("Audio chunk metadata must be provided.");if(typeof i!="object")throw new TypeError("Audio chunk metadata must be an object.");if(!i.decoderConfig)throw new TypeError("Audio chunk metadata must include a decoder configuration.");if(typeof i.decoderConfig!="object")throw new TypeError("Audio chunk metadata decoder configuration must be an object.");if(typeof i.decoderConfig.codec!="string")throw new TypeError("Audio chunk metadata decoder configuration must specify a codec string.");if(!gA.some(t=>i.decoderConfig.codec.startsWith(t)))throw new TypeError("Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the Mediabunny Codec Registry.");if(!Number.isInteger(i.decoderConfig.sampleRate)||i.decoderConfig.sampleRate<=0)throw new TypeError("Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).");if(!Number.isInteger(i.decoderConfig.numberOfChannels)||i.decoderConfig.numberOfChannels<=0)throw new TypeError("Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).");if(i.decoderConfig.description!==void 0&&!xa(i.decoderConfig.description))throw new TypeError("Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.");if(i.decoderConfig.codec.startsWith("mp4a")&&i.decoderConfig.codec!=="mp4a.69"&&i.decoderConfig.codec!=="mp4a.6B"&&i.decoderConfig.codec!=="mp4a.6b"){if(!["mp4a.40.2","mp4a.40.02","mp4a.40.5","mp4a.40.05","mp4a.40.29","mp4a.67"].includes(i.decoderConfig.codec))throw new TypeError("Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.")}else if(i.decoderConfig.codec.startsWith("mp3")||i.decoderConfig.codec.startsWith("mp4a")){if(i.decoderConfig.codec!=="mp3"&&i.decoderConfig.codec!=="mp4a.69"&&i.decoderConfig.codec!=="mp4a.6B"&&i.decoderConfig.codec!=="mp4a.6b")throw new TypeError('Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".')}else if(i.decoderConfig.codec.startsWith("opus")){if(i.decoderConfig.codec!=="opus")throw new TypeError('Audio chunk metadata decoder configuration codec string for Opus must be "opus".');if(i.decoderConfig.description&&i.decoderConfig.description.byteLength<18)throw new TypeError("Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.")}else if(i.decoderConfig.codec.startsWith("vorbis")){if(i.decoderConfig.codec!=="vorbis")throw new TypeError('Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".');if(!i.decoderConfig.description)throw new TypeError("Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.")}else if(i.decoderConfig.codec.startsWith("flac")){if(i.decoderConfig.codec!=="flac")throw new TypeError('Audio chunk metadata decoder configuration codec string for FLAC must be "flac".');if(!i.decoderConfig.description||i.decoderConfig.description.byteLength<42)throw new TypeError("Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.")}else if(i.decoderConfig.codec.startsWith("ac-3")||i.decoderConfig.codec.startsWith("ac3")){if(i.decoderConfig.codec!=="ac-3")throw new TypeError('Audio chunk metadata decoder configuration codec string for AC-3 must be "ac-3".')}else if(i.decoderConfig.codec.startsWith("ec-3")||i.decoderConfig.codec.startsWith("eac3")){if(i.decoderConfig.codec!=="ec-3")throw new TypeError('Audio chunk metadata decoder configuration codec string for EC-3 must be "ec-3".')}else if(i.decoderConfig.codec.startsWith("dts")){if(!ld.includes(i.decoderConfig.codec))throw new TypeError(`Audio chunk metadata decoder configuration codec string for DTS must be one of the following four-character codes: ${ld.join(", ")}.`)}else if((i.decoderConfig.codec.startsWith("pcm")||i.decoderConfig.codec.startsWith("ulaw")||i.decoderConfig.codec.startsWith("alaw"))&&!Ni.includes(i.decoderConfig.codec))throw new TypeError(`Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${Ni.join(", ")}).`);if(e!==null&&cu(i.decoderConfig.codec)!==e)throw new TypeError(`Audio chunk metadata decoder configuration codec string '${i.decoderConfig.codec}' does not fit to the track codec '${e}'.`)},tg=i=>{if(!i)throw new TypeError("Subtitle metadata must be provided.");if(typeof i!="object")throw new TypeError("Subtitle metadata must be an object.");if(!i.config)throw new TypeError("Subtitle metadata must include a config object.");if(typeof i.config!="object")throw new TypeError("Subtitle metadata config must be an object.");if(typeof i.config.description!="string")throw new TypeError("Subtitle metadata config description must be a string.")};var ig=new Uint8Array(0),pr=class i{constructor(e,t,n,r,s=-1,o,a){if(this.data=e,this.type=t,this.timestamp=n,this.duration=r,this.sequenceNumber=s,e===ig&&o===void 0)throw new Error("Internal error: byteLength must be explicitly provided when constructing metadata-only packets.");if(o===void 0&&(o=e.byteLength),!(e instanceof Uint8Array))throw new TypeError("data must be a Uint8Array.");if(t!=="key"&&t!=="delta")throw new TypeError('type must be either "key" or "delta".');if(!Number.isFinite(n))throw new TypeError("timestamp must be a number.");if(!Number.isFinite(r)||r<0)throw new TypeError("duration must be a non-negative number.");if(!Number.isFinite(s))throw new TypeError("sequenceNumber must be a number.");if(!Number.isInteger(o)||o<0)throw new TypeError("byteLength must be a non-negative integer.");if(a!==void 0&&(typeof a!="object"||!a))throw new TypeError("sideData, when provided, must be an object.");if(a?.alpha!==void 0&&!(a.alpha instanceof Uint8Array))throw new TypeError("sideData.alpha, when provided, must be a Uint8Array.");if(a?.alphaByteLength!==void 0&&(!Number.isInteger(a.alphaByteLength)||a.alphaByteLength<0))throw new TypeError("sideData.alphaByteLength, when provided, must be a non-negative integer.");this.byteLength=o,this.sideData=a??{},this.sideData.alpha&&this.sideData.alphaByteLength===void 0&&(this.sideData.alphaByteLength=this.sideData.alpha.byteLength)}get isMetadataOnly(){return this.data===ig}get microsecondTimestamp(){return Math.trunc(dr*this.timestamp)}get microsecondDuration(){return Math.trunc(dr*this.duration)}toEncodedVideoChunk(){if(this.isMetadataOnly)throw new TypeError("Metadata-only packets cannot be converted to a video chunk.");if(typeof EncodedVideoChunk>"u")throw new Error("EncodedVideoChunk is not available in this environment.");return new EncodedVideoChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}alphaToEncodedVideoChunk(e=this.type){if(!this.sideData.alpha)throw new TypeError("This packet does not contain alpha side data.");if(this.isMetadataOnly)throw new TypeError("Metadata-only packets cannot be converted to a video chunk.");if(typeof EncodedVideoChunk>"u")throw new Error("EncodedVideoChunk is not available in this environment.");return new EncodedVideoChunk({data:this.sideData.alpha,type:e,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}toEncodedAudioChunk(){if(this.isMetadataOnly)throw new TypeError("Metadata-only packets cannot be converted to an audio chunk.");if(typeof EncodedAudioChunk>"u")throw new Error("EncodedAudioChunk is not available in this environment.");return new EncodedAudioChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}static fromEncodedChunk(e,t){if(!(e instanceof EncodedVideoChunk||e instanceof EncodedAudioChunk))throw new TypeError("chunk must be an EncodedVideoChunk or EncodedAudioChunk.");let n=new Uint8Array(e.byteLength);return e.copyTo(n),new i(n,e.type,e.timestamp/1e6,(e.duration??0)/1e6,void 0,void 0,t)}clone(e){if(e!==void 0&&(typeof e!="object"||e===null))throw new TypeError("options, when provided, must be an object.");if(e?.data!==void 0&&!(e.data instanceof Uint8Array))throw new TypeError("options.data, when provided, must be a Uint8Array.");if(e?.type!==void 0&&e.type!=="key"&&e.type!=="delta")throw new TypeError('options.type, when provided, must be either "key" or "delta".');if(e?.timestamp!==void 0&&!Number.isFinite(e.timestamp))throw new TypeError("options.timestamp, when provided, must be a number.");if(e?.duration!==void 0&&!Number.isFinite(e.duration))throw new TypeError("options.duration, when provided, must be a number.");if(e?.sequenceNumber!==void 0&&!Number.isFinite(e.sequenceNumber))throw new TypeError("options.sequenceNumber, when provided, must be a number.");if(e?.sideData!==void 0&&(typeof e.sideData!="object"||e.sideData===null))throw new TypeError("options.sideData, when provided, must be an object.");return new i(e?.data??this.data,e?.type??this.type,e?.timestamp??this.timestamp,e?.duration??this.duration,e?.sequenceNumber??this.sequenceNumber,this.byteLength,e?.sideData??this.sideData)}};var ng=i=>{let t=(i.hasVideo?"video/":i.hasAudio?"audio/":"application/")+(i.isQuickTime?"quicktime":"mp4");if(i.codecStrings.length>0){let n=[...new Set(i.codecStrings)];t+=`; codecs="${n.join(", ")}"`}return t};var hu=8,ud=16;var rg=7,sg=9,hd=i=>{let e=i.filePos,t=og(i,9),n=new Lt(t);if(n.readBits(12)!==4095||(n.skipBits(1),n.readBits(2)!==0))return null;let o=n.readBits(1),a=n.readBits(2)+1,c=n.readBits(4);if(c===15)return null;n.skipBits(1);let l=n.readBits(3);if(l===0)throw new Error("ADTS frames with channel configuration 0 are not supported.");n.skipBits(1),n.skipBits(1),n.skipBits(1),n.skipBits(1);let u=n.readBits(13);n.skipBits(11);let d=n.readBits(2)+1;if(d!==1)throw new Error("ADTS frames with more than one AAC frame are not supported.");let h=null;return o===1?i.filePos-=2:h=n.readBits(16),{objectType:a,samplingFrequencyIndex:c,channelConfiguration:l,frameLength:u,numberOfAacFrames:d,crcCheck:h,startPos:e}};var xA=function(i,e,t){if(e!=null){if(typeof e!="object"&&typeof e!="function")throw new TypeError("Object expected.");var n,r;if(t){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");n=e[Symbol.asyncDispose]}if(n===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");n=e[Symbol.dispose],t&&(r=n)}if(typeof n!="function")throw new TypeError("Object not disposable.");r&&(n=function(){try{r.call(this)}catch(s){return Promise.reject(s)}}),i.stack.push({value:e,dispose:n,async:t})}else t&&i.stack.push({async:!0});return e},yA=function(i){return function(e){function t(o){e.error=e.hasError?new i(o,e.error,"An error was suppressed during disposal."):o,e.hasError=!0}var n,r=0;function s(){for(;n=e.stack.pop();)try{if(!n.async&&r===1)return r=0,e.stack.push(n),Promise.resolve().then(s);if(n.dispose){var o=n.dispose.call(n.value);if(n.async)return r|=2,Promise.resolve(o).then(s,function(a){return t(a),s()})}else r|=1}catch(a){t(a)}if(r===1)return e.hasError?Promise.reject(e.error):Promise.resolve();if(e.hasError)throw e.error}return s()}}(typeof SuppressedError=="function"?SuppressedError:function(i,e,t){var n=new Error(t);return n.name="SuppressedError",n.error=i,n.suppressed=e,n});_m();var ag=-1/0,cg=-1/0,dd=null;typeof FinalizationRegistry<"u"&&(dd=new FinalizationRegistry(i=>{let e=performance.now();i.type==="video"?(e-ag>=1e3&&(Xt._error("A VideoSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your VideoSamples as soon as you're done using them."),ag=e),typeof VideoFrame<"u"&&i.data instanceof VideoFrame&&i.data.close()):(e-cg>=1e3&&(Xt._error("An AudioSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your AudioSamples as soon as you're done using them."),cg=e),typeof AudioData<"u"&&i.data instanceof AudioData&&i.data.close())}));var Ln=class{constructor(){this._referenceCount=0,this._lastAllocationBuffer=null}},fd=["I420","I420P10","I420P12","I420A","I420AP10","I420AP12","I422","I422P10","I422P12","I422A","I422AP10","I422AP12","I444","I444P10","I444P12","I444A","I444AP10","I444AP12","NV12","RGBA","RGBX","BGRA","BGRX"],bA=new Set(fd),mr=class i{get codedWidth(){return this.visibleRect.width}get codedHeight(){return this.visibleRect.height}get displayWidth(){return this.rotation%180===0?this.squarePixelWidth:this.squarePixelHeight}get displayHeight(){return this.rotation%180===0?this.squarePixelHeight:this.squarePixelWidth}get microsecondTimestamp(){return Math.trunc(dr*this.timestamp)}get microsecondDuration(){return Math.trunc(dr*this.duration)}get hasAlpha(){return this.format&&this.format.includes("A")}constructor(e,t){if(this._closed=!1,e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer||ArrayBuffer.isView(e)){if(!t||typeof t!="object")throw new TypeError("init must be an object.");if(t.format===void 0||!bA.has(t.format))throw new TypeError("init.format must be one of: "+fd.join(", "));if(!Number.isInteger(t.codedWidth)||t.codedWidth<=0)throw new TypeError("init.codedWidth must be a positive integer.");if(!Number.isInteger(t.codedHeight)||t.codedHeight<=0)throw new TypeError("init.codedHeight must be a positive integer.");if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(t.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("init.flip, when provided, must be a boolean.");if(!Number.isFinite(t.timestamp))throw new TypeError("init.timestamp must be a number.");if(t.duration!==void 0&&(!Number.isFinite(t.duration)||t.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");if(t.layout!==void 0){if(!Array.isArray(t.layout))throw new TypeError("init.layout, when provided, must be an array.");for(let s of t.layout){if(!s||typeof s!="object"||Array.isArray(s))throw new TypeError("Each entry in init.layout must be an object.");if(!Number.isInteger(s.offset)||s.offset<0)throw new TypeError("plane.offset must be a non-negative integer.");if(!Number.isInteger(s.stride)||s.stride<0)throw new TypeError("plane.stride must be a non-negative integer.")}}if(t.visibleRect!==void 0&&nu(t.visibleRect,"init.visibleRect"),t.displayWidth!==void 0&&(!Number.isInteger(t.displayWidth)||t.displayWidth<=0))throw new TypeError("init.displayWidth, when provided, must be a positive integer.");if(t.displayHeight!==void 0&&(!Number.isInteger(t.displayHeight)||t.displayHeight<=0))throw new TypeError("init.displayHeight, when provided, must be a positive integer.");if(t.displayWidth!==void 0!=(t.displayHeight!==void 0))throw new TypeError("init.displayWidth and init.displayHeight must be either both provided or both omitted.");this.format=t.format,this.rotation=t.rotation??0,this.flip=t.flip??!1,this.timestamp=t.timestamp,this.duration=t.duration??0;let n=t.layout??AA(t.format,t.codedWidth,t.codedHeight),r=t.colorSpace??null;r===null&&(this.format==="RGBA"||this.format==="RGBX"||this.format==="BGRA"||this.format==="BGRX"?r={primaries:"bt709",transfer:"iec61966-2-1",matrix:"rgb",fullRange:!0}:r={primaries:"bt709",transfer:"bt709",matrix:"bt709",fullRange:!1}),this.visibleRect={left:t.visibleRect?.left??0,top:t.visibleRect?.top??0,width:t.visibleRect?.width??t.codedWidth,height:t.visibleRect?.height??t.codedHeight},t.displayWidth!==void 0?(this.squarePixelWidth=this.rotation%180===0?t.displayWidth:t.displayHeight,this.squarePixelHeight=this.rotation%180===0?t.displayHeight:t.displayWidth):(this.squarePixelWidth=this.visibleRect.width,this.squarePixelHeight=this.visibleRect.height),this._data=t._doNotCopy?si(e):si(e).slice(),this._layout=n,this.colorSpace=new Sa(r)}else if(typeof VideoFrame<"u"&&e instanceof VideoFrame){if(t?.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(t?.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("init.flip, when provided, must be a boolean.");if(t?.timestamp!==void 0&&!Number.isFinite(t?.timestamp))throw new TypeError("init.timestamp, when provided, must be a number.");if(t?.duration!==void 0&&(!Number.isFinite(t.duration)||t.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");t?.visibleRect!==void 0&&nu(t.visibleRect,"init.visibleRect"),this._data=e,this._layout=null,this.format=e.format,this.visibleRect={left:e.visibleRect?.x??0,top:e.visibleRect?.y??0,width:e.visibleRect?.width??e.codedWidth,height:e.visibleRect?.height??e.codedHeight},this.rotation=t?.rotation??0,this.flip=t?.flip??!1,this.squarePixelWidth=e.displayWidth,this.squarePixelHeight=e.displayHeight,this.timestamp=t?.timestamp??e.timestamp/1e6,this.duration=t?.duration??(e.duration??0)/1e6,this.colorSpace=new Sa(e.colorSpace)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof SVGImageElement<"u"&&e instanceof SVGImageElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas){if(!t||typeof t!="object")throw new TypeError("init must be an object.");if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(t.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("init.flip, when provided, must be a boolean.");if(!Number.isFinite(t.timestamp))throw new TypeError("init.timestamp must be a number.");if(t.duration!==void 0&&(!Number.isFinite(t.duration)||t.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");if(t.visibleRect!==void 0&&nu(t.visibleRect,"init.visibleRect"),typeof VideoFrame<"u")return new i(new VideoFrame(e,{timestamp:Math.trunc(t.timestamp*dr),duration:Math.trunc((t.duration??0)*dr)||void 0,visibleRect:t.visibleRect&&{x:t.visibleRect.left,y:t.visibleRect.top,width:t.visibleRect.width,height:t.visibleRect.height}}),t);let n=0,r=0;if("naturalWidth"in e?(n=e.naturalWidth,r=e.naturalHeight):"videoWidth"in e?(n=e.videoWidth,r=e.videoHeight):"width"in e&&(n=Number(e.width),r=Number(e.height)),!n||!r)throw new TypeError("Could not determine dimensions.");let s=t.visibleRect??{left:0,top:0,width:n,height:r},o=new OffscreenCanvas(s.width,s.height),a=o.getContext("2d",{alpha:eu(),willReadFrequently:!0});if(!a)throw new Error("OffscreenCanvas must have support for the '2d' context in order to create a VideoSample from this data.");a.drawImage(e,-s.left,-s.top),this._data=o,this._layout=null,this.format="RGBX",this.visibleRect={left:0,top:0,width:s.width,height:s.height},this.squarePixelWidth=s.width,this.squarePixelHeight=s.height,this.rotation=t.rotation??0,this.flip=t.flip??!1,this.timestamp=t.timestamp,this.duration=t.duration??0,this.colorSpace=new Sa({matrix:"rgb",primaries:"bt709",transfer:"iec61966-2-1",fullRange:!0})}else if(e instanceof Ln){if(!t||typeof t!="object")throw new TypeError("init must be an object.");if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(t.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("init.flip, when provided, must be a boolean.");if(!Number.isFinite(t.timestamp))throw new TypeError("init.timestamp must be a number.");if(t.duration!==void 0&&(!Number.isFinite(t.duration)||t.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");if(this._data=e,e._referenceCount++,this.format=e.getFormat(),this.format!==null&&!fd.includes(this.format))throw new TypeError("getFormat() must return a VideoSamplePixelFormat or null.");if(this.visibleRect={left:0,top:0,width:e.getCodedWidth(),height:e.getCodedHeight()},!Number.isInteger(this.visibleRect.width)||this.visibleRect.width<=0)throw new TypeError("getCodedWidth() must return a positive integer.");if(!Number.isInteger(this.visibleRect.height)||this.visibleRect.height<=0)throw new TypeError("getCodedHeight() must return a positive integer.");if(this.squarePixelWidth=e.getSquarePixelWidth(),!Number.isInteger(this.squarePixelWidth)||this.squarePixelWidth<=0)throw new TypeError("getSquarePixelWidth() must return a positive integer.");if(this.squarePixelHeight=e.getSquarePixelHeight(),!Number.isInteger(this.squarePixelHeight)||this.squarePixelHeight<=0)throw new TypeError("getSquarePixelHeight() must return a positive integer.");this.rotation=t.rotation??0,this.flip=t.flip??!1,this.timestamp=t.timestamp,this.duration=t.duration??0,this.colorSpace=e.getColorSpace()}else throw new TypeError("Invalid data type: Must be a BufferSource, CanvasImageSource, or VideoSampleResource.");this.encodeOptions=t?.encodeOptions??{},this.pixelAspectRatio=iu({num:this.squarePixelWidth*this.codedHeight,den:this.squarePixelHeight*this.codedWidth}),dd?.register(this,{type:"video",data:this._data},this)}clone(){if(this._closed)throw new Error("VideoSample is closed.");return te(this._data!==null),this._data instanceof Ln?new i(this._data,{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,flip:this.flip,encodeOptions:this.encodeOptions}):Aa(this._data)?new i(this._data.clone(),{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,flip:this.flip,encodeOptions:this.encodeOptions}):this._data instanceof Uint8Array?(te(this._layout),new i(this._data,{format:this.format,layout:this._layout,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,flip:this.flip,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions,_doNotCopy:!0})):new i(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,flip:this.flip,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions})}close(){this._closed||(dd?.unregister(this),this._data instanceof Ln?(this._data._referenceCount--,this._data._referenceCount===0&&this._data.close()):Aa(this._data)?this._data.close():this._data=null,this._closed=!0)}allocationSize(e={}){if(dg(e),this._closed)throw new Error("VideoSample is closed.");if((e.format??this.format)==null)throw new Error("Cannot get allocation size when format is null.");return Aa(this._data)?this._data.allocationSize(e):fg(this,e).allocationSize}async copyTo(e,t={}){if(!xa(e))throw new TypeError("destination must be an ArrayBuffer or an ArrayBuffer view.");if(dg(t),this._closed)throw new Error("VideoSample is closed.");if((t.format??this.format)==null)throw new Error("Cannot copy video sample data when format is null.");if(te(this._data!==null),Aa(this._data))return this._data.copyTo(e,t);if(t.format&&!["RGBA","RGBX","BGRA","BGRX"].includes(this.format)&&["RGBA","RGBX","BGRA","BGRX"].includes(t.format))if(this._data instanceof Ln){let l={stack:[],error:void 0,hasError:!1};try{let u=xA(l,await this._data.toRgbSample({timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,flip:this.flip},t.colorSpace??"srgb"),!1);if(!(u instanceof i))throw new TypeError("toRgbSample() must return a VideoSample.");if(!["RGBA","RGBX","BGRA","BGRX"].includes(u.format))throw new Error(`Sample returned by toRgbSample was expected to have an RGB format, got '${u.format}' instead.`);return await u.copyTo(e,t)}catch(u){l.error=u,l.hasError=!0}finally{yA(l)}}else{if(typeof VideoFrame>"u")throw new Error("For this sample, converting from a non-RGB to an RGB format requires VideoFrame to be defined.");let l=this.toVideoFrame(),u=await l.copyTo(e,t);return l.close(),u}let n=fg(this,t);te(this.format);let r=si(e);if(r.byteLength<n.allocationSize)throw new TypeError(`Destination buffer too small. Required: ${n.allocationSize}, Available: ${r.byteLength}`);let s=fu(this.format),o;if(this._data instanceof Ln){let l=this._data.getDataPlanes();if(Ji(l)&&(l=await l),!Array.isArray(l)||l.some(u=>!(u.data instanceof Uint8Array)||!Number.isInteger(u.stride)||u.stride<0))throw new TypeError('getDataPlanes() must return an array of objects with a Uint8Array "data" property and a non-negative integer "stride" property.');o=l}else if(this._data instanceof Uint8Array)te(this._layout),te(this._layout.length===s.length),o=this._layout.map((l,u)=>{let d=Math.ceil(this.codedHeight/s[u].heightDivisor);return{data:this._data.subarray(l.offset,l.offset+l.stride*d),stride:l.stride}});else{let u=this._data.getContext("2d");te(u);let d=u.getImageData(0,0,this.codedWidth,this.codedHeight);o=[{data:si(d.data),stride:4*this.codedWidth}]}let a=[],c=s.length;for(let l=0;l<c;l++){let u=n.computedLayouts[l],d=o[l].stride,h=o[l].data,f=u.sourceTop*d;f+=u.sourceLeftBytes;let m=u.destinationOffset,y=u.sourceWidthBytes,g={offset:m,stride:u.destinationStride};for(let p=0;p<u.sourceHeight;p++){if(f+y>h.byteLength)throw new Error("Source buffer OOB read.");if(m+y>r.byteLength)throw new Error("Destination buffer OOB write.");let w=h.subarray(f,f+y);r.set(w,m),f+=d,m+=u.destinationStride}a.push(g)}if(t.format!==void 0){let l=this.format.startsWith("RGB")!==t.format.startsWith("RGB"),u=this.format.includes("X")&&t.format.includes("A");if(l||u)for(let d=0;d<n.allocationSize;d+=4){if(l){let h=r[d],f=r[d+2];r[d]=f,r[d+2]=h}u&&(r[d+3]=255)}}return a}toVideoFrame(){if(this._closed)throw new Error("VideoSample is closed.");if(te(this._data!==null),this._data instanceof Ln){if(this.format===null)throw new Error("Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if format is null.");let e=this._data.getDataPlanes();if(Ji(e))throw new Error("Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if getDataPlanes() returns a promise.");let t=e.reduce((o,a)=>o+a.data.byteLength,0),n=new Uint8Array(t),r=0,s=[];for(let o of e)n.set(o.data,r),s.push(r),r+=o.data.byteLength;return new VideoFrame(n,{format:this.format,layout:e.map((o,a)=>({offset:s[a],stride:o.stride})),codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})}else return Aa(this._data)?new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0}):this._data instanceof Uint8Array?(te(this._layout),new VideoFrame(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,layout:this._layout,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})):new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0})}draw(e,t,n,r,s,o,a,c,l){let u=0,d=0,h=this.displayWidth,f=this.displayHeight,m=0,y=0,g=this.displayWidth,p=this.displayHeight;if(o!==void 0?(u=t,d=n,h=r,f=s,m=o,y=a,c!==void 0?(g=c,p=l):(g=h,p=f)):(m=t,y=n,r!==void 0&&(g=r,p=s)),!(typeof CanvasRenderingContext2D<"u"&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<"u"&&e instanceof OffscreenCanvasRenderingContext2D))throw new TypeError("context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.");if(!Number.isFinite(u))throw new TypeError("sx must be a number.");if(!Number.isFinite(d))throw new TypeError("sy must be a number.");if(!Number.isFinite(h)||h<0)throw new TypeError("sWidth must be a non-negative number.");if(!Number.isFinite(f)||f<0)throw new TypeError("sHeight must be a non-negative number.");if(!Number.isFinite(m))throw new TypeError("dx must be a number.");if(!Number.isFinite(y))throw new TypeError("dy must be a number.");if(!Number.isFinite(g)||g<0)throw new TypeError("dWidth must be a non-negative number.");if(!Number.isFinite(p)||p<0)throw new TypeError("dHeight must be a non-negative number.");if(this._closed)throw new Error("VideoSample is closed.");({sx:u,sy:d,sWidth:h,sHeight:f}=this._unmapSourceRegion(u,d,h,f,this.rotation,this.flip));let w=this.toCanvasImageSource();e.save();let T=m+g/2,b=y+p/2;e.translate(T,b),this.flip&&e.scale(-1,1),e.rotate(this.rotation*Math.PI/180);let A=this.rotation%180===0?1:g/p;e.scale(1/A,A),e.drawImage(w,u,d,h,f,-g/2,-p/2,g,p),e.restore()}drawWithFit(e,t){if(!(typeof CanvasRenderingContext2D<"u"&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<"u"&&e instanceof OffscreenCanvasRenderingContext2D))throw new TypeError("context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.");if(!t||typeof t!="object")throw new TypeError("options must be an object.");if(!["fill","contain","cover"].includes(t.fit))throw new TypeError("options.fit must be 'fill', 'contain', or 'cover'.");if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("options.rotation, when provided, must be 0, 90, 180, or 270.");if(t.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("options.flip, when provided, must be a boolean.");t.crop!==void 0&&du(t.crop,"options.");let n=e.canvas.width,r=e.canvas.height,s=t.rotation??this.rotation,o=t.flip??this.flip,[a,c]=s%180===0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],l=t.crop;l&&(l=hg(l,a,c));let u,d,h,f,{sx:m,sy:y,sWidth:g,sHeight:p}=this._unmapSourceRegion(t.crop?.left??0,t.crop?.top??0,t.crop?.width??a,t.crop?.height??c,s,o);if(t.fit==="fill")u=0,d=0,h=n,f=r;else{let[T,b]=t.crop?[t.crop.width,t.crop.height]:[a,c],A=t.fit==="contain"?Math.min(n/T,r/b):Math.max(n/T,r/b);h=T*A,f=b*A,u=(n-h)/2,d=(r-f)/2}e.save();let w=s%180===0?1:h/f;e.translate(n/2,r/2),o&&e.scale(-1,1),e.rotate(s*Math.PI/180),e.scale(1/w,w),e.translate(-n/2,-r/2),e.drawImage(this.toCanvasImageSource(),m,y,g,p,u,d,h,f),e.restore()}_unmapSourceRegion(e,t,n,r,s,o){return o&&(e=(s%180===0?this.squarePixelWidth:this.squarePixelHeight)-e-n),s===90?[e,t,n,r]=[t,this.squarePixelHeight-e-n,r,n]:s===180?[e,t]=[this.squarePixelWidth-e-n,this.squarePixelHeight-t-r]:s===270&&([e,t,n,r]=[this.squarePixelWidth-t-r,e,r,n]),{sx:e,sy:t,sWidth:n,sHeight:r}}_drawWithFitAndMipmapping(e,t,n){let r=e.width,s=e.height,[o,a]=n.rotation%180===0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],c=n.crop?n.crop.width:o,l=n.crop?n.crop.height:a,u=0;2*r<c&&2*s<l&&(u=Math.floor(Math.log2(Math.min(c/r,l/s))));let d=r*2**u,h=s*2**u,{canvas:f,context:m,isNew:y}=u>0?ug(d,h):{canvas:e,context:t,isNew:n.targetIsFresh};m.imageSmoothingQuality="high",n.fillBlack?(m.fillStyle="black",m.fillRect(0,0,d,h)):y||m.clearRect(0,0,d,h),this.drawWithFit(m,{fit:n.fit,rotation:n.rotation,flip:n.flip,crop:n.crop}),m.globalCompositeOperation="copy";for(let g=u;g>1;g--){let p=r*2**g,w=s*2**g;m.drawImage(f,0,0,p,w,0,0,p/2,w/2)}m.globalCompositeOperation="source-over",u>0&&(t.imageSmoothingQuality="high",t.globalCompositeOperation="copy",t.drawImage(f,0,0,2*r,2*s,0,0,r,s),t.globalCompositeOperation="source-over")}toCanvasImageSource(){if(this._closed)throw new Error("VideoSample is closed.");if(te(this._data!==null),this._data instanceof Ln||this._data instanceof Uint8Array){let e=this.toVideoFrame();return queueMicrotask(()=>e.close()),e}else return this._data}async transform(e){if(!e||typeof e!="object")throw new TypeError("options must be an object.");if(e.width!==void 0&&(!Number.isInteger(e.width)||e.width<=0))throw new TypeError("options.width, when provided, must be a positive integer.");if(e.height!==void 0&&(!Number.isInteger(e.height)||e.height<=0))throw new TypeError("options.height, when provided, must be a positive integer.");if(e.roundDimensionsTo!==void 0&&(!Number.isInteger(e.roundDimensionsTo)||e.roundDimensionsTo<=0))throw new TypeError("options.roundDimensionsTo, when provided, must be a positive integer.");if(e.fit!==void 0&&!["fill","contain","cover"].includes(e.fit))throw new TypeError('options.fit, when provided, must be one of "fill", "contain", or "cover".');if(e.width!==void 0&&e.height!==void 0&&e.fit===void 0)throw new TypeError("When both options.width and options.height are provided, options.fit must also be provided.");if(e.rotate!==void 0&&![0,90,180,270].includes(e.rotate))throw new TypeError("options.rotate, when provided, must be 0, 90, 180 or 270.");if(e.flip!==void 0&&typeof e.flip!="boolean")throw new TypeError("options.flip, when provided, must be a boolean.");if(e.crop!==void 0&&du(e.crop,"options."),e.alpha!==void 0&&!["keep","discard"].includes(e.alpha))throw new TypeError("options.alpha, when provided, must be 'keep' or 'discard'.");let{rotation:t,flip:n}=om(this.rotation,this.flip,e.rotate??0,e.flip??!1),[r,s]=t%180===0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],o=e.crop;o&&(o=hg(o,r,s));let a=o?o.width:r,c=o?o.height:s,l=a/c,u,d;e.width!==void 0&&e.height===void 0?(u=e.width,d=u/l):e.width===void 0&&e.height!==void 0?(d=e.height,u=d*l):e.width!==void 0&&e.height!==void 0?(u=e.width,d=e.height):(u=a,d=c),u=td(u,e.roundDimensionsTo??1),d=td(d,e.roundDimensionsTo??1);let h={width:u,height:d,fit:e.fit??"fill",rotation:t,flip:n,crop:o??{left:0,top:0,width:r,height:s},alpha:e.alpha??"keep"};for(let g of vA){let p=g(this,h);if(Ji(p)&&(p=await p),p!==null)return p}let{canvas:f,context:m,isNew:y}=ug(h.width,h.height);return this._drawWithFitAndMipmapping(f,m,{fit:h.fit,rotation:h.rotation,flip:h.flip,crop:h.crop,targetIsFresh:y,fillBlack:h.alpha==="discard"}),new i(f,{timestamp:this.timestamp,duration:this.duration,rotation:0,flip:!1})}setRotation(e){if(![0,90,180,270].includes(e))throw new TypeError("newRotation must be 0, 90, 180, or 270.");this.rotation=e}setFlip(e){if(typeof e!="boolean")throw new TypeError("newFlip must be a boolean.");this.flip=e}setTimestamp(e){if(!Number.isFinite(e))throw new TypeError("newTimestamp must be a number.");this.timestamp=e}setDuration(e){if(!Number.isFinite(e)||e<0)throw new TypeError("newDuration must be a non-negative number.");this.duration=e}setEncodeOptions(e){if(!e||typeof e!="object")throw new TypeError("newEncodeOptions must be an object.");this.encodeOptions=e}[Symbol.dispose](){this.close()}},vA=[];var wA=3,wa=[],lg=0,ug=(i,e)=>{for(let r of wa)if(r.canvas.width===i&&r.canvas.height===e)return r.age=lg++,{canvas:r.canvas,context:r.context,isNew:!1};let t;if(typeof OffscreenCanvas<"u")t=new OffscreenCanvas(i,e);else{if(typeof window>"u"||typeof document>"u")throw new Error("Cannot transform VideoSamples in this environment. Either run in an environment with OffscreenCanvas or HTMLCanvasElement, or supply a custom VideoSample transformer using registerVideoSampleTransformer().");t=document.createElement("canvas"),t.width=i,t.height=e}let n=t.getContext("2d",{alpha:!0,willReadFrequently:!1});if(!n)throw new Error("The '2d' canvas context is required to transform VideoSamples. Register a custom transformer using registerVideoSampleTransformer to work around this limitation.");return wa.length>=wA&&wa.splice(ym(wa,r=>r.age),1),wa.push({canvas:t,context:n,age:lg++}),{canvas:t,context:n,isNew:!0}},Sa=class{constructor(e){if(e!==void 0){if(!e||typeof e!="object")throw new TypeError("init.colorSpace, when provided, must be an object.");let t=Object.keys(Fr);if(e.primaries!=null&&!t.includes(e.primaries))throw new TypeError(`init.colorSpace.primaries, when provided, must be one of ${t.join(", ")}.`);let n=Object.keys(Dr);if(e.transfer!=null&&!n.includes(e.transfer))throw new TypeError(`init.colorSpace.transfer, when provided, must be one of ${n.join(", ")}.`);let r=Object.keys(Ur);if(e.matrix!=null&&!r.includes(e.matrix))throw new TypeError(`init.colorSpace.matrix, when provided, must be one of ${r.join(", ")}.`);if(e.fullRange!=null&&typeof e.fullRange!="boolean")throw new TypeError("init.colorSpace.fullRange, when provided, must be a boolean.")}this.primaries=e?.primaries??null,this.transfer=e?.transfer??null,this.matrix=e?.matrix??null,this.fullRange=e?.fullRange??null}toJSON(){return{primaries:this.primaries,transfer:this.transfer,matrix:this.matrix,fullRange:this.fullRange}}},Aa=i=>typeof VideoFrame<"u"&&i instanceof VideoFrame,hg=(i,e,t)=>{let n=Math.min(i.left,e),r=Math.min(i.top,t),s=Math.min(i.width,e-n),o=Math.min(i.height,t-r);return te(s>=0),te(o>=0),{left:n,top:r,width:s,height:o}},du=(i,e)=>{if(!i||typeof i!="object")throw new TypeError(e+"crop, when provided, must be an object.");if(!Number.isInteger(i.left)||i.left<0)throw new TypeError(e+"crop.left must be a non-negative integer.");if(!Number.isInteger(i.top)||i.top<0)throw new TypeError(e+"crop.top must be a non-negative integer.");if(!Number.isInteger(i.width)||i.width<0)throw new TypeError(e+"crop.width must be a non-negative integer.");if(!Number.isInteger(i.height)||i.height<0)throw new TypeError(e+"crop.height must be a non-negative integer.")},dg=i=>{if(!i||typeof i!="object")throw new TypeError("options must be an object.");if(i.colorSpace!==void 0&&!["display-p3","srgb"].includes(i.colorSpace))throw new TypeError("options.colorSpace, when provided, must be 'display-p3' or 'srgb'.");if(i.format!==void 0&&typeof i.format!="string")throw new TypeError("options.format, when provided, must be a string.");if(i.layout!==void 0){if(!Array.isArray(i.layout))throw new TypeError("options.layout, when provided, must be an array.");for(let e of i.layout){if(!e||typeof e!="object")throw new TypeError("Each entry in options.layout must be an object.");if(!Number.isInteger(e.offset)||e.offset<0)throw new TypeError("plane.offset must be a non-negative integer.");if(!Number.isInteger(e.stride)||e.stride<0)throw new TypeError("plane.stride must be a non-negative integer.")}}if(i.rect!==void 0){if(!i.rect||typeof i.rect!="object")throw new TypeError("options.rect, when provided, must be an object.");if(i.rect.x!==void 0&&(!Number.isInteger(i.rect.x)||i.rect.x<0))throw new TypeError("options.rect.x, when provided, must be a non-negative integer.");if(i.rect.y!==void 0&&(!Number.isInteger(i.rect.y)||i.rect.y<0))throw new TypeError("options.rect.y, when provided, must be a non-negative integer.");if(i.rect.width!==void 0&&(!Number.isInteger(i.rect.width)||i.rect.width<0))throw new TypeError("options.rect.width, when provided, must be a non-negative integer.");if(i.rect.height!==void 0&&(!Number.isInteger(i.rect.height)||i.rect.height<0))throw new TypeError("options.rect.height, when provided, must be a non-negative integer.")}},AA=(i,e,t)=>{let n=fu(i),r=[],s=0;for(let o of n){let a=Math.ceil(e/o.widthDivisor),c=Math.ceil(t/o.heightDivisor),l=a*o.sampleBytes,u=l*c;r.push({offset:s,stride:l}),s+=u}return r},fu=i=>{let e=(t,n,r,s,o)=>{let a=[{sampleBytes:t,widthDivisor:1,heightDivisor:1},{sampleBytes:n,widthDivisor:r,heightDivisor:s},{sampleBytes:n,widthDivisor:r,heightDivisor:s}];return o&&a.push({sampleBytes:t,widthDivisor:1,heightDivisor:1}),a};switch(i){case"I420":return e(1,1,2,2,!1);case"I420P10":case"I420P12":return e(2,2,2,2,!1);case"I420A":return e(1,1,2,2,!0);case"I420AP10":case"I420AP12":return e(2,2,2,2,!0);case"I422":return e(1,1,2,1,!1);case"I422P10":case"I422P12":return e(2,2,2,1,!1);case"I422A":return e(1,1,2,1,!0);case"I422AP10":case"I422AP12":return e(2,2,2,1,!0);case"I444":return e(1,1,1,1,!1);case"I444P10":case"I444P12":return e(2,2,1,1,!1);case"I444A":return e(1,1,1,1,!0);case"I444AP10":case"I444AP12":return e(2,2,1,1,!0);case"NV12":return[{sampleBytes:1,widthDivisor:1,heightDivisor:1},{sampleBytes:2,widthDivisor:2,heightDivisor:2}];case"RGBA":case"RGBX":case"BGRA":case"BGRX":return[{sampleBytes:4,widthDivisor:1,heightDivisor:1}];default:Ki(i),te(!1)}},fg=(i,e)=>{let t={left:0,top:0,width:i.codedWidth,height:i.codedHeight},n=e.rect,r=SA(t,n,i.codedWidth,i.codedHeight,i.format),s=e.layout,o;if(!e.format||e.format===i.format)o=i.format;else if(["RGBA","RGBX","BGRA","BGRX"].includes(e.format))o=e.format;else throw new Error("NotSupportedError: Invalid destination format.");return EA(r,o,s)},SA=(i,e,t,n,r)=>{let s={...i};if(e!==void 0){if(e.width===0||e.height===0)throw new TypeError("visibleRect dimensions cannot be zero.");if((e.x||0)+(e.width||0)>t)throw new TypeError("visibleRect exceeds codedWidth.");if((e.y||0)+(e.height||0)>n)throw new TypeError("visibleRect exceeds codedHeight.");s.x=e.x||0,s.y=e.y||0,s.width=e.width||0,s.height=e.height||0}if(!MA(r,s))throw new TypeError("visibleRect alignment is invalid for the format.");return s},MA=(i,e)=>{if(i===null)return!0;let t=fu(i);for(let n=0;n<t.length;n++){let r=t[n],s=r.widthDivisor,o=r.heightDivisor;if((e.x||0)%s!==0||(e.y||0)%o!==0)return!1}return!0},EA=(i,e,t)=>{let n=fu(e),r=n.length;if(t!==void 0&&t.length!==r)throw new TypeError(`Layout must have ${r} planes.`);let s=0,o=[],a=[];for(let c=0;c<r;c++){let l=n[c],u=l.sampleBytes,d=l.widthDivisor,h=l.heightDivisor,f={destinationOffset:0,destinationStride:0,sourceTop:0,sourceHeight:0,sourceLeftBytes:0,sourceWidthBytes:0};if(f.sourceTop=Math.ceil(Math.trunc(i.y||0)/h),f.sourceHeight=Math.ceil(Math.trunc(i.height||0)/h),f.sourceLeftBytes=Math.floor(Math.trunc(i.x||0)/d)*u,f.sourceWidthBytes=Math.floor(Math.trunc(i.width||0)/d)*u,t!==void 0){let g=t[c];if(g.stride<f.sourceWidthBytes)throw new TypeError(`Stride for plane ${c} is too small.`);f.destinationOffset=g.offset,f.destinationStride=g.stride}else f.destinationOffset=s,f.destinationStride=f.sourceWidthBytes;let y=f.destinationStride*f.sourceHeight+f.destinationOffset;if(y>4294967295)throw new TypeError("Allocation size exceeds limit.");a.push(y),s=Math.max(s,y);for(let g=0;g<c;g++){let p=o[g];if(!(a[c]<=p.destinationOffset||a[g]<=f.destinationOffset))throw new TypeError("Planes overlap.")}o.push(f)}return{allocationSize:s,computedLayouts:o}};var pg=new Map;var _g=i=>{if(!i||typeof i!="object")throw new TypeError("Encoding config must be an object.");if(!ki.includes(i.codec))throw new TypeError(`Invalid video codec '${i.codec}'. Must be one of: ${ki.join(", ")}.`);let e=i.bitrate;if(i.quality===void 0&&e===void 0)throw new TypeError("config.quality must be provided.");if(i.quality!==void 0&&e!==void 0)throw new TypeError("config.quality and config.bitrate cannot both be provided.");if(i.quality!==void 0&&!(i.quality instanceof mn))throw new TypeError("config.quality, when provided, must be a Quality.");if(e!==void 0&&!(e instanceof mn)&&(!Number.isInteger(e)||e<=0))throw new TypeError("config.bitrate, when provided, must be a positive integer or a quality.");if(i.keyFrameInterval!==void 0&&(!Number.isFinite(i.keyFrameInterval)||i.keyFrameInterval<0))throw new TypeError("config.keyFrameInterval, when provided, must be a non-negative number.");if(i.sizeChangeBehavior!==void 0&&!["deny","passThrough","fill","contain","cover"].includes(i.sizeChangeBehavior))throw new TypeError("config.sizeChangeBehavior, when provided, must be 'deny', 'passThrough', 'fill', 'contain' or 'cover'.");if(i.transform!==void 0){if(typeof i.transform!="object"||!i.transform)throw new TypeError("config.transform, when provided, must be an object.");if(i.transform.width!==void 0&&(!Number.isInteger(i.transform.width)||i.transform.width<=0))throw new TypeError("config.transform.width, when provided, must be a positive integer.");if(i.transform.height!==void 0&&(!Number.isInteger(i.transform.height)||i.transform.height<=0))throw new TypeError("config.transform.height, when provided, must be a positive integer.");if(i.transform.fit!==void 0&&!["fill","contain","cover"].includes(i.transform.fit))throw new TypeError('config.transform.fit, when provided, must be one of "fill", "contain", or "cover".');if(i.transform.width!==void 0&&i.transform.height!==void 0&&i.transform.fit===void 0&&!["fill","contain","cover"].includes(i.sizeChangeBehavior))throw new TypeError("When both config.transform.width and config.transform.height are provided, config.transform.fit must also be provided.");if(i.transform.fit!==void 0&&["fill","contain","cover"].includes(i.sizeChangeBehavior)&&i.transform.fit!==i.sizeChangeBehavior)throw new TypeError("config.transform.fit, when provided, cannot differ from config.sizeChangeBehavior when config.sizeChangeBehavior is 'fill', 'contain' or 'cover', as sizeChangeBehavior already determines the fitting algorithm.");if(i.transform.rotate!==void 0&&![0,90,180,270].includes(i.transform.rotate))throw new TypeError("config.transform.rotate, when provided, must be 0, 90, 180 or 270.");if(i.transform.flip!==void 0&&typeof i.transform.flip!="boolean")throw new TypeError("config.transform.flip, when provided, must be a boolean.");if(i.transform.crop!==void 0&&du(i.transform.crop,"config.transform."),i.transform.process!==void 0&&typeof i.transform.process!="function")throw new TypeError("config.transform.process, when provided, must be a function.");if(i.transform.frameRate!==void 0&&(!Number.isFinite(i.transform.frameRate)||i.transform.frameRate<=0))throw new TypeError("config.transform.frameRate, when provided, must be a finite positive number.");if(i.transform.force!==void 0&&typeof i.transform.force!="boolean")throw new TypeError("config.transform.force, when provided, must be a boolean.")}if(i.onEncodedPacket!==void 0&&typeof i.onEncodedPacket!="function")throw new TypeError("config.onEncodedPacket, when provided, must be a function.");if(i.onEncoderConfig!==void 0&&typeof i.onEncoderConfig!="function")throw new TypeError("config.onEncoderConfig, when provided, must be a function.");if(i.onEncodedSample!==void 0&&typeof i.onEncodedSample!="function")throw new TypeError("config.onEncodedSample, when provided, must be a function.");xg(i.codec,i)},xg=(i,e)=>{if(!e||typeof e!="object")throw new TypeError("Encoding options must be an object.");if(e.alpha!==void 0&&!["discard","keep"].includes(e.alpha))throw new TypeError("options.alpha, when provided, must be 'discard' or 'keep'.");let t=e.bitrateMode;if(t!==void 0&&!["constant","variable"].includes(t))throw new TypeError("bitrateMode, when provided, must be 'constant' or 'variable'.");if(e.latencyMode!==void 0&&!["quality","realtime"].includes(e.latencyMode))throw new TypeError("latencyMode, when provided, must be 'quality' or 'realtime'.");if(e.fullCodecString!==void 0&&typeof e.fullCodecString!="string")throw new TypeError("fullCodecString, when provided, must be a string.");if(e.fullCodecString!==void 0&&cu(e.fullCodecString)!==i)throw new TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${i}).`);if(e.hardwareAcceleration!==void 0&&!["no-preference","prefer-hardware","prefer-software"].includes(e.hardwareAcceleration))throw new TypeError("hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.");if(e.scalabilityMode!==void 0&&typeof e.scalabilityMode!="string")throw new TypeError("scalabilityMode, when provided, must be a string.");if(e.contentHint!==void 0&&typeof e.contentHint!="string")throw new TypeError("contentHint, when provided, must be a string.")},md=i=>{let e=i.bitrateMode,t=i.quality._toVideoRateControl(i.codec,i.width,i.height,e),n=(s,o,a)=>({codec:i.fullCodecString??Km(i.codec,i.width,i.height,a,i.alpha==="keep"),width:i.width,height:i.height,displayWidth:i.squarePixelWidth,displayHeight:i.squarePixelHeight,bitrate:s,bitrateMode:o,alpha:i.alpha??"discard",framerate:i.framerate,latencyMode:i.latencyMode,hardwareAcceleration:i.hardwareAcceleration,scalabilityMode:i.scalabilityMode,contentHint:i.contentHint,...eg(i.codec)}),r=[];return t.quantizer!==null&&r.push({config:n(void 0,"quantizer",t.bitrate),quantizer:t.quantizer}),t.bitrateMode!=="quantizer"&&r.push({config:n(t.bitrate,t.bitrateMode,t.bitrate),quantizer:null}),te(r.length>0),r};var mn=class{constructor(e){if((typeof e=="number"||typeof e=="string")&&(e={quality:e}),!e||typeof e!="object")throw new TypeError("options must be an object.");if(e.bitrateMode!==void 0&&!["constant","variable"].includes(e.bitrateMode))throw new TypeError("options.bitrateMode, when provided, must be 'constant' or 'variable'.");if("quality"in e){if(typeof e.quality=="string"?!(e.quality in mg):typeof e.quality!="number"||Number.isNaN(e.quality))throw new TypeError("options.quality must be a number, or one of 'very-low', 'low', 'medium', 'high' or 'very-high'.");if(e.preferBitrate!==void 0&&typeof e.preferBitrate!="boolean")throw new TypeError("options.preferBitrate, when provided, must be a boolean.");if("bitrate"in e||"quantizer"in e)throw new TypeError("options.quality cannot be combined with options.bitrate or options.quantizer.");this._quality=typeof e.quality=="string"?mg[e.quality]:e.quality,this._preferBitrate=e.preferBitrate??!1,this._bitrate=void 0,this._quantizer=void 0}else{if(e.bitrate!==void 0&&(!Number.isInteger(e.bitrate)||e.bitrate<=0))throw new TypeError("options.bitrate, when provided, must be a positive integer.");if(e.quantizer!==void 0&&(!Number.isInteger(e.quantizer)||e.quantizer<0))throw new TypeError("options.quantizer, when provided, must be a non-negative integer.");if(e.bitrate===void 0&&e.quantizer===void 0)throw new TypeError("At least one of options.bitrate or options.quantizer must be set.");if("preferBitrate"in e)throw new TypeError("options.preferBitrate can only be combined with options.quality.");this._quality=void 0,this._preferBitrate=!1,this._bitrate=e.bitrate,this._quantizer=e.quantizer}this._bitrateMode=e.bitrateMode}_toVideoRateControl(e,t,n,r){let s=TA[e],o=null,a=this._bitrateMode??r??"variable";if(this._quantizer!==void 0){if(s)if(this._quantizer<s.min||this._quantizer>s.max){if(this._bitrate===void 0)throw new Error(`Quantizer ${this._quantizer} is out of range for codec '${e}'; must be between ${s.min} and ${s.max}.`)}else o=this._quantizer,this._bitrate===void 0&&(a="quantizer");else if(this._bitrate===void 0)throw new Error(`Codec '${e}' does not support quantizer-based encoding. Provide a bitrate in the Quality to define a fallback.`)}else this._bitrate===void 0&&s&&!this._preferBitrate&&(te(this._quality!==void 0),o=Xs(Math.round(lm(s.worst,s.best,this._quality)),s.min,s.max));let c;if(this._bitrate!==void 0)c=this._bitrate;else{let l=this._quality;l===void 0&&(te(o!==null&&s),l=Xs((o-s.worst)/(s.best-s.worst),0,1)),c=gg(e,t,n,pd(l))}return{quantizer:o,bitrate:c,bitrateMode:a}}_toVideoBitrate(e,t,n){return this._bitrate!==void 0?this._bitrate:(te(this._quality!==void 0),gg(e,t,n,pd(this._quality)))}_toAudioBitrate(e){if(Ni.includes(e)||e==="flac")return;if(this._bitrate!==void 0)return this._bitrate;if(this._quality===void 0)throw new Error("This Quality defines neither a quality level nor a bitrate and therefore cannot be used for audio encoding.");let t=pd(this._quality),r={aac:128e3,opus:64e3,mp3:16e4,vorbis:64e3,ac3:384e3,eac3:192e3,dts:768e3}[e];if(!r)throw new Error(`Unhandled codec: ${e}`);let s=r*t;return e==="aac"?s=[96e3,128e3,16e4,192e3].reduce((a,c)=>Math.abs(c-s)<Math.abs(a-s)?c:a):e==="opus"||e==="vorbis"?s=Math.max(6e3,s):e==="mp3"&&(s=[8e3,16e3,24e3,32e3,4e4,48e3,64e3,8e4,96e3,112e3,128e3,16e4,192e3,224e3,256e3,32e4].reduce((a,c)=>Math.abs(c-s)<Math.abs(a-s)?c:a)),Math.round(s/1e3)*1e3}},mg={"very-low":0,low:.25,medium:.5,high:.75,"very-high":1},TA={avc:{min:0,max:51,worst:41,best:16},hevc:{min:0,max:51,worst:41,best:16},vp9:{min:0,max:63,worst:52,best:20},av1:{min:0,max:255,worst:208,best:80}},pd=i=>.3*Math.exp(2.5538*i),gg=(i,e,t,n)=>{let r=e*t,s=1920*1080,o=3e6,a=Math.pow(r/s,.95),c=o*a,l={avc:1,hevc:.6,vp9:.6,av1:.4,vp8:1.2,prores:22e7/o},d=c*l[i]*n;return Math.ceil(d/1e3)*1e3},gd=(i,e)=>{if(i==="avc")return{avc:{quantizer:e}};if(i==="hevc")return{hevc:{quantizer:e}};if(i==="vp9")return{vp9:{quantizer:e}};if(i==="av1")return{av1:{quantizer:e}};te(!1)};var _d=async(i,e={})=>{let{width:t=1280,height:n=720,quality:r,bitrate:s,frameRate:o,...a}=e;if(!ki.includes(i))return!1;if(!Number.isInteger(t)||t<=0)throw new TypeError("width must be a positive integer.");if(!Number.isInteger(n)||n<=0)throw new TypeError("height must be a positive integer.");if(r!==void 0&&!(r instanceof mn))throw new TypeError("quality, when provided, must be a Quality.");if(r!==void 0&&s!==void 0)throw new TypeError("quality and bitrate cannot both be provided.");if(s!==void 0&&!(s instanceof mn)&&(!Number.isInteger(s)||s<=0))throw new TypeError("bitrate must be a positive integer or a quality.");if(o!==void 0&&(!Number.isFinite(o)||o<=0))throw new TypeError("frameRate, when provided, must be a finite positive number.");xg(i,a);let c=xd(r,s)??new mn("medium"),l;try{l=md({codec:i,width:t,height:n,quality:c,framerate:o,...a,alpha:"discard"})}catch{return!1}let u=JSON.stringify(l),d=pg.get(u);if(d)return d;let h=(async()=>{for(let{config:m}of l)if(pu.some(y=>y.supports(i,m)))return!0;if(typeof VideoEncoder>"u"||(t%2===1||n%2===1)&&(i==="avc"||i==="hevc"))return!1;for(let{config:m,quantizer:y}of l){try{if(!(await VideoEncoder.isConfigSupported(m)).supported)continue}catch{continue}if(!eu()||await new Promise(async p=>{try{let w=new VideoEncoder({output:()=>{},error:()=>p(!1)});w.configure(m);let T=new Uint8Array(t*n*4),b=new VideoFrame(T,{format:"RGBA",codedWidth:t,codedHeight:n,timestamp:0});w.encode(b,y!==null?gd(i,y):void 0),b.close(),await w.flush(),p(!0)}catch{p(!1)}}))return!0}return!1})();return pg.set(u,h),h};var xd=(i,e)=>{if(i!==void 0)return i;if(e!==void 0)return e instanceof mn?e:new mn({bitrate:e})};var pu=[];var Ma=class i{constructor(e,t,n,r,s){this.bytes=e,this.view=t,this.offset=n,this.start=r,this.end=s,this.bufferPos=r-n}static tempFromBytes(e){return new i(e,hr(e),0,0,e.length)}get length(){return this.end-this.start}get filePos(){return this.offset+this.bufferPos}set filePos(e){this.bufferPos=e-this.offset}get remainingLength(){return Math.max(this.end-this.filePos,0)}skip(e){this.bufferPos+=e}slice(e,t=this.end-e){if(e<this.start||e+t>this.end)throw new RangeError("Slicing outside of original slice.");return new i(this.bytes,this.view,this.offset,e,e+t)}},RA=(i,e)=>{if(i.filePos<i.start||i.filePos+e>i.end)throw new RangeError(`Tried reading [${i.filePos}, ${i.filePos+e}), but slice is [${i.start}, ${i.end}). This is likely an internal error, please report it alongside the file that caused it.`)},og=(i,e)=>{RA(i,e);let t=i.bytes.subarray(i.bufferPos,i.bufferPos+e);return i.bufferPos+=e,t};var mu=class{constructor(e){this.mutex=new qs,this.trackTimestampInfo=new WeakMap,this.output=e}onTrackClose(e){}validateTimestamp(e,t,n){let r=this.trackTimestampInfo.get(e);if(r){if(n&&(r.maxTimestampBeforeLastKeyPacket=r.maxTimestamp),r.maxTimestampBeforeLastKeyPacket!==null&&t<r.maxTimestampBeforeLastKeyPacket)throw new Error(`Timestamps cannot be smaller than the largest timestamp of the previous GOP (a GOP begins with a key packet and ends right before the next key packet). Got ${t}s, but largest timestamp is ${r.maxTimestampBeforeLastKeyPacket}s.`);r.maxTimestamp=Math.max(r.maxTimestamp,t)}else{if(!n)throw new Error("First packet must be a key packet.");r={maxTimestamp:t,maxTimestampBeforeLastKeyPacket:null},this.trackTimestampInfo.set(e,r)}}};var yd=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g;var yg=i=>{let e=Math.floor(i/36e5),t=Math.floor(i%(60*60*1e3)/(60*1e3)),n=Math.floor(i%(60*1e3)/1e3),r=i%1e3;return e.toString().padStart(2,"0")+":"+t.toString().padStart(2,"0")+":"+n.toString().padStart(2,"0")+"."+r.toString().padStart(3,"0")};var Nr=class{constructor(e){this.writer=e,this.helper=new Uint8Array(8),this.helperView=new DataView(this.helper.buffer),this.offsets=new WeakMap}writeU32(e){this.helperView.setUint32(0,e,!1),this.writer.write(this.helper.subarray(0,4))}writeU64(e){this.helperView.setUint32(0,Math.floor(e/2**32),!1),this.helperView.setUint32(4,e,!1),this.writer.write(this.helper.subarray(0,8))}writeAscii(e){for(let t=0;t<e.length;t++)this.helperView.setUint8(t%8,e.charCodeAt(t)),t%8===7&&this.writer.write(this.helper);e.length%8!==0&&this.writer.write(this.helper.subarray(0,e.length%8))}writeBox(e){if(this.offsets.set(e,this.writer.getPos()),e.contents&&!e.children)this.writeBoxHeader(e,e.size??e.contents.byteLength+8),this.writer.write(e.contents);else{let t=this.writer.getPos();if(this.writeBoxHeader(e,0),e.contents&&this.writer.write(e.contents),e.children)for(let s of e.children)s&&this.writeBox(s);let n=this.writer.getPos(),r=e.size??n-t;this.writer.seek(t),this.writeBoxHeader(e,r),this.writer.seek(n)}}writeBoxHeader(e,t){this.writeU32(e.largeSize?1:t),this.writeAscii(e.type),e.largeSize&&this.writeU64(t)}measureBoxHeader(e){return 8+(e.largeSize?8:0)}patchBox(e){let t=this.offsets.get(e);te(t!==void 0);let n=this.writer.getPos();this.writer.seek(t),this.writeBox(e),this.writer.seek(n)}measureBox(e){if(e.contents&&!e.children)return this.measureBoxHeader(e)+e.contents.byteLength;{let t=this.measureBoxHeader(e);if(e.contents&&(t+=e.contents.byteLength),e.children)for(let n of e.children)n&&(t+=this.measureBox(n));return t}}},et=new Uint8Array(8),Vi=new DataView(et.buffer),Ft=i=>[(i%256+256)%256],ke=i=>(Vi.setUint16(0,i,!1),[et[0],et[1]]),Ad=i=>(Vi.setInt16(0,i,!1),[et[0],et[1]]),Ag=i=>(Vi.setUint32(0,i,!1),[et[1],et[2],et[3]]),ce=i=>(Vi.setUint32(0,i,!1),[et[0],et[1],et[2],et[3]]),xn=i=>(Vi.setInt32(0,i,!1),[et[0],et[1],et[2],et[3]]),en=i=>(Vi.setUint32(0,Math.floor(i/2**32),!1),Vi.setUint32(4,i,!1),[et[0],et[1],et[2],et[3],et[4],et[5],et[6],et[7]]),bg=i=>(Vi.setInt32(0,Math.floor(i/2**32),!1),Vi.setUint32(4,i,!1),[et[0],et[1],et[2],et[3],et[4],et[5],et[6],et[7]]),Sg=i=>(Vi.setInt16(0,2**8*i,!1),[et[0],et[1]]),zi=i=>(Vi.setInt32(0,2**16*i,!1),[et[0],et[1],et[2],et[3]]),bd=i=>(Vi.setInt32(0,2**30*i,!1),[et[0],et[1],et[2],et[3]]),vd=(i,e)=>{let t=[],n=i;do{let r=n&127;n>>=7,t.length>0&&(r|=128),t.push(r),e!==void 0&&e--}while(n>0||e);return t.reverse()},wt=(i,e=!1)=>{let t=Array(i.length).fill(null).map((n,r)=>i.charCodeAt(r));return e&&t.push(0),t},Mg=i=>[zi(i[0]),zi(i[1]),bd(i[2]),zi(i[3]),zi(i[4]),bd(i[5]),zi(i[6]),zi(i[7]),bd(i[8])],De=(i,e,t)=>({type:i,contents:e&&new Uint8Array(e.flat(10)),children:t}),ut=(i,e,t,n,r)=>De(i,[Ft(e),Ag(t),n??[]],r),Eg=i=>i.isQuickTime?De("ftyp",[wt("qt  "),ce(512),wt("qt  ")]):i.fragmented?i.cmaf?De("ftyp",[wt("iso5"),ce(512),wt("iso5"),wt("iso6"),wt("mp41"),wt("cmfc"),wt("dash")]):De("ftyp",[wt("iso5"),ce(512),wt("iso5"),wt("iso6"),wt("mp41")]):De("ftyp",[wt("isom"),ce(512),wt("isom"),i.holdsAvc?wt("avc1"):[],wt("mp41")]),Sd=()=>De("styp",[wt("iso5"),ce(0),wt("iso5"),wt("iso6"),wt("mp41"),wt("cmfc"),wt("dash")]),Md=(i,e)=>{let t=Math.max(0,i.minWrittenTimestamp),n=Math.max(0,i.maxWrittenEndTimestamp-t);return Number.isFinite(n)||(n=0),ut("sidx",1,0,[ce(1),ce(gi),en(St(t,gi)),en(0),ke(0),ke(1),ce(e&2147483647),ce(St(n,gi)),ce(0)])},Ea=i=>({type:"mdat",largeSize:i}),Tg=i=>({type:"free",size:i}),Zs=i=>De("moov",void 0,[IA(i.creationTime,i.trackDatas),...i.trackDatas.map(e=>PA(e,i.creationTime)),i.isFragmented?_S(i.trackDatas):null,ES(i)]),IA=(i,e)=>{let t=Math.max(0,...e.map(o=>Math.max(0,St(kr(o),gi)+St(o.startTimestampOffset??0,gi)))),n=Math.max(0,...e.map(o=>o.track.id))+1,r=!dn(i)||!dn(t),s=r?en:ce;return ut("mvhd",+r,0,[s(i),s(i),ce(gi),s(t),zi(1),Sg(1),Array(10).fill(0),Mg(Kh),Array(24).fill(0),ce(n)])},PA=(i,e)=>{let t=Ug(i),n=i.startTimestampOffset!==null&&i.startTimestampOffset!==0;return De("trak",void 0,[BA(i,e),n?LA(i):null,FA(i,e),t.name!==void 0?De("udta",void 0,[De("name",[...Ui.encode(t.name)])]):null])},BA=(i,e)=>{let t=Math.max(0,St(kr(i),gi)+St(i.startTimestampOffset??0,gi)),n=!dn(e)||!dn(t),r=n?en:ce,s;if(i.type==="video"&&i.track.metadata.transformationMatrix)s=i.track.metadata.transformationMatrix;else if(i.type==="video"){let{rotation:c,flip:l}=i.track.metadata,u=Kl(rm(c??0),sm(l?-1:1,1));s=nm(u,i.info.width,i.info.height)}else s=Kh;let o=2;i.track.metadata.disposition?.default!==!1&&(o|=1);let a=i.type==="video"?0:i.type==="audio"?1:i.type==="subtitle"?2:Ki(i);return ut("tkhd",+n,o,[r(e),r(e),ce(i.track.id),ce(0),r(t),Array(8).fill(0),ke(0),ke(a),Sg(i.type==="audio"?1:0),ke(0),Mg(s),zi(i.type==="video"?i.info.width:0),zi(i.type==="video"?i.info.height:0)])},LA=i=>{let e=i.startTimestampOffset;if(te(e!==null),e>0){let t=St(e,gi),n=St(kr(i),gi),r=!dn(t)||!dn(n),s=r?en:ce,o=r?bg:xn;return De("edts",void 0,[ut("elst",r?1:0,0,[ce(2),s(t),o(-1),zi(1),s(n),o(0),zi(1)])])}else{let t=St(-e,i.timescale),n=Math.max(0,St(kr(i),gi)+St(e,gi)),r=!am(t)||!dn(n),s=r?en:ce,o=r?bg:xn;return De("edts",void 0,[ut("elst",r?1:0,0,[ce(1),s(n),o(t),zi(1)])])}},FA=(i,e)=>De("mdia",void 0,[DA(i,e),Ed(!0,UA[i.type],OA[i.type]),NA(i)]),DA=(i,e)=>{let t=St(kr(i),i.timescale),n=!dn(e)||!dn(t),r=n?en:ce;return ut("mdhd",+n,0,[r(e),r(e),ce(i.timescale),r(t),ke(Dg(i.track.metadata.languageCode??um)),ke(0)])},UA={video:"vide",audio:"soun",subtitle:"text"},OA={video:"MediabunnyVideoHandler",audio:"MediabunnySoundHandler",subtitle:"MediabunnyTextHandler"},Ed=(i,e,t,n="\0\0\0\0")=>ut("hdlr",0,0,[i?wt("mhlr"):ce(0),wt(e),wt(n),ce(0),ce(0),wt(t,!0)]),NA=i=>De("minf",void 0,[HA[i.type](),GA(),XA(i)]),kA=()=>ut("vmhd",0,1,[ke(0),ke(0),ke(0),ke(0)]),zA=()=>ut("smhd",0,0,[ke(0),ke(0)]),VA=()=>ut("nmhd",0,0),HA={video:kA,audio:zA,subtitle:VA},GA=()=>De("dinf",void 0,[WA()]),WA=()=>ut("dref",0,0,[ce(1)],[qA()]),qA=()=>ut("url ",0,1),XA=i=>{let e=i.compositionTimeOffsetTable.length>1||i.compositionTimeOffsetTable.some(t=>t.sampleCompositionTimeOffset!==0);return De("stbl",void 0,[YA(i),uS(i),e?mS(i):null,e?gS(i):null,dS(i),fS(i),pS(i),hS(i)])},YA=i=>{let e;if(i.type==="video")e=ZA(IS(i.track.source._codec,i.info.decoderConfig.codec),i);else if(i.type==="audio"){let t=Fg(i.track.source._codec,i.info.decoderConfig.codec,i.muxer.isQuickTime);te(t),e=eS(t,i)}else i.type==="subtitle"&&(e=cS(LS[i.track.source._codec],i));return te(e),ut("stsd",0,0,[ce(1)],[e])},ZA=(i,e)=>De(i,[Array(6).fill(0),ke(1),ke(0),ke(0),Array(12).fill(0),ke(e.info.width),ke(e.info.height),ce(4718592),ce(4718592),ce(0),ke(1),Ft(su.length),wt(su),Array(31-su.length).fill(0),ke(e.info.hasAlphaChannel?32:24),Ad(65535)],[PS[e.track.source._codec]?.(e)??null,$A(e),cm(e.info.decoderConfig.colorSpace)?null:jA(e),Td(e)]),Td=i=>i.avgBitrate===0&&i.maxBitrate===0?null:De("btrt",[ce(0),ce(i.maxBitrate),ce(i.avgBitrate)]),$A=i=>i.info.pixelAspectRatio.num===i.info.pixelAspectRatio.den?null:De("pasp",[ce(i.info.pixelAspectRatio.num),ce(i.info.pixelAspectRatio.den)]),jA=i=>{let e=i.info.decoderConfig.colorSpace;return De("colr",[wt(i.muxer.isQuickTime?"nclc":"nclx"),ke(e?.primaries!=null?Fr[e.primaries]:2),ke(e?.transfer!=null?Dr[e.transfer]:2),ke(e?.matrix!=null?Ur[e.matrix]:2),i.muxer.isQuickTime?[]:Ft((e?.fullRange?1:0)<<7)])},KA=i=>i.info.decoderConfig&&De("avcC",[...si(i.info.decoderConfig.description)]),JA=i=>i.info.decoderConfig&&De("hvcC",[...si(i.info.decoderConfig.description)]),vg=i=>{if(!i.info.decoderConfig)return null;let e=i.info.decoderConfig,t=e.codec.split("."),n=Number(t[1]),r=Number(t[2]),s=Number(t[3]),o=t[4]?Number(t[4]):1,a=t[8]?Number(t[8]):Number(e.colorSpace?.fullRange??0),c=(s<<4)+(o<<1)+a,l=t[5]?Number(t[5]):e.colorSpace?.primaries?Fr[e.colorSpace.primaries]:1,u=t[6]?Number(t[6]):e.colorSpace?.transfer?Dr[e.colorSpace.transfer]:1,d=t[7]?Number(t[7]):e.colorSpace?.matrix?Ur[e.colorSpace.matrix]:1;return ut("vpcC",1,0,[Ft(n),Ft(r),Ft(c),Ft(l),Ft(u),Ft(d),ke(0)])},QA=i=>De("av1C",Jm(i.info.decoderConfig.codec)),eS=(i,e)=>{let t=0,n,r=16,s=Ni.includes(e.track.source._codec);if(s){let o=e.track.source._codec,{sampleSize:a}=Bn(o);r=8*a,r>16&&(t=1)}if(e.muxer.isQuickTime&&(t=1),t===0)n=[Array(6).fill(0),ke(1),ke(t),ke(0),ce(0),ke(e.info.numberOfChannels),ke(r),ke(0),ke(0),ke(e.info.sampleRate<2**16?e.info.sampleRate:0),ke(0)];else{let o=s?0:-2;n=[Array(6).fill(0),ke(1),ke(t),ke(0),ce(0),ke(e.info.numberOfChannels),ke(Math.min(r,16)),Ad(o),ke(0),ke(e.info.sampleRate<2**16?e.info.sampleRate:0),ke(0),s?[ce(1),ce(r/8),ce(e.info.numberOfChannels*r/8)]:[ce(0),ce(0),ce(0)],ce(2)]}return De(i,n,[BS(e.track.source._codec,e.muxer.isQuickTime)?.(e)??null,Td(e)])},wd=i=>{let e;switch(i.track.source._codec){case"aac":e=64;break;case"mp3":e=107;break;case"vorbis":e=221;break;default:throw new Error(`Unhandled audio codec: ${i.track.source._codec}`)}let t=[...Ft(e),...Ft(21),...Ag(0),...ce(i.maxBitrate),...ce(i.avgBitrate)];if(i.info.decoderConfig.description){let n=si(i.info.decoderConfig.description);t=[...t,...Ft(5),...vd(n.byteLength),...n]}return t=[...ke(1),...Ft(0),...Ft(4),...vd(t.length),...t,...Ft(6),...Ft(1),...Ft(2)],t=[...Ft(3),...vd(t.length),...t],ut("esds",0,0,t)},gr=i=>De("wave",void 0,[tS(i),iS(i),De("\0\0\0\0")]),tS=i=>De("frma",[wt(Fg(i.track.source._codec,i.info.decoderConfig.codec,i.muxer.isQuickTime))]),iS=i=>{let{littleEndian:e}=Bn(i.track.source._codec);return De("enda",[ke(+e)])},nS=i=>{let e=i.info.numberOfChannels,t=3840,n=i.info.sampleRate,r=0,s=0,o=new Uint8Array(0),a=i.info.decoderConfig?.description;if(a){te(a.byteLength>=18);let c=si(a),l=Gm(c);e=l.outputChannelCount,t=l.preSkip,n=l.inputSampleRate,r=l.outputGain,s=l.channelMappingFamily,l.channelMappingTable&&(o=l.channelMappingTable)}return De("dOps",[Ft(0),Ft(e),ke(t),ce(n),Ad(r),Ft(s),...o])},rS=i=>{let e=i.info.decoderConfig?.description;te(e);let t=si(e);return ut("dfLa",0,0,[...t.subarray(4)])},gn=i=>{let{littleEndian:e,sampleSize:t}=Bn(i.track.source._codec),n=+e;return ut("pcmC",0,0,[Ft(n),Ft(8*t)])},sS=i=>{te(i.info.primingPacket);let e=qm(i.info.primingPacket.data);if(!e)throw new Error("Couldn't extract AC-3 frame info from the audio packet. Ensure the packets contain valid AC-3 sync frames (as specified in ETSI TS 102 366).");let t=new Uint8Array(3),n=new Lt(t);return n.writeBits(2,e.fscod),n.writeBits(5,e.bsid),n.writeBits(3,e.bsmod),n.writeBits(3,e.acmod),n.writeBits(1,e.lfeon),n.writeBits(5,e.bitRateCode),n.writeBits(5,0),De("dac3",[...t])},oS=i=>{te(i.info.primingPacket);let e=Xm(i.info.primingPacket.data);if(!e)throw new Error("Couldn't extract E-AC-3 frame info from the audio packet. Ensure the packets contain valid E-AC-3 sync frames (as specified in ETSI TS 102 366).");let t=16;for(let o of e.substreams)t+=23,o.numDepSub>0?t+=9:t+=1;let n=Math.ceil(t/8),r=new Uint8Array(n),s=new Lt(r);s.writeBits(13,e.dataRate),s.writeBits(3,e.substreams.length-1);for(let o of e.substreams)s.writeBits(2,o.fscod),s.writeBits(5,o.bsid),s.writeBits(1,0),s.writeBits(1,0),s.writeBits(3,o.bsmod),s.writeBits(3,o.acmod),s.writeBits(1,o.lfeon),s.writeBits(3,0),s.writeBits(4,o.numDepSub),o.numDepSub>0?s.writeBits(9,o.chanLoc):s.writeBits(1,0);return De("dec3",[...r])},aS=i=>{te(i.info.primingPacket);let e=Ym(i.info.primingPacket.data);if(!e)throw new Error("Couldn't extract DTS frame info from the audio packet. Ensure the packets contain valid DTS frames as specified in ETSI TS 102 114.");return De("ddts",[...Zm(e)])},cS=(i,e)=>De(i,[Array(6).fill(0),ke(1)],[FS[e.track.source._codec](e),Td(e)]),lS=i=>De("vttC",[...Ui.encode(i.info.config.description)]);var uS=i=>ut("stts",0,0,[ce(i.timeToSampleTable.length),i.timeToSampleTable.map(e=>[ce(e.sampleCount),ce(e.sampleDelta)])]),hS=i=>{if(i.samples.every(t=>t.type==="key"))return null;let e=[...i.samples.entries()].filter(([,t])=>t.type==="key");return ut("stss",0,0,[ce(e.length),e.map(([t])=>ce(t+1))])},dS=i=>ut("stsc",0,0,[ce(i.compactlyCodedChunkTable.length),i.compactlyCodedChunkTable.map(e=>[ce(e.firstChunk),ce(e.samplesPerChunk),ce(1)])]),fS=i=>{if(i.type==="audio"&&i.info.requiresPcmTransformation){let{sampleSize:e}=Bn(i.track.source._codec);return ut("stsz",0,0,[ce(e*i.info.numberOfChannels),ce(i.samples.reduce((t,n)=>t+St(n.duration,i.timescale),0))])}return ut("stsz",0,0,[ce(0),ce(i.samples.length),i.samples.map(e=>ce(e.size))])},pS=i=>i.finalizedChunks.length>0&&hi(i.finalizedChunks).offset>=2**32?ut("co64",0,0,[ce(i.finalizedChunks.length),i.finalizedChunks.map(e=>en(e.offset))]):ut("stco",0,0,[ce(i.finalizedChunks.length),i.finalizedChunks.map(e=>ce(e.offset))]),mS=i=>ut("ctts",1,0,[ce(i.compositionTimeOffsetTable.length),i.compositionTimeOffsetTable.map(e=>[ce(e.sampleCount),xn(e.sampleCompositionTimeOffset)])]),gS=i=>{let e=1/0,t=-1/0,n=1/0,r=-1/0;te(i.compositionTimeOffsetTable.length>0),te(i.samples.length>0);for(let o=0;o<i.compositionTimeOffsetTable.length;o++){let a=i.compositionTimeOffsetTable[o];e=Math.min(e,a.sampleCompositionTimeOffset),t=Math.max(t,a.sampleCompositionTimeOffset)}for(let o=0;o<i.samples.length;o++){let a=i.samples[o];n=Math.min(n,St(a.timestamp,i.timescale)),r=Math.max(r,St(a.timestamp+a.duration,i.timescale))}let s=Math.max(-e,0);return r>=2**31?null:ut("cslg",0,0,[xn(s),xn(e),xn(t),xn(n),xn(r)])},_S=i=>De("mvex",void 0,i.map(xS)),xS=i=>ut("trex",0,0,[ce(i.track.id),ce(1),ce(0),ce(0),ce(0)]),Cd=(i,e)=>De("moof",void 0,[yS(i),...e.map(bS)]),yS=i=>ut("mfhd",0,0,[ce(i)]),Cg=i=>{let e=0,t=0,n=0,r=0,s=i.type==="delta";return t|=+s,s?e|=1:e|=2,e<<24|t<<16|n<<8|r},bS=i=>De("traf",void 0,[vS(i),wS(i),AS(i)]),vS=i=>{te(i.currentChunk);let e=0;e|=8,e|=16,e|=32,e|=131072;let t=i.currentChunk.samples[1]??i.currentChunk.samples[0],n={duration:t.timescaleUnitsToNextSample,size:t.size,flags:Cg(t)};return ut("tfhd",0,e,[ce(i.track.id),ce(n.duration),ce(n.size),ce(n.flags)])},wS=i=>(te(i.currentChunk),ut("tfdt",1,0,[en(St(i.currentChunk.startTimestamp,i.timescale))])),AS=i=>{te(i.currentChunk);let e=i.currentChunk.samples.map(y=>y.timescaleUnitsToNextSample),t=i.currentChunk.samples.map(y=>y.size),n=i.currentChunk.samples.map(Cg),r=i.currentChunk.samples.map(y=>St(y.timestamp-y.decodeTimestamp,i.timescale)),s=new Set(e),o=new Set(t),a=new Set(n),c=new Set(r),l=a.size===2&&n[0]!==n[1],u=s.size>1,d=o.size>1,h=!l&&a.size>1,f=c.size>1||[...c].some(y=>y!==0),m=0;return m|=1,m|=4*+l,m|=256*+u,m|=512*+d,m|=1024*+h,m|=2048*+f,ut("trun",1,m,[ce(i.currentChunk.samples.length),ce(i.currentChunk.offset-i.currentChunk.moofOffset||0),l?ce(n[0]):[],i.currentChunk.samples.map((y,g)=>[u?ce(e[g]):[],d?ce(t[g]):[],h?ce(n[g]):[],f?xn(r[g]):[]])])},Rg=i=>De("mfra",void 0,[...i.map(SS),MS()]),SS=i=>ut("tfra",1,0,[ce(i.track.id),ce(63),ce(i.finalizedChunks.length),i.finalizedChunks.map(t=>[en(St(t.samples[0].timestamp,i.timescale)),en(t.moofOffset),ce(t.trafIndex+1),ce(1),ce(1)])]),MS=()=>ut("mfro",0,0,[ce(0)]),Ig=()=>De("vtte"),Pg=(i,e,t,n,r)=>De("vttc",void 0,[r!==null?De("vsid",[xn(r)]):null,t!==null?De("iden",[...Ui.encode(t)]):null,e!==null?De("ctim",[...Ui.encode(yg(e))]):null,n!==null?De("sttg",[...Ui.encode(n)]):null,De("payl",[...Ui.encode(i)])]),Bg=i=>De("vtta",[...Ui.encode(i)]),ES=i=>{let e=[],t=i.format._options.metadataFormat??"auto",n=i.output._metadataTags;if(t==="mdir"||t==="auto"&&!i.isQuickTime){let r=CS(n);r&&e.push(r)}else if(t==="mdta"){let r=RS(n);r&&e.push(r)}else(t==="udta"||t==="auto"&&i.isQuickTime)&&TS(e,i.output._metadataTags);return e.length===0?null:De("udta",void 0,e)},TS=(i,e)=>{for(let{key:t,value:n}of tu(e))switch(t){case"title":i.push(_n("\xA9nam",n));break;case"description":i.push(_n("\xA9des",n));break;case"artist":i.push(_n("\xA9ART",n));break;case"album":i.push(_n("\xA9alb",n));break;case"albumArtist":i.push(_n("albr",n));break;case"genre":i.push(_n("\xA9gen",n));break;case"date":i.push(_n("\xA9day",n.toISOString().slice(0,10)));break;case"comment":i.push(_n("\xA9cmt",n));break;case"lyrics":i.push(_n("\xA9lyr",n));break;case"raw":break;case"discNumber":case"discsTotal":case"trackNumber":case"tracksTotal":case"beatsPerMinute":case"images":break;default:Ki(t)}if(e.raw)for(let t in e.raw){let n=e.raw[t];n==null||t.length!==4||i.some(r=>r.type===t)||(typeof n=="string"?i.push(_n(t,n)):n instanceof Uint8Array&&i.push(De(t,Array.from(n))))}},_n=(i,e)=>{let t=Ui.encode(e);return De(i,[ke(t.length),ke(Dg("und")),Array.from(t)])},wg={"image/jpeg":13,"image/png":14,"image/bmp":27},Lg=(i,e)=>{let t=[];for(let{key:n,value:r}of tu(i))switch(n){case"title":t.push({key:e?"title":"\xA9nam",value:Qi(r)});break;case"description":t.push({key:e?"description":"\xA9des",value:Qi(r)});break;case"artist":t.push({key:e?"artist":"\xA9ART",value:Qi(r)});break;case"album":t.push({key:e?"album":"\xA9alb",value:Qi(r)});break;case"albumArtist":t.push({key:e?"album_artist":"aART",value:Qi(r)});break;case"comment":t.push({key:e?"comment":"\xA9cmt",value:Qi(r)});break;case"genre":t.push({key:e?"genre":"\xA9gen",value:Qi(r)});break;case"beatsPerMinute":e||t.push({key:"tmpo",value:De("data",[ce(21),ce(0),ke(r)])});break;case"lyrics":t.push({key:e?"lyrics":"\xA9lyr",value:Qi(r)});break;case"date":t.push({key:e?"date":"\xA9day",value:Qi(r.toISOString().slice(0,10))});break;case"images":for(let s of r)s.kind==="coverFront"&&t.push({key:"covr",value:De("data",[ce(wg[s.mimeType]??0),ce(0),Array.from(s.data)])});break;case"trackNumber":if(e){let s=i.tracksTotal!==void 0?`${r}/${i.tracksTotal}`:r.toString();t.push({key:"track",value:Qi(s)})}else t.push({key:"trkn",value:De("data",[ce(0),ce(0),ke(0),ke(r),ke(i.tracksTotal??0),ke(0)])});break;case"discNumber":e||t.push({key:"disc",value:De("data",[ce(0),ce(0),ke(0),ke(r),ke(i.discsTotal??0),ke(0)])});break;case"tracksTotal":case"discsTotal":break;case"raw":break;default:Ki(n)}if(i.raw)for(let n in i.raw){let r=i.raw[n];r==null||!e&&n.length!==4||t.some(s=>s.key===n)||(typeof r=="string"?t.push({key:n,value:Qi(r)}):r instanceof Uint8Array?t.push({key:n,value:De("data",[ce(0),ce(0),Array.from(r)])}):r instanceof ya&&t.push({key:n,value:De("data",[ce(wg[r.mimeType]??0),ce(0),Array.from(r.data)])}))}return t},CS=i=>{let e=Lg(i,!1);return e.length===0?null:ut("meta",0,0,void 0,[Ed(!1,"mdir","","appl"),De("ilst",void 0,e.map(t=>De(t.key,void 0,[t.value])))])},RS=i=>{let e=Lg(i,!0);return e.length===0?null:De("meta",void 0,[Ed(!1,"mdta",""),ut("keys",0,0,[ce(e.length)],e.map(t=>De("mdta",[...Ui.encode(t.key)]))),De("ilst",void 0,e.map((t,n)=>{let r=String.fromCharCode(...ce(n+1));return De(r,void 0,[t.value])}))])},Qi=i=>De("data",[ce(1),ce(0),...Ui.encode(i)]),IS=(i,e)=>{switch(i){case"avc":return e.startsWith("avc3")?"avc3":"avc1";case"hevc":return"hvc1";case"vp8":return"vp08";case"vp9":return"vp09";case"av1":return"av01";case"prores":return e}},PS={avc:KA,hevc:JA,vp8:vg,vp9:vg,av1:QA,prores:null},Fg=(i,e,t)=>{switch(i){case"aac":return"mp4a";case"mp3":return"mp4a";case"opus":return"Opus";case"vorbis":return"mp4a";case"flac":return"fLaC";case"ulaw":return"ulaw";case"alaw":return"alaw";case"pcm-u8":return"raw ";case"pcm-s8":return"sowt";case"ac3":return"ac-3";case"eac3":return"ec-3";case"dts":return e}if(t)switch(i){case"pcm-s16":return"sowt";case"pcm-s16be":return"twos";case"pcm-s24":return"in24";case"pcm-s24be":return"in24";case"pcm-s32":return"in32";case"pcm-s32be":return"in32";case"pcm-f32":return"fl32";case"pcm-f32be":return"fl32";case"pcm-f64":return"fl64";case"pcm-f64be":return"fl64"}else switch(i){case"pcm-s16":return"ipcm";case"pcm-s16be":return"ipcm";case"pcm-s24":return"ipcm";case"pcm-s24be":return"ipcm";case"pcm-s32":return"ipcm";case"pcm-s32be":return"ipcm";case"pcm-f32":return"fpcm";case"pcm-f32be":return"fpcm";case"pcm-f64":return"fpcm";case"pcm-f64be":return"fpcm"}},BS=(i,e)=>{switch(i){case"aac":return wd;case"mp3":return wd;case"opus":return nS;case"vorbis":return wd;case"flac":return rS;case"ac3":return sS;case"eac3":return oS;case"dts":return aS}if(e)switch(i){case"pcm-s24":return gr;case"pcm-s24be":return gr;case"pcm-s32":return gr;case"pcm-s32be":return gr;case"pcm-f32":return gr;case"pcm-f32be":return gr;case"pcm-f64":return gr;case"pcm-f64be":return gr}else switch(i){case"pcm-s16":return gn;case"pcm-s16be":return gn;case"pcm-s24":return gn;case"pcm-s24be":return gn;case"pcm-s32":return gn;case"pcm-s32be":return gn;case"pcm-f32":return gn;case"pcm-f32be":return gn;case"pcm-f64":return gn;case"pcm-f64be":return gn}return null},LS={webvtt:"wvtt"},FS={webvtt:lS},Dg=i=>{te(i.length===3);let e=0;for(let t=0;t<3;t++)e<<=5,e+=i.charCodeAt(t)-96;return e};var zr=class{constructor(e,t){if(this.finalized=!1,this.started=!1,this.pos=0,this.trackedWrites=null,this.trackedStart=-1,this.trackedEnd=-1,e._writerAcquired)throw new Error("Can't have multiple Writers for the same Target.");this.target=e,e._setMonotonicity(t),e._writerAcquired=!0}start(){te(!this.started),this.target._start(),this.started=!0}write(e){te(this.started&&!this.finalized),this.maybeTrackWrites(e),this.target._write(e,this.pos),this.pos+=e.byteLength}seek(e){this.pos=e}getPos(){return this.pos}async flush(){return te(this.started&&!this.finalized),this.target._flush()}async finalize(){te(this.started&&!this.finalized),await this.target._finalize(),this.finalized=!0}maybeTrackWrites(e){if(!this.trackedWrites)return;let t=this.getPos();if(t<this.trackedStart){if(t+e.byteLength<=this.trackedStart)return;e=e.subarray(this.trackedStart-t),t=0}let n=t+e.byteLength-this.trackedStart,r=this.trackedWrites.byteLength;for(;r<n;)r*=2;if(r!==this.trackedWrites.byteLength){let s=new Uint8Array(r);s.set(this.trackedWrites,0),this.trackedWrites=s}this.trackedWrites.set(e,t-this.trackedStart),this.trackedEnd=Math.max(this.trackedEnd,t+e.byteLength)}startTrackingWrites(){this.trackedWrites=new Uint8Array(2**10),this.trackedStart=this.getPos(),this.trackedEnd=this.trackedStart}stopTrackingWrites(){if(!this.trackedWrites)throw new Error("Internal error: Can't get tracked writes since nothing was tracked.");let t={data:this.trackedWrites.subarray(0,this.trackedEnd-this.trackedStart),start:this.trackedStart,end:this.trackedEnd};return this.trackedWrites=null,t}};var Ei=class extends ur{constructor(){super(...arguments),this._writerAcquired=!1,this._monotonicity=null,this.onwrite=null}_setMonotonicity(e){this._monotonicity!==!1&&(this._monotonicity=e)}_dispatchWrite(e,t){this.onwrite?.(e,t),this._emit("write",{start:e,end:t})}slice(e){if(!Number.isInteger(e)||e<0)throw new TypeError("offset must be a non-negative integer.");return new gu(this,e)}},Rd=2**16,Id=2**32,Fn=class extends Ei{constructor(e={}){if(super(),this.buffer=null,this._maxPos=0,!e||typeof e!="object")throw new TypeError("BufferTarget options, when provided, must be an object.");if(e.onFinalize!==void 0&&typeof e.onFinalize!="function")throw new TypeError("options.onFinalize, when provided, must be a function.");if(this._options=e,this._supportsResize="resize"in new ArrayBuffer(0),this._supportsResize)try{this._buffer=new ArrayBuffer(Rd,{maxByteLength:Id})}catch{this._buffer=new ArrayBuffer(Rd),this._supportsResize=!1}else this._buffer=new ArrayBuffer(Rd);this._bytes=new Uint8Array(this._buffer)}_ensureSize(e){let t=this._buffer.byteLength;for(;t<e;)t*=2;if(t!==this._buffer.byteLength){if(t>Id)throw new Error(`ArrayBuffer exceeded maximum size of ${Id} bytes. Please consider using another target.`);if(this._supportsResize)this._buffer.resize(t);else{let n=new ArrayBuffer(t),r=new Uint8Array(n);r.set(this._bytes,0),this._buffer=n,this._bytes=r}}}_start(){}_write(e,t){this._ensureSize(t+e.byteLength),this._bytes.set(e,t),this._maxPos=Math.max(this._maxPos,t+e.byteLength),this._dispatchWrite(t,t+e.byteLength)}async _flush(){}async _finalize(){this.buffer=this._buffer.slice(0,this._maxPos),this._options.onFinalize&&await this._options.onFinalize(this.buffer),this._emit("finalized")}async _close(){}_getSlice(e,t){return this._bytes.slice(e,t)}},NC=2**24;var gu=class extends Ei{constructor(e,t){super(),this._baseTarget=e,this._offset=t}_start(){}_write(e,t){this._baseTarget._write(e,this._offset+t),this._dispatchWrite(t,t+e.byteLength)}_flush(){return this._baseTarget._flush()}async _finalize(){this._emit("finalized")}async _close(){}_setMonotonicity(e){super._setMonotonicity(e),this._baseTarget._setMonotonicity(e)}},Vr=class{constructor(e,t){if(this.rootPath=e,this.getTarget=t,typeof e!="string")throw new TypeError("rootPath must be a string.");if(typeof t!="function")throw new TypeError("getTarget must be a function.")}};var gi=57600,DS=2082844800,Ug=i=>{let e={},t=i.track;return t.metadata.name!==void 0&&(e.name=t.metadata.name),e},St=(i,e,t=!0)=>{let n=i*e;return t?Math.round(n):n},kr=i=>{if(i.samples.length===0)return 0;let e=1/0,t=-1/0;for(let n=0;n<i.samples.length;n++){let r=i.samples[n];r.timestamp<e&&(e=r.timestamp),r.timestamp+r.duration>t&&(t=r.timestamp+r.duration)}return e===1/0?0:t-e},_u=class extends mu{constructor(e,t){super(e),this.writer=null,this.boxWriter=null,this.initWriter=null,this.initBoxWriter=null,this.auxTarget=new Fn,this.auxWriter=new zr(this.auxTarget,!1),this.auxBoxWriter=new Nr(this.auxWriter),this.mdat=null,this.ftypSize=null,this.trackDatas=[],this.allTracksKnown=Ql(),this.creationTime=Math.floor(Date.now()/1e3)+DS,this.finalizedChunks=[],this.wroteFragmentedHeader=!1,this.nextFragmentNumber=1,this.maxWrittenTimestamp=-1/0,this.minWrittenTimestamp=1/0,this.maxWrittenEndTimestamp=-1/0,this.segmentHeaderSize=null,this.format=t,this.formatOptions={...t._options},this.isQuickTime=t instanceof js,this.isCmaf=t instanceof $s,this.minimumFragmentDuration=this.formatOptions.minimumFragmentDuration??(t instanceof $s?1/0:1),this.auxWriter.start()}async start(){let e=await this.mutex.acquire();if(this.isCmaf?(this.fastStart="fragmented",this.isFragmented=!0):(this.writer=await this.output._getRootWriter(n=>this.formatOptions.fastStart!==void 0?this.formatOptions.fastStart==="fragmented":n instanceof Fn),this.boxWriter=new Nr(this.writer),this.fastStart=this.formatOptions.fastStart??(this.writer.target instanceof Fn?"in-memory":!1),this.isFragmented=this.fastStart==="fragmented"),this.isCmaf){if(!this.output._hasInitTarget())throw new Error("CMAF outputs require the initTarget field in OutputOptions to be set; the init segment will be written to it.");let n=await this.output._getInitTarget(),r=new zr(n,!0);r.start(),this.initWriter=r,this.initBoxWriter=new Nr(r)}let t=this.output.tracks.some(n=>n.isVideoTrack()&&n.source._codec==="avc");{let n=this.initBoxWriter??this.boxWriter;if(te(n),this.formatOptions.onFtyp&&n.writer.startTrackingWrites(),n.writeBox(Eg({isQuickTime:this.isQuickTime,holdsAvc:t,fragmented:this.isFragmented,cmaf:this.isCmaf})),this.formatOptions.onFtyp){let{data:r,start:s}=n.writer.stopTrackingWrites();this.formatOptions.onFtyp(r,s)}this.ftypSize=n.writer.getPos(),this.isCmaf&&await this.initWriter.flush()}if(this.fastStart!=="in-memory")if(this.fastStart==="reserve"){for(let n of this.output.tracks)if(n.metadata.maximumPacketCount===void 0)throw new Error("All tracks must specify maximumPacketCount in their metadata when using fastStart: 'reserve'.")}else this.isFragmented||(te(this.writer),te(this.boxWriter),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=Ea(!0),this.boxWriter.writeBox(this.mdat));await this.writer?.flush();for(let n of this.output.tracks)n.isVideoTrack()&&n.metadata.decoderConfig?this.getVideoTrackData(n,n.metadata.primingPacket??null,{decoderConfig:n.metadata.decoderConfig}):n.isAudioTrack()&&n.metadata.decoderConfig&&this.getAudioTrackData(n,n.metadata.primingPacket??null,{decoderConfig:n.metadata.decoderConfig});e()}allTracksAreKnown(){for(let e of this.output.tracks)if(!e.source._closed&&!this.trackDatas.some(t=>t.track===e))return!1;return!0}async getMimeType(){await this.allTracksKnown.promise;let e=this.trackDatas.map(t=>t.type==="video"||t.type==="audio"?t.info.decoderConfig.codec:{webvtt:"wvtt"}[t.track.source._codec]);return ng({isQuickTime:this.isQuickTime,hasVideo:this.trackDatas.some(t=>t.type==="video"),hasAudio:this.trackDatas.some(t=>t.type==="audio"),codecStrings:e})}getVideoTrackData(e,t,n){let r=this.trackDatas.find(f=>f.track===e);if(r)return r;lu(n,e.source._codec),te(n),te(n.decoderConfig);let s={...n.decoderConfig};te(s.codedWidth!==void 0),te(s.codedHeight!==void 0);let o=!1;if(e.source._codec==="avc"&&!s.description){if(!t)throw new Error("No AVC description provided; you must therefore provide a priming packet.");let f=Nm(t.data);if(!f)throw new Error("Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.");s.description=km(f),o=!0}else if(e.source._codec==="hevc"&&!s.description){if(!t)throw new Error("No HEVC description provided; you must therefore provide a priming packet.");let f=Vm(t.data);if(!f)throw new Error("Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.");s.description=Hm(f),o=!0}let a=fm(1/(e.metadata.frameRate??gi),1e6).den,c=s.displayAspectWidth,l=s.displayAspectHeight,u=c===void 0||l===void 0?{num:1,den:1}:iu({num:c*s.codedHeight,den:l*s.codedWidth}),d=s.codec==="ap4h"||s.codec==="ap4x",h={muxer:this,track:e,type:"video",info:{width:s.codedWidth,height:s.codedHeight,pixelAspectRatio:u,decoderConfig:s,requiresAnnexBTransformation:o,hasAlphaChannel:d},timescale:a,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,avgBitrate:e.source._nominalBitrate??e.metadata.averageBitrate??0,maxBitrate:e.source._nominalBitrate??e.metadata.bitrate??0};return this.trackDatas.push(h),this.trackDatas.sort((f,m)=>f.track.id-m.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),h}getAudioTrackData(e,t,n){let r=this.trackDatas.find(c=>c.track===e);if(r)return r;uu(n,e.source._codec),te(n),te(n.decoderConfig);let s={...n.decoderConfig},o=!1;if(e.source._codec==="aac"&&!s.description){if(!t)throw new Error("No AAC description provided; you must therefore provide a priming packet.");let c=hd(Ma.tempFromBytes(t.data));if(!c)throw new Error("Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.");let l=sd[c.samplingFrequencyIndex],u=od[c.channelConfiguration];if(l===void 0||u===void 0)throw new Error("Invalid ADTS frame header.");s.description=Em({objectType:c.objectType,outputSampleRate:l,outputNumberOfChannels:u}),o=!0}if(!t){if(e.source._codec==="ac3"||e.source._codec==="eac3")throw new Error("AC-3/E-AC-3 require a priming packet.");if(e.source._codec==="dts")throw new Error("DTS requires a priming packet.")}let a={muxer:this,track:e,type:"audio",info:{numberOfChannels:n.decoderConfig.numberOfChannels,sampleRate:n.decoderConfig.sampleRate,decoderConfig:s,requiresPcmTransformation:!this.isFragmented&&Ni.includes(e.source._codec),expectedNextPcmPacketTimestamp:null,requiresAdtsStripping:o,primingPacket:t},timescale:s.sampleRate,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,avgBitrate:e.source._nominalBitrate??e.metadata.averageBitrate??0,maxBitrate:e.source._nominalBitrate??e.metadata.bitrate??0};return this.trackDatas.push(a),this.trackDatas.sort((c,l)=>c.track.id-l.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),a}getSubtitleTrackData(e,t){let n=this.trackDatas.find(s=>s.track===e);if(n)return n;tg(t),te(t),te(t.config);let r={muxer:this,track:e,type:"subtitle",info:{config:t.config},timescale:1e3,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,avgBitrate:e.source._nominalBitrate??e.metadata.averageBitrate??0,maxBitrate:e.source._nominalBitrate??e.metadata.bitrate??0,lastCueEndTimestamp:null,cueQueue:[],nextSourceId:0,cueToSourceId:new WeakMap};return this.trackDatas.push(r),this.trackDatas.sort((s,o)=>s.track.id-o.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),r}async addEncodedVideoPacket(e,t,n){let r=await this.mutex.acquire();try{let s=this.getVideoTrackData(e,t,n),o=t.data;if(s.info.requiresAnnexBTransformation){let c=[...Ys(o)].map(l=>o.subarray(l.offset,l.offset+l.length));if(c.length===0)throw new Error("Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.");o=Om(c,4)}this.validateTimestamp(s.track,t.timestamp,t.type==="key");let a=this.createSampleForTrack(s,o,t.timestamp,t.duration,t.type);await this.registerSample(s,a)}finally{r()}}async addEncodedAudioPacket(e,t,n){let r=await this.mutex.acquire();try{let s=this.getAudioTrackData(e,t,n),o=t.data;if(s.info.requiresAdtsStripping){let u=hd(Ma.tempFromBytes(o));if(!u)throw new Error("Expected ADTS frame, didn't get one.");let d=u.crcCheck===null?rg:sg;o=o.subarray(d)}this.validateTimestamp(s.track,t.timestamp,t.type==="key");let a=t.timestamp,c=t.duration;if(s.info.requiresPcmTransformation){let d=Bn(s.info.decoderConfig.codec).sampleSize*s.info.numberOfChannels;if(c=o.byteLength/d/s.info.sampleRate,s.info.expectedNextPcmPacketTimestamp!==null){let h=a-s.info.expectedNextPcmPacketTimestamp;if(h<.01)a=s.info.expectedNextPcmPacketTimestamp;else{let f=await this.padWithSilence(s,s.info.expectedNextPcmPacketTimestamp,h);a=s.info.expectedNextPcmPacketTimestamp+f}}s.info.expectedNextPcmPacketTimestamp=a+c}let l=this.createSampleForTrack(s,o,a,c,t.type);await this.registerSample(s,l)}finally{r()}}async padWithSilence(e,t,n){let r=St(n,e.timescale);if(n=r/e.timescale,r>0){let{sampleSize:s,silentValue:o}=Bn(e.info.decoderConfig.codec),a=r*e.info.numberOfChannels,c=new Uint8Array(s*a).fill(o),l=this.createSampleForTrack(e,new Uint8Array(c.buffer),t,n,"key");await this.registerSample(e,l)}return n}async addSubtitleCue(e,t,n){let r=await this.mutex.acquire();try{let s=this.getSubtitleTrackData(e,n);this.validateTimestamp(s.track,t.timestamp,!0),e.source._codec==="webvtt"&&(s.cueQueue.push(t),await this.processWebVTTCues(s,t.timestamp))}finally{r()}}async processWebVTTCues(e,t){for(;e.cueQueue.length>0;){e.lastCueEndTimestamp??=Math.min(0,e.cueQueue[0].timestamp);let n=new Set([]);for(let l of e.cueQueue)te(l.timestamp<=t),te(e.lastCueEndTimestamp<=l.timestamp+l.duration),n.add(Math.max(l.timestamp,e.lastCueEndTimestamp)),n.add(l.timestamp+l.duration);let r=[...n].sort((l,u)=>l-u),s=r[0],o=r[1]??s;if(t<o)break;if(e.lastCueEndTimestamp<s){this.auxWriter.seek(0);let l=Ig();this.auxBoxWriter.writeBox(l);let u=this.auxTarget._getSlice(0,this.auxWriter.getPos()),d=this.createSampleForTrack(e,u,e.lastCueEndTimestamp,s-e.lastCueEndTimestamp,"key");await this.registerSample(e,d),e.lastCueEndTimestamp=s}this.auxWriter.seek(0);for(let l=0;l<e.cueQueue.length;l++){let u=e.cueQueue[l];if(u.timestamp>=o)break;yd.lastIndex=0;let d=yd.test(u.text),h=u.timestamp+u.duration,f=e.cueToSourceId.get(u);if(f===void 0&&o<h&&(f=e.nextSourceId++,e.cueToSourceId.set(u,f)),u.notes){let y=Bg(u.notes);this.auxBoxWriter.writeBox(y)}let m=Pg(u.text,d?s:null,u.identifier??null,u.settings??null,f??null);this.auxBoxWriter.writeBox(m),h===o&&e.cueQueue.splice(l--,1)}let a=this.auxTarget._getSlice(0,this.auxWriter.getPos()),c=this.createSampleForTrack(e,a,s,o-s,"key");await this.registerSample(e,c),e.lastCueEndTimestamp=o}}createSampleForTrack(e,t,n,r,s){return{timestamp:n,decodeTimestamp:n,duration:r,data:t,size:t.byteLength,type:s,timescaleUnitsToNextSample:St(r,e.timescale)}}processTimestamps(e,t){if(e.timestampProcessingQueue.length===0)return;if(e.type==="audio"&&e.info.requiresPcmTransformation){te(!this.isFragmented),e.startTimestampOffset??=e.timestampProcessingQueue[0].timestamp;let r=0;for(let s=0;s<e.timestampProcessingQueue.length;s++){let o=e.timestampProcessingQueue[s],a=St(o.duration,e.timescale);r+=a}if(e.timeToSampleTable.length===0)e.timeToSampleTable.push({sampleCount:r,sampleDelta:1});else{let s=hi(e.timeToSampleTable);s.sampleCount+=r}e.timestampProcessingQueue.length=0;return}let n=e.timestampProcessingQueue.map(r=>r.timestamp).sort((r,s)=>r-s);this.isFragmented?e.startTimestampOffset??=Math.min(n[0],0):e.startTimestampOffset??=n[0];for(let r=0;r<e.timestampProcessingQueue.length;r++){let s=e.timestampProcessingQueue[r];s.decodeTimestamp=n[r];let o=St(s.timestamp-s.decodeTimestamp,e.timescale),a=St(s.duration,e.timescale);if(e.lastTimescaleUnits!==null){te(e.lastSample);let c=St(s.decodeTimestamp,e.timescale,!1),l=Math.round(c-e.lastTimescaleUnits);if(te(l>=0),e.lastTimescaleUnits+=l,e.lastSample.timescaleUnitsToNextSample=l,!this.isFragmented){let u=hi(e.timeToSampleTable);if(te(u),u.sampleCount===1){u.sampleDelta=l;let h=e.timeToSampleTable[e.timeToSampleTable.length-2];h&&h.sampleDelta===l&&(h.sampleCount++,e.timeToSampleTable.pop(),u=h)}else u.sampleDelta!==l&&(u.sampleCount--,e.timeToSampleTable.push(u={sampleCount:1,sampleDelta:l}));u.sampleDelta===a?u.sampleCount++:e.timeToSampleTable.push({sampleCount:1,sampleDelta:a});let d=hi(e.compositionTimeOffsetTable);te(d),d.sampleCompositionTimeOffset===o?d.sampleCount++:e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:o})}}else e.lastTimescaleUnits=St(s.decodeTimestamp,e.timescale,!1),this.isFragmented||(e.timeToSampleTable.push({sampleCount:1,sampleDelta:a}),e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:o}));e.lastSample=s}if(e.timestampProcessingQueue.length=0,te(e.lastSample),te(e.lastTimescaleUnits!==null),t!==void 0&&e.lastSample.timescaleUnitsToNextSample===0){te(t.type==="key");let r=St(t.timestamp,e.timescale,!1),s=Math.round(r-e.lastTimescaleUnits);e.lastSample.timescaleUnitsToNextSample=s}}async registerSample(e,t){t.type==="key"&&this.processTimestamps(e,t),e.timestampProcessingQueue.push(t),this.isFragmented?(e.sampleQueue.push(t),await this.interleaveSamples()):this.fastStart==="reserve"?await this.registerSampleFastStartReserve(e,t):await this.addSampleToTrack(e,t)}async addSampleToTrack(e,t){if(!this.isFragmented&&(e.samples.push(t),this.fastStart==="reserve")){let r=e.track.metadata.maximumPacketCount;if(te(r!==void 0),e.samples.length>r)throw new Error(`Track #${e.track.id} has already reached the maximum packet count (${r}). Either add less packets or increase the maximum packet count.`)}let n=!1;if(!e.currentChunk)n=!0;else{e.currentChunk.startTimestamp=Math.min(e.currentChunk.startTimestamp,t.timestamp);let r=t.timestamp-e.currentChunk.startTimestamp;if(this.isFragmented){let s=this.trackDatas.every(o=>{if(e===o)return t.type==="key";let a=o.sampleQueue[0];return a?a.type==="key":o.closed});r>=this.minimumFragmentDuration&&s&&t.timestamp>this.maxWrittenTimestamp&&(n=!0,await this.finalizeFragment())}else n=r>=.5}n&&(e.currentChunk&&await this.finalizeCurrentChunk(e),e.currentChunk={startTimestamp:t.timestamp,samples:[],offset:null,moofOffset:null,trafIndex:null}),te(e.currentChunk),e.currentChunk.samples.push(t),this.isFragmented&&(this.maxWrittenTimestamp=Math.max(this.maxWrittenTimestamp,t.timestamp),this.maxWrittenEndTimestamp=Math.max(this.maxWrittenEndTimestamp,t.timestamp+t.duration),this.minWrittenTimestamp=Math.min(this.minWrittenTimestamp,t.timestamp))}async finalizeCurrentChunk(e){if(te(!this.isFragmented),te(this.writer),!e.currentChunk)return;e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk);let t=e.currentChunk.samples.length;if(e.type==="audio"&&e.info.requiresPcmTransformation&&(t=e.currentChunk.samples.reduce((n,r)=>n+St(r.duration,e.timescale),0)),(e.compactlyCodedChunkTable.length===0||hi(e.compactlyCodedChunkTable).samplesPerChunk!==t)&&e.compactlyCodedChunkTable.push({firstChunk:e.finalizedChunks.length,samplesPerChunk:t}),this.fastStart==="in-memory"){e.currentChunk.offset=0;return}e.currentChunk.offset=this.writer.getPos();for(let n of e.currentChunk.samples)te(n.data),this.writer.write(n.data),n.data=null;await this.writer.flush()}async interleaveSamples(e=!1){if(te(this.isFragmented),!(!e&&!this.allTracksAreKnown()))e:for(;;){let t=null,n=1/0;for(let s of this.trackDatas){if(!e&&s.sampleQueue.length===0&&!s.closed)break e;s.sampleQueue.length>0&&s.sampleQueue[0].timestamp<n&&(t=s,n=s.sampleQueue[0].timestamp)}if(!t)break;let r=t.sampleQueue.shift();await this.addSampleToTrack(t,r)}}async finalizeFragment(e=!this.isCmaf){if(te(this.isFragmented),!this.wroteFragmentedHeader){this.wroteFragmentedHeader=!0;let f=this.initBoxWriter??this.boxWriter;te(f),this.formatOptions.onMoov&&f.writer.startTrackingWrites(),this.ensureOneEnabledTrack();let m=Zs(this);if(f.writeBox(m),this.formatOptions.onMoov){let{data:y,start:g}=f.writer.stopTrackingWrites();this.formatOptions.onMoov(y,g)}if(this.isCmaf){te(this.initWriter),await this.initWriter.flush(),await this.initWriter.finalize(),this.writer=await this.output._getRootWriter(!0),this.boxWriter=new Nr(this.writer);let y=this.boxWriter.measureBox(Sd()),g=this.boxWriter.measureBox(Md(this,0));this.segmentHeaderSize=y+g,this.writer.seek(this.segmentHeaderSize)}}te(this.writer),te(this.boxWriter);let t=this.trackDatas.filter(f=>f.currentChunk);if(t.length===0){e&&await this.writer.flush();return}let n=this.nextFragmentNumber++,r=Cd(n,t),s=this.writer.getPos(),o=s+this.boxWriter.measureBox(r),a=o+hu,c=1/0;for(let f=0;f<t.length;f++){let m=t[f];te(m.currentChunk),te(m.startTimestampOffset!==null),m.currentChunk.offset=a,m.currentChunk.moofOffset=s,m.currentChunk.trafIndex=f,m.currentChunk.startTimestamp-=m.startTimestampOffset;for(let y of m.currentChunk.samples)a+=y.size,y.timestamp-=m.startTimestampOffset,y.decodeTimestamp-=m.startTimestampOffset;c=Math.min(c,m.currentChunk.startTimestamp)}let l=a-o,u=l>=2**32;if(u)for(let f of t)f.currentChunk.offset+=ud-hu;this.formatOptions.onMoof&&this.writer.startTrackingWrites();let d=Cd(n,t);if(this.boxWriter.writeBox(d),this.formatOptions.onMoof){let{data:f,start:m}=this.writer.stopTrackingWrites();this.formatOptions.onMoof(f,m,c)}te(this.writer.getPos()===o),this.formatOptions.onMdat&&this.writer.startTrackingWrites();let h=Ea(u);h.size=l,this.boxWriter.writeBox(h),this.writer.seek(o+(u?ud:hu));for(let f of t)for(let m of f.currentChunk.samples)this.writer.write(m.data),m.data=null;if(this.formatOptions.onMdat){let{data:f,start:m}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(f,m)}for(let f of t)f.finalizedChunks.push(f.currentChunk),this.finalizedChunks.push(f.currentChunk),f.currentChunk=null;e&&await this.writer.flush()}async registerSampleFastStartReserve(e,t){this.allTracksAreKnown()?(this.mdat||await this.createFastStartReserveMdat(),await this.addSampleToTrack(e,t)):e.sampleQueue.push(t)}async createFastStartReserveMdat(){te(this.writer),te(this.boxWriter),this.ensureOneEnabledTrack();let e=Zs(this),n=this.boxWriter.measureBox(e)+this.computeSampleTableSizeUpperBound()+4096;te(this.ftypSize!==null),this.writer.seek(this.ftypSize+n),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=Ea(!0),this.boxWriter.writeBox(this.mdat);for(let r of this.trackDatas){for(let s of r.sampleQueue)await this.addSampleToTrack(r,s);r.sampleQueue.length=0}}computeSampleTableSizeUpperBound(){te(this.fastStart==="reserve");let e=0;for(let t of this.trackDatas){let n=t.track.metadata.maximumPacketCount;te(n!==void 0),e+=8*Math.ceil(2/3*n),e+=4*n,e+=8*Math.ceil(2/3*n),e+=12*Math.ceil(2/3*n),e+=4*n,e+=8*n}return e}async onTrackClose(e){let t=await this.mutex.acquire(),n=this.trackDatas.find(r=>r.track===e);n&&(n.closed=!0,n.type==="subtitle"&&e.source._codec==="webvtt"&&await this.processWebVTTCues(n,1/0),this.processTimestamps(n)),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),this.isFragmented&&await this.interleaveSamples(),t()}ensureOneEnabledTrack(){for(let e of["video","audio","subtitle"]){let t=this.trackDatas.filter(r=>r.type===e);if(t.length===0)continue;if(!t.some(r=>r.track.metadata.disposition?.default!==!1)){let r=t[0];r.track.metadata.disposition={...r.track.metadata.disposition,default:!0}}}}async forceFragmentFinalization(){te(this.isFragmented);let e=await this.mutex.acquire();try{for(let t of this.trackDatas)t.type==="subtitle"&&t.track.source._codec==="webvtt"&&await this.processWebVTTCues(t,1/0),this.processTimestamps(t);await this.interleaveSamples(!0),await this.finalizeFragment()}finally{e()}}async finalize(){let e=await this.mutex.acquire();this.allTracksKnown.resolve(),this.ensureOneEnabledTrack(),!this.mdat&&this.fastStart==="reserve"&&await this.createFastStartReserveMdat();for(let t of this.trackDatas)t.closed=!0,t.type==="subtitle"&&t.track.source._codec==="webvtt"&&await this.processWebVTTCues(t,1/0),this.processTimestamps(t);if(this.isFragmented)await this.interleaveSamples(!0),await this.finalizeFragment(!1);else for(let t of this.trackDatas){await this.finalizeCurrentChunk(t);let n=kr(t);if(n>0){let a=0;for(let c of t.samples)a+=c.size;t.avgBitrate=Math.round(8*a/n)}else t.avgBitrate=0;let r=0,s=0,o=0;for(let a=0;a<t.samples.length;a++){let c=t.samples[a];for(s+=c.size;c.decodeTimestamp-t.samples[r].decodeTimestamp>=1;)s-=t.samples[r].size,r++;o=Math.max(o,s)}if(t.maxBitrate=8*o,t.startTimestampOffset!==null)for(let a=0;a<t.samples.length;a++){let c=t.samples[a];c.timestamp-=t.startTimestampOffset,c.decodeTimestamp-=t.startTimestampOffset}}if(te(this.writer),te(this.boxWriter),this.fastStart==="in-memory"){this.mdat=Ea(!1);let t;for(let r=0;r<2;r++){let s=Zs(this),o=this.boxWriter.measureBox(s);t=this.boxWriter.measureBox(this.mdat);let a=this.writer.getPos()+o+t;for(let c of this.finalizedChunks){c.offset=a;for(let{data:l}of c.samples)te(l),a+=l.byteLength,t+=l.byteLength}if(a<2**32)break;t>=2**32&&(this.mdat.largeSize=!0)}this.formatOptions.onMoov&&this.writer.startTrackingWrites();let n=Zs(this);if(this.boxWriter.writeBox(n),this.formatOptions.onMoov){let{data:r,start:s}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(r,s)}this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat.size=t,this.boxWriter.writeBox(this.mdat);for(let r of this.finalizedChunks)for(let s of r.samples)te(s.data),this.writer.write(s.data),s.data=null;if(this.formatOptions.onMdat){let{data:r,start:s}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(r,s)}}else if(this.isFragmented)if(this.isCmaf){let t=this.segmentHeaderSize!==null?this.writer.getPos()-this.segmentHeaderSize:0;this.writer.seek(0),this.boxWriter.writeBox(Sd()),this.boxWriter.writeBox(Md(this,t))}else{let t=this.writer.getPos(),n=Rg(this.trackDatas);this.boxWriter.writeBox(n);let r=this.writer.getPos()-t;this.writer.seek(this.writer.getPos()-4),this.boxWriter.writeU32(r)}else{te(this.mdat);let t=this.boxWriter.offsets.get(this.mdat);te(t!==void 0);let n=this.writer.getPos()-t;if(this.mdat.size=n,this.mdat.largeSize=n>=2**32,this.boxWriter.patchBox(this.mdat),this.formatOptions.onMdat){let{data:s,start:o}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(s,o)}let r=Zs(this);if(this.fastStart==="reserve"){te(this.ftypSize!==null),this.writer.seek(this.ftypSize),this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(r);let s=this.boxWriter.offsets.get(this.mdat)-this.writer.getPos();this.boxWriter.writeBox(Tg(s))}else this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(r);if(this.formatOptions.onMoov){let{data:s,start:o}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(s,o)}}e()}};var US=function(i,e,t){if(e!=null){if(typeof e!="object"&&typeof e!="function")throw new TypeError("Object expected.");var n,r;if(t){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");n=e[Symbol.asyncDispose]}if(n===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");n=e[Symbol.dispose],t&&(r=n)}if(typeof n!="function")throw new TypeError("Object not disposable.");r&&(n=function(){try{r.call(this)}catch(s){return Promise.reject(s)}}),i.stack.push({value:e,dispose:n,async:t})}else t&&i.stack.push({async:!0});return e},OS=function(i){return function(e){function t(o){e.error=e.hasError?new i(o,e.error,"An error was suppressed during disposal."):o,e.hasError=!0}var n,r=0;function s(){for(;n=e.stack.pop();)try{if(!n.async&&r===1)return r=0,e.stack.push(n),Promise.resolve().then(s);if(n.dispose){var o=n.dispose.call(n.value);if(n.async)return r|=2,Promise.resolve(o).then(s,function(a){return t(a),s()})}else r|=1}catch(a){t(a)}if(r===1)return e.hasError?Promise.reject(e.error):Promise.resolve();if(e.hasError)throw e.error}return s()}}(typeof SuppressedError=="function"?SuppressedError:function(i,e,t){var n=new Error(t);return n.name="SuppressedError",n.error=i,n.suppressed=e,n}),Ks=class{constructor(){this._connectedTrack=null,this._closingPromise=null,this._closed=!1,this._nominalBitrate=null}_ensureValidAdd(){if(!this._connectedTrack)throw new Error("Source is not connected to an output track.");if(this._connectedTrack.output.state==="canceled")throw new Error("Output has been canceled.");if(this._connectedTrack.output.state==="finalizing"||this._connectedTrack.output.state==="finalized")throw new Error("Output has been finalized.");if(this._connectedTrack.output.state==="pending")throw new Error("Output has not started.");if(this._closed)throw new Error("Source is closed.")}async _start(){}async _flushAndClose(e){}close(){if(this._closingPromise)return;let e=this._connectedTrack;if(!e)throw new Error("Cannot call close without connecting the source to an output track.");if(e.output.state==="pending")throw new Error("Cannot call close before output has been started.");this._closingPromise=(async()=>{await this._flushAndClose(!1),this._closed=!0,!(e.output.state==="finalizing"||e.output.state==="finalized")&&e.output._muxer.onTrackClose(e)})()}async _flushOrWaitForOngoingClose(e){return this._closingPromise??=(async()=>{await this._flushAndClose(e),this._closed=!0})()}},Js=class extends Ks{constructor(e){if(super(),!ki.includes(e))throw new TypeError(`Invalid video codec '${e}'. Must be one of: ${ki.join(", ")}.`);this._codec=e}},Og=(i,e)=>{if(i.metadata.hasOnlyKeyPackets&&e.type!=="key")throw new Error("Cannot add non-key packets to a hasOnlyKeyPackets video track.")};var Bd=class{setError(e){this.errorSet||(this.error=e,this.errorSet=!0)}constructor(e,t){this.source=e,this.encodingConfig=t,this.ensureEncoderPromise=null,this.encoderInitialized=!1,this.encoder=null,this.encoderConfig=null,this.encodersReclaimed=!1,this.muxer=null,this.lastMultipleOfKeyFrameInterval=-1,this.emittedEncoderPackets=0,this.codedWidth=null,this.codedHeight=null,this.outputWidth=null,this.outputHeight=null,this.frameRateLastSample=null,this.frameRateLastTimestamp=null,this.frameRateLastEndTimestamp=null,this.preciseTimings=[],this.customEncoder=null,this.customEncoderCallSerializer=new Jl,this.customEncoderQueueSize=0,this.defaultEncodeOptions={},this.alphaEncoder=null,this.splitter=null,this.splitterCreationFailed=!1,this.alphaFrameQueue=[],this.error=null,this.errorSet=!1,this.lastMuxerPromise=Promise.resolve(),this.closed=!1}async add(e,t,n){let r=e;try{this.checkForEncoderError(),this.source._ensureValidAdd();let s=this.encodingConfig,o=s.sizeChangeBehavior??"deny",a=!1;if(this.codedWidth!==null&&this.codedHeight!==null){if((e.codedWidth!==this.codedWidth||e.codedHeight!==this.codedHeight)&&(a=!0,o==="deny"))throw new Error(`Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${e.codedWidth}x${e.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'deny' in the encoding options.`)}else this.codedWidth=e.codedWidth,this.codedHeight=e.codedHeight;if(s.transform?.width!==void 0||s.transform?.height!==void 0||s.transform?.rotate!==void 0||s.transform?.flip!==void 0||s.transform?.crop!==void 0||s.transform?.force===!0||a&&o!=="passThrough"){let d=s.transform?.width,h=s.transform?.height,f=s.transform?.fit??"fill";a&&o!=="passThrough"&&(te(this.outputWidth),te(this.outputHeight),te(o!=="deny"),d=this.outputWidth,h=this.outputHeight,f=o);let m=await e.transform({width:d,height:h,roundDimensionsTo:2,crop:s.transform?.crop,rotate:s.transform?.rotate,flip:s.transform?.flip,fit:f,alpha:s.alpha});(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=m.displayWidth,this.outputHeight=m.displayHeight),t&&e.close(),e=m,t=!0}else(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=e.codedWidth,this.outputHeight=e.codedHeight);let u=s.transform?.frameRate;if(u!==void 0){let d=e.timestamp+e.duration,h=id(e.timestamp,u);if(this.frameRateLastSample!==null)if(h<=this.frameRateLastTimestamp){this.frameRateLastSample.close(),this.frameRateLastSample=e.clone(),this.frameRateLastEndTimestamp=d;return}else await this.padFrameRate(h,n);e===r&&(e=e.clone(),t=!0),e.setTimestamp(h),e.setDuration(1/u),this.frameRateLastSample?.close(),this.frameRateLastSample=e.clone(),this.frameRateLastTimestamp=h,this.frameRateLastEndTimestamp=d}await this.processAndEncode(e,n)}finally{t&&e.close()}}async processAndEncode(e,t){let n=this.encodingConfig,r;if(n.transform?.process){let s=n.transform.process(e);if(Ji(s)&&(s=await s),s===null)return;Array.isArray(s)||(s=[s]);let o=[];try{for(let a of s)a instanceof mr?o.push(a):typeof VideoFrame<"u"&&a instanceof VideoFrame?o.push(new mr(a)):o.push(new mr(a,{timestamp:e.timestamp,duration:e.duration}))}catch(a){for(let c of o)c!==e&&c.close();for(let c of s)(c instanceof mr&&c!==e||typeof VideoFrame<"u"&&c instanceof VideoFrame)&&c.close();throw a}r=o}else r=[e];try{for(let s of r){if(this.encoderInitialized||(this.ensureEncoderPromise||this.ensureEncoder(s),this.encoderInitialized||await this.ensureEncoderPromise),te(this.encoderInitialized),this.closed)break;this.encodersReclaimed&&this.recreateWebCodecsEncoders();let o=this.encodingConfig.keyFrameInterval??2,a=Math.floor(s.timestamp/o),c={...this.defaultEncodeOptions,...s.encodeOptions,...t},l={...c,keyFrame:c.keyFrame!==void 0?c.keyFrame:o===0||a!==this.lastMultipleOfKeyFrameInterval};if(this.lastMultipleOfKeyFrameInterval=a,this.encodingConfig.onEncodedSample?.(s),this.customEncoder){this.customEncoderQueueSize++;let u=s.clone(),d=this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(u,l)).catch(h=>this.setError(h)).finally(()=>{this.customEncoderQueueSize--,u.close()});this.customEncoderQueueSize>=4&&await d}else{te(this.encoder);let u=s.toVideoFrame(),d=Jh(this.preciseTimings,u.timestamp,f=>f.microsecondTimestamp),h=d!==-1?this.preciseTimings[d]:null;if(h&&h.microsecondTimestamp===u.timestamp?(h.timestamp!==s.timestamp&&(h.timestampIsValid=!1),h.duration!==s.duration&&(h.durationIsValid=!1)):(this.preciseTimings.splice(d+1,0,{microsecondTimestamp:u.timestamp,timestamp:s.timestamp,duration:s.duration,timestampIsValid:!0,durationIsValid:!0}),this.preciseTimings.length>128&&this.preciseTimings.shift()),this.alphaEncoder)if(!!u.format&&!u.format.includes("A")||this.splitterCreationFailed){this.alphaFrameQueue.push(null);try{this.encoder.encode(u,l)}finally{u.close()}}else{this.splitter||(this.splitter=new Ld);let{colorFrame:m,alphaFrame:y}=await this.splitter.split(u);this.alphaFrameQueue.push(y);try{this.encoder.encode(m,l)}finally{m.close()}}else try{this.encoder.encode(u,l)}finally{u.close()}this.encoder.encodeQueueSize>=4&&await new Promise(f=>this.encoder.addEventListener("dequeue",f,{once:!0}))}await this.lastMuxerPromise}}finally{for(let s of r)s!==e&&s.close()}}async padFrameRate(e,t){let n=this.encodingConfig.transform.frameRate;te(this.frameRateLastSample);let r=Math.round((e-this.frameRateLastTimestamp)*n);for(let s=1;s<r;s++){let o={stack:[],error:void 0,hasError:!1};try{let a=US(o,this.frameRateLastSample.clone(),!1);a.setTimestamp(this.frameRateLastTimestamp+s/n),a.setDuration(1/n),await this.processAndEncode(a,t)}catch(a){o.error=a,o.hasError=!0}finally{OS(o)}}}ensureEncoder(e){this.ensureEncoderPromise=(async()=>{let t=xd(this.encodingConfig.quality,this.encodingConfig.bitrate);te(t!==void 0);let n=md({...this.encodingConfig,quality:t,width:e.codedWidth,height:e.codedHeight,squarePixelWidth:e.squarePixelWidth,squarePixelHeight:e.squarePixelHeight,framerate:this.source._connectedTrack?.metadata.frameRate}),r=null,s;for(let a of n){let c=a.config;if(this.encodingConfig.onEncoderConfig?.(c),s=pu.find(u=>u.supports(this.encodingConfig.codec,c)),s){r=a;break}if(typeof VideoEncoder>"u")continue;if(c.alpha="discard",this.encodingConfig.alpha==="keep"&&(c.latencyMode="quality"),(c.width%2===1||c.height%2===1)&&(this.encodingConfig.codec==="avc"||this.encodingConfig.codec==="hevc"))throw new Error(`The dimensions ${c.width}x${c.height} are not supported for codec '${this.encodingConfig.codec}'; both width and height must be even numbers. Make sure to round your dimensions to the nearest even number.`);try{if((await VideoEncoder.isConfigSupported(c)).supported){r=a;break}}catch{}}if(!r){if(typeof VideoEncoder>"u")throw new Error(mm("VideoEncoder"));let a=n[0].config,c=n.map(({config:l,quantizer:u})=>u!==null?`quantizer ${u}`:`${l.bitrate} bps`);throw new Error(`This specific encoder configuration (${a.codec}, ${c.join(" / ")}, ${a.width}x${a.height}, hardware acceleration: ${a.hardwareAcceleration??"no-preference"}) is not supported in this environment. Consider using another codec or changing your video parameters.`)}let o=r.config;r.quantizer!==null?this.defaultEncodeOptions=gd(this.encodingConfig.codec,r.quantizer):this.source._nominalBitrate=o.bitrate??null,s?(this.customEncoder=new s,this.customEncoder.codec=this.encodingConfig.codec,this.customEncoder.config=o,this.customEncoder.onPacket=(a,c)=>{if(!(a instanceof pr))throw new TypeError("The first argument passed to onPacket must be an EncodedPacket.");if(c!==void 0&&(!c||typeof c!="object"))throw new TypeError("The second argument passed to onPacket must be an object or undefined.");Og(this.source._connectedTrack,a),this.encodingConfig.onEncodedPacket?.(a,c),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,a,c).catch(l=>{this.setError(l)})},this.customEncoder.onError=a=>{this.setError(a)},await this.customEncoder.init()):(this.encoderConfig=o,this.createWebCodecsEncoders()),te(this.source._connectedTrack),this.muxer=this.source._connectedTrack.output._muxer,this.encoderInitialized=!0})()}createWebCodecsEncoders(){let e=this.encoderConfig;te(e);let t=[],n=[],r=0,s=0,o=(c,l)=>{if(gm(c)){this.encodersReclaimed=!0;return}c.stack=l,this.setError(c)},a=new Error("Encoding error").stack;if(this.encoder=new VideoEncoder({output:(c,l)=>{if(!this.alphaEncoder){this.addPacket(c,null,l);return}let u=this.alphaFrameQueue.shift();te(u!==void 0),u?(this.alphaEncoder.encode(u,{...this.defaultEncodeOptions,keyFrame:c.type==="key"}),s++,u.close(),t.push({chunk:c,meta:l})):s===0?this.addPacket(c,null,l):(n.push(r+s),t.push({chunk:c,meta:l}))},error:c=>o(c,a)}),this.encoder.configure(e),this.encodingConfig.alpha==="keep"){let c=new Error("Encoding error").stack;this.alphaEncoder=new VideoEncoder({output:(l,u)=>{s--;let d=t.shift();for(te(d!==void 0),this.addPacket(d.chunk,l,d.meta),r++;n.length>0&&n[0]===r;){n.shift();let h=t.shift();te(h!==void 0),this.addPacket(h.chunk,null,h.meta)}},error:l=>o(l,c)}),this.alphaEncoder.configure(e)}}addPacket(e,t,n){let r={};if(t){let l=new Uint8Array(t.byteLength);t.copyTo(l),r.alpha=l}let s=pr.fromEncodedChunk(e,r),o=Jh(this.preciseTimings,e.timestamp,l=>l.microsecondTimestamp),a=o!==-1?this.preciseTimings[o]:null,c=null;this.emittedEncoderPackets===0&&s.type==="delta"&&n?.decoderConfig&&(c=Wm(this.encodingConfig.codec,n.decoderConfig,s.data)),(a&&a.microsecondTimestamp===e.timestamp||c!==null)&&(s=s.clone({timestamp:a?.timestampIsValid?a.timestamp:void 0,duration:a?.durationIsValid?a.duration:void 0,type:c??void 0})),Og(this.source._connectedTrack,s),this.encodingConfig.onEncodedPacket?.(s,n),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,s,n).catch(l=>{this.setError(l)}),this.emittedEncoderPackets++}recreateWebCodecsEncoders(){te(this.encoder),this.encoder.state!=="closed"&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!=="closed"&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(e=>e?.close()),this.alphaFrameQueue.length=0,this.encodersReclaimed=!1,this.lastMultipleOfKeyFrameInterval=-1,this.createWebCodecsEncoders()}async flushAndClose(e){try{if(!e&&(this.checkForEncoderError(),this.frameRateLastSample)){let t=this.encodingConfig.transform.frameRate,n=id(this.frameRateLastEndTimestamp,t);await this.padFrameRate(n)}this.closed=!0,e||(this.customEncoder?this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()):this.encoder&&!this.encodersReclaimed&&(await this.encoder.flush(),await this.alphaEncoder?.flush(),await bm(25)))}finally{this.closed=!0,this.frameRateLastSample?.close(),this.frameRateLastSample=null,this.customEncoder?await this.customEncoderCallSerializer.call(()=>this.customEncoder.close()).catch(t=>this.setError(t)):this.encoder&&(this.encoder.state!=="closed"&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!=="closed"&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(t=>t?.close()),this.alphaFrameQueue.length=0,this.splitter?.close())}e||this.checkForEncoderError()}getQueueSize(){return this.customEncoder?this.customEncoderQueueSize:this.encoder?.encodeQueueSize??0}checkForEncoderError(){if(this.errorSet)throw this.error}},Pd=null,Ld=class{constructor(){this.worker=null,this.pendingRequests=new Map,this.nextRequestId=0}split(e){if(!this.worker){if(!Pd){let r=new Blob([`(${NS.toString()})()`],{type:"application/javascript"});Pd=URL.createObjectURL(r)}this.worker=new Worker(Pd),this.worker.addEventListener("message",r=>{let s=r.data,o=this.pendingRequests.get(s.id);o&&(this.pendingRequests.delete(s.id),"error"in s?o.reject(new Error(s.error)):o.resolve({colorFrame:s.colorFrame,alphaFrame:s.alphaFrame}))}),this.worker.addEventListener("error",r=>{let s=new Error(r.message||"Color/alpha splitter worker error.");for(let o of this.pendingRequests.values())o.reject(s);this.pendingRequests.clear()})}let t=this.nextRequestId++,n=Ql();return this.pendingRequests.set(t,n),this.worker.postMessage({id:t,sourceFrame:e},{transfer:[e]}),n.promise}close(){this.worker?.terminate(),this.worker=null;let e=new Error("Color/alpha splitter closed.");for(let t of this.pendingRequests.values())t.reject(e);this.pendingRequests.clear()}},NS=()=>{let i=null,e=Promise.resolve();self.addEventListener("message",s=>{let{id:o,sourceFrame:a}=s.data;e=e.then(async()=>{try{let{colorFrame:c,alphaFrame:l}=await t(a);self.postMessage({id:o,colorFrame:c,alphaFrame:l},{transfer:[c,l]})}catch(c){self.postMessage({id:o,error:c.message})}finally{a.close()}})});let t=async s=>{let o=s.format;if(!o)throw new Error("CPU color/alpha splitting requires a known VideoFrame format.");let a=s.allocationSize();if((!i||i.byteLength!==a)&&(i=new Uint8Array(a)),await s.copyTo(i),o==="RGBA"||o==="BGRA")return n(i,o,s);if(o==="I420A"||o==="I420AP10"||o==="I420AP12"||o==="I422A"||o==="I422AP10"||o==="I422AP12"||o==="I444A"||o==="I444AP10"||o==="I444AP12")return r(i,o,s);throw new Error(`CPU color/alpha splitting does not support format '${o}'.`)},n=(s,o,a)=>{let c=a.visibleRect?.width??a.codedWidth,l=a.visibleRect?.height??a.codedHeight,u=c*l,d=Math.ceil(c/2),h=Math.ceil(l/2),f=u+d*h*2,m=new Uint8Array(f);for(let w=0,T=3;w<u;w++,T+=4)m[w]=s[T];m.fill(128,u);let y=new VideoFrame(s,{format:o==="RGBA"?"RGBX":"BGRX",codedWidth:c,codedHeight:l,timestamp:a.timestamp,duration:a.duration??void 0}),g={format:"I420",codedWidth:c,codedHeight:l,timestamp:a.timestamp,duration:a.duration??void 0,colorSpace:{fullRange:!0,matrix:"bt709",primaries:"bt709",transfer:"bt709"},transfer:[m.buffer]},p=new VideoFrame(m,g);return{colorFrame:y,alphaFrame:p}},r=(s,o,a)=>{let c=a.visibleRect?.width??a.codedWidth,l=a.visibleRect?.height??a.codedHeight,u=o.includes("P10"),d=o.includes("P12"),h=u||d?2:1,f,m;o.startsWith("I420")?(f=Math.ceil(c/2),m=Math.ceil(l/2)):o.startsWith("I422")?(f=Math.ceil(c/2),m=l):(f=c,m=l);let y=c*l,g=f*m,p=y*h,w=g*h,T=y*h,b=p+w*2,A=o.replace("A",""),S=Math.ceil(c/2),I=Math.ceil(l/2),x=S*I,E=x*h,P=T+2*E,F=new Uint8Array(P),N=b;F.set(s.subarray(N,N+T),0);let V=T,B=u?512:d?2048:128;h===1?F.fill(B,V):new Uint16Array(F.buffer,V,2*x).fill(B);let U=u?"I420P10":d?"I420P12":"I420",H=new VideoFrame(s.subarray(0,b),{format:A,codedWidth:c,codedHeight:l,timestamp:a.timestamp,duration:a.duration??void 0}),Z={format:U,codedWidth:c,codedHeight:l,timestamp:a.timestamp,duration:a.duration??void 0,colorSpace:{fullRange:!0,matrix:"bt709",primaries:"bt709",transfer:"bt709"},transfer:[F.buffer]},ne=new VideoFrame(F,Z);return{colorFrame:H,alphaFrame:ne}}};var Ta=class extends Js{constructor(e,t){if(!(typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement)&&!(typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas))throw new TypeError("canvas must be an HTMLCanvasElement or OffscreenCanvas.");_g(t),super(t.codec),this._encoder=new Bd(this,t),this._canvas=e}add(e,t=0,n){if(!Number.isFinite(e))throw new TypeError("timestamp must be a finite number.");if(!Number.isFinite(t)||t<0)throw new TypeError("duration must be a non-negative number.");let r=new mr(this._canvas,{timestamp:e,duration:t});return this._encoder.add(r,!0,n)}_flushAndClose(e){return this._encoder.flushAndClose(e)}};var Ca=class extends Ks{constructor(e){if(super(),!Or.includes(e))throw new TypeError(`Invalid audio codec '${e}'. Must be one of: ${Or.join(", ")}.`);this._codec=e}};var Ra=class extends Ks{constructor(e){if(super(),!fr.includes(e))throw new TypeError(`Invalid subtitle codec '${e}'. Must be one of: ${fr.join(", ")}.`);this._codec=e}};var Qs=class{get supportsVideoRotationMetadata(){return this.supportsVideoTransformationMetadata}getSupportedVideoCodecs(){return this.getSupportedCodecs().filter(e=>ki.includes(e))}getSupportedAudioCodecs(){return this.getSupportedCodecs().filter(e=>Or.includes(e))}getSupportedSubtitleCodecs(){return this.getSupportedCodecs().filter(e=>fr.includes(e))}_codecUnsupportedHint(e){return""}_isFragmentedIsobmff(){return!1}},eo=class extends Qs{constructor(e={}){if(!e||typeof e!="object")throw new TypeError("options must be an object.");if(e.fastStart!==void 0&&![!1,"in-memory","reserve","fragmented"].includes(e.fastStart))throw new TypeError("options.fastStart, when provided, must be false, 'in-memory', 'reserve', or 'fragmented'.");if(e.minimumFragmentDuration!==void 0&&(!xm(e.minimumFragmentDuration)||e.minimumFragmentDuration<0))throw new TypeError("options.minimumFragmentDuration, when provided, must be a non-negative number.");if(e.onFtyp!==void 0&&typeof e.onFtyp!="function")throw new TypeError("options.onFtyp, when provided, must be a function.");if(e.onMoov!==void 0&&typeof e.onMoov!="function")throw new TypeError("options.onMoov, when provided, must be a function.");if(e.onMdat!==void 0&&typeof e.onMdat!="function")throw new TypeError("options.onMdat, when provided, must be a function.");if(e.onMoof!==void 0&&typeof e.onMoof!="function")throw new TypeError("options.onMoof, when provided, must be a function.");if(e.metadataFormat!==void 0&&!["mdir","mdta","udta","auto"].includes(e.metadataFormat))throw new TypeError("options.metadataFormat, when provided, must be either 'auto', 'mdir', 'mdta', or 'udta'.");super(),this._options=e}getSupportedTrackCounts(){return{video:{min:0,max:4294967295},audio:{min:0,max:4294967295},subtitle:{min:0,max:4294967295},total:{min:0,max:4294967295}}}get supportsVideoTransformationMetadata(){return!0}get supportsTimestampedMediaData(){return!0}get negativeTimestampSupport(){return"full"}_createMuxer(e){return new _u(e,this)}_isFragmentedIsobmff(){return this._options.fastStart==="fragmented"}},to=class extends eo{constructor(e){super(e)}get _name(){return"MP4"}get fileExtension(){return".mp4"}get mimeType(){return"video/mp4"}getSupportedCodecs(){return[...ki,...au,"pcm-s16","pcm-s16be","pcm-s24","pcm-s24be","pcm-s32","pcm-s32be","pcm-f32","pcm-f32be","pcm-f64","pcm-f64be",...fr]}_codecUnsupportedHint(e){return new js().getSupportedCodecs().includes(e)?" Switching to MOV will grant support for this codec.":""}},$s=class extends eo{constructor(e){super(e)}get _name(){return"CMAF"}get fileExtension(){return".m4s"}get mimeType(){return"video/mp4"}getSupportedCodecs(){return[...ki,...au,"pcm-s16","pcm-s16be","pcm-s24","pcm-s24be","pcm-s32","pcm-s32be","pcm-f32","pcm-f32be","pcm-f64","pcm-f64be",...fr]}},js=class extends eo{constructor(e){super(e)}get _name(){return"MOV"}get fileExtension(){return".mov"}get mimeType(){return"video/quicktime"}getSupportedCodecs(){return[...ki,...Or]}_codecUnsupportedHint(e){return new to().getSupportedCodecs().includes(e)?" Switching to MP4 will grant support for this codec.":""}};var Ng=["video","audio","subtitle"],io=class i{constructor(e,t,n,r,s){this.id=e,this.output=t,this.type=n,this.source=r,this.metadata=s}isVideoTrack(){return this.type==="video"}isAudioTrack(){return this.type==="audio"}isSubtitleTrack(){return this.type==="subtitle"}canBePairedWith(e){if(!(e instanceof i))throw new TypeError("other must be an OutputTrack.");if(this===e)return!1;let t=ru(this.metadata.group),n=ru(e.metadata.group);for(let r of t)if(this.type!==e.type&&n.some(a=>r===a)||n.some(a=>r._pairedGroups.has(a)))return!0;return!1}},xu=class extends io{constructor(e,t,n,r){super(e,t,"video",n,r)}},yu=class extends io{constructor(e,t,n,r){super(e,t,"audio",n,r)}},bu=class extends io{constructor(e,t,n,r){super(e,t,"subtitle",n,r)}},no=class i{constructor(){this._pairedGroups=new Set}pairWith(e){if(!(e instanceof i))throw new TypeError("other must be an OutputTrackGroup.");if(this===e)throw new TypeError("Cannot pair a group with itself.");this._pairedGroups.add(e),e._pairedGroups.add(this)}},Fd=i=>{if(!i||typeof i!="object")throw new TypeError("metadata must be an object.");if(i.languageCode!==void 0&&!dm(i.languageCode))throw new TypeError("metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.");if(i.name!==void 0&&typeof i.name!="string")throw new TypeError("metadata.name, when provided, must be a string.");if(i.disposition!==void 0&&Am(i.disposition),i.maximumPacketCount!==void 0&&(!Number.isInteger(i.maximumPacketCount)||i.maximumPacketCount<0))throw new TypeError("metadata.maximumPacketCount, when provided, must be a non-negative integer.");if(i.bitrate!==void 0&&(!Number.isFinite(i.bitrate)||i.bitrate<0))throw new TypeError("metadata.bitrate, when provided, must be a non-negative number.");if(i.averageBitrate!==void 0&&(!Number.isFinite(i.averageBitrate)||i.averageBitrate<0))throw new TypeError("metadata.averageBitrate, when provided, must be a non-negative number.");if(i.group!==void 0&&!(i.group instanceof no)&&(!Array.isArray(i.group)||i.group.some(e=>!(e instanceof no))))throw new TypeError("metadata.group, when provided, must be an OutputTrackGroup instance or an array of OutputTrackGroup instances.")},Ia=class extends ur{get target(){let e="Output.target cannot be used when using PathedTarget with an async callback. Use the 'target' event instead.";if(this._rootTargetPromise)throw new TypeError(e);let t=this._getRootTarget();if(Ji(t))throw new TypeError(e);return t}constructor(e){if(super(),this.state="pending",this.defaultTrackGroup=new no,this.tracks=[],this._onFinalize=null,this._unfinalizedTargets=new Set,this._rootWriterPromise=null,this._startPromise=null,this._cancelPromise=null,this._finalizePromise=null,this._mutex=new qs,this._metadataTags={},this._rootTarget=null,this._rootTargetPromise=null,this._firstMediaStreamTimestamp=null,!e||typeof e!="object")throw new TypeError("options must be an object.");if(!(e.format instanceof Qs))throw new TypeError("options.format must be an OutputFormat.");if(!(e.target instanceof Ei||e.target instanceof Vr))throw new TypeError("options.target must be a Target or a PathedTarget.");if(e.target instanceof Ei&&this._rememberTarget(e.target),e.initTarget!==void 0&&!(e.initTarget instanceof Ei)&&typeof e.initTarget!="function")throw new Error("options.initTarget, when provided, must be a Target or a function that returns or resolves to a Target.");if(e.onFinalize!==void 0&&typeof e.onFinalize!="function")throw new TypeError("options.onFinalize, when provided, must be a function.");this.format=e.format,this._target=e.target,this._onFinalize=e.onFinalize??null,this._initTarget=e.initTarget??null,this._initTarget instanceof Ei&&this._rememberTarget(this._initTarget),this._muxer=e.format._createMuxer(this)}_getTargetValidated(e){te(this._target instanceof Vr);let t=this._target.getTarget(e),n=r=>{if(!(r instanceof Ei))throw new TypeError("getTarget must return a Target.");return r};return Ji(t)?t.then(n):n(t)}async _getTarget(e){te(this._target instanceof Vr);let t=await this._getTargetValidated(e);return this._emit("target",{target:t,request:e,isRoot:e.isRoot}),this.state==="canceled"?await t._close():this._rememberTarget(t),t}_rememberTarget(e){this._unfinalizedTargets.add(e),e.on("finalized",()=>this._unfinalizedTargets.delete(e),{once:!0})}async _getInitTarget(){if(te(this._initTarget!==null),this._initTarget instanceof Ei)return this._initTarget;let e=await this._initTarget();return this.state==="canceled"?await e._close():this._rememberTarget(e),e}_hasInitTarget(){return this._initTarget!==null}_getRootTarget(){if(this._rootTarget)return this._rootTarget;if(this._rootTargetPromise)return this._rootTargetPromise;if(this._target instanceof Ei)return this._emit("target",{target:this._target,request:null,isRoot:!0}),this._rootTarget=this._target,this._target;let e={path:this._target.rootPath,isRoot:!0,mimeType:this.format.mimeType},t=this._getTargetValidated(e),n=r=>(this.state==="canceled"?r._close():this._rememberTarget(r),this._emit("target",{target:r,request:e,isRoot:!0}),this._rootTarget=r,r);return Ji(t)?this._rootTargetPromise=t.then(n):n(t)}_getRootWriter(e){return this._rootWriterPromise??=(async()=>{let t=await this._getRootTarget(),n=new zr(t,typeof e=="boolean"?e:e(t));return n.start(),n})()}addVideoTrack(e,t={}){if(!(e instanceof Js))throw new TypeError("source must be a VideoSource.");if(Fd(t),t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError(`Invalid video rotation: ${t.rotation}. Has to be 0, 90, 180 or 270.`);if(t.flip!==void 0&&typeof t.flip!="boolean")throw new TypeError("metadata.flip, when provided, must be a boolean.");if(t.transformationMatrix!==void 0&&(!Array.isArray(t.transformationMatrix)||t.transformationMatrix.length!==9||!t.transformationMatrix.every(r=>Number.isFinite(r))))throw new TypeError("metadata.transformationMatrix, when provided, must be an array of 9 finite numbers.");if(t.frameRate!==void 0&&(!Number.isFinite(t.frameRate)||t.frameRate<=0))throw new TypeError(`Invalid video frame rate: ${t.frameRate}. Must be a positive number.`);if(t.hasOnlyKeyPackets!==void 0&&typeof t.hasOnlyKeyPackets!="boolean")throw new TypeError("metadata.hasOnlyKeyPackets, when provided, must be a boolean.");if(t.canBeTransparent!==void 0&&typeof t.canBeTransparent!="boolean")throw new TypeError("metadata.canBeTransparent, when provided, must be a boolean.");if(t.decoderConfig!==void 0&&lu({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof pr))throw new TypeError("metadata.primingPacket, when provided, must be an EncodedPacket.");if(t.decoderConfig===void 0)throw new TypeError("metadata.primingPacket can only be provided alongside metadata.decoderConfig.")}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new xu(this.tracks.length+1,this,e,n))}addAudioTrack(e,t={}){if(!(e instanceof Ca))throw new TypeError("source must be an AudioSource.");if(Fd(t),t.decoderConfig!==void 0&&uu({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof pr))throw new TypeError("metadata.primingPacket, when provided, must be an EncodedPacket.");if(t.decoderConfig===void 0)throw new TypeError("metadata.primingPacket can only be provided alongside metadata.decoderConfig.")}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new yu(this.tracks.length+1,this,e,n))}addSubtitleTrack(e,t={}){if(!(e instanceof Ra))throw new TypeError("source must be a SubtitleSource.");Fd(t);let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new bu(this.tracks.length+1,this,e,n))}setMetadataTags(e){if(wm(e),this.state!=="pending")throw new Error("Cannot set metadata tags after output has been started or canceled.");this._metadataTags=e}_addTrack(e){if(this.state!=="pending")throw new Error("Cannot add track after output has been started or canceled.");if(e.source._connectedTrack)throw new Error("Source is already used for a track.");let t=this.format.getSupportedTrackCounts(),n=this.tracks.reduce((o,a)=>o+(a.type===e.type?1:0),0),r=t[e.type].max;if(n===r)throw new Error(r===0?`${this.format._name} does not support ${e.type} tracks.`:`${this.format._name} does not support more than ${r} ${e.type} track${r===1?"":"s"}.`);let s=t.total.max;if(this.tracks.length===s)throw new Error(`${this.format._name} does not support more than ${s} tracks${s===1?"":"s"} in total.`);if(e.isVideoTrack()){let o=this.format.getSupportedVideoCodecs();if(o.length===0)throw new Error(`${this.format._name} does not support video tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!o.includes(e.source._codec))throw new Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${o.map(a=>`'${a}'`).join(", ")}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isAudioTrack()){let o=this.format.getSupportedAudioCodecs();if(o.length===0)throw new Error(`${this.format._name} does not support audio tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!o.includes(e.source._codec))throw new Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${o.map(a=>`'${a}'`).join(", ")}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isSubtitleTrack()){let o=this.format.getSupportedSubtitleCodecs();if(o.length===0)throw new Error(`${this.format._name} does not support subtitle tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!o.includes(e.source._codec))throw new Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${o.map(a=>`'${a}'`).join(", ")}.`+this.format._codecUnsupportedHint(e.source._codec))}return this.tracks.push(e),e.source._connectedTrack=e,e}hasEnoughTracks(){let e=this.format.getSupportedTrackCounts();for(let n of Ng){let r=this.tracks.reduce((o,a)=>o+(a.type===n?1:0),0),s=e[n].min;if(r<s)return!1}let t=e.total.min;return!(this.tracks.length<t)}async start(){let e=this.format.getSupportedTrackCounts();for(let n of Ng){let r=this.tracks.reduce((o,a)=>o+(a.type===n?1:0),0),s=e[n].min;if(r<s)throw new Error(s===e[n].max?`${this.format._name} requires exactly ${s} ${n} track${s===1?"":"s"}.`:`${this.format._name} requires at least ${s} ${n} track${s===1?"":"s"}.`)}let t=e.total.min;if(this.tracks.length<t)throw new Error(t===e.total.max?`${this.format._name} requires exactly ${t} track${t===1?"":"s"}.`:`${this.format._name} requires at least ${t} track${t===1?"":"s"}.`);if(this.state==="canceled")throw new Error("Output has been canceled.");return this._startPromise?(Xt._warn("Output has already been started."),this._startPromise):this._startPromise=(async()=>{this.state="started";let n=this._mutex.acquire();try{await this._muxer.start();let r=this.tracks.map(s=>s.source._start());await Promise.all(r)}finally{(await n)()}})()}getMimeType(){return this._muxer.getMimeType()}async cancel(){if(this.state==="canceled")return this._cancelPromise??void 0;if(this.state==="finalizing"||this.state==="finalized"){this.state==="finalized"&&Xt._warn("Output has already been finalized.");return}return this._cancelPromise=(async()=>{this.state="canceled";let e=await this._mutex.acquire();try{let t=this.tracks.map(n=>n.source._flushOrWaitForOngoingClose(!0));await Promise.all(t),await Promise.all([...this._unfinalizedTargets].map(n=>n._close())),this._unfinalizedTargets.clear()}finally{e()}})()}async finalize(){if(this.state==="pending")throw new Error("Cannot finalize before starting.");if(this.state==="canceled")throw new Error("Cannot finalize after canceling.");return this._finalizePromise?(Xt._warn("Output has already been finalized."),this._finalizePromise):this._finalizePromise=(async()=>{this.state="finalizing";let e=await this._mutex.acquire();try{let t=this.tracks.map(n=>n.source._flushOrWaitForOngoingClose(!1));if(await Promise.all(t),await this._muxer.finalize(),this._rootWriterPromise){let n=await this._rootWriterPromise;n.finalized||(await n.flush(),await n.finalize())}this._onFinalize&&await this._onFinalize(),this.state="finalized"}catch(t){throw this.state="canceled",t}finally{await Promise.all([...this._unfinalizedTargets].map(t=>t._close().catch(()=>{}))),this._unfinalizedTargets.clear(),e()}})()}};var kg=Symbol.for("mediabunny loaded");globalThis[kg]&&Xt._error(`[WARNING]
Mediabunny was loaded twice. This will likely cause Mediabunny not to work correctly. Check if multiple dependencies are importing different versions of Mediabunny, or if something is being bundled incorrectly.`);globalThis[kg]=!0;async function zg(i,e,t,n,r){let s=Xr(i),o=t==="16:9"?1280:720,a=t==="16:9"?720:1280;if(!await _d("avc",{width:o,height:a,bitrate:5e6}))throw new Error("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301H.264\u7F16\u7801\uFF0C\u8BF7\u7528\u65B0\u7248Edge\u6216Chrome\u6253\u5F00\u6B64\u9875\u9762");let c=jl(void 0,!0);c.resize(o,a),c.applyView(e,!0);let l=new Ia({format:new to,target:new Fn}),u=new Ta(c.renderer.domElement,{codec:"avc",bitrate:5e6});l.addVideoTrack(u,{frameRate:24});try{await l.start();let d=Math.round(s.duration*24);for(let h=0;h<d;h++){if(r.aborted)throw new Error("\u5DF2\u53D6\u6D88\u89C6\u9891\u5BFC\u51FA");c.update(s,h/24,"left-wheel",!1),await u.add(h/24,1/24),n((h+1)/d),h%6===0&&await new Promise(f=>setTimeout(f,0))}if(await l.finalize(),!l.target.buffer)throw new Error("\u7F16\u7801\u5668\u672A\u8FD4\u56DE\u89C6\u9891");return new Blob([l.target.buffer],{type:"video/mp4"})}catch(d){throw await l.cancel(),d}finally{u.close(),c.dispose()}}var ht=i=>{let e=document.getElementById(i);if(!e)throw new Error(`\u7F3A\u5C11\u9875\u9762\u5143\u7D20\uFF1A${i}`);return e},Qe=i=>ht(i),Un=i=>ht(i),Gg="ruoyi-firework-puppets-v1",ct=Au(),Yt=0,_i=!0,Pa="left-wheel",ro=!1,vu,Vg,Od=ht("status"),wu=ht("viewport");try{let i=localStorage.getItem(Gg);i&&(ct=Xr(JSON.parse(i)))}catch{Od.textContent="\u65E7\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u5DF2\u6062\u590D\u9ED8\u8BA4\u7F16\u6392"}var Jt=()=>ct.layers.find(i=>i.id===Pa);function Dn(i,e=!1){Od.textContent=i,Od.classList.toggle("error",e)}function On(){clearTimeout(Vg),Vg=window.setTimeout(()=>{try{localStorage.setItem(Gg,JSON.stringify(ct))}catch{Dn("\u5F53\u524D\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u672C\u5730\u914D\u7F6E\uFF0C\u8BF7\u4F7F\u7528\u5BFC\u51FA\u914D\u7F6E")}},200)}var Nd=new Map;function Wg(i,e,t){let n=Nd.get(t);n&&URL.revokeObjectURL(n);let r=URL.createObjectURL(i),s=ht(t);Nd.set(t,r),s.href=r,s.download=e,s.hidden=!1,s.click(),t==="download-video"&&(ht("export-review").hidden=!1,ht("export-preview").src=r)}var Hr=jl(wu),qg=new ResizeObserver(()=>{let i=wu.getBoundingClientRect();i.width&&i.height&&Hr.resize(i.width,i.height,!0)});qg.observe(wu);Un("layer").innerHTML=ei.map(i=>`<option value="${i.id}">${i.name}</option>`).join("");function Hi(){Un("layer").value=Pa,Qe("rpm").value=String(Math.abs(Jt().rpm)),Un("direction").value=Jt().rpm<0?"-1":"1",Qe("enabled").checked=Jt().enabled,Qe("sparks").checked=Jt().sparks,Qe("start").value=String(Jt().start),Qe("end").value=String(Jt().end),Qe("phase").value=String(Jt().phase),Qe("duration").value=String(ct.duration),Qe("speed").value=String(ct.speed),Qe("density").value=String(ct.density),Qe("gravity").value=String(ct.gravity),Qe("wind").value=String(ct.wind),Qe("smoke").checked=ct.smoke,Qe("color").value=ct.color,Qe("timeline").max=Qe("time").max=String(ct.duration),ht("speed-value").textContent=`${ct.speed.toFixed(1)}\xD7`,ht("density-value").textContent=`${Math.round(ct.density*100)}%`,ht("layer-axis").textContent=ei.find(i=>i.id===Pa).axis==="y"?"\u7ED5\u7AD6\u76F4\u8F74\u65CB\u8F6C\uFF0C\u4E3B\u7AFF\u4FDD\u6301\u56FA\u5B9A":"\u7ED5\u6B63\u9762\u8F74\u65CB\u8F6C\uFF0C\u706B\u82B1\u6CBF\u8F6E\u7F18\u626B\u51FA",ht("play").textContent=_i?"\u6682\u505C\u9884\u6F14":"\u7EE7\u7EED\u64AD\u653E",ht("state").textContent=_i?"\u6B63\u5728\u9884\u6F14":"\u5DF2\u6682\u505C"}Un("layer").addEventListener("change",()=>{Pa=Un("layer").value,Hi()});for(let i of["rpm","start","end","phase"])Qe(i).addEventListener("input",()=>{let e=Number(Qe(i).value);Number.isFinite(e)&&(i==="rpm"&&(Jt().rpm=Pi(e,0,45)*Number(Un("direction").value)),i==="start"&&(Jt().start=Pi(e,0,Jt().end-.2)),i==="end"&&(Jt().end=Pi(e,Jt().start+.2,ct.duration)),i==="phase"&&(Jt().phase=Pi(e,-360,360)),On())});Un("direction").addEventListener("change",()=>{Jt().rpm=Math.abs(Jt().rpm)*Number(Un("direction").value),On()});for(let i of["enabled","sparks"])Qe(i).addEventListener("change",()=>{Jt()[i==="enabled"?"enabled":"sparks"]=Qe(i).checked,On()});for(let[i,e,t,n]of[["speed","speed",0,2],["density","density",0,2],["gravity","gravity",1,12],["wind","wind",-1,1]])Qe(i).addEventListener("input",()=>{ct[e]=Pi(Number(Qe(i).value),t,n),ht("speed-value").textContent=`${ct.speed.toFixed(1)}\xD7`,ht("density-value").textContent=`${Math.round(ct.density*100)}%`,On()});Qe("smoke").addEventListener("change",()=>{ct.smoke=Qe("smoke").checked,On()});Qe("color").addEventListener("input",()=>{ct.color=Qe("color").value,On()});function zd(i){ct.duration=Pi(i||15,6,30);for(let e of ct.layers)e.end=Math.min(e.end,ct.duration),e.start=Math.min(e.start,e.end-.2);Yt=Math.min(Yt,ct.duration),Qe("timeline").max=Qe("time").max=String(ct.duration),On()}Qe("duration").addEventListener("input",()=>{let i=Number(Qe("duration").value);Number.isFinite(i)&&i>=6&&i<=30&&zd(i)});Qe("duration").addEventListener("change",()=>{zd(Number(Qe("duration").value)),Hi()});for(let i of["timeline","time"])Qe(i).addEventListener("input",()=>{Yt=Pi(Number(Qe(i).value),0,ct.duration),_i=!1,Hi()});ht("play").addEventListener("click",()=>{Yt>=ct.duration&&(Yt=0),_i=!_i,Hi()});ht("restart").addEventListener("click",()=>{Yt=0,_i=!0,Hi()});ht("peak").addEventListener("click",()=>{Yt=Math.min(8,ct.duration*.6),_i=!1,Hi(),wu.scrollIntoView({block:"center",behavior:"smooth"})});ht("fit").addEventListener("click",()=>Hr.fit());ht("default").addEventListener("click",()=>{ct=Au(),Yt=0,_i=!0,Hi(),On(),Hr.fit(),Dn("\u5DF2\u6062\u590D\u9ED8\u8BA4\u7684\u5206\u5C42\u71C3\u653E\u7F16\u6392")});ht("save").addEventListener("click",()=>{Wg(new Blob([JSON.stringify(ct,null,2)],{type:"application/json"}),"\u836F\u53D1\u6728\u5076-\u65CB\u8F6C\u9884\u6F14\u914D\u7F6E.json","download-config"),Dn("\u914D\u7F6E\u5DF2\u751F\u6210\uFF1B\u82E5\u672A\u81EA\u52A8\u4E0B\u8F7D\uFF0C\u53EF\u70B9\u51FB\u4E0B\u65B9\u7684\u914D\u7F6E\u4E0B\u8F7D\u94FE\u63A5")});ht("load").addEventListener("click",()=>Qe("file").click());Qe("file").addEventListener("change",async()=>{let i=Qe("file").files?.[0];if(i)try{if(i.size>65536)throw new Error("\u914D\u7F6E\u6587\u4EF6\u4E0D\u80FD\u8D85\u8FC764KB");ct=Xr(JSON.parse(await i.text())),Yt=0,_i=!1,Hi(),On(),Dn("\u5DF2\u5BFC\u5165\u914D\u7F6E\uFF0C\u70B9\u51FB\u7EE7\u7EED\u64AD\u653E\u67E5\u770B")}catch(e){Dn(e instanceof Error?e.message:"\u914D\u7F6E\u5BFC\u5165\u5931\u8D25",!0)}finally{Qe("file").value=""}});ht("export").addEventListener("click",async()=>{if(ro)return;zd(Number(Qe("duration").value)),ro=!0,_i=!1,Hi(),vu=new AbortController,ht("export").disabled=!0,ht("cancel").hidden=!1,ht("export-progress").hidden=!1;let i=Xr(ct);try{let e=await zg(i,Hr.view(),Un("aspect").value,t=>{ht("export-progress").value=t,Dn(`\u6B63\u5728\u9010\u5E27\u5BFC\u51FA ${Math.round(t*100)}%`)},vu.signal);Wg(e,`\u836F\u53D1\u6728\u5076-\u65CB\u8F6C\u9884\u6F14-${i.duration}\u79D2.mp4`,"download-video"),Dn("MP4\u5DF2\u751F\u6210\uFF1A720p\u300124fps\u3001\u65E0\u58F0\u3002\u82E5\u672A\u81EA\u52A8\u4E0B\u8F7D\uFF0C\u53EF\u70B9\u51FB\u4E0B\u65B9\u7684\u89C6\u9891\u4E0B\u8F7D\u94FE\u63A5")}catch(e){Dn(e instanceof Error?e.message:"\u5BFC\u51FA\u5931\u8D25",!0)}finally{ro=!1,ht("export").disabled=!1,ht("cancel").hidden=!0,ht("export-progress").hidden=!0}});ht("cancel").addEventListener("click",()=>vu?.abort());window.addEventListener("keydown",i=>{i.code==="Space"&&i.target instanceof Element&&!i.target.matches("input,select,textarea,button")&&(i.preventDefault(),_i=!_i,Hi())});var kd=performance.now(),Dd=kd,Ud=0,Vd=0,Hg=0;function Xg(i){let e=Pi((i-kd)/1e3,0,.06);if(kd=i,_i&&!ro&&(Yt+=e,Yt>=ct.duration&&(Qe("loop").checked?Yt%=ct.duration:(Yt=ct.duration,_i=!1,Hi()))),ro||(Hg=Hr.update(ct,Yt,Pa,Qe("guides").checked),Ud++),i-Dd>140){Qe("timeline").value=String(Yt),document.activeElement!==Qe("time")&&(Qe("time").value=Yt.toFixed(2));let t=Yr(Jt(),Yt,ct.speed)*180/Math.PI;ht("angle").textContent=`${t.toFixed(0)}\xB0`,ht("turns").textContent=`${(t/360).toFixed(2)} \u5708`,ht("particles").textContent=Hg.toLocaleString(),ht("clock").textContent=`${Yt.toFixed(1)} / ${ct.duration} s`;let n=Hr.renderer.info;ht("performance").textContent=ro?"\u9884\u6F14\u5DF2\u6682\u505C\uFF0C\u6B63\u5728\u5BFC\u51FA\u89C6\u9891":`${Math.round(Ud*1e3/(i-Dd))} fps \xB7 ${n.render.calls} draws \xB7 ${n.render.triangles.toLocaleString()} triangles`,Ud=0,Dd=i}Vd=requestAnimationFrame(Xg)}Hi();Dn("\u62D6\u52A8\u89C2\u5BDF\u89C6\u89D2\uFF1B\u9009\u62E9\u8F6E\u67B6\u540E\u53EF\u8C03\u6574\u8F6C\u901F\u3001\u65B9\u5411\u548C\u542F\u52A8\u65F6\u95F4\u3002");Vd=requestAnimationFrame(Xg);window.addEventListener("pagehide",()=>{cancelAnimationFrame(Vd),vu?.abort(),qg.disconnect(),Nd.forEach(i=>URL.revokeObjectURL(i)),Hr.dispose()},{once:!0});})();
/*! For license information please see app.js.LEGAL.txt */
