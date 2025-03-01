import React from 'react';
import './Home.css'; // Assurez-vous d'importer le fichier CSS

function Home() {
  return (
    <div>
      <div className="module">
        <section class="home-intro">
          <h1>Bienvenue sur Tutikone 🎉</h1>
          <p>
            Ras-le-bol des quiz de culture générale qui effleurent les sujets sans jamais creuser ?
            Tu aimerais enfin des questions qui vont au-delà des évidences et qui explorent les vraies anecdotes connues des experts ?
            <strong>Tutikone</strong> est la première plateforme de quiz collaboratif qui mise sur des questions pointues, sourcées et classées intelligemment.
          </p>

          <h2>🧐 Des quiz qui sortent des sentiers battus</h2>
          <p>
            Trop souvent, les quiz en ligne mélangent des sujets sans lien entre eux et restent en surface. Ici, les questions sont organisées avec précision :
            <strong> thèmes → catégories → sujets</strong>.
            Et comme un sujet peut appartenir à plusieurs catégories, tu peux toujours retrouver ce qui t'intéresse !
          </p>

          <h2>📚 Une base de connaissances fiable et enrichie par tous</h2>
          <p>
            Chaque question est accompagnée d'une source vérifiable pour éviter les erreurs courantes dans les quiz classiques.
            Tu peux aussi challenger les réponses et proposer des améliorations pour affiner la qualité du contenu.
          </p>

          <h2>💡 Un niveau de difficulté ajusté par la communauté</h2>
          <p>
            Une question est initialement notée en difficulté par son créateur, mais les autres utilisateurs peuvent la réévaluer.
            Fini les "questions faciles" qui ne le sont pas ou les "questions difficiles" trop basiques !
          </p>

          <h2>🎯 Rejoins la plus grande base de quiz expert</h2>
          <p>
            Joue, apprends, partage tes connaissances et contribue à bâtir une base de quiz aussi fun qu’exigeante.
            <strong>Enfin un quiz qui respecte les passionnés et les experts !</strong>
          </p>

          <p><a href="/register" class="cta-button">Rejoins-nous dès maintenant !</a></p>
        </section>



      </div>
    </div>
  );
}

export default Home;