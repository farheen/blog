#from django.urls import path, include

#from rest_framework import routers
#from .api import ArticleViewSet, ContactViewSet, BlogViewSet

#router = routers.SimpleRouter()
#router.register ('article', ArticleViewSet, 'article')
#router.register('contact', ContactViewSet, 'contact')
#router.register('blog', BlogViewSet, 'blog')

#urlpatterns = [
 # path('api/', include(router.urls))
  #path('blogs/', include('blog.urls')),  # Include the blog app URLs
#]


from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .api import ArticleViewSet, ContactViewSet, BlogViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls')),  # Include the blog app's URLs
]



