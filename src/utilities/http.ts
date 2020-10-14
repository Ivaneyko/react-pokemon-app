import RequestMethodEnum from 'enums/request.enum';

interface HttpResponse<T> extends Response {
  parseBody?: T
}

const API_URL:string = 'https://pokeapi.co/api/v2';

export default class HttpUtility {
  public async get<T>(
    path:string,
    args:RequestInit = { method: RequestMethodEnum.Get }
  ):Promise<HttpResponse<T>> {
    return await this._http<T>(path, args);
  }

  public async post<T>(
    path:string,
    body?:any,
    args:RequestInit = {
      method: RequestMethodEnum.Post,
      body: body instanceof FormData ? body : JSON.stringify(body)
    }
  ):Promise<HttpResponse<T>> {
    if ( !(body instanceof FormData) ){
      args['headers'] = { 'Content-Type': 'application/json' };
    }
    return await this._http<T>(path, args);
  }

  public async put<T>(
    path:string,
    body:any,
    args:RequestInit = {
      method: RequestMethodEnum.Put,
      body: body instanceof FormData ? body : JSON.stringify(body)
    }
  ):Promise<HttpResponse<T>> {
    if ( !(body instanceof FormData) ){
      args['headers'] = { 'Content-Type': 'application/json' };
    }
    return await this._http<T>(path, args);
  }

  public async patch<T>(
    path:string,
    body:any,
    args:RequestInit = { method: RequestMethodEnum.Patch, body: JSON.stringify(body) }
  ):Promise<HttpResponse<T>> {
    args['headers'] = { 'Content-Type': 'application/json' };
    return await this._http<T>(path, args);
  }

  public async delete<T>(
    path:string,
    args:RequestInit = { method: RequestMethodEnum.Delete }
  ):Promise<HttpResponse<T>> {
    return await this._http<T>(path, args);
  }

  private async _http<T>(path:string, args:RequestInit = {}):Promise<HttpResponse<T>> {
    // args.headers = {
    //   ...args.headers,
    //   Authorization: `${StorageService.getTokenType()} ${StorageService.getToken()}`
    // };
    const request:RequestInfo = new Request(`${API_URL}${path}`, args);
    const response:HttpResponse<T> = await fetch(request);
    // try {
    //   response.parseBody = await response.json();
    // } catch(error){}
    if ( !response.ok ) throw new Error(response.statusText);
    return await response.json();
  }
}

