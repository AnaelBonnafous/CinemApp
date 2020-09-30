afficherActeurs();
async function afficherActeurs() {
    const url = "https://workshop.neotechweb.net/ws/ciamovie/1.0.0/acteurs.php";
    const data = await fetch(url);
    const datajson = await data.json();

    let template = document.getElementById("templateActeur");

    datajson.forEach(async acteur => {
        let content = template.content.cloneNode(true);

        // Photo
        content.querySelector(".photoActeur").src = `https://workshop.neotechweb.net/ws/ciamovie/1.0.0/acteurs/${acteur.idActeur}.jpg`;
        // Nom
        const nomActeur = content.querySelector(".nomActeur");
        nomActeur.innerText = acteur.Nom;
        nomActeur.addEventListener('click', remplirModalFilms.bind(null, acteur));
        // Naissance
        // Pays
        content.querySelector(".paysActeur").src = "https://workshop.neotechweb.net/ws/flags/64/us.png";
        // Date
        content.querySelector(".dateActeur").innerText = " 8 octobre 1949";
        // Films
        const urlFilms = "https://workshop.neotechweb.net/ws/ciamovie/1.0.0/films.php";
        const dataFilms = await fetch(urlFilms);
        const datajsonFilms = await dataFilms.json();
        const nombreFilms = datajsonFilms.filter(film => film.Acteur == acteur.idActeur).length;
        content.querySelector(".nbFilmsActeur").innerText = nombreFilms;

        document.getElementById("listeActeurs").appendChild(content);
    });
}

async function remplirModalFilms(acteur) {
    const url = "https://workshop.neotechweb.net/ws/ciamovie/1.0.0/films.php";
    const data = await fetch(url);
    const datajson = await data.json();

    const modalTitle = document.getElementById("modalFilms-title");
    modalTitle.innerText = `Filmographie de "${acteur.Nom}"`;
    const listeFilms = document.getElementById("listeFilms");
    listeFilms.innerHTML = "";
    let template = document.getElementById("templateFilm");
    
    datajson.filter(film => film.Acteur == acteur.idActeur).forEach(async film => {

        let content = template.content.cloneNode(true);
        
        // Affiche
        content.querySelector(".afficheFilm").src = `https://workshop.neotechweb.net/ws/ciamovie/1.0.0/films/${film.Fichier}`;
        // Titre
        content.querySelector(".titreFilm").innerText = film.Titre;
        // Infos
        content.querySelector(".infosFilm").innerText = `${film.Annee} / ${film.Genre}`;
        // Realisation
        content.querySelector(".realFilm").innerText = film.Realisateur;
        // Acteurs
        const urlActeur = "https://workshop.neotechweb.net/ws/ciamovie/1.0.0/acteurs.php";
        const dataActeur = await fetch(urlActeur);
        const datajsonActeur = await dataActeur.json();
        const nomActeur = datajsonActeur.find(acteur => acteur.idActeur == film.Acteur).Nom;
        content.querySelector(".acteursFilm").innerText = nomActeur;
        
        listeFilms.appendChild(content);
    })
}