
/* ===== Idiomas: español, inglés, italiano y francés ===== */
(() => {
  const LANGS = ['es','en','it','fr'];
  const dict = {
    'Misiones':['Missions','Missioni','Missions'],'Tienda':['Shop','Negozio','Boutique'],'Logros':['Achievements','Obiettivi','Succès'],'Perfil':['Profile','Profilo','Profil'],'Ajustes':['Settings','Impostazioni','Paramètres'],
    'Cómo jugar':['How to play','Come si gioca','Comment jouer'],'Reiniciar partida':['Restart game','Riavvia partita','Recommencer'],'Restablecer progreso':['Reset progress','Azzera i progressi','Réinitialiser la progression'],
    'Sonido':['Sound','Audio','Son'],'Volumen de la música':['Music volume','Volume musica','Volume de la musique'],'Volumen de los efectos':['Effects volume','Volume effetti','Volume des effets'],'Juego':['Game','Gioco','Jeu'],'Gráficos':['Graphics','Grafica','Graphismes'],'Información':['Information','Informazioni','Informations'],'Política de privacidad':['Privacy policy','Informativa sulla privacy','Politique de confidentialité'],'Términos de uso':['Terms of use','Termini di utilizzo','Conditions d’utilisation'],'Acerca de':['About','Informazioni','À propos'],'Datos':['Data','Dati','Données'],'Cerrar':['Close','Chiudi','Fermer'],'Volver':['Back','Indietro','Retour'],'Cancelar':['Cancel','Annulla','Annuler'],'Continuar':['Continue','Continua','Continuer'],'Jugar':['Play','Gioca','Jouer'],'Jugar de nuevo':['Play again','Gioca ancora','Rejouer'],
    'Idioma':['Language','Lingua','Langue'],'Idioma actualizado':['Language updated','Lingua aggiornata','Langue mise à jour'],'Nombre guardado':['Name saved','Nome salvato','Nom enregistré'],
    'Puzzle diario':['Daily puzzle','Puzzle giornaliero','Puzzle quotidien'],'Puzzle diario ·':['Daily puzzle ·','Puzzle giornaliero ·','Puzzle quotidien ·'],'Objetivo de hoy':['Today’s goal','Obiettivo di oggi','Objectif du jour'],'Mejor progreso':['Best progress','Miglior progresso','Meilleure progression'],'Puzzle diario · Puntos':['Daily challenge · Score','Sfida del giorno · Punti','Défi du jour · Score'],'Puzzle diario · Líneas':['Daily challenge · Lines','Sfida del giorno · Linee','Défi du jour · Lignes'],'Puzzle diario · Racha':['Daily challenge · Streak','Sfida del giorno · Serie','Défi du jour · Série'],'Jugar reto':['Play challenge','Gioca la sfida','Jouer le défi'],'Repetir reto':['Replay challenge','Ripeti la sfida','Rejouer le défi'],'Mismo sorteo de piezas para todos · Funciona sin conexión':['Same piece sequence for everyone · Works offline','Stessa sequenza di pezzi per tutti · Funziona offline','Même séquence de pièces pour tous · Fonctionne hors ligne'],'Premio cobrado hoy':['Reward claimed today','Premio riscosso oggi','Récompense récupérée aujourd’hui'],'Puzzle diario completado · premio de hoy cobrado':['Challenge complete · today’s reward claimed','Sfida completata · premio di oggi riscosso','Défi terminé · récompense du jour récupérée'],'Puzzle diario':['Daily puzzle','Puzzle giornaliero','Puzzle quotidien'],'Misiones':['Missions','Missioni','Missions'],
    'COMBINA · EXPLOTA · EVOLUCIONA':['MATCH · BLAST · EVOLVE','ABBINA · ESPLODI · EVOLVI','ASSOCIE · EXPLOSE · ÉVOLUE'],'Objetivo':['Goal','Obiettivo','Objectif'],'Puntuación':['Score','Punteggio','Score'],'Movimientos':['Moves','Mosse','Coups'],'Racha':['Combo','Serie','Combo'],'Potenciadores':['Boosters','Potenziamenti','Bonus'],'Úsalos sin gastar movimientos':['Use them without spending moves','Usali senza consumare mosse','Utilisez-les sans dépenser de coups'],'Martillo':['Lollipop hammer','Martello lecca-lecca','Marteau sucette'],'Bomba':['Wrapped bomb','Bomba incartata','Bombe emballée'],'Arcoíris':['Color bomb','Bomba colore','Bombe de couleur'],'Mano':['Free switch','Scambio gratuito','Échange gratuit'],'Mapa':['Map','Mappa','Carte'],'Temas':['Themes','Temi','Thèmes'],'↻ Reiniciar':['↻ Restart','↻ Riavvia','↻ Recommencer'],'Volver al menú':['Back to menu','Torna al menu','Retour au menu'],'Tablero de gemas':['Gem board','Tavola delle gemme','Plateau de gemmes'],
    'Gemas preciosas':['Precious gems','Gemme preziose','Gemmes précieuses'],'Cristales':['Crystals','Cristalli','Cristaux'],'Rubí, ámbar, diamante, esmeralda, zafiro y amatista, cada uno con su propio corte.':['Ruby, amber, diamond, emerald, sapphire and amethyst, each with its own cut.','Rubino, ambra, diamante, smeraldo, zaffiro e ametista, ognuno con il proprio taglio.','Rubis, ambre, diamant, émeraude, saphir et améthyste, chacun avec sa propre taille.'],'Gemas facetadas y brillo clásico.':['Faceted gems with a classic shine.','Gemme sfaccettate dal bagliore classico.','Gemmes facettées et éclat classique.'],'Caramelos':['Candy','Caramelle','Bonbons'],'Dulces brillantes con envolturas de azúcar.':['Glossy sweets wrapped in sugar.','Dolci lucidi con involucri di zucchero.','Confiseries brillantes enrobées de sucre.'],'Frutas':['Fruit','Frutta','Fruits'],'Frutas jugosas y colores frescos.':['Juicy fruit and fresh colors.','Frutta succosa e colori freschi.','Fruits juteux et couleurs fraîches.'],'Pastelería':['Desserts','Dolci','Pâtisseries'],'Galletas, chocolate y pequeños postres.':['Cookies, chocolate and little desserts.','Biscotti, cioccolato e piccoli dessert.','Biscuits, chocolat et petits desserts.'],
    'En uso':['Equipped','In uso','Équipé'],'Aplicar':['Apply','Applica','Appliquer'],'Usar tema':['Use theme','Usa tema','Utiliser le thème'],'Comprar':['Buy','Compra','Acheter'],'Comprar tema':['Buy theme','Compra tema','Acheter le thème'],'Temas del Reino':['Kingdom themes','Temi del regno','Thèmes du royaume'],'Personaliza las piezas y el ambiente. Las compras se pagan con las monedas del juego.':['Customize the pieces and atmosphere. Purchases use in-game coins.','Personalizza le tessere e l’atmosfera. Gli acquisti si pagano con le monete del gioco.','Personnalisez les pièces et l’ambiance. Les achats se font avec les pièces du jeu.'],'Tu saldo:':['Your balance:','Il tuo saldo:','Votre solde :'],'Volver al tablero':['Back to board','Torna al tabellone','Retour au plateau'],'Mapa de gemas':['Gem map','Mappa delle gemme','Carte des gemmes'],'100 niveles de combinaciones, cascadas y poderes. Los niveles se desbloquean al superar el anterior.':['100 levels of matches, cascades and powers. Beat a level to unlock the next.','100 livelli di combinazioni, cascate e poteri. Supera un livello per sbloccare il successivo.','100 niveaux de combinaisons, cascades et pouvoirs. Terminez un niveau pour débloquer le suivant.'],'¡Casi lo tienes!':['So close!','Ci sei quasi!','Presque réussi !'],'Te has quedado sin movimientos. Prueba otra combinación o usa tus potenciadores para cambiar el tablero a tu favor.':['No moves left. Try another match or use a booster to turn the board in your favor.','Hai esaurito le mosse. Prova un’altra combinazione o usa un potenziamento.','Vous n’avez plus de coups. Essayez une autre combinaison ou utilisez un bonus.'],'¡Nivel superado!':['Level complete!','Livello completato!','Niveau terminé !'],'¡Leyenda de las gemas!':['Gem legend!','Leggenda delle gemme!','Légende des gemmes !'],'¡Dulce!':['Sweet!','Dolce!','Délicieux !'],'¡Delicioso!':['Delicious!','Delizioso!','Délicieux !'],'¡MEGA CASCADA!':['MEGA CASCADE!','MEGA CASCATA!','MÉGA CASCADE !'],'¡SUPER EXPLOSIÓN!':['SUPER BLAST!','SUPER ESPLOSIONE!','SUPER EXPLOSION !'],'¡COMBO CRUZADO!':['CROSS COMBO!','COMBO INCROCIATA!','COMBO CROISÉ !'],'¡LLUVIA ARCOÍRIS!':['RAINBOW RUSH!','PIOGGIA ARCOBALENO!','PLUIE ARC-EN-CIEL !'],'¡BOOM!':['BOOM!','BOOM!','BOUM !'],'¡Buena combinación! Busca cadenas de 4 o 5 gemas para crear poderes.':['Great match! Match 4 or 5 gems to create powers.','Bella combinazione! Abbina 4 o 5 gemme per creare poteri.','Belle combinaison ! Alignez 4 ou 5 gemmes pour créer des pouvoirs.'],'Ese intercambio no forma una combinación. Prueba otra gema.':['That swap does not make a match. Try another gem.','Questo scambio non crea una combinazione. Prova un’altra gemma.','Cet échange ne crée aucune combinaison. Essayez une autre gemme.'],'Tablero mezclado. ¡Encuentra una nueva combinación!':['Board shuffled. Find a new match!','Tabellone mescolato. Trova una nuova combinazione!','Plateau mélangé. Trouvez une nouvelle combinaison !'],'Potenciador utilizado: no consume movimientos.':['Booster used: no move spent.','Potenziamento usato: nessuna mossa consumata.','Bonus utilisé : aucun coup dépensé.'],'Restablecer progreso':['Reset progress','Azzera i progressi','Réinitialiser la progression'],'¿Restablecer progreso?':['Reset progress?','Azzerare i progressi?','Réinitialiser la progression ?'],'Se borrarán tus monedas, estrellas, compras, logros y estadísticas. Esta acción no se puede deshacer.':['Your coins, stars, purchases, achievements, stats and all 100 Gem Kingdom levels will be erased. This cannot be undone.','Saranno cancellati monete, stelle, acquisti, obiettivi, statistiche e tutti i 100 livelli del Regno delle gemme. L’azione è irreversibile.','Vos pièces, étoiles, achats, succès, statistiques et les 100 niveaux du Royaume des gemmes seront effacés. Cette action est irréversible.'],'Sí, borrar todo':['Yes, erase everything','Sì, cancella tutto','Oui, tout effacer'],'Cancelar':['Cancel','Annulla','Annuler'],'Progreso restablecido':['Progress reset','Progressi azzerati','Progression réinitialisée'],'Se han borrado los datos locales de todos los modos. El juego se reiniciará.':['Local data for all modes has been erased. The game will restart.','I dati locali di tutte le modalità sono stati cancellati. Il gioco si riavvierà.','Les données locales de tous les modes ont été effacées. Le jeu va redémarrer.'],'Continuar':['Continue','Continua','Continuer'],'Jugador':['Player','Giocatore','Joueur'],'Nivel':['Level','Livello','Niveau'],'Mejor:':['Best:','Record:','Record :'],'¡A combinar!':['Let’s match!','Abbiniamo!','À vous de jouer !'],'¡Intercambio gratuito! Busca una combinación nueva.':['Free swap! Find a new match.','Scambio gratuito! Trova una nuova combinazione.','Échange gratuit ! Trouvez une nouvelle combinaison.'],'Ahora toca una gema que esté justo al lado.':['Now tap an adjacent gem.','Ora tocca una gemma adiacente.','Touchez maintenant une gemme adjacente.'],'Mano mágica: toca cualquier otra pieza para intercambiarla gratis.':['Magic hand: tap any other piece to swap for free.','Mano magica: tocca un’altra tessera per scambiarla gratis.','Main magique : touchez une autre pièce pour l’échanger gratuitement.']
  };
  Object.assign(dict, {
    'Temas':['Themes','Temi','Thèmes'],'Temas del Reino':['Kingdom Themes','Temi del Regno','Thèmes du royaume'],'Limpio':['Clean','Pulito','Épuré'],'Paleta clara, limpia y luminosa':['Bright, clean and light palette','Palette chiara, pulita e luminosa','Palette claire, épurée et lumineuse'],'Medianoche':['Midnight','Mezzanotte','Minuit'],'Azul profundo, oscuro y envolvente':['Deep, dark and immersive blue','Blu profondo, scuro e avvolgente','Bleu profond, sombre et immersif'],
    'Reiniciar':['Restart','Riavvia','Recommencer'],'Se desbloquea en nivel':['Unlocks at level','Si sblocca al livello','Se débloque au niveau'],
    'Consigue puntos':['Earn points','Ottieni punti','Gagnez des points'],'Activa gemas especiales':['Activate special gems','Attiva gemme speciali','Activez les gemmes spéciales'],
    'Desliza una gema hacia una vecina para intercambiarlas.':['Swipe a gem toward an adjacent gem to swap them.','Scorri una gemma verso una gemma adiacente per scambiarle.','Faites glisser une gemme vers une gemme voisine pour les échanger.'],
    'Combina 4 o más gemas para crear poderes y actívalos.':['Match 4 or more gems to create powers and activate them.','Abbina 4 o più gemme per creare poteri e attivarli.','Associez 4 gemmes ou plus pour créer des pouvoirs et les activer.'],
    'Intercambio cancelado.':['Swap cancelled.','Scambio annullato.','Échange annulé.'],'Selección cancelada.':['Selection cancelled.','Selezione annullata.','Sélection annulée.'],
    'Elige una gema vecina, arriba, abajo o a un lado.':['Choose an adjacent gem above, below, or to either side.','Scegli una gemma vicina sopra, sotto o ai lati.','Choisissez une gemme adjacente en haut, en bas ou sur un côté.'],
    '¡Combinación!':['Match!','Abbinamento!','Association !'],'¡Mano mágica!':['Magic hand!','Mano magica!','Main magique !'],
    '¡Martillo mágico!':['Magic hammer!','Martello magico!','Marteau magique !'],'¡Explosión envuelta!':['Wrapped explosion!','Esplosione incartata!','Explosion emballée !'],'¡Bomba de color!':['Color bomb!','Bomba colore!','Bombe de couleur !'],
    'Potenciador cancelado.':['Booster cancelled.','Potenziamento annullato.','Bonus annulé.'],'Nivel bloqueado':['Level locked','Livello bloccato','Niveau verrouillé'],'Celda vacía':['Empty cell','Cella vuota','Case vide'],
    'Tema no encontrado.':['Theme not found.','Tema non trovato.','Thème introuvable.'],
    'Jardín':['Garden','Giardino','Jardin'],'Flores de colores y pequeñas maravillas naturales.':['Colorful flowers and little natural wonders.','Fiori colorati e piccole meraviglie naturali.','Des fleurs colorées et de petites merveilles naturelles.'],
    'Galaxia':['Galaxy','Galassia','Galaxie'],'Planetas brillantes y polvo de estrellas.':['Shining planets and stardust.','Pianeti luminosi e polvere di stelle.','Planètes brillantes et poussière d’étoiles.'],
    'Neón':['Neon','Neon','Néon'],'Piezas luminosas en tonos eléctricos.':['Glowing pieces in electric colors.','Pezzi luminosi dai toni elettrici.','Pièces lumineuses aux tons électriques.'],
    'En uso':['Equipped','In uso','Équipé'],'Usar tema':['Use theme','Usa tema','Utiliser le thème'],'Comprado':['Purchased','Acquistato','Acheté'],
    'Misiones diarias':['Daily missions','Missioni giornaliere','Missions quotidiennes'],'Misiones semanales':['Weekly missions','Missioni settimanali','Missions hebdomadaires'],
    'Monedas gratis':['Free coins','Monete gratis','Pièces gratuites'],'Mira un anuncio y gana':['Watch an ad and earn','Guarda un annuncio e guadagna','Regardez une publicité et gagnez'],
    'Ocultar modo desarrollador':['Hide developer mode','Nascondi modalità sviluppatore','Masquer le mode développeur'],'Ajustes del juego':['Game settings','Impostazioni di gioco','Paramètres du jeu'],
    'Reiniciar misiones':['Reset missions','Azzera missioni','Réinitialiser les missions'],'Récord':['Record','Record','Record'],'Líneas':['Lines','Linee','Lignes'],
    'Nivel superado':['Level complete','Livello completato','Niveau terminé'],'Mapa de gemas':['Gem map','Mappa delle gemme','Carte des gemmes'],
    '¿Restablecer progreso?':['Reset progress?','Azzerare i progressi?','Réinitialiser la progression ?'],
    'Intentar otra vez':['Try again','Riprova','Réessayer'],'Siguiente nivel →':['Next level →','Livello successivo →','Niveau suivant →'],'Ver niveles':['View levels','Vedi i livelli','Voir les niveaux'],
    'Martillo: toca una pieza para romperla.':['Hammer: tap a piece to smash it.','Martello: tocca una tessera per romperla.','Marteau : touchez une pièce pour la casser.'],
    'Bomba envuelta: toca una pieza y estalla un área de 3×3.':['Wrapped bomb: tap a piece to blast a 3×3 area.','Bomba incartata: tocca una tessera per far esplodere un’area 3×3.','Bombe emballée : touchez une pièce pour faire exploser une zone 3×3.'],
    'Bomba de color: toca una pieza para eliminar todas las de su color.':['Color bomb: tap a piece to remove all gems of its color.','Bomba colore: tocca una tessera per eliminare tutte quelle del suo colore.','Bombe de couleur : touchez une pièce pour éliminer toutes celles de sa couleur.'],
    'Mano mágica: elige dos piezas cualesquiera para intercambiarlas gratis.':['Magic hand: choose any two pieces to swap them for free.','Mano magica: scegli due tessere qualsiasi per scambiarle gratis.','Main magique : choisissez deux pièces pour les échanger gratuitement.'],
    'Mano mágica: ahora toca cualquier otra pieza para intercambiarla gratis.':['Magic hand: now tap any other piece to swap it for free.','Mano magica: ora tocca un’altra tessera per scambiarla gratis.','Main magique : touchez maintenant une autre pièce pour l’échanger gratuitement.'],
    '¡Intercambio cancelado!':['Swap cancelled!','Scambio annullato!','Échange annulé !'],'¡Tema aplicado!':['Theme applied!','Tema applicato!','Thème appliqué !'],
    '¡A combinar!':['Let’s match!','Abbiniamo!','À vous de jouer !'],'¡Comprado!':['Purchased!','Acquistato!','Acheté !'],
    'Modo niveles':['Level mode','Modalità livelli','Mode niveaux'],'Modo infinito':['Endless mode','Modalità infinita','Mode infini'],
    'Modo clásico':['Classic mode','Modalità classica','Mode classique'],'100 niveles · Crea combos y poderes':['100 levels · Build combos and power-ups','100 livelli · Crea combo e poteri','100 niveaux · Créez des combos et des pouvoirs']
  });
  Object.assign(dict, {
    'Tiempo activo':['Active time','Tempo attivo','Temps actif'],
    'Esta versión guarda el progreso y las preferencias localmente en el dispositivo y no necesita una cuenta. No muestra anuncios hasta que la aplicación contenedora integre un proveedor publicitario real. Si se incorporan servicios externos, esta política deberá actualizarse antes de publicar esa versión.':['This version stores progress and preferences locally on the device and does not require an account. It shows no ads until the host app integrates a real ad provider. If external services are added, this policy must be updated before that version is published.','Questa versione salva progressi e preferenze localmente sul dispositivo e non richiede un account. Non mostra annunci finché l’app contenitore non integra un vero provider pubblicitario. Se verranno aggiunti servizi esterni, questa informativa dovrà essere aggiornata prima della pubblicazione.','Cette version enregistre localement la progression et les préférences sur l’appareil et ne nécessite aucun compte. Elle n’affiche aucune publicité tant que l’application hôte n’intègre pas de véritable fournisseur publicitaire. Si des services externes sont ajoutés, cette politique devra être mise à jour avant publication.'],
    'Cuatro modos de juego, reto diario, tienda, misiones y logros. La música y los efectos de sonido se generan dentro del propio juego.':['Four game modes, a daily challenge, a store, missions and achievements. Music and sound effects are generated within the game.','Quattro modalità di gioco, sfida giornaliera, negozio, missioni e obiettivi. La musica e gli effetti sonori sono generati dal gioco.','Quatre modes de jeu, un défi quotidien, une boutique, des missions et des succès. La musique et les effets sonores sont générés dans le jeu.'],
    'Los anuncios todavía no están conectados. No se ha consumido ningún recurso.':['Ads are not connected yet. No resource has been used.','Gli annunci non sono ancora collegati. Non è stata consumata alcuna risorsa.','Les publicités ne sont pas encore connectées. Aucune ressource n’a été consommée.'],
    'Los anuncios todavía no están conectados en esta versión.':['Ads are not connected in this version yet.','Gli annunci non sono ancora collegati in questa versione.','Les publicités ne sont pas encore connectées dans cette version.'],
    'No se pudo cargar el anuncio. No se ha consumido ningún recurso.':['The ad could not be loaded. No resource has been used.','Impossibile caricare l’annuncio. Non è stata consumata alcuna risorsa.','Impossible de charger la publicité. Aucune ressource n’a été consommée.'],
    'Puzzle diario completado · premio de hoy cobrado':['Challenge completed · today’s reward claimed','Sfida completata · premio di oggi riscosso','Défi terminé · récompense du jour récupérée'],
    'PUZZLE DIARIO':['DAILY PUZZLE','PUZZLE GIORNALIERO','PUZZLE QUOTIDIEN'],
    'Puzzle diario':['Daily puzzle','Puzzle giornaliero','Puzzle quotidien'],
    'Objetivo de hoy':['Today’s goal','Obiettivo di oggi','Objectif du jour'],
    'Mejor progreso':['Best progress','Miglior progresso','Meilleure progression'],
    'al completar':['on completion','al completamento','à la fin'],
    'Jugar reto':['Play challenge','Gioca la sfida','Jouer le défi'],
    'Repetir reto':['Replay challenge','Ripeti la sfida','Rejouer le défi'],
    'Mismo sorteo de piezas para todos · Funciona sin conexión':['Same piece sequence for everyone · Works offline','Stessa sequenza di pezzi per tutti · Funziona offline','Même séquence de pièces pour tous · Fonctionne hors ligne'],
    'Premio cobrado hoy':['Reward claimed today','Premio riscosso oggi','Récompense récupérée aujourd’hui'],
    'Anuncios todavía no disponibles':['Ads are not available yet','Annunci non ancora disponibili','Publicités pas encore disponibles'],
    'Consigue puntos':['Earn points','Ottieni punti','Gagnez des points'],
    'Recolecta gemas':['Collect gems','Raccogli gemme','Récoltez des gemmes'],
    'Activa gemas especiales':['Activate special gems','Attiva gemme speciali','Activez les gemmes spéciales'],
    'Rompe bloques de roca':['Break rock blocks','Rompi i blocchi di roccia','Brisez les blocs de roche'],
    'Bloque de roca':['Rock block','Blocco di roccia','Bloc de roche'],
    'resistente':['reinforced','resistente','renforcé'],
    'Rompe los bloques de roca combinando gemas justo a su lado.':['Break rock blocks by matching gems right next to them.','Rompi i blocchi di roccia abbinando gemme accanto a loro.','Brisez les blocs de roche en associant des gemmes juste à côté.'],
    'Primeros niveles: juega durante 3 minutos activos, encadena fases y completa el objetivo.':['Early levels: play for 3 active minutes, chain phases and complete the objective.','Primi livelli: gioca per 3 minuti attivi, supera le fasi e completa l’obiettivo.','Premiers niveaux : jouez pendant 3 minutes actives, enchaînez les phases et terminez l’objectif.'],
    '¡Fase! El reto aumenta: crea combinaciones, rompe rocas y encadena poderes.':['Phase cleared! The challenge rises: make matches, break rocks and chain powers.','Fase completata! La sfida aumenta: abbina gemme, rompi rocce e concatena poteri.','Phase terminée ! Le défi augmente : associez des gemmes, brisez des roches et enchaînez les pouvoirs.'],
    'objetivos variables':['varied objectives','obiettivi variabili','objectifs variés']
  });
  Object.assign(dict, {
    'Fase de reto: crea combinaciones, rompe rocas y encadena poderes.':['Challenge phase: make matches, break rocks and chain powers.','Fase sfida: abbina gemme, rompi rocce e concatena poteri.','Phase défi : associez des gemmes, brisez des roches et enchaînez les pouvoirs.'],
    '100 niveles con objetivos variables, cascadas, rocas resistentes y poderes. Los niveles se desbloquean al superar el anterior.':['100 levels with varied goals, cascades, reinforced rocks and powers. Beat each level to unlock the next.','100 livelli con obiettivi vari, cascate, rocce resistenti e poteri. Supera ogni livello per sbloccare il successivo.','100 niveaux avec des objectifs variés, des cascades, des roches renforcées et des pouvoirs. Terminez chaque niveau pour débloquer le suivant.']
  });
  const dictES = Object.keys(dict);
  const localized = Object.fromEntries(LANGS.map((lang,i)=>[lang,Object.fromEntries(dictES.map(es=>[es,i===0?es:dict[es][i-1]]))]));
  const canonical = new WeakMap();
  const norm = s => (s||'').replace(/\s+/g,' ').trim();
  function langNow(){ let l='es'; try{const p=JSON.parse(localStorage.getItem('blockpuzzle.v2')||'{}');if(LANGS.includes(p.lang))l=p.lang;}catch(_){} return l; }
  function dynamic(t,lang){
    const i=LANGS.indexOf(lang);
    const themeNames={
      'Gemas preciosas':['Precious gems','Gemme preziose','Gemmes précieuses'],'Cristales':['Crystals','Cristalli','Cristaux'],'Caramelos':['Candy','Caramelle','Bonbons'],
      'Limpio':['Clean','Pulito','Épuré'],'Medianoche':['Midnight','Mezzanotte','Minuit'],
      'Frutas':['Fruit','Frutta','Fruits'],'Pastelería':['Desserts','Dolci','Pâtisseries'],'Cuarzo solar':['Solar quartz','Quarzo solare','Quartz solaire'],
      'Jardín':['Garden','Giardino','Jardin'],
      'Galaxia':['Galaxy','Galassia','Galaxie'],'Neón':['Neon','Neon','Néon'],
      'Caramelo':['Candy','Caramella','Bonbon'],'Píxel':['Pixel','Pixel','Pixel'],'Hielo':['Ice','Ghiaccio','Glace'],'Madera':['Wood','Legno','Bois'],'Gominola':['Gummy candy','Caramella gommosa','Bonbon gélifié'],
      'Cristal solar':['Solar crystal','Cristallo solare','Cristal solaire'],'Atardecer':['Sunset','Tramonto','Coucher de soleil'],'Aurora':['Aurora','Aurora','Aurore'],'Prisma':['Prism','Prisma','Prisme'],'Esmeralda':['Emerald','Smeraldo','Émeraude'],
      'Piedra lunar':['Moonstone','Pietra di luna','Pierre de lune'],'Acero titanio':['Titanium steel','Acciaio al titanio','Acier titane'],'Obsidiana':['Obsidian','Ossidiana','Obsidienne'],
      'Laca brillante y biseles suaves':['Gloss lacquer and soft bevels','Lacca lucida e smussi morbidi','Laque brillante et biseaux doux'],
      'Tubos luminosos con barrido de energía':['Glowing tubes with an energy sweep','Tubi luminosi con passaggio energetico','Tubes lumineux avec balayage d’énergie'],
      'Bloques retro con sombreado por píxel':['Retro blocks with pixel shading','Blocchi retrò con ombreggiatura pixel','Blocs rétro ombrés au pixel'],
      'Hielo translúcido, cortes y grietas':['Translucent ice, cuts and cracks','Ghiaccio traslucido, tagli e crepe','Glace translucide, facettes et fissures'],
      'Madera tallada con vetas y nudos':['Carved wood with grain and knots','Legno intagliato con venature e nodi','Bois sculpté avec veinage et nœuds'],
      'Gel translúcido con brillo húmedo':['Translucent gel with a wet shine','Gel traslucido con riflessi umidi','Gel translucide à reflet humide'],
      'Cristal facetado con reflejos prismáticos':['Faceted crystal with prismatic reflections','Cristallo sfaccettato con riflessi prismatici','Cristal facetté aux reflets prismatiques'],
      'Roca volcánica con fisuras incandescentes':['Volcanic rock with glowing fissures','Roccia vulcanica con crepe incandescenti','Roche volcanique aux fissures incandescentes'],
      'Bandas boreales que se desplazan':['Moving aurora bands','Bande dell’aurora in movimento','Rubans d’aurore en mouvement'],
      'Espectro iridiscente animado':['Animated iridescent spectrum','Spettro iridescente animato','Spectre irisé animé'],
      'Cortes profundos de piedra preciosa':['Deep gemstone cuts','Tagli profondi di gemma','Tailles profondes de pierre précieuse'],
      'Nebulosas y estrellas centelleantes':['Nebulae and twinkling stars','Nebulose e stelle scintillanti','Nébuleuses et étoiles scintillantes'],
      'Mineral mate con vetas y pequeñas inclusiones':['Matte mineral with veins and inclusions','Minerale opaco con venature e inclusioni','Minéral mat avec veines et inclusions'],
      'Metal cepillado, biseles y remaches':['Brushed metal, bevels and rivets','Metallo spazzolato, smussi e rivetti','Métal brossé, biseaux et rivets'],
      'Vidrio volcánico oscuro con luz violeta móvil':['Dark volcanic glass with moving violet light','Vetro vulcanico scuro con luce viola in movimento','Verre volcanique sombre à lumière violette mobile'],
      'Animación viva':['Animated','Animato','Animé']
    };
    const themeName=name=>themeNames[name]?.[i-1]||name;
    // Translate names and short material descriptions that are rendered dynamically by the shop.
    if (themeNames[t]) return themeName(t);
    const modeNames={'Modo niveles':['Level mode','Modalità livelli','Mode niveaux'],'Modo infinito':['Endless mode','Modalità infinita','Mode infini'],'Modo clásico':['Classic mode','Modalità classica','Mode classique']};
    const modeName=name=>modeNames[name]?.[i-1]||themeName(name);
    let m;
    if((m=t.match(/^(?:NIVEL|Nivel) (\d+) \/ 100$/))) return [`LEVEL ${m[1]} / 100`,`LIVELLO ${m[1]} / 100`,`NIVEAU ${m[1]} / 100`][i-1]||`NIVEL ${m[1]} / 100`;
    if((m=t.match(/^Nivel (\d+)$/))) return [`Level ${m[1]}`,`Livello ${m[1]}`,`Niveau ${m[1]}`][i-1]||t;
    if((m=t.match(/^Nivel (\d+) — ★ (\d+)$/))) return [`Level ${m[1]} — ★ ${m[2]}`,`Livello ${m[1]} — ★ ${m[2]}`,`Niveau ${m[1]} — ★ ${m[2]}`][i-1]||t;
    if((m=t.match(/^Récord (\d+)$/))) return [`Record ${m[1]}`,`Record ${m[1]}`,`Record ${m[1]}`][i-1]||t;
    if((m=t.match(/^Bloques que caen — Récord (\d+)$/))) return [`Falling blocks — Record ${m[1]}`,`Blocchi in caduta — Record ${m[1]}`,`Blocs qui tombent — Record ${m[1]}`][i-1]||t;
    if((m=t.match(/^(.+), bloqueado hasta el nivel (\d+)$/))) return [`${modeName(m[1])}, locked until level ${m[2]}`,`${modeName(m[1])}, bloccato fino al livello ${m[2]}`,`${modeName(m[1])}, verrouillé jusqu’au niveau ${m[2]}`][i-1]||t;
    if((m=t.match(/^Mejor: ([\d.,]+)$/))) return [`Best: ${m[1]}`,`Record: ${m[1]}`,`Record : ${m[1]}`][i-1]||t;
    if((m=t.match(/^Te faltan (\d+) monedas para (.+)\.$/))) return [`You need ${m[1]} more coins for ${themeName(m[2])}.`,`Ti mancano ${m[1]} monete per ${themeName(m[2])}.`,`Il vous manque ${m[1]} pièces pour ${themeName(m[2])}.`][i-1]||t;
    if((m=t.match(/^Comprar · (\d+) monedas$/))) return [`Buy · ${m[1]} coins`,`Compra · ${m[1]} monete`,`Acheter · ${m[1]} pièces`][i-1]||t;
    if((m=t.match(/^Tu saldo: (\d+) monedas$/))) return [`Your balance: ${m[1]} coins`,`Il tuo saldo: ${m[1]} monete`,`Votre solde : ${m[1]} pièces`][i-1]||t;
    if((m=t.match(/^Se desbloquea en nivel (\d+)$/))) return [`Unlocks at level ${m[1]}`,`Si sblocca al livello ${m[1]}`,`Se débloque au niveau ${m[1]}`][i-1]||t;
    if((m=t.match(/^Sigue avanzando: este modo se desbloquea al llegar al nivel (\d+)\.$/))) return [`Keep progressing: this mode unlocks at level ${m[1]}.`,`Continua a progredire: questa modalità si sblocca al livello ${m[1]}.`,`Continuez à progresser : ce mode se débloque au niveau ${m[1]}.`][i-1]||t;
    if((m=t.match(/^¡Cascada ×(\d+)! Sigue combinando para multiplicar puntos\.$/))) return [`Cascade ×${m[1]}! Keep matching to multiply your score.`,`Cascata ×${m[1]}! Continua ad abbinare per moltiplicare i punti.`,`Cascade ×${m[1]} ! Continuez à associer pour multiplier le score.`][i-1]||t;
    if((m=t.match(/^Objetivo cumplido en el nivel (\d+)\. Tu siguiente reto es el nivel (\d+)\.$/))) return [`Goal complete on level ${m[1]}. Your next challenge is level ${m[2]}.`,`Obiettivo completato al livello ${m[1]}. La prossima sfida è il livello ${m[2]}.`,`Objectif atteint au niveau ${m[1]}. Votre prochain défi est le niveau ${m[2]}.`][i-1]||t;
    if((m=t.match(/^Nivel (\d+) — ([\d/]+) XP$/))) return [`Level ${m[1]} — ${m[2]} XP`,`Livello ${m[1]} — ${m[2]} XP`,`Niveau ${m[1]} — ${m[2]} XP`][i-1]||t;
    if((m=t.match(/^NIVEL (\d+) \/ 100$/))) return [`LEVEL ${m[1]} / 100`,`LIVELLO ${m[1]} / 100`,`NIVEAU ${m[1]} / 100`][i-1]||t;
    if((m=t.match(/^Recolecta gemas de (.+)$/))) {
      const colorNames={'rubí':['ruby','rubino','rubis'],'ámbar':['amber','ambra','ambre'],'diamante':['diamond','diamante','diamant'],'esmeralda':['emerald','smeraldo','émeraude'],'zafiro':['sapphire','zaffiro','saphir'],'amatista':['amethyst','ametista','améthyste']};
      const c=colorNames[m[1]]||[m[1],m[1],m[1]];
      return [`Collect ${c[0]} gems`,`Raccogli gemme ${c[1]}`,`Collectez les gemmes ${c[2]}`][i-1]||t;
    }
    if((m=t.match(/^Tema aplicado: (.+)\. ¡A combinar!$/))) return [`Theme applied: ${themeName(m[1])}. Let's match!`,`Tema applicato: ${themeName(m[1])}. Abbiniamo!`,`Thème appliqué : ${themeName(m[1])}. À vous de jouer !`][i-1]||t;
    if((m=t.match(/^Tema aplicado: (.+)\.$/))) return [`Theme applied: ${themeName(m[1])}.`,`Tema applicato: ${themeName(m[1])}.`,`Thème appliqué : ${themeName(m[1])}.`][i-1]||t;
    if((m=t.match(/^¡Comprado! (.+)$/))) return [`Purchased! ${m[1]}`,`Acquistato! ${m[1]}`,`Acheté ! ${m[1]}`][i-1]||t;
    if((m=t.match(/^¡Tema (.+) desbloqueado y equipado!$/))) return [`Theme ${themeName(m[1])} unlocked and equipped!`,`Tema ${themeName(m[1])} sbloccato ed equipaggiato!`,`Thème ${themeName(m[1])} débloqué et équipé !`][i-1]||t;
    if((m=t.match(/^Te faltan (\d+) monedas para (.+)\.$/))) return [`You need ${m[1]} more coins for ${themeName(m[2])}.`,`Ti mancano ${m[1]} monete per ${themeName(m[2])}.`,`Il vous manque ${m[1]} pièces pour ${themeName(m[2])}.`][i-1]||t;
    if((m=t.match(/^\+?(\d+) monedas$/))) return [`${m[1]} coins`,`${m[1]} monete`,`${m[1]} pièces`][i-1]||t;
    if((m=t.match(/^(Gema|Fruta|Caramelo|Dulce|Tesoro marino|Flor|Elemento espacial|Cristal de neón) (rubí|ámbar|diamante|esmeralda|zafiro|amatista)(?:, poder (row|col|bomb|rainbow))?, fila (\d+), columna (\d+)$/))) {
      const thing={'Gema':['Gem','Gemma','Gemme'],'Fruta':['Fruit','Frutto','Fruit'],'Caramelo':['Candy','Caramella','Bonbon'],'Dulce':['Sweet','Dolce','Confiserie'],'Flor':['Flower','Fiore','Fleur'],'Elemento espacial':['Space item','Oggetto spaziale','Objet spatial'],'Cristal de neón':['Neon crystal','Cristallo al neon','Cristal néon']};
      const colors={'rubí':['ruby','rubino','rubis'],'ámbar':['amber','ambra','ambre'],'diamante':['diamond','diamante','diamant'],'esmeralda':['emerald','smeraldo','émeraude'],'zafiro':['sapphire','zaffiro','saphir'],'amatista':['amethyst','ametista','améthyste']};
      const powers={'row':['horizontal line power','potere linea orizzontale','pouvoir ligne horizontale'],'col':['vertical line power','potere linea verticale','pouvoir ligne verticale'],'bomb':['bomb power','potere bomba','pouvoir bombe'],'rainbow':['rainbow power','potere arcobaleno','pouvoir arc-en-ciel']};
      const thingText=thing[m[1]]||[m[1],m[1],m[1]], colorText=colors[m[2]]||[m[2],m[2],m[2]], powerText=m[3]?powers[m[3]]:null;
      return [`${thingText[0]} ${colorText[0]}${powerText?', '+powerText[0]:''}, row ${m[4]}, column ${m[5]}`,`${thingText[1]} ${colorText[1]}${powerText?', '+powerText[1]:''}, riga ${m[4]}, colonna ${m[5]}`,`${thingText[2]} ${colorText[2]}${powerText?', '+powerText[2]:''}, ligne ${m[4]}, colonne ${m[5]}`][i-1]||t;
    }
    if((m=t.match(/^Nivel (\d+) bloqueado$/))) return [`Level ${m[1]} locked`,`Livello ${m[1]} bloccato`,`Niveau ${m[1]} verrouillé`][i-1]||t;
    if((m=t.match(/^Consigue (\d+) puntos en una partida$/))) return [`Score ${m[1]} points in one run`,`Ottieni ${m[1]} punti in una partita`,`Marquez ${m[1]} points en une partie`][i-1]||t;
    if((m=t.match(/^Puzzle diario · (\d{4}-\d{2}-\d{2})$/))) return [`Daily puzzle · ${m[1]}`,`Puzzle giornaliero · ${m[1]}`,`Puzzle quotidien · ${m[1]}`][i-1]||t;
    if((m=t.match(/^Limpia (\d+) líneas en una partida$/))) return [`Clear ${m[1]} lines in one run`,`Completa ${m[1]} linee in una partita`,`Effacez ${m[1]} lignes en une partie`][i-1]||t;
    if((m=t.match(/^Alcanza una racha ×(\d+)$/))) return [`Reach a ×${m[1]} streak`,`Raggiungi una serie ×${m[1]}`,`Atteignez une série ×${m[1]}`][i-1]||t;
    if((m=t.match(/^(\d+) puntos$/))) return [`${m[1]} points`,`${m[1]} punti`,`${m[1]} points`][i-1]||t;
    if((m=t.match(/^(\d+) líneas$/))) return [`${m[1]} lines`,`${m[1]} linee`,`${m[1]} lignes`][i-1]||t;
    if((m=t.match(/^Puzzle diario · (Puntos|Líneas|Racha)$/))) { const x={Puntos:['Score','Punti','Score'],Líneas:['Lines','Linee','Lignes'],Racha:['Streak','Serie','Série']}[m[1]]; return [`Daily challenge · ${x[0]}`,`Sfida del giorno · ${x[1]}`,`Défi du jour · ${x[2]}`][i-1]||t; }
    if((m=t.match(/^(\d+) \/ (\d+) puntos$/))) return [`${m[1]} / ${m[2]} points`,`${m[1]} / ${m[2]} punti`,`${m[1]} / ${m[2]} points`][i-1]||t;
    if((m=t.match(/^(\d+) \/ (\d+) líneas$/))) return [`${m[1]} / ${m[2]} lines`,`${m[1]} / ${m[2]} linee`,`${m[1]} / ${m[2]} lignes`][i-1]||t;
    if((m=t.match(/^Racha: (\d+) días$/))) return [`Streak: ${m[1]} days`,`Serie: ${m[1]} giorni`,`Série : ${m[1]} jours`][i-1]||t;
    if((m=t.match(/^¡Puzzle diario completado! \+(\d+) monedas$/))) return [`Daily puzzle complete! +${m[1]} coins`,`Puzzle giornaliero completato! +${m[1]} monete`,`Puzzle quotidien terminé ! +${m[1]} pièces`][i-1]||t;
    if((m=t.match(/^Mejor de hoy: (\d+) \/ (\d+)\. Inténtalo mañana o repite para mejorar\.$/))) return [`Best today: ${m[1]} / ${m[2]}. Try again tomorrow or replay to improve.`,`Miglior risultato di oggi: ${m[1]} / ${m[2]}. Riprova domani o gioca ancora per migliorare.`,`Meilleur résultat du jour : ${m[1]} / ${m[2]}. Réessayez demain ou rejouez pour progresser.`][i-1]||t;
    return null;
  }
  function translateText(raw, lang, node){
    if(!raw.trim())return raw;
    const leading=raw.match(/^\s*/)?.[0]||'', trailing=raw.match(/\s*$/)?.[0]||'';
    const key=norm(raw);
    let base=canonical.get(node);
    if(base===undefined){base=key;canonical.set(node,base);}
    let out=base;
    if(lang!=='es') out=localized[lang]?.[base] ?? dynamic(base,lang) ?? base;
    return leading+out+trailing;
  }
  function visit(node, lang){
    if(node.nodeType===Node.TEXT_NODE){
      const p=node.parentElement;
      if(!p || p.closest('script,style,textarea,input,option,code'))return;
      const v=translateText(node.nodeValue,lang,node);if(v!==node.nodeValue)node.nodeValue=v;return;
    }
    if(node.nodeType!==Node.ELEMENT_NODE && node!==document.body)return;
    if(node.nodeType===Node.ELEMENT_NODE && /^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION|CODE)$/.test(node.tagName))return;
    if(node.nodeType===Node.ELEMENT_NODE){
      for(const attr of ['aria-label','title','placeholder']){
        const raw=node.getAttribute(attr);if(raw){const original=node.dataset['i18nOrig'+attr.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]??raw;node.dataset['i18nOrig'+attr.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=original;const key=norm(original);const out=lang==='es'?original:(localized[lang]?.[key]??dynamic(key,lang)??original);if(out!==raw)node.setAttribute(attr,out);}
      }
    }
    for(const child of Array.from(node.childNodes||[]))visit(child,lang);
  }
  let current='';
  function apply(lang=langNow()){ if(!LANGS.includes(lang))lang='es';current=lang;document.documentElement.lang=lang;document.title=({es:'Raddykall Puzzle Deluxe v34 — Edición sin Reino de Gemas',en:'Raddykall Puzzle Deluxe v34 — Gem mode removed',it:'Raddykall Puzzle Deluxe v34 — Modalità gemme rimossa',fr:'Raddykall Puzzle Deluxe v34 — Mode gemmes supprimé'})[lang];visit(document.body,lang); }
  apply();
  const mo=new MutationObserver(records=>{if(current==='es')return;for(const r of records){if(r.type==='childList')r.addedNodes.forEach(n=>visit(n,current));else if(r.type==='characterData')visit(r.target,current);}});
  mo.observe(document.body,{subtree:true,childList:true,characterData:true});
  window.addEventListener('raddykall:language-change',e=>apply(e.detail?.lang||langNow()));
})();
