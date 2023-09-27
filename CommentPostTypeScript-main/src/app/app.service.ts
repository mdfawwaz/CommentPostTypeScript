import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'http://localhost:8080/forum'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getPostDetail(id: number): Observable<any> {
    console.log("get");
    const url = `${this.baseUrl}/post/${id}`;
    return this.http.get<any>(url);
  }

  getCommentsForPost(id: number): Observable<any[]> {
    console.log("get");
    const url = `${this.baseUrl}/post/${id}/comment`;
        return this.http.get<any>(url);
  }

  addComment(id:number): Observable<any[]> {
    console.log("get");

    const url = `${this.baseUrl}/post/${id}/comment`;
    return this.http.get<any>(url);
  }

  getLikesForPost(postId: number): Observable<any[]> {
    const url = `${this.baseUrl}/post/${postId}/like`; // Replace with your actual API endpoint
    return this.http.get<any>(url);
  }

  addCommentToPost(postId: number, commenterName: string, commentContent: string) {
    const commentData = {
      commenterName: commenterName,
      content: commentContent,
    };
  
    const url = `${this.baseUrl}/post/${postId}/addcomment`; // Construct the correct URL
    return this.http.post<any>(url, commentData);
  }
  
}