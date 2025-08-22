import React, { useState, useEffect } from 'react';
import { Search, Plus, Heart, Share2, Trophy, BookOpen, Users, Star, TrendingUp, Globe, MessageCircle, UserPlus, Target, CheckCircle, Clock, Award } from 'lucide-react';

const SpeakZApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [currentPageWords, setCurrentPageWords] = useState(1);
  const [currentPagePosts, setCurrentPagePosts] = useState(1);
  const [itemsPerPage] = useState(8);
  const [postsPerPage] = useState(5);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 
                 /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type, timestamp: Date.now() };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => removeNotification(id), 4000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // États simplifiés (sans localStorage)
  const [userPoints, setUserPoints] = useState(1250);
  const [dailyWord, setDailyWord] = useState(null);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [challengeAnswers, setChallengeAnswers] = useState({});
  const [streakDays, setStreakDays] = useState(3);
  const [lastPlayDate, setLastPlayDate] = useState(new Date().toDateString());
  const [speedCorrectAnswers, setSpeedCorrectAnswers] = useState(0);
  const [challengeTimer, setChallengeTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [newWord, setNewWord] = useState({ word: '', definition: '', example: '' });
  const [translateFrom, setTranslateFrom] = useState('');
  const [translateTo, setTranslateTo] = useState('');
  const [translating, setTranslating] = useState(false);
  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 1,
      author: "SlangMaster",
      content: "Qui connaît l'origine du mot 'seum' ?",
      likes: 23,
      comments: [],
      time: "il y a 2h"
    }
  ]);
  const [newPost, setNewPost] = useState('');
  const [shareModal, setShareModal] = useState({ show: false, post: null });
  const [userCreations, setUserCreations] = useState([]);

  const slangWords = [
    { word: "guedin", definition: "Dingue (verlan)", example: "Ce mec est guedin", votes: 156, trending: true },
    { word: "seum", definition: "Être énervé, dépité", example: "J'ai le seum", votes: 324, trending: true },
    { word: "dead", definition: "Mort de rire", example: "Je suis dead", votes: 445, trending: true },
    { word: "ouf", definition: "Fou (verlan)", example: "C'est ouf", votes: 389, trending: true },
    { word: "zarbi", definition: "Bizarre (verlan)", example: "Cette histoire est zarbi", votes: 198, trending: false },
    { word: "meuf", definition: "Femme (verlan)", example: "Cette meuf est sympa", votes: 456, trending: false },
    { word: "reuf", definition: "Frère (verlan)", example: "Mon reuf arrive", votes: 234, trending: false },
    { word: "teuf", definition: "Fête (verlan)", example: "On va en teuf", votes: 289, trending: true },
    { word: "chelou", definition: "Louche (verlan)", example: "Ce mec est chelou", votes: 167, trending: false },
    { word: "keuf", definition: "Flic (verlan)", example: "Y'a les keufs", votes: 134, trending: false },
    { word: "cheh", definition: "Bien fait, justice", example: "Il a échoué ? Cheh !", votes: 234, trending: true },
    { word: "validé", definition: "Approuvé, d'accord", example: "Ton plan est validé", votes: 178, trending: true },
    { word: "askip", definition: "À ce qu'il paraît", example: "Askip il va pleuvoir", votes: 167, trending: true },
    { word: "bg", definition: "Beau gosse, belle", example: "Tu es bg", votes: 267, trending: false },
    { word: "frérot", definition: "Frère, pote", example: "Salut frérot", votes: 234, trending: false },
    { word: "wallah", definition: "Je jure (arabe)", example: "Wallah c'est vrai", votes: 298, trending: false },
    { word: "jsp", definition: "Je sais pas", example: "Jsp où on va", votes: 201, trending: false },
    { word: "jpp", definition: "J'en peux plus", example: "Jpp de ce prof", votes: 189, trending: false },
    { word: "mdr", definition: "Mort de rire", example: "Mdr ton histoire", votes: 234, trending: false },
    { word: "kiffer", definition: "Aimer, apprécier", example: "Je kiffe ce film", votes: 345, trending: false },
    { word: "relou", definition: "Lourd, pénible", example: "Il est relou", votes: 289, trending: false },
    { word: "boloss", definition: "Loser, nul", example: "Quel boloss", votes: 234, trending: false },
    { word: "mytho", definition: "Menteur", example: "Il est mytho", votes: 189, trending: false },
    { word: "pécho", definition: "Attraper, séduire", example: "J'ai pécho son numéro", votes: 298, trending: false },
    { word: "oklm", definition: "Au calme", example: "On reste oklm", votes: 234, trending: true },
    
    // Argot marseillais authentique étendu
    { word: "dégun", definition: "Personne (marseillais)", example: "Y'a dégun ici", votes: 189, trending: true },
    { word: "minot", definition: "Enfant, gamin (marseillais)", example: "Le minot joue dehors", votes: 145, trending: false },
    { word: "cagole", definition: "Fille un peu vulgaire (marseillais)", example: "Elle fait sa cagole", votes: 167, trending: false },
    { word: "fada", definition: "Fou, dingue (marseillais)", example: "Tu es complètement fada", votes: 198, trending: false },
    { word: "pitchoune", definition: "Petit(e), mignon(ne) (marseillais)", example: "Viens ici pitchoune", votes: 156, trending: false },
    { word: "tchatcher", definition: "Parler beaucoup (marseillais)", example: "Il arrête pas de tchatcher", votes: 134, trending: false },
    { word: "galéjer", definition: "Plaisanter, rigoler (marseillais)", example: "On galère ensemble", votes: 123, trending: false },
    { word: "emboucaneur", definition: "Celui qui fait du bruit (marseillais)", example: "Quel emboucaneur ce voisin", votes: 89, trending: false },
    { word: "esquicher", definition: "Écraser (marseillais)", example: "Attention à pas esquicher la mouche", votes: 67, trending: false },
    { word: "chourave", definition: "Vol, voler (marseillais)", example: "On m'a chouravé mon vélo", votes: 145, trending: false },
    { word: "cahier", definition: "Problème, souci (marseillais)", example: "J'ai un cahier avec lui", votes: 78, trending: false },
    { word: "avoir la gratte", definition: "Avoir faim (marseillais)", example: "J'ai la gratte, on mange quoi ?", votes: 98, trending: false },
    { word: "pastaga", definition: "Pastis (marseillais)", example: "On boit un pastaga ?", votes: 234, trending: false },
    { word: "pichous", definition: "Affaire, problème (marseillais)", example: "C'est quoi ces pichous ?", votes: 67, trending: false },
    { word: "brasserie", definition: "Grande agitation (marseillais)", example: "Quelle brasserie ici !", votes: 89, trending: false },
    { word: "poiscaille", definition: "Poisson (marseillais)", example: "Y'a de la bonne poiscaille au marché", votes: 78, trending: false },
    { word: "escampette", definition: "Fuite rapide (marseillais)", example: "Il a pris la poudre d'escampette", votes: 56, trending: false },
    { word: "esbroufe", definition: "Faire le malin (marseillais)", example: "Arrête ton esbroufe", votes: 134, trending: false },
    { word: "zicmu", definition: "Musique (verlan marseillais)", example: "Mets un peu de zicmu", votes: 123, trending: false },
    { word: "tapade", definition: "Bagarre (marseillais)", example: "Y'a eu une grosse tapade", votes: 156, trending: false },
    { word: "bouillabaisse", definition: "Embrouille, confusion (marseillais)", example: "Quelle bouillabaisse cette histoire", votes: 89, trending: false },
    { word: "tchoukar", definition: "Regarder (marseillais)", example: "Va tchoukar si il arrive", votes: 67, trending: false },
    { word: "gavé", definition: "Beaucoup, très (Sud)", example: "Il est gavé sympa", votes: 178, trending: false },
    { word: "peuchère", definition: "Pauvre de lui (marseillais)", example: "Peuchère, il a raté son bus", votes: 234, trending: false },
    
    // 10 nouveaux mots marseillais ajoutés
    { word: "barrer", definition: "Partir rapidement (marseillais)", example: "Allez, on barre d'ici", votes: 123, trending: false },
    { word: "cacou", definition: "Fou, cinglé (marseillais)", example: "Il est complètement cacou", votes: 98, trending: false },
    { word: "calanque", definition: "Petite crique rocheuse (marseillais)", example: "On va se baigner dans la calanque", votes: 187, trending: false },
    { word: "casser", definition: "Partir (marseillais)", example: "Je me casse", votes: 145, trending: false },
    { word: "couillon", definition: "Idiot, imbécile (marseillais)", example: "Quel couillon celui-là", votes: 167, trending: false },
    { word: "encanailler", definition: "Fréquenter de mauvaises personnes (marseillais)", example: "Il s'est encanaillé", votes: 89, trending: false },
    { word: "figue", definition: "Personne naïve (marseillais)", example: "Quelle figue ce type", votes: 76, trending: false },
    { word: "maï", definition: "Maman (marseillais)", example: "Maï, j'ai faim", votes: 134, trending: false },
    { word: "pègre", definition: "Milieu criminel (marseillais)", example: "Il traîne avec la pègre", votes: 98, trending: false },
    { word: "roucailler", definition: "Parler fort (marseillais)", example: "Arrête de roucailler", votes: 87, trending: false }
  ];

  const dailyChallenges = [
    {
      id: 1,
      type: "quiz",
      title: "Quiz Verlan",
      description: "Trouve la signification de ces mots en verlan",
      difficulty: "facile",
      points: 20,
      questions: [
        { question: "Que signifie 'zarbi' ?", options: ["Bizarre", "Zèbre", "Zapping"], correct: 0 },
        { question: "Que signifie 'meuf' ?", options: ["Ami", "Femme", "Musique"], correct: 1 },
        { question: "Que signifie 'reuf' ?", options: ["Frère", "Neuf", "Peur"], correct: 0 }
      ]
    },
    {
      id: 2,
      type: "creation",
      title: "Inventeur de Slang",
      description: "Crée un nouveau mot de slang original",
      difficulty: "moyen",
      points: 30,
      requirement: "Créer un mot avec définition et exemple"
    },
    {
      id: 3,
      type: "traduction",
      title: "Maître Traducteur",
      description: "Traduis ces expressions en français standard",
      difficulty: "difficile",
      points: 40,
      expressions: [
        { slang: "J'ai le seum", answer: "Je suis énervé" },
        { slang: "C'est ouf", answer: "C'est fou" },
        { slang: "On reste oklm", answer: "On reste au calme" }
      ]
    },
    {
      id: 4,
      type: "speed",
      title: "Speed Slang",
      description: "Réponds rapidement à ces questions",
      difficulty: "expert",
      points: 50,
      timeLimit: 60,
      questions: [
        { word: "cheh", definition: "Bien fait, justice", isCorrect: true },
        { word: "askip", definition: "Demander", isCorrect: false },
        { word: "validé", definition: "Approuvé", isCorrect: true },
        { word: "guedin", definition: "Jardin", isCorrect: false }
      ]
    }
  ];

  useEffect(() => {
    if (slangWords.length > 0) {
      const todaysWord = slangWords[Math.floor(Math.random() * slangWords.length)];
      setDailyWord(todaysWord);
      const todayChallenge = dailyChallenges[new Date().getDate() % dailyChallenges.length];
      setDailyChallenge(todayChallenge);
    }
  }, []);

  useEffect(() => {
    if (challengeTimer && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && challengeTimer) {
      setChallengeTimer(false);
      addNotification("Temps écoulé ! Essaie encore", 'error');
    }
  }, [challengeTimer, timeLeft]);

  const getFilteredWords = () => {
    if (!searchTerm) return slangWords;
    const search = searchTerm.toLowerCase();
    return slangWords.filter(word => 
      word.word.toLowerCase().includes(search) ||
      word.definition.toLowerCase().includes(search)
    );
  };

  const filteredWords = getFilteredWords();
  const trendingWords = slangWords.filter(word => word.trending);

  const getPaginatedWords = (words, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return words.slice(startIndex, endIndex);
  };

  const getTotalPages = (items, itemsPerPage) => {
    return Math.ceil(items.length / itemsPerPage);
  };

  const getPaginatedPosts = (posts, page) => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  };

  // Composant Pagination
  const Pagination = ({ currentPage, totalPages, onPageChange, type }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = isMobile ? 3 : 5;
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            color: currentPage === 1 ? '#9ca3af' : '#6b7280',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s'
          }}
        >
          ‹ Préc
        </button>
        
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s',
              backgroundColor: currentPage === page ? '#7c3aed' : 'white',
              color: currentPage === page ? 'white' : '#6b7280',
              cursor: 'pointer'
            }}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            color: currentPage === totalPages ? '#9ca3af' : '#6b7280',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Suiv ›
        </button>
        
        <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>
          Page {currentPage} sur {totalPages}
        </span>
      </div>
    );
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentUser({ username: 'Visiteur', points: 0 });
    addNotification("Bienvenue sur SpeakZ !", 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveTab('discover');
    addNotification("À bientôt !", 'info');
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      addNotification(`Recherche "${searchTerm}": ${filteredWords.length} résultat(s) trouvé(s)`, 'info');
    }
  };

  const voteForWord = (wordIndex) => {
    setUserPoints(prev => prev + 2);
    addNotification("+2 points pour votre vote !", 'success');
  };

  const addNewWord = () => {
    if (newWord.word && newWord.definition) {
      const newEntry = {
        ...newWord,
        author: currentUser?.username || "Anonyme",
        votes: 1,
        isNew: true
      };
      setUserCreations([newEntry, ...userCreations]);
      setNewWord({ word: '', definition: '', example: '' });
      setUserPoints(prev => prev + 10);
      addNotification(`Mot "${newEntry.word}" créé avec succès ! +10 points`, 'success');
      
      // Vérifier si c'est un défi création
      if (dailyChallenge && dailyChallenge.type === 'creation' && !completedChallenges.includes(dailyChallenge.id)) {
        completeChallenge(dailyChallenge.id, dailyChallenge.points);
      }
    } else {
      addNotification("Veuillez remplir au moins le mot et la définition", 'error');
    }
  };

  const completeChallenge = (challengeId, earnedPoints) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
      setUserPoints(prev => prev + earnedPoints);
      setStreakDays(prev => prev + 1);
      addNotification(`Défi complété ! +${earnedPoints} points !`, 'success');
    }
  };

  const submitQuizAnswer = (questionIndex, selectedOption, challengeId) => {
    const challenge = dailyChallenge;
    if (challenge.questions[questionIndex].correct === selectedOption) {
      setChallengeAnswers(prev => ({
        ...prev,
        [`${challengeId}_${questionIndex}`]: true
      }));
      
      addNotification('Bonne réponse !', 'success');
      
      const allCorrect = challenge.questions.every((q, i) => 
        challengeAnswers[`${challengeId}_${i}`] || (i === questionIndex)
      );
      
      if (allCorrect) {
        setTimeout(() => completeChallenge(challengeId, challenge.points), 500);
      }
    } else {
      addNotification("Mauvaise réponse ! Essaie encore", 'error');
    }
  };

  const startSpeedChallenge = () => {
    setChallengeTimer(true);
    setTimeLeft(dailyChallenge.timeLimit);
    setSpeedCorrectAnswers(0);
    addNotification('Défi Speed commencé ! Bonne chance !', 'info');
  };

  const submitSpeedAnswer = (isCorrectAnswer, userAnswer) => {
    if (isCorrectAnswer === userAnswer) {
      setSpeedCorrectAnswers(prev => prev + 1);
      addNotification('Correct !', 'success');
    } else {
      addNotification('Incorrect !', 'error');
    }
    
    // Vérifier si tous les défis sont complétés
    const totalCorrectAnswers = speedCorrectAnswers + (isCorrectAnswer === userAnswer ? 1 : 0);
    const totalQuestions = dailyChallenge.questions.filter(q => q.isCorrect).length;
    
    if (totalCorrectAnswers >= totalQuestions) {
      setTimeout(() => {
        setChallengeTimer(false);
        completeChallenge(dailyChallenge.id, dailyChallenge.points);
      }, 500);
    }
  };

  const addPost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      author: currentUser?.username || "Anonyme",
      content: newPost,
      likes: 0,
      comments: [],
      time: "maintenant"
    };
    
    setCommunityPosts([post, ...communityPosts]);
    setNewPost('');
    setUserPoints(prev => prev + 5);
    addNotification('Post publié ! +5 points', 'success');
  };

  const likePost = (postId) => {
    setCommunityPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
    setUserPoints(prev => prev + 1);
    addNotification('+1 point pour votre like !', 'success');
  };

  const openShareModal = (post) => {
    setShareModal({ show: true, post });
  };

  const closeShareModal = () => {
    setShareModal({ show: false, post: null });
  };

  const fallbackCopyText = (text) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      return successful;
    } catch (err) {
      console.error('Fallback copy failed:', err);
      return false;
    }
  };

  const copyToClipboard = async (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('Navigator.clipboard failed, trying fallback:', err);
      }
    }
    
    return fallbackCopyText(text);
  };

  const handleShare = async (platform) => {
    const post = shareModal.post;
    const text = `Découvre ce post sur SpeakZ : "${post.content}" par ${post.author}`;
    const url = `https://speakz.app/post/${post.id}`;
    
    let shareUrl;
    let shouldOpenWindow = true;
    
    switch(platform) {
      case 'X (Twitter)':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'Facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'Instagram':
        const instagramSuccess = await copyToClipboard(text + ' ' + url);
        if (instagramSuccess) {
          addNotification('Texte copié ! Collez-le dans votre story Instagram', 'success');
        } else {
          addNotification('Impossible de copier automatiquement. Copiez manuellement ce texte:\n\n' + text + ' ' + url, 'error');
        }
        shouldOpenWindow = false;
        break;
      case 'Discord':
        const discordSuccess = await copyToClipboard(text + ' ' + url);
        if (discordSuccess) {
          addNotification('Texte copié ! Collez-le dans votre serveur Discord', 'success');
        } else {
          addNotification('Impossible de copier automatiquement. Copiez manuellement ce texte:\n\n' + text + ' ' + url, 'error');
        }
        shouldOpenWindow = false;
        break;
      case 'TikTok':
        const tiktokSuccess = await copyToClipboard(text + ' ' + url);
        if (tiktokSuccess) {
          addNotification('Texte copié ! Ajoutez-le à votre vidéo TikTok', 'success');
        } else {
          addNotification('Impossible de copier automatiquement. Copiez manuellement ce texte:\n\n' + text + ' ' + url, 'error');
        }
        shouldOpenWindow = false;
        break;
      default:
        addNotification(`Partagé sur ${platform} ! +2 points`, 'success');
        shouldOpenWindow = false;
    }
    
    if (shouldOpenWindow && shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }
    
    setUserPoints(prev => prev + 2);
    closeShareModal();
  };

  const translateText = () => {
    if (!translateFrom.trim()) return;
    
    setTranslating(true);
    setTimeout(() => {
      const translations = {
        "guedin": "Dingue",
        "seum": "Énervé/dépité",
        "ouf": "Fou/incroyable",
        "zarbi": "Bizarre",
        "meuf": "Femme",
        "reuf": "Frère",
        "teuf": "Fête",
        "chelou": "Louche",
        "cheh": "Bien fait",
        "validé": "Approuvé",
        "askip": "À ce qu'il paraît",
        "wallah": "Je jure",
        "jsp": "Je sais pas",
        "kiffer": "Aimer beaucoup",
        "relou": "Lourd/pénible",
        "boloss": "Loser/nul",
        "mytho": "Menteur",
        "pécho": "Attraper/séduire",
        "oklm": "Au calme",
        "dead": "Mort de rire",
        "wesh": "Salut/hey",
        "bg": "Beau gosse/belle",
        "frérot": "Frère/pote",
        "dégun": "Personne",
        "minot": "Enfant/gamin",
        "cagole": "Fille vulgaire",
        "fada": "Fou/dingue",
        "pitchoune": "Petit(e)/mignon(ne)",
        "tchatcher": "Parler beaucoup",
        "galéjer": "Plaisanter/rigoler",
        "chourave": "Vol/voler",
        "pastaga": "Pastis",
        "peuchère": "Pauvre de lui",
        "gavé": "Beaucoup/très",
        "esbroufe": "Faire le malin",
        "tapade": "Bagarre",
        "barrer": "Partir rapidement",
        "cacou": "Fou/cinglé",
        "calanque": "Petite crique rocheuse",
        "casser": "Partir",
        "couillon": "Idiot/imbécile",
        "encanailler": "Fréquenter de mauvaises personnes",
        "figue": "Personne naïve",
        "maï": "Maman",
        "pègre": "Milieu criminel",
        "roucailler": "Parler fort",
        "j'ai le seum": "Je suis énervé/dépité",
        "c'est ouf": "C'est fou/incroyable",
        "on reste oklm": "On reste au calme",
        "verlan": "Technique qui consiste à inverser les syllabes d'un mot (ex: 'bizarre' devient 'zarbi')",
        "slang": "Langage jeune, argot moderne utilisé principalement par les jeunes",
        "argot": "Langage familier et populaire utilisé par un groupe social"
      };
      
      const findSimilarWords = (searchTerm, translations) => {
        const allWords = Object.keys(translations);
        const similar = [];
        
        for (const word of allWords) {
          if (word.startsWith(searchTerm.substring(0, 2)) || 
              word.includes(searchTerm.substring(0, 3)) ||
              searchTerm.includes(word.substring(0, 3))) {
            similar.push(word);
          }
        }
        
        return similar.slice(0, 3);
      };
      
      const searchTerm = translateFrom.toLowerCase().trim();
      
      if (translations[searchTerm]) {
        setTranslateTo(translations[searchTerm]);
      } else {
        let found = false;
        for (const [slang, translation] of Object.entries(translations)) {
          if (slang.includes(searchTerm) || searchTerm.includes(slang)) {
            setTranslateTo(`${slang} = ${translation}`);
            found = true;
            break;
          }
        }
        
        if (!found) {
          const similarWords = findSimilarWords(searchTerm, translations);
          
          let result = `⌐ "${translateFrom}" non trouvé.`;
          
          if (similarWords.length > 0) {
            result += `\n\n💡 Mots similaires trouvés :\n`;
            similarWords.forEach(word => {
              result += `• ${word} = ${translations[word]}\n`;
            });
          } else {
            result += `\n\n💡 Essayez plutôt : guedin, zarbi, seum, cheh, askip, dégun, minot, fada, barrer, cacou, couillon...`;
          }
          
          setTranslateTo(result);
        }
      }
      
      setTranslating(false);
    }, 1000);
  };

  const WordCard = ({ word, index }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.3s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '18px', color: '#1f2937', margin: 0 }}>{word.word}</h3>
          {word.trending && (
            <span style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              TREND
            </span>
          )}
          {word.isNew && (
            <span style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              NEW
            </span>
          )}
        </div>
        <button
          onClick={() => voteForWord(index)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#7c3aed',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.3s'
          }}
        >
          <Heart size={16} />
          <span style={{ fontSize: '14px', fontWeight: '500' }}>{word.votes}</span>
        </button>
      </div>
      <p style={{ color: '#6b7280', marginBottom: '8px' }}>{word.definition}</p>
      {word.example && (
        <p style={{ fontSize: '14px', color: '#9ca3af', fontStyle: 'italic' }}>"{word.example}"</p>
      )}
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #e5e7eb, #f3f4f6, #dbeafe)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '32px',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #7c3aed, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            SpeakZ
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '32px' }}>
            Le dictionnaire du slang créé par les jeunes, pour les jeunes
          </p>
          
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #7c3aed, #ec4899)',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s'
            }}
          >
            Commencer l'exploration
          </button>

          <div style={{
            marginTop: '32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            textAlign: 'center'
          }}>
            <div style={{ backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>📚</div>
              <div style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '500' }}>25+ mots</div>
            </div>
            <div style={{ backgroundColor: '#fdf2f8', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>🔍</div>
              <div style={{ fontSize: '12px', color: '#ec4899', fontWeight: '500' }}>Recherche</div>
            </div>
            <div style={{ backgroundColor: '#dbeafe', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>🏆</div>
              <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '500' }}>Points</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Notifications */}
      <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              maxWidth: '320px',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              borderLeft: `4px solid ${
                notification.type === 'success' ? '#10b981' :
                notification.type === 'error' ? '#ef4444' : '#3b82f6'
              }`,
              backgroundColor: 
                notification.type === 'success' ? '#ecfdf5' :
                notification.type === 'error' ? '#fef2f2' : '#eff6ff',
              color:
                notification.type === 'success' ? '#065f46' :
                notification.type === 'error' ? '#991b1b' : '#1e3a8a'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor:
                    notification.type === 'success' ? '#10b981' :
                    notification.type === 'error' ? '#ef4444' : '#3b82f6'
                }}>
                  {notification.type === 'success' ? '✓' : notification.type === 'error' ? '✗' : 'ℹ'}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.5', whiteSpace: 'pre-line', margin: 0 }}>
                    {notification.message}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                style={{
                  marginLeft: '8px',
                  color: '#9ca3af',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s'
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de partage */}
      {shareModal.show && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '100%',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Partager ce post</h3>
              <button
                onClick={closeShareModal}
                style={{
                  color: '#9ca3af',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <p style={{ fontSize: '14px', fontWeight: '500', margin: 0, marginBottom: '4px' }}>{shareModal.post?.content}</p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Par {shareModal.post?.author}</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => handleShare('X (Twitter)')}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#000000',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ fontWeight: 'bold' }}>𝕏</span>
                Partager sur X (+2 points)
              </button>
              
              <button
                onClick={() => handleShare('Instagram')}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(to right, #7c3aed, #ec4899)',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                📷 Partager sur Instagram (+2 points)
              </button>
              
              <button
                onClick={() => handleShare('Discord')}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                🎮 Partager sur Discord (+2 points)
              </button>
              
              <button
                onClick={() => handleShare('TikTok')}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#000000',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                🎵 Partager sur TikTok (+2 points)
              </button>
              
              <button
                onClick={() => handleShare('Facebook')}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                📘 Partager sur Facebook (+2 points)
              </button>
              
              <button
                onClick={async () => {
                  const textToCopy = `Découvre ce post sur SpeakZ : "${shareModal.post?.content}" par ${shareModal.post?.author}`;
                  const success = await copyToClipboard(textToCopy);
                  
                  if (success) {
                    addNotification('Lien copié ! +1 point', 'success');
                    setUserPoints(prev => prev + 1);
                  } else {
                    addNotification('Impossible de copier automatiquement. Copiez manuellement ce texte:\n\n' + textToCopy, 'error');
                  }
                  
                  closeShareModal();
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                Copier le lien (+1 point)
              </button>
              
              <button
                onClick={closeShareModal}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #7c3aed, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            SpeakZ
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              background: 'linear-gradient(to right, #fbbf24, #f97316)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Trophy size={16} />
              {userPoints} pts
            </div>
            
            <button
              onClick={handleLogout}
              style={{
                fontSize: '12px',
                color: '#7c3aed',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Barre de recherche */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearchSubmit}
            placeholder="Rechercher... (essayez 'guedin', 'zarbi', 'cheh')"
            style={{
              width: '100%',
              paddingLeft: '40px',
              paddingRight: '16px',
              paddingTop: '12px',
              paddingBottom: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              outline: 'none',
              backgroundColor: 'white',
              fontSize: '16px'
            }}
          />
        </div>

        {/* Navigation tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto' }}>
          {[
            { id: 'discover', label: 'Découvrir', icon: BookOpen, color: '#7c3aed' },
            { id: 'create', label: 'Créer', icon: Plus, color: '#10b981' },
            { id: 'translate', label: 'Traduire', icon: Globe, color: '#3b82f6' },
            { id: 'community', label: 'Communauté', icon: Users, color: '#f97316' },
            { id: 'challenge', label: 'Défi du jour', icon: Target, color: '#3b82f6' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
                border: `1px solid ${activeTab === tab.id ? tab.color : '#e5e7eb'}`,
                backgroundColor: activeTab === tab.id ? `${tab.color}20` : 'white',
                color: activeTab === tab.id ? tab.color : '#6b7280',
                cursor: 'pointer'
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenu */}
        {activeTab === 'discover' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Mot du jour */}
            {!searchTerm && dailyWord && (
              <div style={{
                background: 'linear-gradient(to right, #7c3aed, #ec4899)',
                borderRadius: '8px',
                padding: '24px',
                color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Star style={{ color: '#fbbf24' }} size={24} />
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Mot du jour</h2>
                </div>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>{dailyWord.word}</h3>
                  <p style={{ color: '#e9d5ff', marginBottom: '8px' }}>{dailyWord.definition}</p>
                  <p style={{ color: '#f3e8ff', fontSize: '14px', fontStyle: 'italic' }}>"{dailyWord.example}"</p>
                </div>
              </div>
            )}

            {/* Mots tendance */}
            {!searchTerm && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp style={{ color: '#f97316' }} />
                  Tendances
                </h2>
                <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                  {getPaginatedWords(slangWords.filter(word => word.trending), currentPageWords).map((word, index) => (
                    <WordCard key={word.word} word={word} index={index} />
                  ))}
                </div>
                <Pagination 
                  currentPage={currentPageWords}
                  totalPages={getTotalPages(slangWords.filter(word => word.trending), itemsPerPage)}
                  onPageChange={setCurrentPageWords}
                  type="words"
                />
              </div>
            )}

            {/* Résultats de recherche ou dictionnaire */}
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen style={{ color: '#3b82f6' }} />
                {searchTerm ? `Résultats pour "${searchTerm}"` : 'Dictionnaire'}
              </h2>
              <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {filteredWords.length > 0 ? (
                  getPaginatedWords(filteredWords, currentPageWords).map((word, index) => (
                    <WordCard key={word.word} word={word} index={index} />
                  ))
                ) : searchTerm ? (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '32px' }}>
                    <p style={{ color: '#6b7280', marginBottom: '16px' }}>Aucun résultat pour "{searchTerm}"</p>
                    <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                      Essayez: guedin, zarbi, cheh, validé, askip, meuf, reuf
                    </p>
                  </div>
                ) : (
                  getPaginatedWords(slangWords, currentPageWords).map((word, index) => (
                    <WordCard key={word.word} word={word} index={index} />
                  ))
                )}
              </div>
              
              {/* Pagination pour les mots */}
              {filteredWords.length > 0 && (
                <Pagination 
                  currentPage={currentPageWords}
                  totalPages={getTotalPages(searchTerm ? filteredWords : slangWords, itemsPerPage)}
                  onPageChange={(page) => {
                    setCurrentPageWords(page);
                    if (searchTerm && page === 1) {
                      setCurrentPageWords(1);
                    }
                  }}
                  type="words"
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Créer un nouveau mot</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                    Mot ou expression *
                  </label>
                  <input
                    type="text"
                    value={newWord.word}
                    onChange={(e) => setNewWord(prev => ({ ...prev, word: e.target.value }))}
                    placeholder="Ex: ultracool, megavibes..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '16px'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                    Définition *
                  </label>
                  <textarea
                    value={newWord.definition}
                    onChange={(e) => setNewWord(prev => ({ ...prev, definition: e.target.value }))}
                    placeholder="Explique ce que ça veut dire..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      outline: 'none',
                      height: '96px',
                      resize: 'none',
                      fontSize: '16px'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                    Exemple d'utilisation
                  </label>
                  <input
                    type="text"
                    value={newWord.example}
                    onChange={(e) => setNewWord(prev => ({ ...prev, example: e.target.value }))}
                    placeholder="Ex: Tu es ultracool aujourd'hui !"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '16px'
                    }}
                  />
                </div>
                
                <button
                  onClick={addNewWord}
                  disabled={!newWord.word || !newWord.definition}
                  style={{
                    width: '100%',
                    backgroundColor: !newWord.word || !newWord.definition ? '#9ca3af' : '#10b981',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: !newWord.word || !newWord.definition ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s',
                    fontSize: '16px'
                  }}
                >
                  Publier (+10 points)
                </button>
              </div>
            </div>

            {userCreations.length > 0 && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users style={{ color: '#7c3aed' }} />
                  Mes créations ({userCreations.length})
                </h2>
                
                <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#ecfdf5', border: '1px solid #d1fae5', borderRadius: '8px' }}>
                  <p style={{ color: '#065f46', fontWeight: '500', margin: 0 }}>
                    Voici vos mots créés ! Ils apparaissent ici dès que vous les publiez.
                  </p>
                </div>
                
                <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                  {userCreations.map((word, index) => (
                    <div 
                      key={`creation-${index}`} 
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '4px solid #10b981',
                        padding: '16px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h3 style={{ fontWeight: 'bold', fontSize: '18px', color: '#1f2937', margin: 0 }}>{word.word}</h3>
                          <span style={{
                            background: 'linear-gradient(45deg, #22c55e, #3b82f6)',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)'
                          }}>
                            NOUVEAU !
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#7c3aed' }}>
                          <Heart size={16} />
                          <span style={{ fontSize: '14px', fontWeight: '500' }}>{word.votes}</span>
                        </div>
                      </div>
                      <p style={{ color: '#374151', marginBottom: '8px', fontWeight: '500' }}>{word.definition}</p>
                      {word.example && (
                        <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>"{word.example}"</p>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                        <p style={{ fontSize: '12px', color: '#7c3aed', fontWeight: 'bold', margin: 0 }}>Par {word.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {userCreations.length === 0 && (
              <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>Aucune création pour le moment</h3>
                <p style={{ color: '#6b7280' }}>Créez votre premier mot ci-dessus pour commencer votre collection !</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'translate' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Traducteur Slang → Français</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                    Slang à traduire
                  </label>
                  <input
                    type="text"
                    value={translateFrom}
                    onChange={(e) => setTranslateFrom(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        translateText();
                      }
                    }}
                    placeholder="Ex: guedin, zarbi, verlan, slang..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '16px',
                      borderColor: '#3b82f6'
                    }}
                  />
                  <button
                    onClick={translateText}
                    disabled={translating}
                    style={{
                      marginTop: '12px',
                      backgroundColor: translating ? '#9ca3af' : '#3b82f6',
                      color: 'white',
                      padding: '8px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: translating ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {translating ? 'Traduction...' : 'Traduire'}
                  </button>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                    Appuyez sur Entrée pour traduire rapidement
                  </p>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                    Traduction en français
                  </label>
                  <div style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                    minHeight: '100px',
                    overflowY: 'auto'
                  }}>
                    {translateTo ? (
                      <p style={{ color: '#1f2937', whiteSpace: 'pre-line', margin: 0 }}>{translateTo}</p>
                    ) : (
                      <p style={{ color: '#9ca3af', fontStyle: 'italic', margin: 0 }}>La traduction apparaîtra ici...</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>Exemples rapides :</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
                  {[
                    "verlan",
                    "guedin", 
                    "zarbi",
                    "cheh",
                    "askip",
                    "seum",
                    "j'ai le seum",
                    "dégun",
                    "minot", 
                    "fada",
                    "pitchoune",
                    "barrer",
                    "cacou",
                    "couillon"
                  ].map((example) => (
                    <button
                      key={example}
                      onClick={() => {
                        setTranslateFrom(example);
                        setTimeout(() => translateText(), 100);
                      }}
                      style={{
                        backgroundColor: '#eff6ff',
                        color: '#1d4ed8',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: '#faf5ff', borderRadius: '8px', padding: '24px', border: '1px solid #e9d5ff' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#7c2d12', marginBottom: '12px' }}>Le saviez-vous ?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>📚</span>
                  <p style={{ margin: 0 }}><strong>Verlan :</strong> Technique qui inverse les syllabes (bizarre → zarbi, louche → chelou)</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>🌍</span>
                  <p style={{ margin: 0 }}><strong>Origine :</strong> Né dans les banlieues françaises dans les années 70-80</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>⚡</span>
                  <p style={{ margin: 0 }}><strong>Évolution :</strong> Constamment renouvelé par les jeunes générations</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Partager</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Partage une découverte..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    outline: 'none',
                    height: '96px',
                    resize: 'none',
                    fontSize: '16px',
                    borderColor: '#10b981'
                  }}
                />
                
                <button
                  onClick={addPost}
                  disabled={!newPost.trim()}
                  style={{
                    backgroundColor: !newPost.trim() ? '#9ca3af' : '#10b981',
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: !newPost.trim() ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    alignSelf: 'flex-start'
                  }}
                >
                  Publier (+5 pts)
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {getPaginatedPosts(communityPosts, currentPagePosts).map((post) => (
                <div key={post.id} style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#7c3aed',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      {post.author[0]}
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 'bold', margin: 0 }}>{post.author}</h3>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>{post.time}</span>
                    </div>
                  </div>
                  
                  <p style={{ marginBottom: '16px', color: '#374151' }}>{post.content}</p>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                      onClick={() => likePost(post.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#6b7280',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.3s',
                        fontSize: '14px'
                      }}
                    >
                      <Heart size={16} />
                      {post.likes}
                    </button>
                    
                    <button
                      onClick={() => openShareModal(post)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#6b7280',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.3s',
                        fontSize: '14px'
                      }}
                    >
                      <Share2 size={16} />
                      Partager
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Pagination pour les posts */}
              <Pagination 
                currentPage={currentPagePosts}
                totalPages={getTotalPages(communityPosts, postsPerPage)}
                onPageChange={setCurrentPagePosts}
                type="posts"
              />
            </div>
          </div>
        )}

        {activeTab === 'challenge' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'linear-gradient(to right, #2563eb, #7c3aed)',
              borderRadius: '8px',
              padding: '24px',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, marginBottom: '8px' }}>
                    <Target size={28} />
                    Défi du jour
                  </h2>
                  <p style={{ color: '#bfdbfe', margin: 0 }}>Teste tes connaissances et gagne des points !</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{streakDays}</div>
                    <div style={{ color: '#bfdbfe', fontSize: '14px' }}>jours de suite</div>
                  </div>
                </div>
              </div>
              
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: 'white', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={16} />
                    <span>Quotidien</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Award size={16} />
                    <span>Récompenses exclusives</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Trophy size={16} />
                    <span>Série de {streakDays} jours</span>
                  </div>
                </div>
              </div>
            </div>

            {dailyChallenge && (
              <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '4px' }}>{dailyChallenge.title}</h3>
                    <p style={{ color: '#6b7280', margin: 0 }}>{dailyChallenge.description}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      backgroundColor: dailyChallenge.difficulty === 'facile' ? '#dcfce7' : dailyChallenge.difficulty === 'expert' ? '#fef2f2' : '#fef3c7',
                      color: dailyChallenge.difficulty === 'facile' ? '#166534' : dailyChallenge.difficulty === 'expert' ? '#991b1b' : '#92400e'
                    }}>
                      {dailyChallenge.difficulty}
                    </div>
                    <div style={{ color: '#7c3aed', fontWeight: 'bold', marginTop: '4px' }}>
                      +{dailyChallenge.points} points
                    </div>
                  </div>
                </div>

                {completedChallenges.includes(dailyChallenge.id) ? (
                  <div style={{ textAlign: 'center', padding: '32px' }}>
                    <CheckCircle style={{ color: '#10b981', marginBottom: '16px' }} size={48} />
                    <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#166534', marginBottom: '8px' }}>Défi complété !</h4>
                    <p style={{ color: '#6b7280' }}>Reviens demain pour un nouveau défi</p>
                  </div>
                ) : (
                  <div>
                    {dailyChallenge.type === 'quiz' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {dailyChallenge.questions.map((q, index) => (
                          <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '12px' }}>{q.question}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {q.options.map((option, optionIndex) => (
                                <button
                                  key={optionIndex}
                                  onClick={() => submitQuizAnswer(index, optionIndex, dailyChallenge.id)}
                                  disabled={challengeAnswers[`${dailyChallenge.id}_${index}`]}
                                  style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: challengeAnswers[`${dailyChallenge.id}_${index}`] && optionIndex === q.correct ? '1px solid #10b981' : '1px solid #e5e7eb',
                                    backgroundColor: challengeAnswers[`${dailyChallenge.id}_${index}`] && optionIndex === q.correct ? '#ecfdf5' : 'white',
                                    color: challengeAnswers[`${dailyChallenge.id}_${index}`] && optionIndex === q.correct ? '#166534' : '#374151',
                                    cursor: challengeAnswers[`${dailyChallenge.id}_${index}`] ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                  }}
                                >
                                  {option}
                                  {challengeAnswers[`${dailyChallenge.id}_${index}`] && optionIndex === q.correct && (
                                    <CheckCircle style={{ color: '#10b981' }} size={16} />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {dailyChallenge.type === 'creation' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '16px' }}>
                          <h4 style={{ fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>Mission :</h4>
                          <p style={{ color: '#1d4ed8', margin: 0 }}>{dailyChallenge.requirement}</p>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('create');
                            addNotification('Va dans l\'onglet Créer pour compléter ce défi !', 'info');
                          }}
                          style={{
                            width: '100%',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            fontSize: '16px'
                          }}
                        >
                          Aller créer un mot →
                        </button>
                      </div>
                    )}

                    {dailyChallenge.type === 'traduction' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {dailyChallenge.expressions.map((expr, index) => (
                          <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Traduis : "{expr.slang}"</h4>
                            <input
                              type="text"
                              placeholder="Ta traduction..."
                              style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                outline: 'none',
                                fontSize: '16px'
                              }}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const userAnswer = e.target.value.toLowerCase();
                                  const correctAnswer = expr.answer.toLowerCase();
                                  if (userAnswer.includes(correctAnswer.split(' ')[0]) || userAnswer === correctAnswer) {
                                    e.target.style.backgroundColor = '#f0fdf4';
                                    e.target.style.borderColor = '#22c55e';
                                    e.target.disabled = true;
                                    addNotification('Bonne traduction !', 'success');
                                    
                                    const allInputs = document.querySelectorAll('input[placeholder="Ta traduction..."]');
                                    const allCompleted = Array.from(allInputs).every(input => input.disabled);
                                    if (allCompleted) {
                                      setTimeout(() => completeChallenge(dailyChallenge.id, dailyChallenge.points), 500);
                                    }
                                  } else {
                                    addNotification(`Pas tout à fait ! La réponse était : "${expr.answer}"`, 'error');
                                  }
                                }
                              }}
                            />
                            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px', margin: 0 }}>Appuie sur Entrée pour valider</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {dailyChallenge.type === 'speed' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px' }}>
                          <h4 style={{ fontWeight: 'bold', color: '#991b1b', marginBottom: '8px' }}>Défi Chrono !</h4>
                          <p style={{ color: '#dc2626' }}>Dis si la définition est correcte ou non, le plus vite possible !</p>
                          {challengeTimer && (
                            <div style={{ marginTop: '8px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                              <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '8px', display: 'inline-block' }}>
                                <span style={{ color: '#dc2626', fontWeight: 'bold' }}>Temps restant : {timeLeft}s</span>
                              </div>
                              <div style={{ backgroundColor: '#ecfdf5', borderRadius: '8px', padding: '8px', display: 'inline-block' }}>
                                <span style={{ color: '#166534', fontWeight: 'bold' }}>
                                  Bonnes réponses : {speedCorrectAnswers}/{dailyChallenge.questions.length}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {!challengeTimer ? (
                          <button
                            onClick={startSpeedChallenge}
                            style={{
                              width: '100%',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              padding: '12px',
                              borderRadius: '8px',
                              fontWeight: 'bold',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s',
                              fontSize: '16px'
                            }}
                          >
                            Commencer le défi chronométré
                          </button>
                        ) : (
                          dailyChallenge.questions.map((item, index) => (
                            <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
                              <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>"{item.word}" = {item.definition}</h4>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={() => submitSpeedAnswer(item.isCorrect, true)}
                                  style={{
                                    flex: 1,
                                    backgroundColor: '#10b981',
                                    color: 'white',
                                    padding: '8px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    fontWeight: '500'
                                  }}
                                >
                                  Vrai
                                </button>
                                <button
                                  onClick={() => submitSpeedAnswer(item.isCorrect, false)}
                                  style={{
                                    flex: 1,
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                    padding: '8px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    fontWeight: '500'
                                  }}
                                >
                                  Faux
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakZApp;
