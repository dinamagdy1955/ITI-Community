import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestGroupPageComponent } from './request-group-page/request-group-page.component';
import { GroupProfilePageComponent } from './group-profile-page/group-profile-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeftSideGroupComponent } from './left-side-group/left-side-group.component';
import { CenterGroupPageComponent } from './center-group-page/center-group-page.component';
import { RightSideGroupComponent } from './right-side-group/right-side-group.component';
import { WriteBoxModelComponent } from './write-box-model/write-box-model.component';
import { GroupPostsComponent } from './group-posts/group-posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { DiscoverComponent } from './discover/discover.component';
import { PictureViewComponent } from './picture-view/picture-view.component';

const groupRoutes: Routes = [
  { path: 'all-groups', component: RequestGroupPageComponent },
  { path: 'discover-groups', component: DiscoverComponent },
  { path: 'group-profile/:id', component: GroupProfilePageComponent },
  { path: '', redirectTo: '/Group/all-groups', pathMatch: 'full' },
  { path: '**', redirectTo: '/Home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    RequestGroupPageComponent,
    GroupProfilePageComponent,
    LeftSideGroupComponent,
    CenterGroupPageComponent,
    RightSideGroupComponent,
    WriteBoxModelComponent,
    GroupPostsComponent,
    PostCommentsComponent,
    CommentFormComponent,
    EditPostComponent,
    EditCommentComponent,
    DiscoverComponent,
    PictureViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(groupRoutes),
    NgbModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class GroupsModule { }
