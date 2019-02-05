/**
 * TP 1 Programmation    interactive    client-serveur
 * Exercice    1 :    Web    Storage    – Liste    des     visiteurs    en    local.
 * Auteur : Melnyk Svitlana et Kravchenko Iana
 * Date : juin 2018
 */
"use strict";

// si localStorage est vide, créer [] pour stocker les données et créer id de dernier visiteur dans localStorage
if (localStorage.getItem('donneesVisiteur') === null) {
    localStorage.setItem('donneesVisiteur', JSON.stringify([]));
    localStorage.setItem('dernierId', JSON.stringify(0));
}

//Déclarer les variables
let tbody = document.querySelector('#tbody');
let sauver = document.getElementById("sauver");
let annuler = document.getElementById("annuler");

//Ajouter  addEventListener (click) pour les boutons 'sauver' et 'annuler'
sauver.addEventListener('click', ajouterVisiteur);
annuler.addEventListener('click', viderForm);

//Appeler la fonction pour remplir le tableau
remplirTableau();

/**
 * Fonction pour remplir (afficher) le tableau des visiteurs de localStorage
 */
function remplirTableau() {

    tbody.innerHTML = '';
    let data = JSON.parse(localStorage.getItem('donneesVisiteur'));
    for (let i = 0; i < data.length; i++) {

        let tr = document.createElement('tr');
        let td = document.createElement("td");
        td.innerHTML += data[i].id;
        tr.appendChild(td);
        let td1 = document.createElement("td");
        td1.innerHTML += data[i].prenom;
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.innerHTML += data[i].nom;
        tr.appendChild(td2);
        let td3 = document.createElement("td");
        td3.innerHTML += data[i].courriel;
        tr.appendChild(td3);
        let td4 = document.createElement("td");
        td4.innerHTML += '<span class="modifier" data-id=' + data[i].id + '>Modifier</span> | <span class="supprimer" data-id=' + data[i].id + '>Supprimer</span>';
        tr.appendChild(td4);

        tbody.appendChild(tr);
    }
    //Affecter des addEventListener pour les boutons 'modifier' et 'supprimer'. En appuyant sur les boutons, exécutez les fonctions 'modifierVisiteur' et 'supprimerVisiteur'
    let modifiers = document.querySelectorAll('.modifier');
    for (let modifier of modifiers) {
        modifier.addEventListener('click', modifierVisiteur);
    }

    let supprimers = document.querySelectorAll('.supprimer');
    for (let supprimer of supprimers) {
        supprimer.addEventListener('click', supprimerVisiteur);
    }
}

/**
 * Fonction pour vider le formulaire (pour annuler les données dans un formulaire)
 */
function viderForm() {
    document.getElementById("inputModification").value = "";
    document.getElementById("inputPrenom").value = "";
    document.getElementById("inputNom").value = "";
    document.getElementById("inputCourriel").value = "";

}

/**
 * Fonction pour sauvegarder nouveau visiteur
 */
function sauvegarderNouveauVisiteur() {
    let inputPrenom = document.getElementById("inputPrenom").value;
    let inputNom = document.getElementById("inputNom").value;
    let inputCourriel = document.getElementById("inputCourriel").value;
    let data = JSON.parse(localStorage.getItem('donneesVisiteur'));
    let n = JSON.parse(localStorage.getItem('dernierId'));

    data.push({
        id: ++n,
        prenom: inputPrenom,
        nom: inputNom,
        courriel: inputCourriel
    });

    localStorage.setItem('donneesVisiteur', JSON.stringify(data));
    localStorage.setItem('dernierId', JSON.stringify(n));
}

/**
 * Fonction pour sauvegarder les données de visiteur modifié
 */
function sauvegarderVisiteurModification() {
    let idVisiteur = document.getElementById("inputModification").value;
    let inputPrenom = document.getElementById("inputPrenom").value;
    let inputNom = document.getElementById("inputNom").value;
    let inputCourriel = document.getElementById("inputCourriel").value;
    let data = JSON.parse(localStorage.getItem('donneesVisiteur'));
    let visiteur = data.find(function (visiteur) {
        return visiteur.id === +idVisiteur;
    });
    visiteur.prenom = inputPrenom;
    visiteur.nom = inputNom;
    visiteur.courriel = inputCourriel;

    localStorage.setItem('donneesVisiteur', JSON.stringify(data));
}

/**
 * Fonction pour ajouter les données de visiteur
 */
function ajouterVisiteur() {
    // si les champs de formulaire sont vides -  le message d'erreur
    document.getElementById('erreur').innerHTML = '';
    if (champVideVerifier()) {
        document.getElementById('erreur').innerHTML = 'Veuillez remplir tous les champs';
        return;
    }
    //si input de Modification (type hidden) est non vide - sauvegarder la modification, si non - sauvegarder nouveau visiteur
    if (document.getElementById("inputModification").value !== '') {
        sauvegarderVisiteurModification();
        remplirTableau();
        viderForm();
    } else {
        sauvegarderNouveauVisiteur();
        remplirTableau();
        viderForm();
    }
}

/**
 * Fonction pour modifier les données de visiteur
 * @param event
 */
function modifierVisiteur(event) {
    let data = JSON.parse(localStorage.getItem('donneesVisiteur'));
    let idVisiteur = event.target.dataset.id;
    let visiteur = data.find(function (visiteur) {
        return visiteur.id === +idVisiteur;
    });

    document.getElementById("inputModification").value = visiteur.id;
    document.getElementById("inputPrenom").value = visiteur.prenom;
    document.getElementById("inputNom").value = visiteur.nom;
    document.getElementById("inputCourriel").value = visiteur.courriel;

}

/**
 * Fonction pour supprimer les données de visiteur
 * @param event
 */
function supprimerVisiteur(event) {
    let data = JSON.parse(localStorage.getItem('donneesVisiteur'));
    let idVisiteur = event.target.dataset.id;
    let visiteur = data.find(function (visiteur) {
        return visiteur.id === +idVisiteur;
    });
    data.splice(data.indexOf(visiteur), 1);
    localStorage.setItem('donneesVisiteur', JSON.stringify(data));
    remplirTableau();
}

/**
 * Fonction pour verifier si les champs de formulaire sont vides (pour ne sauvegarder pas les données de visiteur vides)
 * @returns {boolean}
 */
function champVideVerifier() {
    let inputPrenom = document.getElementById("inputPrenom").value;
    let inputNom = document.getElementById("inputNom").value;
    let inputCourriel = document.getElementById("inputCourriel").value;

    if (!(inputPrenom.trim() === '' || inputNom.trim() === '' || inputCourriel.trim() === '')) {
        return false;
    } else {
        return true;
    }
}