function _classCallCheck(l,n){if(!(l instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(l,n){for(var u=0;u<n.length;u++){var e=n[u];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(l,e.key,e)}}function _createClass(l,n,u){return n&&_defineProperties(l.prototype,n),u&&_defineProperties(l,u),l}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"/xOU":function(l,n,u){"use strict";u.d(n,"a",(function(){return e}));var e=function(){function l(n){_classCallCheck(this,l),this.translate=n,this.hideBreadcrumbs=!1,this.translate.addLangs(["english","hindi"]),this.translate.setDefaultLang("english"),this.translate.use(this.translate.currentLang)}return _createClass(l,[{key:"ngOnInit",value:function(){}}]),l}()},"3cPq":function(l,n,u){"use strict";u("XIQj"),u("Y7bu")},"8JG/":function(l,n,u){"use strict";u.d(n,"a",(function(){return i})),u.d(n,"b",(function(){return r}));var e=u("8Y7J"),t=u("TSSN"),a=u("SVse"),i=(u("/xOU"),e.Db({encapsulation:0,styles:[[".language[_ngcontent-%COMP%]{align-items:end;text-align:end;align-content:end;margin-top:20px;float:right}"]],data:{}}));function o(l){return e.hc(0,[(l()(),e.Fb(0,0,null,null,1,"option",[],[[8,"value",0]],null,null,null,null)),(l()(),e.ec(1,null,["",""]))],null,(function(l,n){l(n,0,0,n.context.$implicit),l(n,1,0,n.context.$implicit)}))}function r(l){return e.hc(2,[(l()(),e.Fb(0,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.Fb(1,0,null,null,2,"div",[["class","col"]],null,null,null,null,null)),(l()(),e.Fb(2,0,null,null,1,"h1",[["class","mt-4"]],null,null,null,null,null)),(l()(),e.ec(3,null,["",""])),(l()(),e.Fb(4,0,null,null,7,"div",[["class","col language"]],null,null,null,null,null)),(l()(),e.Fb(5,0,null,null,6,"label",[["for",""]],null,null,null,null,null)),(l()(),e.Fb(6,0,null,null,2,"h6",[],null,null,null,null,null)),(l()(),e.ec(7,null,["",""])),e.Wb(131072,t.j,[t.k,e.i]),(l()(),e.Fb(9,0,[["langselect",1]],null,2,"select",[["class","custom-select"]],null,[[null,"change"]],(function(l,n,u){var t=!0;return"change"===n&&(t=!1!==l.component.translate.use(e.Ub(l,9).value)&&t),t}),null,null)),(l()(),e.ob(16777216,null,null,1,null,o)),e.Eb(11,278528,null,0,a.l,[e.W,e.T,e.w],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){l(n,11,0,n.component.translate.getLangs())}),(function(l,n){l(n,3,0,n.component.title),l(n,7,0,e.fc(n,7,0,e.Ub(n,8).transform("Common.Select")))}))}},G7wM:function(l,n,u){"use strict";u.d(n,"a",(function(){return e})),u("KAIG");var e=function(){function l(n){_classCallCheck(this,l),this.navigationService=n}return _createClass(l,[{key:"ngOnInit",value:function(){}},{key:"toggleSideNav",value:function(){this.navigationService.toggleSideNav()}}]),l}()},KAIG:function(l,n,u){"use strict";u("U7kj")},LEap:function(l,n,u){"use strict";u.d(n,"a",(function(){return t})),u.d(n,"b",(function(){return a}));var e=u("8Y7J"),t=(u("i0k7"),e.Db({encapsulation:0,styles:[[""]],data:{}}));function a(l){return e.hc(2,[(l()(),e.Fb(0,0,null,null,9,"footer",[["class","py-4 bg-light mt-auto"]],null,null,null,null,null)),(l()(),e.Fb(1,0,null,null,8,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),e.Fb(2,0,null,null,7,"div",[["class","d-flex align-items-center justify-content-between small"]],null,null,null,null,null)),(l()(),e.Fb(3,0,null,null,1,"div",[["class","text-muted"]],null,null,null,null,null)),(l()(),e.ec(-1,null,["Copyright \xa9 Your Website 2019"])),(l()(),e.Fb(5,0,null,null,4,"div",[],null,null,null,null,null)),(l()(),e.Fb(6,0,null,null,1,"a",[["href","#"]],null,null,null,null,null)),(l()(),e.ec(-1,null,["Privacy Policy \xb7"])),(l()(),e.Fb(8,0,null,null,1,"a",[["href","#"]],null,null,null,null,null)),(l()(),e.ec(-1,null,["Terms & Conditions"]))],null,null)}},U7kj:function(l,n,u){"use strict";u.d(n,"a",(function(){return t}));var e=u("2Vo4"),t=function(){function l(n,u){_classCallCheck(this,l),this.route=n,this.router=u,this._sideNavVisible$=new e.a(!0)}return _createClass(l,[{key:"sideNavVisible$",value:function(){return this._sideNavVisible$}},{key:"toggleSideNav",value:function(l){this._sideNavVisible$.next(void 0!==l?l:!this._sideNavVisible$.value)}}]),l}()},f9eq:function(l,n,u){"use strict";u.d(n,"a",(function(){return k})),u.d(n,"b",(function(){return p}));var e=u("8Y7J"),t=u("SVse"),a=u("wY7g"),i=u("G7wM"),o=u("U7kj"),r=u("TSSN"),c=u("iInd"),s=u("fNgX"),d=u("Nv++"),b=u("cUpR"),v=u("LEap"),f=u("i0k7"),k=(u("s1pc"),u("Y7bu"),e.Db({encapsulation:0,styles:[[""]],data:{}}));function g(l){return e.hc(0,[(l()(),e.Fb(0,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),e.ec(1,null,[""," ",""]))],null,(function(l,n){l(n,1,0,n.context.ngIf.firstName,n.context.ngIf.lastName)}))}function p(l){return e.hc(2,[(l()(),e.Fb(0,0,null,null,131,"span",[],null,null,null,null,null)),e.Eb(1,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{ngClass:[0,"ngClass"]},null),e.Xb(2,{"sb-nav-fixed":0}),(l()(),e.Fb(3,0,null,null,1,"sb-top-nav",[],null,null,null,a.b,a.a)),e.Eb(4,114688,null,0,i.a,[o.a],null,null),(l()(),e.Fb(5,0,null,null,126,"div",[["id","layoutSidenav"]],null,null,null,null,null)),(l()(),e.Fb(6,0,null,null,119,"div",[["id","layoutSidenav_nav"]],null,null,null,null,null)),(l()(),e.Fb(7,0,null,null,118,"nav",[["class","sb-sidenav accordion"],["id","sidenavAccordion"]],null,null,null,null,null)),e.Eb(8,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),e.Fb(9,0,null,null,109,"div",[["class","sb-sidenav-menu"]],null,null,null,null,null)),(l()(),e.Fb(10,0,null,null,108,"div",[["class","nav"]],null,null,null,null,null)),(l()(),e.Fb(11,0,null,null,15,"div",[],null,null,null,null,null)),(l()(),e.Fb(12,0,null,null,2,"div",[["class","sb-sidenav-menu-heading"]],null,null,null,null,null)),(l()(),e.ec(13,null,["",""])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(15,0,null,null,11,"div",[],null,null,null,null,null)),(l()(),e.Fb(16,0,null,null,10,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,19).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(17,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(18,{active:0,collapsed:1}),e.Eb(19,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(20,1),(l()(),e.Fb(21,0,null,null,3,"div",[["class","sb-nav-link-icon"]],null,null,null,null,null)),(l()(),e.Fb(22,0,null,null,2,"fa-icon",[["class","ng-fa-icon"]],[[1,"title",0],[8,"innerHTML",1]],null,null,s.d,s.c)),e.Eb(23,573440,null,0,d.c,[b.b,d.a,d.d,[2,d.i]],{icon:[0,"icon"]},null),e.Vb(24,2),(l()(),e.ec(25,null,[""," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(27,0,null,null,91,"div",[],null,null,null,null,null)),(l()(),e.Fb(28,0,null,null,2,"div",[["class","sb-sidenav-menu-heading"]],null,null,null,null,null)),(l()(),e.ec(29,null,["",""])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(31,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e.Fb(32,0,null,null,6,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,35).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(33,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(34,{active:0,collapsed:1}),e.Eb(35,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(36,1),(l()(),e.ec(37,null,[" "," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(39,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e.Fb(40,0,null,null,6,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,43).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(41,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(42,{active:0,collapsed:1}),e.Eb(43,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(44,1),(l()(),e.ec(45,null,[" "," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(47,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e.Fb(48,0,null,null,6,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,51).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(49,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(50,{active:0,collapsed:1}),e.Eb(51,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(52,1),(l()(),e.ec(53,null,[" "," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(55,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e.Fb(56,0,null,null,6,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,59).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(57,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(58,{active:0,collapsed:1}),e.Eb(59,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(60,1),(l()(),e.ec(61,null,[" "," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(63,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e.Fb(64,0,null,null,6,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,67).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(65,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(66,{active:0,collapsed:1}),e.Eb(67,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(68,1),(l()(),e.ec(69,null,[" "," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(71,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e.Fb(72,0,null,null,6,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,75).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(73,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(74,{active:0,collapsed:1}),e.Eb(75,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(76,1),(l()(),e.ec(77,null,[" "," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(79,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e.Fb(80,0,null,null,6,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,83).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(81,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(82,{active:0,collapsed:1}),e.Eb(83,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(84,1),(l()(),e.ec(85,null,[" "," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(87,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e.Fb(88,0,null,null,6,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,91).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(89,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(90,{active:0,collapsed:1}),e.Eb(91,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(92,1),(l()(),e.ec(93,null,[" "," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(95,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e.Fb(96,0,null,null,6,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,99).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(97,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(98,{active:0,collapsed:1}),e.Eb(99,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(100,1),(l()(),e.ec(101,null,[" "," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(103,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e.Fb(104,0,null,null,6,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,107).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(105,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(106,{active:0,collapsed:1}),e.Eb(107,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(108,1),(l()(),e.ec(109,null,[" "," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(111,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e.Fb(112,0,null,null,6,"a",[["class","nav-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0,a=l.component;return"click"===n&&(t=!1!==e.Ub(l,115).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),"click"===n&&(t=0!=(a.expanded=!a.expanded)&&t),t}),null,null)),e.Eb(113,278528,null,0,t.k,[e.w,e.x,e.o,e.L],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Xb(114,{active:0,collapsed:1}),e.Eb(115,671744,null,0,c.n,[c.l,c.a,t.j],{routerLink:[0,"routerLink"]},null),e.Vb(116,1),(l()(),e.ec(117,null,[" "," "])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.Fb(119,0,null,null,6,"div",[["class","sb-sidenav-footer"]],null,null,null,null,null)),(l()(),e.Fb(120,0,null,null,2,"div",[["class","small"]],null,null,null,null,null)),(l()(),e.ec(121,null,["",""])),e.Wb(131072,r.j,[r.k,e.i]),(l()(),e.ob(16777216,null,null,2,null,g)),e.Eb(124,16384,null,0,t.m,[e.W,e.T],{ngIf:[0,"ngIf"]},null),e.Wb(131072,t.b,[e.i]),(l()(),e.Fb(126,0,null,null,5,"div",[["id","layoutSidenav_content"]],null,null,null,null,null)),(l()(),e.Fb(127,0,null,null,2,"main",[],null,null,null,null,null)),(l()(),e.Fb(128,0,null,null,1,"div",[["class","container-fluid"]],null,null,null,null,null)),e.Tb(null,0),(l()(),e.Fb(130,0,null,null,1,"sb-footer",[],null,null,null,v.b,v.a)),e.Eb(131,114688,null,0,f.a,[],null,null)],(function(l,n){var u=n.component,t=l(n,2,0,!u.static);l(n,1,0,t),l(n,4,0),l(n,8,0,"sb-sidenav accordion",u.sidenavStyle);var a=l(n,18,0,u.isActive,!u.expanded);l(n,17,0,"nav-link",a);var i=l(n,20,0,"/dashboard");l(n,19,0,i);var o=l(n,24,0,"fas","tachometer-alt");l(n,23,0,o);var r=l(n,34,0,u.isActive,!u.expanded);l(n,33,0,"nav-link",r);var c=l(n,36,0,"/excel-table");l(n,35,0,c);var s=l(n,42,0,u.isActive,!u.expanded);l(n,41,0,"nav-link",s);var d=l(n,44,0,"/generate-emi");l(n,43,0,d);var b=l(n,50,0,u.isActive,!u.expanded);l(n,49,0,"nav-link",b);var v=l(n,52,0,"/loan-entry");l(n,51,0,v);var f=l(n,58,0,u.isActive,!u.expanded);l(n,57,0,"nav-link",f);var k=l(n,60,0,"/loan-foreclosure");l(n,59,0,k);var g=l(n,66,0,u.isActive,!u.expanded);l(n,65,0,"nav-link",g);var p=l(n,68,0,"/credit-entry");l(n,67,0,p);var h=l(n,74,0,u.isActive,!u.expanded);l(n,73,0,"nav-link",h);var m=l(n,76,0,"/debit-entry");l(n,75,0,m);var y=l(n,82,0,u.isActive,!u.expanded);l(n,81,0,"nav-link",y);var w=l(n,84,0,"/expense");l(n,83,0,w);var U=l(n,90,0,u.isActive,!u.expanded);l(n,89,0,"nav-link",U);var C=l(n,92,0,"/generate-statement");l(n,91,0,C);var F=l(n,98,0,u.isActive,!u.expanded);l(n,97,0,"nav-link",F);var x=l(n,100,0,"/fy-dividend-calculate");l(n,99,0,x);var L=l(n,106,0,u.isActive,!u.expanded);l(n,105,0,"nav-link",L);var K=l(n,108,0,"/close-account");l(n,107,0,K);var E=l(n,114,0,u.isActive,!u.expanded);l(n,113,0,"nav-link",E);var _=l(n,116,0,"/upload-all");l(n,115,0,_),l(n,124,0,e.fc(n,124,0,e.Ub(n,125).transform(u.userService.user$))),l(n,131,0)}),(function(l,n){l(n,13,0,e.fc(n,13,0,e.Ub(n,14).transform("Common.SideNav.Heading1"))),l(n,16,0,e.Ub(n,19).target,e.Ub(n,19).href),l(n,22,0,e.Ub(n,23).title,e.Ub(n,23).renderedIconHTML),l(n,25,0,e.fc(n,25,0,e.Ub(n,26).transform("Common.Title"))),l(n,29,0,e.fc(n,29,0,e.Ub(n,30).transform("Common.SideNav.Heading2"))),l(n,32,0,e.Ub(n,35).target,e.Ub(n,35).href),l(n,37,0,e.fc(n,37,0,e.Ub(n,38).transform("Accountant.Pages.Sheet"))),l(n,40,0,e.Ub(n,43).target,e.Ub(n,43).href),l(n,45,0,e.fc(n,45,0,e.Ub(n,46).transform("Accountant.Pages.Generate"))),l(n,48,0,e.Ub(n,51).target,e.Ub(n,51).href),l(n,53,0,e.fc(n,53,0,e.Ub(n,54).transform("Accountant.Pages.Entry"))),l(n,56,0,e.Ub(n,59).target,e.Ub(n,59).href),l(n,61,0,e.fc(n,61,0,e.Ub(n,62).transform("Accountant.Pages.Foreclosure"))),l(n,64,0,e.Ub(n,67).target,e.Ub(n,67).href),l(n,69,0,e.fc(n,69,0,e.Ub(n,70).transform("Accountant.Pages.Credit"))),l(n,72,0,e.Ub(n,75).target,e.Ub(n,75).href),l(n,77,0,e.fc(n,77,0,e.Ub(n,78).transform("Accountant.Pages.Debit"))),l(n,80,0,e.Ub(n,83).target,e.Ub(n,83).href),l(n,85,0,e.fc(n,85,0,e.Ub(n,86).transform("Accountant.Pages.Deduction"))),l(n,88,0,e.Ub(n,91).target,e.Ub(n,91).href),l(n,93,0,e.fc(n,93,0,e.Ub(n,94).transform("Accountant.Pages.GenerateStatement"))),l(n,96,0,e.Ub(n,99).target,e.Ub(n,99).href),l(n,101,0,e.fc(n,101,0,e.Ub(n,102).transform("Accountant.Pages.Calculate"))),l(n,104,0,e.Ub(n,107).target,e.Ub(n,107).href),l(n,109,0,e.fc(n,109,0,e.Ub(n,110).transform("Accountant.Pages.Closure"))),l(n,112,0,e.Ub(n,115).target,e.Ub(n,115).href),l(n,117,0,e.fc(n,117,0,e.Ub(n,118).transform("Accountant.Pages.Upload"))),l(n,121,0,e.fc(n,121,0,e.Ub(n,122).transform("Common.User.LoggedIn")))}))}},i0k7:function(l,n,u){"use strict";u.d(n,"a",(function(){return e}));var e=function(){function l(){_classCallCheck(this,l)}return _createClass(l,[{key:"ngOnInit",value:function(){}}]),l}()},s1pc:function(l,n,u){"use strict";u.d(n,"a",(function(){return t})),u("KAIG");var e=u("quSY");u("3cPq");var t=function(){function l(n,u,t){_classCallCheck(this,l),this.navigationService=n,this.changeDetectorRef=u,this.userService=t,this.static=!1,this.light=!1,this.expanded=!1,this.sideNavHidden=!1,this.subscription=new e.a,this.sidenavStyle="sb-sidenav-dark"}return _createClass(l,[{key:"ngOnInit",value:function(){var l=this;this.light&&(this.sidenavStyle="sb-sidenav-light"),this.subscription.add(this.navigationService.sideNavVisible$().subscribe((function(n){l.sideNavHidden=!n,l.changeDetectorRef.markForCheck()})))}},{key:"ngOnDestroy",value:function(){this.subscription.unsubscribe()}}]),l}()},sO0u:function(l,n,u){"use strict";u.d(n,"a",(function(){return e}));var e=function l(){_classCallCheck(this,l)}},wY7g:function(l,n,u){"use strict";u.d(n,"a",(function(){return g})),u.d(n,"b",(function(){return p}));var e=u("8Y7J"),t=u("G0yt"),a=u("TSSN"),i=u("fNgX"),o=u("Nv++"),r=u("cUpR"),c=u("SVse"),s=u("iInd");u("3cPq");var d=function(){function l(n,u){_classCallCheck(this,l),this.userService=n,this.translate=u,this.url=""}return _createClass(l,[{key:"onSelectFile",value:function(l){var n=this;if(l.target.files&&l.target.files[0]){var u=new FileReader;u.readAsDataURL(l.target.files[0]),u.onload=function(l){null!=l.target&&(n.url=l.target.result)}}}},{key:"ngOnInit",value:function(){}}]),l}(),b=u("Y7bu"),v=e.Db({encapsulation:0,styles:[["#userDropdown[_ngcontent-%COMP%]{cursor:pointer}img[_ngcontent-%COMP%]{height:100%;width:100%;border-radius:50%}.hoverable[_ngcontent-%COMP%]{position:relative;display:block;cursor:pointer;height:50px;width:50px;border:2px solid #fff;border-radius:50%;margin-top:10px;margin-left:5px}.hoverable[_ngcontent-%COMP%]   .hover-text[_ngcontent-%COMP%]{position:absolute;display:none;font-size:10px;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2}.hoverable[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]{position:absolute;display:none;top:0;left:0;bottom:0;right:0;background-color:hsla(0,0%,100%,.5);pointer-events:none;border-radius:50%;z-index:1}.hoverable[_ngcontent-%COMP%]:hover   .background[_ngcontent-%COMP%], .hoverable[_ngcontent-%COMP%]:hover   .hover-text[_ngcontent-%COMP%]{display:block}#fileInput[_ngcontent-%COMP%]{display:none}"]],data:{}});function f(l){return e.hc(0,[(l()(),e.Fb(0,0,null,null,28,"li",[["class","nav-item dropdown dropdown-user no-caret"],["display","dynamic"],["ngbDropdown",""],["placement","bottom-right"]],[[2,"show",null]],null,null,null,null)),e.Eb(1,1720320,null,3,t.t,[e.i,t.v,c.d,e.E,e.o,e.L,[2,t.G]],{placement:[0,"placement"],display:[1,"display"]},null),e.ac(603979776,1,{_menu:0}),e.ac(603979776,2,{_menuElement:0}),e.ac(603979776,3,{_anchor:0}),(l()(),e.Fb(5,0,null,null,2,"a",[["aria-expanded","false"],["aria-haspopup","true"],["class","nav-link dropdown-toggle dropdown-toggle"],["data-cy","userMenu"],["id","userDropdown"],["ngbDropdownToggle",""],["role","button"]],[[1,"aria-expanded",0]],[[null,"click"],[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e.Ub(l,6).dropdown.toggle()&&t),"keydown.ArrowUp"===n&&(t=!1!==e.Ub(l,6).dropdown.onKeyDown(u)&&t),"keydown.ArrowDown"===n&&(t=!1!==e.Ub(l,6).dropdown.onKeyDown(u)&&t),"keydown.Home"===n&&(t=!1!==e.Ub(l,6).dropdown.onKeyDown(u)&&t),"keydown.End"===n&&(t=!1!==e.Ub(l,6).dropdown.onKeyDown(u)&&t),t}),null,null)),e.Eb(6,16384,null,0,t.y,[t.t,e.o],null,null),e.Zb(2048,[[3,4]],t.u,null,[t.y]),(l()(),e.Fb(8,0,[[2,0]],null,20,"div",[["aria-labelledby","dropdownUser"],["class","dropdown-menu dropdown-menu-right"],["ngbDropdownMenu",""]],[[2,"dropdown-menu",null],[2,"show",null],[1,"x-placement",0]],[[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"],[null,"keydown.Enter"],[null,"keydown.Space"]],(function(l,n,u){var t=!0;return"keydown.ArrowUp"===n&&(t=!1!==e.Ub(l,9).dropdown.onKeyDown(u)&&t),"keydown.ArrowDown"===n&&(t=!1!==e.Ub(l,9).dropdown.onKeyDown(u)&&t),"keydown.Home"===n&&(t=!1!==e.Ub(l,9).dropdown.onKeyDown(u)&&t),"keydown.End"===n&&(t=!1!==e.Ub(l,9).dropdown.onKeyDown(u)&&t),"keydown.Enter"===n&&(t=!1!==e.Ub(l,9).dropdown.onKeyDown(u)&&t),"keydown.Space"===n&&(t=!1!==e.Ub(l,9).dropdown.onKeyDown(u)&&t),t}),null,null)),e.Eb(9,16384,[[1,4]],1,t.w,[t.t],null,null),e.ac(603979776,4,{menuItems:1}),(l()(),e.Fb(11,0,null,null,7,"h6",[["class","dropdown-header"]],null,null,null,null,null)),(l()(),e.Fb(12,0,null,null,6,"div",[["class","dropdown-user-details"]],null,null,null,null,null)),(l()(),e.Fb(13,0,null,null,1,"div",[["class","dropdown-user-details-name"]],null,null,null,null,null)),(l()(),e.ec(14,null,[""," ",""])),(l()(),e.Fb(15,0,null,null,1,"div",[["class","dropdown-user-details-name"]],null,null,null,null,null)),(l()(),e.ec(16,null,["",""])),(l()(),e.Fb(17,0,null,null,1,"div",[["class","dropdown-user-details-email"]],null,null,null,null,null)),(l()(),e.ec(18,null,["",""])),(l()(),e.Fb(19,0,null,null,0,"div",[["class","dropdown-divider"]],null,null,null,null,null)),(l()(),e.Fb(20,0,null,null,3,"a",[["class","dropdown-item"],["routerLink","#"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e.Ub(l,21).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t}),null,null)),e.Eb(21,671744,null,0,s.n,[s.l,s.a,c.j],{routerLink:[0,"routerLink"]},null),(l()(),e.ec(22,null,["",""])),e.Wb(131072,a.j,[a.k,e.i]),(l()(),e.Fb(24,0,null,null,0,"div",[["class","dropdown-divider"]],null,null,null,null,null)),(l()(),e.Fb(25,0,null,null,3,"a",[["class","dropdown-item"],["routerLink","/login"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e.Ub(l,26).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t}),null,null)),e.Eb(26,671744,null,0,s.n,[s.l,s.a,c.j],{routerLink:[0,"routerLink"]},null),(l()(),e.ec(27,null,["",""])),e.Wb(131072,a.j,[a.k,e.i])],(function(l,n){l(n,1,0,"bottom-right","dynamic"),l(n,21,0,"#"),l(n,26,0,"/login")}),(function(l,n){l(n,0,0,e.Ub(n,1).isOpen()),l(n,5,0,e.Ub(n,6).dropdown.isOpen()),l(n,8,0,!0,e.Ub(n,9).dropdown.isOpen(),e.Ub(n,9).placement),l(n,14,0,n.context.ngIf.firstName,n.context.ngIf.lastName),l(n,16,0,n.context.ngIf.companyName),l(n,18,0,n.context.ngIf.email),l(n,20,0,e.Ub(n,21).target,e.Ub(n,21).href),l(n,22,0,e.fc(n,22,0,e.Ub(n,23).transform("Common.User.Settings"))),l(n,25,0,e.Ub(n,26).target,e.Ub(n,26).href),l(n,27,0,e.fc(n,27,0,e.Ub(n,28).transform("Common.User.Logout")))}))}function k(l){return e.hc(2,[(l()(),e.Fb(0,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.Fb(1,0,null,null,6,"div",[],null,null,null,null,null)),(l()(),e.Fb(2,0,null,null,4,"label",[["class","hoverable"],["for","fileInput"]],null,null,null,null,null)),(l()(),e.Fb(3,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),e.Fb(4,0,null,null,1,"div",[["class","hover-text"]],null,null,null,null,null)),(l()(),e.ec(-1,null,["Choose file"])),(l()(),e.Fb(6,0,null,null,0,"div",[["class","background"]],null,null,null,null,null)),(l()(),e.Fb(7,0,null,null,0,"input",[["id","fileInput"],["type","file"]],null,[[null,"change"]],(function(l,n,u){var e=!0;return"change"===n&&(e=!1!==l.component.onSelectFile(u)&&e),e}),null,null)),(l()(),e.Fb(8,0,null,null,3,"div",[["style","margin-top: 20px"]],null,null,null,null,null)),(l()(),e.ob(16777216,null,null,2,null,f)),e.Eb(10,16384,null,0,c.m,[e.W,e.T],{ngIf:[0,"ngIf"]},null),e.Wb(131072,c.b,[e.i])],(function(l,n){var u=n.component;l(n,10,0,e.fc(n,10,0,e.Ub(n,11).transform(u.userService.user$)))}),(function(l,n){var u=n.component;l(n,3,0,u.url?u.url:"https://www.w3schools.com/howto/img_avatar.png")}))}u("G7wM"),u("U7kj");var g=e.Db({encapsulation:0,styles:[[""]],data:{}});function p(l){return e.hc(2,[(l()(),e.Fb(0,0,null,null,11,"nav",[["class","sb-topnav navbar navbar-expand navbar-dark bg-dark"]],null,null,null,null,null)),e.Eb(1,16384,null,0,t.G,[],null,null),(l()(),e.Fb(2,0,null,null,2,"p",[["class","navbar-brand"]],null,null,null,null,null)),(l()(),e.ec(3,null,["",""])),e.Wb(131072,a.j,[a.k,e.i]),(l()(),e.Fb(5,0,null,null,3,"button",[["class","btn btn-link btn-sm order-1 order-lg-0"],["data-cy","topNavToggleSideNav"],["id","sidebarToggle"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.toggleSideNav()&&e),e}),null,null)),(l()(),e.Fb(6,0,null,null,2,"fa-icon",[["class","ng-fa-icon"]],[[1,"title",0],[8,"innerHTML",1]],null,null,i.d,i.c)),e.Eb(7,573440,null,0,o.c,[r.b,o.a,o.d,[2,o.i]],{icon:[0,"icon"]},null),e.Vb(8,2),(l()(),e.Fb(9,0,null,null,2,"ul",[["class","navbar-nav ml-auto mr-0 mr-md-2 my-2 my-md-0"],["style","float:right"]],null,null,null,null,null)),(l()(),e.Fb(10,0,null,null,1,"sb-top-nav-user",[],null,null,null,k,v)),e.Eb(11,114688,null,0,d,[b.a,a.k],null,null)],(function(l,n){var u=l(n,8,0,"fas","bars");l(n,7,0,u),l(n,11,0)}),(function(l,n){l(n,3,0,e.fc(n,3,0,e.Ub(n,4).transform("Common.Title"))),l(n,6,0,e.Ub(n,7).title,e.Ub(n,7).renderedIconHTML)}))}}}]);