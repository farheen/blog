from django.contrib import admin
from .models import Article, Contact, Blog

from django.contrib import admin
from .models import Blog

class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date')
    search_fields = ('title', 'content')  # Enable search by title and content
    list_filter = ('author', 'published_date')  # Add filters for author and published date
    ordering = ('-published_date',)  # Order by published date (descending)



class ArticleAdmin(admin.ModelAdmin):
    pass


class ContactAdmin(admin.ModelAdmin):
    pass


admin.site.register(Article, ArticleAdmin)
admin.site.register(Contact, ContactAdmin)
