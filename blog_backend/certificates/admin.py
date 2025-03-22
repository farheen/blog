from django.contrib import admin
from blog_backend.certificates.models import Certificate

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'date_issued')  # Ensure issue_date is a valid field
    search_fields = ('title', 'issuer')
    list_filter = ('date_issued',)  # Ensure it references a DateField