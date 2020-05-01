function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function _createClass(n,t,e){return t&&_defineProperties(n.prototype,t),e&&_defineProperties(n,e),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{Yj9t:function(n,t,e){"use strict";e.r(t),e.d(t,"AuthModule",(function(){return q}));var i=e("ofXK"),a=e("hctd"),r=e("3Pt+"),o=e("fXoL"),c=e("qXBG"),s=e("tyNb"),u=e("Wp6s"),l=e("Xa2L"),b=e("kmnG"),m=e("qFsG"),f=e("bTqV");function p(n,t){1&n&&o.Ob(0,"mat-spinner")}function d(n,t){1&n&&(o.Sb(0,"mat-error"),o.xc(1,"Enter a valid email"),o.Rb())}function g(n,t){1&n&&(o.Sb(0,"mat-error"),o.xc(1,"Enter a valid password"),o.Rb())}function v(n,t){1&n&&(o.Sb(0,"button",9),o.xc(1," Login "),o.Rb())}function h(n,t){if(1&n){var e=o.Tb();o.Sb(0,"form",2,3),o.ac("submit",(function(){o.pc(e);var n=o.nc(1);return o.ec().onLogin(n)})),o.Sb(2,"mat-form-field"),o.Ob(3,"input",4,5),o.vc(5,d,2,0,"mat-error",0),o.Rb(),o.Sb(6,"mat-form-field"),o.Ob(7,"input",6,7),o.vc(9,g,2,0,"mat-error",0),o.Rb(),o.vc(10,v,2,0,"button",8),o.Sb(11,"mat-error"),o.xc(12),o.Rb(),o.Rb()}if(2&n){var i=o.nc(4),a=o.nc(8),r=o.ec();o.Bb(5),o.jc("ngIf",i.invalid),o.Bb(4),o.jc("ngIf",a.invalid),o.Bb(1),o.jc("ngIf",!r.isLoading),o.Bb(2),o.yc(r.error)}}var y,S=((y=function(){function n(t,e){_classCallCheck(this,n),this.authService=t,this.router=e,this.isLoading=!1}return _createClass(n,[{key:"ngOnInit",value:function(){var n=this;this.authService$=this.authService.getAuthStatusListener().subscribe((function(t){console.log(t),n.isLoading=!1}))}},{key:"onLogin",value:function(n){this.isLoading=!0,this.authService.login(n.value.email,n.value.password)}},{key:"ngOnDestroy",value:function(){this.authService$.unsubscribe()}}]),n}()).\u0275fac=function(n){return new(n||y)(o.Nb(c.a),o.Nb(s.b))},y.\u0275cmp=o.Hb({type:y,selectors:[["app-login"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["loginForm","ngForm"],["matInput","","type","email","name","email","ngModel","","placeholder","email@email.com","required","","email",""],["emailInput","ngModel"],["matInput","","type","password","name","password","ngModel","","placeholder","Password","required",""],["passwordInput","ngModel"],["mat-flat-button","","color","primary","type","submit",4,"ngIf"],["mat-flat-button","","color","primary","type","submit"]],template:function(n,t){1&n&&(o.vc(0,p,1,0,"mat-spinner",0),o.Sb(1,"mat-card"),o.vc(2,h,13,4,"form",1),o.Rb()),2&n&&(o.jc("ngIf",t.isLoading),o.Bb(2),o.jc("ngIf",!t.isLoading))},directives:[i.k,u.a,l.b,r.p,r.j,r.k,b.c,m.a,r.a,r.i,r.l,r.n,r.b,b.b,f.b],styles:["mat-card[_ngcontent-%COMP%]{margin:1rem auto auto}mat-card[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}mat-card[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{width:100%;border:1px solid purple;border-radius:2px;margin-bottom:1rem}mat-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{display:block;width:100%}mat-card[_ngcontent-%COMP%]   mat-divider[_ngcontent-%COMP%]{margin:1rem}mat-spinner[_ngcontent-%COMP%]{margin:auto}"]}),y);function w(n,t){1&n&&o.Ob(0,"mat-spinner")}function I(n,t){1&n&&(o.Sb(0,"mat-error"),o.xc(1,"Enter a valid email"),o.Rb())}function C(n,t){1&n&&(o.Sb(0,"mat-error"),o.xc(1,"Enter a valid password"),o.Rb())}function O(n,t){1&n&&(o.Sb(0,"button",9),o.xc(1," Sign Up "),o.Rb())}function L(n,t){1&n&&o.Ob(0,"mat-spinner")}function _(n,t){if(1&n){var e=o.Tb();o.Sb(0,"form",2,3),o.ac("submit",(function(){o.pc(e);var n=o.nc(1);return o.ec().onSignUp(n)})),o.Sb(2,"mat-form-field"),o.Ob(3,"input",4,5),o.vc(5,I,2,0,"mat-error",0),o.Rb(),o.Sb(6,"mat-form-field"),o.Ob(7,"input",6,7),o.vc(9,C,2,0,"mat-error",0),o.Rb(),o.vc(10,O,2,0,"button",8),o.vc(11,L,1,0,"mat-spinner",0),o.Sb(12,"mat-error"),o.xc(13),o.Rb(),o.Rb()}if(2&n){var i=o.nc(4),a=o.nc(8),r=o.ec();o.Bb(5),o.jc("ngIf",i.invalid),o.Bb(4),o.jc("ngIf",a.invalid),o.Bb(1),o.jc("ngIf",!r.isLoading),o.Bb(1),o.jc("ngIf",r.isLoading),o.Bb(2),o.yc(r.error)}}var k,M,P,j=((k=function(){function n(t,e){_classCallCheck(this,n),this.authService=t,this.router=e,this.isLoading=!1}return _createClass(n,[{key:"ngOnInit",value:function(){var n=this;this.authService$=this.authService.getAuthStatusListener().subscribe((function(t){console.log(t),n.isLoading=!1}))}},{key:"onSignUp",value:function(n){n.invalid||(this.isLoading=!0,this.authService.createUser(n.value.email,n.value.password))}},{key:"ngOnDestroy",value:function(){this.authService$.unsubscribe(),this.isLoading=!1}}]),n}()).\u0275fac=function(n){return new(n||k)(o.Nb(c.a),o.Nb(s.b))},k.\u0275cmp=o.Hb({type:k,selectors:[["app-signup"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["signUpForm","ngForm"],["matInput","","type","email","name","email","ngModel","","placeholder","email@email.com","required","","email",""],["emailInput","ngModel"],["matInput","","type","password","name","password","ngModel","","placeholder","Password","required",""],["passwordInput","ngModel"],["mat-flat-button","","color","primary","type","submit",4,"ngIf"],["mat-flat-button","","color","primary","type","submit"]],template:function(n,t){1&n&&(o.Sb(0,"mat-card"),o.vc(1,w,1,0,"mat-spinner",0),o.vc(2,_,14,5,"form",1),o.Rb()),2&n&&(o.Bb(1),o.jc("ngIf",t.isLoading),o.Bb(1),o.jc("ngIf",!t.isLoading))},directives:[u.a,i.k,l.b,r.p,r.j,r.k,b.c,m.a,r.a,r.i,r.l,r.n,r.b,b.b,f.b],styles:["input[_ngcontent-%COMP%]{display:block;width:100%}"]}),k),R=e("P+IX"),B=[{path:"login",component:S},{path:"signUp",component:j}],x=((P=function n(){_classCallCheck(this,n)}).\u0275mod=o.Lb({type:P}),P.\u0275inj=o.Kb({factory:function(n){return new(n||P)},providers:[R.a],imports:[[s.f.forChild(B)],s.f]}),P),q=((M=function n(){_classCallCheck(this,n)}).\u0275mod=o.Lb({type:M}),M.\u0275inj=o.Kb({factory:function(n){return new(n||M)},imports:[[i.c,x,a.a,r.g]]}),M)}}]);