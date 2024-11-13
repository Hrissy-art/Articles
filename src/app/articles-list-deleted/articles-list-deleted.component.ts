import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Article } from '../common/article';
import { ArticleService } from '../common/article.service';

@Component({
  selector: 'app-articles-list-deleted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles-list-deleted.component.html',
  styleUrl: './articles-list-deleted.component.css'
})
export class ArticlesListDeletedComponent {
  // Liste des articles non disponnible
  articlesDeleted!: Article[];
  constructor(public articleService: ArticleService) {}

  ngOnInit() {
    // TODO récupération des articles non disponible à partir d'un service
    // this.articleService.getListDeletedArticles  }

    this.loadDeletedArticles(); }

    loadDeletedArticles() {
      this.articlesDeleted = this.articleService.getListDeletedArticles();
    }
  /**
   * Restaure un article supprimé
   */
  restore(article: Article) {
    // TODO restauration de l'article à partir d'un service

    this.articleService.restoreArticle(article);

    // this.articleService.getListDeletedArticles();
    this.loadDeletedArticles();


  }
}
