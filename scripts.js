/*
 angular-file-upload v2.5.0
 https://github.com/nervgh/angular-file-upload
 */

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["angular-file-upload"]=t():e["angular-file-upload"]=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var r=n(1),i=o(r),s=n(2),a=o(s),u=n(3),l=o(u),p=n(4),c=o(p),f=n(5),d=o(f),h=n(6),y=o(h),v=n(7),m=o(v),_=n(8),g=o(_),b=n(9),F=o(b),O=n(10),C=o(O),w=n(11),A=o(w),I=n(12),T=o(I),U=n(13),x=o(U);angular.module(i["default"].name,[]).value("fileUploaderOptions",a["default"]).factory("FileUploader",l["default"]).factory("FileLikeObject",c["default"]).factory("FileItem",d["default"]).factory("FileDirective",y["default"]).factory("FileSelect",m["default"]).factory("FileDrop",F["default"]).factory("FileOver",C["default"]).factory("Pipeline",g["default"]).directive("nvFileSelect",A["default"]).directive("nvFileDrop",T["default"]).directive("nvFileOver",x["default"]).run(["FileUploader","FileLikeObject","FileItem","FileDirective","FileSelect","FileDrop","FileOver","Pipeline",function(e,t,n,o,r,i,s,a){e.FileLikeObject=t,e.FileItem=n,e.FileDirective=o,e.FileSelect=r,e.FileDrop=i,e.FileOver=s,e.Pipeline=a}])},function(e,t){e.exports={name:"angularFileUpload"}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={url:"/",alias:"file",headers:{},queue:[],progress:0,autoUpload:!1,removeAfterUpload:!1,method:"POST",filters:[],formData:[],queueLimit:Number.MAX_VALUE,withCredentials:!1,disableMultipart:!1}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t,n,o,i,a,u,g){var b=o.File,F=o.FormData,O=function(){function o(t){r(this,o);var n=p(e);c(this,n,t,{isUploading:!1,_nextIndex:0,_directives:{select:[],drop:[],over:[]}}),this.filters.unshift({name:"queueLimit",fn:this._queueLimitFilter}),this.filters.unshift({name:"folder",fn:this._folderFilter})}return o.prototype.addToQueue=function(e,t,n){var o=this,r=this.isArrayLikeObject(e)?Array.prototype.slice.call(e):[e],i=this._getFilters(n),l=this.queue.length,p=[],c=function d(){var e=r.shift();if(m(e))return f();var n=o.isFile(e)?e:new a(e),l=o._convertFiltersToPipes(i),c=new g(l),h=function(e){var t=e.pipe.originalFilter,n=s(e.args,2),r=n[0],i=n[1];o._onWhenAddingFileFailed(r,t,i),d()},y=function(e,t){var n=new u(o,e,t);p.push(n),o.queue.push(n),o._onAfterAddingFile(n),d()};c.onThrown=h,c.onSuccessful=y,c.exec(n,t)},f=function(){o.queue.length!==l&&(o._onAfterAddingAll(p),o.progress=o._getTotalProgress()),o._render(),o.autoUpload&&o.uploadAll()};c()},o.prototype.removeFromQueue=function(e){var t=this.getIndexOfItem(e),n=this.queue[t];n.isUploading&&n.cancel(),this.queue.splice(t,1),n._destroy(),this.progress=this._getTotalProgress()},o.prototype.clearQueue=function(){for(;this.queue.length;)this.queue[0].remove();this.progress=0},o.prototype.uploadItem=function(e){var t=this.getIndexOfItem(e),n=this.queue[t],o=this.isHTML5?"_xhrTransport":"_iframeTransport";n._prepareToUploading(),this.isUploading||(this._onBeforeUploadItem(n),n.isCancel||(n.isUploading=!0,this.isUploading=!0,this[o](n),this._render()))},o.prototype.cancelItem=function(e){var t=this,n=this.getIndexOfItem(e),o=this.queue[n],r=this.isHTML5?"_xhr":"_form";o&&(o.isCancel=!0,o.isUploading?o[r].abort():!function(){var e=[void 0,0,{}],n=function(){t._onCancelItem.apply(t,[o].concat(e)),t._onCompleteItem.apply(t,[o].concat(e))};i(n)}())},o.prototype.uploadAll=function(){var e=this.getNotUploadedItems().filter(function(e){return!e.isUploading});e.length&&(f(e,function(e){return e._prepareToUploading()}),e[0].upload())},o.prototype.cancelAll=function(){var e=this.getNotUploadedItems();f(e,function(e){return e.cancel()})},o.prototype.isFile=function(e){return this.constructor.isFile(e)},o.prototype.isFileLikeObject=function(e){return this.constructor.isFileLikeObject(e)},o.prototype.isArrayLikeObject=function(e){return this.constructor.isArrayLikeObject(e)},o.prototype.getIndexOfItem=function(e){return h(e)?e:this.queue.indexOf(e)},o.prototype.getNotUploadedItems=function(){return this.queue.filter(function(e){return!e.isUploaded})},o.prototype.getReadyItems=function(){return this.queue.filter(function(e){return e.isReady&&!e.isUploading}).sort(function(e,t){return e.index-t.index})},o.prototype.destroy=function(){var e=this;f(this._directives,function(t){f(e._directives[t],function(e){e.destroy()})})},o.prototype.onAfterAddingAll=function(e){},o.prototype.onAfterAddingFile=function(e){},o.prototype.onWhenAddingFileFailed=function(e,t,n){},o.prototype.onBeforeUploadItem=function(e){},o.prototype.onProgressItem=function(e,t){},o.prototype.onProgressAll=function(e){},o.prototype.onSuccessItem=function(e,t,n,o){},o.prototype.onErrorItem=function(e,t,n,o){},o.prototype.onCancelItem=function(e,t,n,o){},o.prototype.onCompleteItem=function(e,t,n,o){},o.prototype.onCompleteAll=function(){},o.prototype._getTotalProgress=function(e){if(this.removeAfterUpload)return e||0;var t=this.getNotUploadedItems().length,n=t?this.queue.length-t:this.queue.length,o=100/this.queue.length,r=(e||0)*o/100;return Math.round(n*o+r)},o.prototype._getFilters=function(e){if(!e)return this.filters;if(v(e))return e;var t=e.match(/[^\s,]+/g);return this.filters.filter(function(e){return-1!==t.indexOf(e.name)})},o.prototype._convertFiltersToPipes=function(e){var t=this;return e.map(function(e){var n=l(t,e.fn);return n.isAsync=3===e.fn.length,n.originalFilter=e,n})},o.prototype._render=function(){t.$$phase||t.$apply()},o.prototype._folderFilter=function(e){return!(!e.size&&!e.type)},o.prototype._queueLimitFilter=function(){return this.queue.length<this.queueLimit},o.prototype._isSuccessCode=function(e){return e>=200&&300>e||304===e},o.prototype._transformResponse=function(e,t){var o=this._headersGetter(t);return f(n.defaults.transformResponse,function(t){e=t(e,o)}),e},o.prototype._parseHeaders=function(e){var t,n,o,r={};return e?(f(e.split("\n"),function(e){o=e.indexOf(":"),t=e.slice(0,o).trim().toLowerCase(),n=e.slice(o+1).trim(),t&&(r[t]=r[t]?r[t]+", "+n:n)}),r):r},o.prototype._headersGetter=function(e){return function(t){return t?e[t.toLowerCase()]||null:e}},o.prototype._xhrTransport=function(e){var t,n=this,o=e._xhr=new XMLHttpRequest;if(e.disableMultipart?t=e._file:(t=new F,f(e.formData,function(e){f(e,function(e,n){t.append(n,e)})}),t.append(e.alias,e._file,e.file.name)),"number"!=typeof e._file.size)throw new TypeError("The file specified is no longer valid");o.upload.onprogress=function(t){var o=Math.round(t.lengthComputable?100*t.loaded/t.total:0);n._onProgressItem(e,o)},o.onload=function(){var t=n._parseHeaders(o.getAllResponseHeaders()),r=n._transformResponse(o.response,t),i=n._isSuccessCode(o.status)?"Success":"Error",s="_on"+i+"Item";n[s](e,r,o.status,t),n._onCompleteItem(e,r,o.status,t)},o.onerror=function(){var t=n._parseHeaders(o.getAllResponseHeaders()),r=n._transformResponse(o.response,t);n._onErrorItem(e,r,o.status,t),n._onCompleteItem(e,r,o.status,t)},o.onabort=function(){var t=n._parseHeaders(o.getAllResponseHeaders()),r=n._transformResponse(o.response,t);n._onCancelItem(e,r,o.status,t),n._onCompleteItem(e,r,o.status,t)},o.open(e.method,e.url,!0),o.withCredentials=e.withCredentials,f(e.headers,function(e,t){o.setRequestHeader(t,e)}),o.send(t)},o.prototype._iframeTransport=function(e){var t=this,n=_('<form style="display: none;" />'),o=_('<iframe name="iframeTransport'+Date.now()+'">'),r=e._input;e._form&&e._form.replaceWith(r),e._form=n,r.prop("name",e.alias),f(e.formData,function(e){f(e,function(e,t){var o=_('<input type="hidden" name="'+t+'" />');o.val(e),n.append(o)})}),n.prop({action:e.url,method:"POST",target:o.prop("name"),enctype:"multipart/form-data",encoding:"multipart/form-data"}),o.bind("load",function(){var n="",r=200;try{n=o[0].contentDocument.body.innerHTML}catch(i){r=500}var s={response:n,status:r,dummy:!0},a={},u=t._transformResponse(s.response,a);t._onSuccessItem(e,u,s.status,a),t._onCompleteItem(e,u,s.status,a)}),n.abort=function(){var i,s={status:0,dummy:!0},a={};o.unbind("load").prop("src","javascript:false;"),n.replaceWith(r),t._onCancelItem(e,i,s.status,a),t._onCompleteItem(e,i,s.status,a)},r.after(n),n.append(r).append(o),n[0].submit()},o.prototype._onWhenAddingFileFailed=function(e,t,n){this.onWhenAddingFileFailed(e,t,n)},o.prototype._onAfterAddingFile=function(e){this.onAfterAddingFile(e)},o.prototype._onAfterAddingAll=function(e){this.onAfterAddingAll(e)},o.prototype._onBeforeUploadItem=function(e){e._onBeforeUpload(),this.onBeforeUploadItem(e)},o.prototype._onProgressItem=function(e,t){var n=this._getTotalProgress(t);this.progress=n,e._onProgress(t),this.onProgressItem(e,t),this.onProgressAll(n),this._render()},o.prototype._onSuccessItem=function(e,t,n,o){e._onSuccess(t,n,o),this.onSuccessItem(e,t,n,o)},o.prototype._onErrorItem=function(e,t,n,o){e._onError(t,n,o),this.onErrorItem(e,t,n,o)},o.prototype._onCancelItem=function(e,t,n,o){e._onCancel(t,n,o),this.onCancelItem(e,t,n,o)},o.prototype._onCompleteItem=function(e,t,n,o){e._onComplete(t,n,o),this.onCompleteItem(e,t,n,o);var r=this.getReadyItems()[0];return this.isUploading=!1,y(r)?void r.upload():(this.onCompleteAll(),this.progress=this._getTotalProgress(),void this._render())},o.isFile=function(e){return b&&e instanceof b},o.isFileLikeObject=function(e){return e instanceof a},o.isArrayLikeObject=function(e){return d(e)&&"length"in e},o.inherit=function(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.super_=t},o}();return O.prototype.isHTML5=!(!b||!F),O.isHTML5=O.prototype.isHTML5,O}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var s,a=e[Symbol.iterator]();!(o=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);o=!0);}catch(u){r=!0,i=u}finally{try{!o&&a["return"]&&a["return"]()}finally{if(r)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t["default"]=i;var a=n(1),u=(o(a),angular),l=u.bind,p=u.copy,c=u.extend,f=u.forEach,d=u.isObject,h=u.isNumber,y=u.isDefined,v=u.isArray,m=u.isUndefined,_=u.element;i.$inject=["fileUploaderOptions","$rootScope","$http","$window","$timeout","FileLikeObject","FileItem","Pipeline"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(){return function(){function e(t){r(this,e);var n=l(t),o=n?t.value:t,i=p(o)?"FakePath":"Object",s="_createFrom"+i;this[s](o)}return e.prototype._createFromFakePath=function(e){this.lastModifiedDate=null,this.size=null,this.type="like/"+e.slice(e.lastIndexOf(".")+1).toLowerCase(),this.name=e.slice(e.lastIndexOf("/")+e.lastIndexOf("\\")+2)},e.prototype._createFromObject=function(e){this.lastModifiedDate=u(e.lastModifiedDate),this.size=e.size,this.type=e.type,this.name=e.name},e}()}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i;var s=n(1),a=(o(s),angular),u=a.copy,l=a.isElement,p=a.isString},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){return function(){function n(e,o,i){r(this,n);var s=c(o),a=s?p(o):null,f=s?null:o;l(this,{url:e.url,alias:e.alias,headers:u(e.headers),formData:u(e.formData),removeAfterUpload:e.removeAfterUpload,withCredentials:e.withCredentials,disableMultipart:e.disableMultipart,method:e.method},i,{uploader:e,file:new t(o),isReady:!1,isUploading:!1,isUploaded:!1,isSuccess:!1,isCancel:!1,isError:!1,progress:0,index:null,_file:f,_input:a}),a&&this._replaceNode(a)}return n.prototype.upload=function(){try{this.uploader.uploadItem(this)}catch(e){var t=e.name+":"+e.message;this.uploader._onCompleteItem(this,t,e.code,[]),this.uploader._onErrorItem(this,t,e.code,[])}},n.prototype.cancel=function(){this.uploader.cancelItem(this)},n.prototype.remove=function(){this.uploader.removeFromQueue(this)},n.prototype.onBeforeUpload=function(){},n.prototype.onProgress=function(e){},n.prototype.onSuccess=function(e,t,n){},n.prototype.onError=function(e,t,n){},n.prototype.onCancel=function(e,t,n){},n.prototype.onComplete=function(e,t,n){},n.prototype._onBeforeUpload=function(){this.isReady=!0,this.isUploading=!1,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!1,this.isError=!1,this.progress=0,this.onBeforeUpload()},n.prototype._onProgress=function(e){this.progress=e,this.onProgress(e)},n.prototype._onSuccess=function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!0,this.isCancel=!1,this.isError=!1,this.progress=100,this.index=null,this.onSuccess(e,t,n)},n.prototype._onError=function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!1,this.isCancel=!1,this.isError=!0,this.progress=0,this.index=null,this.onError(e,t,n)},n.prototype._onCancel=function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!0,this.isError=!1,this.progress=0,this.index=null,this.onCancel(e,t,n)},n.prototype._onComplete=function(e,t,n){this.onComplete(e,t,n),this.removeAfterUpload&&this.remove()},n.prototype._destroy=function(){this._input&&this._input.remove(),this._form&&this._form.remove(),delete this._form,delete this._input},n.prototype._prepareToUploading=function(){this.index=this.index||++this.uploader._nextIndex,this.isReady=!0},n.prototype._replaceNode=function(t){var n=e(t.clone())(t.scope());n.prop("value",null),t.css("display","none"),t.after(n)},n}()}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i;var s=n(1),a=(o(s),angular),u=a.copy,l=a.extend,p=a.element,c=a.isElement;i.$inject=["$compile","FileLikeObject"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(){var e=function(){function e(t){r(this,e),u(this,t),this.uploader._directives[this.prop].push(this),this._saveLinks(),this.bind()}return e.prototype.bind=function(){for(var e in this.events){var t=this.events[e];this.element.bind(e,this[t])}},e.prototype.unbind=function(){for(var e in this.events)this.element.unbind(e,this.events[e])},e.prototype.destroy=function(){var e=this.uploader._directives[this.prop].indexOf(this);this.uploader._directives[this.prop].splice(e,1),this.unbind()},e.prototype._saveLinks=function(){for(var e in this.events){var t=this.events[e];this[t]=this[t].bind(this)}},e}();return e.prototype.events={},e}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i;var s=n(1),a=(o(s),angular),u=a.extend},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){return function(t){function n(e){r(this,n);var o=p(e,{events:{$destroy:"destroy",change:"onChange"},prop:"select"}),s=i(this,t.call(this,o));return s.uploader.isHTML5||s.element.removeAttr("multiple"),s.element.prop("value",null),s}return s(n,t),n.prototype.getOptions=function(){},n.prototype.getFilters=function(){},n.prototype.isEmptyAfterSelection=function(){return!!this.element.attr("multiple")},n.prototype.onChange=function(){var t=this.uploader.isHTML5?this.element[0].files:this.element[0],n=this.getOptions(),o=this.getFilters();this.uploader.isHTML5||this.destroy(),this.uploader.addToQueue(t,n,o),this.isEmptyAfterSelection()&&(this.element.prop("value",null),this.element.replaceWith(e(this.element.clone())(this.scope)))},n}(t)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var u=n(1),l=(o(u),angular),p=l.extend;a.$inject=["$compile","FileDirective"]},function(e,t){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e){return function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];o(this,t),this.pipes=e}return t.prototype.next=function(t){var o=this.pipes.shift();if(a(o))return void this.onSuccessful.apply(this,n(t));var r=new Error("The filter has not passed");if(r.pipe=o,r.args=t,o.isAsync){var i=e.defer(),u=s(this,this.next,t),l=s(this,this.onThrown,r);i.promise.then(u,l),o.apply(void 0,n(t).concat([i]))}else{var p=Boolean(o.apply(void 0,n(t)));p?this.next(t):this.onThrown(r)}},t.prototype.exec=function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];this.next(t)},t.prototype.onThrown=function(e){},t.prototype.onSuccessful=function(){},t}()}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r;var i=angular,s=i.bind,a=i.isUndefined;r.$inject=["$q"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){return function(e){function t(n){r(this,t);var o=p(n,{events:{$destroy:"destroy",drop:"onDrop",dragover:"onDragOver",dragleave:"onDragLeave"},prop:"drop"});return i(this,e.call(this,o))}return s(t,e),t.prototype.getOptions=function(){},t.prototype.getFilters=function(){},t.prototype.onDrop=function(e){var t=this._getTransfer(e);if(t){var n=this.getOptions(),o=this.getFilters();this._preventAndStop(e),c(this.uploader._directives.over,this._removeOverClass,this),this.uploader.addToQueue(t.files,n,o)}},t.prototype.onDragOver=function(e){var t=this._getTransfer(e);this._haveFiles(t.types)&&(t.dropEffect="copy",this._preventAndStop(e),c(this.uploader._directives.over,this._addOverClass,this))},t.prototype.onDragLeave=function(e){e.currentTarget!==this.element[0]&&(this._preventAndStop(e),c(this.uploader._directives.over,this._removeOverClass,this))},t.prototype._getTransfer=function(e){return e.dataTransfer?e.dataTransfer:e.originalEvent.dataTransfer},t.prototype._preventAndStop=function(e){e.preventDefault(),e.stopPropagation()},t.prototype._haveFiles=function(e){return e?e.indexOf?-1!==e.indexOf("Files"):e.contains?e.contains("Files"):!1:!1},t.prototype._addOverClass=function(e){e.addOverClass()},t.prototype._removeOverClass=function(e){e.removeOverClass()},t}(e)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var u=n(1),l=(o(u),angular),p=l.extend,c=l.forEach;a.$inject=["FileDirective"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){return function(e){function t(n){r(this,t);var o=p(n,{events:{$destroy:"destroy"},prop:"over",overClass:"nv-file-over"});return i(this,e.call(this,o))}return s(t,e),t.prototype.addOverClass=function(){this.element.addClass(this.getOverClass())},t.prototype.removeOverClass=function(){this.element.removeClass(this.getOverClass())},t.prototype.getOverClass=function(){return this.overClass},t}(e)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var u=n(1),l=(o(u),angular),p=l.extend;a.$inject=["FileDirective"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t,n){return{link:function(o,r,i){var s=o.$eval(i.uploader);if(!(s instanceof t))throw new TypeError('"Uploader" must be an instance of FileUploader');var a=new n({uploader:s,element:r,scope:o});a.getOptions=e(i.options).bind(a,o),a.getFilters=function(){return i.filters}}}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r;var i=n(1);o(i);r.$inject=["$parse","FileUploader","FileSelect"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t,n){return{link:function(o,r,i){var s=o.$eval(i.uploader);if(!(s instanceof t))throw new TypeError('"Uploader" must be an instance of FileUploader');if(s.isHTML5){var a=new n({uploader:s,element:r});a.getOptions=e(i.options).bind(a,o),a.getFilters=function(){return i.filters}}}}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r;var i=n(1);o(i);r.$inject=["$parse","FileUploader","FileDrop"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){return{link:function(n,o,r){var i=n.$eval(r.uploader);if(!(i instanceof e))throw new TypeError('"Uploader" must be an instance of FileUploader');var s=new t({uploader:i,element:o});s.getOverClass=function(){return r.overClass||s.overClass}}}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r;var i=n(1);o(i);r.$inject=["FileUploader","FileOver"]}])});
//# sourceMappingURL=angular-file-upload.min.js.map
!function(){angular.module("angular-jwt",["angular-jwt.options","angular-jwt.interceptor","angular-jwt.jwt","angular-jwt.authManager"]),angular.module("angular-jwt.authManager",[]).provider("authManager",function(){this.$get=["$rootScope","$injector","$location","jwtHelper","jwtInterceptor","jwtOptions",function(t,e,r,n,a,i){function o(t){var r=null;return r=Array.isArray(t)?e.invoke(t,this,{options:null}):t()}function u(t){if(Array.isArray(t)||angular.isFunction(t))return e.invoke(t,p,{});throw new Error("unauthenticatedRedirector must be a function")}function s(){var t=o(p.tokenGetter);return t?!n.isTokenExpired(t):void 0}function h(){t.isAuthenticated=!0}function c(){t.isAuthenticated=!1}function l(){t.$on("$locationChangeStart",function(){var e=o(p.tokenGetter);e&&(n.isTokenExpired(e)?t.$broadcast("tokenHasExpired",e):h())})}function d(){t.$on("unauthenticated",function(){u(p.unauthenticatedRedirector),c()})}function f(t,e){if(!e)return!1;var r=e.$$route?e.$$route:e.data;if(r&&r.requiresLogin===!0){var a=o(p.tokenGetter);(!a||n.isTokenExpired(a))&&(t.preventDefault(),u(p.unauthenticatedRedirector))}}var p=i.getConfig();t.isAuthenticated=!1;var g=e.has("$state")?"$stateChangeStart":"$routeChangeStart";return t.$on(g,f),{authenticate:h,unauthenticate:c,getToken:function(){return o(p.tokenGetter)},redirect:function(){return u(p.unauthenticatedRedirector)},checkAuthOnRefresh:l,redirectWhenUnauthenticated:d,isAuthenticated:s}}]}),angular.module("angular-jwt.interceptor",[]).provider("jwtInterceptor",function(){this.urlParam,this.authHeader,this.authPrefix,this.whiteListedDomains,this.tokenGetter;var t=this;this.$get=["$q","$injector","$rootScope","urlUtils","jwtOptions",function(e,r,n,a,i){function o(t){if(!a.isSameOrigin(t)&&!u.whiteListedDomains.length)throw new Error("As of v0.1.0, requests to domains other than the application's origin must be white listed. Use jwtOptionsProvider.config({ whiteListedDomains: [<domain>] }); to whitelist.");for(var e=a.urlResolve(t).hostname.toLowerCase(),r=0;r<u.whiteListedDomains.length;r++){var n=u.whiteListedDomains[r],i=n instanceof RegExp?n:new RegExp(n,"i");if(e.match(i))return!0}return a.isSameOrigin(t)?!0:!1}var u=angular.extend({},i.getConfig(),t);return{request:function(t){if(t.skipAuthorization||!o(t.url))return t;if(u.urlParam){if(t.params=t.params||{},t.params[u.urlParam])return t}else if(t.headers=t.headers||{},t.headers[u.authHeader])return t;var n=e.when(r.invoke(u.tokenGetter,this,{options:t}));return n.then(function(e){return e&&(u.urlParam?t.params[u.urlParam]=e:t.headers[u.authHeader]=u.authPrefix+e),t})},responseError:function(t){return 401===t.status&&n.$broadcast("unauthenticated",t),e.reject(t)}}}]}),angular.module("angular-jwt.jwt",[]).service("jwtHelper",["$window",function(t){this.urlBase64Decode=function(e){var r=e.replace(/-/g,"+").replace(/_/g,"/");switch(r.length%4){case 0:break;case 2:r+="==";break;case 3:r+="=";break;default:throw"Illegal base64url string!"}return t.decodeURIComponent(escape(t.atob(r)))},this.decodeToken=function(t){var e=t.split(".");if(3!==e.length)throw new Error("JWT must have 3 parts");var r=this.urlBase64Decode(e[1]);if(!r)throw new Error("Cannot decode the token");return angular.fromJson(r)},this.getTokenExpirationDate=function(t){var e=this.decodeToken(t);if("undefined"==typeof e.exp)return null;var r=new Date(0);return r.setUTCSeconds(e.exp),r},this.isTokenExpired=function(t,e){var r=this.getTokenExpirationDate(t);return e=e||0,null===r?!1:!(r.valueOf()>(new Date).valueOf()+1e3*e)}}]),angular.module("angular-jwt.options",[]).provider("jwtOptions",function(){var t={};this.config=function(e){t=e},this.$get=function(){function e(){this.config=angular.extend({},r,t)}var r={urlParam:null,authHeader:"Authorization",authPrefix:"Bearer ",whiteListedDomains:[],tokenGetter:function(){return null},loginPath:"/",unauthenticatedRedirectPath:"/",unauthenticatedRedirector:["$location",function(t){t.path(this.unauthenticatedRedirectPath)}]};return e.prototype.getConfig=function(){return this.config},new e}}),angular.module("angular-jwt.interceptor").service("urlUtils",function(){function t(t){var e=t;return r.setAttribute("href",e),e=r.href,r.setAttribute("href",e),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}function e(e){var r=angular.isString(e)?t(e):e;return r.protocol===n.protocol&&r.host===n.host}var r=document.createElement("a"),n=t(window.location.href);return{urlResolve:t,isSameOrigin:e}})}();
!function(){angular.module("angular-storage",["angular-storage.store"]),angular.module("angular-storage.cookieStorage",[]).service("cookieStorage",["$cookies",function(e){this.set=function(t,r){return e.put(t,r)},this.get=function(t){return e.get(t)},this.remove=function(t){return e.remove(t)}}]),angular.module("angular-storage.internalStore",["angular-storage.localStorage","angular-storage.sessionStorage"]).factory("InternalStore",["$log","$injector",function(e,t){function r(e,r,o,a){this.namespace=e||null,(angular.isUndefined(a)||null==a)&&(a=!0),this.useCache=a,this.delimiter=o||".",this.inMemoryCache={},this.storage=t.get(r||"localStorage")}return r.prototype.getNamespacedKey=function(e){return this.namespace?[this.namespace,e].join(this.delimiter):e},r.prototype.set=function(e,t){this.useCache&&(this.inMemoryCache[e]=t),this.storage.set(this.getNamespacedKey(e),JSON.stringify(t))},r.prototype.get=function(t){var r=null;if(this.useCache&&t in this.inMemoryCache)return this.inMemoryCache[t];var o=this.storage.get(this.getNamespacedKey(t));try{r="undefined"==typeof o||"undefined"===o?void 0:JSON.parse(o),this.useCache&&(this.inMemoryCache[t]=r)}catch(a){e.error("Error parsing saved value",a),this.remove(t)}return r},r.prototype.remove=function(e){this.useCache&&(this.inMemoryCache[e]=null),this.storage.remove(this.getNamespacedKey(e))},r}]),angular.module("angular-storage.localStorage",["angular-storage.cookieStorage"]).service("localStorage",["$window","$injector",function(e,t){var r;try{e.localStorage.setItem("testKey","test"),e.localStorage.removeItem("testKey"),r=!0}catch(o){r=!1}if(r)this.set=function(t,r){return e.localStorage.setItem(t,r)},this.get=function(t){return e.localStorage.getItem(t)},this.remove=function(t){return e.localStorage.removeItem(t)},this.clear=function(){e.localStorage.clear()};else{var a=t.get("cookieStorage");this.set=a.set,this.get=a.get,this.remove=a.remove}}]),angular.module("angular-storage.sessionStorage",["angular-storage.cookieStorage"]).service("sessionStorage",["$window","$injector",function(e,t){var r;try{e.sessionStorage.setItem("testKey","test"),e.sessionStorage.removeItem("testKey"),r=!0}catch(o){r=!1}if(r)this.set=function(t,r){return e.sessionStorage.setItem(t,r)},this.get=function(t){return e.sessionStorage.getItem(t)},this.remove=function(t){return e.sessionStorage.removeItem(t)};else{var a=t.get("cookieStorage");this.set=a.set,this.get=a.get,this.remove=a.remove}}]),angular.module("angular-storage.store",["angular-storage.internalStore"]).provider("store",function(){var e="localStorage",t=!0;this.setStore=function(t){t&&angular.isString(t)&&(e=t)},this.setCaching=function(e){t=!!e},this.$get=["InternalStore",function(r){var o=new r(null,e,null,t);return o.getNamespacedStore=function(e,t,o,a){return new r(e,t,o,a)},o}]})}();
'use strict';

var app = angular.module( 'app' , [ 'ngRoute' , 'angular-storage', 'angular-jwt', 'controllersNavigation', 'controllersAdmin', 'controllersSite', 'myServices' ] );

app.config( [ '$routeProvider' , '$httpProvider' , '$locationProvider', function( $routeProvider , $httpProvider, $locationProvider ) {

    $locationProvider.hashPrefix('');

	// ============ ADMIN PRODUCTS ============
	$routeProvider.when( '/admin/products' , {
		controller : 'products',
		templateUrl : 'partials/admin/products.html'
	})

	.when( '/admin/product/edit/:id' , {
		controller: 'productEdit',
		templateUrl : 'partials/admin/product-edit.html'
	})

	.when( '/admin/product/create' , {
		controller: 'productCreate',
		templateUrl : 'partials/admin/product-create.html'
	})

    // ============ ADMIN CATEGORIES ============
    .when( '/admin/categories' , {
        controller : 'categories',
        templateUrl : 'partials/admin/categories.html'
    })

    .when( '/admin/category/edit/:id' , {
        controller: 'categoryEdit',
        templateUrl : 'partials/admin/category-edit.html'
    })

    .when( '/admin/category/create' , {
        controller: 'categoryCreate',
        templateUrl : 'partials/admin/category-create.html'
    })

	// ============ ADMIN USERS ============
	.when( '/admin/users' , {
		controller: 'users',
		templateUrl : 'partials/admin/users.html'
	})

	.when( '/admin/user/edit/:id' , {
		controller: 'userEdit',
		templateUrl : 'partials/admin/user-edit.html'
	})

	.when( '/admin/user/create' , {
		controller: 'userCreate',
		templateUrl : 'partials/admin/user-create.html'
	})

	// ============ ADMIN ORDERS ============
	.when( '/admin/orders' , {
		controller: 'orders',
		templateUrl : 'partials/admin/orders.html'
	})

    // ============ ADMIN CATEGORY ============
    .when( '/admin/:slug' , {
        controller: 'adminCategory',
        templateUrl : 'partials/admin/category.html'
    })

	// ============ SITE PRODUCTS ============
	.when( '/products' , {
		controller : 'siteProducts',
		templateUrl : 'partials/site/products.html'
	})

	.when( '/product/:id' , {
		controller: 'siteProduct',
		templateUrl : 'partials/site/product.html'
	})

	.when( '/cart' , {
		controller: 'cartCtrl',
		templateUrl : 'partials/site/cart.html'
	})

	// ============ SITE ORDERS ============
	.when( '/orders' , {
		controller: 'siteOrders',
		templateUrl : 'partials/site/orders.html'
	})

	// ============ LOGIN & REGISTER ============
	.when( '/login' , {
		controller: 'login',
		templateUrl : 'partials/site/login.html'
	})

	.when( '/register' , {
		controller: 'register',
		templateUrl : 'partials/site/register.html'
	})

    // ============ ADMIN HOME ============
    .when( '/admin' , {
        controller: 'adminHome',
        templateUrl : 'partials/admin/home.html'
    })

    // ============ SITE HOME ============
    .when( '/' , {
        controller: 'siteHome',
        templateUrl : 'partials/site/home.html'
    })

    // ============ 404 ============
	.when( '/404' , {
		controller: '404',
		templateUrl : 'partials/site/404.html'
	})

    // ============ SITE CATEGORY ============
	.when( '/:slug' , {
		controller: 'siteCategory',
		templateUrl : 'partials/site/category.html'
	})

	.otherwise({
		redirectTo: '/404'
	});

}]);



'use strict';

var myDirectives = angular.module( 'myDirectives' , [] );


    // Angular File Upload module does not include this directive
    // Only for example


/**
 * The ng-thumb directive
 * @author: nerv
 * @version: 0.1.2, 2014-01-09
 */
myDirectives.directive('ngThumb', ['$window', function($window) {

    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };

}]);


myDirectives.directive('onFinishRender', function ($timeout) {

    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    };

});

myDirectives.directive("owlCarousel", function() {

    return {
        restrict: 'E',
        transclude: false,
        link: function (scope) {
            scope.initCarousel = function(element) {
                // provide any default options you want
                var defaultOptions = {
                };
                var customOptions = scope.$eval($(element).attr('data-options'));
                // combine the two options objects
                for(var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                // init carousel
                $(element).owlCarousel(defaultOptions);
            };
        }
    };

});

myDirectives.directive('owlCarouselItem', [function() {

    return {
        restrict: 'A',
        transclude: false,
        link: function(scope, element) {
            // wait for the last item in the ng-repeat then call init
            if(scope.$last) {
                scope.initCarousel(element.parent());
            }
        }
    };

}]);
'use strict';

var myServices = angular.module( 'myServices' , [] );


myServices.factory('cartService', ['store', function (store) {

    if (store.get('cart')) {
        var cart = store.get('cart');
    } else {
        var cart = [];
    }

    cart.show = function () {
        return cart;
    };

    cart.add = function (product) {

        var addNew = true;

        angular.forEach(cart, function(value, key) {
           if (value.name == product.name) {
               addNew = false;
               cart[key].amount++;
           }
        });

        if (addNew) {
            product.amount = 1;
            cart.push(product);
        }

        store.set('cart', cart);

    };

    cart.empty = function () {
        store.remove('cart');
        cart.length = 0;
    };

    cart.update = function (newCart) {
        store.set('cart', newCart)
    };

    return cart;

}]);

myServices.service('checkToken', ['store', 'jwtHelper', function(store, jwtHelper){

    if (store.get('token')) {

        var token = jwtHelper.decodeToken( store.get( 'token' ) );

    } else {

        var token = false;

    }

    this.payload = function () {

        if ( store.get( 'token' ) ){

            return jwtHelper.decodeToken( store.get( 'token' ) );

        } else {

            return false;

        }

    };

    this.loggedIn = function () {

        if(store.get('token')) {

            return true;

        } else {

            return false;

        }

    };

    this.isAdmin = function () {

        if ( store.get( 'token' ) ) {

            var token = jwtHelper.decodeToken( store.get( 'token' ) );

            if ( token.role == 'admin' ) {

                return true;

            } else {

                return false;

            }

        } else {

            return false;

        }

    };

    this.raw = function () {

        return store.get( 'token' );

    };

    this.del = function () {

        store.remove('token');

    };

}]);

myServices.service('productsService', [ '$http' , function ( $http ) {

    this.getByCategoryId = function ( id ) {

        return $http.get('api/site/products/getByCategoryId/' + id)

            .then(function ( data ){

                return data;

            }, (function (){

                console.log( 'Error on communicate with API.' );

            }));

    };

    this.getCategoryName = function ( id ) {

        return $http.get('api/site/products/getCategoryName/' + id)

            .then(function ( data ){

                return data;

            }, (function (){

                console.log( 'Error on communicate with API.' );

            }));

    };

    this.getByCategorySlug = function ( slug ) {

        return $http.get('api/site/products/getByCategorySlug/' + slug)

            .then(function(data){

                return data;

            }, (function(){

                console.log( 'Error on communicate with API.' );

            }));

    };

}]);

myServices.service('categoriesService', [ '$http' , function ( $http ) {

    this.getData = function() {

        return $http.get('api/site/categories/get')

            .then(function(data){

                return data;

            }, (function(){

                console.log( 'Error on communicate with API.' );

            }));

    };

    this.getByCategorySlug = function ( slug ) {

        return $http.get('api/site/categories/getByCategorySlug/' + slug)

            .then(function(data){

                return data;

            }, (function(){

                console.log( 'Error on communicate with API.' );

            }));

    };

}]);
'use strict';

var controllersAdmin = angular.module( 'controllersAdmin' , [ 'angularFileUpload', 'myDirectives', 'ui.select', 'ngSanitize', 'angular-owl-carousel-2' ] );

controllersAdmin.controller( 'products' , [ '$scope' , '$http' , 'checkToken', 'productsService', function( $scope , $http, checkToken, productsService ){

    // get products
    $http.post( 'api/admin/products/get', {

       token: checkToken.raw()

    }).then( function( data ){

        $scope.products = data.data;

        angular.forEach($scope.products, function( item ) {

            productsService.getCategoryName( item.category ).then(function( data ) {

                item.categoryName = data.data.replace(/['"]+/g, '');

            });

        });

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    $scope.delete = function(product, $index) {

        if (!confirm('Are you really want to delete this product?')) {
            return false;
        }

        $scope.products.splice($index, 1);

        $http.post( 'api/admin/products/delete/', {

            token: checkToken.raw(),
            product: product

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams', 'FileUploader', '$timeout', 'checkToken', 'categoriesService', function( $scope , $http , $routeParams, FileUploader, $timeout, checkToken, categoriesService ){

    var productId = $routeParams.id;
    $scope.id = productId;

    // get product
    $http.post( 'api/admin/products/get/' + productId, {

       token: checkToken.raw()

    }).then( function( data ){

        $scope.product = data.data;

        // get categories
        categoriesService.getData().then(function(data) {

            $scope.categories = data.data;

            angular.forEach($scope.categories, function(item) {

                if(item.id == $scope.product.category) {

                    $scope.product.category = item;

                }

            });


        });

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    // get images
    function getImages() {
        $http.post( 'api/admin/images/get/' + productId , {

            token: checkToken.raw()

        }).then( function( data ){

            $scope.images = data.data;

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));
    }

    getImages();

    // init uploader
    var uploader = $scope.uploader = new FileUploader({

        token: checkToken.raw(),
        url: 'api/admin/images/upload/' + productId

    });

    uploader.filters.push({

        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }

    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {

        getImages();
        $scope.product.thumbnail = "uploads/" + productId + "/" + fileItem._file.name;

    };

    // delete image
    $scope.delImage = function (image, $index) {

        $scope.images.splice($index, 1);

        $http.post( 'api/admin/images/delete/' , {

            token: checkToken.raw(),
            id : productId,
            image : image

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

    // set thumbnail
    $scope.setThumbnail = function (product, image) {

        if($scope.product.thumbnail == image) {

            $scope.product.thumbnail = '';

        } else {

            $scope.product.thumbnail = image;

        }

    };

    // save changes
    $scope.saveChanges = function(product) {

        if(product) {
            product.category = product.category.id;
        }

        // post product
        $http.post( 'api/admin/products/update/', {

            token: checkToken.raw(),
            product: product

        }).then( function(){

            $scope.success = true;

            angular.forEach($scope.categories, function(item) {

                if(item.id == $scope.product.category) {

                    $scope.product.category = item;

                }

            });

            $timeout(function(){

                $scope.success = false;

            }, 3000);

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

        // post thumbnail
        $http.post( 'api/admin/images/setThumbnail/', {

            token: checkToken.raw(),
            product: product,
            image: product.thumbnail

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };


}]);

controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http' , '$timeout', 'checkToken', 'categoriesService', function( $scope , $http, $timeout, checkToken, categoriesService ){

    $scope.product = {};

    // get categories
    categoriesService.getData().then(function(data) {

        $scope.categories = data.data;
        $scope.product.category = data.data[0];

    });

    // post product
    $scope.createProduct = function(product) {

        if(product) {
            product.category = product.category.id;
        }

        $http.post( 'api/admin/products/create/', {

            token: checkToken.raw(),
            product: product

        }).then( function( ){

            $scope.success = true;
            $scope.product = {};
            $timeout(function(){
                $scope.success = false;
                categoriesService.getData().then(function(data) {

                    $scope.categories = data.data;
                    $scope.product.category = data.data[0];

                });
            }, 3000);

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'categories' , [ '$scope' , '$http' , 'categoriesService', 'productsService', 'checkToken', function( $scope , $http, categoriesService, productsService, checkToken ){


    // get categories
    categoriesService.getData().then(function(data) {

        $scope.categories = data.data;

    });

    // get products from given category
    $scope.products = [];
    $scope.productsCount = [];

    $scope.getProducts = function( id ){

        productsService.getByCategoryId( id ).then(function(data) {

            $scope.products[id] = data.data;
            $scope.productsCount[id] = $scope.products[id].length;

        });

    };

    $scope.delete = function(category, $index) {

        if (!confirm('Are you really want to delete this category?')) {
            return false;
        }

        $scope.categories.splice($index, 1);

        $http.post( 'api/admin/categories/delete/', {

            token: checkToken.raw(),
            category: category

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'categoryCreate' , [ '$scope' , '$http' , '$timeout', 'checkToken', 'categoriesService', 'productsService', function( $scope , $http, $timeout, checkToken, categoriesService, productsService ){

    $scope.category = {};

    // get categories
    categoriesService.getData().then(function(data) {

        $scope.categories = data.data;
        $scope.category['id'] = $scope.categories.length + 1;

    });

    // get products without category - category '1'
    productsService.getByCategoryId(1).then(function(data) {

        $scope.products = data.data;

    });

    // create category
    $scope.createCategory = function(category, products) {

        angular.forEach(products.selected, function(item) {

            item.category = category.id;

            $http.post( 'api/admin/products/update/', {

                token: checkToken.raw(),
                product: item

            }).then( function(){

                $scope.success = true;

            }, ( function(){

                console.log( 'Error on communicate with API.' );

            }));

        });

        $http.post( 'api/admin/categories/create/', {

            token: checkToken.raw(),
            category: category

        }).then( function( ){

            $scope.success = true;
            $scope.category = {};
            categoriesService.getData().then(function(data) {

                $scope.categories = data.data;
                $scope.category['id'] = $scope.categories.length + 1;

            });
            productsService.getByCategoryId(1).then(function(data) {

                $scope.products = data.data;

            });
            $timeout(function(){
                $scope.success = false;
            }, 3000);

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'categoryEdit', [ '$scope' , '$http' , '$q', '$timeout', '$routeParams', 'checkToken' , function( $scope , $http, $q, $timeout, $routeParams, checkToken ) {

    // arrays difference
    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };

    var categoryId = $routeParams.id;
    $scope.id = categoryId;

    // get category
    $http.post( 'api/admin/categories/get/' + categoryId, {

        token: checkToken.raw()

    }).then( function( data ){

        $scope.category = data;

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    // get products from this category + uncategorized
    $scope.productsUncategorized = $http.get('api/site/products/getByCategoryId/1', {cache: false});
    $scope.productsFromCategory = $http.get('api/site/products/getByCategoryId/' + categoryId, {'cache': false});

    $q.all([$scope.productsUncategorized, $scope.productsFromCategory]).then(function(data) {
        $scope.products = data[0].data.concat(data[1].data);
    });

    $http.get( 'api/site/products/getByCategoryId/' + categoryId).then( function( data ){

        $scope.products.selected = data;

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    // save changes
    $scope.saveChanges = function(category, products) {

        var productsArr = products.filter(function( obj ) {
            return obj.id !== products.length;
        });

        var unselectedProductsArr = [];

        if(productsArr.length === products.selected.length ) {

            unselectedProductsArr = [];

        } else {

            unselectedProductsArr = productsArr.diff(products.selected);

        }

        $http.post( 'api/admin/categories/update/', {

            token: checkToken.raw(),
            category: category

        }).then( function(){

            $scope.success = true;

            $timeout(function(){

                $scope.success = false;

            }, 3000);

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

        // update selected products category
        angular.forEach(products.selected, function(item) {

            item.category = category.id;

            $http.post( 'api/admin/products/update/', {

                token: checkToken.raw(),
                product: item

            }).then( function(){

                $scope.success = true;

            }, ( function(){

                console.log( 'Error on communicate with API.' );

            }));

        });

        if(unselectedProductsArr.length) {

            // update unselected products category
            angular.forEach(unselectedProductsArr, function(item) {

                item.category = 1;

                $http.post( 'api/admin/products/update/', {

                    token: checkToken.raw(),
                    product: item

                }).then( function(){

                    $scope.success = true;

                }, ( function(){

                    console.log( 'Error on communicate with API.' );

                }));

            });

        }

    };


}]);

controllersAdmin.controller( 'users' , [ '$scope' , '$http', 'checkToken', function( $scope , $http, checkToken ){

    $http.post( 'api/admin/users/get', {

        token: checkToken.raw()

    }).then( function( data ){

        $scope.users = data.data;

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    $scope.delete = function(user, $index) {

        if (!confirm('Are you really want to delete this user?')) {
            return false;
        }

        $scope.users.splice($index, 1);

        $http.post( 'api/admin/users/delete/', {

            token: checkToken.raw(),
            user: user

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    }

}]);

controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , '$timeout', 'checkToken', function( $scope , $http , $routeParams, $timeout, checkToken ){

    var userId = $routeParams.id;
    $scope.id = userId;

    $http.post( 'api/admin/users/get/' + userId, {

       token: checkToken.raw()

    }).then( function( data ){

        $scope.user = data.data;

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    $scope.saveChanges = function(user) {

        $http.post( 'api/admin/users/update/', {

            token: checkToken.raw(),
            id: userId,
            user : user,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            password : user.password,
            passconf : user.passconf

        }).then( function(errors){

            $scope.submit = true;

            if (errors) {

                $scope.errors = errors.data;

            } else {

                $scope.success = true;
                $timeout(function(){
                    $scope.success = false;
                }, 3000);

            }

            $scope.submit = true;

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http' , '$timeout', 'checkToken', function( $scope , $http, $timeout, checkToken ){

    $scope.user = {};
    $scope.user.role = 'user';

    $scope.createUser = function(user) {

        $http.post( 'api/admin/users/create/', {

            token: checkToken.raw(),
            user : user,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            password : user.password,
            passconf : user.passconf

        }).then( function( errors ){

            if (errors.data) {

                $scope.errors = errors.data;

            } else {

                $scope.user = {};
                $scope.success = true;
                $scope.errors = {};

                $timeout(function(){

                    $scope.success = false;

                }, 3000);

            }

            $scope.submit = true;

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    }

}]);

controllersAdmin.controller( 'orders' , [ '$scope' , '$http' , 'checkToken', function( $scope , $http, checkToken ){

    $http.post( 'api/admin/orders/get/' , {

        token: checkToken.raw(),
        payload: checkToken.payload()

    }).then( function( data ){

        $scope.orders = data;

        angular.forEach( $scope.orders , function( order , key ){

            var parsed = JSON.parse( order.items );
            $scope.orders[key].items = parsed;

        });

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    $scope.delete = function(order, $index) {

        if (!confirm('Are you really want to delete this order?')) {

            return false;

        }

        $scope.orders.splice($index, 1);

        $http.post( 'api/admin/orders/delete/' , {

            token: checkToken.raw(),
            id: order.id

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

    $scope.changeStatus = function(order) {

        if(order.status == 0) {

            order.status = 1;

        } else {

            order.status = 0;

        }

        $http.post( 'api/admin/orders/update/' , {

            token: checkToken.raw(),
            id: order.id,
            status: order.status

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'adminCategory' , [ '$scope', '$http', '$location', '$window', '$routeParams', 'productsService', 'categoriesService', 'checkToken', function( $scope, $http, $location, $window, $routeParams, productsService, categoriesService, checkToken ){

    var slug = $routeParams.slug;

    // get products
    productsService.getByCategorySlug(slug).then(function(data) {

        $scope.products = data.data;

    });

    // get categories
    categoriesService.getByCategorySlug(slug).then(function(data) {

        $scope.category = data.data;

    });

    $scope.deleteProduct = function(product, $index) {

        if (!confirm('Are you really want to delete this product?')) {
            return false;
        }

        $scope.products.splice($index, 1);

        $http.post( 'api/admin/products/delete/', {

            token: checkToken.raw(),
            product: product

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

    $scope.deleteCategory = function(category) {

        if (!confirm('Are you really want to delete this category?')) {
            return false;
        }

        $http.post( 'api/admin/categories/delete/', {

            token: checkToken.raw(),
            category: category

        }).then( function(){

            $location.path('/admin/categories');

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'adminHome' , [ '$scope', function( $scope){

    var owlAPi;
    $scope.showModal = false;
    $scope.items = [1, 2, 3, 4, 5, 6, 7, 8, 10];

    $scope.properties = {

        animateIn: 'fadeIn',
        lazyLoad: true,
        loop: true,
        items: 1,
        autoplay: false,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        navText: [
            "<span class='glyphicon glyphicon-chevron-left'></span>",
            "<span class='glyphicon glyphicon-chevron-right'></span>"
        ]

    };

    $scope.ready = function ($api) {
        owlAPi = $api;
    };

}]);
'use strict';

var controllersNavigation = angular.module( 'controllersNavigation', [ 'myDirectives' ] );

controllersNavigation.controller( 'navigation' , [ '$scope' , '$http' , '$location' , 'checkToken', 'store', 'cartService', 'categoriesService',  function( $scope , $http, $location, checkToken, store, cartService, categoriesService ){

	$scope.navigation = function () {

		if(/^\/admin/.test($location.path())) {

			if (!checkToken.isAdmin()) {

				window.location.href = '#/products?alert=notAdmin';
			}

			return 'partials/admin/navigation.html';

		} else {

			if ($location.search().alert == 'notAdmin') {

				$scope.notAdmin = true;

			} else {

				$scope.notAdmin = false;

			}

			if (checkToken.loggedIn()) {

				$scope.loggedIn = true;

			} else {

				$scope.loggedIn = false;

			}

			if (checkToken.isAdmin()) {

				$scope.isAdmin = true;

			} else {

				$scope.isAdmin = false;

			}

			return 'partials/site/navigation.html';

		}
	};

	$scope.isActive = function(path) {

		return $location.path() === path;

	};

	$scope.$watch(function () {

        $scope.cart = cartService.show();

	});

	$scope.logout = function () {

		checkToken.del();
		$location.path('/products');

	};

    $scope.removeItem = function ($index) {

        $scope.cart.splice($index, 1);
        cartService.update($scope.cart);

    };

	// get categories
    categoriesService.getData().then(function(data) {

        $scope.categories = data.data;

    });

    // navigation magic line jquery
    $scope.$on('ngRepeatFinished', function() {

        var $mainNav = $(".nav-bottom .nav");

        if($(".nav-bottom .nav li.active").length) {

            $mainNav.append("<li id='magic-line'></li>");
            $scope.magicLine = $("#magic-line");

            $scope.magicLine
                .width($(".nav-bottom .nav li.active").width())
                .css("left", $(".nav-bottom .nav li.active").position().left)
                .data("origLeft", $scope.magicLine.position().left)
                .data("origWidth", $scope.magicLine.width());

            $(".nav-bottom .nav li").hover(function() {
                $scope.el = $(this);
                $scope.leftPos = $scope.el.position().left;
                $scope.newWidth = $scope.el.width();
                $scope.magicLine.stop().animate({
                    left: $scope.leftPos,
                    width: $scope.newWidth
                });
            }, function() {
                $scope.magicLine.stop().animate({
                    left: $scope.magicLine.data("origLeft"),
                    width: $scope.magicLine.data("origWidth")
                });

            });

            $(".nav-bottom .nav li").click(function() {
                $scope.el = $(this);
                $scope.leftPos = $scope.el.position().left;
                $scope.newWidth = $scope.el.width();
                $scope.magicLine
                    .data("origLeft", $scope.el.position().left)
                    .data("origWidth", $scope.el.width());
                $scope.magicLine.stop().animate({
                    left: $scope.leftPos,
                    width: $scope.newWidth
                });
            });

        }

	});

}]);
'use strict';

var controllersSite = angular.module( 'controllersSite' , [ 'myDirectives', 'angular-owl-carousel-2' ] );

controllersSite.controller( 'siteProducts' , [ '$scope' , '$http' , 'cartService', 'categoriesService', 'productsService', function( $scope , $http, cartService, categoriesService, productsService ){

    // get products
    $http.get( 'api/site/products/get' ).
    then( function( data ){

        $scope.products = data.data;

        angular.forEach($scope.products, function( item ) {

            productsService.getCategoryName( item.category ).then(function( data ) {

                item.categoryName = data.data.replace(/['"]+/g, '');

            });

        });

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));


    // get cart
    $scope.$watch(function () {

        $scope.cart = cartService.show();
        //todo usuwanie z mini-carta czysci w produktach

    });


    $scope.addToCart = function (product) {

        cartService.add(product);

    };

    $scope.checkCart = function (product) {

        if (cartService.show().length) {

            angular.forEach(cartService.show(), function(item) {

                if (item.id == product.id) {

                    product.amount = item.amount;

                }

            });

        }

    };

}]);


controllersSite.controller( 'siteProduct' , [ '$scope' , '$http' , '$routeParams' , 'cartService', function( $scope , $http , $routeParams, cartService ){

    var id = $routeParams.id;

    $http.post( 'api/site/products/get/' + id ).

    then( function( data ){

        $scope.product = data.data;
        $scope.checkCart(data.data);

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    $scope.addToCart = function (product) {

        cartService.add(product);

    };

    $scope.checkCart = function (product) {
        if (cartService.show().length) {
            angular.forEach(cartService.show(), function(item) {
                if (item.id == product.id) {
                    product.amount = item.amount;
                }
            });
        }
    };

    function getImages () {
        $http.get( 'api/site/products/getImages/' + id ).
        then( function( data ){

            $scope.images = data.data;

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));
    }

    getImages();

}]);

controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , 'checkToken', function( $scope , $http, checkToken ){

    $http.post( 'api/site/orders/get/', {

        token: checkToken.raw(),
        payload: checkToken.payload()

    }).then( function( data ){

        $scope.orders = data;

        angular.forEach( $scope.orders , function( order , key ){
            var parsed = JSON.parse( order.items );
            $scope.orders[key].items = parsed;
        });

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

}]);

controllersSite.controller( 'cartCtrl' , [ '$scope' , '$http' , '$filter', 'cartService', 'checkToken', function( $scope , $http, $filter, cartService, checkToken ){

    $scope.cart = cartService.show();

    $scope.emptyCart = function () {
        cartService.empty();
    };

    $scope.total = function () {
        var total = 0;
        angular.forEach($scope.cart, function(item) {
            total += item.amount * item.price;
        });
        total = $filter('number')(total, 2);
        return total;
    };

    $scope.removeItem = function ($index) {
        $scope.cart.splice($index, 1);
        cartService.update($scope.cart);
    };

    $scope.setOrder = function ($event) {

        $event.preventDefault();

        if (!checkToken.loggedIn()) {
            $scope.alert = {type: 'warning', msg: 'You have to be logged in.'};
            return false;
        }

        $http.post( 'api/site/orders/create/', {

            token: checkToken.raw(),
            payload: checkToken.payload(),
            items: $scope.cart,
            total: $scope.total()

        }).then( function( data ){

            cartService.empty();
            $scope.alert = {type: 'success', msg: 'Order in process. Dont refresh the page.'};
            $('#paypalForm').submit();

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

    $scope.$watch(function () {
       cartService.update($scope.cart);
    });

}]);

controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , 'checkToken', function( $scope , $http, checkToken ){

    $http.post( 'api/site/orders/get/' , {

        token: checkToken.raw(),
        payload: checkToken.payload()

    }).then( function( data ){

        $scope.orders = data.data;

        angular.forEach( $scope.orders , function( order , key ){
            var parsed = JSON.parse( order.items );
            $scope.orders[key].items = parsed;
        });

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

}]);

controllersSite.controller( 'siteCategory' , [ '$scope' , '$http' , '$routeParams' , 'cartService', 'productsService', 'categoriesService', function( $scope , $http , $routeParams, cartService, productsService, categoriesService ){

    var slug = $routeParams.slug;

    // get products
    productsService.getByCategorySlug(slug).then(function(data) {

        $scope.products = data.data;

    });

    // get categories
    categoriesService.getData().then(function(data) {

        $scope.categories = data.data;

    });

    $scope.addToCart = function (product) {
        cartService.add(product);
    };

    $scope.checkCart = function (product) {
        if (cartService.show().length) {
            angular.forEach(cartService.show(), function(item) {
                if (item.id == product.id) {
                    product.amount = item.amount;
                }
            });
        }
    };

}]);

controllersSite.controller( 'login' , [ '$scope' , '$http' , 'store', 'checkToken', '$location', function( $scope , $http, store, checkToken, $location ){

    if(checkToken.loggedIn()) {

        $location.path('/products');

    }

    $scope.user = {};

    $scope.formSubmit = function (user) {
        $http.post( 'api/site/user/login/', {

            email : user.email,
            password : user.password

        }).then( function( data ){

            $scope.submit = true;
            $scope.error = data.error;

            if (!data.error) {

                store.set('token', data.data.token);
                $location.path('/products');

            }

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));
    };

}]);

controllersSite.controller( 'register' , [ '$scope' , '$http' , function( $scope , $http ){

    $scope.user = {};

    $scope.formSubmit = function (user) {

        $http.post( 'api/site/user/create/', {

            user : user,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            password : user.password,
            passconf : user.passconf

        }).then( function( errors ){

            $scope.submit = true;
            $scope.user = {};

            if (errors) {

                $scope.errors = errors.data;

            } else {

                $scope.errors = {};
                $scope.success = true;

            }

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));
    };

}]);

controllersSite.controller( 'siteHome' , [ '$scope' , '$http', '$timeout', function( $scope , $http, $timeout ){

    var owlAPi;
    $scope.items = [1, 2, 3, 4, 5, 6, 7, 8, 10];

    $scope.properties = {

        animateIn: 'fadeIn',
        lazyLoad: true,
        loop: true,
        items: 1,
        autoplay: true,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        navText: [
            "<span class='glyphicon glyphicon-chevron-left'></span>",
            "<span class='glyphicon glyphicon-chevron-right'></span>"
        ]

    };

    $scope.ready = function ($api) {
        owlAPi = $api;
    };

}]);