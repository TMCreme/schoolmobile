import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'directory',
    loadChildren: () => import('./pages/directory/directory.module').then( m => m.DirectoryPageModule)
  },
  {
    path: 'textbooklist',
    loadChildren: () => import('./pages/textbooklist/textbooklist.module').then( m => m.TextbooklistPageModule)
  },
  {
    path: 'textbookdetail',
    loadChildren: () => import('./pages/textbookdetail/textbookdetail.module').then( m => m.TextbookdetailPageModule)
  },
  {
    path: 'onlineclass',
    loadChildren: () => import('./pages/onlineclass/onlineclass.module').then( m => m.OnlineclassPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'createuser',
    loadChildren: () => import('./pages/createuser/createuser.module').then( m => m.CreateuserPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./pages/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'userassociation',
    loadChildren: () => import('./pages/userassociation/userassociation.module').then( m => m.UserassociationPageModule)
  },
  {
    path: 'adminportal',
    loadChildren: () => import('./pages/adminportal/adminportal.module').then( m => m.AdminportalPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'teacherportal',
    loadChildren: () => import('./pages/teacherportal/teacherportal.module').then( m => m.TeacherportalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
