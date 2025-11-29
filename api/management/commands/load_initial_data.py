from django.core.management.base import BaseCommand
from api.models import DomaineExpertise, PlateformeSociale

class Command(BaseCommand):
    help = 'Charge les données initiales'
    
    def handle(self, *args, **options):
        domaines = [
            ('Mode & Beauté', 'mode-beaute'),
            ('Tech & Gaming', 'tech-gaming'),
            ('Sport & Fitness', 'sport-fitness'),
            ('Food & Lifestyle', 'food-lifestyle'),
            ('Voyage', 'voyage'),
            ('Parentalité', 'parentalite'),
            ('Finance & Business', 'finance-business'),
            ('Arts & Culture', 'arts-culture'),
            ('Religion', 'religion'),
            ('Education', 'education'),
        ]
        
        for nom, slug in domaines:
            DomaineExpertise.objects.get_or_create(slug=slug, defaults={'nom': nom})
            self.stdout.write(f'✓ {nom}')
        
        plateformes = ['Instagram', 'TikTok', 'YouTube', 'Snapchat', 'Twitter/X', 'Facebook']
        for nom in plateformes:
            PlateformeSociale.objects.get_or_create(nom=nom)
            self.stdout.write(f'✓ {nom}')
        
        self.stdout.write(self.style.SUCCESS('\n✓ Données chargées'))