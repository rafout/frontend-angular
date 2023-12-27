import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export abstract class BaseService {
    constructor(private httpClient: HttpClient) {}

    protected post<TRequest>(endpoint: string, body: TRequest): Observable<void> {
      return this.httpClient.post<void>(`${environment.URL_API}${endpoint}`, body);
    }
}