import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'character-detail',
    loadChildren: () => import('./pages/character-detail/character-detail.module').then( m => m.CharacterDetailPageModule)
  },
  {
    path: 'comic-detail',
    loadChildren: () => import('./pages/comic-detail/comic-detail.module').then( m => m.ComicDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
