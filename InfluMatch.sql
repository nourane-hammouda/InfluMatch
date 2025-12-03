Create database InfluMatch ; 
Use InfluMatch;
CREATE TABLE utilisateurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe_hash VARCHAR(255) NOT NULL,
    type_utilisateur ENUM('influenceur', 'entreprise') NOT NULL,
    est_actif BOOLEAN DEFAULT TRUE,
    est_verifie BOOLEAN DEFAULT FALSE,
    tentatives_connexion_echouees INT DEFAULT 0,
    verrouille_jusqu_a DATETIME NULL,
    cree_le DATETIME DEFAULT CURRENT_TIMESTAMP,
    modifie_le DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    derniere_connexion DATETIME NULL,
    INDEX idx_email (email),
    INDEX idx_type_utilisateur (type_utilisateur)
);
CREATE TABLE influenceurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INT UNIQUE NOT NULL,
    pseudo VARCHAR(100) NOT NULL,
    photo_profil VARCHAR(500) NULL,
    biographie TEXT(500) NULL,
    localisation VARCHAR(255) NULL,
    pourcentage_completion_profil TINYINT DEFAULT 0,
    taux_acceptation DECIMAL(5,2) DEFAULT 0.00,
    total_candidatures INT DEFAULT 0,
    candidatures_acceptees INT DEFAULT 0,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    INDEX idx_completion (pourcentage_completion_profil),
    INDEX idx_localisation (localisation)
);
CREATE TABLE domaines_expertise (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NULL,
    est_actif BOOLEAN DEFAULT TRUE,
    INDEX idx_slug (slug)
);

-- Données initiales
INSERT INTO domaines_expertise (nom, slug) VALUES
('Mode & Beauté', 'mode-beaute'),
('Tech & Gaming', 'tech-gaming'),
('Sport & Fitness', 'sport-fitness'),
('Food & Lifestyle', 'food-lifestyle'),
('Voyage', 'voyage'),
('Parentalité', 'parentalite'),
('Finance & Business', 'finance-business'),
('Arts & Culture', 'arts-culture'),
('Religion', 'religion'),
('Education', 'education');
CREATE TABLE influenceur_expertise (
    id INT PRIMARY KEY AUTO_INCREMENT,
    influenceur_id INT NOT NULL,
    domaine_id INT NOT NULL,
    cree_le DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (influenceur_id) REFERENCES influenceurs(id) ON DELETE CASCADE,
    FOREIGN KEY (domaine_id) REFERENCES domaines_expertise(id) ON DELETE CASCADE,
    UNIQUE KEY unique_influenceur_domaine (influenceur_id, domaine_id)
);
CREATE TABLE plateformes_sociales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) UNIQUE NOT NULL,
    url_icone VARCHAR(500) NULL,
    est_actif BOOLEAN DEFAULT TRUE
);

INSERT INTO plateformes_sociales (nom) VALUES
('Instagram'), ('TikTok'), ('YouTube'), 
('Snapchat'), ('Twitter/X'), ('Facebook');
CREATE TABLE influenceur_plateformes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    influenceur_id INT NOT NULL,
    plateforme_id INT NOT NULL,
    nombre_abonnes INT NOT NULL,
    taux_engagement DECIMAL(5,2) NULL COMMENT 'Pourcentage',
    vues_moyennes INT NULL,
    url_profil VARCHAR(500) NULL,
    cree_le DATETIME DEFAULT CURRENT_TIMESTAMP,
    modifie_le DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (influenceur_id) REFERENCES influenceurs(id) ON DELETE CASCADE,
    FOREIGN KEY (plateforme_id) REFERENCES plateformes_sociales(id) ON DELETE CASCADE,
    UNIQUE KEY unique_influenceur_plateforme (influenceur_id, plateforme_id),
    INDEX idx_abonnes (nombre_abonnes)
);
CREATE TABLE influenceur_tarifs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    influenceur_id INT UNIQUE NOT NULL,
    prix_par_post DECIMAL(10,2) NULL,
    prix_par_story DECIMAL(10,2) NULL,
    prix_par_video DECIMAL(10,2) NULL,
    est_negociable BOOLEAN DEFAULT TRUE,
    devise VARCHAR(3) DEFAULT 'EUR',
    FOREIGN KEY (influenceur_id) REFERENCES influenceurs(id) ON DELETE CASCADE
);
CREATE TABLE entreprises (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INT UNIQUE NOT NULL,
    nom_entreprise VARCHAR(255) NOT NULL,
    url_logo VARCHAR(500) NULL,
    description TEXT NULL,
    site_web VARCHAR(500) NULL,
    secteur VARCHAR(100) NULL,
    taille_entreprise ENUM('startup', 'pme', 'grande_entreprise', 'agence') NULL,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    INDEX idx_nom_entreprise (nom_entreprise)
);
CREATE TABLE campagnes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    entreprise_id INT NOT NULL,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    budget_min DECIMAL(10,2) NULL,
    budget_max DECIMAL(10,2) NULL,
    minimum_abonnes_requis INT DEFAULT 0,
    date_limite_candidature DATETIME NOT NULL,
    date_debut_campagne DATE NULL,
    date_fin_campagne DATE NULL,
    statut ENUM('brouillon', 'active', 'fermee', 'annulee') DEFAULT 'brouillon',
    total_candidatures INT DEFAULT 0,
    cree_le DATETIME DEFAULT CURRENT_TIMESTAMP,
    modifie_le DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (entreprise_id) REFERENCES entreprises(id) ON DELETE CASCADE,
    INDEX idx_statut (statut),
    INDEX idx_date_limite (date_limite_candidature),
    INDEX idx_cree_le (cree_le)
);
CREATE TABLE campagne_domaines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    campagne_id INT NOT NULL,
    domaine_id INT NOT NULL,
    FOREIGN KEY (campagne_id) REFERENCES campagnes(id) ON DELETE CASCADE,
    FOREIGN KEY (domaine_id) REFERENCES domaines_expertise(id) ON DELETE CASCADE,
    UNIQUE KEY unique_campagne_domaine (campagne_id, domaine_id)
);
CREATE TABLE campagne_plateformes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    campagne_id INT NOT NULL,
    plateforme_id INT NOT NULL,
    FOREIGN KEY (campagne_id) REFERENCES campagnes(id) ON DELETE CASCADE,
    FOREIGN KEY (plateforme_id) REFERENCES plateformes_sociales(id) ON DELETE CASCADE,
    UNIQUE KEY unique_campagne_plateforme (campagne_id, plateforme_id)
);
CREATE TABLE candidatures (
    id INT PRIMARY KEY AUTO_INCREMENT,
    campagne_id INT NOT NULL,
    influenceur_id INT NOT NULL,
    statut ENUM('en_attente', 'acceptee', 'refusee', 'retiree') DEFAULT 'en_attente',
    message_motivation TEXT(500) NULL,
    prix_propose DECIMAL(10,2) NULL,
    collaborations_passees TEXT NULL COMMENT 'JSON ou texte libre',
    candidate_le DATETIME DEFAULT CURRENT_TIMESTAMP,
    evaluee_le DATETIME NULL,
    evaluee_par INT NULL COMMENT 'utilisateur_id entreprise',
    FOREIGN KEY (campagne_id) REFERENCES campagnes(id) ON DELETE CASCADE,
    FOREIGN KEY (influenceur_id) REFERENCES influenceurs(id) ON DELETE CASCADE,
    FOREIGN KEY (evaluee_par) REFERENCES utilisateurs(id) ON DELETE SET NULL,
    UNIQUE KEY unique_campagne_influenceur (campagne_id, influenceur_id),
    INDEX idx_statut (statut),
    INDEX idx_candidate_le (candidate_le)
);

DELIMITER $$
CREATE TRIGGER trg_apres_insertion_candidature
AFTER INSERT ON candidatures
FOR EACH ROW
BEGIN
    UPDATE campagnes SET total_candidatures = total_candidatures + 1 
    WHERE id = NEW.campagne_id;
    
    UPDATE influenceurs SET total_candidatures = total_candidatures + 1 
    WHERE id = NEW.influenceur_id;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_apres_acceptation_candidature
AFTER UPDATE ON candidatures
FOR EACH ROW
BEGIN
    IF NEW.statut = 'acceptee' AND OLD.statut != 'acceptee' THEN
        UPDATE influenceurs SET candidatures_acceptees = candidatures_acceptees + 1 
        WHERE id = NEW.influenceur_id;
    END IF;
END$$
DELIMITER ;

CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INT NOT NULL,
    type ENUM('nouvelle_campagne', 'reponse_candidature', 'message', 'systeme') NOT NULL,
    titre VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type_entite_liee ENUM('campagne', 'candidature', 'utilisateur') NULL,
    id_entite_liee INT NULL,
    est_lue BOOLEAN DEFAULT FALSE,
    cree_le DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    INDEX idx_utilisateur_non_lue (utilisateur_id, est_lue),
    INDEX idx_cree_le (cree_le)
);

CREATE TABLE recherches_sauvegardees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    influenceur_id INT NOT NULL,
    nom_recherche VARCHAR(100) NOT NULL,
    criteres_recherche JSON NOT NULL COMMENT 'Filtres sauvegardés',
    cree_le DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (influenceur_id) REFERENCES influenceurs(id) ON DELETE CASCADE
);

CREATE TABLE sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INT NOT NULL,
    jeton VARCHAR(500) UNIQUE NOT NULL,
    adresse_ip VARCHAR(45) NULL,
    user_agent TEXT NULL,
    expire_le DATETIME NOT NULL,
    cree_le DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    INDEX idx_jeton (jeton),
    INDEX idx_expire_le (expire_le)
);



CREATE VIEW v_statistiques_influenceurs AS
SELECT 
    i.id,
    i.pseudo,
    i.pourcentage_completion_profil,
    COUNT(DISTINCT ip.plateforme_id) as nombre_plateformes,
    MAX(ip.nombre_abonnes) as max_abonnes,
    SUM(ip.nombre_abonnes) as total_abonnes,
    COUNT(DISTINCT c.id) as total_candidatures,
    COUNT(DISTINCT CASE WHEN c.statut = 'acceptee' THEN c.id END) as nombre_acceptees,
    ROUND(
        COUNT(DISTINCT CASE WHEN c.statut = 'acceptee' THEN c.id END) * 100.0 / 
        NULLIF(COUNT(DISTINCT c.id), 0), 2
    ) as taux_acceptation
FROM influenceurs i
LEFT JOIN influenceur_plateformes ip ON i.id = ip.influenceur_id
LEFT JOIN candidatures c ON i.id = c.influenceur_id
GROUP BY i.id, i.pseudo, i.pourcentage_completion_profil;


CREATE VIEW v_correspondance_campagnes AS
SELECT 
    ca.id as campagne_id,
    ca.titre,
    ca.budget_min,
    ca.budget_max,
    i.id as influenceur_id,
    (
        -- Score domaines (40%)
        (SELECT COUNT(*) FROM campagne_domaines cd
         INNER JOIN influenceur_expertise ie ON cd.domaine_id = ie.domaine_id
         WHERE cd.campagne_id = ca.id AND ie.influenceur_id = i.id) * 40 / 
        (SELECT COUNT(*) FROM campagne_domaines WHERE campagne_id = ca.id)
        +
        -- Score plateformes (30%)
        (SELECT COUNT(*) FROM campagne_plateformes cp
         INNER JOIN influenceur_plateformes ip ON cp.plateforme_id = ip.plateforme_id
         WHERE cp.campagne_id = ca.id AND ip.influenceur_id = i.id) * 30 / 
        (SELECT COUNT(*) FROM campagne_plateformes WHERE campagne_id = ca.id)
        +
        -- Score abonnés (30%)
        CASE 
            WHEN (SELECT MAX(nombre_abonnes) FROM influenceur_plateformes 
                  WHERE influenceur_id = i.id) >= ca.minimum_abonnes_requis 
            THEN 30 ELSE 0 
        END
    ) as score_correspondance
FROM campagnes ca
CROSS JOIN influenceurs i
WHERE ca.statut = 'active'
HAVING score_correspondance >= 50;

-- Performance recherche offres
CREATE INDEX idx_recherche_campagnes ON campagnes(statut, date_limite_candidature, cree_le);

-- Performance matching
CREATE INDEX idx_influenceur_abonnes ON influenceur_plateformes(influenceur_id, nombre_abonnes);

-- Performance dashboard
CREATE INDEX idx_candidature_statut_date ON candidatures(influenceur_id, statut, candidate_le);

DELIMITER $$
CREATE PROCEDURE sp_postuler_campagne(
    IN p_campagne_id INT,
    IN p_influenceur_id INT,
    IN p_motivation TEXT,
    IN p_prix_propose DECIMAL(10,2),
    OUT p_resultat VARCHAR(50)
)
BEGIN
    DECLARE v_date_limite DATETIME;
    DECLARE v_statut VARCHAR(20);
    DECLARE v_existe INT;
    
    -- Vérification campagne active
    SELECT date_limite_candidature, statut INTO v_date_limite, v_statut
    FROM campagnes WHERE id = p_campagne_id;
    
    IF v_statut != 'active' THEN
        SET p_resultat = 'ERREUR_CAMPAGNE_INACTIVE';
    ELSEIF v_date_limite < NOW() THEN
        SET p_resultat = 'ERREUR_DELAI_DEPASSE';
    ELSE
        -- Vérification candidature existante
        SELECT COUNT(*) INTO v_existe FROM candidatures
        WHERE campagne_id = p_campagne_id AND influenceur_id = p_influenceur_id;
        
        IF v_existe > 0 THEN
            SET p_resultat = 'ERREUR_DEJA_POSTULE';
        ELSE
            INSERT INTO candidatures (campagne_id, influenceur_id, message_motivation, prix_propose)
            VALUES (p_campagne_id, p_influenceur_id, p_motivation, p_prix_propose);
            
            SET p_resultat = 'SUCCES';
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_verrouiller_compte_apres_echecs
BEFORE UPDATE ON utilisateurs
FOR EACH ROW
BEGIN
    IF NEW.tentatives_connexion_echouees >= 5 THEN
        SET NEW.verrouille_jusqu_a = DATE_ADD(NOW(), INTERVAL 15 MINUTE);
    END IF;
END$$
DELIMITER ;

