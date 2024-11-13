import { Injectable } from '@angular/core';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor() { }

 
// createArticle(article: Article) {
//   // Ajout de l'article à la liste des articles
//   this.articles.push(article);
//   localStorage.setItem('articles', JSON.stringify(this.articles));
  getFromLocalStorage(): Article[] {
    const stringData = localStorage.getItem('articles');
    return JSON.parse(stringData || '[]');
  }

  getListDeletedArticles(): Article[] {
    const stringData = localStorage.getItem('deletedArticles');
    return JSON.parse(stringData || '[]');
  }

  saveToLocalStorage(articles: Article[]): void {
    localStorage.setItem('articles', JSON.stringify(articles));
  }

  saveDeletedArticles(articles: Article[]): void {
    localStorage.setItem('deletedArticles', JSON.stringify(articles));
  }
  addArticle(article: Article): void {
    const articles = this.getFromLocalStorage();
    articles.push(article);
    this.saveToLocalStorage(articles);
  }

  deleteArticle(article: Article) {
    let articles = this.getFromLocalStorage();
    const index = articles.findIndex((x) => x.id === article.id);
    // Suppression de l'article du tableau
    articles.splice(index, 1);
    localStorage.setItem('articles', JSON.stringify(articles));

    // Ajouter l'article à la liste des articles supprimés
    let deletedArticles = this.getListDeletedArticles();
    deletedArticles.push(article);
    this.saveDeletedArticles(deletedArticles);
  
  }

  restoreArticle(article: Article): void {
    let deletedArticles = this.getListDeletedArticles();
    const index = deletedArticles.findIndex((x) => x.id === article.id);
    if (index !== -1) {
      // Supprimer de la liste des articles supprimés
      deletedArticles.splice(index, 1);
      this.saveDeletedArticles(deletedArticles);

      // Ajouter à la liste des articles actifs
      const articles = this.getFromLocalStorage();
      articles.push(article);
      this.saveToLocalStorage(articles);
    }
}}
