from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, type_utilisateur='influenceur', **extra_fields):
        if not email:
            raise ValueError('L\'email est requis')
        email = self.normalize_email(email)
        user = self.model(email=email, type_utilisateur=type_utilisateur, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('est_actif', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('type_utilisateur', 'influenceur')
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    TYPE_CHOICES = [
        ('influenceur', 'Influenceur'),
        ('entreprise', 'Entreprise'),
    ]
    
    email = models.EmailField('email', unique=True, db_column='email')
    type_utilisateur = models.CharField(max_length=20, choices=TYPE_CHOICES, db_column='type_utilisateur')
    est_actif = models.BooleanField(default=True, db_column='est_actif')
    est_verifie = models.BooleanField(default=False, db_column='est_verifie')
    tentatives_connexion_echouees = models.IntegerField(default=0, db_column='tentatives_connexion_echouees')
    verrouille_jusqu_a = models.DateTimeField(null=True, blank=True, db_column='verrouille_jusqu_a')
    derniere_connexion = models.DateTimeField(null=True, blank=True, db_column='derniere_connexion')
    cree_le = models.DateTimeField(auto_now_add=True, db_column='cree_le')
    modifie_le = models.DateTimeField(auto_now=True, db_column='modifie_le')
    
    # Map Django's password field to database column
    password = models.CharField(max_length=128, db_column='mot_de_passe_hash')
    
    # last_login is required by AbstractBaseUser - sync with derniere_connexion
    last_login = models.DateTimeField(null=True, blank=True, db_column='last_login')
    
    # Required for Django admin (sync with database)
    is_staff = models.BooleanField(default=False, db_column='is_staff')
    is_active = models.BooleanField(default=True, db_column='is_active')
    is_superuser = models.BooleanField(default=False, db_column='is_superuser')
    username = models.CharField(max_length=150, blank=True, null=True, db_column='username')
    first_name = models.CharField(max_length=150, blank=True, db_column='first_name')
    last_name = models.CharField(max_length=150, blank=True, db_column='last_name')
    date_joined = models.DateTimeField(default=timezone.now, db_column='date_joined')
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['type_utilisateur']
    
    class Meta:
        db_table = 'utilisateurs'
        managed = True
        indexes = [
            models.Index(fields=['email'], name='idx_email'),
            models.Index(fields=['type_utilisateur'], name='idx_type_utilisateur'),
        ]
    
    def __str__(self):
        return self.email
    
    def set_password(self, raw_password):
        """Hash and set password"""
        self.password = make_password(raw_password)
        self._password = raw_password
    
    def check_password(self, raw_password):
        """Check password against hash"""
        return check_password(raw_password, self.password)
    
    def save(self, *args, **kwargs):
        # Sync is_active with est_actif
        self.is_active = self.est_actif
        # Sync last_login with derniere_connexion
        if self.last_login:
            self.derniere_connexion = self.last_login
        elif self.derniere_connexion and not self.last_login:
            self.last_login = self.derniere_connexion
        # Set username from email if not set
        if not self.username:
            self.username = self.email.split('@')[0]
        super().save(*args, **kwargs)