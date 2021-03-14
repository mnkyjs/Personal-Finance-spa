/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.10.8.0 (NJsonSchema v10.3.11.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class FinanceApiService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    register(body: UserRegisterDto | undefined): Observable<UserRegisterDto> {
        let url_ = this.baseUrl + "/api/Auth/register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processRegister(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processRegister(<any>response_);
                } catch (e) {
                    return <Observable<UserRegisterDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<UserRegisterDto>><any>_observableThrow(response_);
        }));
    }

    protected processRegister(response: HttpResponseBase): Observable<UserRegisterDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <UserRegisterDto>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<UserRegisterDto>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    login(body: UserLoginDto | undefined): Observable<AuthUserDto> {
        let url_ = this.baseUrl + "/api/Auth/login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processLogin(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processLogin(<any>response_);
                } catch (e) {
                    return <Observable<AuthUserDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<AuthUserDto>><any>_observableThrow(response_);
        }));
    }

    protected processLogin(response: HttpResponseBase): Observable<AuthUserDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <AuthUserDto>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<AuthUserDto>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    createCategory(body: CategorieDto | undefined): Observable<CategorieDto> {
        let url_ = this.baseUrl + "/api/Category";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreateCategory(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateCategory(<any>response_);
                } catch (e) {
                    return <Observable<CategorieDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CategorieDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreateCategory(response: HttpResponseBase): Observable<CategorieDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <CategorieDto>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CategorieDto>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    deleteCategory(body: CategorieDto | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/Category";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteCategory(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteCategory(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processDeleteCategory(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }

    /**
     * Gets the list of all Categories.
     * @return Success
     */
    getAllCategories(): Observable<CategorieDto[]> {
        let url_ = this.baseUrl + "/api/Category";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAllCategories(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllCategories(<any>response_);
                } catch (e) {
                    return <Observable<CategorieDto[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<CategorieDto[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllCategories(response: HttpResponseBase): Observable<CategorieDto[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <CategorieDto[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CategorieDto[]>(<any>null);
    }

    /**
     * @return Success
     */
    getSingleCategoryById(id: number): Observable<CategorieDto[]> {
        let url_ = this.baseUrl + "/api/Category/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetSingleCategoryById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetSingleCategoryById(<any>response_);
                } catch (e) {
                    return <Observable<CategorieDto[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<CategorieDto[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetSingleCategoryById(response: HttpResponseBase): Observable<CategorieDto[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <CategorieDto[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CategorieDto[]>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    updateCategory(id: number, body: CategorieDto | undefined): Observable<CategorieDto> {
        let url_ = this.baseUrl + "/api/Category/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdateCategory(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdateCategory(<any>response_);
                } catch (e) {
                    return <Observable<CategorieDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CategorieDto>><any>_observableThrow(response_);
        }));
    }

    protected processUpdateCategory(response: HttpResponseBase): Observable<CategorieDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <CategorieDto>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CategorieDto>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    createTransaction(body: TransactionDto | undefined): Observable<TransactionDto> {
        let url_ = this.baseUrl + "/api/Transaction";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreateTransaction(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateTransaction(<any>response_);
                } catch (e) {
                    return <Observable<TransactionDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<TransactionDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreateTransaction(response: HttpResponseBase): Observable<TransactionDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <TransactionDto>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TransactionDto>(<any>null);
    }

    /**
     * @return Success
     */
    getAllTransactions(): Observable<TransactionDto[]> {
        let url_ = this.baseUrl + "/api/Transaction";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAllTransactions(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllTransactions(<any>response_);
                } catch (e) {
                    return <Observable<TransactionDto[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<TransactionDto[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllTransactions(response: HttpResponseBase): Observable<TransactionDto[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <TransactionDto[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TransactionDto[]>(<any>null);
    }

    /**
     * @return Success
     */
    deleteTransaction(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/Transaction/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteTransaction(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteTransaction(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processDeleteTransaction(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }

    /**
     * @return Success
     */
    getSingleTransactionById(id: number): Observable<TransactionDto[]> {
        let url_ = this.baseUrl + "/api/Transaction/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetSingleTransactionById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetSingleTransactionById(<any>response_);
                } catch (e) {
                    return <Observable<TransactionDto[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<TransactionDto[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetSingleTransactionById(response: HttpResponseBase): Observable<TransactionDto[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <TransactionDto[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TransactionDto[]>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    updateTransaction(id: number, body: TransactionDto | undefined): Observable<TransactionDto> {
        let url_ = this.baseUrl + "/api/Transaction/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdateTransaction(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdateTransaction(<any>response_);
                } catch (e) {
                    return <Observable<TransactionDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<TransactionDto>><any>_observableThrow(response_);
        }));
    }

    protected processUpdateTransaction(response: HttpResponseBase): Observable<TransactionDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <TransactionDto>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TransactionDto>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    getAllTransactionsInDateRange(body: DateRangeDto | undefined): Observable<TransactionDto[]> {
        let url_ = this.baseUrl + "/api/Transaction/dateRange";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAllTransactionsInDateRange(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllTransactionsInDateRange(<any>response_);
                } catch (e) {
                    return <Observable<TransactionDto[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<TransactionDto[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllTransactionsInDateRange(response: HttpResponseBase): Observable<TransactionDto[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <TransactionDto[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TransactionDto[]>(<any>null);
    }
}

export interface UserRegisterDto {
    firstName?: string | undefined;
    lastName?: string | undefined;
    userName?: string | undefined;
    password?: string | undefined;
    email?: string | undefined;
}

export interface UserLoginDto {
    username?: string | undefined;
    password?: string | undefined;
}

export interface AuthUserDto {
    token?: string | undefined;
    user?: UserLoginDto;
}

export interface CategorieDto {
    id?: number;
    name?: string | undefined;
    isShared?: boolean;
    userId?: number;
}

export enum TransactionTypeEnum {
    Einnahmen = "Einnahmen",
    Ausgaben = "Ausgaben",
}

export interface TransactionDto {
    id?: number;
    title?: string | undefined;
    description?: string | undefined;
    value?: number;
    date?: Date;
    userId?: number;
    categoryId?: number;
    transactionType?: TransactionTypeEnum;
}

export interface DateRangeDto {
    startDate?: Date;
    endDate?: Date;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}