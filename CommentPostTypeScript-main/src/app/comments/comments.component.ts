import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent {
  postId: number = 1;
  post: any;
  @Input() comments: Comment[] | undefined;
  @Input() likesCount: number | undefined;


  constructor(private postService: AppService) { }

  ngOnInit(): void {

    this.getPostDetail(this.postId);
  }

  getPostDetail(id: number): void {
    this.postService.getPostDetail(id) // Use the 'id' parameter
      .subscribe((data) => {
        this.post = data;
      });
  }
  

  onSubmit(): void {
    if (this.postId !== undefined) {
      this.getPostDetail(this.postId);
    }
  
}
}