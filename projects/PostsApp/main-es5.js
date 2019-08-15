(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n\n<router-outlet></router-outlet>\n\n\n<!--  -->\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pagenotfound/pagenotfound.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pagenotfound/pagenotfound.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrap d-flex flex-row align-items-center\">\n    <div class=\"container\">\n        <div class=\"row justify-content-center\">\n            <div class=\"col-md-12 text-center\">\n                <span class=\"display-1 d-block\">404</span>\n                <div class=\"mb-4 lead\">The page you are looking for was not found.</div>\n                <a href=\"/\" class=\"btn btn-link\">Back to Home</a>\n            </div>\n        </div>\n    </div>\n</div>\n    "

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/postdetail/postdetail.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/postdetail/postdetail.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <a href=\"/\" class=\"btn btn-outline-primary mt-5\">Back To Home</a>\n    <hr>\n    <div class=\"row\">\n        <div class=\" mx-auto col-6\">\n            <div class=\"card my-3 shadow-sm\">\n                <div class=\"card-img-top bg-secondary text-white d-flex align-items-center justify-content-center\" alt=\"...\" style=\"height: 150px;\">\n                    <h6>Fake img {{postItem.id}}</h6> \n                </div>\n                <div class=\"card-body\">\n                    <h5 class=\"card-title text-muted\">{{postItem.title}}</h5>\n                    <p class=\"card-text\">{{postItem.body}}</p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/postslist-item/postslist-item.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/postslist-item/postslist-item.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card my-3 shadow-sm\">\n    <div class=\"card-img-top bg-secondary text-white d-flex align-items-center justify-content-center\" alt=\"...\" style=\"height: 150px;\">\n        <h6>Fake img {{postItem.id}}</h6> \n    </div>\n    <div class=\"card-body\">\n        <h5 class=\"card-title text-muted\">{{postItem.title}}</h5>\n        <a href='/posts/{{postItem.id}}' class=\"btn btn-primary\">Read more</a>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/postslist/postslist.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/postslist/postslist.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <h1>Posts List</h1>        \n    <hr>\n  <div class=\"row\">\n    <app-postslist-item \n      *ngFor=\"let post of postsArr\"  \n      [postItem]=\"post\" \n      [ngClass]=\"['col-lg-4 mx-auto']\"\n    ></app-postslist-item>\n  </div>\n  <hr>\n  <div class=\"my-5\">\n    <button type=\"button\" \n    class=\"btn btn-outline-info mx-auto d-flex\"\n    (click)=\"loadMorePosts()\" >Load More...</button>\n  </div>\n</div>\n\n  \n\n\n\n"

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _postslist_postslist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./postslist/postslist.component */ "./src/app/postslist/postslist.component.ts");
/* harmony import */ var _postdetail_postdetail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./postdetail/postdetail.component */ "./src/app/postdetail/postdetail.component.ts");
/* harmony import */ var _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pagenotfound/pagenotfound.component */ "./src/app/pagenotfound/pagenotfound.component.ts");






var routes = [
    {
        path: "",
        component: _postslist_postslist_component__WEBPACK_IMPORTED_MODULE_3__["PostslistComponent"]
    },
    {
        path: "posts/:id",
        component: _postdetail_postdetail_component__WEBPACK_IMPORTED_MODULE_4__["PostdetailComponent"]
    },
    {
        path: "**",
        component: _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_5__["PagenotfoundComponent"]
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'PostsApp';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _postdetail_postdetail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./postdetail/postdetail.component */ "./src/app/postdetail/postdetail.component.ts");
/* harmony import */ var _postslist_postslist_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./postslist/postslist.component */ "./src/app/postslist/postslist.component.ts");
/* harmony import */ var _postslist_item_postslist_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./postslist-item/postslist-item.component */ "./src/app/postslist-item/postslist-item.component.ts");
/* harmony import */ var _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pagenotfound/pagenotfound.component */ "./src/app/pagenotfound/pagenotfound.component.ts");









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _postdetail_postdetail_component__WEBPACK_IMPORTED_MODULE_5__["PostdetailComponent"],
                _postslist_postslist_component__WEBPACK_IMPORTED_MODULE_6__["PostslistComponent"],
                _postslist_item_postslist_item_component__WEBPACK_IMPORTED_MODULE_7__["PostslistItemComponent"],
                _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_8__["PagenotfoundComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/pagenotfound/pagenotfound.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/pagenotfound/pagenotfound.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2Vub3Rmb3VuZC9wYWdlbm90Zm91bmQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pagenotfound/pagenotfound.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pagenotfound/pagenotfound.component.ts ***!
  \********************************************************/
/*! exports provided: PagenotfoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagenotfoundComponent", function() { return PagenotfoundComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PagenotfoundComponent = /** @class */ (function () {
    function PagenotfoundComponent() {
    }
    PagenotfoundComponent.prototype.ngOnInit = function () {
    };
    PagenotfoundComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-pagenotfound',
            template: __webpack_require__(/*! raw-loader!./pagenotfound.component.html */ "./node_modules/raw-loader/index.js!./src/app/pagenotfound/pagenotfound.component.html"),
            styles: [__webpack_require__(/*! ./pagenotfound.component.scss */ "./src/app/pagenotfound/pagenotfound.component.scss")]
        })
    ], PagenotfoundComponent);
    return PagenotfoundComponent;
}());



/***/ }),

/***/ "./src/app/postdetail/postdetail.component.scss":
/*!******************************************************!*\
  !*** ./src/app/postdetail/postdetail.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Bvc3RkZXRhaWwvcG9zdGRldGFpbC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/postdetail/postdetail.component.ts":
/*!****************************************************!*\
  !*** ./src/app/postdetail/postdetail.component.ts ***!
  \****************************************************/
/*! exports provided: PostdetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostdetailComponent", function() { return PostdetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var PostdetailComponent = /** @class */ (function () {
    function PostdetailComponent(route) {
        var _this = this;
        this.route = route;
        this.route.params.subscribe(function (params) {
            _this.postItem = fetch("https://jsonplaceholder.typicode.com/posts/" + params.id)
                .then(function (r) { return r.json(); })
                .then(function (post) {
                _this.postItem = post;
            });
        });
    }
    PostdetailComponent.prototype.ngOnInit = function () {
    };
    PostdetailComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
    ]; };
    PostdetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-postdetail',
            template: __webpack_require__(/*! raw-loader!./postdetail.component.html */ "./node_modules/raw-loader/index.js!./src/app/postdetail/postdetail.component.html"),
            styles: [__webpack_require__(/*! ./postdetail.component.scss */ "./src/app/postdetail/postdetail.component.scss")]
        })
    ], PostdetailComponent);
    return PostdetailComponent;
}());



/***/ }),

/***/ "./src/app/postslist-item/postslist-item.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/postslist-item/postslist-item.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Bvc3RzbGlzdC1pdGVtL3Bvc3RzbGlzdC1pdGVtLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/postslist-item/postslist-item.component.ts":
/*!************************************************************!*\
  !*** ./src/app/postslist-item/postslist-item.component.ts ***!
  \************************************************************/
/*! exports provided: PostslistItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostslistItemComponent", function() { return PostslistItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PostslistItemComponent = /** @class */ (function () {
    function PostslistItemComponent() {
    }
    PostslistItemComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
    ], PostslistItemComponent.prototype, "postItem", void 0);
    PostslistItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-postslist-item',
            template: __webpack_require__(/*! raw-loader!./postslist-item.component.html */ "./node_modules/raw-loader/index.js!./src/app/postslist-item/postslist-item.component.html"),
            styles: [__webpack_require__(/*! ./postslist-item.component.scss */ "./src/app/postslist-item/postslist-item.component.scss")]
        })
    ], PostslistItemComponent);
    return PostslistItemComponent;
}());



/***/ }),

/***/ "./src/app/postslist/postslist.component.scss":
/*!****************************************************!*\
  !*** ./src/app/postslist/postslist.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Bvc3RzbGlzdC9wb3N0c2xpc3QuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/postslist/postslist.component.ts":
/*!**************************************************!*\
  !*** ./src/app/postslist/postslist.component.ts ***!
  \**************************************************/
/*! exports provided: PostslistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostslistComponent", function() { return PostslistComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_posts_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/posts.service */ "./src/app/services/posts.service.ts");




var PostslistComponent = /** @class */ (function () {
    function PostslistComponent(route, PostsService) {
        var _this = this;
        this.route = route;
        this.PostsService = PostsService;
        this.postQueryOffset = 0;
        this.PostsService.getPosts({ limit: 10, start: this.postQueryOffset }).then(function (post) {
            _this.postQueryOffset += 10;
            _this.postsArr = post;
        });
    }
    PostslistComponent.prototype.loadMorePosts = function () {
        var _this = this;
        this.PostsService.getPosts({ limit: 10, start: this.postQueryOffset }).then(function (posts) {
            _this.postQueryOffset += 10;
            posts.forEach(function (p) {
                _this.postsArr.push(p);
            });
        });
    };
    PostslistComponent.prototype.ngOnInit = function () {
        console.log(this.postsArr);
    };
    PostslistComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _services_posts_service__WEBPACK_IMPORTED_MODULE_3__["PostsService"] }
    ]; };
    PostslistComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-postslist',
            template: __webpack_require__(/*! raw-loader!./postslist.component.html */ "./node_modules/raw-loader/index.js!./src/app/postslist/postslist.component.html"),
            styles: [__webpack_require__(/*! ./postslist.component.scss */ "./src/app/postslist/postslist.component.scss")]
        })
    ], PostslistComponent);
    return PostslistComponent;
}());



/***/ }),

/***/ "./src/app/services/posts.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/posts.service.ts ***!
  \*******************************************/
/*! exports provided: PostsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostsService", function() { return PostsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PostsService = /** @class */ (function () {
    function PostsService() {
    }
    PostsService.prototype.getPosts = function (params) {
        return fetch("https://jsonplaceholder.typicode.com/posts?_limit=" + params.limit + "&_start=" + params.start)
            .then(function (r) { return r.json(); })
            .then(function (posts) { return posts.map(function (post) {
            return post;
        }); });
    };
    PostsService.prototype.getPost = function (id) {
        return fetch("https://jsonplaceholder.typicode.com/posts/" + id)
            .then(function (response) { return response.json(); })
            .then(function (post) {
            return post;
        });
    };
    PostsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], PostsService);
    return PostsService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Work\zzharuk\Angular\PostsApp\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es5.js.map