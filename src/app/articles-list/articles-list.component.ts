import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../common/article';
import { ArticleService } from '../common/article.service';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.css'
})
export class ArticlesListComponent {
// Modèle de donnée d'un article et initialisation du modèle de donnée
article: Article = {
  id: '',
  name: '',
  price: '',
  contact: '',
  stock: '',
};
// Liste des articles disponibles
articles!: Article[];

constructor(private articleService: ArticleService) {}
ngOnInit() {
  // Récupération des articles à partir du local storage
  this.getArticlesList();
}

getArticlesList() {
  this.articles = this.articleService.getFromLocalStorage();
}

//Création d'un nouvel article et ajout au tableau
// createArticle(article: Article) {
//   // Ajout de l'article à la liste des articles
//   this.articles.push(article);
//   localStorage.setItem('articles', JSON.stringify(this.articles));

createArticle(article: Article) {
  this.articleService.addArticle(article);
  this.getArticlesList(); 

  // Réinitialisation du modèle
  this.article = {
    id: '',
    name: '',
    price: '',
    contact: '',
    stock: '',
  };
}

// Suppression d'un article


/**
 * Récupération du tableau d'articles stocké dans le local storage
 */
// getFromLocalStorage(): Article[] {
//   // Récupération des articles en format 'string'
//   const stringData = localStorage.getItem('articles');
//   // Conversion des données de type 'string' en objet Json
//   const articles: Article[] = JSON.parse(stringData || '[]');

//   return articles;
// }

deleteArticle(article: Article) {
  this.articleService.deleteArticle(article);  
  this.getArticlesList(); 
}
}
