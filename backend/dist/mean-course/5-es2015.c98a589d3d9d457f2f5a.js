(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{Yj9t:function(t,n,i){"use strict";i.r(n),i.d(n,"AuthModule",(function(){return C}));var e=i("ofXK"),r=i("hctd"),a=i("3Pt+"),o=i("fXoL"),c=i("qXBG"),s=i("tyNb"),b=i("Wp6s"),m=i("Xa2L"),u=i("kmnG"),l=i("qFsG"),d=i("bTqV");function p(t,n){1&t&&o.Ob(0,"mat-spinner")}function g(t,n){1&t&&(o.Sb(0,"mat-error"),o.xc(1,"Enter a valid email"),o.Rb())}function f(t,n){1&t&&(o.Sb(0,"mat-error"),o.xc(1,"Enter a valid password"),o.Rb())}function h(t,n){1&t&&(o.Sb(0,"button",9),o.xc(1," Login "),o.Rb())}function v(t,n){if(1&t){const t=o.Tb();o.Sb(0,"form",2,3),o.ac("submit",(function(){o.pc(t);const n=o.nc(1);return o.ec().onLogin(n)})),o.Sb(2,"mat-form-field"),o.Ob(3,"input",4,5),o.vc(5,g,2,0,"mat-error",0),o.Rb(),o.Sb(6,"mat-form-field"),o.Ob(7,"input",6,7),o.vc(9,f,2,0,"mat-error",0),o.Rb(),o.vc(10,h,2,0,"button",8),o.Sb(11,"mat-error"),o.xc(12),o.Rb(),o.Rb()}if(2&t){const t=o.nc(4),n=o.nc(8),i=o.ec();o.Bb(5),o.jc("ngIf",t.invalid),o.Bb(4),o.jc("ngIf",n.invalid),o.Bb(1),o.jc("ngIf",!i.isLoading),o.Bb(2),o.yc(i.error)}}let S=(()=>{class t{constructor(t,n){this.authService=t,this.router=n,this.isLoading=!1}ngOnInit(){this.authService$=this.authService.getAuthStatusListener().subscribe(t=>{console.log(t),this.isLoading=!1})}onLogin(t){this.isLoading=!0,this.authService.login(t.value.email,t.value.password)}ngOnDestroy(){this.authService$.unsubscribe()}}return t.\u0275fac=function(n){return new(n||t)(o.Nb(c.a),o.Nb(s.b))},t.\u0275cmp=o.Hb({type:t,selectors:[["app-login"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["loginForm","ngForm"],["matInput","","type","email","name","email","ngModel","","placeholder","email@email.com","required","","email",""],["emailInput","ngModel"],["matInput","","type","password","name","password","ngModel","","placeholder","Password","required",""],["passwordInput","ngModel"],["mat-flat-button","","color","primary","type","submit",4,"ngIf"],["mat-flat-button","","color","primary","type","submit"]],template:function(t,n){1&t&&(o.vc(0,p,1,0,"mat-spinner",0),o.Sb(1,"mat-card"),o.vc(2,v,13,4,"form",1),o.Rb()),2&t&&(o.jc("ngIf",n.isLoading),o.Bb(2),o.jc("ngIf",!n.isLoading))},directives:[e.k,b.a,m.b,a.p,a.j,a.k,u.c,l.a,a.a,a.i,a.l,a.n,a.b,u.b,d.b],styles:["mat-card[_ngcontent-%COMP%]{margin:1rem auto auto}mat-card[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}mat-card[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{width:100%;border:1px solid purple;border-radius:2px;margin-bottom:1rem}mat-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{display:block;width:100%}mat-card[_ngcontent-%COMP%]   mat-divider[_ngcontent-%COMP%]{margin:1rem}mat-spinner[_ngcontent-%COMP%]{margin:auto}"]}),t})();function I(t,n){1&t&&o.Ob(0,"mat-spinner")}function y(t,n){1&t&&(o.Sb(0,"mat-error"),o.xc(1,"Enter a valid email"),o.Rb())}function w(t,n){1&t&&(o.Sb(0,"mat-error"),o.xc(1,"Enter a valid password"),o.Rb())}function L(t,n){1&t&&(o.Sb(0,"button",9),o.xc(1," Sign Up "),o.Rb())}function O(t,n){1&t&&o.Ob(0,"mat-spinner")}function M(t,n){if(1&t){const t=o.Tb();o.Sb(0,"form",2,3),o.ac("submit",(function(){o.pc(t);const n=o.nc(1);return o.ec().onSignUp(n)})),o.Sb(2,"mat-form-field"),o.Ob(3,"input",4,5),o.vc(5,y,2,0,"mat-error",0),o.Rb(),o.Sb(6,"mat-form-field"),o.Ob(7,"input",6,7),o.vc(9,w,2,0,"mat-error",0),o.Rb(),o.vc(10,L,2,0,"button",8),o.vc(11,O,1,0,"mat-spinner",0),o.Sb(12,"mat-error"),o.xc(13),o.Rb(),o.Rb()}if(2&t){const t=o.nc(4),n=o.nc(8),i=o.ec();o.Bb(5),o.jc("ngIf",t.invalid),o.Bb(4),o.jc("ngIf",n.invalid),o.Bb(1),o.jc("ngIf",!i.isLoading),o.Bb(1),o.jc("ngIf",i.isLoading),o.Bb(2),o.yc(i.error)}}let j=(()=>{class t{constructor(t,n){this.authService=t,this.router=n,this.isLoading=!1}ngOnInit(){this.authService$=this.authService.getAuthStatusListener().subscribe(t=>{console.log(t),this.isLoading=!1})}onSignUp(t){t.invalid||(this.isLoading=!0,this.authService.createUser(t.value.email,t.value.password))}ngOnDestroy(){this.authService$.unsubscribe(),this.isLoading=!1}}return t.\u0275fac=function(n){return new(n||t)(o.Nb(c.a),o.Nb(s.b))},t.\u0275cmp=o.Hb({type:t,selectors:[["app-signup"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["signUpForm","ngForm"],["matInput","","type","email","name","email","ngModel","","placeholder","email@email.com","required","","email",""],["emailInput","ngModel"],["matInput","","type","password","name","password","ngModel","","placeholder","Password","required",""],["passwordInput","ngModel"],["mat-flat-button","","color","primary","type","submit",4,"ngIf"],["mat-flat-button","","color","primary","type","submit"]],template:function(t,n){1&t&&(o.Sb(0,"mat-card"),o.vc(1,I,1,0,"mat-spinner",0),o.vc(2,M,14,5,"form",1),o.Rb()),2&t&&(o.Bb(1),o.jc("ngIf",n.isLoading),o.Bb(1),o.jc("ngIf",!n.isLoading))},directives:[b.a,e.k,m.b,a.p,a.j,a.k,u.c,l.a,a.a,a.i,a.l,a.n,a.b,u.b,d.b],styles:["input[_ngcontent-%COMP%]{display:block;width:100%}"]}),t})();var P=i("P+IX");const R=[{path:"login",component:S},{path:"signUp",component:j}];let B=(()=>{class t{}return t.\u0275mod=o.Lb({type:t}),t.\u0275inj=o.Kb({factory:function(n){return new(n||t)},providers:[P.a],imports:[[s.f.forChild(R)],s.f]}),t})(),C=(()=>{class t{}return t.\u0275mod=o.Lb({type:t}),t.\u0275inj=o.Kb({factory:function(n){return new(n||t)},imports:[[e.c,B,r.a,a.g]]}),t})()}}]);