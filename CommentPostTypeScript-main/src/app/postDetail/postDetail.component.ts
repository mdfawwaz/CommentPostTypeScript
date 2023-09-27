import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-getposts',
  templateUrl: './postDetail.component.html',
  styleUrls: ['./postDetail.component.css']
})

export class GetpostsComponent implements OnInit {
commenterName: any;

  postId: number = 1;
  post: any;
  comments: any[] = [];
  numLikes: number = 0; // Add property to store the number of likes
commentContent: string = '';

  constructor(private postService: AppService) { }

  ngOnInit(): void {
    this.getPostDetail(this.postId);
  }

  getPostDetail(id: number): void {
    this.postService.getPostDetail(id)
      .subscribe((data) => {
        this.post = data;
        this.loadComments(); // Load comments when post details are fetched
        this.loadLikes(); // Load likes when post details are fetched
      });
  }

  loadComments(): void {
    if (this.postId) {
      this.postService.getCommentsForPost(this.postId)
        .subscribe((data: any) => {
          this.comments = data;
          console.log("Comments:", this.comments);
        });
    }
  }
  

  // Add a method to load the number of likes for the post
  loadLikes(): void {
    if (this.postId) {
      this.postService.getLikesForPost(this.postId)
        .subscribe((data: any) => {
          this.numLikes = data;
        });
    }
  }

  onSubmit(): void {
    if (this.postId !== undefined) {
      this.getPostDetail(this.postId);
    }
  }

  onSubmitComment(): void {
    if (this.postId) {
      // Call your service to submit the comment
      this.postService.addCommentToPost(this.postId, this.commenterName, this.commentContent)
        .subscribe((response: any) => {
          // Handle the response as needed
          console.log('Comment added successfully:', response);
          // Optionally, reload comments to reflect the newly added comment
          this.loadComments();
        });
    }
  }
}
