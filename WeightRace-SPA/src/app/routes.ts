import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { SingleusergraphComponent } from './userprogress/singleusergraph/singleusergraph.component';
import { ProgressResolver } from './_resolvers/progress.resolver';
import { GraphResolver } from './_resolvers/graph.resolver';
import { FriendListResolver } from './_resolvers/friend-list.resolver';
import { TwousergraphComponent } from './userprogress/twousergraph/twousergraph.component';
import { FriendCompareResolver } from './_resolvers/friend-compare.resolver';
 export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver, friends: FriendListResolver}},
            { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
            { path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
            { path: 'messages', component: MessagesComponent},
            { path: 'progress', component: SingleusergraphComponent, resolve: {user: ProgressResolver, weights: GraphResolver}},
            { path: 'progress/:id', component: TwousergraphComponent,
                resolve: {user: ProgressResolver, weights: GraphResolver, friend: FriendCompareResolver}},
            { path: 'lists', component: ListsComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];
